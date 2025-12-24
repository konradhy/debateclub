import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw, Shield, Swords } from "lucide-react";

export const Route = createFileRoute("/blog/flip-their-momentum")({
  head: () => ({
    meta: [
      {
        title:
          "The Judo Move: Use Their Strength Against Them | DebateClub",
      },
      {
        name: "description",
        content:
          "Concede, preempt, reframe. Yield strategically, then redirect their momentum. Three rhetorical moves that flip losing positions.",
      },
      {
        property: "og:title",
        content:
          "The Judo Move: Use Their Strength Against Them | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Concede, preempt, reframe. Yield strategically, then redirect their momentum. Three rhetorical moves that flip losing positions.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: FlipTheirMomentumArticle,
});

/**
 * Blog article: Flip Their Momentum technique deep dive.
 * Explores strategic concession and the "judo move" from Mehdi Hasan's
 * "Win Every Argument" and how DebateClub trains users to master it.
 */
function FlipTheirMomentumArticle() {
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
            style={{ backgroundColor: "#E8DFC8", color: "#5C5444" }}
          >
            The Judo Move
          </span>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Flip Their Momentum: The Art of Strategic Concession
          </h1>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            8 min read · Technique 5 of 12
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
            In judo, the best throws do not rely on brute strength. They use the
            opponent's force against them. The opponent lunges forward and
            suddenly finds themselves on the mat, thrown by their own momentum.
            Mehdi Hasan applies this principle to debate with what he calls the
            "concession and pivot."
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            Most debaters think conceding any point is weakness. They fight for
            every inch, even when the ground is indefensible. Hasan argues this
            is exactly wrong.{" "}
            <strong>Strategic concession is a power move</strong>. When you
            yield ground that costs you nothing and use their forward motion to
            redirect to your strongest argument, you appear reasonable while
            leaving your opponent off balance.
          </p>

          {/* Section 1: Why Concession Works */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Psychology of the Concession
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Hasan identifies several reasons why strategic concession is so
            effective:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  It Builds Credibility
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                When you acknowledge a valid point, the audience sees you as
                fair-minded rather than partisan. This makes them more likely to
                trust you on contested points.
              </p>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <RotateCcw className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  It Defuses Their Momentum
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                When you concede, your opponent has nothing to push against.
                They prepared to fight and now must recalibrate. This brief
                confusion is your window to redirect.
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Swords className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  It Sets Up the Pivot
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                The concession is never the end. It is a setup. "Yes, X is true.
                But what really matters is Y." The pivot reframes the entire
                debate on your terms.
              </p>
            </div>
          </div>

          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "Concession is not surrender. It is strategic retreat to better
            ground."
            <span className="mt-2 block text-sm not-italic">
              - Mehdi Hasan, "Win Every Argument"
            </span>
          </blockquote>

          {/* Section 2: The Concession-Pivot Formula */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Three-Part Formula
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Hasan's concession technique follows a consistent structure:
          </p>

          <div className="my-6 grid gap-4">
            <div
              className="flex items-start gap-4 rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <div
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold"
                style={{ backgroundColor: "#3C4A32", color: "#FAFAF8" }}
              >
                1
              </div>
              <div>
                <h4 className="mb-1 font-bold" style={{ color: "#3C4A32" }}>
                  Acknowledge Clearly
                </h4>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  "You're absolutely right that..." or "I agree that..." Make
                  the concession explicit and genuine. Half-concessions sound
                  evasive and undermine the effect.
                </p>
              </div>
            </div>
            <div
              className="flex items-start gap-4 rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <div
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold"
                style={{ backgroundColor: "#3C4A32", color: "#FAFAF8" }}
              >
                2
              </div>
              <div>
                <h4 className="mb-1 font-bold" style={{ color: "#3C4A32" }}>
                  Bridge With "But"
                </h4>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  "But that's not the central question here..." or "But what
                  that misses is..." The bridge word signals that you are about
                  to redirect, not simply agree.
                </p>
              </div>
            </div>
            <div
              className="flex items-start gap-4 rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <div
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold"
                style={{ backgroundColor: "#3C4A32", color: "#FAFAF8" }}
              >
                3
              </div>
              <div>
                <h4 className="mb-1 font-bold" style={{ color: "#3C4A32" }}>
                  Pivot to Your Ground
                </h4>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Immediately move to your strongest point. The pivot should
                  land on ground where you are strongest and they are weakest.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: What to Concede */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Knowing What to Give Up
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Not all concessions are strategic. The skill is in identifying what
            costs you nothing:
          </p>

          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{
              backgroundColor: "#FAFAF8",
              borderColor: "#3C4A32",
            }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              Safe Concessions
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
              <li>
                <strong>Obvious facts:</strong> If something is undeniably true,
                fighting it makes you look unreasonable.
              </li>
              <li>
                <strong>Peripheral points:</strong> Issues that do not affect
                your core argument. Let them have the edges.
              </li>
              <li>
                <strong>Shared premises:</strong> "We both want X. We disagree
                about how to get there."
              </li>
              <li>
                <strong>Past mistakes:</strong> If your side made an error, own
                it briefly and pivot to what should happen now.
              </li>
            </ul>
          </div>

          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{
              backgroundColor: "#FAFAF8",
              borderColor: "#B8860B",
            }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              Dangerous Concessions
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
              <li>
                <strong>Your core thesis:</strong> Never concede the foundation
                of your argument.
              </li>
              <li>
                <strong>Moral ground:</strong> Do not accept framing that makes
                you the villain.
              </li>
              <li>
                <strong>Key evidence:</strong> If they attack your receipts,
                defend them.
              </li>
              <li>
                <strong>Credibility points:</strong> Never accept that you are
                unqualified to speak.
              </li>
            </ul>
          </div>

          {/* Section 4: How DebateClub Trains This */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            How DebateClub Trains Strategic Concession
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The judo move is difficult to practice in isolation because it
            requires an opponent pushing hard enough to give you momentum to
            redirect. DebateClub creates these opportunities systematically:
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
                Concession Training Pipeline
              </h4>
            </div>
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <pre className="whitespace-pre-wrap">
                {`┌──────────────────────────────────────┐
│  PREP: CONCESSION PLANNING           │
│                                      │
│  Your prep materials include:        │
│                                      │
│  • "Safe Concessions" list: points   │
│    you can give up without damage    │
│                                      │
│  • "Pivot Phrases" for each one:     │
│    the exact bridge language to use  │
│                                      │
│  • "Target Ground": where you want   │
│    to redirect after each concession │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  DURING DEBATE: OPPONENT PRESSURE    │
│                                      │
│  Your AI opponent deliberately:      │
│                                      │
│  • Hammers on peripheral points to   │
│    see if you will waste time        │
│    defending indefensible ground     │
│                                      │
│  • Creates openings where concession │
│    and pivot would be devastating    │
│                                      │
│  • Tests whether you can yield       │
│    gracefully under pressure         │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  POST-DEBATE: ANALYSIS               │
│                                      │
│  Your coaching evaluates:            │
│                                      │
│  • Did you concede when you should   │
│    have? Or did you fight for every  │
│    inch and waste credibility?       │
│                                      │
│  • Did you pivot effectively? Or     │
│    did you concede and stop there?   │
│                                      │
│  • Were there opportunities for the  │
│    judo move that you missed?        │
└──────────────────────────────────────┘`}
              </pre>
            </div>
          </div>

          {/* Section 5: Example in Action */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Judo Move in Action
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Here is a real-world example of how the concession and pivot works:
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
                Opponent Attack
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "Your side supported the Iraq War. You have no credibility on
                foreign policy."
              </p>
            </div>
            <div className="mb-4">
              <span
                className="inline-block rounded-md px-2 py-1 text-xs font-medium"
                style={{ backgroundColor: "#FFE4E4", color: "#7C2D2D" }}
              >
                Weak Response (Fighting)
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "That's not fair. The intelligence at the time suggested... and
                besides, your side also..."
              </p>
              <p className="mt-2 text-sm" style={{ color: "#888880" }}>
                This response digs into indefensible ground and sounds
                defensive.
              </p>
            </div>
            <div>
              <span
                className="inline-block rounded-md px-2 py-1 text-xs font-medium"
                style={{ backgroundColor: "#E4FFE4", color: "#2D7C2D" }}
              >
                Strong Response (Judo Move)
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "You're right. Iraq was a mistake. I supported it and I was
                wrong. But the lesson from Iraq is exactly why we need to be
                cautious about this intervention. We learned the hard way.
                What's your excuse for repeating the same mistake?"
              </p>
              <p className="mt-2 text-sm" style={{ color: "#888880" }}>
                Concedes past error, uses it as proof of wisdom learned, pivots
                to attack opponent.
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
            After practicing the judo move across multiple debates, you will
            notice:
          </p>

          <div className="my-6 grid grid-cols-2 gap-4">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Reduced Defensiveness
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You stop instinctively fighting every point. You recognize when
                conceding is stronger than defending.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Smoother Redirects
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Your pivots become natural and conversational. The audience
                follows your logic without noticing the redirect.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Increased Credibility
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Audiences respond to fair-mindedness. Your concessions signal
                intellectual honesty.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Opponent Confusion
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                When you concede their point and immediately redirect, opponents
                often hesitate, unsure whether to celebrate or object.
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
            Fighting for every point is exhausting and counterproductive. It
            makes you look unreasonable and wastes time defending weak ground.
            Strategic concession is how you conserve energy, build credibility,
            and redirect the debate to where you are strongest.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            DebateClub trains this skill by giving you opponents who hammer
            peripheral points, creating opportunities to practice the judo move.
            Your prep materials identify safe concessions in advance. Your
            post-debate analysis evaluates whether you used them effectively.
          </p>

          <p
            className="mt-4 text-lg font-medium leading-relaxed"
            style={{ color: "#3A3A35" }}
          >
            Yield the ground that costs you nothing. Redirect to where you win.
            That is the judo move.
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
              Ready to Master the Pivot?
            </h3>
            <p className="mb-6" style={{ color: "#C8C8B8" }}>
              Practice against opponents who create opportunities for strategic
              concession. Learn when to yield and when to hold.
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
              to="/blog/spot-the-weakness"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous: Spot the Weakness
            </Link>
            <Link
              to="/blog/land-the-closer"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              Next: Land the Closer
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
