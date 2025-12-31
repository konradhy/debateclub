"use node";

/**
 * Generic Prep Generation Action
 *
 * Generates prep materials for non-debate scenarios (sales, entrepreneur, etc.).
 * Creates talking points, opening/closing approaches, key phrases, and response maps.
 */

import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import { callOpenRouterForPrep } from "../lib/openrouterWithCosts";
import { AI_MODELS } from "../lib/aiConfig";

const SITE_URL = "https://orator.app";

/**
 * System prompt for generating generic prep materials.
 * Takes scenario context and generates structured prep content.
 */
const GENERIC_PREP_PROMPT = `You are a communication coach helping someone prepare for an important conversation.

CONTEXT:
- Scenario Type: {{SCENARIO_TYPE}}
- Topic/Goal: {{TOPIC}}
- Other Party: {{OPPONENT_DESC}}

Generate practical preparation materials in JSON format:

{
  "openingApproach": "A 2-3 sentence opening that establishes rapport and states purpose clearly. Make it specific to this scenario.",
  
  "talkingPoints": [
    "Key point 1 - specific and actionable",
    "Key point 2 - specific and actionable",
    "Key point 3 - specific and actionable",
    "Key point 4 - specific and actionable",
    "Key point 5 - specific and actionable"
  ],
  
  "keyPhrases": [
    "Power phrase 1 - language that builds credibility",
    "Power phrase 2 - language that handles objections",
    "Power phrase 3 - language that creates urgency",
    "Transition phrase - moves conversation forward",
    "Closing phrase - asks for commitment"
  ],
  
  "responseMap": [
    {
      "trigger": "Common objection or pushback 1",
      "response": "How to address it effectively"
    },
    {
      "trigger": "Common objection or pushback 2", 
      "response": "How to address it effectively"
    },
    {
      "trigger": "Common objection or pushback 3",
      "response": "How to address it effectively"
    },
    {
      "trigger": "Skeptical question they might ask",
      "response": "Confident, specific answer"
    }
  ],
  
  "closingApproach": "A 2-3 sentence closing that summarizes value and includes a clear call to action. Make it specific to this scenario."
}

GUIDELINES:
- Be specific to the scenario, not generic advice
- Use language appropriate for the context (sales vs pitch vs healthcare)
- Include realistic objections for this type of conversation
- Keep phrases memorable and easy to use in the moment
- Focus on practical, actionable content

Return ONLY valid JSON, no markdown or explanation.`;

/**
 * Generate prep materials for a generic (non-debate) scenario.
 */
export const generate = action({
  args: {
    opponentId: v.id("opponents"),
    scenarioType: v.string(),
    topic: v.string(),
    opponentDescription: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY is not set");
    }

    // Get opponent data to access userId for cost tracking
    const opponent = await ctx.runQuery(internal.opponents.getInternal, {
      opponentId: args.opponentId,
    });

    if (!opponent) {
      throw new Error("Opponent not found");
    }

    // Build the prompt with context
    const prompt = GENERIC_PREP_PROMPT.replace(
      "{{SCENARIO_TYPE}}",
      args.scenarioType,
    )
      .replace("{{TOPIC}}", args.topic)
      .replace(
        "{{OPPONENT_DESC}}",
        args.opponentDescription || "Not specified",
      );

    try {
      const response = await callOpenRouterForPrep(
        ctx,
        opponent.userId,
        args.opponentId,
        apiKey,
        [{ role: "system", content: prompt }],
        SITE_URL,
        3,
        AI_MODELS.PREP_GENERATION,
      );

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error("No content generated - API call failed");
      }

      // Parse the JSON response
      let prepData;
      try {
        prepData = JSON.parse(content);
      } catch (e) {
        console.error(
          "[genericPrep] Failed to parse JSON:",
          content.substring(0, 500),
        );
        throw new Error("Failed to parse generated prep materials - malformed JSON response");
      }

      // Generate unique id helper
      const genId = () =>
        `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Transform to objects with ids
      const talkingPoints = (prepData.talkingPoints || []).map(
        (content: string) => ({
          id: genId(),
          content,
        }),
      );

      const keyPhrases = (prepData.keyPhrases || []).map((phrase: string) => ({
        id: genId(),
        phrase,
      }));

      const responseMap = (prepData.responseMap || []).map(
        (item: { trigger: string; response: string }) => ({
          id: genId(),
          trigger: item.trigger,
          response: item.response,
        }),
      );

      // Save to database
      await ctx.runMutation(internal.opponents.updateGenericPrepInternal, {
        opponentId: args.opponentId,
        talkingPoints,
        openingApproach: prepData.openingApproach || "",
        keyPhrases,
        responseMap,
        closingApproach: prepData.closingApproach || "",
      });

      return null;
    } catch (error) {
      console.error("[genericPrep] Error generating prep:", error);
      throw error;
    }
  },
});
