# Scenario System

**High-level architecture for OratorPrep's multi-scenario practice platform.**

---

## What Is the Scenario System?

OratorPrep started as a debate practice tool. The Scenario System transforms it into a platform that supports many types of conversational practice — debates, sales calls, investor pitches, difficult conversations, and more.

The core insight: the codebase doesn't know about "sales" or "debate" specifically. It knows how to read a configuration file and adapt accordingly. Each scenario type is defined in a single config file that controls the entire user experience for that scenario.

---

## Core Concepts

### Scenario

A scenario is a type of practice session. Examples:
- Debate
- Sales - Cold Prospect
- Sales - Demo Follow-up
- Entrepreneur - Investor Pitch

Each scenario defines:
- What the AI opponent says and how it behaves
- What input fields the user fills out
- What prep materials are generated
- What categories appear in Quick Reference
- How the practice session is analyzed

### Scenario Category

Scenarios are grouped into categories. A category shares common structure but has variations:

```
sales/
  ├── cold-prospect    (skeptical, never heard of you)
  └── demo-followup    (interested but has objections)

entrepreneur/
  └── pitch            (skeptical investor)
```

Each category file defines a base config, and variations override specific parts (like the AI's first message or system prompt).

### Prep Type

There are two prep types:

**Debate Prep** — Used only for debate scenarios. Includes:
- Opening Statements
- Argument Frames
- Opponent Intelligence & Counters
- Receipts Arsenal
- Zinger Bank
- Closing Statements

**Generic Prep** — Used for all other scenarios. Includes:
- Opening Approach
- Talking Points
- Key Phrases
- Response Map (if they say X, respond with Y)
- Things to Avoid
- Closing Approach

The prep type determines which prep page the user sees and which categories appear in Quick Reference during practice.

---

## How It Works

### 1. User Creates a Practice Session

User selects a scenario type (e.g., "Sales - Cold Prospect") and fills out the input form. The form fields, labels, and placeholders are defined by the scenario config.

### 2. Prep Materials Are Generated

Based on the scenario's `pipeline` config:
- **Debate scenarios**: Run research, then generate debate-specific prep materials
- **Generic scenarios**: Skip research, generate generic prep materials

The AI generates prep materials appropriate to the scenario type.

### 3. User Reviews Prep Materials

The prep page shows either:
- **DebatePrepPage** — For debate scenarios (Study Mode with 6 sections, Quick Reference with 6 categories)
- **GenericPrepPage** — For all other scenarios (Study Mode with 6 sections, Quick Reference with 6 categories)

Both pages have a Quick Reference tab showing curated content.

### 4. User Practices

During the practice session:
- The AI uses the scenario's system prompt and first message
- The user can toggle Quick Reference via the PrepPanel (floating button)
- PrepPanel shows categories appropriate to the prep type

### 5. Analysis

After practice, the system analyzes the session using the scenario's analysis framework:
- **Debate**: Hasan technique scorecard (11 techniques)
- **Generic**: Skills assessment (scenario-defined categories like Discovery, Control, Confidence, Closing)

---

## The Config File

Each scenario category has one config file. Here's the structure:

```
scenarios/
  ├── index.ts        (registry of all scenarios)
  ├── debate.ts       (debate scenario)
  ├── sales.ts        (sales scenarios with variations)
  └── entrepreneur.ts (entrepreneur scenarios)
```

A config file defines:

```typescript
const config = {
  id: "sales-cold-prospect",
  name: "Sales - Cold Prospect",
  category: "sales",
  
  pipeline: {
    research: false,      // Skip research step
    prep: true,           // Show prep page
    prepType: "generic"   // Use GenericPrepPage
  },
  
  inputs: {
    topic: { label: "What are you selling?", placeholder: "..." },
    opponentDescription: { label: "Prospect background", placeholder: "..." },
    // ... field definitions
  },
  
  assistant: {
    firstMessage: [
      "Who is this?",
      "I'm busy. What's this about?",
      // ... random selection for variety
    ],
    systemPrompt: "You are a cold prospect who's never heard of the caller...",
    voice: { provider: "11labs", voiceId: "..." }
  },
  
  analysis: {
    framework: "sales",
    scoreCategories: [
      { name: "Discovery", description: "Did they uncover the real objection?" },
      { name: "Control", description: "Did they maintain conversation flow?" },
      { name: "Confidence", description: "Did they handle pushback confidently?" },
      { name: "Closing", description: "Did they advance the deal?" }
    ],
    systemPrompt: "Analyze this sales call focusing on..."
  }
}
```

### Adding a New Scenario

To add a new scenario:

1. **If it's a variation of an existing category** — Add it to the existing file (e.g., add "gatekeeper" to `sales.ts`)

2. **If it's a new category** — Create a new file (e.g., `healthcare.ts`) and register it in `index.ts`

The scenario config controls everything. No other code changes required.

---

## Database Design

### Generic Fields

All scenarios use the same database fields. The same field means different things in different contexts:

| Field | Debate | Sales | Entrepreneur |
|-------|--------|-------|--------------|
| `topic` | Debate topic | Product being sold | Business/product |
| `talkingPoints` | Arguments | Common objections | Anticipated questions |
| `opponentDescription` | Opponent bio | Prospect background | Investor background |

This avoids schema bloat — no scenario-specific fields.

### Prep Type Fields

**Debate-specific fields** (only populated for debates):
- `openingOptions`, `closingOptions`
- `argumentFrames`
- `zingers`
- `receipts`
- `opponentIntel`

**Generic fields** (used by all non-debate scenarios):
- `openingApproach`, `closingApproach`
- `talkingPoints`
- `keyPhrases`
- `responseMap`
- `thingsToAvoid`

### Analysis Fields

**Debate-specific**:
- `techniqueScorecard` — Hasan's 11 techniques
- `hasanScores` — Category scores

**Generic**:
- `skillsAssessment` — Array of { name, score, feedback } for scenario-defined categories

---

## Key Components

### PrepPanel

The PrepPanel (`src/ui/prep-panel.tsx`) shows Quick Reference content during practice.

- Triggered by floating toggle button in the practice screen
- Shows as bottom sheet
- Content depends on `prepType`:
  - **Debate**: Opening, Closing, Core Arguments, Zingers, Counters, Receipts
  - **Generic**: Opening Approach, Closing, Talking Points, Key Phrases, Response Map, Things to Avoid

### Prep Pages

Two prep page components:

- **DebatePrepPage** — Full Study Mode with debate sections, Quick Reference with 6 debate categories
- **GenericPrepPage** — Study Mode with generic sections, Quick Reference with 6 generic categories

The main prep route checks `prepType` and renders the appropriate component.

### Analysis Views

Two analysis view components:

- **DebateAnalysisView** — Hasan technique scorecard, per-technique breakdown
- **GenericAnalysisView** — Skills assessment based on scenario-defined categories

---

## Design Principles

### One Config = One Scenario

Everything scenario-specific lives in one config file. Adding a new scenario means writing ~100 lines of config.

### Generic Database, Contextual Meaning

The same fields work for all scenarios. "Talking points" means arguments in a debate and objections in a sales call.

### Two Prep Types, Not N

Instead of a unique prep page per scenario, there are two templates: Debate and Generic. This keeps the codebase simple.

### Plugin Architecture

The codebase is scenario-agnostic. It reads configs and adapts. This makes it easy to add new scenarios without touching core code.

---

## Related Documents

- `SCENARIO_SYSTEM_IMPLEMENTATION_PLAN.md` — Detailed implementation steps and code examples
- `PROJECT_MAP.md` — Overall codebase structure
- `dev_journal.md` — Development history and decisions

