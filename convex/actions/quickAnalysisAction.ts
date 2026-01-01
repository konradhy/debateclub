"use node";

import { internalAction } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { callOpenRouterForDebate } from "../lib/openrouterWithCosts";
import { QUICK_COACH_PROMPT } from "../lib/promptTemplates";
import { AI_MODELS } from "../lib/aiConfig";

/**
 * Quick Analysis Action - Gemini Flash 3
 *
 * Generates a quick preliminary analysis (~10 seconds) while full analysis runs in background.
 * Provides immediate feedback with verdict, strengths, and improvements.
 */
export const generateQuickAnalysis = internalAction({
  args: { debateId: v.id("debates") },
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("[generateQuickAnalysis] OPENROUTER_API_KEY not set");
      return;
    }

    // 1. Fetch debate data
    const debate = await ctx.runQuery(internal.debates.getInternal, {
      debateId: args.debateId,
    });

    if (!debate) {
      console.error(
        `[generateQuickAnalysis] Debate not found: ${args.debateId}`,
      );
      return;
    }

    // 2. Fetch exchanges
    const exchanges = await ctx.runQuery(
      internal.debates.getExchangesInternal,
      {
        debateId: args.debateId,
      },
    );

    if (exchanges.length === 0) {
      console.warn(
        `[generateQuickAnalysis] No exchanges found for debate ${args.debateId}`,
      );
      return;
    }

    // 3. Build transcript
    const transcript = exchanges
      .map(
        (ex: { speaker: string; text: string }, idx: number) =>
          `Exchange #${idx + 1} (${ex.speaker === "user" ? "USER" : "AI"}): ${ex.text}`,
      )
      .join("\n\n");

    // 4. Build prompt
    const prompt = QUICK_COACH_PROMPT.replace("{transcript}", transcript).replace(
      "{topic}",
      debate.topic,
    );

    console.log(
      `[QuickAnalysis] Starting for debate ${args.debateId} (${exchanges.length} exchanges)`,
    );

    try {
      // 5. Call Gemini Flash via OpenRouter (auto cost-tracking)
      const siteUrl = process.env.VITE_SITE_URL || "https://debateclub.app";

      const response = await callOpenRouterForDebate(
        ctx,
        debate.userId,
        args.debateId,
        apiKey,
        [{ role: "user", content: prompt }],
        siteUrl,
        3, // retries
        AI_MODELS.QUICK_ANALYSIS,
        500, // max tokens
        false, // plain text, not JSON
      );

      const quickSummary = response.choices[0]?.message?.content || "";

      if (!quickSummary) {
        console.error(
          `[QuickAnalysis] Empty response for debate ${args.debateId}`,
        );
        return;
      }

      // 6. Store in database
      await ctx.runMutation(internal.analysis.storeQuickAnalysis, {
        debateId: args.debateId,
        quickSummary,
      });

      console.log(`[QuickAnalysis] Complete for debate ${args.debateId}`);
      return { success: true };
    } catch (error) {
      console.error(
        `[QuickAnalysis] Error for debate ${args.debateId}:`,
        error,
      );
      throw error;
    }
  },
});
