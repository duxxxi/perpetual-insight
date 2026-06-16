import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, MapPin, Video, Coffee, Plane, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PageShell } from "@/components/app-shell";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule — Perpetuity" },
      { name: "description", content: "Your week, choreographed by Perpetuity." },
      { property: "og:title", content: "Schedule — Perpetuity" },
      { property: "og:description", content: "Your week, choreographed by Perpetuity." },
    ],
  }),
  component: SchedulePage,
});

type EventKind = "meeting" | "call" | "travel" | "focus" | "personal";

type Event = {
  id: string;
  day: number; // 0..6
  start: number; // hour 24h
  duration: number; // hours
  title: string;
  where: string;
  kind: EventKind;
  with?: string;
};

const days = ["Mon 16", "Tue 17", "Wed 18", "Thu 19", "Fri 20", "Sat 21", "Sun 22"];
const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

const events: Event[] = [
  { id: "e1", day: 0, start: 9, duration: 1, title: "Briefing with Marta", where: "Zoom", kind: "call", with: "EuroMach" },
  { id: "e2", day: 0, start: 14, duration: 2, title: "Treasury rebalance", where: "Focus", kind: "focus" },
  { id: "e3", day: 1, start: 10, duration: 1.5, title: "Volkov · Q3 terms", where: "WhatsApp", kind: "call" },
  { id: "e4", day: 2, start: 9, duration: 1, title: "Stand-up · Engineering", where: "Office", kind: "meeting" },
  { id: "e5", day: 2, start: 16, duration: 1, title: "Coffee · Lucas", where: "Stori", kind: "personal" },
  { id: "e6", day: 3, start: 8, duration: 11, title: "Vienna → Yerevan", where: "OS 717 · 13:25", kind: "travel" },
  { id: "e7", day: 4, start: 10, duration: 2, title: "Site visit · Marriott", where: "Yerevan", kind: "meeting" },
  { id: "e8", day: 4, start: 15, duration: 1, title: "Dinner · EuroMach board", where: "Yerevan", kind: "meeting" },
];

const kindStyle: Record<EventKind, { bg: string; bar: string; icon: typeof MapPin }> = {
  meeting: { bg: "bg-foreground/[0.06] hover:bg-foreground/[0.09]", bar: "bg-foreground/40", icon: MapPin },
  call: { bg: "bg-sky-500/10 hover:bg-sky-500/15", bar: "bg-sky-500", icon: Video },
  travel: { bg: "bg-violet-500/10 hover:bg-violet-500/15", bar: "bg-violet-500", icon: Plane },
  focus: { bg: "bg-amber-500/10 hover:bg-amber-500/15", bar: "bg-amber-500", icon: Sparkles },
  personal: { bg: "bg-emerald-500/10 hover:bg-emerald-500/15", bar: "bg-emerald-500", icon: Coffee },
};

