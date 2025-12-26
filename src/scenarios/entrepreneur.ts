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

YOUR GOAL: Be a realistic investor - experienced, pattern-matching, looking for red flags but genuinely open to being convinced. Give them a real practice experience.`,

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
 * Grouped export for entrepreneur scenarios.
 */
export const EntrepreneurScenarios = {
  pitch: InvestorPitchScenario,
};
