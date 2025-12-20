import { query, mutation, internalMutation } from "./_generated/server";
import { v } from "convex/values";

const statusValidator = v.union(
  v.literal("idle"),
  v.literal("researching"),
  v.literal("extracting"),
  v.literal("synthesizing"),
  v.literal("generating_openings"),
  v.literal("generating_frames"),
  v.literal("generating_receipts"),
  v.literal("generating_zingers"),
  v.literal("generating_closings"),
  v.literal("generating_intel"),
  v.literal("storing"),
  v.literal("complete"),
  v.literal("error"),
);

type ProgressStatus =
  | "idle"
  | "researching"
  | "extracting"
  | "synthesizing"
  | "generating_openings"
  | "generating_frames"
  | "generating_receipts"
  | "generating_zingers"
  | "generating_closings"
  | "generating_intel"
  | "storing"
  | "complete"
  | "error";

const STATUS_MESSAGES: Record<ProgressStatus, string> = {
  idle: "Ready to start",
  researching: "Researching topic with web search...",
  extracting: "Extracting key findings from research...",
  synthesizing: "Synthesizing research insights...",
  generating_openings: "Generating opening statements...",
  generating_frames: "Building argument frames...",
  generating_receipts: "Gathering receipts (evidence)...",
  generating_zingers: "Crafting zingers...",
  generating_closings: "Writing closing statements...",
  generating_intel: "Analyzing opponent strategies...",
  storing: "Saving your strategy...",
  complete: "Strategy complete!",
  error: "An error occurred",
};

/**
 * Gets the current progress for an opponent's prep generation.
 */
export const getProgress = query({
  args: { opponentId: v.id("opponents") },
  returns: v.union(
    v.object({
      status: statusValidator,
      message: v.string(),
      completedSteps: v.array(v.string()),
      error: v.optional(v.string()),
      startedAt: v.number(),
      completedAt: v.optional(v.number()),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("prepProgress")
      .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
      .first();

    if (!progress) return null;

    return {
      status: progress.status,
      message: progress.message,
      completedSteps: progress.completedSteps,
      error: progress.error,
      startedAt: progress.startedAt,
      completedAt: progress.completedAt,
    };
  },
});

/**
 * Starts progress tracking for a new generation.
 */
export const startProgress = internalMutation({
  args: { opponentId: v.id("opponents") },
  returns: v.id("prepProgress"),
  handler: async (ctx, args) => {
    // Delete any existing progress for this opponent
    const existing = await ctx.db
      .query("prepProgress")
      .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
      .collect();

    for (const p of existing) {
      await ctx.db.delete(p._id);
    }

    // Create new progress record
    return await ctx.db.insert("prepProgress", {
      opponentId: args.opponentId,
      status: "researching",
      message: STATUS_MESSAGES.researching,
      completedSteps: [],
      startedAt: Date.now(),
    });
  },
});

/**
 * Updates the progress status.
 */
export const updateProgress = internalMutation({
  args: {
    opponentId: v.id("opponents"),
    status: statusValidator,
    error: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("prepProgress")
      .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
      .first();

    if (!progress) return null;

    const completedSteps = [...progress.completedSteps];

    // Mark the previous status as completed
    if (
      progress.status !== "idle" &&
      progress.status !== "error" &&
      progress.status !== "complete"
    ) {
      if (!completedSteps.includes(progress.status)) {
        completedSteps.push(progress.status);
      }
    }

    await ctx.db.patch(progress._id, {
      status: args.status,
      message: args.error || STATUS_MESSAGES[args.status],
      completedSteps,
      error: args.error,
      ...(args.status === "complete" || args.status === "error"
        ? { completedAt: Date.now() }
        : {}),
    });

    return null;
  },
});

/**
 * Clears progress for an opponent.
 */
export const clearProgress = mutation({
  args: { opponentId: v.id("opponents") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("prepProgress")
      .withIndex("by_opponent", (q) => q.eq("opponentId", args.opponentId))
      .collect();

    for (const p of existing) {
      await ctx.db.delete(p._id);
    }

    return null;
  },
});
