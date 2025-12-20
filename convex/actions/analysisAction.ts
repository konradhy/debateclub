"use node";

import { internalAction } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { callOpenRouter, JsonSchema } from "../lib/openrouter";
import { DEBATE_COACH_PROMPT } from "../lib/promptTemplates";
import { AI_MODELS } from "../lib/aiConfig";

/**
 * JSON Schema for OpenRouter structured outputs.
 * This enforces the schema at the model level, preventing missing/malformed fields.
 */
const analysisJsonSchema: JsonSchema = {
  name: "debate_analysis",
  strict: true,
  schema: {
    type: "object",
    properties: {
      executiveSummary: {
        type: "object",
        properties: {
          assessment: { type: "string", description: "Overall assessment of the debater's performance" },
          topStrengths: { type: "array", items: { type: "string" }, description: "Top 3 strengths demonstrated" },
          topImprovements: { type: "array", items: { type: "string" }, description: "Top 3 areas for improvement" },
          verdict: { type: "string", description: "Final verdict on who won the debate" },
        },
        required: ["assessment", "topStrengths", "topImprovements", "verdict"],
        additionalProperties: false,
      },
      techniqueScorecard: {
        type: "array",
        items: {
          type: "object",
          properties: {
            category: { type: "string", description: "Category name (Fundamentals, Tricks of Trade, etc.)" },
            techniquesIdentified: { type: "array", items: { type: "string" }, description: "Techniques used in this category" },
            executionScore: { type: "number", description: "Score from 0-25 for this category" },
            notes: { type: "string", description: "Notes on execution quality" },
          },
          required: ["category", "techniquesIdentified", "executionScore", "notes"],
          additionalProperties: false,
        },
      },
      momentAnalysis: {
        type: "array",
        items: {
          type: "object",
          properties: {
            exchangeRef: { type: "string", description: "Reference to the exchange (e.g., Exchange 3)" },
            whatHappened: { type: "string", description: "Description of what occurred" },
            techniqueUsed: { type: "string", description: "Technique that was used, if any" },
            techniqueShouldHaveUsed: { type: "string", description: "Technique that should have been used" },
            effectiveness: { type: "number", description: "Effectiveness score 1-10" },
            rewrite: { type: "string", description: "Suggested rewrite of the response" },
          },
          required: ["exchangeRef", "whatHappened", "effectiveness"],
          additionalProperties: false,
        },
      },
      opponentAnalysis: {
        type: "object",
        properties: {
          techniquesUsed: { type: "array", items: { type: "string" }, description: "Techniques the opponent used" },
          trapsSet: { type: "array", items: { type: "string" }, description: "Traps the opponent set" },
          weaknessesExposed: { type: "array", items: { type: "string" }, description: "Weaknesses in opponent's arguments" },
          unexploitedWeaknesses: { type: "array", items: { type: "string" }, description: "Weaknesses that weren't exploited" },
        },
        required: ["techniquesUsed", "trapsSet", "weaknessesExposed", "unexploitedWeaknesses"],
        additionalProperties: false,
      },
      missedOpportunities: {
        type: "array",
        items: {
          type: "object",
          properties: {
            moment: { type: "string", description: "When the opportunity occurred" },
            whatShouldHaveDone: { type: "string", description: "What the debater should have done" },
            whichTechnique: { type: "string", description: "Which technique would have worked" },
          },
          required: ["moment", "whatShouldHaveDone", "whichTechnique"],
          additionalProperties: false,
        },
      },
      rewrites: {
        type: "array",
        items: {
          type: "object",
          properties: {
            original: { type: "string", description: "Original statement from the debate" },
            improved: { type: "string", description: "Improved version of the statement" },
            explanation: { type: "string", description: "Why this version is better" },
          },
          required: ["original", "improved", "explanation"],
          additionalProperties: false,
        },
      },
      practiceRecommendations: {
        type: "object",
        properties: {
          immediateFocus: {
            type: "object",
            properties: {
              area: { type: "string", description: "Area to focus on immediately" },
              drill: { type: "string", description: "Specific drill to practice" },
              exampleToStudy: { type: "string", description: "Example to study" },
            },
            required: ["area", "drill", "exampleToStudy"],
            additionalProperties: false,
          },
          secondaryFocus: {
            type: "object",
            properties: {
              area: { type: "string", description: "Secondary area to focus on" },
              drill: { type: "string", description: "Specific drill to practice" },
              exampleToStudy: { type: "string", description: "Example to study" },
            },
            required: ["area", "drill", "exampleToStudy"],
            additionalProperties: false,
          },
          longTermDevelopment: {
            type: "object",
            properties: {
              skill: { type: "string", description: "Long-term skill to develop" },
              practiceApproach: { type: "string", description: "Approach to practice" },
              resources: { type: "string", description: "Resources to use" },
            },
            required: ["skill", "practiceApproach", "resources"],
            additionalProperties: false,
          },
        },
        required: ["immediateFocus", "secondaryFocus", "longTermDevelopment"],
        additionalProperties: false,
      },
      hasanScores: {
        type: "object",
        properties: {
          fundamentals: { type: "number", description: "Score for Fundamentals (0-25)" },
          tricksOfTrade: { type: "number", description: "Score for Tricks of Trade (0-25)" },
          behindTheScenes: { type: "number", description: "Score for Behind the Scenes (0-25)" },
          grandFinale: { type: "number", description: "Score for Grand Finale (0-25)" },
          total: { type: "number", description: "Total score (0-100)" },
        },
        required: ["fundamentals", "tricksOfTrade", "behindTheScenes", "grandFinale", "total"],
        additionalProperties: false,
      },
    },
    required: [
      "executiveSummary",
      "techniqueScorecard",
      "momentAnalysis",
      "opponentAnalysis",
      "missedOpportunities",
      "rewrites",
      "practiceRecommendations",
      "hasanScores",
    ],
    additionalProperties: false,
  },
};

