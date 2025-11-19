# Vapi Integration Guide

This document provides comprehensive guidance for integrating Vapi voice AI platform with the debate training system.

---

## Table of Contents

1. [Vapi Overview](#vapi-overview)
2. [Core Capabilities](#core-capabilities)
3. [Assistant Configuration](#assistant-configuration)
4. [Function Calling](#function-calling)
5. [Webhook Integration](#webhook-integration)
6. [Interruption Handling](#interruption-handling)
7. [Development Workflow](#development-workflow)
8. [Production Considerations](#production-considerations)

---

## Vapi Overview

Vapi orchestrates a complete voice AI pipeline, handling:
- Speech-to-Text (transcription)
- LLM conversation
- Text-to-Speech (voice synthesis)
- Turn-taking and interruptions
- Real-time latency management

### Voice Pipeline

```
User Speech 
  → Deepgram (STT) 
  → OpenRouter/LLM (Reasoning) 
  → ElevenLabs (TTS) 
  → Audio Output
```

**Typical Latency:** ~800ms end-to-end

---

## Core Capabilities

### What Vapi Handles Automatically

1. **Turn-taking** - Knows when user finishes speaking
2. **Interruption handling** - User can interrupt AI, AI can interrupt user
3. **Backchanneling** - Recognizes "yeah", "uh-huh" without treating as interruptions
4. **Noise filtering** - Background noise suppression
5. **Emotion detection** - Passes emotion metadata to LLM
6. **Natural speech** - Can inject filler words ("um", "like")
7. **Endpointing** - Intelligent pause detection

### Three Core Modules

1. **Transcriber (STT):** Deepgram (recommended for low latency)
2. **Model (LLM):** Your debate logic via OpenRouter
3. **Voice (TTS):** ElevenLabs or alternatives

---

## Assistant Configuration

### Complete Debate Assistant Setup

```javascript
const debateAssistant = {
  // Basic identification
  name: "Debate Opponent",
  
  // First message configuration
  firstMessage: "I'm ready to debate. The topic is climate policy. I'll argue for gradual transition. Would you like to make your opening statement first, or shall I begin?",
  firstMessageMode: "assistant-speaks-first",
  
  // LLM configuration
  model: {
    provider: "openai",
    model: "gpt-4",
    temperature: 0.7,
    
    // System prompt with debate instructions
    messages: [{
      role: "system",
      content: `
        You are a skilled debater using Mehdi Hasan's techniques.
        
        DEBATE SETUP:
        - Topic: {{topic}}
        - Your position: {{position}}
        - User position: {{userPosition}}
        - Difficulty: {{difficulty}}
        
        TECHNIQUES TO USE:
        1. Concession & Pivot - When user makes good point
        2. Reframing - Change the question's premise
        3. Preemption - Address arguments before they're made
        4. Gish Gallop - Occasionally overwhelm with points
        5. Receipts - Deploy specific evidence
        6. Zingers - Memorable one-liners
        7. Rule of Three - Group arguments in threes
        8. Peroration - Powerful closing
        
        BEHAVIORAL RULES:
        - Speak naturally with occasional filler words
        - You CAN be interrupted - respond naturally
        - You CAN interrupt if user rambles > 45 seconds
        - After each exchange, call logTechnique() function
        - Adjust difficulty based on user performance
        
        PERSONALITY: {{personality}}
        - aggressive: Push hard, interrupt more
        - socratic: Ask probing questions
        - academic: Citation-heavy, measured
        - political: Emotional appeals, stories
      `
    }],
    
    // Function definitions for technique tracking
    functions: [
      {
        name: "logTechnique",
        description: "Record when a debate technique is used by either party",
        parameters: {
          type: "object",
          properties: {
            speaker: {
              type: "string",
              enum: ["user", "ai"],
              description: "Who used the technique"
            },
            technique: {
              type: "string",
              enum: [
                "concession_pivot",
                "reframing",
                "preemption",
                "gish_gallop_attack",
                "gish_gallop_defense",
                "provocative_question",
                "personal_story",
                "rule_of_three",
                "receipts",
                "zinger",
                "peroration",
                "strategic_interruption"
              ],
              description: "The technique that was used"
            },
            effectiveness: {
              type: "number",
              minimum: 1,
              maximum: 10,
              description: "Effectiveness score (1-10)"
            },
            context: {
              type: "string",
              description: "What was actually said"
            }
          },
          required: ["speaker", "technique", "effectiveness", "context"]
        }
      }
    ]
  },
  
  // Voice configuration
  voice: {
    provider: "elevenlabs",
    voiceId: "christopher",  // Professional male voice
    stability: 0.75,
    similarityBoost: 0.8
  },
  
  // Transcription configuration
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
    smartFormat: true,
    endpointing: 300  // ms of silence before considering speech complete
  },
  
  // Webhook configuration
  serverMessages: [
    "conversation-update",
    "end-of-call-report",
    "function-call",
    "speech-update",
    "transcript",
    "tool-calls",
    "user-interrupted"
  ],
  
  server: {
    url: process.env.CONVEX_HTTP_URL + "/vapi-webhook",
    timeoutSeconds: 20  // Max time to wait for webhook response
  }
};
```

### Dynamic Configuration

For custom opponent profiles, generate assistant configuration dynamically:

```typescript
// Convex function to generate assistant config
export const generateAssistantConfig = action({
  args: {
    opponentProfileId: v.id("opponentProfiles"),
    difficulty: v.string(),
    personality: v.string()
  },
  handler: async (ctx, args) => {
    const profile = await ctx.runQuery(
      internal.opponents.get, 
      { id: args.opponentProfileId }
    );
    
    const talkingPointsPrompt = profile.talkingPoints
      .map(tp => `- [${tp.priority}] ${tp.point}`)
      .join('\n');
    
    return {
      ...baseAssistantConfig,
      model: {
        ...baseAssistantConfig.model,
        messages: [{
          role: "system",
          content: `
            You are debating as ${profile.name}.
            Your position: ${profile.position}
            
            YOUR MAIN ARGUMENTS (use these):
            ${talkingPointsPrompt}
            
            YOUR STYLE: ${profile.styleNotes}
            
            DIFFICULTY: ${args.difficulty}
            PERSONALITY: ${args.personality}
          `
        }]
      }
    };
  }
});
```

---

## Function Calling

### How Function Calling Works

When the LLM decides to call a function:
1. Vapi sends webhook to your server URL
2. You have **7.5 seconds** to respond
3. Return JSON result
4. LLM receives result and continues

### Implementing logTechnique Function

```typescript
// convex/http.ts
export const handleFunctionCall = httpAction(async (ctx, data) => {
  const { functionCall, call } = data;
  
  if (functionCall.name === "logTechnique") {
    const { technique, effectiveness, speaker, context } = functionCall.parameters;
    const { debateId, userId } = call.metadata;
    
    // Store in Convex database
    const techniqueId = await ctx.runMutation(internal.debates.logTechnique, {
      debateId,
      technique,
      effectiveness,
      speaker,
      context,
      timestamp: Date.now()
    });
    
    // Check if this is a key moment
    if (technique === "zinger" && effectiveness > 8) {
      await ctx.runMutation(internal.debates.markKeyMoment, {
        debateId,
        description: `${speaker} delivered a memorable zinger: "${context}"`,
        impact: "high"
      });
    }
    
    // Return result to LLM
    return new Response(JSON.stringify({
      result: "Technique logged successfully",
      techniqueId,
      message: `Recorded ${technique} with effectiveness ${effectiveness}/10`
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
  
  return new Response(JSON.stringify({ error: "Unknown function" }), {
    status: 400
  });
});
```

### Multiple Functions

You can define multiple functions for different purposes:

```javascript
functions: [
  {
    name: "logTechnique",
    description: "Record technique usage",
    // ... parameters
  },
  {
    name: "requestJudgment",
    description: "Request third-party analysis of contentious claim",
    parameters: {
      type: "object",
      properties: {
        claim: { type: "string" },
        counterClaim: { type: "string" },
        reason: { type: "string" }
      }
    }
  },
  {
    name: "citeFact",
    description: "Record when specific evidence is cited",
    parameters: {
      type: "object",
      properties: {
        source: { type: "string" },
        claim: { type: "string" },
        speaker: { type: "string" }
      }
    }
  }
]
```

---

## Webhook Integration

### Webhook Events

Vapi sends these events to your server URL:

| Event | When | Use Case |
|-------|------|----------|
| `function-call` | LLM calls a function | Log techniques, request judgments |
| `transcript` | Speech transcribed | Store conversation history |
| `speech-update` | Real-time transcription | Detect Gish Gallop, show live text |
| `user-interrupted` | User interrupts AI | Log strategic interruptions |
| `end-of-call-report` | Call completes | Trigger comprehensive analysis |
| `conversation-update` | Turn completes | Store exchanges |

### Complete Webhook Handler

```typescript
// convex/http.ts
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/vapi-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const data = await request.json();
    
    // Verify webhook signature (production)
    const signature = request.headers.get("vapi-signature");
    const isValid = await verifyWebhookSignature(signature, data);
    if (!isValid) {
      return new Response("Invalid signature", { status: 401 });
    }
    
    try {
      switch (data.type) {
        case "function-call":
          return await handleFunctionCall(ctx, data);
          
        case "transcript":
          await handleTranscript(ctx, data);
          break;
          
        case "speech-update":
          await handleSpeechUpdate(ctx, data);
          break;
          
        case "user-interrupted":
          await handleInterruption(ctx, data);
          break;
          
        case "end-of-call-report":
          await handleEndOfCall(ctx, data);
          break;
          
        case "conversation-update":
          await handleConversationUpdate(ctx, data);
          break;
          
        default:
          console.log(`Unhandled event type: ${data.type}`);
      }
      
      return new Response(null, { status: 200 });
      
    } catch (error) {
      console.error("Webhook error:", error);
      // Still return 200 to prevent Vapi retries
      return new Response(null, { status: 200 });
    }
  }),
});

export default http;
```

### Individual Event Handlers

```typescript
// Handle real-time transcription
const handleSpeechUpdate = async (ctx, data) => {
  const { speechUpdate, call } = data;
  const { role, transcript, isFinal } = speechUpdate;
  
  if (isFinal) {
    // Check for Gish Gallop (multiple claims rapidly)
    const claimCount = countClaims(transcript);
    if (claimCount > 5 && transcript.length < 200) {
      await ctx.runMutation(internal.debates.detectGishGallop, {
        debateId: call.metadata.debateId,
        speaker: role,
        claimCount,
        transcript
      });
    }
  }
};

// Handle final transcript
const handleTranscript = async (ctx, data) => {
  const { transcript, call } = data;
  
  await ctx.runMutation(internal.debates.addTranscript, {
    debateId: call.metadata.debateId,
    speaker: transcript.role,
    text: transcript.text,
    timestamp: transcript.timestamp
  });
};

// Handle interruptions
const handleInterruption = async (ctx, data) => {
  const { call } = data;
  
  await ctx.runMutation(internal.debates.logInterruption, {
    debateId: call.metadata.debateId,
    timestamp: Date.now(),
    // Was this strategic or just impatient?
    // Analyze in post-debate review
  });
};

// Handle end of call - trigger analysis
const handleEndOfCall = async (ctx, data) => {
  const { call } = data;
  const { debateId } = call.metadata;
  
  // Update debate status
  await ctx.runMutation(internal.debates.complete, {
    debateId,
    duration: call.duration,
    completedAt: Date.now()
  });
  
  // Trigger comprehensive analysis
  await ctx.scheduler.runAfter(0, internal.analysis.generateFull, {
    debateId,
    transcript: call.transcript,
    duration: call.duration
  });
};
```

---

## Interruption Handling

### Understanding Interruption Detection

Vapi uses two key configurations:

1. **startSpeakingPlan** - When to start responding to user
2. **stopSpeakingPlan** - When to stop AI speech if user talks

### Configuration for Debates

```javascript
const assistantConfig = {
  // ... other config
  
  // When to start listening/responding
  startSpeakingPlan: {
    smartEndpointingConfig: {
      provider: "livekit",  // Best for English conversations
      waitSeconds: 0.4,      // Quick response for debates
      includeTrailingPunctuation: true
    }
  },
  
  // When to allow interruptions
  stopSpeakingPlan: {
    numWords: 2,           // Interrupt after 2 words
    voiceSeconds: 0.2,     // Quick detection
    backoffSeconds: 0.5,   // Block AI audio after interruption
    
    // Don't interrupt on backchanneling
    acknowledgementPhrases: [
      "yeah", "uh-huh", "right", "okay", "mm-hmm", "I see"
    ],
    
    // Always interrupt on these
    interruptionPhrases: [
      "Hold on", "Stop", "Wait", "Actually", "But", "Excuse me"
    ]
  }
};
```

### Custom Wait Function

For more aggressive debate-style interruptions:

```javascript
startSpeakingPlan: {
  smartEndpointingConfig: {
    provider: "livekit",
    // Default: (200 + 8000 * x) = 200ms to 8200ms
    // Debate: (200 + 2000 * x) = 200ms to 2200ms (more aggressive)
    waitFunction: "200 + 2000 * x"
  }
}
```

### Tracking Interruptions

```typescript
// When user interrupts AI
vapi.on("user-interrupted", (event) => {
  // Was this strategic or accidental?
  // Store for analysis
  convexClient.mutation(api.debates.logInterruption, {
    debateId,
    interrupter: "user",
    timestamp: Date.now(),
    aiWasSaying: event.partialTranscript
  });
});
```

---

## Development Workflow

### Local Setup

```bash
# Terminal 1: Start Convex backend
npx convex dev
# Runs on localhost:3210 by default

# Terminal 2: Start frontend dev server
npm run dev
# Runs on localhost:3000

# Terminal 3: Expose local server for webhooks
ngrok http 3210
# Get public URL like: https://abc123.ngrok.io
```

### Configure Vapi Assistant

In Vapi Dashboard:
1. Create new assistant
2. Set webhook URL: `https://abc123.ngrok.io/vapi-webhook`
3. Configure voice, transcriber, model
4. Add function definitions
5. Save and get Assistant ID

### Frontend Integration

```typescript
// Initialize Vapi client
import { useVapi } from '@vapi-ai/web';

function DebateInterface() {
  const { start, stop, isSessionActive } = useVapi();
  const startDebate = useMutation(api.debates.create);
  
  const handleStartDebate = async () => {
    // Create debate record
    const debateId = await startDebate({
      topic: "Climate policy",
      userPosition: "pro",
      aiPosition: "con"
    });
    
    // Start Vapi call
    await start({
      assistantId: process.env.VITE_VAPI_ASSISTANT_ID,
      metadata: {
        debateId,
        userId: currentUserId
      }
    });
  };
  
  return (
    <button onClick={handleStartDebate}>
      {isSessionActive ? "End Debate" : "Start Debate"}
    </button>
  );
}
```

### Event Handling

```typescript
useEffect(() => {
  vapi.on("speech-start", () => {
    console.log("User started speaking");
    setIsUserSpeaking(true);
  });
  
  vapi.on("speech-end", () => {
    console.log("User stopped speaking");
    setIsUserSpeaking(false);
  });
  
  vapi.on("message", (message) => {
    if (message.type === "technique-detected") {
      showTechniqueBadge(message.technique);
    }
  });
  
  vapi.on("error", (error) => {
    console.error("Vapi error:", error);
    showErrorToUser(error);
  });
  
  return () => {
    vapi.removeAllListeners();
  };
}, []);
```

---

## Production Considerations

### Authentication & Security

#### Webhook Signatures

```typescript
import crypto from 'crypto';

function verifyWebhookSignature(signature: string, payload: any): boolean {
  const secret = process.env.VAPI_WEBHOOK_SECRET;
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

#### Credential Management

In Vapi Dashboard → Organization Settings → Custom Credentials:
```javascript
{
  type: "bearer",
  token: process.env.WEBHOOK_SECRET
}
```

Reference in assistant:
```javascript
server: {
  url: "https://your-domain.convex.site/vapi-webhook",
  credentialId: "your-credential-id"
}
```

### Error Handling

```typescript
// Graceful degradation
try {
  await vapi.start(config);
} catch (error) {
  if (error.code === "PERMISSIONS_DENIED") {
    showMicrophonePermissionsHelp();
  } else if (error.code === "NETWORK_ERROR") {
    showOfflineMessage();
  } else if (error.code === "CONCURRENT_LIMIT") {
    showBusyMessage();
  } else {
    logError(error);
    showGenericError();
  }
}
```

### Webhook Timeout Handling

**Critical:** Must respond within 7.5 seconds.

```typescript
// If processing takes long, respond immediately and process async
const handleFunctionCall = httpAction(async (ctx, data) => {
  // Quick acknowledgment
  const response = new Response(JSON.stringify({ 
    result: "Processing..." 
  }), { status: 200 });
  
  // Process async (don't await)
  ctx.scheduler.runAfter(0, internal.analysis.processLongRunning, {
    functionCall: data.functionCall
  });
  
  return response;
});
```


### Concurrent Call Limits

Default Vapi plans:
- **Starter:** 10 concurrent calls
- **Growth:** 50 concurrent calls  
- **Enterprise:** Custom limits

Handle gracefully:
```typescript
vapi.on("error", (error) => {
  if (error.code === "CONCURRENT_LIMIT") {
    showMessage("Platform is busy. Please try again in a moment.");
  }
});
```

### Performance Optimization

1. **Minimize prompt size** - Shorter prompts = faster responses
2. **Use streaming TTS** - Start playing audio before complete
3. **Reduce function call frequency** - Only when necessary
4. **Cache assistant configurations** - Reuse when possible
5. **Monitor latency metrics** - Track p50, p95, p99

---

## Testing and Debugging

### Local Testing

```bash
# Watch webhook logs
npx convex dev --tail-logs

# Test with curl
curl -X POST http://localhost:3210/vapi-webhook \
  -H "Content-Type: application/json" \
  -d '{"type":"transcript","transcript":"test"}'
```

### Debugging Tips

1. **Check webhook logs** - Vapi Dashboard shows delivery status
2. **Verify signatures** - Ensure webhook authentication works
3. **Test interruptions** - Try talking over AI repeatedly
4. **Monitor latency** - Use Vapi's built-in metrics
5. **Check function calls** - Verify LLM is calling your functions

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| High latency | Large prompts | Reduce system prompt size |
| No interruptions | Wrong config | Check stopSpeakingPlan settings |
| Functions not called | Bad function definitions | Verify JSON schema |
| Webhook timeouts | Slow processing | Respond quickly, process async |
| Poor voice quality | Wrong voice settings | Adjust stability/similarity |

---

## Production Checklist

- [ ] Webhook signatures verified
- [ ] Error handling implemented
- [ ] Concurrent limits understood
- [ ] Latency monitoring configured
- [ ] Function calls working reliably
- [ ] Interruptions handled naturally
- [ ] End-of-call analysis triggers
- [ ] User permissions UX polished
- [ ] Backup assistant configured (fallback)

---

This comprehensive guide should enable full integration of Vapi voice capabilities into the debate platform. The key is letting Vapi handle the complex voice orchestration while you focus on debate logic and technique tracking in Convex.

