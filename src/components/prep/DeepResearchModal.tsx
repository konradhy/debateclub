import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/ui/dialog";
import { RefreshCw, Sparkles, AlertCircle } from "lucide-react";

interface DeepResearchModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    deepResearchTokens: number;
    onRunDeepResearch: (mode: "report-only" | "full-replace") => void;
}

export function DeepResearchModal({
    open,
    onOpenChange,
    deepResearchTokens,
    onRunDeepResearch,
}: DeepResearchModalProps) {
    const hasTokens = deepResearchTokens >= 1;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Deep Research Options
                    </DialogTitle>
                    <DialogDescription>
                        Choose how you want to use Deep Research results
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Cost Info */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <span className="text-sm font-medium">Cost</span>
                        <span className="text-sm text-muted-foreground">
                            1 token (~$2.70)
                        </span>
                    </div>

                    {/* Two Options */}
                    <div className="space-y-3">
                        <button
                            onClick={() => {
                                onRunDeepResearch("report-only");
                                onOpenChange(false);
                            }}
                            disabled={!hasTokens}
                            className="w-full p-4 text-left rounded-lg border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:bg-transparent"
                        >
                            <div className="flex items-start gap-3">
                                <img src="/images/custom/ancient-scroll.svg" alt="" className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <div className="space-y-1">
                                    <div className="font-medium">Generate Report Only</div>
                                    <div className="text-sm text-muted-foreground">
                                        Keep your current prep materials. Add Deep Research report
                                        for reference.
                                    </div>
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => {
                                onRunDeepResearch("full-replace");
                                onOpenChange(false);
                            }}
                            disabled={!hasTokens}
                            className="w-full p-4 text-left rounded-lg border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:bg-transparent"
                        >
                            <div className="flex items-start gap-3">
                                <RefreshCw className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <div className="space-y-1">
                                    <div className="font-medium">Replace Prep Materials</div>
                                    <div className="text-sm text-muted-foreground">
                                        Generate new prep materials based on Deep Research. Your
                                        current materials will be replaced.
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>

                    {/* Token Balance Warning */}
                    {!hasTokens && (
                        <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>
                                Insufficient tokens. Purchase Deep Research tokens to continue.
                            </span>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
