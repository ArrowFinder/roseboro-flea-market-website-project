// Only confirmed content belongs in this configuration. Never add guessed links or rules.
const business = {
  eventbriteUrl:
    "https://www.eventbrite.com/e/rose-bowl-flea-market-sunday-november-8-2026-tickets-1977731982599?aff=RGCShowsWeb",
};
// Route templates contain trusted static copy only. Form values are handled in vendor.js.
const main = document.querySelector("main");
const art = `<div class="art" role="img" aria-label="Temporary illustration of a market stall, plants, and secondhand finds"><svg viewBox="0 0 550 520" aria-hidden="true"><rect width="550" height="520" fill="#dfc698"/><circle cx="420" cy="100" r="65" fill="#f5deb0"/><path d="M0 400Q120 320 270 390T550 365V520H0Z" fill="#b1b79a"/><path d="M65 185H490L455 110H110Z" fill="#f4e8c9"/><path d="M110 110H162L140 185H65ZM213 110H265V185H225ZM316 110H368L395 185H310ZM420 110H455L490 185H450Z" fill="#ae4c35"/><path d="M80 186V420M472 186V420" stroke="#354c3b" stroke-width="10"/><rect x="60" y="330" width="435" height="30" fill="#a76943"/><path d="M88 360V470M465 360V470" stroke="#72553c" stroke-width="14"/><path d="M290 310Q245 230 297 217Q345 225 308 310Z" fill="#58734b"/><path d="M298 310Q345 235 370 270Q375 310 310 320" fill="#3b5b3f"/><path d="M275 305H330L320 350H285Z" fill="#bb6547"/><rect x="120" y="285" width="95" height="45" rx="4" fill="#e5a84d"/><rect x="130" y="274" width="75" height="10" fill="#334f43"/><path d="M380 330V270Q405 250 428 270V330Z" fill="#f1e4c6"/><path d="M389 265Q405 235 420 265" fill="none" stroke="#b5794d" stroke-width="7"/><circle cx="230" cy="399" r="28" fill="#c47948"/><path d="M160 477L175 402H220L235 477Z" fill="#f3e6c8"/><path d="M180 410Q140 345 161 335Q200 345 198 409M199 409Q210 345 240 355Q260 380 210 416" fill="#4c6747"/></svg><span class="art-label">TEMPORARY ILLUSTRATION · PHOTOGRAPHY TO COME</span></div>`;
const ticket = '<button class="button ticket">Buy Tickets ↗</button>';
const visit = `<div class="visit"><section class="content"><p class="eyebrow">Make a day of it</p><h2>Plan your visit.</h2><div class="grid">${[
  ["Location", "1001 Rose Bowl Drive, Pasadena, CA 91103"],
  [
    "Market hours",
    "Second Sunday of each month. General admission from 9 a.m.; closing time to confirm.",
  ],
  [
    "Admission",
    "See the November 8 Eventbrite listing for current tickets and fees.",
  ],
  ["Parking", "Free parking available; preferred paid parking also offered."],
]
  .map(([x, y]) => `<div><h3>${x}</h3><p>${y}</p></div>`)
  .join("")}</div></section></div>`;
const event = `<div class="event"><div class="date">NOV<br><small>08</small></div><div><h3>Sunday, November 8, 2026</h3><p class="muted">Rose Bowl Flea Market · Pasadena, California</p></div><a class="button secondary" href="#calendar">Event Calendar →</a></div>`;
const intro = (label, title, text) =>
  `<section class="content"><div class="page-intro"><p class="eyebrow">${label}</p><h1>${title}</h1><p>${text}</p></div>`;
function render() {
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
  if (route === "home")
    main.innerHTML = `<section class="hero"><div><p class="eyebrow">Welcome to Rose Bowl Flea Market</p><h1>Come curious.<br>Leave with<br><em>a little story.</em></h1><p>A place to browse, discover, and connect. Come explore Rose Bowl Flea Market.</p><div class="actions">${ticket}<a href="#calendar">Plan your visit →</a></div><p class="muted">Introductory copy proposed for review.</p></div>${art}</section><div class="strip"><span>A LITTLE DISCOVERY</span><span>✳</span><span>A LITTLE CONNECTION</span><span>✳</span><span>ROOM FOR SOMETHING SPECIAL</span></div><section class="content"><div class="section-head"><div><p class="eyebrow">See you at the market</p><h2>Your next good find awaits.</h2></div><a href="#calendar">View Event Calendar ↗</a></div>${event}</section>${visit}<section class="content"><p class="eyebrow">Before you go</p><h2>A few helpful details.</h2><details><summary>How do I buy tickets?</summary><p>Buy Tickets opens the owner-supplied Eventbrite listing for November 8, 2026. Check that listing for ticket availability and current prices.</p></details><details><summary>What can I find at the market?</summary><p>Browse antiques, collectibles, vintage clothing, and general merchandise. The illustration is a visual placeholder.</p></details><div class="vendor-link"><div><h3>Have something to share?</h3><p>Explore selling at Rose Bowl Flea Market.</p></div><a href="#vendors">Visit the Vendors section →</a></div></section>`;
  if (route === "calendar")
    main.innerHTML =
      intro(
        "Event Calendar",
        "Make room for market day.",
        "Confirmed upcoming dates and individual Eventbrite listings will appear here.",
      ) +
      event.replace(
        '<a class="button secondary" href="#calendar">Event Calendar →</a>',
        ticket,
      ) +
      '<p class="note">November 8 is the event in the owner-supplied ticket link. Further dates and current ticket availability remain to be verified.</p></section>' +
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
    if (business.eventbriteUrl) window.location.assign(business.eventbriteUrl);
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
