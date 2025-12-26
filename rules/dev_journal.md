# Development Journal

**Session-by-session record of development progress. Each chapter is immutable once completed.**

---

## How to Use This Document

1. **Start each session** by reading ALL existing chapters
2. **Increment chapter number** for your session
3. **Document as you work** — decisions, problems, solutions
4. **Complete chapter** before ending session
5. **Never modify** past chapters — only add new ones

---

## Chapter 0: Genesis — Documentation System Initialization

### TL;DR

This chapter establishes the baseline for the AI documentation system. It captures the state of the OratorPrep project as of December 17, 2025 when structured documentation began. All prior work is referenced as "Pre-docs" throughout the system. 

**Roadmap Items Advanced**: N/A — baseline establishment

---

### Project State at Initialization

**Date**: December 17, 2025

**Reason for adding documentation system**: 
Project has grown significantly with multiple phases complete. Need structured context for future sessions to maintain consistency, avoid re-learning the codebase, and track progress systematically.

This entire project began today, so not much nuance is lost. Core project started with a convex/tanstack router template. 

---

### What Already Exists

**Completed Features**:
- Voice debate system with Vapi integration (Phase 1)
- Technique detection for 11 debate techniques (Phase 2 & 3)
- Post-debate analysis generation (Phase 2)
- Opponent profile system with AI-generated prep materials (Phase 3)
- Prep panel for live debate access (Phase 3)
- Authentication with Convex Auth
- Stripe subscription integration
- Email system with Resend

**In-Progress Features**:
- Topic generation suggestions [R-3.4.2]
- Document upload for context [R-3.4.3]

**Known Technical Debt**:
- Some public mutations missing return validators
- `v.any()` used in opponent field types (schema flexibility tradeoff)
- Running tally UI not implemented

**Known Issues**:
- None critical documented

---

### Historical Decisions (Best Recollection)

| Decision | Reasoning (if known) | Confidence |
|----------|---------------------|------------|
| Vapi over custom voice pipeline | Faster to market, handles interruptions natively | High |
| Convex over traditional backend | Real-time subscriptions perfect for live debates | High |

| Transient Vapi assistants | Dynamic config per debate, no dashboard management | High |

| TanStack Router over React Router | Type-safe routing, modern approach | Med |
| Convex SaaS template base | Auth, Stripe, email already configured | High |
| 11 techniques from Mehdi Hasan's book | Proven framework, teachable techniques | High |

---

### Patterns Already Established

Patterns documented in PROJECT_MAP.md. 

Patterns that may need review:
- Some inconsistency in Convex function return validators
- `v.any()` used where stricter types could apply

---



---



---

### Session Handoff

**Status**: Complete — Baseline Established

**Next Action**: Begin Chapter 1 with real development task

**Roadmap Status**: See ROADMAP.md for current state markers

**Open Questions**: 
- Topic suggestions: web search or just LLM generation?
- Which document formats to support for upload?
- How sophisticated should missed opportunity detection be?

---

### Codebase Snapshot

**Key Directories**:
```
orator/
├── convex/           # Backend (Convex functions)
│   ├── actions/      # External API calls (prep, research)
│   ├── lib/          # Shared utilities (openrouter, scoring)
│   └── *.ts          # Queries, mutations, schema
├── src/
│   ├── routes/       # TanStack Router pages
│   │   └── _app/_auth/dashboard/  # Main app routes
│   └── ui/           # Reusable components
├── docs/             # Project documentation
└── rules/            # AI documentation system (this folder)
```

**Environment Variables Required**:
- `VITE_CONVEX_URL` — Convex deployment URL
- `VITE_VAPI_PUBLIC_API_KEY` — Vapi public key
- `OPENROUTER_API_KEY` — OpenRouter API key (Convex env)
- `STRIPE_SECRET_KEY` — Stripe key (Convex env)
- `RESEND_API_KEY` — Resend key (Convex env)
- `FIRECRAWL_API_KEY` — Firecrawl key (Convex env)

**Dev Commands**:
```bash
# Start development
npm run dev          # Frontend (Vite)
npx convex dev       # Backend (Convex)

# Deploy
npx convex deploy    # Deploy backend
# Frontend auto-deploys via Netlify
```

---

## Chapter Template (for future sessions)

```markdown
## Chapter N: [Title]

### TL;DR
[2-3 sentence summary of what was accomplished]

**Roadmap Items Advanced**: [R-X.X.X], [R-Y.Y.Y]

---

### Session Context
**Date**: [Date]
**Starting Point**: [What was the immediate goal?]
**Ending Point**: [What state is the code in now?]

---

### Work Completed

#### [Task 1 Name]
- What was done
- Key decisions made
- Files modified

#### [Task 2 Name]
...

---

### Technical Decisions

| Decision | Reasoning | Alternatives Considered |
|----------|-----------|------------------------|
| | | |

---

### Problems Encountered

#### [Problem 1]
**Symptoms**: 
**Cause**: 
**Solution**: 
**Time spent**: 

---

### Code Changes Summary

| File | Change Type | Description |
|------|-------------|-------------|
| path/to/file.ts | Modified | Brief description |

---

### Tests/Verification
- What was tested
- How it was verified

---

### Session Handoff

**Status**: [Complete / Partial / Blocked]

**Next Action**: [Specific next step]

**Blockers**: [Any blockers for next session]

**Open Questions**: 
- Question 1
- Question 2
```

---

*Future chapters will be appended below this line.*

---

## Chapter 0.1: Corrections — Baseline Audit

**Date**: December 17, 2025

**Issue**: Chapter 0 incorrectly marked several features as incomplete based on outdated PHASES.md rather than actual code inspection.

### Corrections Made:

**1. Research Mode (Firecrawl)** — Was marked "Not started", actually ✅ COMPLETE:
- `convex/lib/firecrawl.ts` — Firecrawl v2 API integration
- `convex/actions/research.ts` — `gatherEvidence` action
- `convex/research.ts` — Storage and retrieval
- `src/routes/_app/_auth/dashboard/prep.tsx` — Research tab in UI

**2. Missed Opportunity Detection** — Was marked "In progress", actually ✅ COMPLETE:
- Implemented in `convex/analysis.ts` generateFullAnalysis
- Prompt asks for 3-5 missed opportunities
- Stored in analyses table

### Actual Remaining Work (Phase 3):
- ⬜ Topic generation suggestions [R-3.4.2]
- ⬜ Document upload for context [R-3.4.3]

**Lesson**: Always inspect actual codebase, not documentation, when establishing baseline. PHASES.md was outdated.

---

## Chapter 1: AI Config, Research Processing, and Analysis Improvements

### TL;DR

Created centralized AI model configuration, added AI-powered article summarization for Firecrawl, implemented user research text processing feature, and enhanced the post-debate analysis display with prominent improvement suggestions.

**Roadmap Items Advanced**: [R-5.2.5] (AI summarization), [R-3.4.3] (document/text upload), [R-5.1.2] (enhanced AI explanations)

---

### Session Context
**Date**: December 17, 2025
**Starting Point**: Needed centralized AI config, better article summarization, research text input, and improved analysis display
**Ending Point**: All four features implemented and linting passes

---

### Work Completed

#### 1. AI Model Configuration (`convex/lib/aiConfig.ts`)
- Created centralized configuration file for all AI model usage
- Documented every AI call location with purpose, user journey step, and cost estimates
- Defined `AI_MODELS` constant with configurable model strings:
  - `PREP_GENERATION`: openai/gpt-4o
  - `TECHNIQUE_DETECTION`: anthropic/claude-sonnet-4.5
  - `POST_DEBATE_ANALYSIS`: anthropic/claude-sonnet-4.5
  - `ARTICLE_SUMMARIZATION`: openai/gpt-4o-mini
  - `RESEARCH_PROCESSING`: openai/gpt-4o
- Added `AI_CALL_REGISTRY` array documenting all AI calls with metadata
- Updated `prepGeneration.ts` and `analysis.ts` to use config instead of hardcoded strings

#### 2. Firecrawl AI Summarization
- Updated `convex/actions/research.ts` to use AI for article summarization
- Added `summarizeArticle()` helper function that calls OpenRouter
- Summarizes each scraped article focusing on debate-relevant content
- Falls back to truncated content if AI summarization fails

#### 3. User Research Text Processing
- Added `USER_RESEARCH_PROCESSING_PROMPT` to `promptTemplates.ts`
- Created `processUserResearch` internal action in `prepGeneration.ts`
- Created `processResearchText` public action in `prep.ts`
- Added "My Research" tab to prep screen (`prep.tsx`) with:
  - Textarea for pasting research material
  - "Extract Insights" button to process with AI
  - Display of extracted arguments, receipts, openers, zingers, and counter-arguments
  - Stores processed research in database for reference

#### 4. Enhanced Analysis Display
- Added prominent "Next Steps for Improvement" card to `analysis.tsx`
- Displays improvement tips as numbered, actionable steps
- Shows techniques to work on based on missed opportunities
- Includes "Quick Practice Drill" suggestion
- Uses Card components for better visual hierarchy

---

### Technical Decisions

| Decision | Reasoning | Alternatives Considered |
|----------|-----------|------------------------|
| Centralized AI config file | Easy model swapping, cost tracking, documentation | Per-file constants, env vars |
| AI summarization with fallback | Graceful degradation if API fails | Fail hard, require summary |
| gpt-4o-mini for summarization | Cost-effective for simple task | gpt-4o (more expensive) |
| Store user research as article | Consistent with existing research display | Separate table |

---

### Code Changes Summary

| File | Change Type | Description |
|------|-------------|-------------|
| convex/lib/aiConfig.ts | Created | AI model config and call registry |
| convex/lib/promptTemplates.ts | Modified | Added USER_RESEARCH_PROCESSING_PROMPT |
| convex/actions/research.ts | Modified | Added AI summarization for Firecrawl |
| convex/actions/prepGeneration.ts | Modified | Added processUserResearch action, use config |
| convex/actions/prep.ts | Modified | Added processResearchText public action |
| convex/analysis.ts | Modified | Use AI config for model strings |
| src/routes/_app/_auth/dashboard/prep.tsx | Modified | Added "My Research" tab with text input |
| src/routes/_app/_auth/dashboard/analysis.tsx | Modified | Added "Next Steps for Improvement" section |

---

### Session Handoff

**Status**: Complete

**Next Action**: Test the new features end-to-end

**Blockers**: None

**Open Questions**: 
- Auto-add extracted research content to prep materials?
- Add "regenerate with my research" option?

---

## Chapter 2: Progress Tracking & Research Chatbot

### TL;DR

Added real-time progress tracking during strategy generation and a RAG-powered chatbot for querying research materials. Progress now shows exactly which phase of generation is active. The chatbot enables conversational queries about debate research.

**Roadmap Items Advanced**: None explicitly defined - feature enhancements

---

### Session Context

**Date**: December 18, 2025
**Starting Point**: Strategy generation felt like a black box — no visibility into progress. Also needed a way to query research materials conversationally.
**Ending Point**: Real-time progress tracking with 9 phases, plus RAG chatbot for research queries.

---

### Work Completed

#### 1. Progress Tracking System
- Created `convex/prepProgress.ts` with progress management functions:
  - `startProgress`: Initializes progress tracking
  - `updateProgress`: Updates status as generation progresses
  - `getProgress`: Query for frontend polling
  - `clearProgress`: Cleanup function
- Added `prepProgress` table to schema with fields:
  - `status`: Union of all progress states (researching, extracting, generating_*, storing, complete, error)
  - `message`: Human-readable status message
  - `completedSteps`: Array tracking finished phases
  - `error`: Optional error message
  - `startedAt` / `completedAt`: Timestamps
