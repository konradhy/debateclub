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

This chapter establishes the baseline for the AI documentation system. It captures the state of the OratorPrep project as of December 2, 2024 when structured documentation began. All prior work is referenced as "Pre-docs" throughout the system.

**Roadmap Items Advanced**: N/A — baseline establishment

---

### Project State at Initialization

**Date**: December 2, 2024

**Initialized by**: AI (Claude) with Human

**Reason for adding documentation system**: 
Project has grown significantly with multiple phases complete. Need structured context for future AI sessions to maintain consistency, avoid re-learning the codebase, and track progress systematically.

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
| OpenRouter over direct LLM APIs | Model flexibility, unified API | High |
| Transient Vapi assistants | Dynamic config per debate, no dashboard management | High |
| Claude Sonnet for analysis | Cost optimization after claude-3-opus proved too expensive | High |
| GPT-4o for prep generation | Quality over cost for user-facing content | High |
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

### Lost Context

- Specific dates of Phase 1 and 2 completion not captured
- Original decision process for choosing Deepgram over alternatives
- Any failed approaches that were abandoned
- Specific prompt iteration history for technique detection

---

### Starting Point for Future Sessions

**Current Focus**: Phase 3 completion, specifically:
- Topic generation suggestions
- Document upload for context
- Missed opportunity detection refinement

**Active Roadmap Item**: [R-3.4.0] Custom Debate Configuration

**Immediate Next Action**: Implement topic suggestion feature [R-3.4.2]

---

### Session Handoff

**Status**: Complete — Baseline Established

**Next Action**: Begin Chapter 1 with real development task

**Roadmap Status**: See ROADMAP.md for current state markers

**Open Questions**: 
- Should topic suggestions use web search or just LLM generation?
- What document formats should be supported for upload?
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

**Date**: December 2, 2024

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
**Date**: December 2, 2024
**Starting Point**: User requested AI config file, Firecrawl summarization, research text input, and analysis improvements
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
- Should extracted research content be auto-added to prep materials?
- Should there be a "regenerate with my research" option that uses user research as context?

---

## Chapter 2: Progress Tracking & Research Chatbot

### TL;DR

Added real-time progress tracking during strategy generation and a RAG-powered chatbot for querying research materials. Users can now see exactly which phase of generation is active, and ask questions about their debate research in a conversational interface.

**Roadmap Items Advanced**: None explicitly defined - feature enhancements

---

### Session Details

**Date**: December 2, 2024

**Started By**: AI (Claude) at user request

**Goal**: Add progress indicator for strategy generation and RAG chatbot for research

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
- Should chat history persist across sessions or be cleared on new generation?
- Should chatbot have ability to modify prep materials based on conversation?

---

## Chapter 3: Analysis Generation & Frontend Schema Fix

### TL;DR

Resolved a critical system failure caused by a schema misalignment between the backend and frontend. The `analyses` table defined `missedOpportunities` as an array of objects, but the frontend component treated it as an array of strings, causing React rendering crashes. Refactored the frontend to strictly adhere to the defined schema.

**Roadmap Items Advanced**: Bug fix (Stability)

---

### Session Context

**Date**: December 19, 2024
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

**Date**: December 19, 2024  
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
| Keep dot indicators | User specifically requested to preserve this UX element | Using progress bars |
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

**Next Action**: User testing of dynamic debate topics and refined analysis page.

---

## Chapter 5: Opponent Deletion, Recording Storage & Debate History

### TL;DR

Added ability to delete opponents with cascade deletion of related data, integrated Cloudflare R2 for storing debate recordings via Vapi webhooks, and created a comprehensive debate history page with performance trend charts using Recharts.

**Roadmap Items Advanced**: [R-3.8.0] (new), [R-4.2.6] (recording playback), Backlog item (progress tracking)

---

### Session Context

**Date**: December 20, 2024  
**Starting Point**: Users had no way to delete opponents, recordings were not persisted, and no historical view of past debates existed.  
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
- Should old recordings be auto-deleted after a retention period?
- Should users be able to download recordings?
- Should performance charts include rolling averages or trend lines?

---

## Chapter 5.1: Recording & Analysis Fixes

### TL;DR

Fixed recording URL extraction from Vapi webhooks and migrated to OpenRouter structured outputs for reliable analysis generation. Recording storage now works end-to-end.

**Roadmap Items Advanced**: [R-3.8.0] (recording complete), Stability improvements

---

### Session Context

**Date**: December 20, 2024  
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
