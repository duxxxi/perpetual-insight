import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BookOpen, CircleGauge, Fingerprint, ShieldCheck, Globe2, Check, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import aleksandarPortrait from "@/assets/team/placeholder-aleksandar.jpg";
import elenaPortrait from "@/assets/team/placeholder-elena.jpg";
import martinPortrait from "@/assets/team/placeholder-martin.jpg";
import leilaPortrait from "@/assets/team/placeholder-leila.jpg";
import { PaintedTerminal, PaintedLandingFeatures, PaintedVideoCoda } from "@/components/painted-landing-features";
import { CommodityTicker } from "@/components/app-shell";
import { AboutTimeBand } from "@/components/about-time-band";
import { AboutBackgroundMedia } from "@/components/about-background-comparison";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Perpetuity — Intelligence That Keeps Working" },
      {
        name: "description",
        content:
          "Meet the thinking behind Perpetuity: an always-on intelligence layer for exporters, manufacturers and distributors.",
      },
      { property: "og:title", content: "About Perpetuity — Intelligence That Keeps Working" },
      {
        property: "og:description",
        content:
          "Perpetuity connects your world, keeps intelligence active and turns signals into approved action.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const operatingModel = [
  {
    number: "01",
    title: "Connect the company’s world.",
    body: "Mail, CRM, drive, ERP and calendar are ingested once, then kept warm. Perpetuity reads the whole context so you never brief it twice.",
  },
  {
    number: "02",
    title: "Keep intelligence active.",
    body: "Markets, suppliers, customers, tenders and compliance shifts are monitored continuously — across languages and time zones.",
  },
  {
    number: "03",
    title: "Turn signals into approved action.",
    body: "Opportunities arrive ranked. Outreach arrives drafted. Deal plans arrive half done. You keep the judgment and the final word.",
  },
];

const principles = [
  { icon: BookOpen, title: "Context before output", body: "Every action begins with the company memory, not an empty prompt." },
  { icon: CircleGauge, title: "Signal over volume", body: "The work is distilled to the few moves that can change the quarter." },
  { icon: ShieldCheck, title: "Permission by design", body: "Agents can prepare the work; consequential actions remain yours to approve." },
  { icon: Fingerprint, title: "Continuity compounds", body: "Every conversation, task and decision adds to what the system knows next time." },
];

const team = [
  {
    name: "Aleksandar Vuković",
    role: "Founder · Intelligence Systems",
    image: aleksandarPortrait,
    bio: "Shapes Perpetuity’s operating thesis: business intelligence should arrive as prepared work, not another dashboard.",
  },
  {
    name: "Elena Maren",
    role: "Intelligence Operations",
    image: elenaPortrait,
    bio: "Designs how market, compliance and commercial signals become concise briefs that a leadership team can act on.",
  },
  {
    name: "Martin Hale",
    role: "Product Systems",
    image: martinPortrait,
    bio: "Builds the connective layer between company memory, specialist agents and the approvals that keep people in control.",
  },
  {
    name: "Leila Arman",
    role: "Global Markets Research",
    image: leilaPortrait,
    bio: "Tracks the market and procurement signals that matter to companies trading across borders, sectors and languages.",
  },
];

