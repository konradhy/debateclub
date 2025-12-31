import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { ExternalLink } from "lucide-react";
import { Id } from "@cvx/_generated/dataModel";

interface ResearchArticle {
  title: string;
  url: string;
  source: string;
  publishedDate?: string;
  summary: string;
  content: string;
}

interface ResearchTabProps {
  researchDocs:
    | Array<{
        _id: Id<"research">;
        query: string;
        articles: ResearchArticle[];
        timestamp: number;
      }>
    | null
    | undefined;
}

// Helper function to get friendly source label
function getResearchSourceLabel(query: string): string {
  if (query.includes("User-provided")) return "📝 My Research";
  if (query.includes("Debate topic")) return "🌐 Web Research";
  return query;
}

export function ResearchTab({ researchDocs }: ResearchTabProps) {
  if (!researchDocs || researchDocs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No research data available yet. Generate prep materials to populate
          this section.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {researchDocs.map((researchDoc) => (
        <div key={researchDoc._id} className="space-y-4">
          {/* Source Header */}
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div>
              <h3 className="font-semibold text-lg">
                {getResearchSourceLabel(researchDoc.query)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {new Date(researchDoc.timestamp).toLocaleString()}
              </p>
            </div>
            <span className="text-xs px-2 py-1 rounded border border-border bg-secondary text-secondary-foreground">
              {researchDoc.articles.length}{" "}
              {researchDoc.articles.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {/* Articles */}
          <div className="space-y-4">
            {researchDoc.articles.map((article, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-2"
                    >
                      {article.title}
                      {article.url && (
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      )}
                    </a>
                  </CardTitle>
                  <div className="text-sm text-muted-foreground flex gap-2">
                    <span>{article.source}</span>
                    {article.publishedDate && (
                      <span>• {article.publishedDate}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {article.summary}
                  </p>
                  <div className="text-xs bg-secondary p-2 rounded max-h-32 overflow-y-auto">
                    {article.content}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
