# Project Map

**Current architecture and codebase structure. Updated as features are added.**

---

## How This Connects

- **PROJECT_MAP.md** (this file) = what currently exists
- **DEV_JOURNAL.md** = how we got here
- **ROADMAP.md** = where we're going

---

## Directory Structure

```
orator/
├── convex/                    # Backend (Convex functions)
│   ├── _generated/            # Auto-generated Convex types
│   ├── actions/               # External API calls (Node.js runtime)
│   │   ├── analysisAction.ts  # Post-debate analysis generation
│   │   ├── prep.ts            # Prep material orchestration
│   │   ├── prepGeneration.ts  # AI content generation
│   │   └── research.ts        # Firecrawl web research
│   ├── lib/                   # Shared utilities
│   │   ├── aiConfig.ts        # Centralized AI model configuration
│   │   ├── firecrawl.ts       # Firecrawl v2 API client
│   │   ├── openrouter.ts      # OpenRouter API client
│   │   ├── promptTemplates.ts # AI prompt templates
│   │   └── scoring.ts         # Hasan score calculation
│   ├── analysis.ts            # Analysis queries and mutations
│   ├── auth.config.ts         # Convex Auth configuration
│   ├── convex.config.ts       # App config (components registration)
│   ├── debates.ts             # Debate CRUD and queries
│   ├── http.ts                # HTTP endpoints (Vapi webhooks)
│   ├── opponents.ts           # Opponent profile management
│   ├── prepChat.ts            # RAG chatbot for prep
│   ├── prepProgress.ts        # Generation progress tracking
│   ├── r2.ts                  # Cloudflare R2 recording storage
│   ├── research.ts            # Research storage
│   ├── schema.ts              # Database schema (SOURCE OF TRUTH)
│   └── *.ts                   # Other queries/mutations
├── src/
│   ├── routes/                # TanStack Router pages
│   │   └── _app/_auth/dashboard/
│   │       ├── _layout.index.tsx  # Dashboard home (opponent list)
│   │       ├── analysis.tsx       # Post-debate analysis view
│   │       ├── debate.tsx         # Live debate interface
│   │       ├── history.tsx        # Debate history & performance
│   │       └── prep.tsx           # Prep materials & research
│   ├── ui/                    # Reusable UI components
│   └── main.tsx               # App entry point
├── rules/                     # AI documentation system
│   ├── dev_journal.md         # Session-by-session development log
│   ├── directive.md           # AI behavior guidelines
│   ├── project_map.md         # This file
│   └── roadmap.md             # Feature roadmap
└── docs/                      # Additional documentation
```

---

## Database Schema

**Source of Truth**: `convex/schema.ts`

### Core Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `users` | User accounts | `email`, `subscriptionId`, `subscriptionTier` |
| `debates` | Debate sessions | `userId`, `topic`, `status`, `vapiCallId`, `recordingKey` |
| `exchanges` | Turn-by-turn transcript | `debateId`, `speaker`, `text`, `timestamp` |
| `analyses` | Post-debate analysis | `debateId`, `hasanScores`, `executiveSummary`, `missedOpportunities` |
| `opponents` | Opponent profiles | `userId`, `name`, `topic`, `userPosition`, `aiPosition`, `style`, `difficulty` |
| `prep` | Generated prep materials | `opponentId`, `openings`, `arguments`, `receipts`, `zingers`, `closings`, `opponentIntel` |
| `research` | Web research articles | `opponentId`, `title`, `source`, `summary`, `content` |
| `prepProgress` | Generation progress tracking | `opponentId`, `status`, `completedSteps` |
| `prepChat` | RAG chatbot messages | `opponentId`, `role`, `content` |

### Key Indexes

- `debates.by_user` — List user's debates
- `exchanges.by_debate` — Get debate transcript
- `analyses.by_debate` — Get analysis for debate
- `opponents.by_user` — List user's opponents
- `prep.by_opponent` — Get prep for opponent
- `research.by_opponent` — Get research for opponent

---

## External Services

