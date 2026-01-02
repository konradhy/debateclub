# Roadmap

**Project scope and execution plan. Phases are added over time. This is the full project lifespan.**

---

## How This Connects

- **ROADMAP.md** (this file) = what we're building toward
- **DEV_JOURNAL.md** = session-by-session record of how we got there
- **PROJECT_MAP.md** = current state of what exists

**Completion criteria**: A task is checked off only after code is merged AND documented in PROJECT_MAP.

**Cross-referencing**:
- DEV_JOURNAL chapters reference roadmap items like `[R-1.2.3]`
- Roadmap tasks reference chapters like `[Ch.5]`

---

## Numbering System
```
Phase.Feature.Task

Example:
1.0.0  = Phase 1 (no specific feature/task)
1.2.0  = Phase 1, Feature 2
1.2.3  = Phase 1, Feature 2, Task 3

Reference format: [R-1.2.3]
```

---

## Status Key

| Symbol | Meaning |
|--------|---------|
| ⬜ | Not started |
| 🔄 | In progress |
| ✅ | Complete (merged + documented) |
| ⏸️ | Paused / blocked |
| 🚫 | Cut from scope |

---

## Current Focus

**Active Phase**: Phase 7 - Quality Pass & Calibration (⬜ Not Started)

**Recently Completed**: Phase 6 - Evidence Sourcing & Performance Optimization (✅ Complete)

**Relevant DEV_JOURNAL Chapters**: Pre-docs, Ch.1-25

---

## Project Scope Summary

### Vision

A voice-based AI debate training platform that teaches users Mehdi Hasan's proven debate techniques through real-time practice with adaptive AI opponents. Users can practice anytime, get immediate feedback on technique usage, and prepare for real debates by configuring AI with actual opponent talking points.

### Scope Boundaries

**In Scope:**
- Voice-based debate practice with AI
- Real-time technique detection (11 Mehdi Hasan techniques)
- Post-debate analysis with scores and feedback
- Opponent profile configuration
- AI-generated prep materials
- Web research for debate topics
- Subscription billing

**Out of Scope:**
- Mobile apps (web-first)
- Live human vs human debates
- Video recording of debates
- Integration with debate organizations
- Famous debates recreation (future)

---

# Phases

---

## Phase 1: MVP - Core Debate Experience

**Goal**: Get a working voice debate from start to finish

**Status**: ✅

**Chapters**: Pre-docs

---

### 1.1 Database Schema

**Description**: Core tables for debates and exchanges

**Status**: ✅

**Chapters**: Pre-docs

#### Tasks

- ✅ **1.1.1** — Create debates table with userId, topic, status, timestamps
- ✅ **1.1.2** — Create exchanges table for turn-by-turn transcript
- ✅ **1.1.3** — Add indexes (by_user, by_debate)

---

### 1.2 Vapi Integration

**Description**: Voice AI pipeline with Vapi SDK

**Status**: ✅

**Chapters**: Pre-docs

#### Tasks

- ✅ **1.2.1** — Install @vapi-ai/web package
- ✅ **1.2.2** — Create Vapi assistant configuration
- ✅ **1.2.3** — Set up webhook endpoint in convex/http.ts
- ✅ **1.2.4** — Handle transcript and end-of-call-report events
- ✅ **1.2.5** — Test voice conversation end-to-end

---

### 1.3 Frontend Debate Interface

**Description**: Basic UI for starting and managing debates

**Status**: ✅

**Chapters**: Pre-docs

#### Tasks

- ✅ **1.3.1** — Create debate route/page component
- ✅ **1.3.2** — Add Start/End Debate buttons
- ✅ **1.3.3** — Add speaking indicators (user/AI)
- ✅ **1.3.4** — Add timer display
- ✅ **1.3.5** — Handle microphone permissions

---

## Phase 2: Technique Detection & Analysis

**Goal**: Teach users debate techniques with real-time feedback

**Status**: ✅

**Chapters**: Pre-docs

---

### 2.1 Technique Detection System

**Description**: Identify techniques in real-time using LLM analysis

**Status**: ✅

**Chapters**: Pre-docs

#### Tasks

- ✅ **2.1.1** — Implement OpenRouter analysis function
- ✅ **2.1.2** — Create transcript webhook → analysis workflow
- ✅ **2.1.3** — Implement effectiveness scoring (1-10)
- ✅ **2.1.4** — Create techniques table in schema

---

### 2.2 Core Techniques Implementation

**Description**: Implement detection for initial set of techniques

