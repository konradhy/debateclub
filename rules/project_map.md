# Project Map

**Current architecture and codebase structure. Updated as features are added.**

**Last Updated**: December 31, 2025 (Chapter R-5.3 - Phase 5.3 Complete)

---

## How This Connects

- **PROJECT_MAP.md** (this file) = what currently exists
- **DEV_JOURNAL.md** = how we got here (Chapters 0-12, rich implementation details)
- **dev_journal_2.md** = continuation (Chapters 13-19+, current chapters)
- **ROADMAP.md** = where we're going

---

## Directory Structure

```
orator/
├── app/                          # TanStack Start SSR entrypoint
│   ├── routes/                   # SSR-enabled routes (login, onboarding)
│   │   ├── __root.tsx           # Root route with full HTML document
│   │   └── _app/                # App routes (CSR, ssr: false)
│   └── ssr.tsx                  # SSR configuration
│
├── convex/                       # Backend (Convex functions)
│   ├── _generated/              # Auto-generated Convex types
│   ├── actions/                 # External API calls (Node.js runtime)
│   │   ├── analysisAction.ts    # Post-debate analysis generation
│   │   ├── geminiPrep.ts        # Gemini Deep Research orchestration
│   │   ├── genericPrep.ts       # Non-debate prep generation
│   │   ├── prep.ts              # Prep material orchestration
│   │   ├── prepChatAction.ts    # RAG chatbot action
│   │   ├── prepGeneration.ts    # AI content generation
│   │   └── research.ts          # Firecrawl web research
│   ├── lib/                     # Shared utilities
│   │   ├── aiConfig.ts          # Centralized AI model configuration
│   │   ├── firecrawl.ts         # Firecrawl v2 API client
│   │   ├── geminiDeepResearch.ts # Gemini Deep Research API
│   │   ├── geminiSearch.ts      # Gemini Search for source extraction
│   │   ├── monetization.ts      # Token pricing/limits constants
│   │   ├── openrouter.ts        # OpenRouter API client
│   │   ├── promptTemplates.ts   # AI prompt templates
│   │   ├── scoring.ts           # Hasan score calculation
│   │   └── strategicBrief.ts    # Strategic Brief builder (Ch.7)
│   ├── scenarios/               # Backend scenario configurations
│   │   ├── types.ts             # Scenario type definitions
│   │   ├── index.ts             # Scenario registry
│   │   ├── debate.ts            # Debate scenario config
│   │   ├── sales.ts             # Sales scenarios config
│   │   ├── entrepreneur.ts      # Entrepreneur scenarios config
│   │   └── healthcare.ts        # Healthcare scenarios config
│   ├── email/                   # Email templates
│   ├── otp/                     # Password auth & OTP
│   ├── analysis.ts              # Analysis queries and mutations
│   ├── auth.config.ts           # Convex Auth configuration
│   ├── auth.ts                  # Auth providers (Password, GitHub)
│   ├── cleanup.ts               # Database cleanup functions
│   ├── convex.config.ts         # App config (components registration)
│   ├── crons.ts                 # 9 scheduled cleanup jobs
│   ├── debates.ts               # Debate CRUD and queries
│   ├── geminiResearchProgress.ts # Gemini research progress tracking
│   ├── http.ts                  # HTTP endpoints (Vapi webhooks)
│   ├── opponents.ts             # Opponent profile management
│   ├── prepChat.ts              # RAG chatbot queries/mutations
│   ├── prepProgress.ts          # Generation progress tracking
│   ├── r2.ts                    # Cloudflare R2 recording storage
│   ├── research.ts              # Research storage
│   ├── schema.ts                # Database schema (SOURCE OF TRUTH)
│   ├── tokens.ts                # Token economy (grants, consumption)
│   └── users.ts                 # User management
│
├── src/
│   ├── components/              # Feature-specific components
│   │   ├── blog/                # Blog post components
│   │   ├── marketing/           # Landing page sections
│   │   │   └── landing-page/    # Hero, Features, Pricing, etc.
│   │   ├── prep/                # Prep page components (Ch.15 refactor)
│   │   │   ├── ChatTab.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── GeminiProgress.tsx
│   │   │   ├── GeminiReportTab.tsx
│   │   │   ├── GenerationProgress.tsx
│   │   │   ├── MyResearchTab.tsx
│   │   │   ├── PrepHeader.tsx
│   │   │   ├── ProgressStep.tsx
│   │   │   ├── QuickRefDebate.tsx
│   │   │   ├── QuickRefGeneric.tsx
│   │   │   ├── ResearchTab.tsx
│   │   │   ├── StudyModeDebate.tsx   # 1,018 lines
│   │   │   └── StudyModeGeneric.tsx  # 380 lines
│   │   └── TokenBalance.tsx     # Token display component
│   │
│   ├── hooks/                   # Custom React hooks
│   │   └── prep/                # Prep page hooks (Ch.15 refactor)
│   │       ├── usePrepChat.ts
│   │       ├── usePrepData.ts
│   │       └── usePrepHandlers.ts
│   │
│   ├── routes/                  # TanStack Router pages (CSR)
│   │   └── _app/
│   │       ├── _auth/dashboard/
│   │       │   ├── _layout.index.tsx     # Dashboard home (opponent list)
│   │       │   ├── _layout.admin.tsx     # Admin panel (grant links)
│   │       │   ├── _layout.settings.tsx  # Settings layout
│   │       │   ├── _layout.settings.billing.tsx  # Billing & tokens
│   │       │   ├── analysis.tsx          # Post-debate analysis view
│   │       │   ├── debate.tsx            # Live debate interface
│   │       │   ├── history.tsx           # Debate history & performance
│   │       │   ├── opponent-profile.tsx  # Opponent config (config-driven)
│   │       │   └── prep.tsx              # Prep materials (486 lines)
│   │       ├── claim.$token.tsx      # Marketing funnel grant claim page
│   │       └── login/                # Login page
│   │
│   ├── scenarios/               # Frontend scenario configurations
│   │   ├── types.ts             # ScenarioConfig, FormSection, etc.
│   │   ├── index.ts             # SCENARIOS registry (7 scenarios)
│   │   ├── debate.ts            # Debate scenario with formLayout
│   │   ├── sales.ts             # 3 sales scenarios
│   │   └── entrepreneur.ts      # 3 entrepreneur scenarios
│   │
│   └── ui/                      # Reusable UI components (shadcn/ui)
│       ├── accordion.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── dashboard-header.tsx
│       ├── inline-edit.tsx      # Inline CRUD editing
│       ├── input.tsx
│       ├── popover.tsx          # Ghost link scenario selector
│       ├── radio-group.tsx
│       ├── select.tsx
│       ├── tabs.tsx
│       └── ... (other UI primitives)
│
├── rules/                       # AI documentation system
│   ├── dev_journal.md           # Chapters 0-11 (full details)
│   ├── dev_journal_2.md         # Chapters 12-17 (current)
│   ├── directive.md             # AI behavior guidelines
│   ├── project_map.md           # This file
│   ├── roadmap.md               # Feature roadmap
│   ├── MONETIZATION_*.md        # Token economy documentation
│   └── gemini_models.md         # Gemini API reference
│
├── docs/                        # Additional documentation
├── marketing-plans/             # Blog content, scenario marketing
└── public/                      # Static assets
```

