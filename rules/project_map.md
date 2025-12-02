# Project Map

**Living document tracking patterns, features, and system knowledge.**

---

## Patterns & Conventions

| Pattern | Description | Established In |
|---------|-------------|----------------|
| Convex Function Syntax | Use new function syntax with explicit `args` and `returns` validators | Pre-docs |
| Internal vs Public Functions | `internalQuery/Mutation/Action` for private, `query/mutation/action` for public API | Pre-docs |
| HTTP Webhook Pattern | Webhooks defined in `convex/http.ts` using `httpAction` decorator | Pre-docs |
| Index Naming | All index fields included in name (e.g., `by_user`, `by_debate`) | Pre-docs |
| File-Based Routing | TanStack Router routes in `src/routes/` mirror URL structure | Pre-docs |
| Component File Naming | React components use kebab-case files (e.g., `prep-panel.tsx`) | Pre-docs |
| UI Component Pattern | Reusable UI in `src/ui/`, page routes in `src/routes/` | Pre-docs |
| OpenRouter Wrapper | AI calls go through `convex/lib/openrouter.ts` abstraction | Pre-docs |
| Technique Scoring | Scoring logic centralized in `convex/lib/scoring.ts` | Pre-docs |
| Auth Guard Pattern | Routes under `_auth/` require authentication | Pre-docs |
| Real-time Subscriptions | Use Convex `useQuery` for live data updates | Pre-docs |

---

## Things We Should Know

### Inferred from Sessions

| Insight | Source |
|---------|--------|
| N/A - documentation system just initialized | Chapter 0 |

### Manually Noted

| Insight | Context | Added |
|---------|---------|-------|
| claude-3-opus was causing high costs | Default model was expensive; switched to claude-sonnet-4.5 for analysis | Pre-docs |
| GPT-4o used for prep materials | Quality matters for user-facing prep content | Pre-docs |
| Vapi webhooks require fast response | Must respond within 7.5s; use actions for heavy processing | Pre-docs |
| Debate techniques are from Mehdi Hasan's book | "Win Every Argument" - 11 techniques implemented | Pre-docs |
| Convex SaaS template base | Project started from get-convex/convex-saas template | Pre-docs |

---

## Features

### Voice Debate System

**Marketing Description**
Practice debates anytime with an AI opponent that uses proven debate techniques. Speak naturally, interrupt, and be interrupted just like a real debate.

**Technical Description**  
Integrates Vapi Web SDK for voice AI orchestration. User speech → Deepgram STT → OpenRouter LLM → ElevenLabs TTS. Webhooks send transcripts to Convex for storage and analysis.

**Relevant Files**
- `src/routes/_app/_auth/dashboard/debate.tsx` — Main debate interface with Vapi integration
- `convex/http.ts` — Vapi webhook handler (`/vapi-webhook`)
- `convex/debates.ts` — Debate CRUD operations
- `convex/analysis.ts` — Technique detection and analysis

**Key Functions**
- `debates.create()` — Create new debate record
- `debates.addTranscript()` — Store conversation exchanges
- `debates.complete()` — Mark debate finished

**User Journey Steps**: 1, 2, 3

---

### Technique Detection

**Marketing Description**
Get real-time feedback on your debate techniques. See when you use Concession & Pivot, deploy Receipts, or land a Zinger.

**Technical Description**  
Analyzes transcript exchanges via OpenRouter (Claude Sonnet) to detect 11 debate techniques with effectiveness scores (1-10).

**Relevant Files**
- `convex/analysis.ts` — Analysis logic and queries
- `convex/lib/scoring.ts` — Individual technique scoring functions
- `convex/lib/promptTemplates.ts` — LLM prompts for detection

**Key Functions**
- `analysis.analyzeTranscript()` — Detect techniques in exchange
- `analysis.generateFullAnalysis()` — Post-debate comprehensive analysis
- Scoring functions for each technique (concession_pivot, receipts, zinger, etc.)

**User Journey Steps**: 3, 4

---

### Opponent Profile System

**Marketing Description**
Prepare for real debates by configuring AI with your opponent's actual talking points, style, and difficulty level.

**Technical Description**  
Stores opponent configurations with structured prep materials (openings, arguments, receipts, zingers, closings, opponent intel). AI-generated via GPT-4o.

**Relevant Files**
- `src/routes/_app/_auth/dashboard/opponent-profile.tsx` — Profile management
- `convex/opponents.ts` — Opponent CRUD and field updates
- `convex/actions/prep.ts` — Prep materials generation
- `convex/actions/prepGeneration.ts` — AI generation logic

**Key Functions**
- `opponents.create()` — Create opponent profile
- `opponents.updateStrategy()` — Save AI-generated prep materials
- `opponents.updateSelection()` — Track user's selected materials

**User Journey Steps**: 5, 6

---

### Prep Materials Panel

**Marketing Description**
Access your prepared materials during live debates with a floating toggle panel. Review openings, arguments, and counters in real-time.

**Technical Description**  
Bottom sheet component (`PrepPanel`) accessible via floating button during debates. Displays user's selected prep materials organized by category.

**Relevant Files**
- `src/ui/prep-panel.tsx` — Panel component with tabs
- `src/routes/_app/_auth/dashboard/prep.tsx` — Pre-debate prep screen

**Key Functions**
- `PrepPanel` — React component for materials display

**User Journey Steps**: 6, 3

---

### Post-Debate Analysis

**Marketing Description**
Get comprehensive feedback after each debate: technique usage, effectiveness scores, missed opportunities, and personalized improvement tips.

