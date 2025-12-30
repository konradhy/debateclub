# Scenarios Roadmap

**Last Updated:** December 29, 2025

Master tracking document for all practice scenarios. An LLM can use this to systematically build scenarios by following `SCENARIO_CONTENT_RUBRIC.md` and `SCENARIO_IMPLEMENTATION_RUBRIC.md`.

---

## How to Use This Document

**For LLMs building scenarios:**

1. Pick a scenario from **In Progress** or **Backlog**
2. Read `SCENARIO_IMPLEMENTATION_RUBRIC.md` for the config-first approach
3. Read `SCENARIO_CONTENT_RUBRIC.md` for research and blog templates
4. Execute the process: Research → Blog → Config → Test
5. Update this roadmap when complete (move to Implemented, update files/status)

**All scenarios use:**
- `prepType: "generic"` (not debate-specific)
- `research: false` (no automated web scraping)
- Config-first design: research populates config fields, blog explains design intent

---

## Status Legend

- ✅ **Implemented** - Live in production
- 🚧 **In Progress** - Currently being built
- 📋 **Backlog** - Planned for future

---

## Master Scenario Table

| Scenario | Category | Status | Config File | Research Doc | Marketing Doc |
|----------|----------|--------|-------------|--------------|---------------|
| Debate | debate | ✅ | `convex/scenarios/debate.ts` | N/A (uses live research) | N/A |
| Cold Prospect | sales | ✅ | `convex/scenarios/sales.ts` | - | - |
| Demo Follow-up | sales | ✅ | `convex/scenarios/sales.ts` | - | - |
| Investor Pitch | entrepreneur | ✅ | `convex/scenarios/entrepreneur.ts` | - | - |
| Contract Negotiation | sales | ✅ | `convex/scenarios/sales.ts` | `research/scenario-contract-negotiation-research.md` | `marketing-plans/scenario-contract-negotiation.md`, `src/routes/blog/scenario-contract-negotiation.tsx` |
| Customer Discovery | entrepreneur | ✅ | `src/scenarios/entrepreneur.ts` | `research/scenario-customer-discovery-research.md` | `marketing-plans/scenario-customer-discovery.md`, `src/routes/blog/scenario-customer-discovery.tsx` |
| Early Customer Sales | entrepreneur | ✅ | `src/scenarios/entrepreneur.ts` | `research/scenario-early-customer-sales-research.md` | `marketing-plans/scenario-early-customer-sales.md`, `src/routes/blog/scenario-early-customer-sales.tsx` |
| Treatment Refusal | healthcare | ✅ | `convex/scenarios/healthcare.ts` | `research/scenario-treatment-refusal-research.md` | `marketing-plans/scenario-treatment-refusal.md`, `src/routes/blog/scenario-treatment-refusal.tsx` |
| Bad News Delivery | healthcare | 📋 | `convex/scenarios/healthcare.ts` | - | - |
| Family Conflict | healthcare | 📋 | `convex/scenarios/healthcare.ts` | - | - |
| Renewal Conversation | sales | 📋 | `convex/scenarios/sales.ts` | - | - |
| Gatekeeper | sales | 📋 | `convex/scenarios/sales.ts` | - | - |
| Board Meeting Defense | entrepreneur | 📋 | `convex/scenarios/entrepreneur.ts` | - | - |
| Co-founder Conflict | entrepreneur | 📋 | `convex/scenarios/entrepreneur.ts` | - | - |
| Non-Compliance | healthcare | 📋 | `convex/scenarios/healthcare.ts` | - | - |
| Cost/Insurance Discussion | healthcare | 📋 | `convex/scenarios/healthcare.ts` | - | - |

---

## Scenario Briefs

Each brief provides enough context for an LLM to begin the research phase.

### 🚧 In Progress

None currently. See Backlog below for next priorities.

ALSOOOO DON'T FORGET AN ELEVATOR PITCH. GOOD OLD FASHIONED ELEVATOR PITCH.

### 📋 Backlog (Priority Order)

