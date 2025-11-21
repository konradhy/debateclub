/**
 * Rule-based scoring functions for debate techniques
 * Returns effectiveness scores from 1-10 based on text analysis
 */

/**
 * Scores Concession & Pivot technique effectiveness
 * Checks for acknowledgment phrases and pivot words
 *
 * @param text - The text to analyze
 * @returns Score from 1-10
 */
export function scoreConcessionPivot(text: string): number {
  const lowerText = text.toLowerCase();
  let score = 1;

  // Acknowledgment phrases (indicators of concession)
  const acknowledgmentPatterns = [
    /\byou'?re\s+(right|correct|absolutely right)/i,
    /\bI\s+(agree|acknowledge|accept|concede)/i,
    /\bthat'?s\s+(true|fair|valid|a good point)/i,
    /\bhere'?s\s+where\s+(you'?re|they'?re)\s+right/i,
    /\bI\s+see\s+your\s+point/i,
    /\bthat'?s\s+(a|an)\s+(valid|fair|good)\s+point/i,
  ];

  // Pivot words/phrases (indicators of pivot)
  const pivotPatterns = [
    /\bbut\b/i,
    /\bhowever\b/i,
    /\bwhat\s+you'?re\s+missing/i,
    /\bhere'?s\s+what\s+you'?re\s+missing/i,
    /\bthe\s+real\s+(issue|problem|question)/i,
    /\bwhat\s+you\s+don'?t\s+realize/i,
    /\bthat\s+misses\s+the\s+point/i,
    /\bthe\s+bigger\s+picture/i,
  ];

  // Check for acknowledgment
  const hasAcknowledgment = acknowledgmentPatterns.some((pattern) =>
    pattern.test(lowerText),
  );

  // Check for pivot
  const hasPivot = pivotPatterns.some((pattern) => pattern.test(lowerText));

  // Base scoring
  if (hasAcknowledgment) score += 3;
  if (hasPivot) score += 3;

  // Both present = stronger technique
  if (hasAcknowledgment && hasPivot) score += 2;

  // Check for clarity and strength
  const textLength = text.length;
  if (textLength > 50 && textLength < 200) score += 1; // Good length
  if (textLength > 200) score -= 1; // Too long, loses impact

  // Ensure score is between 1-10
  return Math.max(1, Math.min(10, score));
}

/**
 * Scores Receipts (evidence deployment) technique effectiveness
 * Checks for citations, statistics, and specific evidence
 *
 * @param text - The text to analyze
 * @returns Score from 1-10
 */
export function scoreReceipts(text: string): number {
  const lowerText = text.toLowerCase();
  let score = 1;

  // Statistics and numbers (indicators of evidence)
  const hasNumbers = /\d+/.test(text);
  const hasPercentages = /%\s*/.test(text);
  const hasDollarAmounts = /\$[\d,]+/.test(text);
  const hasYears = /\b(19|20)\d{2}\b/.test(text);

  // Citation patterns
  const citationPatterns = [
    /\baccording\s+to/i,
    /\bstudy\s+(shows|found|indicates)/i,
    /\bresearch\s+(shows|found|indicates)/i,
    /\bdata\s+(shows|indicates|suggests)/i,
    /\breport\s+(shows|found|indicates)/i,
    /\bstatistics\s+(show|indicate)/i,
    /\bthe\s+(study|research|report|data)/i,
    /\bfrom\s+the\s+(study|research|report)/i,
  ];

  // Specific evidence indicators
  const evidencePatterns = [
    /\bshows?\s+that/i,
    /\bproves?\s+that/i,
    /\bdemonstrates?\s+that/i,
    /\bindicates?\s+that/i,
    /\bsuggests?\s+that/i,
  ];

  // Check for citations
  const hasCitation = citationPatterns.some((pattern) =>
    pattern.test(lowerText),
  );
  if (hasCitation) score += 3;

  // Check for evidence patterns
  const hasEvidencePattern = evidencePatterns.some((pattern) =>
    pattern.test(lowerText),
  );
  if (hasEvidencePattern) score += 2;

  // Check for specific data
  if (hasNumbers) score += 1;
  if (hasPercentages) score += 1;
  if (hasDollarAmounts) score += 1;
  if (hasYears) score += 1;

  // Multiple types of evidence = stronger
  const evidenceCount =
    (hasNumbers ? 1 : 0) +
    (hasPercentages ? 1 : 0) +
    (hasDollarAmounts ? 1 : 0) +
    (hasYears ? 1 : 0);
  if (evidenceCount >= 2) score += 1;

  // Specificity bonus (mentions specific sources/studies)
  if (/\b(cbo|who|un|cdc|pew|gallup|harvard|stanford|mit)\b/i.test(text)) {
    score += 1;
  }

  // Ensure score is between 1-10
  return Math.max(1, Math.min(10, score));
}

