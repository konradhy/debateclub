import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal, components } from "./_generated/api";
import { auth } from "./auth";
import {
  TOKEN_PACKS,
  SUBSCRIPTION_MONTHLY_PRICE_ID,
  SUBSCRIPTION_ANNUAL_PRICE_ID,
} from "./lib/monetization";
import { StripeSubscriptions } from "@convex-dev/stripe";

const stripeClient = new StripeSubscriptions(components.stripe, {});

// Get the site URL from environment or use default
const SITE_URL = process.env.SITE_URL || "http://localhost:5173";

/**
 * Create checkout session for token purchase
 */
export const createTokenCheckout = action({
  args: {
    scenarioId: v.string(),
    packIndex: v.number(), // 0, 1, or 2 for the three packs
  },
  returns: v.object({
    url: v.union(v.string(), v.null()),
  }),
  handler: async (ctx, { scenarioId, packIndex }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.runQuery(internal.users.get, { userId });
    if (!user?.email) throw new Error("User email required");

    const pack = TOKEN_PACKS[packIndex];
    if (!pack) throw new Error("Invalid pack index");

    if (!pack.stripePriceId) {
      throw new Error("Stripe price ID not configured for this pack");
    }

    // Get or create Stripe customer
    const customer = await stripeClient.getOrCreateCustomer(ctx, {
      userId: userId.toString(),
      email: user.email,
      name: user.username || user.name || undefined,
    });

    // Create checkout session
    const session = await stripeClient.createCheckoutSession(ctx, {
      priceId: pack.stripePriceId,
      customerId: customer.customerId,
      mode: "payment",
      metadata: {
        userId: userId.toString(),
        scenarioId,
        packTokens: pack.tokens.toString(),
        type: "token_purchase",
      },
      successUrl: `${SITE_URL}/dashboard/settings/billing?purchase=success&scenario=${scenarioId}`,
      cancelUrl: `${SITE_URL}/dashboard/settings/billing?purchase=canceled`,
    });

    return { url: session.url };
  },
});

/**
 * Create checkout session for subscription
 */
export const createSubscriptionCheckout = action({
  args: {
    plan: v.union(v.literal("monthly"), v.literal("annual")),
  },
  returns: v.object({
    url: v.union(v.string(), v.null()),
  }),
  handler: async (ctx, { plan }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.runQuery(internal.users.get, { userId });
    if (!user?.email) throw new Error("User email required");

    const priceId =
      plan === "monthly"
        ? SUBSCRIPTION_MONTHLY_PRICE_ID
        : SUBSCRIPTION_ANNUAL_PRICE_ID;

    if (!priceId) {
      throw new Error("Stripe price ID not configured for subscription");
    }

    // Get or create Stripe customer
    const customer = await stripeClient.getOrCreateCustomer(ctx, {
      userId: userId.toString(),
      email: user.email,
      name: user.username || user.name || undefined,
    });

    // Create checkout session
    const session = await stripeClient.createCheckoutSession(ctx, {
      priceId,
      customerId: customer.customerId,
      mode: "subscription",
      metadata: {
        userId: userId.toString(),
        type: "subscription",
        plan,
      },
      successUrl: `${SITE_URL}/dashboard/settings/billing?subscribe=success`,
      cancelUrl: `${SITE_URL}/dashboard/settings/billing?subscribe=canceled`,
    });

    return { url: session.url };
  },
});

/**
 * Create customer portal session (for managing subscription)
 */
export const createCustomerPortal = action({
  args: {},
  returns: v.object({
    url: v.union(v.string(), v.null()),
  }),
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.runQuery(internal.users.get, { userId });
    if (!user?.stripeCustomerId) {
      throw new Error("No Stripe customer found");
    }

    const session = await stripeClient.createCustomerPortalSession(ctx, {
      customerId: user.stripeCustomerId,
      returnUrl: `${SITE_URL}/dashboard/settings/billing`,
    });

    return { url: session.url };
  },
});
