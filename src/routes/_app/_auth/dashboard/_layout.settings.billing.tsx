import { createFileRoute } from "@tanstack/react-router";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "~/convex/_generated/api";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useAction } from "convex/react";
import { SCENARIOS } from "@/scenarios";
import {
  Coins,
  Infinity as InfinityIcon,
  ArrowUp,
  ArrowDown,
  CreditCard,
  Check,
  Sparkles,
} from "lucide-react";

// Color constants matching dashboard
const colors = {
  background: "#F5F3EF",
  cardBg: "#FAFAF8",
  border: "#E8E4DA",
  primary: "#3C4A32",
  primaryLight: "#5C6B4A",
  text: "#2A2A20",
  textMuted: "#5C5C54",
  textLight: "#888880",
  success: "#16a34a",
  error: "#dc2626",
};

export const Route = createFileRoute(
  "/_app/_auth/dashboard/_layout/settings/billing",
)({
  component: BillingPage,
});

function BillingPage() {
  const { data: subscriptionStatus } = useQuery(
    convexQuery(api.tokens.getSubscriptionStatus, {}),
  );
  const { data: allBalances } = useQuery(
    convexQuery(api.tokens.getAllBalances, {}),
  );
  const { data: transactionHistory } = useQuery(
    convexQuery(api.tokens.getTransactionHistory, { limit: 20 }),
  );

  // Stripe checkout actions
  const createTokenCheckout = useAction(api.stripe.createTokenCheckout);
  const createSubscriptionCheckout = useAction(api.stripe.createSubscriptionCheckout);

  // Track loading state manually for actions
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const [selectedScenario, setSelectedScenario] = useState<string>("debate");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isSubscriber =
    subscriptionStatus && "isSubscriber" in subscriptionStatus
      ? subscriptionStatus.isSubscriber
      : false;

  // Handle success/error messages from Stripe redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("purchase") === "success") {
      const scenario = params.get("scenario") || "your selected scenario";
      setSuccessMessage(`Tokens purchased successfully for ${scenario}!`);
      setTimeout(() => setSuccessMessage(""), 5000);
      // Clean up URL
      window.history.replaceState({}, "", window.location.pathname);
    } else if (params.get("purchase") === "canceled") {
      setErrorMessage("Purchase canceled");
      setTimeout(() => setErrorMessage(""), 5000);
      window.history.replaceState({}, "", window.location.pathname);
    }

    if (params.get("subscribe") === "success") {
      setSuccessMessage("Welcome to Debate Club! You now have unlimited access.");
      setTimeout(() => setSuccessMessage(""), 5000);
      window.history.replaceState({}, "", window.location.pathname);
    } else if (params.get("subscribe") === "canceled") {
      setErrorMessage("Subscription canceled");
      setTimeout(() => setErrorMessage(""), 5000);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const scenarioList = Object.values(SCENARIOS);

  return (
    <div className="min-h-screen flex-1" style={{ backgroundColor: colors.background }}>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8">
          <h1
            className="text-3xl font-bold"
            style={{ color: colors.text, fontFamily: "Georgia, serif" }}
          >
            Billing & Tokens
          </h1>
          <p className="mt-1" style={{ color: colors.textMuted }}>
            Manage your subscription and token balance
          </p>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div
            className="mb-6 rounded-lg px-4 py-3 text-sm font-medium border-2"
            style={{
              backgroundColor: `${colors.success}15`,
              color: colors.success,
              borderColor: colors.success,
            }}
          >
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div
            className="mb-6 rounded-lg px-4 py-3 text-sm font-medium border-2"
            style={{
              backgroundColor: `${colors.error}15`,
              color: colors.error,
              borderColor: colors.error,
            }}
          >
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col gap-6">
          {/* Subscription Status Card */}
          <div
            className="rounded-xl border-2"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.cardBg,
            }}
          >
            <div className="p-6">
              {isSubscriber ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${colors.primary}15` }}
                    >
                      <Sparkles
                        className="h-5 w-5"
                        style={{ color: colors.primary }}
                      />
                    </div>
                    <div>
                      <h2
                        className="text-xl font-semibold"
                        style={{ color: colors.text }}
                      >
                        Pro Subscription
                      </h2>
                      <p
                        className="text-sm"
                        style={{ color: colors.success }}
                      >
                        Active
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" style={{ color: colors.success }} />
                      <span style={{ color: colors.textMuted }}>
                        Unlimited practice sessions
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" style={{ color: colors.success }} />
                      <span style={{ color: colors.textMuted }}>
                        All scenarios unlocked
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" style={{ color: colors.success }} />
                      <span style={{ color: colors.textMuted }}>
                        Priority support
                      </span>
                    </div>
                  </div>

                  {subscriptionStatus &&
                    "currentPeriodEnd" in subscriptionStatus &&
                    subscriptionStatus.currentPeriodEnd && (
                      <p className="text-sm" style={{ color: colors.textLight }}>
                        Next billing:{" "}
                        {new Date(
                          subscriptionStatus.currentPeriodEnd,
                        ).toLocaleDateString()}
                      </p>
                    )}
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${colors.primary}15` }}
                    >
                      <CreditCard
                        className="h-5 w-5"
                        style={{ color: colors.primary }}
                      />
                    </div>
                    <div>
                      <h2
                        className="text-xl font-semibold"
                        style={{ color: colors.text }}
                      >
                        Upgrade to Pro
                      </h2>
                      <p className="text-sm" style={{ color: colors.textMuted }}>
                        Get unlimited access to all scenarios
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" style={{ color: colors.primary }} />
                      <span style={{ color: colors.textMuted }}>
                        Unlimited practice sessions every month
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" style={{ color: colors.primary }} />
                      <span style={{ color: colors.textMuted }}>
                        All scenarios unlocked immediately
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" style={{ color: colors.primary }} />
                      <span style={{ color: colors.textMuted }}>
                        New scenarios added regularly
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" style={{ color: colors.primary }} />
                      <span style={{ color: colors.textMuted }}>
                        Priority email support
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 mb-4">
                    <div
                      className="flex-1 rounded-lg border-2 p-4 text-center cursor-pointer transition-all hover:border-opacity-60"
                      style={{ borderColor: colors.primary }}
                    >
                      <p
                        className="text-2xl font-bold"
                        style={{ color: colors.text }}
                      >
                        $20
                      </p>
                      <p className="text-sm mb-3" style={{ color: colors.textMuted }}>
                        /month
                      </p>
                      <button
                        onClick={async () => {
                          try {
                            setIsCheckingOut(true);
                            const result = await createSubscriptionCheckout({ plan: "monthly" });
                            if (result?.url) window.location.href = result.url;
                          } catch (error) {
                            console.error("Subscription checkout error:", error);
                            setErrorMessage("Failed to create checkout session");
                          } finally {
                            setIsCheckingOut(false);
                          }
                        }}
                        disabled={isCheckingOut}
                        className="w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110"
                        style={{ backgroundColor: colors.primary }}
                      >
                        {isCheckingOut ? "Loading..." : "Subscribe Monthly"}
                      </button>
                    </div>
                    <div
                      className="flex-1 rounded-lg border-2 p-4 text-center relative cursor-pointer transition-all hover:border-opacity-60"
                      style={{
                        borderColor: colors.primary,
                        backgroundColor: `${colors.primary}05`,
                      }}
                    >
                      <span
                        className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-xs font-medium text-white"
                        style={{ backgroundColor: colors.primary }}
                      >
                        2 months free
                      </span>
                      <p
                        className="text-2xl font-bold"
                        style={{ color: colors.text }}
                      >
                        $200
                      </p>
                      <p className="text-sm mb-3" style={{ color: colors.textMuted }}>
                        /year
                      </p>
                      <button
                        onClick={async () => {
                          try {
                            setIsCheckingOut(true);
                            const result = await createSubscriptionCheckout({ plan: "annual" });
                            if (result?.url) window.location.href = result.url;
                          } catch (error) {
                            console.error("Subscription checkout error:", error);
                            setErrorMessage("Failed to create checkout session");
                          } finally {
                            setIsCheckingOut(false);
                          }
                        }}
                        disabled={isCheckingOut}
                        className="w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110"
                        style={{ backgroundColor: colors.primary }}
                      >
                        {isCheckingOut ? "Loading..." : "Subscribe Annually"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>

          {/* Token Balances Grid */}
          <div
            className="rounded-xl border-2"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.cardBg,
            }}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${colors.primary}15` }}
                >
                  <Coins
                    className="h-5 w-5"
                    style={{ color: colors.primary }}
                  />
                </div>
                <div>
                  <h2
                    className="text-xl font-semibold"
                    style={{ color: colors.text }}
                  >
                    Your Token Balances
                  </h2>
                  <p className="text-sm" style={{ color: colors.textMuted }}>
                    Each token = 1 practice session
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {scenarioList.map((scenario) => {
                  const balance = allBalances?.[scenario.id] ?? 0;
                  const hasTokens = balance > 0 || isSubscriber;

                  return (
                    <div
                      key={scenario.id}
                      className="flex items-center justify-between rounded-lg border px-4 py-3"
                      style={{
                        borderColor: colors.border,
                        backgroundColor: hasTokens ? colors.cardBg : `${colors.background}`,
                        opacity: hasTokens ? 1 : 0.6,
                      }}
                    >
                      <span style={{ color: colors.text }}>{scenario.name}</span>
                      <div className="flex items-center gap-3">
                        {isSubscriber ? (
                          <span
                            className="flex items-center gap-1 text-sm font-medium"
                            style={{ color: colors.primary }}
                          >
                            <InfinityIcon className="h-4 w-4" />
                            Unlimited
                          </span>
                        ) : (
                          <span
                            className="flex items-center gap-1 text-sm font-medium"
                            style={{
                              color: balance > 0 ? colors.success : colors.textLight,
                            }}
                          >
                            <Coins className="h-4 w-4" />
                            {balance} tokens
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Purchase Tokens */}
          {!isSubscriber && (
            <div
              className="rounded-xl border-2"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.cardBg,
              }}
            >
              <div className="p-6">
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: colors.text }}
                >
                  Purchase Tokens
                </h2>

                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: colors.textMuted }}
                  >
                    Select Scenario
                  </label>
                  <select
                    value={selectedScenario}
                    onChange={(e) => setSelectedScenario(e.target.value)}
                    className="w-full rounded-lg border-2 px-4 py-2 text-sm"
                    style={{
                      borderColor: colors.border,
                      backgroundColor: colors.cardBg,
                      color: colors.text,
                    }}
                  >
                    {scenarioList.map((scenario) => (
                      <option key={scenario.id} value={scenario.id}>
                        {scenario.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div
                    className="rounded-lg border-2 p-4 text-center"
                    style={{ borderColor: colors.border }}
                  >
                    <p
                      className="text-2xl font-bold"
                      style={{ color: colors.text }}
                    >
                      5
                    </p>
                    <p
                      className="text-sm mb-2"
                      style={{ color: colors.textMuted }}
                    >
                      tokens
                    </p>
                    <p
                      className="text-lg font-semibold"
                      style={{ color: colors.primary }}
                    >
                      $10
                    </p>
                    <button
                      className="mt-3 w-full rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-all hover:bg-gray-50"
                      style={{
                        borderColor: colors.border,
                        color: colors.text,
                      }}
                      onClick={async () => {
                        try {
                          setIsPurchasing(true);
                          const result = await createTokenCheckout({
                            scenarioId: selectedScenario,
                            packIndex: 0,
                          });
                          if (result?.url) window.location.href = result.url;
                        } catch (error) {
                          console.error("Token checkout error:", error);
                          setErrorMessage("Failed to create checkout session");
                        } finally {
                          setIsPurchasing(false);
                        }
                      }}
                      disabled={isPurchasing}
                    >
                      {isPurchasing ? "Loading..." : "Purchase"}
                    </button>
                  </div>

                  <div
                    className="rounded-lg border-2 p-4 text-center relative"
                    style={{
                      borderColor: colors.primary,
                      backgroundColor: `${colors.primary}05`,
                    }}
                  >
                    <span
                      className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-xs font-medium text-white"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Popular
                    </span>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: colors.text }}
                    >
                      15
                    </p>
                    <p
                      className="text-sm mb-2"
                      style={{ color: colors.textMuted }}
                    >
                      tokens
                    </p>
                    <p
                      className="text-lg font-semibold"
                      style={{ color: colors.primary }}
                    >
                      $25
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: colors.success }}
                    >
                      Save 17%
                    </p>
                    <button
                      className="mt-2 w-full rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-all hover:bg-gray-50"
                      style={{
                        borderColor: colors.border,
                        color: colors.text,
                      }}
                      onClick={async () => {
                        try {
                          setIsPurchasing(true);
                          const result = await createTokenCheckout({
                            scenarioId: selectedScenario,
                            packIndex: 1,
                          });
                          if (result?.url) window.location.href = result.url;
                        } catch (error) {
                          console.error("Token checkout error:", error);
                          setErrorMessage("Failed to create checkout session");
                        } finally {
                          setIsPurchasing(false);
                        }
                      }}
                      disabled={isPurchasing}
                    >
                      {isPurchasing ? "Loading..." : "Purchase"}
                    </button>
                  </div>

                  <div
                    className="rounded-lg border-2 p-4 text-center relative"
                    style={{ borderColor: colors.border }}
                  >
                    <span
                      className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: colors.success,
                        color: "white",
                      }}
                    >
                      Best Value
                    </span>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: colors.text }}
                    >
                      50
                    </p>
                    <p
                      className="text-sm mb-2"
                      style={{ color: colors.textMuted }}
                    >
                      tokens
                    </p>
                    <p
                      className="text-lg font-semibold"
                      style={{ color: colors.primary }}
                    >
                      $70
                    </p>
                    <p className="text-xs" style={{ color: colors.success }}>
                      Save 30%
                    </p>
                    <button
                      className="mt-2 w-full rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-all hover:bg-gray-50"
                      style={{
                        borderColor: colors.border,
                        color: colors.text,
                      }}
                      onClick={async () => {
                        try {
                          setIsPurchasing(true);
                          const result = await createTokenCheckout({
                            scenarioId: selectedScenario,
                            packIndex: 2,
                          });
                          if (result?.url) window.location.href = result.url;
                        } catch (error) {
                          console.error("Token checkout error:", error);
                          setErrorMessage("Failed to create checkout session");
                        } finally {
                          setIsPurchasing(false);
                        }
                      }}
                      disabled={isPurchasing}
                    >
                      {isPurchasing ? "Loading..." : "Purchase"}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Transaction History */}
          <div
            className="rounded-xl border-2"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.cardBg,
            }}
          >
            <div className="p-6">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: colors.text }}
              >
                Recent Transactions
              </h2>

              {transactionHistory?.transactions &&
              transactionHistory.transactions.length > 0 ? (
                <div className="space-y-2">
                  {transactionHistory.transactions.map((tx) => {
                    const isPositive = tx.amount > 0;
                    const scenarioName =
                      SCENARIOS[tx.scenarioId]?.name ?? tx.scenarioId;
                    const reasonLabel = {
                      funnel_grant: "Marketing funnel",
                      purchase: "Purchase",
                      debate_complete: "Practice completed",
                      admin_grant: "Admin grant",
                      refund: "Refund",
                    }[tx.reason] ?? tx.reason;

                    return (
                      <div
                        key={tx._id}
                        className="flex items-center justify-between rounded-lg border px-4 py-3"
                        style={{ borderColor: colors.border }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-full"
                            style={{
                              backgroundColor: isPositive
                                ? `${colors.success}15`
                                : `${colors.error}15`,
                            }}
                          >
                            {isPositive ? (
                              <ArrowUp
                                className="h-4 w-4"
                                style={{ color: colors.success }}
                              />
                            ) : (
                              <ArrowDown
                                className="h-4 w-4"
                                style={{ color: colors.error }}
                              />
                            )}
                          </div>
                          <div>
                            <p
                              className="text-sm font-medium"
                              style={{ color: colors.text }}
                            >
                              {scenarioName}
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: colors.textLight }}
                            >
                              {reasonLabel}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className="text-sm font-semibold"
                            style={{
                              color: isPositive ? colors.success : colors.error,
                            }}
                          >
                            {isPositive ? "+" : ""}
                            {tx.amount} token{Math.abs(tx.amount) !== 1 ? "s" : ""}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: colors.textLight }}
                          >
                            {formatRelativeTime(tx.createdAt)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm" style={{ color: colors.textMuted }}>
                  No transactions yet
                </p>
              )}
            </div>

            {transactionHistory?.hasMore && (
              <div
                className="flex min-h-14 w-full items-center justify-center rounded-b-xl border-t-2 px-6 py-3"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                }}
              >
                <p className="text-sm" style={{ color: colors.textLight }}>
                  Showing last 20 transactions
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Format timestamp as relative time (e.g., "2 hours ago", "Yesterday")
 */
function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return new Date(timestamp).toLocaleDateString();
  } else if (days > 1) {
    return `${days} days ago`;
  } else if (days === 1) {
    return "Yesterday";
  } else if (hours > 1) {
    return `${hours} hours ago`;
  } else if (hours === 1) {
    return "1 hour ago";
  } else if (minutes > 1) {
    return `${minutes} minutes ago`;
  } else {
    return "Just now";
  }
}

