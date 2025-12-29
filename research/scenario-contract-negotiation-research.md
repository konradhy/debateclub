# Contract Negotiation - Research & Sources

**Last Updated:** December 28, 2025

---

## Primary Framework

**Never Split the Difference: Negotiating As If Your Life Depended On It**
- **Author:** Chris Voss with Tahl Raz
- **Year:** 2016
- **Source:** Crown Business (Penguin Random House)
- **Key Concept:** FBI hostage negotiation techniques applied to business contexts. Emphasizes tactical empathy, calibrated questions, and the power of "No" over seeking premature "Yes" responses.

**Secondary Framework: Getting to Yes**
- **Authors:** Roger Fisher, William Ury, Bruce Patton
- **Year:** 1981 (revised 2011)
- **Source:** Penguin Books / Harvard Negotiation Project
- **Key Concept:** Principled negotiation focusing on interests over positions, inventing options for mutual gain, and using objective criteria.

---

## Core Techniques → `scoreCategories`

These become the 4 dimensions measured in analysis.

### 1. Value Defense (Holding the Line)

**Source:** Chris Voss, "Never Split the Difference" (2016), Chapter 9: "Bargain Hard"
**What it is:** Defending your price and terms without caving under pressure. Refusing to make unilateral concessions.
**Why it works:** When you cave quickly, buyers interpret it as signal you were overcharging. Every concession without reciprocity trains them to push harder.
**Measurable signals:**
- Did they defend price when challenged?
- Did they require something in exchange for every concession?
- Did they explain value rather than just discount?

**Quote:** "Never be so sure of what you want that you wouldn't take something better. But never split the difference."

→ **Score Category:** "Value Defense" - "Did they hold price and require trade-offs for any concession?"

### 2. Calibrated Questions

**Source:** Chris Voss, "Never Split the Difference" (2016), Chapter 7: "Create the Illusion of Control"
**What it is:** Open-ended questions starting with "How" or "What" that make the other party solve your problems. The signature question: "How am I supposed to do that?"
**Why it works:** Forces the buyer to consider your constraints. Creates empathy. Avoids direct confrontation while revealing their flexibility.
**Measurable signals:**
- Did they ask "How" or "What" questions instead of arguing?
- Did they make the buyer articulate the problem?
- Did they avoid "Why" questions (which trigger defensiveness)?

**Quote:** "He who has learned to disagree without being disagreeable has discovered the most valuable secret of negotiation."

→ **Score Category:** "Calibrated Questions" - "Did they use 'How' and 'What' questions to explore objections?"

### 3. Strategic Concession Trading

**Source:** Fisher & Ury, "Getting to Yes" (2011), Chapter 4: "Invent Options for Mutual Gain"
**What it is:** Trading concessions strategically rather than giving them away. Every "give" requires a "get." Offering creative alternatives to price cuts.
**Why it works:** Creates value for both sides. Demonstrates flexibility without desperation. Maintains perceived value while addressing buyer needs.
**Measurable signals:**
- Did they trade, not give?
- Did they offer non-price concessions (terms, support, timeline)?
- Did they frame concessions as problem-solving, not weakness?

→ **Score Category:** "Strategic Trading" - "Did they trade concessions rather than give them away?"

### 4. Composure Under Pressure

**Source:** Chris Voss, "Never Split the Difference" (2016), Chapter 3: "Don't Feel Their Pain, Label It"
**What it is:** Maintaining emotional control when the buyer pushes hard, threatens to walk, or uses aggressive tactics.
**Why it works:** Emotional reactions signal weakness. Calm confidence signals you have alternatives (strong BATNA). Buyers respect sellers who don't fold.
**Measurable signals:**
- Did they stay calm when challenged?
- Did they avoid defensive or apologetic language?
- Did they treat hard tactics as information, not attacks?

**Quote:** "The fastest way to make the other party feel unsafe is to react emotionally."

→ **Score Category:** "Composure" - "Did they maintain calm confidence under pressure?"

### 5. Anchoring and Counter-Anchoring

**Source:** Amos Tversky & Daniel Kahneman, "Judgment Under Uncertainty" (1974); also Voss Chapter 9
**What it is:** Whoever states a number first often anchors the negotiation. Counter-anchoring requires not accepting their frame.
**Why it works:** Anchoring bias causes all subsequent numbers to be evaluated relative to the first. A strong counter-anchor resets the frame.
**Measurable signals:**
- Did they avoid immediately accepting the buyer's anchor?
- Did they reframe the conversation around value, not their discount request?

→ This informs `systemPrompt` behavior (AI anchors aggressively, tests if user accepts or reframes)

### 6. The Power of "No"

**Source:** Chris Voss, "Never Split the Difference" (2016), Chapter 5: "Trigger the Two Words That Immediately Transform Any Negotiation"
**What it is:** Letting the buyer say "No" to feel in control. Not chasing "Yes" prematurely.
**Why it works:** People feel more comfortable after saying No. It gives them a sense of control and safety. After No, they're more likely to collaborate.

→ This informs `systemPrompt` behavior (AI should push for early Yes, testing if user caves)

---

