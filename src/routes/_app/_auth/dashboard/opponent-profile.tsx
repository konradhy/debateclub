import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import siteConfig from "~/site.config";
import { Save } from "lucide-react";

export const Route = createFileRoute("/_app/_auth/dashboard/opponent-profile")({
  component: OpponentProfile,
  beforeLoad: () => ({
    title: `${siteConfig.siteTitle} - Create Opponent Profile`,
    headerTitle: "Create Opponent Profile",
    headerDescription: "Configure a custom debate opponent",
  }),
});

function OpponentProfile() {
  const navigate = useNavigate();
  const { data: user } = useQuery(convexQuery(api.app.getCurrentUser, {}));
  const { mutateAsync: createOpponent } = useMutation({
    mutationFn: useConvexMutation(api.opponents.create),
  });


  // Form state
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [position, setPosition] = useState<"pro" | "con">("con");
  const [style, setStyle] = useState("aggressive");
  const [difficulty, setDifficulty] = useState("medium");


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user?._id) {
      setError("You must be logged in to create an opponent profile");
      return;
    }

    // Validation
    if (!name.trim()) {
      setError("Opponent name is required");
      return;
    }
    if (!topic.trim()) {
      setError("Debate topic is required");
      return;
    }



    setIsSubmitting(true);

    try {
      const opponentId = await createOpponent({
        name: name.trim(),
        topic: topic.trim(),
        position,
        style,
        difficulty,
      });

      // Navigate to prep screen with this opponent
      navigate({
        to: "/dashboard/prep",
        search: { opponentId },
      });
    } catch (err) {
      console.error("Error creating opponent:", err);
      setError(err instanceof Error ? err.message : "Failed to create opponent");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full w-full bg-secondary px-6 py-8 dark:bg-black">
      <div className="z-10 mx-auto flex h-full w-full max-w-screen-xl gap-12">
        <div className="flex w-full flex-col rounded-lg border border-border bg-card dark:bg-black">
          <div className="flex w-full flex-col rounded-lg p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-medium text-primary">
                Create Opponent Profile
              </h2>
              <p className="text-sm font-normal text-primary/60">
                Configure a custom AI opponent with specific arguments and debate style
              </p>
            </div>
          </div>

          <div className="flex w-full px-6">
            <div className="w-full border-b border-border" />
          </div>

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 p-6">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-primary">
                Opponent Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., Climate Skeptic, Policy Expert"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Topic */}
            <div className="flex flex-col gap-2">
              <label htmlFor="topic" className="text-sm font-medium text-primary">
                Debate Topic
              </label>
              <Input
                id="topic"
                type="text"
                placeholder="e.g., Climate change requires immediate action"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>

            {/* Position */}
            <div className="flex flex-col gap-2">
              <label htmlFor="position" className="text-sm font-medium text-primary">
                AI Position
              </label>
              <select
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value as "pro" | "con")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="pro">Pro (supporting the topic)</option>
                <option value="con">Con (opposing the topic)</option>
              </select>
            </div>

            {/* Style */}
            <div className="flex flex-col gap-2">
              <label htmlFor="style" className="text-sm font-medium text-primary">
                Debate Style
              </label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="aggressive">Aggressive - Confrontational and forceful</option>
                <option value="socratic">Socratic - Question-based reasoning</option>
                <option value="academic">Academic - Formal and evidence-focused</option>
                <option value="political">Political - Rhetorical and persuasive</option>
              </select>
            </div>

            {/* Difficulty */}
            <div className="flex flex-col gap-2">
              <label htmlFor="difficulty" className="text-sm font-medium text-primary">
                Difficulty Level
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="easy">Easy - Simple arguments</option>
                <option value="medium">Medium - Balanced challenge</option>
                <option value="hard">Hard - Expert-level arguments</option>
              </select>
            </div>



            {/* Error message */}
            {error && (
              <div className="rounded-lg bg-red-500/20 p-4 text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 border-t border-border pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Creating..." : "Save & Continue to Prep"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: "/dashboard" })}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
