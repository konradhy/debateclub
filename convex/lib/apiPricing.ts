/**
 * API Pricing Configuration
 * 
 * Centralized pricing data for all external API services used in the system.
 * Prices are in USD and updated as of December 2025.
 * 
 * Sources:
 * - OpenRouter: Pass-through pricing from providers (no markup)
 * - Vapi: $0.05 per minute platform fee + provider costs
 * - Firecrawl: Credit-based pricing system
 * - Gemini: Google AI API pricing
 */

// ============================================================================
// OPENROUTER PRICING
// ============================================================================

/**
 * OpenRouter pricing for models used in the system.
 * Prices are per 1M tokens in USD.
 * OpenRouter passes through provider pricing without markup.
 */
export const OPENROUTER_PRICING = {
    // Anthropic Claude models
    "anthropic/claude-sonnet-4.5": {
        inputPrice: 3.00,   // $3.00 per 1M input tokens
        outputPrice: 15.00, // $15.00 per 1M output tokens
    },
    "anthropic/claude-3-opus": {
        inputPrice: 15.00,  // $15.00 per 1M input tokens
        outputPrice: 75.00, // $75.00 per 1M output tokens
    },
    "anthropic/claude-3-haiku": {
        inputPrice: 0.25,   // $0.25 per 1M input tokens
        outputPrice: 1.25,  // $1.25 per 1M output tokens
    },

    // OpenAI models
    "openai/gpt-4o": {
        inputPrice: 2.50,   // $2.50 per 1M input tokens
        outputPrice: 10.00, // $10.00 per 1M output tokens
    },
    "openai/gpt-4o-mini": {
        inputPrice: 0.15,   // $0.15 per 1M input tokens
        outputPrice: 0.60,  // $0.60 per 1M output tokens
    },

    // Google models (via OpenRouter)
    "google/gemini-pro": {
        inputPrice: 0.50,   // $0.50 per 1M input tokens
        outputPrice: 1.50,  // $1.50 per 1M output tokens
    },
} as const;

// ============================================================================
// VAPI PRICING
// ============================================================================

/**
 * Vapi pricing structure.
 * Base platform fee plus pass-through costs for AI services.
 * 
 * Note: Vapi doesn't expose model-specific usage data in webhooks.
 * We only get call duration, so we use average cost estimates.
 */
export const VAPI_PRICING = {
    // Platform hosting fee
    platformFeePerMinute: 0.05, // $0.05 per minute

    // Average total cost per minute (all services included)
    // This includes STT, TTS, LLM (avg model), and telephony
    averageCostPerMinute: 0.20, // $0.20 per minute (conservative estimate)

    // Cost range for reference
    costRange: {
        min: 0.13, // $0.13/min (basic usage)
        max: 0.31, // $0.31/min (heavy usage)
    },

    // Note: Model differences (Claude vs GPT-4o) are ~$0.01-0.02/min
    // Since Vapi doesn't expose model usage data, we use average pricing
} as const;

// ============================================================================
// FIRECRAWL PRICING
// ============================================================================

/**
 * Firecrawl pricing based on credit system.
 * 1 credit = 1 page scraped
 */
export const FIRECRAWL_PRICING = {
    // Cost per credit (page scraped)
    costPerCredit: 0.003, // $0.003 per page/request

    // Plan-based pricing for reference
    plans: {
        free: {
            credits: 500,
            costPerMonth: 0,
        },
        hobby: {
            credits: 3000,
            costPerMonth: 16,
            extraCreditCost: 0.009, // $9 per 1000 extra credits
        },
        standard: {
            credits: 100000,
            costPerMonth: 83,
            extraCreditCost: 0.0008, // Estimated based on volume
        },
    },
} as const;

// ============================================================================
// GEMINI API PRICING
// ============================================================================

/**
 * Google Gemini API pricing.
 * Prices are per 1M tokens in USD.
 * 
 * Note: Deep Research Agent uses Interactions API with special pricing.
 */
