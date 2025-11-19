# Win Every Argument - AI Debate Training Platform

## Overview

**Win Every Argument** is a voice-based debate training platform that teaches users Mehdi Hasan's proven debate techniques through real-time practice with adaptive AI opponents. Users practice against AI that adapts to their skill level, uses specific talking points they provide, and receive immediate feedback on technique usage.

## Project Information

- **Version:** 1.0
- **Date:** November 2024
- **Based on:** "Win Every Argument" by Mehdi Hasan

## Tech Stack

- **Voice AI:** Vapi (handles all voice interactions, interruptions, transcription)
- **Backend:** Convex (database, real-time sync, serverless functions)
- **Authentication:** Convex Auth
- **Frontend:** TanStack Start (React-based)
- **Hosting:** Netlify
- **AI/LLM:** OpenRouter (for AI opponent logic and analysis)

## Core Concept

The platform teaches debate mastery through practice, not theory. Users engage in real-time voice debates with AI opponents that:

- Adapt difficulty based on performance
- Use custom talking points you provide
- Employ Mehdi Hasan's techniques strategically
- Provide immediate feedback on technique usage
- Generate comprehensive post-debate analysis

## Key Features

### 1. Real-Time Voice Debates
- Natural conversation flow with interruptions
- Multiple AI personality types (Aggressive, Socratic, Academic, Political)
- Adaptive difficulty adjustment
- 5-15 minute debate sessions

### 2. Technique Training
- 11+ debate techniques from Mehdi Hasan's book
- Real-time technique detection and scoring
- Visual feedback during debates
- Missed opportunity identification

### 3. Opponent Preparation Mode
- Configure AI with real opponent's talking points
- Set opponent's debate style and personality
- Practice against specific arguments you'll face
- Test counter-arguments before the real debate

### 4. Performance Analysis
- Full transcript with technique annotations
- Effectiveness scores for each technique
- Identification of key moments
- Personalized improvement recommendations
- Progress tracking over time

## Quick Start

- **New to the project?** Start with [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for a high-level overview
- **Want to understand the techniques?** Read [TECHNIQUES.md](./TECHNIQUES.md)
- **Ready to build?** See [PHASES.md](./PHASES.md) for the implementation roadmap

## Documentation Structure

### For Everyone

- **[TECHNIQUES.md](./TECHNIQUES.md)** - Mehdi Hasan's debate techniques explained (non-technical)
  - The Judo Moves (defensive techniques)
  - Opening hooks and closings
  - Offensive techniques
  - Counter-tactics
  - How the platform teaches these
  
- **[EXAMPLES.md](./EXAMPLES.md)** - Real debate flow examples and scenarios
  - Complete annotated debate transcripts
  - Technique usage examples
  - AI feedback demonstrations
  - Success and failure patterns

### For Developers

- **[PHASES.md](./PHASES.md)** - Implementation roadmap and phased development plan
  - 4-phase development approach
  - MVP scope (Week 1)
  - Feature priorities
  - Timeline and milestones
  
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical system architecture and design
  - System overview and data flow
  - Technology stack rationale
  - Component details
  - Performance considerations
  
- **[VAPI_ARCHITECTURE.md](./VAPI_ARCHITECTURE.md)** - How Vapi actually works (ESSENTIAL READING)
  - Complete explanation of Vapi as a managed service
  - STT → LLM → TTS pipeline
  - Orchestration layer (endpointing, interruptions, filtering)
  - What API keys you actually need
  - Cost structure and optimization
  
- **[VAPI_INTEGRATION.md](./VAPI_INTEGRATION.md)** - Vapi voice platform integration guide
  - Complete assistant configuration
  - Function calling implementation
  - Webhook integration
  - Development workflow
  
- **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Convex database schema and data model
  - All table definitions
  - Relationships and indexes
  - Common queries
  - Migration strategies

- **[USER_STORIES.md](./USER_STORIES.md)** - Feature specifications and user stories
  - Detailed acceptance criteria
  - Implementation guidance
  - User experience flows
  - Priority matrix

## Quick Start

### For Users
1. Create an account
2. Click "Start Practice Debate"
3. Speak naturally - the AI will respond
4. Review your performance analysis
5. Practice recommended techniques

### For Developers
See [PHASES.md](./PHASES.md) for development setup and implementation phases.

## Success Metrics

### User Engagement
- Average debates per week per user
- Completion rate of debates (not abandoned)
- Time spent in app
- Return rate after first debate

### Skill Development
- Technique usage frequency over time
- Effectiveness scores improving
- Variety of techniques used
- Successful defense against Gish Gallop

### Platform Performance
- Voice latency < 500ms
- Accurate technique detection > 85%
- User satisfaction > 4.5/5
- Word-of-mouth referrals

## Cost Estimates

Based on Vapi pricing model:
- 10-minute debate: ~$1.00-$3.00 total cost
- 100 active users × 30 min/week = $600-$900/week
- See [VAPI_INTEGRATION.md](./VAPI_INTEGRATION.md) for detailed breakdown

## License

[Your License Here]

## Contact

[Your Contact Information]