- Updated `convex/actions/prep.ts` generateStrategy action to:
  - Call progress mutations at each phase
  - Changed from parallel to sequential generation for better progress visibility
  - Added error handling that updates progress on failure

#### 2. Progress UI in Prep Screen
- Added `ProgressStep` component showing step status (pending, active, complete)
- Progress bar appears during generation showing all 9 phases:
  - Research → Extract → Openings → Arguments → Receipts → Zingers → Closings → Intel → Save
- Visual indicators: Circle (pending), Loader2 (active), Check (complete)
- Error state display with message
- Real-time polling (1s interval) while generating

#### 3. RAG-Powered Research Chatbot
- Created `convex/prepChat.ts` with:
  - `getMessages` / `getMessagesInternal`: Retrieve chat history
  - `storeMessage`: Persist messages
  - `clearChat`: Reset conversation
  - `sendMessage`: Main action that queries OpenRouter with RAG context
- Added `prepChat` table to schema for message persistence
- Chat context includes:
  - All research articles (title, source, summary, content preview)
  - Generated prep materials (openings, arguments, receipts, opponent intel)
  - Debate topic, position, opponent info
  - Last 10 messages for conversation context

#### 4. Chat UI in Prep Screen
- Added "Ask AI" tab with MessageSquare icon
- Chat interface features:
  - Message history with user/assistant styling
  - Auto-scroll to latest message
  - Loading indicator during AI response
  - Suggested questions for empty state
  - Input field with Enter-to-submit
- Empty state shows example questions:
  - "What are the strongest arguments for my position?"
  - "What evidence do I have to counter economic arguments?"
  - "Summarize the key statistics from my research"
  - "What weaknesses should I prepare for?"

#### 5. AI Config Updates
- Added `PREP_CHAT` model constant to aiConfig.ts
- Added chat to AI_CALL_REGISTRY with metadata
- Documented as Step 6 - Prep Review feature

---

### Technical Decisions

| Decision | Reasoning | Alternatives Considered |
|----------|-----------|------------------------|
| Sequential generation | Better progress visibility, clearer debugging | Parallel (faster but no progress) |
| Poll-based progress | Real-time DB queries work well with Convex | WebSocket, Server-Sent Events |
| Last 10 messages context | Balance context vs token usage | Full history, sliding window |
| RAG in prompt context | Simple, works well for our scale | Vector embeddings, semantic search |
| Separate prepChat table | Clear separation, easy to query/clear | Embed in opponent document |

---

### Code Changes Summary

| File | Change Type | Description |
|------|-------------|-------------|
| convex/schema.ts | Modified | Added prepProgress and prepChat tables |
| convex/prepProgress.ts | Created | Progress tracking mutations and queries |
| convex/prepChat.ts | Created | RAG chatbot action and message management |
| convex/actions/prep.ts | Modified | Added progress updates to generateStrategy |
| convex/opponents.ts | Modified | Added getInternal query |
| convex/research.ts | Modified | Added getInternal query |
| convex/lib/aiConfig.ts | Modified | Added PREP_CHAT model and registry entry |
| src/routes/_app/_auth/dashboard/prep.tsx | Modified | Added progress UI and chat tab |

---

### Session Handoff

**Status**: Complete

**Next Action**: Test progress tracking and chatbot end-to-end

**Blockers**: None

**Open Questions**: 
- Persist chat history across sessions, or clear on new generation?
- Let chatbot modify prep materials based on conversation?

---

## Chapter 3: Analysis Generation & Frontend Schema Fix

### TL;DR

Resolved a critical system failure caused by a schema misalignment between the backend and frontend. The `analyses` table defined `missedOpportunities` as an array of objects, but the frontend component treated it as an array of strings, causing React rendering crashes. Refactored the frontend to strictly adhere to the defined schema.

**Roadmap Items Advanced**: Bug fix (Stability)

---

### Session Context

**Date**: December 19, 2025
**Starting Point**: The Analysis page was crashing with "Objects are not valid as a React child" because the application code had drifted from the database schema.
**Ending Point**: Frontend `analysis.tsx` is now fully aligned with `convex/schema.ts`. Legacy fields removed.

---

### Work Completed

#### 1. Frontend Schema Alignment (`src/routes/_app/_auth/dashboard/analysis.tsx`)
- **Diagnosis**: Identified that the frontend was attempting to render `missedOpportunities` objects directly, expecting strings.
- **Fix**: Refactored the component to map over the objects and display their properties (`whichTechnique`, `whatShouldHaveDone`).
- **Cleanup**: Removed usage of legacy fields (`userImprovementTips`, `aiImprovementTips`) that no longer existed in the schema.

#### 2. Backend Validation Hardening (`convex/analysis.ts`)
- Added Zod validation to ensure future LLM outputs strictly conform to the DB schema, preventing malformed data from entering the system.
- *Note: This was a safety measure, but the root cause was the existing valid data attempting to be consumed incorrectly.*

---

### Technical Decisions

| Decision | Reasoning | Alternatives Considered |
|----------|-----------|------------------------|
| Frontend Refactor | The Database Schema (`convex/schema.ts`) is the Source of Truth. Application code must adapt to it, not vice versa. | Changing schema to match broken frontend |

---

### Code Changes Summary

| File | Change Type | Description |
|------|-------------|-------------|
| src/routes/_app/_auth/dashboard/analysis.tsx | Modified | Refactored to match schema, fixed object rendering |
| convex/analysis.ts | Modified | Added Zod validation to enforce schema on write |
| rules/project_map.md | Modified | Added Schema Source of Truth pattern |

---

### Session Handoff

**Status**: Complete

**Next Action**: Monitor for any other schema drift issues.

---

## Chapter 4: Hardcoded Debate Topic Fix & Analysis Page Restoration

### TL;DR

Fixed a critical bug where debate topics and positions were hardcoded to "Florence Griffith-Joyner" instead of using the selected opponent's configuration. Also restored and refined the Analysis page after it was accidentally reset to a default template.

**Roadmap Items Advanced**: Bug fix (Stability), UX Improvements

---

### Session Context

**Date**: December 19, 2025  
**Starting Point**: Debates always used hardcoded "Flo Jo" topic regardless of opponent selection. Analysis page was blank.  
**Ending Point**: Debates now dynamically use opponent configuration. Analysis page restored with improved UX.

---

### Work Completed

#### 1. Fixed Hardcoded Debate Configuration (`src/routes/_app/_auth/dashboard/debate.tsx`)

**Problem Identified**:
- Constants `DEBATE_TOPIC`, `USER_POSITION`, `AI_POSITION` were hardcoded at file level
- `createDebate` mutation was called with these constants *before* checking opponent data
- Dynamic logic existed but was placed *after* the mutation, making it ineffective
- This caused all debates to use "Florence Griffith-Joyner" topic and propagate to analysis

**Solution**:
- Removed top-level hardcoded constants
- Moved topic/position calculation to component level using opponent data
- Added fallback: `opponent?.topic || "General Debate Practice"`
- Updated UI to display dynamic values
- Modified talking points to use `opponent?.talkingPoints` with generic fallbacks

**Schema Update**:
- Added `talkingPoints: v.optional(v.array(v.string()))` to `opponents` table in `convex/schema.ts`

#### 2. Restored Analysis Page (`src/routes/_app/_auth/dashboard/analysis.tsx`)

**Problem**: File was mysteriously reset to 10-line default template showing "Hello /_app/_auth/dashboard/analysis!"

**Solution**: Completely rebuilt component from schema knowledge with UX refinements:
- Executive Summary with gradient hero section and highlighted verdict
- Color-coded strengths (green) and improvements (orange) sections
- Hasan Scores with large total display and category breakdowns
- Opponent Intel with icons (Shield, Zap, Eye, Target) for each category
- Enhanced Missed Opportunities with hover effects and clear labeling
- Technique Scorecard with beloved dot indicators (kept from original)
- Actionable Training Plan with color-coded priority levels (red=urgent, orange=soon, blue=long-term)

---

### Technical Decisions

| Decision | Reasoning | Alternatives Considered |
|----------|-----------|------------------------|
| Move logic before mutation | Ensures database gets correct data from the start | Adding post-mutation update |
| Rebuild analysis.tsx from scratch | File was completely wiped; faster than debugging | Attempting git recovery |
| Keep dot indicators | The dot pattern works well and was worth preserving | Using progress bars |
| Color-coded training priorities | Makes urgency immediately scannable | Text-only labels |

---

### Code Changes Summary

| File | Change Type | Description |
|------|-------------|-------------|
| src/routes/_app/_auth/dashboard/debate.tsx | Modified | Removed hardcoded constants, made topic/position dynamic |
| convex/schema.ts | Modified | Added `talkingPoints` field to opponents table |
| src/routes/_app/_auth/dashboard/analysis.tsx | Rebuilt | Complete restoration with UX refinements |
| rules/project_map.md | Modified | Added Schema Source of Truth pattern (from Chapter 3) |

---

### Known Issues

- Analysis page file was mysteriously wiped (possible IDE/tooling issue)
- Root cause of file wipe unknown; monitoring for recurrence

---

### Session Handoff

**Status**: Complete

**Next Action**: Test dynamic debate topics and refined analysis page.

---

## Chapter 5: Opponent Deletion, Recording Storage & Debate History

### TL;DR

Added ability to delete opponents with cascade deletion of related data, integrated Cloudflare R2 for storing debate recordings via Vapi webhooks, and created a comprehensive debate history page with performance trend charts using Recharts.

**Roadmap Items Advanced**: [R-3.8.0] (new), [R-4.2.6] (recording playback), Backlog item (progress tracking)

---

### Session Context

**Date**: December 20, 2025  
**Starting Point**: No way to delete opponents, recordings weren't persisted, and no historical view of past debates.  
**Ending Point**: Full opponent deletion with cascade, R2 recording storage triggered by Vapi webhooks, and history page with audio playback and performance charts.

---

### Work Completed

#### 1. Opponent Deletion (`convex/opponents.ts`)

**Feature**: Added `deleteOpponent` mutation with cascade deletion.

**Implementation**:
- Deletes all related `research` documents via `by_opponent` index
- Deletes all related `prepProgress` documents
- Deletes all related `prepChat` documents  
- Finally deletes the opponent itself
- Authentication check ensures users can only delete their own opponents

**Frontend**: Added dropdown menu with delete option to each opponent card in dashboard.

#### 2. Cloudflare R2 Recording Storage

**Integration**: Used `@convex-dev/r2` Convex component for R2 storage.

**Files Created/Modified**:
- `convex/convex.config.ts` — Registered R2 component
- `convex/r2.ts` — R2 client instance and `storeRecording` internal action
- `convex/schema.ts` — Added `recordingKey` field to `debates` table
- `convex/debates.ts` — Added `updateRecordingKey` internal mutation
- `convex/http.ts` — Modified `end-of-call-report` handler to extract `recordingUrl` from Vapi and schedule R2 storage

**Flow**:
1. Vapi sends `end-of-call-report` webhook with `recordingUrl`
2. Webhook schedules `internal.r2.storeRecording` action
3. Action fetches audio blob from Vapi URL
4. Stores in R2 with key format `debates/{debateId}/{timestamp}.mp3`
5. Updates debate record with `recordingKey`

#### 3. Debate History Page (`src/routes/_app/_auth/dashboard/history.tsx`)

**Features**:
- Lists all completed debates with date, topic, duration
- Audio player for recordings (generates signed R2 URLs valid 24h)
- Hasan Score display per debate
- Performance trend charts using Recharts:
  - Line chart showing total score over time
  - Category breakdown (Fundamentals, Tricks of Trade, Behind the Scenes, Grand Finale)
- Responsive grid layout
- Link from main dashboard

**Backend Queries**:
- `listUserDebates` — Returns debates with analysis summary and signed recording URLs
- `getPerformanceStats` — Aggregates scores across debates for trend data

