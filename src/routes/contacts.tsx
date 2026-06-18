import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Building2,
  Star,
  ArrowUpRight,
  ArrowLeft,
  Plus,
  FileText,
  Briefcase,
  PhoneCall,
  StickyNote,
  PenLine,
} from "lucide-react";
import { PageShell } from "@/components/app-shell";
import { usePerpetuityPanel } from "@/components/perpetuity-panel";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Contacts — Perpetuity" },
      { name: "description", content: "Every relationship, kept warm." },
      { property: "og:title", content: "Contacts — Perpetuity" },
      { property: "og:description", content: "Every relationship, kept warm." },
    ],
  }),
  component: ContactsPage,
});

type Health = "Active" | "Cooling" | "New";
type Bucket = "Buyers" | "Suppliers" | "Operations" | "Network";
type Tier = "Strategic" | "Core" | "Watch";

type Person = {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  health: Health;
  last: string;
  starred?: boolean;
  context: string;
  notes?: string[];
  history: { t: string; d: string }[];
};

type Doc = { kind: "doc" | "deal"; label: string; meta: string };

type Company = {
  id: string;
  name: string;
  country: string;
  flag: string;
  city: string;
  bucket: Bucket;
  tier: Tier;
  health: Health;
  lastInteraction: string;
  summary: string;
  people: Person[];
  docs: Doc[];
};

