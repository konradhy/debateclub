import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Heart,
  Users,
  MessageSquare,
  CheckCircle,
  XCircle,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/use-cases/parents-educators")({
  head: () => ({
    meta: [
      { title: "Practice Difficult Conversations with Kids and Students | DebateClub" },
      {
        name: "description",
        content:
          "Teenagers push back. Students challenge authority. Practice having productive conversations that actually land.",
      },
      {
        property: "og:title",
        content: "Practice Difficult Conversations with Kids and Students | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Teenagers push back. Students challenge authority. Practice having productive conversations that actually land.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: ParentsEducatorsPage,
});

/**
 * Use case page: Parents and educators.
 * Shows how DebateClub helps parents, teachers, and counselors
 * practice difficult conversations with teenagers and students.
 */
function ParentsEducatorsPage() {
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
            <Home className="h-8 w-8" style={{ color: "#C8D4B8" }} />
          </div>
          <h1
            className="mb-6 text-4xl font-bold lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Connect Without Conflict
          </h1>
          <p
            className="mx-auto max-w-2xl text-lg leading-relaxed"
            style={{ color: "#5C5C54" }}
          >
            Teenagers roll their eyes. Students tune out. The conversations that
            matter most are often the hardest to have. Practice them until they
            land.
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
                  Trust and Connection
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Every conversation either strengthens or weakens the bond. How
                  you handle hard topics determines whether they keep coming to
                  you.
                </p>
              </div>
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "#F5F3EF" }}
              >
                <Users className="mb-4 h-8 w-8" style={{ color: "#3C4A32" }} />
                <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                  Behavior and Choices
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  The conversations you have now shape the decisions they make
                  later. Getting through matters.
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
                  Your Influence
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  If they shut down every time you try to talk, you lose your
                  ability to guide. Keeping the channel open is everything.
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
            Why Traditional Approaches Fall Short
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
                  Parenting books and articles
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Great advice in theory. But when they push back with "you
                  don't understand," the script goes out the window.
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
                  Talking to other parents/teachers
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Their kids are different. Their students are different. What
                  worked for them may not work for you.
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
                  Winging it
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Emotions run high. You say something you regret. They storm
                  off. Now the conversation is even harder.
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
                  Avoiding the topic
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  The issue does not go away. It just festers until it becomes a
                  crisis.
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
                  What is the conversation? Their age and personality? What
                  pushback do you expect? The AI adapts.
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
                  Practice the Conversation
                </h3>
                <p className="text-sm" style={{ color: "#C8C8B8" }}>
                  The AI responds as a resistant teen or challenging student.
                  Handle the eye rolls, the "whatever," the pushback.
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
                  Find What Works
                </h3>
                <p className="text-sm" style={{ color: "#C8C8B8" }}>
                  See which approaches landed. Get suggestions for different
                  phrasing. Try until you find the way in.
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
                Setting Boundaries
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Screen time, curfews, responsibilities. Explain the why without
                triggering the power struggle.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                Academic Concerns
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Grades dropping, missing assignments. Address the issue without
                making them feel attacked.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                Peer Pressure and Social Issues
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Friends, fitting in, risky behavior. Have the conversation
                before it becomes a crisis.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                Mental Health Check-Ins
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Anxiety, depression, stress. Open the door without making them
                feel judged or interrogated.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                Parent-Teacher Meetings
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Difficult parents, concerned parents, confused parents.
                Navigate the conversation professionally.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <h3 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                Behavior Issues
              </h3>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Disrespect, defiance, classroom disruption. Address behavior
                while preserving the relationship.
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
              Techniques That Get Through
            </h2>
            <p className="mb-8" style={{ color: "#5C5C54" }}>
              From the 12 core techniques, these four matter most with young
              people:
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
                    Sense when they are shutting down. Adjust before you lose
                    them. Know when to push and when to pause.
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
                    Logic rarely works with emotions. Connect with how they feel
                    before explaining why.
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
                    "What would you do in my position?" Questions that invite
                    reflection rather than trigger defensiveness.
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
                    A well-timed joke can break the tension. Make them laugh
                    before you make your point.
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
                  Conversations turn into arguments
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4" style={{ color: "#DC2626" }} />
                  They shut down or storm off
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4" style={{ color: "#DC2626" }} />
                  Say something you regret
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4" style={{ color: "#DC2626" }} />
                  Relationship feels strained
                </li>
              </ul>
            </div>
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: "#F0FDF4" }}
            >
              <h3 className="mb-4 font-bold" style={{ color: "#166534" }}>
                After: Connecting
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4" style={{ color: "#16A34A" }} />
                  Have the hard conversation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4" style={{ color: "#16A34A" }} />
                  They actually listen
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4" style={{ color: "#16A34A" }} />
                  Say what you mean, kindly
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4" style={{ color: "#16A34A" }} />
                  Relationship grows stronger
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
              The Conversations That Matter Most
            </h2>
            <p className="mb-8" style={{ color: "#C8C8B8" }}>
              Describe the situation. Practice the conversation. Make it count.
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
