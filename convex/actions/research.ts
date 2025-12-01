"use node";
import { action } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { searchAndScrape } from "../lib/firecrawl";

export const gatherEvidence = action({
    args: {
        opponentId: v.id("opponents"),
        topic: v.string(),
    },
    handler: async (ctx, args) => {
        const apiKey = process.env.FIRECRAWL_API_KEY;
        if (!apiKey) {
            throw new Error("FIRECRAWL_API_KEY is not set");
        }

        // 1. Search and scrape
        const results = await searchAndScrape(args.topic, apiKey, 3);

        // 2. Summarize and store (we'll just store the raw content + a simple summary for now)
        // In a real app, we might want to use an LLM to summarize each article here
        // For now, we'll trust the "description" or just take the first 200 chars of content as summary if missing

        const articles = results.map(r => ({
            title: r.title,
            url: r.url,
            content: r.content,
            summary: r.content.substring(0, 200) + "...", // Placeholder summary
            source: r.source || "Web",
            publishedDate: r.publishedDate,
        }));

        // 3. Store in database via mutation
        await ctx.runMutation(internal.research.store, {
            opponentId: args.opponentId,
            query: args.topic,
            articles,
        });

        return articles;
    },
});
