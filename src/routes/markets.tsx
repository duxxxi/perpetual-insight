import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, TrendingUp, TrendingDown, ArrowUpRight, Bell } from "lucide-react";
import { PageShell } from "@/components/app-shell";

export const Route = createFileRoute("/markets")({
  head: () => ({
    meta: [
      { title: "Markets — Perpetuity" },
      { name: "description", content: "Commodities, FX, and freight — interpreted for your book." },
      { property: "og:title", content: "Markets — Perpetuity" },
      { property: "og:description", content: "Commodities, FX, and freight — interpreted for your book." },
    ],
  }),
  component: MarketsPage,
});

type Quote = {
  sym: string;
  name: string;
  price: string;
  chg: number;
  spark: number[];
  unit: string;
  group: "Energy" | "Metals" | "Soft" | "FX" | "Freight";
};

const quotes: Quote[] = [
  { sym: "WTI", name: "Crude oil", price: "$79.83", chg: -5.95, spark: [86, 85, 84, 82, 81, 80, 79.83], unit: "/bbl", group: "Energy" },
  { sym: "BRENT", name: "Brent crude", price: "$87.33", chg: -2.94, spark: [90, 89.5, 89, 88.5, 88, 87.7, 87.33], unit: "/bbl", group: "Energy" },
  { sym: "NATGAS", name: "Natural gas", price: "$3.127", chg: 0.22, spark: [3.0, 3.05, 3.09, 3.10, 3.08, 3.12, 3.127], unit: "/MMBtu", group: "Energy" },
  { sym: "GOLD", name: "Gold", price: "$4,385", chg: 3.45, spark: [4200, 4230, 4260, 4290, 4330, 4360, 4385], unit: "/oz", group: "Metals" },
  { sym: "SILVER", name: "Silver", price: "$71.19", chg: 4.73, spark: [65, 66, 67, 68, 69, 70, 71.19], unit: "/oz", group: "Metals" },
  { sym: "COPPER", name: "Copper", price: "$6.494", chg: 0.76, spark: [6.35, 6.38, 6.41, 6.43, 6.45, 6.47, 6.494], unit: "/lb", group: "Metals" },
  { sym: "ALU", name: "Aluminium", price: "$2,241", chg: 0.80, spark: [2200, 2210, 2215, 2220, 2228, 2235, 2241], unit: "/t", group: "Metals" },
  { sym: "EUR/USD", name: "Euro · dollar", price: "1.1567", chg: 0.18, spark: [1.150, 1.151, 1.153, 1.154, 1.155, 1.156, 1.1567], unit: "", group: "FX" },
  { sym: "USD/AMD", name: "Dollar · dram", price: "388.50", chg: -0.12, spark: [389, 389.2, 388.9, 388.7, 388.6, 388.5, 388.50], unit: "", group: "FX" },
  { sym: "BDI", name: "Baltic Dry", price: "1,842", chg: -1.42, spark: [1880, 1875, 1865, 1858, 1850, 1846, 1842], unit: "", group: "Freight" },
];

const groups = ["All", "Energy", "Metals", "FX", "Freight"] as const;

function MarketsPage() {
  const [group, setGroup] = useState<(typeof groups)[number]>("All");
  const filtered = group === "All" ? quotes : quotes.filter((q) => q.group === group);

  return (
    <PageShell
      active="markets"
      eyebrow="Live · settled 14:40 UTC"
      title="that move your margins"
      accentWord="Markets"
      rightSlot={
        <div className="flex items-center gap-2">
          <div className="glass-panel flex items-center gap-0.5 rounded-full p-0.5">
            {groups.map((g) => (
              <button
                key={g}
                onClick={() => setGroup(g)}
                className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
                  group === g ? "bg-foreground text-background" : "text-foreground/55 hover:text-foreground"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          <button className="glass-panel inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-medium">
            <Bell className="size-3.5" strokeWidth={1.75} /> Alerts
          </button>
        </div>
      }
    >
      {/* AI interpretation */}
      <div className="glass-panel-strong relative mb-6 overflow-hidden rounded-3xl p-5">
        <div className="ai-iridescent absolute inset-x-5 top-0 h-px opacity-60" aria-hidden />
        <div className="flex items-start gap-3">
          <div className="ai-iridescent flex size-8 items-center justify-center rounded-full ring-1 ring-foreground/5">
            <Sparkles className="size-4 text-foreground/80" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
              What today's tape means for you
            </p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-foreground/85">
              WTI down 5.95% takes ~€0.18/kg out of your CIF Yerevan cost on the next softwood lot. Gold and silver both green on safe-haven flows — your treasury USDC hedge looks well-positioned. Baltic Dry softening 1.4% suggests freight will stay accommodative through Q3.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="rounded-full bg-foreground px-3.5 py-1.5 text-[11px] font-medium text-background">
                Update EuroMach quote
              </button>
              <button className="rounded-full bg-foreground/5 px-3.5 py-1.5 text-[11px] font-medium text-foreground/70">
                Set FX alert at 1.160
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quote grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((q) => (
          <QuoteCard key={q.sym} q={q} />
        ))}
      </div>
    </PageShell>
  );
}

function QuoteCard({ q }: { q: Quote }) {
  const up = q.chg >= 0;
  return (
    <article className="glass-panel-strong group rounded-2xl p-4 transition-all hover:translate-y-[-1px]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
            {q.group}
          </p>
          <p className="mt-0.5 font-mono text-[13px] font-semibold text-foreground/90">{q.sym}</p>
          <p className="text-[11px] text-foreground/55">{q.name}</p>
        </div>
        <button className="opacity-0 transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="size-3.5 text-foreground/45" />
        </button>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <p className="font-serif text-2xl italic tracking-tight">{q.price}</p>
        <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${up ? "text-emerald-600" : "text-rose-600"}`}>
          {up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
          {up ? "+" : ""}
          {q.chg.toFixed(2)}%
        </span>
      </div>
      <p className="text-[10px] text-foreground/40">{q.unit}</p>

      <Sparkline points={q.spark} up={up} />
    </article>
  );
}

function Sparkline({ points, up }: { points: number[]; up: boolean }) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const w = 200;
  const h = 40;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => {
      const x = i * step;
      const y = h - ((p - min) / (max - min || 1)) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const stroke = up ? "rgb(5 150 105)" : "rgb(225 29 72)";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-10 w-full" preserveAspectRatio="none">
      <path d={path} stroke={stroke} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
