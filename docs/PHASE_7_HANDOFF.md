# Phase 7.1 - Interruption System Rebuild

**Status**: Ready to implement  
**Estimated Time**: 2-3 hours  
**Risk**: Low (removing dead code, adding proper config)

---

## What's Wrong Now

The current interruption system is a mess:
- Uses `canInterrupt` and `interruptionThreshold` fields that don't actually do anything
- Has `endpointing: 300` in the code but that's not a real Vapi field
- System prompts say "interrupt after 45 seconds" but nothing enforces it
- No user control over interruption behavior

**Bottom line**: The code pretends to control interruption but doesn't actually work.

---

## What We're Building

**5 clear interruption modes** that actually use Vapi's real API:

| Mode | Feel | When AI Responds | How Hard to Interrupt AI |
|------|------|------------------|--------------------------|
| Off | Patient listener | 2.5s after you stop | Easy (2 words) |
| Friendly | Supportive | 1.2s after you stop | Easy (2 words) |
| Debate | Real debate | 0.6s after you stop | Easy (2 words) |
| Aggressive | Confrontational | 0.4s after you stop | Hard (4 words) |
| Relentless | Won't shut up | 0.3s after you stop | Very hard (6 words) |

**How it works**: Vapi's `startSpeakingPlan` controls response speed, `stopSpeakingPlan` controls interruption difficulty.

---

## The Plan

### Step 1: Strip Out Dead Code (30 min)

**Remove these fields from everywhere:**
- `canInterrupt` (8 files)
- `interruptionThreshold` (6 files)
- `endpointing` logic in debate.tsx (1 file)

**Files to modify:**
- `src/scenarios/types.ts` - Remove from interface
- `convex/scenarios/types.ts` - Remove from interface
- All scenario configs (debate, sales, entrepreneur) - Remove from assistant config
- `src/routes/_app/_auth/dashboard/debate.tsx` - Remove endpointing logic
- `src/lib/debate/style-instructions.ts` - Remove "interrupt when" language

**See `docs/INTERRUPTION_MODES_PLAN.md` for exact line numbers.**

---

### Step 2: Add New Speech Plans (1 hour)

**Create new file: `src/lib/vapi/speechPlans.ts`**

This file defines the 5 modes with proper Vapi config:
```typescript
export const SPEECH_PLANS = {
  off: { waitSeconds: 2.5, numWords: 2, ... },
  friendly: { waitSeconds: 1.2, numWords: 2, ... },
  debate: { waitSeconds: 0.6, numWords: 2, ... },
  aggressive: { waitSeconds: 0.4, numWords: 4, ... },
  relentless: { waitSeconds: 0.3, numWords: 6, ... },
};
```

**Full code is in `docs/INTERRUPTION_MODES_PLAN.md` Step 2.1**

---

### Step 3: Wire It Up (1 hour)

**Add to scenario configs:**
```typescript
export const DebateScenario = {
  // ... existing config
  defaultInterruptionMode: "debate",  // ← Add this
};
```

**Map scenarios to modes:**
- Debate → "debate"
- Sales Cold Prospect → "off"
- Sales Demo → "friendly"
- Sales Negotiation → "aggressive"
- Entrepreneur Pitch → "aggressive"
- Entrepreneur Early Sales → "friendly"
- Customer Discovery → "off"

**Apply in debate.tsx:**
```typescript
import { getSpeechPlan } from "@/lib/vapi/speechPlans";

const speechPlan = getSpeechPlan(scenario.defaultInterruptionMode);

const assistantConfig = {
  // ... existing config
  startSpeakingPlan: speechPlan.startSpeakingPlan,
  stopSpeakingPlan: speechPlan.stopSpeakingPlan,
};
```

---

### Step 4: Test (30 min)

**Test each mode:**
1. Start debate with "debate" mode
2. Pause mid-sentence - AI should respond in ~0.6s
3. Try to interrupt AI with "wait" - should work (2 words)
4. Switch to "relentless" mode
5. Try to interrupt - should need 6+ words

**Expected behavior:**
- Off: AI waits 2.5s, easy to interrupt
- Friendly: AI waits 1.2s, easy to interrupt
- Debate: AI waits 0.6s, easy to interrupt
- Aggressive: AI waits 0.4s, hard to interrupt (4 words)
- Relentless: AI waits 0.3s, very hard to interrupt (6 words)

---

## Key Files

**Read these:**
- `docs/INTERRUPTION_MODES_PLAN.md` - Complete implementation guide
- `docs/VAPI_SPEECH_CONFIG_OFFICIAL.md` - Official Vapi docs (reference)

**Ignore these:**
- All other interruption docs (working documents, outdated)

---

## What Success Looks Like

**Before:**
- Code has `canInterrupt: true` but doesn't do anything
- No way to control interruption behavior
- Confusing mix of unused fields

**After:**
- Clean code with proper Vapi config
- 5 clear modes users can understand
- Each scenario has appropriate default
- Actually works as expected

---

## Gotchas

1. **Don't use `endpointing` field** - It's not in Vapi's API
2. **AI can't interrupt you mid-sentence** - It only responds quickly after pauses
3. **`numWords` is how many words YOU need to interrupt AI** - Not the other way around
4. **Test with actual voice** - The timing feels different than you expect

---

## Optional: User Control (Phase 7.2)

After this works, you can add:
- User preference: "I prefer aggressive mode for all debates"
- Per-opponent override: "Make this opponent relentless"
- Quick toggle during practice: "Make AI more/less aggressive"

**But get the basics working first.**

---

## Questions?

Read `docs/INTERRUPTION_MODES_PLAN.md` - it has step-by-step instructions with exact line numbers and code blocks.

The official Vapi docs are at: https://docs.vapi.ai/customization/speech-configuration
