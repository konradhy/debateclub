# Deep Research Billing Integration - Implementation Handoff

**Date**: December 31, 2025  
**Feature**: Add Deep Research token purchasing to billing page  
**Status**: Ready for implementation

---

## Executive Summary

Add a premium Deep Research token purchase section to the billing page. This is positioned as an impulse buy upgrade that gives users "the research your opponent didn't do." Subscribers do NOT get unlimited Deep Research - everyone pays per use.

---

## Business Context

### What is Deep Research?
- 20-minute autonomous research using Gemini Deep Research
- Generates comprehensive analysis with verified sources
- Costs ~$2.70 per run (our cost)
- Currently implemented in backend, needs billing UI

### Why This Matters
- Premium feature that differentiates from fast prep
- High-margin impulse purchase ($4 vs $2.70 cost)
- Positions as "unfair advantage" not just "more research"
- Subscribers still pay (not included in unlimited)

---

## Pricing Structure

### Deep Research Token Packs
```
1 token  = $4.00  (impulse buy, "try once")
3 tokens = $10.00 (save 17%, $3.33 each)
10 tokens = $30.00 (save 25%, $3.00 each)
```

### Rationale
- $4 single token = low barrier impulse purchase
- Actual cost $2.70 = healthy margin for Stripe fees + value
- Bulk discounts encourage commitment
- Separate from scenario tokens (different value prop)

---

## Current State Analysis

### What's Already Done (Backend)
✅ Token system supports "deep-research" scenario ID
✅ Token consumption on Deep Research completion
✅ Cost tracking ($2.70 per run)
✅ Access checking before running
✅ Modal and UI in prep page for triggering Deep Research

### What's Missing (Billing UI)
❌ Deep Research purchase card on billing page
❌ Stripe products for Deep Research tokens
❌ Price IDs in monetization.ts
❌ Transaction history showing "Deep Research" properly

---

## UI Design Specification

### Page Structure
**Current billing page order:**
1. Subscription Status Card
2. Token Balances Grid
3. Scenario Token Purchase (non-subscribers)
4. Transaction History

**New billing page order:**
1. Subscription Status Card
2. **Deep Research Purchase Card** ← NEW (premium position)
3. Token Balances Grid (includes Deep Research balance)
4. Scenario Token Purchase (non-subscribers)
5. Transaction History

### Why This Order?
- Deep Research positioned as premium upgrade (after subscription)
- Separate from scenario tokens (different mental model)
- Above scenario tokens = higher perceived value
- Impulse buy needs visibility


---

## Deep Research Card Design

### Visual Treatment
- **Size**: Slightly larger than scenario token card (emphasize premium)
- **Border**: Subtle gradient `linear-gradient(135deg, #3C4A32, #5C6B4A)`
- **Background**: `#FAFAF8` (same as other cards, border makes it special)
- **Icon**: Target/Crosshair (simple line art, 24x24px)
- **Spacing**: 8px more padding than standard cards

### Marketing Copy (Problem-Aware Approach)

**Header Section:**
```
[Target Icon] Deep Research
```

**Headline:**
```
Stop guessing what arguments will land
```

**Subheadline:**
```
20-minute autonomous research finds verified sources and strategic angles.
Know more than your opponent before you start.
```

**Current Balance Display:**
```
You have X Deep Research tokens
```

**Pack Options (3 cards in a row):**

**Pack 1 - Impulse Buy:**
- 1 token
- $4
- CTA: "Try once"
- No badge

**Pack 2 - Value:**
- 3 tokens  
- $10
- Save 17%
- Badge: "Popular"

**Pack 3 - Commitment:**
- 10 tokens
- $30
- Save 25%
- Badge: "Best Value"


---

## Implementation Steps

### Step 1: Update monetization.ts

**File**: `convex/lib/monetization.ts`

**Add after existing TOKEN_PACKS:**
```typescript
/** Deep Research Token Packs */
export const DEEP_RESEARCH_TOKEN_PACKS = [
  { tokens: 1, priceUsd: 400, stripePriceId: "" }, // $4.00 - will be populated by Stripe
  { tokens: 3, priceUsd: 1000, stripePriceId: "" }, // $10.00
  { tokens: 10, priceUsd: 3000, stripePriceId: "" }, // $30.00
] as const;
```

### Step 2: Create Stripe Products

