import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";
import { r2 } from "./r2";

export const create = mutation({
  args: {
    userId: v.id("users"),
    topic: v.string(),
    userPosition: v.string(),
    aiPosition: v.string(),
    scenarioType: v.optional(v.string()),
    opponentId: v.optional(v.id("opponents")),
  },
  handler: async (ctx, args) => {
    const debateId = await ctx.db.insert("debates", {
      userId: args.userId,
      topic: args.topic,
      userPosition: args.userPosition,
      aiPosition: args.aiPosition,
      status: "active",
      startedAt: Date.now(),
      scenarioType: args.scenarioType,
      opponentId: args.opponentId,
    });
    return debateId;
  },
});

export const addTranscript = internalMutation({
  args: {
    debateId: v.id("debates"),
    speaker: v.union(v.literal("user"), v.literal("assistant")),
    text: v.string(),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("exchanges", {
      debateId: args.debateId,
      speaker: args.speaker,
      text: args.text,
      timestamp: args.timestamp,
    });
  },
});

export const complete = internalMutation({
  args: {
    debateId: v.id("debates"),
    duration: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.debateId, {
      status: "completed",
      completedAt: Date.now(),
      duration: args.duration,
    });
  },
});

export const get = query({
  args: {
    debateId: v.union(v.id("debates"), v.null()),
  },
  returns: v.union(v.any(), v.null()),
  handler: async (ctx, args) => {
    if (!args.debateId) {
      return null;
    }
    return await ctx.db.get(args.debateId);
  },
});

export const getExchanges = query({
  args: {
    debateId: v.union(v.id("debates"), v.null()),
  },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    if (!args.debateId) {
      return [];
    }
    const debateId = args.debateId;
    return await ctx.db
      .query("exchanges")
      .withIndex("by_debate", (q) => q.eq("debateId", debateId))
      .order("asc")
      .collect();
  },
});

export const getExchangesInternal = internalQuery({
  args: {
    debateId: v.id("debates"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("exchanges")
      .withIndex("by_debate", (q) => q.eq("debateId", args.debateId))
      .order("asc")
      .collect();
  },
});

export const getInternal = internalQuery({
  args: {
    debateId: v.id("debates"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.debateId);
  },
});

export const updateRecordingKey = internalMutation({
  args: {
    debateId: v.id("debates"),
    recordingKey: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.debateId, {
      recordingKey: args.recordingKey,
    });
  },
});

export const listUserDebates = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return [];
    }

    const debates = await ctx.db
      .query("debates")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    // Get analyses for each debate
    const debatesWithAnalysis = await Promise.all(
      debates.map(async (debate) => {
        const analysis = await ctx.db
          .query("analyses")
          .withIndex("by_debate", (q) => q.eq("debateId", debate._id))
          .first();

        // Get recording URL if available
        let recordingUrl: string | null = null;
        if (debate.recordingKey) {
          recordingUrl = await r2.getUrl(debate.recordingKey, {
            expiresIn: 60 * 60 * 24, // 24 hours
          });
        }

        return {
          ...debate,
          analysis: analysis
            ? {
                hasanScores: analysis.hasanScores,
                executiveSummary: analysis.executiveSummary,
              }
            : null,
          recordingUrl,
        };
      }),
    );

    return debatesWithAnalysis;
  },
});

export const getPerformanceStats = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return {
        totalDebates: 0,
        averageScore: 0,
        improvementPercent: 0,
        recentDebates: [],
        categoryAverages: {
          fundamentals: 0,
          tricksOfTrade: 0,
          behindTheScenes: 0,
          grandFinale: 0,
        },
      };
    }

    const debates = await ctx.db
      .query("debates")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    const totalDebates = debates.length;

    if (totalDebates === 0) {
      return {
        totalDebates: 0,
        averageScore: 0,
        improvementPercent: 0,
        recentDebates: [],
        categoryAverages: {
          fundamentals: 0,
          tricksOfTrade: 0,
          behindTheScenes: 0,
          grandFinale: 0,
        },
      };
    }

    // Get all analyses for these debates
    const analyses = await Promise.all(
      debates.map(async (debate) => {
        const analysis = await ctx.db
          .query("analyses")
          .withIndex("by_debate", (q) => q.eq("debateId", debate._id))
          .first();
        return analysis;
      }),
    );

    const completedAnalyses = analyses.filter(
      (a): a is NonNullable<typeof a> => a !== null,
    );

    if (completedAnalyses.length === 0) {
      return {
        totalDebates,
        averageScore: 0,
        improvementPercent: 0,
        recentDebates: [],
        categoryAverages: {
          fundamentals: 0,
          tricksOfTrade: 0,
          behindTheScenes: 0,
          grandFinale: 0,
        },
      };
    }

    // Filter for analyses that have hasanScores (debate analyses only)
    const debateAnalyses = completedAnalyses.filter((a) => a.hasanScores);

    // Calculate average score (only from debate analyses)
    const totalScore = debateAnalyses.reduce(
      (sum, a) => sum + (a.hasanScores?.total ?? 0),
      0,
    );
    const averageScore =
      debateAnalyses.length > 0
        ? Math.round((totalScore / debateAnalyses.length) * 10) / 10
        : 0;

    // Calculate improvement percent (compare first half vs second half)
    let improvementPercent = 0;
    if (debateAnalyses.length >= 2) {
      const midpoint = Math.floor(debateAnalyses.length / 2);
      const firstHalf = debateAnalyses.slice(midpoint);
      const secondHalf = debateAnalyses.slice(0, midpoint);

      const firstHalfAvg =
        firstHalf.reduce((sum, a) => sum + (a.hasanScores?.total ?? 0), 0) /
        firstHalf.length;
      const secondHalfAvg =
        secondHalf.reduce((sum, a) => sum + (a.hasanScores?.total ?? 0), 0) /
        secondHalf.length;

      if (firstHalfAvg > 0) {
        improvementPercent =
          Math.round(
            ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100 * 10,
          ) / 10;
      }
    }

    // Calculate category averages (only from debate analyses)
    const categoryTotals = {
      fundamentals: 0,
      tricksOfTrade: 0,
      behindTheScenes: 0,
      grandFinale: 0,
    };

    debateAnalyses.forEach((a) => {
      if (a.hasanScores) {
        categoryTotals.fundamentals += a.hasanScores.fundamentals;
        categoryTotals.tricksOfTrade += a.hasanScores.tricksOfTrade;
        categoryTotals.behindTheScenes += a.hasanScores.behindTheScenes;
        categoryTotals.grandFinale += a.hasanScores.grandFinale;
      }
    });

    const debateCount = debateAnalyses.length || 1; // Avoid division by zero
    const categoryAverages = {
      fundamentals:
        Math.round((categoryTotals.fundamentals / debateCount) * 10) / 10,
      tricksOfTrade:
        Math.round((categoryTotals.tricksOfTrade / debateCount) * 10) / 10,
      behindTheScenes:
        Math.round((categoryTotals.behindTheScenes / debateCount) * 10) / 10,
      grandFinale:
        Math.round((categoryTotals.grandFinale / debateCount) * 10) / 10,
    };

    // Get recent debates (last 10) with scores
    const recentDebates = debates.slice(0, 10).map((debate) => {
      const analysis = completedAnalyses.find((a) => a.debateId === debate._id);
      return {
        _id: debate._id,
        topic: debate.topic,
        date: debate.completedAt || debate.startedAt,
        score: analysis?.hasanScores?.total ?? null,
      };
    });

    return {
      totalDebates,
      averageScore,
      improvementPercent,
      recentDebates,
      categoryAverages,
    };
  },
});
