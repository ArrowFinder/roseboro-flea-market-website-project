/* Visual orientation only, never inventory or a confirmed plot assignment.
   Coordinates trace the owner-specified general map in a normalized viewBox.
   Orange/Pearl sub-options lack boundaries on this map, so highlight the whole area. */
const VendorMap = (() => {
  const shapes = {
    pearl: "M68 86 L391 204 L391 1006 L68 1006 Z",
    orange:
      "M442 222 L598 222 Q535 315 535 435 Q530 540 583 630 L738 887 L799 887 L800 986 L832 1041 Q957 1017 955 1100 Q887 1078 848 1105 Q867 1235 838 1373 L442 1373 Z",
    blue700: "M598 232 Q711 65 888 65 L888 186 Q772 186 698 284 Z",
    blue500: "M598 232 L698 284 Q650 350 650 432 L537 436 Q536 323 598 232 Z",
    blue300: "M537 436 L650 432 Q649 513 686 580 L583 632 Q535 547 537 436 Z",
    blue100: "M583 632 L686 580 Q725 642 787 677 L787 790 L715 846 Z",
    blue1900:
      "M715 846 L787 790 L888 790 L888 852 L789 852 L789 887 L739 887 Z",
    gold800: "M888 65 Q1069 65 1175 222 L1077 284 Q1000 185 888 186 Z",
    gold600: "M1175 222 Q1236 315 1242 435 L1129 433 Q1128 350 1077 284 Z",
    gold400: "M1242 435 Q1240 538 1197 625 L1091 580 Q1126 515 1129 433 Z",
    gold200: "M1197 625 L1091 580 Q1052 641 988 677 L988 790 L1065 841 Z",
    gold2000:
      "M888 790 L988 790 L1065 841 L1037 886 L988 886 L988 852 L888 852 Z",
  };
  const blue = ["blue700", "blue500", "blue300", "blue100", "blue1900"];
  const gold = ["gold800", "gold600", "gold400", "gold200", "gold2000"];
  // Section-number mapping cross-checked against the live Blue/Gold price page.
  const sections = {
    "stadium-1": "blue700",
    "stadium-2": "blue500",
    "stadium-3": "blue300",
    "stadium-4": "blue1900",
    "stadium-5": "blue100",
    "stadium-7": "gold800",
    "stadium-8": "gold200",
    "stadium-9": "gold600",
    "stadium-10": "gold400",
    "stadium-11": "gold2000",
  };
  function selection(area, space) {
    if (area === "pearl" || area === "orange")
      return {
        keys: [area],
        description: `${area === "pearl" ? "Pearl" : "Orange"} area highlighted. Individual plot boundaries are not shown on this general map.`,
      };
    if (area !== "stadium")
      return {
        keys: [],
        description: "Choose a selling area to highlight its location.",
      };
    const section = sections[space];
    if (section)
      return {
        keys: [section],
        description: `${section.startsWith("blue") ? "Blue" : "Gold"} Area ${section.replace(/\D/g, "")} highlighted. Exact space assignment follows office review.`,
      };
    if (space === "stadium-6" || space === "stadium-12")
      return {
        keys: space === "stadium-6" ? blue : gold,
        description:
          "Selling side highlighted. Services and promotional placement is assigned by the office.",
      };
    return {
      keys: [...blue, ...gold],
      description:
        "Blue and Gold stadium areas highlighted. Choose a space option to narrow the highlight.",
    };
  }
  function render(area, space, label = "") {
    const selected = selection(area, space);
    // Labels originate only from the static space catalog, never user-entered text.
    return `<aside class="vendor-map" aria-label="Space request map"><h3>Rose Bowl Flea Market Vendor Map</h3><div class="vendor-map-image ${selected.keys.length ? "has-selection" : ""}"><img src="assets/vendor-map.jpg" width="1800" height="1867" alt="General Rose Bowl vendor map: Pearl west of the canal, Orange beside the canal, and Blue and Gold sections around the stadium."><svg viewBox="0 0 1542 1600" aria-hidden="true" focusable="false">${selected.keys.length ? `<defs><clipPath id="selected-map-area">${selected.keys.map((key) => `<path d="${shapes[key]}"></path>`).join("")}</clipPath></defs><image href="assets/vendor-map.jpg" width="1542" height="1600" preserveAspectRatio="none" clip-path="url(#selected-map-area)"></image>` : ""}${Object.entries(
      shapes,
    )
      .map(
        ([key, path]) =>
          `<path d="${path}" class="${selected.keys.includes(key) ? "selected" : ""}"></path>`,
      )
      .join(
        "",
      )}</svg></div><div class="map-selection" aria-live="polite">${label ? `<strong>${label}</strong>` : ""}<p>${selected.description}</p></div><a href="assets/vendor-map.jpg" target="_blank" rel="noopener">Open full-size map</a><p class="muted">Location guide only. Highlighting does not indicate availability or reserve a space.</p></aside>`;
  }
  return { render, selection };
})();
