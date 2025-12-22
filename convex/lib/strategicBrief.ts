import { Doc } from "../_generated/dataModel";

/**
 * Builds a flowing narrative brief from opponent context.
 * Returns a human-readable strategic brief like Mehdi Hasan would write.
 *
 * This follows the "Strategic Brief" pattern - synthesizing all available
 * context into a coherent narrative rather than appending conditional sections.
 */
export function buildStrategicBrief(opponent: Doc<"opponents">): string {
  const sections: Array<string> = [];

  // Core context (always present)
  const positionLabel = opponent.position === "pro" ? "FOR" : "AGAINST";
  sections.push(
    `Your debater is arguing ${positionLabel} the motion: "${opponent.topic}".`
  );

  // Audience narrative (if any audience fields populated)
  const audience = buildAudienceNarrative(opponent);
  if (audience) sections.push(audience);

  // Opponent intel narrative (if any opponent fields populated)
  const opponentNarrative = buildOpponentNarrative(opponent);
  if (opponentNarrative) sections.push(opponentNarrative);

  // User directives (if any user context provided)
  const directives = buildUserDirectives(opponent);
  if (directives) sections.push(directives);

  return sections.join("\n\n");
}

/**
 * Builds a narrative about the audience from available fields.
 * Returns null if no audience context was provided.
 */
function buildAudienceNarrative(opponent: Doc<"opponents">): string | null {
  const hasAudience =
    opponent.audienceDescription ||
    opponent.audienceType ||
    opponent.audienceDisposition ||
    opponent.debateFormat ||
    opponent.audienceSize;

  if (!hasAudience) return null;

  const parts: Array<string> = [];

  // Opening
  if (opponent.audienceDescription) {
    parts.push(`They'll be presenting to ${opponent.audienceDescription}.`);
  } else {
    // Build from structured fields
    const audienceDesc: Array<string> = [];
    if (opponent.audienceDisposition) {
      audienceDesc.push(
        opponent.audienceDisposition.toLowerCase() === "hostile"
          ? "a hostile"
          : opponent.audienceDisposition.toLowerCase() === "skeptical"
            ? "a skeptical"
            : opponent.audienceDisposition.toLowerCase() === "friendly"
              ? "a friendly"
              : "a neutral"
      );
    } else {
      audienceDesc.push("an");
    }

    if (opponent.audienceType) {
      audienceDesc.push(opponent.audienceType.toLowerCase());
    }
    audienceDesc.push("audience");

    if (opponent.debateFormat) {
      audienceDesc.push(`at a ${opponent.debateFormat.toLowerCase()}`);
    }

    parts.push(`They'll be presenting to ${audienceDesc.join(" ")}.`);
  }

  // Size implications
  if (opponent.audienceSize) {
    const sizeImplications = getAudienceSizeImplications(opponent.audienceSize);
    if (sizeImplications) {
      parts.push(sizeImplications);
    }
  }

  // Strategic implications based on disposition
  if (opponent.audienceDisposition) {
    const dispositionStrategy = getDispositionStrategy(
      opponent.audienceDisposition
    );
    if (dispositionStrategy) {
      parts.push(dispositionStrategy);
    }
  }

  return parts.join(" ");
}

/**
 * Builds a narrative about the opponent from available intel fields.
 * Returns null if no opponent context was provided.
 */
function buildOpponentNarrative(opponent: Doc<"opponents">): string | null {
  const hasOpponentIntel =
    opponent.opponentDescription ||
    opponent.opponentOrganization ||
    opponent.opponentCredentials ||
    opponent.opponentPastStatements ||
    opponent.opponentContradictions ||
    opponent.opponentDebateStyle ||
    opponent.opponentStrongestArguments;

  if (!hasOpponentIntel) return null;

  const parts: Array<string> = [];

  // Who they are
  if (opponent.opponentDescription || opponent.opponentOrganization) {
    let whoTheyAre = "Their opponent is ";
    if (opponent.name && opponent.name !== "Custom Opponent") {
      whoTheyAre += opponent.name;
    }
    if (opponent.opponentDescription) {
      whoTheyAre +=
        opponent.name && opponent.name !== "Custom Opponent"
          ? `, ${opponent.opponentDescription}`
          : opponent.opponentDescription;
    }
    if (opponent.opponentOrganization) {
      whoTheyAre += ` from ${opponent.opponentOrganization}`;
    }
    parts.push(whoTheyAre + ".");
  }

  // Credentials
  if (opponent.opponentCredentials) {
    let credentialNote = `They have credentials in ${opponent.opponentCredentials}`;
    if (opponent.credentialWeaknesses) {
      credentialNote += `, but ${opponent.credentialWeaknesses}`;
    }
    parts.push(credentialNote + ".");
  }

  // Debate style
  if (opponent.opponentDebateStyle || opponent.opponentRhetoricalTendencies) {
    let styleNote = "";
    if (opponent.opponentDebateStyle) {
      styleNote += getDebateStyleDescription(opponent.opponentDebateStyle);
    }
    if (opponent.opponentRhetoricalTendencies) {
      styleNote += styleNote
        ? ` ${opponent.opponentRhetoricalTendencies}`
        : opponent.opponentRhetoricalTendencies;
    }
    if (styleNote) parts.push(styleNote);
  }

  // Past statements and contradictions (for traps)
  if (opponent.opponentPastStatements) {
    parts.push(
      `Notable past statements: "${opponent.opponentPastStatements}" — these may be useful for setting traps.`
    );
  }

  if (opponent.opponentContradictions) {
    parts.push(
      `They have contradicted themselves: ${opponent.opponentContradictions} — this is trap-worthy.`
    );
  }

  // Track record
  if (opponent.opponentTrackRecord) {
    parts.push(
      `Their track record shows: ${opponent.opponentTrackRecord} — use this to challenge their credibility.`
    );
  }

  // Triggers
  if (opponent.opponentTriggers) {
    parts.push(
      `They get defensive when: ${opponent.opponentTriggers} — consider strategic provocation.`
    );
  }

  // Character issues (the first C)
  if (opponent.opponentCharacterIssues) {
    parts.push(
      `Relevant character concerns: ${opponent.opponentCharacterIssues}.`
    );
  }

  // Steelmanning - their best case
  if (opponent.opponentStrongestArguments || opponent.opponentBestEvidence) {
    parts.push(""); // Add spacing before steelmanning
    parts.push("STEELMANNING THEIR CASE:");
    if (opponent.opponentStrongestArguments) {
      parts.push(
        `Their strongest argument will likely be: ${opponent.opponentStrongestArguments}`
      );
    }
    if (opponent.opponentBestEvidence) {
      parts.push(
        `Their best evidence includes: ${opponent.opponentBestEvidence}`
      );
    }
    if (opponent.opponentLikelyCritiques) {
      parts.push(
        `Expect them to attack our position by: ${opponent.opponentLikelyCritiques}`
      );
    }
  }

  return parts.join(" ");
}