**Technical Description**  
Generates full analysis via Claude after debate ends. Stores summaries, technique breakdowns, key moments, and winner determination.

**Relevant Files**
- `src/routes/_app/_auth/dashboard/analysis.tsx` — Analysis display page
- `convex/analysis.ts` — Analysis generation and queries

**Key Functions**
- `analysis.generateFullAnalysis()` — Create comprehensive report
- `analysis.getAnalysis()` — Retrieve analysis for display

**User Journey Steps**: 4

---

### Authentication & Billing

**Marketing Description**
Secure login with email verification and flexible subscription plans powered by Stripe.

**Technical Description**  
Convex Auth for authentication (email OTP, social logins). Stripe integration for subscriptions with webhook handling.

**Relevant Files**
- `convex/auth.ts` — Auth configuration
- `convex/stripe.ts` — Stripe webhook handling
- `convex/schema.ts` — users, plans, subscriptions tables
- `src/routes/_app/login/` — Login flow

**Key Functions**
- `auth.getUserId()` — Get authenticated user
- Stripe webhook handlers for subscription lifecycle

**User Journey Steps**: 0 (prerequisite)

---

### Research Mode

**Marketing Description**
Automatically research your debate topic with web scraping. Get relevant articles and evidence to strengthen your arguments.

**Technical Description**  
Uses Firecrawl v2 API to search and scrape web articles based on debate topic. Articles are stored with opponent profile and displayed in the Research tab during prep.

**Relevant Files**
- `convex/lib/firecrawl.ts` — Firecrawl v2 API wrapper (`searchAndScrape`)
- `convex/research.ts` — Research storage (`get`, `store`)
- `convex/actions/research.ts` — `gatherEvidence` action
- `src/routes/_app/_auth/dashboard/prep.tsx` — Research tab display

**Key Functions**
- `searchAndScrape()` — Search Firecrawl and scrape top results
- `gatherEvidence()` — Action that searches, scrapes, and stores articles
- `research.get()` — Query to retrieve research for opponent
- `research.store()` — Mutation to save research articles

**User Journey Steps**: 5, 6

---

## User Journey

| Step | Name | Description |
|------|------|-------------|
| 0 | Authentication | User signs up or logs in |
| 1 | Dashboard | User sees debate history and options |
| 2 | Start Debate | User clicks to begin a practice debate |
| 3 | Live Debate | Real-time voice conversation with AI opponent |
| 4 | Analysis | User reviews post-debate performance feedback |
| 5 | Opponent Setup | User configures opponent with topic, position, style |
| 6 | Prep Review | User reviews/edits generated prep materials |
| 7 | Challenge | User initiates debate against configured opponent |

---

## Feature-to-Journey Map

| Feature | Journey Steps |
|---------|---------------|
| Voice Debate System | 1, 2, 3 |
| Technique Detection | 3, 4 |
| Opponent Profile System | 5, 6 |
| Prep Materials Panel | 3, 6 |
| Post-Debate Analysis | 4 |
| Authentication & Billing | 0 |
| Research Mode | 5 |

---

## Architecture Notes

### Tech Stack
- **Framework**: Vite + React + TanStack Router
- **Backend**: Convex (serverless functions + real-time database)
- **Voice AI**: Vapi (orchestrates Deepgram STT, OpenRouter LLM, ElevenLabs TTS)
- **AI/LLM**: OpenRouter (Claude Sonnet for analysis, GPT-4o for generation)
- **Auth**: Convex Auth (email OTP, social logins)
- **Payments**: Stripe (subscriptions)
- **Hosting**: Netlify (static frontend)
- **Styling**: TailwindCSS + shadcn/ui

### Integration Points

| Service | Purpose | Config Location |
|---------|---------|-----------------|
| Vapi | Voice AI pipeline | VITE_VAPI_PUBLIC_API_KEY |
| OpenRouter | LLM access | OPENROUTER_API_KEY (Convex env) |
| Stripe | Payments | STRIPE_SECRET_KEY (Convex env) |
| Resend | Email | RESEND_API_KEY (Convex env) |
| Firecrawl | Web scraping | FIRECRAWL_API_KEY (Convex env) |

### Key Architectural Decisions

| Decision | Reasoning | Chapter |
|----------|-----------|---------|
| Vapi over custom voice pipeline | Faster to market, handles interruptions/turn-taking | Pre-docs |
| Convex over traditional backend | Real-time subscriptions, serverless, TypeScript | Pre-docs |
| OpenRouter over direct LLM APIs | Flexibility to switch models, unified API | Pre-docs |
| Transient Vapi assistants | Dynamic configuration per debate, no dashboard assistant needed | Pre-docs |
| Claude Sonnet for analysis | Cost optimization (10x cheaper than Opus) | Pre-docs |
| GPT-4o for prep generation | Quality matters for user-facing content | Pre-docs |
| Webhook-based transcript analysis | Decouples LLM from Vapi call, allows heavier processing | Pre-docs |

---

## Database Tables

| Table | Purpose | Key Indexes |
|-------|---------|-------------|
| users | User accounts with auth data | by_email, by_customerId |
| debates | Debate sessions | by_user |
| exchanges | Turn-by-turn transcript | by_debate |
| techniques | Detected technique instances | by_debate, by_exchange |
| analyses | Post-debate analysis reports | by_debate |
| opponents | Opponent profiles with prep | by_user |
| research | Web research for opponents | by_opponent |
| plans | Subscription plans | by_key, by_stripeId |
| subscriptions | User subscriptions | by_userId, by_stripeId |
