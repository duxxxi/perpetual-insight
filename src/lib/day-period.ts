/** Public painted page cycle; independent of workspace theme settings. */
export function timeOfDay(date: Date): "Day" | "Evening" | "Night" {
  const hour = date.getHours();
  if (hour >= 7 && hour < 17) return "Day";
  if (hour >= 17 && hour < 21) return "Evening";
  return "Night";
}

export function dayPeriod(date: Date): "day" | "night" {
  return timeOfDay(date) === "Day" ? "day" : "night";
}

/** Predictable local visual schedule, not a geolocated sunset forecast. */
export function nightBlend(date: Date): number {
  const minutes = date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
  const smooth = (value: number) => value * value * (3 - 2 * value);
  if (minutes < 390 || minutes >= 1020) return 1;
  if (minutes < 420) return 1 - smooth((minutes - 390) / 30);
  if (minutes < 990) return 0;
  return smooth((minutes - 990) / 30);
}