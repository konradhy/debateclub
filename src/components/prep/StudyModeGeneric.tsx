// Removed lucide-react imports - using custom SVG icons
import { Id } from "@cvx/_generated/dataModel";
import { InlineEdit, AddButton } from "@/ui/inline-edit";

type OpponentField =
  | "talkingPoints"
  | "keyPhrases"
  | "responseMap";

interface StudyModeGenericProps {
  opponent: {
    openingApproach?: string;
    closingApproach?: string;
    talkingPoints?: Array<{ id: string; content: string }>;
    keyPhrases?: Array<{ id: string; phrase: string }>;
    responseMap?: Array<{ id: string; trigger: string; response: string }>;
  };
  opponentId: Id<"opponents">;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  addingType: string | null;
  setAddingType: (type: string | null) => void;
  handleEdit: (field: OpponentField, itemId: string, updates: any) => void;
  handleDelete: (field: OpponentField, itemId: string) => void;
  handleAdd: (field: OpponentField, item: any) => void;
  updateGenericPrepText: (args: {
    opponentId: Id<"opponents">;
    field: "openingApproach" | "closingApproach";
    value: string;
  }) => Promise<any>;
}

export function StudyModeGeneric({
  opponent,
  opponentId,
  editingId,
  setEditingId,
  addingType,
  setAddingType,
  handleEdit,
  handleDelete,
  handleAdd,
  updateGenericPrepText,
}: StudyModeGenericProps) {
  return (
    <>
      {/* Opening Approach */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <img src="/images/custom/marble-column.svg" alt="" className="h-7 w-7" />
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
            <img src="/images/custom/dialog-scroll.svg" alt="" className="h-7 w-7" />
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
            <img src="/images/custom/divine-lightning.svg" alt="" className="h-7 w-7" />
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
            <img src="/images/custom/stamped-document.svg" alt="" className="h-7 w-7" />
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
            <img src="/images/custom/marble-column.svg" alt="" className="h-7 w-7" />
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
  );
}
