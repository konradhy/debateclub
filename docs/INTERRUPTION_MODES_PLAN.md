# Interruption Modes - Implementation Plan

**Date**: January 1, 2026  
**Phase**: 7.1 AI Interruption Protocol  
**Status**: Planning

---

## The Plan

### Step 1: Strip Out Old Interruption Code
Remove all the confused/unused interruption fields:
- `canInterrupt` boolean
- `interruptionThreshold` number
- `endpointing` in transcriber config
- Misleading system prompt rules

### Step 2: Implement New Speech Plans
Replace with proper Vapi `startSpeakingPlan` and `stopSpeakingPlan` configurations.

### Step 3: Define Clear Modes
Create named modes that users can understand and select.

---

## The 5 Interruption Modes (Final)

### Mode 1: "Off" (Patient Listener)

**Use case**: Customer discovery, interviews, letting people talk

**Behavior**:
- AI waits 2.5 seconds before responding (gives you time to think)
- Easy to interrupt AI (2 words)
- AI never jumps in during your pauses
- Feels like a patient listener

**Vapi Config**:
```json
{
  "startSpeakingPlan": {
    "waitSeconds": 2.5,
    "smartEndpointingEnabled": false
  },
  "stopSpeakingPlan": {
    "numWords": 2,
    "voiceSeconds": 0.2,
    "backoffSeconds": 2.0,
    "acknowledgementPhrases": [
      "yeah", "uh-huh", "right", "okay", "mm-hmm", "i see", 
      "got it", "understood", "sure", "alright"
    ],
    "interruptionPhrases": [
      "wait", "hold on", "but", "actually", "stop"
    ]
  }
}
```

**System Prompt Addition**:
```
CONVERSATION STYLE:
- Be a patient listener
- Wait for the user to fully complete their thoughts
- Give them time to think and continue
- Take your time before responding
```

---

### Mode 2: "Friendly" (Supportive Practice)

**Use case**: Learning, friendly practice, encouragement

**Behavior**:
- AI waits 1.2 seconds before responding
- Easy to interrupt AI (2 words)
- AI gives you space after interruption
- Feels supportive and encouraging

**Vapi Config**:
```json
{
  "startSpeakingPlan": {
    "waitSeconds": 1.2,
    "smartEndpointingPlan": {
      "provider": "livekit"
    }
  },
  "stopSpeakingPlan": {
    "numWords": 2,
    "voiceSeconds": 0.2,
    "backoffSeconds": 1.5,
    "acknowledgementPhrases": [
      "yeah", "uh-huh", "right", "okay", "mm-hmm", "i see", 
      "got it", "understood", "sure", "alright"
    ],
    "interruptionPhrases": [
      "wait", "hold on", "but", "actually", "stop"
    ]
  }
}
```

**System Prompt Addition**:
```
CONVERSATION STYLE:
- Be supportive and encouraging
- Wait for the user to finish their point before responding
- If interrupted, stop and listen
- Offer constructive feedback
```

---

### Mode 3: "Debate" (Standard Debate)

**Use case**: Standard debate practice, real debate simulation

**Behavior**:
- AI responds quickly (0.6 seconds)
- Easy to interrupt AI (2 words) - allows back-and-forth
- AI recovers at normal speed
- Feels like a real debate

**Vapi Config**:
```json
{
  "startSpeakingPlan": {
    "waitSeconds": 0.6,
    "smartEndpointingPlan": {
      "provider": "livekit"
    }
  },
  "stopSpeakingPlan": {
    "numWords": 2,
    "voiceSeconds": 0.2,
    "backoffSeconds": 1.0,
    "acknowledgementPhrases": [
      "yeah", "uh-huh", "mm-hmm"
    ],
    "interruptionPhrases": [
      "wait", "hold", "but", "no", "stop", "actually", "that's"
    ]
  }
}
```

**System Prompt Addition**:
```
CONVERSATION STYLE:
- Be direct and engaged
- Respond naturally when the user pauses
- If interrupted, acknowledge and listen
- Maintain debate flow
```

---

### Mode 4: "Aggressive" (Confrontational)

