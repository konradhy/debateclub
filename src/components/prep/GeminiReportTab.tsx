import ReactMarkdown from "react-markdown";
import { FileSearch } from "lucide-react";

interface GeminiReportTabProps {
  geminiResearchReport: string | undefined;
  geminiResearchMetadata:
    | {
        generatedAt: number;
        reportLength: number;
      }
    | undefined;
}

export function GeminiReportTab({
  geminiResearchReport,
  geminiResearchMetadata,
}: GeminiReportTabProps) {
  return (
    <>
      {geminiResearchReport ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b">
            <FileSearch className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-primary">
              AI Research Report
            </h3>
          </div>
          <div className="space-y-6 max-w-4xl">
            <ReactMarkdown
              components={{
                h1: ({ node, children, ...props }) => {
                  const isSourcesSection =
                    String(children).toLowerCase().includes("source") ||
                    String(children).toLowerCase().includes("reference") ||
                    String(children).toLowerCase().includes("citation");
                  return isSourcesSection ? (
                    <div className="mt-12 mb-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
                        <h1
                          className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight"
                          {...props}
                        >
                          {children}
                        </h1>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
                      </div>
                    </div>
                  ) : (
                    <h1
                      className="text-4xl font-bold mt-10 mb-6 text-gray-900 dark:text-gray-100 tracking-tight leading-tight"
                      {...props}
                    >
                      {children}
                    </h1>
                  );
                },
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
                ol: ({ node, children, ...props }) => (
                  <ol
                    className="mb-6 space-y-3 text-gray-700 dark:text-gray-300 counter-reset"
                    {...props}
                  >
                    {children}
                  </ol>
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
                em: ({ node, children, ...props }) => (
                  <em
                    className="italic text-gray-600 dark:text-gray-400"
                    {...props}
                  >
                    {children}
                  </em>
                ),
                a: ({ node, children, href, ...props }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline decoration-blue-300 dark:decoration-blue-600 underline-offset-2 transition-colors"
                    {...props}
                  >
                    {children}
                  </a>
                ),
                code: ({ node, children, ...props }) => (
                  <code
                    className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                    {...props}
                  >
                    {children}
                  </code>
                ),
                blockquote: ({ node, children, ...props }) => (
                  <blockquote
                    className="border-l-4 border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-950/20 pl-6 pr-4 py-4 my-6 italic text-gray-700 dark:text-gray-300 rounded-r-lg"
                    {...props}
                  >
                    {children}
                  </blockquote>
                ),
                hr: ({ node, ...props }) => (
                  <hr
                    className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"
                    {...props}
                  />
                ),
              }}
            >
              {geminiResearchReport}
            </ReactMarkdown>
          </div>
          {geminiResearchMetadata && (
            <div className="mt-6 pt-4 border-t text-xs text-muted-foreground">
              Generated on{" "}
              {new Date(geminiResearchMetadata.generatedAt).toLocaleString()}
              {" • "}
              {Math.round(geminiResearchMetadata.reportLength / 1000)}k
              characters
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <FileSearch className="h-12 w-12 mx-auto mb-3 opacity-30 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">
            Research Report Not Yet Ready
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Click "Generate Strategy (Gemini)" to create a comprehensive
            research report using Gemini Deep Research.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            This process can take 3-20 minutes for thorough analysis.
          </p>
        </div>
      )}
    </>
  );
}
