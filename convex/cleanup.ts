import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

// ============================================
// APPLICATION DATA CLEANUP
// ============================================

/**
 * Cleans up exchanges older than 90 days for completed debates.
 * Runs daily at 3 AM UTC.
 */
export const cleanupOldExchanges = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const ninetyDaysAgo = Date.now() - 90 * 24 * 60 * 60 * 1000;
    
    const oldDebates = await ctx.db
      .query("debates")
      .withIndex("by_user")
      .filter((q) => 
        q.and(
          q.eq(q.field("status"), "completed"),
          q.lt(q.field("completedAt"), ninetyDaysAgo)
        )
      )
      .collect();
    
    let deletedCount = 0;
    for (const debate of oldDebates) {
      const exchanges = await ctx.db
        .query("exchanges")
        .withIndex("by_debate", (q) => q.eq("debateId", debate._id))
        .collect();
      
      for (const exchange of exchanges) {
        await ctx.db.delete(exchange._id);
        deletedCount++;
      }
    }
    
    console.log(`[Cleanup] Deleted ${deletedCount} old exchanges from ${oldDebates.length} completed debates`);
    return null;
  },
});

/**
 * Marks debates as abandoned if they've been active for more than 24 hours.
 * Runs every hour.
 */
export const markAbandonedDebates = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    
    const staleDebates = await ctx.db
      .query("debates")
      .withIndex("by_user")
      .filter((q) => 
        q.and(
          q.eq(q.field("status"), "active"),
          q.lt(q.field("startedAt"), oneDayAgo)
        )
      )
      .collect();
    
    for (const debate of staleDebates) {
      await ctx.db.patch(debate._id, { status: "abandoned" });
    }
    
    console.log(`[Cleanup] Marked ${staleDebates.length} debates as abandoned`);
    return null;
  },
});

/**
 * Cleans up prep progress error records older than 7 days.
 * Runs daily at 4 AM UTC.
 */
export const cleanupPrepProgressErrors = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    
    const oldErrors = await ctx.db
      .query("prepProgress")
      .filter((q) => 
        q.and(
          q.eq(q.field("status"), "error"),
          q.lt(q.field("startedAt"), sevenDaysAgo)
        )
      )
      .collect();
    
    for (const record of oldErrors) {
      await ctx.db.delete(record._id);
    }
    
    console.log(`[Cleanup] Deleted ${oldErrors.length} old prep progress error records`);
    return null;
  },
});

/**
 * Keeps only the last 100 messages per opponent in prep chat.
 * Runs weekly on Sunday at 2 AM UTC.
 */
export const trimPrepChatHistory = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const allChats = await ctx.db.query("prepChat").collect();
    const opponentIds = [...new Set(allChats.map(chat => chat.opponentId))];
    
    let totalDeleted = 0;
    for (const opponentId of opponentIds) {
      const messages = await ctx.db
        .query("prepChat")
        .withIndex("by_opponent", (q) => q.eq("opponentId", opponentId))
        .order("desc")
        .collect();
      
      // Keep first 100, delete the rest
      const toDelete = messages.slice(100);
      for (const message of toDelete) {
        await ctx.db.delete(message._id);
        totalDeleted++;
      }
    }
    
    console.log(`[Cleanup] Trimmed ${totalDeleted} old prep chat messages across ${opponentIds.length} opponents`);
    return null;
  },
});

// ============================================
// AUTH TABLES CLEANUP
// ============================================

/**
 * Cleans up expired sessions from authSessions table.
 * Sessions expire after 30 days by default.
 * Runs daily at 5 AM UTC.
 */
export const cleanupExpiredSessions = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const now = Date.now();
    
    const expiredSessions = await ctx.db
      .query("authSessions")
      .filter((q) => q.lt(q.field("expirationTime"), now))
      .collect();
    
    for (const session of expiredSessions) {
      await ctx.db.delete(session._id);
    }
    
    console.log(`[Auth Cleanup] Deleted ${expiredSessions.length} expired sessions`);
    return null;
  },
});

/**
 * Cleans up expired verification codes (OTP, magic links).
 * App uses 20-minute expiration, but clean after expiration time passes.
 * Runs every 6 hours.
 */
export const cleanupExpiredVerificationCodes = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const now = Date.now();
    
    const expiredCodes = await ctx.db
      .query("authVerificationCodes")
      .filter((q) => q.lt(q.field("expirationTime"), now))
      .collect();
    
    for (const code of expiredCodes) {
      await ctx.db.delete(code._id);
    }
    
    console.log(`[Auth Cleanup] Deleted ${expiredCodes.length} expired verification codes`);
    return null;
  },
});

/**
 * Cleans up expired refresh tokens from authRefreshTokens table.
 * Refresh tokens expire after 30 days by default.
 * Runs daily at 6 AM UTC.
 */
export const cleanupExpiredRefreshTokens = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const now = Date.now();
    
    const expiredTokens = await ctx.db
      .query("authRefreshTokens")
      .filter((q) => q.lt(q.field("expirationTime"), now))
      .collect();
    
    for (const token of expiredTokens) {
      await ctx.db.delete(token._id);
    }
    
    console.log(`[Auth Cleanup] Deleted ${expiredTokens.length} expired refresh tokens`);
    return null;
  },
});

/**
 * Cleans up old OAuth PKCE verifiers from authVerifiers table.
 * OAuth flows should complete within minutes, so clean after 24 hours.
 * Runs every 12 hours.
 */
export const cleanupOldOAuthVerifiers = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    
    const oldVerifiers = await ctx.db
      .query("authVerifiers")
      .filter((q) => q.lt(q.field("_creationTime"), oneDayAgo))
      .collect();
    
    for (const verifier of oldVerifiers) {
      await ctx.db.delete(verifier._id);
    }
    
    console.log(`[Auth Cleanup] Deleted ${oldVerifiers.length} old OAuth verifiers`);
    return null;
  },
});

/**
 * Cleans up old rate limit records from authRateLimits table.
 * Rate limits reset after 1 hour, so clean records older than 7 days.
 * Runs daily at 7 AM UTC.
 */
export const cleanupOldRateLimits = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    
    const oldRateLimits = await ctx.db
      .query("authRateLimits")
      .filter((q) => q.lt(q.field("lastAttemptTime"), sevenDaysAgo))
      .collect();
    
    for (const rateLimit of oldRateLimits) {
      await ctx.db.delete(rateLimit._id);
    }
    
    console.log(`[Auth Cleanup] Deleted ${oldRateLimits.length} old rate limit records`);
    return null;
  },
});

