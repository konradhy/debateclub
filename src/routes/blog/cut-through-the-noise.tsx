import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Filter, Scissors, Target } from "lucide-react";

export const Route = createFileRoute("/blog/cut-through-the-noise")({
  component: CutThroughTheNoiseArticle,
});

/**
 * Blog article: Cut Through the Noise technique deep dive.
 * Explores Mehdi Hasan's Chapter 7: "Beware the Gish Gallop" and how
 * DebateClub trains users to defeat information overload tactics.
 */
function CutThroughTheNoiseArticle() {
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
            BS Detection
          </span>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Cut Through the Noise: Defeating the Firehose of Falsehood
          </h1>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            9 min read · Technique 10 of 12
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
            In 1994, a creationist named Duane Gish developed a debate tactic so
            effective it was named after him. He would rattle off dozens of
            arguments, half-truths, and misleading claims in rapid succession.
            His opponents would try to address each one and run out of time.
            Meanwhile, the audience assumed unanswered points must be valid. The
            "Gish Gallop" is still used today by anyone who wants to win through
            volume rather than validity.
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            Mehdi Hasan devotes Chapter 7 of "Win Every Argument" to this
            tactic.
            <strong>
              {" "}
              The Gish Gallop is designed to overwhelm, not persuade.
            </strong>{" "}
            The only way to beat it is to recognize what is happening and refuse
            to play along.
          </p>

          {/* Section 1: Recognizing the Gish Gallop */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            How to Recognize Information Overload Tactics
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Hasan identifies the telltale signs of a Gish Gallop:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Filter className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  Quantity Over Quality
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                The opponent throws out many arguments rapidly, not caring if
                any single one is strong. The goal is volume, not validity.
              </p>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Filter className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  Rapid Pivoting
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                When you start to address one point, they immediately jump to
                another. They never let any single claim get examined closely.
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Filter className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  No Depth on Anything
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Each claim is stated but never developed. There is no evidence,
                no elaboration, no defense. Just assertion after assertion.
              </p>
            </div>
          </div>

          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "The amount of energy required to refute BS is an order of magnitude
            larger than to produce it. This is Brandolini's Law, and it's the
            secret weapon of the Gish Galloper."
            <span className="mt-2 block text-sm not-italic">
              - Mehdi Hasan, "Win Every Argument"
            </span>
          </blockquote>

          {/* Section 2: The Counter-Strategy */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Hasan Counter-Strategy
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Hasan's approach to the Gish Gallop is surgical, not comprehensive.
            Do not try to address every point. Instead:
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
                  Name the Tactic
                </h4>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  "My opponent just made ten claims in thirty seconds. That's
                  called a Gish Gallop. It's designed to overwhelm rather than
                  persuade. Let me show you why it doesn't work."
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
                  Pick the Weakest Claim
                </h4>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Find the most obviously false or easily refuted point. Destroy
                  it thoroughly with evidence. This casts doubt on everything
                  else.
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
                  Generalize the Refutation
                </h4>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  "If they got that so obviously wrong, what does that tell you
                  about the other nine claims they didn't bother to support with
                  evidence?"
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
                  Demand Depth
                </h4>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  "Let's stop and examine just one of those claims properly.
                  Which one would you like to defend with actual evidence?"
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: How DebateClub Trains This */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            How DebateClub Trains Gish Gallop Defense
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Defending against information overload requires practice under
            realistic conditions. DebateClub trains this skill by exposing you
            to Gish Gallop tactics in controlled settings:
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
                Gish Gallop Defense Training
              </h4>
            </div>
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <pre className="whitespace-pre-wrap">
                {`┌──────────────────────────────────────┐
│  OPPONENT BEHAVIOR                   │
│                                      │
│  Your AI opponent sometimes:         │
│                                      │
│  • Deploys rapid-fire claims without │
│    supporting evidence               │
│                                      │
│  • Pivots quickly when you start to  │
│    address any single point          │
│                                      │
│  • Throws out half-truths and        │
│    misleading statistics             │
│                                      │
│  • Forces you to choose which claims │
│    to address and which to ignore    │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  YOUR TRAINING RESPONSE              │
│                                      │
│  You practice:                       │
│                                      │
│  • Recognizing the tactic mid-flow   │
│                                      │
│  • Selecting the weakest claim to    │
│    destroy with evidence             │
│                                      │
│  • Naming the tactic for the         │
│    audience without sounding         │
│    defensive                         │
│                                      │
│  • Demanding depth before moving on  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  POST-DEBATE ANALYSIS                │
│                                      │
│  Your coaching evaluates:            │
│                                      │
│  • Did you get sucked into trying    │
│    to refute everything?             │
│                                      │
│  • Did you pick the right claim to   │
│    focus on?                         │
│                                      │
│  • Did you successfully cast doubt   │
│    on the opponent's credibility?    │
│                                      │
│  • Did you stay calm under the       │
│    firehose of claims?               │
└──────────────────────────────────────┘`}
              </pre>
            </div>
          </div>

          {/* Section 4: The Surgical Approach */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Surgical Dismantling in Practice
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Here is how the surgical approach looks in action:
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
                Gish Gallop Attack
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "Climate change is a hoax. The earth has been cooling, not
                warming. CO2 is good for plants. Scientists were predicting an
                ice age in the 1970s. The models are always wrong. Volcanoes
                produce more CO2 than humans. It's the sun. Water vapor is the
                real greenhouse gas. The polar bears are fine..."
              </p>
            </div>
            <div className="mb-4">
              <span
                className="inline-block rounded-md px-2 py-1 text-xs font-medium"
                style={{ backgroundColor: "#FFE4E4", color: "#7C2D2D" }}
              >
                Bad Response (Taking the Bait)
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "Actually, the earth isn't cooling, it's warming, and the 1970s
                ice age thing was never scientific consensus, and CO2 levels are
                actually..."
              </p>
              <p className="mt-2 text-sm" style={{ color: "#888880" }}>
                You run out of time, look defensive, and the audience assumes
                the other points were valid.
              </p>
            </div>
            <div>
              <span
                className="inline-block rounded-md px-2 py-1 text-xs font-medium"
                style={{ backgroundColor: "#E4FFE4", color: "#2D7C2D" }}
              >
                Good Response (Surgical)
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "That was a lot of claims. Let me focus on one: volcanoes
                produce more CO2 than humans. According to the US Geological
                Survey, human activities produce 60 times more CO2 than
                volcanoes annually. That's not a matter of opinion. It's
                measured. If my opponent got that so completely wrong, what does
                that tell you about the rest of their list?"
              </p>
              <p className="mt-2 text-sm" style={{ color: "#888880" }}>
                One devastating fact discredits the entire barrage.
              </p>
            </div>
          </div>

          {/* Section 5: The Quick Reference Panel */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Your Receipts: The Anti-Gallop Arsenal
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            To surgically dismantle a Gish Gallop, you need evidence at your
            fingertips. DebateClub's prep materials and Quick Reference panel
            give you the receipts you need:
          </p>

          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{
              backgroundColor: "#FAFAF8",
              borderColor: "#3C4A32",
            }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              How Receipts Defeat the Gallop
            </h4>
            <div className="space-y-3 text-sm" style={{ color: "#5C5C54" }}>
              <div className="flex items-start gap-2">
                <Scissors
                  className="mt-0.5 h-4 w-4"
                  style={{ color: "#3C4A32" }}
                />
                <span>
                  <strong>Quick Access:</strong> Your key evidence is organized
                  for rapid deployment. You can cut through the noise in
                  seconds.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Target
                  className="mt-0.5 h-4 w-4"
                  style={{ color: "#3C4A32" }}
                />
                <span>
                  <strong>Targeted Facts:</strong> Each receipt includes
                  "deployment guidance" for when to use it. You know which claim
                  it destroys.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Filter
                  className="mt-0.5 h-4 w-4"
                  style={{ color: "#3C4A32" }}
                />
                <span>
                  <strong>Source Citation:</strong> Your receipts include
                  credible sources. When you say "According to..." the audience
                  trusts you.
                </span>
              </div>
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
            After practicing Gish Gallop defense across multiple debates, you
            will notice:
          </p>

          <div className="my-6 grid grid-cols-2 gap-4">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Pattern Recognition
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You start recognizing information overload tactics immediately.
                The firehose no longer catches you off guard.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Calm Under Fire
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You stop feeling overwhelmed by rapid claims. You know you only
                need to destroy one of them.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Better Selection
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You develop an instinct for which claim is the weakest link and
                how to target it for maximum effect.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Audience Control
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You learn to reframe the debate for the audience, showing them
                why volume means nothing without validity.
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
            The Gish Gallop works because it exploits a natural instinct: we
            want to address every claim. But that instinct is a trap. The only
            way to win against information overload is to refuse to play the
            volume game.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            DebateClub trains you to recognize the tactic, stay calm, pick the
            weakest link, and destroy it with evidence. One surgical strike is
            worth more than a dozen incomplete rebuttals. Your analysis shows
            you how effectively you cut through the noise.
          </p>

          <p
            className="mt-4 text-lg font-medium leading-relaxed"
            style={{ color: "#3A3A35" }}
          >
            Quantity is not quality. Find the weak point. One kill beats ten
            wounds.
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
              Ready to Stop the Firehose?
            </h3>
            <p className="mb-6" style={{ color: "#C8C8B8" }}>
              Practice against opponents who use information overload tactics
              and learn to cut through the noise.
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
              to="/blog/ask-the-killer-question"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous: Ask the Killer Question
            </Link>
            <Link
              to="/blog/own-your-weaknesses"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              Next: Own Your Weaknesses
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
