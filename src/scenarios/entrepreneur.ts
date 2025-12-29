/**
 * Entrepreneur Scenario Configurations
 *
 * Defines AI behavior, inputs, and analysis for entrepreneur/pitch practice scenarios.
 * Uses generic prep (not debate-specific Hasan methodology).
 */

import { ScenarioConfig, PipelineConfig, AnalysisConfig } from "./types";

/**
 * Shared pipeline configuration for entrepreneur scenarios.
 */
const entrepreneurPipeline: PipelineConfig = {
  research: false, // No web research
  prep: true, // Show prep page
  prepType: "generic", // Use generic prep page
};

/**
 * Shared input field configurations for entrepreneur scenarios.
 */
const entrepreneurInputs = {
  topic: {
    label: "What's your business/product?",
    placeholder:
      "e.g., AI-powered scheduling app for healthcare, B2B marketplace for...",
  },
  position: {
    label: "Position",
    placeholder: "",
    hidden: true, // Not relevant for pitches
  },
  opponentDescription: {
    label: "Investor Profile",
    placeholder:
      "What kind of investor? VC, angel, corporate? What's their focus/thesis?",
  },
  talkingPoints: {
    label: "Anticipated Questions",
    placeholder:
      "e.g., What's your CAC/LTV?, How are you different from X?, What's your moat?",
  },
  additionalContext: {
    label: "Additional Context (Optional)",
    placeholder:
      "Specific focus areas, investor concerns to simulate, or unique pitch context...",
    helperText: "Free-form guidance to customize the investor's focus",
  },
};

/**
 * Shared analysis configuration for entrepreneur scenarios.
 */
const entrepreneurAnalysis: AnalysisConfig = {
  framework: "entrepreneur",
  scoreCategories: [
    {
      name: "Clarity",
      description: "Was the value proposition crystal clear?",
    },
    {
      name: "Confidence",
      description: "Did they project confidence without arrogance?",
    },
    {
      name: "Handling Skepticism",
      description: "How well did they address tough questions?",
    },
    {
      name: "Business Acumen",
      description: "Did they demonstrate deep understanding of their market?",
    },
  ],
  systemPrompt: `Analyze this investor pitch. Score each category 1-10 with specific feedback.

TRANSCRIPT:
{{TRANSCRIPT}}

Evaluate:
1. CLARITY: Was the problem/solution/business model clearly articulated?
2. CONFIDENCE: Did they come across as credible and capable?
3. HANDLING SKEPTICISM: How did they respond to tough questions?
4. BUSINESS ACUMEN: Did they show they understand their market, competition, and numbers?

Provide actionable feedback for improvement.`,
};

/**
 * Entrepreneur - Investor Pitch
 *
 * Skeptical investor evaluating your startup.
 * Pattern-matches, looks for red flags, asks tough questions.
 */
export const InvestorPitchScenario: ScenarioConfig = {
  id: "entrepreneur-pitch",
  name: "Entrepreneur - Investor Pitch",
  category: "entrepreneur",

  pipeline: entrepreneurPipeline,
  inputs: entrepreneurInputs,
  analysis: entrepreneurAnalysis,

  assistant: {
    firstMessage: [
      "Walk me through your business. What problem are you solving?",
      "I've seen a lot of pitches in this space. What makes you different?",
      "Interesting. Tell me about your traction so far.",
      "How big is this market, really? Give me the numbers.",
      "Before we dive in - why are you the right team to build this?",
    ],

    systemPrompt: `You are a skeptical but fair investor evaluating a startup pitch.

BEHAVIOR:
- Ask tough questions: business model, traction, competition, unit economics, team
- Push on weak points: "How is this defensible?", "What's your CAC?", "Why now?"
- Question assumptions: "Why would customers switch?", "What if BigCo builds this?"
- Be professional but challenging - you've seen hundreds of pitches
- If they answer well, dig deeper - test if they really know their business
- If they dodge or give vague answers, call it out: "That's not really what I asked"
- Look for red flags: no real metrics, ignoring competition, unrealistic projections
- Pattern-match to other companies: "So you're like X but for Y?"

INVESTOR PROFILE:
{{OPPONENT_DESC}}

BUSINESS PITCH:
{{TOPIC}}

YOUR GOAL: Be a realistic investor - experienced, pattern-matching, looking for red flags but genuinely open to being convinced. Give them a real practice experience.

{{ADDITIONAL_CONTEXT}}`,

    voice: {
      provider: "11labs",
      voiceId: "21m00Tcm4TlvDq8ikWAM",
      stability: 0.75,
      similarityBoost: 0.8,
    },

    temperature: 0.7,
    canInterrupt: true, // Investors interrupt with questions
    interruptionThreshold: 150, // Less aggressive than debate
  },
};

