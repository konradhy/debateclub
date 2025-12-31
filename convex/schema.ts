import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    username: v.optional(v.string()),
    imageId: v.optional(v.id("_storage")),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    isAdmin: v.optional(v.boolean()),
    stripeCustomerId: v.optional(v.string()),
  }).index("email", ["email"]),
  debates: defineTable({
    userId: v.id("users"),
    topic: v.string(),
    userPosition: v.string(),
    aiPosition: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("completed"),
      v.literal("abandoned"),
    ),
    startedAt: v.number(),
    completedAt: v.optional(v.number()),
    duration: v.optional(v.number()),
    vapiCallId: v.optional(v.string()),
    recordingKey: v.optional(v.string()),
    // Scenario system fields
    scenarioType: v.optional(v.string()), // e.g., "debate", "sales-cold-prospect"
    opponentId: v.optional(v.id("opponents")), // Reference to opponent profile
  }).index("by_user", ["userId"]),
  exchanges: defineTable({
    debateId: v.id("debates"),
    speaker: v.union(v.literal("user"), v.literal("assistant")),
    text: v.string(),
    timestamp: v.number(),
  }).index("by_debate", ["debateId"]),
  techniques: defineTable({
    debateId: v.id("debates"),
    exchangeId: v.optional(v.id("exchanges")),
    speaker: v.union(v.literal("user"), v.literal("assistant")),
    technique: v.string(),
    text: v.string(),
    effectiveness: v.number(),
    timestamp: v.number(),
    context: v.optional(v.string()),
  })
    .index("by_debate", ["debateId"])
    .index("by_exchange", ["exchangeId"]),
  research: defineTable({
    opponentId: v.id("opponents"),
    query: v.string(),
    articles: v.array(
      v.object({
        title: v.string(),
        url: v.string(),
        content: v.string(),
        summary: v.string(),
        source: v.string(),
        publishedDate: v.optional(v.string()),
      }),
    ),
    timestamp: v.number(),
  }).index("by_opponent", ["opponentId"]),
  opponents: defineTable({
    userId: v.id("users"),
    name: v.string(),
    topic: v.string(),
    position: v.string(), // "pro" or "con"
    style: v.string(),
    difficulty: v.string(),

    // ==========================================
    // SCENARIO SYSTEM
    // ==========================================
    scenarioType: v.optional(v.string()), // "debate", "sales-cold-prospect", etc.
    prepType: v.optional(v.string()), // "debate" or "generic"

    // ==========================================
    // GENERIC PREP FIELDS (used by non-debate scenarios)
    // All use objects with id for consistent edit/add/delete
    // ==========================================
    talkingPoints: v.optional(
      v.array(
        v.object({
          id: v.string(),
          content: v.string(),
        }),
      ),
    ),
    openingApproach: v.optional(v.string()),
    keyPhrases: v.optional(
      v.array(
        v.object({
          id: v.string(),
          phrase: v.string(),
        }),
      ),
    ),
    responseMap: v.optional(
      v.array(
        v.object({
          id: v.string(),
          trigger: v.string(),
          response: v.string(),
        }),
      ),
    ),
    closingApproach: v.optional(v.string()),

    // ==========================================
    // AUDIENCE CONTEXT (Chapter 1: Know Your Audience)
    // ==========================================
    audienceDescription: v.optional(v.string()), // Free-form description of the audience
    audienceType: v.optional(v.string()), // General, Academic, Professional, Political, Legal
    audienceSize: v.optional(v.string()), // One-on-one, Small group, Large, Broadcast
    audienceDisposition: v.optional(v.string()), // Friendly, Neutral, Skeptical, Hostile
    debateFormat: v.optional(v.string()), // Formal debate, Panel, Interview, Town hall

    // ==========================================
    // OPPONENT PROFILE (Chapters 4, 10, 15: Three C's, Traps, Homework)
    // ==========================================
    opponentDescription: v.optional(v.string()), // Background, role, who they are
    opponentOrganization: v.optional(v.string()), // Their affiliation
    opponentCredentials: v.optional(v.string()), // Claimed expertise, degrees, positions
    credentialWeaknesses: v.optional(v.string()), // Gaps in credentials, areas they lack

    opponentPastStatements: v.optional(v.string()), // Quotes, positions on record (for traps)
    opponentContradictions: v.optional(v.string()), // Known contradictions
    opponentTrackRecord: v.optional(v.string()), // Wrong predictions, debunked claims

    opponentDebateStyle: v.optional(v.string()), // Gish Galloper, Academic, Emotional, etc.
    opponentRhetoricalTendencies: v.optional(v.string()), // Patterns, how they argue
    opponentTriggers: v.optional(v.string()), // Topics that get them emotional/defensive

    opponentStrongestArguments: v.optional(v.string()), // Steelmanned best case
    opponentBestEvidence: v.optional(v.string()), // Their best proof
    opponentLikelyCritiques: v.optional(v.string()), // How they'll attack you

    opponentCharacterIssues: v.optional(v.string()), // Conflicts of interest, bias

    // ==========================================
    // USER CONTEXT (Your research & directives)
    // ==========================================
    userResearch: v.optional(v.string()), // Notes, articles, data
    keyPointsToMake: v.optional(v.string()), // Arguments to emphasize
    thingsToAvoid: v.optional(v.string()), // Topics/approaches to avoid
    toneDirectives: v.optional(v.string()), // How you want to come across

    // ==========================================
    // ADDITIONAL CONTEXT (Free-form user guidance)
    // ==========================================
    additionalContext: v.optional(v.string()), // User-provided context to guide AI behavior

    // ==========================================
    // AI-Generated Prep Materials (Buffet-Style)
    // ==========================================
    // New structured prep fields
    // Buffet-Style Prep Data
    openingOptions: v.optional(
      v.array(
        v.object({
          id: v.string(),
          type: v.string(),
          hook: v.string(),
          content: v.string(),
          wordCount: v.number(),
          deliveryGuidance: v.string(),
        }),
      ),
    ),
    selectedOpeningId: v.optional(v.string()),

    argumentFrames: v.optional(
      v.array(
        v.object({
          id: v.string(),
          label: v.string(),
          summary: v.string(),
          content: v.string(),
          detailedContent: v.string(),
          evidenceIds: v.array(v.string()),
          evidenceNeeded: v.optional(v.array(v.string())),
          emotionalCore: v.optional(v.string()),
          deploymentGuidance: v.string(),
        }),
      ),
    ),
    selectedFrameIds: v.optional(v.array(v.string())),

    receipts: v.optional(
      v.array(
        v.object({
          id: v.string(),
          category: v.string(),
          type: v.optional(v.string()), // Added
          source: v.string(),
          sourceCredibility: v.optional(v.string()), // Added
          url: v.optional(v.string()),
          year: v.optional(v.string()), // Added
          content: v.string(),
          context: v.optional(v.string()), // Added
          deployment: v.any(), // Changed to any to accept object
          vulnerabilities: v.optional(v.string()), // Added
        }),
      ),
    ),
    // No selection for receipts (they are all available in Quick Ref)

    zingers: v.optional(
      v.array(
        v.object({
          id: v.string(),
          text: v.string(),
          type: v.optional(v.string()), // Added
          context: v.any(), // Changed to any to accept object
          tone: v.optional(v.string()), // Added
          riskLevel: v.optional(v.string()), // Added
          riskMitigation: v.optional(v.string()), // Added
        }),
      ),
    ),
    selectedZingerIds: v.optional(v.array(v.string())),

    closingOptions: v.optional(
      v.array(
        v.object({
          id: v.string(),
          type: v.string(),
          preview: v.string(),
          content: v.string(),
          wordCount: v.number(),
          quoteSource: v.optional(v.string()), // Added
          storyConnection: v.optional(v.string()), // Added
          actionRequested: v.optional(v.string()), // Added
          deliveryGuidance: v.optional(v.string()), // Added
          emotionalArc: v.optional(v.string()), // Added
        }),
      ),
    ),
    selectedClosingId: v.optional(v.string()),

    opponentIntel: v.optional(
      v.array(
        v.object({
          id: v.string(),
          argument: v.string(),
          likelihood: v.string(),
          evidence: v.string(),
          rhetoricalStyle: v.optional(v.string()), // Added
          weakness: v.string(),
          counters: v.array(
            v.object({
              id: v.string(),
              judoMove: v.optional(v.string()), // Added
              label: v.string(),
              text: v.string(),
              deliveryNote: v.optional(v.string()), // Added
            }),
          ),
        }),
      ),
    ),
    selectedCounterIds: v.optional(v.array(v.string())),

    // Research Synthesis - AI-generated analysis of all research
    researchSynthesis: v.optional(
      v.object({
        overview: v.string(),
        majorPerspectives: v.array(
          v.object({
            perspective: v.string(),
            summary: v.string(),
            keyProponents: v.string(),
            strongestEvidence: v.string(),
          }),
        ),
        pointsOfConsensus: v.array(v.string()),
        pointsOfContention: v.array(
          v.object({
            issue: v.string(),
            sideA: v.string(),
            sideB: v.string(),
            implication: v.string(),
          }),
        ),
        keyStatistics: v.array(
          v.object({
            stat: v.string(),
            source: v.string(),
            useFor: v.string(),
          }),
        ),
        quotableQuotes: v.array(
          v.object({
            quote: v.string(),
            speaker: v.string(),
            useFor: v.string(),
          }),
        ),
        researchGaps: v.string(),
        strategicInsights: v.string(),
        generatedAt: v.number(),
      }),
    ),

    // ==========================================
    // GEMINI DEEP RESEARCH (System B)
    // ==========================================
    geminiResearchReport: v.optional(v.string()),
    geminiResearchMetadata: v.optional(
      v.object({
        generatedAt: v.number(),
        sourcesCount: v.number(),
        reportLength: v.number(),
      }),
    ),
  }).index("by_user", ["userId"]),
  prepProgress: defineTable({
    opponentId: v.id("opponents"),
    status: v.union(
      v.literal("idle"),
      v.literal("researching"),
      v.literal("extracting"),
      v.literal("synthesizing"),
      v.literal("generating_openings"),
      v.literal("generating_frames"),
      v.literal("generating_receipts"),
      v.literal("generating_zingers"),
      v.literal("generating_closings"),
      v.literal("generating_intel"),
      v.literal("storing"),
      v.literal("complete"),
      v.literal("error"),
    ),
    message: v.string(),
    completedSteps: v.array(v.string()),
    error: v.optional(v.string()),
    startedAt: v.number(),
    completedAt: v.optional(v.number()),
  }).index("by_opponent", ["opponentId"]),
  prepChat: defineTable({
    opponentId: v.id("opponents"),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    timestamp: v.number(),
  }).index("by_opponent", ["opponentId"]),
  // Comprehensive post-practice coaching analysis
  analyses: defineTable({
    debateId: v.id("debates"),

    // ==========================================
    // SCENARIO SYSTEM - Analysis Framework
    // ==========================================
    analysisFramework: v.optional(v.string()), // "debate", "sales", "entrepreneur", etc.

    // Generic skills assessment (used by non-debate scenarios)
    skillsAssessment: v.optional(
      v.array(
        v.object({
          name: v.string(), // e.g., "Discovery", "Clarity"
          score: v.number(), // 1-10
          feedback: v.string(), // Specific feedback for this skill
        }),
      ),
    ),

    // Key moments (used by generic scenarios)
    keyMoments: v.optional(
      v.array(
        v.object({
          moment: v.string(),
          impact: v.string(),
          wasHandledWell: v.boolean(),
        }),
      ),
    ),

    // Executive Summary
    executiveSummary: v.object({
      assessment: v.string(), // 1-2 paragraphs overall performance
      topStrengths: v.array(v.string()), // exactly 3
      topImprovements: v.array(v.string()), // exactly 3
      verdict: v.string(), // one sentence
    }),

    // Technique Scorecard (category-based, not per-technique) - DEBATE ONLY
    techniqueScorecard: v.optional(
      v.array(
        v.object({
          category: v.string(), // Opening, Emotional Appeal, Evidence, Judo Moves, etc.
          techniquesIdentified: v.array(v.string()),
          executionScore: v.number(), // 1-5
          notes: v.string(),
        }),
      ),
    ),

    // Moment-by-Moment Analysis
    momentAnalysis: v.optional(
      v.array(
        v.object({
          exchangeRef: v.string(), // timestamp or quote reference
          whatHappened: v.string(),
          techniqueUsed: v.optional(v.string()),
          techniqueShouldHaveUsed: v.optional(v.string()),
          effectiveness: v.number(), // 1-5
          rewrite: v.optional(v.string()), // how it could have been stronger
          suggestion: v.optional(v.string()), // generic scenario field
        }),
      ),
    ),

    // Opponent Analysis (what the AI opponent did, for learning) - DEBATE ONLY
    opponentAnalysis: v.optional(
      v.object({
        techniquesUsed: v.array(v.string()),
        trapsSet: v.array(v.string()),
        weaknessesExposed: v.array(v.string()),
        unexploitedWeaknesses: v.array(v.string()),
      }),
    ),

    // Missed Opportunities (enhanced with technique guidance) - DEBATE ONLY
    missedOpportunities: v.optional(
      v.array(
        v.object({
          moment: v.string(),
          whatShouldHaveDone: v.string(),
          whichTechnique: v.string(),
        }),
      ),
    ),

    // Rewrites - showing optimal execution - DEBATE ONLY
    rewrites: v.optional(
      v.array(
        v.object({
          original: v.string(),
          improved: v.string(),
          explanation: v.string(), // techniques applied
        }),
      ),
    ),

    // Practice Recommendations - flexible structure for both debate and generic
    practiceRecommendations: v.optional(
      v.object({
        immediateFocus: v.object({
          area: v.string(),
          drill: v.string(),
          exampleToStudy: v.optional(v.string()), // DEBATE ONLY
        }),
        secondaryFocus: v.object({
          area: v.string(),
          drill: v.string(),
          exampleToStudy: v.optional(v.string()), // DEBATE ONLY
        }),
        longTermDevelopment: v.optional(
          v.object({
            skill: v.string(),
            practiceApproach: v.string(),
            resources: v.string(),
          }),
        ), // DEBATE ONLY
      }),
    ),

    // Hasan Methodology Scores (category-based)
    // Hasan Scores - DEBATE ONLY
    hasanScores: v.optional(
      v.object({
        fundamentals: v.number(), // Chs 1-6: Audience, Emotion, Evidence, Ad Hominem, Listening, Humor
        tricksOfTrade: v.number(), // Chs 7-11: Rule of Three, Judo, Zingers, Traps, Gish Gallop
        behindTheScenes: v.number(), // Chs 12-15: Confidence, Composure, Practice, Homework
        grandFinale: v.number(), // Ch 16: Closing/Peroration
        total: v.number(), // Sum of all /40
      }),
    ),

    generatedAt: v.number(),
  }).index("by_debate", ["debateId"]),
  geminiResearchProgress: defineTable({
    opponentId: v.id("opponents"),
    status: v.union(
      v.literal("deep_research_planning"),
      v.literal("deep_research_searching"),
      v.literal("deep_research_complete"),
      v.literal("gemini_agent_searching"),
      v.literal("generating"),
      v.literal("storing"),
      v.literal("complete"),
      v.literal("error"),
    ),
    message: v.string(),
    startedAt: v.number(),
    completedAt: v.optional(v.number()),
    error: v.optional(v.string()),
  }).index("by_opponent", ["opponentId"]),

  // ==========================================
  // MONETIZATION SYSTEM
  // ==========================================

  // Per-scenario token wallet - each user has separate balances per scenario
  scenarioTokens: defineTable({
    userId: v.id("users"),
    scenarioId: v.string(), // "debate", "sales-cold-prospect", etc.
    balance: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_scenario", ["userId", "scenarioId"]),

  // Audit log for all token changes - source of truth for debugging
  tokenTransactions: defineTable({
    userId: v.id("users"),
    scenarioId: v.string(),
    amount: v.number(), // +10 for grant, -1 for consume
    reason: v.union(
      v.literal("funnel_grant"),
      v.literal("purchase"),
      v.literal("debate_complete"),
      v.literal("admin_grant"),
      v.literal("refund"),
    ),
    metadata: v.optional(
      v.object({
        debateId: v.optional(v.id("debates")),
        grantId: v.optional(v.id("pendingGrants")),
        stripePaymentId: v.optional(v.string()),
      }),
    ),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_scenario", ["userId", "scenarioId"]),

  // Subscriber monthly usage tracking - hidden cap (100/month)
  subscriberUsage: defineTable({
    userId: v.id("users"),
    periodStart: v.number(),
    periodEnd: v.number(),
    debateCount: v.number(),
    notifiedOwner: v.boolean(),
  }).index("by_user_and_period", ["userId", "periodStart"]),

  // Marketing funnel grant links - one-time use tokens for specific scenarios
  pendingGrants: defineTable({
    grantToken: v.string(), // Unique token in URL (e.g., "abc123xyz")
    scenarioId: v.string(),
    tokenAmount: v.number(), // Default 10
    claimed: v.boolean(),
    claimedBy: v.optional(v.id("users")),
    createdAt: v.number(),
    expiresAt: v.optional(v.number()),
    utmSource: v.optional(v.string()),
    utmCampaign: v.optional(v.string()),
  })
    .index("by_token", ["grantToken"])
    .index("by_claimed_user", ["claimedBy"]),

  // Subscription status tracking
  subscriptions: defineTable({
    userId: v.id("users"),
    status: v.union(
      v.literal("active"),
      v.literal("canceled"),
      v.literal("past_due"),
      v.literal("trialing"),
    ),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    currentPeriodStart: v.optional(v.number()),
    currentPeriodEnd: v.optional(v.number()),
    cancelAtPeriodEnd: v.optional(v.boolean()),
  }).index("by_user", ["userId"]),

  // ==========================================
  // COST MONITORING SYSTEM
  // ==========================================

  // API cost tracking for unit economics analysis
  apiCosts: defineTable({
    service: v.union(
      v.literal("openrouter"),
      v.literal("vapi"),
      v.literal("firecrawl"),
      v.literal("gemini")
    ),
    cost: v.number(), // USD cents
    debateId: v.optional(v.id("debates")),
    opponentId: v.optional(v.id("opponents")), // for prep/research
    userId: v.id("users"),
    phase: v.optional(v.union(
      v.literal("research"),
      v.literal("prep"),
      v.literal("debate"),
      v.literal("analysis")
    )), // Track which phase of the workflow this cost belongs to
    details: v.object({
      // OpenRouter
      model: v.optional(v.string()),
      inputTokens: v.optional(v.number()),
      outputTokens: v.optional(v.number()),
      // Vapi  
      duration: v.optional(v.number()), // seconds
      // Firecrawl
      requests: v.optional(v.number()), // number of pages scraped
      // Gemini
      sessions: v.optional(v.number()), // number of research sessions
    }),
    timestamp: v.number(),
  })
    .index("by_debate", ["debateId"])
    .index("by_opponent", ["opponentId"])
    .index("by_user", ["userId"])
    .index("by_service", ["service"])
    .index("by_phase", ["phase"]),
});

export default schema;
