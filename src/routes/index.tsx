import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
  Check,
  Clock,
  AlertCircle,
  Flame,
  Calendar,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today — Perpetuity" },
      { name: "description", content: "Your continuous commercial intelligence for international trade." },
      { property: "og:title", content: "Today — Perpetuity" },
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

type Priority = "urgent" | "high" | "normal";
type Task = {
  id: string;
  title: string;
  context?: string;
  tag: string;
  priority: Priority;
  due?: string;
  done: boolean;
};

const seedTasks: Task[] = [
  {
    id: "1",
    title: "Resolve failed Stripe payment ($8.00 recurring)",
    context: "Stripe failed twice on acct_1ika5ja3kz32dpo1.",
    tag: "Payment",
    priority: "urgent",
    due: "Today · 17:00",
    done: false,
  },
  {
    id: "2",
    title: "Fix export-analytica build failure",
    context: "Railway pipeline failed at 19:38 UTC on @export-analytica/web.",
    tag: "Engineering",
    priority: "urgent",
    due: "Today",
    done: false,
  },
  {
    id: "3",
    title: "Review EU restrictions on timber exports to CIS",
    context: "Three suppliers in your network likely affected.",
    tag: "Compliance",
    priority: "high",
    due: "Tomorrow",
    done: false,
  },
  {
    id: "4",
    title: "Verify Bybit USDC withdrawal (4.89 USDC)",
    tag: "Treasury",
    priority: "normal",
    due: "This week",
    done: true,
  },
];

