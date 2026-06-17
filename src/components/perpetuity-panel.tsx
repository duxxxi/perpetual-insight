import { useCallback, useState } from "react";
import {
  Sparkles,
  Mail,
  FileText,
  MessageSquare,
  Calendar,
  Building2,
  Users,
  Database,
  ArrowUpRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

export type Artifact = {
  kind: "email" | "doc" | "thread" | "event" | "crm" | "people" | "data";
  label: string;
};

export type PanelAction = {
  label: string;
  primary?: boolean;
  onClick?: () => void;
  /** default true — closes the panel after running onClick */
  closeOnAction?: boolean;
};

export type PanelDetail = {
  title: string;
  eyebrow?: string;
  source?: string;
  why?: string;
  steps?: string[];
  artifacts?: Artifact[];
  body?: string;
  actions?: PanelAction[];
};

export function usePerpetuityPanel() {
  const [detail, setDetail] = useState<PanelDetail | null>(null);
  const open = useCallback((d: PanelDetail) => setDetail(d), []);
  const close = useCallback(() => setDetail(null), []);

  const panel = (
    <Dialog open={!!detail} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-w-xl gap-0 border-foreground/10 bg-background/90 p-0 backdrop-blur-2xl sm:rounded-2xl">
        <DialogTitle className="sr-only">{detail?.title ?? "Perpetuity"}</DialogTitle>
        {detail && (
          <div className="relative overflow-hidden rounded-2xl">
            <div className="ai-iridescent absolute inset-x-0 top-0 h-px opacity-70" aria-hidden />
            <div className="flex items-start gap-3 px-5 pt-5">
              <div className="ai-iridescent flex size-8 shrink-0 items-center justify-center rounded-full ring-1 ring-foreground/5">
                <Sparkles className="size-4 text-foreground/80" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
                  {detail.eyebrow ?? "Perpetuity · brief"}
                </p>
                <h3 className="mt-1 font-sans text-[19px] font-semibold leading-snug text-foreground">
                  {detail.title}
                </h3>
              </div>
            </div>

            <div className="space-y-3 px-5 py-4">
              {detail.source && (
                <Field label="Source" value={detail.source} mono />
              )}
              {detail.why && <Field label="Why this matters" value={detail.why} large />}
              {detail.body && <Field label="Context" value={detail.body} />}
              {detail.steps && detail.steps.length > 0 && (
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
                    Next steps
                  </p>
                  <ol className="mt-1.5 space-y-1">
                    {detail.steps.map((s, i) => (
                      <li key={i} className="flex gap-2 text-[12.5px] text-foreground/80">
                        <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-foreground/5 font-mono text-[9px] text-foreground/55">
                          {i + 1}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {detail.artifacts && detail.artifacts.length > 0 && (
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
                    Pulled from your stack
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {detail.artifacts.map((a, i) => {
                      const Icon = artifactIcon[a.kind];
                      return (
                        <li key={i}>
                          <button
                            type="button"
                            className="group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[12px] text-foreground/75 hover:bg-foreground/5"
                          >
                            <Icon className="size-3 text-foreground/50" strokeWidth={1.75} />
                            <span className="flex-1 truncate">{a.label}</span>
                            <ArrowUpRight className="size-3 text-foreground/30 transition-colors group-hover:text-foreground/70" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 border-t border-foreground/5 bg-foreground/[0.02] px-5 py-3">
              {(detail.actions && detail.actions.length > 0
                ? detail.actions
                : [{ label: "Got it", primary: true }]
              ).map((a, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    a.onClick?.();
                    if (a.closeOnAction !== false) close();
                  }}
                  className={
                    a.primary
                      ? "rounded-full bg-foreground px-3 py-1.5 text-[11px] font-medium text-background hover:opacity-90"
                      : "rounded-full bg-foreground/5 px-3 py-1.5 text-[11px] font-medium text-foreground/70 hover:bg-foreground/10"
                  }
                >
                  {a.label}
                </button>
              ))}
              <button
                type="button"
                onClick={close}
                className="ml-auto rounded-full bg-foreground/5 px-3 py-1.5 text-[11px] font-medium text-foreground/55 hover:bg-foreground/10"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  return { open, close, panel };
}

const artifactIcon = {
  email: Mail,
  doc: FileText,
  thread: MessageSquare,
  event: Calendar,
  crm: Building2,
  people: Users,
  data: Database,
} as const;

function Field({ label, value, large, mono }: { label: string; value: string; large?: boolean; mono?: boolean }) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground/40">{label}</p>
      <p
        className={`mt-1 leading-relaxed text-foreground/80 ${
          large ? "text-[12.5px]" : "text-[12px]"
        } ${mono ? "font-mono text-foreground/70" : ""} whitespace-pre-line`}
      >
        {value}
      </p>
    </div>
  );
}
