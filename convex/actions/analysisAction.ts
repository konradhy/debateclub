"use node";

import { internalAction } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { callOpenRouterForDebate } from "../lib/openrouterWithCosts";
import { DEBATE_COACH_PROMPT } from "../lib/promptTemplates";
import { AI_MODELS } from "../lib/aiConfig";
import type { JsonSchema } from "../lib/openrouter";

/**
 * JSON Schema for OpenRouter structured outputs - DEBATE scenarios.
 * Uses Hasan methodology with techniqueScorecard and hasanScores.
 */
const debateAnalysisSchema: JsonSchema = {
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
 * JSON Schema for OpenRouter structured outputs - GENERIC scenarios (sales, entrepreneur, etc.).
 * Uses simpler skillsAssessment instead of Hasan-specific scoring.
 */
const genericAnalysisSchema: JsonSchema = {
  name: "generic_analysis",
  strict: true,
  schema: {
    type: "object",
    properties: {
      executiveSummary: {
        type: "object",
        properties: {
          assessment: { type: "string", description: "Overall assessment of the performance" },
          topStrengths: { type: "array", items: { type: "string" }, description: "Top 3 strengths demonstrated" },
          topImprovements: { type: "array", items: { type: "string" }, description: "Top 3 areas for improvement" },
          verdict: { type: "string", description: "Overall verdict on how the conversation went" },
        },
        required: ["assessment", "topStrengths", "topImprovements", "verdict"],
        additionalProperties: false,
      },
      skillsAssessment: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string", description: "Skill category name" },
            score: { type: "number", description: "Score from 1-10" },
            feedback: { type: "string", description: "Specific feedback for this skill" },
          },
          required: ["name", "score", "feedback"],
          additionalProperties: false,
        },
      },
      momentAnalysis: {
        type: "array",
        items: {
          type: "object",
          properties: {
            exchangeRef: { type: "string", description: "Reference to the exchange" },
            whatHappened: { type: "string", description: "Description of what occurred" },
            effectiveness: { type: "number", description: "Effectiveness score 1-10" },
            suggestion: { type: "string", description: "How it could have been handled better" },
          },
          required: ["exchangeRef", "whatHappened", "effectiveness"],
          additionalProperties: false,
        },
      },
      keyMoments: {
        type: "array",
        items: {
          type: "object",
          properties: {
            moment: { type: "string", description: "Description of the key moment" },
            impact: { type: "string", description: "Why this moment was significant" },
            wasHandledWell: { type: "boolean", description: "Whether this was handled well" },
          },
          required: ["moment", "impact", "wasHandledWell"],
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
            },
            required: ["area", "drill"],
            additionalProperties: false,
          },
          secondaryFocus: {
            type: "object",
            properties: {
              area: { type: "string", description: "Secondary area to focus on" },
              drill: { type: "string", description: "Specific drill to practice" },
            },
            required: ["area", "drill"],
            additionalProperties: false,
          },
        },
        required: ["immediateFocus", "secondaryFocus"],
        additionalProperties: false,
      },
    },
    required: [
      "executiveSummary",
      "skillsAssessment",
      "momentAnalysis",
      "keyMoments",
      "practiceRecommendations",
    ],
    additionalProperties: false,
  },
};

/**
 * Generic analysis prompt template.
 * Expects {{CATEGORIES}} to be replaced with scenario-specific categories.
 */
const GENERIC_ANALYSIS_PROMPT = `You are an expert communication coach analyzing a practice conversation.

Your task is to provide actionable feedback that helps the user improve.

SCORING CATEGORIES (rate each 1-10):
{{CATEGORIES}}

For each category, provide:
- A score from 1-10
- Specific examples from the transcript supporting your score
- Concrete suggestions for improvement

Be encouraging but honest. Focus on practical, actionable feedback.`;

/**
 * Score category definitions for different scenario frameworks.
 */