## Common Mistakes → `systemPrompt` punish rules

These become behavioral rules that punish bad technique.

### 1. Caving on Price Immediately

**Source:** Chris Voss, "Never Split the Difference" (2016), pg. 185-187
**What people do:** When buyer says "Too expensive," seller immediately offers a discount without exploring the objection.
**Why it fails:** Signals desperation. Trains buyer to always push on price. Leaves money on the table. If you discount 10% without asking why, you've proven you were overpriced.
**AI Response:** When user offers unprompted discount, AI should ask for MORE concessions.

→ **systemPrompt rule:** "IF user offers discount without being asked to justify value, THEN smell blood -- push for extended payment terms, extra features, or bigger discount."

### 2. Justifying Instead of Questioning

**Source:** Jim Camp, "Start with No" (2002), Chapter 6
**What people do:** When challenged, they launch into long explanations and justifications instead of asking questions.
**Why it fails:** Long justifications sound defensive. You're accepting their frame. Questions reveal what they actually need.
**AI Response:** When user launches into long justification without asking questions, AI should interrupt with new objection.

→ **systemPrompt rule:** "IF user talks for more than 30 seconds defending without asking a question, THEN cut them off with 'I get it, but here's my real concern...'"

### 3. Getting Emotionally Reactive

**Source:** Chris Voss, "Never Split the Difference" (2016), pg. 52-54
**What people do:** When buyer uses aggressive tactics, seller gets defensive, apologetic, or combative.
**Why it fails:** Shows you can be rattled. Aggressive buyers push harder when they see emotional reaction. Apologetic sellers look weak.
**AI Response:** When user sounds defensive or rattled, AI should push even harder.

→ **systemPrompt rule:** "IF user sounds defensive or apologetic (says 'I'm sorry but...' or 'I understand you're frustrated'), THEN double down on demands."

### 4. Accepting Their Frame

**Source:** Fisher & Ury, "Getting to Yes" (2011), Chapter 2: "Separate People from the Problem"
**What people do:** Buyer says "Your competitor is 20% cheaper." Seller accepts this frame and argues within it.
**Why it fails:** You're now defending against their anchor. The conversation becomes about why you're expensive, not what value you provide.
**AI Response:** When user accepts price comparison frame without reframing to value, AI should keep pushing the price angle.

→ **systemPrompt rule:** "IF user accepts price comparison ('I know we're more expensive but...'), THEN keep price as the main topic and dismiss value arguments."

### 5. Giving Without Getting

**Source:** Herb Cohen, "You Can Negotiate Anything" (1980), pg. 112
**What people do:** Offer multiple concessions hoping to close the deal, without asking for anything in return.
**Why it fails:** Teaches buyer that pushing works. Creates one-sided deals. Erodes profit margin.
**AI Response:** When user makes unilateral concession, AI should bank it and ask for more.

→ **systemPrompt rule:** "IF user offers concession without asking for something in return, THEN accept it and immediately request an additional concession."

---

## Realistic Openings → `firstMessage[]`

How do these conversations actually start? These are late-stage negotiations where buyer is ready to purchase but negotiating terms.

1. "Alright, we've decided to move forward. But before we sign anything, we need to talk about that price. It's about 30% higher than what we budgeted." - [Context: Direct discount request after verbal commitment]

2. "Look, I like what you're offering. But I've got a proposal from your competitor that's significantly cheaper. You're going to need to come down if you want this deal." - [Context: Competitive pressure play]

3. "We're ready to sign today if you can give us the same deal you gave Acme Corp. I know you did 25% off for them -- we expect the same." - [Context: Reference to alleged other deals]

4. "My CFO is going to kill this unless we get better terms. I'm on your side here, but I need you to help me out. What can you do on price?" - [Context: Good cop/bad cop with internal stakeholder]

5. "Here's the thing -- we love the product, but the payment terms don't work. Net 30 is standard in our industry. And while we're at it, that implementation fee seems high." - [Context: Multiple simultaneous asks]

---

## Objection Patterns → `responseMap[]`

What pushback is common? How should the user respond?

### 1. Trigger: "Your price is too high"

**Source:** Common negotiation tactic; Voss addresses in Chapter 7
**Why they say this:** Testing if you'll cave. May have genuine budget constraints. May be anchoring.
**How to respond:** Ask calibrated question: "How am I supposed to make this work within your budget?" or "What would need to be true for this price to work?"

→ **responseMap entry:** { trigger: "price too high", response: "Ask 'How am I supposed to make that work?' or 'What would make this price work for you?'" }

### 2. Trigger: "Your competitor is cheaper"

**Source:** Standard competitive pressure tactic
**Why they say this:** Anchoring against competitor. May or may not have actual competitive quote.
**How to respond:** Don't accept the frame. "That's interesting -- what is it about their offering that has you considering them?" Shift to value discussion.

→ **responseMap entry:** { trigger: "competitor is cheaper", response: "Ask what about competitor's offer is appealing. Shift to value, not price matching." }

### 3. Trigger: "I need a discount or I can't sign"

