import { X } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";

interface PrepPanelProps {
  isOpen: boolean;
  onClose: () => void;
  cheatSheet?: string;
  openingStatement?: string;
  debateNotes?: string;
}

export function PrepPanel({
  isOpen,
  onClose,
  cheatSheet,
  openingStatement,
  debateNotes,
}: PrepPanelProps) {
  const [activeTab, setActiveTab] = useState<
    "cheatsheet" | "notes" | "opening"
  >("cheatsheet");

  if (!isOpen) return null;

  const tabs = [
    { id: "cheatsheet" as const, label: "CheatSheet", content: cheatSheet },
    { id: "notes" as const, label: "Notes", content: debateNotes },
    { id: "opening" as const, label: "Opening", content: openingStatement },
  ];

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-xl shadow-2xl animate-slide-up max-h-[60vh] flex flex-col">
        {/* Header with tabs */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                disabled={!tab.content}
              >
                {tab.label}
              </Button>
            ))}
          </div>
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
        <div className="flex-1 overflow-y-auto p-6">
          {activeContent ? (
            <div className="whitespace-pre-wrap text-sm text-primary/80">
              {activeContent}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-primary/60">
              No {activeTab} available for this debate
            </div>
          )}
        </div>
      </div>
    </>
  );
}
