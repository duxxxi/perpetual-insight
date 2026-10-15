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