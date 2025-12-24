import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/use-cases/presentations")({
  head: () => ({
    meta: [
      {
        title:
          "Practice Handling Tough Questions in Presentations | DebateClub",
      },
      {
        name: "description",
        content:
          "The Q&A is where presentations are won or lost. Practice handling skeptics, hostile questions, and curveballs before your next big presentation.",
      },
      {
        property: "og:title",
        content:
          "Practice Handling Tough Questions in Presentations | DebateClub",
      },
      {
        property: "og:description",
        content:
          "The Q&A is where presentations are won or lost. Practice handling skeptics, hostile questions, and curveballs before your next big presentation.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: PresentationsPage,
});

/**
 * Use case page: Presentations and Q&A handling.
 * Shows how DebateClub helps executives, managers, and professionals
 * practice handling tough questions after presentations.
 */
function PresentationsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F3EF" }}>
      {/* Header */}
      <header
        className="border-b py-6"
        style={{ backgroundColor: "#FAFAF8", borderColor: "#E8E4DA" }}
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between px-8">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
            style={{ color: "#5C5C54" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <Link to="/">
            <span className="text-xl font-bold" style={{ color: "#2A2A20" }}>
              DebateClub
            </span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1
              className="mb-8 text-5xl font-bold leading-tight lg:text-6xl"
              style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
            >
              Own the Q&A
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mx-auto max-w-2xl text-xl leading-relaxed"
            style={{ color: "#5C5C54" }}
          >
            Your slides were perfect. Your delivery was smooth. Then someone
            asked a question that unraveled everything. The Q&A is where
            presentations are won or lost. Practice it.
          </motion.p>
        </motion.div>
      </section>

      {/* The Stakes */}
      <section className="mx-auto max-w-4xl px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="mb-16 text-3xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            What Is Actually at Stake
          </h2>
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="border-l-4 pl-8"
              style={{ borderColor: "#3C4A32" }}
            >
              <h3
                className="mb-3 text-2xl font-bold"
                style={{ color: "#2A2A20" }}
              >
                Executive Presence
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                How you handle challenges in front of a room defines how people
                see you. Confident responses signal leadership.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="border-l-4 pl-8"
              style={{ borderColor: "#5C6B4A" }}
            >
              <h3
                className="mb-3 text-2xl font-bold"
                style={{ color: "#2A2A20" }}
              >
                Project Buy-In
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Skeptics in the room can derail your initiative with one
                unanswered question. Handle their concerns and you have
                alignment.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="border-l-4 pl-8"
              style={{ borderColor: "#A8B08C" }}
            >
              <h3
                className="mb-3 text-2xl font-bold"
                style={{ color: "#2A2A20" }}
              >
                Career Moments
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Board presentations. All-hands meetings. Client pitches. These
                are the moments that define careers.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-4xl px-8">
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, #E8E4DA 50%, transparent)",
          }}
        />
      </div>

      {/* Why Traditional Prep Fails */}
      <section style={{ backgroundColor: "#FAFAF8" }}>
        <div className="mx-auto max-w-4xl px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="mb-16 text-3xl font-bold"
              style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
            >
              Why Traditional Presentation Prep Falls Short
            </h2>
            <div className="space-y-12">
              {[
                {
                  title: "Rehearsing your slides",
                  text: "You have the slides down. But slides do not ask hostile questions. The Q&A is a different skill entirely.",
                },
                {
                  title: "FAQ preparation",
                  text: "You wrote down the expected questions and your answers. But can you say them out loud under pressure?",
                },
                {
                  title: "Dry runs with colleagues",
                  text: "Colleagues ask softball questions. They do not channel your toughest stakeholder or the skeptic in the back row.",
                },
                {
                  title: '"I\'ll figure it out"',
                  text: "Winging it works until it does not. The question you did not anticipate is the one that derails you.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <h3
                    className="mb-3 text-xl font-bold"
                    style={{ color: "#2A2A20" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-lg leading-relaxed"
                    style={{ color: "#5C5C54" }}
                  >
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The DebateClub Approach */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#3C4A32" }}
      >
        {/* Premium background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative mx-auto max-w-4xl px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="mb-20 text-3xl font-bold"
              style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
            >
              The DebateClub Approach
            </h2>
            <div className="space-y-16">
              {[
                {
                  num: "1",
                  title: "Describe Your Presentation",
                  text: "What is the topic? Who is in the room? What are they skeptical about? The AI adapts to your specific situation.",
                },
                {
                  num: "2",
                  title: "Face the Tough Questions",
                  text: "The AI plays the skeptic, the devil's advocate, the executive who hates your idea. Handle them live.",
                },
                {
                  num: "3",
                  title: "Refine Your Responses",
                  text: "See which answers landed and which fumbled. Get rewritten versions of your weaker moments.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="flex gap-10"
                >
                  <div
                    className="flex h-20 w-20 flex-shrink-0 items-center justify-center text-5xl font-bold"
                    style={{ color: "#A8B08C" }}
                  >
                    {item.num}
                  </div>
                  <div className="pt-3">
                    <h3
                      className="mb-4 text-2xl font-bold"
                      style={{ color: "#FAFAF8" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-lg leading-relaxed"
                      style={{ color: "#C8D4B8" }}
                    >
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Question Types */}
      <section className="mx-auto max-w-4xl px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="mb-16 text-3xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Question Types You Will Handle
          </h2>
          <div className="space-y-12">
            {[
              {
                title: "The Skeptic",
                text: '"What evidence do you have that this will actually work?" Handle demands for proof without getting defensive.',
              },
              {
                title: 'The "What If"',
                text: '"What if the market shifts?" "What if we lose key people?" Demonstrate you have thought through contingencies.',
              },
              {
                title: "The Hostile Question",
                text: '"Last time we tried this it failed. Why should this be different?" Stay composed when someone wants to see you stumble.',
              },
              {
                title: "The Curveball",
                text: "Questions from left field that you did not anticipate. Practice buying time and redirecting gracefully.",
              },
              {
                title: '"I Don\'t Know"',
                text: "Sometimes you genuinely do not know. Practice saying it confidently and pivoting to what you do know.",
              },
              {
                title: "The Loaded Question",
                text: '"So you\'re saying we should ignore the risks?" Reframe false premises without taking the bait.',
              },
            ].map((scenario, index) => (
              <motion.div
                key={scenario.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3
                  className="mb-3 text-xl font-bold"
                  style={{ color: "#2A2A20" }}
                >
                  {scenario.title}
                </h3>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: "#5C5C54" }}
                >
                  {scenario.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-4xl px-8">
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, #E8E4DA 50%, transparent)",
          }}
        />
      </div>

      {/* Techniques That Matter */}
      <section style={{ backgroundColor: "#FAFAF8" }}>
        <div className="mx-auto max-w-4xl px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="mb-6 text-3xl font-bold"
              style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
            >
              Techniques That Command Rooms
            </h2>
            <p className="mb-16 text-lg" style={{ color: "#5C5C54" }}>
              From the 12 core techniques, these four matter most in Q&A:
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  to: "/blog/flip-their-momentum",
                  title: "Flip Their Momentum",
                  text: "\"That's a fair concern. Here's how we've addressed it...\" Acknowledge then redirect.",
                },
                {
                  to: "/blog/defuse-with-humor",
                  title: "Defuse with Humor",
                  text: "A well-timed quip can release tension and win the room. Know when and how to use it.",
                },
                {
                  to: "/blog/back-it-up",
                  title: "Back It Up",
                  text: 'When challenged, have specific data ready. "Actually, the research shows..." shuts down skeptics.',
                },
                {
                  to: "/blog/make-it-stick",
                  title: "Make It Stick",
                  text: 'Structure answers in threes. "Three reasons this will work..." sticks in memory.',
                },
              ].map((technique, index) => (
                <motion.div
                  key={technique.to}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={technique.to}
                    className="group block h-full rounded-xl border-2 p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
                    style={{
                      backgroundColor: "#F5F3EF",
                      borderColor: "#E8E4DA",
                    }}
                  >
                    <h3
                      className="mb-4 text-xl font-bold transition-colors group-hover:underline"
                      style={{ color: "#2A2A20" }}
                    >
                      {technique.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "#5C5C54" }}
                    >
                      {technique.text}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Before/After */}
      <section className="mx-auto max-w-4xl px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="mb-16 text-3xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Before and After Practice
          </h2>
          <div className="grid gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div
                className="mb-8 inline-block rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wider shadow-sm"
                style={{ backgroundColor: "#FFF5F5", color: "#7C2D2D" }}
              >
                Before: Dreading the Q&A
              </div>
              <ul className="space-y-5">
                {[
                  "Rush through slides hoping for no questions",
                  "Ramble when challenged",
                  "Get flustered by hostile questions",
                  "Leave feeling like you lost the room",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    className="text-lg leading-relaxed"
                    style={{ color: "#5C5C54" }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div
                className="mb-8 inline-block rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wider shadow-sm"
                style={{ backgroundColor: "#F0FDF4", color: "#166534" }}
              >
                After: Welcoming Questions
              </div>
              <ul className="space-y-5">
                {[
                  "Invite questions confidently",
                  "Structured answers that land",
                  "Stay composed under fire",
                  "Leave with buy-in and respect",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    className="text-lg leading-relaxed"
                    style={{ color: "#5C5C54" }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#3C4A32" }}
      >
        {/* Premium background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative mx-auto max-w-4xl px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 text-4xl font-bold lg:text-5xl"
              style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
            >
              Your Next Presentation Is Coming
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-12 text-lg"
              style={{ color: "#C8D4B8" }}
            >
              Describe your audience. Face their toughest questions. Walk in
              ready.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link
                to="/login"
                className="group inline-flex items-center gap-3 rounded-full px-10 py-5 text-lg font-semibold shadow-2xl transition-all hover:gap-4 hover:shadow-xl"
                style={{ backgroundColor: "#FAFAF8", color: "#3C4A32" }}
              >
                Start Practicing Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: "#E8E4DA" }}>
        <div className="mx-auto max-w-4xl px-8 text-center">
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