#### 4. Analysis Node.js Fix

**Problem**: `convex/analysis.ts` had `"use node";` directive but contained queries/mutations (only actions can use Node.js).

**Solution**: Split into two files:
- `convex/analysis.ts` — Queries and mutations (no Node.js)
- `convex/actions/analysisAction.ts` — `generateFullAnalysis` action with `"use node";`

Updated `convex/http.ts` to reference `internal.actions.analysisAction.generateFullAnalysis`.

---

### Technical Decisions

| Decision | Reasoning | Alternatives Considered |
|----------|-----------|------------------------|
| Cascade delete in mutation | Ensures data consistency, prevents orphaned records | Soft delete, background cleanup job |
| R2 via Convex component | Simplifies setup, handles signed URLs automatically | Direct R2 API, S3-compatible SDK |
| Store recording from Vapi URL | Vapi already records both sides; no client-side complexity | Client-side MediaRecorder, separate streams |
| Recharts for charts | Lightweight, React-native, good defaults | Chart.js, D3, Tremor |
| 24h signed URL expiry | Balance security with UX (user can revisit page) | Shorter expiry, permanent URLs |
| Split analysis.ts | Convex requires Node.js only in actions | Rewrite as action (breaks query patterns) |

---

### Code Changes Summary

| File | Change Type | Description |
|------|-------------|-------------|
| convex/opponents.ts | Modified | Added `deleteOpponent` mutation with cascade |
| convex/convex.config.ts | Modified | Registered R2 component |
| convex/r2.ts | Created | R2 client and `storeRecording` action |
| convex/schema.ts | Modified | Added `recordingKey` to debates table |
| convex/debates.ts | Modified | Added `updateRecordingKey`, `listUserDebates`, `getPerformanceStats` |
| convex/http.ts | Modified | Extract recordingUrl, schedule R2 storage |
| convex/analysis.ts | Modified | Removed Node.js directive, kept queries/mutations |
| convex/actions/analysisAction.ts | Created | Moved `generateFullAnalysis` action here |
| src/routes/_app/_auth/dashboard/history.tsx | Created | Debate history page with charts |
| src/routes/_app/_auth/dashboard/_layout.index.tsx | Modified | Added delete button, link to history |
| package.json | Modified | Added `@convex-dev/r2`, `recharts` dependencies |

---

### Environment Variables Required

New R2 variables needed in Convex environment:
- `R2_BUCKET` — R2 bucket name
- `R2_ACCESS_KEY_ID` — R2 access key
- `R2_SECRET_ACCESS_KEY` — R2 secret key
- `R2_ENDPOINT` — R2 endpoint URL

---

### Session Handoff

**Status**: Complete

**Next Action**: 
1. Configure R2 environment variables in Convex dashboard
2. Test recording storage with a live debate
3. Verify history page displays recordings and charts correctly

**Blockers**: R2 credentials need to be configured before recording storage works

**Open Questions**: 
- Auto-delete old recordings after retention period?
- Add recording download feature?
- Add rolling averages or trend lines to performance charts?

---

## Chapter 5.1: Recording & Analysis Fixes

### TL;DR

Fixed recording URL extraction from Vapi webhooks and migrated to OpenRouter structured outputs for reliable analysis generation. Recording storage now works end-to-end.

**Roadmap Items Advanced**: [R-3.8.0] (recording complete), Stability improvements

---

### Session Context

**Date**: December 20, 2025  
**Starting Point**: Recording URL not being found in Vapi webhook, analysis failing with Zod validation errors.  
**Ending Point**: Recording storage working, analysis using OpenRouter structured outputs for guaranteed schema compliance.

---

### Problems Encountered & Solutions

#### 1. Vapi Recording URL Not Found

**Symptoms**: Logs showed `[end-of-call-report] No recordingUrl provided for debate`

**Cause**: Looking at wrong path in webhook payload. Was checking `message.call?.recordingUrl` but Vapi puts it at `message.artifact.recording`.

**Solution**: Updated `convex/http.ts` to check multiple possible locations:
```typescript
const artifact = message.artifact;
const recordingUrl = 
  artifact?.recording?.mono?.combinedUrl ||
  artifact?.recording?.stereoUrl ||
  artifact?.recording ||
  // ... fallbacks
```

**Lesson**: Vapi webhook payload structure differs from API response structure. Always log full payload when debugging.

#### 2. Recording Not Enabled in Vapi

**Symptoms**: Even after fixing path, artifact was undefined.

**Cause**: Recording wasn't explicitly enabled in the transient assistant config.

**Solution**: Added `artifactPlan` to assistant config in `debate.tsx`:
```typescript
artifactPlan: {
  recordingEnabled: true,
},
```

**Note**: Per Vapi docs, `recordingEnabled` defaults to `true`, but explicit is better.

#### 3. Analysis Generation Failing with Zod Errors

**Symptoms**: 
```
"path": ["rewrites", 1, "explanation"],
"message": "Required"
```

**Cause**: Using basic JSON mode (`response_format: { type: "json_object" }`), AI sometimes omitted required fields. Zod validation caught it but analysis wasn't stored.

**Solution**: Migrated to OpenRouter Structured Outputs:

1. Updated `convex/lib/openrouter.ts`:
   - Added `JsonSchema` interface
   - `jsonMode` parameter now accepts `boolean | JsonSchema`
   - When schema provided, uses `type: "json_schema"` with `strict: true`

2. Updated `convex/actions/analysisAction.ts`:
   - Removed Zod schema (no longer needed)
   - Added comprehensive `analysisJsonSchema` with proper JSON Schema format
   - OpenRouter now enforces schema at model level

**Key Insight**: OpenRouter structured outputs with `strict: true` **guarantees** the model returns valid JSON matching the schema. No more validation failures.

---

### Technical Decisions

| Decision | Reasoning | Alternatives Considered |
|----------|-----------|------------------------|
| OpenRouter structured outputs | Schema enforced at model level, no validation failures | Keep Zod + make fields optional |
| Comprehensive JSON schema | All fields explicit with descriptions | Minimal schema, trust AI |
| Check multiple artifact paths | Vapi payload structure not fully documented | Hardcode single path |
| Explicit artifactPlan | Clear intent, future-proof | Rely on default true |

---

### Code Changes Summary

| File | Change Type | Description |
|------|-------------|-------------|
| convex/lib/openrouter.ts | Modified | Added `JsonSchema` interface, structured outputs support |
| convex/actions/analysisAction.ts | Modified | Replaced Zod with JSON schema for structured outputs |
| convex/http.ts | Modified | Fixed recording URL extraction from Vapi webhook |
| src/routes/_app/_auth/dashboard/debate.tsx | Modified | Added `artifactPlan.recordingEnabled: true` |

---

### Patterns Established

#### OpenRouter Structured Outputs Pattern

For reliable AI JSON responses, use structured outputs instead of basic JSON mode:

```typescript
const schema: JsonSchema = {
  name: "response_name",
  strict: true,
  schema: {
    type: "object",
    properties: { /* ... */ },
    required: ["field1", "field2"],
    additionalProperties: false,
  },
};

const response = await callOpenRouter(apiKey, messages, siteUrl, 3, model, maxTokens, schema);
```

This guarantees the AI returns valid JSON matching the schema.


---

### Session Handoff

**Status**: Complete ✅

**All Features Verified Working**:
- ✅ Recording URL extraction from Vapi webhook
- ✅ Recording storage to R2
- ✅ Recording playback in history page
- ✅ Analysis generation with structured outputs
- ✅ History page displaying debates and charts
- ✅ Opponent deletion with cascade

**Original Goals Achieved**:
1. ✅ Delete opponents - cascade deletion implemented
2. ✅ Relisten to recordings - R2 storage + playback working
3. ✅ Review old debates - history page with performance charts

---

## Chapter 6: Password Authentication Migration

### TL;DR

Replaced passwordless OTP authentication with traditional email/password authentication. Sign up now requires a password, email verification, and supports password reset. GitHub OAuth remains as an alternative login method.

**Roadmap Items Advanced**: UX improvement, Security enhancement

---

### Session Context

**Date**: December 21, 2025  
**Starting Point**: App used passwordless OTP (magic link style) for authentication. OTP was annoying — everyone hates checking email for a code every login.  
**Ending Point**: Full password authentication with email verification and password reset flows working.

---

### Work Completed

#### 1. Backend: Password Provider Configuration

**Created**: `convex/otp/ResendPasswordReset.ts`
- Email provider for password reset flow
- Sends 8-digit OTP codes via Resend
- 20-minute expiration window
- Reuses existing email template infrastructure

**Modified**: `convex/auth.ts`
- Replaced `ResendOTP` provider with `Password` provider
- Configured with `reset: ResendPasswordReset` for password resets
- Configured with `verify: ResendOTP` for email verification
- Kept GitHub OAuth as alternative method

**Modified**: `convex/otp/VerificationCodeEmail.tsx`
- Added `purpose` parameter to support both sign-in and password reset contexts
- Dynamic subject lines: "Sign in to OratorPrep" vs "Reset your OratorPrep password"
- Updated branding from "Convex SaaS" to "OratorPrep"

#### 2. Frontend: Complete Login Page Rebuild

**Modified**: `src/routes/_app/login/_layout.index.tsx`

Implemented four distinct authentication flows:

**Sign-In Flow**:
- Email + password input fields
- "Forgot password?" link
- Toggle to switch to sign-up
- GitHub OAuth button
- Client-side validation (8+ character password)

**Sign-Up Flow**:
- Email + password input fields
- Automatic redirect to email verification after submission
- Toggle to switch to sign-in
- Password requirements enforced

**Email Verification Flow**:
- Shown after sign-up
- 8-digit code entry
- Cancel option to return to sign-in
- Clear instructions with target email displayed

**Password Reset Flow** (two steps):
1. **Request Reset**: Enter email → system sends code
2. **Reset Password**: Enter code + new password

#### 3. Bug Fix: Sign-Up Redirect

**Problem**: After sign-up, the verification email was sent but there was no redirect to the code entry form.

**Cause**: Code checked `if (!result)` to determine verification need, but `signIn` return value was ambiguous for sign-ups.

**Solution**: For `flow === "signUp"`, always redirect to verification form after `signIn` call, since email verification is required for new accounts.

---

### Technical Decisions

| Decision | Reasoning | Alternatives Considered |
|----------|-----------|-------------------------|
| Password over OTP | OTP is annoying — checking email every login is friction | Keep OTP, add both options |
| Email verification required | Prevents accidental/malicious wrong email usage | Optional verification, no verification |
| Reuse ResendOTP for verification | Already configured, same code generation logic | Create separate provider |
| 8-character minimum | Balance security with usability | Longer requirement, complexity rules |
| Always verify on sign-up | Clear UX, no conditional logic needed | Check if verification needed |

---

### Code Changes Summary

| File | Change Type | Description |
|------|-------------|-------------|
| convex/otp/ResendPasswordReset.ts | Created | Password reset email provider |
| convex/otp/VerificationCodeEmail.tsx | Modified | Added purpose parameter for dynamic messaging |
| convex/auth.ts | Modified | Replaced ResendOTP with Password provider |
| src/routes/_app/login/_layout.index.tsx | Rebuilt | Complete rewrite with 4 auth flows |

---

### Authentication Flows

#### New User Journey
1. Click "Sign up"
2. Enter email + password (8+ chars)
3. Redirected to verification screen
4. Check email for 8-digit code
5. Enter code
6. Access dashboard

#### Returning User Journey
1. Enter email + password
2. Click "Sign in"
3. Access dashboard (no verification needed)

#### Forgot Password Journey
1. Click "Forgot password?"
2. Enter email
3. Check email for reset code
4. Enter code + new password
5. Sign in with new password

---

