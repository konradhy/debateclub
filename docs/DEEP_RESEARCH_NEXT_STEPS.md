# Deep Research Billing - Next Steps

**Status**: Backend & UI implementation ✅ COMPLETE  
**Remaining**: Stripe product setup (5 minutes)

---

## What Was Just Implemented

✅ Added `DEEP_RESEARCH_TOKEN_PACKS` to `convex/lib/monetization.ts`  
✅ Created `convex/setupDeepResearchProducts.ts` for Stripe product creation  
✅ Updated `convex/stripe.ts` to handle "deep-research" scenario  
✅ Added Deep Research Purchase Card to billing page (premium position)  
✅ Updated transaction history to display "Deep Research" properly  
✅ All TypeScript checks passing

---

## Next Steps (5 minutes)

### 1. Create Stripe Products

Run this command:
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

### 2. Update Price IDs

Copy the price IDs from the output and update `convex/lib/monetization.ts`:

```typescript
export const DEEP_RESEARCH_TOKEN_PACKS = [
  { tokens: 1, priceUsd: 400, stripePriceId: "price_xxxxx" }, // Paste 1st priceId
  { tokens: 3, priceUsd: 1000, stripePriceId: "price_xxxxx" }, // Paste 2nd priceId
  { tokens: 10, priceUsd: 3000, stripePriceId: "price_xxxxx" }, // Paste 3rd priceId
] as const;
```

### 3. Deploy

```bash
npx convex deploy
```

---

## Testing Checklist

After deployment, test the following:

### Purchase Flow
- [ ] Go to `/dashboard/settings/billing`
- [ ] Verify Deep Research card appears after Subscription Status
- [ ] Verify current balance shows correctly
- [ ] Click "Try once" ($4) button
- [ ] Complete Stripe checkout
- [ ] Verify redirect back to billing page with success message
- [ ] Verify token balance increased by 1
- [ ] Verify transaction appears in history as "Deep Research"

### All Three Packs
- [ ] Test 1 token pack ($4)
- [ ] Test 3 token pack ($10)
- [ ] Test 10 token pack ($30)

### Token Consumption
- [ ] Go to prep page for a debate opponent
- [ ] Navigate to "Deep Research Report" tab
- [ ] Click "Run Deep Research"
- [ ] Choose "Report Only" mode
- [ ] Wait for completion (~20 minutes)
- [ ] Verify token consumed (balance decreased by 1)
- [ ] Verify transaction logged in history

### Edge Cases
- [ ] Try to purchase with 0 balance (should work)
- [ ] Try to run Deep Research with 0 tokens (should show error)
- [ ] Cancel Stripe checkout (should redirect back with cancel message)
- [ ] Test as subscriber (should still show purchase options)

---

## Visual Design Notes

The Deep Research card has:
- **Gradient border**: `linear-gradient(135deg, #3C4A32, #5C6B4A)` for premium feel
- **Target icon**: Represents precision and discovery
- **Problem-aware copy**: "Stop guessing what arguments will land"
- **Premium position**: After subscription, before token balances
- **Three pack options**: Try once ($4), Popular ($10), Best Value ($30)

---

## Key Implementation Details

### Backend
- `createTokenCheckout` in `stripe.ts` now checks if `scenarioId === "deep-research"` and uses `DEEP_RESEARCH_TOKEN_PACKS` instead of `TOKEN_PACKS`
- Token consumption happens in `geminiPrep.ts` after successful Deep Research completion
- Cost tracking records $2.70 per run

### Frontend
- Deep Research balance shows at top of Token Balances Grid
- Transaction history maps "deep-research" → "Deep Research" for display
- Purchase buttons use same loading state pattern as scenario tokens

### Pricing Strategy
- $4 single token = impulse buy entry point
- $10 for 3 tokens = 17% savings (popular choice)
- $30 for 10 tokens = 25% savings (best value)
- Actual cost $2.70 = healthy margin for Stripe fees + value

---

## Success Criteria

✅ Users can purchase Deep Research tokens  
✅ Tokens appear in balance immediately after purchase  
✅ Tokens consumed when Deep Research runs  
✅ Transaction history shows "Deep Research" clearly  
✅ Premium positioning signals higher value  
✅ Subscribers do NOT get unlimited (pay per use)

---

## Documentation Updates Needed

After testing, update:
- [ ] `rules/dev_journal_3.md` - Add Chapter 23 documenting billing implementation
- [ ] `rules/roadmap.md` - Mark Deep Research billing as complete
- [ ] `docs/PROJECT_MAP.md` - Add Deep Research billing to monetization section

---

**Ready to deploy!** Just run the Stripe setup command and update the price IDs.
