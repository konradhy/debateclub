export interface BehavioralRule {
  /** The condition (what user does) */
  condition: string;
  /** The outcome (how opponent responds) */
  outcome: string;
}

interface BehavioralRulesListProps {
  /** Array of behavioral rules */
  rules: BehavioralRule[];
  /** Optional intro text */
  intro?: string;
}

/**
 * Bullet list showing if/then behavioral rules.
 * Used to explain how the practice engine responds to different techniques.
 */
export function BehavioralRulesList({
  rules,
  intro,
}: BehavioralRulesListProps) {
  return (
    <>
      {intro && (
        <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
          {intro}
        </p>
      )}
      <ul className="my-4 space-y-2">
        {rules.map((rule, index) => (
          <li
            key={index}
            className="flex items-start gap-3"
            style={{ color: "#5C5C54" }}
          >
            <span
              className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
              style={{ backgroundColor: "#9A9A6D" }}
            />
            <span>
              <strong>{rule.condition}:</strong> {rule.outcome}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