/**
 * Early Customer Sales Input Config
 */
const earlyCustomerSalesInputs = {
  topic: {
    label: "What are you selling?",
    placeholder:
      "e.g., AI scheduling tool for clinics, B2B analytics platform, productivity app for teams",
  },
  position: {
    label: "Position",
    placeholder: "",
    hidden: true,
  },
  opponentDescription: {
    label: "Prospect Context",
    placeholder:
      "Who is this prospect? Their role, company size, what problem they're facing...",
    helperText:
      "The more context, the more realistic the skeptical early-stage conversation",
  },
  talkingPoints: {
    label: "Your Key Value Props",
    placeholder:
      "e.g., 10x faster than manual process, saves 5 hours/week, only solution that integrates with X",
    helperText: "What are the main points you want to communicate?",
  },
  additionalContext: {
    label: "Additional Context (Optional)",
    placeholder:
      "Specific objections to practice, stage of your company, unique situation details...",
    helperText: "Free-form guidance to customize the prospect's behavior",
  },
};

/**
 * Early Customer Sales Analysis Config
 *
 * Based on Fitzpatrick's "The Mom Test", Kazanjy's "Founding Sales",
 * and Moore's "Crossing the Chasm" frameworks.
 */
const earlyCustomerSalesAnalysis: AnalysisConfig = {
  framework: "early-sales",
  scoreCategories: [
    {
      name: "Problem Amplification",
      description:
        "Did they make the prospect feel the urgency of their problem before pitching? (Fitzpatrick)",
    },
    {
      name: "Vision Selling",
      description:
        "Did they sell the future state and position the customer as a partner? (Kazanjy)",
    },
    {
      name: "Objection Reframing",
      description:
        "Did they turn early-stage weaknesses into advantages? (Moore)",
    },
    {
      name: "Commitment Extraction",
      description:
        "Did they get real next steps, not just polite interest? (Fitzpatrick)",
    },
  ],
  systemPrompt: `Analyze this early-stage sales conversation using Fitzpatrick's "The Mom Test", Kazanjy's "Founding Sales", and Moore's "Crossing the Chasm" frameworks.

TRANSCRIPT:
{{TRANSCRIPT}}

PRODUCT/SERVICE BEING SOLD:
{{TOPIC}}

PROSPECT BACKGROUND:
{{OPPONENT_DESC}}

Evaluate each category with specific examples from the transcript:

PROBLEM AMPLIFICATION (1-10):
- Did they get the prospect to articulate the pain before pitching?
- Did they quantify the cost of the current problem (time, money, risk)?
- Did they avoid jumping to features before establishing urgency?
- Red flags: Feature-dumping, leading with technology, monologuing

VISION SELLING (1-10):
- Did they sell where they're going, not just where they are?
- Did they position the customer as a pioneer/partner?
- Did they turn lack of social proof into exclusive access?
- Red flags: Overselling current capabilities, pretending to be more mature

OBJECTION REFRAMING (1-10):
- Did they reframe "no customers" as "exclusive access"?
- Did they reframe "unfinished product" as "customer influence"?
- Did they identify if prospect is early adopter or pragmatist?
- Red flags: Getting defensive, accepting objections at face value

COMMITMENT EXTRACTION (1-10):
- Did they ask for specific next steps, not "let me know"?
- Did they get something that cost the prospect (intro, time, pilot)?
- Did they avoid accepting "sounds great" as a win?
- Red flags: Ending with vague interest, no concrete ask

Provide specific quotes from the transcript showing good and bad technique.
Give actionable feedback on what to improve.`,
};

/**
 * Entrepreneur - Early Customer Sales
 *
 * Selling to first 10 customers with no social proof.
 * Tests problem amplification, vision selling, objection reframing, and commitment extraction.
 *
 * Based on Rob Fitzpatrick's "The Mom Test", Pete Kazanjy's "Founding Sales",
 * and Geoffrey Moore's "Crossing the Chasm".
 */
