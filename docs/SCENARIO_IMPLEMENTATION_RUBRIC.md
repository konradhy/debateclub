# Scenario Implementation Rubric

**How to build compelling, realistic practice scenarios with proper research and marketing**

---

## The Config Schema: Your Design Primitives

Before researching or building anything, understand what you're actually configuring. Each field in a `ScenarioConfig` is a **design lever** with a specific purpose. Research and content creation should be driven by what these levers need.

### The Complete Config Schema

```typescript
interface ScenarioConfig {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  category: string;              // Grouping (sales, entrepreneur, healthcare)
  
  pipeline: {
    research: boolean;           // Run Firecrawl/Gemini research?
    prep: boolean;               // Show prep page?
    prepType: "debate" | "generic";
  };
  
  inputs: {                      // What context we collect from the user
    topic: InputFieldConfig;
    position?: InputFieldConfig;
    opponentDescription?: InputFieldConfig;
    talkingPoints?: InputFieldConfig;
    // ... custom fields
  };
  
  assistant: {
    firstMessage: string | string[];  // How the conversation opens
    systemPrompt: string;             // Behavioral rules for the AI
    voice?: VoiceConfig;
    temperature?: number;             // 0-1, higher = more creative
    canInterrupt?: boolean;           // Can AI interrupt user?
    interruptionThreshold?: number;   // Lower = more aggressive
  };
  
  analysis: {
    framework: string;
    scoreCategories: ScoreCategory[];  // What dimensions we measure
    systemPrompt: string;              // How we analyze the transcript
  };
}
```

### What Each Element Controls

| Config Element | What It Controls | Design Question |
|----------------|------------------|-----------------|
| `inputs` | What context the user provides before practice | What information does the AI need to be realistic? |
| `firstMessage[]` | The opening line(s) that set the scenario's tone | How do these conversations actually start in real life? |
| `systemPrompt` | The AI's persona, goals, and behavioral rules | What behaviors should reward/punish good/bad technique? |
| `temperature` | How creative/unpredictable the AI is | Is this scenario scripted or improvisational? |
| `canInterrupt` | Whether the AI can cut the user off | Does the real-world counterpart interrupt? |
| `interruptionThreshold` | How aggressive interruptions are (lower = more) | How pushy is this persona? |
| `scoreCategories` | The 4 dimensions measured in analysis | What skills from research should we evaluate? |
| `analysis.systemPrompt` | How feedback is generated | What does "good" look like for each category? |

### Generated Prep Content (for `prepType: "generic"`)

Beyond the config, the system generates prep materials stored on the opponent:

| Prep Element | What It Is | What Research Must Provide |
|--------------|------------|---------------------------|
| `talkingPoints[]` | Key points to hit during the conversation | What are the 5 most important things to communicate? |
| `openingApproach` | Suggested way to open the conversation | What's an effective opening for this scenario? |
| `keyPhrases[]` | Power phrases to use in the moment | What language builds credibility, handles objections, closes? |
| `responseMap[]` | Trigger → Response pairs for objections | What are the 4-6 most common pushbacks and how to handle them? |
| `closingApproach` | Suggested way to close/advance | What's the ideal close for this scenario? |

---

## Research → Config Mapping

**The point of research is to populate config fields.** Every research deliverable should map to a specific config element.

| Research Deliverable | Populates Config Element | Example |
|---------------------|-------------------------|---------|
| Core techniques (5-8) | `scoreCategories`, `analysis.systemPrompt` | "Tactical Empathy" → score category measuring it |
| Common mistakes (3-5) | `systemPrompt` behavioral rules | "Punish if they offer discounts immediately" |
| How conversations start | `firstMessage[]` variations | 5 realistic opening lines from real calls |
| Objection patterns | `responseMap[]` triggers | "Too expensive" → how to respond |
| Power phrases | `keyPhrases[]` | "Help me understand what's driving that concern" |
| Reward/punish dynamics | `systemPrompt` conditional rules | "IF user holds value → shift to non-price concerns" |

---

## What Makes a Great Scenario?

A great scenario is:

1. **Research-Backed** - Based on proven techniques and best practices
2. **Realistic** - Feels like the actual conversation you'd have
3. **Responsive** - AI reacts to your approach (rewards good technique, punishes bad)
4. **Progressive** - Difficulty escalates based on user performance
5. **Teachable** - Clear success/failure states you can learn from
6. **Marketable** - Story that sells itself