**Use case**: Tough opponent, pressure testing, confrontational practice

**Behavior**:
- AI responds fast (0.4 seconds)
- Harder to interrupt AI (4 words)
- AI recovers quickly
- Feels confrontational and challenging

**Vapi Config**:
```json
{
  "startSpeakingPlan": {
    "waitSeconds": 0.4,
    "smartEndpointingPlan": {
      "provider": "livekit",
      "waitFunction": "200 + 4000 * x"
    }
  },
  "stopSpeakingPlan": {
    "numWords": 4,
    "voiceSeconds": 0.3,
    "backoffSeconds": 0.7,
    "acknowledgementPhrases": [
      "yeah", "uh-huh", "mm-hmm"
    ],
    "interruptionPhrases": [
      "wait", "hold", "but", "no", "stop", "actually"
    ]
  }
}
```

**System Prompt Addition**:
```
CONVERSATION STYLE:
- Be assertive and challenging
- Respond quickly when the user pauses
- If interrupted, acknowledge briefly and continue your point
- Don't let them dominate the conversation
- Push back on weak arguments
```

---

### Mode 5: "Relentless" (Overwhelming)

**Use case**: Gish Gallop practice, extreme stress testing, advanced debate

**Behavior**:
- AI responds very quickly (0.3 seconds)
- Very hard to interrupt AI (6 words)
- AI recovers immediately after interruption
- Feels overwhelming and relentless

**Vapi Config**:
```json
{
  "startSpeakingPlan": {
    "waitSeconds": 0.3,
    "smartEndpointingPlan": {
      "provider": "livekit",
      "waitFunction": "150 + 3000 * x"
    }
  },
  "stopSpeakingPlan": {
    "numWords": 6,
    "voiceSeconds": 0.5,
    "backoffSeconds": 0.5,
    "acknowledgementPhrases": [
      "yeah", "uh-huh", "mm-hmm", "okay", "right", "sure", "got it"
    ],
    "interruptionPhrases": [
      "STOP", "WAIT"
    ]
  }
}
```

**System Prompt Addition**:
```
CONVERSATION STYLE:
- Be relentless and persistent
- Respond immediately when the user pauses
- If interrupted, quickly acknowledge and return to your point
- Keep the pressure on - don't give them breathing room
- Make them fight for every word
- If they try to change the subject, bring it back to your argument
```

---

## Complete Mode Comparison Table

| Mode | **Off** | **Friendly** | **Debate** | **Aggressive** | **Relentless** |
|------|---------|--------------|------------|----------------|----------------|
| **waitSeconds** | 2.5s | 1.2s | 0.6s | 0.4s | 0.3s |
| **numWords** (to interrupt AI) | 2 | 2 | 2 | 4 | 6 |
| **voiceSeconds** | 0.2s | 0.2s | 0.2s | 0.3s | 0.5s |
| **backoffSeconds** | 2.0s | 1.5s | 1.0s | 0.7s | 0.5s |
| | | | | | |
| **AI Response Speed** | Very slow | Normal | Quick | Fast | Very fast |
| **How Hard to Interrupt AI** | Easy | Easy | Easy | Hard | Very hard |
| **AI Recovery Speed** | Slow | Slow | Normal | Quick | Very quick |
| | | | | | |
| **Feel** | Patient listener | Supportive | Real debate | Confrontational | Won't shut up |
| **Use Case** | Discovery, interviews | Learning | Standard debate | Tough opponent | Gish Gallop |

---

## Key Insight: `numWords` + `backoffSeconds` = "Hard to Interrupt"

You asked: "Do we make a type where even if you interrupt it comes back faster or is harder to interrupt?"

**YES!** This is controlled by:

### Making AI Hard to Interrupt:
- **Higher `numWords`** (5-10): User needs to say more words to interrupt
- **Higher `voiceSeconds`** (0.4-1.0): User needs to speak longer to interrupt
- **More `acknowledgementPhrases`**: More words treated as "not an interruption"
- **Fewer `interruptionPhrases`**: Fewer words trigger immediate stop

