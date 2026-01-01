# Endpointing & Interruption: How It Actually Works

**Date**: January 1, 2026  
**Purpose**: Clarify endpointing, interruption mechanics, and what the numbers actually mean

---

## The Confusion

You're right to be confused! The current code mixes up several concepts:

1. **Endpointing** - When does Vapi think the user is "done speaking"?
2. **Interruption** - Can the AI cut in while the user is talking?
3. **`interruptionThreshold`** - A field we defined that **doesn't actually do anything**

Let's break this down properly.

---

## What is Endpointing?

**Endpointing** = Detecting when someone has finished speaking (not just paused)

### The Problem:
When you're speaking, you naturally pause:
- "I think... [pause] ...we should act now"
- "The evidence shows... [pause] ...three key points"

**Bad endpointing**: Treats every pause as "done speaking" → AI jumps in too early
**Good endpointing**: Understands natural speech rhythm → AI waits for actual completion

### Vapi's Endpointing

Vapi uses a **proprietary audio-text fusion model** that analyzes:
- Tone and inflection (is voice rising or falling?)
- Context of what's being said (mid-sentence vs complete thought?)
- Natural speech patterns (breath pauses vs thinking pauses)

This is **NOT** a simple silence timer. It's an AI model predicting "are they done?"

---

## The `endpointing` Configuration

In your code:
```typescript
transcriber: {
  provider: "deepgram",
  model: "nova-2",
  endpointing: 300  // ← This is in MILLISECONDS
}
```

### What This Number Means:

**`endpointing: 300`** = "After 300ms of silence, consider the speech complete"

This is a **minimum silence threshold** that works WITH Vapi's smart endpointing:
- **Lower (200-300ms)**: More aggressive, responds faster, might cut off mid-thought
- **Higher (500-1000ms)**: More conservative, waits longer, less likely to interrupt

### Your Current Logic:

```typescript
endpointing: scenario.assistant.canInterrupt !== false ? 300 : 500
```

Translation:
- **If interruption allowed**: 300ms silence = "user is done" (quick response)
- **If interruption disabled**: 500ms silence = "user is done" (wait longer)

---

## What is Interruption?

**Interruption** = The AI starts speaking WHILE the user is still talking

This is different from endpointing! Endpointing is about detecting completion. Interruption is about cutting in mid-speech.

### Two Types of Interruption:

#### 1. User Interrupts AI (Barge-in)
User starts talking while AI is speaking → AI stops immediately

**This is always enabled in Vapi.** Users can always interrupt the AI.

#### 2. AI Interrupts User
AI starts speaking while user is still talking → User gets cut off

**This is what `canInterrupt` controls.**

---

## How Vapi Handles AI Interrupting User

### The `clientMessages` Array

```typescript
clientMessages: [
  "transcript",
  "hang",
  "function-call",
  "speech-update",      // ← Required for interruption
  "metadata",
  "conversation-update",
]
```

**`speech-update`** = Real-time updates about who's speaking

Without this, Vapi doesn't send live speech status → AI can't interrupt

### The Actual Interruption Mechanism

When `speech-update` is enabled:
1. User starts speaking
2. Vapi sends `speech-update` event: `{ status: "started" }`
3. AI can decide to start speaking anyway (interruption)
4. Vapi sends `speech-update` event: `{ status: "stopped" }`

**But here's the key**: The LLM doesn't control interruption timing. Vapi does.

---

## What `interruptionThreshold` Was Supposed To Do

In your code, you have:
```typescript
canInterrupt: true,
interruptionThreshold: 100,  // ← This does NOTHING
```

### The Intent:
Probably meant to control "how aggressive" the interruption is:
- `100` = Very aggressive (interrupt after 100ms of user speaking?)
- `200` = Moderate
- `500` = Polite

### The Reality:
**This field is never passed to Vapi.** It's defined in your scenario configs but not used anywhere.

---

## What Actually Controls Interruption Behavior?

### 1. Technical: `endpointing` Value

```typescript
endpointing: 300  // Lower = more aggressive
```

This affects how quickly Vapi thinks the user is "done" → More chances to respond

### 2. Behavioral: System Prompt

```
BEHAVIORAL RULES:
- Interrupt when you sense weakness in their argument
- Challenge them directly
```

This tells the LLM **when to try to speak**, but Vapi still controls **whether it can**.

### 3. Vapi's Smart Endpointing

Vapi has additional configuration (not in your code):

```typescript
startSpeakingPlan: {
  smartEndpointingEnabled: true,
  smartEndpointingConfig: {
    provider: "livekit",
    waitSeconds: 0.4  // How long to wait before responding
  }
}
```

**This is the real interruption control**, but you're not setting it explicitly.

---

## The Truth About "No Interruption Mode"

### Current Implementation:

```typescript
canInterrupt: false
endpointing: 500  // Wait 500ms of silence
```

**What this actually does:**
- Waits longer before considering user "done"
- Still allows AI to respond when user finishes
- Doesn't prevent interruption, just makes it less likely

### True "No Interruption Mode":

To truly disable AI interruption, you'd need:

```typescript
startSpeakingPlan: {
  waitSeconds: 2.0,  // Wait 2 full seconds after user stops
  smartEndpointingEnabled: false  // Disable smart detection
}
```

**You're not setting this**, so Vapi uses defaults.

---

