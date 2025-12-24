import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Stethoscope,
  Heart,
  Users,
  Shield,
  CheckCircle,
  XCircle,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/use-cases/healthcare-professionals")({
  head: () => ({
    meta: [
      { title: "Practice Difficult Patient Conversations | DebateClub" },
      {
        name: "description",
        content:
          "Breaking bad news, non-compliant patients, family conflicts. Practice the conversations that medical school didn't teach you.",
      },
      {
        property: "og:title",
        content: "Practice Difficult Patient Conversations | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Breaking bad news, non-compliant patients, family conflicts. Practice the conversations that medical school didn't teach you.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: HealthcareProfessionalsPage,
});

/**
 * Use case page: Healthcare professionals.
 * Shows how DebateClub helps doctors, nurses, and healthcare workers
 * practice difficult patient conversations, family discussions, and more.
 */
function HealthcareProfessionalsPage() {
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
            <Stethoscope className="h-8 w-8" style={{ color: "#C8D4B8" }} />
          </div>
          <h1
            className="mb-6 text-4xl font-bold lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Communicate When It Matters Most
          </h1>
          <p
            className="mx-auto max-w-2xl text-lg leading-relaxed"
            style={{ color: "#5C5C54" }}
          >
            The hardest part of medicine is often the conversation, not the
            diagnosis. Breaking bad news. Convincing non-compliant patients.
            Navigating family conflict. Practice until you can do it with
            compassion and clarity.
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
                  Patient Outcomes
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Patients who understand and trust you follow treatment plans.
                  Communication directly affects clinical outcomes.
                </p>
              </div>
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <Users className="mb-4 h-8 w-8" style={{ color: "#3C4A32" }} />
                <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                  Patient Experience
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  How you deliver information matters as much as what you
                  deliver. Bad news handled well is bearable. Handled poorly, it
                  traumatizes.
                </p>
              </div>
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <Shield className="mb-4 h-8 w-8" style={{ color: "#3C4A32" }} />
                <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                  Your Wellbeing
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Difficult conversations take a toll. Having the skills to
                  handle them reduces burnout and moral injury.
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
            Why Traditional Medical Training Falls Short
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
                  Standardized patient encounters
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  A few sessions in medical school. Not enough reps to build the
                  instinct for real-world complexity.
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
                  Observing senior colleagues
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Watching is not doing. You need to practice the words coming
                  out of your own mouth.
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
                  Communication frameworks
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  SPIKES, NURSE. Great frameworks. But patients do not follow
                  scripts. You need to practice the unexpected.
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
                  Learning on real patients
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Your first attempt at breaking bad news should not be with a
                  real patient facing real devastation.
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
                  Set Up the Scenario
                </h3>
                <p className="text-sm" style={{ color: "#C8C8B8" }}>
                  What is the diagnosis? Who is the patient? What is their
                  likely reaction? The AI adapts to your specific case.
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
                  The AI responds as a scared patient, an angry family member,
                  or a non-compliant diabetic. Handle it in real time.
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
                  See where you could have been clearer or more compassionate.
                  Get suggestions. Practice until it feels natural.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clinical Scenarios */}
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
                Breaking Bad News
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Cancer diagnosis. Chronic disease. Prognosis conversations.
                Deliver devastating news with compassion and clarity.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                Non-Compliant Patients
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                "I stopped taking my meds." "I know I should quit smoking."
                Motivate change without lecturing.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                Family Conflict
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Families who disagree about care. Angry relatives. Navigating
                competing interests while advocating for the patient.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                End-of-Life Discussions
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Goals of care. DNR conversations. Helping patients and families
                make the hardest decisions.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                Medical Errors
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Disclosing errors honestly. Apologizing effectively. Maintaining
                trust after something went wrong.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                Seeking Consent
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Explaining risks and benefits. Ensuring understanding.
                Respecting autonomy while recommending care.
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
              Techniques for Clinical Communication
            </h2>
            <p className="mb-8" style={{ color: "#5C5C54" }}>
              From the 12 core techniques, these four matter most in healthcare:
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
                    Sense when patients need you to slow down. When they are
                    ready to hear more. When they need silence.
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
                    Connect with their fear before explaining the treatment.
                    Empathy first, information second.
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
                    "I don't have all the answers, but here's what I know..."
                    Honesty builds trust.
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
                    Three things to remember. Three next steps. Structure
                    information so overwhelmed patients can retain it.
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
                Before: Dreading the Conversation
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4" style={{ color: "#DC2626" }} />
                  Rush through bad news
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4" style={{ color: "#DC2626" }} />
                  Not know what to say when they cry
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4" style={{ color: "#DC2626" }} />
                  Feel helpless with non-compliant patients
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4" style={{ color: "#DC2626" }} />
                  Carry the weight home
                </li>
              </ul>
            </div>
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: "#F0FDF4" }}
            >
              <h3 className="mb-4 font-bold" style={{ color: "#166534" }}>
                After: Communicating with Confidence
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4" style={{ color: "#16A34A" }} />
                  Deliver news with compassion and clarity
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4" style={{ color: "#16A34A" }} />
                  Sit with emotion without panicking
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4" style={{ color: "#16A34A" }} />
                  Motivate change effectively
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4" style={{ color: "#16A34A" }} />
                  Feel prepared for hard conversations
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
              Your Patients Deserve Your Best Communication
            </h2>
            <p className="mb-8" style={{ color: "#C8C8B8" }}>
              Set up the scenario. Practice the conversation. Walk in prepared.
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

