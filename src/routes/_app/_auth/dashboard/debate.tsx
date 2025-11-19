import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/ui/button";
import Vapi from "@vapi-ai/web";
import { Mic, MicOff } from "lucide-react";
import siteConfig from "~/site.config";

export const Route = createFileRoute("/_app/_auth/dashboard/debate")({
  component: Debate,
  beforeLoad: () => ({
    title: `${siteConfig.siteTitle} - Practice Debate`,
    headerTitle: "Practice Debate",
    headerDescription: "Practice your debate skills with AI",
  }),
});

const DEBATE_TOPIC = "Climate change requires immediate action";
const USER_POSITION = "pro";
const AI_POSITION = "con";
const VAPI_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID || "";
const VAPI_PUBLIC_API_KEY = import.meta.env.VITE_VAPI_PUBLIC_API_KEY || "";

function Debate() {
  const { data: user } = useQuery(convexQuery(api.app.getCurrentUser, {}));
  const { mutateAsync: createDebate } = useMutation({
    mutationFn: useConvexMutation(api.debates.create),
  });

  const vapiRef = useRef<Vapi | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [debateId, setDebateId] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

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
      setError(null);
    });

    vapi.on("call-end", () => {
      console.log("Call ended");
      setIsSessionActive(false);
      setIsListening(false);
      setIsSpeaking(false);
    });

    vapi.on("speech-start", () => {
      console.log("Assistant started speaking");
      setIsSpeaking(true);
    });

    vapi.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setIsSpeaking(false);
    });

    vapi.on("message", (message: any) => {
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
    });

    vapi.on("error", (error: any) => {
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

    if (!VAPI_ASSISTANT_ID) {
      alert(
        "Vapi Assistant ID not configured. Please set VITE_VAPI_ASSISTANT_ID",
      );
      return;
    }

    if (!vapiRef.current) {
      alert("Vapi not initialized. Please refresh the page.");
      return;
    }

    try {
      // Create debate record
      const newDebateId = await createDebate({
        userId: user._id,
        topic: DEBATE_TOPIC,
        userPosition: USER_POSITION,
        aiPosition: AI_POSITION,
      });

      setDebateId(newDebateId);
      setTimer(0);
      setError(null);

      console.log("Starting Vapi call with assistant:", VAPI_ASSISTANT_ID);

      // Start Vapi call - simple pattern from docs
      await vapiRef.current.start(VAPI_ASSISTANT_ID);

      console.log("Vapi call started");
    } catch (error: any) {
      console.error("Error starting debate:", error);
      setError(error.message || "Failed to start debate. Please try again.");
      setIsSessionActive(false);
    }
  };

  const handleStop = async () => {
    try {
      if (vapiRef.current) {
        await vapiRef.current.stop();
      }
      setDebateId(null);
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
                Topic: {DEBATE_TOPIC}
              </p>
              <p className="text-sm font-normal text-primary/60">
                Your position: {USER_POSITION} | AI position: {AI_POSITION}
              </p>
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
                  <Button onClick={handleStop} size="lg" variant="destructive">
                    End Debate
                  </Button>
                )}
              </div>

              {error && (
                <div className="rounded-lg bg-red-500/20 p-4 text-sm text-red-700 dark:text-red-400">
                  Error: {error}
                </div>
              )}

              {(!VAPI_ASSISTANT_ID || !VAPI_PUBLIC_API_KEY) && (
                <div className="rounded-lg bg-yellow-500/20 p-4 text-sm text-yellow-700 dark:text-yellow-400">
                  Warning: {!VAPI_ASSISTANT_ID && "VITE_VAPI_ASSISTANT_ID "}
                  {!VAPI_ASSISTANT_ID && !VAPI_PUBLIC_API_KEY && "and "}
                  {!VAPI_PUBLIC_API_KEY && "VITE_VAPI_PUBLIC_API_KEY "}
                  not configured. Please set these environment variables.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
