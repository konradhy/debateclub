# Vapi Speech Configuration - Official Documentation Summary

**Source**: https://docs.vapi.ai/customization/speech-configuration  
**Date**: January 1, 2026

---

## Overview

Speech configuration controls **when your assistant starts and stops speaking** during a conversation.

Two main components:
1. **Start Speaking Plan** - When assistant begins speaking after customer finishes/pauses
2. **Stop Speaking Plan** - When assistant stops speaking if customer starts talking

---

## Start Speaking Plan

### 1. Wait Time Before Speaking

**Field**: `waitSeconds`  
**Default**: 0.4 seconds  
**Purpose**: How long to wait after customer finishes before responding

**Examples:**
- **Tech support**: Set to 1.0+ seconds to give customers time to complete thoughts
- **Quick queries**: Keep at 0.4 seconds for snappy responses

```json
{
  "startSpeakingPlan": {
    "waitSeconds": 0.4  // Adjust based on use case
  }
}
```

---

### 2. Smart Endpointing Plan

**Purpose**: Detect when customer has truly finished speaking (not just pausing mid-thought)

**Tasks it handles:**
- **End-of-turn prediction** - When current speaker is likely to finish
- **Backchannel prediction** - Detecting "uh-huh", "yeah" without taking over turn

---

### Smart Endpointing Providers

#### Audio-Based:

**Krisp**:
- Analyzes prosodic/acoustic features (intonation, pitch, rhythm)
- Always notifies when user stops, even for brief acknowledgments
- Configure threshold 0-1 (default 0.5)
  - 1 = definitely stopped
  - 0 = still speaking
- Lower values = snappier, Higher values = more conservative

```json
{
  "startSpeakingPlan": {
    "smartEndpointingPlan": {
      "provider": "krisp",
      "threshold": 0.5
    }
  }
}
```

**Challenge**: Distinguishes meaningful interruptions from backchanneling ("right", "okay")

---

#### Audio-Text Based:

**Deepgram Flux**:
- Latest transcriber with built-in conversational speech recognition
- Combines high-quality STT with native turn detection
- Ultra-low latency with Nova-3 level accuracy

**Assembly**:
- Transcriber that reports end-of-turn detection
- Choose as transcriber without separate smart endpointing plan
- Uses `end_of_turn` flag from Assembly

---

#### Text-Based:

**Off** (Default):
- When disabled, automatically uses transcriber's end-of-turn detection if available
- Falls back to LiveKit (English) or Vapi (non-English)

**LiveKit** ⭐ **Recommended for English**:
- Most sophisticated for detecting natural speech patterns
- Fine-tuned using `waitFunction` parameter

```json
{
  "startSpeakingPlan": {
    "smartEndpointingPlan": {
      "provider": "livekit",
      "waitFunction": "200 + 8000 * x"
    }
  }
}
```

**How `waitFunction` works:**
- Maps probability (0-1) to milliseconds of wait time
- `x = 0`: High confidence caller stopped (200ms wait)
- `x = 1`: High confidence still speaking (8200ms wait)
- Default: `"200 + 8000 * x"`
- Custom example: `"4000 * (1 - cos(pi * x))"`

**Vapi**:
- Recommended for non-English conversations
- Alternative when LiveKit isn't suitable

---

### 3. Transcription-Based Detection

**Purpose**: Customize detection based on what customer is saying

**Fields:**
- `onPunctuationSeconds`: Wait after punctuation (e.g., period, comma)
- `onNoPunctuationSeconds`: Wait when no punctuation detected
- `onNumberSeconds`: Wait after numbers

**Example scenario:**
Customer says: "My account number is 123456789, I want to transfer $500."

1. System detects number "123456789"
2. Waits `onNumberSeconds` (0.5s) to ensure customer isn't still speaking
3. Customer continues: "I want to transfer $500."
4. System uses `onPunctuationSeconds` to confirm end of speech
5. Proceeds with request processing