**Status**: ✅

**Chapters**: Pre-docs

#### Tasks

- ✅ **2.2.1** — Concession & Pivot detection
- ✅ **2.2.2** — Receipts detection
- ✅ **2.2.3** — Zinger detection

---

### 2.3 Live Feedback UI

**Description**: Show technique badges during debate

**Status**: ✅

**Chapters**: Pre-docs

#### Tasks

- ✅ **2.3.1** — Technique badges appear when detected
- ✅ **2.3.2** — Effectiveness score display
- ⬜ **2.3.3** — Running tally of techniques used
- ⬜ **2.3.4** — Visual highlighting during debate

---

### 2.4 Post-Debate Analysis

**Description**: Comprehensive analysis after debate ends

**Status**: ✅

**Chapters**: Pre-docs

#### Tasks

- ✅ **2.4.1** — Full transcript with annotations
- ✅ **2.4.2** — Technique usage summary
- ✅ **2.4.3** — Effectiveness scores per technique
- ✅ **2.4.4** — One actionable improvement tip

---

## Phase 3: Opponent Preparation & Advanced Features

**Goal**: Enable preparation for real debates

**Status**: ✅ (Complete)

**Chapters**: Pre-docs, Ch.1-5

---

### 3.1 Opponent Profile System

**Description**: Create and manage opponent configurations

**Status**: ✅

**Chapters**: Pre-docs

#### Tasks

- ✅ **3.1.1** — Create opponent profile form
- ✅ **3.1.2** — Topic/position/style/difficulty configuration
- ✅ **3.1.3** — Save/load profiles
- ✅ **3.1.4** — List opponents in dashboard

---

### 3.2 AI-Generated Prep Materials

**Description**: Generate comprehensive prep materials using GPT-4o

**Status**: ✅

**Chapters**: Pre-docs

#### Tasks

- ✅ **3.2.1** — Opening statement generation (75-90 words)
- ✅ **3.2.2** — Argument frames with evidence
- ✅ **3.2.3** — Receipts (facts, statistics, quotes)
- ✅ **3.2.4** — Zingers (memorable one-liners)
- ✅ **3.2.5** — Closing options (peroration)
- ✅ **3.2.6** — Opponent intel with counters
- ✅ **3.2.7** — Quality validation with logging

---

### 3.3 Prep Screen & Materials Access

**Description**: Review and edit prep materials before/during debates

**Status**: ✅

**Chapters**: Pre-docs

#### Tasks

- ✅ **3.3.1** — Pre-debate prep screen with editable materials
- ✅ **3.3.2** — Toggle panel during live debate (floating button)
- ✅ **3.3.3** — Dashboard flow: Challenge → Prep → Debate
- ✅ **3.3.4** — Smooth animations and responsive design

---

### 3.4 Custom Debate Configuration

**Description**: Full debate customization options

**Status**: 🔄

**Chapters**: Pre-docs

#### Tasks

- ✅ **3.4.1** — Topic/position/style/difficulty selection
- ⬜ **3.4.2** — Topic generation suggestions (AI suggests topics)
- ⬜ **3.4.3** — Document upload for context

---

### 3.5 All 11 Techniques

**Description**: Implement detection for all Mehdi Hasan techniques

**Status**: ✅

**Chapters**: Pre-docs

#### Tasks

- ✅ **3.5.1** — Concession & Pivot, Receipts, Zinger (from Phase 2)
- ✅ **3.5.2** — Reframing
- ✅ **3.5.3** — Preemption
- ✅ **3.5.4** — Provocative Question
- ✅ **3.5.5** — Personal Story
- ✅ **3.5.6** — Rule of Three
- ✅ **3.5.7** — Peroration
- ✅ **3.5.8** — Gish Gallop
- ✅ **3.5.9** — Strategic Interruption
- ✅ **3.5.10** — Scoring functions in convex/lib/scoring.ts

---

### 3.6 Enhanced Analysis

**Description**: Improved post-debate analysis

**Status**: ✅

**Chapters**: Pre-docs

#### Tasks

- ✅ **3.6.1** — Winner determination
- ✅ **3.6.2** — Key moments identification
- ✅ **3.6.3** — Missed opportunity detection (3-5 per analysis)

---

### 3.7 Cost Optimization

**Description**: Reduce API costs while maintaining quality

**Status**: ✅

**Chapters**: Pre-docs

#### Tasks