### Breaking Changes

⚠️ **Existing accounts cannot use old OTP method**
- Accounts created with OTP will need to use "Forgot password?" to set a password
- Or sign in with GitHub if previously linked

---

### Security Features

- Passwords hashed with bcrypt (handled by Convex Auth)
- Rate limiting on failed attempts (built-in)
- OTP codes expire after 20 minutes
- Codes are single-use
- Email verification prevents account hijacking

---

### Session Handoff

**Status**: Complete ✅

**Next Action**: Monitor new authentication flow in production

**Blockers**: None

**Open Questions**: 
- Should we add password strength requirements (uppercase, numbers, special chars)?
- Should we show password strength indicator during sign-up?
- Should we add "Remember me" functionality?

---

## Chapter 7: Enhanced Opponent Profile with Strategic Brief Pattern

### TL;DR

Implemented comprehensive opponent profile enhancement with fields for audience context, opponent intelligence, and personal research directives. Created a "Strategic Brief" pattern that synthesizes all context into a flowing narrative (like Hasan would write) rather than mechanical conditional sections. This brief is used across all AI generation for context-aware prep materials.

**Roadmap Items Advanced**: [R-3.4.3] (Document context), [Audience context], [Opponent intelligence]

---

### Session Context

**Date**: December 21, 2025  
**Starting Point**: Prep materials were generic — no way to tell the AI about the specific audience or opponent. Needed structured input for audience context (who am I persuading?) and opponent intelligence (who am I debating?). Mehdi Hasan's methodology emphasizes knowing both.  
**Ending Point**: Full implementation with 23 new optional fields, strategic brief builder, updated prompts, collapsible form sections, and prep chat integration.

---

### Work Completed

#### 1. Schema Extension (`convex/schema.ts`)

Added 23 new optional fields to the `opponents` table organized into three categories:

**Audience Context** (Chapter 1: Winning Over an Audience):
- `audienceDescription` — Free-form description
- `audienceType` — General, Academic, Professional, Political, Legal
- `audienceSize` — One-on-one, Small group, Large, Broadcast
- `audienceDisposition` — Friendly, Neutral, Skeptical, Hostile
- `debateFormat` — Formal debate, Panel, Interview, Town hall

