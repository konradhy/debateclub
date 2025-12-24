import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/use-cases/pitching-fundraising")({
  head: () => ({
    meta: [
      { title: "Practice Your Investor Pitch | DebateClub" },
      {
        name: "description",
        content:
          "VCs ask hard questions. Practice your pitch, handle objections about market size, team, and traction. Walk into the room ready.",
      },
      {
        property: "og:title",
        content: "Practice Your Investor Pitch | DebateClub",
      },
      {
        property: "og:description",
        content:
          "VCs ask hard questions. Practice your pitch, handle objections about market size, team, and traction. Walk into the room ready.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: PitchingFundraisingPage,
});

/**
 * Use case page: Pitching and fundraising.
 * Shows how DebateClub helps founders practice investor pitches,
 * board presentations, and handling tough VC questions.
 */
function PitchingFundraisingPage() {
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
              Nail Your Investor Pitch
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mx-auto max-w-2xl text-xl leading-relaxed"
            style={{ color: "#5C5C54" }}
          >
            VCs have seen thousands of pitches. They will find every hole in
            your story. Practice handling their questions before you are in the
            room.
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
                Millions in Funding
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                One pitch can mean the difference between building your vision
                and running out of runway. The stakes could not be higher.
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
                Limited Shots
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                There are only so many relevant VCs. A bad first impression
                closes doors. You need to be ready before you walk in.
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
                Valuation Impact
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Confident founders get better terms. How you handle hard
                questions directly affects your cap table.
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
              Why Traditional Pitch Prep Falls Short
            </h2>
            <div className="space-y-12">
              {[
                {
                  title: "Perfecting your deck",
                  text: "Your slides are beautiful. But VCs interrupt on slide 3. Can you handle that?",
                },
                {
                  title: "Pitching to your co-founders",
                  text: 'They already believe. They do not ask "Why won\'t Google just build this?"',
                },
                {
                  title: "Demo day practice",
                  text: "Great for the 3-minute pitch. Does not prepare you for the 30-minute partner meeting.",
                },
                {
                  title: "Advisor feedback",
                  text: "Helpful for deck structure. But advisors do not grill you like a skeptical GP.",
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
                  title: "Set Up Your Pitch",
                  text: "What is your company? What stage? What are your known weaknesses? The AI investor adapts.",
                },
                {
                  num: "2",
                  title: "Face the Hard Questions",
                  text: '"Why you?" "Why now?" "What if Amazon enters?" Handle the questions that make founders sweat.',
                },
                {
                  num: "3",
                  title: "Sharpen Your Answers",
                  text: "See where you rambled. Get tighter versions. Practice until your answers are crisp and confident.",
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

      {/* VC Questions */}
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
            Questions VCs Will Ask
          </h2>
          <div className="space-y-12">
            {[
              {
                title: '"Why will you win?"',
                text: "Your moat. Your unfair advantage. Why competitors will not catch up. Have a crisp answer.",
              },
              {
                title: '"What if [BigCo] builds this?"',
                text: "Google, Amazon, Microsoft. They will ask about all of them. Have a reason why you will still win.",
              },
              {
                title: '"Your numbers seem aggressive"',
                text: "Defend your projections. Show the assumptions. Be realistic without being defeatist.",
              },
              {
                title: '"Why are you the team to do this?"',
                text: "Your background, your insight, your obsession. Why you will outwork everyone else.",
              },
              {
                title: '"What keeps you up at night?"',
                text: "Show self-awareness. Acknowledge risks. Then explain your plan to mitigate them.",
              },
              {
                title: '"Why this valuation?"',
                text: "Justify your ask. Comparables, milestones, what you will achieve with the capital.",
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
              Techniques That Close Rounds
            </h2>
            <p className="mb-16 text-lg" style={{ color: "#5C5C54" }}>
              From the 12 core techniques, these four matter most for founders:
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  to: "/blog/strike-emotional-chord",
                  title: "Strike an Emotional Chord",
                  text: "Your origin story. Why this problem keeps you up at night. Make them feel your conviction.",
                },
                {
                  to: "/blog/back-it-up",
                  title: "Back It Up",
                  text: "Metrics, customer quotes, market data. Have receipts ready for every claim you make.",
                },
                {
                  to: "/blog/own-your-weaknesses",
                  title: "Own Your Weaknesses",
                  text: "\"Yes, we're early. Here's why that's exactly the right time to invest...\"",
                },
                {
                  to: "/blog/make-it-stick",
                  title: "Make It Stick",
                  text: "Three reasons to invest. Three metrics that matter. Triads that partners remember in the debrief.",
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
                Before: Hoping for the Best
              </div>
              <ul className="space-y-5">
                {[
                  "Ramble when interrupted",
                  "Get defensive on hard questions",
                  "Leave uncertain how it went",
                  'Hear "we\'ll get back to you"',
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
                After: Walking in Ready
              </div>
              <ul className="space-y-5">
                {[
                  "Handle interruptions smoothly",
                  "Welcome hard questions as opportunities",
                  "Leave knowing you nailed it",
                  "Move to next steps",
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
              Your Fundraise Is Too Important to Wing
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-12 text-lg"
              style={{ color: "#C8D4B8" }}
            >
              Set up your pitch. Face the hard questions. Walk in ready.
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
