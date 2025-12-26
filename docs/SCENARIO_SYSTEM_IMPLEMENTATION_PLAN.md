# Scenario System Implementation Plan
**OratorPrep Multi-Scenario Architecture**

---

## ⚠️ CRITICAL: READ THE CODE, NOT JUST THIS PLAN

**This plan is a GUIDE, not the source of truth. The actual codebase IS the source of truth.**

During Phase 1 implementation (Dec 2025), the AI relied solely on this plan without inspecting the actual code. Result: the debate scenario config only included 4 input fields when the real `opponent-profile.tsx` form has 25+ fields across 6 sections.

**Before implementing ANY section:**
1. Read the relevant source files first
2. Understand what currently exists
3. Use this plan as a guide, not a specification
4. The plan may be incomplete or outdated — the code is reality

**Files to always check:**
- `src/routes/_app/_auth/dashboard/opponent-profile.tsx` — actual form fields
- `convex/schema.ts` — actual database fields
- `src/routes/_app/_auth/dashboard/prep.tsx` — actual prep page structure
- `src/routes/_app/_auth/dashboard/debate.tsx` — actual Vapi config
- `src/ui/prep-panel.tsx` — actual PrepPanel categories

---

## COMMANDER'S INTENT

**Mission:** Build a plugin architecture that lets us rapidly create new practice scenarios by writing one config file.

**End State:**
- Create new scenario = write 1 config file (~100 lines)
- All scenarios use the same generic database fields
- Zero code duplication, clean separation
- User selects scenario type (Debate, Sales, Healthcare, etc.)     
- Each scenario has appropriate AI behavior, input forms and labels, prep type, prep materials, and analysis  

For
**Core Principle:**
The codebase doesn't know about "sales" or "debate" - it just knows how to:
1. Read a scenario config
2. Show the right input form
3. Pass the right prompt to Vapi
4. Display prep materials
5. Analyze with the right framework

Everything scenario-specific lives in ONE config file.

---

## THE BIG PICTURE

### Current State (Debate Only)
```
User creates opponent → Research generates prep materials →
Practice debate with Mehdi Hasan AI → Get Hasan-specific analysis
```

### Target State (Multi-Scenario)
```
User selects scenario type → Creates scenario-specific opponent →
Optional prep (scenario-dependent) → Practice with scenario-appropriate AI →
Get scenario-specific analysis
```

---

## ARCHITECTURE OVERVIEW

### Scenario Config System (Plugin Architecture)

**One file per category, multiple variations per file:**

```typescript
// scenarios/sales.ts
const baseSalesConfig = {
  category: "sales",
  pipeline: {
    research: false,        // Skip research step
    prep: true,             // Show prep page
    prepType: "generic"     // Use GenericPrepPage component
  },
  inputs: {
    topic: { label: "What are you selling?", placeholder: "...", required: true },
    opponentDescription: { label: "Prospect background", placeholder: "..." },
    talkingPoints: { label: "Common objections", placeholder: "..." },
    // ... shared across all sales scenarios
  },
  analysis: {
    framework: "sales", // Identifies which analysis framework this uses
    scoreCategories: [
      // Sales-specific categories (defined here, displayed by GenericAnalysisView)
      { name: "Discovery", description: "Did they uncover the real objection?" },
      { name: "Control", description: "Did they maintain conversation flow?" },
      { name: "Confidence", description: "Did they handle pushback confidently?" },
      { name: "Closing", description: "Did they advance the deal?" }
    ],
    systemPrompt: `Analyze this sales call focusing on Discovery, Control, Confidence, and Closing...`
  }
}

export const SalesScenarios = {
  'cold-prospect': {
    ...baseSalesConfig,
    id: "sales-cold-prospect",
    name: "Sales - Cold Prospect",
    assistant: {
      firstMessage: [
        "Who is this? How'd you get my number?",
        "I'm in the middle of something. What's this about?",
        "We're not interested in whatever you're selling."
      ], // Randomly picks one
      systemPrompt: `You are a cold prospect who's never heard of the caller...`,
      voice: { provider: "11labs", voiceId: "..." }
    }
  },

  'demo-followup': {
    ...baseSalesConfig,
    id: "sales-demo-followup",
    name: "Sales - Demo Follow-up",
    assistant: {
      firstMessage: [
        "Thanks for the demo yesterday. I have some concerns...",
        "I discussed this with my team. We have questions..."
      ],
      systemPrompt: `You saw a demo. You're interested but have objections...`
    }
  }
}
```

**Scenarios registry:**
```typescript
// scenarios/index.ts
import { DebateScenario } from './debate'
import { SalesScenarios } from './sales'
import { EntrepreneurScenarios } from './entrepreneur'

