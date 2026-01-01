# Development Journal 3

**Chapters 20-24** | Previous volumes: [Journal 1](./dev_journal.md) (Ch 0-12) | [Journal 2](./dev_journal_2.md) (Ch 13-19)

> **📚 Note**: This journal is now complete (Chapters 20-24). **Continue new sessions in `dev_journal_4.md`**.

---

# ⚠️ CRITICAL WARNING FOR AI ASSISTANTS ⚠️

**THIS IS VOLUME 3 (Chapters 20-24). THERE IS A VOLUME 4!**

📖 **`dev_journal_4.md`** contains Chapters 25+ including:
- **Archive summaries** of Chapters 0-24 (compressed for quick reference)
- **All new work** starting from Chapter 25

**DO NOT** add new chapters to this file. **New work goes in `dev_journal_4.md`**.

---

## How to Use This Document

1. **Start each session** by reading the Archive Summary in `dev_journal_4.md`
2. **If you need deep context** on a specific feature from Chapters 20-24, read the full chapter below
3. **For Chapters 0-12**, see `dev_journal.md` (Journal 1)
4. **For Chapters 13-19**, see `dev_journal_2.md` (Journal 2)
5. **For new work**, write to `dev_journal_4.md` (Journal 4)

---

## Archive Summary (Chapters 0-19)

**How to use this section**: These summaries capture the essential context from previous journals. For full implementation details, patterns, and debugging stories, see the original journals linked above.

---

### Chapter 0: Genesis — Documentation System Initialization
**Date**: December 17, 2025

Established baseline for AI documentation system. Captured project state when structured documentation began. All prior work referenced as "Pre-docs". Project built on Convex + TanStack Router template with voice debate (Vapi), technique detection (11 Mehdi Hasan techniques), post-debate analysis, opponent profiles with AI prep, authentication, and Stripe integration already complete.

**Key Patterns**: Vapi transient assistants, Convex real-time subscriptions, Mehdi Hasan's debate techniques framework.

---

### Chapter 0.1: Corrections — Baseline Audit
**Date**: December 17, 2025

Corrected Chapter 0 inaccuracies after inspecting actual codebase. Research Mode (Firecrawl) and Missed Opportunity Detection were already complete, not "in progress".

**Lesson**: Always inspect actual codebase, not just documentation.

---

### Chapter 1: AI Config, Research Processing, and Analysis Improvements
**Date**: December 17, 2025

Created centralized AI model configuration system (`convex/lib/aiConfig.ts`) with `AI_CALL_REGISTRY` documenting all AI calls with purpose and cost estimates. Added AI-powered article summarization for Firecrawl research results and user-submitted research text processing. Enhanced analysis display with better formatting.

**Key Files**: [aiConfig.ts](convex/lib/aiConfig.ts), [promptTemplates.ts](convex/lib/promptTemplates.ts), [research.ts](convex/research.ts)

---

### Chapter 2: Progress Tracking & Research Chatbot
**Date**: December 18, 2025

Added real-time progress tracking during strategy generation (9 phases) for better user visibility. Implemented RAG-powered chatbot allowing users to query their research materials with semantic search. Progress tracking uses sequential generation (not parallel) for better phase visibility.

**Key Files**: [prepProgress.ts](convex/prepProgress.ts), [prepChat.ts](convex/prepChat.ts), [prep.tsx](src/routes/_app/prep.$opponentId.tsx)

---

### Chapter 3: Analysis Generation & Frontend Schema Fix
**Date**: December 19, 2025

Fixed critical bug where `missedOpportunities` was array of objects in database schema but frontend treated as array of strings. Established **Schema Source of Truth** pattern: database schema is authoritative, application code adapts to it.

**Lesson**: Schema consistency is critical. Never assume frontend types match backend without verification.

---

### Chapter 4: Hardcoded Debate Topic Fix & Analysis Page Restoration
**Date**: December 19, 2025

Fixed bug where all debates used hardcoded "Florence Griffith-Joyner" topic instead of actual opponent topic. Rebuilt `analysis.tsx` from scratch after it was mysteriously wiped. Moved topic/position calculation to component level using opponent data instead of hardcoded values.

**Key Change**: Dynamic topic resolution from opponent profile, not hardcoded constants.

---

### Chapter 5: Opponent Deletion, Recording Storage & Debate History
**Date**: December 20, 2025

Added cascade deletion for opponents (removes all related prep materials, debates, research). Integrated Cloudflare R2 for debate recording storage via Vapi webhooks. Built history page with Recharts performance charts showing technique usage over time.

**Key Files**: [opponents.ts](convex/opponents.ts), [r2.ts](convex/lib/r2.ts), [history.tsx](src/routes/_app/history.tsx), [http.ts](convex/http.ts)
**Env Vars**: `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT`

---

### Chapter 5.1: Recording & Analysis Fixes
**Date**: December 20, 2025

Fixed Vapi recording URL extraction (correct path: `message.artifact.recording`, not `message.call?.recordingUrl`). Migrated analysis generation to OpenRouter structured outputs with `strict: true` for guaranteed schema compliance instead of unreliable JSON parsing.

**Pattern**: OpenRouter structured outputs eliminate JSON parsing failures and schema mismatches.

---

### Chapter 6: Password Authentication Migration
**Date**: December 21, 2025

Replaced passwordless OTP authentication with email/password system. Sign-up requires email verification, supports password reset via Resend. GitHub OAuth remains as alternative authentication method.

**Key Files**: [auth.ts](convex/auth.ts), [ResendPasswordReset.ts](convex/ResendPasswordReset.ts), login page
**Breaking Change**: Existing OTP accounts need "Forgot password" flow to set a password.

---

### Chapter 7: Enhanced Opponent Profile with Strategic Brief Pattern
**Date**: December 21, 2025

Added 23 new optional fields for audience context, opponent intelligence, and user directives. Created **Strategic Brief Pattern** — synthesizes all opponent context into flowing narrative prose for AI prompts instead of checklist-style data. Brief built once during prep generation, passed to all 7 generation functions (techniques, rebuttals, evidence, etc.).

**Key Files**: [strategicBrief.ts](convex/lib/strategicBrief.ts), [promptTemplates.ts](convex/lib/promptTemplates.ts)
**Pattern**: Narrative context beats structured checklists for AI comprehension.

---

### Chapter 7 (renumbered): Database Cleanup Cron Jobs
**Date**: December 21, 2025

Implemented 9 automated cleanup cron jobs using Convex's built-in `crons.ts`. Cleans app data (old exchanges, abandoned debates, expired prep materials) and auth tables (expired sessions, verification codes, rate limits). Chose built-in crons over external component for simplicity and version control.

**Key Files**: [crons.ts](convex/crons.ts), [cleanup.ts](convex/cleanup.ts)

---

### Chapter 8: Gemini Deep Research Integration (System B)
**Date**: December 21-22, 2025

Built alternative prep pipeline using Google Gemini as "System B" alongside existing OpenRouter pipeline. Uses `deep-research-pro-preview-12-2025` for 3-20 minute autonomous research, then `gemini-3-flash-preview` with `google_search` tool for extracting sources and citations. Deep Research produces higher quality analysis than traditional RAG approaches.

**Key Files**: [geminiDeepResearch.ts](convex/geminiDeepResearch.ts), [geminiSearch.ts](convex/geminiSearch.ts), [geminiPrep.ts](convex/geminiPrep.ts)
**Key Insight**: Don't teach Deep Research methodology — give it context-aware direction and let it work autonomously.
**Env Var**: `GEMINI_API_KEY`

---

### Chapter 9: TanStack Start Migration for SSR
**Date**: December 23, 2025

Migrated to server-side rendering for public pages (landing, blog) while keeping authenticated routes client-rendered. Enables search engine indexing of marketing content. Deleted `index.html`, `main.tsx`, `app.tsx`. Root route renders full HTML document with `head()` function. `_app.tsx` has `ssr: false` to isolate Convex to client routes only.

**Pattern**: Public pages (SSR) at `/`, `/blog/*` don't need Convex. Auth pages (CSR) at `/_app/*` get Convex providers.

---

### Chapter 10: Scenario System - Plugin Architecture (Phases 1 & 2)
**Date**: December 26, 2025

Transformed app from debate-only to multi-scenario platform. Created plugin architecture where new scenarios are added via config files only (no code duplication). Delivered debate, sales cold prospect, sales demo follow-up, and entrepreneur pitch scenarios. Added `scenarioType`, `prepType` to schema with generic prep fields using IDs for inline editing.

**Key Files**: [src/scenarios/](src/scenarios/) directory (types, debate, sales, entrepreneur, index)
**Pattern**: Config over code. Add scenarios by creating config files, system auto-adapts.

---

### Chapter 11: Scenario System - Complete Implementation (Phases 3, 4, 5)
**Date**: December 26, 2025

Completed scenario system with dynamic Vapi configuration (Phase 3), dynamic PrepPanel/Quick Reference content (Phase 4), and scenario-specific analysis schemas (Phase 5). `debate.tsx` loads scenario config and replaces placeholders. `prep-panel.tsx` shows different content based on `prepType`. `analysisAction.ts` branches to debate or generic analysis schema. Dashboard/history filtered to only count debate analyses for Hasan technique scores.

**Adding New Scenarios**: Create config file, add to registry. System handles UI, prompts, and analysis automatically.

---

### Chapter 11.1: Additional Context Field — Extensibility Without Chaos
**Date**: December 26, 2025

Added optional "Additional Context" field to all scenarios. Allows users to provide free-form guidance without breaking structured approach. Field framed for AI as informational context, not dogmatic instructions.

**Pattern**: Structured inputs + freeform context field = flexibility without chaos.

---

### Chapter 11.2: Dynamic Form Refactor — Only Show What's Configured
**Date**: December 26, 2025

Made opponent profile form truly dynamic — only fields defined in `scenario.inputs` are rendered. Non-debate forms are clean and simple without irrelevant debate-specific fields. Form recursively renders from scenario config.

**Pattern**: If it's not in the config, it doesn't exist in the UI. Pure config-driven forms.

---

### Chapter 13: Dashboard & App UI Redesign — Marketing Page Consistency
**Date**: December 29, 2025

Redesigned all authenticated pages to match marketing pages' warm color palette (`#F5F3EF` cream background, `#3C4A32` olive primary, `#FAFAF8` card backgrounds). Removed icons from buttons (Swords, Play, Sparkles). Fixed dashboard double navigation. Simplified to 2-column card grid. Removed AI model dropdown (baked in default). Made advanced options discreet.

**Key Files**: [_layout.index.tsx](src/routes/_app/_layout.index.tsx), [opponent-profile.tsx](src/routes/_app/opponent-profile.tsx), [prep.tsx](src/routes/_app/prep.$opponentId.tsx), [analysis.tsx](src/routes/_app/analysis.$debateId.tsx), [debate.tsx](src/routes/_app/debate.$opponentId.tsx)
**Design Principles**: Text over icons, warm not cold, Georgia serif for page titles, bake in defaults.

---

### Chapter 14: Debate Style & Difficulty Architecture — Dynamic Prompt Injection
**Date**: December 29, 2025

Re-implemented style and difficulty selection with proper two-dimensional architecture: **Style = WHO the opponent is (persona)**, **Difficulty = HOW SKILLED they are (competence)**. Upgraded from GPT-4o to Claude Sonnet 4. Added comprehensive Hasan technique arsenal for hard mode. Implemented debug tooling (dev-only) to verify actual prompts sent to Vapi.

**Architecture**: Two independent dimensions combined via template injection ({{STYLE}}, {{DIFFICULTY}} placeholders).
**Style Options**: friendly, aggressive, academic, activist, contrarian, opportunist
**Difficulty Options**: easy (no counter-techniques), medium (basic techniques), hard (full Hasan arsenal)

---

### Chapter 15: prep.tsx Refactoring — Component Extraction (Phases 7, 8, 10)
**Date**: December 29, 2025

Completed prep.tsx refactoring, reducing file from 3,130 lines to 486 lines (84.5% reduction). Extracted StudyModeGeneric (380 lines), StudyModeDebate (1,018 lines), and EmptyState (115 lines) components. Used explicit prop drilling pattern (not Context API) for maintainability. Codebase audit shows only one file over 750 lines remaining (StudyModeDebate).

**Success Criteria**: ✅ Under 800 lines target exceeded (reached 486 lines)

---

### Chapter 16: Token Economy Monetization — Core Implementation
**Date**: December 30, 2025

Implemented token-based monetization system with per-scenario token wallets, transaction ledger, subscriber usage tracking, and marketing funnel grant system. Security-first approach using internal mutations for sensitive operations. Token consumption on debate END (not start) for better UX. Created 5 new tables: `scenarioTokens`, `tokenTransactions`, `subscriberUsage`, `pendingGrants`, `subscriptions`.

**Key Files**: [monetization.ts](convex/lib/monetization.ts), [tokens.ts](convex/tokens.ts), [claim.$token.tsx](src/routes/_app/claim.$token.tsx), [TokenBalance.tsx](src/components/TokenBalance.tsx)
**Security Model**: Public queries require auth, sensitive operations use `internalMutation`, token grants/consumption only via internal functions.

---

### Chapter 17: Token Management UI — Admin Panel & Billing Page
**Date**: December 30, 2025

Built complete Token Management UI: Admin Panel for creating/managing marketing grant links, Billing page for subscription management and token purchases, settings sidebar with Billing tab, Admin header link for admin users, and locked scenario modal. Includes test mutations for simulating purchases/subscriptions without Stripe integration.

**New Routes**: `/dashboard/admin`, `/dashboard/settings/billing`
**Pricing**: Subscription $20/month or $200/year (2 months free). Token packs: 5/$10, 15/$25 (17% off), 50/$70 (30% off).
**Admin Features**: Create grant links with UTM tracking, view all grants with status, copy link, view claimer stats, manual token grants by email.

---

### Chapter 18: Stripe Payment Integration — Webhooks, UI Fixes & Subscription Management
**Date**: December 30, 2025

Completed Stripe payment integration for token purchases and subscriptions. Fixed critical webhook 500 error (metadata missing from subscription checkout), resolved UI button sync bug (all buttons loading simultaneously), filtered "Debate" from token purchase scenarios (subscriber-only), and added Stripe Customer Portal for subscription management (cancel at period end, payment updates, billing history).

**Webhook Events**: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
**Integration Flow**: Checkout → Stripe → Webhook → Tokens granted or subscription created

---

### Chapter 19: Cost Monitoring & Control — Complete Implementation
**Date**: December 31, 2025

Implemented comprehensive cost tracking system with accurate duration tracking, phase-based cost breakdown (research, prep, debate, analysis), topic-centric workflow grouping, and external verification links. Fixed Vapi duration tracking to use client-side timer instead of unreliable API responses. Added proper error logging throughout to eliminate silent failures.

