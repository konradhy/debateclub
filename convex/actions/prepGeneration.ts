"use node";
import { internalAction } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { callOpenRouterForPrep } from "../lib/openrouterWithCosts";
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
  STRATEGIC_BRIEF_PROMPT,
} from "../lib/promptTemplates";
import {
  OPENING_STATEMENTS_SCHEMA,
  ARGUMENT_FRAMES_SCHEMA,
  RECEIPTS_ARSENAL_SCHEMA,
  ZINGER_BANK_SCHEMA,
  CLOSING_STATEMENTS_SCHEMA,
  OPPONENT_INTEL_SCHEMA,
  USER_RESEARCH_PROCESSING_SCHEMA,
  RESEARCH_SYNTHESIS_SCHEMA,
} from "../lib/schemas/prepSchemas";
import type { ActionCtx } from "../_generated/server";
import type { Id } from "../_generated/dataModel";
import type { JsonSchema } from "../lib/openrouter";

const SITE_URL = "https://orator.app"; // Placeholder

async function generateWithPrompt(
  ctx: ActionCtx,
  userId: Id<"users">,
  opponentId: Id<"opponents">,
  prompt: string,
  schema: JsonSchema,
  model = AI_MODELS.PREP_GENERATION,
) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("[generateWithPrompt] OPENROUTER_API_KEY is not set");
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  try {
    const response = await callOpenRouterForPrep(
      ctx,
      userId,
      opponentId,
      apiKey,
      [{ role: "system", content: prompt }],
      SITE_URL,
      3,
      model,
      undefined, // maxTokens
      schema, // Use structured outputs with JSON schema
    );

    const content = response.choices[0]?.message?.content;
    if (!content) {
      console.error("[generateWithPrompt] No content in response");
      throw new Error("No content generated - API call failed");
    }

    // With structured outputs, the response is already valid JSON matching the schema
    try {
      return JSON.parse(content);
    } catch (e) {
      console.error(
        "[generateWithPrompt] Failed to parse JSON:",
        content.substring(0, 500),
      );
      throw new Error("Failed to parse generated JSON - malformed response");
    }
  } catch (error) {
    console.error("[generateWithPrompt] Error calling OpenRouter:", error);
    throw error;
  }
}

export const generateOpenings = internalAction({
  args: {
    opponentId: v.id("opponents"),
    userId: v.id("users"),
    topic: v.string(),
    position: v.string(),
    strategicBrief: v.optional(v.string()),
    researchSynthesis: v.optional(v.any()),
  },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    const researchContext = args.researchSynthesis ? JSON.stringify(args.researchSynthesis) : "No research synthesis available.";
    const prompt = OPENING_STATEMENT_PROMPT.replace(
      "{strategicBrief}",
      args.strategicBrief || `Your debater is arguing ${args.position.toUpperCase()} on "${args.topic}".`,
    ).replace("{research}", researchContext);

    const data = await generateWithPrompt(ctx, args.userId, args.opponentId, prompt, OPENING_STATEMENTS_SCHEMA);
    return data.openings || [];
  },
});

export const generateFrames = internalAction({
  args: {
    opponentId: v.id("opponents"),
    userId: v.id("users"),
    topic: v.string(),
    position: v.string(),
    strategicBrief: v.optional(v.string()),
    researchSynthesis: v.optional(v.any()),
    research: v.optional(v.array(v.any())), // Raw research for condensed summaries
  },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    // Research synthesis (clean, structured)
    const synthesisContext = args.researchSynthesis ? JSON.stringify(args.researchSynthesis) : "No research synthesis available.";

    // Condensed raw research (titles + brief summaries)
    const rawResearchContext = args.research ?
      args.research.map(article =>
        `Title: ${article.title || 'Untitled'}\nSource: ${article.url || 'Unknown source'}\nSummary: ${(article.content || '').substring(0, 300)}...`
      ).join('\n\n') :
      "No raw research available.";

    const prompt = ARGUMENT_FRAMES_PROMPT.replace(
      "{strategicBrief}",
      args.strategicBrief || `Your debater is arguing ${args.position.toUpperCase()} on "${args.topic}".`,
    ).replace("{research}", synthesisContext).replace("{rawResearch}", rawResearchContext);

    const data = await generateWithPrompt(ctx, args.userId, args.opponentId, prompt, ARGUMENT_FRAMES_SCHEMA);
    return data.frames || [];
  },
});

