

export interface FirecrawlSearchResult {
    title: string;
    url: string;
    content: string; // or description/snippet depending on what we get
    publishedDate?: string;
    source?: string;
}

export interface FirecrawlResponse {
    success: boolean;
    data: {
        markdown: string;
        metadata?: {
            title?: string;
            description?: string;
            sourceURL?: string;
            [key: string]: any;
        };
    };
}

const FIRECRAWL_API_URL = "https://api.firecrawl.dev/v2";

export async function searchAndScrape(query: string, apiKey: string, limit: number = 3): Promise<FirecrawlSearchResult[]> {
    if (!apiKey) {
        throw new Error("Firecrawl API key is missing");
    }

    console.log(`Searching Firecrawl (v2) for: ${query}`);

    // 1. Search for pages with scraping enabled
    const searchResponse = await fetch(`${FIRECRAWL_API_URL}/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            query,
            limit: limit,
            scrapeOptions: {
                formats: ["markdown"],
            },
        }),
    });

    if (!searchResponse.ok) {
        const errorText = await searchResponse.text();
        console.error("Firecrawl search failed:", errorText);
        throw new Error(`Firecrawl search failed: ${searchResponse.statusText}`);
    }

    const searchResult = await searchResponse.json();

    if (!searchResult.success || !searchResult.data) {
        console.warn("Firecrawl returned no data", searchResult);
        return [];
    }

    // In v2 with scrapeOptions, data is an array of results
    const resultsData = Array.isArray(searchResult.data) ? searchResult.data : searchResult.data.web || [];

    const results: FirecrawlSearchResult[] = resultsData.map((item: any) => ({
        title: item.metadata?.title || item.title || "Untitled",
        url: item.metadata?.sourceURL || item.url,
        content: item.markdown || item.description || "",
        publishedDate: item.metadata?.date,
        source: new URL(item.metadata?.sourceURL || item.url).hostname,
    }));

    return results;
}
