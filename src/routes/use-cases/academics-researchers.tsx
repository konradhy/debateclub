import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/use-cases/academics-researchers")({
  head: () => ({
    meta: [
      { title: "Practice Thesis Defense and Academic Presentations | DebateClub" },
      {
        name: "description",
        content:
          "Committee questions, conference Q&A, peer review responses. Practice defending your research before the committee convenes.",
      },
      {
        property: "og:title",
        content: "Practice Thesis Defense and Academic Presentations | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Committee questions, conference Q&A, peer review responses. Practice defending your research before the committee convenes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: AcademicsResearchersPage,
});

/**
 * Use case page: Academics and researchers.
 * Shows how DebateClub helps PhD students, professors, and researchers
 * practice thesis defenses, conference presentations, and peer review responses.
 */
function AcademicsResearchersPage() {
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
              Defend Your Research
              <br />
              with Confidence
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mx-auto max-w-2xl text-xl leading-relaxed"
            style={{ color: "#5C5C54" }}
          >
            Your committee will find the holes in your methodology. Conference
            attendees will challenge your conclusions. Practice handling every
            hard question before you face them for real.
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
                Your Degree
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Years of research come down to a few hours of defense. How you
                handle committee questions determines whether you pass.
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
                Academic Reputation
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Conference presentations and peer interactions build your
                reputation. Each appearance is a chance to establish
                credibility.
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
                Funding and Collaboration
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Grant reviewers, potential collaborators, and hiring
                committees all assess how well you articulate your work.
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
              Why Traditional Academic Prep Falls Short
            </h2>
            <div className="space-y-12">
              {[
                {
                  title: "Practice talks with your advisor",
                  text: "Your advisor knows your work. They do not challenge it the way an external committee member will.",
                },
                {
                  title: "Lab meeting presentations",
                  text: "Friendly audiences. Softball questions. Not the same pressure as a hostile reviewer or skeptical committee.",
                },
                {
                  title: "Anticipating questions in your head",
                  text: "Thinking about answers is different from speaking them clearly under pressure. The words do not come out the same.",
                },
                {
                  title: "Mock defenses",
                  text: "Hard to coordinate. Faculty are busy. You get one practice session when you need ten.",
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
                  title: "Describe Your Research",
                  text: "Your field, your methodology, your known limitations. The AI committee adapts to your specific work.",
                },
                {
                  num: "2",
                  title: "Face the Committee",
                  text: 'Methodology challenges. Alternative explanations. "What about X?" Handle every hard question live.',
                },
                {
                  num: "3",
                  title: "Refine Your Responses",
                  text: "See where you rambled. Get clearer formulations. Practice until your answers are precise and confident.",
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

      {/* Academic Scenarios */}
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
            Scenarios You Can Practice
          </h2>
          <div className="space-y-12">
            {[
              {
                title: "Thesis/Dissertation Defense",
                text: "Committee challenges to your methodology, findings, and theoretical framework. Handle the deep questions.",
              },
              {
                title: "Qualifying Exams",
                text: "Breadth questions across your field. Demonstrate command of the literature and your contribution to it.",
              },
              {
                title: "Conference Q&A",
                text: "The senior scholar who challenges your premise. The rival lab with competing results. Handle them gracefully.",
              },
              {
                title: "Job Talks",
                text: "Present your research program. Handle faculty questions. Show you belong in the department.",
              },
              {
                title: "Grant Panels",
                text: "Defend your proposal. Address reviewer concerns. Articulate the impact of your work.",
              },
              {
                title: "Peer Review Responses",
                text: "Craft compelling responses to Reviewer 2. Address criticisms without sounding defensive.",
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
              Techniques for Academic Success
            </h2>
            <p className="mb-16 text-lg" style={{ color: "#5C5C54" }}>
              From the 12 core techniques, these four matter most in academia:
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  to: "/blog/back-it-up",
                  title: "Back It Up",
                  text: "Citations, data, methodology. Every claim backed by evidence. The receipts matter most in academia.",
                },
                {
                  to: "/blog/own-your-weaknesses",
                  title: "Own Your Weaknesses",
                  text: "Acknowledge limitations before they point them out. Show you understand your work's boundaries.",
                },
                {
                  to: "/blog/flip-their-momentum",
                  title: "Flip Their Momentum",
                  text: '"That\'s a great question, and it actually supports my argument because..." Turn challenges into opportunities.',
                },
                {
                  to: "/blog/make-it-stick",
                  title: "Make It Stick",
                  text: "Three contributions. Three implications. Structure your talk so they remember the key points.",
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
                Before: Dreading the Defense
              </div>
              <ul className="space-y-5">
                {[
                  "Lose your train on methodology questions",
                  "Get defensive when challenged",
                  "Ramble through complex explanations",
                  "Leave feeling like you undersold your work",
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
                After: Commanding the Room
              </div>
              <ul className="space-y-5">
                {[
                  "Clear, confident explanations",
                  "Welcome questions as opportunities",
                  "Precise answers that demonstrate depth",
                  "Leave knowing the committee saw your best",
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
              Your Research Deserves a Great Defense
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-12 text-lg"
              style={{ color: "#C8D4B8" }}
            >
              Describe your work. Face the committee. Walk in prepared.
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
