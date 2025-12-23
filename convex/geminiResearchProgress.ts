import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

export const start = internalMutation({
  args: {
    opponentId: v.id("opponents"),
  },
  handler: async (ctx, args) => {
    // Clear any existing progress
    const existing = await ctx.db
      .query("geminiResearchProgress")
      .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
    }

    // Create new progress entry
    await ctx.db.insert("geminiResearchProgress", {
      opponentId: args.opponentId,
      status: "deep_research_planning",
      message: "Initializing...",
      startedAt: Date.now(),
    });
  },
});

export const update = internalMutation({
  args: {
    opponentId: v.id("opponents"),
    status: v.union(
      v.literal("deep_research_planning"),
      v.literal("deep_research_searching"),
      v.literal("deep_research_complete"),
      v.literal("gemini_agent_searching"),
      v.literal("generating"),
      v.literal("storing"),
      v.literal("complete"),
      v.literal("error")
    ),
    message: v.string(),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("geminiResearchProgress")
      .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
      .first();

    if (!progress) {
      throw new Error("Progress tracking not initialized");
    }

    await ctx.db.patch(progress._id, {
      status: args.status,
      message: args.message,
      error: args.error,
      ...(args.status === "complete" || args.status === "error"
        ? { completedAt: Date.now() }
        : {}),
    });
  },
});

export const get = internalQuery({
  args: {
    opponentId: v.id("opponents"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("geminiResearchProgress")
      .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
      .first();
  },
});

// Public query for UI polling
import { query } from "./_generated/server";

export const getProgress = query({
  args: {
    opponentId: v.id("opponents"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("geminiResearchProgress")
      .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
      .first();
  },
});

export const clear = internalMutation({
  args: {
    opponentId: v.id("opponents"),
  },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("geminiResearchProgress")
      .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
      .first();

    if (progress) {
      await ctx.db.delete(progress._id);
    }
  },
});
