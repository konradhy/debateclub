# Development Journal 2

**Continuation of the session-by-session development record. Journal 1 became too long.**

---

## How to Use This Document

1. **Start each session** by reading the Chapter Summaries below
2. **If you need deep context** on a specific feature, read the full chapter in `dev_journal.md` (Journal 1)
3. **Increment chapter number** for your session (continue from Chapter 13)
4. **Document as you work** — decisions, problems, solutions
5. **Complete chapter** before ending session
6. **Never modify** past chapters — only add new ones

---

## Journal 1 Summary

Journal 1 (`dev_journal.md`) contains Chapters 0-12 with rich implementation details. **If you're in a jam or need deep context on a feature, Journal 1 has the full story.**

---

## Current Chapter (Full Text)

The most recent chapter is included in full here for immediate context:

---

## Chapter 12: Opponent Profile UX Redesign — Progressive Disclosure & Ghost Scenarios

### TL;DR

Completely redesigned the opponent profile page from an overwhelming scenario selector + flat form into a **debate-first experience** with progressive disclosure. Debate is now the default page experience, with scenarios accessible via a subtle "Change practice type →" ghost link. Optional fields are hidden in compact accordion sections with clear "optional" labeling.

**Roadmap Items Advanced**: UX Enhancement, Scenario System Maturity

---

### The Problem

The original opponent profile page was "overwhelming and like shit":

1. **Equal Treatment**: All practice types (debate, sales, entrepreneur) displayed equally, when debate is the primary feature and scenarios are "side quests"
2. **Visual Clutter**: All ~30 form fields visible at once in flat collapsible sections
3. **No Progressive Disclosure**: Users had to scroll through fields they might not need
4. **Scenario Prominence**: Large scenario selector grid gave too much visual weight to what should be secondary

**User feedback**: "This still gives too much prominence to the scenarios... Debate. This is the most important, top dog."

---

### The Solution: Config-Driven Progressive Disclosure

#### 1. **Debate IS the Page**

No scenario selector visible by default. The page opens as a debate form. Scenarios are accessible but not prominent.

#### 2. **Ghost Link Pattern**

Bottom-right subtle link: `Change practice type →` opens a categorized popover:

```
┌─ Practice Type ────────────┐
│ DEBATE                     │
│ • Debate (current)        │
│                            │
│ SALES                      │
│ • Cold Prospect            │
│ • Demo Follow-up           │
│ • Contract Negotiation     │
│                            │
│ ENTREPRENEUR               │
│ • Investor Pitch           │
│ • Early Customer Sales     │
│ • Customer Discovery       │
└────────────────────────────┘
```

Clicking switches scenario and resets the form.

#### 3. **Accordion Sections with "Optional" Labels**

Optional fields grouped in collapsible sections:

```
Core Fields (always visible):
├── Practice Partner Name
├── Debate Topic
└── Your Position (Pro/Con)

──────────────────────────────── separator

▸ Opponent Profile ─────────────────────────── optional
▸ Steelmanning Their Arguments ──────────────── optional
▸ Audience & Format ───────────────────────────── optional
▸ Your Strategy ───────────────────────────────── optional
```

Compact single-line accordions with chevron on left (▸ when closed, ▾ when open).

#### 4. **Nested Subsections**

Advanced options nested inside sections:

```
▾ Opponent Profile ─────────────────────────── optional
  └── About Your Opponent
  └── Their Organization
  └── Their Debate Style
  └── ▸ Deep Intel ──────────────────────────── optional
      └── Credentials & Weaknesses
      └── Past Statements (for traps)
      └── Known Contradictions
      └── Track Record
      └── Rhetorical Tendencies
      └── Triggers & Character Issues
```

#### 5. **Config-Driven Form Rendering**

Each scenario defines its own form structure via `formLayout`:

```typescript
formLayout: {
  core: {
    fields: ["topic", "position"],
    showStyleDifficulty: true,  // Hidden inputs for debate
  },
  sections: [
    {
      id: "opponent-profile",
      title: "Opponent Profile",
      optional: true,
      fields: ["opponentDescription", "opponentOrganization"],
      subsections: [
        {
          id: "deep-intel",
          title: "Deep Intel",
          optional: true,
          fields: ["opponentCredentials", "credentialWeaknesses", ...]
        }
      ]
    },
    // ... more sections
  ]
}
```

The component reads this config and renders recursively — no UI code changes needed to add/remove/reorganize fields.

---

### Files Changed

#### 1. **New UI Components**

