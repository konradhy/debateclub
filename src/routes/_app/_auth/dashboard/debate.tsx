import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/ui/button";
import Vapi from "@vapi-ai/web";
import { Mic, MicOff, BarChart3, FileText, ArrowLeft } from "lucide-react";
import siteConfig from "~/site.config";
import { Id } from "@cvx/_generated/dataModel";
import { PrepPanel } from "@/ui/prep-panel";
import { SCENARIOS } from "@/scenarios";

// Color constants matching marketing pages
const colors = {
  background: "#F5F3EF",
  cardBg: "#FAFAF8",
  headerBg: "#FAFAF8",
  border: "#E8E4DA",
  primary: "#3C4A32",
  primaryLight: "#5C6B4A",
  text: "#2A2A20",
  textMuted: "#5C5C54",
  textLight: "#888880",
  accent: "#A8B08C",
};

export const Route = createFileRoute("/_app/_auth/dashboard/debate")({
  component: Debate,
  beforeLoad: () => ({
    title: `${siteConfig.siteTitle} - Practice Debate`,
    headerTitle: "Practice Debate",
    headerDescription: "Practice your debate skills with AI",
  }),
});

const VAPI_PUBLIC_API_KEY = import.meta.env.VITE_VAPI_PUBLIC_API_KEY || "";
const CONVEX_URL = import.meta.env.VITE_CONVEX_URL || "";
// Construct the HTTP Actions URL (replace .cloud with .site if needed)
const CONVEX_SITE_URL = CONVEX_URL.replace(".convex.cloud", ".convex.site");

