import { createFileRoute } from "@tanstack/react-router";
import { Check, Plus, Search, Mail, Settings2 } from "lucide-react";
import { useState } from "react";
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

type Status = "Connected" | "Soon";
type Category = "Workspace" | "Communication" | "CRM & Sales" | "Finance" | "Productivity";

type Conn = {
  id: string;
  name: string;
  category: Category;
  status: Status;
  detail: string;
  /** clearbit domain, or "__email" for the generic mail icon */
  logo: string;
  /** Brand tint as HSL components, used for halo + chip */
  brand: string;
};

const conns: Conn[] = [
  // Workspace
  { id: "google", name: "Google Workspace", category: "Workspace", status: "Connected", detail: "Gmail · Calendar · Drive · Contacts", logo: "google.com", brand: "4 80% 58%" },
  { id: "microsoft", name: "Microsoft 365", category: "Workspace", status: "Soon", detail: "Outlook · Teams · OneDrive · Calendar", logo: "microsoft.com", brand: "212 90% 52%" },
  { id: "outlook", name: "Outlook", category: "Workspace", status: "Soon", detail: "Unify a second inbox", logo: "outlook.com", brand: "212 90% 52%" },

  // Communication
  { id: "telegram", name: "Telegram", category: "Communication", status: "Connected", detail: "@perpetuity_ops · 4 chats", logo: "telegram.org", brand: "200 85% 55%" },
  { id: "whatsapp", name: "WhatsApp", category: "Communication", status: "Soon", detail: "Outbound messages + document capture", logo: "whatsapp.com", brand: "142 70% 42%" },
  { id: "slack", name: "Slack", category: "Communication", status: "Soon", detail: "Briefings and agent updates to a channel", logo: "slack.com", brand: "320 70% 55%" },
  { id: "email", name: "Email digest", category: "Communication", status: "Connected", detail: "Daily intelligence briefing to your inbox", logo: "__email", brand: "25 60% 50%" },

  // CRM & Sales
  { id: "hubspot", name: "HubSpot", category: "CRM & Sales", status: "Soon", detail: "CRM contacts, deals and pipeline", logo: "hubspot.com", brand: "16 90% 55%" },
  { id: "salesforce", name: "Salesforce", category: "CRM & Sales", status: "Soon", detail: "Enterprise CRM contacts and opportunities", logo: "salesforce.com", brand: "205 95% 45%" },
  { id: "pipedrive", name: "Pipedrive", category: "CRM & Sales", status: "Soon", detail: "Search and update leads", logo: "pipedrive.com", brand: "0 0% 12%" },
  { id: "calendly", name: "Calendly", category: "CRM & Sales", status: "Soon", detail: "Sync confirmed meetings and bookings", logo: "calendly.com", brand: "220 85% 55%" },

  // Finance
  { id: "xero", name: "Xero", category: "Finance", status: "Soon", detail: "Invoices, contacts and accounting", logo: "xero.com", brand: "195 85% 45%" },
  { id: "stripe", name: "Stripe", category: "Finance", status: "Soon", detail: "Payments, invoices and webhooks", logo: "stripe.com", brand: "260 70% 60%" },

  // Productivity
  { id: "notion", name: "Notion", category: "Productivity", status: "Soon", detail: "Sync briefs to your workspace", logo: "notion.so", brand: "0 0% 12%" },
];

const statusTone: Record<Status, string> = {
  Connected: "text-emerald-700 bg-emerald-500/10 ring-emerald-500/20 dark:text-emerald-300",
  Soon: "text-foreground/45 bg-foreground/[0.04] ring-foreground/10",
};

const categories: Category[] = ["Workspace", "Communication", "CRM & Sales", "Finance", "Productivity"];

const iconMap: Record<string, string> = {
  "google.com": "google",
  "microsoft.com": "microsoft",
  "outlook.com": "microsoftoutlook",
  "telegram.org": "telegram",
  "whatsapp.com": "whatsapp",
  "slack.com": "slack",
  "hubspot.com": "hubspot",
  "salesforce.com": "salesforce",
  "pipedrive.com": "pipedrive",
  "calendly.com": "calendly",
  "xero.com": "xero",
  "stripe.com": "stripe",
  "notion.so": "notion",
};

