# Implementation Phases

This document outlines the phased development approach for the Win Every Argument platform. Each phase builds on the previous one, with clear deliverables and success criteria.

---

## 🚀 Latest Update (Nov 20, 2024)

### Phase 3 Major Milestone Completed

**✅ Opponent Profile & Prep Materials System**

- Comprehensive AI-generated prep materials using GPT-4o
  - CheatSheet (400-600 words) with techniques, receipts, zingers
  - Opening Statement (75-90 words) with hook and evidence
  - Debate Notes (800-1200 words) with strategic timing guidance
  - Opponent Talking Points (difficulty-adjusted: 3-10 arguments)
- Quality validation with logging
- Strategic framework incorporated (timing, emotional intelligence, context-awareness)

**✅ Prep Screen & Materials Access**

- Pre-debate prep screen for reviewing/editing materials
- Toggle panel during live debate (floating 📝 button → bottom sheet)
- Dashboard flow: Challenge → Prep → Debate
- Smooth animations and responsive design

**✅ All 11 Debate Techniques Implemented**

- Concession & Pivot, Receipts, Zinger, Reframing, Preemption
- Provocative Question, Personal Story, Rule of Three
- Peroration, Gish Gallop, Strategic Interruption
- Each with dedicated scoring functions

**✅ Cost Optimization**

- Fixed expensive claude-3-opus default (was being used everywhere!)
- Switched to anthropic/claude-sonnet-4.5 for analysis functions
- Kept openai/gpt-4o for prep materials generation (quality matters)
- Removed unnecessary max_tokens restrictions
- **Result:** 10x cost reduction, faster responses

**🎯 Phase 3 Status: ~85% Complete**

- Remaining: Topic generation suggestions, document upload, missed opportunity detection refinement

---

## Phase Overview

- **Phase 1 (Week 1):** MVP - Core Debate Experience
- **Phase 2 (Week 2):** Technique Detection & Analysis
- **Phase 3 (Week 3):** Opponent Preparation & Advanced Features
- **Phase 4 (Week 4+):** Polish, Optimization & Launch
- **Phase 5:** Enhanced Analysis & Intelligence
- **Phase 6:** Research Mode (Firecrawl Integration)

---

## Phase 1: MVP - Core Debate Experience

**Duration:** Week 1 (5-7 days)  
**Goal:** Get a working debate from start to finish

### Current Status

- ✅ TanStack Start project initialized
- ✅ Convex backend configured
- ✅ Convex Auth working
- ✅ Users table exists (from auth)
- ✅ VAPI_API_KEY configured in Convex dashboard
- ✅ OPENROUTER_API_KEY configured in Convex dashboard
- ✅ Database schema implemented (debates and exchanges tables)
- ✅ Vapi Web SDK installed and integrated
- ✅ Convex webhook endpoint working
- ✅ Frontend debate interface complete
- ✅ Vapi assistant configured and tested
- ✅ Voice conversation working end-to-end

### Deliverables

#### 1.1 Database Schema

Add to `convex/schema.ts`:

- [x] `debates` table with basic fields:
  - userId
  - topic
  - status
  - startedAt
  - completedAt
  - duration
  - vapiCallId (optional)
- [x] `exchanges` table for turn-by-turn tracking:
  - debateId
  - speaker (user/ai)
  - text
  - timestamp

#### 1.2 Install Vapi SDK

- [x] Install `@vapi-ai/web` package:
  ```bash
  npm install @vapi-ai/web
  ```

#### 1.3 Vapi Assistant Setup

- [x] Create assistant in Vapi Dashboard OR via API
- [x] Configure basic system prompt for debate opponent
- [x] Set up model (OpenAI GPT-4o recommended)
- [x] Configure voice settings
- [x] Configure transcriber settings
- [x] Set webhook URL to Convex HTTP endpoint

#### 1.4 Convex Webhook Endpoint

Add to `convex/http.ts`:

- [x] Create HTTP route at `/vapi-webhook`
- [x] Handle basic webhook events:
  - `transcript` - Store conversation turns
  - `end-of-call-report` - Mark debate complete
