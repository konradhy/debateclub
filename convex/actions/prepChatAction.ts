"use node";
import { action } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { callOpenRouter, type OpenRouterMessage } from "../lib/openrouter";
import { AI_MODELS } from "../lib/aiConfig";
import { buildStrategicBrief } from "../lib/strategicBrief";

const SITE_URL = "https://orator.app";

/**
 * Sends a message to the prep research chatbot.
 * The chatbot has access to all research articles and user-provided research.
 */
export const sendMessage = action({
  args: {
    opponentId: v.id("opponents"),
    message: v.string(),
  },
  returns: v.string(),
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY is not set");
    }

    // Store user message
    await ctx.runMutation(internal.prepChat.storeMessage, {
      opponentId: args.opponentId,
      role: "user",
      content: args.message,
    });

    // Get opponent details
    const opponent = await ctx.runQuery(internal.opponents.getInternal, {
      opponentId: args.opponentId,
    });

    if (!opponent) {
      throw new Error("Opponent not found");
    }

    // Get research articles
    const research = await ctx.runQuery(internal.research.getInternal, {
      opponentId: args.opponentId,
    });

    // Get chat history (last 10 messages for context)
    const chatHistory = await ctx.runQuery(
      internal.prepChat.getMessagesInternal,
      {
        opponentId: args.opponentId,
      },
    );
    const recentHistory = chatHistory.slice(-10);

    // Build context from research
    let researchContext = "";
    if (research && research.articles.length > 0) {
      researchContext = research.articles
        .map(
          (a, i) =>
            `[Article ${i + 1}] ${a.title}\nSource: ${a.source}\nSummary: ${a.summary}\nContent: ${a.content.substring(0, 2000)}...`,
        )
        .join("\n\n---\n\n");
    }

    // Build prep materials context
    let prepContext = "";
    if (opponent.openingOptions?.length) {
      prepContext += "\n\n## Opening Options:\n";
      prepContext += opponent.openingOptions
        .map((o: { type: string; hook: string }) => `- ${o.type}: "${o.hook}"`)
        .join("\n");
    }
    if (opponent.argumentFrames?.length) {
      prepContext += "\n\n## Argument Frames:\n";
      prepContext += opponent.argumentFrames
        .map(
          (f: { label: string; summary: string }) =>
            `- ${f.label}: ${f.summary}`,
        )
        .join("\n");
    }
    if (opponent.receipts?.length) {
      prepContext += "\n\n## Receipts (Evidence):\n";
      prepContext += opponent.receipts
        .map(
          (r: { category: string; source: string; content: string }) =>
            `- [${r.category}] ${r.source}: ${r.content}`,
        )
        .join("\n");
    }
    if (opponent.opponentIntel?.length) {
      prepContext += "\n\n## Opponent Intel:\n";
      prepContext += opponent.opponentIntel
        .map(
          (i: { argument: string; likelihood: string; weakness: string }) =>
            `- "${i.argument}" (${i.likelihood} likelihood) - Weakness: ${i.weakness}`,
        )
        .join("\n");
    }

    // Build strategic brief from all user-provided context
    const strategicBrief = buildStrategicBrief(opponent);

    // Build system prompt
    const systemPrompt = `You are a debate research assistant helping prepare for a debate. You have access to research materials, prep content, and strategic context.

## Strategic Brief
${strategicBrief}

## Additional Debate Details
- Opponent Style: ${opponent.style}
- Difficulty: ${opponent.difficulty}

## Research Materials
${researchContext || "No research articles available yet."}

## Prep Materials
${prepContext || "No prep materials generated yet."}

## Your Role
- Answer questions about the research and debate topic
- Help find specific evidence or quotes from the research
- Suggest arguments, counter-arguments, and strategies based on the strategic brief
- Help refine talking points with awareness of the audience context
- Use opponent intel from the strategic brief to suggest traps and counter-strategies
- Honor the user's preferences for tone and emphasis when giving advice
- Be concise but thorough
- Cite sources when referencing specific research
- If you don't have information on something, say so honestly

Always be helpful and focus on strengthening the user's debate preparation. Use the full strategic context provided above to give tailored advice.`;

    // Build messages array
    const messages: OpenRouterMessage[] = [
      { role: "system", content: systemPrompt },
    ];

    // Add chat history
    for (const msg of recentHistory) {
      if (msg.role !== "user" && msg.role !== "assistant") continue;
      messages.push({
        role: msg.role,
        content: msg.content,
      });
    }

    // Add current message (already in history, but ensure it's there)
    if (
      !recentHistory.find(
        (m) => m.content === args.message && m.role === "user",
      )
    ) {
      messages.push({ role: "user", content: args.message });
    }

    try {
      const response = await callOpenRouter(
        apiKey,
        messages,
        SITE_URL,
        3,
        AI_MODELS.PREP_CHAT,
        undefined, // maxTokens
        false, // jsonMode - chat returns plain text, not JSON
      );

      const content =
        response.choices[0]?.message?.content ||
        "Sorry, I couldn't generate a response.";

      // Store assistant response
      await ctx.runMutation(internal.prepChat.storeMessage, {
        opponentId: args.opponentId,
        role: "assistant",
        content,
      });

      return content;
    } catch (error) {
      console.error("[prepChat.sendMessage] Error:", error);
      const errorMessage =
        "Sorry, there was an error processing your question. Please try again.";
      await ctx.runMutation(internal.prepChat.storeMessage, {
        opponentId: args.opponentId,
        role: "assistant",
        content: errorMessage,
      });
      return errorMessage;
    }
  },
});
