import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
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
  ArrowLeft,
} from "lucide-react";
import { useState, useRef } from "react";
import { Id } from "@cvx/_generated/dataModel";

// Color constants matching dashboard
const colors = {
  background: "#F5F3EF",
  cardBg: "#FAFAF8",
  border: "#E8E4DA",
  primary: "#3C4A32",
  primaryLight: "#5C6B4A",
  text: "#2A2A20",
  textMuted: "#5C5C54",
  textLight: "#888880",
};

export const Route = createFileRoute("/_app/_auth/dashboard/history")({
  component: History,
});

function History() {
  const { data: debates = [], isLoading: debatesLoading } = useQuery({
    ...convexQuery(api.debates.listUserDebates, {}),
    staleTime: 2 * 60 * 1000, // 2 minutes - history doesn't change often
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    ...convexQuery(api.debates.getPerformanceStats, {}),
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  const [selectedDebateId, setSelectedDebateId] =
    useState<Id<"debates"> | null>(null);
  const [playingDebateId, setPlayingDebateId] = useState<Id<"debates"> | null>(
    null,
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const selectedDebate = debates.find((d) => d._id === selectedDebateId);

  const handlePlayRecording = (debateId: Id<"debates">, url: string) => {
    if (playingDebateId === debateId && audioRef.current) {
      audioRef.current.pause();
      setPlayingDebateId(null);
    } else {
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
      .filter((d) => d.analysis?.hasanScores)
      .map((d) => ({
        date: new Date(d.completedAt || d.startedAt).toLocaleDateString(),
        score: d.analysis?.hasanScores?.total ?? 0,
        fundamentals: d.analysis?.hasanScores?.fundamentals ?? 0,
        tricksOfTrade: d.analysis?.hasanScores?.tricksOfTrade ?? 0,
        behindTheScenes: d.analysis?.hasanScores?.behindTheScenes ?? 0,
        grandFinale: d.analysis?.hasanScores?.grandFinale ?? 0,
      }))
      .reverse() || [];

  if (debatesLoading || statsLoading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"
            style={{ borderColor: colors.primary }}
          />
          <p style={{ color: colors.textMuted }}>Loading debate history...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <div className="mx-auto max-w-5xl px-4 md:px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1
              className="text-2xl md:text-3xl font-bold"
              style={{ color: colors.text, fontFamily: "Georgia, serif" }}
            >
              Debate History
            </h1>
            <p className="mt-1" style={{ color: colors.textMuted }}>
              Review your past debates and track your performance
            </p>
          </div>
          <Link to="/dashboard">
            <button
              className="inline-flex items-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all hover:shadow-sm"
              style={{
                borderColor: colors.border,
                color: colors.text,
                backgroundColor: colors.cardBg,
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          </Link>
        </div>

        {/* Performance Stats Cards */}
        {stats && stats.totalDebates > 0 && (
          <div className="mb-8 grid gap-5 md:grid-cols-4">
            {/* Total Debates */}
            <div
              className="rounded-xl border-2 p-5"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.cardBg,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium" style={{ color: colors.textMuted }}>
                  Total Debates
                </div>
                <Trophy className="h-4 w-4" style={{ color: colors.textLight }} />
              </div>
              <div className="text-2xl font-bold" style={{ color: colors.text }}>
                {stats.totalDebates}
              </div>
            </div>

            {/* Average Score */}
            <div
              className="rounded-xl border-2 p-5"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.cardBg,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium" style={{ color: colors.textMuted }}>
                  Average Score
                </div>
                <BarChart3 className="h-4 w-4" style={{ color: colors.textLight }} />
              </div>
              <div className="text-2xl font-bold" style={{ color: colors.text }}>
                {stats.averageScore.toFixed(1)}
                <span className="text-sm" style={{ color: colors.textMuted }}>/40</span>
              </div>
            </div>

            {/* Improvement */}
            <div
              className="rounded-xl border-2 p-5"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.cardBg,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium" style={{ color: colors.textMuted }}>
                  Improvement
                </div>
                <TrendingUp className="h-4 w-4" style={{ color: colors.textLight }} />
              </div>
              <div
                className="text-2xl font-bold"
                style={{
                  color: stats.improvementPercent >= 0 ? "#16a34a" : "#dc2626",
                }}
              >
                {stats.improvementPercent >= 0 ? "+" : ""}
                {stats.improvementPercent.toFixed(1)}%
              </div>
            </div>

            {/* Recent Average */}
            <div
              className="rounded-xl border-2 p-5"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.cardBg,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium" style={{ color: colors.textMuted }}>
                  Recent Average
                </div>
                <Clock className="h-4 w-4" style={{ color: colors.textLight }} />
              </div>
              <div className="text-2xl font-bold" style={{ color: colors.text }}>
                {stats.recentDebates.length > 0
                  ? (
                    stats.recentDebates.reduce(
                      (sum, d) => sum + (d.score || 0),
                      0,
                    ) / stats.recentDebates.length
                  ).toFixed(1)
                  : "0"}
                <span className="text-sm" style={{ color: colors.textMuted }}>/40</span>
              </div>
            </div>
          </div>
        )}

        {/* Performance Charts */}
        {chartData.length > 0 && (
          <div className="mb-8 grid gap-5 lg:grid-cols-2">
            {/* Score Trend Chart */}
            <div
              className="rounded-xl border-2 p-6"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.cardBg,
              }}
            >
              <h3
                className="mb-4 text-lg font-semibold"
                style={{ color: colors.text }}
              >
                Score Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                  <XAxis dataKey="date" stroke={colors.textMuted} />
                  <YAxis domain={[0, 40]} stroke={colors.textMuted} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke={colors.primary}
                    strokeWidth={2}
                    name="Total Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Category Breakdown */}
            <div
              className="rounded-xl border-2 p-6"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.cardBg,
              }}
            >
              <h3
                className="mb-4 text-lg font-semibold"
                style={{ color: colors.text }}
              >
                Category Breakdown
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                  <XAxis dataKey="date" stroke={colors.textMuted} />
                  <YAxis domain={[0, 10]} stroke={colors.textMuted} />
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
            </div>
          </div>
        )}

        {/* Debate List */}
        <div
          className="rounded-xl border-2 p-6"
          style={{
            borderColor: colors.border,
            backgroundColor: colors.cardBg,
          }}
        >
          <h3
            className="mb-5 text-lg font-semibold"
            style={{ color: colors.text }}
          >
            Past Debates
          </h3>
          {debates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="mb-4 h-12 w-12" style={{ color: colors.textLight }} />
              <h3 className="text-lg font-semibold" style={{ color: colors.text }}>
                No debates yet
              </h3>
              <p style={{ color: colors.textMuted }}>
                Start your first debate to see it here
              </p>
              <Link to="/dashboard" className="mt-4">
                <button
                  className="rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110"
                  style={{ backgroundColor: colors.primary }}
                >
                  Go to Dashboard
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {debates.reverse().map((debate) => (
                <div
                  key={debate._id}
                  className="rounded-lg border-2 p-5 transition-shadow hover:shadow-md"
                  style={{
                    borderColor: selectedDebateId === debate._id ? colors.primary : colors.border,
                    backgroundColor: colors.cardBg,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold" style={{ color: colors.text }}>
                          {debate.topic}
                        </h3>
                        {debate.analysis?.hasanScores && (
                          <span
                            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                            style={{
                              backgroundColor: `${colors.primary}1A`,
                              color: colors.primary,
                            }}
                          >
                            {debate.analysis.hasanScores.total}/40
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm" style={{ color: colors.textMuted }}>
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
                        <button
                          className="flex h-9 w-9 items-center justify-center rounded-lg border-2 transition-all hover:shadow-sm"
                          style={{
                            borderColor: colors.border,
                            backgroundColor: colors.cardBg,
                          }}
                          onClick={() =>
                            handlePlayRecording(
                              debate._id,
                              debate.recordingUrl!,
                            )
                          }
                        >
                          {playingDebateId === debate._id ? (
                            <Pause className="h-4 w-4" style={{ color: colors.text }} />
                          ) : (
                            <Play className="h-4 w-4" style={{ color: colors.text }} />
                          )}
                        </button>
                      )}
                      <button
                        className="rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all hover:shadow-sm"
                        style={{
                          borderColor: colors.border,
                          color: colors.text,
                          backgroundColor: colors.cardBg,
                        }}
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
                      </button>
                      {debate.analysis && (
                        <Link
                          to="/dashboard/analysis"
                          search={{ debateId: debate._id }}
                        >
                          <button
                            className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110"
                            style={{ backgroundColor: colors.primaryLight }}
                          >
                            View Analysis
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedDebateId === debate._id && selectedDebate && (
                    <div className="mt-4 space-y-4 border-t pt-4" style={{ borderColor: colors.border }}>
                      {selectedDebate.recordingUrl && (
                        <div>
                          <h4 className="mb-2 text-sm font-semibold" style={{ color: colors.text }}>
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
                      {selectedDebate.analysis?.hasanScores && (
                        <div>
                          <h4 className="mb-2 text-sm font-semibold" style={{ color: colors.text }}>
                            Hasan Scores
                          </h4>
                          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div>
                              <div className="text-xs" style={{ color: colors.textMuted }}>
                                Fundamentals
                              </div>
                              <div className="text-lg font-semibold" style={{ color: colors.text }}>
                                {
                                  selectedDebate.analysis.hasanScores
                                    .fundamentals
                                }
                                /10
                              </div>
                            </div>
                            <div>
                              <div className="text-xs" style={{ color: colors.textMuted }}>
                                Tricks of Trade
                              </div>
                              <div className="text-lg font-semibold" style={{ color: colors.text }}>
                                {
                                  selectedDebate.analysis.hasanScores
                                    .tricksOfTrade
                                }
                                /10
                              </div>
                            </div>
                            <div>
                              <div className="text-xs" style={{ color: colors.textMuted }}>
                                Behind Scenes
                              </div>
                              <div className="text-lg font-semibold" style={{ color: colors.text }}>
                                {
                                  selectedDebate.analysis.hasanScores
                                    .behindTheScenes
                                }
                                /10
                              </div>
                            </div>
                            <div>
                              <div className="text-xs" style={{ color: colors.textMuted }}>
                                Grand Finale
                              </div>
                              <div className="text-lg font-semibold" style={{ color: colors.text }}>
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
                      {selectedDebate.analysis?.skillsAssessment && (
                        <div>
                          <h4 className="mb-2 text-sm font-semibold" style={{ color: colors.text }}>
                            Skills Assessment
                          </h4>
                          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {selectedDebate.analysis.skillsAssessment.map(
                              (skill: { name: string; score: number }) => (
                                <div key={skill.name}>
                                  <div className="text-xs" style={{ color: colors.textMuted }}>
                                    {skill.name}
                                  </div>
                                  <div className="text-lg font-semibold" style={{ color: colors.text }}>
                                    {skill.score}/10
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