#### Bad News Delivery
- **Category:** Healthcare
- **Core tension:** Delivering serious/terminal diagnosis to patient and family
- **Why it matters:** One of hardest conversations in medicine. Most providers never get training.
- **What users will practice:** Balancing honesty with compassion, managing emotional reactions
- **Compellability:** VERY HIGH - profound impact, deeply human

#### Family Conflict
- **Category:** Healthcare
- **Core tension:** Family members disagree about patient's care plan (surgery vs. palliative)
- **Why it matters:** Provider stuck in middle. Wrong approach damages trust with everyone.
- **What users will practice:** Mediating conflict while maintaining medical authority
- **Compellability:** HIGH - common in ICU, elderly care, end-of-life

#### Co-founder Conflict
- **Category:** Entrepreneur
- **Core tension:** Difficult conversation with co-founder about performance, equity, direction
- **Why it matters:** Co-founder breakups kill startups. Avoided until too late.
- **What users will practice:** Having hard conversations without destroying the relationship
- **Compellability:** HIGH - common, deeply painful, often avoided

#### Renewal Conversation
- **Category:** Sales
- **Core tension:** Existing customer up for renewal but considering switching to competitor
- **Why it matters:** Retention cheaper than acquisition. Most churn from unaddressed concerns.
- **What users will practice:** Uncovering hidden concerns, reestablishing value
- **Compellability:** MEDIUM - SaaS-heavy but important

#### Gatekeeper
- **Category:** Sales
- **Core tension:** Assistant/screener blocking access to decision-maker
- **Why it matters:** First barrier in enterprise sales. Most reps fail here.
- **What users will practice:** Getting past the gatekeeper without being pushy or deceptive
- **Compellability:** MEDIUM - very specific but universally painful

#### Board Meeting Defense
- **Category:** Entrepreneur
- **Core tension:** Board member challenging your strategy, metrics, or decisions
- **Why it matters:** High-pressure. Founders often get defensive or fold too easily.
- **What users will practice:** Defending decisions with data, acknowledging gaps, maintaining confidence
- **Compellability:** MEDIUM-HIGH - post-funding only, but high anxiety

#### Non-Compliance
- **Category:** Healthcare
- **Core tension:** Patient not following treatment plan (meds, lifestyle, follow-ups)
- **Why it matters:** Chronic issue. Lecturing doesn't work.
- **What users will practice:** Understanding barriers, partnering on solutions
- **Compellability:** HIGH - affects outcomes, major provider frustration

#### Cost/Insurance Discussion
- **Category:** Healthcare
- **Core tension:** Patient can't afford treatment or insurance won't cover it
- **Why it matters:** Emotionally brutal. Providers trained in medicine, not financial navigation.
- **What users will practice:** Having honest conversations about money, finding alternatives
- **Compellability:** MEDIUM-HIGH - systemic issue, provider feels powerless

---

## Future Categories (Ideas)

When expanding beyond current categories:

- **Legal** - Cross-examination, settlement negotiation, client consultation
- **Difficult Conversations** - Performance reviews, terminations, workplace conflict
- **Academic** - Thesis defense, grant review, peer review response
- **Presentations** - Conference Q&A with hostile questions, investor roadshow

---

## Process Checklist Per Scenario

From `SCENARIO_IMPLEMENTATION_RUBRIC.md`:

- [ ] **Research (2-3 hrs)** - Create `research/scenario-[name]-research.md` with config field mappings
- [ ] **Marketing (1-2 hrs)** - Create `marketing-plans/scenario-[name].md` explaining design intent
- [ ] ** Blog - Create the blog post
- [ ] **Config (2-3 hrs)** - Add to appropriate `convex/scenarios/[category].ts`
- [ ] **Testing (1 hr)** - Human tests happy path, failure path, analysis quality
- [ ] **Update Roadmap** - Move to Implemented, fill in file paths

**Total: 6-9 hours per scenario**

---

## Notes

- Healthcare scenarios require new file: `convex/scenarios/healthcare.ts`
- Research phase finds sources organically - no pre-specified sources
- Each scenario needs all three deliverables: research doc, marketing doc, config
- Test with real humans before marking as Implemented
