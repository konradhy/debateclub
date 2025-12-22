# Project Summary

**Win Every Argument - AI Debate Training Platform**

This document provides a high-level overview of the entire project for quick reference.

---

## What We're Building

A voice-based AI debate training platform that teaches users Mehdi Hasan's proven debate techniques through real-time practice with adaptive AI opponents.

### The Core Experience

1. **User clicks "Start Debate"**
2. **AI opponent engages in natural voice conversation**
3. **System detects techniques in real-time** (both user's and AI's)
4. **User receives immediate feedback** ("Concession & Pivot - 9/10")
5. **Post-debate analysis** shows strengths, weaknesses, and missed opportunities
6. **Progress tracking** shows technique mastery over time

---

## Why This Matters

### The Problem
- Traditional debate training is expensive and inaccessible
- Books teach theory, but practice is hard to find
- No immediate feedback on technique usage
- Hard to practice against specific opponents' arguments

### Our Solution
- Instant practice anytime, anywhere
- Real-time technique detection and scoring
- Adaptive AI that uses Mehdi Hasan's techniques against you
- Prepare for real debates by configuring AI with actual talking points
- Comprehensive analysis shows exactly what to improve

---

## Key Features

### Phase 1 (MVP - Week 1)
✅ **Quick Start Debate** - One-click practice with default settings  
✅ **Natural Voice** - Interrupt and be interrupted naturally  
✅ **Basic Recording** - Full transcript storage  

### Phase 2 (Week 2)
✅ **Technique Detection** - Real-time recognition of 3 core techniques  
✅ **Live Feedback** - Visual badges when techniques used  
✅ **Basic Analysis** - Post-debate summary with scores  

### Phase 3 (Week 3)
✅ **Opponent Preparation** - Configure AI with real talking points  
✅ **All 12 Techniques** - Full Mehdi Hasan framework  
✅ **Missed Opportunities** - AI identifies chances you missed  
✅ **Progress Tracking** - Mastery levels for each technique  

### Phase 4 (Week 4+)
✅ **Live Coaching** - Contextual hints during debate  
✅ **Improvement Roadmap** - Personalized practice recommendations  
✅ **Advanced Analytics** - Deep performance insights  

---

## The 12 Debate Techniques

### Defensive (Judo Moves)
1. **Concession & Pivot** - Agree partially, then counter
2. **Reframing** - Change the question's premise
3. **Preemption** - Address arguments before they're made
4. **Gish Gallop Defense** - Counter rapid-fire arguments

### Opening Hooks
5. **Provocative Question** - Start with surprising question
6. **Personal Story** - Begin with compelling anecdote

### Offensive
7. **Rule of Three** - Structure arguments in threes
8. **Zinger** - Memorable one-liner
9. **Gish Gallop Attack** - Overwhelm with multiple points
10. **Strategic Interruption** - Interrupt at perfect moment

### Evidence & Closing
11. **Receipts** - Deploy evidence at perfect time
12. **Peroration** - Powerful closing with call to action

---

## Technology Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Voice AI** | Vapi | Orchestrates entire voice pipeline, handles interruptions |
| **Backend** | Convex | Real-time database + serverless functions |
| **Auth** | Convex Auth | Built-in authentication |
| **AI/LLM** | OpenRouter | Access to Claude/GPT for analysis |
| **Frontend** | TanStack Start | Modern React framework |
| **Hosting** | Netlify | Static site hosting |

### Data Flow
```
User speaks → Vapi → Deepgram (STT) → OpenRouter (LLM) → ElevenLabs (TTS) → Audio
                ↓
          Webhooks to Convex
                ↓
          Technique Detection
                ↓
          Real-time UI Updates
```

---

## Cost Structure

### Per-Debate Costs
- 10-minute debate: **~$1.00-$3.00**
  - Vapi platform: $0.50
  - Transcription (Deepgram): $0.10
  - LLM (GPT-4): $1.00
  - Voice (ElevenLabs): $0.40