function SchedulePage() {
  const [view, setView] = useState<"Week" | "Day" | "Agenda">("Week");

  return (
    <PageShell
      active="schedule"
      eyebrow="Week 25 · 16–22 June"
      title="for the week ahead"
      accentWord="Schedule"
      rightSlot={
        <div className="flex items-center gap-2">
          <div className="glass-panel flex items-center gap-0.5 rounded-full p-0.5">
            <button data-pill className="flex size-7 items-center justify-center rounded-full text-foreground/55 hover:text-foreground">
              <ChevronLeft className="size-3.5" />
            </button>
            <button data-pill className="rounded-full px-3 py-1 text-[11px] font-medium text-foreground/70 hover:bg-foreground/5">Today</button>
            <button data-pill className="flex size-7 items-center justify-center rounded-full text-foreground/55 hover:text-foreground">
              <ChevronRight className="size-3.5" />
            </button>
          </div>
          <div className="glass-panel flex items-center gap-0.5 rounded-full p-0.5">
            {(["Day", "Week", "Agenda"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
                  view === v ? "bg-foreground text-background" : "text-foreground/55 hover:text-foreground"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      }
    >
      {/* AI prep suggestion */}
      <div className="glass-panel-strong relative mb-4 overflow-hidden rounded-2xl p-3.5">
        <div className="ai-iridescent absolute inset-x-3.5 top-0 h-px opacity-60" aria-hidden />
        <div className="flex items-start gap-2.5">
          <div className="ai-iridescent flex size-7 items-center justify-center rounded-full ring-1 ring-foreground/5">
            <Sparkles className="size-3.5 text-foreground/80" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground/45">
              Perpetuity suggests
            </p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-foreground/85">
              Thursday's Yerevan site visit at Marriott follows the EuroMach board dinner. I've drafted a Q3 terms brief from the Volkov thread and pulled three recent comparables for the rebalance — ready to review.
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              <button data-pill className="rounded-full bg-foreground px-3 py-1 text-[10.5px] font-medium text-background">
                Open prep brief
              </button>
              <button data-pill className="rounded-full bg-foreground/5 px-3 py-1 text-[10.5px] font-medium text-foreground/70">
                Research attendees
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="glass-panel-strong overflow-hidden rounded-2xl">
        {/* Day header */}
        <div className="grid grid-cols-[48px_repeat(7,1fr)] border-b border-foreground/5">
          <div />
          {days.map((d, i) => (
            <div key={d} className={`px-1.5 py-2 text-center ${i === 0 ? "" : "border-l border-foreground/5"}`}>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/40">{d.split(" ")[0]}</p>
              <p className={`font-serif text-[15px] italic leading-tight ${i === 0 ? "text-accent" : "text-foreground/85"}`}>{d.split(" ")[1]}</p>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="relative grid grid-cols-[48px_repeat(7,1fr)]">
          {/* Hour gutter */}
          <div className="flex flex-col">
            {hours.map((h) => (
              <div key={h} className="h-10 border-b border-foreground/5 px-1.5 pt-0.5 text-right text-[9px] font-mono text-foreground/35">
                {String(h).padStart(2, "0")}:00
              </div>
            ))}
          </div>
          {days.map((_d, dayIdx) => (
            <div key={dayIdx} className="relative border-l border-foreground/5">
              {hours.map((h) => (
                <div key={h} className="h-10 border-b border-foreground/5" />
              ))}
              {events
                .filter((e) => e.day === dayIdx)
                .map((e) => {
                  const top = (e.start - hours[0]) * 40;
                  const height = e.duration * 40 - 3;
                  const s = kindStyle[e.kind];
                  const Icon = s.icon;
                  return (
                    <button data-pill
                      key={e.id}
                      style={{ top, height }}
                      className={`absolute inset-x-0.5 flex gap-1 overflow-hidden rounded-lg px-1.5 py-1 text-left ring-1 ring-foreground/5 backdrop-blur-sm transition-colors ${s.bg}`}
                    >
                      <div className={`w-0.5 shrink-0 rounded-full ${s.bar}`} />
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-1 truncate text-[10px] font-medium text-foreground/90">
                          <Icon className="size-2.5 shrink-0" strokeWidth={2} />
                          {e.title}
                        </p>
                        <p className="truncate text-[9px] text-foreground/55">{e.where}</p>
                      </div>
                    </button>
                  );
                })}
            </div>
          ))}
        </div>
      </div>

      {/* Up next */}
      <div className="mt-4 grid grid-cols-1 gap-2.5 md:grid-cols-3">
        {events.slice(0, 3).map((e) => {
          const s = kindStyle[e.kind];
          const Icon = s.icon;
          return (
            <div key={e.id} className="glass-panel rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                <span className={`size-1 rounded-full ${s.bar}`} />
                {days[e.day]} · {String(e.start).padStart(2, "0")}:00
              </div>
              <p className="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-foreground/90">
                <Icon className="size-3" strokeWidth={1.75} /> {e.title}
              </p>
              <p className="mt-0.5 text-[11px] text-foreground/55">{e.where}</p>
              <button data-pill className="mt-2 inline-flex items-center gap-1 text-[10.5px] text-accent">
                Open prep <ArrowUpRight className="size-3" />
              </button>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
