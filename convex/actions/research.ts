"use node";
import { action } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { searchAndScrape } from "../lib/firecrawl";
import { callOpenRouter } from "../lib/openrouter";
import { AI_MODELS, RESEARCH_SETTINGS } from "../lib/aiConfig";

const SITE_URL = "https://debateclub.app";

/**
 * Analyzes an article in depth using AI.
 * Creates a comprehensive analysis (~800 words) highlighting:
 * - Key arguments and claims
 * - Statistics and evidence
 * - Perspective and bias
 * - How to use this in debate
 */
async function analyzeArticle(
  apiKey: string,
  title: string,
  content: string,
  topic: string,
): Promise<string> {
  // Truncate content if too long
  const maxContentLength = RESEARCH_SETTINGS.MAX_ARTICLE_CONTENT_LENGTH;
  const truncatedContent =
    content.length > maxContentLength
      ? content.substring(0, maxContentLength) + "\n\n[Content truncated...]"
      : content;

  const prompt = `You are a debate research analyst. Analyze this article in depth for someone preparing to debate the topic: "${topic}"

Your analysis should be approximately ${RESEARCH_SETTINGS.ARTICLE_ANALYSIS_WORD_COUNT} words and cover:

## Key Arguments & Claims
- What are the main arguments or positions presented?
- What claims does the author make?
- What evidence supports these claims?

## Statistics & Evidence
- Extract ALL specific statistics, numbers, percentages, dates
- Note any expert quotes with attribution
- Identify case studies or examples mentioned

## Source Perspective
- What is the author's apparent stance on this issue?
- What bias might be present?
- How credible is this source?

## Debate Utility
- How can this support a PRO position?
- How can this support a CON position?
- What counter-arguments does this article acknowledge or leave open?
- Specific quotes that could be used as "receipts"

Article Title: ${title}

Article Content:
${truncatedContent}

Return ONLY a JSON object:
{
  "analysis": "Your detailed ${RESEARCH_SETTINGS.ARTICLE_ANALYSIS_WORD_COUNT}-word analysis here with clear section headers using markdown ##"
}`;

  try {
    const response = await callOpenRouter(
      apiKey,
      [{ role: "user", content: prompt }],
      SITE_URL,
      2,
      AI_MODELS.ARTICLE_SUMMARIZATION, // Using the same model but with longer output
    );

    const responseContent = response.choices[0]?.message?.content;
    if (!responseContent) {
      console.warn("[analyzeArticle] No content in response, using fallback");
      return `## Summary\n${content.substring(0, 500)}...`;
    }

    // Parse JSON response
    const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn("[analyzeArticle] No JSON found, using response as-is");
      return responseContent.substring(0, 2000);
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return parsed.analysis || `## Summary\n${content.substring(0, 500)}...`;
  } catch (error) {
    console.error("[analyzeArticle] Error:", error);
    return `## Summary\n${content.substring(0, 500)}...`;
  }
}

export const gatherEvidence = action({
  args: {
    opponentId: v.id("opponents"),
    topic: v.string(),
    articleCount: v.optional(v.number()), // Override default article count
  },
  returns: v.array(
    v.object({
      title: v.string(),
      url: v.string(),
      content: v.string(),
      summary: v.string(),
      source: v.string(),
      publishedDate: v.optional(v.string()),
    }),
  ),
  handler: async (ctx, args) => {
    const firecrawlKey = process.env.FIRECRAWL_API_KEY;
    if (!firecrawlKey) {
      throw new Error("FIRECRAWL_API_KEY is not set");
    }

    const openrouterKey = process.env.OPENROUTER_API_KEY;
    if (!openrouterKey) {
      throw new Error("OPENROUTER_API_KEY is not set");
    }

    // Use provided count or default from config
    const articleCount =
      args.articleCount ?? RESEARCH_SETTINGS.FIRECRAWL_ARTICLE_COUNT;

    console.log(
      `[gatherEvidence] Fetching ${articleCount} articles for topic: ${args.topic}`,
    );

    // 1. Search and scrape
    const results = await searchAndScrape(
      args.topic,
      firecrawlKey,
      articleCount,
    );

    console.log(`[gatherEvidence] Got ${results.length} results, analyzing...`);

    // 2. Analyze each article using AI (with detailed analysis)
    const articles = await Promise.all(
      results.map(async (r, index) => {
        console.log(
          `[gatherEvidence] Analyzing article ${index + 1}/${results.length}: ${r.title}`,
        );
        const analysis = await analyzeArticle(
          openrouterKey,
          r.title,
          r.content,
          args.topic,
        );

        return {
          title: r.title,
          url: r.url,
          content: r.content,
          summary: analysis, // This is now the full analysis
          source: r.source || "Web",
          publishedDate: r.publishedDate,
        };
      }),
    );

    // 3. Store in database via mutation
    await ctx.runMutation(internal.research.store, {
      opponentId: args.opponentId,
      query: args.topic,
      articles,
    });

    console.log(`[gatherEvidence] Stored ${articles.length} analyzed articles`);

    return articles;
  },
});
