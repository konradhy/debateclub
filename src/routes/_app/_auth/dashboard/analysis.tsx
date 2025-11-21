import { createFileRoute, useSearch, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";
import siteConfig from "~/site.config";
import { Sparkles, TrendingUp, Lightbulb, Trophy, Target, Zap } from "lucide-react";
import { Button } from "@/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";

export const Route = createFileRoute("/_app/_auth/dashboard/analysis")({
  component: Analysis,
});

function Analysis() {
  const { debateId } = useSearch({ from: "/_app/_auth/dashboard/analysis" });

  const { data: debate } = useQuery(
    convexQuery(api.debates.get, {
      debateId: (debateId as Id<"debates">) ?? null,
    }),
  );

  const { data: analysis } = useQuery(
    convexQuery(api.analysis.getAnalysis, {
      debateId: (debateId as Id<"debates">) ?? null,
    }),
  );

  // Live query for techniques - updates automatically as they are detected
  const { data: techniques = [] } = useQuery(
    convexQuery(api.analysis.getTechniques, {
      debateId: (debateId as Id<"debates">) ?? null,
    }),
  );

  const { data: exchanges = [] } = useQuery(
    convexQuery(api.debates.getExchanges, {
      debateId: (debateId as Id<"debates">) ?? null,
    }),
  );

  if (!debateId) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-primary/60">No debate ID provided</p>
      </div>
    );
  }

  if (!debate) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-primary/60">Loading debate...</p>
      </div>
    );
  }

  const techniqueNames: Record<string, string> = {
    concession_pivot: "Concession & Pivot",
    receipts: "Receipts",
    zinger: "Zinger",
    reframing: "Reframing",
    preemption: "Preemption",
    provocative_question: "Provocative Question",
    personal_story: "Personal Story",
    rule_of_three: "Rule of Three",
    peroration: "Peroration",
    gish_gallop: "Gish Gallop Attack",
    strategic_interruption: "Strategic Interruption",
  };

  return (
    <div className="flex h-full w-full bg-secondary px-6 py-8 dark:bg-black">
      <div className="z-10 mx-auto flex h-full w-full max-w-screen-xl gap-12">
        <div className="flex w-full flex-col rounded-lg border border-border bg-card dark:bg-black">
          <div className="flex w-full flex-col rounded-lg p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-medium text-primary">
                Debate Analysis
              </h2>
              <p className="text-sm font-normal text-primary/60">
                Topic: {debate.topic}
              </p>
              <p className="text-sm font-normal text-primary/60">
                Your position: {debate.userPosition} | AI position:{" "}
                {debate.aiPosition}
              </p>
            </div>
          </div>

          <div className="flex w-full px-6">
            <div className="w-full border-b border-border" />
          </div>

          <div className="flex w-full flex-col gap-6 p-6">
            {/* Techniques Used - Live View */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-medium text-primary">
                Techniques Detected ({techniques.length})
              </h3>
              {techniques.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {techniques.map((tech) => {
                    const techniqueName =
                      techniqueNames[tech.technique] || tech.technique;
                    const effectivenessColor =
                      tech.effectiveness >= 7
                        ? "bg-green-500/20 text-green-700 dark:text-green-400"
                        : tech.effectiveness >= 5
                          ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                          : "bg-red-500/20 text-red-700 dark:text-red-400";

                    return (
                      <div
                        key={tech._id}
                        className={`flex items-start gap-3 rounded-lg p-3 ${effectivenessColor}`}
                      >
                        <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0" />
                        <div className="flex flex-1 flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {techniqueName}
                            </span>
                            <span className="text-xs opacity-75">
                              ({tech.speaker === "user" ? "You" : "AI"})
                            </span>
                            <span className="text-xs font-bold">
                              {tech.effectiveness}/10
                            </span>
                          </div>
                          <p className="text-xs opacity-90 italic">"{tech.text}"</p>
                          {tech.context && (
                            <div className="mt-1 rounded bg-black/5 p-2 text-xs opacity-90 dark:bg-white/10">
                              <span className="font-semibold">Context:</span>{" "}
                              {tech.context}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-primary/60">
                  No specific techniques detected yet. Start speaking!
                </div>
              )}
            </div>

            {/* Winner Badge */}
            {analysis?.winner && (
              <div className="flex flex-col gap-3 border-t border-border pt-6">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <h3 className="text-lg font-medium text-primary">Debate Result</h3>
                </div>
                <div className={`rounded-lg p-4 ${
                  analysis.winner === "user"
                    ? "bg-green-500/20 text-green-700 dark:text-green-400"
                    : analysis.winner === "ai"
                    ? "bg-blue-500/20 text-blue-700 dark:text-blue-400"
                    : "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                }`}>
                  <p className="text-sm font-medium">
                    {analysis.winner === "user"
                      ? "🎉 You won this debate!"
                      : analysis.winner === "ai"
                      ? "The AI won this debate"
                      : "This debate was a tie"}
                  </p>
                </div>
              </div>
            )}

            {/* Missed Opportunities */}
            {analysis?.missedOpportunities && analysis.missedOpportunities.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-border pt-6">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-500" />
                  <h3 className="text-lg font-medium text-primary">Missed Opportunities</h3>
                </div>
                <p className="text-sm text-primary/60">
                  Moments where you could have used specific techniques
                </p>
                <ul className="flex flex-col gap-2">
                  {analysis.missedOpportunities.map((opportunity, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 rounded-lg bg-orange-500/10 p-3 text-sm text-primary/80"
                    >
                      <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
                      <span>{opportunity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Moments */}
            {analysis?.keyMoments && analysis.keyMoments.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-border pt-6">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                  <h3 className="text-lg font-medium text-primary">Key Moments</h3>
                </div>
                <p className="text-sm text-primary/60">
                  Turning points that shaped the debate
                </p>
                <div className="flex flex-col gap-3">
                  {analysis.keyMoments.map((moment, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 rounded-lg bg-purple-500/10 p-4"
                    >
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-purple-500" />
                        <span className="text-xs font-medium text-primary/60">
                          {moment.speaker === "user" ? "You" : "AI"}
                        </span>
                      </div>
                      <p className="text-sm italic text-primary/80">"{moment.text}"</p>
                      <p className="text-xs text-primary/60">
                        <span className="font-semibold">Why it mattered:</span> {moment.significance}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysis ? (
              <Tabs defaultValue="user" className="w-full border-t border-border pt-6">
                <TabsList className="grid w-full max-w-[400px] grid-cols-2 bg-secondary">
                  <TabsTrigger value="user">User Analysis</TabsTrigger>
                  <TabsTrigger value="ai">AI Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="user" className="mt-6 flex flex-col gap-6">
                  {/* User Summary */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-medium text-primary">
                      Your Performance Summary
                    </h3>
                    <p className="text-sm text-primary/80">
                      {analysis.userSummary}
                    </p>
                  </div>

                  {/* User Improvement Tips */}
                  {analysis.userImprovementTips && (
                    <div className="flex flex-col gap-3">
                      <h3 className="text-lg font-medium text-primary">
                        Improvement Tips for You
                      </h3>
                      <ul className="flex flex-col gap-2">
                        {analysis.userImprovementTips.map((tip, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-primary/80"
                          >
                            <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-500" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* User Effectiveness Scores */}
                  {analysis.userEffectivenessScores && (
                    <div className="flex flex-col gap-3 border-t border-border pt-6">
                      <h3 className="text-lg font-medium text-primary">
                        Your Technique Effectiveness
                      </h3>
                      <div className="flex flex-wrap gap-4">
                        {Object.entries(analysis.userEffectivenessScores).map(
                          ([technique, score]) => {
                            if (score === undefined) return null;
                            return (
                              <div
                                key={technique}
                                className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2"
                              >
                                <TrendingUp className="h-4 w-4 text-primary/60" />
                                <span className="text-sm font-medium text-primary">
                                  {techniqueNames[technique] || technique}:
                                </span>
                                <span className="text-sm font-bold text-primary">
                                  {score}/10
                                </span>
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="ai" className="mt-6 flex flex-col gap-6">
                  {/* AI Summary */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-medium text-primary">
                      AI Performance Summary
                    </h3>
                    <p className="text-sm text-primary/80">
                      {analysis.aiSummary}
                    </p>
                  </div>

                  {/* AI Improvement Tips */}
                  {analysis.aiImprovementTips && (
                    <div className="flex flex-col gap-3">
                      <h3 className="text-lg font-medium text-primary">
                        How the AI Could Improve
                      </h3>
                      <ul className="flex flex-col gap-2">
                        {analysis.aiImprovementTips.map((tip, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-primary/80"
                          >
                            <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* AI Effectiveness Scores */}
                  {analysis.aiEffectivenessScores && (
                    <div className="flex flex-col gap-3 border-t border-border pt-6">
                      <h3 className="text-lg font-medium text-primary">
                        AI Technique Effectiveness
                      </h3>
                      <div className="flex flex-wrap gap-4">
                        {Object.entries(analysis.aiEffectivenessScores).map(
                          ([technique, score]) => {
                            if (score === undefined) return null;
                            return (
                              <div
                                key={technique}
                                className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2"
                              >
                                <TrendingUp className="h-4 w-4 text-primary/60" />
                                <span className="text-sm font-medium text-primary">
                                  {techniqueNames[technique] || technique}:
                                </span>
                                <span className="text-sm font-bold text-primary">
                                  {score}/10
                                </span>
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            ) : (
              <div className="flex items-center justify-center py-12 border-t border-border">
                <p className="text-primary/60">
                  Analysis will appear here after the debate...
                </p>
              </div>
            )}

            {/* Transcript */}
            {exchanges.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-border pt-6">
                <h3 className="text-lg font-medium text-primary">Transcript</h3>
                <div className="flex flex-col gap-3 rounded-lg bg-secondary p-4">
                  {exchanges.map((exchange) => (
                    <div
                      key={exchange._id}
                      className={`flex flex-col gap-1 ${exchange.speaker === "user"
                        ? "items-end"
                        : "items-start"
                        }`}
                    >
                      <span className="text-xs font-medium text-primary/60">
                        {exchange.speaker === "user" ? "You" : "AI"}
                      </span>
                      <p
                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${exchange.speaker === "user"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary text-primary/80"
                          }`}
                      >
                        {exchange.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 border-t border-border pt-6">
              <Link to="/dashboard/debate">
                <Button variant="default" size="lg">
                  Start New Debate
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
