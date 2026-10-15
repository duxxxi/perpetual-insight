import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { agents, editorial, trusted, platform, steps, capabilities, intelPoints, briefAlerts, briefItems, queries, stats } from "@/lib/landing-content";

export function PaintedTerminal() {
  const [query, setQuery] = useState(0);
  return <div className="about-work-window overflow-hidden rounded-lg text-left">
    <div className="flex items-center justify-between border-b border-border px-4 py-3"><span className="about-eyebrow">Perpetuity · Intelligence terminal</span><span className="flex items-center gap-1.5 text-[10px] text-accent"><span className="size-1.5 rounded-full bg-accent" /> Always on</span></div>
    <div className="p-4 sm:p-5">
      <div className="flex items-center gap-3 border-b border-border pb-4"><span className="globe-orb size-5 shrink-0" aria-hidden /><p className="min-w-0 flex-1 text-[12px] leading-relaxed">{queries[query]}</p><Button asChild size="icon" className="size-8 shrink-0 rounded-full"><Link to="/" aria-label="Open Ask Perpetuity"><ArrowUpRight className="size-3.5" /></Link></Button></div>
      <div className="flex flex-wrap gap-1.5 py-3" aria-label="Example commands">{["Find buyers", "Scan tenders", "Watch risk"].map((label, i) => <Button key={label} variant="ghost" size="sm" aria-pressed={query === i} onClick={() => setQuery(i)} className={`h-7 rounded-full px-3 text-[10px] ${query === i ? "bg-card text-foreground" : "text-muted-foreground"}`}>{label}</Button>)}</div>
      <div className="divide-y divide-border">{agents.map(agent => <div key={agent.name} className="flex items-center gap-3 py-3"><agent.icon className="size-4 shrink-0 text-accent" /><div className="min-w-0 flex-1"><p className="text-[12px] font-medium">{agent.name}</p><p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">{agent.line}</p></div><span className="hidden shrink-0 text-right font-mono text-[12px] sm:block">{agent.metric}<span className="block text-[8px] text-muted-foreground">{agent.unit}</span></span></div>)}</div>
      <div className="mt-3 grid grid-cols-3 gap-4 border-t border-border pt-4 sm:grid-cols-6">{stats.map(stat => <div key={stat.label}><p className="font-mono text-[13px]">{stat.value}</p><p className="mt-1 text-[9px] text-muted-foreground">{stat.label}</p></div>)}</div>
    </div>
  </div>;
}

function FeatureHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return <div className="mb-9 max-w-2xl"><p className="about-eyebrow">{eyebrow}</p><h2 className="about-section-title mt-4">{title}</h2><p className="mt-4 text-[13px] leading-[1.85] text-muted-foreground">{body}</p></div>;
}

export function PaintedLandingFeatures() {
  const [selectedAgent, setSelectedAgent] = useState(0);
  const capability = capabilities[selectedAgent] ?? capabilities[0];
  const [briefView, setBriefView] = useState<"all" | "alerts">("all");
  return <>
    <section className="border-y border-border"><div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-5 py-8 sm:grid-cols-4 lg:grid-cols-7">{editorial.map(item => <div key={item.label} className="px-3"><p className="font-serif text-[26px]">{item.value}</p><p className="mt-1 text-[10px] text-muted-foreground">{item.label}</p></div>)}</div></section>
    <section className="overflow-hidden border-b border-border py-7"><p className="about-eyebrow px-5 text-center">Trusted by exporters across CEE, MENA and beyond</p><div className="ticker-mask mt-5 overflow-hidden"><div className="about-trusted-track flex w-max">{[0, 1].map(copy => <div key={copy} aria-hidden={copy === 1} className="flex shrink-0">{trusted.map(name => <span key={name} className="border-l border-border px-7 font-serif text-[16px] text-muted-foreground">{name}</span>)}</div>)}</div></div></section>
    <section id="platform" className="mx-auto max-w-6xl scroll-mt-8 px-5 py-16 lg:px-8">
      <FeatureHeading eyebrow="Platform" title="One layer over everything you already run" body="Not another tool to check. An agentic layer that consumes your stack and returns decisions." />
      <div className="grid gap-8 md:grid-cols-3">{platform.map((item, i) => <article key={item.title} className="border-t border-border pt-5"><div className="flex items-center justify-between"><Sparkles className="size-4 text-accent" /><span className="about-eyebrow">0{i + 1}</span></div><h3 className="mt-5 text-[16px] font-medium">{item.title}</h3><p className="mt-3 text-[12px] leading-[1.85] text-muted-foreground">{item.body}</p></article>)}</div>
    </section>
    <section id="agents" className="about-principles scroll-mt-8 border-y border-border"><div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
      <FeatureHeading eyebrow="Always-on intelligence" title="Stop reacting. Start closing." body="Perpetuity monitors markets, suppliers and customers across the globe, drafts the outreach, builds the deal plan and flags the risk." />
      <div className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr]"><div className="divide-y divide-border">{steps.map((step, i) => <div key={step.title} className="flex gap-4 py-5 first:pt-0"><span className="about-eyebrow pt-1">0{i + 1}</span><div><h3 className="text-[17px] font-medium">{step.title}</h3><p className="mt-2 text-[12px] leading-[1.8] text-muted-foreground">{step.body}</p></div></div>)}</div>
        <div><div className="mb-5 flex flex-wrap gap-1.5" role="tablist" aria-label="Intelligence agents">{capabilities.map((agent, i) => <Button key={agent.name} id={`agent-tab-${i}`} role="tab" aria-selected={selectedAgent === i} aria-controls="agent-work" onClick={() => setSelectedAgent(i)} variant="ghost" size="sm" className={`h-8 rounded-full px-3 text-[11px] ${selectedAgent === i ? "bg-card text-foreground" : "text-muted-foreground"}`}>{agent.name}</Button>)}</div>
          <div id="agent-work" role="tabpanel" aria-labelledby={`agent-tab-${selectedAgent}`} className="about-work-window min-h-[265px] rounded-lg p-5 sm:p-7"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-[17px] font-medium">{capability.name}</h3><span className="about-eyebrow text-accent">{capability.status}</span></div><ul className="mt-6 space-y-4">{capability.tasks.map(task => <li key={task.label} className="flex items-start gap-3 text-[12px] leading-relaxed"><span className="mt-0.5 flex size-4 shrink-0 items-center justify-center">{task.state === "done" ? <Check className="size-3.5 text-accent" /> : <span className={`size-1.5 rounded-full ${task.state === "active" ? "bg-accent motion-safe:animate-pulse" : "bg-muted-foreground/40"}`} />}</span><span className={task.state === "queued" ? "text-muted-foreground" : "text-foreground"}>{task.label}</span></li>)}</ul></div>
        </div>
      </div>
      <div className="mt-12 border-t border-border pt-8"><h3 className="font-serif text-[23px]">Agents with a mandate, not a chat window</h3><p className="mt-3 text-[12px] text-muted-foreground">Each agent owns a beat, works continuously and reports in your language.</p></div>
    </div></section>
    <section id="intelligence" className="mx-auto max-w-6xl scroll-mt-8 px-5 py-16 lg:px-8"><div className="grid gap-10 lg:grid-cols-2"><div><FeatureHeading eyebrow="A live intelligence terminal" title="Designed to notice what others miss." body="Bloomberg tells you what happened. We tell you what it means for your business — and then handle it. While you're away. While you're busy. While you rest." /><div className="space-y-6">{intelPoints.map(point => <div key={point.title} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-accent" /><div><h3 className="text-[14px] font-medium">{point.title}</h3><p className="mt-2 text-[12px] leading-[1.8] text-muted-foreground">{point.body}</p></div></div>)}</div></div>
      <div className="about-work-window overflow-hidden rounded-lg"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3"><p className="about-eyebrow">Intelligence briefing</p><div className="flex gap-1">{(["all", "alerts"] as const).map(view => <Button key={view} variant="ghost" size="sm" aria-pressed={briefView === view} onClick={() => setBriefView(view)} className={`h-7 rounded-full px-3 text-[10px] ${briefView === view ? "bg-card" : "text-muted-foreground"}`}>{view === "all" ? "All signals" : "Alerts"}</Button>)}</div></div><div className="px-5 py-2">{briefAlerts.map(alert => <article key={alert.time} className="border-b border-border py-4"><p className="mb-2 flex justify-between text-[10px] text-accent"><span>{alert.label}</span><span className="font-mono text-muted-foreground">{alert.time}</span></p><p className="text-[12px] leading-[1.8]">{alert.body}</p></article>)}{briefView === "all" && briefItems.map(item => <p key={item.body} className="border-b border-border py-4 text-[11px] leading-[1.8] text-muted-foreground">{item.body}</p>)}<p className="flex items-center gap-2 py-4 text-[9px] text-muted-foreground"><Globe className="size-3 shrink-0" /> Compiled from 18 sources · 4 languages</p></div></div>
    </div></section>
  </>;
}

export function PaintedVideoCoda() {
  return <section id="cta" className="about-video-coda relative isolate mt-4 overflow-hidden px-5 pb-52 pt-10 text-center sm:pb-64">
    <video autoPlay loop muted playsInline aria-hidden className="absolute inset-0 -z-20 size-full object-cover"><source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" /></video><div className="about-video-veil absolute inset-0 -z-10" />
    <p className="about-eyebrow">Working while you sleep</p><h2 className="about-section-title mx-auto mt-4 max-w-2xl">Your intelligence team.<br /><span className="italic">Always on, everywhere you trade.</span></h2><p className="mx-auto mt-4 max-w-md text-[12px] leading-relaxed text-muted-foreground">Tenders, markets, buyers and trade signals — monitored continuously, distilled to what actually moves your quarter.</p><div className="mt-5 flex flex-wrap justify-center gap-2"><Button asChild size="sm" className="h-8 rounded-full px-3 text-[11px]"><a href="mailto:hello@perpetuity.works">Book a demo <ArrowUpRight className="size-3" /></a></Button><Button asChild variant="outline" size="sm" className="h-8 rounded-full bg-card px-3 text-[11px]"><Link to="/">See the terminal <ArrowRight className="size-3" /></Link></Button></div>
  </section>;
}