import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, FileText, Search, Clock } from "lucide-react";

export const Route = createFileRoute("/blog/back-it-up")({
  head: () => ({
    meta: [
      { title: "How to Use Evidence to Win Arguments | DebateClub" },
      {
        name: "description",
        content:
          "Find it, time it, drop it. The best evidence isn't dumped — it's revealed at the perfect moment. From Win Every Argument, Chapter 3.",
      },
      {
        property: "og:title",
        content: "How to Use Evidence to Win Arguments | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Find it, time it, drop it. The best evidence isn't dumped — it's revealed at the perfect moment. From Win Every Argument, Chapter 3.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: BackItUpArticle,
});

/**
 * Blog article: Back It Up technique deep dive.
 * Explores Mehdi Hasan's Chapter 3: "Show Your Receipts" and how
 * DebateClub trains users to deploy evidence strategically.
 */
function BackItUpArticle() {
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
            Evidence Mastery
          </span>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Back It Up: The Art of the Receipt
          </h1>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            8 min read · Technique 3 of 12
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
            In 2020, Mehdi Hasan interviewed Erik Prince, the controversial
            founder of Blackwater. Prince denied ever meeting with a Russian
            banker in the Seychelles. Hasan paused, reached for a document, and
            read aloud the exact passage from the Mueller report confirming the
            meeting. Prince stammered. The clip went viral. That is the power of
            receipts.
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            Chapter 3 of "Win Every Argument" is titled "Show Your Receipts"
            because Hasan believes{" "}
            <strong>evidence is what separates assertion from argument</strong>.
            Anyone can claim anything. But when you produce the document, the
            video clip, the direct quote, you transform the debate. Your
            opponent must now explain away concrete proof, not abstract claims.
          </p>

          {/* Section 1: The Receipt Philosophy */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Why Receipts Work
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Hasan identifies several reasons why evidence is so powerful in
            debate:
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
                1. Receipts Are Undeniable
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Your opponent can argue with your interpretation, but they
                cannot argue with their own words on video or in a signed
                document. The best receipts are your opponent's own statements
                contradicting their current position.
              </p>
            </div>

            <div className="mb-6">
              <h3
                className="mb-2 text-lg font-bold"
                style={{ color: "#3C4A32" }}
              >
                2. Receipts Create Drama
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                There is a theatrical element to producing evidence at the right
                moment. The pause before reading, the careful citation, the
                opponent's visible discomfort. These moments become memorable.
                They become clips that circulate.
              </p>
            </div>

            <div>
              <h3
                className="mb-2 text-lg font-bold"
                style={{ color: "#3C4A32" }}
              >
                3. Receipts Signal Preparation
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                When you have evidence ready, the audience knows you did your
                homework. This builds credibility. Your opponent knows it too,
                and may become more careful, less aggressive, more defensive.
              </p>
            </div>
          </div>

          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "The onus is on the accuser to back up their argument, provide their
            proof, and demonstrate their case."
            <span className="mt-2 block text-sm not-italic">
              - Mehdi Hasan, "Win Every Argument"
            </span>
          </blockquote>

          {/* Section 2: Types of Receipts */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Six Types of Evidence
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Not all receipts are created equal. Hasan categorizes evidence into
            a hierarchy based on persuasive power:
          </p>

          <ul className="my-6 space-y-3">
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Video/Audio of opponent</strong>: The strongest receipt.
                Your opponent's own words, in their own voice, contradicting
                their current position. Impossible to dismiss.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Official documents</strong>: Court records, government
                reports, signed contracts. Carry institutional authority.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Academic studies</strong>: Peer-reviewed research from
                credible institutions. Works best with skeptical, educated
                audiences.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Expert testimony</strong>: Quotes from recognized
                authorities in the field. Effectiveness depends on audience
                respect for the expert.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Statistical data</strong>: Numbers that quantify your
                claim. Most powerful when specific and from trusted sources.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Firsthand accounts</strong>: Eyewitness testimony or
                personal experience. Powerful emotionally but easier to dispute
                factually.
              </span>
            </li>
          </ul>

          {/* Section 3: The DebateClub Approach */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            How DebateClub Trains Evidence Deployment
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Having evidence is necessary but not sufficient. The skill is in
            <strong> when and how you deploy it</strong>. Drop your receipts too
            early and you waste the dramatic effect. Save them too long and you
            miss the window. DebateClub trains this timing through three
            systems:
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
                Evidence Training Pipeline
              </h4>
            </div>
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <pre className="whitespace-pre-wrap">
                {`┌──────────────────────────────────────┐
│  PHASE 1: RESEARCH GATHERING         │
│                                      │
│  Before you enter prep:              │
│                                      │
│  • Deep Research Mode scours the     │
│    internet for sources on your      │
│    topic                             │
│                                      │
│  • AI extracts relevant facts,       │
│    statistics, expert quotes         │
│                                      │
│  • Sources are categorized by        │
│    type and credibility              │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  PHASE 2: RECEIPTS GENERATION        │
│                                      │
│  Your prep materials include a       │
│  "Receipts" section with:            │
│                                      │
│  • Key statistics + source citation  │
│  • Expert quotes with context        │
│  • Opponent past statements (if      │
│    public figure)                    │
│                                      │
│  Each receipt includes:              │
│  • The raw evidence                  │
│  • Deployment guidance: when to use  │
│  • Setup phrase: how to introduce it │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  PHASE 3: LIVE DEBATE PRACTICE       │
│                                      │
│  Your opponent creates opportunities │
│  to deploy receipts:                 │
│                                      │
│  • Makes deniable claims you can     │
│    disprove with evidence            │
│                                      │
│  • Challenges your credibility,      │
│    forcing you to cite sources       │
│                                      │
│  • Quick Reference panel keeps       │
│    your receipts one tap away        │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  PHASE 4: POST-DEBATE ANALYSIS       │
│                                      │
│  Your coaching evaluates:            │
│                                      │
│  • Did you deploy receipts at the    │
│    right moment for maximum impact?  │
│                                      │
│  • Did you bury the lead (too much   │
│    context before the knockout)?     │
│                                      │
│  • Did you miss opportunities where  │
│    evidence would have been decisive?│
└──────────────────────────────────────┘`}
              </pre>
            </div>
          </div>

          {/* Section 4: The Research System */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Research Mode Advantage
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Most people enter debates underprepared. They have opinions but not
            evidence. DebateClub's Research Mode solves this by automating the
            evidence gathering process:
          </p>

          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{
              backgroundColor: "#FAFAF8",
              borderColor: "#3C4A32",
            }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              What Research Mode Provides
            </h4>
            <div className="space-y-3 text-sm" style={{ color: "#5C5C54" }}>
              <div className="flex items-start gap-2">
                <Search
                  className="mt-0.5 h-4 w-4"
                  style={{ color: "#3C4A32" }}
                />
                <span>
                  <strong>Source Discovery:</strong> AI searches for credible
                  sources on your topic, filtering for relevance and authority.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <FileText
                  className="mt-0.5 h-4 w-4"
                  style={{ color: "#3C4A32" }}
                />
                <span>
                  <strong>Evidence Extraction:</strong> Key facts, statistics,
                  and quotes are pulled from sources and formatted for easy
                  deployment.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock
                  className="mt-0.5 h-4 w-4"
                  style={{ color: "#3C4A32" }}
                />
                <span>
                  <strong>Time Savings:</strong> Hours of research compressed
                  into minutes. You get the receipts without the labor.
                </span>
              </div>
            </div>
          </div>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The result: you enter every debate with a loaded arsenal. When your
            opponent makes a claim you can disprove, you have the evidence
            ready.
          </p>

          {/* Section 5: Timing Your Evidence */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Art of Timing
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Hasan's specific guidance on evidence timing:
          </p>

          <div className="my-6 grid grid-cols-2 gap-4">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Wait For the Denial
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Let your opponent deny or dismiss before you produce the
                receipt. The contrast between their confidence and your evidence
                is devastating.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Don't Bury the Lead
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Get to the damaging fact quickly. Long preambles dilute the
                impact. "According to this document..." then read the killer
                line immediately.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Pause After
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Let the receipt land. Silence after evidence is more powerful
                than explanation. Let the audience process what they just heard.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Save Your Best
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Do not lead with your strongest receipt. Build to it. The final
                piece of evidence should be the one that closes the case.
              </p>
            </div>
          </div>

          {/* Section 6: The Quick Reference Panel */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Receipts at Your Fingertips
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            During a live debate, you cannot be fumbling through notes looking
            for a statistic. The Quick Reference panel in DebateClub keeps all
            your receipts organized and accessible:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              Receipt Card Example
            </h4>
            <div
              className="rounded-lg border-l-4 p-4"
              style={{ backgroundColor: "#fff", borderColor: "#A8B08C" }}
            >
              <p
                className="mb-2 text-xs uppercase"
                style={{ color: "#888880" }}
              >
                Statistical Evidence
              </p>
              <p className="mb-2 font-medium" style={{ color: "#2A2A20" }}>
                "Healthcare costs have increased 47% since 2010 while wages
                increased only 31%."
              </p>
              <p className="mb-2 text-sm" style={{ color: "#5C5C54" }}>
                Source: Bureau of Labor Statistics, 2023
              </p>
              <p className="text-sm italic" style={{ color: "#3C4A32" }}>
                Deploy when: Opponent claims the current system is affordable
              </p>
            </div>
          </div>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            Each receipt includes not just the evidence but deployment guidance.
            You know exactly when this piece of evidence will land hardest.
          </p>

          {/* Section 7: Expected Results */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            What Changes After Practice
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            After practicing evidence deployment across multiple debates, you
            will notice:
          </p>

          <ul className="my-6 space-y-3">
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Better Research Habits:</strong> You start automatically
                looking for quotable evidence when reading articles, not just
                opinions.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Timing Instincts:</strong> You develop a sense for when
                the opponent has committed enough to a position that evidence
                will be damaging.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Increased Confidence:</strong> Knowing you have receipts
                ready changes how you carry yourself. You argue from a position
                of strength.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Opponent Awareness:</strong> You learn to recognize when
                your opponent is bluffing and when they have evidence of their
                own.
              </span>
            </li>
          </ul>

          {/* Closing */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Bottom Line
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Erik Prince thought he could deny a meeting that was documented in a
            federal investigation. Mehdi Hasan made him regret that decision in
            seconds. The difference was preparation. The difference was having
            the receipt ready.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            DebateClub ensures you never enter a debate without your receipts.
            Research Mode gathers the evidence. Prep materials format it for
            deployment. The Quick Reference panel keeps it accessible. And
            post-debate analysis shows you whether you used it effectively.
          </p>

          <p
            className="mt-4 text-lg font-medium leading-relaxed"
            style={{ color: "#3A3A35" }}
          >
            Claims are cheap. Receipts are decisive. Always back it up.
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
              Ready to Build Your Arsenal?
            </h3>
            <p className="mb-6" style={{ color: "#C8C8B8" }}>
              Let Research Mode gather your evidence while you focus on
              strategy. Your receipts will be ready when you need them.
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
              to="/blog/strike-emotional-chord"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous: Strike an Emotional Chord
            </Link>
            <Link
              to="/blog/spot-the-weakness"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              Next: Spot the Weakness
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