- **`src/ui/accordion.tsx`** — Created shadcn Accordion component
  - Chevron starts at -90deg (▸) and rotates to 0deg (▾) when open
  - Compact styling: `py-2` instead of `py-4`

- **`src/ui/popover.tsx`** — Created shadcn Popover component
  - Used for ghost link scenario selector

#### 2. **Type System Extension** — `src/scenarios/types.ts`

Added new types to support config-driven form layout:

```typescript
export interface FormSection {
  id: string;
  title: string;
  description?: string;
  icon?: string;              // Lucide icon name
  optional?: boolean;         // Shows "optional" badge
  defaultOpen?: boolean;
  fields: string[];           // Field keys from inputs
  subsections?: FormSection[]; // Nested sections
}

export interface CoreFieldsConfig {
  fields: string[];           // Always-visible core fields
  showStyleDifficulty?: boolean; // Hidden inputs for debate
}

export interface FormLayoutConfig {
  core: CoreFieldsConfig;
  sections: FormSection[];
}
```

Added `formLayout?: FormLayoutConfig` to `ScenarioConfig`.

Updated `InputFieldConfig` to support:
- `hidden?: boolean` — Field exists in schema but not shown
- `type?: "text" | "textarea" | "select"`
- `rows?: number` — Textarea rows

#### 3. **Scenario Configs Updated**

Added `formLayout` to all 7 scenarios:

**`src/scenarios/debate.ts`**:
```typescript
formLayout: {
  core: {
    fields: ["topic", "position"],
    showStyleDifficulty: true,
  },
  sections: [
    {
      id: "opponent-profile",
      title: "Opponent Profile",
      optional: true,
      fields: ["opponentDescription", "opponentOrganization", "opponentDebateStyle"],
      subsections: [{
        id: "deep-intel",
        title: "Deep Intel",
        optional: true,
        fields: ["opponentCredentials", "credentialWeaknesses", ...]
      }]
    },
    {
      id: "steelmanning",
      title: "Their Strongest Arguments",
      optional: true,
      fields: ["opponentStrongestArguments", "opponentBestEvidence", ...]
    },
    {
      id: "audience-format",
      title: "Audience & Format",
      optional: true,
      fields: ["audienceDescription", "audienceType", ...]
    },
    {
      id: "your-strategy",
      title: "Your Strategy",
      optional: true,
      fields: ["talkingPoints", "userResearch", ...]
    }
  ]
}
```

**`src/scenarios/sales.ts`** (3 scenarios):
```typescript
formLayout: {
  core: {
    fields: ["topic"],
    showStyleDifficulty: false,
  },
  sections: [
    {
      id: "prospect-context",
      title: "Prospect Context",
      optional: true,
      fields: ["opponentDescription", "talkingPoints"]
    },
    {
      id: "additional",
      title: "Additional Context",
      optional: true,
      fields: ["additionalContext"]
    }
  ]
}
```

**`src/scenarios/entrepreneur.ts`** (3 scenarios) — Similar pattern

**`src/scenarios/index.ts`** — Re-exported new types:
```typescript
export type {
  FormSection,
  FormLayoutConfig,
  CoreFieldsConfig,
};
```

#### 4. **Opponent Profile Complete Rewrite** — `src/routes/_app/_auth/dashboard/opponent-profile.tsx`

**Before**: 1051 lines with hardcoded field rendering
**After**: 659 lines with config-driven recursive rendering

Key changes:

**A. Helper Components**:

```typescript
// Recursive accordion section renderer
function AccordionSection({
  section,
  scenario,
  formData,
  updateField,
}: {
  section: FormSection;
  scenario: ScenarioConfig;
  formData: Record<string, string>;
  updateField: (field: string, value: string) => void;
}) {
  return (
    <AccordionItem value={section.id} className="border-none">
      <AccordionTrigger className="py-2 hover:no-underline text-sm font-normal">
        <span className="text-primary">{section.title}</span>
        {section.optional && (
          <span className="text-xs text-muted-foreground ml-auto">optional</span>
        )}
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-4 pb-4 pl-6">
          {section.fields.map((fieldKey: string) => (
            <FormField key={fieldKey} fieldKey={fieldKey} ... />
          ))}
          {section.subsections && (
            <Accordion type="multiple" className="border-l-2 border-border/50 pl-4">
              {section.subsections.map((sub: FormSection) => (
                <AccordionSection key={sub.id} section={sub} ... />
              ))}
            </Accordion>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
```

