# Stripe Payment Integration Setup

## Overview
OratorPrep uses Stripe for payment processing via the Convex Stripe component. This guide covers both development and production setup.

## Development Setup (Already Complete)

1. ✅ Products created in Stripe Dashboard
2. ✅ Price IDs added to `convex/lib/monetization.ts`
3. ✅ Environment variables set in Convex Dashboard

## Production Setup Checklist

### 1. Stripe Dashboard Configuration

#### A. Switch to Live Mode
- Toggle from "Test mode" to "Live mode" in Stripe Dashboard
- You'll need to complete Stripe account verification

#### B. Create Production Products
Run the product creation script with production keys:
```bash
# Set production Stripe key in Convex environment variables first
npx convex run setupStripeProducts:createAllProducts
```

Copy the output price IDs and update `convex/lib/monetization.ts`:
```typescript
export const TOKEN_PACKS = [
  { tokens: 5, priceUsd: 1000, stripePriceId: "price_PROD_ID_HERE" },
  { tokens: 15, priceUsd: 2500, stripePriceId: "price_PROD_ID_HERE" },
  { tokens: 50, priceUsd: 7000, stripePriceId: "price_PROD_ID_HERE" },
] as const;

export const SUBSCRIPTION_MONTHLY_PRICE_ID = "price_PROD_ID_HERE";
export const SUBSCRIPTION_ANNUAL_PRICE_ID = "price_PROD_ID_HERE";
```

#### C. Configure Webhook
1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Set endpoint URL to: `https://YOUR_PRODUCTION_DOMAIN.convex.site/stripe/webhook`
   - Get your production URL from Convex Dashboard
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the webhook signing secret

### 2. Convex Environment Variables

Set these in your Convex Dashboard (Production environment):

```bash
STRIPE_SECRET_KEY=sk_live_...        # Live secret key from Stripe
SITE_URL=https://yourdomain.com     # Your production domain
```

**Important**: Do NOT set `STRIPE_WEBHOOK_SECRET` manually. The Convex Stripe component handles webhook verification automatically.

### 3. Testing Webhook Integration

#### Test in Development
Use Stripe CLI to forward webhooks to local development:
```bash
stripe listen --forward-to https://your-dev.convex.site/stripe/webhook
```

#### Test in Production
1. Make a test purchase in live mode with a real card (you can refund it)
2. Check Convex logs for webhook events:
   - `[Stripe] Granted X tokens to user...`
   - `[Stripe] Created subscription...`
3. Verify in Stripe Dashboard → Webhooks → Recent deliveries

### 4. Subscription Flow Verification

After a user subscribes, verify:
1. Subscription record created in `subscriptions` table
2. User's `isSubscriber` status shows as `true`
3. User has unlimited access to all scenarios
4. Token purchase section hidden in billing page

### 5. Security Best Practices

- ✅ Never commit Stripe keys to git
- ✅ Use test keys in development, live keys in production
- ✅ Verify webhook signatures (handled by Convex component)
- ✅ Internal mutations prevent unauthorized access
- ✅ All Stripe operations use actions (not public mutations)

## Troubleshooting

### Webhooks Not Working
1. Check webhook endpoint URL matches your Convex deployment
2. Verify webhook secret is correct
3. Check Convex logs for errors
4. Test webhook delivery in Stripe Dashboard

### Subscription Not Showing Up
1. Check if webhook `checkout.session.completed` fired
2. Verify subscription record in Convex database
3. Check for errors in webhook handler logs

### Payments Failing
1. Verify you're using correct price IDs for production
2. Check Stripe Dashboard for declined payments
3. Ensure customer has valid payment method

## File Reference

- `/convex/stripe.ts` - Checkout action functions
- `/convex/stripeWebhooks.ts` - Webhook event handlers
- `/convex/http.ts` - Webhook route registration
- `/convex/lib/monetization.ts` - Price configuration
- `/convex/setupStripeProducts.ts` - Product creation script

## Support

For Stripe-specific issues:
- Stripe Dashboard → Support
- https://stripe.com/docs

For Convex Stripe component:
- https://github.com/get-convex/stripe
