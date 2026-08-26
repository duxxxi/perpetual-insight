import { useEffect, useState } from "react";

/* ---------- helpers ---------- */

const MARKETS = [
  { code: "BTS", tz: "Europe/Bratislava" },
  { code: "EVN", tz: "Asia/Yerevan" },
  { code: "SHA", tz: "Asia/Shanghai" },
  { code: "NYC", tz: "America/New_York" },
];

function parts(date: Date, tz: string) {
  const f = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  });
  const map: Record<string, string> = {};
  for (const p of f.formatToParts(date)) map[p.type] = p.value;
  const hour = Number(map.hour ?? 0);
  const minute = Number(map.minute ?? 0);
  const weekend = map.weekday === "Sat" || map.weekday === "Sun";
  const mins = hour * 60 + minute;
  const state: "open" | "pre" | "closed" = weekend
    ? "closed"
    : mins >= 9 * 60 && mins < 17 * 60 + 30
      ? "open"
      : mins >= 7 * 60 && mins < 9 * 60
        ? "pre"
        : "closed";
  return { label: `${map.hour}:${map.minute}`, state, mins };
}

/* Approximate daylight window — quiet indicator, not an almanac */
const SUNRISE = 6 * 60;
const SUNSET = 20 * 60;

function DaylightArc({ mins }: { mins: number }) {
  const W = 92;
  const H = 20;
  const t = Math.min(1, Math.max(0, (mins - SUNRISE) / (SUNSET - SUNRISE)));
  const daytime = mins >= SUNRISE && mins <= SUNSET;
  // quadratic arc from (2,H-3) to (W-2,H-3) with control (W/2,-6)
  const x0 = 2, y0 = H - 3, cx = W / 2, cy = -6, x1 = W - 2, y1 = H - 3;
  const px = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t ** 2 * x1;
  const py = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t ** 2 * y1;

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[9px] tracking-[0.18em] text-foreground/30">
        {daytime ? "DAY" : "NIGHT"}
      </span>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden className="overflow-visible">
        <line
          x1={0}
          y1={H - 3}
          x2={W}
          y2={H - 3}
          stroke="currentColor"
          strokeWidth={0.5}
          className="text-foreground/15"
        />
        <path
          d={`M ${x0} ${y0} Q ${cx} ${cy} ${x1} ${y1}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.75}
          strokeDasharray="2 3"
          className="text-foreground/20"
        />
        {daytime ? (
          <>
            <circle cx={px} cy={py} r={4.5} className="fill-amber-400/25" />
            <circle cx={px} cy={py} r={2} className="fill-amber-500/90 dark:fill-amber-300/90" />
          </>
        ) : (
          <>
            <circle cx={px < 2 ? 6 : W - 6} cy={H - 3} r={4} className="fill-foreground/10" />
            <circle cx={px < 2 ? 6 : W - 6} cy={H - 3} r={1.6} className="fill-foreground/35" />
          </>
        )}
      </svg>
    </div>
  );
}

/* ---------- masthead ---------- */
export function MastheadBand() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const local = now ? parts(now, MARKETS[0]!.tz) : null;

  return (
    <div className="relative flex items-center justify-center px-5 pb-2 pt-4">
      {/* Left — trade-day clocks */}
      <div className="pointer-events-none absolute left-5 hidden items-center gap-3 lg:flex">
        {now
          ? MARKETS.map((m) => {
              const p = parts(now, m.tz);
              return (
                <span key={m.code} className="flex items-center gap-1.5">
                  <span
                    className={`size-1 rounded-full ${
                      p.state === "open"
                        ? "bg-emerald-500 shadow-[0_0_6px_currentColor]"
                        : p.state === "pre"
                          ? "bg-amber-500/70"
                          : "bg-foreground/20"
                    }`}
                  />
                  <span className="font-mono text-[9px] tracking-[0.16em] text-foreground/35">
                    {m.code}
                  </span>
                  <span className="font-mono text-[9px] tabular-nums tracking-[0.08em] text-foreground/55">
                    {p.label}
                  </span>
                </span>
              );
            })
          : null}
      </div>

      {/* Center — wordmark */}
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-foreground/45">
        Perpetuity
      </span>

      {/* Right — daylight arc */}
      <div className="pointer-events-none absolute right-5 hidden items-center md:flex">
        {local ? <DaylightArc mins={local.mins} /> : null}
      </div>
    </div>
  );
}
