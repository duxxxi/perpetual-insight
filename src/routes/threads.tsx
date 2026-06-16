import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Filter,
  Star,
  Paperclip,
  ArrowUp,
  Sparkles,
  Reply,
  Forward,
  Archive,
  Tag,
  MoreHorizontal,
  CheckCircle2,
  AlertOctagon,
  TrendingUp,
  Plane,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import {
  AmbientBackground,
  CommodityTicker,
  AppSidebar,
  AppFooter,
} from "@/components/app-shell";

export const Route = createFileRoute("/threads")({
  head: () => ({
    meta: [
      { title: "Threads — Perpetuity" },
      { name: "description", content: "Every conversation, prioritized by Perpetuity." },
      { property: "og:title", content: "Threads — Perpetuity" },
      { property: "og:description", content: "Every conversation, prioritized by Perpetuity." },
    ],
  }),
  component: ThreadsPage,
});

/* ---------- Data ---------- */

type Thread = {
  id: string;
  from: string;
  company: string;
  subject: string;
  preview: string;
  time: string;
  channel: "Email" | "WhatsApp" | "LinkedIn" | "Telegram";
  tag: "Payment" | "Treasury" | "Engineering" | "Compliance" | "Buyer" | "Trip";
  priority?: "urgent" | "watch" | null;
  unread?: boolean;
  starred?: boolean;
  summary: string;
};

const threads: Thread[] = [
  {
    id: "1",
    from: "Stripe Billing",
    company: "stripe.com",
    subject: "Payment failed — $8.00 recurring",
    preview:
      "Your recurring charge on acct_1ika5ja3kz32dpo1 failed for the second time. Update payment method to avoid service interruption…",
    time: "14:32",
    channel: "Email",
    tag: "Payment",
    priority: "urgent",
    unread: true,
    summary:
      "Stripe failed twice charging $8.00 on acct_1ika5ja3kz32dpo1. Likely card expiry on the saved instrument. Suggested: update card or switch to USDC settlement.",
  },
  {
    id: "2",
    from: "Marta Kováčová",
    company: "EuroMach a.s.",
    subject: "Re: Q3 quote — 40t softwood",
    preview:
      "Thanks for the prelim numbers. The board would like a firm price for 40t delivered Bratislava-Yerevan in week 28. Can you…",
    time: "13:18",
    channel: "Email",
    tag: "Buyer",
    priority: "watch",
    unread: true,
    starred: true,
    summary:
      "EuroMach is converting on the 40t softwood Q3 order. Wants firm CIF Yerevan pricing. Margin window: 11–14% at current FX (EUR/USD 1.1567).",
  },
  {
    id: "3",
    from: "Railway Deploys",
    company: "railway.app",
    subject: "Build failed · @export-analytica/web",
    preview:
      "Deploy 8a2f failed at 19:38 UTC. Step: install → vite build. Exit code 1. View logs to inspect the failure trace…",
    time: "Yesterday",
    channel: "Email",
    tag: "Engineering",
    priority: "urgent",
    unread: true,
    summary:
      "Vite build failed on @export-analytica/web. Likely missing env VITE_API_URL after last rotation. Three retries since 19:38 UTC.",
  },
  {
    id: "4",
    from: "Yerevan Marriott",
    company: "marriott.com",
    subject: "Reservation pending confirmation",
    preview:
      "Dear Mr. Perpetuity, we are holding your reservation for Jun 19–20. Kindly confirm by 18:00 local time to secure…",
    time: "11:04",
    channel: "Email",
    tag: "Trip",
    priority: "watch",
    summary:
      "Hotel hold expires today at 18:00 Yerevan time. Single confirm-reply unlocks the booking; no payment required up front.",
  },
  {
    id: "5",
    from: "Bybit",
    company: "bybit.com",
    subject: "Withdrawal confirmed — 4.89 USDC",
    preview:
      "Your withdrawal of 4.89 USDC has been processed and broadcast to the network. Hash 0x8a2…f3c.",
    time: "10:21",
    channel: "Email",
    tag: "Treasury",
    summary:
      "USDC test withdrawal cleared. Treasury rail is healthy; safe to move the larger 12,400 USDC tranche on the same path.",
  },
  {
    id: "6",
    from: "EU Trade Bulletin",
    company: "trade.ec.europa.eu",
    subject: "REACH update — timber from CIS",
    preview:
      "New restrictions on six HS codes affecting softwood imports from CIS countries enter into force Jul 1…",
    time: "Mon",
    channel: "Email",
    tag: "Compliance",
    priority: "watch",
    summary:
      "REACH restriction lands Jul 1. Three of your CIS suppliers ship the affected HS codes. Draft compliance notice already in your approvals queue.",
  },
  {
    id: "7",
    from: "Andrei Volkov",
    company: "Volkov Lumber",
    subject: "Container ETA Klaipeda",
    preview:
      "Vessel berthed this morning. Discharge tomorrow 06:00. Will share BL scan and seal numbers as soon as…",
    time: "Mon",
    channel: "WhatsApp",
    tag: "Buyer",
    summary:
      "Container is on schedule, discharge tomorrow 06:00 Klaipeda. BL + seal numbers inbound; nothing for you to do until docs land.",
  },
];