export const SCENARIOS = {
  'debate': DebateScenario,
  'sales-cold-prospect': SalesScenarios['cold-prospect'],
  'sales-demo-followup': SalesScenarios['demo-followup'],
  'entrepreneur-pitch': EntrepreneurScenarios['pitch'],
  // Add more variations here...
}
```

---

## INITIAL SCENARIOS (Prove the Engine)

### 1. Debate (Refactor Existing)
**File:** `scenarios/debate.ts`
- Single scenario (no variations)
- AI: Skilled debater using debate techniques
- Prep: DebatePrepPage (openings, arguments, zingers, receipts, closings)
- Quick Ref: Opening, Closing, Arguments, Zingers, Counters, Receipts
- Analysis: Debate-specific scorecard

### 2. Sales (First New Category)
**File:** `scenarios/sales.ts` with 2 variations
- **Cold Prospect** - Never heard of you, skeptical from the start
- **Demo Follow-up** - Saw demo, interested but has objections

**Shared config:**
- Prep: GenericPrepPage (talking points, response map, key phrases)
- Quick Ref: Opening Approach, Talking Points, Response Map, Key Phrases, Things to Avoid, Closing
- Analysis: Sales framework with 4 scoreCategories
  - Discovery: Did they uncover the real objection?
  - Control: Did they maintain conversation flow?
  - Confidence: Did they handle pushback confidently?
  - Closing: Did they advance the deal?

**Different per variation:**
- First message array (randomly selected)
- System prompt (cold vs warm behavior)

### 3. Entrepreneur (Second New Category)
**File:** `scenarios/entrepreneur.ts`
- **Investor Pitch** - Pitching to skeptical investor

**Config:**
- Prep: GenericPrepPage
- Quick Ref: Opening Approach, Talking Points, Response Map, Key Phrases, Things to Avoid, Closing
- Analysis: Pitch framework with 4 scoreCategories
  - Clarity: Was the pitch clear and concise?
  - Confidence: Did they handle tough questions confidently?
  - Handling Skepticism: How did they respond to pushback?
  - Business Acumen: Do they understand their metrics/market?

**Launch with:** Debate + 2 Sales variations + 1 Entrepreneur = 4 total scenarios

**Note:** Once validated, add more variations to sales.ts or entrepreneur.ts, or create new category files.

---

## VAPI CONFIGURATION OPTIONS

Based on [Vapi API documentation](https://docs.vapi.ai/api-reference/assistants/create), here are the available configuration options we can control per scenario:

### Core Settings
- `name`: Assistant identifier
- `firstMessage`: Initial greeting/opening
- `model`: LLM configuration (provider, model, temperature, etc.)
- `voice`: Voice provider and settings (11labs, ElevenLabs, Cartesia, etc.)
- `transcriber`: Speech-to-text configuration (Deepgram, Assembly AI, OpenAI, etc.)

### Behavioral Controls
- `model.messages`: System prompt array with role and content
- `model.temperature`: Creativity/randomness (0-1)
- `model.maxTokens`: Response length limit
- `silenceTimeoutSeconds`: How long to wait for user speech
- `responseDelaySeconds`: Delay before assistant starts speaking
- `llmRequestDelaySeconds`: Delay before sending to LLM

### Advanced Features (Available in 2025)
- `backgroundSound`: Background audio during calls
- `voicemailDetection`: Configure or disable voicemail detection
- `keypadInputPlan`: Handle DTMF keypad inputs (for phone calls)
- `compliancePlan`: HIPAA/PCI compliance settings
- `realtimeConfig`: Real-time model configuration (Gemini 2.0)

### What We'll Use Per Scenario
Different scenarios will vary primarily in:
1. **System prompt** (`model.messages`)
2. **First message** (`firstMessage`) - Can be string or array for random variety
3. **Voice settings** (potentially different voices for different scenarios)
4. **Temperature** (debates might be more dynamic, pitches more measured)

### Random First Messages Feature
To keep practice sessions fresh, scenarios can define multiple first messages:

```typescript
// Config
assistant: {
  firstMessage: [
    "Who is this? How'd you get my number?",
    "I'm busy. What's this about?",
    "Not interested."
  ]
}

