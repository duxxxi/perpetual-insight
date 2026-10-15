import { describe, test } from "node:test";
import { strictEqual } from "node:assert";
import { EXCHANGES, WORKSPACE_EXCHANGES, exchangeClock, horizonProgress, horizonPoint } from "./exchange-clock";

describe("regular exchange sessions", () => {
  test("Shanghai follows 09:30–11:30 and 13:00–15:00 local sessions", () => {
    const shanghai = WORKSPACE_EXCHANGES[3];
    strictEqual(exchangeClock(new Date("2026-10-15T01:29:00Z"), shanghai).open, false);
    strictEqual(exchangeClock(new Date("2026-10-15T01:30:00Z"), shanghai).open, true);
    strictEqual(exchangeClock(new Date("2026-10-15T03:30:00Z"), shanghai).status, "Opens 13:00");
    strictEqual(exchangeClock(new Date("2026-10-15T05:00:00Z"), shanghai).open, true);
    strictEqual(exchangeClock(new Date("2026-10-15T07:00:00Z"), shanghai).status, "Closed");
    strictEqual(exchangeClock(new Date("2026-10-17T02:00:00Z"), shanghai).open, false);
  });
  test("New York opens 09:30 and closes 16:00 local", () => {
    strictEqual(exchangeClock(new Date("2026-10-15T13:29:00Z"), EXCHANGES[0]).open, false);
    strictEqual(exchangeClock(new Date("2026-10-15T13:30:00Z"), EXCHANGES[0]).open, true);
    strictEqual(exchangeClock(new Date("2026-10-15T20:00:00Z"), EXCHANGES[0]).open, false);
  });
  test("London opens 08:00 and closes 16:30 local", () => {
    strictEqual(exchangeClock(new Date("2026-10-15T06:59:00Z"), EXCHANGES[1]).open, false);
    strictEqual(exchangeClock(new Date("2026-10-15T07:00:00Z"), EXCHANGES[1]).open, true);
    strictEqual(exchangeClock(new Date("2026-10-15T15:30:00Z"), EXCHANGES[1]).open, false);
  });
  test("Tokyo respects lunch and 15:30 close", () => {
    strictEqual(exchangeClock(new Date("2026-10-15T00:00:00Z"), EXCHANGES[2]).open, true);
    strictEqual(exchangeClock(new Date("2026-10-15T02:30:00Z"), EXCHANGES[2]).status, "Opens 12:30");
    strictEqual(exchangeClock(new Date("2026-10-15T03:30:00Z"), EXCHANGES[2]).open, true);
    strictEqual(exchangeClock(new Date("2026-10-15T06:30:00Z"), EXCHANGES[2]).open, false);
  });
  test("weekends are closed and zones follow daylight saving", () => {
    strictEqual(exchangeClock(new Date("2026-10-17T14:00:00Z"), EXCHANGES[0]).open, false);
    strictEqual(exchangeClock(new Date("2026-12-15T14:30:00Z"), EXCHANGES[0]).label, "09:30");
  });
});
test("horizon resets at the same 07:00 and 17:00 boundaries as the background", () => {
  strictEqual(horizonProgress(new Date(2026, 9, 15, 7)), 0);
  strictEqual(horizonProgress(new Date(2026, 9, 15, 12)), 0.5);
  strictEqual(horizonProgress(new Date(2026, 9, 15, 17)), 0);
  strictEqual(horizonProgress(new Date(2026, 9, 16, 0)), 0.5);
});
test("sun and moon sit on the symmetric quadratic arc", () => {
  strictEqual(horizonPoint(0).y, 49);
  strictEqual(horizonPoint(1).y, 49);
  strictEqual(horizonPoint(0.5).x, 80);
  strictEqual(horizonPoint(0.5).y, 12);
  strictEqual(horizonPoint(0.25).y, horizonPoint(0.75).y);
});
test("sun and moon advance along the arc as local time advances", () => {
  const sunEarly = horizonPoint(horizonProgress(new Date(2026, 9, 15, 8)));
  const sunLater = horizonPoint(horizonProgress(new Date(2026, 9, 15, 10)));
  strictEqual(sunLater.x > sunEarly.x, true);
  strictEqual(sunLater.y < sunEarly.y, true);
  const moonEarly = horizonPoint(horizonProgress(new Date(2026, 9, 15, 18)));
  const moonLater = horizonPoint(horizonProgress(new Date(2026, 9, 15, 20)));
  strictEqual(moonLater.x > moonEarly.x, true);
  strictEqual(moonLater.y < moonEarly.y, true);
  strictEqual(horizonProgress(new Date(2026, 9, 15, 12, 0, 1)) > horizonProgress(new Date(2026, 9, 15, 12, 0, 0)), true);
});