- [x] Store transcripts in `exchanges` table

#### 1.5 Frontend: Debate Interface

- [x] Create debate route/page component
- [x] "Start Debate" button
- [x] Initialize Vapi Web SDK on button click
- [x] Request microphone permissions
- [x] Visual indicators:
  - [x] User speaking indicator
  - [x] AI speaking indicator
  - [x] Timer display (counts up)
- [x] "End Debate" button
- [x] Basic transcript display (optional for MVP)

#### 1.6 Simple AI Opponent

- [x] Hardcoded debate topic (e.g., "Climate change requires immediate action")
- [x] Basic conversational AI that argues opposing position
- [x] Natural turn-taking (Vapi handles this)
- [x] No technique tracking yet (just natural debate conversation)

### Scope Limitations for Phase 1

**What's INCLUDED:**

- One-click start with hardcoded topic
- Basic voice conversation
- 5-minute timer
- Simple transcript storage
- End of debate

**What's EXCLUDED:**

- Technique detection
- Performance analysis
- Custom topics
- Opponent configuration
- Progress tracking
- Multiple AI personalities

### Success Criteria

- [x] User can start a debate in < 30 seconds
- [x] Natural voice conversation works
- [x] Interruptions handled properly
- [x] Transcript saved to database
- [x] Voice latency < 1 second
- [x] Zero crashes during 5-minute debate

### Technical Tasks

#### Day 1: Vapi Setup & Database Schema

```bash
# Install Vapi Web SDK
npm install @vapi-ai/web

# Add to convex/env.ts (if not already exported):
export const VAPI_API_KEY = process.env.VAPI_API_KEY;
export const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

# Update Convex schema
# convex/schema.ts - Add debates and exchanges tables

# Add HTTP endpoint for webhooks
# convex/http.ts - Add /vapi-webhook route
```

#### Day 2-3: Vapi Integration

- Create assistant in Vapi Dashboard
- Configure system prompt for debate opponent
- Set webhook URL to Convex endpoint
- Test webhook delivery with ngrok locally
- Implement basic webhook handlers (transcript, end-of-call-report)

#### Day 4: Frontend UI

- Create debate interface component
- Integrate Vapi Web SDK
- Add start/stop debate buttons
- Add visual speaking indicators
- Add timer display
- Handle microphone permissions

#### Day 5: Testing & Polish

- Test full debate flow end-to-end
- Fix any webhook issues
- Test interruptions
- Verify transcript storage
- Basic error handling

### Estimated Effort

- Database schema: 0.5 day
- Vapi assistant setup: 0.5 day
- Webhook integration: 1-2 days
- Basic UI: 1 day
- Testing & debugging: 1 day
- **Total: 4-5 days**

### Implementation Examples

#### Convex Schema (convex/schema.ts)

Add to existing schema:

```typescript
// Add these tables to your existing schema
debates: defineTable({
  userId: v.id("users"),
  topic: v.string(),
  userPosition: v.string(), // "pro" or "con"
  aiPosition: v.string(),
  status: v.union(
    v.literal("active"),
    v.literal("completed"),
    v.literal("abandoned")
  ),
  startedAt: v.number(),
  completedAt: v.optional(v.number()),
  duration: v.optional(v.number()), // seconds
  vapiCallId: v.optional(v.string()),
}).index("by_user", ["userId"]),

exchanges: defineTable({
  debateId: v.id("debates"),
  speaker: v.union(v.literal("user"), v.literal("assistant")),
  text: v.string(),
  timestamp: v.number(),
}).index("by_debate", ["debateId"]),
```

#### Vapi Webhook Handler (convex/http.ts)

Add this route to your existing `http` router:

```typescript
// Add this route to your existing http router
http.route({
  path: "/vapi-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    const { message } = body;

    console.log("Vapi webhook:", message.type);

    switch (message.type) {
      case "transcript":
        await ctx.runMutation(internal.debates.addTranscript, {
          debateId: message.call.metadata.debateId,
          speaker: message.role === "user" ? "user" : "assistant",
          text: message.transcript,
          timestamp: Date.now(),
        });
        break;

      case "end-of-call-report":
        await ctx.runMutation(internal.debates.complete, {
          debateId: message.call.metadata.debateId,
          duration: message.call.duration,
        });
        break;
    }

    return new Response(null, { status: 200 });
  }),
});
```

