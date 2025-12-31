import { internalAction } from "./_generated/server";
import Stripe from "stripe";

/**
 * One-time script to create all Stripe products and prices.
 * Run this once via Convex CLI to set up your products.
 *
 * SECURITY: This is an internalAction to prevent accidental public calls.
 * Only backend code and authenticated CLI can call it.
 *
 * Usage:
 * 1. Make sure STRIPE_SECRET_KEY is set in environment variables
 * 2. Run: npx convex run setupStripeProducts:createAllProducts
 * 3. Copy the output price IDs to convex/lib/monetization.ts
 *
 * NOTE: This will create new products each time it runs. Only run once per environment.
 */
export const createAllProducts = internalAction({
  args: {},
  handler: async () => {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY not found in environment variables");
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-12-15.clover",
    });

    console.log("Creating Stripe products...\n");

    // ==========================================
    // TOKEN PACKS (One-time payments)
    // ==========================================

    // 5 Tokens Pack
    const product5 = await stripe.products.create({
      name: "5 Practice Sessions",
      description: "5 AI practice sessions for OratorPrep",
      metadata: {
        type: "token_pack",
        tokens: "5",
      },
    });
    const price5 = await stripe.prices.create({
      product: product5.id,
      currency: "usd",
      unit_amount: 1000, // $10.00
    });
    console.log("✅ 5 Tokens Pack created");
    console.log(`   Product ID: ${product5.id}`);
    console.log(`   Price ID:   ${price5.id}\n`);

    // 15 Tokens Pack
    const product15 = await stripe.products.create({
      name: "15 Practice Sessions",
      description: "15 AI practice sessions for OratorPrep (Popular)",
      metadata: {
        type: "token_pack",
        tokens: "15",
      },
    });
    const price15 = await stripe.prices.create({
      product: product15.id,
      currency: "usd",
      unit_amount: 2500, // $25.00
    });
    console.log("✅ 15 Tokens Pack created");
    console.log(`   Product ID: ${product15.id}`);
    console.log(`   Price ID:   ${price15.id}\n`);

    // 50 Tokens Pack
    const product50 = await stripe.products.create({
      name: "50 Practice Sessions",
      description: "50 AI practice sessions for OratorPrep (Best Value)",
      metadata: {
        type: "token_pack",
        tokens: "50",
      },
    });
    const price50 = await stripe.prices.create({
      product: product50.id,
      currency: "usd",
      unit_amount: 7000, // $70.00
    });
    console.log("✅ 50 Tokens Pack created");
    console.log(`   Product ID: ${product50.id}`);
    console.log(`   Price ID:   ${price50.id}\n`);

    // ==========================================
    // SUBSCRIPTIONS (Recurring)
    // ==========================================

    // Monthly Pro Subscription
    const productMonthly = await stripe.products.create({
      name: "OratorPrep Pro - Monthly",
      description: "Unlimited AI practice sessions, monthly billing",
      metadata: {
        type: "subscription",
        plan: "monthly",
      },
    });
    const priceMonthly = await stripe.prices.create({
      product: productMonthly.id,
      currency: "usd",
      unit_amount: 2000, // $20.00
      recurring: {
        interval: "month",
      },
    });
    console.log("✅ Monthly Pro Subscription created");
    console.log(`   Product ID: ${productMonthly.id}`);
    console.log(`   Price ID:   ${priceMonthly.id}\n`);

    // Annual Pro Subscription
    const productAnnual = await stripe.products.create({
      name: "OratorPrep Pro - Annual",
      description: "Unlimited AI practice sessions, annual billing (2 months free)",
      metadata: {
        type: "subscription",
        plan: "annual",
      },
    });
    const priceAnnual = await stripe.prices.create({
      product: productAnnual.id,
      currency: "usd",
      unit_amount: 20000, // $200.00
      recurring: {
        interval: "year",
      },
    });
    console.log("✅ Annual Pro Subscription created");
    console.log(`   Product ID: ${productAnnual.id}`);
    console.log(`   Price ID:   ${priceAnnual.id}\n`);

    // ==========================================
    // OUTPUT SUMMARY
    // ==========================================

    console.log("==========================================");
    console.log("🎉 ALL PRODUCTS CREATED SUCCESSFULLY!");
    console.log("==========================================\n");

    console.log("📋 Copy these Price IDs to convex/lib/monetization.ts:\n");
    console.log("export const TOKEN_PACKS = [");
    console.log(`  { tokens: 5, priceUsd: 1000, stripePriceId: "${price5.id}" },`);
    console.log(`  { tokens: 15, priceUsd: 2500, stripePriceId: "${price15.id}" },`);
    console.log(`  { tokens: 50, priceUsd: 7000, stripePriceId: "${price50.id}" },`);
    console.log("] as const;\n");
    console.log(`export const SUBSCRIPTION_MONTHLY_PRICE_ID = "${priceMonthly.id}";`);
    console.log(`export const SUBSCRIPTION_ANNUAL_PRICE_ID = "${priceAnnual.id}";\n`);

    return {
      success: true,
      priceIds: {
        token5: price5.id,
        token15: price15.id,
        token50: price50.id,
        subscriptionMonthly: priceMonthly.id,
        subscriptionAnnual: priceAnnual.id,
      },
    };
  },
});
