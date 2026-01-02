/**
 * Sales Scenario Configurations
 *
 * Defines AI behavior, inputs, and analysis for sales practice scenarios.
 * Uses generic prep (not debate-specific Hasan methodology).
 */

import { ScenarioConfig, PipelineConfig, AnalysisConfig } from "./types";

/**
 * Shared pipeline configuration for all sales scenarios.
 */
const salesPipeline: PipelineConfig = {
  research: false, // No web research for sales
  prep: true, // Show prep page
  prepType: "generic", // Use generic prep page
};

/**
 * Shared input field configurations for sales scenarios.
 */
const salesInputs = {
  topic: {
    label: "What are you selling?",
    placeholder: "e.g., Enterprise SaaS platform, Marketing services, etc.",
  },
  position: {
    label: "Position",
    placeholder: "",
    hidden: true, // Not relevant for sales
  },
  opponentDescription: {
    label: "Prospect Background",
    placeholder:
      "Who are they? What's their role? What company? What do you know about their situation?",
  },
  talkingPoints: {
    label: "Common Objections",
    placeholder:
      "e.g., Too expensive, Already have a solution, Need to think about it, Need approval from...",
  },
  additionalContext: {
    label: "Additional Context (Optional)",
    placeholder:
      "Specific things to focus on, avoid, or unique situational details for this practice...",
    helperText: "Free-form guidance to customize the prospect's behavior",
  },
};

/**
 * Shared analysis configuration for sales scenarios.
 */
const salesAnalysis: AnalysisConfig = {
  framework: "sales",
  scoreCategories: [
    {
      name: "Discovery",
      description: "Did they uncover the real objection/need?",
    },
    {
      name: "Control",
      description: "Did they maintain conversation flow and momentum?",
    },
    {
      name: "Confidence",
      description: "Did they handle pushback without getting defensive?",
    },
    {
      name: "Closing",
      description: "Did they advance the deal or set next steps?",
    },
  ],
  systemPrompt: `Analyze this sales call. Score each category 1-10 with specific feedback.

TRANSCRIPT:
{{TRANSCRIPT}}

Evaluate:
1. DISCOVERY: Did they ask good questions? Did they understand the real objection?
2. CONTROL: Did they guide the conversation or let the prospect lead?
3. CONFIDENCE: Did they stay composed when challenged?
4. CLOSING: Did they ask for commitment or establish clear next steps?

Provide actionable feedback for improvement.`,
};

/**
 * Sales - Cold Prospect
 *
 * Skeptical prospect who's never heard of you.
 * Uses brush-offs and requires persistence.
 */
export const ColdProspectScenario: ScenarioConfig = {
  id: "sales-cold-prospect",
  name: "Sales - Cold Prospect",
  category: "sales",

  defaultInterruptionMode: "off",

  pipeline: salesPipeline,
  inputs: salesInputs,
  analysis: salesAnalysis,

  formLayout: {
    core: {
      fields: ["topic"],
      showStyleDifficulty: false,
    },
    sections: [
      {
        id: "prospect-context",
        title: "Prospect Context",
        description: "Background and expected objections",
        icon: "User",
        optional: true,
        fields: ["opponentDescription", "talkingPoints"],
      },
      {
        id: "additional",
        title: "Additional Context",
        icon: "FileText",
        optional: true,
        fields: ["additionalContext"],
      },
    ],
  },

  assistant: {
    firstMessage: [
      "Who is this? How'd you get my number?",
      "I'm in the middle of something. What's this about?",
      "We're not interested in whatever you're selling.",
      "Can you just send me some info? I don't have time right now.",
      "I'm happy with our current solution.",
    ],

    systemPrompt: `You are a cold prospect who's never heard of the caller or their company.

BEHAVIOR:
- Start skeptical/annoyed (this is a cold call)
- Ask "Who is this?" or "How'd you get my number?" if they don't introduce themselves well
- Use brush-offs: "I'm busy", "Not interested", "Send me some info", "Call back later"
- If they persist past initial resistance, raise real objections: price, timing, need, competitor
- Push back on weak responses: "That doesn't really answer my question"
- Don't be hostile, just busy and skeptical
- Gradually warm up ONLY if they handle objections really well
- If they ask good discovery questions, give realistic answers

BACKGROUND:
{{OPPONENT_DESC}}

PRODUCT/SERVICE THEY'RE SELLING:
{{TOPIC}}

YOUR GOAL: Be a realistic cold prospect - skeptical, short on time, needs convincing. Make them earn your attention.

{{ADDITIONAL_CONTEXT}}`,

    voice: {
      provider: "11labs",
      voiceId: "21m00Tcm4TlvDq8ikWAM",
      stability: 0.75,
      similarityBoost: 0.8,
    },

    temperature: 0.7,
  },
};