#### Frontend Component

```typescript
import { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";

import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export function DebateInterface() {
  const vapiRef = useRef<Vapi | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const createDebate = useMutation(api.debates.create);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_VAPI_PUBLIC_API_KEY;
    vapiRef.current = new Vapi(apiKey);

    const vapi = vapiRef.current;

    vapi.on("call-start", () => {
      setIsSessionActive(true);
    });

    vapi.on("call-end", () => {
      setIsSessionActive(false);
    });

    return () => {
      vapi?.stop();
    };
  }, []);

  const handleStart = async () => {
    // Create debate record
    const debateId = await createDebate({
      topic: "Climate change requires immediate action",
      userPosition: "pro",
      aiPosition: "con",
    });

    // Start Vapi call
    if (vapiRef.current) {
      await vapiRef.current.start(
        import.meta.env.VITE_VAPI_ASSISTANT_ID,
        undefined,
        undefined,
        undefined,
        undefined,
        {
          metadata: {
            debateId,
          },
        }
      );
    }
  };

  const handleStop = async () => {
    if (vapiRef.current) {
      await vapiRef.current.stop();
    }
  };

  return (
    <div>
      <h1>Practice Debate</h1>
      <p>Topic: Climate change requires immediate action</p>

      {!isSessionActive ? (
        <button onClick={handleStart}>Start Debate</button>
      ) : (
        <button onClick={handleStop}>End Debate</button>
      )}
    </div>
  );
}
```

#### Basic Assistant Prompt

```
You are a debate opponent arguing AGAINST immediate climate action.

Your position: Climate policy should focus on gradual economic transition rather than immediate drastic measures.

Key arguments:
- Economic disruption from rapid change
- Need for technological innovation timeline
- Global coordination challenges
- Impact on developing nations

Debate naturally and conversationally. Make compelling arguments but allow the user to respond. Keep responses under 30 seconds of speech.
```

---

## Phase 2: Technique Detection & Analysis

**Duration:** Week 2 (5-7 days)  
**Goal:** Teach users debate techniques with real-time feedback

### Deliverables

#### 2.1 Technique Detection System

- [x] Implement OpenRouter analysis function
- [x] Function calling from Vapi to Convex (Replaced with Transcript Webhook -> Analysis workflow)
- [x] Real-time technique identification
- [x] Effectiveness scoring (1-10)

#### 2.2 Expanded Database Schema

- [x] Techniques table
- [x] Analyses table
- [ ] Progress tracking table

#### 2.3 Three Core Techniques (Start Simple)

Focus on these three most common techniques:

- [x] **Concession & Pivot** - Most important defensive technique
- [x] **Receipts** - Evidence deployment
- [x] **Zinger** - Memorable one-liners

#### 2.4 Live Feedback UI

- [x] Technique badges appear when detected
- [x] Effectiveness score display
- [ ] Running tally of techniques used
- [ ] Visual highlighting during debate

#### 2.5 Post-Debate Analysis

- [x] Full transcript with annotations
- [x] Technique usage summary
- [x] Basic effectiveness scores
- [x] One actionable improvement tip

#### 2.6 Enhanced AI Opponent

- [x] AI uses the three core techniques
- [x] AI calls logTechnique function (AI focus on debate, backend handles logging)
- [ ] More sophisticated debate logic

### Technical Implementation

```typescript
// Key functions to implement:
- analyzeExchange() - Detect techniques in real-time
- logTechnique() - Store technique usage
- generateAnalysis() - Create post-debate report
- scoreTechnique() - Calculate effectiveness
```

### Success Criteria

- [x] Users can configure opponent in < 2 minutes
- [x] AI accurately uses provided talking points
- [x] All techniques implemented with scoring
- [x] Prep materials generated with professional quality
- [x] Toggle panel accessible during live debate
- [ ] All techniques detected with 80%+ accuracy (ongoing tuning)
- [ ] Missed opportunities identified correctly
- [ ] Users can track improvement over time

