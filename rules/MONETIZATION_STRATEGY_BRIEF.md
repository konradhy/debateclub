# OratorPrep Monetization Strategy Brief

## Core Philosophy

**The Golden Rule**: A token is a completed debate in a specific scenario. Nothing more, nothing less.

**User Experience Principles**:
- Prep and research generation are ALWAYS free - we want users to prepare thoroughly
- Only debate practice (the Vapi call) costs tokens
- Subscribers appear to have "unlimited" access, but we track usage internally
- Marketing funnel users get scenario-specific tokens to try the exact use case that brought them in

---

## The Type System: A Story of Token Flow

The monetization system tells three interconnected stories through its types:

### Story 1: The User's Token Wallet

Every user has **separate token wallets for each scenario**. This is not a global pool.

**Why?** Marketing funnel story: A doctor clicks an ad about "practice difficult patient conversations" → signs up → receives 10 tokens specifically for the "doctor-patient-compliance" scenario. These tokens are locked to that scenario because the marketing promise was specific.

```typescript
// The user's per-scenario wallet
type ScenarioTokens = {
  _id: Id<"scenarioTokens">;
  userId: Id<"users">;
  scenarioId: string;         // "debate", "sales-cold-prospect", "doctor-patient-compliance"
  balance: number;            // How many debates they can do in this scenario
}

// Query: scenarioTokens.by_user_scenario(userId, scenarioId)
// Returns: The user's token balance for a specific scenario
```

**The Story**:
- User has 5 tokens for "debate" scenario
- User has 10 tokens for "doctor-patient-compliance" scenario
- User has 0 tokens for "sales-cold-prospect" scenario
- Each wallet is independent and scenario-specific

---

### Story 2: The Transaction Ledger (Audit Trail)

Every token movement is recorded. This is our source of truth for what happened and why.

```typescript
type TokenTransaction = {
  _id: Id<"tokenTransactions">;
  userId: Id<"users">;
  scenarioId: string;
  amount: number;              // +10 for grant, -1 for debate consumed
  reason:
    | "funnel_grant"           // Marketing funnel gave free tokens
    | "purchase"               // User bought a token pack
    | "debate_complete"        // User finished a debate, consumed token
    | "admin_grant"            // Admin manually gave tokens
    | "refund";                // User got a refund
  metadata?: {
    debateId?: Id<"debates">;           // Which debate consumed this token
    grantId?: string;                    // Which grant link gave this token
    stripePaymentId?: string;            // Which Stripe payment added this token
  };
  createdAt: number;
}

// Query: tokenTransactions.by_user_scenario(userId, scenarioId)
// Returns: Full history of token movements for a scenario
```

**The Story**:
1. User clicks marketing link → `+10 tokens` (reason: "funnel_grant")
2. User creates opponent profile → no transaction (prep is free!)
3. User completes first debate → `-1 token` (reason: "debate_complete", includes debateId)
4. User buys 50-pack → `+50 tokens` (reason: "purchase", includes stripePaymentId)
5. User completes 49 more debates → 49 transactions of `-1 token` each

**Why we need this**:
- Debugging: "Why does this user have 23 tokens?" → Check the ledger
- Analytics: "How many funnel tokens convert to purchases?"
- Support: "User claims they were charged but didn't get tokens" → Check the ledger

---

### Story 3: The Subscriber's Hidden Quota

Subscribers get "unlimited" access but we track their usage monthly. When they hit the cap (100 debates/month), we notify ourselves but DON'T block them.

```typescript
type SubscriberUsage = {
  _id: Id<"subscriberUsage">;
  userId: Id<"users">;
  periodStart: number;         // Start of billing month (timestamp)
  periodEnd: number;           // End of billing month (timestamp)
  debateCount: number;         // How many debates this month
  notifiedOwner: boolean;      // Did we alert the owner about hitting cap?
}

// Query: subscriberUsage.by_user_period(userId, periodStart)
// Returns: Usage for current billing period
```

