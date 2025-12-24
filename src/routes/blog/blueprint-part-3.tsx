import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Target,
  Lightbulb,
  RefreshCw,
  TrendingUp,
  Award,
  Headphones,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/blog/blueprint-part-3")({
  head: () => ({
    meta: [
      { title: "Debate Analysis: Know What Worked | DebateClub" },
      {
        name: "description",
        content:
          "Hasan Scores, technique breakdowns, and improvement tips. How DebateClub analyzes your debates so you know exactly what to fix next.",
      },
      {
        property: "og:title",
        content: "Debate Analysis: Know What Worked | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Hasan Scores, technique breakdowns, and improvement tips. How DebateClub analyzes your debates so you know exactly what to fix next.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: BlueprintPart3Article,
});

/**
 * Blog article: 16 Chapters, 1 Platform - Part 3
 * "After the Dust Settles: Learn From Every Fight"
 * Covers post-debate analysis, Hasan Scores, and continuous improvement.
 */
function BlueprintPart3Article() {
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
            All Articles
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
          {/* Series Badge */}
          <div className="mb-4 flex items-center gap-2">
            <span
              className="inline-block rounded-md px-3 py-1 text-xs font-medium"
              style={{ backgroundColor: "#3C4A32", color: "#FAFAF8" }}
            >
              The Blueprint Series
            </span>
            <span className="text-xs" style={{ color: "#888880" }}>
              Part 3 of 3
            </span>
          </div>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            After the Dust Settles: Learn From Every Fight
          </h1>

          {/* Subtitle */}
          <p
            className="mb-6 text-xl leading-relaxed"
            style={{ color: "#5C5C54" }}
          >
            How we built an AI coach that scores your performance, shows what
            you missed, and tells you exactly how to improve.
          </p>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            10 min read · Behind the Build
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
            The best fighters study their own tape. They watch every punch they
            threw, every opening they missed, every moment where they could have
            ended it but did not. The post-fight review is where champions are
            made.
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            Mehdi Hasan's entire methodology is built on this principle.
            Throughout "Win Every Argument," he references moments from his own
            career: interviews that went well, debates that did not, exchanges
            he would handle differently with hindsight. Chapter 14 is titled
            "Practice Makes Perfect" because improvement requires reflection.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            When you finish a practice debate in DebateClub, the fight is only
            half over.{" "}
            <strong>
              Now comes the analysis that tells you what you actually did.
            </strong>
          </p>

          {/* Section 1: The Hasan Scores */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Hasan Scores: Graded on the Book's Structure
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            "Win Every Argument" is organized into four parts. We score your
            performance on each:
          </p>

          <div
            className="my-8 overflow-hidden rounded-xl"
            style={{ backgroundColor: "#2A2A20" }}
          >
            <div className="px-6 py-4" style={{ backgroundColor: "#3C4A32" }}>
              <h4
                className="text-sm font-semibold uppercase tracking-wide"
                style={{ color: "#C8D4B8" }}
              >
                The Four Hasan Scores (Each 1-10)
              </h4>
            </div>
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <pre className="whitespace-pre-wrap">
                {`FUNDAMENTALS (Chapters 1-6)              8/10
├── Audience Awareness
├── Emotional Appeal
├── Evidence Deployment
├── Credibility Attacks
├── Active Listening
└── Use of Humor

TRICKS OF THE TRADE (Chapters 7-11)      6/10
├── Rule of Three
├── Judo Moves (Concession, Preemption, Reframe)
├── Zingers
├── Booby Traps
└── Gish Gallop Defense

BEHIND THE SCENES (Chapters 12-15)       7/10
├── Confidence Projection
├── Composure Under Pressure
├── Preparation Quality
└── Research Depth

GRAND FINALE (Chapter 16)                5/10
└── Closing Strength
    ├── Emotional Peak
    ├── Memorable Ending
    └── Call to Action

────────────────────────────────────────
TOTAL HASAN SCORE                       26/40`}
              </pre>
            </div>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Each score comes with specific notes explaining what contributed to
            the rating. A low "Grand Finale" score might note: "Closing felt
            rushed. No clear call to action. Emotional arc incomplete." A high
            "Fundamentals" score might note: "Strong opening story. Evidence
            well-timed. Good audience connection throughout."
          </p>

          {/* Section 2: The Technique Scorecard */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Technique Scorecard: What You Used and How Well
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Beyond the four-part Hasan Scores, you get a detailed breakdown of
            every technique category:
          </p>

          <div className="my-6 grid gap-3">
            {[
              {
                category: "Opening",
                score: 4,
                techniques: "Personal Story",
                notes: "Strong hook, good emotional connection",
              },
              {
                category: "Emotional Appeal",
                score: 3,
                techniques: "Story, Word Choice",
                notes: "Story landed, but some passages too dry",
              },
              {
                category: "Evidence/Receipts",
                score: 5,
                techniques: "Statistics, Expert Quote",
                notes: "Well-timed, devastating deployment",
              },
              {
                category: "Judo Moves",
                score: 2,
                techniques: "Concession",
                notes: "One concession, but no pivot followed",
              },
              {
                category: "Zingers/Wit",
                score: 1,
                techniques: "None detected",
                notes: "Missed opportunities for humor",
              },
              {
                category: "Listening/Response",
                score: 4,
                techniques: "Caught contradiction",
                notes: "Good critical listening",
              },
              {
                category: "Structure",
                score: 3,
                techniques: "Rule of Three (partial)",
                notes: "Some triads, but inconsistent",
              },
              {
                category: "Closing",
                score: 2,
                techniques: "Call to Action",
                notes: "Abrupt ending, weak emotional arc",
              },
              {
                category: "Composure",
                score: 4,
                techniques: "Recovered from interrupt",
                notes: "Stayed calm under pressure",
              },
            ].map((item) => (
              <div
                key={item.category}
                className="flex items-center gap-4 rounded-lg p-3"
                style={{ backgroundColor: "#FAFAF8" }}
              >
                <div className="w-24 text-sm font-medium" style={{ color: "#2A2A20" }}>
                  {item.category}
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor:
                          i <= item.score ? "#3C4A32" : "#E8E4DA",
                      }}
                    />
                  ))}
                </div>
                <div
                  className="flex-1 text-xs"
                  style={{ color: "#5C5C54" }}
                >
                  {item.notes}
                </div>
              </div>
            ))}
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The dot visualization makes it immediately clear where you excelled
            and where you struggled. One glance tells you: "I need to work on
            zingers and closing."
          </p>

          {/* Section 3: Missed Opportunities */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Missed Opportunities: The Moves You Should Have Made
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            This is where the coaching gets specific. The AI identifies 3-5
            moments in the debate where a technique would have been highly
            effective but was not deployed:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Target className="h-5 w-5" style={{ color: "#9A4A4A" }} />
                  <h4 className="font-bold" style={{ color: "#2A2A20" }}>
                    Exchange 4: Opponent Overreached
                  </h4>
                </div>
                <p
                  className="mb-2 text-sm leading-relaxed"
                  style={{ color: "#5C5C54" }}
                >
                  When your opponent claimed "this has never worked anywhere,"
                  you responded with a general counterpoint.
                </p>
                <div
                  className="rounded-lg p-3"
                  style={{ backgroundColor: "#E5DFD3" }}
                >
                  <p className="text-sm font-medium" style={{ color: "#3C4A32" }}>
                    Technique to use: <strong>Receipts</strong>
                  </p>
                  <p className="mt-1 text-sm" style={{ color: "#5C5444" }}>
                    This was the perfect moment to deploy your Finland case
                    study. "Actually, Finland implemented this in 2017 and saw a
                    78% success rate. I have the government report right here."
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Target className="h-5 w-5" style={{ color: "#9A4A4A" }} />
                  <h4 className="font-bold" style={{ color: "#2A2A20" }}>
                    Exchange 7: Opponent Contradicted Themselves
                  </h4>
                </div>
                <p
                  className="mb-2 text-sm leading-relaxed"
                  style={{ color: "#5C5C54" }}
                >
                  Your opponent said "we cannot afford this" after earlier
                  praising a more expensive policy.
                </p>
                <div
                  className="rounded-lg p-3"
                  style={{ backgroundColor: "#E5DFD3" }}
                >
                  <p className="text-sm font-medium" style={{ color: "#3C4A32" }}>
                    Technique to use: <strong>Booby Trap</strong>
                  </p>
                  <p className="mt-1 text-sm" style={{ color: "#5C5444" }}>
                    "Two minutes ago, you supported a policy that costs three
                    times as much. So the issue is not cost. The issue is
                    priorities."
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Target className="h-5 w-5" style={{ color: "#9A4A4A" }} />
                  <h4 className="font-bold" style={{ color: "#2A2A20" }}>
                    Exchange 11: Tension Peaked
                  </h4>
                </div>
                <p
                  className="mb-2 text-sm leading-relaxed"
                  style={{ color: "#5C5C54" }}
                >
                  The exchange became heated. You matched intensity with
                  intensity.
                </p>
                <div
                  className="rounded-lg p-3"
                  style={{ backgroundColor: "#E5DFD3" }}
                >
                  <p className="text-sm font-medium" style={{ color: "#3C4A32" }}>
                    Technique to use: <strong>Humor</strong>
                  </p>
                  <p className="mt-1 text-sm" style={{ color: "#5C5444" }}>
                    A light, self-deprecating comment would have defused
                    tension, made you appear composed, and put your opponent on
                    the back foot.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Each missed opportunity tells you exactly what technique to use and
            provides a rewritten example of how the moment could have gone.
          </p>

          {/* Section 4: The Rewrites */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Before and After: See the Improvement
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The analysis includes 2-3 rewrites showing exactly how a weak moment
            could have been stronger:
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
                Original
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "Well, I disagree with that characterization. The data shows
                otherwise, and I think most experts would agree with my
                position."
              </p>
            </div>
            <div className="mb-4">
              <span
                className="inline-block rounded-md px-2 py-1 text-xs font-medium"
                style={{ backgroundColor: "#E4FFE4", color: "#2D7C2D" }}
              >
                Rewritten
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "You are right that implementation is challenging. But here is
                where your analysis falls short: the Congressional Budget Office
                found that the net savings over ten years exceed the upfront
                costs by a factor of three. That is not my opinion. That is the
                CBO's math."
              </p>
            </div>
            <div
              className="rounded-lg p-3"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <p className="text-sm" style={{ color: "#3C4A32" }}>
                <strong>Techniques applied:</strong> Concession & Pivot (Judo
                Move), Specific Receipt (Evidence), Rule of Three rhythm in the
                final two sentences
              </p>
            </div>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The rewrites are not generic improvements. They apply the specific
            Hasan techniques that would have worked in that moment, explained so
            you understand why they work.
          </p>

          {/* Section 5: Practice Recommendations */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            What to Practice Next: Prioritized Recommendations
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The analysis concludes with a structured training plan:
          </p>

          <div className="my-6 space-y-4">
            <div
              className="rounded-xl border-l-4 p-4"
              style={{
                backgroundColor: "#FAFAF8",
                borderColor: "#9A4A4A",
              }}
            >
              <div className="mb-2 flex items-center gap-2">
                <RefreshCw className="h-5 w-5" style={{ color: "#9A4A4A" }} />
                <h4 className="font-bold" style={{ color: "#2A2A20" }}>
                  Immediate Focus: Closing Statements
                </h4>
              </div>
              <p className="mb-2 text-sm" style={{ color: "#5C5C54" }}>
                <strong>Drill:</strong> Practice delivering your three closing
                options from prep. Record yourself. Focus on emotional arc:
                build from summary to stakes to call to action.
              </p>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                <strong>Study:</strong> Watch Obama's 2008 victory speech
                (referenced in Chapter 16). Note how the Ann Nixon Cooper story
                builds emotional momentum.
              </p>
            </div>

            <div
              className="rounded-xl border-l-4 p-4"
              style={{
                backgroundColor: "#FAFAF8",
                borderColor: "#9A6A4A",
              }}
            >
              <div className="mb-2 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" style={{ color: "#9A6A4A" }} />
                <h4 className="font-bold" style={{ color: "#2A2A20" }}>
                  Secondary Focus: Zinger Deployment
                </h4>
              </div>
              <p className="mb-2 text-sm" style={{ color: "#5C5C54" }}>
                <strong>Drill:</strong> Review your zinger bank from prep.
                Practice recognizing trigger conditions and delivering zingers
                with appropriate deadpan or incredulous tone.
              </p>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                <strong>Study:</strong> Watch Lloyd Bentsen's "You're no Jack
                Kennedy" moment. Note the pause before and silence after.
              </p>
            </div>

            <div
              className="rounded-xl border-l-4 p-4"
              style={{
                backgroundColor: "#FAFAF8",
                borderColor: "#4A6A9A",
              }}
            >
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" style={{ color: "#4A6A9A" }} />
                <h4 className="font-bold" style={{ color: "#2A2A20" }}>
                  Long-Term Development: Humor Under Pressure
                </h4>
              </div>
              <p className="mb-2 text-sm" style={{ color: "#5C5C54" }}>
                <strong>Approach:</strong> This takes time. Start with
                self-deprecating humor, which is safest. Practice in low-stakes
                settings before deploying in debates.
              </p>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                <strong>Resources:</strong> Chapter 6 of "Win Every Argument."
                Ronald Reagan's debate performances for self-deprecation
                examples.
              </p>
            </div>
          </div>

          {/* Section 6: Progress Tracking */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Track Your Progress: Performance Over Time
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Every debate is stored. Every score is tracked. The History page
            shows you:
          </p>

          <div className="my-6 grid gap-4 md:grid-cols-2">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <div className="mb-2 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h4 className="font-bold" style={{ color: "#3C4A32" }}>
                  Hasan Score Trends
                </h4>
              </div>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Line charts showing how your total score and each category score
                have changed over your last 10, 20, 50 debates.
              </p>
            </div>

            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <div className="mb-2 flex items-center gap-2">
                <Award className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h4 className="font-bold" style={{ color: "#3C4A32" }}>
                  Category Breakdown
                </h4>
              </div>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                See which of the four Hasan categories (Fundamentals, Tricks,
                Behind Scenes, Finale) you have improved most.
              </p>
            </div>

            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <div className="mb-2 flex items-center gap-2">
                <Headphones className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h4 className="font-bold" style={{ color: "#3C4A32" }}>
                  Recording Playback
                </h4>
              </div>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Listen to any past debate. Hear how you sounded. Compare your
                early debates to your recent ones.
              </p>
            </div>

            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h4 className="font-bold" style={{ color: "#3C4A32" }}>
                  Technique Frequency
                </h4>
              </div>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                See which techniques you use most and least. Identify blind
                spots in your repertoire.
              </p>
            </div>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            After 10 debates, you will have enough data to see patterns. After
            50, you will see transformation.
          </p>

          {/* Section 7: The Opponent Analysis */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Know Your Enemy: Opponent Analysis
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The analysis also covers what your AI opponent did, teaching you to
            recognize techniques when they are used against you:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              Opponent Techniques Used
            </h4>
            <ul className="mb-4 space-y-2 text-sm" style={{ color: "#5C5C54" }}>
              <li>
                <strong>Gish Gallop (Exchange 6):</strong> Opponent threw 5
                claims in rapid succession
              </li>
              <li>
                <strong>Reframing (Exchange 9):</strong> Shifted debate from
                cost to moral obligation
              </li>
              <li>
                <strong>Credibility Attack (Exchange 12):</strong> Questioned
                your expertise directly
              </li>
            </ul>
            <h4 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
              Weaknesses You Failed to Exploit
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
              <li>
                Opponent cited a study from 2008. You could have challenged the
                relevance of 17-year-old data.
              </li>
              <li>
                Opponent made an absolute claim ("never works"). Perfect setup
                for a single counterexample.
              </li>
            </ul>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Learning to spot techniques in others is as important as learning to
            deploy them yourself.
          </p>

          {/* Section 8: The Executive Summary */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Executive Summary: Your Report Card
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Every analysis begins with a summary that gives you the big picture
            in seconds:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              Sample Executive Summary
            </h4>
            <p
              className="mb-4 text-sm leading-relaxed"
              style={{ color: "#5C5C54" }}
            >
              Strong fundamentals with excellent evidence deployment and
              audience connection. The opening story landed well and set an
              emotional foundation. However, the debate lost momentum in the
              middle section where several opportunities for judo moves and
              zingers were missed. The closing was abrupt and failed to
              capitalize on the emotional groundwork laid earlier.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p
                  className="mb-2 text-xs font-medium uppercase"
                  style={{ color: "#3C4A32" }}
                >
                  Top Strengths
                </p>
                <ul
                  className="space-y-1 text-sm"
                  style={{ color: "#5C5C54" }}
                >
                  <li>• Opening story with emotional hook</li>
                  <li>• Well-timed evidence deployment</li>
                  <li>• Composure under interruption</li>
                </ul>
              </div>
              <div>
                <p
                  className="mb-2 text-xs font-medium uppercase"
                  style={{ color: "#9A4A4A" }}
                >
                  Top Improvements
                </p>
                <ul
                  className="space-y-1 text-sm"
                  style={{ color: "#5C5C54" }}
                >
                  <li>• Closing needs emotional arc</li>
                  <li>• Deploy zingers when opportunities arise</li>
                  <li>• Use judo moves after conceding points</li>
                </ul>
              </div>
            </div>
            <div
              className="mt-4 rounded-lg p-3"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <p className="text-sm font-medium" style={{ color: "#3C4A32" }}>
                Verdict: Solid foundation with clear path to improvement. Focus
                on finishing stronger.
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
            Most people finish a debate and move on. They do not know what they
            did well. They do not know what they missed. They do not know what
            techniques they deployed or failed to deploy. They are flying blind.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            DebateClub gives you the tape review. Hasan Scores graded on his
            four-part structure. Technique scorecards with visual breakdowns.
            Missed opportunities with exact rewrites. Practice recommendations
            with drills and examples. Progress tracking over time. And recording
            playback so you can hear yourself improve.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            This is how champions are made. Not by winning once, but by learning
            from every fight.
          </p>

          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "Reps, reps, reps."
            <span className="mt-2 block text-sm not-italic">
              - Arnold Schwarzenegger, quoted in "Win Every Argument"
            </span>
          </blockquote>

          <p
            className="mt-4 text-lg font-medium leading-relaxed"
            style={{ color: "#3A3A35" }}
          >
            You have read the blueprint. Now build the skill.
          </p>

          {/* Series Navigation */}
          <div
            className="my-12 rounded-xl p-6"
            style={{ backgroundColor: "#3C4A32" }}
          >
            <h3
              className="mb-4 text-lg font-bold"
              style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
            >
              The Blueprint Series: Complete
            </h3>
            <div className="grid gap-3 md:grid-cols-3">
              <Link
                to="/blog/blueprint-part-1"
                className="rounded-lg p-4 transition-all hover:bg-white/20"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <p className="text-xs" style={{ color: "#C8D4B8" }}>
                  Part 1
                </p>
                <p className="font-medium" style={{ color: "#FAFAF8" }}>
                  ← Before You Speak
                </p>
              </Link>
              <Link
                to="/blog/blueprint-part-2"
                className="rounded-lg p-4 transition-all hover:bg-white/20"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <p className="text-xs" style={{ color: "#C8D4B8" }}>
                  Part 2
                </p>
                <p className="font-medium" style={{ color: "#FAFAF8" }}>
                  ← In the Arena
                </p>
              </Link>
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <p className="text-xs" style={{ color: "#C8D4B8" }}>
                  Part 3 (You are here)
                </p>
                <p className="font-medium" style={{ color: "#FAFAF8" }}>
                  After the Dust Settles
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className="mt-12 rounded-xl p-8 text-center"
            style={{ backgroundColor: "#2A2A20" }}
          >
            <div className="mb-4 flex justify-center">
              <Sparkles className="h-8 w-8" style={{ color: "#9A9A6D" }} />
            </div>
            <h3
              className="mb-4 text-2xl font-bold"
              style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
            >
              Ready to See Your Score?
            </h3>
            <p className="mb-6" style={{ color: "#C8C8B8" }}>
              Start your first practice debate and get a full Hasan Score
              analysis when you finish.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold transition-all hover:gap-3"
              style={{ backgroundColor: "#FAFAF8", color: "#3C4A32" }}
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Article Navigation */}
          <div
            className="mt-12 flex justify-between border-t pt-8"
            style={{ borderColor: "#E8E4DA" }}
          >
            <Link
              to="/blog/blueprint-part-2"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Part 2: In the Arena
            </Link>
            <Link
              to="/blog"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              Back to All Articles
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
