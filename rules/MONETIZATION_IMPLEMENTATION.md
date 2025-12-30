# Monetization Implementation Guide

## Overview

This document outlines all changes needed to implement the token-based monetization system for OratorPrep.

**Core Model:**
- 1 token = 1 completed debate in a specific scenario
- Per-scenario token balances (not global)
- Token consumed when debate ENDS (not starts)
- Prep/research generation is FREE
- Subscribers get all scenarios + 100 debates/month (hidden cap)
- Marketing funnel grants 10 tokens for specific scenario

---

## Phase 1: Schema & Core Infrastructure

### 1.1 Schema Additions

**File:** `convex/schema.ts`

Add after the `subscriptions` table (around line 85):

```typescript
// Per-scenario token balance
scenarioTokens: defineTable({
  userId: v.id("users"),
  scenarioId: v.string(),  // "debate", "sales-cold-prospect", etc.
  balance: v.number(),
})
  .index("by_user", ["userId"])
  .index("by_user_scenario", ["userId", "scenarioId"]),

// Audit log for all token changes
tokenTransactions: defineTable({
  userId: v.id("users"),
  scenarioId: v.string(),
  amount: v.number(),  // +10 for grant, -1 for consume
  reason: v.union(
    v.literal("funnel_grant"),
    v.literal("purchase"),
    v.literal("debate_complete"),
    v.literal("admin_grant"),
    v.literal("refund")
  ),
  metadata: v.optional(v.object({
    debateId: v.optional(v.id("debates")),
    grantId: v.optional(v.string()),
    stripePaymentId: v.optional(v.string()),
  })),
  createdAt: v.number(),
})
  .index("by_user", ["userId"])
  .index("by_user_scenario", ["userId", "scenarioId"]),

// Subscriber monthly usage tracking
subscriberUsage: defineTable({
  userId: v.id("users"),
  periodStart: v.number(),
  periodEnd: v.number(),
  debateCount: v.number(),
  notifiedOwner: v.boolean(),
})
  .index("by_user_period", ["userId", "periodStart"]),

// Pending grants for marketing funnel
pendingGrants: defineTable({
  grantToken: v.string(),  // Unique token in URL
  scenarioId: v.string(),
  tokenAmount: v.number(),  // Default 10
  claimed: v.boolean(),
  claimedBy: v.optional(v.id("users")),
  createdAt: v.number(),
  expiresAt: v.optional(v.number()),
  utmSource: v.optional(v.string()),
  utmCampaign: v.optional(v.string()),
})
  .index("by_token", ["grantToken"])
  .index("by_user", ["claimedBy"]),
```

### 1.2 Constants File

**New File:** `convex/lib/monetization.ts`

```typescript
// Monthly debate cap for subscribers (hidden from UI)
export const SUBSCRIBER_MONTHLY_CAP = 100;

// Default token grant for marketing funnel
export const FUNNEL_GRANT_AMOUNT = 10;

// Buffer for anti-abuse check (allow this many extra opponents)
export const OPPONENT_CREATION_BUFFER = 2;

// Grant link expiration (30 days)
export const GRANT_EXPIRATION_MS = 30 * 24 * 60 * 60 * 1000;

// Owner email for notifications
export const OWNER_EMAIL = "konrad@example.com";  // TODO: Update

// Token pack sizes and prices (Stripe price IDs to be added)
export const TOKEN_PACKS = [
  { tokens: 5, priceUsd: 999 },   // $9.99
  { tokens: 15, priceUsd: 2499 }, // $24.99
  { tokens: 50, priceUsd: 6999 }, // $69.99
] as const;
```

---

## Phase 2: Token Operations

### 2.1 Token Queries & Mutations

**New File:** `convex/tokens.ts`

