import { DifficultyLevel } from "./types";

/**
 * Returns skill level and tactical instructions based on difficulty.
 *
 * These instructions control the sophistication of arguments and the
 * deployment of advanced rhetorical techniques (HOW SKILLED THEY ARE).
 *
 * @param difficulty - The difficulty level to use
 * @returns Formatted instructions for the AI assistant
 */
export function getDifficultyInstructions(difficulty: DifficultyLevel): string {
  switch (difficulty) {
    case "easy":
      return `SKILL LEVEL: BEGINNER

ARGUMENT QUALITY:
- Make basic, straightforward arguments
- Use simple reasoning that's easy to follow
- Cite general knowledge rather than specific studies
- Make occasional logical errors that can be caught
- Don't use advanced rhetorical tactics
- Argue naturally and directly without strategic moves`;

    case "medium":
      return `SKILL LEVEL: COMPETENT

ARGUMENT QUALITY:
- Present solid, well-reasoned arguments
- Cite specific evidence and examples
- Build logical chains of reasoning
- Challenge their points effectively

TECHNIQUES TO DEPLOY:
- CONCESSION & PIVOT: When they make a good point, acknowledge it briefly then redirect ("Fair point, but...")
- PREEMPTION: Address their likely counterarguments before they make them
- REFRAMING: When cornered, change the frame of the debate
- RULE OF THREE: Structure arguments in threes for memorability
- RECEIPTS: Deploy specific facts, dates, statistics to support claims

WHEN TO USE EACH:
- CONCESSION: When they score a point (builds credibility)
- PREEMPTION: At the start of your arguments
- REFRAMING: When the current framing doesn't favor you
- RULE OF THREE: For memorable key points
- RECEIPTS: When making factual claims`;

    case "hard":
      return `SKILL LEVEL: EXPERT

ARGUMENT QUALITY:
- Present sophisticated, well-researched arguments
- Cite specific studies, expert quotes, historical precedents
- Build multi-layered logical frameworks
- Anticipate and counter their moves before they make them
- Exploit every weakness in their reasoning

FULL HASAN TECHNIQUE ARSENAL:

FUNDAMENTALS (Deploy Throughout):
- AUDIENCE AWARENESS: Tailor arguments to resonate with values mentioned in context
- EMOTIONAL APPEAL: Lead with pathos, use stories and examples that connect emotionally
- RECEIPTS: Always cite specific evidence - studies, dates, expert names, statistics
- AD HOMINEM (Judicious): When they cite expertise/credentials, question if warranted
- LISTENING: Notice when they concede points or make contradictions
- HUMOR: Use wit and light mockery to undermine weak arguments (sparingly)

TACTICAL TECHNIQUES (Deploy Strategically):
- CONCESSION & PIVOT: Acknowledge valid points then pivot to your strength ("You're right about X, but here's the bigger issue...")
- PREEMPTION: Start arguments with "I know you'll say X, but here's why that fails..."
- REFRAMING: When the question/premise disadvantages you, challenge or reframe it
- RULE OF THREE: Structure key arguments in threes for memorability and rhetorical power
- ZINGERS: Deploy memorable one-liners (under 15 words) when they make errors
- BOOBY TRAPS: If you know their past statements, quote them without attribution, get them to disagree, then reveal it was them

GISH GALLOP COUNTER (If They Use It):
- Pick their weakest claim and demolish it thoroughly
- Don't let them move on - keep them stuck defending that one point
- Call out the tactic explicitly to the audience

WHEN TO USE EACH:
- CONCESSION: Immediately when they make a legitimately good point (builds trust)
- PREEMPTION: At the start of making a controversial claim
- REFRAMING: When the current frame of debate disadvantages you
- RULE OF THREE: For your most important arguments
- ZINGERS: When they make an obvious error or contradiction (max 1-2 per debate)
- BOOBY TRAPS: Only if you have specific past statements to reference
- EMOTIONAL APPEAL: Lead with this, especially in openings
- RECEIPTS: Every factual claim should have a source
- HUMOR: Sparingly, when you're winning (not when defensive)

EXECUTION PRIORITY:
1. Start with strong emotional hook
2. Use PREEMPTION to address obvious counters
3. Build argument with RULE OF THREE structure
4. Support with RECEIPTS (specific evidence)
5. Use CONCESSION to build credibility when needed
6. Deploy ZINGERS only when opportunity is perfect
7. Close with emotional resonance`;

    default:
      return `SKILL LEVEL: COMPETENT

ARGUMENT QUALITY:
- Present solid, well-reasoned arguments
- Cite specific evidence and examples`;
  }
}
