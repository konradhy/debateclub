import { useState, useMemo, useCallback } from "react";
import { Id } from "@cvx/_generated/dataModel";

// Field types that can be edited/added/deleted
type OpponentField =
  | "receipts"
  | "talkingPoints"
  | "keyPhrases"
  | "responseMap"
  | "openingOptions"
  | "argumentFrames"
  | "zingers"
  | "closingOptions"
  | "opponentIntel";

// Type for opponent data from usePrepData
type Opponent = {
  _id: Id<"opponents">;
  topic: string;
  position: string;
  prepType?: string;
  scenarioType?: string;
  opponentDescription?: string;
  receipts?: Array<{
    id: string;
    category: string;
    [key: string]: any;
  }>;
  selectedFrameIds?: string[];
  selectedZingerIds?: string[];
  selectedCounterIds?: string[];
  [key: string]: any;
};

interface UsePrepHandlersProps {
  opponentId: string | undefined;
  opponent: Opponent | null | undefined;
  // Mutations from usePrepData
  generateStrategy: (args: {
    opponentId: Id<"opponents">;
    topic: string;
    position: string;
  }) => Promise<any>;
  generateGenericPrep: (args: {
    opponentId: Id<"opponents">;
    scenarioType: string;
    topic: string;
    opponentDescription: string;
  }) => Promise<any>;
  sendChatMessage: (args: {
    opponentId: Id<"opponents">;
    message: string;
  }) => Promise<any>;
  processResearchText: (args: {
    opponentId: Id<"opponents">;
    topic: string;
    position: string;
    researchText: string;
  }) => Promise<any>;
  updateSelection: (args: {
    opponentId: Id<"opponents">;
    [key: string]: any;
  }) => Promise<any>;
  updateField: (args: {
    opponentId: Id<"opponents">;
    field: OpponentField;
    itemId: string;
    updates: any;
  }) => Promise<any>;
  addFieldItem: (args: {
    opponentId: Id<"opponents">;
    field: OpponentField;
    item: any;
  }) => Promise<any>;
  deleteFieldItem: (args: {
    opponentId: Id<"opponents">;
    field: OpponentField;
    itemId: string;
  }) => Promise<any>;
  // Callbacks
  refetchProgress: () => void;
  refetchChat: () => void;
  // Chat state from usePrepChat
  chatInput: string;
  setChatInput: (value: string) => void;
  setIsSendingChat: (value: boolean) => void;
}

