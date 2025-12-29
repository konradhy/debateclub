import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Target,
  Eye,
  RefreshCw,
  Handshake,
  Zap,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/blog/scenario-early-customer-sales")({
  head: () => ({
    meta: [
      {
        title:
          "How to Land Your First 10 Customers Without Case Studies | DebateClub",
      },
      {
        name: "description",
        content:
          "No logos. No references. No social proof. Learn the research-backed techniques for selling to early customers when conviction is all you have.",
      },
      {
        property: "og:title",
        content:
          "How to Land Your First 10 Customers Without Case Studies | DebateClub",
      },
      {
        property: "og:description",
        content:
          "No logos. No references. No social proof. Learn the research-backed techniques for selling to early customers when conviction is all you have.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: EarlyCustomerSalesArticle,
});

/**
 * Blog article: Early Customer Sales scenario deep dive.
 * Explores techniques for selling to first customers when you have
 * no social proof, incomplete products, and conviction as your main asset.
 */
function EarlyCustomerSalesArticle() {
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
            Entrepreneur Practice
          </span>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            How to Land Your First 10 Customers Without Case Studies
          </h1>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            12 min read · Entrepreneur Scenarios
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
            Marcus had built something he believed in. Six months of coding
            nights and weekends. A product that solved a real problem he had
            experienced firsthand. The demo worked (mostly). He had a landing
            page. He was ready.
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            His first sales meeting was with a VP at a mid-sized company. The
            meeting started well. Marcus walked through the product, showed the
            demo, explained the vision. The VP nodded along. Then came the
            question: "This looks interesting. Who else is using it?"
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            Marcus froze. "We're just getting started" felt weak. "You'd be our
            first customer" felt worse. He stumbled through something about
            "early access" and "exclusive partnership." The VP smiled politely.
            "Let me think about it and get back to you." She never did.
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            Marcus had fallen into the trap that kills most early-stage sales:
            he didn't know how to sell without social proof. According to Pete
            Kazanjy, author of "Founding Sales,"{" "}
            <strong>
              your first 10 customers take 2-10x longer to close than later
              customers
            </strong>
            . Not because the product is worse – because the sales motion is
            completely different.
          </p>

          {/* Connection to Framework */}
          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "The world's most deadly fluff is 'I would definitely buy that.'
            Commitment is the currency of early-stage sales. Words are
            worthless."
            <span className="mt-2 block text-sm not-italic">
              — Rob Fitzpatrick, "The Mom Test"
            </span>
          </blockquote>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Early customer sales requires a different toolkit. You can't
            leverage case studies you don't have. You can't name-drop customers
            that don't exist. What you can do is sell vision, qualify
            aggressively, and extract real commitment instead of polite
            interest.
          </p>

          {/* Section: Why This Is Hard */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Why Early Customer Sales Is So Hard
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Every enterprise sales playbook assumes you have something you
            don't: proof. References. Case studies. Logos on your website.
            Without these, standard sales advice actively hurts you.
          </p>

          <div className="my-8 grid gap-4 md:grid-cols-2">
            <motion.div
              className="rounded-xl p-6 shadow-lg"
              style={{ backgroundColor: "#3C4A32" }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-5xl font-bold" style={{ color: "#FAFAF8" }}>
                90%
              </p>
              <p
                className="mt-3 text-sm font-medium leading-relaxed"
                style={{ color: "#E8E4DA" }}
              >
                of startups fail – most because they can't sell what they've
                built
              </p>
              <p className="mt-2 text-xs" style={{ color: "#A8B08C" }}>
                Source: CB Insights, 2023
              </p>
            </motion.div>
            <motion.div
              className="rounded-xl p-6 shadow-lg"
              style={{ backgroundColor: "#9A9A6D" }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-5xl font-bold" style={{ color: "#FAFAF8" }}>
                13.5%
              </p>
              <p
                className="mt-3 text-sm font-medium leading-relaxed"
                style={{ color: "#2A2A20" }}
              >
                of any market are early adopters – the only people who will buy
                unproven products
              </p>
              <p className="mt-2 text-xs" style={{ color: "#3C4A32" }}>
                Source: Geoffrey Moore, "Crossing the Chasm"
              </p>
            </motion.div>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The challenge isn't just that you lack proof – it's that most of the
            people you talk to aren't early adopters. They're pragmatists who
            need social proof before buying. Pitching to them is a waste of
            time. You need to identify early adopters, sell them differently,
            and extract commitment fast.
          </p>

          {/* Section: The Framework */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Framework: Vision Selling + Aggressive Qualification
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Early customer sales draws from multiple frameworks. Rob
            Fitzpatrick's "The Mom Test" teaches you to extract truth from
            polite lies. Geoffrey Moore's "Crossing the Chasm" helps you
            identify early adopters. Pete Kazanjy's "Founding Sales" shows you
            how to sell without social proof. The core insight across all of
            them:{" "}
            <strong>
              early customers buy vision and partnership, not products and
              features
            </strong>
            .
          </p>

          {/* Techniques */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Six Techniques That Work
          </h2>

          {/* Technique 1 */}
          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{ backgroundColor: "#FAFAF8", borderColor: "#3C4A32" }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Target className="h-5 w-5" style={{ color: "#3C4A32" }} />
              <h3 className="font-bold" style={{ color: "#2A2A20" }}>
                1. Quantify the Pain Before You Pitch
              </h3>
            </div>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>What it is:</strong> Before talking about your product,
              get the prospect to articulate what their current problem is
              costing them. Make them feel the pain.
            </p>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>Why it works:</strong> People don't buy products – they
              buy solutions to problems they urgently feel. If they don't feel
              the pain, they won't risk an unproven vendor. (Fitzpatrick, "The
              Mom Test")
            </p>
            <div
              className="rounded-lg p-3 text-sm"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <strong>Example:</strong> "Before I show you anything – what's the
              current situation costing you? In time? In deals lost? In manual
              work?"
            </div>
          </div>

          {/* Technique 2 */}
          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{ backgroundColor: "#FAFAF8", borderColor: "#3C4A32" }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Eye className="h-5 w-5" style={{ color: "#3C4A32" }} />
              <h3 className="font-bold" style={{ color: "#2A2A20" }}>
                2. Reframe "No Customers" as Exclusive Access
              </h3>
            </div>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>What it is:</strong> Turn your biggest weakness into a
              selling point for the right buyer. Early means exclusive.
              Unfinished means influence.
            </p>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>Why it works:</strong> Early adopters want to be first.
              They want to shape products. They want competitive advantage
              before their competitors catch on. (Moore, "Crossing the Chasm")
            </p>
            <div
              className="rounded-lg p-3 text-sm"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <strong>Example:</strong> "You'd be one of our first 10 customers.
              That means you'd have my cell phone, direct input on the roadmap,
              and white-glove support that later customers won't get."
            </div>
          </div>

          {/* Technique 3 */}
          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{ backgroundColor: "#FAFAF8", borderColor: "#3C4A32" }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Zap className="h-5 w-5" style={{ color: "#3C4A32" }} />
              <h3 className="font-bold" style={{ color: "#2A2A20" }}>
                3. Sell the Vision, Not the Product
              </h3>
            </div>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>What it is:</strong> Paint a picture of where you're
              going, not where you are today. The product is a bet on you and
              your vision.
            </p>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>Why it works:</strong> Early customers know your product
              isn't finished. They're not buying version 1 – they're betting on
              version 10. (Kazanjy, "Founding Sales")
            </p>
            <div
              className="rounded-lg p-3 text-sm"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <strong>Example:</strong> "What you're seeing today is version 1.
              What you're buying into is where we're going – and you'd have a
              voice in what we build next."
            </div>
          </div>

          {/* Technique 4 */}
          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{ backgroundColor: "#FAFAF8", borderColor: "#3C4A32" }}
          >
            <div className="mb-3 flex items-center gap-2">
              <RefreshCw className="h-5 w-5" style={{ color: "#3C4A32" }} />
              <h3 className="font-bold" style={{ color: "#2A2A20" }}>
                4. Identify Early Adopters vs. Pragmatists
              </h3>
            </div>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>What it is:</strong> Recognize that some prospects will
              never buy an unproven product – and stop wasting time on them.
              Different buyers need different approaches.
            </p>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>Why it works:</strong> Early adopters represent only 13.5%
              of any market. Pragmatists need case studies you don't have.
              Qualify fast. (Moore, "Crossing the Chasm")
            </p>
            <div
              className="rounded-lg p-3 text-sm"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <strong>Example:</strong> "I should be honest – we're not for
              everyone. We're looking for companies that want to be first, not
              companies that need to see a case study first. Which are you?"
            </div>
          </div>

          {/* Technique 5 */}
          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{ backgroundColor: "#FAFAF8", borderColor: "#3C4A32" }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Handshake className="h-5 w-5" style={{ color: "#3C4A32" }} />
              <h3 className="font-bold" style={{ color: "#2A2A20" }}>
                5. Push for Real Commitment
              </h3>
            </div>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>What it is:</strong> Don't accept "sounds great" as a win.
              Get something that costs them – time, reputation, money, or an
              intro.
            </p>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>Why it works:</strong> Politeness is free. Commitment
              costs something. Without concrete next steps, you have nothing.
              (Fitzpatrick, "The Mom Test")
            </p>
            <div
              className="rounded-lg p-3 text-sm"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <strong>Example:</strong> "I'm glad this resonates. What would it
              take to get a 30-day pilot started? What needs to happen on your
              end?"
            </div>
          </div>

          {/* Technique 6 */}
          <div
            className="my-6 rounded-xl border-l-4 p-6"
            style={{ backgroundColor: "#FAFAF8", borderColor: "#3C4A32" }}
          >
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" style={{ color: "#3C4A32" }} />
              <h3 className="font-bold" style={{ color: "#2A2A20" }}>
                6. Be Honest About Your Stage
              </h3>
            </div>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>What it is:</strong> Admit your limitations upfront rather
              than overselling. Authenticity builds trust with early adopters.
            </p>
            <p className="mb-3 text-sm" style={{ color: "#5C5C54" }}>
              <strong>Why it works:</strong> Early adopters see through BS.
              False confidence destroys trust. Being honest about what you don't
              have makes what you do have more credible. (Kazanjy)
            </p>
            <div
              className="rounded-lg p-3 text-sm"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <strong>Example:</strong> "I'll be straight with you – we're
              early. The product isn't perfect. But we're obsessed with this
              problem, and we ship fast."
            </div>
          </div>

          {/* Common Mistakes Section */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Five Mistakes That Kill Early-Stage Deals
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            These mistakes are especially deadly when you're selling without
            social proof:
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
                    Feature-Dumping Before Pain
                  </p>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    Jumping straight to what you built before they care about
                    the problem. No pain = no urgency to risk an unproven
                    vendor.
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
                    Overselling Your Traction
                  </p>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    Claiming "many customers" when you have 2, or "proven
                    results" without data. Early adopters see through it and
                    lose trust.
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
                    Accepting "Sounds Great" as a Win
                  </p>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    Leaving meetings feeling good without concrete next steps.
                    Polite interest is not commitment.
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
                    Talking Too Much About Yourself
                  </p>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    Monologuing about your journey and technology instead of
                    asking about their problems.
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
                    Pitching to Pragmatists
                  </p>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    Wasting time on buyers who need case studies and social
                    proof you don't have. They're not your customer yet.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How DebateClub Works */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            How DebateClub Trains This Skill
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Reading about early customer sales is easy. Executing when a
            skeptical prospect asks "who else is using this?" is hard. That's
            the gap DebateClub fills. Here's exactly how the practice engine
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
            You describe your product – what you're building, what problem it
            solves, who it's for. The system generates a realistic early-stage
            prospect: skeptical but open, time-constrained, looking for
            solutions but wary of unproven vendors.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The conversation starts where early sales always start: a prospect
            who's interested but unsure. They want to believe, but they need to
            be convinced. And they will test whether you can sell without the
            crutch of social proof.
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
                    The Prospect Opens
                  </p>
                  <p
                    className="text-sm italic leading-relaxed"
                    style={{ color: "#FAFAF8" }}
                  >
                    "I saw your post about this problem – we've been struggling
                    with exactly that. But honestly, I get pitched constantly.
                    What makes you different from all the other startups I talk
                    to?"
                  </p>
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#C8C8B8" }}
                >
                  This is a classic early-stage opening. They're interested but
                  skeptical. They've been burned before. The system is watching
                  what you do next.
                </p>
              </div>

              {/* Bad Response Path */}
              <div
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "#3C4A32",
                  borderLeft: "4px solid #E57373",
                }}
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-lg" style={{ color: "#E57373" }}>
                    ✗
                  </span>
                  <p className="font-bold" style={{ color: "#E57373" }}>
                    Bad Technique: Feature-Dump
                  </p>
                </div>

                <div
                  className="mb-4 rounded-lg p-3"
                  style={{ backgroundColor: "#2A2A20" }}
                >
                  <p
                    className="mb-1 text-xs font-bold"
                    style={{ color: "#A8B08C" }}
                  >
                    You say:
                  </p>
                  <p className="text-sm italic" style={{ color: "#E8E4DA" }}>
                    "We've built an AI-powered platform with real-time
                    analytics, automated workflows, and integrations with over
                    20 tools. We're different because our technology uses a
                    proprietary algorithm that..."
                  </p>
                </div>

                <div className="mb-4 space-y-2">
                  <p className="text-xs font-bold" style={{ color: "#FAFAF8" }}>
                    What the system detects:
                  </p>
                  <ul
                    className="space-y-1 text-xs"
                    style={{ color: "#C8C8B8" }}
                  >
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5" style={{ color: "#E57373" }}>
                        •
                      </span>
                      <span>
                        <strong>Feature-first pitch</strong> – Jumped to
                        capabilities before establishing pain
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5" style={{ color: "#E57373" }}>
                        •
                      </span>
                      <span>
                        <strong>No discovery</strong> – Didn't ask about their
                        specific situation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5" style={{ color: "#E57373" }}>
                        •
                      </span>
                      <span>
                        <strong>Monologue</strong> – Talked about yourself
                        without learning about them
                      </span>
                    </li>
                  </ul>
                </div>

                <div
                  className="rounded-lg p-3"
                  style={{ backgroundColor: "#2A2A20" }}
                >
                  <p
                    className="mb-1 text-xs font-bold"
                    style={{ color: "#E57373" }}
                  >
                    Prospect responds:
                  </p>
                  <p className="text-sm italic" style={{ color: "#E8E4DA" }}>
                    "Okay, but I'm still not sure why I'd take a risk on you
                    versus the established players. How many companies are using
                    this?"
                  </p>
                </div>

                <p
                  className="mt-3 text-xs leading-relaxed"
                  style={{ color: "#C8C8B8" }}
                >
                  <strong style={{ color: "#E57373" }}>
                    The prospect isn't convinced.
                  </strong>{" "}
                  They're now pushing on social proof because you didn't give
                  them anything else to hold onto. You've walked into the trap.
                </p>
              </div>

              {/* Good Response Path */}
              <div
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "#3C4A32",
                  borderLeft: "4px solid #A8B08C",
                }}
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-lg" style={{ color: "#A8B08C" }}>
                    ✓
                  </span>
                  <p className="font-bold" style={{ color: "#A8B08C" }}>
                    Good Technique: Problem Amplification + Reframe
                  </p>
                </div>

                <div
                  className="mb-4 rounded-lg p-3"
                  style={{ backgroundColor: "#2A2A20" }}
                >
                  <p
                    className="mb-1 text-xs font-bold"
                    style={{ color: "#A8B08C" }}
                  >
                    You say:
                  </p>
                  <p className="text-sm italic" style={{ color: "#E8E4DA" }}>
                    "Before I answer that – you said you've been struggling with
                    this. Tell me more. What's it actually costing you? In time,
                    in money, in headaches?"
                  </p>
                </div>

                <div className="mb-4 space-y-2">
                  <p className="text-xs font-bold" style={{ color: "#FAFAF8" }}>
                    What the system detects:
                  </p>
                  <ul
                    className="space-y-1 text-xs"
                    style={{ color: "#C8C8B8" }}
                  >
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5" style={{ color: "#A8B08C" }}>
                        •
                      </span>
                      <span>
                        <strong>Discovery first</strong> – Asked about their
                        problem before pitching
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5" style={{ color: "#A8B08C" }}>
                        •
                      </span>
                      <span>
                        <strong>Problem amplification</strong> – Quantifying the
                        pain
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5" style={{ color: "#A8B08C" }}>
                        •
                      </span>
                      <span>
                        <strong>Controlled the frame</strong> – Redirected from
                        features to problem
                      </span>
                    </li>
                  </ul>
                </div>

                <div
                  className="rounded-lg p-3"
                  style={{ backgroundColor: "#2A2A20" }}
                >
                  <p
                    className="mb-1 text-xs font-bold"
                    style={{ color: "#A8B08C" }}
                  >
                    Prospect responds:
                  </p>
                  <p className="text-sm italic" style={{ color: "#E8E4DA" }}>
                    "Honestly, it's brutal. We're spending probably 10 hours a
                    week on manual work that should be automated. And it's
                    getting worse as we scale. We've looked at some solutions
                    but nothing fits exactly..."
                  </p>
                </div>

                <p
                  className="mt-3 text-xs leading-relaxed"
                  style={{ color: "#C8C8B8" }}
                >
                  <strong style={{ color: "#A8B08C" }}>
                    Now you're in control.
                  </strong>{" "}
                  The prospect is talking about their pain, not your features.
                  They're invested in the conversation. You've earned the right
                  to pitch – and the social proof question might never come up.
                </p>
              </div>

              {/* The Analysis */}
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "#3C4A32" }}
              >
                <p
                  className="mb-4 text-sm font-bold"
                  style={{ color: "#FAFAF8" }}
                >
                  After the Session: Detailed Analysis
                </p>

                <div className="space-y-3">
                  <div
                    className="rounded-lg p-3"
                    style={{ backgroundColor: "#2A2A20" }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target
                          className="h-4 w-4"
                          style={{ color: "#A8B08C" }}
                        />
                        <p
                          className="text-sm font-bold"
                          style={{ color: "#FAFAF8" }}
                        >
                          Problem Amplification
                        </p>
                      </div>
                      <p
                        className="text-sm font-bold"
                        style={{ color: "#A8B08C" }}
                      >
                        9/10
                      </p>
                    </div>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "#C8C8B8" }}
                    >
                      Excellent discovery. You got them to quantify the pain (10
                      hours/week) before pitching. This creates urgency and
                      positions your solution as necessary, not nice-to-have.
                    </p>
                  </div>

                  <div
                    className="rounded-lg p-3"
                    style={{ backgroundColor: "#2A2A20" }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" style={{ color: "#A8B08C" }} />
                        <p
                          className="text-sm font-bold"
                          style={{ color: "#FAFAF8" }}
                        >
                          Vision Selling
                        </p>
                      </div>
                      <p
                        className="text-sm font-bold"
                        style={{ color: "#A8B08C" }}
                      >
                        7/10
                      </p>
                    </div>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "#C8C8B8" }}
                    >
                      Good job selling where you're going. Could have painted a
                      more vivid picture of their future state with your
                      solution.
                    </p>
                  </div>

                  <div
                    className="rounded-lg p-3"
                    style={{ backgroundColor: "#2A2A20" }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RefreshCw
                          className="h-4 w-4"
                          style={{ color: "#E57373" }}
                        />
                        <p
                          className="text-sm font-bold"
                          style={{ color: "#FAFAF8" }}
                        >
                          Objection Reframing
                        </p>
                      </div>
                      <p
                        className="text-sm font-bold"
                        style={{ color: "#E57373" }}
                      >
                        5/10
                      </p>
                    </div>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "#C8C8B8" }}
                    >
                      When they mentioned "looked at solutions," you didn't
                      explore why those failed. Missed opportunity to position
                      against established players.
                    </p>
                  </div>

                  <div
                    className="rounded-lg p-3"
                    style={{ backgroundColor: "#2A2A20" }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Handshake
                          className="h-4 w-4"
                          style={{ color: "#A8B08C" }}
                        />
                        <p
                          className="text-sm font-bold"
                          style={{ color: "#FAFAF8" }}
                        >
                          Commitment Extraction
                        </p>
                      </div>
                      <p
                        className="text-sm font-bold"
                        style={{ color: "#A8B08C" }}
                      >
                        8/10
                      </p>
                    </div>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "#C8C8B8" }}
                    >
                      You pushed for a pilot start date. Good. Could have been
                      more specific about what you needed from them.
                    </p>
                  </div>
                </div>

                <p
                  className="mt-4 text-xs leading-relaxed"
                  style={{ color: "#C8C8B8" }}
                >
                  The analysis shows you exactly where you succeeded and where
                  you left opportunity on the table. You can replay the
                  conversation, see the transcript, and practice the specific
                  moments that need work.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            This is not a generic practice. The system is specifically trained
            on early-stage sales dynamics. It knows that feature-dumping fails.
            It knows that discovery creates urgency. It knows that "sounds
            great" is a warning sign. Every response you give is analyzed for
            these patterns, and the prospect's behavior adapts accordingly.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            After 5-10 practice sessions, the patterns become automatic. You
            stop panicking when they ask about other customers. You start with
            discovery instead of features. You push for commitment instead of
            accepting polite interest. The muscle memory transfers to real
            sales.
          </p>

          <h3
            className="mb-3 mt-8 text-xl font-bold"
            style={{ color: "#2A2A20" }}
          >
            Opening Scenarios
          </h3>
          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Each practice session opens with a realistic early-stage sales
            situation:
          </p>

          <div
            className="my-4 space-y-3 rounded-lg p-4"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <p className="text-sm italic" style={{ color: "#5C5C54" }}>
              "My friend said you're working on something interesting. I've got
              about 15 minutes – tell me what you're building."
            </p>
            <p className="text-sm italic" style={{ color: "#5C5C54" }}>
              "I should tell you upfront – we've been burned by startups before.
              Last vendor we tried disappeared after 6 months."
            </p>
            <p className="text-sm italic" style={{ color: "#5C5C54" }}>
              "I like what you're doing, but getting budget for an unproven
              vendor is going to be a hard sell internally. How do I make that
              case?"
            </p>
          </div>

          <h3
            className="mb-3 mt-8 text-xl font-bold"
            style={{ color: "#2A2A20" }}
          >
            Behavioral Rules
          </h3>
          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The prospect responds to your technique, not just your words:
          </p>

          <ul className="my-4 space-y-2">
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>If you lead with features before pain:</strong> The
                prospect becomes skeptical and starts asking about social proof.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>
                  If you reframe objections about being early-stage:
                </strong>{" "}
                They become more interested and ask follow-up questions.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>If you accept "sounds great" without pushing:</strong>{" "}
                They become vaguely positive but never commit.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>If you oversell or exaggerate traction:</strong> They
                call you out and trust breaks down.
              </span>
            </li>
          </ul>

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

          <div className="my-4 grid gap-3 md:grid-cols-2">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-1 font-bold" style={{ color: "#3C4A32" }}>
                Problem Amplification
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Did you make them feel the urgency of their problem before
                pitching?
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-1 font-bold" style={{ color: "#3C4A32" }}>
                Vision Selling
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Did you sell the future state and position them as a partner?
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-1 font-bold" style={{ color: "#3C4A32" }}>
                Objection Reframing
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Did you turn early-stage weaknesses into advantages?
              </p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "#E5DFD3" }}
            >
              <h4 className="mb-1 font-bold" style={{ color: "#3C4A32" }}>
                Commitment Extraction
              </h4>
              <p className="text-sm" style={{ color: "#5C5C54" }}>
                Did you get real next steps, not just polite interest?
              </p>
            </div>
          </div>

          {/* Real-World Impact */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            What Changes After Practice
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            After practicing early customer sales across multiple sessions, you
            will notice:
          </p>

          <ul className="my-6 space-y-3">
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Confident answers:</strong> "Who else is using this?"
                stops being scary. You have reframes ready.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Discovery instincts:</strong> You automatically start
                with their problem, not your features.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Better qualification:</strong> You recognize early
                adopters vs. pragmatists in the first few minutes.
              </span>
            </li>
            <li className="flex items-start gap-3" style={{ color: "#5C5C54" }}>
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <span>
                <strong>Real commitments:</strong> You stop leaving meetings
                with "let me think about it" and start getting pilot dates.
              </span>
            </li>
          </ul>

          {/* Closing */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Bottom Line
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Marcus's mistake wasn't that he lacked customers. It was that he
            tried to sell like he had them. He led with features. He got
            defensive about being early. He accepted polite interest as
            progress. Every early-stage founder makes these mistakes.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The best early-stage sellers do the opposite. They lead with
            problems. They reframe limitations as advantages. They push for
            commitment instead of applause. These are skills that can be
            practiced.
          </p>

          <p
            className="mt-4 text-lg font-medium leading-relaxed"
            style={{ color: "#3A3A35" }}
          >
            Your first 10 customers define your company. The techniques are
            learnable. The muscle memory requires practice. DebateClub provides
            the reps.
          </p>

          {/* CTA */}
          <motion.div
            className="mt-12 rounded-xl p-8 text-center"
            style={{ backgroundColor: "#3C4A32" }}
          >
            <h3
              className="mb-4 text-2xl font-bold"
              style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
            >
              Practice Early Customer Sales
            </h3>
            <p className="mb-6" style={{ color: "#C8C8B8" }}>
              Face realistic skeptical prospects. Learn to sell without social
              proof. Build the muscle memory that closes first customers.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold transition-all hover:gap-3"
              style={{ backgroundColor: "#FAFAF8", color: "#3C4A32" }}
            >
              Start Practicing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Sources */}
          <div
            className="mt-16 border-t pt-8"
            style={{ borderColor: "#E8E4DA" }}
          >
            <h3 className="mb-4 text-xl font-bold" style={{ color: "#2A2A20" }}>
              Sources & Further Reading
            </h3>
            <ol className="space-y-2 text-sm" style={{ color: "#5C5C54" }}>
              <li>
                1. Fitzpatrick, Rob. (2013).{" "}
                <em>
                  The Mom Test: How to Talk to Customers & Learn If Your
                  Business is a Good Idea When Everyone is Lying to You
                </em>
                .
              </li>
              <li>
                2. Kazanjy, Pete. (2020).{" "}
                <em>Founding Sales: The Early-Stage Go-to-Market Handbook</em>.
                https://www.foundingsales.com/
              </li>
              <li>
                3. Moore, Geoffrey. (2014).{" "}
                <em>
                  Crossing the Chasm: Marketing and Selling Disruptive Products
                  to Mainstream Customers
                </em>{" "}
                (3rd ed.). Harper Business.
              </li>
              <li>
                4. Blank, Steve. (2013).{" "}
                <em>
                  The Startup Owner's Manual: The Step-by-Step Guide for
                  Building a Great Company
                </em>
                . K&S Ranch.
              </li>
              <li>
                5. CB Insights. (2023). The Top 12 Reasons Startups Fail.
                Research analysis.
              </li>
            </ol>
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
            research from multiple frameworks.
          </p>
        </div>
      </footer>
    </div>
  );
}
