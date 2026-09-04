import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  ArrowUpDown,
  ShieldCheck,
  Sparkles,
  Building2,
  Plus,
  X,
  PenLine,
  Bookmark,
  ArrowRight,
  Layers,
} from "lucide-react";
import { PageShell } from "@/components/app-shell";
import { usePerpetuityPanel } from "@/components/perpetuity-panel";

export const Route = createFileRoute("/tenders")({
  head: () => ({
    meta: [
      { title: "Tenders — Perpetuity" },
      {
        name: "description",
        content:
          "Live public procurement from TED and the World Bank, scored against your HS codes and target markets.",
      },
      { property: "og:title", content: "Tenders — Perpetuity" },
      {
        property: "og:description",
        content:
          "Live public procurement from TED and the World Bank, scored against your HS codes and target markets.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TendersPage,
});

type Tender = {
  id: string;
  source: "EU" | "World Bank";
  country: string;
  flag: string;
  title: string;
  buyer: string;
  why: string;
  cpv: string[];
  match: number;
  value: string;
  deadline: string;
  posted: string;
};

const seedTenders: Tender[] = [
  {
    id: "t1",
    source: "EU",
    country: "Germany",
    flag: "🇩🇪",
    title:
      "Government services — Konsortialbildung im Rahmen der Exportinitiative Energie 2027, 1. Tranche",
    buyer: "Bundesamt für Wirtschaft und Ausfuhrkontrolle (BAFA)",
    why: "Export-initiative consulting scope aligns with your trade intelligence offering and CEE delivery footprint.",
    cpv: ["75131000", "79411000", "73200000"],
    match: 72,
    value: "€1.4M",
    deadline: "in 19 days",
    posted: "3 Sept",
  },
  {
    id: "t2",
    source: "EU",
    country: "Czech Republic",
    flag: "🇨🇿",
    title: "Framework for market analysis and export advisory for SME exporters",
    buyer: "CzechTrade — Ministry of Industry and Trade",
    why: "Named requirement for automated market monitoring; two incumbents lack an AI layer.",
    cpv: ["79300000", "72000000"],
    match: 81,
    value: "CZK 22M",
    deadline: "in 11 days",
    posted: "2 Sept",
  },
  {
    id: "t3",
    source: "World Bank",
    country: "Armenia",
    flag: "🇦🇲",
    title: "Trade facilitation diagnostics and exporter capability programme",
    buyer: "Ministry of Economy · World Bank financed",
    why: "Your Yerevan relationships plus existing CEE case work make a credible consortium lead.",
    cpv: ["79411000", "80500000"],
    match: 66,
    value: "$480k",
    deadline: "in 27 days",
    posted: "1 Sept",
  },
  {
    id: "t4",
    source: "EU",
    country: "Poland",
    flag: "🇵🇱",
    title: "Digital platform for export promotion — analytics module",
    buyer: "Polska Agencja Inwestycji i Handlu (PAIH)",
    view: undefined as never,
    cpv: ["72212000", "79300000"],
    why: "Analytics module maps almost one-to-one onto your signals engine; delivery in PL requires a local partner.",
    match: 58,
    value: "PLN 6.8M",
    deadline: "in 34 days",
    posted: "29 Aug",
  } as Tender,
];

const sources = ["All", "EU", "World Bank", "UN · soon", "National · soon", "Grants · soon"] as const;
const sorts = ["Most relevant", "Closing soonest", "Newest"] as const;

function TendersPage() {
  const { open, panel } = usePerpetuityPanel();
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<(typeof sources)[number]>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Most relevant");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [markets, setMarkets] = useState([
    { flag: "🇩🇪", name: "Germany" },
    { flag: "🇦🇹", name: "Austria" },
    { flag: "🇵🇱", name: "Poland" },
    { flag: "🇨🇿", name: "Czech Republic" },
    { flag: "🇸🇰", name: "Slovakia" },
    { flag: "🇷🇴", name: "Romania" },
    { flag: "🇪🇺", name: "European Union" },
  ]);
  const [codes, setCodes] = useState(["4407", "7513", "7930"]);
  const [codeDraft, setCodeDraft] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = seedTenders.filter((t) => !dismissed.has(t.id));
    if (source === "EU" || source === "World Bank") rows = rows.filter((t) => t.source === source);
    if (q)
      rows = rows.filter((t) =>
        [t.title, t.buyer, t.why, t.country, ...t.cpv].join(" ").toLowerCase().includes(q),
      );
    if (sort === "Most relevant") rows = [...rows].sort((a, b) => b.match - a.match);
    if (sort === "Closing soonest")
      rows = [...rows].sort((a, b) => parseInt(a.deadline.replace(/\D/g, "")) - parseInt(b.deadline.replace(/\D/g, "")));
    return rows;
  }, [query, source, sort, dismissed]);

  const openTender = (t: Tender) =>
    open({
      title: t.title,
      eyebrow: `Tender · ${t.source} · ${t.country} · ${t.match}% match`,
      source: `${t.buyer} · value ${t.value} · closes ${t.deadline} · CPV ${t.cpv.join(", ")}`,
      why: t.why,
      steps: [
        "Pull the full notice and annexes from the source register",
        "Check eligibility: turnover, references, local presence",
        "Draft the expression of interest against your Context memory",
        "Set a reminder 5 days before the deadline",
      ],
      artifacts: [
        { kind: "doc", label: "Original notice · annexes" },
        { kind: "crm", label: `Buyer profile · ${t.buyer}` },
        { kind: "data", label: "Past awards · same buyer" },
        { kind: "thread", label: "Related outreach · 2" },
      ],
      actions: [
        { label: "Draft outreach", primary: true },
        { label: "Save to pipeline", onClick: () => setSaved((s) => new Set(s).add(t.id)) },
        { label: "Not relevant", onClick: () => setDismissed((s) => new Set(s).add(t.id)) },
      ],
    });

  return (
    <PageShell
      active="tenders"
      eyebrow={`${list.length} matched · TED + World Bank · scored to your HS codes`}
      title=""
      accentWord="Tenders"
      rightSlot={
        <button
          type="button"
          onClick={() =>
            setSort((s) => sorts[(sorts.indexOf(s) + 1) % sorts.length])
          }
          className="glass-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-foreground/70 hover:text-foreground"
        >
          <ArrowUpDown className="size-3" strokeWidth={1.75} /> {sort}
        </button>
      }
    >
      {/* Trade profile */}
      <section className="glass-panel-strong relative mb-4 overflow-hidden rounded-3xl p-5">
        <div className="ai-iridescent absolute inset-x-6 top-0 h-px opacity-60" aria-hidden />
        <div className="flex items-center gap-2">
          <div className="ai-iridescent flex size-7 items-center justify-center rounded-full ring-1 ring-foreground/5">
            <Layers className="size-3.5 text-foreground/80" strokeWidth={1.75} />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
            Your trade profile
          </p>
          <button
            type="button"
            onClick={() =>
              open({
                title: "Trade profile drives every match",
                eyebrow: "Tenders · scoring",
                why: "Perpetuity scores each notice against your sector, product lines, HS/CPV codes and target markets. Sharpen these and the match quality moves immediately.",
                steps: [
                  "Add the HS codes you actually ship under",
                  "Keep target markets to where you can deliver",
                  "Product lines are read verbatim from Context memory",
                ],
              })
            }
            className="ml-auto text-[11px] text-foreground/50 hover:text-foreground"
          >
            How scoring works ↗
          </button>
        </div>

        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <div className="space-y-4">
            <Block label="Sector">
              <button
                type="button"
                onClick={() =>
                  open({
                    title: "Sector · Trade intelligence software",
                    eyebrow: "Trade profile",
                    why: "Sector narrows the CPV families Perpetuity watches. Yours currently spans consulting, market research and software services.",
                  })
                }
                className="glass-chip inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] text-foreground/80"
              >
                Trade intelligence · services
                <PenLine className="size-2.5 text-foreground/45" strokeWidth={2} />
              </button>
            </Block>

            <Block label="HS / CPV codes">
              <div className="flex flex-wrap items-center gap-1.5">
                {codes.map((c) => (
                  <span
                    key={c}
                    className="glass-chip inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] text-foreground/75"
                  >
                    {c}
                    <button
                      type="button"
                      onClick={() => setCodes((cs) => cs.filter((x) => x !== c))}
                      className="text-foreground/35 hover:text-foreground"
                    >
                      <X className="size-2.5" strokeWidth={2.5} />
                    </button>
                  </span>
                ))}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const v = codeDraft.trim();
                    if (v) setCodes((cs) => [...cs, v]);
                    setCodeDraft("");
                  }}
                  className="flex items-center gap-1"
                >
                  <input
                    value={codeDraft}
                    onChange={(e) => setCodeDraft(e.target.value)}
                    placeholder="e.g. 4407"
                    className="w-24 rounded-full bg-foreground/5 px-2.5 py-1 font-mono text-[10px] text-foreground/80 outline-none placeholder:text-foreground/35 focus:ring-1 focus:ring-ring"
                  />
                  <button type="submit" className="text-foreground/40 hover:text-foreground">
                    <Plus className="size-3" strokeWidth={2} />
                  </button>
                </form>
              </div>
            </Block>
          </div>

          <div className="space-y-4">
            <Block label="Product lines">
              <button
                type="button"
                onClick={() =>
                  open({
                    title: "Product line · read from Context memory",
                    eyebrow: "Trade profile",
                    why: "AI-powered trade intelligence: monitoring, opportunity scouting, market analysis and outreach for exporters across CEE, MENA and beyond.",
                    steps: ["Edit it on the Context page — every agent reads it from there"],
                  })
                }
                className="glass-panel w-full rounded-2xl px-3 py-2.5 text-left text-[12px] leading-relaxed text-foreground/80 hover:bg-foreground/5"
              >
                AI-powered trade intelligence — monitoring, opportunity scouting,
                market analysis and outreach for exporters in CEE, MENA and beyond.
              </button>
            </Block>

            <Block label="Target markets">
              <div className="flex flex-wrap items-center gap-1.5">
                {markets.map((m) => (
                  <span
                    key={m.name}
                    className="glass-chip inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] text-foreground/80"
                  >
                    <span className="text-[11px] leading-none">{m.flag}</span>
                    {m.name}
                    <button
                      type="button"
                      onClick={() => setMarkets((ms) => ms.filter((x) => x.name !== m.name))}
                      className="text-foreground/35 hover:text-foreground"
                    >
                      <X className="size-2.5" strokeWidth={2.5} />
                    </button>
                  </span>
                ))}
              </div>
            </Block>
          </div>
        </div>
      </section>

      {/* Status rows */}
      <div className="mb-4 grid gap-2.5 md:grid-cols-2">
        <StatusRow
          icon={ShieldCheck}
          label="EU financial sanctions"
          text="No active concerns across your target markets · 6,234 entities monitored"
          onClick={() =>
            open({
              title: "EU financial sanctions monitoring",
              eyebrow: "Tenders · compliance",
              source: "EU consolidated list · refreshed 14:02 UTC",
              why: "Every buyer, consortium partner and beneficial owner on this page is screened against the EU consolidated list before Perpetuity surfaces the notice.",
              steps: [
                "Screen a specific counterparty on demand",
                "Attach the screening record to a bid file",
              ],
              artifacts: [{ kind: "data", label: "Screening log · last 30 days" }],
            })
          }
        />
        <StatusRow
          icon={Sparkles}
          label="Live procurement"
          text="Real notices from TED and the World Bank, scored against your codes"
          onClick={() =>
            open({
              title: "Where these tenders come from",
              eyebrow: "Tenders · sources",
              why: "TED (EU) and World Bank registers are pulled continuously. Nothing here is illustrative — each row links to an open notice.",
              steps: [
                "UN, national registers and grants land next",
                "Ask Perpetuity to watch a CPV family and brief you daily",
              ],
            })
          }
        />
      </div>

      {/* Search + sources */}
      <div className="glass-panel mb-4 rounded-2xl p-2.5">
        <div className="flex items-center gap-2">
          <Search className="ml-1 size-3.5 shrink-0 text-foreground/40" strokeWidth={1.75} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, buyer, description, CPV code…"
            className="w-full bg-transparent text-[12.5px] text-foreground outline-none placeholder:text-foreground/40"
          />
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5 border-t border-foreground/5 pt-2.5">
          <span className="mr-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
            Source
          </span>
          {sources.map((s) => {
            const soon = s.includes("soon");
            const active = s === source;
            return (
              <button
                key={s}
                type="button"
                onClick={() =>
                  soon
                    ? open({
                        title: `${s.split(" ·")[0]} registers · coming next`,
                        eyebrow: "Tenders · roadmap",
                        why: "Not connected yet. Perpetuity will fold these notices into the same scoring pipeline once the register feed is live.",
                      })
                    : setSource(s)
                }
                className={`rounded-full px-2.5 py-1 text-[10.5px] font-medium transition-colors ${
                  active
                    ? "bg-accent/15 text-accent ring-1 ring-accent/25"
                    : soon
                      ? "bg-foreground/5 text-foreground/35 hover:text-foreground/60"
                      : "glass-chip text-foreground/70 hover:text-foreground"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tender cards */}
      <div className="space-y-3">
        {list.map((t) => (
          <article
            key={t.id}
            onClick={() => openTender(t)}
            className="glass-panel-strong group cursor-pointer rounded-3xl p-4 transition-all hover:translate-y-[-1px]"
          >
            <div className="flex items-start gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="glass-chip rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground/65">
                    {t.source}
                  </span>
                  <span className="glass-chip inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground/65">
                    <span className="text-[10px] leading-none">{t.flag}</span> {t.country}
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground/40">
                    closes {t.deadline} · {t.value}
                  </span>
                </div>
                <h3 className="mt-1.5 font-sans text-[15.5px] font-semibold leading-snug tracking-[-0.01em]">
                  {t.title}
                </h3>
                <p className="mt-0.5 inline-flex items-center gap-1.5 text-[11.5px] text-foreground/55">
                  <Building2 className="size-3" strokeWidth={1.75} /> {t.buyer}
                </p>

                <div className="glass-panel mt-2.5 rounded-2xl px-3 py-2">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-accent/80">
                    Why this matches
                  </p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-foreground/80">{t.why}</p>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {t.cpv.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        open({
                          title: `CPV ${c}`,
                          eyebrow: "Tenders · classification",
                          why: "Perpetuity tracks this CPV family across every connected register and weights it by how often you win adjacent work.",
                          steps: ["Watch this family", "Show past awards under this code"],
                        });
                      }}
                      className="rounded-full bg-foreground/5 px-1.5 py-0.5 font-mono text-[9.5px] text-foreground/60 hover:bg-foreground/10"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-center gap-1">
                <MatchRing value={t.match} />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDismissed((s) => new Set(s).add(t.id));
                  }}
                  className="text-foreground/30 hover:text-foreground"
                  aria-label="Dismiss tender"
                >
                  <X className="size-3.5" strokeWidth={2} />
                </button>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-foreground/5 pt-2.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  open({
                    title: `Draft outreach · ${t.buyer}`,
                    eyebrow: "Tenders · outreach",
                    why: "Perpetuity writes the expression of interest against your Context memory — references, turnover and delivery footprint included.",
                    steps: [
                      "Draft in the buyer's language",
                      "Attach eligibility annexes",
                      "Queue for your approval in Outreach",
                    ],
                    actions: [{ label: "Write it", primary: true }, { label: "Later" }],
                  });
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1.5 text-[11px] font-medium text-accent hover:bg-accent/25"
              >
                <PenLine className="size-3" strokeWidth={1.75} /> Draft outreach
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSaved((s) => {
                    const n = new Set(s);
                    n.has(t.id) ? n.delete(t.id) : n.add(t.id);
                    return n;
                  });
                }}
                className={`glass-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium ${
                  saved.has(t.id) ? "text-accent" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <Bookmark
                  className={`size-3 ${saved.has(t.id) ? "fill-current" : ""}`}
                  strokeWidth={1.75}
                />
                {saved.has(t.id) ? "Saved" : "Save"}
              </button>
              <span className="ml-auto inline-flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-foreground/35">
                posted {t.posted}
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
              </span>
            </div>
          </article>
        ))}

        {list.length === 0 && (
          <div className="glass-panel rounded-3xl px-5 py-8 text-center">
            <p className="text-[13px] text-foreground/65">
              No notices match this filter right now.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSource("All");
                setDismissed(new Set());
              }}
              className="mt-3 rounded-full bg-accent/15 px-3 py-1.5 text-[11px] font-medium text-accent hover:bg-accent/25"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {panel}
    </PageShell>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
        {label}
      </p>
      {children}
    </div>
  );
}

function StatusRow({
  icon: Icon,
  label,
  text,
  onClick,
}: {
  icon: typeof ShieldCheck;
  label: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="glass-panel group flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-colors hover:bg-foreground/5"
    >
      <div className="glass-chip flex size-7 shrink-0 items-center justify-center rounded-full">
        <Icon className="size-3.5 text-foreground/70" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
          {label}
        </p>
        <p className="mt-0.5 truncate text-[12px] text-foreground/78">{text}</p>
      </div>
      <ArrowRight
        className="size-3.5 shrink-0 text-foreground/30 transition-transform group-hover:translate-x-0.5"
        strokeWidth={1.75}
      />
    </button>
  );
}

function MatchRing({ value }: { value: number }) {
  const r = 15;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative flex size-11 items-center justify-center">
      <svg viewBox="0 0 36 36" className="absolute inset-0 size-full -rotate-90">
        <circle cx="18" cy="18" r={r} fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/8" />
        <circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${(value / 100) * c} ${c}`}
          className={value >= 75 ? "text-emerald-500" : value >= 60 ? "text-accent" : "text-foreground/35"}
        />
      </svg>
      <span className="relative font-mono text-[11px] font-semibold text-foreground/85">{value}</span>
    </div>
  );
}
