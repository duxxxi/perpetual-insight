import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Radar,
  LineChart,
  ShieldCheck,
  Send,
  Sparkles,
  Globe,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { AmbientBackground, CommodityTicker, AppFooter } from "@/components/app-shell";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "Perpetuity — Your Intelligence Team. Always On." },
      {
        name: "description",
        content:
          "Perpetuity connects your world, then puts agents to work: opportunities found, outreach drafted, risks flagged, deals planned.",
      },
      { property: "og:title", content: "Perpetuity — Your Intelligence Team. Always On." },
      {
        property: "og:description",
        content:
          "An agentic intelligence layer for exporters, manufacturers and distributors. You command. It executes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

/* ---------------- data ---------------- */

const nav = [
  { label: "Platform", href: "#platform" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Intelligence Team", href: "#agents" },
  { label: "Pricing", href: "#pricing" },

];

const agents = [
  {
    icon: Radar,
    name: "Opportunity Scout",
    line: "Scanning 34 EU procurement sources · 128 new today",
    metric: "2,847",
    unit: "tenders",
    state: "SCANNING",
  },
  {
    icon: LineChart,
    name: "Market Analyst",
    line: "Automotive demand rising in DE & CEE · high signal",
    metric: "35",
    unit: "markets",
    state: "ACTIVE",
  },
  {
    icon: ShieldCheck,
    name: "Compliance Watch",
    line: "New EU export regulation detected · 1 alert pending",
    metric: "17",
    unit: "updates",
    state: "1 ALERT",
  },
  {
    icon: Send,
    name: "Outreach Agent",
    line: "12 distributor drafts ready for your approval",
    metric: "284",
    unit: "drafted",
    state: "12 READY",
  },
];

const stats = [
  { value: "2,847", label: "Tenders", delta: "+128" },
  { value: "1,126", label: "Matches", delta: "+73" },
  { value: "23", label: "Alerts", delta: "+5" },
  { value: "789", label: "Signals", delta: "+34" },
  { value: "12K+", label: "Contacts", delta: "+158" },
  { value: "40+", label: "Languages", delta: "100%" },
];

const platform = [
  {
    title: "Connect your world",
    body: "Mail, CRM, drive, ERP and calendar are ingested once, then kept warm. Perpetuity reads everything so you never brief it twice.",
  },
  {
    title: "Agents that execute",
    body: "Scouting, analysis, compliance and outreach run continuously. Work arrives as tasks, drafts and briefs — never as another dashboard.",
  },
  {
    title: "Signal, not noise",
    body: "World markets, Polymarket odds, tenders and news are chewed down to the handful of moves that change your quarter.",
  },
];

const pricing = [
  {
    name: "Operator",
    price: "€490",
    cadence: "per seat / month",
    body: "One intelligence team, three connected sources, daily brief and outreach drafting.",
    features: ["Daily brief", "3 connectors", "Outreach drafting", "Email support"],
  },
  {
    name: "Company",
    price: "€1,900",
    cadence: "per month",
    body: "The full agent roster across your commercial org, with tender scouting and compliance watch.",
    features: ["All agents", "Unlimited connectors", "Tender scouting", "Compliance watch", "Shared threads"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Talk to us",
    cadence: "bespoke",
    body: "Private deployment, custom agents and integration into your existing intelligence stack.",
    features: ["Private deployment", "Custom agents", "SSO & audit", "Named engineer"],
  },
];

/* ---------------- page ---------------- */

const editorial = [
  { value: "180+", label: "Countries monitored" },
  { value: "24/7", label: "Surveillance" },
  { value: "50K+", label: "Active tenders" },
  { value: "5", label: "AI agents" },
  { value: "40+", label: "Languages" },
  { value: "12K+", label: "Buyer contacts" },
  { value: "24/7", label: "Correspondence" },
];

const trusted = [
  "Matador Group",
  "ROKOSAN",
  "Chemosvit Fibrochem",
  "GEVORKYAN",
  "ESSEL",
  "InoBat",
  "Fatra Napajedla",
  "Continental Matador",
  "Embraco Slovakia",
  "Kia Slovakia",
  "Whirlpool Slovakia",
  "Slovnaft",
  "U.S. Steel Košice",
  "ZKW Group",
  "Leoni Slovakia",
];

/* ---------------- page ---------------- */

function LandingPage() {
  useTheme();
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/15">
      <AmbientBackground />
      <CommodityTicker />
      <TopNav />

      <main className="pb-24 animate-fade-in-up">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <HeroSplit />
        </div>
        <EditorialStats />
        <TrustedBy />
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Platform />
          <HowItWorks />
        </div>
        <IntelSection />
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <AgentRoster />
          <Pricing />
          <CallToAction />
        </div>

      </main>

      <AppFooter />
    </div>
  );
}

function TopNav() {
  return (
    <header className="sticky top-0 z-40 px-5 pt-3 lg:px-8">
      <nav className="glass-panel mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-3 py-2">
        <div className="flex items-center gap-2.5">
          <div className="globe-orb size-5" aria-hidden />
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.32em] text-foreground/60">
            Perpetuity
          </span>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="rounded-full px-3 py-1.5 text-[12px] font-medium text-foreground/60 transition-colors hover:bg-secondary/60 hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Link
            to="/"
            className="glass-chip hidden rounded-full px-3 py-1.5 text-[11px] font-medium text-foreground/70 transition-colors hover:text-foreground sm:inline-flex"
          >
            Sign in
          </Link>
          <a
            href="#cta"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[11px] font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Book a demo <ArrowRight className="size-3" />
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ---------------- hero (split: editorial left, terminal right) ---------------- */

function HeroSplit() {
  return (
    <section className="grid items-center gap-8 pt-12 pb-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
      <div>
        <div className="glass-chip inline-flex items-center gap-2 rounded-full px-3 py-1">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-foreground/55">
            Intelligence team operational · monitoring worldwide
          </span>
        </div>

        <h1 className="mt-6 text-balance font-serif text-[44px] font-normal leading-[1.02] tracking-[-0.02em] md:text-[62px]">
          <span className="text-foreground/90">Your Intelligence Team.</span>
          <br />
          <span className="text-silver-metallic italic">Always On.</span>
        </h1>

        <p className="mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-foreground/60">
          Perpetuity connects your world, then puts agents to work. Opportunities found,
          outreach drafted, risks flagged, deals planned. You command. It executes.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Book a demo <ArrowUpRight className="size-3.5" />
          </a>
          <a
            href="#platform"
            className="glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-foreground/75 transition-colors hover:text-foreground"
          >
            <Play className="size-3.5" /> Watch demo
          </a>
        </div>
      </div>

      <Terminal />
    </section>
  );
}

const queries = [
  "Find industrial buyers for rubber components in Germany and Austria",
  "Scan EU tenders for aluminum sheet procurement in CEE",
  "Alert me if sanctions shifts affect my MENA supply chain",
];

const sparks: Record<string, { d: string; tone: string }> = {
  "Opportunity Scout": { d: "M0 14 L10 12 L20 13 L30 8 L40 9 L50 4 L60 2", tone: "text-emerald-400" },
  "Market Analyst": { d: "M0 12 L10 13 L20 9 L30 11 L40 6 L50 7 L60 3", tone: "text-sky-400" },
  "Compliance Watch": { d: "M0 6 L10 8 L20 5 L30 10 L40 8 L50 12 L60 9", tone: "text-amber-400" },
  "Outreach Agent": { d: "M0 15 L10 13 L20 11 L30 9 L40 7 L50 5 L60 2", tone: "text-orange-300" },
};

const stateTone: Record<string, string> = {
  SCANNING: "bg-emerald-500/12 text-emerald-300 ring-emerald-400/20",
  ACTIVE: "bg-sky-500/12 text-sky-300 ring-sky-400/20",
  "1 ALERT": "bg-rose-500/12 text-rose-300 ring-rose-400/20",
  "12 READY": "bg-amber-500/12 text-amber-300 ring-amber-400/20",
};

function Terminal() {
  const [typed, setTyped] = useState("");
  const [qIdx, setQIdx] = useState(0);

  useEffect(() => {
    const text = queries[qIdx];
    setTyped("");
    let i = 0;
    let hold: number | undefined;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        hold = window.setTimeout(() => setQIdx((n) => (n + 1) % queries.length), 2600);
      }
    }, 26);
    return () => {
      window.clearInterval(id);
      if (hold) window.clearTimeout(hold);
    };
  }, [qIdx]);


  return (
    <div className="relative">
      <div aria-hidden className="ask-glow pointer-events-none absolute inset-x-6 -top-4 bottom-2 -z-10" />
      <div className="overflow-hidden rounded-[22px] bg-[oklch(0.19_0.02_255)] shadow-[0_40px_90px_-40px_oklch(0.2_0.03_255/0.65)] ring-1 ring-white/[0.07]">
        {/* window chrome */}
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-rose-400/70" />
            <span className="size-2 rounded-full bg-amber-400/70" />
            <span className="size-2 rounded-full bg-emerald-400/70" />
          </div>
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.24em] text-white/35">
            Perpetuity · intelligence terminal
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            <span className="size-1 rounded-full bg-emerald-400" /> Live
          </span>
        </div>

        <div className="space-y-3 p-3.5">
          {/* breaking strip */}
          <div className="flex items-start gap-2.5 rounded-xl bg-white/[0.03] px-3 py-2 ring-1 ring-white/[0.05]">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-rose-400" />
            <p className="min-w-0 flex-1 font-mono text-[11px] leading-relaxed text-white/60">
              <span className="font-semibold text-white/80">⚡ BREAKING</span> — ECB emergency rate
              signal detected · Frankfurt Bund yields +18bps · EUR/USD reaction imminent
            </p>
            <span className="hidden shrink-0 font-mono text-[9px] text-white/25 sm:inline">14:32 CET</span>
          </div>

          {/* prompt */}
          <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] px-3 py-2.5 ring-1 ring-white/[0.06]">
            <div className="globe-orb size-4 shrink-0" aria-hidden />
            <span className="min-w-0 flex-1 truncate font-mono text-[11.5px] text-white/70">
              {typed}
              <span className="ml-0.5 inline-block h-3 w-[6px] translate-y-[1px] animate-pulse bg-white/50" />
            </span>
            <span className="rounded-md bg-orange-500/85 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white">
              Run
            </span>
          </div>

          <p className="px-1 font-mono text-[9px] font-medium uppercase tracking-[0.24em] text-white/25">
            Agent activity · live
          </p>

          {/* agent rows */}
          <div className="space-y-1.5">
            {agents.map((a) => {
              const sp = sparks[a.name];
              return (
                <div
                  key={a.name}
                  className="flex items-center gap-3 rounded-xl bg-white/[0.025] px-3 py-2.5 ring-1 ring-white/[0.05] transition-colors hover:bg-white/[0.05]"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.06]">
                    <a.icon className="size-3.5 text-white/60" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-medium text-white/85">{a.name}</p>
                    <p className="truncate text-[10.5px] text-white/40">{a.line}</p>
                  </div>
                  <div className="hidden shrink-0 text-right sm:block">
                    <p className="font-mono text-[12px] font-semibold tabular-nums text-white/85">{a.metric}</p>
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">{a.unit}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.14em] ring-1 ${
                      stateTone[a.state] ?? "bg-white/[0.06] text-white/60 ring-white/10"
                    }`}
                  >
                    {a.state}
                  </span>
                  {sp ? (
                    <svg
                      viewBox="0 0 60 18"
                      className={`hidden h-4 w-14 shrink-0 md:block ${sp.tone}`}
                      fill="none"
                      aria-hidden
                    >
                      <path d={sp.d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* stat grid */}
          <div className="grid grid-cols-3 gap-1.5 md:grid-cols-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg bg-white/[0.03] px-2 py-2 text-center ring-1 ring-white/[0.05]"
              >
                <p className="font-mono text-[13px] font-semibold tabular-nums text-white/85">{s.value}</p>
                <p className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-white/30">{s.label}</p>
                <p className="font-mono text-[8px] text-emerald-300/80">{s.delta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- editorial stat rail ---------------- */

function EditorialStats() {
  return (
    <section className="border-y border-border/60 bg-secondary/25">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-5 px-5 py-7 sm:grid-cols-4 lg:grid-cols-7 lg:px-8">
        {editorial.map((e, i) => (
          <div
            key={e.label}
            className={`px-3 ${i > 0 ? "lg:border-l lg:border-border/60" : ""}`}
          >
            <p className="font-serif text-[26px] leading-none tracking-[-0.01em] text-foreground/85">
              {e.value}
            </p>
            <p className="mt-1.5 font-mono text-[8.5px] font-medium uppercase tracking-[0.18em] text-foreground/40">
              {e.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- trusted-by marquee ---------------- */

function TrustedRow() {
  return (
    <div className="flex shrink-0 items-center">
      {trusted.map((t) => (
        <span
          key={t}
          className="border-l border-border/50 px-7 font-serif text-[17px] whitespace-nowrap text-foreground/35"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function TrustedBy() {
  return (
    <section className="border-b border-border/60 py-7">
      <p className="mb-5 text-center font-mono text-[8.5px] font-semibold uppercase tracking-[0.28em] text-foreground/35">
        Trusted by exporters across CEE, MENA and beyond
      </p>
      <div className="ticker-mask overflow-hidden">
        <div className="animate-ticker flex whitespace-nowrap">
          <TrustedRow />
          <TrustedRow />
        </div>
      </div>
    </section>
  );
}


function SectionHead({ kicker, title, body }: { kicker: string; title: string; body?: string }) {
  return (
    <div className="mb-4">
      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.26em] text-foreground/35">
        {kicker}
      </p>
      <h2 className="mt-2 text-[24px] font-semibold leading-tight tracking-[-0.03em] md:text-[30px]">
        <span className="text-silver-metallic">{title}</span>
      </h2>
      {body ? <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-foreground/55">{body}</p> : null}
    </div>
  );
}

function Platform() {
  return (
    <section id="platform" className="scroll-mt-24 pt-14">
      <SectionHead
        kicker="Platform"
        title="One layer over everything you already run"
        body="Not another tool to check. An agentic layer that consumes your stack and returns decisions."
      />
      <div className="grid gap-2 md:grid-cols-3">
        {platform.map((p) => (
          <div key={p.title} className="glass-panel rounded-2xl p-4">
            <div className="glass-panel-strong mb-3 flex size-8 items-center justify-center rounded-xl">
              <Sparkles className="size-3.5 text-accent" />
            </div>
            <h3 className="text-[14px] font-medium tracking-[-0.01em]">{p.title}</h3>
            <p className="mt-1.5 text-[12px] leading-relaxed text-foreground/55">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AgentRoster() {
  return (
    <section id="agents" className="scroll-mt-24 pt-14">
      <SectionHead
        kicker="Intelligence team"
        title="Agents with a mandate, not a chat window"
        body="Each agent owns a beat, works continuously and reports in your language."
      />
      <div className="glass-panel divide-y divide-border/60 rounded-2xl">
        {agents.map((a) => (
          <div key={a.name} className="flex items-center gap-3 px-4 py-3">
            <div className="glass-chip flex size-8 shrink-0 items-center justify-center rounded-xl">
              <a.icon className="size-3.5 text-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium">{a.name}</p>
              <p className="truncate text-[11px] text-foreground/50">{a.line}</p>
            </div>
            <span className="hidden font-mono text-[11px] font-semibold tabular-nums text-foreground/70 sm:inline">
              {a.metric}
            </span>
            <span className="rounded-full bg-secondary/70 px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-foreground/55">
              {a.state}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 pt-14">
      <SectionHead kicker="Pricing" title="Priced per outcome, not per dashboard" />
      <div className="grid gap-2 md:grid-cols-3">
        {pricing.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl p-4 ${p.featured ? "glass-panel-strong ask-ring" : "glass-panel"}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
                {p.name}
              </span>
              {p.featured ? (
                <span className="rounded-full bg-accent/12 px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-accent">
                  Most chosen
                </span>
              ) : null}
            </div>
            <p className="mt-3 text-[24px] font-semibold tracking-[-0.03em]">{p.price}</p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-foreground/35">{p.cadence}</p>
            <p className="mt-3 text-[12px] leading-relaxed text-foreground/55">{p.body}</p>
            <ul className="mt-3 space-y-1.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-[12px] text-foreground/65">
                  <span className="size-1 rounded-full bg-accent" /> {f}
                </li>
              ))}
            </ul>
            <a
              href="#cta"
              className={`mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-semibold transition-opacity hover:opacity-90 ${
                p.featured
                  ? "bg-accent text-accent-foreground"
                  : "glass-chip text-foreground/75"
              }`}
            >
              {p.price === "Talk to us" ? "Contact sales" : "Start"} <ArrowRight className="size-3" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section id="cta" className="scroll-mt-24 pt-14" >
      <div className="glass-panel-strong ask-ring relative overflow-hidden rounded-3xl px-6 py-10 text-center">
        <div aria-hidden className="ask-glow pointer-events-none absolute inset-0 -z-10" />
        <div className="mx-auto mb-4 flex items-center justify-center gap-2">
          <Globe className="size-3.5 text-accent" />
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-foreground/45">
            180+ countries · 24/7 surveillance · 50K+ active tenders
          </span>
        </div>
        <h2 className="mx-auto max-w-lg text-balance text-[26px] font-semibold leading-tight tracking-[-0.03em] md:text-[34px]">
          <span className="text-silver-metallic">Put your intelligence team to work.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-foreground/55">
          A 30-minute session on your markets, your buyers and your data. You leave with a live brief.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <a
            href="mailto:hello@perpetuity.works"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Book a demo <ArrowUpRight className="size-3.5" />
          </a>
          <Link
            to="/"
            className="glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-foreground/75 transition-colors hover:text-foreground"
          >
            See the terminal
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- how it works: connect / command / execute ---------------- */

const steps = [
  {
    title: "Connect.",
    body: "Your inbox, contacts, CRM and calendar, in minutes. Perpetuity reads your world once and keeps it warm.",
  },
  {
    title: "Command.",
    body: "Agents surface the opportunity, draft the outreach, build the plan. Work arrives already half done.",
  },
  {
    title: "Execute.",
    body: "You approve in one click. Perpetuity does the rest, and never sleeps.",
  },
];

type CapTask = { label: string; state: "done" | "active" | "queued" };

const capabilities: { name: string; status: string; tone: string; tasks: CapTask[]; wide?: boolean }[] = [
  {
    name: "Opportunity Scout",
    status: "Live",
    tone: "text-emerald-500",
    tasks: [
      { label: "Scanned 2,847 EU tenders today", state: "done" },
      { label: "Ranked by relevance score", state: "done" },
      { label: "Scanning World Bank · 4,210 active", state: "active" },
      { label: "UN procurement queue loading", state: "queued" },
    ],
  },
  {
    name: "Market Analyst",
    status: "Live",
    tone: "text-emerald-500",
    tasks: [
      { label: "35 markets analysed today", state: "done" },
      { label: "Polymarket signals processed", state: "done" },
      { label: "Competitor price intelligence", state: "active" },
      { label: "LME metals feed active", state: "queued" },
    ],
  },
  {
    name: "Outreach Agent",
    status: "Live",
    tone: "text-emerald-500",
    tasks: [
      { label: "12 draft emails ready", state: "done" },
      { label: "Translated to German & Polish", state: "done" },
      { label: "Awaiting your approval", state: "active" },
      { label: "Follow-up schedule set", state: "queued" },
    ],
  },
  {
    name: "Compliance Watch",
    status: "Live · 1 alert",
    tone: "text-amber-500",
    tasks: [
      { label: "EU sanctions lists monitored", state: "done" },
      { label: "Export controls checked", state: "done" },
      { label: "New CBAM regulation detected", state: "active" },
      { label: "Customs rule updates pending", state: "queued" },
    ],
  },
  {
    name: "Organiser Agent",
    status: "Via Telegram",
    tone: "text-sky-500",
    wide: true,
    tasks: [
      { label: "Invoice #4821 filed and archived", state: "done" },
      { label: "156 documents organised this month", state: "done" },
      { label: "Sample room inventory updated from a photo", state: "done" },
      { label: "Customer correspondence logged", state: "done" },
      { label: "Customs documentation for DE shipment", state: "active" },
      { label: "Warehouse inventory sync pending", state: "queued" },
    ],
  },
];

function CapTaskRow({ t }: { t: CapTask }) {
  const dot =
    t.state === "done"
      ? "bg-emerald-500"
      : t.state === "active"
        ? "bg-accent animate-pulse"
        : "bg-foreground/20";
  const text =
    t.state === "queued" ? "text-foreground/35" : t.state === "active" ? "text-foreground/75" : "text-foreground/55";
  return (
    <li className={`flex items-center gap-2 text-[11.5px] ${text}`}>
      <span className={`size-1.5 shrink-0 rounded-full ${dot}`} />
      <span className="truncate">{t.label}</span>
    </li>
  );
}

function HowItWorks() {
  return (
    <section className="scroll-mt-24 pt-14">
      <SectionHead
        kicker="Always-on intelligence"
        title="Stop reacting. Start closing."
        body="Perpetuity monitors markets, suppliers and customers across the globe, drafts the outreach, builds the deal plan and flags the risk."
      />
      <div className="grid gap-3 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <div className="glass-panel divide-y divide-border/60 rounded-2xl">
          {steps.map((s) => (
            <div key={s.title} className="px-4 py-3.5">
              <p className="text-[13px] font-medium tracking-[-0.01em]">{s.title}</p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-foreground/50">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {capabilities.map((c) => (
            <div key={c.name} className={`glass-panel rounded-2xl p-3.5 ${c.wide ? "sm:col-span-2" : ""}`}>
              <div className="mb-2.5 flex items-center justify-between gap-2">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                  {c.name}
                </p>
                <span className={`inline-flex items-center gap-1.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.14em] ${c.tone}`}>
                  <span className="size-1 rounded-full bg-current" /> {c.status}
                </span>
              </div>
              <ul className={`space-y-1.5 ${c.wide ? "sm:grid sm:grid-cols-2 sm:gap-x-4 sm:space-y-0 sm:[&>li]:py-0.5" : ""}`}>
                {c.tasks.map((t) => (
                  <CapTaskRow key={t.label} t={t} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- dark live-intelligence section ---------------- */

const intelPoints = [
  {
    title: "Find the opportunity.",
    body: "Markets, suppliers and customers watched around the clock. The deal you'd have missed, surfaced before it's gone.",
  },
  {
    title: "Do the work.",
    body: "Outreach drafted, deal plans built, meetings prepped — grounded in your real data, ready for approval.",
  },
  {
    title: "Guard the downside.",
    body: "Compliance shifts, margin risks and red flags caught early, so nothing slips through.",
  },
];

const briefAlerts = [
  {
    time: "14:32",
    tone: "bg-rose-500/[0.07] ring-rose-400/15",
    label: "ECB Signal:",
    body: "Emergency rate indicators firing in Frankfurt. Bund yields +18bps. EUR/USD reaction in 30 min — affects export financing costs.",
  },
  {
    time: "13:15",
    tone: "bg-amber-500/[0.07] ring-amber-400/15",
    label: "Tender Alert:",
    body: "Municipal fleet maintenance, Annaberg-Buchholz DE. Relevance score 82/100. Deadline in 14 days.",
  },
];

const briefItems = [
  { dot: "bg-emerald-400", body: "Reuters: German automotive output +4.1% April — component demand strengthening across CEE" },
  { dot: "bg-amber-400", body: "Handelsblatt (DE): Schaeffler announces Brașov expansion — local supplier search begins Q3" },
  { dot: "bg-orange-300", body: "中国汽车报 (CN): EV tariff retaliation escalating — EU parts supply-chain implications for CEE exporters" },
  { dot: "bg-violet-400", body: "Polymarket: ECB June cut probability 71% · EUR/USD pricing signal for export contracts" },
];

function IntelSection() {
  return (
    <section id="intelligence" className="mt-16 scroll-mt-24 border-y border-border/60 bg-[oklch(0.19_0.02_255)] py-14">
      <div className="mx-auto grid max-w-6xl items-start gap-8 px-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-8">
        <div>
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.26em] text-white/35">
            A live intelligence terminal
          </p>
          <h2 className="mt-2 font-serif text-[30px] font-normal leading-[1.06] tracking-[-0.02em] text-white/90 md:text-[38px]">
            Designed to notice
            <br />
            <span className="italic text-white/45">what others miss.</span>
          </h2>
          <p className="mt-4 max-w-md text-[13px] leading-relaxed text-white/50">
            Bloomberg tells you what happened. We tell you what it means for your business — and then handle it.
            While you're away. While you're busy. While you rest.
          </p>

          <div className="mt-7 space-y-4">
            {intelPoints.map((p) => (
              <div key={p.title} className="flex gap-3">
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/25">
                  <svg viewBox="0 0 10 10" className="size-2.5 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M2 5l2.5 2.5L8 2.5" strokeLinecap="round" />
                  </svg>
                </span>
                <div>
                  <p className="text-[12.5px] font-medium text-white/80">{p.title}</p>
                  <p className="mt-0.5 max-w-sm text-[11.5px] leading-relaxed text-white/40">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[20px] bg-white/[0.035] ring-1 ring-white/[0.07]">
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-2.5">
            <span className="font-mono text-[9.5px] font-medium uppercase tracking-[0.2em] text-white/40">
              Live intelligence · 17 May 2026
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
              <span className="size-1 rounded-full bg-emerald-400" /> Streaming
            </span>
          </div>

          <div className="space-y-2 p-3.5">
            {briefAlerts.map((a) => (
              <div key={a.time} className={`flex items-start gap-2.5 rounded-xl px-3 py-2 ring-1 ${a.tone}`}>
                <span className="mt-0.5 shrink-0 font-mono text-[9.5px] text-white/35">{a.time}</span>
                <p className="min-w-0 flex-1 text-[11.5px] leading-relaxed text-white/60">
                  <span className="font-semibold text-white/85">{a.label}</span> {a.body}
                </p>
              </div>
            ))}

            <div className="my-1 h-px bg-white/[0.06]" />

            <div className="space-y-1.5">
              {briefItems.map((b) => (
                <div key={b.body} className="flex items-start gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/[0.03]">
                  <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${b.dot}`} />
                  <p className="min-w-0 flex-1 text-[11.5px] leading-relaxed text-white/50">{b.body}</p>
                </div>
              ))}
            </div>

            <p className="flex items-center gap-1.5 border-t border-white/[0.06] pt-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/25">
              <Globe className="size-2.5" /> Compiled from 18 sources · 4 languages · updated 14 minutes ago
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
