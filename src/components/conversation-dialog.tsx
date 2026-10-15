import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  ChevronDown,
  Maximize2,
  Minimize2,
  Plus,
  ListChecks,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import {
  conversationStore,
  type Conversation as StoredConversation,
} from "@/lib/conversation-store";
import { taskStore } from "@/lib/task-store";

type Props = {
  conversationId?: string | null;
  initialMessage?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConversationCreated?: (id: string) => void;
};

export function ConversationDialog({
  conversationId,
  initialMessage,
  open,
  onOpenChange,
  onConversationCreated,
}: Props) {
  const [id, setId] = useState<string | null>(null);
  const [conv, setConv] = useState<StoredConversation | null>(null);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mode, setMode] = useState<"chat" | "task">("chat");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const createdCallback = useRef(onConversationCreated);
  createdCallback.current = onConversationCreated;

  const reply = (threadId: string) => {
    setThinking(true);
    timer.current = setTimeout(() => {
      conversationStore.append(threadId, {
        role: "assistant",
        text: "This is a design preview, so I haven’t run any agents or accessed your connected accounts. Your message is kept in this preview’s Threads, and you can continue the conversation here.",
        at: Date.now(),
      });
      setThinking(false);
    }, 600);
  };
  useEffect(() => {
    if (!open) return;
    setMode("chat");
    const existing = conversationId ? conversationStore.get(conversationId) : undefined;
    if (existing) {
      setId(existing.id);
      setConv(existing);
    } else if (initialMessage?.trim()) {
      const created = conversationStore.start(initialMessage.trim());
      setId(created.id);
      setConv(created);
      createdCallback.current?.(created.id);
      reply(created.id);
    } else {
      setId(null);
      setConv(null);
    }
  }, [open, conversationId, initialMessage]);
  useEffect(() => {
    if (!id) return;
    const unsubscribe = conversationStore.subscribe(() => setConv(conversationStore.get(id) ?? null));
    return () => { unsubscribe(); };
  }, [id]);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const send = (text: string) => {
    if (!text.trim() || thinking) return;
    const value = text.trim();
    const thread = id ? conversationStore.get(id) : undefined;
    const active = thread ?? conversationStore.start(value);
    if (thread) conversationStore.append(thread.id, { role: "user", text: value, at: Date.now() });
    setId(active.id);
    setConv(conversationStore.get(active.id) ?? active);
    createdCallback.current?.(active.id);
    setInput("");
    if (mode === "task") {
      taskStore.add({ title: value, tag: "New" });
      conversationStore.append(active.id, {
        role: "assistant",
        text: "Added to Active Work and Assignments in this preview. No live task or external action was created.",
        at: Date.now(),
      });
      setConv(conversationStore.get(active.id) ?? active);
    } else reply(active.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`perpetuity-chat-sheet ${expanded ? "is-expanded" : ""}`}
        aria-describedby="chat-preview-description"
      >
        <div className="chat-drag-handle" aria-hidden />
        <header className="chat-sheet-header">
          <span className="chat-globe">
            <span className="globe-orb size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <DialogTitle className="text-[14px] font-semibold tracking-normal">
              Ask Perpetuity
            </DialogTitle>
            <div className="mt-1 flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="perpetuity-on-dot" /> One conversation across your work
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={expanded ? "Restore chat size" : "Expand chat"}
            title={expanded ? "Restore size" : "Expand"}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <Minimize2 /> : <Maximize2 />}
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Minimize conversation"
            title="Minimize"
            onClick={() => onOpenChange(false)}
          >
            <ChevronDown />
          </Button>
        </header>
        <DialogDescription id="chat-preview-description" className="chat-preview-caption">
          Design preview · No live agents connected
        </DialogDescription>
        <Conversation className="min-h-0 flex-1">
          <ConversationContent className="chat-transcript">
            {!conv?.messages.length && (
              <div className="chat-empty-state">
                <span className="chat-empty-globe">
                  <span className="globe-orb size-9" aria-hidden />
                </span>
                <p className="mb-2 text-[22px] font-medium text-foreground">What’s on your mind?</p>
                <p className="text-[13px] text-muted-foreground">
                  Your work. Your context. One conversation.
                </p>
                <div className="chat-starters">
                  {[
                    {
                      icon: ListChecks,
                      label: "Review my active work",
                      prompt: "Help me review my active work and decide what to prioritize.",
                    },
                    {
                      icon: MessageSquare,
                      label: "Prepare a meeting brief",
                      prompt: "Prepare a brief for my Bratislava meetings.",
                    },
                  ].map((item) => (
                    <Button
                      key={item.label}
                      variant="ghost"
                      onClick={() => setInput(item.prompt)}
                      className="chat-starter"
                    >
                      <item.icon />
                      <span>{item.label}</span>
                      <ArrowUp className="ml-auto size-3 rotate-45" />
                    </Button>
                  ))}
                </div>
              </div>
            )}
            {conv?.messages.map((message, index) => (
              <Message key={`${index}-${message.at}`} from={message.role} className="max-w-full">
                <MessageContent
                  className={
                    message.role === "user" ? "chat-user-message" : "chat-assistant-message"
                  }
                >
                  <MessageResponse>{message.text}</MessageResponse>
                </MessageContent>
              </Message>
            ))}
            {thinking && (
              <Message from="assistant">
                <MessageContent>
                  <Shimmer>Thinking…</Shimmer>
                </MessageContent>
              </Message>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
        <div className="chat-compose-area">
          <PromptInput onSubmit={({ text }) => send(text)} className="chat-sheet-composer">
            <PromptInputTextarea
              autoFocus
              name="message"
              aria-label="Message Perpetuity"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === "task" ? "What needs to get done?" : "Ask anything, or give me a task…"
              }
            />
            <PromptInputFooter>
              <div className="flex min-w-0 items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  title="New conversation"
                  aria-label="New conversation"
                  onClick={() => {
                    setId(null);
                    setConv(null);
                    setInput("");
                  }}
                >
                  <Plus />
                </Button>
                <div className="chat-mode-control" role="group" aria-label="Conversation mode">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-pressed={mode === "chat"}
                    onClick={() => setMode("chat")}
                  >
                    <MessageSquare />
                    <span>Chat</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-pressed={mode === "task"}
                    onClick={() => setMode("task")}
                  >
                    <ListChecks />
                    <span>Task</span>
                  </Button>
                </div>
              </div>
              <PromptInputSubmit
                aria-label="Send message"
                status={thinking ? "submitted" : "ready"}
                disabled={!input.trim() || thinking}
                className="dock-send size-9 rounded-full"
              >
                <ArrowUp />
              </PromptInputSubmit>
            </PromptInputFooter>
          </PromptInput>
          <div className="chat-bottom-note">
            <ShieldCheck className="size-3" /> No external actions in this preview
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
