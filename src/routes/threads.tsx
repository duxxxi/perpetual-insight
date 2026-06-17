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
  Archive,
  Tag,
  MoreHorizontal,
  CheckCircle2,
  ListChecks,
  Lightbulb,
  MessageSquare,
  BookOpen,
  Clock,
  Circle,
  Play,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import {
  AmbientBackground,
  CommodityTicker,
  AppSidebar,
  AppFooter,
} from "@/components/app-shell";
import { usePerpetuityPanel, type PanelDetail } from "@/components/perpetuity-panel";

export const Route = createFileRoute("/threads")({
  head: () => ({
    meta: [
      { title: "Threads — Perpetuity" },
      { name: "description", content: "Every conversation, task, and suggestion in one place." },
      { property: "og:title", content: "Threads — Perpetuity" },
      { property: "og:description", content: "Every conversation, task, and suggestion in one place." },
    ],
  }),
  component: ThreadsPage,
});

/* ---------- Data ---------- */

type Kind = "Conversation" | "Task" | "Suggestion" | "Briefing";
type Status = "Open" | "In progress" | "Done" | "Dismissed" | "Acted";
type TagT = "Payment" | "Treasury" | "Engineering" | "Compliance" | "Buyer" | "Trip" | "Market" | "Ops";

type Thread = {
  id: string;
  kind: Kind;
  title: string;
  preview: string;
  time: string;
  tag: TagT;
  status: Status;
  priority?: "urgent" | "watch" | null;
  unread?: boolean;
  starred?: boolean;
  source: string; // origin surface, e.g. "Dashboard chat", "Auto-suggested", "Daily brief"
  steps?: number; // for conversations / tasks
  summary: string;
  body: string;
};

