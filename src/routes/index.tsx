import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Home,
  MessagesSquare,
  ListChecks,
  Send,
  Users,
  FileText,
  Compass,
  Plug,
  Settings,
  Plane,
  ArrowUp,
  ArrowUpRight,
  Check,
  AlertOctagon,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Video,
  Mail,
  Shield,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useUserTasks } from "@/lib/task-store";
import { ConversationDialog } from "@/components/conversation-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Daily Brief — Perpetuity" },
      { name: "description", content: "Your continuous commercial intelligence for international trade." },
    ],
  }),
  component: DashboardPage,
});

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

/* ---------------- Page ---------------- */

function DashboardPage() {
  useTheme();
  const userTasks = useUserTasks();
  const greeting = getGreeting();

  return (
    <div className="pixel-page relative min-h-screen w-full overflow-x-hidden pb-20">
      <PixelSky />
      <PixelHorizon />

      {/* SVG filter for pixelation (used by clouds) */}
      <svg width="0" height="0" className="absolute">
        <filter id="pixelate">
          <feGaussianBlur stdDeviation="0.4" />
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 1" />
          </feComponentTransfer>
        </filter>
      </svg>

      <PixelTicker />
      <PixelSidebar />

      <main className="relative z-10 mx-auto max-w-6xl px-6 pl-24 pt-8">
        {/* Greeting */}
        <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="pixel-heading text-[10px] text-[#0B1E3A]/70">MONDAY · 15 JUNE</p>
            <h1 className="pixel-heading mt-3 text-[26px] leading-tight text-[#0B1E3A] md:text-[34px]">
              {greeting},<br />
              <span className="text-[#0B4A9E]">STEVAN.</span>
            </h1>
            <p className="pixel-mono mt-3 max-w-xl text-[18px] leading-snug text-[#0B1E3A]/80">
              You have critical payment and deployment issues today, plus a multi-country
              trip starting in five days that needs final logistics review.
            </p>
          </div>
          <button className="pixel-btn pixel-btn-primary self-start md:self-end">
            <FileText className="size-3" strokeWidth={3} />
            Morning brief
          </button>
        </header>

        {/* Ask Perpetuity */}
        <AskPerpetuity />

        {/* Trip strip */}
        <div className="pixel-card mt-6 flex items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-3">
            <div className="pixel-card-sunk flex size-11 items-center justify-center">
              <Plane className="size-5 text-[#0B4A9E]" strokeWidth={2.5} />
            </div>
            <div>
              <p className="pixel-heading text-[8px] text-[#FF5A5F]">BRATISLAVA · 13 DAYS</p>
              <p className="pixel-mono mt-1 text-[18px] leading-none text-[#0B1E3A]">
                Bratislava → Yerevan → Bratislava · JUN 19 → 20
              </p>
            </div>
          </div>
          <button className="pixel-btn">Prepare briefing</button>
        </div>

        {/* Status pills row */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <StatusPixelPill
            tone="danger"
            icon={AlertOctagon}
            count="3"
            label="URGENT"
            items={[
              { title: "Stripe payment failed ($8.00)", sub: "Recurring · acct_1ika5ja3kz32dpo1" },
              { title: "Railway build failure", sub: "@export-analytica/web — 19:38 UTC" },
              { title: "EU timber restrictions — CIS", sub: "3 suppliers affected" },
            ]}
          />
          <StatusPixelPill
            tone="go"
            icon={TrendingUp}
            count="7"
            label="UPDATES"
            items={[
              { title: "Brent crude −2.94% to $87.33", sub: "Monitor freight surcharges" },
              { title: "EUR/USD at 1.1567", sub: "USD invoicing advantage" },
              { title: "New buyer reply: EuroMach", sub: "Q3 quote on 40t order" },
            ]}
          />
          <StatusPixelPill
            tone="primary"
            icon={CheckCircle2}
            count="2"
            label="APPROVALS"
            items={[
              { title: "Draft notice: EU timber restrictions", sub: "Ready for approval" },
              { title: "Q3 pricing update — LATAM", sub: "+4.2% on softwood SKUs" },
            ]}
          />
          <span className="pixel-pill pixel-bob" style={{ background: "#FFD43B" }}>
            <Plane className="size-3" strokeWidth={3} /> 5D · BRATISLAVA
          </span>
        </div>

        {/* Two-column workspace */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Active Work */}
          <section className="lg:col-span-7">
            <SectionHeader kicker="PRIORITY">ACTIVE WORK</SectionHeader>
            <div className="mt-4 space-y-4">
              {userTasks.map((ut) => (
                <PixelWorkCard
                  key={ut.id}
                  tag={ut.tag}
                  title={ut.title}
                  body={ut.body ?? "Created from Ask Perpetuity."}
                />
              ))}
              <PixelWorkCard
                urgent
                tag="Payment"
                title="Resolve failed Stripe payment ($8.00 recurring charge)"
                body="Stripe has failed twice to charge $8.00 on account acct_1ika5ja3kz32dpo1."
                actions={["Draft email", "Review & reply", "Analyze"]}
              />
              <PixelWorkCard
                tag="Engineering"
                title="Fix export-analytica build failure"
                body="Railway deployment pipeline failed multiple times (last at 19:38 UTC) on the @export-analytica/web service build."
                actions={["Draft fix", "Analyze logs"]}
              />
              <PixelWorkCard
                tag="Treasury"
                title="Verify Bybit USDC withdrawal (4.89 USDC)"
                body="Bybit confirms 4.89 USDC withdrawal sent to blockchain."
                actions={["Confirm", "Audit trail"]}
              />
              <PixelWorkCard
                tag="Compliance"
                title="Review new EU restrictions on timber exports to CIS"
                body="Three suppliers in your network are likely affected. Draft notice ready for approval."
                actions={["Draft notice", "Approve"]}
              />
            </div>

            <div className="mt-10">
              <SectionHeader kicker="TODAY">SCHEDULE</SectionHeader>
              <div className="pixel-card mt-4 divide-y-[3px] divide-[#0B1E3A]/90">
                <ScheduleRow time="09:30" title="Buyer call: EuroMach GmbH" sub="Video call" Icon={Video} tone="#6BE38B" />
                <ScheduleRow time="11:00" title="Review tender: Railway components — Poland" sub="Internal" Icon={FileText} tone="#FFD43B" />
                <ScheduleRow time="14:00" title="Follow up: Global Trade Solutions" sub="Email follow-up" Icon={Mail} tone="#7CC5FF" />
                <ScheduleRow time="16:30" title="Compliance check: REACH regulation" sub="Automated" Icon={Shield} tone="#C9A5FF" />
              </div>
            </div>
          </section>

          {/* Right rail */}
          <aside className="space-y-8 lg:col-span-5">
            <div>
              <SectionHeader kicker="INTEL">NEED TO KNOW</SectionHeader>
              <div className="pixel-card mt-4 p-5">
                <IntelItem
                  time="09:41"
                  hot
                  title="Multi-country trip: Bratislava → Yerevan → Bratislava (Jun 19–20)"
                  body="Flights SKP–BRA booked. Yerevan hotel pending confirmation."
                />
                <div className="pixel-divider my-4" />
                <IntelItem
                  time="08:22"
                  title="Brent crude −2.94% to $87.33 — monitor freight costs"
                  body="Energy price decline typically eases bunker surcharges within 10 days."
                />
                <div className="pixel-divider my-4" />
                <IntelItem
                  time="06:05"
                  title="EUR/USD at 1.1567 — USD invoicing advantage"
                  body="Strong USD pricing relative to EUR contracts opened in Q1."
                />
              </div>
            </div>

            <div>
              <SectionHeader kicker="OPTIONAL">SUGGESTED</SectionHeader>
              <div className="mt-4 space-y-3">
                <SuggestedItem
                  title="Clean up duplicate pitch deck versions in Drive"
                  body="Two copies of the full pitch deck. Consolidate to a single master."
                />
                <SuggestedItem
                  title="Q3 timber & paper market outlook: monitor CIS and LATAM"
                  body="Your target markets are heading into Q3. Begin preliminary intel."
                />
                <SuggestedItem
                  title="Validate influencer list against brand strategy"
                  body="You have a '100 INFLUENCERS LIST' in Drive. Clarify B2B narrative."
                />
              </div>
            </div>
          </aside>
        </div>

        {/* Task-completed floating notifications, cofounder style */}
        <div className="pointer-events-none fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2">
          <div className="pixel-pill pixel-bob" style={{ background: "#0B1E3A", color: "#6BE38B" }}>
            <span className="size-1.5 bg-[#6BE38B]" /> TASK COMPLETED · MARKET BRIEF
          </div>
          <div className="pixel-pill" style={{ background: "#0B1E3A", color: "#FFD43B" }}>
            <span className="size-1.5 bg-[#FFD43B]" /> TASK RUNNING · TENDER SCAN
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------------- Pixel scenery ---------------- */

function PixelSky() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px]"
        style={{
          background:
            "linear-gradient(180deg, #62B4FF 0%, #8CCBFF 60%, transparent 100%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-8 -z-0 h-40 overflow-hidden">
        <div className="pixel-drift-slow absolute top-6 left-0 h-10 w-32 rounded-full bg-white/95" style={{ boxShadow: "12px 6px 0 0 #fff, -14px 4px 0 0 #fff, 8px -6px 0 0 #fff" }} />
        <div className="pixel-drift-slower absolute top-16 left-1/3 h-8 w-24 rounded-full bg-white/90" style={{ boxShadow: "10px 4px 0 0 #fff, -12px 2px 0 0 #fff" }} />
        <div className="pixel-drift-slow absolute top-24 right-1/4 h-6 w-20 rounded-full bg-white/90" style={{ boxShadow: "8px 4px 0 0 #fff, -10px 2px 0 0 #fff" }} />
      </div>
    </>
  );
}

function PixelHorizon() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-56 overflow-hidden">
      <svg viewBox="0 0 1600 220" preserveAspectRatio="none" className="h-full w-full" shapeRendering="crispEdges">
        {/* far hills */}
        <path d="M0 130 L120 90 L240 130 L360 80 L500 130 L640 100 L780 130 L920 85 L1080 130 L1220 95 L1360 130 L1500 90 L1600 130 L1600 220 L0 220 Z" fill="#4E8FCB" />
        {/* mid hills */}
        <path d="M0 160 L100 130 L220 160 L340 120 L480 160 L620 135 L760 160 L900 125 L1040 160 L1180 130 L1320 160 L1460 130 L1600 160 L1600 220 L0 220 Z" fill="#2F6AA8" />
        {/* grass */}
        <rect x="0" y="170" width="1600" height="60" fill="#2F9E5C" />
        <rect x="0" y="170" width="1600" height="6" fill="#5EC084" />
        {/* pixel trees */}
        {[80, 260, 470, 690, 880, 1090, 1310, 1510].map((x, i) => (
          <g key={i} transform={`translate(${x} 130)`} shapeRendering="crispEdges">
            <rect x="14" y="30" width="6" height="16" fill="#5A3A1F" />
            <rect x="4" y="10" width="26" height="22" fill="#1F7F44" />
            <rect x="8" y="4" width="18" height="10" fill="#2A9E56" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ---------------- Ticker ---------------- */

const ticker = [
  { sym: "WTI", price: "$79.83", chg: "-5.95%", up: false },
  { sym: "NAT GAS", price: "$3.127", chg: "+0.22%", up: true },
  { sym: "GOLD", price: "$4,385", chg: "+3.45%", up: true },
  { sym: "SILVER", price: "$71.19", chg: "+4.73%", up: true },
  { sym: "COPPER", price: "$6.494", chg: "+0.76%", up: true },
  { sym: "BRENT", price: "$87.33", chg: "-2.94%", up: false },
  { sym: "EUR/USD", price: "1.1567", chg: "+0.18%", up: true },
];

function PixelTicker() {
  return (
    <div className="relative z-20 mx-auto max-w-6xl px-6 pt-4">
      <div className="pixel-card overflow-hidden bg-[#0B1E3A]" style={{ boxShadow: "6px 6px 0 0 #0B1E3A" }}>
        <div className="ticker-mask overflow-hidden py-1.5">
          <div className="animate-ticker flex whitespace-nowrap gap-3 px-3">
            {[...ticker, ...ticker].map((t, i) => (
              <span key={i} className="pixel-heading inline-flex items-center gap-2 text-[8px] text-white">
                <span className="text-white/50">{t.sym}</span>
                <span>{t.price}</span>
                <span style={{ color: t.up ? "#6BE38B" : "#FF8A8A" }}>{t.chg}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Sidebar ---------------- */

const navItems: { icon: typeof Home; label: string; to: string; active?: boolean }[] = [
  { icon: Home, label: "Home", to: "/", active: true },
  { icon: MessagesSquare, label: "Threads", to: "/threads" },
  { icon: ListChecks, label: "Assignments", to: "/assignments" },
  { icon: Send, label: "Outreach", to: "/outreach" },
  { icon: Users, label: "Contacts", to: "/contacts" },
  { icon: FileText, label: "Documents", to: "/documents" },
  { icon: Compass, label: "Opportunities", to: "/opportunities" },
  { icon: Plug, label: "Connections", to: "/connections" },
  { icon: Settings, label: "Settings", to: "/settings" },
];

function PixelSidebar() {
  return (
    <nav className="fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
      <div className="pixel-card flex flex-col items-center gap-2 p-2">
        <div className="pixel-heading flex size-9 items-center justify-center bg-[#0B1E3A] text-[12px] text-[#FFD43B]">P</div>
        {navItems.map((it) => (
          <Link
            key={it.label}
            to={it.to}
            title={it.label}
            className="group relative flex size-9 items-center justify-center border-2 border-transparent transition-colors hover:border-[#0B1E3A] hover:bg-[#FFD43B]"
            style={it.active ? { background: "#FFD43B", borderColor: "#0B1E3A" } : {}}
          >
            <it.icon className="size-4 text-[#0B1E3A]" strokeWidth={2.5} />
          </Link>
        ))}
      </div>
    </nav>
  );
}

/* ---------------- Ask Perpetuity ---------------- */

function AskPerpetuity() {
  const [draft, setDraft] = useState("");
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const launch = () => {
    const v = draft.trim();
    if (!v) return;
    setPending(v);
    setDraft("");
    setOpen(true);
  };
  return (
    <div className="pixel-card mt-2 p-4">
      <div className="flex items-center gap-3">
        <div className="pixel-card-sunk flex size-10 items-center justify-center">
          <Sparkles className="size-5 text-[#0B4A9E]" strokeWidth={2.5} />
        </div>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              launch();
            }
          }}
          placeholder="Ask Perpetuity anything..."
          className="pixel-mono flex-1 bg-transparent text-[20px] text-[#0B1E3A] placeholder:text-[#0B1E3A]/40 focus:outline-none"
        />
        <button onClick={launch} disabled={!draft.trim()} className="pixel-btn pixel-btn-primary disabled:opacity-40">
          <ArrowUp className="size-3" strokeWidth={3} />
          Send
        </button>
      </div>
      <div className="pixel-divider mt-3" />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button className="pixel-btn text-[7px]!" style={{ fontSize: 7 }}>+ Add task</button>
        <button className="pixel-btn" style={{ fontSize: 7 }}>Permissions</button>
        <span className="pixel-heading ml-auto flex items-center gap-2 text-[8px] text-[#0B1E3A]/60">
          <span className="size-1.5 animate-pulse bg-[#6BE38B]" />
          AGENTS ON STANDBY
        </span>
      </div>
      <ConversationDialog open={open} onOpenChange={setOpen} initialMessage={pending} conversationId={null} />
    </div>
  );
}

/* ---------------- Section header ---------------- */

function SectionHeader({ children, kicker }: { children: React.ReactNode; kicker: string }) {
  return (
    <div className="flex items-end gap-3">
      <div>
        <p className="pixel-heading text-[7px] text-[#0B1E3A]/60">{kicker}</p>
        <h3 className="pixel-heading mt-1 text-[13px] text-[#0B1E3A]">{children}</h3>
      </div>
      <div className="pixel-divider mb-2 flex-1" />
    </div>
  );
}

/* ---------------- Work card ---------------- */

const tagColors: Record<string, string> = {
  Payment: "#FF5A5F",
  Engineering: "#7CC5FF",
  Treasury: "#FFD43B",
  Compliance: "#C9A5FF",
  New: "#6BE38B",
};

function PixelWorkCard({
  tag,
  title,
  body,
  actions,
  urgent,
}: {
  tag: string;
  title: string;
  body: string;
  actions?: string[];
  urgent?: boolean;
}) {
  const [done, setDone] = useState(false);
  return (
    <article className="pixel-card p-4" style={urgent ? { borderColor: "#FF5A5F", boxShadow: "6px 6px 0 0 #FF5A5F" } : {}}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => setDone(!done)}
          className="mt-1 flex size-5 shrink-0 items-center justify-center border-2 border-[#0B1E3A]"
          style={{ background: done ? "#6BE38B" : "#fff" }}
          aria-label="Mark complete"
        >
          {done && <Check className="size-3 text-[#0B1E3A]" strokeWidth={4} />}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="pixel-tag" style={{ background: tagColors[tag] ?? "#FFD43B" }}>{tag}</span>
              {urgent && <span className="pixel-tag" style={{ background: "#0B1E3A", color: "#FF5A5F" }}>URGENT</span>}
            </div>
            <ArrowUpRight className="size-4 text-[#0B1E3A]/40" />
          </div>
          <h4 className={`pixel-body mt-3 text-[15px] font-semibold leading-snug text-[#0B1E3A] ${done ? "line-through opacity-40" : ""}`}>{title}</h4>
          <p className="pixel-body mt-2 text-[13px] leading-relaxed text-[#0B1E3A]/70">{body}</p>
          {actions && (
            <div className="mt-4 flex flex-wrap gap-2">
              {actions.map((a) => (
                <button key={a} className="pixel-btn">{a}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/* ---------------- Schedule row ---------------- */

function ScheduleRow({
  time,
  title,
  sub,
  Icon,
  tone,
}: {
  time: string;
  title: string;
  sub: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: string;
}) {
  return (
    <div className="group flex items-center gap-4 px-4 py-3">
      <span className="pixel-heading text-[10px] text-[#0B1E3A]/60 tabular-nums">{time}</span>
      <div className="flex size-9 items-center justify-center border-2 border-[#0B1E3A]" style={{ background: tone }}>
        <Icon className="size-4 text-[#0B1E3A]" strokeWidth={2.5} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="pixel-body text-[14px] font-semibold leading-tight text-[#0B1E3A] truncate">{title}</p>
        <p className="pixel-body text-[12px] text-[#0B1E3A]/60">{sub}</p>
      </div>
      <ArrowUpRight className="size-4 text-[#0B1E3A]/30 group-hover:text-[#0B1E3A]" />
    </div>
  );
}

/* ---------------- Intel & Suggested ---------------- */

function IntelItem({ time, title, body, hot }: { time: string; title: string; body: string; hot?: boolean }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="pixel-heading text-[8px] text-[#0B1E3A]/50">{time}</span>
        {hot && <span className="pixel-tag" style={{ background: "#FF5A5F", color: "#fff" }}>HOT</span>}
      </div>
      <p className="pixel-body text-[14px] font-semibold leading-snug text-[#0B1E3A]">{title}</p>
      <p className="pixel-body mt-1 text-[12px] leading-relaxed text-[#0B1E3A]/60">{body}</p>
    </div>
  );
}

function SuggestedItem({ title, body }: { title: string; body: string }) {
  return (
    <div className="pixel-card-sunk p-3">
      <p className="pixel-body text-[13px] font-semibold text-[#0B1E3A]">{title}</p>
      <p className="pixel-body mt-1 text-[12px] text-[#0B1E3A]/60">{body}</p>
    </div>
  );
}

/* ---------------- Status pill ---------------- */

function StatusPixelPill({
  tone,
  icon: Icon,
  count,
  label,
  items,
}: {
  tone: "danger" | "go" | "primary";
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  count: string;
  label: string;
  items: { title: string; sub: string }[];
}) {
  const bg = tone === "danger" ? "#FF5A5F" : tone === "go" ? "#6BE38B" : "#FFD43B";
  const fg = tone === "danger" ? "#fff" : "#0B1E3A";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="pixel-pill" style={{ background: bg, color: fg }}>
          <Icon className="size-3" strokeWidth={3} />
          {count} {label}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md border-0 bg-transparent p-0 shadow-none">
        <div className="pixel-card p-0">
          <DialogHeader className="flex-row items-center gap-3 space-y-0 border-b-[3px] border-[#0B1E3A] px-4 py-3" style={{ background: bg }}>
            <div className="flex size-8 items-center justify-center border-2 border-[#0B1E3A] bg-white">
              <Icon className="size-4 text-[#0B1E3A]" strokeWidth={3} />
            </div>
            <DialogTitle className="pixel-heading text-[12px] text-[#0B1E3A]">
              {count} {label}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            {items.map((it, i) => (
              <div key={i} className="border-b-[3px] border-[#0B1E3A]/10 p-3 last:border-b-0">
                <p className="pixel-body text-[14px] font-semibold text-[#0B1E3A]">{it.title}</p>
                <p className="pixel-body mt-1 text-[12px] text-[#0B1E3A]/60">{it.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