```typescript
import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { SUBSCRIBER_MONTHLY_CAP, OPPONENT_CREATION_BUFFER } from "./lib/monetization";

// Get token balance for a specific scenario
export const getBalance = query({
  args: { scenarioId: v.string() },
  handler: async (ctx, { scenarioId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return 0;

    const record = await ctx.db
      .query("scenarioTokens")
      .withIndex("by_user_scenario", q =>
        q.eq("userId", userId).eq("scenarioId", scenarioId)
      )
      .first();

    return record?.balance ?? 0;
  },
});

// Get all token balances for current user
export const getAllBalances = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return {};

    const records = await ctx.db
      .query("scenarioTokens")
      .withIndex("by_user", q => q.eq("userId", userId))
      .collect();

    return Object.fromEntries(
      records.map(r => [r.scenarioId, r.balance])
    );
  },
});

// Check if user can access a scenario (has tokens OR is subscriber)
export const checkAccess = query({
  args: { scenarioId: v.string() },
  handler: async (ctx, { scenarioId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return { hasAccess: false, reason: "not_authenticated" };

    // Check subscription
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", q => q.eq("userId", userId))
      .first();

    if (subscription?.status === "active") {
      return { hasAccess: true, reason: "subscriber" };
    }

    // Check tokens
    const tokenRecord = await ctx.db
      .query("scenarioTokens")
      .withIndex("by_user_scenario", q =>
        q.eq("userId", userId).eq("scenarioId", scenarioId)
      )
      .first();

    if (tokenRecord && tokenRecord.balance > 0) {
      return { hasAccess: true, reason: "tokens", balance: tokenRecord.balance };
    }

    return { hasAccess: false, reason: "no_tokens" };
  },
});

// Internal: Grant tokens (called by purchase webhook, funnel claim, admin)
export const INTERNAL_grantTokens = internalMutation({
  args: {
    userId: v.id("users"),
    scenarioId: v.string(),
    amount: v.number(),
    reason: v.union(
      v.literal("funnel_grant"),
      v.literal("purchase"),
      v.literal("admin_grant"),
      v.literal("refund")
    ),
    metadata: v.optional(v.object({
      grantId: v.optional(v.string()),
      stripePaymentId: v.optional(v.string()),
    })),
  },
  handler: async (ctx, { userId, scenarioId, amount, reason, metadata }) => {
    // Get or create token record
    const existing = await ctx.db
      .query("scenarioTokens")
      .withIndex("by_user_scenario", q =>
        q.eq("userId", userId).eq("scenarioId", scenarioId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        balance: existing.balance + amount,
      });
    } else {
      await ctx.db.insert("scenarioTokens", {
        userId,
        scenarioId,
        balance: amount,
      });
    }

    // Log transaction
    await ctx.db.insert("tokenTransactions", {
      userId,
      scenarioId,
      amount,
      reason,
      metadata,
      createdAt: Date.now(),
    });
  },
});

// Internal: Consume token (called when debate completes)
export const INTERNAL_consumeToken = internalMutation({
  args: {
    userId: v.id("users"),
    scenarioId: v.string(),
    debateId: v.id("debates"),
  },
  handler: async (ctx, { userId, scenarioId, debateId }) => {
    // Check if subscriber first
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", q => q.eq("userId", userId))
      .first();

    if (subscription?.status === "active") {
      // Track subscriber usage instead
      await trackSubscriberUsage(ctx, userId);
      return { consumed: "subscriber_quota" };
    }

    // Consume token
    const tokenRecord = await ctx.db
      .query("scenarioTokens")
      .withIndex("by_user_scenario", q =>
        q.eq("userId", userId).eq("scenarioId", scenarioId)
      )
      .first();

    if (!tokenRecord || tokenRecord.balance < 1) {
      // This shouldn't happen if we check before debate starts
      console.error("Token consumption failed - no tokens", { userId, scenarioId });
      return { consumed: false, error: "no_tokens" };
    }

    await ctx.db.patch(tokenRecord._id, {
      balance: tokenRecord.balance - 1,
    });

    // Log transaction
    await ctx.db.insert("tokenTransactions", {
      userId,
      scenarioId,
      amount: -1,
      reason: "debate_complete",
      metadata: { debateId },
      createdAt: Date.now(),
    });

    return { consumed: true, remainingBalance: tokenRecord.balance - 1 };
  },
});

// Helper: Track subscriber monthly usage
async function trackSubscriberUsage(ctx: any, userId: Id<"users">) {
  const now = Date.now();
  const periodStart = getMonthStart(now);
  const periodEnd = getMonthEnd(now);

  const existing = await ctx.db
    .query("subscriberUsage")
    .withIndex("by_user_period", q =>
      q.eq("userId", userId).eq("periodStart", periodStart)
    )
    .first();

  if (existing) {
    const newCount = existing.debateCount + 1;
    await ctx.db.patch(existing._id, { debateCount: newCount });

    // Check if hitting cap (notify owner, don't block)
    if (newCount >= SUBSCRIBER_MONTHLY_CAP && !existing.notifiedOwner) {
      await ctx.db.patch(existing._id, { notifiedOwner: true });
      // TODO: Send notification to owner
      console.log(`User ${userId} hit subscriber cap of ${SUBSCRIBER_MONTHLY_CAP}`);
    }
  } else {
    await ctx.db.insert("subscriberUsage", {
      userId,
      periodStart,
      periodEnd,
      debateCount: 1,
      notifiedOwner: false,
    });
  }
}

function getMonthStart(timestamp: number): number {
  const date = new Date(timestamp);
  return new Date(date.getFullYear(), date.getMonth(), 1).getTime();
}

function getMonthEnd(timestamp: number): number {
  const date = new Date(timestamp);
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999).getTime();
}
```