- ✅ **3.7.1** — Switch from claude-3-opus to claude-sonnet-4.5 (10x cheaper)
- ✅ **3.7.2** — Keep GPT-4o for prep materials generation
- ✅ **3.7.3** — Remove unnecessary max_tokens restrictions

---

### 3.8 Debate History & Recording Storage

**Description**: Store debate recordings and provide history view with performance tracking

**Status**: ✅

**Chapters**: Ch.5, Ch.5.1

#### Tasks

- ✅ **3.8.1** — Cloudflare R2 integration via `@convex-dev/r2` component
- ✅ **3.8.2** — Store recordings from Vapi `end-of-call-report` webhook
- ✅ **3.8.3** — `recordingKey` field in debates table
- ✅ **3.8.4** — Debate history page (`/dashboard/history`)
- ✅ **3.8.5** — Audio playback with signed R2 URLs
- ✅ **3.8.6** — Performance trend charts (Recharts)
- ✅ **3.8.7** — Hasan score display per debate

---

### 3.9 Opponent Management

**Description**: CRUD operations for opponent profiles

**Status**: ✅

**Chapters**: Ch.5

#### Tasks

- ✅ **3.9.1** — Delete opponent with cascade deletion
- ✅ **3.9.2** — Cascade delete related research, prepProgress, prepChat

---

### 3.10 Enhanced Opponent Profile & Strategic Brief

**Description**: Comprehensive context capture for audience, opponent, and user preferences with Strategic Brief pattern for AI prompt integration

**Status**: ✅

**Chapters**: Ch.7

#### Tasks

- ✅ **3.10.1** — Audience context fields (5 fields: description, type, size, disposition, format)
- ✅ **3.10.2** — Opponent intelligence fields (14 fields: background, credentials, style, statements, contradictions, triggers, steelmanning)
- ✅ **3.10.3** — User context fields (4 fields: research, key points, avoidance, tone)
- ✅ **3.10.4** — Strategic Brief builder (`convex/lib/strategicBrief.ts`)
- ✅ **3.10.5** — Prompt template integration with usage guidance
- ✅ **3.10.6** — Collapsible form UI with progressive disclosure
- ✅ **3.10.7** — Prep chat awareness of strategic context

---

## Phase 4: Monetization & Business Model

**Goal**: Implement revenue system with multi-tiered access control

**Status**: ✅ (Complete)

**Chapters**: Ch.16, Ch.17, Ch.18, Ch.19

---

### 4.1 Token Economy System

**Description**: Multi-tiered token system supporting marketing funnel workflow

**Status**: ✅

**Chapters**: Ch.16, Ch.17

#### Tasks

- ✅ **4.1.1** — Token tracking schema (scenario-specific tokens, global tokens, subscription status) [Ch.16]
- ✅ **4.1.2** — Scenario-specific token grants for free trials [Ch.16]
- ✅ **4.1.3** — Per-scenario token purchase flow [Ch.17, Ch.18]
- ✅ **4.1.4** — Full subscription for unlimited access [Ch.17, Ch.18]
- ✅ **4.1.5** — Feature gating based on user's plan/tokens [Ch.16]
- ✅ **4.1.6** — Rate limiting by plan tier [Ch.16]

---

### 4.2 Payment Integration

**Description**: Stripe integration for purchases and subscriptions

**Status**: ✅

**Chapters**: Ch.17, Ch.18

#### Tasks

- ✅ **4.2.1** — Stripe checkout for token purchases [Ch.17, Ch.18]
- ✅ **4.2.2** — Subscription management (create, cancel, upgrade) [Ch.17, Ch.18]
- ✅ **4.2.3** — Webhook handling for payment events [Ch.17, Ch.18]
- ⬜ **4.2.4** — Receipt generation and email confirmations (handled by Stripe automatically)

---

### 4.3 Cost Monitoring & Control

**Description**: Track and manage API costs

**Status**: ✅

**Chapters**: Ch.19

#### Tasks

- ✅ **4.3.1** — Per-debate cost tracking [Ch.19]
- ✅ **4.3.2** — Per-scenario usage analytics [Ch.19]
- ✅ **4.3.3** — Phase-based cost breakdown (research/prep/debate/analysis) [Ch.19]
- ✅ **4.3.4** — Topic-based workflow cost grouping [Ch.19]
- ✅ **4.3.5** — External verification links (OpenRouter, Vapi, Firecrawl dashboards) [Ch.19]
- ✅ **4.3.6** — Accurate Vapi duration tracking via client timer [Ch.19]
- ✅ **4.3.7** — Proper error logging (no silent failures) [Ch.19]

