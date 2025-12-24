import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { techniques } from "./data";

/**
 * Techniques showcase section with expandable grid.
 * Shows 6 techniques initially with option to reveal all 12.
 * Each technique links to its blog post.
 */
export function TechniquesShowcase() {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleTechniques = isExpanded ? techniques : techniques.slice(0, 6);

  return (
    <section id="techniques" className="w-full py-12 sm:py-20 lg:py-28" style={{ backgroundColor: "#E8E4DA" }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8 sm:mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-sm sm:text-base" style={{ color: "#888880" }}>
            Techniques
          </p>
          <h2
            className="mb-3 text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Master the Moves
          </h2>
          <p className="text-base sm:text-lg" style={{ color: "#5C5C54" }}>
            12 techniques from Mehdi Hasan's bestselling book, practiced through
            live sparring
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {visibleTechniques.map((technique, index) => (
              <motion.div
                key={technique.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                layout
              >
                <Link
                  to={`/blog/${technique.id}`}
                  className="block rounded-xl border-l-4 p-5 sm:p-6 transition-all duration-200 hover:shadow-lg"
                  style={{
                    backgroundColor: "#FAFAF8",
                    borderLeftColor: "#9A9A6D",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <h3
                    className="mb-2 text-lg sm:text-xl font-bold"
                    style={{ color: "#2A2A20" }}
                  >
                    {technique.title}
                  </h3>
                  <p
                    className="mb-4 text-sm sm:text-base leading-relaxed"
                    style={{ color: "#5C5C54" }}
                  >
                    {technique.description}
                  </p>
                  <span
                    className="inline-block rounded-md px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: technique.badgeColor,
                      color: technique.badgeTextColor,
                    }}
                  >
                    {technique.badge}
                  </span>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-8 sm:mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-medium transition-all duration-300"
            style={{
              backgroundColor: isExpanded ? "#FAFAF8" : "#3C4A32",
              color: isExpanded ? "#3C4A32" : "#FAFAF8",
              border: "2px solid #3C4A32",
            }}
          >
            {isExpanded ? "Show Less" : "Show All 12 Techniques"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
