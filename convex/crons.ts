import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// ============================================
// APPLICATION DATA CLEANUP
// ============================================

// Clean up old exchanges from completed debates (daily at 3 AM UTC)
crons.cron(
  "cleanup old exchanges",
  "0 3 * * *",
  internal.cleanup.cleanupOldExchanges,
  {}
);

// Mark abandoned debates (every hour)
crons.interval(
  "mark abandoned debates",
  { hours: 1 },
  internal.cleanup.markAbandonedDebates,
  {}
);

// Clean up old prep progress errors (daily at 4 AM UTC)
crons.cron(
  "cleanup prep progress errors",
  "0 4 * * *",
  internal.cleanup.cleanupPrepProgressErrors,
  {}
);

// Trim prep chat history (weekly on Sunday at 2 AM UTC)
crons.cron(
  "trim prep chat history",
  "0 2 * * 0",
  internal.cleanup.trimPrepChatHistory,
  {}
);

// ============================================
// AUTH TABLES CLEANUP
// ============================================

// Clean up expired sessions (daily at 5 AM UTC)
crons.cron(
  "cleanup expired sessions",
  "0 5 * * *",
  internal.cleanup.cleanupExpiredSessions,
  {}
);

// Clean up expired verification codes (every 6 hours)
crons.interval(
  "cleanup expired verification codes",
  { hours: 6 },
  internal.cleanup.cleanupExpiredVerificationCodes,
  {}
);

// Clean up expired refresh tokens (daily at 6 AM UTC)
crons.cron(
  "cleanup expired refresh tokens",
  "0 6 * * *",
  internal.cleanup.cleanupExpiredRefreshTokens,
  {}
);

// Clean up old OAuth verifiers (every 12 hours)
crons.interval(
  "cleanup old oauth verifiers",
  { hours: 12 },
  internal.cleanup.cleanupOldOAuthVerifiers,
  {}
);

// Clean up old rate limits (daily at 7 AM UTC)
crons.cron(
  "cleanup old rate limits",
  "0 7 * * *",
  internal.cleanup.cleanupOldRateLimits,
  {}
);

export default crons;

