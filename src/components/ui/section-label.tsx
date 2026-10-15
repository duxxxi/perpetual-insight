// Extracted verbatim from apps/web/app/dashboard/page.tsx's local SectionLabel —
// dashboard/page.tsx now imports this instead of defining its own copy, so
// every page (Home, Tenders, Sanctions, Opportunities) renders section headers
// identically, not near-copies that can drift apart.
export function SectionLabel({
  children,
  kicker,
  tone = "primary",
  kickerTone,
}: {
  children: React.ReactNode;
  kicker?: string;
  tone?: "primary" | "accent" | "muted" | "quiet";
  kickerTone?: "green" | "blue" | "violet" | "amber" | "default";
}) {
  const toneStyles: Record<string, string> = {
    primary: "text-foreground",
    accent: "text-accent",
    muted: "text-foreground/45",
    quiet: "text-foreground/55",
  };
  const sizeStyles: Record<string, string> = {
    primary: "font-sans text-lg font-medium",
    accent: "font-sans text-base font-medium",
    muted: "font-sans text-base font-medium",
    quiet: "font-sans text-base font-medium",
  };
  const kickerToneStyles: Record<string, string> = {
    green: "text-status-done",
    blue: "text-status-progress",
    violet: "text-accent",
    amber: "text-status-attention",
    default: "text-foreground/35",
  };
  const ktCls = kickerToneStyles[kickerTone ?? "default"] ?? kickerToneStyles.default;
  return (
    <div className="flex items-end justify-between gap-3 px-1">
      <div>
        {kicker && (
          <p className={`mb-1 text-[10px] font-bold uppercase tracking-normal ${ktCls}`}>
            {kicker}
          </p>
        )}
        <h3 className={`${sizeStyles[tone]} ${toneStyles[tone]}`}>{children}</h3>
      </div>
      <div className="mb-2 h-px flex-1 bg-foreground/5" />
    </div>
  );
}
