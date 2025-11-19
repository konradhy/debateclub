# Database Schema Documentation

This document describes the Convex database schema for the Win Every Argument platform, including all tables, fields, indexes, and relationships.

---

## Table of Contents

1. [Schema Overview](#schema-overview)
2. [Table Definitions](#table-definitions)
3. [Relationships](#relationships)
4. [Indexes](#indexes)
5. [Common Queries](#common-queries)
6. [Migration Strategy](#migration-strategy)

---

## Schema Overview

The database consists of 7 main tables:

```
users
  └── debates
       ├── techniques
       ├── exchanges
       └── analyses
  └── opponentProfiles
  └── progress
```

**Design Principles:**
- Normalized data structure
- Real-time friendly (Convex subscriptions)
- Efficient queries via indexes
- Type-safe with Convex validators

---

## Table Definitions

### 1. Users Table

Stores user accounts and aggregate statistics.

```typescript
users: defineTable({
  email: v.string(),
  name: v.string(),
  skillLevel: v.union(
    v.literal("beginner"),
    v.literal("intermediate"),
    v.literal("advanced")
  ),
  totalDebates: v.number(),
  totalMinutes: v.number(),
  techniquesMastered: v.array(v.string()),
  createdAt: v.number(),
})
.index("by_email", ["email"])
```

**Fields:**
- `email` - User's email address (unique)
- `name` - Display name
- `skillLevel` - Current skill assessment
- `totalDebates` - Lifetime debate count
- `totalMinutes` - Total time spent debating
- `techniquesMastered` - Array of technique names user has mastered
- `createdAt` - Unix timestamp of account creation

**Indexes:**
- `by_email` - Look up users by email address

**Usage:**
```typescript
// Get user by email
const user = await ctx.db
  .query("users")
  .withIndex("by_email", q => q.eq("email", "user@example.com"))
  .unique();
```

---

### 2. Opponent Profiles Table

Stores configured opponent profiles for debate preparation.

```typescript
opponentProfiles: defineTable({
  userId: v.id("users"),
  name: v.string(),
  description: v.string(),
  position: v.string(),
  talkingPoints: v.array(v.object({
    point: v.string(),
    priority: v.union(
      v.literal("high"),
      v.literal("medium"),
      v.literal("low")
    ),
    supportingEvidence: v.array(v.string()),
    likelyPhrasing: v.array(v.string()),
  })),
  styleNotes: v.string(),
  createdAt: v.number(),
})
.index("by_user", ["userId"])
```

**Fields:**
- `userId` - Reference to user who created this profile
- `name` - Opponent's name (e.g., "John Smith" or "Climate Skeptic")
- `description` - Brief description
- `position` - Their stance on the debate topic
- `talkingPoints` - Array of arguments they're likely to use
  - `point` - The main argument
  - `priority` - How likely they are to use it
  - `supportingEvidence` - Facts/studies they cite
  - `likelyPhrasing` - How they typically phrase it
- `styleNotes` - Behavioral notes (e.g., "Tends to interrupt, uses emotional appeals")
- `createdAt` - When this profile was created

**Indexes:**
- `by_user` - Get all profiles for a user

**Usage:**
```typescript
// Get user's opponent profiles
const profiles = await ctx.db
  .query("opponentProfiles")
  .withIndex("by_user", q => q.eq("userId", userId))
  .collect();
```

---

### 3. Debates Table

Stores debate sessions.

```typescript
debates: defineTable({
  userId: v.id("users"),
  topic: v.string(),
  userPosition: v.string(),
  aiPosition: v.string(),
  opponentProfileId: v.optional(v.id("opponentProfiles")),
  format: v.union(
    v.literal("freestyle"),
    v.literal("oxford"),
    v.literal("parliamentary"),
    v.literal("lincoln_douglas")
  ),
  difficulty: v.union(
    v.literal("easy"),
    v.literal("medium"),
    v.literal("hard"),
    v.literal("adaptive")
  ),
  aiPersonality: v.union(
    v.literal("aggressive"),
    v.literal("socratic"),
    v.literal("academic"),
    v.literal("political")
  ),
  duration: v.number(),
  status: v.union(
    v.literal("active"),
    v.literal("completed"),
    v.literal("abandoned")
  ),
  vapiCallId: v.string(),
  startedAt: v.number(),
  completedAt: v.optional(v.number()),
})
.index("by_user", ["userId"])
.index("by_vapi_call", ["vapiCallId"])
```

**Fields:**
- `userId` - User who participated in debate
- `topic` - Debate topic (e.g., "Should healthcare be universal?")
- `userPosition` - User's stance ("pro" or "con")
- `aiPosition` - AI's stance
- `opponentProfileId` - Optional reference to configured opponent
- `format` - Debate format/structure
- `difficulty` - AI opponent difficulty level
- `aiPersonality` - AI behavioral style
- `duration` - Length in seconds
- `status` - Current state of debate
- `vapiCallId` - Vapi call identifier for this debate
- `startedAt` - Unix timestamp of debate start
- `completedAt` - Unix timestamp when completed (if applicable)

**Indexes:**
- `by_user` - Get debates for a user
- `by_vapi_call` - Look up debate by Vapi call ID (for webhooks)

**Usage:**
```typescript
// Get debate from Vapi webhook
const debate = await ctx.db
  .query("debates")
  .withIndex("by_vapi_call", q => q.eq("vapiCallId", callId))
  .unique();
```

---

### 4. Techniques Table

Stores individual technique usage instances.

```typescript
techniques: defineTable({
  debateId: v.id("debates"),
  timestamp: v.number(),
  speaker: v.union(v.literal("user"), v.literal("ai")),
  technique: v.string(),
  effectiveness: v.number(),
  context: v.string(),
  wasInterruption: v.boolean(),
  judgeNotes: v.optional(v.string()),
})
.index("by_debate", ["debateId"])
```

**Fields:**
- `debateId` - Reference to parent debate
- `timestamp` - When technique was used (Unix timestamp)
- `speaker` - Who used it ("user" or "ai")
- `technique` - Technique name (e.g., "concession_pivot")
- `effectiveness` - Score from 1-10
- `context` - What was actually said
- `wasInterruption` - Whether this was delivered as an interruption
- `judgeNotes` - Optional AI judge commentary

**Indexes:**
- `by_debate` - Get all techniques for a debate

**Usage:**
```typescript
// Get all techniques used in a debate
const techniques = await ctx.db
  .query("techniques")
  .withIndex("by_debate", q => q.eq("debateId", debateId))
  .order("asc")
  .collect();
```

**Technique Names:**
- `concession_pivot`
- `reframing`
- `preemption`
- `gish_gallop_attack`
- `gish_gallop_defense`
- `provocative_question`
- `personal_story`
- `rule_of_three`
- `receipts`
- `zinger`
- `peroration`
- `strategic_interruption`

---

### 5. Exchanges Table

Stores turn-by-turn conversation in debates.

```typescript
exchanges: defineTable({
  debateId: v.id("debates"),
  turnNumber: v.number(),
  userSaid: v.string(),
  aiSaid: v.string(),
  userDuration: v.number(),
  aiDuration: v.number(),
  userTechniques: v.array(v.string()),
  aiTechniques: v.array(v.string()),
  exchangeWinner: v.union(
    v.literal("user"),
    v.literal("ai"),
    v.literal("neutral")
  ),
  keyMoment: v.boolean(),
  timestamp: v.number(),
})
.index("by_debate", ["debateId"])
```

**Fields:**
- `debateId` - Reference to parent debate
- `turnNumber` - Sequential turn counter
- `userSaid` - Full text of what user said
- `aiSaid` - Full text of what AI said
- `userDuration` - Seconds user spoke
- `aiDuration` - Seconds AI spoke
- `userTechniques` - Array of technique names user used
- `aiTechniques` - Array of technique names AI used
- `exchangeWinner` - Who won this exchange
- `keyMoment` - Whether this was a pivotal moment
- `timestamp` - When this exchange occurred

**Indexes:**
- `by_debate` - Get exchanges for a debate (in order)

**Usage:**
```typescript
// Get all exchanges in chronological order
const exchanges = await ctx.db
  .query("exchanges")
  .withIndex("by_debate", q => q.eq("debateId", debateId))
  .order("asc")
  .collect();
```

---

### 6. Analyses Table

Stores comprehensive post-debate analysis.

```typescript
analyses: defineTable({
  debateId: v.id("debates"),
  userId: v.id("users"),
  overallWinner: v.union(
    v.literal("user"),
    v.literal("ai"),
    v.literal("draw")
  ),
  userStrengths: v.array(v.string()),
  userWeaknesses: v.array(v.string()),
  techniquesUsedWell: v.array(v.string()),
  missedOpportunities: v.array(v.string()),
  memorableMoments: v.array(v.object({
    timestamp: v.number(),
    description: v.string(),
    impact: v.union(
      v.literal("high"),
      v.literal("medium"),
      v.literal("low")
    )
  })),
  improvementTips: v.array(v.string()),
  nextPracticeRecommendation: v.string(),
  createdAt: v.number(),
})
.index("by_debate", ["debateId"])
```

**Fields:**
- `debateId` - Reference to analyzed debate
- `userId` - User who participated
- `overallWinner` - Who won the debate
- `userStrengths` - Array of things user did well
- `userWeaknesses` - Array of areas to improve
- `techniquesUsedWell` - Techniques user executed successfully
- `missedOpportunities` - Chances to use techniques that were missed
- `memorableMoments` - Key moments in the debate
  - `timestamp` - When it occurred
  - `description` - What happened
  - `impact` - How significant it was
- `improvementTips` - Actionable advice
- `nextPracticeRecommendation` - What to practice next
- `createdAt` - When analysis was generated

**Indexes:**
- `by_debate` - Get analysis for a debate

**Usage:**
```typescript
// Get analysis for a debate
const analysis = await ctx.db
  .query("analyses")
  .withIndex("by_debate", q => q.eq("debateId", debateId))
  .unique();
```

---

### 7. Progress Table

Tracks user's mastery of individual techniques over time.

```typescript
progress: defineTable({
  userId: v.id("users"),
  technique: v.string(),
  attemptCount: v.number(),
  successCount: v.number(),
  averageEffectiveness: v.number(),
  lastPracticed: v.number(),
  masteryLevel: v.number(),
})
.index("by_user_technique", ["userId", "technique"])
```

**Fields:**
- `userId` - User being tracked
- `technique` - Technique name
- `attemptCount` - Total times attempted
- `successCount` - Times used effectively (effectiveness > 6)
- `averageEffectiveness` - Mean effectiveness score
- `lastPracticed` - Unix timestamp of last use
- `masteryLevel` - 0-100 score representing mastery

**Indexes:**
- `by_user_technique` - Get progress for user + technique combo

**Mastery Calculation:**
```typescript
function calculateMastery(
  attemptCount: number,
  successCount: number,
  averageEffectiveness: number
): number {
  // Frequency component (max 40 points)
  const frequencyScore = Math.min(attemptCount * 2, 40);
  
  // Success rate component (max 30 points)
  const successRate = successCount / attemptCount;
  const successScore = successRate * 30;
  
  // Effectiveness component (max 30 points)
  const effectivenessScore = (averageEffectiveness / 10) * 30;
  
  return Math.round(frequencyScore + successScore + effectivenessScore);
}
```

**Usage:**
```typescript
// Get user's progress on a specific technique
const progress = await ctx.db
  .query("progress")
  .withIndex("by_user_technique", q => 
    q.eq("userId", userId).eq("technique", "concession_pivot")
  )
  .unique();
```

---

## Relationships

### Entity Relationship Diagram

```
┌─────────────┐
│    users    │
└──────┬──────┘
       │
       │ 1:N
       │
       ├─────────────────────────────────┬──────────────────────┐
       │                                 │                      │
       ▼                                 ▼                      ▼
┌─────────────────┐             ┌──────────────┐      ┌──────────────┐
│ opponentProfiles│             │   debates    │      │   progress   │
└─────────────────┘             └──────┬───────┘      └──────────────┘
                                       │
                                       │ 1:N
                                       │
                        ┌──────────────┼──────────────┐
                        │              │              │
                        ▼              ▼              ▼
                 ┌────────────┐ ┌───────────┐ ┌───────────┐
                 │ techniques │ │ exchanges │ │ analyses  │
                 └────────────┘ └───────────┘ └───────────┘
```

### Relationship Descriptions

**users → debates (1:N)**
- One user can have many debates
- Each debate belongs to one user

**users → opponentProfiles (1:N)**
- One user can create many opponent profiles
- Each profile belongs to one user

**users → progress (1:N)**
- One user has many progress records (one per technique)
- Each progress record belongs to one user

**debates → techniques (1:N)**
- One debate has many technique usage instances
- Each technique usage belongs to one debate

**debates → exchanges (1:N)**
- One debate has many exchanges (turns)
- Each exchange belongs to one debate

**debates → analyses (1:1)**
- One debate has one analysis
- Each analysis belongs to one debate

**opponentProfiles → debates (1:N - optional)**
- One opponent profile can be used in many debates
- Each debate may optionally reference an opponent profile

---

## Indexes

### Why These Indexes?

Indexes optimize common query patterns:

1. **by_email** (users)
   - Login lookups
   - Fast and unique

2. **by_user** (debates, opponentProfiles)
   - "Show me all my debates"
   - "Show me my opponent profiles"

3. **by_vapi_call** (debates)
   - Webhook handlers need to find debate quickly
   - Used frequently during active debates

4. **by_debate** (techniques, exchanges, analyses)
   - "Show me all data for this debate"
   - Used in analysis and replay views

5. **by_user_technique** (progress)
   - "What's my progress on concession_pivot?"
   - Compound index for specific lookups

### Index Performance

Convex indexes provide:
- O(log n) lookup time
- Automatic ordering
- Range queries
- Efficient pagination

---

## Common Queries

### Get User's Recent Debates

```typescript
export const getRecentDebates = query({
  args: { userId: v.id("users"), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("debates")
      .withIndex("by_user", q => q.eq("userId", args.userId))
      .order("desc")
      .take(args.limit ?? 10);
  }
});
```

### Get Debate with Full Details

```typescript
export const getDebateWithDetails = query({
  args: { debateId: v.id("debates") },
  handler: async (ctx, args) => {
    const debate = await ctx.db.get(args.debateId);
    if (!debate) return null;
    
    const [techniques, exchanges, analysis] = await Promise.all([
      ctx.db
        .query("techniques")
        .withIndex("by_debate", q => q.eq("debateId", args.debateId))
        .collect(),
      ctx.db
        .query("exchanges")
        .withIndex("by_debate", q => q.eq("debateId", args.debateId))
        .order("asc")
        .collect(),
      ctx.db
        .query("analyses")
        .withIndex("by_debate", q => q.eq("debateId", args.debateId))
        .unique()
    ]);
    
    return { debate, techniques, exchanges, analysis };
  }
});
```

### Get User's Technique Mastery Summary

```typescript
export const getTechniqueMastery = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const allProgress = await ctx.db
      .query("progress")
      .withIndex("by_user_technique", q => q.eq("userId", args.userId))
      .collect();
    
    return {
      mastered: allProgress.filter(p => p.masteryLevel >= 80),
      improving: allProgress.filter(p => p.masteryLevel >= 40 && p.masteryLevel < 80),
      needsPractice: allProgress.filter(p => p.masteryLevel < 40),
      overall: allProgress.reduce((sum, p) => sum + p.masteryLevel, 0) / allProgress.length
    };
  }
});
```

### Update Progress After Debate

```typescript
export const updateProgress = mutation({
  args: {
    userId: v.id("users"),
    technique: v.string(),
    effectiveness: v.number()
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("progress")
      .withIndex("by_user_technique", q => 
        q.eq("userId", args.userId).eq("technique", args.technique)
      )
      .unique();
    
    if (existing) {
      // Update existing progress
      const newAttemptCount = existing.attemptCount + 1;
      const newSuccessCount = args.effectiveness > 6 
        ? existing.successCount + 1 
        : existing.successCount;
      
      const newAverage = 
        (existing.averageEffectiveness * existing.attemptCount + args.effectiveness) 
        / newAttemptCount;
      
      const newMastery = calculateMastery(
        newAttemptCount,
        newSuccessCount,
        newAverage
      );
      
      await ctx.db.patch(existing._id, {
        attemptCount: newAttemptCount,
        successCount: newSuccessCount,
        averageEffectiveness: newAverage,
        lastPracticed: Date.now(),
        masteryLevel: newMastery
      });
    } else {
      // Create new progress record
      await ctx.db.insert("progress", {
        userId: args.userId,
        technique: args.technique,
        attemptCount: 1,
        successCount: args.effectiveness > 6 ? 1 : 0,
        averageEffectiveness: args.effectiveness,
        lastPracticed: Date.now(),
        masteryLevel: calculateMastery(1, args.effectiveness > 6 ? 1 : 0, args.effectiveness)
      });
    }
  }
});
```

---

## Migration Strategy

### Adding New Fields

Convex handles schema evolution gracefully:

```typescript
// Old schema
debates: defineTable({
  userId: v.id("users"),
  topic: v.string(),
})

// New schema - add optional field first
debates: defineTable({
  userId: v.id("users"),
  topic: v.string(),
  cost: v.optional(v.number()),  // Optional initially
})

// Later, backfill data for existing debates
export const backfillCosts = internalMutation({
  handler: async (ctx) => {
    const debates = await ctx.db.query("debates").collect();
    for (const debate of debates) {
      if (debate.cost === undefined) {
        await ctx.db.patch(debate._id, {
          cost: debate.duration * 0.002  // Calculate based on duration
        });
      }
    }
  }
});

// Eventually, make it required
debates: defineTable({
  userId: v.id("users"),
  topic: v.string(),
  cost: v.number(),  // Now required
})
```

### Adding New Indexes

```typescript
// Add index to existing table
debates: defineTable({
  // ... existing fields
})
.index("by_user", ["userId"])
.index("by_status", ["status"])  // New index

// Convex rebuilds index automatically
// No manual migration needed
```

### Renaming Fields

```typescript
// Step 1: Add new field as optional
debates: defineTable({
  debateTopic: v.optional(v.string()),  // New name
  topic: v.string(),  // Old name
})

// Step 2: Migrate data
export const migrateTopicField = internalMutation({
  handler: async (ctx) => {
    const debates = await ctx.db.query("debates").collect();
    for (const debate of debates) {
      if (!debate.debateTopic && debate.topic) {
        await ctx.db.patch(debate._id, {
          debateTopic: debate.topic
        });
      }
    }
  }
});

// Step 3: Make new field required, remove old
debates: defineTable({
  debateTopic: v.string(),
  // topic field removed
})
```

---

## Best Practices

### Data Validation

Always validate at the Convex function level:

```typescript
export const createDebate = mutation({
  args: {
    topic: v.string(),
    duration: v.number(),
  },
  handler: async (ctx, args) => {
    // Validate
    if (args.topic.length < 10) {
      throw new Error("Topic must be at least 10 characters");
    }
    if (args.duration < 60 || args.duration > 3600) {
      throw new Error("Duration must be between 1 and 60 minutes");
    }
    
    // Insert
    return await ctx.db.insert("debates", {
      ...args,
      userId: await ctx.auth.getUserIdentity(),
      status: "active",
      startedAt: Date.now()
    });
  }
});
```

### Pagination

For large result sets, use pagination:

```typescript
export const listDebates = query({
  args: {
    userId: v.id("users"),
    paginationOpts: paginationOptsValidator
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("debates")
      .withIndex("by_user", q => q.eq("userId", args.userId))
      .order("desc")
      .paginate(args.paginationOpts);
  }
});
```

### Soft Deletes

Consider soft deletes for important data:

```typescript
debates: defineTable({
  // ... other fields
  deletedAt: v.optional(v.number()),
})

// Instead of db.delete()
await ctx.db.patch(debateId, {
  deletedAt: Date.now()
});

// Filter in queries
const activeDebates = await ctx.db
  .query("debates")
  .filter(q => q.eq(q.field("deletedAt"), undefined))
  .collect();
```

---

This schema provides a solid foundation for the debate platform with efficient queries, clear relationships, and room for future expansion.

