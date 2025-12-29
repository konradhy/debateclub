# Scenario Content Rubric

**Research → Blog Post → Implementation**

---

## The Config-First Mindset

Research and blog content exist to populate and explain the scenario config. Before gathering information, understand what fields you're filling:

| Config Element | What Research Must Provide | What Blog Must Explain |
|----------------|---------------------------|------------------------|
| `firstMessage[]` | 3-5 realistic opening lines | Why the practice opens this way |
| `systemPrompt` behavioral rules | Reward/punish dynamics based on techniques | What triggers punishment, what earns respect |
| `responseMap[]` | 4-6 trigger/response pairs for objections | Common pushback and how to handle it |
| `keyPhrases[]` | Power phrases that work | Language that builds credibility |
| `scoreCategories` | 4 measurable skills from research | What skills get evaluated and why |
| `talkingPoints[]` | 5 key points to communicate | Core messages for this conversation |

**Every research deliverable should map to a config field. Every blog section should explain design intent.**

---

## Step 0: Research with Config Mapping (2-3 hours)

### Goal
Gather everything needed to populate config fields, with proper citations.

### Constraints
- **NO EM DASHES (—)**: Use en dash (–) or restructure sentences.
- **Strict Citation**: Never say "research shows" without a source. If unsure, mark as `TODO: Verify source`.
- **Balance Sources**: Cite 3-5 different authors/frameworks. Do not over-rely on one source.

### Research Document Template

Create: `research/scenario-[name]-research.md`

```markdown
# [Scenario Name] - Research & Sources

**Last Updated:** [Date]

---

## Primary Framework

**[Framework/Book Name]**
- **Author:** [Name]
- **Year:** [Publication year]
- **Source:** [Book title] OR [Article URL]
- **Key Concept:** [1-2 sentence summary]

---

## Core Techniques → `scoreCategories`

These become the 4 dimensions measured in analysis.

### 1. [Technique Name]
**Source:** [Author], [Book/Article], [Year], pg. [X] OR [URL]
**What it is:** [Clear explanation]
**Why it works:** [Psychology/principle behind it]
**Measurable signals:** [What to look for in transcript]
**Quote:** "[Direct quote from source if powerful]"

→ **Score Category:** "[Name]" - "[Description of what we measure]"

### 2. [Technique Name]
[Same structure]

[Repeat for 4-6 techniques - pick the 4 strongest for scoreCategories]

---

## Common Mistakes → `systemPrompt` punish rules

These become behavioral rules that punish bad technique.

### 1. [Mistake Name]
**Source:** [Citation]
**What people do:** [Description]
**Why it fails:** [Explanation]
**AI Response:** When user does this, AI should [punish behavior]

→ **systemPrompt rule:** "IF user [does X], THEN [escalate/push back/etc.]"

### 2. [Mistake Name]
[Same structure]

[Repeat for 3-5 mistakes]

---

## Realistic Openings → `firstMessage[]`

How do these conversations actually start? Find 3-5 variations.

1. "[Exact opening line]" - [Context: when this happens]
2. "[Variation]" - [Context]
3. "[Variation]" - [Context]
4. "[Variation]" - [Context]
5. "[Variation]" - [Context]

---

## Objection Patterns → `responseMap[]`

What pushback is common? How should the user respond?

### 1. Trigger: "[Common objection]"
**Source:** [Where you found this is common]
**Why they say this:** [Psychology]
**How to respond:** [Technique to use]

→ **responseMap entry:** { trigger: "[X]", response: "[Y]" }

### 2. Trigger: "[Objection]"
[Same structure]

[Repeat for 4-6 objections]

---

## Power Phrases → `keyPhrases[]`

Language that works in this scenario.

1. "[Phrase]" - [When to use it, why it works]
2. "[Phrase]" - [When to use it]
3. "[Phrase]" - [When to use it]
4. "[Phrase]" - [When to use it]
5. "[Phrase]" - [When to use it]

---

## Behavioral Dynamics → `systemPrompt` rules

How should the AI respond to different user behaviors?

**Reward behaviors (user does well):**
- IF user [good technique] → AI should [de-escalate/respect/open up]
- IF user [good technique] → AI should [shift concern/engage]

**Punish behaviors (user does poorly):**
- IF user [bad technique] → AI should [escalate/push harder]
- IF user [bad technique] → AI should [dig in/dismiss]

**Goal tension:**
- AI's goal: [What they're trying to achieve]
- User's goal: [What they're trying to achieve]
- Natural tension: [Why these create realistic friction]

---

## Key Data/Stats

- [Stat]: [Source], [Year]

---

## References

### Books
1. [Author Last, First]. ([Year]). *[Title]*. [Publisher].

### Articles/Papers
1. [Author]. ([Year]). [Title]. *[Publication]*. [URL]
```