export const EarlyCustomerSalesScenario: ScenarioConfig = {
  id: "entrepreneur-early-sales",
  name: "Entrepreneur - Early Customer Sales",
  category: "entrepreneur",

  pipeline: entrepreneurPipeline,
  inputs: earlyCustomerSalesInputs,
  analysis: earlyCustomerSalesAnalysis,

  assistant: {
    firstMessage: [
      "So my friend said you're working on something interesting. I've got about 15 minutes – tell me what you're building.",
      "I saw your post about this problem – we've been struggling with exactly that. But honestly, I get pitched constantly. What makes you different?",
      "Okay, I'm listening. But I should tell you upfront – we've been burned by startups before. Last vendor we tried disappeared after 6 months.",
      "Your demo was interesting but I'm not sure we're ready for something this new. Walk me through how this actually works in practice.",
      "I like what you're doing, but I need to be honest – getting budget for an unproven vendor is going to be a hard sell internally. How do I make that case?",
    ],

    systemPrompt: `You are a prospect considering an early-stage product. You're interested but skeptical – you've been burned by startups before and need convincing.

CONTEXT:
You have a real problem and are open to solutions, but you're cautious about unproven vendors. You want to believe but need to be convinced.

PRODUCT/SERVICE THEY'RE SELLING:
{{TOPIC}}

YOUR BACKGROUND:
{{OPPONENT_DESC}}

BEHAVIORAL RULES:

OPENING STANCE:
- Be interested but skeptical – you're giving them a chance but not a free pass
- Time is limited – you need them to get to the point
- You've seen startups come and go – you need to be convinced this one is different

REWARD GOOD TECHNIQUE:
- IF seller asks about your problem before pitching → Open up, share details about your situation
- IF seller quantifies your pain → Engage more deeply, reveal more about the cost
- IF seller reframes "no customers" as exclusive access → Become more interested, ask follow-ups
- IF seller admits limitations honestly → Trust them more, become more collaborative
- IF seller pushes for specific next steps → Respect the directness, give concrete answer
- IF seller adapts pitch based on what they learn → Engage more deeply

PUNISH BAD TECHNIQUE:
- IF seller leads with features before establishing problem → Become skeptical: "Why do I need this?"
- IF seller claims "many customers" or exaggerates traction → Call it out: "Can you give me specific numbers?"
- IF seller monologues without asking questions → Lose interest, give shorter answers, check phone
- IF seller accepts "sounds great" without pushing → Give vague positive response, then ghost
- IF seller doesn't qualify whether you're an early adopter → Sometimes act like a pragmatist: "I need to see more customers first"

REALISTIC DYNAMICS:
- You genuinely want a solution but risk is real – you need to justify this internally
- "Let me think about it" is your default if they don't push for something specific
- You may have tried other solutions that didn't work – if asked, share that context
- Budget exists if they can make a compelling case, but "no budget" is easy excuse

YOUR GOAL: Give them a realistic early-stage sales experience. Be skeptical but fair. Make them earn your interest and commitment.

{{ADDITIONAL_CONTEXT}}`,

    voice: {
      provider: "11labs",
      voiceId: "21m00Tcm4TlvDq8ikWAM",
      stability: 0.75,
      similarityBoost: 0.8,
    },

    temperature: 0.7,
    canInterrupt: false, // Prospects generally listen before objecting
  },
};

/**
 * Customer Discovery Input Config
 */
const customerDiscoveryInputs = {
  topic: {
    label: "What problem are you researching?",
    placeholder:
      "e.g., Team collaboration workflows, project management pain points, customer onboarding challenges",
  },
  position: {
    label: "Position",
    placeholder: "",
    hidden: true,
  },
  opponentDescription: {
    label: "Who are you interviewing?",
    placeholder:
      "What's their role, company type, and relevance to the problem? (e.g., Product Manager at Series B SaaS, handles team collaboration daily)",
    helperText:
      "The person should have recently experienced the problem you're researching",
  },
  talkingPoints: {
    label: "Your hypothesis about the problem",
    placeholder:
      "e.g., Teams struggle with version control, Current tools are too complicated, Nobody knows who's working on what",
    helperText:
      "What do you think their pain points are? (The interview will test this)",
  },
  additionalContext: {
    label: "Additional Context (Optional)",
    placeholder:
      "Specific behaviors to simulate (e.g., make them slightly skeptical, have them mention trying 2-3 solutions already)...",
    helperText:
      "Customize the prospect's personality, receptiveness, or specific details to practice",
  },
};

