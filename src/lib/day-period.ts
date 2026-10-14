/** Match Perpetuity's existing local-time theme window. */
export function dayPeriod(date: Date): "day" | "night" {
  const hour = date.getHours();
  return hour >= 7 && hour < 19 ? "day" : "night";
}