import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  Send,
  Mail,
  Linkedin,
  MessageCircle,
  Plus,
  TrendingUp,
} from "lucide-react";
import { PageShell } from "@/components/app-shell";
import { usePerpetuityPanel } from "@/components/perpetuity-panel";

export const Route = createFileRoute("/outreach")({
  head: () => ({
    meta: [
      { title: "Outreach — Perpetuity" },
      { name: "description", content: "Sequences, follow-ups, and warm reactivations." },
      { property: "og:title", content: "Outreach — Perpetuity" },
      { property: "og:description", content: "Sequences, follow-ups, and warm reactivations." },
    ],
  }),
  component: OutreachPage,
});

type Campaign = {
  id: string;
  name: string;
  channel: "Email" | "LinkedIn" | "WhatsApp";
  audience: string;
  sent: number;
  opened: number;
  replied: number;
  status: "Live" | "Paused" | "Draft";
  why: string;
  steps: string[];
};

const campaigns: Campaign[] = [
  {
    id: "c1",
    name: "Q3 softwood · Baltic buyers",
    channel: "Email",
    audience: "84 buyers · LT/LV/EE",
    sent: 84,
    opened: 61,
    replied: 14,
    status: "Live",
    why: "Open rate 72% beats your baseline. 14 replies → 6 booked. Perpetuity recommends a second-touch on the 47 silent opens this Friday.",
    steps: [
      "Review the 14 replies (3 hot, 7 warm)",
      "Approve the silent-open follow-up draft",
      "Push booked meetings to Calendar",
    ],
  },
  {
    id: "c2",
    name: "EuroMach board · trust builders",
    channel: "LinkedIn",
    audience: "9 board members",
    sent: 9,
    opened: 9,
    replied: 4,
    status: "Live",
    why: "All 9 board members opened. 4 replied warmly ahead of Friday's vote. Two influencers still silent — worth a personal touch from you.",
    steps: [
      "Send the 2 personal notes (Perpetuity drafted)",
      "Brief Marta on warm replies before the board",
      "Log relationship updates in CRM",
    ],
  },
  {
    id: "c3",
    name: "Lapsed accounts · 2024 H2",
    channel: "Email",
    audience: "32 dormant",
    sent: 32,
    opened: 18,
    replied: 3,
    status: "Paused",
    why: "Paused 11 days ago. 3 of 18 opens have moved since — pricing intel from competitor leaks suggests a re-pitch could land.",
    steps: [
      "Refresh copy with current Klaipeda-Yerevan freight",
      "Trim list to the 18 that opened",
      "Resume with a 7-day cadence",
    ],
  },
  {
    id: "c4",
    name: "Klaipeda freight forwarders",
    channel: "WhatsApp",
    audience: "6 partners",
    sent: 0,
    opened: 0,
    replied: 0,
    status: "Draft",
    why: "Drafted but not sent. You wanted to confirm Andrei's lane pricing first. Andrei's reply landed Mon — you can ship this today.",
    steps: [
      "Insert Andrei's confirmed rates",
      "Pick send window (Tue/Wed 09:00 local)",
      "Auto-route replies to Ops thread bucket",
    ],
  },
];

const channelIcon = { Email: Mail, LinkedIn: Linkedin, WhatsApp: MessageCircle } as const;
const statusTone = {
  Live: "text-emerald-700/85 bg-emerald-500/10 ring-emerald-500/15 dark:text-emerald-300",
  Paused: "text-amber-700/85 bg-amber-500/10 ring-amber-500/15 dark:text-amber-300",
  Draft: "text-foreground/60 bg-foreground/5 ring-foreground/10",
} as const;

const statBlurb: Record<string, { why: string; steps: string[] }> = {
  Sent: {
    why: "Volume sent across live campaigns. Perpetuity throttles per-recipient to keep deliverability above 98%.",
    steps: ["Audit per-domain send rate", "Inspect bounce + complaint logs", "Schedule next batch"],
  },
  Opened: {
    why: "Aggregate open rate. Anything above 65% on cold lists is exceptional — your subject-line bank is doing the work.",
    steps: ["Compare open-rate by subject variant", "Promote winners to template library"],
  },
  Replied: {
    why: "Real conversations started this week. Each reply is auto-routed into the right Threads bucket with sentiment scoring.",
    steps: ["Open the Replied feed in Threads", "Cluster by counterparty intent", "Promote hot replies to Assignments"],
  },
  "Meetings booked": {
    why: "Meetings landed via outreach. Perpetuity scheduled three end-to-end without you in the loop.",
    steps: ["Review Perpetuity-scheduled meetings", "Confirm pre-meeting briefs"],
  },
};

