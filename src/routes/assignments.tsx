import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Plus,
  Flag,
  User,
  ArrowUpRight,
} from "lucide-react";
import { PageShell } from "@/components/app-shell";
import { useUserTasks } from "@/lib/task-store";

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
};

const tasks: Task[] = [
  { id: "a1", title: "Confirm Marriott Yerevan reservation", context: "Hold expires today 18:00 local", due: "Today · 18:00", owner: "You", priority: "P0", status: "todo", thread: "Yerevan Marriott" },
  { id: "a2", title: "Update Stripe billing method", context: "Recurring $8 charge failed twice", due: "Today", owner: "You", priority: "P0", status: "todo", thread: "Stripe Billing" },
  { id: "a3", title: "Draft firm CIF Yerevan price · 40t softwood", context: "EuroMach board reviews Friday", due: "Thu", owner: "Perpetuity", priority: "P1", status: "doing", thread: "EuroMach a.s." },
  { id: "a4", title: "File REACH compliance notice", context: "Three CIS suppliers ship affected HS codes", due: "Jun 30", owner: "You", priority: "P1", status: "todo" },
  { id: "a5", title: "Move 12,400 USDC tranche · Bybit → cold", context: "Test withdrawal cleared this morning", due: "This week", owner: "You", priority: "P2", status: "todo" },
  { id: "a6", title: "Re-deploy @export-analytica/web", context: "Restore VITE_API_URL after rotation", due: "Yesterday", owner: "Perpetuity", priority: "P1", status: "done" },
  { id: "a7", title: "Send BL + seal numbers to ops", context: "Container discharges Klaipeda 06:00", due: "Tomorrow", owner: "Andrei", priority: "P2", status: "doing" },
];

const columns: { key: Status; label: string; tone: string }[] = [
  { key: "todo", label: "To do", tone: "text-foreground/60" },
  { key: "doing", label: "In motion", tone: "text-amber-700/80 dark:text-amber-300/90" },
  { key: "done", label: "Resolved", tone: "text-emerald-700/80 dark:text-emerald-300/90" },
];

function AssignmentsPage() {
  const [filter, setFilter] = useState<"All" | "You" | "Perpetuity">("All");
  const userTasks = useUserTasks();
  const userTaskCards: Task[] = userTasks.map((u) => ({
    id: u.id,
    title: u.title,
    context: u.body ?? "Created via Ask Perpetuity",
    due: "Just now",
    owner: "You",
    priority: "P1",
    status: u.done ? "done" : "todo",
  }));
  const allTasks = [...userTaskCards, ...tasks];
  const visible = filter === "All" ? allTasks : allTasks.filter((t) => t.owner === filter);

  return (
    <PageShell
      active="assignments"
      eyebrow={`${tasks.filter((t) => t.status !== "done").length} open · 2 urgent`}
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
          <button className="glass-panel-strong inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-medium hover:bg-foreground/5">
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
              <button className="rounded-full bg-foreground px-3.5 py-1.5 text-[11px] font-medium text-background hover:opacity-90">
                Promote 3 to assignments
              </button>
              <button className="rounded-full bg-foreground/5 px-3.5 py-1.5 text-[11px] font-medium text-foreground/70 hover:bg-foreground/10">
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
                  <TaskCard key={t.id} task={t} />
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
    </PageShell>
  );
}

const priorityTone: Record<Priority, string> = {
  P0: "text-rose-700/85 bg-rose-500/10 ring-rose-500/15 dark:text-rose-300",
  P1: "text-amber-700/85 bg-amber-500/10 ring-amber-500/15 dark:text-amber-300",
  P2: "text-foreground/60 bg-foreground/5 ring-foreground/10",
};

function TaskCard({ task }: { task: Task }) {
  const Icon = task.status === "done" ? CheckCircle2 : task.status === "doing" ? Clock : Circle;
  return (
    <li className="glass-panel group rounded-2xl px-3.5 py-3 transition-colors hover:bg-foreground/[0.03]">
      <div className="flex items-start gap-2.5">
        <Icon
          className={`mt-0.5 size-4 shrink-0 ${
            task.status === "done"
              ? "text-emerald-600"
              : task.status === "doing"
              ? "text-amber-600"
              : "text-foreground/40"
          }`}
          strokeWidth={1.75}
        />
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
            <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] ring-1 ${priorityTone[task.priority]}`}>
              <Flag className="size-2.5" strokeWidth={2} /> {task.priority}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-foreground/55">
              <User className="size-2.5" strokeWidth={2} /> {task.owner}
            </span>
            <span className="text-[10px] font-mono text-foreground/40">{task.due}</span>
            {task.thread && (
              <button className="ml-auto inline-flex items-center gap-0.5 text-[10px] text-foreground/45 opacity-0 transition-opacity group-hover:opacity-100">
                Thread <ArrowUpRight className="size-2.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
