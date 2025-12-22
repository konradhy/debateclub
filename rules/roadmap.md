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

**Active Phase**: Phase 3 - Opponent Preparation & Advanced Features (✅ Complete)

**Next Up**: Phase 4 - Polish, Optimization & Launch

**Relevant DEV_JOURNAL Chapters**: Pre-docs, Ch.1-7

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

## Phase 4: Polish, Optimization & Launch

**Goal**: Production-ready platform

**Status**: ⬜

**Chapters**: —

---

### 4.1 Error Handling & Reliability

**Description**: Graceful failure handling

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **4.1.1** — Graceful voice failure handling
- ⬜ **4.1.2** — Clear error messages for users

---

### 4.2 Advanced Features

**Description**: Additional features for enhanced experience

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **4.2.1** — Friendly debate mode (casual style)
- ⬜ **4.2.2** — Voice selection for AI opponents
- ⬜ **4.2.3** — Debate formats (Oxford, Parliamentary, Lincoln-Douglas)
- ⬜ **4.2.4** — Practice modes (technique-specific drills)
- ⬜ **4.2.5** — Coach mode (more aggressive hints)

---

### 4.3 Cost Monitoring & Control

**Description**: Track and manage API costs

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **4.3.1** — Per-debate cost tracking
- ⬜ **4.3.2** — Usage analytics
- ⬜ **4.3.3** — Budget alerts

---

### 4.4 User Onboarding

**Description**: First-time user experience

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **4.4.1** — Tutorial debate (guided)
- ⬜ **4.4.2** — Technique explainer screens
- ⬜ **4.4.3** — Sample debates to watch
- ⬜ **4.4.4** — First-time user flow

---

### 4.5 Polish & UX

**Description**: Visual and interaction improvements

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **4.5.1** — Responsive design for mobile
- ⬜ **4.5.2** — Accessibility improvements
- ⬜ **4.5.3** — Loading states and animations
- ⬜ **4.5.4** — Polished visual design

---

### 4.6 Documentation

**Description**: User-facing documentation

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **4.6.1** — User guide
- ⬜ **4.6.2** — Video tutorials
- ⬜ **4.6.3** — FAQ
- ⬜ **4.6.4** — Troubleshooting guide

---

## Phase 5: Enhanced Analysis & Intelligence

**Goal**: Advanced technique detection and emotional intelligence

**Status**: ⬜

**Chapters**: —

---

### 5.1 Analysis Improvements

**Description**: Better AI explanations and detection

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **5.1.1** — Improved prompts for technique detection
- ⬜ **5.1.2** — Enhanced AI explanations for technique decisions
- ⬜ **5.1.3** — Vapi emotion detection integration
- ⬜ **5.1.4** — Strategic interruption detection refinement

---

### 5.2 Research Mode (Firecrawl)

**Description**: Web research and evidence gathering via Firecrawl

**Status**: ✅

**Chapters**: Pre-docs

#### Tasks

- ✅ **5.2.1** — Firecrawl v2 API integration (`convex/lib/firecrawl.ts`)
- ✅ **5.2.2** — `gatherEvidence` action for search + scrape
- ✅ **5.2.3** — Store articles with opponent profile
- ✅ **5.2.4** — Research tab in prep UI
- ⬜ **5.2.5** — AI summarization of articles (currently uses first 200 chars)

---

# Backlog

**Items we know we'll need but aren't in active scope yet.**

---

## Candidate Features

| Item | Notes | Promoted To |
|------|-------|-------------|
| Progress tracking | Track technique mastery over time | [R-3.8.6] ✅ |


---

## Ideas / Maybe

- Video recording of debates



---

## Technical Debt

| Item | Introduced In | Priority |
|------|---------------|----------|
| Some public mutations missing return validators | Pre-docs | Low |
| v.any() used in opponent field types | Pre-docs | Med |
| Running tally UI not implemented | Pre-docs | Low |

---

# Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Phase 1 | Pre-docs | Pre-docs | MVP complete |
| Phase 2 | Pre-docs | Pre-docs | Technique detection working |
| Phase 3 | Pre-docs | Dec 2025 | Complete |
