# Implementation Phases

This document outlines the phased development approach for the Win Every Argument platform. Each phase builds on the previous one, with clear deliverables and success criteria.

---

## Phase Overview

- **Phase 1 (Week 1):** MVP - Core Debate Experience
- **Phase 2 (Week 2):** Technique Detection & Analysis
- **Phase 3 (Week 3):** Opponent Preparation & Advanced Features
- **Phase 4 (Week 4+):** Polish, Optimization & Launch

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
- [ ] 85%+ accuracy in detecting the three core techniques
- [ ] Technique detection within 2 seconds
- [ ] Post-debate analysis generates in < 10 seconds
- [ ] Analysis provides actionable feedback
- [ ] Users understand which techniques they used

### Estimated Effort
- Technique detection AI: 2 days
- Live UI feedback: 1 day
- Post-debate analysis: 1 day
- Testing & tuning: 1 day
- **Total: 5 days**

---

## Phase 3: Opponent Preparation & Advanced Features
**Duration:** Week 3 (5-7 days)  
**Goal:** Enable preparation for real debates

### Deliverables

#### 3.1 Opponent Profile System
- [ ] Create opponent profile form. Manual or AI mode
- [ ] Talking points input interface
- [ ] Priority ranking for arguments
- [ ] Style notes configuration
- [ ] Save/load opponent profiles

#### 3.2 Custom Debate Configuration
- [ ] Topic selection (ability to give a general topic and a fast AI spits out several options)
- [ ] Position selection (pro/con)
- [ ] AI generated CheatSheet, Opening Statement, and Debate notes togable on analysis page
- [ ] Option to upload documents or text for context for AI to use in creating the topic, and other stuff
- [ ] Difficulty setting
- [ ] Debate AI personality types:
  - Aggressive
  - Socratic
  - Academic
  - Political

#### 3.3 All 11+ Techniques
Implement remaining techniques:
- [ ] Reframing
- [ ] Preemption
- [ ] Provocative Question
- [ ] Personal Story
- [ ] Rule of Three
- [ ] Peroration
- [ ] Gish Gallop Attack
- [ ] Gish Gallop Defense
- [ ] Strategic Interruption

#### 3.4 Enhanced Analysis
- [ ] Identify missed opportunities
- [ ] Key moment detection
- [ ] Winner determination
- [ ] Comprehensive improvement tips
- [ ] Example of how to use missed techniques

#### 3.5 Progress Tracking **WRONG NOT DOING THIS**
- [ ] Technique mastery levels
- [ ] Historical performance
- [ ] Recommended practice areas
- [ ] Streak tracking

### UI/UX Improvements
- [ ] Debate library (past debates)
- [ ] Opponent profile library
- [ ] Progress dashboard
- [ ] Technique reference guide

### Success Criteria
- [ ] Users can configure opponent in < 2 minutes
- [ ] AI accurately uses provided talking points
- [ ] All techniques detected with 80%+ accuracy
- [ ] Missed opportunities identified correctly
- [ ] Users can track improvement over time

### Estimated Effort
- Opponent profiles: 2 days
- Remaining techniques: 2 days
- Enhanced analysis: 1 day
- Progress tracking: 1 day
- **Total: 6 days**




---


NEW PHASE
1. Use firecrawl to scrape the web to grab articles during "research mode"
2. Save these articles and US AI To summarize and grab the main points of it. Along with the source. A TLDR designed to help you understand the content
3. This should be available in to view in a folder, and stored with the oponent
4. The articles the firecrawl scrapes can also be fed into the AI to help come up with arguments



---

## Phase 4: Polish, Optimization & Launch
**Duration:** Week 4+ (Ongoing)  
**Goal:** Production-ready platform

### Deliverables

#### 4.1 Performance Optimization
- [ ] Reduce voice latency to < 500ms
- [ ] Optimize Convex query performance
- [ ] Implement caching strategies
- [ ] Reduce API costs where possible

#### 4.2 Error Handling & Reliability
- [ ] Graceful voice failure handling
- [ ] Webhook retry logic
- [ ] Network interruption recovery
- [ ] Clear error messages for users

#### 4.3 Advanced Features
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

#### 4.7 Testing & QA
- [ ] Load testing (concurrent users)
- [ ] Technique detection accuracy testing
- [ ] Cross-browser testing
- [ ] User acceptance testing

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

