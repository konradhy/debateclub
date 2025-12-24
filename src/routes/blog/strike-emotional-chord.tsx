import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart, Brain, Mic } from "lucide-react";

export const Route = createFileRoute("/blog/strike-emotional-chord")({
  head: () => ({
    meta: [
      { title: "Why Emotion Beats Logic in Arguments | DebateClub" },
      {
        name: "description",
        content:
          "Facts don't change minds — feelings do. Master storytelling, word choice, and delivery that moves people. Hasan's pathos playbook.",
      },
      {
        property: "og:title",
        content: "Why Emotion Beats Logic in Arguments | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Facts don't change minds — feelings do. Master storytelling, word choice, and delivery that moves people. Hasan's pathos playbook.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: StrikeEmotionalChordArticle,
});

/**
 * Blog article: Strike an Emotional Chord technique deep dive.
 * Explores Mehdi Hasan's Chapter 2: "Feelings, Not (Just) Facts" and how
 * DebateClub trains users to master pathos alongside logos.
 */
function StrikeEmotionalChordArticle() {
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
            Pathos Training
          </span>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Strike an Emotional Chord: Why Facts Alone Will Never Win
          </h1>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            9 min read · Technique 2 of 12
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
            In 1988, Michael Dukakis destroyed his presidential campaign with
            two sentences. When CNN's Bernard Shaw asked whether he would
            support the death penalty if his wife Kitty were raped and murdered,
            Dukakis gave a calm, clinical answer about his opposition to capital
            punishment. His poll numbers collapsed within 48 hours.
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            Dukakis was technically correct. His policy position was coherent
            and well-reasoned. But he failed to do the one thing that question
            demanded: he failed to show that he was a human being who could
            feel. Mehdi Hasan opens Chapter 2 of "Win Every Argument" with this
            story because it illustrates the central insight of his entire
            methodology: <strong>pathos beats logos almost every time</strong>.
          </p>

          {/* Section 1: The Neuroscience */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Science Behind Emotional Persuasion
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Ben Shapiro famously says "facts don't care about your feelings."
            Hasan's counterargument: your feelings don't care about the facts
            either. And there is hard science behind this.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            Neuroscientist Antonio Damasio's research shows that patients with
            damage to the emotional centers of their brains struggle to make
            even simple decisions, despite having fully functional logical
            faculties. Emotion is not the enemy of reason. It is the engine that
            drives it. Hasan quotes Damasio directly: "Humans are not just
            thinking machines or feeling machines, but{" "}
            <strong>feeling machines that think</strong>."
          </p>

          <div
            className="my-8 flex items-start gap-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: "#E8DFC8" }}
            >
              <Brain className="h-6 w-6" style={{ color: "#5C5444" }} />
            </div>
            <div>
              <h4 className="mb-2 font-bold" style={{ color: "#2A2A20" }}>
                Deborah Small's Charity Study
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Researchers presented donors with two options. Option A:
                statistics about millions of starving people in Africa. Option
                B: a story about a single starving girl named Rokia. Donors who
                saw Rokia's story gave <strong>over twice as much</strong> as
                those who saw the statistics. When researchers showed both the
                story AND the statistics together, donations dropped. The facts
                actually undermined the emotional connection.
              </p>
            </div>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            This is not a flaw in human cognition. It is how we are wired.
            Stories create connection. Statistics create distance. If you want
            to move people to action, you must first move their hearts.
          </p>

          {/* Section 2: The Three Strategies */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Three Strategies for Mastering Pathos
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Hasan identifies three core strategies for engaging emotion in
            debate. Each requires practice to execute naturally under pressure.
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
                1. Tell a Story
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Hasan writes: "There is simply no better way to influence or
                stir an audience instantly, powerfully, authentically, than by
                opening up to them with a personal story." But not just any
                story. The best stories feature a <strong>single person</strong>{" "}
                facing a specific problem. They include sensory details that put
                the audience in the scene. And they connect to the argument
                through emotion, not explicit logic.
              </p>
            </div>

            <div className="mb-6">
              <h3
                className="mb-2 text-lg font-bold"
                style={{ color: "#3C4A32" }}
              >
                2. Choose Words Carefully
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Compare these two sentences: "Ukraine was invaded by Russia."
                "Defenseless and innocent Ukrainians are suffering under
                bombardment." Both convey the same information. Only one makes
                you feel something. Hasan's rule: use descriptive adjectives,
                assertive verbs, and nouns that command attention. Emotion is
                encoded in word choice.
              </p>
            </div>

            <div>
              <h3
                className="mb-2 text-lg font-bold"
                style={{ color: "#3C4A32" }}
              >
                3. Show, Don't Tell
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Winston Churchill wrote that the orator "is the embodiment of
                the passions of the multitude." If you want the audience to feel
                outrage, you must feel outrage. If you want them to feel hope,
                you must radiate hope. This is not acting. It is allowing
                yourself to genuinely feel what you are arguing for, and
                expressing that feeling through voice, face, and body.
              </p>
            </div>
          </div>

          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "Authenticity and humanity are communicated through the expression
            of emotions, not their concealment."
            <span className="mt-2 block text-sm not-italic">
              - Mehdi Hasan, "Win Every Argument"
            </span>
          </blockquote>

          {/* Section 3: The DebateClub Approach */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            How DebateClub Trains Emotional Delivery
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The challenge with emotional persuasion is that it cannot be
            memorized. You cannot read a script and sound authentic. The skill
            must become instinctive, which means you need practice in live
            conditions where you are speaking, not reading.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            DebateClub trains emotional delivery through three integrated
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
                Emotional Training Pipeline
              </h4>
            </div>
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <pre className="whitespace-pre-wrap">
                {`┌──────────────────────────────────────┐
│  PHASE 1: PREP MATERIALS             │
│                                      │
│  Your opening statements include:    │
│                                      │
│  • "Personal Story" type with        │
│    sensory details and emotional     │
│    through-line specified            │
│                                      │
│  • Delivery guidance: "Pause here,   │
│    let emotion land, eye contact     │
│    across the room"                  │
│                                      │
│  • Each closing specifies an         │
│    "emotional arc": hope? urgency?   │
│    righteous anger?                  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  PHASE 2: LIVE DEBATE PRACTICE       │
│                                      │
│  The AI opponent creates pressure:   │
│                                      │
│  • Interrupts emotional moments      │
│    to test your composure            │
│                                      │
│  • Dismisses your stories with       │
│    cold statistics, forcing you      │
│    to hold emotional ground          │
│                                      │
│  • Tests whether you can FEEL        │
│    conviction, not just state it     │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  PHASE 3: POST-DEBATE ANALYSIS       │
│                                      │
│  Your coaching analysis evaluates:   │
│                                      │
│  • "Emotional Appeal" technique      │
│    execution score (1-5)             │
│                                      │
│  • Moments where story landed        │
│    vs. fell flat                     │
│                                      │
│  • Missed opportunities where you    │
│    argued facts when you should      │
│    have told a story                 │
│                                      │
│  • Rewrites showing how to inject    │
│    pathos into dry passages          │
└──────────────────────────────────────┘`}
              </pre>
            </div>
          </div>

          {/* Section 4: Stories vs. Stats */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Story-First Prep Strategy
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            When DebateClub generates your prep materials, emotional content is
            not an afterthought. Every component is designed with pathos in
            mind:
          </p>

          <ul className="my-6 space-y-3">
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Opening Statements</strong>: Three types generated, but
                the "Personal Story" option includes specific notes on sensory
                details and the emotional through-line the story should follow.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Argument Frames</strong>: Each frame includes an
                "emotionalCore" field (hope, outrage, pride, fear) so you know
                what the audience should feel, not just think.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Receipts</strong>: Statistics are formatted with
                deployment guidance that tells you how to introduce them
                emotionally, not just factually. "Let me tell you about a single
                family..." before citing the broader statistic.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Closing Statements</strong>: Each includes an "emotional
                arc" specification: building from argument to urgency to
                empowerment, or from story to triumph.
              </span>
            </li>
          </ul>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The goal is to have emotional tools ready before you enter the
            debate, so that deploying them becomes a tactical choice, not a
            scramble.
          </p>

          {/* Section 5: The Delivery Guidance System */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Delivery Notes That Actually Help
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Telling someone to "speak with emotion" is useless. DebateClub's
            prep materials include specific, actionable delivery guidance for
            each element:
          </p>

          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{
              backgroundColor: "#FAFAF8",
              borderColor: "#3C4A32",
            }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              Example: Personal Story Opening Delivery Notes
            </h4>
            <div className="space-y-3 text-sm" style={{ color: "#5C5C54" }}>
              <p>
                <strong>Pacing:</strong> Start slow. Let the first sentence land
                before continuing. The silence is where emotion lives.
              </p>
              <p>
                <strong>Eye Contact:</strong> Pick three people in different
                sections of the room. Tell the story to each of them in turn.
              </p>
              <p>
                <strong>Voice:</strong> Drop your volume on the most emotional
                detail. The audience will lean in.
              </p>
              <p>
                <strong>The Pivot:</strong> After the story, pause for a full
                breath before connecting to your argument. Do not rush the
                transition.
              </p>
            </div>
          </div>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            These notes are not generic. They are generated based on the
            specific content of your story and the emotional arc you are trying
            to achieve.
          </p>

          {/* Section 6: Real-Time Feedback */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            What the Analysis Shows You
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            After each practice debate, your analysis includes an "Emotional
            Appeal" category in the technique scorecard. This is scored 1-5
            based on:
          </p>

          <div className="my-6 grid grid-cols-2 gap-4">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <div className="mb-2 flex items-center gap-2">
                <Heart className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h4 className="font-bold" style={{ color: "#3C4A32" }}>
                  Story Deployment
                </h4>
              </div>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Did you use personal anecdotes? Did they connect to your
                argument naturally, or feel forced?
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <div className="mb-2 flex items-center gap-2">
                <Mic className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h4 className="font-bold" style={{ color: "#3C4A32" }}>
                  Conviction Display
                </h4>
              </div>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Did you sound like you believed what you were saying? Or were
                you reciting points?
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <div className="mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h4 className="font-bold" style={{ color: "#3C4A32" }}>
                  Balance of Pathos/Logos
                </h4>
              </div>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Did you lead with emotion and support with facts? Or did you
                bury emotion under data?
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <div className="mb-2 flex items-center gap-2">
                <Heart className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h4 className="font-bold" style={{ color: "#3C4A32" }}>
                  Emotional Moments
                </h4>
              </div>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Were there moments where the audience would have felt something?
                Or was the debate purely intellectual?
              </p>
            </div>
          </div>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The analysis also identifies missed opportunities: moments where you
            argued facts when you should have told a story, or where you stated
            a position when you should have shown conviction.
          </p>

          {/* Section 7: The Rewrite System */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            See the Difference: Before and After
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            One of the most valuable features in the post-debate analysis is the
            "Rewrites" section. When the AI identifies a dry passage that could
            have been more emotionally engaging, it shows you exactly how:
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
                Original (Dry)
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "Universal healthcare would provide coverage to 28 million
                currently uninsured Americans while reducing overall healthcare
                costs by 13%."
              </p>
            </div>
            <div>
              <span
                className="inline-block rounded-md px-2 py-1 text-xs font-medium"
                style={{ backgroundColor: "#E4FFE4", color: "#2D7C2D" }}
              >
                Rewritten (Emotional)
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "Last month, a teacher in my district rationed her insulin
                because she couldn't afford the full dose. She has health
                insurance. She still couldn't afford the medicine that keeps her
                alive. There are 28 million Americans in her situation right
                now. Universal healthcare means no more rationing. No more
                choosing between medicine and groceries."
              </p>
            </div>
            <p
              className="mt-4 text-sm font-medium"
              style={{ color: "#3C4A32" }}
            >
              <strong>Why it works:</strong> Single identifiable victim →
              sensory detail ("rationing") → emotional stakes ("keeps her
              alive") → then the statistic lands harder because we care.
            </p>
          </div>

          {/* Section 8: When to Go Full Emotion */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Start and End With Emotion
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Hasan's specific guidance: "Start with emotion and end with
            emotion." These are the two moments your audience will remember
            most. The opening hooks them. The closing sends them out the door
            with a feeling.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            This is why DebateClub generates multiple opening types and multiple
            closing types for every debate. You can choose to open with a
            provocative question if the audience is skeptical and needs to be
            intrigued first. But if the audience is neutral or supportive, the
            personal story will create immediate connection.
          </p>

          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "The conclusion is what audiences remember most... a well-prepared,
            well-delivered speech without a peroration dribbles off and leaves
            an audience unsatisfied."
            <span className="mt-2 block text-sm not-italic">
              - William Safire, quoted in "Win Every Argument"
            </span>
          </blockquote>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            Your closing statements include an "emotional arc" field for exactly
            this reason. Build from argument to urgency to empowerment. Or build
            from story to sobriety to hope. The arc is the structure. The
            emotion is the content.
          </p>

          {/* Closing */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Bottom Line
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Michael Dukakis lost not because his position was wrong, but because
            he forgot that persuasion runs through the heart before it reaches
            the brain. He treated a question about his wife's hypothetical
            murder as a policy debate. The audience did not forgive that
            coldness.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            DebateClub trains you to avoid that mistake. Every prep element
            includes emotional guidance. Every live debate tests whether you can
            feel conviction under pressure. Every analysis shows you where you
            connected, and where you lost the room to dry logic.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            Facts matter. But they matter more when they arrive wrapped in a
            story. They matter more when delivered with visible passion. They
            matter more when the audience believes you care.
          </p>

          <p
            className="mt-4 text-lg font-medium leading-relaxed"
            style={{ color: "#3A3A35" }}
          >
            Strike the chord first. Then make the argument.
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
              Ready to Practice Pathos?
            </h3>
            <p className="mb-6" style={{ color: "#C8C8B8" }}>
              Create your first opponent profile and get prep materials with
              emotional delivery guidance built in.
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
              to="/blog/read-any-room"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous: Read Any Room
            </Link>
            <Link
              to="/blog/back-it-up"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              Next: Back It Up
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