## What "Polite" Actually Means

You asked: "Would polite be like 5 seconds not 300ms?"

### The Confusion:

**300ms is NOT how long the AI waits to respond.**

300ms is the **silence threshold** for detecting "user is done speaking."

### What "Polite" Should Mean:

**Polite Mode** = AI waits longer after user finishes before responding

```typescript
// Aggressive (current debate mode)
endpointing: 300,  // Detect completion quickly
waitSeconds: 0.4,  // Respond almost immediately

// Polite (what you probably want)
endpointing: 800,  // Wait longer to confirm they're done
waitSeconds: 1.5,  // Give them time to continue
```

**5 seconds would be awkwardly long** - like the AI isn't listening.

Realistic timing:
- **Aggressive**: 0.4-0.6 seconds after user stops
- **Normal**: 0.8-1.0 seconds after user stops
- **Polite**: 1.5-2.0 seconds after user stops

---

## The Real Interruption Flow

```
User speaking: "I think we should..."
    ↓
[300ms silence detected]
    ↓
Vapi's endpointing model: "Are they done?"
    ↓
[Model says: "Probably done"]
    ↓
Vapi waits `waitSeconds` (default ~0.4s)
    ↓
[User hasn't resumed speaking]
    ↓
AI starts generating response
    ↓
AI speaks (user can interrupt back)
```

**Key insight**: There are TWO wait periods:
1. **Endpointing wait** (300ms) - Detecting silence
2. **Response wait** (`waitSeconds`) - Confirming they're done

---

## What You Should Actually Configure

### For Debate (Aggressive):
```typescript
transcriber: {
  endpointing: 300,  // Quick silence detection
}
startSpeakingPlan: {
  waitSeconds: 0.4,  // Respond quickly
}
```

### For Sales/Customer Discovery (Polite):
```typescript
transcriber: {
  endpointing: 800,  // Wait longer to confirm done
}
startSpeakingPlan: {
  waitSeconds: 1.5,  // Give them time to continue
}
```

### For "No Interruption" Mode:
```typescript
transcriber: {
  endpointing: 1000,  // Very conservative
}
startSpeakingPlan: {
  waitSeconds: 2.0,  // Long pause before responding
  smartEndpointingEnabled: false,  // Disable smart detection
}
```

---

## Why Your Current Code is Confused

### Problem 1: `interruptionThreshold` Does Nothing
```typescript
interruptionThreshold: 100,  // ← Not passed to Vapi
```

**Fix**: Remove this field entirely.

### Problem 2: Only Controlling `endpointing`
```typescript
endpointing: canInterrupt ? 300 : 500
```

**This only affects silence detection, not actual interruption behavior.**

**Fix**: Also control `waitSeconds` in `startSpeakingPlan`.

### Problem 3: Conflating Concepts
- **Endpointing** = Detecting when user is done
- **Interruption** = AI speaking while user is speaking
- **Response timing** = How long to wait before responding

**These are three different things!**

---

## Recommended Cleanup

### Step 1: Remove Dead Code
- Delete `interruptionThreshold` from all scenario configs
- Delete from type definitions

### Step 2: Add Real Interruption Control
```typescript
// In debate.tsx, add to assistant config:
startSpeakingPlan: {
  waitSeconds: scenario.assistant.canInterrupt ? 0.4 : 1.5,
  smartEndpointingEnabled: scenario.assistant.canInterrupt !== false,
}
```

### Step 3: Rename for Clarity
```typescript
// Instead of:
canInterrupt: boolean

// Consider:
responseMode: "aggressive" | "normal" | "polite"
```

Then map to actual Vapi settings:
```typescript
const RESPONSE_MODES = {
  aggressive: { endpointing: 300, waitSeconds: 0.4 },
  normal: { endpointing: 500, waitSeconds: 0.8 },
  polite: { endpointing: 800, waitSeconds: 1.5 },
};
```

---

## Summary: What Actually Matters

### For Interruption Behavior:

1. **`endpointing`** (300-1000ms) - How long to wait for silence
2. **`waitSeconds`** (0.4-2.0s) - How long to wait before responding
3. **`smartEndpointingEnabled`** (true/false) - Use Vapi's smart detection
4. **System prompt** - Tells LLM when to try to speak

### What Doesn't Matter:

- ❌ `interruptionThreshold` - Not used anywhere
- ❌ `clientMessages` array - Just enables features, doesn't control timing
- ❌ Comments like "Less aggressive than debate" - Meaningless without actual config

---

## Next Steps for Phase 7.1

1. **Remove `interruptionThreshold`** - It's dead code
2. **Add `startSpeakingPlan` configuration** - This is the real control
3. **Define clear modes**: Aggressive, Normal, Polite
4. **Test actual timing** - Measure real-world behavior
5. **Add user control** - Let users choose their preference

---

## Testing Interruption

To actually test if interruption works:

1. **Start a debate**
2. **Let AI start speaking**
3. **Start talking mid-sentence**
4. **Does AI stop immediately?** → User interruption works (always enabled)
5. **Let user speak for 2+ seconds**
6. **Does AI cut in?** → AI interruption works (if `canInterrupt: true`)

**Current behavior**: AI probably doesn't interrupt much because you're not setting `startSpeakingPlan`.

---

This should clarify the confusion! The key insight: **endpointing is about detecting completion, not controlling interruption timing.**
