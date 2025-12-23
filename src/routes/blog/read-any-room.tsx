import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog/read-any-room")({
  component: ReadAnyRoomArticle,
});

/**
 * Blog article: Read Any Room technique deep dive.
 * Explains the technique, its benefits, and how DebateClub helps users master it.
 */
function ReadAnyRoomArticle() {
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
            Audience Adaptation
          </span>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Read Any Room: The Foundation of Persuasion
          </h1>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            8 min read · Technique 1 of 12
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
            In the opening pages of "Win Every Argument," Mehdi Hasan makes a
            provocative claim:{" "}
            <strong>the audience is your judge and jury</strong>. You are not
            trying to convince your opponent. You are trying to convince
            everyone watching. This simple insight changes everything about how
            you should approach a debate.
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            A skeptical investor requires a different approach than a supportive
            colleague. A hostile critic demands a different tone than a neutral
            moderator. The technique of "Reading the Room" is about developing
            the awareness to detect these differences and the flexibility to
            adapt your delivery in real time.
          </p>

          {/* Section 1 */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Why Most Debaters Get This Wrong
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The most common mistake in debate is treating every audience the
            same. You craft a logically sound argument, rehearse your delivery,
            and then deliver it identically whether you're speaking to
            academics, executives, or journalists.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            But audiences are not interchangeable. Hasan emphasizes that
            effective persuaders "tailor their language and examples to the
            specific audience." A statistic that impresses an expert might bore
            a general audience. An emotional appeal that moves a jury might
            alienate a boardroom.
          </p>

          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "The beginning should be clear, direct, and unique, avoiding clichés
            and generic greetings. The audience makes snap judgments in the
            first 30 seconds."
            <span className="mt-2 block text-sm not-italic">
              - Mehdi Hasan, "Win Every Argument"
            </span>
          </blockquote>

          {/* Section 2 */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Three Audience Types
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Most audiences fall into three broad categories, each requiring a
            distinct approach:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div className="mb-6">
              <h3
                className="mb-2 text-lg font-bold"
                style={{ color: "#3C4A32" }}
              >
                1. The Skeptical Audience
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Investors, critics, opposing counsel. They are actively looking
                for flaws in your reasoning. Lead with evidence, acknowledge
                counterarguments preemptively, and avoid emotional language
                until you have established credibility.
              </p>
            </div>

            <div className="mb-6">
              <h3
                className="mb-2 text-lg font-bold"
                style={{ color: "#3C4A32" }}
              >
                2. The Supportive Audience
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Colleagues, allies, your side of a partisan debate. They already
                agree with your conclusion but want to feel energized and
                validated. Lead with emotion, share stories, and build
                collective identity with "we" language.
              </p>
            </div>

            <div>
              <h3
                className="mb-2 text-lg font-bold"
                style={{ color: "#3C4A32" }}
              >
                3. The Neutral Audience
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                General public, uncommitted voters, new prospects. They are
                persuadable but not yet invested. Your job is to make them care
                first, then present your case. Open with a hook that creates
                curiosity, then balance evidence with narrative.
              </p>
            </div>
          </div>

          {/* Section 3: How DebateClub Trains This */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            How DebateClub Trains This Skill
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The challenge with audience adaptation is that it requires live
            practice. You cannot develop this skill by reading about it. You
            need to experience the different reactions, feel the resistance, and
            learn to pivot on the fly.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            This is where DebateClub's sparring system becomes valuable. When
            you create an opponent profile, you configure the{" "}
            <strong>Audience Context</strong> settings that shape how your
            opponent behaves during practice.
          </p>

          {/* Mermaid-style diagram as styled HTML */}
          <div
            className="my-8 overflow-hidden rounded-xl"
            style={{ backgroundColor: "#2A2A20" }}
          >
            <div className="px-6 py-4" style={{ backgroundColor: "#3C4A32" }}>
              <h4
                className="text-sm font-semibold uppercase tracking-wide"
                style={{ color: "#C8D4B8" }}
              >
                How Audience Context Flows Through the App
              </h4>
            </div>
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <pre className="whitespace-pre-wrap">
                {`┌──────────────────────────────────────┐
│  STEP 1: OPPONENT PROFILE SETUP      │
│                                      │
│  • Audience Type (Academic, Legal,   │
│    Professional, Political, Media)   │
│  • Audience Disposition (Hostile,    │
│    Skeptical, Neutral, Supportive)   │
│  • Audience Size (1-on-1, Small,     │
│    Large, Broadcast)                 │
│  • Debate Format (Formal, Casual,    │
│    Panel, Interview)                 │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  STEP 2: STRATEGY GENERATION         │
│                                      │
│  Your audience config shapes the     │
│  prep materials generated for you:   │
│                                      │
│  • Opening hooks for your audience   │
│  • Argument frames they will trust   │
│  • Counters to their likely concerns │
│  • Zingers calibrated to their humor │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  STEP 3: LIVE DEBATE PRACTICE        │
│                                      │
│  Your opponent adopts a persona      │
│  matching your audience config. A    │
│  "skeptical investor" opponent will: │
│                                      │
│  • Interrupt with pointed questions  │
│  • Demand evidence for claims        │
│  • Express doubt and push back       │
│  • Test your composure under pressure│
│                                      │
│  A "supportive colleague" will:      │
│                                      │
│  • Play devil's advocate gently      │
│  • Give you room to build arguments  │
│  • Offer softballs you should spike  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  STEP 4: POST-DEBATE ANALYSIS        │
│                                      │
│  Your coaching analysis evaluates:   │
│                                      │
│  • Did you adapt to audience type?   │
│  • Did your opening grab attention?  │
│  • Did you use appropriate language? │
│  • Did you read opponent reactions?  │
└──────────────────────────────────────┘`}
              </pre>
            </div>
          </div>

          {/* Section 4: The Prep Screen */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Using the Prep Screen for Audience Adaptation
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Before you enter a debate, the Prep screen is where you build your
            strategy. Three types of opening statements are generated for you to
            choose from:
          </p>

          <ul className="my-6 space-y-3">
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Personal Story</strong>: Best for neutral or supportive
                audiences where emotional connection builds trust.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Provocative Question</strong>: Creates a "knowledge gap"
                that works well for skeptical audiences who need to be intrigued
                before they are persuaded.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Bold Statement</strong>: A surprising fact or statistic
                that disrupts expectations. Useful for jaded or distracted
                audiences.
              </span>
            </li>
          </ul>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The key insight is that you should select your opening based on your
            configured audience, not just personal preference. The Prep screen
            gives you all three options precisely so you can practice making
            this strategic decision.
          </p>

          {/* Section 5: Quick Reference Panel */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Quick Reference Panel: Your In-Debate Cheat Sheet
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            During a live practice debate, you can open the Quick Reference
            panel at any time. This panel displays all the strategic elements
            you selected during prep:
          </p>

          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{
              backgroundColor: "#FAFAF8",
              borderColor: "#3C4A32",
            }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              What is in the Quick Reference Panel
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
              <li>
                <strong>Your selected opening</strong>: The exact text and
                delivery guidance
              </li>
              <li>
                <strong>Your selected closing</strong>: Call to action,
                emotional appeal, or summary
              </li>
              <li>
                <strong>Your argument frames</strong>: The main angles you
                planned to use
              </li>
              <li>
                <strong>Your zingers</strong>: Pre-crafted one-liners with setup
                notes
              </li>
              <li>
                <strong>Your counters</strong>: Prepared responses to predicted
                opponent arguments
              </li>
              <li>
                <strong>Your receipts</strong>: Evidence and quotes organized by
                category
              </li>
            </ul>
          </div>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            This panel exists because real debates require quick access to
            prepared material. You should not be scrambling to remember your
            evidence or your planned counters. The Quick Reference panel lets
            you focus on listening and adapting while your prep stays one tap
            away.
          </p>

          {/* Section 6: Expected Results */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            What to Expect After Practice
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            After 5 to 10 practice sessions with varied audience configurations,
            you should notice these improvements:
          </p>

          <div className="my-6 grid grid-cols-2 gap-4">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Faster Adaptation
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You will start to recognize audience types within the first
                minute and shift your approach without conscious effort.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Varied Toolkit
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You will have multiple versions of your key arguments, each
                calibrated for different audience types.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Reduced Freeze Response
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                By practicing against hostile opponents, you will become
                comfortable with pushback and less likely to freeze under
                pressure.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Better Opening Instincts
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You will develop an intuition for which type of opening (story,
                question, or bold statement) fits which context.
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
            Reading the room is not a talent you either have or lack. It is a
            skill you develop through deliberate practice. DebateClub gives you
            the reps you need: configurable opponent personas, strategy tailored
            to your audience, and post-debate coaching that scores your
            adaptation.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The next time you walk into a meeting, a presentation, or an
            interview, you will not be guessing how to approach the room. You
            will know.
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
              Ready to Practice?
            </h3>
            <p className="mb-6" style={{ color: "#C8C8B8" }}>
              Create an opponent profile with your target audience and start
              your first practice debate in under 2 minutes.
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
            <div />
            <Link
              to="/blog/strike-emotional-chord"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              Next: Strike an Emotional Chord
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </article>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: "#E8E4DA" }}>
        <div className="mx-auto max-w-3xl px-8 text-center">
          <p className="text-sm" style={{ color: "#5C5C54" }}>
            © {new Date().getFullYear()} DebateClub. Based on "Win Every
            Argument" by Mehdi Hasan.
          </p>
        </div>
      </footer>
    </div>
  );
}
