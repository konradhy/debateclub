import { internalMutation, mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    userId: v.id("users"),
    topic: v.string(),
    userPosition: v.string(),
    aiPosition: v.string(),
  },
  handler: async (ctx, args) => {
    const debateId = await ctx.db.insert("debates", {
      userId: args.userId,
      topic: args.topic,
      userPosition: args.userPosition,
      aiPosition: args.aiPosition,
      status: "active",
      startedAt: Date.now(),
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

