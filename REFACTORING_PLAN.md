# REVISED Codebase Audit - Based on Your Priorities

## FILES REQUIRING REFACTORING (400+ lines only)

### 🔴 CRITICAL PRIORITY

| File | Lines | Action |
|------|-------|--------|
| **`src/routes/_app/_auth/dashboard/prep.tsx`** | **3,096** | **BREAK DOWN IMMEDIATELY** - This is our #1 target |
| `src/routes/_app/_auth/dashboard/opponent-profile.tsx` | 1,048 | Break into components |
| `src/routes/_app/login/_layout.index.tsx` | 716 | Break into auth components |
| `src/routes/_app/_auth/dashboard/analysis.tsx` | 634 | Break into analysis sections |
| `src/routes/_app/_auth/dashboard/debate.tsx` | 604 | Break into debate components |
| `src/routes/_app/_auth/dashboard/history.tsx` | 481 | Break into history components |

All other files are either:
- Marketing content (ignore)
- Under 400 lines (ignore)
- Convex backend (leave alone)

---

## 1. PRIORITY #1: REFACTOR `prep.tsx` (3,096 lines)

This is your main bottleneck. Here's how to break it down:

### Proposed Component Structure:

```
src/routes/_app/_auth/dashboard/prep/
├── index.tsx                          # Main route (orchestration only, ~150 lines)
├── hooks/
│   ├── usePrepData.ts                 # Data fetching logic
│   ├── useResearchSynthesis.ts        # Research state
│   └── usePrepChat.ts                 # Chat state
├── components/
│   ├── PrepHeader.tsx                 # Opponent info header
│   ├── ResearchSection/
│   │   ├── ResearchPanel.tsx          # Main research UI
│   │   ├── ResearchSynthesis.tsx      # Synthesis display
│   │   └── ResearchArticles.tsx       # Article list
│   ├── OpeningsSection.tsx            # Openings buffet
│   ├── FramesSection.tsx              # Argument frames
│   ├── ReceiptsSection.tsx            # Evidence arsenal
│   ├── ZingersSection.tsx             # Zingers bank
│   ├── ClosingsSection.tsx            # Closings buffet
│   ├── OpponentIntelSection.tsx       # Opponent intel & counters
│   ├── PrepChatSection/
│   │   ├── ChatInterface.tsx          # Chat UI
│   │   └── ChatMessage.tsx            # Individual messages
│   └── QuickReference.tsx             # Selected items panel
└── types.ts                           # Shared types
```

### Breakdown Benefits:
- Each section becomes ~100-200 lines
- Easier to test individual sections
- Can lazy-load sections for performance
- Clear separation of concerns

---

## 2. PRIORITY #2: FIX MARKETING FOLDER STRUCTURE

### Current Structure (MESSY):
```
src/
├── routes/
│   ├── blog/                    # ← Should be in marketing/
│   ├── use-cases/               # ← Should be in marketing/
│   ├── win-every-argument.tsx   # ← Should be in marketing/
│   └── contact.tsx              # ← Should be in marketing/
└── components/
    └── marketing/
        └── landing-page/        # ← Only this is organized
```

### Proposed Structure (CLEAN):
```
src/
├── routes/
│   ├── _app/                    # App routes only
│   └── marketing/               # NEW: All marketing content
│       ├── blog/
│       │   ├── index.tsx
│       │   ├── blueprint-part-1.tsx
│       │   ├── blueprint-part-2.tsx
│       │   └── ... (all blog posts)
│       ├── use-cases/
│       │   ├── job-interviews.tsx
│       │   ├── sales-objections.tsx
│       │   └── ... (all use cases)
│       ├── landing/
│       │   └── index.tsx        # Main landing page
│       ├── win-every-argument.tsx
│       └── contact.tsx
└── components/
    └── marketing/
        ├── landing-page/        # Keep as is
        ├── blog/                # NEW: Shared blog components
        └── use-cases/           # NEW: Shared use-case components
```

### Migration Steps:
1. Create `src/routes/marketing/` directory
2. Move all blog files to `src/routes/marketing/blog/`
3. Move all use-case files to `src/routes/marketing/use-cases/`
4. Move marketing pages to `src/routes/marketing/`
5. Update route imports
6. Update TanStack Router configuration

---

## 3. PRIORITY #3: UPDATE PROJECT_MAP.md

Add these missing items:

### Missing from Documentation:

**New Actions:**
- `convex/actions/geminiPrep.ts` - Gemini-based research system
- `convex/actions/genericPrep.ts` - Generic scenario prep generation

**New Lib Files:**
- `convex/lib/geminiDeepResearch.ts` - Gemini deep research integration
- `convex/lib/geminiSearch.ts` - Gemini search utilities

**New Tables:**
- `geminiResearchProgress` - Progress tracking for Gemini research

**New Directory:**
- `convex/scenarios/` - Scenario configuration system
  - `debate.ts` - Debate scenario config
  - `sales.ts` - Sales scenario config
  - `entrepreneur.ts` - Entrepreneur scenario config
  - `types.ts` - Shared scenario types
  - `index.ts` - Scenario registry

**Duplicate Directory (needs clarification):**
- Both `src/scenarios/` and `convex/scenarios/` exist with identical files
  - **Question**: Why are scenarios duplicated? Should they be in one place?

---

## REVISED PRIORITY ROADMAP

### Phase 1: CRITICAL (Next 2 weeks)
1. ✅ **Refactor `prep.tsx`** - Break into component structure above
2. ✅ **Fix marketing folder structure** - Reorganize routes
3. ✅ **Update PROJECT_MAP.md** - Document new files

### Phase 2: IMPORTANT (Next month)
4. Refactor `opponent-profile.tsx` (1,048 lines)
5. Refactor `login/_layout.index.tsx` (716 lines)
6. Refactor `analysis.tsx` (634 lines)

### Phase 3: POLISH (As needed)
7. Refactor `debate.tsx` (604 lines)
8. Refactor `history.tsx` (481 lines)
9. *Optional*: Split prompts into directory (low priority)

### ❌ NOT DOING:
- ❌ Refactoring marketing content pages
- ❌ Touching files under 400 lines
- ❌ Breaking up Convex files
- ❌ Splitting schema.ts
- ❌ Creating use-case templates

---

## FINAL SUMMARY

**Files Requiring Action: 6 total**
1. prep.tsx (3,096 lines) - CRITICAL
2. opponent-profile.tsx (1,048 lines)
3. login layout (716 lines)
4. analysis.tsx (634 lines)
5. debate.tsx (604 lines)
6. history.tsx (481 lines)

**Organizational Tasks: 2 total**
1. Move marketing content to proper folder structure
2. Update PROJECT_MAP.md with Gemini system and scenarios

**Total Refactoring Scope**: Much smaller and focused now!
