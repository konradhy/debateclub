# Where to Find Vapi Documentation

**Date**: January 1, 2026  
**Purpose**: Guide to finding specific Vapi documentation

---

## Main Documentation Sites

### 1. **Speech Configuration Guide** ⭐ MOST IMPORTANT
**URL**: https://docs.vapi.ai/customization/speech-configuration

**What's there:**
- Complete explanation of `startSpeakingPlan` and `stopSpeakingPlan`
- How smart endpointing works (LiveKit, Vapi, Krisp, Deepgram Flux, Assembly)
- Practical examples for different scenarios
- **This is the page you need for interruption control**

### 2. **Vapi Docs Homepage**
**URL**: https://docs.vapi.ai

**What's there:**
- Getting started guides
- Quickstart tutorials
- Conceptual overviews

### 3. **API Reference**
**URL**: https://docs.vapi.ai/api-reference

**What's there:**
- Complete API schema
- All configuration options
- Request/response examples

---

## Key Documentation Pages for Interruption

### 1. **startSpeakingPlan** (When AI Starts Speaking)

**Found in API Reference** under assistant configuration:

```json
"startSpeakingPlan": {
  "waitSeconds": 0.4,  // ← How long to wait after user stops
  "smartEndpointingPlan": {
    "provider": "vapi"  // ← Use Vapi's smart endpointing
  },
  "smartEndpointingEnabled": false,  // ← Disable smart detection
  "transcriptionEndpointingPlan": {
    "onPunctuationSeconds": 0.1,     // ← Wait after punctuation
    "onNoPunctuationSeconds": 1.5,   // ← Wait without punctuation
    "onNumberSeconds": 0.5           // ← Wait after numbers
  }
}
```

**Key fields:**
- **`waitSeconds`**: How long to wait after detecting user is done (0.4 = aggressive, 1.5 = polite)
- **`smartEndpointingEnabled`**: Use Vapi's AI model for natural completion detection
- **`smartEndpointingPlan.provider`**: Which provider's endpointing to use ("vapi", "livekit")

---

### 2. **stopSpeakingPlan** (When AI Stops Speaking)

**Found in API Reference** under assistant configuration:

```json
"stopSpeakingPlan": {
  "numWords": 0,           // ← Interrupt after N words
  "voiceSeconds": 0.2,     // ← How long user must speak to interrupt
  "backoffSeconds": 1,     // ← Block AI audio after interrupt
  "acknowledgementPhrases": [
    "yeah", "uh-huh", "right", "okay", "mm-hmm"
  ],
  "interruptionPhrases": [
    "stop", "wait", "hold", "but", "actually"
  ]
}
```

**Key fields:**
- **`numWords`**: Minimum words user must say to interrupt (0 = any speech)
- **`voiceSeconds`**: How long user must speak to trigger interrupt (0.2 = quick)
- **`backoffSeconds`**: How long to block AI audio after interrupt
- **`acknowledgementPhrases`**: Don't interrupt on these (backchanneling)
- **`interruptionPhrases`**: Always interrupt on these

---

### 3. **transcriber** (Speech-to-Text Configuration)

**Found in API Reference** under assistant configuration:

```json
"transcriber": {
  "provider": "deepgram",
  "model": "nova-2",
  "language": "en",
  "endUtteranceSilenceThreshold": 1.1,  // ← Silence threshold in seconds
  "vadAssistedEndpointingEnabled": true  // ← Voice Activity Detection
}
```

**Key fields:**
- **`endUtteranceSilenceThreshold`**: How long to wait for silence (in seconds!)
- **`vadAssistedEndpointingEnabled`**: Use Voice Activity Detection for better endpointing

**Note**: Different transcribers have different endpointing fields:
- **Deepgram**: `endUtteranceSilenceThreshold` (seconds)
- **AssemblyAI**: `endOfTurnConfidenceThreshold`, `minEndOfTurnSilenceWhenConfident` (milliseconds)

---

## What You're Currently Using vs What's Available

### Your Current Code:

```typescript
transcriber: {
  provider: "deepgram",
  model: "nova-2",
  language: "en-US",
  smartFormat: true,
  endpointing: 300  // ← This is NOT a standard Deepgram field!
}
```

**Problem**: `endpointing: 300` is not in Vapi's API reference for Deepgram transcriber.

### What You Should Use:

```typescript
transcriber: {
  provider: "deepgram",
  model: "nova-2",
  language: "en-US",
  smartFormat: true,
  endUtteranceSilenceThreshold: 0.3  // ← 0.3 seconds = 300ms
}
```

**OR** use Vapi's `startSpeakingPlan`:

```typescript
transcriber: {
  provider: "deepgram",
  model: "nova-2",
  language: "en-US",
  smartFormat: true
},
startSpeakingPlan: {
  waitSeconds: 0.4,  // ← This is the real control
  smartEndpointingEnabled: true
}
```

---

## Complete Interruption Configuration Example

### Aggressive (Debate Mode):

