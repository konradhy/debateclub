# Gemini Cost Calculation Proof

**Analysis Date:** December 31, 2025
**Billing Period:** December 2025
**Conclusion:** $2.70 per Gemini session average

---

## Raw Billing Data (Google Cloud)

| SKU | Description | Cost |
|-----|-------------|------|
| Gemini 3 Pro Short | Deep Research input tokens | $16.61 |
| Search Grounding | Google search queries | $11.66 |
| Gemini 3 Flash | Flash model processing | $0.11 |
| **TOTAL** | | **$28.38** |

---

## Model Call Analysis

From Google Cloud billing logs, we observed **21 total model calls**:

| Model | Call Count | Pattern |
|-------|-----------|---------|
| `deep-research-pro-preview-12-2025` | 11 calls | One per session |
| `gemini-3-flash-preview` | 10 calls | One per session |

**Pattern:** Calls alternate between Deep Research and Flash
**Total Sessions:** 10.5 (~11 deep research, ~10 flash = avg 10.5)

---

## Cost Calculation

### Average Per Session
```
Total Cost: $28.38
Total Sessions: 10.5
Average: $28.38 ÷ 10.5 = $2.70 per session
```

### Component Breakdown

**Deep Research (Pro Short):**
- Cost: $16.61 ÷ 11 calls = **$1.51 per call**
- Average tokens: ~754K input tokens per call
- Rate: $2.00 per 1M input tokens

**Search Grounding:**
- Cost: $11.66 ÷ 10.5 sessions = **$1.11 per session**
- Average queries: ~32 search queries per session
- Rate: $0.035 per query

**Flash Processing:**
- Cost: $0.11 ÷ 10 calls = **$0.01 per call**
- Average tokens: ~11.5K tokens per call
- Rate: Variable ($0.53-$3.00 per 1M tokens)

### Total Per Session
```
$1.51 (Deep Research) + $1.11 (Search) + $0.01 (Flash) = $2.63 ≈ $2.70
```

---

## Assumptions

1. Each Gemini session triggers both Deep Research and Flash calls
2. The 11:10 imbalance is likely from early development iterations
3. Search grounding queries vary by research depth but average ~32 per session
4. Billing data reflects production usage patterns from December 2025

---

## Current Implementation

**Location:** `convex/actions/geminiPrep.ts:272`
```typescript
const geminiCostCents = 500; // $0.05 in cents
```

**Note:** This hardcoded estimate is outdated. Actual cost is $2.70/session (54x higher).

**Admin Display:** Updated to show "$2.70/session avg from Dec 2025 billing"
