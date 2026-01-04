/**
 * JSON Schemas for OpenRouter structured outputs in prep generation
 * These schemas enforce consistent structure and enable flexible array lengths
 */

import type { JsonSchema } from "../openrouter";

// TypeScript interfaces for type safety
export interface OpeningStatement {
    id: string;
    type: string;
    hook: string;
    content: string;
    wordCount: number;
    deliveryGuidance: string;
}

export interface ArgumentFrame {
    id: string;
    label: string;
    summary: string;
    content: string;
    detailedContent: string;
    deploymentGuidance: string;
    emotionalCore?: string;
    exampleQuote?: string;
    evidenceNeeded?: string[];
}

export interface Receipt {
    id: string;
    category: string;
    source: string;
    content: string;
    deployment: string;
    deploymentExample?: string;
    url?: string;
    year?: string;
}

export interface Zinger {
    id: string;
    text: string;
    type: string;
    context: string;
    timing: string;
    deliveryNote: string;
}

export interface ClosingStatement {
    id: string;
    type: string;
    content: string;
    preview: string;
    emotionalPeak: string;
    callToAction: string;
}

export interface Counter {
    id: string;
    judoMove: string;
    label: string;
    text: string;
    deliveryNote: string;
}

export interface OpponentIntel {
    id: string;
    argument: string;
    likelihood: "High" | "Medium" | "Low";
    evidence: string;
    weakness: string;
    rhetoricalStyle?: string;
    counters: Counter[];
}

// JSON Schemas for OpenRouter structured outputs

export const OPENING_STATEMENTS_SCHEMA: JsonSchema = {
    name: "opening_statements",
    strict: false,
    schema: {
        type: "object",
        properties: {
            openings: {
                type: "array",
                description: "Array of 3-5 opening statement options with variety in types and approaches",
                items: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "Unique identifier for this opening statement"
                        },
                        type: {
                            type: "string",
                            description: "Type of opening (Personal Story, Provocative Question, Bold Statement, etc.)"
                        },
                        hook: {
                            type: "string",
                            description: "The attention-grabbing opening line or hook"
                        },
                        content: {
                            type: "string",
                            description: "Full opening statement content (60-120 words)"
                        },
                        wordCount: {
                            type: "number",
                            description: "Word count of the content"
                        },
                        deliveryGuidance: {
                            type: "string",
                            description: "Specific guidance on tone, pacing, and delivery"
                        }
                    },
                    required: ["id", "type", "hook", "content", "wordCount", "deliveryGuidance"],
                    additionalProperties: false
                }
            }
        },
        required: ["openings"],
        additionalProperties: false
    }
};

export const ARGUMENT_FRAMES_SCHEMA: JsonSchema = {
    name: "argument_frames",
    strict: false,
    schema: {
        type: "object",
        properties: {
            frames: {
                type: "array",
                description: "Array of 4-6 argument frames covering different strategic approaches",
                items: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "Unique identifier for this argument frame"
                        },
                        label: {
                            type: "string",
                            description: "Short, memorable label for the frame"
                        },
                        summary: {
                            type: "string",
                            description: "One-sentence summary of the frame's core argument"
                        },
                        content: {
                            type: "string",
                            description: "Main argument content (2-3 sentences)"
                        },
                        detailedContent: {
                            type: "string",
                            description: "Detailed explanation with supporting points and reasoning"
                        },
                        deploymentGuidance: {
                            type: "string",
                            description: "When and how to deploy this frame strategically"
                        },
                        emotionalCore: {
                            type: "string",
                            description: "The emotional foundation of this argument (optional)"
                        },
                        exampleQuote: {
                            type: "string",
                            description: "Example of how to phrase this argument (optional)"
                        },
                        evidenceNeeded: {
                            type: "array",
                            description: "List of evidence types that would strengthen this frame (optional)",
                            items: {
                                type: "string"
                            }
                        }
                    },
                    required: ["id", "label", "summary", "content", "detailedContent", "deploymentGuidance"],
                    additionalProperties: false
                }
            }
        },
        required: ["frames"],
        additionalProperties: false
    }
};

export const RECEIPTS_ARSENAL_SCHEMA: JsonSchema = {
    name: "receipts_arsenal",
    strict: false,
    schema: {
        type: "object",
        properties: {
            receipts: {
                type: "array",
                description: "Array of 8-12 receipts across different categories (Statistics, Quotes, Case Studies, etc.)",
                items: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "Unique identifier for this receipt"
                        },
                        category: {
                            type: "string",
                            enum: ["Statistics", "Quotes", "Case Studies", "Historical Precedent", "Scientific Studies"],
                            description: "Category of evidence this receipt provides"
                        },
                        source: {
                            type: "string",
                            description: "Source of the evidence (organization, publication, study, etc.)"
                        },
                        content: {
                            type: "string",
                            description: "The actual evidence content (statistic, quote, case study details)"
                        },
                        deployment: {
                            type: "string",
                            description: "How to deploy this evidence strategically in debate"
                        },
                        deploymentExample: {
                            type: "string",
                            description: "Example of how to phrase this evidence in context (optional)"
                        },
                        url: {
                            type: "string",
                            description: "Source URL if available (optional)"
                        },
                        year: {
                            type: "string",
                            description: "Year of publication/study (optional)"
                        }
                    },
                    required: ["id", "category", "source", "content", "deployment"],
                    additionalProperties: false
                }
            }
        },
        required: ["receipts"],
        additionalProperties: false
    }
};

