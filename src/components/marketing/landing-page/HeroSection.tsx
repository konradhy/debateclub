import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/**
 * Hero section with background image, main headline, and CTAs.
 * Links to /login - authenticated users are redirected from there.
 */
export function HeroSection() {
  return (
    <section className="relative h-screen w-full">
      <img
        src="/images/1960by1040background.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex h-full w-full flex-col">
        <header className="flex w-full items-start justify-between p-4 sm:p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/blog" className="flex-shrink-0">
              <img
                src="/images/logotext.png"
                alt="DebateClub"
                className="h-10 sm:h-12 lg:h-14 w-auto"
              />
            </Link>
          </motion.div>

          <motion.a
            href="https://www.amazon.com/Win-Every-Argument-Debating-Persuading/dp/1250853478"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img
              src="/images/badgetopright.png"
              alt="Based on Mehdi Hasan's Win Every Argument"
              className="h-24 sm:h-32 lg:h-44 w-auto"
            />
          </motion.a>
        </header>

        <motion.main
          className="flex flex-1 flex-col items-start justify-center px-4 sm:px-8 lg:px-24"
          style={{ marginTop: "-5%" }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="mb-6 sm:mb-8 font-serif text-4xl sm:text-6xl lg:text-8xl font-semibold italic leading-none tracking-tight"
            style={{ color: "#3C4A32" }}
            variants={itemVariants}
          >
            Win Every Argument
          </motion.h1>

          <motion.p
            className="mb-8 sm:mb-12 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed"
            style={{ color: "#5A5D50" }}
            variants={itemVariants}
          >
            Practice debate with opponents that adapt to your skill level.
            <br />
            Get real-time feedback. Master 12 proven techniques.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto"
            variants={itemVariants}
          >
            <Link
              to="/login"
              className="inline-flex h-12 sm:h-14 items-center justify-center rounded-md px-8 sm:px-10 text-base sm:text-lg font-semibold text-white shadow-sm transition-all hover:brightness-110 active:scale-[0.98]"
              style={{ backgroundColor: "#5C6B4A" }}
            >
              Start Free Practice
            </Link>

            <button
              className="inline-flex h-12 sm:h-14 items-center justify-center rounded-md border bg-white/90 px-8 sm:px-10 text-base sm:text-lg font-medium shadow-sm transition-all hover:bg-white active:scale-[0.98]"
              style={{ borderColor: "#C5C5BD", color: "#5A5A5A" }}
            >
              Watch Demo
            </button>
          </motion.div>
        </motion.main>
      </div>
    </section>
  );
}
