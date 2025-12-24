import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Smile, Shield, Users } from "lucide-react";

export const Route = createFileRoute("/blog/defuse-with-humor")({
  component: DefuseWithHumorArticle,
});

/**
 * Blog article: Defuse with Humor technique deep dive.
 * Explores the strategic use of humor in debate from "Win Every Argument"
 * and how DebateClub trains users to deploy wit under pressure.
 */
function DefuseWithHumorArticle() {
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
            Wit Training
          </span>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Defuse with Humor: When Laughter Wins the Room
          </h1>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            8 min read · Technique 7 of 12
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
            In 1984, Ronald Reagan was losing a presidential debate. At 73, he
            was the oldest president in American history, and his age had become
            a serious campaign issue. When the moderator asked directly whether
            his age would affect his ability to serve, Reagan paused and said:
            "I will not make age an issue of this campaign. I am not going to
            exploit, for political purposes, my opponent's youth and
            inexperience."
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            Even Walter Mondale laughed. The audience roared. In a single
            sentence, Reagan neutralized his greatest vulnerability and made his
            opponent look like the one with the problem. Mehdi Hasan writes that
            this is humor at its most strategic:{" "}
            <strong>
              not entertainment, but a weapon that disarms attacks and wins over
              skeptics
            </strong>
            .
          </p>

          {/* Section 1: Why Humor Works */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Strategic Power of Laughter
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Hasan identifies several reasons why humor is such a powerful tool
            in debate:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  It Defuses Tension
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                When an opponent lands a hit, the room tenses. A well-timed joke
                breaks that tension and prevents the blow from settling. The
                audience relaxes, and so does your position.
              </p>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  It Builds Likability
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Audiences want to side with people they like. Making them laugh
                creates a bond. Suddenly you are not an adversary but someone
                they are rooting for.
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Smile className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  It Signals Confidence
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Someone who can joke under pressure appears unflappable. If you
                can laugh at an attack, you signal that it did not hurt you. The
                audience concludes you must be in a strong position.
              </p>
            </div>
          </div>

          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "Humor is a sign of confidence. The ability to laugh in the face of
            adversity suggests resilience and strength. It also tends to endear
            you to the audience."
            <span className="mt-2 block text-sm not-italic">
              - Mehdi Hasan, "Win Every Argument"
            </span>
          </blockquote>

          {/* Section 2: When to Use Humor */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Right Moment for a Joke
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Humor is powerful but risky. A joke that falls flat makes you look
            nervous. A joke at the wrong moment makes you look callous. Hasan
            identifies the optimal windows:
          </p>

          <div className="my-6 grid gap-4">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                After a Personal Attack
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                When someone attacks your character or credentials, a joke
                neutralizes it. You acknowledge the attack without taking the
                bait, and the audience sees you as above it.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                When Tension Peaks
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                During heated exchanges, humor can reset the room. It breaks the
                escalation cycle and repositions you as the reasonable one.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                To Highlight Absurdity
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                When an opponent makes a ridiculous claim, treating it seriously
                gives it weight. A quick joke exposes the absurdity without
                lengthy rebuttal.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                To Recover from a Mistake
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                If you stumble or misspeak, self-deprecating humor can turn a
                gaffe into a humanizing moment. The audience forgives what you
                laugh at yourself.
              </p>
            </div>
          </div>

          {/* Section 3: How DebateClub Trains This */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            How DebateClub Trains Humor Under Pressure
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The challenge with debate humor is that it must feel spontaneous,
            but spontaneity under pressure is rare. Most people freeze when
            attacked, unable to think of anything clever. DebateClub solves this
            by creating conditions for practice:
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
                Humor Training Pipeline
              </h4>
            </div>
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <pre className="whitespace-pre-wrap">
                {`┌──────────────────────────────────────┐
│  PREP PHASE                          │
│                                      │
│  Your zingers section includes       │
│  humor-specific lines for:           │
│                                      │
│  • Self-deprecating recovery jokes   │
│  • Defusing lines for likely attacks │
│  • Absurdity-exposing one-liners     │
│                                      │
│  Each includes:                      │
│  • The joke itself                   │
│  • When to deploy it                 │
│  • Tone guidance (wry vs. sharp)     │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  DURING DEBATE                       │
│                                      │
│  Your AI opponent creates tense      │
│  moments that invite humor:          │
│                                      │
│  • Makes personal attacks that can   │
│    be deflected with wit             │
│                                      │
│  • Escalates tension to points where │
│    a joke would reset the room       │
│                                      │
│  • Makes absurd claims that invite   │
│    humorous exposure                 │
│                                      │
│  Your prepared jokes are accessible  │
│  in the Quick Reference panel        │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  POST-DEBATE ANALYSIS                │
│                                      │
│  Your coaching evaluates:            │
│                                      │
│  • Did you use humor when it would   │
│    have been strategically valuable? │
│                                      │
│  • Did jokes land with appropriate   │
│    timing and delivery?              │
│                                      │
│  • Were there missed opportunities   │
│    where humor would have helped?    │
│                                      │
│  • Did you avoid inappropriate humor │
│    that could have backfired?        │
└──────────────────────────────────────┘`}
              </pre>
            </div>
          </div>

          {/* Section 4: The Self-Deprecation Move */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Power of Self-Deprecation
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Reagan's age joke is a masterclass in self-deprecating humor.
            Instead of denying his age was a problem, he embraced it and turned
            it around. This pattern works because:
          </p>

          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{
              backgroundColor: "#FAFAF8",
              borderColor: "#3C4A32",
            }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              Why Self-Deprecation Works
            </h4>
            <div className="space-y-3 text-sm" style={{ color: "#5C5C54" }}>
              <p>
                <strong>It acknowledges reality.</strong> Pretending a weakness
                does not exist makes you look delusional. Acknowledging it makes
                you look honest.
              </p>
              <p>
                <strong>It removes the weapon.</strong> Your opponent cannot
                attack what you have already claimed. By joking about your
                weakness first, you neutralize it.
              </p>
              <p>
                <strong>It shows confidence.</strong> Someone who can laugh at
                themselves appears secure. The audience reads this as strength,
                not weakness.
              </p>
              <p>
                <strong>It builds connection.</strong> Vulnerability, expressed
                with humor, is endearing. The audience feels closer to you.
              </p>
            </div>
          </div>

          {/* Section 5: When Humor Backfires */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Dangers of Bad Timing
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Humor that fails is worse than no humor at all. Hasan warns against
            these common mistakes:
          </p>

          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{
              backgroundColor: "#FAFAF8",
              borderColor: "#B8860B",
            }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              Humor Pitfalls
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
              <li>
                <strong>Punching down:</strong> Jokes at the expense of
                vulnerable groups make you look cruel, not clever.
              </li>
              <li>
                <strong>Forcing it:</strong> A joke that does not fit the moment
                sounds rehearsed and desperate.
              </li>
              <li>
                <strong>Wrong tone for context:</strong> Joking about serious
                topics at serious moments makes you seem callous.
              </li>
              <li>
                <strong>Laughing at your own joke:</strong> If you laugh before
                the audience does, you undercut the impact.
              </li>
              <li>
                <strong>Too much humor:</strong> Overusing jokes makes you seem
                unserious. Humor works because it is unexpected.
              </li>
            </ul>
          </div>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            This is why practice matters. In live conditions, you learn which
            jokes land and which fall flat. You develop a sense for the room's
            temperature and what they will tolerate.
          </p>

          {/* Section 6: Expected Results */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            What Changes After Practice
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            After practicing humor deployment across multiple debates, you will
            notice:
          </p>

          <div className="my-6 grid grid-cols-2 gap-4">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Quicker Wit
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                The more you practice, the faster humorous responses come. What
                felt forced becomes natural.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Better Timing
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You develop an instinct for when the room is ready for a joke
                and when seriousness is required.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Reduced Fear
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Knowing you have defusing lines ready changes how you feel about
                attacks. You almost welcome them.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Audience Connection
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You start to feel the room responding to you. Laughter builds a
                bond that logic alone cannot create.
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
            Reagan neutralized his greatest weakness with a single joke. The
            attack that should have defined the debate became a moment of
            triumph. That is the power of humor deployed at the right moment
            with the right delivery.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            DebateClub trains this skill by giving you prepared humor options
            and opponents who create tense moments for you to defuse. Your
            post-debate analysis evaluates when you used humor effectively and
            when you missed opportunities. Over time, wit under pressure becomes
            instinct.
          </p>

          <p
            className="mt-4 text-lg font-medium leading-relaxed"
            style={{ color: "#3A3A35" }}
          >
            Tension builds. Attacks land. But laughter? Laughter wins the room.
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
              Ready to Sharpen Your Wit?
            </h3>
            <p className="mb-6" style={{ color: "#C8C8B8" }}>
              Practice landing humor under pressure with opponents who create
              tense moments for you to defuse.
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
              to="/blog/land-the-closer"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous: Land the Closer
            </Link>
            <Link
              to="/blog/make-it-stick"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              Next: Make It Stick
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
