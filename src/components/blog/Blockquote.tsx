interface BlockquoteProps {
  /** The quote text */
  quote: string;
  /** Attribution (author/source) */
  attribution: string;
}

/**
 * Styled blockquote with border accent and attribution.
 * Used for impactful quotes from sources.
 */
export function Blockquote({ quote, attribution }: BlockquoteProps) {
  return (
    <blockquote
      className="my-8 border-l-4 py-2 pl-6 italic"
      style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
    >
      "{quote}"
      <span className="mt-2 block text-sm not-italic">— {attribution}</span>
    </blockquote>
  );
}