const companies: Company[] = [
  {
    id: "euromach",
    name: "EuroMach a.s.",
    country: "Slovakia",
    flag: "🇸🇰",
    city: "Bratislava",
    bucket: "Buyers",
    tier: "Strategic",
    health: "Active",
    lastInteraction: "Today · 13:18",
    summary:
      "Top-3 buyer this year. Q3 softwood frame in flight; Marta drives, Peter signs.",
    docs: [
      { kind: "deal", label: "Q3 softwood frame", meta: "€2.4M · negotiation" },
      { kind: "doc", label: "MNDA v2 · countersigned", meta: "Apr 02 · PDF" },
      { kind: "doc", label: "Vienna meeting notes", meta: "May 14 · 3 pages" },
    ],
    people: [
      {
        id: "marta",
        name: "Marta Kováčová",
        role: "Head of Procurement",
        email: "marta@euromach.sk",
        phone: "+421 905 110 220",
        health: "Active",
        last: "13:18 today",
        starred: true,
        context:
          "Decision-maker on the Q3 softwood frame. Replies fastest mid-morning. Prefers EN, switches to SK when stakes are high.",
        notes: [
          "Prefers fixed-price over indexed. Hates surprises on demurrage.",
          "Husband is a forestry engineer — appreciates technical depth.",
        ],
        history: [
          { t: "Replied to Q3 quote thread", d: "Today · 13:18" },
          { t: "Met in Vienna · pre-MIPIM", d: "May 14" },
          { t: "Signed MNDA v2", d: "Apr 02" },
        ],
      },
      {
        id: "peter",
        name: "Peter Horváth",
        role: "CFO",
        email: "p.horvath@euromach.sk",
        phone: "+421 905 200 110",
        health: "Active",
        last: "May 14",
        context: "Final sign-off on anything above €500k. Quiet, decisive.",
        history: [
          { t: "Joined the Vienna dinner", d: "May 14" },
          { t: "Approved the MNDA", d: "Apr 02" },
        ],
      },
    ],
  },
  {
    id: "volkov",
    name: "Volkov Lumber",
    country: "Lithuania",
    flag: "🇱🇹",
    city: "Klaipeda",
    bucket: "Suppliers",
    tier: "Core",
    health: "Active",
    lastInteraction: "Mon · WhatsApp",
    summary: "Primary supplier on the Klaipeda lane. Flex on demurrage if asked directly.",
    docs: [
      { kind: "deal", label: "Klaipeda lane · Q3", meta: "12 containers/mo" },
      { kind: "doc", label: "Lane re-pricing memo", meta: "May 28 · 2 pages" },
    ],
    people: [
      {
        id: "andrei",
        name: "Andrei Volkov",
        role: "Owner",
        email: "av@volkov.lt",
        phone: "+370 612 33 944",
        health: "Active",
        last: "Mon · WhatsApp",
        context: "WhatsApp-first. Has flex on demurrage when asked directly.",
        history: [
          { t: "Confirmed BL + seal numbers", d: "Mon · 19:42" },
          { t: "Lane re-pricing call", d: "May 28" },
          { t: "Site visit · Klaipeda yard", d: "Mar 11" },
        ],
      },
    ],
  },
  {
    id: "madnorte",
    name: "Maderas del Norte",
    country: "Spain",
    flag: "🇪🇸",
    city: "Bilbao",
    bucket: "Buyers",
    tier: "Core",
    health: "New",
    lastInteraction: "Today · 10:02",
    summary:
      "Just reopened buying. Warm intro lever for 4 lapsed Bilbao buyers in the same cluster.",
    docs: [
      { kind: "deal", label: "Restocking inquiry · pine", meta: "€480k · qualifying" },
    ],
    people: [
      {
        id: "sofia",
        name: "Sofía Marín",
        role: "Buyer",
        email: "sofia@madnorte.es",
        phone: "+34 944 100 200",
        health: "New",
        last: "Today · email",
        starred: true,
        context:
          "Just reopened buying. Warm intro lever for 4 lapsed Bilbao buyers in the same cluster.",
        history: [
          { t: "Email · restocking inquiry", d: "Today · 10:02" },
          { t: "Lunch · Bilbao", d: "Feb 18" },
        ],
      },
    ],
  },
  {
    id: "klaipeda-port",
    name: "Klaipeda Port",
    country: "Lithuania",
    flag: "🇱🇹",
    city: "Klaipeda",
    bucket: "Operations",
    tier: "Core",
    health: "Active",
    lastInteraction: "3d ago",
    summary: "Berth scheduling and drone surveys on request.",
    docs: [{ kind: "doc", label: "Drone survey · berth 4", meta: "3d ago · MP4" }],
    people: [
      {
        id: "inga",
        name: "Inga Petrauskė",
        role: "Operations",
        email: "ip@klaipedaport.lt",
        phone: "+370 46 499 100",
        health: "Active",
        last: "3d ago",
        context: "Berth scheduling. Sends drone surveys on request.",
        history: [
          { t: "Sent drone survey", d: "3d ago" },
          { t: "Confirmed berth for MSC", d: "Last week" },
        ],
      },
    ],
  },
  {
    id: "pbz",
    name: "Privatbank Zürich",
    country: "Switzerland",
    flag: "🇨🇭",
    city: "Zürich",
    bucket: "Network",
    tier: "Strategic",
    health: "Cooling",
    lastInteraction: "May 28",
    summary:
      "Treasury & Q4 facility. Usually replies within 6 days — last gap is 19.",
    docs: [
      { kind: "doc", label: "USDC rail test summary", meta: "May 20 · 1 page" },
      { kind: "deal", label: "Q4 facility renewal", meta: "€8M · prep" },
    ],
    people: [
      {
        id: "hannes",
        name: "Hannes Rüegg",
        role: "Treasury",
        email: "h.ruegg@pbz.ch",
        phone: "+41 44 224 50 00",
        health: "Cooling",
        last: "May 28",
        context:
          "Usually replies within 6 days — last gap is 19. A short USDC rail note keeps the door open for the Q4 facility conversation.",
        history: [
          { t: "Quarterly check-in", d: "May 28" },
          { t: "Facility renewal call", d: "Apr 10" },
        ],
      },
    ],
  },
  {
    id: "eeas",
    name: "EU Mission · Yerevan",
    country: "Armenia",
    flag: "🇦🇲",
    city: "Yerevan",
    bucket: "Network",
    tier: "Watch",
    health: "Active",
    lastInteraction: "Last week",
    summary: "Door-opener for Armenian distribution.",
    docs: [{ kind: "doc", label: "Intro · ADB rep", meta: "May 02 · email" }],
    people: [
      {
        id: "lucas",
        name: "Lucas Beaumont",
        role: "Trade attaché",
        email: "lucas.b@eeas.eu",
        phone: "+374 60 510 100",
        health: "Active",
        last: "Last week",
        context: "Coffee on the table when you land Thursday.",
        history: [
          { t: "Confirmed Thursday coffee", d: "Last week" },
          { t: "Intro to ADB rep", d: "May 02" },
        ],
      },
    ],
  },
];