### Estimated Effort

- Opponent profiles: 2 days
- Remaining techniques: 2 days
- Enhanced analysis: 1 day
- Progress tracking: 1 day
- **Total: 6 days**

---

## Phase 3: Opponent Preparation & Advanced Features

**Duration:** Week 3 (5-7 days)  
**Goal:** Enable preparation for real debates

### Current Status (Nov 20, 2024)

✅ **~85% Complete**

- Opponent profile system ✅
- AI-generated prep materials (GPT-4o) ✅
- Prep screen with editable materials ✅
- Toggle panel during live debate ✅
- All 11 debate techniques ✅
- Cost optimization (opus→sonnet-4.5) ✅

### Deliverables

#### 3.1 Opponent Profile System ✅

- [x] Create opponent profile form
- [x] Talking points input/editing
- [x] Style configuration (aggressive, socratic, academic, political)
- [x] Difficulty setting (easy, medium, hard)
- [x] Save/load profiles

#### 3.2 AI-Generated Prep Materials ✅

Using GPT-4o for quality:

- [x] **CheatSheet** (400-600 words): Core arguments, 5-7 receipts, technique examples, opponent counters table
- [x] **Opening Statement** (75-90 words): Hook, position, evidence, emotional frame
- [x] **Debate Notes** (800-1200 words): 7-10 receipts, advanced techniques, anticipated arguments, flow strategy
- [x] **Opponent Talking Points**: Difficulty-adjusted (3-5/5-7/7-10), style-adjusted tone
- [x] Strategic framework: timing, emotional intelligence, context-awareness
- [x] Quality validation with logging

#### 3.3 Prep Screen & Materials Access ✅

- [x] Pre-debate prep screen (review/edit materials)
- [x] Toggle panel during live debate (📝 floating button → bottom sheet with tabs)
- [x] Dashboard flow: Challenge → Prep → Debate
- [x] Smooth animations

#### 3.4 Custom Debate Configuration ✅

- [x] Topic/position/style/difficulty selection
- [ ] Topic generation suggestions (AI suggests topics)
- [ ] Document upload for context

#### 3.5 All 11 Techniques ✅

- [x] Concession & Pivot, Receipts, Zinger
- [x] Reframing, Preemption, Provocative Question
- [x] Personal Story, Rule of Three, Peroration
- [x] Gish Gallop, Strategic Interruption
- [x] Scoring functions in `convex/lib/scoring.ts`

#### 3.6 Enhanced Analysis ✅

- [x] Post-debate analysis generation
- [x] Winner determination, key moments
- [ ] Sophisticated missed opportunity detection

#### 3.7 Cost Optimization ✅

- [x] Fixed expensive claude-3-opus default
- [x] Switched to anthropic/claude-sonnet-4.5 (10x cheaper)
- [x] Kept GPT-4o for prep materials (quality matters)

### Success Criteria

- [x] Configure opponent < 2 minutes
- [x] Professional-quality prep materials
- [x] Toggle panel accessible during debate
- [ ] 80%+ technique detection accuracy (tuning)

### Effort: 8.5 days (7.5 complete ✅, 1 pending)

---

## Phase 4: Polish, Optimization & Launch

**Duration:** Week 4+ (Ongoing)  
**Goal:** Production-ready platform

### Deliverables



#### 4.2 Error Handling & Reliability

- [ ] Graceful voice failure handling
- [ ] Clear error messages for users

#### 4.3 Advanced Features
- [ ] VERY. IMPORTANT!!! Add friendly debate mode to model after debates between friends just hanging out
- [ ] Add ability to set voices of the AI in oponenyt creationso that user has more variety while debating 
- [ ] Debate formats (Oxford, Parliamentary, Lincoln-Douglas)
- [ ] Practice modes (technique-specific drills)
- [ ] Social features (share debates, leaderboards)
- [ ] Coach mode (more aggressive hints)

#### 4.4 Cost Monitoring & Control

