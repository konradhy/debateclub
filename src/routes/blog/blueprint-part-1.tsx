import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Target,
  Search,
  FileText,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/blog/blueprint-part-1")({
  head: () => ({
    meta: [
      { title: "How to Prepare for Any Debate | DebateClub" },
      {
        name: "description",
        content:
          'Research, strategy, and the prep system behind DebateClub. How we turned Hasan\'s "do your homework" chapter into AI-powered debate preparation.',
      },
      {
        property: "og:title",
        content: "How to Prepare for Any Debate | DebateClub",
      },
      {
        property: "og:description",
        content:
          'Research, strategy, and the prep system behind DebateClub. How we turned Hasan\'s "do your homework" chapter into AI-powered debate preparation.',
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: BlueprintPart1Article,
});

/**
 * Blog article: 16 Chapters, 1 Platform - Part 1
 * "Before You Speak: The Art of Preparation"
 * Covers how DebateClub implements Hasan's research and prep methodology.
 */
function BlueprintPart1Article() {
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
              Part 1 of 3
            </span>
          </div>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Before You Speak: The Art of Preparation
          </h1>

          {/* Subtitle */}
          <p
            className="mb-6 text-xl leading-relaxed"
            style={{ color: "#5C5C54" }}
          >
            How we turned Mehdi Hasan's research methodology into an AI-powered
            preparation system.
          </p>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            12 min read · Behind the Build
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
            Mehdi Hasan calls it "The Document." Before every major interview on
            MSNBC, he compiles a comprehensive research dossier on his guest.
            Their past statements. Their contradictions. Their credentials and
            where those credentials fall short. The strongest version of their
            argument. And the traps he can set using their own words.
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            In Chapter 15 of "Win Every Argument," Hasan writes: "By failing to
            prepare, you are preparing to fail." He estimates that preparation
            accounts for 80% of winning any debate. The other 20% is execution.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            When we built DebateClub, we started with a question:{" "}
            <strong>What if an AI could build The Document for you?</strong> Not
            a generic summary, but a strategic brief that reads like Hasan
            himself wrote it. This is how we did it.
          </p>

          {/* Section 1: The Strategic Brief */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Strategic Brief: Where Everything Begins
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Most AI tools would take your inputs and turn them into a bulleted
            list. We rejected that approach immediately. Hasan does not prepare
            with bullet points. He prepares with context, narrative, and
            strategic implications.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            So we built the Strategic Brief pattern. When you create an opponent
            profile in DebateClub, you can fill in up to 23 optional fields
            across three categories. But instead of dumping those fields into
            prompts mechanically, we synthesize them into a flowing narrative
            that reads like a colleague briefing you before a high-stakes
            meeting.
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
                Example: Raw Fields vs. Strategic Brief
              </h4>
            </div>
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <pre className="whitespace-pre-wrap">
                {`RAW FIELDS (what you enter):
─────────────────────────────────────
Topic: Universal Basic Income
Position: FOR
Audience Type: Professional
Audience Disposition: Skeptical
Opponent: Dr. James Morrison
Opponent Organization: Cato Institute
Opponent Credentials: Labor Economics PhD
Opponent Past Statements: "UBI would 
  destroy the work ethic"
Opponent Contradictions: Supported cash
  transfers for veterans in 2019

STRATEGIC BRIEF (what the AI receives):
─────────────────────────────────────
Your debater is arguing FOR the motion:
"Universal Basic Income should be 
implemented."

They will be presenting to a skeptical
professional audience. Expect resistance.
Acknowledge their concerns early, use
judo moves to concede valid points,
then pivot to your strongest arguments.

Their opponent is Dr. James Morrison
from the Cato Institute. He has 
credentials in labor economics, but
his track record shows a contradiction
worth exploiting: he predicted UBI 
would "destroy the work ethic," yet
later supported veteran cash transfers.
This is trap-worthy material.

STEELMANNING THEIR CASE:
Their strongest argument will likely
center on inflation concerns and labor
market disincentives. Their best
evidence includes CBO deficit studies.
Prepare counters for these specifically.`}
              </pre>
            </div>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            This brief flows through every AI generation in the system. The
            opening statement generator sees it. The receipts generator sees it.
            The zinger generator sees it. Every piece of prep is contextually
            aware of your specific situation.
          </p>

          {/* Section 2: The 23 Fields */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            23 Fields, Three Categories, Zero Required
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            We organized the opponent profile into three categories, each
            mapping to specific chapters in Hasan's book:
          </p>

          {/* Category Cards */}
          <div className="my-6 space-y-4">
            {/* Audience Context */}
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#E8DFC8" }}
                >
                  <Users className="h-5 w-5" style={{ color: "#5C5444" }} />
                </div>
                <div>
                  <h3 className="font-bold" style={{ color: "#2A2A20" }}>
                    Audience Context
                  </h3>
                  <p className="text-xs" style={{ color: "#888880" }}>
                    From Chapter 1: Winning Over an Audience
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div style={{ color: "#5C5C54" }}>• Audience Description</div>
                <div style={{ color: "#5C5C54" }}>• Audience Type</div>
                <div style={{ color: "#5C5C54" }}>• Audience Size</div>
                <div style={{ color: "#5C5C54" }}>• Audience Disposition</div>
                <div style={{ color: "#5C5C54" }}>• Debate Format</div>
              </div>
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Hasan writes: "The audience is your judge and jury." These
                fields determine whether your prep materials emphasize
                credibility-building (skeptical audience), energy and validation
                (supportive audience), or curiosity-creation (neutral audience).
              </p>
            </div>

            {/* Opponent Intel */}
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#E8DFC8" }}
                >
                  <Target className="h-5 w-5" style={{ color: "#5C5444" }} />
                </div>
                <div>
                  <h3 className="font-bold" style={{ color: "#2A2A20" }}>
                    Opponent Intelligence
                  </h3>
                  <p className="text-xs" style={{ color: "#888880" }}>
                    From Chapters 4, 10, 15: The Three C's, Traps, Homework
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div style={{ color: "#5C5C54" }}>• Opponent Description</div>
                <div style={{ color: "#5C5C54" }}>• Organization</div>
                <div style={{ color: "#5C5C54" }}>• Credentials</div>
                <div style={{ color: "#5C5C54" }}>• Credential Weaknesses</div>
                <div style={{ color: "#5C5C54" }}>• Past Statements</div>
                <div style={{ color: "#5C5C54" }}>• Contradictions</div>
                <div style={{ color: "#5C5C54" }}>• Track Record</div>
                <div style={{ color: "#5C5C54" }}>• Debate Style</div>
                <div style={{ color: "#5C5C54" }}>• Rhetorical Tendencies</div>
                <div style={{ color: "#5C5C54" }}>• Triggers</div>
                <div style={{ color: "#5C5C54" }}>• Strongest Arguments</div>
                <div style={{ color: "#5C5C54" }}>• Best Evidence</div>
                <div style={{ color: "#5C5C54" }}>• Likely Critiques</div>
                <div style={{ color: "#5C5C54" }}>• Character Issues</div>
              </div>
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                This is where Hasan's Three C's come alive: Challenge their
                Character, Credentials, and Claims. The "Past Statements" and
                "Contradictions" fields are specifically designed for setting
                booby traps (Chapter 10).
              </p>
            </div>

            {/* User Directives */}
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#E8DFC8" }}
                >
                  <FileText className="h-5 w-5" style={{ color: "#5C5444" }} />
                </div>
                <div>
                  <h3 className="font-bold" style={{ color: "#2A2A20" }}>
                    Your Context & Directives
                  </h3>
                  <p className="text-xs" style={{ color: "#888880" }}>
                    Your strategic preferences
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div style={{ color: "#5C5C54" }}>• Your Research Notes</div>
                <div style={{ color: "#5C5C54" }}>• Key Points to Make</div>
                <div style={{ color: "#5C5C54" }}>• Things to Avoid</div>
                <div style={{ color: "#5C5C54" }}>• Desired Tone</div>
              </div>
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                These fields let you steer the AI. If you want to appear
                statesmanlike, say so. If there is a topic you are less prepared
                on, tell the system to avoid it. Your prep materials will honor
                these directives.
              </p>
            </div>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Every field is optional. If you only know the topic and your
            position, the system still works. But the more context you provide,
            the more tailored your preparation becomes.
          </p>

          {/* Section 3: Deep Research */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Deep Research: Finding What Others Miss
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            In Chapter 3, Hasan emphasizes that "the most compelling evidence is
            often buried beyond the first page of Google." He tells the story of
            researching John Bolton's ties to MEK, a formerly designated
            terrorist organization. That evidence was not on page one. He had to
            dig.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            DebateClub offers two research systems. System A uses Firecrawl to
            scrape specific URLs you provide. System B uses Google's Gemini Deep
            Research agent, which autonomously searches for 3-20 minutes,
            synthesizes findings, and returns a comprehensive report with
            sources.
          </p>

          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{
              backgroundColor: "#FAFAF8",
              borderColor: "#3C4A32",
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Search className="h-5 w-5" style={{ color: "#3C4A32" }} />
              <h4 className="font-bold" style={{ color: "#2A2A20" }}>
                What Deep Research Finds
              </h4>
            </div>
            <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
              <li>
                • Current statistics from authoritative sources (not just
                Wikipedia)
              </li>
              <li>• Real-world case studies and precedents</li>
              <li>
                • The strongest arguments made BY the opposition (for
                steelmanning)
              </li>
              <li>
                • Common objections from skeptics (if your audience is hostile)
              </li>
              <li>• Past statements by your opponent (if a public figure)</li>
              <li>• Evidence supporting your key points to make</li>
            </ul>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The research is then fed into all subsequent prep generation. Your
            receipts come from this research. Your argument frames reference it.
            Your zingers can quote from it.
          </p>

          {/* Section 4: The Generated Materials */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            What Gets Built: The Complete Prep Arsenal
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Once research is complete, the system generates seven categories of
            prep materials. Each is specifically designed around Hasan's
            methodology:
          </p>

          {/* Materials Grid */}
          <div className="my-6 grid gap-4 md:grid-cols-2">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Opening Statements (3 types)
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Personal Story, Provocative Question, Bold Statement. Each
                includes delivery guidance: where to pause, what to emphasize,
                eye contact cues. (Chapter 1)
              </p>
            </div>

            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Argument Frames (6-10)
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Moral, Practical, Economic, Historical frames. Each includes an
                "emotionalCore" field and deployment guidance for specific
                audience types. (Chapters 2, 7)
              </p>
            </div>

            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Receipts Arsenal (6-10)
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Statistics, expert quotes, case studies, opponent's own words.
                Each includes timing guidance: when to deploy for maximum
                impact. (Chapter 3)
              </p>
            </div>

            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Zinger Bank (8-12)
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Prepared one-liners with trigger conditions, setup notes,
                aftermath guidance, tone, and risk level. Includes trap zingers
                using opponent's words. (Chapters 9, 10)
              </p>
            </div>

            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Closing Statements (3 types)
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Quote, Anecdote, Call to Action. Each specifies an emotional
                arc: building from argument to urgency to empowerment. (Chapter
                16)
              </p>
            </div>

            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Opponent Intel (4-6 predictions)
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Steelmanned opponent arguments with prepared counters using Judo
                Moves (Concession, Preemption, Reframing). Includes Gish Gallop
                protocol. (Chapters 8, 11, 15)
              </p>
            </div>

            <div
              className="col-span-full rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Research Synthesis
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Overview of the debate landscape, points of consensus, points of
                contention, key statistics, quotable quotes, and strategic
                insights. (Chapter 15)
              </p>
            </div>
          </div>

          {/* Section 5: The Prep Chat */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Prep Chat: Your Research Assistant
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Sometimes you need to ask a specific question about your research.
            "What evidence do I have against their inflation argument?" or
            "Summarize the key statistics from my sources."
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The Prep Chat is a RAG-powered chatbot that has access to everything
            in your prep materials. All your research articles. All your
            generated openings, arguments, receipts, zingers, and closings. The
            full Strategic Brief. And your last 10 messages for conversation
            context.
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div className="mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" style={{ color: "#3C4A32" }} />
              <h4 className="font-bold" style={{ color: "#2A2A20" }}>
                Example Prep Chat Queries
              </h4>
            </div>
            <ul className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
              <li>"What are the strongest arguments for my position?"</li>
              <li>"What evidence do I have to counter economic objections?"</li>
              <li>"Summarize the key statistics from my research."</li>
              <li>"What weaknesses should I prepare for?"</li>
              <li>"Give me a zinger for when they bring up costs."</li>
            </ul>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The chatbot is aware of your strategic context, so its answers are
            tailored to your specific audience and opponent.
          </p>

          {/* Section 6: Progress Tracking */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Watching It Work: Real-Time Progress
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Strategy generation is not instantaneous. Deep Research can take
            several minutes. So we built a real-time progress tracker that shows
            you exactly where the system is:
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
                Generation Progress Phases
              </h4>
            </div>
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <pre className="whitespace-pre-wrap">
                {`Phase 1: Researching      ████████░░  [3-20 min]
Phase 2: Extracting       ██████████  [~30 sec]
Phase 3: Generating...
   └─ Openings            ██████████  [~15 sec]
   └─ Arguments           ████████░░  [~20 sec]
   └─ Receipts            ██░░░░░░░░  [~20 sec]
   └─ Zingers             ░░░░░░░░░░  [~15 sec]
   └─ Closings            ░░░░░░░░░░  [~15 sec]
   └─ Opponent Intel      ░░░░░░░░░░  [~20 sec]
Phase 4: Storing          ░░░░░░░░░░  [~5 sec]
Phase 5: Complete         ░░░░░░░░░░`}
              </pre>
            </div>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Each phase updates in real-time as the AI works through your
            preparation. You can watch your arsenal being built.
          </p>

          {/* Section 7: The Prep Screen */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Before the Debate: The Prep Screen
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Once generation is complete, you land on the Prep Screen. This is
            your war room before battle. You can:
          </p>

          <ul className="my-6 space-y-3">
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Review all generated materials</strong> organized into
                tabs: Openings, Arguments, Receipts, Zingers, Closings, Opponent
                Intel, Research
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Select which opening and closing</strong> you plan to
                use based on your audience
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Query the Prep Chat</strong> for specific questions
                about your materials
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Add your own research</strong> via the "My Research" tab
                for AI extraction
              </span>
            </li>
          </ul>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            And critically: this is not just a review screen. It is accessible
            during the live debate via a floating button. Your prep is always
            one tap away.
          </p>

          {/* Closing */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Bottom Line
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Hasan's preparation methodology is not complicated. Research deeply.
            Know your audience. Know your opponent. Steelman their best case.
            Set traps with their own words. Have your evidence ready with timing
            guidance.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            What is complicated is doing all of this for every debate. That is
            why most people skip it. And that is why most people lose arguments
            they should win.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            DebateClub automates the 80%. You provide the context. The AI builds
            The Document. All that remains is the fight.
          </p>

          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "Preparation is not optional. It is the foundation upon which
            everything else stands. The speaker who walks in unprepared is not
            just foolish, they are disrespectful to their audience and their
            opponent."
            <span className="mt-2 block text-sm not-italic">
              - Mehdi Hasan, "Win Every Argument"
            </span>
          </blockquote>

          <p
            className="mt-4 text-lg font-medium leading-relaxed"
            style={{ color: "#3A3A35" }}
          >
            Next in the series: what happens when you step into the arena.
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
              The Blueprint Series
            </h3>
            <div className="grid gap-3 md:grid-cols-3">
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <p className="text-xs" style={{ color: "#C8D4B8" }}>
                  Part 1 (You are here)
                </p>
                <p className="font-medium" style={{ color: "#FAFAF8" }}>
                  Before You Speak
                </p>
              </div>
              <Link
                to="/blog/blueprint-part-2"
                className="rounded-lg p-4 transition-all hover:bg-white/20"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <p className="text-xs" style={{ color: "#C8D4B8" }}>
                  Part 2
                </p>
                <p className="font-medium" style={{ color: "#FAFAF8" }}>
                  In the Arena →
                </p>
              </Link>
              <Link
                to="/blog/blueprint-part-3"
                className="rounded-lg p-4 transition-all hover:bg-white/20"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <p className="text-xs" style={{ color: "#C8D4B8" }}>
                  Part 3
                </p>
                <p className="font-medium" style={{ color: "#FAFAF8" }}>
                  After the Dust Settles →
                </p>
              </Link>
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
              Ready to Build Your Document?
            </h3>
            <p className="mb-6" style={{ color: "#C8C8B8" }}>
              Create an opponent profile and watch the AI build your prep
              arsenal in real-time.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold transition-all hover:gap-3"
              style={{ backgroundColor: "#FAFAF8", color: "#3C4A32" }}
            >
              Start Preparing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Article Navigation */}
          <div
            className="mt-12 flex justify-between border-t pt-8"
            style={{ borderColor: "#E8E4DA" }}
          >
            <Link
              to="/blog"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Link>
            <Link
              to="/blog/blueprint-part-2"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              Part 2: In the Arena
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