- ✅ **4.3.9** — Gemini cost verification dashboard link

---

### 4.4 Deep Research Billing Integration

**Description**: Premium token-based monetization for Deep Research feature

**Status**: ✅

**Chapters**: Ch.22, Ch.23, Ch.23.1

#### Tasks

- ✅ **4.4.1** — Deep Research UX refactor (remove fork, add modal, optional upgrade) [Ch.22]
- ✅ **4.4.2** — Token consumption on Deep Research completion [Ch.22]
- ✅ **4.4.3** — Deep Research token packs (1/$4, 3/$10, 10/$30) [Ch.23]
- ✅ **4.4.4** — Stripe product setup for Deep Research tokens [Ch.23]
- ✅ **4.4.5** — Premium purchase card on billing page [Ch.23]
- ✅ **4.4.6** — Transaction history display for Deep Research [Ch.23]
- ✅ **4.4.7** — UI polish (spacing, hierarchy, breathing room) [Ch.23.1]

---

## Phase 5: Prep Materials Enhancement

**Goal**: Improve quality and usability of generated prep materials

**Status**: ✅ (Complete)

**Chapters**: Ch.20, Ch.21

---

### 5.1 Research Integration

**Description**: Click-to-send extracted research to study mode

**Status**: ✅

**Chapters**: Ch.20

#### Tasks

- ✅ **5.1.1** — Click handlers for extracted arguments, receipts, openers, zingers, counter-arguments
- ✅ **5.1.2** — Auto-populate into quick reference section in study mode
- ✅ **5.1.3** — Fix research data appending logic (preserve existing + accumulate new items)
- ✅ **5.1.4** — Visual feedback for sent items

---

### 5.2 Content Enhancement

**Description**: Add example quotes and deployment guidance

**Status**: ✅

**Chapters**: Ch.20 

#### Tasks

- ✅ **5.2.1** — Argument frame example quotes showing framework in action [Ch.20]
- ✅ **5.2.2** — Receipt deployment examples demonstrating usage in debates [Ch.20]
- ✅ **5.2.3** — Update generation prompts to include examples [Ch.20]
- ✅ **5.2.4** — UI components to display examples without clutter [Ch.20]

---

### 5.3 Prep Material Controls

**Description**: Edit and customize prep materials

**Status**: ✅

**Chapters**: Ch.20 

#### Tasks

- ✅ **5.3.1** — Edit opponent intelligence UI and mutation [Ch.20]
- ✅ **5.3.2** — Investigate why edit wasn't originally included [Ch.20]


---

### 5.4 Strategic Brief Document

**Description**: 7-minute strategic orientation document that synthesizes all prep materials into a coherent game plan, showing how everything connects

**Status**: ✅

**Chapters**: Ch.21

#### Tasks

- ✅ **5.4.1** — Design booklet format and structure (4-section narrative format)
- ✅ **5.4.2** — Generate summary using LLM (battlefield, architecture, Hasan principles, deployment flow)
- ✅ **5.4.3** — Reading time estimation (word count / 200 WPM)
- ✅ **5.4.4** — UI tab integration with metadata display

---

## Phase 6: Evidence Sourcing & Performance Optimization

**Goal**: Improve research quality control and prep generation UX through user-configurable research settings and progress visibility

**Status**: ✅ (Complete)

**Chapters**: Ch.22, Ch.24, Ch.25

---

### 6.1 Research-Backed Evidence Display

**Description**: Connect argument frames to specific research findings from prep materials

**Status**: ✅

**Chapters**: Ch.22

#### Tasks

- ✅ **6.1.1** — Update ARGUMENT_FRAMES_PROMPT to extract specific findings from research
- ✅ **6.1.2** — Change evidenceNeeded format to "[Source Name]: [Finding] - [Support]"
- ✅ **6.1.3** — Remove "Available Evidence" dead code (evidenceIds linking)
- ✅ **6.1.4** — Update UI label to "Supporting Research:"

---

### 6.2 Research Intensity Settings

**Description**: User-controlled research depth settings (Basic/Aggressive/Deep) to give users control over how thoroughly AI researches topics

**Status**: ✅

**Chapters**: Ch.24

#### Tasks

