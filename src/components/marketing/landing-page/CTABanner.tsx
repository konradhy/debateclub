import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Mic } from "lucide-react";

/**
 * Call-to-action banner encouraging users to start their first debate.
 * Features a bold headline, supporting text, and prominent CTA button.
 */
export function CTABanner() {
  return (
    <section
      className="relative w-full overflow-hidden py-24"
      style={{ backgroundColor: "#3C4A32" }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-4xl px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <motion.div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Mic className="h-8 w-8" style={{ color: "#C8D4B8" }} />
          </motion.div>

          {/* Headline */}
          <h2
            className="mb-4 text-4xl font-bold lg:text-5xl"
            style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
          >
            Ready to Win Your Next Argument?
          </h2>

          {/* Supporting text */}
          <p
            className="mx-auto mb-10 max-w-xl text-lg leading-relaxed"
            style={{ color: "#C8C8B8" }}
          >
            Your first debate is free. No credit card required. Start practicing
            in under 30 seconds.
          </p>

          {/* CTA Button */}
          <Link
            to="/login"
            className="group inline-flex items-center gap-3 rounded-full px-10 py-4 text-lg font-semibold transition-all hover:gap-4"
            style={{ backgroundColor: "#FAFAF8", color: "#3C4A32" }}
          >
            Start Your Free Debate
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Trust indicator */}
          <p className="mt-6 text-sm" style={{ color: "#8A9A7A" }}>
            Join the early adopters improving their skills
          </p>
        </motion.div>
      </div>
    </section>
  );
}