### Research Checklist
- [ ] 4-6 core techniques documented → mapped to `scoreCategories`
- [ ] 3-5 common mistakes documented → mapped to `systemPrompt` punish rules
- [ ] 3-5 realistic opening lines collected → mapped to `firstMessage[]`
- [ ] 4-6 objection/response pairs → mapped to `responseMap[]`
- [ ] 5 power phrases collected → mapped to `keyPhrases[]`
- [ ] Reward/punish dynamics documented → mapped to `systemPrompt` rules
- [ ] Every deliverable has a source citation
- [ ] **All research explicitly maps to config fields**
- [ ] **Sources are balanced** - 3-5 different authors, not dominated by one

---

## Step 1A: Marketing Plan (30-45 minutes)

### Goal
Create an internal planning document that maps research to implementation.

### File Location
`marketing-plans/scenario-[name].md` (markdown file)

### Purpose
This is your bridge document between research and the blog post. It's where you:
- Organize the narrative flow
- Map techniques to config elements
- Plan the emotional hooks
- Structure the argument

### Template

```markdown
# [Scenario Name]: How to [Achieve Goal]

**Last Updated:** [Date]

---

## The Problem

[What pain point does this scenario address? Be specific and emotional.]

---

## Why This Matters

[Business impact, frequency, emotional stakes]

---

## What You'll Practice

[Specific skills this scenario teaches - these map to scoreCategories]

1. **[Skill 1]** - [Description]
2. **[Skill 2]** - [Description]
...

---

## The Techniques (Research-Based)

[List the 5-8 core techniques from research]

### 1. [Technique Name]
**What it is:** [Brief explanation]
**Why it works:** [Psychology/principle]
**Example:** [Specific phrase or tactic]

---

## How the Practice Engine Works

[Explain the design intent behind the config elements]

**Opening Dynamics:**
The practice opens with one of several realistic scenarios:
- "[firstMessage variation 1]" - Tests [skill]
- "[firstMessage variation 2]" - Tests [skill]

**Behavioral Rules:**
- If you [bad technique], the buyer will [punishment] (because in real life...)
- If you [good technique], the buyer will [reward] (because in real life...)

**What Gets Measured:**
- [scoreCategory 1]: [What it measures, why it matters]
- [scoreCategory 2]: [What it measures, why it matters]
...

---

## Success Looks Like

[What good performance feels like - maps to analysis criteria]

---

## Common Mistakes

[What people typically do wrong - these are encoded as punish rules]

---

## Real-World Applications

[When you'd use this in actual work]

---

## Related Reading

[Sources from research]
```

---

## Step 1B: Blog Post - React Component (2-3 hours)

### Goal
Create a PUBLISHED REACT COMPONENT blog post that teaches the techniques AND explains the practice design intent.

### CRITICAL: File Location & Format
**You MUST create:** `src/routes/blog/scenario-[name].tsx` (a React/TypeScript component)

**The blog post is a `.tsx` file with:**
- TanStack Router route definition
- Full React component with styling
- Meta tags for SEO
- Proper imports and structure

---

## THE BLOG FORMULA

All scenario blog posts MUST follow this exact structure. This formula has been proven to work and creates the "premium" look we want.

### Title Formula

**Format:** `How to [Specific Action/Outcome] [Without/When/Before] [Obstacle/Constraint]`

**Good titles:**
- "How to Land Your First 10 Customers Without Case Studies"
- "How to Negotiate Contracts Without Leaving Money on the Table"
- "How to Defend Decisions When the Board Is Skeptical"

**Bad titles (avoid these patterns):**
- ❌ "Early Customer Sales: How to Sell When You Have Nothing But Conviction" - Too wordy, two disconnected thoughts
- ❌ "Contract Negotiation Techniques" - Generic, no hook
- ❌ "The Complete Guide to Selling" - Boring, no specific outcome

