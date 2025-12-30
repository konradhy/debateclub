import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { colors } from "@/lib/prep-colors";

export function PrepHeader() {
  return (
    <header
      className="sticky top-0 z-50 border-b py-4"
      style={{ backgroundColor: colors.headerBg, borderColor: colors.border }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: colors.textMuted }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
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
  );
}
