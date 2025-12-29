export interface Source {
  /** Full citation text */
  citation: string;
}

interface SourcesListProps {
  /** Array of sources */
  sources: Source[];
}

/**
 * Sources section with numbered citations.
 * Appears at the bottom of blog posts for credibility.
 */
export function SourcesList({ sources }: SourcesListProps) {
  return (
    <div className="mt-16 border-t pt-8" style={{ borderColor: "#E8E4DA" }}>
      <h3 className="mb-4 text-xl font-bold" style={{ color: "#2A2A20" }}>
        Sources & Further Reading
      </h3>
      <ol className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
        {sources.map((source, index) => (
          <li key={index}>
            {index + 1}. {source.citation}
          </li>
        ))}
      </ol>
    </div>
  );
}
