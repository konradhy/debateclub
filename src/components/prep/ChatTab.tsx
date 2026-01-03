import { RefObject } from "react";
import { Send, Loader2 } from "lucide-react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { cn } from "@/utils/misc";

interface ChatMessage {
  _id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface ChatTabProps {
  messages: ChatMessage[] | null | undefined;
  input: string;
  setInput: (value: string) => void;
  isSending: boolean;
  onSend: () => void;
  scrollRef: RefObject<HTMLDivElement>;
}

export function ChatTab({
  messages,
  input,
  setInput,
  isSending,
  onSend,
  scrollRef,
}: ChatTabProps) {
  return (
    <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden">
      {/* Chat Header */}
      <div className="px-4 py-3 bg-secondary/30 border-b flex items-center gap-2">
        <img src="/images/custom/dialog-scroll.svg" alt="" className="h-5 w-5" />
        <div>
          <h3 className="font-semibold text-sm">Research Assistant</h3>
          <p className="text-xs text-muted-foreground">
            Ask questions about your research and debate topic
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-background"
      >
        {!messages || messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <img src="/images/custom/dialog-scroll.svg" alt="" className="h-12 w-12 opacity-30 mb-4" />
            <h4 className="font-medium text-muted-foreground mb-2">
              Start a conversation
            </h4>
            <p className="text-sm text-muted-foreground max-w-md">
              Ask questions about your research, debate topic, or strategy. The
              AI has access to all your research articles and prep materials.
            </p>
            <div className="mt-4 space-y-2 text-left w-full max-w-md">
              <p className="text-xs font-semibold text-muted-foreground">
                Try asking:
              </p>
              <div className="space-y-1">
                {[
                  "What are the strongest arguments for my position?",
                  "What evidence do I have to counter economic arguments?",
                  "Summarize the key statistics from my research",
                  "What weaknesses should I prepare for?",
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(suggestion)}
                    className="block w-full text-left text-xs p-2 rounded bg-secondary/50 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                  >
                    "{suggestion}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-2",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                <span className="text-[10px] opacity-60 mt-1 block">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
        {isSending && (
          <div className="flex justify-start">
            <div className="bg-secondary rounded-lg px-4 py-2 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm text-muted-foreground">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t bg-background">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your research or debate strategy..."
            disabled={isSending}
            className="flex-1"
          />
          <Button type="submit" disabled={isSending || !input.trim()}>
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
