import { Check, Circle, Loader2 } from "lucide-react";
import { cn } from "@/utils/misc";

interface ProgressStepProps {
  label: string;
  status: "pending" | "active" | "complete";
}

export function ProgressStep({ label, status }: ProgressStepProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-all",
        status === "complete" &&
          "bg-green-500/20 text-green-700 dark:text-green-400",
        status === "active" && "bg-primary/20 text-primary animate-pulse",
        status === "pending" && "bg-muted text-muted-foreground",
      )}
    >
      {status === "complete" && <Check className="h-3 w-3" />}
      {status === "active" && <Loader2 className="h-3 w-3 animate-spin" />}
      {status === "pending" && <Circle className="h-3 w-3" />}
      {label}
    </div>
  );
}