**Create new file**: `convex/setupDeepResearchProducts.ts`

```typescript
import { internalMutation } from "./_generated/server";
import Stripe from "stripe";

export const setupDeepResearchProducts = internalMutation({
  handler: async () => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-10-16",
    });

    const packs = [
      { tokens: 1, priceUsd: 400, name: "1 Deep Research Token" },
      { tokens: 3, priceUsd: 1000, name: "3 Deep Research Tokens" },
      { tokens: 10, priceUsd: 3000, name: "10 Deep Research Tokens" },
    ];

    const results = [];

    for (const pack of packs) {
      // Create product
      const product = await stripe.products.create({
        name: pack.name,
        description: `${pack.tokens} Deep Research token${pack.tokens > 1 ? "s" : ""} for comprehensive 20-minute autonomous research`,
      });

      // Create price
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: pack.priceUsd,
        currency: "usd",
      });

      results.push({
        tokens: pack.tokens,
        productId: product.id,
        priceId: price.id,
      });
    }

    return results;
  },
});
```

**Run command:**
```bash
npx convex run setupDeepResearchProducts
```

**Then update monetization.ts with the returned price IDs.**


### Step 3: Update stripe.ts

**File**: `convex/stripe.ts`

**Verify `createTokenCheckout` handles "deep-research":**

The existing function should already work, but verify it uses the correct token packs:

```typescript
export const createTokenCheckout = action({
  args: {
    scenarioId: v.string(),
    packIndex: v.number(),
  },
  handler: async (ctx, args) => {
    // ... existing code ...
    
    // Add check for deep-research
    const tokenPacks = args.scenarioId === "deep-research" 
      ? DEEP_RESEARCH_TOKEN_PACKS 
      : TOKEN_PACKS;
    
    const pack = tokenPacks[args.packIndex];
    // ... rest of existing code ...
  },
});
```

### Step 4: Update Billing Page UI

**File**: `src/routes/_app/_auth/dashboard/_layout.settings.billing.tsx`

**Import Deep Research packs:**
```typescript
import { DEEP_RESEARCH_TOKEN_PACKS } from "~/convex/lib/monetization";
```

**Add Deep Research Purchase Card (after Subscription Status Card, before Token Balances):**

See full component code in next section.

**Update Token Balances Grid:**

Already done - Deep Research balance shows at top of list.


---

## Deep Research Purchase Card Component

**Location in billing page**: After Subscription Status Card, before Token Balances Grid

**Full Component Code:**

