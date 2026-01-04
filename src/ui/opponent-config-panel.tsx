import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { getInterruptionModeForDebateStyle } from "@/lib/vapi/speechPlans";

interface OpponentConfigPanelProps {
  isOpen: boolean;
  onClose: () => void;
  opponent: any;
  isDebateActive: boolean;
  onSaveAndRestart: (updates: {
    style?: string;
    difficulty?: string;
    position?: string;
  }) => Promise<void>;
}

export function OpponentConfigPanel({
  isOpen,
  onClose,
  opponent,
  isDebateActive,
  onSaveAndRestart,
}: OpponentConfigPanelProps) {
  const [style, setStyle] = useState(opponent?.style || "academic");
  const [difficulty, setDifficulty] = useState(
    opponent?.difficulty || "medium",
  );
  const [position, setPosition] = useState(opponent?.position || "pro");
  const [isLoading, setIsLoading] = useState(false);

  // Reset when opponent changes
  useEffect(() => {
    setStyle(opponent?.style || "academic");
    setDifficulty(opponent?.difficulty || "medium");
    setPosition(opponent?.position || "pro");
  }, [opponent]);

  const hasChanges =
    style !== opponent?.style ||
    difficulty !== opponent?.difficulty ||
    position !== opponent?.position;

  const handleSave = async () => {
    if (!hasChanges) return;
    setIsLoading(true);
    try {
      await onSaveAndRestart({ style, difficulty, position });
      onClose();
    } catch (error) {
      console.error("Failed to update config:", error);
      alert("Failed to update settings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && hasChanges && !isLoading) {
      handleSave();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-xl shadow-2xl animate-slide-up max-h-[70vh] flex flex-col"
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="text-sm font-semibold text-primary">
            Opponent Configuration
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-11 w-11 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-md mx-auto space-y-4">
            {/* Style Select */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Debate Style
              </label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="emotional">Emotional</SelectItem>
                  <SelectItem value="socratic">Socratic</SelectItem>
                  <SelectItem value="gish gallop">Gish Gallop</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty Select */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Difficulty
              </label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Position Select */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Opponent Position
              </label>
              <Select value={position} onValueChange={setPosition}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="con">Con</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Interruption Mode Display */}
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">
                Interruption Mode
              </div>
              <div className="text-sm font-medium capitalize">
                {getInterruptionModeForDebateStyle(style)}
              </div>
            </div>

            {/* Warning if debate active */}
            {isDebateActive && hasChanges && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
                ⚠️ Saving will stop the current debate and start a new one with
                these settings.
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1"
                disabled={!hasChanges || isLoading}
              >
                {isLoading ? "Saving..." : "Save & Restart Debate"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
