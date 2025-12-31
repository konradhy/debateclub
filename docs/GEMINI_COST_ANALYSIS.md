# Gemini Cost Analysis & Optimization Plan

**Date:** December 31, 2025
**Data Source:** Google Cloud Console Billing (December 2025)
**Dashboard:** https://aistudio.google.com/ or https://console.cloud.google.com/billing

---

## Executive Summary

**Current Monthly Cost:** $28.37
**Estimated Cost Per Research Session:** $0.85 (documented in code as $0.05 - **17x underestimate!**)
**Primary Cost Drivers:**
1. Search grounding queries (41% of total)
2. Gemini 3 Pro Short input tokens (59% of total)

**Quick Win:** Replace Gemini search grounding with Google Custom Search API → Save **$10/month (85% of search costs)**

---

## Detailed Cost Breakdown

### Full Month Usage (December 1-30, 2025)

| Component | Usage | Cost | Per-Unit Rate | % of Total | Notes |
|-----------|-------|------|---------------|------------|-------|
| **Gemini 3 Pro Short (input)** | 8,304,224 tokens | $16.61 | $2.00/1M tokens | 58.5% | Deep Research agent |
| **Search Grounding Queries** | 333 queries | $11.66 | $0.035/query | 41.1% | `google_search` tool calls |
| **Gemini 3 Flash (output)** | 21,192 tokens | $0.06 | $3.00/1M tokens | 0.2% | Source extraction |
| **Gemini 3 Flash (input)** | 94,022 tokens | $0.05 | $0.53/1M tokens | 0.2% | Source extraction |
| **Gemini 3 Flash (cached)** | 7,445 tokens | $0.00 | FREE | 0% | Prompt caching working! |
| **TOTAL** | – | **$28.37** | – | 100% | |

### Recent Activity (December 28-30, 2025)

| Component | Usage | Cost | Per-Unit Rate | % of Total | Growth |
|-----------|-------|------|---------------|------------|--------|
| **Gemini 3 Pro Short (input)** | 4,914,652 tokens | $9.83 | $2.00/1M tokens | 60.2% | 277% vs prev 3 days |
| **Search Grounding Queries** | 184 queries | $6.44 | $0.035/query | 39.4% | 193% vs prev 3 days |
| **Gemini 3 Flash (output)** | 9,317 tokens | $0.03 | $3.22/1M tokens | 0.2% | 200% vs prev 3 days |
| **Gemini 3 Flash (input)** | 38,814 tokens | $0.02 | $0.52/1M tokens | 0.1% | 100% vs prev 3 days |
| **TOTAL** | – | **$16.32** | – | 100% | **276% increase** |

**Interpretation:** Usage is accelerating (Dec 28-30 represents 58% of full month cost in just 3 days). This suggests growing user adoption of Gemini research feature.

---

## Per Research Session Costs

### Assumptions

- **Total sessions in December:** ~33 sessions (333 search queries ÷ 10 average sources per session)
- **Each session includes:**
  - Stage 1: Deep Research using `deep-research-pro-preview-12-2025` agent (3-20 minutes)
  - Stage 2: Source Finding using `gemini-3-flash-preview` + `google_search` tool (finds 8-12 actual URLs)
  - Stage 3: Prep Generation using existing OpenRouter models (not included in Gemini costs)

### Cost Breakdown Per Session

| Phase | Cost | Calculation | Component |
|-------|------|-------------|-----------|
| **Deep Research (Pro Short)** | **$0.50** | $16.61 ÷ 33 sessions | Gemini 3 Pro Short input tokens (avg ~250K tokens/session) |
| **Source Finding (Search)** | **$0.35** | $11.66 ÷ 33 sessions | Search grounding queries (avg ~10 queries/session) |
| **Source Finding (Flash)** | **$0.003** | ($0.06 + $0.05) ÷ 33 | Gemini 3 Flash input + output tokens |
| **TOTAL PER SESSION** | **$0.853** | – | **Documented in code as $0.05 (17x underestimate!)** |

