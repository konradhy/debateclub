import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Target,
  Crosshair,
} from "lucide-react";

export const Route = createFileRoute("/blog/ask-the-killer-question")({
  head: () => ({
    meta: [
      { title: "How to Ask Questions That Trap Your Opponent | DebateClub" },
      {
        name: "description",
        content:
          "Socrates never told anyone they were wrong. He asked questions until they realized it themselves. From Mehdi Hasan's Win Every Argument.",
      },
      {
        property: "og:title",
        content: "How to Ask Questions That Trap Your Opponent | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Socrates never told anyone they were wrong. He asked questions until they realized it themselves. From Mehdi Hasan's Win Every Argument.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: AskTheKillerQuestionArticle,
});

/**
 * Blog article: Ask the Killer Question technique deep dive.
 * Explores Mehdi Hasan's Chapter 6: "Make 'Em Laugh" and Chapter 9's
 * questioning techniques, and how DebateClub trains the Socratic method.
 */
function AskTheKillerQuestionArticle() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F3EF" }}>
      {/* Header */}
      <header
        className="border-b py-6"
        style={{ backgroundColor: "#FAFAF8", borderColor: "#E8E4DA" }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-8">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
            style={{ color: "#5C5C54" }}
          >
            <ArrowLeft className="h-4 w-4" />
            All Techniques
          </Link>
          <Link to="/">
            <span className="text-xl font-bold" style={{ color: "#2A2A20" }}>
              DebateClub
            </span>
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <article className="mx-auto max-w-3xl px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <span
            className="mb-4 inline-block rounded-md px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: "#A8B08C", color: "#3A4030" }}
          >
            Socratic Method
          </span>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Ask the Killer Question: Leading Opponents Into Their Own Trap
          </h1>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            9 min read · Technique 9 of 12
          </p>
        </motion.div>

        {/* Article Body */}
        <motion.div
          className="prose-custom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Opening */}
          <p className="text-lg leading-relaxed" style={{ color: "#3A3A35" }}>
            Socrates never told anyone they were wrong. He asked questions.
            Simple, innocent-seeming questions that led his opponents step by
            step into contradictions they could not escape. Two thousand years
            later, skilled debaters still use the same technique. The killer
            question does not attack. It invites the opponent to defeat
            themselves.
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            Mehdi Hasan writes extensively about questioning techniques in "Win
            Every Argument."
            <strong>
              {" "}
              The best questions are not requests for information. They are
              traps.
            </strong>{" "}
            They appear neutral or even friendly, but the answer, any answer,
            exposes a weakness in the opponent's position.
          </p>

          {/* Section 1: Types of Killer Questions */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Question Arsenal
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Mehdi Hasan identifies several types of devastating questions:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <HelpCircle className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  The Contradiction Question
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Forces the opponent to choose between two positions they have
                taken. "You said X earlier. Now you're saying Y. Which is it?"
                There is no good answer.
              </p>
              <p className="mt-2 text-sm italic" style={{ color: "#888880" }}>
                Example: "You claim to support small businesses, but you voted
                for the tax increase that hurt them most. How do you reconcile
                that?"
              </p>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  The Yes-or-No Question
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Demands a simple answer that damages the opponent either way.
                Both yes and no lead to uncomfortable territory.
              </p>
              <p className="mt-2 text-sm italic" style={{ color: "#888880" }}>
                Example: "Did you know about the risks before you approved it?
                Yes or no." (Yes means negligence. No means incompetence.)
              </p>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Crosshair className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  The Hypothetical Question
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Creates a scenario that exposes the logical conclusion of the
                opponent's position. "If that's true, then wouldn't it also mean
                that...?"
              </p>
              <p className="mt-2 text-sm italic" style={{ color: "#888880" }}>
                Example: "If privacy doesn't matter because you have nothing to
                hide, would you share your browser history with us right now?"
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <HelpCircle className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  The Clarifying Question
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Appears innocent but forces the opponent to elaborate on a weak
                point. "I want to make sure I understand. You're saying that...
                is that correct?"
              </p>
              <p className="mt-2 text-sm italic" style={{ color: "#888880" }}>
                Example: "Just so I'm clear: your position is that climate
                scientists worldwide are all part of a conspiracy. Is that what
                you're claiming?"
              </p>
            </div>
          </div>

          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "A good question, asked in the right way, at the right moment, can
            be more devastating than any statement. It puts the burden of proof
            on your opponent and exposes their weaknesses."
            <span className="mt-2 block text-sm not-italic">
              - Mehdi Hasan, "Win Every Argument"
            </span>
          </blockquote>

          {/* Section 2: Why Questions Are Powerful */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Strategic Advantage of Asking
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Mehdi Hasan explains why questions are often more effective than
            statements:
          </p>

          <div className="my-6 grid gap-4">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Shifts the Burden
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                When you make a statement, you must defend it. When you ask a
                question, your opponent must defend their answer. You control
                the terrain.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Appears Reasonable
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                The audience sees you as curious and fair-minded, not
                aggressive. "I'm just asking questions" is a powerful position
                even when the questions are devastating.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Forces Specificity
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Vague claims survive general attacks. Questions demand specific
                answers. "How exactly would that work?" exposes hand-waving.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Creates Self-Defeat
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                The best killer questions make opponents defeat themselves. They
                cannot blame you for their own answer. The trap is their own
                logic.
              </p>
            </div>
          </div>

          {/* Section 3: How DebateClub Trains This */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            How DebateClub Trains the Socratic Method
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Crafting killer questions under pressure is difficult. You need to
            listen carefully, identify the weak point, formulate the question,
            and deliver it naturally. DebateClub builds this skill through
            structured practice:
          </p>

          {/* Mermaid-style diagram */}
          <div
            className="my-8 overflow-hidden rounded-xl"
            style={{ backgroundColor: "#2A2A20" }}
          >
            <div className="px-6 py-4" style={{ backgroundColor: "#3C4A32" }}>
              <h4
                className="text-sm font-semibold uppercase tracking-wide"
                style={{ color: "#C8D4B8" }}
              >
                Killer Question Training Pipeline
              </h4>
            </div>
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <pre className="whitespace-pre-wrap">
                {`┌──────────────────────────────────────┐
│  PREP: QUESTION BANK                 │
│                                      │
│  Your prep materials include         │
│  pre-crafted killer questions:       │
│                                      │
│  • Questions targeting likely        │
│    opponent arguments                │
│                                      │
│  • Yes/no traps for key claims       │
│                                      │
│  • Hypotheticals that expose         │
│    logical conclusions               │
│                                      │
│  Each includes the setup: "Use when  │
│  opponent claims X"                  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  DURING DEBATE                       │
│                                      │
│  Your AI opponent creates openings:  │
│                                      │
│  • Makes claims with obvious holes   │
│    that questions can expose         │
│                                      │
│  • Takes contradictory positions     │
│    you can trap with questions       │
│                                      │
│  • Overreaches in ways that invite   │
│    clarifying questions              │
│                                      │
│  Quick Reference keeps your          │
│  prepared questions accessible       │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  POST-DEBATE ANALYSIS                │
│                                      │
│  Your coaching evaluates:            │
│                                      │
│  • Did you use questions effectively │
│    to expose weak points?            │
│                                      │
│  • Did you ask or just assert?       │
│                                      │
│  • Were there opportunities for      │
│    killer questions you missed?      │
│                                      │
│  • Did you follow up on weak answers │
│    or let opponents off the hook?    │
└──────────────────────────────────────┘`}
              </pre>
            </div>
          </div>

          {/* Section 4: The Follow-Up */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Art of the Follow-Up
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            A killer question is only as good as your follow-up. When opponents
            evade, you must press. Mehdi Hasan emphasizes persistence:
          </p>

          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{
              backgroundColor: "#FAFAF8",
              borderColor: "#3C4A32",
            }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              Follow-Up Techniques
            </h4>
            <div className="space-y-3 text-sm" style={{ color: "#5C5C54" }}>
              <p>
                <strong>Restate the question:</strong> "I notice you didn't
                answer my question. Let me ask it again..."
              </p>
              <p>
                <strong>Name the dodge:</strong> "That's an interesting point
                about something else. But I asked about X. Can you address that
                specifically?"
              </p>
              <p>
                <strong>Escalate gently:</strong> "I've asked three times now.
                Is there a reason you won't answer?"
              </p>
              <p>
                <strong>Let silence work:</strong> After asking, wait. Do not
                fill the silence. The pressure to respond grows with each
                second.
              </p>
            </div>
          </div>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The follow-up is where many debaters fail. They ask a great
            question, get a non-answer, and move on. The audience notices. The
            opponent escapes. Persistence is what makes the question land.
          </p>

          {/* Section 5: Example in Action */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Killer Question in Action
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Here is how a well-crafted question sequence works:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div className="mb-4">
              <span
                className="inline-block rounded-md px-2 py-1 text-xs font-medium"
                style={{ backgroundColor: "#E4E4FF", color: "#2D2D7C" }}
              >
                Opponent's Position
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "We can't afford to raise the minimum wage. It will hurt small
                businesses."
              </p>
            </div>
            <div className="mb-4">
              <span
                className="inline-block rounded-md px-2 py-1 text-xs font-medium"
                style={{ backgroundColor: "#E4FFE4", color: "#2D7C2D" }}
              >
                Killer Question 1
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "At what dollar amount do you believe a full-time worker should
                be able to afford basic necessities?"
              </p>
              <p className="mt-2 text-sm" style={{ color: "#888880" }}>
                (Forces them to either name a number they must defend or refuse
                to answer, which looks evasive.)
              </p>
            </div>
            <div className="mb-4">
              <span
                className="inline-block rounded-md px-2 py-1 text-xs font-medium"
                style={{ backgroundColor: "#E4FFE4", color: "#2D7C2D" }}
              >
                Killer Question 2
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "If businesses can only survive by paying workers less than a
                living wage, should taxpayers subsidize those businesses through
                food stamps and housing assistance for their employees?"
              </p>
              <p className="mt-2 text-sm" style={{ color: "#888880" }}>
                (Exposes the hidden subsidy in low wages. Either answer is
                uncomfortable.)
              </p>
            </div>
            <div>
              <span
                className="inline-block rounded-md px-2 py-1 text-xs font-medium"
                style={{ backgroundColor: "#E4FFE4", color: "#2D7C2D" }}
              >
                Killer Question 3
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "You mentioned small businesses. Can you point to a single state
                that raised its minimum wage and saw widespread small business
                closures as a result?"
              </p>
              <p className="mt-2 text-sm" style={{ color: "#888880" }}>
                (Demands evidence they likely do not have. Exposes assertion
                without support.)
              </p>
            </div>
          </div>

          {/* Section 6: Expected Results */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            What Changes After Practice
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            After practicing the Socratic method across multiple debates, you
            will notice:
          </p>

          <div className="my-6 grid grid-cols-2 gap-4">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Faster Pattern Recognition
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You start hearing weaknesses as opponents speak. Questions form
                in your mind before they finish their sentence.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Natural Delivery
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Your questions stop sounding rehearsed. They flow from the
                conversation even when you prepared them in advance.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Persistence Instinct
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You stop accepting non-answers. The follow-up becomes automatic,
                not awkward.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Control of Pace
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Questions let you set the tempo. You decide what gets discussed
                and what gets exposed.
              </p>
            </div>
          </div>

          {/* Closing */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Bottom Line
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Socrates understood something profound: people resist being told
            they are wrong, but they cannot escape their own logic. A
            well-crafted question leads opponents into contradictions of their
            own making. They defeat themselves.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            DebateClub trains this ancient skill for modern debates. Your prep
            includes pre-crafted killer questions. Your AI opponent creates
            openings for you to use them. Your analysis evaluates whether you
            asked effectively or let opponents escape.
          </p>

          <p
            className="mt-4 text-lg font-medium leading-relaxed"
            style={{ color: "#3A3A35" }}
          >
            Don't tell them they're wrong. Ask the question that makes them
            prove it themselves.
          </p>

          {/* CTA */}
          <div
            className="mt-12 rounded-xl p-8 text-center"
            style={{ backgroundColor: "#3C4A32" }}
          >
            <h3
              className="mb-4 text-2xl font-bold"
              style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
            >
              Ready to Master the Killer Question?
            </h3>
            <p className="mb-6" style={{ color: "#C8C8B8" }}>
              Get prepared questions for your next debate and practice leading
              opponents into their own contradictions.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold transition-all hover:gap-3"
              style={{ backgroundColor: "#FAFAF8", color: "#3C4A32" }}
            >
              Start Practicing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Next Article Navigation */}
          <div
            className="mt-12 flex justify-between border-t pt-8"
            style={{ borderColor: "#E8E4DA" }}
          >
            <Link
              to="/blog/make-it-stick"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous: Make It Stick
            </Link>
            <Link
              to="/blog/cut-through-the-noise"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              Next: Cut Through the Noise
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </article>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: "#E8E4DA" }}>
        <div className="mx-auto max-w-3xl px-8 text-center">
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
