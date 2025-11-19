# Vapi Architecture & How It Works

## Overview

Vapi is a **fully managed voice AI orchestration platform** that provides end-to-end voice conversation capabilities. Unlike building your own voice pipeline, Vapi handles all the complexity of real-time voice interactions.

## The Complete Picture

### What Vapi Actually Is

Vapi is **not just an API wrapper**. It's a comprehensive orchestration layer that:

1. **Manages the entire voice pipeline** (STT → LLM → TTS)
2. **Runs real-time AI models** for natural conversations
3. **Handles latency optimization** to achieve sub-700ms responses
4. **Provides WebRTC infrastructure** for browser and phone calls
5. **Orchestrates conversation flow** with turn-taking and interruptions

### What You Don't Build

When using Vapi, you DON'T need to:
- ❌ Set up WebRTC infrastructure
- ❌ Implement speech-to-text streaming
- ❌ Handle text-to-speech synthesis
- ❌ Build interruption detection
- ❌ Manage turn-taking logic
- ❌ Implement endpointing algorithms
- ❌ Handle audio encoding/decoding
- ❌ Manage connection state
- ❌ Implement retry logic

**Vapi handles all of this for you.**

---

## Core Pipeline: STT → LLM → TTS

### 1. Speech-to-Text (Transcriber)

**Configuration (in Vapi Dashboard or assistant config):**
```json
{
  "transcriber": {
    "provider": "deepgram",
    "model": "nova-2",
    "language": "en"
  }
}
```

### 2. Language Model (LLM)

**Configuration:**
```json
{
  "model": {
    "provider": "openai",
    "model": "gpt-4o",
    "temperature": 0.7,
    "messages": [
      {
        "role": "system",
        "content": "You are a debate opponent..."
      }
    ]
  }
}
```

### 3. Text-to-Speech (Voice)

**Configuration:**
```json
{
  "voice": {
    "provider": "11labs",
    "voiceId": "21m00Tcm4TlvDq8ikWAM"
  }
}
```

**Vapi handles calling these providers. You just configure which ones to use.**

---

## Orchestration Layer: The Magic

On top of the core pipeline, Vapi runs **proprietary real-time models** that make conversations feel natural and human-like:

### 1. Endpointing

**What it does:** Detects exactly when the user finishes speaking.

Traditional systems use silence detection (e.g., "wait 1 second of silence"). This creates awkward pauses.

**Vapi's approach:** Uses a custom audio-text fusion model that analyzes:
- User's tone and inflection
- Context of what they're saying
- Natural speech patterns

**Result:** Responds immediately when user is done, but doesn't cut them off mid-thought.

### 2. Interruption Handling (Barge-in)

**What it does:** Lets users naturally interrupt the AI.

**The challenge:** Distinguishing between:
- Real interruptions: "Wait", "Hold on", "That's not what I meant"
- Backchanneling: "Yeah", "Uh-huh", "I see", "Okay"

**Vapi's approach:** Custom model detects true interruptions vs affirmations.

**Result:** Users can cut in naturally without awkward "stop" commands.

### 3. Background Noise Filtering

**What it does:** Removes ambient noise in real-time.

**Handles:**
- Traffic sounds
- Air conditioning
- Keyboard typing
- Pet noises
- Wind

**Technology:** Powered by Krisp AI (optional Smart Denoising).

### 4. Background Voice Filtering

**What it does:** Focuses on the primary speaker, ignores others.

**The problem:** Transcribers pick up everything that sounds like speech:
- TV in the background
- Other people talking
- Echo from speakers

**Vapi's solution:** Proprietary audio filtering that locks onto the main speaker.

**This is critical for debates** - you don't want the AI responding to a TV commercial!

### 5. Backchanneling

**What it does:** AI says "yeah", "uh-huh", "got it" at natural moments.

**Why it matters:** Humans do this to show they're listening and understanding.