**B. FormField Component**:

```typescript
function FormField({
  fieldKey,
  config,
  value,
  onChange,
}: {
  fieldKey: string;
  config: InputFieldConfig;
  value: string;
  onChange: (value: string) => void;
}) {
  // Renders input based on config.type (text, textarea, select)
  // Handles label, placeholder, helperText from config
}
```

**C. ScenarioPopover Component**:

```typescript
function ScenarioPopover({
  currentScenario,
  onScenarioChange,
}: {
  currentScenario: ScenarioConfig;
  onScenarioChange: (scenarioId: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-xs text-muted-foreground hover:text-primary/60 transition-colors">
          Change practice type →
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        {/* Grouped by category: Debate, Sales, Entrepreneur */}
      </PopoverContent>
    </Popover>
  );
}
```

**D. Main Component Structure**:

```tsx
<form>
  {/* Core Fields */}
  <div className="flex flex-col gap-4">
    <LabeledInput id="name" label="Practice Partner Name" ... />
    {formLayout.core.fields.map((fieldKey) => (
      <FormField key={fieldKey} fieldKey={fieldKey} ... />
    ))}
  </div>

  {/* Separator */}
  {hasFormLayout && formLayout.sections.length > 0 && (
    <div className="border-t border-border" />
  )}

  {/* Accordion Sections */}
  {hasFormLayout && formLayout.sections.length > 0 && (
    <Accordion type="multiple">
      {formLayout.sections.map((section) => (
        <AccordionSection key={section.id} section={section} ... />
      ))}
    </Accordion>
  )}

  {/* Hidden inputs for debate style/difficulty */}
  {formLayout?.core.showStyleDifficulty && (
    <>
      <input type="hidden" name="style" value={formData.style || "aggressive"} />
      <input type="hidden" name="difficulty" value={formData.difficulty || "medium"} />
    </>
  )}

  {/* Action buttons */}
  <Button type="submit">Start Practice →</Button>

  {/* Ghost link */}
  <div className="flex justify-end">
    <ScenarioPopover currentScenario={scenario} onScenarioChange={...} />
  </div>
</form>
```

---

### Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Accordion over `<details>`** | Better animations, keyboard navigation, controlled state |
| **Chevron on left** | Matches mental model: "expand this item" vs "this item has content" |
| **"optional" label** | Clear signaling that fields can be skipped without guilt |
| **Separator line** | Visual distinction between core and optional sections |
| **Ghost link placement** | Bottom right, subtle, discoverable but not prominent |
| **Form reset on switch** | Clear all fields when changing scenarios to avoid confusion |
| **Config-driven sections** | Each scenario defines its own UX without UI code changes |
| **Hidden style/difficulty** | Debate-specific inputs not relevant to all scenarios |

---

### Technical Challenges

1. **TypeScript Errors**: Missing type exports
   - Fixed by importing and re-exporting FormSection, FormLayoutConfig in scenarios/index.ts

2. **Implicit any types**: section.fields.map and section.subsections.map
   - Fixed with explicit type annotations: `(fieldKey: string)` and `(sub: FormSection)`

3. **Convex mutation API change**: mutateAsync doesn't exist
   - Fixed by using direct mutation function: `const createOpponent = useConvexMutation(api.opponents.create);`

4. **Accordion styling**: First implementation too bulky
   - Reduced padding from `py-4` to `py-2`
   - Removed icon and description from trigger
   - Moved chevron to left side with -90deg → 0deg rotation

---

### Session Handoff

**Status**: Complete ✅

**What This Enables**:
- Debate feels like the primary feature (it is)
- Scenarios accessible but not prominent (ghost link pattern)
- Progressive disclosure reduces cognitive load
- Config-driven form system scales to 20-30+ scenarios without UI changes
- Each scenario defines its own UX in config files

**What's Left** (Future Work):
- Consider adding icons to section headers (currently removed for compactness)
- Possibly add "Expand all" / "Collapse all" controls for power users
- User-created custom scenarios (not planned)

**Technical Debt Introduced**: None

**Blockers**: None

**The Principle**: The UI should reflect the product hierarchy. Debate is the main feature. Everything else is optional enhancement.

---

---

## Chapter Summaries from Journal 1

Below are concise summaries of each chapter. For full implementation details, see `dev_journal.md`.

---

### Chapter 0: Genesis — Documentation System Initialization
**Date**: December 17, 2025

Established baseline for AI documentation system. Captured project state when structured documentation began. All prior work referenced as "Pre-docs".

