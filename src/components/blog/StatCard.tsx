import { motion } from "framer-motion";

interface StatCardProps {
  /** Large stat number (e.g., "80%", "35%", "$47K") */
  stat: string;
  /** Description below the stat */
  description: string;
  /** Source citation */
  source: string;
  /** Background color variant: "dark" (forest green) or "muted" (olive) */
  variant?: "dark" | "muted";
}

/**
 * Stats card with large number, description, and source citation.
 * Uses dark backgrounds with white text for strong visual contrast.
 */
export function StatCard({
  stat,
  description,
  source,
  variant = "dark",
}: StatCardProps) {
  const styles =
    variant === "dark"
      ? {
          bg: "#3C4A32",
          statColor: "#FAFAF8",
          descColor: "#E8E4DA",
          sourceColor: "#A8B08C",
        }
      : {
          bg: "#9A9A6D",
          statColor: "#FAFAF8",
          descColor: "#2A2A20",
          sourceColor: "#3C4A32",
        };

  return (
    <motion.div
      className="rounded-xl p-6 shadow-lg"
      style={{ backgroundColor: styles.bg }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <p className="text-5xl font-bold" style={{ color: styles.statColor }}>
        {stat}
      </p>
      <p
        className="mt-3 text-sm font-medium leading-relaxed"
        style={{ color: styles.descColor }}
      >
        {description}
      </p>
      <p className="mt-2 text-xs" style={{ color: styles.sourceColor }}>
        Source: {source}
      </p>
    </motion.div>
  );
}

interface StatsGridProps {
  /** Array of stat cards to display */
  stats: StatCardProps[];
}

/**
 * Two-column grid of stat cards.
 */
export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          {...stat}
          variant={index % 2 === 0 ? "dark" : "muted"}
        />
      ))}
    </div>
  );
}