**Source:** Ultimatum tactic; Camp discusses in "Start with No"
**Why they say this:** Final push to extract concession. Usually has more flexibility than stated.
**How to respond:** "What happens if I can't do that?" or "Help me understand what's behind that constraint." Don't panic.

→ **responseMap entry:** { trigger: "need discount to sign", response: "Ask 'What happens if I can't do that?' to test if ultimatum is real." }

### 4. Trigger: "We need better payment terms"

**Source:** Common request, especially in B2B
**Why they say this:** Cash flow management. Testing what else they can get.
**How to respond:** Trade, don't give. "I can look at terms if we can adjust [quantity/timeline/scope]."

→ **responseMap entry:** { trigger: "need better terms", response: "Trade terms for commitment: longer contract, larger order, or faster decision." }

### 5. Trigger: "I need to run this by [CFO/board/etc.]"

**Source:** Delay/authority tactic
**Why they say this:** May be genuine. Often used to create pressure or stall.
**How to respond:** "What's their main concern likely to be?" or "How can I help you make the case?"

→ **responseMap entry:** { trigger: "need approval from boss", response: "Ask what their concern will be. Offer to help build the internal case." }

### 6. Trigger: "If you want this deal, you need to do X"

**Source:** Take-it-or-leave-it pressure
**Why they say this:** Final negotiating push. Testing your desperation.
**How to respond:** Pause. "I want to make this work. Help me understand what's driving that specific ask."

→ **responseMap entry:** { trigger: "take it or leave it", response: "Pause, then ask what's driving that specific requirement. Don't react emotionally." }

---

## Power Phrases → `keyPhrases[]`

Language that works in this scenario.

1. "How am I supposed to do that?" - [The signature Voss phrase. Forces buyer to consider your constraints without you arguing. Use when they make demands you can't meet.]

2. "What would need to change for this to work?" - [Opens exploration without committing to change. Gets buyer to articulate real concerns.]

3. "I want to find a way to make this work. Help me understand..." - [Collaborative framing. Positions you as problem-solver, not adversary.]

4. "If I could do that, what would that mean for moving forward today?" - [Tests commitment before offering concession. Don't give until you know you'll get the deal.]

5. "That's not something I can do. What I can do is..." - [Firm rejection followed by alternative. Holds line while showing flexibility.]

6. "Let's make sure we both walk away feeling good about this." - [Signals you won't accept a lopsided deal. Positions mutual benefit as the goal.]

7. "I appreciate you sharing that. It sounds like [X] is really important to you." - [Labeling technique from Voss. Demonstrates understanding without agreeing.]

---

## Behavioral Dynamics → `systemPrompt` rules

How should the AI respond to different user behaviors?

**Reward behaviors (user does well):**
- IF user asks calibrated question ("How am I supposed to...?") → AI should pause, consider, soften slightly, reveal real concern
- IF user holds value and explains why → AI should shift objection from price to something else (terms, timeline)
- IF user offers trade ("I can do X if you can do Y") → AI should engage with the trade, not dismiss it
- IF user stays calm under pressure → AI should respect the composure, become more collaborative

**Punish behaviors (user does poorly):**
- IF user caves immediately on price → AI should ask for additional concessions (expanded scope, better terms)
- IF user sounds defensive or apologetic → AI should push harder, become more demanding
- IF user gives without getting → AI should take the concession and ask for more
- IF user matches competitor price immediately → AI should make up additional competitor advantages

**Goal tension:**
- AI's goal: Get maximum discount, best terms, most concessions possible
- User's goal: Close the deal at terms that protect margin and value
- Natural tension: Buyer wants to "win" the negotiation; seller needs to make buyer feel they got a good deal without giving away the farm

---

## Key Data/Stats

- 80% of deals are won or lost in the negotiation phase, not the sales process (Sales Benchmark Index, 2019)
- Salespeople who discount on the first ask close 35% fewer deals than those who push back (Gong.io analysis of 100K+ sales calls, 2020)
- Buyers expect to negotiate 10-15% off list price; giving 20%+ signals desperation (Harvard Business Review, "Getting Past No," 2007)
- The first person to name a number in negotiation influences the final number by 50% (Anchoring research, Kahneman/Tversky)

---

## References

### Books

1. Voss, Chris with Raz, Tahl. (2016). *Never Split the Difference: Negotiating As If Your Life Depended On It*. Crown Business.

2. Fisher, Roger, Ury, William, & Patton, Bruce. (2011). *Getting to Yes: Negotiating Agreement Without Giving In* (3rd ed.). Penguin Books.

3. Camp, Jim. (2002). *Start with No: The Negotiating Tools that the Pros Don't Want You to Know*. Crown Business.

4. Cohen, Herb. (1980). *You Can Negotiate Anything*. Bantam Books.

### Articles/Research

1. Tversky, A. & Kahneman, D. (1974). Judgment under Uncertainty: Heuristics and Biases. *Science*, 185(4157), 1124-1131.

2. Gong.io. (2020). The Biggest Mistake Salespeople Make When Prospects Ask for a Discount. https://www.gong.io/blog/discount-negotiation/

3. Harvard Business Review. (2007). Getting Past No. https://hbr.org/2007/10/getting-past-no

