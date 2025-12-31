/**
 * Cost tracking mutations and queries for API usage monitoring
 */

import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Record an API cost entry for unit economics tracking
 */
export const recordApiCost = mutation({
    args: {
        service: v.union(
            v.literal("openrouter"),
            v.literal("vapi"),
            v.literal("firecrawl"),
            v.literal("gemini")
        ),
        cost: v.number(), // USD cents
        debateId: v.optional(v.id("debates")),
        opponentId: v.optional(v.id("opponents")),
        userId: v.id("users"),
        phase: v.optional(v.union(
            v.literal("research"),
            v.literal("prep"),
            v.literal("debate"),
            v.literal("analysis")
        )),
        details: v.object({
            // OpenRouter
            model: v.optional(v.string()),
            inputTokens: v.optional(v.number()),
            outputTokens: v.optional(v.number()),
            // Vapi  
            duration: v.optional(v.number()), // seconds
            // Firecrawl
            requests: v.optional(v.number()), // number of pages scraped
            // Gemini
            sessions: v.optional(v.number()), // number of research sessions
        }),
    },
    returns: v.id("apiCosts"),
    handler: async (ctx, args) => {
        return await ctx.db.insert("apiCosts", {
            service: args.service,
            cost: args.cost,
            debateId: args.debateId,
            opponentId: args.opponentId,
            userId: args.userId,
            phase: args.phase,
            details: args.details,
            timestamp: Date.now(),
        });
    },
});

/**
 * Internal version of recordApiCost for system operations (webhooks, etc.)
 */
export const INTERNAL_recordApiCost = internalMutation({
    args: {
        service: v.union(
            v.literal("openrouter"),
            v.literal("vapi"),
            v.literal("firecrawl"),
            v.literal("gemini")
        ),
        cost: v.number(), // USD cents
        debateId: v.optional(v.id("debates")),
        opponentId: v.optional(v.id("opponents")),
        userId: v.id("users"),
        phase: v.optional(v.union(
            v.literal("research"),
            v.literal("prep"),
            v.literal("debate"),
            v.literal("analysis")
        )),
        details: v.object({
            // OpenRouter
            model: v.optional(v.string()),
            inputTokens: v.optional(v.number()),
            outputTokens: v.optional(v.number()),
            // Vapi  
            duration: v.optional(v.number()), // seconds
            // Firecrawl
            requests: v.optional(v.number()), // number of pages scraped
            // Gemini
            sessions: v.optional(v.number()), // number of research sessions
        }),
    },
    returns: v.id("apiCosts"),
    handler: async (ctx, args) => {
        return await ctx.db.insert("apiCosts", {
            service: args.service,
            cost: args.cost,
            debateId: args.debateId,
            opponentId: args.opponentId,
            userId: args.userId,
            phase: args.phase,
            details: args.details,
            timestamp: Date.now(),
        });
    },
});

/**
 * Get total costs by service for admin analysis
 */
export const getTotalCostsByService = query({
    args: {},
    returns: v.array(v.object({
        service: v.string(),
        totalCost: v.number(),
        count: v.number(),
    })),
    handler: async (ctx) => {
        const costs = await ctx.db.query("apiCosts").collect();

        const serviceStats: Record<string, { totalCost: number; count: number }> = {};

        for (const cost of costs) {
            if (!serviceStats[cost.service]) {
                serviceStats[cost.service] = { totalCost: 0, count: 0 };
            }
            serviceStats[cost.service].totalCost += cost.cost;
            serviceStats[cost.service].count += 1;
        }

        return Object.entries(serviceStats).map(([service, stats]) => ({
            service,
            totalCost: stats.totalCost,
            count: stats.count,
        }));
    },
});

/**
 * Get costs for a specific debate
 */
export const getDebateCosts = query({
    args: {
        debateId: v.id("debates"),
    },
    returns: v.array(v.object({
        _id: v.id("apiCosts"),
        service: v.string(),
        cost: v.number(),
        details: v.any(),
        timestamp: v.number(),
    })),
    handler: async (ctx, args) => {
        return await ctx.db
            .query("apiCosts")
            .withIndex("by_debate", (q) => q.eq("debateId", args.debateId))
            .collect();
    },
});

/**
 * Get costs for a specific opponent (prep generation)
 */
