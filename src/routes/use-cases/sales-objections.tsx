import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  DollarSign,
  Target,
  TrendingUp,
  CheckCircle,
  XCircle,
  Zap,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/use-cases/sales-objections")({
  head: () => ({
    meta: [
      { title: "Practice Sales Objection Handling | DebateClub" },
      {
        name: "description",
        content:
          "Handle 'too expensive,' 'need to think about it,' and 'send me info' like a pro. Practice with AI prospects that push back. Close more deals.",
      },
      {
        property: "og:title",
        content: "Practice Sales Objection Handling | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Handle 'too expensive,' 'need to think about it,' and 'send me info' like a pro. Practice with AI prospects that push back. Close more deals.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: SalesObjectionsPage,
});

/**
 * Use case page: Sales objection handling and negotiation.
 * Shows how DebateClub helps salespeople, founders, and consultants
 * practice handling objections and closing deals.
 */
function SalesObjectionsPage() {
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
            <DollarSign className="h-8 w-8" style={{ color: "#C8D4B8" }} />
          </div>
          <h1
            className="mb-6 text-4xl font-bold lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Handle Any Sales Objection
          </h1>
          <p
            className="mx-auto max-w-2xl text-lg leading-relaxed"
            style={{ color: "#5C5C54" }}
          >
            "Too expensive." "Need to think about it." "Send me some info." You
            have heard them all. Now practice handling them until your response
            is automatic.
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
                <TrendingUp
                  className="mb-4 h-8 w-8"
                  style={{ color: "#3C4A32" }}
                />
                <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                  Close Rate
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  A 10% improvement in objection handling can double your close
                  rate. Every rep who freezes on "too expensive" is leaving
                  money on the table.
                </p>
              </div>
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <Target className="mb-4 h-8 w-8" style={{ color: "#3C4A32" }} />
                <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                  Deal Size
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Discounting is often a failure of persuasion. Hold your price
                  by reframing value instead of caving.
                </p>
              </div>
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <ShieldCheck
                  className="mb-4 h-8 w-8"
                  style={{ color: "#3C4A32" }}
                />
                <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                  Confidence
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Prospects smell fear. When you have practiced every objection,
                  you project the confidence that closes deals.
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
            Why Traditional Sales Training Falls Short
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
                  Role-plays at team meetings
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Awkward, in front of colleagues, and you only get a few reps.
                  Not enough to build muscle memory.
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
                  Objection handling scripts
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Reading a script is not speaking one. When the prospect goes
                  off-script, you are on your own.
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
                  Call recording review
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Great for seeing what went wrong. Terrible for practicing what
                  to do right. You need reps, not replays.
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
                  Learning on live deals
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Expensive way to learn. Every botched objection is a lost
                  deal. Practice should happen before the call.
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
                  Pick Your Objection
                </h3>
                <p className="text-sm" style={{ color: "#C8C8B8" }}>
                  Price? Timing? Competitor? Set up the exact objection you
                  struggle with. The AI prospect will hit you with it.
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
                  Handle It Live
                </h3>
                <p className="text-sm" style={{ color: "#C8C8B8" }}>
                  Voice-based practice. The AI does not accept weak responses.
                  It follows up, pushes back, and tests your reframes.
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
                  Iterate Until Automatic
                </h3>
                <p className="text-sm" style={{ color: "#C8C8B8" }}>
                  Get scored. See the rewrite. Practice again. By rep 10, your
                  response is instinct.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Common Objections */}
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
            Objections You Will Master
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                "It's too expensive"
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Reframe from price to value. Quantify the cost of the problem
                they are not solving.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                "I need to think about it"
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Surface the real concern. "What specifically are you weighing?"
                turns delay into dialogue.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                "Send me some info"
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                A polite brush-off. Redirect to what would make the info useful.
                Book the follow-up before hanging up.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                "We're using [Competitor]"
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Respect the current choice. Find the gap they wish was filled.
                Position as complement or replacement.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                "Now's not the right time"
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Validate the timing concern. Quantify what waiting costs. Make
                starting easy.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                "I need to check with my [boss/partner]"
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Arm your champion. "What do they care most about?" Give them the
                ammunition to sell internally.
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
              Techniques That Close Deals
            </h2>
            <p className="mb-8" style={{ color: "#5C5C54" }}>
              From the 12 core techniques, these four matter most in sales:
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
                    "You're right, it is an investment. That's exactly why..."
                    Concede, then redirect.
                  </p>
                </div>
              </Link>
              <Link
                to="/blog/ask-the-killer-question"
                className="flex items-start gap-4 rounded-xl p-5 transition-shadow hover:shadow-lg"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <Zap
                  className="mt-1 h-5 w-5 flex-shrink-0"
                  style={{ color: "#3C4A32" }}
                />
                <div>
                  <h3 className="mb-1 font-bold" style={{ color: "#2A2A20" }}>
                    Ask the Killer Question
                  </h3>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    "What happens if you do nothing for another quarter?"
                    Questions that make prospects sell themselves.
                  </p>
                </div>
              </Link>
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
                    People buy on emotion, justify with logic. Paint the picture
                    of life after the problem is solved.
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
                    "Companies like yours see 3x ROI in 6 months." Specific
                    receipts beat vague promises.
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
                Before: Reacting
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
                <li className="flex items-start gap-2">
                  <XCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#DC2626" }}
                  />
                  Discount immediately when price comes up
                </li>
                <li className="flex items-start gap-2">
                  <XCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#DC2626" }}
                  />
                  Accept "let me think about it" at face value
                </li>
                <li className="flex items-start gap-2">
                  <XCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#DC2626" }}
                  />
                  Lose deals to competitors without knowing why
                </li>
                <li className="flex items-start gap-2">
                  <XCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#DC2626" }}
                  />
                  Feel the "no" before you hear it
                </li>
              </ul>
            </div>
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: "#F0FDF4" }}
            >
              <h3 className="mb-4 font-bold" style={{ color: "#166534" }}>
                After: Responding
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#16A34A" }}
                  />
                  Reframe price as investment with practiced language
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#16A34A" }}
                  />
                  Surface real concerns with killer questions
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#16A34A" }}
                  />
                  Handle competitive objections with confidence
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#16A34A" }}
                  />
                  Stay composed because you have done this 50 times
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
              Your Pipeline Is Waiting
            </h2>
            <p className="mb-8" style={{ color: "#C8C8B8" }}>
              Pick your toughest objection. Practice until it is automatic.
              Close more deals this quarter.
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