const threads: Thread[] = [
  {
    id: "1",
    kind: "Conversation",
    title: "Should we hedge EUR exposure before the ECB print?",
    preview:
      "You asked Perpetuity to model 25/50/75bp scenarios against the open EuroMach quote. We walked through three FX paths…",
    time: "14:32",
    tag: "Treasury",
    status: "In progress",
    priority: "urgent",
    unread: true,
    starred: true,
    source: "Dashboard chat",
    steps: 6,
    summary:
      "Six-message thread modeling EUR/USD hedge before Thursday's ECB. Current lean: half-hedge at 1.156 forward, leave 50% floating against the EuroMach Q3 quote.",
    body:
      "You: 'What happens to the EuroMach margin if ECB surprises 50bp?'\nPerpetuity: walked through three scenarios, flagged that a 50bp cut compresses margin to 9.2% from 13.1%, suggested a half-hedge at the 1-week forward.",
  },
  {
    id: "2",
    kind: "Task",
    title: "Send firm CIF Yerevan price to EuroMach (week 28)",
    preview:
      "Drafted reply ready for approval. Pulls margin from current FX (EUR/USD 1.1567) and freight from Klaipeda-Yerevan lane…",
    time: "13:18",
    tag: "Buyer",
    status: "Open",
    priority: "watch",
    unread: true,
    source: "Auto-created from thread",
    steps: 3,
    summary:
      "Task is one approval away. Draft uses 12.4% margin, week-28 delivery, USDC settlement option. You need to confirm price floor before send.",
    body:
      "Step 1 — pulled latest FX & freight ✓\nStep 2 — drafted CIF Yerevan quote ✓\nStep 3 — awaiting your approval to send to Marta Kováčová.",
  },
  {
    id: "3",
    kind: "Suggestion",
    title: "Move 12,400 USDC over the verified Bybit rail",
    preview:
      "The 4.89 USDC test cleared in 38s with 0.31 in fees. Same path is now safe for the larger tranche queued in treasury…",
    time: "12:05",
    tag: "Treasury",
    status: "Open",
    source: "Auto-suggested",
    summary:
      "Perpetuity noticed the successful test withdrawal and is suggesting you promote the queued 12,400 USDC transfer on the same path. One click to execute or dismiss.",
    body:
      "Trigger: Bybit test withdrawal 4.89 USDC settled cleanly.\nProposed action: release the queued 12,400 USDC tranche to the same destination wallet.\nRisk note: gas spike on destination chain is 0.8% above 24h median — still within tolerance.",
  },
  {
    id: "4",
    kind: "Briefing",
    title: "Morning brief — Mon, Jun 16",
    preview:
      "Three things that moved overnight: REACH update on CIS timber, Klaipeda berth confirmed, and Stripe billing failure on the analytics workspace…",
    time: "07:00",
    tag: "Ops",
    status: "Acted",
    source: "Daily brief",
    summary:
      "You read the brief, opened the REACH compliance draft, and snoozed the Klaipeda update. Stripe failure spun off into its own task thread.",
    body:
      "1. REACH restriction on six HS codes lands Jul 1 — three suppliers affected.\n2. Container berthed Klaipeda; BL + seal docs inbound from Volkov.\n3. Stripe failed twice on acct_1ika5ja3kz32dpo1 — card likely expired.",
  },
  {
    id: "5",
    kind: "Conversation",
    title: "Draft an outreach sequence for 8 Yerevan distributors",
    preview:
      "You shared the shortlist Friday. Perpetuity proposed a 3-touch cadence in EN/RU with a localized landing variant…",
    time: "Yesterday",
    tag: "Buyer",
    status: "Done",
    source: "Dashboard chat",
    steps: 11,
    summary:
      "Eleven-message session. Final output: 3-touch EN/RU sequence, scheduled to begin Wednesday 09:00 Yerevan, with reply routing into the Buyer thread bucket.",
    body:
      "You iterated on tone (less formal), CTA (book a 20-min call), and timing (avoid Friday). Sequence is approved and queued in Outreach.",
  },
  {
    id: "6",
    kind: "Task",
    title: "File REACH compliance notice for Q3 CIS shipments",
    preview:
      "Draft notice covers the six restricted HS codes. Needs counter-sign from Andrei before Jul 1 deadline…",
    time: "Yesterday",
    tag: "Compliance",
    status: "In progress",
    priority: "watch",
    source: "Auto-created from brief",
    steps: 4,
    summary:
      "Two of four steps complete. Counter-signature is the blocker. ETA to filing: 36h after Andrei signs.",
    body:
      "Step 1 — pulled affected HS codes ✓\nStep 2 — drafted notice in EN/RU ✓\nStep 3 — awaiting Andrei Volkov counter-sign\nStep 4 — file with customs broker.",
  },
  {
    id: "7",
    kind: "Suggestion",
    title: "Switch acct_1ika5ja3kz32dpo1 to USDC settlement",
    preview:
      "Same card has failed Stripe twice this month. USDC rail to your treasury is healthy. Estimated saving: $14/mo in fees…",
    time: "Mon",
    tag: "Payment",
    status: "Dismissed",
    source: "Auto-suggested",
    summary:
      "You dismissed this last cycle — keeping it visible for context. Perpetuity will re-surface if a third failure occurs.",
    body:
      "Reason for surfacing: 2 consecutive Stripe failures on the same instrument.\nProposed action: migrate the analytics workspace to USDC settlement.\nYour decision (Mon 11:42): dismissed — 'card update is easier this cycle'.",
  },
  {
    id: "8",
    kind: "Briefing",
    title: "Market pulse — softwood, Klaipeda lane",
    preview:
      "Spot pricing held flat WoW. Freight is up 2.3% on the Klaipeda-Yerevan corridor. Two competitor quotes hit the wire…",
    time: "Mon",
    tag: "Market",
    status: "Acted",
    source: "Auto-briefing",
    summary:
      "You forwarded this brief to the Buyer task on the EuroMach quote so the new freight number is baked into the firm price.",
    body:
      "Softwood spot: €182/m³ (flat WoW).\nFreight Klaipeda-Yerevan: +2.3% WoW.\nCompetitor quotes seen: Holzwerk (€187) and Baltic Mills (€184).",
  },
];

const kinds = ["All", "Conversation", "Task", "Suggestion", "Briefing"] as const;

/* ---------- Page ---------- */