**But fundamentally:** A great scenario has a `systemPrompt` that encodes real behavioral dynamics, `firstMessage` variations that feel authentic, and `scoreCategories` that measure techniques people actually need to learn.

---

## The 8-Step Implementation Process

### Step 0: Research Phase (CRITICAL - Do This First!)

**Goal:** Gather everything needed to populate the config fields.

**Research Protocol:**

1. **Web Search for Frameworks**
   - Search: "[scenario type] best practices"
   - Search: "[scenario type] framework"
   - Search: "[scenario type] training techniques"
   - Search: "how to handle [specific challenge]"

2. **Identify Core Techniques** (find 5-8)
   - What do experts recommend?
   - What separates good from great?
   - **→ These become `scoreCategories`**

3. **Document Common Mistakes** (find 3-5)
   - What do beginners do wrong?
   - What triggers bad outcomes?
   - **→ These become "punish" rules in `systemPrompt`**

4. **Find Realistic Opening Lines**
   - How do these conversations actually start?
   - What are the different entry points?
   - **→ These become `firstMessage[]` variations**

5. **Map Objection Patterns**
   - What pushback is common?
   - How should you respond?
   - **→ These become `responseMap[]` entries**

6. **Collect Power Phrases**
   - What language works?
   - What questions open people up?
   - **→ These become `keyPhrases[]`**

**Deliverable:** Research doc with explicit mapping to config fields:

```markdown
# [Scenario] Research

## Core Techniques → scoreCategories
1. [Technique]: [Description] (Source: [Book/Article])
2. ...

## Common Mistakes → systemPrompt punish rules
1. [Mistake]: AI should [response] when user does this
2. ...

## Realistic Openings → firstMessage[]
1. "[Exact opening line]"
2. "[Variation]"
3. ...

## Objection Patterns → responseMap[]
1. Trigger: "[Objection]" → Response: "[How to handle]"
2. ...

## Power Phrases → keyPhrases[]
1. "[Phrase]" - [When to use it]
2. ...
```

---

### Step 1: Create Marketing Content (Two Files Required)

**Question to answer:** How do we explain this scenario and its value?

**Why do this before implementation?**
- Forces clarity on what makes this scenario valuable
- Identifies the emotional hook
- Creates publishable content for launch
- Helps YOU understand what you're building

---

#### Step 1A: Marketing Plan (30-45 min)

**Create:** `marketing-plans/scenario-[name].md`

**Purpose:** Internal planning document that bridges research to blog post.

**See `SCENARIO_CONTENT_RUBRIC.md` for complete template.**

---

#### Step 1B: Blog Post - React Component (2-3 hrs)

**Create:** `src/routes/blog/scenario-[name].tsx`

**CRITICAL: This is a React/TypeScript component, NOT a markdown file.**

**The Blog Formula (all scenario posts follow this exact structure):**

1. Opening Story (150-200 words)
2. Connection to Research (100 words)
3. Why This Is Hard (200 words) - **use StatsGrid component**
4. The Framework (150 words) - **use Blockquote component**
5. Techniques That Work (800-1000 words) - **use TechniqueCard components**
6. Common Mistakes (300 words) - **use MistakesList component**
7. How DebateClub Works (500 words) - **use PracticeEngineDemo component** (CRITICAL!)
8. Opening Scenarios - show firstMessage examples
9. Behavioral Rules - **use BehavioralRulesList component**
10. What Gets Measured - **use ScoreCategoriesGrid component**
11. What Changes After Practice (150 words)
12. The Bottom Line (100 words)
13. CTA - **use CTASection component**
14. Sources - **use SourcesList component**

**Required Imports:**
```tsx
import {
  StatsGrid,
  TechniqueCard,
  MistakesList,
  PracticeEngineDemo,
  ScoreCategoriesGrid,
  BehavioralRulesList,
  CTASection,
  SourcesList,
  Blockquote,
} from "@/components/blog";
```

**Reference:** `src/routes/blog/scenario-contract-negotiation.tsx`

**See `SCENARIO_CONTENT_RUBRIC.md` for complete React component template and component API docs.**

---