**Vapi's approach:** Fusion audio-text model determines:
- When to backchannel
- Which phrase to use
- Whether it would interrupt

**For debates:** Can be tuned down for more formal interactions.

### 6. Emotion Detection

**What it does:** Detects emotional tone of user's speech.

**Provides to LLM:** Context like "user sounds frustrated" or "user sounds excited".

**Result:** AI can respond appropriately to emotional cues.

### 7. Filler Injection

**What it does:** Makes AI speech sound conversational.

**The problem:** LLMs output formal, written-style text like:
> "I believe we should consider the economic implications of this policy."

**With filler injection:**
> "I mean, like, I believe we should consider, you know, the economic implications of this policy."

**Vapi's approach:** Real-time model transforms streaming LLM output without adding latency.

**For debates:** Can be adjusted based on opponent personality (academic vs casual).

---

## API Keys: What You Actually Need

### ✅ In Your Convex Environment

```bash
VAPI_API_KEY=your_vapi_private_key_here
OPENROUTER_API_KEY=your_openrouter_key  # Only for separate AI analysis
```

### ❌ NOT Needed in Your Backend

You do **NOT** put these in Convex environment variables:
- `ELEVENLABS_API_KEY`
- `DEEPGRAM_API_KEY`
- `OPENAI_API_KEY` (for voice conversations)
- `ANTHROPIC_API_KEY` (for voice conversations)

### Where Do Provider Keys Go?

**Option 1: Vapi Dashboard (Recommended)**