```tsx
{/* Deep Research Purchase Card */}
<div
  className="rounded-xl border-2 relative overflow-hidden"
  style={{
    borderImage: "linear-gradient(135deg, #3C4A32, #5C6B4A) 1",
    backgroundColor: colors.cardBg,
  }}
>
  <div className="p-8">
    {/* Header with Icon */}
    <div className="flex items-start gap-4 mb-6">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0"
        style={{ backgroundColor: `${colors.primary}15` }}
      >
        <Target className="h-6 w-6" style={{ color: colors.primary }} />
      </div>
      <div className="flex-1">
        <h2
          className="text-2xl font-semibold mb-2"
          style={{ color: colors.text, fontFamily: "Georgia, serif" }}
        >
          Deep Research
        </h2>
        <p
          className="text-lg font-medium mb-2"
          style={{ color: colors.text }}
        >
          Stop guessing what arguments will land
        </p>
        <p className="text-sm leading-relaxed" style={{ color: colors.textMuted }}>
          20-minute autonomous research finds verified sources and strategic angles.
          Know more than your opponent before you start.
        </p>
      </div>
    </div>

    {/* Current Balance */}
    <div
      className="mb-6 rounded-lg border px-4 py-3 flex items-center justify-between"
      style={{ borderColor: colors.border, backgroundColor: colors.background }}
    >
      <span style={{ color: colors.textMuted }}>Your Deep Research tokens</span>
      <span
        className="flex items-center gap-1 text-sm font-semibold"
        style={{
          color: (allBalances?.["deep-research"] ?? 0) > 0 ? colors.success : colors.textLight,
        }}
      >
        <Coins className="h-4 w-4" />
        {allBalances?.["deep-research"] ?? 0} tokens
      </span>
    </div>

    {/* Pack Options */}
    <div className="grid grid-cols-3 gap-4">
      {/* Pack 1: Try Once */}
      <div
        className="rounded-lg border-2 p-5 text-center"
        style={{ borderColor: colors.border }}
      >
        <p className="text-3xl font-bold mb-1" style={{ color: colors.text }}>
          1
        </p>
        <p className="text-sm mb-3" style={{ color: colors.textMuted }}>
          token
        </p>
        <p className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
          $4
        </p>
        <button
          className="w-full rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all hover:bg-gray-50"
          style={{ borderColor: colors.border, color: colors.text }}
          onClick={async () => {
            try {
              setPurchasingPackIndex(0);
              const result = await createTokenCheckout({
                scenarioId: "deep-research",
                packIndex: 0,
              });
              if (result?.url) window.location.href = result.url;
            } catch (error) {
              console.error("Deep Research checkout error:", error);
              setErrorMessage("Failed to create checkout session");
            } finally {
              setPurchasingPackIndex(null);
            }
          }}
          disabled={purchasingPackIndex !== null}
        >
          {purchasingPackIndex === 0 ? "Loading..." : "Try once"}
        </button>
      </div>

      {/* Pack 2: Popular */}
      <div
        className="rounded-lg border-2 p-5 text-center relative"
        style={{
          borderColor: colors.primary,
          backgroundColor: `${colors.primary}05`,
        }}
      >
        <span
          className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-medium text-white"
          style={{ backgroundColor: colors.primary }}
        >
          Popular
        </span>
        <p className="text-3xl font-bold mb-1" style={{ color: colors.text }}>
          3
        </p>
        <p className="text-sm mb-3" style={{ color: colors.textMuted }}>
          tokens
        </p>
        <p className="text-xl font-semibold" style={{ color: colors.primary }}>
          $10
        </p>
        <p className="text-xs mb-3" style={{ color: colors.success }}>
          Save 17%
        </p>
        <button
          className="w-full rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all hover:bg-gray-50"
          style={{ borderColor: colors.border, color: colors.text }}
          onClick={async () => {
            try {
              setPurchasingPackIndex(1);
              const result = await createTokenCheckout({
                scenarioId: "deep-research",
                packIndex: 1,
              });
              if (result?.url) window.location.href = result.url;
            } catch (error) {
              console.error("Deep Research checkout error:", error);
              setErrorMessage("Failed to create checkout session");
            } finally {
              setPurchasingPackIndex(null);
            }
          }}
          disabled={purchasingPackIndex !== null}
        >
          {purchasingPackIndex === 1 ? "Loading..." : "Purchase"}
        </button>
      </div>

      {/* Pack 3: Best Value */}
      <div
        className="rounded-lg border-2 p-5 text-center relative"
        style={{ borderColor: colors.border }}
      >
        <span
          className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-medium"
          style={{ backgroundColor: colors.success, color: "white" }}
        >
          Best Value
        </span>
        <p className="text-3xl font-bold mb-1" style={{ color: colors.text }}>
          10
        </p>
        <p className="text-sm mb-3" style={{ color: colors.textMuted }}>
          tokens
        </p>
        <p className="text-xl font-semibold" style={{ color: colors.primary }}>
          $30
        </p>
        <p className="text-xs mb-3" style={{ color: colors.success }}>
          Save 25%
        </p>
        <button
          className="w-full rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all hover:bg-gray-50"
          style={{ borderColor: colors.border, color: colors.text }}
          onClick={async () => {
            try {
              setPurchasingPackIndex(2);
              const result = await createTokenCheckout({
                scenarioId: "deep-research",
                packIndex: 2,
              });
              if (result?.url) window.location.href = result.url;
            } catch (error) {
              console.error("Deep Research checkout error:", error);
              setErrorMessage("Failed to create checkout session");
            } finally {
              setPurchasingPackIndex(null);
            }
          }}
          disabled={purchasingPackIndex !== null}
        >
          {purchasingPackIndex === 2 ? "Loading..." : "Purchase"}
        </button>
      </div>
    </div>
  </div>
</div>
```


### Step 5: Update Transaction History Display

**File**: `src/routes/_app/_auth/dashboard/_layout.settings.billing.tsx`

**Update the scenarioName mapping:**

```typescript
const scenarioName =
  tx.scenarioId === "deep-research"
    ? "Deep Research"
    : SCENARIOS[tx.scenarioId]?.name ?? tx.scenarioId;
```