**Quality Checklist:**
- [ ] **Created markdown plan:** `marketing-plans/scenario-[name].md`
- [ ] **Created React component:** `src/routes/blog/scenario-[name].tsx`
- [ ] **Uses reusable blog components** from `@/components/blog`
- [ ] **PracticeEngineDemo included** - shows bad/good paths with detections and outcomes
- [ ] **NO EM DASHES (—)**: Use en dash (–) or rephrase. NEVER use double hyphens (--)
- [ ] **Research Cited:** Any "research shows" claim has a citation
- [ ] **NEVER uses "simulation" or "AI"** - uses "system," "practice engine," "DebateClub"
- [ ] **Uses role names** - "buyer," "investor," "patient" not "AI opponent"
- [ ] **Balances sources** - cites 3-5 different frameworks/authors, not over-focused on one
- [ ] Explains the design intent behind practice behavior
- [ ] Maps skills to what gets measured (scoreCategories)
- [ ] Explains what triggers punishment/reward (systemPrompt rules)
- [ ] React component has proper routing and styling
- [ ] Premium design matching existing blog posts
- [ ] Can be published immediately

---

#### Step 1C: Update Blog Index (15 min)

**You MUST add** the new scenario blog post to the blog index page.

**File:** `src/routes/blog/index.tsx`

**Location:** Find the "Practice Guides" section. Add a card linking to your new blog post.

**See:** `SCENARIO_CONTENT_RUBRIC.md` Step 1C for the exact template.

**Checklist:**
- [ ] Added `<Link to="/blog/scenario-[name]">` card in Practice Guides section
- [ ] Card has: emoji/icon, badge, short title (using title formula), 2-sentence description
- [ ] Card has: 2-3 technique keywords, read time
- [ ] If multiple cards, they're wrapped in a 2-column grid

---

### Step 2: Define the Behavioral Arc

**Question to answer:** What conditional rules should the `systemPrompt` encode?

Map out the AI's behavioral journey:

```
START STATE → CONDITIONAL BRANCHES → END STATES

Example (Contract Negotiation):
START: Ready to buy, but anchor with aggressive ask (30% discount)
  ↓
IF user caves immediately → Smell weakness, ask for more (extended terms)
IF user defends value → Respect, shift to non-price concerns
IF user offers creative concession → Consider it, but still push
IF user gets defensive/angry → Dig in harder (you're emotional = weak)
  ↓
END:
- Best: Deal at strong terms (held value, found creative solution)
- Good: Deal at okay terms (some concessions made strategically)
- Bad: Deal at terrible terms (caved on everything)
- Walk: No deal (wouldn't meet bottom line)
```

**Deliverable:** 5-7 behavioral rules that become the `systemPrompt`

---

### Step 3: Write the System Prompt

**Question to answer:** How do we encode the behavioral arc into the `systemPrompt`?

**Template Structure:**
```typescript
systemPrompt: `You are [ROLE] in [SITUATION].

BACKGROUND:
{{OPPONENT_DESC}}

CONTEXT:
{{TOPIC}}

BEHAVIORAL RULES:
- [Rule from behavioral arc]
- [Rule from behavioral arc]
- [Rule from behavioral arc]
- [Escalation condition]
- [De-escalation condition]

