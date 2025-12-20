import { internalMutation, internalQuery, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Gets chat history for an opponent's prep session.
 */
export const getMessages = query({
  args: { opponentId: v.id("opponents") },
  returns: v.array(
    v.object({
      _id: v.id("prepChat"),
      role: v.union(v.literal("user"), v.literal("assistant")),
      content: v.string(),
      timestamp: v.number(),
    }),
  ),
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("prepChat")
      .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
      .order("asc")
      .collect();

    return messages.map((m) => ({
      _id: m._id,
      role: m.role,
      content: m.content,
      timestamp: m.timestamp,
    }));
  },
});

/**
 * Internal version of getMessages for use in actions.
 */
export const getMessagesInternal = internalQuery({
  args: { opponentId: v.id("opponents") },
  returns: v.array(
    v.object({
      _id: v.id("prepChat"),
      role: v.union(v.literal("user"), v.literal("assistant")),
      content: v.string(),
      timestamp: v.number(),
    }),
  ),
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("prepChat")
      .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
      .order("asc")
      .collect();

    return messages.map((m) => ({
      _id: m._id,
      role: m.role,
      content: m.content,
      timestamp: m.timestamp,
    }));
  },
});

/**
 * Stores a chat message.
 */
export const storeMessage = internalMutation({
  args: {
    opponentId: v.id("opponents"),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
  },
  returns: v.id("prepChat"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("prepChat", {
      opponentId: args.opponentId,
      role: args.role,
      content: args.content,
      timestamp: Date.now(),
    });
  },
});

/**
 * Clears chat history for an opponent.
 */
export const clearChat = internalMutation({
  args: { opponentId: v.id("opponents") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("prepChat")
      .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
      .collect();

    for (const m of messages) {
      await ctx.db.delete(m._id);
    }

    return null;
  },
});