| Service | Purpose | Integration Point |
|---------|---------|-------------------|
| **Vapi** | Voice AI for debates | `convex/http.ts` webhooks, frontend SDK |
| **OpenRouter** | LLM API (Claude, GPT-4o) | `convex/lib/openrouter.ts` |
| **Firecrawl** | Web scraping/search | `convex/lib/firecrawl.ts` |
| **Cloudflare R2** | Recording storage | `convex/r2.ts` via `@convex-dev/r2` |
| **Stripe** | Subscriptions | Convex SaaS template integration |
| **Resend** | Email | Convex SaaS template integration |

---

## AI Model Usage

**Configuration**: `convex/lib/aiConfig.ts`

| Use Case | Model | Location |
|----------|-------|----------|
| Prep generation | `openai/gpt-4o` | `prepGeneration.ts` |
| Post-debate analysis | `anthropic/claude-sonnet-4.5` | `analysisAction.ts` |
| Technique detection | `anthropic/claude-sonnet-4.5` | Real-time during debate |
| Article summarization | `openai/gpt-4o-mini` | `research.ts` |
| User research processing | `openai/gpt-4o` | `prepGeneration.ts` |
| Prep chatbot | `openai/gpt-4o` | `prepChat.ts` |

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
```

### 4. Opponent → Prep → Debate Flow

```
Create Opponent → Generate Prep (with progress tracking)
              → Research (Firecrawl)
              → Start Debate → Analysis → History
```

### 5. Cascade Deletion

When deleting an opponent, related data is cascade-deleted:
- `research` documents
- `prepProgress` documents
- `prepChat` documents
- `prep` documents (implicit via opponent reference)

### 6. OpenRouter Structured Outputs

For reliable AI JSON responses, use structured outputs instead of basic JSON mode:

```typescript
import { callOpenRouter, JsonSchema } from "../lib/openrouter";

const schema: JsonSchema = {
  name: "response_name",
  strict: true,
  schema: {
    type: "object",
    properties: {
      field1: { type: "string", description: "Description" },
      field2: { type: "number" },
    },
    required: ["field1", "field2"],
    additionalProperties: false,
  },
};

// Pass schema instead of `true` for jsonMode
const response = await callOpenRouter(
  apiKey, messages, siteUrl, 3, model, maxTokens, schema
);
```

This guarantees the AI returns valid JSON matching the schema. See Chapter 5.1 for migration from Zod validation.

### 7. Vapi Artifact Structure

Recording URL in `end-of-call-report` webhook is at `message.artifact.recording`, NOT `message.call.recordingUrl`:

```typescript
const artifact = message.artifact;
const recordingUrl = 
  artifact?.recording?.mono?.combinedUrl ||
  artifact?.recording?.stereoUrl ||
  artifact?.recording;
```

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
# Start development
npm run dev          # Frontend (Vite)
npx convex dev       # Backend (Convex)

# Type checking
npx tsc -p convex/tsconfig.json --noEmit  # Check Convex types

# Deploy
npx convex deploy    # Deploy backend
# Frontend auto-deploys via Netlify
```

---

## Recent Changes

| Date | Change | Chapter |
|------|--------|---------|
| Dec 20, 2024 | OpenRouter structured outputs for analysis | Ch.5.1 |
| Dec 20, 2024 | Fixed Vapi recording URL extraction | Ch.5.1 |
| Dec 20, 2024 | Added artifactPlan.recordingEnabled | Ch.5.1 |
| Dec 20, 2024 | Opponent deletion with cascade | Ch.5 |
| Dec 20, 2024 | R2 recording storage | Ch.5 |
| Dec 20, 2024 | Debate history page with charts | Ch.5 |
| Dec 19, 2024 | Fixed hardcoded debate topics | Ch.4 |
| Dec 19, 2024 | Analysis page restoration | Ch.4 |
| Dec 2, 2024 | AI config centralization | Ch.1 |
| Dec 2, 2024 | Progress tracking system | Ch.2 |
| Dec 2, 2024 | RAG prep chatbot | Ch.2 |

