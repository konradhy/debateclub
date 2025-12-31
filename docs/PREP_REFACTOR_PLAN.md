# Prep Page Refactoring Plan

**Current size:** 3,130 lines
**Target size:** ~250 lines (main file) anywhere under 800 is success
**Goal:** Extract components while maintaining identical appearance and functionality

---

## Data Flow Analysis

### Data Sources (at the top level)

```
PrepScreen
├── usePrepData(opponentId) → opponent, research, progress, geminiProgress,
│                             chatMessages, mutations (generate*, update*, etc.)
├── usePrepChat(chatMessages) → chatInput, setChatInput, isSendingChat, chatScrollRef
└── Local state → isGenerating, editingId, addingType, expandedItems,
                  userResearchText, processedResearch, etc.
```

### What Each Component Needs

| Component | Props Needed |
|-----------|-------------|
| **PrepHeader** | None (imports colors directly) |
| **GenerationProgress** | `progress` |
| **GeminiProgress** | `geminiProgress` |
| **ChatTab** | `chatMessages`, `chatInput`, `setChatInput`, `isSendingChat`, `onSendChat`, `chatScrollRef` |
| **ResearchTab** | `research` |
| **GeminiReportTab** | `report`, `metadata` (from opponent) |
| **MyResearchTab** | `opponent`, `userResearchText`, `setUserResearchText`, `isProcessing`, `processedResearch`, `onProcess` |
| **QuickRefDebate** | `selectedOpening`, `selectedClosing`, `selectedFrames`, `selectedZingers`, `selectedCounters`, `groupedReceipts` |
| **QuickRefGeneric** | `opponent` |
| **StudyModeGeneric** | `opponent`, `opponentId`, editing state, handlers |
| **StudyModeDebate** | `opponent`, `opponentId`, editing state, expand state, handlers, selections |
| **EmptyState** | `progress`, `isDebatePrep`, `isGenerating`, `onGenerate` |

---

## Shared Patterns

Many components (especially Study Mode sections) share the same editing interface:

```tsx
// Common editing props - could be a type
interface EditingProps {
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  addingType: string | null;
  setAddingType: (type: string | null) => void;
  onEdit: (field: string, itemId: string, updates: any) => Promise<void>;
  onAdd: (field: string, item: any) => Promise<void>;
  onDelete: (field: string, itemId: string) => Promise<void>;
}

// Common expand props
interface ExpandProps {
  expandedItems: Record<string, boolean>;
  toggleExpand: (id: string) => void;
}
```

---

## The `usePrepHandlers` Hook Design

This is the key extraction. It takes dependencies and returns handlers + state:

```tsx
// Input: what it needs from parent
usePrepHandlers({
  opponentId,
  opponent,
  // Mutations from usePrepData
  generateStrategy,
  generateGenericPrep,
  sendChatMessage,
  processResearchText,
  updateSelection,
  updateField,
  addFieldItem,
  deleteFieldItem,
  updateGenericPrepText,
  // Callbacks
  refetchProgress,
  refetchChat,
})

// Output: what it provides
{
  // Local state
  isGenerating,
  editingId, setEditingId,
  addingType, setAddingType,
  expandedItems, toggleExpand,
  userResearchText, setUserResearchText,
  isProcessingResearch,
  processedResearch,

  // Handlers
  handleGenerateStrategy,
  handleGenerateGenericPrep,
  handleSendChat,
  handleProcessResearch,
  handleSelectionUpdate,
  handleEdit, handleAdd, handleDelete,
  toggleFrame, toggleZinger, toggleCounter,

  // Derived
  groupedReceipts,
  getStepStatus,
  renderComplex,
}
```

---

## Architecture Decision: Prop Drilling vs Context

**Prop drilling (recommended for this case):**
- Explicit dependencies - you see exactly what each component needs
- Easier to test components in isolation
- Tree isn't deeply nested (max 2-3 levels)
- Refactoring is straightforward

**Context would be overkill because:**
- No deeply nested consumers
- No "prop threading" through many intermediate components
- State isn't truly global to the app

---

## The Flow For Each Phase

