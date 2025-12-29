# LLM Handoff Document

**Last Updated:** December 29, 2025

This document provides full context for an LLM picking up development on the DebateClub scenario system. Read this before doing anything else.

---

## What Is DebateClub?

A voice-based practice platform for high-stakes conversations. Users practice debates, sales calls, investor pitches, and difficult conversations with an AI opponent. The system:

1. **Generates realistic opponents** based on config (personality, responses, behavioral rules)
2. **Detects techniques** used during the conversation
3. **Scores performance** on 4 dimensions specific to the scenario
4. **Provides detailed analysis** with actionable feedback

---

## The Scenario System

Scenarios are the core product. Each scenario defines a specific practice situation (e.g., "Contract Negotiation," "Investor Pitch," "Early Customer Sales").

### Config Structure

Each scenario has a config in `src/scenarios/[category].ts` (frontend) and `convex/scenarios/[category].ts` (backend). Key fields:

| Field | Purpose |
|-------|---------|
| `firstMessage[]` | 3-5 realistic opening lines the opponent uses |
| `systemPrompt` | Behavioral rules - what triggers reward/punishment |
| `scoreCategories` | 4 dimensions scored 1-10 in analysis |
| `analysis.systemPrompt` | Prompt for post-conversation scoring |
| `inputs` | Form fields users fill out before practice |
| `voice` | Voice settings (11Labs voice ID, interruption) |

### The Three Registries

Scenarios must be registered in THREE places:

1. **Frontend config:** `src/scenarios/[category].ts` - Full scenario definition
2. **SCENARIOS registry:** `src/scenarios/index.ts` - Import + add to SCENARIOS object
3. **Blog index:** `src/routes/blog/index.tsx` - Add card in "Practice Guides" section

**Missing from any registry = scenario won't appear in UI.**

---

## The Systematic Build Process

All scenarios follow this process from `SCENARIO_IMPLEMENTATION_RUBRIC.md`:

