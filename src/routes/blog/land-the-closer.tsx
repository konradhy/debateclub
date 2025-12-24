import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Zap, Clock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/blog/land-the-closer")({
  head: () => ({
    meta: [
      { title: "How to Deliver the Perfect Zinger | DebateClub" },
      {
        name: "description",
        content:
          "\"Senator, you're no Jack Kennedy.\" The best one-liners are prepared, then delivered like they just occurred to you. From Mehdi Hasan's Win Every Argument.",
      },
      {
        property: "og:title",
        content: "How to Deliver the Perfect Zinger | DebateClub",
      },
      {
        property: "og:description",
        content:
          "\"Senator, you're no Jack Kennedy.\" The best one-liners are prepared, then delivered like they just occurred to you. From Mehdi Hasan's Win Every Argument.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: LandTheCloserArticle,
});

/**
 * Blog article: Land the Closer technique deep dive.
 * Explores Mehdi Hasan's Chapter 5: "The One-Liner" and how
 * DebateClub trains users to craft and deploy devastating zingers.
 */
function LandTheCloserArticle() {
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
            The Zinger
          </span>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Land the Closer: Crafting Mic-Drop Moments
          </h1>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            9 min read · Technique 6 of 12
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
            In the 1988 vice presidential debate, Lloyd Bentsen delivered what
            may be the most famous zinger in American political history. Dan
            Quayle had compared himself to John F. Kennedy. Bentsen paused,
            looked directly at Quayle, and said: "Senator, I served with Jack
            Kennedy. I knew Jack Kennedy. Jack Kennedy was a friend of mine.
            Senator, you're no Jack Kennedy."
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            The line was devastating. But here is what most people do not know:
            Bentsen had practiced it. His team anticipated Quayle would invoke
            Kennedy, and they prepared the response in advance. The delivery
            looked spontaneous. The preparation was anything but. Mehdi Hasan
            devotes Chapter 5 of "Win Every Argument" to this art:{" "}
            <strong>the zinger is prepared, but it must feel improvised</strong>
            .
          </p>

          {/* Section 1: What Makes a Great Zinger */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Anatomy of a Zinger
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Mehdi Hasan identifies several elements that make a one-liner land:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  Brevity
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                The best zingers are short. They punch and stop. Long
                explanations dilute the impact. If you need more than two
                sentences, it is not a zinger.
              </p>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  Surprise
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                The audience does not see it coming. The zinger subverts
                expectations, flips a frame, or turns the opponent's words
                against them in an unexpected way.
              </p>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  Timing
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Delivered too early, a zinger has no setup. Delivered too late,
                the moment has passed. The best zingers come at the peak of
                tension, right after the opponent has overcommitted.
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  Confidence
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                The delivery must be crisp. No hesitation, no self-doubt. A
                zinger mumbled is a zinger wasted. The audience needs to feel
                your certainty.
              </p>
            </div>
          </div>

          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "People don't remember long, rambling, caveated points. They
            remember the tight, funny, biting one-liner."
            <span className="mt-2 block text-sm not-italic">
              - Mehdi Hasan, "Win Every Argument"
            </span>
          </blockquote>

          {/* Section 2: Types of Zingers */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Zinger Toolkit
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Mehdi Hasan catalogs several types of zingers that work in different
            situations:
          </p>

          <div className="my-6 grid gap-4">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                The Turnaround
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Using your opponent's words or logic against them. "You say X,
                but you just argued Y. Which is it?"
              </p>
              <p className="mt-2 text-sm italic" style={{ color: "#888880" }}>
                Example: "You accuse me of flip-flopping? You changed positions
                three times in this debate alone."
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                The Comparison
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Drawing a vivid parallel that exposes absurdity. Make the
                comparison memorable and concrete.
              </p>
              <p className="mt-2 text-sm italic" style={{ color: "#888880" }}>
                Example: "That's like a arsonist offering to join the fire
                department."
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                The Understatement
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Saying less than expected for comic or dramatic effect. The gap
                between what you say and what the audience knows creates impact.
              </p>
              <p className="mt-2 text-sm italic" style={{ color: "#888880" }}>
                Example: "I suppose we have a slight disagreement on the facts."
                (After opponent made multiple false claims)
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                The Quote Callback
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Referencing something your opponent said earlier in the debate
                that now looks foolish in light of new information.
              </p>
              <p className="mt-2 text-sm italic" style={{ color: "#888880" }}>
                Example: "Fifteen minutes ago you told us you'd never heard of
                this report. Now you're quoting from page 47."
              </p>
            </div>
          </div>

          {/* Section 3: How DebateClub Trains This */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            How DebateClub Trains the Zinger
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The challenge with zingers is that they require both preparation and
            spontaneity. You must have material ready but deploy it naturally.
            DebateClub trains this through a three-phase approach:
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
                Zinger Training Pipeline
              </h4>
            </div>
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <pre className="whitespace-pre-wrap">
                {`┌──────────────────────────────────────┐
│  PHASE 1: PREP GENERATION            │
│                                      │
│  Your prep materials include a       │
│  "Zingers" section with:             │
│                                      │
│  • 3-5 pre-crafted one-liners        │
│    tailored to your topic            │
│                                      │
│  • Setup notes: "Use when opponent   │
│    makes X claim"                    │
│                                      │
│  • Delivery guidance: pacing, tone,  │
│    where to pause for effect         │
│                                      │
│  • Fallback lines if the primary     │
│    zinger doesn't fit                │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  PHASE 2: LIVE DEBATE OPPORTUNITIES  │
│                                      │
│  Your AI opponent deliberately:      │
│                                      │
│  • Creates setups for your prepared  │
│    zingers to land                   │
│                                      │
│  • Overcommits to positions that     │
│    invite devastating responses      │
│                                      │
│  • Leaves openings for turnarounds   │
│    and quote callbacks               │
│                                      │
│  Quick Reference panel keeps your    │
│  zingers accessible mid-debate       │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  PHASE 3: POST-DEBATE SCORING        │
│                                      │
│  Your coaching evaluates:            │
│                                      │
│  • Did you deploy zingers at the     │
│    right moment for maximum impact?  │
│                                      │
│  • Did you deliver with confidence   │
│    or did you undercut yourself?     │
│                                      │
│  • Were there opportunities you      │
│    missed for a one-liner?           │
│                                      │
│  • Did zingers land or fall flat?    │
└──────────────────────────────────────┘`}
              </pre>
            </div>
          </div>

          {/* Section 4: The Preparation Paradox */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Why Preparation Enables Spontaneity
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            There is a paradox at the heart of the zinger: the best ones sound
            improvised, but the best debaters prepare them in advance. Why?
          </p>

          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{
              backgroundColor: "#FAFAF8",
              borderColor: "#3C4A32",
            }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              The Prepared Zinger Advantage
            </h4>
            <div className="space-y-3 text-sm" style={{ color: "#5C5C54" }}>
              <p>
                <strong>Under pressure, creativity drops.</strong> When your
                heart is racing and you are thinking about six things at once,
                your brain cannot simultaneously craft clever wordplay.
              </p>
              <p>
                <strong>Prepared lines can be refined.</strong> You have time to
                workshop the wording, test it for tone, ensure it does not
                backfire.
              </p>
              <p>
                <strong>You can practice delivery.</strong> Knowing the words
                lets you focus on timing, eye contact, and vocal emphasis.
              </p>
              <p>
                <strong>You anticipate the setup.</strong> If you know what your
                opponent is likely to argue, you can prepare the counter and
                wait for the moment.
              </p>
            </div>
          </div>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            This is exactly how Lloyd Bentsen worked. His team knew Quayle would
            probably invoke Kennedy. They wrote the line, Bentsen rehearsed it,
            and when the moment came, he delivered it perfectly. The audience
            thought it was brilliant improvisation. It was brilliant
            preparation.
          </p>

          {/* Section 5: The Quick Reference Panel */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Your Zingers, One Tap Away
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            During a live debate, you cannot be scrolling through notes looking
            for the perfect line. DebateClub's Quick Reference panel keeps your
            zingers organized and accessible:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              Zinger Card Example
            </h4>
            <div
              className="rounded-lg border-l-4 p-4"
              style={{ backgroundColor: "#fff", borderColor: "#A8B08C" }}
            >
              <p
                className="mb-2 text-xs uppercase"
                style={{ color: "#888880" }}
              >
                Turnaround Zinger
              </p>
              <p className="mb-2 font-medium" style={{ color: "#2A2A20" }}>
                "You call that a plan? That's a press release with delusions of
                grandeur."
              </p>
              <p className="mb-2 text-sm" style={{ color: "#5C5C54" }}>
                <strong>Setup:</strong> When opponent presents vague proposal
                with no specifics
              </p>
              <p className="text-sm italic" style={{ color: "#3C4A32" }}>
                <strong>Delivery:</strong> Pause before "delusions." Let the
                comparison land.
              </p>
            </div>
          </div>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            Each zinger includes both the line itself and guidance on when and
            how to deploy it. You are never scrambling for words when the moment
            arrives.
          </p>

          {/* Section 6: Expected Results */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            What Changes After Practice
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            After practicing zinger deployment across multiple debates, you will
            notice:
          </p>

          <div className="my-6 grid grid-cols-2 gap-4">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Better Timing
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You develop an instinct for when a zinger will land hardest,
                waiting for the opponent to fully commit before striking.
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
                Your prepared lines start to sound spontaneous because you have
                practiced the transitions that make them feel organic.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Confidence Boost
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Knowing you have devastating lines ready changes how you carry
                yourself. You argue from a position of verbal strength.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Improvisation Skills
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                The more zingers you practice, the more you internalize the
                patterns. Eventually, you start creating them in the moment.
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
            The zinger is not luck. It is preparation disguised as wit. The
            debaters who land mic-drop moments are not necessarily funnier or
            quicker than you. They have simply done the work of crafting lines
            in advance and practicing their delivery.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            DebateClub gives you prepared zingers for every debate. Your
            opponent creates opportunities to deploy them. Your post-debate
            analysis evaluates timing and delivery. Over time, what feels like
            natural wit becomes natural, because you have practiced it enough
            for it to become instinct.
          </p>

          <p
            className="mt-4 text-lg font-medium leading-relaxed"
            style={{ color: "#3A3A35" }}
          >
            Prepare the line. Wait for the setup. Land the closer.
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
              Ready to Craft Your Mic-Drop Moments?
            </h3>
            <p className="mb-6" style={{ color: "#C8C8B8" }}>
              Get prepared zingers for your next debate and practice landing
              them with perfect timing.
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
              to="/blog/flip-their-momentum"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous: Flip Their Momentum
            </Link>
            <Link
              to="/blog/defuse-with-humor"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              Next: Defuse with Humor
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
