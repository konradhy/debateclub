import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, List, Brain, Repeat } from "lucide-react";

export const Route = createFileRoute("/blog/make-it-stick")({
  head: () => ({
    meta: [
      { title: "Rule of Three: Structure Arguments That Stick | DebateClub" },
      {
        name: "description",
        content:
          "Three points. Three reasons. Three examples. Why the brain remembers threes — and how to structure every argument for maximum impact.",
      },
      {
        property: "og:title",
        content: "Rule of Three: Structure Arguments That Stick | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Three points. Three reasons. Three examples. Why the brain remembers threes — and how to structure every argument for maximum impact.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: MakeItStickArticle,
});

/**
 * Blog article: Make It Stick technique deep dive.
 * Explores Mehdi Hasan's Chapter 10: "The Rule of Three" and how
 * DebateClub trains users to structure memorable arguments.
 */
function MakeItStickArticle() {
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
            Rule of Three
          </span>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Make It Stick: The Power of Three
          </h1>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            8 min read · Technique 8 of 12
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
            "Government of the people, by the people, for the people." "Life,
            liberty, and the pursuit of happiness." "I came, I saw, I
            conquered." The most memorable phrases in history share a pattern:
            they come in threes. This is not coincidence. It is cognitive
            science.
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            Mehdi Hasan devotes Chapter 10 of "Win Every Argument" to the Rule
            of Three, a rhetorical principle that dates back to Aristotle.{" "}
            <strong>The human brain is wired to find patterns in threes</strong>
            . Two feels incomplete. Four feels cluttered. Three is the magic
            number for retention, rhythm, and impact.
          </p>

          {/* Section 1: Why Three Works */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Neuroscience of Three
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Hasan explains why triads are so effective:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  Pattern Recognition
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Three is the minimum number needed to create a pattern. With
                three points, the brain detects a structure and locks it in.
                This makes your argument easier to follow and remember.
              </p>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <List className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  Working Memory
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Human working memory holds roughly three to four items at a
                time. More than that and the audience starts forgetting earlier
                points. Three maximizes retention without overload.
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Repeat className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  Rhythmic Satisfaction
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Three creates a natural rhythm in speech. The audience
                anticipates the third beat and feels satisfaction when it
                arrives. This rhythmic completion makes the argument feel
                conclusive.
              </p>
            </div>
          </div>

          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "The Rule of Three pervades the very warp and weft of human culture
            because it works on both cognitive and rhetorical levels."
            <span className="mt-2 block text-sm not-italic">
              - Mehdi Hasan, "Win Every Argument"
            </span>
          </blockquote>

          {/* Section 2: Applications of the Rule */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Where to Apply the Rule of Three
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Hasan identifies several key moments where the Rule of Three creates
            maximum impact:
          </p>

          <div className="my-6 grid gap-4">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Opening Statements
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Set up your argument with three key points. "Today I want to
                show you three things: first, the problem is real. Second, it is
                getting worse. Third, we can fix it."
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Argument Structure
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Build your case on three pillars. Each pillar should be strong
                enough to stand alone but more powerful together. If one gets
                challenged, the others still hold.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Adjective Stacks
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Describe with triads. "This policy is reckless, short-sighted,
                and dangerous." Three adjectives hit harder than two and stick
                better than four.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Closing Summaries
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                End with three takeaways. "Remember: it's real, it's urgent, and
                we can win." Give the audience a triad to carry out the door.
              </p>
            </div>
          </div>

          {/* Section 3: How DebateClub Trains This */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            How DebateClub Trains the Rule of Three
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Knowing the Rule of Three is easy. Applying it under pressure is
            hard. When you are thinking on your feet, it is easy to ramble into
            five points or stop at two. DebateClub builds the habit through
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
                Rule of Three Training Pipeline
              </h4>
            </div>
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <pre className="whitespace-pre-wrap">
                {`┌──────────────────────────────────────┐
│  PREP: STRUCTURED CONTENT            │
│                                      │
│  All generated materials follow the  │
│  Rule of Three:                      │
│                                      │
│  • 3 opening statement options       │
│  • 3 main argument frames            │
│  • 3 closing statement options       │
│  • Each frame has 3 supporting points│
│                                      │
│  You absorb the structure through    │
│  repeated exposure before you ever   │
│  enter a debate                      │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  DURING DEBATE                       │
│                                      │
│  Quick Reference panel organizes     │
│  your materials in triads:           │
│                                      │
│  • Your 3 key points at a glance     │
│  • 3 receipts per argument           │
│  • 3 counters per opponent angle     │
│                                      │
│  The structure helps you maintain    │
│  clarity even under pressure         │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  POST-DEBATE ANALYSIS                │
│                                      │
│  Your coaching evaluates:            │
│                                      │
│  • Did you structure arguments in    │
│    clear, memorable triads?          │
│                                      │
│  • Did you lose focus with too many  │
│    points or stop too short?         │
│                                      │
│  • Rewrites show how to restructure  │
│    rambling passages into clean      │
│    three-part structures             │
└──────────────────────────────────────┘`}
              </pre>
            </div>
          </div>

          {/* Section 4: Triadic Structures in Practice */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Building Triadic Arguments
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Here is how the Rule of Three applies in practice:
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
                Before (Rambling)
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "This policy has many problems. There are cost issues, and also
                implementation challenges. Some people worry about the timeline,
                and there are environmental concerns too. Not to mention the
                political obstacles and the impact on small businesses..."
              </p>
            </div>
            <div>
              <span
                className="inline-block rounded-md px-2 py-1 text-xs font-medium"
                style={{ backgroundColor: "#E4FFE4", color: "#2D7C2D" }}
              >
                After (Rule of Three)
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "This policy fails on three fronts. First, it's unaffordable.
                Second, it's unworkable. Third, it's unnecessary. Let me show
                you why."
              </p>
              <p className="mt-2 text-sm" style={{ color: "#888880" }}>
                Clean, memorable, and sets up a clear structure for the rest of
                your argument.
              </p>
            </div>
          </div>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The restructured version is not just shorter. It is more powerful
            because the audience can track your argument and anticipate where
            you are going. They remember "unaffordable, unworkable, unnecessary"
            long after they forgot the rambling list.
          </p>

          {/* Section 5: The Triad Patterns */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Classic Triad Patterns
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Hasan identifies several reliable triad structures that you can
            adapt to any topic:
          </p>

          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{
              backgroundColor: "#FAFAF8",
              borderColor: "#3C4A32",
            }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              Reusable Triad Templates
            </h4>
            <div className="space-y-3 text-sm" style={{ color: "#5C5C54" }}>
              <p>
                <strong>Problem-Solution-Result:</strong> What is wrong, what we
                should do, what happens when we do it.
              </p>
              <p>
                <strong>Past-Present-Future:</strong> Where we were, where we
                are, where we're going.
              </p>
              <p>
                <strong>Head-Heart-Hand:</strong> The logical case, the
                emotional case, the call to action.
              </p>
              <p>
                <strong>Three Questions:</strong> "What do we want? When do we
                want it? How do we get it?"
              </p>
              <p>
                <strong>Three Adjectives:</strong> "This is unfair, unnecessary,
                and unkind."
              </p>
            </div>
          </div>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            These templates work because they are flexible enough to fit any
            topic but structured enough to be memorable. Pick the pattern that
            fits your argument and let the triad carry your points home.
          </p>

          {/* Section 6: Expected Results */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            What Changes After Practice
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            After practicing triad structure across multiple debates, you will
            notice:
          </p>

          <div className="my-6 grid grid-cols-2 gap-4">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Automatic Structuring
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You start naturally organizing thoughts into threes. What once
                required conscious effort becomes instinctive.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Clearer Communication
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Your arguments become easier to follow. Audiences can track
                where you are and what comes next.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Better Retention
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                People remember what you said. Triadic structure creates hooks
                for memory that loose points cannot.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Stronger Closings
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Your summaries land harder. Three takeaways stick where ten
                points blur together.
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
            Lincoln, Jefferson, Caesar. The greatest communicators in history
            understood what neuroscience has since confirmed: three is the magic
            number for human memory. Not two. Not four. Three.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            DebateClub builds this structure into every piece of prep material
            you receive. Your openings come in threes. Your arguments come in
            threes. Your closings come in threes. The more you work with triadic
            content, the more naturally you produce it yourself.
          </p>

          <p
            className="mt-4 text-lg font-medium leading-relaxed"
            style={{ color: "#3A3A35" }}
          >
            Make it clear. Make it rhythmic. Make it stick.
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
              Ready to Build Memorable Arguments?
            </h3>
            <p className="mb-6" style={{ color: "#C8C8B8" }}>
              Get prep materials structured in triads and practice delivering
              them until the pattern becomes instinct.
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
              to="/blog/defuse-with-humor"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous: Defuse with Humor
            </Link>
            <Link
              to="/blog/ask-the-killer-question"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              Next: Ask the Killer Question
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
