import { useEffect, useRef, useState } from "react";
import { Check, Pencil, RotateCcw, X } from "lucide-react";
import { parseInline } from "@/lib/wiki";
import { resetFact, setFact } from "@/lib/wiki-store";

/**
 * Any fact on the Context page: reads as prose, clicks into an editor.
 * Links inside the text stay clickable; clicking the surrounding text edits it.
 */
export function EditableText({
  path,
  value,
  className = "",
  multiline = true,
  onNavigate,
  as = "span",
}: {
  path: string;
  value: string;
  className?: string;
  multiline?: boolean;
  onNavigate?: (id: string) => void;
  as?: "span" | "p";
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  useEffect(() => {
    if (editing && ref.current) {
      const el = ref.current;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [editing]);

  const save = () => {
    setFact(path, draft.trim());
    setEditing(false);
  };

  if (editing) {
    return (
      <span className="block">
        <textarea
          ref={ref}
          rows={multiline ? 2 : 1}
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setDraft(value);
              setEditing(false);
            }
            if (e.key === "Enter" && (!multiline || e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              save();
            }
          }}
          className={`w-full resize-none rounded-lg bg-accent/[0.06] px-2 py-1.5 outline-none ring-1 ring-accent/35 ${className}`}
        />
        <span className="mt-1 flex items-center gap-1.5">
          <button
            onClick={save}
            className="glass-chip inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
          >
            <Check className="size-3" /> Save
          </button>
          <button
            onClick={() => {
              setDraft(value);
              setEditing(false);
            }}
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] text-foreground/45 hover:text-foreground/80"
          >
            <X className="size-3" /> Cancel
          </button>
          <button
            onClick={() => {
              resetFact(path);
              setEditing(false);
            }}
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] text-foreground/35 hover:text-foreground/70"
          >
            <RotateCcw className="size-3" /> Revert
          </button>
          <span className="ml-auto font-mono text-[9px] text-foreground/30">
            [[page-id|label]] links · Esc to cancel
          </span>
        </span>
      </span>
    );
  }

  const Tag = as;

  return (
    <Tag
      role="button"
      tabIndex={0}
      onClick={() => setEditing(true)}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter") setEditing(true);
      }}
      title="Click to edit this fact"
      className={`group -mx-1 cursor-text rounded-lg px-1 transition-colors hover:bg-accent/[0.06] ${className}`}
    >
      {parseInline(value).map((part, i) =>
        part.link && onNavigate ? (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(part.link!);
            }}
            className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
          >
            {part.text}
          </button>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
      <Pencil className="ml-1 inline size-2.5 align-baseline text-accent/0 transition-colors group-hover:text-accent/60" />
    </Tag>
  );
}
