/**
 * Vapi Speech Plan Configurations
 *
 * Defines startSpeakingPlan and stopSpeakingPlan for each interruption mode.
 * These control how quickly the AI responds and how easy it is to interrupt.
 */

export type InterruptionMode =
    | "off"
    | "friendly"
    | "debate"
    | "aggressive"
    | "relentless";

export interface SpeechPlanConfig {
    startSpeakingPlan: {
        waitSeconds: number;
        smartEndpointingEnabled?: boolean;
        smartEndpointingPlan?: {
            provider: "livekit" | "vapi" | "krisp";
            waitFunction?: string;
            threshold?: number;
        };
    };
    stopSpeakingPlan: {
        numWords: number;
        voiceSeconds: number;
        backoffSeconds: number;
        acknowledgementPhrases: string[];
        interruptionPhrases: string[];
    };
}

export const SPEECH_PLANS: Record<InterruptionMode, SpeechPlanConfig> = {
    off: {
        startSpeakingPlan: {
            waitSeconds: 2.5,
            smartEndpointingEnabled: false,
        },
        stopSpeakingPlan: {
            numWords: 2,
            voiceSeconds: 0.2,
            backoffSeconds: 2.0,
            acknowledgementPhrases: [
                "yeah",
                "uh-huh",
                "right",
                "okay",
                "mm-hmm",
                "i see",
                "got it",
                "understood",
                "sure",
                "alright",
            ],
            interruptionPhrases: ["wait", "hold on", "but", "actually", "stop"],
        },
    },

    friendly: {
        startSpeakingPlan: {
            waitSeconds: 1.2,
            smartEndpointingPlan: {
                provider: "livekit",
            },
        },
        stopSpeakingPlan: {
            numWords: 2,
            voiceSeconds: 0.2,
            backoffSeconds: 1.5,
            acknowledgementPhrases: [
                "yeah",
                "uh-huh",
                "right",
                "okay",
                "mm-hmm",
                "i see",
                "got it",
                "understood",
                "sure",
                "alright",
            ],
            interruptionPhrases: ["wait", "hold on", "but", "actually", "stop"],
        },
    },

    debate: {
        startSpeakingPlan: {
            waitSeconds: 0.6,
            smartEndpointingPlan: {
                provider: "livekit",
            },
        },
        stopSpeakingPlan: {
            numWords: 2,
            voiceSeconds: 0.2,
            backoffSeconds: 1.0,
            acknowledgementPhrases: ["yeah", "uh-huh", "mm-hmm"],
            interruptionPhrases: [
                "wait",
                "hold",
                "but",
                "no",
                "stop",
                "actually",
                "that's",
            ],
        },
    },

    aggressive: {
        startSpeakingPlan: {
            waitSeconds: 0.4,
            smartEndpointingPlan: {
                provider: "livekit",
                waitFunction: "200 + 4000 * x",
            },
        },
        stopSpeakingPlan: {
            numWords: 4,
            voiceSeconds: 0.3,
            backoffSeconds: 0.7,
            acknowledgementPhrases: ["yeah", "uh-huh", "mm-hmm"],
            interruptionPhrases: ["wait", "hold", "but", "no", "stop", "actually"],
        },
    },

    relentless: {
        startSpeakingPlan: {
            waitSeconds: 0.3,
            smartEndpointingPlan: {
                provider: "livekit",
                waitFunction: "150 + 3000 * x",
            },
        },
        stopSpeakingPlan: {
            numWords: 6,
            voiceSeconds: 0.5,
            backoffSeconds: 0.5,
            acknowledgementPhrases: [
                "yeah",
                "uh-huh",
                "mm-hmm",
                "okay",
                "right",
                "sure",
                "got it",
            ],
            interruptionPhrases: ["STOP", "WAIT"],
        },
    },
};

/**
 * Get speech plan configuration for a given mode
 */
export function getSpeechPlan(mode: InterruptionMode): SpeechPlanConfig {
    return SPEECH_PLANS[mode];
}

/**
 * Map debate style to interruption mode
 */
export function getInterruptionModeForDebateStyle(
    style: string
): InterruptionMode {
    switch (style) {
        case "friendly":
            return "friendly";
        case "aggressive":
            return "aggressive";
        case "gish gallop":
            return "relentless";
        case "academic":
            return "debate";
        case "emotional":
            return "debate";
        case "socratic":
            return "friendly";
        default:
            return "debate"; // fallback to standard debate mode
    }
}