export const ZINGER_BANK_SCHEMA: JsonSchema = {
    name: "zinger_bank",
    strict: false,
    schema: {
        type: "object",
        properties: {
            zingers: {
                type: "array",
                description: "Array of 6-10 zingers with variety in types and timing",
                items: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "Unique identifier for this zinger"
                        },
                        text: {
                            type: "string",
                            description: "The actual zinger text - sharp, witty, and memorable (under 15 words)"
                        },
                        type: {
                            type: "string",
                            description: "Type of zinger (Factual Undercut, Reductio, Historical Parallel, Self-Deprecating, Wordplay, Trap)"
                        },
                        context: {
                            type: "object",
                            description: "Context object with trigger, setup, and aftermath",
                            properties: {
                                trigger: {
                                    type: "string",
                                    description: "Specific moment to deploy: 'If they claim X', 'If they interrupt', etc."
                                },
                                setup: {
                                    type: "string",
                                    description: "Optional: what to say before to set up the zinger"
                                },
                                aftermath: {
                                    type: "string",
                                    description: "How to capitalize after landing it — pause, pivot, follow-up"
                                }
                            },
                            required: ["trigger", "aftermath"],
                            additionalProperties: false
                        },
                        tone: {
                            type: "string",
                            description: "Tone for delivery (Deadpan, Incredulous, Amused, Righteous, Cutting)"
                        },
                        riskLevel: {
                            type: "string",
                            description: "Risk level of using this zinger (Low, Medium, High)"
                        },
                        riskMitigation: {
                            type: "string",
                            description: "How to mitigate the risk if this zinger backfires"
                        }
                    },
                    required: ["id", "text", "type", "context", "tone", "riskLevel", "riskMitigation"],
                    additionalProperties: false
                }
            }
        },
        required: ["zingers"],
        additionalProperties: false
    }
};

export const CLOSING_STATEMENTS_SCHEMA: JsonSchema = {
    name: "closing_statements",
    strict: false,
    schema: {
        type: "object",
        properties: {
            closings: {
                type: "array",
                description: "Array of 3-5 closing statement options with different emotional approaches",
                items: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "Unique identifier for this closing statement"
                        },
                        type: {
                            type: "string",
                            description: "Type of closing (Call to Action, Emotional Appeal, Summary + Vision, etc.)"
                        },
                        content: {
                            type: "string",
                            description: "Full closing statement content"
                        },
                        preview: {
                            type: "string",
                            description: "Brief preview/summary of this closing approach"
                        },
                        emotionalPeak: {
                            type: "string",
                            description: "The emotional climax moment of this closing"
                        },
                        callToAction: {
                            type: "string",
                            description: "What you want the audience to do/think/feel after this closing"
                        }
                    },
                    required: ["id", "type", "content", "preview", "emotionalPeak", "callToAction"],
                    additionalProperties: false
                }
            }
        },
        required: ["closings"],
        additionalProperties: false
    }
};

export const OPPONENT_INTEL_SCHEMA: JsonSchema = {
    name: "opponent_intel",
    strict: false,
    schema: {
        type: "object",
        properties: {
            opponentIntel: {
                type: "array",
                description: "Array of 4-6 predicted opponent arguments with flexible counter strategies",
                items: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "Unique identifier for this intelligence prediction"
                        },
                        argument: {
                            type: "string",
                            description: "Their predicted argument - steelmanned, not strawmanned"
                        },
                        likelihood: {
                            type: "string",
                            enum: ["High", "Medium", "Low"],
                            description: "Likelihood they will make this argument"
                        },
                        evidence: {
                            type: "string",
                            description: "Evidence they will likely cite to support this argument"
                        },
                        weakness: {
                            type: "string",
                            description: "Core logical or evidentiary flaw in their argument"
                        },
                        rhetoricalStyle: {
                            type: "string",
                            description: "How they will deliver this argument (emotional appeal, authority, statistics, etc.)"
                        },
                        counters: {
                            type: "array",
                            description: "Array of 1-4 counter strategies based on argument strength and available ammunition",
                            items: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                        description: "Unique identifier for this counter"
                                    },
                                    judoMove: {
                                        type: "string",
                                        description: "Type of judo move (Concession, Preemption, Reframe, Credibility Challenge, Booby Trap)"
                                    },
                                    label: {
                                        type: "string",
                                        description: "Short label describing this counter approach"
                                    },
                                    text: {
                                        type: "string",
                                        description: "Full counter text - ready to speak, not a summary"
                                    },
                                    deliveryNote: {
                                        type: "string",
                                        description: "Tone and delivery guidance for this counter"
                                    }
                                },
                                required: ["id", "judoMove", "label", "text", "deliveryNote"],
                                additionalProperties: false
                            }
                        }
                    },
                    required: ["id", "argument", "likelihood", "evidence", "weakness", "counters"],
                    additionalProperties: false
                }
            },
            gishGallopProtocol: {
                type: "object",
                description: "Protocol for handling Gish Gallop tactics",
                properties: {
                    description: {
                        type: "string",
                        description: "Description of when to use this protocol"
                    },
                    steps: {
                        type: "array",
                        description: "Three-step protocol for defeating Gish Gallop",
                        items: {
                            type: "object",
                            properties: {
                                step: {
                                    type: "number",
                                    description: "Step number (1, 2, or 3)"
                                },
                                action: {
                                    type: "string",
                                    description: "Name of the action to take"
                                },
                                text: {
                                    type: "string",
                                    description: "Detailed explanation of how to execute this step"
                                }
                            },
                            required: ["step", "action", "text"],
                            additionalProperties: false
                        }
                    }
                },
                required: ["description", "steps"],
                additionalProperties: false
            }
        },
        required: ["opponentIntel", "gishGallopProtocol"],
        additionalProperties: false
    }
};

