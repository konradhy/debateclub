import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

/**
 * Saves a research article with agent analysis.
 * Called by the saveResearchArticle tool during research phase.
 */
export const save = internalMutation({
    args: {
        opponentId: v.id("opponents"),
        threadId: v.string(),
        title: v.string(),
        url: v.string(),
        source: v.string(),
        publishedDate: v.optional(v.string()),
        relevanceScore: v.number(),
        category: v.union(
            v.literal("receipt"),
            v.literal("opponent_intel"),
            v.literal("story"),
            v.literal("counter_argument"),
            v.literal("general")
        ),
        keyFinding: v.string(),
        specificEvidence: v.string(),
        strategicValue: v.string(),
        weaknesses: v.optional(v.string()),
        content: v.string(),
        summary: v.string(),
        searchQuery: v.optional(v.string()),
    },
    returns: v.id("researchArticles"),
    handler: async (ctx, args) => {
        return await ctx.db.insert("researchArticles", {
            ...args,
            savedAt: Date.now(),
        });
    },
});

/**
 * Gets all research articles for an opponent, optionally filtered by category.
 */
export const getByOpponent = internalQuery({
    args: {
        opponentId: v.id("opponents"),
        category: v.optional(v.string()),
        minRelevance: v.optional(v.number()),
    },
    returns: v.array(v.any()),
    handler: async (ctx, args) => {
        let query = ctx.db
            .query("researchArticles")
            .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId));

        const articles = await query.collect();

        // Filter by category and relevance if specified
        return articles.filter(article => {
            if (args.category && article.category !== args.category) return false;
            if (args.minRelevance && article.relevanceScore < args.minRelevance) return false;
            return true;
        });
    },
});

/**
 * Gets count of saved articles for progress tracking.
 */
export const getCount = internalQuery({
    args: { opponentId: v.id("opponents") },
    returns: v.number(),
    handler: async (ctx, args) => {
        const articles = await ctx.db
            .query("researchArticles")
            .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
            .collect();
        return articles.length;
    },
});