- [ ] Per-debate cost tracking
- [ ] Usage analytics
- [ ] Budget alerts
- [ ] Cost optimization recommendations

#### 4.5 User Onboarding

- [ ] Tutorial debate (guided)
- [ ] Technique explainer screens
- [ ] Sample debates to watch
- [ ] First-time user flow

#### 4.6 Polish & UX

- [ ] Responsive design for mobile
- [ ] Accessibility improvements
- [ ] Loading states and animations
- [ ] Polished visual design



#### 4.8 Documentation

- [ ] User guide
- [ ] Video tutorials
- [ ] FAQ
- [ ] Troubleshooting guide

### Launch Checklist

- [ ] All Phase 1-3 features working
- [ ] < 500ms voice latency
- [ ] 85%+ technique detection accuracy
- [ ] Zero critical bugs
- [ ] Cost monitoring in place
- [ ] User documentation complete
- [ ] Terms of service and privacy policy
- [ ] Payment integration (if applicable)
- [ ] Analytics tracking
- [ ] Backup and recovery procedures

### Success Criteria

- [ ] 90% of debates complete without errors
- [ ] Average user satisfaction > 4.5/5
- [ ] Users return for 2nd debate > 60%
- [ ] Average debate duration > 4 minutes (engagement)
- [ ] Support requests < 5% of users

### Estimated Effort

- Performance optimization: 2-3 days
- Error handling: 2 days
- Advanced features: 3-5 days (ongoing)
- Testing & QA: 3-4 days
- Polish & UX: 2-3 days
- Documentation: 2 days
- **Total: 14-19 days**

---

## Phase 5: Enhanced Analysis & Intelligence

**Goal:** Advanced technique detection and emotional intelligence

### Deliverables

- Improved prompts for technique detection and scoring
- Enhanced and more detailed AI explanations for technique decisions
- Vapi emotion detection
- Better emotional intelligence
- Audience awareness
- Strategic interruption detection

---

## Phase 6: Research Mode (Firecrawl Integration)

**Goal:** Web research and evidence gathering for debates

### Deliverables

1. Use firecrawl to scrape the web to grab articles during "research mode"
2. AI summarizes articles with TLDR and sources
3. Articles stored with opponent in folder
4. Feed articles to AI for argument generation
5. Notes, should have opening statement, peroration as described in how to win every argument. A section for the raw facts. Predictied arguments and how to react to it. Possible zingers and areas wwhere zingers might be. Follow the Ai logic and technique, techniques md where it explains much about our techniques. but alos look at the existing prompts and shit but above all just do research into the book how to win every argument with the mindset of what this section is about and get the best notes, both for what we'll read to prepare and for the parts that will be vieable during the debate via our toggle button. Also 

**Note:** The current cheat sheet implementation is inadequate and will be completely replaced in this phase. Do not use the current implementation as precedence.

---

## Development Environment Setup

### Prerequisites

- Node.js 18+
- npm or pnpm
- Git
- ngrok (for local Vapi webhook testing)

### Initial Setup

```bash
# 1. Create project
npm create vite@latest win-every-argument -- --template react-ts
cd win-every-argument

# 2. Install dependencies
npm install convex @tanstack/react-router vapi-sdk @tanstack/react-query

# 3. Initialize Convex
npx convex dev
# This creates convex/ directory and starts dev server

# 4. Set up environment variables
cp .env.example .env
# Add your API keys:
# - VITE_CONVEX_URL
# - VITE_VAPI_PUBLIC_KEY
# - OPENROUTER_API_KEY (server-side)
# - ELEVENLABS_API_KEY (in Vapi dashboard)

# 5. Set up ngrok for local webhook testing
ngrok http 3000

# 6. Configure Vapi
# - Go to dashboard.vapi.ai
# - Create new assistant
# - Set webhook URL to your ngrok URL + /vapi-webhook
```

### Development Workflow

```bash
# Terminal 1: Convex backend
npx convex dev

# Terminal 2: Frontend dev server
npm run dev

# Terminal 3: ngrok (for Vapi webhooks)
ngrok http 3000

# Update Vapi webhook URL when ngrok restarts
```

---
