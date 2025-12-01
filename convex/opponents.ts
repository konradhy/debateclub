import { v } from "convex/values";
// Force re-push
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const create = mutation({
  args: {
    name: v.string(),
    topic: v.string(),
    position: v.string(),
    style: v.string(),
    difficulty: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const opponentId = await ctx.db.insert("opponents", {
      userId,
      ...args,
    });

    return opponentId;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return [];
    }

    const opponents = await ctx.db
      .query("opponents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    return opponents;
  },
});

export const get = query({
  args: { opponentId: v.id("opponents") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return null;
    }

    const opponent = await ctx.db.get(args.opponentId);
    if (!opponent || opponent.userId !== userId) {
      return null;
    }

    return opponent;
  },
});



import { internalMutation } from "./_generated/server";

export const updateStrategy = internalMutation({
  args: {
    opponentId: v.id("opponents"),
    strategy: v.object({
      openingOptions: v.optional(v.array(v.object({
        id: v.string(),
        type: v.string(),
        hook: v.string(),
        content: v.string(),
        wordCount: v.number(),
        deliveryGuidance: v.string(),
      }))),
      argumentFrames: v.optional(v.array(v.object({
        id: v.string(),
        label: v.string(),
        summary: v.string(),
        content: v.string(),
        detailedContent: v.string(),
        evidenceIds: v.array(v.string()),
        evidenceNeeded: v.optional(v.array(v.string())),
        emotionalCore: v.optional(v.string()),
        deploymentGuidance: v.string(),
      }))),
      receipts: v.optional(v.array(v.object({
        id: v.string(),
        category: v.string(),
        type: v.optional(v.string()),
        source: v.string(),
        sourceCredibility: v.optional(v.string()),
        url: v.optional(v.string()),
        year: v.optional(v.string()),
        content: v.string(),
        context: v.optional(v.string()),
        deployment: v.any(),
        vulnerabilities: v.optional(v.string()),
      }))),
      zingers: v.optional(v.array(v.object({
        id: v.string(),
        text: v.string(),
        type: v.optional(v.string()),
        context: v.any(),
        tone: v.optional(v.string()),
        riskLevel: v.optional(v.string()),
        riskMitigation: v.optional(v.string()),
      }))),
      closingOptions: v.optional(v.array(v.object({
        id: v.string(),
        type: v.string(),
        preview: v.string(),
        content: v.string(),
        wordCount: v.number(),
        quoteSource: v.optional(v.string()),
        storyConnection: v.optional(v.string()),
        actionRequested: v.optional(v.string()),
        deliveryGuidance: v.optional(v.string()),
        emotionalArc: v.optional(v.string()),
      }))),
      opponentIntel: v.optional(v.array(v.object({
        id: v.string(),
        argument: v.string(),
        likelihood: v.string(),
        evidence: v.string(),
        rhetoricalStyle: v.optional(v.string()),
        weakness: v.string(),
        counters: v.array(v.object({
          id: v.string(),
          judoMove: v.optional(v.string()),
          label: v.string(),
          text: v.string(),
          deliveryNote: v.optional(v.string()),
        })),
      }))),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.opponentId, {
      openingOptions: args.strategy.openingOptions,
      argumentFrames: args.strategy.argumentFrames,
      receipts: args.strategy.receipts,
      zingers: args.strategy.zingers,
      closingOptions: args.strategy.closingOptions,
      opponentIntel: args.strategy.opponentIntel,
    });
  },
});

export const updateSelection = mutation({
  args: {
    opponentId: v.id("opponents"),
    selectedOpeningId: v.optional(v.string()),
    selectedFrameIds: v.optional(v.array(v.string())),
    selectedZingerIds: v.optional(v.array(v.string())),
    selectedClosingId: v.optional(v.string()),
    selectedCounterIds: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const opponent = await ctx.db.get(args.opponentId);
    if (!opponent || opponent.userId !== userId) throw new Error("Not found");

    const patch: any = {};
    if (args.selectedOpeningId !== undefined) patch.selectedOpeningId = args.selectedOpeningId;
    if (args.selectedFrameIds !== undefined) patch.selectedFrameIds = args.selectedFrameIds;
    if (args.selectedZingerIds !== undefined) patch.selectedZingerIds = args.selectedZingerIds;
    if (args.selectedClosingId !== undefined) patch.selectedClosingId = args.selectedClosingId;
    if (args.selectedCounterIds !== undefined) patch.selectedCounterIds = args.selectedCounterIds;

    await ctx.db.patch(args.opponentId, patch);
  },
});
