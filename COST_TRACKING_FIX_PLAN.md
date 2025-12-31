# Cost Tracking Fix Plan

## Current Issues

### 1. Vapi Duration Tracking is Broken

The debate page includes a timer that accurately tracks how long the user has been debating. This timer starts when the Vapi call begins and stops when the call ends, giving us the exact duration of the debate session. However, the Vapi webhook is trying to get duration from `message.call?.duration`, which consistently returns 0 or undefined. When this happens, the system falls back to a hardcoded 60-second estimate, which violates the directive.md principle of "no silent failures" and results in inaccurate cost calculations.

### 2. Cost Grouping is Backwards

The current system groups costs by implementation details (prep vs debate) rather than by user workflows. When a user wants to know "What did debating 'AI sure is dumb' cost me total?", they expect to see all related costs together: research, prep generation, the actual debate, and post-debate analysis. Instead, the system shows separate buckets for prep sessions and debate sessions, making it impossible to see the total cost of a complete debate workflow from start to finish.

### 3. No Debug Visibility

The codebase contains silent try/catch blocks throughout the cost tracking system. There's no logging to show what duration values are being received from Vapi, making it impossible to debug why the duration tracking is failing. The admin panel shows final results but provides no visibility into the underlying data flow or any errors that might be occurring during cost recording.

### 4. Missing Cost Breakdown by Phase

Users cannot see which part of the debate workflow generated which costs. They want to see something like "Research: $0.05, Prep: $0.03, Debate: $0.12, Analysis: $0.02" to understand where their money is going and optimize the most expensive parts of the workflow. Currently, the system only provides service-level breakdown (OpenRouter vs Vapi vs Firecrawl vs Gemini) but no phase-level breakdown.

### 5. Service Breakdown Hidden in Prep Sessions

When the admin panel shows "Prep Session: $0.08", users cannot tell whether this cost came from Firecrawl research or Gemini prep generation. The service breakdown exists in the data but isn't prominently displayed, making it impossible to determine which prep activities are most expensive and should be optimized.

### 6. Directive Violations

The codebase contains multiple violations of the directive.md rule about silent failures. There are `// Silently fail` comments throughout the cost tracking code, no error logging when fallbacks are used, and try/catch blocks that swallow errors without reporting them. This makes debugging impossible and hides real problems that should be surfaced and fixed.

---

## Fix Plan

### Phase 1: Use Timer for Accurate Vapi Duration

The debate page already has a timer that tracks the exact duration of each debate session. Instead of relying on the broken Vapi webhook duration, we should use this timer value as the source of truth for cost calculations.

When the user clicks "End Session", we need to pass the timer value to the backend and store it with the debate record. The Vapi webhook should then use this stored duration for cost calculations instead of trying to extract duration from the unreliable Vapi API response.

We'll modify the `handleStop` function in the debate page to save the timer value to the debate record. Then we'll update the `debates.complete` mutation to accept duration from the client. Finally, we'll modify the Vapi webhook to use the stored duration if available, falling back to the Vapi API response only as a last resort.

**Files to modify:**
- `src/routes/_app/_auth/dashboard/debate.tsx` - Pass timer to backend on stop
- `convex/debates.ts` - Accept duration in complete mutation  
- `convex/http.ts` - Use stored duration for cost calculation

### Phase 2: Add Phase Tracking to Cost Records

We need to add a `phase` field to the cost tracking system so we can distinguish between research, prep, debate, and analysis costs. This will require updating the database schema to include an optional phase field, then modifying all the cost recording calls throughout the codebase to include the appropriate phase.

The research action will record costs with `phase: "research"`, the Gemini prep action will use `phase: "prep"`, the Vapi webhook will use `phase: "debate"`, and the analysis action will use `phase: "analysis"`. This will give us the granular breakdown that users need to understand their spending patterns.

**Files to modify:**
- `convex/schema.ts` - Add phase field to apiCosts table
- `convex/costs.ts` - Accept phase in cost recording mutations
- `convex/actions/research.ts` - Pass phase: "research"
- `convex/actions/geminiPrep.ts` - Pass phase: "prep"  
- `convex/http.ts` - Pass phase: "debate" for Vapi costs
- `convex/actions/analysisAction.ts` - Pass phase: "analysis"

