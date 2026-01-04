import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";
import { BarChart3, ArrowLeft, FileText, Settings } from "lucide-react";
import siteConfig from "~/site.config";
import { Id } from "@cvx/_generated/dataModel";
import { PrepPanel } from "@/ui/prep-panel";
import { OpponentConfigPanel } from "@/ui/opponent-config-panel";
import { SCENARIOS } from "@/scenarios";
import { colors } from "@/lib/prep-colors";
import {
  getStyleInstructions,
  getDifficultyInstructions,
  type DebateStyle,
  type DifficultyLevel,
} from "@/lib/debate";
import { Timer, SpeakingIndicators } from "@/ui/debate";
import { getSpeechPlan, getInterruptionModeForDebateStyle } from "@/lib/vapi/speechPlans";

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
  const { mutateAsync: completeDebate } = useMutation({
    mutationFn: useConvexMutation(api.debates.completeWithClientDuration),
  });
  const { mutateAsync: updateBasicSettings } = useMutation({
    mutationFn: useConvexMutation(api.opponents.updateBasicSettings),
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
  const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);

  const { opponentId } = Route.useSearch();
  const { data: opponent } = useQuery({
    ...convexQuery(
      api.opponents.get,
      opponentId ? { opponentId: opponentId as any } : "skip",
    ),
    staleTime: 10 * 60 * 1000, // 10 minutes - opponent doesn't change during debate
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });

  // Dynamic Debate Settings - NO FALLBACKS
  const topic = opponent?.topic;
  const userPosition = opponent?.position;
  const aiPosition = userPosition === "con" ? "pro" : "con";

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
      const style = opponent.style as string;
      const difficulty = opponent.difficulty as string;

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
          .replace(/\{\{DIFFICULTY\}\}/g, getDifficultyInstructions(difficulty as DifficultyLevel))
          .replace(/\{\{STYLE\}\}/g, getStyleInstructions(style as DebateStyle))
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

      // Determine interruption mode
      // For debate scenarios, map style to mode dynamically
      // For other scenarios, use the scenario's default mode
      const interruptionMode =
        scenario.category === "debate"
          ? getInterruptionModeForDebateStyle(opponent.style as string)
          : scenario.defaultInterruptionMode;

      const speechPlan = getSpeechPlan(interruptionMode);

      // Console logs for testing
      console.log("🎯 Interruption Mode Selection:", {
        scenarioCategory: scenario.category,
        opponentStyle: opponent.style,
        selectedMode: interruptionMode,
        speechPlan: {
          waitSeconds: speechPlan.startSpeakingPlan.waitSeconds,
          numWordsToInterrupt: speechPlan.stopSpeakingPlan.numWords,
          backoffSeconds: speechPlan.stopSpeakingPlan.backoffSeconds,
        },
      });

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
        },
        // Speech plans control response timing and interruption behavior
        startSpeakingPlan: speechPlan.startSpeakingPlan,
        stopSpeakingPlan: speechPlan.stopSpeakingPlan,
        clientMessages: [
          "transcript",
          "hang",
          "function-call",
          "speech-update",
          "metadata",
          "conversation-update",
        ],
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

      console.log("🎤 Vapi Assistant Config:", {
        interruptionMode,
        startSpeakingPlan: assistantConfig.startSpeakingPlan,
        stopSpeakingPlan: assistantConfig.stopSpeakingPlan,
      });
      console.log(
        "📋 Full Assistant Config:",
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
      // Complete the debate with the accurate timer duration BEFORE stopping Vapi
      if (debateId && timer > 0) {
        await completeDebate({
          debateId,
          duration: timer,
        });
      }

      if (vapiRef.current) {
        await vapiRef.current.stop();
      }
      // Do NOT setDebateId(null) here - we need it for navigation
      // setDebateId(null);
    } catch (error) {
      console.error("Error stopping debate:", error);
    }
  };

  const handleSaveAndRestart = async (updates: {
    style?: string;
    difficulty?: string;
    position?: string;
  }) => {
    if (!opponent?._id) return;

    try {
      // 1. Stop debate if active
      if (isSessionActive && vapiRef.current) {
        await vapiRef.current.stop();
        setIsSessionActive(false);
      }

      // 2. Update opponent settings in database
      await updateBasicSettings({
        opponentId: opponent._id,
        ...updates,
      });

      // 3. Wait a moment for state to settle and opponent query to refetch
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 4. Start new debate with updated settings
      // The opponent data will be refetched automatically by the query
      // so handleStart will use the new settings
      await handleStart();
    } catch (error) {
      console.error("Failed to save and restart:", error);
      throw error;
    }
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
      <div className="mx-auto max-w-4xl px-4 md:px-6 py-8">
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
            className="p-4 md:p-6 lg:p-8"
            style={{ borderBottom: `1px solid ${colors.border}` }}
          >
            <h1
              className="text-xl md:text-2xl font-bold mb-2"
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
          <div className="flex flex-col items-center p-6 md:p-8 lg:p-12">
            {/* Timer */}
            <Timer seconds={timer} colors={colors} />

            {/* Speaking Indicators */}
            <SpeakingIndicators
              isListening={isListening}
              isSpeaking={isSpeaking}
              colors={colors}
            />

            {/* Control Buttons */}
            <div className="flex gap-4">
              {!isSessionActive ? (
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleStart}
                    className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl px-8 text-base font-semibold text-white transition-all hover:brightness-110"
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
                        const styleInstructions = getStyleInstructions(style as DebateStyle);
                        const difficultyInstructions =
                          getDifficultyInstructions(difficulty as DifficultyLevel);
                        const fullPrompt = `# YOUR ROLE & PERSONA\n${styleInstructions}\n\n# YOUR SKILL LEVEL & TECHNIQUES\n${difficultyInstructions}\n\n# DEBATE CONTEXT\n- Topic: ${opponent.topic}\n- Your position: ${opponent.position === "pro" ? "CON" : "PRO"}\n- User position: ${opponent.position?.toUpperCase()}`;

                        // Log to console (unlimited length)
                        console.log("=== FULL VAPI SYSTEM PROMPT ===");
                        console.log(fullPrompt);
                        console.log("=== END PROMPT ===");

                        // Copy to clipboard
                        navigator.clipboard
                          .writeText(fullPrompt)
                          .then(() => {
                            alert(
                              "✅ Full prompt copied to clipboard!\n\nAlso logged to browser console (F12 > Console tab)",
                            );
                          })
                          .catch(() => {
                            alert(
                              "⚠️ Prompt logged to browser console.\n\nOpen DevTools (F12) > Console tab to see full prompt",
                            );
                          });
                      }}
                      className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium border-2 transition-all hover:bg-gray-50"
                      style={{ borderColor: colors.border, color: colors.text }}
                    >
                      DEBUG: Show Prompt
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleStop}
                    className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-xl px-6 text-base font-medium text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: "#DC2626" }}
                  >
                    End Session
                  </button>
                  <button
                    onClick={() => {
                      if (vapiRef.current) vapiRef.current.stop();
                      setIsSessionActive(false);
                    }}
                    className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-xl border-2 px-6 text-base font-medium transition-all hover:shadow-md"
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
                <Link to="/dashboard/analysis" search={{ debateId: debateId }} className="block">
                  <button
                    className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl px-8 text-base font-semibold text-white transition-all hover:brightness-110"
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

      {/* Floating Config Button - Bottom Left */}
      {opponent && (
        <button
          onClick={() => setIsConfigPanelOpen(!isConfigPanelOpen)}
          className="fixed bottom-6 left-6 z-30 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
          style={{ backgroundColor: colors.primary }}
          aria-label="Toggle opponent config"
        >
          <Settings className="h-6 w-6" />
        </button>
      )}

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

      {/* Opponent Config Panel */}
      <OpponentConfigPanel
        isOpen={isConfigPanelOpen}
        onClose={() => setIsConfigPanelOpen(false)}
        opponent={opponent}
        isDebateActive={isSessionActive}
        onSaveAndRestart={handleSaveAndRestart}
      />

      {/* Prep Materials Panel */}
      <PrepPanel
        isOpen={isPrepPanelOpen}
        onClose={() => setIsPrepPanelOpen(false)}
        opponent={opponent}
      />
    </div>
  );
}
