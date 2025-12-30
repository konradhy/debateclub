import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Id } from "@cvx/_generated/dataModel";
import { usePrepData } from "@/hooks/prep/usePrepData";
import { usePrepChat } from "@/hooks/prep/usePrepChat";
import { usePrepHandlers } from "@/hooks/prep/usePrepHandlers";
import { Button } from "@/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import siteConfig from "~/site.config";
import { colors } from "@/lib/prep-colors";
import { ProgressStep } from "@/components/prep/ProgressStep";
import { PrepHeader } from "@/components/prep/PrepHeader";
import { GenerationProgress } from "@/components/prep/GenerationProgress";
import { GeminiProgress } from "@/components/prep/GeminiProgress";
import ReactMarkdown from "react-markdown";
import {
  Brain,
  Loader2,
  ChevronDown,
  ChevronUp,
  Heart,
  BookOpen,
  Zap,
  Target,
  ShieldAlert,
  ExternalLink,
  Eye,
  AlertTriangle,
  FileText,
  MessageSquare,
  Send,
  FileSearch,
} from "lucide-react";
import { cn } from "@/utils/misc";
import { Checkbox } from "@/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Label } from "@/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { ScrollArea } from "@/ui/scroll-area";
import { InlineEdit, AddButton } from "@/ui/inline-edit";
import { Textarea } from "@/ui/textarea";
import { Input } from "@/ui/input";

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

  // Data hooks
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

  if (!opponent) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-primary/60">Loading opponent...</p>
      </div>
    );
  }

  const userPosition = opponent.position;
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
                  <>
                    {isDebatePrep ? (
                      <>
                        <button
                          onClick={handleGenerateStrategy}
                          className="inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-medium text-white transition-all hover:brightness-110"
                          style={{ backgroundColor: colors.primaryLight }}
                        >
                          Fast Research
                        </button>
                        <button
                          onClick={() => {
                            if (opponentId) {
                              generateGemini({
                                opponentId: opponentId as Id<"opponents">,
                                topic: opponent.topic,
                                position: opponent.position,
                              });
                            }
                          }}
                          disabled={
                            geminiProgress?.status &&
                            !["complete", "error"].includes(
                              geminiProgress.status,
                            )
                          }
                          className="inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-medium text-white transition-all hover:brightness-110 disabled:opacity-50"
                          style={{ backgroundColor: colors.primaryLight }}
                        >
                          Deep Research
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleGenerateGenericPrep}
                        className="inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-medium text-white transition-all hover:brightness-110"
                        style={{ backgroundColor: colors.primaryLight }}
                      >
                        Generate Prep Materials
                      </button>
                    )}
                  </>
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
                    isDebatePrep ? "grid-cols-6" : "grid-cols-2",
                  )}
                >
                  <TabsTrigger value="study">Study Mode</TabsTrigger>
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
                      <>
                        {/* Opening Statements */}
                        <section className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-blue-500" />
                              Opening Statements
                            </h3>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">
                              Pick One
                            </span>
                          </div>
                          <RadioGroup
                            value={opponent.selectedOpeningId || ""}
                            onValueChange={(val) =>
                              handleSelectionUpdate({ selectedOpeningId: val })
                            }
                          >
                            <div className="grid gap-4">
                              {opponent.openingOptions?.map((option) => (
                                <InlineEdit
                                  key={option.id}
                                  isEditing={editingId === option.id}
                                  onEdit={() => setEditingId(option.id)}
                                  onDelete={() =>
                                    handleDelete("openingOptions", option.id)
                                  }
                                  onSave={(data) =>
                                    handleEdit(
                                      "openingOptions",
                                      option.id,
                                      data,
                                    )
                                  }
                                  onCancel={() => setEditingId(null)}
                                  initialData={option}
                                  formFields={[
                                    {
                                      name: "type",
                                      label: "Type",
                                      type: "select",
                                      options: [
                                        "Personal Story",
                                        "Provocative Question",
                                        "Bold Statement",
                                      ],
                                      required: true,
                                    },
                                    {
                                      name: "hook",
                                      label: "Hook",
                                      type: "text",
                                      required: true,
                                    },
                                    {
                                      name: "content",
                                      label: "Content",
                                      type: "textarea",
                                      required: true,
                                      rows: 6,
                                    },
                                    {
                                      name: "deliveryGuidance",
                                      label: "Delivery Guidance",
                                      type: "textarea",
                                      rows: 2,
                                    },
                                  ]}
                                >
                                  <div
                                    className={cn(
                                      "relative flex flex-col space-y-2 rounded-lg border p-4 transition-all",
                                      opponent.selectedOpeningId === option.id
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:bg-secondary/50",
                                    )}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                          value={option.id}
                                          id={option.id}
                                        />
                                        <Label
                                          htmlFor={option.id}
                                          className="font-medium cursor-pointer"
                                        >
                                          {option.type}
                                        </Label>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleExpand(option.id)}
                                        className="h-6 w-6 p-0"
                                      >
                                        {expandedItems[option.id] ? (
                                          <ChevronUp className="h-4 w-4" />
                                        ) : (
                                          <ChevronDown className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </div>
                                    <div className="pl-6">
                                      <p className="text-sm text-muted-foreground italic mb-2">
                                        "{option.hook}"
                                      </p>
                                      {expandedItems[option.id] && (
                                        <div className="mt-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                          <p className="text-sm leading-relaxed">
                                            {option.content}
                                          </p>
                                          <div className="text-xs bg-secondary p-2 rounded text-secondary-foreground flex gap-2">
                                            <span className="font-semibold">
                                              Guidance:
                                            </span>{" "}
                                            {option.deliveryGuidance}
                                          </div>
                                          <div className="text-xs text-muted-foreground text-right">
                                            {option.wordCount} words
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </InlineEdit>
                              ))}
                              {addingType === "opening" && (
                                <InlineEdit
                                  isEditing={false}
                                  isAdding={true}
                                  onEdit={() => {}}
                                  onSave={(data) =>
                                    handleAdd("openingOptions", {
                                      ...data,
                                      wordCount:
                                        data.content?.trim().split(/\s+/)
                                          .length || 0,
                                    })
                                  }
                                  onCancel={() => setAddingType(null)}
                                  formFields={[
                                    {
                                      name: "type",
                                      label: "Type",
                                      type: "select",
                                      options: [
                                        "Personal Story",
                                        "Provocative Question",
                                        "Bold Statement",
                                      ],
                                      required: true,
                                    },
                                    {
                                      name: "hook",
                                      label: "Hook",
                                      type: "text",
                                      required: true,
                                    },
                                    {
                                      name: "content",
                                      label: "Content",
                                      type: "textarea",
                                      required: true,
                                      rows: 6,
                                    },
                                    {
                                      name: "deliveryGuidance",
                                      label: "Delivery Guidance",
                                      type: "textarea",
                                      rows: 2,
                                    },
                                  ]}
                                >
                                  <div />
                                </InlineEdit>
                              )}
                              {addingType !== "opening" && (
                                <AddButton
                                  onClick={() => setAddingType("opening")}
                                  label="Add Opening Statement"
                                />
                              )}
                            </div>
                          </RadioGroup>
                        </section>

                        {/* Argument Frames */}
                        <section className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <Target className="h-5 w-5 text-green-500" />
                              Argument Frames
                            </h3>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">
                              Select Multiple
                            </span>
                          </div>
                          <div className="grid gap-4">
                            {opponent.argumentFrames?.map((frame) => (
                              <InlineEdit
                                key={frame.id}
                                isEditing={editingId === frame.id}
                                onEdit={() => setEditingId(frame.id)}
                                onDelete={() =>
                                  handleDelete("argumentFrames", frame.id)
                                }
                                onSave={(data) =>
                                  handleEdit("argumentFrames", frame.id, {
                                    ...data,
                                    evidenceIds: frame.evidenceIds,
                                  })
                                }
                                onCancel={() => setEditingId(null)}
                                initialData={frame}
                                formFields={[
                                  {
                                    name: "label",
                                    label: "Label",
                                    type: "text",
                                    required: true,
                                  },
                                  {
                                    name: "summary",
                                    label: "Summary",
                                    type: "textarea",
                                    required: true,
                                    rows: 2,
                                  },
                                  {
                                    name: "content",
                                    label: "Content",
                                    type: "textarea",
                                    required: true,
                                    rows: 3,
                                  },
                                  {
                                    name: "detailedContent",
                                    label: "Detailed Content",
                                    type: "textarea",
                                    required: true,
                                    rows: 4,
                                  },
                                  {
                                    name: "deploymentGuidance",
                                    label: "Deployment Guidance",
                                    type: "textarea",
                                    required: true,
                                    rows: 2,
                                  },
                                  {
                                    name: "evidenceNeeded",
                                    label: "Evidence Needed (optional)",
                                    type: "textarea",
                                    rows: 2,
                                  },
                                  {
                                    name: "emotionalCore",
                                    label: "Emotional Core (optional)",
                                    type: "text",
                                  },
                                ]}
                              >
                                <div
                                  className={cn(
                                    "relative flex flex-col space-y-2 rounded-lg border p-4 transition-all",
                                    opponent.selectedFrameIds?.includes(
                                      frame.id,
                                    )
                                      ? "border-primary bg-primary/5"
                                      : "border-border hover:bg-secondary/50",
                                  )}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        id={frame.id}
                                        checked={opponent.selectedFrameIds?.includes(
                                          frame.id,
                                        )}
                                        onCheckedChange={() =>
                                          toggleFrame(frame.id)
                                        }
                                      />
                                      <Label
                                        htmlFor={frame.id}
                                        className="font-medium cursor-pointer"
                                      >
                                        {frame.label}
                                      </Label>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleExpand(frame.id)}
                                      className="h-6 w-6 p-0"
                                    >
                                      {expandedItems[frame.id] ? (
                                        <ChevronUp className="h-4 w-4" />
                                      ) : (
                                        <ChevronDown className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="pl-6">
                                    <p className="text-sm text-muted-foreground mb-2">
                                      {frame.summary}
                                    </p>
                                    {expandedItems[frame.id] && (
                                      <div className="mt-2 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <p className="text-sm leading-relaxed font-medium">
                                          {frame.content}
                                        </p>
                                        <div className="p-3 bg-secondary/30 rounded-md border border-border">
                                          <p className="text-sm text-muted-foreground leading-relaxed">
                                            {frame.detailedContent}
                                          </p>
                                        </div>
                                        <div className="text-xs bg-secondary p-2 rounded text-secondary-foreground">
                                          <span className="font-semibold">
                                            Deploy when:
                                          </span>{" "}
                                          {frame.deploymentGuidance}
                                        </div>
                                        <div className="space-y-1">
                                          <p className="text-xs font-semibold text-muted-foreground">
                                            Available Evidence:
                                          </p>
                                          {frame.evidenceIds.map((eid) => {
                                            const receipt =
                                              opponent.receipts?.find(
                                                (r) => r.id === eid,
                                              );
                                            return receipt ? (
                                              <div
                                                key={eid}
                                                className="text-xs border-l-2 border-primary/30 pl-2 py-1 flex items-center gap-2"
                                              >
                                                <span className="font-medium">
                                                  {receipt.source}:
                                                </span>
                                                <span>{receipt.content}</span>
                                                {receipt.url && (
                                                  <a
                                                    href={receipt.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline flex items-center"
                                                  >
                                                    <ExternalLink className="h-3 w-3 ml-1" />
                                                  </a>
                                                )}
                                              </div>
                                            ) : null;
                                          })}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </InlineEdit>
                            ))}
                            {addingType === "frame" && (
                              <InlineEdit
                                isEditing={false}
                                isAdding={true}
                                onEdit={() => {}}
                                onSave={(data) =>
                                  handleAdd("argumentFrames", {
                                    ...data,
                                    evidenceIds: [],
                                  })
                                }
                                onCancel={() => setAddingType(null)}
                                formFields={[
                                  {
                                    name: "label",
                                    label: "Label",
                                    type: "text",
                                    required: true,
                                  },
                                  {
                                    name: "summary",
                                    label: "Summary",
                                    type: "textarea",
                                    required: true,
                                    rows: 2,
                                  },
                                  {
                                    name: "content",
                                    label: "Content",
                                    type: "textarea",
                                    required: true,
                                    rows: 3,
                                  },
                                  {
                                    name: "detailedContent",
                                    label: "Detailed Content",
                                    type: "textarea",
                                    required: true,
                                    rows: 4,
                                  },
                                  {
                                    name: "deploymentGuidance",
                                    label: "Deployment Guidance",
                                    type: "textarea",
                                    required: true,
                                    rows: 2,
                                  },
                                  {
                                    name: "evidenceNeeded",
                                    label: "Evidence Needed (optional)",
                                    type: "textarea",
                                    rows: 2,
                                  },
                                  {
                                    name: "emotionalCore",
                                    label: "Emotional Core (optional)",
                                    type: "text",
                                  },
                                ]}
                              >
                                <div />
                              </InlineEdit>
                            )}
                            {addingType !== "frame" && (
                              <AddButton
                                onClick={() => setAddingType("frame")}
                                label="Add Argument Frame"
                              />
                            )}
                          </div>
                        </section>

                        {/* Opponent Intelligence */}
                        <section className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <Eye className="h-5 w-5 text-red-500" />
                              Opponent Intelligence
                            </h3>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">
                              Select Counters
                            </span>
                          </div>
                          <div className="grid gap-4">
                            {opponent.opponentIntel?.map((intel) => (
                              <Card
                                key={intel.id}
                                className="border-red-500/20 bg-red-500/5"
                              >
                                <CardHeader className="pb-2 pt-4">
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-base font-medium text-red-700 dark:text-red-400">
                                      Prediction: "{intel.argument}"
                                    </CardTitle>
                                    <span className="text-xs font-bold uppercase px-2 py-1 bg-red-100 text-red-700 rounded dark:bg-red-900/30 dark:text-red-400">
                                      {intel.likelihood} Likelihood
                                    </span>
                                  </div>
                                </CardHeader>
                                <CardContent className="space-y-3 pb-4">
                                  <div className="text-sm text-muted-foreground flex gap-2 items-start">
                                    <AlertTriangle className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                                    <div>
                                      <span className="font-semibold text-foreground">
                                        Their Evidence:
                                      </span>{" "}
                                      {intel.evidence}
                                      <div className="mt-1 text-green-600 dark:text-green-400">
                                        <span className="font-semibold">
                                          Weakness:
                                        </span>{" "}
                                        {intel.weakness}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-2 mt-2">
                                    <p className="text-xs font-semibold uppercase text-muted-foreground">
                                      Available Counters (Select to Equip):
                                    </p>
                                    {intel.counters.map((counter) => (
                                      <div
                                        key={counter.id}
                                        className="flex items-start space-x-2 p-2 rounded hover:bg-background/50 transition-colors"
                                      >
                                        <Checkbox
                                          id={counter.id}
                                          checked={opponent.selectedCounterIds?.includes(
                                            counter.id,
                                          )}
                                          onCheckedChange={() =>
                                            toggleCounter(counter.id)
                                          }
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                          <Label
                                            htmlFor={counter.id}
                                            className="text-sm font-medium cursor-pointer"
                                          >
                                            {counter.label}
                                          </Label>
                                          <p className="text-sm text-muted-foreground">
                                            {counter.text}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </section>

                        {/* Receipts Arsenal */}
                        <section className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <ShieldAlert className="h-5 w-5 text-orange-500" />
                              Receipts Arsenal
                            </h3>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">
                              Review Only
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Object.entries(groupedReceipts).map(
                              ([category, receipts]) => (
                                <Card
                                  key={category}
                                  className="bg-secondary/20"
                                >
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                      {category}
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3 text-sm">
                                    {receipts?.map((receipt) => (
                                      <InlineEdit
                                        key={receipt.id}
                                        isEditing={editingId === receipt.id}
                                        onEdit={() => setEditingId(receipt.id)}
                                        onDelete={() =>
                                          handleDelete("receipts", receipt.id)
                                        }
                                        onSave={(data) =>
                                          handleEdit(
                                            "receipts",
                                            receipt.id,
                                            data,
                                          )
                                        }
                                        onCancel={() => setEditingId(null)}
                                        initialData={receipt}
                                        formFields={[
                                          {
                                            name: "category",
                                            label: "Category",
                                            type: "select",
                                            options: [
                                              "Statistics",
                                              "Quotes",
                                              "Case Studies",
                                              "Historical Precedent",
                                              "Scientific Studies",
                                            ],
                                            required: true,
                                          },
                                          {
                                            name: "source",
                                            label: "Source",
                                            type: "text",
                                            required: true,
                                          },
                                          {
                                            name: "content",
                                            label: "Content",
                                            type: "textarea",
                                            required: true,
                                            rows: 3,
                                          },
                                          {
                                            name: "deployment",
                                            label: "Deployment",
                                            type: "textarea",
                                            required: true,
                                            rows: 2,
                                          },
                                          {
                                            name: "url",
                                            label: "URL (optional)",
                                            type: "text",
                                          },
                                          {
                                            name: "year",
                                            label: "Year (optional)",
                                            type: "text",
                                          },
                                        ]}
                                      >
                                        <div className="space-y-1 relative p-2 rounded-md hover:bg-background/50 transition-colors">
                                          <div className="flex items-center justify-between">
                                            <div className="font-medium text-primary">
                                              {receipt.source}
                                            </div>
                                            {receipt.url && (
                                              <a
                                                href={receipt.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-600"
                                              >
                                                <ExternalLink className="h-3 w-3" />
                                              </a>
                                            )}
                                          </div>
                                          <div className="text-muted-foreground">
                                            {receipt.content}
                                          </div>
                                          <div className="text-xs text-primary/60 italic">
                                            Use:{" "}
                                            {renderComplex(receipt.deployment)}
                                          </div>
                                        </div>
                                      </InlineEdit>
                                    ))}
                                  </CardContent>
                                </Card>
                              ),
                            )}
                          </div>
                          {addingType === "receipt" && (
                            <InlineEdit
                              isEditing={false}
                              isAdding={true}
                              onEdit={() => {}}
                              onSave={(data) => handleAdd("receipts", data)}
                              onCancel={() => setAddingType(null)}
                              formFields={[
                                {
                                  name: "category",
                                  label: "Category",
                                  type: "select",
                                  options: [
                                    "Statistics",
                                    "Quotes",
                                    "Case Studies",
                                    "Historical Precedent",
                                    "Scientific Studies",
                                  ],
                                  required: true,
                                },
                                {
                                  name: "source",
                                  label: "Source",
                                  type: "text",
                                  required: true,
                                },
                                {
                                  name: "content",
                                  label: "Content",
                                  type: "textarea",
                                  required: true,
                                  rows: 3,
                                },
                                {
                                  name: "deployment",
                                  label: "Deployment",
                                  type: "textarea",
                                  required: true,
                                  rows: 2,
                                },
                                {
                                  name: "url",
                                  label: "URL (optional)",
                                  type: "text",
                                },
                                {
                                  name: "year",
                                  label: "Year (optional)",
                                  type: "text",
                                },
                              ]}
                            >
                              <div />
                            </InlineEdit>
                          )}
                          {addingType !== "receipt" && (
                            <AddButton
                              onClick={() => setAddingType("receipt")}
                              label="Add Receipt"
                            />
                          )}
                        </section>

                        {/* Zinger Bank */}
                        <section className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <Zap className="h-5 w-5 text-yellow-500" />
                              Zinger Bank
                            </h3>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">
                              Favorite Your Top Picks
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {opponent.zingers?.map((zinger) => (
                              <InlineEdit
                                key={zinger.id}
                                isEditing={editingId === zinger.id}
                                onEdit={() => setEditingId(zinger.id)}
                                onDelete={() =>
                                  handleDelete("zingers", zinger.id)
                                }
                                onSave={(data) =>
                                  handleEdit("zingers", zinger.id, data)
                                }
                                onCancel={() => setEditingId(null)}
                                initialData={zinger}
                                formFields={[
                                  {
                                    name: "text",
                                    label: "Zinger Text",
                                    type: "textarea",
                                    required: true,
                                    rows: 2,
                                  },
                                  {
                                    name: "context",
                                    label: "Context/Usage",
                                    type: "textarea",
                                    required: true,
                                    rows: 2,
                                  },
                                  {
                                    name: "type",
                                    label: "Type (optional)",
                                    type: "text",
                                  },
                                  {
                                    name: "tone",
                                    label: "Tone (optional)",
                                    type: "text",
                                  },
                                ]}
                              >
                                <div
                                  className={cn(
                                    "cursor-pointer group relative flex flex-col justify-between rounded-lg border p-4 transition-all hover:border-yellow-500/50",
                                    opponent.selectedZingerIds?.includes(
                                      zinger.id,
                                    )
                                      ? "border-yellow-500 bg-yellow-500/10"
                                      : "border-border bg-card",
                                  )}
                                  onClick={() => toggleZinger(zinger.id)}
                                >
                                  <div className="mb-2">
                                    <p className="font-bold text-lg leading-tight text-primary">
                                      "{zinger.text}"
                                    </p>
                                  </div>
                                  <div className="flex items-end justify-between">
                                    <p className="text-xs text-muted-foreground italic max-w-[85%]">
                                      {renderComplex(zinger.context)}
                                    </p>
                                    <Heart
                                      className={cn(
                                        "h-5 w-5 transition-colors",
                                        opponent.selectedZingerIds?.includes(
                                          zinger.id,
                                        )
                                          ? "fill-yellow-500 text-yellow-500"
                                          : "text-muted-foreground group-hover:text-yellow-500",
                                      )}
                                    />
                                  </div>
                                </div>
                              </InlineEdit>
                            ))}
                            {addingType === "zinger" && (
                              <InlineEdit
                                isEditing={false}
                                isAdding={true}
                                onEdit={() => {}}
                                onSave={(data) => handleAdd("zingers", data)}
                                onCancel={() => setAddingType(null)}
                                formFields={[
                                  {
                                    name: "text",
                                    label: "Zinger Text",
                                    type: "textarea",
                                    required: true,
                                    rows: 2,
                                  },
                                  {
                                    name: "context",
                                    label: "Context/Usage",
                                    type: "textarea",
                                    required: true,
                                    rows: 2,
                                  },
                                  {
                                    name: "type",
                                    label: "Type (optional)",
                                    type: "text",
                                  },
                                  {
                                    name: "tone",
                                    label: "Tone (optional)",
                                    type: "text",
                                  },
                                ]}
                              >
                                <div />
                              </InlineEdit>
                            )}
                            {addingType !== "zinger" && (
                              <AddButton
                                onClick={() => setAddingType("zinger")}
                                label="Add Zinger"
                              />
                            )}
                          </div>
                        </section>

                        {/* Closing Statements */}
                        <section className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-primary" />
                              Closing Statements
                            </h3>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">
                              Pick One
                            </span>
                          </div>
                          <RadioGroup
                            value={opponent.selectedClosingId || ""}
                            onValueChange={(val) =>
                              handleSelectionUpdate({ selectedClosingId: val })
                            }
                          >
                            <div className="grid gap-4">
                              {opponent.closingOptions?.map((option) => (
                                <InlineEdit
                                  key={option.id}
                                  isEditing={editingId === option.id}
                                  onEdit={() => setEditingId(option.id)}
                                  onDelete={() =>
                                    handleDelete("closingOptions", option.id)
                                  }
                                  onSave={(data) =>
                                    handleEdit(
                                      "closingOptions",
                                      option.id,
                                      data,
                                    )
                                  }
                                  onCancel={() => setEditingId(null)}
                                  initialData={option}
                                  formFields={[
                                    {
                                      name: "type",
                                      label: "Type",
                                      type: "select",
                                      options: [
                                        "Call to Action",
                                        "Emotional Appeal",
                                        "Summary of Wins",
                                      ],
                                      required: true,
                                    },
                                    {
                                      name: "preview",
                                      label: "Preview/Hook",
                                      type: "text",
                                      required: true,
                                    },
                                    {
                                      name: "content",
                                      label: "Content",
                                      type: "textarea",
                                      required: true,
                                      rows: 6,
                                    },
                                    {
                                      name: "deliveryGuidance",
                                      label: "Delivery Guidance",
                                      type: "textarea",
                                      rows: 2,
                                    },
                                  ]}
                                >
                                  <div
                                    className={cn(
                                      "relative flex flex-col space-y-2 rounded-lg border p-4 transition-all",
                                      opponent.selectedClosingId === option.id
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:bg-secondary/50",
                                    )}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                          value={option.id}
                                          id={option.id}
                                        />
                                        <Label
                                          htmlFor={option.id}
                                          className="font-medium cursor-pointer"
                                        >
                                          {option.type}
                                        </Label>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleExpand(option.id)}
                                        className="h-6 w-6 p-0"
                                      >
                                        {expandedItems[option.id] ? (
                                          <ChevronUp className="h-4 w-4" />
                                        ) : (
                                          <ChevronDown className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </div>
                                    <div className="pl-6">
                                      <p className="text-sm text-muted-foreground italic mb-2">
                                        "{option.preview}"
                                      </p>
                                      {expandedItems[option.id] && (
                                        <div className="mt-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                          <p className="text-sm leading-relaxed">
                                            {option.content}
                                          </p>
                                          <div className="text-xs text-muted-foreground text-right">
                                            {option.wordCount} words
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </InlineEdit>
                              ))}
                              {addingType === "closing" && (
                                <InlineEdit
                                  isEditing={false}
                                  isAdding={true}
                                  onEdit={() => {}}
                                  onSave={(data) =>
                                    handleAdd("closingOptions", {
                                      ...data,
                                      wordCount:
                                        data.content?.trim().split(/\s+/)
                                          .length || 0,
                                    })
                                  }
                                  onCancel={() => setAddingType(null)}
                                  formFields={[
                                    {
                                      name: "type",
                                      label: "Type",
                                      type: "select",
                                      options: [
                                        "Call to Action",
                                        "Emotional Appeal",
                                        "Summary of Wins",
                                      ],
                                      required: true,
                                    },
                                    {
                                      name: "preview",
                                      label: "Preview/Hook",
                                      type: "text",
                                      required: true,
                                    },
                                    {
                                      name: "content",
                                      label: "Content",
                                      type: "textarea",
                                      required: true,
                                      rows: 6,
                                    },
                                    {
                                      name: "deliveryGuidance",
                                      label: "Delivery Guidance",
                                      type: "textarea",
                                      rows: 2,
                                    },
                                  ]}
                                >
                                  <div />
                                </InlineEdit>
                              )}
                              {addingType !== "closing" && (
                                <AddButton
                                  onClick={() => setAddingType("closing")}
                                  label="Add Closing Statement"
                                />
                              )}
                            </div>
                          </RadioGroup>
                        </section>
                      </>
                    )}

                    {/* GENERIC PREP CONTENT */}
                    {!isDebatePrep && (
                      <>
                        {/* Opening Approach */}
                        <section className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <Target className="h-5 w-5 text-blue-500" />
                              Opening Approach
                            </h3>
                          </div>
                          <InlineEdit
                            isEditing={editingId === "openingApproach"}
                            onEdit={() => setEditingId("openingApproach")}
                            onSave={async (data) => {
                              await updateGenericPrepText({
                                opponentId: opponentId as Id<"opponents">,
                                field: "openingApproach",
                                value: data.content || "",
                              });
                              setEditingId(null);
                            }}
                            onCancel={() => setEditingId(null)}
                            initialData={{
                              content: opponent.openingApproach || "",
                            }}
                            formFields={[
                              {
                                name: "content",
                                label: "Opening Approach",
                                type: "textarea",
                                rows: 4,
                                required: true,
                              },
                            ]}
                          >
                            <div className="rounded-lg border p-4 bg-card">
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                {opponent.openingApproach || (
                                  <span className="text-muted-foreground italic">
                                    No opening approach yet. Generate prep
                                    materials or click to add.
                                  </span>
                                )}
                              </p>
                            </div>
                          </InlineEdit>
                        </section>

                        {/* Talking Points */}
                        <section className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <MessageSquare className="h-5 w-5 text-green-500" />
                              Talking Points
                            </h3>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">
                              Key points to make
                            </span>
                          </div>
                          <div className="grid gap-3">
                            {opponent.talkingPoints?.map((point) => (
                              <InlineEdit
                                key={point.id}
                                isEditing={editingId === point.id}
                                onEdit={() => setEditingId(point.id)}
                                onDelete={() =>
                                  handleDelete("talkingPoints", point.id)
                                }
                                onSave={(data) =>
                                  handleEdit("talkingPoints", point.id, data)
                                }
                                onCancel={() => setEditingId(null)}
                                initialData={point}
                                formFields={[
                                  {
                                    name: "content",
                                    label: "Talking Point",
                                    type: "textarea",
                                    rows: 2,
                                    required: true,
                                  },
                                ]}
                              >
                                <div className="flex items-start gap-3 rounded-lg border p-4 bg-card hover:bg-secondary/50 transition-all">
                                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center text-sm font-medium">
                                    •
                                  </div>
                                  <p className="text-sm leading-relaxed flex-1">
                                    {point.content}
                                  </p>
                                </div>
                              </InlineEdit>
                            ))}
                            {addingType === "talkingPoint" && (
                              <InlineEdit
                                isEditing={false}
                                isAdding={true}
                                onEdit={() => {}}
                                onSave={(data) =>
                                  handleAdd("talkingPoints", data)
                                }
                                onCancel={() => setAddingType(null)}
                                formFields={[
                                  {
                                    name: "content",
                                    label: "Talking Point",
                                    type: "textarea",
                                    rows: 2,
                                    required: true,
                                  },
                                ]}
                              >
                                <div />
                              </InlineEdit>
                            )}
                            {addingType !== "talkingPoint" && (
                              <AddButton
                                onClick={() => setAddingType("talkingPoint")}
                                label="Add Talking Point"
                              />
                            )}
                          </div>
                        </section>

                        {/* Key Phrases */}
                        <section className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <Zap className="h-5 w-5 text-yellow-500" />
                              Key Phrases
                            </h3>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">
                              Power language
                            </span>
                          </div>
                          <div className="grid gap-2">
                            {opponent.keyPhrases?.map((item) => (
                              <InlineEdit
                                key={item.id}
                                isEditing={editingId === item.id}
                                onEdit={() => setEditingId(item.id)}
                                onDelete={() =>
                                  handleDelete("keyPhrases", item.id)
                                }
                                onSave={(data) =>
                                  handleEdit("keyPhrases", item.id, data)
                                }
                                onCancel={() => setEditingId(null)}
                                initialData={item}
                                formFields={[
                                  {
                                    name: "phrase",
                                    label: "Key Phrase",
                                    type: "text",
                                    required: true,
                                  },
                                ]}
                              >
                                <div className="rounded-lg border p-3 bg-yellow-500/5 border-yellow-500/20 hover:bg-yellow-500/10 transition-all">
                                  <p className="text-sm font-medium">
                                    "{item.phrase}"
                                  </p>
                                </div>
                              </InlineEdit>
                            ))}
                            {addingType === "keyPhrase" && (
                              <InlineEdit
                                isEditing={false}
                                isAdding={true}
                                onEdit={() => {}}
                                onSave={(data) => handleAdd("keyPhrases", data)}
                                onCancel={() => setAddingType(null)}
                                formFields={[
                                  {
                                    name: "phrase",
                                    label: "Key Phrase",
                                    type: "text",
                                    required: true,
                                  },
                                ]}
                              >
                                <div />
                              </InlineEdit>
                            )}
                            {addingType !== "keyPhrase" && (
                              <AddButton
                                onClick={() => setAddingType("keyPhrase")}
                                label="Add Key Phrase"
                              />
                            )}
                          </div>
                        </section>

                        {/* Response Map */}
                        <section className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <ShieldAlert className="h-5 w-5 text-primary" />
                              Response Map
                            </h3>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">
                              When they say X, respond with Y
                            </span>
                          </div>
                          <div className="grid gap-4">
                            {opponent.responseMap?.map((item) => (
                              <InlineEdit
                                key={item.id}
                                isEditing={editingId === item.id}
                                onEdit={() => setEditingId(item.id)}
                                onDelete={() =>
                                  handleDelete("responseMap", item.id)
                                }
                                onSave={(data) =>
                                  handleEdit("responseMap", item.id, data)
                                }
                                onCancel={() => setEditingId(null)}
                                initialData={item}
                                formFields={[
                                  {
                                    name: "trigger",
                                    label: "When they say...",
                                    type: "text",
                                    required: true,
                                  },
                                  {
                                    name: "response",
                                    label: "You respond...",
                                    type: "textarea",
                                    rows: 3,
                                    required: true,
                                  },
                                ]}
                              >
                                <div className="rounded-lg border p-4 bg-card space-y-3 hover:bg-secondary/50 transition-all">
                                  <div className="flex items-center gap-2 text-sm">
                                    <span className="text-muted-foreground">
                                      When they say:
                                    </span>
                                    <span className="font-medium text-primary dark:text-primary">
                                      "{item.trigger}"
                                    </span>
                                  </div>
                                  <div className="pl-4 border-l-2 border-primary/30">
                                    <p className="text-sm leading-relaxed">
                                      {item.response}
                                    </p>
                                  </div>
                                </div>
                              </InlineEdit>
                            ))}
                            {addingType === "responseMap" && (
                              <InlineEdit
                                isEditing={false}
                                isAdding={true}
                                onEdit={() => {}}
                                onSave={(data) =>
                                  handleAdd("responseMap", data)
                                }
                                onCancel={() => setAddingType(null)}
                                formFields={[
                                  {
                                    name: "trigger",
                                    label: "When they say...",
                                    type: "text",
                                    required: true,
                                  },
                                  {
                                    name: "response",
                                    label: "You respond...",
                                    type: "textarea",
                                    rows: 3,
                                    required: true,
                                  },
                                ]}
                              >
                                <div />
                              </InlineEdit>
                            )}
                            {addingType !== "responseMap" && (
                              <AddButton
                                onClick={() => setAddingType("responseMap")}
                                label="Add Response"
                              />
                            )}
                          </div>
                        </section>

                        {/* Closing Approach */}
                        <section className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <Target className="h-5 w-5 text-primary" />
                              Closing Approach
                            </h3>
                          </div>
                          <InlineEdit
                            isEditing={editingId === "closingApproach"}
                            onEdit={() => setEditingId("closingApproach")}
                            onSave={async (data) => {
                              await updateGenericPrepText({
                                opponentId: opponentId as Id<"opponents">,
                                field: "closingApproach",
                                value: data.content || "",
                              });
                              setEditingId(null);
                            }}
                            onCancel={() => setEditingId(null)}
                            initialData={{
                              content: opponent.closingApproach || "",
                            }}
                            formFields={[
                              {
                                name: "content",
                                label: "Closing Approach",
                                type: "textarea",
                                rows: 4,
                                required: true,
                              },
                            ]}
                          >
                            <div className="rounded-lg border p-4 bg-card">
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                {opponent.closingApproach || (
                                  <span className="text-muted-foreground italic">
                                    No closing approach yet. Generate prep
                                    materials or click to add.
                                  </span>
                                )}
                              </p>
                            </div>
                          </InlineEdit>
                        </section>
                      </>
                    )}
                  </TabsContent>

                  {/* QUICK REFERENCE TAB */}
                  <TabsContent value="quickref" className="h-full">
                    {/* DEBATE QUICK REFERENCE */}
                    {isDebatePrep && (
                      <div className="grid grid-cols-12 gap-6 h-full">
                        {/* Left Column: Opening & Closing */}
                        <div className="col-span-4 space-y-6">
                          <Card className="h-auto">
                            <CardHeader className="py-3 bg-blue-500/10">
                              <CardTitle className="text-sm font-bold text-blue-600">
                                OPENING
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="py-4">
                              {selectedOpening ? (
                                <div className="space-y-2">
                                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                                    {selectedOpening.type}
                                  </span>
                                  <p className="text-sm leading-relaxed">
                                    {selectedOpening.content}
                                  </p>
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground italic">
                                  No opening selected.
                                </p>
                              )}
                            </CardContent>
                          </Card>

                          <Card className="h-auto">
                            <CardHeader className="py-3 bg-primary/10">
                              <CardTitle className="text-sm font-bold text-primary">
                                CLOSING
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="py-4">
                              {selectedClosing ? (
                                <div className="space-y-2">
                                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                                    {selectedClosing.type}
                                  </span>
                                  <p className="text-sm leading-relaxed">
                                    {selectedClosing.content}
                                  </p>
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground italic">
                                  No closing selected.
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        </div>

                        {/* Middle Column: Arguments & Zingers */}
                        <div className="col-span-4 space-y-6">
                          <Card className="h-auto">
                            <CardHeader className="py-3 bg-green-500/10">
                              <CardTitle className="text-sm font-bold text-green-600">
                                CORE ARGUMENTS
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="py-4 space-y-4">
                              {selectedFrames.length > 0 ? (
                                selectedFrames.map((frame) => (
                                  <div key={frame.id} className="space-y-1">
                                    <div className="font-semibold text-sm">
                                      {frame.label}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      {frame.summary}
                                    </p>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-muted-foreground italic">
                                  No arguments selected.
                                </p>
                              )}
                            </CardContent>
                          </Card>

                          <Card className="h-auto">
                            <CardHeader className="py-3 bg-yellow-500/10">
                              <CardTitle className="text-sm font-bold text-yellow-600">
                                ZINGERS
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="py-4 space-y-3">
                              {selectedZingers.length > 0 ? (
                                selectedZingers.map((zinger) => (
                                  <div
                                    key={zinger.id}
                                    className="p-2 bg-yellow-500/5 rounded border border-yellow-500/20"
                                  >
                                    <p className="text-sm font-medium">
                                      "{zinger.text}"
                                    </p>
                                    <p className="text-[10px] text-muted-foreground uppercase mt-1">
                                      {renderComplex(zinger.context)}
                                    </p>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-muted-foreground italic">
                                  No zingers favorited.
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        </div>

                        {/* Right Column: Receipts & Counters */}
                        <div className="col-span-4 space-y-6">
                          <Card className="h-auto">
                            <CardHeader className="py-3 bg-red-500/10">
                              <CardTitle className="text-sm font-bold text-red-600">
                                COUNTERS
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="py-4">
                              <ScrollArea className="h-[200px] pr-4">
                                <div className="space-y-3">
                                  {selectedCounters.length > 0 ? (
                                    selectedCounters.map((counter) => (
                                      <div
                                        key={counter.id}
                                        className="space-y-1 border-b border-border pb-2 last:border-0"
                                      >
                                        <div className="text-xs font-semibold text-red-500 uppercase">
                                          Vs: {counter.argument}
                                        </div>
                                        <div className="font-medium text-sm">
                                          {counter.label}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                          {counter.text}
                                        </p>
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-sm text-muted-foreground italic">
                                      No counters equipped.
                                    </p>
                                  )}
                                </div>
                              </ScrollArea>
                            </CardContent>
                          </Card>

                          <Card className="h-auto">
                            <CardHeader className="py-3 bg-orange-500/10">
                              <CardTitle className="text-sm font-bold text-orange-600">
                                RECEIPTS
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="py-4">
                              <ScrollArea className="h-[200px] pr-4">
                                <div className="space-y-4">
                                  {Object.entries(groupedReceipts).map(
                                    ([category, receipts]) => (
                                      <div key={category}>
                                        <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">
                                          {category}
                                        </h4>
                                        <div className="space-y-2">
                                          {receipts?.map((receipt) => (
                                            <div
                                              key={receipt.id}
                                              className="text-xs border-l-2 border-orange-500/30 pl-2"
                                            >
                                              <div className="flex items-center gap-2">
                                                <span className="font-bold">
                                                  {receipt.source}:
                                                </span>
                                                {receipt.url && (
                                                  <a
                                                    href={receipt.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:text-blue-600"
                                                  >
                                                    <ExternalLink className="h-3 w-3" />
                                                  </a>
                                                )}
                                              </div>
                                              <div>{receipt.content}</div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </ScrollArea>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    )}

                    {/* GENERIC QUICK REFERENCE */}
                    {!isDebatePrep && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Opening */}
                        <Card>
                          <CardHeader className="py-3 bg-blue-500/10">
                            <CardTitle className="text-sm font-bold text-blue-600 dark:text-blue-400">
                              OPENING
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="py-4">
                            <p className="text-sm whitespace-pre-wrap">
                              {opponent.openingApproach || (
                                <span className="text-muted-foreground italic">
                                  No opening approach set
                                </span>
                              )}
                            </p>
                          </CardContent>
                        </Card>

                        {/* Closing */}
                        <Card>
                          <CardHeader className="py-3 bg-primary/10">
                            <CardTitle className="text-sm font-bold text-primary dark:text-primary">
                              CLOSING
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="py-4">
                            <p className="text-sm whitespace-pre-wrap">
                              {opponent.closingApproach || (
                                <span className="text-muted-foreground italic">
                                  No closing approach set
                                </span>
                              )}
                            </p>
                          </CardContent>
                        </Card>

                        {/* Talking Points */}
                        <Card>
                          <CardHeader className="py-3 bg-green-500/10">
                            <CardTitle className="text-sm font-bold text-green-600 dark:text-green-400">
                              TALKING POINTS
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="py-4">
                            {opponent.talkingPoints?.length ? (
                              <ul className="space-y-2">
                                {opponent.talkingPoints.map((point) => (
                                  <li
                                    key={point.id}
                                    className="text-sm flex items-start gap-2"
                                  >
                                    <span className="text-green-600">•</span>
                                    {point.content}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-muted-foreground italic">
                                No talking points
                              </p>
                            )}
                          </CardContent>
                        </Card>

                        {/* Key Phrases */}
                        <Card>
                          <CardHeader className="py-3 bg-yellow-500/10">
                            <CardTitle className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                              KEY PHRASES
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="py-4">
                            {opponent.keyPhrases?.length ? (
                              <div className="flex flex-wrap gap-2">
                                {opponent.keyPhrases.map((item) => (
                                  <span
                                    key={item.id}
                                    className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded"
                                  >
                                    "{item.phrase}"
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground italic">
                                No key phrases
                              </p>
                            )}
                          </CardContent>
                        </Card>

                        {/* Response Map - Full Width */}
                        <Card className="md:col-span-2">
                          <CardHeader className="py-3 bg-primary/10">
                            <CardTitle className="text-sm font-bold text-primary dark:text-primary">
                              RESPONSE MAP
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="py-4">
                            {opponent.responseMap?.length ? (
                              <div className="space-y-3">
                                {opponent.responseMap.map((item) => (
                                  <div key={item.id} className="text-sm">
                                    <div className="font-medium text-muted-foreground">
                                      If they say: "{item.trigger}"
                                    </div>
                                    <div className="ml-4 mt-1 border-l-2 border-primary/50 pl-3">
                                      → {item.response}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground italic">
                                No response mappings
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </TabsContent>

                  {/* RESEARCH TAB (debate only) */}
                  {isDebatePrep && (
                    <TabsContent value="research" className="space-y-4">
                      {research ? (
                        <div className="space-y-4">
                          {research.articles.map((article, i) => (
                            <Card key={i}>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base font-medium">
                                  <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline flex items-center gap-2"
                                  >
                                    {article.title}
                                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                  </a>
                                </CardTitle>
                                <div className="text-sm text-muted-foreground flex gap-2">
                                  <span>{article.source}</span>
                                  {article.publishedDate && (
                                    <span>• {article.publishedDate}</span>
                                  )}
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {article.summary}
                                </p>
                                <div className="text-xs bg-secondary p-2 rounded max-h-32 overflow-y-auto">
                                  {article.content}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 rounded-lg border border-dashed border-border text-center text-sm text-muted-foreground">
                          Research articles and raw data will appear here after
                          generation.
                        </div>
                      )}
                    </TabsContent>
                  )}

                  {/* MY RESEARCH TAB - User-provided research material (debate only) */}
                  {isDebatePrep && (
                    <TabsContent value="myresearch" className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <FileText className="h-5 w-5 text-primary" />
                              Paste Your Research Material
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Paste notes, articles, or any research material.
                              AI will extract arguments, receipts, and potential
                              openers.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Textarea
                            placeholder="Paste your research notes, articles, statistics, quotes, or any other material here...

Example content:
- Studies and statistics you've found
- Quotes from experts or opponents
- Case studies or examples
- Counter-arguments to address
- Interesting angles or hooks"
                            value={userResearchText}
                            onChange={(e) =>
                              setUserResearchText(e.target.value)
                            }
                            className="min-h-[200px] font-mono text-sm"
                          />
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {userResearchText.length} characters
                            </span>
                            <Button
                              onClick={handleProcessResearch}
                              disabled={
                                isProcessingResearch || !userResearchText.trim()
                              }
                            >
                              {isProcessingResearch ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <Brain className="mr-2 h-4 w-4" />
                                  Extract Insights
                                </>
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Processed Research Results */}
                        {processedResearch && (
                          <div className="space-y-6 mt-6 pt-6 border-t border-border">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Brain className="h-4 w-4 text-primary" />
                              <span className="font-medium">AI Analysis:</span>
                              <span>{processedResearch.summary}</span>
                            </div>

                            {/* Extracted Arguments */}
                            {processedResearch.extractedArguments?.length >
                              0 && (
                              <Card>
                                <CardHeader className="py-3 bg-green-500/10">
                                  <CardTitle className="text-sm font-bold text-green-600 flex items-center gap-2">
                                    <Target className="h-4 w-4" />
                                    EXTRACTED ARGUMENTS (
                                    {
                                      processedResearch.extractedArguments
                                        .length
                                    }
                                    )
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="py-4 space-y-4">
                                  {processedResearch.extractedArguments.map(
                                    (arg: any) => (
                                      <div
                                        key={arg.id}
                                        className="space-y-2 border-l-2 border-green-500/30 pl-3"
                                      >
                                        <div className="flex items-center justify-between">
                                          <span className="font-medium">
                                            {arg.claim}
                                          </span>
                                          <span
                                            className={cn(
                                              "text-xs px-2 py-0.5 rounded",
                                              arg.strength === "Strong"
                                                ? "bg-green-100 text-green-700"
                                                : arg.strength === "Medium"
                                                  ? "bg-yellow-100 text-yellow-700"
                                                  : "bg-gray-100 text-gray-700",
                                            )}
                                          >
                                            {arg.strength}
                                          </span>
                                        </div>
                                        {arg.supportingPoints?.length > 0 && (
                                          <ul className="text-sm text-muted-foreground list-disc list-inside">
                                            {arg.supportingPoints.map(
                                              (point: string, i: number) => (
                                                <li key={i}>{point}</li>
                                              ),
                                            )}
                                          </ul>
                                        )}
                                        {arg.source && (
                                          <span className="text-xs text-muted-foreground">
                                            Source: {arg.source}
                                          </span>
                                        )}
                                      </div>
                                    ),
                                  )}
                                </CardContent>
                              </Card>
                            )}

                            {/* Extracted Receipts */}
                            {processedResearch.extractedReceipts?.length >
                              0 && (
                              <Card>
                                <CardHeader className="py-3 bg-orange-500/10">
                                  <CardTitle className="text-sm font-bold text-orange-600 flex items-center gap-2">
                                    <ShieldAlert className="h-4 w-4" />
                                    EXTRACTED RECEIPTS (
                                    {processedResearch.extractedReceipts.length}
                                    )
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="py-4 space-y-4">
                                  {processedResearch.extractedReceipts.map(
                                    (receipt: any) => (
                                      <div
                                        key={receipt.id}
                                        className="space-y-1 border-l-2 border-orange-500/30 pl-3"
                                      >
                                        <div className="flex items-center gap-2">
                                          <span className="text-xs uppercase font-bold text-orange-600">
                                            {receipt.type}
                                          </span>
                                          {receipt.source && (
                                            <span className="text-xs text-muted-foreground">
                                              — {receipt.source}
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-sm font-medium">
                                          {receipt.content}
                                        </p>
                                        <p className="text-xs text-muted-foreground italic">
                                          Use: {receipt.useCase}
                                        </p>
                                      </div>
                                    ),
                                  )}
                                </CardContent>
                              </Card>
                            )}

                            {/* Potential Openers */}
                            {processedResearch.potentialOpeners?.length > 0 && (
                              <Card>
                                <CardHeader className="py-3 bg-blue-500/10">
                                  <CardTitle className="text-sm font-bold text-blue-600 flex items-center gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    POTENTIAL OPENERS (
                                    {processedResearch.potentialOpeners.length})
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="py-4 space-y-4">
                                  {processedResearch.potentialOpeners.map(
                                    (opener: any) => (
                                      <div
                                        key={opener.id}
                                        className="space-y-1 border-l-2 border-blue-500/30 pl-3"
                                      >
                                        <span className="text-xs uppercase font-bold text-blue-600">
                                          {opener.type}
                                        </span>
                                        <p className="text-sm italic">
                                          "{opener.hook}"
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {opener.content}
                                        </p>
                                      </div>
                                    ),
                                  )}
                                </CardContent>
                              </Card>
                            )}

                            {/* Potential Zingers */}
                            {processedResearch.potentialZingers?.length > 0 && (
                              <Card>
                                <CardHeader className="py-3 bg-yellow-500/10">
                                  <CardTitle className="text-sm font-bold text-yellow-600 flex items-center gap-2">
                                    <Zap className="h-4 w-4" />
                                    POTENTIAL ZINGERS (
                                    {processedResearch.potentialZingers.length})
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="py-4 space-y-3">
                                  {processedResearch.potentialZingers.map(
                                    (zinger: any) => (
                                      <div
                                        key={zinger.id}
                                        className="p-2 bg-yellow-500/5 rounded border border-yellow-500/20"
                                      >
                                        <p className="text-sm font-medium">
                                          "{zinger.text}"
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                          {zinger.context}
                                        </p>
                                      </div>
                                    ),
                                  )}
                                </CardContent>
                              </Card>
                            )}

                            {/* Counter-Arguments */}
                            {processedResearch.extractedCounterArguments
                              ?.length > 0 && (
                              <Card>
                                <CardHeader className="py-3 bg-red-500/10">
                                  <CardTitle className="text-sm font-bold text-red-600 flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    COUNTER-ARGUMENTS TO ADDRESS (
                                    {
                                      processedResearch
                                        .extractedCounterArguments.length
                                    }
                                    )
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="py-4 space-y-4">
                                  {processedResearch.extractedCounterArguments.map(
                                    (counter: any) => (
                                      <div
                                        key={counter.id}
                                        className="space-y-2 border-l-2 border-red-500/30 pl-3"
                                      >
                                        <div className="flex items-center gap-2">
                                          <AlertTriangle className="h-4 w-4 text-red-500" />
                                          <span className="font-medium text-red-700 dark:text-red-400">
                                            {counter.argument}
                                          </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                          <span className="font-semibold text-green-600">
                                            Response:
                                          </span>{" "}
                                          {counter.suggestedResponse}
                                        </p>
                                      </div>
                                    ),
                                  )}
                                </CardContent>
                              </Card>
                            )}
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  )}

                  {/* CHAT TAB - RAG-powered research chatbot (debate only) */}
                  {isDebatePrep && (
                    <TabsContent value="chat" className="h-full flex flex-col">
                      <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden">
                        {/* Chat Header */}
                        <div className="px-4 py-3 bg-secondary/30 border-b flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-primary" />
                          <div>
                            <h3 className="font-semibold text-sm">
                              Research Assistant
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              Ask questions about your research and debate topic
                            </p>
                          </div>
                        </div>

                        {/* Chat Messages */}
                        <div
                          ref={chatScrollRef}
                          className="flex-1 overflow-y-auto p-4 space-y-4 bg-background"
                        >
                          {!chatMessages || chatMessages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                              <MessageSquare className="h-12 w-12 text-muted-foreground/30 mb-4" />
                              <h4 className="font-medium text-muted-foreground mb-2">
                                Start a conversation
                              </h4>
                              <p className="text-sm text-muted-foreground max-w-md">
                                Ask questions about your research, debate topic,
                                or strategy. The AI has access to all your
                                research articles and prep materials.
                              </p>
                              <div className="mt-4 space-y-2 text-left w-full max-w-md">
                                <p className="text-xs font-semibold text-muted-foreground">
                                  Try asking:
                                </p>
                                <div className="space-y-1">
                                  {[
                                    "What are the strongest arguments for my position?",
                                    "What evidence do I have to counter economic arguments?",
                                    "Summarize the key statistics from my research",
                                    "What weaknesses should I prepare for?",
                                  ].map((suggestion, i) => (
                                    <button
                                      key={i}
                                      onClick={() => setChatInput(suggestion)}
                                      className="block w-full text-left text-xs p-2 rounded bg-secondary/50 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                                    >
                                      "{suggestion}"
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            chatMessages.map((msg) => (
                              <div
                                key={msg._id}
                                className={cn(
                                  "flex",
                                  msg.role === "user"
                                    ? "justify-end"
                                    : "justify-start",
                                )}
                              >
                                <div
                                  className={cn(
                                    "max-w-[80%] rounded-lg px-4 py-2",
                                    msg.role === "user"
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-secondary text-secondary-foreground",
                                  )}
                                >
                                  <p className="text-sm whitespace-pre-wrap">
                                    {msg.content}
                                  </p>
                                  <span className="text-[10px] opacity-60 mt-1 block">
                                    {new Date(
                                      msg.timestamp,
                                    ).toLocaleTimeString()}
                                  </span>
                                </div>
                              </div>
                            ))
                          )}
                          {isSendingChat && (
                            <div className="flex justify-start">
                              <div className="bg-secondary rounded-lg px-4 py-2 flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-sm text-muted-foreground">
                                  Thinking...
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 border-t bg-background">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleSendChat();
                            }}
                            className="flex gap-2"
                          >
                            <Input
                              value={chatInput}
                              onChange={(e) => setChatInput(e.target.value)}
                              placeholder="Ask about your research or debate strategy..."
                              disabled={isSendingChat}
                              className="flex-1"
                            />
                            <Button
                              type="submit"
                              disabled={isSendingChat || !chatInput.trim()}
                            >
                              {isSendingChat ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Send className="h-4 w-4" />
                              )}
                            </Button>
                          </form>
                        </div>
                      </div>
                    </TabsContent>
                  )}

                  {/* AI RESEARCH REPORT TAB (debate only) */}
                  {isDebatePrep && (
                    <TabsContent
                      value="gemini-report"
                      className="space-y-4 pb-10"
                    >
                      {opponent.geminiResearchReport ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 pb-2 border-b">
                            <FileSearch className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-semibold text-primary">
                              AI Research Report
                            </h3>
                          </div>
                          <div className="space-y-6 max-w-4xl">
                            <ReactMarkdown
                              components={{
                                h1: ({ node, children, ...props }) => {
                                  const isSourcesSection =
                                    String(children)
                                      .toLowerCase()
                                      .includes("source") ||
                                    String(children)
                                      .toLowerCase()
                                      .includes("reference") ||
                                    String(children)
                                      .toLowerCase()
                                      .includes("citation");
                                  return isSourcesSection ? (
                                    <div className="mt-12 mb-6">
                                      <div className="flex items-center gap-3 mb-6">
                                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
                                        <h1
                                          className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight"
                                          {...props}
                                        >
                                          {children}
                                        </h1>
                                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
                                      </div>
                                    </div>
                                  ) : (
                                    <h1
                                      className="text-4xl font-bold mt-10 mb-6 text-gray-900 dark:text-gray-100 tracking-tight leading-tight"
                                      {...props}
                                    >
                                      {children}
                                    </h1>
                                  );
                                },
                                h2: ({ node, children, ...props }) => (
                                  <h2
                                    className="text-2xl font-bold mt-8 mb-5 text-gray-900 dark:text-gray-100 tracking-tight border-b border-gray-200 dark:border-gray-700 pb-2"
                                    {...props}
                                  >
                                    {children}
                                  </h2>
                                ),
                                h3: ({ node, children, ...props }) => (
                                  <h3
                                    className="text-xl font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-200 tracking-tight"
                                    {...props}
                                  >
                                    {children}
                                  </h3>
                                ),
                                p: ({ node, children, ...props }) => (
                                  <p
                                    className="mb-5 leading-8 text-base text-gray-700 dark:text-gray-300"
                                    {...props}
                                  >
                                    {children}
                                  </p>
                                ),
                                ul: ({ node, children, ...props }) => (
                                  <ul
                                    className="mb-6 space-y-3 text-gray-700 dark:text-gray-300"
                                    {...props}
                                  >
                                    {children}
                                  </ul>
                                ),
                                ol: ({ node, children, ...props }) => (
                                  <ol
                                    className="mb-6 space-y-3 text-gray-700 dark:text-gray-300 counter-reset"
                                    {...props}
                                  >
                                    {children}
                                  </ol>
                                ),
                                li: ({ node, children, ...props }) => (
                                  <li
                                    className="ml-6 pl-2 leading-7"
                                    {...props}
                                  >
                                    <span className="text-gray-600 dark:text-gray-400 mr-3">
                                      •
                                    </span>
                                    {children}
                                  </li>
                                ),
                                strong: ({ node, children, ...props }) => (
                                  <strong
                                    className="font-semibold text-gray-900 dark:text-gray-100"
                                    {...props}
                                  >
                                    {children}
                                  </strong>
                                ),
                                em: ({ node, children, ...props }) => (
                                  <em
                                    className="italic text-gray-600 dark:text-gray-400"
                                    {...props}
                                  >
                                    {children}
                                  </em>
                                ),
                                a: ({ node, children, href, ...props }) => (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline decoration-blue-300 dark:decoration-blue-600 underline-offset-2 transition-colors"
                                    {...props}
                                  >
                                    {children}
                                  </a>
                                ),
                                code: ({ node, children, ...props }) => (
                                  <code
                                    className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                ),
                                blockquote: ({ node, children, ...props }) => (
                                  <blockquote
                                    className="border-l-4 border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-950/20 pl-6 pr-4 py-4 my-6 italic text-gray-700 dark:text-gray-300 rounded-r-lg"
                                    {...props}
                                  >
                                    {children}
                                  </blockquote>
                                ),
                                hr: ({ node, ...props }) => (
                                  <hr
                                    className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"
                                    {...props}
                                  />
                                ),
                              }}
                            >
                              {opponent.geminiResearchReport}
                            </ReactMarkdown>
                          </div>
                          {opponent.geminiResearchMetadata && (
                            <div className="mt-6 pt-4 border-t text-xs text-muted-foreground">
                              Generated on{" "}
                              {new Date(
                                opponent.geminiResearchMetadata.generatedAt,
                              ).toLocaleString()}
                              {" • "}
                              {Math.round(
                                opponent.geminiResearchMetadata.reportLength /
                                  1000,
                              )}
                              k characters
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                          <FileSearch className="h-12 w-12 mx-auto mb-3 opacity-30 text-muted-foreground" />
                          <h3 className="text-lg font-medium mb-2">
                            Research Report Not Yet Ready
                          </h3>
                          <p className="text-sm text-muted-foreground max-w-md">
                            Click "Generate Strategy (Gemini)" to create a
                            comprehensive research report using Gemini Deep
                            Research.
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            This process can take 3-20 minutes for thorough
                            analysis.
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  )}
                </div>
              </Tabs>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                {progress &&
                progress.status !== "idle" &&
                progress.status !== "complete" &&
                progress.status !== "error" ? (
                  <>
                    <Brain className="h-12 w-12 text-primary mb-4 animate-pulse" />
                    <h3 className="text-lg font-medium mb-2">
                      Generating Your Strategy...
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mb-6">
                      {progress.message}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap justify-center max-w-lg">
                      <ProgressStep
                        label="Research"
                        status={getStepStatus("researching", progress)}
                      />
                      <ProgressStep
                        label="Extract"
                        status={getStepStatus("extracting", progress)}
                      />
                      <ProgressStep
                        label="Synthesis"
                        status={getStepStatus("synthesizing", progress)}
                      />
                      <ProgressStep
                        label="Openings"
                        status={getStepStatus("generating_openings", progress)}
                      />
                      <ProgressStep
                        label="Arguments"
                        status={getStepStatus("generating_frames", progress)}
                      />
                      <ProgressStep
                        label="Receipts"
                        status={getStepStatus("generating_receipts", progress)}
                      />
                      <ProgressStep
                        label="Zingers"
                        status={getStepStatus("generating_zingers", progress)}
                      />
                      <ProgressStep
                        label="Closings"
                        status={getStepStatus("generating_closings", progress)}
                      />
                      <ProgressStep
                        label="Intel"
                        status={getStepStatus("generating_intel", progress)}
                      />
                      <ProgressStep
                        label="Save"
                        status={getStepStatus("storing", progress)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {isDebatePrep ? (
                      <Brain className="h-12 w-12 text-muted-foreground mb-4" />
                    ) : (
                      <Brain className="h-12 w-12 text-muted-foreground mb-4" />
                    )}
                    <h3 className="text-lg font-medium mb-2">
                      {isDebatePrep
                        ? "No Strategy Generated Yet"
                        : "No Prep Materials Yet"}
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mb-6">
                      {isDebatePrep
                        ? 'Click "Generate Strategy" to research the topic and create a winning plan using advanced debate techniques.'
                        : 'Click "Generate Prep Materials" to create talking points, key phrases, and response strategies.'}
                    </p>
                    <Button
                      onClick={
                        isDebatePrep
                          ? handleGenerateStrategy
                          : handleGenerateGenericPrep
                      }
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : isDebatePrep ? (
                        "Generate Strategy"
                      ) : (
                        "Generate Prep Materials"
                      )}
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