### Making AI Recover Faster After Interruption:
- **Lower `backoffSeconds`** (0.3-0.5): AI resumes quickly after being interrupted
- **System prompt**: Tell AI to "acknowledge briefly and continue your point"

### Example: "Relentless" Mode
```json
{
  "stopSpeakingPlan": {
    "numWords": 5,           // Need 5 words to interrupt
    "voiceSeconds": 0.4,     // Need 0.4s of speech to interrupt
    "backoffSeconds": 0.5,   // Resume after only 0.5s
    "acknowledgementPhrases": [
      // Many phrases treated as "not interruption"
      "yeah", "uh-huh", "mm-hmm", "okay", "right", "sure", "got it"
    ],
    "interruptionPhrases": [
      // Only explicit "STOP" or "WAIT" triggers interrupt
      "STOP", "WAIT"
    ]
  }
}
```

**Result**: User has to really fight to interrupt, and when they do, AI comes back fast.

---

## System Prompt Interaction

The Vapi config controls **technical behavior**. The system prompt controls **AI personality**.

### Technical (Vapi Config):
- How long to wait before responding
- How many words trigger interruption
- How fast to resume after interruption

### Behavioral (System Prompt):
- Whether to acknowledge interruption or ignore it
- Whether to continue previous point or address new topic
- Tone and assertiveness

### Example: Relentless Mode Prompt

```
CONVERSATION STYLE:
- Be relentless and persistent
- Respond immediately when the user pauses
- If interrupted, quickly acknowledge ("I hear you, but...") and return to your point
- Keep the pressure on - don't give them breathing room
- Make them fight for every word
- If they try to change the subject, bring it back to your argument
```

This tells the AI **what to do** when the technical config allows it to speak.

---

## Scenario → Mode Mapping

| Scenario | Default Mode | Rationale |
|----------|--------------|-----------|
| **Debate** | Aggressive | Real debates have quick back-and-forth |
| **Debate (Gish Gallop style)** | Relentless | Overwhelming opponent |
| **Sales - Cold Prospect** | Polite | Let prospect talk, don't be pushy |
| **Sales - Demo Followup** | Polite | Professional conversation |
| **Sales - Contract Negotiation** | Aggressive | Negotiation is confrontational |
| **Entrepreneur - Investor Pitch** | Aggressive | Investors interrupt with questions |
| **Entrepreneur - Early Sales** | Polite | Let prospect explain their needs |
| **Entrepreneur - Customer Discovery** | Off | Let them talk, you're learning |
| **Healthcare - Patient Refusal** | Off | Patient needs to feel heard |

---

## User Override

Users should be able to override the default mode:

### UI Options:
1. **Toggle in settings**: "AI Interruption Mode: Off / Polite / Aggressive / Relentless"
2. **Per-scenario override**: "Use default" or select specific mode
3. **Quick toggle during practice**: "Make AI more/less aggressive"

### Storage:
- User preference stored in user profile
- Per-opponent override stored in opponent config
- Session override (not persisted)

---

## Implementation Steps

### Phase 1: Cleanup (Remove Old Code)

#### Step 1.1: Remove from Type Definitions

**File: `src/scenarios/types.ts`**

Remove these fields from `AssistantConfig` interface:
```typescript
// REMOVE THESE:
/** Whether the AI can interrupt the user */
canInterrupt?: boolean;

/** Threshold for interruption (lower = more aggressive) */
interruptionThreshold?: number;
```

**File: `convex/scenarios/types.ts`**

Remove the same fields from `AssistantConfig` interface (mirror of src).

---

#### Step 1.2: Remove from Scenario Configs

**File: `src/scenarios/debate.ts`**

Find this section (around line 314):
```typescript
assistant: {
  // ... other config
  temperature: 0.7,
  canInterrupt: true,              // ← REMOVE THIS LINE
  interruptionThreshold: 100,      // ← REMOVE THIS LINE
}
```

Remove both lines.

**File: `src/scenarios/sales.ts`**

Find and remove in 3 places:

1. **ColdProspectScenario** (around line 165):
```typescript
temperature: 0.7,
canInterrupt: false, // Prospects don't typically interrupt  // ← REMOVE
```

