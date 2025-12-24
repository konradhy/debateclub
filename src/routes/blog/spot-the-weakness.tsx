import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Target,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/blog/spot-the-weakness")({
  head: () => ({
    meta: [
      { title: "How to Spot Logical Fallacies in Real-Time | DebateClub" },
      {
        name: "description",
        content:
          "Straw men, false dilemmas, slippery slopes. Learn to catch bad arguments as they happen. From Mehdi Hasan's Win Every Argument.",
      },
      {
        property: "og:title",
        content: "How to Spot Logical Fallacies in Real-Time | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Straw men, false dilemmas, slippery slopes. Learn to catch bad arguments as they happen. From Mehdi Hasan's Win Every Argument.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: SpotTheWeaknessArticle,
});

/**
 * Blog article: Spot the Weakness technique deep dive.
 * Explores fallacy detection and critical analysis from "Win Every Argument"
 * and how DebateClub trains users to identify and exploit logical flaws.
 */
function SpotTheWeaknessArticle() {
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
            Critical Analysis
          </span>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Spot the Weakness: Detecting Fallacies in Real Time
          </h1>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            9 min read · Technique 4 of 12
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
            Every argument has a weak point. The question is whether you can
            find it before your opponent moves on. In live debate, you have
            seconds to identify a logical flaw, formulate a response, and
            deliver it convincingly. Most people freeze. They sense something is
            wrong but cannot articulate what. By the time they figure it out,
            the moment has passed.
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            Mehdi Hasan devotes significant attention in "Win Every Argument" to
            the skill of fallacy detection. Not as an academic exercise, but as
            a{" "}
            <strong>
              practical combat skill that can be trained through repetition
            </strong>
            . The goal is to develop an ear for bad logic the way a musician
            develops an ear for pitch.
          </p>

          {/* Section 1: Common Fallacies */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Fallacies You Will Encounter Most
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            While philosophers catalog dozens of logical fallacies, Mehdi Hasan
            focuses on the ones that appear most frequently in real-world
            debates:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle
                  className="h-4 w-4"
                  style={{ color: "#B8860B" }}
                />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  Ad Hominem
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Attacking the person instead of the argument. "You only say that
                because you work for a corporation." The speaker's background
                does not make their argument false.
              </p>
              <p
                className="mt-2 text-sm font-medium italic"
                style={{ color: "#3C4A32" }}
              >
                Counter: "My background is irrelevant to whether the argument is
                true. Address the argument."
              </p>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle
                  className="h-4 w-4"
                  style={{ color: "#B8860B" }}
                />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  Straw Man
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Misrepresenting your position to make it easier to attack. "So
                you want open borders?" when you argued for immigration reform.
                They are attacking a position you never took.
              </p>
              <p
                className="mt-2 text-sm font-medium italic"
                style={{ color: "#3C4A32" }}
              >
                Counter: "That is not my position. I said [actual position].
                Please respond to what I actually argued."
              </p>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle
                  className="h-4 w-4"
                  style={{ color: "#B8860B" }}
                />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  False Dilemma
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Presenting only two options when more exist. "Either we cut
                taxes or the economy collapses." Reality usually offers multiple
                paths.
              </p>
              <p
                className="mt-2 text-sm font-medium italic"
                style={{ color: "#3C4A32" }}
              >
                Counter: "Those are not the only two options. We could also
                [third option]."
              </p>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle
                  className="h-4 w-4"
                  style={{ color: "#B8860B" }}
                />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  Appeal to Authority
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Citing an expert outside their field of expertise. A celebrity
                endorsing a medical treatment, or a business leader opining on
                climate science.
              </p>
              <p
                className="mt-2 text-sm font-medium italic"
                style={{ color: "#3C4A32" }}
              >
                Counter: "Is that person an expert in this specific field? Their
                expertise is in [different area]."
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle
                  className="h-4 w-4"
                  style={{ color: "#B8860B" }}
                />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  Slippery Slope
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Claiming one step will inevitably lead to extreme consequences.
                "If we allow this, next thing you know..." without evidence that
                the chain of events is likely.
              </p>
              <p
                className="mt-2 text-sm font-medium italic"
                style={{ color: "#3C4A32" }}
              >
                Counter: "That assumes a chain of events you have not proven
                will occur. Where is the evidence?"
              </p>
            </div>
          </div>

          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "The key is to call out the fallacy by name if you can, but even if
            you cannot remember the Latin term, simply explaining why the logic
            is flawed is enough to defuse it."
            <span className="mt-2 block text-sm not-italic">
              - Mehdi Hasan, "Win Every Argument"
            </span>
          </blockquote>

          {/* Section 2: The Training Challenge */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Why This Skill Requires Live Practice
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Reading about fallacies is easy. Spotting them in real time is hard.
            The difference is pressure. In a debate, you are also managing your
            own arguments, reading your opponent's body language, thinking about
            the audience, and dealing with nerves. Detecting a logical flaw
            under these conditions requires the skill to be automatic, not
            conscious.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            This is why DebateClub's AI opponent is programmed to deliberately
            use weak arguments and logical gaps. Not randomly, but
            strategically. Your job is to catch them before the debate moves on.
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
                Fallacy Training Pipeline
              </h4>
            </div>
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <pre className="whitespace-pre-wrap">
                {`┌──────────────────────────────────────┐
│  DURING DEBATE: OPPONENT BEHAVIOR    │
│                                      │
│  Your AI opponent deliberately:      │
│                                      │
│  • Uses straw man arguments against  │
│    your stated positions             │
│                                      │
│  • Deploys ad hominem attacks when   │
│    losing on substance               │
│                                      │
│  • Presents false dilemmas to force  │
│    you into unfavorable choices      │
│                                      │
│  • Cites irrelevant authorities      │
│                                      │
│  • Builds slippery slope arguments   │
│    without evidence                  │
│                                      │
│  Your job: call them out before      │
│  the opponent pivots away            │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  POST-DEBATE: ANALYSIS BREAKDOWN     │
│                                      │
│  Your coaching report includes:      │
│                                      │
│  • Every fallacy the opponent used   │
│                                      │
│  • Which ones you caught and called  │
│    out effectively                   │
│                                      │
│  • Which ones you missed             │
│                                      │
│  • Suggested counter-responses for   │
│    the fallacies you did not catch   │
│                                      │
│  • Pattern analysis: what types of   │
│    fallacies are you missing most?   │
└──────────────────────────────────────┘`}
              </pre>
            </div>
          </div>

          {/* Section 3: How to Call Out a Fallacy */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Three-Step Callout
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            When you spot a weakness, you need to expose it effectively. Mehdi Hasan's
            approach involves three steps:
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
                  Name the Move
                </h4>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  "That's a straw man argument" or "You're attacking me instead
                  of my position." Naming the tactic signals to the audience
                  that you know what is happening.
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
                  Explain the Flaw
                </h4>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  "I never said we should have open borders. I said we should
                  reform the visa process. Those are completely different
                  positions."
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
                  Redirect to Substance
                </h4>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  "Now, would you like to address my actual argument about visa
                  reform?" This puts your opponent on the back foot and forces
                  them to engage with your real position.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: The Technique Scorecard */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            How DebateClub Scores Your Detection
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            After each debate, your analysis includes a technique breakdown that
            evaluates your critical analysis skills:
          </p>

          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{
              backgroundColor: "#FAFAF8",
              borderColor: "#3C4A32",
            }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              Critical Analysis Score (1-5)
            </h4>
            <div className="space-y-3 text-sm" style={{ color: "#5C5C54" }}>
              <div className="flex items-start gap-2">
                <Target
                  className="mt-0.5 h-4 w-4"
                  style={{ color: "#3C4A32" }}
                />
                <span>
                  <strong>Fallacy Detection:</strong> Did you identify logical
                  flaws when they appeared? Did you catch subtle misdirection?
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="mt-0.5 h-4 w-4" style={{ color: "#3C4A32" }} />
                <span>
                  <strong>Response Speed:</strong> Did you call out the fallacy
                  immediately, or did you take too long and lose the moment?
                </span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle
                  className="mt-0.5 h-4 w-4"
                  style={{ color: "#3C4A32" }}
                />
                <span>
                  <strong>Counter Effectiveness:</strong> When you called out a
                  fallacy, did you redirect to substance effectively?
                </span>
              </div>
            </div>
          </div>

          {/* Section 5: Missed Opportunity Tracking */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Learning From What You Missed
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The most valuable part of the analysis is the "Missed Opportunities"
            section. For every fallacy you did not catch, the system shows you:
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
                What the Opponent Said
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "So you think we should just let anyone into the country? That's
                incredibly naive."
              </p>
            </div>
            <div className="mb-4">
              <span
                className="inline-block rounded-md px-2 py-1 text-xs font-medium"
                style={{ backgroundColor: "#FFF4E4", color: "#7C5A2D" }}
              >
                The Fallacy
              </span>
              <p className="mt-2" style={{ color: "#5C5C54" }}>
                <strong>Straw Man + Ad Hominem combination:</strong> They
                misrepresented your position and called you "naive" to discredit
                you personally.
              </p>
            </div>
            <div>
              <span
                className="inline-block rounded-md px-2 py-1 text-xs font-medium"
                style={{ backgroundColor: "#E4FFE4", color: "#2D7C2D" }}
              >
                Suggested Response
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "I never said open borders. I said reform the visa process for
                skilled workers. And calling my position 'naive' is not a
                counterargument. Address the policy, not me."
              </p>
            </div>
          </div>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            Over multiple practice sessions, you will see patterns in what you
            miss. Maybe you catch straw man arguments but miss appeals to
            authority. This data helps you focus your attention in future
            debates.
          </p>

          {/* Section 6: Expected Results */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            What Changes After Practice
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            After 10 to 15 debates with fallacy-trained opponents, you will
            notice significant shifts:
          </p>

          <div className="my-6 grid grid-cols-2 gap-4">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Faster Detection
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You start catching fallacies mid-sentence. The recognition
                becomes automatic, not deliberate.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Smoother Counters
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Your callouts become natural and conversational, not academic or
                pedantic.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Opponent Awareness
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You recognize when opponents are about to use a fallacy based on
                their setup, and you preempt it.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Everyday Application
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You start noticing bad arguments in meetings, news, and
                conversations. The skill transfers everywhere.
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
            Every bad argument has a weak point. The question is not whether
            flaws exist, but whether you can find them under pressure. This
            skill separates people who win debates from people who feel like
            they should have won but did not know why they lost.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            DebateClub trains your detection instincts by giving you opponents
            who deliberately use fallacious reasoning. You practice catching
            them, calling them out, and redirecting to substance. Post-debate
            analysis shows you what you missed so you can improve.
          </p>

          <p
            className="mt-4 text-lg font-medium leading-relaxed"
            style={{ color: "#3A3A35" }}
          >
            Train your ear. Spot the weakness. Then strike.
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
              Ready to Sharpen Your Detection?
            </h3>
            <p className="mb-6" style={{ color: "#C8C8B8" }}>
              Practice against opponents who use fallacies strategically. Learn
              to catch them before they move on.
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
              to="/blog/back-it-up"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous: Back It Up
            </Link>
            <Link
              to="/blog/flip-their-momentum"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              Next: Flip Their Momentum
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
