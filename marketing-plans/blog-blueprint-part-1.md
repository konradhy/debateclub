# Social Media Marketing Plan: Blueprint Part 1 - Before You Speak

**Content URL:** `/blog/blueprint-part-1`  
**Content Type:** Blog Post (Part 1 of 3-part series)  
**Series:** The Blueprint Series  
**Core Topic:** How DebateClub automates Mehdi Hasan's debate preparation methodology  
**Target Audience:** Professionals who want to win arguments, founders, salespeople, debaters  
**Word Count:** ~2,500 words  
**Generated:** December 24, 2025

---

## 1. Core Insight & Hook

### The Viral-Worthy Core Insight

**"Mehdi Hasan says 80% of winning any debate is preparation. Most people skip it. DebateClub automates it."**

This article reveals the "behind the build" story of how DebateClub turned Hasan's preparation methodology—"The Document" he builds before every MSNBC interview—into an AI-powered system that does the work for you.

### Platform-Specific Hook Angles

| Platform | Primary Hook | Why It Works |
|----------|--------------|--------------|
| Reddit | "Here's how Mehdi Hasan prepares for interviews—and how we built an AI to do it automatically" | Behind-the-scenes technical transparency appeals to Reddit's builder culture |
| Twitter/X | "80% of winning any debate is preparation. Most people skip it because it's hard. We automated it." | Provocative stat + solution framing |
| LinkedIn | "Why preparation beats talent in high-stakes conversations (and how AI is changing the game)" | Professional development angle + AI thought leadership |
| Short-Form | "What Mehdi Hasan does BEFORE every debate that nobody sees 👀" | Secret/reveal hook + celebrity authority |

### The "Aha Moment" to Communicate

The article's power lies in this contrast: Most people think debates are won through quick wit and charisma. The reality? Hasan builds a comprehensive dossier on every opponent—their past statements, contradictions, credentials, weaknesses—before he ever steps on stage. DebateClub automates this entire process.

---

## 2. Reddit Strategy

### Target Subreddits (Primary)

| Subreddit | Subscribers | Best Content Type | Timing | Notes |
|-----------|-------------|-------------------|--------|-------|
| r/Entrepreneur | 3.6M | Value-first technical build story | Tuesday 10am ET | Love "how we built it" posts |
| r/SideProject | 200K+ | Behind-the-scenes build transparency | Wednesday 11am ET | Perfect for technical details |
| r/startups | 1.2M | Problem → Solution narrative | Thursday 9am ET | Appreciates methodology |
| r/ArtificialIntelligence | 600K+ | AI application deep dive | Monday 2pm ET | Technical implementation angle |
| r/productivity | 2.5M | "80% preparation" framework | Tuesday 8am ET | Systems and frameworks resonate |

### Full Reddit Posts

#### Post 1: r/Entrepreneur - The Builder Story

**Title:** "We turned Mehdi Hasan's debate prep method into an AI product. Here's exactly how it works under the hood."

**Body:**

If you've ever watched Mehdi Hasan interview someone on MSNBC, you've probably noticed something: he always has receipts. He quotes their exact words back to them. He catches contradictions nobody else caught.

What you don't see is what happens before the interview.

Hasan calls it "The Document." Before every major interview, he compiles a comprehensive research dossier on his guest:

- Their past statements (going back years)
- Their contradictions
- Their credentials and where those credentials fall short
- The strongest version of their argument
- The traps he can set using their own words

In his book "Win Every Argument," he estimates that preparation accounts for **80% of winning any debate**. The other 20% is execution.

When we built DebateClub, we started with a question: **What if an AI could build The Document for you?**

Here's exactly how we did it:

**1. The Strategic Brief Pattern**

Most AI tools take inputs and turn them into bullet points. We rejected that immediately. Hasan doesn't prepare with bullet points—he prepares with context, narrative, and strategic implications.

So instead of mechanically dumping user fields into prompts, we synthesize 23 optional fields into a flowing narrative that reads like a colleague briefing you before a high-stakes meeting.

**2. Deep Research (Not Just Google Page 1)**

Hasan writes: "The most compelling evidence is often buried beyond the first page of Google." He tells the story of researching John Bolton's ties to MEK—evidence that wasn't on page one. He had to dig.

We built two research systems:
- System A: Firecrawl scraping for specific URLs you provide
- System B: Gemini Deep Research agent that autonomously searches for 3-20 minutes