export const getOpponentCosts = query({
    args: {
        opponentId: v.id("opponents"),
    },
    returns: v.array(v.object({
        _id: v.id("apiCosts"),
        service: v.string(),
        cost: v.number(),
        details: v.any(),
        timestamp: v.number(),
    })),
    handler: async (ctx, args) => {
        return await ctx.db
            .query("apiCosts")
            .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
            .collect();
    },
});

/**
 * Get most expensive items (debates + prep sessions) by total cost with details
 */
export const getMostExpensiveDebates = query({
    args: {
        limit: v.optional(v.number()),
    },
    returns: v.array(v.object({
        debateId: v.union(v.id("debates"), v.null()),
        opponentId: v.union(v.id("opponents"), v.null()),
        totalCost: v.number(),
        serviceBreakdown: v.array(v.object({
            service: v.string(),
            cost: v.number(),
        })),
        // Enhanced details
        title: v.optional(v.string()),
        opponentName: v.optional(v.string()),
        scenarioName: v.optional(v.string()),
        timestamp: v.number(),
        type: v.string(), // "debate" or "prep"
    })),
    handler: async (ctx, args) => {
        const limit = args.limit || 10;
        const costs = await ctx.db.query("apiCosts").collect();

        // Group by debateId OR opponentId (prep costs have opponentId but no debateId)
        const itemStats: Record<string, {
            totalCost: number;
            services: Record<string, number>;
            debateId?: string;
            opponentId?: string;
            timestamp: number;
        }> = {};

        for (const cost of costs) {
            // Use debateId if available, otherwise use opponentId for prep costs
            let key: string;
            if (cost.debateId) {
                key = `debate:${cost.debateId}`;
            } else if (cost.opponentId) {
                key = `prep:${cost.opponentId}`;
            } else {
                key = "other";
            }

            if (!itemStats[key]) {
                itemStats[key] = {
                    totalCost: 0,
                    services: {},
                    debateId: cost.debateId || undefined,
                    opponentId: cost.opponentId || undefined,
                    timestamp: cost.timestamp,
                };
            }
            itemStats[key].totalCost += cost.cost;
            itemStats[key].services[cost.service] = (itemStats[key].services[cost.service] || 0) + cost.cost;
            // Keep the most recent timestamp
            if (cost.timestamp > itemStats[key].timestamp) {
                itemStats[key].timestamp = cost.timestamp;
            }
        }

        // Sort by total cost and take top N
        const sortedItems = Object.entries(itemStats)
            .sort(([, a], [, b]) => b.totalCost - a.totalCost)
            .slice(0, limit);

        // Enhance with details
        const enhancedResults = [];
        for (const [key, stats] of sortedItems) {
            const isDebate = key.startsWith("debate:");
            const isPrep = key.startsWith("prep:");
            let title = undefined;
            let opponentName = undefined;
            let scenarioName = undefined;

            if (isDebate && stats.debateId) {
                try {
                    const debate = await ctx.db.get(stats.debateId as any);
                    if (debate) {
                        const debateDoc = debate as any;
                        title = debateDoc.topic || `Debate`;

                        if (debateDoc.opponentId) {
                            const opponent = await ctx.db.get(debateDoc.opponentId);
                            if (opponent) {
                                const opponentDoc = opponent as any;
                                opponentName = opponentDoc.name;
                                scenarioName = opponentDoc.scenarioType;
                            }
                        }
                    }
                } catch (error) {
                    // Silently handle missing debates
                }
            } else if (isPrep && stats.opponentId) {
                try {
                    const opponent = await ctx.db.get(stats.opponentId as any);
                    if (opponent) {
                        const opponentDoc = opponent as any;
                        title = `Prep: ${opponentDoc.topic || opponentDoc.name || 'Unknown'}`;
                        opponentName = opponentDoc.name;
                        scenarioName = opponentDoc.scenarioType;
                    }
                } catch (error) {
                    title = "Prep Session";
                }
            } else {
                title = "Other Costs";
            }

            enhancedResults.push({
                debateId: stats.debateId ? stats.debateId as any : null,
                opponentId: stats.opponentId ? stats.opponentId as any : null,
                totalCost: stats.totalCost,
                serviceBreakdown: Object.entries(stats.services).map(([service, cost]) => ({
                    service,
                    cost,
                })),
                title,
                opponentName,
                scenarioName,
                timestamp: stats.timestamp,
                type: isDebate ? "debate" : isPrep ? "prep" : "other",
            });
        }

        return enhancedResults;
    },
});