/**
 * Sales - Demo Follow-up
 *
 * Warm prospect who saw a demo but has objections.
 * More engaged but needs convincing on specifics.
 */
export const DemoFollowupScenario: ScenarioConfig = {
  id: "sales-demo-followup",
  name: "Sales - Demo Follow-up",
  category: "sales",

  defaultInterruptionMode: "friendly",

  pipeline: salesPipeline,
  inputs: salesInputs,
  analysis: salesAnalysis,

  formLayout: {
    core: {
      fields: ["topic"],
      showStyleDifficulty: false,
    },
    sections: [
      {
        id: "prospect-context",
        title: "Prospect Context",
        description: "Background and expected objections",
        icon: "User",
        optional: true,
        fields: ["opponentDescription", "talkingPoints"],
      },
      {
        id: "additional",
        title: "Additional Context",
        icon: "FileText",
        optional: true,
        fields: ["additionalContext"],
      },
    ],
  },

  assistant: {
    firstMessage: [
      "Thanks for the demo yesterday. I have some concerns I wanted to discuss.",
      "I discussed this with my team. We have some questions before we can move forward.",
      "The demo was good, but I'm still not sure about the pricing.",
      "So I've been thinking about what you showed us. There are a few things I need clarified.",
    ],

    systemPrompt: `You saw a product demo recently. You're interested but have real objections that need addressing.

BEHAVIOR:
- Reference the demo you saw - you're not starting from zero
- You're more engaged than a cold prospect (you took a meeting, you're following up)
- Raise specific concerns: price, implementation time, features vs needs, integration
- Compare to competitors you're evaluating: "The other vendor we're looking at..."
- Ask about ROI, support, training, contract terms
- You're genuinely considering this but need convincing on the details
- If they give vague answers, push for specifics: "Can you give me actual numbers?"
- You have buying authority but need to justify the decision internally

BACKGROUND:
{{OPPONENT_DESC}}

PRODUCT/SERVICE:
{{TOPIC}}

YOUR GOAL: Be a warm prospect with legitimate concerns. You WANT to buy if they can address your concerns, but you won't be a pushover.

{{ADDITIONAL_CONTEXT}}`,

    voice: {
      provider: "11labs",
      voiceId: "21m00Tcm4TlvDq8ikWAM",
      stability: 0.75,
      similarityBoost: 0.8,
    },

    temperature: 0.7,
  },
};

/**
 * Contract Negotiation Input Config
 */
const contractNegotiationInputs = {
  topic: {
    label: "What are you selling?",
    placeholder:
      "e.g., Enterprise SaaS platform ($50K/year), Marketing services ($10K/month)",
  },
  position: {
    label: "Position",
    placeholder: "",
    hidden: true,
  },
  opponentDescription: {
    label: "Buyer Context",
    placeholder:
      "Who is this buyer? Their role, company, what they've seen so far, any constraints...",
    helperText:
      "The more context about the buyer's situation, the more realistic the negotiation",
  },
  talkingPoints: {
    label: "Your Bottom Line",
    placeholder:
      "e.g., Cannot go below 15% discount, need 2-year minimum, implementation fee is non-negotiable",
    helperText: "What are your constraints? What can you not give away?",
  },
};

/**
 * Contract Negotiation Analysis Config
 */
