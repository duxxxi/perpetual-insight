import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  FileText,
  Plus,
  X,
  Shield,
  ArrowUp,
  ArrowUpRight,
  Plane,
  Paperclip,
  Presentation,
  Image as ImageIcon,
  ScanFace,
  Mic,
  Check,
  PenLine,
  Reply,
  BarChart3,
  Video,
  Mail,
  CircleDot,
  AlertOctagon,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTheme } from "@/hooks/use-theme";
import { AmbientBackground, CommodityTicker, AppSidebar, AppFooter } from "@/components/app-shell";


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


function DashboardPage() {
  useTheme();
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/15">
      <AmbientBackground />
      <CommodityTicker />

      <div className="flex">
        <AppSidebar active="home" />


        <main className="flex-1 px-8 pt-14 pb-32 lg:pl-32 lg:pr-12 xl:pr-16">
          <div className="mx-auto max-w-6xl animate-fade-in-up">
            {/* Header */}
            <header className="mb-8">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/40">
                MONDAY, 15 JUNE
              </p>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <h1 className="font-serif text-3xl italic tracking-tight md:text-4xl">
                  Good afternoon,{" "}
                  <span className="not-italic bg-gradient-to-br from-accent via-[hsl(22_92%_55%)] to-accent-2 bg-clip-text text-transparent">Perpetuity</span>
                </h1>
                <MorningBriefPill />
              </div>
              <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-foreground/60 md:text-base">
                You have critical payment and deployment issues requiring action today,
                plus a multi-country trip starting in five days that needs final logistics review.
              </p>
            </header>




            {/* Trip card — compact */}
            <div className="glass-panel group mb-8 flex items-center justify-between gap-4 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="glass-panel-strong flex size-9 items-center justify-center rounded-xl">
                  <Plane className="size-3.5 text-accent" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                      Bratislava — 13 days
                    </span>
                    <span className="text-[10px] font-mono text-foreground/30">JUN 19 → 20</span>
                  </div>
                  <p className="mt-0.5 font-serif text-sm italic truncate">
                    Bratislava → Yerevan → Bratislava
                  </p>
                </div>
              </div>
              <ActionDialog
                title="Prepare Bratislava briefing"
                kicker="Trip · Jun 19 → 20"
                body="Compile flight, hotel, buyer notes, and market context into a single briefing pack."
                actions={[
                  { label: "Generate briefing", primary: true },
                  { label: "Later" },
                ]}
                trigger={
                  <button className="glass-panel-strong inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors hover:text-accent">
                    Prepare briefing
                    <ArrowUpRight className="size-3" />
                  </button>
                }
              />

            </div>

            {/* Ask Perpetuity */}
            <AskPerpetuity />

            {/* Status pills row — under chatbox */}
            <div className="mb-10 -mt-10 flex flex-wrap items-center gap-2">
              <StatusPill
                icon={AlertOctagon}
                gradient="from-rose-500 to-red-600"
                count="3"
                label="Urgent"
                items={[
                  { title: "Stripe payment failed ($8.00)", sub: "Recurring charge — acct_1ika5ja3kz32dpo1" },
                  { title: "Railway build failure", sub: "@export-analytica/web — 19:38 UTC" },
                  { title: "EU timber restrictions — CIS", sub: "3 suppliers affected" },
                ]}
              />
              <StatusPill
                icon={TrendingUp}
                gradient="from-emerald-400 to-teal-600"
                count="7"
                label="Updates"
                items={[
                  { title: "Brent crude −2.94% to $87.33", sub: "Monitor freight surcharges" },
                  { title: "EUR/USD at 1.1567", sub: "USD invoicing advantage" },
                  { title: "Gold +3.45% to $4,385", sub: "Hedging window opening" },
                  { title: "Bybit USDC withdrawal confirmed", sub: "4.89 USDC on-chain" },
                  { title: "New buyer reply: EuroMach", sub: "Wants Q3 quote on 40t order" },
                  { title: "Yerevan hotel — pending confirmation", sub: "Reply expected today" },
                  { title: "REACH compliance check passed", sub: "Automated · 16:30" },
                ]}
              />
              <StatusPill
                icon={CheckCircle2}
                gradient="from-violet-400 to-indigo-600"
                count="2"
                label="Approvals"
                items={[
                  { title: "Draft notice: EU timber restrictions", sub: "Ready for your approval" },
                  { title: "Q3 pricing update — LATAM", sub: "+4.2% on softwood SKUs" },
                ]}
              />
              <TripPill />
            </div>


            {/* Two-column workspace */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Active Work — primary */}
              <section className="lg:col-span-7">
                <SectionLabel kicker="Priority" tone="primary">Active Work</SectionLabel>
                <div className="mt-5 space-y-4">
                  <WorkCard
                    tag="Payment"
                    urgent
                    title="Resolve failed Stripe payment ($8.00 recurring charge)"
                    body="Stripe has failed twice to charge $8.00 on account acct_1ika5ja3kz32dpo1."
                    actions={[
                      { icon: PenLine, label: "Draft email" },
                      { icon: Reply, label: "Review & reply" },
                      { icon: BarChart3, label: "Analyze" },
                    ]}
                  />
                  <WorkCard
                    tag="Engineering"
                    title="Fix export-analytica build failure (@export-analytica/web service)"
                    body="Railway deployment pipeline has failed multiple times (last at 19:38 UTC) on the @export-analytica/web service build."
                    actions={[
                      { icon: PenLine, label: "Draft fix" },
                      { icon: BarChart3, label: "Analyze logs" },
                    ]}
                  />
                  <WorkCard
                    tag="Treasury"
                    title="Verify Bybit USDC withdrawal (4.89 USDC)"
                    body="Bybit confirms 4.89 USDC withdrawal sent to blockchain."
                    actions={[
                      { icon: Reply, label: "Confirm" },
                      { icon: BarChart3, label: "Audit trail" },
                    ]}
                  />
                  <WorkCard
                    tag="Compliance"
                    title="Review new EU restrictions on timber exports to CIS regions"
                    body="Three suppliers in your network are likely affected. Draft notice ready for approval."
                    actions={[
                      { icon: PenLine, label: "Draft notice" },
                      { icon: Reply, label: "Approve" },
                    ]}
                  />
                </div>

                {/* Today's schedule */}
                <div className="mt-12">
                  <SectionLabel kicker="Today" tone="quiet">Schedule</SectionLabel>
                  <div className="glass-panel mt-5 rounded-3xl p-2">
                    <ScheduleRow time="09:30" title="Buyer call: EuroMach GmbH" sub="Video call" tone="emerald" Icon={Video} />
                    <ScheduleDivider />
                    <ScheduleRow time="11:00" title="Review tender: Railway components – Poland" sub="Internal" tone="accent" Icon={FileText} />
                    <ScheduleDivider />
                    <ScheduleRow time="14:00" title="Follow up: Global Trade Solutions" sub="Email follow-up" tone="blue" Icon={Mail} />
                    <ScheduleDivider />
                    <ScheduleRow time="16:30" title="Compliance check: REACH regulation" sub="Automated check" tone="violet" Icon={Shield} />
                  </div>
                </div>
              </section>

              {/* Right rail */}
              <aside className="space-y-8 lg:col-span-5">
                <div>
                  <SectionLabel kicker="Intel" tone="accent">Need to Know</SectionLabel>
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
                  <SectionLabel kicker="Optional" tone="muted">Suggested</SectionLabel>
                  <div className="mt-5 space-y-3">
                    <SuggestedItem
                      title="Clean up duplicate pitch deck versions in Drive"
                      body="You have two copies of the full pitch deck in Drive. Consolidate to a single master."
                    />
                    <SuggestedItem
                      title="Q3 timber & paper market outlook: monitor CIS and LATAM"
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

      <AppFooter />

    </div>
  );
}

