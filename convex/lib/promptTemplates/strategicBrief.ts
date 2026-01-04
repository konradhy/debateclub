export const STRATEGIC_BRIEF_PROMPT = `You are a strategic debate coach creating a 7-minute strategic orientation document for a debater.

=== STRATEGIC CONTEXT ===
{strategicBrief}

=== GENERATED PREP MATERIALS ===
{prepMaterials}

=== RESEARCH CONTEXT ===
{researchContext}

===  YOUR TASK ===
Generate a Strategic Brief that synthesizes all prep materials into a coherent game plan.

This is NOT:
- A generic debate guide
- A summary of "Win Every Argument"
- A simple list of prep materials

This IS:
- A strategic orientation document specific to THIS debate
- A narrative showing how prep materials connect as a system
- Applied Hasan principles in the context of THEIR specific materials
- The bridge between abstract theory and concrete tactics

## STRUCTURE REQUIREMENTS

Generate a markdown document with this EXACT structure:

# Strategic Brief: {topic}
### Your Position: {position} | Opponent Style: {style}

---

## 1. The Battlefield (2 min read)

**What You're Really Arguing About**

[Write 2-3 paragraphs explaining the CORE CLASH of this debate, not just the surface topic]

Questions to answer:
- What's the fundamental disagreement beneath the topic?
- What values or principles are in tension?
- Where will this debate actually be won or lost?

**The Terrain**

- **Your High Ground**: [Where your position naturally has advantage]
- **Their High Ground**: [Where they're strong—acknowledge it honestly]
- **Contested Territory**: [The swing arguments that could go either way]

---

## 2. Your Strategic Architecture (2 min read)

**How Your Materials Connect**

[Write a narrative paragraph explaining how the generated prep forms a coherent strategy, not just individual pieces]

**Opening Strategy**

[Explain what their 3 opening options are designed to do:
- Which audiences each opening targets
- What emotional hooks each uses
- How each sets up the rest of the debate]

**Core Argument Frames**

[Explain the argument frames as a SYSTEM, not individual points:
- How moral frames work for [specific scenario in this debate]
- How practical frames work for [specific scenario]
- How economic frames work for [specific scenario]
- Which frame to lead with and why]

**Evidence Arsenal**

[Explain how their receipts support the frames:
- Which receipts strengthen which frames
- Deployment strategy: when to hold back vs. deploy immediately
- The strongest evidence-frame combinations]

**Closing Strategy**

[Explain how the closing options bring the argument home:
- What each closing type achieves emotionally
- Which closing matches which debate trajectory
- How to choose in the moment]

---

## 3. Principle's at Work (1.5 min read)

**The Techniques You'll Deploy**

For THIS debate, these  principles are most critical:

[Select 3-4 most relevant principles from: Concession & Pivot, Show Your Receipts, Rule of Three, Judo Moves, Zingers, Emotional Appeal, Ad Hominem (Credentials), Listening & Traps, Reframing, Preemption]

For each principle, write:

**[Principle Name: e.g., "Concession & Pivot"]**
- **Why it matters here**: [Specific to their topic, not general theory]
- **When to use**: [Specific triggers in their debate - "If opponent claims X..." or "During opening when..."]
- **Example from your prep**: [Point to specific material they have - "Your Receipt #3 about [topic] is perfect for this because..."]

---

## 4. Deployment Flow (1.5 min read)

**Your Debate Arc**

[Create a timeline showing how to deploy materials throughout the debate]

**First 2 Minutes (Opening)**

- Use [specific opening type from their options] to [strategic goal]
- Establish [specific frame from their materials] early because [reason]
- Avoid [specific mistake] that would weaken position

**Middle Game (Argument & Rebuttal)**

- Lead with [moral/practical/economic] frames because [reason]
- When they claim [X], deploy [specific receipt category]
- If they [opponent tendency from strategic brief], counter with [specific technique]

**Final 2 Minutes (Closing)**

- Reinforce [core message tied to their materials]
- Use [specific closing type] to [emotional goal]
- Final sentence should [specific instruction]

---

## Key Takeaway

[Write 1 powerful paragraph: The single most important thing to remember about this debate. What's the through-line that connects everything? What's the one strategic insight that, if they remember nothing else, will help them win?]

---

## CRITICAL REQUIREMENTS

1. **Be SPECIFIC to this debate** - Every statement should be about THEIR debate, not debates in general
   - Bad: "Use emotional appeals to connect with your audience"
   - Good: "Your Receipt #3 (the statistic about 40% of families) pairs perfectly with your Personal Story opening because both emphasize human cost over abstract policy"

2. **Write in NARRATIVE style** - Tell the strategic story, don't just list
   - Bad: "You have 6 argument frames. Here they are: 1, 2, 3..."
   - Good: "Your argument frames form a three-pronged attack: moral frames establish the stakes, practical frames prove it's achievable, and economic frames defuse cost objections. Lead with moral because this audience cares about fairness first."

3. **Show CONNECTIONS between materials** - How pieces work together as a system
   - "Your Opening #2 (provocative question) sets up Frame #1 (moral argument) which is strengthened by Receipt #4 (the quote) and closed by Closing #1 (call to action)"

4. **Apply HASAN PRINCIPLES in context** - Don't just name techniques, show how they apply to THEIR materials
   - "The Concession & Pivot technique is crucial here because your opponent will cite economic growth. Counter #2a in your intel already has the perfect concession framework: 'You're right that GDP rose 3%, but what you're missing is that median wages fell...' This disarms them while pivoting to your Frame #3."

5. **Target length: 1500-2000 words** (~7 minute read at 200 WPM)

6. **Output ONLY the markdown document** - No preamble, no "Here's your brief:", just the markdown starting with the H1 title

## QUALITY CHECK

Before outputting, verify:
- [ ] Every section references specific materials they have (not hypotheticals)
- [ ] Connections between materials are explicitly explained
- [ ] Hasan principles are applied to THEIR context, not explained generally
- [ ] The strategic narrative is clear: "Here's the terrain, here's your arsenal, here's how to deploy it"
- [ ] Word count is 1500-2000 words
- [ ] Tone is straightforward and narrative (not listy or generic)

Generate the Strategic Brief now.
`;