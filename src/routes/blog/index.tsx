import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { techniques } from "@/components/marketing/landing-page/data";
import {
  ArrowLeft,
  ArrowRight,
  Feather,
  BookOpen,
  ChevronDown,
  ChevronUp,
  MoveRight,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "12 Debate Techniques to Win Any Argument | DebateClub" },
      {
        name: "description",
        content:
          "Evidence timing, emotional appeals, killer questions, handling Gish Gallops. Deep guides on every technique from Mehdi Hasan's Win Every Argument.",
      },
      {
        property: "og:title",
        content: "12 Debate Techniques to Win Any Argument | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Evidence timing, emotional appeals, killer questions, handling Gish Gallops. Deep guides on every technique from Mehdi Hasan's Win Every Argument.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: BlogIndex,
});

/**
 * Blog index page listing featured articles and technique guides.
 */
function BlogIndex() {
  const [showAllUseCases, setShowAllUseCases] = useState(false);
  const [showAllTechniques, setShowAllTechniques] = useState(false);

  const useCases = [
    {
      to: "/use-cases/job-interviews",
      title: "Job Interviews",
      desc: "Behavioral questions and salary negotiation",
      accent: "#7B8A6F",
    },
    {
      to: "/use-cases/sales-objections",
      title: "Sales",
      desc: "Handle objections, close more deals",
      accent: "#8A7B6F",
    },
    {
      to: "/use-cases/presentations",
      title: "Presentations",
      desc: "Own the Q&A, command the room",
      accent: "#6F7B8A",
    },
    {
      to: "/use-cases/difficult-conversations",
      title: "Tough Talks",
      desc: "Performance reviews, conflict resolution",
      accent: "#8A6F7B",
    },
    {
      to: "/use-cases/pitching-fundraising",
      title: "Fundraising",
      desc: "Investor pitches, VC meetings",
      accent: "#7B8A6F",
    },
    {
      to: "/use-cases/attorneys-legal",
      title: "Legal",
      desc: "Courtroom, depositions, cross-examination",
      accent: "#8A7B6F",
    },
    {
      to: "/use-cases/politicians-activists",
      title: "Politics",
      desc: "Town halls, media, policy debates",
      accent: "#6F7B8A",
    },
    {
      to: "/use-cases/academics-researchers",
      title: "Academia",
      desc: "Thesis defense, conference Q&A",
      accent: "#8A6F7B",
    },
    {
      to: "/use-cases/parents-educators",
      title: "Parenting",
      desc: "Connect with kids and students",
      accent: "#7B8A6F",
    },
    {
      to: "/use-cases/healthcare-professionals",
      title: "Healthcare",
      desc: "Patient conversations, family meetings",
      accent: "#8A7B6F",
    },
  ];

  const displayedUseCases = showAllUseCases ? useCases : useCases.slice(0, 6);
  const displayedTechniques = showAllTechniques
    ? techniques
    : techniques.slice(0, 6);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F3EF" }}>
      {/* Header */}
      <header
        className="border-b py-6"
        style={{ backgroundColor: "#FAFAF8", borderColor: "#E8E4DA" }}
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between px-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
            style={{ color: "#5C5C54" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <span className="text-xl font-bold" style={{ color: "#2A2A20" }}>
            DebateClub
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-8 py-16">
        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="mb-4 text-sm font-medium" style={{ color: "#888880" }}>
            Featured
          </p>
          <Link
            to="/blog/the-crossed-quills"
            className="group block overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl"
            style={{
              backgroundColor: "#3C4A32",
              boxShadow: "0 4px 20px rgba(60, 74, 50, 0.15)",
            }}
          >
            <div className="flex items-center gap-8 p-8">
              <div
                className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <Feather
                  className="h-12 w-12 transition-transform group-hover:rotate-12"
                  style={{ color: "#C8D4B8" }}
                />
              </div>
              <div className="flex-1">
                <span
                  className="mb-2 inline-block rounded-md px-3 py-1 text-xs font-medium"
                  style={{ backgroundColor: "#E8DFC8", color: "#5C5444" }}
                >
                  Behind the Brand
                </span>
                <h2
                  className="mb-2 text-2xl font-bold lg:text-3xl"
                  style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
                >
                  The Crossed Quills: A Symbol for the Art of Argument
                </h2>
                <p
                  className="text-sm leading-relaxed lg:text-base"
                  style={{ color: "#C8C8B8" }}
                >
                  Every symbol tells a story. Discover the meaning behind the
                  DebateClub logo and its connection to 2,500 years of rhetoric.
                </p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Blueprint Series Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-16"
        >
          <p className="mb-4 text-sm font-medium" style={{ color: "#888880" }}>
            New Series
          </p>
          <div
            className="overflow-hidden rounded-2xl"
            style={{
              backgroundColor: "#2A2A20",
              boxShadow: "0 4px 20px rgba(42, 42, 32, 0.2)",
            }}
          >
            <div className="p-8">
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "#3C4A32" }}
                >
                  <BookOpen className="h-6 w-6" style={{ color: "#C8D4B8" }} />
                </div>
                <div>
                  <h2
                    className="text-2xl font-bold lg:text-3xl"
                    style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
                  >
                    16 Chapters, 1 Platform
                  </h2>
                  <p className="text-sm" style={{ color: "#C8C8B8" }}>
                    The DebateClub Blueprint
                  </p>
                </div>
              </div>
              <p
                className="mb-8 max-w-2xl leading-relaxed"
                style={{ color: "#A8A898" }}
              >
                How we turned every chapter of Mehdi Hasan's "Win Every
                Argument" into an AI-powered debate coach. A 3-part deep dive
                into the system.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <Link
                  to="/blog/blueprint-part-1"
                  className="group rounded-xl p-5 transition-all hover:bg-white/10"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <p
                    className="mb-1 text-xs font-medium"
                    style={{ color: "#9A9A6D" }}
                  >
                    Part 1
                  </p>
                  <h3 className="mb-2 font-bold" style={{ color: "#FAFAF8" }}>
                    Before You Speak
                  </h3>
                  <p className="mb-3 text-sm" style={{ color: "#A8A898" }}>
                    Research, preparation, and the Strategic Brief pattern
                  </p>
                  <span
                    className="inline-flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2"
                    style={{ color: "#9A9A6D" }}
                  >
                    Read <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
                <Link
                  to="/blog/blueprint-part-2"
                  className="group rounded-xl p-5 transition-all hover:bg-white/10"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <p
                    className="mb-1 text-xs font-medium"
                    style={{ color: "#9A9A6D" }}
                  >
                    Part 2
                  </p>
                  <h3 className="mb-2 font-bold" style={{ color: "#FAFAF8" }}>
                    In the Arena
                  </h3>
                  <p className="mb-3 text-sm" style={{ color: "#A8A898" }}>
                    Live debate, technique detection, and composure testing
                  </p>
                  <span
                    className="inline-flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2"
                    style={{ color: "#9A9A6D" }}
                  >
                    Read <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
                <Link
                  to="/blog/blueprint-part-3"
                  className="group rounded-xl p-5 transition-all hover:bg-white/10"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <p
                    className="mb-1 text-xs font-medium"
                    style={{ color: "#9A9A6D" }}
                  >
                    Part 3
                  </p>
                  <h3 className="mb-2 font-bold" style={{ color: "#FAFAF8" }}>
                    After the Dust Settles
                  </h3>
                  <p className="mb-3 text-sm" style={{ color: "#A8A898" }}>
                    Mehdi Hasan Scores, analysis, and continuous improvement
                  </p>
                  <span
                    className="inline-flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2"
                    style={{ color: "#9A9A6D" }}
                  >
                    Read <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Who It's For Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <p className="mb-4 text-sm font-medium" style={{ color: "#888880" }}>
            Use Cases
          </p>
          <h2
            className="mb-4 text-3xl font-bold lg:text-4xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Who It's For
          </h2>
          <p className="mb-8 text-lg" style={{ color: "#5C5C54" }}>
            Real-world scenarios where DebateClub helps you prepare, practice,
            and perform.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayedUseCases.map((useCase, index) => (
              <Link
                key={useCase.to}
                to={useCase.to}
                className="group relative block overflow-hidden rounded-lg border-t-3 p-5 transition-all duration-200 hover:shadow-lg"
                style={{
                  backgroundColor: "#FAFAF8",
                  borderTopWidth: "3px",
                  borderTopColor: useCase.accent,
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: useCase.accent }}
                  />
                  <MoveRight
                    className="h-4 w-4 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    style={{
                      color: useCase.accent,
                      transform: "translateX(-8px)",
                    }}
                  />
                </div>
                <h3
                  className="mb-2 text-base font-bold transition-colors"
                  style={{ color: "#2A2A20" }}
                >
                  {useCase.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#5C5C54" }}>
                  {useCase.desc}
                </p>
              </Link>
            ))}
          </div>
          {useCases.length > 6 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowAllUseCases(!showAllUseCases)}
                className="flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200 hover:shadow-md"
                style={{
                  backgroundColor: "#FAFAF8",
                  color: "#2A2A20",
                  border: "1px solid #E8E4DA",
                }}
              >
                {showAllUseCases ? (
                  <>
                    Show Less <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Show All {useCases.length} Use Cases{" "}
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>

        {/* Technique Library Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <h2
            className="mb-4 text-3xl font-bold lg:text-4xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Technique Library
          </h2>
          <p className="mb-12 text-lg" style={{ color: "#5C5C54" }}>
            Deep dives into the 12 debate techniques from Mehdi Hasan's "Win
            Every Argument" and how DebateClub helps you master each one.
          </p>
        </motion.div>

        {/* Article Grid */}
        <div className="grid grid-cols-2 gap-6">
          {displayedTechniques.map((technique, index) => (
            <motion.div
              key={technique.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link
                to={`/blog/${technique.id}`}
                className="block rounded-xl border-l-4 p-6 transition-all duration-200 hover:shadow-lg"
                style={{
                  backgroundColor: "#FAFAF8",
                  borderLeftColor: "#9A9A6D",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                }}
              >
                <span
                  className="mb-2 inline-block rounded-md px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: technique.badgeColor,
                    color: technique.badgeTextColor,
                  }}
                >
                  {technique.badge}
                </span>
                <h2
                  className="mb-2 text-xl font-bold"
                  style={{ color: "#2A2A20" }}
                >
                  {technique.title}
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#5C5C54" }}
                >
                  {technique.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {techniques.length > 6 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAllTechniques(!showAllTechniques)}
              className="flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200 hover:shadow-md"
              style={{
                backgroundColor: "#FAFAF8",
                color: "#2A2A20",
                border: "1px solid #E8E4DA",
              }}
            >
              {showAllTechniques ? (
                <>
                  Show Less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show All {techniques.length} Techniques{" "}
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: "#E8E4DA" }}>
        <div className="mx-auto max-w-4xl px-8 text-center">
          <p className="text-sm" style={{ color: "#5C5C54" }}>
            © {new Date().getFullYear()} DebateClub. Based on{" "}
            <Link
              to="/win-every-argument"
              className="underline transition-opacity hover:opacity-70"
            >
              "Win Every Argument"
            </Link>{" "}
            by Mehdi Hasan.
          </p>
        </div>
      </footer>
    </div>
  );
}
