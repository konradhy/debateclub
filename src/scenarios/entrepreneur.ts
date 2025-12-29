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
 * Grouped export for entrepreneur scenarios.
 */
export const EntrepreneurScenarios = {
  pitch: InvestorPitchScenario,
  "early-sales": EarlyCustomerSalesScenario,
};