// Implementation in debate.tsx
const firstMessage = Array.isArray(scenario.assistant.firstMessage)
  ? scenario.assistant.firstMessage[Math.floor(Math.random() * scenario.assistant.firstMessage.length)]
  : scenario.assistant.firstMessage
```

Each practice session randomly selects one message, creating variety.

---

## DETAILED CHANGES REQUIRED

### 1. SCHEMA CHANGES

**File:** `convex/schema.ts`

**CRITICAL DESIGN PRINCIPLE:** All scenarios use the SAME generic database fields. We are NOT creating scenario-specific schemas. The same `talkingPoints`, `openingApproach`, etc. work for Debate, Sales, and Entrepreneur Pitch - they just mean different things in context.

**opponents table - ADD:**
```typescript
scenarioType: v.string(), // "debate", "sales-cold-prospect", "sales-demo-followup", "entrepreneur-pitch"
prepType: v.string(), // "debate" or "generic" - controls which prep page component to show

// Generic prep fields (used by all non-debate scenarios)
talkingPoints: v.optional(v.array(v.string())),
openingApproach: v.optional(v.string()),
keyPhrases: v.optional(v.array(v.string())),
thingsToAvoid: v.optional(v.array(v.string())),
responseMap: v.optional(v.array(v.object({
  trigger: v.string(),
  response: v.string()
}))),
closingApproach: v.optional(v.string()),

// Keep debate-specific fields (only populated for debate scenarios)
openingOptions: v.optional(...),
argumentFrames: v.optional(...),
zingers: v.optional(...),
receipts: v.optional(...),
opponentIntel: v.optional(...),
closingOptions: v.optional(...),
```

**analyses table - MODIFY:**
```typescript
analysisFramework: v.string(), // "debate", "sales", "entrepreneur", etc.

// Debate-specific fields (only populated for debate scenarios)
techniqueScorecard: v.optional(...),
hasanScores: v.optional(...),

// Generic analysis fields (used by sales, entrepreneur, legal, etc.)
// Each scenario defines its own scoreCategories in config, stored here
skillsAssessment: v.optional(v.array(v.object({
  name: v.string(),        // e.g., "Discovery" (sales) or "Clarity" (entrepreneur)
  score: v.number(),       // 1-10
  feedback: v.string()     // Specific feedback for this skill
}))),
```

**How Analysis Works:**
- **DebateAnalysisView:** Shows Hasan-specific scorecard (techniqueScorecard, hasanScores)
- **GenericAnalysisView:** Shows skillsAssessment array (works for ANY scenario's categories)
- Each scenario config defines its own scoreCategories (Sales has 4, Entrepreneur might have 5, Legal might have 6)
- GenericAnalysisView is a flexible template that displays whatever categories the scenario defines

---

### 2. INPUT FORM CHANGES

**File:** `src/routes/_app/_auth/dashboard/opponent-profile.tsx` (opponent creation)

> ⚠️ **WARNING:** The table below is INCOMPLETE. The actual form has 25+ fields across 6 collapsible sections. Always check `opponent-profile.tsx` for the full list. This table only shows examples.

**Changes:**
1. Add scenario type selector at top of form
2. Show/hide fields based on selected scenario
3. Change field labels/placeholders per scenario

**Example:**
```typescript
const scenario = SCENARIOS[selectedScenarioType]

