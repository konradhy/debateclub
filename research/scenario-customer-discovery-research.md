# Customer Discovery Interview - Research Document

**Created:** December 29, 2025
**Scenario:** Customer Discovery (Entrepreneur category)
**Status:** Step 0 - Research Complete

---

## Research Overview

Customer discovery interviews are foundational to building products people actually want. The challenge: founders naturally want to pitch their solution, but effective discovery requires focusing entirely on understanding the customer's problem through their past behaviors, not hypothetical futures.

### Core Insight
**"You can't trust what customers say they'll do in the future. You can only trust how they currently do things."** - Rob Fitzpatrick, The Mom Test

---

## Key Sources (Balanced Coverage)

1. **Rob Fitzpatrick - The Mom Test** (Looppanel, Mom Test Book)
   - Focus: Avoiding bias, asking about specifics, detecting lies

2. **Steve Blank - Customer Development** (Steve Blank blog, Wikipedia)
   - Focus: Get out of the building, hypothesis testing, founder involvement

3. **Cindy Alvarez - Lean Customer Development** (O'Reilly)
   - Focus: Detecting behaviors/constraints, avoiding wish lists, problem focus

4. **LEANFoundry - Common Mistakes** (LEANFoundry article)
   - Focus: Targeting wrong segments, measuring actions not words

5. **Practical Guides** (AllFactors, GrowthRamp, I-Corps Hub)
   - Focus: Question frameworks, interview volume, opening strategies

---

## CRITICAL MISTAKES (What Makes Interviews Fail)

### Mistake #1: Pitching Instead of Listening
**Evidence:** "The #1 key to learning from customer interviews is: Don't pitch or talk about your idea or solution" (LinkedIn Advice). Founders from "EasyMeal" spent interviews explaining their service instead of uncovering that customers were concerned about dietary restrictions (EWOR).

**Config Mapping:**
- **systemPrompt (Prospect behavior):** Prospect should REWARD when founder asks about their current process and PUNISH when founder starts pitching or explaining their solution
- **scoreCategories:** "Problem Focus" - measures if founder stayed on customer's problems vs pitching

### Mistake #2: Asking About Hypotheticals
**Evidence:** "Future predictions are over-optimistic lies from people eager to please" (Looppanel). Questions like "Would you buy this?" or "Do you think it's a good idea?" invite dishonest compliments (Mom Test).

**Config Mapping:**
- **systemPrompt (Prospect behavior):** Prospect gives vague enthusiasm ("That sounds cool!") when asked hypothetical questions, becomes specific and detailed when asked about past experiences
- **scoreCategories:** "Specificity" - measures if founder asked about past events vs future opinions
- **firstMessage[]:** Should include vague, non-specific responses that require digging

### Mistake #3: Targeting Active Buyers (Wrong Segment)
**Evidence:** "Prospects still searching haven't committed to solutions, making them poor interview subjects since they haven't bought yet and maybe never will" (LEANFoundry). Interview recent buyers of existing alternatives, not shoppers.

**Config Mapping:**
- **inputs:** Should specify that user is interviewing someone who RECENTLY dealt with the problem
- **systemPrompt:** Prospect should be someone who has tried existing solutions, has paid for workarounds

### Mistake #4: Accepting Surface-Level Answers
**Evidence:** "It's important to uncover the foundational cause of an issue - if they have a problem, ask them why" (I-Corps Hub). "Listen for unstated core problems beneath surface complaints" (GrowthRamp).

**Config Mapping:**
- **systemPrompt (Prospect behavior):** Prospect starts with surface-level complaint, only reveals deeper motivation when founder asks follow-up "why" questions
- **scoreCategories:** "Discovery Depth" - measures if founder dug beneath initial answers

### Mistake #5: Talking Too Much
**Evidence:** "Talk less and listen more" (TLV). "Restrain yourself from talking a lot, focus on listening" (AllFactors).

**Config Mapping:**
- **scoreCategories:** "Listening Ratio" - measures how much founder listened vs talked
- **analysis.systemPrompt:** Should penalize long founder monologues, reward strategic silences

---

## EFFECTIVE TECHNIQUES (What Makes Interviews Succeed)

### Technique #1: "Tell me about the last time that happened"
**Evidence:** "This single prompt reveals workflows, tools used, constraints, and real friction points rather than perceived problems" (Looppanel). "Ask about situations that have already occurred rather than asking 'would you pay for this feature?'" (AllFactors).

**Example Questions:**
- "Tell me about the last time you encountered this problem"
- "Walk me through what happened"
- "What did you do next?"

**Config Mapping:**
- **systemPrompt (Prospect behavior):** When founder asks about specific past events, prospect becomes detailed and shares concrete workflow steps, tool names, time spent
- **scoreCategories:** "Past-Focus" - Did founder ground conversation in actual events?

### Technique #2: "How are you dealing with it now?"
**Evidence:** "Provides pricing anchors and shows actual commitment levels. If someone pays £100/month for a workaround, you know your market positioning" (Looppanel).

**Related Questions:**
- "What solutions have you tried?"
- "What else have you tried?"
- "What don't you love about the solutions you've already tried?"

**Config Mapping:**
- **systemPrompt (Prospect behavior):** Prospect reveals budget/spend when asked about current solutions, stays vague if not prompted
- **firstMessage[]:** Should NOT include information about current solutions - founder must ask

### Technique #3: "Why was this hard?" (Digging Deeper)
**Evidence:** Cindy Alvarez emphasizes "Digging a Little Deeper" and "Away from Features—Back to the Problem" (O'Reilly). "What is the hardest part about doing the thing that you're trying to do?" (AllFactors).

**Config Mapping:**
- **systemPrompt (Prospect behavior):** Prospect gives surface answer first ("It's just annoying"), reveals real motivation only after 2-3 "why" follow-ups (budget impact, competitive pressure, personal pain)
- **scoreCategories:** "Root Cause Discovery" - Did founder uncover the WHY behind the problem?

### Technique #4: Seeking Commitment, Not Compliments
**Evidence:** "Move beyond words by requesting: Time commitments (scheduled follow-ups), Reputation risk (introductions to peers), Financial signals (letters of intent, pre-orders)" (Looppanel).

**Warning Signs:**
- "Lukewarm responses are more reliable than enthusiasm - 'Meh' reveals genuine indifference" (Looppanel)
- "Absence of prior problem-solving efforts - if they haven't Googled solutions, they won't buy yours" (Looppanel)

**Config Mapping:**
- **systemPrompt (Prospect behavior):** Prospect gives enthusiastic praise if asked for opinions ("This is amazing!"), becomes hesitant when asked for introductions/time commitments if problem isn't real
- **scoreCategories:** "Validation Quality" - Did founder seek concrete commitment or accept compliments?

### Technique #5: Creating Comfort Before Probing
**Evidence:** "Spend the first minutes creating a connection on an emotional level - the more comfortable they feel, the more they will open up" (Studio Zao). "The entire session shouldn't feel like an interview; it has to be more like having a conversation with a friend" (HEY World).

**Config Mapping:**
- **firstMessage[]:** Should be slightly guarded/professional - prospect warms up as founder builds rapport
- **systemPrompt:** Prospect opens up more when founder uses casual tone, shares context, asks permission ("Do you mind if I ask...")

---

## INTERVIEW STRUCTURE & FLOW

### Opening (2-5 minutes)
**Evidence:** "Greetings are exchanged and the prospect is made comfortable through shared context. Qualification: ask questions to understand the role and situation" (B2B Interview Guide).

**Opening Question Strategy:** "The point of the opening question is to elicit a story - you want people to paint the picture" (Customer Discovery Questions).

**Config Mapping:**
- **firstMessage[]:** 3-5 opening lines showing prospect's initial guarded state
  - "Sure, I have a few minutes. What did you want to talk about?"
  - "Hi there. So you mentioned wanting to learn about [problem area]?"
  - "Yeah, I can chat for a bit. What's this about?"

### Middle: Problem Exploration (15-20 minutes)
Follow The Mom Test rules: their life, not your idea; specifics, not hypotheticals; listen, don't talk.

**5 Core Questions (AllFactors):**
1. What is the hardest part about [doing X]?
2. Tell me about the last time you encountered this problem
3. Why was this hard?
4. What have you done to try to solve this problem?
5. What don't you love about the solutions you've tried?

**Config Mapping:**
- **systemPrompt:** Prospect reveals information in layers - surface problem → current workarounds → budget/time spent → emotional impact → willingness to try new solutions
- Prospect gives MORE detail when founder asks follow-ups, LESS detail when founder moves to new topic too quickly

### Red Flags & Resistance Patterns
**Evidence:** "False positives occur when interviewers hear what they want in seeking validation and when people say what they think you want to hear" (LinkedIn Advice).

**Common Resistance Patterns:**
- **Polite deflection:** "That's interesting, I'd have to think about it"
- **Feature requests without context:** "You should add [feature]" (without explaining why)
- **Enthusiasm without action:** "This is great! Let me know when it's ready" (no commitment)
- **Vague timelines:** "We might look into that next quarter"

**Config Mapping:**
- **systemPrompt (Prospect behavior):**
  - If founder asks "Would you buy this?", prospect says "Probably!" but won't commit to next steps
  - If founder asks "Can I follow up with you?", prospect agrees but shows no urgency
  - If founder digs into past behavior, prospect either reveals genuine pain (good signal) or admits they haven't really tried to solve it (bad signal)

---

## SCENARIO DESIGN DECISIONS

### Behavioral Arc
The prospect should simulate a REAL customer discovery interview with authentic resistance patterns:

1. **Start guarded** - Prospect is polite but non-specific in opening
2. **Warm up gradually** - Opens up when founder asks about their experience (not the solution)
3. **Reveal layers** - Gives surface answer, then deeper answer when prompted
4. **Test validation** - Becomes hesitant if founder asks for commitment too early
5. **Respect effort** - Becomes more detailed if founder shows genuine curiosity about their world

### What Triggers Positive Responses (systemPrompt - REWARD):
- Asking about specific past events ("last time this happened")
- Following up with "Why?" after initial answers
- Asking about current workarounds/solutions
- Asking about budget/time spent on problem
- Listening > 70% of the time
- Building rapport before probing
- Asking permission ("Mind if I ask...")

### What Triggers Negative Responses (systemPrompt - PUNISH):
- Pitching the solution/idea
- Asking hypothetical questions ("Would you buy this?")
- Asking leading questions ("Don't you think this would help?")
- Moving to next topic without digging deeper
- Talking more than 40% of the time
- Asking for compliments/validation
- Accepting surface-level answers without follow-up

---

## SCORE CATEGORIES (4 Dimensions)

Based on research findings, these 4 dimensions capture interview quality:

### 1. Problem Focus (vs Solution Pitching)
**What it measures:** Did the founder keep conversation on customer's problem, or did they pitch their solution?

**Good signals:**
- Asked about customer's current workflow
- Explored pain points without mentioning product
- Let customer describe their world first

**Bad signals:**
- Described their solution early
- Asked "Would this help you?"
- Spent time explaining features

**Research basis:** Rob Fitzpatrick (focus on their life, not your idea), Cindy Alvarez (away from features, back to the problem)

### 2. Specificity (Past Events vs Hypotheticals)
**What it measures:** Did founder ground conversation in actual past events or abstract future scenarios?

**Good signals:**
- "Tell me about the last time..."
- "Walk me through what happened"
- Asked about specific tools/costs/time

**Bad signals:**
- "Would you pay for..."
- "Do you think..."
- "How much would you..."

**Research basis:** Rob Fitzpatrick (future predictions are lies), AllFactors (specifics over hypotheticals)

### 3. Discovery Depth (Surface vs Root Cause)
**What it measures:** Did founder dig beneath surface answers to find root motivations?

**Good signals:**
- Asked "Why?" multiple times
- Uncovered budget impact or competitive pressure
- Found emotional/personal stakes
- Discovered what they've already tried

**Bad signals:**
- Accepted first answer
- Moved on after surface-level response
- Didn't explore underlying motivations

**Research basis:** I-Corps Hub (uncover foundational cause), Cindy Alvarez (digging deeper), GrowthRamp (unstated core problems)

### 4. Validation Quality (Commitment vs Compliments)
**What it measures:** Did founder seek concrete evidence of problem importance, or accept polite enthusiasm?

**Good signals:**
- Asked about current spend on workarounds
- Requested introduction to others with problem
- Asked if customer has tried to solve it before
- Explored what they've sacrificed (time/money)

**Bad signals:**
- Accepted "That's a great idea!"
- Took "I'd probably buy that" as validation
- Didn't ask about prior solution attempts
- Settled for vague interest

**Research basis:** Looppanel (commitment not compliments), LEANFoundry (measure what they did, not what they say), Mom Test (absence of problem-solving = low motivation)

---

## INPUTS (Form Fields Before Practice)

Based on Steve Blank ("founders must be the ones getting outside the building") and practical interview prep:

1. **Target Customer Segment** (text)
   - "Who are you interviewing?" (e.g., "busy parents", "B2B sales managers", "healthcare administrators")
   - Maps to systemPrompt context

2. **Problem Hypothesis** (text)
   - "What problem do you think they have?" (e.g., "struggle to find healthy meal options", "spend too much time on manual data entry")
   - This is what founder thinks - interview will test it

3. **Interview Context** (text, optional)
   - "How did you find this person?" (e.g., "LinkedIn outreach", "referral from friend", "saw them complain on Twitter")
   - Helps ground the role-play realistically

4. **What You Want to Learn** (text, optional)
   - "What specific question do you need answered?" (e.g., "Do they currently pay for workarounds?", "How often does this problem occur?")
   - Helps founder stay focused

---

## ANALYSIS PROMPT DESIGN

The analysis should evaluate the interview across the 4 score categories by looking for specific behavioral evidence:

### What to Look For:
1. **Ratio of questions to statements** - Did founder listen or lecture?
2. **Question types** - Past-focused ("last time") vs future ("would you")
3. **Follow-up depth** - Did they ask "why" after initial answers?
4. **Solution mentions** - Did they pitch or stay curious?
5. **Validation approach** - Commitment (intros, time, money) or compliments ("great idea")

### Evidence-Based Scoring:
- **High scores (8-10):** Founder asked 3+ follow-up "why" questions, grounded in past events, never mentioned solution, sought concrete commitment
- **Medium scores (5-7):** Founder mostly focused on problems but slipped into some hypotheticals or mentioned solution briefly
- **Low scores (1-4):** Founder pitched solution, asked hypothetical questions, accepted vague enthusiasm, didn't dig deeper

---

## FIRST MESSAGES (Opening Lines)

The prospect should start slightly guarded but professional - not hostile, not overly enthusiastic. These openings are realistic for cold outreach customer discovery:

1. **Neutral/Open:**
   - "Hi! Yeah, I got your message. I have about 20 minutes - what did you want to know?"

2. **Slightly Busy:**
   - "Hey there. I'm between meetings, but I can chat for a bit. You mentioned wanting to learn about [problem area]?"

3. **Mildly Skeptical:**
   - "Sure, I can talk. Just so you know, I've done a few of these startup interviews before - are you going to pitch me something?"

4. **Professional/Formal:**
   - "Good morning. Yes, we can discuss this. What specific aspect of [problem area] were you hoping to understand?"

5. **Curious but Guarded:**
   - "Okay, I'm interested to hear what this is about. How did you find me exactly?"

**Key:** None of these include details about their problem - founder must ask to discover.

---

## VOICE SETTINGS

- **11Labs Voice:** Should sound professional but natural (not robotic) - "Freya" or "Alice" for measured, professional tone
- **Interruption Allowed:** YES - founder may need to redirect if prospect rambles, or prospect may need to clarify
- **Speed:** Normal conversation pace

---

## ADDITIONAL CONTEXT FIELD

**Should include:**
- Any additional guidance about the prospect's personality
- Specific industry context
- How receptive they should be

**Example:** "Make the prospect somewhat skeptical at first, but open up when I ask about their actual experiences. They should have tried 2-3 solutions already and spent about $50/month on workarounds."

---

## INTERVIEW VOLUME GUIDANCE

**Evidence:** "Shoot for 10-20 customer discovery interviews" (I-Corps Hub). "Conduct 30+ interviews to reach saturation point" (GrowthRamp).

**Practice Implication:** Users should be encouraged to practice multiple discovery interviews, not just one. Consider adding messaging that this is a skill requiring repetition.

---

## KEY RESEARCH FINDINGS → CONFIG FIELD MAPPING

| Research Finding | Config Field | Implementation |
|-----------------|--------------|----------------|
| Pitching kills discovery | `systemPrompt` | PUNISH when founder describes solution |
| Past > Future questions | `scoreCategories` | "Specificity" dimension |
| Dig beneath surface | `scoreCategories` | "Discovery Depth" dimension |
| Commitment > Compliments | `scoreCategories` | "Validation Quality" dimension |
| Listen > Talk | `scoreCategories` | All dimensions (weight listening heavily) |
| Warm up gradually | `systemPrompt` | Start guarded, open when asked about experience |
| Follow-up "why" 2-3x | `systemPrompt` | Reveal layers only after repeated probing |
| Current solutions = budget anchor | `systemPrompt` | Share spend info when asked about workarounds |
| Opening should elicit story | `firstMessage[]` | Keep opening minimal - no problem details |
| Enthusiasm ≠ validation | `systemPrompt` | Give vague enthusiasm to hypotheticals, hesitancy to commitments |

---

## SOURCES CITED

1. **The Mom Test** - Rob Fitzpatrick
   - Looppanel: https://www.looppanel.com/blog/customer-interviews
   - Mom Test Book: https://www.momtestbook.com/

2. **Customer Development** - Steve Blank
   - Steve Blank blog: https://steveblank.com/category/customer-development/
   - Wikipedia: https://en.wikipedia.org/wiki/Customer_development

3. **Lean Customer Development** - Cindy Alvarez
   - O'Reilly/Author site: https://www.cindyalvarez.com/lean-customer-development/

4. **3 Common Customer Interviewing Mistakes** - LEANFoundry
   - https://www.leanfoundry.com/articles/3-common-customer-interviewing-mistakes

5. **Practical Interview Guides:**
   - AllFactors: https://allfactors.com/blog/customer-discovery-interview-questions/
   - GrowthRamp: https://www.growthramp.io/articles/customer-discovery-interviews
   - I-Corps Hub: https://desertpacificicorps.org/tips-and-best-practices-for-conducting-customer-discovery-interviews-and-gathering-valuable-feedback/
   - LinkedIn Advice: https://www.linkedin.com/advice/3/how-can-you-avoid-common-customer-discovery-pitfalls

---

## NEXT STEPS

- [x] Step 0: Research complete
- [ ] Step 1A: Create marketing plan
- [ ] Step 1B: Write blog post
- [ ] Step 1C: Register in blog index
- [ ] Steps 2-7: Implement config
- [ ] Step 8: Testing

**Research completion date:** December 29, 2025