### 2.2 Anti-Abuse Check

**Add to:** `convex/tokens.ts`

```typescript
// Check if user can create another opponent (anti-abuse)
export const canCreateOpponent = query({
  args: { scenarioId: v.string() },
  handler: async (ctx, { scenarioId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return { canCreate: false, reason: "not_authenticated" };

    // Subscribers can create freely
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", q => q.eq("userId", userId))
      .first();

    if (subscription?.status === "active") {
      return { canCreate: true };
    }

    // Get token balance
    const tokenRecord = await ctx.db
      .query("scenarioTokens")
      .withIndex("by_user_scenario", q =>
        q.eq("userId", userId).eq("scenarioId", scenarioId)
      )
      .first();

    const tokens = tokenRecord?.balance ?? 0;

    // Count opponents without completed debates
    const opponents = await ctx.db
      .query("opponents")
      .withIndex("by_user", q => q.eq("userId", userId))
      .filter(q => q.eq(q.field("scenarioType"), scenarioId))
      .collect();

    let incompleteCount = 0;
    for (const opp of opponents) {
      const completedDebate = await ctx.db
        .query("debates")
        .filter(q =>
          q.and(
            q.eq(q.field("opponentId"), opp._id),
            q.eq(q.field("status"), "completed")
          )
        )
        .first();

      if (!completedDebate) {
        incompleteCount++;
      }
    }

    const canCreate = incompleteCount < tokens + OPPONENT_CREATION_BUFFER;

    return {
      canCreate,
      incompleteOpponents: incompleteCount,
      tokens,
      buffer: OPPONENT_CREATION_BUFFER,
    };
  },
});
```

---

## Phase 3: Integration Points

### 3.1 Debate Completion Hook

**File:** `convex/http.ts`

**Location:** Inside the `/vapi-webhook` handler, after `debates.complete` call (around line 320)

Add token consumption:

```typescript
// After: await ctx.runMutation(api.debates.complete, { ... });

// Consume token
const debate = await ctx.runQuery(api.debates.get, { debateId });
if (debate && debate.opponentId) {
  const opponent = await ctx.runQuery(api.opponents.get, {
    opponentId: debate.opponentId
  });

  if (opponent?.scenarioType) {
    await ctx.runMutation(internal.tokens.INTERNAL_consumeToken, {
      userId: debate.userId,
      scenarioId: opponent.scenarioType,
      debateId,
    });
  }
}
```

### 3.2 Opponent Creation Gate

**File:** `convex/opponents.ts`

**Location:** At the start of the `create` mutation (around line 10)

Add access check:

```typescript
export const create = mutation({
  args: { /* existing args */ },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // NEW: Check if user can create opponent
    if (args.scenarioType) {
      const canCreate = await ctx.runQuery(api.tokens.canCreateOpponent, {
        scenarioId: args.scenarioType,
      });

      if (!canCreate.canCreate) {
        throw new Error(
          `Cannot create opponent: ${canCreate.incompleteOpponents} incomplete opponents, ` +
          `${canCreate.tokens} tokens available`
        );
      }
    }

    // ... rest of existing create logic
  },
});
```

### 3.3 Debate Start Gate

**File:** `convex/debates.ts`

**Location:** At the start of the `create` mutation (around line 15)

Add access check:

```typescript
export const create = mutation({
  args: { /* existing args */ },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // NEW: Check access before creating debate
    if (args.scenarioType) {
      const access = await ctx.runQuery(api.tokens.checkAccess, {
        scenarioId: args.scenarioType,
      });

      if (!access.hasAccess) {
        throw new Error(`No access to scenario: ${access.reason}`);
      }
    }

    // ... rest of existing create logic
  },
});
```

---

## Phase 4: Marketing Funnel

### 4.1 Grant Link System

**Add to:** `convex/tokens.ts`

