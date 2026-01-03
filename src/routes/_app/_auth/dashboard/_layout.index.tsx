import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Trash2, MoreVertical } from "lucide-react";
import siteConfig from "~/site.config";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/ui/dialog";

// Color constants matching marketing pages
const colors = {
  background: "#F5F3EF",
  cardBg: "#FAFAF8",
  headerBg: "#FAFAF8",
  border: "#E8E4DA",
  primary: "#3C4A32",
  primaryLight: "#5C6B4A",
  text: "#2A2A20",
  textMuted: "#5C5C54",
  textLight: "#888880",
};

interface Opponent {
  _id: Id<"opponents">;
  _creationTime: number;
  name: string;
  topic: string;
  style: string;
  position: string;
  talkingPoints: string[] | { id: string; content: string }[];
  difficulty: string;
  userId: Id<"users">;
}

export const Route = createFileRoute("/_app/_auth/dashboard/_layout/")({
  component: Dashboard,
  beforeLoad: () => ({
    title: `${siteConfig.siteTitle} - Dashboard`,
    headerTitle: "Dashboard",
    headerDescription: "Manage your Apps and view your usage.",
  }),
});

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { data: opponents = [] } = useQuery(
    convexQuery(api.opponents.list, {}),
  );
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    opponentId: Id<"opponents"> | null;
    name: string;
  }>({
    isOpen: false,
    opponentId: null,
    name: "",
  });

  const deleteOpponent = useMutation({
    mutationFn: useConvexMutation(api.opponents.deleteOpponent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [["opponents", "list"]] });
      setDeleteDialog({ isOpen: false, opponentId: null, name: "" });
    },
  });

  const handleDeleteClick = (opponentId: Id<"opponents">, name: string) => {
    setDeleteDialog({ isOpen: true, opponentId, name });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.opponentId) return;

    try {
      await deleteOpponent.mutateAsync({ opponentId: deleteDialog.opponentId });
    } catch (error) {
      console.error("Error deleting opponent:", error);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >


      {/* Main Content */}
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1
              className="text-2xl md:text-3xl font-bold"
              style={{ color: colors.text, fontFamily: "Georgia, serif" }}
            >
              Your Sessions
            </h1>
            <p className="mt-1" style={{ color: colors.textMuted }}>
              Pick up where you left off or start something new
            </p>
          </div>
          <Link to="/dashboard/opponent-profile">
            <button
              className="inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-medium text-white transition-all hover:brightness-110 focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              style={{ backgroundColor: colors.primary }}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Session
            </button>
          </Link>
        </div>

        {/* Cards Grid - wider cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Default Opponent Card */}
          <div
            className="flex flex-col rounded-xl border-2 p-6 transition-shadow hover:shadow-md"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.cardBg,
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: colors.text }}
                >
                  Flo Jo Debate
                </h3>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: colors.textLight }}
                >
                  Default Scenario
                </p>
              </div>
            </div>
            <p
              className="text-sm mb-5 flex-grow"
              style={{ color: colors.textMuted }}
            >
              Debate whether Florence Griffith-Joyner's records should be
              removed.
            </p>
            <Link to="/dashboard/debate" className="w-full">
              <button
                className="w-full rounded-lg border-2 py-2.5 text-sm font-medium transition-all hover:shadow-sm focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
                style={{
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: colors.cardBg,
                }}
              >
                Practice Now
              </button>
            </Link>
          </div>

          {/* Custom Opponents */}
          {opponents?.map((opponent: Opponent) => (
            <div
              key={opponent._id}
              className="flex flex-col rounded-xl border-2 p-6 transition-shadow hover:shadow-md"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.cardBg,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: colors.text }}
                  >
                    {opponent.name}
                  </h3>
                  <p
                    className="text-xs capitalize mt-0.5"
                    style={{ color: colors.textLight }}
                  >
                    {opponent.style}<span className="hidden md:inline"> Style</span>
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-black/5 focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Options for ${opponent.name}`}
                    >
                      <MoreVertical
                        className="h-4 w-4"
                        style={{ color: colors.textLight }}
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(opponent._id, opponent.name);
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p
                className="text-sm mb-5 flex-grow"
                style={{ color: colors.textMuted }}
              >
                {opponent.topic}
              </p>
              <Link
                to="/dashboard/prep"
                search={{ opponentId: opponent._id }}
                className="w-full"
              >
                <button
                  className="w-full rounded-lg py-2.5 text-sm font-medium text-white transition-all hover:brightness-110 focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
                  style={{ backgroundColor: colors.primaryLight }}
                >
                  Continue
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* History link at bottom */}
        <div className="mt-8 text-center">
          <Link
            to="/dashboard/history"
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: colors.textMuted }}
            aria-label="View all session history"
          >
            View session history →
          </Link>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.isOpen}
        onOpenChange={(isOpen) =>
          setDeleteDialog({ ...deleteDialog, isOpen })
        }
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete "{deleteDialog.name}"?</DialogTitle>
            <DialogDescription>
              This will delete the opponent and all associated research, prep
              materials, and chat history. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end px-6 pb-6">
            <button
              onClick={() =>
                setDeleteDialog({ isOpen: false, opponentId: null, name: "" })
              }
              className="px-4 py-2 rounded-lg border-2 transition-all focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              style={{
                borderColor: colors.border,
                color: colors.text,
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              disabled={deleteOpponent.isPending}
              className="px-4 py-2 rounded-lg text-white transition-all hover:brightness-110 disabled:opacity-50 focus:outline-2 focus:outline-offset-2 focus:outline-red-400"
              style={{ backgroundColor: "#dc2626" }}
            >
              {deleteOpponent.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