YOUR GOAL: [What you're trying to achieve - creates natural tension]

IMPORTANT:
- Reward [good behavior] with [AI response]
- Punish [bad behavior] with [AI response]
- Stay realistic - challenging but not impossible

{{ADDITIONAL_CONTEXT}}`
```

**Design Checklist:**
- [ ] Rules encode reward/punish for researched techniques
- [ ] Goal creates natural tension
- [ ] Escalation path exists (gets harder if user struggles)
- [ ] De-escalation path exists (respects good technique)

---

### Step 4: Create First Messages

**Question to answer:** What are 3-5 realistic ways this conversation starts?

**Draw from research:** How do these conversations actually begin?

**Design Considerations:**
- Each variation should test a different entry point
- Vary the emotional intensity
- Cover different contexts (formal/informal, warm/cold)

```typescript
firstMessage: [
  "[Variation 1 - most common opening]",
  "[Variation 2 - more aggressive]",
  "[Variation 3 - softer/warmer]",
  "[Variation 4 - specific context]",
  "[Variation 5 - edge case]"
]
```

---

### Step 5: Define Score Categories

**Question to answer:** What 4 skills from research should we measure?

Each category should:
- Map to a specific technique from research
- Be observable in the transcript
- Have clear good/bad signals

```typescript
scoreCategories: [
  {
    name: "[Technique Name]",
    description: "[What behavior we're looking for] ([Source])"
  },
  // 4 total categories
]
```

---

### Step 6: Configure Voice & Interruption Settings

**Decision Matrix:**

| Scenario Type | `canInterrupt` | `interruptionThreshold` | Rationale |
|---------------|----------------|------------------------|-----------|
| Debate | true | 100 (aggressive) | Debaters interrupt |
| Investor Pitch | true | 150 (moderate) | Investors ask questions |
| Sales Cold Call | false | N/A | Prospects listen, then object |
| Healthcare | false | N/A | Patients need to be heard |

---

### Step 7: Write Analysis System Prompt

**Question to answer:** How should AI evaluate each score category?

**Template:**
```typescript
systemPrompt: `Analyze this [SCENARIO] using [framework] principles.

TRANSCRIPT:
{{TRANSCRIPT}}

Evaluate:

1. [CATEGORY 1]:
   - Good signals: [what to look for]
   - Bad signals: [what indicates failure]
   - Score 1-10 based on [criteria]

2. [CATEGORY 2]:
   [Same structure]

[Continue for all 4 categories]

Provide specific examples from transcript. Reference [framework] principles.`
```

---

### Step 8: Quality Gates & Testing

**Test Matrix:**

| Test | What to Check |
|------|---------------|
| Happy path | Good technique gets rewarded |
| Failure path | Bad technique gets punished |
| Edge cases | Unusual inputs don't break it |
| Variety | Multiple firstMessage variations work |
| Analysis | Feedback is specific and actionable |

---

## Complete Checklist Per Scenario

### Research (Step 0)
- [ ] 5-8 core techniques documented with sources
- [ ] 3-5 common mistakes documented
- [ ] 5 realistic opening lines collected
- [ ] 4-6 objection/response pairs documented
- [ ] Power phrases collected
- [ ] **All deliverables mapped to config fields**
- [ ] **File created:** `research/scenario-[name]-research.md`

### Marketing Content (Step 1) - THREE STEPS REQUIRED
- [ ] **Step 1A - Marketing Plan:** `marketing-plans/scenario-[name].md` created
- [ ] **Step 1B - Blog Post:** `src/routes/blog/scenario-[name].tsx` created
- [ ] **Step 1C - Blog Index:** Added card to `src/routes/blog/index.tsx` "Practice Guides" section
- [ ] **Uses blog formula** - all 14 sections in correct order
- [ ] **Uses title formula** - "How to [Outcome] [Without/When] [Constraint]"
- [ ] **Uses reusable components** - StatsGrid, TechniqueCard, MistakesList, PracticeEngineDemo, etc.
- [ ] **PracticeEngineDemo included** - shows bad/good technique paths with specific detections
- [ ] Problem statement is emotional and specific
- [ ] Explains practice design intent (NOT "simulation")
- [ ] Maps skills to score categories
- [ ] Blog has proper routing, meta tags, styling
- [ ] **Language rules followed** - no "simulation," no "AI," no em dashes
- [ ] Ready to publish immediately

### Implementation (Steps 2-7)
- [ ] Behavioral arc defined (5-7 rules)
- [ ] `systemPrompt` encodes reward/punish dynamics
- [ ] `firstMessage[]` has 3-5 realistic variations
- [ ] `scoreCategories` map to researched techniques
- [ ] Voice/interruption settings match scenario type
- [ ] `analysis.systemPrompt` has clear good/bad signals

### Testing (Step 8)
- [ ] Happy path works
- [ ] Failure path works
- [ ] Analysis is specific
- [ ] No broken edge cases

---

## Research Sources by Category

### Sales
- "Never Split the Difference" - Chris Voss (negotiation)
- "SPIN Selling" - Neil Rackham (discovery)
- "The Challenger Sale" - Dixon/Adamson (teaching mindset)
- "Gap Selling" - Keenan (problem-first selling)

### Entrepreneurship
- "The Mom Test" - Rob Fitzpatrick (customer discovery)
- "Talking to Humans" - Giff Constable (user research)
- "The Startup Owner's Manual" - Steve Blank (customer development)

### Healthcare
- "Motivational Interviewing" - Miller & Rollnick (behavior change)
- "Crucial Conversations" - Patterson et al. (difficult conversations)
- SPIKES Protocol (breaking bad news)
- Teach-Back Method (patient understanding)

---

## Time Estimate Per Scenario

- Step 0 (Research with config mapping): 2-3 hours
- Step 1 (Marketing): 1-2 hours
- Steps 2-7 (Implementation): 2-3 hours
- Step 8 (Testing): 1 hour (Note, humans not AI will test)

**Total: 6-9 hours for quality, research-backed scenario**