```typescript
import { nanoid } from "nanoid";
import { FUNNEL_GRANT_AMOUNT, GRANT_EXPIRATION_MS } from "./lib/monetization";

// Create a grant link (admin only for now)
export const createGrantLink = mutation({
  args: {
    scenarioId: v.string(),
    tokenAmount: v.optional(v.number()),
    utmSource: v.optional(v.string()),
    utmCampaign: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // TODO: Add admin check

    const grantToken = nanoid(16);

    await ctx.db.insert("pendingGrants", {
      grantToken,
      scenarioId: args.scenarioId,
      tokenAmount: args.tokenAmount ?? FUNNEL_GRANT_AMOUNT,
      claimed: false,
      createdAt: Date.now(),
      expiresAt: Date.now() + GRANT_EXPIRATION_MS,
      utmSource: args.utmSource,
      utmCampaign: args.utmCampaign,
    });

    return { grantToken };
  },
});

// Claim a grant (called after user signs up)
export const claimGrant = mutation({
  args: { grantToken: v.string() },
  handler: async (ctx, { grantToken }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const grant = await ctx.db
      .query("pendingGrants")
      .withIndex("by_token", q => q.eq("grantToken", grantToken))
      .first();

    if (!grant) {
      return { success: false, error: "invalid_token" };
    }

    if (grant.claimed) {
      return { success: false, error: "already_claimed" };
    }

    if (grant.expiresAt && grant.expiresAt < Date.now()) {
      return { success: false, error: "expired" };
    }

    // Check if user already claimed tokens for this scenario
    const existingClaim = await ctx.db
      .query("pendingGrants")
      .withIndex("by_user", q => q.eq("claimedBy", userId))
      .filter(q => q.eq(q.field("scenarioId"), grant.scenarioId))
      .first();

    if (existingClaim) {
      return { success: false, error: "already_claimed_scenario" };
    }

    // Mark as claimed
    await ctx.db.patch(grant._id, {
      claimed: true,
      claimedBy: userId,
    });

    // Grant tokens
    await ctx.runMutation(internal.tokens.INTERNAL_grantTokens, {
      userId,
      scenarioId: grant.scenarioId,
      amount: grant.tokenAmount,
      reason: "funnel_grant",
      metadata: { grantId: grant._id },
    });

    return {
      success: true,
      scenarioId: grant.scenarioId,
      tokensGranted: grant.tokenAmount,
    };
  },
});

// Check if a grant token is valid (for showing UI before login)
export const checkGrantToken = query({
  args: { grantToken: v.string() },
  handler: async (ctx, { grantToken }) => {
    const grant = await ctx.db
      .query("pendingGrants")
      .withIndex("by_token", q => q.eq("grantToken", grantToken))
      .first();

    if (!grant) return { valid: false, error: "not_found" };
    if (grant.claimed) return { valid: false, error: "claimed" };
    if (grant.expiresAt && grant.expiresAt < Date.now()) {
      return { valid: false, error: "expired" };
    }

    return {
      valid: true,
      scenarioId: grant.scenarioId,
      tokenAmount: grant.tokenAmount,
    };
  },
});
```

### 4.2 Claim Route

**New File:** `src/routes/claim.$token.tsx`

```tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useConvexAuth, useConvexQuery, useConvexMutation } from "@convex-dev/react";
import { api } from "@convex/_generated/api";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/claim/$token")({
  component: ClaimPage,
});

function ClaimPage() {
  const { token } = Route.useParams();
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();
  const grantInfo = useConvexQuery(api.tokens.checkGrantToken, { grantToken: token });
  const claimGrant = useConvexMutation(api.tokens.claimGrant);
  const [claimStatus, setClaimStatus] = useState<"idle" | "claiming" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  // Auto-claim when authenticated
  useEffect(() => {
    if (isAuthenticated && grantInfo?.valid && claimStatus === "idle") {
      setClaimStatus("claiming");
      claimGrant({ grantToken: token })
        .then((result) => {
          if (result.success) {
            setClaimStatus("success");
            // Redirect to opponent profile for this scenario
            window.location.href = `/dashboard/opponent-profile?scenario=${result.scenarioId}`;
          } else {
            setClaimStatus("error");
            setError(result.error);
          }
        })
        .catch((err) => {
          setClaimStatus("error");
          setError(err.message);
        });
    }
  }, [isAuthenticated, grantInfo, claimStatus]);

  if (authLoading || !grantInfo) {
    return <LoadingState />;
  }

  if (!grantInfo.valid) {
    return <InvalidGrantPage error={grantInfo.error} />;
  }

  if (!isAuthenticated) {
    // Store token in session, redirect to login
    sessionStorage.setItem("pendingGrantToken", token);
    return <SignUpPrompt scenarioId={grantInfo.scenarioId} tokens={grantInfo.tokenAmount} />;
  }

  if (claimStatus === "claiming") {
    return <ClaimingState />;
  }

  if (claimStatus === "error") {
    return <ErrorState error={error} />;
  }

  return <LoadingState />;
}
```