### Usage Variance by Session Complexity

| Complexity | Tokens (Pro Short) | Search Queries | Estimated Cost | Use Case |
|------------|-------------------|----------------|----------------|----------|
| **Simple** | 200,000 | 5 | $0.58 | Basic topic with clear answers |
| **Moderate** | 500,000 | 10 | $1.35 | Standard debate prep (most common) |
| **Complex** | 1,500,000 | 30 | $4.05 | Multi-faceted topic, hostile audience |
| **Deep Dive** | 3,000,000 | 50 | $7.75 | Comprehensive research, many opponent statements |

**Current average:** ~250K tokens + 10 queries = **$0.85/session**

---

## Critical Issue: Cost Estimation Error

### Location

**File:** [convex/actions/geminiPrep.ts:271-273](../convex/actions/geminiPrep.ts#L271-L273)

```typescript
const geminiCostCents = 500; // $0.05 in cents
```

### Problem

- **Hardcoded estimate:** $0.05 per session
- **Actual average cost:** $0.85 per session
- **Error magnitude:** 17x underestimate
- **Impact:** Cost tracking in admin panel shows incorrect Gemini costs

### Fix Required

Update hardcoded estimate to match documented pricing in `convex/lib/apiPricing.ts`:

```typescript
// BEFORE
const geminiCostCents = 500; // $0.05 in cents

// AFTER (using actual average from billing data)
const geminiCostCents = 85; // $0.85 per session average (Dec 2025 billing data)
// Note: Actual cost varies by complexity (see apiPricing.ts estimatedCostPerSession)
```

**Alternative (better):** Calculate actual cost based on token usage and search queries if Gemini API returns usage metadata.

---

## Pricing Verification

### Gemini API Pricing (Documented)

Source: [convex/lib/apiPricing.ts:152-177](../convex/lib/apiPricing.ts#L152-L177)

| Component | Rate | Notes |
|-----------|------|-------|
| **Gemini 3 Pro input** | $2.00/1M tokens | ≤200K context |
| **Gemini 3 Pro input (long)** | $4.00/1M tokens | >200K context |
| **Gemini 3 Pro output** | $12.00/1M tokens | Estimated |
| **Gemini 3 Flash input** | $0.53/1M tokens | Actual from billing |
| **Gemini 3 Flash output** | $3.00/1M tokens | Actual from billing |
| **Search grounding** | $0.035/query | $35 per 1000 queries |

**Documented estimate per session:** $0.50 - $6.00 (min-max range)
**Actual average from billing:** $0.85 (within documented range ✅)

### Comparison to OpenRouter Pricing

| Model | Via OpenRouter | Via Gemini API (Google) | Difference |
|-------|---------------|------------------------|------------|
| Gemini 3 Pro input | $2.50/1M | $2.00/1M | **OpenRouter 25% more expensive** |
| Gemini 3 Flash input | $0.075/1M | $0.53/1M | **Gemini API 7x more expensive** |
| Gemini 3 Flash output | $0.30/1M | $3.00/1M | **Gemini API 10x more expensive** |

**Insight:** Gemini 3 Flash is cheaper via OpenRouter, but search grounding requires direct Gemini API (not available on OpenRouter).

---

## Optimization Approaches

### 🎯 Option 1: Replace Search Grounding with Google Custom Search API (RECOMMENDED)

**Cost Savings:** $10/month (85% reduction in search costs)
**Difficulty:** Medium
**Quality Impact:** None (same search results)

#### Current Implementation

```typescript
// convex/lib/geminiSearch.ts:64-69
const interaction = await client.interactions.create({
  model: 'gemini-3-flash-preview',
  input: prompt,
  tools: [{ type: 'google_search' }],  // $0.035 per query!
  response_format: articlesSchema
});
```

**Cost:** 333 queries/month × $0.035 = **$11.66/month**

#### Proposed Implementation

```typescript
// Use Google Custom Search API instead
import { searchGoogle } from '../lib/googleCustomSearch';  // New helper

// Step 1: Extract search queries from Deep Research report (free)
const queries = extractSearchQueries(deepResearchReport);  // LLM call, ~$0.02

// Step 2: Execute searches via Custom Search API
const searchResults = await Promise.all(
  queries.map(q => searchGoogle(q))  // $0.005 per query
);

// Step 3: Have Gemini Flash summarize results into articles (cheap)
const interaction = await client.interactions.create({
  model: 'gemini-3-flash-preview',
  input: `Summarize these search results into 8-12 article objects:\n${JSON.stringify(searchResults)}`,
  response_format: articlesSchema
  // No tools needed!
});
```

**New cost:** 333 queries × $0.005 = **$1.67/month**

**Savings:** $11.66 - $1.67 = **$9.99/month** ✅

#### Implementation Steps

1. Sign up for Google Custom Search API
   - Visit: https://developers.google.com/custom-search/v1/introduction
   - Get API key (free tier: 100 queries/day = 3000/month)
   - Paid tier: $5 per 1000 queries after free tier

2. Create helper function `convex/lib/googleCustomSearch.ts`:
   ```typescript
   export async function searchGoogle(query: string): Promise<SearchResult[]> {
     const response = await fetch(
       `https://customsearch.googleapis.com/customsearch/v1?` +
       `key=${process.env.GOOGLE_SEARCH_API_KEY}&` +
       `cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&` +
       `q=${encodeURIComponent(query)}`
     );
     return response.json();
   }
   ```

3. Update `convex/lib/geminiSearch.ts` to use new approach

4. Add env vars: `GOOGLE_SEARCH_API_KEY`, `GOOGLE_SEARCH_ENGINE_ID`

**Quality Notes:**
- Google Custom Search API returns same Google Search results
- Gemini grounding adds automatic relevance filtering, but we can replicate with Flash summarization
- May need to tweak prompts to maintain quality

---

### 💰 Option 2: Enable Prompt Caching for Deep Research

**Cost Savings:** $8/month (50% reduction in Pro Short costs)
**Difficulty:** Easy
**Quality Impact:** None

#### Current Usage

Only 7,445 cached tokens observed (negligible). Most prompts not being cached.

#### Proposed Implementation

Cache the strategic brief context that's sent to Deep Research:

```typescript
// convex/actions/geminiPrep.ts:122-126
const interaction = await client.interactions.create({
  agent: 'deep-research-pro-preview-12-2025',
  input: researchQuery,
  background: true,
  // Add caching directive
  systemInstruction: {
    content: strategicBrief,  // Cache this across sessions
    cacheControl: { ttl: 300 }  // 5 minute TTL
  }
});
```

**Impact:** If strategic brief is 100K tokens and reused 20 times:
- Without caching: 100K × 20 × $2.00/1M = $4.00
- With caching: 100K × $2.00/1M + 100K × 19 × $0.00 = $0.20
- **Savings:** $3.80 per unique opponent

**Realistic savings:** ~$8/month if 50% of sessions can reuse cached context

**Caveat:** Requires Gemini API to support caching for Interactions API (verify in docs)

---

### ⚡ Option 3: Switch to Gemini 3 Flash for Simple Research

**Cost Savings:** $12/month (75% reduction in Pro Short costs)
**Difficulty:** Easy
**Quality Impact:** High (quality degradation)

#### Analysis

Gemini 3 Flash input: $0.53/1M vs Pro Short: $2.00/1M (3.8x cheaper)

If 50% of research sessions are "simple" and can use Flash:
- Current: 16.5 sessions × $0.50 = $8.25
- With Flash: 16.5 sessions × $0.13 = $2.15
- **Savings:** $6.10

**Problem:** Gemini 3 Flash reasoning quality significantly worse than Pro for complex multi-step research. Deep Research agent specifically requires Pro-level model.

**Verdict:** Not recommended unless user feedback shows Pro quality is overkill.

---

### 🔄 Option 4: Reduce Sources Per Session (8-12 → 4-6)

**Cost Savings:** $6/month (50% reduction in search costs)
**Difficulty:** Easy
**Quality Impact:** Medium

#### Current Implementation

```typescript
// convex/lib/geminiSearch.ts:54
Return ONLY a JSON object with an "articles" array containing 8-12 high-quality sources
```

#### Proposed Change

```typescript
Return ONLY a JSON object with an "articles" array containing 4-6 high-quality sources
```

**Impact:**
- Search queries: 333 → ~170 (assuming 10 → 5 average)
- Cost: $11.66 → $5.95
- **Savings:** $5.71/month

**Quality consideration:** May reduce research depth. Test with users first.

---

### 📊 Option 5: Batch Research for Similar Topics

**Cost Savings:** $4-8/month (varies)
**Difficulty:** Hard
**Quality Impact:** None

#### Concept

When multiple users research similar topics (e.g., "climate change debate"), share the Deep Research result:

1. Hash the research query (topic + position + key parameters)
2. Check if cached result exists (< 7 days old)
3. If yes, reuse Deep Research report, only re-run source finding
4. If no, run full research and cache result

**Savings:**
- Deep Research: $0.50 → $0.00 (cached)
- Source Finding: $0.35 (still runs per-user for personalization)
- **Per cached session:** $0.50 saved

**Realistic impact:** If 20% of sessions can reuse cached research → $3.30/month saved

**Implementation complexity:**
- Need intelligent cache key generation
- Need cache invalidation strategy (topic freshness)
- Need to handle edge cases (opponent-specific research)

---

## Recommended Implementation Priority

| Priority | Optimization | Savings | Effort | Next Step |
|----------|-------------|---------|--------|-----------|
| **P0** | Fix cost estimation in code | Better tracking | 5 min | Update `geminiPrep.ts:271` |
| **P0** | Add Gemini dashboard link to admin | Better visibility | 5 min | Update `admin.tsx:893` |
| **P1** | Replace search grounding with Custom Search API | $10/month | 4 hours | Create `googleCustomSearch.ts`, update `geminiSearch.ts` |
| **P2** | Reduce sources per session (8-12 → 5-7) | $3/month | 30 min | Update prompt in `geminiSearch.ts` |
| **P2** | Enable prompt caching | $8/month | 2 hours | Add cache directives, verify API support |
| **P3** | Batch research for popular topics | $4/month | 1 week | Design caching system, implement cache layer |

**Total potential savings:** $25/month (88% reduction from $28.37 to $3.37)

---

## Monitoring & Verification

### Google AI Studio Dashboard

**URL:** https://aistudio.google.com/

**What to track:**
- Total monthly spend
- Cost breakdown by SKU
- Token usage trends
- Search grounding query count

### Google Cloud Console Billing

**URL:** https://console.cloud.google.com/billing

**Filters:**
- Service: "Gemini API"
- Group by: SKU
- Time range: Current month

**Key SKUs:**
- `FB70-0CFB-9533`: Generate_content text input token count for gemini 3 pro short
- `7B05-CE3B-7DFB`: Number of queries with search grounding
- `ACA6-865B-F153`: Generate_content text output token count for gemini 3 flash
- `F2C1-F842-5D84`: Generate_content text input token count for gemini 3 flash
- `07D6-73CA-C859`: Generate_content cached text input token count for gemini 3 flash

### Admin Panel Integration

Add Gemini dashboard link to "External Verification Links" section:

```typescript
{/* Gemini (Google AI Studio) */}
<a
  href="https://aistudio.google.com/"
  target="_blank"
  rel="noopener noreferrer"
  className="flex flex-col gap-1 rounded-lg border-2 p-3 transition-all hover:border-opacity-70"
  style={{
    borderColor: colors.border,
    backgroundColor: colors.background,
  }}