```typescript
{
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en-US",
    smartFormat: true,
    endUtteranceSilenceThreshold: 0.3  // 300ms silence
  },
  startSpeakingPlan: {
    waitSeconds: 0.4,  // Respond quickly
    smartEndpointingEnabled: true,
    smartEndpointingPlan: {
      provider: "vapi"  // Use Vapi's smart detection
    }
  },
  stopSpeakingPlan: {
    numWords: 2,  // Interrupt after 2 words
    voiceSeconds: 0.2,  // Quick detection
    backoffSeconds: 0.5,  // Short backoff
    acknowledgementPhrases: ["yeah", "uh-huh", "right"],
    interruptionPhrases: ["stop", "wait", "hold", "but"]
  }
}
```

### Polite (Customer Discovery Mode):

```typescript
{
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en-US",
    smartFormat: true,
    endUtteranceSilenceThreshold: 0.8  // 800ms silence
  },
  startSpeakingPlan: {
    waitSeconds: 1.5,  // Wait longer before responding
    smartEndpointingEnabled: true,
    smartEndpointingPlan: {
      provider: "vapi"
    }
  },
  stopSpeakingPlan: {
    numWords: 5,  // Require more words to interrupt
    voiceSeconds: 0.5,  // Slower detection
    backoffSeconds: 1.0,  // Longer backoff
    acknowledgementPhrases: ["yeah", "uh-huh", "right", "okay", "mm-hmm"],
    interruptionPhrases: ["stop", "wait", "hold"]
  }
}
```

### No Interruption Mode:

```typescript
{
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en-US",
    smartFormat: true,
    endUtteranceSilenceThreshold: 1.0  // 1 second silence
  },
  startSpeakingPlan: {
    waitSeconds: 2.0,  // Long wait
    smartEndpointingEnabled: false,  // Disable smart detection
    transcriptionEndpointingPlan: {
      onPunctuationSeconds: 0.5,
      onNoPunctuationSeconds: 2.0,
      onNumberSeconds: 1.0
    }
  },
  stopSpeakingPlan: {
    numWords: 10,  // Require many words to interrupt
    voiceSeconds: 1.0,  // Very slow detection
    backoffSeconds: 2.0,  // Long backoff
    acknowledgementPhrases: [
      "yeah", "uh-huh", "right", "okay", "mm-hmm", "i see", "got it"
    ],
    interruptionPhrases: []  // No automatic interruption phrases
  }
}
```

---

## How to Navigate Vapi Docs

### 1. **Start at the API Reference**
https://docs.vapi.ai/api-reference

Look for:
- "List Assistants" endpoint
- Scroll through the response schema
- Find the configuration object you need

### 2. **Search for Specific Fields**
Use browser search (Cmd+F / Ctrl+F) for:
- `startSpeakingPlan`
- `stopSpeakingPlan`
- `transcriber`
- `endpointing`
- `smartEndpointing`

### 3. **Check Provider-Specific Docs**
Different transcribers have different fields:
- **Deepgram**: `endUtteranceSilenceThreshold`
- **AssemblyAI**: `endOfTurnConfidenceThreshold`, `minEndOfTurnSilenceWhenConfident`
- **Gladia**: Different fields entirely

### 4. **Look at the Full Schema**
The API reference shows the complete JSON schema with all possible fields and their types.

---

## Key Insights from API Reference

### 1. **`endpointing` is NOT a standard field**
Your code uses `endpointing: 300`, but this doesn't appear in Vapi's API reference for Deepgram.

**Possible explanations:**
- It's a legacy field that still works
- It's being ignored and defaults are used
- It's mapped internally to `endUtteranceSilenceThreshold`

**Recommendation**: Use the documented fields instead.

### 2. **`startSpeakingPlan` is the real control**
This is where you control when the AI responds:
- `waitSeconds` - How long to wait
- `smartEndpointingEnabled` - Use AI detection
- `transcriptionEndpointingPlan` - Manual rules

### 3. **`stopSpeakingPlan` controls interruption**
This is where you control when the AI stops:
- `numWords` - Minimum words to interrupt
- `voiceSeconds` - How long user must speak
- `acknowledgementPhrases` - Don't interrupt on these
- `interruptionPhrases` - Always interrupt on these

---

## Testing Your Configuration

### 1. **Check What Vapi Receives**
Log the full assistant config you're sending:

```typescript
console.log("Vapi Config:", JSON.stringify(assistantConfig, null, 2));
```

### 2. **Test in Vapi Dashboard**
Create an assistant in the dashboard with your desired settings, then compare the JSON.

### 3. **Monitor Actual Behavior**
- Start a call
- Measure actual response time
- Test interruption by talking over AI
- Check if it matches your expectations

---

## Summary: Where to Look

| What You Need | Where to Find It |
|---------------|------------------|
| **Complete API schema** | https://docs.vapi.ai/api-reference |
| **Quickstart guides** | https://docs.vapi.ai/assistants |
| **Interruption settings** | API Reference → `startSpeakingPlan`, `stopSpeakingPlan` |
| **Endpointing settings** | API Reference → `transcriber` → provider-specific fields |
| **Smart endpointing** | API Reference → `startSpeakingPlan.smartEndpointingPlan` |

**Pro tip**: The API reference is your source of truth. If a field isn't there, it might not work as expected.
