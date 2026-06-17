import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Compass,
  Sparkles,
  TrendingUp,
  MapPin,
  ArrowUpRight,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
} from "lucide-react";
import { PageShell } from "@/components/app-shell";
import { usePerpetuityPanel } from "@/components/perpetuity-panel";

export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: "Opportunities — Perpetuity" },
      { name: "description", content: "Asymmetric trades surfaced by Perpetuity." },
      { property: "og:title", content: "Opportunities — Perpetuity" },
      { property: "og:description", content: "Asymmetric trades surfaced by Perpetuity." },
    ],
  }),
  component: OpportunitiesPage,
});

type Opp = {
  id: string;
  title: string;
  thesis: string;
  region: string;
  commodity: string;
  size: string;
  edge: string;
  confidence: number;
  horizon: string;
  signals: string[];
  plan: string[];
};

const opps: Opp[] = [
  {
    id: "o1",
    title: "Romanian softwood arbitrage · Yerevan",
    thesis:
      "REACH restrictions push Armenian buyers off CIS supply. Romanian mills hold spare Q3 capacity at 8–11% below current CIF Yerevan.",
    region: "RO → AM",
    commodity: "Softwood · 40t lots",
    size: "€180–240k",
    edge: "12–14% margin window",
    confidence: 82,
    horizon: "21 days",
    signals: [
      "EU Trade Bulletin · Jul 1 effective",
      "EuroMach board converting Friday",
      "WTI −5.95% softens freight",
    ],
    plan: [
      "Confirm 2 Romanian mill quotes (Perpetuity has draft RFQs)",
      "Lock freight on the Constanța → Yerevan corridor",
      "Push firm CIF to EuroMach + 3 other Armenian buyers",
      "Open Q3 facility line with Hannes (€220k headroom)",
    ],
  },
  {
    id: "o2",
    title: "USDC settlement for Caucasus buyers",
    thesis:
      "Two of your buyers asked about non-SWIFT settlement in 60 days. Bybit rail tested clean this morning. Offer USDC + 0.3% to lock margin.",
    region: "AM, GE",
    commodity: "Cross-border settlement",
    size: "$40–120k flows",
    edge: "Saves 3–5 banking days",
    confidence: 71,
    horizon: "This week",
    signals: [
      "Treasury test: 4.89 USDC cleared",
      "EUR/USD 1.1567 stable",
      "2 buyer requests in inbox",
    ],
    plan: [
      "Send signed USDC settlement addendum to the 2 buyers",
      "Pre-fund $15k working buffer on the rail",
      "Set Perpetuity to auto-confirm receipts within 2 min of arrival",
    ],
  },
  {
    id: "o3",
    title: "Reactivate Bilbao buyer cluster",
    thesis:
      "Maderas del Norte just reopened; 4 lapsed buyers in the same cluster show parallel restocking patterns. Single touch likely converts 2.",
    region: "ES",
    commodity: "Softwood · mixed grades",
    size: "€80–160k",
    edge: "Warm intros via Sofía",
    confidence: 64,
    horizon: "14 days",
    signals: ["Sofía replied today", "5 of 6 cluster reactivated last cycle"],
    plan: [
      "Ask Sofía for a 1-line intro nod to the 4",
      "Perpetuity drafts personalized re-engagement (ES)",
      "Hold a Bilbao day on the calendar in 3 weeks",
    ],
  },
];

const tabs = ["All", "Fresh", "Saved"] as const;

