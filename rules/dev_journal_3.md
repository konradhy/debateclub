# Development Journal 3

**Chapters 20+** | Previous volumes: [Journal 1](./dev_journal.md) (Ch 0-12) | [Journal 2](./dev_journal_2.md) (Ch 13-19)

---

## How to Use This Document

1. **Start each session** by reading the Archive Summary below (compressed view of Chapters 0-19)
2. **If you need deep context** on a specific feature, read the full chapter in Journal 1 or Journal 2
3. **Increment chapter number** for your session (continue from Chapter 20)
4. **Document as you work** — decisions, problems, solutions
5. **Complete chapter** before ending session
6. **Never modify** past chapters — only add new ones

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
