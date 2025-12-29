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

  pipeline: salesPipeline,
  inputs: salesInputs,
  analysis: salesAnalysis,

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
    canInterrupt: false, // Prospects don't typically interrupt
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

  pipeline: salesPipeline,
  inputs: salesInputs,
  analysis: salesAnalysis,

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
    canInterrupt: false,
  },
};

/**
 * Grouped export for sales scenarios.
 */
export const SalesScenarios = {
  "cold-prospect": ColdProspectScenario,
  "demo-followup": DemoFollowupScenario,
};
