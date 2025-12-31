/**
 * Monetization System Constants
 *
 * All configurable values for the token economy system.
 * Centralizing these makes A/B testing and tuning easier.
 */

/** Monthly debate cap for subscribers (hidden from UI, tracked internally) */
export const SUBSCRIBER_MONTHLY_CAP = 100;

/** Default token grant for marketing funnel links */
export const FUNNEL_GRANT_AMOUNT = 10;

/** Buffer for anti-abuse check - allows this many extra opponents beyond token balance */
export const OPPONENT_CREATION_BUFFER = 2;

/** Grant link expiration in milliseconds (30 days) */
export const GRANT_EXPIRATION_MS = 30 * 24 * 60 * 60 * 1000;

/** Grant link expiration options in days */
export const GRANT_EXPIRATION_OPTIONS = [30, 60, null] as const; // null = never

/** Owner email for cap notifications and alerts */
export const OWNER_EMAIL = "konradhylton@gmail.com";

/** Subscription pricing (in cents USD) */
export const SUBSCRIPTION_MONTHLY_PRICE = 2000; // $20.00
export const SUBSCRIPTION_ANNUAL_PRICE = 20000; // $200.00 (2 months free)

/**
 * Token pack sizes and prices (in cents USD)
 * Stripe price IDs will be added when payment integration is implemented
 */
export const TOKEN_PACKS = [
  { tokens: 5, priceUsd: 1000, stripePriceId: "" }, // $10.00
  { tokens: 15, priceUsd: 2500, stripePriceId: "" }, // $25.00
  { tokens: 50, priceUsd: 7000, stripePriceId: "" }, // $70.00
] as const;

/**
 * Helper to get the start of the current billing month (midnight on the 1st)
 */
export function getMonthStart(timestamp: number): number {
  const date = new Date(timestamp);
  return new Date(date.getFullYear(), date.getMonth(), 1).getTime();
}

/**
 * Helper to get the end of the current billing month (last millisecond)
 */
export function getMonthEnd(timestamp: number): number {
  const date = new Date(timestamp);
  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  ).getTime();
}
