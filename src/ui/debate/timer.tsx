import React from "react";

export interface TimerProps {
  /** Elapsed time in seconds */
  seconds: number;
  /** Color configuration object */
  colors: {
    primary: string;
  };
}

/**
 * Formats seconds into MM:SS display format
 */
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Displays debate session timer in large, prominent format.
 *
 * Shows elapsed time in MM:SS format during practice sessions.
 */
export function Timer({ seconds, colors }: TimerProps) {
  return (
    <div
      className="text-5xl font-bold mb-8"
      style={{ color: colors.primary }}
    >
      {formatTime(seconds)}
    </div>
  );
}
