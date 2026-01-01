import ReactMarkdown from "react-markdown";
import { Target } from "lucide-react";

interface StrategicBriefTabProps {
  strategicBrief: string | undefined;
  strategicBriefMetadata:
    | {
        generatedAt: number;
        wordCount: number;
        readingTimeMinutes: number;
      }
    | undefined;
}

export function StrategicBriefTab({
  strategicBrief,
  strategicBriefMetadata,
}: StrategicBriefTabProps) {
  return (
    <>
      {strategicBrief ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-primary">
              Strategic Brief
            </h3>
            {strategicBriefMetadata && (
              <span className="text-xs text-muted-foreground ml-auto">
                ~{strategicBriefMetadata.readingTimeMinutes} min read
              </span>
            )}
          </div>
          <div className="space-y-6 max-w-4xl">
            <ReactMarkdown
              components={{
                h1: ({ node, children, ...props }) => (
                  <h1
                    className="text-4xl font-bold mt-10 mb-6 text-gray-900 dark:text-gray-100 tracking-tight leading-tight"
                    {...props}
                  >
                    {children}
                  </h1>
                ),
                h2: ({ node, children, ...props }) => (
                  <h2
                    className="text-2xl font-bold mt-8 mb-5 text-gray-900 dark:text-gray-100 tracking-tight border-b border-gray-200 dark:border-gray-700 pb-2"
                    {...props}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ node, children, ...props }) => (
                  <h3
                    className="text-xl font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-200 tracking-tight"
                    {...props}
                  >
                    {children}
                  </h3>
                ),
                p: ({ node, children, ...props }) => (
                  <p
                    className="mb-5 leading-8 text-base text-gray-700 dark:text-gray-300"
                    {...props}
                  >
                    {children}
                  </p>
                ),
                ul: ({ node, children, ...props }) => (
                  <ul
                    className="mb-6 space-y-3 text-gray-700 dark:text-gray-300"
                    {...props}
                  >
                    {children}
                  </ul>
                ),
                li: ({ node, children, ...props }) => (
                  <li className="ml-6 pl-2 leading-7" {...props}>
                    <span className="text-gray-600 dark:text-gray-400 mr-3">
                      •
                    </span>
                    {children}
                  </li>
                ),
                strong: ({ node, children, ...props }) => (
                  <strong
                    className="font-semibold text-gray-900 dark:text-gray-100"
                    {...props}
                  >
                    {children}
                  </strong>
                ),
                hr: ({ node, ...props }) => (
                  <hr
                    className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"
                    {...props}
                  />
                ),
              }}
            >
              {strategicBrief}
            </ReactMarkdown>
          </div>
          {strategicBriefMetadata && (
            <div className="mt-6 pt-4 border-t text-xs text-muted-foreground">
              Generated on{" "}
              {new Date(strategicBriefMetadata.generatedAt).toLocaleString()}
              {" • "}
              {strategicBriefMetadata.wordCount} words
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Target className="h-12 w-12 mx-auto mb-3 opacity-30 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">
            Strategic Brief Not Yet Ready
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Generate your prep materials to receive a strategic orientation
            document.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            This 7-minute brief synthesizes your prep into a coherent game plan.
          </p>
        </div>
      )}
    </>
  );
}
