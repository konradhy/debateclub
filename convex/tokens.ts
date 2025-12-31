/**
 * Token Economy System
 *
 * Manages per-scenario token wallets, transaction logging, and access control.
 *
 * Security principles:
 * - All public queries require authentication and only return current user's data
 * - Token granting/consuming uses internalMutation (not callable from clients)
 * - Admin operations are internal-only (use Convex dashboard)
 */

import { v } from "convex/values";
import {
  query,
  mutation,
  internalMutation,
  internalQuery,
} from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { auth } from "./auth";
import {
  SUBSCRIBER_MONTHLY_CAP,
  OPPONENT_CREATION_BUFFER,
  FUNNEL_GRANT_AMOUNT,
  GRANT_EXPIRATION_MS,
  getMonthStart,
  getMonthEnd,
} from "./lib/monetization";

// ==========================================
// PUBLIC QUERIES (Auth Required)
// TODO: Explicit warnings and error messages to monitor suspicious behavior
// ==========================================

/**
 * Get token balance for a specific scenario.
 * Returns 0 if not authenticated or no tokens.
 */
export const getBalance = query({
  args: { scenarioId: v.string() },
  returns: v.number(),
  handler: async (ctx, { scenarioId }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return 0; //

    const record = await ctx.db
      .query("scenarioTokens")
      .withIndex("by_user_and_scenario", (q) =>
        q.eq("userId", userId).eq("scenarioId", scenarioId),
      )
      .first();

    return record?.balance ?? 0;
  },
});

/**
 * Get all token balances for current user.
 * Returns empty object if not authenticated.
 */
export const getAllBalances = query({
  args: {},
  returns: v.record(v.string(), v.number()),
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return {};

    const records = await ctx.db
      .query("scenarioTokens")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const balances: Record<string, number> = {};
    for (const r of records) {
      balances[r.scenarioId] = r.balance;
    }
    return balances;
  },
});

/**
 * Check if user can access a scenario (has tokens OR is subscriber).
 * Returns access status with reason.
 */
export const checkAccess = query({
  args: { scenarioId: v.string() },
  returns: v.object({
    hasAccess: v.boolean(),
    reason: v.union(
      v.literal("subscriber"),
      v.literal("tokens"),
      v.literal("no_tokens"),
      v.literal("not_authenticated"),
    ),
    balance: v.optional(v.number()),
  }),
  handler: async (ctx, { scenarioId }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return { hasAccess: false, reason: "not_authenticated" as const };
    }

    // Check subscription status first
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (subscription?.status === "active") {
      return { hasAccess: true, reason: "subscriber" as const };
    }

    // Check token balance
    const tokenRecord = await ctx.db
      .query("scenarioTokens")
      .withIndex("by_user_and_scenario", (q) =>
        q.eq("userId", userId).eq("scenarioId", scenarioId),
      )
      .first();

    if (tokenRecord && tokenRecord.balance > 0) {
      return {
        hasAccess: true,
        reason: "tokens" as const,
        balance: tokenRecord.balance,
      };
    }

    return { hasAccess: false, reason: "no_tokens" as const };
  },
});

/**
 * Check if user can create another opponent (anti-abuse).
 * Rule: incompleteOpponents < tokens + OPPONENT_CREATION_BUFFER
 */
export const canCreateOpponent = query({
  args: { scenarioId: v.string() },
  returns: v.object({
    canCreate: v.boolean(),
    reason: v.optional(v.string()),
    incompleteOpponents: v.optional(v.number()),
    tokens: v.optional(v.number()),
  }),
  handler: async (ctx, { scenarioId }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return { canCreate: false, reason: "not_authenticated" };
    }

    // Subscribers bypass this check
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (subscription?.status === "active") {
      return { canCreate: true };
    }

    // Get token balance
    const tokenRecord = await ctx.db
      .query("scenarioTokens")
      .withIndex("by_user_and_scenario", (q) =>
        q.eq("userId", userId).eq("scenarioId", scenarioId),
      )
      .first();

    const tokens = tokenRecord?.balance ?? 0;

    // Count opponents for this scenario without completed debates
    const opponents = await ctx.db
      .query("opponents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // Filter to this scenario
    const scenarioOpponents = opponents.filter(
      (opp) => opp.scenarioType === scenarioId,
    );

    let incompleteCount = 0;
    for (const opp of scenarioOpponents) {
      // Check if this opponent has any completed debates
      const debates = await ctx.db
        .query("debates")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .collect();

      const hasCompletedDebate = debates.some(
        (d) => d.opponentId === opp._id && d.status === "completed",
      );

      if (!hasCompletedDebate) {
        incompleteCount++;
      }
    }

    const canCreate = incompleteCount < tokens + OPPONENT_CREATION_BUFFER;

    if (!canCreate) {
      return {
        canCreate: false,
        reason: `Too many incomplete opponents (${incompleteCount}) for available tokens (${tokens})`,
        incompleteOpponents: incompleteCount,
        tokens,
      };
    }

    return {
      canCreate: true,
      incompleteOpponents: incompleteCount,
      tokens,
    };
  },
});

