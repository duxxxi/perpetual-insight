import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, Bell, Shield, Palette, Globe, KeyRound, Sparkles, ChevronRight } from "lucide-react";
import { PageShell } from "@/components/app-shell";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Perpetuity" },
      { name: "description", content: "Tune Perpetuity to your taste." },
      { property: "og:title", content: "Settings — Perpetuity" },
      { property: "og:description", content: "Tune Perpetuity to your taste." },
    ],
  }),
  component: SettingsPage,
});

type SectionKey = "profile" | "notifications" | "appearance" | "intelligence" | "security" | "regional";
const sections: { key: SectionKey; label: string; icon: typeof User }[] = [
  { key: "profile", label: "Profile", icon: User },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "appearance", label: "Appearance", icon: Palette },
  { key: "intelligence", label: "Intelligence", icon: Sparkles },
  { key: "security", label: "Security", icon: Shield },
  { key: "regional", label: "Regional", icon: Globe },
];

function SettingsPage() {
  const [active, setActive] = useState<SectionKey>("profile");

  return (
    <PageShell
      active="settings"
      eyebrow="Your preferences"
      title=""
      accentWord="Perpetuity"
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Section nav */}
        <aside className="lg:col-span-3">
          <div className="glass-panel-strong rounded-3xl p-2">
            <ul className="space-y-0.5">
              {sections.map((s) => {
                const isActive = active === s.key;
                return (
                  <li key={s.key}>
                    <button
                      onClick={() => setActive(s.key)}
                      className={`flex w-full items-center gap-2.5 rounded-2xl px-3 py-2.5 text-left text-[13px] transition-colors ${
                        isActive
                          ? "bg-foreground/[0.06] text-foreground"
                          : "text-foreground/60 hover:bg-foreground/[0.03] hover:text-foreground"
                      }`}
                    >
                      <s.icon className="size-4" strokeWidth={1.75} />
                      <span className="flex-1">{s.label}</span>
                      <ChevronRight className="size-3.5 text-foreground/30" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* Body */}
        <section className="space-y-4 lg:col-span-9">
          {active === "profile" && (
            <Panel title="Profile" desc="How Perpetuity addresses you and signs your drafts.">
              <Field label="Display name" value="Alex Perpetuity" />
              <Field label="Email" value="alex@perpetuity.works" />
              <Field label="Signature" value="— Alex, Perpetuity Trading" multiline />
              <Field label="Time zone" value="Europe/Bratislava (UTC+2)" />
            </Panel>
          )}

          {active === "notifications" && (
            <Panel title="Notifications" desc="Choose what reaches you, and how loud.">
              <Toggle label="Morning brief" desc="A single digest at 07:00 local." on />
              <Toggle label="Urgent threads" desc="Push when Perpetuity flags P0." on />
              <Toggle label="Market alerts" desc="Notify on >3% moves you watch." on />
              <Toggle label="Outreach replies" desc="Real-time when buyers respond." />
              <Toggle label="Weekly retrospective" desc="Friday 17:00 summary." on />
            </Panel>
          )}

          {active === "appearance" && (
            <Panel title="Appearance" desc="Light by day, dark by evening — or pick a mode.">
              <div className="flex items-center justify-between rounded-2xl border border-foreground/5 px-4 py-3">
                <div>
                  <p className="text-[13px] font-medium">Theme</p>
                  <p className="text-[11px] text-foreground/55">Auto switches at sunset (19:00 local).</p>
                </div>
                <ThemeToggle />
              </div>
              <Toggle label="Reduce motion" desc="Calm transitions across the app." />
              <Toggle label="Compact density" desc="Tighter spacing in lists." />
            </Panel>
          )}

          {active === "intelligence" && (
            <Panel title="Intelligence" desc="How Perpetuity drafts, summarizes, and acts.">
              <Field label="Voice" value="Calm · executive · concise" />
              <Field label="Languages" value="English, Slovak, Russian, Armenian" />
              <Toggle label="Auto-draft replies" desc="Compose responses; you approve before send." on />
              <Toggle label="Auto-summarize threads" desc="Add a Perpetuity summary on top of every thread." on />
              <Toggle label="Promote suggestions" desc="Surface opportunities in the daily brief." on />
            </Panel>
          )}

          {active === "security" && (
            <Panel title="Security" desc="Keys, devices, and audit trail.">
              <Field label="Two-factor" value="Authenticator app · enabled" />
              <Field label="Recovery codes" value="6 of 10 unused" />
              <div className="flex items-center justify-between rounded-2xl border border-foreground/5 px-4 py-3">
                <div>
                  <p className="text-[13px] font-medium">API keys</p>
                  <p className="text-[11px] text-foreground/55">3 active · last rotated 14d ago</p>
                </div>
                <button data-pill className="glass-panel inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium">
                  <KeyRound className="size-3" strokeWidth={1.75} /> Rotate
                </button>
              </div>
              <Toggle label="Login alerts" desc="Email me on new devices." on />
            </Panel>
          )}

          {active === "regional" && (
            <Panel title="Regional" desc="Currency, units, and conventions.">
              <Field label="Reporting currency" value="EUR" />
              <Field label="Units" value="Metric · tonnes, kilometres" />
              <Field label="Date format" value="DD MMM YYYY" />
              <Field label="First day of week" value="Monday" />
            </Panel>
          )}
        </section>
      </div>
    </PageShell>
  );
}

function Panel({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="glass-panel-strong rounded-3xl p-6">
      <div className="mb-5">
        <h2 className="font-sans text-xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-[12px] text-foreground/55">{desc}</p>
      </div>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function Field({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div className="rounded-2xl border border-foreground/5 px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/40">{label}</p>
      {multiline ? (
        <textarea
          defaultValue={value}
          rows={2}
          className="mt-1 w-full resize-none bg-transparent text-[13px] text-foreground/85 focus:outline-none"
        />
      ) : (
        <input
          defaultValue={value}
          className="mt-1 w-full bg-transparent text-[13px] text-foreground/85 focus:outline-none"
        />
      )}
    </div>
  );
}

function Toggle({ label, desc, on }: { label: string; desc: string; on?: boolean }) {
  const [checked, setChecked] = useState(!!on);
  return (
    <button
      onClick={() => setChecked(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-2xl border border-foreground/5 px-4 py-3 text-left transition-colors hover:bg-foreground/[0.02]"
    >
      <div>
        <p className="text-[13px] font-medium text-foreground/90">{label}</p>
        <p className="text-[11px] text-foreground/55">{desc}</p>
      </div>
      <span
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
          checked ? "bg-foreground" : "bg-foreground/15"
        }`}
      >
        <span
          className={`inline-block size-4 transform rounded-full bg-background transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}
