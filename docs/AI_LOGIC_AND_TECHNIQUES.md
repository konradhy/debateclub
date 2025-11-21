# OratorPrep: AI Logic, Debate Mechanics & Technique Analysis
## Technical Documentation for Review

**Author:** OratorPrep Team
**Version:** 1.0
**Date:** 2025-01-20
**For Review By:** Mehdi Hasan

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Architecture Overview](#system-architecture-overview)
3. [Debate Flow & Mechanics](#debate-flow--mechanics)
4. [AI Opponent Configuration](#ai-opponent-configuration)
5. [The 11 Debate Techniques](#the-11-debate-techniques)
6. [Technique Detection System](#technique-detection-system)
7. [Scoring Algorithms](#scoring-algorithms)
8. [Post-Debate Analysis](#post-debate-analysis)
9. [All System Prompts](#all-system-prompts)
10. [Areas for Expert Review](#areas-for-expert-review)

---

## Executive Summary

OratorPrep is a voice-based debate training platform that helps users master debate techniques inspired by Mehdi Hasan's approach to argumentation. The system:

1. **Conducts live voice debates** using Vapi (voice AI) and GPT-4o/Groq
2. **Detects debate techniques in real-time** using OpenRouter + Claude/GPT-4
3. **Scores technique effectiveness** using pattern-matching algorithms (1-10 scale)
4. **Generates comprehensive post-debate analysis** including winner determination, missed opportunities, and key moments

**Core Innovation:** Real-time technique detection during natural conversation, allowing users to learn debate tactics through practice rather than theory.

---

## System Architecture Overview

### Technology Stack

```
Voice Layer:        Vapi (voice transcription + synthesis)
Debate AI:          OpenAI GPT-4o / Groq Llama 3
Analysis AI:        OpenRouter (Claude Sonnet / GPT-4)
Backend:            Convex (serverless functions + database)
Frontend:           React + TanStack Router
```

### Information Flow

```
User speaks → Vapi transcribes → GPT-4o responds →
Vapi synthesizes speech → Transcript sent to webhook →
Analysis AI detects techniques → Techniques scored →
Real-time feedback displayed → Post-debate analysis generated
```

---

## Debate Flow & Mechanics

### 1. Pre-Debate Configuration

Users can either:
- **Use default opponent** (e.g., Flo-Jo debate)
- **Create custom opponent** with:
  - Custom topic
  - Position (pro/con)
  - Debate style (aggressive, socratic, academic, political)
  - Difficulty level (easy, medium, hard)
  - 3-10 key talking points

### 2. Live Debate Session

**Duration:** Up to 30 minutes
**Format:** Free-form conversation (not structured rounds)
**Voice Processing:**
- User speaks → Deepgram Nova-2 transcription (300ms endpointing)
- AI responds → ElevenLabs voice synthesis
- Average latency: < 1 second

**Real-time Behavior:**
- AI can be interrupted naturally
- AI will interrupt if user rambles > 45 seconds
- AI keeps responses under 30 seconds
- Turn-taking handled automatically by Vapi

### 3. Transcript & Technique Logging

Every exchange is:
1. **Stored in database** (speaker, text, timestamp)
2. **Sent to analysis AI** (after each exchange pair)
3. **Techniques detected** and logged with effectiveness scores
4. **Displayed to user** in real-time during debate

### 4. Post-Debate Analysis

When debate ends, the system generates:
- Performance summaries (user & AI)
- Average effectiveness scores per technique
- 3-5 improvement tips per speaker
- 3-5 missed opportunities
- 2-3 key debate moments
- Winner determination (user/AI/tie)

---

## AI Opponent Configuration

### System Prompt Structure

The AI opponent receives a dynamically generated system prompt based on user configuration:

```typescript
// Core prompt template
`You are a skilled debater using Mehdi Hasan's debate techniques.

DEBATE SETUP:
- Topic: ${topic}
- Your position: ${aiPosition} (PRO or CON)
- User position: ${userPosition}
- Difficulty: ${difficulty}
- Style: ${style}

YOUR KEY ARGUMENTS:
${talkingPoints.map(tp => `- ${tp}`).join('\n')}

TECHNIQUES TO USE:
1. Concession & Pivot - Acknowledge good points then pivot
2. Receipts - Deploy specific evidence, statistics, citations
3. Zinger - Memorable one-liners (under 20 words)
4. Reframing - Change the premise of the question
5. Preemption - Address arguments before they're made

BEHAVIORAL RULES:
- Speak naturally and conversationally
- You CAN be interrupted - respond naturally
- You CAN interrupt if user rambles > 45 seconds
- Keep responses under 30 seconds of speech
- Focus ONLY on debating - do not mention analysis or techniques
- Be respectful but firm in your arguments
- Use evidence and facts to support your position`
```

### Debate Style Variations

**Aggressive:**
- Confrontational tone
- Direct challenges
- Frequent use of provocative questions
- Fast-paced responses

**Socratic:**
- Question-based reasoning
- Leading questions that expose contradictions
- Less declarative, more interrogative
- Slower, more methodical pace

**Academic:**
- Formal language
- Heavy emphasis on citations and evidence
- Structured arguments
- Longer, more detailed responses

**Political:**
- Rhetorical flourishes
- Emotional appeals
- Sound-bite friendly responses
- Use of rule of three and zingers

### First Message

The AI always speaks first:

```
"I'm ready to debate. The topic is: [TOPIC]. I'll argue that [POSITION].
Would you like to make your opening statement first, or shall I begin?"
```

This gives the user control over who presents first while maintaining conversational flow.

---

## The 11 Debate Techniques

### 1. Concession & Pivot

**Definition:** Acknowledging a fair point from the opponent, then pivoting to where they're wrong.

**Formula:** "Here's where they're right. But here's where they're wrong."

**Why It Works:**
- Shows intellectual honesty
- Disarms opponent
- Establishes credibility before counterattack
- Makes your criticism more devastating

**Example:**
> "You're absolutely right that climate action has economic costs. But what you're missing is that inaction costs far more. The CBO estimates that unchecked climate change will cost the US economy $2 trillion annually by 2050."

**Detection Patterns:**
- Acknowledgment phrases: "you're right," "that's fair," "I agree," "that's a good point"
- Pivot words: "but," "however," "what you're missing," "the real issue"

**Effectiveness Scoring (1-10):**
- Base: 1
- Has acknowledgment: +3
- Has pivot: +3
- Both present: +2 (synergy bonus)
- Optimal length (50-200 words): +1
- Too long (>200 words): -1

---

### 2. Receipts

**Definition:** Deploying specific evidence, statistics, citations, or data to support an argument. Strategic timing of evidence deployment.

**Formula:** "According to [source], [specific data/fact]..."

**Why It Works:**
- Facts beat opinions
- Hard to argue against specific data
- Establishes authority
- Makes vague claims concrete

**Example:**
> "According to a 2023 Pew Research study, 73% of economists agree that climate action creates more jobs than it destroys. The Bureau of Labor Statistics projects 500,000 new green energy jobs by 2030."

**Detection Patterns:**
- Numbers, percentages, dollar amounts, years
- Citation phrases: "according to," "study shows," "research indicates," "data suggests"
- Specific sources: CBO, WHO, UN, CDC, Pew, Gallup, Harvard, Stanford
- Evidence language: "proves," "demonstrates," "shows that"

**Effectiveness Scoring (1-10):**
- Base: 1
- Has citation phrase: +3
- Has evidence language: +2
- Contains numbers: +1
- Contains percentages: +1
- Contains dollar amounts: +1
- Contains years: +1
- Multiple data types (2+): +1
- Names specific credible source: +1

---

### 3. Zinger

**Definition:** A memorable, witty one-liner that crystallizes a point. Should be brief (under 20 words), clever, and impactful.

**Formula:** Short, punchy, memorable statement with wit or contrast.

**Why It Works:**
- Memorable sound bites
- Simplifies complex arguments
- Creates "viral" moments
- Leaves lasting impression

**Example:**
> "You claim to be pro-life, yet you oppose universal healthcare. That's not pro-life, that's pro-birth."

**Detection Patterns:**
- Very brief (≤10 words ideal, ≤20 acceptable)
- Similes/metaphors: "that's like," "it's as if"
- Comparisons: "more than you've"
- Contrast: "at least I"
- Irony: "coming from someone who"
- Single punchy sentence

**Effectiveness Scoring (1-10):**
- Base: 1
- Very brief (≤10 words): +3
- Brief (11-20 words): +2
- Acceptable (21-30 words): +1
- Too long (>30 words): -1
- Has wit pattern: +2
- Single sentence: +2
- Has contrast/opposition: +1
- Direct/personal: +1
- Impact words (interesting, ironic, funny, telling, actually, really): +1

---

### 4. Reframing

**Definition:** Rejecting the premise of a loaded question or argument. Reframing the debate on your terms.

**Formula:** "I don't accept the premise..." or "The real question is..."

**Why It Works:**
- Refuses to play defense
- Changes terrain to your advantage
- Exposes false dichotomies
- Controls the narrative

**Example:**
> "I don't accept the premise that we have to choose between the economy and the environment. The real question is: can we afford NOT to invest in clean energy when fossil fuel dependency costs us $500 billion annually?"

**Detection Patterns:**
- Premise rejection: "I don't accept the premise," "that's the wrong question," "that's not the right way"
- Reframing language: "the real issue is," "let's reframe this," "the question should be," "instead of asking"
- Alternative framing: "what we should be asking," "the better question," "think about it this way," "from a different perspective"

**Effectiveness Scoring (1-10):**
- Base: 1
- Has premise rejection: +4
- Has alternative framing: +3
- Both present: +2 (complete reframe)
- Good length (30-150 words): +1

---

### 5. Preemption

**Definition:** Anticipating and addressing an opponent's argument before they make it. Steals their thunder.

**Formula:** "Now, my opponent is going to tell you... But here's why that's wrong..."

**Why It Works:**
- Robs opponent of their best arguments
- Shows you understand the issue deeply
- Forces opponent to find new arguments on the fly
- Demonstrates strategic thinking

**Example:**
> "Now, my opponent is going to tell you that this policy is too expensive. But here's what they won't tell you: doing nothing costs more. The CBO estimates inaction will cost $3 trillion over the next decade."

**Detection Patterns:**
- Anticipatory language: "now, [opponent] will say," "I know what you're going to say," "you'll probably argue," "before you say," "some will claim"
- Future tense about opponent's arguments
- Counter-preemption: "but here's why," "and yet," "however," "but that's wrong/misleading"

**Effectiveness Scoring (1-10):**
- Base: 1
- Has preemption pattern: +5
- Has counter-argument: +2
- Complete preemption (both): +2

---

### 6. Provocative Question

**Definition:** Asking a question that forces the opponent into a defensive position or exposes a contradiction. Rhetorical or challenging.

**Formula:** "How can you [claim X] when [contradictory fact Y]?"

**Why It Works:**
- Puts opponent on defense
- Exposes logical contradictions
- Creates "gotcha" moments
- Difficult to dodge without looking evasive

**Example:**
> "How can you honestly say you care about the deficit when you voted for a $2 trillion tax cut that overwhelmingly benefited the wealthy?"

**Detection Patterns:**
- Must contain "?"
- Provocative phrasing: "how can you possibly/honestly/seriously," "why would you/anyone," "what gives you the right," "do you really believe"
- Challenge patterns: "you claim," "you said," "your position," "if that's true, then"
- Multiple questions (stacking)

**Effectiveness Scoring (1-10):**
- Base: 1 (returns 1 if no "?")
- Has provocative pattern: +4
- Has challenge pattern: +2
- Multiple questions (≥2): +2
- Brief (≤20 words): +2

---

### 7. Personal Story

**Definition:** Humanizing abstract arguments with a relatable anecdote or personal experience.

**Formula:** "Let me tell you about [person/experience]..."

**Why It Works:**
- Creates emotional connection
- Makes abstract concrete
- Hard to argue against personal experience
- Memorable and relatable

**Example:**
> "Let me tell you about Maria, a nurse I met in Detroit. She works 60-hour weeks, yet she can't afford her son's insulin. That's not a healthcare system, that's a moral failure."

**Detection Patterns:**
- Personal story indicators: "I remember," "I witnessed," "let me tell you about," "when I was," "I once knew/met/saw," "my friend/family"
- Narrative elements: "and then," "after that," "she told me," "he said"
- Emotional connections: "felt," "realized," "understood," "learned," "that's when I"
- Needs length (>40 words) for proper story

**Effectiveness Scoring (1-10):**
- Base: 1
- Has story pattern: +4
- Has narrative element: +2
- Has emotional connection: +2
- Good length (40-200 words): +2

---

### 8. Rule of Three

**Definition:** Structuring arguments in groups of three for memorability and rhythm.

**Formula:** "[Thing 1], [Thing 2], and [Thing 3]"

**Why It Works:**
- Psychologically satisfying pattern
- Easy to remember
- Creates rhythm
- Sounds complete and authoritative

**Example:**
> "This bill fails on three counts: it's economically reckless, morally bankrupt, and politically toxic."

**Detection Patterns:**
- List pattern: "X, Y, and Z"
- Numbered lists: "first... second... third..." or "one... two... three..."
- Parallel structure (similar length items)

**Effectiveness Scoring (1-10):**
- Base: 1
- Found list of three: +5
- Parallel structure (similar word counts): +2
- Numbered pattern: +3

---

### 9. Peroration

**Definition:** Ending with a high-energy, emotional summary to inspire or outrage. The closing statement that leaves a lasting impact.

**Formula:** "So I ask/urge you... [emotional appeal]... [call to action]"

**Why It Works:**
- Recency effect (last thing heard)
- Emotional resonance
- Motivates action
- Memorable conclusion

**Example:**
> "So I ask you: what kind of country do we want to be? One that stands with the vulnerable, or one that turns away? The time to choose is now. History is watching."

**Detection Patterns:**
- Closing language: "so I ask/urge," "let us remember/choose," "we must act/decide," "the time has come," "we cannot afford/wait"
- Emotional words: "freedom," "justice," "hope," "future," "children," "legacy," "right side of history"
- Call to action: "we must," "we should," "let's," "I call on you"

**Effectiveness Scoring (1-10):**
- Base: 1
- Has closing pattern: +3
- Has emotional language: +3
- Has call to action: +2
- Complete peroration (all three): +2

---

### 10. Gish Gallop

**Definition:** Overwhelming the opponent with a flood of arguments. Can be used offensively (to overwhelm) or defensively (picking the weakest argument to refute).

**Formula:** "And what about X? Plus Y. Also Z. Furthermore A. Moreover B..."

**Why It Works (Offensively):**
- Overwhelms opponent
- Creates appearance of many strong arguments
- Hard to address all points in limited time

**Why It Works (Defensively):**
- Pick weakest argument to refute
- Ignore stronger arguments
- Make opponent look weak

**Example:**
> "And what about inflation? Plus the labor shortage. Also the supply chain crisis. Furthermore, the trade deficit. Moreover, rising interest rates. Not to mention the housing crisis. How do you explain all of that?"

**Detection Patterns:**
- Multiple transition words: "and what about," "plus," "also," "furthermore," "moreover," "additionally," "not to mention"
- Multiple questions (≥3 "?")
- High sentence density (≥5 sentences)
- Long word count (>100 words)

**Effectiveness Scoring (1-10):**
- Base: 1
- 3+ transitions: +4
- 2 transitions: +2
- 3+ questions: +3
- 5+ sentences: +2
- >100 words: +1

---

### 11. Strategic Interruption

**Definition:** Breaking the opponent's rhythm when they are rambling, misleading, or making a false claim. Timing is crucial.

**Formula:** "Hold on / Wait / Stop right there - [correction]"

**Why It Works:**
- Stops misinformation from spreading
- Breaks opponent's flow
- Shows confidence
- Creates "fact-check" moment

**Example:**
> "Wait - that's not true. The study you're citing was debunked by the CBO in 2022. Let's stick to facts."

**Detection Patterns:**
- Interruption language: "hold on," "wait," "stop right there," "let me stop/interrupt you," "I have to interrupt"
- Correction language: "that's not true," "that's misleading," "actually," "in fact," "no, that's"
- Brief (≤30 words for quick interruption)

**Effectiveness Scoring (1-10):**
- Base: 1
- Has interruption pattern: +4
- Has correction pattern: +3
- Brief (≤30 words): +2

**Note:** This is harder to detect from text alone. In real-time debates, actual interruption timing matters most.

---

## Technique Detection System

### Real-Time Analysis Flow

```
1. User speaks → Transcript saved to database
2. AI responds → Transcript saved to database
3. Webhook triggers → analyzeExchangePostHoc action
4. Last 2 exchanges (user + AI) sent to OpenRouter
5. Claude Sonnet analyzes for technique usage
6. Techniques detected, scored, and stored
7. Frontend displays techniques in real-time
```

### Analysis Prompt

**System Prompt for Technique Detection:**

```
You are an expert debate analyst. Analyze the following debate exchange and detect
which of these techniques were used:

1. Concession & Pivot: Acknowledging a fair point from the opponent, then pivoting
   to where they're wrong. Formula: "Here's where they're right. But here's where
   they're wrong."

2. Receipts: Deploying specific evidence, statistics, citations, or data to support
   an argument. Strategic evidence timing.

3. Zinger: A memorable, witty one-liner that crystallizes a point. Should be brief
   (under 20 words), clever, and impactful.

[... all 11 techniques with definitions ...]

For each detected technique, identify:
- Which speaker used it (user or assistant)
- The exact text where it appears
- The technique name (use snake_case: concession_pivot, receipts, zinger, etc.)

Return a JSON object with this structure:
{
  "userTechniques": [
    {
      "technique": "concession_pivot",
      "text": "exact text where technique appears",
      "context": "brief context"
    }
  ],
  "aiTechniques": [
    {
      "technique": "receipts",
      "text": "exact text where technique appears",
      "context": "brief context"
    }
  ]
}

Only include techniques that are clearly present. Be conservative - only detect
if you're confident.
```

**User Prompt:**

```
Analyze this debate exchange:

USER: "[user's exact words]"
ASSISTANT: "[AI's exact words]"

Detect which techniques were used.
```

### Scoring After Detection

After techniques are detected by the AI, each one is passed through rule-based scoring functions:

```typescript
switch (technique) {
  case "concession_pivot":
    effectiveness = scoreConcessionPivot(text);
    break;
  case "receipts":
    effectiveness = scoreReceipts(text);
    break;
  // ... etc for all 11 techniques
}
```

This hybrid approach combines:
- **AI detection** (better at understanding context and nuance)
- **Rule-based scoring** (consistent, transparent, debuggable)

---

## Scoring Algorithms

Each technique has a deterministic scoring function that returns 1-10 based on pattern matching. These are designed to be:

1. **Transparent** - No black box ML
2. **Debuggable** - Easy to see why a score was assigned
3. **Tunable** - Can adjust patterns based on expert feedback
4. **Consistent** - Same input = same output

### Example: Concession & Pivot Scoring

```typescript
export function scoreConcessionPivot(text: string): number {
  let score = 1;

  // Check for acknowledgment phrases
  const acknowledgmentPatterns = [
    /\byou'?re\s+(right|correct|absolutely right)/i,
    /\bI\s+(agree|acknowledge|accept|concede)/i,
    /\bthat'?s\s+(true|fair|valid|a good point)/i,
    // ... more patterns
  ];

  // Check for pivot words
  const pivotPatterns = [
    /\bbut\b/i,
    /\bhowever\b/i,
    /\bwhat\s+you'?re\s+missing/i,
    // ... more patterns
  ];

  const hasAcknowledgment = acknowledgmentPatterns.some(p => p.test(text));
  const hasPivot = pivotPatterns.some(p => p.test(text));

  if (hasAcknowledgment) score += 3;
  if (hasPivot) score += 3;
  if (hasAcknowledgment && hasPivot) score += 2; // Synergy bonus

  // Length optimization
  const wordCount = text.split(/\s+/).length;
  if (wordCount > 50 && wordCount < 200) score += 1; // Good length
  if (wordCount > 200) score -= 1; // Too long, loses impact

  return Math.max(1, Math.min(10, score)); // Clamp to 1-10
}
```

### Scoring Philosophy

**Why 1-10 scale?**
- Familiar to users (like school grades)
- Granular enough to show improvement
- Not so granular that differences are meaningless

**Score interpretation:**
- 1-3: Weak/ineffective use
- 4-6: Adequate but could improve
- 7-8: Good execution
- 9-10: Excellent/masterful use

---

## Post-Debate Analysis

### Comprehensive Analysis Prompt

**System Prompt:**

```
You are an expert debate coach analyzing a debate performance. Provide constructive
feedback and improvement tips.

Analyze the debate transcript and detected techniques. Generate:
1. A brief summary of the USER'S performance
2. A brief summary of the AI'S performance
3. List of techniques used
4. Average effectiveness scores for each technique type
5. 3-5 actionable improvement tips for the USER
6. 3-5 actionable improvement tips for the AI (how it could have debated better)
7. 3-5 missed opportunities where the USER could have used a technique but didn't
8. 2-3 key moments that were turning points in the debate
9. Determination of who won the debate (user, ai, or tie) based on argumentation quality

Return JSON with this structure:
{
  "userSummary": "User performance summary...",
  "aiSummary": "AI performance summary...",
  "techniquesUsed": ["concession_pivot", "receipts", ...],
  "userEffectivenessScores": {
    "concession_pivot": 7.5,
    "receipts": 6.0,
    ...
  },
  "aiEffectivenessScores": {
    "concession_pivot": 8.0,
    "receipts": 7.0,
    ...
  },
  "userImprovementTips": [
    "User Tip 1",
    "User Tip 2"
  ],
  "aiImprovementTips": [
    "AI Tip 1",
    "AI Tip 2"
  ],
  "missedOpportunities": [
    "When the AI said X, you could have used a Concession & Pivot to acknowledge
     their point but pivot to Y",
    "At timestamp Z, there was an opportunity to use Receipts by citing specific evidence"
  ],
  "keyMoments": [
    {
      "timestamp": 12345,
      "speaker": "user",
      "text": "excerpt from the debate",
      "significance": "This was a turning point because..."
    }
  ],
  "winner": "user" // or "ai" or "tie"
}
```

**User Prompt:**

```
Debate Topic: [topic]
User Position: [pro/con]
AI Position: [pro/con]

Transcript:
USER: [text]
ASSISTANT: [text]
USER: [text]
...

Detected Techniques:
user used concession_pivot (effectiveness: 8/10)
assistant used receipts (effectiveness: 7/10)
...

Provide comprehensive analysis.
```

### Winner Determination Criteria

The AI considers:
1. **Argument quality** - Logic, coherence, evidence
2. **Technique usage** - Variety and effectiveness
3. **Rebuttal strength** - How well they countered opponent
4. **Evidence deployment** - Use of facts, stats, sources
5. **Rhetorical effectiveness** - Persuasiveness

Not based on:
- Who spoke more
- Who spoke first/last
- Personal preference for topic position

---

## All System Prompts

### 1. AI Opponent Debate Prompt

**Location:** `src/routes/_app/_auth/dashboard/debate.tsx` (lines 244-270)

**Full Prompt:**

```
You are a skilled debater using Mehdi Hasan's debate techniques.

DEBATE SETUP:
- Topic: ${topic}
- Your position: ${aiPosition.toUpperCase()}
- User position: ${userPosition.toUpperCase()}
- Difficulty: ${difficulty}
- Style: ${style}

YOUR KEY ARGUMENTS:
${talkingPoints.map((tp: string) => `- ${tp}`).join('\n')}

TECHNIQUES TO USE:
1. Concession & Pivot - When user makes a good point, acknowledge it then pivot
2. Receipts - Deploy specific evidence, statistics, citations
3. Zinger - Memorable one-liners (under 20 words)
4. Reframing - Change the premise of the question
5. Preemption - Address arguments before they're made

BEHAVIORAL RULES:
- Speak naturally and conversationally
- You CAN be interrupted - respond naturally
- You CAN interrupt if user rambles > 45 seconds
- Keep responses under 30 seconds of speech
- Focus ONLY on debating - do not mention analysis, logging, or techniques
- Be respectful but firm in your arguments
- Use evidence and facts to support your position
```

**Variables:**
- `topic`: Debate topic (string)
- `aiPosition`: "pro" or "con"
- `userPosition`: "pro" or "con" (opposite of AI)
- `difficulty`: "easy", "medium", or "hard"
- `style`: "aggressive", "socratic", "academic", or "political"
- `talkingPoints`: Array of 3-10 key arguments

---

### 2. Real-Time Technique Detection Prompt

**Location:** `convex/analysis.ts` (lines 262-309)

**System Prompt:**

```
You are an expert debate analyst. Analyze the following debate exchange and detect
which of these techniques were used:

1. **Concession & Pivot**: Acknowledging a fair point from the opponent, then pivoting
   to where they're wrong. Formula: "Here's where they're right. But here's where
   they're wrong."

2. **Receipts**: Deploying specific evidence, statistics, citations, or data to support
   an argument. Strategic evidence timing.

3. **Zinger**: A memorable, witty one-liner that crystallizes a point. Should be brief
   (under 20 words), clever, and impactful.

4. **Reframing**: Rejecting the premise of a loaded question or argument.
   Formula: "I don't accept the premise..."

5. **Preemption**: Anticipating and addressing an opponent's argument before they make it.
   Formula: "Now, my opponent is going to tell you..."

6. **Provocative Question**: Asking a question that forces the opponent into a defensive
   position or exposes a contradiction.

7. **Personal Story**: Humanizing abstract arguments with a relatable anecdote.

8. **Rule of Three**: Structuring arguments in groups of three for memorability.

9. **Peroration**: Ending with a high-energy, emotional summary to inspire or outrage.

10. **Gish Gallop Attack**: Overwhelming the opponent with a flood of weak arguments
    (or defending against it by picking the weakest one).

11. **Strategic Interruption**: Breaking the opponent's rhythm when they are rambling
    or misleading.

For each detected technique, identify:
- Which speaker used it (user or assistant)
- The exact text where it appears
- The technique name (use snake_case: concession_pivot, receipts, zinger, reframing,
  preemption, provocative_question, personal_story, rule_of_three, peroration,
  gish_gallop, strategic_interruption)

Return a JSON object with this structure:
{
  "userTechniques": [
    {
      "technique": "concession_pivot",
      "text": "exact text where technique appears",
      "context": "brief context"
    }
  ],
  "aiTechniques": [
    {
      "technique": "receipts",
      "text": "exact text where technique appears",
      "context": "brief context"
    }
  ]
}

Only include techniques that are clearly present. Be conservative - only detect if
you're confident.
```

**User Prompt:**

```
Analyze this debate exchange:

${userExchange ? `USER: "${userExchange.text}"` : ""}
${assistantExchange ? `ASSISTANT: "${assistantExchange.text}"` : ""}

Detect which techniques were used.
```

---

### 3. Post-Debate Comprehensive Analysis Prompt

**Location:** `convex/analysis.ts` (lines 489-554)

**System Prompt:**

```
You are an expert debate coach analyzing a debate performance. Provide constructive
feedback and improvement tips.

Analyze the debate transcript and detected techniques. Generate:
1. A brief summary of the USER'S performance
2. A brief summary of the AI'S performance
3. List of techniques used
4. Average effectiveness scores for each technique type
5. 3-5 actionable improvement tips for the USER
6. 3-5 actionable improvement tips for the AI (how it could have debated better)
7. 3-5 missed opportunities where the USER could have used a technique but didn't
8. 2-3 key moments that were turning points in the debate
9. Determination of who won the debate (user, ai, or tie) based on argumentation quality

Return JSON with this structure:
{
  "userSummary": "User performance summary...",
  "aiSummary": "AI performance summary...",
  "techniquesUsed": ["concession_pivot", "receipts", "zinger", "reframing", "preemption",
                     "provocative_question", "personal_story", "rule_of_three",
                     "peroration", "gish_gallop", "strategic_interruption"],
  "userEffectivenessScores": {
    "concession_pivot": 7.5,
    "receipts": 6.0,
    "zinger": 8.0,
    ...
  },
  "aiEffectivenessScores": {
    "concession_pivot": 8.0,
    "receipts": 7.0,
    "zinger": 9.0,
    ...
  },
  "userImprovementTips": [
    "User Tip 1",
    "User Tip 2"
  ],
  "aiImprovementTips": [
    "AI Tip 1",
    "AI Tip 2"
  ],
  "missedOpportunities": [
    "When the AI said X, you could have used a Concession & Pivot to acknowledge their
     point but pivot to Y",
    "At timestamp Z, there was an opportunity to use Receipts by citing specific evidence"
  ],
  "keyMoments": [
    {
      "timestamp": 12345,
      "speaker": "user",
      "text": "excerpt from the debate",
      "significance": "This was a turning point because..."
    }
  ],
  "winner": "user"
}
```

**User Prompt:**

```
Debate Topic: ${debate.topic}
User Position: ${debate.userPosition}
AI Position: ${debate.aiPosition}

Transcript:
${exchanges.map(e => `${e.speaker.toUpperCase()}: ${e.text}`).join('\n\n')}

Detected Techniques:
${techniques.map(t =>
  `${t.speaker} used ${t.technique} (effectiveness: ${t.effectiveness}/10)`
).join('\n')}

Provide comprehensive analysis.
```

---

## Areas for Expert Review

### Questions for Mehdi Hasan

We would greatly appreciate your expert feedback on the following:

#### 1. Technique Definitions & Formulas

**Question:** Are our definitions of the 11 techniques accurate and complete? Are there nuances we're missing?

**Specific areas:**
- Is "Concession & Pivot" formula ("Here's where they're right. But here's where they're wrong.") too rigid?
- Are we conflating "Receipts" with general evidence deployment, or is there a strategic timing element we're missing?
- Is "Gish Gallop" correctly characterized as both offensive and defensive technique?

#### 2. Technique Detection Patterns

**Question:** Are the pattern-matching rules we use to detect techniques capturing the essence of each technique, or are they too surface-level?

**Example concern:**
- For "Zinger," we heavily weight brevity and wit patterns. But is a zinger more about *delivery* and *context* than just word count and similes?
- For "Strategic Interruption," how much does timing matter vs. the words used?

#### 3. Scoring Algorithms

**Question:** Do the scoring rubrics (1-10) make sense? Are we weighting the right factors?

**Example:**
- Concession & Pivot: We give +3 for acknowledgment, +3 for pivot, +2 for both. Should the "both" synergy be worth more?
- Receipts: Should naming a specific source (e.g., "CBO") be worth more than just having numbers?

#### 4. AI Opponent Behavior

**Question:** Does the AI opponent prompt accurately capture your debate approach? What's missing?

**Specific questions:**
- Should the AI be more aggressive in certain styles?
- Are the behavioral rules (30-second responses, can interrupt if user rambles >45s) reasonable?
- Should difficulty levels change the *tactics* or just the *sophistication* of arguments?

#### 5. Missing Techniques

**Question:** Are there debate techniques you use that we haven't included in our 11?

**Current list:**
1. Concession & Pivot
2. Receipts
3. Zinger
4. Reframing
5. Preemption
6. Provocative Question
7. Personal Story
8. Rule of Three
9. Peroration
10. Gish Gallop
11. Strategic Interruption

#### 6. Post-Debate Analysis

**Question:** Is the post-debate analysis providing actionable feedback, or is it too generic?

**What we currently provide:**
- Performance summaries
- Technique effectiveness scores
- 3-5 improvement tips
- Missed opportunities
- Key moments
- Winner determination

**What might be missing:**
- Specific alternative phrasings for missed opportunities?
- Comparative analysis to expert debaters?
- Progression tracking over time?

#### 7. Educational Effectiveness

**Question:** Will users actually *learn* debate techniques through this system, or do they need more explicit instruction?

**Current approach:**
- Learning by doing (practice debates)
- Real-time technique detection
- Post-debate analysis
- No upfront tutorials or theory

**Alternative approaches:**
- Pre-debate tutorials on techniques?
- Mid-debate coaching hints?
- Technique drills before full debates?

#### 8. Prompt Engineering

**Question:** Are the system prompts for the AI opponent and technique detection optimal, or should they be structured differently?

**Specific questions:**
- Should the AI opponent prompt include examples of each technique?
- Should technique detection use few-shot examples?
- Is JSON the right output format, or would natural language → parsing work better?

---

## Technical Implementation Details

### Code Locations

For reference, here are the key files:

**AI & Prompts:**
- AI Opponent Configuration: `src/routes/_app/_auth/dashboard/debate.tsx` (lines 217-313)
- Technique Detection: `convex/analysis.ts` (analyzeExchangePostHoc function)
- Post-Debate Analysis: `convex/analysis.ts` (generateFullAnalysis function)

**Scoring:**
- All 11 scoring functions: `convex/lib/scoring.ts`

**Database Schema:**
- Debates, exchanges, techniques, analyses: `convex/schema.ts`

**UI:**
- Real-time technique display: `src/routes/_app/_auth/dashboard/debate.tsx` (lines 418-469)
- Post-debate analysis page: `src/routes/_app/_auth/dashboard/analysis.tsx`

---

## Appendix: Technique Examples from Your Work

*[This section would be populated with specific examples from Mehdi Hasan's debates, if permissions allow]*

**Concession & Pivot Example:**
> "You're right that the polls show Americans are concerned about immigration. But what those same polls also show is that Americans want a pathway to citizenship for DREAMers."

**Receipts Example:**
> "According to the Migration Policy Institute, undocumented immigrants contributed $11.74 billion in state and local taxes in 2014."

**Zinger Example:**
> "You're pro-life? Name three things you've done to improve the life of a child after they're born."

**Preemption Example:**
> "Now, my opponent will tell you this is about religious freedom. But let me be clear: discrimination is not a religious value."

---

## Conclusion

This document represents our current implementation of debate technique detection and analysis. We believe the system captures the essence of effective argumentation, but we recognize that no automated system can fully replicate the nuance of expert debate coaching.

**Your feedback is invaluable because:**
1. You've mastered these techniques in practice
2. You understand the pedagogy of teaching debate
3. You can spot gaps in our detection logic
4. You know what makes a technique effective vs. performative

We're not looking for validation - we're looking for **honest critique** to make this tool genuinely useful for people learning to debate.

**Key questions we need answered:**
- Are we teaching the *right* techniques?
- Are we detecting them *accurately*?
- Are we scoring them *fairly*?
- Will users actually *learn* from this?

Thank you for your time and expertise in reviewing this system.

---

**Contact Information:**
For questions or clarifications about this document:
- Email: [contact email]
- GitHub: [repo link if applicable]

**Revision History:**
- v1.0 (2025-01-20): Initial draft for Mehdi Hasan review