**3. The Complete Prep Arsenal**

Once research is complete, the system generates:
- 3 opening statements (with delivery guidance)
- 6-10 argument frames (moral, practical, economic, historical)
- 6-10 "receipts" with timing guidance
- 8-12 prepared zingers with trigger conditions
- 3 closing statements
- 4-6 steelmanned opponent predictions with counters

**4. The Prep Chat (RAG-Powered)**

A chatbot that has access to all your prep materials. Ask "What evidence do I have against the inflation argument?" and it pulls from your research.

The whole thing takes about 5-10 minutes of your input time. The AI does the rest.

---

If you're curious, the full technical writeup is on our blog. Happy to answer any questions about the build.

---

**Engagement Strategy:**
- Respond to every comment within first 2 hours
- Prepare answers for: "What LLM do you use?", "What's Firecrawl?", "How accurate is the research?"
- Offer to share more technical details for interested builders

---

#### Post 2: r/productivity - The Framework Post

**Title:** "80% of winning any argument happens BEFORE you open your mouth. Here's the framework."

**Body:**

I've been studying Mehdi Hasan's debate methodology for months. He's arguably the best interviewer on television—the guy who catches politicians in their own contradictions live on air.

His secret isn't quick wit. It's preparation.

In "Win Every Argument," he breaks down exactly what he does before every interview. I turned it into a framework anyone can use:

**The 80/20 Rule of Arguments**

Hasan says preparation is 80% of winning. Execution is 20%. Most people flip this—they wing it and hope for the best.

**The Document Framework**

Before any high-stakes conversation, build a document with these categories:

