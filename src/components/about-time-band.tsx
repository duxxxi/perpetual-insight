import { EXCHANGES, WORKSPACE_EXCHANGES, exchangeClock, horizonProgress, horizonPoint } from "@/lib/exchange-clock";
import { dayPeriod, timeOfDay } from "@/lib/day-period";

function ClockFace({ hour, minute }: { hour: number; minute: number }) {
  const end = (angle: number, length: number) => ({ x: 24 + Math.sin(angle) * length, y: 24 - Math.cos(angle) * length });
  const hourEnd = end(((hour % 12) + minute / 60) * Math.PI / 6, 10);
  const minuteEnd = end(minute * Math.PI / 30, 15);
  return <svg viewBox="0 0 48 48" className="about-clock-face" aria-hidden="true">
    <circle cx="24" cy="24" r="22" className="about-clock-rim" />
    {Array.from({ length: 12 }, (_, index) => <line key={index} x1="24" y1="5" x2="24" y2={index % 3 === 0 ? 8 : 6.5} transform={`rotate(${index * 30} 24 24)`} className="about-clock-tick" />)}
    <line x1="24" y1="24" x2={hourEnd.x} y2={hourEnd.y} className="about-clock-hour" />
    <line x1="24" y1="24" x2={minuteEnd.x} y2={minuteEnd.y} className="about-clock-minute" />
    <circle cx="24" cy="24" r="1.8" fill="currentColor" />
  </svg>;
}

export function AboutTimeBand({ now, workspace = false }: { now: Date | null; workspace?: boolean }) {
  const period = now ? dayPeriod(now) : "day";
  const t = now ? horizonProgress(now) : 0.5;
  const { x, y } = horizonPoint(t);
  const label = now ? timeOfDay(now) : "Day";
  const localTime = now ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(now) : "—:—";
  if (workspace) return <div className="workspace-clock-header">
    <div className="workspace-markets">
      <div className="about-exchanges" aria-label="Stock exchange clocks">
        <div className="about-exchange-row">
          {WORKSPACE_EXCHANGES.map(exchange => {
            const clock = now ? exchangeClock(now, exchange) : null;
            return <div key={exchange.code} className="about-exchange" title={`${exchange.code} · regular weekday schedule, excluding exchange holidays. Hours shown in exchange-local time.`}>
              <ClockFace hour={clock?.hour ?? 12} minute={clock?.minute ?? 0} />
              <span className="about-clock-city">{exchange.city}</span>
              <time className="about-clock-time">{clock?.label ?? "—:—"}</time>
              <span className="about-clock-status"><span className="about-session-dot" data-open={clock?.open ?? false} />{clock?.status ?? exchange.code}</span>
            </div>;
          })}
        </div>
      </div>
    </div>
  </div>;
  return <div className="about-time-band">
    <div className="about-exchanges" aria-label="Stock exchange clocks">
      <p className="about-markets-label">World markets</p>
      <div className="about-exchange-row">
      {EXCHANGES.map(exchange => {
        const clock = now ? exchangeClock(now, exchange) : null;
        return <div key={exchange.code} className="about-exchange" title={`${exchange.code} · regular weekday schedule, excluding exchange holidays. Hours shown in exchange-local time.`}>
          <ClockFace hour={clock?.hour ?? 12} minute={clock?.minute ?? 0} />
          <span className="about-clock-city">{exchange.city}</span>
          <time className="about-clock-time">{clock?.label ?? "—:—"}</time>
          <span className="about-clock-status"><span className="about-session-dot" data-open={clock?.open ?? false} />{clock?.status ?? exchange.code}</span>
        </div>;
      })}
      </div>
    </div>
    <div className="about-horizon" title="Your local time · gentle dusk 16:30–17:00 · evening 17:00 · night 21:00">
      <div className="about-horizon-label"><span>{label}</span><time>{localTime}</time></div>
      <svg viewBox="0 0 160 64" className="about-horizon-dial" role="img" aria-label={`Local ${label.toLowerCase()} ${period === "day" ? "sun" : "moon"} horizon, ${localTime}`}>
        <path d="M14 49 Q80 -25 146 49" className="about-horizon-track" />
        <path d="M4 49 H156" className="about-horizon-line" />
        <g transform={`translate(${x} ${y})`} className={period === "day" ? "about-sun" : "about-moon"}>
          {period === "day" ? <><circle r="5" fill="currentColor" />{Array.from({ length: 8 }, (_, index) => <line key={index} x1="0" y1="-8" x2="0" y2="-10" transform={`rotate(${index * 45})`} stroke="currentColor" strokeWidth="1" strokeLinecap="round" />)}</> : <path d="M0 -7 A7 7 0 0 0 0 7 Z" fill="currentColor" />}
        </g>
      </svg>
      <div className="about-horizon-times"><span>{period === "day" ? "07:00" : "17:00"}</span><span>Local time</span><span>{period === "day" ? "17:00" : "07:00"}</span></div>
      <div className="about-always-on" aria-label="Perpetuity always on"><span>Perpetuity</span><span className="about-on-state"><span className="about-on-light" aria-hidden="true" />ON</span></div>
    </div>
  </div>;
}