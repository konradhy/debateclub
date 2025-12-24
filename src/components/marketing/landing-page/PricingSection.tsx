import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { pricingTiers } from "./data";

/**
 * Pricing section with Free and Pro tier cards.
 * Clean, professional design with feature lists.
 */
export function PricingSection() {
  return (
    <section id="pricing" className="w-full py-12 sm:py-20 lg:py-28" style={{ backgroundColor: "#F5F3EF" }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10 sm:mb-14 lg:mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-sm sm:text-base" style={{ color: "#888880" }}>
            Pricing
          </p>
          <h2
            className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-xl text-base sm:text-lg" style={{ color: "#5C5C54" }}>
            Start free and upgrade when you're ready to unlock unlimited practice sessions.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className="relative w-full sm:w-80 rounded-2xl p-6 sm:p-8"
              style={{
                backgroundColor: tier.highlighted ? "#3C4A32" : "#FAFAF8",
                boxShadow: tier.highlighted
                  ? "0 20px 40px rgba(60, 74, 50, 0.3)"
                  : "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              {tier.highlighted && (
                <div
                  className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 rounded-full px-3 sm:px-4 py-1 text-xs font-semibold"
                  style={{ backgroundColor: "#A8B08C", color: "#2A2A20" }}
                >
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3
                  className="mb-2 text-lg sm:text-xl font-bold"
                  style={{ color: tier.highlighted ? "#FAFAF8" : "#2A2A20" }}
                >
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-3xl sm:text-4xl font-bold"
                    style={{ color: tier.highlighted ? "#FAFAF8" : "#2A2A20" }}
                  >
                    {tier.price}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: tier.highlighted ? "#C8C8B8" : "#888880" }}
                  >
                    /{tier.period}
                  </span>
                </div>
                {"annualPrice" in tier && tier.annualPrice && (
                  <p
                    className="mt-1 text-sm font-medium"
                    style={{ color: "#A8B08C" }}
                  >
                    or {tier.annualPrice}
                  </p>
                )}
                <p
                  className="mt-2 text-sm"
                  style={{ color: tier.highlighted ? "#C8C8B8" : "#5C5C54" }}
                >
                  {tier.description}
                </p>
              </div>

              <ul className="mb-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 flex-shrink-0"
                      style={{ color: tier.highlighted ? "#A8B08C" : "#5C6B4A" }}
                    />
                    <span
                      className="text-base"
                      style={{ color: tier.highlighted ? "#E8E8E0" : "#5C5C54" }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/login"
                className="block w-full rounded-lg py-3 text-center font-semibold transition-all hover:brightness-110"
                style={{
                  backgroundColor: tier.highlighted ? "#FAFAF8" : "#3C4A32",
                  color: tier.highlighted ? "#3C4A32" : "#FAFAF8",
                }}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