---

## Database Schema

**Source of Truth**: `convex/schema.ts`

### Core Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `users` | User accounts | `email`, `isAdmin`, `stripeCustomerId` |
| `debates` | Debate/practice sessions | `userId`, `topic`, `status`, `scenarioType`, `opponentId`, `vapiCallId`, `recordingKey` |
| `exchanges` | Turn-by-turn transcript | `debateId`, `speaker`, `text`, `timestamp` |
| `techniques` | Detected techniques | `debateId`, `technique`, `effectiveness`, `speaker` |
| `analyses` | Post-practice coaching | `debateId`, `analysisFramework`, `executiveSummary`, `hasanScores` (debate-only) |
| `opponents` | Opponent/practice profiles | `userId`, `name`, `topic`, `scenarioType`, `prepType`, + 50+ context/prep fields |
| `research` | Web research articles | `opponentId`, `articles[]`, `query`, `timestamp` |
| `prepProgress` | Generation progress tracking | `opponentId`, `status`, `completedSteps` |
| `prepChat` | RAG chatbot messages | `opponentId`, `role`, `content` |
| `geminiResearchProgress` | Gemini Deep Research status | `opponentId`, `status`, `message` |

### Monetization Tables (Ch.16-17)

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `scenarioTokens` | Per-user, per-scenario balances | `userId`, `scenarioId`, `balance` |
| `tokenTransactions` | Audit ledger for all token changes | `userId`, `scenarioId`, `amount`, `reason`, `metadata` |
| `subscriberUsage` | Hidden monthly cap tracking (100/month) | `userId`, `periodStart`, `debateCount`, `notifiedOwner` |
| `pendingGrants` | Marketing funnel grant links | `grantToken`, `scenarioId`, `tokenAmount`, `claimed`, `claimedBy`, `utmSource` |
| `subscriptions` | User subscription status | `userId`, `status`, `stripeSubscriptionId`, `currentPeriodEnd` |

