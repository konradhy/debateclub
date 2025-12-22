# Cron Jobs Documentation

This document describes all automated cleanup jobs running in the OratorPrep application.

## Overview

The application uses Convex's built-in cron job system to automatically clean up stale and expired data. There are 9 cleanup jobs total:
- 4 for application data
- 5 for authentication tables

## Cron Job Schedule

| Job Name | Frequency | Time (UTC) | Target Table | Retention Policy |
|----------|-----------|------------|--------------|------------------|
| cleanup old exchanges | Daily | 3:00 AM | `exchanges` | 90 days after debate completion |
| mark abandoned debates | Hourly | - | `debates` | Mark as abandoned after 24 hours |
| cleanup prep progress errors | Daily | 4:00 AM | `prepProgress` | 7 days for error records |
| trim prep chat history | Weekly | Sun 2:00 AM | `prepChat` | Keep last 100 messages per opponent |
| cleanup expired sessions | Daily | 5:00 AM | `authSessions` | After expiration time (30 days) |
| cleanup expired verification codes | Every 6 hours | - | `authVerificationCodes` | After expiration time (20 min) |
| cleanup expired refresh tokens | Daily | 6:00 AM | `authRefreshTokens` | After expiration time (30 days) |
| cleanup old oauth verifiers | Every 12 hours | - | `authVerifiers` | 24 hours after creation |
| cleanup old rate limits | Daily | 7:00 AM | `authRateLimits` | 7 days after last attempt |

## Application Data Cleanup

### 1. Old Exchanges Cleanup
**Function**: `internal.cleanup.cleanupOldExchanges`  
**Schedule**: Daily at 3:00 AM UTC  
**Purpose**: Deletes debate exchanges from debates completed more than 90 days ago  
**Rationale**: Prevents unbounded growth while preserving recent history

### 2. Abandoned Debates
**Function**: `internal.cleanup.markAbandonedDebates`  
**Schedule**: Every hour  
**Purpose**: Marks debates stuck in "active" status for more than 24 hours as "abandoned"  
**Rationale**: Cleans up UI and prevents confusion from stale active debates

### 3. Prep Progress Errors
**Function**: `internal.cleanup.cleanupPrepProgressErrors`  
**Schedule**: Daily at 4:00 AM UTC  
**Purpose**: Deletes prep progress records in "error" state older than 7 days  
**Rationale**: Keeps recent errors for debugging while preventing accumulation

### 4. Prep Chat History
**Function**: `internal.cleanup.trimPrepChatHistory`  
**Schedule**: Weekly on Sunday at 2:00 AM UTC  
**Purpose**: Keeps only the last 100 messages per opponent profile  
**Rationale**: Maintains reasonable context window while preventing chat log bloat

## Auth Tables Cleanup

### 5. Expired Sessions
**Function**: `internal.cleanup.cleanupExpiredSessions`  
**Schedule**: Daily at 5:00 AM UTC  
**Purpose**: Deletes sessions past their expiration time from `authSessions`  
**Rationale**: Security hygiene - removes expired sessions (default 30-day duration)

### 6. Expired Verification Codes
**Function**: `internal.cleanup.cleanupExpiredVerificationCodes`  
**Schedule**: Every 6 hours  
**Purpose**: Deletes expired OTP and magic link codes from `authVerificationCodes`  
**Rationale**: Security - removes codes after 20-minute expiration

### 7. Expired Refresh Tokens
**Function**: `internal.cleanup.cleanupExpiredRefreshTokens`  
**Schedule**: Daily at 6:00 AM UTC  
**Purpose**: Deletes expired refresh tokens from `authRefreshTokens`  
**Rationale**: Prevents token table bloat (default 30-day duration)

### 8. Old OAuth Verifiers
**Function**: `internal.cleanup.cleanupOldOAuthVerifiers`  
**Schedule**: Every 12 hours  
**Purpose**: Deletes PKCE verifiers older than 24 hours from `authVerifiers`  
**Rationale**: OAuth flows complete in minutes; 24-hour retention is generous

