import { Loader2, AlertTriangle } from "lucide-react";
import { ProgressStep } from "./ProgressStep";

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
    | "generating_openings"
    | "generating_frames"
    | "generating_receipts"
    | "generating_zingers"
    | "generating_closings"
    | "generating_intel"
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
            <div className="flex items-center gap-3 mb-3">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="font-medium text-primary">
                {progress.message}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <ProgressStep
                label="Research"
                status={getStepStatus("researching", progress)}
              />
              <ProgressStep
                label="Extract"
                status={getStepStatus("extracting", progress)}
              />
              <ProgressStep
                label="Synthesis"
                status={getStepStatus("synthesizing", progress)}
              />
              <ProgressStep
                label="Openings"
                status={getStepStatus("generating_openings", progress)}
              />
              <ProgressStep
                label="Arguments"
                status={getStepStatus("generating_frames", progress)}
              />
              <ProgressStep
                label="Receipts"
                status={getStepStatus("generating_receipts", progress)}
              />
              <ProgressStep
                label="Zingers"
                status={getStepStatus("generating_zingers", progress)}
              />
              <ProgressStep
                label="Closings"
                status={getStepStatus("generating_closings", progress)}
              />
              <ProgressStep
                label="Intel"
                status={getStepStatus("generating_intel", progress)}
              />
              <ProgressStep
                label="Save"
                status={getStepStatus("storing", progress)}
              />
            </div>
          </div>
        )}

      {/* Error Display */}
      {progress?.status === "error" && progress.error && (
        <div className="px-6 py-4 bg-red-500/10 border-b border-red-500/30">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">Error: {progress.error}</span>
          </div>
        </div>
      )}
    </>
  );
}
