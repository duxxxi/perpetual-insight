import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Building2,
  Star,
  ArrowUpRight,
  Plus,
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

type Contact = {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  email: string;
  phone: string;
  warmth: "hot" | "warm" | "cool";
  last: string;
  bucket: "Buyers" | "Suppliers" | "Operations" | "Network";
  starred?: boolean;
  history: { t: string; d: string }[];
  context: string;
};

const contacts: Contact[] = [
  {
    id: "1",
    name: "Marta Kováčová",
    role: "Head of Procurement",
    company: "EuroMach a.s.",
    location: "Bratislava, SK",
    email: "marta@euromach.sk",
    phone: "+421 905 110 220",
    warmth: "hot",
    last: "13:18 today",
    bucket: "Buyers",
    starred: true,
    context:
      "Decision-maker on the Q3 softwood frame. Replies fastest mid-morning. Prefers EN, switches to SK when stakes are high.",
    history: [
      { t: "Replied to Q3 quote thread", d: "Today · 13:18" },
      { t: "Met in Vienna · pre-MIPIM", d: "May 14" },
      { t: "Signed MNDA v2", d: "Apr 02" },
    ],
  },
  {
    id: "2",
    name: "Andrei Volkov",
    role: "Owner",
    company: "Volkov Lumber",
    location: "Kaliningrad, RU",
    email: "av@volkov.lt",
    phone: "+370 612 33 944",
    warmth: "warm",
    last: "Mon · WhatsApp",
    bucket: "Suppliers",
    context:
      "Primary supplier on the Klaipeda lane. WhatsApp-first. Has flex on demurrage when asked directly.",
    history: [
      { t: "Confirmed BL + seal numbers", d: "Mon · 19:42" },
      { t: "Lane re-pricing call", d: "May 28" },
      { t: "Site visit · Klaipeda yard", d: "Mar 11" },
    ],
  },
  {
    id: "3",
    name: "Lucas Beaumont",
    role: "Trade attaché",
    company: "EU Mission · Yerevan",
    location: "Yerevan, AM",
    email: "lucas.b@eeas.eu",
    phone: "+374 60 510 100",
    warmth: "warm",
    last: "Last week",
    bucket: "Network",
    context: "Door-opener for Armenian distribution. Coffee on the table when you land Thursday.",
    history: [
      { t: "Confirmed Thursday coffee", d: "Last week" },
      { t: "Intro to ADB rep", d: "May 02" },
    ],
  },
  {
    id: "4",
    name: "Inga Petrauskė",
    role: "Operations",
    company: "Klaipeda Port",
    location: "Klaipeda, LT",
    email: "ip@klaipedaport.lt",
    phone: "+370 46 499 100",
    warmth: "warm",
    last: "3d ago",
    bucket: "Operations",
    context: "Berth scheduling. Sends drone surveys on request.",
    history: [
      { t: "Sent drone survey", d: "3d ago" },
      { t: "Confirmed berth for MSC", d: "Last week" },
    ],
  },
  {
    id: "5",
    name: "Hannes Rüegg",
    role: "Treasury",
    company: "Privatbank Zürich",
    location: "Zürich, CH",
    email: "h.ruegg@pbz.ch",
    phone: "+41 44 224 50 00",
    warmth: "cool",
    last: "May 28",
    bucket: "Network",
    context:
      "Usually replies within 6 days — last gap is 19. A short USDC rail note keeps the door open for the Q4 facility conversation.",
    history: [
      { t: "Quarterly check-in", d: "May 28" },
      { t: "Facility renewal call", d: "Apr 10" },
    ],
  },
  {
    id: "6",
    name: "Sofía Marín",
    role: "Buyer",
    company: "Maderas del Norte",
    location: "Bilbao, ES",
    email: "sofia@madnorte.es",
    phone: "+34 944 100 200",
    warmth: "hot",
    last: "Today · email",
    bucket: "Buyers",
    starred: true,
    context: "Just reopened buying. Warm intro lever for 4 lapsed Bilbao buyers in the same cluster.",
    history: [
      { t: "Email · restocking inquiry", d: "Today · 10:02" },
      { t: "Lunch · Bilbao", d: "Feb 18" },
    ],
  },
];

const warmthDot = { hot: "bg-rose-500", warm: "bg-amber-500", cool: "bg-foreground/30" } as const;
const warmthLabel = { hot: "Hot", warm: "Warm", cool: "Cooling" } as const;
const buckets = ["All", "Buyers", "Suppliers", "Operations", "Network"] as const;