**Rules:**
1. Lead with "How to" for action orientation
2. Include a SPECIFIC outcome (not vague like "succeed" or "win")
3. Include a constraint or obstacle that creates tension
4. Keep under 65 characters if possible (for SEO truncation)
5. Avoid colons unless absolutely necessary - they split attention

---

### Required Sections (In Order)

1. **Opening Story** (150-200 words) - Specific, emotional, ends with failure
2. **Connection to Research** (100 words) - Link to primary framework
3. **Why This Is Hard** (200 words) - Include 2 stat cards
4. **The Framework** (150 words) - Include a blockquote
5. **Techniques That Work** (800-1000 words) - 5-8 technique cards
6. **Common Mistakes** (300 words) - 3-5 numbered mistakes
7. **How DebateClub Works** (500 words) - THE PRACTICE ENGINE DEMO (critical!)
8. **Opening Scenarios** - Show 2-3 firstMessage examples
9. **Behavioral Rules** - List reward/punish dynamics
10. **What Gets Measured** - 2x2 grid of scoreCategories
11. **What Changes After Practice** (150 words) - Transformation bullets
12. **The Bottom Line** (100 words) - Closing summary
13. **CTA** - Practice call to action
14. **Sources** - 3-5 citations

---

## REUSABLE COMPONENTS

Import from `@/components/blog`:

```tsx
import {
  BlogLayout,
  StatCard,
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

### BlogLayout
Wraps the entire post with header, footer, and article structure.

```tsx
<BlogLayout
  badge="Sales Practice"
  title="Contract Negotiation: Hold Your Ground"
  meta="10 min read · Sales Scenarios"
>
  {/* Article content */}
</BlogLayout>
```

### StatsGrid
Two-column grid of high-contrast stat cards. REQUIRED for "Why This Is Hard" section.

```tsx
<StatsGrid
  stats={[
    {
      stat: "80%",
      description: "of deals are won or lost in negotiation",
      source: "Sales Benchmark Index, 2019",
    },
    {
      stat: "35%",
      description: "fewer closes when sellers discount on first ask",
      source: "Gong.io, 2020",
    },
  ]}
/>
```

### TechniqueCard
Technique explanation with icon, what/why/example. Use for each technique.

```tsx
<TechniqueCard
  number={1}
  title="The Calibrated Question"
  icon={MessageCircle}
  whatItIs="Open-ended questions starting with 'How' or 'What'..."
  whyItWorks="Forces the buyer to consider your constraints..."
  example='Buyer says "Your price is too high." You respond: "How am I supposed to make this work?"'
  source="Voss, Never Split the Difference"
/>
```

### MistakesList
Numbered list of common mistakes. REQUIRED for "Common Mistakes" section.

```tsx
<MistakesList
  intro="These are the behaviors that experienced buyers exploit:"
  mistakes={[
    {
      title: "Caving on the First Ask",
      description: "Offering a discount before exploring the objection...",
    },
    // ... more mistakes
  ]}
/>
```

### PracticeEngineDemo (CRITICAL)
Rich visual demo of how the practice engine works. REQUIRED for "How DebateClub Works" section.

```tsx
<PracticeEngineDemo
  openingLine="We're ready to move forward, but we need to talk about that price..."
  openingContext="This is the moment of truth. Your nervous system activates."
  badResponse="Okay, let me see what I can do. How about 15% off?"
  badDetections={[
    "<strong>Immediate concession</strong> — You offered a discount before exploring",
    "<strong>No value defense</strong> — You didn't anchor to outcomes",
  ]}
  badOutcome="That's a start. But we also need to talk about payment terms..."
  badExplanation="The buyer smelled blood. Your immediate discount signaled weakness."
  goodResponse="I understand price is a concern. Help me understand – compared to what?"
  goodDetections={[
    "<strong>Calibrated question</strong> — Shifts burden back to buyer",
    "<strong>Tactical empathy</strong> — Acknowledged without agreeing",
  ]}
  goodOutcome="Well, we had budgeted based on what we're currently spending..."
  goodExplanation="The buyer respected your confidence and revealed the real concern."
  analysisScores={[
    { icon: Shield, name: "Value Defense", score: "8/10", isGood: true, feedback: "..." },
    { icon: MessageCircle, name: "Calibrated Questions", score: "9/10", isGood: true, feedback: "..." },
  ]}
  analysisExplanation="The analysis shows exactly where you succeeded and where you left money on the table."