const SCENARIO_CATEGORIES: Record<string, Array<{ name: string; description: string }>> = {
  sales: [
    { name: "Discovery", description: "Did they uncover the real objection/need?" },
    { name: "Control", description: "Did they maintain conversation flow and momentum?" },
    { name: "Confidence", description: "Did they handle pushback without getting defensive?" },
    { name: "Closing", description: "Did they advance the deal or set next steps?" },
  ],
  entrepreneur: [
    { name: "Clarity", description: "Was the value proposition crystal clear?" },
    { name: "Confidence", description: "Did they project confidence without arrogance?" },
    { name: "Handling Skepticism", description: "How well did they address tough questions?" },
    { name: "Business Acumen", description: "Did they demonstrate deep understanding of their market?" },
  ],
};

/**
 * Generates a comprehensive post-session analysis using AI.
 * Uses OpenRouter structured outputs to enforce schema at the model level.
 * Called automatically after session ends via webhook.
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

    // Determine if this is a debate or generic scenario
    const scenarioType = debate.scenarioType || "debate";
    const isDebateScenario = scenarioType === "debate";

    // Format transcript for analysis
    const transcript = exchanges
      .map(
        (e: { speaker: string; text: string }, i: number) =>
          `[Exchange ${i + 1}] ${e.speaker === "user" ? "USER" : "AI"}: ${e.text}`,
      )
      .join("\n\n");

    console.log(
      `[generateFullAnalysis] Analyzing ${scenarioType} session ${args.debateId} with ${exchanges.length} exchanges`,
    );

    try {
      let analysis: any;
      let analysisFramework: string;

      if (isDebateScenario) {
        // === DEBATE ANALYSIS ===
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

        const response = await callOpenRouterForDebate(
          ctx,
          debate.userId,
          args.debateId,
          apiKey,
          [
            { role: "system", content: DEBATE_COACH_PROMPT },
            { role: "user", content: debateContext },
          ],
          "https://orator.app",
          3,
          AI_MODELS.POST_DEBATE_ANALYSIS,
          8000,
          debateAnalysisSchema,
        );

        const content = response.choices[0]?.message?.content;
        if (!content) {
          throw new Error("Empty response from AI");
        }

        analysis = JSON.parse(content);
        analysisFramework = "debate";

      } else {
        // === GENERIC ANALYSIS (sales, entrepreneur, etc.) ===

        // Determine framework from scenarioType (e.g., "sales-cold-prospect" -> "sales")
        const framework = scenarioType.split("-")[0];
        const categories = SCENARIO_CATEGORIES[framework] || SCENARIO_CATEGORIES.sales;

        // Build the prompt with scenario-specific categories
        const categoryList = categories
          .map((cat) => `- ${cat.name}: ${cat.description}`)
          .join("\n");

        const systemPrompt = GENERIC_ANALYSIS_PROMPT.replace("{{CATEGORIES}}", categoryList);

        const sessionContext = `
SCENARIO: ${scenarioType}
TOPIC: ${debate.topic}
SESSION DURATION: ${debate.duration ? Math.round(debate.duration / 60) + " minutes" : "Unknown"}
TOTAL EXCHANGES: ${exchanges.length}

---

TRANSCRIPT:

${transcript}
`;

        const response = await callOpenRouterForDebate(
          ctx,
          debate.userId,
          args.debateId,
          apiKey,
          [
            { role: "system", content: systemPrompt },
            { role: "user", content: sessionContext },
          ],
          "https://orator.app",
          3,
          AI_MODELS.POST_DEBATE_ANALYSIS,
          4000,
          genericAnalysisSchema,
        );

        const content = response.choices[0]?.message?.content;
        if (!content) {
          throw new Error("Empty response from AI");
        }

        analysis = JSON.parse(content);
        analysisFramework = framework;
      }

      // Store the analysis with framework identifier
      await ctx.runMutation(internal.analysis.storeAnalysis, {
        debateId: args.debateId,
        analysis: {
          ...analysis,
          analysisFramework,
        },
      });

      console.log(
        `[generateFullAnalysis] Successfully stored ${analysisFramework} analysis for session ${args.debateId}`,
      );
    } catch (error) {
      console.error(
        "[generateFullAnalysis] Error generating analysis:",
        error,
      );
    }
  },
});
