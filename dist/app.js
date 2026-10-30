// Only confirmed content belongs in this configuration. Never add guessed links or rules.
const business = {
  eventbriteUrl:
    "https://www.eventbrite.com/e/rose-bowl-flea-market-sunday-november-8-2026-tickets-1977731982599?aff=RGCShowsWeb",
};
// Route templates contain trusted static copy only. Form values are handled in vendor.js.
const main = document.querySelector("main");
const ticket = '<button class="button ticket">Buy Tickets ↗</button>';
const visit = `<div class="visit"><section class="content"><p class="eyebrow">Make a day of it</p><h2>Plan your visit.</h2><div class="grid">${[
  ["Location", "1001 Rose Bowl Drive, Pasadena, CA 91103"],
  [
    "Market hours",
    "Second Sunday of each month. General admission from 9 a.m.; closing time to confirm.",
  ],
  [
    "Admission",
    "See the linked Eventbrite listing for current tickets and fees.",
  ],
  ["Parking", "Free parking available; preferred paid parking also offered."],
]
  .map(([x, y]) => `<div><h3>${x}</h3><p>${y}</p></div>`)
  .join("")}</div></section></div>`;
// Schedule repeats monthly; a ticket URL belongs only to its supplied event date.
const ticketEventDate = "2026-11-08";
const event = () => {
  const next = MarketCalendar.schedule();
  return `<div class="event"><div class="date">2nd<br><small>SUNDAY</small></div><div><h3>${next.label}</h3><p class="muted">Rose Bowl Flea Market · Pasadena, California</p></div>${next.key === ticketEventDate ? ticket : '<span class="muted">Ticket link coming soon</span>'}</div>`;
};
let stopCountdown = () => {};
const countdown = `<section class="countdown" aria-label="Countdown to the next flea market"><div class="countdown-inner"><div class="countdown-copy"><p class="eyebrow">Every second Sunday. Always a discovery.</p><h2 data-countdown-heading>The next treasure hunt starts in</h2><p data-market-date></p><p class="countdown-note" data-countdown-note></p></div><div class="countdown-units" data-countdown-units>${["days", "hours", "minutes", "seconds"].map((unit) => `<div><strong data-unit="${unit}">00</strong><span>${unit}</span></div>`).join("")}</div></div></section>`;
const intro = (label, title, text) =>
  `<section class="content"><div class="page-intro"><p class="eyebrow">${label}</p><h1>${title}</h1><p>${text}</p></div>`;
