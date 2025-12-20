/**
 * AI Model Configuration
 *
 * Central configuration for all AI model usage throughout the application.
 * Edit the MODEL constants to swap models without changing code elsewhere.
 *
 * All AI calls go through OpenRouter API (convex/lib/openrouter.ts).
 */

// ============================================================================
// MODEL CONFIGURATION
// ============================================================================

/**
 * Models used for different purposes. Change these to swap models.
 *
 * Available OpenRouter models:
 * - "openai/gpt-4o"              - Best quality, higher cost
 * - "openai/gpt-4o-mini"         - Good quality, lower cost
 * - "anthropic/claude-sonnet-4.5" - Good balance of quality/cost
 * - "anthropic/claude-3-opus"     - Highest quality, highest cost
 * - "anthropic/claude-3-haiku"    - Fast, low cost
 * - "google/gemini-pro"           - Alternative option
 */

// ============================================================================
// RESEARCH SETTINGS
// ============================================================================

/**
 * Configuration for Firecrawl web research.
 * Adjust these values to control research depth.
 */
export const RESEARCH_SETTINGS = {
  /**
   * Number of articles to fetch from Firecrawl.
   * Higher = more comprehensive research but slower and more expensive.
   * Default: 15 articles
   */
  FIRECRAWL_ARTICLE_COUNT: 15,

  /**
   * Maximum content length per article (characters).
   * Truncates very long articles to manage token costs.
   */
  MAX_ARTICLE_CONTENT_LENGTH: 8000,

  /**
   * Target word count for article analysis.
   * Each article gets a detailed analysis of this length.
   */
  ARTICLE_ANALYSIS_WORD_COUNT: 800,
} as const;

export const AI_MODELS = {
  /**
   * Used for: Prep material generation (openings, arguments, receipts, zingers, closings, opponent intel)
   * Location: convex/actions/prepGeneration.ts
   * User Journey: Step 6 (Prep Review) - when user clicks "Generate Strategy"
   * Quality Priority: HIGH - User-facing content that needs to be well-written
   * Cost: ~$0.01-0.03 per generation batch
   */
  PREP_GENERATION: "openai/gpt-4o",

  /**
   * Used for: Real-time technique detection during live debates
   * Location: convex/analysis.ts (analyzeExchangePostHoc)
   * User Journey: Step 3 (Live Debate) - after each exchange
   * Quality Priority: MEDIUM - Detection accuracy matters but speed is critical
   * Cost: ~$0.001-0.003 per exchange
   */
  TECHNIQUE_DETECTION: "anthropic/claude-sonnet-4.5",

  /**
   * Used for: Post-debate comprehensive analysis
   * Location: convex/analysis.ts (generateFullAnalysis)
   * User Journey: Step 4 (Analysis) - when debate ends
   * Quality Priority: HIGH - Detailed feedback for user improvement
   * Cost: ~$0.01-0.02 per analysis
   */
  POST_DEBATE_ANALYSIS: "anthropic/claude-sonnet-4.5",

  /**
   * Used for: Summarizing scraped web articles from Firecrawl
   * Location: convex/actions/research.ts
   * User Journey: Step 5 (Opponent Setup) - when gathering evidence
   * Quality Priority: MEDIUM - Summaries should be accurate but concise
   * Cost: ~$0.001-0.002 per article
   */
  ARTICLE_SUMMARIZATION: "openai/gpt-4o-mini",

  /**
   * Used for: Processing user-provided research material
   * Location: convex/actions/prepGeneration.ts (processUserResearch)
   * User Journey: Step 5-6 - when user pastes research material
   * Quality Priority: HIGH - Need to extract valuable arguments and evidence
   * Cost: ~$0.01-0.02 per processing
   */
  RESEARCH_PROCESSING: "openai/gpt-4o",

  /**
   * Used for: RAG-powered research chatbot
   * Location: convex/prepChat.ts (sendMessage)
   * User Journey: Step 6 - "Ask AI" tab in Prep Review
   * Quality Priority: HIGH - User-facing conversational AI
   * Cost: ~$0.005-0.015 per message
   */
  PREP_CHAT: "openai/gpt-4o",
} as const;

export type AIModelKey = keyof typeof AI_MODELS;
export type AIModel = (typeof AI_MODELS)[AIModelKey];

// ============================================================================
// AI CALL REGISTRY
// ============================================================================

/**
 * Complete registry of all AI calls in the application.
 * Useful for auditing, cost tracking, and understanding the system.
 */
