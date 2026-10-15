export const EXCHANGES = [
  { city: "New York", code: "NYSE", zone: "America/New_York", sessions: [[570, 960]] },
  { city: "London", code: "LSE", zone: "Europe/London", sessions: [[480, 990]] },
  { city: "Tokyo", code: "TSE", zone: "Asia/Tokyo", sessions: [[540, 690], [750, 930]] },
] as const;

export function exchangeClock(date: Date, exchange: typeof EXCHANGES[number]) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: exchange.zone, hour: "2-digit", minute: "2-digit", weekday: "short", hourCycle: "h23",
  }).formatToParts(date);
  const value = (type: string) => parts.find(part => part.type === type)?.value ?? "00";
  const hour = Number(value("hour"));
  const minute = Number(value("minute"));
  const minutes = hour * 60 + minute;
  const weekday = !["Sat", "Sun"].includes(value("weekday"));
  const open = weekday && exchange.sessions.some(([start, end]) => minutes >= start && minutes < end);
  const next = weekday ? exchange.sessions.find(([start]) => start > minutes)?.[0] : undefined;
  const formatMinute = (mins: number) => `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
  return { hour, minute, label: `${value("hour")}:${value("minute")}`, open,
    status: open ? "In session" : next !== undefined ? `Opens ${formatMinute(next)}` : "Closed",
  };
}

/** Visual day/night cycle, not an astronomical sunrise forecast. */
export function horizonProgress(date: Date) {
  const mins = date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
  const day = mins >= 420 && mins < 1020;
  return day ? (mins - 420) / 600 : ((mins - 1020 + 1440) % 1440) / 840;
}

/** Exact point on M14 49 Q80 -25 146 49, shared by marker and arc. */
export function horizonPoint(t: number) {
  return { x: 14 + 132 * t, y: 49 - 148 * t * (1 - t) };
}