function BrandLogo({ domain, name, brand }: { domain: string; name: string; brand: string }) {
  const [err, setErr] = useState(false);

  if (domain === "__email") {
    return <Mail className="size-[18px]" strokeWidth={1.75} />;
  }

  const iconMap: Record<string, string> = {
    "google.com": "google",
    "microsoft.com": "microsoft",
    "outlook.com": "microsoftoutlook",
    "telegram.org": "telegram",
    "whatsapp.com": "whatsapp",
    "slack.com": "slack",
    "hubspot.com": "hubspot",
    "salesforce.com": "salesforce",
    "pipedrive.com": "pipedrive",
    "calendly.com": "calendly",
    "xero.com": "xero",
    "stripe.com": "stripe",
    "notion.so": "notion",
  };

  const slug = iconMap[domain];
  if (!slug || err) {
    return (
      <span className="text-[11px] font-bold uppercase" style={{ color: `hsl(${brand})` }}>
        {name.charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt={`${name} logo`}
      loading="lazy"
      className="size-[18px] object-contain"
      onError={() => setErr(true)}
    />
  );
}

function ConnectionPill({ c, compact = false }: { c: Conn; compact?: boolean }) {
  const isSoon = c.status === "Soon";
  return (
    <article
      className={`glass-panel group relative overflow-hidden rounded-xl px-2.5 py-2 transition-all ${
        isSoon ? "opacity-60" : "hover:-translate-y-[1px] hover:shadow-[0_8px_28px_-12px_rgba(0,0,0,0.18)]"
      }`}
    >
      {!isSoon && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background: `radial-gradient(160px 80px at 0% 0%, hsl(${c.brand} / 0.18), transparent 70%)`,
          }}
        />
      )}
      <div className="relative flex items-center gap-2.5">
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background ring-1 ring-foreground/8"
          style={{
            boxShadow: `inset 0 1px 0 hsl(${c.brand} / 0.18)`,
          }}
        >
          <BrandLogo domain={c.logo} name={c.name} brand={c.brand} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[12.5px] font-medium text-foreground/90">{c.name}</p>
            <span
              className={`inline-flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.1em] ring-1 ${statusTone[c.status]}`}
            >
              {c.status === "Connected" && <Check className="size-2.5" strokeWidth={3} />}
              {c.status === "Connected" ? "On" : "Soon"}
            </span>
          </div>
          <div className="mt-0.5 flex items-center justify-between gap-2">
            <p className="truncate text-[10.5px] text-foreground/50">{c.detail}</p>
            {!isSoon && !compact && (
              <button data-pill className="inline-flex shrink-0 items-center gap-1 rounded-full bg-foreground/[0.05] px-2 py-0.5 text-[10px] font-medium text-foreground/70 ring-1 ring-foreground/10 transition-colors hover:bg-foreground/[0.08]">
                Disconnect
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ConnectionsPage() {
  const connected = conns.filter((c) => c.status === "Connected");
  const rest = conns.filter((c) => c.status !== "Connected");

  return (
    <PageShell
      active="connections"
      eyebrow={`${connected.length} connected · ${rest.length} available`}
      title=""
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
          <button data-pill className="inline-flex items-center gap-1 rounded-full bg-accent/[0.10] px-2.5 py-1.5 text-[11px] font-medium text-accent ring-1 ring-accent/25 transition-all hover:bg-accent/[0.16] hover:shadow-[0_0_14px_-3px_hsl(25_70%_55%/0.40)]">
            <Plus className="size-3" strokeWidth={2.5} /> Request
          </button>
        </div>
      }
    >
      {/* Connected — hero strip */}
      <section className="mb-6">
        <div className="mb-2 flex items-center gap-2 px-1">
          <span className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_hsl(142_70%_45%/0.6)]" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
            Connected
          </p>
          <span className="font-mono text-[10px] text-foreground/35">{connected.length}</span>
        </div>
        <div className="glass-panel-strong relative overflow-hidden rounded-2xl p-3">
          <div className="ai-iridescent absolute inset-x-3 top-0 h-px opacity-60" aria-hidden />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {connected.map((c) => {
              return (
                <div
                  key={c.id}
                  className="group relative flex items-center gap-2.5 rounded-xl bg-background/40 px-2.5 py-2 ring-1 ring-foreground/8 transition-all hover:bg-background/70"
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                    style={{
                      background: `radial-gradient(160px 80px at 0% 0%, hsl(${c.brand} / 0.16), transparent 70%)`,
                    }}
                  />
                  <div
                    className="relative flex size-8 shrink-0 items-center justify-center rounded-lg bg-background ring-1 ring-foreground/8"
                    style={{ boxShadow: `inset 0 1px 0 hsl(${c.brand} / 0.22)` }}
                  >
                    <BrandLogo domain={c.logo} name={c.name} brand={c.brand} />
                  </div>
                  <div className="relative min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-[12.5px] font-medium text-foreground/90">{c.name}</p>
                      <Check className="size-3 text-emerald-600 dark:text-emerald-400" strokeWidth={3} />
                    </div>
                    <p className="truncate text-[10.5px] text-foreground/50">{c.detail}</p>
                  </div>
                  <div className="relative flex shrink-0 items-center gap-1">
                    <button data-pill
                      title="Manage"
                      className="inline-flex size-7 items-center justify-center rounded-full text-foreground/55 transition-colors hover:bg-foreground/[0.06] hover:text-foreground/85"
                    >
                      <Settings2 className="size-3.5" strokeWidth={1.75} />
                    </button>
                    <button data-pill className="rounded-full bg-foreground/[0.05] px-2.5 py-1 text-[10px] font-medium text-foreground/70 ring-1 ring-foreground/10 transition-colors hover:bg-foreground/[0.08]">
                      Disconnect
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Segmented filter */}
      <div className="mb-4 flex flex-wrap items-center gap-1.5">
        {(["All", ...categories] as const).map((c, i) => (
          <button data-pill
            key={c}
            className={`rounded-full px-3 py-1 text-[11px] font-medium ring-1 transition-colors ${
              i === 0
                ? "bg-foreground text-background ring-foreground"
                : "bg-foreground/[0.03] text-foreground/65 ring-foreground/10 hover:bg-foreground/[0.06]"
            }`}
          >
            {c}
            <span className="ml-1.5 text-[10px] opacity-60">
              {c === "All" ? rest.length : rest.filter((x) => x.category === c).length}
            </span>
          </button>
        ))}
      </div>

      {/* Grouped grid — Soon */}
      <div className="space-y-5">
        {categories.map((cat) => {
          const items = rest.filter((c) => c.category === cat);
          if (!items.length) return null;
          return (
            <section key={cat}>
              <div className="mb-2 flex items-center gap-2 px-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
                  {cat}
                </p>
                <span className="font-mono text-[10px] text-foreground/35">{items.length}</span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {items.map((c) => (
                  <ConnectionPill key={c.id} c={c} />
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
            <button data-pill className="rounded-full bg-accent/[0.10] px-4 py-2 text-[12px] font-medium text-accent ring-1 ring-accent/25 transition-all hover:bg-accent/[0.16] hover:shadow-[0_0_14px_-3px_hsl(25_70%_55%/0.40)]">
              Submit
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