**Key Changes**: Duration stored in client, passed to webhook. Phase tracking in all cost records. Topic-centric admin queries grouping prep + debate costs. External verification links for OpenRouter, Vapi, Firecrawl, Stripe. Proper error logging replacing silent try/catch blocks.
**Roadmap Items**: [R-4.3.1] through [R-4.3.7] ✅

---

### Chapter 20: Research Integration — Send Extracted Items to Study Mode
**Date**: December 31, 2025

Enabled users to click extracted research items (arguments, receipts, openers, zingers, counters) from "My Research" tab and send them to Study Mode. Fixed bug where user research replaced web research by changing from `.first()` to `.collect()` in research query. Added transformation layer converting extraction schema to Study Mode schema. Implemented "Sent ✓" button feedback with local state tracking.

**Key Files**: [research.ts](convex/research.ts), [usePrepHandlers.ts](src/hooks/prep/usePrepHandlers.ts), [MyResearchTab.tsx](src/components/prep/MyResearchTab.tsx), [ResearchTab.tsx](src/components/prep/ResearchTab.tsx)
**Pattern**: Reuse existing mutations with transformation layer. Multi-source research display with friendly labels.
**Roadmap Items**: [R-5.1] ✅

---

### Chapter 21: Strategic Brief Document — 7-Minute Game Plan Synthesis
**Date**: December 31, 2025

Generated 7-minute strategic orientation document synthesizing all prep materials into coherent narrative game plan. Shows connections between materials, applies Hasan principles to specific debate context, and provides deployment flow. Uses Gemini Flash for cost-effective synthesis (~$0.01-0.02 per brief). Non-fatal generation with graceful degradation. Displayed in dedicated tab with reading time estimate.

**Key Files**: [prepGeneration.ts](convex/actions/prepGeneration.ts), [promptTemplates.ts](convex/lib/promptTemplates.ts), [StrategicBriefTab.tsx](src/components/prep/StrategicBriefTab.tsx)
**Pattern**: Synthesis over summary. Narrative showing connections, not just listing materials. 4-section structure: Battlefield → Architecture → Principles → Deployment.
**Roadmap Items**: [R-5.4] ✅

---

### Chapter 24: Research Intensity Settings & Progress Bar Refactoring
**Date**: January 1, 2026

Implemented user-controlled research intensity settings (Basic/Aggressive/Deep) to give users control over how thoroughly AI researches debate topics. Refactored progress UI from 10 individual boxes to consolidated "Study Guide" box representing parallel generation. Extracted reusable `PrepProgressSteps` component to eliminate code duplication.

**Key Files**: [researchIntensity.ts](convex/lib/researchIntensity.ts) (NEW), [app.ts](convex/app.ts), [agents.ts](convex/agents.ts), [_layout.settings.research.tsx](src/routes/_app/_auth/dashboard/_layout.settings.research.tsx) (NEW), [PrepProgressSteps.tsx](src/components/prep/PrepProgressSteps.tsx) (NEW)
**Pattern**: Two-tier control system (intensity primary/prominent, articles secondary/ghost). Factory function for per-request agent customization. Prompt injection for research guidance.
**Key Insight**: Parallel generation requires honest progress display (one box, not 6). Code duplication invites future bugs.

---

## Key Patterns Reference

### 1. Schema Source of Truth
Database schema is authoritative. Frontend adapts to it. Never assume types match without verification.

### 2. Strategic Brief Pattern
Synthesize all context into flowing narrative prose. Build once, use everywhere. Narrative context beats checklists for AI comprehension.

### 3. OpenRouter Structured Outputs
Use `response_format` with JSON schema and `strict: true` for guaranteed schema compliance. Eliminates parsing failures.

### 4. Selective SSR with Convex
Public pages (SSR) at `/`, `/blog/*`. Auth pages (CSR) at `/_app/*` with `ssr: false`. Convex only on client routes.

### 5. Scenario Plugin Architecture
Config over code duplication. Add scenarios by creating config files only. System auto-adapts UI, prompts, and analysis.

### 6. Config-Driven Forms
Form layout defined in scenario config. UI renders recursively from config. If it's not in the config, it doesn't exist in the UI.

### 7. Internal Mutations for Security
Sensitive operations (token grants, cost recording) use `internalMutation`. Not callable from client, only from other Convex functions.

### 8. No Silent Failures
Every error must be logged. Graceful degradation is fine, but silence is not. Users deserve accurate data.

---

## Environment Variables Reference

**Convex Environment**:
- `OPENROUTER_API_KEY` — OpenRouter API
- `STRIPE_SECRET_KEY` — Stripe payments
- `RESEND_API_KEY` — Resend email
- `FIRECRAWL_API_KEY` — Firecrawl web scraping
- `GEMINI_API_KEY` — Google Gemini
- `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT` — Cloudflare R2 storage

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

*New chapters begin below this line.*

---

## Chapter 20: Research Integration — Send Extracted Items to Study Mode

**Date**: December 31, 2025

**Goal**: Enable users to click extracted research items from "My Research" tab and send them to Study Mode. Fix bug where user research replaces web research in Research Data tab.

**Roadmap Reference**: [R-5.1] Research Integration (debate scenarios only)

---

### Problem Statement

**Before**:
1. Users could paste research text into "My Research" tab → AI extracts arguments, receipts, openers, zingers, counters
2. Extracted items displayed in read-only cards with no way to save them to prep materials
3. Bug: When user extracted research, it created a NEW research document. Since `research.get()` used `.order("desc").first()`, only the latest document was returned, hiding all previous web research

**After**:
1. Each extracted item has a "Send" button
2. Clicking sends item to appropriate Study Mode section (appending, not replacing)
3. Button changes to "Sent ✓" and disables to prevent duplicates
4. Research Data tab shows ALL research sources (web + user) with clear labels ("🌐 Web Research" vs "📝 My Research")

---

### Implementation

#### Part 1: Send Extracted Items to Study Mode

**Pattern Used**: Followed existing InlineEdit pattern used throughout Study Mode. Used existing `addOpponentFieldItem` mutation with transformation layer to convert extraction format → Study Mode schema.

**Backend** (No changes needed):
- Reused `convex/opponents.ts:addOpponentFieldItem` mutation for appending items

**Frontend Hook** ([src/hooks/prep/usePrepHandlers.ts](src/hooks/prep/usePrepHandlers.ts)):
- Added `sentItems` state (Map<string, boolean>) for tracking sent items
- Added `transformExtractedItem()` helper function with 5 transformations:
  - `argument` → argumentFrame schema (claim → label, supportingPoints → detailedContent, strength → deploymentGuidance)
  - `receipt` → receipt schema (type mapping: "Statistic" → "Statistics", etc.)
  - `opener` → openingOption schema (type, hook, content)
  - `zinger` → zinger schema (text, context, type: "User Generated")
  - `counter` → opponentIntel item schema (argument, suggestedResponse → counters array)
- Added `handleSendExtractedItem()` async function that:
  1. Transforms item using helper
  2. Maps item type to opponent field (argument → argumentFrames, receipt → receipts, etc.)
  3. Calls `addFieldItem` mutation (appends to array)
  4. Updates `sentItems` Map for UI feedback

**Component** ([src/components/prep/MyResearchTab.tsx](src/components/prep/MyResearchTab.tsx)):
- Added props: `handleSendExtractedItem`, `sentItems`
- Added imports: `Send`, `Check` icons
- Added Send button to all 5 extracted item types with conditional rendering:
  ```tsx
  {sentItems.has(item.id) ? (
    <><Check /> Sent</>
  ) : (
    <><Send /> Send</>
  )}
  ```
- Button disabled when `sentItems.has(item.id) === true`

**Parent Component** ([src/routes/_app/_auth/dashboard/prep.tsx](src/routes/_app/_auth/dashboard/prep.tsx)):
- Added `handleSendExtractedItem` and `sentItems` to usePrepHandlers destructuring (lines 89, 100)
- Wired props to MyResearchTab component (lines 439-440)

#### Part 2: Fix Research Data Display Bug

**Root Cause**: `research.get` query used `.order("desc").first()` which only returns latest document. When user research was inserted with newer timestamp, it became "first" and hid all web research.

**Solution**: Fetch ALL research documents, display with source grouping.

**Backend** ([convex/research.ts](convex/research.ts)):
- Added new `getAll` query (lines 23-40):
  ```typescript
  export const getAll = query({
    args: { opponentId: v.id("opponents") },
    handler: async (ctx, args) => {
      const userId = await auth.getUserId(ctx);
      if (!userId) return null;

      const allResearch = await ctx.db
        .query("research")
        .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
        .order("desc")
        .collect(); // Changed from .first() to .collect()

      return allResearch;
    },
  });
  ```
- Kept existing `get` query for backward compatibility

**Frontend Hook** ([src/hooks/prep/usePrepData.ts](src/hooks/prep/usePrepData.ts)):
- Changed from `api.research.get` to `api.research.getAll` (lines 17-22)
- Returns `researchDocs` array instead of single `research` object (line 85)

**Component** ([src/components/prep/ResearchTab.tsx](src/components/prep/ResearchTab.tsx)):
- Complete rewrite to handle array of research documents
- Props changed from single object to array: `researchDocs: Array<{_id, query, articles, timestamp}>`
- Added `getResearchSourceLabel()` helper:
  - "User-provided" in query → "📝 My Research"
  - "Debate topic" in query → "🌐 Web Research"
