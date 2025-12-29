import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Target,
  Clock,
  Search,
  TrendingUp,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import {
  StatsGrid,
  TechniqueCard,
  MistakesList,
  PracticeEngineDemo,
  ScoreCategoriesGrid,
  BehavioralRulesList,
  CTASection,
  SourcesList,
  Blockquote,
} from "@/components/blog";

export const Route = createFileRoute("/blog/scenario-customer-discovery")({
  head: () => ({
    meta: [
      {
        title:
          "How to Learn What Customers Actually Need Before You Build | DebateClub",
      },
      {
        name: "description",
        content:
          "Stop pitching your solution in discovery interviews. Learn the research-backed techniques for uncovering real customer needs without bias.",
      },
      {
        property: "og:title",
        content:
          "How to Learn What Customers Actually Need Before You Build | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Stop pitching your solution in discovery interviews. Learn the research-backed techniques for uncovering real customer needs without bias.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: CustomerDiscoveryArticle,
});

/**
 * Blog article: Customer Discovery scenario deep dive.
 * Explores techniques for conducting unbiased customer interviews
 * that uncover real needs before building products.
 */
function CustomerDiscoveryArticle() {
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
            How to Learn What Customers Actually Need Before You Build
          </h1>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            14 min read · Entrepreneur Scenarios
          </p>
        </motion.div>

        {/* Article Body */}
        <motion.div
          className="prose-custom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* 1. OPENING STORY */}
          <p className="text-lg leading-relaxed" style={{ color: "#3A3A35" }}>
            Kelsey spent three weeks scheduling customer discovery interviews.
            She had a hypothesis about project management pain points and
            needed to validate it before building. Ten interviews scheduled
            with target customers. Questions prepared.
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            The first interview started well. She asked about their current
            workflow. They mentioned frustrations. Then, excited by what seemed
            like validation, Kelsey mentioned her solution: "We're building a tool
            that solves exactly that!" The prospect lit up. "That sounds
            amazing! I'd definitely use that."
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            Kelsey walked away feeling great. Nine more interviews went the
            same way. Everyone loved it. Six months of building followed. When
            she came back to sell, nobody bought. They had been polite, not
            honest. She had taught them to lie to her.
          </p>

          {/* 2. CONNECTION TO RESEARCH */}
          <Blockquote
            quote="You can't trust what customers say they'll do in the future. You can only trust how they currently do things."
            attribution="Rob Fitzpatrick, The Mom Test"
          />

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Customer discovery is the foundational skill that determines
            whether you build something people pay for or something that dies
            in an MVP graveyard. But most founders get it catastrophically
            wrong. They pitch when they should listen. They ask about the
            future when they should ask about the past. They leave interviews
            with false confidence and build the wrong thing.
          </p>

          {/* 3. WHY THIS IS HARD */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{
              color: "#2A2A20",
              fontFamily: "Georgia, serif",
              borderLeft: "4px solid #A8B08C",
              paddingLeft: "16px"
            }}
          >
            Why Customer Discovery Is So Hard
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The knowledge isn't hard. Everyone knows they should "talk to
            customers." But executing under pressure is where founders fail.
            Your nervous system wants validation, not truth. You've invested
            months in an idea – the last thing you want is someone to say it's
            not valuable. So you unconsciously bias the conversation.
          </p>

          <StatsGrid
            stats={[
              {
                stat: "42%",
                description:
                  "of startups fail because they build something nobody wants",
                source: "CB Insights, 2023",
              },
              {
                stat: "6-12 mo",
                description:
                  "wasted by founders who misunderstood the problem before building",
                source: "Steve Blank, Customer Development",
              },
            ]}
          />

          <div
            className="my-6 rounded-lg p-6"
            style={{
              backgroundColor: "#F0F2E8",
              borderLeft: "4px solid #3C4A32",
            }}
          >
            <p className="text-lg font-medium leading-relaxed" style={{ color: "#2A2A20" }}>
              The gap isn't knowing you should do customer discovery. The gap is
              resisting the urge to pitch your solution, accepting uncomfortable
              truths, and digging beneath surface-level answers when your brain
              wants to move on. This is a psychological challenge disguised as a
              research task.
            </p>
          </div>

          {/* 4. THE FRAMEWORK */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{
              color: "#2A2A20",
              fontFamily: "Georgia, serif",
              borderLeft: "4px solid #A8B08C",
              paddingLeft: "16px"
            }}
          >
            The Framework: Past Behavior Over Future Predictions
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Customer discovery draws from multiple proven methodologies. Rob
            Fitzpatrick's "The Mom Test" teaches you to ask about the past,
            not the future. Steve Blank's Customer Development methodology
            shows you to get out of the building and test hypotheses like a
            scientist. Cindy Alvarez's "Lean Customer Development" reveals how
            to detect real constraints versus wish lists.
          </p>

          <div
            className="my-6 inline-flex items-center gap-3 rounded-lg px-5 py-4"
            style={{
              backgroundColor: "#3C4A32",
              color: "#C8D4B8",
            }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "#C8D4B8" }}>
                2-3
              </div>
              <div className="text-xs uppercase tracking-wide mt-1" style={{ color: "#A8B08C" }}>
                Levels Deep
              </div>
            </div>
            <div className="text-sm" style={{ color: "#C8D4B8" }}>
              Ask "why" multiple times to uncover real motivations beneath surface answers
            </div>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The common thread:{" "}
            <strong>
              people lie about what they'll do, but tell the truth about what
              they've done
            </strong>
            .
          </p>

          {/* 5. TECHNIQUES THAT WORK */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{
              color: "#2A2A20",
              fontFamily: "Georgia, serif",
              borderLeft: "4px solid #A8B08C",
              paddingLeft: "16px"
            }}
          >
            Six Techniques That Work
          </h2>

          <TechniqueCard
            number={1}
            title='"Tell Me About the Last Time That Happened"'
            icon={Clock}
            whatItIs="Ground every question in specific past events instead of hypothetical futures. Ask about workflows, tools used, money spent on the last occurrence of the problem."
            whyItWorks="People give optimistic predictions about the future to be polite. They tell you the truth about past events because those already happened. This reveals constraints, actual costs, and real urgency. (Fitzpatrick, The Mom Test)"
            example='Bad: "Would you pay for a tool that does X?" Good: "Tell me about the last time you encountered this problem. What did you do? How long did it take? What did it cost you?"'
            source="Fitzpatrick, The Mom Test"
          />

          <TechniqueCard
            number={2}
            title="Ask About the Problem, Not Your Solution"
            icon={Target}
            whatItIs="Focus 100% of the conversation on understanding their world. Never mention your product, even when they ask. The moment you pitch, you bias the entire interview."
            whyItWorks="When people know what you're building, they unconsciously tailor their answers to be helpful. You need their unfiltered reality, not their helpful fiction. (Blank, Customer Development)"
            example={'Bad: "We\'re building a tool that helps with X. Would this solve your problem?" Good: "What\'s the hardest part about doing X right now? How are you dealing with it?"'}
            source="Blank, Customer Development"
          />

          <TechniqueCard
            number={3}
            title='"How Are You Solving It Now?"'
            icon={Search}
            whatItIs="Understand their current workarounds, tools, and spend. What they're paying now (in time or money) reveals what they'll pay for a real solution."
            whyItWorks="If someone spends $100/month on a janky workaround, you know they'll pay for a proper solution. If they've never tried to solve it, it's not urgent enough to buy. Current spend is your pricing anchor. (Fitzpatrick, The Mom Test)"
            example={'"What are you using now to handle this? What does that cost you? What else have you tried? What didn\'t you love about those solutions?"'}
            source="Fitzpatrick, The Mom Test"
          />

          <TechniqueCard
            number={4}
            title='"Why Was This Hard?" (Dig 2-3 Levels Deep)'
            icon={TrendingUp}
            whatItIs='Ask "Why?" repeatedly to dig beneath surface complaints. The first answer is always superficial. The third answer reveals the real stakes.'
            whyItWorks="People give you the socially acceptable answer first. Digging deeper reveals budget impact, competitive pressure, career risk, or personal pain – the real motivations that drive purchasing decisions. (Alvarez, Lean Customer Development)"
            example={'Surface: "The current tool is slow." One why: "Why is that a problem?" – "It wastes time." Two whys: "Why does that matter?" – "We lose deals when we can\'t respond fast enough."'}
            source="Alvarez, Lean Customer Development"
          />

          <TechniqueCard
            number={5}
            title="Seek Commitment, Not Compliments"
            icon={MessageCircle}
            whatItIs="Test whether they'll invest time, money, or reputation – not just praise. Commitment costs something. Compliments are free."
            whyItWorks={'"That\'s a great idea!" means nothing. Real validation comes from sacrifice: introducing you to peers, scheduling follow-ups, pre-ordering, or spending time on prototypes. Absence of commitment reveals absence of urgency. (Fitzpatrick, The Mom Test)'}
            example={'Bad: Accepting "I\'d definitely use that!" as validation. Good: "Would you introduce me to two others with this problem? Can we schedule a follow-up to walk through a prototype?"'}
            source="Fitzpatrick, The Mom Test"
          />

          <TechniqueCard
            number={6}
            title="Interview Recent Buyers, Not Active Shoppers"
            icon={AlertTriangle}
            whatItIs="Talk to people who recently solved the problem (bought a solution), not people currently researching. Buyers reveal what drives purchase decisions. Shoppers haven't committed yet."
            whyItWorks="People actively shopping haven't made the hard choice. They're exploring, not buying. Recent buyers reveal what tipped them over the edge – that's the insight that predicts future purchases. (LEANFoundry, Common Mistakes)"
            example={'Bad: "I\'m looking for people interested in project management tools" (finds shoppers). Good: "I\'m looking for people who recently switched project management tools" (finds buyers).'}
            source="LEANFoundry, Common Customer Interview Mistakes"
          />

          {/* 6. COMMON MISTAKES */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{
              color: "#2A2A20",
              fontFamily: "Georgia, serif",
              borderLeft: "4px solid #A8B08C",
              paddingLeft: "16px"
            }}
          >
            Five Mistakes That Ruin Discovery Interviews
          </h2>

          <MistakesList
            intro="These are the behaviors that produce false positives and waste months of development time:"
            mistakes={[
              {
                title: "Pitching Your Solution",
                description:
                  'The moment you explain your idea, the interview is ruined. They\'ll tell you what they think you want to hear. Keep the conversation 100% on their problem. If they ask "What are you building?" deflect: "I\'m still figuring that out – that\'s why I\'m asking you these questions."',
              },
              {
                title: 'Asking "Would You Buy This?"',
                description:
                  "Hypothetical questions produce optimistic lies. People say yes to be polite, not because they'll actually buy. Ask about what they've done (past behavior), not what they'd do (future predictions).",
              },
              {
                title: "Accepting Surface-Level Answers",
                description:
                  'If they say "It\'s annoying" and you move on, you\'ve learned nothing. Ask "Why is that a problem?" and "Why does that matter?" at least 2-3 times. The real motivation is buried beneath the first answer.',
              },
              {
                title: "Talking More Than 40% of the Time",
                description:
                  "Discovery is about listening, not explaining. If you're doing most of the talking, you're not learning. Ask questions, then be comfortable with silence. Let them fill it.",
              },
              {
                title: 'Accepting "That\'s Interesting!" as Validation',
                description:
                  'Enthusiasm without commitment is worthless. Push for something concrete: introductions, time, pre-orders, or willingness to test prototypes. If they won\'t invest anything, the problem isn\'t urgent.',
              },
            ]}
          />

          {/* 7. HOW DEBATECLUB WORKS */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{
              color: "#2A2A20",
              fontFamily: "Georgia, serif",
              borderLeft: "4px solid #A8B08C",
              paddingLeft: "16px"
            }}
          >
            How DebateClub Trains This Skill
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Everyone's read The Mom Test. But staying disciplined when you're
            face-to-face with a prospect and desperate for validation is a
            different challenge entirely. DebateClub gives you a safe place to
            fail until you build the reflex to stay curious instead of pitching.
          </p>

          <h3
            className="mb-3 mt-8 text-xl font-bold"
            style={{ color: "#2A2A20" }}
          >
            The Setup
          </h3>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            You enter the customer segment you're targeting, the problem
            hypothesis you want to test, and how you found this person. The
            system generates a realistic prospect who has recently dealt with
            the problem and has tried existing solutions.
          </p>

          <PracticeEngineDemo
            openingLine="Hi! Yeah, I got your message. I have about 20 minutes – what did you want to know?"
            openingContext="The prospect is slightly guarded but professional. This is your moment to build rapport and start exploring their world."
            badResponse="Great! So we're building a tool that helps teams collaborate more efficiently. We think it could really solve the issues you're probably facing. Would something like that be useful for you?"
            badDetections={[
              "<strong>Pitched solution immediately</strong> – You explained your idea before understanding their problem",
              "<strong>Hypothetical question</strong> – Asked 'would this be useful' instead of asking about past events",
              "<strong>Assumed their problems</strong> – Said 'issues you're probably facing' without asking",
            ]}
            badOutcome="Oh, that does sound interesting! Yeah, we definitely struggle with collaboration. Let me think about it and I'll get back to you."
            badExplanation="The prospect gave you polite enthusiasm but no commitment. They'll never follow up. You taught them what you wanted to hear, and they said it. The interview produced zero useful information."
            goodResponse="Thanks for taking the time! I'm trying to understand how teams like yours handle collaboration. Can you tell me about the last time you had a collaboration breakdown – what happened, and how did you deal with it?"
            goodDetections={[
              "<strong>Past-focused question</strong> – Asked about 'last time' instead of hypotheticals",
              "<strong>Stayed on their problem</strong> – No mention of your solution",
              "<strong>Specific scenario requested</strong> – Asked for a concrete story, not abstract opinions",
            ]}
            goodOutcome="Oh man, yeah. Last week we had a client deliverable that got completely messed up because three people were working on different versions. We ended up manually merging everything at 11 PM the night before the deadline. It was a disaster."
            goodExplanation="The prospect opened up with a specific, painful story. Now you can dig deeper: What tools were they using? What did that cost them in time? What have they tried to fix it? You're learning real constraints, not polite opinions."
            analysisScores={[
              {
                icon: Target,
                name: "Problem Focus",
                score: "9/10",
                isGood: true,
                feedback:
                  "Kept conversation entirely on their problem. Never mentioned your solution.",
              },
              {
                icon: Clock,
                name: "Specificity",
                score: "9/10",
                isGood: true,
                feedback:
                  "Asked about 'last time' – grounded in past events, not hypotheticals.",
              },
              {
                icon: TrendingUp,
                name: "Discovery Depth",
                score: "7/10",
                isGood: true,
                feedback:
                  "Got specific story. Could dig deeper with 'why' questions about impact.",
              },
              {
                icon: MessageCircle,
                name: "Validation Quality",
                score: "8/10",
                isGood: true,
                feedback:
                  "Avoided seeking compliments. Next step: ask about current solutions and spend.",
              },
            ]}
            analysisExplanation="The system shows exactly where you succeeded and where you can improve. It measures whether you stayed focused on problems, asked about the past, dug beneath surface answers, and sought evidence over enthusiasm."
          />

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            The AI opponent mirrors real prospect behavior. When you pitch too
            early, it gets polite and vague. When you ask past-focused
            questions, it opens up with specific details. When you dig deeper
            with "why" questions, it reveals layers. It reacts to your technique
            the way actual customers do, rewarding discipline and punishing
            unconscious bias.
          </p>

          {/* 8. OPENING SCENARIOS */}
          <h3
            className="mb-3 mt-8 text-xl font-bold"
            style={{ color: "#2A2A20" }}
          >
            Opening Scenarios
          </h3>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Each practice session opens with a realistic customer discovery
            scenario:
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
                "Hi! Yeah, I got your message. I have about 20 minutes – what did
                you want to know?"
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
                "Hey there. I'm between meetings, but I can chat for a bit. You
                mentioned wanting to learn about project management workflows?"
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
                "Sure, I can talk. Just so you know, I've done a few of these
                startup interviews before – are you going to pitch me something?"
              </p>
            </div>
          </div>

          {/* 9. BEHAVIORAL RULES */}
          <h3
            className="mb-3 mt-8 text-xl font-bold"
            style={{ color: "#2A2A20" }}
          >
            Behavioral Rules
          </h3>

          <BehavioralRulesList
            intro="The prospect responds to your technique, not just your words:"
            rules={[
              {
                condition: "If you pitch your solution",
                outcome:
                  "The prospect becomes polite but vague, giving enthusiastic lies",
              },
              {
                condition: "If you ask hypothetical questions",
                outcome:
                  'They say "Probably!" or "That sounds useful!" with zero commitment',
              },
              {
                condition: "If you ask about specific past events",
                outcome:
                  "They become detailed, sharing workflows, costs, and real constraints",
              },
              {
                condition: "If you dig deeper with 'why' questions",
                outcome:
                  "They reveal layers: surface complaint → practical impact → real motivation",
              },
              {
                condition: "If you accept surface answers",
                outcome:
                  "They stay superficial – no deeper insights emerge",
              },
              {
                condition: "If you seek commitment (intros, time, money)",
                outcome:
                  "They either demonstrate real interest or reveal the problem isn't urgent",
              },
            ]}
          />

          {/* 10. WHAT GETS MEASURED */}
          <h3
            className="mb-3 mt-8 text-xl font-bold"
            style={{ color: "#2A2A20" }}
          >
            What Gets Measured
          </h3>

          <ScoreCategoriesGrid
            intro="After each practice session, you receive detailed analysis across four dimensions:"
            categories={[
              {
                name: "Problem Focus",
                description:
                  "Did you keep the conversation on their problem, or did you pitch your solution? Measures ability to stay curious about their world.",
              },
              {
                name: "Specificity",
                description:
                  'Did you ask about past events ("last time"), or hypothetical futures ("would you")? Measures grounding in actual behavior.',
              },
              {
                name: "Discovery Depth",
                description:
                  "Did you dig beneath surface answers with 'why,' or accept the first thing they said? Measures ability to uncover root causes.",
              },
              {
                name: "Validation Quality",
                description:
                  "Did you seek concrete evidence (current spend, commitments), or accept enthusiasm? Measures rigor in validation.",
              },
            ]}
          />

          {/* 11. WHAT CHANGES AFTER PRACTICE */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{
              color: "#2A2A20",
              fontFamily: "Georgia, serif",
              borderLeft: "4px solid #A8B08C",
              paddingLeft: "16px"
            }}
          >
            What Changes After Practice
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            After practicing customer discovery across multiple sessions, you
            will notice:
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
                <strong>You stop pitching unconsciously.</strong> The urge to
                explain your solution fades. You stay genuinely curious about
                their world.
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
                <strong>You catch yourself asking hypotheticals.</strong> When
                you start to say "Would you...", you course-correct to "Tell me
                about the last time..."
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
                <strong>You dig deeper automatically.</strong> Surface-level
                answers feel incomplete. You naturally ask "Why does that
                matter?" until you reach real stakes.
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
                <strong>You distinguish real problems from polite interest.</strong>{" "}
                You recognize the difference between "That's interesting!" and
                actual commitment.
              </p>
            </div>
          </div>

          {/* 12. THE BOTTOM LINE */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{
              color: "#2A2A20",
              fontFamily: "Georgia, serif",
              borderLeft: "4px solid #A8B08C",
              paddingLeft: "16px"
            }}
          >
            The Bottom Line
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Kelsey's mistake wasn't conducting customer discovery interviews.
            Her mistake was pitching her solution and accepting polite
            enthusiasm as validation. Six months of building wasted because she
            taught her interviewees to lie to her.
          </p>

          <p className="mt-4 text-lg font-medium leading-relaxed" style={{ color: "#3A3A35" }}>
            The difference between building what people want and building what
            dies in an MVP graveyard isn't more interviews – it's better
            interviews. Past behavior over future predictions. Deep exploration
            over surface answers. Commitment over compliments.
          </p>

          {/* 13. CTA */}
          <CTASection
            title="Practice Customer Discovery"
            description="Face realistic prospects. Learn to uncover real needs without pitching. Build the muscle memory to conduct unbiased discovery interviews."
          />

          {/* 14. SOURCES */}
          <SourcesList
            sources={[
              {
                citation:
                  'Fitzpatrick, Rob. (2019). The Mom Test: How to talk to customers & learn if your business is a good idea when everyone is lying to you.',
              },
              {
                citation:
                  'Blank, Steve. (2013). The Four Steps to the Epiphany. K&S Ranch.',
              },
              {
                citation:
                  'Alvarez, Cindy. (2014). Lean Customer Development: Building Products Your Customers Will Buy. O\'Reilly Media.',
              },
              {
                citation:
                  'Moore, Geoffrey. (2014). Crossing the Chasm: Marketing and Selling Disruptive Products to Mainstream Customers. HarperBusiness.',
              },
              {
                citation:
                  '"3 Common Customer Interviewing Mistakes." LEANFoundry. https://www.leanfoundry.com/articles/3-common-customer-interviewing-mistakes',
              },
            ]}
          />

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