/**
 * Check if a grant token is valid (for showing UI before login).
 * This is safe to be public - only reveals validity, not user data.
 */
export const checkGrantToken = query({
  args: { grantToken: v.string() },
  returns: v.object({
    valid: v.boolean(),
    error: v.optional(v.string()),
    scenarioId: v.optional(v.string()),
    tokenAmount: v.optional(v.number()),
  }),
  handler: async (ctx, { grantToken }) => {
    const grant = await ctx.db
      .query("pendingGrants")
      .withIndex("by_token", (q) => q.eq("grantToken", grantToken))
      .first();

    if (!grant) {
      return { valid: false, error: "not_found" };
    }

    if (grant.claimed) {
      return { valid: false, error: "already_claimed" };
    }

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

/**
 * Get subscription status for current user.
 */
export const getSubscriptionStatus = query({
  args: {},
  returns: v.union(
    v.object({
      isSubscriber: v.literal(true),
      status: v.string(),
      currentPeriodEnd: v.optional(v.number()),
    }),
    v.object({
      isSubscriber: v.literal(false),
    }),
    v.null(),
  ),
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return null;

    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (subscription?.status === "active") {
      return {
        isSubscriber: true as const,
        status: subscription.status,
        currentPeriodEnd: subscription.currentPeriodEnd,
      };
    }

    return { isSubscriber: false as const };
  },
});

// ==========================================
// PUBLIC MUTATIONS (Auth Required)
// ==========================================

/**
 * Claim a grant token (after user signs up/logs in).
 */
export const claimGrant = mutation({
  args: { grantToken: v.string() },
  returns: v.object({
    success: v.boolean(),
    error: v.optional(v.string()),
    scenarioId: v.optional(v.string()),
    tokensGranted: v.optional(v.number()),
  }),
  handler: async (ctx, { grantToken }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return { success: false, error: "not_authenticated" };
    }

    const grant = await ctx.db
      .query("pendingGrants")
      .withIndex("by_token", (q) => q.eq("grantToken", grantToken))
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
    const existingClaims = await ctx.db
      .query("pendingGrants")
      .withIndex("by_claimed_user", (q) => q.eq("claimedBy", userId))
      .collect();

    const alreadyClaimedScenario = existingClaims.some(
      (c) => c.scenarioId === grant.scenarioId,
    );

    if (alreadyClaimedScenario) {
      return { success: false, error: "already_claimed_scenario" };
    }

    // Mark grant as claimed
    await ctx.db.patch(grant._id, {
      claimed: true,
      claimedBy: userId,
    });

    // Grant tokens using internal mutation
    await ctx.scheduler.runAfter(0, internal.tokens.INTERNAL_grantTokens, {
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

// ==========================================
// INTERNAL MUTATIONS (Server-side only)
// ==========================================

/**
 * Grant tokens to a user. Called by webhooks, admin, or funnel claims.
 * NOT callable from client.
 */
export const INTERNAL_grantTokens = internalMutation({
  args: {
    userId: v.id("users"),
    scenarioId: v.string(),
    amount: v.number(),
    reason: v.union(
      v.literal("funnel_grant"),
      v.literal("purchase"),
      v.literal("admin_grant"),
      v.literal("refund"),
    ),
    metadata: v.optional(
      v.object({
        grantId: v.optional(v.id("pendingGrants")),
        stripePaymentId: v.optional(v.string()),
      }),
    ),
  },
  returns: v.object({
    newBalance: v.number(),
  }),
  handler: async (ctx, { userId, scenarioId, amount, reason, metadata }) => {
    // Get or create token record
    const existing = await ctx.db
      .query("scenarioTokens")
      .withIndex("by_user_and_scenario", (q) =>
        q.eq("userId", userId).eq("scenarioId", scenarioId),
      )
      .first();

    let newBalance: number;

    if (existing) {
      newBalance = existing.balance + amount;
      await ctx.db.patch(existing._id, { balance: newBalance });
    } else {
      newBalance = amount;
      await ctx.db.insert("scenarioTokens", {
        userId,
        scenarioId,
        balance: newBalance,
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

    return { newBalance };
  },
});

/**
 * Consume a token when debate completes. Called from http.ts webhook.
 * NOT callable from client.
 */
export const INTERNAL_consumeToken = internalMutation({
  args: {
    userId: v.id("users"),
    scenarioId: v.string(),
    debateId: v.id("debates"),
  },
  returns: v.object({
    consumed: v.union(v.boolean(), v.literal("subscriber_quota")),
    remainingBalance: v.optional(v.number()),
    error: v.optional(v.string()),
  }),
  handler: async (ctx, { userId, scenarioId, debateId }) => {
    // Check if subscriber first
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (subscription?.status === "active") {
      // Track subscriber usage instead of consuming token
      await trackSubscriberUsage(ctx, userId);
      return { consumed: "subscriber_quota" as const };
    }

    // Consume token
    const tokenRecord = await ctx.db
      .query("scenarioTokens")
      .withIndex("by_user_and_scenario", (q) =>
        q.eq("userId", userId).eq("scenarioId", scenarioId),
      )
      .first();

    if (!tokenRecord || tokenRecord.balance < 1) {
      // This shouldn't happen if access was checked before debate started
      console.error("Token consumption failed - no tokens", {
        userId,
        scenarioId,
      });
      return { consumed: false, error: "no_tokens" };
    }

    const newBalance = tokenRecord.balance - 1;
    await ctx.db.patch(tokenRecord._id, { balance: newBalance });

    // Log transaction
    await ctx.db.insert("tokenTransactions", {
      userId,
      scenarioId,
      amount: -1,
      reason: "debate_complete",
      metadata: { debateId },
      createdAt: Date.now(),
    });

    return { consumed: true, remainingBalance: newBalance };
  },
});

/**
 * Create a grant link (admin only - use via Convex dashboard).
 */
export const INTERNAL_createGrantLink = internalMutation({
  args: {
    scenarioId: v.string(),
    tokenAmount: v.optional(v.number()),
    utmSource: v.optional(v.string()),
    utmCampaign: v.optional(v.string()),
  },
  returns: v.object({
    grantToken: v.string(),
    grantId: v.id("pendingGrants"),
  }),
  handler: async (ctx, args) => {
    // Generate a unique token
    const grantToken = generateGrantToken();

    const grantId = await ctx.db.insert("pendingGrants", {
      grantToken,
      scenarioId: args.scenarioId,
      tokenAmount: args.tokenAmount ?? FUNNEL_GRANT_AMOUNT,
      claimed: false,
      createdAt: Date.now(),
      expiresAt: Date.now() + GRANT_EXPIRATION_MS,
      utmSource: args.utmSource,
      utmCampaign: args.utmCampaign,
    });

    return { grantToken, grantId };
  },
});

// ==========================================
// INTERNAL QUERIES (Server-side only)
// ==========================================

/**
 * Get access status for a user (for use in other internal functions).
 */
export const INTERNAL_checkAccess = internalQuery({
  args: {
    userId: v.id("users"),
    scenarioId: v.string(),
  },
  returns: v.object({
    hasAccess: v.boolean(),
    reason: v.string(),
  }),
  handler: async (ctx, { userId, scenarioId }) => {
    // Check subscription status
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (subscription?.status === "active") {
      return { hasAccess: true, reason: "subscriber" };
    }

    // Check token balance
    const tokenRecord = await ctx.db
      .query("scenarioTokens")
      .withIndex("by_user_and_scenario", (q) =>
        q.eq("userId", userId).eq("scenarioId", scenarioId),
      )
      .first();

    if (tokenRecord && tokenRecord.balance > 0) {
      return { hasAccess: true, reason: "tokens" };
    }

    return { hasAccess: false, reason: "no_tokens" };
  },
});

// ==========================================
// ADMIN QUERIES (Admin-gated)
// ==========================================

/**
 * Get all grant links with claim stats.
 * Admin only - checks isAdmin field on current user.
 */
export const getAllGrantLinks = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("pendingGrants"),
      grantToken: v.string(),
      scenarioId: v.string(),
      tokenAmount: v.number(),
      claimed: v.boolean(),
      claimedBy: v.optional(v.id("users")),
      createdAt: v.number(),
      expiresAt: v.optional(v.number()),
      utmSource: v.optional(v.string()),
      utmCampaign: v.optional(v.string()),
      claimCount: v.number(),
      isExpired: v.boolean(),
    }),
  ),
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return [];

    const user = await ctx.db.get(userId);
    if (!user?.isAdmin) return [];

    const grants = await ctx.db.query("pendingGrants").order("desc").collect();

    const now = Date.now();
    return grants.map((grant) => {
      const { _creationTime, ...g } = grant;
      return {
        ...g,
        claimCount: grant.claimed ? 1 : 0,
        isExpired: grant.expiresAt ? grant.expiresAt < now : false,
      };
    });
  },
});

/**
 * Get detailed stats for a specific grant link.
 * Admin only.
 */
export const getGrantLinkStats = query({
  args: { grantId: v.id("pendingGrants") },
  returns: v.union(
    v.object({
      grant: v.object({
        _id: v.id("pendingGrants"),
        grantToken: v.string(),
        scenarioId: v.string(),
        tokenAmount: v.number(),
        claimed: v.boolean(),
        createdAt: v.number(),
        expiresAt: v.optional(v.number()),
        utmSource: v.optional(v.string()),
        utmCampaign: v.optional(v.string()),
      }),
      claimer: v.optional(
        v.object({
          email: v.optional(v.string()),
          claimedAt: v.optional(v.number()),
        }),
      ),
    }),
    v.null(),
  ),
  handler: async (ctx, { grantId }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);
    if (!user?.isAdmin) return null;

    const grant = await ctx.db.get(grantId);
    if (!grant) return null;

    let claimer = undefined;
    if (grant.claimedBy) {
      const claimedByUserId = grant.claimedBy;
      const claimerUser = await ctx.db.get(claimedByUserId);
      if (claimerUser) {
        // Find the transaction to get claim time
        const transaction = await ctx.db
          .query("tokenTransactions")
          .withIndex("by_user", (q) => q.eq("userId", claimedByUserId))
          .filter((q) =>
            q.and(
              q.eq(q.field("reason"), "funnel_grant"),
              q.eq(q.field("scenarioId"), grant.scenarioId),
            ),
          )
          .first();

        claimer = {
          email: claimerUser.email,
          claimedAt: transaction?.createdAt,
        };
      }
    }

    return {
      grant: {
        _id: grant._id,
        grantToken: grant.grantToken,
        scenarioId: grant.scenarioId,
        tokenAmount: grant.tokenAmount,
        claimed: grant.claimed,
        createdAt: grant.createdAt,
        expiresAt: grant.expiresAt,
        utmSource: grant.utmSource,
        utmCampaign: grant.utmCampaign,
      },
      claimer,
    };
  },
});

/**
 * Deactivate a grant link (admin only).
 */
export const deactivateGrant = mutation({
  args: { grantId: v.id("pendingGrants") },
  returns: v.object({ success: v.boolean() }),
  handler: async (ctx, { grantId }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return { success: false };

    const user = await ctx.db.get(userId);
    if (!user?.isAdmin) return { success: false };

    const grant = await ctx.db.get(grantId);
    if (!grant) return { success: false };

    // Set expiration to now to deactivate
    await ctx.db.patch(grantId, { expiresAt: Date.now() - 1 });
    return { success: true };
  },
});

/**
 * Create a grant link (admin only, public mutation).
 */
export const createGrantLink = mutation({
  args: {
    scenarioId: v.string(),
    tokenAmount: v.optional(v.number()),
    expirationDays: v.optional(v.number()), // null = never
    utmSource: v.optional(v.string()),
    utmCampaign: v.optional(v.string()),
  },
  returns: v.union(
    v.object({
      success: v.literal(true),
      grantToken: v.string(),
      grantId: v.id("pendingGrants"),
    }),
    v.object({
      success: v.literal(false),
      error: v.string(),
    }),
  ),
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return { success: false as const, error: "not_authenticated" };

    const user = await ctx.db.get(userId);
    if (!user?.isAdmin)
      return { success: false as const, error: "not_authorized" };

    const grantToken = generateGrantToken();
    const expiresAt = args.expirationDays
      ? Date.now() + args.expirationDays * 24 * 60 * 60 * 1000
      : undefined;

    const grantId = await ctx.db.insert("pendingGrants", {
      grantToken,
      scenarioId: args.scenarioId,
      tokenAmount: args.tokenAmount ?? FUNNEL_GRANT_AMOUNT,
      claimed: false,
      createdAt: Date.now(),
      expiresAt,
      utmSource: args.utmSource,
      utmCampaign: args.utmCampaign,
    });

    return { success: true as const, grantToken, grantId };
  },
});

/**
 * Grant tokens to a user by email (admin only).
 */
export const adminGrantTokens = mutation({
  args: {
    userEmail: v.string(),
    scenarioId: v.string(),
    amount: v.number(),
    reason: v.union(v.literal("admin_grant"), v.literal("refund")),
  },
  returns: v.union(
    v.object({
      success: v.literal(true),
      newBalance: v.number(),
    }),
    v.object({
      success: v.literal(false),
      error: v.string(),
    }),
  ),
  handler: async (ctx, args) => {
    const adminUserId = await auth.getUserId(ctx);
    if (!adminUserId)
      return { success: false as const, error: "not_authenticated" };

    const adminUser = await ctx.db.get(adminUserId);
    if (!adminUser?.isAdmin)
      return { success: false as const, error: "not_authorized" };

    // Find user by email
    const targetUser = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.userEmail))
      .first();

    if (!targetUser)
      return { success: false as const, error: "user_not_found" };

    // Get or create token record
    const existing = await ctx.db
      .query("scenarioTokens")
      .withIndex("by_user_and_scenario", (q) =>
        q.eq("userId", targetUser._id).eq("scenarioId", args.scenarioId),
      )
      .first();

    let newBalance: number;

    if (existing) {
      newBalance = existing.balance + args.amount;
      await ctx.db.patch(existing._id, { balance: newBalance });
    } else {
      newBalance = args.amount;
      await ctx.db.insert("scenarioTokens", {
        userId: targetUser._id,
        scenarioId: args.scenarioId,
        balance: newBalance,
      });
    }

    // Log transaction
    await ctx.db.insert("tokenTransactions", {
      userId: targetUser._id,
      scenarioId: args.scenarioId,
      amount: args.amount,
      reason: args.reason,
      createdAt: Date.now(),
    });

    return { success: true as const, newBalance };
  },
});