### Step 0: Research (2-3 hrs)
- Create `research/scenario-[name]-research.md`
- Gather techniques, mistakes, openings, objection patterns
- Map every finding to a specific config field
- Cite 3-5 sources (balance, don't over-rely on one)

### Step 1A: Marketing Plan (1 hr)
- Create `marketing-plans/scenario-[name].md`
- Internal planning doc explaining the approach

### Step 1B: Blog Post (2-3 hrs)
- Create `src/routes/blog/scenario-[name].tsx`
- React component following the Blog Formula
- Uses reusable components from `@/components/blog`
- Explains design intent without saying "simulation" or "AI"

### Step 1C: Blog Index (15 min)
- Add card to `src/routes/blog/index.tsx` "Practice Guides" section

### Steps 2-7: Config Implementation (2-3 hrs)
- Add scenario to `src/scenarios/[category].ts`
- Register in `src/scenarios/index.ts`
- Define behavioral arc, firstMessage, systemPrompt, scoreCategories, analysis

### Step 8: Testing (1 hr)
- Test happy path, failure path, analysis quality

---

## Critical Rules (Learned the Hard Way)

### Language Rules
- **NEVER say "simulation" or "AI"** - use "practice engine," "system," "DebateClub"
- **Use role names** - "buyer," "investor," "prospect" not "AI opponent"
- **NO em dashes (—) or double hyphens (--)** - use en dash (–) or restructure

### Title Formula
Format: `How to [Specific Action/Outcome] [Without/When/Before] [Obstacle/Constraint]`

Good: "How to Land Your First 10 Customers Without Case Studies"
Bad: "Early Customer Sales: How to Sell When You Have Nothing But Conviction"

### Source Balance
- Cite 3-5 different authors/frameworks
- Don't let one source dominate
- If you catch yourself citing Voss 10 times, add other sources

### Blog Formula
14 required sections in order. See `SCENARIO_CONTENT_RUBRIC.md` for details.

Most critical: **PracticeEngineDemo** component showing bad/good technique paths.

---

## Key Files

### Documentation
- `docs/SCENARIO_IMPLEMENTATION_RUBRIC.md` - Full build process
- `docs/SCENARIO_CONTENT_RUBRIC.md` - Research and blog templates
- `docs/SCENARIOS_ROADMAP.md` - What's built, what's next

### Configs
- `src/scenarios/sales.ts` - Sales scenarios (Cold Prospect, Demo Follow-up, Contract Negotiation)
- `src/scenarios/entrepreneur.ts` - Entrepreneur scenarios (Investor Pitch, Early Customer Sales)
- `src/scenarios/debate.ts` - Debate scenario (uses Hasan methodology)

### Registry
- `src/scenarios/index.ts` - SCENARIOS object must include all scenarios

### Blog Components
- `src/components/blog/` - Reusable components (StatCard, TechniqueCard, PracticeEngineDemo, etc.)
- `src/routes/blog/index.tsx` - Blog index page with "Practice Guides" section

### Research/Content
- `research/scenario-*.md` - Research docs with source citations
- `marketing-plans/scenario-*.md` - Internal marketing plans
- `src/routes/blog/scenario-*.tsx` - Published blog posts

---

## Current State (December 29, 2025)

### Implemented Scenarios
| Scenario | Status | Files |
|----------|--------|-------|
| Debate | ✅ | `src/scenarios/debate.ts` |
| Sales - Cold Prospect | ✅ | `src/scenarios/sales.ts` |
| Sales - Demo Follow-up | ✅ | `src/scenarios/sales.ts` |
| Sales - Contract Negotiation | ✅ | `src/scenarios/sales.ts`, blog post, research |
| Entrepreneur - Investor Pitch | ✅ | `src/scenarios/entrepreneur.ts` |
| Entrepreneur - Early Customer Sales | ✅ | `src/scenarios/entrepreneur.ts`, blog post, research |

### Next Priority (from roadmap)
1. Customer Discovery (entrepreneur) - 🚧 In Progress
2. Treatment Refusal (healthcare) - 📋 Backlog
3. Bad News Delivery (healthcare) - 📋 Backlog

### Healthcare Note
Healthcare scenarios need a new file: `src/scenarios/healthcare.ts` (doesn't exist yet).

---

## Recent Decisions

### Reusable Blog Components
Created modular components to enforce consistency:
- `BlogLayout` - Header/footer wrapper
- `StatCard` / `StatsGrid` - High-contrast stat cards
- `TechniqueCard` - Technique explanation cards
- `MistakesList` - Numbered mistake list
- `PracticeEngineDemo` - **Critical** - Shows how the practice engine works
- `ScoreCategoriesGrid` - 2x2 grid of scoring dimensions
- `BehavioralRulesList` - If/then behavioral rules
- `CTASection` - Call to action
- `SourcesList` - Citations
- `Blockquote` - Styled quotes

### Title Formula
Adopted "How to [Outcome] Without [Constraint]" format after titles like "Early Customer Sales: How to Sell When You Have Nothing But Conviction" were deemed too wordy.

### Blog Index Registration
Added Step 1C requiring explicit registration in blog index. This was missing and caused new blog posts to not appear in the UI.

---

## How to Build a New Scenario

1. Pick a scenario from `SCENARIOS_ROADMAP.md`
2. Read `SCENARIO_IMPLEMENTATION_RUBRIC.md` completely
3. Follow Steps 0 → 1A → 1B → 1C → 2-7 → 8 in order
4. Update roadmap when complete

**Do not skip steps. Do not improvise. Follow the process.**

---

## Common Gotchas

1. **Scenario doesn't appear in UI** - Check all 3 registries (config, SCENARIOS object, blog index)
2. **TypeScript errors on Link routes** - Use type cast: `to={path as "/blog/some-route"}`
3. **Blog post looks generic** - Use the reusable components, don't hand-code everything
4. **Analysis is vague** - `analysis.systemPrompt` needs specific good/bad signals per category
5. **Opponent too easy/hard** - Tune behavioral rules in `systemPrompt` (reward good technique, punish bad)

---

## Questions to Ask the User

If unclear on priorities:
- "Which scenario should I build next from the roadmap?"
- "Should I focus on config implementation or blog content?"
- "Is there a specific technique or behavior you want emphasized?"

---

## Final Note

The system is designed to be systematic. Every research finding maps to a config field. Every blog section explains design intent. Every scenario follows the same structure. Trust the rubrics. Follow the process. The consistency is the product.