// Topic field
<Input
  label={scenario.inputs.topic.label}
  placeholder={scenario.inputs.topic.placeholder}
  // ...
/>

// Position field (hide for non-debate)
{!scenario.inputs.position.hidden && (
  <Select label="Position">...</Select>
)}
```

**Field Mapping by Scenario (EXAMPLES ONLY — see code for full list):**

| Field | Debate | Sales | Entrepreneur Pitch |
|-------|--------|-------|-------------------|
| topic | "Debate Topic" | "What are you selling?" | "What's your business/product?" |
| position | "pro/con" | HIDDEN | HIDDEN |
| talkingPoints | "Arguments" | "Common Objections" | "Anticipated Questions" |
| opponentDescription | "Opponent Bio" | "Prospect Background" | "Investor Background" |

**Actual form sections (for debate):**
1. Basic Info — name, topic, position, style, difficulty
2. About Your Opponent — 8 fields (description, org, credentials, style, triggers, etc.)
3. Opponent's Record — 3 fields (past statements, contradictions, track record)
4. Steelmanning Their Case — 3 fields (strongest args, best evidence, likely critiques)
5. Your Audience — 5 fields (description, type, size, disposition, format)
6. Your Context & Directives — 4 fields (research, key points, things to avoid, tone)

---

### 3. PIPELINE CHANGES

**What runs when user creates opponent:**

**Debate Scenario:**
```
Create opponent → Run research → Generate debate prep → Ready to practice
```

**Non-Debate Scenarios:**
```
Create opponent → [SKIP research] → Generate generic prep → Ready to practice
```

**Files to modify:**
- `convex/actions/prep.ts` - Add scenario check, skip research if `pipeline.research = false`
- `convex/actions/geminiPrep.ts` - Same
- Create `convex/actions/genericPrep.ts` - Generate generic prep materials

---

### 4. PREP PAGE CHANGES

**File:** `src/routes/_app/_auth/dashboard/prep.tsx`

**Current:** Shows debate-specific tabs (Study Mode with openings, arguments, zingers, receipts, closings, intel, etc.)

**New: Route to different components based on prepType:**
```typescript
function PrepScreen() {
  const { opponent } = ...

  // Route based on prepType from scenario config
  if (opponent.prepType === 'debate') {
    return <DebatePrepPage opponent={opponent} />
  } else {
    return <GenericPrepPage opponent={opponent} />
  }
}
```

**DebatePrepPage (debate-only, refactored from current):**
- Study Mode tab: Openings, Arguments, Zingers, Receipts, Closings, Opponent Intel
- Quick Reference tab: Opening, Closing, Arguments, Zingers, Counters, Receipts
- Research tab
- Chat tab

**GenericPrepPage (shared template for sales, entrepreneur, legal, healthcare, future scenarios):**
- Study Mode tab:
  - Talking Points (editable list)
  - Opening Approach (text field)
  - Key Phrases (editable list)
  - Things to Avoid (editable list)
  - Response Map (trigger → response pairs)
  - Closing Approach (text field)
- Quick Reference tab: Opening Approach, Talking Points, Response Map, Key Phrases, Things to Avoid, Closing
- Chat tab (optional)

**Quick Reference Tab:**
Both have this tab (existing feature), different content per type:
- **DebatePrepPage Quick Ref:** Shows selected openings, arguments, zingers, counters, receipts, closings
- **GenericPrepPage Quick Ref:** Shows talking points, opening approach, response map, key phrases, things to avoid, closing

---

### 5. VAPI/ASSISTANT CHANGES

**File:** `src/routes/_app/_auth/dashboard/debate.tsx`

**Current:** Hardcoded debate system prompt (lines 244-270)

**New:**
```typescript
const scenario = SCENARIOS[opponent.scenarioType]