export const AI_CALL_REGISTRY = [
  {
    id: "prep-openings",
    name: "Generate Opening Statements",
    model: AI_MODELS.PREP_GENERATION,
    file: "convex/actions/prepGeneration.ts",
    function: "generateOpenings",
    userJourneyStep: "6 - Prep Review",
    trigger: "User clicks 'Generate Strategy'",
    inputTokensEstimate: "~500",
    outputTokensEstimate: "~1000",
    description:
      "Creates 3 opening statement options with different styles (Personal Story, Provocative Question, Bold Statement)",
  },
  {
    id: "prep-frames",
    name: "Generate Argument Frames",
    model: AI_MODELS.PREP_GENERATION,
    file: "convex/actions/prepGeneration.ts",
    function: "generateFrames",
    userJourneyStep: "6 - Prep Review",
    trigger: "User clicks 'Generate Strategy'",
    inputTokensEstimate: "~800",
    outputTokensEstimate: "~2000",
    description:
      "Creates 4-5 argument frames with evidence links, emotional core, and deployment guidance",
  },
  {
    id: "prep-receipts",
    name: "Generate Receipts (Evidence)",
    model: AI_MODELS.PREP_GENERATION,
    file: "convex/actions/prepGeneration.ts",
    function: "generateReceipts",
    userJourneyStep: "6 - Prep Review",
    trigger: "User clicks 'Generate Strategy'",
    inputTokensEstimate: "~800",
    outputTokensEstimate: "~1500",
    description:
      "Creates statistics, quotes, and case studies with deployment guidance",
  },
  {
    id: "prep-zingers",
    name: "Generate Zingers",
    model: AI_MODELS.PREP_GENERATION,
    file: "convex/actions/prepGeneration.ts",
    function: "generateZingers",
    userJourneyStep: "6 - Prep Review",
    trigger: "User clicks 'Generate Strategy'",
    inputTokensEstimate: "~600",
    outputTokensEstimate: "~800",
    description:
      "Creates memorable one-liners with context and timing guidance",
  },
  {
    id: "prep-closings",
    name: "Generate Closing Statements",
    model: AI_MODELS.PREP_GENERATION,
    file: "convex/actions/prepGeneration.ts",
    function: "generateClosings",
    userJourneyStep: "6 - Prep Review",
    trigger: "User clicks 'Generate Strategy'",
    inputTokensEstimate: "~500",
    outputTokensEstimate: "~1000",
    description:
      "Creates 3 closing statement options (Call to Action, Emotional Appeal, Summary)",
  },
  {
    id: "prep-opponent-intel",
    name: "Generate Opponent Intelligence",
    model: AI_MODELS.PREP_GENERATION,
    file: "convex/actions/prepGeneration.ts",
    function: "generateOpponentIntel",
    userJourneyStep: "6 - Prep Review",
    trigger: "User clicks 'Generate Strategy'",
    inputTokensEstimate: "~700",
    outputTokensEstimate: "~1500",
    description: "Predicts opponent arguments and generates counter-strategies",
  },
  {
    id: "technique-detection",
    name: "Real-time Technique Detection",
    model: AI_MODELS.TECHNIQUE_DETECTION,
    file: "convex/analysis.ts",
    function: "analyzeExchangePostHoc",
    userJourneyStep: "3 - Live Debate",
    trigger: "After each exchange (user + AI turn)",
    inputTokensEstimate: "~400",
    outputTokensEstimate: "~300",
    description:
      "Detects which of 11 debate techniques were used in the exchange",
  },
  {
    id: "full-analysis",
    name: "Post-Debate Analysis",
    model: AI_MODELS.POST_DEBATE_ANALYSIS,
    file: "convex/analysis.ts",
    function: "generateFullAnalysis",
    userJourneyStep: "4 - Analysis",
    trigger: "When debate ends",
    inputTokensEstimate: "~2000",
    outputTokensEstimate: "~1500",
    description:
      "Comprehensive analysis with summaries, scores, tips, missed opportunities, key moments, winner",
  },
  {
    id: "article-summarization",
    name: "Summarize Web Articles",
    model: AI_MODELS.ARTICLE_SUMMARIZATION,
    file: "convex/actions/research.ts",
    function: "gatherEvidence (summarizeArticle helper)",
    userJourneyStep: "5 - Opponent Setup",
    trigger: "After Firecrawl scrapes articles",
    inputTokensEstimate: "~1500",
    outputTokensEstimate: "~200",
    description:
      "Creates concise summaries of scraped web articles for the research tab",
  },
  {
    id: "research-processing",
    name: "Process User Research",
    model: AI_MODELS.RESEARCH_PROCESSING,
    file: "convex/actions/prepGeneration.ts",
    function: "processUserResearch",
    userJourneyStep: "5-6 - Opponent Setup / Prep Review",
    trigger: "User pastes research material",
    inputTokensEstimate: "~3000",
    outputTokensEstimate: "~2000",
    description:
      "Extracts arguments, receipts, and potential openers from user-provided research text",
  },
  {
    id: "prep-chat",
    name: "Research Chatbot",
    model: AI_MODELS.PREP_CHAT,
    file: "convex/prepChat.ts",
    function: "sendMessage",
    userJourneyStep: "6 - Prep Review",
    trigger: "User sends a message in the 'Ask AI' chat tab",
    inputTokensEstimate: "~2000",
    outputTokensEstimate: "~500",
    description:
      "RAG-powered chatbot that answers questions about research materials and debate strategy",
  },
] as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Gets the model for a specific purpose.
 * Use this instead of hardcoding model strings.
 */
export function getModel(purpose: AIModelKey): string {
  return AI_MODELS[purpose];
}

/**
 * Estimates cost for a specific AI call.
 * Note: These are rough estimates. Actual costs vary by model and usage.
 */
export function estimateCost(callId: string): { min: number; max: number } {
  const call = AI_CALL_REGISTRY.find((c) => c.id === callId);
  if (!call) return { min: 0, max: 0 };

  // Rough cost estimation based on model
  const modelCosts: Record<string, number> = {
    "openai/gpt-4o": 0.00001, // per token estimate
    "openai/gpt-4o-mini": 0.000001,
    "anthropic/claude-sonnet-4.5": 0.000005,
    "anthropic/claude-3-opus": 0.00003,
    "anthropic/claude-3-haiku": 0.0000005,
  };

  const costPerToken = modelCosts[call.model] || 0.00001;
  const inputTokens = parseInt(call.inputTokensEstimate.replace(/[^0-9]/g, ""));
  const outputTokens = parseInt(
    call.outputTokensEstimate.replace(/[^0-9]/g, ""),
  );

  const totalTokens = inputTokens + outputTokens;
  return {
    min: totalTokens * costPerToken * 0.5,
    max: totalTokens * costPerToken * 2,
  };
}
