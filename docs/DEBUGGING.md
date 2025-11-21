# Debugging Guide: Empty Tables Issue

## Problem
After test debates, the `exchanges`, `techniques`, and `analyses` tables are empty.

## Architecture Changes Made

### ✅ Removed Function Calling
- **Before**: AI was calling `logTechnique()` function, causing it to say "Let's log your concessions"
- **After**: AI focuses ONLY on debating. Analysis happens separately via transcript webhooks.

### ✅ Analysis Flow (Correct Architecture)
```
User ↔ Vapi AI (Debater ONLY)
         ↓
    transcript webhook
         ↓
    Convex Backend
         ↓
    analyzeExchangePostHoc (OpenRouter)
         ↓
    Store techniques
         ↓
    Real-time UI updates
```

## Why Tables Might Be Empty

### 1. **Server URL Not Configured in Assistant Config**
Since we're using a **transient assistant** (passed directly in code), the server URL must be set in the assistant config object itself, NOT in the dashboard.

**Check:**
- `VITE_CONVEX_URL` environment variable is set
- Assistant config includes: `server: { url: "${CONVEX_URL}/vapi-webhook" }`
- The webhook URL should be: `https://your-deployment.convex.site/vapi-webhook`

**Note:** For transient assistants, Vapi automatically sends these events:
- ✅ `transcript` (sent automatically)
- ✅ `end-of-call-report` (sent automatically)
- ✅ `status-update` (sent automatically)

### 2. **Metadata Not Being Passed**
Check that `debateId` is in the metadata:
- In `debate.tsx`, we pass: `metadata: { debateId: newDebateId }`
- Check Convex logs for: `[transcript] No debateId in metadata`

### 3. **Webhook Not Receiving Events**
Check Convex logs for:
- `Vapi webhook: transcript` - Should appear for each exchange
- `[transcript] Storing: user - "..."` - Should show transcript being stored
- `[transcript] Successfully stored exchange` - Confirms storage worked

### 4. **Analysis Not Triggering**
Check Convex logs for:
- `[transcript] Scheduled analysis for debate {id}`
- `[analyzeExchangePostHoc] No exchanges found` - Means exchanges aren't stored yet
- `[analyzeExchangePostHoc] No valid exchange pair found` - Need both user and AI exchanges

## Debugging Steps

### Step 1: Check Server URL in Code
1. Verify `VITE_CONVEX_URL` is set in your `.env` file
2. Check that assistant config includes `server: { url: "..." }`
3. The URL should be: `https://your-deployment.convex.site/vapi-webhook`
4. Check browser console for: "Webhook URL: ..." log message

### Step 2: Check Convex Logs
1. Go to Convex Dashboard → Logs
2. Start a debate
3. Look for webhook events:
   ```
   Vapi webhook: transcript
   [transcript] Storing: user - "..."
   [transcript] Successfully stored exchange for debate {id}
   ```

### Step 3: Verify Metadata
In Convex logs, check if you see:
```
[transcript] No debateId in metadata: {...}
```
If you see this, metadata isn't being passed correctly.

### Step 4: Check Database Directly
1. Go to Convex Dashboard → Data
2. Check `debates` table - should have your debate
3. Check `exchanges` table - should have transcripts
4. Check `techniques` table - should have detected techniques

### Step 5: Test Webhook Manually
You can test the webhook endpoint manually:
```bash
curl -X POST https://your-convex-deployment.convex.site/vapi-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "message": {
      "type": "transcript",
      "role": "user",
      "transcript": "Test transcript",
      "call": {
        "metadata": {
          "debateId": "YOUR_DEBATE_ID"
        }
      }
    }
  }'
```

## Expected Flow

1. **User starts debate** → Creates debate record in `debates` table
2. **User speaks** → Vapi sends `transcript` webhook → Stores in `exchanges` table
3. **AI responds** → Vapi sends `transcript` webhook → Stores in `exchanges` table
4. **After 2 seconds** → `analyzeExchangePostHoc` runs → Detects techniques → Stores in `techniques` table
5. **Debate ends** → `end-of-call-report` webhook → Triggers `generateFullAnalysis` → Stores in `analyses` table

## Common Issues

### Issue: No webhook events in logs
**Solution**: Webhook URL not configured or incorrect in Vapi dashboard

### Issue: "No debateId in metadata"
**Solution**: Metadata not being passed. Check `vapiRef.current.start()` call includes metadata

### Issue: Exchanges stored but no techniques
**Solution**: 
- Check `OPENROUTER_API_KEY` is set in Convex environment
- Check `analyzeExchangePostHoc` logs for errors
- Check if OpenRouter API is responding

### Issue: Analysis page shows "No debate ID provided"
**Solution**: Make sure you're navigating with `?debateId=...` query parameter

## Viewing Analysis

After a debate ends:
1. Click "View Full Analysis" button (appears when debate ends)
2. Or navigate to `/dashboard/analysis?debateId=YOUR_DEBATE_ID`
3. Analysis page shows:
   - Summary
   - Techniques detected
   - Effectiveness scores
   - Improvement tips
   - Full transcript

## Next Steps

If tables are still empty after checking all above:
1. Check Convex environment variables (`OPENROUTER_API_KEY`)
2. Check Vapi webhook configuration
3. Check network tab in browser for webhook calls
4. Review Convex function logs for errors

