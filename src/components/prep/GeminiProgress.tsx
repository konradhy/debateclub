import { Loader2, AlertTriangle } from "lucide-react";
import { colors } from "@/lib/prep-colors";

interface GeminiProgressProps {
  geminiProgress:
    | {
        status:
          | "complete"
          | "error"
          | "storing"
          | "deep_research_planning"
          | "deep_research_searching"
          | "deep_research_complete"
          | "gemini_agent_searching"
          | "generating";
        message?: string;
        error?: string;
      }
    | null
    | undefined;
}

export function GeminiProgress({ geminiProgress }: GeminiProgressProps) {
  return (
    <>
      {/* Gemini Progress Indicator */}
      {geminiProgress &&
        geminiProgress.status !== "complete" &&
        geminiProgress.status !== "error" && (
          <div
            className="px-6 py-4"
            style={{
              backgroundColor: `${colors.accent}20`,
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            <div className="flex items-center gap-3">
              <Loader2
                className="h-5 w-5 animate-spin"
                style={{ color: colors.primary }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium" style={{ color: colors.text }}>
                    AI Deep Research
                  </span>
                </div>
                <p className="text-sm" style={{ color: colors.textMuted }}>
                  {geminiProgress.message}
                </p>
                {geminiProgress.status.startsWith("deep_research") && (
                  <p className="text-xs mt-1" style={{ color: colors.textLight }}>
                    Deep Research can take 3-20 minutes for comprehensive
                    analysis
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

      {/* Gemini Error Display */}
      {geminiProgress?.status === "error" && geminiProgress.error && (
        <div className="px-6 py-4 bg-red-500/10 border-b border-red-500/30">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">
              Gemini Error: {geminiProgress.error}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