// Handle random first message selection
const firstMessage = Array.isArray(scenario.assistant.firstMessage)
  ? scenario.assistant.firstMessage[Math.floor(Math.random() * scenario.assistant.firstMessage.length)]
  : scenario.assistant.firstMessage

const assistantConfig = {
  model: { ... },
  transcriber: { ... },
  voice: scenario.assistant.voice,

  firstMessage: firstMessage,

  systemPrompt: scenario.assistant.systemPrompt
    .replace('{{TOPIC}}', opponent.topic)
    .replace('{{OPPONENT_DESC}}', opponent.opponentDescription)
    // ... other replacements
}
```

**System Prompt Examples:**

**Debate (current):**
```
You are a skilled debater using Mehdi Hasan's debate techniques...
```

**Sales - Cold Prospect:**
```typescript
// Config
assistant: {
  firstMessage: [
    "Who is this? How'd you get my number?",
    "I'm in the middle of something. What's this about?",
    "We're not interested in whatever you're selling.",
    "Can you send me some info? I don't have time.",
    "I'm happy with our current solution."
  ],
  systemPrompt: `
You are a cold prospect who's never heard of the caller or their company.

BEHAVIOR:
- Start skeptical/annoyed (cold call)
- Ask "Who is this?" or "How'd you get my number?"
- Use brush-offs: "I'm busy", "Not interested", "Send me info"
- If they persist, raise objections: price, timing, need, competitor
- Push back on weak responses: "That doesn't answer my question"
- Don't be hostile, just busy and skeptical
- Gradually warm up ONLY if they handle it really well

BACKGROUND:
{{OPPONENT_DESC}}

PRODUCT/SERVICE:
{{TOPIC}}

YOUR GOAL: Be a realistic cold prospect - skeptical, short on time, needs convincing.
  `
}
```

**Sales - Demo Follow-up:**
```typescript
// Config
assistant: {
  firstMessage: [
    "Thanks for the demo yesterday. I have some concerns...",
    "I discussed this with my team. We have questions.",
    "The demo was good, but I'm not sure about the price."
  ],
  systemPrompt: `
You saw a product demo recently. You're interested but have real objections.

BEHAVIOR:
- Reference the demo you saw
- You're more engaged than a cold prospect (you took a meeting)
- Raise specific concerns: price, implementation time, features, integration
- Compare to competitors you're evaluating
- Ask about ROI, support, training
- You're genuinely considering but need convincing

BACKGROUND:
{{OPPONENT_DESC}}

PRODUCT/SERVICE:
{{TOPIC}}

YOUR GOAL: Be a warm prospect with legitimate concerns that need addressing.
  `
}
```

**Entrepreneur Pitch:**
```typescript
// Config
assistant: {
  firstMessage: [
    "Walk me through your business. What problem are you solving?",
    "I've seen a lot of pitches in this space. What makes you different?",
    "Interesting. Tell me about your traction so far.",
    "How big is this market, really?"
  ],
  systemPrompt: `
You are a skeptical investor evaluating a startup pitch.

BEHAVIOR:
- Ask tough questions: business model, traction, competition, unit economics
- Push on weak points: "How is this defensible?", "What's your CAC?"
- Question assumptions: "Why would customers switch?"
- Be professional but challenging
- If they answer well, dig deeper - test if they really know their business
- If they dodge or BS, call it out politely: "That's not what I asked"
- Look for red flags: vague answers, no metrics, ignoring competition

BACKGROUND:
{{OPPONENT_DESC}}

BUSINESS PITCH:
{{TOPIC}}

YOUR GOAL: Be a realistic investor - experienced, pattern-matching, looking for red flags but open to being convinced.
  `
}
```

**Interruption Settings per Scenario:**
```typescript
// Debate: AI can interrupt aggressively
canInterrupt: true,
interruptionThreshold: 100

