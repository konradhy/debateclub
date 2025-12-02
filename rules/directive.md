# AI Directive

**Read this file in full before taking any action on this codebase.**

---

## Purpose

This document governs how AI assistants should operate within this project. It establishes coding principles, anti-patterns to avoid, and points to other documentation that must be consulted.

---

## Required Reading Order

1. This file (DIRECTIVE.md)
2. `ROADMAP.md` — understand project scope and current focus
3. `PROJECT_MAP.md` — understand features, patterns, and user journey
4. `DEV_JOURNAL.md` — read ALL chapters to understand current state and history
5. `convex_rules.mdc` — Convex-specific patterns and best practices

---

## Core Principles

### Development Mode Mindset
- We are in active development. Do not worry about backward compatibility.
- Do not create migration scripts or unified adapter functions for "future flexibility."
- If the database schema needs to change, we drop and rebuild. 
- Build for now, not for hypothetical future requirements.

### Code Organization
- **File size**: Keep files focused. If a file grows unwieldy, note it for refactoring — but get it working first before splitting.
- **Folder structure**: Follow consistent conventions appropriate to project scope. Don't over-nest small projects or under-organize large ones.
- **Deterministic atomic code**: Prefer pure functions with explicit inputs/outputs when possible.
- **Style consistency**: Maintain the same opinions, naming conventions, and patterns throughout the codebase.

### Error Handling
- **No silent failures.** If you use a fallback, log an error. 
- It is better to throw and surface a problem than to silently return hardcoded fallback data.
- Never hide failures behind default values without explicit error tracking.

### Code Smell Awareness
- Develop a "code sniff" — recognize when logic is becoming tangled.
- When you detect spaghetti: either fix it immediately OR isolate it completely so it cannot spread.
- Do not let messy code leak into clean areas of the codebase.

---

## Anti-Patterns Checklist

**Before writing code and after completing work, verify you have not introduced these:**

### Duplication & Redundancy
- [ ] **Shadow Implementation** — Creating a new implementation alongside an existing one instead of modifying it
- [ ] **Parallel Implementation** — Two different code paths doing the same thing
- [ ] **Reimplementation Instead of Refactoring** — Building new rather than adapting existing code

### Poor Abstractions
- [ ] **Boolean Trap / Flag Soup** — Multiple boolean flags where an explicit state enum would be clearer
- [ ] **Primitive Obsession** — Using raw IDs or strings where a rich domain object belongs
- [ ] **Anemic Domain Model** — Logic scattered across files instead of cohesive domain objects
- [ ] **Unnecessary Abstraction Layer** — Converter functions that just rename props instead of passing correct props directly

### Data & Timing Issues
- [ ] **Temporal Coupling** — Operations dependent on execution order rather than explicit dependencies
- [ ] **Data Consistency Boundary Violations** — Same logical data stored/managed in multiple places
- [ ] **Negative Filtering** — Blacklist approaches prone to timing issues (prefer whitelists)

---

## Session Protocol

### Starting a Session
1. Read DIRECTIVE.md (this file)
2. Read ROADMAP.md — note current focus and active tasks
3. Read PROJECT_MAP.md 
4. Read ALL of DEV_JOURNAL.md — do not skip chapters
5. Increment session number in DEV_JOURNAL.md
6. Note which roadmap item(s) you plan to advance: [R-X.X.X]

### During Work
- Update checklist items as completed
- Document technical decisions with reasoning as you make them
- If you encounter issues, document symptoms, attempts, and outcomes

### After Each Work Chunk
- Add entry to DEV_JOURNAL.md with full context
- Update PROJECT_MAP.md if patterns/features/journey changed
- Update ROADMAP.md task statuses if progress was made
- Set clear Next Action

### Before Ending ANY Session (Critical Checkpoint)
- [ ] Did we complete any roadmap tasks? → Update ROADMAP.md status (only ✅ if merged + documented)
- [ ] Did we make architectural choices? → Document in Technical Decisions
- [ ] Did we encounter and solve problems? → Document in Known Issues  
- [ ] Did we establish new principles? → Update PROJECT_MAP.md
- [ ] Does directory structure reflect reality? → Verify and update
- [ ] Is DEV_JOURNAL.md chapter complete with all sections?
- [ ] Does chapter reference roadmap items advanced? [R-X.X.X]
- [ ] Is Next Action clear for the next session?

---

## Immutable History Rule

**NEVER delete or modify past session entries in DEV_JOURNAL.md.**

- ✅ Add new sessions AFTER existing ones
- ✅ Update current status sections  
- ✅ Note corrections to old chapters in NEW chapters
- ❌ Do not delete session history
- ❌ Do not modify past session content
- ❌ Do not "clean up" old entries

If you accidentally delete historical data, STOP and restore it immediately.