This ensures "deep-research" displays as "Deep Research" in transaction history instead of showing the raw ID.

---

## Testing Checklist

### Before Stripe Setup
- [ ] Verify Deep Research balance shows in Token Balances Grid
- [ ] Verify Deep Research balance updates when tokens consumed
- [ ] Verify transaction history shows "Deep Research" properly

### After Stripe Setup
- [ ] Run `npx convex run setupDeepResearchProducts`
- [ ] Copy price IDs to `DEEP_RESEARCH_TOKEN_PACKS` in monetization.ts
- [ ] Verify Deep Research card renders on billing page
- [ ] Test purchase flow for 1 token pack
- [ ] Test purchase flow for 3 token pack
- [ ] Test purchase flow for 10 token pack
- [ ] Verify tokens granted after successful purchase
- [ ] Verify transaction appears in history
- [ ] Test purchase cancellation (should redirect back)
- [ ] Verify success message displays after purchase
- [ ] Test with subscriber account (should still show purchase options)
- [ ] Test with non-subscriber account

### Integration Testing
- [ ] Purchase 1 Deep Research token
- [ ] Go to prep page
- [ ] Click "Run Deep Research" button
- [ ] Verify modal shows correct balance
- [ ] Run Deep Research (report-only mode)
- [ ] Verify token consumed
- [ ] Verify balance decremented
- [ ] Verify transaction logged
- [ ] Verify report generated


---

## Key Design Decisions

### 1. Separate from Scenario Tokens
**Decision**: Deep Research has its own purchase card, not in scenario dropdown

**Rationale**:
- Different value proposition (premium research vs practice session)
- Different pricing model ($4 vs $2 per token)
- Needs premium positioning and marketing copy
- Impulse buy requires visibility

### 2. Subscribers Pay Per Use
**Decision**: Subscribers do NOT get unlimited Deep Research

**Rationale**:
- High cost per use ($2.70)
- Premium feature differentiation
- Additional revenue stream
- Prevents abuse (20-minute runs are expensive)

### 3. $4 Single Token Entry Point
**Decision**: Lowest pack is 1 token for $4 (not 5 for $10)

**Rationale**:
- Impulse buy psychology (try before committing)
- Lower barrier to first purchase
- "Try once" CTA is compelling
- Still profitable ($4 vs $2.70 cost)

### 4. Problem-Aware Copy
**Decision**: "Stop guessing what arguments will land" headline

**Rationale**:
- Addresses pain point (uncertainty)
- Outcome-focused (know more than opponent)
- Not feature-focused (20-minute research)
- Creates urgency without being pushy

### 5. Premium Visual Treatment
**Decision**: Gradient border, larger card, premium positioning

**Rationale**:
- Signals higher value than scenario tokens
- Justifies higher price point
- Stands out without being garish
- Maintains brand aesthetic


---

## Files to Modify

### Backend
1. **convex/lib/monetization.ts**
   - Add `DEEP_RESEARCH_TOKEN_PACKS` constant
   - Update with Stripe price IDs after setup

2. **convex/setupDeepResearchProducts.ts** (NEW)
   - Create Stripe products and prices
   - Run once to populate Stripe

3. **convex/stripe.ts**
   - Verify `createTokenCheckout` handles "deep-research"
   - Use `DEEP_RESEARCH_TOKEN_PACKS` when scenarioId is "deep-research"

### Frontend
4. **src/routes/_app/_auth/dashboard/_layout.settings.billing.tsx**
   - Import `DEEP_RESEARCH_TOKEN_PACKS`
   - Add Deep Research Purchase Card (after subscription, before token balances)
   - Update transaction history scenarioName mapping
   - Token Balances Grid already updated (shows Deep Research at top)

### Total Changes
- 1 new file (setupDeepResearchProducts.ts)
- 3 modified files (monetization.ts, stripe.ts, billing.tsx)
- ~200 lines of code

---

## Stripe Product Setup Commands

### 1. Create Products
```bash
npx convex run setupDeepResearchProducts
```

**Expected Output:**
```json
[
  {
    "tokens": 1,
    "productId": "prod_xxxxx",
    "priceId": "price_xxxxx"
  },
  {
    "tokens": 3,
    "productId": "prod_xxxxx",
    "priceId": "price_xxxxx"
  },
  {
    "tokens": 10,
    "productId": "prod_xxxxx",
    "priceId": "price_xxxxx"
  }
]
```