```json
{
  "startSpeakingPlan": {
    "transcriptionEndpointingPlan": {
      "onPunctuationSeconds": 0.1,
      "onNoPunctuationSeconds": 1.5,
      "onNumberSeconds": 0.5
    }
  }
}
```

---

## Stop Speaking Plan

Controls when assistant stops talking after detecting customer speech.

### 1. Words to Stop Speaking

**Field**: `numWords`  
**Default**: 0 (immediate reaction)  
**Purpose**: How many words customer needs to say before assistant stops

**Examples:**
- **Immediate reaction**: Set to 0
- **Avoid brief acknowledgments**: Set to 2-3 (prevents stopping on "okay", "right")
- **Appointment setting**: Set to 2-3 to allow brief clarifications

```json
{
  "stopSpeakingPlan": {
    "numWords": 0  // 0 = immediate, 2-3 = wait for phrase
  }
}
```

---

### 2. Voice Activity Detection

**Field**: `voiceSeconds`  
**Default**: 0.2 seconds  
**Purpose**: How long customer needs to be speaking before assistant stops

**Examples:**
- **Banking call center**: Higher value (0.5s) to reduce false positives from background noise
- **Quick queries**: Lower value (0.2s) for faster response

```json
{
  "stopSpeakingPlan": {
    "voiceSeconds": 0.2  // Balance responsiveness vs false triggers
  }
}
```

---

### 3. Pause Before Resuming

**Field**: `backoffSeconds`  
**Default**: 1 second  
**Purpose**: How long assistant waits before resuming after being interrupted

**Examples:**
- **Quick queries** ("What's my cart total?"): 1 second
- **Complex explanations**: 2+ seconds to ensure customer is done

```json
{
  "stopSpeakingPlan": {
    "backoffSeconds": 1  // Adjust based on conversation type
  }
}
```

---

### Complete Stop Speaking Plan Example

```json
{
  "stopSpeakingPlan": {
    "numWords": 0,
    "voiceSeconds": 0.2,
    "backoffSeconds": 1
  }
}
```

---

## Acknowledgement vs Interruption Phrases

**From API Reference** (not in speech config doc, but related):

```json
{
  "stopSpeakingPlan": {
    "acknowledgementPhrases": [
      "i understand", "i see", "i got it", "right", "okay", 
      "yeah", "uh-huh", "mm-hmm", "gotcha"
    ],
    "interruptionPhrases": [
      "stop", "shut", "up", "enough", "quiet", "but", 
      "dont", "not", "no", "hold", "wait", "actually"
    ]
  }
}
```

**Purpose:**
- **Acknowledgement phrases**: Don't stop speaking (backchanneling)
- **Interruption phrases**: Always stop speaking (real interruption)

---

## Configuration Considerations

### 1. Customer Style
- **Pauses mid-thought**: Increase wait times, enable smart endpointing
- **Continuous speech**: Lower wait times

### 2. Background Noise
- **Noisy environment**: Increase `voiceSeconds` to avoid false triggers
- **Default for phone calls**: `"backgroundSound": "office"`
- **Default for web calls**: `"backgroundSound": "off"`

```json
{
  "backgroundSound": "off"  // or "office"
}
```

### 3. Conversation Flow
- Balance responsiveness vs intrusiveness
- Test different settings for your use case

---

## Practical Examples from Vapi Docs

### Tech Support (Patient):
```json
{
  "startSpeakingPlan": {
    "waitSeconds": 1.0,  // Give time to complete thoughts
    "smartEndpointingEnabled": true
  }
}
```

### Insurance Claims (Complex Responses):
```json
{
  "startSpeakingPlan": {
    "smartEndpointingPlan": {
      "provider": "livekit"  // Intelligent waiting for complete responses
    }
  }
}
```

### Appointment Setting (Avoid Brief Interruptions):
```json
{
  "stopSpeakingPlan": {
    "numWords": 2  // Allow brief clarifications without stopping
  }
}
```

