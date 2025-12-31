import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { Coins, Infinity as InfinityIcon } from "lucide-react";
import { cn } from "@/utils/misc";

interface TokenBalanceProps {
  /** Scenario ID to show balance for. If not provided, shows nothing. */
  scenarioId?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show the label text */
  showLabel?: boolean;
  /** Compact mode for inline display */
  compact?: boolean;
}

/**
 * Displays the user's token balance for a specific scenario.
 *
 * - Subscribers see "Unlimited"
 * - Token users see "{n} tokens"
 * - Zero tokens shows "0 tokens"
 *
 * This component handles its own data fetching.
 */
export function TokenBalance({
  scenarioId,
  className,
  showLabel = true,
  compact = false,
}: TokenBalanceProps) {
  // Get subscription status
  const { data: subscriptionStatus, isLoading: subLoading } = useQuery(
    convexQuery(api.tokens.getSubscriptionStatus, {})
  );

  // Get token balance for specific scenario
  const { data: balance, isLoading: balanceLoading } = useQuery({
    ...convexQuery(api.tokens.getBalance, {
      scenarioId: scenarioId ?? "debate",
    }),
    enabled: !!scenarioId,
  });

  const isLoading = subLoading || balanceLoading;

  // Don't render if no scenario
  if (!scenarioId) {
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <div
        className={cn(
          "flex items-center gap-1.5 text-sm text-muted-foreground animate-pulse",
          className
        )}
      >
        <Coins className={cn("h-4 w-4", compact && "h-3.5 w-3.5")} />
        <span>...</span>
      </div>
    );
  }

  // Subscriber - show unlimited
  if (subscriptionStatus?.isSubscriber) {
    return (
      <div
        className={cn(
          "flex items-center gap-1.5",
          compact ? "text-xs" : "text-sm",
          className
        )}
      >
        <InfinityIcon
          className={cn(
            "text-emerald-600",
            compact ? "h-3.5 w-3.5" : "h-4 w-4"
          )}
        />
        <span className="font-medium text-emerald-600">Unlimited</span>
        {showLabel && !compact && (
          <span className="text-muted-foreground">debates</span>
        )}
      </div>
    );
  }

  // Token user - show balance
  const tokenCount = balance ?? 0;
  const hasTokens = tokenCount > 0;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5",
        compact ? "text-xs" : "text-sm",
        hasTokens ? "text-primary" : "text-muted-foreground",
        className
      )}
    >
      <Coins
        className={cn(
          compact ? "h-3.5 w-3.5" : "h-4 w-4",
          hasTokens ? "text-amber-500" : "text-muted-foreground"
        )}
      />
      <span className="font-medium">{tokenCount}</span>
      {showLabel && (
        <span className={cn(!hasTokens && "text-muted-foreground")}>
          {compact ? "" : tokenCount === 1 ? "token" : "tokens"}
        </span>
      )}
    </div>
  );
}

/**
 * Hook to get all token balances for the current user.
 * Useful for scenario selectors.
 */
export function useAllTokenBalances() {
  const { data: balances, isLoading } = useQuery(
    convexQuery(api.tokens.getAllBalances, {})
  );

  const { data: subscriptionStatus, isLoading: subLoading } = useQuery(
    convexQuery(api.tokens.getSubscriptionStatus, {})
  );

  return {
    balances: balances ?? {},
    isSubscriber: subscriptionStatus?.isSubscriber ?? false,
    isLoading: isLoading || subLoading,
  };
}

/**
 * Hook to check access to a specific scenario.
 */
export function useScenarioAccess(scenarioId: string | undefined) {
  const { data, isLoading } = useQuery({
    ...convexQuery(api.tokens.checkAccess, {
      scenarioId: scenarioId ?? "debate",
    }),
    enabled: !!scenarioId,
  });

  return {
    hasAccess: data?.hasAccess ?? false,
    reason: data?.reason ?? "not_authenticated",
    balance: data?.balance,
    isLoading,
  };
}