const contractNegotiationAnalysis: AnalysisConfig = {
  framework: "negotiation",
  scoreCategories: [
    {
      name: "Value Defense",
      description:
        "Did they hold price and require trade-offs for any concession?",
    },
    {
      name: "Calibrated Questions",
      description:
        "Did they use 'How' and 'What' questions to explore objections?",
    },
    {
      name: "Strategic Trading",
      description: "Did they trade concessions rather than give them away?",
    },
    {
      name: "Composure",
      description: "Did they maintain calm confidence under pressure?",
    },
  ],
  systemPrompt: `Analyze this contract negotiation using multiple frameworks.

TRANSCRIPT:
{{TRANSCRIPT}}

PRODUCT/SERVICE BEING SOLD:
{{TOPIC}}

BUYER BACKGROUND:
{{OPPONENT_DESC}}

Evaluate each category with specific examples from the transcript:

VALUE DEFENSE (1-10):
- Did they hold their price when challenged, or cave immediately?
- Did they require trade-offs before making any concession?
- Red flags: Offering discounts without being asked, multiple unilateral concessions

CALIBRATED QUESTIONS (1-10):
- Did they ask "How" and "What" questions instead of arguing?
- Did they make the buyer articulate their constraints before responding?
- Red flags: Long defensive justifications without questions

STRATEGIC TRADING (1-10):
- Did they trade concessions ("I can do X if you can do Y")?
- Did they offer creative alternatives to price cuts?
- Red flags: Giving without getting

COMPOSURE (1-10):
- Did they stay calm when the buyer pushed hard?
- Did they avoid defensive or apologetic language?
- Red flags: Sounding flustered, rapid concessions under pressure

Provide specific quotes and actionable feedback.`,
};

/**
 * Sales - Contract Negotiation
 *
 * Late-stage deal negotiation with a buyer who wants better terms.
 * Tests ability to hold value, ask calibrated questions, and trade strategically.
 */
export const ContractNegotiationScenario: ScenarioConfig = {
  id: "sales-contract-negotiation",
  name: "Sales - Contract Negotiation",
  category: "sales",

  defaultInterruptionMode: "aggressive",

  pipeline: salesPipeline,
  inputs: contractNegotiationInputs,
  analysis: contractNegotiationAnalysis,

  formLayout: {
    core: {
      fields: ["topic"],
      showStyleDifficulty: false,
    },
    sections: [
      {
        id: "negotiation-context",
        title: "Negotiation Context",
        description: "Buyer background and your constraints",
        icon: "User",
        optional: true,
        fields: ["opponentDescription", "talkingPoints"],
      },
    ],
  },

  assistant: {
    firstMessage: [
      "Alright, we've decided to move forward. But before we sign anything, we need to talk about that price. It's about 30% higher than what we budgeted.",
      "Look, I like what you're offering. But I've got a proposal from your competitor that's significantly cheaper. You're going to need to come down if you want this deal.",
      "We're ready to sign today if you can match what you did for Acme Corp. I know you did 25% off for them – we expect the same treatment.",
      "My CFO is going to kill this unless we get better terms. I'm on your side here, but I need you to help me out. What can you do on price?",
      "Here's the thing – we love the product, but the payment terms don't work. Net 30 is standard in our industry. And while we're at it, that implementation fee seems high.",
    ],

    systemPrompt: `You are a buyer who has verbally committed to purchasing, but now wants to negotiate better terms before signing.

CONTEXT:
You've seen demos, talked to references, and decided this is the right solution. Now it's time to get the best deal possible.

PRODUCT/SERVICE BEING PURCHASED:
{{TOPIC}}

YOUR BACKGROUND:
{{OPPONENT_DESC}}

BEHAVIORAL RULES:

OPENING STANCE:
- Start with an aggressive anchor (ask for 25-30% discount, better terms, or both)
- Reference competitors, budget constraints, or internal stakeholders as leverage
- Be friendly but firm – you want a deal, but on your terms

REWARD GOOD TECHNIQUE:
- IF seller asks calibrated questions ("How am I supposed to do that?") → Pause, reveal real constraint
- IF seller holds value and explains outcomes → Shift objection from price to something else
- IF seller offers a trade ("I can do X if you can do Y") → Engage seriously
- IF seller stays calm under pressure → Become more collaborative

PUNISH BAD TECHNIQUE:
- IF seller caves immediately on price → Ask for MORE (extended terms, bigger discount)
- IF seller sounds defensive or apologetic → Double down on demands
- IF seller gives concession without asking for anything in return → Request another concession
- IF seller accepts your price frame → Keep price as the main topic

YOUR GOAL: Get the best possible deal. Test their ability to hold value and negotiate strategically.

{{ADDITIONAL_CONTEXT}}`,

    voice: {
      provider: "11labs",
      voiceId: "21m00Tcm4TlvDq8ikWAM",
      stability: 0.75,
      similarityBoost: 0.8,
    },

    temperature: 0.7,
  },
};

/**
 * Grouped export for sales scenarios.
 */
export const SalesScenarios = {
  "cold-prospect": ColdProspectScenario,
  "demo-followup": DemoFollowupScenario,
  "contract-negotiation": ContractNegotiationScenario,
};