// Sales: AI doesn't interrupt (realistic prospect behavior)
canInterrupt: false

// Entrepreneur Pitch: AI can interrupt with questions
canInterrupt: true,
interruptionThreshold: 150
```

---

### 6. PREP PANEL DURING PRACTICE

**Existing Implementation:**
- `src/ui/prep-panel.tsx` — Bottom sheet component showing Quick Reference during practice
- `src/routes/_app/_auth/dashboard/debate.tsx` — Floating toggle button (FileText icon) opens PrepPanel

**Current State:** PrepPanel is hardcoded for debate categories.

**Required Change:** Update `PrepPanel` to render different categories based on `prepType`.

**Debate Categories (prepType = "debate"):**
| Category | Source |
|----------|--------|
| Opening | `selectedOpening` |
| Closing | `selectedClosing` |
| Core Arguments | `selectedFrames` |
| Zingers | `selectedZingers` |
| Counters | `selectedCounters` |
| Receipts | `groupedReceipts` |

**Generic Categories (prepType = "generic"):**
| Category | Source |
|----------|--------|
| Opening Approach | `opponent.openingApproach` |
| Closing | `opponent.closingApproach` |
| Talking Points | `opponent.talkingPoints` |
| Key Phrases | `opponent.keyPhrases` |
| Response Map | `opponent.responseMap` |
| Things to Avoid | `opponent.thingsToAvoid` |

**Implementation:**
```tsx
// In PrepPanel component
if (opponent.prepType === 'debate') {
  // Render debate categories (current implementation)
} else {
  // Render generic categories
}
```

---

### 7. ANALYSIS CHANGES

**File:** `convex/actions/analysis.ts`

**Current:** Hardcoded Hasan technique analysis

**New:**
```typescript
const scenario = SCENARIOS[opponent.scenarioType]

const analysisPrompt = scenario.analysis.systemPrompt
  .replace('{{TRANSCRIPT}}', transcript)
  .replace('{{TALKING_POINTS}}', opponent.talkingPoints.join('\n'))

const analysis = await analyzeWithOpenAI(analysisPrompt)
```

**Analysis Prompt Examples:**

**Debate:**
```
Analyze this debate using Mehdi Hasan's framework...
Score: Zingers, Receipts, Judo Moves, etc.
```

**Sales:**
```
Analyze this sales call focusing on:

DISCOVERY: Did they uncover the real objection behind "too expensive"?
- Did they ask "Compared to what?" or similar probing questions?
- Did they listen or just pitch features?

CONTROL: Did they maintain control without being pushy?
- Did they let the prospect brush them off?
- Did they advance the conversation or let it stall?

CONFIDENCE: Were they confident or did they fumble?
- Did they hesitate when defending price?
- Did they offer discounts too early?

CLOSING: Did they advance the deal?
- Did they book next steps?
- Or did they end with "I'll send you some info"?