// ==========================================
// TRANSACTION HISTORY (All Users)
// ==========================================

/**
 * Get paginated transaction history for current user.
 */
export const getTransactionHistory = query({
  args: {
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  returns: v.object({
    transactions: v.array(
      v.object({
        _id: v.id("tokenTransactions"),
        scenarioId: v.string(),
        amount: v.number(),
        reason: v.string(),
        createdAt: v.number(),
      }),
    ),
    nextCursor: v.optional(v.string()),
    hasMore: v.boolean(),
  }),
  handler: async (ctx, { limit = 20, cursor }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return { transactions: [], hasMore: false };

    const txQuery = ctx.db
      .query("tokenTransactions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc");

    // Simple offset-based pagination using cursor as offset
    const offset = cursor ? parseInt(cursor, 10) : 0;
    const allTransactions = await txQuery.collect();
    const paginatedTransactions = allTransactions.slice(offset, offset + limit);

    const hasMore = offset + limit < allTransactions.length;
    const nextCursor = hasMore ? String(offset + limit) : undefined;

    return {
      transactions: paginatedTransactions.map((t) => ({
        _id: t._id,
        scenarioId: t.scenarioId,
        amount: t.amount,
        reason: t.reason,
        createdAt: t.createdAt,
      })),
      nextCursor,
      hasMore,
    };
  },
});

// ==========================================
// TEST MUTATIONS (For development/testing)
// ==========================================

/**
 * Grant tokens to current user for testing.
 * Available to all users (for testing without Stripe).
 */
export const testGrantTokens = mutation({
  args: {
    scenarioId: v.string(),
    amount: v.number(),
  },
  returns: v.object({
    success: v.boolean(),
    newBalance: v.optional(v.number()),
    error: v.optional(v.string()),
  }),
  handler: async (ctx, { scenarioId, amount }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return { success: false, error: "not_authenticated" };

    // Get or create token record
    const existing = await ctx.db
      .query("scenarioTokens")
      .withIndex("by_user_and_scenario", (q) =>
        q.eq("userId", userId).eq("scenarioId", scenarioId),
      )
      .first();

    let newBalance: number;

    if (existing) {
      newBalance = existing.balance + amount;
      await ctx.db.patch(existing._id, { balance: newBalance });
    } else {
      newBalance = amount;
      await ctx.db.insert("scenarioTokens", {
        userId,
        scenarioId,
        balance: newBalance,
      });
    }

    // Log transaction
    await ctx.db.insert("tokenTransactions", {
      userId,
      scenarioId,
      amount,
      reason: "purchase", // Use purchase for test grants
      metadata: { stripePaymentId: "test_" + Date.now() },
      createdAt: Date.now(),
    });

    return { success: true, newBalance };
  },
});

/**
 * Create active subscription for current user (for testing).
 */
export const testCreateSubscription = mutation({
  args: {},
  returns: v.object({
    success: v.boolean(),
    error: v.optional(v.string()),
  }),
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return { success: false, error: "not_authenticated" };

    // Check if already subscribed
    const existing = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    const now = Date.now();
    const periodEnd = now + 30 * 24 * 60 * 60 * 1000; // 30 days from now

    if (existing) {
      await ctx.db.patch(existing._id, {
        status: "active",
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
        cancelAtPeriodEnd: false,
      });
    } else {
      await ctx.db.insert("subscriptions", {
        userId,
        status: "active",
        stripeCustomerId: "test_cus_" + Date.now(),
        stripeSubscriptionId: "test_sub_" + Date.now(),
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
        cancelAtPeriodEnd: false,
      });
    }

    return { success: true };
  },
});

