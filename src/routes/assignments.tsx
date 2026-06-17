import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Plus,
  Flag,
  User,
  ArrowUpRight,
  Mail,
  FileText,
  MessageSquare,
  Calendar,
  X,
} from "lucide-react";
import { PageShell } from "@/components/app-shell";
import { taskStore, useUserTasks } from "@/lib/task-store";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/assignments")({
  head: () => ({
    meta: [
      { title: "Assignments — Perpetuity" },
      { name: "description", content: "Every commitment Perpetuity is tracking on your behalf." },
      { property: "og:title", content: "Assignments — Perpetuity" },
      { property: "og:description", content: "Every commitment Perpetuity is tracking on your behalf." },
    ],
  }),
  component: AssignmentsPage,
});

type Status = "todo" | "doing" | "done";
type Priority = "P0" | "P1" | "P2";

type Task = {
  id: string;
  title: string;
  context: string;
  due: string;
  owner: "You" | "Perpetuity" | "Marta" | "Andrei";
  priority: Priority;
  status: Status;
  thread?: string;
  // Rich brief assembled by Perpetuity from CRM, mail, docs, calendar
  source?: string; // e.g. "Gmail · Marta Hojsík", "HubSpot · EuroMach a.s."
  why?: string; // why Perpetuity surfaced this
  steps?: string[]; // suggested next actions
  artifacts?: { kind: "email" | "doc" | "thread" | "event"; label: string }[];
};

const seed: Task[] = [
  {
    id: "a1",
    title: "Confirm Marriott Yerevan reservation",
    context: "Hold expires today 18:00 local",
    due: "Today · 18:00",
    owner: "You",
    priority: "P0",
    status: "todo",
    thread: "Yerevan Marriott",
    source: "Gmail · reservations@marriott.com · 06:14",
    why: "Booking holds the room block for the EuroMach board dinner on Fri. If it lapses Perpetuity has to re-quote at +28% rack rate.",
    steps: [
      "Approve the corporate rate on file (Amex •• 4421)",
      "Forward confirmation PDF to Marta + Andrei",
      "Block 3 days in your calendar (Thu–Sat)",
    ],
    artifacts: [
      { kind: "email", label: "Marriott · Reservation hold #YVN-88421" },
      { kind: "event", label: "Calendar · Yerevan trip · Thu 19" },
      { kind: "thread", label: "Thread · EuroMach board dinner" },
    ],
  },
  {
    id: "a2",
    title: "Update Stripe billing method",
    context: "Recurring $8 charge failed twice",
    due: "Today",
    owner: "You",
    priority: "P0",
    status: "todo",
    source: "Stripe webhook · invoice.payment_failed",
    why: "Two retries failed on the OpenAI API subscription. Third retry tonight 02:00 UTC will pause @export-analytica production keys.",
    steps: [
      "Open Stripe → replace expired card on file",
      "Trigger manual retry for invoice in_1Q…",
      "Verify production key still resolves",
    ],
    artifacts: [
      { kind: "doc", label: "Stripe · Invoice in_1QvA…3xR" },
      { kind: "email", label: "Stripe · Action required" },
    ],
  },
  {
    id: "a3",
    title: "Draft firm CIF Yerevan price · 40t softwood",
    context: "EuroMach board reviews Friday",
    due: "Thu",
    owner: "Perpetuity",
    priority: "P1",
    status: "doing",
    thread: "EuroMach a.s.",
    source: "HubSpot · Deal #4128 · stage Quote",
    why: "Margin model needs lock before Friday's board. Perpetuity has freight + duty + FX hedged; awaiting your floor margin.",
    steps: [
      "Confirm minimum margin floor (current draft: 11.4%)",
      "Approve EUR/AMD hedge ratio (Perpetuity suggests 60%)",
      "Auto-issue PDF quote on your letterhead",
    ],
    artifacts: [
      { kind: "doc", label: "Quote draft v3 · EUR 41,820 CIF" },
      { kind: "thread", label: "Thread · EuroMach a.s. RFQ" },
    ],
  },
  {
    id: "a4",
    title: "File REACH compliance notice",
    context: "Three CIS suppliers ship affected HS codes",
    due: "Jun 30",
    owner: "You",
    priority: "P1",
    status: "todo",
    source: "Regulatory monitor · ECHA bulletin 2026/14",
    why: "New SVHC entry hits HS 3824.99 — covers your binder shipments from Volkov, Stori, and Kazan. Notice window closes Jun 30.",
    steps: [
      "Review the 3 affected supplier contracts",
      "Sign the consolidated REACH notice (Perpetuity prepared)",
      "Distribute to suppliers with translation",
    ],
    artifacts: [
      { kind: "doc", label: "REACH notice · draft · 4 pages" },
      { kind: "doc", label: "Supplier impact memo" },
    ],
  },
  {
    id: "a5",
    title: "Move 12,400 USDC tranche · Bybit → cold",
    context: "Test withdrawal cleared this morning",
    due: "This week",
    owner: "You",
    priority: "P2",
    status: "todo",
    source: "Treasury policy · monthly sweep rule",
    why: "Monthly sweep rule fired. Hot wallet sits 38% over policy ceiling after Q2 collections.",
    steps: [
      "Approve withdrawal address (allowlisted · Ledger 2)",
      "Confirm 2FA + email challenge",
      "Log entry in treasury ledger (Perpetuity will draft)",
    ],
    artifacts: [
      { kind: "doc", label: "Treasury policy v4.1" },
      { kind: "doc", label: "Test withdrawal receipt · 06:08" },
    ],
  },
  {
    id: "a6",
    title: "Re-deploy @export-analytica/web",
    context: "Restore VITE_API_URL after rotation",
    due: "Yesterday",
    owner: "Perpetuity",
    priority: "P1",
    status: "done",
    source: "GitHub Actions · deploy.yml run #482",
    why: "Key rotated at 03:00 UTC. Perpetuity redeployed with the new env and verified /healthz green.",
    steps: ["Done · production green · 03:14 UTC"],
    artifacts: [
      { kind: "doc", label: "Deploy log · run #482" },
    ],
  },
  {
    id: "a7",
    title: "Send BL + seal numbers to ops",
    context: "Container discharges Klaipeda 06:00",
    due: "Tomorrow",
    owner: "Andrei",
    priority: "P2",
    status: "doing",
    thread: "Klaipeda discharge",
    source: "Shipline EDI · MSC · MRSU 481··",
    why: "Ops needs BL + seal 12h before discharge or the container goes to inspection queue (+48h delay typical).",
    steps: [
      "Pull BL PDF from inbox (Perpetuity attached)",
      "Forward to ops@yourtrade with seal #",
      "Ping Andrei on Telegram when sent",
    ],
    artifacts: [
      { kind: "email", label: "MSC · BL MEDU48123…" },
      { kind: "thread", label: "Thread · Klaipeda discharge" },
    ],
  },
];