### Cost Tracking Table (Ch.19)

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `apiCosts` | API usage cost tracking | `service` (openrouter/vapi/firecrawl/gemini), `cost` (USD cents), `userId`, `debateId`, `opponentId`, `phase` (research/prep/debate/analysis), `details` (tokens, duration, etc), `timestamp` |

**Phase Tracking**: All cost records include `phase` field enabling breakdown by workflow stage (Research → Prep → Debate → Analysis).

**Cost Estimates** (as of Dec 2025):
- **OpenRouter**: Accurate tracking via API response
- **Vapi**: Accurate tracking via client timer (Ch.19 fix)
- **Firecrawl**: ~$0.01 per search (estimate)
- **Gemini**: $2.70 per session (verified from Dec 2025 billing, see `rules/GEMINI_COST_PROOF.md`)

**Critical Bug Fixed (Dec 31, 2025)**: `geminiPrep.ts:272` had wrong hardcoded value (500 cents = $5.00 with incorrect "$0.05" comment). Corrected to 270 cents = $2.70 based on actual billing analysis.

### Opponent Context Fields (Ch.7)

The `opponents` table includes 23 optional fields for strategic context:

**Audience Context** (5 fields):
- `audienceDescription`, `audienceType`, `audienceSize`, `audienceDisposition`, `debateFormat`

**Opponent Intel** (14 fields):
- `opponentDescription`, `opponentOrganization`, `opponentCredentials`, `credentialWeaknesses`
- `opponentPastStatements`, `opponentContradictions`, `opponentTrackRecord`
- `opponentDebateStyle`, `opponentRhetoricalTendencies`, `opponentTriggers`
- `opponentStrongestArguments`, `opponentBestEvidence`, `opponentLikelyCritiques`, `opponentCharacterIssues`

**User Context** (4 fields):
- `userResearch`, `keyPointsToMake`, `thingsToAvoid`, `toneDirectives`

### Generic Prep Fields (Scenario System)

For non-debate scenarios, opponents store:
- `talkingPoints[]` - Key points with IDs
- `openingApproach` - Opening strategy text
- `keyPhrases[]` - Important phrases with IDs
- `responseMap[]` - Trigger/response pairs
- `closingApproach` - Closing strategy text
- `additionalContext` - Free-form user guidance

### Debate Prep Fields (Buffet-Style)

Structured prep with selection tracking:
- `openingOptions[]` + `selectedOpeningId`
- `argumentFrames[]` + `selectedFrameIds[]`
  - **New (R-5.2)**: `exampleQuote` — 1-2 sentence debate dialogue showing framework deployment using Hasan techniques (Concession, Reframe, Preemption, Evidence Integration)