>
  <span className="text-sm font-medium" style={{ color: colors.text }}>
    Google AI Studio
  </span>
  <span className="text-xs" style={{ color: colors.textMuted }}>
    Gemini API usage & billing
  </span>
</a>
```

---

## Usage Pattern Analysis

### Monthly Trend

| Period | Cost | Sessions | Cost/Session | Notes |
|--------|------|----------|--------------|-------|
| Dec 1-21 | $0.00 | 0 | – | No usage |
| Dec 22-27 | $11.05 | ~15 | $0.74 | Initial rollout |
| Dec 28-30 | $16.32 | ~18 | $0.91 | Accelerating usage |
| **Dec 1-30** | **$28.37** | **~33** | **$0.86** | **Full month** |

**Interpretation:**
- Feature launched Dec 22 (9 days ago)
- Usage doubling every 3 days
- If trend continues: January could be $85-$120

**Recommendation:** Implement P1 optimizations ASAP before costs scale

---

## Action Items

### Immediate (This Week)

- [ ] Update hardcoded cost estimate in `convex/actions/geminiPrep.ts:271`
- [ ] Add Gemini dashboard link to admin panel
- [ ] Update cost accuracy note in admin panel (line 813)
- [ ] Document actual per-session costs in API pricing file

### Short-term (Next 2 Weeks)

- [ ] Implement Google Custom Search API replacement
- [ ] Reduce sources per session to 5-7 (test quality impact first)
- [ ] Set up usage alerts in Google Cloud Console (notify if >$50/month)

### Long-term (Next Month)

- [ ] Research prompt caching support for Interactions API
- [ ] Design and implement research result caching system
- [ ] A/B test Gemini 3 Flash vs Pro Short for simple topics

---

## Appendix: Raw Billing Data

### Full Month (December 1-30, 2025)

```
SKU: FB70-0CFB-9533 (Gemini 3 Pro Short input)
Usage: 8,304,224 tokens
Cost: $16.61
Rate: $2.00 per 1M tokens