export const GEMINI_PRICING = {
    // Gemini 2.5 Pro (most commonly used)
    "gemini-2.5-pro": {
        inputPrice: 1.25,   // $1.25 per 1M input tokens
        outputPrice: 10.00, // $10.00 per 1M output tokens
    },

    // Gemini 2.5 Flash (faster, cheaper)
    "gemini-2.5-flash": {
        inputPrice: 0.50,   // $0.50 per 1M input tokens
        outputPrice: 3.00,  // $3.00 per 1M output tokens
    },

    // Gemini 3 Flash Preview (used in geminiSearch.ts)
    "gemini-3-flash-preview": {
        inputPrice: 0.50,   // $0.50 per 1M input tokens (estimated)
        outputPrice: 3.00,  // $3.00 per 1M output tokens (estimated)
    },

    // Gemini 3 Pro (latest, most expensive)
    "gemini-3-pro": {
        inputPrice: 2.00,   // $2.00 per 1M input tokens (≤200k context)
        outputPrice: 12.00, // $12.00 per 1M output tokens (≤200k context)
        inputPriceLongContext: 4.00,  // $4.00 per 1M input tokens (>200k context)
        outputPriceLongContext: 18.00, // $18.00 per 1M output tokens (>200k context)
    },

    // Deep Research Agent (Interactions API)
    // Uses 'deep-research-pro-preview-12-2025' agent
    "deep-research-pro-preview-12-2025": {
        // Based on actual billing data from Google Cloud Console
        // Deep Research = Gemini 3 Pro tokens + Search grounding queries

        gemini3ProTokens: {
            inputPrice: 2.00,   // $2.00 per 1M input tokens
            outputPrice: 12.00, // $12.00 per 1M output tokens (estimated)
        },

        searchGroundingQueries: {
            pricePerQuery: 0.035, // $35 per 1000 queries = $0.035 per query
        },

        // Estimated cost per individual session (not total billing):
        // Simple: ~200K tokens + 20 searches = $0.40 + $0.70 = $1.10
        // Complex: ~1.5M tokens + 80 searches = $3.00 + $2.80 = $5.80
        estimatedCostPerSession: {
            min: 0.50,  // Simple research tasks
            max: 6.00,  // Complex multi-step research
        },

        note: "Deep Research costs = Gemini 3 Pro token usage + search grounding queries. Visible in Google Cloud Console billing with SKU grouping.",
    },
} as const;

// ============================================================================
// UNIFIED PRICING INTERFACE
// ============================================================================

/**
 * Unified pricing configuration for all services.
 * This is the main export used by cost calculation functions.
 */
export const API_PRICING = {
    openrouter: OPENROUTER_PRICING,
    vapi: VAPI_PRICING,
    firecrawl: FIRECRAWL_PRICING,
    gemini: GEMINI_PRICING,
} as const;

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type OpenRouterModel = keyof typeof OPENROUTER_PRICING;
export type GeminiModel = keyof typeof GEMINI_PRICING;
export type ServiceType = keyof typeof API_PRICING;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get pricing for a specific OpenRouter model.
 */
export function getOpenRouterPricing(model: string) {
    return OPENROUTER_PRICING[model as OpenRouterModel] || null;
}

/**
 * Get pricing for a specific Gemini model.
 */
export function getGeminiPricing(model: string) {
    return GEMINI_PRICING[model as GeminiModel] || null;
}

/**
 * Check if a model is supported for cost calculation.
 */
export function isSupportedModel(service: ServiceType, model: string): boolean {
    switch (service) {
        case 'openrouter':
            return model in OPENROUTER_PRICING;
        case 'gemini':
            return model in GEMINI_PRICING;
        case 'vapi':
        case 'firecrawl':
            return true; // These services don't use model-specific pricing
        default:
            return false;
    }
}

/**
 * Get all supported models for a service.
 */
export function getSupportedModels(service: ServiceType): string[] {
    switch (service) {
        case 'openrouter':
            return Object.keys(OPENROUTER_PRICING);
        case 'gemini':
            return Object.keys(GEMINI_PRICING);
        case 'vapi':
        case 'firecrawl':
            return []; // These services don't use model-specific pricing
        default:
            return [];
    }
}