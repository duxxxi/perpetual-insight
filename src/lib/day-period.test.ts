import { describe, test } from "node:test";
import { strictEqual } from "node:assert";
import { dayPeriod, timeOfDay, nightBlend } from "./day-period";

describe("viewer-local background period", () => {
  test("day starts at 07:00 and continues until 16:59", () => {
    strictEqual(dayPeriod(new Date(2026, 9, 14, 7, 0)), "day");
    strictEqual(dayPeriod(new Date(2026, 9, 14, 16, 59)), "day");
  });
  test("evening uses the nighttime background from 17:00 through 06:59", () => {
    strictEqual(dayPeriod(new Date(2026, 9, 14, 17, 0)), "night");
    strictEqual(dayPeriod(new Date(2026, 9, 15, 6, 59)), "night");
  });
  test("evening is 17:00–20:59 and night begins 21:00", () => {
    strictEqual(timeOfDay(new Date(2026, 9, 14, 16, 59)), "Day");
    strictEqual(timeOfDay(new Date(2026, 9, 14, 17, 0)), "Evening");
    strictEqual(timeOfDay(new Date(2026, 9, 14, 20, 59)), "Evening");
    strictEqual(timeOfDay(new Date(2026, 9, 14, 21, 0)), "Night");
  });
  test("dusk smoothly blends from 16:30 to the full night skyline at 17:00", () => {
    strictEqual(nightBlend(new Date(2026, 9, 14, 16, 30)), 0);
    strictEqual(nightBlend(new Date(2026, 9, 14, 16, 45)), 0.5);
    strictEqual(nightBlend(new Date(2026, 9, 14, 17, 0)), 1);
  });
  test("dawn blends from 06:30 to full daylight at 07:00", () => {
    strictEqual(nightBlend(new Date(2026, 9, 14, 6, 30)), 1);
    strictEqual(nightBlend(new Date(2026, 9, 14, 6, 45)), 0.5);
    strictEqual(nightBlend(new Date(2026, 9, 14, 7, 0)), 0);
  });
  test("night stays fully dark across midnight", () => {
    strictEqual(nightBlend(new Date(2026, 9, 14, 21)), 1);
    strictEqual(nightBlend(new Date(2026, 9, 15, 0)), 1);
    strictEqual(nightBlend(new Date(2026, 9, 15, 12)), 0);
  });
});