/**
 * Cancel subscription for current user (for testing).
 */
export const testCancelSubscription = mutation({
  args: {},
  returns: v.object({
    success: v.boolean(),
    error: v.optional(v.string()),
  }),
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return { success: false, error: "not_authenticated" };

    const existing = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!existing) {
      return { success: false, error: "no_subscription" };
    }

    await ctx.db.patch(existing._id, {
      status: "canceled",
      cancelAtPeriodEnd: true,
    });

    return { success: true };
  },
});

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Track subscriber monthly usage. Called when subscriber completes a debate.
 * Notifies owner if cap is reached but doesn't block.
 */
async function trackSubscriberUsage(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx: any,
  userId: Id<"users">,
): Promise<void> {
  const now = Date.now();
  const periodStart = getMonthStart(now);
  const periodEnd = getMonthEnd(now);

  const existing = await ctx.db
    .query("subscriberUsage")
    .withIndex(
      "by_user_and_period",
      (q: {
        eq: (
          field: string,
          value: unknown,
        ) => { eq: (field: string, value: unknown) => unknown };
      }) => q.eq("userId", userId).eq("periodStart", periodStart),
    )
    .first();

  if (existing) {
    const newCount = existing.debateCount + 1;
    await ctx.db.patch(existing._id, { debateCount: newCount });

    // Check if hitting cap (notify owner, don't block)
    if (newCount >= SUBSCRIBER_MONTHLY_CAP && !existing.notifiedOwner) {
      await ctx.db.patch(existing._id, { notifiedOwner: true });
      // TODO: Send email notification to owner
      console.log(
        `[MONETIZATION] User ${userId} hit subscriber cap of ${SUBSCRIBER_MONTHLY_CAP}`,
      );
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

/**
 * Generate a random grant token for marketing URLs.
 */
function generateGrantToken(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
