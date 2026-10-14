import { describe, expect, test } from "bun:test";
import { dayPeriod } from "./day-period";

describe("viewer-local background period", () => {
  test("day starts at 07:00 and continues until 18:59", () => {
    expect(dayPeriod(new Date(2026, 9, 14, 7, 0))).toBe("day");
    expect(dayPeriod(new Date(2026, 9, 14, 18, 59))).toBe("day");
  });
  test("night starts at 19:00 and continues until 06:59", () => {
    expect(dayPeriod(new Date(2026, 9, 14, 19, 0))).toBe("night");
    expect(dayPeriod(new Date(2026, 9, 15, 6, 59))).toBe("night");
  });
});