### Banking (Reduce False Positives):
```json
{
  "stopSpeakingPlan": {
    "voiceSeconds": 0.5  // Higher value for accuracy
  }
}
```

### Quick Queries (Fast Response):
```json
{
  "stopSpeakingPlan": {
    "backoffSeconds": 1  // Resume quickly after interruption
  }
}
```

---

## Key Insights

### 1. Smart Endpointing is Critical
- **LiveKit** for English (most sophisticated)
- **Vapi** for non-English
- **Krisp** for audio-based detection
- **Deepgram Flux** for latest transcriber with built-in turn detection

### 2. Two Separate Wait Periods
1. **Detection wait** (smart endpointing) - Is customer done speaking?
2. **Response wait** (`waitSeconds`) - How long to wait before responding?

### 3. Stop Speaking Plan Prevents Awkward Interruptions
- `numWords` prevents stopping on brief acknowledgments
- `voiceSeconds` prevents false triggers from noise
- `backoffSeconds` controls resume timing

### 4. Configuration is Use-Case Specific
- **Tech support**: Patient, longer waits
- **Quick queries**: Snappy, shorter waits
- **Banking**: Accurate, reduce false positives
- **Appointments**: Allow clarifications

---

## What This Means for Your Code

### Current Problem:
```typescript
transcriber: {
  endpointing: 300  // ← Not a documented field!
}
```

### What You Should Use:
```typescript
// For Deepgram transcriber
transcriber: {
  provider: "deepgram",
  model: "nova-2",
  language: "en-US",
  smartFormat: true
  // No endpointing field needed
},

// Control response timing here
startSpeakingPlan: {
  waitSeconds: 0.4,  // ← This is the real control
  smartEndpointingPlan: {
    provider: "livekit"  // Recommended for English
  }
},

// Control interruption here
stopSpeakingPlan: {
  numWords: 2,
  voiceSeconds: 0.2,
  backoffSeconds: 1
}
```

---

## Recommended Configurations for Your Scenarios

### Debate (Aggressive):
```json
{
  "startSpeakingPlan": {
    "waitSeconds": 0.4,
    "smartEndpointingPlan": {
      "provider": "livekit",
      "waitFunction": "200 + 4000 * x"  // More aggressive than default
    }
  },
  "stopSpeakingPlan": {
    "numWords": 2,
    "voiceSeconds": 0.2,
    "backoffSeconds": 0.5
  }
}
```

### Sales/Customer Discovery (Polite):
```json
{
  "startSpeakingPlan": {
    "waitSeconds": 1.5,
    "smartEndpointingPlan": {
      "provider": "livekit"
    }
  },
  "stopSpeakingPlan": {
    "numWords": 5,
    "voiceSeconds": 0.5,
    "backoffSeconds": 2.0
  }
}
```

### No Interruption Mode:
```json
{
  "startSpeakingPlan": {
    "waitSeconds": 2.0,
    "smartEndpointingEnabled": false,
    "transcriptionEndpointingPlan": {
      "onPunctuationSeconds": 0.5,
      "onNoPunctuationSeconds": 2.0,
      "onNumberSeconds": 1.0
    }
  },
  "stopSpeakingPlan": {
    "numWords": 10,
    "voiceSeconds": 1.0,
    "backoffSeconds": 2.0
  }
}
```

---

## Summary

**Official Vapi Documentation**: https://docs.vapi.ai/customization/speech-configuration

**Key Takeaways:**
1. Use `startSpeakingPlan.waitSeconds` to control response timing
2. Use `smartEndpointingPlan` with LiveKit for English conversations
3. Use `stopSpeakingPlan` to control interruption behavior
4. Configure based on your specific use case (tech support vs quick queries)
5. Test and iterate to find the right balance

**Your current `endpointing: 300` field is not documented** - replace with proper `startSpeakingPlan` and `stopSpeakingPlan` configuration.
