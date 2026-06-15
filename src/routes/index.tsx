import { createFileRoute } from "@tanstack/react-router";
import {
  Home,
  MessagesSquare,
  ListChecks,
  Send,
  Users,
  FileText,
  Compass,
  LineChart,
  Plug,
  Settings,
  Bell,
  Plus,
  Shield,
  ArrowUp,
  ArrowUpRight,
  Plane,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Daily Brief — Perpetuity" },
      { name: "description", content: "Your continuous commercial intelligence for international trade." },
      { property: "og:title", content: "Daily Brief — Perpetuity" },
      { property: "og:description", content: "Your continuous commercial intelligence for international trade." },
    ],
  }),
  component: DashboardPage,
});

const ticker = [
  { sym: "WTI", price: "$79.83", chg: "-5.95%", dir: "down" as const },
  { sym: "NAT GAS", price: "$3.127", chg: "+0.22%", dir: "up" as const },
  { sym: "GOLD", price: "$4,385", chg: "+3.45%", dir: "up" as const },
  { sym: "SILVER", price: "$71.19", chg: "+4.73%", dir: "up" as const },
  { sym: "COPPER", price: "$6.494", chg: "+0.76%", dir: "up" as const },
  { sym: "BRENT", price: "$87.33", chg: "-2.94%", dir: "down" as const },
  { sym: "EUR/USD", price: "1.1567", chg: "+0.18%", dir: "up" as const },
  { sym: "ALU", price: "$2,241", chg: "+0.80%", dir: "up" as const },
];