/>
```

### ScoreCategoriesGrid
2x2 grid showing what gets measured. REQUIRED for "What Gets Measured" section.

```tsx
<ScoreCategoriesGrid
  intro="After each practice session, you receive detailed analysis across four dimensions:"
  categories={[
    { name: "Value Defense", description: "Did you hold price? Did you require trade-offs?" },
    { name: "Calibrated Questions", description: "Did you ask 'How' and 'What' questions?" },
    { name: "Strategic Trading", description: "Did you trade concessions or give them away?" },
    { name: "Composure", description: "Did you stay calm under pressure?" },
  ]}
/>
```

### BehavioralRulesList
Bullet list showing if/then rules. REQUIRED for "Behavioral Rules" section.

```tsx
<BehavioralRulesList
  intro="The buyer responds to your technique, not just your words:"
  rules={[
    { condition: "If you cave immediately", outcome: "The buyer smells blood and pushes for more" },
    { condition: "If you defend value and ask questions", outcome: "The buyer respects your confidence" },
  ]}
/>
```

### CTASection
Call-to-action with dark background. REQUIRED at end of article.

```tsx
<CTASection
  title="Practice Contract Negotiation"
  description="Face realistic buyer pressure. Learn to hold value. Build the muscle memory."
/>
```

### SourcesList
Numbered citations. REQUIRED at end of article.

```tsx
<SourcesList
  sources={[
    { citation: 'Voss, Chris with Raz, Tahl. (2016). <em>Never Split the Difference</em>. Crown Business.' },
    { citation: 'Fisher, Roger, et al. (2011). <em>Getting to Yes</em>. Penguin Books.' },
  ]}
/>
```

### Blockquote
Styled quote with attribution. Use for impactful quotes from sources.

```tsx
<Blockquote
  quote="Never be so sure of what you want that you wouldn't take something better."
  attribution="Chris Voss, Never Split the Difference"