export function usePrepHandlers({
  opponentId,
  opponent,
  generateStrategy,
  generateGenericPrep,
  sendChatMessage,
  processResearchText,
  updateSelection,
  updateField,
  addFieldItem,
  deleteFieldItem,
  refetchProgress,
  refetchChat,
  chatInput,
  setChatInput,
  setIsSendingChat,
}: UsePrepHandlersProps) {
  // ============================================
  // LOCAL STATE
  // ============================================
  const [isGenerating, setIsGenerating] = useState(false);

  // User research input state
  const [userResearchText, setUserResearchText] = useState("");
  const [isProcessingResearch, setIsProcessingResearch] = useState(false);
  const [processedResearch, setProcessedResearch] = useState<any>(null);

  // UI State
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingType, setAddingType] = useState<string | null>(null);

  // ============================================
  // TOGGLE HANDLERS
  // ============================================
  const toggleExpand = useCallback((id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleSelectionUpdate = useCallback(
    async (updates: any) => {
      if (!opponentId) return;
      await updateSelection({
        opponentId: opponentId as Id<"opponents">,
        ...updates,
      });
    },
    [opponentId, updateSelection],
  );

  const toggleFrame = useCallback(
    (id: string) => {
      const current = opponent?.selectedFrameIds || [];
      const updated = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      handleSelectionUpdate({ selectedFrameIds: updated });
    },
    [opponent?.selectedFrameIds, handleSelectionUpdate],
  );

  const toggleZinger = useCallback(
    (id: string) => {
      const current = opponent?.selectedZingerIds || [];
      const updated = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      handleSelectionUpdate({ selectedZingerIds: updated });
    },
    [opponent?.selectedZingerIds, handleSelectionUpdate],
  );

  const toggleCounter = useCallback(
    (id: string) => {
      const current = opponent?.selectedCounterIds || [];
      const updated = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      handleSelectionUpdate({ selectedCounterIds: updated });
    },
    [opponent?.selectedCounterIds, handleSelectionUpdate],
  );

  // ============================================
  // GENERATION HANDLERS
  // ============================================
  const handleGenerateStrategy = useCallback(async () => {
    if (!opponent) return;
    setIsGenerating(true);
    try {
      await generateStrategy({
        opponentId: opponent._id,
        topic: opponent.topic,
        position: opponent.position,
      });
    } catch (error) {
      console.error("Error generating strategy:", error);
    } finally {
      setIsGenerating(false);
      refetchProgress();
    }
  }, [opponent, generateStrategy, refetchProgress]);

  const handleGenerateGenericPrep = useCallback(async () => {
    if (!opponent) return;
    setIsGenerating(true);
    try {
      await generateGenericPrep({
        opponentId: opponent._id,
        scenarioType: opponent.scenarioType || "sales-cold-prospect",
        topic: opponent.topic,
        opponentDescription: opponent.opponentDescription || "",
      });
    } catch (error) {
      console.error("Error generating generic prep:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [opponent, generateGenericPrep]);

  // ============================================
  // CHAT HANDLER
  // ============================================
  const handleSendChat = useCallback(async () => {
    if (!opponent || !chatInput.trim()) return;
    setIsSendingChat(true);
    const message = chatInput;
    setChatInput("");
    try {
      await sendChatMessage({
        opponentId: opponent._id,
        message,
      });
      refetchChat();
    } catch (error) {
      console.error("Error sending chat message:", error);
    } finally {
      setIsSendingChat(false);
    }
  }, [
    opponent,
    chatInput,
    setChatInput,
    setIsSendingChat,
    sendChatMessage,
    refetchChat,
  ]);

  // ============================================
  // RESEARCH HANDLER
  // ============================================
  const handleProcessResearch = useCallback(async () => {
    if (!opponent || !userResearchText.trim()) return;
    setIsProcessingResearch(true);
    try {
      const result = await processResearchText({
        opponentId: opponent._id,
        topic: opponent.topic,
        position: opponent.position,
        researchText: userResearchText,
      });
      setProcessedResearch(result);
    } catch (error) {
      console.error("Error processing research:", error);
    } finally {
      setIsProcessingResearch(false);
    }
  }, [opponent, userResearchText, processResearchText]);

  // ============================================
  // SEND EXTRACTED ITEMS TO STUDY MODE
  // ============================================
  // Track which items have been sent
  const [sentItems, setSentItems] = useState<Map<string, boolean>>(new Map());

  // Transformation helper - converts extracted format to Study Mode schema
  const transformExtractedItem = useCallback((itemType: string, item: any): any => {
    switch (itemType) {
      case 'argument':
        // From: { id, claim, supportingPoints[], source, strength }
        // To: argumentFrame schema
        return {
          id: item.id,
          label: item.claim,
          summary: item.supportingPoints?.join('; ') || '',
          content: item.claim,
          detailedContent: item.supportingPoints?.map((p: string, i: number) =>
            `${i + 1}. ${p}`).join('\n') || '',
          evidenceIds: [],
          deploymentGuidance: `Strength: ${item.strength}. ${item.source ? `Source: ${item.source}` : ''}`
        };

      case 'receipt':
        // From: { id, type, content, source, useCase }
        // To: receipt schema
        const categoryMap: Record<string, string> = {
          'Statistic': 'Statistics',
          'Quote': 'Quotes',
          'Study': 'Scientific Studies',
          'Case Study': 'Case Studies',
          'Historical': 'Historical Precedent'
        };
        return {
          id: item.id,
          category: categoryMap[item.type] || 'Statistics',
          source: item.source || 'User Research',
          content: item.content,
          deployment: item.useCase || '',
          url: '',
          year: new Date().getFullYear().toString()
        };

      case 'opener':
        // From: { id, type, content, hook }
        // To: openingOption schema
        return {
          id: item.id,
          type: item.type,
          hook: item.hook,
          content: item.content,
          wordCount: item.content.trim().split(/\s+/).length,
          deliveryGuidance: 'Review and adapt to your speaking style'
        };

      case 'zinger':
        // From: { id, text, context }
        // To: zinger schema
        return {
          id: item.id,
          text: item.text,
          context: item.context,
          type: 'User Generated',
          tone: 'Adjust tone as needed'
        };

      case 'counter':
        // From: { id, argument, suggestedResponse }
        // To: opponentIntel item schema
        return {
          id: item.id,
          argument: item.argument,
          likelihood: 'Medium',
          evidence: 'User research',
          weakness: 'User-identified counter-argument',
          counters: [
            {
              id: `counter_${item.id}`,
              label: 'Primary Response',
              text: item.suggestedResponse,
              deliveryNote: 'Adapt to debate context'
            }
          ]
        };

      default:
        return item;
    }
  }, []);

  // Handler to send extracted item to Study Mode
  const handleSendExtractedItem = useCallback(async (
    itemType: 'argument' | 'receipt' | 'opener' | 'zinger' | 'counter',
    item: any
  ) => {
    if (!opponentId) return;

    try {
      // Transform extracted item to Study Mode format
      const transformedItem = transformExtractedItem(itemType, item);

      // Map item type to opponent field
      const fieldMap: Record<string, OpponentField> = {
        'argument': 'argumentFrames',
        'receipt': 'receipts',
        'opener': 'openingOptions',
        'zinger': 'zingers',
        'counter': 'opponentIntel'
      };

      // Call existing addFieldItem mutation (appends to array)
      await addFieldItem({
        opponentId: opponentId as Id<"opponents">,
        field: fieldMap[itemType],
        item: transformedItem
      });

      // Mark as sent for UI feedback
      setSentItems(prev => new Map(prev).set(item.id, true));
    } catch (error) {
      console.error('Failed to send item:', error);
      // Don't mark as sent if mutation failed (allows retry)
    }
  }, [opponentId, addFieldItem, transformExtractedItem]);

  // ============================================
  // CRUD HANDLERS
  // ============================================
  const handleEdit = useCallback(
    async (field: OpponentField, itemId: string, updates: any) => {
      if (!opponentId) return;
      await updateField({
        opponentId: opponentId as Id<"opponents">,
        field,
        itemId,
        updates,
      });
      setEditingId(null);
    },
    [opponentId, updateField],
  );

  const handleAdd = useCallback(
    async (field: OpponentField, item: any) => {
      if (!opponentId) return;
      await addFieldItem({
        opponentId: opponentId as Id<"opponents">,
        field,
        item,
      });
      setAddingType(null);
    },
    [opponentId, addFieldItem],
  );

  const handleDelete = useCallback(
    async (field: OpponentField, itemId: string) => {
      if (!opponentId) return;
      if (!confirm("Are you sure you want to delete this item?")) return;
      await deleteFieldItem({
        opponentId: opponentId as Id<"opponents">,
        field,
        itemId,
      });
    },
    [opponentId, deleteFieldItem],
  );

  // ============================================
  // DERIVED DATA
  // ============================================
  const groupedReceipts = useMemo(() => {
    if (!opponent?.receipts) return {};
    return opponent.receipts.reduce(
      (acc, receipt) => {
        if (!acc[receipt.category]) acc[receipt.category] = [];
        acc[receipt.category].push(receipt);
        return acc;
      },
      {} as Record<string, typeof opponent.receipts>,
    );
  }, [opponent?.receipts]);

  // Helper to render complex fields
  const renderComplex = useCallback((val: any) => {
    if (typeof val === "string") return val;
    if (typeof val === "object" && val !== null) {
      if (val.timing) return `${val.timing} - ${val.setup}`;
      if (val.trigger) return `When: ${val.trigger}`;
      return JSON.stringify(val);
    }
    return String(val);
  }, []);

  // Helper to determine step status (still needed for EmptyState)
  const getStepStatus = useCallback(
    (
      step: string,
      progressData: {
        status: string;
        completedSteps: string[];
      } | null | undefined,
    ): "pending" | "active" | "complete" => {
      if (!progressData) return "pending";
      if (progressData.completedSteps.includes(step)) return "complete";
      if (progressData.status === step) return "active";
      return "pending";
    },
    [],
  );

  return {
    // Local state
    isGenerating,
    editingId,
    setEditingId,
    addingType,
    setAddingType,
    expandedItems,
    toggleExpand,
    userResearchText,
    setUserResearchText,
    isProcessingResearch,
    processedResearch,

    // Handlers
    handleGenerateStrategy,
    handleGenerateGenericPrep,
    handleSendChat,
    handleProcessResearch,
    handleSendExtractedItem,
    handleSelectionUpdate,
    handleEdit,
    handleAdd,
    handleDelete,
    toggleFrame,
    toggleZinger,
    toggleCounter,

    // Derived
    groupedReceipts,
    renderComplex,
    getStepStatus,
    sentItems,
  };
}