function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(seedTasks);
  const [draft, setDraft] = useState("");
  const [draftDue, setDraftDue] = useState("");

  const addTask = () => {
    if (!draft.trim()) return;
    setTasks((t) => [
      {
        id: crypto.randomUUID(),
        title: draft.trim(),
        tag: "Task",
        priority: "normal",
        due: draftDue || undefined,
        done: false,
      },
      ...t,
    ]);
    setDraft("");
    setDraftDue("");
  };

  const toggle = (id: string) =>
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));

  const open = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/15">
      {/* Ambient two-tone wash */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60rem 40rem at 12% -10%, hsl(25 40% 80% / 0.22), transparent 60%), radial-gradient(50rem 35rem at 100% 110%, hsl(222 50% 20% / 0.08), transparent 60%)",
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
        <Sidebar />

        <main className="flex-1 px-8 pt-12 pb-32 lg:pl-32 lg:pr-12 xl:pr-16">
          <div className="mx-auto max-w-6xl animate-fade-in-up">
            {/* Centered welcome */}
            <header className="mb-12 flex flex-col items-center text-center">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/40">
                Monday · 15 June
              </p>
              <h1 className="font-serif text-3xl italic tracking-tight text-foreground/90 md:text-[2rem]">
                Good afternoon, Perpetuity
              </h1>
              <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-foreground/55 md:text-base">
                Here's what we have for you today — two urgent items, a trip in five days,
                and three signals worth a glance.
              </p>
              <button className="glass-panel-strong mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-foreground/80 transition-colors hover:text-foreground">
                <span className="size-1.5 rounded-full bg-accent" />
                Morning brief
                <ArrowUpRight className="size-3.5" />
              </button>
            </header>

            {/* Trip card */}
            <div className="glass-panel mb-10 flex flex-col items-start justify-between gap-4 rounded-3xl p-6 md:flex-row md:items-center">
              <div className="flex items-start gap-4">
                <div className="glass-panel-strong flex size-11 items-center justify-center rounded-2xl">
                  <Plane className="size-4 text-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                      In 5 days
                    </span>
                    <span className="text-[10px] font-mono text-foreground/30">JUN 19 → 20</span>
                  </div>
                  <p className="mt-1 font-serif text-lg italic">
                    Bratislava → Yerevan → Bratislava
                  </p>
                  <p className="mt-1 text-xs text-foreground/50">
                    W6 4761 · Skopje 04:30 → Bratislava · Hotel in Yerevan pending.
                  </p>
                </div>
              </div>
              <button className="glass-panel-strong inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors hover:text-accent">
                Prepare briefing
                <ArrowUpRight className="size-3.5" />
              </button>
            </div>

            {/* Ask Perpetuity */}
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
              {/* Active Work — tasks */}
              <section className="lg:col-span-7">
                <div className="flex items-center justify-between gap-3 px-1">
                  <SectionLabel>Active Work</SectionLabel>
                  <span className="text-[10px] font-mono text-foreground/35">
                    {open.length} open · {done.length} done
                  </span>
                </div>

                {/* New task composer */}
                <div className="glass-panel-strong mt-5 rounded-2xl p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-full border border-foreground/15 text-foreground/40">
                      <Plus className="size-3.5" />
                    </div>
                    <input
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addTask()}
                      placeholder="Add a task for your agents…"
                      className="flex-1 bg-transparent text-sm placeholder:text-foreground/40 focus:outline-none"
                    />
                    <div className="flex items-center gap-1.5 rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] text-foreground/60">
                      <Calendar className="size-3" />
                      <input
                        value={draftDue}
                        onChange={(e) => setDraftDue(e.target.value)}
                        placeholder="Due"
                        className="w-16 bg-transparent placeholder:text-foreground/40 focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={addTask}
                      className="inline-flex size-7 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105"
                    >
                      <ArrowUp className="size-3.5" />
                    </button>
                  </div>
                </div>

                {/* Urgent group */}
                {open.some((t) => t.priority === "urgent") && (
                  <GroupHeader icon={<Flame className="size-3" />} label="Urgent" tone="urgent" />
                )}
                <div className="mt-3 space-y-2">
                  {open
                    .filter((t) => t.priority === "urgent")
                    .map((t) => (
                      <TaskRow key={t.id} task={t} onToggle={toggle} />
                    ))}
                </div>

                {open.some((t) => t.priority === "high") && (
                  <GroupHeader icon={<AlertCircle className="size-3" />} label="High priority" tone="high" />
                )}
                <div className="mt-3 space-y-2">
                  {open
                    .filter((t) => t.priority === "high")
                    .map((t) => (
                      <TaskRow key={t.id} task={t} onToggle={toggle} />
                    ))}
                </div>

                {open.some((t) => t.priority === "normal") && (
                  <GroupHeader icon={<Clock className="size-3" />} label="Later" tone="normal" />
                )}
                <div className="mt-3 space-y-2">
                  {open
                    .filter((t) => t.priority === "normal")
                    .map((t) => (
                      <TaskRow key={t.id} task={t} onToggle={toggle} />
                    ))}
                </div>

                {done.length > 0 && (
                  <>
                    <GroupHeader icon={<Check className="size-3" />} label="Completed" tone="done" />
                    <div className="mt-3 space-y-2">
                      {done.map((t) => (
                        <TaskRow key={t.id} task={t} onToggle={toggle} />
                      ))}
                    </div>
                  </>
                )}
              </section>

              {/* Right rail */}
              <aside className="space-y-8 lg:col-span-5">
                <div>
                  <SectionLabel>Need to Know</SectionLabel>
                  <div className="glass-panel mt-5 rounded-3xl p-6">
                    <IntelItem
                      time="09:41"
                      title="Multi-country trip: Bratislava → Yerevan → Bratislava"
                      body="Flights booked SKP–BRA. Hotel in Yerevan pending."
                      hot
                    />
                    <Divider />
                    <IntelItem
                      time="08:22"
                      title="Brent crude down 2.94% to $87.33"
                      body="Bunker surcharges typically ease within 10 days — monitor timber & pulp freight."
                    />
                    <Divider />
                    <IntelItem
                      time="06:05"
                      title="EUR/USD at 1.1567 — USD invoicing advantage"
                      body="Strong USD pricing relative to EUR contracts opened in Q1."
                    />
                  </div>
                </div>

                <div>
                  <SectionLabel>Suggested</SectionLabel>
                  <div className="mt-5 space-y-3">
                    <SuggestedItem
                      title="Consolidate duplicate pitch decks in Drive"
                      body="Two copies of Full Pitch Nostry.pdf. Merge to one master."
                    />
                    <SuggestedItem
                      title="Q3 timber & paper outlook"
                      body="Begin preliminary intel on CIS and LATAM supply-demand shifts."
                    />
                    <SuggestedItem
                      title="Validate influencer list against brand strategy"
                      body="Clarify whether the 100 INFLUENCERS LIST supports a B2B narrative."
                    />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>

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
      <div
        className="flex flex-col items-center gap-1 rounded-full px-2 py-4 shadow-[0_20px_60px_-20px_rgba(10,20,50,0.6)] ring-1 ring-white/5"
        style={{
          background:
            "linear-gradient(180deg, var(--navy) 0%, var(--navy-deep) 100%)",
          backdropFilter: "blur(28px) saturate(140%)",
        }}
      >
        <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-white/10 font-serif text-sm italic text-white ring-1 ring-white/15">
          P
        </div>
        {items.map((it) => (
          <button
            key={it.label}
            title={it.label}
            className={`group relative flex size-10 items-center justify-center rounded-full transition-colors ${
              it.active
                ? "bg-white/10 text-white ring-1 ring-white/15"
                : "text-white/55 hover:bg-white/5 hover:text-white"
            }`}
          >
            <it.icon className="size-[18px]" strokeWidth={1.5} />
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-white px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-[var(--navy-deep)] opacity-0 transition-opacity group-hover:opacity-100">
              {it.label}
            </span>
          </button>
        ))}
        <div className="mt-2 flex size-10 items-center justify-center rounded-full text-white/55 hover:text-white">
          <Bell className="size-[18px]" strokeWidth={1.5} />
        </div>
      </div>
    </nav>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/40">
      {children}
    </h3>
  );
}