2. **DemoFollowupScenario** (around line 246):
```typescript
temperature: 0.7,
canInterrupt: false,  // ← REMOVE
```

3. **ContractNegotiationScenario** (around line 423):
```typescript
temperature: 0.7,
canInterrupt: true,              // ← REMOVE
interruptionThreshold: 200,      // ← REMOVE
```

**File: `src/scenarios/entrepreneur.ts`**

Find and remove in 3 places:

1. **InvestorPitchScenario** (around line 166):
```typescript
temperature: 0.7,
canInterrupt: true, // Investors interrupt with questions    // ← REMOVE
interruptionThreshold: 150, // Less aggressive than debate   // ← REMOVE
```

2. **EarlyCustomerSalesScenario** (around line 379):
```typescript
temperature: 0.7,
canInterrupt: false, // Prospects generally listen before objecting  // ← REMOVE
```

3. **CustomerDiscoveryScenario** (around line 618):
```typescript
temperature: 0.7,
canInterrupt: false, // Customer discovery should let them talk  // ← REMOVE
```

**Repeat for Convex versions:**
- `convex/scenarios/debate.ts`
- `convex/scenarios/sales.ts`
- `convex/scenarios/entrepreneur.ts`
- `convex/scenarios/healthcare.ts` (if it has these fields)

---

#### Step 1.3: Remove from Debate Route

**File: `src/routes/_app/_auth/dashboard/debate.tsx`**

Find this section (around line 353):
```typescript
transcriber: {
  provider: "deepgram",
  model: "nova-2",
  language: "en-US" as const,
  smartFormat: true,
  endpointing: scenario.assistant.canInterrupt !== false ? 300 : 500, // ← REMOVE THIS LINE
},
```

Remove the `endpointing` line entirely. The transcriber config should just be:
```typescript
transcriber: {
  provider: "deepgram",
  model: "nova-2",
  language: "en-US" as const,
  smartFormat: true,
},
```

Also find and remove this section (around line 356):
```typescript
// Interruption settings from scenario config
...(scenario.assistant.canInterrupt !== undefined && {
  clientMessages: scenario.assistant.canInterrupt
    ? [
        "transcript",
        "hang",
        "function-call",
        "speech-update",      // ← Required for interruption
        "metadata",
        "conversation-update",
      ]
    : [
        "transcript",
        "hang",
        "function-call",
        "metadata",
        "conversation-update",
      ],
}),
```

Replace with a simple static array:
```typescript
clientMessages: [
  "transcript",
  "hang",
  "function-call",
  "speech-update",
  "metadata",
  "conversation-update",
],
```

---

#### Step 1.4: Clean Up System Prompts

**File: `src/scenarios/debate.ts`**

Find the system prompt (around line 215):
```typescript
systemPrompt: `# YOUR ROLE & PERSONA
{{STYLE}}

# YOUR SKILL LEVEL & TECHNIQUES
{{DIFFICULTY}}

# DEBATE CONTEXT
- Topic: {{TOPIC}}
- Your position: {{AI_POSITION}}
- User position: {{USER_POSITION}}

# YOUR KEY ARGUMENTS
{{TALKING_POINTS}}

# BEHAVIORAL RULES
- Speak naturally and conversationally
- You CAN be interrupted - respond naturally
- You CAN interrupt if user rambles > 45 seconds  // ← REMOVE THIS LINE
- Keep responses under 30 seconds of speech
- Focus ONLY on debating - do not mention analysis, logging, or techniques
- Use evidence and facts to support your position
- NEVER include stage directions, emotional descriptions, or parentheticals (e.g., "sounds annoyed", "*sighs*", etc.)
- Speak only as your character would speak - no narration or meta-commentary

{{ADDITIONAL_CONTEXT}}`,
```

Remove the line: `- You CAN interrupt if user rambles > 45 seconds`