/**
 * Builds the user's strategic directives from available context fields.
 * Returns null if no user context was provided.
 */
function buildUserDirectives(opponent: Doc<"opponents">): string | null {
  const hasUserContext =
    opponent.userResearch ||
    opponent.keyPointsToMake ||
    opponent.thingsToAvoid ||
    opponent.toneDirectives;

  if (!hasUserContext) return null;

  const parts: Array<string> = [];
  parts.push("THE DEBATER'S STRATEGIC PREFERENCES:");

  if (opponent.keyPointsToMake) {
    parts.push(`They want to emphasize: ${opponent.keyPointsToMake}`);
  }

  if (opponent.userResearch) {
    // Summarize rather than dump the whole research
    const researchPreview =
      opponent.userResearch.length > 500
        ? opponent.userResearch.substring(0, 500) + "..."
        : opponent.userResearch;
    parts.push(`Their research notes: ${researchPreview}`);
  }

  if (opponent.thingsToAvoid) {
    parts.push(`AVOID: ${opponent.thingsToAvoid}`);
  }

  if (opponent.toneDirectives) {
    parts.push(`Desired tone: ${opponent.toneDirectives}`);
  }

  return parts.join(" ");
}

// ==========================================
// Helper functions for strategic implications
// ==========================================

function getAudienceSizeImplications(size: string): string | null {
  const sizeMap: Record<string, string> = {
    "one-on-one":
      "This is an intimate setting — personal connection and direct engagement matter most.",
    "small group":
      "With a small group, read the room and adapt in real-time.",
    large:
      "For a large audience, project confidence and use the Rule of Three for memorability.",
    broadcast:
      "This will be broadcast — every word may be clipped and shared. Be quotable and avoid soundbite traps.",
  };
  return sizeMap[size.toLowerCase()] || null;
}

function getDispositionStrategy(disposition: string): string | null {
  const strategyMap: Record<string, string> = {
    friendly:
      "The audience is already receptive — focus on reinforcing their beliefs and giving them ammunition to persuade others.",
    neutral:
      "A neutral audience can be won. Lead with your most compelling evidence and stories. First impressions matter.",
    skeptical:
      "Expect resistance. Acknowledge their concerns early, use judo moves to concede valid points, then pivot to your strongest arguments.",
    hostile:
      "This is hostile territory. Stay calm, use facts with impeccable sourcing, and don't let them see you rattled. Sometimes winning means not losing your composure.",
  };
  return strategyMap[disposition.toLowerCase()] || null;
}

function getDebateStyleDescription(style: string): string {
  const styleMap: Record<string, string> = {
    "gish galloper":
      "Their debate style is Gish Gallop — expect rapid-fire dubious claims. Use the Pick-Your-Battle strategy: demolish one claim thoroughly rather than chasing all of them.",
    academic:
      "They argue in an academic, evidence-heavy style. Match their rigor but add emotional resonance — facts alone won't win the audience.",
    emotional:
      "They rely heavily on emotional appeals. Don't get drawn into an emotion-vs-emotion battle. Ground your responses in facts while acknowledging the feelings involved.",
    socratic:
      "They use Socratic questioning to trap opponents. Be careful answering their questions directly — reframe or challenge the premise.",
    aggressive:
      "They debate aggressively and may try to interrupt or bully. Stay composed — their aggression will alienate neutral observers if you don't take the bait.",
  };
  return (
    styleMap[style.toLowerCase()] ||
    `Their debate style: ${style}. Adapt accordingly.`
  );
}

