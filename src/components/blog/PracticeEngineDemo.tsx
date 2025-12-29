import type { LucideIcon } from "lucide-react";

export interface TechniqueStep {
  /** Icon for this technique */
  icon: LucideIcon;
  /** Technique name (e.g., "Value Defense") */
  name: string;
  /** Score for demonstration (e.g., "8/10") */
  score: string;
  /** Whether this is a "good" score (green) or "needs work" (red) */
  isGood: boolean;
  /** Feedback text */
  feedback: string;
}

interface PracticeEngineDemoProps {
  /** Title for the diagram section */
  title?: string;
  /** The opening line from the opponent/buyer */
  openingLine: string;
  /** Context explaining the opening */
  openingContext: string;
  /** Bad path: what user says when they make a mistake */
  badResponse: string;
  /** What the system detects in the bad response */
  badDetections: string[];
  /** How the opponent responds to the bad technique */
  badOutcome: string;
  /** Explanation of why this is bad */
  badExplanation: string;
  /** Good path: what user says when they use good technique */
  goodResponse: string;
  /** What the system detects in the good response */
  goodDetections: string[];
  /** How the opponent responds to good technique */
  goodOutcome: string;
  /** Explanation of why this is good */
  goodExplanation: string;
  /** Score categories shown in the analysis section */
  analysisScores: TechniqueStep[];
  /** Explanation of what the analysis shows */
  analysisExplanation: string;
}

/**
 * Rich visual demonstration of how the practice engine works.
 * Shows the opening, two response paths (bad/good), and analysis.
 * Used in the "How DebateClub Works" section of blog posts.
 */
export function PracticeEngineDemo({
  title = "The Practice Engine: A Real Example",
  openingLine,
  openingContext,
  badResponse,
  badDetections,
  badOutcome,
  badExplanation,
  goodResponse,
  goodDetections,
  goodOutcome,
  goodExplanation,
  analysisScores,
  analysisExplanation,
}: PracticeEngineDemoProps) {
  return (
    <div className="my-8 rounded-xl p-8" style={{ backgroundColor: "#2A2A20" }}>
      <h3
        className="mb-6 text-center text-xl font-bold"
        style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
      >
        {title}
      </h3>

      <div className="space-y-6">
        {/* Opening */}
        <div>
          <div
            className="mb-3 rounded-lg p-4"
            style={{ backgroundColor: "#5C5C54" }}
          >
            <p
              className="mb-2 text-xs font-bold uppercase tracking-wide"
              style={{ color: "#A8B08C" }}
            >
              The Opening
            </p>
            <p
              className="text-sm italic leading-relaxed"
              style={{ color: "#FAFAF8" }}
            >
              "{openingLine}"
            </p>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "#C8C8B8" }}>
            {openingContext}
          </p>
        </div>

        {/* Bad Response Path */}
        <div
          className="rounded-xl p-6"
          style={{
            backgroundColor: "#3C4A32",
            borderLeft: "4px solid #E57373",
          }}
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="text-lg" style={{ color: "#E57373" }}>
              ✗
            </span>
            <p className="font-bold" style={{ color: "#E57373" }}>
              Bad Technique
            </p>
          </div>

          <div
            className="mb-4 rounded-lg p-3"
            style={{ backgroundColor: "#2A2A20" }}
          >
            <p className="mb-1 text-xs font-bold" style={{ color: "#A8B08C" }}>
              You say:
            </p>
            <p className="text-sm italic" style={{ color: "#E8E4DA" }}>
              "{badResponse}"
            </p>
          </div>

          <div className="mb-4 space-y-2">
            <p className="text-xs font-bold" style={{ color: "#FAFAF8" }}>
              What the system detects:
            </p>
            <ul className="space-y-1 text-xs" style={{ color: "#C8C8B8" }}>
              {badDetections.map((detection, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5" style={{ color: "#E57373" }}>
                    •
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: detection }} />
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-lg p-3"
            style={{ backgroundColor: "#2A2A20" }}
          >
            <p className="mb-1 text-xs font-bold" style={{ color: "#E57373" }}>
              Opponent responds:
            </p>
            <p className="text-sm italic" style={{ color: "#E8E4DA" }}>
              "{badOutcome}"
            </p>
          </div>

          <p
            className="mt-3 text-xs leading-relaxed"
            style={{ color: "#C8C8B8" }}
          >
            <strong style={{ color: "#E57373" }}>Result: </strong>
            {badExplanation}
          </p>
        </div>

        {/* Good Response Path */}
        <div
          className="rounded-xl p-6"
          style={{
            backgroundColor: "#3C4A32",
            borderLeft: "4px solid #A8B08C",
          }}
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="text-lg" style={{ color: "#A8B08C" }}>
              ✓
            </span>
            <p className="font-bold" style={{ color: "#A8B08C" }}>
              Good Technique
            </p>
          </div>

          <div
            className="mb-4 rounded-lg p-3"
            style={{ backgroundColor: "#2A2A20" }}
          >
            <p className="mb-1 text-xs font-bold" style={{ color: "#A8B08C" }}>
              You say:
            </p>
            <p className="text-sm italic" style={{ color: "#E8E4DA" }}>
              "{goodResponse}"
            </p>
          </div>

          <div className="mb-4 space-y-2">
            <p className="text-xs font-bold" style={{ color: "#FAFAF8" }}>
              What the system detects:
            </p>
            <ul className="space-y-1 text-xs" style={{ color: "#C8C8B8" }}>
              {goodDetections.map((detection, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5" style={{ color: "#A8B08C" }}>
                    •
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: detection }} />
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-lg p-3"
            style={{ backgroundColor: "#2A2A20" }}
          >
            <p className="mb-1 text-xs font-bold" style={{ color: "#A8B08C" }}>
              Opponent responds:
            </p>
            <p className="text-sm italic" style={{ color: "#E8E4DA" }}>
              "{goodOutcome}"
            </p>
          </div>

          <p
            className="mt-3 text-xs leading-relaxed"
            style={{ color: "#C8C8B8" }}
          >
            <strong style={{ color: "#A8B08C" }}>Result: </strong>
            {goodExplanation}
          </p>
        </div>

        {/* Analysis Section */}
        <div className="rounded-xl p-6" style={{ backgroundColor: "#3C4A32" }}>
          <p className="mb-4 text-sm font-bold" style={{ color: "#FAFAF8" }}>
            After the Session: Detailed Analysis
          </p>

          <div className="space-y-3">
            {analysisScores.map((score, index) => {
              const Icon = score.icon;
              return (
                <div
                  key={index}
                  className="rounded-lg p-3"
                  style={{ backgroundColor: "#2A2A20" }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon
                        className="h-4 w-4"
                        style={{ color: score.isGood ? "#A8B08C" : "#E57373" }}
                      />
                      <p
                        className="text-sm font-bold"
                        style={{ color: "#FAFAF8" }}
                      >
                        {score.name}
                      </p>
                    </div>
                    <p
                      className="text-sm font-bold"
                      style={{ color: score.isGood ? "#A8B08C" : "#E57373" }}
                    >
                      {score.score}
                    </p>
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "#C8C8B8" }}
                  >
                    {score.feedback}
                  </p>
                </div>
              );
            })}
          </div>

          <p
            className="mt-4 text-xs leading-relaxed"
            style={{ color: "#C8C8B8" }}
          >
            {analysisExplanation}
          </p>
        </div>
      </div>
    </div>
  );
}