```
Phase N:
1. Create new file with component
2. Copy JSX + any local helpers
3. Define props interface
4. Import in prep.tsx, pass props
5. Test - should look identical
6. Move to next component
```

---

## Phase-by-Phase Plan

| Phase | What | ~Lines | Notes |
|-------|------|--------|-------|
| 1 | `ProgressStep`, `colors`, `PrepHeader` | 50 | Warmup, no props or minimal |
| 2 | `GenerationProgress`, `GeminiProgress` | 106 | Simple prop drilling |
| 3 | `usePrepHandlers` hook | 170 | The big logic extraction |
| 4 | `ChatTab`, `ResearchTab` | 170 | Small tabs, test the pattern |
| 5 | `GeminiReportTab`, `MyResearchTab` | 465 | Medium tabs |
| 6 | `QuickRefDebate`, `QuickRefGeneric` | 320 | Quick ref tabs |
| 7 | `StudyModeGeneric` | 335 | Generic prep as one component |
| 8 | `StudyModeDebate` (one big component first) | 996 | All debate sections together |
| 9 | Break `StudyModeDebate` into sections | 0 (refactor) | Optional: split into 6 section components |
| 10 | `EmptyState` | 96 | Final cleanup |

---

## Component Breakdown with Sizes

| Component | Lines | Description |
|-----------|-------|-------------|
| **`ProgressStep`** | ~23 | Step indicator with pending/active/complete states |
| **`usePrepHandlers`** | ~170 | Hook with all handlers + local state (isGenerating, editingId, etc.) |
| **`PrepHeader`** | ~22 | Site header with back button and logo |
| **`GenerationProgress`** | ~54 | Progress bar during strategy generation |
| **`GeminiProgress`** | ~52 | Gemini deep research progress + error display |
| **`ChatTab`** | ~128 | Chat interface with messages and input |
| **`ResearchTab`** | ~44 | Research articles list |
| **`GeminiReportTab`** | ~188 | Markdown research report display |
| **`MyResearchTab`** | ~277 | User research input + processed results |
| **`QuickRefDebate`** | ~200 | Quick reference cards for debate |
| **`QuickRefGeneric`** | ~120 | Quick reference cards for generic prep |
| **`StudyModeGeneric`** | ~335 | Generic prep content (opening, talking points, etc.) |
| **`OpeningStatementsSection`** | ~183 | Opening statements with InlineEdit |
| **`ArgumentFramesSection`** | ~245 | Argument frames with checkboxes |
| **`OpponentIntelSection`** | ~80 | Opponent intelligence cards |
| **`ReceiptsSection`** | ~180 | Receipts arsenal grid |
| **`ZingerBankSection`** | ~130 | Zinger bank with favorites |
| **`ClosingStatementsSection`** | ~178 | Closing statements |
| **`EmptyState`** | ~96 | "No strategy yet" state |

---

## Refactored Main File Structure

**Estimated final size: ~250 lines** (down from 3,130)

