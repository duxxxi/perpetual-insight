import { useRef, useState } from "react";
import { Brain, CornerDownLeft } from "lucide-react";

type Msg = { role: "you" | "perpetuity"; text: string };

export function ContextChat({ pageTitle }: { pageTitle: string }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const send = () => {
    const text = value.trim();
    if (!text) return;
    setValue("");
    setMsgs((m) => [
      ...m,
      { role: "you", text },
      {
        role: "perpetuity",
        text: `Noted and filed under ${pageTitle}. I'll use this in drafts, quotes and briefs from now on — tell me if it changes.`,
      },
    ]);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <div className="glass-panel info-glow mt-6 rounded-2xl">
      <div className="flex items-center gap-2 border-b border-foreground/[0.07] px-3.5 py-2.5">
        <Brain className="size-3.5 text-accent" />
        <p className="text-[11.5px] font-semibold tracking-[-0.01em]">Add context</p>
        <span className="ml-auto text-[10px] text-foreground/35">plain language, one fact at a time</span>
      </div>

      {msgs.length > 0 ? (
        <div className="space-y-2 px-3.5 py-3">
          {msgs.map((m, i) => (
            <div key={i} className={m.role === "you" ? "flex justify-end" : ""}>
              <p
                className={
                  m.role === "you"
                    ? "max-w-[85%] rounded-2xl bg-accent/15 px-3 py-1.5 text-[12.5px] leading-relaxed text-foreground"
                    : "text-[12.5px] leading-relaxed text-foreground/65"
                }
              >
                {m.text}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex items-end gap-2 px-3 py-2.5">
        <textarea
          ref={inputRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder={`Tell Perpetuity something about ${pageTitle.toLowerCase()}…`}
          className="max-h-24 min-h-[34px] flex-1 resize-none bg-transparent px-1 text-[12.5px] leading-relaxed outline-none placeholder:text-foreground/30"
        />
        <button
          onClick={send}
          disabled={!value.trim()}
          className="glass-chip flex size-7 shrink-0 items-center justify-center rounded-full disabled:opacity-40"
          aria-label="Add context"
        >
          <CornerDownLeft className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
