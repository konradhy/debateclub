"use node";
import { action } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { prepAgent } from "../agents";
import { z } from "zod";
import { buildStrategicBrief } from "../lib/strategicBrief";

interface Strategy {
  openingOptions: any;
  argumentFrames: any;
  receipts: any;
  zingers: any;
  closingOptions: any;
  opponentIntel: any;
}

interface ProcessedResearch {
  extractedArguments: Array<{
    id: string;
    claim: string;
    supportingPoints: string[];
    source?: string;
    strength: string;
  }>;
  extractedReceipts: Array<{
    id: string;
    type: string;
    content: string;
    source?: string;
    useCase: string;
  }>;
  extractedCounterArguments: Array<{
    id: string;
    argument: string;
    suggestedResponse: string;
  }>;
  potentialOpeners: Array<{
    id: string;
    type: string;
    content: string;
    hook: string;
  }>;
  potentialZingers: Array<{
    id: string;
    text: string;
    context: string;
  }>;
  summary: string;
}

export const generateStrategy = action({
  args: {
    opponentId: v.id("opponents"),
    topic: v.string(),
    position: v.string(), // "pro" or "con"
  },
  returns: v.any(),
  handler: async (ctx, args): Promise<Strategy> => {
    console.log("[generateStrategy] Starting for topic:", args.topic);

    // Fetch the opponent document with all context fields
    const opponent = await ctx.runQuery(internal.opponents.getInternal, {
      opponentId: args.opponentId,
    });

    if (!opponent) {
      throw new Error("Opponent not found");
    }

    // Build the strategic brief once - this synthesizes all user-provided context
    const strategicBrief = buildStrategicBrief(opponent);
    console.log(
      "[generateStrategy] Strategic brief built:",
      strategicBrief.substring(0, 200) + "...",
    );

    // Start progress tracking
    await ctx.runMutation(internal.prepProgress.startProgress, {
      opponentId: args.opponentId,
    });

    const updateProgress = async (
      status:
        | "researching"
        | "extracting"
        | "synthesizing"
        | "generating_openings"
        | "generating_frames"
        | "generating_receipts"
        | "generating_zingers"
        | "generating_closings"
        | "generating_intel"
        | "generating_strategic_brief"
        | "storing"
        | "complete"
        | "error",
      error?: string,
    ) => {
      await ctx.runMutation(internal.prepProgress.updateProgress, {
        opponentId: args.opponentId,
        status,
        error,
      });
    };

    let thread;
    try {
      const result = await prepAgent.createThread(ctx);
      thread = result.thread;
      console.log("[generateStrategy] Thread created");
    } catch (error) {
      console.error("[generateStrategy] Failed to create thread:", error);
      await updateProgress("error", `Failed to create prep agent: ${error}`);
      throw new Error(`Failed to create prep agent thread: ${error}`);
    }

    // Build a more context-aware research prompt using the strategic brief
    const researchPrompt = `
      ${strategicBrief}

      Research this topic thoroughly using your search tool. 
      Focus on finding "Receipts" (hard stats), "Opponent Intel" (common arguments), and "Stories". We are in the year 2025.
      ${opponent.opponentPastStatements ? `Also look for information about statements made by or about this opponent: ${opponent.opponentPastStatements}` : ""}
      ${opponent.userResearch ? `The debater has provided this research context to consider: ${opponent.userResearch.substring(0, 1000)}...` : ""}
    `;

    try {
      console.log("[generateStrategy] Starting research phase");
      await thread.generateText({ prompt: researchPrompt });
      console.log("[generateStrategy] Research phase complete");
    } catch (error) {
      console.error("[generateStrategy] Research phase failed:", error);
      await updateProgress("error", `Research phase failed: ${error}`);
      throw new Error(`Research phase failed: ${error}`);
    }

    // 2. Extract Research Data
    await updateProgress("extracting");
    let research: Array<{
      title: string;
      source: string;
      content: string;
      summary: string;
      url: string;
      publishedDate?: string;
    }>;
    try {
      console.log("[generateStrategy] Extracting research data");
      const { object: researchData } = await thread.generateObject({
        prompt:
          "Summarize your research into a structured list of key findings and sources. Include a summary for each article.",
        schema: z.object({
          articles: z.array(
            z.object({
              title: z.string(),
              source: z.string(),
              content: z.string(),
              summary: z.string(),
              url: z.string().default(""),
              publishedDate: z.string().optional(),
            }),
          ),
        }),
      });
      research = researchData.articles;
      console.log(
        "[generateStrategy] Extracted",
        research.length,
        "research articles",
      );
    } catch (error) {
      console.error("[generateStrategy] Extract research data failed:", error);
      await updateProgress("error", `Extract research data failed: ${error}`);
      throw new Error(`Extract research data failed: ${error}`);
    }

    // 3. Generate Research Synthesis
    await updateProgress("synthesizing");
    let researchSynthesis;
    try {
      console.log("[generateStrategy] Generating research synthesis");
      researchSynthesis = await ctx.runAction(
        internal.actions.prepGeneration.generateResearchSynthesis,
        {
          opponentId: args.opponentId,
          userId: opponent.userId,
          topic: args.topic,
          position: args.position,
          research,
          strategicBrief
        },
      );
      console.log("[generateStrategy] Research synthesis complete");
    } catch (error) {
      console.error("[generateStrategy] Research synthesis failed:", error);
      // Don't fail the whole process for synthesis - it's optional
      researchSynthesis = null;
    }

    // 4. Sequential Generation Phase for better progress tracking
    // All generation functions receive the strategicBrief for context-aware generation
    console.log("[generateStrategy] Starting generation phase");

    let openingOptions,
      argumentFrames,
      receipts,
      zingers,
      closingOptions,
      opponentIntel;

    try {
      // Generate openings
      await updateProgress("generating_openings");
      openingOptions = await ctx.runAction(
        internal.actions.prepGeneration.generateOpenings,
        {
          opponentId: args.opponentId,
          userId: opponent.userId,
          topic: args.topic,
          position: args.position,
          strategicBrief
        },
      );

      // Generate frames
      await updateProgress("generating_frames");
      argumentFrames = await ctx.runAction(
        internal.actions.prepGeneration.generateFrames,
        {
          opponentId: args.opponentId,
          userId: opponent.userId,
          topic: args.topic,
          position: args.position,
          research,
          strategicBrief
        },
      );

      // Generate receipts
      await updateProgress("generating_receipts");
      receipts = await ctx.runAction(
        internal.actions.prepGeneration.generateReceipts,
        {
          opponentId: args.opponentId,
          userId: opponent.userId,
          topic: args.topic,
          position: args.position,
          research,
          strategicBrief
        },
      );

      // Generate zingers
      await updateProgress("generating_zingers");
      zingers = await ctx.runAction(
        internal.actions.prepGeneration.generateZingers,
        {
          opponentId: args.opponentId,
          userId: opponent.userId,
          topic: args.topic,
          position: args.position,
          research,
          strategicBrief
        },
      );

      // Generate closings
      await updateProgress("generating_closings");
      closingOptions = await ctx.runAction(
        internal.actions.prepGeneration.generateClosings,
        {
          opponentId: args.opponentId,
          userId: opponent.userId,
          topic: args.topic,
          position: args.position,
          strategicBrief
        },
      );

      // Generate opponent intel
      await updateProgress("generating_intel");
      opponentIntel = await ctx.runAction(
        internal.actions.prepGeneration.generateOpponentIntel,
        {
          opponentId: args.opponentId,
          userId: opponent.userId,
          topic: args.topic,
          position: args.position,
          research,
          strategicBrief
        },
      );

      console.log("[generateStrategy] Generation phase complete");
    } catch (error) {
      console.error("[generateStrategy] Generation phase failed:", error);
      await updateProgress("error", `Generation failed: ${error}`);
      throw error;
    }

    const strategy: Strategy = {
      openingOptions,
      argumentFrames,
      receipts,
      zingers,
      closingOptions,
      opponentIntel,
    };

    // Generate Strategic Brief as final synthesis (non-blocking)
    let strategicBriefMarkdown: string | undefined;
    let strategicBriefMetadata: { generatedAt: number; wordCount: number; readingTimeMinutes: number } | undefined;

    try {
      await updateProgress("generating_strategic_brief");
      strategicBriefMarkdown = await ctx.runAction(
        internal.actions.prepGeneration.generateStrategicBrief,
        {
          opponentId: args.opponentId,
          userId: opponent.userId,
          topic: args.topic,
          position: args.position,
          strategicBrief,
          prepMaterials: {
            openingOptions,
            argumentFrames,
            receipts,
            zingers,
            closingOptions,
            opponentIntel,
          },
          researchContext: researchSynthesis?.strategicInsights,
          opponentStyle: opponent.style,
        },
      );

      const wordCount = strategicBriefMarkdown.split(/\s+/).length;
      const readingTimeMinutes = Math.round(wordCount / 200);

      strategicBriefMetadata = {
        generatedAt: Date.now(),
        wordCount,
        readingTimeMinutes,
      };
      console.log("[generateStrategy] Strategic Brief generated successfully");
    } catch (error) {
      console.error("[generateStrategy] Strategic Brief generation failed (non-fatal):", error);
      // Continue without Strategic Brief - don't fail whole prep
    }

    // Post-process argumentFrames to ensure evidenceIds exists
    strategy.argumentFrames = strategy.argumentFrames.map((frame: any) => ({
      ...frame,
      evidenceIds: frame.evidenceIds || [],
    }));

    // 5. Store the generated strategy, research, synthesis, and strategic brief
    await updateProgress("storing");
    await Promise.all([
      ctx.runMutation(internal.opponents.updateStrategy, {
        opponentId: args.opponentId,
        strategy,
        researchSynthesis: researchSynthesis
          ? { ...researchSynthesis, generatedAt: Date.now() }
          : undefined,
        strategicBrief: strategicBriefMarkdown,
        strategicBriefMetadata: strategicBriefMetadata,
      }),
      ctx.runMutation(internal.research.store, {
        opponentId: args.opponentId,
        query: `Debate topic: ${args.topic}`,
        articles: research,
      }),
    ]);

    await updateProgress("complete");
    return strategy;
  },
});

/**
 * Processes user-provided research text and extracts valuable debate content.
 * Returns extracted arguments, receipts, potential openers, zingers, and counter-arguments.
 */
export const processResearchText = action({
  args: {
    opponentId: v.id("opponents"),
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
  handler: async (ctx, args): Promise<ProcessedResearch> => {
    // Get opponent data to access userId for cost tracking
    const opponent = await ctx.runQuery(internal.opponents.getInternal, {
      opponentId: args.opponentId,
    });

    if (!opponent) {
      throw new Error("Opponent not found");
    }

    // Call the internal action to process the research
    const result = await ctx.runAction(
      internal.actions.prepGeneration.processUserResearch,
      {
        opponentId: args.opponentId,
        userId: opponent.userId,
        topic: args.topic,
        position: args.position,
        researchText: args.researchText,
      },
    );

    // Store the processed research as an article for reference
    await ctx.runMutation(internal.research.store, {
      opponentId: args.opponentId,
      query: "User-provided research material",
      articles: [
        {
          title: "User Research Notes",
          url: "",
          content: args.researchText.substring(0, 5000), // Store truncated version
          summary: result.summary,
          source: "User Input",
          publishedDate: new Date().toISOString().split("T")[0],
        },
      ],
    });

    return result;
  },
});
