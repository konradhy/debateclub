"use node";
import { action } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { prepAgent } from "../agents";
import { z } from "zod";

interface Strategy {
    openingOptions: any;
    argumentFrames: any;
    receipts: any;
    zingers: any;
    closingOptions: any;
    opponentIntel: any;
}

export const generateStrategy = action({
    args: {
        opponentId: v.id("opponents"),
        topic: v.string(),
        position: v.string(), // "pro" or "con"
    },
    returns: v.any(),
    handler: async (ctx, args): Promise<Strategy> => {
        const { thread } = await prepAgent.createThread(ctx);

        // 1. Research Phase
        const researchPrompt = `
      Topic: ${args.topic}
      My Position: ${args.position}

      Research this topic thoroughly using your search tool. 
      Focus on finding "Receipts" (hard stats), "Opponent Intel" (common arguments), and "Stories".
    `;

        await thread.generateText({ prompt: researchPrompt });

        // 2. Extract Research Data
        const { object: researchData } = await thread.generateObject({
            prompt: "Summarize your research into a structured list of key findings and sources. Include a summary for each article.",
            schema: z.object({
                articles: z.array(z.object({
                    title: z.string(),
                    source: z.string(),
                    content: z.string(),
                    summary: z.string(),
                    url: z.string().default(""),
                    publishedDate: z.string().optional(),
                })),
            }),
        });

        const research = researchData.articles;

        // 3. Parallel Generation Phase
        // Explicitly cast to any[] to avoid inference issues with Promise.all
        const [
            openingOptions,
            argumentFrames,
            receipts,
            zingers,
            closingOptions,
            opponentIntel
        ] = await Promise.all([
            ctx.runAction(internal.actions.prepGeneration.generateOpenings, {
                topic: args.topic,
                position: args.position,
            }),
            ctx.runAction(internal.actions.prepGeneration.generateFrames, {
                topic: args.topic,
                position: args.position,
                research,
            }),
            ctx.runAction(internal.actions.prepGeneration.generateReceipts, {
                topic: args.topic,
                position: args.position,
                research,
            }),
            ctx.runAction(internal.actions.prepGeneration.generateZingers, {
                topic: args.topic,
                position: args.position,
                research,
            }),
            ctx.runAction(internal.actions.prepGeneration.generateClosings, {
                topic: args.topic,
                position: args.position,
            }),
            ctx.runAction(internal.actions.prepGeneration.generateOpponentIntel, {
                topic: args.topic,
                position: args.position,
                research,
            }),
        ]);

        const strategy: Strategy = {
            openingOptions,
            argumentFrames,
            receipts,
            zingers,
            closingOptions,
            opponentIntel,
        };

        // Post-process argumentFrames to ensure evidenceIds exists
        strategy.argumentFrames = strategy.argumentFrames.map((frame: any) => ({
            ...frame,
            evidenceIds: frame.evidenceIds || [],
        }));

        // 4. Store the generated strategy and research
        await Promise.all([
            ctx.runMutation(internal.opponents.updateStrategy, {
                opponentId: args.opponentId,
                strategy,
            }),
            ctx.runMutation(internal.research.store, {
                opponentId: args.opponentId,
                query: `Debate topic: ${args.topic}`,
                articles: research,
            }),
        ]);

        return strategy;
    },
});