## Risk Mitigation

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Voice latency > 1s | Medium | High | Use Deepgram, optimize prompts, cache where possible |
| Technique detection inaccurate | Medium | High | Extensive testing, continuous prompt refinement |
| Vapi costs exceed budget | Low | High | Implement usage limits, cost monitoring |
| Webhook failures | Low | Medium | Retry logic, queue system |
| Concurrent user scaling | Low | Medium | Load testing, Convex handles this well |

### User Experience Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Users don't understand techniques | Medium | High | Better onboarding, tutorial debate |
| Voice permissions confusing | Low | Medium | Clear instructions, troubleshooting |
| AI opponent too difficult | Medium | Medium | Adaptive difficulty, clear level selection |
| Analysis too technical | Low | Medium | Plain language explanations |

---

## Success Metrics by Phase

### Phase 1 Metrics
- Time to first debate < 60 seconds
- Zero crashes during debate
- Voice works for 95% of users

### Phase 2 Metrics
- Technique detection accuracy > 85%
- Users understand feedback (survey)
- Analysis generation < 10 seconds

### Phase 3 Metrics
- 30% of users create opponent profiles
- All techniques detected at 80%+ accuracy
- Users return for 3+ debates

### Phase 4 Metrics
- Production uptime > 99%
- User satisfaction > 4.5/5
- 60%+ retention after first week
- Average 2+ debates per user per week

---

## Post-Launch Roadmap (Future Phases)

### Phase 5: Community Features
- Share debate recordings
- User-created debate topics
- Leaderboards
- Debate challenges between users

### Phase 6: Advanced Training
- Technique-specific drills
- Famous debate recreations
- Expert coaching mode
- Video analysis of real debates

### Phase 7: Platform Expansion
- Mobile apps (iOS/Android)
- Team/classroom features
- Tournament mode
- Integration with debate organizations

---

## Resource Requirements

### Phase 1 (MVP)
- 1 full-stack developer
- Vapi account ($50-100 for testing)
- OpenRouter credits ($20-50)
- Domain and hosting (Netlify free tier)

### Phase 2-3
- 1 full-stack developer
- Increased API costs ($200-400/month for testing)
- Design feedback (optional)

### Phase 4 (Launch)
- 1 full-stack developer
- QA tester (contract or part-time)
- Budget for user testing
- Production API costs (variable based on users)

### Ongoing
- Developer maintenance
- API costs scale with users (~$1-3 per user per month)
- Customer support
- Continuous improvements

---

## Decision Points

### After Phase 1
**Decision:** Does the core experience work?
- **Yes:** Proceed to Phase 2
- **No:** Iterate on core conversation flow

### After Phase 2
**Decision:** Are techniques being detected accurately?
- **Yes:** Proceed to Phase 3
- **No:** Improve AI prompts, possibly switch models

### After Phase 3
**Decision:** Ready for beta launch?
- **Yes:** Invite limited users, proceed to Phase 4
- **No:** Address critical gaps

### After Phase 4
**Decision:** Public launch or extended beta?
- Depends on metrics, feedback, and stability

---

## Timeline Summary

| Phase | Duration | Cumulative | Key Milestone |
|-------|----------|------------|---------------|
| Phase 1 | 5-7 days | Week 1 | First debate works end-to-end |
| Phase 2 | 5-7 days | Week 2 | Technique detection live |
| Phase 3 | 5-7 days | Week 3 | Opponent prep and all techniques |
| Phase 4 | 14-19 days | Week 4-6 | Production-ready platform |
| **Total** | **29-40 days** | **4-6 weeks** | **Public launch** |

---

## Getting Started Today

### Immediate Next Steps (Day 1)

1. **Set up accounts** (2 hours)
   - Create Vapi account
   - Create Convex account  
   - Create OpenRouter account
   - Get API keys

2. **Initialize project** (2 hours)
   - Create TanStack Start project
   - Initialize Convex
   - Basic folder structure

3. **Implement basic schema** (2 hours)
   - Users table
   - Debates table
   - Authentication setup

4. **Create simple Vapi assistant** (2 hours)
   - Basic configuration
   - Test voice conversation
   - Verify webhook connection

**End of Day 1:** You should be able to have a basic voice conversation with AI.

---

## Questions to Resolve Before Starting

1. **Pricing model:** Free tier? Subscription? Per-debate pricing?
2. **User limits:** Concurrent debates? Monthly minutes?
3. **Data retention:** How long to keep debate recordings?
4. **Privacy:** Audio storage policies?
5. **Target audience:** Students? Professionals? General public?

---

This phased approach ensures you have a working product quickly (Phase 1) while building toward a comprehensive platform (Phases 2-4). Each phase is independently valuable and can be evaluated before proceeding to the next.