**Key Existing Features**:
- Voice debate with Vapi, technique detection (11 techniques), post-debate analysis
- Opponent profiles with AI prep, Convex Auth, Stripe, Resend email
- Built on Convex + TanStack Router template

**Key Patterns**: Vapi for voice (transient assistants), Convex for real-time, Mehdi Hasan's 11 techniques framework.

---

### Chapter 0.1: Corrections — Baseline Audit
**Date**: December 17, 2025

Corrected Chapter 0 inaccuracies. Research Mode (Firecrawl) and Missed Opportunity Detection were already complete, not "in progress".

**Lesson**: Always inspect actual codebase, not just documentation.

---

### Chapter 1: AI Config, Research Processing, and Analysis Improvements
**Date**: December 17, 2025

Created centralized AI model configuration (`convex/lib/aiConfig.ts`), added AI-powered article summarization for Firecrawl research, implemented user research text processing, and enhanced analysis display.

**Key Files**: `aiConfig.ts`, `promptTemplates.ts`, `research.ts`, `prep.tsx`, `analysis.tsx`

**Pattern**: All AI calls documented in `AI_CALL_REGISTRY` with purpose and cost estimates.

---

### Chapter 2: Progress Tracking & Research Chatbot
**Date**: December 18, 2025

Added real-time progress tracking during strategy generation (9 phases) and RAG-powered chatbot for querying research materials.

**Key Files**: `prepProgress.ts`, `prepChat.ts`, `prep.tsx`

**Decision**: Sequential generation (not parallel) for better progress visibility.

---

### Chapter 3: Analysis Generation & Frontend Schema Fix
**Date**: December 19, 2025

Fixed critical bug where `missedOpportunities` was array of objects in schema but frontend treated as strings. Established **Schema Source of Truth** pattern.

**Lesson**: Database schema is the source of truth. Application code adapts to it.

---

### Chapter 4: Hardcoded Debate Topic Fix & Analysis Page Restoration
**Date**: December 19, 2025

Fixed bug where all debates used hardcoded "Florence Griffith-Joyner" topic. Rebuilt `analysis.tsx` from scratch after it was mysteriously wiped.

**Key Change**: Moved topic/position calculation to component level using opponent data.

---

### Chapter 5: Opponent Deletion, Recording Storage & Debate History
**Date**: December 20, 2025

Added cascade deletion for opponents, Cloudflare R2 for recording storage via Vapi webhooks, and history page with Recharts performance charts.

**Key Files**: `opponents.ts` (deletion), `r2.ts`, `history.tsx`, `http.ts` (webhook)

**Env Vars Required**: `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT`

---

### Chapter 5.1: Recording & Analysis Fixes
**Date**: December 20, 2025

Fixed Vapi recording URL extraction (was at `message.artifact.recording`, not `message.call?.recordingUrl`). Migrated to OpenRouter structured outputs for reliable analysis generation.

**Pattern**: OpenRouter structured outputs with `strict: true` guarantees schema compliance.

---

### Chapter 6: Password Authentication Migration
**Date**: December 21, 2025

Replaced passwordless OTP with email/password authentication. Sign-up requires verification, supports password reset. GitHub OAuth remains as alternative.

**Key Files**: `auth.ts`, `ResendPasswordReset.ts`, login page

**Breaking Change**: Existing OTP accounts need "Forgot password" to set a password.

---

### Chapter 7: Enhanced Opponent Profile with Strategic Brief Pattern
**Date**: December 21, 2025

Added 23 new optional fields for audience context, opponent intelligence, and user directives. Created **Strategic Brief Pattern** — synthesizes all context into flowing narrative for AI prompts.

**Key Files**: `strategicBrief.ts`, `promptTemplates.ts`, `opponent-profile.tsx`

**Pattern**: Brief built once, passed to all 7 generation functions. Reads like actual prep, not a checklist.

---

### Chapter 7 (renumbered): Database Cleanup Cron Jobs
**Date**: December 21, 2025

Implemented 9 automated cleanup cron jobs using Convex's built-in `crons.ts`. Cleans app data (old exchanges, abandoned debates) and auth tables (expired sessions, verification codes).

**Key Files**: `crons.ts`, `cleanup.ts`

**Decision**: Built-in crons over component — simpler, version controlled, no dependencies.

---

### Chapter 8: Gemini Deep Research Integration (System B)
**Date**: December 21-22, 2025