/>
```

---

## LANGUAGE RULES (CRITICAL)

### Never Use
- ❌ "simulation" → Use "practice," "practice engine," "DebateClub"
- ❌ "AI" or "AI opponent" → Use "buyer," "investor," "patient" (the actual role)
- ❌ "the AI responds" → Use "the system responds," "the buyer responds"

### Always Use
- ✅ "practice engine" for the system
- ✅ Role names for the opponent (buyer, investor, patient, etc.)
- ✅ "system detects," "system measures," "the practice"

### Source Balance
- ✅ Cite 3-5 different authors/frameworks throughout the article
- ❌ Do not over-focus on one author (e.g., citing Voss 10 times and no one else)
- ✅ Name different experts in different sections

---

## Blog Post Template

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  MessageCircle,
  Scale,
  Brain,
  // ... other icons
} from "lucide-react";
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

export const Route = createFileRoute("/blog/scenario-[name]")({
  head: () => ({
    meta: [
      { title: "[Title] | DebateClub" },
      { name: "description", content: "[Description]" },
      { property: "og:title", content: "[Title] | DebateClub" },
      { property: "og:description", content: "[Description]" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: ScenarioArticle,
});

function ScenarioArticle() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F3EF" }}>
      {/* Header */}
      <header className="border-b py-6" style={{ backgroundColor: "#FAFAF8", borderColor: "#E8E4DA" }}>
        <div className="mx-auto flex max-w-3xl items-center justify-between px-8">
          <Link to="/blog" className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70" style={{ color: "#5C5C54" }}>
            <ArrowLeft className="h-4 w-4" />
            All Articles
          </Link>
          <Link to="/">
            <span className="text-xl font-bold" style={{ color: "#2A2A20" }}>DebateClub</span>
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Badge */}
          <span className="mb-4 inline-block rounded-md px-3 py-1 text-xs font-medium" style={{ backgroundColor: "#A8B08C", color: "#3A4030" }}>
            [Category Badge]
          </span>

          {/* Title */}
          <h1 className="mb-6 text-4xl font-bold leading-tight lg:text-5xl" style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}>
            [Title]
          </h1>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            [X] min read · [Category]
          </p>
        </motion.div>

        <motion.div className="prose-custom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>

          {/* 1. OPENING STORY (150-200 words) */}
          <p className="text-lg leading-relaxed" style={{ color: "#3A3A35" }}>
            [Specific story that illustrates the problem. Real or composite example. Emotional. Ends with failure.]
          </p>
          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            [Continue the story, lead into the data/research.]
          </p>

          {/* 2. CONNECTION TO RESEARCH (100 words) */}
          <Blockquote
            quote="[Powerful quote from primary source]"
            attribution="[Author], [Book Title]"
          />
          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            [Connect story to broader principle. Cite primary source early.]
          </p>

          {/* 3. WHY THIS IS HARD (200 words) - REQUIRED: StatsGrid */}
          <h2 className="mb-4 mt-12 text-2xl font-bold" style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}>
            Why [Scenario] Is So Hard
          </h2>
          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            [Explain the core difficulty. Knowledge vs execution gap.]
          </p>
          <StatsGrid
            stats={[
              { stat: "[X%]", description: "[Impact statement]", source: "[Source, Year]" },
              { stat: "[Y%]", description: "[Impact statement]", source: "[Source, Year]" },
            ]}
          />
          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            [Explain why these stats matter. Nervous system / pressure response.]
          </p>

          {/* 4. THE FRAMEWORK (150 words) */}
          <h2 className="mb-4 mt-12 text-2xl font-bold" style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}>
            The Framework: [Name]
          </h2>
          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            [Introduce the primary framework. Combine insights from multiple sources.]
          </p>

          {/* 5. TECHNIQUES THAT WORK (800-1000 words) - REQUIRED: TechniqueCards */}
          <h2 className="mb-4 mt-12 text-2xl font-bold" style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}>
            [X] Techniques That Work
          </h2>
          <TechniqueCard number={1} title="..." icon={...} whatItIs="..." whyItWorks="..." example="..." />
          <TechniqueCard number={2} title="..." icon={...} whatItIs="..." whyItWorks="..." example="..." />
          {/* Repeat for 5-8 techniques */}

          {/* 6. COMMON MISTAKES (300 words) - REQUIRED: MistakesList */}
          <h2 className="mb-4 mt-12 text-2xl font-bold" style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}>
            [X] Mistakes That [Fail]
          </h2>
          <MistakesList
            intro="[Context about why these mistakes happen]"
            mistakes={[
              { title: "...", description: "..." },
              // 3-5 mistakes
            ]}
          />

          {/* 7. HOW DEBATECLUB WORKS (500 words) - REQUIRED: PracticeEngineDemo */}
          <h2 className="mb-4 mt-12 text-2xl font-bold" style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}>
            How DebateClub Trains This Skill
          </h2>
          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Reading about [skill] is easy. Executing under pressure is hard. That is the gap DebateClub fills.
          </p>

          {/* The Setup */}
          <h3 className="mb-3 mt-8 text-xl font-bold" style={{ color: "#2A2A20" }}>
            The Setup
          </h3>
          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            [Explain how user sets up the practice session]
          </p>

          {/* REQUIRED: PracticeEngineDemo */}
          <PracticeEngineDemo
            openingLine="..."
            openingContext="..."
            badResponse="..."
            badDetections={["...", "..."]}
            badOutcome="..."
            badExplanation="..."
            goodResponse="..."
            goodDetections={["...", "..."]}
            goodOutcome="..."
            goodExplanation="..."
            analysisScores={[...]}
            analysisExplanation="..."
          />

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            [Explain that this is not a generic chatbot. The system knows the specific dynamics.]
          </p>

          {/* 8. OPENING SCENARIOS */}
          <h3 className="mb-3 mt-8 text-xl font-bold" style={{ color: "#2A2A20" }}>
            Opening Scenarios
          </h3>
          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Each practice session opens with a realistic [context]:
          </p>
          <div className="my-4 space-y-3 rounded-lg p-4" style={{ backgroundColor: "#FAFAF8" }}>
            <p className="text-sm italic" style={{ color: "#5C5C54" }}>"[firstMessage 1]"</p>
            <p className="text-sm italic" style={{ color: "#5C5C54" }}>"[firstMessage 2]"</p>
            <p className="text-sm italic" style={{ color: "#5C5C54" }}>"[firstMessage 3]"</p>
          </div>

          {/* 9. BEHAVIORAL RULES - REQUIRED: BehavioralRulesList */}
          <h3 className="mb-3 mt-8 text-xl font-bold" style={{ color: "#2A2A20" }}>
            Behavioral Rules
          </h3>
          <BehavioralRulesList
            intro="The [role] responds to your technique, not just your words:"
            rules={[
              { condition: "If you [bad technique]", outcome: "[punishment]" },
              { condition: "If you [good technique]", outcome: "[reward]" },
            ]}
          />

          {/* 10. WHAT GETS MEASURED - REQUIRED: ScoreCategoriesGrid */}
          <h3 className="mb-3 mt-8 text-xl font-bold" style={{ color: "#2A2A20" }}>
            What Gets Measured
          </h3>
          <ScoreCategoriesGrid
            intro="After each practice session, you receive detailed analysis across four dimensions:"
            categories={[...]}
          />

          {/* 11. WHAT CHANGES AFTER PRACTICE (150 words) */}
          <h2 className="mb-4 mt-12 text-2xl font-bold" style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}>
            What Changes After Practice
          </h2>
          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            After practicing [scenario] across multiple sessions, you will notice:
          </p>
          <ul className="my-6 space-y-3">
            {/* 4 bullet points about transformation */}
          </ul>

          {/* 12. THE BOTTOM LINE (100 words) */}
          <h2 className="mb-4 mt-12 text-2xl font-bold" style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}>
            The Bottom Line
          </h2>
          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            [Closing summary. Tie back to opening story.]
          </p>
          <p className="mt-4 text-lg font-medium leading-relaxed" style={{ color: "#3A3A35" }}>
            [One-sentence takeaway. Strong close.]
          </p>

          {/* 13. CTA - REQUIRED: CTASection */}
          <CTASection
            title="Practice [Scenario]"
            description="[Value prop. What they'll learn. Why now.]"
          />

          {/* 14. SOURCES - REQUIRED: SourcesList */}
          <SourcesList
            sources={[
              { citation: "[Full citation 1]" },
              { citation: "[Full citation 2]" },
              // 3-5 sources
            ]}
          />

          {/* Article Navigation */}
          <div className="mt-12 flex justify-between border-t pt-8" style={{ borderColor: "#E8E4DA" }}>
            <Link to="/blog" className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70" style={{ color: "#3C4A32" }}>
              <ArrowLeft className="h-4 w-4" />
              All Articles
            </Link>
            <Link to="/login" className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70" style={{ color: "#3C4A32" }}>
              Try It Yourself
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </article>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: "#E8E4DA" }}>
        <div className="mx-auto max-w-3xl px-8 text-center">
          <p className="text-sm" style={{ color: "#5C5C54" }}>
            © {new Date().getFullYear()} DebateClub. Techniques based on research from multiple frameworks.
          </p>
        </div>
      </footer>
    </div>
  );
}
```

