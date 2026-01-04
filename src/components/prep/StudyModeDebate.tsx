import {
  AlertTriangle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Heart,
} from "lucide-react";
import { cn } from "@/utils/misc";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Label } from "@/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { InlineEdit, AddButton } from "@/ui/inline-edit";

type OpponentField =
  | "receipts"
  | "openingOptions"
  | "argumentFrames"
  | "zingers"
  | "closingOptions"
  | "opponentIntel";

interface StudyModeDebateProps {
  opponent: any;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  addingType: string | null;
  setAddingType: (type: string | null) => void;
  handleEdit: (field: OpponentField, itemId: string, updates: any) => void;
  handleDelete: (field: OpponentField, itemId: string) => void;
  handleAdd: (field: OpponentField, item: any) => void;
  handleSelectionUpdate: (updates: any) => void;
  expandedItems: Record<string, boolean>;
  toggleExpand: (id: string) => void;
  toggleFrame: (id: string) => void;
  toggleCounter: (id: string) => void;
  toggleZinger: (id: string) => void;
  groupedReceipts: Record<string, any[]>;
  renderComplex: (val: any) => string;
}

export function StudyModeDebate({
  opponent,
  editingId,
  setEditingId,
  addingType,
  setAddingType,
  handleEdit,
  handleDelete,
  handleAdd,
  handleSelectionUpdate,
  expandedItems,
  toggleExpand,
  toggleFrame,
  toggleCounter,
  toggleZinger,
  groupedReceipts,
  renderComplex,
}: StudyModeDebateProps) {
  return (
    <>
      {/* Opening Statements */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <img
              src="/images/custom/ancient-scroll.svg"
              alt=""
              className="h-7 w-7"
            />
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
            {opponent.openingOptions?.map((option: any) => (
              <InlineEdit
                key={option.id}
                isEditing={editingId === option.id}
                onEdit={() => setEditingId(option.id)}
                onDelete={() => handleDelete("openingOptions", option.id)}
                onSave={(data) => handleEdit("openingOptions", option.id, data)}
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
                      <RadioGroupItem value={option.id} id={option.id} />
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
                          <span className="font-semibold">Guidance:</span>{" "}
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
                    wordCount: data.content?.trim().split(/\s+/).length || 0,
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
            <img src="/images/custom/marble-column.svg" alt="" className="h-7 w-7" />
            Argument Frames
          </h3>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Select Multiple
          </span>
        </div>
        <div className="grid gap-4">
          {opponent.argumentFrames?.map((frame: any) => (
            <InlineEdit
              key={frame.id}
              isEditing={editingId === frame.id}
              onEdit={() => setEditingId(frame.id)}
              onDelete={() => handleDelete("argumentFrames", frame.id)}
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
                  name: "emotionalCore",
                  label: "Emotional Core (optional)",
                  type: "text",
                },
                {
                  name: "exampleQuote",
                  label: "Example Quote (optional)",
                  type: "textarea",
                  rows: 2,
                  placeholder:
                    "Example: 'You're right that X. But what you're missing is Y...'",
                },
              ]}
            >
              <div
                className={cn(
                  "relative flex flex-col space-y-2 rounded-lg border p-4 transition-all",
                  opponent.selectedFrameIds?.includes(frame.id)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-secondary/50",
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={frame.id}
                      checked={opponent.selectedFrameIds?.includes(frame.id)}
                      onCheckedChange={() => toggleFrame(frame.id)}
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
                        <span className="font-semibold">Deploy when:</span>{" "}
                        {frame.deploymentGuidance}
                      </div>
                      {/* Example Quote Display */}
                      {frame.exampleQuote && (
                        <div className="text-sm italic bg-blue-50 dark:bg-blue-950/30 p-3 rounded-md border-l-4 border-blue-500">
                          <div className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 mb-1 tracking-wide">
                            Example Quote
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            "{frame.exampleQuote}"
                          </p>
                        </div>
                      )}
                      {/* Supporting Research Display */}
                      {frame.evidenceNeeded &&
                        frame.evidenceNeeded.length > 0 && (
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-muted-foreground">
                              Supporting Research:
                            </p>
                            {frame.evidenceNeeded.map(
                              (evidence: string, idx: number) => (
                                <div
                                  key={idx}
                                  className="text-xs text-muted-foreground flex gap-2"
                                >
                                  <span>•</span>
                                  <span>{evidence}</span>
                                </div>
                              ),
                            )}
                          </div>
                        )}
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
                  name: "emotionalCore",
                  label: "Emotional Core (optional)",
                  type: "text",
                },
                {
                  name: "exampleQuote",
                  label: "Example Quote (optional)",
                  type: "textarea",
                  rows: 2,
                  placeholder:
                    "Example: 'You're right that X. But what you're missing is Y...'",
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
            <img src="/images/custom/spy-glass.svg" alt="" className="h-7 w-7" />
            Opponent Intelligence
          </h3>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Select Counters
          </span>
        </div>
        <div className="grid gap-4">
          {opponent.opponentIntel?.map((intel: any) => (
            <InlineEdit
              key={intel.id}
              isEditing={editingId === intel.id}
              onEdit={() => setEditingId(intel.id)}
              onDelete={() => handleDelete("opponentIntel", intel.id)}
              onSave={(data) =>
                handleEdit("opponentIntel", intel.id, {
                  ...data,
                  counters: intel.counters, // Preserve nested counters
                })
              }
              onCancel={() => setEditingId(null)}
              initialData={intel}
              formFields={[
                {
                  name: "argument",
                  label: "Opponent's Predicted Argument",
                  type: "textarea",
                  required: true,
                  rows: 2,
                },
                {
                  name: "likelihood",
                  label: "Likelihood",
                  type: "select",
                  options: ["High", "Medium", "Low"],
                  required: true,
                },
                {
                  name: "evidence",
                  label: "Their Supporting Evidence",
                  type: "textarea",
                  required: true,
                  rows: 2,
                },
                {
                  name: "weakness",
                  label: "Weakness in Their Argument",
                  type: "textarea",
                  required: true,
                  rows: 2,
                },
                {
                  name: "rhetoricalStyle",
                  label: "Rhetorical Style (optional)",
                  type: "text",
                },
              ]}
            >
              <Card className="border-red-500/20 bg-red-500/5">
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
                        <span className="font-semibold">Weakness:</span>{" "}
                        {intel.weakness}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mt-2">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">
                      Available Counters (Select to Equip):
                    </p>
                    {intel.counters.map((counter: any) => (
                      <div
                        key={counter.id}
                        className="flex items-start space-x-2 p-2 rounded hover:bg-background/50 transition-colors"
                      >
                        <Checkbox
                          id={counter.id}
                          checked={opponent.selectedCounterIds?.includes(
                            counter.id,
                          )}
                          onCheckedChange={() => toggleCounter(counter.id)}
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
            </InlineEdit>
          ))}
          {addingType === "opponentIntel" && (
            <InlineEdit
              isEditing={false}
              isAdding={true}
              onEdit={() => {}}
              onSave={(data) =>
                handleAdd("opponentIntel", {
                  ...data,
                  counters: [], // New intel starts with empty counters
                })
              }
              onCancel={() => setAddingType(null)}
              formFields={[
                {
                  name: "argument",
                  label: "Opponent's Predicted Argument",
                  type: "textarea",
                  required: true,
                  rows: 2,
                  placeholder: "What argument will your opponent likely make?",
                },
                {
                  name: "likelihood",
                  label: "Likelihood",
                  type: "select",
                  options: ["High", "Medium", "Low"],
                  required: true,
                },
                {
                  name: "evidence",
                  label: "Their Supporting Evidence",
                  type: "textarea",
                  required: true,
                  rows: 2,
                  placeholder: "What evidence will they use to support this?",
                },
                {
                  name: "weakness",
                  label: "Weakness in Their Argument",
                  type: "textarea",
                  required: true,
                  rows: 2,
                  placeholder: "What's the weak spot in this argument?",
                },
                {
                  name: "rhetoricalStyle",
                  label: "Rhetorical Style (optional)",
                  type: "text",
                  placeholder: "e.g., Appeal to emotion, False dichotomy",
                },
              ]}
            >
              <div />
            </InlineEdit>
          )}
          {addingType !== "opponentIntel" && (
            <AddButton
              onClick={() => setAddingType("opponentIntel")}
              label="Add Opponent Intelligence"
            />
          )}
        </div>
      </section>

      {/* Receipts Arsenal */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <img src="/images/custom/stamped-document.svg" alt="" className="h-7 w-7" />
            Receipts Arsenal
          </h3>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Review Only
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(groupedReceipts).map(([category, receipts]) => (
            <Card key={category} className="bg-secondary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {receipts?.map((receipt: any) => (
                  <InlineEdit
                    key={receipt.id}
                    isEditing={editingId === receipt.id}
                    onEdit={() => setEditingId(receipt.id)}
                    onDelete={() => handleDelete("receipts", receipt.id)}
                    onSave={(data) => handleEdit("receipts", receipt.id, data)}
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
                        name: "deploymentExample",
                        label: "Deployment Example (optional)",
                        type: "textarea",
                        rows: 3,
                        placeholder:
                          "Example: 'Now, you claim X. But according to [source], [fact]. So when you say Y...'",
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
                        <div className="flex items-center gap-2">
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
                          {/* NEW: Expand button for receipts */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpand(receipt.id)}
                            className="h-5 w-5 p-0"
                          >
                            {expandedItems[receipt.id] ? (
                              <ChevronUp className="h-3 w-3" />
                            ) : (
                              <ChevronDown className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="text-muted-foreground">
                        {receipt.content}
                      </div>
                      <div className="text-xs text-primary/60 italic">
                        Use: {renderComplex(receipt.deployment)}
                      </div>

                      {/* NEW: Expanded section with deployment example */}
                      {expandedItems[receipt.id] &&
                        receipt.deploymentExample && (
                          <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="text-sm bg-orange-50 dark:bg-orange-950/30 p-3 rounded-md border-l-4 border-orange-500">
                              <div className="text-[10px] font-bold uppercase text-orange-600 dark:text-orange-400 mb-1 tracking-wide">
                                Deployment Example
                              </div>
                              <p className="text-muted-foreground leading-relaxed italic">
                                "{receipt.deploymentExample}"
                              </p>
                            </div>
                          </div>
                        )}
                    </div>
                  </InlineEdit>
                ))}
              </CardContent>
            </Card>
          ))}
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
                name: "deploymentExample",
                label: "Deployment Example (optional)",
                type: "textarea",
                rows: 3,
                placeholder:
                  "Example: 'Now, you claim X. But according to [source], [fact]. So when you say Y...'",
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
            <img src="/images/custom/divine-lightning.svg" alt="" className="h-7 w-7" />
            Zinger Bank
          </h3>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Favorite Your Top Picks
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opponent.zingers?.map((zinger: any) => (
            <InlineEdit
              key={zinger.id}
              isEditing={editingId === zinger.id}
              onEdit={() => setEditingId(zinger.id)}
              onDelete={() => handleDelete("zingers", zinger.id)}
              onSave={(data) => handleEdit("zingers", zinger.id, data)}
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
                  name: "type",
                  label: "Type",
                  type: "text",
                  required: true,
                },
                {
                  name: "context.trigger",
                  label: "Trigger (when to use)",
                  type: "textarea",
                  required: true,
                  rows: 2,
                },
                {
                  name: "context.setup",
                  label: "Setup (optional)",
                  type: "textarea",
                  rows: 2,
                },
                {
                  name: "context.aftermath",
                  label: "Aftermath (how to capitalize)",
                  type: "textarea",
                  required: true,
                  rows: 2,
                },
                {
                  name: "tone",
                  label: "Tone",
                  type: "text",
                  required: true,
                },
                {
                  name: "riskLevel",
                  label: "Risk Level (Low/Medium/High)",
                  type: "text",
                  required: true,
                },
                {
                  name: "riskMitigation",
                  label: "Risk Mitigation",
                  type: "textarea",
                  required: true,
                  rows: 2,
                },
              ]}
            >
              <div
                className={cn(
                  "cursor-pointer group relative flex flex-col justify-between rounded-lg border p-4 transition-all hover:border-yellow-500/50",
                  opponent.selectedZingerIds?.includes(zinger.id)
                    ? "border-yellow-500 bg-yellow-500/10"
                    : "border-border bg-card",
                )}
                onClick={() => toggleZinger(zinger.id)}
              >
                <div className="mb-3">
                  <p className="font-bold text-lg leading-tight text-primary mb-2">
                    "{zinger.text}"
                  </p>
                  <div className="space-y-1 text-xs">
                    <p className="text-muted-foreground">
                      <span className="font-semibold">Trigger:</span>{" "}
                      {typeof zinger.context === "object" ? zinger.context.trigger : renderComplex(zinger.context)}
                    </p>
                    {typeof zinger.context === "object" && zinger.context.setup && (
                      <p className="text-muted-foreground">
                        <span className="font-semibold">Setup:</span> {zinger.context.setup}
                      </p>
                    )}
                    <div className="flex gap-2 items-center mt-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-700">
                        {zinger.tone || "No tone"}
                      </span>
                      <span className={cn(
                        "text-[10px] px-2 py-0.5 rounded",
                        zinger.riskLevel === "High" ? "bg-red-500/20 text-red-700" :
                        zinger.riskLevel === "Medium" ? "bg-orange-500/20 text-orange-700" :
                        "bg-green-500/20 text-green-700"
                      )}>
                        {zinger.riskLevel || "Unknown"} Risk
                      </span>
                    </div>
                  </div>
                </div>
                <Heart
                  className={cn(
                    "h-5 w-5 transition-colors absolute top-3 right-3",
                    opponent.selectedZingerIds?.includes(zinger.id)
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-muted-foreground group-hover:text-yellow-500",
                  )}
                />
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
                  name: "type",
                  label: "Type",
                  type: "text",
                  required: true,
                },
                {
                  name: "context.trigger",
                  label: "Trigger (when to use)",
                  type: "textarea",
                  required: true,
                  rows: 2,
                },
                {
                  name: "context.setup",
                  label: "Setup (optional)",
                  type: "textarea",
                  rows: 2,
                },
                {
                  name: "context.aftermath",
                  label: "Aftermath (how to capitalize)",
                  type: "textarea",
                  required: true,
                  rows: 2,
                },
                {
                  name: "tone",
                  label: "Tone",
                  type: "text",
                  required: true,
                },
                {
                  name: "riskLevel",
                  label: "Risk Level (Low/Medium/High)",
                  type: "text",
                  required: true,
                },
                {
                  name: "riskMitigation",
                  label: "Risk Mitigation",
                  type: "textarea",
                  required: true,
                  rows: 2,
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
            <img src="/images/custom/unfurling-scroll.svg" alt="" className="h-7 w-7" />
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
            {opponent.closingOptions?.map((option: any) => (
              <InlineEdit
                key={option.id}
                isEditing={editingId === option.id}
                onEdit={() => setEditingId(option.id)}
                onDelete={() => handleDelete("closingOptions", option.id)}
                onSave={(data) => handleEdit("closingOptions", option.id, data)}
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
                      <RadioGroupItem value={option.id} id={option.id} />
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
                    wordCount: data.content?.trim().split(/\s+/).length || 0,
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
  );
}
