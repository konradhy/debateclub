import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

/**
 * Internal mutation to update user's Stripe customer ID
 */
export const INTERNAL_updateUserStripeCustomer = internalMutation({
  args: {
    userId: v.id("users"),
    stripeCustomerId: v.string(),
  },
  handler: async (ctx, { userId, stripeCustomerId }) => {
    const user = await ctx.db.get(userId);
    if (user && !user.stripeCustomerId) {
      await ctx.db.patch(userId, { stripeCustomerId });
    }
  },
});

/**
 * Handle subscription created/updated
 */
export const handleSubscriptionCreated = internalMutation({
  args: {
    userId: v.id("users"),
    stripeCustomerId: v.string(),
    stripeSubscriptionId: v.string(),
    currentPeriodStart: v.optional(v.number()),
    currentPeriodEnd: v.optional(v.number()),
  },
  handler: async (
    ctx,
    {
      userId,
      stripeCustomerId,
      stripeSubscriptionId,
      currentPeriodStart,
      currentPeriodEnd,
    },
  ) => {
    // Check if subscription already exists
    const existing = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    const now = Date.now();
    const periodEnd = currentPeriodEnd || now + 30 * 24 * 60 * 60 * 1000; // 30 days default

    if (existing) {
      // Update existing subscription
      await ctx.db.patch(existing._id, {
        status: "active",
        stripeCustomerId,
        stripeSubscriptionId,
        currentPeriodStart: currentPeriodStart || now,
        currentPeriodEnd: periodEnd,
        cancelAtPeriodEnd: false,
      });
    } else {
      // Create new subscription
      await ctx.db.insert("subscriptions", {
        userId,
        status: "active",
        stripeCustomerId,
        stripeSubscriptionId,
        currentPeriodStart: currentPeriodStart || now,
        currentPeriodEnd: periodEnd,
        cancelAtPeriodEnd: false,
      });
    }
  },
});

/**
 * Internal mutation to update subscription
 */
export const INTERNAL_updateSubscription = internalMutation({
  args: {
    stripeSubscriptionId: v.string(),
    status: v.string(),
    currentPeriodStart: v.number(),
    currentPeriodEnd: v.number(),
    cancelAtPeriodEnd: v.boolean(),
  },
  handler: async (
    ctx,
    {
      stripeSubscriptionId,
      status,
      currentPeriodStart,
      currentPeriodEnd,
      cancelAtPeriodEnd,
    },
  ) => {
    const subscription = await ctx.db
      .query("subscriptions")
      .filter((q) =>
        q.eq(q.field("stripeSubscriptionId"), stripeSubscriptionId),
      )
      .first();

    if (!subscription) {
      console.error(
        `[Stripe] Subscription not found: ${stripeSubscriptionId}`,
      );
      return;
    }

    // Map Stripe status to our status
    const mappedStatus =
      status === "active"
        ? "active"
        : status === "canceled"
          ? "canceled"
          : status === "past_due"
            ? "past_due"
            : status === "trialing"
              ? "trialing"
              : "canceled";

    await ctx.db.patch(subscription._id, {
      status: mappedStatus,
      currentPeriodStart,
      currentPeriodEnd,
      cancelAtPeriodEnd,
    });
  },
});

/**
 * Internal mutation to cancel subscription
 */
export const INTERNAL_cancelSubscription = internalMutation({
  args: {
    stripeSubscriptionId: v.string(),
  },
  handler: async (ctx, { stripeSubscriptionId }) => {
    const subscription = await ctx.db
      .query("subscriptions")
      .filter((q) =>
        q.eq(q.field("stripeSubscriptionId"), stripeSubscriptionId),
      )
      .first();

    if (!subscription) {
      console.error(
        `[Stripe] Subscription not found: ${stripeSubscriptionId}`,
      );
      return;
    }

    await ctx.db.patch(subscription._id, {
      status: "canceled",
    });
  },
});
