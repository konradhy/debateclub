import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useConvexAuth } from "@convex-dev/react-query";
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
 */
export function HeroSection() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <section className="relative h-screen w-full">
      <img
        src="/images/1960by1064background.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex h-full w-full flex-col">
        <header className="flex w-full items-start justify-between p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/blog" className="flex-shrink-0">
              <img
                src="/images/logotext.png"
                alt="DebateClub"
                className="h-12 w-auto lg:h-14"
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
              className="h-32 w-auto lg:h-44"
            />
          </motion.a>
        </header>

        <motion.main
          className="flex flex-1 flex-col items-start justify-center px-8 lg:px-24"
          style={{ marginTop: "-5%" }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="mb-8 font-serif text-6xl font-semibold italic leading-none tracking-tight lg:text-8xl"
            style={{ color: "#3C4A32" }}
            variants={itemVariants}
          >
            Win Every Argument
          </motion.h1>

          <motion.p
            className="mb-12 max-w-2xl text-lg leading-relaxed lg:text-xl"
            style={{ color: "#5A5D50" }}
            variants={itemVariants}
          >
            Practice debate with opponents that adapt to your skill level.
            <br />
            Get real-time feedback. Master 12 proven techniques.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-5"
            variants={itemVariants}
          >
            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              className="inline-flex h-14 items-center justify-center rounded-md px-10 text-lg font-semibold text-white shadow-sm transition-all hover:brightness-110 active:scale-[0.98]"
              style={{ backgroundColor: "#5C6B4A" }}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Start Free Practice"
              )}
            </Link>

            <button
              className="inline-flex h-14 items-center justify-center rounded-md border bg-white/90 px-10 text-lg font-medium shadow-sm transition-all hover:bg-white active:scale-[0.98]"
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
