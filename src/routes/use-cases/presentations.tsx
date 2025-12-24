import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Presentation,
  Users,
  HelpCircle,
  Shield,
  CheckCircle,
  XCircle,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/use-cases/presentations")({
  head: () => ({
    meta: [
      {
        title:
          "Practice Handling Tough Questions in Presentations | DebateClub",
      },
      {
        name: "description",
        content:
          "The Q&A is where presentations are won or lost. Practice handling skeptics, hostile questions, and curveballs before your next big presentation.",
      },
      {
        property: "og:title",
        content:
          "Practice Handling Tough Questions in Presentations | DebateClub",
      },
      {
        property: "og:description",
        content:
          "The Q&A is where presentations are won or lost. Practice handling skeptics, hostile questions, and curveballs before your next big presentation.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: PresentationsPage,
});

/**
 * Use case page: Presentations and Q&A handling.
 * Shows how DebateClub helps executives, managers, and professionals
 * practice handling tough questions after presentations.
 */
function PresentationsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F3EF" }}>
      {/* Header */}
      <header
        className="border-b py-6"
        style={{ backgroundColor: "#FAFAF8", borderColor: "#E8E4DA" }}
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between px-8">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
            style={{ color: "#5C5C54" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <Link to="/">
            <span className="text-xl font-bold" style={{ color: "#2A2A20" }}>
              DebateClub
            </span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ backgroundColor: "#3C4A32" }}
          >
            <Presentation className="h-8 w-8" style={{ color: "#C8D4B8" }} />
          </div>
          <h1
            className="mb-6 text-4xl font-bold lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Own the Q&A
          </h1>
          <p
            className="mx-auto max-w-2xl text-lg leading-relaxed"
            style={{ color: "#5C5C54" }}
          >
            Your slides were perfect. Your delivery was smooth. Then someone
            asked a question that unraveled everything. The Q&A is where
            presentations are won or lost. Practice it.
          </p>
        </motion.div>
      </section>

      {/* The Stakes */}
      <section style={{ backgroundColor: "#FAFAF8" }}>
        <div className="mx-auto max-w-4xl px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h2
              className="mb-8 text-2xl font-bold"
              style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
            >
              What Is Actually at Stake
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <Users className="mb-4 h-8 w-8" style={{ color: "#3C4A32" }} />
                <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                  Executive Presence
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  How you handle challenges in front of a room defines how
                  people see you. Confident responses signal leadership.
                </p>
              </div>
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <HelpCircle
                  className="mb-4 h-8 w-8"
                  style={{ color: "#3C4A32" }}
                />
                <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                  Project Buy-In
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Skeptics in the room can derail your initiative with one
                  unanswered question. Handle their concerns and you have
                  alignment.
                </p>
              </div>
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <Shield className="mb-4 h-8 w-8" style={{ color: "#3C4A32" }} />
                <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                  Career Moments
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Board presentations. All-hands meetings. Client pitches. These
                  are the moments that define careers.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Traditional Prep Fails */}
      <section className="mx-auto max-w-4xl px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2
            className="mb-8 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Why Traditional Presentation Prep Falls Short
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div
              className="flex items-start gap-4 rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <XCircle
                className="mt-1 h-5 w-5 flex-shrink-0"
                style={{ color: "#B8860B" }}
              />
              <div>
                <h3 className="mb-1 font-bold" style={{ color: "#2A2A20" }}>
                  Rehearsing your slides
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  You have the slides down. But slides do not ask hostile
                  questions. The Q&A is a different skill entirely.
                </p>
              </div>
            </div>
            <div
              className="flex items-start gap-4 rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <XCircle
                className="mt-1 h-5 w-5 flex-shrink-0"
                style={{ color: "#B8860B" }}
              />
              <div>
                <h3 className="mb-1 font-bold" style={{ color: "#2A2A20" }}>
                  FAQ preparation
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  You wrote down the expected questions and your answers. But
                  can you say them out loud under pressure?
                </p>
              </div>
            </div>
            <div
              className="flex items-start gap-4 rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <XCircle
                className="mt-1 h-5 w-5 flex-shrink-0"
                style={{ color: "#B8860B" }}
              />
              <div>
                <h3 className="mb-1 font-bold" style={{ color: "#2A2A20" }}>
                  Dry runs with colleagues
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Colleagues ask softball questions. They do not channel your
                  toughest stakeholder or the skeptic in the back row.
                </p>
              </div>
            </div>
            <div
              className="flex items-start gap-4 rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <XCircle
                className="mt-1 h-5 w-5 flex-shrink-0"
                style={{ color: "#B8860B" }}
              />
              <div>
                <h3 className="mb-1 font-bold" style={{ color: "#2A2A20" }}>
                  "I'll figure it out"
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Winging it works until it does not. The question you did not
                  anticipate is the one that derails you.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* The DebateClub Approach */}
      <section style={{ backgroundColor: "#3C4A32" }}>
        <div className="mx-auto max-w-4xl px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2
              className="mb-8 text-2xl font-bold"
              style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
            >
              The DebateClub Approach
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg font-bold"
                  style={{ backgroundColor: "#C8D4B8", color: "#3C4A32" }}
                >
                  1
                </div>
                <h3 className="mb-2 font-bold" style={{ color: "#FAFAF8" }}>
                  Describe Your Presentation
                </h3>
                <p className="text-sm" style={{ color: "#C8C8B8" }}>
                  What is the topic? Who is in the room? What are they skeptical
                  about? The AI adapts to your specific situation.
                </p>
              </div>
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg font-bold"
                  style={{ backgroundColor: "#C8D4B8", color: "#3C4A32" }}
                >
                  2
                </div>
                <h3 className="mb-2 font-bold" style={{ color: "#FAFAF8" }}>
                  Face the Tough Questions
                </h3>
                <p className="text-sm" style={{ color: "#C8C8B8" }}>
                  The AI plays the skeptic, the devil's advocate, the executive
                  who hates your idea. Handle them live.
                </p>
              </div>
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg font-bold"
                  style={{ backgroundColor: "#C8D4B8", color: "#3C4A32" }}
                >
                  3
                </div>
                <h3 className="mb-2 font-bold" style={{ color: "#FAFAF8" }}>
                  Refine Your Responses
                </h3>
                <p className="text-sm" style={{ color: "#C8C8B8" }}>
                  See which answers landed and which fumbled. Get rewritten
                  versions of your weaker moments.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Question Types */}
      <section className="mx-auto max-w-4xl px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2
            className="mb-8 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Question Types You Will Handle
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                The Skeptic
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                "What evidence do you have that this will actually work?" Handle
                demands for proof without getting defensive.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                The "What If"
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                "What if the market shifts?" "What if we lose key people?"
                Demonstrate you have thought through contingencies.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                The Hostile Question
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                "Last time we tried this it failed. Why should this be
                different?" Stay composed when someone wants to see you stumble.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                The Curveball
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Questions from left field that you did not anticipate. Practice
                buying time and redirecting gracefully.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                "I Don't Know"
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Sometimes you genuinely do not know. Practice saying it
                confidently and pivoting to what you do know.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                The Loaded Question
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                "So you're saying we should ignore the risks?" Reframe false
                premises without taking the bait.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Techniques That Matter */}
      <section style={{ backgroundColor: "#FAFAF8" }}>
        <div className="mx-auto max-w-4xl px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h2
              className="mb-4 text-2xl font-bold"
              style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
            >
              Techniques That Command Rooms
            </h2>
            <p className="mb-8" style={{ color: "#5C5C54" }}>
              From the 12 core techniques, these four matter most in Q&A:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                to="/blog/flip-their-momentum"
                className="flex items-start gap-4 rounded-xl p-5 transition-shadow hover:shadow-lg"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <Zap
                  className="mt-1 h-5 w-5 flex-shrink-0"
                  style={{ color: "#3C4A32" }}
                />
                <div>
                  <h3 className="mb-1 font-bold" style={{ color: "#2A2A20" }}>
                    Flip Their Momentum
                  </h3>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    "That's a fair concern. Here's how we've addressed it..."
                    Acknowledge then redirect.
                  </p>
                </div>
              </Link>
              <Link
                to="/blog/defuse-with-humor"
                className="flex items-start gap-4 rounded-xl p-5 transition-shadow hover:shadow-lg"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <Zap
                  className="mt-1 h-5 w-5 flex-shrink-0"
                  style={{ color: "#3C4A32" }}
                />
                <div>
                  <h3 className="mb-1 font-bold" style={{ color: "#2A2A20" }}>
                    Defuse with Humor
                  </h3>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    A well-timed quip can release tension and win the room. Know
                    when and how to use it.
                  </p>
                </div>
              </Link>
              <Link
                to="/blog/back-it-up"
                className="flex items-start gap-4 rounded-xl p-5 transition-shadow hover:shadow-lg"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <Zap
                  className="mt-1 h-5 w-5 flex-shrink-0"
                  style={{ color: "#3C4A32" }}
                />
                <div>
                  <h3 className="mb-1 font-bold" style={{ color: "#2A2A20" }}>
                    Back It Up
                  </h3>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    When challenged, have specific data ready. "Actually, the
                    research shows..." shuts down skeptics.
                  </p>
                </div>
              </Link>
              <Link
                to="/blog/make-it-stick"
                className="flex items-start gap-4 rounded-xl p-5 transition-shadow hover:shadow-lg"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <Zap
                  className="mt-1 h-5 w-5 flex-shrink-0"
                  style={{ color: "#3C4A32" }}
                />
                <div>
                  <h3 className="mb-1 font-bold" style={{ color: "#2A2A20" }}>
                    Make It Stick
                  </h3>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    Structure answers in threes. "Three reasons this will
                    work..." sticks in memory.
                  </p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Before/After */}
      <section className="mx-auto max-w-4xl px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2
            className="mb-8 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Before and After Practice
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: "#FFF5F5" }}
            >
              <h3 className="mb-4 font-bold" style={{ color: "#7C2D2D" }}>
                Before: Dreading the Q&A
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
                <li className="flex items-start gap-2">
                  <XCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#DC2626" }}
                  />
                  Rush through slides hoping for no questions
                </li>
                <li className="flex items-start gap-2">
                  <XCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#DC2626" }}
                  />
                  Ramble when challenged
                </li>
                <li className="flex items-start gap-2">
                  <XCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#DC2626" }}
                  />
                  Get flustered by hostile questions
                </li>
                <li className="flex items-start gap-2">
                  <XCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#DC2626" }}
                  />
                  Leave feeling like you lost the room
                </li>
              </ul>
            </div>
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: "#F0FDF4" }}
            >
              <h3 className="mb-4 font-bold" style={{ color: "#166534" }}>
                After: Welcoming Questions
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#16A34A" }}
                  />
                  Invite questions confidently
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#16A34A" }}
                  />
                  Structured answers that land
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#16A34A" }}
                  />
                  Stay composed under fire
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#16A34A" }}
                  />
                  Leave with buy-in and respect
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#3C4A32" }}>
        <div className="mx-auto max-w-4xl px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <h2
              className="mb-4 text-3xl font-bold"
              style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
            >
              Your Next Presentation Is Coming
            </h2>
            <p className="mb-8" style={{ color: "#C8C8B8" }}>
              Describe your audience. Face their toughest questions. Walk in
              ready.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold transition-all hover:gap-3"
              style={{ backgroundColor: "#FAFAF8", color: "#3C4A32" }}
            >
              Start Practicing Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

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
