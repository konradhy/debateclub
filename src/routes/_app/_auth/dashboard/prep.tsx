import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Id } from "@cvx/_generated/dataModel";
import { usePrepData } from "@/hooks/prep/usePrepData";
import { usePrepChat } from "@/hooks/prep/usePrepChat";
import { usePrepHandlers } from "@/hooks/prep/usePrepHandlers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import siteConfig from "~/site.config";
import { colors } from "@/lib/prep-colors";
import { PrepHeader } from "@/components/prep/PrepHeader";
import { GenerationProgress } from "@/components/prep/GenerationProgress";
import { GeminiProgress } from "@/components/prep/GeminiProgress";
import { ChatTab } from "@/components/prep/ChatTab";
import { ResearchTab } from "@/components/prep/ResearchTab";
import { GeminiReportTab } from "@/components/prep/GeminiReportTab";
import { StrategicBriefTab } from "@/components/prep/StrategicBriefTab";
import { MyResearchTab } from "@/components/prep/MyResearchTab";
import { QuickRefDebate } from "@/components/prep/QuickRefDebate";
import { QuickRefGeneric } from "@/components/prep/QuickRefGeneric";
import { StudyModeGeneric } from "@/components/prep/StudyModeGeneric";
import { StudyModeDebate } from "@/components/prep/StudyModeDebate";
import { DeepResearchModal } from "@/components/prep/DeepResearchModal";
import { EmptyState } from "@/components/prep/EmptyState";
import { Loader2, MessageSquare, FileSearch, Target } from "lucide-react";
import { cn } from "@/utils/misc";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@cvx/_generated/api";

export const Route = createFileRoute("/_app/_auth/dashboard/prep")({
  component: PrepScreen,
  validateSearch: (search: Record<string, unknown>): { opponentId: string } => {
    return {
      opponentId: (search.opponentId as string) || "",
    };
  },
  beforeLoad: () => ({
    title: `${siteConfig.siteTitle} - Debate Prep`,
    headerTitle: "Debate Preparation",
    headerDescription: "Review your prep materials before the debate",
  }),
});

