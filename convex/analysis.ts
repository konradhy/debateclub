import {
  internalAction,
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { v } from "convex/values";
import { callOpenRouter, type OpenRouterMessage } from "./lib/openrouter";
import {
  scoreConcessionPivot,
  scoreReceipts,
  scoreZinger,
  scoreReframing,
  scorePreemption,
  scoreProvocativeQuestion,
  scorePersonalStory,
  scoreRuleOfThree,
  scorePeroration,
  scoreGishGallop,
  scoreStrategicInterruption,
} from "./lib/scoring";
import { internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";

/**
 * Gets all techniques for a debate
 */
export const getTechniques = query({
  args: {
    debateId: v.union(v.id("debates"), v.null()),
  },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    if (!args.debateId) {
      return [];
    }
    const debateId = args.debateId;
    return await ctx.db
      .query("techniques")
      .withIndex("by_debate", (q) => q.eq("debateId", debateId))
      .order("desc")
      .collect();
  },
});

/**
 * Gets all techniques for a debate (internal version)
 */
export const getTechniquesInternal = internalQuery({
  args: {
    debateId: v.id("debates"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("techniques")
      .withIndex("by_debate", (q) => q.eq("debateId", args.debateId))
      .order("desc")
      .collect();
  },
});

/**
 * Gets analysis for a debate
 */
export const getAnalysis = query({
  args: {
    debateId: v.union(v.id("debates"), v.null()),
  },
  returns: v.union(v.any(), v.null()),
  handler: async (ctx, args) => {
    if (!args.debateId) {
      return null;
    }
    const debateId = args.debateId;
    return await ctx.db
      .query("analyses")
      .withIndex("by_debate", (q) => q.eq("debateId", debateId))
      .first();
  },
});

/**
 * Stores analysis (internal mutation for use in actions)
 */
export const storeAnalysis = internalMutation({
  args: {
    debateId: v.id("debates"),
    userSummary: v.string(),
    aiSummary: v.string(),
    techniquesUsed: v.array(v.string()),
    userEffectivenessScores: v.object({
      concession_pivot: v.optional(v.number()),
      receipts: v.optional(v.number()),
      zinger: v.optional(v.number()),
      reframing: v.optional(v.number()),
      preemption: v.optional(v.number()),
      provocative_question: v.optional(v.number()),
      personal_story: v.optional(v.number()),
      rule_of_three: v.optional(v.number()),
      peroration: v.optional(v.number()),
      gish_gallop: v.optional(v.number()),
      strategic_interruption: v.optional(v.number()),
    }),
    aiEffectivenessScores: v.object({
      concession_pivot: v.optional(v.number()),
      receipts: v.optional(v.number()),
      zinger: v.optional(v.number()),
      reframing: v.optional(v.number()),
      preemption: v.optional(v.number()),
      provocative_question: v.optional(v.number()),
      personal_story: v.optional(v.number()),
      rule_of_three: v.optional(v.number()),
      peroration: v.optional(v.number()),
      gish_gallop: v.optional(v.number()),
      strategic_interruption: v.optional(v.number()),
    }),
    userImprovementTips: v.array(v.string()),
    aiImprovementTips: v.array(v.string()),
    missedOpportunities: v.optional(v.array(v.string())),
    keyMoments: v.optional(
      v.array(
        v.object({
          timestamp: v.number(),
          speaker: v.string(),
          text: v.string(),
          significance: v.string(),
        }),
      ),
    ),
    winner: v.optional(
      v.union(v.literal("user"), v.literal("ai"), v.literal("tie")),
    ),
    generatedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("analyses", {
      debateId: args.debateId,
      userSummary: args.userSummary,
      aiSummary: args.aiSummary,
      techniquesUsed: args.techniquesUsed,
      userEffectivenessScores: args.userEffectivenessScores,
      aiEffectivenessScores: args.aiEffectivenessScores,
      userImprovementTips: args.userImprovementTips,
      aiImprovementTips: args.aiImprovementTips,
      missedOpportunities: args.missedOpportunities,
      keyMoments: args.keyMoments,
      winner: args.winner,
      generatedAt: args.generatedAt || Date.now(),
    });
  },
});

/**
 * Logs a technique detected in real-time (called from Vapi function calls)
 */
export const logTechnique = mutation({
  args: {
    debateId: v.id("debates"),
    exchangeId: v.optional(v.id("exchanges")),
    speaker: v.union(v.literal("user"), v.literal("assistant")),
    technique: v.string(),
    text: v.string(),
    effectiveness: v.number(),
    context: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("techniques", {
      debateId: args.debateId,
      exchangeId: args.exchangeId,
      speaker: args.speaker,
      technique: args.technique,
      text: args.text,
      effectiveness: args.effectiveness,
      timestamp: Date.now(),
      context: args.context,
    });
  },
});

/**
 * Internal version of logTechnique for use in httpActions
 */
export const logTechniqueInternal = internalMutation({
  args: {
    debateId: v.id("debates"),
    exchangeId: v.optional(v.id("exchanges")),
    speaker: v.union(v.literal("user"), v.literal("assistant")),
    technique: v.string(),
    text: v.string(),
    effectiveness: v.number(),
    context: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("techniques", {
      debateId: args.debateId,
      exchangeId: args.exchangeId,
      speaker: args.speaker,
      technique: args.technique,
      text: args.text,
      effectiveness: args.effectiveness,
      timestamp: Date.now(),
      context: args.context,
    });
  },
});

/**
 * Stores detected techniques from post-exchange analysis
 */
export const storeDetectedTechniques = internalMutation({
  args: {
    debateId: v.id("debates"),
    exchangeId: v.optional(v.id("exchanges")),
    techniques: v.array(
      v.object({
        speaker: v.union(v.literal("user"), v.literal("assistant")),
        technique: v.string(),
        text: v.string(),
        effectiveness: v.number(),
        context: v.optional(v.string()),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();
    for (const tech of args.techniques) {
      await ctx.db.insert("techniques", {
        debateId: args.debateId,
        exchangeId: args.exchangeId,
        speaker: tech.speaker,
        technique: tech.technique,
        text: tech.text,
        effectiveness: tech.effectiveness,
        timestamp,
        context: tech.context,
      });
    }
  },
});

/**
 * Analyzes an exchange for techniques using OpenRouter
 * Called after each exchange completes
 */
export const analyzeExchangePostHoc = internalAction({
  args: {
    debateId: v.id("debates"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("[analyzeExchangePostHoc] Missing OPENROUTER_API_KEY");
      return;
    }

    // Get the latest exchanges for this debate
    const allExchanges: Array<Doc<"exchanges">> = await ctx.runQuery(
      internal.debates.getExchangesInternal,
      {
        debateId: args.debateId,
      },
    );
    const exchanges = allExchanges.slice(-10).reverse(); // Get last 10 exchanges

    if (exchanges.length === 0) {
      console.log("[analyzeExchangePostHoc] No exchanges found");
      return null;
    }

    // Get the most recent exchange pair (user + assistant)
    const recentExchanges = exchanges.slice(0, 2).reverse(); // Reverse to get chronological order
    const userExchange = recentExchanges.find(
      (e: Doc<"exchanges">) => e.speaker === "user",
    );
    const assistantExchange = recentExchanges.find(
      (e: Doc<"exchanges">) => e.speaker === "assistant",
    );

    if (!userExchange && !assistantExchange) {
      console.log("[analyzeExchangePostHoc] No valid exchange pair found");
      return;
    }

    // Build technique detection prompt
    const systemPrompt = `You are an expert debate analyst. Analyze the following debate exchange and detect which of these techniques were used:

1. **Concession & Pivot**: Acknowledging a fair point from the opponent, then pivoting to where they're wrong. Formula: "Here's where they're right. But here's where they're wrong."

2. **Receipts**: Deploying specific evidence, statistics, citations, or data to support an argument. Strategic evidence timing.

3. **Zinger**: A memorable, witty one-liner that crystallizes a point. Should be brief (under 20 words), clever, and impactful.

4. **Reframing**: Rejecting the premise of a loaded question or argument. Formula: "I don't accept the premise..."

5. **Preemption**: Anticipating and addressing an opponent's argument before they make it. Formula: "Now, my opponent is going to tell you..."

6. **Provocative Question**: Asking a question that forces the opponent into a defensive position or exposes a contradiction.

7. **Personal Story**: Humanizing abstract arguments with a relatable anecdote.

8. **Rule of Three**: Structuring arguments in groups of three for memorability.

9. **Peroration**: Ending with a high-energy, emotional summary to inspire or outrage.

10. **Gish Gallop Attack**: Overwhelming the opponent with a flood of weak arguments (or defending against it by picking the weakest one).

11. **Strategic Interruption**: Breaking the opponent's rhythm when they are rambling or misleading.

For each detected technique, identify:
- Which speaker used it (user or assistant)
- The exact text where it appears
- The technique name (use snake_case: concession_pivot, receipts, zinger, reframing, preemption, provocative_question, personal_story, rule_of_three, peroration, gish_gallop, strategic_interruption)

Return a JSON object with this structure:
{
  "userTechniques": [
    {
      "technique": "concession_pivot",
      "text": "exact text where technique appears",
      "context": "brief context"
    }
  ],
  "aiTechniques": [
    {
      "technique": "receipts",
      "text": "exact text where technique appears",
      "context": "brief context"
    }
  ]
}

Only include techniques that are clearly present. Be conservative - only detect if you're confident.`;

    const userPrompt = `Analyze this debate exchange:

${userExchange ? `USER: "${userExchange.text}"` : ""}
${assistantExchange ? `ASSISTANT: "${assistantExchange.text}"` : ""}

Detect which techniques were used.`;

    const messages: OpenRouterMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ];

    try {
      const siteUrl = process.env.SITE_URL || "https://debatclub.com";
      const response = await callOpenRouter(
        apiKey,
        messages,
        siteUrl,
        3,
        "anthropic/claude-sonnet-4.5",
      );

      const content = response.choices[0]?.message?.content;
      if (!content) {
        console.error("[analyzeExchangePostHoc] No content in response");
        return;
      }

      // Parse JSON response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("[analyzeExchangePostHoc] No JSON found in response");
        return;
      }

      const analysisResult = JSON.parse(jsonMatch[0]);

      // Score each detected technique and store
      const techniquesToStore: Array<{
        speaker: "user" | "assistant";
        technique: string;
        text: string;
        effectiveness: number;
        context?: string;
      }> = [];

      // Helper to process techniques
      const processTechniques = (
        techniques: any[],
        speaker: "user" | "assistant",
      ) => {
        if (!Array.isArray(techniques)) return;

        for (const tech of techniques) {
          let effectiveness = 1;
          switch (tech.technique) {
            case "concession_pivot":
              effectiveness = scoreConcessionPivot(tech.text);
              break;
            case "receipts":
              effectiveness = scoreReceipts(tech.text);
              break;
            case "zinger":
              effectiveness = scoreZinger(tech.text);
              break;
            case "reframing":
              effectiveness = scoreReframing(tech.text);
              break;
            case "preemption":
              effectiveness = scorePreemption(tech.text);
              break;
            case "provocative_question":
              effectiveness = scoreProvocativeQuestion(tech.text);
              break;
            case "personal_story":
              effectiveness = scorePersonalStory(tech.text);
              break;
            case "rule_of_three":
              effectiveness = scoreRuleOfThree(tech.text);
              break;
            case "peroration":
              effectiveness = scorePeroration(tech.text);
              break;
            case "gish_gallop":
              effectiveness = scoreGishGallop(tech.text);
              break;
            case "strategic_interruption":
              effectiveness = scoreStrategicInterruption(tech.text);
              break;
            default:
              effectiveness = 1;
              break;
          }

          techniquesToStore.push({
            speaker,
            technique: tech.technique,
            text: tech.text,
            effectiveness,
            context: tech.context,
          });
        }
      };

      processTechniques(analysisResult.userTechniques, "user");
      processTechniques(analysisResult.aiTechniques, "assistant");

      // Store detected techniques
      if (techniquesToStore.length > 0) {
        const exchangeId = userExchange?._id || assistantExchange?._id;
        await ctx.runMutation(internal.analysis.storeDetectedTechniques, {
          debateId: args.debateId,
          exchangeId,
          techniques: techniquesToStore,
        });
      }
    } catch (error) {
      console.error("[analyzeExchangePostHoc] Error:", error);
    }
    return null;
  },
});

/**
 * Generates comprehensive post-debate analysis
 */
export const generateFullAnalysis = internalAction({
  args: {
    debateId: v.id("debates"),
  },
  returns: v.union(v.id("analyses"), v.null()),
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("[generateFullAnalysis] Missing OPENROUTER_API_KEY");
      return null;
    }

    // Get debate details
    const debate: Doc<"debates"> | null = await ctx.runQuery(
      internal.debates.getInternal,
      {
        debateId: args.debateId,
      },
    );

    if (!debate) {
      console.error("[generateFullAnalysis] Debate not found");
      return null;
    }

    // Get all exchanges
    const exchanges: Array<Doc<"exchanges">> = await ctx.runQuery(
      internal.debates.getExchangesInternal,
      {
        debateId: args.debateId,
      },
    );

    // Get all detected techniques - need internal version
    const techniques: Array<Doc<"techniques">> = await ctx.runQuery(
      internal.analysis.getTechniquesInternal,
      {
        debateId: args.debateId,
      },
    );

    // Build analysis prompt
    const systemPrompt = `You are an expert debate coach analyzing a debate performance. Provide constructive feedback and improvement tips.

Analyze the debate transcript and detected techniques. Generate:
1. A brief summary of the USER'S performance
2. A brief summary of the AI'S performance
3. List of techniques used
4. Average effectiveness scores for each technique type
5. 3-5 actionable improvement tips for the USER
6. 3-5 actionable improvement tips for the AI (how it could have debated better)
7. 3-5 missed opportunities where the USER could have used a technique but didn't
8. 2-3 key moments that were turning points in the debate
9. Determination of who won the debate (user, ai, or tie) based on argumentation quality

Return JSON with this structure:
{
  "userSummary": "User performance summary...",
  "aiSummary": "AI performance summary...",
  "techniquesUsed": ["concession_pivot", "receipts", "zinger", "reframing", "preemption", "provocative_question", "personal_story", "rule_of_three", "peroration", "gish_gallop", "strategic_interruption"],
  "userEffectivenessScores": {
    "concession_pivot": 7.5,
    "receipts": 6.0,
    "zinger": 8.0,
    "reframing": 7.0,
    "preemption": 8.0,
    "provocative_question": 7.5,
    "personal_story": 8.5,
    "rule_of_three": 7.0,
    "peroration": 8.0,
    "gish_gallop": 6.0,
    "strategic_interruption": 7.0
  },
  "aiEffectivenessScores": {
    "concession_pivot": 8.0,
    "receipts": 7.0,
    "zinger": 9.0,
    "reframing": 7.5,
    "preemption": 8.5,
    "provocative_question": 8.0,
    "personal_story": 9.0,
    "rule_of_three": 7.5,
    "peroration": 8.5,
    "gish_gallop": 6.5,
    "strategic_interruption": 7.5
  },
  "userImprovementTips": [
    "User Tip 1",
    "User Tip 2"
  ],
  "aiImprovementTips": [
    "AI Tip 1",
    "AI Tip 2"
  ],
  "missedOpportunities": [
    "When the AI said X, you could have used a Concession & Pivot to acknowledge their point but pivot to Y",
    "At timestamp Z, there was an opportunity to use Receipts by citing specific evidence"
  ],
  "keyMoments": [
    {
      "timestamp": 12345,
      "speaker": "user",
      "text": "excerpt from the debate",
      "significance": "This was a turning point because..."
    }
  ],
  "winner": "user"
}`;

    const transcript = exchanges
      .map((e: Doc<"exchanges">) => `${e.speaker.toUpperCase()}: ${e.text}`)
      .join("\n\n");

    const techniquesSummary = techniques
      .map(
        (t: Doc<"techniques">) =>
          `${t.speaker} used ${t.technique} (effectiveness: ${t.effectiveness}/10)`,
      )
      .join("\n");

    const userPrompt = `Debate Topic: ${debate.topic}
User Position: ${debate.userPosition}
AI Position: ${debate.aiPosition}

Transcript:
${transcript}

Detected Techniques:
${techniquesSummary || "None detected"}

Provide comprehensive analysis.`;

    const messages: OpenRouterMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ];

    try {
      const siteUrl = process.env.SITE_URL || "https://oratorprep.com";
      const response = await callOpenRouter(
        apiKey,
        messages,
        siteUrl,
        3,
        "anthropic/claude-sonnet-4.5",
      );

      const content = response.choices[0]?.message?.content;
      if (!content) {
        console.error("[generateFullAnalysis] No content in response");
        return null;
      }

      // Parse JSON response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("[generateFullAnalysis] No JSON found in response");
        return null;
      }

      const analysisResult = JSON.parse(jsonMatch[0]);

      // Calculate average effectiveness scores if not provided
      const calculateAvgScores = (speaker: "user" | "assistant") => {
        const scores: Record<string, number> = {};

        const techniqueTypes = [
          "concession_pivot",
          "receipts",
          "zinger",
          "reframing",
          "preemption",
          "provocative_question",
          "personal_story",
          "rule_of_three",
          "peroration",
          "gish_gallop",
          "strategic_interruption",
        ] as const;

        for (const techType of techniqueTypes) {
          const techsOfType = techniques.filter(
            (t: Doc<"techniques">) =>
              t.technique === techType && t.speaker === speaker,
          );
          if (techsOfType.length > 0) {
            const avg =
              techsOfType.reduce(
                (sum: number, t: Doc<"techniques">) => sum + t.effectiveness,
                0,
              ) / techsOfType.length;
            scores[techType] = Math.round(avg * 10) / 10; // Round to 1 decimal
          }
        }
        return scores;
      };

      const userAvgScores = calculateAvgScores("user");
      const aiAvgScores = calculateAvgScores("assistant");

      // Store analysis - need to create an internal mutation for this
      const analysisId: Id<"analyses"> = await ctx.runMutation(
        internal.analysis.storeAnalysis,
        {
          debateId: args.debateId,
          userSummary: analysisResult.userSummary || "Analysis generated",
          aiSummary: analysisResult.aiSummary || "AI analysis generated",
          techniquesUsed:
            analysisResult.techniquesUsed ||
            Array.from(
              new Set(techniques.map((t: Doc<"techniques">) => t.technique)),
            ),
          userEffectivenessScores: {
            concession_pivot:
              analysisResult.userEffectivenessScores?.concession_pivot ||
              userAvgScores.concession_pivot,
            receipts:
              analysisResult.userEffectivenessScores?.receipts ||
              userAvgScores.receipts,
            zinger:
              analysisResult.userEffectivenessScores?.zinger ||
              userAvgScores.zinger,
            reframing:
              analysisResult.userEffectivenessScores?.reframing ||
              userAvgScores.reframing,
            preemption:
              analysisResult.userEffectivenessScores?.preemption ||
              userAvgScores.preemption,
            provocative_question:
              analysisResult.userEffectivenessScores?.provocative_question ||
              userAvgScores.provocative_question,
            personal_story:
              analysisResult.userEffectivenessScores?.personal_story ||
              userAvgScores.personal_story,
            rule_of_three:
              analysisResult.userEffectivenessScores?.rule_of_three ||
              userAvgScores.rule_of_three,
            peroration:
              analysisResult.userEffectivenessScores?.peroration ||
              userAvgScores.peroration,
            gish_gallop:
              analysisResult.userEffectivenessScores?.gish_gallop ||
              userAvgScores.gish_gallop,
            strategic_interruption:
              analysisResult.userEffectivenessScores?.strategic_interruption ||
              userAvgScores.strategic_interruption,
          },
          aiEffectivenessScores: {
            concession_pivot:
              analysisResult.aiEffectivenessScores?.concession_pivot ||
              aiAvgScores.concession_pivot,
            receipts:
              analysisResult.aiEffectivenessScores?.receipts ||
              aiAvgScores.receipts,
            zinger:
              analysisResult.aiEffectivenessScores?.zinger ||
              aiAvgScores.zinger,
            reframing:
              analysisResult.aiEffectivenessScores?.reframing ||
              aiAvgScores.reframing,
            preemption:
              analysisResult.aiEffectivenessScores?.preemption ||
              aiAvgScores.preemption,
            provocative_question:
              analysisResult.aiEffectivenessScores?.provocative_question ||
              aiAvgScores.provocative_question,
            personal_story:
              analysisResult.aiEffectivenessScores?.personal_story ||
              aiAvgScores.personal_story,
            rule_of_three:
              analysisResult.aiEffectivenessScores?.rule_of_three ||
              aiAvgScores.rule_of_three,
            peroration:
              analysisResult.aiEffectivenessScores?.peroration ||
              aiAvgScores.peroration,
            gish_gallop:
              analysisResult.aiEffectivenessScores?.gish_gallop ||
              aiAvgScores.gish_gallop,
            strategic_interruption:
              analysisResult.aiEffectivenessScores?.strategic_interruption ||
              aiAvgScores.strategic_interruption,
          },
          userImprovementTips: analysisResult.userImprovementTips || [],
          aiImprovementTips: analysisResult.aiImprovementTips || [],
          missedOpportunities: analysisResult.missedOpportunities,
          keyMoments: analysisResult.keyMoments,
          winner: analysisResult.winner,
        },
      );

      return analysisId;
    } catch (error) {
      console.error("[generateFullAnalysis] Error:", error);
      return null;
    }
  },
});