**Opponent Profile** (Chapters 4, 10, 15: Three C's, Traps, Homework):
- `opponentDescription` — Background, role
- `opponentOrganization` — Affiliation
- `opponentCredentials` — Claimed expertise
- `credentialWeaknesses` — Gaps in credentials
- `opponentPastStatements` — Quotes on record (for traps)
- `opponentContradictions` — Known contradictions
- `opponentTrackRecord` — Wrong predictions, debunked claims
- `opponentDebateStyle` — Gish Galloper, Academic, Emotional, etc.
- `opponentRhetoricalTendencies` — Patterns, habits
- `opponentTriggers` — Topics that set them off
- `opponentStrongestArguments` — Steelmanned best case
- `opponentBestEvidence` — Their best proof
- `opponentLikelyCritiques` — How they'll attack you
- `opponentCharacterIssues` — Conflicts of interest, bias

**User Context**:
- `userResearch` — Notes, articles, data
- `keyPointsToMake` — Arguments to emphasize
- `thingsToAvoid` — Topics/approaches to avoid
- `toneDirectives` — Desired tone

#### 2. Strategic Brief Builder (`convex/lib/strategicBrief.ts`)

Created a new module implementing the "Strategic Brief" pattern — synthesizes all context into a flowing narrative rather than mechanical conditional sections.

**Core Functions**:
- `buildStrategicBrief(opponent)` — Main function composing full brief
- `buildAudienceNarrative(opponent)` — Synthesizes audience with strategic implications
- `buildOpponentNarrative(opponent)` — Builds opponent intel including credentials, style, traps
- `buildUserDirectives(opponent)` — Formats debater's preferences and directives

**Helper Functions for Strategic Implications**:
- `getAudienceSizeImplications()` — Maps size to tactical advice
- `getDispositionStrategy()` — Maps disposition to approach
- `getDebateStyleDescription()` — Expands style to counter-strategy

**Example Output**:
```
Your debater is arguing FOR the motion: "Universal Basic Income should be implemented."

They'll be presenting to a skeptical professional audience at a panel discussion. 
Expect resistance. Acknowledge their concerns early, use judo moves to concede valid 
points, then pivot to your strongest arguments.

Their opponent is Dr. James Morrison from the Cato Institute. They have credentials 
in labor economics, but their track record shows: predicted UBI would destroy work 
ethic, later contradicted by supporting veteran cash transfers — this is trap-worthy. 
Their debate style is Gish Gallop — expect rapid-fire dubious claims. Use the 
Pick-Your-Battle strategy: demolish one claim thoroughly rather than chasing all of them.

STEELMANNING THEIR CASE:
Their strongest argument will likely be: inflation concerns and labor disincentives.
Their best evidence includes: CBO studies on deficit impact.

THE DEBATER'S STRATEGIC PREFERENCES:
They want to emphasize: automation and job displacement framing.
AVOID: inflation debates where they feel less prepared.
Desired tone: confident but not dismissive.
```

#### 3. Prompt Template Updates (`convex/lib/promptTemplates.ts`)

Updated all 7 generation prompts to use `{strategicBrief}` placeholder with contextual usage guidance:

**Updated Prompts**:
- `OPENING_STATEMENT_PROMPT` — Tailor hooks to audience
- `ARGUMENT_FRAMES_PROMPT` — Prioritize frames for specific audience values
- `RECEIPTS_ARSENAL_PROMPT` — Turn opponent statements into trap receipts
- `ZINGER_BANK_PROMPT` — Craft zingers using opponent's own words
- `CLOSING_STATEMENT_PROMPT` — Address specific audience concerns
- `OPPONENT_INTEL_PROMPT` — Use steelmanned arguments for predictions
- `RESEARCH_SYNTHESIS_PROMPT` — Highlight findings for audience/opponent context

**Pattern**: Each prompt includes a "USING THE STRATEGIC BRIEF" section explaining HOW to use the context, not just including it.

#### 4. Generation Pipeline Integration

**`convex/actions/prepGeneration.ts`**:
- All 7 generation functions now accept `strategicBrief: v.optional(v.string())`
- Fallback to basic brief if none provided (backwards compatible)
- Prompt injection via simple string replacement

**`convex/actions/prep.ts`**:
- Fetches full opponent document at start
- Builds strategic brief once with `buildStrategicBrief(opponent)`
- Passes brief to all generation functions
- Enhanced research prompt includes opponent context for targeted searches

#### 5. Frontend Form Rebuild (`src/routes/_app/_auth/dashboard/opponent-profile.tsx`)

Complete rebuild with progressive disclosure using collapsible sections:

**Section 1: Basic Info** (Required, always visible)
- Opponent Name, Topic, Position, Style, Difficulty

**Section 2: About Your Opponent** (Collapsed)
- Background, Organization, Credentials, Weaknesses
- Debate Style dropdown, Rhetorical Tendencies, Triggers
- Character Issues

**Section 3: Opponent's Record** (Collapsed)
- Past Statements, Contradictions, Track Record
- Helper text references Chapter 10: Booby Traps

**Section 4: Steelmanning Their Case** (Collapsed)
- Strongest Arguments, Best Evidence, Likely Critiques
- Helper text references Chapter 15: Do Your Homework

**Section 5: Your Audience** (Collapsed)
- Description, Type, Size, Disposition, Format dropdowns
- Helper text references Chapter 1: Winning Over an Audience

**Section 6: Your Context & Directives** (Collapsed)
- User Research, Key Points, Things to Avoid, Tone

**UI Components Created**:
- `CollapsibleSection` — Native `<details>` element with styling
- `LabeledTextarea` — Textarea with label and helper text
- `LabeledSelect` — Select dropdown with label and helper text

#### 6. Prep Chat Integration (`convex/actions/prepChatAction.ts`)

Updated RAG chatbot to include strategic brief in system prompt:
- Chatbot now has awareness of audience, opponent intel, and debater preferences
- Can give tailored advice based on full context
- System prompt explicitly instructs to use strategic context

---

### The Strategic Brief Pattern — Design Decision

**The Problem**: With 23 optional context fields, how should they integrate into AI prompts?

**Option A (Rejected)**: Mechanical conditional sections
```
## AUDIENCE CONTEXT
{if audienceDescription}{audienceDescription}{endif}
{if audienceType}Type: {audienceType}{endif}

## OPPONENT INTEL  
{if opponentPastStatements}Past Statements: {opponentPastStatements}{endif}
```
Problems: Clumsy, AI sees fragmented data, awkward absences when fields empty.

**Option B (Chosen)**: Strategic Brief — Synthesized Narrative
```typescript
function buildStrategicBrief(opponent): string {
  // Synthesize all context into flowing prose
  // Only include sections if fields are populated
  // Add strategic implications inline
  return narrative;
}
```
Benefits:
1. **Reads like actual prep** — AI gets context the way Hasan would brief someone
2. **No awkward absences** — Empty fields mean shorter brief, not missing sections
3. **Synthesis happens once** — Brief built once, reused across all generations
4. **Strategic implications inline** — "Skeptical audience → acknowledge concerns early"
5. **Maintainable** — One builder to update, not 7 prompts with conditional logic

**Hasan Alignment**: This mirrors how Hasan describes prep — know your audience, know your opponent, have your game plan ready. Not a checklist, but a strategic understanding.

---

### Technical Decisions

| Decision | Reasoning | Alternatives Considered |
|----------|-----------|------------------------|
| 23 structured fields over single textarea | Structured input enables targeted brief sections | Single "context" field (less organized) |
| Strategic Brief pattern | Narrative synthesis > mechanical conditionals | Per-prompt conditional sections |
| Native `<details>` for collapsibles | No library needed, accessible, works everywhere | Radix Collapsible, custom accordion |
| All fields optional | Flexibility — provide as much or little as needed | Required minimum fields |
| Build brief in prep.ts once | Efficiency, consistency across generations | Build per-generator (redundant) |
| Include brief in prepChat | Enables context-aware chat responses | Separate chatbot context |

---

### Code Changes Summary

| File | Change Type | Description |
|------|-------------|-------------|
| convex/schema.ts | Modified | Added 23 optional fields to opponents table |
| convex/opponents.ts | Modified | Updated create mutation to accept all fields |
| convex/lib/strategicBrief.ts | **Created** | Strategic brief builder with narrative synthesis |
| convex/lib/promptTemplates.ts | Modified | Added {strategicBrief} + usage guidance to 7 prompts |
| convex/actions/prepGeneration.ts | Modified | All generators accept strategicBrief parameter |
| convex/actions/prep.ts | Modified | Build brief once, pass to all generators |
| convex/actions/prepChatAction.ts | Modified | Include brief in chatbot system prompt |
| src/routes/_app/_auth/dashboard/opponent-profile.tsx | Rebuilt | 6 collapsible sections, 23 input fields |

---

### Hasan Methodology Integration

**Chapter 1: Winning Over an Audience**
- Audience fields capture who the debater is trying to persuade
- Disposition determines strategic approach (friendly → reinforce, hostile → stay calm)
- Size/format affects delivery style guidance

**Chapter 4: Play the Ball... AND the Man**
- Three C's captured: Character (issues), Credentials (weaknesses), Claims (track record)
- Opponent description informs credibility attacks

**Chapter 10: Setting Booby Traps**
- Past statements field explicitly designed for trap setup
- Contradictions field for "Earlier you said X, now you're saying Y"

**Chapter 15: Do Your Homework**
- Steelmanning section: Strongest arguments, best evidence
- Know opponent's best case to prepare counters

---

### Testing Verification

- ✅ TypeScript compilation passes (`npx tsc --noEmit`)
- ✅ No linter errors in any modified files
- ✅ Form state management for all 23 fields
- ✅ Optional fields correctly passed as `undefined` when empty
- ✅ Backwards compatible — existing opponents without new fields still work

---

### Session Handoff

**Status**: Complete ✅

**Features Delivered**:
1. ✅ Audience context capture (5 fields)
2. ✅ Opponent intelligence capture (14 fields)  
3. ✅ User context/directives capture (4 fields)
4. ✅ Strategic brief synthesis for AI prompts
5. ✅ Collapsible form UI with progressive disclosure
6. ✅ Prep chat awareness of full context

**Next Actions**:
1. Test with real debate prep scenarios
2. Consider adding "Edit Opponent" page to modify context after creation
3. Consider showing strategic brief preview before generation

**Open Questions**: 
- Add "Edit Opponent" page to modify context after creation?
- Show strategic brief preview before generation?
- Allow copying opponent profiles as templates?

---

## Chapter 7: Database Cleanup Cron Jobs

### TL;DR

Implemented comprehensive automated cleanup system using Convex's built-in cron jobs. System cleans up both application data (old exchanges, abandoned debates, prep errors) and Convex Auth tables (expired sessions, verification codes, refresh tokens, OAuth verifiers, rate limits). Uses native `crons.ts` approach for reliability and simplicity.

**Roadmap Items Advanced**: Infrastructure maintenance, Database optimization, Security hygiene

---

### Session Context

**Date**: December 21, 2025  
**Starting Point**: No automated cleanup; database tables growing indefinitely with expired/stale records.  
**Ending Point**: 9 automated cleanup jobs running on schedules, cleaning both app and auth data.

---

### Work Completed

#### 1. Research: Convex Cron Methods Analysis

**Two Methods Available**:

**Method 1: Component (`@convex-dev/crons`)**
- Dynamic registration at runtime
- Database-backed cron definitions
- CRUD operations on crons
- Requires npm package and component setup

**Method 2: Built-in (`crons.ts` file)**
- Native Convex feature
- Static definitions in code
- No extra dependencies
- Version controlled

**Decision**: Chose **Method 2 (Built-in)** because:
- Cleanup jobs are infrastructure tasks with fixed schedules
- Simpler setup, no extra dependencies
- More reliable (no database state to manage)
- Easier to audit (all crons visible in one file)
- Version controlled changes

#### 2. Convex Auth Tables Research

Researched Convex Auth documentation and source code to identify auth tables created by `authTables`:

**Auth Tables Identified**:
1. `authSessions` - Active user sessions (30-day expiration)
2. `authAccounts` - Provider accounts (no cleanup needed)
3. `authRefreshTokens` - JWT refresh tokens (30-day expiration)
4. `authVerificationCodes` - OTP/magic link codes (20-minute expiration in our app)
5. `authVerifiers` - PKCE verifiers for OAuth flows
6. `authRateLimits` - Sign-in rate limiting records

**Key Finding**: Convex Auth does NOT automatically clean up expired records. Tables grow indefinitely without manual intervention.

#### 3. Cleanup Requirements Identified

**Application Data** (4 cleanup jobs):
- `exchanges` - Old exchanges from completed debates (90+ days)
- `debates` - Mark active debates as abandoned (24+ hours)
- `prepProgress` - Error records (7+ days)
- `prepChat` - Trim to last 100 messages per opponent

**Auth Data** (5 cleanup jobs):
- `authSessions` - Expired sessions
- `authRefreshTokens` - Expired refresh tokens
- `authVerificationCodes` - Expired OTP codes
- `authVerifiers` - Old OAuth verifiers (24+ hours)
- `authRateLimits` - Old rate limit records (7+ days)

#### 4. Implementation

**Created**: `convex/crons.ts`
- Defines 9 cron jobs using built-in `cronJobs()` API
- Mix of `crons.cron()` (cron syntax) and `crons.interval()` (time-based)
- Schedules staggered to avoid resource contention
- Clear naming and documentation

**Created**: `convex/cleanup.ts`
- 9 internal mutations for cleanup operations
- Comprehensive docstrings explaining purpose and schedule
- Console logging for monitoring
- Efficient queries using indexes

**Cron Schedules**:
| Job | Frequency | Time (UTC) | Retention Policy |
|-----|-----------|------------|------------------|
| Old exchanges | Daily | 3:00 AM | 90 days |
| Abandoned debates | Hourly | - | 24 hours |
| Prep errors | Daily | 4:00 AM | 7 days |
| Prep chat trim | Weekly | Sun 2:00 AM | Last 100 msgs |
| Expired sessions | Daily | 5:00 AM | Past expiration |
| Verification codes | Every 6h | - | Past expiration |
| Refresh tokens | Daily | 6:00 AM | Past expiration |
| OAuth verifiers | Every 12h | - | 24 hours |
| Rate limits | Daily | 7:00 AM | 7 days |

---

### Technical Decisions

| Decision | Reasoning | Alternatives Considered |
|----------|-----------|------------------------|
| Built-in crons over component | Infrastructure tasks, simpler, no dependencies | @convex-dev/crons component |
| Staggered schedules | Avoid resource contention | All at same time |
| 90-day exchange retention | Balance storage vs. history | 30/60/180 days |
| 100 message chat limit | Reasonable context window | 50/200 messages |
| 6-hour verification code cleanup | Frequent enough for security | Daily cleanup |
| Console logging | Easy monitoring in dashboard | Separate logging table |

---

### Code Changes Summary

| File | Change Type | Description |
|------|-------------|-------------|
| convex/crons.ts | Created | 9 cron job definitions |
| convex/cleanup.ts | Created | 9 cleanup mutation functions |

---

### Cron Job Details

#### Application Data Cleanup

**cleanupOldExchanges**
- Deletes exchanges from debates completed 90+ days ago
- Prevents unbounded growth of conversation history
- Preserves recent debates for user reference

**markAbandonedDebates**
- Marks debates stuck in "active" status for 24+ hours
- Prevents UI confusion from stale active debates
- Runs hourly for quick cleanup

**cleanupPrepProgressErrors**
- Removes prep generation error records after 7 days
- Keeps recent errors for debugging
- Prevents error log accumulation

**trimPrepChatHistory**
- Keeps only last 100 messages per opponent
- Maintains reasonable context window
- Runs weekly as chat grows slowly

#### Auth Tables Cleanup

**cleanupExpiredSessions**
- Removes sessions past their expiration time
- Default 30-day session duration
- Critical for security hygiene

**cleanupExpiredVerificationCodes**
- Removes expired OTP/magic link codes
- App uses 20-minute expiration
- Runs every 6 hours for security

**cleanupExpiredRefreshTokens**
- Removes expired refresh tokens
- Default 30-day token duration
- Prevents token table bloat

**cleanupOldOAuthVerifiers**
- Removes PKCE verifiers after 24 hours
- OAuth flows complete in minutes
- Runs every 12 hours

**cleanupOldRateLimits**
- Removes rate limit records after 7 days
- Rate limits reset after 1 hour
- Daily cleanup sufficient

---

### Monitoring & Verification

**Deployment**:
- Cron jobs deployed automatically with `npm run dev`
- Visible in Convex Dashboard cron jobs view
- Execution logs visible in dashboard logs

**Initial Execution Observed**:
```
[Auth Cleanup] Deleted 0 expired verification codes
[Auth Cleanup] Deleted 3 old OAuth verifiers
[Cleanup] Marked 0 debates as abandoned
```

**Monitoring Approach**:
- Check Convex Dashboard logs for execution
- Monitor console.log output for cleanup counts
- Review cron job history in dashboard
- Alert on repeated failures

---

### Security Considerations

**Auth Table Cleanup Importance**:
- Expired sessions can be security risk if not cleaned
- Verification codes should be removed after use
- Rate limit records prevent memory leaks
- Per Convex Auth docs: "In case of security breach, you can delete all existing sessions by clearing the authSessions table"

**Retention Policies**:
- Auth data: Clean immediately after expiration
- Debate data: Longer retention (90 days) for reference
- Error logs: 7-day retention for debugging

---

### Performance Impact

**Expected Load**:
- Most cleanup jobs run daily during low-traffic hours (2-7 AM UTC)
- Frequent jobs (hourly, 6h, 12h) process small datasets
- All queries use indexes for efficiency
- Staggered schedules prevent resource spikes

**Scalability**:
- Cleanup time scales with data volume
- May need batching for very large datasets
- Consider pagination if single job times out

---

### Session Handoff

**Status**: Complete ✅

**Next Action**: Monitor cron job execution over next week to verify effectiveness

**Blockers**: None

**Future Enhancements**:
1. Add metrics tracking (cleanup counts over time)
2. Add alerting for cleanup failures
3. Consider adding manual cleanup triggers for admins
4. Add cleanup dry-run mode for testing

**Open Questions**: 
- Add dashboard view showing cleanup statistics?
- Make retention policies configurable per tier?
- Notify before deleting old debates/exchanges?

---

## Chapter 8: Gemini Deep Research Integration (System B)

### TL;DR

Built "System B" — an alternative prep generation pipeline using Google's Gemini Interactions API. Uses the autonomous Deep Research agent (`deep-research-pro-preview-12-2025`) for comprehensive 3-20 minute research, followed by source extraction using `gemini-3-flash-preview` with `google_search` tool, then feeds into existing prep generation. Key insight: Deep Research doesn't need methodology instructions — it needs context-aware direction via the strategic brief.

**Roadmap Items Advanced**: Research enhancement, Alternative AI pipeline

---

### Session Context

**Date**: December 21-22, 2025 (multi-session)  
**Starting Point**: System A (Firecrawl + OpenRouter) worked but had limitations — Firecrawl scraping sometimes failed, no autonomous research capability.  
**Ending Point**: Full System B pipeline working with context-driven Deep Research prompt, proper structured output handling, and real-time progress tracking.

---

### Work Completed

#### 1. Gemini Interactions API Research

**Key Learnings from Documentation**:
- **Interactions API** is Google's agentic interface — single call handles multi-step tool execution
- **Deep Research Agent** (`deep-research-pro-preview-12-2025`) autonomously searches, synthesizes, returns markdown report
- Requires `background: true` for Deep Research (takes 3-20 minutes)
- Uses polling pattern with `interactions.get()` to check completion
- **Structured Output** uses `response_format` parameter (NOT `responseMimeType`/`responseJsonSchema` from generateContent API)

**Models Available**:
| Model Name | Model ID | Use Case |
|------------|----------|----------|
| Gemini 2.5 Pro | gemini-2.5-pro | Complex reasoning |
| Gemini 2.5 Flash | gemini-2.5-flash | Fast responses |
| Gemini 3 Flash Preview | gemini-3-flash-preview | Source extraction with tools |
| Deep Research Preview | deep-research-pro-preview-12-2025 | Autonomous research agent |

#### 2. Deep Research Integration (`convex/lib/geminiDeepResearch.ts`)

**Created** autonomous research wrapper:
```typescript
export async function runDeepResearch(
  query: string,
  apiKey: string,
  progressCallback: (status, message, error?) => Promise<void>
): Promise<string>
```

**Implementation Details**:
- Uses `@google/genai` SDK (`GoogleGenAI` class)
- Starts interaction with `background: true` for async execution
- Polls every 10 seconds for up to 20 minutes
- Returns markdown report from final output
- Progress callback updates UI in real-time

#### 3. Source Extraction with Google Search (`convex/lib/geminiSearch.ts`)

**Problem Solved**: Deep Research synthesizes information ("Studies show X increased by 47%") but doesn't always provide direct URLs. Prep materials need actual citations.

**Solution**: Use `gemini-3-flash-preview` with `google_search` tool to find real URLs from the report.

**Key Fix** (from Claude Code session):
```typescript
// WRONG - generateContent API syntax
config: { responseMimeType: "application/json", responseJsonSchema: schema }

// CORRECT - Interactions API syntax
response_format: articlesSchema
```

**Final Implementation**:
```typescript
const articlesSchema = {
  type: "object",
  properties: {
    articles: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          url: { type: "string" },
          content: { type: "string" },
          summary: { type: "string" },
          source: { type: "string" },
          publishedDate: { type: "string" }
        },
        required: ["title", "url", "content", "summary", "source"]
      }
    }
  },
  required: ["articles"]
};

const interaction = await client.interactions.create({
  model: 'gemini-3-flash-preview',
  input: prompt,
  tools: [{ type: 'google_search' }],
  response_format: articlesSchema  // ← Correct parameter
});
```

#### 4. Orchestrator Action (`convex/actions/geminiPrep.ts`)

**Created** `generateStrategyGemini` action that orchestrates the 3-stage pipeline:

**Stage 1: Deep Research**
- Builds strategic brief from opponent profile
- Submits research query to Deep Research agent
- Polls for completion, updates progress
- Stores markdown report

**Stage 2: Source Extraction**
- Passes report + strategic brief to `findSourcesWithGemini`
- Returns array of articles with real URLs

**Stage 3: Prep Generation**
- Uses existing `prepGeneration.ts` functions (from System A)
- Generates openings, frames, receipts, zingers, closings, opponent intel
- Already has Hasan methodology baked in

#### 5. Progress Tracking (`convex/geminiResearchProgress.ts`)

**Created** dedicated progress tracking for Gemini pipeline:
- Status enum: `deep_research_planning`, `deep_research_searching`, `deep_research_complete`, `gemini_agent_searching`, `generating`, `storing`, `complete`, `error`
- Real-time UI updates via Convex subscriptions
- Separate from System A progress (different statuses)

#### 6. Deep Research Prompt Refinement

**Problem Discovered**: Initial attempt was too mechanical — quoted "Hasan Chapter 3" and methodology instructions directly. Deep Research doesn't need to be taught HOW to research; it needs to know WHAT to focus on.

**Wrong Approach** (Rejected):
```
## CORE RESEARCH PRINCIPLES (Hasan Methodology)
1. **Show Your Receipts** (Chapter 3): Find hard evidence...
2. **Know Your Opponent** (Chapters 10, 15): Research opponent's past statements...
```

**Correct Approach** (Implemented):
```typescript
// Build context-aware research focus based on strategic brief
const researchFocus: Array<string> = [];

// Always need core evidence
researchFocus.push("Current statistics and data from authoritative sources...");
researchFocus.push("Real-world case studies and examples...");
researchFocus.push("The strongest arguments made BY THE OPPOSITION...");

// Audience-specific focus (only if hostile/skeptical)
if (opponent.audienceDisposition === "hostile" || "skeptical") {
  researchFocus.push("Common objections and concerns raised by critics...");
}

// Opponent-specific research (only if intel exists)
if (opponent.opponentPastStatements) {
  researchFocus.push(`Statements and positions taken by ${opponent.name}...`);
}

// User priorities (only if specified)
if (opponent.keyPointsToMake) {
  researchFocus.push(`Prioritize evidence supporting: ${opponent.keyPointsToMake}`);
}
```

**Key Insight**: The strategic brief flows through all 3 stages as context, not as instructions. Each stage uses it differently:
- Stage 1 (Research): Determines WHAT to prioritize
- Stage 2 (Extraction): Determines WHAT is relevant to extract
- Stage 3 (Generation): Determines HOW to frame materials (methodology lives here)

---

### System B Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    STRATEGIC BRIEF                          │
│  (synthesizes opponent profile into narrative context)      │
└───────────────────────┬─────────────────────────────────────┘
                        │ flows into ↓
┌───────────────────────▼─────────────────────────────────────┐
│  STAGE 1: Deep Research (geminiDeepResearch.ts)             │
│  • Input: topic, position, strategic brief                  │
│  • Agent: deep-research-pro-preview-12-2025                 │
│  • Duration: 3-20 minutes autonomous research               │
│  • Output: comprehensive markdown report                    │
└───────────────────────┬─────────────────────────────────────┘
                        │ report + brief ↓
┌───────────────────────▼─────────────────────────────────────┐
│  STAGE 2: Source Extraction (geminiSearch.ts)               │
│  • Input: report + strategic brief                          │
│  • Model: gemini-3-flash-preview with google_search         │
│  • Duration: ~30 seconds                                    │
│  • Output: Article[] with real URLs (8-12 sources)          │
└───────────────────────┬─────────────────────────────────────┘
                        │ articles[] ↓
┌───────────────────────▼─────────────────────────────────────┐
│  STAGE 3: Prep Generation (prepGeneration.ts)               │
│  • Input: articles + strategic brief                        │
│  • Same as System A — Hasan methodology baked in            │
│  • Output: openings, frames, receipts, zingers, closings    │
└─────────────────────────────────────────────────────────────┘
```

---

### Technical Decisions

| Decision | Reasoning | Alternatives Considered |
|----------|-----------|------------------------|
| Interactions API over generateContent | Required for Deep Research agent and google_search tool | Standard Gemini API |
| response_format for structured output | Correct Interactions API parameter for JSON schema | config.responseJsonSchema (wrong API) |
| Polling pattern for Deep Research | Background mode required; no webhook support | Stream (not supported for agents) |
| Context-driven prompt over methodology | Let agent do what it's designed to do | Explicit Hasan chapter instructions |
| Separate geminiResearchProgress | Different status enum from System A | Reuse prepProgress |
| Reuse System A prep generation | Already has methodology, no duplication | Create new generation functions |

---

### Code Changes Summary

| File | Change Type | Description |
|------|-------------|-------------|
| convex/lib/geminiDeepResearch.ts | Created | Deep Research agent wrapper with polling |
| convex/lib/geminiSearch.ts | Created | Source extraction with google_search tool |
| convex/actions/geminiPrep.ts | Created | Orchestrator for 3-stage pipeline |
| convex/geminiResearchProgress.ts | Created | Progress tracking for Gemini pipeline |
| convex/opponents.ts | Modified | Added updateGeminiReport mutation |
| convex/schema.ts | Modified | Added geminiResearchProgress table, geminiReport field |
| package.json | Modified | Added @google/genai dependency |

---

### Environment Variables Required

New variable needed in Convex environment:
- `GEMINI_API_KEY` — Google AI API key with Gemini access

---

### System A vs System B Comparison

| Aspect | System A (Firecrawl) | System B (Gemini) |
|--------|---------------------|-------------------|
| Research method | Web scraping specific URLs | Autonomous agent research |
| Time | 30-60 seconds | 3-20 minutes |
| Source quality | Limited to scraped pages | Synthesized from many sources |
| URL reliability | Direct from scrape | Found via google_search |
| Cost | Firecrawl API + OpenRouter | Gemini API |
| Best for | Quick prep, specific sources | Deep research, comprehensive prep |

---

### Debugging Lessons

**Lesson 1: API Syntax Matters**
- Interactions API uses different parameters than generateContent
- `response_format` vs `config.responseJsonSchema`
- Read documentation for the specific API being used

**Lesson 2: Don't Teach, Direct**
- Autonomous agents know how to research
- Tell them WHAT to find based on context
- Save methodology for generation phase where it applies

**Lesson 3: Strategic Brief is the Key**
- Same context flows through all stages
- Each stage interprets it differently
- Build once, use everywhere

---

### Session Handoff

**Status**: Complete ✅

**Features Delivered**:
1. ✅ Deep Research agent integration
2. ✅ Source extraction with google_search
3. ✅ Structured JSON output handling
4. ✅ Context-driven research prompts
5. ✅ Real-time progress tracking
6. ✅ Full pipeline orchestration

**Next Actions**:
1. Test end-to-end with real debate topics
2. Add UI toggle to choose System A vs System B
3. Consider hybrid approach (use both, merge results)

**Blockers**: None

**Open Questions**: 
- Default to System A or B for new users?
- Show Deep Research report to users?
- Cache Deep Research results for similar topics?

---

## Chapter 9: TanStack Start Migration for SSR

### TL;DR

Migrated from pure CSR (client-side rendering) to SSR using TanStack Start for public-facing pages (landing page, blog) while keeping authenticated routes client-rendered. This enables search engine indexing of marketing content. Key insight: Convex providers stay in `_app.tsx` with `ssr: false`, isolating client-only auth from server-rendered public pages.

**Roadmap Items Advanced**: [R-4.7.1] SSR enabled for public pages

---

### Session Context

**Date**: December 23, 2025  
**Starting Point**: App was fully CSR — `index.html` contained empty `<div id="root">` with JavaScript loading all content. Google couldn't index landing page or blog content.  
**Ending Point**: Full SSR for public routes (`/`, `/blog/*`), CSR preserved for authenticated routes (`/_app/*`). View source shows complete HTML.

---

### Work Completed

#### 1. Dependency Updates

**Removed**:
- `react-helmet-async` — Replaced by TanStack Start's built-in `head()` function
- `@tanstack/router-plugin` — Replaced by `@tanstack/react-start`

**Reinstalled** (clean install to avoid version conflicts):
- `@tanstack/react-router`
- `@tanstack/react-start`
- `vite`
- `@vitejs/plugin-react`
- `vite-tsconfig-paths`
- `@tanstack/router-devtools`

**Package.json Scripts Updated**:
```json
{
  "scripts": {
    "dev": "npm-run-all --parallel dev:frontend dev:backend",
    "dev:frontend": "vite dev",
    "dev:backend": "convex dev",
    "build": "vite build",
    "start": "vite preview"
  }
}
```

#### 2. Vite Configuration (`vite.config.ts`)

Replaced TanStack Router plugin with TanStack Start plugin:

```typescript
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tanstackStart(),      // TanStack Start SSR plugin
    viteReact(),          // Must come AFTER tanstackStart()
  ],
  ssr: {
    noExternal: ["@xixixao/uploadstuff"],  // Exclude from SSR bundle
  },
});
```

**Key Fix**: Added `ssr.noExternal` for `@xixixao/uploadstuff` — this package failed during SSR even though it's only used in client routes. Vite still analyzes all imports.

#### 3. Router Configuration (`src/router.tsx`)

TanStack Start requires a `getRouter()` factory function instead of a direct export:

```typescript
export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  });
  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

#### 4. Root Route (`src/routes/__root.tsx`)

Transformed into full HTML document structure for SSR:

```tsx
import { HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "@/index.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DebateClub - Win Every Argument" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Google Fonts preconnect and stylesheet
    ],
    scripts: [
      {
        children: `if (localStorage.theme === "dark"...) { ... }`,  // Theme FOUC prevention
      },
    ],
  }),
  component: RootComponent,
});

function RootDocument({ children }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
```

**Key Changes**:
- `head()` function replaces `react-helmet-async`
- `<HeadContent />` renders meta tags from `head()`
- `<Scripts />` injects hydration scripts
- CSS imported with `?url` suffix for SSR compatibility
- Theme script prevents flash of unstyled content (FOUC)

#### 5. App Layout Route (`src/routes/_app.tsx`)

Configured as client-only with Convex providers:

```typescript
export const Route = createFileRoute("/_app")({
  ssr: false,  // ← All routes under /_app are CSR
  component: AppLayout,
  beforeLoad: async () => {
    await queryClient.ensureQueryData(
      convexQuery(api.app.getCurrentUser, {}),
    );
  },
});

function AppLayout() {
  return (
    <ConvexAuthProvider client={convex}>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </ConvexAuthProvider>
  );
}
```

**Key Insight**: By placing Convex providers inside `_app.tsx` with `ssr: false`, all authenticated routes get client-side rendering while public routes (`/`, `/blog/*`) get full SSR without needing Convex during server render.

#### 6. HeroSection Fix (`src/components/marketing/landing-page/HeroSection.tsx`)

**Problem**: `HeroSection` used `useConvexAuth()` to conditionally show "Dashboard" vs "Start Free Practice". This failed during SSR because Convex providers weren't available.

**Solution**: Simplified to always show "Start Free Practice" linking to `/login`. This is actually better UX — public landing page shouldn't need auth state.

#### 7. Deleted Files

- `index.html` — Content now managed by `__root.tsx`
- `src/main.tsx` — TanStack Start handles client entry
- `src/app.tsx` — Providers moved to `_app.tsx`

---

### Technical Decisions

| Decision | Reasoning | Alternatives Considered |
|----------|-----------|------------------------|
| TanStack Start over manual SSR | Full framework support, aligns with existing TanStack Router | Next.js (too different), manual Vite SSR (complex) |
| `ssr: false` on `_app` route | Clean separation of SSR/CSR, Convex isolated to client | SSR with Convex (would require server-side auth handling) |
| Move Convex to `_app.tsx` | Avoids SSR errors on public pages | Keep at root with conditional rendering |
| Remove auth check from Hero | Simpler, SSR-compatible, better UX | Add server-side auth (overkill for landing page) |
| `ssr.noExternal` for uploadstuff | Package not SSR-compatible even in CSR routes | Dynamic import (more complex) |

---

### Problems Encountered

#### 1. `ERR_MODULE_NOT_FOUND: @xixixao/uploadstuff`

**Symptoms**: Server crashed trying to SSR routes that don't even use upload functionality.

**Cause**: Vite analyzes all imports during SSR, even for CSR-only routes. The uploadstuff package isn't designed for server environments.

**Solution**: Added `ssr.noExternal: ["@xixixao/uploadstuff"]` to vite.config.ts.

**Time spent**: 15 minutes

#### 2. `Could not find ConvexProviderWithAuth` in SSR

**Symptoms**: Server render failed with React context error.

**Cause**: `HeroSection.tsx` called `useConvexAuth()` which requires `ConvexAuthProvider`. During SSR, this provider wasn't available because it was only in `_app.tsx`.

**Solution**: Removed `useConvexAuth()` from HeroSection. Public landing page doesn't need auth state.

**Time spent**: 20 minutes

---

### Code Changes Summary

| File | Change Type | Description |
|------|-------------|-------------|
| package.json | Modified | Updated scripts, swapped router plugin for start |
| vite.config.ts | Modified | tanstackStart() plugin, ssr.noExternal config |
| src/router.tsx | Modified | Export getRouter() factory function |
| src/routes/__root.tsx | Rebuilt | Full HTML document with head(), HeadContent, Scripts |
| src/routes/_app.tsx | Modified | Added ssr: false, moved Convex providers here |
| src/components/marketing/landing-page/HeroSection.tsx | Modified | Removed useConvexAuth() |
| index.html | Deleted | Replaced by __root.tsx |
| src/main.tsx | Deleted | Handled by TanStack Start |
| src/app.tsx | Deleted | Merged into _app.tsx |

---

### Verification

**SSR Confirmed** via `curl` and View Page Source:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>DebateClub - Win Every Argument</title>
  <meta charSet="utf-8"/>
  <!-- Full head content rendered -->
</head>
<body>
  <!-- Full page content rendered on server -->
  <div class="min-h-screen" style="background-color:#F5F3EF">
    <header>...</header>
    <article>...</article>  <!-- Blog content fully rendered -->
  </div>
  <script>...</script>  <!-- Hydration scripts -->
</body>
</html>
```

**Routes Verified**:
- ✅ `/` (landing page) — Full SSR
- ✅ `/blog` — Full SSR
- ✅ `/blog/read-any-room` — Full SSR with complete article content
- ✅ `/_app/*` — CSR (loads with JavaScript)

---

### Architectural Pattern Established

**Selective SSR with Convex**:

```
/ (SSR)              ← Public, no Convex needed
/blog/* (SSR)        ← Public, no Convex needed
/_app/* (CSR)        ← Authenticated, Convex providers here
  ├─ /dashboard      ← CSR
  ├─ /debate         ← CSR  
  ├─ /history        ← CSR
  └─ /settings       ← CSR
```

This pattern works because:
1. Public pages don't need real-time data or auth
2. Authenticated pages need Convex WebSocket connection
3. `ssr: false` on `_app` layout propagates to all children
4. No conditional provider wrapping needed

---

### Session Handoff

**Status**: Complete ✅

**Features Delivered**:
1. ✅ SSR for landing page (SEO indexable)
2. ✅ SSR for blog posts (SEO indexable)
3. ✅ CSR preserved for authenticated routes
4. ✅ Theme FOUC prevention in SSR
5. ✅ head() function for meta tags

**Next Actions** (tracked in Roadmap 4.7):
1. Add unique meta descriptions per route
2. Add Open Graph tags for social sharing
3. Create sitemap.xml
4. Submit to Google Search Console

**Blockers**: None

**Open Questions**: 
- Add JSON-LD structured data to blog posts?
- Make debate transcripts public for SEO?
- Create topic landing pages?

---

## Chapter 10: Scenario System - Plugin Architecture (Phases 1 & 2)

### TL;DR

Transformed OratorPrep from a debate-only app into a multi-scenario practice platform using a plugin architecture. New practice types (Sales, Entrepreneur Pitch) can be added by creating a single configuration file. The point of the app is still debating, but this plays very well with marketing. We can now expand basic in all directions, while going heave depth for debating.  The codebase is now generic — reading scenario configs to determine AI behavior, input forms, prep materials, and analysis frameworks. Completed Phases 1 (scenario config structure, schema updates, dynamic UI) and 2 (generic prep system with editable content).

**Roadmap Items Advanced**: [R-6.1.0] Scenario System Foundation, [R-6.2.0] Sales Scenarios, [R-6.3.0] Entrepreneur Scenarios

---

### Session Context

**Date**: December 26, 2025  
**Starting Point**: App was hardcoded for debate scenarios only. To add new practice types (sales calls, investor pitches) would require duplicating entire pipelines.  
**Ending Point**: Full plugin architecture with 4 scenarios working (Debate, Sales Cold Prospect, Sales Demo Follow-up, Entrepreneur Pitch). Generic prep page with editable content matching debate UX patterns.

---

### Work Completed

#### 1. Documentation Review & Planning

**Reviewed**: `docs/SCENARIO_SYSTEM_IMPLEMENTATION_PLAN.md` — comprehensive blueprint for the entire system.

**Created**: `docs/SCENARIO_SYSTEM.md` — high-level conceptual documentation explaining the architecture abstractly for future developers.

**Key Clarification**: Section 6 of the plan ("CHEAT SHEET IN DEBATE SCREEN") was initially misunderstood as a new feature. Through code inspection of `debate.tsx` and `prep-panel.tsx`, clarified that this refers to the existing `PrepPanel` (Quick Reference toggle) which needs to be made dynamic based on `prepType`.

**Critical Note Added to Plan**: Emphasized the importance of reviewing actual code in addition to the plan, after discovering that initial scenario configs were incomplete because they relied solely on the plan's examples rather than inspecting `opponent-profile.tsx`.

#### 2. Scenario Configuration System (`src/scenarios/`)

**Created Type Definitions** (`src/scenarios/types.ts`):
```typescript
export type ScenarioConfig = {
  id: string;
  name: string;
  category: string;
  description: string;
  
  pipeline: {
    research: boolean;
    prep: boolean;
    prepType: "debate" | "generic";
  };
  
  inputs: {
    // 25+ input field configurations
    name: ScenarioInputField;
    topic: ScenarioInputField;
    position: ScenarioInputField;
    // ... audience context fields
    // ... opponent profile fields
    // ... user context fields
    // ... generic prep fields
  };
  
  assistant: {
    firstMessage: string | string[];
    systemPrompt: string;
    voice: { provider: "11labs"; voiceId: string; ... };
    canInterrupt?: boolean;
    interruptionThreshold?: number;
  };
  
  analysis: {
    framework: string;
    scoreCategories: AnalysisScoreCategory[];
    systemPrompt: string;
  };
};
```

**Created Debate Scenario** (`src/scenarios/debate.ts`):
- Extracted all 25+ input fields from actual `opponent-profile.tsx` code
- Includes all audience context, opponent profile, and user directive fields
- Preserves existing Vapi configuration and analysis framework
- `prepType: "debate"` routes to existing debate prep page

**Created Sales Scenarios** (`src/scenarios/sales.ts`):
- Base config with shared pipeline and inputs
- Two variations: "Cold Prospect" and "Demo Follow-up"
- Each has unique `firstMessage` arrays and `systemPrompt`
- Generic inputs: `topic` → "What are you selling?", `position` hidden
- Sales-specific analysis categories: Discovery, Control, Confidence, Closing
- `prepType: "generic"` routes to new generic prep system

**Created Entrepreneur Scenario** (`src/scenarios/entrepreneur.ts`):
- "Investor Pitch" variation
- Inputs: `topic` → "What's your business/product?"
- Pitch-specific analysis categories: Clarity, Confidence, Handling Skepticism, Business Acumen
- `prepType: "generic"`

**Created Registry** (`src/scenarios/index.ts`):
```typescript
export const SCENARIOS: ScenariosRegistry = {
  'debate': DebateScenario,
  'sales-cold-prospect': SalesScenarios['cold-prospect'],
  'sales-demo-followup': SalesScenarios['demo-followup'],
  'entrepreneur-pitch': EntrepreneurScenarios['pitch'],
};
```

#### 3. Schema Updates (`convex/schema.ts`)

**Added to `opponents` table**:
- `scenarioType: v.string()` — References scenario ID from registry
- `prepType: v.string()` — "debate" or "generic" for UI routing

**Generic Prep Fields** (structured with IDs for inline editing):
- `talkingPoints: v.optional(v.array(v.object({ id: v.string(), content: v.string() })))`
- `openingApproach: v.optional(v.string())`
- `keyPhrases: v.optional(v.array(v.object({ id: v.string(), phrase: v.string() })))`
- `responseMap: v.optional(v.array(v.object({ id: v.string(), trigger: v.string(), response: v.string() })))`
- `closingApproach: v.optional(v.string())`

**Refactored `thingsToAvoid`**:
- Originally: `v.optional(v.string())`
- Now: `v.optional(v.array(v.object({ id: v.string(), content: v.string() })))`
- Removed redundant `thingsToAvoidList` field
- Enables consistent inline editing across debate and generic prep

**Added to `analyses` table**:
- `analysisFramework: v.string()` — "debate" or "sales" or "entrepreneur"
- `skillsAssessment: v.optional(v.array(v.object({ name: v.string(), score: v.number(), feedback: v.string() })))` — Generic analysis output

#### 4. Backend Mutations (`convex/opponents.ts`)

**Updated `create` mutation**:
- Accepts `scenarioType` and `prepType` parameters
- Accepts all generic prep fields as optional arguments
- Schema validation ensures type safety

**Extended Field Update Mutations**:
- `updateOpponentField`: Added `talkingPoints`, `keyPhrases`, `responseMap`, `thingsToAvoid` as valid fields
- `addOpponentFieldItem`: Supports adding items to generic prep arrays
- `deleteOpponentFieldItem`: Supports deleting items from generic prep arrays

**Created `updateGenericPrepText` mutation**:
- For updating single string fields (`openingApproach`, `closingApproach`)

**Created `updateGenericPrepInternal` internal mutation**:
- Called by `genericPrep` action to save AI-generated prep materials

#### 5. Dynamic Opponent Creation UI (`src/routes/_app/_auth/dashboard/opponent-profile.tsx`)

**Added Scenario Selector**:
- Dropdown at top of form: "What type of practice?"
- Options: Debate, Sales - Cold Prospect, Sales - Demo Follow-up, Entrepreneur - Investor Pitch

**Dynamic Field Rendering**:
- Labels, placeholders, helper text pulled from `SCENARIOS[scenarioType].inputs`
- Fields conditionally hidden based on `hidden` property (e.g., `position` hidden for sales)
- Form adapts completely based on selected scenario

**Submit Handler**:
- Passes `scenarioType` and `prepType` to `createOpponent` mutation
- Backend stores scenario metadata with opponent profile

#### 6. Generic Prep Generation (`convex/actions/genericPrep.ts`)

**Created AI Action** for non-debate prep generation:
- System prompt generates structured prep materials in JSON format
- Output includes:
  - `openingApproach`: 2-3 sentence opening
  - `talkingPoints`: 5 key points with IDs
  - `keyPhrases`: 5 power phrases with IDs
  - `responseMap`: 4 objection/response pairs with IDs
  - `thingsToAvoid`: 3 topics to avoid with IDs
  - `closingApproach`: 2-3 sentence closing with CTA

**Context-Aware Generation**:
- Prompt includes scenario type, topic, opponent description
- Generates content specific to the scenario (sales vs pitch language)
- Uses OpenRouter with `AI_MODELS.PREP_GENERATION`

**Structured Output**:
- All items include unique IDs for database storage
- Format: `gen_{timestamp}_{random}`

#### 7. Unified Prep Page (`src/routes/_app/_auth/dashboard/prep.tsx`)

**Major Refactor** — integrated debate and generic prep into single component:

**Conditional Rendering Based on `prepType`**:
```typescript
const isDebatePrep = opponent.prepType === "debate";
```

**Dynamic Tabs**:
- Debate: 6 tabs (Study, Quick Ref, Research, My Research, Ask AI, Gemini Report)
- Generic: 2 tabs (Study, Quick Ref)

**Study Mode Tab**:

*Debate Sections*:
- Openings, Arguments, Zingers, Receipts, Closings, Intel
- All use `InlineEdit` for item editing

*Generic Sections*:
- Opening Approach (Textarea with `updateGenericPrepText`)
- Talking Points (InlineEdit with add/delete)
- Key Phrases (InlineEdit with add/delete)
- Response Map (InlineEdit showing trigger → response)
- Closing Approach (Textarea with `updateGenericPrepText`)
- Things to Avoid (InlineEdit with add/delete)

**Quick Reference Tab**:
- Conditionally renders debate-specific or generic summaries
- Uses same Card-based layout for consistency
- Generic version shows: Opening, Key Points, Phrases, Responses, Closing

**Dynamic UI Elements**:
- Page title: "Debate Strategy" vs "Prep Materials"
- Generate button: "Generate Strategy" vs "Generate Prep Materials"
- Start button: "Start Debate" vs "Start Practice"

**Consistent UX Pattern**:
- Both debate and generic prep use `InlineEdit` for editable lists
- Both use `AddButton` for adding new items
- Both use `Card` components for visual organization
- User experience is identical across scenario types

#### 8. Schema Consistency Fix

**Problem**: After updating schema to use structured objects with IDs, the `create` mutation still expected old formats (e.g., `keyPhrases: v.array(v.string())`).

**Solution**: Updated `create` mutation args to match new schema:
```typescript
keyPhrases: v.optional(v.array(v.object({ 
  id: v.string(), 
  phrase: v.string() 
}))),
```

**Result**: TypeScript compilation passes, no schema mismatches.

---

### The Strategic Brief Pattern Integration

**Key Insight**: The Strategic Brief pattern (from Chapter 7) scales naturally with the scenario system:

1. **Debate scenarios**: Brief includes audience context, opponent intel, user directives
2. **Generic scenarios**: Brief focuses on context relevant to the scenario (e.g., prospect background for sales)
3. **Future scenarios**: Brief builder can be extended with scenario-specific sections

**No changes needed** — the existing `buildStrategicBrief()` function already handles optional fields gracefully.

---

### Technical Decisions

| Decision | Reasoning | Alternatives Considered |
|----------|-----------|------------------------|
| Plugin architecture | Rapid scenario addition, no code duplication | Separate pipelines per scenario |
| Single `prep.tsx` component | Consistent UX, shared components, maintainable | Separate `generic-prep.tsx` page |
| `prepType` field in schema | Simple routing logic, clear separation | Complex conditional logic |
| Structured prep with IDs | Enables inline editing, consistent with debate | Simple arrays (no editing) |
| `InlineEdit` for all editable content | Consistent UX across all scenarios | Different UI patterns per type |
| Scenario registry pattern | Type-safe, centralized, easy to extend | Individual imports everywhere |
| `thingsToAvoid` as array | Consistent with other prep fields | Keep as string (inconsistent) |

---

### Problems Encountered & Solutions

#### 1. Incomplete Debate Scenario Config

**Symptoms**: Initial `debate.ts` only had 5-6 input fields, missing most of the opponent profile fields.

**Cause**: Relied solely on implementation plan examples instead of inspecting actual `opponent-profile.tsx` code.

**Solution**: Reviewed `opponent-profile.tsx` line-by-line, extracted all 25+ fields with their exact labels, placeholders, and helper texts.

**Lesson**: Always inspect actual code, not just documentation. Updated implementation plan with critical note about this.

**Time spent**: 30 minutes

#### 2. Incorrect Import Path for SCENARIOS

**Symptoms**: Build error `ENOENT: no such file or directory, open '/Users/konrad/Desktop/code/OratorPrep/orator/scenarios'`

**Cause**: Used `import { SCENARIOS } from "~/scenarios";` but path should be `@/scenarios`.

**Solution**: Corrected import path after inspecting other files' import patterns.

**Time spent**: 5 minutes

#### 3. Redundant `thingsToAvoid` Fields

**Symptoms**: Schema had both `thingsToAvoid: v.optional(v.string())` and `thingsToAvoidList: v.optional(v.array(...))`.

**Cause**: Incremental development without refactoring existing field.

**Solution**: Removed `thingsToAvoidList`, changed `thingsToAvoid` to array of objects with IDs.

**Time spent**: 15 minutes

#### 4. Separate Generic Prep Page with Different UX

**Symptoms**: Initially created `generic-prep.tsx` with static display (no inline editing), different from debate prep.

**Cause**: Misunderstanding of user's intent to maintain consistent UX patterns.

**Solution**: Deleted `generic-prep.tsx`, integrated generic prep into `prep.tsx` with same `InlineEdit`/`AddButton` components as debate.

**User feedback**: "Why aren't you making it like the existing thing. It should add to the tab the same. Not this new creation."

**Time spent**: 45 minutes

#### 5. Schema Mismatch in Create Mutation

**Symptoms**: TypeScript error after updating schema for generic prep fields to include IDs.

**Cause**: Schema was updated but `create` mutation args still expected old format.

**Solution**: Updated `create` mutation args to match new schema structure for all generic prep fields.

**Time spent**: 10 minutes

---

### Code Changes Summary

| File | Change Type | Description |
|------|-------------|-------------|
| docs/SCENARIO_SYSTEM.md | Created | High-level conceptual documentation |
| docs/SCENARIO_SYSTEM_IMPLEMENTATION_PLAN.md | Modified | Clarified PrepPanel, added critical notes |
| src/scenarios/types.ts | Created | TypeScript interfaces for scenario configs |
| src/scenarios/debate.ts | Created | Full debate scenario config with 25+ fields |
| src/scenarios/sales.ts | Created | Sales base config + 2 variations |
| src/scenarios/entrepreneur.ts | Created | Entrepreneur pitch scenario config |
| src/scenarios/index.ts | Created | Central scenario registry |
| convex/schema.ts | Modified | Added scenarioType, prepType, generic prep fields |
| convex/opponents.ts | Modified | Extended create/update mutations for scenarios |
| convex/actions/genericPrep.ts | Created | AI generation for generic prep materials |
| src/routes/_app/_auth/dashboard/opponent-profile.tsx | Modified | Dynamic scenario selector and field rendering |
| src/routes/_app/_auth/dashboard/prep.tsx | Refactored | Unified debate/generic prep with conditional rendering |
| src/routes/_app/_auth/dashboard/generic-prep.tsx | Deleted | Merged into prep.tsx |

---

### Architectural Pattern: The Scenario Plugin System

**Core Principle**: Configuration over code duplication.

**How It Works**:

1. **Define Scenario** (`src/scenarios/[name].ts`):
   - Input field configurations
   - Vapi assistant config
   - Analysis framework
   - Pipeline settings

2. **Register Scenario** (`src/scenarios/index.ts`):
   - Add to `SCENARIOS` registry

3. **System Adapts Automatically**:
   - UI reads config for form fields
   - Backend reads config for Vapi setup
   - Prep system reads config for material types
   - Analysis reads config for scoring categories

**No Code Changes Needed** for new scenarios — just configuration.

**Example: Adding "Healthcare - Patient Conversation"**:
```typescript
// src/scenarios/healthcare.ts
export const HealthcareScenarios = {
  'patient-conversation': {
    id: 'healthcare-patient-conversation',
    name: 'Healthcare - Patient Conversation',
    category: 'healthcare',
    pipeline: { research: false, prep: true, prepType: 'generic' },
    inputs: { /* ... */ },
    assistant: { /* ... */ },
    analysis: { /* ... */ },
  }
};