function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/15">
      {/* Ambient two-tone wash */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60rem 40rem at 12% -10%, hsl(25 40% 80% / 0.25), transparent 60%), radial-gradient(50rem 35rem at 100% 110%, hsl(20 10% 12% / 0.06), transparent 60%)",
        }}
      />

      {/* Commodity ticker */}
      <div className="sticky top-0 z-40 border-b border-foreground/5 bg-background/70 backdrop-blur-xl">
        <div className="ticker-mask overflow-hidden py-2.5">
          <div className="animate-ticker flex whitespace-nowrap">
            <TickerRow />
            <TickerRow />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Floating capsule sidebar */}
        <Sidebar />

        {/* Main */}
        <main className="flex-1 px-8 pt-14 pb-32 lg:pl-32 lg:pr-12 xl:pr-16">
          <div className="mx-auto max-w-6xl animate-fade-in-up">
            {/* Header */}
            <header className="mb-12 flex items-start justify-between gap-8">
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/40">
                  Daily Brief · Monday, 15 June
                </p>
                <h1 className="font-serif text-5xl italic tracking-tight md:text-6xl">
                  Good afternoon, <span className="not-italic">Perpetuity</span>
                </h1>
                <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-foreground/60 md:text-lg">
                  You have critical payment and deployment issues requiring action today,
                  plus a multi-country trip starting in five days that needs final logistics review.
                </p>
              </div>
              <button className="glass-panel hidden shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-foreground/70 transition-colors hover:text-foreground md:inline-flex">
                <span className="size-1.5 rounded-full bg-accent" />
                Morning Brief
                <ArrowUpRight className="size-3.5" />
              </button>
            </header>

            {/* Trip card */}
            <div className="glass-panel group mb-10 flex flex-col items-start justify-between gap-4 rounded-3xl p-6 md:flex-row md:items-center">
              <div className="flex items-start gap-4">
                <div className="glass-panel-strong flex size-11 items-center justify-center rounded-2xl">
                  <Plane className="size-4 text-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                      Bratislava — 13 days
                    </span>
                    <span className="text-[10px] font-mono text-foreground/30">JUN 19 → 20</span>
                  </div>
                  <p className="mt-1 font-serif text-xl italic">
                    Upcoming trip: Bratislava → Yerevan → Bratislava
                  </p>
                  <p className="mt-1 text-xs text-foreground/50">
                    W6 4761 · Skopje 04:30 → Bratislava · You have booked flights SKP–BRA.
                  </p>
                </div>
              </div>
              <button className="glass-panel-strong inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors hover:text-accent">
                Prepare briefing
                <ArrowUpRight className="size-3.5" />
              </button>
            </div>

            {/* Ask Perpetuity — iridescent prompt */}
            <div className="relative mb-16 group">
              <div className="ai-iridescent absolute -inset-px rounded-3xl opacity-70 blur-[2px]" aria-hidden />
              <div className="glass-panel-strong relative rounded-3xl p-5">
                <div className="flex items-center gap-3">
                  <div className="ai-iridescent size-7 rounded-full ring-1 ring-foreground/5" aria-hidden />
                  <input
                    type="text"
                    placeholder="Ask Perpetuity anything…"
                    className="flex-1 bg-transparent text-sm font-medium placeholder:text-foreground/40 focus:outline-none"
                  />
                  <button className="inline-flex size-9 items-center justify-center rounded-2xl bg-foreground text-background transition-transform hover:scale-105">
                    <ArrowUp className="size-4" />
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-foreground/5 pt-4">
                  <button className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] text-foreground/50 hover:text-foreground/80">
                    <Shield className="size-3" /> Secure
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] text-foreground/50 hover:text-foreground/80">
                    <Plus className="size-3" /> Attach context
                  </button>
                  <div className="ml-auto flex items-center gap-2 text-[10px] text-foreground/35">
                    <span className="size-1 rounded-full bg-accent" />
                    Intelligence agents on standby
                  </div>
                </div>
              </div>
            </div>

            {/* Two-column workspace */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Active Work */}
              <section className="lg:col-span-7">
                <SectionLabel>Active Work</SectionLabel>
                <div className="mt-5 space-y-4">
                  <WorkCard
                    tag="Payment"
                    title="Resolve failed Stripe payment ($8.00 recurring charge)"
                    body="Stripe has failed twice to charge $8.00 on account acct_1ika5ja3kz32dpo1."
                  />
                  <WorkCard
                    tag="Engineering"
                    title="Fix export-analytica build failure (@export-analytica/web service)"
                    body="Railway deployment pipeline has failed multiple times (last at 19:38 UTC) on the @export-analytica/web service build."
                  />
                  <WorkCard
                    tag="Treasury"
                    title="Verify Bybit USDC withdrawal (4.89 USDC)"
                    body="Bybit confirms 4.89 USDC withdrawal sent to blockchain."
                  />
                  <WorkCard
                    tag="Compliance"
                    title="Review new EU restrictions on timber exports to CIS regions"
                    body="Three suppliers in your network are likely affected. Draft notice ready for approval."
                  />
                </div>
              </section>

              {/* Right rail */}
              <aside className="space-y-8 lg:col-span-5">
                <div>
                  <SectionLabel>Need to Know</SectionLabel>
                  <div className="glass-panel mt-5 rounded-3xl p-6">
                    <IntelItem
                      time="09:41"
                      title="Upcoming multi-country trip: Bratislava → Yerevan → Bratislava (Jun 19–20)"
                      body="You have booked flights SKP–BRA. Hotel in Yerevan pending confirmation."
                      hot
                    />
                    <Divider />
                    <IntelItem
                      time="08:22"
                      title="Brent crude down 2.94% to $87.33 — monitor freight costs for timber & pulp exports"
                      body="Energy price decline typically eases bunker surcharges within 10 days."
                    />
                    <Divider />
                    <IntelItem
                      time="06:05"
                      title="EUR/USD at 1.1567 — USD invoicing advantage for North American sales"
                      body="Strong USD pricing relative to EUR contracts opened in Q1."
                    />
                  </div>
                </div>

                <div>
                  <SectionLabel>Suggested</SectionLabel>
                  <div className="mt-5 space-y-3">
                    <SuggestedItem
                      title="Clean up duplicate pitch deck versions in Drive (Full Pitch Nostry.pdf)"
                      body="You have two copies of the full pitch deck in Drive. Consolidate to a single master."
                    />
                    <SuggestedItem
                      title="Q3 timber & paper market outlook: monitor CIS and LATAM supply-demand shifts"
                      body="Your target markets (EU, CIS, SEA, LATAM) are heading into Q3. Begin preliminary intel."
                    />
                    <SuggestedItem
                      title="Validate influencer list against brand campaign strategy"
                      body="You have a '100 INFLUENCERS LIST' in Drive. Clarify whether this supports a B2B narrative."
                    />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom hairline status bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between border-t border-foreground/5 bg-background/70 px-8 py-3 text-[10px] font-medium tracking-[0.18em] text-foreground/35 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline">ENCRYPTED · TLS 1.3</span>
          <span>LAST SYNC · 14:40 UTC</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="size-1 rounded-full bg-accent" />
          <span>PERPETUITY INTELLIGENCE</span>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Pieces ---------- */

