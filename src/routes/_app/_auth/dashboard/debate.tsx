import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/ui/button";
import Vapi from "@vapi-ai/web";
import { Mic, MicOff, BarChart3, FileText } from "lucide-react";
import siteConfig from "~/site.config";
import { Id } from "@cvx/_generated/dataModel";
import { PrepPanel } from "@/ui/prep-panel";
import { SCENARIOS } from "@/scenarios";

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
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
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

      // Model configurations
      const modelConfigs = {
        "gpt-4o": {
          provider: "openai" as const,
          model: "gpt-4o" as const,
        },
        "gpt-4o-mini": {
          provider: "openai" as const,
          model: "gpt-4o-mini" as const,
        },
        "groq-llama-3": {
          provider: "groq" as const,
          model: "llama-3.1-70b-versatile" as const,
        },
      };

      const selectedConfig =
        modelConfigs[selectedModel as keyof typeof modelConfigs];

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
          .replace(/\{\{DIFFICULTY\}\}/g, difficulty)
          .replace(/\{\{STYLE\}\}/g, style)
          .replace(
            /\{\{TALKING_POINTS\}\}/g,
            opponent.talkingPoints && Array.isArray(opponent.talkingPoints)
              ? opponent.talkingPoints.map((tp) => `- ${tp.content}`).join("\n")
              : "- No talking points specified",
          )
          .replace(
            /\{\{OPPONENT_DESC\}\}/g,
            opponent.opponentDescription || "",
          );
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
    <div className="flex h-full w-full bg-secondary px-6 py-8 dark:bg-black">
      <div className="z-10 mx-auto flex h-full w-full max-w-screen-xl gap-12">
        <div className="flex w-full flex-col rounded-lg border border-border bg-card dark:bg-black">
          <div className="flex w-full flex-col rounded-lg p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-medium text-primary">
                Practice Debate
              </h2>
              <p className="text-sm font-normal text-primary/60">
                Topic: {topic}
              </p>
              <p className="text-sm font-normal text-primary/60">
                Your position: {userPosition} | AI position: {aiPosition}
              </p>

              {/* Model Switcher */}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm font-medium text-primary">
                  AI Model:
                </span>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={isSessionActive}
                  className="rounded-md border border-border bg-secondary px-3 py-1 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="gpt-4o">GPT-4o (Smartest)</option>
                  <option value="gpt-4o-mini">GPT-4o Mini (Balanced)</option>
                  <option value="groq-llama-3">Groq Llama 3 (Fastest)</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex w-full px-6">
            <div className="w-full border-b border-border" />
          </div>
          <div className="relative mx-auto flex w-full flex-col items-center p-6">
            <div className="flex w-full flex-col items-center gap-6">
              {/* Timer */}
              <div className="text-4xl font-bold text-primary">
                {formatTime(timer)}
              </div>

              {/* Speaking Indicators */}
              <div className="flex gap-4">
                <div
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
                    isListening
                      ? "bg-green-500/20 text-green-700 dark:text-green-400"
                      : "bg-secondary text-primary/60"
                  }`}
                >
                  {isListening ? (
                    <Mic className="h-5 w-5" />
                  ) : (
                    <MicOff className="h-5 w-5" />
                  )}
                  <span className="text-sm font-medium">You</span>
                </div>
                <div
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
                    isSpeaking
                      ? "bg-blue-500/20 text-blue-700 dark:text-blue-400"
                      : "bg-secondary text-primary/60"
                  }`}
                >
                  {isSpeaking ? (
                    <div className="h-5 w-5 animate-pulse rounded-full bg-blue-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full bg-primary/20" />
                  )}
                  <span className="text-sm font-medium">AI</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex gap-4">
                {!isSessionActive ? (
                  <Button onClick={handleStart} size="lg">
                    Start Debate
                  </Button>
                ) : (
                  <div className="flex gap-4">
                    <Button
                      onClick={handleStop}
                      size="lg"
                      variant="destructive"
                      className="min-w-[120px]"
                    >
                      End Debate
                    </Button>
                    <Button
                      onClick={() => {
                        if (vapiRef.current) vapiRef.current.stop();
                        setIsSessionActive(false);
                        // Don't navigate, just stop
                      }}
                      size="lg"
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              {/* View Analysis Button - Show when debate is complete */}
              {!isSessionActive && debateId && (
                <div className="flex w-full justify-center">
                  <Link
                    to="/dashboard/analysis"
                    search={{ debateId: debateId }}
                  >
                    <Button variant="default" size="lg">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Full Analysis
                    </Button>
                  </Link>
                </div>
              )}

              {error && (
                <div className="rounded-lg bg-red-500/20 p-4 text-sm text-red-700 dark:text-red-400">
                  Error: {error}
                </div>
              )}

              {!VAPI_PUBLIC_API_KEY && (
                <div className="rounded-lg bg-yellow-500/20 p-4 text-sm text-yellow-700 dark:text-yellow-400">
                  Warning: Missing environment variable:
                  VITE_VAPI_PUBLIC_API_KEY
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Prep Materials Button */}
      {opponent && (
        <button
          onClick={() => setIsPrepPanelOpen(!isPrepPanelOpen)}
          className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 active:scale-95"
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
