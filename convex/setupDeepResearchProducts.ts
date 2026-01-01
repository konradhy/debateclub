import { internalAction } from "./_generated/server";
import Stripe from "stripe";

/**
 * Setup Deep Research Token Products in Stripe
 * 
 * Run once with: npx convex run setupDeepResearchProducts:setupDeepResearchProducts
 * 
 * This creates:
 * - 3 products (1, 3, 10 token packs)
 * - 3 prices (one per product)
 * 
 * Copy the returned price IDs to DEEP_RESEARCH_TOKEN_PACKS in monetization.ts
 */
export const setupDeepResearchProducts = internalAction({
    handler: async () => {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: "2025-12-15.clover" as any,
        });

        const packs = [
            { tokens: 1, priceUsd: 400, name: "1 Deep Research Token" },
            { tokens: 3, priceUsd: 1000, name: "3 Deep Research Tokens" },
            { tokens: 10, priceUsd: 3000, name: "10 Deep Research Tokens" },
        ];

        const results = [];

        for (const pack of packs) {
            // Create product
            const product = await stripe.products.create({
                name: pack.name,
                description: `${pack.tokens} Deep Research token${pack.tokens > 1 ? "s" : ""} for comprehensive 20-minute autonomous research`,
            });

            // Create price
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: pack.priceUsd,
                currency: "usd",
            });

            results.push({
                tokens: pack.tokens,
                productId: product.id,
                priceId: price.id,
            });
        }

        return results;
    },
});