Provide specific moments where they excelled or struggled.
```

**Output Schema per Scenario:**

**Debate:**
```typescript
{
  analysisFramework: "debate",
  techniqueScorecard: { ... Hasan techniques },
  hasanScores: { ... }
}
```

**Sales:**
```typescript
{
  analysisFramework: "sales",
  skillsAssessment: [
    { name: "Discovery", score: 7, feedback: "Good probing questions..." },
    { name: "Control", score: 5, feedback: "Let prospect brush you off..." },
    { name: "Confidence", score: 8, feedback: "Didn't panic on price..." },
    { name: "Closing", score: 6, feedback: "Got next meeting but could be stronger..." }
  ]
}
```

---

### 8. ANALYSIS DISPLAY CHANGES

**File:** `src/routes/_app/_auth/dashboard/analysis.tsx`

**Current:** Shows Hasan-specific scorecard

**New:**
```typescript
if (analysis.analysisFramework === 'debate') {
  return <DebateAnalysisView analysis={analysis} />
} else {
  return <GenericAnalysisView analysis={analysis} />
}
```

**GenericAnalysisView shows:**
- Skills Assessment (radar chart or bars)
- Moment-by-moment breakdown
- Missed opportunities
- Practice recommendations

---

## UNIVERSAL VS SCENARIO-SPECIFIC

### Universal (All Scenarios)
✅ **From Mehdi Hasan Book:**
- Know Your Audience
- Emotional Connection
- Listening (Critical + Empathetic)
- Confidence Under Pressure
- Composure (Stay Calm)
- Practice/Preparation
- Judo Moves (Concession, Preemption, Reframing)

✅ **Analysis Categories:**
- Preparation Quality
- Emotional Intelligence
- Listening & Responding
- Composure Under Pressure
- Specificity vs Vagueness
- Practice Recommendations

### Debate-Specific Only
❌ Zingers
❌ Booby Traps
❌ Gish Gallop Defense
❌ Receipts/Evidence Arsenal
❌ Peroration/Grand Finale
❌ Rule of Three (useful but not critical)

### Scenario-Specific Additions

**Sales:**
- Discovery (uncovering real objections)
- Control (maintaining conversation flow)
- Closing (advancing the deal)

**Healthcare:**
- Presence (sitting with silence)
- Empathy (naming emotions)
- Patient-Centeredness

**Manager:**
- Clarity (being specific, not vague)
- Handling Defensiveness
- Actionable Next Steps

---

## IMPLEMENTATION ORDER

### Phase 1: Foundation (Week 1)
1. ✅ Document this plan
2. Create scenarios folder structure
3. Define scenario config interface
4. Create debate scenario config (refactor existing)
5. Add scenarioType to opponent schema
6. Update opponent creation UI to select scenario

### Phase 2: Generic Prep System (Week 1-2)
7. Add generic prep fields to schema
8. Create GenericPrepPage component
9. Modify prep.tsx to route to correct page
10. Create genericPrep action (AI generation)
11. Test with manual data

### Phase 3: Sales Scenarios (Week 2)
12. Create scenarios/sales.ts with base config
13. Add 'cold-prospect' variation with first message array and system prompt
14. Add 'demo-followup' variation with first message array and system prompt
15. Write analysis prompt for sales framework (Discovery, Control, Confidence, Closing)
16. Test both sales variations end-to-end
17. Verify random first message selection works

### Phase 3.5: Entrepreneur Scenario (Week 2-3)
18. Create scenarios/entrepreneur.ts
19. Add 'pitch' variation with first message array and system prompt
20. Write analysis prompt for pitch framework
21. Test all 4 scenarios work correctly

### Phase 4: PrepPanel Updates (Week 3)
22. Update PrepPanel to check `prepType`
23. Add generic category rendering (Talking Points, Response Map, etc.)
24. Test PrepPanel works for both debate and generic scenarios

### Phase 5: Analysis Updates (Week 3)
25. Create GenericAnalysisView component
26. Update analysis action to use scenario configs
27. Test analysis for all four scenarios

### Phase 6: Polish & Launch (Week 3-4)
28. End-to-end testing all 4 scenarios
29. Verify random first messages provide variety
30. Documentation
31. User testing
32. Deploy

---

## SUCCESS METRICS

**Technical:**
- ✅ Adding new scenario requires only 1 config file
- ✅ No duplicate code between scenarios
- ✅ Clean separation of concerns

**User:**
- ✅ Sales scenario feels realistic (not like a debate)
- ✅ Prep materials are relevant per scenario
- ✅ Analysis provides scenario-specific insights

**Business:**
- ✅ Can market to 6 different audiences
- ✅ Each use case has dedicated landing page
- ✅ Conversion improves from better product-market fit

---

## RISKS & MITIGATIONS

### Risk 1: Complexity Explosion
**Problem:** Adding 6 scenarios = 6x complexity
**Mitigation:** Plugin architecture keeps each scenario isolated

### Risk 2: Schema Bloat
**Problem:** Adding fields for every scenario clutters schema
**Mitigation:** Generic fields work for most scenarios, debate-specific fields are optional

### Risk 3: AI Prompts Don't Work
**Problem:** Sales AI doesn't behave realistically
**Mitigation:** Iterate on prompts, test with real users, use voice settings to enhance realism

### Risk 4: Analysis Quality Drops
**Problem:** Generic analysis not as insightful as Hasan-specific
**Mitigation:** Scenario-specific analysis prompts, focus on actionable feedback

---

## OPEN QUESTIONS

1. **Should we generate generic prep with AI or leave it blank for user to fill?**
   - Option A: AI suggests based on scenario
   - Option B: User fills it manually
   - Recommendation: AI suggests, user edits

2. **Do we need scenario-specific analysis views or is generic enough?**
   - Start with generic, add specific views if needed

3. **PrepPanel already exists** — Shows Quick Reference during practice via floating toggle button. Just needs to support generic categories.

4. **Existing data:** Development phase — drop database and start fresh. No migration needed.

---

## FILES TO CREATE

```
/scenarios/
  index.ts (registry - exports SCENARIOS object)
  debate.ts (single DebateScenario)
  sales.ts (SalesScenarios with variations: cold-prospect, demo-followup)
  entrepreneur.ts (EntrepreneurScenarios with variations: pitch)