/**
 * Get daily costs for time-based analysis
 */
export const getDailyCosts = query({
    args: {
        days: v.optional(v.number()),
    },
    returns: v.array(v.object({
        date: v.string(),
        totalCost: v.number(),
        serviceBreakdown: v.array(v.object({
            service: v.string(),
            cost: v.number(),
        })),
    })),
    handler: async (ctx, args) => {
        const days = args.days || 30;
        const costs = await ctx.db.query("apiCosts").collect();

        // Group by date
        const dailyStats: Record<string, { totalCost: number; services: Record<string, number> }> = {};

        for (const cost of costs) {
            const date = new Date(cost.timestamp).toISOString().split('T')[0];
            if (!dailyStats[date]) {
                dailyStats[date] = { totalCost: 0, services: {} };
            }
            dailyStats[date].totalCost += cost.cost;
            dailyStats[date].services[cost.service] = (dailyStats[date].services[cost.service] || 0) + cost.cost;
        }

        // Sort by date and take recent days
        const sortedDays = Object.entries(dailyStats)
            .sort(([a], [b]) => b.localeCompare(a))
            .slice(0, days);

        return sortedDays.map(([date, stats]) => ({
            date,
            totalCost: stats.totalCost,
            serviceBreakdown: Object.entries(stats.services).map(([service, cost]) => ({
                service,
                cost,
            })),
        }));
    },
});

/**
 * Get weekly costs for time-based analysis
 */
export const getWeeklyCosts = query({
    args: {
        weeks: v.optional(v.number()),
    },
    returns: v.array(v.object({
        weekStart: v.string(),
        weekEnd: v.string(),
        totalCost: v.number(),
        serviceBreakdown: v.array(v.object({
            service: v.string(),
            cost: v.number(),
        })),
    })),
    handler: async (ctx, args) => {
        const weeks = args.weeks || 12;
        const costs = await ctx.db.query("apiCosts").collect();

        // Helper function to get Monday of the week for a given date
        const getWeekStart = (date: Date): Date => {
            const day = date.getDay();
            const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
            return new Date(date.setDate(diff));
        };

        // Helper function to get Sunday of the week for a given date
        const getWeekEnd = (weekStart: Date): Date => {
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            return weekEnd;
        };

        // Group by week
        const weeklyStats: Record<string, { totalCost: number; services: Record<string, number>; weekEnd: string }> = {};

        for (const cost of costs) {
            const costDate = new Date(cost.timestamp);
            const weekStart = getWeekStart(new Date(costDate));
            const weekEnd = getWeekEnd(weekStart);
            const weekKey = weekStart.toISOString().split('T')[0];

            if (!weeklyStats[weekKey]) {
                weeklyStats[weekKey] = {
                    totalCost: 0,
                    services: {},
                    weekEnd: weekEnd.toISOString().split('T')[0]
                };
            }
            weeklyStats[weekKey].totalCost += cost.cost;
            weeklyStats[weekKey].services[cost.service] = (weeklyStats[weekKey].services[cost.service] || 0) + cost.cost;
        }

        // Sort by week start date and take recent weeks
        const sortedWeeks = Object.entries(weeklyStats)
            .sort(([a], [b]) => b.localeCompare(a))
            .slice(0, weeks);

        return sortedWeeks.map(([weekStart, stats]) => ({
            weekStart,
            weekEnd: stats.weekEnd,
            totalCost: stats.totalCost,
            serviceBreakdown: Object.entries(stats.services).map(([service, cost]) => ({
                service,
                cost,
            })),
        }));
    },
});

/**
 * Get costs grouped by topic/workflow (all costs related to a single debate topic)
 */
