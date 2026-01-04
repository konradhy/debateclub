import { Agent, createTool } from "@convex-dev/agent";
import { components } from "./_generated/api";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { searchAndScrape } from "./lib/firecrawl";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

//TODO should have a second tool that analyses the docs ands saves them in the array instead of asking it do it it and the end of the day. Then enhance that array to include richer things like how it relates to the debate, key stats 

/**
 * Creates a new prep agent instance with custom settings.
 * @param articlesPerSearch - Number of articles to retrieve per search (default: 5)
 */
export function createPrepAgent(articlesPerSearch: number = 5) {
  return new Agent(components.agent, {
    name: "Debate Prep Strategist",
    // TODO: Consider changing language model
    languageModel: openrouter.chat("openai/gpt-4o"),
    // Base instructions provide general guidance.
    // Specific research intensity instructions (Basic/Aggressive/Deep) are injected
    // via the research prompt sent to the thread in prep.ts
    instructions: `
    You are an expert debate coach and strategist, inspired by Mehdi Hasan's approach to debate preparation.
    Your goal is to help the user prepare for a debate by researching the topic and generating a comprehensive strategy.

    You have access to a web search tool.
    When you receive research instructions, follow them carefully regarding how many searches to perform and what depth to pursue.

    Focus your searches on:
    - "Receipts": hard facts, statistics, specific study names, and dates. Generalities are useless.
    - "Opponent Intel": common arguments used by the other side and their specific weaknesses (flawed data, logical fallacies).
    - "Stories": anecdotes or examples that can be used for emotional openings.

    Once you have completed your research, you will be asked to generate the final strategy JSON.
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
            // Use user-configured articlesPerSearch instead of hardcoded 5
            const results = await searchAndScrape(args.query, apiKey, articlesPerSearch);

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
}
