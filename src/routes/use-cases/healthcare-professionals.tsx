import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/use-cases/healthcare-professionals")({
  head: () => ({
    meta: [
      { title: "Practice Difficult Patient Conversations | DebateClub" },
      {
        name: "description",
        content:
          "Breaking bad news, non-compliant patients, family conflicts. Practice the conversations that medical school didn't teach you.",
      },
      {
        property: "og:title",
        content: "Practice Difficult Patient Conversations | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Breaking bad news, non-compliant patients, family conflicts. Practice the conversations that medical school didn't teach you.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: HealthcareProfessionalsPage,
});

/**
 * Use case page: Healthcare professionals.
 * Shows how DebateClub helps doctors, nurses, and healthcare workers
 * practice difficult patient conversations, family discussions, and more.
 */
function HealthcareProfessionalsPage() {
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
              Communicate When It
              <br />
              Matters Most
          </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mx-auto max-w-2xl text-xl leading-relaxed"
            style={{ color: "#5C5C54" }}
          >
            The hardest part of medicine is often the conversation, not the
            diagnosis. Breaking bad news. Convincing non-compliant patients.
            Navigating family conflict. Practice until you can do it with
            compassion and clarity.
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
                  Patient Outcomes
                </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                  Patients who understand and trust you follow treatment plans.
                  Communication directly affects clinical outcomes.
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
                  Patient Experience
                </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                  How you deliver information matters as much as what you
                  deliver. Bad news handled well is bearable. Handled poorly, it
                  traumatizes.
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
                  Your Wellbeing
                </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                  Difficult conversations take a toll. Having the skills to
                  handle them reduces burnout and moral injury.
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
            Why Traditional Medical Training Falls Short
          </h2>
            <div className="space-y-12">
              {[
                {
                  title: "Standardized patient encounters",
                  text: "A few sessions in medical school. Not enough reps to build the instinct for real-world complexity.",
                },
                {
                  title: "Observing senior colleagues",
                  text: "Watching is not doing. You need to practice the words coming out of your own mouth.",
                },
                {
                  title: "Communication frameworks",
                  text: "SPIKES, NURSE. Great frameworks. But patients do not follow scripts. You need to practice the unexpected.",
                },
                {
                  title: "Learning on real patients",
                  text: "Your first attempt at breaking bad news should not be with a real patient facing real devastation.",
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
                  title: "Set Up the Scenario",
                  text: "What is the diagnosis? Who is the patient? What is their likely reaction? The AI adapts to your specific case.",
                },
                {
                  num: "2",
                  title: "Have the Conversation",
                  text: "The AI responds as a scared patient, an angry family member, or a non-compliant diabetic. Handle it in real time.",
                },
                {
                  num: "3",
                  title: "Refine Your Approach",
                  text: "See where you could have been clearer or more compassionate. Get suggestions. Practice until it feels natural.",
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

      {/* Clinical Scenarios */}
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
            Conversations You Can Practice
          </h2>
          <div className="space-y-12">
            {[
              {
                title: "Breaking Bad News",
                text: "Cancer diagnosis. Chronic disease. Prognosis conversations. Deliver devastating news with compassion and clarity.",
              },
              {
                title: "Non-Compliant Patients",
                text: '"I stopped taking my meds." "I know I should quit smoking." Motivate change without lecturing.',
              },
              {
                title: "Family Conflict",
                text: "Families who disagree about care. Angry relatives. Navigating competing interests while advocating for the patient.",
              },
              {
                title: "End-of-Life Discussions",
                text: "Goals of care. DNR conversations. Helping patients and families make the hardest decisions.",
              },
              {
                title: "Medical Errors",
                text: "Disclosing errors honestly. Apologizing effectively. Maintaining trust after something went wrong.",
              },
              {
                title: "Seeking Consent",
                text: "Explaining risks and benefits. Ensuring understanding. Respecting autonomy while recommending care.",
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
              Techniques for Clinical Communication
            </h2>
            <p className="mb-16 text-lg" style={{ color: "#5C5C54" }}>
              From the 12 core techniques, these four matter most in healthcare:
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  to: "/blog/read-any-room",
                  title: "Read Any Room",
                  text: "Sense when patients need you to slow down. When they are ready to hear more. When they need silence.",
                },
                {
                  to: "/blog/strike-emotional-chord",
                  title: "Strike an Emotional Chord",
                  text: "Connect with their fear before explaining the treatment. Empathy first, information second.",
                },
                {
                  to: "/blog/own-your-weaknesses",
                  title: "Own Your Weaknesses",
                  text: '"I don\'t have all the answers, but here\'s what I know..." Honesty builds trust.',
                },
                {
                  to: "/blog/make-it-stick",
                  title: "Make It Stick",
                  text: "Three things to remember. Three next steps. Structure information so overwhelmed patients can retain it.",
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
                Before: Dreading the Conversation
              </div>
              <ul className="space-y-5">
                {[
                  "Rush through bad news",
                  "Not know what to say when they cry",
                  "Feel helpless with non-compliant patients",
                  "Carry the weight home",
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
                After: Communicating with Confidence
              </div>
              <ul className="space-y-5">
                {[
                  "Deliver news with compassion and clarity",
                  "Sit with emotion without panicking",
                  "Motivate change effectively",
                  "Feel prepared for hard conversations",
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
              Your Patients Deserve Your Best Communication
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-12 text-lg"
              style={{ color: "#C8D4B8" }}
            >
              Set up the scenario. Practice the conversation. Walk in prepared.
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