function render() {
  stopCountdown();
  let route = location.hash.slice(1) || "home";
  if (
    ![
      "home",
      "calendar",
      "about",
      "vendors",
      "contact",
      "apply",
      "spaces",
      "requirements",
      "policies",
    ].includes(route)
  )
    route = "home";
  document.title =
    (route === "home" ? "" : route[0].toUpperCase() + route.slice(1) + " | ") +
    "Rose Bowl Flea Market";
  if (route === "home") {
    main.innerHTML = `
      <section class="photo-hero">
        <div class="hero-copy"><p class="eyebrow">Pasadena, California · Every second Sunday</p><h1>The thrill<br>of the <em>find.</em></h1><p>Vintage treasures. Unexpected favorites. A whole Sunday of discovery at the Rose Bowl Flea Market.</p><div class="actions">${ticket}<a class="hero-plan" href="#calendar">Plan your visit ↗</a></div><p class="hero-footnote">A little curiosity goes a long way.</p></div>
        <figure class="hero-photo"><img src="assets/market-entrance.jpg" width="2000" height="1333" alt="Shoppers arriving at the Rose Bowl beneath the yellow and red flea market entrance banner" fetchpriority="high"><figcaption>Meet us at the Rose Bowl.</figcaption></figure>
      </section>
      ${countdown}
      <section class="content discoveries"><div class="section-head"><div><p class="eyebrow">Go looking. Find something unexpected.</p><h2>Old favorites.<br>New stories.</h2></div><p>Take a closer look. The good stuff<br>is in the details.</p></div><div class="photo-grid"><figure><img src="assets/vintage-finds.jpg" width="1000" height="667" loading="lazy" alt="Vintage chair, wooden furniture and framed signs at a market stall"><figcaption><span>01 /</span> Pieces with a past</figcaption></figure><figure><img src="assets/records-and-style.jpg" width="1000" height="667" loading="lazy" alt="Red vinyl record, disco balls and a vintage Dolly Parton T-shirt"><figcaption><span>02 /</span> A style all your own</figcaption></figure><figure><img src="assets/one-of-a-kind.jpg" width="1000" height="667" loading="lazy" alt="White bicycle beside vintage luggage, clothing and a wooden sled"><figcaption><span>03 /</span> The unexpected find</figcaption></figure></div></section>
      ${visit}
      <section class="content"><div class="section-head"><div><p class="eyebrow">Save your Sunday</p><h2>See you at the market.</h2></div><a href="#calendar">Event Calendar ↗</a></div>${event()}<details><summary>How do I buy tickets?</summary><p>Buy Tickets links to the supplied Eventbrite event. Check that listing for availability and current prices.</p></details><details><summary>When is the flea market?</summary><p>Every second Sunday of the month, at the Rose Bowl in Pasadena. General admission begins at 9 a.m. Pacific.</p></details><div class="vendor-link"><div><h3>Have something to share?</h3><p>Find your place on the other side of the table.</p></div><a href="#vendors">Explore selling at the market →</a></div></section>`;
    stopCountdown = MarketCalendar.mount(document.querySelector(".countdown"));
  }
  if (route === "calendar")
    main.innerHTML =
      intro(
        "Event Calendar",
        "Make room for market day.",
        "Every second Sunday of the month. General admission from 9 a.m. Pacific.",
      ) +
      event() +
      '<p class="note">Dates follow the monthly schedule. Each Eventbrite link is specific to its event; future ticket listings will be added when available.</p></section>' +
      visit;
  if (route === "about")
    main.innerHTML =
      intro(
        "About Us",
        "A market with a story.",
        "Rose Bowl Flea Market’s story, community, and business history will be introduced here using owner-approved content.",
      ) +
      '<p class="note">Content needed: the market’s story, who runs it, what shoppers can expect, and approved photographs.</p></section>';
  if (route === "contact")
    main.innerHTML =
      intro(
        "Contact",
        "Let’s get in touch.",
        "Contact details and directions will be added once confirmed.",
      ) +
      '<div class="grid"><div><h3>Email</h3><p>Awaiting confirmation</p></div><div><h3>Phone</h3><p>Awaiting confirmation</p></div><div><h3>Address</h3><p>Awaiting confirmation</p></div></div><p class="note">There is no contact form or message delivery integration in this preview.</p></section>';
  if (route === "vendors")
    main.innerHTML =
      intro(
        "Vendors",
        "Bring your finds.<br>Find your people.",
        "Explore selling at Rose Bowl Flea Market. The application below demonstrates a guided experience; actual requirements will follow the current business process.",
      ) +
      '<nav class="vendor-nav" aria-label="Vendor sections"><a class="button" href="#apply">Vendor Application →</a><a href="#spaces">Space Options</a><a href="#requirements">Requirements</a><a href="#policies">Policies & FAQs</a></nav><p class="note">Request → Office review and availability check → Payment → Confirmed reservation and emailed vendor tickets. This preview does not submit requests.</p><div class="grid"><div><h3>Space options</h3><p>Sizes, availability, and pricing awaiting confirmation.</p></div><div><h3>Requirements</h3><p>Approved goods and selling requirements awaiting review.</p></div><div><h3>Policies</h3><p>Payment, cancellation, and reservation rules awaiting review.</p></div><div><h3>Next steps</h3><p>Office review and payment precede confirmation; vendor tickets are emailed.</p></div></div><a class="button" href="#apply">Explore application preview →</a><p class="muted">Preview only. No application, reservation, or payment will be processed.</p></section>';
  if (["spaces", "requirements", "policies"].includes(route)) {
    const text = {
      spaces: [
        "Space Options",
        "Stadium / Blue–Gold, Orange, and Pearl / White are the selling areas listed on the current website. Dimensions, current pricing, and availability need a full audit.",
      ],
      requirements: [
        "Requirements",
        "Seller status and area determine documentation. The existing application includes conditional permit and certification requirements. These will be preserved in the guided flow after review.",
      ],
      policies: [
        "Policies & FAQs",
        "Office approval and payment are required before confirmation. Existing policy text and conflicting move-in instructions need review before incorporation.",
      ],
    };
    main.innerHTML =
      intro("Vendors", text[route][0], text[route][1]) +
      '<nav class="vendor-nav" aria-label="Vendor sections"><a class="button" href="#apply">Vendor Application →</a><a href="#spaces">Space Options</a><a href="#requirements">Requirements</a><a href="#policies">Policies & FAQs</a><a href="#vendors">Vendor overview</a></nav><p class="note">Details under review. No application, reservation, or payment is processed here.</p></section>';
  }
  if (route === "apply") {
    main.innerHTML = VendorFlow.render();
    VendorFlow.bind(render);
  }
  document.querySelectorAll("nav a").forEach((a) => {
    if (a.hash === "#" + route) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.querySelector("nav").classList.remove("open");
  document.querySelector("#menu").setAttribute("aria-expanded", "false");
}
document.querySelector("#menu").addEventListener("click", (e) => {
  const open = document.querySelector("nav").classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", String(open));
});
document.addEventListener("click", (e) => {
  if (e.target.closest(".ticket")) {
    if (
      business.eventbriteUrl &&
      MarketCalendar.schedule().key === ticketEventDate
    )
      window.location.assign(business.eventbriteUrl);
    else document.querySelector("#ticket-dialog").showModal();
  }
});
document.querySelector(".skip").addEventListener("click", (e) => {
  e.preventDefault();
  main.focus();
  main.scrollIntoView();
});
window.addEventListener("hashchange", () => {
  render();
  main.focus();
  window.scrollTo(0, 0);
});
render();
