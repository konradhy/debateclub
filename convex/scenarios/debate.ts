/**
 * Debate Scenario Configuration
 *
 * The original OratorPrep scenario using Mehdi Hasan's debate methodology.
 * Uses DebatePrepPage with full debate-specific prep materials.
 */

import { ScenarioConfig } from "./types";

export const DebateScenario: ScenarioConfig = {
  id: "debate",
  name: "Debate",
  category: "debate",

  defaultInterruptionMode: "debate",

  pipeline: {
    research: true, // Run web research
    prep: true,
    prepType: "debate", // Uses DebatePrepPage
  },

  inputs: {
    // ==========================================
    // BASIC INFO
    // ==========================================
    name: {
      label: "Opponent Name",
      placeholder: "e.g., Climate Skeptic, Senator Johnson, Policy Expert",
      required: true,
    },
    topic: {
      label: "Debate Topic",
      placeholder:
        "e.g., Climate change requires immediate government intervention",
      required: true,
    },
    position: {
      label: "Your Position",
      placeholder: "",
      helperText: "The system will take the opposite position",
      required: true,
    },
    style: {
      label: "Opponent Debate Style",
      placeholder: "Select style",
      helperText: "Determines how your practice opponent will debate against you",
    },
    difficulty: {
      label: "Difficulty Level",
      placeholder: "Select difficulty",
      helperText: "Controls how challenging your practice opponent will be",
    },

    // ==========================================
    // ABOUT YOUR OPPONENT (Chapter 4: Three C's)
    // ==========================================
    opponentDescription: {
      label: "Background",
      placeholder:
        "Who is this person? What's their role, history, or relevance to this debate?",
      helperText:
        "e.g., 'Conservative economist, former advisor to the Reagan administration'",
    },
    opponentOrganization: {
      label: "Organization / Affiliation",
      placeholder: "e.g., Cato Institute, Heritage Foundation",
    },
    opponentCredentials: {
      label: "Their Credentials",
      placeholder:
        "What expertise do they claim? Degrees, positions, experience?",
      helperText:
        "Hasan Chapter 4: 'Challenge their credentials — but only AFTER they've invoked them'",
    },
    credentialWeaknesses: {
      label: "Credential Weaknesses",
      placeholder:
        "Where do their credentials fall short? Areas outside their expertise?",
      helperText:
        "e.g., 'PhD is in unrelated field', 'Funded by industry groups'",
    },
    opponentDebateStyle: {
      label: "Their Debate Style",
      placeholder: "",
    },
    opponentRhetoricalTendencies: {
      label: "Rhetorical Tendencies",
      placeholder:
        "How do they typically argue? Any patterns, habits, or tells?",
    },
    opponentTriggers: {
      label: "Emotional Triggers",
      placeholder:
        "What topics make them defensive or emotional? What sets them off?",
      helperText:
        "Strategic provocation can expose weaknesses — Hasan Chapter 12: 'Keep Calm'",
    },
    opponentCharacterIssues: {
      label: "Character / Credibility Issues",
      placeholder:
        "Conflicts of interest? Bias? Funding sources? Past scandals?",
      helperText:
        "Hasan's First C: 'Challenge their CHARACTER' — but use judiciously",
    },

    // ==========================================
    // OPPONENT'S RECORD (Chapter 10: Booby Traps)
    // ==========================================
    opponentPastStatements: {
      label: "Past Statements / Quotes",
      placeholder:
        "Notable quotes, positions they've taken on record, past claims...",
      helperText:
        "Hasan's favorite trap: Quote them without attribution, get them to disagree, then reveal the source",
    },
    opponentContradictions: {
      label: "Known Contradictions",
      placeholder:
        "Times they've contradicted themselves, changed positions, or been inconsistent...",
      helperText:
        "'Earlier you said X, but now you're saying Y. Which is it?' — devastating if you have the receipts",
    },
    opponentTrackRecord: {
      label: "Track Record",
      placeholder:
        "Wrong predictions, debunked claims, failed policies they advocated...",
      helperText:
        "Hasan's Third C: 'Challenge their CLAIMS' — especially their track record of being wrong",
    },

    // ==========================================
    // STEELMANNING THEIR CASE (Chapter 15: Homework)
    // ==========================================
    opponentStrongestArguments: {
      label: "Their Strongest Arguments",
      placeholder:
        "What's the best version of their case? Steelman it — don't strawman.",
      helperText:
        "Hasan: 'Constructing the most compelling form of your opponent's argument' prepares you to counter it",
    },
    opponentBestEvidence: {
      label: "Their Best Evidence",
      placeholder:
        "What's their strongest proof? Which stats, studies, or examples will they cite?",
    },
    opponentLikelyCritiques: {
      label: "How They'll Attack You",
      placeholder:
        "What will they say against YOUR position? Anticipated critiques?",
      helperText:
        "Prepare counters for their most likely attacks — don't be caught off guard",
    },

    // ==========================================
    // YOUR AUDIENCE (Chapter 1: Know Your Audience)
    // ==========================================
    audienceDescription: {
      label: "Audience Description",
      placeholder:
        "Who will be watching? What are their concerns, values, knowledge level?",
      helperText:
        "Hasan: 'The audience is judge and jury — you're not convincing your opponent, you're convincing THEM'",
    },
    audienceType: {
      label: "Audience Type",
      placeholder: "",
    },
    audienceSize: {
      label: "Audience Size",
      placeholder: "",
    },
    audienceDisposition: {
      label: "Audience Disposition",
      placeholder: "",
    },
    debateFormat: {
      label: "Debate Format",
      placeholder: "",
    },

    // ==========================================
    // YOUR CONTEXT & DIRECTIVES
    // ==========================================
    userResearch: {
      label: "Your Research / Notes",
      placeholder:
        "Paste articles, notes, data, anything you've gathered that should inform the prep...",
      helperText:
        "This will be synthesized with AI research to create tailored debate materials",
    },
    keyPointsToMake: {
      label: "Key Points to Emphasize",
      placeholder:
        "What arguments or themes do you definitely want to include?",
      helperText:
        "The AI will ensure these points are woven into your prep materials",
    },
    thingsToAvoid: {
      label: "Things to Avoid",
      placeholder:
        "Topics, arguments, or approaches you want to steer clear of...",
      helperText: "e.g., 'Don't engage on inflation — I'm less prepared there'",
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
- Respond naturally if interrupted
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