### Phase 3: Group Costs by Topic/Workflow

We need to create a new query that groups all costs related to a single debate topic together. This means finding all costs with the same `opponentId` (prep costs) and all costs with a `debateId` where the debate has that same `opponentId` (debate and analysis costs), then summing them together.

This will allow users to see the total cost of debating a specific topic, including all the prep work that went into it. The query should return the topic name, total cost, and breakdown by both phase and service.

**Files to modify:**
- `convex/costs.ts` - Add new getCostsByTopic query
- `src/routes/_app/_auth/dashboard/_layout.admin.tsx` - Use new query in admin panel

### Phase 4: Improve Admin Panel Display

The admin panel needs to be enhanced to show the service and phase breakdowns clearly. Instead of just showing "Prep Session: $0.08", it should show an expandable breakdown like "Prep Session: $0.08 (Firecrawl: $0.03, Gemini: $0.05)". 

We should also group costs by topic with expandable details showing the full workflow cost breakdown. Estimated costs should be clearly marked with indicators to distinguish them from accurate tracking.

**Files to modify:**
- `src/routes/_app/_auth/dashboard/_layout.admin.tsx` - Enhanced display with breakdowns

### Phase 5: Remove Silent Failures and Add Proper Logging

We need to go through all the cost tracking code and replace silent try/catch blocks with proper error logging. The try/catch blocks should remain to prevent breaking the main application flow, but we need to log what went wrong so we can debug issues.

Every place that currently has a `// Silently fail` comment should be updated to log the error with context about what operation was being attempted. This will help us identify and fix problems in the cost tracking system.

**Files to modify:**
- `convex/http.ts` - Log cost recording errors in webhook
- `convex/actions/research.ts` - Log cost recording errors  
- `convex/actions/geminiPrep.ts` - Log cost recording errors

---

## Execution Order

We should implement these fixes in the following order to maximize impact and minimize risk:

1. **Phase 1** - Use timer for accurate Vapi duration tracking. This fixes the most critical bug where costs are based on incorrect duration estimates.

2. **Phase 5** - Remove silent failures and add proper error logging. This is a quick win that will help us debug any remaining issues.

3. **Phase 2** - Add phase tracking to cost records. This requires a schema change but provides the foundation for better cost grouping.

4. **Phase 3** - Create new query to group costs by topic/workflow. This builds on the phase tracking to provide the user-centric view of costs.

5. **Phase 4** - Improve admin panel display. This is the final polish that makes all the underlying improvements visible to users.

---

## Files Summary

The following files will need to be modified to implement these fixes:

| File | Changes Required |
|------|------------------|
| `convex/schema.ts` | Add optional `phase` field to apiCosts table to track research/prep/debate/analysis phases |
| `convex/costs.ts` | Update mutations to accept phase parameter, add new getCostsByTopic query for workflow grouping |
| `convex/http.ts` | Use stored debate duration for cost calculation, add error logging, pass phase for debate costs |
| `convex/debates.ts` | Accept duration parameter from client in complete mutation |
| `convex/actions/research.ts` | Pass phase: "research" when recording costs, add error logging |
| `convex/actions/geminiPrep.ts` | Pass phase: "prep" when recording costs, add error logging |
| `convex/actions/analysisAction.ts` | Pass phase: "analysis" when recording costs |
| `src/routes/_app/_auth/dashboard/debate.tsx` | Pass timer duration to backend when debate ends |
| `src/routes/_app/_auth/dashboard/_layout.admin.tsx` | Enhanced display showing phase and service breakdowns, topic grouping |

---

## Success Criteria

We will know these fixes are successful when:

- [ ] Vapi costs reflect the actual debate duration from the timer, not the 60-second fallback estimate
- [ ] Users can see the total cost of debating a specific topic, including all related prep work
- [ ] Users can see a breakdown showing Research vs Prep vs Debate vs Analysis costs
- [ ] Users can see a service breakdown showing Firecrawl vs Gemini vs OpenRouter vs Vapi costs
- [ ] All cost tracking errors are logged instead of silently swallowed
- [ ] Estimated costs are clearly marked with indicators to distinguish them from accurate tracking
