import { GoogleGenAI } from '@google/genai';

interface Article {
  title: string;
  url: string;
  content: string;
  summary: string;
  source: string;
  publishedDate?: string;
}

export async function findSourcesWithGemini(
  deepResearchReport: string,
  strategicBrief: string,
  apiKey: string
): Promise<Article[]> {
  const client = new GoogleGenAI({
    apiKey: apiKey
  });

  // Define JSON schema for structured output
  const articlesSchema = {
    type: "object",
    properties: {
      articles: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string", description: "Title of the source article" },
            url: { type: "string", description: "URL of the source" },
            content: { type: "string", description: "Relevant content from the source" },
            summary: { type: "string", description: "Brief summary of the article" },
            source: { type: "string", description: "Source name (e.g., 'NASA', 'BBC News')" },
            publishedDate: { type: "string", description: "Publication date if available" }
          },
          required: ["title", "url", "content", "summary", "source"]
        }
      }
    },
    required: ["articles"]
  };

  const prompt = `
${deepResearchReport}

${strategicBrief}

TASK: Based on this Deep Research report, use google_search to find the ACTUAL SOURCES mentioned.
The report mentions various studies, statistics, and sources. Your job is to:
1. Identify specific sources mentioned (e.g., "NASA 2023 study", "Pew Research poll")
2. Use google_search to find the actual URLs for these sources
3. Extract relevant content from each source
4. Return ONLY a JSON object with an "articles" array containing 8-12 high-quality sources

Requirements:
- Each article MUST have a real URL (no made-up sources)
- Focus on authoritative sources mentioned in the research
- Extract content that supports the debate position
- Return JSON matching the exact schema provided
`;

  // Single API call - Interactions API handles the tool loop automatically!
  const interaction = await client.interactions.create({
    model: 'gemini-3-flash-preview',
    input: prompt,
    tools: [{ type: 'google_search' }],
    response_format: articlesSchema
  });

  // Parse the structured output
  if (!interaction.outputs || interaction.outputs.length === 0) {
    throw new Error('No outputs from Gemini search');
  }

  const textOutput = interaction.outputs.find(o => o.type === 'text');
  if (!textOutput || !('text' in textOutput) || !textOutput.text) {
    throw new Error('No text output from Gemini search');
  }

  const parsed = JSON.parse(textOutput.text);
  const articles: Article[] = parsed.articles;
  console.log(`[Gemini Search] Found ${articles.length} sources`);

  return articles;
}
