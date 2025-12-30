"use node";
import { internalAction } from "../_generated/server";
import { v } from "convex/values";
import { callOpenRouter } from "../lib/openrouter";
import { AI_MODELS } from "../lib/aiConfig";
import {
  OPENING_STATEMENT_PROMPT,
  ARGUMENT_FRAMES_PROMPT,
  RECEIPTS_ARSENAL_PROMPT,
  ZINGER_BANK_PROMPT,
  CLOSING_STATEMENT_PROMPT,
  OPPONENT_INTEL_PROMPT,
  USER_RESEARCH_PROCESSING_PROMPT,
  RESEARCH_SYNTHESIS_PROMPT,
} from "../lib/promptTemplates";

const SITE_URL = "https://orator.app"; // Placeholder

async function generateWithPrompt(
  prompt: string,
  model = AI_MODELS.PREP_GENERATION,
) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("[generateWithPrompt] OPENROUTER_API_KEY is not set");
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  try {
    const response = await callOpenRouter(
      apiKey,
      [{ role: "system", content: prompt }],
      SITE_URL,
      3,
      model,
    );

    const content = response.choices[0]?.message?.content;
    if (!content) {
      console.error("[generateWithPrompt] No content in response");
      throw new Error("No content generated");
    }

    try {
      return JSON.parse(content);
    } catch (e) {
      console.error(
        "[generateWithPrompt] Failed to parse JSON:",
        content.substring(0, 500),
      );
      throw new Error("Failed to parse generated JSON");
    }
  } catch (error) {
    console.error("[generateWithPrompt] Error calling OpenRouter:", error);
    throw error;
  }
}

export const generateOpenings = internalAction({
  args: {
    topic: v.string(),
    position: v.string(),
    strategicBrief: v.optional(v.string()),
  },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    const prompt = OPENING_STATEMENT_PROMPT.replace(
      "{strategicBrief}",
      args.strategicBrief || `Your debater is arguing ${args.position.toUpperCase()} on "${args.topic}".`,
    );

    const data = await generateWithPrompt(prompt);
    return data.openings || [];
  },
});

export const generateFrames = internalAction({
  args: {
    topic: v.string(),
    position: v.string(),
    research: v.array(v.any()),
    strategicBrief: v.optional(v.string()),
  },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    const researchContext = JSON.stringify(args.research);
    const prompt = ARGUMENT_FRAMES_PROMPT.replace(
      "{strategicBrief}",
      args.strategicBrief || `Your debater is arguing ${args.position.toUpperCase()} on "${args.topic}".`,
    ).replace("{research}", researchContext);

    const data = await generateWithPrompt(prompt);
    return data.frames || [];
  },
});

export const generateReceipts = internalAction({
  args: {
    topic: v.string(),
    position: v.string(),
    research: v.array(v.any()),
    strategicBrief: v.optional(v.string()),
  },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    const researchContext = JSON.stringify(args.research);
    const prompt = RECEIPTS_ARSENAL_PROMPT.replace(
      "{strategicBrief}",
      args.strategicBrief || `Your debater is arguing ${args.position.toUpperCase()} on "${args.topic}".`,
    ).replace("{research}", researchContext);

    const data = await generateWithPrompt(prompt);
    return data.receipts || [];
  },
});

export const generateZingers = internalAction({
  args: {
    topic: v.string(),
    position: v.string(),
    research: v.array(v.any()),
    strategicBrief: v.optional(v.string()),
  },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    const researchContext = JSON.stringify(args.research);
    const prompt = ZINGER_BANK_PROMPT.replace(
      "{strategicBrief}",
      args.strategicBrief || `Your debater is arguing ${args.position.toUpperCase()} on "${args.topic}".`,
    ).replace("{research}", researchContext);

    const data = await generateWithPrompt(prompt);
    return data.zingers || [];
  },
});

export const generateClosings = internalAction({
  args: {
    topic: v.string(),
    position: v.string(),
    strategicBrief: v.optional(v.string()),
  },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    const prompt = CLOSING_STATEMENT_PROMPT.replace(
      "{strategicBrief}",
      args.strategicBrief || `Your debater is arguing ${args.position.toUpperCase()} on "${args.topic}".`,
    );

    const data = await generateWithPrompt(prompt);
    return data.closings || [];
  },
});

export const generateOpponentIntel = internalAction({
  args: {
    topic: v.string(),
    position: v.string(),
    research: v.array(v.any()),
    strategicBrief: v.optional(v.string()),
  },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    const researchContext = JSON.stringify(args.research);
    const opponentPosition = args.position === "pro" ? "con" : "pro";

    const prompt = OPPONENT_INTEL_PROMPT
      .replace("{topic}", args.topic)
      .replace("{userPosition}", args.position.toUpperCase())
      .replace(/{opponentPosition}/g, opponentPosition.toUpperCase())
      .replace(
        "{strategicBrief}",
        args.strategicBrief || `Your debater is arguing ${args.position.toUpperCase()} on "${args.topic}".`,
      )
      .replace("{research}", researchContext);

    const data = await generateWithPrompt(prompt);
    return data.opponentIntel || [];
  },
});

