import type { LucideIcon } from "lucide-react";

interface TechniqueCardProps {
  /** Technique number (e.g., 1, 2, 3) */
  number: number;
  /** Technique name/title */
  title: string;
  /** Icon component from lucide-react */
  icon: LucideIcon;
  /** What the technique is */
  whatItIs: string;
  /** Why the technique works */
  whyItWorks: string;
  /** Example of the technique in action */
  example: string;
  /** Optional source citation */
  source?: string;
}

/**
 * Technique card with icon, numbered title, explanation, and example.
 * Used to present the core techniques taught in each scenario.
 */
export function TechniqueCard({
  number,
  title,
  icon: Icon,
  whatItIs,
  whyItWorks,
  example,
  source,
}: TechniqueCardProps) {
  return (
    <div
      className="my-6 rounded-xl border-l-4 p-6"
      style={{ backgroundColor: "#FAFAF8", borderColor: "#3C4A32" }}
    >
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-5 w-5" style={{ color: "#3C4A32" }} />
        <h3 className="font-bold" style={{ color: "#2A2A20" }}>
          {number}. {title}
        </h3>
      </div>
      <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
        <strong>What it is:</strong> {whatItIs}
      </p>
      <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
        <strong>Why it works:</strong> {whyItWorks}
        {source && ` (${source})`}
      </p>
      <div
        className="rounded-lg p-3 text-sm"
        style={{ backgroundColor: "#E5DFD3" }}
      >
        <strong>Example:</strong> {example}
      </div>
    </div>
  );
}