function PrepScreen() {
  const navigate = useNavigate();
  const { opponentId } = Route.useSearch();

  // Deep Research modal state
  const [showDeepResearchModal, setShowDeepResearchModal] = useState(false);

  // Get Deep Research token balance
  const deepResearchTokens =
    useQuery(api.tokens.getBalance, {
      scenarioId: "deep-research",
    }) ?? 0;

  // Data hooks
  const {
    opponent,
    researchDocs,
    progress,
    geminiProgress,
    chatMessages,
    refetchProgress,
    refetchChat,
    generateStrategy,
    generateGemini,
    generateGenericPrep,
    sendChatMessage,
    processResearchText,
    updateSelection,
    updateField,
    addFieldItem,
    deleteFieldItem,
    updateGenericPrepText,
  } = usePrepData(opponentId);

  // Chat hook
  const {
    chatInput,
    setChatInput,
    isSendingChat,
    setIsSendingChat,
    chatScrollRef,
  } = usePrepChat(chatMessages);

  // Handlers hook
  const {
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
    groupedReceipts,
    renderComplex,
    getStepStatus,
    sentItems,
  } = usePrepHandlers({
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
  });

  const handleStartDebate = () => {
    navigate({
      to: "/dashboard/debate",
      search: { opponentId },
    });
  };

  const handleRunDeepResearch = (mode: "report-only" | "full-replace") => {
    if (opponentId && opponent) {
      generateGemini({
        opponentId: opponentId as Id<"opponents">,
        topic: opponent.topic,
        position: opponent.position,
        mode,
      });
    }
  };

  const isGeminiGenerating =
    geminiProgress?.status &&
    !["complete", "error", "idle"].includes(geminiProgress.status);

  if (!opponent) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-primary/60">Loading opponent...</p>
      </div>
    );
  }

  const userPosition = opponent.position; //This is correct. Confusing table name
  const aiPosition = userPosition === "con" ? "pro" : "con";

  // Determine prep type (debate vs generic)
  const isDebatePrep = opponent.prepType !== "generic";

  // For debate: check if opening options exist
  const hasDebateStrategy =
    !!opponent.openingOptions && opponent.openingOptions.length > 0;

  // For generic: check if any generic prep content exists
  const hasGenericPrep =
    !!opponent.openingApproach ||
    (opponent.talkingPoints && opponent.talkingPoints.length > 0) ||
    (opponent.keyPhrases && opponent.keyPhrases.length > 0) ||
    (opponent.responseMap && opponent.responseMap.length > 0) ||
    !!opponent.closingApproach;

  // Unified check - has any prep content
  const hasStrategy = isDebatePrep ? hasDebateStrategy : hasGenericPrep;

  // Helper to get selected content
  const selectedOpening = opponent.openingOptions?.find(
    (o) => o.id === opponent.selectedOpeningId,
  );
  const selectedClosing = opponent.closingOptions?.find(
    (c) => c.id === opponent.selectedClosingId,
  );
  const selectedFrames =
    opponent.argumentFrames?.filter((f) =>
      opponent.selectedFrameIds?.includes(f.id),
    ) || [];
  const selectedZingers =
    opponent.zingers?.filter((z) =>
      opponent.selectedZingerIds?.includes(z.id),
    ) || [];

  // Get selected counters
  const selectedCounters =
    opponent.opponentIntel?.flatMap((intel) =>
      intel.counters
        .filter((c) => opponent.selectedCounterIds?.includes(c.id))
        .map((c) => ({
          ...c,
          argument: intel.argument,
        })),
    ) || [];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      {/* Site Header */}
      <PrepHeader />

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div
          className="overflow-hidden rounded-2xl border-2"
          style={{
            backgroundColor: colors.cardBg,
            borderColor: colors.border,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
          }}
        >
          {/* Page Header */}
          <div
            className="p-6 lg:p-8"
            style={{ borderBottom: `1px solid ${colors.border}` }}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-col gap-3">
                <div>
                  <h1
                    className="text-2xl font-bold"
                    style={{ color: colors.text, fontFamily: "Georgia, serif" }}
                  >
                    {opponent.name}
                  </h1>
                  <p
                    className="text-sm mt-1"
                    style={{ color: colors.textMuted }}
                  >
                    {opponent.topic}
                  </p>
                </div>
                {isDebatePrep && (
                  <div
                    className="flex items-center gap-4 text-sm"
                    style={{ color: colors.textLight }}
                  >
                    <span>
                      Your position:{" "}
                      <span
                        className="font-medium capitalize"
                        style={{ color: colors.text }}
                      >
                        {userPosition}
                      </span>
                    </span>
                    <span>•</span>
                    <span>
                      Opponent:{" "}
                      <span
                        className="font-medium capitalize"
                        style={{ color: colors.text }}
                      >
                        {aiPosition}
                      </span>
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {!hasStrategy && !isGenerating && !progress?.status && (
                  <button
                    onClick={
                      isDebatePrep
                        ? handleGenerateStrategy
                        : handleGenerateGenericPrep
                    }
                    className="inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-medium text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: colors.primaryLight }}
                  >
                    Generate Prep Materials
                  </button>
                )}
                {(isGenerating ||
                  (progress &&
                    progress.status !== "complete" &&
                    progress.status !== "error" &&
                    progress.status !== "idle")) && (
                    <button
                      disabled
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium text-white opacity-70"
                      style={{ backgroundColor: colors.primaryLight }}
                    >
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </button>
                  )}
                <button
                  onClick={handleStartDebate}
                  className="inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-semibold transition-all hover:opacity-80"
                  style={{
                    backgroundColor: hasStrategy
                      ? colors.primary
                      : colors.cardBg,
                    border: hasStrategy
                      ? "none"
                      : `2px solid ${colors.border} `,
                    color: hasStrategy ? "white" : colors.text,
                  }}
                >
                  {isDebatePrep ? "Start Debate" : "Start Practice"}
                </button>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <GenerationProgress progress={progress} />
          <GeminiProgress geminiProgress={geminiProgress} />

          {/* Content */}
          <div className="flex-1 p-6 overflow-hidden">
            {hasStrategy ? (
              <Tabs defaultValue="study" className="h-full flex flex-col">
                <TabsList
                  className={cn(
                    "grid w-full mb-4",
                    isDebatePrep ? "grid-cols-7" : "grid-cols-2",
                  )}
                >
                  <TabsTrigger value="study">Study Mode</TabsTrigger>
                  {isDebatePrep && (
                    <TabsTrigger
                      value="brief"
                      className="flex items-center gap-1.5"
                    >
                      <Target className="h-4 w-4" />
                      Strategic Brief
                    </TabsTrigger>
                  )}
                  <TabsTrigger value="quickref">Quick Reference</TabsTrigger>
                  {isDebatePrep && (
                    <>
                      <TabsTrigger value="research">Research Data</TabsTrigger>
                      <TabsTrigger value="myresearch">My Research</TabsTrigger>
                      <TabsTrigger
                        value="chat"
                        className="flex items-center gap-1.5"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Talk to the system
                      </TabsTrigger>
                      <TabsTrigger
                        value="gemini-report"
                        className="flex items-center gap-1.5"
                      >
                        <FileSearch className="h-4 w-4" />
                        Deep Research Report
                      </TabsTrigger>
                    </>
                  )}
                </TabsList>

                <div className="flex-1 overflow-y-auto pr-2">
                  {/* STUDY MODE TAB */}
                  <TabsContent value="study" className="space-y-8 pb-10">
                    {/* DEBATE PREP CONTENT */}
                    {isDebatePrep && (
                      <StudyModeDebate
                        opponent={opponent}
                        editingId={editingId}
                        setEditingId={setEditingId}
                        addingType={addingType}
                        setAddingType={setAddingType}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleAdd={handleAdd}
                        handleSelectionUpdate={handleSelectionUpdate}
                        expandedItems={expandedItems}
                        toggleExpand={toggleExpand}
                        toggleFrame={toggleFrame}
                        toggleCounter={toggleCounter}
                        toggleZinger={toggleZinger}
                        groupedReceipts={groupedReceipts}
                        renderComplex={renderComplex}
                      />
                    )}

                    {/* GENERIC PREP CONTENT */}
                    {!isDebatePrep && (
                      <StudyModeGeneric
                        opponent={opponent}
                        opponentId={opponentId as Id<"opponents">}
                        editingId={editingId}
                        setEditingId={setEditingId}
                        addingType={addingType}
                        setAddingType={setAddingType}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleAdd={handleAdd}
                        updateGenericPrepText={updateGenericPrepText}
                      />
                    )}
                  </TabsContent>

                  {/* STRATEGIC BRIEF TAB (debate only) */}
                  {isDebatePrep && (
                    <TabsContent value="brief" className="space-y-4 pb-10">
                      <StrategicBriefTab
                        strategicBrief={opponent.strategicBrief}
                        strategicBriefMetadata={opponent.strategicBriefMetadata}
                      />
                    </TabsContent>
                  )}

                  {/* QUICK REFERENCE TAB */}
                  <TabsContent value="quickref" className="h-full">
                    {/* DEBATE QUICK REFERENCE */}
                    {isDebatePrep && (
                      <QuickRefDebate
                        selectedOpening={selectedOpening}
                        selectedClosing={selectedClosing}
                        selectedFrames={selectedFrames}
                        selectedZingers={selectedZingers}
                        selectedCounters={selectedCounters}
                        groupedReceipts={groupedReceipts}
                        renderComplex={renderComplex}
                      />
                    )}

                    {/* GENERIC QUICK REFERENCE */}
                    {!isDebatePrep && <QuickRefGeneric opponent={opponent} />}
                  </TabsContent>

                  {/* RESEARCH TAB (debate only) */}
                  {isDebatePrep && (
                    <TabsContent value="research" className="space-y-4">
                      <ResearchTab researchDocs={researchDocs} />
                    </TabsContent>
                  )}

                  {/* MY RESEARCH TAB - User-provided research material (debate only) */}
                  {isDebatePrep && (
                    <TabsContent value="myresearch" className="space-y-6">
                      <MyResearchTab
                        userResearchText={userResearchText}
                        setUserResearchText={setUserResearchText}
                        isProcessingResearch={isProcessingResearch}
                        handleProcessResearch={handleProcessResearch}
                        processedResearch={processedResearch}
                        handleSendExtractedItem={handleSendExtractedItem}
                        sentItems={sentItems}
                      />
                    </TabsContent>
                  )}

                  {/* CHAT TAB - RAG-powered research chatbot (debate only) */}
                  {isDebatePrep && (
                    <TabsContent value="chat" className="h-full flex flex-col">
                      <ChatTab
                        messages={chatMessages}
                        input={chatInput}
                        setInput={setChatInput}
                        isSending={isSendingChat}
                        onSend={handleSendChat}
                        scrollRef={chatScrollRef}
                      />
                    </TabsContent>
                  )}

                  {/* AI RESEARCH REPORT TAB (debate only) */}
                  {isDebatePrep && (
                    <TabsContent
                      value="gemini-report"
                      className="space-y-4 pb-10"
                    >
                      <GeminiReportTab
                        geminiResearchReport={opponent.geminiResearchReport}
                        geminiResearchMetadata={opponent.geminiResearchMetadata}
                        deepResearchTokens={deepResearchTokens}
                        onRunDeepResearch={() => setShowDeepResearchModal(true)}
                        isGenerating={!!isGeminiGenerating}
                      />
                    </TabsContent>
                  )}
                </div>
              </Tabs>
            ) : (
              <EmptyState
                isDebatePrep={isDebatePrep}
                progress={progress}
                isGenerating={isGenerating}
                handleGenerateStrategy={handleGenerateStrategy}
                handleGenerateGenericPrep={handleGenerateGenericPrep}
                getStepStatus={getStepStatus}
              />
            )}
          </div>
        </div>
      </div>

      {/* Deep Research Modal */}
      <DeepResearchModal
        open={showDeepResearchModal}
        onOpenChange={setShowDeepResearchModal}
        deepResearchTokens={deepResearchTokens}
        onRunDeepResearch={handleRunDeepResearch}
      />
    </div>
  );
}
