import { v } from "convex/values";
import { internalQuery } from "./_generated/server";

/**
 * Internal query to get a user by ID.
 * Used by server-side code like Stripe checkout creation.
 */
export const get = internalQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db.get(userId);
  },
});