/**
 * Processes user-provided research material and extracts valuable debate content.
 * Returns extracted arguments, receipts, counter-arguments, openers, and zingers.
 */
export const processUserResearch = internalAction({
  args: {
    topic: v.string(),
    position: v.string(),
    researchText: v.string(),
  },
  returns: v.object({
    extractedArguments: v.array(
      v.object({
        id: v.string(),
        claim: v.string(),
        supportingPoints: v.array(v.string()),
        source: v.optional(v.string()),
        strength: v.string(),
      }),
    ),
    extractedReceipts: v.array(
      v.object({
        id: v.string(),
        type: v.string(),
        content: v.string(),
        source: v.optional(v.string()),
        useCase: v.string(),
      }),
    ),
    extractedCounterArguments: v.array(
      v.object({
        id: v.string(),
        argument: v.string(),
        suggestedResponse: v.string(),
      }),
    ),
    potentialOpeners: v.array(
      v.object({
        id: v.string(),
        type: v.string(),
        content: v.string(),
        hook: v.string(),
      }),
    ),
    potentialZingers: v.array(
      v.object({
        id: v.string(),
        text: v.string(),
        context: v.string(),
      }),
    ),
    summary: v.string(),
  }),
  handler: async (ctx, args) => {
    // Truncate research if too long
    const maxLength = 15000;
    const truncatedResearch =
      args.researchText.length > maxLength
        ? args.researchText.substring(0, maxLength) +
          "\n\n[Content truncated due to length...]"
        : args.researchText;

    const prompt = USER_RESEARCH_PROCESSING_PROMPT.replace(
      "{topic}",
      args.topic,
    )
      .replace("{position}", args.position)
      .replace("{research}", truncatedResearch);

    const data = await generateWithPrompt(
      prompt,
      AI_MODELS.RESEARCH_PROCESSING,
    );

    return {
      extractedArguments: data.extractedArguments || [],
      extractedReceipts: data.extractedReceipts || [],
      extractedCounterArguments: data.extractedCounterArguments || [],
      potentialOpeners: data.potentialOpeners || [],
      potentialZingers: data.potentialZingers || [],
      summary: data.summary || "Research processed.",
    };
  },
});

/**
 * Generates a comprehensive synthesis of all research articles.
 * Creates an overview showing how different sources agree/disagree,
 * key statistics, quotable quotes, and strategic insights.
 */
export const generateResearchSynthesis = internalAction({
  args: {
    topic: v.string(),
    position: v.string(),
    research: v.array(v.any()),
    strategicBrief: v.optional(v.string()),
  },
  returns: v.object({
    overview: v.string(),
    majorPerspectives: v.array(
      v.object({
        perspective: v.string(),
        summary: v.string(),
        keyProponents: v.string(),
        strongestEvidence: v.string(),
      }),
    ),
    pointsOfConsensus: v.array(v.string()),
    pointsOfContention: v.array(
      v.object({
        issue: v.string(),
        sideA: v.string(),
        sideB: v.string(),
        implication: v.string(),
      }),
    ),
    keyStatistics: v.array(
      v.object({
        stat: v.string(),
        source: v.string(),
        useFor: v.string(),
      }),
    ),
    quotableQuotes: v.array(
      v.object({
        quote: v.string(),
        speaker: v.string(),
        useFor: v.string(),
      }),
    ),
    researchGaps: v.string(),
    strategicInsights: v.string(),
  }),
  handler: async (ctx, args) => {
    // Create a condensed version of research for the prompt
    const researchSummary = args.research
      .map(
        (r: { title: string; source: string; summary: string }, i: number) =>
          `[Article ${i + 1}] ${r.title} (${r.source})\n${r.summary}`,
      )
      .join("\n\n---\n\n");

    const prompt = RESEARCH_SYNTHESIS_PROMPT.replace(
      "{strategicBrief}",
      args.strategicBrief || `Your debater is arguing ${args.position.toUpperCase()} on "${args.topic}".`,
    ).replace("{research}", researchSummary);

    const data = await generateWithPrompt(prompt, AI_MODELS.PREP_GENERATION);

    // Extract the synthesis object from the response
    const synthesis = data.synthesis || data;

    return {
      overview: synthesis.overview || "",
      majorPerspectives: synthesis.majorPerspectives || [],
      pointsOfConsensus: synthesis.pointsOfConsensus || [],
      pointsOfContention: synthesis.pointsOfContention || [],
      keyStatistics: synthesis.keyStatistics || [],
      quotableQuotes: synthesis.quotableQuotes || [],
      researchGaps: synthesis.researchGaps || "",
      strategicInsights: synthesis.strategicInsights || "",
    };
  },
});
