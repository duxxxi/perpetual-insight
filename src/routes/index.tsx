import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import {
  getMarketSignals,
  getPolymarketOdds,
  type MarketSeries,
  type PolyOdds,
} from "@/lib/market.functions";
import { useEffect, useState } from "react";
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
import { useUserTasks } from "@/lib/task-store";
import { ConversationDialog } from "@/components/conversation-dialog";


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


function useGreeting() {
  const [greeting, setGreeting] = useState("Good morning");
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);
  return greeting;
}

function DashboardPage() {
  useTheme();
  const userTasks = useUserTasks();
  const greeting = useGreeting();
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/15">
      <AmbientBackground />
      <CommodityTicker />

      {/* Company name under ticker */}
      <div className="flex justify-center pt-4 pb-2 gap-3 items-center">
        <span className="font-mono text-[11px] font-medium tracking-[0.35em] text-foreground/45 uppercase">
          Perpetuity
        </span>
      </div>

      <div className="flex">
        <AppSidebar active="home" />


        <main className="flex-1 px-5 pt-6 pb-20 lg:pl-24 lg:pr-8 xl:pr-12">
          <div className="mx-auto max-w-6xl animate-fade-in-up">
            {/* Header */}
            <header className="mb-5">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/40">
                MONDAY, 15 JUNE
              </p>
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <h1 className="font-serif font-normal text-3xl tracking-tight md:text-[38px]">
                  {greeting},{" "}
                  <span className="italic text-silver-metallic">Stevan</span>
                </h1>
                <MorningBriefPill />
              </div>
              <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-foreground/60">
                You have critical payment and deployment issues requiring action today,
                plus a multi-country trip starting in five days that needs final logistics review.
              </p>
            </header>




            {/* Trip card — compact */}
            <div className="glass-panel group mb-5 flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
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
                  <p className="mt-0.5 font-sans text-sm font-medium truncate">
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
                  <button data-pill className="glass-panel-strong inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors hover:text-accent">
                    Prepare briefing
                    <ArrowUpRight className="size-3" />
                  </button>
                }
              />

            </div>

            {/* Ask Perpetuity */}
            <AskPerpetuity />

            {/* Status pills row — under chatbox */}
            <div className="mb-6 -mt-8 flex flex-wrap items-center gap-2">
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
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Active Work — primary */}
              <section className="lg:col-span-7">
                <SectionLabel kicker="Priority" tone="primary">Active Work</SectionLabel>
                <div className="mt-4 space-y-3">
                  {userTasks.map((ut) => (
                    <WorkCard
                      key={ut.id}
                      tag={ut.tag}
                      title={ut.title}
                      body={ut.body ?? "Created from Ask Perpetuity. Open in Assignments to add detail."}
                      actions={[
                        { icon: PenLine, label: "Open in Assignments" },
                        { icon: Reply, label: "Add detail" },
                      ]}
                    />
                  ))}
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
                <div className="mt-8">
                  <SectionLabel kicker="Today" tone="accent">Schedule</SectionLabel>
                  <div className="glass-panel mt-4 rounded-3xl p-1.5">
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
                  <SectionLabel kicker="Live · 14:40 UTC" tone="accent">Signals</SectionLabel>
                  <LiveSignals />
                </div>

                <div>
                  <SectionLabel kicker="Optional" tone="accent">Suggested</SectionLabel>
                  <div className="mt-4 space-y-2.5">
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
  const [draft, setDraft] = useState("");
  const [convOpen, setConvOpen] = useState(false);
  const [pending, setPending] = useState<string | null>(null);

  const launch = () => {
    const v = draft.trim();
    if (!v) return;
    setPending(v);
    setDraft("");
    setConvOpen(true);
  };

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
    <div className="relative mb-10 group">
      <div className="ai-iridescent absolute -inset-px rounded-3xl opacity-70 blur-[2px]" aria-hidden />
      <div className="glass-panel-strong relative rounded-3xl p-4">
        <div className="flex items-center gap-3">
          <div className="ai-iridescent size-7 rounded-full ring-1 ring-foreground/5" aria-hidden />
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                launch();
              }
            }}
            placeholder="Ask Perpetuity anything…"
            className="flex-1 bg-transparent text-sm font-medium placeholder:text-foreground/40 focus:outline-none"
          />
          <button
            type="button"
            onClick={launch}
            disabled={!draft.trim()}
            data-pill
            className="inline-flex size-9 items-center justify-center rounded-2xl bg-accent/90 text-accent-foreground shadow-[0_0_16px_-4px_hsl(211_100%_50%/0.45)] transition-all hover:scale-105 hover:bg-accent hover:shadow-[0_0_20px_-4px_hsl(211_100%_50%/0.6)] disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-foreground/5 pt-4">
          {/* Add task */}
          <Popover>
            <PopoverTrigger asChild>
              <button data-pill className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] text-foreground/55 transition-colors hover:bg-foreground/5 hover:text-foreground">
                <Plus className="size-3.5" />
                Add task
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-60 rounded-2xl border-foreground/10 bg-background/85 p-1.5 backdrop-blur-2xl">
              <button data-pill className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-foreground/5">
                <Paperclip className="size-4 text-foreground/60" />
                <span>Upload files</span>
              </button>
              <div className="my-1 h-px bg-foreground/5" />
              {addTaskItems.slice(1).map((it) => (
                <button data-pill key={it.label} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-foreground/5">
                  <it.icon className="size-4 text-foreground/60" />
                  <span>{it.label}</span>
                </button>
              ))}
            </PopoverContent>
          </Popover>

          {/* Permissions */}
          <Popover>
            <PopoverTrigger asChild>
              <button data-pill className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] text-foreground/55 transition-colors hover:bg-foreground/5 hover:text-foreground">
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
                <button data-pill className="inline-flex items-center gap-1 text-xs font-medium text-foreground/70 hover:text-foreground">
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
      <ConversationDialog
        open={convOpen}
        onOpenChange={setConvOpen}
        initialMessage={pending}
        conversationId={null}
      />
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
        <button data-pill className="glass-panel group inline-flex h-7 items-center gap-1.5 rounded-full pl-0.5 pr-2.5 text-left transition-colors hover:bg-[var(--glass-surface-strong)]">
          <span
            className={`flex size-[22px] items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_6px_-2px_rgba(0,0,0,0.25)] ring-1 ring-white/20`}
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
        <button data-pill className="glass-panel group inline-flex h-7 items-center gap-1.5 rounded-full pl-0.5 pr-2.5 text-left transition-colors hover:bg-[var(--glass-surface-strong)]">
          <span className="flex size-[22px] items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_6px_-2px_rgba(0,0,0,0.25)] ring-1 ring-white/20">
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
          <DialogTitle className="font-sans text-xl font-semibold">{title}</DialogTitle>
        </div>
      </DialogHeader>
      <div className="max-h-[60vh] overflow-y-auto p-2">
        {items.map((it, i) => (
          <button data-pill
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
        <button data-pill className="group relative inline-flex shrink-0 items-center gap-2.5 self-start rounded-full md:self-end">
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
    primary: "font-sans text-lg font-medium tracking-tight",
    accent: "font-sans text-base font-medium tracking-tight",
    muted: "font-sans text-base font-medium tracking-tight",
    quiet: "font-sans text-base font-medium tracking-tight",
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
      className={`relative rounded-3xl p-4 transition-all ${
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
          <h4 className={`mt-1.5 font-sans text-[15px] font-medium leading-snug ${done ? "line-through text-foreground/40" : ""}`}>
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
                    <button data-pill className="inline-flex items-center gap-1.5 rounded-full border border-accent/15 bg-accent/5 px-3 py-1.5 text-[11px] font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground">
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
          <DialogTitle className="font-sans text-xl font-semibold">{title}</DialogTitle>
        </DialogHeader>
        {body && (
          <div className="px-5 py-4">
            <p className="text-sm leading-relaxed text-foreground/70">{body}</p>
          </div>
        )}
        <div className="flex items-center justify-end gap-2 border-t border-foreground/5 px-4 py-3">
          {acts.map((a) => (
            <button data-pill
              key={a.label}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                a.primary
                  ? "bg-accent text-accent-foreground shadow-[0_0_14px_-4px_hsl(211_100%_50%/0.4)] hover:bg-accent/90"
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
        <button data-pill className="group block w-full cursor-pointer py-1 text-left">
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
          <button data-pill className="block w-full pr-16 text-left">
            <p className="text-sm leading-snug text-foreground/75 group-hover:text-foreground">{title}</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/45">{body}</p>
          </button>
        }
      />
      <div className="absolute right-3 top-3 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button data-pill
          aria-label="Add as task"
          className="inline-flex size-6 items-center justify-center rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground"
        >
          <Plus className="size-3" strokeWidth={2.5} />
        </button>
        <button data-pill
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

/* ---------- Live Signals (real market data + Polymarket odds) ---------- */

function Sparkline({
  points,
  up,
  width = 96,
  height = 28,
}: {
  points: number[];
  up: boolean;
  width?: number;
  height?: number;
}) {
  if (points.length < 2) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = Math.max(max - min, 0.0001);
  const step = width / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = i * step;
    const y = height - ((p - min) / range) * height;
    return [x, y] as const;
  });
  const line = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  const last = coords[coords.length - 1];
  const color = up ? "text-emerald-500" : "text-rose-500";
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className={`sparkline ${color}`}>
      <path className="area" d={area} />
      <path className="line" d={line} />
      <circle cx={last[0]} cy={last[1]} r="1.8" />
    </svg>
  );
}

function fmtPrice(s: MarketSeries) {
  const digits = s.price < 10 ? 3 : s.price < 1000 ? 2 : 0;
  const value = s.price.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  const prefix = s.currency === "USD" ? "$" : s.currency === "EUR" ? "€" : "";
  return `${prefix}${value}${s.unit ?? ""}`;
}

function ChangePill({ pct }: { pct: number }) {
  const up = pct >= 0;
  return (
    <span
      className={`inline-flex items-center rounded-full px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums ring-1 ${
        up
          ? "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400"
          : "bg-rose-500/10 text-rose-600 ring-rose-500/20 dark:text-rose-400"
      }`}
    >
      {up ? "+" : ""}
      {pct.toFixed(2)}%
    </span>
  );
}

function SectionCaption({ label, right }: { label: string; right?: React.ReactNode }) {
  return (
    <div className="mb-2 flex items-center justify-between px-1">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/55">{label}</p>
      {right}
    </div>
  );
}

function LiveDot({ label = "LIVE" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground/40">
      <span className="size-1 rounded-full bg-emerald-500 shadow-[0_0_6px_currentColor]" />
      {label}
    </span>
  );
}

function MarketRow({ s }: { s: MarketSeries }) {
  return (
    <ActionDialog
      title={s.name}
      kicker={`${s.sym} · ${fmtPrice(s)} · ${s.chgPct >= 0 ? "+" : ""}${s.chgPct.toFixed(2)}% day`}
      body={`Live quote and one-month series pulled from public market data. Perpetuity tracks ${s.name} because it moves landed cost and margin on your open contracts.`}
      actions={[{ label: "Brief me on the move", primary: true }, { label: "Watch this signal" }]}
      trigger={
        <button
          data-pill
          className="group flex w-full items-center gap-3 rounded-2xl px-2.5 py-2 text-left transition-colors hover:bg-[var(--glass-surface-strong)]"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-foreground/50">
                {s.sym}
              </span>
              <ChangePill pct={s.chgPct} />
            </div>
            <p className="mt-1 font-mono text-[13px] tabular-nums leading-none text-foreground/90">
              {fmtPrice(s)}
            </p>
          </div>
          <Sparkline points={s.points} up={s.up} width={84} height={26} />
        </button>
      }
    />
  );
}

function MarketHero({ s }: { s: MarketSeries }) {
  return (
    <div className="glass-panel-strong relative overflow-hidden rounded-3xl p-4">
      <div className="ai-iridescent pointer-events-none absolute -inset-px rounded-3xl opacity-25 blur-[3px]" aria-hidden />
      <div className="relative flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">{s.sym}</p>
          <p className="mt-1 font-mono text-[26px] leading-none tabular-nums">
            <span className="text-silver-metallic">{fmtPrice(s)}</span>
          </p>
          <div className="mt-1.5 flex items-center gap-2">
            <ChangePill pct={s.chgPct} />
            <span className="truncate text-[11px] text-foreground/45">{s.name}</span>
          </div>
        </div>
        <Sparkline points={s.points} up={s.up} width={140} height={48} />
      </div>
    </div>
  );
}

function OddsRow({ m }: { m: PolyOdds }) {
  const up = (m.chg24h ?? 0) >= 0;
  return (
    <a
      href={m.url}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl px-2.5 py-2 transition-colors hover:bg-[var(--glass-surface)]"
    >
      <div className="mb-1.5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="line-clamp-2 text-[12px] font-medium leading-snug text-foreground/85 group-hover:text-foreground">
            {m.question}
          </p>
          {m.volume24h ? (
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/35">
              ${Math.round(m.volume24h).toLocaleString("en-US")} · 24h vol
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-baseline gap-1.5">
          <span className="font-mono text-[19px] leading-none tabular-nums text-foreground">{m.prob}%</span>
          {m.chg24h !== null ? (
            <span
              className={`font-mono text-[9px] font-semibold tabular-nums ${
                up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
              }`}
            >
              {up ? "+" : ""}
              {m.chg24h}
            </span>
          ) : null}
        </div>
      </div>
      <div className="relative h-1 overflow-hidden rounded-full bg-foreground/[0.07]">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent/70 to-accent"
          style={{ width: `${m.prob}%` }}
        />
      </div>
    </a>
  );
}

function SkeletonRows({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-2 px-1 py-1">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-8 animate-pulse rounded-xl bg-foreground/[0.05]" />
      ))}
    </div>
  );
}

function LiveSignals() {
  const marketFn = useServerFn(getMarketSignals);
  const oddsFn = useServerFn(getPolymarketOdds);

  const markets = useQuery({
    queryKey: ["market-signals"],
    queryFn: () => marketFn(),
    refetchInterval: 120_000,
    staleTime: 60_000,
  });
  const odds = useQuery({
    queryKey: ["polymarket-odds"],
    queryFn: () => oddsFn(),
    refetchInterval: 180_000,
    staleTime: 60_000,
  });

  const series = markets.data?.series ?? [];
  const [hero, ...rest] = series;

  return (
    <div className="mt-4 space-y-3">
      {hero ? <MarketHero s={hero} /> : null}

      <div className="glass-panel rounded-3xl p-3">
        <SectionCaption label="Commodities · FX" right={<LiveDot />} />
        {markets.isPending ? (
          <SkeletonRows />
        ) : rest.length ? (
          <div className="divide-y divide-foreground/5">
            {rest.map((s) => (
              <MarketRow key={s.sym} s={s} />
            ))}
          </div>
        ) : (
          <p className="px-2 py-3 text-[11px] text-foreground/45">
            Market feed unavailable right now — retrying automatically.
          </p>
        )}
      </div>

      <div className="glass-panel rounded-3xl p-3">
        <SectionCaption
          label="Polymarket odds"
          right={
            <a
              href="https://polymarket.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground/40 hover:text-foreground/70"
            >
              Polymarket <ArrowUpRight className="size-2.5" />
            </a>
          }
        />
        {odds.isPending ? (
          <SkeletonRows count={5} />
        ) : odds.data?.markets.length ? (
          <div className="space-y-1">
            {odds.data.markets.map((m) => (
              <OddsRow key={m.question} m={m} />
            ))}
          </div>
        ) : (
          <p className="px-2 py-3 text-[11px] text-foreground/45">
            No live macro markets returned — retrying automatically.
          </p>
        )}
      </div>
    </div>
  );
}