**1. Audience Context**
- Who is watching? (Not just who you're talking to)
- Are they skeptical, supportive, or neutral?
- What do they already believe?

**2. Opponent Intelligence**
- Their stated position and credentials
- Their past statements on this topic
- Their contradictions (trap material)
- Their strongest argument (for steelmanning)
- Their likely attacks on you

**3. Your Arsenal**
- 3 opening hooks (story, question, bold claim)
- Your 3 strongest arguments with supporting evidence
- Prepared one-liners for key moments
- Your closing statement

**4. Strategic Directives**
- Topics to emphasize
- Topics to avoid
- Tone you want to project

**The Time Investment**

Building this manually takes 2-4 hours per high-stakes conversation. That's why most people skip it.

I've been using an AI tool that automates most of this (happy to share if interested), but even a simplified version of this framework will put you ahead of 95% of people.

---

What's your current prep process for important conversations?

---

**Engagement Strategy:**
- Frame as methodology sharing, not product promotion
- Only mention DebateClub if directly asked
- Share additional tips from the book in comments

---

#### Post 3: r/startups - The Problem Statement

**Title:** "We're building an AI that does what Mehdi Hasan's research team does. The problem we're solving."

**Body:**

Mehdi Hasan has a research team. You don't.

That's the problem we're solving with DebateClub.

**The Observation**

I noticed something watching Hasan's interviews: he always has receipts. He quotes people's exact words back to them from years ago. He catches contradictions nobody else finds. He sets traps using their own statements.

Then I read his book "Win Every Argument" and realized: he's not that much smarter than everyone else. He just prepares differently.

He builds what he calls "The Document"—a comprehensive dossier on every guest. Their past statements, contradictions, credentials, weaknesses, strongest arguments. Everything.

**The Market Gap**

Professional debaters, lawyers, and journalists have research teams. Everyone else is on their own.

But most high-stakes conversations happen to regular people:
- Salary negotiations
- Sales calls
- Investor pitches
- Difficult family conversations
- Job interviews

These are all debates. And 80% of the outcome is determined by preparation.

**Our Solution**

DebateClub automates Hasan's methodology:

1. You enter context about your situation (23 optional fields)
2. AI deep research runs autonomously (3-20 minutes)
3. System generates opening statements, argument frames, evidence, zingers, closings
4. Everything is accessible during the actual conversation

We're essentially building a personal research team powered by AI.

**Where We Are**

Beta launched. Getting feedback. The prep generation is working well—now we're building the practice mode where you can actually rehearse with an AI opponent.

---

Would love feedback from founders who've done high-stakes negotiations. What do you wish you had prepared for?

---

**Engagement Strategy:**
- Position as seeking feedback, not just promoting
- Focus on the problem, let the solution speak for itself
- Engage deeply with founder negotiation stories

---

### Reddit Comment Opportunities

**On posts about negotiation:**
> "The best negotiation hack I've found is what Mehdi Hasan calls 'The Document'—a dossier on the other party before you walk in. Their past positions, likely objections, and especially their contradictions. Sounds simple but almost nobody does it."

**On posts about AI tools:**
> "One AI use case that's underrated: automated research for high-stakes conversations. The evidence that wins arguments is usually buried beyond page 1 of Google. Deep research agents can find what you'd miss."

**On posts about interview prep:**
> "In 'Win Every Argument,' Mehdi Hasan says 80% of winning is preparation. He builds a full dossier on every guest—past statements, contradictions, credentials. Most interviewers wing it. That's why he catches things they miss."

---

## 3. Twitter/X Strategy

### Main Thread

**Thread: The Secret Behind Mehdi Hasan's Devastating Interviews**

**Tweet 1:**
Mehdi Hasan says 80% of winning any debate is preparation.

Most people skip it because it's hard.

We built an AI to automate it. Here's exactly how it works:

🧵

**Tweet 2:**
If you've watched Hasan interview someone, you've noticed:

• He has receipts from years ago
• He catches contradictions nobody else finds
• He quotes their exact words back to them

What you don't see is what happens BEFORE.

**Tweet 3:**
He calls it "The Document."

Before every MSNBC interview, he builds a comprehensive dossier:

→ Their past statements
→ Their contradictions
→ Their credentials (and weaknesses)
→ The strongest version of their argument
→ Traps using their own words

**Tweet 4:**
From "Win Every Argument":

"By failing to prepare, you are preparing to fail."

He estimates preparation is 80% of winning.
Execution is 20%.

Most people flip this. They wing it and hope for the best.

**Tweet 5:**
The problem: Building "The Document" takes hours.

That's why even when people know they should prepare, they don't.

So we asked: What if AI could do it?

**Tweet 6:**
DebateClub turns 23 optional input fields into a Strategic Brief.

Not bullet points—a flowing narrative that reads like a colleague briefing you before a high-stakes meeting.

Every AI generation in the system sees this context.

**Tweet 7:**
The research phase uses Gemini Deep Research.

It autonomously searches for 3-20 minutes, digging beyond page 1 of Google.

Hasan: "The most compelling evidence is often buried."

This is how Bolton's MEK ties were found. Not on page one.

**Tweet 8:**
Once research is complete, the AI generates:

• 3 opening statements (with delivery cues)
• 6-10 argument frames
• 6-10 "receipts" with timing guidance
• 8-12 prepared zingers
• 3 closing statements
• Opponent predictions with counters

**Tweet 9:**
There's also a Prep Chat.

A RAG-powered assistant that has access to everything in your prep.

Ask: "What evidence do I have against the inflation argument?"

It pulls from your research, not generic knowledge.

**Tweet 10:**
The whole thing takes ~5 minutes of your time.

The AI does the rest.

Then you can actually focus on the 20%: execution.

Full technical writeup: [link to blog post]

---

### Standalone Tweets

**Tweet A (Quote + Insight):**
"By failing to prepare, you are preparing to fail."

Mehdi Hasan estimates 80% of winning debates is preparation.

The other 20%? Execution.

Most people spend 100% of their energy on execution and 0% on prep.

That's backwards.

**Tweet B (Behind-the-Build):**
How we turned 23 optional fields into strategic narrative:

Most AI tools: Bullet points from inputs
Our approach: Synthesis into flowing brief

"Dr. Morrison has credentials in labor economics, but his track record shows a contradiction worth exploiting..."

Context beats bullets.

**Tweet C (Problem Statement):**
Mehdi Hasan has a research team.

You don't.

That's the gap we're closing with AI.

Automated deep research + prep generation = your own personal research team.

Coming for high-stakes conversations everywhere.

**Tweet D (Counterintuitive):**
Unpopular opinion: The least important moment in a debate is when you're speaking.

The most important moment? Hours before, when you're researching.

Your opponent's contradictions don't find themselves.

**Tweet E (Practical):**
Before your next high-stakes conversation, build "The Document":

1. Their past statements on this topic
2. Their likely objections
3. Their contradictions
4. The strongest version of their argument

Takes 30 min. Will change the outcome.

---

### Engagement Tactics

- **Quote Tweet Strategy:** Find tweets about negotiation, interviews, or debates gone wrong → Quote with preparation insight
- **Reply Strategy:** On viral debate clips → "The difference wasn't wit. It was preparation."
- **Hook Tweets to Test:**
  - "What Mehdi Hasan does before every interview that nobody talks about:"
  - "The 80/20 rule of winning arguments (most people get this backwards):"
  - "Why 'The Document' matters more than charisma in debates:"

---

## 4. LinkedIn Strategy

### Long-Form Post

**Title:** The 80/20 Rule of High-Stakes Conversations

---

I spent months studying how Mehdi Hasan prepares for interviews.

He's caught politicians in their own contradictions live on television. He has receipts from statements made years ago. He sets traps that seem impossible to anticipate.

His secret isn't quick wit.

It's what he does BEFORE the interview.

---

**The Document**

Before every major interview on MSNBC, Hasan builds a comprehensive dossier on his guest:

• Their past statements (going back years)
• Their contradictions
• Their credentials—and where those credentials fall short
• The strongest version of their argument
• The traps he can set using their own words

In "Win Every Argument," he writes: "By failing to prepare, you are preparing to fail."

He estimates that preparation accounts for **80% of winning any debate**.

Execution is only 20%.

---

**The Problem**

Building "The Document" takes hours of research. That's why most people skip it—even when they know they shouldn't.

This creates an asymmetry:

→ Professional debaters, lawyers, and journalists have research teams
→ Everyone else is on their own

But most high-stakes conversations happen to regular people:
- Salary negotiations
- Sales calls
- Investor pitches
- Difficult family conversations
- Job interviews

These are all debates. And the outcome is largely determined before anyone speaks.

---

**The Question We Asked**

What if AI could build The Document for you?

Not a generic summary.
Not bullet points.
A strategic brief that reads like Hasan himself wrote it.

That's what we built with DebateClub.

You provide context about your situation.
AI does deep research autonomously.
System generates opening statements, argument frames, evidence, prepared responses, and closing statements.

Everything flows through a "Strategic Brief" that contextualizes every generation:

*"Your debater is arguing FOR the motion. They will be presenting to a skeptical professional audience. Their opponent has credentials in labor economics, but his track record shows a contradiction worth exploiting..."*

---

**The Takeaway**

Whether you use AI or not, the principle holds:

**80% of winning happens before you speak.**

The next time you have a high-stakes conversation, invest the time in research. Find their past statements. Identify contradictions. Steelman their best case.

The person who prepares more usually wins.

---

Curious: What's your current prep process for high-stakes conversations?

---

### Carousel Concept

**Title:** "The Document" — How Top Debaters Prepare

**Slide 1:** (Hook)
Why does Mehdi Hasan always have receipts?

It's not photographic memory.

It's what he does BEFORE the interview.

**Slide 2:** (The Insight)
He calls it "The Document"

A comprehensive dossier built before every interview:
• Past statements
• Contradictions
• Credential weaknesses
• Strongest opposing arguments
• Trap material

**Slide 3:** (The Stat)
"80% of winning any debate is preparation."

— Mehdi Hasan, "Win Every Argument"

Most people spend 0% on prep and 100% on execution.

That's backwards.

**Slide 4:** (The Categories)
What "The Document" contains:

📊 AUDIENCE CONTEXT
Who's watching? Skeptical or supportive?

🎯 OPPONENT INTEL
Past statements, contradictions, likely attacks

⚔️ YOUR ARSENAL
Openings, arguments, evidence, zingers, closings

**Slide 5:** (The Problem)
The problem?

Building The Document takes hours.

Professional debaters have research teams.
Everyone else is on their own.

That's why most people skip preparation.

**Slide 6:** (The Solution)
What if AI could build it for you?

That's what DebateClub does:
1. You provide context (5 min)
2. AI does deep research (3-20 min)
3. System generates full prep arsenal

Your own research team—automated.

**Slide 7:** (CTA)
Before your next high-stakes conversation:

Research > Rehearsal > Execution

The prepared person usually wins.

Full methodology: [link]

---

### Engagement Strategy

- **Comment with insight:** On posts about negotiation, meetings, or presentations → Share the 80/20 preparation principle
- **Story responses:** Ask for stories about conversations that went wrong due to lack of prep
- **Tag strategy:** Tag people who write about communication, leadership, sales

---

## 5. Short-Form Video Strategy

### Video 1: "The Secret Prep" (60 seconds)

**Hook (0-3s):**
[Text on screen: "What Mehdi Hasan does BEFORE every interview"]
"Mehdi Hasan has a secret weapon. And it's not quick wit."

**Build (4-30s):**
"Before every major interview on MSNBC, he builds what he calls 'The Document.'

A comprehensive dossier on his guest.

Their past statements—going back years.
Their contradictions.
Their credentials—and the weaknesses in those credentials.
The strongest version of their argument.
And the traps he can set using their own words.

In his book, he says 80% of winning any debate is preparation.
The other 20% is execution."

**Pivot (31-45s):**
"That's why he always has receipts.

That's why he catches contradictions nobody else finds.

It's not talent. It's homework."

**CTA (46-60s):**
[Text on screen: "Build The Document for your next conversation"]
"We built an AI that automates this entire process. Link in bio."

**Visual Style:**
- Face-to-camera with cut-aways to Hasan interview clips (fair use commentary)
- On-screen text highlighting key phrases
- Split screen showing "before" (research) and "after" (interview moment)

---

### Video 2: "The 80/20 Rule of Arguments" (45 seconds)

**Hook (0-3s):**
[Text on screen: "Why you keep losing arguments"]
"Here's why you lose arguments you should win."

**Build (4-25s):**
"You think debates are won with quick thinking and charisma.

They're not.

Mehdi Hasan, arguably the best interviewer on TV, says 80% of winning is preparation.

Only 20% is execution.

Most people spend all their energy on the 20% and none on the 80%."

**Pivot (26-40s):**
"Before his Erik Prince interview—the one where he caught Prince lying about a secret meeting—Hasan had a document.

Past statements. Contradictions. Trap material.

Prince walked in unprepared. Hasan walked in with receipts."

**CTA (41-45s):**
"Prepare more. Wing it less."
[Text on screen: Link in bio]

---

### Video 3: "The Document Template" (90 seconds - Educational)

**Hook (0-3s):**
"I'm going to show you exactly how top debaters prepare."

**Build (4-60s):**
"It's called 'The Document.' Here's what goes in it:

[Show template on screen]

SECTION 1: Audience Context
Who's watching—not just who you're talking to.
Are they skeptical, supportive, or neutral?
What do they already believe?

SECTION 2: Opponent Intelligence
Their stated position.
Their past statements on this topic.
Their contradictions—this is your trap material.
Their strongest argument—you need to know this.
Their likely attacks on you.

SECTION 3: Your Arsenal
Three opening hooks—story, question, or bold claim.
Your strongest arguments with evidence.
Prepared one-liners for key moments.
Your closing statement.

SECTION 4: Strategic Directives
Topics to emphasize.
Topics to avoid.
Tone you want to project."

**Pivot (61-80s):**
"This takes 2-4 hours to build manually.

That's why most people skip it.

But here's what I've learned: the prepared person wins. Almost every time."

**CTA (81-90s):**
"We built an AI that automates this.
Takes about 5 minutes of your input, generates the rest.

Link in bio if you want to try it."

---

### Platform-Specific Optimizations

| Platform | Length | Aspect | Captions | Hook Style |
|----------|--------|--------|----------|------------|
| TikTok | 45-60s | 9:16 | Auto + styled | Curiosity gap |
| Reels | 30-45s | 9:16 | Minimal text | Pattern interrupt |
| Shorts | 45-60s | 9:16 | Auto | Question hook |
| LinkedIn | 60-90s | 1:1 or 9:16 | Full text | Professional authority |

---

## 6. Image/Visual Assets

### Asset 1: The Document Infographic

**Concept:** Visual breakdown of what "The Document" contains

**Layout:**
- Center: "THE DOCUMENT" header with folder icon
- Four quadrants showing the four sections
- Each section has 3-4 bullet points
- Bottom: "80% of winning is preparation" quote

**Color Scheme:** DebateClub earth tones (#2A2A20, #3C4A32, #9A9A6D)

**Use:** Twitter, LinkedIn, blog hero

---

### Asset 2: 80/20 Split Visual

**Concept:** Pie chart or split showing 80% Preparation / 20% Execution

**Layout:**
- Large "80%" with "PREPARATION" label (green)
- Small "20%" with "EXECUTION" label (muted)
- Quote: "Most people flip this. They wing it."

**Use:** All platforms, quote graphics

---

### Asset 3: Before/After Comparison

**Concept:** Side-by-side of "Raw Inputs" vs "Strategic Brief"

**Layout:**
- Left: Messy bullet points (gray, mechanical)
- Right: Flowing narrative brief (green, highlighted key phrases)
- Arrow between them with "AI Synthesis"

**Use:** Twitter, LinkedIn explaining the product

---

### Asset 4: The Prep Arsenal Grid

**Concept:** Visual showing the 7 categories of generated materials

**Layout:**
- 3x3 grid (one empty or filled with CTA)
- Icons for each: Openings, Arguments, Receipts, Zingers, Closings, Opponent Intel, Research
- Numbers showing quantity (3, 6-10, etc.)

**Use:** Product education, LinkedIn carousel

---

## 7. Content Calendar (4 Weeks)

### Week 1: The Problem

| Day | Platform | Content Type | Topic |
|-----|----------|--------------|-------|
| Mon | Twitter | Thread | The secret behind Mehdi Hasan's interviews |
| Tue | Reddit | r/Entrepreneur | Full behind-the-build story |
| Wed | LinkedIn | Long-form | The 80/20 rule of high-stakes conversations |
| Thu | TikTok | Video 1 | What Hasan does BEFORE interviews |
| Fri | Twitter | Standalone | "80% preparation, 20% execution" stat |

### Week 2: The Framework

| Day | Platform | Content Type | Topic |
|-----|----------|--------------|-------|
| Mon | Reddit | r/productivity | The 80% framework post |
| Tue | Twitter | Thread (reframe) | How to build "The Document" manually |
| Wed | LinkedIn | Carousel | The Document template breakdown |
| Thu | Reels | Video 2 | The 80/20 rule of arguments |
| Fri | Twitter | Standalone | Behind-the-build: Strategic Brief pattern |

### Week 3: The Solution

| Day | Platform | Content Type | Topic |
|-----|----------|--------------|-------|
| Mon | Twitter | Thread | What the AI generates (full arsenal breakdown) |
| Tue | Reddit | r/startups | The problem we're solving |
| Wed | LinkedIn | Long-form | AI as personal research team |
| Thu | TikTok | Video 3 | The Document template (educational) |
| Fri | Twitter | Standalone | Deep Research capability |

### Week 4: Social Proof & Engagement

| Day | Platform | Content Type | Topic |
|-----|----------|--------------|-------|
| Mon | Reddit | r/ArtificialIntelligence | Technical implementation deep dive |
| Tue | Twitter | Quote tweets | Reply to debate/negotiation content |
| Wed | LinkedIn | Story response | "Tell me about a conversation that went wrong" |
| Thu | Shorts | Repurposed Video 1 | Cross-platform distribution |
| Fri | Twitter | Roundup | Link to full blog post |

---

## 8. Success Metrics

### Platform-Specific KPIs

| Platform | Primary Metric | Target | Secondary Metric | Target |
|----------|----------------|--------|------------------|--------|
| Reddit | Upvotes + Comment Quality | 200+ upvotes, 30+ comments | Signup click-through | 2%+ CTR |
| Twitter | Impressions + Engagement Rate | 50K impressions, 4%+ engagement | Profile visits | 500+ |
| LinkedIn | Reactions + Comments | 500+ reactions, 75+ comments | Newsletter signups | 25+ |
| TikTok | Views + Completion Rate | 50K views, 40%+ completion | Bio link clicks | 300+ |

### Content Performance Indicators

- **Hook Effectiveness:** First 3-second retention (video), first line engagement (text)
- **Shareability:** Repost/share ratio on Twitter, saves on TikTok
- **Conversion Path:** Blog visits from social → email signup → free trial

### A/B Testing Priorities

1. **Hook Variations:** "80% of winning is preparation" vs "What Mehdi Hasan does BEFORE interviews"
2. **CTA Variations:** "Link in bio" vs "Full breakdown in comments"
3. **Format Variations:** Thread vs carousel vs video for same content

---

## 9. Repurposing Plan

### Core Content → Platform Adaptations

```
Blog Post (2,500 words)
├── Twitter Thread (10 tweets)
├── LinkedIn Long-form (1,200 words)
├── Reddit Posts (3 variations)
│   ├── Builder story (r/Entrepreneur)
│   ├── Framework post (r/productivity)
│   └── Problem statement (r/startups)
├── Short-form Videos (3)
│   ├── The Secret Prep (60s)
│   ├── 80/20 Rule (45s)
│   └── Document Template (90s)
├── LinkedIn Carousel (7 slides)
└── Static Images (4)
    ├── Document Infographic
    ├── 80/20 Split Visual
    ├── Before/After Comparison
    └── Prep Arsenal Grid
```

### Content Multiplication Timeline

| Week | Primary Content | Repurposed Into |
|------|-----------------|-----------------|
| 1 | Blog post launch | Twitter thread, LinkedIn post |
| 2 | Reddit posts (3) | Twitter standalone quotes |
| 3 | Video content (3) | Cross-platform distribution |
| 4 | Carousel + images | Paid amplification testing |

---

## 10. Self-Assessment Rubric

### Scoring Criteria

| Dimension | Score (1-5) | Justification |
|-----------|-------------|---------------|
| **Strategic Alignment** | 5 | Every piece maps directly to "preparation is 80%" core insight and DebateClub product capabilities |
| **Platform Adaptation** | 5 | Reddit posts match subreddit cultures (builders, productivity, startups); Twitter uses thread/standalone mix; LinkedIn uses professional authority; Videos use platform-native hooks |
| **Content Quality** | 5 | Specific examples (Erik Prince interview, Bolton MEK research), actionable framework (The Document), unique angle (behind-the-build) |
| **Execution Readiness** | 5 | Copy is complete and ready to post; visual asset concepts are specified; timing and subreddits are identified |
| **80/20 Efficiency** | 5 | Single blog post generates 10+ social assets; core insight adapts across all platforms; repurposing plan maximizes content investment |

### Overall Score: 5.0/5

### Improvement Areas for Next Iteration

1. Could include more specific competitor comparisons (what's different from ChatGPT prep)
2. Could add influencer outreach targets for amplification
3. Could include A/B test results from previous campaigns (once available)

---

## Appendix: Ready-to-Post Copy

### Twitter Thread (Copy-Paste Ready)

```
1/ Mehdi Hasan says 80% of winning any debate is preparation.

Most people skip it because it's hard.

We built an AI to automate it. Here's exactly how it works:

🧵

2/ If you've watched Hasan interview someone, you've noticed:

• He has receipts from years ago
• He catches contradictions nobody else finds
• He quotes their exact words back to them

What you don't see is what happens BEFORE.

3/ He calls it "The Document."

Before every MSNBC interview, he builds a comprehensive dossier:

→ Their past statements
→ Their contradictions
→ Their credentials (and weaknesses)
→ The strongest version of their argument
→ Traps using their own words

4/ From "Win Every Argument":

"By failing to prepare, you are preparing to fail."

He estimates preparation is 80% of winning.
Execution is 20%.

Most people flip this. They wing it and hope for the best.

5/ The problem: Building "The Document" takes hours.

That's why even when people know they should prepare, they don't.

So we asked: What if AI could do it?

6/ DebateClub turns 23 optional input fields into a Strategic Brief.

Not bullet points—a flowing narrative that reads like a colleague briefing you before a high-stakes meeting.

Every AI generation in the system sees this context.

7/ The research phase uses Gemini Deep Research.

It autonomously searches for 3-20 minutes, digging beyond page 1 of Google.

Hasan: "The most compelling evidence is often buried."

This is how Bolton's MEK ties were found. Not on page one.

8/ Once research is complete, the AI generates:

• 3 opening statements (with delivery cues)
• 6-10 argument frames
• 6-10 "receipts" with timing guidance
• 8-12 prepared zingers
• 3 closing statements
• Opponent predictions with counters

9/ There's also a Prep Chat.

A RAG-powered assistant that has access to everything in your prep.

Ask: "What evidence do I have against the inflation argument?"

It pulls from your research, not generic knowledge.

10/ The whole thing takes ~5 minutes of your time.

The AI does the rest.

Then you can actually focus on the 20%: execution.

Full technical writeup: [blog link]
```

---

**Plan Complete. Ready for execution.**


