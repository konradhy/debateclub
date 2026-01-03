import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";

/**
 * Hook for optimistic selection updates on the prep page.
 * Makes UI feel instant by updating cache before server responds.
 */
export function useOptimisticSelection(opponentId: string | undefined) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: useConvexMutation(api.opponents.updateSelection),
        onMutate: async (newData) => {
            if (!opponentId) return;

            // Query key format for convexQuery: ["convexQuery", functionReference, args]
            const queryKey = [
                "convexQuery",
                api.opponents.get,
                { opponentId: opponentId as Id<"opponents"> }
            ];

            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey });

            // Snapshot the previous value
            const previousOpponent = queryClient.getQueryData(queryKey);

            // Optimistically update to the new value
            queryClient.setQueryData(queryKey, (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    ...newData,
                };
            });

            // Return context with the previous value
            return { previousOpponent, queryKey };
        },
        onError: (err, newData, context) => {
            // If mutation fails, rollback to the previous value
            if (context?.previousOpponent) {
                queryClient.setQueryData(context.queryKey, context.previousOpponent);
            }
            console.error("Selection update failed:", err);
        },
        onSettled: (data, error, variables, context) => {
            // Always refetch after error or success to ensure consistency
            if (context?.queryKey) {
                queryClient.invalidateQueries({ queryKey: context.queryKey });
            }
        },
    });
}
