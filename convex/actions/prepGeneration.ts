"use node";
import { internalAction } from "../_generated/server";
import { v } from "convex/values";
import { callOpenRouter } from "../lib/openrouter";
import {
    OPENING_STATEMENT_PROMPT,
    ARGUMENT_FRAMES_PROMPT,
    RECEIPTS_ARSENAL_PROMPT,
    ZINGER_BANK_PROMPT,
    CLOSING_STATEMENT_PROMPT,
    OPPONENT_INTEL_PROMPT,
} from "../lib/promptTemplates";

const API_KEY = process.env.OPENROUTER_API_KEY!;
const SITE_URL = "https://orator.app"; // Placeholder

async function generateWithPrompt(prompt: string, model = "openai/gpt-4o") {
    if (!API_KEY) throw new Error("OPENROUTER_API_KEY is not set");

    const response = await callOpenRouter(
        API_KEY,
        [{ role: "system", content: prompt }],
        SITE_URL,
        3,
        model
    );

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No content generated");

    try {
        return JSON.parse(content);
    } catch (e) {
        console.error("Failed to parse JSON:", content);
        throw new Error("Failed to parse generated JSON");
    }
}

export const generateOpenings = internalAction({
    args: { topic: v.string(), position: v.string() },
    handler: async (ctx, args) => {
        const prompt = OPENING_STATEMENT_PROMPT
            .replace("{topic}", args.topic)
            .replace("{position}", args.position);

        const data = await generateWithPrompt(prompt);
        return data.openings || [];
    },
});

export const generateFrames = internalAction({
    args: { topic: v.string(), position: v.string(), research: v.array(v.any()) },
    handler: async (ctx, args) => {
        const researchContext = JSON.stringify(args.research);
        const prompt = ARGUMENT_FRAMES_PROMPT
            .replace("{topic}", args.topic)
            .replace("{position}", args.position)
            .replace("{research}", researchContext);

        const data = await generateWithPrompt(prompt);
        return data.frames || [];
    },
});

export const generateReceipts = internalAction({
    args: { topic: v.string(), position: v.string(), research: v.array(v.any()) },
    handler: async (ctx, args) => {
        const researchContext = JSON.stringify(args.research);
        const prompt = RECEIPTS_ARSENAL_PROMPT
            .replace("{topic}", args.topic)
            .replace("{position}", args.position)
            .replace("{research}", researchContext);

        const data = await generateWithPrompt(prompt);
        return data.receipts || [];
    },
});

export const generateZingers = internalAction({
    args: { topic: v.string(), position: v.string(), research: v.array(v.any()) },
    handler: async (ctx, args) => {
        const researchContext = JSON.stringify(args.research);
        const prompt = ZINGER_BANK_PROMPT
            .replace("{topic}", args.topic)
            .replace("{position}", args.position)
            .replace("{research}", researchContext);

        const data = await generateWithPrompt(prompt);
        return data.zingers || [];
    },
});

export const generateClosings = internalAction({
    args: { topic: v.string(), position: v.string() },
    handler: async (ctx, args) => {
        const prompt = CLOSING_STATEMENT_PROMPT
            .replace("{topic}", args.topic)
            .replace("{position}", args.position);

        const data = await generateWithPrompt(prompt);
        return data.closings || [];
    },
});

export const generateOpponentIntel = internalAction({
    args: { topic: v.string(), position: v.string(), research: v.array(v.any()) },
    handler: async (ctx, args) => {
        const researchContext = JSON.stringify(args.research);
        const prompt = OPPONENT_INTEL_PROMPT
            .replace("{topic}", args.topic)
            .replace("{position}", args.position)
            .replace("{research}", researchContext);

        const data = await generateWithPrompt(prompt);
        return data.opponentIntel || [];
    },
});
