import React from "react";
import { Mic, MicOff } from "lucide-react";

export interface SpeakingIndicatorsProps {
  /** Whether the user is currently speaking */
  isListening: boolean;
  /** Whether the AI is currently speaking */
  isSpeaking: boolean;
  /** Color configuration object */
  colors: {
    accent: string;
    cardBg: string;
    border: string;
    primaryLight: string;
    primary: string;
    textMuted: string;
  };
}

/**
 * Displays speaking status indicators for user and AI.
 *
 * Shows two cards side-by-side:
 * - "You" indicator with mic icon (active when user speaks)
 * - "AI" indicator with pulse animation (active when AI speaks)
 *
 * Provides visual feedback during voice debate sessions.
 */
export function SpeakingIndicators({
  isListening,
  isSpeaking,
  colors,
}: SpeakingIndicatorsProps) {
  return (
    <div className="flex gap-4 mb-8">
      {/* User Speaking Indicator */}
      <div
        className="flex items-center gap-2 rounded-xl px-5 py-3 border-2 transition-all"
        style={{
          backgroundColor: isListening ? `${colors.accent}40` : colors.cardBg,
          borderColor: isListening ? colors.primaryLight : colors.border,
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

      {/* AI Speaking Indicator */}
      <div
        className="flex items-center gap-2 rounded-xl px-5 py-3 border-2 transition-all"
        style={{
          backgroundColor: isSpeaking ? `${colors.accent}40` : colors.cardBg,
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
  );
}