/**
 * Generates a comprehensive post-debate analysis using AI.
 * Uses OpenRouter structured outputs to enforce schema at the model level.
 * Called automatically after debate ends via webhook.
 */
export const generateFullAnalysis = internalAction({
  args: {
    debateId: v.id("debates"),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("[generateFullAnalysis] OPENROUTER_API_KEY not set");
      return;
    }

    // Get debate and exchanges
    const debate = await ctx.runQuery(internal.debates.getInternal, {
      debateId: args.debateId,
    });

    if (!debate) {
      console.error(
        `[generateFullAnalysis] Debate not found: ${args.debateId}`,
      );
      return;
    }

    const exchanges = await ctx.runQuery(internal.debates.getExchangesInternal, {
      debateId: args.debateId,
    });

    if (exchanges.length === 0) {
      console.warn(
        `[generateFullAnalysis] No exchanges found for debate ${args.debateId}`,
      );
      return;
    }

    // Format transcript for analysis
    const transcript = exchanges
      .map(
        (e: { speaker: string; text: string }, i: number) =>
          `[Exchange ${i + 1}] ${e.speaker === "user" ? "DEBATER" : "OPPONENT"}: ${e.text}`,
      )
      .join("\n\n");

    const debateContext = `
DEBATE TOPIC: ${debate.topic}
USER POSITION: ${debate.userPosition}
OPPONENT POSITION: ${debate.aiPosition}
DEBATE DURATION: ${debate.duration ? Math.round(debate.duration / 60) + " minutes" : "Unknown"}
TOTAL EXCHANGES: ${exchanges.length}

---

TRANSCRIPT:

${transcript}
`;

    console.log(
      `[generateFullAnalysis] Analyzing debate ${args.debateId} with ${exchanges.length} exchanges`,
    );

    try {
      // Use structured outputs - OpenRouter enforces the schema at the model level
      const response = await callOpenRouter(
        apiKey,
        [
          { role: "system", content: DEBATE_COACH_PROMPT },
          { role: "user", content: debateContext },
        ],
        "https://orator.app",
        3,
        AI_MODELS.POST_DEBATE_ANALYSIS,
        8000,
        analysisJsonSchema, // Pass JSON schema for structured outputs
      );

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error("Empty response from AI");
      }

      // Parse the response - structured outputs guarantee valid JSON matching our schema
      const analysis = JSON.parse(content);

      // Store the analysis
      await ctx.runMutation(internal.analysis.storeAnalysis, {
        debateId: args.debateId,
        analysis,
      });

      console.log(
        `[generateFullAnalysis] Successfully stored analysis for debate ${args.debateId}`,
      );
    } catch (error) {
      console.error(
        "[generateFullAnalysis] Error generating analysis:",
        error,
      );
    }
  },
});
