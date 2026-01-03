import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { ScrollArea } from "@/ui/scroll-area";
import { ExternalLink } from "lucide-react";

interface QuickRefDebateProps {
  selectedOpening: any;
  selectedClosing: any;
  selectedFrames: any[];
  selectedZingers: any[];
  selectedCounters: any[];
  groupedReceipts: Record<string, any[]>;
  renderComplex: (val: any) => string;
}

export function QuickRefDebate({
  selectedOpening,
  selectedClosing,
  selectedFrames,
  selectedZingers,
  selectedCounters,
  groupedReceipts,
  renderComplex,
}: QuickRefDebateProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
      {/* Left Column: Opening & Closing */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="h-auto">
          <CardHeader className="py-3 bg-blue-500/10">
            <CardTitle className="text-sm font-bold text-blue-600">
              OPENING
            </CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            {selectedOpening ? (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  {selectedOpening.type}
                </span>
                <p className="text-sm leading-relaxed">
                  {selectedOpening.content}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No opening selected.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="h-auto">
          <CardHeader className="py-3 bg-primary/10">
            <CardTitle className="text-sm font-bold text-primary">
              CLOSING
            </CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            {selectedClosing ? (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  {selectedClosing.type}
                </span>
                <p className="text-sm leading-relaxed">
                  {selectedClosing.content}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No closing selected.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Middle Column: Arguments & Zingers */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="h-auto">
          <CardHeader className="py-3 bg-green-500/10">
            <CardTitle className="text-sm font-bold text-green-600">
              CORE ARGUMENTS
            </CardTitle>
          </CardHeader>
          <CardContent className="py-4 space-y-4">
            {selectedFrames.length > 0 ? (
              selectedFrames.map((frame) => (
                <div key={frame.id} className="space-y-1">
                  <div className="font-semibold text-sm">{frame.label}</div>
                  <p className="text-xs text-muted-foreground">
                    {frame.summary}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No arguments selected.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="h-auto">
          <CardHeader className="py-3 bg-yellow-500/10">
            <CardTitle className="text-sm font-bold text-yellow-600">
              ZINGERS
            </CardTitle>
          </CardHeader>
          <CardContent className="py-4 space-y-3">
            {selectedZingers.length > 0 ? (
              selectedZingers.map((zinger) => (
                <div
                  key={zinger.id}
                  className="p-2 bg-yellow-500/5 rounded border border-yellow-500/20"
                >
                  <p className="text-sm font-medium">"{zinger.text}"</p>
                  <p className="text-[10px] text-muted-foreground uppercase mt-1">
                    {renderComplex(zinger.context)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No zingers favorited.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Receipts & Counters */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="h-auto">
          <CardHeader className="py-3 bg-red-500/10">
            <CardTitle className="text-sm font-bold text-red-600">
              COUNTERS
            </CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <ScrollArea className="h-[200px] pr-4">
              <div className="space-y-3">
                {selectedCounters.length > 0 ? (
                  selectedCounters.map((counter) => (
                    <div
                      key={counter.id}
                      className="space-y-1 border-b border-border pb-2 last:border-0"
                    >
                      <div className="text-xs font-semibold text-red-500 uppercase">
                        Vs: {counter.argument}
                      </div>
                      <div className="font-medium text-sm">{counter.label}</div>
                      <p className="text-xs text-muted-foreground">
                        {counter.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No counters equipped.
                  </p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="h-auto">
          <CardHeader className="py-3 bg-orange-500/10">
            <CardTitle className="text-sm font-bold text-orange-600">
              RECEIPTS
            </CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <ScrollArea className="h-[200px] pr-4">
              <div className="space-y-4">
                {Object.entries(groupedReceipts).map(([category, receipts]) => (
                  <div key={category}>
                    <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">
                      {category}
                    </h4>
                    <div className="space-y-2">
                      {receipts?.map((receipt) => (
                        <div
                          key={receipt.id}
                          className="text-xs border-l-2 border-orange-500/30 pl-2"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{receipt.source}:</span>
                            {receipt.url && (
                              <a
                                href={receipt.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-600"
                              >
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                          <div>{receipt.content}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
