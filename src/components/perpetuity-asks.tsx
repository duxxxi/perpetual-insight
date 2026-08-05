import { useState } from "react";
import { Brain, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { contextStore, useContextAsks, type ContextAsk } from "@/lib/context-store";

/** Shared dialog body. */
function AsksDialogBody({ asks }: { asks: ContextAsk[] }) {
  return (
    <DialogContent className="glass-panel-strong max-w-lg rounded-3xl border-foreground/10 bg-background/85 p-0 backdrop-blur-2xl">
      <DialogHeader className="flex-row items-center gap-3 space-y-0 border-b border-foreground/5 px-5 py-4 text-left">
        <span className="flex size-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white ring-1 ring-white/20">
          <Brain className="size-4" strokeWidth={2.5} />
        </span>
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/45">
            Fills your context
          </p>
          <DialogTitle className="font-sans text-xl font-semibold">Perpetuity asks</DialogTitle>
        </div>
        <Link
          to="/context"
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
        >
          Context
          <ArrowUpRight className="size-3" />
        </Link>
      </DialogHeader>
      <div className="max-h-[60vh] space-y-2 overflow-y-auto p-3">
        {asks.length === 0 ? (
          <p className="px-2 py-6 text-center text-sm text-foreground/50">
            Nothing open. Perpetuity has what it needs for now.
          </p>
        ) : (
          asks.map((a) => <AskCard key={a.id} ask={a} />)
        )}
      </div>
    </DialogContent>
  );
}

/** Small neon-green pill — only appears when Perpetuity actually needs something. */
export function PerpetuityAsksCard() {
  const asks = useContextAsks();
  const open = asks.filter((a) => !a.answer);
  const next = open[0];
  if (!next) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          data-pill
          className="group relative mb-3 inline-flex max-w-full items-center gap-2 rounded-full text-left"
        >
          <span className="asks-glow absolute -inset-1 rounded-full" aria-hidden />
          <span className="asks-breathe glass-panel relative inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5 ring-1 ring-emerald-400/40 transition-transform duration-200 hover:scale-[1.02]">
            <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white ring-1 ring-white/25">
              <Brain className="size-[11px]" strokeWidth={2.5} />
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
              Perpetuity asks
            </span>
            <span className="max-w-[22rem] truncate text-[11px] text-foreground/70">{next.question}</span>
            <Sparkles className="size-3 shrink-0 text-foreground/40" strokeWidth={2} />
          </span>
        </button>
      </DialogTrigger>
      <AsksDialogBody asks={asks} />
    </Dialog>
  );
}


/** Pill that surfaces the questions Perpetuity needs answered to fill context. */
export function PerpetuityAsksPill() {
  const asks = useContextAsks();
  const open = asks.filter((a) => !a.answer);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          data-pill
          className="glass-panel group relative inline-flex h-7 items-center gap-1.5 rounded-full pl-0.5 pr-2.5 text-left transition-colors hover:bg-[var(--glass-surface-strong)]"
        >
          <span className="ai-iridescent absolute -inset-px rounded-full opacity-50 blur-[2px] transition-opacity group-hover:opacity-80" aria-hidden />
          <span className="relative flex size-[22px] items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_6px_-2px_rgba(0,0,0,0.25)] ring-1 ring-white/20">
            <Brain className="size-3" strokeWidth={2.5} />
          </span>
          <span className="relative font-mono text-[12px] font-semibold tabular-nums">{open.length}</span>
          <span className="relative text-[12px] text-foreground/70">Perpetuity asks</span>
        </button>
      </DialogTrigger>
      <DialogContent className="glass-panel-strong max-w-lg rounded-3xl border-foreground/10 bg-background/85 p-0 backdrop-blur-2xl">
        <DialogHeader className="flex-row items-center gap-3 space-y-0 border-b border-foreground/5 px-5 py-4 text-left">
          <span className="flex size-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white ring-1 ring-white/20">
            <Brain className="size-4" strokeWidth={2.5} />
          </span>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/45">
              Fills your context
            </p>
            <DialogTitle className="font-sans text-xl font-semibold">Perpetuity asks</DialogTitle>
          </div>
          <Link
            to="/context"
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
          >
            Context
            <ArrowUpRight className="size-3" />
          </Link>
        </DialogHeader>
        <div className="max-h-[60vh] space-y-2 overflow-y-auto p-3">
          {asks.length === 0 ? (
            <p className="px-2 py-6 text-center text-sm text-foreground/50">
              Nothing open. Perpetuity has what it needs for now.
            </p>
          ) : (
            asks.map((a) => <AskCard key={a.id} ask={a} />)
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function AskCard({ ask }: { ask: ContextAsk }) {
  const [value, setValue] = useState(ask.answer ?? "");
  const answered = Boolean(ask.answer);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) contextStore.answer(ask.id, value.trim());
      }}
      className="glass-panel rounded-2xl px-3.5 py-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium leading-snug">{ask.question}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-foreground/45">{ask.why}</p>
        </div>
        {answered && (
          <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <Check className="size-3" strokeWidth={3} />
          </span>
        )}
      </div>
      <div className="mt-2.5 flex items-center gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={ask.placeholder}
          className="glass-chip h-7 flex-1 rounded-full bg-transparent px-3 text-[12px] text-foreground placeholder:text-foreground/30 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="inline-flex h-7 shrink-0 items-center rounded-full bg-accent px-3 text-[11px] font-medium text-accent-foreground transition-opacity disabled:opacity-40"
        >
          {answered ? "Update" : "Save"}
        </button>
        <button
          type="button"
          onClick={() => contextStore.skip(ask.id)}
          className="shrink-0 rounded-full px-2 text-[11px] text-foreground/45 hover:text-foreground"
        >
          Skip
        </button>
      </div>
    </form>
  );
}