1. Go to [Vapi Dashboard](https://dashboard.vapi.ai) → Settings → Provider Credentials
2. Click "Add Credential"
3. Select provider (ElevenLabs, Deepgram, OpenAI, etc.)
4. Paste your API key
5. Save

**Option 2: In Assistant Configuration**

You can provide provider credentials directly in assistant configs (less secure):

```json
{
  "model": {
    "provider": "openai",
    "model": "gpt-4o",
    "apiKey": "sk-..." // ⚠️ Not recommended for production
  }
}
```

**Vapi calls the providers on your behalf.** You configure which ones to use, Vapi handles the API calls.

---

## How Vapi Calls Work

### Web SDK (for Debate Platform)

```typescript
import { useVapi } from '@vapi-ai/web';

function DebateInterface() {
  const { start, stop, isSessionActive } = useVapi();
  
  const startDebate = async () => {
    await start({
      // Option 1: Use a saved assistant
      assistantId: "asst_123abc",
      
      // Option 2: Use transient (inline) config
      assistant: {
        model: { provider: "openai", model: "gpt-4o" },
        voice: { provider: "11labs", voiceId: "..." },
        transcriber: { provider: "deepgram" }
      },
      
      // Metadata passed to webhooks
      metadata: {
        debateId: "debate_456",
        userId: "user_789"
      }
    });
  };
}
```

### Phone Calls (Not Used for Debate Platform)

```typescript
// For reference only - debate platform uses Web SDK
const call = await vapi.calls.create({
  assistantId: "asst_123abc",
  phoneNumberId: "pn_456def",
  customer: {
    number: "+1234567890"
  }
});
```

---

## Assistant Configuration

### Permanent vs Transient

**Permanent (Saved):**
- Created via API or Dashboard
- Stored on Vapi servers
- Reusable across calls
- Has an `assistantId`

**Transient (Inline):**
- Passed directly in `start()` call
- Not saved anywhere
- Useful for dynamic, per-user configs

### Complete Assistant Example

```typescript
{
  name: "Debate Opponent",
  
  // First message
  firstMessage: "I'm ready to debate. Let's begin.",
  firstMessageMode: "assistant-speaks-first",
  
  // LLM configuration
  model: {
    provider: "openai",
    model: "gpt-4o",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: `You are a debate opponent using Mehdi Hasan techniques.
        
        TECHNIQUES:
        - Concession & Pivot
        - Reframing
        - Gish Gallop
        - Zingers
        - Rule of Three
        
        After each exchange, call logTechnique() to record what you used.`
      }
    ],
    
    // Function definitions (OpenAI-style)
    functions: [
      {
        name: "logTechnique",
        description: "Record debate technique usage",
        parameters: {
          type: "object",
          properties: {
            technique: { 
              type: "string",
              enum: ["concession_pivot", "reframing", "gish_gallop", "zinger"]
            },
            effectiveness: { type: "number", minimum: 1, maximum: 10 },
            context: { type: "string" }
          },
          required: ["technique", "effectiveness"]
        }
      }
    ]
  },
  
  // Voice configuration
  voice: {
    provider: "11labs",
    voiceId: "21m00Tcm4TlvDq8ikWAM",
    stability: 0.75,
    similarityBoost: 0.8,
    
    // Voice formatting
    chunkPlan: {
      enabled: true,
      formatPlan: {
        enabled: true,
        replacements: [
          { type: "exact", key: "ST", value: "STREET" },
          { type: "exact", key: "RD", value: "ROAD" }
        ]
      }
    }
  },
  
  // Transcription configuration
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
    smartFormat: true,
    endpointing: 300  // ms of silence before complete
  },
  
  // Interruption handling
  startSpeakingPlan: {
    smartEndpointingEnabled: true,
    smartEndpointingConfig: {
      provider: "livekit",
      waitSeconds: 0.4  // Quick for debates
    }
  },
  
  stopSpeakingPlan: {
    numWords: 2,        // Interrupt after 2 words
    voiceSeconds: 0.2,  // Quick detection
    backoffSeconds: 0.5 // Block audio after interrupt
  },
  
  // Background denoising
  backgroundSpeechDenoisingPlan: {
    smartDenoisingPlan: {
      enabled: true  // Krisp AI filtering
    }
  },
  
  // Webhook configuration
  serverMessages: [
    "function-call",
    "transcript", 
    "speech-update",
    "end-of-call-report",
    "user-interrupted"
  ],
  
  server: {
    url: "https://your-convex-url.convex.site/vapi-webhook",
    timeoutSeconds: 20
  }
}
```

---

## Webhook Events

Vapi sends `POST` requests to your server URL with these events:

### Function Calls (Tool Calls)

```json
{
  "message": {
    "type": "tool-calls",
    "toolCallList": [
      {
        "id": "call_abc123",
        "name": "logTechnique",
        "parameters": {
          "technique": "zinger",
          "effectiveness": 9,
          "context": "Well, that's interesting coming from someone who..."
        }
      }
    ],
    "call": {
      "id": "call_456",
      "metadata": {
        "debateId": "debate_789",
        "userId": "user_101"
      }
    }
  }
}
```

**You must respond within 7.5 seconds:**

```json
{
  "results": [
    {
      "toolCallId": "call_abc123",
      "result": "Technique logged successfully"
    }
  ]
}
```

### Transcript

```json
{
  "message": {
    "type": "transcript",
    "role": "user",
    "transcriptType": "final",
    "transcript": "I think climate change requires immediate action.",
    "timestamp": 1234567890
  }
}
```

### Speech Update (Real-time)

```json
{
  "message": {
    "type": "speech-update",
    "role": "user",
    "status": "started",  // or "stopped"
    "transcript": "I think...",  // Partial transcript
    "isFinal": false
  }
}
```

### User Interrupted

```json
{
  "message": {
    "type": "user-interrupted",
    "timestamp": 1234567890
  }
}
```

### End of Call Report

```json
{
  "message": {
    "type": "end-of-call-report",
    "call": {
      "id": "call_123",
      "duration": 600,  // seconds
      "metadata": { "debateId": "debate_456" }
    },
    "artifact": {
      "transcript": "Full conversation transcript...",
      "messages": [
        { "role": "assistant", "message": "..." },
        { "role": "user", "message": "..." }
      ]
    },
    "endedReason": "hangup"  // or "assistant-ended", "error", etc.
  }
}
```

---

## Web SDK Events

### Available Events

```typescript
import { useVapi } from '@vapi-ai/web';

vapi.on("call-start", () => {
  console.log("Call started");
});

vapi.on("call-end", () => {
  console.log("Call ended");
});

vapi.on("speech-start", () => {
  console.log("User started speaking");
});

vapi.on("speech-end", () => {
  console.log("User stopped speaking");
});

vapi.on("volume-level", (level) => {
  // level: 0-1 (volume indicator)
  updateMicIndicator(level);
});

vapi.on("message", (message) => {
  if (message.type === "function-call") {
    // Handle function calls in real-time
  }
});

vapi.on("error", (error) => {
  console.error("Vapi error:", error);
});
```

---

## Development Workflow

### Local Setup with ngrok

```bash
# Terminal 1: Start Convex
npx convex dev
# Output: Running at http://localhost:3210

# Terminal 2: Expose with ngrok
ngrok http 3210
# Output: Forwarding https://abc123.ngrok.io -> localhost:3210

# Terminal 3: Start frontend
npm run dev
```

### Configure Vapi Assistant

Use the ngrok URL for webhooks during development:

```typescript
{
  server: {
    url: "https://abc123.ngrok.io/vapi-webhook"
  }
}
```

### Alternative: Vapi CLI

```bash
# Install Vapi CLI
npm install -g @vapi-ai/cli

# Forward webhooks to local server
vapi listen --forward-to http://localhost:3210/vapi-webhook
```

---

## Production Considerations

### 1. Webhook Authentication

**Verify webhook signatures:**

```typescript
import crypto from 'crypto';

function verifyWebhookSignature(
  signature: string, 
  payload: any, 
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

### 2. Timeout Handling

**Critical:** Must respond to function calls within **7.5 seconds**.

```typescript
// If processing takes long, respond immediately and process async
export const handleFunctionCall = httpAction(async (ctx, data) => {
  // Immediate response
  const response = new Response(
    JSON.stringify({ result: "Processing..." }), 
    { status: 200 }
  );
  
  // Process async (don't await)
  ctx.scheduler.runAfter(0, internal.debates.processAsync, {
    functionCall: data
  });
  
  return response;
});
```

### 3. Error Handling

```typescript
vapi.on("error", (error) => {
  if (error.code === "PERMISSIONS_DENIED") {
    showMicPermissionsHelp();
  } else if (error.code === "NETWORK_ERROR") {
    showOfflineMessage();
  } else if (error.code === "CONCURRENT_LIMIT") {
    showBusyMessage("Platform is busy, try again");
  } else {
    logError(error);
    showGenericError();
  }
});
```

### 4. Concurrent Limits

**Default limits by plan:**
- Starter: 10 concurrent calls
- Growth: 50 concurrent calls
- Enterprise: Custom

Handle gracefully in your UI.

---

## Summary: What Vapi Does For You

**Voice Infrastructure:**
- ✅ WebRTC connection management
- ✅ Audio encoding/decoding
- ✅ STT streaming and processing
- ✅ LLM orchestration and function calling
- ✅ TTS generation and streaming
- ✅ Sub-second latency optimization

**Conversation Intelligence:**
- ✅ Smart endpointing (knows when user is done)
- ✅ Interruption detection (natural barge-in)
- ✅ Backchanneling (natural affirmations)
- ✅ Background noise filtering
- ✅ Background voice filtering
- ✅ Emotion detection
- ✅ Natural speech generation

**What You Build:**
- ✅ Debate logic and technique detection
- ✅ Convex backend for data storage
- ✅ UI/UX for the debate experience
- ✅ Post-debate analysis
- ✅ User progress tracking

---

## Next Steps

For the debate platform specifically, see:
- [VAPI_INTEGRATION.md](./VAPI_INTEGRATION.md) - Complete integration guide
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - Convex schema for debate data
- [PHASES.md](./PHASES.md) - Implementation timeline

