import { createFileRoute } from "@tanstack/react-router";
import { Brain, HelpCircle } from "lucide-react";
import { PageShell } from "@/components/app-shell";
import { AskCard } from "@/components/perpetuity-asks";
import { contextStore, useContextAsks } from "@/lib/context-store";

export const Route = createFileRoute("/context")({
  head: () => ({
    meta: [
      { title: "Context — What Perpetuity Knows About Your Business" },
      {
        name: "description",
        content:
          "The living memory behind your agents: markets, products, commercial terms and the open questions Perpetuity needs answered.",
      },
      { property: "og:title", content: "Context — What Perpetuity Knows" },
      {
        property: "og:description",
        content: "Company facts, markets, terms and open questions that shape every Perpetuity action.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContextPage,
});

function ContextPage() {
  const asks = useContextAsks();
  const open = asks.filter((a) => !a.answer);
  const facts = contextStore.facts();
  const groups = [...new Set(facts.map((f) => f.group))];
  const coverage = Math.round(((asks.length - open.length + facts.length) / (asks.length + facts.length)) * 100);

  return (
    <PageShell
      active="context"
      eyebrow="Memory · shared by every agent"
      title="Context"
      accentWord="Context"
      rightSlot={
        <div className="glass-panel inline-flex items-center gap-2 rounded-full px-3 py-1.5">
          <Brain className="size-3.5 text-accent" />
          <span className="font-mono text-[11px] font-semibold tabular-nums">{coverage}%</span>
          <span className="text-[11px] text-foreground/55">context coverage</span>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <p className="mb-3 px-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/40">
            What Perpetuity knows
          </p>
          <div className="space-y-4">
            {groups.map((g) => (
              <div key={g} className="glass-panel rounded-2xl p-1.5">
                <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                  {g}
                </p>
                {facts
                  .filter((f) => f.group === g)
                  .map((f) => (
                    <div
                      key={f.id}
                      data-pill
                      className="flex cursor-pointer items-start justify-between gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-foreground/[0.04]"
                    >
                      <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/40">{f.label}</p>
                        <p className="mt-0.5 text-sm leading-snug">{f.value}</p>
                      </div>
                      <span className="mt-1 shrink-0 rounded-full px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-foreground/40 ring-1 ring-foreground/10">
                        {f.source}
                      </span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </section>

        <aside className="lg:col-span-5">
          <div className="mb-3 flex items-center gap-2 px-1">
            <HelpCircle className="size-3.5 text-accent" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/40">
              Perpetuity asks · {open.length} open
            </p>
          </div>
          <div className="space-y-2">
            {asks.length === 0 ? (
              <p className="glass-panel rounded-2xl px-4 py-6 text-center text-sm text-foreground/50">
                Nothing open. Perpetuity has what it needs for now.
              </p>
            ) : (
              asks.map((a) => <AskCard key={a.id} ask={a} />)
            )}
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
