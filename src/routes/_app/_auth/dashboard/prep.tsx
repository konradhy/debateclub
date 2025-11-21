import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";
import { useState, useEffect } from "react";
import { Button } from "@/ui/button";
import siteConfig from "~/site.config";
import { Swords, Edit, Save } from "lucide-react";

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

  const { data: opponent } = useQuery(
    convexQuery(
      api.opponents.get,
      opponentId ? { opponentId: opponentId as Id<"opponents"> } : "skip",
    ),
  );

  const { mutateAsync: updateOpponent } = useMutation({
    mutationFn: useConvexMutation(api.opponents.update),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [openingStatement, setOpeningStatement] = useState("");
  const [debateNotes, setDebateNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Initialize state when opponent loads
  useEffect(() => {
    if (opponent) {
      setOpeningStatement(opponent.userOpeningStatement || "");
      setDebateNotes(opponent.userDebateNotes || "");
    }
  }, [opponent]);

  const handleSave = async () => {
    if (!opponent) return;

    setIsSaving(true);
    try {
      await updateOpponent({
        opponentId: opponent._id,
        userOpeningStatement: openingStatement,
        userDebateNotes: debateNotes,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setIsSaving(false);
    }
  };

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

  const userPosition = opponent.position === "con" ? "pro" : "con";

  return (
    <div className="flex h-full w-full bg-secondary px-6 py-8 dark:bg-black">
      <div className="z-10 mx-auto flex h-full w-full max-w-screen-xl gap-12">
        <div className="flex w-full flex-col rounded-lg border border-border bg-card dark:bg-black">
          {/* Header */}
          <div className="flex w-full flex-col rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Swords className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-medium text-primary">
                    Debate Preparation: {opponent.name}
                  </h2>
                </div>
                <p className="text-sm font-normal text-primary/60">
                  Topic: {opponent.topic}
                </p>
                <p className="text-sm font-normal text-primary/60">
                  Your position:{" "}
                  <span className="font-medium capitalize">{userPosition}</span>{" "}
                  | Opponent position:{" "}
                  <span className="font-medium capitalize">
                    {opponent.position}
                  </span>
                </p>
              </div>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Materials
                </Button>
              )}
            </div>
          </div>

          <div className="flex w-full px-6">
            <div className="w-full border-b border-border" />
          </div>

          {/* Prep Materials */}
          <div className="flex w-full flex-col gap-6 p-6 overflow-y-auto">
            {/* CheatSheet */}
            {opponent.userCheatSheet && (
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium text-primary">
                  Your Technique CheatSheet
                </h3>
                <p className="text-sm text-primary/60">
                  Guide on which techniques to use for this debate
                </p>
                <div className="rounded-lg border border-border bg-secondary p-4 text-sm text-primary/80 whitespace-pre-wrap max-h-80 overflow-y-auto">
                  {opponent.userCheatSheet}
                </div>
              </div>
            )}

            {/* Opening Statement */}
            {opponent.userOpeningStatement && (
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium text-primary">
                  Your Opening Statement
                </h3>
                <p className="text-sm text-primary/60">
                  Suggested 30-second opener {isEditing && "- edit as needed"}
                </p>
                {isEditing ? (
                  <textarea
                    value={openingStatement}
                    onChange={(e) => setOpeningStatement(e.target.value)}
                    rows={4}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                ) : (
                  <div className="rounded-lg border border-border bg-secondary p-4 text-sm text-primary/80 whitespace-pre-wrap">
                    {opponent.userOpeningStatement}
                  </div>
                )}
              </div>
            )}

            {/* Debate Notes */}
            {opponent.userDebateNotes && (
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium text-primary">
                  Your Debate Notes
                </h3>
                <p className="text-sm text-primary/60">
                  Research, stats, and talking points{" "}
                  {isEditing && "- edit as needed"}
                </p>
                {isEditing ? (
                  <textarea
                    value={debateNotes}
                    onChange={(e) => setDebateNotes(e.target.value)}
                    rows={10}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                ) : (
                  <div className="rounded-lg border border-border bg-secondary p-4 text-sm text-primary/80 whitespace-pre-wrap max-h-96 overflow-y-auto">
                    {opponent.userDebateNotes}
                  </div>
                )}
              </div>
            )}

            {/* No prep materials message */}
            {!opponent.userCheatSheet &&
              !opponent.userOpeningStatement &&
              !opponent.userDebateNotes && (
                <div className="flex flex-col items-center justify-center gap-4 py-12">
                  <p className="text-sm text-primary/60">
                    No prep materials generated for this opponent yet.
                  </p>
                  <p className="text-sm text-primary/60">
                    You can still start the debate, or go back and generate prep
                    materials.
                  </p>
                </div>
              )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 border-t border-border p-6">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    setOpeningStatement(opponent.userOpeningStatement || "");
                    setDebateNotes(opponent.userDebateNotes || "");
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleStartDebate} className="flex-1">
                  <Swords className="mr-2 h-4 w-4" />
                  Start Debate
                </Button>
                <Button
                  onClick={() => navigate({ to: "/dashboard" })}
                  variant="outline"
                >
                  Back to Dashboard
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
