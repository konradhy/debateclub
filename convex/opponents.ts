import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const create = mutation({
  args: {
    name: v.string(),
    topic: v.string(),
    position: v.string(),
    style: v.string(),
    talkingPoints: v.array(v.string()),
    difficulty: v.string(),
    userCheatSheet: v.optional(v.string()),
    userOpeningStatement: v.optional(v.string()),
    userDebateNotes: v.optional(v.string()),
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

export const update = mutation({
  args: {
    opponentId: v.id("opponents"),
    userOpeningStatement: v.optional(v.string()),
    userDebateNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const opponent = await ctx.db.get(args.opponentId);
    if (!opponent || opponent.userId !== userId) {
      throw new Error("Opponent not found or access denied");
    }

    await ctx.db.patch(args.opponentId, {
      userOpeningStatement: args.userOpeningStatement,
      userDebateNotes: args.userDebateNotes,
    });

    return args.opponentId;
  },
});
