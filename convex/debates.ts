import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
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