function AboutPage() {
  const [active, setActive] = useState(0);
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const update = () => {
      const date = new Date();
      setNow(date);
    };
    update();
    const timer = window.setInterval(update, 1_000);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  const selected = operatingModel[active] ?? operatingModel[0];

  return (
    <div className="about-painted min-h-screen overflow-x-hidden bg-background text-foreground">
      <CommodityTicker tone="dark" />
      <section className="about-painted-hero relative isolate">
        <BusinessBackdrop />
        <header className="mx-auto max-w-6xl px-5 pt-3 lg:px-8">
          <div className="about-nav flex items-center justify-between gap-3 rounded-2xl px-3 py-2">
          <Link to="/landing" className="flex items-center gap-2.5"><span className="globe-orb size-5" aria-hidden /><span className="about-wordmark">Perpetuity</span></Link>
          <nav aria-label="About page navigation" className="hidden items-center gap-1 lg:flex">
            <Button asChild size="sm" variant="ghost" className="rounded-full"><a href="#platform">Platform</a></Button>
            <Button asChild size="sm" variant="ghost" className="rounded-full"><a href="#intelligence">Intelligence</a></Button>
            <Button asChild size="sm" variant="ghost" className="rounded-full"><a href="#agents">Intelligence team</a></Button>
            <Button asChild size="sm" variant="ghost" className="rounded-full"><a href="#team">People</a></Button>
          </nav>
          <div className="flex items-center gap-2"><Button asChild size="sm" className="h-8 rounded-full px-3 text-[11px]"><Link to="/">Open workspace <ArrowUpRight /></Link></Button></div>
          </div>
        </header>

        <AboutTimeBand now={now} />

        <div id="story" className="mx-auto max-w-3xl px-5 pb-8 pt-10 text-center md:pt-12">
          <p className="about-eyebrow">Intelligence team operational · monitoring worldwide</p>
          <h1 className="about-entry mt-4">
            <span className="about-entry-word">Perpetuity</span>
            <span className="about-entry-meta" aria-hidden="true"><span>perpetuity</span><span className="about-entry-sep">|</span><span>/ˌpɜːpəˈtjuːəti/</span><span className="about-entry-sep">|</span><span className="about-entry-pos">noun</span></span>
            <span className="about-entry-tagline">Your Intelligence Team.<br />Always <span className="about-headline-on">On</span><span className="about-headline-dot" aria-hidden="true" /></span>
          </h1>
          <p className="mx-auto mt-1 max-w-[42rem] text-[14.3px] leading-[1.7] text-muted-foreground">Perpetuity connects your world, then puts agents to work. Opportunities found, outreach drafted, risks flagged, deals planned. You command. It executes.</p>
          <div className="mt-5 flex justify-center gap-2"><Button asChild className="h-9 rounded-full px-4 text-[12px]"><a href="mailto:hello@perpetuity.works">Book a demo <ArrowUpRight /></a></Button><Button asChild variant="outline" className="h-9 rounded-full bg-card px-4 text-[12px]"><a href="#platform">See the platform <ArrowDown /></a></Button></div>
          <p className="mt-3 text-[10px] text-muted-foreground">180+ countries · 24/7 surveillance · 50K+ active tenders</p>
        </div>

        <div className="mx-auto max-w-3xl px-5 pb-10">
          <PaintedTerminal />
        </div>
      </section>

      <main>
        <PaintedLandingFeatures />
        <section className="mx-auto max-w-3xl px-5 py-12">
          <div className="mb-4 flex justify-center">
            <div className="about-lenses flex max-w-full gap-1 rounded-full p-1" role="tablist" aria-label="Operating model">
              {["Connect", "Notice", "Act"].map((label, index) => <Button key={label} role="tab" id={`model-tab-${index}`} aria-controls="model-panel" aria-selected={active === index} variant="ghost" size="sm" onClick={() => setActive(index)} className={active === index ? "rounded-full bg-card text-foreground shadow-sm hover:bg-card" : "rounded-full text-muted-foreground"}>{label}</Button>)}
            </div>
          </div>
          <div id="model-panel" role="tabpanel" aria-labelledby={`model-tab-${active}`} className="about-work-window overflow-hidden rounded-lg">
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
              <span className="flex items-center gap-2 text-[11px] font-medium"><Globe2 className="size-3.5" /> Perpetuity intelligence</span>
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><span className="size-1.5 rounded-full bg-accent" /> Always on</span>
            </div>
            <div className="grid gap-5 p-6 sm:grid-cols-[1fr_1.6fr] sm:p-8">
              <div><p className="about-eyebrow">{selected.number} / Operating model</p><h2 className="mt-3 text-[20px] font-medium leading-snug">{selected.title}</h2></div>
              <div><p className="text-[13px] leading-[1.8] text-muted-foreground">{selected.body}</p><p className="mt-5 flex items-center gap-2 text-[11px]"><Check className="size-3.5 text-accent" /> You keep the judgment and the final word.</p></div>
            </div>
          </div>
        </section>

        <section id="principles" className="about-principles scroll-mt-6 border-y border-border">
          <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
            <div className="text-center"><p className="about-eyebrow">Our thinking</p><h2 className="about-section-title mt-5">Technology, with judgment.</h2></div>
            <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {principles.map(principle => <article key={principle.title} className="border-t border-border pt-6"><principle.icon className="size-5 text-accent" strokeWidth={1.4} /><h3 className="mt-5 text-[17px] font-medium">{principle.title}</h3><p className="mt-3 max-w-md text-[13px] leading-[1.85] text-muted-foreground">{principle.body}</p></article>)}
            </div>
          </div>
        </section>

        <section id="team" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-16 md:px-8 md:py-24">
          <div className="text-center"><p className="about-eyebrow">People</p><h2 className="about-section-title mt-5">The intelligence team.</h2><p className="mx-auto mt-5 max-w-lg text-[11px] leading-relaxed text-muted-foreground">Concept team · placeholder content. Names, roles, biographies and portraits are fictional until replaced with the real team.</p></div>
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {team.map(person => <article key={person.name}><div className="group aspect-[4/5] overflow-hidden rounded-lg"><img src={person.image} alt={`Concept portrait for ${person.name}`} loading="lazy" width={896} height={1120} className="size-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.025]" /></div><h3 className="mt-5 text-[15px] font-medium">{person.name}</h3><p className="mt-2 text-[10px] text-accent">{person.role}</p><p className="mt-3 text-[12px] leading-[1.8] text-muted-foreground">{person.bio}</p></article>)}
          </div>
        </section>

        <PaintedVideoCoda />
      </main>
      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-8 text-[11px] text-muted-foreground"><Link to="/landing" className="about-wordmark text-foreground">Perpetuity</Link><span>Intelligence for international trade.</span><Button asChild variant="link" size="sm"><Link to="/landing">See the platform <ArrowRight /></Link></Button></footer>
    </div>
  );
}

function BusinessBackdrop() {
  return (
    <div className="about-business-backdrop" aria-hidden="true">
      <AboutBackgroundMedia />
      <div className="about-business-veil" />
    </div>
  );
}
