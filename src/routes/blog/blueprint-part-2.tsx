import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Mic,
  Zap,
  Shield,
  Swords,
  Volume2,
  Timer,
  Eye,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/blog/blueprint-part-2")({
  head: () => ({
    meta: [
      { title: "Practice Debates with AI Opponents | DebateClub" },
      {
        name: "description",
        content:
          "Voice-based sparring with real-time technique detection. AI opponents that interrupt, Gish Gallop, and test your composure. Based on Mehdi Hasan's methodology.",
      },
      {
        property: "og:title",
        content: "Practice Debates with AI Opponents | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Voice-based sparring with real-time technique detection. AI opponents that interrupt, Gish Gallop, and test your composure. Based on Mehdi Hasan's methodology.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: BlueprintPart2Article,
});

/**
 * Blog article: 16 Chapters, 1 Platform - Part 2
 * "In the Arena: Real-Time Battle Tactics"
 * Covers how DebateClub implements live debate practice and technique detection.
 */
function BlueprintPart2Article() {
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
              Part 2 of 3
            </span>
          </div>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            In the Arena: Real-Time Battle Tactics
          </h1>

          {/* Subtitle */}
          <p
            className="mb-6 text-xl leading-relaxed"
            style={{ color: "#5C5C54" }}
          >
            How we built a voice-based AI sparring partner that detects
            techniques, tests composure, and fights back.
          </p>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            11 min read · Behind the Build
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
            You cannot learn to box by reading about boxing. You cannot learn to
            debate by reading about debate. At some point, you have to get hit.
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            In Chapters 12 through 14 of "Win Every Argument," Mehdi Hasan
            hammers this point relentlessly. Confidence is built through
            exposure. Composure is built through pressure. Skill is built
            through repetition. Demosthenes, the greatest orator of ancient
            Greece, practiced by putting pebbles in his mouth and reciting
            speeches while running uphill.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            We could not replicate the pebbles. But we could build an AI
            opponent that interrupts you, challenges you, deploys techniques
            against you, and forces you to perform under pressure.{" "}
            <strong>
              This is what happens when you step into the arena.
            </strong>
          </p>

          {/* Section 1: Voice-First Design */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Voice-First: Why Typing Would Miss the Point
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Early prototypes of DebateClub used text-based chat. You typed your
            arguments. The AI typed back. It felt like messaging, not debating.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The problem is that debate is a performance art. Mehdi Hasan dedicates an
            entire chapter (Chapter 14) to "The 4 P's of Voice Control": Pitch,
            Power, Pace, and Pauses. None of these exist in text. You cannot
            practice timing in a chat window. You cannot practice composure when
            you have infinite time to craft a response.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            So we built DebateClub around voice. You speak into your microphone.
            The AI speaks back through your speakers. Interruptions happen
            naturally. Pauses have weight. And you have to think on your feet.
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: "#E8DFC8" }}
              >
                <Mic className="h-5 w-5" style={{ color: "#5C5444" }} />
              </div>
              <h4 className="font-bold" style={{ color: "#2A2A20" }}>
                The Vapi Integration
              </h4>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#5C5C54" }}
            >
              We use Vapi for voice handling because it natively supports
              interruptions. In a real debate, you do not politely wait for your
              opponent to finish. You jump in when you see an opening. Vapi lets
              both sides interrupt, creating the natural rhythm of
              confrontational conversation.
            </p>
          </div>

          {/* Section 2: The AI Opponent */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Your Opponent: Configurable Adversary
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The AI opponent is not generic. It is configured based on your
            opponent profile with specific talking points, debate style, and
            difficulty level.
          </p>

          <div className="my-6 grid gap-4 md:grid-cols-2">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Debate Styles
              </h4>
              <ul className="space-y-1 text-sm" style={{ color: "#5C5C54" }}>
                <li>
                  <strong>Aggressive:</strong> Interrupts frequently, attacks
                  credibility
                </li>
                <li>
                  <strong>Socratic:</strong> Asks probing questions, exposes
                  assumptions
                </li>
                <li>
                  <strong>Academic:</strong> Demands evidence, cites sources
                </li>
                <li>
                  <strong>Political:</strong> Pivots, reframes, uses talking
                  points
                </li>
              </ul>
            </div>

            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Difficulty Levels
              </h4>
              <ul className="space-y-1 text-sm" style={{ color: "#5C5C54" }}>
                <li>
                  <strong>Easy:</strong> 3-5 talking points, basic pushback
                </li>
                <li>
                  <strong>Medium:</strong> 5-7 talking points, uses techniques
                </li>
                <li>
                  <strong>Hard:</strong> 7-10 talking points, aggressive tactics
                </li>
              </ul>
            </div>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The opponent uses the talking points you provided (or that were
            generated for you) as steelmanned arguments. It will not throw
            strawmen at you. It will throw the strongest version of the opposing
            case.
          </p>

          {/* Section 3: Technique Detection */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Real-Time Technique Detection: The 11 Hasan Moves
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            As you debate, the system is analyzing your speech. Every exchange
            is run through an AI that detects whether you used any of the 11
            techniques from Mehdi Hasan's methodology:
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
                Detected Techniques
              </h4>
            </div>
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <pre className="whitespace-pre-wrap">
                {`DEFENSIVE TECHNIQUES (Judo Moves)
├── Concession & Pivot    Ch 8
├── Reframing             Ch 8
├── Preemption            Ch 8
└── Gish Gallop Defense   Ch 11

OFFENSIVE TECHNIQUES
├── Receipts (Evidence)   Ch 3
├── Zinger                Ch 9
├── Provocative Question  Ch 1
├── Personal Story        Ch 2
├── Rule of Three         Ch 7
└── Strategic Interrupt   Ch 9

CLOSING TECHNIQUE
└── Peroration            Ch 16`}
              </pre>
            </div>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Each technique is scored on effectiveness (1-10) based on execution
            quality and timing. A well-timed zinger scores higher than a zinger
            deployed awkwardly. A concession that leads nowhere scores lower
            than one that pivots into a devastating counter.
          </p>

          {/* Section 4: How Detection Works */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            How It Works: From Speech to Score
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The detection pipeline runs on every exchange:
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
                Detection Pipeline
              </h4>
            </div>
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <pre className="whitespace-pre-wrap">
                {`┌─────────────────────────────────────┐
│  1. SPEECH TRANSCRIPTION            │
│                                     │
│  Vapi captures your voice and       │
│  transcribes in real-time via       │
│  webhook to Convex backend          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  2. EXCHANGE STORAGE                │
│                                     │
│  Each turn stored with speaker,     │
│  timestamp, and full text           │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  3. TECHNIQUE ANALYSIS              │
│                                     │
│  AI analyzes the exchange:          │
│  - What technique was used?         │
│  - How well was it executed?        │
│  - Was the timing optimal?          │
│  - What was the opponent response?  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  4. SCORING                         │
│                                     │
│  Each technique scored 1-10         │
│  based on execution criteria        │
│  specific to that technique         │
└─────────────────────────────────────┘`}
              </pre>
            </div>
          </div>

          {/* Section 5: The Judo Moves */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Judo Moves: Defensive Excellence
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Chapter 8 of Mehdi Hasan's book is titled "Judo Moves" for a reason. In
            judo, you use your opponent's momentum against them. In debate, you
            do the same thing with words.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The system detects three core judo moves:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5" style={{ color: "#3C4A32" }} />
                <h4 className="font-bold" style={{ color: "#2A2A20" }}>
                  1. Concession & Pivot
                </h4>
              </div>
              <p
                className="mb-2 text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Acknowledge the valid part of your opponent's argument, then
                redirect to where they are wrong.
              </p>
              <div
                className="rounded-lg p-3 text-sm italic"
                style={{ backgroundColor: "#E5DFD3", color: "#5C5444" }}
              >
                "You are right that the initial costs are significant. But what
                you are missing is that those costs are dwarfed by the long-term
                savings..."
              </div>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Swords className="h-5 w-5" style={{ color: "#3C4A32" }} />
                <h4 className="font-bold" style={{ color: "#2A2A20" }}>
                  2. Preemption
                </h4>
              </div>
              <p
                className="mb-2 text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Address your opponent's argument before they can make it,
                stealing their thunder.
              </p>
              <div
                className="rounded-lg p-3 text-sm italic"
                style={{ backgroundColor: "#E5DFD3", color: "#5C5444" }}
              >
                "Now, I know what you are going to say: this has never worked
                anywhere. But before you go there, let me point you to Finland,
                which implemented this exact policy in 2017..."
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Zap className="h-5 w-5" style={{ color: "#3C4A32" }} />
                <h4 className="font-bold" style={{ color: "#2A2A20" }}>
                  3. Reframing
                </h4>
              </div>
              <p
                className="mb-2 text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Shift the fundamental premise of the debate to more favorable
                ground.
              </p>
              <div
                className="rounded-lg p-3 text-sm italic"
                style={{ backgroundColor: "#E5DFD3", color: "#5C5444" }}
              >
                "The real question is not whether we can afford to do this. The
                real question is whether we can afford not to..."
              </div>
            </div>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            When you use one of these moves, the system detects it and evaluates
            the execution. Did your concession feel genuine? Did your preemption
            actually anticipate their argument? Did your reframe shift the
            debate, or did they ignore it?
          </p>

          {/* Section 6: Gish Gallop Defense */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Gish Gallop: Your Opponent's Nuclear Option
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Chapter 11 is dedicated entirely to the Gish Gallop: the tactic of
            overwhelming your opponent with a firehose of dubious claims. Mehdi Hasan
            calls it "the reigning world heavyweight champion of bad-faith
            debate tactics."
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            On higher difficulty levels, your AI opponent will occasionally Gish
            Gallop you. It will throw seven claims in thirty seconds. If you try
            to address all of them, you lose. The system is testing whether you
            know the counter-strategy:
          </p>

          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{
              backgroundColor: "#FAFAF8",
              borderColor: "#3C4A32",
            }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              The Three-Step Gish Gallop Defense
            </h4>
            <div className="space-y-4 text-sm" style={{ color: "#5C5C54" }}>
              <div>
                <strong>Step 1: Pick Your Battle</strong>
                <p className="mt-1">
                  Single out the weakest or most absurd claim. Demolish it
                  thoroughly. Present it as representative of the entire
                  barrage.
                </p>
              </div>
              <div>
                <strong>Step 2: Do Not Budge</strong>
                <p className="mt-1">
                  Refuse to let the conversation move forward until they address
                  your refutation. Pin them down on the one point you have
                  destroyed.
                </p>
              </div>
              <div>
                <strong>Step 3: Call It Out</strong>
                <p className="mt-1">
                  Name the tactic explicitly: "My opponent just made seven
                  claims in thirty seconds. That is not argument. That is
                  distraction."
                </p>
              </div>
            </div>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            If you successfully deploy this defense, the system scores it. If
            you fall into the trap and try to address each claim, the analysis
            will flag it as a missed opportunity.
          </p>

          {/* Section 7: The Quick Reference Panel */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Your Cheat Sheet: The Quick Reference Panel
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            During the live debate, you have access to all your prep materials
            via a floating button. Tap it, and a bottom sheet slides up with
            tabs for:
          </p>

          <ul className="my-6 space-y-3">
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Your selected opening</strong> with delivery guidance
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Your argument frames</strong> organized by type
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Your receipts arsenal</strong> with timing notes
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Your zinger bank</strong> with trigger conditions
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Your prepared counters</strong> for predicted opponent
                arguments
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Your selected closing</strong> with emotional arc notes
              </span>
            </li>
          </ul>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            This is not cheating. This is how professionals prepare. Mehdi Hasan does
            not walk into interviews without notes. Neither should you.
          </p>

          {/* Section 8: Composure Testing */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Under Pressure: Composure Testing
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Chapter 13 is titled "Keep Calm and Carry On." Mehdi Hasan writes: "Losing
            your cool almost always means losing the argument."
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The AI opponent is designed to test your composure. Depending on
            configuration, it will:
          </p>

          <div className="my-6 grid gap-4 md:grid-cols-2">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <div className="mb-2 flex items-center gap-2">
                <Volume2 className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h4 className="font-bold" style={{ color: "#3C4A32" }}>
                  Interrupt Mid-Sentence
                </h4>
              </div>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Just as you build momentum on a key point, the opponent cuts in.
                Can you recover without losing your thread?
              </p>
            </div>

            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <div className="mb-2 flex items-center gap-2">
                <Eye className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h4 className="font-bold" style={{ color: "#3C4A32" }}>
                  Challenge Credibility
                </h4>
              </div>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                "What qualifies you to speak on this?" Do you get defensive, or
                do you redirect with grace?
              </p>
            </div>

            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <div className="mb-2 flex items-center gap-2">
                <Timer className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h4 className="font-bold" style={{ color: "#3C4A32" }}>
                  Demand Specifics
                </h4>
              </div>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                "Can you give me a single specific example?" If you do not have
                your receipts ready, you will fumble.
              </p>
            </div>

            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <div className="mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h4 className="font-bold" style={{ color: "#3C4A32" }}>
                  Dismiss with Contempt
                </h4>
              </div>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                "That is a naive understanding of the issue." Can you stay calm
                and respond with substance?
              </p>
            </div>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The post-debate analysis scores your composure. Did you rise to
            provocations, or did you stay focused on winning the argument?
          </p>

          {/* Section 9: Recording Everything */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Tape: Every Debate Recorded
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Every practice debate is recorded and stored. You can replay the
            audio from your debate history. Listen to how you sounded when you
            thought you were being confident. Often there is a gap between how
            we feel and how we come across.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            Professional athletes review game tape obsessively. Mehdi Hasan describes
            practicing delivery by recording himself and reviewing the footage.
            The recording feature gives you the same capability.
          </p>

          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "Film yourself, then assess whether your facial expressions match
            your message. Watch for gestures that underscore your points. Study
            your body language."
            <span className="mt-2 block text-sm not-italic">
              - Mehdi Hasan, "Win Every Argument"
            </span>
          </blockquote>

          {/* Closing */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Bottom Line
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            You can read about debate forever and never improve. Improvement
            comes from doing. From speaking under pressure. From being
            interrupted and finding your way back. From deploying a zinger and
            feeling it land. From failing to counter a Gish Gallop and learning
            the lesson viscerally.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            DebateClub gives you a sparring partner that fights back. It detects
            your techniques and scores them. It tests your composure. It records
            everything so you can review. And it adapts to your configured
            difficulty and opponent style.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The preparation phase built your arsenal. The arena is where you
            learn to use it.
          </p>

          <p
            className="mt-4 text-lg font-medium leading-relaxed"
            style={{ color: "#3A3A35" }}
          >
            Next in the series: what the analysis reveals when the fight is
            over.
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
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <p className="text-xs" style={{ color: "#C8D4B8" }}>
                  Part 2 (You are here)
                </p>
                <p className="font-medium" style={{ color: "#FAFAF8" }}>
                  In the Arena
                </p>
              </div>
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
              Ready to Step Into the Arena?
            </h3>
            <p className="mb-6" style={{ color: "#C8C8B8" }}>
              Create an opponent and start your first practice debate. The AI is
              waiting.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold transition-all hover:gap-3"
              style={{ backgroundColor: "#FAFAF8", color: "#3C4A32" }}
            >
              Start Debating
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Article Navigation */}
          <div
            className="mt-12 flex justify-between border-t pt-8"
            style={{ borderColor: "#E8E4DA" }}
          >
            <Link
              to="/blog/blueprint-part-1"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Part 1: Before You Speak
            </Link>
            <Link
              to="/blog/blueprint-part-3"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              Part 3: After the Dust Settles
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