### 9. Old Rate Limits
**Function**: `internal.cleanup.cleanupOldRateLimits`  
**Schedule**: Daily at 7:00 AM UTC  
**Purpose**: Deletes rate limit records older than 7 days from `authRateLimits`  
**Rationale**: Rate limits reset after 1 hour; 7-day retention for analysis

## Monitoring

### Convex Dashboard
All cron jobs are visible in the Convex Dashboard:
1. Navigate to your project dashboard
2. Click "Cron Jobs" in the sidebar
3. View execution history and logs

### Log Messages
Each cleanup job logs its results:
```
[Cleanup] Deleted X old exchanges from Y completed debates
[Cleanup] Marked X debates as abandoned
[Cleanup] Deleted X old prep progress error records
[Cleanup] Trimmed X old prep chat messages across Y opponents
[Auth Cleanup] Deleted X expired sessions
[Auth Cleanup] Deleted X expired verification codes
[Auth Cleanup] Deleted X expired refresh tokens
[Auth Cleanup] Deleted X old OAuth verifiers
[Auth Cleanup] Deleted X old rate limit records
```

### Checking Logs
1. Open Convex Dashboard
2. Navigate to "Logs" view
3. Filter by function name (e.g., `cleanup:cleanupOldExchanges`)
4. Review execution results and any errors

## Implementation Details

### Files
- `convex/crons.ts` - Cron job definitions
- `convex/cleanup.ts` - Cleanup function implementations

### Cron Syntax
The jobs use two scheduling methods:

**Interval-based** (for frequent jobs):
```typescript
crons.interval("job name", { hours: 6 }, internal.cleanup.functionName, {});
```

**Cron syntax** (for specific times):
```typescript
crons.cron("job name", "0 3 * * *", internal.cleanup.functionName, {});
```

Cron syntax format: `minute hour day month dayOfWeek`
- `0 3 * * *` = 3:00 AM every day
- `0 2 * * 0` = 2:00 AM every Sunday

### Query Optimization
All cleanup functions use database indexes for efficient queries:
- `debates` queries use `by_user` index
- `exchanges` queries use `by_debate` index
- `prepProgress` queries scan with status filter
- `prepChat` queries use `by_opponent` index
- Auth table queries use built-in indexes

## Troubleshooting

### Job Not Running
1. Check Convex Dashboard for deployment errors
2. Verify cron job is listed in dashboard
3. Check function exists in `convex/cleanup.ts`
4. Review logs for error messages

### Job Timing Out
If a cleanup job times out due to large dataset:
1. Consider adding pagination
2. Batch deletes into smaller chunks
3. Increase frequency to process smaller datasets

### Unexpected Deletions
All deletions are logged with counts. Review logs to verify:
1. Correct retention policy is applied
2. Filters are working as expected
3. No unintended data loss

## Security Considerations

### Auth Table Cleanup
According to [Convex Auth documentation](https://labs.convex.dev/auth/security):
> "In case of a security breach, you can delete all existing sessions by clearing the authSessions table"

Regular cleanup of auth tables is critical for:
- Removing expired sessions that could be exploited
- Cleaning up verification codes after use
- Preventing token table bloat
- Maintaining rate limit accuracy

### Manual Emergency Cleanup
If needed, you can manually clean auth tables:

```typescript
// In Convex Dashboard Functions tab
// Delete all sessions (forces re-login)
const sessions = await ctx.db.query("authSessions").collect();
for (const session of sessions) {
  await ctx.db.delete(session._id);
}
```

## Future Enhancements

Potential improvements to consider:
1. **Metrics Dashboard** - Track cleanup counts over time
2. **Alerting** - Notify on cleanup failures or unusual patterns
3. **Manual Triggers** - Admin UI to manually trigger cleanup
4. **Dry Run Mode** - Test cleanup without deleting
5. **Configurable Retention** - Per-user or per-tier retention policies
6. **User Notifications** - Warn users before deleting old data
7. **Backup Before Delete** - Archive to cold storage before cleanup

## References

- [Convex Cron Jobs Documentation](https://docs.convex.dev/scheduling/cron-jobs)
- [Convex Auth Documentation](https://labs.convex.dev/auth)
- [Convex Auth Security](https://labs.convex.dev/auth/security)
- [Crontab Guru](https://crontab.guru/) - Cron syntax helper

