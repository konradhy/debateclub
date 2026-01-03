import {
  Loader2,
  AlertTriangle,
  Send,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Textarea } from "@/ui/textarea";
import { Button } from "@/ui/button";
import { cn } from "@/utils/misc";

interface MyResearchTabProps {
  userResearchText: string;
  setUserResearchText: (value: string) => void;
  isProcessingResearch: boolean;
  handleProcessResearch: () => void;
  processedResearch: any;
  handleSendExtractedItem: (itemType: string, item: any) => Promise<void>;
  sentItems: Map<string, boolean>;
}

export function MyResearchTab({
  userResearchText,
  setUserResearchText,
  isProcessingResearch,
  handleProcessResearch,
  processedResearch,
  handleSendExtractedItem,
  sentItems,
}: MyResearchTabProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <img src="/images/custom/ancient-scroll.svg" alt="" className="h-7 w-7" />
              Paste Your Research Material
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Paste notes, articles, or any research material. AI will extract
              arguments, receipts, and potential openers.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Textarea
            placeholder="Paste your research notes, articles, statistics, quotes, or any other material here...

Example content:
- Studies and statistics you've found
- Quotes from experts or opponents
- Case studies or examples
- Counter-arguments to address
- Interesting angles or hooks"
            value={userResearchText}
            onChange={(e) => setUserResearchText(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {userResearchText.length} characters
            </span>
            <Button
              onClick={handleProcessResearch}
              disabled={isProcessingResearch || !userResearchText.trim()}
            >
              {isProcessingResearch ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Extract Insights"
              )}
            </Button>
          </div>
        </div>

        {/* Processed Research Results */}
        {processedResearch && (
          <div className="space-y-6 mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <img
                src="/images/custom/athenaowlsml.svg"
                alt=""
                className="h-10 w-10"
              />
              <span className="font-medium">AI Analysis:</span>
              <span>{processedResearch.summary}</span>
            </div>

            {/* Extracted Arguments */}
            {processedResearch.extractedArguments?.length > 0 && (
              <Card>
                <CardHeader className="py-3 bg-green-500/10">
                  <CardTitle className="text-sm font-bold text-green-600 flex items-center gap-2">
                    <img src="/images/custom/marble-column.svg" alt="" className="h-4 w-4" />
                    EXTRACTED ARGUMENTS (
                    {processedResearch.extractedArguments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-4 space-y-4">
                  {processedResearch.extractedArguments.map((arg: any) => (
                    <div
                      key={arg.id}
                      className="space-y-2 border-l-2 border-green-500/30 pl-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{arg.claim}</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "text-xs px-2 py-0.5 rounded",
                              arg.strength === "Strong"
                                ? "bg-green-100 text-green-700"
                                : arg.strength === "Medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700",
                            )}
                          >
                            {arg.strength}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleSendExtractedItem("argument", arg)
                            }
                            disabled={sentItems.has(arg.id)}
                          >
                            {sentItems.has(arg.id) ? (
                              <>
                                <Check className="h-3 w-3 mr-1" />
                                Sent
                              </>
                            ) : (
                              <>
                                <Send className="h-3 w-3 mr-1" />
                                Send
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                      {arg.supportingPoints?.length > 0 && (
                        <ul className="text-sm text-muted-foreground list-disc list-inside">
                          {arg.supportingPoints.map(
                            (point: string, i: number) => (
                              <li key={i}>{point}</li>
                            ),
                          )}
                        </ul>
                      )}
                      {arg.source && (
                        <span className="text-xs text-muted-foreground">
                          Source: {arg.source}
                        </span>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Extracted Receipts */}
            {processedResearch.extractedReceipts?.length > 0 && (
              <Card>
                <CardHeader className="py-3 bg-orange-500/10">
                  <CardTitle className="text-sm font-bold text-orange-600 flex items-center gap-2">
                    <img src="/images/custom/stamped-document.svg" alt="" className="h-4 w-4" />
                    EXTRACTED RECEIPTS (
                    {processedResearch.extractedReceipts.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-4 space-y-4">
                  {processedResearch.extractedReceipts.map((receipt: any) => (
                    <div
                      key={receipt.id}
                      className="space-y-1 border-l-2 border-orange-500/30 pl-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs uppercase font-bold text-orange-600">
                            {receipt.type}
                          </span>
                          {receipt.source && (
                            <span className="text-xs text-muted-foreground">
                              — {receipt.source}
                            </span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleSendExtractedItem("receipt", receipt)
                          }
                          disabled={sentItems.has(receipt.id)}
                        >
                          {sentItems.has(receipt.id) ? (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Sent
                            </>
                          ) : (
                            <>
                              <Send className="h-3 w-3 mr-1" />
                              Send
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-sm font-medium">{receipt.content}</p>
                      <p className="text-xs text-muted-foreground italic">
                        Use: {receipt.useCase}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Potential Openers */}
            {processedResearch.potentialOpeners?.length > 0 && (
              <Card>
                <CardHeader className="py-3 bg-blue-500/10">
                  <CardTitle className="text-sm font-bold text-blue-600 flex items-center gap-2">
                    <img src="/images/custom/unfurling-scroll.svg" alt="" className="h-4 w-4" />
                    POTENTIAL OPENERS (
                    {processedResearch.potentialOpeners.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-4 space-y-4">
                  {processedResearch.potentialOpeners.map((opener: any) => (
                    <div
                      key={opener.id}
                      className="space-y-2 border-l-2 border-blue-500/30 pl-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-bold text-blue-600">
                          {opener.type}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleSendExtractedItem("opener", opener)
                          }
                          disabled={sentItems.has(opener.id)}
                        >
                          {sentItems.has(opener.id) ? (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Sent
                            </>
                          ) : (
                            <>
                              <Send className="h-3 w-3 mr-1" />
                              Send
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-sm italic">"{opener.hook}"</p>
                      <p className="text-xs text-muted-foreground">
                        {opener.content}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Potential Zingers */}
            {processedResearch.potentialZingers?.length > 0 && (
              <Card>
                <CardHeader className="py-3 bg-yellow-500/10">
                  <CardTitle className="text-sm font-bold text-yellow-600 flex items-center gap-2">
                    <img src="/images/custom/divine-lightning.svg" alt="" className="h-4 w-4" />
                    POTENTIAL ZINGERS (
                    {processedResearch.potentialZingers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-4 space-y-3">
                  {processedResearch.potentialZingers.map((zinger: any) => (
                    <div
                      key={zinger.id}
                      className="p-2 bg-yellow-500/5 rounded border border-yellow-500/20 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">"{zinger.text}"</p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleSendExtractedItem("zinger", zinger)
                          }
                          disabled={sentItems.has(zinger.id)}
                        >
                          {sentItems.has(zinger.id) ? (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Sent
                            </>
                          ) : (
                            <>
                              <Send className="h-3 w-3 mr-1" />
                              Send
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {zinger.context}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Counter-Arguments */}
            {processedResearch.extractedCounterArguments?.length > 0 && (
              <Card>
                <CardHeader className="py-3 bg-red-500/10">
                  <CardTitle className="text-sm font-bold text-red-600 flex items-center gap-2">
                    <img src="/images/custom/spy-glass.svg" alt="" className="h-4 w-4" />
                    COUNTER-ARGUMENTS TO ADDRESS (
                    {processedResearch.extractedCounterArguments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-4 space-y-4">
                  {processedResearch.extractedCounterArguments.map(
                    (counter: any) => (
                      <div
                        key={counter.id}
                        className="space-y-2 border-l-2 border-red-500/30 pl-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span className="font-medium text-red-700 dark:text-red-400">
                              {counter.argument}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleSendExtractedItem("counter", counter)
                            }
                            disabled={sentItems.has(counter.id)}
                          >
                            {sentItems.has(counter.id) ? (
                              <>
                                <Check className="h-3 w-3 mr-1" />
                                Sent
                              </>
                            ) : (
                              <>
                                <Send className="h-3 w-3 mr-1" />
                                Send
                              </>
                            )}
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold text-green-600">
                            Response:
                          </span>{" "}
                          {counter.suggestedResponse}
                        </p>
                      </div>
                    ),
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
