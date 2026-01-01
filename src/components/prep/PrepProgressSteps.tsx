import { ProgressStep } from "./ProgressStep";

interface PrepProgressStepsProps {
  progress: any;
  getStepStatus: (step: string, progress: any) => "pending" | "active" | "complete";
  className?: string;
}

export function PrepProgressSteps({
  progress,
  getStepStatus,
  className = "",
}: PrepProgressStepsProps) {
  return (
    <div className={`flex items-center justify-center gap-2 flex-wrap ${className}`}>
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
        label="Study Guide"
        status={getStepStatus("generating", progress)}
      />
      <ProgressStep
        label="Strategic Brief"
        status={getStepStatus("generating_strategic_brief", progress)}
      />
      <ProgressStep
        label="Save"
        status={getStepStatus("storing", progress)}
      />
    </div>
  );
}
