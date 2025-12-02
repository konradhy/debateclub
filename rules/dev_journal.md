# Development Journal

**Session-by-session record of development progress. Each chapter is immutable once completed.**

---

## How to Use This Document

1. **Start each session** by reading ALL existing chapters
2. **Increment chapter number** for your session
3. **Document as you work** — decisions, problems, solutions
4. **Complete chapter** before ending session
5. **Never modify** past chapters — only add new ones

---

## Chapter 0: Genesis — Documentation System Initialization

### TL;DR

This chapter establishes the baseline for the AI documentation system. It captures the state of the OratorPrep project as of December 2, 2024 when structured documentation began. All prior work is referenced as "Pre-docs" throughout the system.

**Roadmap Items Advanced**: N/A — baseline establishment

---

### Project State at Initialization

**Date**: December 2, 2024

**Initialized by**: AI (Claude) with Human

**Reason for adding documentation system**: 
Project has grown significantly with multiple phases complete. Need structured context for future AI sessions to maintain consistency, avoid re-learning the codebase, and track progress systematically.

---

### What Already Exists

**Completed Features**:
- Voice debate system with Vapi integration (Phase 1)
- Technique detection for 11 debate techniques (Phase 2 & 3)
- Post-debate analysis generation (Phase 2)
- Opponent profile system with AI-generated prep materials (Phase 3)
- Prep panel for live debate access (Phase 3)
- Authentication with Convex Auth
- Stripe subscription integration
- Email system with Resend

**In-Progress Features**:
- Topic generation suggestions [R-3.4.2]
- Document upload for context [R-3.4.3]

**Known Technical Debt**:
- Some public mutations missing return validators
- `v.any()` used in opponent field types (schema flexibility tradeoff)
- Running tally UI not implemented

**Known Issues**:
- None critical documented

---

### Historical Decisions (Best Recollection)

| Decision | Reasoning (if known) | Confidence |
|----------|---------------------|------------|
| Vapi over custom voice pipeline | Faster to market, handles interruptions natively | High |
| Convex over traditional backend | Real-time subscriptions perfect for live debates | High |
| OpenRouter over direct LLM APIs | Model flexibility, unified API | High |
| Transient Vapi assistants | Dynamic config per debate, no dashboard management | High |
| Claude Sonnet for analysis | Cost optimization after claude-3-opus proved too expensive | High |
| GPT-4o for prep generation | Quality over cost for user-facing content | High |
| TanStack Router over React Router | Type-safe routing, modern approach | Med |
| Convex SaaS template base | Auth, Stripe, email already configured | High |
| 11 techniques from Mehdi Hasan's book | Proven framework, teachable techniques | High |

---

### Patterns Already Established

Patterns documented in PROJECT_MAP.md. 

Patterns that may need review:
- Some inconsistency in Convex function return validators
- `v.any()` used where stricter types could apply

---

### Lost Context

- Specific dates of Phase 1 and 2 completion not captured
- Original decision process for choosing Deepgram over alternatives
- Any failed approaches that were abandoned
- Specific prompt iteration history for technique detection

---

### Starting Point for Future Sessions

**Current Focus**: Phase 3 completion, specifically:
- Topic generation suggestions
- Document upload for context
- Missed opportunity detection refinement

**Active Roadmap Item**: [R-3.4.0] Custom Debate Configuration

**Immediate Next Action**: Implement topic suggestion feature [R-3.4.2]

---

### Session Handoff

**Status**: Complete — Baseline Established

**Next Action**: Begin Chapter 1 with real development task

**Roadmap Status**: See ROADMAP.md for current state markers

**Open Questions**: 
- Should topic suggestions use web search or just LLM generation?
- What document formats should be supported for upload?
- How sophisticated should missed opportunity detection be?

---

### Codebase Snapshot

**Key Directories**:
```
orator/
├── convex/           # Backend (Convex functions)
│   ├── actions/      # External API calls (prep, research)
│   ├── lib/          # Shared utilities (openrouter, scoring)
│   └── *.ts          # Queries, mutations, schema
├── src/
│   ├── routes/       # TanStack Router pages
│   │   └── _app/_auth/dashboard/  # Main app routes
│   └── ui/           # Reusable components
├── docs/             # Project documentation
└── rules/            # AI documentation system (this folder)
```

**Environment Variables Required**:
- `VITE_CONVEX_URL` — Convex deployment URL
- `VITE_VAPI_PUBLIC_API_KEY` — Vapi public key
- `OPENROUTER_API_KEY` — OpenRouter API key (Convex env)
- `STRIPE_SECRET_KEY` — Stripe key (Convex env)
- `RESEND_API_KEY` — Resend key (Convex env)
- `FIRECRAWL_API_KEY` — Firecrawl key (Convex env)

**Dev Commands**:
```bash
# Start development
npm run dev          # Frontend (Vite)
npx convex dev       # Backend (Convex)

# Deploy
npx convex deploy    # Deploy backend
# Frontend auto-deploys via Netlify
```

---

## Chapter Template (for future sessions)

```markdown
## Chapter N: [Title]

### TL;DR
[2-3 sentence summary of what was accomplished]

**Roadmap Items Advanced**: [R-X.X.X], [R-Y.Y.Y]

---

### Session Context
**Date**: [Date]
**Starting Point**: [What was the immediate goal?]
**Ending Point**: [What state is the code in now?]

---

### Work Completed

#### [Task 1 Name]
- What was done
- Key decisions made
- Files modified

#### [Task 2 Name]
...

---

### Technical Decisions

| Decision | Reasoning | Alternatives Considered |
|----------|-----------|------------------------|
| | | |

---

### Problems Encountered

#### [Problem 1]
**Symptoms**: 
**Cause**: 
**Solution**: 
**Time spent**: 

---

### Code Changes Summary

| File | Change Type | Description |
|------|-------------|-------------|
| path/to/file.ts | Modified | Brief description |

---

### Tests/Verification
- What was tested
- How it was verified

---

### Session Handoff

**Status**: [Complete / Partial / Blocked]

**Next Action**: [Specific next step]

**Blockers**: [Any blockers for next session]

**Open Questions**: 
- Question 1
- Question 2
```

---

*Future chapters will be appended below this line.*

---

## Chapter 0.1: Corrections — Baseline Audit

**Date**: December 2, 2024

**Issue**: Chapter 0 incorrectly marked several features as incomplete based on outdated PHASES.md rather than actual code inspection.

### Corrections Made:

**1. Research Mode (Firecrawl)** — Was marked "Not started", actually ✅ COMPLETE:
- `convex/lib/firecrawl.ts` — Firecrawl v2 API integration
- `convex/actions/research.ts` — `gatherEvidence` action
- `convex/research.ts` — Storage and retrieval
- `src/routes/_app/_auth/dashboard/prep.tsx` — Research tab in UI

**2. Missed Opportunity Detection** — Was marked "In progress", actually ✅ COMPLETE:
- Implemented in `convex/analysis.ts` generateFullAnalysis
- Prompt asks for 3-5 missed opportunities
- Stored in analyses table

### Actual Remaining Work (Phase 3):
- ⬜ Topic generation suggestions [R-3.4.2]
- ⬜ Document upload for context [R-3.4.3]

**Lesson**: Always inspect actual codebase, not documentation, when establishing baseline. PHASES.md was outdated.

---