Change to:
```typescript
# BEHAVIORAL RULES
- Speak naturally and conversationally
- Respond naturally if interrupted
- Keep responses under 30 seconds of speech
- Focus ONLY on debating - do not mention analysis, logging, or techniques
- Use evidence and facts to support your position
- NEVER include stage directions, emotional descriptions, or parentheticals
- Speak only as your character would speak - no narration or meta-commentary
```

---

#### Step 1.5: Clean Up Style Instructions

**File: `src/lib/debate/style-instructions.ts`**

Find the aggressive style (around line 26):
```typescript
case "aggressive":
  return `You are a combative opponent in a formal debate. You're here to win. You view this as intellectual combat and won't give ground easily.

BEHAVIORAL GUIDELINES:
- Be confrontational and assertive
- Interrupt when you sense weakness in their argument  // ← REMOVE THIS LINE
- Challenge them directly ("That's nonsense because...")
- Use a forceful, commanding tone
- Try to control the flow of conversation
- Don't concede points without a fight`;
```

Change to:
```typescript
case "aggressive":
  return `You are a combative opponent in a formal debate. You're here to win. You view this as intellectual combat and won't give ground easily.

BEHAVIORAL GUIDELINES:
- Be confrontational and assertive
- Challenge them directly when they make weak arguments
- Use a forceful, commanding tone
- Try to control the flow of conversation
- Don't concede points without a fight`;
```

---

### Phase 2: Add New Speech Plans

#### Step 2.1: Create Speech Plan Configurations

**New File: `src/lib/vapi/speechPlans.ts`**

```typescript
/**
 * Vapi Speech Plan Configurations
 * 
 * Defines startSpeakingPlan and stopSpeakingPlan for each interruption mode.
 */

export type InterruptionMode = "off" | "friendly" | "debate" | "aggressive" | "relentless";

export interface SpeechPlanConfig {
  startSpeakingPlan: {
    waitSeconds: number;
    smartEndpointingEnabled?: boolean;
    smartEndpointingPlan?: {
      provider: "livekit" | "vapi" | "krisp";
      waitFunction?: string;
      threshold?: number;
    };
  };
  stopSpeakingPlan: {
    numWords: number;
    voiceSeconds: number;
    backoffSeconds: number;
    acknowledgementPhrases: string[];
    interruptionPhrases: string[];
  };
}

export const SPEECH_PLANS: Record<InterruptionMode, SpeechPlanConfig> = {
  off: {
    startSpeakingPlan: {
      waitSeconds: 2.5,
      smartEndpointingEnabled: false,
    },
    stopSpeakingPlan: {
      numWords: 2,
      voiceSeconds: 0.2,
      backoffSeconds: 2.0,
      acknowledgementPhrases: [
        "yeah", "uh-huh", "right", "okay", "mm-hmm", "i see",
        "got it", "understood", "sure", "alright"
      ],
      interruptionPhrases: [
        "wait", "hold on", "but", "actually", "stop"
      ],
    },
  },
  
  friendly: {
    startSpeakingPlan: {
      waitSeconds: 1.2,
      smartEndpointingPlan: {
        provider: "livekit",
      },
    },
    stopSpeakingPlan: {
      numWords: 2,
      voiceSeconds: 0.2,
      backoffSeconds: 1.5,
      acknowledgementPhrases: [
        "yeah", "uh-huh", "right", "okay", "mm-hmm", "i see",
        "got it", "understood", "sure", "alright"
      ],
      interruptionPhrases: [
        "wait", "hold on", "but", "actually", "stop"
      ],
    },
  },
  
  debate: {
    startSpeakingPlan: {
      waitSeconds: 0.6,
      smartEndpointingPlan: {
        provider: "livekit",
      },
    },
    stopSpeakingPlan: {
      numWords: 2,
      voiceSeconds: 0.2,
      backoffSeconds: 1.0,
      acknowledgementPhrases: [
        "yeah", "uh-huh", "mm-hmm"
      ],
      interruptionPhrases: [
        "wait", "hold", "but", "no", "stop", "actually", "that's"
      ],
    },
  },
  
  aggressive: {
    startSpeakingPlan: {
      waitSeconds: 0.4,
      smartEndpointingPlan: {
        provider: "livekit",
        waitFunction: "200 + 4000 * x",
      },
    },
    stopSpeakingPlan: {
      numWords: 4,
      voiceSeconds: 0.3,
      backoffSeconds: 0.7,
      acknowledgementPhrases: [
        "yeah", "uh-huh", "mm-hmm"
      ],
      interruptionPhrases: [
        "wait", "hold", "but", "no", "stop", "actually"
      ],
    },
  },
  
  relentless: {
    startSpeakingPlan: {
      waitSeconds: 0.3,
      smartEndpointingPlan: {
        provider: "livekit",
        waitFunction: "150 + 3000 * x",
      },
    },
    stopSpeakingPlan: {
      numWords: 6,
      voiceSeconds: 0.5,
      backoffSeconds: 0.5,
      acknowledgementPhrases: [
        "yeah", "uh-huh", "mm-hmm", "okay", "right", "sure", "got it"
      ],
      interruptionPhrases: [
        "STOP", "WAIT"
      ],
    },
  },
};

