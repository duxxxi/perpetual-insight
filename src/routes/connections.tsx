import { createFileRoute } from "@tanstack/react-router";
import { Check, Plus, Sparkles, ArrowUpRight, Search, Mail } from "lucide-react";
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

type Status = "Connected" | "Reauth" | "Not connected" | "Soon";
type Category = "Workspace" | "Communication" | "CRM & Sales" | "Finance" | "Productivity";

type Conn = {
  id: string;
  name: string;
  category: Category;
  status: Status;
  detail: string;
  /** simpleicons slug, or "__email" for the generic mail icon */
  logo: string;
  /** Brand tint as HSL components, used for halo + chip */
  brand: string;
};

const conns: Conn[] = [
  // Workspace
  { id: "google", name: "Google Workspace", category: "Workspace", status: "Connected", detail: "Gmail · Calendar · Drive · Contacts", logo: "google", brand: "4 80% 58%" },
  { id: "microsoft", name: "Microsoft 365", category: "Workspace", status: "Not connected", detail: "Outlook · Teams · OneDrive · Calendar", logo: "microsoft", brand: "212 90% 52%" },
  { id: "outlook", name: "Outlook", category: "Workspace", status: "Not connected", detail: "Unify a second inbox", logo: "microsoftoutlook", brand: "212 90% 52%" },

  // Communication
  { id: "telegram", name: "Telegram", category: "Communication", status: "Connected", detail: "@perpetuity_ops · 4 chats", logo: "telegram", brand: "200 85% 55%" },
  { id: "whatsapp", name: "WhatsApp", category: "Communication", status: "Soon", detail: "Outbound messages + document capture", logo: "whatsapp", brand: "142 70% 42%" },
  { id: "slack", name: "Slack", category: "Communication", status: "Soon", detail: "Briefings and agent updates to a channel", logo: "slack", brand: "320 70% 55%" },
  { id: "email", name: "Email digest", category: "Communication", status: "Connected", detail: "Daily intelligence briefing to your inbox", logo: "__email", brand: "25 60% 50%" },

  // CRM & Sales
  { id: "hubspot", name: "HubSpot", category: "CRM & Sales", status: "Not connected", detail: "CRM contacts, deals and pipeline", logo: "hubspot", brand: "16 90% 55%" },
  { id: "salesforce", name: "Salesforce", category: "CRM & Sales", status: "Soon", detail: "Enterprise CRM contacts and opportunities", logo: "salesforce", brand: "205 95% 45%" },
  { id: "pipedrive", name: "Pipedrive", category: "CRM & Sales", status: "Soon", detail: "Search and update leads", logo: "pipedrive", brand: "0 0% 12%" },
  { id: "calendly", name: "Calendly", category: "CRM & Sales", status: "Soon", detail: "Sync confirmed meetings and bookings", logo: "calendly", brand: "220 85% 55%" },

  // Finance
  { id: "xero", name: "Xero", category: "Finance", status: "Soon", detail: "Invoices, contacts and accounting", logo: "xero", brand: "195 85% 45%" },
  { id: "stripe", name: "Stripe", category: "Finance", status: "Connected", detail: "Live · 2 webhooks", logo: "stripe", brand: "260 70% 60%" },

  // Productivity
  { id: "notion", name: "Notion", category: "Productivity", status: "Soon", detail: "Sync briefs to your workspace", logo: "notion", brand: "0 0% 12%" },
];

const statusTone: Record<Status, string> = {
  Connected: "text-emerald-700 bg-emerald-500/10 ring-emerald-500/20 dark:text-emerald-300",
  Reauth: "text-amber-700 bg-amber-500/10 ring-amber-500/20 dark:text-amber-300",
  "Not connected": "text-foreground/55 bg-foreground/[0.04] ring-foreground/10",
  Soon: "text-foreground/40 bg-foreground/[0.03] ring-foreground/10",
};

const statusLabel: Record<Status, string> = {
  Connected: "On",
  Reauth: "Reauth",
  "Not connected": "Off",
  Soon: "Soon",
};

