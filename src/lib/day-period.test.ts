import { describe, test } from "node:test";
import { strictEqual } from "node:assert";
import { dayPeriod } from "./day-period";

describe("viewer-local background period", () => {
  test("day starts at 07:00 and continues until 18:59", () => {
    strictEqual(dayPeriod(new Date(2026, 9, 14, 7, 0)), "day");
    strictEqual(dayPeriod(new Date(2026, 9, 14, 18, 59)), "day");
  });
  test("night starts at 19:00 and continues until 06:59", () => {
    strictEqual(dayPeriod(new Date(2026, 9, 14, 19, 0)), "night");
    strictEqual(dayPeriod(new Date(2026, 9, 15, 6, 59)), "night");
  });
});