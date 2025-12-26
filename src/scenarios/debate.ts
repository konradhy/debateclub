/**
 * Debate Scenario Configuration
 *
 * Defines the full debate scenario using Mehdi Hasan's methodology.
 * This is the most comprehensive scenario with research, prep, and detailed analysis.
 */

import { ScenarioConfig } from "./types";

/**
 * Full debate scenario with Hasan methodology.
 */
export const DebateScenario: ScenarioConfig = {
  id: "debate",
  name: "Debate",
  category: "debate",

  pipeline: {
    research: true, // Run Firecrawl/Gemini research
    prep: true, // Show full prep page
    prepType: "debate", // Use debate-specific prep page
  },

  inputs: {
    // Basic info
    topic: {
      label: "Debate Topic",
      placeholder: "e.g., Universal Basic Income should be implemented",
    },
    position: {
      label: "Your Position",
      placeholder: "pro or con",
    },
    opponentDescription: {
      label: "About Your Opponent",
      placeholder: "Who are you debating? Background, role, expertise...",
    },
    talkingPoints: {
      label: "Key Points to Make",
      placeholder: "Main arguments you want to emphasize",
    },

    // Audience context (Chapter 1)
    audienceDescription: {
      label: "Describe Your Audience",
      placeholder:
        "Who will be watching/listening? What do they care about? What are their biases?",
      helperText: "Chapter 1: Winning Over an Audience",
    },
    audienceType: {
      label: "Audience Type",
      placeholder: "Select audience type",
    },
    audienceSize: {
      label: "Audience Size",
      placeholder: "Select audience size",
    },
    audienceDisposition: {
      label: "Audience Disposition",
      placeholder: "Select disposition",
    },
    debateFormat: {
      label: "Debate Format",
      placeholder: "Select format",
    },

    // Opponent profile fields (Chapters 4, 10, 15)
    opponentOrganization: {
      label: "Organization/Affiliation",
      placeholder: "Where do they work? What group do they represent?",
    },
    opponentCredentials: {
      label: "Their Credentials",
      placeholder: "What expertise or authority do they claim?",
      helperText: "Chapter 4: Play the Ball... AND the Man",
    },
    credentialWeaknesses: {
      label: "Credential Weaknesses",
      placeholder:
        "Any gaps in their expertise? Are they speaking outside their field?",
    },
    opponentPastStatements: {
      label: "Past Statements (for traps)",
      placeholder: "Quotes, tweets, articles they've written that you can use",
      helperText: "Chapter 10: Booby Traps",
    },
    opponentContradictions: {
      label: "Known Contradictions",
      placeholder: "Have they changed positions? Said conflicting things?",
    },
    opponentTrackRecord: {
      label: "Track Record",
      placeholder: "Wrong predictions? Debunked claims? Failed policies?",
    },
    opponentDebateStyle: {
      label: "Their Debate Style",
      placeholder: "Select style",
    },
    opponentRhetoricalTendencies: {
      label: "Rhetorical Tendencies",
      placeholder: "Do they interrupt? Appeal to emotion? Cite lots of stats?",
    },
    opponentTriggers: {
      label: "Known Triggers",
      placeholder: "Topics that make them defensive or emotional",
    },
    opponentStrongestArguments: {
      label: "Their Strongest Arguments",
      placeholder: "Steelman their best case - what's hardest to counter?",
      helperText: "Chapter 15: Do Your Homework",
    },
    opponentBestEvidence: {
      label: "Their Best Evidence",
      placeholder: "What studies, data, or examples will they cite?",
    },
    opponentLikelyCritiques: {
      label: "Likely Critiques of You",
      placeholder: "How will they attack your position or credibility?",
    },
    opponentCharacterIssues: {
      label: "Character Issues",
      placeholder: "Conflicts of interest? Funding sources? Biases?",
    },

    // User context
    userResearch: {
      label: "Your Research Notes",
      placeholder: "Paste any research, articles, data you've gathered",
    },
    keyPointsToMake: {
      label: "Key Points to Emphasize",
      placeholder: "What MUST you get across? Your non-negotiable arguments",
    },
    thingsToAvoid: {
      label: "Things to Avoid",
      placeholder: "Topics where you're weak? Areas to not engage on?",
    },
    toneDirectives: {
      label: "Tone & Style Preferences",
      placeholder:
        "How do you want to come across? Aggressive, measured, humorous, academic...?",
      helperText:
        "This shapes the zingers, openings, and overall rhetorical approach",
    },
  },

  assistant: {
    firstMessage: `I'm ready to debate. The topic is: {{TOPIC}}. I'll argue that {{AI_POSITION_DESC}}. Would you like to make your opening statement first, or shall I begin?`,

    systemPrompt: `You are a skilled debater using Mehdi Hasan's debate techniques.

DEBATE SETUP:
- Topic: {{TOPIC}}
- Your position: {{AI_POSITION}}
- User position: {{USER_POSITION}}
- Difficulty: {{DIFFICULTY}}
- Style: {{STYLE}}

YOUR KEY ARGUMENTS:
{{TALKING_POINTS}}

TECHNIQUES TO USE:
1. Concession & Pivot - When user makes a good point, acknowledge it then pivot
2. Receipts - Deploy specific evidence, statistics, citations
3. Zinger - Memorable one-liners (under 20 words)
4. Reframing - Change the premise of the question
5. Preemption - Address arguments before they're made

BEHAVIORAL RULES:
- Speak naturally and conversationally
- You CAN be interrupted - respond naturally
- You CAN interrupt if user rambles > 45 seconds
- Keep responses under 30 seconds of speech
- Focus ONLY on debating - do not mention analysis, logging, or techniques
- Be respectful but firm in your arguments
- Use evidence and facts to support your position`,

    voice: {
      provider: "11labs",
      voiceId: "21m00Tcm4TlvDq8ikWAM",
      stability: 0.75,
      similarityBoost: 0.8,
    },

    temperature: 0.7,
    canInterrupt: true,
    interruptionThreshold: 100,
  },

  analysis: {
    framework: "debate",
    scoreCategories: [
      {
        name: "Fundamentals",
        description:
          "Chapters 1-6: Audience, Emotion, Evidence, Ad Hominem, Listening, Humor",
      },
      {
        name: "Tricks of Trade",
        description:
          "Chapters 7-11: Rule of Three, Judo Moves, Zingers, Traps, Gish Gallop",
      },
      {
        name: "Behind the Scenes",
        description:
          "Chapters 12-15: Confidence, Composure, Practice, Homework",
      },
      {
        name: "Grand Finale",
        description: "Chapter 16: Closing/Peroration",
      },
    ],
    systemPrompt: `Analyze this debate using Mehdi Hasan's framework from "Win Every Argument".

TRANSCRIPT:
{{TRANSCRIPT}}

Provide comprehensive analysis following the Hasan methodology...`,
  },
};