---

## Blog Post Checklist

### File Structure
- [ ] **Created `.tsx` file at `src/routes/blog/scenario-[name].tsx`**
- [ ] File includes proper imports (TanStack Router, motion, icons, blog components)
- [ ] Route definition with `createFileRoute` is present
- [ ] Component function is exported and referenced in route

### Required Components Used
- [ ] **StatsGrid** in "Why This Is Hard" section
- [ ] **TechniqueCard** for each technique (5-8)
- [ ] **MistakesList** in "Common Mistakes" section
- [ ] **PracticeEngineDemo** in "How DebateClub Works" section (CRITICAL!)
- [ ] **BehavioralRulesList** for reward/punish rules
- [ ] **ScoreCategoriesGrid** in "What Gets Measured" section
- [ ] **CTASection** at end
- [ ] **SourcesList** at end
- [ ] **Blockquote** for at least one impactful quote

### Content
- [ ] Opening story is specific and compelling (150-200 words)
- [ ] Primary source cited in first 300 words
- [ ] All major claims have sources
- [ ] 5-8 techniques explained with TechniqueCard
- [ ] 3-5 common mistakes with MistakesList
- [ ] PracticeEngineDemo shows both bad and good paths
- [ ] At least 3-5 authoritative citations in SourcesList

### Language (CRITICAL)
- [ ] **NEVER uses "simulation" or "AI"** - uses "system," "practice engine," "DebateClub"
- [ ] **Uses role names** - "buyer," "investor," "patient" instead of "AI opponent"
- [ ] **NO em dashes (—) or double hyphens (--)** - uses en dash (–) or restructures
- [ ] **Balances sources** - cites 3-5 different authors, not dominated by one