### 4.3 Post-Login Grant Claim

**File:** `src/routes/_app/_auth/onboarding/_layout.username.tsx`

**Location:** After successful `completeOnboarding` call (around line 35)

```tsx
// After: await completeOnboarding({ username });

// Check for pending grant token
const pendingToken = sessionStorage.getItem("pendingGrantToken");
if (pendingToken) {
  sessionStorage.removeItem("pendingGrantToken");
  try {
    const result = await claimGrant({ grantToken: pendingToken });
    if (result.success) {
      // Redirect to the scenario's opponent profile
      navigate({
        to: "/dashboard/opponent-profile",
        search: { scenario: result.scenarioId }
      });
      return;
    }
  } catch (e) {
    console.error("Failed to claim grant:", e);
  }
}

// Default redirect
navigate({ to: "/dashboard" });
```

---

## Phase 5: UI Integration

### 5.1 Scenario Selector Gating

**File:** `src/routes/_app/_auth/dashboard/opponent-profile.tsx`

**Location:** In the `ScenarioSelector` component (around line 370)

```tsx
// Add to component
const tokenBalances = useConvexQuery(api.tokens.getAllBalances);
const subscription = useConvexQuery(api.app.getCurrentUser);
const isSubscriber = subscription?.subscription?.status === "active";

// In the render, for each scenario option:
const hasAccess = isSubscriber || (tokenBalances?.[scenario.id] ?? 0) > 0;

<Button
  variant={hasAccess ? "outline" : "ghost"}
  className={cn(
    "w-full justify-start",
    !hasAccess && "opacity-50 cursor-not-allowed"
  )}
  disabled={!hasAccess}
  onClick={() => hasAccess && setSelectedScenario(scenario.id)}
>
  {scenario.name}
  {!hasAccess && (
    <span className="ml-auto text-xs text-muted-foreground">
      No tokens
    </span>
  )}
  {hasAccess && !isSubscriber && (
    <span className="ml-auto text-xs text-primary">
      {tokenBalances[scenario.id]} tokens
    </span>
  )}
</Button>
```

### 5.2 Token Balance Display

**New Component:** `src/components/TokenBalance.tsx`

```tsx
import { useConvexQuery } from "@convex-dev/react";
import { api } from "@convex/_generated/api";
import { Coins } from "lucide-react";

export function TokenBalance({ scenarioId }: { scenarioId: string }) {
  const balance = useConvexQuery(api.tokens.getBalance, { scenarioId });
  const user = useConvexQuery(api.app.getCurrentUser);
  const isSubscriber = user?.subscription?.status === "active";

  if (isSubscriber) {
    return (
      <div className="flex items-center gap-1.5 text-sm text-primary">
        <span className="font-medium">Unlimited</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-sm">
      <Coins className="h-4 w-4" />
      <span className="font-medium">{balance ?? 0}</span>
      <span className="text-muted-foreground">tokens</span>
    </div>
  );
}
```

### 5.3 Purchase Flow

**File:** `src/routes/_app/_auth/dashboard/_layout.settings.billing.tsx`

Add token purchase section:

```tsx
// New section after subscription management

<Card>
  <CardHeader>
    <CardTitle>Token Packs</CardTitle>
    <CardDescription>
      Purchase tokens for individual scenarios
    </CardDescription>
  </CardHeader>
  <CardContent>
    <TokenPurchaseOptions />
  </CardContent>
</Card>

// Component
function TokenPurchaseOptions() {
  const scenarios = getScenarioOptions();
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0].value);
  const purchaseTokens = useConvexMutation(api.stripe.createTokenCheckout);

  const packs = [
    { tokens: 5, price: "$9.99" },
    { tokens: 15, price: "$24.99" },
    { tokens: 50, price: "$69.99" },
  ];

  return (
    <div className="space-y-4">
      <Select value={selectedScenario} onValueChange={setSelectedScenario}>
        <SelectTrigger>
          <SelectValue placeholder="Select scenario" />
        </SelectTrigger>
        <SelectContent>
          {scenarios.map(s => (
            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="grid grid-cols-3 gap-3">
        {packs.map(pack => (
          <Button
            key={pack.tokens}
            variant="outline"
            onClick={() => purchaseTokens({
              scenarioId: selectedScenario,
              tokens: pack.tokens
            })}
          >
            {pack.tokens} tokens
            <span className="text-muted-foreground ml-1">{pack.price}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
```