/src/components/prep/
  GenericPrepPage.tsx (shared template for: sales, entrepreneur, legal, healthcare, etc.)
    - Study Mode: Talking Points, Opening Approach, Key Phrases, Response Map, etc.
    - Quick Reference: Shows prep categories
  DebatePrepPage.tsx (refactor from current prep.tsx - debate-only)
    - Study Mode: Openings, Arguments, Zingers, Receipts, etc.
    - Quick Reference: Shows debate categories

/src/components/analysis/
  GenericAnalysisView.tsx (flexible template - displays any scenario's scoreCategories)
  DebateAnalysisView.tsx (refactor from current analysis.tsx - debate-only)

/convex/actions/
  genericPrep.ts (generate generic prep materials)

/docs/
  SCENARIO_SYSTEM_IMPLEMENTATION_PLAN.md (this file)
```

---

## FINAL SUMMARY

**Mission:** Build a plugin architecture for rapid scenario creation.

**Core Principle:** The codebase doesn't know about specific scenarios - it reads config files. Each scenario is ONE file that controls everything.

**What Changes:**
- Opponent schema adds `scenarioType` + generic prep fields
- Input forms show/hide fields based on scenario config
- Prep page routes to DebatePrepPage OR GenericPrepPage
- Vapi gets system prompts from scenario config
- Analysis uses scenario-specific frameworks
- PrepPanel shows scenario-appropriate Quick Reference during practice

**What Stays the Same:**
- Core Vapi integration
- Database structure (generic fields work for all scenarios)
- User flow (create → prep → practice → analyze)
- All UI components (reused across scenarios)

**Launch Scenarios (4 total):**
1. **Debate** - Refactor existing into debate.ts config
2. **Sales - Cold Prospect** - Skeptical prospect who's never heard of you
3. **Sales - Demo Follow-up** - Warm prospect who saw demo, has objections
4. **Entrepreneur - Investor Pitch** - Pitching to skeptical investor

**Key Features:**
- **Random first messages:** Each scenario has array of opening messages, randomly selected per session
- **Shared configs:** Sales variations share inputs/analysis, only prompts differ
- **Different prep pages:** Debate uses DebatePrepPage, others use GenericPrepPage
- **Quick Reference:** Both prep types have Quick Ref tab with scenario-appropriate categories

**End Result:**
User picks "Sales - Cold Prospect" → Gets sales-specific form → AI randomly opens with one of 5 greetings → Practice with realistic cold prospect → Quick ref shows talking points during call → Get sales-specific feedback.

**Scaling:**
- Add sales variation = add entry to SalesScenarios object in sales.ts
- Add new category = create new file (e.g., legal.ts)
- One file per category, N variations per file