**The Story**:
- User subscribes on Jan 15 → periodStart = Jan 15, periodEnd = Feb 15
- User does 50 debates → debateCount = 50
- User does 50 more debates → debateCount = 100, notifiedOwner = true (we get an email)
- User does 10 more debates → debateCount = 110 (they're NOT blocked, we just know)

**Why hidden?**
- User experience: "Unlimited feels unlimited"
- Business intelligence: We track who's power-using to understand product value
- Abuse detection: If someone hits 1000 debates/month, we investigate

**Important**: Subscribers do NOT consume from scenarioTokens. Their token balance is ignored. We only check subscriberUsage.

---

### Story 4: The Marketing Funnel Grant System

When we create a marketing campaign, we generate unique grant links that give tokens on signup.

```typescript
type PendingGrant = {
  _id: Id<"pendingGrants">;
  grantToken: string;          // Unique code in URL (e.g., "abc123xyz")
  scenarioId: string;          // Which scenario this grant is for
  tokenAmount: number;         // Usually 10
  claimed: boolean;            // Has someone claimed this?
  claimedBy?: Id<"users">;     // Who claimed it (if anyone)
  createdAt: number;
  expiresAt?: number;          // Optional expiration
  utmSource?: string;          // "facebook", "google", "reddit"
  utmCampaign?: string;        // "q1-doctor-ads"
}

// Query: pendingGrants.by_token(grantToken)
// Returns: The grant details for a URL token
```

**The User Journey**:

1. **Marketing creates grant**:
   ```
   scenarioId: "doctor-patient-compliance"
   tokenAmount: 10
   grantToken: "xyz789"
   ```
   URL: `https://oratorprep.com/claim/xyz789`

2. **User clicks ad** → Lands on `/claim/xyz789`

3. **If not logged in**:
   - Show: "Sign up and get 10 free practice sessions for patient compliance scenarios!"
   - Store `xyz789` in sessionStorage
   - Redirect to signup

4. **After signup/login**:
   - Check if grant is valid (not claimed, not expired)
   - Check if user already claimed tokens for this scenario
   - If valid:
     ```
     Mark grant as claimed
     Grant 10 tokens to scenarioTokens
     Create transaction in tokenTransactions
     Redirect to opponent-profile page for that scenario
     ```

**Why this design?**
- **Trackable**: We know exactly which campaign drove which signups
- **One-time use**: Can't share the link and all get free tokens
- **Scenario-locked**: Funnel promise matches delivered value
- **UTM integration**: Links work both on-site and in external ads

---

## The Access Control Story

Every time a user tries to do something, we ask: "Do they have access?"

### Anti-Abuse: Opponent Creation Limit

**The Problem**: User has 2 tokens but creates 50 opponent profiles, wasting server resources on prep generation.

**The Rule**: `pendingOpponents <= tokensAvailable + 2`

```typescript
// Check before creating opponent
type OpponentCreationCheck = {
  canCreate: boolean;
  incompleteOpponents: number;  // Opponents without completed debates
  tokens: number;                // Available tokens for this scenario
  buffer: number;                // Always 2 (the OPPONENT_CREATION_BUFFER constant)
}

// Logic:
// 1. Count opponents for this scenario with no completed debate
// 2. If (incompleteOpponents < tokens + 2) → allow creation
// 3. Else → reject with helpful message
```

**The Story**:
- User has 5 tokens
- User creates 6 opponents (5 + buffer of 2 = 7 allowed)
- User tries to create 8th opponent → BLOCKED
- User completes a debate → incompleteOpponents = 5, now can create more

**Exception**: Subscribers bypass this check entirely.

---

### Access Check: Can They Start a Debate?

Before creating a debate, we check if the user has access.

```typescript
type AccessCheck = {
  hasAccess: boolean;
  reason: "subscriber" | "tokens" | "no_tokens" | "not_authenticated";
  balance?: number;  // If reason is "tokens", how many they have
}

// Flow:
// 1. Check if user is subscriber → YES: return { hasAccess: true, reason: "subscriber" }
// 2. Check scenarioTokens balance → >0: return { hasAccess: true, reason: "tokens", balance }
// 3. Else → return { hasAccess: false, reason: "no_tokens" }
```

**Important**: This check happens at debate START, not creation of opponent. We want users to create opponents and see prep materials (it's free!). The paywall is at "Start Practice" button.

---

### Token Consumption: The Debate End Hook

When a Vapi call ends, we receive `end-of-call-report` webhook.

```typescript
// Webhook Flow:
async function handleDebateEnd(debateId: Id<"debates">) {
  const debate = await getDebate(debateId);
  const opponent = await getOpponent(debate.opponentId);
  const scenarioId = opponent.scenarioType;

  // Check if subscriber
  const subscription = await getActiveSubscription(debate.userId);

  if (subscription) {
    // Subscriber path: Track usage, check for cap
    await trackSubscriberUsage(debate.userId);
  } else {
    // Token path: Consume token
    await consumeToken(debate.userId, scenarioId, debateId);
  }
}

async function trackSubscriberUsage(userId: Id<"users">) {
  const now = Date.now();
  const periodStart = getMonthStart(now);

  const usage = await getOrCreateUsage(userId, periodStart);
  const newCount = usage.debateCount + 1;

  await updateUsage(usage._id, { debateCount: newCount });

  // Silent cap check
  if (newCount >= SUBSCRIBER_MONTHLY_CAP && !usage.notifiedOwner) {
    await sendOwnerNotification(userId, newCount);
    await updateUsage(usage._id, { notifiedOwner: true });
  }
}

async function consumeToken(
  userId: Id<"users">,
  scenarioId: string,
  debateId: Id<"debates">
) {
  const tokenRecord = await getScenarioTokens(userId, scenarioId);

  if (!tokenRecord || tokenRecord.balance < 1) {
    console.error("Token consumption failed - no tokens");
    // This shouldn't happen due to access check at debate start
    return;
  }

  // Deduct token
  await updateBalance(tokenRecord._id, tokenRecord.balance - 1);

  // Log transaction
  await createTransaction({
    userId,
    scenarioId,
    amount: -1,
    reason: "debate_complete",
    metadata: { debateId },
    createdAt: Date.now()
  });
}
```

**Critical Design Decision**: Token consumed on END, not start.

**Why?**
- User starts debate → Access check passes (has tokens)
- Call drops immediately due to network issue
- No token consumed (webhook never fires)
- User can retry without losing token

**Trade-off**: User could theoretically start a debate, see it's not going well, and hang up before it ends to save their token. We accept this because:
1. Most users won't game this
2. Better UX than penalizing for technical failures
3. We can detect abuse via webhook logs if needed

---

## UI Implications: The Story Users See

### Scenario Selector (Opponent Creation Page)

```typescript
// What the UI needs to know:
type ScenarioAccessState = {
  scenarioId: string;
  scenarioName: string;
  hasAccess: boolean;
  accessReason: "subscriber" | "tokens" | "no_tokens";
  tokenBalance?: number;
}

// Visual states:
// 1. Subscriber: "Unlimited" badge (green)
// 2. Has tokens: "5 tokens" (blue)
// 3. No tokens: Grayed out, "No tokens - Purchase Pack" (gray)
```

**User sees**:
```
[✓ Debate] Unlimited                    ← Subscriber
[✓ Sales - Cold Call] 3 tokens          ← Has tokens
[⚠ Doctor - Patient] No tokens          ← Blocked, can purchase
```

### Token Balance Display Component

```typescript
type TokenBalanceDisplay = {
  scenarioId: string;
  scenarioName: string;
  isSubscriber: boolean;
  balance: number;
}

// Renders as:
// - If subscriber: "Unlimited debates"
// - If has tokens: "5 debates remaining"
// - If no tokens: "0 debates - Purchase tokens"
```

### Purchase Flow

User can buy tokens for ANY scenario (not just ones they have grants for).

```typescript
type TokenPurchaseRequest = {
  scenarioId: string;        // Which scenario to add tokens to
  packSize: 5 | 15 | 50;     // Which pack they're buying
}

// Pricing (universal across all scenarios):
// 5 tokens = $10
// 15 tokens = $25  (best value: $1.67/token)
// 50 tokens = $70  (best value: $1.40/token)
```

**Stripe Checkout Flow**:
1. User selects scenario + pack size
2. Create Stripe checkout session with metadata:
   ```
   {
     userId: "...",
     scenarioId: "debate",
     packSize: 50,
     type: "token_purchase"
   }
   ```
3. Stripe redirects to success page
4. Webhook fires → Grant tokens via `INTERNAL_grantTokens`

---

## Constants: The Configuration Layer

All magic numbers live in one place for easy tuning.

```typescript
// convex/lib/monetization.ts

export const SUBSCRIBER_MONTHLY_CAP = 100;
// Hidden cap for subscribers - easy to change

export const FUNNEL_GRANT_AMOUNT = 10;
// Default tokens for marketing funnel

export const OPPONENT_CREATION_BUFFER = 2;
// How many extra opponents beyond tokens allowed

export const GRANT_EXPIRATION_MS = 30 * 24 * 60 * 60 * 1000;
// 30 days for grant links to expire

export const OWNER_EMAIL = "konrad@oratorprep.com";
// Where to send cap notifications

export const TOKEN_PACKS = [
  { tokens: 5, priceUsd: 1000 },   // $10.00
  { tokens: 15, priceUsd: 2500 },  // $25.00
  { tokens: 50, priceUsd: 7000 },  // $70.00
] as const;
```

**Why constants?**
- Easy A/B testing: "What if we give 15 free tokens instead of 10?"
- Seasonal changes: "Double the subscriber cap for the holidays"
- Pricing experiments: "Test $8 for 5-pack"

---

## Edge Cases & Design Decisions

### 1. Failed/Crashed Debates

**Scenario**: Vapi call starts but crashes before `end-of-call-report` webhook.

**Current Design**: No webhook = no token consumed.

**Rationale**: Favor the user. Better to occasionally let someone retry for free than to charge for a broken experience.

**Future Enhancement**: Detect "abandoned" debates (status=active for >1 hour) and decide policy.

---

### 2. Scenario-Specific Grant Locking

**Scenario**: User has grant for "doctor-patient" scenario. Can they claim it twice?

**Rule**: One grant per scenario per user.

```typescript
// When claiming:
const existingClaim = await db.query("pendingGrants")
  .withIndex("by_user")
  .filter(q =>
    q.eq(q.field("claimedBy"), userId) &&
    q.eq(q.field("scenarioId"), grant.scenarioId)
  )
  .first();

if (existingClaim) {
  return { error: "already_claimed_scenario" };
}
```

**Why?** Prevent users from creating multiple accounts to claim the same grant repeatedly.

---

### 3. Subscriber Billing Period Edge Case

**Scenario**: User subscribes mid-month, cancels, resubscribes.

**Solution**: Each subscription period is tracked independently via `periodStart` and `periodEnd`.

```typescript
// Example:
// Jan 15 - Feb 15: debateCount = 80
// [Cancels]
// Feb 20 - Mar 20: debateCount = 30 (fresh count)
```

---

### 4. Dynamic Scenarios

**Problem**: Scenarios will change over time. New scenarios added, old ones retired.

**Solution**: `scenarioId` is a string, not an enum.

**Implication**:
- Grant links for retired scenarios still work (tokens exist but scenario unavailable)
- Need admin UI to see "orphaned" tokens (tokens for scenarios that no longer exist)
- Purchase flow shows only active scenarios

---

## Implementation Phases

### Phase 1: Schema + Core Token Logic
**Goal**: Token balance, transactions, and basic operations work.

**Deliverables**:
- 4 new database tables
- `INTERNAL_grantTokens` mutation
- `INTERNAL_consumeToken` mutation
- `getBalance` query
- `checkAccess` query

**Test**: Can we grant tokens and consume them via manual mutations?

---

### Phase 2: Access Control Integration
**Goal**: Users can't create opponents or start debates without access.

**Deliverables**:
- `canCreateOpponent` query
- Update `opponents.create` mutation with check
- Update `debates.create` mutation with check

**Test**: Try to create opponent/debate without tokens → blocked with helpful error.

---

### Phase 3: Debate End Hook
**Goal**: Tokens consumed when debate completes.

**Deliverables**:
- Update Vapi webhook handler in `http.ts`
- Add consumption logic for both subscribers and token users

**Test**: Complete a debate → token balance decreases by 1 (or subscriber usage increases).

---

### Phase 4: Marketing Funnel
**Goal**: Grant links work end-to-end.

**Deliverables**:
- `createGrantLink` mutation (admin)
- `/claim/:token` route
- `claimGrant` mutation
- Post-signup claim handling

**Test**: Create grant → visit link while logged out → signup → tokens appear → redirected to scenario.

---

### Phase 5: Purchase Flow
**Goal**: Users can buy token packs.

**Deliverables**:
- Stripe product setup (3 token packs)
- `createTokenCheckout` action
- Webhook handler for `checkout.session.completed`
- UI in billing page

**Test**: Buy 5-pack → Stripe checkout → webhook fires → tokens added.

---

### Phase 6: UI Integration
**Goal**: Users see access states and token balances everywhere.

**Deliverables**:
- Scenario selector gating
- Token balance component
- Purchase UI in settings
- Access messaging ("Unlock this scenario")

**Test**: As non-subscriber with no tokens → see grayed-out scenarios → buy pack → see enabled.

---

## Success Metrics

How we know the system is working:

1. **Funnel Conversion**: % of grant recipients who purchase tokens
2. **Token→Subscriber**: % of token users who upgrade to subscription
3. **Subscriber Retention**: Monthly churn rate
4. **Heavy User Detection**: How many hit the 100 cap?
5. **Abandoned Scenarios**: Which scenarios have grants but low debate completion?

---

## Final Notes for Implementation

**For the implementing LLM**:

1. **Read this brief first** before touching code
2. **The types tell the story** - if you understand the data model, you understand the business logic
3. **Start with Phase 1** - get the core token mechanics working before adding UI
4. **Test manually** via Convex dashboard before building UI
5. **Constants are your friend** - use them, don't hardcode
6. **Subscribers are special** - always check subscription status before token balance
7. **The ledger is truth** - when debugging, start with tokenTransactions
8. **Tokens are scenario-locked** - never pool tokens across scenarios

**Key Principles**:
- ✅ Prep/research = free
- ✅ Debate = costs token
- ✅ Subscriber = appears unlimited (but tracked)
- ✅ Funnel = scenario-specific tokens
- ✅ Purchase = any scenario, universal pricing
- ✅ Consumption = on debate END, not start
