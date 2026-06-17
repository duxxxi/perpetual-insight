import { useEffect, useRef, useState } from "react";
import { ArrowUp, Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { conversationStore, type Conversation } from "@/lib/conversation-store";

type Props = {
  /** Open with an existing conversation id, or pass `initialMessage` to start a new one. */
  conversationId?: string | null;
  initialMessage?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function fakeReply(userText: string): string {
  const t = userText.trim().toLowerCase();
  if (!t) return "I'm here — what would you like to dig into?";
  if (t.endsWith("?"))
    return "Good question. Pulling context from your stack now — I'll flag anything that needs your call.";
  if (t.length < 24)
    return "Noted. Want me to take this further, or just keep it in the thread for later?";
  return "Got it. I've added this to the working thread and will surface the next step here as it firms up.";
}

export function ConversationDialog({
  conversationId,
  initialMessage,
  open,
  onOpenChange,
}: Props) {
  const [id, setId] = useState<string | null>(null);
  const [conv, setConv] = useState<Conversation | null>(null);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialize on open
  useEffect(() => {
    if (!open) return;
    if (conversationId) {
      setId(conversationId);
      setConv(conversationStore.get(conversationId) ?? null);
    } else if (initialMessage && initialMessage.trim()) {
      const created = conversationStore.start(initialMessage.trim());
      setId(created.id);
      setConv(created);
      // queue assistant reply
      setThinking(true);
      window.setTimeout(() => {
        conversationStore.append(created.id, {
          role: "assistant",
          text: fakeReply(initialMessage),
          at: Date.now(),
        });
        setConv(conversationStore.get(created.id) ?? null);
        setThinking(false);
      }, 650);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Subscribe so external updates reflect
  useEffect(() => {
    if (!id) return;
    return conversationStore.subscribe(() => {
      setConv(conversationStore.get(id) ?? null);
    });
  }, [id]);

  // Auto-scroll & focus
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conv?.messages.length, thinking]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setInput("");
      setThinking(false);
    }
  }, [open]);

  const send = () => {
    if (!id || !input.trim() || thinking) return;
    const text = input.trim();
    conversationStore.append(id, { role: "user", text, at: Date.now() });
    setInput("");
    setThinking(true);
    window.setTimeout(() => {
      conversationStore.append(id, {
        role: "assistant",
        text: fakeReply(text),
        at: Date.now(),
      });
      setThinking(false);
    }, 700);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl gap-0 border-foreground/10 bg-background/80 p-0 backdrop-blur-2xl sm:rounded-3xl overflow-hidden"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">
          {conv?.title ?? "Ask Perpetuity"}
        </DialogTitle>
        <div className="relative flex h-[78vh] max-h-[680px] flex-col">
          <div
            className="ai-iridescent absolute inset-x-0 top-0 h-px opacity-70"
            aria-hidden
          />

          {/* Header */}
          <div className="flex items-center gap-3 border-b border-foreground/5 px-5 py-3">
            <span className="ai-iridescent inline-flex size-7 items-center justify-center rounded-full ring-1 ring-foreground/5">
              <Sparkles className="size-3.5 text-foreground/80" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
                Perpetuity · conversation
              </p>
              <p className="truncate text-[13px] font-medium text-foreground">
                {conv?.title ?? "New conversation"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-full bg-foreground/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/55 hover:bg-foreground/10"
              title="Close — conversation saved in Threads"
            >
              <span className="hidden sm:inline">Save & close</span>
              <X className="size-3.5 sm:hidden" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-5 py-4"
          >
            {conv?.messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <span className="ai-iridescent mr-2 mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full ring-1 ring-foreground/5">
                    <Sparkles className="size-2.5 text-foreground/75" strokeWidth={1.75} />
                  </span>
                )}
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-2xl rounded-br-md bg-foreground px-3.5 py-2 text-[13px] leading-relaxed text-background"
                      : "max-w-[82%] rounded-2xl rounded-bl-md bg-foreground/[0.04] px-3.5 py-2 text-[13px] leading-relaxed text-foreground/85 ring-1 ring-foreground/5"
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex justify-start">
                <span className="ai-iridescent mr-2 mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full ring-1 ring-foreground/5">
                  <Sparkles className="size-2.5 text-foreground/75" strokeWidth={1.75} />
                </span>
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-foreground/[0.04] px-3 py-2 ring-1 ring-foreground/5">
                  <span className="size-1.5 animate-pulse rounded-full bg-foreground/40" />
                  <span className="size-1.5 animate-pulse rounded-full bg-foreground/40 [animation-delay:120ms]" />
                  <span className="size-1.5 animate-pulse rounded-full bg-foreground/40 [animation-delay:240ms]" />
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="border-t border-foreground/5 bg-foreground/[0.015] px-4 py-3"
          >
            <div className="glass-panel flex items-end gap-2 rounded-2xl px-3 py-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder="Continue the conversation…"
                className="flex-1 resize-none bg-transparent text-[13px] leading-relaxed text-foreground placeholder:text-foreground/35 focus:outline-none"
                style={{ maxHeight: 140 }}
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-xl bg-foreground text-background transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
              >
                <ArrowUp className="size-3.5" strokeWidth={2.25} />
              </button>
            </div>
            <p className="mt-1.5 px-1 text-[10px] uppercase tracking-[0.16em] text-foreground/35">
              ⏎ send · ⇧⏎ newline · closing saves to Threads
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