### Monthly Estimates
- 100 active users @ 30 min/week = **$2,400-$3,600/month**
- Scales linearly with usage

### Optimization Strategies
- Use GPT-3.5 for testing (cheaper)
- Deepgram Aura for TTS (alternative)
- Implement call duration limits
- Cache common responses

---

## Database Schema

### Core Tables
```
users (accounts & stats)
  ├── debates (debate sessions)
  │    ├── techniques (technique usage)
  │    ├── exchanges (turn-by-turn)
  │    └── analyses (post-debate reports)
  ├── opponentProfiles (prepared opponents)
  └── progress (technique mastery)
```

### Key Relationships
- One user → many debates
- One debate → many techniques, exchanges, one analysis
- One user → many opponent profiles
- One user → many progress records (one per technique)

---

## User Journey

### First-Time User
1. **Lands on homepage** - Sees "Start Practice Debate"
2. **Clicks button** - Microphone permission requested
3. **Voice check** - Quick test
4. **AI introduces debate** - "I'm ready to debate climate policy..."
5. **Natural conversation** - 5-10 minutes
6. **Debate ends** - Analysis generates
7. **Reviews performance** - Sees techniques used, effectiveness scores
8. **Gets recommendations** - "Practice Concession & Pivot next"

### Returning User
1. **Views progress dashboard** - Technique mastery levels
2. **Clicks "Prepare for Real Debate"** - Has debate next week
3. **Configures opponent** - Enters their talking points
4. **Practices multiple times** - Against realistic arguments
5. **Reviews each practice** - Sees improvement over time
6. **Feels confident** - Ready for real debate

---

## Implementation Timeline

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| **Phase 1** | Week 1 (5-7 days) | Working voice debate, basic recording |
| **Phase 2** | Week 2 (5-7 days) | 3 techniques detected, live feedback |
| **Phase 3** | Week 3 (5-7 days) | All 12 techniques, opponent prep |
| **Phase 4** | Week 4+ (14-19 days) | Polish, advanced features, launch |
| **Total** | **4-6 weeks** | **Production-ready platform** |

---

## Success Metrics

### User Engagement
- Time to first debate: < 60 seconds
- Debate completion rate: > 80%
- Return for 2nd debate: > 60%
- Average debates per user: 2+ per week

### Learning Outcomes
- Technique usage increases over time
- Effectiveness scores improve
- Variety of techniques expands
- User confidence increases (surveyed)

### Technical Performance
- Voice latency: < 500ms
- Technique detection accuracy: > 85%
- System uptime: > 99%
- Zero data loss

---

## Risk Mitigation

### Technical Risks
| Risk | Mitigation |
|------|-----------|
| Voice latency too high | Use Deepgram (fastest), optimize prompts |
| Technique detection inaccurate | Continuous prompt refinement, testing |
| Costs exceed budget | Usage limits, cost monitoring |
| Vapi downtime | Fallback assistant configuration |

### User Experience Risks
| Risk | Mitigation |
|------|-----------|
| Users don't understand techniques | Better onboarding, tutorial debate |
| AI too difficult/easy | Adaptive difficulty, clear level selection |
| Voice permissions confusing | Clear instructions, troubleshooting guide |

---

## Unique Value Propositions

### For Students
- Practice debate anytime, no partner needed
- Immediate feedback on technique usage
- Affordable compared to debate coaching
- Progress tracking shows improvement

### For Professionals
- Prepare for specific meetings/negotiations
- Configure AI with real opponent's arguments
- Test responses before high-stakes conversations
- Build confidence through repetition

### For Debate Enthusiasts
- Master Mehdi Hasan's proven techniques
- Challenge yourself against sophisticated AI
- Track mastery across all techniques
- Share memorable moments

---

## Competitive Advantages

1. **Real-time technique detection** - No other platform does this
2. **Opponent preparation mode** - Unique feature for real-world prep
3. **Natural voice conversation** - Feels like real debate, not scripted
4. **Mehdi Hasan framework** - Proven techniques from bestselling book
5. **Adaptive difficulty** - AI adjusts to your skill level
6. **Comprehensive analytics** - Know exactly what to improve

