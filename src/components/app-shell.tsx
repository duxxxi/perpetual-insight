import { Link } from "@tanstack/react-router";
import {
  Home,
  MessagesSquare,
  ListChecks,
  Send,
  Users,
  FileText,
  FileSearch,
  Compass,
  Brain,
  Plug,
  Settings,
  Plus,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { openPerpetuityDock } from "@/components/ask-perpetuity-dock";
import { Button } from "@/components/ui/button";

/* ---------- Ambient background wash ---------- */
export function AmbientBackground() {
  return (
    <>
      <div
        aria-hidden
        className="paper-ambient pointer-events-none fixed inset-0 -z-10 dark:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 hidden dark:block"
        style={{
          background:
            "radial-gradient(70rem 45rem at 8% -12%, hsl(220 20% 80% / 0.10), transparent 62%), radial-gradient(55rem 38rem at 102% 108%, hsl(220 14% 70% / 0.07), transparent 62%), radial-gradient(40rem 30rem at 55% 45%, hsl(265 20% 70% / 0.06), transparent 70%)",
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

type TickerTone = "light" | "dark";

function TickerRow({ tone }: { tone: TickerTone }) {
  const dark = tone === "dark";
  return (
    <div className="flex shrink-0 gap-2 px-4">
      {ticker.map((t, i) => {
        const up = t.dir === "up";
        return (
          <span
            key={i}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] ring-1 backdrop-blur-sm ${
              up
                ? dark
                  ? "bg-emerald-400/10 ring-emerald-300/25"
                  : "bg-emerald-500/[0.06] ring-emerald-500/15"
                : dark
                  ? "bg-rose-400/10 ring-rose-300/25"
                  : "bg-rose-500/[0.06] ring-rose-500/15"
            }`}
          >
            <span className={dark ? "text-foreground/75" : "text-foreground/55"}>{t.sym}</span>
            <span className="font-semibold text-foreground/90">{t.price}</span>
            <span
              className={
                up
                  ? dark
                    ? "text-emerald-300"
                    : "text-emerald-600 dark:text-emerald-400"
                  : dark
                    ? "text-rose-300"
                    : "text-rose-600 dark:text-rose-400"
              }
            >
              {t.chg}
            </span>
          </span>
        );
      })}
    </div>
  );
}

export function CommodityTicker({ tone = "light" }: { tone?: TickerTone }) {
  const dark = tone === "dark";
  return (
    <div className={`commodity-ticker sticky top-0 z-40${dark ? " commodity-ticker--dark" : ""}`}>
      <div className="relative overflow-hidden">
        <div className={`ai-iridescent absolute -inset-px rounded-2xl blur-[2px]${dark ? " opacity-60" : " opacity-40"}`} aria-hidden />
        <div className="glass-panel-strong relative overflow-hidden rounded-2xl border border-foreground/5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          <div className="ticker-mask relative overflow-hidden py-1.5">
            <div className="animate-ticker flex whitespace-nowrap">
              <TickerRow tone={tone} />
              <TickerRow tone={tone} />
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
  | "outreach"
  | "contacts"
  | "documents"
  | "opportunities"
  | "tenders"
  | "context"
  | "connections"
  | "settings";

export function AppSidebar({ active }: { active: SidebarKey }) {
  const items: { key: SidebarKey; icon: typeof Home; label: string; to: string }[] = [
    { key: "home", icon: Home, label: "Home", to: "/" },
    { key: "threads", icon: MessagesSquare, label: "Threads", to: "/threads" },
    { key: "assignments", icon: ListChecks, label: "Assignments", to: "/assignments" },
    { key: "outreach", icon: Send, label: "Outreach", to: "/outreach" },
    { key: "contacts", icon: Users, label: "Contacts", to: "/contacts" },
    { key: "documents", icon: FileText, label: "Documents", to: "/documents" },
    { key: "opportunities", icon: Compass, label: "Opportunities", to: "/opportunities" },
    { key: "tenders", icon: FileSearch, label: "Tenders", to: "/tenders" },
    { key: "context", icon: Brain, label: "Context", to: "/context" },
    { key: "connections", icon: Plug, label: "Connections", to: "/connections" },
    { key: "settings", icon: Settings, label: "Settings", to: "/settings" },
  ];
  return (
    <nav className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="workspace-sidebar glass-panel-strong flex flex-col items-center gap-0.5 rounded-full px-1 py-2">
        <Link
          to="/"
          className="mb-1 flex size-8 items-center justify-center rounded-full glass-chip font-serif text-[13px] italic text-foreground/80"
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
              className={`group relative flex size-8 items-center justify-center rounded-full transition-colors ${
                isActive
                  ? "glass-chip text-foreground shadow-[0_0_18px_-10px_rgba(10,15,25,0.35)]"
                  : "text-foreground/45 hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              <it.icon className="size-[15px]" strokeWidth={1.5} />
              <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-background/90 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground shadow-lg ring-1 ring-foreground/10 backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100">
                {it.label}
              </span>
            </Link>
          );
        })}
        <AskPerpetuityButton />
      </div>
    </nav>
  );
}

/* ---------- Shared conversation launcher ---------- */
function AskPerpetuityButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      title="New conversation or task"
      aria-label="Open Ask Perpetuity from sidebar"
      onClick={openPerpetuityDock}
      className="group relative mt-1 size-8 rounded-full glass-chip text-foreground/80 hover:text-foreground"
    >
      <Plus className="size-[16px]" strokeWidth={2} />
      <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-background/90 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground shadow-lg ring-1 ring-foreground/10 backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100">
        New
      </span>
    </Button>
  );
}

/* ---------- Footer ---------- */
export function AppFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between border-t border-foreground/5 bg-background/70 px-5 py-1 text-[9px] font-medium tracking-[0.16em] text-foreground/40 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline">ENCRYPTED · TLS 1.3</span>
        <span>SYNC · 14:40 UTC</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden md:inline">PERPETUITY</span>
        <span className="size-1 rounded-full bg-accent shadow-[0_0_6px_currentColor]" />
        <ThemeToggle />
      </div>
    </footer>
  );
}

/* ---------- Shared page shell ---------- */
import { useTheme } from "@/hooks/use-theme";
import { MastheadBand } from "@/components/masthead-band";

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
      {/* Masthead band — same as dashboard */}
      <MastheadBand />
      <div className="flex">
        <AppSidebar active={active} />
        <main className="flex-1 px-6 pb-20 pt-6 lg:pl-24 lg:pr-10 xl:pr-14">
          <div className="mx-auto max-w-6xl animate-fade-in-up">
            <header className="relative mb-7">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-10 -top-12 size-48 rounded-full opacity-50 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, hsl(215 20% 60% / 0.16), transparent 70%)",
                }}
              />
              <p className="relative mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-foreground/40">
                {eyebrow}
              </p>
              <div className="relative flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <h1 className="font-sans text-[26px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[32px]">
                  {accentWord ? (
                    <>
                      <span className="text-silver-metallic">{accentWord}</span>
                      {title ? <span className="text-foreground/40"> · {title}</span> : null}
                    </>
                  ) : (
                    <span className="text-silver-metallic">{title}</span>
                  )}
                </h1>
                {rightSlot}
              </div>
            </header>
            {children}
          </div>
        </main>
      </div>
      <AppFooter />
    </div>
  );
}