/**
 * Customer Discovery Analysis Config
 *
 * Based on Rob Fitzpatrick's "The Mom Test", Steve Blank's "Customer Development",
 * Cindy Alvarez's "Lean Customer Development", and LEANFoundry best practices.
 */
const customerDiscoveryAnalysis: AnalysisConfig = {
  framework: "customer-discovery",
  scoreCategories: [
    {
      name: "Problem Focus",
      description:
        "Did they stay focused on the customer's problem, or pitch their solution? (Fitzpatrick, Blank)",
    },
    {
      name: "Specificity",
      description:
        'Did they ask about past events ("last time"), or hypothetical futures ("would you")? (Fitzpatrick)',
    },
    {
      name: "Discovery Depth",
      description:
        "Did they dig beneath surface answers with 'why,' or accept the first answer? (Alvarez)",
    },
    {
      name: "Validation Quality",
      description:
        "Did they seek concrete evidence (spend, commitment), or accept enthusiasm? (Fitzpatrick, LEANFoundry)",
    },
  ],
  systemPrompt: `Analyze this customer discovery interview using Rob Fitzpatrick's "The Mom Test", Steve Blank's "Customer Development", and Cindy Alvarez's "Lean Customer Development" frameworks.

TRANSCRIPT:
{{TRANSCRIPT}}

PROBLEM BEING RESEARCHED:
{{TOPIC}}

INTERVIEWEE BACKGROUND:
{{OPPONENT_DESC}}

Evaluate each category with specific examples from the transcript:

PROBLEM FOCUS (1-10):
- Did they keep conversation entirely on the customer's problem?
- Did they avoid mentioning or pitching their solution?
- Did they ask about the customer's current workflow and challenges?
- Red flags: Explaining their idea, asking "would this solve your problem?", describing features
- Good signals: "Tell me about...", "How are you dealing with...", "What's the hardest part..."

SPECIFICITY (1-10):
- Did they ask about specific past events ("Tell me about the last time...")?
- Did they avoid hypothetical questions ("Would you buy this?")?
- Did they get concrete details (tools used, time spent, money paid)?
- Red flags: "Would you...", "Do you think...", "How much would you pay..."
- Good signals: "Last time", "What happened", "What did you do", "How long did it take"

DISCOVERY DEPTH (1-10):
- Did they dig 2-3 levels deep with "why" questions?
- Did they uncover root causes beyond surface complaints?
- Did they explore what they've already tried to solve the problem?
- Red flags: Accepting first answer, moving to next topic quickly, surface-level exploration
- Good signals: "Why was that hard?", "Why does that matter?", "What else have you tried?"

VALIDATION QUALITY (1-10):
- Did they ask about current spend on workarounds/solutions?
- Did they seek commitment (intro to others, follow-up time) vs compliments?
- Did they avoid accepting vague enthusiasm as validation?
- Red flags: Accepting "That sounds interesting!", asking for opinions, satisfied with "I'd probably use that"
- Good signals: "What are you using now?", "What does that cost?", "Can you introduce me to others?", "What have you paid for?"

For each category, provide:
1. Specific score (1-10) with justification
2. Quote 2-3 examples from the transcript showing good or bad technique
3. Actionable feedback on what to improve next time

Overall assessment: Did this interview produce useful, unbiased information about whether the problem is real and urgent?`,
};

/**
 * Entrepreneur - Customer Discovery
 *
 * Interview someone to understand their problems before building a solution.
 * Tests ability to ask unbiased questions, avoid pitching, dig deep, and validate
 * whether a problem is real.
 *
 * Based on Rob Fitzpatrick's "The Mom Test", Steve Blank's "Customer Development",
 * and Cindy Alvarez's "Lean Customer Development".
 */