const categories: Category[] = ["Workspace", "Communication", "CRM & Sales", "Finance", "Productivity"];

function BrandLogo({ slug, name }: { slug: string; name: string }) {
  if (slug === "__email") {
    return <Mail className="size-3.5" strokeWidth={1.75} />;
  }
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt={`${name} logo`}
      loading="lazy"
      className="size-3.5 object-contain"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

function ConnectionsPage() {
  const connectedCount = conns.filter((c) => c.status === "Connected").length;
  const reauthCount = conns.filter((c) => c.status === "Reauth").length;

  return (
    <PageShell
      active="connections"
      eyebrow={`${connectedCount} connected${reauthCount ? ` · ${reauthCount} need reauth` : ""}`}
      title="that Perpetuity reads and writes for you"
      accentWord="Systems"
      rightSlot={
        <div className="flex items-center gap-2">
          <div className="glass-panel-strong hidden items-center gap-2 rounded-full px-3 py-1.5 text-[12px] md:flex">
            <Search className="size-3.5 text-foreground/40" strokeWidth={1.75} />
            <input
              placeholder="Search integrations"
              className="w-44 bg-transparent text-foreground placeholder:text-foreground/40 focus:outline-none"
            />
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-[12px] font-medium text-background transition-transform hover:scale-[1.02]">
            <Plus className="size-3.5" strokeWidth={2.25} /> Request integration
          </button>
        </div>
      }
    >
      {/* Health strip */}
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
                Strong on Google + Telegram. Connect HubSpot and Outlook to unlock pipeline and second-inbox triage.
              </p>
            </div>
          </div>
          <button className="ml-auto rounded-full bg-foreground px-3.5 py-1.5 text-[11px] font-medium text-background">
            Connect HubSpot
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

      {/* Grouped grid — compact pills */}
      <div className="space-y-5">
        {categories.map((cat) => {
          const items = conns.filter((c) => c.category === cat);
          if (!items.length) return null;
          const liveCount = items.filter((i) => i.status === "Connected").length;
          return (
            <section key={cat}>
              <div className="mb-2 flex items-center gap-2 px-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
                  {cat}
                </p>
                <span className="font-mono text-[10px] text-foreground/35">
                  {liveCount}/{items.length}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {items.map((c) => {
                  const isSoon = c.status === "Soon";
                  return (
                    <article
                      key={c.id}
                      className={`glass-panel group relative overflow-hidden rounded-xl px-2.5 py-2 transition-all ${
                        isSoon
                          ? "opacity-55"
                          : "hover:-translate-y-[1px] hover:shadow-[0_8px_28px_-12px_rgba(0,0,0,0.18)]"
                      }`}
                    >
                      {/* brand halo on hover */}
                      {!isSoon && (
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                          style={{
                            background: `radial-gradient(140px 70px at 0% 0%, hsl(${c.brand} / 0.18), transparent 70%)`,
                          }}
                        />
                      )}
                      <div className="relative flex items-center gap-2.5">
                        <div
                          className="flex size-7 shrink-0 items-center justify-center rounded-lg ring-1 ring-foreground/5"
                          style={{
                            background: `linear-gradient(135deg, hsl(${c.brand} / 0.18), hsl(${c.brand} / 0.04))`,
                            boxShadow: `inset 0 1px 0 hsl(${c.brand} / 0.2)`,
                            color: `hsl(${c.brand})`,
                          }}
                        >
                          <BrandLogo slug={c.logo} name={c.name} />
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
                              {statusLabel[c.status]}
                            </span>
                          </div>
                          <div className="mt-0.5 flex items-center justify-between gap-2">
                            <p className="truncate text-[10.5px] text-foreground/50">{c.detail}</p>
                            {!isSoon && (
                              <button className="inline-flex shrink-0 items-center gap-0.5 text-[10px] text-foreground/45 opacity-0 transition-opacity group-hover:opacity-100">
                                {c.status === "Connected"
                                  ? "Manage"
                                  : c.status === "Reauth"
                                    ? "Fix"
                                    : "Connect"}
                                <ArrowUpRight className="size-2.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
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