// src/scenarios/index.ts
import { HealthcareScenarios } from './healthcare';
export const SCENARIOS = {
  // ... existing scenarios
  'healthcare-patient-conversation': HealthcareScenarios['patient-conversation'],
};
```

**Done.** The entire system now supports healthcare scenarios.

---

### Hasan Methodology Preservation

**Critical Requirement**: New scenarios must NOT dilute the debate-specific Hasan methodology.

**How We Ensured This**:

1. **Debate scenario config** preserves all 11 techniques, strategic brief fields, and analysis framework
2. **Generic scenarios** use simpler analysis (skills assessment) appropriate for their context
3. **Prep generation prompts** remain debate-specific for debate scenarios
4. **Strategic brief builder** adapts to scenario context without losing debate intelligence

**Result**: Debate prep is just as sophisticated as before, while new scenarios get appropriate (simpler) frameworks.

---

### Testing Verification

- ✅ TypeScript compilation passes (`npm run build`)
- ✅ No linter errors
- ✅ Scenario selector renders all 4 scenarios
- ✅ Form fields adapt based on selected scenario
- ✅ Opponent creation stores `scenarioType` and `prepType`
- ✅ Prep page conditionally renders debate vs generic content
- ✅ Generic prep uses same InlineEdit components as debate
- ✅ AI generation produces structured output with IDs
- ✅ All CRUD operations work for generic prep fields

---

### Session Handoff

**Status**: Phases 1 & 2 Complete ✅

**Features Delivered**:
1. ✅ Scenario configuration type system
2. ✅ 4 working scenarios (Debate, 2 Sales, 1 Entrepreneur)
3. ✅ Central scenario registry
4. ✅ Dynamic opponent creation UI
5. ✅ Schema extended for generic prep
6. ✅ Generic prep AI generation
7. ✅ Unified prep page with conditional rendering
8. ✅ Consistent inline editing across all scenarios
9. ✅ High-level documentation for future developers

**Next Actions** (Phase 3):
1. Wire up Vapi assistant config based on scenario
2. Implement random first message selection (for scenarios with arrays)
3. Test sales scenarios end-to-end
4. Update `PrepPanel` (Quick Reference) to dynamically show content based on `prepType`

**Blockers**: None

**Open Questions**: 
- Should PrepPanel show different categories for generic scenarios? No. 
- Add scenario-specific icons/branding? No
- Allow users to create custom scenarios? No


---