Built alternative prep pipeline using Google Gemini. Uses `deep-research-pro-preview-12-2025` for 3-20 minute autonomous research, then `gemini-3-flash-preview` with `google_search` for source extraction.

**Key Files**: `geminiDeepResearch.ts`, `geminiSearch.ts`, `geminiPrep.ts`

**Key Insight**: Don't teach Deep Research methodology — give it context-aware direction. Let it do what it's designed to do.

**Env Var Required**: `GEMINI_API_KEY`

---

### Chapter 9: TanStack Start Migration for SSR
**Date**: December 23, 2025

Migrated to SSR for public pages (landing, blog) while keeping authenticated routes client-rendered. Enables search engine indexing.

**Key Changes**: 
- Deleted `index.html`, `main.tsx`, `app.tsx`
- Root route renders full HTML document with `head()` function
- `_app.tsx` has `ssr: false`, isolates Convex to client routes

**Pattern**: Public pages (SSR) don't need Convex. Auth pages (CSR) get Convex providers.

---

### Chapter 10: Scenario System - Plugin Architecture (Phases 1 & 2)
**Date**: December 26, 2025

Transformed app from debate-only to multi-scenario platform. Created plugin architecture where new scenarios are added via config files only.

**Key Files**: `src/scenarios/` directory (types, debate, sales, entrepreneur, index)

**Scenarios Delivered**: Debate, Sales Cold Prospect, Sales Demo Follow-up, Entrepreneur Pitch

**Schema Changes**: Added `scenarioType`, `prepType`, generic prep fields with IDs for inline editing.

---

### Chapter 11: Scenario System - Complete Implementation (Phases 3, 4, 5)
**Date**: December 26, 2025

Completed scenario system: dynamic Vapi config (Phase 3), dynamic PrepPanel/Quick Reference (Phase 4), scenario-specific analysis (Phase 5).

**Key Changes**:
- `debate.tsx` loads scenario config and replaces placeholders
- `prep-panel.tsx` shows different content based on `prepType`
- `analysisAction.ts` branches to debate or generic analysis schema
- Dashboard/history filtered to only count debate analyses for Hasan scores

**Adding New Scenarios**: Just create config file and add to registry. System auto-adapts.

---

### Chapter 11.1: Additional Context Field
**Date**: December 26, 2025

Added optional "Additional Context" field to all scenarios. Allows users to provide free-form guidance without breaking structured approach.

**Key Pattern**: Context is framed for AI as informational, not dogmatic instructions.

---

### Chapter 11.2: Dynamic Form Refactor
**Date**: December 26, 2025

Made opponent profile form truly dynamic — only fields defined in `scenario.inputs` are rendered. Non-debate forms are clean and simple.

**Key Pattern**: If it's not in the config, it doesn't exist in the UI.

---

---

## Key Patterns Reference

### 1. Schema Source of Truth
Database schema is authoritative. Frontend adapts to it.

### 2. Strategic Brief Pattern
Synthesize all context into flowing narrative. Build once, use everywhere.

### 3. OpenRouter Structured Outputs
Use `response_format` with JSON schema for guaranteed schema compliance.

### 4. Selective SSR with Convex
Public pages (SSR) at `/`, `/blog/*`. Auth pages (CSR) at `/_app/*` with `ssr: false`.

### 5. Scenario Plugin Architecture
Config over code duplication. Add scenarios by creating config files only.

### 6. Config-Driven Forms
Form layout defined in scenario config. UI renders recursively from config.

---

## Environment Variables Reference

**Convex Environment**:
- `OPENROUTER_API_KEY` — OpenRouter API
- `STRIPE_SECRET_KEY` — Stripe
- `RESEND_API_KEY` — Resend email
- `FIRECRAWL_API_KEY` — Firecrawl web scraping
- `GEMINI_API_KEY` — Google Gemini
- `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT` — Cloudflare R2

**Frontend (Vite)**:
- `VITE_CONVEX_URL` — Convex deployment URL
- `VITE_VAPI_PUBLIC_API_KEY` — Vapi public key

---

## Dev Commands

```bash
# Start development
npm run dev          # Frontend + Backend parallel
npm run dev:frontend # Vite only
npm run dev:backend  # Convex only

# Deploy
npx convex deploy    # Backend
# Frontend auto-deploys via Netlify
```

---

## Next Actions (From Chapter 12)

1. Consider adding icons to section headers
2. Consider "Expand all" / "Collapse all" controls for power users
3. Continue with marketing/blog content development

---

*Future chapters will be appended below this line.*

---


