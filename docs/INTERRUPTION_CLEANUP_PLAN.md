# Interruption System Cleanup Plan

**Goal**: Remove confused/unused interruption code, establish clean baseline for Phase 7.1

---

## Current Problems

1. **`interruptionThreshold` is defined but never used** - It's in scenario configs but not passed to Vapi
2. **Inconsistent comments** - "Less aggressive than debate" but no actual difference in behavior
3. **Mixed signals** - System prompts say one thing, config says another
4. **No actual control** - The threshold values (100, 150, 200) don't affect anything

---

## What to Remove

### 1. Remove `interruptionThreshold` Field Entirely

**Files to modify:**
- `src/scenarios/types.ts` - Remove from `AssistantConfig` interface
- `convex/scenarios/types.ts` - Remove from `AssistantConfig` interface
- `src/scenarios/debate.ts` - Remove `interruptionThreshold: 100`
- `src/scenarios/sales.ts` - Remove `interruptionThreshold: 200`
- `src/scenarios/entrepreneur.ts` - Remove `interruptionThreshold: 150`
- `convex/scenarios/debate.ts` - Remove `interruptionThreshold: 100`
- `convex/scenarios/sales.ts` - Remove `interruptionThreshold: 200`
- `convex/scenarios/entrepreneur.ts` - Remove `interruptionThreshold: 150`

**Rationale**: This field doesn't do anything. It's not passed to Vapi, not used in prompts, just dead code.

---

### 2. Simplify System Prompt Interruption Rules

**Current state** (debate scenario):
```
# BEHAVIORAL RULES
- Speak naturally and conversationally
- You CAN be interrupted - respond naturally
- You CAN interrupt if user rambles > 45 seconds  ← Too specific, not enforced
- Keep responses under 30 seconds of speech
```

**Proposed cleanup**:
```
# BEHAVIORAL RULES
- Speak naturally and conversationally
- Keep responses under 30 seconds of speech
- Respond naturally if interrupted
```

**Rationale**: Remove the "45 seconds" rule since:
- It's not technically enforced
- Vapi's endpointing handles this automatically
- Creates false expectations

---

### 3. Remove Misleading Comments

**Current:**
```typescript
canInterrupt: true, // Investors interrupt with questions
interruptionThreshold: 150, // Less aggressive than debate
```

**Proposed:**
```typescript
canInterrupt: true, // Investors can interrupt with questions
```

**Rationale**: The "less aggressive" comment is misleading since threshold isn't used.

---

### 4. Standardize `endpointing` Logic

**Current** (in `debate.tsx`):
```typescript
endpointing: scenario.assistant.canInterrupt !== false ? 300 : 500,
```

**Keep this** - It's the only thing that actually controls interruption timing:
- `canInterrupt: true` → 300ms endpointing (allows interruption)
- `canInterrupt: false` → 500ms endpointing (requires longer pause)

**Rationale**: This is the actual working mechanism. Keep it simple.

---

### 5. Clean Up Style Instructions

**Current** (aggressive style):
```
BEHAVIORAL GUIDELINES:
- Be confrontational and assertive
- Interrupt when you sense weakness in their argument  ← Misleading
- Challenge them directly
```

**Proposed**:
```
BEHAVIORAL GUIDELINES:
- Be confrontational and assertive
- Challenge them directly when they make weak arguments
- Use a forceful, commanding tone
```

**Rationale**: "Interrupt when you sense weakness" implies the AI has control over interruption timing, which it doesn't. Vapi's endpointing controls when interruption is possible, not the LLM.

---

## What to Keep

### Keep `canInterrupt` Boolean

This is the **only** interruption control that matters:
- `true` → 300ms endpointing, enables interruption
- `false` → 500ms endpointing, disables interruption

**Current usage (keep as-is):**
- Debate: `true`
- Sales Cold Prospect: `false`
- Sales Demo Followup: `false`
- Sales Contract Negotiation: `true`
- Entrepreneur Investor Pitch: `true`
- Entrepreneur Early Sales: `false`
- Entrepreneur Customer Discovery: `false`
- Healthcare Patient Refusal: `false`

---

## Clean Baseline After Cleanup

After cleanup, interruption will be controlled by **one simple mechanism**:

```typescript
// In scenario config
assistant: {
  canInterrupt: boolean,  // Only field that matters
  // No threshold, no other interruption fields
}

// In debate.tsx (Vapi config)
transcriber: {
  endpointing: scenario.assistant.canInterrupt ? 300 : 500,
  // 300ms = interruption enabled
  // 500ms = interruption disabled
}
```

**That's it.** Simple, clear, actually works.

---

## Phase 7.1 Can Then Add Back Systematically

Once we have a clean baseline, Phase 7.1 can add:

1. **User preference toggle** - "Allow AI to interrupt me" (overrides scenario default)
2. **Interruption modes** - "Aggressive" (200ms), "Normal" (300ms), "Polite" (400ms)
3. **Per-style tuning** - Aggressive style gets lower endpointing than friendly
4. **UI indicators** - Show interruption status during practice
5. **Testing framework** - Measure actual interruption behavior

But we do this **after** establishing the clean baseline.

---

## Files to Modify (Summary)

### Type Definitions (2 files):
- `src/scenarios/types.ts` - Remove `interruptionThreshold` field
- `convex/scenarios/types.ts` - Remove `interruptionThreshold` field

### Scenario Configs (6 files):
- `src/scenarios/debate.ts` - Remove threshold, clean comments
- `src/scenarios/sales.ts` - Remove threshold, clean comments
- `src/scenarios/entrepreneur.ts` - Remove threshold, clean comments
- `convex/scenarios/debate.ts` - Remove threshold, clean comments
- `convex/scenarios/sales.ts` - Remove threshold, clean comments
- `convex/scenarios/entrepreneur.ts` - Remove threshold, clean comments

### Style Instructions (1 file):
- `src/lib/debate/style-instructions.ts` - Remove misleading "interrupt when" language

### System Prompts (embedded in scenario files):
- Clean up "45 seconds" and other unenforceable rules

---

## Testing After Cleanup

1. **Verify debate still interrupts** - `canInterrupt: true` should work
2. **Verify sales doesn't interrupt** - `canInterrupt: false` should work
3. **Check no regressions** - All scenarios should behave the same as before
4. **Confirm endpointing logic** - 300ms vs 500ms is the only difference

---

## Benefits of Cleanup

1. **Removes dead code** - `interruptionThreshold` does nothing
2. **Removes false promises** - No more "45 seconds" rules that aren't enforced
3. **Clarifies mechanism** - One boolean controls everything
4. **Enables Phase 7.1** - Clean foundation to build proper interruption modes
5. **Reduces confusion** - Developers and LLMs won't be misled by unused fields

---

## Estimated Effort

- **Time**: 30-45 minutes
- **Risk**: Low (removing unused code)
- **Testing**: Quick smoke test of each scenario type
- **Rollback**: Easy (just revert commits)

---

## Next Steps After Cleanup

1. **Document the clean state** - Update `INTERRUPTION_SYSTEM_ANALYSIS.md`
2. **Test each scenario** - Verify interruption behavior unchanged
3. **Plan Phase 7.1** - Design proper interruption modes with user control
4. **Implement systematically** - Add back features one at a time with testing
