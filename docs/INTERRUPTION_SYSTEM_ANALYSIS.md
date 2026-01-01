# Interruption System Analysis - Phase 7

**Date**: January 1, 2026  
**Phase**: 7.1 AI Interruption Protocol  
**Status**: System-wide audit of interruption management

---

## Executive Summary

The interruption system is managed through **multiple layers** across the codebase:

1. **Scenario Configuration** - `canInterrupt` and `interruptionThreshold` per scenario
2. **System Prompts** - Behavioral rules in scenario `systemPrompt` fields
3. **Vapi Configuration** - `endpointing` and `clientMessages` settings
4. **Style Instructions** - Behavioral guidelines per debate style

**Current State**: Interruption is **scenario-specific** with different behaviors for debate vs sales vs entrepreneur scenarios.

---

## 1. Scenario-Level Configuration

### Location: `src/scenarios/*.ts` and `convex/scenarios/*.ts`

Each scenario defines interruption behavior in its `assistant` config:

```typescript
assistant: {
  canInterrupt: boolean,           // Whether AI can interrupt user
  interruptionThreshold: number,   // Lower = more aggressive (100-200ms)
}
```

### Current Settings by Scenario:

| Scenario | canInterrupt | interruptionThreshold | Rationale |
|----------|--------------|----------------------|-----------|
| **Debate** | `true` | `100` | Aggressive - debates involve natural interruption |
| **Sales - Cold Prospect** | `false` | N/A | Prospects don't typically interrupt |
| **Sales - Demo Followup** | `false` | N/A | Warm prospects listen before objecting |
| **Sales - Contract Negotiation** | `true` | `200` | Buyers can interrupt during negotiation |
| **Entrepreneur - Investor Pitch** | `true` | `150` | Investors interrupt with questions |
| **Entrepreneur - Early Sales** | `false` | N/A | Prospects generally listen first |
| **Entrepreneur - Customer Discovery** | `false` | N/A | Should let interviewee talk |
| **Healthcare - Patient Refusal** | `false` | N/A | Patients typically don't interrupt providers |

**Key Insight**: Interruption is **contextually appropriate** - not all scenarios should interrupt.

---

## 2. System Prompt Behavioral Rules

### Location: Scenario `systemPrompt` fields

Each scenario's system prompt contains explicit behavioral rules about interruption:

#### Debate Scenario (`src/scenarios/debate.ts`):
```
# BEHAVIORAL RULES
- Speak naturally and conversationally
- You CAN be interrupted - respond naturally
- You CAN interrupt if user rambles > 45 seconds
- Keep responses under 30 seconds of speech
```

#### Sales - Contract Negotiation (`src/scenarios/sales.ts`):
```
BEHAVIORAL RULES:
- IF seller caves immediately on price → Ask for MORE
- IF seller sounds defensive → Double down on demands
- IF seller gives concession without asking → Request another concession
```

**Key Insight**: System prompts define **when and why** to interrupt, not just whether it's allowed.

---

## 3. Style-Specific Instructions

### Location: `src/lib/debate/style-instructions.ts`

Debate scenarios have **style-specific interruption behavior**:

#### Aggressive Style:
```
BEHAVIORAL GUIDELINES:
- Be confrontational and assertive
- Interrupt when you sense weakness in their argument
- Challenge them directly ("That's nonsense because...")
- Use a forceful, commanding tone
- Try to control the flow of conversation
```

#### Friendly Style:
```
BEHAVIORAL GUIDELINES:
- Be conversational, warm, and encouraging
- Challenge their ideas but stay constructive
- Offer praise when they make good points
- Point out weaknesses gently
```

#### Gish Gallop Style:
```
BEHAVIORAL GUIDELINES:
- Adopt aggressive, dominating style
- Make rapid-fire claims - throw out 3-4 arguments quickly
- Don't give them time to fully address each point
- If they start responding to one claim, introduce two more
```

**Key Insight**: Style instructions **override or enhance** base interruption behavior.

---

## 4. Vapi Technical Configuration

### Location: `src/routes/_app/_auth/dashboard/debate.tsx`

The Vapi assistant is configured with technical interruption settings:

```typescript
transcriber: {
  provider: "deepgram",
  model: "nova-2",
  language: "en-US",
  smartFormat: true,
  endpointing: scenario.assistant.canInterrupt !== false ? 300 : 500,
  // ↑ 300ms silence = interrupt allowed
  // ↑ 500ms silence = interrupt disabled (longer pause required)
},

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

**Key Technical Details**:
- **Endpointing**: Controls how long Vapi waits before considering speech "complete"
  - `300ms` = Aggressive (allows quick interruption)
  - `500ms` = Conservative (requires longer pause)
- **clientMessages**: Must include `"speech-update"` for interruption to work
- **smartEndpointing**: Vapi's proprietary algorithm for detecting natural pauses

---

## 5. Webhook & Event Handling

### Location: `convex/http.ts`

The webhook handler processes interruption events but **does not control interruption behavior**:

```typescript
case "transcript": {
  // Stores transcript but doesn't affect interruption
  await ctx.runMutation(internal.debates.addTranscript, {
    debateId: debateId as any,
    speaker: speaker,
    text: transcriptText,
    timestamp: Date.now(),
  });
  break;
}
```

**Key Insight**: Webhooks are **passive** - they record what happened, not control behavior.

---

## 6. Type Definitions

### Location: `src/scenarios/types.ts` and `convex/scenarios/types.ts`

```typescript
export interface AssistantConfig {
  /** Whether the AI can interrupt the user */
  canInterrupt?: boolean;

