import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { X, Sparkles } from "lucide-react";

type Detail = { title: string; body?: string };
type Ctx = { open: (d: Detail) => void };

const DetailCtx = createContext<Ctx | null>(null);

export function useDetail() {
  const ctx = useContext(DetailCtx);
  if (!ctx) return { open: () => {} } as Ctx;
  return ctx;
}

export function DetailProvider({ children }: { children: ReactNode }) {
  const [detail, setDetail] = useState<Detail | null>(null);

  const open = useCallback((d: Detail) => setDetail(d), []);

  // Global delegation: any button with [data-pill] (or data-detail) opens the panel.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const btn = target.closest<HTMLElement>("button[data-pill], [data-detail]");
      if (!btn) return;
      if (e.defaultPrevented) return;
      const title =
        btn.getAttribute("data-detail-title") ||
        btn.getAttribute("data-pill") ||
        btn.textContent?.trim() ||
        "Details";
      const body =
        btn.getAttribute("data-detail-body") ||
        defaultBody(title);
      setDetail({ title, body });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Esc to close
  useEffect(() => {
    if (!detail) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setDetail(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [detail]);

  return (
    <DetailCtx.Provider value={{ open }}>
      {children}
      {detail && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <button
            aria-label="Close"
            onClick={() => setDetail(null)}
            className="absolute inset-0 bg-background/55 backdrop-blur-md"
          />
          <div className="glass-panel-strong relative w-full max-w-md overflow-hidden rounded-2xl p-5 shadow-2xl">
            <div className="ai-iridescent absolute inset-x-5 top-0 h-px opacity-60" aria-hidden />
            <div className="flex items-start gap-2.5">
              <div className="ai-iridescent flex size-7 shrink-0 items-center justify-center rounded-full ring-1 ring-foreground/5">
                <Sparkles className="size-3.5 text-foreground/80" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
                  Perpetuity
                </p>
                <h3 className="mt-1 text-[15px] font-medium text-foreground">{detail.title}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-foreground/70 whitespace-pre-line">
                  {detail.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setDetail(null);
                    }}
                    className="rounded-full bg-foreground px-3 py-1 text-[11px] font-medium text-background"
                  >
                    Got it
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setDetail(null);
                    }}
                    className="rounded-full bg-foreground/5 px-3 py-1 text-[11px] font-medium text-foreground/70"
                  >
                    Ask Perpetuity
                  </button>
                </div>
              </div>
              <button
                onClick={() => setDetail(null)}
                className="rounded-full p-1 text-foreground/45 hover:bg-foreground/5 hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </DetailCtx.Provider>
  );
}

function defaultBody(title: string) {
  const t = title.toLowerCase();
  if (t.includes("urgent")) return "Items flagged urgent by Perpetuity — incoming threads, blocked tasks, or counterparties awaiting a reply within 4 hours.";
  if (t.includes("approval")) return "Decisions waiting on you: counter-offers, contract redlines, and budget sign-offs surfaced from your threads.";
  if (t.includes("update")) return "Quiet status changes Perpetuity tracked since you last looked — shipments, market moves, counterparty news.";
  if (t.includes("suggestion")) return "Plays Perpetuity is recommending based on your week's activity. Open to review before acting.";
  if (t.includes("trip") || t.includes("bratislava") || t.includes("yerevan") || t.includes("vienna")) return "Travel context Perpetuity is preparing — agenda, attendees, prior threads, and dossiers for the trip.";
  if (t.includes("task")) return "Open tasks Perpetuity is tracking. Click into Assignments to triage in full.";
  if (t.includes("brief") || t.includes("prep")) return "Perpetuity is drafting a meeting brief from the relevant threads, documents, and market data. Ready shortly.";
  if (t.includes("research")) return "Perpetuity will pull recent filings, news, and counterparty signals on the attendees and assemble a one-pager.";
  if (t.includes("open")) return "Opens the full record in its native view.";
  return "Perpetuity will pull the relevant context and report back.";
}
