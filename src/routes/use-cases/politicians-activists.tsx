import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/use-cases/politicians-activists")({
  head: () => ({
    meta: [
      { title: "Practice Political Debates and Media Appearances | DebateClub" },
      {
        name: "description",
        content:
          "Town halls, hostile interviews, policy debates. Practice handling gotcha questions and opposition attacks before you're on camera.",
      },
      {
        property: "og:title",
        content: "Practice Political Debates and Media Appearances | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Town halls, hostile interviews, policy debates. Practice handling gotcha questions and opposition attacks before you're on camera.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: PoliticiansActivistsPage,
});

/**
 * Use case page: Politicians and activists.
 * Shows how DebateClub helps candidates, organizers, and advocates
 * practice town halls, media appearances, and policy debates.
 */
function PoliticiansActivistsPage() {
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
              Win the Public Debate
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mx-auto max-w-2xl text-xl leading-relaxed"
            style={{ color: "#5C5C54" }}
          >
            Town halls have hecklers. Interviews have gotcha questions.
            Opponents have opposition research. Practice handling all of it
            before the cameras roll.
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
                Votes and Support
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Every public appearance is a chance to win supporters or lose
                them. A single bad moment can define a campaign.
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
                Media Narrative
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                The clip that goes viral determines how you are seen. One
                stumble gets replayed. One great response breaks through.
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
                Movement Building
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                Your ability to articulate the cause determines who joins.
                Compelling advocates build movements.
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
              Why Traditional Campaign Prep Falls Short
            </h2>
            <div className="space-y-12">
              {[
                {
                  title: "Debate prep with staff",
                  text: "Staff knows your positions. They do not attack you like a real opponent. They pull punches.",
                },
                {
                  title: "Message testing",
                  text: "Polling tells you what to say. It does not prepare you to say it when someone is shouting at you.",
                },
                {
                  title: "Media training sessions",
                  text: "Expensive and infrequent. One session before the interview is not enough reps to build instinct.",
                },
                {
                  title: "Q&A cards",
                  text: "Written answers are not spoken answers. And the hostile questioner will not use the phrasing you practiced.",
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
      <section className="relative overflow-hidden" style={{ backgroundColor: "#3C4A32" }}>
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
                  title: "Set the Stage",
                  text: "Town hall, cable interview, formal debate. Your opponent's attack angles. Your known vulnerabilities.",
                },
                {
                  num: "2",
                  title: "Face the Fire",
                  text: "The AI plays the hostile interviewer, the heckler, the opponent with oppo research. Handle it live.",
                },
                {
                  num: "3",
                  title: "Sharpen the Message",
                  text: "See where you rambled. Get tighter sound bites. Practice until your answers are crisp and quotable.",
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

      {/* Political Scenarios */}
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
            Scenarios You Will Face
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Town Hall Questions",
                text: "The constituent who is angry, afraid, or hostile. Connect with them while making your point.",
              },
              {
                title: "Cable News Interviews",
                text: "The gotcha question. The false premise. The interruption. Stay on message without seeming evasive.",
              },
              {
                title: "Opponent Attacks",
                text: "They have your voting record. Your old quotes. Your donors. Respond without looking defensive.",
              },
              {
                title: "Policy Debates",
                text: "Go deep on your signature issue. Handle the edge cases and hypotheticals. Show command.",
              },
              {
                title: "Flip-Flop Questions",
                text: '"You said the opposite in 2019." Own the evolution. Explain without excuses.',
              },
              {
                title: "Coalition Building",
                text: "Persuade skeptical allies. Find common ground with opposition. Build the base.",
              },
            ].map((scenario, index) => (
              <motion.div
                key={scenario.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="rounded-xl p-6"
                style={{ backgroundColor: "#FAFAF8" }}
              >
                <h3
                  className="mb-3 text-xl font-bold"
                  style={{ color: "#2A2A20" }}
                >
                  {scenario.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
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
              Techniques That Win Elections
            </h2>
            <p className="mb-16 text-lg" style={{ color: "#5C5C54" }}>
              From the 12 core techniques, these four matter most in public
              debate:
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  to: "/blog/read-any-room",
                  title: "Read Any Room",
                  text: "Sense the crowd. Adjust the message. Connect with the people in front of you, not the ones you imagined.",
                },
                {
                  to: "/blog/land-the-closer",
                  title: "Land the Closer",
                  text: 'The zinger that defines the debate. "Senator, you\'re no Jack Kennedy." Make it count.',
                },
                {
                  to: "/blog/cut-through-the-noise",
                  title: "Cut Through the Noise",
                  text: "When they Gish Gallop you with accusations, pick one and demolish it. Do not chase every claim.",
                },
                {
                  to: "/blog/strike-emotional-chord",
                  title: "Strike an Emotional Chord",
                  text: "Policy is dry. Stories move people. The individual case that makes the issue real.",
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
                Before: Hoping for Softballs
              </div>
              <ul className="space-y-5">
                {[
                  "Get flustered by hostile questions",
                  "Ramble and lose the sound bite",
                  "Take the bait on attacks",
                  "Leave clips that haunt you",
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
                After: Owning the Room
              </div>
              <ul className="space-y-5">
                {[
                  "Turn hostile questions into opportunities",
                  "Deliver quotable answers",
                  "Stay on message under fire",
                  "Create the clips that break through",
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
      <section className="relative overflow-hidden" style={{ backgroundColor: "#3C4A32" }}>
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
              Your Cause Deserves Your Best Voice
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-12 text-lg"
              style={{ color: "#C8D4B8" }}
            >
              Set up the scenario. Face the attacks. Walk in prepared.
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