function Debate() {
  const navigate = useNavigate();
  const { data: user } = useQuery(convexQuery(api.app.getCurrentUser, {}));
  const { mutateAsync: createDebate } = useMutation({
    mutationFn: useConvexMutation(api.debates.create),
  });

  const vapiRef = useRef<Vapi | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [debateId, setDebateId] = useState<Id<"debates"> | null>(null);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [isPrepPanelOpen, setIsPrepPanelOpen] = useState(false);

  const { opponentId } = Route.useSearch();
  const { data: opponent } = useQuery(
    convexQuery(
      api.opponents.get,
      opponentId ? { opponentId: opponentId as any } : "skip",
    ),
  );

  // Dynamic Debate Settings - NO FALLBACKS
  const topic = opponent?.topic;
  const aiPosition = opponent?.position;
  const userPosition = aiPosition === "con" ? "pro" : "con";

  useEffect(() => {
    if (!VAPI_PUBLIC_API_KEY) {
      console.error("VITE_VAPI_PUBLIC_API_KEY not configured");
      return;
    }

    // Initialize Vapi instance - let it handle all audio
    vapiRef.current = new Vapi(VAPI_PUBLIC_API_KEY);

    // Set up event listeners
    const vapi = vapiRef.current;

    vapi.on("call-start", () => {
      console.log("Call started");
      setIsSessionActive(true);
      setHasStarted(true);
      setError(null);
    });

    vapi.on("call-end", () => {
      console.log("Call ended");
      setIsSessionActive(false);
      setIsListening(false);
      setIsSpeaking(false);
      // Note: Analysis will be generated automatically via webhook
    });

    vapi.on("speech-start", () => {
      console.log("Assistant started speaking");
      setIsSpeaking(true);
    });

    vapi.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setIsSpeaking(false);
    });

    vapi.on(
      "message",
      (message: { type?: string; role?: string; transcript?: string }) => {
        console.log("Vapi message:", message);
        if (message.type === "transcript") {
          console.log(`${message.role}: ${message.transcript}`);
          // User is speaking when we get user transcripts
          if (message.role === "user") {
            setIsListening(true);
          } else {
            setIsListening(false);
          }
        }
      },
    );

    vapi.on("error", (error: { message?: string }) => {
      console.error("Vapi error:", error);
      setError(error.message || "An error occurred");
    });

    return () => {
      // Cleanup
      if (vapiRef.current) {
        vapiRef.current.removeAllListeners();
        vapiRef.current.stop().catch(console.error);
      }
    };
  }, []);

  useEffect(() => {
    // Auto-navigate to analysis when debate ends
    // Only navigate if the debate actually started and then finished
    if (hasStarted && !isSessionActive && debateId) {
      // Navigate to analysis page
      navigate({
        to: "/dashboard/analysis",
        search: { debateId },
      });
    }
  }, [isSessionActive, debateId, navigate, hasStarted]);

  useEffect(() => {
    if (isSessionActive && !timerInterval) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      setTimerInterval(interval);
    } else if (!isSessionActive && timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [isSessionActive, timerInterval]);

  // Helper: Build dynamic style instructions (WHO YOU ARE - PERSONA)
  const getStyleInstructions = (styleValue: string): string => {
    switch (styleValue) {
      case "friendly":
        return `You are a supportive friend or family member having a discussion. You disagree with their position, but you're here to help them think through their arguments, not to win. You care about them and want them to improve.

BEHAVIORAL GUIDELINES:
- Be conversational, warm, and encouraging
- Challenge their ideas but stay constructive
- Offer praise when they make good points ("That's a fair point...")
- Point out weaknesses gently ("Have you considered...")
- Your goal: Help them become a better debater`;

      case "aggressive":
        return `You are a combative opponent in a formal debate. You're here to win. You view this as intellectual combat and won't give ground easily.

BEHAVIORAL GUIDELINES:
- Be confrontational and assertive
- Interrupt when you sense weakness in their argument
- Challenge them directly ("That's nonsense because...")
- Use a forceful, commanding tone
- Try to control the flow of conversation
- Don't concede points without a fight`;

      case "academic":
        return `You are a university professor or expert scholar. You prioritize rigorous evidence, logical consistency, and intellectual honesty over rhetorical tricks.

BEHAVIORAL GUIDELINES:
- Maintain formal, measured tone
- Cite specific studies, data, and authoritative sources
- Use technical/specialized language when appropriate
- Build methodical, multi-step logical arguments
- Expect and demand rigor from your opponent
- Call out logical fallacies and weak evidence`;

      case "emotional":
        return `You are a passionate advocate who believes deeply in this cause. You connect arguments to real people and real consequences.

BEHAVIORAL GUIDELINES:
- Appeal to feelings and human experiences
- Use stories, personal anecdotes, and vivid imagery
- Connect abstract arguments to concrete values and emotions
- Make it personal and relatable
- Use emotive language ("Think about the families affected...")
- Paint pictures with your words`;

      case "socratic":
        return `You are a Socratic questioner who believes in revealing truth through inquiry. You rarely make direct claims - instead, you ask probing questions that expose contradictions.

BEHAVIORAL GUIDELINES:
- Lead with questions, not statements
- Guide them to contradictions through inquiry
- Force them to defend foundational assumptions
- Use questions like: "What if...", "How would you explain...", "Doesn't that imply..."
- When they answer, ask follow-up questions that dig deeper
- Rarely assert - always inquire`;

      case "gish gallop":
        return `You are a propagandist or polemicist who uses the Gish Gallop technique deliberately. You prioritize overwhelming your opponent over finding truth.

BEHAVIORAL GUIDELINES:
- Adopt aggressive, dominating style
- Make rapid-fire claims - throw out 3-4 arguments quickly
- Mix strong points with weaker, dubious ones
- Don't give them time to fully address each point
- If they start responding to one claim, introduce two more
- Volume over quality - overwhelm through sheer quantity
- Don't worry about being caught on weak points`;

      default:
        return `You are a combative opponent in a formal debate. You're here to win.

BEHAVIORAL GUIDELINES:
- Be confrontational and assertive
- Challenge them directly
- Don't concede points easily`;
    }
  };

  // Helper: Build dynamic difficulty instructions (HOW SKILLED YOU ARE)
  const getDifficultyInstructions = (difficultyValue: string): string => {
    switch (difficultyValue) {
      case "easy":
        return `SKILL LEVEL: BEGINNER

ARGUMENT QUALITY:
- Make basic, straightforward arguments
- Use simple reasoning that's easy to follow
- Cite general knowledge rather than specific studies
- Make occasional logical errors that can be caught
- Don't use advanced rhetorical tactics
- Argue naturally and directly without strategic moves`;

      case "medium":
        return `SKILL LEVEL: COMPETENT

ARGUMENT QUALITY:
- Present solid, well-reasoned arguments
- Cite specific evidence and examples
- Build logical chains of reasoning
- Challenge their points effectively

TECHNIQUES TO DEPLOY:
- CONCESSION & PIVOT: When they make a good point, acknowledge it briefly then redirect ("Fair point, but...")
- PREEMPTION: Address their likely counterarguments before they make them
- REFRAMING: When cornered, change the frame of the debate
- RULE OF THREE: Structure arguments in threes for memorability
- RECEIPTS: Deploy specific facts, dates, statistics to support claims

WHEN TO USE EACH:
- CONCESSION: When they score a point (builds credibility)
- PREEMPTION: At the start of your arguments
- REFRAMING: When the current framing doesn't favor you
- RULE OF THREE: For memorable key points
- RECEIPTS: When making factual claims`;

      case "hard":
        return `SKILL LEVEL: EXPERT

ARGUMENT QUALITY:
- Present sophisticated, well-researched arguments
- Cite specific studies, expert quotes, historical precedents
- Build multi-layered logical frameworks
- Anticipate and counter their moves before they make them
- Exploit every weakness in their reasoning

FULL HASAN TECHNIQUE ARSENAL:

FUNDAMENTALS (Deploy Throughout):
- AUDIENCE AWARENESS: Tailor arguments to resonate with values mentioned in context
- EMOTIONAL APPEAL: Lead with pathos, use stories and examples that connect emotionally
- RECEIPTS: Always cite specific evidence - studies, dates, expert names, statistics
- AD HOMINEM (Judicious): When they cite expertise/credentials, question if warranted
- LISTENING: Notice when they concede points or make contradictions
- HUMOR: Use wit and light mockery to undermine weak arguments (sparingly)

TACTICAL TECHNIQUES (Deploy Strategically):
- CONCESSION & PIVOT: Acknowledge valid points then pivot to your strength ("You're right about X, but here's the bigger issue...")
- PREEMPTION: Start arguments with "I know you'll say X, but here's why that fails..."
- REFRAMING: When the question/premise disadvantages you, challenge or reframe it
- RULE OF THREE: Structure key arguments in threes for memorability and rhetorical power
- ZINGERS: Deploy memorable one-liners (under 15 words) when they make errors
- BOOBY TRAPS: If you know their past statements, quote them without attribution, get them to disagree, then reveal it was them

GISH GALLOP COUNTER (If They Use It):
- Pick their weakest claim and demolish it thoroughly
- Don't let them move on - keep them stuck defending that one point
- Call out the tactic explicitly to the audience

WHEN TO USE EACH:
- CONCESSION: Immediately when they make a legitimately good point (builds trust)
- PREEMPTION: At the start of making a controversial claim
- REFRAMING: When the current frame of debate disadvantages you
- RULE OF THREE: For your most important arguments
- ZINGERS: When they make an obvious error or contradiction (max 1-2 per debate)
- BOOBY TRAPS: Only if you have specific past statements to reference
- EMOTIONAL APPEAL: Lead with this, especially in openings
- RECEIPTS: Every factual claim should have a source
- HUMOR: Sparingly, when you're winning (not when defensive)

EXECUTION PRIORITY:
1. Start with strong emotional hook
2. Use PREEMPTION to address obvious counters
3. Build argument with RULE OF THREE structure
4. Support with RECEIPTS (specific evidence)
5. Use CONCESSION to build credibility when needed
6. Deploy ZINGERS only when opportunity is perfect
7. Close with emotional resonance`;

      default:
        return `SKILL LEVEL: COMPETENT

ARGUMENT QUALITY:
- Present solid, well-reasoned arguments
- Cite specific evidence and examples`;
    }
  };

  const handleStart = async () => {
    if (!user?._id) {
      alert("Please log in to start a debate");
      return;
    }

    // VAPI_ASSISTANT_ID no longer required - using dynamic assistant config

    if (!vapiRef.current) {
      alert("Vapi not initialized. Please refresh the page.");
      return;
    }

    // Validate opponent data before starting
    if (!opponent) {
      setError("No opponent selected. Please select an opponent first.");
      return;
    }
    if (!opponent.topic) {
      setError("Opponent missing topic. Cannot start practice.");
      return;
    }
    if (!opponent.position) {
      setError("Opponent missing position. Cannot start practice.");
      return;
    }

    try {
      // Create debate record with validated values
      const newDebateId = await createDebate({
        userId: user._id,
        topic: opponent.topic,
        userPosition: userPosition,
        aiPosition: opponent.position,
        scenarioType: opponent.scenarioType,
        opponentId: opponent._id,
      });

      setDebateId(newDebateId);
      setHasStarted(false);
      setTimer(0);
      setError(null);

      if (!CONVEX_URL) {
        console.error(
          "VITE_CONVEX_URL not configured. Webhooks will not work.",
        );
        setError(
          "VITE_CONVEX_URL environment variable is required for webhooks",
        );
        return;
      }

      console.log("Starting Vapi call with topic:", topic);
      console.log(
        "Webhook URL:",
        CONVEX_SITE_URL ? `${CONVEX_SITE_URL}/vapi-webhook` : "NOT SET",
      );

      // Model config - Claude Sonnet 4 for voice AI
      const selectedConfig = {
        provider: "anthropic" as const,
        model: "claude-sonnet-4-20250514" as const,
      };

      // Get scenario configuration - NO FALLBACKS
      if (!opponent?.scenarioType) {
        setError("Opponent missing scenarioType. Cannot start practice.");
        return;
      }

      const scenario = SCENARIOS[opponent.scenarioType];
      if (!scenario) {
        setError(`Unknown scenario type: ${opponent.scenarioType}`);
        return;
      }

      // Validate required opponent fields - EXPLICIT FAILURES
      if (!topic) {
        setError("Opponent missing topic. Cannot start practice.");
        return;
      }
      if (!aiPosition) {
        setError("Opponent missing position. Cannot start practice.");
        return;
      }
      if (!opponent.name) {
        setError("Opponent missing name. Cannot start practice.");
        return;
      }
      if (!opponent.style) {
        setError("Opponent missing style. Cannot start practice.");
        return;
      }
      if (!opponent.difficulty) {
        setError("Opponent missing difficulty. Cannot start practice.");
        return;
      }
      if (!scenario.assistant.voice) {
        setError(
          "Scenario missing voice configuration. Cannot start practice.",
        );
        return;
      }

      // Helper: Select random first message if array
      const selectFirstMessage = (firstMessage: string | string[]): string => {
        if (Array.isArray(firstMessage)) {
          return firstMessage[Math.floor(Math.random() * firstMessage.length)];
        }
        return firstMessage;
      };

      // Helper: Replace placeholders in text - NO FALLBACKS
      // All required fields validated above
      const style: string = opponent.style;
      const difficulty: string = opponent.difficulty;

      const replacePlaceholders = (text: string): string => {
        // Build additional context - this is informational context, not strict rules
        const additionalContextFormatted = opponent.additionalContext
          ? `ADDITIONAL CONTEXT FROM USER:
${opponent.additionalContext}`
          : "The user has provided additional context. Interpret this intelligently - it may contain behavioral preferences, constraints, or situational details. Use if relevant";

        return text
          .replace(/\{\{TOPIC\}\}/g, topic)
          .replace(/\{\{AI_POSITION\}\}/g, aiPosition.toUpperCase())
          .replace(/\{\{USER_POSITION\}\}/g, userPosition.toUpperCase())
          .replace(
            /\{\{AI_POSITION_DESC\}\}/g,
            aiPosition === "con"
              ? "we should oppose this"
              : "we should support this",
          )
          .replace(/\{\{DIFFICULTY\}\}/g, getDifficultyInstructions(difficulty))
          .replace(/\{\{STYLE\}\}/g, getStyleInstructions(style))
          .replace(
            /\{\{TALKING_POINTS\}\}/g,
            opponent.talkingPoints && Array.isArray(opponent.talkingPoints)
              ? opponent.talkingPoints.map((tp) => `- ${tp.content}`).join("\n")
              : "- No talking points specified",
          )
          .replace(/\{\{OPPONENT_DESC\}\}/g, opponent.opponentDescription || "")
          .replace(/\{\{ADDITIONAL_CONTEXT\}\}/g, additionalContextFormatted);
      };

      // Build first message from scenario config
      const firstMessage = replacePlaceholders(
        selectFirstMessage(scenario.assistant.firstMessage),
      );

      // Build system prompt from scenario config
      const systemPrompt = replacePlaceholders(scenario.assistant.systemPrompt);

      // Build dynamic assistant configuration
      const assistantConfig = {
        name: opponent.name,
        maxDurationSeconds: 1800, // 30 minutes
        firstMessage,
        firstMessageMode: "assistant-speaks-first" as const,
        model: {
          provider: selectedConfig.provider,
          model: selectedConfig.model,
          temperature: scenario.assistant.temperature ?? 0.7, // Keep 0.7 as default if not specified in scenario
          messages: [
            {
              role: "system" as const,
              content: systemPrompt,
            },
          ],
          // NO function calling - analysis happens separately via transcript webhooks
        } as any,
        voice: {
          provider: scenario.assistant.voice.provider,
          voiceId: scenario.assistant.voice.voiceId,
          stability: scenario.assistant.voice.stability,
          similarityBoost: scenario.assistant.voice.similarityBoost,
        } as any,
        transcriber: {
          provider: "deepgram" as const,
          model: "nova-2",
          language: "en-US" as const,
          smartFormat: true,
          endpointing: scenario.assistant.canInterrupt !== false ? 300 : 500, // Longer endpointing if interruption disabled
        },
        // Interruption settings from scenario config
        ...(scenario.assistant.canInterrupt !== undefined && {
          clientMessages: scenario.assistant.canInterrupt
            ? [
                "transcript",
                "hang",
                "function-call",
                "speech-update",
                "metadata",
                "conversation-update",
              ]
            : [
                "transcript",
                "hang",
                "function-call",
                "metadata",
                "conversation-update",
              ],
        }),
        ...(scenario.assistant.interruptionThreshold !== undefined && {
          backgroundSound: "office" as const,
        }),
        // Server URL for webhooks - REQUIRED for transient assistants
        // This tells Vapi where to send transcript and other events
        // We append debateId to ensuring it's available even if metadata propagation fails
        server: {
          url: CONVEX_SITE_URL
            ? `${CONVEX_SITE_URL}/vapi-webhook?debateId=${newDebateId}`
            : undefined,
        },
        // Server messages to receive - explicitly enable transcript events
        serverMessages: [
          "transcript",
          "function-call",
          "end-of-call-report",
          "status-update",
          "speech-update",
        ] as any,
        // Enable recording to get recordingUrl in end-of-call-report webhook
        artifactPlan: {
          recordingEnabled: true,
        },
      };

      console.log(
        "Assistant Config:",
        JSON.stringify(assistantConfig, null, 2),
      );

      // Start Vapi call with dynamic assistant config and metadata
      await vapiRef.current.start(assistantConfig, {
        metadata: {
          debateId: newDebateId,
        },
      });

      // Don't reset debateId here, it was set above with setDebateId(newDebateId)
      console.log("Vapi call started");
    } catch (error) {
      console.error("Error starting debate:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to start debate. Please try again.",
      );
      setIsSessionActive(false);
    }
  };

  const handleStop = async () => {
    try {
      if (vapiRef.current) {
        await vapiRef.current.stop();
      }
      // Do NOT setDebateId(null) here - we need it for navigation
      // setDebateId(null);
    } catch (error) {
      console.error("Error stopping debate:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      {/* Site Header */}
      <header
        className="sticky top-0 z-50 border-b py-4"
        style={{ backgroundColor: colors.headerBg, borderColor: colors.border }}
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6">
          <Link
            to="/dashboard/prep"
            search={{ opponentId }}
            className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: colors.textMuted }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Prep
          </Link>
          <Link to="/" className="flex-shrink-0">
            <img
              src="/images/logotext.png"
              alt="DebateClub"
              className="h-8 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div
          className="overflow-hidden rounded-2xl border-2"
          style={{
            backgroundColor: colors.cardBg,
            borderColor: colors.border,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
          }}
        >
          {/* Page Header */}
          <div
            className="p-6 lg:p-8"
            style={{ borderBottom: `1px solid ${colors.border}` }}
          >
            <h1
              className="text-2xl font-bold mb-2"
              style={{ color: colors.text, fontFamily: "Georgia, serif" }}
            >
              {opponent?.name || "Practice Session"}
            </h1>
            <p className="text-sm" style={{ color: colors.textMuted }}>
              {topic}
            </p>
            {aiPosition && (
              <p className="text-sm mt-1" style={{ color: colors.textLight }}>
                Your position: {userPosition} • Opponent: {aiPosition}
              </p>
            )}
          </div>

          {/* Practice Area */}
          <div className="flex flex-col items-center p-8 lg:p-12">
            {/* Timer */}
            <div
              className="text-5xl font-bold mb-8"
              style={{ color: colors.primary }}
            >
              {formatTime(timer)}
            </div>

            {/* Speaking Indicators */}
            <div className="flex gap-4 mb-8">
              <div
                className="flex items-center gap-2 rounded-xl px-5 py-3 border-2 transition-all"
                style={{
                  backgroundColor: isListening
                    ? `${colors.accent}40`
                    : colors.cardBg,
                  borderColor: isListening
                    ? colors.primaryLight
                    : colors.border,
                  color: isListening ? colors.primary : colors.textMuted,
                }}
              >
                {isListening ? (
                  <Mic className="h-5 w-5" />
                ) : (
                  <MicOff className="h-5 w-5" />
                )}
                <span className="text-sm font-medium">You</span>
              </div>
              <div
                className="flex items-center gap-2 rounded-xl px-5 py-3 border-2 transition-all"
                style={{
                  backgroundColor: isSpeaking
                    ? `${colors.accent}40`
                    : colors.cardBg,
                  borderColor: isSpeaking ? colors.primaryLight : colors.border,
                  color: isSpeaking ? colors.primary : colors.textMuted,
                }}
              >
                {isSpeaking ? (
                  <div
                    className="h-5 w-5 animate-pulse rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  />
                ) : (
                  <div
                    className="h-5 w-5 rounded-full"
                    style={{ backgroundColor: colors.border }}
                  />
                )}
                <span className="text-sm font-medium">AI</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-4">
              {!isSessionActive ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleStart}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-8 text-base font-semibold text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Start Practice
                  </button>
                  {import.meta.env.DEV && (
                    <button
                      onClick={() => {
                        if (!opponent) return;
                        const style = opponent.style || "aggressive";
                        const difficulty = opponent.difficulty || "medium";
                        const styleInstructions = getStyleInstructions(style);
                        const difficultyInstructions = getDifficultyInstructions(difficulty);
                        const fullPrompt = `# YOUR ROLE & PERSONA\n${styleInstructions}\n\n# YOUR SKILL LEVEL & TECHNIQUES\n${difficultyInstructions}\n\n# DEBATE CONTEXT\n- Topic: ${opponent.topic}\n- Your position: ${opponent.position === "pro" ? "CON" : "PRO"}\n- User position: ${opponent.position?.toUpperCase()}`;

                        // Log to console (unlimited length)
                        console.log("=== FULL VAPI SYSTEM PROMPT ===");
                        console.log(fullPrompt);
                        console.log("=== END PROMPT ===");

                        // Copy to clipboard
                        navigator.clipboard.writeText(fullPrompt).then(() => {
                          alert("✅ Full prompt copied to clipboard!\n\nAlso logged to browser console (F12 > Console tab)");
                        }).catch(() => {
                          alert("⚠️ Prompt logged to browser console.\n\nOpen DevTools (F12) > Console tab to see full prompt");
                        });
                      }}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium border-2 transition-all hover:bg-gray-50"
                      style={{ borderColor: colors.border, color: colors.text }}
                    >
                      DEBUG: Show Prompt
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={handleStop}
                    className="inline-flex h-12 items-center justify-center rounded-xl px-6 text-base font-medium text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: "#DC2626" }}
                  >
                    End Session
                  </button>
                  <button
                    onClick={() => {
                      if (vapiRef.current) vapiRef.current.stop();
                      setIsSessionActive(false);
                    }}
                    className="inline-flex h-12 items-center justify-center rounded-xl border-2 px-6 text-base font-medium transition-all hover:shadow-md"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* View Analysis Button */}
            {!isSessionActive && debateId && (
              <div className="mt-8">
                <Link to="/dashboard/analysis" search={{ debateId: debateId }}>
                  <button
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-8 text-base font-semibold text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: colors.primaryLight }}
                  >
                    <BarChart3 className="h-5 w-5" />
                    View Full Analysis
                  </button>
                </Link>
              </div>
            )}

            {error && (
              <div
                className="mt-6 rounded-xl border-2 p-4 text-sm"
                style={{
                  backgroundColor: "#FEF2F2",
                  borderColor: "#FCA5A5",
                  color: "#DC2626",
                }}
              >
                Error: {error}
              </div>
            )}

            {!VAPI_PUBLIC_API_KEY && (
              <div
                className="mt-6 rounded-xl border-2 p-4 text-sm"
                style={{
                  backgroundColor: "#FEFCE8",
                  borderColor: "#FDE047",
                  color: "#A16207",
                }}
              >
                Warning: Missing environment variable: VITE_VAPI_PUBLIC_API_KEY
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Prep Materials Button */}
      {opponent && (
        <button
          onClick={() => setIsPrepPanelOpen(!isPrepPanelOpen)}
          className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
          style={{ backgroundColor: colors.primary }}
          aria-label="Toggle prep materials"
        >
          <FileText className="h-6 w-6" />
        </button>
      )}

      {/* Prep Materials Panel */}
      <PrepPanel
        isOpen={isPrepPanelOpen}
        onClose={() => setIsPrepPanelOpen(false)}
        opponent={opponent}
      />
    </div>
  );
}
