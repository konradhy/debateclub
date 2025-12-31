/**
 * Cost Calculation Helper Functions
 * 
 * Calculates costs for all API services based on usage data and pricing tables.
 * All costs are returned in USD cents for precise storage and calculation.
 */

import { API_PRICING, getOpenRouterPricing } from "./apiPricing";

// ============================================================================
// OPENROUTER COST CALCULATION
// ============================================================================

/**
 * Calculate cost for OpenRouter API calls based on token usage.
 * 
 * @param model - The model identifier (e.g., "anthropic/claude-sonnet-4.5")
 * @param inputTokens - Number of input tokens used
 * @param outputTokens - Number of output tokens generated
 * @returns Cost in USD cents, or 0 if model not found
 */
export function calculateOpenRouterCost(
    model: string,
    inputTokens: number,
    outputTokens: number
): number {
    const pricing = getOpenRouterPricing(model);
    if (!pricing) {
        console.warn(`Unknown OpenRouter model: ${model}`);
        return 0;
    }

    // Ensure non-negative values
    const safeInputTokens = Math.max(0, inputTokens || 0);
    const safeOutputTokens = Math.max(0, outputTokens || 0);

    // Calculate cost per token type (pricing is per 1M tokens)
    const inputCost = (safeInputTokens / 1_000_000) * pricing.inputPrice;
    const outputCost = (safeOutputTokens / 1_000_000) * pricing.outputPrice;

    // Convert to cents and round to avoid floating point precision issues
    return Math.round((inputCost + outputCost) * 100);
}

// ============================================================================
// VAPI COST CALCULATION
// ============================================================================

/**
 * Calculate cost for Vapi calls based on duration.
 * 
 * @param durationSeconds - Call duration in seconds
 * @returns Cost in USD cents
 */
export function calculateVapiCost(durationSeconds: number): number {
    // Ensure non-negative duration
    const safeDuration = Math.max(0, durationSeconds || 0);

    // Convert to minutes
    const minutes = safeDuration / 60;

    // Use average cost per minute (includes all Vapi services)
    const cost = minutes * API_PRICING.vapi.averageCostPerMinute;

    // Convert to cents and round
    return Math.round(cost * 100);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Calculate cost for any service based on service type and usage data.
 * This is a convenience function that routes to the appropriate calculator.
 * 
 * @param service - The service type
 * @param usage - Usage data object with service-specific fields
 * @returns Cost in USD cents
 */
export function calculateServiceCost(
    service: "openrouter" | "vapi",
    usage: {
        // OpenRouter fields
        model?: string;
        inputTokens?: number;
        outputTokens?: number;
        // Vapi fields
        duration?: number;
    }
): number {
    switch (service) {
        case "openrouter":
            if (!usage.model) {
                console.warn("OpenRouter cost calculation requires model");
                return 0;
            }
            return calculateOpenRouterCost(
                usage.model,
                usage.inputTokens || 0,
                usage.outputTokens || 0
            );

        case "vapi":
            return calculateVapiCost(usage.duration || 0);

        default:
            console.warn(`Unknown service type: ${service}`);
            return 0;
    }
}

/**
 * Convert cents to dollars for display purposes.
 * 
 * @param cents - Cost in cents
 * @returns Cost in dollars as a string with 2 decimal places
 */
export function centsToUSD(cents: number): string {
    return (cents / 100).toFixed(2);
}

/**
 * Convert dollars to cents for storage.
 * 
 * @param dollars - Cost in dollars
 * @returns Cost in cents
 */
export function usdToCents(dollars: number): number {
    return Math.round(dollars * 100);
}