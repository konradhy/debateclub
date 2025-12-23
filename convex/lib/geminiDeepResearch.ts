import { GoogleGenAI } from '@google/genai';

export async function runDeepResearch(
  query: string,
  apiKey: string,
  progressCallback: (
    status:
      | "deep_research_planning"
      | "deep_research_searching"
      | "deep_research_complete"
      | "error",
    message: string,
    error?: string
  ) => Promise<void>
): Promise<string> {
  const client = new GoogleGenAI({
    apiKey: apiKey
  });

  // 1. Start Deep Research in background mode
  await progressCallback("deep_research_planning", "Submitting research task...");

  const interaction = await client.interactions.create({
    input: query,
    agent: 'deep-research-pro-preview-12-2025',
    background: true
  });

  console.log(`[Deep Research] Started. Interaction ID: ${interaction.id}`);

  // 2. Poll for completion (10s intervals, 20 min max)
  let attempts = 0;
  while (attempts < 120) {  // 120 * 10s = 20 min
    await new Promise(resolve => setTimeout(resolve, 10000));

    const result = await client.interactions.get(interaction.id);

    if (result.status === 'completed') {
      await progressCallback("deep_research_complete", "Research complete!");
      // Return the markdown report from outputs
      if (!result.outputs || result.outputs.length === 0) {
        throw new Error('No outputs from Deep Research');
      }
      const lastOutput = result.outputs[result.outputs.length - 1];
      if ('text' in lastOutput && lastOutput.text) {
        return lastOutput.text;
      }
      throw new Error('Last output does not contain text');
    }

    if (result.status === 'failed') {
      throw new Error(`Deep Research failed: Unknown error`);
    }

    // Update progress
    const elapsed = attempts * 10;
    await progressCallback(
      "deep_research_searching",
      `Research in progress... (${elapsed}s elapsed)`
    );
    attempts++;
  }

  throw new Error("Deep Research timed out after 20 minutes");
}
