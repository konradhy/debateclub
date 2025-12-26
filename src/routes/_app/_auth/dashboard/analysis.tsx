import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { Id } from "@cvx/_generated/dataModel";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { ScrollArea } from "@/ui/scroll-area";
import {
  Trophy,
  Target,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Brain,
  MessageSquare,
  Swords,
  Lightbulb,
  Zap,
  Shield,
  Eye
} from "lucide-react";

export const Route = createFileRoute("/_app/_auth/dashboard/analysis")({
  component: Analysis,
  validateSearch: (search: Record<string, unknown>): { debateId?: string } => {
    return {
      debateId: search.debateId as string | undefined,
    };
  },
});

function Analysis() {
  const { debateId } = Route.useSearch();
  const { data: user } = useQuery(convexQuery(api.app.getCurrentUser, {}));

  const { data: analysis, isLoading } = useQuery(
    convexQuery(
      api.analysis.getAnalysis,
      debateId ? { debateId: debateId as Id<"debates"> } : "skip"
    )
  );

  // Determine if this is a debate analysis or generic (sales, entrepreneur, etc.)
  const isDebateAnalysis = analysis?.analysisFramework === "debate" || !analysis?.analysisFramework;

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Analyzing your performance...</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Brain className="h-12 w-12 text-muted-foreground/50" />
          <h2 className="text-xl font-semibold">Analysis Not Ready</h2>
          <p className="max-w-md text-muted-foreground">
            The debate analysis is still being generated. Please check back in a moment.
          </p>
          <Link to="/dashboard">
            <Button variant="outline">Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full w-full">
      <div className="container mx-auto flex max-w-6xl flex-col gap-8 p-6 pb-24">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {isDebateAnalysis ? "Debate Analysis" : "Performance Analysis"}
            </h1>
            <p className="text-muted-foreground">
              Detailed breakdown of your performance
            </p>
          </div>
          <Link to="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>

        {/* Executive Summary - Hero Section */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Trophy className="h-6 w-6 text-primary" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Verdict - Make it pop */}
            <div className="rounded-xl border border-primary/30 bg-card/50 p-6 backdrop-blur-sm">
              <p className="text-xl font-semibold leading-relaxed text-primary">
                {analysis.executiveSummary.verdict}
              </p>
            </div>

            {/* Assessment */}
            <p className="text-base leading-relaxed text-foreground/90">
              {analysis.executiveSummary.assessment}
            </p>

            {/* Strengths & Improvements - Side by side */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3 rounded-lg border border-green-500/20 bg-green-500/5 p-5">
                <h4 className="flex items-center gap-2 font-semibold text-green-600 dark:text-green-400">
                  <TrendingUp className="h-5 w-5" />
                  Top Strengths
                </h4>
                <ul className="space-y-2">
                  {analysis.executiveSummary.topStrengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                      <span className="text-foreground/90">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 rounded-lg border border-orange-500/20 bg-orange-500/5 p-5">
                <h4 className="flex items-center gap-2 font-semibold text-orange-600 dark:text-orange-400">
                  <Target className="h-5 w-5" />
                  Areas for Improvement
                </h4>
                <ul className="space-y-2">
                  {analysis.executiveSummary.topImprovements.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500" />
                      <span className="text-foreground/90">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two Column Layout for Scores */}
        <div className="grid gap-6 lg:grid-cols-2">
          {isDebateAnalysis && analysis.hasanScores ? (
            /* Hasan Scores - DEBATE ONLY */
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Swords className="h-5 w-5 text-primary" />
                  Win Every Argument Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Big Score Display */}
                <div className="flex flex-col items-center justify-center rounded-lg bg-primary/10 py-8">
                  <div className="text-6xl font-bold text-primary">
                    {analysis.hasanScores.total}
                    <span className="text-2xl text-muted-foreground">/40</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-muted-foreground">Overall Effectiveness</p>
                </div>

                {/* Category Breakdown */}
                <div className="space-y-4">
                  <ScoreRow
                    label="Fundamentals"
                    score={analysis.hasanScores.fundamentals}
                    max={10}
                    desc="Audience, Emotion, Evidence"
                  />
                  <ScoreRow
                    label="Tricks of the Trade"
                    score={analysis.hasanScores.tricksOfTrade}
                    max={10}
                    desc="Rule of Three, Judo, Zingers"
                  />
                  <ScoreRow
                    label="Behind the Scenes"
                    score={analysis.hasanScores.behindTheScenes}
                    max={10}
                    desc="Confidence, Composure"
                  />
                  <ScoreRow
                    label="Grand Finale"
                    score={analysis.hasanScores.grandFinale}
                    max={10}
                    desc="Closing Arguments"
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Skills Assessment - GENERIC SCENARIOS */
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Swords className="h-5 w-5 text-primary" />
                  Skills Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Overall Score */}
                {analysis.skillsAssessment && (
                  <>
                    <div className="flex flex-col items-center justify-center rounded-lg bg-primary/10 py-8">
                      <div className="text-6xl font-bold text-primary">
                        {Math.round(
                          analysis.skillsAssessment.reduce(
                            (sum: number, skill: { score: number }) => sum + skill.score,
                            0
                          ) / analysis.skillsAssessment.length
                        )}
                        <span className="text-2xl text-muted-foreground">/10</span>
                      </div>
                      <p className="mt-2 text-sm font-medium text-muted-foreground">Average Score</p>
                    </div>

                    {/* Individual Skills */}
                    <div className="space-y-4">
                      {analysis.skillsAssessment.map(
                        (skill: { name: string; score: number; feedback: string }, i: number) => (
                          <div key={i} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-foreground">{skill.name}</span>
                              <span className="text-sm font-bold text-primary">{skill.score}/10</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                              <div
                                className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                                style={{ width: `${skill.score * 10}%` }}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground">{skill.feedback}</p>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {isDebateAnalysis && analysis.opponentAnalysis ? (
            /* Opponent Analysis - DEBATE ONLY */
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Opponent Intel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <h4 className="text-sm font-semibold">Techniques Used</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysis.opponentAnalysis.techniquesUsed.map((item: string, i: number) => (
                      <Badge key={i} variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-300">
                        {item}
                      </Badge>
                    ))}
                    {analysis.opponentAnalysis.techniquesUsed.length === 0 && (
                      <span className="text-sm text-muted-foreground">None detected</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-500" />
                    <h4 className="text-sm font-semibold">Traps Set</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysis.opponentAnalysis.trapsSet.map((item: string, i: number) => (
                      <Badge key={i} variant="outline" className="border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
                        {item}
                      </Badge>
                    ))}
                    {analysis.opponentAnalysis.trapsSet.length === 0 && (
                      <span className="text-sm text-muted-foreground">No traps detected</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-red-500" />
                    <h4 className="text-sm font-semibold">Weaknesses Exposed</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysis.opponentAnalysis.weaknessesExposed.map((item: string, i: number) => (
                      <Badge key={i} variant="outline" className="border-red-200 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                        {item}
                      </Badge>
                    ))}
                    {analysis.opponentAnalysis.weaknessesExposed.length === 0 && (
                      <span className="text-sm text-muted-foreground">None exposed</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-amber-500" />
                    <h4 className="text-sm font-semibold">Unexploited Weaknesses</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysis.opponentAnalysis.unexploitedWeaknesses.map((item: string, i: number) => (
                      <Badge key={i} variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
                        {item}
                      </Badge>
                    ))}
                    {analysis.opponentAnalysis.unexploitedWeaknesses.length === 0 && (
                      <span className="text-sm text-muted-foreground">All exploited!</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Key Moments - GENERIC SCENARIOS */
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Key Moments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.keyMoments && analysis.keyMoments.length > 0 ? (
                  analysis.keyMoments.map(
                    (
                      moment: { moment: string; impact: string; wasHandledWell: boolean },
                      i: number
                    ) => (
                      <div
                        key={i}
                        className={`rounded-lg border p-4 ${
                          moment.wasHandledWell
                            ? "border-green-200 bg-green-50 dark:border-green-900/30 dark:bg-green-900/10"
                            : "border-orange-200 bg-orange-50 dark:border-orange-900/30 dark:bg-orange-900/10"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${
                              moment.wasHandledWell ? "bg-green-500" : "bg-orange-500"
                            }`}
                          />
                          <div className="space-y-1">
                            <p className="font-medium text-foreground">{moment.moment}</p>
                            <p className="text-sm text-muted-foreground">{moment.impact}</p>
                          </div>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Brain className="mb-3 h-12 w-12 text-muted-foreground/50" />
                    <p className="text-muted-foreground">No key moments identified</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Missed Opportunities - DEBATE ONLY */}
        {isDebateAnalysis && analysis.missedOpportunities && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                Missed Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analysis.missedOpportunities.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Trophy className="mb-3 h-12 w-12 text-green-500/50" />
                  <p className="font-medium text-green-600 dark:text-green-400">
                    Excellent! No major missed opportunities detected.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {analysis.missedOpportunities.map((opp: { whichTechnique: string; moment: string; whatShouldHaveDone: string }, i: number) => (
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-lg border border-amber-200/50 bg-gradient-to-r from-amber-50/50 to-transparent p-5 transition-all hover:border-amber-300 hover:shadow-md dark:border-amber-900/30 dark:from-amber-900/10"
                    >
                      {/* Technique Badge */}
                      <div className="mb-3 flex items-start justify-between gap-4">
                        <Badge className="bg-amber-500 text-white">
                          {opp.whichTechnique}
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <div>
                          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            The Moment
                          </p>
                          <p className="italic text-foreground/80">
                            "{opp.moment}"
                          </p>
                        </div>

                        <div>
                          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Better Approach
                          </p>
                          <p className="text-foreground">
                            {opp.whatShouldHaveDone}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Technique Scorecard - DEBATE ONLY */}
        {isDebateAnalysis && analysis.techniqueScorecard && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Technique Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {analysis.techniqueScorecard.map((category: { category: string; executionScore: number; notes: string; techniquesIdentified: string[] }, i: number) => (
                  <div key={i} className="space-y-3 rounded-lg border border-border/50 bg-card/50 p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">{category.category}</h4>
                      <div className="flex items-center gap-3">
                        {/* The beloved dots! */}
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((dot) => (
                            <div
                              key={dot}
                              className={`h-2.5 w-2.5 rounded-full transition-all ${
                                dot <= category.executionScore
                                  ? "bg-primary shadow-sm shadow-primary/50"
                                  : "bg-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="min-w-[2rem] text-right text-sm font-bold text-primary">
                          {category.executionScore}/5
                        </span>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {category.notes}
                    </p>

                    {category.techniquesIdentified.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {category.techniquesIdentified.map((tech: string, j: number) => (
                          <span
                            key={j}
                            className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Training Plan */}
        {analysis.practiceRecommendations && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-primary" />
                Your Training Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`grid gap-6 ${isDebateAnalysis && analysis.practiceRecommendations.longTermDevelopment ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                {/* Immediate Focus */}
                <div className="space-y-4 rounded-xl border-2 border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/20">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-red-500 p-2">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-red-900 dark:text-red-300">Immediate Focus</h4>
                      <p className="text-xs text-red-700 dark:text-red-400">Start today</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-red-900 dark:text-red-200">
                      {analysis.practiceRecommendations.immediateFocus.area}
                    </p>
                    <p className="text-sm text-red-800 dark:text-red-300">
                      {analysis.practiceRecommendations.immediateFocus.drill}
                    </p>
                    {analysis.practiceRecommendations.immediateFocus.exampleToStudy && (
                      <p className="text-xs text-red-700 dark:text-red-400">
                        📚 {analysis.practiceRecommendations.immediateFocus.exampleToStudy}
                      </p>
                    )}
                  </div>
                </div>

                {/* Secondary Focus */}
                <div className="space-y-4 rounded-xl border-2 border-orange-200 bg-orange-50 p-5 dark:border-orange-900/50 dark:bg-orange-950/20">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-orange-500 p-2">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-orange-900 dark:text-orange-300">Secondary Focus</h4>
                      <p className="text-xs text-orange-700 dark:text-orange-400">This week</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-orange-900 dark:text-orange-200">
                      {analysis.practiceRecommendations.secondaryFocus.area}
                    </p>
                    <p className="text-sm text-orange-800 dark:text-orange-300">
                      {analysis.practiceRecommendations.secondaryFocus.drill}
                    </p>
                    {analysis.practiceRecommendations.secondaryFocus.exampleToStudy && (
                      <p className="text-xs text-orange-700 dark:text-orange-400">
                        📚 {analysis.practiceRecommendations.secondaryFocus.exampleToStudy}
                      </p>
                    )}
                  </div>
                </div>

                {/* Long Term - DEBATE ONLY */}
                {analysis.practiceRecommendations.longTermDevelopment && (
                  <div className="space-y-4 rounded-xl border-2 border-blue-200 bg-blue-50 p-5 dark:border-blue-900/50 dark:bg-blue-950/20">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg bg-blue-500 p-2">
                        <Trophy className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900 dark:text-blue-300">Long Term</h4>
                        <p className="text-xs text-blue-700 dark:text-blue-400">This month</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold text-blue-900 dark:text-blue-200">
                        {analysis.practiceRecommendations.longTermDevelopment.skill}
                      </p>
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        {analysis.practiceRecommendations.longTermDevelopment.practiceApproach}
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-400">
                        📚 {analysis.practiceRecommendations.longTermDevelopment.resources}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </ScrollArea>
  );
}

function ScoreRow({ label, score, max, desc }: { label: string, score: number, max: number, desc: string }) {
  const percentage = Math.round((score / max) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm font-bold text-primary">{score}/{max}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </div>
  );
}

function Badge({
  children,
  variant = "default",
  className = ""
}: {
  children: React.ReactNode,
  variant?: "default" | "secondary" | "outline",
  className?: string
}) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-border text-foreground"
  };

  return (
    <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