---

## Next Steps

### To Get Started (Day 1)
1. Create accounts (Vapi, Convex, OpenRouter)
2. Initialize project structure
3. Set up basic Convex schema
4. Create simple Vapi assistant
5. Test voice conversation

### First Week Goals
- Working voice debate
- Natural interruptions
- Transcript storage
- Basic UI

### First Month Goals
- All 12 techniques detected
- Opponent preparation working
- Progress tracking implemented
- Ready for beta users

---

## Documentation Map

```
📁 docs/
├── 📄 README.md ...................... Start here
├── 📄 PROJECT_SUMMARY.md ............. This file (quick overview)
│
├── 📚 Non-Technical Docs
│   ├── 📄 TECHNIQUES.md .............. Mehdi Hasan's debate techniques
│   └── 📄 EXAMPLES.md ................ Real debate examples with analysis
│
└── 📚 Technical Docs
    ├── 📄 PHASES.md .................. Implementation roadmap
    ├── 📄 ARCHITECTURE.md ............ System design and data flow
    ├── 📄 VAPI_INTEGRATION.md ........ Voice platform integration
    ├── 📄 DATABASE_SCHEMA.md ......... Data models and queries
    └── 📄 USER_STORIES.md ............ Features and acceptance criteria
```

---

## Key Decisions Made

### Technical Decisions
- **Vapi over custom voice pipeline** - Faster to market, handles complexity
- **Convex over traditional backend** - Real-time out of the box
- **OpenRouter over direct LLM** - Flexibility to switch models
- **TanStack Start over Next.js** - Modern, good developer experience

### Product Decisions
- **Focus on practice over competition** - Skill development primary goal
- **Mehdi Hasan framework** - Proven, teachable techniques
- **Voice-first experience** - More realistic than text
- **Opponent preparation mode** - Bridges practice to real debates

### Scope Decisions
- **Start with 3 techniques in Phase 2** - Prove concept before building all
- **MVP is 5-minute debates** - Quick wins, fast feedback
- **No mobile apps initially** - Web first, apps later
- **No live human debates initially** - AI opponents only for MVP

---

## Questions We've Answered

**Q: Why voice instead of text?**  
A: Debates happen verbally. Voice forces users to practice the actual skill they need.

**Q: Why AI opponents instead of human?**  
A: Available 24/7, consistent quality, adaptive difficulty, no scheduling needed.

**Q: Why Mehdi Hasan's techniques specifically?**  
A: Proven framework from bestselling book, teachable, concrete, and effective.

**Q: Can users practice for specific debates?**  
A: Yes! Opponent preparation mode lets you configure AI with real talking points.

**Q: How accurate is technique detection?**  
A: Target is 85%+. Uses Claude Opus for analysis, continuously refined.

**Q: What if I don't want to debate politics?**  
A: Topics are fully customizable. Debate anything: business, personal, academic.

**Q: How much will it cost to run?**  
A: ~$1-3 per user per month at scale. Sustainable with subscription model.

**Q: How long until launch?**  
A: 4-6 weeks for production-ready platform with all core features.

---

## Vision

### Short-term (3-6 months)
- Launch with core features
- Build community of 1,000+ active users
- Refine technique detection based on feedback
- Add more debate formats

### Medium-term (6-12 months)
- Mobile apps (iOS/Android)
- Video recording of debates
- Compete against other users
- Integration with debate organizations
- Premium coaching features

### Long-term (1-2 years)
- Become THE platform for debate training
- 100,000+ users globally
- Partner with universities and debate leagues
- AI models trained specifically on debate
- Famous debates recreated for practice

---

## Contact & Resources

- **Documentation:** `/docs` directory
- **Convex Rules:** `.cursor/rules/convex_rules.mdc`
- **Source Material:** "Win Every Argument" by Mehdi Hasan

---

**Last Updated:** December 2025  
**Version:** 1.0  
**Status:** Documentation Complete, Ready for Development

