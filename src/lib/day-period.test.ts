import { describe, test } from "node:test";
import { strictEqual } from "node:assert";
import { dayPeriod, timeOfDay } from "./day-period";

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
});