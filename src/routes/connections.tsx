import { createFileRoute } from "@tanstack/react-router";
import { Check, Plus, Sparkles, ArrowUpRight, Search } from "lucide-react";
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
  /** Brand tint in HSL components, e.g. "4 90% 58%" */
  brand: string;
};

const conns: Conn[] = [
  { id: "gmail", name: "Gmail", category: "Communication", status: "Connected", detail: "alex@perpetuity.works · 14 labels", letter: "G", brand: "4 90% 58%" },
  { id: "outlook", name: "Outlook", category: "Communication", status: "Not connected", detail: "Unify inboxes", letter: "O", brand: "212 90% 52%" },
  { id: "whatsapp", name: "WhatsApp", category: "Communication", status: "Connected", detail: "+421 905 · 9 threads", letter: "W", brand: "142 70% 42%" },
  { id: "linkedin", name: "LinkedIn", category: "Communication", status: "Reauth", detail: "Token expires in 3 days", letter: "in", brand: "201 100% 35%" },
  { id: "telegram", name: "Telegram", category: "Communication", status: "Connected", detail: "@perpetuity_ops · 4 chats", letter: "T", brand: "200 85% 55%" },
  { id: "stripe", name: "Stripe", category: "Finance", status: "Connected", detail: "Live · 2 webhooks", letter: "S", brand: "260 70% 60%" },
  { id: "bybit", name: "Bybit", category: "Finance", status: "Connected", detail: "Read-only · 2FA", letter: "B", brand: "42 95% 55%" },
  { id: "wise", name: "Wise", category: "Finance", status: "Not connected", detail: "Multi-currency balances", letter: "W", brand: "82 70% 50%" },
  { id: "klaipeda", name: "Klaipeda Port", category: "Logistics", status: "Connected", detail: "Berth + discharge", letter: "K", brand: "190 70% 45%" },
  { id: "marinetraffic", name: "MarineTraffic", category: "Logistics", status: "Connected", detail: "12 vessels watched", letter: "M", brand: "215 65% 50%" },
  { id: "gcal", name: "Google Calendar", category: "Productivity", status: "Connected", detail: "Primary + Travel", letter: "G", brand: "212 90% 52%" },
  { id: "notion", name: "Notion", category: "Productivity", status: "Not connected", detail: "Sync briefs to workspace", letter: "N", brand: "0 0% 20%" },
  { id: "bloomberg", name: "Bloomberg", category: "Markets", status: "Reauth", detail: "B-Pipe token expiring", letter: "B", brand: "18 95% 55%" },
  { id: "tradingeconomics", name: "Trading Economics", category: "Markets", status: "Connected", detail: "Macro calendar synced", letter: "TE", brand: "150 60% 42%" },
];

const statusTone = {
  Connected: "text-emerald-700 bg-emerald-500/10 ring-emerald-500/20 dark:text-emerald-300",
  Reauth: "text-amber-700 bg-amber-500/10 ring-amber-500/20 dark:text-amber-300",
  "Not connected": "text-foreground/50 bg-foreground/[0.04] ring-foreground/10",
} as const;

const categories = ["Communication", "Finance", "Logistics", "Productivity", "Markets"] as const;

