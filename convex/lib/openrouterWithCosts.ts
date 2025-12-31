/**
 * OpenRouter API wrapper with cost tracking
 */

import {
    callOpenRouter,
    type OpenRouterMessage,
    type OpenRouterResponse,
    type JsonSchema
} from "./openrouter";
import { calculateOpenRouterCost } from "./costCalculator";
import { internal } from "../_generated/api";
import type { ActionCtx } from "../_generated/server";
import type { Id } from "../_generated/dataModel";

export interface CostTrackingContext {
    userId: Id<"users">;
    debateId?: Id<"debates">;
    opponentId?: Id<"opponents">;
    phase?: "research" | "prep" | "debate" | "analysis";
}

/**
 * Build a referer URL that includes the phase for OpenRouter activity tracking.
 * This makes it easy to filter by phase in the OpenRouter dashboard.
 */
function buildRefererWithPhase(baseUrl: string, phase?: string): string {
    if (!phase) return baseUrl;
    // Append phase as a path segment: https://debateclub.app/research
    return `${baseUrl}/${phase}`;
}

/**
 * Calls OpenRouter API with automatic cost tracking.
 */
export async function callOpenRouterWithCosts(
    ctx: ActionCtx,
    costContext: CostTrackingContext,
    apiKey: string,
    messages: Array<OpenRouterMessage>,
    siteUrl: string,
    maxRetries: number = 3,
    model?: string,
    maxTokens?: number,
    jsonMode: boolean | JsonSchema = true,
): Promise<OpenRouterResponse> {

    // Build referer with phase for OpenRouter activity tracking
    const refererUrl = buildRefererWithPhase(siteUrl, costContext.phase);

    const response = await callOpenRouter(
        apiKey,
        messages,
        refererUrl,
        maxRetries,
        model,
        maxTokens,
        jsonMode
    );

    const usage = response.usage;
    if (!usage) {
        return response;
    }

    const actualModel = model || "anthropic/claude-sonnet-4.5";
    const costInCents = calculateOpenRouterCost(
        actualModel,
        usage.prompt_tokens,
        usage.completion_tokens
    );

    try {
        console.log(`[openrouter] Recording cost: ${costInCents} cents for ${actualModel} (${costContext.phase || 'unknown'} phase)`);
        await ctx.runMutation(internal.costs.INTERNAL_recordApiCost, {
            service: "openrouter",
            cost: costInCents,
            debateId: costContext.debateId,
            opponentId: costContext.opponentId,
            userId: costContext.userId,
            phase: costContext.phase,
            details: {
                model: actualModel,
                inputTokens: usage.prompt_tokens,
                outputTokens: usage.completion_tokens,
            },
        });
    } catch (error) {
        console.error(`[openrouter] Error recording cost:`, error);
    }

    return response;
}

/**
 * Convenience function for prep generation context.
 */
export async function callOpenRouterForPrep(
    ctx: ActionCtx,
    userId: Id<"users">,
    opponentId: Id<"opponents">,
    apiKey: string,
    messages: Array<OpenRouterMessage>,
    siteUrl: string,
    maxRetries: number = 3,
    model?: string,
    maxTokens?: number,
    jsonMode: boolean | JsonSchema = true,
): Promise<OpenRouterResponse> {
    return callOpenRouterWithCosts(
        ctx,
        { userId, opponentId, phase: "prep" },
        apiKey,
        messages,
        siteUrl,
        maxRetries,
        model,
        maxTokens,
        jsonMode
    );
}

/**
 * Convenience function for research context.
 */
export async function callOpenRouterForResearch(
    ctx: ActionCtx,
    userId: Id<"users">,
    opponentId: Id<"opponents">,
    apiKey: string,
    messages: Array<OpenRouterMessage>,
    siteUrl: string,
    maxRetries: number = 3,
    model?: string,
    maxTokens?: number,
    jsonMode: boolean | JsonSchema = true,
): Promise<OpenRouterResponse> {
    return callOpenRouterWithCosts(
        ctx,
        { userId, opponentId, phase: "research" },
        apiKey,
        messages,
        siteUrl,
        maxRetries,
        model,
        maxTokens,
        jsonMode
    );
}

/**
 * Convenience function for debate context.
 */
export async function callOpenRouterForDebate(
    ctx: ActionCtx,
    userId: Id<"users">,
    debateId: Id<"debates">,
    apiKey: string,
    messages: Array<OpenRouterMessage>,
    siteUrl: string,
    maxRetries: number = 3,
    model?: string,
    maxTokens?: number,
    jsonMode: boolean | JsonSchema = true,
): Promise<OpenRouterResponse> {
    return callOpenRouterWithCosts(
        ctx,
        { userId, debateId, phase: "analysis" },
        apiKey,
        messages,
        siteUrl,
        maxRetries,
        model,
        maxTokens,
        jsonMode
    );
}