### 2. Update monetization.ts
Copy the price IDs from output and update:

```typescript
export const DEEP_RESEARCH_TOKEN_PACKS = [
  { tokens: 1, priceUsd: 400, stripePriceId: "price_xxxxx" },
  { tokens: 3, priceUsd: 1000, stripePriceId: "price_xxxxx" },
  { tokens: 10, priceUsd: 3000, stripePriceId: "price_xxxxx" },
] as const;
```

### 3. Deploy
```bash
npx convex deploy
```


---

## Edge Cases & Error Handling

### Insufficient Tokens
- **Scenario**: User tries to run Deep Research with 0 tokens
- **Handling**: Modal shows "Insufficient tokens" warning (already implemented)
- **UX**: Disabled buttons, clear error message

### Purchase Failure
- **Scenario**: Stripe checkout fails or user cancels
- **Handling**: Redirect back with error message
- **UX**: Error banner at top of billing page

### Token Consumption Failure
- **Scenario**: Deep Research runs but token consumption fails
- **Handling**: Non-fatal error logged, user keeps token
- **UX**: No user-facing error (they got the research)

### Subscriber Confusion
- **Scenario**: Subscriber expects unlimited Deep Research
- **Handling**: Clear messaging that Deep Research is separate
- **UX**: Purchase card shows even for subscribers

### Transaction History
- **Scenario**: Deep Research transactions mixed with scenario tokens
- **Handling**: Clear labeling ("Deep Research" vs scenario names)
- **UX**: Separate icon or color for Deep Research transactions (future enhancement)

---

## Success Metrics

### Conversion Metrics
- **Primary**: % of users who purchase at least 1 Deep Research token
- **Secondary**: Average tokens purchased per user
- **Tertiary**: Repeat purchase rate

### Usage Metrics
- **Primary**: Deep Research runs per week
- **Secondary**: Report-only vs full-replace ratio
- **Tertiary**: Time between purchase and first use

### Revenue Metrics
- **Primary**: Deep Research revenue per month
- **Secondary**: Average revenue per Deep Research user
- **Tertiary**: Deep Research revenue as % of total revenue

---

## Future Enhancements (Not in Scope)

### Bulk Discounts
- 25 tokens for $60 (save 40%)
- 50 tokens for $100 (save 50%)

### Subscription Add-On
- $10/month for 5 Deep Research tokens
- Bundled with Pro subscription

### Usage Analytics
- Show user how many Deep Research reports they've generated
- Compare prep quality with vs without Deep Research

### Social Proof
- "X users ran Deep Research this week"
- Testimonials from users who won debates

---

## Questions & Answers

**Q: Why not include Deep Research in subscription?**  
A: Cost per use is high ($2.70). Unlimited would be expensive and encourage abuse.

**Q: Why $4 for single token instead of $3?**  
A: Psychological pricing. $4 feels like impulse buy, $3 feels cheap. Margin covers Stripe fees.

**Q: Why separate card instead of dropdown?**  
A: Different value prop needs different positioning. Premium feature deserves premium placement.

**Q: What if user buys tokens but never uses them?**  
A: That's fine. Tokens don't expire. Pure profit if unused.

**Q: Should we show "X tokens remaining" during Deep Research?**  
A: No. Token consumption happens after completion. Don't interrupt the flow.

---

## Implementation Timeline

**Estimated Time**: 2-3 hours

1. **Backend Setup** (30 min)
   - Add DEEP_RESEARCH_TOKEN_PACKS to monetization.ts
   - Create setupDeepResearchProducts.ts
   - Run Stripe setup command
   - Update price IDs

2. **Billing UI** (60 min)
   - Add Deep Research Purchase Card
   - Update transaction history
   - Test layout and styling

3. **Testing** (30 min)
   - Test purchase flows
   - Verify token consumption
   - Check transaction history

4. **Polish** (30 min)
   - Responsive design
   - Dark mode
   - Error states

---

## Handoff Complete

This document contains everything needed to implement Deep Research billing:
- ✅ Business context and rationale
- ✅ Complete UI design specification
- ✅ Step-by-step implementation guide
- ✅ Full component code
- ✅ Stripe setup commands
- ✅ Testing checklist
- ✅ Edge cases and error handling

**Ready to build!**
