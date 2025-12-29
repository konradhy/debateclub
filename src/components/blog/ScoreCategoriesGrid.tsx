export interface ScoreCategory {
  /** Category name (e.g., "Value Defense") */
  name: string;
  /** What this category measures */
  description: string;
}

interface ScoreCategoriesGridProps {
  /** Array of 4 score categories */
  categories: ScoreCategory[];
  /** Optional intro text */
  intro?: string;
}

/**
 * 2x2 grid showing the four dimensions measured in analysis.
 * Used in the "What Gets Measured" section of blog posts.
 */
export function ScoreCategoriesGrid({
  categories,
  intro,
}: ScoreCategoriesGridProps) {
  return (
    <>
      {intro && (
        <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
          {intro}
        </p>
      )}
      <div className="my-4 grid gap-3 md:grid-cols-2">
        {categories.map((category, index) => (
          <div
            key={index}
            className="rounded-lg p-4"
            style={{ backgroundColor: "#E5DFD3" }}
          >
            <h4 className="mb-1 font-bold" style={{ color: "#3C4A32" }}>
              {category.name}
            </h4>
            <p className="text-sm" style={{ color: "#5C5C54" }}>
              {category.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
