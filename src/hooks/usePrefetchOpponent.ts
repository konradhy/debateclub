import { useQueryClient } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";

/**
 * Hook to prefetch opponent data before navigation.
 * Call on hover/focus to make the prep page feel instant.
 */
export function usePrefetchOpponent() {
    const queryClient = useQueryClient();

    return (opponentId: Id<"opponents">) => {
        // Prefetch opponent data
        queryClient.prefetchQuery(
            convexQuery(api.opponents.get, { opponentId })
        );

        // Prefetch progress
        queryClient.prefetchQuery(
            convexQuery(api.prepProgress.getProgress, { opponentId })
        );

        // Prefetch chat messages
        queryClient.prefetchQuery(
            convexQuery(api.prepChat.getMessages, { opponentId })
        );

        // Prefetch gemini progress
        queryClient.prefetchQuery(
            convexQuery(api.geminiResearchProgress.getProgress, { opponentId })
        );
    };
}