function ThreadsPage() {
  useTheme();
  const [selectedId, setSelectedId] = useState<string>(threads[0].id);
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const { open, panel } = usePerpetuityPanel();
  const selected = threads.find((t) => t.id === selectedId)!;

  const filtered = threads.filter((t) => {
    if (kind !== "All" && t.kind !== kind) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/15">
      <AmbientBackground />
      <CommodityTicker />

      <div className="flex">
        <AppSidebar active="threads" />

        <main className="flex-1 px-5 pt-6 pb-14 lg:pl-24 lg:pr-8">
          <div className="mx-auto max-w-7xl animate-fade-in-up">
            {/* Header */}
            <header className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/40">
                  Activity log · 142 threads · 9 open
                </p>
                <h1 className="font-sans text-3xl font-semibold tracking-tight md:text-4xl">
                  <span className="not-italic bg-gradient-to-br from-accent to-foreground bg-clip-text text-transparent">Threads</span>
                </h1>
                <p className="mt-1 text-[12px] text-foreground/55">
                  Every conversation, task, and suggestion Perpetuity has handled with you.
                </p>
              </div>
            </header>

            {/* Toolbar */}
            <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 md:w-[420px]">
                <Search className="size-4 text-foreground/40" strokeWidth={1.75} />
                <input
                  type="text"
                  placeholder="Search threads, tasks, suggestions…"
                  className="flex-1 bg-transparent text-sm placeholder:text-foreground/40 focus:outline-none"
                />
                <kbd className="hidden rounded-md bg-foreground/5 px-1.5 py-0.5 text-[10px] font-mono text-foreground/45 md:inline">
                  ⌘K
                </kbd>
              </div>
              <div className="glass-panel flex items-center gap-0.5 rounded-full p-0.5">
                {kinds.map((c) => {
                  const active = kind === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setKind(c)}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
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
                  type="button"
                  onClick={() =>
                    open({
                      title: "Filter threads",
                      eyebrow: "Perpetuity · filter",
                      why: "Narrow what you see by tag, owner, priority, or last activity. Perpetuity will keep these filters across sessions.",
                      steps: [
                        "Pick one or more tags (Treasury, Buyer, Compliance…)",
                        "Optionally constrain to threads opened in the last 24h",
                        "Save as a smart view (e.g. \"Urgent buyer replies\")",
                      ],
                    })
                  }
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
                          className={`w-full px-3.5 py-2.5 text-left transition-colors ${
                            selectedId === t.id
                              ? "bg-foreground/[0.05]"
                              : "hover:bg-foreground/[0.025]"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <KindBadge kind={t.kind} />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex min-w-0 items-center gap-2">
                                  {t.unread && (
                                    <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                                  )}
                                  <span
                                    className={`truncate text-[13px] ${
                                      t.unread ? "font-semibold text-foreground" : "text-foreground/85"
                                    }`}
                                  >
                                    {t.title}
                                  </span>
                                </div>
                                <span className="shrink-0 text-[10px] font-mono text-foreground/40">
                                  {t.time}
                                </span>
                              </div>
                              <p className="mt-1 line-clamp-1 text-[12px] leading-relaxed text-foreground/50">
                                {t.preview}
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                <div
                                  className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <TagChip tag={t.tag} />
                                  <StatusChip status={t.status} />
                                  {t.priority === "urgent" && <Pill tone="rose">Urgent</Pill>}
                                  {t.priority === "watch" && <Pill tone="amber">Watch</Pill>}
                                  {t.starred && (
                                    <Star className="size-3 shrink-0 fill-accent text-accent" strokeWidth={1.5} />
                                  )}
                                </div>
                                <span className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-foreground/35">
                                  {t.kind}
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
                <ThreadDetail thread={selected} open={open} />
              </section>
            </div>
          </div>
        </main>
      </div>

      {panel}
      <AppFooter />
    </div>
  );
}

/* ---------- Detail panel ---------- */

function ThreadDetail({
  thread,
  open,
}: {
  thread: Thread;
  open: (d: PanelDetail) => void;
}) {
  const base: PanelDetail = {
    title: thread.title,
    eyebrow: `${thread.kind} · ${thread.tag}`,
    source: `${thread.source} · ${thread.time}`,
    why: thread.summary,
    body: thread.body,
  };

  const headerAction = (label: string, why: string, steps: string[]) =>
    open({ ...base, eyebrow: `Thread · ${label}`, title: `${label} · ${thread.title}`, why, steps });

  const smartAction = (label: string, why: string, steps: string[]) =>
    open({
      ...base,
      eyebrow: `Action · ${label}`,
      title: `${label} · ${thread.title}`,
      why,
      steps,
      actions: [
        { label: "Run it", primary: true },
        { label: "Edit first" },
        { label: "Snooze" },
      ],
    });

  return (
    <div className="glass-panel-strong rounded-3xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-foreground/5 px-6 py-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <TagChip tag={thread.tag} />
            <StatusChip status={thread.status} />
            <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/40">
              {thread.kind}
            </span>
          </div>
          <h2 className="mt-2 font-sans text-xl font-semibold tracking-tight">{thread.title}</h2>
          <p className="mt-1 text-[12px] text-foreground/55">
            <span className="text-foreground/80">{thread.source}</span>
            {thread.steps ? ` · ${thread.steps} steps` : ""} · {thread.time}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <IconButton
            title="Star"
            onClick={() =>
              headerAction(
                "Star",
                "Starring pins this thread to the top of your Threads view and tells Perpetuity to surface related context first.",
                ["Pin to top", "Boost priority in morning brief"],
              )
            }
          >
            <Star className="size-4" strokeWidth={1.5} />
          </IconButton>
          <IconButton
            title="Tag"
            onClick={() =>
              headerAction(
                "Tag",
                "Add a tag to route this thread into the right bucket — Buyer, Treasury, Compliance, Ops…",
                ["Pick or create a tag", "Apply to thread + linked tasks"],
              )
            }
          >
            <Tag className="size-4" strokeWidth={1.5} />
          </IconButton>
          <IconButton
            title="Archive"
            onClick={() =>
              headerAction(
                "Archive",
                "Move out of the active list. Perpetuity will still surface it if a related counterparty or topic moves.",
                ["Archive now", "Auto-restore on related signal"],
              )
            }
          >
            <Archive className="size-4" strokeWidth={1.5} />
          </IconButton>
          <IconButton
            title="More"
            onClick={() =>
              headerAction(
                "More actions",
                "Other things you can do with this thread.",
                ["Forward to a contact", "Convert to brief", "Export PDF", "Mute notifications"],
              )
            }
          >
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

      {/* Body */}
      <div className="px-6 pb-5">
        <div className="glass-panel rounded-2xl px-5 py-4">
          <p className="whitespace-pre-line text-[13px] leading-relaxed text-foreground/80">
            {thread.body}
          </p>
        </div>
      </div>

      {/* Smart actions — vary by kind */}
      <div className="flex flex-wrap items-center gap-2 border-t border-foreground/5 px-6 py-4">
        {thread.kind === "Conversation" && (
          <>
            <SmartAction
              icon={Reply}
              label="Continue chat"
              primary
              onClick={() =>
                smartAction(
                  "Continue chat",
                  "Reopens this conversation with Perpetuity and pre-loads the full prior context so you don't repeat yourself.",
                  ["Restore message history", "Re-attach related docs", "Carry over CRM context"],
                )
              }
            />
            <SmartAction
              icon={ListChecks}
              label="Convert to task"
              onClick={() =>
                smartAction(
                  "Convert to task",
                  "Promote this conversation into a tracked assignment with owner, due date, and the chat history attached.",
                  ["Extract action items", "Assign owner", "Set due date", "Link back to this thread"],
                )
              }
            />
            <SmartAction
              icon={CheckCircle2}
              label="Mark resolved"
              onClick={() =>
                smartAction(
                  "Mark resolved",
                  "Close this conversation. Perpetuity will keep it searchable and re-surface if the topic returns.",
                  ["Close thread", "Index for future recall"],
                )
              }
            />
          </>
        )}
        {thread.kind === "Task" && (
          <>
            <SmartAction
              icon={Play}
              label="Approve & run"
              primary
              onClick={() =>
                smartAction(
                  "Approve & run",
                  "Greenlight the next step. Perpetuity will execute, log it, and report back when done.",
                  ["Send the drafted output", "Update CRM stage", "Notify counterparty", "Log the action"],
                )
              }
            />
            <SmartAction
              icon={Clock}
              label="Snooze"
              onClick={() =>
                smartAction(
                  "Snooze",
                  "Hide this task until later. Perpetuity will resurface based on counterparty or deadline signals.",
                  ["Snooze 4h / Tomorrow 09:00 / Next week", "Wake on counterparty reply"],
                )
              }
            />
            <SmartAction
              icon={CheckCircle2}
              label="Mark done"
              onClick={() =>
                smartAction(
                  "Mark done",
                  "Close the task. Perpetuity will write a short outcome note and link it to the original thread.",
                  ["Confirm completion", "Auto-write outcome summary"],
                )
              }
            />
            <SmartAction
              icon={Paperclip}
              label="Attach context"
              onClick={() =>
                smartAction(
                  "Attach context",
                  "Pull in extra docs, threads, or CRM records to inform the task.",
                  ["Search inbox & drive", "Suggest 3 most relevant docs", "Attach & re-summarize"],
                )
              }
            />
          </>
        )}
        {thread.kind === "Suggestion" && (
          <>
            <SmartAction
              icon={CheckCircle2}
              label="Act on it"
              primary
              onClick={() =>
                smartAction(
                  "Act on this suggestion",
                  "Execute the play Perpetuity proposed. The full reasoning trail is kept for review.",
                  ["Run the proposed action", "Log decision + reasoning", "Set a 24h check-in"],
                )
              }
            />
            <SmartAction
              icon={Clock}
              label="Remind me later"
              onClick={() =>
                smartAction(
                  "Remind me later",
                  "Push this suggestion to a quieter moment. Perpetuity holds the reasoning for when you return.",
                  ["Defer to tomorrow morning", "Keep linked signals tracked"],
                )
              }
            />
            <SmartAction
              icon={Circle}
              label="Dismiss"
              onClick={() =>
                smartAction(
                  "Dismiss suggestion",
                  "Tell Perpetuity this isn't relevant. It learns from the dismissal and won't re-surface unless signals strengthen.",
                  ["Mark not relevant", "Tighten future thresholds"],
                )
              }
            />
          </>
        )}
        {thread.kind === "Briefing" && (
          <>
            <SmartAction
              icon={ListChecks}
              label="Create tasks"
              primary
              onClick={() =>
                smartAction(
                  "Create tasks from brief",
                  "Spin off the items in this brief into tracked assignments with owners and deadlines.",
                  ["Extract action items", "Assign owners", "Push to Assignments"],
                )
              }
            />
            <SmartAction
              icon={BookOpen}
              label="Open full brief"
              onClick={() =>
                smartAction(
                  "Open full brief",
                  "Read the longer-form version with sources, charts, and confidence notes.",
                  ["Open in reader view", "Show source citations"],
                )
              }
            />
            <SmartAction
              icon={CheckCircle2}
              label="Mark read"
              onClick={() =>
                smartAction(
                  "Mark brief read",
                  "Acknowledge the brief. Perpetuity learns which sections you act on vs. skim.",
                  ["Mark read", "Adjust future brief weighting"],
                )
              }
            />
          </>
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-foreground/5 p-4">
        <div className="glass-panel rounded-2xl p-3">
          <div className="flex items-center gap-2">
            <div className="ai-iridescent size-6 shrink-0 rounded-full ring-1 ring-foreground/5" aria-hidden />
            <input
              type="text"
              placeholder="Ask Perpetuity to take it further…"
              className="flex-1 bg-transparent text-sm placeholder:text-foreground/40 focus:outline-none"
            />
            <button
              type="button"
              onClick={() =>
                open({
                  title: `Continue · ${thread.title}`,
                  eyebrow: "Ask Perpetuity",
                  why: "Drop a follow-up question or instruction. Perpetuity already has this thread, the linked docs, and the counterparty profile loaded.",
                  steps: [
                    "Compose your follow-up",
                    "Perpetuity drafts a response with sources",
                    "You approve, edit, or send straight through",
                  ],
                })
              }
              className="inline-flex size-8 items-center justify-center rounded-xl bg-foreground text-background transition-transform hover:scale-105"
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Bits ---------- */

const kindMeta: Record<Kind, { icon: typeof MessageSquare; cls: string }> = {
  Conversation: {
    icon: MessageSquare,
    cls: "text-sky-700/85 bg-sky-500/10 ring-sky-500/15 dark:text-sky-300",
  },
  Task: {
    icon: ListChecks,
    cls: "text-emerald-700/85 bg-emerald-500/10 ring-emerald-500/15 dark:text-emerald-300",
  },
  Suggestion: {
    icon: Lightbulb,
    cls: "text-amber-700/85 bg-amber-500/10 ring-amber-500/15 dark:text-amber-300",
  },
  Briefing: {
    icon: BookOpen,
    cls: "text-violet-700/85 bg-violet-500/10 ring-violet-500/15 dark:text-violet-300",
  },
};

function KindBadge({ kind }: { kind: Kind }) {
  const { icon: Icon, cls } = kindMeta[kind];
  return (
    <div
      className={`flex size-9 shrink-0 items-center justify-center rounded-full ring-1 ${cls}`}
      title={kind}
    >
      <Icon className="size-4" strokeWidth={1.75} />
    </div>
  );
}

const tagStyles: Record<TagT, string> = {
  Payment: "text-rose-700/80 bg-rose-500/10 ring-rose-500/15 dark:text-rose-300/90",
  Treasury: "text-emerald-700/80 bg-emerald-500/10 ring-emerald-500/15 dark:text-emerald-300/90",
  Engineering: "text-sky-700/80 bg-sky-500/10 ring-sky-500/15 dark:text-sky-300/90",
  Compliance: "text-violet-700/80 bg-violet-500/10 ring-violet-500/15 dark:text-violet-300/90",
  Buyer: "text-amber-700/80 bg-amber-500/10 ring-amber-500/15 dark:text-amber-300/90",
  Trip: "text-teal-700/80 bg-teal-500/10 ring-teal-500/15 dark:text-teal-300/90",
  Market: "text-indigo-700/80 bg-indigo-500/10 ring-indigo-500/15 dark:text-indigo-300/90",
  Ops: "text-foreground/70 bg-foreground/5 ring-foreground/10",
};

function TagChip({ tag }: { tag: TagT }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-1.5 py-px text-[9px] font-medium uppercase tracking-[0.1em] ring-1 ${tagStyles[tag]}`}
    >
      {tag}
    </span>
  );
}

const statusStyles: Record<Status, string> = {
  Open: "text-foreground/70 bg-foreground/5 ring-foreground/10",
  "In progress": "text-sky-700/85 bg-sky-500/10 ring-sky-500/15 dark:text-sky-300",
  Done: "text-emerald-700/85 bg-emerald-500/10 ring-emerald-500/15 dark:text-emerald-300",
  Acted: "text-emerald-700/85 bg-emerald-500/10 ring-emerald-500/15 dark:text-emerald-300",
  Dismissed: "text-foreground/45 bg-foreground/[0.04] ring-foreground/10",
};

function StatusChip({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-1.5 py-px text-[9px] font-medium uppercase tracking-[0.1em] ring-1 ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

function Pill({ children, tone }: { children: React.ReactNode; tone: "rose" | "amber" }) {
  const cls =
    tone === "rose"
      ? "text-rose-700/85 bg-rose-500/10 ring-rose-500/15 dark:text-rose-300"
      : "text-amber-700/85 bg-amber-500/10 ring-amber-500/15 dark:text-amber-300";
  return (
    <span className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-1.5 py-px text-[9px] font-medium uppercase tracking-[0.1em] ring-1 ${cls}`}>
      {children}
    </span>
  );
}

function IconButton({
  children,
  title,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
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
  onClick,
}: {
  icon: typeof Reply;
  label: string;
  primary?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
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