```tsx
// ============================================
// IMPORTS (~20 lines)
// ============================================
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Id } from "@cvx/_generated/dataModel";
import { usePrepData } from "@/hooks/prep/usePrepData";
import { usePrepChat } from "@/hooks/prep/usePrepChat";
import { usePrepHandlers } from "@/hooks/prep/usePrepHandlers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import siteConfig from "~/site.config";

// Component imports
import { PrepHeader } from "@/components/prep/PrepHeader";
import { GenerationProgress } from "@/components/prep/GenerationProgress";
import { GeminiProgress } from "@/components/prep/GeminiProgress";
import { ChatTab } from "@/components/prep/ChatTab";
import { ResearchTab } from "@/components/prep/ResearchTab";
import { GeminiReportTab } from "@/components/prep/GeminiReportTab";
import { MyResearchTab } from "@/components/prep/MyResearchTab";
import { QuickRefDebate } from "@/components/prep/QuickRefDebate";
import { QuickRefGeneric } from "@/components/prep/QuickRefGeneric";
import { StudyModeDebate } from "@/components/prep/StudyModeDebate";
import { StudyModeGeneric } from "@/components/prep/StudyModeGeneric";
import { EmptyState } from "@/components/prep/EmptyState";

// ============================================
// ROUTE CONFIG (~15 lines)
// ============================================
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

// ============================================
// MAIN COMPONENT (~215 lines)
// ============================================
function PrepScreen() {
  const navigate = useNavigate();
  const { opponentId } = Route.useSearch();

  // ============================================
  // DATA HOOKS (~20 lines)
  // ============================================
  const {
    opponent,
    research,
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

  const {
    chatInput,
    setChatInput,
    isSendingChat,
    setIsSendingChat,
    chatScrollRef,
  } = usePrepChat(chatMessages);

  // ============================================
  // HANDLERS HOOK (~15 lines)
  // ============================================
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
    handleSelectionUpdate,
    handleEdit,
    handleAdd,
    handleDelete,
    toggleFrame,
    toggleZinger,
    toggleCounter,
    groupedReceipts,
    renderComplex,
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
    updateGenericPrepText,
    refetchProgress,
    refetchChat,
    chatInput,
    setChatInput,
    setIsSendingChat,
  });

  // ============================================
  // DERIVED DATA (~15 lines)
  // ============================================
  const isDebatePrep = opponent?.prepType !== "generic";

  const hasDebateStrategy =
    !!opponent?.openingOptions && opponent.openingOptions.length > 0;

  const hasGenericPrep =
    !!opponent?.openingApproach ||
    (opponent?.talkingPoints && opponent.talkingPoints.length > 0) ||
    (opponent?.keyPhrases && opponent.keyPhrases.length > 0) ||
    (opponent?.responseMap && opponent.responseMap.length > 0) ||
    !!opponent?.closingApproach;

  const hasStrategy = isDebatePrep ? hasDebateStrategy : hasGenericPrep;

  const selectedOpening = opponent?.openingOptions?.find(
    (o) => o.id === opponent.selectedOpeningId,
  );
  const selectedClosing = opponent?.closingOptions?.find(
    (c) => c.id === opponent.selectedClosingId,
  );
  const selectedFrames =
    opponent?.argumentFrames?.filter((f) =>
      opponent.selectedFrameIds?.includes(f.id),
    ) || [];
  const selectedZingers =
    opponent?.zingers?.filter((z) =>
      opponent.selectedZingerIds?.includes(z.id),
    ) || [];
  const selectedCounters =
    opponent?.opponentIntel?.flatMap((intel) =>
      intel.counters
        .filter((c) => opponent.selectedCounterIds?.includes(c.id))
        .map((c) => ({
          ...c,
          argument: intel.argument,
        })),
    ) || [];

  // ============================================
  // EARLY RETURN (~5 lines)
  // ============================================
  if (!opponent) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-primary/60">Loading opponent...</p>
      </div>
    );
  }

  const handleStartDebate = () => {
    navigate({
      to: "/dashboard/debate",
      search: { opponentId },
    });
  };

  // ============================================
  // JSX RETURN (~150 lines)
  // ============================================
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
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
          {/* Page Header - inline for now (~60 lines) */}
          <div className="p-6 lg:p-8" style={{ borderBottom: `1px solid ${colors.border}` }}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-col gap-3">
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: colors.text, fontFamily: "Georgia, serif" }}>
                    {opponent.name}
                  </h1>
                  <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
                    {opponent.topic}
                  </p>
                </div>
                {isDebatePrep && (
                  <div className="flex items-center gap-4 text-sm" style={{ color: colors.textLight }}>
                    <span>Your position: <span className="font-medium capitalize" style={{ color: colors.text }}>{opponent.position}</span></span>
                    <span>•</span>
                    <span>Opponent: <span className="font-medium capitalize" style={{ color: colors.text }}>{opponent.position}</span></span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {/* Generate buttons logic here */}
                <button
                  onClick={handleStartDebate}
                  className="inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-semibold transition-all hover:opacity-80"
                  style={{
                    backgroundColor: hasStrategy ? colors.primary : colors.cardBg,
                    border: hasStrategy ? "none" : `2px solid ${colors.border}`,
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
                <TabsList className={cn("grid w-full mb-4", isDebatePrep ? "grid-cols-6" : "grid-cols-2")}>
                  <TabsTrigger value="study">Study Mode</TabsTrigger>
                  <TabsTrigger value="quickref">Quick Reference</TabsTrigger>
                  {isDebatePrep && (
                    <>
                      <TabsTrigger value="research">Research Data</TabsTrigger>
                      <TabsTrigger value="myresearch">My Research</TabsTrigger>
                      <TabsTrigger value="chat">Talk to the system</TabsTrigger>
                      <TabsTrigger value="gemini-report">Deep Research Report</TabsTrigger>
                    </>
                  )}
                </TabsList>

                <div className="flex-1 overflow-y-auto pr-2">
                  {/* STUDY MODE TAB */}
                  <TabsContent value="study" className="space-y-8 pb-10">
                    {isDebatePrep ? (
                      <StudyModeDebate
                        opponent={opponent}
                        opponentId={opponentId}
                        editingId={editingId}
                        setEditingId={setEditingId}
                        addingType={addingType}
                        setAddingType={setAddingType}
                        expandedItems={expandedItems}
                        onToggleExpand={toggleExpand}
                        onEdit={handleEdit}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        onUpdateSelection={handleSelectionUpdate}
                        onToggleFrame={toggleFrame}
                        onToggleZinger={toggleZinger}
                        onToggleCounter={toggleCounter}
                        groupedReceipts={groupedReceipts}
                        renderComplex={renderComplex}
                      />
                    ) : (
                      <StudyModeGeneric
                        opponent={opponent}
                        opponentId={opponentId}
                        editingId={editingId}
                        setEditingId={setEditingId}
                        addingType={addingType}
                        setAddingType={setAddingType}
                        onEdit={handleEdit}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        onUpdateGenericPrepText={updateGenericPrepText}
                      />
                    )}
                  </TabsContent>

                  {/* QUICK REFERENCE TAB */}
                  <TabsContent value="quickref" className="h-full">
                    {isDebatePrep ? (
                      <QuickRefDebate
                        selectedOpening={selectedOpening}
                        selectedClosing={selectedClosing}
                        selectedFrames={selectedFrames}
                        selectedZingers={selectedZingers}
                        selectedCounters={selectedCounters}
                        groupedReceipts={groupedReceipts}
                        renderComplex={renderComplex}
                      />
                    ) : (
                      <QuickRefGeneric opponent={opponent} />
                    )}
                  </TabsContent>

                  {/* DEBATE-ONLY TABS */}
                  {isDebatePrep && (
                    <>
                      <TabsContent value="research" className="space-y-4">
                        <ResearchTab research={research} />
                      </TabsContent>

                      <TabsContent value="myresearch" className="space-y-6">
                        <MyResearchTab
                          opponent={opponent}
                          userResearchText={userResearchText}
                          setUserResearchText={setUserResearchText}
                          isProcessing={isProcessingResearch}
                          processedResearch={processedResearch}
                          onProcess={handleProcessResearch}
                        />
                      </TabsContent>

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

                      <TabsContent value="gemini-report" className="space-y-4 pb-10">
                        <GeminiReportTab
                          report={opponent.geminiResearchReport}
                          metadata={opponent.geminiResearchMetadata}
                        />
                      </TabsContent>
                    </>
                  )}
                </div>
              </Tabs>
            ) : (
              <EmptyState
                progress={progress}
                isDebatePrep={isDebatePrep}
                isGenerating={isGenerating}
                onGenerate={isDebatePrep ? handleGenerateStrategy : handleGenerateGenericPrep}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Success Criteria

After each phase:
- ✅ App runs without errors
- ✅ Visual appearance is identical
- ✅ All interactions work the same
- ✅ No performance degradation
- ✅ TypeScript compiles without errors

---

## Notes

- **Page Header** (the section with opponent name, topic, and buttons) remains inline for now - can be extracted later if desired
- **colors** constant gets moved to `lib/prep-colors.ts` in Phase 1

- Each extracted component lives in `src/components/prep/`
- The handlers hook lives in `src/hooks/prep/usePrepHandlers.ts`
