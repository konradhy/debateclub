import { Loader2, AlertTriangle } from "lucide-react";
import { PrepProgressSteps } from "./PrepProgressSteps";

interface GenerationProgressProps {
  progress:
  | {
    status:
    | "idle"
    | "complete"
    | "error"
    | "researching"
    | "extracting"
    | "synthesizing"
    | "generating"
    | "generating_strategic_brief"
    | "storing";
    message?: string;
    error?: string;
    completedSteps: string[];
  }
  | null
  | undefined;
}

export function GenerationProgress({ progress }: GenerationProgressProps) {
  // Helper to determine step status
  const getStepStatus = (
    step: string,
    progressData: typeof progress,
  ): "pending" | "active" | "complete" => {
    if (!progressData) return "pending";
    if (progressData.completedSteps.includes(step)) return "complete";
    if (progressData.status === step) return "active";
    return "pending";
  };

  return (
    <>
      {/* Progress Indicator */}
      {progress &&
        progress.status !== "idle" &&
        progress.status !== "complete" && (
          <div className="px-6 py-4 bg-secondary/30 border-b border-border">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="font-medium text-primary">
                {progress.message}
              </span>
            </div>
            <PrepProgressSteps
              progress={progress}
              getStepStatus={getStepStatus}
            />
          </div>
        )}

      {/* Error Display */}
      {progress?.status === "error" && progress.error && (
        <div className="px-6 py-4 bg-red-500/10 border-b border-red-500/30">
          <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">Error: {progress.error}</span>
          </div>
        </div>
      )}
    </>
  );
}