function ConnectionsPage() {
  const connectedCount = conns.filter((c) => c.status === "Connected").length;
  return (
    <PageShell
      active="connections"
      eyebrow={`${connectedCount} connected · 2 need reauth`}
      title="that Perpetuity reads and writes for you"
      accentWord="Systems"
      rightSlot={
        <div className="flex items-center gap-2">
          <div className="glass-panel-strong hidden items-center gap-2 rounded-full px-3 py-1.5 text-[12px] md:flex">
            <Search className="size-3.5 text-foreground/40" strokeWidth={1.75} />
            <input
              placeholder="Search integrations"
              className="w-48 bg-transparent text-foreground placeholder:text-foreground/40 focus:outline-none"
            />
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-[12px] font-medium text-background transition-transform hover:scale-[1.02]">
            <Plus className="size-3.5" strokeWidth={2.25} /> Add MCP server
          </button>
        </div>
      }
    >
      {/* Health strip with iridescent accent */}
      <div className="glass-panel-strong relative mb-6 overflow-hidden rounded-3xl p-4">
        <div className="ai-iridescent absolute inset-x-4 top-0 h-px opacity-70" aria-hidden />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-3">
            <div className="ai-iridescent flex size-9 items-center justify-center rounded-full ring-1 ring-foreground/5">
              <Sparkles className="size-4 text-foreground/85" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
                Coverage health
              </p>
              <p className="text-[13px] text-foreground/85">
                Strong across comms and logistics. Two finance gaps reduce treasury automation by ~30%.
              </p>
            </div>
          </div>
          <button className="ml-auto rounded-full bg-foreground px-3.5 py-1.5 text-[11px] font-medium text-background">
            Connect Wise + Outlook
          </button>
        </div>
      </div>

      {/* Segmented filter */}
      <div className="mb-5 flex flex-wrap items-center gap-1.5">
        {(["All", ...categories] as const).map((c, i) => (
          <button
            key={c}
            className={`rounded-full px-3 py-1 text-[11px] font-medium ring-1 transition-colors ${
              i === 0
                ? "bg-foreground text-background ring-foreground"
                : "bg-foreground/[0.03] text-foreground/65 ring-foreground/10 hover:bg-foreground/[0.06]"
            }`}
          >
            {c}
            <span className="ml-1.5 text-[10px] opacity-60">
              {c === "All" ? conns.length : conns.filter((x) => x.category === c).length}
            </span>
          </button>
        ))}
      </div>

      {/* Grouped tight grid */}
      <div className="space-y-5">
        {categories.map((cat) => {
          const items = conns.filter((c) => c.category === cat);
          return (
            <section key={cat}>
              <div className="mb-2 flex items-center gap-2 px-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
                  {cat}
                </p>
                <span className="font-mono text-[10px] text-foreground/35">
                  {items.filter((i) => i.status === "Connected").length}/{items.length}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((c) => (
                  <article
                    key={c.id}
                    className="glass-panel group relative overflow-hidden rounded-2xl px-3 py-2.5 transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_28px_-12px_rgba(0,0,0,0.18)]"
                    style={{
                      // subtle brand tint glow on hover via box-shadow inset
                      ["--brand" as never]: `hsl(${c.brand})`,
                    }}
                  >
                    {/* brand glow */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(120px 60px at 0% 0%, hsl(${c.brand} / 0.18), transparent 70%)`,
                      }}
                    />
                    <div className="relative flex items-center gap-2.5">
                      <div
                        className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-semibold ring-1"
                        style={{
                          background: `linear-gradient(135deg, hsl(${c.brand} / 0.22), hsl(${c.brand} / 0.08))`,
                          color: `hsl(${c.brand})`,
                          boxShadow: `inset 0 1px 0 hsl(${c.brand} / 0.25)`,
                          // @ts-expect-error css var
                          "--tw-ring-color": `hsl(${c.brand} / 0.18)`,
                        }}
                      >
                        {c.letter}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-[12.5px] font-medium text-foreground/90">
                            {c.name}
                          </p>
                          <span
                            className={`inline-flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.1em] ring-1 ${statusTone[c.status]}`}
                          >
                            {c.status === "Connected" && (
                              <Check className="size-2.5" strokeWidth={3} />
                            )}
                            {c.status === "Connected"
                              ? "On"
                              : c.status === "Reauth"
                                ? "Reauth"
                                : "Off"}
                          </span>
                        </div>
                        <div className="mt-0.5 flex items-center justify-between gap-2">
                          <p className="truncate text-[10.5px] text-foreground/50">{c.detail}</p>
                          <button className="inline-flex shrink-0 items-center gap-0.5 text-[10px] text-foreground/45 opacity-0 transition-opacity group-hover:opacity-100">
                            {c.status === "Connected"
                              ? "Manage"
                              : c.status === "Reauth"
                                ? "Fix"
                                : "Connect"}
                            <ArrowUpRight className="size-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Request an integration */}
      <section className="mt-8">
        <div className="glass-panel-strong rounded-3xl p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
            Request an integration
          </p>
          <p className="mt-1 text-[13px] text-foreground/70">
            Tell us what to wire into Perpetuity next.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <input
              placeholder="e.g. Ramp, Anthropic, Refinitiv…"
              className="flex-1 rounded-full bg-foreground/[0.04] px-4 py-2 text-[13px] text-foreground placeholder:text-foreground/40 ring-1 ring-foreground/10 focus:outline-none focus:ring-foreground/20"
            />
            <button className="rounded-full bg-foreground px-4 py-2 text-[12px] font-medium text-background">
              Submit
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
