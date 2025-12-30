import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { ExternalLink } from "lucide-react";

interface ResearchArticle {
  title: string;
  url: string;
  source: string;
  publishedDate?: string;
  summary: string;
  content: string;
}

interface ResearchTabProps {
  research:
    | {
        articles: ResearchArticle[];
      }
    | null
    | undefined;
}

export function ResearchTab({ research }: ResearchTabProps) {
  return (
    <>
      {research ? (
        <div className="space-y-4">
          {research.articles.map((article, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-2"
                  >
                    {article.title}
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
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
      ) : (
        <div className="p-4 rounded-lg border border-dashed border-border text-center text-sm text-muted-foreground">
          Research articles and raw data will appear here after generation.
        </div>
      )}
    </>
  );
}
