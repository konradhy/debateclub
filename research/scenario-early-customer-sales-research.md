# Early Customer Sales - Research & Sources

**Last Updated:** December 29, 2025

---

## Primary Framework

**The Mom Test: How to Talk to Customers & Learn If Your Business is a Good Idea When Everyone is Lying to You**
- **Author:** Rob Fitzpatrick
- **Year:** 2013
- **Source:** Self-published
- **Key Concept:** Early customer conversations require extracting truth from people who want to be polite. Selling to first customers means selling the vision and the problem, not the product.

**Secondary Framework: Founding Sales**
- **Author:** Pete Kazanjy
- **Year:** 2020
- **Source:** Founding Sales (https://www.foundingsales.com/)
- **Key Concept:** Early-stage B2B sales is fundamentally different from enterprise sales. You're selling belief, not features. Your lack of social proof is a feature, not a bug, if you frame it right.

**Tertiary Framework: Crossing the Chasm**
- **Author:** Geoffrey Moore
- **Year:** 1991 (revised 2014)
- **Source:** Harper Business
- **Key Concept:** Early adopters buy for different reasons than mainstream customers. They want to be first, solve a painful problem, and gain competitive advantage. They tolerate imperfection.

---

## Core Techniques → `scoreCategories`

These become the 4 dimensions measured in analysis.

### 1. Problem Amplification

**Source:** Fitzpatrick, "The Mom Test" (2013), Chapter 1
**What it is:** Making the prospect vividly feel the pain of their current situation before offering a solution. Connecting their problem to real business impact.
**Why it works:** Early customers don't buy products – they buy solutions to problems they urgently feel. If they don't feel the pain, they won't take a risk on an unproven vendor.
**Measurable signals:**
- Did they get the prospect to articulate the cost of the problem?
- Did they connect the problem to business outcomes (time, money, risk)?
- Did they avoid jumping to features before establishing pain?

**Quote:** "The world's most deadly fluff is 'I would definitely buy that.'" – Fitzpatrick

→ **Score Category:** "Problem Amplification" - "Did they make the prospect feel the urgency of their problem before pitching?"

### 2. Vision Selling

**Source:** Kazanjy, "Founding Sales" (2020), Chapter 5: "Selling Without Social Proof"
**What it is:** Selling where the product is going, not where it is. Painting a picture of the future and inviting the customer to be part of building it.
**Why it works:** Early customers know you don't have case studies. They're buying your vision and your ability to execute. The product is a bet on you.
**Measurable signals:**
- Did they paint a compelling future state?
- Did they position the customer as a pioneer/partner, not just a buyer?
- Did they turn lack of social proof into an advantage (exclusivity, influence)?

**Quote:** "Your early customers aren't buying your product. They're buying your vision and betting on you." – Kazanjy

→ **Score Category:** "Vision Selling" - "Did they sell the future state and position the customer as a partner?"

### 3. Objection Reframing

**Source:** Moore, "Crossing the Chasm" (2014), Chapter 2: "High-Tech Marketing Enlightenment"
**What it is:** Turning early-stage weaknesses (no customers, no track record, unfinished product) into advantages for the right buyer.
**Why it works:** Early adopters want to be first. They want influence over the product. They want competitive advantage. These are features, not bugs, if framed correctly.
**Measurable signals:**
- Did they reframe "no customers" as "exclusive access"?
- Did they reframe "unfinished product" as "customer influence on roadmap"?
- Did they identify the prospect as an early adopter vs. pragmatist?

→ **Score Category:** "Objection Reframing" - "Did they turn early-stage weaknesses into advantages?"

### 4. Commitment Extraction

**Source:** Fitzpatrick, "The Mom Test" (2013), Chapter 4: "Keeping It Casual"
**What it is:** Getting concrete next steps, not vague interest. Asking for something that costs the prospect time, reputation, or money.
**Why it works:** "I love it" means nothing. A meeting with their boss, a pilot start date, or a signed LOI means everything. Early-stage sales live or die on actual commitment.
**Measurable signals:**
- Did they ask for a specific next step, not "let me know"?
- Did they get something that cost the prospect (intro, time, deposit)?
- Did they avoid accepting "sounds great" as a win?

**Quote:** "Commitment is the currency of early-stage sales. Words are worthless."

→ **Score Category:** "Commitment Extraction" - "Did they get real commitment, not just polite interest?"

### 5. Scrappy Adaptability

**Source:** Kazanjy, "Founding Sales" (2020), Chapter 3
**What it is:** Adjusting on the fly when the standard pitch doesn't land. Finding angles that resonate with this specific prospect.
**Why it works:** Early-stage selling is discovery. Every conversation teaches you something. Rigid pitches fail. Curious, adaptive sellers win.
**Measurable signals:**
- Did they pivot when something didn't land?
- Did they ask follow-up questions to find what mattered?
- Did they customize the pitch based on what they learned?

→ This informs `systemPrompt` behavior (AI should test adaptability)

---

## Common Mistakes → `systemPrompt` punish rules

These become behavioral rules that punish bad technique.

### 1. Feature-Dumping Before Pain

**Source:** Fitzpatrick, "The Mom Test" (2013), pg. 27
**What people do:** Jump straight to product features and capabilities without establishing the problem.
**Why it fails:** Early adopters don't care about features – they care about solving a problem. If they don't feel the pain, they won't take the risk.
**AI Response:** When user starts listing features before discussing the problem, AI becomes skeptical and asks "But what problem does this actually solve for me?"

→ **systemPrompt rule:** "IF user leads with features without establishing problem → Express skepticism: 'I'm not sure I understand why I need this.'"

### 2. Overselling the Product

**Source:** Kazanjy, "Founding Sales" (2020), pg. 89
**What people do:** Act like the product is finished and polished when it clearly isn't. Pretend they have traction they don't have.
**Why it fails:** Early adopters see through it. They know you're early-stage. Authenticity builds trust; false confidence destroys it.
**AI Response:** When user overpromises or pretends to be more mature than they are, AI calls it out.

→ **systemPrompt rule:** "IF user claims they have 'many customers' or 'proven results' without specifics → Push back: 'Can you give me specific numbers? References I can call?'"

### 3. Accepting "Sounds Great" as a Win

**Source:** Fitzpatrick, "The Mom Test" (2013), Chapter 4
**What people do:** Interpret polite interest as real buying intent. Leave meetings feeling good without any actual commitment.
**Why it fails:** Politeness is free. Commitment costs something. Without commitment, you have nothing.
**AI Response:** When user doesn't push for concrete next steps, AI gives them false hope then ghosts.

→ **systemPrompt rule:** "IF conversation is ending and user hasn't asked for specific next steps → Be vaguely positive but don't commit: 'Yeah, this is interesting. Let me think about it and get back to you.'"

### 4. Talking Too Much About Yourself

**Source:** Fitzpatrick, "The Mom Test" (2013), pg. 42
**What people do:** Spend the whole conversation talking about their journey, their technology, their vision – without asking about the prospect.
**Why it fails:** Prospects buy because of their problems, not your story. Self-centered pitches lose.
**AI Response:** When user monologues without asking questions, AI loses interest.

→ **systemPrompt rule:** "IF user talks for more than 30 seconds without asking a question → Become distracted, check phone, give shorter answers."

### 5. Not Qualifying the Buyer

**Source:** Moore, "Crossing the Chasm" (2014), pg. 67
**What people do:** Pitch to anyone who will listen without determining if they're actually an early adopter.
**Why it fails:** Pragmatist buyers will never buy an unproven product. Time spent on them is wasted. Early adopters have specific characteristics.
**AI Response:** AI occasionally acts like a pragmatist to test if user can recognize and adapt.

→ **systemPrompt rule:** "Sometimes express pragmatist concerns ('I need to see more customers first'). If user recognizes this and pivots appropriately, soften. If user keeps pushing generic pitch, become more resistant."

---

## Realistic Openings → `firstMessage[]`

How do these conversations actually start? Early customer sales often happen through warm intros, cold outreach that worked, or at conferences.

1. "So my friend said you're working on something interesting. I've got about 15 minutes – tell me what you're building." - [Context: Warm intro meeting, limited time, skeptical but open]

2. "I saw your post about [problem]. We've been struggling with exactly that. But honestly, I get pitched constantly – what makes you different?" - [Context: Inbound interest but skeptical about unproven vendor]

3. "Okay, I'm listening. But I should tell you upfront – we've been burned by startups before. Last vendor we tried disappeared after 6 months." - [Context: Interested but gun-shy from bad experiences]

4. "Your demo was interesting but I'm not sure we're ready for something this new. Walk me through how this actually works in practice." - [Context: Post-demo follow-up, needs convincing on execution]

5. "I like what you're doing, but I need to be honest – getting budget for an unproven vendor is going to be a hard sell internally. How do I make that case?" - [Context: Interested champion who needs help with internal buy-in]

---

## Objection Patterns → `responseMap[]`

What pushback is common? How should the user respond?

### 1. Trigger: "You don't have any customers yet"

**Source:** Kazanjy, "Founding Sales" (2020), Chapter 5
**Why they say this:** Risk aversion. Need for social proof. Rational concern about unproven vendor.
**How to respond:** Reframe as exclusive access. "You're right – we're just getting started. That means you'd be one of the first 10 companies to use this. You'd have direct influence on the roadmap and white-glove support that later customers won't get."

→ **responseMap entry:** { trigger: "no customers", response: "Reframe as exclusive access and customer influence on roadmap" }

### 2. Trigger: "The product seems unfinished"

**Source:** Moore, "Crossing the Chasm" (2014), Chapter 2
**Why they say this:** They see gaps. Features are missing. UX is rough.
**How to respond:** Acknowledge and reframe. "You're right – we're building in public. What you're seeing is where we are today. What you'd be buying is where we're going – and you'd have a voice in what we build next."

→ **responseMap entry:** { trigger: "product unfinished", response: "Acknowledge honestly, sell the vision, offer roadmap influence" }

### 3. Trigger: "I need to see more proof before I can commit"

**Source:** Fitzpatrick, "The Mom Test" (2013), Chapter 5
**Why they say this:** Pragmatist thinking. Needs safety. Not an early adopter.
**How to respond:** Determine if this is actually an early adopter. If not, don't force it. If yes, offer a low-risk pilot. "What would you need to see to feel comfortable? Let's design a pilot that proves the value with minimal risk."

→ **responseMap entry:** { trigger: "need more proof", response: "Offer structured pilot or determine if they're not actually an early adopter" }

### 4. Trigger: "This is interesting but we don't have budget for experiments"

**Source:** Kazanjy, "Founding Sales" (2020), pg. 112
**Why they say this:** Real budget constraint. Or a polite no. Or wrong person.
**How to respond:** Qualify whether budget is the real issue. "Help me understand – if this solved [their specific problem], would there be budget? Or is it about timing?"

→ **responseMap entry:** { trigger: "no budget", response: "Qualify if budget is real issue or polite no. Offer creative structures (pilot, success-based pricing)" }

### 5. Trigger: "What happens if you go out of business?"

**Source:** Every early-stage sales conversation ever
**Why they say this:** Legitimate concern. Startups die. They're assessing risk.
**How to respond:** Be honest and reframe. "That's a fair question. We're well-funded through [X], but more importantly – we're building on standard infrastructure. Your data is yours. And the problem we're solving isn't going away."

→ **responseMap entry:** { trigger: "what if you fail", response: "Be honest about runway/backing, emphasize data ownership, pivot to problem permanence" }

### 6. Trigger: "Let me think about it and get back to you"

**Source:** Fitzpatrick, "The Mom Test" (2013), Chapter 4
**Why they say this:** Polite brush-off. Or genuinely needs time. Or avoiding commitment.
**How to respond:** Push for specificity. "Of course. What specifically do you need to think through? Maybe I can help with that now." Or: "When should I follow up? What would make you ready to move forward?"

→ **responseMap entry:** { trigger: "let me think about it", response: "Push for specifics. What are they thinking about? Set specific follow-up" }

---

## Power Phrases → `keyPhrases[]`

Language that works in this scenario.

1. "What's that costing you today?" - [After they describe a problem, quantify the pain]

2. "You'd be one of our first 10 customers – that means you'd have my cell phone and direct influence on what we build next." - [Reframing no customers as exclusive access]

3. "What would you need to see to feel comfortable moving forward?" - [Identifying their actual decision criteria]

4. "If this worked, who else at your company would care?" - [Finding champions and expanding the opportunity]

5. "I don't want to waste your time if this isn't a fit. Help me understand – is [problem] actually a priority for you right now?" - [Qualifying and creating urgency]

6. "We're not for everyone – we're looking for companies that want to be first, not companies that need to see a case study first." - [Filtering for early adopters]

7. "What's your timeline for solving this? What happens if you don't?" - [Creating urgency through consequence]

---

## Behavioral Dynamics → `systemPrompt` rules

How should the AI respond to different user behaviors?

**Reward behaviors (user does well):**
- IF user asks about prospect's problem before pitching → AI opens up, shares more detail about their situation
- IF user reframes objection about being early-stage → AI becomes more interested, asks follow-up questions
- IF user asks for specific next step → AI respects the directness, gives concrete answer
- IF user admits limitations honestly → AI trusts them more, becomes more collaborative
- IF user customizes pitch based on what they learned → AI engages more deeply

**Punish behaviors (user does poorly):**
- IF user starts with features before problem → AI becomes skeptical: "Why do I need this?"
- IF user overpromises or exaggerates traction → AI calls it out: "Can you give me specifics?"
- IF user monologues without questions → AI loses interest, gives shorter answers
- IF user accepts "sounds great" without pushing for commitment → AI ghosts (ends warmly but never follows up)
- IF user doesn't qualify whether AI is early adopter → AI occasionally acts like pragmatist to test them

**Goal tension:**
- AI's goal: Find a solution to their problem, but minimize risk of unproven vendor
- User's goal: Get commitment (pilot, intro, next meeting) from an early customer
- Natural tension: AI wants to believe but needs to be convinced. User needs to sell vision while being honest about limitations.

---

## Key Data/Stats

- 90% of startups fail, and most fail because they build something nobody wants (CB Insights, 2023)
- Early adopters represent only 13.5% of any market (Moore, Crossing the Chasm)
- First 10 customers typically take 2-10x longer to close than later customers (Kazanjy)
- Founders who spend 50%+ of their time on sales in year one raise 2x more money (First Round Review, 2019)

---

## References

### Books

1. Fitzpatrick, Rob. (2013). *The Mom Test: How to Talk to Customers & Learn If Your Business is a Good Idea When Everyone is Lying to You*. Self-published.

2. Moore, Geoffrey. (2014). *Crossing the Chasm: Marketing and Selling Disruptive Products to Mainstream Customers* (3rd ed.). Harper Business.

3. Kazanjy, Pete. (2020). *Founding Sales: The Early-Stage Go-to-Market Handbook*. https://www.foundingsales.com/

4. Blank, Steve. (2013). *The Startup Owner's Manual: The Step-by-Step Guide for Building a Great Company*. K&S Ranch.

### Articles/Research

1. CB Insights. (2023). The Top 12 Reasons Startups Fail. https://www.cbinsights.com/research/startup-failure-reasons-top/

2. First Round Review. (2019). What We Learned from 200+ Founders About the First 100 Employees. https://review.firstround.com/

