import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { ScrollArea } from "@/ui/scroll-area";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Play,
  Pause,
  TrendingUp,
  Trophy,
  Clock,
  BarChart3,
  FileText,
  Calendar,
} from "lucide-react";
import { useState, useRef } from "react";
import { Id } from "@cvx/_generated/dataModel";

export const Route = createFileRoute("/_app/_auth/dashboard/history")({
  component: History,
});

function History() {
  const { data: debates = [], isLoading: debatesLoading } = useQuery(
    convexQuery(api.debates.listUserDebates, {}),
  );

  const { data: stats, isLoading: statsLoading } = useQuery(
    convexQuery(api.debates.getPerformanceStats, {}),
  );

  const [selectedDebateId, setSelectedDebateId] = useState<
    Id<"debates"> | null
  >(null);
  const [playingDebateId, setPlayingDebateId] = useState<
    Id<"debates"> | null
  >(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const selectedDebate = debates.find((d) => d._id === selectedDebateId);

  const handlePlayRecording = (debateId: Id<"debates">, url: string) => {
    if (playingDebateId === debateId && audioRef.current) {
      // Pause if already playing
      audioRef.current.pause();
      setPlayingDebateId(null);
    } else {
      // Play new recording
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.play();
      setPlayingDebateId(debateId);
      audio.onended = () => setPlayingDebateId(null);
      audio.onerror = () => {
        console.error("Error playing recording");
        setPlayingDebateId(null);
      };
    }
  };

  // Prepare chart data
  const chartData =
    debates
      .filter((d) => d.analysis)
      .map((d) => ({
        date: new Date(d.completedAt || d.startedAt).toLocaleDateString(),
        score: d.analysis?.hasanScores.total || 0,
        fundamentals: d.analysis?.hasanScores.fundamentals || 0,
        tricksOfTrade: d.analysis?.hasanScores.tricksOfTrade || 0,
        behindTheScenes: d.analysis?.hasanScores.behindTheScenes || 0,
        grandFinale: d.analysis?.hasanScores.grandFinale || 0,
      }))
      .reverse() || [];

  if (debatesLoading || statsLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading debate history...</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full w-full">
      <div className="container mx-auto flex max-w-7xl flex-col gap-8 p-6 pb-24">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Debate History
            </h1>
            <p className="text-muted-foreground">
              Review your past debates and track your performance
            </p>
          </div>
          <Link to="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>

        {/* Performance Stats Cards */}
        {stats && stats.totalDebates > 0 && (
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Debates
                </CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDebates}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Score
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.averageScore.toFixed(1)}
                  <span className="text-sm text-muted-foreground">/40</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Improvement
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${
                    stats.improvementPercent >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {stats.improvementPercent >= 0 ? "+" : ""}
                  {stats.improvementPercent.toFixed(1)}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Recent Average
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.recentDebates.length > 0
                    ? (
                        stats.recentDebates.reduce(
                          (sum, d) => sum + (d.score || 0),
                          0,
                        ) / stats.recentDebates.length
                      ).toFixed(1)
                    : "0"}
                  <span className="text-sm text-muted-foreground">/40</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Performance Charts */}
        {chartData.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Score Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Score Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 40]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#8884d8"
                      strokeWidth={2}
                      name="Total Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="fundamentals"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      name="Fundamentals"
                    />
                    <Area
                      type="monotone"
                      dataKey="tricksOfTrade"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      name="Tricks of Trade"
                    />
                    <Area
                      type="monotone"
                      dataKey="behindTheScenes"
                      stackId="1"
                      stroke="#ffc658"
                      fill="#ffc658"
                      name="Behind Scenes"
                    />
                    <Area
                      type="monotone"
                      dataKey="grandFinale"
                      stackId="1"
                      stroke="#ff7300"
                      fill="#ff7300"
                      name="Grand Finale"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Debate List */}
        <Card>
          <CardHeader>
            <CardTitle>Past Debates</CardTitle>
          </CardHeader>
          <CardContent>
            {debates.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold">No debates yet</h3>
                <p className="text-muted-foreground">
                  Start your first debate to see it here
                </p>
                <Link to="/dashboard" className="mt-4">
                  <Button>Go to Dashboard</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {debates.map((debate) => (
                  <div
                    key={debate._id}
                    className={`rounded-lg border p-4 transition-all hover:bg-secondary ${
                      selectedDebateId === debate._id
                        ? "border-primary bg-secondary"
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{debate.topic}</h3>
                          {debate.analysis && (
                            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                              {debate.analysis.hasanScores.total}/40
                            </span>
                          )}
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(
                              debate.completedAt || debate.startedAt,
                            ).toLocaleDateString()}
                          </div>
                          {debate.duration && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {Math.floor(debate.duration / 60)}m{" "}
                              {Math.floor(debate.duration % 60)}s
                            </div>
                          )}
                          <div className="capitalize">
                            {debate.userPosition} vs {debate.aiPosition}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {debate.recordingUrl && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handlePlayRecording(debate._id, debate.recordingUrl!)
                            }
                          >
                            {playingDebateId === debate._id ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          onClick={() =>
                            setSelectedDebateId(
                              selectedDebateId === debate._id
                                ? null
                                : debate._id,
                            )
                          }
                        >
                          {selectedDebateId === debate._id
                            ? "Hide Details"
                            : "View Details"}
                        </Button>
                        {debate.analysis && (
                          <Link
                            to="/dashboard/analysis"
                            search={{ debateId: debate._id }}
                          >
                            <Button variant="default">View Analysis</Button>
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedDebateId === debate._id && selectedDebate && (
                      <div className="mt-4 space-y-4 border-t pt-4">
                        {selectedDebate.recordingUrl && (
                          <div>
                            <h4 className="mb-2 text-sm font-semibold">
                              Recording
                            </h4>
                            <audio
                              ref={audioRef}
                              src={selectedDebate.recordingUrl}
                              controls
                              className="w-full"
                            />
                          </div>
                        )}
                        {selectedDebate.analysis && (
                          <div>
                            <h4 className="mb-2 text-sm font-semibold">
                              Quick Stats
                            </h4>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                              <div>
                                <div className="text-xs text-muted-foreground">
                                  Fundamentals
                                </div>
                                <div className="text-lg font-semibold">
                                  {selectedDebate.analysis.hasanScores.fundamentals}
                                  /10
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">
                                  Tricks of Trade
                                </div>
                                <div className="text-lg font-semibold">
                                  {
                                    selectedDebate.analysis.hasanScores
                                      .tricksOfTrade
                                  }
                                  /10
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">
                                  Behind Scenes
                                </div>
                                <div className="text-lg font-semibold">
                                  {
                                    selectedDebate.analysis.hasanScores
                                      .behindTheScenes
                                  }
                                  /10
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">
                                  Grand Finale
                                </div>
                                <div className="text-lg font-semibold">
                                  {
                                    selectedDebate.analysis.hasanScores
                                      .grandFinale
                                  }
                                  /10
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
