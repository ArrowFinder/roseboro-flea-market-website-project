import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFileSync } from "node:fs";
const context = vm.createContext({ Intl, Date });
vm.runInContext(
  readFileSync(new URL("../dist/calendar.js", import.meta.url), "utf8"),
  context,
);
const calendar = vm.runInContext("MarketCalendar", context);
test("every calculated date is a Sunday between the 8th and 14th", () => {
  for (let year = 2026; year <= 2035; year++)
    for (let month = 1; month <= 12; month++) {
      const day = calendar.secondSunday(year, month);
      assert.ok(day >= 8 && day <= 14);
      assert.equal(new Date(Date.UTC(year, month - 1, day)).getUTCDay(), 0);
    }
});
test("October 30 counts down to November 8, 2026 at 9am Pacific", () => {
  const s = calendar.schedule(new Date("2026-10-30T18:00:00Z"));
  assert.equal(s.key, "2026-11-08");
  assert.equal(s.target.toISOString(), "2026-11-08T17:00:00.000Z");
  assert.equal(s.days, 8);
  assert.equal(s.hours, 23);
});
test("spring DST uses the daylight offset and fall uses standard time", () => {
  assert.equal(
    calendar.openingInstant(2026, 3, 8).toISOString(),
    "2026-03-08T16:00:00.000Z",
  );
  assert.equal(
    calendar.openingInstant(2026, 11, 8).toISOString(),
    "2026-11-08T17:00:00.000Z",
  );
});
test("opening switches to market-day state without negative time", () => {
  const s = calendar.schedule(new Date("2026-11-08T17:00:00Z"));
  assert.equal(s.isMarketDay, true);
  assert.equal(s.seconds, 0);
  assert.equal(s.days, 0);
});
test("market day lasts until midnight in Pasadena, then rolls forward", () => {
  assert.equal(
    calendar.schedule(new Date("2026-11-09T07:59:59Z")).isMarketDay,
    true,
  );
  assert.equal(
    calendar.schedule(new Date("2026-11-09T08:00:00Z")).key,
    "2026-12-13",
  );
});
test("December rolls into January of the next year", () => {
  assert.equal(
    calendar.schedule(new Date("2026-12-14T08:00:00Z")).key,
    "2027-01-10",
  );
});
