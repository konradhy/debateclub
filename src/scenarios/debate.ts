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
    research: true, // Run web research
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
    style: {
      label: "Debate Style",
      placeholder: "Select style",
      type: "select",
      options: [
        { value: "friendly", label: "Friendly - Conversational, supportive, helps you practice with encouragement" },
        { value: "aggressive", label: "Aggressive - Interrupts, challenges directly, tries to dominate" },
        { value: "academic", label: "Academic - Evidence-heavy, methodical, formal reasoning" },
        { value: "emotional", label: "Emotional - Appeals to feelings, uses stories and anecdotes" },
        { value: "socratic", label: "Socratic - Uses questioning to trap you, forces you to defend assumptions" },
        { value: "gish gallop", label: "Gish Gallop (Aggressive+) - Aggressive debate style with rapid-fire dubious claims" },
      ],
      helperText: "Determines how your practice opponent will behave and argue",
    },
    difficulty: {
      label: "Challenge Level",
      placeholder: "Select difficulty",
      type: "select",
      options: [
        { value: "easy", label: "Easy - Basic arguments, straightforward rebuttals" },
        { value: "medium", label: "Medium - Solid arguments, some strategic moves" },
        { value: "hard", label: "Hard - Advanced tactics, well-researched, strategic" },
      ],
      helperText: "Controls the sophistication and strength of arguments",
    },

    // Audience context
    audienceDescription: {
      label: "Describe Your Audience",
      placeholder:
        "Who will be watching/listening? What do they care about? What are their biases?",
      helperText: "Arguments and examples will be tailored to resonate with this audience's values",
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

    // Opponent profile fields
    opponentOrganization: {
      label: "Organization/Affiliation",
      placeholder: "Where do they work? What group do they represent?",
    },
    opponentCredentials: {
      label: "Their Credentials",
      placeholder: "What expertise or authority do they claim?",
      helperText: "Helps identify when and how to challenge their claimed authority",
    },
    credentialWeaknesses: {
      label: "Credential Weaknesses",
      placeholder:
        "Any gaps in their expertise? Are they speaking outside their field?",
      helperText: "Identifies vulnerabilities in their claim to expertise",
    },
    opponentPastStatements: {
      label: "Past Statements (for traps)",
      placeholder: "Quotes, tweets, articles they've written that you can use",
      helperText: "These can be used strategically to catch them in contradictions",
    },
    opponentContradictions: {
      label: "Known Contradictions",
      placeholder: "Have they changed positions? Said conflicting things?",
      helperText: "Creates opportunities to question their consistency and credibility",
    },
    opponentTrackRecord: {
      label: "Track Record",
      placeholder: "Wrong predictions? Debunked claims? Failed policies?",
      helperText: "Past failures undermine their current claims and predictions",
    },
    opponentDebateStyle: {
      label: "Their Debate Style",
      placeholder: "Select style",
    },
    opponentRhetoricalTendencies: {
      label: "Rhetorical Tendencies",
      placeholder: "Do they interrupt? Appeal to emotion? Cite lots of stats?",
      helperText: "Anticipate their debate tactics and prepare appropriate responses",
    },
    opponentTriggers: {
      label: "Known Triggers",
      placeholder: "Topics that make them defensive or emotional",
    },
    opponentStrongestArguments: {
      label: "Their Strongest Arguments",
      placeholder: "Steelman their best case - what's hardest to counter?",
      helperText: "Prep will include preemptive counters to their most compelling points",
    },
    opponentBestEvidence: {
      label: "Their Best Evidence",
      placeholder: "What studies, data, or examples will they cite?",
      helperText: "Allows preparation of counter-evidence and alternative interpretations",
    },
    opponentLikelyCritiques: {
      label: "Likely Critiques of You",
      placeholder: "How will they attack your position or credibility?",
      helperText: "Enables you to address their attacks before they make them",
    },
    opponentCharacterIssues: {
      label: "Character Issues",
      placeholder: "Conflicts of interest? Funding sources? Biases?",
      helperText: "Raises questions about their motivations and objectivity",
    },

    // User context
    userResearch: {
      label: "Your Research Notes",
      placeholder: "Paste any research, articles, data you've gathered",
    },
    keyPointsToMake: {
      label: "Key Points to Emphasize",
      placeholder: "What MUST you get across? Your non-negotiable arguments",
      helperText: "Strategy will ensure these core messages get delivered",
    },
    thingsToAvoid: {
      label: "Things to Avoid",
      placeholder: "Topics where you're weak? Areas to not engage on?",
      helperText: "Helps steer the debate away from your vulnerabilities",
    },
    toneDirectives: {
      label: "Tone & Style Preferences",
      placeholder:
        "How do you want to come across? Aggressive, measured, humorous, academic...?",
      helperText:
        "This shapes the zingers, openings, and overall rhetorical approach",
    },
    additionalContext: {
      label: "Additional Context (Optional)",
      placeholder:
        "Any specific instructions for the AI? Things to focus on, avoid, or unique situational context...",
      helperText:
        "Free-form guidance to customize AI behavior for your specific needs",
    },
  },

  formLayout: {
    core: {
      fields: ["topic", "position"],
      showStyleDifficulty: false,
    },
    sections: [
      {
        id: "practice-settings",
        title: "Practice Settings",
        description: "Adjust opponent behavior and challenge level",
        icon: "Settings",
        optional: true,
        fields: ["style", "difficulty"],
      },
      {
        id: "opponent-profile",
        title: "Opponent Profile",
        description: "Who are they? Background and vulnerabilities",
        icon: "User",
        optional: true,
        fields: [
          "opponentDescription",
          "opponentOrganization",
          "opponentDebateStyle",
        ],
        subsections: [
          {
            id: "deep-intel",
            title: "Deep Intel",
            description: "Credentials, contradictions, past statements",
            icon: "AlertTriangle",
            optional: true,
            fields: [
              "opponentCredentials",
              "credentialWeaknesses",
              "opponentPastStatements",
              "opponentContradictions",
              "opponentTrackRecord",
              "opponentRhetoricalTendencies",
              "opponentTriggers",
              "opponentCharacterIssues",
            ],
          },
        ],
      },
      {
        id: "steelmanning",
        title: "Their Strongest Arguments",
        description: "Steelman their case - know thy enemy",
        icon: "Lightbulb",
        optional: true,
        fields: [
          "opponentStrongestArguments",
          "opponentBestEvidence",
          "opponentLikelyCritiques",
        ],
      },
      {
        id: "audience-format",
        title: "Audience & Format",
        description: "Who you are persuading and the context",
        icon: "Users",
        optional: true,
        fields: [
          "audienceDescription",
          "audienceType",
          "audienceSize",
          "audienceDisposition",
          "debateFormat",
        ],
      },
      {
        id: "your-strategy",
        title: "Your Strategy",
        description: "Research, key points, things to avoid",
        icon: "FileText",
        optional: true,
        fields: [
          "talkingPoints",
          "userResearch",
          "keyPointsToMake",
          "thingsToAvoid",
          "toneDirectives",
          "additionalContext",
        ],
      },
    ],
  },

  assistant: {
    firstMessage: `I'm ready to debate. The topic is: {{TOPIC}}. I'll argue that {{AI_POSITION_DESC}}. Would you like to make your opening statement first, or shall I begin?`,

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
- You CAN interrupt if user rambles > 45 seconds
- Keep responses under 30 seconds of speech
- Focus ONLY on debating - do not mention analysis, logging, or techniques
- Use evidence and facts to support your position

{{ADDITIONAL_CONTEXT}}`,

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
