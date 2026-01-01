import ReactMarkdown from "react-markdown";
import { ProgressBar } from "./ProgressBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Zap, Clock } from "lucide-react";

// Color constants matching main analysis page
const colors = {
  background: "#F5F3EF",
  cardBg: "#FAFAF8",
  border: "#E8E4DA",
  primary: "#3C4A32",
  primaryLight: "#5C6B4A",
  text: "#2A2A20",
  textMuted: "#5C5C54",
  textLight: "#888880",
  accent: "#A8B08C",
};

interface QuickAnalysisViewProps {
  summary: string;
  showProgressBar?: boolean;
}

/**
 * Displays quick analysis summary from Gemini Flash.
 * Shows immediately (~10 seconds) while full analysis generates in background.
 * Optionally displays progress bar for full analysis generation.
 */
export function QuickAnalysisView({
  summary,
  showProgressBar = false,
}: QuickAnalysisViewProps) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8 pb-24">
      <div className="flex flex-col gap-8">
        {/* Progress Bar Card (if full analysis still generating) - MOVED TO TOP */}
        {showProgressBar && (
          <Card
            className="border-2"
            style={{
              borderColor: colors.accent + "80",
              backgroundColor: colors.cardBg
            }}
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock
                  className="h-5 w-5 animate-pulse"
                  style={{ color: colors.primary }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: colors.text }}
                    >
                      Generating comprehensive analysis...
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: colors.textMuted }}
                    >
                      ~90 seconds remaining
                    </span>
                  </div>
                  <p
                    className="text-xs mb-3"
                    style={{ color: colors.textLight }}
                  >
                    Full analysis with technique breakdown, rewrites, and practice drills
                  </p>
                  <ProgressBar />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Analysis Card */}
        <Card
          className="border-2"
          style={{
            borderColor: colors.accent,
            backgroundColor: colors.cardBg
          }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div
                className="rounded-lg p-2"
                style={{ backgroundColor: colors.primary }}
              >
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span style={{ color: colors.text, fontFamily: "Georgia, serif" }}>
                Quick Take
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-sm max-w-none leading-relaxed"
              style={{ color: colors.text }}
            >
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2
                      className="text-xl font-bold mt-6 mb-3"
                      style={{ color: colors.primary, fontFamily: "Georgia, serif" }}
                    >
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3
                      className="text-lg font-semibold mt-4 mb-2"
                      style={{ color: colors.primaryLight }}
                    >
                      {children}
                    </h3>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-2 my-4">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-2">
                      <span
                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: colors.accent }}
                      />
                      <span style={{ color: colors.text }}>{children}</span>
                    </li>
                  ),
                  p: ({ children }) => (
                    <p
                      className="mb-3 leading-relaxed"
                      style={{ color: colors.text }}
                    >
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong
                      className="font-semibold"
                      style={{ color: colors.primary }}
                    >
                      {children}
                    </strong>
                  ),
                }}
              >
                {summary}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