### Config Design Intent
- [ ] Explains why practice opens the way it does (`firstMessage` design)
- [ ] Explains what triggers punishment/reward (`systemPrompt` design)
- [ ] Explains what skills get measured (`scoreCategories` design)
- [ ] Common mistakes in blog = punish rules in config
- [ ] Techniques in blog = score categories in config

### React Component Structure
- [ ] Proper route definition with meta tags
- [ ] Header with back button to /blog
- [ ] Motion animations on title/content
- [ ] All required sections present in order
- [ ] Footer with copyright

### Blog Index Registration (CRITICAL - Don't Skip!)
- [ ] **Added to blog index:** `src/routes/blog/index.tsx` in "Practice Guides" section
- [ ] Card includes: badge, title, description, 2-3 keyword tags, read time

---

## Step 1C: Update Blog Index

**You MUST add** the new scenario to `src/routes/blog/index.tsx`.

**Location:** Find the "Practice Guides" section (around line 316). Add a new `<Link>` card.

**Template:**

```tsx
<Link
  to="/blog/scenario-[name]"
  className="group block overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl"
  style={{
    backgroundColor: "#FAFAF8",
    border: "1px solid #E8E4DA",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
  }}
>
  <div className="p-6">
    <div
      className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
      style={{ backgroundColor: "#3C4A32" }}
    >
      <span className="text-2xl font-bold" style={{ color: "#C8D4B8" }}>
        [EMOJI]
      </span>
    </div>
    <span
      className="mb-2 inline-block rounded-md px-3 py-1 text-xs font-medium"
      style={{ backgroundColor: "#A8B08C", color: "#3A4030" }}
    >
      [Category] Practice
    </span>
    <h3
      className="mb-2 text-xl font-bold transition-colors group-hover:opacity-70"
      style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
    >
      [Short Title - Use Title Formula]
    </h3>
    <p
      className="mb-3 text-sm leading-relaxed"
      style={{ color: "#5C5C54" }}
    >
      [2-sentence hook from blog opening]
    </p>
    <div className="flex flex-wrap gap-2 text-xs" style={{ color: "#888880" }}>
      <span>• [Technique 1]</span>
      <span>• [Technique 2]</span>
      <span>• [X] min</span>
    </div>
  </div>
</Link>
```

**If there are multiple scenario cards, wrap them in a 2-column grid:**

```tsx
<div className="grid gap-6 md:grid-cols-2">
  <Link to="/blog/scenario-a">...</Link>
  <Link to="/blog/scenario-b">...</Link>
</div>
```

---

## Complete Deliverables Per Scenario

**ALL REQUIRED - DO NOT SKIP ANY:**

1. [ ] **Research doc:** `research/scenario-[name]-research.md` with explicit config field mappings
2. [ ] **Marketing plan:** `marketing-plans/scenario-[name].md` (internal planning doc)
3. [ ] **Blog post (React component):** `src/routes/blog/scenario-[name].tsx` (published article)
4. [ ] **Scenario config:** Add to `convex/scenarios/[category].ts` populated from research
5. [ ] **Tested:** 3+ times by humans

**Time: 6-9 hours total** (2-3 research, 0.5 marketing plan, 2-3 blog, 2-3 implementation)

---

## Research → Config → Blog Alignment Check

Before shipping, verify alignment:

| Check | Research | Config | Blog |
|-------|----------|--------|------|
| Techniques match score categories? | ✓ | ✓ | ✓ |
| Mistakes match punish rules? | ✓ | ✓ | ✓ |
| Opening lines match firstMessage? | ✓ | ✓ | ✓ |
| Objections match responseMap? | ✓ | ✓ | ✓ |
| Power phrases match keyPhrases? | ✓ | ✓ | ✓ |

If any column doesn't match, something is disconnected.
