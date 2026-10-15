import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ArrowUp, Plus, MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConversationDialog } from "@/components/conversation-dialog";
import { useEffect } from "react";

export function openPerpetuityDock() {
  window.dispatchEvent(new Event("perpetuity:open-chat"));
}

export function AskPerpetuityDock() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("perpetuity:open-chat", show);
    return () => window.removeEventListener("perpetuity:open-chat", show);
  }, []);
  if (["/about", "/landing"].includes(pathname)) return null;

  return (
    <>
      {!open && (
        <div className="perpetuity-dock-wrap">
          <div className="perpetuity-dock-status">
            <span className="perpetuity-on-dot" /> Perpetuity{" "}
            <span className="text-foreground/40">·</span> On
          </div>
          <div className="perpetuity-dock">
            <Button
              variant="ghost"
              size="icon"
              className="dock-plus"
              aria-label="Start a new conversation"
              title="New conversation"
              onClick={() => {
                setConversationId(null);
                setOpen(true);
              }}
            >
              <Plus />
            </Button>
            <Button
              variant="ghost"
              className="dock-launch"
              aria-label="Open Ask Perpetuity"
              onClick={() => setOpen(true)}
            >
              <span className="globe-orb size-5 shrink-0" aria-hidden />
              <span>
                {conversationId ? "Continue with Perpetuity…" : "Ask Perpetuity anything…"}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="dock-history"
              aria-label="Resume conversation"
              title="Resume conversation"
              onClick={() => setOpen(true)}
            >
              <MessagesSquare />
            </Button>
            <Button
              size="icon"
              className="dock-send"
              aria-label="Expand Ask Perpetuity"
              title="Open conversation"
              onClick={() => setOpen(true)}
            >
              <ArrowUp />
            </Button>
          </div>
        </div>
      )}
      <ConversationDialog
        open={open}
        onOpenChange={setOpen}
        conversationId={conversationId}
        onConversationCreated={setConversationId}
      />
    </>
  );
}
