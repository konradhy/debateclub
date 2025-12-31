# Cost Tracking System

## Overview

Hybrid cost tracking for unit economics:
- **OpenRouter**: Accurate token-based tracking
- **Vapi**: Duration-based tracking (with fallbacks)
- **Firecrawl**: Estimate ~$0.01 per page
- **Gemini**: Estimate ~$0.05 per session

## Files

- `convex/costs.ts` - Database queries and mutations
- `convex/lib/openrouterWithCosts.ts` - OpenRouter wrapper
- `convex/lib/costCalculator.ts` - Cost calculation functions
- `convex/http.ts` - Vapi webhook with cost recording
- `convex/actions/research.ts` - Firecrawl cost estimates
- `convex/actions/geminiPrep.ts` - Gemini cost estimates
- `src/routes/_app/_auth/dashboard/_layout.admin.tsx` - Admin panel

## Admin Dashboard

View at `/dashboard/admin` → "Cost Monitoring" tab:
- Total costs by service (with estimate indicators)
- Most expensive sessions (debates + prep, with links)
- Daily spending trends

## How Costs Are Recorded

### OpenRouter (Accurate)
Wrapper automatically tracks after each API call.

### Vapi (Duration-Based)
Webhook records duration with fallbacks:
1. `message.call.duration`
2. Calculate from `startedAt` - `endedAt`
3. Default 60 seconds estimate

### Firecrawl (Estimate)
Simple estimate in `research.ts`:
```typescript
const firecrawlCostCents = Math.round(results.length * 1.0); // $0.01 per page
```

### Gemini (Estimate)
Simple estimate in `geminiPrep.ts`:
```typescript
const geminiCostCents = 500; // $0.05 per session
```
