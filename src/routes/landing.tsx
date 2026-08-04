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
  { label: "Intelligence Team", href: "#agents" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
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

function LandingPage() {
  useTheme();
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/15">
      <AmbientBackground />
      <CommodityTicker />
      <TopNav />

      <main className="mx-auto max-w-6xl px-5 pb-24 pt-10 animate-fade-in-up lg:px-8">
        <Hero />
        <Terminal />
        <StatStrip />
        <Platform />
        <AgentRoster />
        <Pricing />
        <CallToAction />
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

function Hero() {
  return (
    <section className="pt-10 pb-8 text-center">
      <div className="glass-chip mx-auto inline-flex items-center gap-2 rounded-full px-3 py-1">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
        </span>
        <span className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-foreground/55">
          Intelligence team operational · monitoring worldwide
        </span>
      </div>

      <h1 className="mx-auto mt-6 max-w-3xl text-balance text-[38px] font-semibold leading-[1.03] tracking-[-0.035em] md:text-[58px]">
        <span className="text-foreground/45">Your intelligence team.</span>{" "}
        <span className="text-silver-metallic">Always on.</span>
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-foreground/60">
        Perpetuity connects your world, then puts agents to work. Opportunities found,
        outreach drafted, risks flagged, deals planned. You command. It executes.
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
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
    </section>
  );
}

const prompt = "Find industrial buyers for rubber components in Germany and Austria";

function Terminal() {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(prompt.slice(0, i));
      if (i >= prompt.length) window.clearInterval(id);
    }, 26);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative">
      <div aria-hidden className="ask-glow pointer-events-none absolute inset-x-8 -top-4 bottom-0 -z-10" />
      <div className="glass-panel-strong ask-ring overflow-hidden rounded-3xl">
        {/* head */}
        <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-2.5">
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.24em] text-foreground/45">
            Perpetuity · intelligence terminal
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
            <span className="size-1 rounded-full bg-emerald-500" /> Live
          </span>
        </div>

        {/* breaking strip */}
        <div className="flex items-center gap-3 border-b border-border/60 bg-amber-500/[0.06] px-4 py-2">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            Breaking
          </span>
          <p className="min-w-0 flex-1 truncate text-[12px] text-foreground/65">
            ECB emergency rate signal detected · Frankfurt Bund yields +18bps · EUR/USD reaction imminent
          </p>
          <span className="hidden font-mono text-[10px] text-foreground/35 sm:inline">14:32 CET</span>
        </div>

        {/* prompt */}
        <div className="px-4 py-4">
          <div className="glass-chip flex items-center gap-2.5 rounded-2xl px-3 py-2.5">
            <div className="globe-orb size-5 shrink-0" aria-hidden />
            <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-foreground/75">
              {typed}
              <span className="ml-0.5 inline-block h-3 w-[6px] translate-y-[1px] animate-pulse bg-accent/70" />
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-accent-foreground">
              Run
            </span>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {agents.map((a) => (
              <div key={a.name} className="glass-chip rounded-2xl px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <a.icon className="size-3.5 shrink-0 text-accent" />
                    <span className="truncate text-[12px] font-medium">{a.name}</span>
                  </div>
                  <span className="shrink-0 rounded-full bg-secondary/70 px-1.5 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-foreground/55">
                    {a.state}
                  </span>
                </div>
                <p className="mt-1 truncate text-[11px] text-foreground/50">{a.line}</p>
                <p className="mt-1.5 font-mono text-[13px] font-semibold tabular-nums text-foreground/85">
                  {a.metric}{" "}
                  <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-foreground/35">
                    {a.unit}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatStrip() {
  return (
    <section className="mt-4 grid grid-cols-3 gap-2 md:grid-cols-6">
      {stats.map((s) => (
        <div key={s.label} className="glass-panel rounded-2xl px-3 py-2.5">
          <p className="font-mono text-[15px] font-semibold tabular-nums tracking-tight">{s.value}</p>
          <div className="mt-0.5 flex items-baseline justify-between gap-1">
            <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/40">{s.label}</span>
            <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400">{s.delta}</span>
          </div>
        </div>
      ))}
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
