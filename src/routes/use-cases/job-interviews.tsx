import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  MessageSquare,
  Target,
  TrendingUp,
  CheckCircle,
  XCircle,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/use-cases/job-interviews")({
  head: () => ({
    meta: [
      { title: "Practice Job Interviews with AI | DebateClub" },
      {
        name: "description",
        content:
          "Nail behavioral interviews and salary negotiations. Practice with AI that pushes back, asks follow-ups, and scores your responses. Free to start.",
      },
      {
        property: "og:title",
        content: "Practice Job Interviews with AI | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Nail behavioral interviews and salary negotiations. Practice with AI that pushes back, asks follow-ups, and scores your responses. Free to start.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: JobInterviewsPage,
});

/**
 * Use case page: Job Interview preparation.
 * Shows how DebateClub helps users prepare for behavioral interviews,
 * salary negotiations, and tough interview questions.
 */
function JobInterviewsPage() {
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
            <Briefcase className="h-8 w-8" style={{ color: "#C8D4B8" }} />
          </div>
          <h1
            className="mb-6 text-4xl font-bold lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Nail Your Next Job Interview
          </h1>
          <p
            className="mx-auto max-w-2xl text-lg leading-relaxed"
            style={{ color: "#5C5C54" }}
          >
            The difference between getting the offer and getting ghosted often
            comes down to how you handle three or four key moments. Practice
            those moments until they are second nature.
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
                  Salary Differential
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  A weak negotiation costs you $5K-$20K per year. Over a career,
                  that compounds to hundreds of thousands.
                </p>
              </div>
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <Target className="mb-4 h-8 w-8" style={{ color: "#3C4A32" }} />
                <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                  Career Trajectory
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  The right role at the right company changes everything. One
                  interview can redirect your entire career path.
                </p>
              </div>
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <MessageSquare
                  className="mb-4 h-8 w-8"
                  style={{ color: "#3C4A32" }}
                />
                <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                  Confidence Compound
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Confidence in interviews comes from reps. Without practice,
                  you walk in hoping. With practice, you walk in knowing.
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
            Why Traditional Interview Prep Fails
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
                  Reading articles
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  You know the STAR method. You have read the top 50 behavioral
                  questions. But reading is not speaking. When the pressure
                  hits, knowledge evaporates.
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
                  Practicing in the mirror
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Mirrors do not interrupt. They do not ask follow-up questions.
                  They do not throw curveballs. Real interviewers do.
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
                  Asking friends to mock interview
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Friends are too nice. They do not push. They accept your first
                  answer instead of pressing for specifics.
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
                  One-off career coaching
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  $200/hour for one session. No repetition. No way to practice
                  the same scenario until it is automatic.
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
                  Set Up Your Scenario
                </h3>
                <p className="text-sm" style={{ color: "#C8C8B8" }}>
                  Tell us the role, company, and your background. The AI
                  interviewer adapts to your specific situation.
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
                  Practice Out Loud
                </h3>
                <p className="text-sm" style={{ color: "#C8C8B8" }}>
                  Voice-based practice. The AI asks follow-ups, challenges weak
                  answers, and does not let you off easy.
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
                  Get Scored and Improve
                </h3>
                <p className="text-sm" style={{ color: "#C8C8B8" }}>
                  See exactly where you were strong and where you lost them.
                  Rewritten answers show you what great looks like.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scenario Walkthrough */}
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
            What a Practice Session Looks Like
          </h2>
          <div
            className="overflow-hidden rounded-xl"
            style={{ backgroundColor: "#2A2A20" }}
          >
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <div className="mb-4">
                <span style={{ color: "#9A9A6D" }}>AI Interviewer:</span>
                <p className="mt-1" style={{ color: "#FAFAF8" }}>
                  "Tell me about a time you had a conflict with a coworker and
                  how you resolved it."
                </p>
              </div>
              <div className="mb-4">
                <span style={{ color: "#9A9A6D" }}>You:</span>
                <p className="mt-1" style={{ color: "#C8C8B8" }}>
                  "Well, there was this one time where we disagreed about a
                  project timeline..."
                </p>
              </div>
              <div className="mb-4">
                <span style={{ color: "#9A9A6D" }}>AI Interviewer:</span>
                <p className="mt-1" style={{ color: "#FAFAF8" }}>
                  "Can you be more specific? What was the project? What exactly
                  did you disagree about?"
                </p>
              </div>
              <div className="mb-4 border-l-2 pl-4" style={{ borderColor: "#3C4A32" }}>
                <span className="text-xs" style={{ color: "#9A9A6D" }}>
                  [The AI pushes for specifics - just like a real interviewer]
                </span>
              </div>
              <div className="mb-4">
                <span style={{ color: "#9A9A6D" }}>You:</span>
                <p className="mt-1" style={{ color: "#C8C8B8" }}>
                  "It was our Q3 product launch. My coworker wanted to delay two
                  weeks for more testing. I thought we should ship on time..."
                </p>
              </div>
              <div>
                <span style={{ color: "#9A9A6D" }}>AI Interviewer:</span>
                <p className="mt-1" style={{ color: "#FAFAF8" }}>
                  "And what happened? Whose approach did you ultimately take,
                  and what was the outcome?"
                </p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm" style={{ color: "#5C5C54" }}>
            After 10-15 minutes, you get a full analysis: what you did well,
            where you lost clarity, and rewritten versions of your weaker
            answers.
          </p>
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
              Techniques That Win Interviews
            </h2>
            <p className="mb-8" style={{ color: "#5C5C54" }}>
              From the 12 core techniques, these four matter most in interviews:
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
                    Stories beat bullet points. Make interviewers feel your
                    impact, not just hear about it.
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
                    Specific numbers and results. "Increased revenue 23%" beats
                    "helped grow the business."
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
                    The "greatest weakness" question. Preempt it, own it, pivot
                    to growth.
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
                    When they challenge you, concede the valid point and
                    redirect to your strength.
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
                Before: Walking in Cold
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4" style={{ color: "#DC2626" }} />
                  Stumble on "tell me about yourself"
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4" style={{ color: "#DC2626" }} />
                  Go blank on behavioral questions
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4" style={{ color: "#DC2626" }} />
                  Accept first salary offer
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4" style={{ color: "#DC2626" }} />
                  Leave wishing you had said something differently
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
                  <CheckCircle className="mt-0.5 h-4 w-4" style={{ color: "#16A34A" }} />
                  Crisp, practiced opening that hooks them
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4" style={{ color: "#16A34A" }} />
                  Stories ready for every behavioral category
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4" style={{ color: "#16A34A" }} />
                  Negotiation language you have rehearsed
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4" style={{ color: "#16A34A" }} />
                  Leave knowing you showed your best
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
              Your Next Interview Is Coming
            </h2>
            <p className="mb-8" style={{ color: "#C8C8B8" }}>
              Start practicing now. Set up an interview scenario and get your
              first feedback in 15 minutes.
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