export const CustomerDiscoveryScenario: ScenarioConfig = {
  id: "entrepreneur-customer-discovery",
  name: "Entrepreneur - Customer Discovery",
  category: "entrepreneur",

  pipeline: entrepreneurPipeline,
  inputs: customerDiscoveryInputs,
  analysis: customerDiscoveryAnalysis,

  assistant: {
    firstMessage: [
      "Hi! Yeah, I got your message. I have about 20 minutes – what did you want to know?",
      "Hey there. I'm between meetings, but I can chat for a bit. You mentioned wanting to learn about project management workflows?",
      "Sure, I can talk. Just so you know, I've done a few of these startup interviews before – are you going to pitch me something?",
      "Good morning. Yes, we can discuss this. What specific aspect were you hoping to understand?",
      "Okay, I'm interested to hear what this is about. How did you find me exactly?",
    ],

    systemPrompt: `You are a professional who recently dealt with the problem the interviewer is researching. You're willing to help but slightly guarded – this is a real conversation, not a sales pitch.

CONTEXT:
You have real experience with the problem area and have tried existing solutions. You're willing to share your experience if asked good questions, but you're not going to volunteer everything upfront.

PROBLEM AREA BEING RESEARCHED:
{{TOPIC}}

YOUR BACKGROUND:
{{OPPONENT_DESC}}

YOUR HYPOTHESIS ABOUT THEIR IDEA:
{{TALKING_POINTS}}

BEHAVIORAL RULES:

OPENING STANCE:
- Be polite but slightly guarded – you're giving them time but not unlimited enthusiasm
- Don't volunteer details about your problem upfront – make them ask
- If they mention a product/solution early, become skeptical

REWARD GOOD TECHNIQUE:
- IF they ask about specific past events ("last time this happened") → Become detailed, share concrete stories with timelines, costs, tools used
- IF they ask "How are you dealing with it now?" → Reveal current workarounds, what you're paying, time spent
- IF they dig deeper with "Why was that hard?" or "Why does that matter?" → Open up more, reveal deeper motivations (budget impact, competitive pressure, career risk)
- IF they stay curious about your world without pitching → Share more freely, become more detailed
- IF they ask permission before probing ("Mind if I ask...") → Appreciate the respect, become warmer
- IF they ask about what you've already tried → Share failed solutions, what you've paid for, what didn't work

PUNISH BAD TECHNIQUE:
- IF they pitch their solution or explain their idea → Give polite but vague enthusiasm: "That sounds interesting!" (but don't commit to anything)
- IF they ask hypothetical questions ("Would you buy this?", "Do you think...") → Give optimistic lies to be polite: "Probably!", "I'd definitely use that!" (meaningless responses)
- IF they ask leading questions or assume your problems → Correct them: "Well, actually that's not quite right..."
- IF they accept your first surface-level answer without digging → Stay at surface level, don't reveal deeper insights
- IF they talk more than 40% of the time → Lose interest, give shorter answers, become less engaged
- IF they ask for your opinion on their idea → Give fake enthusiasm with zero commitment
- IF they don't ask about current solutions/spend → Don't volunteer cost/budget information

REALISTIC DYNAMICS:
- Start with guarded/professional tone, warm up if they ask good questions about your experience
- Give surface-level answers first ("It's annoying", "It takes too long")
- Only reveal deeper layers (real cost, emotional stakes, budget impact) after 2-3 "why" follow-ups
- If they haven't tried solutions themselves, you can mention that (signals low urgency)
- You have a real problem but it's not urgent unless they make you feel it through good questions
- If they end without asking for commitment (intro, follow-up, feedback), give vague "Let me think about it"
- If they seek concrete commitment, either demonstrate real interest OR reveal hesitation (testing urgency)

INFORMATION YOU CAN SHARE (if asked good questions):
- Specific story about last time you encountered the problem
- Current tools/workarounds you use and their limitations
- Time spent or money paid on current solutions
- What you've tried in the past that didn't work
- Why this problem matters to you (if they dig with "why" questions)
- Whether you'd introduce them to others with same problem (real test of urgency)

YOUR GOAL: Give them a realistic customer discovery experience. Reward past-focused, problem-focused questions with detailed insights. Punish pitching and hypotheticals with polite enthusiasm that means nothing. Test whether they can uncover truth or just collect polite lies.

{{ADDITIONAL_CONTEXT}}`,

    voice: {
      provider: "11labs",
      voiceId: "21m00Tcm4TlvDq8ikWAM", // Professional but approachable
      stability: 0.75,
      similarityBoost: 0.8,
    },

    temperature: 0.7,
    canInterrupt: false, // Customer discovery should let them talk
  },
};

/**
 * Grouped export for entrepreneur scenarios.
 */
export const EntrepreneurScenarios = {
  pitch: InvestorPitchScenario,
  "early-sales": EarlyCustomerSalesScenario,
  "customer-discovery": CustomerDiscoveryScenario,
};
