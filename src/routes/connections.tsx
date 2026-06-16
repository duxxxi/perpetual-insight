import { createFileRoute } from "@tanstack/react-router";
import { Plug, Check, Plus, Sparkles, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/app-shell";

export const Route = createFileRoute("/connections")({
  head: () => ({
    meta: [
      { title: "Connections — Perpetuity" },
      { name: "description", content: "The systems Perpetuity reads and writes for you." },
      { property: "og:title", content: "Connections — Perpetuity" },
      { property: "og:description", content: "The systems Perpetuity reads and writes for you." },
    ],
  }),
  component: ConnectionsPage,
});

type Conn = {
  id: string;
  name: string;
  category: "Communication" | "Finance" | "Logistics" | "Productivity" | "Markets";
  status: "Connected" | "Reauth" | "Not connected";
  detail: string;
  letter: string;
};

const conns: Conn[] = [
  { id: "gmail", name: "Gmail", category: "Communication", status: "Connected", detail: "alex@perpetuity.works · 14 labels synced", letter: "G" },
  { id: "outlook", name: "Outlook", category: "Communication", status: "Not connected", detail: "Connect to unify inboxes", letter: "O" },
  { id: "whatsapp", name: "WhatsApp Business", category: "Communication", status: "Connected", detail: "+421 905 · 9 active threads", letter: "W" },
  { id: "linkedin", name: "LinkedIn", category: "Communication", status: "Reauth", detail: "Token expires in 3 days", letter: "in" },
  { id: "telegram", name: "Telegram", category: "Communication", status: "Connected", detail: "@perpetuity_ops · 4 chats", letter: "T" },
  { id: "stripe", name: "Stripe", category: "Finance", status: "Connected", detail: "Live mode · 2 webhooks", letter: "S" },
  { id: "bybit", name: "Bybit", category: "Finance", status: "Connected", detail: "Read-only · withdrawals 2FA", letter: "B" },
  { id: "wise", name: "Wise Business", category: "Finance", status: "Not connected", detail: "Unify multi-currency balances", letter: "W" },
  { id: "klaipeda", name: "Klaipeda Port API", category: "Logistics", status: "Connected", detail: "Berth + discharge feed", letter: "K" },
  { id: "marinetraffic", name: "MarineTraffic", category: "Logistics", status: "Connected", detail: "12 vessels watched", letter: "M" },
  { id: "gcal", name: "Google Calendar", category: "Productivity", status: "Connected", detail: "Primary + Travel", letter: "G" },
  { id: "notion", name: "Notion", category: "Productivity", status: "Not connected", detail: "Sync briefs to your workspace", letter: "N" },
  { id: "bloomberg", name: "Bloomberg Terminal", category: "Markets", status: "Reauth", detail: "B-Pipe token expiring", letter: "B" },
  { id: "tradingeconomics", name: "Trading Economics", category: "Markets", status: "Connected", detail: "Macro calendar synced", letter: "TE" },
];

const statusTone = {
  Connected: "text-emerald-700/85 bg-emerald-500/10 ring-emerald-500/15 dark:text-emerald-300",
  Reauth: "text-amber-700/85 bg-amber-500/10 ring-amber-500/15 dark:text-amber-300",
  "Not connected": "text-foreground/55 bg-foreground/5 ring-foreground/10",
} as const;

const categories = ["Communication", "Finance", "Logistics", "Productivity", "Markets"] as const;

function ConnectionsPage() {
  return (
    <PageShell
      active="connections"
      eyebrow={`${conns.filter((c) => c.status === "Connected").length} connected · 2 need reauth`}
      title="Perpetuity reads and writes for you"
      accentWord="Systems"
      rightSlot={
        <button className="glass-panel-strong inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-medium">
          <Plus className="size-3.5" strokeWidth={2} /> Add integration
        </button>
      }
    >
      {/* Health strip */}
      <div className="glass-panel-strong relative mb-6 overflow-hidden rounded-3xl p-5">
        <div className="ai-iridescent absolute inset-x-5 top-0 h-px opacity-60" aria-hidden />
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <div className="flex items-center gap-3">
            <div className="ai-iridescent flex size-8 items-center justify-center rounded-full ring-1 ring-foreground/5">
              <Sparkles className="size-4 text-foreground/80" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">Coverage health</p>
              <p className="text-[14px] text-foreground/85">Strong across communication and logistics. Two finance gaps reduce treasury automation by ~30%.</p>
            </div>
          </div>
          <button className="ml-auto rounded-full bg-foreground px-3.5 py-1.5 text-[11px] font-medium text-background">
            Connect Wise + Outlook
          </button>
        </div>
      </div>

      {/* Grouped grid */}
      <div className="space-y-6">
        {categories.map((cat) => {
          const items = conns.filter((c) => c.category === cat);
          return (
            <section key={cat}>
              <div className="mb-3 flex items-center gap-2 px-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45">{cat}</p>
                <span className="text-[10px] font-mono text-foreground/35">{items.filter((i) => i.status === "Connected").length}/{items.length}</span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((c) => (
                  <article key={c.id} className="glass-panel-strong group rounded-2xl p-4 transition-all hover:translate-y-[-1px]">
                    <div className="flex items-start gap-3">
                      <div className="glass-panel flex size-11 shrink-0 items-center justify-center rounded-xl font-serif text-base italic text-foreground/85">
                        {c.letter}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-medium text-foreground/90">{c.name}</p>
                        <p className="mt-0.5 truncate text-[11px] text-foreground/55">{c.detail}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] ring-1 ${statusTone[c.status]}`}>
                        {c.status === "Connected" && <Check className="size-2.5" strokeWidth={2.5} />}
                        {c.status}
                      </span>
                      <button className="inline-flex items-center gap-1 text-[11px] text-foreground/55 transition-colors hover:text-foreground">
                        {c.status === "Connected" ? "Manage" : c.status === "Reauth" ? "Reauthorize" : "Connect"}
                        <ArrowUpRight className="size-3" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </PageShell>
  );
}
