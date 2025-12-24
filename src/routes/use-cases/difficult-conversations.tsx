import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Heart,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/use-cases/difficult-conversations")({
  head: () => ({
    meta: [
      { title: "Practice Difficult Conversations at Work | DebateClub" },
      {
        name: "description",
        content:
          "Performance reviews, conflict resolution, asking for a raise. Practice the conversations you've been avoiding until you're ready to have them.",
      },
      {
        property: "og:title",
        content: "Practice Difficult Conversations at Work | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Performance reviews, conflict resolution, asking for a raise. Practice the conversations you've been avoiding until you're ready to have them.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: DifficultConversationsPage,
});

/**
 * Use case page: Difficult workplace conversations.
 * Shows how DebateClub helps managers, HR, and professionals
 * practice performance reviews, conflict resolution, and tough talks.
 */
function DifficultConversationsPage() {
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
            <MessageCircle className="h-8 w-8" style={{ color: "#C8D4B8" }} />
          </div>
          <h1
            className="mb-6 text-4xl font-bold lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Have the Conversation You Have Been Avoiding
          </h1>
          <p
            className="mx-auto max-w-2xl text-lg leading-relaxed"
            style={{ color: "#5C5C54" }}
          >
            You know you need to have it. You have been putting it off for
            weeks. The longer you wait, the harder it gets. Practice it first,
            then have it for real.
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
                <Heart className="mb-4 h-8 w-8" style={{ color: "#3C4A32" }} />
                <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                  Relationships
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Unspoken issues fester. Resentment builds. A conversation
                  handled well can save a relationship. Handled poorly, it ends
                  one.
                </p>
              </div>
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <AlertTriangle
                  className="mb-4 h-8 w-8"
                  style={{ color: "#3C4A32" }}
                />
                <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                  Team Performance
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  The underperformer everyone ignores drags down the whole team.
                  Addressing it early is a kindness to everyone.
                </p>
              </div>
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <Shield className="mb-4 h-8 w-8" style={{ color: "#3C4A32" }} />
                <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                  Your Peace of Mind
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Avoiding the conversation does not make it go away. It just
                  takes up mental space until you deal with it.
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
            Why Traditional Approaches Fail
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
                  Scripting what you will say
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  You write it down, but the other person does not follow your
                  script. When they push back, you are unprepared.
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
                  Rehearsing in your head
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Mental rehearsal helps, but it is not the same as saying the
                  words out loud under pressure.
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
                  Asking a friend to role-play
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Friends do not get angry. They do not cry. They do not respond
                  the way the actual person will.
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
                  Just winging it
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Emotions run high. You say something you regret. The
                  conversation derails. Now you have a bigger problem.
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
                  Describe the Situation
                </h3>
                <p className="text-sm" style={{ color: "#C8C8B8" }}>
                  What is the conversation? Who is the other person? What is
                  their likely reaction? The AI becomes them.
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
                  Have the Conversation
                </h3>
                <p className="text-sm" style={{ color: "#C8C8B8" }}>
                  Say what you need to say. The AI responds as the other person
                  would. Handle their defensiveness, their questions, their
                  emotions.
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
                  Refine Your Approach
                </h3>
                <p className="text-sm" style={{ color: "#C8C8B8" }}>
                  See where you lost them. Get suggestions for better phrasing.
                  Try again until it feels natural.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Conversation Types */}
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
            Conversations You Can Practice
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                Performance Feedback
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                "Your work has been slipping. Here's what I need to see..." Be
                direct without being cruel. Set expectations clearly.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                Asking for a Raise
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                "Based on my contributions, I'd like to discuss my
                compensation..." State your case confidently. Handle pushback.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                Conflict Resolution
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                "I want to address what happened in the meeting..." Navigate
                disagreements without escalation.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                Setting Boundaries
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                "I can't take on that project..." Say no without damaging the
                relationship.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                Delivering Bad News
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                "The project is being cancelled..." Be honest and empathetic.
                Handle the emotional response.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                Resigning Gracefully
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                "I've decided to move on..." Leave on good terms. Handle
                counteroffers and emotional reactions.
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
              Techniques for Difficult Conversations
            </h2>
            <p className="mb-8" style={{ color: "#5C5C54" }}>
              From the 12 core techniques, these four matter most here:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                to="/blog/read-any-room"
                className="flex items-start gap-4 rounded-xl p-5 transition-shadow hover:shadow-lg"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <Zap
                  className="mt-1 h-5 w-5 flex-shrink-0"
                  style={{ color: "#3C4A32" }}
                />
                <div>
                  <h3 className="mb-1 font-bold" style={{ color: "#2A2A20" }}>
                    Read Any Room
                  </h3>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    Sense when they are shutting down. Adjust your approach in
                    real time.
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
                    Connect before you correct. Show you care before you
                    critique.
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
                    Acknowledge your part in the problem first. Disarm
                    defensiveness.
                  </p>
                </div>
              </Link>
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
                    "You're right that communication has been an issue. That's
                    exactly why I wanted to talk..."
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
                Before: Avoiding
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
                <li className="flex items-start gap-2">
                  <XCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#DC2626" }}
                  />
                  Keep putting it off
                </li>
                <li className="flex items-start gap-2">
                  <XCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#DC2626" }}
                  />
                  Lose sleep thinking about it
                </li>
                <li className="flex items-start gap-2">
                  <XCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#DC2626" }}
                  />
                  Say the wrong thing in the moment
                </li>
                <li className="flex items-start gap-2">
                  <XCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#DC2626" }}
                  />
                  Make the situation worse
                </li>
              </ul>
            </div>
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: "#F0FDF4" }}
            >
              <h3 className="mb-4 font-bold" style={{ color: "#166534" }}>
                After: Addressing
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#16A34A" }}
                  />
                  Schedule it and do it
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#16A34A" }}
                  />
                  Walk in with practiced language
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#16A34A" }}
                  />
                  Stay composed when they react
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    className="mt-0.5 h-4 w-4"
                    style={{ color: "#16A34A" }}
                  />
                  Reach resolution
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
              Stop Avoiding. Start Practicing.
            </h2>
            <p className="mb-8" style={{ color: "#C8C8B8" }}>
              Describe the conversation. Practice it. Have it for real.
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
