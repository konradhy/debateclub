e# Roadmap

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

**Active Phase**: Phase 4 - Monetization & Business Model (🔄 In Progress)

**Next Up**: Phase 5 - Prep Materials Enhancement

**Relevant DEV_JOURNAL Chapters**: Pre-docs, Ch.1-19

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

**Status**: 🔄 (Payment integration complete, cost monitoring complete, testing in progress)

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

## Phase 5: Prep Materials Enhancement

**Goal**: Improve quality and usability of generated prep materials

**Status**: ⬜

**Chapters**: —

---

### 5.1 Research Integration

**Description**: Click-to-send extracted research to study mode

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **5.1.1** — Click handlers for extracted arguments, receipts, openers, zingers, counter-arguments
- ⬜ **5.1.2** — Auto-populate into quick reference section in study mode
- ⬜ **5.1.3** — Fix research data appending logic (preserve existing + accumulate new items)
- ⬜ **5.1.4** — Visual feedback for sent items

---

### 5.2 Content Enhancement

**Description**: Add example quotes and deployment guidance

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **5.2.1** — Argument frame example quotes showing framework in action
- ⬜ **5.2.2** — Receipt deployment examples demonstrating usage in debates
- ⬜ **5.2.3** — Update generation prompts to include examples
- ⬜ **5.2.4** — UI components to display examples without clutter

---

### 5.3 Prep Material Controls

**Description**: Edit and customize prep materials

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **5.3.1** — Edit opponent intelligence UI and mutation
- ⬜ **5.3.2** — Investigate why edit wasn't originally included
- ⬜ **5.3.3** — Adjustable opening/closing statement length
- ⬜ **5.3.4** — Check book recommendations for optimal statement length
- ⬜ **5.3.5** — Length configuration UI (slider or presets)

---

### 5.4 Debate Summary Booklet

**Description**: Skimmable 7-minute read summarizing the debate argument

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **5.4.1** — Design booklet format and structure
- ⬜ **5.4.2** — Generate summary using LLM (position, key arguments, strategy)
- ⬜ **5.4.3** — Reading time estimation
- ⬜ **5.4.4** — Print/export functionality

---

### 5.5 Analysis Page Enhancements

**Description**: Link to resources and further reading

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **5.5.1** — Link analysis page to appropriate scenario blog posts
- ⬜ **5.5.2** — Recommend books for further reading
- ⬜ **5.5.3** — Recommend relevant studies
- ⬜ **5.5.4** — Create mapping of topics to resources (SEO value)

---

## Phase 6: Evidence Sourcing & Performance Optimization

**Goal**: AI agent to find supporting evidence with source URLs and optimize perceived wait time

**Status**: ⬜

**Chapters**: —

**Note**: Performance optimization requires extensive pipeline rewiring - potentially the hardest subsection in this phase. Need to verify feasibility of each approach with current architecture.

---

### 6.1 Evidence Agent Architecture

**Description**: Build AI agent for evidence sourcing

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **6.1.1** — Agent design and prompt engineering
- ⬜ **6.1.2** — Source URL verification and validation
- ⬜ **6.1.3** — Accountability logging (reasoning for each source inclusion)
- ⬜ **6.1.4** — Error handling for failed searches

---

### 6.2 Argument Frame Evidence

**Description**: Populate evidenceIds arrays in argument frames

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **6.2.1** — Use evidenceNeeded descriptions to find relevant receipts
- ⬜ **6.2.2** — Search external sources when receipts insufficient
- ⬜ **6.2.3** — Populate evidenceIds array linking to sources
- ⬜ **6.2.4** — Decide: modify generation prompts vs post-processing

---

### 6.3 Opponent Intelligence Evidence

**Description**: Add actual source URLs to opponent intelligence

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **6.3.1** — Replace text descriptions with actual source URLs in opponent arguments
- ⬜ **6.3.2** — Add supporting evidence field to counter-arguments
- ⬜ **6.3.3** — Schema modifications for new evidence fields
- ⬜ **6.3.4** — Expandable UI elements to display evidence without clutter

