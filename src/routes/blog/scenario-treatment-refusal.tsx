import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  MessageCircle,
  Users,
  Brain,
  Shield,
  CheckCircle,
} from "lucide-react";

export const Route = createFileRoute("/blog/scenario-treatment-refusal")({
  head: () => ({
    meta: [
      {
        title:
          "How to Navigate Treatment Refusal Without Lecturing or Giving Up | DebateClub",
      },
      {
        name: "description",
        content:
          "50% of patients don't follow treatment plans. Learn the motivational interviewing techniques that help providers address refusal without destroying trust.",
      },
      {
        property: "og:title",
        content:
          "How to Navigate Treatment Refusal Without Lecturing or Giving Up | DebateClub",
      },
      {
        property: "og:description",
        content:
          "50% of patients don't follow treatment plans. Learn the motivational interviewing techniques that help providers address refusal without destroying trust.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: TreatmentRefusalArticle,
});

/**
 * Blog article: Treatment Refusal scenario deep dive.
 * Explores motivational interviewing techniques for healthcare providers
 * addressing patient resistance to recommended treatments.
 */
function TreatmentRefusalArticle() {
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
          {/* Badge */}
          <span
            className="mb-4 inline-block rounded-md px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: "#A8B08C", color: "#3A4030" }}
          >
            Healthcare Practice
          </span>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            How to Navigate Treatment Refusal Without Lecturing or Giving Up
          </h1>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            12 min read · Healthcare Scenarios
          </p>
        </motion.div>

        {/* Article Body */}
        <motion.div
          className="prose-custom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Opening Story */}
          <p className="text-lg leading-relaxed" style={{ color: "#3A3A35" }}>
            Dr. Martinez reviewed the lab results with a sinking feeling. Her
            patient's blood pressure was 165/95 – dangerously high. Third visit
            in a row. She recommended medication. The patient, a 58-year-old
            teacher, shook his head. "I appreciate it, doc, but I don't want
            to start taking pills. My grandmother lived to 95 without any
            medications."
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            Dr. Martinez did what she was trained to do: she explained the
            risks. Stroke. Heart attack. Kidney disease. The patient nodded
            politely. She emphasized the evidence. She showed him the charts.
            The more she talked, the more he withdrew. Finally, he said he
            would "think about it." She documented the refusal and moved to
            the next patient, knowing he would not fill the prescription.
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            What Dr. Martinez experienced is not uncommon.{" "}
            <strong>
              Medication nonadherence affects 40-50% of patients with chronic
              diseases
            </strong>
            , causing at least 100,000 preventable deaths per year. The
            problem is not knowledge – Dr. Martinez knows hypertension is
            dangerous. The problem is the conversation. When patients say no,
            most providers either lecture or give up. Neither works.
          </p>

          {/* Connection to Framework */}
          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "It's entirely possible for clients not to want to make any changes.
            It's not a problem unless you are somehow expected to MAKE them
            change, which is impossible."
            <span className="mt-2 block text-sm not-italic">
              — William Miller & Stephen Rollnick, "Motivational Interviewing"
            </span>
          </blockquote>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Motivational interviewing, developed by Miller and Rollnick,
            reframes the entire dynamic. Instead of trying to convince patients
            they're wrong, you understand why they're refusing, honor their
            autonomy, and partner with them to find a path forward they can
            actually accept. It's not about giving up – it's about changing
            the conversation in a way that creates space for patients to
            reconsider.
          </p>

          {/* Section: Why This Is Hard */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{
              color: "#2A2A20",
              fontFamily: "Georgia, serif",
              borderLeft: "4px solid #A8B08C",
              paddingLeft: "16px",
            }}
          >
            Why Treatment Refusal Is So Hard
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The problem is not that providers lack clinical knowledge. The
            problem is that medical training teaches diagnosis and treatment,
            but spends almost no time on the conversation when a patient says
            no. The result is a healthcare system where half of patients don't
            follow recommendations.
          </p>

          <div className="my-8 grid gap-4 md:grid-cols-2">
            <motion.div
              className="rounded-xl p-6 shadow-lg"
              style={{ backgroundColor: "#3C4A32" }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-5xl font-bold" style={{ color: "#FAFAF8" }}>
                50%
              </p>
              <p
                className="mt-3 text-sm font-medium leading-relaxed"
                style={{ color: "#E8E4DA" }}
              >
                of patients don't adhere to long-term therapy for chronic
                conditions
              </p>
              <p className="mt-2 text-xs" style={{ color: "#A8B08C" }}>
                Source: WHO Adherence Report, PMC 2011
              </p>
            </motion.div>
            <motion.div
              className="rounded-xl p-6 shadow-lg"
              style={{ backgroundColor: "#9A9A6D" }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-5xl font-bold" style={{ color: "#FAFAF8" }}>
                100K
              </p>
              <p
                className="mt-3 text-sm font-medium leading-relaxed"
                style={{ color: "#2A2A20" }}
              >
                preventable deaths per year in the US due to nonadherence
              </p>
              <p className="mt-2 text-xs" style={{ color: "#3C4A32" }}>
                Source: PMC, 2018
              </p>
            </motion.div>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            When a patient refuses treatment, your nervous system activates.
            You know the risks. You feel responsible. So you do what feels
            natural: you explain harder. You list the terrible outcomes. But
            this triggers psychological reactance – when people feel their
            autonomy is threatened, they dig in harder. The more you argue for
            change, the more they argue against it.
          </p>

          {/* Section: The Framework */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{
              color: "#2A2A20",
              fontFamily: "Georgia, serif",
              borderLeft: "4px solid #A8B08C",
              paddingLeft: "16px",
            }}
          >
            The Framework: Motivational Interviewing
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Motivational interviewing is a patient-centered counseling approach
            for addressing ambivalence about behavior change. It combines
            insights from person-centered therapy (Carl Rogers) with strategic
            techniques for evoking motivation. The core insight:{" "}
            <strong>
              understanding the patient's reasons for refusing creates more
              leverage than any lecture about risks ever could
            </strong>
            .
          </p>

          {/* Techniques */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{
              color: "#2A2A20",
              fontFamily: "Georgia, serif",
              borderLeft: "4px solid #A8B08C",
              paddingLeft: "16px",
            }}
          >
            Six Techniques That Work
          </h2>

          {/* Technique 1 */}
          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{ backgroundColor: "#FAFAF8", borderColor: "#3C4A32" }}
          >
            <div className="mb-3 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" style={{ color: "#3C4A32" }} />
              <h3 className="font-bold" style={{ color: "#2A2A20" }}>
                1. Reflective Listening
              </h3>
            </div>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>What it is:</strong> Summarizing what the patient said
              using their own words before responding with medical advice.
              Demonstrating you heard and understood their concern.
            </p>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>Why it works:</strong> Reflective listening is a
              mandatory prerequisite for empathy. Patients who feel heard are
              far more likely to trust you and reconsider. It reveals the real
              concern – often fear, misinformation, or feeling dismissed.
            </p>
            <div
              className="rounded-lg p-3 text-sm"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <strong>Example:</strong> Patient: "I don't want to take
              medication." Provider: "It sounds like you're concerned about
              starting another prescription. What's behind that?"
            </div>
          </div>

          {/* Technique 2 */}
          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{ backgroundColor: "#FAFAF8", borderColor: "#3C4A32" }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Brain className="h-5 w-5" style={{ color: "#3C4A32" }} />
              <h3 className="font-bold" style={{ color: "#2A2A20" }}>
                2. Open Questions (OARS)
              </h3>
            </div>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>What it is:</strong> Questions starting with "What" or
              "How" that invite patients to tell their story. Avoid "Why" – it
              feels accusatory and puts people on the defensive.
            </p>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>Why it works:</strong> You cannot address barriers you
              don't understand. Fear of side effects? Can't afford it? Bad
              past experience? The answer changes everything. Open questions
              reveal the real barrier.
            </p>
            <div
              className="rounded-lg p-3 text-sm"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <strong>Example:</strong> "What concerns you most about this
              treatment?" or "Help me understand what's making you hesitant."
            </div>
          </div>

          {/* Technique 3 */}
          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{ backgroundColor: "#FAFAF8", borderColor: "#3C4A32" }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Users className="h-5 w-5" style={{ color: "#3C4A32" }} />
              <h3 className="font-bold" style={{ color: "#2A2A20" }}>
                3. Evoking Change Talk
              </h3>
            </div>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>What it is:</strong> Recognizing when patients express
              reasons TO change versus reasons NOT to change. Amplifying
              change talk, softening sustain talk without arguing.
            </p>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>Why it works:</strong> When you argue with refusal,
              patients defend it harder (psychological reactance). When you
              explore ambivalence, they talk themselves toward change. People
              believe what they hear themselves say.
            </p>
            <div
              className="rounded-lg p-3 text-sm"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <strong>Example:</strong> Patient mentions they're worried about
              their kids. You reflect: "So staying healthy for your family is
              really important to you. Tell me more about that."
            </div>
          </div>

          {/* Technique 4 */}
          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{ backgroundColor: "#FAFAF8", borderColor: "#3C4A32" }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" style={{ color: "#3C4A32" }} />
              <h3 className="font-bold" style={{ color: "#2A2A20" }}>
                4. Respecting Autonomy
              </h3>
            </div>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>What it is:</strong> Acknowledging the patient's right to
              make their own healthcare decisions. Positioning yourself as a
              partner, not an authority figure.
            </p>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>Why it works:</strong> Every competent patient has the
              right to refuse treatment, even when you disagree. Authoritarian
              language ("You need to...") creates power struggles. Partnership
              creates trust and space for reconsideration.
            </p>
            <div
              className="rounded-lg p-3 text-sm"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <strong>Example:</strong> "This is your decision – I'm here to
              help you make the choice that's right for you."
            </div>
          </div>

          {/* Technique 5 */}
          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{ backgroundColor: "#FAFAF8", borderColor: "#3C4A32" }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Heart className="h-5 w-5" style={{ color: "#3C4A32" }} />
              <h3 className="font-bold" style={{ color: "#2A2A20" }}>
                5. Elicit-Provide-Elicit
              </h3>
            </div>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>What it is:</strong> Three-step structure for providing
              medical information: (1) Ask permission, (2) Share information
              clearly, (3) Check their reaction.
            </p>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>Why it works:</strong> Unsolicited advice triggers
              defensiveness. Permission signals respect. Checking reaction
              reveals whether information landed or triggered resistance you
              need to address.
            </p>
            <div
              className="rounded-lg p-3 text-sm"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <strong>Example:</strong> "Would it be helpful if I shared what
              we typically see with this medication?" Then after explaining:
              "How does that land for you?"
            </div>
          </div>

          {/* Technique 6 */}
          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{ backgroundColor: "#FAFAF8", borderColor: "#3C4A32" }}
          >
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" style={{ color: "#3C4A32" }} />
              <h3 className="font-bold" style={{ color: "#2A2A20" }}>
                6. Affirmations
              </h3>
            </div>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>What it is:</strong> Recognizing patient strengths, even
              small ones. Building confidence in their ability to change.
            </p>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>Why it works:</strong> Affirmations build self-efficacy.
              Even patients refusing treatment often have strengths worth
              naming – showing up for the appointment, asking questions, caring
              about outcomes.
            </p>
            <div
              className="rounded-lg p-3 text-sm"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <strong>Example:</strong> "You're asking really thoughtful
              questions – you clearly care about understanding this decision."
            </div>
          </div>

          {/* Common Mistakes Section */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{
              color: "#2A2A20",
              fontFamily: "Georgia, serif",
              borderLeft: "4px solid #A8B08C",
              paddingLeft: "16px",
            }}
          >
            Five Mistakes That Make Patients Shut Down
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            These are the behaviors that trigger defensiveness and make patients
            less likely to follow your recommendations:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{ backgroundColor: "#E5DFD3", color: "#3C4A32" }}
                >
                  1
                </span>
                <div>
                  <p className="font-medium" style={{ color: "#2A2A20" }}>
                    Lecturing About Risks
                  </p>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    Listing all the terrible outcomes without asking questions
                    makes patients tune out and defend their position harder.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{ backgroundColor: "#E5DFD3", color: "#3C4A32" }}
                >
                  2
                </span>
                <div>
                  <p className="font-medium" style={{ color: "#2A2A20" }}>
                    Using Authoritarian Language
                  </p>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    "You need to..." or "You have to..." creates power
                    struggles and makes patients feel judged and talked down to.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{ backgroundColor: "#E5DFD3", color: "#3C4A32" }}
                >
                  3
                </span>
                <div>
                  <p className="font-medium" style={{ color: "#2A2A20" }}>
                    Arguing Directly Against Refusal
                  </p>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    The more you argue for change, the more they argue against
                    it. This is the opposite of motivational interviewing.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{ backgroundColor: "#E5DFD3", color: "#3C4A32" }}
                >
                  4
                </span>
                <div>
                  <p className="font-medium" style={{ color: "#2A2A20" }}>
                    Not Exploring the "Why"
                  </p>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    Accepting refusal without understanding the reason means
                    you can't address the actual barrier (fear, cost, past
                    trauma, misinformation).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{ backgroundColor: "#E5DFD3", color: "#3C4A32" }}
                >
                  5
                </span>
                <div>
                  <p className="font-medium" style={{ color: "#2A2A20" }}>
                    Making Patients Feel Judged
                  </p>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    Using frustrated tone or judgmental language makes patients
                    defensive or prompts false agreement to end the
                    uncomfortable conversation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How DebateClub Works */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{
              color: "#2A2A20",
              fontFamily: "Georgia, serif",
              borderLeft: "4px solid #A8B08C",
              paddingLeft: "16px",
            }}
          >
            How DebateClub Trains This Skill
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Reading about motivational interviewing is easy. Executing it under
            time pressure with a real patient refusing treatment is hard. That
            is the gap DebateClub fills. Here's exactly how the practice engine
            works:
          </p>

          {/* The Setup */}
          <h3
            className="mb-3 mt-8 text-xl font-bold"
            style={{ color: "#2A2A20" }}
          >
            The Setup
          </h3>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            You describe the scenario: the medical condition, the recommended
            treatment, the patient's background. The system generates a
            realistic patient persona with appropriate concerns, fears, and
            reasons for resistance.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The conversation starts with the patient refusing your treatment
            recommendation. This is the moment where most providers either
            lecture or give up. The practice engine trains you to do neither.
          </p>

          {/* Practice Engine Demo */}
          <div
            className="my-8 rounded-xl p-8"
            style={{ backgroundColor: "#2A2A20" }}
          >
            <h3
              className="mb-6 text-center text-xl font-bold"
              style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
            >
              The Practice Engine: A Real Example
            </h3>

            {/* Main Flow */}
            <div className="space-y-6">
              {/* Opening */}
              <div>
                <div
                  className="mb-3 rounded-lg p-4"
                  style={{ backgroundColor: "#5C5C54" }}
                >
                  <p
                    className="mb-2 text-xs font-bold uppercase tracking-wide"
                    style={{ color: "#A8B08C" }}
                  >
                    The Patient Says
                  </p>
                  <p className="italic" style={{ color: "#FAFAF8" }}>
                    "I've been thinking about what you said, and I don't think
                    I want to start that blood pressure medication. I've heard
                    it has a lot of side effects."
                  </p>
                </div>
                <p className="text-sm" style={{ color: "#C8D4B8" }}>
                  This is the moment of truth. Your training tells you to
                  explain the risks of untreated hypertension. But that's
                  exactly what triggers defensiveness.
                </p>
              </div>

              {/* Bad Response Path */}
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: "#8B4513", opacity: 0.8 }}
              >
                <p
                  className="mb-2 text-xs font-bold uppercase tracking-wide"
                  style={{ color: "#FFD700" }}
                >
                  ❌ The Lecture Response (What Not To Do)
                </p>
                <p
                  className="mb-3 text-sm italic"
                  style={{ color: "#FAFAF8" }}
                >
                  "I understand your concern, but the risks of not treating
                  this are serious. Untreated high blood pressure can lead to
                  stroke, heart attack, kidney damage. The medication is very
                  well-tolerated, and most patients don't have significant
                  side effects."
                </p>
                <div className="mt-3 space-y-2">
                  <p
                    className="text-xs font-medium"
                    style={{ color: "#FFD700" }}
                  >
                    <strong>System Detects:</strong>
                  </p>
                  <ul className="ml-4 space-y-1 text-xs" style={{ color: "#FFF5E1" }}>
                    <li>
                      <strong>Immediate counter-argument</strong> – You argued
                      against refusal before understanding it
                    </li>
                    <li>
                      <strong>No reflective listening</strong> – You didn't
                      validate their concern or ask about it
                    </li>
                    <li>
                      <strong>Unsolicited information dump</strong> – You
                      launched into risks without permission
                    </li>
                  </ul>
                </div>
                <div
                  className="mt-4 rounded-lg p-3"
                  style={{ backgroundColor: "#5C4033" }}
                >
                  <p
                    className="mb-2 text-xs font-bold"
                    style={{ color: "#FFD700" }}
                  >
                    Patient Response:
                  </p>
                  <p className="text-sm italic" style={{ color: "#FAFAF8" }}>
                    "I know, but I'm not comfortable with it. I'll think about
                    it."
                  </p>
                  <p className="mt-2 text-xs" style={{ color: "#FFF5E1" }}>
                    <strong>What happened:</strong> The patient shut down.
                    They felt lectured, not heard. Your explanation of risks
                    made them defend their position more strongly.
                    Psychological reactance kicked in.
                  </p>
                </div>
              </div>

              {/* Good Response Path */}
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: "#3C4A32" }}
              >
                <p
                  className="mb-2 text-xs font-bold uppercase tracking-wide"
                  style={{ color: "#C8D4B8" }}
                >
                  ✓ The MI Response (What To Do)
                </p>
                <p
                  className="mb-3 text-sm italic"
                  style={{ color: "#FAFAF8" }}
                >
                  "I hear you – it sounds like you're concerned about side
                  effects. What side effects are you most worried about?"
                </p>
                <div className="mt-3 space-y-2">
                  <p
                    className="text-xs font-medium"
                    style={{ color: "#C8D4B8" }}
                  >
                    <strong>System Detects:</strong>
                  </p>
                  <ul className="ml-4 space-y-1 text-xs" style={{ color: "#E8E4DA" }}>
                    <li>
                      <strong>Reflective listening</strong> – You acknowledged
                      their concern using their words
                    </li>
                    <li>
                      <strong>Open question</strong> – You invited them to
                      share the real barrier
                    </li>
                    <li>
                      <strong>No argument</strong> – You didn't defend the
                      medication or lecture about risks
                    </li>
                  </ul>
                </div>
                <div
                  className="mt-4 rounded-lg p-3"
                  style={{ backgroundColor: "#2A3A22" }}
                >
                  <p
                    className="mb-2 text-xs font-bold"
                    style={{ color: "#C8D4B8" }}
                  >
                    Patient Response:
                  </p>
                  <p className="text-sm italic" style={{ color: "#FAFAF8" }}>
                    "Well, my friend started a blood pressure med and said it
                    made her dizzy all the time. And I read online about
                    people having terrible reactions."
                  </p>
                  <p className="mt-2 text-xs" style={{ color: "#E8E4DA" }}>
                    <strong>What happened:</strong> The patient opened up and
                    revealed the real concerns: specific fear based on friend's
                    experience and online information. Now you can actually
                    address these barriers through elicit-provide-elicit.
                  </p>
                </div>
              </div>

              {/* Analysis Section */}
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: "#5C5C54" }}
              >
                <p
                  className="mb-3 text-xs font-bold uppercase tracking-wide"
                  style={{ color: "#A8B08C" }}
                >
                  Post-Conversation Analysis
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MessageCircle
                      className="h-4 w-4 flex-shrink-0"
                      style={{ color: "#A8B08C" }}
                    />
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#FAFAF8" }}
                      >
                        Reflective Listening: 9/10
                      </p>
                      <p className="text-xs" style={{ color: "#C8D4B8" }}>
                        You consistently reflected patient concerns before
                        responding, creating trust and openness.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Brain
                      className="h-4 w-4 flex-shrink-0"
                      style={{ color: "#A8B08C" }}
                    />
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#FAFAF8" }}
                      >
                        Open Questions: 8/10
                      </p>
                      <p className="text-xs" style={{ color: "#C8D4B8" }}>
                        Your "What" questions uncovered the real barriers
                        (friend's experience, online research) that you could
                        address.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users
                      className="h-4 w-4 flex-shrink-0"
                      style={{ color: "#A8B08C" }}
                    />
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#FAFAF8" }}
                      >
                        Evoking Motivation: 7/10
                      </p>
                      <p className="text-xs" style={{ color: "#C8D4B8" }}>
                        You elicited the patient's values (family,
                        independence) and connected them to health goals.
                        Could have amplified change talk more.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield
                      className="h-4 w-4 flex-shrink-0"
                      style={{ color: "#A8B08C" }}
                    />
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#FAFAF8" }}
                      >
                        Respecting Autonomy: 9/10
                      </p>
                      <p className="text-xs" style={{ color: "#C8D4B8" }}>
                        You positioned yourself as partner, not authority.
                        Patient felt empowered to make informed decision.
                      </p>
                    </div>
                  </div>
                </div>
                <p
                  className="mt-4 text-xs leading-relaxed"
                  style={{ color: "#E8E4DA" }}
                >
                  The analysis shows exactly where you succeeded and where you
                  could improve. Over multiple practice sessions, you build the
                  muscle memory to execute these techniques under pressure.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            This is not a generic chatbot. The system knows the specific
            dynamics of treatment refusal. When you lecture, the patient shuts
            down. When you use reflective listening and open questions, they
            open up. The behavioral rules are based on motivational
            interviewing research.
          </p>

          {/* Opening Scenarios */}
          <h3
            className="mb-3 mt-8 text-xl font-bold"
            style={{ color: "#2A2A20" }}
          >
            Opening Scenarios
          </h3>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Each practice session opens with a realistic patient refusal:
          </p>

          <div className="my-4 space-y-3">
            <div
              className="flex gap-3 rounded-lg border-l-4 p-4"
              style={{
                backgroundColor: "#FAFAF8",
                borderLeftColor: "#A8B08C",
              }}
            >
              <MessageCircle
                className="h-4 w-4 flex-shrink-0 mt-1"
                style={{ color: "#A8B08C" }}
              />
              <p className="text-sm italic" style={{ color: "#5C5C54" }}>
                "I've heard it has a lot of side effects."
              </p>
            </div>
            <div
              className="flex gap-3 rounded-lg border-l-4 p-4"
              style={{
                backgroundColor: "#FAFAF8",
                borderLeftColor: "#8B9A70",
              }}
            >
              <MessageCircle
                className="h-4 w-4 flex-shrink-0 mt-1"
                style={{ color: "#8B9A70" }}
              />
              <p className="text-sm italic" style={{ color: "#5C5C54" }}>
                "I just don't believe in taking all these pills."
              </p>
            </div>
            <div
              className="flex gap-3 rounded-lg border-l-4 p-4"
              style={{
                backgroundColor: "#FAFAF8",
                borderLeftColor: "#7A8960",
              }}
            >
              <MessageCircle
                className="h-4 w-4 flex-shrink-0 mt-1"
                style={{ color: "#7A8960" }}
              />
              <p className="text-sm italic" style={{ color: "#5C5C54" }}>
                "I'm feeling fine. I don't see why I need treatment."
              </p>
            </div>
          </div>

          {/* Behavioral Rules */}
          <h3
            className="mb-3 mt-8 text-xl font-bold"
            style={{ color: "#2A2A20" }}
          >
            Behavioral Rules
          </h3>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The patient responds to your technique, not just your words:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span style={{ color: "#3C4A32" }}>→</span>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  <strong>If you lecture without asking questions,</strong> the
                  patient becomes defensive and shuts down emotionally
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "#3C4A32" }}>→</span>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  <strong>If you use authoritarian language,</strong> the
                  patient feels talked down to and becomes less collaborative
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "#3C4A32" }}>→</span>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  <strong>If you argue directly against refusal,</strong> the
                  patient defends their position more strongly and brings up
                  additional objections
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "#3C4A32" }}>→</span>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  <strong>If you use reflective listening,</strong> the patient
                  feels heard and opens up about real concerns
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "#3C4A32" }}>→</span>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  <strong>If you ask open questions,</strong> the patient
                  shares underlying barriers you can actually address
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "#3C4A32" }}>→</span>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  <strong>If you respect autonomy,</strong> the patient relaxes
                  and becomes more willing to consider options
                </p>
              </li>
            </ul>
          </div>

          {/* What Gets Measured */}
          <h3
            className="mb-3 mt-8 text-xl font-bold"
            style={{ color: "#2A2A20" }}
          >
            What Gets Measured
          </h3>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            After each practice session, you receive detailed analysis across
            four dimensions:
          </p>

          <div className="my-6 grid gap-4 md:grid-cols-2">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#F5F7F0", borderLeft: "3px solid #A8B08C" }}
            >
              <p className="font-medium" style={{ color: "#2A2A20" }}>
                Reflective Listening
              </p>
              <p className="mt-1 text-sm" style={{ color: "#5C5C54" }}>
                Did you demonstrate understanding by reflecting the patient's
                concerns before responding?
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#F5F7F0", borderLeft: "3px solid #A8B08C" }}
            >
              <p className="font-medium" style={{ color: "#2A2A20" }}>
                Open Questions
              </p>
              <p className="mt-1 text-sm" style={{ color: "#5C5C54" }}>
                Did you use "What" and "How" questions to uncover the real
                barriers to treatment?
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#F5F7F0", borderLeft: "3px solid #A8B08C" }}
            >
              <p className="font-medium" style={{ color: "#2A2A20" }}>
                Evoking Motivation
              </p>
              <p className="mt-1 text-sm" style={{ color: "#5C5C54" }}>
                Did you elicit and amplify the patient's own reasons for change
                rather than imposing external reasons?
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#F5F7F0", borderLeft: "3px solid #A8B08C" }}
            >
              <p className="font-medium" style={{ color: "#2A2A20" }}>
                Respecting Autonomy
              </p>
              <p className="mt-1 text-sm" style={{ color: "#5C5C54" }}>
                Did you honor the patient's right to decide while still
                providing medical guidance?
              </p>
            </div>
          </div>

          {/* What Changes After Practice */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{
              color: "#2A2A20",
              fontFamily: "Georgia, serif",
              borderLeft: "4px solid #A8B08C",
              paddingLeft: "16px",
            }}
          >
            What Changes After Practice
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            After practicing treatment refusal conversations across multiple
            sessions, you will notice:
          </p>

          <div className="my-6 space-y-3">
            <div
              className="flex gap-3 rounded-lg p-4"
              style={{
                backgroundColor: "#F5F7F0",
                borderLeft: "3px solid #A8B08C",
              }}
            >
              <CheckCircle
                className="h-5 w-5 flex-shrink-0 mt-0.5"
                style={{ color: "#A8B08C" }}
              />
              <p style={{ color: "#3A3A35" }}>
                <strong>Your instinct changes.</strong> When patients refuse,
                you no longer feel the urge to lecture. You automatically
                reflect their concern and ask an open question.
              </p>
            </div>
            <div
              className="flex gap-3 rounded-lg p-4"
              style={{
                backgroundColor: "#F5F7F0",
                borderLeft: "3px solid #A8B08C",
              }}
            >
              <CheckCircle
                className="h-5 w-5 flex-shrink-0 mt-0.5"
                style={{ color: "#A8B08C" }}
              />
              <p style={{ color: "#3A3A35" }}>
                <strong>You uncover the real barriers.</strong> Patients open
                up about fears, cost concerns, past experiences, and beliefs
                you would have missed with a lecture.
              </p>
            </div>
            <div
              className="flex gap-3 rounded-lg p-4"
              style={{
                backgroundColor: "#F5F7F0",
                borderLeft: "3px solid #A8B08C",
              }}
            >
              <CheckCircle
                className="h-5 w-5 flex-shrink-0 mt-0.5"
                style={{ color: "#A8B08C" }}
              />
              <p style={{ color: "#3A3A35" }}>
                <strong>Conversations feel collaborative, not confrontational.</strong> Patients don't feel judged or pushed. The relationship strengthens even when they don't immediately accept treatment.
              </p>
            </div>
            <div
              className="flex gap-3 rounded-lg p-4"
              style={{
                backgroundColor: "#F5F7F0",
                borderLeft: "3px solid #A8B08C",
              }}
            >
              <CheckCircle
                className="h-5 w-5 flex-shrink-0 mt-0.5"
                style={{ color: "#A8B08C" }}
              />
              <p style={{ color: "#3A3A35" }}>
                <strong>More patients reconsider.</strong> When you understand
                and address the real barrier, more patients move from refusal
                to acceptance – not because you convinced them, but because
                they convinced themselves.
              </p>
            </div>
          </div>

          {/* The Bottom Line */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{
              color: "#2A2A20",
              fontFamily: "Georgia, serif",
              borderLeft: "4px solid #A8B08C",
              paddingLeft: "16px",
            }}
          >
            The Bottom Line
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Treatment refusal is one of the most frustrating conversations in
            healthcare. You know the patient needs treatment. You know the
            risks of not treating. But lecturing doesn't work, and giving up
            means abandoning them to preventable disease.
          </p>

          <p className="mt-4 text-lg font-medium leading-relaxed" style={{ color: "#3A3A35" }}>
            Motivational interviewing offers a better way: understand why
            they're refusing, honor their autonomy, and partner with them to
            find a path forward they can accept.
          </p>

          {/* CTA */}
          <div
            className="my-12 rounded-xl p-8 text-center"
            style={{ backgroundColor: "#2A2A20" }}
          >
            <h3
              className="mb-3 text-2xl font-bold"
              style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
            >
              Practice Treatment Refusal
            </h3>
            <p
              className="mx-auto mb-6 max-w-xl text-sm leading-relaxed"
              style={{ color: "#C8D4B8" }}
            >
              Face realistic patient resistance. Learn to use reflective
              listening and open questions. Build the muscle memory to navigate
              refusal without lecturing or giving up.
            </p>
            <Link
              to="/login"
              className="inline-block rounded-lg px-6 py-3 font-medium transition-transform hover:scale-105"
              style={{ backgroundColor: "#A8B08C", color: "#2A2A20" }}
            >
              Start Practicing
            </Link>
          </div>

          {/* Sources */}
          <h3 className="mb-4 mt-12 text-lg font-bold" style={{ color: "#2A2A20" }}>
            Sources
          </h3>

          <div className="space-y-2">
            <p className="text-sm leading-relaxed" style={{ color: "#5C5C54" }}>
              1. Rollnick, Stephen, Miller, William R., & Butler, Christopher
              C. (2008). Motivational Interviewing in Health Care: Helping
              Patients Change Behavior. The Guilford Press.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#5C5C54" }}>
              2. Miller, William R. & Rollnick, Stephen. (2023). Motivational
              Interviewing: Helping People Change and Grow (4th ed.). The
              Guilford Press.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#5C5C54" }}>
              3. Boissy, A., et al. (2020). Practicing "Reflective listening" is
              a mandatory prerequisite for empathy. Patient Education and
              Counseling, 103(10), 2136-2137.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#5C5C54" }}>
              4. StatPearls. (2024). Refusal of Care. NCBI Bookshelf.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#5C5C54" }}>
              5. PMC. (2018). The Unmet Challenge of Medication Nonadherence.
            </p>
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
              All Articles
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              Try It Yourself
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </article>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: "#E8E4DA" }}>
        <div className="mx-auto max-w-3xl px-8 text-center">
          <p className="text-sm" style={{ color: "#5C5C54" }}>
            © {new Date().getFullYear()} DebateClub. Techniques based on
            research from motivational interviewing and healthcare communication
            literature.
          </p>
        </div>
      </footer>
    </div>
  );
}
