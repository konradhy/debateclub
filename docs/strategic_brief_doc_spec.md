# Strategic Brief Document Specification

**Feature**: R-5.4 - Debate Summary Booklet
**Purpose**: 7-minute strategic orientation document generated after prep materials
**Location**: Tab beside "Deep Research" in prep interface
**Format**: Single markdown document (like Gemini Deep Research)
**Tone**: Straightforward, narrative

---

## Context

User has just generated all prep materials (openings, argument frames, receipts, zingers, closings, opponent intel). They need to understand how everything fits together for THIS specific debate before diving into tactical study.

---

## Document Structure

### Template

```markdown
# Strategic Brief: [Topic]
### Your Position: [Pro/Con] | Opponent Style: [Aggressive/Academic/etc.]

---

## 1. The Battlefield (2 min read)

**What You're Really Arguing About**
[2-3 paragraphs explaining the CORE CLASH of this debate, not just surface topic]
- What's the fundamental disagreement beneath the topic?
- What values/principles are in tension?
- Where will this debate actually be won or lost?

**The Terrain**
- **Your High Ground**: [Where your position naturally has advantage]
- **Their High Ground**: [Where they're strong, acknowledge it]
- **Contested Territory**: [The swing arguments that could go either way]

---

## 2. Your Strategic Architecture (2 min read)

**How Your Materials Connect**
[Narrative explaining how their generated prep forms a coherent strategy]

**Opening Strategy**
[Explain what their 3 openings are designed to do - which audiences, which hooks]

**Core Argument Frames**
[Explain the 6-10 frames as a SYSTEM not individual points]
- Moral frames for when [scenario]
- Practical frames for when [scenario]
- Economic frames for when [scenario]

**Evidence Arsenal**
[How their receipts support the frames - deployment strategy]

**Closing Strategy**
[How the closings bring it home]

---

## 3. Hasan Principles at Work (1.5 min read)

**The Techniques You'll Deploy**

For THIS debate, these Hasan principles are most critical:

**[Principle 1: e.g., "Concession & Pivot"]**
- Why it matters here: [specific to their topic]
- When to use: [specific triggers in their debate]
- Example from your prep: [point to specific material they have]

**[Principle 2: e.g., "Show Your Receipts"]**
- Why it matters here: [...]
- When to use: [...]
- Example from your prep: [...]

[2-3 more principles - select 3-4 most relevant to this specific debate]

---

## 4. Deployment Flow (1.5 min read)

**Your Debate Arc**

**First 2 Minutes (Opening)**
- Use [specific opening type] to [strategic goal]
- Establish [frame] early because [reason]

**Middle Game (Argument & Rebuttal)**
- Lead with [moral/practical/economic] frames
- When they claim [X], deploy [receipt category]
- If they [opponent tendency], counter with [technique]

**Final 2 Minutes (Closing)**
- Reinforce [core message]
- Use [closing type] to [emotional goal]

---

## Key Takeaway

[1 paragraph: The single most important thing to remember about this debate]
```

---

## What This Document IS

- **Strategic orientation** for this specific debate
- **Synthesis** of all generated prep materials into coherent narrative
- **Connection** between Hasan principles and their specific debate context
- **Mental model** before diving into tactical study
- **The bridge** between abstract principles and concrete prep materials

---

## What This Document IS NOT

- ❌ Generic debate advice
- ❌ Summary of "Win Every Argument" book
- ❌ Simple listing of prep materials
- ❌ Copy-paste of research findings

---

## Generation Inputs

To generate this document, we need:

1. **Opponent Profile Data**
   - Topic
   - Position (pro/con)
   - Opponent style (aggressive, academic, etc.)
   - Difficulty level
   - Strategic Brief fields (audience, opponent intel, user preferences)

2. **Generated Prep Materials**
   - All 3 opening options (with types, hooks, content)
   - All 6-10 argument frames (categorized by type)
   - All receipts (categorized by category)
   - All zingers
   - All 3 closing options
   - Opponent intel items

3. **Research Context**
   - Research synthesis or Gemini report (for grounding "the battlefield")

---

## Key Design Principles

1. **Specific > Generic**: Every statement should be about THEIR debate, not debates in general
2. **Narrative > List**: Tell the strategic story, don't just enumerate items
3. **Connected > Isolated**: Show how pieces work together as a system
4. **Applied > Theoretical**: Hasan principles explained in context of their specific materials
5. **Actionable > Informational**: User should finish with clear mental model of their strategy

---

## Example Quality Criteria

**Bad (Generic)**:
> "Your argument frames cover moral, practical, and economic angles. Use the Rule of Three when making arguments."

**Good (Specific & Connected)**:
> "Your moral frames attack the fairness of the current system—this resonates with swing voters who value justice. Lead with the 'Economic Mobility' frame early because it sets up your Receipt #3 (the wealth gap statistic), which you'll deploy when they inevitably claim the system works."

---

## UI Integration

- **Tab Name**: "Strategic Brief" or "Game Plan"
- **Location**: Tabs alongside "Deep Research", "Chat", "Study Mode"
- **When Generated**: After all prep materials are generated
- **Icon**: 🎯 or 🗺️ or 📋
- **Reading Time**: Display "~7 min read" at top

---

## Implementation Questions (To Discuss)

1. **Generation Timing**:
   - Second LLM call after prep materials are done?
   - Part of the existing prep generation agent?
   - Separate action?

2. **Storage**:
   - New field in opponents table? (e.g., `strategicBriefMarkdown`)
   - Separate table?
   - Generated on-demand?

3. **Regeneration**:
   - Can user regenerate if they edit prep materials?
   - Auto-regenerate when materials change?
   - One-time generation?

4. **Model Selection**:
   - GPT-4o (like other prep generation)?
   - Claude Sonnet (like analysis)?
   - Cost considerations for this synthesis task?

---

## Notes

- This is NOT the "Debate Summary Booklet" for firecrawl mentioned in original R-5.4
- User clarified: this is a strategic primer generated FOR EACH opponent/debate setup
- Should feel like a strategic coach laying out the game plan
- The magic is in SYNTHESIS and CONNECTION, not just summarization