- `receipts[]` (evidence arsenal)
  - **New (R-5.2)**: `deploymentExample` — 2-4 sentence debate dialogue demonstrating receipt usage (Delayed Reveal, Comparison Trap, Opponent's Own Words)
- `zingers[]` + `selectedZingerIds[]`
- `closingOptions[]` + `selectedClosingId`
- `opponentIntel[]` + `selectedCounterIds[]`
- `researchSynthesis` (AI analysis of all research)
- `geminiResearchReport` + `geminiResearchMetadata` (System B)

### Key Indexes

- `debates.by_user` — List user's debates
- `exchanges.by_debate` — Get debate transcript
- `analyses.by_debate` — Get analysis for debate
- `opponents.by_user` — List user's opponents
- `research.by_opponent` — Get research for opponent
- `scenarioTokens.by_user_and_scenario` — Token balances
- `tokenTransactions.by_user` — Transaction history
- `pendingGrants.by_token` — Grant link lookup

---

## Scenario System (Ch.10-12)

The app supports multiple practice types through a plugin architecture.

### Available Scenarios

**Frontend** (`src/scenarios/index.ts`) - 7 scenarios:

| ID | Name | Category | Prep Type |
|----|------|----------|-----------|
| `debate` | Debate | Debate | debate |
| `sales-cold-prospect` | Cold Prospect | Sales | generic |
| `sales-demo-followup` | Demo Follow-up | Sales | generic |
| `sales-contract-negotiation` | Contract Negotiation | Sales | generic |
| `entrepreneur-pitch` | Investor Pitch | Entrepreneur | generic |
| `entrepreneur-early-sales` | Early Customer Sales | Entrepreneur | generic |
| `entrepreneur-customer-discovery` | Customer Discovery | Entrepreneur | generic |

**Backend** (`convex/scenarios/index.ts`) - 5 scenarios:

| ID | Name | Category | Notes |
|----|------|----------|-------|
| `debate` | Debate | Debate | ✅ Synced |
| `sales-cold-prospect` | Cold Prospect | Sales | ✅ Synced |
| `sales-demo-followup` | Demo Follow-up | Sales | ✅ Synced |
| `entrepreneur-pitch` | Investor Pitch | Entrepreneur | ✅ Synced |
| `healthcare-treatment-refusal` | Treatment Refusal | Healthcare | ⚠️ Backend only |

> **Note**: Frontend has 3 scenarios not in backend (sales-contract-negotiation, entrepreneur-early-sales, entrepreneur-customer-discovery). Backend has healthcare-treatment-refusal not exposed in frontend. Healthcare uses motivational interviewing analysis framework.

### Scenario Architecture

Each scenario defines:
```typescript
interface ScenarioConfig {
  id: string;
  name: string;
  category: string;
  description: string;
  prepType: "debate" | "generic";
  
  inputs: Record<string, InputFieldConfig>;  // Form fields
  formLayout: FormLayoutConfig;               // Progressive disclosure
  
  pipeline: PipelineConfig;                   // Research & prep generation
  voice: VoiceConfig;                         // Vapi assistant config
  analysis: AnalysisConfig;                   // Post-practice analysis
}
```

### Config-Driven Forms (Ch.12)

Forms render dynamically from scenario config:
```typescript
formLayout: {
  core: {
    fields: ["topic", "position"],
    showStyleDifficulty: false,
  },
  sections: [
    {
      id: "practice-settings",
      title: "Practice Settings",
      optional: true,
      fields: ["style", "difficulty"],
    },
    {
      id: "opponent-profile",
      title: "Opponent Profile",
      optional: true,
      fields: ["opponentDescription", "opponentOrganization"],
      subsections: [{ id: "deep-intel", ... }]
    },
    // ... more sections
  ]
}
```

### Adding New Scenarios

1. Create config file in `src/scenarios/` and `convex/scenarios/`
2. Add to `SCENARIOS` registry in `index.ts`
3. System auto-adapts (no UI code changes needed)

---

## Convex Components

**Configuration**: `convex/convex.config.ts`

```typescript
app.use(agent);   // @convex-dev/agent
app.use(r2);      // @convex-dev/r2
app.use(stripe);  // @convex-dev/stripe
```

---

## Authentication

**Configuration**: `convex/auth.ts`

| Provider | Type | Features |
|----------|------|----------|
| **Password** | Email/password | `ResendOTP` verification, `ResendPasswordReset` |
| **GitHub** | OAuth | Requests `user:email` scope |

---

## External Services

| Service | Purpose | Integration Point |
|---------|---------|-------------------|
| **Vapi** | Voice AI for debates | `convex/http.ts` webhooks, frontend SDK |
| **OpenRouter** | LLM API (Claude, GPT-4o) | `convex/lib/openrouter.ts` |
| **Gemini** | Deep Research (System B) | `convex/lib/geminiDeepResearch.ts` |
| **Firecrawl** | Web scraping/search | `convex/lib/firecrawl.ts` |
| **Cloudflare R2** | Recording storage | `convex/r2.ts` via `@convex-dev/r2` |
| **Stripe** | Subscriptions & purchases | `convex/http.ts`, `stripeWebhooks.ts` |
| **Resend** | Email | `convex/email/`, `convex/otp/` |

---

## HTTP Endpoints

**Configuration**: `convex/http.ts`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/vapi-webhook` | POST | Vapi events: `transcript`, `end-of-call-report` |
| `/stripe/webhook` | POST | Stripe events via `@convex-dev/stripe` |

**Stripe Events Handled**:
- `checkout.session.completed` → Token purchases or subscription creation
- `customer.subscription.updated` → Status/period updates
- `customer.subscription.deleted` → Subscription cancellation

---

## AI Model Usage

**Configuration**: `convex/lib/aiConfig.ts`

| Use Case | Model | Location |
|----------|-------|----------|
| Debate prep generation | `openai/gpt-4o` | `prepGeneration.ts` |
| Generic prep generation | `openai/gpt-4o` | `genericPrep.ts` |
| Post-debate analysis | `anthropic/claude-sonnet-4.5` | `analysisAction.ts` |
| Generic analysis | `openai/gpt-4o` | `analysisAction.ts` |
| Article summarization | `openai/gpt-4o-mini` | `research.ts` |
| User research processing | `openai/gpt-4o` | `prepGeneration.ts` |
| Prep chatbot | `openai/gpt-4o` | `prepChat.ts` |
| Voice debate | `anthropic/claude-sonnet-4-20250514` | `debate.tsx` (Vapi) |
| Gemini Deep Research | `gemini-2.5-pro-preview-06-05` | `geminiDeepResearch.ts` |
| Gemini Source Extraction | `gemini-2.0-flash` | `geminiSearch.ts` |

### Prompt Engineering (R-5.2)

**Enhanced Prompts** (`convex/lib/promptTemplates.ts`):

- **ARGUMENT_FRAMES_PROMPT**: Teaches deployment techniques (Concession Pivot, Reframing, Preemption, Evidence Integration) with:
  - WHY each technique works (Hasan quotes)
  - Pattern templates for each technique
  - Quality criteria emphasizing principles over copying
  - Generates `exampleQuote` showing debate dialogue

- **RECEIPTS_ARSENAL_PROMPT**: Teaches deployment patterns (Delayed Reveal, Comparison Trap, Opponent's Own Words) with:
  - 3-step structure template (claim → evidence → challenge)
  - Tone matching (statistics = matter-of-fact, contradiction = incredulous)
  - Generates `deploymentExample` showing receipt usage in dialogue

- **EVIDENCE EXTRACTION** (R-6.1): For connecting frames to research:
  - Format: `"[Source Name]: [Specific finding] - [How it supports this frame]"`
  - Extracts 2-3 specific findings from research articles per frame
  - Cites actual sources with concrete stats/facts, not generic categories
  - Example: "WHO 2024 Report: 2.2B lack safe water - Demonstrates scale of crisis"

**Philosophy**: AI learns Mehdi Hasan's methodology (WHY techniques work), not just surface patterns

---

## Key Patterns

### 1. Schema is Source of Truth

The database schema (`convex/schema.ts`) defines the contract. Frontend must adapt to schema, not vice versa. See Chapter 3 for lesson learned.

### 2. Node.js vs Edge Runtime

- **Queries/Mutations**: Run on Convex edge runtime (no `"use node"`)
- **Actions**: Can use Node.js runtime with `"use node"` directive
- Actions are in `convex/actions/` directory

### 3. Vapi Webhook Flow

```
Vapi Call → transcript event → Store exchange
         → end-of-call-report → Store recording (R2)
                              → Trigger analysis
                              → Consume token (monetization)
```

### 4. Opponent → Prep → Debate Flow

```
Create Opponent → Generate Prep (with progress tracking)
              → Research (Firecrawl or Gemini)
              → Start Debate → Analysis → History
```

### 5. Cascade Deletion

When deleting an opponent, related data is cascade-deleted:
- `research` documents
- `prepProgress` documents
- `prepChat` documents
- `geminiResearchProgress` documents

### 6. OpenRouter Structured Outputs

For reliable AI JSON responses, use structured outputs:

```typescript
import { callOpenRouter, JsonSchema } from "../lib/openrouter";

const schema: JsonSchema = {
  name: "response_name",
  strict: true,
  schema: {
    type: "object",
    properties: { ... },
    required: [...],
    additionalProperties: false,
  },
};

const response = await callOpenRouter(
  apiKey, messages, siteUrl, 3, model, maxTokens, schema
);
```

### 7. Strategic Brief Pattern (Ch.7)

For AI prompt integration with optional user context:

```typescript
import { buildStrategicBrief } from "../lib/strategicBrief";

const opponent = await ctx.runQuery(internal.opponents.getInternal, { opponentId });
const strategicBrief = buildStrategicBrief(opponent);

// Pass to all generation functions
const openings = await generateOpenings({ strategicBrief, ... });
```

### 8. Selective SSR with Convex and Tanstack (Ch.9)

- **Public pages (SSR)**: `/`, `/blog/*` - rendered server-side for SEO
- **Auth pages (CSR)**: `/_app/*` - client-rendered with Convex providers
- Root layout has `ssr: false` on `_app.tsx` to isolate Convex to client routes

### 9. Scenario Plugin Architecture (Ch.10-11, 12)

Config over code duplication. Each scenario defines:
- Form fields and layout
- Vapi system prompt with placeholders
- Analysis framework and scoring categories


Form layout defined in scenario config. UI renders recursively:
```typescript
{formLayout.sections.map((section) => (
  <AccordionSection key={section.id} section={section} ... />
))}
```

### 10. Style/Difficulty Two-Node Architecture (Ch.14)

Style = WHO (persona), Difficulty = HOW SKILLED (competence):
- 6 styles: friendly, aggressive, academic, emotional, socratic, gish gallop
- 3 difficulties: easy, medium, hard (with full Hasan arsenal)

```typescript
const styleInstructions = getStyleInstructions(opponent.style);
const difficultyInstructions = getDifficultyInstructions(opponent.difficulty);
// Both injected into system prompt template
```

### 12. Token Economy Security (Ch.16)

- Public queries require auth via `ctx.auth.getUserIdentity()`
- Token grants/consumption only via `internalMutation`
- Users can only access their own data (userId filter)
- Token consumed on debate END (not start) for better UX

### 13. Component Extraction Pattern (Ch.15)

For large files, extract to feature-specific components:
- `src/components/prep/` for prep page components
- `src/hooks/prep/` for prep page hooks
- Explicit prop drilling (not Context) for traceability


---

## Cron Jobs

**Configuration**: `convex/crons.ts` + `convex/cleanup.ts`

### Application Data Cleanup

| Job | Schedule | Retention | Purpose |
|-----|----------|-----------|---------|
| `cleanup old exchanges` | Daily 3 AM UTC | 90 days | Delete exchanges from old completed debates |
| `mark abandoned debates` | Hourly | 24 hours | Mark active debates as abandoned |
| `cleanup prep progress errors` | Daily 4 AM UTC | 7 days | Delete error prep progress records |
| `trim prep chat history` | Weekly Sun 2 AM UTC | Last 100 | Keep only recent chat per opponent |

### Auth Tables Cleanup

| Job | Schedule | Retention | Purpose |
|-----|----------|-----------|---------|
| `cleanup expired sessions` | Daily 5 AM UTC | Expiration time | Delete expired auth sessions |
| `cleanup expired verification codes` | Every 6 hours | Expiration time | Delete expired OTP/magic links |
| `cleanup expired refresh tokens` | Daily 6 AM UTC | Expiration time | Delete expired refresh tokens |
| `cleanup old oauth verifiers` | Every 12 hours | 24 hours | Delete stale PKCE verifiers |
| `cleanup old rate limits` | Daily 7 AM UTC | 7 days | Delete old rate limit records |

---

## Environment Variables

### Frontend (Vite)

| Variable | Purpose |
|----------|---------|
| `VITE_CONVEX_URL` | Convex deployment URL |
| `VITE_VAPI_PUBLIC_API_KEY` | Vapi public key |

### Backend (Convex Dashboard)

| Variable | Purpose |
|----------|---------|
| `OPENROUTER_API_KEY` | OpenRouter API access |
| `GEMINI_API_KEY` | Google Gemini API access |
| `FIRECRAWL_API_KEY` | Firecrawl API access |
| `STRIPE_SECRET_KEY` | Stripe billing |
| `RESEND_API_KEY` | Email sending |
| `R2_BUCKET` | Cloudflare R2 bucket name |
| `R2_ACCESS_KEY_ID` | R2 access key |
| `R2_SECRET_ACCESS_KEY` | R2 secret key |
| `R2_ENDPOINT` | R2 endpoint URL |

---

## Dev Commands

```bash
# Start development (frontend + backend parallel)
npm run dev

# Start individually
npm run dev:frontend    # Vite only
npm run dev:backend     # Convex only

# Type checking
npx tsc -p convex/tsconfig.json --noEmit  # Check Convex types

# Deploy
npx convex deploy       # Deploy backend
# Frontend auto-deploys via Netlify
```

---

## UI Design System (Ch.13)

**Color Palette** (warm cream theme):
- Background: `#F5F3EF` (warm cream)
- Cards: `#FAFAF8` (off-white)
- Primary: `#3C4A32` (deep olive)
- Primary Light: `#5C6B4A` (button olive)
- Text: `#2A2A20` / `#5C5C54` / `#888880`
- Border: `#E8E4DA`
- Accent: `#A8B08C` (sage)

**Design Principles**:
1. Text over icons in buttons
2. Warm cream, not white/black
3. Georgia serif for page titles
4. Single navigation path
5. Bake in defaults (no model dropdowns)

---

## Recent Changes

| Date | Change | Chapter |
|------|--------|---------|
| Dec 31, 2025 | Opponent Intelligence Editing - Full CRUD operations, placeholder bug fix | R-5.3 |
| Dec 31, 2025 | Content Enhancement - Deployment examples for argument frames & receipts | R-5.2 |
| Dec 31, 2025 | Research Integration - Send extracted items to Study Mode, fix research display bug | Ch.20 |
| Dec 31, 2025 | **Gemini cost bug fix**: Corrected hardcoded value from $5.00 to $2.70 | Bug Fix |
| Dec 31, 2025 | Cost Monitoring & Control - Phase tracking, topic grouping, accurate Vapi duration | Ch.19 |
| Dec 30, 2025 | Stripe Payment Integration - Webhooks, checkout, customer portal | Ch.18 |
| Dec 30, 2025 | Token Management UI - Admin panel, Billing page | Ch.17 |
| Dec 30, 2025 | Token Economy - Core implementation | Ch.16 |
| Dec 29, 2025 | prep.tsx refactoring - Component extraction (3,130→486 lines) | Ch.15 |
| Dec 29, 2025 | Debate Style & Difficulty architecture | Ch.14 |
| Dec 29, 2025 | Dashboard & App UI redesign | Ch.13 |
| Dec 29, 2025 | Opponent Profile UX redesign - Progressive disclosure | Ch.12 |
| Dec 26, 2025 | Additional Context field for all scenarios | Ch.11.2 |
| Dec 26, 2025 | Dynamic form refactor | Ch.11.1 |
| Dec 26, 2025 | Scenario System complete (Phases 3-5) | Ch.11 |
| Dec 26, 2025 | Scenario System plugin architecture (Phases 1-2) | Ch.10 |
| Dec 23, 2025 | TanStack Start SSR migration | Ch.9 |
| Dec 21-22, 2025 | Gemini Deep Research integration (System B) | Ch.8 |
| Dec 21, 2025 | Database cleanup cron jobs (9 jobs) | Ch.7.5 |
| Dec 21, 2025 | Enhanced opponent profile with Strategic Brief | Ch.7 |
| Dec 21, 2025 | Password authentication migration | Ch.6 |
| Dec 20, 2025 | OpenRouter structured outputs for analysis | Ch.5.1 |
| Dec 20, 2025 | Recording & Analysis fixes | Ch.5.1 |
| Dec 20, 2025 | R2 recording storage, History page | Ch.5 |
| Dec 19, 2025 | Frontend schema alignment fix | Ch.3 |
| Dec 18, 2025 | Progress tracking, RAG chatbot | Ch.2 |
| Dec 17, 2025 | AI config centralization | Ch.1 |

---

## File Size Reference

After Ch.15 refactoring, largest application files:

| File | Lines | Status |
|------|-------|--------|
| `StudyModeDebate.tsx` | 1,018 | Well-organized internally |
| `debate.tsx` | ~868 | Could extract Vapi hooks later |
| `opponent-profile.tsx` | ~815 | Config-driven, manageable |
| `prep.tsx` | 486 | ✅ Refactored from 3,130 |

---

## Token Economy Quick Reference

**Constants** (`convex/lib/monetization.ts`):

| Constant | Value | Purpose |
|----------|-------|---------|
| `SUBSCRIBER_MONTHLY_CAP` | 100 | Hidden cap for subscribers |
| `FUNNEL_GRANT_AMOUNT` | 10 | Default tokens for marketing grants |
| `OPPONENT_CREATION_BUFFER` | 2 | Buffer for anti-abuse check |
| `GRANT_EXPIRATION_MS` | 30 days | Default grant link expiration |
| `OWNER_EMAIL` | konradhylton@gmail.com | Cap notification recipient |

**Pricing**:
- Subscription: $20/month (`price_1SkE9eCm9nndApXQaVYx2Hsc`), $200/year (`price_1SkE9eCm9nndApXQGDpPZijx`)
- Token Packs: 5/$10, 15/$25, 50/$70 (Stripe price IDs configured)

**Key Functions** (`convex/tokens.ts`):

| Function | Type | Purpose |
|----------|------|---------|
| `getBalance` | Query | Get balance for specific scenario |
| `getAllBalances` | Query | Get all balances for user |
| `checkAccess` | Query | Check if user can practice (subscriber or tokens) |
| `canCreateOpponent` | Query | Anti-abuse check for opponent creation |
| `getSubscriptionStatus` | Query | Get subscription details |
| `claimGrant` | Mutation | Claim marketing grant link |
| `INTERNAL_grantTokens` | Internal | Grant tokens (server-side only) |
| `INTERNAL_consumeToken` | Internal | Consume on debate end (server-side only) |

**Marketing Funnel Flow**:
1. Admin creates grant link at `/dashboard/admin`
2. User visits `/claim/{token}` from marketing email
3. If not authenticated: shown signup prompt, token stored in sessionStorage
4. After login: `claimGrant` called, tokens credited
5. Redirected to opponent-profile for that scenario

**Test Mutations** (for development):
- `testGrantTokens` - Grant tokens without Stripe
- `testCreateSubscription` - Create mock subscription
- `testCancelSubscription` - Cancel mock subscription

**Admin Panel** (`/dashboard/admin`):
- Create marketing grant links with UTM params
- View all grants with claim status
- Manual token grants by user email

---

## What's Not Yet Implemented

From roadmap and dev journals:

- Mobile apps
- Video recording of debates

- Removal of test mutations (currently available for dev/QA)

---

*This document reflects the codebase as of December 31, 2025 (Chapter R-5.3 - Phase 5.3 Complete).*
