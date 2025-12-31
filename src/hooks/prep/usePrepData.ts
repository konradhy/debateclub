import { useQuery } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useAction } from "convex/react";
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";

export function usePrepData(opponentId: string | undefined) {
  // Opponent data
  const { data: opponent } = useQuery(
    convexQuery(
      api.opponents.get,
      opponentId ? { opponentId: opponentId as Id<"opponents"> } : "skip",
    ),
  );

  // Research data (fetch ALL research documents)
  const { data: researchDocs } = useQuery(
    convexQuery(
      api.research.getAll,
      opponentId ? { opponentId: opponentId as Id<"opponents"> } : "skip",
    ),
  );

  // Progress tracking
  const { data: progress, refetch: refetchProgress } = useQuery({
    ...convexQuery(
      api.prepProgress.getProgress,
      opponentId ? { opponentId: opponentId as Id<"opponents"> } : "skip",
    ),
    refetchInterval: (query) => {
      // Poll every 1 second while generating
      const data = query.state.data;
      if (
        data &&
        data.status !== "complete" &&
        data.status !== "error" &&
        data.status !== "idle"
      ) {
        return 1000;
      }
      return false;
    },
  });

  // Chat messages
  const { data: chatMessages, refetch: refetchChat } = useQuery(
    convexQuery(
      api.prepChat.getMessages,
      opponentId ? { opponentId: opponentId as Id<"opponents"> } : "skip",
    ),
  );

  // Gemini progress tracking
  const { data: geminiProgress } = useQuery({
    ...convexQuery(
      api.geminiResearchProgress.getProgress,
      opponentId ? { opponentId: opponentId as Id<"opponents"> } : "skip",
    ),
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data && data.status !== "complete" && data.status !== "error") {
        return 2000; // Poll every 2 seconds
      }
      return false;
    },
  });

  // Actions
  const generateStrategy = useAction(api.actions.prep.generateStrategy);
  const generateGemini = useAction(api.actions.geminiPrep.generateStrategyGemini);
  const generateGenericPrep = useAction(api.actions.genericPrep.generate);
  const sendChatMessage = useAction(api.actions.prepChatAction.sendMessage);
  const processResearchText = useAction(api.actions.prep.processResearchText);

  // Mutations
  const updateSelection = useConvexMutation(api.opponents.updateSelection);
  const updateField = useConvexMutation(api.opponents.updateOpponentField);
  const addFieldItem = useConvexMutation(api.opponents.addOpponentFieldItem);
  const deleteFieldItem = useConvexMutation(api.opponents.deleteOpponentFieldItem);
  const updateGenericPrepText = useConvexMutation(api.opponents.updateGenericPrepText);

  return {
    // Data
    opponent,
    researchDocs,
    progress,
    geminiProgress,
    chatMessages,

    // Refetch functions
    refetchProgress,
    refetchChat,

    // Actions
    generateStrategy,
    generateGemini,
    generateGenericPrep,
    sendChatMessage,
    processResearchText,

    // Mutations
    updateSelection,
    updateField,
    addFieldItem,
    deleteFieldItem,
    updateGenericPrepText,
  };
}