export const USER_RESEARCH_PROCESSING_SCHEMA: JsonSchema = {
    name: "user_research_processing",
    strict: false,
    schema: {
        type: "object",
        properties: {
            extractedArguments: {
                type: "array",
                description: "Arguments extracted from user-provided research",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        claim: { type: "string" },
                        supportingPoints: {
                            type: "array",
                            items: { type: "string" }
                        },
                        source: { type: "string" },
                        strength: { type: "string" }
                    },
                    required: ["id", "claim", "supportingPoints", "strength"],
                    additionalProperties: false
                }
            },
            extractedReceipts: {
                type: "array",
                description: "Evidence and receipts from user research",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        type: { type: "string" },
                        content: { type: "string" },
                        source: { type: "string" },
                        useCase: { type: "string" }
                    },
                    required: ["id", "type", "content", "useCase"],
                    additionalProperties: false
                }
            },
            extractedCounterArguments: {
                type: "array",
                description: "Counter-arguments identified in research",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        argument: { type: "string" },
                        suggestedResponse: { type: "string" }
                    },
                    required: ["id", "argument", "suggestedResponse"],
                    additionalProperties: false
                }
            },
            potentialOpeners: {
                type: "array",
                description: "Potential opening statements from research",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        type: { type: "string" },
                        content: { type: "string" },
                        hook: { type: "string" }
                    },
                    required: ["id", "type", "content", "hook"],
                    additionalProperties: false
                }
            },
            potentialZingers: {
                type: "array",
                description: "Potential zingers identified in research",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        text: { type: "string" },
                        context: { type: "string" }
                    },
                    required: ["id", "text", "context"],
                    additionalProperties: false
                }
            },
            summary: {
                type: "string",
                description: "Overall summary of the research processing"
            }
        },
        required: ["extractedArguments", "extractedReceipts", "extractedCounterArguments", "potentialOpeners", "potentialZingers", "summary"],
        additionalProperties: false
    }
};

export const RESEARCH_SYNTHESIS_SCHEMA: JsonSchema = {
    name: "research_synthesis",
    strict: false,
    schema: {
        type: "object",
        properties: {
            synthesis: {
                type: "object",
                description: "Comprehensive synthesis of research articles",
                properties: {
                    overview: {
                        type: "string",
                        description: "High-level overview of all research"
                    },
                    majorPerspectives: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                perspective: { type: "string" },
                                summary: { type: "string" },
                                keyProponents: { type: "string" },
                                strongestEvidence: { type: "string" }
                            },
                            required: ["perspective", "summary", "keyProponents", "strongestEvidence"],
                            additionalProperties: false
                        }
                    },
                    pointsOfConsensus: {
                        type: "array",
                        items: { type: "string" }
                    },
                    pointsOfContention: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                issue: { type: "string" },
                                sideA: { type: "string" },
                                sideB: { type: "string" },
                                implication: { type: "string" }
                            },
                            required: ["issue", "sideA", "sideB", "implication"],
                            additionalProperties: false
                        }
                    },
                    keyStatistics: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                stat: { type: "string" },
                                source: { type: "string" },
                                useFor: { type: "string" }
                            },
                            required: ["stat", "source", "useFor"],
                            additionalProperties: false
                        }
                    },
                    quotableQuotes: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                quote: { type: "string" },
                                speaker: { type: "string" },
                                useFor: { type: "string" }
                            },
                            required: ["quote", "speaker", "useFor"],
                            additionalProperties: false
                        }
                    },
                    researchGaps: {
                        type: "string",
                        description: "Identified gaps in the research"
                    },
                    strategicInsights: {
                        type: "string",
                        description: "Strategic insights for debate preparation"
                    }
                },
                required: ["overview", "majorPerspectives", "pointsOfConsensus", "pointsOfContention", "keyStatistics", "quotableQuotes", "researchGaps", "strategicInsights"],
                additionalProperties: false
            }
        },
        required: ["synthesis"],
        additionalProperties: false
    }
};