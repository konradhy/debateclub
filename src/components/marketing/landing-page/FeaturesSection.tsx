import { motion } from "framer-motion";
import { features } from "./data";

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/**
 * Features section showcasing the 6 main app capabilities.
 */
export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-28" style={{ backgroundColor: "#E5DFD3" }}>
      <div className="mx-auto max-w-5xl px-8">
        <motion.div
          className="mb-14 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
        >
          <p className="mb-2 text-base" style={{ color: "#888880" }}>
            Features
          </p>
          <h2
            className="text-4xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Train Like a Champion
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="rounded-xl border-l-4 p-6 pb-8"
              style={{
                backgroundColor: "#FAFAF8",
                borderLeftColor: "#9A9A6D",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -5,
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                transition: { duration: 0.2 },
              }}
            >
              <div className="mb-4">
                <img
                  src={feature.icon}
                  alt=""
                  aria-hidden="true"
                  className="h-16 w-auto"
                />
              </div>
              <h3
                className="mb-2 text-xl font-bold"
                style={{ color: "#2A2A20" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

