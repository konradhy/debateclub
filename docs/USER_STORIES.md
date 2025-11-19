# User Stories and Features

This document contains detailed user stories, acceptance criteria, and implementation guidance for all platform features.

---

## Table of Contents

1. [Epic 1: Core Debate Experience](#epic-1-core-debate-experience)
2. [Epic 2: Technique Detection & Coaching](#epic-2-technique-detection--coaching)
3. [Epic 3: Opponent Preparation Mode](#epic-3-opponent-preparation-mode)
4. [Epic 4: Live Coaching](#epic-4-live-coaching)
5. [Epic 5: Performance Analysis](#epic-5-performance-analysis)

---

## Epic 1: Core Debate Experience

### US-1.1: Quick Start Debate

**As a** user  
**I want to** start a debate within 30 seconds  
**So that** I can practice without friction

#### Acceptance Criteria

- [ ] One-click start with default settings
- [ ] Voice check takes < 5 seconds
- [ ] AI introduces topic and takes position
- [ ] Timer starts automatically
- [ ] No configuration required

#### Technical Implementation

**Frontend Component:**
```typescript
function QuickDebate() {
  const [isReady, setIsReady] = useState(false);
  const vapi = useVapi();
  const { userId } = useAuth();
  const startDebate = useMutation(api.debates.create);
  
  const handleQuickStart = async () => {
    try {
      // Create debate record
      const debateId = await startDebate({
        topic: "Should social media be regulated?",
        userPosition: "pro",
        aiPosition: "con",
        difficulty: "adaptive",
        format: "freestyle",
        aiPersonality: "academic"
      });
      
      // Start Vapi session
      const call = await vapi.start({
        assistantId: process.env.VITE_VAPI_ASSISTANT_ID,
        metadata: { debateId, userId }
      });
      
      // Navigate to debate interface
      navigate(`/debate/${debateId}`);
      
    } catch (error) {
      showError("Failed to start debate. Please check microphone permissions.");
    }
  };
  
  return (
    <button 
      onClick={handleQuickStart}
      className="cta-button"
    >
      Start Practice Debate Now
    </button>
  );
}
```

**Convex Mutation:**
```typescript
export const create = mutation({
  args: {
    topic: v.string(),
    userPosition: v.string(),
    aiPosition: v.string(),
    difficulty: v.string(),
    format: v.string(),
    aiPersonality: v.string()
  },
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity();
    if (!userId) throw new Error("Not authenticated");
    
    const debateId = await ctx.db.insert("debates", {
      userId,
      topic: args.topic,
      userPosition: args.userPosition,
      aiPosition: args.aiPosition,
      difficulty: args.difficulty,
      format: args.format,
      aiPersonality: args.aiPersonality,
      duration: 0,
      status: "active",
      vapiCallId: "",  // Will be updated by webhook
      startedAt: Date.now()
    });
    
    return debateId;
  }
});
```

#### User Experience Flow

1. User lands on homepage
2. Sees prominent "Start Debate" button
3. Clicks button
4. Browser requests microphone permission (if first time)
5. Voice check: "Say something to test your microphone"
6. AI speaks: "I'm ready to debate. The topic is..."
7. Debate begins

#### Design Notes

- Button should be visually prominent
- Loading state during initialization
- Clear error messages if microphone fails
- Option to select different topic (Phase 2)

---

### US-1.2: Configure Opponent

**As a** user preparing for a specific debate  
**I want to** configure my AI opponent with real talking points  
**So that** I can practice against arguments I'll actually face

#### Acceptance Criteria

- [ ] Input opponent's likely arguments
- [ ] Set opponent's debate style
- [ ] Upload reference materials (future)
- [ ] AI adopts these characteristics
- [ ] Save profiles for reuse

#### Technical Implementation

**Frontend Component:**
```typescript
function OpponentConfig() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [talkingPoints, setTalkingPoints] = useState([]);
  const [styleNotes, setStyleNotes] = useState("");
  
  const createProfile = useMutation(api.opponents.create);
  
  const addTalkingPoint = () => {
    setTalkingPoints([...talkingPoints, {
      point: "",
      priority: "medium",
      supportingEvidence: [],
      likelyPhrasing: []
    }]);
  };
  
  const handleSave = async () => {
    const profileId = await createProfile({
      name,
      position,
      talkingPoints,
      styleNotes
    });
    
    navigate(`/opponent/${profileId}`);
  };
  
  return (
    <form onSubmit={handleSave}>
      <input 
        placeholder="Opponent's name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      
      <textarea
        placeholder="Their position on the topic"
        value={position}
        onChange={e => setPosition(e.target.value)}
      />
      
      <div className="talking-points">
        <h3>Their Likely Arguments</h3>
        {talkingPoints.map((tp, i) => (
          <TalkingPointInput 
            key={i}
            value={tp}
            onChange={updated => {
              const newPoints = [...talkingPoints];
              newPoints[i] = updated;
              setTalkingPoints(newPoints);
            }}
          />
        ))}
        <button type="button" onClick={addTalkingPoint}>
          Add Talking Point
        </button>
      </div>
      
      <textarea
        placeholder="Style notes (e.g., 'Tends to interrupt, uses emotional appeals')"
        value={styleNotes}
        onChange={e => setStyleNotes(e.target.value)}
      />
      
      <button type="submit">Save Opponent Profile</button>
    </form>
  );
}
```

**Convex Mutation:**
```typescript
export const create = mutation({
  args: {
    name: v.string(),
    position: v.string(),
    talkingPoints: v.array(v.object({
      point: v.string(),
      priority: v.string(),
      supportingEvidence: v.array(v.string()),
      likelyPhrasing: v.array(v.string())
    })),
    styleNotes: v.string()
  },
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity();
    if (!userId) throw new Error("Not authenticated");
    
    return await ctx.db.insert("opponentProfiles", {
      userId,
      name: args.name,
      description: `Debate opponent: ${args.name}`,
      position: args.position,
      talkingPoints: args.talkingPoints,
      styleNotes: args.styleNotes,
      createdAt: Date.now()
    });
  }
});
```

**Generate AI Prompt from Profile:**
```typescript
export const generatePrompt = action({
  args: { profileId: v.id("opponentProfiles") },
  handler: async (ctx, args) => {
    const profile = await ctx.runQuery(
      internal.opponents.get,
      { id: args.profileId }
    );
    
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    const sortedPoints = profile.talkingPoints
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    
    const promptAddition = `
      You are debating as ${profile.name}.
      Your position: ${profile.position}
      
      YOUR MAIN ARGUMENTS (use these in order of priority):
      ${sortedPoints.map(tp => `
        [${tp.priority.toUpperCase()}] ${tp.point}
        Supporting evidence: ${tp.supportingEvidence.join(', ')}
        Typical phrasing: ${tp.likelyPhrasing.join(' OR ')}
      `).join('\n')}
      
      YOUR DEBATE STYLE: ${profile.styleNotes}
      
      Stay in character and use these specific arguments.
    `;
    
    return promptAddition;
  }
});
```

#### User Experience Flow

1. User clicks "Prepare for Debate"
2. Fills in opponent information
3. Adds talking points with priorities
4. Notes opponent's style
5. Saves profile
6. Can now select this profile when starting debate
7. AI uses these exact arguments

---

### US-1.3: Natural Conversation Flow

**As a** user  
**I want to** interrupt and be interrupted naturally  
**So that** I practice real debate dynamics

#### Acceptance Criteria

- [ ] Can interrupt AI mid-sentence
- [ ] AI can interrupt if I ramble (45+ seconds)
- [ ] System tracks all interruptions
- [ ] Natural voice overlap handling
- [ ] Backchanneling ("yeah", "uh-huh") doesn't interrupt

#### Technical Implementation

**Vapi Configuration:**
```javascript
stopSpeakingPlan: {
  numWords: 2,
  voiceSeconds: 0.2,
  backoffSeconds: 0.5,
  
  // Don't interrupt on these
  acknowledgementPhrases: [
    "yeah", "uh-huh", "right", "okay", "mm-hmm"
  ],
  
  // Always interrupt on these
  interruptionPhrases: [
    "Hold on", "Stop", "Wait", "Actually", "But"
  ]
}
```

**Frontend Event Handling:**
```typescript
useEffect(() => {
  vapi.on('user-interrupted', (event) => {
    // Log the interruption
    logInterruption.mutate({
      debateId,
      interrupter: "user",
      timestamp: Date.now(),
      aiWasSaying: event.partialTranscript
    });
  });
  
  vapi.on('assistant-interrupted', (event) => {
    // AI was cut off - this is strategic!
    if (event.reason === "user-spoke") {
      showFeedback("Strategic interruption detected!");
    }
  });
}, []);
```

**Tracking in Database:**
```typescript
export const logInterruption = mutation({
  args: {
    debateId: v.id("debates"),
    interrupter: v.string(),
    timestamp: v.number(),
    context: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    // Store as technique if strategic
    await ctx.db.insert("techniques", {
      debateId: args.debateId,
      timestamp: args.timestamp,
      speaker: args.interrupter,
      technique: "strategic_interruption",
      effectiveness: 7,  // Analyzed post-debate
      context: args.context || "",
      wasInterruption: true
    });
  }
});
```

---

## Epic 2: Technique Detection & Coaching

### US-2.1: Real-time Technique Recognition

**As a** user  
**I want to** see when I use techniques correctly  
**So that** I get positive reinforcement

#### Acceptance Criteria

- [ ] Visual indicator when technique detected
- [ ] Name of technique appears
- [ ] Effectiveness score shown (1-10)
- [ ] Running tally of techniques used
- [ ] Toast notification for high-scoring techniques

#### Technical Implementation

**Real-time Detection:**
```typescript
// Vapi assistant calls this function
functions: [{
  name: "logTechnique",
  description: "Record when a debate technique is used",
  parameters: {
    type: "object",
    properties: {
      speaker: { type: "string", enum: ["user", "ai"] },
      technique: { type: "string" },
      effectiveness: { type: "number", minimum: 1, maximum: 10 },
      context: { type: "string" }
    }
  }
}]
```

**Webhook Handler:**
```typescript
export const logTechnique = mutation({
  args: {
    debateId: v.id("debates"),
    speaker: v.string(),
    technique: v.string(),
    effectiveness: v.number(),
    context: v.string()
  },
  handler: async (ctx, args) => {
    const techniqueId = await ctx.db.insert("techniques", {
      debateId: args.debateId,
      timestamp: Date.now(),
      speaker: args.speaker,
      technique: args.technique,
      effectiveness: args.effectiveness,
      context: args.context,
      wasInterruption: false
    });
    
    // Check if key moment
    if (args.effectiveness >= 9) {
      await ctx.db.insert("exchanges", {
        debateId: args.debateId,
        keyMoment: true,
        // ... other fields
      });
    }
    
    return techniqueId;
  }
});
```

**Frontend Display:**
```typescript
function TechniqueTracker({ debateId }) {
  // Real-time subscription
  const techniques = useQuery(api.techniques.live, { debateId });
  
  useEffect(() => {
    if (techniques?.length > 0) {
      const latest = techniques[techniques.length - 1];
      if (latest.speaker === "user" && latest.effectiveness >= 8) {
        toast.success(
          `${formatTechniqueName(latest.technique)} - ${latest.effectiveness}/10`,
          { icon: "🎯" }
        );
      }
    }
  }, [techniques]);
  
  return (
    <div className="technique-tracker">
      <h3>Techniques Used</h3>
      {techniques?.map(t => (
        <div 
          key={t._id}
          className={`technique-badge ${t.speaker}`}
        >
          <span className="name">{formatTechniqueName(t.technique)}</span>
          <span className="score">{t.effectiveness}/10</span>
        </div>
      ))}
    </div>
  );
}
```

---

### US-2.2: Missed Opportunity Alerts

**As a** user  
**I want to** know when I missed using a technique  
**So that** I learn to recognize opportunities

#### Acceptance Criteria

- [ ] Post-exchange analysis shows missed chances
- [ ] Example of how to use technique
- [ ] Not intrusive during debate
- [ ] Available in post-debate review
- [ ] Prioritized by importance

#### Technical Implementation

**AI Analysis:**
```typescript
export const identifyMissedOpportunities = action({
  args: {
    debateId: v.id("debates"),
    exchanges: v.array(v.any())
  },
  handler: async (ctx, args) => {
    const analysis = await openrouter.chat.completions.create({
      model: "anthropic/claude-3-opus",
      messages: [{
        role: "system",
        content: `
          Analyze this debate for MISSED opportunities to use techniques.
          
          For each exchange, identify:
          1. What technique could have been used
          2. Why it was a good opportunity
          3. Example of what user could have said
          4. Impact if they had used it (1-10)
          
          Return JSON array of missed opportunities.
        `
      }, {
        role: "user",
        content: JSON.stringify(args.exchanges)
      }],
      response_format: { type: "json_object" }
    });
    
    return JSON.parse(analysis.choices[0].message.content);
  }
});
```

**Display in Analysis:**
```typescript
function MissedOpportunities({ opportunities }) {
  return (
    <div className="missed-opportunities">
      <h3>Missed Opportunities</h3>
      {opportunities.map((opp, i) => (
        <div key={i} className="opportunity">
          <div className="technique-name">{opp.technique}</div>
          <div className="timing">At {formatTime(opp.timestamp)}</div>
          <div className="reason">{opp.reason}</div>
          <div className="example">
            <strong>You could have said:</strong>
            <blockquote>{opp.exampleResponse}</blockquote>
          </div>
          <div className="impact">
            Potential impact: {opp.impact}/10
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## Epic 3: Opponent Preparation Mode

### US-3.1: Talking Points Entry

**As a** user preparing for a real debate  
**I want to** input my opponent's likely arguments  
**So that** I practice against their actual positions

#### Acceptance Criteria

- [ ] Add multiple talking points
- [ ] Rank by likelihood/importance
- [ ] Include typical phrasing
- [ ] Add supporting evidence they might use
- [ ] Preview how AI will use these

#### UI Component

```typescript
function TalkingPointsForm({ profileId }) {
  const [points, setPoints] = useState([]);
  
  return (
    <div className="talking-points-form">
      <h3>Opponent's Likely Arguments</h3>
      
      {points.map((point, index) => (
        <div key={index} className="talking-point">
          <input
            placeholder="Main argument"
            value={point.point}
            onChange={e => updatePoint(index, { point: e.target.value })}
          />
          
          <select
            value={point.priority}
            onChange={e => updatePoint(index, { priority: e.target.value })}
          >
            <option value="high">Will definitely use</option>
            <option value="medium">Likely to use</option>
            <option value="low">Might use if pressed</option>
          </select>
          
          <input
            placeholder="How they typically phrase it"
            value={point.likelyPhrasing[0] || ""}
            onChange={e => updatePoint(index, { 
              likelyPhrasing: [e.target.value] 
            })}
          />
          
          <input
            placeholder="Evidence they cite"
            value={point.supportingEvidence[0] || ""}
            onChange={e => updatePoint(index, { 
              supportingEvidence: [e.target.value] 
            })}
          />
          
          <button onClick={() => removePoint(index)}>Remove</button>
        </div>
      ))}
      
      <button onClick={addPoint}>Add Another Argument</button>
    </div>
  );
}
```

---

## Epic 4: Live Coaching

### US-4.1: Technique Reminders

**As a** user during debate  
**I want to** get subtle technique hints  
**So that** I remember to use various strategies

#### Acceptance Criteria

- [ ] Gentle visual prompts (not audio - would be distracting)
- [ ] Context-aware suggestions
- [ ] Can disable if distracting
- [ ] Based on debate flow

#### Implementation

**Context-Aware Hints:**
```typescript
function LiveCoaching({ debateId, isEnabled }) {
  const currentHint = useQuery(api.coaching.getCurrentHint, { 
    debateId 
  });
  
  if (!isEnabled || !currentHint) return null;
  
  return (
    <div className="coaching-hint">
      <div className="technique-name">{currentHint.technique}</div>
      <div className="suggestion">{currentHint.suggestion}</div>
      <div className="example">{currentHint.example}</div>
    </div>
  );
}
```

**Hint Generation Logic:**
```typescript
export const getCurrentHint = query({
  args: { debateId: v.id("debates") },
  handler: async (ctx, args) => {
    const exchanges = await ctx.db
      .query("exchanges")
      .withIndex("by_debate", q => q.eq("debateId", args.debateId))
      .order("desc")
      .take(3);
    
    // Analyze recent pattern
    const recentTechniques = exchanges
      .flatMap(e => e.userTechniques);
    
    // User hasn't used Rule of Three yet
    if (!recentTechniques.includes("rule_of_three")) {
      return {
        technique: "Rule of Three",
        suggestion: "Try grouping your arguments in threes",
        example: "This fails economically, morally, and practically"
      };
    }
    
    // User has been defensive for multiple turns
    const defensiveCount = exchanges.filter(e => 
      e.exchangeWinner === "ai"
    ).length;
    
    if (defensiveCount >= 2) {
      return {
        technique: "Go on offense",
        suggestion: "Ask a provocative question",
        example: "Let me ask you this..."
      };
    }
    
    return null;
  }
});
```

---

## Epic 5: Performance Analysis

### US-5.1: Debate Replay with Annotations

**As a** user after a debate  
**I want to** review with technique annotations  
**So that** I understand what worked

#### Acceptance Criteria

- [ ] Full transcript with timestamps
- [ ] Techniques highlighted in different colors
- [ ] Effectiveness scores visible
- [ ] Judge's commentary at key moments
- [ ] Playback controls (jump to key moments)

#### Implementation

```typescript
function DebateReplay({ debateId }) {
  const data = useQuery(api.debates.getWithAnalysis, { debateId });
  
  if (!data) return <Loading />;
  
  const { debate, exchanges, techniques, analysis } = data;
  
  return (
    <div className="debate-replay">
      <div className="header">
        <h2>{debate.topic}</h2>
        <div className="metadata">
          {formatDuration(debate.duration)} • 
          {formatDate(debate.startedAt)}
        </div>
      </div>
      
      <div className="key-moments">
        <h3>Jump to Key Moments</h3>
        {analysis.memorableMoments.map(moment => (
          <button
            key={moment.timestamp}
            onClick={() => scrollToTimestamp(moment.timestamp)}
          >
            {formatTime(moment.timestamp)}: {moment.description}
          </button>
        ))}
      </div>
      
      <div className="transcript">
        {exchanges.map(exchange => (
          <div key={exchange._id} className="exchange">
            <div className="user-turn">
              <span className="timestamp">
                {formatTime(exchange.timestamp)}
              </span>
              <div className="speech">
                {highlightTechniques(
                  exchange.userSaid, 
                  exchange.userTechniques
                )}
              </div>
              <div className="techniques">
                {exchange.userTechniques.map(tech => {
                  const details = techniques.find(t => 
                    t.technique === tech && 
                    t.timestamp === exchange.timestamp
                  );
                  return (
                    <span 
                      key={tech} 
                      className={`badge effectiveness-${details.effectiveness}`}
                    >
                      {formatTechniqueName(tech)} - {details.effectiveness}/10
                    </span>
                  );
                })}
              </div>
            </div>
            
            <div className="ai-turn">
              <div className="speech">{exchange.aiSaid}</div>
              {exchange.aiTechniques.map(tech => (
                <span key={tech} className="badge ai">
                  {formatTechniqueName(tech)}
                </span>
              ))}
            </div>
            
            {exchange.keyMoment && (
              <div className="key-moment-marker">
                🔥 Key Moment
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### US-5.2: Improvement Roadmap

**As a** user  
**I want to** get specific practice recommendations  
**So that** I know what to work on next

#### Acceptance Criteria

- [ ] Identifies weakest techniques
- [ ] Suggests specific exercises
- [ ] Shows progress over time
- [ ] Personalized difficulty adjustment

#### Implementation

```typescript
export const generateImprovementPlan = action({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    // Get user's progress on all techniques
    const progress = await ctx.runQuery(
      internal.progress.getAll,
      { userId: args.userId }
    );
    
    // Identify weakest techniques
    const weakest = progress
      .filter(p => p.masteryLevel < 50)
      .sort((a, b) => a.masteryLevel - b.masteryLevel)
      .slice(0, 3);
    
    // Generate specific recommendations
    const recommendations = weakest.map(p => ({
      technique: p.technique,
      currentLevel: p.masteryLevel,
      practiceIdeas: getPracticeIdeas(p.technique),
      estimatedSessions: Math.ceil((70 - p.masteryLevel) / 10)
    }));
    
    return {
      focus: weakest[0].technique,
      recommendations,
      nextDebateSettings: {
        difficulty: calculateOptimalDifficulty(progress),
        aiPersonality: "socratic",  // Helps with technique practice
        enableCoaching: true
      }
    };
  }
});
```

---

## Feature Priority Matrix

### Phase 1 (MVP - Week 1)
- ✅ US-1.1: Quick Start Debate
- ✅ US-1.3: Natural Conversation Flow

### Phase 2 (Week 2)
- ✅ US-2.1: Real-time Technique Recognition (3 techniques only)
- ✅ US-5.1: Debate Replay (basic)

### Phase 3 (Week 3)
- ✅ US-1.2: Configure Opponent
- ✅ US-3.1: Talking Points Entry
- ✅ US-2.1: All 11+ techniques
- ✅ US-2.2: Missed Opportunity Alerts

### Phase 4 (Week 4+)
- ✅ US-4.1: Technique Reminders
- ✅ US-5.2: Improvement Roadmap
- ✅ Advanced analytics
- ✅ Social features

---

This user stories document provides the foundation for feature development, with clear acceptance criteria and implementation guidance for each story.