const columns: { key: Status; label: string; tone: string }[] = [
  { key: "todo", label: "To do", tone: "text-foreground/60" },
  { key: "doing", label: "In motion", tone: "text-amber-700/80 dark:text-amber-300/90" },
  { key: "done", label: "Resolved", tone: "text-emerald-700/80 dark:text-emerald-300/90" },
];

function AssignmentsPage() {
  const [filter, setFilter] = useState<"All" | "You" | "Perpetuity">("All");
  const [tasks, setTasks] = useState<Task[]>(seed);
  const [openTask, setOpenTask] = useState<Task | null>(null);
  const [composerOpen, setComposerOpen] = useState(false);
  const [proposalOpen, setProposalOpen] = useState<null | "promote" | "review">(null);
  const userTasks = useUserTasks();

  const allTasks: Task[] = useMemo(() => {
    const userCards: Task[] = userTasks.map((u) => ({
      id: u.id,
      title: u.title,
      context: u.body ?? "Created via Ask Perpetuity",
      due: "Just now",
      owner: "You",
      priority: "P1",
      status: u.done ? "done" : "todo",
      source: "Ask Perpetuity · manual entry",
      why: "You added this directly. Perpetuity will watch for related threads and surface context as it arrives.",
      steps: ["Add more detail or assign owner", "Set a due date"],
    }));
    return [...userCards, ...tasks];
  }, [tasks, userTasks]);

  const visible = filter === "All" ? allTasks : allTasks.filter((t) => t.owner === filter);

  const cycle = (t: Task) => {
    // user-store task?
    if (userTasks.some((u) => u.id === t.id)) {
      taskStore.toggle(t.id);
      return;
    }
    const next: Status = t.status === "todo" ? "doing" : t.status === "doing" ? "done" : "todo";
    setTasks((prev) => prev.map((x) => (x.id === t.id ? { ...x, status: next } : x)));
    if (openTask?.id === t.id) setOpenTask({ ...t, status: next });
  };

  return (
    <PageShell
      active="assignments"
      eyebrow={`${allTasks.filter((t) => t.status !== "done").length} open · 2 urgent`}
      title="that move the trade forward"
      accentWord="Assignments"
      rightSlot={
        <div className="flex items-center gap-2">
          <div className="glass-panel flex items-center gap-0.5 rounded-full p-0.5">
            {(["All", "You", "Perpetuity"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
                  filter === f ? "bg-foreground text-background" : "text-foreground/55 hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setComposerOpen(true)}
            className="glass-panel-strong inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-medium hover:bg-foreground/5"
          >
            <Plus className="size-3.5" strokeWidth={2} /> New assignment
          </button>
        </div>
      }
    >
      {/* Perpetuity proposal strip */}
      <div className="glass-panel-strong relative mb-4 overflow-hidden rounded-3xl p-5">
        <div className="ai-iridescent absolute inset-x-5 top-0 h-px opacity-60" aria-hidden />
        <div className="flex items-start gap-3">
          <div className="ai-iridescent flex size-8 items-center justify-center rounded-full ring-1 ring-foreground/5">
            <Sparkles className="size-4 text-foreground/80" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
              Perpetuity suggests
            </p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-foreground/85">
              Three threads from this morning look like commitments. Promote them to assignments so nothing slips before the EuroMach board review on Friday.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setProposalOpen("promote")}
                className="rounded-full bg-foreground px-3.5 py-1.5 text-[11px] font-medium text-background hover:opacity-90"
              >
                Promote 3 to assignments
              </button>
              <button
                type="button"
                onClick={() => setProposalOpen("review")}
                className="rounded-full bg-foreground/5 px-3.5 py-1.5 text-[11px] font-medium text-foreground/70 hover:bg-foreground/10"
              >
                Review one-by-one
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {columns.map((col) => {
          const items = visible.filter((t) => t.status === col.key);
          return (
            <section key={col.key} className="glass-panel-strong rounded-3xl p-4">
              <div className="mb-3 flex items-center justify-between px-1">
                <p className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${col.tone}`}>
                  {col.label}
                </p>
                <span className="text-[10px] font-mono text-foreground/40">{items.length}</span>
              </div>
              <ul className="flex flex-col gap-2.5">
                {items.map((t) => (
                  <TaskCard key={t.id} task={t} onCycle={() => cycle(t)} onOpen={() => setOpenTask(t)} />
                ))}
                {items.length === 0 && (
                  <li className="rounded-2xl border border-dashed border-foreground/10 px-3 py-6 text-center text-[11px] text-foreground/35">
                    Nothing here
                  </li>
                )}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Task detail */}
      <TaskDetailDialog
        task={openTask}
        onClose={() => setOpenTask(null)}
        onCycle={() => openTask && cycle(openTask)}
      />

      {/* Composer */}
      <NewAssignmentDialog
        open={composerOpen}
        onOpenChange={setComposerOpen}
        onCreate={(title, body) => {
          taskStore.add({ title, body, tag: "New" });
          setComposerOpen(false);
        }}
      />

      {/* Proposal */}
      <ProposalDialog
        mode={proposalOpen}
        onClose={() => setProposalOpen(null)}
        onPromote={() => {
          const promoted: Task[] = [
            {
              id: `p_${Date.now()}_1`,
              title: "Reply to Volkov · Q3 indicative",
              context: "Promoted from thread · 07:42",
              due: "Today",
              owner: "You",
              priority: "P1",
              status: "todo",
              source: "Thread · Volkov LLC",
              why: "Volkov asked for Q3 indicative twice. No reply in 26h.",
              steps: ["Approve Perpetuity's draft", "Send"],
            },
            {
              id: `p_${Date.now()}_2`,
              title: "Counter Andrei on Klaipeda demurrage",
              context: "Promoted from thread · 08:11",
              due: "Tomorrow",
              owner: "Perpetuity",
              priority: "P2",
              status: "todo",
              source: "Thread · Klaipeda discharge",
              why: "Andrei proposed 4-day free time. Standard is 7.",
            },
            {
              id: `p_${Date.now()}_3`,
              title: "Confirm Marta's EuroMach agenda",
              context: "Promoted from thread · 09:03",
              due: "Thu",
              owner: "You",
              priority: "P1",
              status: "todo",
              source: "Thread · EuroMach board",
              why: "Marta needs sign-off before printing.",
            },
          ];
          setTasks((prev) => [...promoted, ...prev]);
          setProposalOpen(null);
        }}
      />
    </PageShell>
  );
}

const priorityTone: Record<Priority, string> = {
  P0: "text-rose-700/85 bg-rose-500/10 ring-rose-500/15 dark:text-rose-300",
  P1: "text-amber-700/85 bg-amber-500/10 ring-amber-500/15 dark:text-amber-300",
  P2: "text-foreground/60 bg-foreground/5 ring-foreground/10",
};

function TaskCard({ task, onCycle, onOpen }: { task: Task; onCycle: () => void; onOpen: () => void }) {
  const Icon = task.status === "done" ? CheckCircle2 : task.status === "doing" ? Clock : Circle;
  return (
    <li
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="glass-panel group cursor-pointer rounded-2xl px-3.5 py-3 transition-colors hover:bg-foreground/[0.03] focus:outline-none focus:ring-2 focus:ring-accent/30"
    >
      <div className="flex items-start gap-2.5">
        <button
          type="button"
          aria-label={`Cycle status (now ${task.status})`}
          onClick={(e) => {
            e.stopPropagation();
            onCycle();
          }}
          className="-m-1 rounded-full p-1 transition-colors hover:bg-foreground/5"
        >
          <Icon
            className={`size-4 shrink-0 ${
              task.status === "done"
                ? "text-emerald-600"
                : task.status === "doing"
                ? "text-amber-600"
                : "text-foreground/40"
            }`}
            strokeWidth={1.75}
          />
        </button>
        <div className="min-w-0 flex-1">
          <p
            className={`text-[13px] leading-snug ${
              task.status === "done" ? "text-foreground/45 line-through" : "text-foreground/90"
            }`}
          >
            {task.title}
          </p>
          <p className="mt-1 text-[11px] text-foreground/50">{task.context}</p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
              className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] ring-1 transition-opacity hover:opacity-80 ${priorityTone[task.priority]}`}
            >
              <Flag className="size-2.5" strokeWidth={2} /> {task.priority}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
              className="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-foreground/55 hover:bg-foreground/10"
            >
              <User className="size-2.5" strokeWidth={2} /> {task.owner}
            </button>
            <span className="text-[10px] font-mono text-foreground/40">{task.due}</span>
            {task.thread && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
                }}
                className="ml-auto inline-flex items-center gap-0.5 text-[10px] text-foreground/45 transition-opacity hover:text-foreground/80 lg:opacity-0 lg:group-hover:opacity-100"
              >
                Thread <ArrowUpRight className="size-2.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

const artifactIcon = {
  email: Mail,
  doc: FileText,
  thread: MessageSquare,
  event: Calendar,
} as const;

function TaskDetailDialog({
  task,
  onClose,
  onCycle,
}: {
  task: Task | null;
  onClose: () => void;
  onCycle: () => void;
}) {
  return (
    <Dialog open={!!task} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xl gap-0 border-foreground/10 bg-background/90 p-0 backdrop-blur-2xl sm:rounded-2xl">
        <DialogTitle className="sr-only">{task?.title ?? "Assignment"}</DialogTitle>
        {task && (
          <div className="relative overflow-hidden rounded-2xl">
            <div className="ai-iridescent absolute inset-x-0 top-0 h-px opacity-70" aria-hidden />
            <div className="flex items-start gap-3 px-5 pt-5">
              <div className="ai-iridescent flex size-8 shrink-0 items-center justify-center rounded-full ring-1 ring-foreground/5">
                <Sparkles className="size-4 text-foreground/80" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
                  Perpetuity · brief
                </p>
                <h3 className="mt-1 font-sans text-[19px] font-semibold leading-snug text-foreground">
                  {task.title}
                </h3>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10.5px] text-foreground/55">
                  <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] ring-1 ${priorityTone[task.priority]}`}>
                    <Flag className="size-2.5" strokeWidth={2} /> {task.priority}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em]">
                    <User className="size-2.5" strokeWidth={2} /> {task.owner}
                  </span>
                  <span className="font-mono text-foreground/40">{task.due}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 px-5 py-4">
              {task.source && (
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
                    Source
                  </p>
                  <p className="mt-1 text-[12px] text-foreground/75">{task.source}</p>
                </div>
              )}
              {task.why && (
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
                    Why this matters
                  </p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-foreground/80">{task.why}</p>
                </div>
              )}
              {task.steps && task.steps.length > 0 && (
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
                    Next steps
                  </p>
                  <ol className="mt-1.5 space-y-1">
                    {task.steps.map((s, i) => (
                      <li key={i} className="flex gap-2 text-[12.5px] text-foreground/80">
                        <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-foreground/5 font-mono text-[9px] text-foreground/55">
                          {i + 1}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {task.artifacts && task.artifacts.length > 0 && (
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
                    Pulled from your stack
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {task.artifacts.map((a, i) => {
                      const Icon = artifactIcon[a.kind];
                      return (
                        <li key={i}>
                          <button
                            type="button"
                            className="group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[12px] text-foreground/75 hover:bg-foreground/5"
                          >
                            <Icon className="size-3 text-foreground/50" strokeWidth={1.75} />
                            <span className="flex-1 truncate">{a.label}</span>
                            <ArrowUpRight className="size-3 text-foreground/30 transition-colors group-hover:text-foreground/70" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 border-t border-foreground/5 bg-foreground/[0.02] px-5 py-3">
              <button
                type="button"
                onClick={onCycle}
                className="rounded-full bg-foreground px-3 py-1.5 text-[11px] font-medium text-background hover:opacity-90"
              >
                {task.status === "todo" ? "Start working" : task.status === "doing" ? "Mark resolved" : "Reopen"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-foreground/5 px-3 py-1.5 text-[11px] font-medium text-foreground/70 hover:bg-foreground/10"
              >
                Let Perpetuity handle it
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-foreground/5 px-3 py-1.5 text-[11px] font-medium text-foreground/70 hover:bg-foreground/10"
              >
                Snooze 1d
              </button>
              <button
                type="button"
                onClick={onClose}
                className="ml-auto rounded-full p-1 text-foreground/45 hover:bg-foreground/5 hover:text-foreground"
                aria-label="Close"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function NewAssignmentDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onCreate: (title: string, body: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!title.trim()) return;
    onCreate(title.trim(), body.trim());
    setTitle("");
    setBody("");
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg gap-0 border-foreground/10 bg-background/90 p-0 backdrop-blur-2xl sm:rounded-2xl">
        <DialogTitle className="sr-only">New assignment</DialogTitle>
        <form onSubmit={submit} className="relative overflow-hidden rounded-2xl p-5">
          <div className="ai-iridescent absolute inset-x-5 top-0 h-px opacity-70" aria-hidden />
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
            New assignment
          </p>
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to happen?"
            className="mt-2 w-full bg-transparent font-sans text-lg font-medium tracking-tight text-foreground placeholder:text-foreground/30 focus:outline-none"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Context (optional) — Perpetuity will enrich from your inbox and CRM."
            rows={3}
            className="mt-2 w-full resize-none bg-transparent text-[13px] text-foreground/80 placeholder:text-foreground/30 focus:outline-none"
          />
          <div className="mt-3 flex items-center justify-between border-t border-foreground/5 pt-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-full bg-foreground/5 px-3 py-1.5 text-[11px] font-medium text-foreground/70 hover:bg-foreground/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="rounded-full bg-foreground px-3.5 py-1.5 text-[11px] font-medium text-background hover:opacity-90 disabled:opacity-40"
            >
              Create assignment
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ProposalDialog({
  mode,
  onClose,
  onPromote,
}: {
  mode: null | "promote" | "review";
  onClose: () => void;
  onPromote: () => void;
}) {
  return (
    <Dialog open={!!mode} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg gap-0 border-foreground/10 bg-background/90 p-0 backdrop-blur-2xl sm:rounded-2xl">
        <DialogTitle className="sr-only">Perpetuity proposal</DialogTitle>
        <div className="relative overflow-hidden rounded-2xl p-5">
          <div className="ai-iridescent absolute inset-x-5 top-0 h-px opacity-70" aria-hidden />
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
            {mode === "promote" ? "Promote 3 threads" : "Review one-by-one"}
          </p>
          <h3 className="mt-1 font-sans text-[18px] font-semibold text-foreground">
            {mode === "promote"
              ? "Convert these threads into tracked assignments?"
              : "Step through each candidate"}
          </h3>
          <ul className="mt-3 space-y-2 text-[12.5px] text-foreground/80">
            <li className="rounded-lg bg-foreground/[0.03] px-3 py-2">
              <p className="font-medium">Volkov · Q3 indicative</p>
              <p className="text-foreground/55">Asked twice, no reply in 26h.</p>
            </li>
            <li className="rounded-lg bg-foreground/[0.03] px-3 py-2">
              <p className="font-medium">Klaipeda demurrage counter</p>
              <p className="text-foreground/55">Andrei proposed 4-day free time, standard is 7.</p>
            </li>
            <li className="rounded-lg bg-foreground/[0.03] px-3 py-2">
              <p className="font-medium">EuroMach agenda · Marta</p>
              <p className="text-foreground/55">Sign-off needed before printing Thu.</p>
            </li>
          </ul>
          <div className="mt-4 flex items-center justify-between gap-2 border-t border-foreground/5 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-foreground/5 px-3 py-1.5 text-[11px] font-medium text-foreground/70 hover:bg-foreground/10"
            >
              Not now
            </button>
            <button
              type="button"
              onClick={onPromote}
              className="rounded-full bg-foreground px-3.5 py-1.5 text-[11px] font-medium text-background hover:opacity-90"
            >
              {mode === "promote" ? "Promote all 3" : "Start review"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
