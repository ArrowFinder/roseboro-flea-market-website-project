// Only confirmed content belongs in this configuration. Never add guessed links or rules.
const business = {
  eventbriteUrl:
    "https://www.eventbrite.com/e/rose-bowl-flea-market-sunday-november-8-2026-tickets-1977731982599?aff=RGCShowsWeb",
};
// Route templates contain trusted static copy only. Form values are handled in vendor.js.
const main = document.querySelector("main");
const ticket = '<button class="button ticket">Buy Tickets ↗</button>';
// Shared linked visitor details keep home and calendar navigation consistent.
const visit = `<div class="visit-grid" aria-label="Plan your visit">${[
  ["location", "Location", "1001 Rose Bowl Drive, Pasadena, CA 91103"],
  ["hours", "Hours", "Every second Sunday. General admission from 9 a.m."],
  ["admission", "Admission", "Ticket options and information for your visit."],
  ["parking", "Parking", "Free parking and preferred paid parking available."],
]
  .map(
    ([route, title, description]) =>
      `<a class="visit-card" href="#${route}"><h3>${title} <span aria-hidden="true">↗</span></h3><p>${description}</p><span class="visit-more">View details</span></a>`,
  )
  .join("")}</div>`;
const visitorPages = {
  location: [
    "Find your way here.",
    "1001 Rose Bowl Drive, Pasadena, CA 91103.",
    `<p>The flea market takes place at the Rose Bowl in Pasadena. Rideshare drop-off is at Gate C.</p><a class="button" href="https://www.google.com/maps/search/?api=1&query=1001+Rose+Bowl+Drive+Pasadena+CA+91103">Get directions ↗</a>`,
  ],
  hours: [
    "Make a Sunday of it.",
    "The flea market is always on the second Sunday of every month.",
    `<p>General admission begins at 9 a.m. Pacific. The current website lists VIP early entry from 5 a.m. to 8:45 a.m.</p><p>Lighting is limited during early entry, and vehicles may still be moving during setup. Closing time is awaiting confirmation.</p><a href="#calendar">View the next market date →</a>`,
  ],
  admission: [
    "Your next great find awaits.",
    "Choose your entry time and check the event listing before you visit.",
    `<p>General admission starts at 9 a.m. VIP admission offers earlier entry. Children under 12 enter free with an adult, according to the current market website.</p><p>Check Eventbrite for available tickets, current prices, fees, and the date of your selected event.</p>${ticket}`,
  ],
  parking: [
    "Park. Explore. Discover.",
    "Free parking is available at the Rose Bowl Flea Market.",
    `<p>Preferred paid parking is also offered. The current website lists preferred parking at $20, payable by cash or card.</p><p>Accessible parking and restrooms are available. Wheelchair and stroller rentals are not offered.</p><a href="#location">See location and directions →</a>`,
  ],
};
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
      "new-vendor",
      "returning-vendor",
      "returning-application",
      "spaces",
      "requirements",
      "policies",
      ...Object.keys(visitorPages),
    ].includes(route)
  )
    route = "home";
  document.title =
    (route === "home"
      ? ""
      : route
          .split("-")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ") + " | ") + "Rose Bowl Flea Market";
  if (route === "home") {
    main.innerHTML = `
      <section class="photo-hero">
        <div class="hero-copy"><h1>The thrill<br>of the <em>find.</em></h1><p>Vintage treasures. Unexpected favorites. A whole Sunday of discovery at the Rose Bowl Flea Market.</p><div class="actions">${ticket}<a class="hero-plan" href="#vendors">Become a Vendor ↗</a></div><p class="hero-footnote">A little curiosity goes a long way.</p></div>
        <figure class="hero-photo"><img src="assets/market-entrance.jpg" width="2000" height="1333" alt="Shoppers arriving at the Rose Bowl beneath the yellow and red flea market entrance banner" fetchpriority="high"></figure>
      </section>
      ${countdown}
      <section class="content market-visit"><div class="section-head"><div><p class="eyebrow">Save your Sunday</p><h2>See you at the market.</h2></div><a href="#calendar">Event Calendar ↗</a></div><div class="market-details">${event()}${visit}</div></section>`;
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
      `<section class="content">${visit}</section>`;
  if (visitorPages[route]) {
    const [title, description, details] = visitorPages[route];
    main.innerHTML =
      intro("Plan your visit · " + route, title, description) +
      `<div class="visitor-details">${details}<p class="muted">Visitor information follows the <a href="https://www.rgcshows.com/rose-bowl/">current market website</a>. Check the event listing before your visit.</p><a class="back-link" href="#home">← Back to the market</a></div>${visit}</section>`;
  }
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
  if (["vendors", "apply"].includes(route))
    main.innerHTML = `<section class="vendor-hero" aria-label="Sell at the Rose Bowl"><img src="assets/vendor-aerial.jpg" width="2000" height="1498" alt="Aerial view of vendor stalls surrounding the Rose Bowl stadium and the Pasadena hills" fetchpriority="high"><div class="vendor-hero-title"><p class="eyebrow">Every second Sunday · Pasadena, California</p><h1>Your finds.<br>Their next favorite.</h1></div></section><section class="content vendor-entry"><p class="eyebrow">Sell at the Rose Bowl</p><h2>Let’s get you to the market.</h2><p>First time here or ready for another market day?</p><div class="vendor-paths"><a class="button" href="#new-vendor">New Vendor →</a><a class="button secondary" href="#returning-vendor">Returning Vendor →</a></div></section>`;
  if (route === "returning-vendor")
    main.innerHTML =
      intro(
        "Returning vendor",
        "Welcome back.",
        "Pick up with your selling and contact details, then choose your next market.",
      ) +
      `<div class="returning-preview"><h2>Your vendor profile</h2><p>In the finished website, you’ll sign in securely to access information from your previous application.</p><p class="note">Design preview: no account or saved application is connected. The next screen uses fictional sample details that you can review and edit.</p><a class="button" href="#returning-application">Preview with sample profile →</a><p><a class="back-link" href="#apply">← Choose a different path</a></p></div></section>`;
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
  if (["new-vendor", "returning-application"].includes(route)) {
    VendorFlow.selectPath(route === "new-vendor" ? "new" : "returning");
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

// Text inputs can match :focus-visible after a click. Track Tab navigation explicitly
// so pointer users see no extra ring while keyboard users retain a clear indicator.
document.addEventListener("keydown", (event) => {
  if (event.key === "Tab")
    document.documentElement.classList.add("keyboard-navigation");
});
document.addEventListener(
  "pointerdown",
  () => {
    document.documentElement.classList.remove("keyboard-navigation");
  },
  true,
);