---

### 6.4 Instant Feedback System

**Description**: Show preliminary content immediately

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **6.4.1** — Generate AI placeholder/"flash" content instantly
- ⬜ **6.4.2** — Display with clear "preliminary" caveat
- ⬜ **6.4.3** — Replace with real content when ready
- ⬜ **6.4.4** — Smooth transition animations

---

### 6.5 Progressive Streaming

**Description**: Display fields as they populate in real-time

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **6.5.1** — Stream partial results as generation completes
- ⬜ **6.5.2** — Update UI incrementally (don't wait for all fields)
- ⬜ **6.5.3** — WebSocket or SSE for real-time updates
- ⬜ **6.5.4** — Loading skeleton for unpopulated fields

---

### 6.6 Parallel Processing

**Description**: Run independent tasks concurrently

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **6.6.1** — Identify which generation steps can run in parallel
- ⬜ **6.6.2** — Refactor generation pipeline for concurrency
- ⬜ **6.6.3** — UI shows multiple items generating simultaneously
- ⬜ **6.6.4** — Progress indicators for each parallel task

---

### 6.7 Engaging Status Messages

**Description**: Contextual status messages during processing

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **6.7.1** — Use cheap LLM to generate contextual phrases
- ⬜ **6.7.2** — Context-aware messages ("Analyzing their strongest arguments...")
- ⬜ **6.7.3** — Rotate messages to maintain engagement
- ⬜ **6.7.4** — Timing logic to prevent message spam

---

### 6.8 Timing & Metrics

**Description**: Measure and optimize generation performance

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **6.8.1** — Instrument timing for deep research method
- ⬜ **6.8.2** — Instrument timing for firecrawl method
- ⬜ **6.8.3** — Display actual vs expected timing to users
- ⬜ **6.8.4** — Performance analytics dashboard
- ⬜ **6.8.5** — Create reusable component/hook for wait time patterns

---

## Phase 7: Quality Pass & Calibration

**Goal**: System-wide quality improvements and prompt refinement

**Status**: ⬜

**Chapters**: —

---

### 7.1 AI Interruption Protocol

**Description**: Revise interruption system with different AI modes

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **7.1.1** — Create interrupting vs non-interrupting AI modes
- ⬜ **7.1.2** — Adjust canInterrupt boolean in scenario assistant configs
- ⬜ **7.1.3** — Tune interruptionThreshold settings per mode
- ⬜ **7.1.4** — Update system prompts with interruption instructions
- ⬜ **7.1.5** — Default mode with toggle UI
- ⬜ **7.1.6** — Test interruption behavior across modes

---

### 7.2 Prompt Engineering Review

**Description**: Manual review and calibration of all LLM prompts

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
- ⬜ **7.3.2** — AI explanations for why techniques worked/failed
- ⬜ **7.3.3** — Emotional tone detection in exchanges

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

**Description**: Graceful error handling and well-designed error pages

**Status**: ⬜

**Chapters**: —

#### Tasks

- ⬜ **8.3.1** — Graceful voice failure handling
- ⬜ **8.3.2** — Clear error messages for users
- ⬜ **8.3.3** — Design individual error pages per scenario type
- ⬜ **8.3.4** — Helpful error messages with recovery actions
- ⬜ **8.3.5** — Visual design for error states
- ⬜ **8.3.6** — Test error handling across all scenarios

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

### 8.5 The Social Share
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

---

# Backlog

**Items we know we'll need but aren't in active scope yet.**

---

## Long-Term Features

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

# Phase History

| Phase | Started | Completed | Notes |
|-------|---------|-----------|-------|
| Phase 1 | Pre-docs | Pre-docs | MVP complete |
| Phase 2 | Pre-docs | Pre-docs | Technique detection working |
| Phase 3 | Pre-docs | Dec 2025 | Complete |