  /** Threshold for interruption (lower = more aggressive) */
  interruptionThreshold?: number;
}
```

**Key Insight**: These are **optional** fields - scenarios can omit them for default behavior.

---

## 7. Current Issues & Gaps

### From Roadmap Phase 7.1:

```markdown
### 7.1 AI Interruption Protocol

**Status**: ⬜ Not Started

#### Tasks
- ⬜ 7.1.1 — Create interrupting vs non-interrupting AI modes
- ⬜ 7.1.2 — Adjust canInterrupt boolean in scenario assistant configs
- ⬜ 7.1.3 — Tune interruptionThreshold settings per mode
- ⬜ 7.1.4 — Update system prompts with interruption instructions
- ⬜ 7.1.5 — Default mode with toggle UI
- ⬜ 7.1.6 — Test interruption behavior across modes
```

### Identified Issues:

1. **No User Control**: Users cannot toggle interruption on/off during practice
2. **Inconsistent Thresholds**: No clear standard for what `100` vs `150` vs `200` means
3. **Style Override Unclear**: How do style instructions interact with `canInterrupt`?
4. **No Documentation**: Users don't know which scenarios interrupt
5. **Testing Gap**: No systematic testing of interruption behavior across scenarios

---

## 8. Interruption Flow Diagram

```
User speaks
    ↓
Deepgram transcribes (real-time)
    ↓
Vapi endpointing algorithm
    ↓
[300ms silence detected] ← canInterrupt=true
    ↓
Vapi checks: Is AI ready to speak?
    ↓
[YES] → AI interrupts
    ↓
Claude generates response
    ↓
ElevenLabs synthesizes voice
    ↓
AI speaks (user can interrupt back)
```

**Critical Points**:
- **Endpointing** = Technical pause detection
- **canInterrupt** = Permission to interrupt
- **interruptionThreshold** = Sensitivity (currently unused in Vapi config?)
- **System Prompt** = Behavioral guidance on when to interrupt

---

## 9. Recommendations for Phase 7.1

### Priority 1: Standardize Thresholds
- Define clear meaning for threshold values (100, 150, 200)
- Document expected behavior for each level
- Test actual interruption timing

### Priority 2: User Control
- Add toggle UI: "Allow AI to interrupt me"
- Persist preference per user or per scenario
- Override scenario defaults when user preference exists

### Priority 3: Clarify Style Interaction
- Document how style instructions modify base interruption
- Test aggressive vs friendly with same `canInterrupt` setting
- Ensure prompts are consistent

### Priority 4: Testing
- Create test scenarios for each interruption mode
- Measure actual interruption timing
- Validate that `interruptionThreshold` affects behavior

### Priority 5: Documentation
- Add interruption behavior to scenario descriptions
- Show interruption status in UI (badge or icon)
- Explain to users what to expect

---

## 10. Files to Modify for Phase 7.1

### Configuration Files:
- `src/scenarios/debate.ts` - Adjust debate interruption
- `src/scenarios/sales.ts` - Review sales interruption
- `src/scenarios/entrepreneur.ts` - Review entrepreneur interruption
- `convex/scenarios/*.ts` - Mirror changes to backend

### UI Files:
- `src/routes/_app/_auth/dashboard/debate.tsx` - Add toggle UI
- `src/ui/debate.tsx` - Show interruption status indicator
- `src/routes/_app/_auth/dashboard/opponents.tsx` - Show interruption in opponent card

### Prompt Files:
- `src/lib/debate/style-instructions.ts` - Clarify interruption in styles
- Scenario `systemPrompt` fields - Add explicit interruption rules

### Type Files:
- `src/scenarios/types.ts` - Add user preference field
- `convex/schema.ts` - Add user interruption preference

---

## 11. Open Questions

1. **Does `interruptionThreshold` actually affect Vapi behavior?**
   - Currently only used in scenario config, not passed to Vapi
   - May need to map to `endpointing` value

2. **Should interruption be user-configurable or scenario-locked?**
   - Some scenarios (customer discovery) should NEVER interrupt
   - Others (debate) should allow user preference

3. **How do we test interruption timing?**
   - Need real voice testing, not just code review
   - Measure actual pause duration before interruption

4. **Should style override `canInterrupt`?**
   - Example: Friendly style in debate - should it interrupt less?
   - Or does `canInterrupt=true` mean style only affects tone?

---

## 12. Summary

**Interruption is managed through 4 layers**:

1. **Scenario Config** (`canInterrupt`, `interruptionThreshold`) - Permission level
2. **System Prompts** (behavioral rules) - When/why to interrupt
3. **Style Instructions** (debate only) - How to interrupt (tone/aggression)
4. **Vapi Config** (`endpointing`, `clientMessages`) - Technical implementation

**Current State**: Working but **not user-configurable** and **not well-documented**.

**Phase 7.1 Goal**: Make interruption behavior **explicit, testable, and user-controllable** where appropriate.
