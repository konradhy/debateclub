import { useQuery } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useAction } from "convex/react";
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";

export function usePrepData(opponentId: string | undefined) {
  // Opponent data - rarely changes during practice session
  const { data: opponent } = useQuery({
    ...convexQuery(
      api.opponents.get,
      opponentId ? { opponentId: opponentId as Id<"opponents"> } : "skip",
    ),
    staleTime: 5 * 60 * 1000, // 5 minutes - opponent data doesn't change often
    cacheTime: 10 * 60 * 1000, // 10 minutes - keep in cache
  });

  // Research data (fetch ALL research documents)
  const { data: researchDocs } = useQuery({
    ...convexQuery(
      api.research.getAll,
      opponentId ? { opponentId: opponentId as Id<"opponents"> } : "skip",
    ),
    staleTime: 5 * 60 * 1000, // 5 minutes - research doesn't change after generation
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  // Progress tracking - Convex is reactive, no polling needed!
  const { data: progress, refetch: refetchProgress } = useQuery({
    ...convexQuery(
      api.prepProgress.getProgress,
      opponentId ? { opponentId: opponentId as Id<"opponents"> } : "skip",
    ),
    staleTime: 30 * 1000, // 30 seconds - progress changes frequently during generation
    cacheTime: 2 * 60 * 1000, // 2 minutes
  });

  // Chat messages
  const { data: chatMessages, refetch: refetchChat } = useQuery({
    ...convexQuery(
      api.prepChat.getMessages,
      opponentId ? { opponentId: opponentId as Id<"opponents"> } : "skip",
    ),
    staleTime: 1 * 60 * 1000, // 1 minute - chat updates moderately
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });

  // Gemini progress tracking - Convex is reactive, no polling needed!
  const { data: geminiProgress } = useQuery({
    ...convexQuery(
      api.geminiResearchProgress.getProgress,
      opponentId ? { opponentId: opponentId as Id<"opponents"> } : "skip",
    ),
    staleTime: 30 * 1000, // 30 seconds - progress changes during generation
    cacheTime: 2 * 60 * 1000, // 2 minutes
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
