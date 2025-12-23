"use node";
import { action } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { buildStrategicBrief } from "../lib/strategicBrief";
import { runDeepResearch } from "../lib/geminiDeepResearch";
import { findSourcesWithGemini } from "../lib/geminiSearch";

export const generateStrategyGemini = action({
  args: {
    opponentId: v.id("opponents"),
    topic: v.string(),
    position: v.string(),
  },
  returns: v.any(),
  handler: async (ctx, args) => {
    console.log("[Gemini Strategy] Starting for topic:", args.topic);

    // Fetch opponent with all context
    const opponent = await ctx.runQuery(internal.opponents.getInternal, {
      opponentId: args.opponentId,
    });

    if (!opponent) {
      throw new Error("Opponent not found");
    }

    // Build strategic brief
    const strategicBrief = buildStrategicBrief(opponent);

    const updateProgress = async (
      status:
        | "deep_research_planning"
        | "deep_research_searching"
        | "deep_research_complete"
        | "gemini_agent_searching"
        | "generating"
        | "storing"
        | "complete"
        | "error",
      message: string,
      error?: string,
    ) => {
      await ctx.runMutation(internal.geminiResearchProgress.update, {
        opponentId: args.opponentId,
        status,
        message,
        error,
      });
    };

    // Initialize progress tracking
    await ctx.runMutation(internal.geminiResearchProgress.start, {
      opponentId: args.opponentId,
    });

    // STAGE 1: Deep Research
    let report: string;
    try {
      // Build context-aware research focus based on strategic brief
      const researchFocus: Array<string> = [];

      // Always need core evidence
      researchFocus.push(
        "Current statistics and data from authoritative sources (government, academic, major institutions)",
      );
      researchFocus.push(
        "Real-world case studies and examples that illustrate outcomes",
      );
      researchFocus.push(
        "The strongest arguments made BY THE OPPOSITION and what evidence they cite",
      );

      // Audience-specific focus
      if (
        opponent.audienceDisposition === "hostile" ||
        opponent.audienceDisposition === "skeptical"
      ) {
        researchFocus.push(
          "Common objections and concerns raised by critics of this position, with data to address them",
        );
      }

      // Opponent-specific research
      if (opponent.opponentPastStatements) {
        researchFocus.push(
          `Statements and positions taken by ${opponent.name || "the opponent"}: "${opponent.opponentPastStatements}" — find their track record, predictions, and any contradictions`,
        );
      }
      if (opponent.opponentOrganization) {
        researchFocus.push(
          `Research ${opponent.opponentOrganization}'s published positions and any controversies`,
        );
      }

      // User priorities
      if (opponent.keyPointsToMake) {
        researchFocus.push(
          `Prioritize evidence supporting: ${opponent.keyPointsToMake}`,
        );
      }

      const researchQuery = `
DEBATE RESEARCH BRIEF

Topic: ${args.topic}
Position to argue: ${args.position}

---
STRATEGIC CONTEXT
${strategicBrief}
---

Conduct comprehensive research for debate preparation. This is December 2025.

RESEARCH PRIORITIES:
${researchFocus.map((f, i) => `${i + 1}. ${f}`).join("\n")}

For each finding, include specific sources, dates, and verifiable claims. Cover multiple angles: economic, ethical, practical, and historical where relevant.
`;

      report = await runDeepResearch(
        researchQuery,
        process.env.GEMINI_API_KEY!,
        updateProgress,
      );

      console.log(
        "[Gemini Strategy] Deep Research complete, report length:",
        report.length,
      );

      // Store the Deep Research report
      await ctx.runMutation(internal.opponents.updateGeminiReport, {
        opponentId: args.opponentId,
        report,
      });
    } catch (error) {
      console.error("[Gemini Strategy] Deep Research failed:", error);
      await updateProgress("error", "Deep Research failed", String(error));
      throw error;
    }

    // STAGE 2: Find actual sources using google_search
    let articles: Array<{
      title: string;
      url: string;
      content: string;
      summary: string;
      source: string;
      publishedDate?: string;
    }>;

    try {
      await updateProgress(
        "gemini_agent_searching",
        "Finding sources from Deep Research report...",
      );

      articles = await findSourcesWithGemini(
        report,
        strategicBrief,
        process.env.GEMINI_API_KEY!,
      );

      console.log("[Gemini Strategy] Found", articles.length, "sources");
    } catch (error) {
      console.error("[Gemini Strategy] Source finding failed:", error);
      await updateProgress("error", "Source finding failed", String(error));
      throw error;
    }

    // STAGE 3: Generate prep materials using existing functions
    await updateProgress("generating", "Generating prep materials...");

    let strategy: any;
    try {
      const [
        openingOptions,
        argumentFrames,
        receipts,
        zingers,
        closingOptions,
        opponentIntel,
      ]: any[] = await Promise.all([
        ctx.runAction(internal.actions.prepGeneration.generateOpenings, {
          topic: args.topic,
          position: args.position,
          strategicBrief,
        }),
        ctx.runAction(internal.actions.prepGeneration.generateFrames, {
          topic: args.topic,
          position: args.position,
          research: articles,
          strategicBrief,
        }),
        ctx.runAction(internal.actions.prepGeneration.generateReceipts, {
          topic: args.topic,
          position: args.position,
          research: articles,
          strategicBrief,
        }),
        ctx.runAction(internal.actions.prepGeneration.generateZingers, {
          topic: args.topic,
          position: args.position,
          research: articles,
          strategicBrief,
        }),
        ctx.runAction(internal.actions.prepGeneration.generateClosings, {
          topic: args.topic,
          position: args.position,
          strategicBrief,
        }),
        ctx.runAction(internal.actions.prepGeneration.generateOpponentIntel, {
          topic: args.topic,
          position: args.position,
          research: articles,
          strategicBrief,
        }),
      ]);

      strategy = {
        openingOptions,
        argumentFrames: argumentFrames.map((frame: any) => ({
          ...frame,
          evidenceIds: frame.evidenceIds || [],
        })),
        receipts,
        zingers,
        closingOptions,
        opponentIntel,
      };

      console.log("[Gemini Strategy] Prep materials generated");
    } catch (error) {
      console.error("[Gemini Strategy] Prep generation failed:", error);
      await updateProgress("error", "Prep generation failed", String(error));
      throw error;
    }

    // STAGE 4: Store everything
    await updateProgress("storing", "Storing strategy...");

    await Promise.all([
      ctx.runMutation(internal.opponents.updateStrategy, {
        opponentId: args.opponentId,
        strategy,
      }),
      ctx.runMutation(internal.research.store, {
        opponentId: args.opponentId,
        query: `Gemini Deep Research: ${args.topic}`,
        articles,
      }),
    ]);

    await updateProgress("complete", "Strategy generation complete!");

    console.log("[Gemini Strategy] Complete");
    return strategy;
  },
});
