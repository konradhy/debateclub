import { useEffect, useState } from "react";

// Color constants matching main analysis page
const colors = {
  primary: "#3C4A32",
  accent: "#A8B08C",
  border: "#E8E4DA",
};

/**
 * Fake progress bar that animates from 0% to 90% over 110 seconds.
 * Used to show perceived progress while full analysis generates in background.
 * Never reaches 100% on its own - replaced by full analysis view when complete.
 */
export function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate from 0% to 90% over 110 seconds
    const duration = 110000; // 110 seconds
    const interval = 100; // Update every 100ms
    const increment = (90 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        return next >= 90 ? 90 : next; // Cap at 90%
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full">
      {/* Background track */}
      <div
        className="h-3 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: colors.border }}
      >
        {/* Progress fill with gradient */}
        <div
          className="h-full rounded-full transition-all duration-200 ease-out relative overflow-hidden"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
          }}
        >
          {/* Animated shimmer effect */}
          <div
            className="absolute inset-0 animate-shimmer"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              backgroundSize: "200% 100%",
            }}
          />
        </div>
      </div>

      {/* Progress percentage */}
      <div className="mt-2 text-right">
        <span
          className="text-xs font-medium"
          style={{ color: colors.primary }}
        >
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
