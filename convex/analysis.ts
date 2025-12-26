import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAnalysis = query({
  args: {
    debateId: v.id("debates"),
  },
  handler: async (ctx, args) => {
    const analysis = await ctx.db
      .query("analyses")
      .withIndex("by_debate", (q) => q.eq("debateId", args.debateId))
      .first();

    return analysis;
  },
});

/**
 * Store analysis results.
 *
 * Accepts either:
 * - Debate analysis (with techniqueScorecard, hasanScores, opponentAnalysis)
 * - Generic analysis (with skillsAssessment, keyMoments)
 *
 * Uses v.any() for flexibility since both shapes are validated at the AI level
 * with structured outputs.
 */
export const storeAnalysis = internalMutation({
  args: {
    debateId: v.id("debates"),
    analysis: v.any(), // Flexible to accept both debate and generic analysis shapes
  },
  handler: async (ctx, args) => {
    // Check if analysis already exists for this debate
    const existing = await ctx.db
      .query("analyses")
      .withIndex("by_debate", (q) => q.eq("debateId", args.debateId))
      .first();

    // Extract the analysis data
    const analysisData = {
      debateId: args.debateId,
      generatedAt: Date.now(),
      // Framework identifier
      analysisFramework: args.analysis.analysisFramework || "debate",
      // Executive summary (shared between both types)
      executiveSummary: args.analysis.executiveSummary,
      // Practice recommendations (shared, but slightly different shape)
      practiceRecommendations: args.analysis.practiceRecommendations,
      // Moment analysis (shared between both types)
      momentAnalysis: args.analysis.momentAnalysis,

      // --- DEBATE-SPECIFIC FIELDS ---
      techniqueScorecard: args.analysis.techniqueScorecard,
      opponentAnalysis: args.analysis.opponentAnalysis,
      missedOpportunities: args.analysis.missedOpportunities,
      rewrites: args.analysis.rewrites,
      hasanScores: args.analysis.hasanScores,

      // --- GENERIC-SPECIFIC FIELDS ---
      skillsAssessment: args.analysis.skillsAssessment,
      keyMoments: args.analysis.keyMoments,
    };

    if (existing) {
      // Update existing analysis
      await ctx.db.patch(existing._id, analysisData);
      return existing._id;
    }

    // Create new analysis
    return await ctx.db.insert("analyses", analysisData);
  },
});
