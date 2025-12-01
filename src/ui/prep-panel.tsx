import { X } from "lucide-react";
import { Button } from "./button";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { ScrollArea } from "./scroll-area";

interface PrepPanelProps {
  isOpen: boolean;
  onClose: () => void;
  opponent?: any; // Full opponent object with buffet-style prep data
}

export function PrepPanel({
  isOpen,
  onClose,
  opponent,
}: PrepPanelProps) {
  if (!isOpen) return null;

  // Helper to render complex fields
  const renderComplex = (val: any) => {
    if (typeof val === 'string') return val;
    if (typeof val === 'object' && val !== null) {
      if (val.timing) return `${val.timing} - ${val.setup}`;
      if (val.trigger) return `When: ${val.trigger}`;
      return JSON.stringify(val);
    }
    return String(val);
  };

  // Get selected content
  const selectedOpening = opponent?.openingOptions?.find((o: any) => o.id === opponent.selectedOpeningId);
  const selectedClosing = opponent?.closingOptions?.find((c: any) => c.id === opponent.selectedClosingId);
  const selectedFrames = opponent?.argumentFrames?.filter((f: any) => opponent.selectedFrameIds?.includes(f.id)) || [];
  const selectedZingers = opponent?.zingers?.filter((z: any) => opponent.selectedZingerIds?.includes(z.id)) || [];
  const selectedCounters = opponent?.opponentIntel?.flatMap((intel: any) =>
    intel.counters.filter((c: any) => opponent.selectedCounterIds?.includes(c.id)).map((c: any) => ({
      ...c,
      argument: intel.argument
    }))
  ) || [];

  // Group receipts by category
  const groupedReceipts = useMemo(() => {
    if (!opponent?.receipts) return {};
    return opponent.receipts.reduce((acc: any, receipt: any) => {
      if (!acc[receipt.category]) acc[receipt.category] = [];
      acc[receipt.category].push(receipt);
      return acc;
    }, {});
  }, [opponent?.receipts]);

  const hasQuickRef = selectedOpening || selectedClosing || selectedFrames.length > 0 || selectedZingers.length > 0 || selectedCounters.length > 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-xl shadow-2xl animate-slide-up max-h-[70vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="text-sm font-semibold text-primary">Quick Reference</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {hasQuickRef ? (
            <div className="grid grid-cols-3 gap-4">
              {/* Left Column: Opening & Closing */}
              <div className="space-y-4">
                {selectedOpening && (
                  <Card className="h-auto">
                    <CardHeader className="py-2 bg-blue-500/10">
                      <CardTitle className="text-xs font-bold text-blue-600">OPENING</CardTitle>
                    </CardHeader>
                    <CardContent className="py-3">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase block mb-1">{selectedOpening.type}</span>
                      <p className="text-xs leading-relaxed">{selectedOpening.content}</p>
                    </CardContent>
                  </Card>
                )}

                {selectedClosing && (
                  <Card className="h-auto">
                    <CardHeader className="py-2 bg-purple-500/10">
                      <CardTitle className="text-xs font-bold text-purple-600">CLOSING</CardTitle>
                    </CardHeader>
                    <CardContent className="py-3">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase block mb-1">{selectedClosing.type}</span>
                      <p className="text-xs leading-relaxed">{selectedClosing.content}</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Middle Column: Arguments & Zingers */}
              <div className="space-y-4">
                {selectedFrames.length > 0 && (
                  <Card className="h-auto">
                    <CardHeader className="py-2 bg-green-500/10">
                      <CardTitle className="text-xs font-bold text-green-600">CORE ARGUMENTS</CardTitle>
                    </CardHeader>
                    <CardContent className="py-3 space-y-3">
                      {selectedFrames.map((frame: any) => (
                        <div key={frame.id} className="space-y-0.5">
                          <div className="font-semibold text-xs">{frame.label}</div>
                          <p className="text-[10px] text-muted-foreground">{frame.summary}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {selectedZingers.length > 0 && (
                  <Card className="h-auto">
                    <CardHeader className="py-2 bg-yellow-500/10">
                      <CardTitle className="text-xs font-bold text-yellow-600">ZINGERS</CardTitle>
                    </CardHeader>
                    <CardContent className="py-3 space-y-2">
                      {selectedZingers.map((zinger: any) => (
                        <div key={zinger.id} className="p-2 bg-yellow-500/5 rounded border border-yellow-500/20">
                          <p className="text-xs font-medium">"{zinger.text}"</p>
                          <p className="text-[9px] text-muted-foreground uppercase mt-0.5">{renderComplex(zinger.context)}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column: Receipts & Counters */}
              <div className="space-y-4">
                {selectedCounters.length > 0 && (
                  <Card className="h-auto">
                    <CardHeader className="py-2 bg-red-500/10">
                      <CardTitle className="text-xs font-bold text-red-600">COUNTERS</CardTitle>
                    </CardHeader>
                    <CardContent className="py-3">
                      <ScrollArea className="h-[150px] pr-2">
                        <div className="space-y-2">
                          {selectedCounters.map((counter: any) => (
                            <div key={counter.id} className="space-y-0.5 border-b border-border pb-2 last:border-0">
                              <div className="text-[9px] font-semibold text-red-500 uppercase">Vs: {counter.argument}</div>
                              <div className="font-medium text-xs">{counter.label}</div>
                              <p className="text-[10px] text-muted-foreground">{counter.text}</p>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                )}

                {Object.keys(groupedReceipts).length > 0 && (
                  <Card className="h-auto">
                    <CardHeader className="py-2 bg-orange-500/10">
                      <CardTitle className="text-xs font-bold text-orange-600">RECEIPTS</CardTitle>
                    </CardHeader>
                    <CardContent className="py-3">
                      <ScrollArea className="h-[150px] pr-2">
                        <div className="space-y-3">
                          {Object.entries(groupedReceipts).map(([category, receipts]: [string, any]) => (
                            <div key={category}>
                              <h4 className="text-[9px] font-bold uppercase text-muted-foreground mb-1">{category}</h4>
                              <div className="space-y-1.5">
                                {receipts?.map((receipt: any) => (
                                  <div key={receipt.id} className="text-[10px] border-l-2 border-orange-500/30 pl-1.5">
                                    <span className="font-bold">{receipt.source}:</span> {receipt.content}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-primary/60">
              No prep materials available for this debate
            </div>
          )}
        </div>
      </div>
    </>
  );
}
