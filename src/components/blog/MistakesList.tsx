export interface Mistake {
  /** Mistake title */
  title: string;
  /** Description of the mistake and why it fails */
  description: string;
}

interface MistakesListProps {
  /** Array of mistakes to display */
  mistakes: Mistake[];
  /** Optional intro text */
  intro?: string;
}

/**
 * Numbered list of common mistakes with descriptions.
 * Used to warn users about behaviors that the practice engine punishes.
 */
export function MistakesList({ mistakes, intro }: MistakesListProps) {
  return (
    <>
      {intro && (
        <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
          {intro}
        </p>
      )}
      <div
        className="my-6 rounded-xl p-6"
        style={{ backgroundColor: "#FAFAF8" }}
      >
        <div className="space-y-4">
          {mistakes.map((mistake, index) => (
            <div key={index} className="flex items-start gap-3">
              <span
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{ backgroundColor: "#E5DFD3", color: "#3C4A32" }}
              >
                {index + 1}
              </span>
              <div>
                <p className="font-medium" style={{ color: "#2A2A20" }}>
                  {mistake.title}
                </p>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  {mistake.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
