import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Shield, Check, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/blog/own-your-weaknesses")({
  head: () => ({
    meta: [
      {
        title:
          "Preemption: Admit Your Weakness Before They Attack | DebateClub",
      },
      {
        name: "description",
        content:
          "Obama gave a 37-minute speech about his pastor before his opponent could weaponize it. The preemption technique from Mehdi Hasan's Win Every Argument.",
      },
      {
        property: "og:title",
        content:
          "Preemption: Admit Your Weakness Before They Attack | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Obama gave a 37-minute speech about his pastor before his opponent could weaponize it. The preemption technique from Mehdi Hasan's Win Every Argument.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: OwnYourWeaknessesArticle,
});

/**
 * Blog article: Own Your Weaknesses technique deep dive.
 * Explores Mehdi Hasan's preemption strategy from "Win Every Argument"
 * and how DebateClub trains users to neutralize attacks before they land.
 */
function OwnYourWeaknessesArticle() {
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
            Strategic Concession
          </span>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Own Your Weaknesses: The Preemption Principle
          </h1>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            8 min read · Technique 11 of 12
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
            In 2008, Barack Obama faced a political crisis. Videos of his
            pastor, Jeremiah Wright, making inflammatory statements threatened
            to derail his campaign. Obama could have distanced himself, offered
            denials, or hoped the story would fade. Instead, he gave a 37-minute
            speech in Philadelphia where he acknowledged the controversy
            head-on, explained his relationship with Wright, and broadened the
            conversation to race in America. The speech did not end the
            controversy. It transcended it.
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            Mehdi Hasan calls this technique "preemption" in "Win Every
            Argument." The principle is counterintuitive:{" "}
            <strong>
              acknowledge your weakness before your opponent can weaponize it
            </strong>
            . When you own the flaw first, you control the framing. You choose
            how it gets discussed. And paradoxically, you build credibility by
            showing you have nothing to hide.
          </p>

          {/* Section 1: Why Preemption Works */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Psychology of Getting There First
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Mehdi Hasan explains why preemption is so effective:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  It Disarms the Attack
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                When your opponent prepares to hit you with a weakness, they
                expect you to deny or deflect. When you acknowledge it first,
                their prepared attack has nowhere to land. You have already
                absorbed the blow on your own terms.
              </p>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Check className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  It Builds Credibility
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Audiences are suspicious of people who seem perfect. When you
                admit a flaw, you signal honesty. "If they are willing to admit
                that, they must be telling the truth about everything else."
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  It Controls the Frame
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                When your opponent raises your weakness, they frame it as a
                fatal flaw. When you raise it first, you frame it as a minor
                issue you have already addressed. The first framing usually
                wins.
              </p>
            </div>
          </div>

          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "Preemption is the rhetorical equivalent of a vaccine: a small dose
            of the disease to build immunity against the full attack."
            <span className="mt-2 block text-sm not-italic">
              - Mehdi Hasan, "Win Every Argument"
            </span>
          </blockquote>

          {/* Section 2: The Preemption Formula */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Mehdi Hasan's Four-Step Preemption
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Mehdi Hasan outlines a specific structure for effective preemption:
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
                  State the weakness plainly. No hedging, no minimizing. "I know
                  some of you are thinking about my vote on X" or "Before my
                  opponent brings this up..."
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
                  Explain (Briefly)
                </h4>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Provide context without making excuses. "Here is why that
                  happened..." Keep it short. Long explanations sound defensive.
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
                  Show Growth or Learning
                </h4>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Demonstrate what you learned or how you have changed. "That
                  experience taught me..." This transforms a weakness into
                  evidence of wisdom.
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
                4
              </div>
              <div>
                <h4 className="mb-1 font-bold" style={{ color: "#3C4A32" }}>
                  Pivot to Strength
                </h4>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Redirect to your strongest ground. "And that is exactly why I
                  now believe..." The preemption is a setup for your best
                  argument.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: When to Preempt */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Knowing What to Preempt
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Not every weakness needs preemption. Mehdi Hasan advises preempting
            only when:
          </p>

          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{
              backgroundColor: "#FAFAF8",
              borderColor: "#3C4A32",
            }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              When to Preempt
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
              <li>
                <strong>It is already known:</strong> If the audience knows
                about your weakness, address it. Ignoring the elephant makes you
                look evasive.
              </li>
              <li>
                <strong>Your opponent will definitely use it:</strong> If the
                attack is coming, get there first. Control the framing.
              </li>
              <li>
                <strong>You have a good pivot:</strong> Only preempt if you can
                turn the weakness into a strength. Otherwise, you are just
                highlighting a flaw.
              </li>
              <li>
                <strong>The weakness is fixable or learnable:</strong> Past
                mistakes you learned from are preemptable. Ongoing fundamental
                flaws are not.
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
              When NOT to Preempt
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
              <li>
                <strong>No one knows about it:</strong> Do not volunteer
                weaknesses your opponent has not discovered.
              </li>
              <li>
                <strong>It is truly indefensible:</strong> Some flaws cannot be
                spun. Preempting them just draws attention.
              </li>
              <li>
                <strong>You cannot pivot convincingly:</strong> If you lack a
                good "and that is why..." the preemption falls flat.
              </li>
            </ul>
          </div>

          {/* Section 4: How DebateClub Trains This */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            How DebateClub Trains Preemption
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Preemption requires knowing your vulnerabilities in advance and
            having pivot language ready. DebateClub builds this into your
            preparation:
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
                Preemption Training Pipeline
              </h4>
            </div>
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <pre className="whitespace-pre-wrap">
                {`┌──────────────────────────────────────┐
│  PREP: VULNERABILITY MAPPING         │
│                                      │
│  Your prep materials identify:       │
│                                      │
│  • Likely attacks on your position   │
│  • Weaknesses in your evidence       │
│  • Past statements that could be     │
│    used against you                  │
│  • Gaps in your expertise            │
│                                      │
│  For each, you get:                  │
│  • Preemption language               │
│  • Pivot phrases to strength         │
│  • Timing guidance (early vs. save)  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  DURING DEBATE                       │
│                                      │
│  Your opponent behavior includes:    │
│                                      │
│  • Building toward attacks you can   │
│    preempt if you act quickly        │
│                                      │
│  • Testing whether you acknowledge   │
│    weaknesses or dodge them          │
│                                      │
│  • Rewarding honest preemption with  │
│    reduced follow-up attacks         │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  POST-DEBATE ANALYSIS                │
│                                      │
│  Your coaching evaluates:            │
│                                      │
│  • Did you preempt known weaknesses? │
│  • Did preemptions include pivots?   │
│  • Did you over-preempt (volunteer   │
│    weaknesses no one knew about)?    │
│  • Did you time preemptions well?    │
└──────────────────────────────────────┘`}
              </pre>
            </div>
          </div>

          {/* Section 5: Example in Action */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Preemption in Action
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Here is how Mehdi Hasan's preemption formula looks in practice:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div className="mb-4">
              <span
                className="inline-block rounded-md px-2 py-1 text-xs font-medium"
                style={{ backgroundColor: "#FFE4E4", color: "#7C2D2D" }}
              >
                Known Weakness
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                You previously supported a policy you now oppose.
              </p>
            </div>
            <div className="mb-4">
              <span
                className="inline-block rounded-md px-2 py-1 text-xs font-medium"
                style={{ backgroundColor: "#FFE4E4", color: "#7C2D2D" }}
              >
                Bad Response (Waiting to be attacked)
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                Wait for opponent to bring it up, then scramble to explain.
              </p>
              <p className="mt-2 text-sm" style={{ color: "#888880" }}>
                You look caught. The opponent frames it as hypocrisy.
              </p>
            </div>
            <div>
              <span
                className="inline-block rounded-md px-2 py-1 text-xs font-medium"
                style={{ backgroundColor: "#E4FFE4", color: "#2D7C2D" }}
              >
                Good Response (Preemption)
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "Before we go further, I want to address something. Yes, I
                supported this policy five years ago. I was wrong. Here is what
                I did not understand then that I understand now: [specific
                insight]. That experience is exactly why I am now the strongest
                voice against it. I learned what my opponent still refuses to
                see."
              </p>
              <p className="mt-2 text-sm" style={{ color: "#888880" }}>
                You frame the weakness as growth, then pivot to attack.
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
            After practicing preemption across multiple debates, you will
            notice:
          </p>

          <div className="my-6 grid grid-cols-2 gap-4">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Reduced Anxiety
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                When you know you will address weaknesses first, you stop
                dreading the attack. The fear of being exposed disappears.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Better Pivots
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Your "and that is why..." language becomes natural. You
                instinctively turn admissions into attacks.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Increased Trust
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Audiences respond to honesty. Your willingness to acknowledge
                flaws makes your claims more believable.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Opponent Frustration
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                When their prepared attacks have already been addressed, your
                opponent must improvise. You have taken their best weapon.
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
            Barack Obama could have spent months denying his connection to
            Jeremiah Wright. Instead, he acknowledged it, explained it, and
            pivoted to a broader conversation he could lead. That is the power
            of preemption: you choose the battlefield.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            DebateClub trains this skill by mapping your vulnerabilities in
            advance and giving you preemption language with built-in pivots.
            Your AI opponent tests whether you address weaknesses proactively or
            wait to be attacked. Your analysis shows when preemption worked and
            when you missed opportunities.
          </p>

          <p
            className="mt-4 text-lg font-medium leading-relaxed"
            style={{ color: "#3A3A35" }}
          >
            Own it before they can use it. Then make it your strength.
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
              Ready to Turn Weakness Into Strength?
            </h3>
            <p className="mb-6" style={{ color: "#C8C8B8" }}>
              Get prep materials that identify your vulnerabilities and give you
              preemption language to neutralize attacks.
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
              to="/blog/cut-through-the-noise"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous: Cut Through the Noise
            </Link>
            <Link
              to="/blog/stick-the-landing"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              Next: Stick the Landing
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
