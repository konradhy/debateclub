import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { convexQuery, useConvexMutation, useConvexAction } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import siteConfig from "~/site.config";
import { Plus, Trash2, Save, Sparkles } from "lucide-react";

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
  const { mutateAsync: generatePrepMaterials } = useMutation({
    mutationFn: useConvexAction(api.prepMaterials.generate),
  });

  // Form state
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [position, setPosition] = useState<"pro" | "con">("con");
  const [style, setStyle] = useState("aggressive");
  const [difficulty, setDifficulty] = useState("medium");
  const [talkingPoints, setTalkingPoints] = useState<string[]>([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generated prep materials state
  const [userCheatSheet, setUserCheatSheet] = useState("");
  const [userOpeningStatement, setUserOpeningStatement] = useState("");
  const [userDebateNotes, setUserDebateNotes] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const addTalkingPoint = () => {
    setTalkingPoints([...talkingPoints, ""]);
  };

  const removeTalkingPoint = (index: number) => {
    setTalkingPoints(talkingPoints.filter((_, i) => i !== index));
  };

  const updateTalkingPoint = (index: number, value: string) => {
    const newPoints = [...talkingPoints];
    newPoints[index] = value;
    setTalkingPoints(newPoints);
  };

  const handleGeneratePrepMaterials = async () => {
    setError(null);

    // Validation
    if (!topic.trim()) {
      setError("Please enter a debate topic first");
      return;
    }

    setIsGenerating(true);

    try {
      // Calculate user's position (opposite of AI)
      const userPosition = position === "con" ? "pro" : "con";

      const result = await generatePrepMaterials({
        topic: topic.trim(),
        userPosition,
        aiPosition: position,
        style,
        difficulty,
      });

      // Set the generated materials
      setUserCheatSheet(result.userCheatSheet);
      setUserOpeningStatement(result.userOpeningStatement);
      setUserDebateNotes(result.userDebateNotes);
      setTalkingPoints(result.opponentTalkingPoints);
      setHasGenerated(true);
    } catch (err) {
      console.error("Error generating prep materials:", err);
      setError(err instanceof Error ? err.message : "Failed to generate prep materials");
    } finally {
      setIsGenerating(false);
    }
  };

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

    const validTalkingPoints = talkingPoints.filter((p) => p.trim().length > 0);
    if (validTalkingPoints.length === 0) {
      setError("At least one talking point is required");
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
        talkingPoints: validTalkingPoints,
        userCheatSheet: userCheatSheet || undefined,
        userOpeningStatement: userOpeningStatement || undefined,
        userDebateNotes: userDebateNotes || undefined,
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

            {/* Generate Prep Materials Button */}
            <div className="flex flex-col gap-3 border-t border-border pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-primary">AI-Generated Prep Materials</h3>
                  <p className="text-xs text-primary/60">
                    Generate debate prep for you and talking points for your opponent
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={handleGeneratePrepMaterials}
                  disabled={isGenerating || !topic.trim()}
                  variant="default"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isGenerating ? "Generating..." : "Generate Prep"}
                </Button>
              </div>
            </div>

            {/* Generated Materials Display */}
            {hasGenerated && (
              <>
                {/* CheatSheet */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-primary">
                    Your CheatSheet (Techniques Guide)
                  </label>
                  <p className="text-xs text-primary/60">
                    AI-generated guide on which techniques to use
                  </p>
                  <div className="rounded-md border border-border bg-secondary p-4 text-sm text-primary/80 whitespace-pre-wrap max-h-60 overflow-y-auto">
                    {userCheatSheet}
                  </div>
                </div>

                {/* Opening Statement */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="openingStatement" className="text-sm font-medium text-primary">
                    Your Opening Statement (Editable)
                  </label>
                  <p className="text-xs text-primary/60">
                    AI-suggested 30-second opener - edit as needed
                  </p>
                  <textarea
                    id="openingStatement"
                    value={userOpeningStatement}
                    onChange={(e) => setUserOpeningStatement(e.target.value)}
                    rows={4}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>

                {/* Debate Notes */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="debateNotes" className="text-sm font-medium text-primary">
                    Your Debate Notes (Editable)
                  </label>
                  <p className="text-xs text-primary/60">
                    Research, stats, and talking points for your position
                  </p>
                  <textarea
                    id="debateNotes"
                    value={userDebateNotes}
                    onChange={(e) => setUserDebateNotes(e.target.value)}
                    rows={8}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
              </>
            )}

            {/* Talking Points */}
            <div className="flex flex-col gap-3 border-t border-border pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-primary">
                    Opponent Talking Points {hasGenerated && "(AI-Generated)"}
                  </label>
                  <p className="text-xs text-primary/60">
                    Main arguments the AI opponent will use - {hasGenerated ? "edit as needed" : "add manually or generate above"}
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={addTalkingPoint}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Point
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {talkingPoints.map((point, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      type="text"
                      placeholder={`Talking point ${index + 1}`}
                      value={point}
                      onChange={(e) => updateTalkingPoint(index, e.target.value)}
                      className="flex-1"
                    />
                    {talkingPoints.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeTalkingPoint(index)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
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