export const getCostsByTopic = query({
    args: {
        userId: v.optional(v.id("users")),
    },
    returns: v.array(v.object({
        opponentId: v.id("opponents"),
        opponentName: v.string(),
        topic: v.string(),
        totalCost: v.number(),
        phaseBreakdown: v.array(v.object({
            phase: v.string(),
            cost: v.number(),
        })),
        serviceBreakdown: v.array(v.object({
            service: v.string(),
            cost: v.number(),
        })),
        debateCount: v.number(),
        lastActivity: v.number(),
    })),
    handler: async (ctx, args) => {
        // Get all opponents for the user (or all if no user specified)
        const opponents = args.userId
            ? await ctx.db.query("opponents").withIndex("by_user", (q) => q.eq("userId", args.userId!)).collect()
            : await ctx.db.query("opponents").collect();

        const topicStats: Record<string, {
            opponentId: string;
            opponentName: string;
            topic: string;
            totalCost: number;
            phases: Record<string, number>;
            services: Record<string, number>;
            debateCount: number;
            lastActivity: number;
        }> = {};

        for (const opponent of opponents) {
            const opponentId = opponent._id;
            const key = opponentId;

            if (!topicStats[key]) {
                topicStats[key] = {
                    opponentId,
                    opponentName: opponent.name,
                    topic: opponent.topic,
                    totalCost: 0,
                    phases: {},
                    services: {},
                    debateCount: 0,
                    lastActivity: 0,
                };
            }

            // Get prep costs (costs with this opponentId)
            const prepCosts = await ctx.db
                .query("apiCosts")
                .withIndex("by_opponent", (q) => q.eq("opponentId", opponentId))
                .collect();

            for (const cost of prepCosts) {
                topicStats[key].totalCost += cost.cost;
                const phase = cost.phase || "unknown";
                topicStats[key].phases[phase] = (topicStats[key].phases[phase] || 0) + cost.cost;
                topicStats[key].services[cost.service] = (topicStats[key].services[cost.service] || 0) + cost.cost;
                if (cost.timestamp > topicStats[key].lastActivity) {
                    topicStats[key].lastActivity = cost.timestamp;
                }
            }

            // Get debate costs (debates with this opponentId)
            const debates = await ctx.db
                .query("debates")
                .filter((q) => q.eq(q.field("opponentId"), opponentId))
                .collect();

            topicStats[key].debateCount = debates.length;

            for (const debate of debates) {
                const debateCosts = await ctx.db
                    .query("apiCosts")
                    .withIndex("by_debate", (q) => q.eq("debateId", debate._id))
                    .collect();

                for (const cost of debateCosts) {
                    topicStats[key].totalCost += cost.cost;
                    const phase = cost.phase || "unknown";
                    topicStats[key].phases[phase] = (topicStats[key].phases[phase] || 0) + cost.cost;
                    topicStats[key].services[cost.service] = (topicStats[key].services[cost.service] || 0) + cost.cost;
                    if (cost.timestamp > topicStats[key].lastActivity) {
                        topicStats[key].lastActivity = cost.timestamp;
                    }
                }
            }
        }

        // Convert to array and sort by total cost
        return Object.values(topicStats)
            .filter(stats => stats.totalCost > 0) // Only include topics with costs
            .sort((a, b) => b.totalCost - a.totalCost)
            .map(stats => ({
                opponentId: stats.opponentId as any,
                opponentName: stats.opponentName,
                topic: stats.topic,
                totalCost: stats.totalCost,
                phaseBreakdown: Object.entries(stats.phases).map(([phase, cost]) => ({
                    phase,
                    cost,
                })),
                serviceBreakdown: Object.entries(stats.services).map(([service, cost]) => ({
                    service,
                    cost,
                })),
                debateCount: stats.debateCount,
                lastActivity: stats.lastActivity,
            }));
    },
});

/**
 * DEBUG: Get all cost records for debugging
 */
export const getAllCosts = query({
    args: {},
    returns: v.array(v.object({
        _id: v.id("apiCosts"),
        _creationTime: v.number(),
        service: v.union(
            v.literal("openrouter"),
            v.literal("vapi"),
            v.literal("firecrawl"),
            v.literal("gemini")
        ),
        cost: v.number(),
        debateId: v.optional(v.id("debates")),
        opponentId: v.optional(v.id("opponents")),
        userId: v.id("users"),
        details: v.object({
            model: v.optional(v.string()),
            inputTokens: v.optional(v.number()),
            outputTokens: v.optional(v.number()),
            duration: v.optional(v.number()),
            requests: v.optional(v.number()),
            apiCalls: v.optional(v.number()),
            sessions: v.optional(v.number()),
        }),
        timestamp: v.number(),
    })),
    handler: async (ctx) => {
        return await ctx.db.query("apiCosts").collect();
    },
});