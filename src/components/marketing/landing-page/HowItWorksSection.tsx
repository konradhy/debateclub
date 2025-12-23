import { motion } from "framer-motion";

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/**
 * How It Works section with 4-step visual flow and connecting lines.
 */
export function HowItWorksSection() {
  return (
    <section className="w-full py-32" style={{ backgroundColor: "#F5F3EF" }}>
      <div className="mx-auto max-w-5xl px-8">
        <motion.div
          className="mb-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
        >
          <p className="mb-2 text-sm" style={{ color: "#888880" }}>
            How It Works
          </p>
          <h2
            className="text-3xl font-bold lg:text-4xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            From Nervous to Unstoppable
          </h2>
        </motion.div>

        <div className="relative" style={{ height: "420px" }}>
          {/* Step 1 */}
          <motion.div
            className="absolute flex w-40 flex-col items-center text-center"
            style={{ left: "0%", top: "0px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0, duration: 0.5, ease: "easeOut" }}
          >
            <img
              src="/images/howitworks/opponent.png"
              alt=""
              aria-hidden="true"
              className="mb-4 h-20 w-auto"
            />
            <h3
              className="mb-2 text-base font-bold"
              style={{ color: "#2A2A20" }}
            >
              Create Your
              <br />
              Opponent
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#6B6B60" }}>
              Configure their talking points, style, and personality.
            </p>
          </motion.div>

          <motion.img
            src="/images/howitworks/leftline.png"
            alt=""
            aria-hidden="true"
            className="absolute"
            style={{ left: "12%", top: "40px", height: "90px", width: "140px" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          />

          {/* Step 2 */}
          <motion.div
            className="absolute flex w-40 flex-col items-center text-center"
            style={{ left: "24%", top: "100px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
          >
            <img
              src="/images/howitworks/research.png"
              alt=""
              aria-hidden="true"
              className="mb-4 h-20 w-auto"
            />
            <h3
              className="mb-2 text-base font-bold"
              style={{ color: "#2A2A20" }}
            >
              Do Your
              <br />
              Research
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#6B6B60" }}>
              Deep research gathers intel and generates strategy.
            </p>
          </motion.div>

          <motion.img
            src="/images/howitworks/middleline.png"
            alt=""
            aria-hidden="true"
            className="absolute"
            style={{
              left: "36%",
              top: "60px",
              height: "100px",
              width: "160px",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
          />

          {/* Step 3 */}
          <motion.div
            className="absolute flex w-40 flex-col items-center text-center"
            style={{ left: "50%", top: "0px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          >
            <img
              src="/images/howitworks/practice.png"
              alt=""
              aria-hidden="true"
              className="mb-4 h-20 w-auto"
            />
            <h3
              className="mb-2 text-base font-bold"
              style={{ color: "#2A2A20" }}
            >
              Practice
              <br />
              Debates
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#6B6B60" }}>
              Voice-based sparring with real-time feedback.
            </p>
          </motion.div>

          <motion.img
            src="/images/howitworks/rightline.png"
            alt=""
            aria-hidden="true"
            className="absolute"
            style={{ left: "62%", top: "40px", height: "90px", width: "140px" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.4 }}
          />

          {/* Step 4 */}
          <motion.div
            className="absolute flex w-40 flex-col items-center text-center"
            style={{ left: "76%", top: "100px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" }}
          >
            <img
              src="/images/howitworks/review.png"
              alt=""
              aria-hidden="true"
              className="mb-4 h-20 w-auto"
            />
            <h3
              className="mb-2 text-base font-bold"
              style={{ color: "#2A2A20" }}
            >
              Review &
              <br />
              Improve
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#6B6B60" }}>
              Detailed analysis shows what to fix.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
