import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BookOpen, CircleGauge, Fingerprint, ShieldCheck, Globe2, Check, ArrowDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import paintedLandscape from "@/assets/about-painted-landscape.jpg";
import aleksandarPortrait from "@/assets/team/placeholder-aleksandar.jpg";
import elenaPortrait from "@/assets/team/placeholder-elena.jpg";
import martinPortrait from "@/assets/team/placeholder-martin.jpg";
import leilaPortrait from "@/assets/team/placeholder-leila.jpg";

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
  const selected = operatingModel[active] ?? operatingModel[0];

  return (
    <div className="about-painted min-h-screen overflow-x-hidden bg-background text-foreground">
      <section className="about-painted-hero relative isolate">
        <img src={paintedLandscape} alt="Painted blue sky over open hills" width={1920} height={1088} fetchPriority="high" className="absolute inset-0 -z-10 size-full object-cover" />
        <header className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-5 md:px-10">
          <Link to="/landing" className="about-wordmark">Perpetuity</Link>
          <nav aria-label="About page navigation" className="about-nav hidden items-center gap-1 rounded-full p-1 sm:flex">
            <Button asChild size="sm" className="rounded-full bg-card text-foreground shadow-none hover:bg-card"><a href="#story">About</a></Button>
            <Button asChild size="sm" variant="ghost" className="rounded-full"><a href="#principles">Our thinking</a></Button>
            <Button asChild size="sm" variant="ghost" className="rounded-full"><a href="#team">People</a></Button>
          </nav>
          <Button asChild size="sm" className="rounded-full px-4"><Link to="/">Open workspace <ArrowUpRight /></Link></Button>
        </header>

        <div id="story" className="mx-auto max-w-3xl px-5 pb-12 pt-14 text-center md:pt-20">
          <p className="about-eyebrow">The company behind the system</p>
          <h1 className="about-headline mt-5">Perpetuity<span className="mt-2 block">Intelligence that<br className="hidden sm:block" /> keeps working.</span></h1>
          <p className="mx-auto mt-6 max-w-lg text-[14px] leading-[1.8] md:text-[16px]">An always-on intelligence team for companies trading across borders. You command. It executes.</p>
          <Button asChild className="mt-7 h-11 rounded-full px-6"><a href="mailto:hello@perpetuity.works">Start a conversation <ArrowUpRight /></a></Button>
          <p className="mt-4 text-[11px] text-muted-foreground">Context. Intelligence. Approved action.</p>
        </div>

        <div className="mx-auto max-w-3xl px-5 pb-10">
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
        </div>
      </section>

      <main>
        <section className="mx-auto max-w-5xl px-5 py-16 text-center md:py-24">
          <p className="about-eyebrow">A wider perspective</p>
          <h2 className="about-section-title mx-auto mt-5 max-w-2xl">Your world is connected.<br />Your intelligence should be, too.</h2>
          <p className="mx-auto mt-6 max-w-xl text-[14px] leading-[1.9] text-muted-foreground">Perpetuity connects your world, then puts specialist agents to work — finding opportunities, drafting outreach, flagging risks and planning deals.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-x-7 gap-y-3 text-[12px] text-muted-foreground">{["Exporters", "Manufacturers", "Distributors", "Trading companies"].map(label => <span key={label}>{label}</span>)}</div>
          <ArrowDown className="mx-auto mt-10 size-4 text-accent" />
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

        <section className="about-painted-coda relative isolate px-5 py-20 text-center md:py-24">
          <img src={paintedLandscape} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 -z-10 size-full object-cover object-top" />
          <p className="about-eyebrow">Keep the world in view</p><h2 className="about-section-title mx-auto mt-5 max-w-2xl">Build the company that<br />never stops noticing.</h2>
          <p className="mx-auto mt-5 max-w-md text-[13px] leading-relaxed">Tell us what your team needs to see, remember and move on next.</p>
          <Button asChild className="mt-7 rounded-full px-6"><a href="mailto:hello@perpetuity.works">hello@perpetuity.works <ArrowUpRight /></a></Button>
        </section>
      </main>
      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-8 text-[11px] text-muted-foreground"><Link to="/landing" className="about-wordmark text-foreground">Perpetuity</Link><span>Intelligence for international trade.</span><Button asChild variant="link" size="sm"><Link to="/landing">See the platform <ArrowRight /></Link></Button></footer>
    </div>
  );
}
