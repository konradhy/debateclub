import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Flag, Sparkles, Mic } from "lucide-react";

export const Route = createFileRoute("/blog/stick-the-landing")({
  head: () => ({
    meta: [
      {
        title: "How to End a Debate So They Remember | DebateClub",
      },
      {
        name: "description",
        content:
          "\"Free at last\" was not improvised. Craft closings that audiences quote years later. The peroration from Mehdi Hasan's Win Every Argument.",
      },
      {
        property: "og:title",
        content: "How to End a Debate So They Remember | DebateClub",
      },
      {
        property: "og:description",
        content:
          "\"Free at last\" was not improvised. Craft closings that audiences quote years later. The peroration from Mehdi Hasan's Win Every Argument.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: StickTheLandingArticle,
});

/**
 * Blog article: Stick the Landing technique deep dive.
 * Explores Mehdi Hasan's Chapter 11: "The Peroration" and how
 * DebateClub trains users to deliver powerful, memorable closings.
 */
function StickTheLandingArticle() {
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
            The Finale
          </span>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Stick the Landing: The Art of the Peroration
          </h1>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            9 min read · Technique 12 of 12
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
            Martin Luther King Jr. did not end "I Have a Dream" with a policy
            recommendation. Winston Churchill did not close his wartime speeches
            with logistics. The greatest orators in history understood what
            Mehdi Hasan makes explicit in Chapter 11 of "Win Every Argument":{" "}
            <strong>
              the ending is what people remember, and memory is emotion
            </strong>
            .
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            The ancient Greeks had a word for this: peroration. It is the
            closing section of a speech, where the orator summarizes their case,
            makes a final appeal to emotion, and sends the audience out with a
            feeling they will not forget. Mehdi Hasan argues that most modern
            debaters completely neglect this. They run out of time, they trail
            off, or they end with a limp "so, yeah" that squanders everything
            they built.
          </p>

          {/* Section 1: Why Endings Matter */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Psychology of Last Impressions
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Mehdi Hasan explains why endings carry disproportionate weight:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Flag className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  Recency Effect
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Humans remember the last thing they heard disproportionately
                well. Psychologists call this the "recency effect." Your closing
                words are the words the audience carries with them.
              </p>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  Emotional Peak
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                The ending is your last chance to make the audience feel
                something. A debate that ends on logic alone leaves people
                intellectually convinced but emotionally unmoved. Emotion drives
                action.
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Mic className="h-4 w-4" style={{ color: "#3C4A32" }} />
                <h3 className="text-lg font-bold" style={{ color: "#3C4A32" }}>
                  Sense of Completion
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                A strong ending signals mastery. It tells the audience you knew
                exactly where you were going and you arrived confidently. A weak
                ending makes everything before it feel unfinished.
              </p>
            </div>
          </div>

          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "The conclusion is what audiences remember most... a well-prepared,
            well-delivered speech without a peroration dribbles off and leaves
            an audience unsatisfied."
            <span className="mt-2 block text-sm not-italic">
              - William Safire, quoted by Mehdi Hasan in "Win Every Argument"
            </span>
          </blockquote>

          {/* Section 2: The Peroration Formula */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Mehdi Hasan's Three-Part Peroration
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Mehdi Hasan outlines a specific structure for powerful closings:
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
                  Summarize Your Wins
                </h4>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Remind the audience what you proved. Not everything you said,
                  just the highlights. "Today I showed you three things..." Use
                  the Rule of Three to make it memorable.
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
                  Make a Call to Action
                </h4>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Tell the audience what to do with what they learned. Vote,
                  donate, share, change their mind, take action. Give them a
                  concrete next step. People want to be told what to do.
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
                  End with Emotion
                </h4>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Your final sentence should make them feel something. Hope,
                  urgency, outrage, pride. Return to a story you told earlier.
                  Reference a phrase you used. Close the loop with feeling.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Types of Closings */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Closing Toolkit
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Mehdi Hasan identifies several types of powerful closings:
          </p>

          <div className="my-6 grid gap-4">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                The Callback
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Return to a story or phrase from your opening. "Remember the
                teacher I told you about? She is still rationing her insulin
                tonight. That is why we need to act now." The loop creates
                narrative satisfaction.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                The Vision
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Paint a picture of the future you are arguing for. "Imagine a
                world where..." Make it concrete and desirable. Let them see
                what they are fighting for.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                The Challenge
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Issue a direct challenge to the audience. "The question is not
                whether we can afford to do this. The question is whether we can
                afford not to. Which side of history will you be on?"
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                The Quote
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                End with powerful words from someone respected. Let a greater
                voice carry your final message. Choose a quote that reinforces
                your exact thesis.
              </p>
            </div>
          </div>

          {/* Section 4: How DebateClub Trains This */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            How DebateClub Trains the Peroration
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Most people never practice closings. They run out of time in
            rehearsal or they improvise and hope for the best. DebateClub makes
            the peroration a deliberate skill:
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
                Peroration Training Pipeline
              </h4>
            </div>
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <pre className="whitespace-pre-wrap">
                {`┌──────────────────────────────────────┐
│  PREP: CLOSING GENERATION            │
│                                      │
│  Your prep materials include 3       │
│  crafted closings:                   │
│                                      │
│  • Call to Action type: concrete     │
│    next steps for the audience       │
│                                      │
│  • Emotional Appeal type: story      │
│    callback with feeling             │
│                                      │
│  • Vision type: picture of the       │
│    future you are fighting for       │
│                                      │
│  Each includes delivery guidance:    │
│  pacing, pauses, where to modulate   │
│  voice for maximum impact            │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  DURING DEBATE                       │
│                                      │
│  Quick Reference panel keeps your    │
│  chosen closing accessible:          │
│                                      │
│  • The exact words to use            │
│  • Delivery notes inline             │
│  • Backup options if primary does    │
│    not fit how debate unfolded       │
│                                      │
│  Your opponent creates clean endings │
│  so you can practice delivering      │
│  your peroration without interruption│
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  POST-DEBATE ANALYSIS                │
│                                      │
│  Your coaching evaluates:            │
│                                      │
│  • Did you deliver a clear summary?  │
│  • Did you include a call to action? │
│  • Did you end with emotion?         │
│  • Did your closing feel prepared    │
│    or improvised/weak?               │
│  • Did you stick the landing?        │
└──────────────────────────────────────┘`}
              </pre>
            </div>
          </div>

          {/* Section 5: The Prepared vs. Improvised Ending */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Why Prepared Closings Sound Better
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Mehdi Hasan emphasizes that the best closings are written in
            advance, even though they must sound spontaneous:
          </p>

          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{
              backgroundColor: "#FAFAF8",
              borderColor: "#3C4A32",
            }}
          >
            <h4 className="mb-4 font-bold" style={{ color: "#2A2A20" }}>
              The Prepared Closing Advantage
            </h4>
            <div className="space-y-3 text-sm" style={{ color: "#5C5C54" }}>
              <p>
                <strong>Word choice is refined:</strong> You have time to find
                exactly the right words, the right rhythm, the right final
                phrase.
              </p>
              <p>
                <strong>Structure is clean:</strong> Summary, call to action,
                emotion. The three parts flow naturally because you planned
                them.
              </p>
              <p>
                <strong>Callbacks are set up:</strong> You can reference your
                opening story because you wrote the closing to connect to it.
              </p>
              <p>
                <strong>Delivery is practiced:</strong> You know where to pause,
                where to slow down, where to make eye contact.
              </p>
              <p>
                <strong>Confidence shows:</strong> The audience can feel the
                difference between someone landing exactly where they planned
                and someone hoping for the best.
              </p>
            </div>
          </div>

          {/* Section 6: Example in Action */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Peroration in Action
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Here is the difference between a weak ending and a Mehdi Hasan-style
            peroration:
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
                Weak Ending
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "So, yeah, I think we should support this policy because it
                makes sense economically and also helps people, so... yeah."
              </p>
              <p className="mt-2 text-sm" style={{ color: "#888880" }}>
                No summary, no call to action, no emotion. The debate dribbles
                off.
              </p>
            </div>
            <div>
              <span
                className="inline-block rounded-md px-2 py-1 text-xs font-medium"
                style={{ backgroundColor: "#E4FFE4", color: "#2D7C2D" }}
              >
                Strong Peroration
              </span>
              <p className="mt-2 italic" style={{ color: "#5C5C54" }}>
                "Today I showed you three things: this policy is affordable,
                it is achievable, and it is morally necessary. [Summary] So
                when you leave this room, I want you to call your
                representative. Tell them you support this. Tell them you are
                watching. [Call to Action] Because remember the teacher I told
                you about? Maria, who rations her insulin? She is watching too.
                She is counting on us. Let us not let her down. [Emotion]"
              </p>
              <p className="mt-2 text-sm" style={{ color: "#888880" }}>
                Summary, call to action, callback to opening story, emotional
                close. The landing is stuck.
              </p>
            </div>
          </div>

          {/* Section 7: Expected Results */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            What Changes After Practice
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            After practicing perorations across multiple debates, you will
            notice:
          </p>

          <div className="my-6 grid grid-cols-2 gap-4">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                No More Trailing Off
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You never again end with "so, yeah" or run out of things to say.
                You know exactly where you are going.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Lasting Impressions
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                People remember your final words. Your closing becomes the thing
                they quote and recall.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Emotional Resonance
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                You leave audiences feeling something, not just thinking
                something. Emotion drives action.
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-2 font-bold" style={{ color: "#3C4A32" }}>
                Structural Mastery
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                The three-part peroration becomes instinct. Summary, call to
                action, emotion. You can deliver it under any conditions.
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
            Martin Luther King Jr. did not improvise "Free at last, free at
            last, thank God Almighty, we are free at last." That ending was
            crafted, refined, and delivered with precision. It is the reason we
            still quote those words sixty years later.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            DebateClub gives you prepared closings for every debate. Three
            options, each with delivery guidance. Your Quick Reference panel
            keeps them accessible. Your analysis evaluates whether you stuck the
            landing or let it dribble off.
          </p>

          <p
            className="mt-4 text-lg font-medium leading-relaxed"
            style={{ color: "#3A3A35" }}
          >
            They will forget most of what you said. Make sure they remember how
            you ended.
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
              Ready to Master the Finish?
            </h3>
            <p className="mb-6" style={{ color: "#C8C8B8" }}>
              Get crafted closings for every debate and practice delivering them
              until the landing becomes instinct.
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
              to="/blog/own-your-weaknesses"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous: Own Your Weaknesses
            </Link>
            <Link
              to="/blog"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              Back to All Techniques
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