---

## Phase 6: Stripe Products

### 6.1 Create Products in Stripe Dashboard

**Token Packs (One-time payments):**
1. `token_pack_5` - 5 Tokens - $9.99
2. `token_pack_15` - 15 Tokens - $24.99
3. `token_pack_50` - 50 Tokens - $69.99

**Metadata on each product:**
- `type: "token_pack"`
- `tokens: 5` (or 15, 50)

### 6.2 Token Purchase Checkout

**Add to:** `convex/stripe.ts`

```typescript
export const createTokenCheckout = action({
  args: {
    scenarioId: v.string(),
    packSize: v.union(v.literal(5), v.literal(15), v.literal(50)),
  },
  handler: async (ctx, { scenarioId, packSize }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.runQuery(api.app.getCurrentUser);
    if (!user?.customerId) throw new Error("No Stripe customer");

    const priceIds = {
      5: "price_xxx",   // TODO: Add actual Stripe price IDs
      15: "price_yyy",
      50: "price_zzz",
    };

    const session = await stripe.checkout.sessions.create({
      customer: user.customerId,
      mode: "payment",
      line_items: [{
        price: priceIds[packSize],
        quantity: 1,
      }],
      metadata: {
        userId: userId.toString(),
        scenarioId,
        packSize: packSize.toString(),
        type: "token_purchase",
      },
      success_url: `${SITE_URL}/dashboard?purchase=success`,
      cancel_url: `${SITE_URL}/dashboard/settings/billing`,
    });

    return { url: session.url };
  },
});
```

### 6.3 Token Purchase Webhook Handler

**Add to:** `convex/http.ts` (in Stripe webhook handler)

```typescript
// In handleCheckoutSessionCompleted, add:

if (session.metadata?.type === "token_purchase") {
  const userId = session.metadata.userId as Id<"users">;
  const scenarioId = session.metadata.scenarioId;
  const packSize = parseInt(session.metadata.packSize);

  await ctx.runMutation(internal.tokens.INTERNAL_grantTokens, {
    userId,
    scenarioId,
    amount: packSize,
    reason: "purchase",
    metadata: { stripePaymentId: session.id },
  });
}
```

---

## File Change Summary

### New Files
| File | Purpose |
|------|---------|
| `convex/lib/monetization.ts` | Constants and config |
| `convex/tokens.ts` | Token queries and mutations |
| `src/routes/claim.$token.tsx` | Grant claim route |
| `src/components/TokenBalance.tsx` | Balance display component |

### Modified Files
| File | Changes |
|------|---------|
| `convex/schema.ts` | Add 4 new tables |
| `convex/http.ts` | Token consumption in Vapi webhook, token purchase in Stripe webhook |
| `convex/stripe.ts` | Add `createTokenCheckout` action |
| `convex/opponents.ts` | Add anti-abuse check in `create` |
| `convex/debates.ts` | Add access check in `create` |
| `src/routes/_app/_auth/dashboard/opponent-profile.tsx` | Scenario gating UI |
| `src/routes/_app/_auth/dashboard/_layout.settings.billing.tsx` | Token purchase UI |
| `src/routes/_app/_auth/onboarding/_layout.username.tsx` | Post-login grant claim |

---

## Testing Checklist

- [ ] Create user, verify no tokens
- [ ] Try to create opponent without tokens (should fail or show error)
- [ ] Create grant link, visit as logged-out user
- [ ] Sign up via grant link, verify tokens granted
- [ ] Create opponent with tokens
- [ ] Start and complete debate, verify token consumed
- [ ] Subscribe user, verify unlimited access
- [ ] Complete 100 debates as subscriber, verify owner notification
- [ ] Purchase token pack, verify tokens added
- [ ] Test scenario selector UI shows correct access state

---

## Open Questions

1. **Failed debates** - If Vapi disconnects mid-debate, does the token get consumed? Currently: No, only on `end-of-call-report`. May need to handle abandoned debates.

2. **Refunds** - Manual admin process or self-service? Currently: Would need admin mutation. Refunds can be added to a future implementation. 

3. **Pack prices** - It is $10 for ten tokens. 

4. **Grant link UI** - We Need admin dashboard to create link wheere we can adjust the token and scenario type

5. **Legacy free trial** - Current 7-day trial in Stripe plans - keep or remove?