/* ---------- Ask Perpetuity ---------- */

function AskPerpetuity() {
  const [permission, setPermission] = useState("ask");

  const permissions = [
    { id: "ask", label: "Ask before any write actions", sub: "Default" },
    { id: "safe", label: "Always allow safe actions", sub: "Low-risk actions only" },
    { id: "all", label: "Allow all actions", sub: "Take any action in this session" },
  ];

  const addTaskItems = [
    { icon: Paperclip, label: "Upload files" },
    { icon: FileText, label: "Document" },
    { icon: Presentation, label: "Deck" },
    { icon: ImageIcon, label: "Image" },
    { icon: ScanFace, label: "Research person" },
    { icon: Mic, label: "Recording" },
  ];

  return (
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
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-foreground/5 pt-4">
          {/* Add task */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] text-foreground/55 transition-colors hover:bg-foreground/5 hover:text-foreground">
                <Plus className="size-3.5" />
                Add task
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-60 rounded-2xl border-foreground/10 bg-background/85 p-1.5 backdrop-blur-2xl">
              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-foreground/5">
                <Paperclip className="size-4 text-foreground/60" />
                <span>Upload files</span>
              </button>
              <div className="my-1 h-px bg-foreground/5" />
              {addTaskItems.slice(1).map((it) => (
                <button key={it.label} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-foreground/5">
                  <it.icon className="size-4 text-foreground/60" />
                  <span>{it.label}</span>
                </button>
              ))}
            </PopoverContent>
          </Popover>

          {/* Permissions */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] text-foreground/55 transition-colors hover:bg-foreground/5 hover:text-foreground">
                <Shield className="size-3.5" />
                Permissions
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-80 rounded-2xl border-foreground/10 bg-background/85 p-0 backdrop-blur-2xl">
              <div className="border-b border-foreground/5 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/45">Permission</p>
              </div>
              <div className="p-1.5">
                {permissions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPermission(p.id)}
                    className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-foreground/5"
                  >
                    <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center">
                      {permission === p.id && <Check className="size-3.5 text-accent" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-tight">{p.label}</p>
                      <p className="mt-0.5 text-xs text-foreground/45">{p.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="border-t border-foreground/5 px-4 py-2.5">
                <button className="inline-flex items-center gap-1 text-xs font-medium text-foreground/70 hover:text-foreground">
                  Learn more
                  <ArrowUpRight className="size-3" />
                </button>
              </div>
            </PopoverContent>
          </Popover>

          <div className="ml-auto flex items-center gap-2 text-[10px] text-foreground/35">
            <span className="size-1 rounded-full bg-accent animate-pulse" />
            Intelligence agents on standby
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Pieces ---------- */

function StatusPill({
  icon: Icon,
  gradient,
  count,
  label,
  items,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  gradient: string;
  count: string;
  label: string;
  items: { title: string; sub: string }[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="glass-panel group inline-flex h-8 items-center gap-2 rounded-full pl-1 pr-3 text-left transition-colors hover:bg-[var(--glass-surface-strong)]">
          <span
            className={`flex size-6 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_6px_-2px_rgba(0,0,0,0.25)] ring-1 ring-white/20`}
          >
            <Icon className="size-3" strokeWidth={2.5} />
          </span>
          <span className="font-mono text-[12px] font-semibold tabular-nums">{count}</span>
          <span className="text-[12px] text-foreground/70">{label}</span>
        </button>
      </DialogTrigger>
      <PillDialogContent title={label} count={count} gradient={gradient} Icon={Icon} items={items} />
    </Dialog>
  );
}

function TripPill() {
  const items = [
    { title: "Flight W6 4761 · SKP → BRA", sub: "Jun 19 · 04:30 — booked" },
    { title: "Hotel Yerevan", sub: "Pending confirmation" },
    { title: "Buyer briefing pack", sub: "Draft ready for review" },
    { title: "Return flight BRA", sub: "Jun 20 · to be booked" },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="glass-panel group inline-flex h-8 items-center gap-2 rounded-full pl-1 pr-3 text-left transition-colors hover:bg-[var(--glass-surface-strong)]">
          <span className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_6px_-2px_rgba(0,0,0,0.25)] ring-1 ring-white/20">
            <Plane className="size-3" strokeWidth={2.5} />
          </span>
          <span className="font-mono text-[12px] font-semibold tabular-nums">5d</span>
          <span className="text-[12px] text-foreground/70">Bratislava</span>
        </button>
      </DialogTrigger>
      <PillDialogContent title="Trip to Bratislava" count="5d" gradient="from-amber-400 to-orange-600" Icon={Plane} items={items} />
    </Dialog>
  );
}


function PillDialogContent({
  title,
  count,
  gradient,
  Icon,
  items,
}: {
  title: string;
  count: string;
  gradient: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  items: { title: string; sub: string }[];
}) {
  return (
    <DialogContent className="glass-panel-strong max-w-md rounded-3xl border-foreground/10 bg-background/85 p-0 backdrop-blur-2xl">
      <DialogHeader className="flex-row items-center gap-3 space-y-0 border-b border-foreground/5 px-5 py-4">
        <span
          className={`flex size-9 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_8px_-2px_rgba(0,0,0,0.3)] ring-1 ring-white/20`}
        >
          <Icon className="size-4" strokeWidth={2.5} />
        </span>
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/45">
            {count} · {title}
          </p>
          <DialogTitle className="font-serif text-xl italic">{title}</DialogTitle>
        </div>
      </DialogHeader>
      <div className="max-h-[60vh] overflow-y-auto p-2">
        {items.map((it, i) => (
          <button
            key={i}
            className="flex w-full items-start gap-3 rounded-2xl p-3 text-left transition-colors hover:bg-foreground/[0.04]"
          >
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/30" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-snug">{it.title}</p>
              <p className="mt-0.5 text-xs text-foreground/50">{it.sub}</p>
            </div>
            <ArrowUpRight className="mt-1 size-3.5 text-foreground/30" />
          </button>
        ))}
      </div>
    </DialogContent>
  );
}

function MorningBriefPill() {
  return (
    <ActionDialog
      title="Your Morning Brief"
      kicker="Monday, 15 June"
      body="3 urgent items, 7 updates, and 2 approvals are waiting. Open the brief for a guided walkthrough."
      actions={[
        { label: "Open brief", primary: true },
        { label: "Read later" },
      ]}
      trigger={
        <button className="group relative inline-flex shrink-0 items-center gap-2.5 self-start rounded-full md:self-end">
          <span className="ai-iridescent absolute -inset-px rounded-full opacity-60 blur-[2px] transition-opacity group-hover:opacity-90" aria-hidden />
          <span className="glass-panel-strong relative inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4">
            <span className="ai-iridescent flex size-7 items-center justify-center rounded-full ring-1 ring-foreground/5">
              <FileText className="size-3.5 text-foreground/80" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Morning Brief</span>
            <ArrowUpRight className="size-3.5 text-foreground/40 transition-colors group-hover:text-foreground" />
          </span>
        </button>
      }
    />
  );
}




function SectionLabel({
  children,
  kicker,
  tone = "primary",
}: {
  children: React.ReactNode;
  kicker?: string;
  tone?: "primary" | "accent" | "muted" | "quiet";
}) {
  const toneStyles: Record<string, string> = {
    primary: "text-foreground",
    accent: "text-accent",
    muted: "text-foreground/45",
    quiet: "text-foreground/55",
  };
  const sizeStyles: Record<string, string> = {
    primary: "font-serif text-2xl italic",
    accent: "font-serif text-xl italic",
    muted: "font-serif text-lg italic",
    quiet: "font-serif text-xl italic",
  };
  return (
    <div className="flex items-end justify-between gap-3 px-1">
      <div>
        {kicker && (
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/35">
            {kicker}
          </p>
        )}
        <h3 className={`${sizeStyles[tone]} ${toneStyles[tone]} tracking-tight`}>{children}</h3>
      </div>
      <div className="mb-2 h-px flex-1 bg-foreground/5" />
    </div>
  );
}

const tagTones: Record<string, string> = {
  Payment: "text-rose-700/80",
  Engineering: "text-blue-700/80",
  Treasury: "text-amber-700/80",
  Compliance: "text-violet-700/80",
};

function WorkCard({
  tag,
  title,
  body,
  actions,
  urgent,
}: {
  tag: string;
  title: string;
  body: string;
  actions?: { icon: React.ComponentType<{ className?: string }>; label: string }[];
  urgent?: boolean;
}) {
  const [done, setDone] = useState(false);

  return (
    <article
      className={`relative rounded-3xl p-5 transition-all ${
        urgent ? "glass-panel-strong shadow-[0_8px_40px_-16px_hsl(25_60%_45%/0.2)]" : "glass-panel"
      } hover:bg-[var(--glass-surface-strong)]`}
    >
      {urgent && (
        <div className="ai-iridescent pointer-events-none absolute -inset-px rounded-3xl opacity-25 blur-[2px]" aria-hidden />
      )}
      <div className="relative flex items-start gap-4">
        <button
          onClick={() => setDone(!done)}
          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
            done
              ? "border-accent bg-accent text-accent-foreground"
              : "border-foreground/20 hover:border-foreground/50"
          }`}
          aria-label="Mark complete"
        >
          {done && <Check className="size-3" strokeWidth={3} />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-[0.18em] ${tagTones[tag] ?? "text-accent"}`}>{tag}</span>
              {urgent && (
                <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-destructive">
                  <CircleDot className="size-2" /> Urgent
                </span>
              )}
            </div>
            <ArrowUpRight className="size-3.5 text-foreground/30" />
          </div>
          <h4 className={`mt-1.5 font-serif text-lg italic leading-snug ${done ? "line-through text-foreground/40" : ""}`}>
            {title}
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-foreground/55">{body}</p>
          {actions && actions.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {actions.map((a) => (
                <ActionDialog
                  key={a.label}
                  title={a.label}
                  kicker={tag}
                  body={`${a.label} for: ${title}`}
                  trigger={
                    <button className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-background/40 px-3 py-1.5 text-[11px] font-medium text-foreground/75 transition-colors hover:border-foreground/20 hover:bg-foreground hover:text-background">
                      <a.icon className="size-3" />
                      {a.label}
                    </button>
                  }
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </article>
  );
}

function ActionDialog({
  trigger,
  title,
  kicker,
  body,
  actions,
}: {
  trigger: React.ReactNode;
  title: string;
  kicker?: string;
  body?: string;
  actions?: { label: string; primary?: boolean }[];
}) {
  const acts = actions ?? [
    { label: "Take action", primary: true },
    { label: "Dismiss" },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="glass-panel-strong max-w-md rounded-3xl border-foreground/10 bg-background/85 p-0 backdrop-blur-2xl">
        <DialogHeader className="space-y-1 border-b border-foreground/5 px-5 py-4 text-left">
          {kicker && (
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/45">
              {kicker}
            </p>
          )}
          <DialogTitle className="font-serif text-xl italic">{title}</DialogTitle>
        </DialogHeader>
        {body && (
          <div className="px-5 py-4">
            <p className="text-sm leading-relaxed text-foreground/70">{body}</p>
          </div>
        )}
        <div className="flex items-center justify-end gap-2 border-t border-foreground/5 px-4 py-3">
          {acts.map((a) => (
            <button
              key={a.label}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                a.primary
                  ? "bg-foreground text-background hover:opacity-90"
                  : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
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
    <ActionDialog
      kicker={time}
      title={title}
      body={body}
      trigger={
        <button className="group block w-full cursor-pointer py-1 text-left">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="font-mono text-[10px] text-foreground/35">{time}</span>
            {hot && <span className="size-1.5 rounded-full bg-accent" />}
          </div>
          <p className="text-sm font-medium leading-snug text-foreground group-hover:text-accent">
            {title}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-foreground/50">{body}</p>
        </button>
      }
    />
  );
}

function Divider() {
  return <div className="my-5 h-px bg-foreground/5" />;
}

function SuggestedItem({ title, body }: { title: string; body: string }) {
  return (
    <div className="group relative w-full rounded-2xl border border-dashed border-foreground/10 bg-transparent p-4 transition-colors hover:border-foreground/20 hover:bg-[var(--glass-surface)]">
      <ActionDialog
        title={title}
        kicker="Suggested"
        body={body}
        actions={[
          { label: "Add as task", primary: true },
          { label: "Dismiss" },
        ]}
        trigger={
          <button className="block w-full pr-16 text-left">
            <p className="text-sm leading-snug text-foreground/75 group-hover:text-foreground">{title}</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/45">{body}</p>
          </button>
        }
      />
      <div className="absolute right-3 top-3 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          aria-label="Add as task"
          className="inline-flex size-6 items-center justify-center rounded-full bg-foreground/5 text-foreground/60 hover:bg-foreground hover:text-background"
        >
          <Plus className="size-3" strokeWidth={2.5} />
        </button>
        <button
          aria-label="Dismiss"
          className="inline-flex size-6 items-center justify-center rounded-full bg-foreground/5 text-foreground/60 hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="size-3" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}


function ScheduleRow({
  time,
  title,
  sub,
  tone,
  Icon,
}: {
  time: string;
  title: string;
  sub: string;
  tone: "emerald" | "accent" | "blue" | "violet";
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const tones: Record<string, string> = {
    emerald: "bg-emerald-500/10 text-emerald-700",
    accent: "bg-accent/10 text-accent",
    blue: "bg-blue-500/10 text-blue-700",
    violet: "bg-violet-500/10 text-violet-700",
  };
  return (
    <div className="group flex items-center gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-foreground/[0.03]">
      <span className="font-mono text-xs text-foreground/40 tabular-nums">{time}</span>
      <div className={`flex size-9 items-center justify-center rounded-xl ${tones[tone]}`}>
        <Icon className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-tight truncate">{title}</p>
        <p className="text-[11px] text-foreground/45">{sub}</p>
      </div>
      <ArrowUpRight className="size-3.5 text-foreground/25 transition-colors group-hover:text-foreground/70" />
    </div>
  );
}

function ScheduleDivider() {
  return <div className="mx-4 h-px bg-foreground/5" />;
}
