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

export const storeAnalysis = internalMutation({
  args: {
    debateId: v.id("debates"),
    analysis: v.object({
      executiveSummary: v.object({
        assessment: v.string(),
        topStrengths: v.array(v.string()),
        topImprovements: v.array(v.string()),
        verdict: v.string(),
      }),
      techniqueScorecard: v.array(
        v.object({
          category: v.string(),
          techniquesIdentified: v.array(v.string()),
          executionScore: v.number(),
          notes: v.string(),
        }),
      ),
      momentAnalysis: v.array(
        v.object({
          exchangeRef: v.string(),
          whatHappened: v.string(),
          techniqueUsed: v.optional(v.string()),
          techniqueShouldHaveUsed: v.optional(v.string()),
          effectiveness: v.number(),
          rewrite: v.optional(v.string()),
        }),
      ),
      opponentAnalysis: v.object({
        techniquesUsed: v.array(v.string()),
        trapsSet: v.array(v.string()),
        weaknessesExposed: v.array(v.string()),
        unexploitedWeaknesses: v.array(v.string()),
      }),
      missedOpportunities: v.array(
        v.object({
          moment: v.string(),
          whatShouldHaveDone: v.string(),
          whichTechnique: v.string(),
        }),
      ),
      rewrites: v.array(
        v.object({
          original: v.string(),
          improved: v.string(),
          explanation: v.string(),
        }),
      ),
      practiceRecommendations: v.object({
        immediateFocus: v.object({
          area: v.string(),
          drill: v.string(),
          exampleToStudy: v.string(),
        }),
        secondaryFocus: v.object({
          area: v.string(),
          drill: v.string(),
          exampleToStudy: v.string(),
        }),
        longTermDevelopment: v.object({
          skill: v.string(),
          practiceApproach: v.string(),
          resources: v.string(),
        }),
      }),
      hasanScores: v.object({
        fundamentals: v.number(),
        tricksOfTrade: v.number(),
        behindTheScenes: v.number(),
        grandFinale: v.number(),
        total: v.number(),
      }),
    }),
  },
  handler: async (ctx, args) => {
    // Check if analysis already exists for this debate
    const existing = await ctx.db
      .query("analyses")
      .withIndex("by_debate", (q) => q.eq("debateId", args.debateId))
      .first();

    if (existing) {
      // Update existing analysis
      await ctx.db.patch(existing._id, {
        ...args.analysis,
        generatedAt: Date.now(),
      });
      return existing._id;
    }

    // Create new analysis
    return await ctx.db.insert("analyses", {
      debateId: args.debateId,
      ...args.analysis,
      generatedAt: Date.now(),
    });
  },
});