function OutreachPage() {
  const [tab, setTab] = useState<"Campaigns" | "Sequences" | "Templates">("Campaigns");
  const { open, panel } = usePerpetuityPanel();

  return (
    <PageShell
      active="outreach"
      eyebrow="4 campaigns · 21 replies this week"
      title="that lands at the right moment"
      accentWord="Outreach"
      rightSlot={
        <div className="flex items-center gap-2">
          <div className="glass-panel flex items-center gap-0.5 rounded-full p-0.5">
            {(["Campaigns", "Sequences", "Templates"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
                  tab === t ? "bg-foreground text-background" : "text-foreground/55 hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              open({
                title: "New campaign",
                eyebrow: "Outreach · create",
                why: "Start a new sequence — Perpetuity will draft the first 3 touches from your past winners and tag the audience for routing.",
                steps: [
                  "Pick channel (Email / LinkedIn / WhatsApp)",
                  "Choose an audience segment or upload a list",
                  "Approve Perpetuity's draft sequence",
                  "Set send window and reply routing",
                ],
                actions: [
                  { label: "Start with template", primary: true },
                  { label: "Blank campaign" },
                ],
              })
            }
            className="glass-panel-strong inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium hover:bg-foreground/5"
          >
            <Plus className="size-3" strokeWidth={2} /> New campaign
          </button>
        </div>
      }
    >
      {/* Stat strip */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { k: "Sent", v: "125", chg: "+12 today" },
          { k: "Opened", v: "78%", chg: "+3.4 pp" },
          { k: "Replied", v: "21", chg: "+5 vs last wk" },
          { k: "Meetings booked", v: "6", chg: "3 by Perpetuity" },
        ].map((s) => (
          <button
            key={s.k}
            type="button"
            onClick={() =>
              open({
                title: `${s.k} · ${s.v}`,
                eyebrow: "Outreach · metric",
                source: `${s.chg} (rolling 7-day window)`,
                why: statBlurb[s.k].why,
                steps: statBlurb[s.k].steps,
                artifacts: [
                  { kind: "data", label: "Time-series · last 90 days" },
                  { kind: "thread", label: "Reply feed · this week" },
                ],
              })
            }
            className="glass-panel rounded-2xl px-4 py-3 text-left transition-colors hover:bg-foreground/[0.04]"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/40">{s.k}</p>
            <p className="mt-1 font-serif text-2xl italic tracking-tight">{s.v}</p>
            <p className="mt-0.5 flex items-center gap-1 text-[10px] text-emerald-600">
              <TrendingUp className="size-2.5" /> {s.chg}
            </p>
          </button>
        ))}
      </div>

      {/* AI suggestion */}
      <div className="glass-panel-strong relative mb-6 overflow-hidden rounded-3xl p-5">
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
              14 buyers from the Q3 softwood campaign opened your last note but didn't reply. I drafted a short follow-up tied to today's WTI move (-5.95%). Want to review and send?
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  open({
                    title: "Review silent-open follow-up · 14 buyers",
                    eyebrow: "Outreach · review",
                    source: "Q3 softwood · Baltic buyers · opened 7d, no reply",
                    why: "WTI moved -5.95% overnight. The freight component of your CIF Yerevan price drops ~2.1% — a clean reason to re-touch without sounding pushy.",
                    steps: [
                      "Skim Perpetuity's draft (one paragraph, EN/RU)",
                      "Personalize 3 high-priority buyers",
                      "Approve and send (queued at 09:00 recipient-local)",
                    ],
                    artifacts: [
                      { kind: "email", label: "Draft · WTI follow-up · v2" },
                      { kind: "data", label: "Buyer list · 14 silent opens" },
                    ],
                    actions: [
                      { label: "Send all 14", primary: true },
                      { label: "Edit draft first" },
                    ],
                  })
                }
                className="rounded-full bg-foreground px-3.5 py-1.5 text-[11px] font-medium text-background hover:opacity-90"
              >
                Review draft (14)
              </button>
              <button
                type="button"
                onClick={() =>
                  open({
                    title: "Schedule for tomorrow 09:00",
                    eyebrow: "Outreach · schedule",
                    why: "Tomorrow 09:00 (recipient-local) is your best historical open window for Baltic buyers — 71% vs. 54% on same-day sends.",
                    steps: [
                      "Pin send window to 09:00 recipient-local",
                      "Hold for review until 21:00 tonight",
                      "Auto-send if no objection",
                    ],
                    actions: [{ label: "Schedule", primary: true }, { label: "Pick another time" }],
                  })
                }
                className="rounded-full bg-foreground/5 px-3.5 py-1.5 text-[11px] font-medium text-foreground/70 hover:bg-foreground/10"
              >
                Schedule for tomorrow 09:00
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign list */}
      <div className="glass-panel-strong overflow-hidden rounded-3xl">
        <div className="grid grid-cols-[1.6fr_1fr_repeat(3,72px)_90px] gap-4 border-b border-foreground/5 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/40">
          <div>Campaign</div>
          <div>Audience</div>
          <div className="text-right">Sent</div>
          <div className="text-right">Opened</div>
          <div className="text-right">Replied</div>
          <div className="text-right">Status</div>
        </div>
        <ul className="divide-y divide-foreground/5">
          {campaigns.map((c) => {
            const Icon = channelIcon[c.channel];
            const openRate = c.sent ? Math.round((c.opened / c.sent) * 100) : 0;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() =>
                    open({
                      title: c.name,
                      eyebrow: `${c.channel} · ${c.status}`,
                      source: `${c.audience} · sent ${c.sent} · opened ${c.opened} (${openRate}%) · replied ${c.replied}`,
                      why: c.why,
                      steps: c.steps,
                      artifacts: [
                        { kind: "data", label: `Audience · ${c.audience}` },
                        { kind: "email", label: "Sequence · 3 touches" },
                        { kind: "thread", label: "Reply feed" },
                      ],
                      actions:
                        c.status === "Live"
                          ? [{ label: "Pause campaign" }, { label: "Open replies", primary: true }]
                          : c.status === "Paused"
                          ? [{ label: "Resume", primary: true }, { label: "Refresh copy" }]
                          : [{ label: "Send today", primary: true }, { label: "Edit draft" }],
                    })
                  }
                  className="grid w-full grid-cols-[1.6fr_1fr_repeat(3,72px)_90px] items-center gap-4 px-5 py-3.5 text-left transition-colors hover:bg-foreground/[0.03]"
                >
                  <div className="flex items-center gap-3">
                    <div className="glass-panel flex size-9 items-center justify-center rounded-full">
                      <Icon className="size-4 text-foreground/70" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-foreground/90">{c.name}</p>
                      <p className="text-[11px] text-foreground/50">{c.channel}</p>
                    </div>
                  </div>
                  <p className="text-[12px] text-foreground/65">{c.audience}</p>
                  <p className="text-right font-mono text-[12px] text-foreground/75">{c.sent}</p>
                  <p className="text-right font-mono text-[12px] text-foreground/75">{openRate}%</p>
                  <p className="text-right font-mono text-[12px] text-foreground/75">{c.replied}</p>
                  <div className="flex justify-end">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] ring-1 ${statusTone[c.status]}`}>
                      {c.status}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Composer */}
      <div className="mt-6 glass-panel-strong rounded-3xl p-5">
        <div className="flex items-center gap-2">
          <div className="ai-iridescent size-7 shrink-0 rounded-full ring-1 ring-foreground/5" aria-hidden />
          <p className="text-[13px] text-foreground/70">
            Ask Perpetuity to compose: <span className="text-foreground/90">"Warm-up the Klaipeda forwarders before Thursday."</span>
          </p>
          <button
            type="button"
            onClick={() =>
              open({
                title: "Warm-up · Klaipeda forwarders",
                eyebrow: "Compose with Perpetuity",
                why: "Six freight forwarders on the Klaipeda lane. You haven't touched four of them since April. A short pre-Thursday note keeps capacity options open.",
                steps: [
                  "Perpetuity drafts 6 personalized notes from prior threads",
                  "You skim, edit one, approve all",
                  "Replies auto-route into the Ops thread bucket",
                ],
                actions: [
                  { label: "Draft now", primary: true },
                  { label: "Pick different audience" },
                ],
              })
            }
            className="ml-auto inline-flex size-8 items-center justify-center rounded-xl bg-foreground text-background hover:opacity-90"
          >
            <Send className="size-3.5" />
          </button>
        </div>
      </div>

      {panel}
    </PageShell>
  );
}
