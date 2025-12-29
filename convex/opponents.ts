import { v } from "convex/values";
// Force re-push
import { internalQuery, mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const create = mutation({
  args: {
    // Required fields
    name: v.string(),
    topic: v.string(),
    position: v.string(),
    style: v.string(),
    difficulty: v.string(),

    // Scenario system
    scenarioType: v.optional(v.string()),
    prepType: v.optional(v.string()),

    // Note: Generic prep fields (talkingPoints, keyPhrases, responseMap, etc.)
    // are populated by AI generation, not at creation time

    // Audience context (optional)
    audienceDescription: v.optional(v.string()),
    audienceType: v.optional(v.string()),
    audienceSize: v.optional(v.string()),
    audienceDisposition: v.optional(v.string()),
    debateFormat: v.optional(v.string()),

    // Opponent profile (optional)
    opponentDescription: v.optional(v.string()),
    opponentOrganization: v.optional(v.string()),
    opponentCredentials: v.optional(v.string()),
    credentialWeaknesses: v.optional(v.string()),
    opponentPastStatements: v.optional(v.string()),
    opponentContradictions: v.optional(v.string()),
    opponentTrackRecord: v.optional(v.string()),
    opponentDebateStyle: v.optional(v.string()),
    opponentRhetoricalTendencies: v.optional(v.string()),
    opponentTriggers: v.optional(v.string()),
    opponentStrongestArguments: v.optional(v.string()),
    opponentBestEvidence: v.optional(v.string()),
    opponentLikelyCritiques: v.optional(v.string()),
    opponentCharacterIssues: v.optional(v.string()),

    // User context (optional)
    userResearch: v.optional(v.string()),
    keyPointsToMake: v.optional(v.string()),
    thingsToAvoid: v.optional(v.string()),
    toneDirectives: v.optional(v.string()),
    additionalContext: v.optional(v.string()),
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

export const getInternal = internalQuery({
  args: { opponentId: v.id("opponents") },
  returns: v.any(),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.opponentId);
  },
});

import { internalMutation } from "./_generated/server";

export const updateStrategy = internalMutation({
  args: {
    opponentId: v.id("opponents"),
    strategy: v.object({
      openingOptions: v.optional(
        v.array(
          v.object({
            id: v.string(),
            type: v.string(),
            hook: v.string(),
            content: v.string(),
            wordCount: v.number(),
            deliveryGuidance: v.string(),
          }),
        ),
      ),
      argumentFrames: v.optional(
        v.array(
          v.object({
            id: v.string(),
            label: v.string(),
            summary: v.string(),
            content: v.string(),
            detailedContent: v.string(),
            evidenceIds: v.array(v.string()),
            evidenceNeeded: v.optional(v.array(v.string())),
            emotionalCore: v.optional(v.string()),
            deploymentGuidance: v.string(),
          }),
        ),
      ),
      receipts: v.optional(
        v.array(
          v.object({
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
          }),
        ),
      ),
      zingers: v.optional(
        v.array(
          v.object({
            id: v.string(),
            text: v.string(),
            type: v.optional(v.string()),
            context: v.any(),
            tone: v.optional(v.string()),
            riskLevel: v.optional(v.string()),
            riskMitigation: v.optional(v.string()),
          }),
        ),
      ),
      closingOptions: v.optional(
        v.array(
          v.object({
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
          }),
        ),
      ),
      opponentIntel: v.optional(
        v.array(
          v.object({
            id: v.string(),
            argument: v.string(),
            likelihood: v.string(),
            evidence: v.string(),
            rhetoricalStyle: v.optional(v.string()),
            weakness: v.string(),
            counters: v.array(
              v.object({
                id: v.string(),
                judoMove: v.optional(v.string()),
                label: v.string(),
                text: v.string(),
                deliveryNote: v.optional(v.string()),
              }),
            ),
          }),
        ),
      ),
    }),
    researchSynthesis: v.optional(
      v.object({
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
        generatedAt: v.number(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const patch: Record<string, unknown> = {
      openingOptions: args.strategy.openingOptions,
      argumentFrames: args.strategy.argumentFrames,
      receipts: args.strategy.receipts,
      zingers: args.strategy.zingers,
      closingOptions: args.strategy.closingOptions,
      opponentIntel: args.strategy.opponentIntel,
    };

    // Only include synthesis if provided
    if (args.researchSynthesis) {
      patch.researchSynthesis = args.researchSynthesis;
    }

    await ctx.db.patch(args.opponentId, patch);
  },
});

export const updateGeminiReport = internalMutation({
  args: {
    opponentId: v.id("opponents"),
    report: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.opponentId, {
      geminiResearchReport: args.report,
      geminiResearchMetadata: {
        generatedAt: Date.now(),
        reportLength: args.report.length,
        sourcesCount: 0, // Will be updated when articles are stored
      },
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
    if (args.selectedOpeningId !== undefined)
      patch.selectedOpeningId = args.selectedOpeningId;
    if (args.selectedFrameIds !== undefined)
      patch.selectedFrameIds = args.selectedFrameIds;
    if (args.selectedZingerIds !== undefined)
      patch.selectedZingerIds = args.selectedZingerIds;
    if (args.selectedClosingId !== undefined)
      patch.selectedClosingId = args.selectedClosingId;
    if (args.selectedCounterIds !== undefined)
      patch.selectedCounterIds = args.selectedCounterIds;

    await ctx.db.patch(args.opponentId, patch);
  },
});

// Generic mutations for editing prep materials
export const updateOpponentField = mutation({
  args: {
    opponentId: v.id("opponents"),
    field: v.union(
      // Debate fields
      v.literal("openingOptions"),
      v.literal("argumentFrames"),
      v.literal("receipts"),
      v.literal("zingers"),
      v.literal("closingOptions"),
      v.literal("opponentIntel"),
      // Generic prep fields
      v.literal("talkingPoints"),
      v.literal("keyPhrases"),
      v.literal("responseMap"),
    ),
    itemId: v.string(),
    updates: v.any(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const opponent = await ctx.db.get(args.opponentId);
    if (!opponent || opponent.userId !== userId) throw new Error("Not found");

    const items = opponent[args.field] || [];
    const updatedItems = items.map((item: any) =>
      item.id === args.itemId ? { ...item, ...args.updates } : item,
    );

    await ctx.db.patch(args.opponentId, {
      [args.field]: updatedItems,
    });
  },
});

export const addOpponentFieldItem = mutation({
  args: {
    opponentId: v.id("opponents"),
    field: v.union(
      // Debate fields
      v.literal("openingOptions"),
      v.literal("argumentFrames"),
      v.literal("receipts"),
      v.literal("zingers"),
      v.literal("closingOptions"),
      v.literal("opponentIntel"),
      // Generic prep fields
      v.literal("talkingPoints"),
      v.literal("keyPhrases"),
      v.literal("responseMap"),
    ),
    item: v.any(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const opponent = await ctx.db.get(args.opponentId);
    if (!opponent || opponent.userId !== userId) throw new Error("Not found");

    const items = opponent[args.field] || [];
    const newItem = {
      ...args.item,
      id:
        args.item.id ||
        `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    await ctx.db.patch(args.opponentId, {
      [args.field]: [...items, newItem],
    });

    return newItem.id;
  },
});

export const deleteOpponentFieldItem = mutation({
  args: {
    opponentId: v.id("opponents"),
    field: v.union(
      // Debate fields
      v.literal("openingOptions"),
      v.literal("argumentFrames"),
      v.literal("receipts"),
      v.literal("zingers"),
      v.literal("closingOptions"),
      v.literal("opponentIntel"),
      // Generic prep fields
      v.literal("talkingPoints"),
      v.literal("keyPhrases"),
      v.literal("responseMap"),
    ),
    itemId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const opponent = await ctx.db.get(args.opponentId);
    if (!opponent || opponent.userId !== userId) throw new Error("Not found");

    const items = opponent[args.field] || [];
    const updatedItems = items.filter((item: any) => item.id !== args.itemId);

    // Clean up selections if the deleted item was selected
    const patch: any = { [args.field]: updatedItems };

    if (
      args.field === "openingOptions" &&
      opponent.selectedOpeningId === args.itemId
    ) {
      patch.selectedOpeningId = undefined;
    } else if (
      args.field === "argumentFrames" &&
      opponent.selectedFrameIds?.includes(args.itemId)
    ) {
      patch.selectedFrameIds = opponent.selectedFrameIds.filter(
        (id) => id !== args.itemId,
      );
    } else if (
      args.field === "zingers" &&
      opponent.selectedZingerIds?.includes(args.itemId)
    ) {
      patch.selectedZingerIds = opponent.selectedZingerIds.filter(
        (id) => id !== args.itemId,
      );
    } else if (
      args.field === "closingOptions" &&
      opponent.selectedClosingId === args.itemId
    ) {
      patch.selectedClosingId = undefined;
    } else if (args.field === "opponentIntel") {
      // Clean up selected counters from this intel
      const deletedIntel = items.find((item: any) => item.id === args.itemId);
      if (
        deletedIntel &&
        "counters" in deletedIntel &&
        opponent.selectedCounterIds
      ) {
        const counterIds =
          (deletedIntel as any).counters?.map((c: any) => c.id) || [];
        patch.selectedCounterIds = opponent.selectedCounterIds.filter(
          (id) => !counterIds.includes(id),
        );
      }
    }

    await ctx.db.patch(args.opponentId, patch);
  },
});

export const deleteOpponent = mutation({
  args: {
    opponentId: v.id("opponents"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const opponent = await ctx.db.get(args.opponentId);
    if (!opponent || opponent.userId !== userId) {
      throw new Error("Opponent not found or not owned by user");
    }

    // Cascade delete: Delete all related records
    // 1. Delete research records
    const researchRecords = await ctx.db
      .query("research")
      .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
      .collect();
    for (const research of researchRecords) {
      await ctx.db.delete(research._id);
    }

    // 2. Delete prepProgress records
    const progressRecords = await ctx.db
      .query("prepProgress")
      .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
      .collect();
    for (const progress of progressRecords) {
      await ctx.db.delete(progress._id);
    }

    // 3. Delete prepChat records
    const chatRecords = await ctx.db
      .query("prepChat")
      .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
      .collect();
    for (const chat of chatRecords) {
      await ctx.db.delete(chat._id);
    }

    // 4. Delete the opponent itself
    await ctx.db.delete(args.opponentId);
  },
});

/**
 * Updates single text fields for generic prep (opening/closing approach).
 */
export const updateGenericPrepText = mutation({
  args: {
    opponentId: v.id("opponents"),
    field: v.union(v.literal("openingApproach"), v.literal("closingApproach")),
    value: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const opponent = await ctx.db.get(args.opponentId);
    if (!opponent || opponent.userId !== userId) {
      throw new Error("Opponent not found");
    }

    await ctx.db.patch(args.opponentId, {
      [args.field]: args.value,
    });

    return null;
  },
});

/**
 * Internal mutation for AI-generated generic prep.
 * Called from genericPrep action.
 */
export const updateGenericPrepInternal = internalMutation({
  args: {
    opponentId: v.id("opponents"),
    talkingPoints: v.array(
      v.object({
        id: v.string(),
        content: v.string(),
      }),
    ),
    openingApproach: v.string(),
    keyPhrases: v.array(
      v.object({
        id: v.string(),
        phrase: v.string(),
      }),
    ),
    responseMap: v.array(
      v.object({
        id: v.string(),
        trigger: v.string(),
        response: v.string(),
      }),
    ),
    closingApproach: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.opponentId, {
      talkingPoints: args.talkingPoints,
      openingApproach: args.openingApproach,
      keyPhrases: args.keyPhrases,
      responseMap: args.responseMap,
      closingApproach: args.closingApproach,
    });

    return null;
  },
});
