import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v, Infer } from "convex/values";

export const CURRENCIES = {
  USD: "usd",
  EUR: "eur",
} as const;
export const currencyValidator = v.union(
  v.literal(CURRENCIES.USD),
  v.literal(CURRENCIES.EUR),
);
export type Currency = Infer<typeof currencyValidator>;

export const INTERVALS = {
  MONTH: "month",
  YEAR: "year",
} as const;
export const intervalValidator = v.union(
  v.literal(INTERVALS.MONTH),
  v.literal(INTERVALS.YEAR),
);
export type Interval = Infer<typeof intervalValidator>;

export const PLANS = {
  FREE: "free",
  PRO: "pro",
} as const;
export const planKeyValidator = v.union(
  v.literal(PLANS.FREE),
  v.literal(PLANS.PRO),
);
export type PlanKey = Infer<typeof planKeyValidator>;

const priceValidator = v.object({
  stripeId: v.string(),
  amount: v.number(),
});
const pricesValidator = v.object({
  [CURRENCIES.USD]: priceValidator,
  [CURRENCIES.EUR]: priceValidator,
});

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
    customerId: v.optional(v.string()),
  })
    .index("email", ["email"])
    .index("customerId", ["customerId"]),
  plans: defineTable({
    key: planKeyValidator,
    stripeId: v.string(),
    name: v.string(),
    description: v.string(),
    prices: v.object({
      [INTERVALS.MONTH]: pricesValidator,
      [INTERVALS.YEAR]: pricesValidator,
    }),
  })
    .index("key", ["key"])
    .index("stripeId", ["stripeId"]),
  subscriptions: defineTable({
    userId: v.id("users"),
    planId: v.id("plans"),
    priceStripeId: v.string(),
    stripeId: v.string(),
    currency: currencyValidator,
    interval: intervalValidator,
    status: v.string(),
    currentPeriodStart: v.number(),
    currentPeriodEnd: v.number(),
    cancelAtPeriodEnd: v.boolean(),
  })
    .index("userId", ["userId"])
    .index("stripeId", ["stripeId"]),
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
    talkingPoints: v.optional(v.array(v.string())),

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
  // Comprehensive post-debate coaching analysis (Hasan methodology)
  analyses: defineTable({
    debateId: v.id("debates"),

    // Executive Summary
    executiveSummary: v.object({
      assessment: v.string(), // 1-2 paragraphs overall performance
      topStrengths: v.array(v.string()), // exactly 3
      topImprovements: v.array(v.string()), // exactly 3
      verdict: v.string(), // one sentence
    }),

    // Technique Scorecard (category-based, not per-technique)
    techniqueScorecard: v.array(
      v.object({
        category: v.string(), // Opening, Emotional Appeal, Evidence, Judo Moves, etc.
        techniquesIdentified: v.array(v.string()),
        executionScore: v.number(), // 1-5
        notes: v.string(),
      }),
    ),

    // Moment-by-Moment Analysis
    momentAnalysis: v.array(
      v.object({
        exchangeRef: v.string(), // timestamp or quote reference
        whatHappened: v.string(),
        techniqueUsed: v.optional(v.string()),
        techniqueShouldHaveUsed: v.optional(v.string()),
        effectiveness: v.number(), // 1-5
        rewrite: v.optional(v.string()), // how it could have been stronger
      }),
    ),

    // Opponent Analysis (what the AI opponent did, for learning)
    opponentAnalysis: v.object({
      techniquesUsed: v.array(v.string()),
      trapsSet: v.array(v.string()),
      weaknessesExposed: v.array(v.string()),
      unexploitedWeaknesses: v.array(v.string()),
    }),

    // Missed Opportunities (enhanced with technique guidance)
    missedOpportunities: v.array(
      v.object({
        moment: v.string(),
        whatShouldHaveDone: v.string(),
        whichTechnique: v.string(),
      }),
    ),

    // Rewrites - showing optimal execution
    rewrites: v.array(
      v.object({
        original: v.string(),
        improved: v.string(),
        explanation: v.string(), // techniques applied
      }),
    ),

    // Practice Recommendations (structured priorities)
    practiceRecommendations: v.object({
      immediateFocus: v.object({
        area: v.string(),
        drill: v.string(),
        exampleToStudy: v.string(),
      }),
      secondaryFocus: v.object({
        area: v.string(),
        drill: v.string(),
        exampleToStudy: v.string(),
      }),
      longTermDevelopment: v.object({
        skill: v.string(),
        practiceApproach: v.string(),
        resources: v.string(),
      }),
    }),

    // Hasan Methodology Scores (category-based)
    hasanScores: v.object({
      fundamentals: v.number(), // Chs 1-6: Audience, Emotion, Evidence, Ad Hominem, Listening, Humor
      tricksOfTrade: v.number(), // Chs 7-11: Rule of Three, Judo, Zingers, Traps, Gish Gallop
      behindTheScenes: v.number(), // Chs 12-15: Confidence, Composure, Practice, Homework
      grandFinale: v.number(), // Ch 16: Closing/Peroration
      total: v.number(), // Sum of all /40
    }),

    generatedAt: v.number(),
  }).index("by_debate", ["debateId"]),
});

export default schema;
