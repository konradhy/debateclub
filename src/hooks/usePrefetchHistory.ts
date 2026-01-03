import { useQueryClient } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";

/**
 * Hook to prefetch debate history data.
 * Call on hover/focus of history link to make history page load instantly.
 */
export function usePrefetchHistory() {
    const queryClient = useQueryClient();

    return () => {
        // Prefetch debate list
        queryClient.prefetchQuery(
            convexQuery(api.debates.listUserDebates, {})
        );

        // Prefetch performance stats
        queryClient.prefetchQuery(
            convexQuery(api.debates.getPerformanceStats, {})
        );
    };
}