const channels = ["All", "Email", "WhatsApp", "LinkedIn", "Telegram"] as const;

/* ---------- Page ---------- */

function ThreadsPage() {
  useTheme();
  const [selectedId, setSelectedId] = useState<string>(threads[0].id);
  const [channel, setChannel] = useState<(typeof channels)[number]>("All");
  const selected = threads.find((t) => t.id === selectedId)!;

  const filtered = channel === "All" ? threads : threads.filter((t) => t.channel === channel);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/15">
      <AmbientBackground />
      <CommodityTicker />

      <div className="flex">
        <AppSidebar active="threads" />

        <main className="flex-1 px-6 pt-10 pb-28 lg:pl-32 lg:pr-10">
          <div className="mx-auto max-w-7xl animate-fade-in-up">
            {/* Header */}
            <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/40">
                  Inbox · 24 unread · 7 prioritized
                </p>
                <h1 className="font-serif text-3xl italic tracking-tight md:text-4xl">
                  <span className="not-italic text-accent">Threads</span>
                </h1>
              </div>
              <PriorityRow />
            </header>

            {/* Toolbar */}
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 md:w-[420px]">
                <Search className="size-4 text-foreground/40" strokeWidth={1.75} />
                <input
                  type="text"
                  placeholder="Search threads, people, companies…"
                  className="flex-1 bg-transparent text-sm placeholder:text-foreground/40 focus:outline-none"
                />
                <kbd className="hidden rounded-md bg-foreground/5 px-1.5 py-0.5 text-[10px] font-mono text-foreground/45 md:inline">
                  ⌘K
                </kbd>
              </div>
              <div className="glass-panel flex items-center gap-0.5 rounded-full p-0.5">
                {channels.map((c) => {
                  const active = channel === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setChannel(c)}
                      className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
                        active
                          ? "bg-foreground text-background"
                          : "text-foreground/55 hover:text-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
                <button
                  className="ml-1 flex size-7 items-center justify-center rounded-full text-foreground/45 hover:text-foreground"
                  title="Filter"
                >
                  <Filter className="size-3.5" strokeWidth={1.75} />
                </button>
              </div>
            </div>

            {/* Two-pane */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
              {/* List */}
              <section className="lg:col-span-5">
                <div className="glass-panel-strong overflow-hidden rounded-3xl">
                  <ul className="divide-y divide-foreground/5">
                    {filtered.map((t) => (
                      <li key={t.id}>
                        <button
                          onClick={() => setSelectedId(t.id)}
                          className={`w-full px-4 py-3.5 text-left transition-colors ${
                            selectedId === t.id
                              ? "bg-foreground/[0.05]"
                              : "hover:bg-foreground/[0.025]"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar name={t.from} />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex min-w-0 items-center gap-2">
                                  {t.unread && (
                                    <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                                  )}
                                  <span
                                    className={`truncate text-[13px] ${
                                      t.unread ? "font-semibold text-foreground" : "text-foreground/80"
                                    }`}
                                  >
                                    {t.from}
                                  </span>
                                </div>
                                <span className="shrink-0 text-[10px] font-mono text-foreground/40">
                                  {t.time}
                                </span>
                              </div>
                              <p className="mt-0.5 truncate text-[13px] text-foreground/85">
                                {t.subject}
                              </p>
                              <p className="mt-1 line-clamp-1 text-[12px] leading-relaxed text-foreground/50">
                                {t.preview}
                              </p>
                              <div className="mt-2 flex items-center gap-1.5">
                                <TagChip tag={t.tag} />
                                {t.priority === "urgent" && <Pill tone="rose">Urgent</Pill>}
                                {t.priority === "watch" && <Pill tone="amber">Watch</Pill>}
                                {t.starred && (
                                  <Star className="size-3 fill-accent text-accent" strokeWidth={1.5} />
                                )}
                                <span className="ml-auto text-[10px] uppercase tracking-[0.18em] text-foreground/35">
                                  {t.channel}
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Detail */}
              <section className="lg:col-span-7">
                <ThreadDetail thread={selected} />
              </section>
            </div>
          </div>
        </main>
      </div>

      <AppFooter />
    </div>
  );
}

/* ---------- Detail panel ---------- */

function ThreadDetail({ thread }: { thread: Thread }) {
  return (
    <div className="glass-panel-strong rounded-3xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-foreground/5 px-6 py-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <TagChip tag={thread.tag} />
            <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/40">
              {thread.channel}
            </span>
          </div>
          <h2 className="mt-2 font-serif text-xl italic tracking-tight">{thread.subject}</h2>
          <p className="mt-1 text-[12px] text-foreground/55">
            From <span className="text-foreground/80">{thread.from}</span> ·{" "}
            <span className="text-foreground/50">{thread.company}</span> · {thread.time}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <IconButton title="Star">
            <Star className="size-4" strokeWidth={1.5} />
          </IconButton>
          <IconButton title="Tag">
            <Tag className="size-4" strokeWidth={1.5} />
          </IconButton>
          <IconButton title="Archive">
            <Archive className="size-4" strokeWidth={1.5} />
          </IconButton>
          <IconButton title="More">
            <MoreHorizontal className="size-4" strokeWidth={1.5} />
          </IconButton>
        </div>
      </div>

      {/* AI summary */}
      <div className="relative px-6 py-5">
        <div className="ai-iridescent absolute inset-x-6 top-5 h-px opacity-60" aria-hidden />
        <div className="flex items-start gap-3 pt-3">
          <div className="ai-iridescent flex size-7 shrink-0 items-center justify-center rounded-full ring-1 ring-foreground/5">
            <Sparkles className="size-3.5 text-foreground/80" strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
              Perpetuity summary
            </p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-foreground/85">
              {thread.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Message body */}
      <div className="px-6 pb-5">
        <div className="glass-panel rounded-2xl px-5 py-4">
          <p className="text-[13px] leading-relaxed text-foreground/80">{thread.preview}</p>
          <p className="mt-3 text-[13px] leading-relaxed text-foreground/60">
            — {thread.from}, {thread.company}
          </p>
        </div>
      </div>

      {/* Smart actions */}
      <div className="flex flex-wrap items-center gap-2 border-t border-foreground/5 px-6 py-4">
        <SmartAction icon={Reply} label="Draft reply" primary />
        <SmartAction icon={Forward} label="Forward" />
        <SmartAction icon={CheckCircle2} label="Mark resolved" />
        <SmartAction icon={Paperclip} label="Attach context" />
      </div>

      {/* Composer */}
      <div className="border-t border-foreground/5 p-4">
        <div className="glass-panel rounded-2xl p-3">
          <div className="flex items-center gap-2">
            <div className="ai-iridescent size-6 shrink-0 rounded-full ring-1 ring-foreground/5" aria-hidden />
            <input
              type="text"
              placeholder="Ask Perpetuity to draft a reply…"
              className="flex-1 bg-transparent text-sm placeholder:text-foreground/40 focus:outline-none"
            />
            <button className="inline-flex size-8 items-center justify-center rounded-xl bg-foreground text-background transition-transform hover:scale-105">
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Bits ---------- */

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="glass-panel-strong flex size-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold uppercase tracking-wider text-foreground/70">
      {initials}
    </div>
  );
}

const tagStyles: Record<Thread["tag"], string> = {
  Payment: "text-rose-700/80 bg-rose-500/10 ring-rose-500/15 dark:text-rose-300/90",
  Treasury: "text-emerald-700/80 bg-emerald-500/10 ring-emerald-500/15 dark:text-emerald-300/90",
  Engineering: "text-sky-700/80 bg-sky-500/10 ring-sky-500/15 dark:text-sky-300/90",
  Compliance: "text-violet-700/80 bg-violet-500/10 ring-violet-500/15 dark:text-violet-300/90",
  Buyer: "text-amber-700/80 bg-amber-500/10 ring-amber-500/15 dark:text-amber-300/90",
  Trip: "text-teal-700/80 bg-teal-500/10 ring-teal-500/15 dark:text-teal-300/90",
};

function TagChip({ tag }: { tag: Thread["tag"] }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] ring-1 ${tagStyles[tag]}`}
    >
      {tag}
    </span>
  );
}

function Pill({ children, tone }: { children: React.ReactNode; tone: "rose" | "amber" }) {
  const cls =
    tone === "rose"
      ? "text-rose-700/85 bg-rose-500/10 ring-rose-500/15 dark:text-rose-300"
      : "text-amber-700/85 bg-amber-500/10 ring-amber-500/15 dark:text-amber-300";
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] ring-1 ${cls}`}>
      {children}
    </span>
  );
}

function IconButton({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <button
      title={title}
      className="flex size-8 items-center justify-center rounded-full text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground"
    >
      {children}
    </button>
  );
}

function SmartAction({
  icon: Icon,
  label,
  primary,
}: {
  icon: typeof Reply;
  label: string;
  primary?: boolean;
}) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
        primary
          ? "bg-foreground text-background hover:bg-foreground/90"
          : "glass-panel-strong text-foreground/80 hover:text-foreground"
      }`}
    >
      <Icon className="size-3.5" strokeWidth={1.75} />
      {label}
    </button>
  );
}

function PriorityRow() {
  const items = [
    { icon: AlertOctagon, count: 3, label: "Urgent", tone: "rose" as const },
    { icon: TrendingUp, count: 7, label: "Updates", tone: "emerald" as const },
    { icon: CheckCircle2, count: 2, label: "Approvals", tone: "violet" as const },
    { icon: Plane, count: 1, label: "Trip", tone: "teal" as const },
  ];
  const tones: Record<string, string> = {
    rose: "text-rose-700/85 dark:text-rose-300",
    emerald: "text-emerald-700/85 dark:text-emerald-300",
    violet: "text-violet-700/85 dark:text-violet-300",
    teal: "text-teal-700/85 dark:text-teal-300",
  };
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((it) => (
        <span
          key={it.label}
          className="glass-panel inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium"
        >
          <it.icon className={`size-3.5 ${tones[it.tone]}`} strokeWidth={1.75} />
          <span className="font-mono text-foreground/80">{it.count}</span>
          <span className="text-foreground/55">{it.label}</span>
        </span>
      ))}
    </div>
  );
}