const buckets = ["All", "Buyers", "Suppliers", "Operations", "Network"] as const;
const healths = ["All", "Active", "Cooling", "New"] as const;

const healthDot: Record<Health, string> = {
  Active: "bg-emerald-500",
  Cooling: "bg-amber-500",
  New: "bg-sky-500",
};

const tierLabel: Record<Tier, string> = {
  Strategic: "Strategic",
  Core: "Core",
  Watch: "Watch",
};

function ContactsPage() {
  const [bucket, setBucket] = useState<(typeof buckets)[number]>("All");
  const [health, setHealth] = useState<(typeof healths)[number]>("All");
  const [market, setMarket] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0].id);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const { open, panel } = usePerpetuityPanel();


  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return companies.filter((c) => {
      if (bucket !== "All" && c.bucket !== bucket) return false;
      if (health !== "All" && c.health !== health) return false;
      if (market !== "All" && c.country !== market) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.people.some((p) => p.name.toLowerCase().includes(q))
      );
    });
  }, [bucket, health, market, query]);

  const selectedCompany =
    filtered.find((c) => c.id === selectedCompanyId) ?? filtered[0] ?? companies[0];
  const selectedPerson = selectedPersonId
    ? selectedCompany?.people.find((p) => p.id === selectedPersonId) ?? null
    : null;

  return (
    <PageShell
      active="contacts"
      eyebrow={`${companies.length} companies · ${companies.reduce((n, c) => n + c.people.length, 0)} people · ${companies.filter((c) => c.health === "Cooling").length} cooling`}
      title=""
      accentWord="Contacts"
      rightSlot={
        <button
          type="button"
          onClick={() =>
            open({
              title: "Add contact",
              eyebrow: "Contacts · create",
              why: "Paste an email, LinkedIn URL, or business card photo. Perpetuity enriches from your inbox, calendar, CRM, and public sources.",
              steps: [
                "Paste email, LinkedIn, or card photo",
                "Confirm Perpetuity's enrichment",
                "Assign company + bucket",
              ],
              actions: [
                { label: "Paste & enrich", primary: true },
                { label: "Manual entry" },
              ],
            })
          }
          className="glass-panel-strong inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-medium hover:bg-foreground/5"
        >
          <Plus className="size-3.5" strokeWidth={2} /> Add contact
        </button>
      }
    >
      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="glass-panel flex flex-1 items-center gap-2 rounded-full px-4 py-2 md:max-w-[460px]">
            <Search className="size-4 text-foreground/40" strokeWidth={1.75} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search companies, people, cities…"
              className="flex-1 bg-transparent text-sm placeholder:text-foreground/40 focus:outline-none"
            />
          </div>
          <HealthChips value={health} onChange={setHealth} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <FilterRow label="Type" value={bucket} options={buckets} onChange={setBucket} />
          <MarketFlags
            value={market}
            onChange={setMarket}
            options={companies.map((c) => ({ country: c.country, flag: c.flag }))}
          />
        </div>
      </div>

      {/* AI nudge */}
      <div className="glass-panel-strong relative mb-6 overflow-hidden rounded-3xl p-5">
        <div className="ai-iridescent absolute inset-x-5 top-0 h-px opacity-60" aria-hidden />
        <div className="flex items-start gap-3">
          <div className="ai-iridescent flex size-8 items-center justify-center rounded-full ring-1 ring-foreground/5">
            <Sparkles className="size-4 text-foreground/80" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
              Perpetuity suggests
            </p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-foreground/85">
              Privatbank Zürich is going cold — Hannes hasn't heard from you in 19 days. A short USDC rail note would keep the Q4 facility open.
            </p>
          </div>
        </div>
      </div>

      {/* Two-pane: companies | detail */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left rail: grouped by company */}
        <section className="lg:col-span-5">
          <div className="glass-panel-strong overflow-hidden rounded-3xl">
            <div className="flex items-center justify-between border-b border-foreground/5 px-4 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
                Companies
              </p>
              <span className="text-[10px] font-mono text-foreground/40">
                {filtered.length}
              </span>
            </div>
            <ul className="max-h-[640px] divide-y divide-foreground/5 overflow-y-auto">
              {filtered.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      setSelectedCompanyId(c.id);
                      setSelectedPersonId(null);
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                      selectedCompany?.id === c.id
                        ? "bg-foreground/[0.05]"
                        : "hover:bg-foreground/[0.025]"
                    }`}
                  >
                    <div className="glass-panel-strong flex size-9 shrink-0 items-center justify-center rounded-xl text-base">
                      <span aria-hidden>{c.flag}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`size-1.5 shrink-0 rounded-full ${healthDot[c.health]}`} />
                        <p className="truncate text-[13px] font-medium text-foreground/90">
                          {c.name}
                        </p>
                      </div>
                      <p className="truncate text-[11px] text-foreground/55">
                        {c.city}, {c.country} · {c.bucket}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="rounded-full bg-foreground/5 px-2 py-0.5 text-[10px] font-medium text-foreground/65">
                        {c.people.length} {c.people.length === 1 ? "person" : "people"}
                      </span>
                      <span className="font-mono text-[10px] text-foreground/40">
                        {c.lastInteraction}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-4 py-10 text-center text-[12px] text-foreground/50">
                  No companies match these filters.
                </li>
              )}
            </ul>
          </div>
        </section>

        {/* Right panel */}
        <section className="lg:col-span-7">
          {selectedPerson ? (
            <PersonCard
              person={selectedPerson}
              company={selectedCompany}
              onBack={() => setSelectedPersonId(null)}
              open={open}
            />
          ) : selectedCompany ? (
            <CompanyDetail
              company={selectedCompany}
              onPickPerson={(id) => setSelectedPersonId(id)}
              open={open}
            />
          ) : null}
        </section>
      </div>

      {panel}
    </PageShell>
  );
}

function FilterRow<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="glass-panel flex items-center gap-1 rounded-full p-0.5">
      <span className="px-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
        {label}
      </span>
      <div className="flex items-center gap-0.5">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
              value === o
                ? "bg-foreground text-background"
                : "text-foreground/55 hover:text-foreground"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function CompanyDetail({
  company,
  onPickPerson,
  open,
}: {
  company: Company;
  onPickPerson: (id: string) => void;
  open: ReturnType<typeof usePerpetuityPanel>["open"];
}) {
  return (
    <div className="glass-panel-strong rounded-3xl">
      <div className="flex items-start gap-4 border-b border-foreground/5 px-6 py-5">
        <div className="glass-panel-strong flex size-14 shrink-0 items-center justify-center rounded-2xl text-2xl">
          <span aria-hidden>{company.flag}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className={`size-1.5 rounded-full ${healthDot[company.health]}`} />
            <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/45">
              {company.bucket} · {tierLabel[company.tier]} tier · last {company.lastInteraction}
            </span>
          </div>
          <h2 className="mt-1 font-sans text-2xl font-semibold tracking-tight">
            {company.name}
          </h2>
          <p className="text-[12px] text-foreground/60">
            <MapPin className="mr-1 inline size-3" strokeWidth={1.75} />
            {company.city}, {company.country}
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            open({
              title: company.name,
              eyebrow: `${company.bucket} · ${company.country}`,
              source: `${company.city}, ${company.country}`,
              why: company.summary,
              steps: [
                "Open the full company file",
                "Pull every related thread, doc, and deal",
                "Draft a touch to the right person",
              ],
            })
          }
          className="rounded-full bg-foreground px-3.5 py-1.5 text-[11px] font-medium text-background hover:opacity-90"
        >
          Open file
        </button>
      </div>

      <div className="border-b border-foreground/5 px-6 py-4">
        <p className="text-[13px] leading-relaxed text-foreground/80">{company.summary}</p>
      </div>

      {/* People */}
      <div className="border-b border-foreground/5 px-6 py-5">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
          People · {company.people.length}
        </p>
        <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {company.people.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => onPickPerson(p.id)}
                className="glass-panel flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-foreground/5"
              >
                <Avatar name={p.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`size-1.5 rounded-full ${healthDot[p.health]}`} />
                    <p className="truncate text-[13px] font-medium text-foreground/90">
                      {p.name}
                    </p>
                    {p.starred && (
                      <Star className="size-3 fill-accent text-accent" strokeWidth={1.5} />
                    )}
                  </div>
                  <p className="truncate text-[11px] text-foreground/55">{p.role}</p>
                </div>
                <ArrowUpRight className="size-3.5 text-foreground/40" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Docs & deals */}
      <div className="px-6 py-5">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
          Related documents & deals
        </p>
        <ul className="space-y-2">
          {company.docs.map((d) => (
            <li key={d.label}>
              <button
                type="button"
                onClick={() =>
                  open({
                    title: d.label,
                    eyebrow: `${company.name} · ${d.kind === "deal" ? "deal" : "document"}`,
                    source: d.meta,
                    why: "Full record from your stack — original file or pipeline view, plus everything Perpetuity has linked.",
                  })
                }
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-foreground/5"
              >
                <div className="glass-panel flex size-8 items-center justify-center rounded-lg">
                  {d.kind === "deal" ? (
                    <Briefcase className="size-3.5 text-foreground/70" strokeWidth={1.75} />
                  ) : (
                    <FileText className="size-3.5 text-foreground/70" strokeWidth={1.75} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] text-foreground/85">{d.label}</p>
                  <p className="truncate text-[11px] text-foreground/50">{d.meta}</p>
                </div>
                <ArrowUpRight className="size-3.5 text-foreground/40" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-foreground/5 px-5 py-4">
        <button
          type="button"
          onClick={() =>
            open({
              title: `Introduce ${company.name}`,
              eyebrow: "Contacts · introduce",
              why: "Pick someone in your network. Perpetuity drafts a double-opt-in intro with shared context for both sides.",
              actions: [{ label: "Pick recipient", primary: true }],
            })
          }
          className="glass-panel inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium hover:bg-foreground/5"
        >
          <Building2 className="size-3" strokeWidth={1.75} /> Introduce
        </button>
        <button
          type="button"
          onClick={() =>
            open({
              title: `Log a touch with ${company.name}`,
              eyebrow: "Contacts · log",
              why: "Drop a note, transcript, or summary. Perpetuity attaches it to the right person and updates health.",
              actions: [{ label: "Add note", primary: true }],
            })
          }
          className="glass-panel inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium hover:bg-foreground/5"
        >
          <StickyNote className="size-3" strokeWidth={1.75} /> Log touch
        </button>
      </div>
    </div>
  );
}

function PersonCard({
  person,
  company,
  onBack,
  open,
}: {
  person: Person;
  company: Company;
  onBack: () => void;
  open: ReturnType<typeof usePerpetuityPanel>["open"];
}) {
  return (
    <div className="glass-panel-strong rounded-3xl">
      <div className="flex items-center gap-2 border-b border-foreground/5 px-5 py-3">
        <button
          type="button"
          onClick={onBack}
          className="glass-panel inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium hover:bg-foreground/5"
        >
          <ArrowLeft className="size-3" strokeWidth={2} /> {company.name}
        </button>
      </div>

      <div className="flex items-start gap-4 px-6 py-5">
        <Avatar name={person.name} large />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className={`size-1.5 rounded-full ${healthDot[person.health]}`} />
            <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/45">
              {person.health} · last touch {person.last}
            </span>
          </div>
          <h2 className="mt-1 font-sans text-2xl font-semibold tracking-tight">
            {person.name}
          </h2>
          <p className="text-[12px] text-foreground/60">
            {person.role} · <span className="text-foreground/80">{company.name}</span>
          </p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-px border-y border-foreground/5 bg-foreground/5">
        <ActionCell
          icon={PenLine}
          label="Draft email"
          onClick={() =>
            open({
              title: `Draft to ${person.name}`,
              eyebrow: "Contacts · draft",
              source: person.email,
              why: "Perpetuity pulls the last 3 threads and any open deal so the opener picks up where you left off.",
              steps: ["Pick tone", "Approve opener", "Send + log"],
              actions: [{ label: "Open composer", primary: true }],
            })
          }
        />
        <ActionCell
          icon={PhoneCall}
          label="Log call"
          onClick={() =>
            open({
              title: `Log call · ${person.name}`,
              eyebrow: "Contacts · call",
              source: person.phone,
              why: "Auto-transcribe via softphone or paste a summary. Perpetuity threads it into the CRM and updates health.",
              actions: [{ label: "Start call brief", primary: true }],
            })
          }
        />
        <ActionCell
          icon={StickyNote}
          label="Add note"
          onClick={() =>
            open({
              title: `Note on ${person.name}`,
              eyebrow: "Contacts · note",
              why: "Private context only you and Perpetuity see. Used to shape future drafts.",
              actions: [{ label: "Write note", primary: true }],
            })
          }
        />
      </div>

      {/* Contact info */}
      <div className="grid grid-cols-1 gap-px bg-foreground/5 md:grid-cols-2">
        <InfoCell icon={Mail} label="Email" value={person.email} />
        <InfoCell icon={Phone} label="Phone" value={person.phone} />
      </div>

      {/* Context */}
      <div className="border-t border-foreground/5 px-6 py-5">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
          Context
        </p>
        <p className="text-[13px] leading-relaxed text-foreground/80">{person.context}</p>
      </div>

      {/* Notes */}
      {person.notes && person.notes.length > 0 && (
        <div className="border-t border-foreground/5 px-6 py-5">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
            Private notes
          </p>
          <ul className="space-y-2">
            {person.notes.map((n) => (
              <li
                key={n}
                className="rounded-xl bg-foreground/[0.04] px-3 py-2 text-[12px] leading-relaxed text-foreground/80"
              >
                {n}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* History */}
      <div className="border-t border-foreground/5 px-6 py-5">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
          Recent activity
        </p>
        <ul className="space-y-3">
          {person.history.map((a) => (
            <li
              key={a.t}
              className="flex items-center justify-between gap-3 text-[12px]"
            >
              <span className="text-foreground/80">{a.t}</span>
              <span className="font-mono text-[10px] text-foreground/40">{a.d}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Avatar({ name, large }: { name: string; large?: boolean }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div
      className={`glass-panel-strong flex shrink-0 items-center justify-center rounded-full font-semibold uppercase tracking-wider text-foreground/70 ${
        large ? "size-14 text-[14px]" : "size-9 text-[11px]"
      }`}
    >
      {initials}
    </div>
  );
}

function ActionCell({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Mail;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 bg-background/40 px-4 py-3 text-[12px] font-medium text-foreground/80 transition-colors hover:bg-foreground/[0.05]"
    >
      <Icon className="size-3.5" strokeWidth={1.75} /> {label}
    </button>
  );
}

function InfoCell({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-background/40 px-5 py-4">
      <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/40">
        <Icon className="size-3" strokeWidth={1.75} /> {label}
      </p>
      <p className="mt-1.5 text-[13px] text-foreground/85">{value}</p>
    </div>
  );
}