function OpportunitiesPage() {
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set(["o1"]));
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const { open, panel } = usePerpetuityPanel();

  const toggle = (id: string) =>
    setBookmarked((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const openOpp = (o: Opp) =>
    open({
      title: o.title,
      eyebrow: `Opportunity · ${o.region} · ${o.horizon}`,
      source: `${o.commodity} · size ${o.size} · edge ${o.edge} · confidence ${o.confidence}%`,
      why: o.thesis,
      steps: o.plan,
      artifacts: [
        { kind: "data", label: "Live signals · last 24h" },
        { kind: "crm", label: "Counterparty fit · ranked" },
        { kind: "doc", label: "Margin model · scenarios.xlsx" },
        { kind: "thread", label: "Related threads · 4" },
      ],
      actions: [
        { label: "Build the plan", primary: true },
        { label: "Track only" },
        { label: "Not for me" },
      ],
    });

  return (
    <PageShell
      active="opportunities"
      eyebrow="3 fresh · 1 expiring · 12 watching"
      title="that Perpetuity found while you slept"
      accentWord="Opportunities"
      rightSlot={
        <div className="glass-panel flex items-center gap-0.5 rounded-full p-0.5">
          {tabs.map((f) => (
            <button
              key={f}
              onClick={() => setTab(f)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
                tab === f ? "bg-foreground text-background" : "text-foreground/55 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      }
    >
      {/* Hero pick */}
      <div className="glass-panel-strong relative mb-6 overflow-hidden rounded-3xl p-6">
        <div className="ai-iridescent absolute inset-x-6 top-0 h-px opacity-60" aria-hidden />
        <div className="ai-iridescent absolute -right-20 -top-20 size-60 rounded-full opacity-30 blur-3xl" aria-hidden />
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="ai-iridescent flex size-7 items-center justify-center rounded-full ring-1 ring-foreground/5">
              <Sparkles className="size-3.5 text-foreground/80" strokeWidth={1.75} />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
              Perpetuity's top pick today
            </p>
          </div>
          <h2 className="mt-3 font-serif text-2xl italic tracking-tight md:text-3xl">
            {opps[0].title}
          </h2>
          <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-foreground/80">
            {opps[0].thesis}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => openOpp(opps[0])}
              className="rounded-full bg-foreground px-4 py-2 text-[12px] font-medium text-background hover:opacity-90"
            >
              Build a plan
            </button>
            <button
              type="button"
              onClick={() => {
                toggle(opps[0].id);
                open({
                  title: `Tracking · ${opps[0].title}`,
                  eyebrow: "Opportunity · track",
                  why: "Perpetuity will watch the underlying signals and ping you the moment confidence crosses 90% or the window starts to close.",
                  steps: [
                    "Saved to your Tracking list",
                    "Daily delta added to morning brief",
                    "Auto-create assignment when signals fire",
                  ],
                });
              }}
              className="glass-panel inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-medium hover:bg-foreground/5"
            >
              <Bookmark className="size-3.5" strokeWidth={1.75} /> Track it
            </button>
            <button
              type="button"
              onClick={() =>
                open({
                  title: `Why now · ${opps[0].title}`,
                  eyebrow: "Opportunity · reasoning",
                  why: "The window is tight because of three converging signals: regulatory deadline, board cycle, and freight softness. Miss any one and the math weakens.",
                  steps: [
                    "REACH Jul 1 effective date forces buyer search",
                    "EuroMach board converts Friday · need quote on the table",
                    "WTI −5.95% gives a 21-day freight tailwind",
                  ],
                  artifacts: [
                    { kind: "data", label: "Signal trace · last 7 days" },
                    { kind: "doc", label: "EU Trade Bulletin · annotated" },
                  ],
                })
              }
              className="text-[12px] text-foreground/55 hover:text-foreground"
            >
              Why now ↗
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {opps.map((o) => (
          <article
            key={o.id}
            className="glass-panel-strong group cursor-pointer rounded-3xl p-5 transition-all hover:translate-y-[-1px]"
            onClick={() => openOpp(o)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
                <Compass className="size-3" strokeWidth={1.75} /> {o.region} · {o.horizon}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(o.id);
                }}
                className={`flex size-7 items-center justify-center rounded-full transition-colors ${
                  bookmarked.has(o.id) ? "text-accent" : "text-foreground/40 hover:text-foreground"
                }`}
              >
                <Bookmark className={`size-3.5 ${bookmarked.has(o.id) ? "fill-accent" : ""}`} strokeWidth={1.75} />
              </button>
            </div>
            <h3 className="mt-2 font-serif text-xl italic leading-snug tracking-tight">{o.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-foreground/75">{o.thesis}</p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <Stat
                label="Size"
                value={o.size}
                onClick={(e) => {
                  e.stopPropagation();
                  open({
                    title: `Sizing · ${o.title}`,
                    eyebrow: "Opportunity · size",
                    why: `Range ${o.size} reflects realistic conversion of the named accounts at current margin, not theoretical TAM.`,
                    steps: ["Show per-account expected value", "Stress-test against 70/80/90% conversion"],
                  });
                }}
              />
              <Stat
                label="Edge"
                value={o.edge}
                onClick={(e) => {
                  e.stopPropagation();
                  open({
                    title: `Edge · ${o.title}`,
                    eyebrow: "Opportunity · edge",
                    why: `Your advantage: ${o.edge}. Perpetuity attributes it to a mix of timing, relationship density, and infra readiness.`,
                    steps: ["Break down edge components", "Show competitive overlap (who else can move?)"],
                  });
                }}
              />
              <Stat
                label="Confidence"
                value={`${o.confidence}%`}
                accent
                onClick={(e) => {
                  e.stopPropagation();
                  open({
                    title: `Confidence · ${o.confidence}%`,
                    eyebrow: "Opportunity · confidence",
                    why: `Confidence is the joint probability of: (1) the underlying signals holding, (2) you having capacity, (3) counterparties acting in-window.`,
                    steps: ["Show signal contributions", "Re-score with your assumptions"],
                  });
                }}
              />
            </div>

            {/* Confidence bar */}
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-foreground/5">
              <div
                className="ai-iridescent h-full"
                style={{ width: `${o.confidence}%` }}
                aria-hidden
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {o.signals.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    open({
                      title: `Signal · ${s}`,
                      eyebrow: `Opportunity · ${o.title}`,
                      why: "What this signal is, where it came from, and how Perpetuity is weighting it in the thesis.",
                      steps: [
                        "Show raw source (filing, market data, thread)",
                        "Show signal half-life and recent strength",
                        "Adjust weight or mute the signal",
                      ],
                    });
                  }}
                  className="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-2 py-0.5 text-[10px] text-foreground/65 hover:bg-foreground/10"
                >
                  <TrendingUp className="size-2.5" strokeWidth={2} />
                  {s}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-foreground/5 pt-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                <MapPin className="size-3" strokeWidth={1.75} /> {o.commodity}
              </div>
              <div className="flex items-center gap-1">
                <IconBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    open({
                      title: `Liked · ${o.title}`,
                      eyebrow: "Opportunity · feedback",
                      why: "Perpetuity will surface more opportunities like this one and sharpen the underlying signal weights.",
                      steps: ["Adjust similarity model", "Pin to your weekly review"],
                    });
                  }}
                >
                  <ThumbsUp className="size-3.5" strokeWidth={1.75} />
                </IconBtn>
                <IconBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    open({
                      title: `Not for me · ${o.title}`,
                      eyebrow: "Opportunity · feedback",
                      why: "Perpetuity will down-weight this pattern. Optionally tell it why — region, size, counterparty type.",
                      steps: ["Pick reason (optional)", "Suppress similar opportunities for 60d"],
                    });
                  }}
                >
                  <ThumbsDown className="size-3.5" strokeWidth={1.75} />
                </IconBtn>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openOpp(o);
                  }}
                  className="ml-1 inline-flex items-center gap-1 rounded-full bg-foreground/5 px-3 py-1.5 text-[11px] font-medium text-foreground/80 hover:bg-foreground/10"
                >
                  Explore <ArrowUpRight className="size-3" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {panel}
    </PageShell>
  );
}

function Stat({
  label,
  value,
  accent,
  onClick,
}: {
  label: string;
  value: string;
  accent?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="glass-panel rounded-xl px-3 py-2 text-left transition-colors hover:bg-foreground/[0.04]"
    >
      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground/40">{label}</p>
      <p className={`mt-0.5 text-[12px] font-medium ${accent ? "text-accent" : "text-foreground/90"}`}>{value}</p>
    </button>
  );
}

function IconBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex size-7 items-center justify-center rounded-full text-foreground/45 hover:bg-foreground/5 hover:text-foreground"
    >
      {children}
    </button>
  );
}
