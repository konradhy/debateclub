"use node";
import { action } from "../_generated/server";
import { v } from "convex/values";
import { internal, api } from "../_generated/api";
import { createPrepAgent } from "../agents";
import { z } from "zod";
import { buildStrategicBrief } from "../lib/strategicBrief";
import { getResearchInstructions } from "../lib/researchIntensity";

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

    // Get user's research settings (guaranteed to return valid values or throw)
    const { researchIntensity, articlesPerSearch } = await ctx.runQuery(
      api.app.getResearchSettings,
      {}
    );

    console.log(
      `[generateStrategy] Using research settings: intensity=${researchIntensity}, articlesPerSearch=${articlesPerSearch}`
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
        | "generating" // Combined status for all parallel generations
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

    // Create agent with user's articlesPerSearch setting
    let thread;
    try {
      const agent = createPrepAgent(articlesPerSearch);
      const result = await agent.createThread(ctx);
      thread = result.thread;
      console.log("[generateStrategy] Thread created");
    } catch (error) {
      console.error("[generateStrategy] Failed to create thread:", error);
      await updateProgress("error", `Failed to create prep agent: ${error}`);
      throw new Error(`Failed to create prep agent thread: ${error}`);
    }

    // Build research prompt with intensity-specific instructions.
    // This prompt is sent to the agent thread and augments the base instructions
    // with specific guidance on research depth based on user's intensity setting.
    const intensityInstructions = getResearchInstructions(researchIntensity);
    console.log(
      `[generateStrategy] Intensity instructions for ${researchIntensity}:`,
      intensityInstructions
    );

    const researchPrompt = `
      ${strategicBrief}

      ${intensityInstructions}

      We are in the year 2025.
      ${opponent.opponentPastStatements ? `Also look for information about statements made by or about this opponent: ${opponent.opponentPastStatements}` : ""}
      ${opponent.userResearch ? `The debater has provided this research context to consider: ${opponent.userResearch.substring(0, 1000)}...` : ""}
    `;

    console.log(
      `[generateStrategy] Full research prompt being sent to agent:`,
      researchPrompt.substring(0, 500) + "..."
    );

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

    // 4. Parallel Generation Phase - all 6 generations run concurrently
    // All generation functions receive the strategicBrief for context-aware generation
    console.log("[generateStrategy] Starting parallel generation phase");

    await updateProgress("generating");

    let openingOptions,
      argumentFrames,
      receipts,
      zingers,
      closingOptions,
      opponentIntel;

    try {
      // Run all 6 generation functions in parallel
      [
        openingOptions,
        argumentFrames,
        receipts,
        zingers,
        closingOptions,
        opponentIntel,
      ] = await Promise.all([
        ctx.runAction(internal.actions.prepGeneration.generateOpenings, {
          opponentId: args.opponentId,
          userId: opponent.userId,
          topic: args.topic,
          position: args.position,
          strategicBrief,
        }),
        ctx.runAction(internal.actions.prepGeneration.generateFrames, {
          opponentId: args.opponentId,
          userId: opponent.userId,
          topic: args.topic,
          position: args.position,
          research,
          strategicBrief,
        }),
        ctx.runAction(internal.actions.prepGeneration.generateReceipts, {
          opponentId: args.opponentId,
          userId: opponent.userId,
          topic: args.topic,
          position: args.position,
          research,
          strategicBrief,
        }),
        ctx.runAction(internal.actions.prepGeneration.generateZingers, {
          opponentId: args.opponentId,
          userId: opponent.userId,
          topic: args.topic,
          position: args.position,
          research,
          strategicBrief,
        }),
        ctx.runAction(internal.actions.prepGeneration.generateClosings, {
          opponentId: args.opponentId,
          userId: opponent.userId,
          topic: args.topic,
          position: args.position,
          strategicBrief,
        }),
        ctx.runAction(internal.actions.prepGeneration.generateOpponentIntel, {
          opponentId: args.opponentId,
          userId: opponent.userId,
          topic: args.topic,
          position: args.position,
          research,
          strategicBrief,
        }),
      ]);

      console.log("[generateStrategy] Parallel generation phase complete");
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