export const generateReceipts = internalAction({
  args: {
    opponentId: v.id("opponents"),
    userId: v.id("users"),
    topic: v.string(),
    position: v.string(),
    strategicBrief: v.optional(v.string()),
    researchSynthesis: v.optional(v.any()),
    research: v.optional(v.array(v.any())), // Raw research for detailed content
  },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    // Research synthesis (clean, structured)
    const synthesisContext = args.researchSynthesis ? JSON.stringify(args.researchSynthesis) : "No research synthesis available.";

    // Extended raw research (titles + detailed content for stats/quotes)
    const rawResearchContext = args.research ?
      args.research.map(article =>
        `Title: ${article.title || 'Untitled'}\nSource: ${article.url || 'Unknown source'}\nContent: ${(article.content || '').substring(0, 2000)}...`
      ).join('\n\n') :
      "No raw research available.";

    const prompt = RECEIPTS_ARSENAL_PROMPT.replace(
      "{strategicBrief}",
      args.strategicBrief || `Your debater is arguing ${args.position.toUpperCase()} on "${args.topic}".`,
    ).replace("{research}", synthesisContext).replace("{rawResearch}", rawResearchContext);

    const data = await generateWithPrompt(ctx, args.userId, args.opponentId, prompt, RECEIPTS_ARSENAL_SCHEMA);
    return data.receipts || [];
  },
});

export const generateZingers = internalAction({
  args: {
    opponentId: v.id("opponents"),
    userId: v.id("users"),
    topic: v.string(),
    position: v.string(),
    strategicBrief: v.optional(v.string()),
    researchSynthesis: v.optional(v.any()),
  },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    const researchContext = args.researchSynthesis ? JSON.stringify(args.researchSynthesis) : "No research synthesis available.";
    const prompt = ZINGER_BANK_PROMPT.replace(
      "{strategicBrief}",
      args.strategicBrief || `Your debater is arguing ${args.position.toUpperCase()} on "${args.topic}".`,
    ).replace("{research}", researchContext);

    const data = await generateWithPrompt(ctx, args.userId, args.opponentId, prompt, ZINGER_BANK_SCHEMA);
    return data.zingers || [];
  },
});

export const generateClosings = internalAction({
  args: {
    opponentId: v.id("opponents"),
    userId: v.id("users"),
    topic: v.string(),
    position: v.string(),
    strategicBrief: v.optional(v.string()),
    researchSynthesis: v.optional(v.any()),
    openingStatement: v.optional(v.any()),
  },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    const researchContext = args.researchSynthesis ? JSON.stringify(args.researchSynthesis) : "No research synthesis available.";
    const openingContext = args.openingStatement ? JSON.stringify(args.openingStatement, null, 2) : "No opening statement available.";

    const prompt = CLOSING_STATEMENT_PROMPT.replace(
      "{strategicBrief}",
      args.strategicBrief || `Your debater is arguing ${args.position.toUpperCase()} on "${args.topic}".`,
    ).replace("{research}", researchContext)
      .replace("{openingStatement}", openingContext);

    const data = await generateWithPrompt(ctx, args.userId, args.opponentId, prompt, CLOSING_STATEMENTS_SCHEMA);
    return data.closings || [];
  },
});

/**
 * Generates opening and closing statements sequentially.
 * Opening is generated first, then passed to closing for narrative synthesis.
 */
export const generateOpeningAndClosing = internalAction({
  args: {
    opponentId: v.id("opponents"),
    userId: v.id("users"),
    topic: v.string(),
    position: v.string(),
    strategicBrief: v.optional(v.string()),
    researchSynthesis: v.optional(v.any()),
  },
  returns: v.object({
    openings: v.array(v.any()),
    closings: v.array(v.any()),
  }),
  handler: async (ctx, args) => {
    // Step 1: Generate opening statements
    const openings: Array<any> = await ctx.runAction(internal.actions.prepGeneration.generateOpenings, {
      opponentId: args.opponentId,
      userId: args.userId,
      topic: args.topic,
      position: args.position,
      strategicBrief: args.strategicBrief,
      researchSynthesis: args.researchSynthesis,
    });

    // Step 2: Generate closing statements with opening context
    const closings: Array<any> = await ctx.runAction(internal.actions.prepGeneration.generateClosings, {
      opponentId: args.opponentId,
      userId: args.userId,
      topic: args.topic,
      position: args.position,
      strategicBrief: args.strategicBrief,
      researchSynthesis: args.researchSynthesis,
      openingStatement: openings[0], // Pass first opening for synthesis
    });

    return { openings, closings };
  },
});

export const generateOpponentIntel = internalAction({
  args: {
    opponentId: v.id("opponents"),
    userId: v.id("users"),
    topic: v.string(),
    position: v.string(),
    strategicBrief: v.optional(v.string()),
    researchSynthesis: v.optional(v.any()),
  },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    const researchContext = args.researchSynthesis ? JSON.stringify(args.researchSynthesis) : "No research synthesis available.";
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

    const data = await generateWithPrompt(ctx, args.userId, args.opponentId, prompt, OPPONENT_INTEL_SCHEMA);
    const opponentIntel = data.opponentIntel || [];

    // Ensure each intel object has the required counters field
    const validatedIntel = opponentIntel.map((intel: any) => ({
      ...intel,
      counters: intel.counters || [] // Add empty counters array if missing
    }));

    return validatedIntel;
  },
});

