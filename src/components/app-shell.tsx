import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Home,
  MessagesSquare,
  ListChecks,
  Calendar,
  Send,
  Users,
  FileText,
  Compass,
  LineChart,
  Plug,
  Settings,
  Plus,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

/* ---------- Ambient background wash ---------- */
export function AmbientBackground() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 dark:hidden"
        style={{
          background:
            "radial-gradient(60rem 40rem at 12% -10%, hsl(25 40% 80% / 0.25), transparent 60%), radial-gradient(50rem 35rem at 100% 110%, hsl(20 10% 12% / 0.06), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 hidden dark:block"
        style={{
          background:
            "radial-gradient(60rem 40rem at 12% -10%, hsl(25 40% 55% / 0.12), transparent 60%), radial-gradient(50rem 35rem at 100% 110%, hsl(210 30% 40% / 0.10), transparent 60%)",
        }}
      />
    </>
  );
}

/* ---------- Commodity ticker ---------- */
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

function TickerRow() {
  return (
    <div className="flex shrink-0 gap-3 px-6">
      {ticker.map((t, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-2 rounded-full bg-foreground/[0.04] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/80 ring-1 ring-foreground/[0.06] backdrop-blur-sm"
        >
          <span className="text-foreground/50">{t.sym}</span>
          <span className="font-semibold text-foreground">{t.price}</span>
          <span className={t.dir === "up" ? "text-emerald-600" : "text-rose-600"}>
            {t.chg}
          </span>
        </span>
      ))}
    </div>
  );
}

export function CommodityTicker() {
  return (
    <div className="sticky top-0 z-40">
      <div className="relative overflow-hidden">
        <div className="ai-iridescent absolute -inset-px rounded-2xl opacity-40 blur-[2px]" aria-hidden />
        <div className="glass-panel-strong relative overflow-hidden rounded-2xl border border-foreground/5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          <div className="ticker-mask relative overflow-hidden py-2.5">
            <div className="animate-ticker flex whitespace-nowrap">
              <TickerRow />
              <TickerRow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Sidebar ---------- */
type SidebarKey =
  | "home"
  | "threads"
  | "assignments"
  | "schedule"
  | "outreach"
  | "contacts"
  | "documents"
  | "opportunities"
  | "markets"
  | "connections"
  | "settings";

export function AppSidebar({ active }: { active: SidebarKey }) {
  const items: { key: SidebarKey; icon: typeof Home; label: string; to: string }[] = [
    { key: "home", icon: Home, label: "Home", to: "/" },
    { key: "threads", icon: MessagesSquare, label: "Threads", to: "/threads" },
    { key: "assignments", icon: ListChecks, label: "Assignments", to: "/assignments" },
    { key: "schedule", icon: Calendar, label: "Schedule", to: "/schedule" },
    { key: "outreach", icon: Send, label: "Outreach", to: "/outreach" },
    { key: "contacts", icon: Users, label: "Contacts", to: "/contacts" },
    { key: "documents", icon: FileText, label: "Documents", to: "/documents" },
    { key: "opportunities", icon: Compass, label: "Opportunities", to: "/opportunities" },
    { key: "markets", icon: LineChart, label: "Markets", to: "/markets" },
    { key: "connections", icon: Plug, label: "Connections", to: "/connections" },
    { key: "settings", icon: Settings, label: "Settings", to: "/settings" },
  ];
  return (
    <nav className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="glass-panel-strong flex flex-col items-center gap-1 rounded-full px-2 py-4">
        <Link
          to="/"
          className="mb-2 flex size-10 items-center justify-center rounded-full bg-foreground font-serif text-sm italic text-background"
        >
          P
        </Link>
        {items.map((it) => {
          const isActive = it.key === active;
          return (
            <Link
              key={it.key}
              to={it.to}
              title={it.label}
              className={`group relative flex size-10 items-center justify-center rounded-full transition-colors ${
                isActive
                  ? "bg-gradient-to-br from-accent/25 to-accent/5 text-accent ring-1 ring-accent/25 shadow-[0_0_18px_-6px_hsl(25_70%_55%/0.45)]"
                  : "text-foreground/45 hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              <it.icon className="size-[18px]" strokeWidth={1.5} />
              <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-background opacity-0 transition-opacity group-hover:opacity-100">
                {it.label}
              </span>
            </Link>
          );
        })}
        <div className="mt-2 flex size-10 items-center justify-center rounded-full text-foreground/45 hover:text-foreground">
          <Bell className="size-[18px]" strokeWidth={1.5} />
        </div>
      </div>
    </nav>
  );
}

/* ---------- Footer ---------- */
export function AppFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between border-t border-foreground/5 bg-background/70 px-8 py-3 text-[10px] font-medium tracking-[0.18em] text-foreground/35 backdrop-blur-xl">
      <div className="flex items-center gap-6">
        <span className="hidden sm:inline">ENCRYPTED · TLS 1.3</span>
        <span>LAST SYNC · 14:40 UTC</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden md:inline">PERPETUITY INTELLIGENCE</span>
        <span className="size-1 rounded-full bg-accent" />
        <ThemeToggle />
      </div>
    </footer>
  );
}

/* ---------- Shared page shell ---------- */
import { useTheme } from "@/hooks/use-theme";

export function PageShell({
  active,
  eyebrow,
  title,
  accentWord,
  rightSlot,
  children,
}: {
  active: SidebarKey;
  eyebrow: string;
  title: string;
  accentWord?: string;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
}) {
  useTheme();
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/15">
      <AmbientBackground />
      <CommodityTicker />
      <div className="flex">
        <AppSidebar active={active} />
        <main className="flex-1 px-6 pt-10 pb-28 lg:pl-32 lg:pr-10">
          <div className="mx-auto max-w-7xl animate-fade-in-up">
            <header className="relative mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-10 -top-10 size-48 rounded-full opacity-60 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, hsl(25 70% 60% / 0.18), transparent 70%)",
                }}
              />
              <div className="relative">
                <p className="mb-2 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/45">
                  <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_currentColor]" />
                  {eyebrow}
                </p>
                <h1 className="font-serif text-3xl italic tracking-tight md:text-4xl">
                  {accentWord ? (
                    <>
                      <span className="not-italic bg-gradient-to-br from-accent to-foreground bg-clip-text text-transparent">
                        {accentWord}
                      </span>
                      {title ? <span className="text-foreground/80"> · {title}</span> : null}
                    </>
                  ) : (
                    title
                  )}
                </h1>
              </div>
              {rightSlot}
            </header>
            {children}
          </div>
        </main>
      </div>
      <AppFooter />
    </div>
  );
}