function TickerRow() {
  return (
    <div className="flex shrink-0 gap-10 px-6 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/40">
      {ticker.map((t, i) => (
        <span key={i} className="inline-flex items-center gap-2">
          <span>{t.sym}</span>
          <span className="font-semibold text-foreground">{t.price}</span>
          <span className={t.dir === "up" ? "text-emerald-700" : "text-rose-700"}>{t.chg}</span>
        </span>
      ))}
    </div>
  );
}

function Sidebar() {
  const items = [
    { icon: Home, label: "Home", active: true },
    { icon: MessagesSquare, label: "Threads" },
    { icon: ListChecks, label: "Assignments" },
    { icon: Send, label: "Outreach" },
    { icon: Users, label: "Contacts" },
    { icon: FileText, label: "Documents" },
    { icon: Compass, label: "Opportunities" },
    { icon: LineChart, label: "Markets" },
    { icon: Plug, label: "Connections" },
    { icon: Settings, label: "Settings" },
  ];
  return (
    <nav className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="glass-panel-strong flex flex-col items-center gap-1 rounded-full px-2 py-4">
        <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-foreground font-serif text-sm italic text-background">
          P
        </div>
        {items.map((it) => (
          <button
            key={it.label}
            title={it.label}
            className={`group relative flex size-10 items-center justify-center rounded-full transition-colors ${
              it.active ? "bg-foreground/5 text-foreground" : "text-foreground/45 hover:bg-foreground/5 hover:text-foreground"
            }`}
          >
            <it.icon className="size-[18px]" strokeWidth={1.5} />
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-background opacity-0 transition-opacity group-hover:opacity-100">
              {it.label}
            </span>
          </button>
        ))}
        <div className="mt-2 flex size-10 items-center justify-center rounded-full text-foreground/45 hover:text-foreground">
          <Bell className="size-[18px]" strokeWidth={1.5} />
        </div>
      </div>
    </nav>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-1">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/40">
        {children}
      </h3>
      <div className="h-px flex-1 bg-foreground/5" />
    </div>
  );
}

function WorkCard({ tag, title, body }: { tag: string; title: string; body: string }) {
  return (
    <article className="glass-panel group cursor-pointer rounded-3xl p-5 transition-colors hover:bg-[var(--glass-surface-strong)]">
      <div className="flex items-start gap-4">
        <div className="mt-1 h-12 w-0.5 shrink-0 rounded-full bg-accent/50" />
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">{tag}</span>
            <ArrowUpRight className="size-3.5 text-foreground/30 transition-colors group-hover:text-foreground" />
          </div>
          <h4 className="mt-1.5 font-serif text-lg italic leading-snug">{title}</h4>
          <p className="mt-2 text-xs leading-relaxed text-foreground/55">{body}</p>
        </div>
      </div>
    </article>
  );
}

function IntelItem({
  time,
  title,
  body,
  hot,
}: {
  time: string;
  title: string;
  body: string;
  hot?: boolean;
}) {
  return (
    <div className="group cursor-pointer py-1">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-mono text-[10px] text-foreground/35">{time}</span>
        {hot && <span className="size-1.5 rounded-full bg-accent" />}
      </div>
      <p className="text-sm font-medium leading-snug text-foreground group-hover:text-accent">
        {title}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-foreground/50">{body}</p>
    </div>
  );
}

function Divider() {
  return <div className="my-5 h-px bg-foreground/5" />;
}

function SuggestedItem({ title, body }: { title: string; body: string }) {
  return (
    <button className="glass-panel group block w-full rounded-2xl p-4 text-left transition-colors hover:bg-[var(--glass-surface-strong)]">
      <p className="text-sm font-medium leading-snug">{title}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-foreground/50">{body}</p>
    </button>
  );
}