function GroupHeader({
  icon,
  label,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  tone: "urgent" | "high" | "normal" | "done";
}) {
  const toneClass =
    tone === "urgent"
      ? "text-rose-700 bg-rose-700/8"
      : tone === "high"
      ? "text-accent bg-accent/10"
      : tone === "done"
      ? "text-foreground/40 bg-foreground/5"
      : "text-foreground/55 bg-foreground/5";
  return (
    <div className="mt-7 flex items-center gap-3">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${toneClass}`}
      >
        {icon}
        {label}
      </span>
      <div className="h-px flex-1 bg-foreground/5" />
    </div>
  );
}

function TaskRow({ task, onToggle }: { task: Task; onToggle: (id: string) => void }) {
  const priorityBar =
    task.priority === "urgent"
      ? "bg-rose-700/70"
      : task.priority === "high"
      ? "bg-accent/70"
      : "bg-foreground/15";

  return (
    <article
      className={`glass-panel group flex items-start gap-4 rounded-2xl p-4 transition-colors hover:bg-[var(--glass-surface-strong)] ${
        task.done ? "opacity-55" : ""
      }`}
    >
      <button
        onClick={() => onToggle(task.id)}
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-all ${
          task.done
            ? "border-transparent bg-foreground text-background"
            : "border-foreground/25 hover:border-foreground/60"
        }`}
        aria-label={task.done ? "Mark incomplete" : "Mark complete"}
      >
        {task.done && <Check className="size-3" strokeWidth={3} />}
      </button>

      <div className={`h-10 w-0.5 shrink-0 rounded-full ${priorityBar}`} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/45">
            {task.tag}
          </span>
          {task.due && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-foreground/40">
              <Clock className="size-3" />
              {task.due}
            </span>
          )}
        </div>
        <h4
          className={`mt-1 text-[15px] font-medium leading-snug ${
            task.done ? "line-through decoration-foreground/30" : ""
          }`}
        >
          {task.title}
        </h4>
        {task.context && !task.done && (
          <p className="mt-1 text-xs leading-relaxed text-foreground/55">{task.context}</p>
        )}
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
