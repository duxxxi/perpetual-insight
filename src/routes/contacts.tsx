import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles, Mail, Phone, MapPin, Building2, Star, ArrowUpRight, Plus } from "lucide-react";
import { PageShell } from "@/components/app-shell";

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
};

const contacts: Contact[] = [
  { id: "1", name: "Marta Kováčová", role: "Head of Procurement", company: "EuroMach a.s.", location: "Bratislava, SK", email: "marta@euromach.sk", phone: "+421 905 110 220", warmth: "hot", last: "13:18 today", bucket: "Buyers", starred: true },
  { id: "2", name: "Andrei Volkov", role: "Owner", company: "Volkov Lumber", location: "Kaliningrad, RU", email: "av@volkov.lt", phone: "+370 612 33 944", warmth: "warm", last: "Mon · WhatsApp", bucket: "Suppliers" },
  { id: "3", name: "Lucas Beaumont", role: "Trade attaché", company: "EU Mission · Yerevan", location: "Yerevan, AM", email: "lucas.b@eeas.eu", phone: "+374 60 510 100", warmth: "warm", last: "Last week", bucket: "Network" },
  { id: "4", name: "Inga Petrauskė", role: "Operations", company: "Klaipeda Port", location: "Klaipeda, LT", email: "ip@klaipedaport.lt", phone: "+370 46 499 100", warmth: "warm", last: "3d ago", bucket: "Operations" },
  { id: "5", name: "Hannes Rüegg", role: "Treasury", company: "Privatbank Zürich", location: "Zürich, CH", email: "h.ruegg@pbz.ch", phone: "+41 44 224 50 00", warmth: "cool", last: "May 28", bucket: "Network" },
  { id: "6", name: "Sofía Marín", role: "Buyer", company: "Maderas del Norte", location: "Bilbao, ES", email: "sofia@madnorte.es", phone: "+34 944 100 200", warmth: "hot", last: "Today · email", bucket: "Buyers", starred: true },
];

const warmthDot = { hot: "bg-rose-500", warm: "bg-amber-500", cool: "bg-foreground/30" } as const;
const buckets = ["All", "Buyers", "Suppliers", "Operations", "Network"] as const;

function ContactsPage() {
  const [bucket, setBucket] = useState<(typeof buckets)[number]>("All");
  const [selectedId, setSelectedId] = useState(contacts[0].id);
  const filtered = bucket === "All" ? contacts : contacts.filter((c) => c.bucket === bucket);
  const selected = contacts.find((c) => c.id === selectedId)!;

  return (
    <PageShell
      active="contacts"
      eyebrow={`${contacts.length} relationships · 2 going cold`}
      title="kept warm by Perpetuity"
      accentWord="Contacts"
      rightSlot={
        <button className="glass-panel-strong inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-medium">
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
              <button className="rounded-full bg-foreground px-3.5 py-1.5 text-[11px] font-medium text-background">
                Draft note to Hannes
              </button>
              <button className="rounded-full bg-foreground/5 px-3.5 py-1.5 text-[11px] font-medium text-foreground/70">
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
              <button className="rounded-full bg-foreground px-3.5 py-1.5 text-[11px] font-medium text-background">
                Open thread
              </button>
            </div>

            <div className="grid grid-cols-1 gap-px bg-foreground/5 md:grid-cols-3">
              <InfoCell icon={Mail} label="Email" value={selected.email} />
              <InfoCell icon={Phone} label="Phone" value={selected.phone} />
              <InfoCell icon={MapPin} label="Location" value={selected.location} />
            </div>

            <div className="border-t border-foreground/5 p-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
                Recent activity
              </p>
              <ul className="space-y-3">
                {[
                  { t: "Replied to Q3 quote thread", d: "Today · 13:18" },
                  { t: "Met in Vienna · pre-MIPIM", d: "May 14" },
                  { t: "Signed MNDA v2", d: "Apr 02" },
                ].map((a) => (
                  <li key={a.t} className="flex items-center justify-between gap-3 text-[12px]">
                    <span className="text-foreground/80">{a.t}</span>
                    <span className="font-mono text-[10px] text-foreground/40">{a.d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 border-t border-foreground/5 px-5 py-4">
              <button className="glass-panel inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium">
                <Building2 className="size-3" strokeWidth={1.75} /> Company file
              </button>
              <button className="glass-panel inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium">
                Introduce <ArrowUpRight className="size-3" />
              </button>
            </div>
          </div>
        </section>
      </div>
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

function InfoCell({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="bg-background/40 px-5 py-4">
      <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/40">
        <Icon className="size-3" strokeWidth={1.75} /> {label}
      </p>
      <p className="mt-1.5 text-[13px] text-foreground/85">{value}</p>
    </div>
  );
}
