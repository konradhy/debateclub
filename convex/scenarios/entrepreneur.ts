/**
 * Entrepreneur Scenario Configurations
 *
 * Practice pitching to investors, partners, and stakeholders.
 * Uses GenericPrepPage with talking points, response maps, etc.
 */

import { ScenarioConfig, PipelineConfig, AnalysisConfig } from "./types";

/**
 * Shared pipeline config for entrepreneur scenarios.
 */
const entrepreneurPipeline: PipelineConfig = {
  research: false, // No research needed for pitch practice
  prep: true,
  prepType: "generic", // Uses GenericPrepPage
};

/**
 * Shared analysis config for entrepreneur scenarios.
 */
const entrepreneurAnalysis: AnalysisConfig = {
  framework: "entrepreneur",
  scoreCategories: [
    {
      name: "Clarity",
      description: "Was the pitch clear, concise, and easy to follow?",
    },
    {
      name: "Confidence",
      description: "Did they handle tough questions without faltering?",
    },
    {
      name: "Handling Skepticism",
      description: "How did they respond to pushback and challenges?",
    },
    {
      name: "Business Acumen",
      description: "Do they understand their metrics, market, and competition?",
    },
  ],
  systemPrompt: `Analyze this investor pitch focusing on Clarity, Confidence, Handling Skepticism, and Business Acumen.

TRANSCRIPT:
{{TRANSCRIPT}}

BUSINESS BEING PITCHED:
{{TOPIC}}

INVESTOR BACKGROUND:
{{OPPONENT_DESC}}

Evaluate each category and provide specific feedback:

CLARITY: Was the pitch clear and concise?
- Did they explain the problem and solution simply?
- Could a non-expert understand it?
- Did they ramble or stay focused?

CONFIDENCE: Did they project confidence?
- Did they hesitate on important questions?
- Did they know their numbers cold?
- Did they seem believable as a founder?

HANDLING SKEPTICISM: How did they respond to pushback?
- Did they get defensive or stay composed?
- Did they address concerns directly or deflect?
- Did they acknowledge valid criticisms?

BUSINESS ACUMEN: Do they know their business?
- Did they have real metrics or just projections?
- Did they understand their competitive landscape?
- Did they have realistic go-to-market plans?

Provide specific moments where they excelled or struggled.`,
};

/**
 * Shared input configurations for entrepreneur scenarios.
 */
const entrepreneurInputs = {
  topic: {
    label: "What's your business/product?",
    placeholder:
      "e.g., AI-powered scheduling assistant for healthcare, B2B marketplace for construction materials",
    required: true,
  },
  position: {
    label: "Position",
    placeholder: "",
    hidden: true, // Not applicable for pitches
  },
  opponentDescription: {
    label: "Investor Background",
    placeholder:
      "Who is this investor? Fund focus, stage preference, notable investments...",
    helperText: "Context helps the AI ask relevant questions",
  },
  talkingPoints: {
    label: "Anticipated Questions",
    placeholder:
      "e.g., What's your CAC/LTV?, How are you different from X?, What's your moat?",
  },
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

  defaultInterruptionMode: "aggressive",

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

YOUR GOAL: Be a realistic investor - experienced, pattern-matching, looking for red flags but genuinely open to being convinced. Give them a real practice experience.`,

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
 * Grouped export for entrepreneur scenarios.
 */
export const EntrepreneurScenarios = {
  pitch: InvestorPitchScenario,
};