- Maps over `researchDocs` array, displays each with:
  - Source header (friendly label + timestamp)
  - Article count badge (styled span, not Badge component which didn't exist)
  - Article cards (existing layout preserved)
- Empty state message when no research exists

**Parent Component** ([src/routes/_app/_auth/dashboard/prep.tsx](src/routes/_app/_auth/dashboard/prep.tsx)):
- Updated ResearchTab prop from `research={research}` to `researchDocs={researchDocs}` (line 426)

---

### Errors Fixed During Implementation

**Error 1: Badge Component Missing**
- Attempted to import `Badge` from `@/ui/badge` which didn't exist
- **Fix**: Removed import, replaced with styled `<span>` element

**Error 2: handleSendExtractedItem Not Defined**
- Added props to MyResearchTab but forgot to destructure from usePrepHandlers
- **Fix**: Added `handleSendExtractedItem` and `sentItems` to destructuring block (lines 89, 100)

---

### Files Modified

1. **convex/research.ts** — Added `getAll` query
2. **src/hooks/prep/usePrepData.ts** — Changed to use `getAll`, return `researchDocs`
3. **src/hooks/prep/usePrepHandlers.ts** — Added sentItems state, transformation logic, send handler
4. **src/components/prep/ResearchTab.tsx** — Complete rewrite for multi-source display
5. **src/components/prep/MyResearchTab.tsx** — Added Send buttons to all 5 item types
6. **src/routes/_app/_auth/dashboard/prep.tsx** — Wired up new props, updated destructuring

---

### Key Decisions

1. **Reuse existing mutations**: Used `addOpponentFieldItem` instead of creating new mutations → less code, consistent patterns
2. **Transformation layer**: Kept extraction schema separate from Study Mode schema, transformations handle conversion → flexibility to change either schema independently
3. **Local state for sent tracking**: `sentItems` Map provides instant UI feedback without database round-trip → better UX
4. **Append, don't replace**: Items added to existing arrays, never overwrite → users don't lose manually-added content
5. **Multi-source display**: Show ALL research documents instead of just latest → transparent, no data loss
6. **Friendly labels**: Emoji-prefixed labels ("📝 My Research") for quick visual scanning

---

### Testing Checklist (Confirmed Working by User)

✅ Part 1: Send to Study Mode
- Paste research text in My Research tab
- Extract insights
- Click "Send" button on argument
- Button changes to "Sent ✓"
- Switch to Study Mode → argument appears in Argument Frames
- Item appended (doesn't replace existing)
- Tested all 5 item types (arguments, receipts, openers, zingers, counters)
- Each appears in correct Study Mode section

✅ Part 2: Research Display
- Generate prep materials (creates web research)
- Research Data tab shows "🌐 Web Research" section
- Paste text in My Research and extract
- Research Data tab now shows TWO sections: web + user
- Both sections display correctly with timestamps
- Articles render properly within each section

---

### Patterns Established

**Research Data Architecture**:
- Multiple research documents per opponent (not just one)
- Each document has: query (source description), articles array, timestamp
- Frontend displays chronologically (newest first) with source grouping

**Extraction → Study Mode Flow**:
1. User pastes research text
2. AI extracts structured items
3. User clicks "Send" on item
4. Transformation layer converts format
5. Mutation appends to appropriate field
6. Local state updates for instant UI feedback
7. Study Mode auto-updates via Convex reactivity

---

### Success Criteria Met

✅ Users can send extracted research items to Study Mode
✅ Sent items appear in correct Study Mode sections
✅ Items append (don't replace) existing content
✅ Visual feedback shows sent state
✅ Research Data tab shows both web research AND user research
✅ No data loss or overwrites
✅ Clear source labeling ("Web Research" vs "My Research")

---

**Status**: [R-5.1] ✅ COMPLETE

---

## [R-5.2] Content Enhancement: Deployment Examples for Argument Frames & Receipts
**Date**: December 31, 2025
**Roadmap Item**: 5.2 Content Enhancement

### Goal
Add concrete debate dialogue examples to prep materials showing HOW to deploy argument frames and receipts in actual debates, following Mehdi Hasan's "Win Every Argument" methodology.

---

### Context & Problem

**Current State**:
- Argument frames have `deploymentGuidance` ("when to use this") but no example of WHAT to actually say
- Receipts have `deployment` object (timing/setup/followUp) but no concrete dialogue example
- Users see strategic guidance but not the spoken words they could use

**User Need**:
- Debaters need to see examples that embody Hasan techniques (Concession, Reframe, Preemption, Evidence Integration)
- Examples should teach deployment principles, not just provide copy-paste phrases
- AI must understand WHY techniques work (via Hasan quotes), not just surface patterns

---

### Implementation

#### 1. Schema Changes

**New Optional Fields**:
- `argumentFrames.exampleQuote` (string) — 1-2 sentence debate dialogue showing frame deployment
- `receipts.deploymentExample` (string) — 2-4 sentence debate dialogue using the receipt

**Files Modified**:
- [convex/schema.ts](convex/schema.ts#L192) — Added `exampleQuote` after `emotionalCore`
- [convex/schema.ts](convex/schema.ts#L212) — Added `deploymentExample` after `deployment`
- [convex/opponents.ts](convex/opponents.ts#L153) — Updated mutation validator for `exampleQuote`
- [convex/opponents.ts](convex/opponents.ts#L171) — Updated mutation validator for `deploymentExample`

**Why Optional**: No migration needed, works with existing data, AI generates for new opponents only

---

#### 2. Prompt Enhancements (The Critical Part)

**ARGUMENT_FRAMES_PROMPT** ([promptTemplates.ts#L113-L149](convex/lib/promptTemplates.ts#L113-L149)):

Added **DEPLOYMENT TECHNIQUES** section before OUTPUT REQUIREMENTS teaching:
1. **Concession Pivot (Synchoresis)** — Acknowledge valid point, redirect to your counter
   - WHY: Hasan quote about appearing reasoned, disarming opponents
   - Pattern: "You're right that X. But what you're missing is Y."

2. **Reframing** — Shift debate context by questioning premise
   - WHY: Hasan quote about defining debate terms
   - Pattern: "The real question isn't [their frame], it's [your frame]."

3. **Preemption** — Address opponent's arguments before they make them
   - WHY: Hasan quote about initiating discourse
   - Pattern: "Now, some will argue X. But consider Y."

4. **Evidence Integration** — Deploy evidence + challenge opponent to match it
   - WHY: Hasan quote about catching opponents unprepared
   - Pattern: "[Argument]. [Evidence with source]. So when [opponent claims X], what's their evidence?"

**Quality Criteria**:
- Must use specific technique (not generic dialogue)
- Connect to emotional core of argument
- Feel natural when spoken aloud
- Show HOW to deploy (not just WHAT the argument is)
- **Embody Hasan principle, not just copy surface patterns**

**RECEIPTS_ARSENAL_PROMPT** ([promptTemplates.ts#L186-L205](convex/lib/promptTemplates.ts#L186-L205)):

Added **DEPLOYMENT EXAMPLE REQUIREMENT** section with patterns:
- **Delayed Reveal with Challenge** — Claim → Evidence → Challenge
- **Comparison Trap** — "You say X failed. But when Country Y tried X, [stats]. So which failure?"
- **Opponent's Own Words** — "You claim A. But in [context], you said—exact quote—B. What changed?"

**Structure Template**:
1. Start with opponent's claim
2. Deploy receipt with source attribution
3. End with follow-up pressure (question/rhetorical pivot)

**Updated JSON Schemas**:
- Added `exampleQuote` field to all frame examples
- Added `deploymentExample` field to receipt schema

---

#### 3. UI Enhancements

**Argument Frames** ([StudyModeDebate.tsx#L368-L377](src/components/prep/StudyModeDebate.tsx#L368-L377)):
- Display `exampleQuote` in blue collapsed section with "EXAMPLE QUOTE" header
- Styling: `bg-blue-50 dark:bg-blue-950/30` with left border `border-blue-500`
- Italic text with quote marks for natural dialogue feel

**Receipts** ([StudyModeDebate.tsx#L673-L706](src/components/prep/StudyModeDebate.tsx#L673-L706)):
- Added expand/collapse button to each receipt (ChevronDown/ChevronUp icon)
- Display `deploymentExample` in orange collapsed section when expanded
- Styling: `bg-orange-50 dark:bg-orange-950/30` with left border `border-orange-500`
- Animate-in transition: `animate-in fade-in slide-in-from-top-2 duration-200`

**Semantic Colors**:
- **Blue** for argument frames (strategic, thought-provoking)
- **Orange** for receipts (evidence, urgency, action)

**Form Fields Added**:
- Inline edit forms for both argument frames and receipts
- "Add New" forms include example fields
- Placeholders with example patterns (e.g., "You're right that X. But what you're missing is Y...")

---

### Key Decisions

1. **Teach Principles, Not Patterns**:
   - Added WHY each technique works (Hasan quotes) before showing examples
   - AI learns methodology, not just surface-level copying
   - Quality criteria emphasizes "embody principle" over "copy pattern"

2. **Collapsed by Default**:
   - Examples don't clutter main view
   - Expand on demand for learning/reference
   - Receipts needed expand/collapse capability (didn't have it before)

3. **Examples Hidden in QuickRef**:
   - QuickRef is for quick scanning during debate
   - Examples are for prep/study, not live reference
   - Keeps QuickRef clean and focused

4. **Comprehensive Prompts**:
   - 4 deployment techniques with full explanations
   - 3+ concrete examples per technique
   - Structural templates (3-step receipt deployment)
   - Quality criteria to prevent generic output

5. **Optional Fields**:
   - No database migration needed
   - Works with existing opponents (graceful degradation)
   - Only new AI-generated prep gets examples

---

### Files Modified Summary

1. **convex/schema.ts** — Added 2 optional fields
2. **convex/opponents.ts** — Updated mutation validators
3. **convex/lib/promptTemplates.ts** — Enhanced 2 prompts with deployment techniques
4. **src/components/prep/StudyModeDebate.tsx** — Added display components + form fields

**Total Changes**: 4 files, ~150 lines of prompt content, ~40 lines of UI code

---

### Testing Results

**Typecheck**: ✅ No new errors introduced
- All type errors pre-existing in other files (landing pages, routes)
- Schema changes fully type-safe
- UI components properly typed

**Manual Testing** (Ready for User):
- [ ] Create new opponent
- [ ] Trigger prep generation
- [ ] Verify AI generates `exampleQuote` for argument frames
- [ ] Verify AI generates `deploymentExample` for receipts
- [ ] Check examples follow Win Every Argument patterns
- [ ] Test expand/collapse on receipts
- [ ] Verify blue styling (frames) and orange styling (receipts)
- [ ] Test dark mode
- [ ] Edit examples via inline edit
- [ ] Add new items with examples

---

### Success Criteria

✅ **Schema**: Optional fields added without breaking changes
✅ **Prompts**: Comprehensive deployment techniques with Hasan methodology
✅ **UI**: Examples display with semantic colors, expand/collapse works
✅ **Type Safety**: No new TypeScript errors
✅ **Ready for Testing**: AI generation can be tested with new opponent

**Next Step**: User creates opponent to verify AI generates quality deployment examples following Mehdi Hasan principles

---

**Status**: [R-5.2] ✅ COMPLETE

---

## [R-5.3] Prep Material Controls: Opponent Intelligence Editing
**Date**: December 31, 2025
**Roadmap Item**: 5.3 Prep Material Controls

### Goal
Enable full CRUD operations (Create, Read, Update, Delete) for opponent intelligence items in Study Mode, bringing them to feature parity with all other prep material fields.

---

### Context & Problem

**Before**:
- Opponent Intelligence section displayed AI-generated predicted arguments and counters
- Cards were **read-only** with NO edit/delete functionality
- Users couldn't add new opponent intelligence items manually
- Only counter selection (checkboxes) was available for favoriting
- **Inconsistent UX**: All other prep fields (argument frames, receipts, zingers, closings) had full InlineEdit capabilities

**After**:
- Full CRUD operations: Edit, Delete, Add
- Inline editing following the same pattern as other prep fields
- Form fields for all opponent intel properties (argument, likelihood, evidence, weakness, rhetoricalStyle)
- Nested counters array preserved during editing
- Consistent UX across all prep material types

---

### Investigation (Task 5.3.2)

**Question**: Why wasn't opponent intelligence editing included originally?

**Finding**: The backend infrastructure **already existed** - this was simply an **implementation oversight**, not a design decision.

**Evidence**:
1. ✅ [convex/opponents.ts:345](convex/opponents.ts#L345) — `opponentIntel` already in `updateOpponentFieldItem` mutation
2. ✅ [convex/opponents.ts:382](convex/opponents.ts#L382) — `opponentIntel` already in `addOpponentFieldItem` mutation
3. ✅ [convex/opponents.ts:423](convex/opponents.ts#L423) — `opponentIntel` already in `deleteOpponentFieldItem` mutation
4. ✅ [convex/opponents.ts:468](convex/opponents.ts#L468) — Special cleanup logic already exists for `selectedCounterIds` when intel deleted
5. ✅ [src/hooks/prep/usePrepHandlers.ts:14](src/hooks/prep/usePrepHandlers.ts#L14) — Already included in OpponentField type union

**Conclusion**: All three backend mutations supported opponentIntel from the beginning. The UI components in [StudyModeDebate.tsx](src/components/prep/StudyModeDebate.tsx) were simply never wired up with InlineEdit wrappers. This was likely deprioritized during the Chapter 15 refactoring or earlier implementation phases.

---

### Implementation

#### Schema Reference

**OpponentIntel Structure** ([convex/schema.ts:252-272](convex/schema.ts#L252-L272)):
```typescript
opponentIntel: v.optional(
  v.array(
    v.object({
      id: v.string(),                    // Required
      argument: v.string(),              // Required - Predicted opponent argument
      likelihood: v.string(),            // Required - High/Medium/Low
      evidence: v.string(),              // Required - Their supporting evidence
      rhetoricalStyle: v.optional(v.string()),  // Optional - e.g., "Appeal to emotion"
      weakness: v.string(),              // Required - Weakness to exploit
      counters: v.array(                 // Required - Nested counter-arguments
        v.object({
          id: v.string(),
          judoMove: v.optional(v.string()),
          label: v.string(),
          text: v.string(),
          deliveryNote: v.optional(v.string()),
        }),
      ),
    }),
  ),
)
```

#### Part 1: Add InlineEdit Wrapper to Opponent Intelligence

**File Modified**: [src/components/prep/StudyModeDebate.tsx:501-685](src/components/prep/StudyModeDebate.tsx#L501-L685)

**Changed**: Wrapped existing `<Card>` elements in `<InlineEdit>` component

**Pattern Used**: Identical to argument frames, zingers, and other prep fields

```tsx
{opponent.opponentIntel?.map((intel: any) => (
  <InlineEdit
    key={intel.id}
    isEditing={editingId === intel.id}
    onEdit={() => setEditingId(intel.id)}
    onDelete={() => handleDelete("opponentIntel", intel.id)}
    onSave={(data) =>
      handleEdit("opponentIntel", intel.id, {
        ...data,
        counters: intel.counters, // Preserve nested counters
      })
    }
    onCancel={() => setEditingId(null)}
    initialData={intel}
    formFields={[...]}
  >
    <Card className="border-red-500/20 bg-red-500/5">
      {/* Existing card display */}
    </Card>
  </InlineEdit>
))}
```

**Key Decision**: Preserve `counters` array unchanged during save
- **Rationale**: Counters are nested objects with their own structure. Editing them inline within the intel edit form would be overly complex
- **Pattern**: Same approach as `evidenceIds` in argument frames (line 261)
- **Future Enhancement**: Could add separate UI for editing individual counters if needed

#### Part 2: Create Form Fields

**Form Fields Added** (lines 527-561):
1. **argument** (textarea, 2 rows, required)
   - Label: "Opponent's Predicted Argument"
   - The core prediction of what opponent will argue

2. **likelihood** (select, required)
   - Options: "High", "Medium", "Low"
   - Helps prioritize preparation

3. **evidence** (textarea, 2 rows, required)
   - Label: "Their Supporting Evidence"
   - What evidence opponent will cite

4. **weakness** (textarea, 2 rows, required)
   - Label: "Weakness in Their Argument"
   - The vulnerability to exploit in response

5. **rhetoricalStyle** (text, optional)
   - Label: "Rhetorical Style (optional)"
   - e.g., "Appeal to emotion", "False dichotomy"

**Why These Fields**: Match the schema exactly, excluding:
- `id` — Auto-generated
- `counters` — Preserved during save, not directly editable

#### Part 3: Add New Intel Functionality

**Implementation** (lines 623-677):

```tsx
{addingType === "opponentIntel" && (
  <InlineEdit
    isEditing={false}
    isAdding={true}
    onEdit={() => {}}
    onSave={(data) =>
      handleAdd("opponentIntel", {
        ...data,
        counters: [], // New intel starts with empty counters
      })
    }
    onCancel={() => setAddingType(null)}
    formFields={[...]} // Same fields with placeholders
  >
    <div />
  </InlineEdit>
)}
{addingType !== "opponentIntel" && (
  <AddButton
    onClick={() => setAddingType("opponentIntel")}
    label="Add Opponent Intelligence"
  />
)}
```

**Placeholders Added** for better UX:
- "What argument will your opponent likely make?"
- "What evidence will they use to support this?"
- "What's the weak spot in this argument?"
- "e.g., Appeal to emotion, False dichotomy"

**Key Decision**: New intel items start with `counters: []`
- **Rationale**: Counters are typically AI-generated during prep generation. Manual addition of intel is an edge case, and manually creating counters would be tedious
- **User Workflow**: Users can add intel manually, then potentially regenerate prep to get AI-generated counters (future enhancement)

#### Part 4: Type System Update

**File Modified**: [src/components/prep/StudyModeDebate.tsx:21-27](src/components/prep/StudyModeDebate.tsx#L21-L27)

**Changed**: Added `"opponentIntel"` to `OpponentField` union type

```typescript
type OpponentField =
  | "receipts"
  | "openingOptions"
  | "argumentFrames"
  | "zingers"
  | "closingOptions"
  | "opponentIntel";  // Added
```

**Impact**: Enables TypeScript type safety for all handler functions

#### Part 5: Bug Fix - Placeholder Support

**File Modified**: [src/ui/inline-edit.tsx](src/ui/inline-edit.tsx)

**Problem Found**: Placeholders were already being used in StudyModeDebate.tsx (from R-5.2) but weren't typed in the InlineEdit interface, causing TypeScript errors

**Fix Applied**:
1. Added `placeholder?: string` to formFields interface (line 23)
2. Wired placeholder to Input component (line 84)
3. Wired placeholder to Textarea component (line 94)

```typescript
// Interface update
formFields: {
  name: string;
  label: string;
  type: "text" | "textarea" | "select";
  options?: string[];
  required?: boolean;
  rows?: number;
  placeholder?: string;  // Added
}[];

// Component update
<Input
  id={field.name}
  value={formData[field.name] || ""}
  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
  className="text-sm"
  placeholder={field.placeholder}  // Added
/>
```

**Impact**: Fixed 7 pre-existing TypeScript errors from R-5.2 deployment examples implementation

---

### Files Modified Summary

1. **src/components/prep/StudyModeDebate.tsx** — Added InlineEdit wrapper, form fields, Add button, type update (~140 lines)
2. **src/ui/inline-edit.tsx** — Added placeholder support to interface and components (~5 lines)

**Total Changes**: 2 files, ~145 lines of code

---

### Key Decisions

1. **Follow Existing Patterns**: Used identical pattern as other prep fields (argument frames, receipts, zingers)
   - **Why**: Code consistency, reduces cognitive load, proven UX pattern
   - **Result**: Implementation was straightforward with no new patterns to invent

2. **Preserve Nested Counters During Edit**: Don't allow inline editing of counters array
   - **Why**: Counters are complex nested objects; editing them would require nested forms
   - **Alternative Considered**: Separate counter editing UI (deferred to future enhancement)
   - **Result**: Simple, clean edit form focused on intel prediction fields

3. **Empty Counters for New Intel**: New manually-added intel starts with `counters: []`
   - **Why**: AI typically generates counters during prep; manual counter creation is edge case
   - **User Impact**: Users can add intel predictions, but won't have counters until regeneration (acceptable trade-off)

4. **Fix Placeholder Bug Properly**: Added placeholder to InlineEdit interface rather than removing placeholders
   - **Why**: Placeholders improve UX with helpful hints
   - **Alternative Considered**: Remove all placeholders to avoid type errors (rejected - worse UX)
   - **Result**: Fixed 7 pre-existing TypeScript errors from R-5.2

5. **No Backend Changes Needed**: Reused existing mutations
   - **Why**: All infrastructure already existed (addOpponentFieldItem, updateOpponentFieldItem, deleteOpponentFieldItem)
   - **Result**: Pure UI implementation, no schema changes, no migration needed

---

### TypeScript Results

**Before Implementation**:
- 14 pre-existing errors (marketing pages, routes, etc.)
- 7 placeholder-related errors (from R-5.2)
- **Total**: 21 errors

**After Implementation**:
- 14 pre-existing errors (unchanged, unrelated to our work)
- 0 placeholder errors (fixed by adding placeholder to InlineEdit interface)
- 0 new errors from our changes
- **Total**: 14 errors

**Summary**:
- ✅ New Errors Introduced: 0
- ✅ Pre-existing Errors Fixed: 7 (all placeholder-related)
- ✅ Net Improvement: -7 errors

---

### Testing Checklist

**Manual Testing Required** (User to verify):
- [ ] Create opponent with AI-generated opponent intelligence
- [ ] Click edit icon (pencil) on an intel card
- [ ] Modify fields (argument, likelihood, evidence, weakness, rhetoricalStyle)
- [ ] Click Save and verify changes persist
- [ ] Verify counters are preserved after save (not lost)
- [ ] Click delete icon (trash) on an intel card
- [ ] Verify intel removed from list
- [ ] Verify selectedCounterIds cleaned up after delete (backend logic)
- [ ] Click "Add Opponent Intelligence" button
- [ ] Fill form with new intel data
- [ ] Verify new intel appears in list
- [ ] Verify new intel has empty counters array
- [ ] Test dark mode (edit form styling)
- [ ] Verify placeholder hints appear in form fields
- [ ] Test cancel button (changes discarded)
- [ ] Test validation (required fields)

**Edge Cases to Test**:
- [ ] Edit intel with no counters (shouldn't crash)
- [ ] Edit intel with many counters (should preserve all)
- [ ] Add intel with minimal data (only required fields)
- [ ] Delete last remaining intel item

---

### Patterns Established

**Opponent Intelligence Editing Pattern**:
1. User clicks edit icon on intel card
2. Card replaced with inline edit form
3. User modifies parent-level fields (argument, likelihood, evidence, weakness, rhetoricalStyle)
4. Nested counters array preserved unchanged
5. User saves → mutation called with updated data + original counters
6. Convex reactivity updates UI automatically
7. Edit mode exits, card returns to display mode

**Add New Intel Pattern**:
1. User clicks "Add Opponent Intelligence" button
2. Add button replaced with inline edit form
3. User fills required fields (argument, likelihood, evidence, weakness)
4. User saves → mutation called with data + `counters: []`
5. New intel added to array with unique ID
6. Form resets, add button returns

**Pattern Consistency**:
- ✅ Same InlineEdit component used for all prep fields
- ✅ Same edit/delete icon buttons
- ✅ Same AddButton component
- ✅ Same form validation (required fields)
- ✅ Same state management (editingId, addingType)
- ✅ Same handlers (handleEdit, handleDelete, handleAdd)

---

### Success Criteria Met

✅ **Backend Verification**: All mutations already supported opponentIntel (no changes needed)
✅ **UI Implementation**: InlineEdit wrappers added with full form fields
✅ **Add Functionality**: "Add Opponent Intelligence" button and form implemented
✅ **Type Safety**: OpponentField type updated, no new TypeScript errors
✅ **Bug Fix Bonus**: Fixed 7 pre-existing placeholder-related errors from R-5.2
✅ **Pattern Consistency**: Matches other prep fields exactly
✅ **Ready for Testing**: All CRUD operations implemented and ready for user verification

---

### Future Enhancements (Not in Scope)

**Counter Editing UI** (Deferred):
- Nested InlineEdit for individual counters within intel items
- Ability to add/edit/delete counters manually
- Form fields: label, text, judoMove, deliveryNote
- **Complexity**: Would require nested edit state management
- **Priority**: Low (AI generates counters during prep)

**Bulk Operations**:
- Select multiple intel items for deletion
- Duplicate intel item to create variations
- **Priority**: Low (not frequently requested)

**AI-Assisted Intel Creation**:
- "Generate Counter" button to create AI counters for manually-added intel
- Use existing prep generation prompts focused on single intel item
- **Priority**: Medium (would complete the manual workflow)

---

**Status**: [R-5.3.1] ✅ COMPLETE, [R-5.3.2] ✅ COMPLETE

---


---

## Chapter 21: Strategic Brief Document — 7-Minute Game Plan Synthesis

**Date**: December 31, 2025

**Goal**: Generate a 7-minute strategic orientation document that synthesizes all prep materials into a coherent narrative game plan, showing how everything connects as a system.

**Roadmap Reference**: [R-5.4] Strategic Brief Document

---

### Context & Problem

**Before**:
- Users had all the tactical pieces: openings, argument frames, receipts, zingers, closings, opponent intel
- No synthesis showing HOW these pieces work together as a strategic system
- Users had to mentally connect the dots between abstract Hasan principles and their specific materials
- Gap between "here are your materials" and "here's your game plan"

**After**:
- 7-minute Strategic Brief document generated after all prep materials
- Narrative format explaining the battlefield, strategic architecture, Hasan principles in context, and deployment flow
- Shows connections between materials (e.g., "Opening #2 sets up Frame #1 which is strengthened by Receipt #4")
- Applies Hasan methodology to THEIR specific debate, not generic advice
- Displayed in dedicated tab with reading time estimate

---

### Implementation

#### Part 1: Schema Changes

**New Fields in opponents table** ([convex/schema.ts:331-340](convex/schema.ts#L331-L340)):

```typescript
// STRATEGIC BRIEF (7-minute orientation document)
strategicBrief: v.optional(v.string()),
strategicBriefMetadata: v.optional(
  v.object({
    generatedAt: v.number(),
    wordCount: v.number(),
    readingTimeMinutes: v.number(),
  }),
)
```

**Why Optional**: Non-breaking change, works with existing opponents, only new prep generations get the brief

**Metadata Purpose**:
- `generatedAt` — Timestamp for display ("Generated on Dec 31, 2025...")
- `wordCount` — Total words in markdown document
- `readingTimeMinutes` — Calculated at 200 words per minute (standard reading speed)

---

#### Part 2: Generation Logic

**New Action** ([convex/actions/prepGeneration.ts:415-500](convex/actions/prepGeneration.ts#L415-L500)):

```typescript
export const generateStrategicBrief = internalAction({
  args: {
    opponentId: v.id("opponents"),
    userId: v.id("users"),
    topic: v.string(),
    position: v.string(),
    strategicBrief: v.string(), // Original strategic brief (opponent context)
    prepMaterials: v.object({
      openingOptions: v.array(v.any()),
      argumentFrames: v.array(v.any()),
      receipts: v.array(v.any()),
      zingers: v.array(v.any()),
      closingOptions: v.array(v.any()),
      opponentIntel: v.array(v.any()),
    }),
    researchContext: v.optional(v.string()),
    opponentStyle: v.string(),
  },
  returns: v.string(), // Markdown string
  handler: async (ctx, args) => { ... }
})
```

**Key Design Decisions**:

1. **Separate Action (Not Part of Main Generation)**:
   - Strategic Brief is final synthesis AFTER all materials are generated
   - Non-blocking: If it fails, prep generation still succeeds
   - Allows future regeneration without re-running entire prep

2. **Input Serialization**:
   - Converts all prep materials into structured summary format
   - Groups receipts by category
   - Shows counts and previews for each material type
   - Provides enough context for synthesis without overwhelming the prompt

3. **Model Selection**: `google/gemini-3-flash-preview` via OpenRouter
   - **Why Gemini**: Excellent at synthesis and narrative generation
   - **Why Flash**: Fast, cheap ($0.075/1M input tokens), good enough for this task
   - **Alternative Considered**: GPT-4o (more expensive, overkill for synthesis)
   - **Cost**: ~$0.01-0.02 per brief (1500-2000 word output)

4. **Output Format**: Raw markdown (not JSON)
   - `jsonMode: false` in callOpenRouterForPrep
   - AI generates markdown directly for display
   - No parsing needed, just store and render

**Integration in Main Prep Flow** ([convex/actions/prep.ts:312-375](convex/actions/prep.ts#L312-L375)):

```typescript
// Generate Strategic Brief as final synthesis (non-blocking)
let strategicBriefMarkdown: string | undefined;
let strategicBriefMetadata: { ... } | undefined;

try {
  await updateProgress("generating_strategic_brief");
  strategicBriefMarkdown = await ctx.runAction(
    internal.actions.prepGeneration.generateStrategicBrief,
    { ... }
  );

  const wordCount = strategicBriefMarkdown.split(/\s+/).length;
  const readingTimeMinutes = Math.round(wordCount / 200);

  strategicBriefMetadata = {
    generatedAt: Date.now(),
    wordCount,
    readingTimeMinutes,
  };
} catch (error) {
  console.error("[generateStrategy] Strategic Brief generation failed (non-fatal):", error);
  // Continue without Strategic Brief - don't fail whole prep
}

// Store with other prep materials
await ctx.runMutation(internal.opponents.updateStrategy, {
  opponentId: args.opponentId,
  strategy,
  researchSynthesis: researchSynthesis ? { ... } : undefined,
  strategicBrief: strategicBriefMarkdown,
  strategicBriefMetadata: strategicBriefMetadata,
});
```

**Key Pattern**: Non-fatal generation
- Wrapped in try/catch
- Failure logged but doesn't throw
- Prep generation succeeds even if Strategic Brief fails
- **Rationale**: Better to have prep materials without brief than to fail entire generation

---

#### Part 3: Prompt Engineering

**The Strategic Brief Prompt** ([convex/lib/promptTemplates.ts:981-1150](convex/lib/promptTemplates.ts#L981-L1150)):

**Structure**: 4-section narrative document

1. **The Battlefield (2 min read)**:
   - Core clash beneath the surface topic
   - Values/principles in tension
   - Where debate will be won or lost
   - Terrain analysis: Your high ground, their high ground, contested territory

2. **Your Strategic Architecture (2 min read)**:
   - How prep materials connect as a system
   - Opening strategy (which audiences, which hooks, how it sets up the rest)
   - Core argument frames as a SYSTEM (moral/practical/economic deployment)
   - Evidence arsenal (which receipts support which frames, deployment strategy)
   - Closing strategy (emotional goals, how to choose in the moment)

3. **Hasan Principles at Work (1.5 min read)**:
   - 3-4 most relevant principles for THIS debate
   - For each: Why it matters HERE, when to use (specific triggers), example from THEIR prep
   - Applied methodology, not abstract theory

4. **Deployment Flow (1.5 min read)**:
   - Timeline: First 2 minutes (opening), middle game (argument/rebuttal), final 2 minutes (closing)
   - Specific instructions tied to their materials
   - Conditional logic: "If opponent claims X, deploy Y"

**Critical Requirements in Prompt**:

1. **Specificity Over Generality**:
   ```
   Bad: "Use emotional appeals to connect with your audience"
   Good: "Your Receipt #3 (the statistic about 40% of families) pairs perfectly 
         with your Personal Story opening because both emphasize human cost"
   ```

2. **Narrative Over Lists**:
   ```
   Bad: "You have 6 argument frames. Here they are: 1, 2, 3..."
   Good: "Your argument frames form a three-pronged attack: moral frames 
         establish the stakes, practical frames prove it's achievable..."
   ```

3. **Show Connections**:
   - "Your Opening #2 (provocative question) sets up Frame #1 (moral argument) which is strengthened by Receipt #4 (the quote) and closed by Closing #1 (call to action)"

4. **Apply Hasan Principles in Context**:
   - Don't just name techniques, show how they apply to THEIR materials
   - Reference specific prep items by number/type

5. **Target Length**: 1500-2000 words (~7 minute read at 200 WPM)

**Quality Check Criteria** (in prompt):
- [ ] Every section references specific materials they have (not hypotheticals)
- [ ] Connections between materials are explicitly explained
- [ ] Hasan principles are applied to THEIR context, not explained generally
- [ ] The strategic narrative is clear: "Here's the terrain, here's your arsenal, here's how to deploy it"
- [ ] Word count is 1500-2000 words
- [ ] Tone is straightforward and narrative (not listy or generic)

**Prompt Variables**:
- `{strategicBrief}` — Original strategic brief (opponent context from Ch.7)
- `{prepMaterials}` — Serialized summary of all generated materials
- `{researchContext}` — Research synthesis insights (if available)
- `{topic}` — Debate topic
- `{position}` — PRO or CON
- `{style}` — Opponent style (aggressive, academic, etc.)

---

#### Part 4: UI Integration

**New Tab Component** ([src/components/prep/StrategicBriefTab.tsx](src/components/prep/StrategicBriefTab.tsx)):

**Props**:
```typescript
interface StrategicBriefTabProps {
  strategicBrief: string | undefined;
  strategicBriefMetadata: {
    generatedAt: number;
    wordCount: number;
    readingTimeMinutes: number;
  } | undefined;
}
```

**Display Logic**:
1. **If strategicBrief exists**:
   - Header with Target icon + "Strategic Brief" title
   - Reading time badge (e.g., "~7 min read")
   - ReactMarkdown rendering with custom styling
   - Footer with generation timestamp and word count

2. **If strategicBrief is undefined**:
   - Empty state with Target icon (opacity 30%)
   - "Strategic Brief Not Yet Ready" message
   - Explanation: "Generate your prep materials to receive a strategic orientation document"

**Markdown Styling** (custom ReactMarkdown components):
- H1: 4xl font, bold, large margins, tight tracking
- H2: 2xl font, bold, border-bottom, pb-2 (section headers)
- H3: xl font, semibold (subsection headers)
- P: leading-8, mb-5 (readable paragraphs)
- UL/LI: space-y-3, custom bullet styling
- Strong: semibold, darker color
- HR: gradient horizontal rule (decorative section breaks)

**Integration in Prep Page** ([src/routes/_app/_auth/dashboard/prep.tsx](src/routes/_app/_auth/dashboard/prep.tsx)):

**Tab Added** (debate scenarios only):
```tsx
{isDebatePrep && (
  <TabsTrigger value="brief" className="flex items-center gap-2">
    <Target className="h-4 w-4" />
    Strategic Brief
  </TabsTrigger>
)}
```

**Tab Content**:
```tsx
{isDebatePrep && (
  <TabsContent value="brief" className="space-y-4 pb-10">
    <StrategicBriefTab
      strategicBrief={opponent.strategicBrief}
      strategicBriefMetadata={opponent.strategicBriefMetadata}
    />
  </TabsContent>
)}
```

**Tab Order** (left to right):
1. Study Mode (default)
2. Deep Research (if available)
3. **Strategic Brief** (new)
4. Gemini Report (if available)
5. Research Data
6. My Research
7. Chat

**Why This Position**: After Deep Research, before detailed tabs. Users can read research → read strategic synthesis → dive into tactical study mode.

---

#### Part 5: Progress Tracking

**New Progress Phase** ([convex/prepProgress.ts](convex/prepProgress.ts)):

Added `"generating_strategic_brief"` to progress status union:
```typescript
status: v.union(
  v.literal("idle"),
  v.literal("researching"),
  v.literal("extracting"),
  v.literal("generating_openings"),
  v.literal("generating_frames"),
  v.literal("generating_receipts"),
  v.literal("generating_zingers"),
  v.literal("generating_closings"),
  v.literal("generating_intel"),
  v.literal("generating_strategic_brief"), // Added
  v.literal("storing"),
  v.literal("complete"),
  v.literal("error"),
)
```

**User-Facing Message** (in prep page):
- Status: "Generating strategic brief..."
- Appears after all other generation phases
- Final step before "storing"

---

### Files Modified Summary

1. **convex/schema.ts** — Added `strategicBrief` and `strategicBriefMetadata` fields (~10 lines)
2. **convex/actions/prepGeneration.ts** — Added `generateStrategicBrief` action (~85 lines)
3. **convex/lib/promptTemplates.ts** — Added `STRATEGIC_BRIEF_PROMPT` (~170 lines)
4. **convex/actions/prep.ts** — Integrated Strategic Brief generation (~30 lines)
5. **convex/opponents.ts** — Updated `updateStrategy` mutation to accept new fields (~5 lines)
6. **convex/prepProgress.ts** — Added progress status (~1 line)
7. **src/components/prep/StrategicBriefTab.tsx** — Created new component (~130 lines)
8. **src/routes/_app/_auth/dashboard/prep.tsx** — Added tab integration (~15 lines)

**Total Changes**: 8 files, ~446 lines of code

---

### Key Decisions

1. **Synthesis Over Summary**:
   - **Decision**: Generate narrative synthesis showing connections, not just summarizing materials
   - **Why**: Users need to understand HOW pieces work together, not just WHAT they have
   - **Alternative Considered**: Simple bullet-point summary (rejected - no strategic value)

2. **Non-Blocking Generation**:
   - **Decision**: Strategic Brief failure doesn't fail entire prep generation
   - **Why**: Better to have prep materials without brief than to fail everything
   - **Pattern**: Try/catch with error logging, continue on failure

3. **Gemini Flash for Synthesis**:
   - **Decision**: Use `google/gemini-3-flash-preview` instead of GPT-4o
   - **Why**: Gemini excels at synthesis, Flash is fast and cheap (~$0.01-0.02 per brief)
   - **Cost Comparison**: GPT-4o would be ~$0.10-0.15 per brief (10x more expensive)

4. **Markdown Output (Not JSON)**:
   - **Decision**: AI generates markdown directly, no JSON parsing
   - **Why**: Simpler, fewer failure points, natural format for narrative content
   - **Alternative Considered**: JSON with structured sections (rejected - adds complexity)

5. **7-Minute Target Length**:
   - **Decision**: 1500-2000 words (~7 minutes at 200 WPM)
   - **Why**: Long enough for comprehensive synthesis, short enough to read before debate
   - **Research**: 200 WPM is standard reading speed for complex material

6. **4-Section Structure**:
   - **Decision**: Battlefield → Architecture → Principles → Deployment
   - **Why**: Mirrors strategic thinking: understand context → see your tools → learn methodology → execute plan
   - **Pattern**: From abstract (what's at stake) to concrete (what to say when)

7. **Debate-Only Feature**:
   - **Decision**: Strategic Brief only for debate scenarios, not generic scenarios
   - **Why**: Hasan principles and strategic synthesis are debate-specific
   - **Future**: Could adapt for other scenarios with different frameworks

8. **Tab Placement**:
   - **Decision**: After Deep Research, before detailed tabs
   - **Why**: Natural flow: research → synthesis → tactics
   - **User Journey**: Read research → understand strategy → study materials → practice in chat

---

### Patterns Established

**Strategic Brief Generation Pattern**:
1. User triggers prep generation
2. All tactical materials generated first (openings, frames, receipts, zingers, closings, intel)
3. Materials serialized into structured summary
4. Strategic Brief prompt built with context + materials + research
5. Gemini Flash generates narrative markdown synthesis
6. Word count calculated, reading time estimated
7. Brief + metadata stored in opponent record
8. UI displays in dedicated tab with reading time badge

**Synthesis Prompt Pattern**:
- Provide full context (strategic brief, prep materials, research)
- Define clear structure (4 sections with specific purposes)
- Emphasize specificity over generality
- Require connections between materials
- Apply methodology to THEIR context
- Include quality check criteria in prompt
- Target specific length (1500-2000 words)

**Non-Fatal Generation Pattern**:
- Wrap generation in try/catch
- Log errors but don't throw
- Continue with undefined value
- UI handles gracefully with empty state
- **Use When**: Feature is valuable but not critical to core functionality

---

### Success Criteria Met

✅ **Schema**: Optional fields added without breaking changes
✅ **Generation**: Strategic Brief action implemented with proper serialization
✅ **Prompt**: Comprehensive 4-section structure with quality criteria
✅ **Model**: Gemini Flash selected for cost-effective synthesis
✅ **UI**: Dedicated tab with markdown rendering and metadata display
✅ **Progress**: New phase added to progress tracking
✅ **Error Handling**: Non-fatal generation with graceful degradation
✅ **Integration**: Wired into main prep flow after all materials generated
✅ **Ready for Testing**: All components implemented and ready for user verification

---

### Testing Checklist

**Manual Testing Required** (User to verify):
- [ ] Create new opponent (debate scenario)
- [ ] Trigger prep generation
- [ ] Verify "Generating strategic brief..." progress message appears
- [ ] Wait for generation to complete
- [ ] Navigate to "Strategic Brief" tab
- [ ] Verify markdown renders correctly (headings, paragraphs, lists, bold, hr)
- [ ] Verify reading time badge displays (e.g., "~7 min read")
- [ ] Verify footer shows generation timestamp and word count
- [ ] Check content quality:
  - [ ] References specific prep materials by number/type
  - [ ] Shows connections between materials
  - [ ] Applies Hasan principles to THEIR debate context
  - [ ] Narrative style (not listy)
  - [ ] 4 sections present (Battlefield, Architecture, Principles, Deployment)
  - [ ] Length is 1500-2000 words
- [ ] Test dark mode (markdown styling)
- [ ] Test with opponent that has no research (should still generate)
- [ ] Test with opponent that has minimal context (should adapt)
- [ ] Verify empty state shows if brief not generated

**Edge Cases to Test**:
- [ ] Strategic Brief generation fails (should show empty state, prep still succeeds)
- [ ] Very short prep materials (should generate shorter but complete brief)
- [ ] Very long prep materials (should synthesize, not just list)
- [ ] Opponent with no research context (should work with just prep materials)

---

### Future Enhancements (Not in Scope)

**Regeneration**:
- "Regenerate Strategic Brief" button
- Useful if user edits prep materials and wants updated synthesis
- **Complexity**: Need to track if materials changed since last generation
- **Priority**: Medium (nice-to-have)

**Export/Print**:
- PDF export of Strategic Brief
- Print-friendly styling
- **Use Case**: Users want to print and bring to debate
- **Priority**: Low (can use browser print for now)

**Customization**:
- User preferences for brief length (5 min vs 10 min)
- Section emphasis (more on principles vs deployment)
- **Complexity**: Would require prompt variations
- **Priority**: Low (current format works for most users)

**Multi-Language**:
- Generate Strategic Brief in user's language
- **Complexity**: Need language detection and translation
- **Priority**: Low (English-first product)

**Strategic Brief for Non-Debate Scenarios**:
- Adapt synthesis pattern for sales, entrepreneur, etc.
- Different frameworks (not Hasan principles)
- **Complexity**: Need scenario-specific synthesis prompts
- **Priority**: Medium (would increase value of other scenarios)

---

### Cost Analysis

**Per Strategic Brief**:
- Input: ~3,000-5,000 tokens (context + materials summary)
- Output: ~2,000-2,500 tokens (1500-2000 words)
- Model: `google/gemini-3-flash-preview`
- Cost: $0.075/1M input, $0.30/1M output
- **Total**: ~$0.01-0.02 per brief

**Comparison to Alternatives**:
- GPT-4o: ~$0.10-0.15 per brief (10x more expensive)
- Claude Sonnet 4: ~$0.05-0.08 per brief (5x more expensive)
- Gemini Pro: ~$0.03-0.05 per brief (3x more expensive)

**Decision Validation**: Gemini Flash is the right choice for this task. Quality is sufficient for synthesis, cost is minimal.

---

### Documentation Updates

**Roadmap**:
- [R-5.4] marked as ✅ COMPLETE
- All 4 tasks checked off
- Phase 5 marked as ✅ COMPLETE
- Chapter 21 referenced

**Project Map** (needs update):
- Add `strategicBrief` and `strategicBriefMetadata` to opponents table documentation
- Add `StrategicBriefTab.tsx` to components list
- Add `generateStrategicBrief` to actions list
- Add `STRATEGIC_BRIEF_PROMPT` to prompt templates list

**Dev Journal**:
- Chapter 21 added with full implementation details
- Patterns documented for future reference
- Cost analysis included

---

### Lessons Learned

1. **Synthesis is Harder Than Generation**:
   - Generating individual materials is straightforward (follow template)
   - Synthesizing materials into coherent narrative requires understanding connections
   - Prompt must explicitly teach AI to look for connections, not just summarize

2. **Specificity Requires Examples**:
   - Telling AI "be specific" doesn't work
   - Must show bad vs good examples in prompt
   - Quality check criteria helps AI self-evaluate

3. **Non-Fatal Generation is User-Friendly**:
   - Users prefer partial success over total failure
   - Strategic Brief is valuable but not critical
   - Graceful degradation improves UX

4. **Markdown is Natural for Narrative**:
   - JSON adds unnecessary structure for narrative content
   - Markdown is easier for AI to generate naturally
   - Fewer parsing errors, simpler code

5. **Reading Time is Valuable UX**:
   - Users want to know time commitment upfront
   - 200 WPM is standard for complex material
   - Simple calculation: wordCount / 200

6. **Gemini Flash is Underrated**:
   - Often overlooked in favor of GPT-4o or Claude
   - Excellent at synthesis tasks
   - 10x cheaper than alternatives
   - Fast response times

---

**Status**: [R-5.4] ✅ COMPLETE

**Phase 5 Status**: ✅ COMPLETE (all 4 roadmap items done)

---


---

## Chapter 22: Deep Research as Optional Upgrade — UX Refactor & Billing Integration

**Date**: December 31, 2025

**Goal**: Transform Deep Research from a fork-in-the-road choice to an optional premium upgrade. Remove the "Fast Research vs Deep Research" decision at opponent creation, make Firecrawl the default path, and add Deep Research as a paid impulse buy available after prep generation.

**Roadmap Reference**: New feature (not on roadmap)

---

### Context & Problem

**Before**:
- User creates opponent → chooses "Fast Research" OR "Deep Research"
- Mutually exclusive paths
- Deep Research blocks fast iteration (20 minutes before seeing any prep)
- No way to upgrade existing prep with Deep Research
- No monetization for Deep Research

**After**:
- User creates opponent → Firecrawl always runs (fast, default)
- User gets prep materials immediately
- Deep Research becomes optional upgrade button in "Deep Research Report" tab
- Modal offers two modes: "Report Only" (keep prep) or "Replace Prep" (new materials)
- Requires tokens (~$2.70 per run, sold at $4/$10/$30 packs)
- Subscribers do NOT get unlimited Deep Research

---

### Implementation

#### Part 1: Backend - Mode Parameter & Token Consumption

**File Modified**: `convex/actions/geminiPrep.ts`

**Added mode parameter:**
```typescript
args: {
  opponentId: v.id("opponents"),
  topic: v.string(),
  position: v.string(),
  mode: v.optional(
    v.union(v.literal("report-only"), v.literal("full-replace"))
  ), // Default to full-replace for backward compatibility
}
```

**Token Access Check** (before running):
```typescript
const access = await ctx.runQuery(internal.tokens.INTERNAL_checkAccess, {
  userId: opponent.userId,
  scenarioId: "deep-research",
});

if (!access.hasAccess) {
  throw new Error("Insufficient Deep Research tokens. Purchase tokens to continue.");
}
```

**Conditional Prep Generation** (based on mode):
```typescript
if (mode === "full-replace") {
  // Generate all prep materials (openings, frames, receipts, zingers, closings, intel)
  strategy = await Promise.all([...]);
} else {
  console.log("[Gemini Strategy] Skipping prep generation (report-only mode)");
}
```

**Token Consumption** (after successful completion):
```typescript
await ctx.runMutation(internal.tokens.INTERNAL_consumeToken, {
  userId: opponent.userId,
  scenarioId: "deep-research",
  debateId: args.opponentId as any, // Using opponentId as reference
});
```

**Cost Tracking**:
```typescript
await ctx.runMutation(internal.costs.INTERNAL_recordApiCost, {
  service: "gemini",
  cost: 270, // $2.70 in cents
  opponentId: args.opponentId,
  userId: opponent.userId,
  phase: "prep",
  details: { sessions: 1 },
});
```

**File Modified**: `convex/lib/monetization.ts`

**Added Deep Research constants:**
```typescript
export const DEEP_RESEARCH_SCENARIO_ID = "deep-research";
export const DEEP_RESEARCH_COST_CENTS = 270; // $2.70 per run
```

---

#### Part 2: Frontend - Remove Fork, Add Modal

**File Modified**: `src/routes/_app/_auth/dashboard/prep.tsx`

**Removed fork** (before):
```tsx
{isDebatePrep ? (
  <>
    <button onClick={handleGenerateStrategy}>Fast Research</button>
    <button onClick={generateGemini}>Deep Research</button>
  </>
) : (
  <button onClick={handleGenerateGenericPrep}>Generate Prep Materials</button>
)}
```

**Single button** (after):
```tsx
<button onClick={isDebatePrep ? handleGenerateStrategy : handleGenerateGenericPrep}>
  Generate Prep Materials
</button>
```

**Added Deep Research modal state:**
```typescript
const [showDeepResearchModal, setShowDeepResearchModal] = useState(false);

const deepResearchTokens = useQuery(api.tokens.getBalance, {
  scenarioId: "deep-research",
}) ?? 0;
```

**Added handler:**
```typescript
const handleRunDeepResearch = (mode: "report-only" | "full-replace") => {
  if (opponentId && opponent) {
    generateGemini({
      opponentId: opponentId as Id<"opponents">,
      topic: opponent.topic,
      position: opponent.position,
      mode,
    });
  }
};
```

---

#### Part 3: GeminiReportTab - Elegant Empty State

**File Modified**: `src/components/prep/GeminiReportTab.tsx`

**Added props:**
```typescript
interface GeminiReportTabProps {
  geminiResearchReport: string | undefined;
  geminiResearchMetadata: { ... } | undefined;
  deepResearchTokens: number;
  onRunDeepResearch: () => void;
  isGenerating: boolean;
}
```

**Empty State Design** (when no report):
```tsx
<div className="flex flex-col items-center justify-center min-h-[400px] px-6">
  <div className="max-w-md text-center space-y-6">
    {/* Gradient icon circle */}
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
      <FileSearch className="w-8 h-8 text-primary" />
    </div>

    {/* Marketing copy */}
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-primary">
        Unlock Deep Research
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Gemini's 20-minute autonomous research generates comprehensive
        analysis with verified sources and strategic insights.
      </p>
    </div>

    {/* Cost info */}
    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
      <Clock className="w-4 h-4" />
      <span>~20 minutes</span>
      <span>•</span>
      <span>1 token (~$2.70)</span>
    </div>

    {/* CTA button */}
    <button
      onClick={onRunDeepResearch}
      disabled={isGenerating || deepResearchTokens < 1}
      className="w-full h-11 rounded-lg font-medium text-white bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isGenerating ? "Generating..." : "Run Deep Research"}
    </button>

    {/* Balance display */}
    <p className="text-xs text-muted-foreground">
      Balance: {deepResearchTokens} {deepResearchTokens === 1 ? "token" : "tokens"}
    </p>

    {/* Insufficient tokens warning */}
    {deepResearchTokens < 1 && (
      <p className="text-xs text-destructive">
        Purchase Deep Research tokens to continue
      </p>
    )}
  </div>
</div>
```

**Regenerate Button** (when report exists):
```tsx
<button
  onClick={onRunDeepResearch}
  disabled={isGenerating || deepResearchTokens < 1}
  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-primary border-2 border-primary/20 rounded-lg hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
>
  <RefreshCw className="w-3 h-3" />
  Regenerate
</button>
```

---

#### Part 4: Deep Research Modal - Two-Button Choice

**File Created**: `src/components/prep/DeepResearchModal.tsx`

**Modal Design:**
```tsx
<Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        Deep Research Options
      </DialogTitle>
      <DialogDescription>
        Choose how you want to use Deep Research results
      </DialogDescription>
    </DialogHeader>

    {/* Cost display */}
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
      <span className="text-sm font-medium">Cost</span>
      <span className="text-sm text-muted-foreground">1 token (~$2.70)</span>
    </div>

    {/* Two option buttons */}
    <button onClick={() => onRunDeepResearch("report-only")}>
      <FileText className="w-5 h-5 text-primary" />
      <div>
        <div className="font-medium">Generate Report Only</div>
        <div className="text-sm text-muted-foreground">
          Keep your current prep materials. Add Deep Research report for reference.
        </div>
      </div>
    </button>

    <button onClick={() => onRunDeepResearch("full-replace")}>
      <RefreshCw className="w-5 h-5 text-primary" />
      <div>
        <div className="font-medium">Replace Prep Materials</div>
        <div className="text-sm text-muted-foreground">
          Generate new prep materials based on Deep Research. Your current materials will be replaced.
        </div>
      </div>
    </button>

    {/* Insufficient tokens warning */}
    {deepResearchTokens < 1 && (
      <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
        <AlertCircle className="w-4 h-4 mt-0.5" />
        <span>Insufficient tokens. Purchase Deep Research tokens to continue.</span>
      </div>
    )}
  </DialogContent>
</Dialog>
```

---

#### Part 5: Dialog Component

**File Created**: `src/ui/dialog.tsx`

Simple dialog component following existing UI patterns:
- Backdrop with blur effect
- Click outside to close
- Accessible structure
- Dark mode support

---

#### Part 6: Type Fixes

**File Modified**: `src/components/prep/GenerationProgress.tsx`

**Added missing status:**
```typescript
status:
  | "idle"
  | "complete"
  | "error"
  | "researching"
  | "extracting"
  | "synthesizing"
  | "generating_openings"
  | "generating_frames"
  | "generating_receipts"
  | "generating_zingers"
  | "generating_closings"
  | "generating_intel"
  | "generating_strategic_brief" // Added
  | "storing";
```

---

#### Part 7: Billing Integration Planning

**File Created**: `docs/DEEP_RESEARCH_BILLING_IMPLEMENTATION.md`

Comprehensive handoff document for billing UI implementation:

**Pricing Structure:**
- 1 token = $4 (impulse buy)
- 3 tokens = $10 (save 17%)
- 10 tokens = $30 (save 25%)

**Marketing Copy:**
- Headline: "Stop guessing what arguments will land"
- Subhead: "20-minute autonomous research finds verified sources and strategic angles. Know more than your opponent before you start."
- CTA: "Try once" / "Purchase"

**UI Design:**
- Premium card with gradient border
- Positioned after subscription, before scenario tokens
- Target/crosshair icon (not sparkle/brain)
- Problem-aware copy (not feature-focused)

**Implementation Steps:**
1. Add `DEEP_RESEARCH_TOKEN_PACKS` to monetization.ts
2. Create Stripe products via `setupDeepResearchProducts.ts`
3. Update billing page with Deep Research Purchase Card
4. Update transaction history to show "Deep Research"
5. Test purchase flows

**Key Decision**: Subscribers do NOT get unlimited Deep Research (high cost per use)

---

### Files Modified Summary

**Backend:**
1. `convex/actions/geminiPrep.ts` — Added mode parameter, token check, conditional generation (~50 lines)
2. `convex/lib/monetization.ts` — Added Deep Research constants (~3 lines)

**Frontend:**
3. `src/routes/_app/_auth/dashboard/prep.tsx` — Removed fork, added modal state and handlers (~30 lines)
4. `src/components/prep/GeminiReportTab.tsx` — Added empty state, regenerate button, new props (~80 lines)
5. `src/components/prep/DeepResearchModal.tsx` — Created modal component (~100 lines)
6. `src/ui/dialog.tsx` — Created dialog component (~70 lines)
7. `src/components/prep/GenerationProgress.tsx` — Added missing status type (~1 line)
8. `src/routes/_app/_auth/dashboard/_layout.settings.billing.tsx` — Added Deep Research to token balances (~20 lines)

**Documentation:**
9. `docs/DEEP_RESEARCH_BILLING_IMPLEMENTATION.md` — Complete implementation guide (~400 lines)

**Total Changes**: 9 files, ~754 lines of code

---

### Key Decisions

1. **Firecrawl as Default Path**:
   - **Decision**: Always run Firecrawl, make Deep Research optional
   - **Why**: Fast iteration, immediate results, Deep Research becomes upgrade not blocker
   - **Impact**: Better UX, users can start studying immediately

2. **Two-Mode System**:
   - **Decision**: "Report Only" vs "Full Replace" modes
   - **Why**: Flexibility - users can compare approaches or commit to Deep Research
   - **Pattern**: Modal with two clear option buttons

3. **Token-Based Monetization**:
   - **Decision**: Charge per Deep Research run, even for subscribers
   - **Why**: High cost per use ($2.70), prevents abuse, additional revenue stream
   - **Pricing**: $4 single token (impulse buy), bulk discounts for commitment

4. **Problem-Aware Marketing**:
   - **Decision**: "Stop guessing what arguments will land" headline
   - **Why**: Addresses pain point (uncertainty), outcome-focused, creates urgency
   - **Alternative Rejected**: Feature-focused copy ("20-minute research") - less compelling

5. **Premium Positioning**:
   - **Decision**: Separate card with gradient border, positioned after subscription
   - **Why**: Signals higher value, justifies price, stands out without being garish
   - **Visual**: Target icon (discovery/precision), not sparkle/brain (too playful)

6. **Non-Fatal Token Consumption**:
   - **Decision**: If token consumption fails, user keeps token but gets research
   - **Why**: Better UX than failing entire operation, research already generated
   - **Pattern**: Try/catch with error logging, continue on failure

---

### User Flow

**New User Journey:**
1. Create opponent → Firecrawl runs automatically (2-3 minutes)
2. Get prep materials immediately, start studying
3. See "Deep Research Report" tab (empty state)
4. Click "Run Deep Research" button
5. Modal appears: "Report Only" or "Replace Prep"
6. Choose mode, Deep Research runs (20 minutes)
7. Token consumed, report appears in tab
8. If "Replace Prep" chosen, Study Mode shows new materials

**Purchase Flow:**
1. User has 0 Deep Research tokens
2. Clicks "Run Deep Research" → modal shows "Insufficient tokens"
3. Goes to Billing page
4. Sees Deep Research Purchase Card (premium position)
5. Reads marketing copy: "Stop guessing what arguments will land"
6. Clicks "Try once" ($4 single token)
7. Stripe checkout → purchase → tokens granted
8. Returns to prep page, runs Deep Research

---

### Patterns Established

**Optional Upgrade Pattern**:
- Default path always runs (fast, free/cheap)
- Premium upgrade available after default completes
- Clear value proposition for upgrade
- Token-based monetization for high-cost features

**Two-Mode Modal Pattern**:
- Single trigger button
- Modal presents two clear options
- Each option has icon, title, description
- Cost displayed prominently
- Insufficient balance warning

**Premium Feature Positioning**:
- Separate from standard features
- Marketing-focused copy (problem-aware)
- Visual differentiation (gradient border, larger card)
- Positioned for visibility (after subscription, before standard tokens)

---

### Success Criteria Met

✅ **Backend**: Mode parameter, token consumption, cost tracking implemented
✅ **Frontend**: Fork removed, modal added, empty state designed
✅ **UX**: Fast default path, optional upgrade, clear value proposition
✅ **Monetization**: Token system integrated, pricing defined
✅ **Documentation**: Complete handoff doc for billing UI
✅ **Type Safety**: All TypeScript errors fixed
✅ **Ready for Testing**: All components implemented, ready for user verification

---

### Next Steps (Billing UI Implementation)

**Not Yet Done** (documented in handoff):
1. Create Stripe products for Deep Research tokens
2. Add Deep Research Purchase Card to billing page
3. Update transaction history display
4. Test purchase flows
5. Verify token consumption and balance updates

**Estimated Time**: 2-3 hours

**Handoff Document**: `docs/DEEP_RESEARCH_BILLING_IMPLEMENTATION.md`

---

**Status**: Backend & UX ✅ COMPLETE, Billing UI 📋 DOCUMENTED (ready for implementation)

---

## Chapter 23: Deep Research Billing Integration — Complete Implementation

**Date**: December 31, 2025

**Goal**: Implement the billing UI for Deep Research token purchases, completing the monetization system started in Chapter 22.

**Roadmap Reference**: New feature (monetization extension)

---

### Context

Chapter 22 completed the Deep Research UX refactor (removing the fork, adding modal, making it an optional upgrade). The billing integration was documented in `docs/DEEP_RESEARCH_BILLING_IMPLEMENTATION.md` but not yet implemented. This chapter completes that work.

---

### Implementation

#### Part 1: Backend Constants

**File Modified**: `convex/lib/monetization.ts`

**Added Deep Research Token Packs:**
```typescript
export const DEEP_RESEARCH_TOKEN_PACKS = [
  { tokens: 1, priceUsd: 400, stripePriceId: "price_1SkadrCm9nndApXQ945Of2ZP" },
  { tokens: 3, priceUsd: 1000, stripePriceId: "price_1SkadrCm9nndApXQF82dlVMJ" },
  { tokens: 10, priceUsd: 3000, stripePriceId: "price_1SkadrCm9nndApXQit4dzcBz" },
] as const;
```

**Pricing Strategy**:
- 1 token = $4 (impulse buy, "try once")
- 3 tokens = $10 (save 17%, popular choice)
- 10 tokens = $30 (save 25%, best value)
- Actual cost = $2.70 per run (healthy margin)

---

#### Part 2: Stripe Product Setup

**File Created**: `convex/setupDeepResearchProducts.ts`

**Purpose**: One-time script to create Stripe products and prices

**Key Learning**: Must use `internalAction` (not `internalMutation`) because Stripe SDK uses `setTimeout` internally

**Command**: `npx convex run setupDeepResearchProducts:setupDeepResearchProducts`

**Output**: 3 price IDs copied to `DEEP_RESEARCH_TOKEN_PACKS`

---

#### Part 3: Stripe Checkout Integration

**File Modified**: `convex/stripe.ts`

**Updated `createTokenCheckout` action:**
```typescript
// Select token packs based on scenario
const tokenPacks = scenarioId === "deep-research" 
  ? DEEP_RESEARCH_TOKEN_PACKS 
  : TOKEN_PACKS;

const pack = tokenPacks[packIndex];
```

**Pattern**: Single checkout action handles both scenario tokens and Deep Research tokens by switching pack arrays based on `scenarioId`

---

#### Part 4: Billing Page UI

**File Modified**: `src/routes/_app/_auth/dashboard/_layout.settings.billing.tsx`

**Added Deep Research Purchase Card** (after Subscription Status, before Token Balances):

**Visual Design**:
- Gradient border: `linear-gradient(135deg, #3C4A32, #5C6B4A)` for premium feel
- Target icon (discovery/precision)
- Larger padding (8px more than standard cards)
- Premium positioning signals higher value

**Marketing Copy** (problem-aware approach):
- Headline: "Stop guessing what arguments will land"
- Subheadline: "20-minute autonomous research finds verified sources and strategic angles. Know more than your opponent before you start."
- Focus on outcome (know more than opponent) not features (20-minute research)

**Current Balance Display**:
- Shows Deep Research token count
- Color-coded: green if tokens > 0, gray if 0
- Always visible (even for subscribers)

**Three Pack Options**:
1. **Try Once** - 1 token, $4, no badge
2. **Popular** - 3 tokens, $10, "Popular" badge, "Save 17%"
3. **Best Value** - 10 tokens, $30, "Best Value" badge, "Save 25%"

**Button Behavior**:
- Calls `createTokenCheckout({ scenarioId: "deep-research", packIndex })`
- Loading state prevents double-clicks
- Redirects to Stripe checkout
- Returns to billing page with success/cancel message

---

#### Part 5: Transaction History Update

**File Modified**: `src/routes/_app/_auth/dashboard/_layout.settings.billing.tsx`

**Updated scenarioName mapping:**
```typescript
const scenarioName =
  tx.scenarioId === "deep-research"
    ? "Deep Research"
    : SCENARIOS[tx.scenarioId]?.name ?? tx.scenarioId;
```

**Result**: Transaction history now shows "Deep Research" instead of raw "deep-research" ID

---

#### Part 6: Token Balance Display

**Already Complete** (from Chapter 22):
- Deep Research balance shows at top of Token Balances Grid
- Shows actual token count (not "Unlimited" even for subscribers)
- Consistent with other scenario balances

---

### Files Modified Summary

1. **convex/lib/monetization.ts** — Added `DEEP_RESEARCH_TOKEN_PACKS` with Stripe price IDs (~7 lines)
2. **convex/setupDeepResearchProducts.ts** — Created Stripe product setup script (~50 lines)
3. **convex/stripe.ts** — Updated checkout to handle deep-research scenario (~5 lines)
4. **src/routes/_app/_auth/dashboard/_layout.settings.billing.tsx** — Added Deep Research Purchase Card (~180 lines)
5. **docs/DEEP_RESEARCH_NEXT_STEPS.md** — Created deployment guide (~100 lines)

**Total Changes**: 5 files, ~342 lines of code

---

### Key Decisions

1. **Subscribers Pay Per Use**:
   - **Decision**: Subscribers do NOT get unlimited Deep Research
   - **Why**: High cost per use ($2.70), prevents abuse, additional revenue stream
   - **Impact**: Deep Research positioned as premium upgrade for everyone

2. **Premium Card Positioning**:
   - **Decision**: Separate card after subscription, before token balances
   - **Why**: Signals higher value, needs visibility for impulse buy
   - **Alternative Rejected**: Adding to scenario dropdown (would bury the feature)

3. **$4 Single Token Entry Point**:
   - **Decision**: Lowest pack is 1 token for $4 (not 5 for $10)
   - **Why**: Impulse buy psychology, "try once" is compelling, lower barrier
   - **Margin**: $4 vs $2.70 cost = healthy margin for Stripe fees + value

4. **Problem-Aware Marketing Copy**:
   - **Decision**: "Stop guessing what arguments will land" headline
   - **Why**: Addresses pain point (uncertainty), outcome-focused, creates urgency
   - **Alternative Rejected**: Feature-focused copy ("20-minute research") - less compelling

5. **Gradient Border Visual Treatment**:
   - **Decision**: Subtle gradient border instead of solid color
   - **Why**: Premium feel without being garish, stands out from standard cards
   - **Colors**: Olive gradient matching brand palette

6. **Target Icon Choice**:
   - **Decision**: Target/crosshair icon (not sparkle/brain)
   - **Why**: Represents precision, discovery, hitting the mark
   - **Alternative Rejected**: Sparkle (too playful), Brain (too literal)

---

### User Flow

**Purchase Flow**:
1. User goes to `/dashboard/settings/billing`
2. Sees Deep Research card in premium position
3. Reads marketing copy: "Stop guessing what arguments will land"
4. Checks current balance (e.g., 0 tokens)
5. Clicks "Try once" ($4) button
6. Redirects to Stripe checkout
7. Completes payment
8. Redirects back with success message
9. Balance updates to 1 token
10. Transaction appears in history as "Deep Research"

**Usage Flow**:
1. User goes to prep page
2. Clicks "Deep Research Report" tab
3. Sees empty state with "Run Deep Research" button
4. Clicks button → modal appears
5. Chooses "Report Only" or "Replace Prep"
6. Deep Research runs (~20 minutes)
7. Token consumed (balance decrements)
8. Report appears in tab
9. Transaction logged in history

---

### Patterns Established

**Premium Feature Monetization Pattern**:
- Separate purchase card (not in dropdown)
- Marketing-focused copy (problem-aware)
- Visual differentiation (gradient border, premium icon)
- Premium positioning (after subscription, before standard features)
- Clear value proposition (outcome-focused)
- Impulse buy entry point (single token option)
- Bulk discounts for commitment (3 and 10 token packs)

**Stripe Integration Pattern**:
- Single checkout action handles multiple scenarios
- Switch pack arrays based on `scenarioId`
- Metadata includes scenario and token count
- Success/cancel URLs with query params
- Frontend reads params and shows messages

**Transaction Display Pattern**:
- Map scenario IDs to friendly names
- Special handling for non-scenario features (deep-research)
- Consistent with existing transaction history

---

### Success Criteria Met

✅ **Backend**: Token packs defined, Stripe products created, checkout integrated
✅ **Frontend**: Premium purchase card added, transaction history updated
✅ **UX**: Clear value proposition, impulse buy pricing, premium positioning
✅ **Visual Design**: Gradient border, Target icon, problem-aware copy
✅ **Type Safety**: All TypeScript checks passing
✅ **Deployed**: Stripe products created, price IDs configured, deployed to production

---

### Testing Checklist

**Manual Testing Required** (User to verify):
- [ ] Navigate to `/dashboard/settings/billing`
- [ ] Verify Deep Research card appears after Subscription Status
- [ ] Verify current balance shows correctly (0 tokens initially)
- [ ] Click "Try once" ($4) button
- [ ] Complete Stripe checkout (test mode)
- [ ] Verify redirect back with success message
- [ ] Verify balance increased to 1 token
- [ ] Verify transaction appears in history as "Deep Research"
- [ ] Test 3 token pack ($10)
- [ ] Test 10 token pack ($30)
- [ ] Go to prep page, run Deep Research
- [ ] Verify token consumed after completion
- [ ] Verify transaction logged
- [ ] Test as subscriber (should still show purchase options)
- [ ] Test cancel flow (should redirect back with cancel message)

---

### Cost Analysis

**Per Deep Research Run**:
- User pays: $4 (single token)
- Actual cost: $2.70 (Gemini Deep Research)
- Gross margin: $1.30 (32.5%)
- After Stripe fees (~3%): $1.18 net margin (29.5%)

**Bulk Pricing**:
- 3 tokens: $10 ($3.33 each) = 23% margin after Stripe fees
- 10 tokens: $30 ($3.00 each) = 11% margin after Stripe fees

**Strategy**: Single token has highest margin (impulse buy), bulk packs encourage commitment with lower margins

---

### Documentation Updates

**Completed**:
- ✅ Dev Journal Chapter 23 added
- ✅ Implementation handoff doc created (`DEEP_RESEARCH_BILLING_IMPLEMENTATION.md`)
- ✅ Next steps guide created (`DEEP_RESEARCH_NEXT_STEPS.md`)

**Still Needed**:
- [ ] Update `rules/roadmap.md` - Add Deep Research billing to Phase 4 (Monetization)
- [ ] Update `docs/PROJECT_MAP.md` - Add Deep Research billing to monetization section

---

### Lessons Learned

1. **Stripe SDK Requires Actions**:
   - Stripe SDK uses `setTimeout` internally
   - Must use `internalAction` not `internalMutation`
   - Error message is clear: "Can't use setTimeout in queries and mutations"

2. **Premium Positioning Matters**:
   - Separate card signals higher value than dropdown option
   - Gradient border creates visual distinction without being garish
   - Positioning after subscription reinforces "premium upgrade" mental model

3. **Problem-Aware Copy Converts Better**:
   - "Stop guessing what arguments will land" > "20-minute autonomous research"
   - Focus on outcome (know more than opponent) not features (research duration)
   - Creates urgency without being pushy

4. **Impulse Buy Pricing Works**:
   - $4 single token is low enough to "just try it"
   - Higher margin on single token offsets lower volume
   - Bulk discounts encourage commitment after first purchase

5. **Consistent Patterns Reduce Complexity**:
   - Reusing `createTokenCheckout` for both scenarios and Deep Research
   - Same transaction history display pattern
   - Same loading state management
   - Less code, fewer bugs, easier maintenance

---

**Status**: ✅ COMPLETE (Backend + Frontend + Deployed)

**Next Chapter**: TBD (awaiting user testing and feedback)

---

## Chapter 23.1: Deep Research Card UI Polish — Breathing Room & Visual Hierarchy

**Date**: December 31, 2025

**Goal**: Fix cramped spacing and improve visual hierarchy in the Deep Research purchase card based on user feedback.

**Context**: Chapter 23 implemented the Deep Research billing card, but the initial spacing was too tight. User feedback: "the ui is trash. See how tight it looks."

---

### Problem

The Deep Research card felt cramped and lacked proper visual hierarchy:
- Text elements too close together
- Icon too small for premium positioning
- Pack cards squeezed with minimal padding
- Typography sizes inconsistent
- Overall feeling: cluttered, not premium

---

### Solution: Generous Spacing & Better Hierarchy

**Design Principle**: Premium features need breathing room. Every element should have space to be appreciated.

#### Spacing Improvements

**Header Section**:
- Icon gap: `gap-4` → `gap-5` (20% more breathing room)
- Icon size: `h-12 w-12` → `h-14 w-14` (17% larger presence)
- Icon graphic: `h-6 w-6` → `h-7 w-7` (better proportion)
- Bottom margin: `mb-6` → `mb-8` (33% more space before balance)

**Typography Spacing**:
- Title margin: `mb-2` → `mb-3` (50% more separation)
- Headline margin: `mb-2` → `mb-3` (better rhythm)
- Headline line height: added `leading-relaxed` (easier to read)
- Description size: `text-sm` → `text-base` (more readable)

**Balance Card**:
- Padding: `px-4 py-3` → `px-5 py-4` (25% roomier)
- Bottom margin: `mb-6` → `mb-8` (33% more space)
- Text size: default → `text-base` (consistent sizing)
- Icon gap: `gap-1` → `gap-2` (better proportion)
- Icon size: `h-4 w-4` → `h-5 w-5` (matches text better)

**Pack Grid**:
- Gap between cards: `gap-4` → `gap-5` (25% more separation)
- Card padding: `p-5` → `p-6` (20% more internal space)

**Pack Card Elements**:
- Number size: `text-3xl` → `text-4xl` (33% bolder)
- Number margin: `mb-1` → `mb-2` (better separation)
- Label margin: `mb-3` → `mb-4` (more space)
- Price size: `text-xl` → `text-2xl` (33% more emphasis)
- Price margin: `mb-4` → `mb-6` (better rhythm)
- Save text margin: `mb-3` → `mb-5` (proper spacing before button)
- Badge position: `-top-2` → `-top-2.5` (better alignment)
- Badge padding: `py-0.5` → `py-1` (more substantial)
- Button padding: `py-2` → `py-2.5` (more clickable feel)

---

### Before vs After

**Before** (cramped):
```
Icon: 48px, gap: 16px
Title → Headline: 8px gap
Description: 14px font
Balance card: 16px/12px padding, 24px margin
Pack cards: 20px padding, 16px gap
Numbers: 30px font
Price: 20px font
```

**After** (breathing room):
```
Icon: 56px, gap: 20px
Title → Headline: 12px gap
Description: 16px font
Balance card: 20px/16px padding, 32px margin
Pack cards: 24px padding, 20px gap
Numbers: 36px font
Price: 24px font
```

**Net Result**: ~25-33% more spacing throughout, creating a premium feel

---

### Design Rationale

1. **Premium Positioning Requires Premium Spacing**:
   - Deep Research is the most expensive feature ($4 per use)
   - Cramped spacing signals "cheap" not "premium"
   - Generous spacing signals quality and value

2. **Visual Hierarchy Through Scale**:
   - Larger numbers (4xl) draw eye to token count
   - Larger price (2xl) emphasizes value proposition
   - Larger icon (14x14) creates focal point

3. **Readability First**:
   - Base font size (16px) is easier to read than small (14px)
   - Leading-relaxed on multi-line text improves comprehension
   - More margin between elements reduces cognitive load

4. **Clickability**:
   - Larger buttons (py-2.5 vs py-2) feel more substantial
   - More padding in cards makes entire area feel interactive
   - Better spacing reduces accidental clicks

5. **Consistency**:
   - All text elements now use base or larger sizes
   - All margins follow 4px grid (mb-2, mb-3, mb-4, mb-5, mb-6, mb-8)
   - All gaps use consistent increments (gap-2, gap-5)

---

### Files Modified

1. **src/routes/_app/_auth/dashboard/_layout.settings.billing.tsx** — Updated Deep Research card spacing (~30 changes)

**Total Changes**: 1 file, ~30 spacing/sizing adjustments

---

### Key Lessons

1. **User Feedback is Gold**:
   - "UI is trash" = immediate signal to fix
   - Don't defend cramped design, just fix it
   - Users feel spacing issues even if they can't articulate why

2. **Premium Features Need Premium Design**:
   - $4 per use deserves generous spacing
   - Cramped = cheap, spacious = premium
   - Visual design communicates value

3. **Spacing is Not Wasted Space**:
   - Breathing room improves comprehension
   - White space creates hierarchy
   - Generous margins signal confidence

4. **Incremental Improvements Add Up**:
   - 25-33% more spacing throughout
   - Each small change compounds
   - Result: dramatically better feel

5. **Design Principles Over Pixel Pushing**:
   - "Breathing room" is the principle
   - Specific values (mb-8 vs mb-6) implement the principle
   - Principle guides all decisions

---

### Success Criteria

✅ **Visual Hierarchy**: Clear separation between sections
✅ **Readability**: All text easily scannable
✅ **Premium Feel**: Generous spacing signals quality
✅ **Clickability**: Buttons feel substantial and interactive
✅ **Consistency**: All spacing follows 4px grid system

---

**Status**: ✅ COMPLETE

**User Feedback**: Awaiting confirmation that spacing improvements resolve "trash UI" concern

---
---

## R-6.1: Research-Backed Evidence Display

**Date**: 2026-01-01
**Chapter**: R-6.1
**Phase**: 6.1
**Status**: ✅ COMPLETE

---

### Problem Statement

The `evidenceNeeded` field in argument frames was displaying generic guidance like "Statistics on water access disparities..." instead of citing specific research findings. Users couldn't see which actual research articles supported each frame, making the evidence feel disconnected from the prep materials.

Additionally, the "Available Evidence" section (evidenceIds) was always blank - dead code that served no purpose.

---

### Solution

Updated the ARGUMENT_FRAMES_PROMPT to extract specific findings from research articles and connect them directly to argument frames.

**Changes Made**:

1. **Prompt Engineering** (`convex/lib/promptTemplates.ts`):
   - Added "EVIDENCE SUPPORT FROM RESEARCH" section (lines 151-159)
   - New format: `"[Source Name]: [Specific finding] - [How it supports this frame]"`
   - Example: "WHO 2024 Water Report: 2.2 billion people lack safe water access - Demonstrates the scale of the crisis for moral imperative argument"
   - Updated output schema examples (lines 171, 182, 193) to match new format

2. **UI Cleanup** (`src/components/prep/StudyModeDebate.tsx`):
   - Removed "Available Evidence" section (evidenceIds display - dead code)
   - Changed label from "Types of Evidence That Strengthen This:" to "Supporting Research:"
   - Kept display format as bullet list for easy scanning

---

### Technical Details

**Data Flow**:
```
Research Extraction (prep.ts:140-176)
  ↓
JSON.stringify(research) (prepGeneration.ts:135)
  ↓
Inject into ARGUMENT_FRAMES_PROMPT at {research} placeholder
  ↓
AI extracts specific findings per frame
  ↓
evidenceNeeded: ["Source: Finding - Support", ...]
  ↓
UI displays as "Supporting Research:" bullets
```

**Prompt Instruction**:
```
For "evidenceNeeded", extract 2-3 specific findings from the research articles that support THIS frame:
- Cite the source name
- State the specific finding (stat, fact, conclusion, expert opinion)
- Explain how it supports this specific argument frame
```

---

### Files Modified

1. **convex/lib/promptTemplates.ts** — Updated ARGUMENT_FRAMES_PROMPT with evidence extraction guidance
2. **src/components/prep/StudyModeDebate.tsx** — Removed dead code, updated label

**Total Changes**: 2 files, ~40 lines modified

---

### Key Lessons

1. **Concrete > Generic**: AI needs explicit format examples to generate useful output. Showing `"[Source]: [Finding] - [Support]"` produces better results than abstract instructions.

2. **Dead Code Should Die**: The evidenceIds linking system was never implemented. Keeping dead UI elements creates confusion. Remove them.

3. **Research Has Full Context**: The AI receives complete article content, so it can extract specific stats/facts, not just article titles. Use this.

4. **Format Matters**: Changing from generic types ("Public health data") to specific citations ("WHO 2024 Report: 2.2B lack safe water") makes evidence actionable.

5. **Prompt Schema Alignment**: Output schema examples must match the instruction format exactly. If instructions say `"[Source]: [Finding]"`, schema should show that too.

---

### Success Criteria

✅ **Specific Citations**: evidenceNeeded shows actual source names from research
✅ **Concrete Findings**: Shows stats/facts, not generic categories
✅ **Clear Connection**: Explains how each finding supports the specific frame
✅ **No Dead Code**: Removed evidenceIds display that was always empty
✅ **Better Label**: "Supporting Research:" is clearer than "Types of Evidence That Strengthen This:"

---

**Status**: ✅ COMPLETE

**User Feedback**: "good job. we finished. IT works."

---

## Chapter 24: Research Intensity Settings & Progress Bar Refactoring

**Date**: January 1, 2026

**Goal**: Implement user-controlled research intensity settings and fix broken progress UI caused by parallel generation refactoring.

**Roadmap Reference**: Phase 6 - Evidence Sourcing & Performance Optimization (Research intensity is a sub-feature)

---

### Problem Statement

**Before**:
1. **Research Hardcoded**: Agent always scraped exactly 5 articles per search, no user control
2. **Parallel Generation Broke Progress**: After parallelizing 6 prep material generation tasks (openings, frames, receipts, zingers, closings, intel), the progress UI showed 10 individual boxes that froze together at "generating" stage, giving false impression UI was broken
3. **Code Duplication**: Progress step rendering code duplicated in both `GenerationProgress.tsx` and `EmptyState.tsx`

**User Requirements**:
- Global user settings (not per-opponent) for research control
- Two-tier control: Research Intensity (primary, prominent) and Articles Per Search (secondary, de-emphasized)
- Default: Aggressive intensity, 5 articles per search
- Single consolidated progress box for parallel generation ("Study Guide" instead of 6 separate boxes)

---

### Implementation

#### Part 1: Schema Changes

**File**: `convex/schema.ts`

Added two fields to `users` table:
```typescript
users: defineTable({
  // ... existing fields ...
  researchIntensity: v.optional(v.union(
    v.literal("basic"),
    v.literal("aggressive"),
    v.literal("deep"),
  )),
  articlesPerSearch: v.optional(v.number()),
}).index("email", ["email"]),
```

**Defaults Applied**: Defaults handled at query/mutation level, not in schema (schema stores only what user explicitly sets)

---

#### Part 2: Research Intensity Helper

**File**: `convex/lib/researchIntensity.ts` (NEW)

```typescript
type ResearchIntensity = "basic" | "aggressive" | "deep";

export function getResearchInstructions(intensity: ResearchIntensity): string {
  const instructions = {
    basic: `RESEARCH SCOPE: Perform 2-3 focused searches...`,
    aggressive: `RESEARCH SCOPE: Perform 5-7 comprehensive searches...`,
    deep: `RESEARCH SCOPE: Perform 10+ exhaustive searches with iterative refinement...`,
  };
  return instructions[intensity];
}
```

**Design**: Each intensity level includes specific search count guidance injected directly into research prompt, guiding agent behavior without hardcoding.

---

#### Part 3: User Settings API

**File**: `convex/app.ts` (added 2 new functions)

```typescript
export const getResearchSettings = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (!user) throw new Error("User not found");

    return {
      researchIntensity: user.researchIntensity || "aggressive",
      articlesPerSearch: user.articlesPerSearch || 5,
    };
  },
});

export const updateResearchSettings = mutation({
  args: {
    researchIntensity: v.optional(v.union(...)),
    articlesPerSearch: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (!user) throw new Error("User not found");

    await ctx.db.patch(userId, {
      researchIntensity: args.researchIntensity,
      articlesPerSearch: args.articlesPerSearch,
    });
  },
});
```

**Error Handling**: Throws errors on auth failures (no fallbacks). Returns defaults for users who haven't explicitly configured settings.

---

#### Part 4: Agent Refactoring

**File**: `convex/agents.ts`

Changed from module-level constant to factory function:

```typescript
export function createPrepAgent(articlesPerSearch: number = 5) {
  return new Agent(components.agent, {
    name: "Debate Prep Strategist",
    // TODO: Consider changing language model
    languageModel: openrouter.chat("openai/gpt-4o"),
    instructions: `
    You are an expert debate coach and strategist, inspired by Mehdi Hasan's approach...
    Base instructions generic. Specific research intensity instructions (Basic/Aggressive/Deep)
    are injected via the research prompt sent to the thread in prep.ts
    `,
    tools: {
      searchWeb: createTool({
        handler: async (ctx, args) => {
          // Use user-configured articlesPerSearch instead of hardcoded 5
          const results = await searchAndScrape(args.query, apiKey, articlesPerSearch);
          return results.map(...).join("\\n\\n");
        },
      }),
    },
  });
}
```

**Key Change**: Enabled per-request customization of `articlesPerSearch` by passing it as parameter.

---

#### Part 5: Prep Orchestration Integration

**File**: `convex/actions/prep.ts` (lines 79-148)

```typescript
// Get user's research settings (guaranteed to return valid values or throw)
const { researchIntensity, articlesPerSearch } = await ctx.runQuery(
  api.app.getResearchSettings,
  {}
);

// ... later in research phase ...

const agent = createPrepAgent(articlesPerSearch);
const result = await agent.createThread(ctx);

// Inject intensity instructions into research prompt
const intensityInstructions = getResearchInstructions(researchIntensity);
const researchPrompt = `
  ${strategicBrief}
  ${intensityInstructions}
  We are in the year 2025.
  ${opponent.opponentPastStatements ? ... : ""}
`;
```

**Data Flow**: Settings fetch → Agent creation with custom articlesPerSearch → Intensity instructions injected → Prompt sent to agent

---

#### Part 6: Frontend - Settings Page

**File**: `src/routes/_app/_auth/dashboard/_layout.settings.research.tsx` (NEW)

New tab in Settings with:
- **Research Intensity**: Radio button group (Basic/Aggressive/Deep) - visually prominent
- **Advanced Settings**: Collapsible section with Articles Per Search dropdown (5/8/10) - de-emphasized
- Loads current settings via `getResearchSettings` query
- Saves via `updateResearchSettings` mutation

**Design Pattern**: Primary control (intensity) gets full visual treatment. Secondary control (articles) hidden in collapsed "Advanced" section with reduced opacity.

---

#### Part 7: Progress Bar Fix

**Files Modified**: `convex/prepProgress.ts`, `src/components/prep/GenerationProgress.tsx`, `src/components/prep/EmptyState.tsx`, `src/components/prep/GeminiProgress.tsx`

**Problem**: Parallel generation of 6 prep materials caused 10 individual progress boxes to appear and freeze together, appearing broken.

**Solution**:
1. Consolidated into single "Study Guide" box representing all parallel generation
2. Created reusable `PrepProgressSteps.tsx` component to eliminate duplication
3. Centered all progress displays (GenerationProgress, EmptyState, GeminiProgress)

**New Progress Flow**:
```
Research → Extract → Synthesis → Study Guide (parallel: openings+frames+receipts+zingers+closings+intel)
  → Strategic Brief → Save
```

**Status Types Updated** (`convex/prepProgress.ts`):
```typescript
type ProgressStatus =
  | "idle"
  | "researching"
  | "extracting"
  | "synthesizing"
  | "generating"          // Combined: all 6 parallel tasks
  | "generating_strategic_brief"
  | "storing"
  | "complete"
  | "error";
```

**Status Messages Updated**:
```typescript
generating: "Creating your study guide...",  // Changed from individual material names
```

---

#### Part 8: Code Deduplication

**File**: `src/components/prep/PrepProgressSteps.tsx` (NEW)

```typescript
export function PrepProgressSteps({
  progress,
  getStepStatus,
  className = "",
}: PrepProgressStepsProps) {
  return (
    <div className={`flex items-center justify-center gap-2 flex-wrap ${className}`}>
      <ProgressStep label="Research" status={getStepStatus("researching", progress)} />
      <ProgressStep label="Extract" status={getStepStatus("extracting", progress)} />
      <ProgressStep label="Synthesis" status={getStepStatus("synthesizing", progress)} />
      <ProgressStep label="Study Guide" status={getStepStatus("generating", progress)} />
      <ProgressStep label="Strategic Brief" status={getStepStatus("generating_strategic_brief", progress)} />
      <ProgressStep label="Save" status={getStepStatus("storing", progress)} />
    </div>
  );
}
```

**Impact**: Both `GenerationProgress.tsx` and `EmptyState.tsx` now use single component. Changes propagate everywhere automatically.

---

### Testing & Verification

**Verification Method**: Log parsing from actual test runs

**Test Cases**:
1. **Basic Mode** (2-3 searches, 5 articles each)
   - Log: `[generateStrategy] Using research settings: intensity=basic, articlesPerSearch=5`
   - Expected: 2-3 `🔍 [AGENT-DEBUG] Agent searching for:` entries

2. **Aggressive Mode** (5-7 searches, 5 articles each)
   - Log: `intensity=aggressive`
   - Expected: 5-7 search attempts

3. **Deep Mode** (10+ searches, variable articles)
   - Log: `intensity=deep`
   - Expected: 10+ search attempts (may hit Firecrawl rate limit: 6/min)

**Result**: All tests passed. Settings correctly wired through entire pipeline.

---

### Technical Decisions

1. **Factory Function Pattern for Agent**: Enables per-request customization while maintaining clean separation
2. **Intensity Instructions Injected via Prompt**: Keeps agent instructions generic (teachable), specifics in prompt (controllable)
3. **Defaults at Query Level, Not Schema**: More flexible. Users with no settings get defaults. Users with settings override defaults.
4. **Two-Tier Control UI**: Intensity prominent (what most users care about). Articles per search hidden in advanced settings (power users only).
5. **Single Progress Box**: Honest representation of system behavior (6 tasks run parallel, not sequential)
6. **Component Extraction**: Prevents future duplication bugs. Single source of truth.

---

### Files Modified

1. **convex/schema.ts** — Added researchIntensity, articlesPerSearch to users table
2. **convex/lib/researchIntensity.ts** (NEW) — Intensity instruction helper function
3. **convex/app.ts** — Added getResearchSettings, updateResearchSettings
4. **convex/agents.ts** — Changed to createPrepAgent factory function
5. **convex/actions/prep.ts** — Integrated user settings and intensity instructions
6. **convex/prepProgress.ts** — Updated status messages for consolidated "Study Guide"
7. **src/routes/_app/_auth/dashboard/_layout.settings.research.tsx** (NEW) — Research settings page
8. **src/routes/_app/_auth/dashboard/_layout.settings.tsx** — Added Research tab link
9. **src/components/prep/PrepProgressSteps.tsx** (NEW) — Reusable progress component
10. **src/components/prep/GenerationProgress.tsx** — Uses PrepProgressSteps, centered layout
11. **src/components/prep/EmptyState.tsx** — Uses PrepProgressSteps
12. **src/components/prep/GeminiProgress.tsx** — Centered layout

**Total**: 12 files (3 new, 9 modified)

---

### Key Lessons

1. **Hardcoded Values Hide Design Choices**: The hardcoded `5` in `searchAndScrape()` was the single control point for research depth. Making it configurable revealed that this was an important user preference.

2. **Parallel Processing = Honest Progress**: When 6 tasks run together, showing 6 separate boxes gives false impression of sequential progress. One box is more truthful.

3. **Deduplication Prevents Future Bugs**: Code duplication invites inconsistency. If progress rendering had been duplicated when the next fix came along, we'd have 2 places to fix.

4. **Factory Functions Enable Flexibility**: Keeping agent as constant prevented per-request customization. Factory function pattern is minimal change with big impact.

5. **Prompt Injection > Hardcoding**: Research intensity guidance in prompts is easier to test, modify, and explain than builtin agent behavior.

---

### Success Criteria

✅ User can set research intensity in Settings → Research tab
✅ Settings persist across sessions and apply to all future prep generations
✅ Basic mode performs 2-3 searches
✅ Aggressive mode performs 5-7 searches (default)
✅ Deep mode performs 10+ searches
✅ Articles per search setting is respected
✅ Existing users get sensible defaults (aggressive, 5)
✅ Progress bar shows single "Study Guide" box, not 10 individual boxes
✅ Progress display centered and clean across all components
✅ No code duplication in progress rendering

---

**Status**: ✅ COMPLETE

**User Feedback**: Confirmed working via log parsing. "settings are wired correctly, agent is following intensity instructions"

---

