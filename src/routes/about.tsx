import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CircleGauge,
  Fingerprint,
  Globe2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AmbientBackground, AppFooter, CommodityTicker } from "@/components/app-shell";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
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
  useTheme();

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <AmbientBackground />
      <CommodityTicker />
      <AboutNav />

      <main className="pb-20">
        <section className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-6xl content-center gap-12 px-5 pb-16 pt-14 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:px-8">
          <div className="flex flex-col justify-between gap-12">
            <div className="inline-flex w-fit items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-foreground/45">
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_14px_color-mix(in_oklab,var(--color-accent)_65%,transparent)]" />
              The company behind the system
            </div>
            <p className="max-w-xs text-[12px] leading-relaxed text-foreground/45">
              Built for exporters, manufacturers, distributors and trading companies operating across borders.
            </p>
          </div>

          <div>
            <h1 className="max-w-4xl text-balance font-serif text-[40px] font-normal leading-[1.08] md:text-[58px] lg:text-[66px]">
              Intelligence should keep working
              <span className="text-silver-metallic italic"> when you cannot.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[15px] leading-[1.8] text-foreground/58 md:text-[17px]">
              Perpetuity connects your world, then puts specialist agents to work — finding opportunities, drafting outreach, flagging risks and planning deals. You command. It executes.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <Button asChild className="rounded-full px-5">
                <a href="mailto:hello@perpetuity.works">Start a conversation <ArrowUpRight /></a>
              </Button>
              <Button asChild variant="outline" className="glass-chip rounded-full px-5">
                <Link to="/landing">See the platform <ArrowRight /></Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-y border-foreground/8 bg-foreground/[0.025]">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
            <SectionLabel number="01" label="Operating model" />
            <div className="mt-10 divide-y divide-foreground/10 border-y border-foreground/10">
              {operatingModel.map((item) => (
                <article key={item.number} className="grid gap-4 py-7 md:grid-cols-[5rem_minmax(0,0.8fr)_minmax(0,1.1fr)] md:items-start">
                  <span className="font-mono text-[10px] text-foreground/35">{item.number}</span>
                  <h2 className="text-[18px] font-medium leading-snug md:text-[21px]">{item.title}</h2>
                  <p className="max-w-xl text-[13px] leading-[1.75] text-foreground/52">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <div>
              <SectionLabel number="02" label="Operating principles" />
              <h2 className="mt-5 max-w-md font-serif text-[30px] font-normal leading-[1.15] md:text-[40px]">
                Technology with judgment built around it.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {principles.map((principle) => (
                <article key={principle.title} className="glass-panel min-h-44 rounded-2xl p-5">
                  <principle.icon className="size-4 text-accent" strokeWidth={1.5} />
                  <h3 className="mt-8 text-[14px] font-semibold">{principle.title}</h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-foreground/48">{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-foreground/8 bg-foreground/[0.025]">
          <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionLabel number="03" label="People" />
                <h2 className="mt-5 font-serif text-[34px] font-normal md:text-[46px]">The intelligence team.</h2>
              </div>
              <div className="max-w-sm rounded-xl border border-accent/20 bg-accent/[0.05] px-3 py-2.5">
                <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-accent">Concept team · placeholder content</p>
                <p className="mt-1 text-[10px] leading-relaxed text-foreground/45">Names, roles, biographies and portraits are fictional until replaced with the real team.</p>
              </div>
            </div>

            <div className="mt-10 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((person, index) => (
                <article key={person.name} className={index % 2 ? "lg:mt-14" : ""}>
                  <div className="glass-panel group relative aspect-[4/5] overflow-hidden rounded-2xl p-1.5">
                    <img
                      src={person.image}
                      alt={`Concept portrait for ${person.name}`}
                      loading="lazy"
                      width={896}
                      height={1120}
                      className="size-full rounded-xl object-cover grayscale-[0.12] transition duration-700 group-hover:scale-[1.025] group-hover:grayscale-0"
                    />
                    <div className="pointer-events-none absolute inset-x-4 bottom-3 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
                  </div>
                  <div className="px-1 pt-4">
                    <p className="text-[15px] font-semibold">{person.name}</p>
                    <p className="mt-1 font-mono text-[8.5px] font-medium uppercase tracking-[0.16em] text-accent">{person.role}</p>
                    <p className="mt-3 text-[11.5px] leading-relaxed text-foreground/48">{person.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
          <div className="glass-panel-strong relative overflow-hidden rounded-3xl px-6 py-12 text-center md:px-12 md:py-16">
            <div className="about-signal-line absolute inset-x-0 top-0 h-px" aria-hidden />
            <Globe2 className="mx-auto size-5 text-accent" strokeWidth={1.4} />
            <h2 className="mx-auto mt-5 max-w-2xl text-balance font-serif text-[31px] font-normal leading-tight md:text-[43px]">
              Build the company that never stops noticing.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[13px] leading-relaxed text-foreground/50">Tell us what your team needs to see, remember and move on next.</p>
            <Button asChild className="mt-7 rounded-full px-5">
              <a href="mailto:hello@perpetuity.works">hello@perpetuity.works <ArrowUpRight /></a>
            </Button>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

function AboutNav() {
  return (
    <header className="sticky top-0 z-40 px-5 pt-3 lg:px-8">
      <nav className="glass-panel mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-3 py-2">
        <Link to="/landing" className="flex items-center gap-2.5 text-foreground/70 transition-colors hover:text-foreground">
          <div className="globe-orb size-5" aria-hidden />
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em]">Perpetuity</span>
        </Link>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="hidden rounded-full sm:inline-flex">
            <Link to="/landing"><ArrowLeft /> Platform</Link>
          </Button>
          <Button asChild size="sm" className="rounded-full">
            <a href="mailto:hello@perpetuity.works">Book a demo <ArrowUpRight /></a>
          </Button>
        </div>
      </nav>
    </header>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-foreground/40">
      <span>{number}</span>
      <span className="h-px w-8 bg-foreground/15" />
      {label}
    </p>
  );
}