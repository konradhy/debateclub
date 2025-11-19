# Technical Architecture

This document describes the technical architecture of the Win Every Argument platform, including system design, data flow, and technology choices.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Diagram](#architecture-diagram)
4. [Data Flow](#data-flow)
5. [Component Details](#component-details)
6. [API Integration](#api-integration)
7. [Real-time Communication](#real-time-communication)
8. [Security Considerations](#security-considerations)

---

## System Overview

The platform follows a modern serverless architecture with real-time capabilities:

- **Frontend:** React-based SPA with TanStack Start
- **Backend:** Convex (serverless functions + real-time database)
- **Voice:** Vapi (orchestrates voice AI pipeline)
- **AI/LLM:** OpenRouter (technique analysis and opponent logic)
- **Hosting:** Netlify (static frontend deployment)

```typescript
interface DebateSystem {
  voiceInterface: "Vapi",           // Handles all voice interactions
  backend: "Convex",                 // Database, real-time sync, functions
  auth: "Convex Auth",               // User authentication
  ai: "OpenRouter",                  // LLM for AI opponent and analysis
  frontend: "TanStack Start",        // React-based UI
  hosting: "Netlify"                 // Static hosting
}
```

---

## Technology Stack

### Frontend Layer

**TanStack Start (React)**
- Modern React framework with file-based routing
- Built-in code splitting
- SSR capabilities (if needed later)
- Type-safe routing

**State Management**
- Convex React hooks (built-in)
- TanStack Query for caching
- Local state with React hooks

**UI Libraries**
- Tailwind CSS for styling
- Headless UI for accessible components
- Radix UI for complex widgets

### Backend Layer

**Convex**
- Serverless functions (queries, mutations, actions)
- Real-time database with subscriptions
- Built-in authentication
- HTTP endpoints for webhooks
- TypeScript throughout

**Why Convex:**
- Real-time updates (perfect for live debates)
- No infrastructure management
- Strong consistency guarantees
- Excellent developer experience
- Built-in caching and optimization

### Voice Layer

**Vapi**
- Orchestrates voice AI pipeline
- Handles turn-taking and interruptions
- Manages transcription (Deepgram)
- Manages TTS (ElevenLabs)
- Connects to LLM (via OpenRouter)

**Voice Pipeline:**
```
User Speech → Deepgram (STT) → OpenRouter (LLM) → ElevenLabs (TTS) → Audio Output
```

### AI Layer

**OpenRouter**
- Access to multiple LLM providers
- Claude 3 Opus for analysis
- GPT-4 for real-time conversation
- Fallback options for reliability

**Use Cases:**
1. Real-time debate conversation (via Vapi)
2. Post-debate analysis (direct from Convex)
3. Technique detection (real-time)
4. Missed opportunity identification

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                                                                   │
│  ┌──────────────────┐           ┌─────────────────────┐         │
│  │  React Frontend  │◄─────────►│   Vapi Web SDK      │         │
│  │  (TanStack Start)│           │   (Voice Interface) │         │
│  └────────┬─────────┘           └──────────┬──────────┘         │
│           │                                 │                     │
└───────────┼─────────────────────────────────┼─────────────────────┘
            │                                 │
            │ WebSocket                       │ WebSocket
            │ (Real-time)                     │ (Audio Stream)
            │                                 │
            ▼                                 ▼
┌─────────────────────┐           ┌─────────────────────┐
│   CONVEX BACKEND    │           │    VAPI PLATFORM    │
│                     │           │                     │
│  ┌───────────────┐  │           │  ┌──────────────┐  │
│  │   Queries     │  │           │  │ Transcriber  │  │
│  │   Mutations   │  │           │  │ (Deepgram)   │  │
│  │   Actions     │  │           │  └──────┬───────┘  │
│  └───────────────┘  │           │         │          │
│                     │           │  ┌──────▼───────┐  │
│  ┌───────────────┐  │◄─────────┤  │     LLM      │  │
│  │   Database    │  │  Webhooks│  │ (OpenRouter) │  │
│  │  (Real-time)  │  │          │  └──────┬───────┘  │
│  └───────────────┘  │           │         │          │
│                     │           │  ┌──────▼───────┐  │
│  ┌───────────────┐  │           │  │     TTS      │  │
│  │  HTTP Routes  │◄─┼───────────┤  │(ElevenLabs)  │  │
│  │  (Webhooks)   │  │           │  └──────────────┘  │
│  └───────────────┘  │           │                     │
└──────────┬──────────┘           └─────────────────────┘
           │
           │ HTTP API
           │
           ▼
┌─────────────────────┐
│   OPENROUTER API    │
│                     │
│  ┌───────────────┐  │
│  │  Claude Opus  │  │  (Post-debate analysis)
│  │    GPT-4      │  │  (Technique detection)
│  └───────────────┘  │
│                     │
└─────────────────────┘
```

---

## Data Flow

### Flow 1: Starting a Debate

```
1. User clicks "Start Debate"
   └─→ Frontend: startDebate()
       
2. Create debate record in Convex
   └─→ Convex Mutation: debates.create()
       └─→ Returns debateId
       
3. Initialize Vapi call
   └─→ Vapi SDK: vapi.start({
         assistantId,
         metadata: { debateId, userId }
       })
       
4. Vapi connects to user's microphone
   └─→ Permissions request
   └─→ Audio stream established
   
5. AI speaks first message
   └─→ Vapi: firstMessage plays
   └─→ Debate begins
```

### Flow 2: Real-time Conversation

```
1. User speaks
   └─→ Audio → Vapi → Deepgram (STT)
       └─→ Transcript generated
       
2. Transcript sent to LLM
   └─→ Vapi → OpenRouter (GPT-4)
       └─→ With debate context and instructions
       
3. LLM generates response
   └─→ May call logTechnique() function
       └─→ Webhook to Convex
           └─→ Store technique in database
           └─→ Frontend updates via subscription
           
4. Response converted to speech
   └─→ OpenRouter → Vapi → ElevenLabs (TTS)
       └─→ Audio streamed to user
       
5. Transcript stored
   └─→ Vapi webhook → Convex
       └─→ exchanges.create()
```

### Flow 3: Technique Detection

```
1. Exchange completes
   └─→ Vapi webhook: "transcript" event
       └─→ Convex receives full text
       
2. Analyze for techniques
   └─→ Convex Action: analyzeExchange()
       └─→ OpenRouter API (Claude Opus)
           └─→ Prompt with technique definitions
           └─→ Returns detected techniques
           
3. Store results
   └─→ Convex Mutation: techniques.create()
       └─→ Store technique, effectiveness, context
       
4. Update UI
   └─→ Convex subscription triggers
       └─→ Frontend shows technique badge
       └─→ Toast notification appears
```

### Flow 4: Debate Completion

```
1. User ends debate or timer expires
   └─→ Frontend: vapi.stop()
       
2. Vapi sends end-of-call report
   └─→ Webhook to Convex
       └─→ Contains full transcript, duration, metadata
       
3. Generate comprehensive analysis
   └─→ Convex Action: generateFullAnalysis()
       └─→ OpenRouter API (Claude Opus)
           └─→ Analyze entire debate
           └─→ Identify strengths, weaknesses, missed opportunities
           
4. Store analysis
   └─→ Convex Mutation: analyses.create()
       └─→ Update user progress
       
5. Show results
   └─→ Frontend navigates to analysis page
       └─→ Load via Convex query
       └─→ Display with transcript annotations
```

---

## Component Details

### Frontend Components

#### Core Components

```typescript
// Top-level app structure
App
├── AuthProvider (Convex Auth)
├── VapiProvider (Vapi SDK context)
└── Router
    ├── HomePage
    ├── DashboardPage
    ├── DebatePage
    │   ├── VoiceInterface
    │   ├── TechniqueTracker
    │   ├── SpeakingIndicator
    │   └── DebateTimer
    ├── AnalysisPage
    │   ├── TranscriptView
    │   ├── TechniqueBreakdown
    │   └── ImprovementTips
    └── OpponentConfigPage
        ├── TalkingPointsForm
        └── ProfileLibrary
```

#### Key Component Responsibilities

**VoiceInterface**
- Initializes Vapi connection
- Manages microphone permissions
- Handles voice events
- Shows connection status

**TechniqueTracker**
- Subscribes to live technique updates
- Displays technique badges
- Shows effectiveness scores
- Running tally

**TranscriptView**
- Displays conversation history
- Highlights techniques in text
- Annotates with effectiveness scores
- Marks key moments

### Backend Functions

#### Convex Queries (Read Data)

```typescript
// Get debate with all related data
debates.get(debateId)
  └─→ Returns: debate + exchanges + techniques + analysis

// Get user's debate history
debates.list(userId)
  └─→ Returns: paginated list of debates

// Get user progress
progress.getByUser(userId)
  └─→ Returns: technique mastery levels, stats
```

#### Convex Mutations (Write Data)

```typescript
// Create new debate
debates.create({ topic, position, difficulty })
  └─→ Returns: debateId

// Log technique usage
techniques.log({ debateId, technique, effectiveness })
  └─→ Stores in database, triggers real-time update

// Update user progress
progress.update({ userId, techniqueId, effectiveness })
  └─→ Recalculates mastery levels
```

#### Convex Actions (External API Calls)

```typescript
// Analyze exchange for techniques
analyzeExchange({ userSaid, aiSaid })
  └─→ Calls OpenRouter API
  └─→ Returns detected techniques

// Generate full debate analysis
generateFullAnalysis({ debateId, transcript })
  └─→ Calls OpenRouter API
  └─→ Stores comprehensive analysis

// Create opponent AI prompt
generateOpponentPrompt({ profileId })
  └─→ Formats talking points into LLM prompt
  └─→ Returns prompt string
```

#### HTTP Endpoints (Webhooks)

```typescript
// Vapi webhook receiver
POST /vapi-webhook
  └─→ Handles: function-call, transcript, end-of-call-report
  └─→ Routes to appropriate handler
  └─→ Returns 200 (must respond within 7.5s)
```

---

## API Integration

### Vapi Integration

**Authentication:**
```typescript
const vapi = new Vapi(process.env.VITE_VAPI_PUBLIC_KEY);
```

**Starting a call:**
```typescript
const call = await vapi.start({
  assistantId: ASSISTANT_ID,
  metadata: {
    debateId,
    userId,
    topic,
    position
  }
});
```

**Event handling:**
```typescript
vapi.on("speech-start", () => setIsUserSpeaking(true));
vapi.on("speech-end", () => setIsUserSpeaking(false));
vapi.on("message", handleVapiMessage);
vapi.on("error", handleError);
```

### OpenRouter Integration

**Authentication:**
```typescript
const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});
```

**Technique detection:**
```typescript
const analysis = await openrouter.chat.completions.create({
  model: "anthropic/claude-3-opus",
  messages: [{
    role: "system",
    content: TECHNIQUE_DETECTION_PROMPT
  }, {
    role: "user",
    content: `User: "${userStatement}"\nAI: "${aiResponse}"`
  }],
  response_format: { type: "json_object" }
});
```

### Convex Client Integration

**React hooks:**
```typescript
// Query (read data, auto-subscribes)
const debates = useQuery(api.debates.list, { userId });

// Mutation (write data)
const createDebate = useMutation(api.debates.create);

// Action (external API call)
const analyzeDebate = useAction(api.analysis.generateFull);
```

**From Convex functions:**
```typescript
// Query another table
const user = await ctx.db.get(userId);

// Run mutation
await ctx.runMutation(internal.techniques.log, { ... });

// Run action
await ctx.runAction(internal.analysis.generate, { ... });
```

---

## Real-time Communication

### Convex Subscriptions

Convex provides automatic real-time updates via WebSocket:

```typescript
// Frontend automatically subscribes
const liveTechniques = useQuery(api.techniques.getLive, { debateId });

// Updates automatically when data changes in Convex
// No manual WebSocket management needed
```

### Vapi WebSocket

Vapi maintains WebSocket connection for:
- Audio streaming (bidirectional)
- Real-time transcription updates
- Event notifications (speech-start, speech-end, etc.)

```typescript
// Handled automatically by Vapi SDK
vapi.on("speech-update", (event) => {
  console.log("Partial transcript:", event.transcript);
});
```

---

## Security Considerations

### Authentication

**Convex Auth:**
- JWT-based authentication
- Secure token storage
- Built-in session management
- Auth checks on all mutations/queries

```typescript
// Server-side auth check
export const createDebate = mutation({
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity();
    if (!userId) throw new Error("Not authenticated");
    // ... create debate
  }
});
```

### API Key Management

**Environment Variables:**
```bash
# Public (client-side)
VITE_CONVEX_URL=https://your-app.convex.cloud
VITE_VAPI_PUBLIC_KEY=your-public-key

# Private (server-side only)
OPENROUTER_API_KEY=your-key
VAPI_PRIVATE_KEY=your-key
WEBHOOK_SECRET=your-secret
```

### Webhook Security

**Vapi Webhook Authentication:**
```typescript
// Verify webhook signature
const signature = request.headers.get("vapi-signature");
const isValid = verifySignature(signature, webhookSecret);
if (!isValid) throw new Error("Invalid webhook");
```

### Data Privacy

**Audio Storage:**
- Audio streams not stored by default
- Transcripts stored in Convex
- User can request deletion
- GDPR-compliant data handling

**User Data:**
- Debates belong to users (row-level security)
- Analysis private to user
- No sharing without explicit consent

---

## Performance Considerations

### Voice Latency

**Target:** < 500ms end-to-end
**Typical:** 800ms-1200ms

**Optimization strategies:**
1. Use Deepgram (fastest transcriber)
2. Use GPT-4 Turbo (faster than Claude for real-time)
3. Minimize LLM prompt size
4. Use streaming TTS
5. CDN for frontend assets

### Database Performance

**Convex Optimization:**
- Indexes on frequent queries
- Pagination for large result sets
- Selective field loading
- Caching on frontend

```typescript
// Good: indexed query
.index("by_user", ["userId"])

// Good: pagination
{ paginationOpts: { numItems: 20, cursor } }

// Good: only load needed fields
return { id: debate._id, topic: debate.topic };
```

### Cost Optimization

**Vapi costs:** ~$0.05/min + provider costs
**OpenRouter costs:** ~$0.01-0.20/min depending on model
**Convex costs:** Free tier covers development, scales with usage

**Strategies:**
1. Use GPT-3.5 for testing
2. Cache analysis results
3. Implement debate duration limits
4. Use cheaper TTS for non-critical audio

---

## Monitoring and Observability

### Metrics to Track

**User Metrics:**
- Debate start rate
- Debate completion rate
- Average debate duration
- Technique detection accuracy (user-reported)

**Technical Metrics:**
- Voice latency (p50, p95, p99)
- Webhook success rate
- API error rates
- Database query performance

**Business Metrics:**
- Cost per debate
- Active users
- Retention rate
- Feature usage

### Error Handling

**Frontend:**
```typescript
try {
  await vapi.start(config);
} catch (error) {
  if (error.code === "PERMISSIONS_DENIED") {
    showMicrophoneHelp();
  } else if (error.code === "NETWORK_ERROR") {
    showNetworkError();
  } else {
    showGenericError();
  }
}
```

**Backend:**
```typescript
export const handleWebhook = httpAction(async (ctx, request) => {
  try {
    const data = await request.json();
    await processWebhook(ctx, data);
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    // Still return 200 to prevent Vapi retries
    return new Response(null, { status: 200 });
  }
});
```

---

## Deployment Architecture

### Development Environment

```
Local Machine
├── Frontend: npm run dev (localhost:3000)
├── Convex: npx convex dev (local backend)
└── ngrok: ngrok http 3000 (Vapi webhooks)
```

### Production Environment

```
Netlify (Frontend)
└─→ https://wineveryargument.com
    └─→ Static React app
    
Convex Cloud (Backend)
└─→ https://your-app.convex.cloud
    └─→ Serverless functions + database
    └─→ WebSocket server for real-time
    
Vapi (Voice)
└─→ Connects to user browsers
    └─→ Webhooks to Convex
    
OpenRouter (AI)
└─→ Called from Convex actions
```

### CI/CD Pipeline

```
GitHub
└─→ Push to main
    └─→ Netlify auto-deploys frontend
    └─→ Convex auto-deploys backend
    └─→ No downtime
```

---

## Scalability Considerations

### Horizontal Scaling

**Convex:** Automatically scales
- Serverless functions scale to demand
- Database sharded automatically
- No configuration needed

**Vapi:** Per-account limits
- Default: 10 concurrent calls
- Enterprise: 100+ concurrent calls
- Contact Vapi for scaling

### Vertical Scaling

**Database:**
- Convex indexes handle growth
- Pagination for large queries
- Archive old debates if needed

**Cost Scaling:**
- Linear with active users
- ~$1-3 per user per month
- Volume discounts available

---

## Technology Decision Rationale

### Why Convex?
- Real-time out of the box (critical for live debates)
- No infrastructure management
- Excellent TypeScript support
- Built-in auth
- Generous free tier

### Why Vapi?
- Handles complex voice orchestration
- Natural interruption handling
- Multiple provider options
- Good documentation
- Reasonable pricing

### Why TanStack Start?
- Modern React framework
- Type-safe routing
- Good performance
- Active development
- Familiar to React developers

### Why OpenRouter?
- Access to multiple models
- Fallback options
- Simple API
- Good pricing
- No vendor lock-in

---

This architecture provides a solid foundation for a production-ready debate training platform with real-time capabilities, scalability, and manageable costs.

