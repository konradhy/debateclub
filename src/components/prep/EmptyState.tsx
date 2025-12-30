import { Brain, Loader2 } from "lucide-react";
import { Button } from "@/ui/button";
import { ProgressStep } from "./ProgressStep";

interface EmptyStateProps {
  isDebatePrep: boolean;
  progress: any;
  isGenerating: boolean;
  handleGenerateStrategy: () => void;
  handleGenerateGenericPrep: () => void;
  getStepStatus: (step: string, progress: any) => "pending" | "active" | "complete";
}

export function EmptyState({
  isDebatePrep,
  progress,
  isGenerating,
  handleGenerateStrategy,
  handleGenerateGenericPrep,
  getStepStatus,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      {progress &&
      progress.status !== "idle" &&
      progress.status !== "complete" &&
      progress.status !== "error" ? (
        <>
          <Brain className="h-12 w-12 text-primary mb-4 animate-pulse" />
          <h3 className="text-lg font-medium mb-2">
            Generating Your Strategy...
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mb-6">
            {progress.message}
          </p>
          <div className="flex items-center gap-2 flex-wrap justify-center max-w-lg">
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
        </>
      ) : (
        <>
          <Brain className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">
            {isDebatePrep
              ? "No Strategy Generated Yet"
              : "No Prep Materials Yet"}
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mb-6">
            {isDebatePrep
              ? 'Click "Generate Strategy" to research the topic and create a winning plan using advanced debate techniques.'
              : 'Click "Generate Prep Materials" to create talking points, key phrases, and response strategies.'}
          </p>
          <Button
            onClick={
              isDebatePrep
                ? handleGenerateStrategy
                : handleGenerateGenericPrep
            }
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : isDebatePrep ? (
              "Generate Strategy"
            ) : (
              "Generate Prep Materials"
            )}
          </Button>
        </>
      )}
    </div>
  );
}