/**
 * Get speech plan configuration for a given mode
 */
export function getSpeechPlan(mode: InterruptionMode): SpeechPlanConfig {
  return SPEECH_PLANS[mode];
}
```

---

#### Step 2.2: Update Type Definitions

**File: `src/scenarios/types.ts`**

Add the new type and field:
```typescript
import type { InterruptionMode } from "@/lib/vapi/speechPlans";

export interface ScenarioConfig {
  // ... existing fields
  
  /** Default interruption mode for this scenario */
  defaultInterruptionMode: InterruptionMode;
  
  // ... rest of fields
}
```

---

#### Step 2.3: Add Default Modes to Scenarios

**File: `src/scenarios/debate.ts`**

Add to the config:
```typescript
export const DebateScenario: ScenarioConfig = {
  id: "debate",
  name: "Debate",
  category: "debate",
  
  defaultInterruptionMode: "debate",  // ← ADD THIS
  
  pipeline: {
    // ... rest of config
```

**File: `src/scenarios/sales.ts`**

Add to each scenario:
```typescript
// ColdProspectScenario
defaultInterruptionMode: "off",  // Let prospect talk

// DemoFollowupScenario
defaultInterruptionMode: "friendly",  // Professional conversation

// ContractNegotiationScenario
defaultInterruptionMode: "aggressive",  // Negotiation is confrontational
```

**File: `src/scenarios/entrepreneur.ts`**

Add to each scenario:
```typescript
// InvestorPitchScenario
defaultInterruptionMode: "aggressive",  // Investors interrupt with questions

// EarlyCustomerSalesScenario
defaultInterruptionMode: "friendly",  // Let prospect explain needs

// CustomerDiscoveryScenario
defaultInterruptionMode: "off",  // Let them talk, you're learning
```

---

#### Step 2.4: Apply Speech Plans in Debate Route

**File: `src/routes/_app/_auth/dashboard/debate.tsx`**

Add import at top:
```typescript
import { getSpeechPlan } from "@/lib/vapi/speechPlans";
```

Find where the assistant config is built (around line 300), and add speech plans:
```typescript
// Get speech plan based on scenario default
const speechPlan = getSpeechPlan(scenario.defaultInterruptionMode);

// Build dynamic assistant configuration
const assistantConfig = {
  ...baseAssistantConfig,
  model: {
    // ... existing model config
  },
  voice: {
    // ... existing voice config
  },
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en-US",
    smartFormat: true,
    // No endpointing field needed
  },
  
  // ADD SPEECH PLANS HERE:
  startSpeakingPlan: speechPlan.startSpeakingPlan,
  stopSpeakingPlan: speechPlan.stopSpeakingPlan,
  
  // ... rest of config
};
```

---

### Phase 3: User Control (Optional - Future Enhancement)

#### Step 3.1: Add to Schema

**File: `convex/schema.ts`**

Add to users table:
```typescript
users: defineTable({
  // ... existing fields
  
  // User's preferred interruption mode (overrides scenario defaults)
  interruptionModePreference: v.optional(
    v.union(
      v.literal("off"),
      v.literal("friendly"),
      v.literal("debate"),
      v.literal("aggressive"),
      v.literal("relentless")
    )
  ),
}),
```

Add to opponents table:
```typescript
opponents: defineTable({
  // ... existing fields
  
  // Per-opponent interruption mode override
  interruptionModeOverride: v.optional(
    v.union(
      v.literal("off"),
      v.literal("friendly"),
      v.literal("debate"),
      v.literal("aggressive"),
      v.literal("relentless")
    )
  ),
}),
```

#### Step 3.2: Add UI Controls

**File: `src/routes/_app/_auth/dashboard/opponents.tsx`** (or opponent form)

Add dropdown to opponent form:
```typescript
<select name="interruptionModeOverride">
  <option value="">Use scenario default</option>
  <option value="off">Off - Patient listener</option>
  <option value="friendly">Friendly - Supportive</option>
  <option value="debate">Debate - Standard</option>
  <option value="aggressive">Aggressive - Confrontational</option>
  <option value="relentless">Relentless - Overwhelming</option>
</select>
```

#### Step 3.3: Apply Override Logic

**File: `src/routes/_app/_auth/dashboard/debate.tsx`**

Update speech plan selection:
```typescript
// Determine which mode to use (priority: opponent override > user preference > scenario default)
const interruptionMode = 
  opponent.interruptionModeOverride || 
  user.interruptionModePreference || 
  scenario.defaultInterruptionMode;

const speechPlan = getSpeechPlan(interruptionMode);
```

---

## Summary of Changes

### Files to Delete From:
- ❌ `canInterrupt` field (8 files)
- ❌ `interruptionThreshold` field (6 files)
- ❌ `endpointing` logic (1 file)
- ❌ Misleading prompt text (2 files)

### Files to Create:
- ✅ `src/lib/vapi/speechPlans.ts` (new file)

### Files to Add To:
- ✅ `src/scenarios/types.ts` (add `defaultInterruptionMode`)
- ✅ All scenario configs (add `defaultInterruptionMode`)
- ✅ `src/routes/_app/_auth/dashboard/debate.tsx` (apply speech plans)
- ✅ `convex/schema.ts` (optional user preferences)

### Total Files Modified: ~15 files

---

## Testing Plan

### Test Each Mode:

1. **Off Mode:**
   - Start speaking, pause for 1 second, continue
   - AI should NOT jump in during pause
   - Try to interrupt AI - should require significant effort

2. **Polite Mode:**
   - Normal conversation flow
   - AI waits ~1 second before responding
   - Can interrupt AI with a few words

3. **Aggressive Mode:**
   - AI responds quickly after you stop
   - Can interrupt AI easily
   - AI recovers and continues

4. **Relentless Mode:**
   - AI responds very quickly
   - Hard to interrupt (need 5+ words)
   - AI comes back fast after interruption

### Test Scenario Defaults:
- Debate → Aggressive (feels like real debate)
- Customer Discovery → Off (feels like interview)
- Sales → Polite (feels professional)

---

## Open Questions

1. **Should "Relentless" be available for all scenarios?**
   - Or only for debate/Gish Gallop?

2. **Should users be able to create custom modes?**
   - Or just pick from the 4 presets?

3. **How do we communicate the mode to users?**
   - Tooltip? Description? Demo video?

4. **Should mode affect system prompt automatically?**
   - Or keep Vapi config and prompt separate?

---

## Summary

**The Plan:**
1. Strip out old confused code (`canInterrupt`, `interruptionThreshold`, `endpointing`)
2. Implement 4 clear modes: Off, Polite, Aggressive, Relentless
3. Each mode has specific `startSpeakingPlan` + `stopSpeakingPlan` + system prompt additions
4. Map scenarios to default modes
5. Allow user override

**Key Insight:**
- `waitSeconds` = How fast AI responds
- `numWords` + `voiceSeconds` = How hard to interrupt AI
- `backoffSeconds` = How fast AI recovers after interruption
- System prompt = What AI does with these capabilities

**"Hard to interrupt + fast recovery" = Relentless mode**