/**
 * Scores Zinger (memorable one-liner) technique effectiveness
 * Checks for brevity, wit, and memorability
 *
 * @param text - The text to analyze
 * @returns Score from 1-10
 */
export function scoreZinger(text: string): number {
  const lowerText = text.toLowerCase();
  let score = 1;

  // Word count (zingers should be brief)
  const wordCount = text.split(/\s+/).length;
  if (wordCount <= 10) score += 3; // Very brief
  else if (wordCount <= 20) score += 2; // Brief
  else if (wordCount <= 30) score += 1; // Acceptable
  else score -= 1; // Too long for a zinger

  // Wit indicators
  const witPatterns = [
    /\b(that'?s|it'?s)\s+(like|as\s+if)/i, // Similes/metaphors
    /\bmore\s+than\s+you'?ve/i, // Comparisons
    /\bat\s+least\s+I/i, // Contrast
    /\bcoming\s+from\s+(someone|you)/i, // Irony
  ];

  const hasWit = witPatterns.some((pattern) => pattern.test(lowerText));
  if (hasWit) score += 2;

  // Memorable phrasing (short, punchy sentences)
  const sentenceCount = text.split(/[.!?]+/).filter((s) => s.trim().length > 0)
    .length;
  if (sentenceCount === 1 && wordCount <= 15) score += 2; // Single punchy sentence

  // Contrast/opposition (common in zingers)
  if (/\b(but|however|yet|while|whereas)\b/i.test(lowerText)) score += 1;

  // Personal attack indicators (can be effective but risky)
  if (/\b(you|your|you'?re)\b/i.test(lowerText)) score += 1;

  // Impact words
  const impactWords = [
    /\b(interesting|ironic|funny|telling)\b/i,
    /\b(actually|really|truly)\b/i,
  ];
  const hasImpactWords = impactWords.some((pattern) =>
    pattern.test(lowerText),
  );
  if (hasImpactWords) score += 1;

  // Ensure score is between 1-10
  return Math.max(1, Math.min(10, score));
}

/**
 * Scores Reframing technique effectiveness
 * Checks for rejection of premise and alternative framing
 *
 * @param text - The text to analyze
 * @returns Score from 1-10
 */
export function scoreReframing(text: string): number {
  const lowerText = text.toLowerCase();
  let score = 1;

  // Premise rejection patterns
  const premiseRejectionPatterns = [
    /\bI\s+(don'?t|do\s+not)\s+accept\s+the\s+premise/i,
    /\bthat'?s\s+the\s+wrong\s+(question|frame|way\s+to\s+think)/i,
    /\bthe\s+real\s+(issue|question)\s+is/i,
    /\blet'?s\s+reframe\s+this/i,
    /\bwe'?re\s+asking\s+the\s+wrong\s+question/i,
    /\bthat'?s\s+not\s+the\s+right\s+way/i,
    /\bthe\s+question\s+(should|ought)\s+be/i,
    /\binstead\s+of\s+asking/i,
  ];

  // Alternative framing patterns
  const alternativeFramingPatterns = [
    /\bwhat\s+we\s+should\s+be\s+(asking|discussing)/i,
    /\bthe\s+better\s+question/i,
    /\bthink\s+about\s+it\s+this\s+way/i,
    /\bconsider\s+instead/i,
    /\bfrom\s+a\s+different\s+perspective/i,
  ];

  const hasPremiseRejection = premiseRejectionPatterns.some((pattern) =>
    pattern.test(lowerText),
  );
  const hasAlternativeFraming = alternativeFramingPatterns.some((pattern) =>
    pattern.test(lowerText),
  );

  if (hasPremiseRejection) score += 4;
  if (hasAlternativeFraming) score += 3;
  if (hasPremiseRejection && hasAlternativeFraming) score += 2; // Both = stronger

  // Check for clarity
  const wordCount = text.split(/\s+/).length;
  if (wordCount > 30 && wordCount < 150) score += 1;

  return Math.max(1, Math.min(10, score));
}

/**
 * Scores Preemption technique effectiveness
 * Checks for anticipatory language and addressing future arguments
 *
 * @param text - The text to analyze
 * @returns Score from 1-10
 */
export function scorePreemption(text: string): number {
  const lowerText = text.toLowerCase();
  let score = 1;

  // Preemption patterns
  const preemptionPatterns = [
    /\bnow[,\s]+(my\s+opponent|they|you)\s+(will|are\s+going\s+to|might)\s+(say|tell|argue|claim)/i,
    /\bI\s+know\s+what\s+you'?re\s+going\s+to\s+say/i,
    /\byou'?ll\s+(probably|likely)\s+(say|argue|claim)/i,
    /\bbefore\s+you\s+(say|argue|claim)/i,
    /\blet\s+me\s+address\s+this\s+before/i,
    /\byou\s+might\s+be\s+thinking/i,
    /\bsome\s+will\s+(say|argue|claim)/i,
    /\bmy\s+opponent\s+will\s+(likely|probably)/i,
  ];

  // Counter-preemption patterns
  const counterPatterns = [
    /\bbut\s+(here'?s|that'?s)\s+why/i,
    /\band\s+yet/i,
    /\bhowever[,\s]/i,
    /\bbut\s+that'?s\s+(wrong|misleading|false)/i,
  ];

  const hasPreemption = preemptionPatterns.some((pattern) =>
    pattern.test(lowerText),
  );
  const hasCounter = counterPatterns.some((pattern) =>
    pattern.test(lowerText),
  );

  if (hasPreemption) score += 5;
  if (hasCounter) score += 2;
  if (hasPreemption && hasCounter) score += 2; // Complete preemption

  return Math.max(1, Math.min(10, score));
}

/**
 * Scores Provocative Question technique effectiveness
 * Checks for rhetorical and challenging questions
 *
 * @param text - The text to analyze
 * @returns Score from 1-10
 */
export function scoreProvocativeQuestion(text: string): number {
  const lowerText = text.toLowerCase();
  let score = 1;

  // Must contain a question
  if (!text.includes("?")) return 1;

  // Provocative question patterns
  const provocativePatterns = [
    /\bhow\s+can\s+you\s+(possibly|honestly|seriously)/i,
    /\bwhy\s+would\s+(you|anyone)/i,
    /\bwhat\s+gives\s+you\s+the\s+right/i,
    /\bdo\s+you\s+really\s+believe/i,
    /\bcan\s+you\s+honestly\s+say/i,
    /\bisn'?t\s+it\s+true\s+that/i,
    /\bwouldn'?t\s+you\s+agree/i,
  ];

  // Direct challenge patterns
  const challengePatterns = [
    /\byou\s+(claim|said|believe)/i,
    /\byour\s+(position|argument|view)/i,
    /\bif\s+that'?s\s+true[,\s]+then/i,
  ];

  const hasProvocativePattern = provocativePatterns.some((pattern) =>
    pattern.test(lowerText),
  );
  const hasChallengePattern = challengePatterns.some((pattern) =>
    pattern.test(lowerText),
  );

  if (hasProvocativePattern) score += 4;
  if (hasChallengePattern) score += 2;

  // Multiple questions = more provocative
  const questionCount = (text.match(/\?/g) || []).length;
  if (questionCount >= 2) score += 2;

  // Brevity bonus (provocative questions should be direct)
  const wordCount = text.split(/\s+/).length;
  if (wordCount <= 20) score += 2;

  return Math.max(1, Math.min(10, score));
}

/**
 * Scores Personal Story technique effectiveness
 * Checks for narrative elements and personal experience
 *
 * @param text - The text to analyze
 * @returns Score from 1-10
 */
export function scorePersonalStory(text: string): number {
  const lowerText = text.toLowerCase();
  let score = 1;

  // Personal story indicators
  const storyPatterns = [
    /\bI\s+(remember|recall|experienced|witnessed)/i,
    /\blet\s+me\s+tell\s+you\s+(about|a\s+story)/i,
    /\bwhen\s+I\s+was/i,
    /\bI\s+once\s+(knew|met|saw)/i,
    /\bmy\s+(friend|family|mother|father|colleague)/i,
    /\ba\s+(friend|colleague)\s+of\s+mine/i,
  ];

  // Narrative elements
  const narrativePatterns = [
    /\band\s+then/i,
    /\bafter\s+that/i,
    /\bshe\s+told\s+me/i,
    /\bhe\s+said/i,
  ];

  // Emotional connection words
  const emotionalPatterns = [
    /\b(felt|realized|understood|learned)/i,
    /\bthat'?s\s+when\s+I/i,
  ];

  const hasStoryPattern = storyPatterns.some((pattern) =>
    pattern.test(lowerText),
  );
  const hasNarrativeElement = narrativePatterns.some((pattern) =>
    pattern.test(lowerText),
  );
  const hasEmotionalConnection = emotionalPatterns.some((pattern) =>
    pattern.test(lowerText),
  );

  if (hasStoryPattern) score += 4;
  if (hasNarrativeElement) score += 2;
  if (hasEmotionalConnection) score += 2;

  // Length bonus (stories need some detail)
  const wordCount = text.split(/\s+/).length;
  if (wordCount > 40 && wordCount < 200) score += 2;

  return Math.max(1, Math.min(10, score));
}

/**
 * Scores Rule of Three technique effectiveness
 * Checks for lists of three items
 *
 * @param text - The text to analyze
 * @returns Score from 1-10
 */
export function scoreRuleOfThree(text: string): number {
  const lowerText = text.toLowerCase();
  let score = 1;

  // Look for lists with commas and "and"
  const listPattern = /(\w+),\s*(\w+),?\s+and\s+(\w+)/gi;
  const matches = text.match(listPattern);

  if (matches && matches.length > 0) {
    score += 5; // Found a rule of three

    // Check if items are parallel (similar length)
    matches.forEach((match) => {
      const parts = match.split(/,\s*and\s*|,\s*/);
      if (parts.length === 3) {
        const lengths = parts.map((p) => p.trim().split(/\s+/).length);
        const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
        const deviation = lengths.every((l) => Math.abs(l - avgLength) <= 2);
        if (deviation) score += 2; // Parallel structure
      }
    });
  }

  // Look for numbered lists (first, second, third)
  const numberedPattern =
    /\b(first|second|third|one|two|three)\b.*\b(first|second|third|one|two|three)\b.*\b(first|second|third|one|two|three)\b/i;
  if (numberedPattern.test(lowerText)) {
    score += 3;
  }

  return Math.max(1, Math.min(10, score));
}

/**
 * Scores Peroration technique effectiveness
 * Checks for emotional closing and call to action
 *
 * @param text - The text to analyze
 * @returns Score from 1-10
 */
export function scorePeroration(text: string): number {
  const lowerText = text.toLowerCase();
  let score = 1;

  // Closing indicators
  const closingPatterns = [
    /\bso\s+I\s+(ask|urge|implore)/i,
    /\blet\s+us\s+(remember|not\s+forget|choose)/i,
    /\bwe\s+must\s+(act|choose|decide)/i,
    /\bthe\s+time\s+(has\s+come|is\s+now)/i,
    /\bwe\s+cannot\s+(afford|wait|delay)/i,
    /\btogether\s+we\s+can/i,
  ];

  // Emotional language
  const emotionalPatterns = [
    /\b(freedom|justice|hope|future|children|legacy)/i,
    /\b(right\s+side\s+of\s+history)/i,
    /\b(stand\s+up|fight|defend)/i,
  ];

  // Call to action
  const callToActionPatterns = [
    /\bwe\s+must/i,
    /\bwe\s+should/i,
    /\blet'?s\s+(not|choose|decide)/i,
    /\bI\s+(call|urge|ask)\s+(on|you)/i,
  ];

  const hasClosing = closingPatterns.some((pattern) =>
    pattern.test(lowerText),
  );
  const hasEmotional = emotionalPatterns.some((pattern) =>
    pattern.test(lowerText),
  );
  const hasCallToAction = callToActionPatterns.some((pattern) =>
    pattern.test(lowerText),
  );

  if (hasClosing) score += 3;
  if (hasEmotional) score += 3;
  if (hasCallToAction) score += 2;
  if (hasClosing && hasEmotional && hasCallToAction) score += 2; // Complete peroration

  return Math.max(1, Math.min(10, score));
}

/**
 * Scores Gish Gallop technique effectiveness
 * Checks for rapid-fire multiple arguments
 *
 * @param text - The text to analyze
 * @returns Score from 1-10
 */
export function scoreGishGallop(text: string): number {
  const lowerText = text.toLowerCase();
  let score = 1;

  // Multiple argument indicators
  const multipleArgumentPatterns = [
    /\band\s+what\s+about/gi,
    /\bplus[,\s]/gi,
    /\balso[,\s]/gi,
    /\bfurthermore[,\s]/gi,
    /\bmoreover[,\s]/gi,
    /\badditionally[,\s]/gi,
    /\bnot\s+to\s+mention/gi,
  ];

  // Count transition words
  let transitionCount = 0;
  multipleArgumentPatterns.forEach((pattern) => {
    const matches = lowerText.match(pattern);
    if (matches) transitionCount += matches.length;
  });

  if (transitionCount >= 3) score += 4;
  else if (transitionCount >= 2) score += 2;

  // Check for question marks (multiple questions)
  const questionCount = (text.match(/\?/g) || []).length;
  if (questionCount >= 3) score += 3;

  // Check for sentence density (many short sentences)
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length >= 5) score += 2;

  // Word count (should be substantial)
  const wordCount = text.split(/\s+/).length;
  if (wordCount > 100) score += 1;

  return Math.max(1, Math.min(10, score));
}

/**
 * Scores Strategic Interruption technique effectiveness
 * Note: This is harder to detect from text alone, relies on transcript markers
 *
 * @param text - The text to analyze
 * @returns Score from 1-10
 */
export function scoreStrategicInterruption(text: string): number {
  const lowerText = text.toLowerCase();
  let score = 1;

  // Interruption indicators
  const interruptionPatterns = [
    /\bhold\s+on/i,
    /\bwait[,\s]/i,
    /\bstop\s+right\s+there/i,
    /\blet\s+me\s+(stop|interrupt)\s+you/i,
    /\bI\s+have\s+to\s+(stop|interrupt)\s+you/i,
    /\bthat'?s\s+not\s+true/i,
    /\bthat'?s\s+misleading/i,
  ];

  // Correction patterns
  const correctionPatterns = [
    /\bactually[,\s]/i,
    /\bin\s+fact[,\s]/i,
    /\bno[,\s]+that'?s/i,
  ];

  const hasInterruption = interruptionPatterns.some((pattern) =>
    pattern.test(lowerText),
  );
  const hasCorrection = correctionPatterns.some((pattern) =>
    pattern.test(lowerText),
  );

  if (hasInterruption) score += 4;
  if (hasCorrection) score += 3;

  // Brevity (interruptions should be quick)
  const wordCount = text.split(/\s+/).length;
  if (wordCount <= 30) score += 2;

  return Math.max(1, Math.min(10, score));
}