/**
 * Processes user-provided research material and extracts valuable debate content.
 * Returns extracted arguments, receipts, counter-arguments, openers, and zingers.
 */
export const processUserResearch = internalAction({
  args: {
    opponentId: v.id("opponents"),
    userId: v.id("users"),
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
      ctx,
      args.userId,
      args.opponentId,
      prompt,
      USER_RESEARCH_PROCESSING_SCHEMA,
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
    opponentId: v.id("opponents"),
    userId: v.id("users"),
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

    const data = await generateWithPrompt(
      ctx,
      args.userId,
      args.opponentId,
      prompt,
      RESEARCH_SYNTHESIS_SCHEMA,
      AI_MODELS.PREP_GENERATION
    );

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

/**
 * Generates a Strategic Brief - a 7-minute strategic orientation document
 * that synthesizes all prep materials into a coherent game plan.
 */
export const generateStrategicBrief = internalAction({
  args: {
    opponentId: v.id("opponents"),
    userId: v.id("users"),
    topic: v.string(),
    position: v.string(),
    strategicBrief: v.string(), // Original strategic brief (opponent context)
    prepMaterials: v.object({
      openingOptions: v.array(v.any()),
      argumentFrames: v.array(v.any()),
      receipts: v.array(v.any()),
      zingers: v.array(v.any()),
      closingOptions: v.array(v.any()),
      opponentIntel: v.array(v.any()),
    }),
    researchContext: v.optional(v.string()), // Research synthesis insights
    opponentStyle: v.string(),
  },
  returns: v.string(), // Markdown string
  handler: async (ctx, args) => {
    // Serialize prep materials into a summary format for the prompt
    const prepMaterialsSummary = `
OPENING OPTIONS (${args.prepMaterials.openingOptions.length} options):
${args.prepMaterials.openingOptions.map((o, i) => `${i + 1}. ${o.type}: "${o.hook}"\n   ${o.content.substring(0, 150)}...`).join('\n')}

ARGUMENT FRAMES (${args.prepMaterials.argumentFrames.length} frames):
${args.prepMaterials.argumentFrames.map((f, i) => `${i + 1}. ${f.label}: ${f.summary}\n   Details: ${f.detailedContent.substring(0, 150)}...\n   Example: ${f.exampleQuote ? f.exampleQuote.substring(0, 100) + '...' : 'N/A'}`).join('\n')}

RECEIPTS (${args.prepMaterials.receipts.length} total across categories):
${Object.entries(
      args.prepMaterials.receipts.reduce((acc: Record<string, any[]>, r: any) => {
        acc[r.category] = (acc[r.category] || []).concat(r);
        return acc;
      }, {} as Record<string, any[]>)
    ).map(([cat, receipts]) => `- ${cat} (${(receipts as any[]).length}): ${(receipts as any[]).slice(0, 2).map((r: any) => r.content.substring(0, 80) + '...').join(' | ')}`).join('\n')}

ZINGERS (${args.prepMaterials.zingers.length} zingers):
${args.prepMaterials.zingers.slice(0, 5).map((z, i) => `${i + 1}. ${z.text} (${z.type || 'N/A'})`).join('\n')}

CLOSING OPTIONS (${args.prepMaterials.closingOptions.length} options):
${args.prepMaterials.closingOptions.map((c, i) => `${i + 1}. ${c.type}: ${c.preview}`).join('\n')}

OPPONENT INTEL (${args.prepMaterials.opponentIntel.length} likely arguments):
${args.prepMaterials.opponentIntel.map((intel, i) => `${i + 1}. "${intel.argument}" (${intel.likelihood})\n   Weakness: ${intel.weakness}\n   Counters prepared: ${intel.counters?.length || 0}`).join('\n')}
`;

    // Build the prompt by replacing placeholders
    const prompt = STRATEGIC_BRIEF_PROMPT
      .replace('{strategicBrief}', args.strategicBrief)
      .replace('{prepMaterials}', prepMaterialsSummary)
      .replace('{researchContext}', args.researchContext || 'No additional research context available.')
      .replace('{topic}', args.topic)
      .replace('{position}', args.position.toUpperCase())
      .replace('{style}', args.opponentStyle);

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY is not set");
    }

    try {
      // Use Gemini 3 Flash Preview via OpenRouter for fast, cheap synthesis
      const response = await callOpenRouterForPrep(
        ctx,
        args.userId,
        args.opponentId,
        apiKey,
        [{ role: "user", content: prompt }],
        SITE_URL,
        3, // max retries
        "google/gemini-3-flash-preview", // Fast, cheap, good at synthesis
        undefined, // maxTokens
        false, // jsonMode - we want raw markdown, not JSON
      );

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error("No content generated for Strategic Brief");
      }

      return content;
    } catch (error) {
      console.error("[generateStrategicBrief] Error:", error);
      throw error;
    }
  },
});
