import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";

export const get = query({
    args: { opponentId: v.id("opponents") },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            return null;
        }

        const research = await ctx.db
            .query("research")
            .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
            .order("desc")
            .first();

        return research;
    },
});

export const store = internalMutation({
    args: {
        opponentId: v.id("opponents"),
        query: v.string(),
        articles: v.array(v.object({
            title: v.string(),
            url: v.string(),
            content: v.string(),
            summary: v.string(),
            source: v.string(),
            publishedDate: v.optional(v.string()),
        })),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("research", {
            opponentId: args.opponentId,
            query: args.query,
            articles: args.articles,
            timestamp: Date.now(),
        });
    },
});