function ContactsPage() {
  const [bucket, setBucket] = useState<(typeof buckets)[number]>("All");
  const [selectedId, setSelectedId] = useState(contacts[0].id);
  const { open, panel } = usePerpetuityPanel();
  const filtered = bucket === "All" ? contacts : contacts.filter((c) => c.bucket === bucket);
  const selected = contacts.find((c) => c.id === selectedId)!;

  const openContact = (c: Contact) =>
    open({
      title: c.name,
      eyebrow: `${c.bucket} · ${warmthLabel[c.warmth]} · last touch ${c.last}`,
      source: `${c.role} · ${c.company} · ${c.location}`,
      why: c.context,
      steps: [
        "Open the full thread history with this contact",
        "Have Perpetuity draft the next touch in their preferred tone",
        "Promote the next step to Assignments",
      ],
      artifacts: [
        { kind: "people", label: `${c.name} · CRM profile` },
        { kind: "crm", label: `${c.company} · company file` },
        { kind: "thread", label: "Latest thread with this contact" },
        { kind: "email", label: `Email · ${c.email}` },
      ],
      actions: [
        { label: "Draft next touch", primary: true },
        { label: "Open thread" },
        { label: "Log a call" },
      ],
    });

  return (
    <PageShell
      active="contacts"
      eyebrow={`${contacts.length} relationships · 2 going cold`}
      title="kept warm by Perpetuity"
      accentWord="Contacts"
      rightSlot={
        <button
          type="button"
          onClick={() =>
            open({
              title: "Add contact",
              eyebrow: "Contacts · create",
              why: "Drop in a name, email, or LinkedIn URL. Perpetuity enriches from your inbox, calendar, CRM, and public sources — no manual fields.",
              steps: [
                "Paste email, LinkedIn, or business card photo",
                "Confirm Perpetuity's enrichment",
                "Assign bucket + warmth signal",
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
      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 md:w-[420px]">
          <Search className="size-4 text-foreground/40" strokeWidth={1.75} />
          <input
            type="text"
            placeholder="Search people, companies, cities…"
            className="flex-1 bg-transparent text-sm placeholder:text-foreground/40 focus:outline-none"
          />
        </div>
        <div className="glass-panel flex items-center gap-0.5 rounded-full p-0.5">
          {buckets.map((b) => (
            <button
              key={b}
              onClick={() => setBucket(b)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
                bucket === b ? "bg-foreground text-background" : "text-foreground/55 hover:text-foreground"
              }`}
            >
              {b}
            </button>
          ))}
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
              Hannes hasn't heard from you in 19 days — he usually replies inside 6. A short note about the USDC rail going healthy would keep treasury options open.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  open({
                    title: "Draft note to Hannes Rüegg",
                    eyebrow: "Contacts · draft",
                    source: "Privatbank Zürich · last touch May 28",
                    why: "Hannes is the gatekeeper to your Q4 facility. The USDC rail clearing is a low-stakes hook that gives you a reason to be in his inbox without asking for anything.",
                    steps: [
                      "Perpetuity drafts a 4-line note (EN/DE)",
                      "You approve or tweak the close",
                      "Send + auto-log in CRM",
                    ],
                    artifacts: [
                      { kind: "email", label: "Draft · Hannes · USDC rail" },
                      { kind: "people", label: "Hannes Rüegg · CRM profile" },
                      { kind: "doc", label: "Treasury · USDC rail test summary" },
                    ],
                    actions: [
                      { label: "Open draft", primary: true },
                      { label: "Snooze 3d" },
                    ],
                  })
                }
                className="rounded-full bg-foreground px-3.5 py-1.5 text-[11px] font-medium text-background hover:opacity-90"
              >
                Draft note to Hannes
              </button>
              <button
                type="button"
                onClick={() =>
                  open({
                    title: "All cooling relationships · 6",
                    eyebrow: "Contacts · cohort",
                    why: "Six contacts have crossed 1.5× their typical reply gap. Perpetuity ranks them by deal value at risk.",
                    steps: [
                      "Skim the 6 ranked by stake",
                      "Bulk-approve drafted re-engagements",
                      "Set a 14-day re-check",
                    ],
                    artifacts: [
                      { kind: "people", label: "Cohort · 6 cooling contacts" },
                      { kind: "data", label: "Reply-gap baseline · per contact" },
                    ],
                  })
                }
                className="rounded-full bg-foreground/5 px-3.5 py-1.5 text-[11px] font-medium text-foreground/70 hover:bg-foreground/10"
              >
                Show all cooling relationships
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Two-pane */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* List */}
        <section className="lg:col-span-5">
          <div className="glass-panel-strong overflow-hidden rounded-3xl">
            <ul className="divide-y divide-foreground/5">
              {filtered.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => setSelectedId(c.id)}
                    onDoubleClick={() => openContact(c)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                      selectedId === c.id ? "bg-foreground/[0.05]" : "hover:bg-foreground/[0.025]"
                    }`}
                  >
                    <Avatar name={c.name} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`size-1.5 shrink-0 rounded-full ${warmthDot[c.warmth]}`} />
                        <p className="truncate text-[13px] font-medium text-foreground/90">{c.name}</p>
                        {c.starred && <Star className="size-3 fill-accent text-accent" strokeWidth={1.5} />}
                      </div>
                      <p className="truncate text-[11px] text-foreground/55">
                        {c.role} · {c.company}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-foreground/40">{c.last}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Detail */}
        <section className="lg:col-span-7">
          <div className="glass-panel-strong rounded-3xl">
            <div className="flex items-start gap-4 border-b border-foreground/5 px-6 py-5">
              <Avatar name={selected.name} large />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`size-1.5 rounded-full ${warmthDot[selected.warmth]}`} />
                  <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/45">
                    {selected.bucket} · last touch {selected.last}
                  </span>
                </div>
                <h2 className="mt-1 font-serif text-2xl italic tracking-tight">{selected.name}</h2>
                <p className="text-[12px] text-foreground/60">
                  {selected.role} · <span className="text-foreground/80">{selected.company}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => openContact(selected)}
                className="rounded-full bg-foreground px-3.5 py-1.5 text-[11px] font-medium text-background hover:opacity-90"
              >
                Open thread
              </button>
            </div>

            <div className="grid grid-cols-1 gap-px bg-foreground/5 md:grid-cols-3">
              <InfoCell
                icon={Mail}
                label="Email"
                value={selected.email}
                onClick={() =>
                  open({
                    title: `Compose to ${selected.name}`,
                    eyebrow: "Contacts · email",
                    source: selected.email,
                    why: "Perpetuity will pre-load the last 3 threads with this contact so your draft picks up exactly where you left off.",
                    steps: ["Pick tone (formal / warm)", "Approve the opener", "Send + log in CRM"],
                    actions: [{ label: "Open composer", primary: true }],
                  })
                }
              />
              <InfoCell
                icon={Phone}
                label="Phone"
                value={selected.phone}
                onClick={() =>
                  open({
                    title: `Call ${selected.name}`,
                    eyebrow: "Contacts · call",
                    source: selected.phone,
                    why: "Perpetuity will assemble a one-page brief — last 3 conversations, open deals, anything they've published this week.",
                    steps: ["Open the call brief", "Dial via your softphone", "Auto-transcribe + log"],
                    actions: [{ label: "Show call brief", primary: true }],
                  })
                }
              />
              <InfoCell
                icon={MapPin}
                label="Location"
                value={selected.location}
                onClick={() =>
                  open({
                    title: `${selected.location} · context`,
                    eyebrow: "Contacts · location",
                    why: "Local time, time-to-reply window, and any nearby contacts or open trips Perpetuity is tracking.",
                    steps: [
                      "Show local working hours",
                      "Surface nearby contacts in the same city",
                      "Check if your next trip overlaps",
                    ],
                  })
                }
              />
            </div>

            <div className="border-t border-foreground/5 p-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
                Recent activity
              </p>
              <ul className="space-y-3">
                {selected.history.map((a) => (
                  <li key={a.t}>
                    <button
                      type="button"
                      onClick={() =>
                        open({
                          title: a.t,
                          eyebrow: `${selected.name} · activity`,
                          source: a.d,
                          why: "Full record from your stack — original message, attached files, and what Perpetuity did in response.",
                          steps: ["Open original", "Re-summarize", "Convert to follow-up task"],
                        })
                      }
                      className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-1 text-[12px] hover:bg-foreground/5"
                    >
                      <span className="text-foreground/80">{a.t}</span>
                      <span className="font-mono text-[10px] text-foreground/40">{a.d}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 border-t border-foreground/5 px-5 py-4">
              <button
                type="button"
                onClick={() =>
                  open({
                    title: `${selected.company} · company file`,
                    eyebrow: "Contacts · company",
                    source: `${selected.company} · ${selected.location}`,
                    why: "Every contact, deal, doc, and thread tied to this company — in one view.",
                    steps: [
                      "Open the full company file",
                      "See all related contacts",
                      "Pull recent filings + news",
                    ],
                    artifacts: [
                      { kind: "crm", label: `${selected.company} · CRM record` },
                      { kind: "people", label: "All contacts at this company" },
                      { kind: "doc", label: "Latest signed agreements" },
                    ],
                  })
                }
                className="glass-panel inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium hover:bg-foreground/5"
              >
                <Building2 className="size-3" strokeWidth={1.75} /> Company file
              </button>
              <button
                type="button"
                onClick={() =>
                  open({
                    title: `Introduce ${selected.name}`,
                    eyebrow: "Contacts · introduce",
                    why: "Tell Perpetuity who you want to connect them to. It drafts the double-opt-in intro with shared context for both sides.",
                    steps: [
                      "Pick the other person",
                      "Approve the double-opt-in copy",
                      "Send when both confirm",
                    ],
                    actions: [{ label: "Pick recipient", primary: true }],
                  })
                }
                className="glass-panel inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium hover:bg-foreground/5"
              >
                Introduce <ArrowUpRight className="size-3" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {panel}
    </PageShell>
  );
}

function Avatar({ name, large }: { name: string; large?: boolean }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
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

function InfoCell({
  icon: Icon,
  label,
  value,
  onClick,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-background/40 px-5 py-4 text-left transition-colors hover:bg-foreground/[0.04]"
    >
      <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/40">
        <Icon className="size-3" strokeWidth={1.75} /> {label}
      </p>
      <p className="mt-1.5 text-[13px] text-foreground/85">{value}</p>
    </button>
  );
}
