/**
 * OpenRouter API integration helper
 * Provides functions for calling OpenRouter API with retry logic and error handling
 */

export const OPENROUTER_API_URL =
  "https://openrouter.ai/api/v1/chat/completions";

export interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Calls OpenRouter API with retry logic
 *
 * @param apiKey - OpenRouter API key
 * @param messages - Array of messages for the conversation
 * @param siteUrl - Site URL for OpenRouter headers
 * @param maxRetries - Maximum number of retry attempts
 * @param model - Optional model override (defaults to anthropic/claude-sonnet-4.5)
 * @param maxTokens - Optional max tokens limit
 * @returns API response
 */
export async function callOpenRouter(
  apiKey: string,
  messages: Array<OpenRouterMessage>,
  siteUrl: string,
  maxRetries: number = 3,
  model: string = "anthropic/claude-sonnet-4.5",
  maxTokens?: number,
): Promise<OpenRouterResponse> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": siteUrl,
          "X-Title": "Win Every Argument",
        },
        body: JSON.stringify({
          model,
          messages,
          response_format: { type: "json_object" },
          ...(maxTokens ? { max_tokens: maxTokens } : {}),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();

        // Handle rate limiting with exponential backoff
        if (response.status === 429 && attempt < maxRetries) {
          const waitTime = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
          console.log(
            `[OpenRouter] Rate limited, waiting ${waitTime}ms before retry ${attempt + 1}`,
          );
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          continue;
        }

        throw new Error(
          `OpenRouter API error (${response.status}): ${errorText.substring(0, 200)}`,
        );
      }

      const data: OpenRouterResponse = await response.json();
      return data;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(
        `[OpenRouter] Attempt ${attempt} failed:`,
        lastError.message,
      );

      if (attempt < maxRetries) {
        const waitTime = Math.pow(2, attempt) * 1000;
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError || new Error("OpenRouter API call failed after retries");
}