- ✅ **6.2.1** — Add researchIntensity and articlesPerSearch to users schema
- ✅ **6.2.2** — Create researchIntensity helper with intensity-specific instructions (Basic/Aggressive/Deep)
- ✅ **6.2.3** — Add getResearchSettings and updateResearchSettings mutations
- ✅ **6.2.4** — Refactor agent from module-level constant to createPrepAgent factory function
- ✅ **6.2.5** — Integrate user settings into prep.ts (fetch, create agent, inject instructions)
- ✅ **6.2.6** — Create Research Settings tab in Settings page
- ✅ **6.2.7** — Two-tier control: Research Intensity (primary, prominent) + Articles Per Search (secondary, ghost)
- ✅ **6.2.8** — Default: Aggressive intensity, 5 articles per search

---

### 6.3 Progress Bar Refactoring

**Description**: Fix progress UI broken by parallel generation and eliminate code duplication

**Status**: ✅

**Chapters**: Ch.24

#### Tasks

- ✅ **6.3.1** — Consolidate 10 individual progress boxes to single "Study Guide" box representing parallel generation
- ✅ **6.3.2** — Create PrepProgressSteps reusable component (eliminates duplication)
- ✅ **6.3.3** — Update GenerationProgress.tsx to use PrepProgressSteps
- ✅ **6.3.4** — Update EmptyState.tsx to use PrepProgressSteps
- ✅ **6.3.5** — Center all progress displays (GenerationProgress, EmptyState, GeminiProgress)
- ✅ **6.3.6** — Update progress status messages (generating = "Creating your study guide...")

---

### 6.4 Instant Feedback System

**Description**: Show preliminary content immediately while full content generates

**Status**: ✅ (Partial - Analysis only)

**Chapters**: Ch.25

#### Tasks

- ✅ **6.4.1** — Dual-analysis system: Quick Gemini Flash preview (~10s) + Full Claude analysis (~120s) [Ch.25]
- ✅ **6.4.2** — Progress bar showing full analysis generation status [Ch.25]
- ✅ **6.4.3** — Toggle between quick and full analysis when both exist [Ch.25]
- 🚫 **6.4.4** — Extend to prep materials generation (decided not needed - prep is fast enough)

---

### 6.5 Progressive Streaming

**Description**: Display fields as they populate in real-time

**Status**: 🚫 (Cut - Not needed with dual-analysis approach)

**Chapters**: —

#### Tasks

- 🚫 **6.5.1** — Stream partial results as generation completes (decided against - adds complexity without proportional value)
- 🚫 **6.5.2** — Update UI incrementally (not needed - quick analysis provides immediate value)
- 🚫 **6.5.3** — WebSocket or SSE for real-time updates (over-engineering)
- 🚫 **6.5.4** — Loading skeleton for unpopulated fields (dual-analysis solves this better)

---

### 6.6 Parallel Processing

**Description**: Run independent tasks concurrently

**Status**: ✅

**Chapters**: Ch.25

#### Tasks

- ✅ **6.6.1** — Parallel execution of quick + full analysis [Ch.25]
- ✅ **6.6.2** — Both analyses start simultaneously with 500ms delay [Ch.25]
- ✅ **6.6.3** — UI shows quick analysis while full generates in background [Ch.25]
- ✅ **6.6.4** — Progress indicator for full analysis generation [Ch.25]

---


## Phase 7: Quality Pass & Calibration

**Goal**: System-wide quality improvements and prompt refinement

**Status**: 🔄 (In Progress)

**Chapters**: Ch.26

---

### 7.1 AI Interruption Protocol

**Description**: Rebuild interruption system using proper Vapi speech plans

**Status**: ✅ (Implementation Complete, Testing Pending)

**Chapters**: Ch.26

#### Tasks

- ✅ **7.1.1** — Remove dead code (canInterrupt, interruptionThreshold, endpointing) [Ch.26]
- ✅ **7.1.2** — Create 5 clear interruption modes using Vapi startSpeakingPlan/stopSpeakingPlan [Ch.26]
- ✅ **7.1.3** — Map debate styles to interruption modes dynamically [Ch.26]
- ✅ **7.1.4** — Apply speech plans in debate.tsx with console logging [Ch.26]
- ⬜ **7.1.5** — Test interruption behavior with real voice across all modes
- ⬜ **7.1.6** — Calibrate timing values based on real usage (optional)
- ⬜ **7.1.7** — Add UI indicator showing active interruption mode (Phase 7.2 - optional)
- ⬜ **7.1.8** — User preference override system (Phase 7.2 - optional)

---

Phase 7.1 Test Plan - Interruption System
What We're Testing
Whether the AI's response speed and interruption difficulty actually change based on the debate style you select.