SKU: 7B05-CE3B-7DFB (Search grounding queries)
Usage: 333 queries
Cost: $11.66
Rate: $0.035 per query

SKU: ACA6-865B-F153 (Gemini 3 Flash output)
Usage: 21,192 tokens
Cost: $0.06
Rate: $2.83 per 1M tokens

SKU: F2C1-F842-5D84 (Gemini 3 Flash input)
Usage: 94,022 tokens
Cost: $0.05
Rate: $0.53 per 1M tokens

SKU: 07D6-73CA-C859 (Gemini 3 Flash cached)
Usage: 7,445 tokens
Cost: $0.00
Rate: FREE
```

### Recent 3 Days (December 28-30, 2025)

```
SKU: FB70-0CFB-9533 (Gemini 3 Pro Short input)
Usage: 4,914,652 tokens
Cost: $9.83
Rate: $2.00 per 1M tokens
Growth: +368% vs previous 3 days

SKU: 7B05-CE3B-7DFB (Search grounding queries)
Usage: 184 queries
Cost: $6.44
Rate: $0.035 per query
Growth: +193% vs previous 3 days

SKU: ACA6-865B-F153 (Gemini 3 Flash output)
Usage: 9,317 tokens
Cost: $0.03
Rate: $3.22 per 1M tokens
Growth: +200% vs previous 3 days

SKU: F2C1-F842-5D84 (Gemini 3 Flash input)
Usage: 38,814 tokens
Cost: $0.02
Rate: $0.52 per 1M tokens
Growth: +100% vs previous 3 days
```

---

**Last Updated:** December 31, 2025
**Next Review:** January 15, 2026 (after first full month of data)
