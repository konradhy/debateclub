import { Agent, createTool } from "@convex-dev/agent";
import { components } from "./_generated/api";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { searchAndScrape } from "./lib/firecrawl";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const prepAgent = new Agent(components.agent, {
  name: "Debate Prep Strategist",
  languageModel: openrouter.chat("openai/gpt-4o"),
  instructions: `
    You are an expert debate coach and strategist, heavily inspired by the book "How to Win Every Argument" by Madsen Pirie and the style of Mehdi Hasan.
    Your goal is to help the user prepare for a debate by researching the topic and generating a comprehensive strategy.
    
    You have access to a web search tool. USE IT AGGRESSIVELY.
    1. Analyze the topic and position.
    2. Search for "Receipts": hard facts, statistics, specific study names, and dates. Generalities are useless.
    3. Search for "Opponent Intel": common arguments used by the other side and their specific weaknesses (flawed data, logical fallacies).
    4. Search for "Stories": anecdotes or examples that can be used for emotional openings.
    5. If the first search isn't enough, search again for specific details.
    6. Once you have enough information, you will be asked to generate the final strategy JSON.
  `,
  tools: {
    searchWeb: createTool({
      description: "Search the web for debate evidence and articles.",
      args: z.object({
        query: z.string().describe("The search query"),
      }),
      handler: async (ctx, args) => {
        const apiKey = process.env.FIRECRAWL_API_KEY;
        if (!apiKey) throw new Error("FIRECRAWL_API_KEY is not set");

        console.log(`🔍 [AGENT-DEBUG] Agent searching for: "${args.query}"`);

        try {
          // For agent tools, use the original Firecrawl function without cost tracking
          // since we don't have proper user context in agents
          const results = await searchAndScrape(args.query, apiKey, 5);

          console.log(`✅ [AGENT-DEBUG] Agent found ${results.length} results`);

          return results
            .map(
              (r) =>
                `Title: ${r.title}\nSource: ${r.url}\nContent: ${r.content.substring(0, 1500)}...`,
            )
            .join("\n\n");
        } catch (error) {
          console.error(`❌ [AGENT-DEBUG] Agent search error:`, error);
          throw error;
        }
      },
    }),
  },
});