Quick Test (15 minutes)
Setup
Start dev server: npm run dev
Open browser console (F12 → Console tab)
Create account or login
Test 1: Friendly Style (Easy Mode)
Goal: AI should wait ~1.2 seconds before responding, easy to interrupt

Create opponent:

Topic: "Universal Basic Income"
Position: "con"
Style: Friendly
Difficulty: Medium
Start debate

Check console logs:

🎯 Interruption Mode Selection:
  opponentStyle: "friendly"
  selectedMode: "friendly"
  waitSeconds: 1.2
  numWordsToInterrupt: 2
Test behavior:

Say something, then pause mid-thought (1-2 seconds)
AI should wait patiently, not jump in immediately
When AI talks, interrupt with "wait" or "but"
AI should stop easily (2 words is enough)
Expected: Patient AI that's easy to interrupt

Test 2: Gish Gallop Style (Hard Mode)
Goal: AI should respond very fast (~0.3s), very hard to interrupt

Create new opponent:

Same topic
Style: Gish Gallop
Difficulty: Medium
Start debate

Check console logs:

🎯 Interruption Mode Selection:
  opponentStyle: "gish gallop"
  selectedMode: "relentless"
  waitSeconds: 0.3
  numWordsToInterrupt: 6
Test behavior:

Say something, pause briefly
AI should jump in almost immediately (0.3s)
When AI talks, try to interrupt with "wait"
Should be hard - need 6+ words like "wait hold on stop let me speak"
Expected: Aggressive AI that won't shut up

Test 3: Sales Scenario (Non-Debate)
Goal: Verify non-debate scenarios use scenario defaults

Create sales opponent:

Scenario: Sales - Cold Prospect
(No style field - it's not a debate)
Start practice

Check console logs:

🎯 Interruption Mode Selection:
  scenarioCategory: "sales"
  opponentStyle: undefined
  selectedMode: "off"
  waitSeconds: 2.5
Expected: Very patient AI (2.5s wait)

What Success Looks Like
Console Logs Show:
✅ Correct style being read from opponent
✅ Correct mode being selected
✅ Correct speech plan values (waitSeconds, numWords)
Behavior Matches:
✅ Friendly: Patient, easy to interrupt
✅ Gish Gallop: Fast, hard to interrupt
✅ Sales: Very patient
What Failure Looks Like
Console Issues:
❌ selectedMode is always "debate" (not mapping styles)
❌ opponentStyle is undefined for debate scenarios
❌ Speech plan values don't match mode
Behavior Issues:
❌ All debates feel the same regardless of style
❌ AI always responds at same speed
❌ Interruption difficulty doesn't change
Quick Sanity Check (5 minutes)
If you're too tired for full testing:

Create one debate opponent with Gish Gallop style
Start debate
Check console - should see:
selectedMode: "relentless"
waitSeconds: 0.3
numWordsToInterrupt: 6
Try to interrupt AI - should be hard
If console shows correct values, the code is working. Actual behavior testing can wait until you're fresh.

Common Issues to Watch For
Style field is empty: Old opponents might not have style saved
Console shows undefined: Style not being read from opponent
Mode is always "debate": Mapping function not being called
Vapi config missing speech plans: Not being sent to API
When You're Fresh
Test all 6 debate styles:

Friendly → should feel supportive
Aggressive → should feel confrontational
Gish Gallop → should feel overwhelming
Academic → should feel measured
Emotional → should feel passionate
Socratic → should ask lots of questions
The timing and interruption should match the personality.

### 7.2 Prompt Engineering Review

**Description**: Manual review and calibration of all LLM prompts. For this entire phase. Just read it like a man, what makes sense, what isn't. don't use ai here. read. Ai to help organize it sure, but the text only changed by me.  same for 7.3

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **7.2.1** — Organize and document all prompts by generation stage
- ⬜ **7.2.2** — Review full prompt chains (research → strategy → outputs)
- ⬜ **7.2.3** — Calibrate against book methodology
- ⬜ **7.2.4** — Calibrate against common sense and user feedback
- ⬜ **7.2.5** — Refine strategy generation prompts (priority)
- ⬜ **7.2.6** — Improve opening statement prompts
- ⬜ **7.2.7** — Improve receipts and zingers prompts
- ⬜ **7.2.8** — Document prompt purpose and expected outputs

---

### 7.3 Analysis Improvements

**Description**: Enhanced post-debate analysis quality

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **7.3.1** — Better prompts for analysis generation
- Review each prompt do u think it makes sense. read it like a man. 
- fix the techniques error


---

## Phase 8: Polish, UX & Bug Fixes and security

**Goal**: Final polish and bug fixes before launch

**Status**: ⬜

**Chapters**: —

---

### 8.1 Visual Design

**Description**: Custom icons and visual polish

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **8.1.1** — Design custom icon system with consistent theme
- ⬜ **8.1.2** — Use nano banana to generate icons (9 at a time)
- ⬜ **8.1.3** — Use Affinity to isolate and prepare icons
- ⬜ **8.1.4** — Create comprehensive list of needed icons
- ⬜ **8.1.5** — Replace all Lucide icons with custom icons
- ⬜ **8.1.6** — Responsive design for mobile
- ⬜ **8.1.7** — Accessibility improvements
- ⬜ **8.1.8** — Fix ux on minor pages, setting, onboarding, login, forget password etc. Fix the thing it does where it will sometimes sign you in but not redirect you to dashboard
- ⬜ **8.1.10** — Check out convex and tanstack docs and optimize prefetch cashe with appropriate pagination, loading state to make it all snappy and instant and real time. requires u to personally understand so u can guide llm
- ⬜ **8.1.10** — Polished visual design pass
---

### 8.2 Bug Fixes & Investigations

**Description**: Fix known bugs and investigate issues

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **8.2.1** — Investigate scenario context fields (some appear unused in prompts)
- ⬜ **8.2.2** — Fix ignored scenario fields
- ⬜ **8.2.3** — Calibrate Win Every Argument score (too generous, sometimes 11/10)
- ⬜ **8.2.4** — Check if scores are being doubled
- ⬜ **8.2.5** — Review scoring rubric logic
- ⬜ **8.2.6** — Investigate opponent intelligence position flip (pro/con may be reversed)
- ⬜ **8.2.7** — Fix position assignment logic

---

### 8.3 Error Handling & Pages

**Description**: Graceful error handling and well-designed error pages, the goal here isn't overkill. Basic error handling throughtout. Make sure i'm not failing silently and relying on fallbacks anywhere

**Status**: ⬜

**Chapters**: —

#### Tasks
Make sure i'm not failing silently and relying on fallbacks anywhere
- ⬜ **8.3.1** — Graceful voice failure handling
- ⬜ **8.3.2** — Clear error messages for users
- ⬜ **8.3.3** — Design individual error pages per scenario type
- ⬜ **8.3.4** — Helpful error messages with recovery actions
- ⬜ **8.3.5** — Visual design for error states
- ⬜ **8.3.6** — Test error handling across all scenarios
Make sure i'm not failing silently and relying on fallbacks anywhere
---

### 8.4 User Onboarding

**Description**: First-time user experience

**Status**: ⬜

**Chapters**: —


#### Tasks

- ⬜ **8.4.1** — Tutorial debate (guided)
- ⬜ **8.4.2** — Technique explainer screens
- ⬜ **8.4.3** — Sample debates to watch
- ⬜ **8.4.4** — First-time user flow

---

### 8.5 The Social Share (EDIT MOVE TO MID TERM )
**description** You can ask for credits by sharing something to twitter. So essentially. Click button on purchase page for a scenario and you share on twitter "As a doctor, i'm leveling up my xyz by practicing abc on Debate Club. Check it out". Occurs when you run out of credits or want to purchase a scenario there's a ghost "fyi". 
- ⬜ **8.5.1** —



### 8.6 Security
**description** go through every function starting with high abuse ones first. And ensure that the right auth and access is occuring. Prefer internal functions when you can, and be careful the wrong person can't access.
- ⬜ **8.5.1** —


## Phase 9: SEO & Indexability

**Goal**: Search engine optimization for public pages

**Status**: 🔄

**Chapters**: —

**Priority**: LOW

---

### 9.1 Meta Tags & Open Graph

**Description**: Page metadata for SEO and social sharing

**Status**: 🔄

**Chapters**: —

#### Tasks

- ✅ **9.1.1** — SSR enabled for public pages (TanStack Start migration)
- ⬜ **9.1.2** — Unique `<title>` and `<meta description>` per route via `head()`
- ⬜ **9.1.3** — Open Graph tags (og:title, og:description, og:image) for social sharing
- ⬜ **9.1.4** — Twitter Card meta tags

---

### 9.2 Structured Data

**Description**: JSON-LD schema for rich search results

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **9.2.1** — JSON-LD Article schema for blog posts
- ⬜ **9.2.2** — Organization schema on homepage
- ⬜ **9.2.3** — FAQ schema where applicable

---

### 9.3 Technical SEO

**Description**: Sitemap, robots.txt, canonical URLs

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **9.3.1** — XML sitemap (`/sitemap.xml`)
- ⬜ **9.3.2** — robots.txt in `/public`
- ⬜ **9.3.3** — Canonical URLs via `head()` links
- ⬜ **9.3.4** — Submit sitemap to Google Search Console

---

### 9.4 Performance & Core Web Vitals

**Description**: Image optimization and performance metrics

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **9.4.1** — Image optimization (WebP, lazy loading)
- ⬜ **9.4.2** — Lighthouse audit and CWV improvements

---

### 9.5 Content Indexability

**Description**: Public content for SEO value (Future)

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **9.5.1** — Evaluate public debate transcripts for SEO value
- ⬜ **9.5.2** — Topic landing pages aggregating debates
- ⬜ **9.5.3** — Technique showcase pages with real examples



## Technical Debt

| Item | Introduced In | Priority |
|------|---------------|----------|
| Some public mutations missing return validators | Pre-docs | Low |
| v.any() used in opponent field types | Pre-docs | Med |
| Running tally UI not implemented | Pre-docs | Low |
| Scenario context fields not used in prompts | Dec 2025 | High |
| Win Every Argument score too generous (11/10 possible) | Dec 2025 | Med |
| Opponent intelligence pro/con positions may be flipped | Dec 2025 | Med |

---


---

# Backlog

**Items we know we'll need but aren't in active scope yet.**

---

## Long-Term Features

### Analysis Page Enhancements

Link post-debate analysis to resources and further reading for continued learning.

**Description**: Connect analysis pages to scenario blog posts, books, and research papers relevant to the debate topic

**Status**: ⬜

#### Tasks

- ⬜ Link analysis page to appropriate scenario blog posts
- ⬜ Recommend books for further reading
- ⬜ Recommend relevant studies
- ⬜ Create mapping of topics to resources (SEO value)

---

### Skill-Specific Practice Drills

Add the ability for users to set what specific skill they want to improve and practice it through targeted drills or get specific analysis. This enables conscious practice on individual debate elements. Start by creating a single drill from the book, monitor usage, then expand based on user engagement.

---

### Internationalization (i18next)

Translate all pages to multiple languages using i18next or alternative. Implement slowly and steadily. Create a bug tracker so users can report grammar or language-related bugs. Show a warning when users use non-English languages that their help will be needed for quality assurance.

---

### Story Mode

Create a narrative-driven debate training experience that includes homework assignments for real life, drills from the book, and automatic sorting of practice activities. This mode guides users through structured learning with real-world application.

---

### Legal Mode

Implement a specialized debate mode that follows the rules and procedures of Jamaican court. This includes proper legal debate format, objection handling, and courtroom-specific argumentation techniques.

---

### Podcast Mode

Add a conversational debate format focused on back-and-forth communication about topics rather than competitive debate. This mode emphasizes discussion and exploration of ideas in a podcast-style format.

---

### Interview Mode

Create an interview-style practice mode where users can practice handling questions and presenting their positions in an interview format rather than formal debate structure.

---

### Multiplayer Mode

Build a feature allowing users to challenge others to debates, either friends via direct links or random opponents from the platform. The system includes a debate coach that listens in, follows a set debate structure, and generates sharable links so friends or the public can vote on the winner. This mode should be designed to appeal to streamers and influencers who want to showcase their debate skills.

---

## Candidate Features

| Item | Notes | Promoted To |
|------|-------|-------------|
| Progress tracking | Track technique mastery over time | [R-3.8.6] ✅ |

---

## Ideas / Maybe

- Video recording of debates

---
# Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Phase 1 | Pre-docs | Pre-docs | MVP complete |
| Phase 2 | Pre-docs | Pre-docs | Technique detection working |
| Phase 3 | Pre-docs | Dec 2025 | Complete |
| Phase 4 | Dec 2025 | Dec 31, 2025 | Monetization complete (Ch.16-19, Ch.22-23.1) |
| Phase 5 | Dec 2025 | Dec 31, 2025 | Prep enhancement complete (Ch.20-21) |
| Phase 6 | Dec 31, 2025 | Jan 1, 2026 | Evidence & performance complete (Ch.22, Ch.24, Ch.25) |
| Phase 7 | Jan 1, 2026 | In Progress | Interruption system rebuild (Ch.26) - testing pending |

