type ResearchIntensity = "basic" | "aggressive" | "deep";

/**
 * Returns research scope instructions based on intensity level.
 * These instructions guide the agent on how many searches to perform
 * and what depth of research to conduct.
 */
export function getResearchInstructions(intensity: ResearchIntensity): string {
  const instructions = {
    basic: `
RESEARCH SCOPE: Perform 2-3 focused searches:
• Receipts: One search for the strongest hard facts/statistics with specific dates
• Opponent Intel: One search for main counter-arguments and their key weaknesses
• Stories: One search for a compelling recent example or anecdote

Focus on quality over quantity - find the most devastating evidence.
`,
    aggressive: `
RESEARCH SCOPE: Perform 5-7 comprehensive searches:
• Receipts: Search for hard facts, statistics, study names with dates (no generalities)
• Opponent Intel: Search for common counter-arguments and their weaknesses (flawed data, fallacies)
• Stories: Search for anecdotes and emotional hooks
• Current Events: Search for 2025 developments on this topic
• Follow-up: 2-3 additional searches on promising leads

Cover multiple angles while going deep on the strongest evidence.
`,
    deep: `
RESEARCH SCOPE: Perform 10+ exhaustive searches with iterative refinement:
• Receipts: Multiple searches for statistics, studies, expert consensus (with exact dates)
• Opponent Intel: Multiple searches for counter-arguments, rebuttals, logical fallacies, failed implementations
• Stories: Multiple searches for case studies, emotional examples, recent news
• Historical precedents and comparative examples
• Expert opinions, quotes, academic research
• Cross-reference: When you find key evidence, search for verification and context
• If applicable: Opponent's past statements, contradictions, policy positions

Leave no stone unturned. Verify and strengthen every major claim.
`,
  };

  return instructions[intensity];
}
