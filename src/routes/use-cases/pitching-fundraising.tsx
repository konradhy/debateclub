import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Rocket,
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/use-cases/pitching-fundraising")({
  head: () => ({
    meta: [
      { title: "Practice Your Investor Pitch | DebateClub" },
      {
        name: "description",
        content:
          "VCs ask hard questions. Practice your pitch, handle objections about market size, team, and traction. Walk into the room ready.",
      },
      {
        property: "og:title",
        content: "Practice Your Investor Pitch | DebateClub",
      },
      {
        property: "og:description",
        content:
          "VCs ask hard questions. Practice your pitch, handle objections about market size, team, and traction. Walk into the room ready.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: PitchingFundraisingPage,
});

/**
 * Use case page: Pitching and fundraising.
 * Shows how DebateClub helps founders practice investor pitches,
 * board presentations, and handling tough VC questions.
 */
function PitchingFundraisingPage() {
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
            <Rocket className="h-8 w-8" style={{ color: "#C8D4B8" }} />
          </div>
          <h1
            className="mb-6 text-4xl font-bold lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Nail Your Investor Pitch
          </h1>
          <p
            className="mx-auto max-w-2xl text-lg leading-relaxed"
            style={{ color: "#5C5C54" }}
          >
            VCs have seen thousands of pitches. They will find every hole in
            your story. Practice handling their questions before you are in the
            room.
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
                <DollarSign
                  className="mb-4 h-8 w-8"
                  style={{ color: "#3C4A32" }}
                />
                <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                  Millions in Funding
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  One pitch can mean the difference between building your vision
                  and running out of runway. The stakes could not be higher.
                </p>
              </div>
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <Users className="mb-4 h-8 w-8" style={{ color: "#3C4A32" }} />
                <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                  Limited Shots
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  There are only so many relevant VCs. A bad first impression
                  closes doors. You need to be ready before you walk in.
                </p>
              </div>
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <TrendingUp
                  className="mb-4 h-8 w-8"
                  style={{ color: "#3C4A32" }}
                />
                <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                  Valuation Impact
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Confident founders get better terms. How you handle hard
                  questions directly affects your cap table.
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
            Why Traditional Pitch Prep Falls Short
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
                  Perfecting your deck
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Your slides are beautiful. But VCs interrupt on slide 3. Can
                  you handle that?
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
                  Pitching to your co-founders
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  They already believe. They do not ask "Why won't Google just
                  build this?"
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
                  Demo day practice
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Great for the 3-minute pitch. Does not prepare you for the
                  30-minute partner meeting.
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
                  Advisor feedback
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Helpful for deck structure. But advisors do not grill you like
                  a skeptical GP.
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
                  Set Up Your Pitch
                </h3>
                <p className="text-sm" style={{ color: "#C8C8B8" }}>
                  What is your company? What stage? What are your known
                  weaknesses? The AI investor adapts.
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
                  Face the Hard Questions
                </h3>
                <p className="text-sm" style={{ color: "#C8C8B8" }}>
                  "Why you?" "Why now?" "What if Amazon enters?" Handle the
                  questions that make founders sweat.
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
                  Sharpen Your Answers
                </h3>
                <p className="text-sm" style={{ color: "#C8C8B8" }}>
                  See where you rambled. Get tighter versions. Practice until
                  your answers are crisp and confident.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VC Questions */}
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
            Questions VCs Will Ask
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                "Why will you win?"
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Your moat. Your unfair advantage. Why competitors will not catch
                up. Have a crisp answer.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                "What if [BigCo] builds this?"
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Google, Amazon, Microsoft. They will ask about all of them. Have
                a reason why you will still win.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                "Your numbers seem aggressive"
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Defend your projections. Show the assumptions. Be realistic
                without being defeatist.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                "Why are you the team to do this?"
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Your background, your insight, your obsession. Why you will
                outwork everyone else.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                "What keeps you up at night?"
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Show self-awareness. Acknowledge risks. Then explain your plan
                to mitigate them.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                "Why this valuation?"
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Justify your ask. Comparables, milestones, what you will achieve
                with the capital.
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
              Techniques That Close Rounds
            </h2>
            <p className="mb-8" style={{ color: "#5C5C54" }}>
              From the 12 core techniques, these four matter most for founders:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                to="/blog/strike-emotional-chord"
                className="flex items-start gap-4 rounded-xl p-5 transition-shadow hover:shadow-lg"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <Zap
                  className="mt-1 h-5 w-5 flex-shrink-0"
                  style={{ color: "#3C4A32" }}
                />
                <div>
                  <h3 className="mb-1 font-bold" style={{ color: "#2A2A20" }}>
                    Strike an Emotional Chord
                  </h3>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    Your origin story. Why this problem keeps you up at night.
                    Make them feel your conviction.
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
                    Metrics, customer quotes, market data. Have receipts ready
                    for every claim you make.
                  </p>
                </div>
              </Link>
              <Link
                to="/blog/own-your-weaknesses"
                className="flex items-start gap-4 rounded-xl p-5 transition-shadow hover:shadow-lg"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <Zap
                  className="mt-1 h-5 w-5 flex-shrink-0"
                  style={{ color: "#3C4A32" }}
                />
                <div>
                  <h3 className="mb-1 font-bold" style={{ color: "#2A2A20" }}>
                    Own Your Weaknesses
                  </h3>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    "Yes, we're early. Here's why that's exactly the right time
                    to invest..."
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
                    Three reasons to invest. Three metrics that matter. Triads
                    that partners remember in the debrief.
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
                Before: Hoping for the Best
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
                <li className="flex items-start gap-2">
                  <XCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#DC2626" }}
                  />
                  Ramble when interrupted
                </li>
                <li className="flex items-start gap-2">
                  <XCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#DC2626" }}
                  />
                  Get defensive on hard questions
                </li>
                <li className="flex items-start gap-2">
                  <XCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#DC2626" }}
                  />
                  Leave uncertain how it went
                </li>
                <li className="flex items-start gap-2">
                  <XCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#DC2626" }}
                  />
                  Hear "we'll get back to you"
                </li>
              </ul>
            </div>
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: "#F0FDF4" }}
            >
              <h3 className="mb-4 font-bold" style={{ color: "#166534" }}>
                After: Walking in Ready
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#16A34A" }}
                  />
                  Handle interruptions smoothly
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#16A34A" }}
                  />
                  Welcome hard questions as opportunities
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#16A34A" }}
                  />
                  Leave knowing you nailed it
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#16A34A" }}
                  />
                  Move to next steps
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
              Your Fundraise Is Too Important to Wing
            </h2>
            <p className="mb-8" style={{ color: "#C8C8B8" }}>
              Set up your pitch. Face the hard questions. Walk in ready.
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
