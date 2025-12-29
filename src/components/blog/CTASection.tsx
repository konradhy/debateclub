import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  /** CTA headline */
  title: string;
  /** CTA description */
  description: string;
  /** Button text (defaults to "Start Practicing") */
  buttonText?: string;
  /** Link destination (defaults to "/login") */
  linkTo?: string;
}

/**
 * Call-to-action section with headline, description, and button.
 * Dark green background for strong visual contrast.
 */
export function CTASection({
  title,
  description,
  buttonText = "Start Practicing",
  linkTo = "/login",
}: CTASectionProps) {
  return (
    <motion.div
      className="mt-12 rounded-xl p-8 text-center"
      style={{ backgroundColor: "#3C4A32" }}
    >
      <h3
        className="mb-4 text-2xl font-bold"
        style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
      >
        {title}
      </h3>
      <p className="mb-6" style={{ color: "#C8C8B8" }}>
        {description}
      </p>
      <Link
        to={linkTo}
        className="inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold transition-all hover:gap-3"
        style={{ backgroundColor: "#FAFAF8", color: "#3C4A32" }}
      >
        {buttonText}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}
