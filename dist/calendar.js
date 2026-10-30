/** Monthly market schedule. All date decisions use Pasadena time, never visitor time. */
const MarketCalendar = (() => {
  const timeZone = "America/Los_Angeles";
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  function parts(date) {
    return Object.fromEntries(
      formatter
        .formatToParts(date)
        .filter((p) => p.type !== "literal")
        .map((p) => [p.type, Number(p.value)]),
    );
  }
  function secondSunday(year, month) {
    return 8 + ((7 - new Date(Date.UTC(year, month - 1, 1)).getUTCDay()) % 7);
  }
  // Convert a venue-local 09:00 to an instant using the IANA zone's actual offset.
  // Recompute rather than hard-code PST/PDT: March/November can change offsets.
  function openingInstant(year, month, day) {
    const wallClock = Date.UTC(year, month - 1, day, 9);
    let instant = wallClock;
    for (let i = 0; i < 3; i++) {
      const p = parts(new Date(instant));
      instant +=
        wallClock -
        Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    }
    return new Date(instant);
  }
  function schedule(now = new Date()) {
    const local = parts(now);
    let year = local.year,
      month = local.month;
    let day = secondSunday(year, month);
    if (local.day > day) {
      if (++month > 12) {
        month = 1;
        year++;
      }
      day = secondSunday(year, month);
    }
    const target = openingInstant(year, month, day);
    const key = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const total = Math.max(
      0,
      Math.floor((target.getTime() - now.getTime()) / 1000),
    );
    return {
      key,
      target,
      isMarketDay:
        local.year === year &&
        local.month === month &&
        local.day === day &&
        now >= target,
      label: new Intl.DateTimeFormat("en-US", {
        timeZone,
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(target),
      days: Math.floor(total / 86400),
      hours: Math.floor((total % 86400) / 3600),
      minutes: Math.floor((total % 3600) / 60),
      seconds: total % 60,
    };
  }
  function mount(root) {
    let timer;
    function update() {
      if (!root.isConnected) return;
      const value = schedule();
      root.querySelector("[data-market-date]").textContent = value.label;
      root.querySelector("[data-countdown-heading]").textContent =
        value.isMarketDay
          ? "It’s market day!"
          : "The next treasure hunt starts in";
      root.querySelector("[data-countdown-units]").hidden = value.isMarketDay;
      root.querySelector("[data-countdown-note]").textContent =
        value.isMarketDay
          ? "Today is the second Sunday. Check admission details before visiting."
          : "Counting down to general admission · 9:00 a.m. Pacific";
      for (const unit of ["days", "hours", "minutes", "seconds"])
        root.querySelector(`[data-unit="${unit}"]`).textContent = String(
          value[unit],
        ).padStart(2, "0");
    }
    update();
    // No per-second aria-live announcement. The dated label is available to assistive tech.
    timer = setInterval(update, 1000);
    document.addEventListener("visibilitychange", update);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
    };
  }
  return { schedule, secondSunday, openingInstant, mount, timeZone };
})();
