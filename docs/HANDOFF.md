# Engineering handoff

Updated: October 30, 2026. Status: local, non-production prototype.

## Architecture and rationale

Static HTML, CSS, and JavaScript with hash navigation. This suits the current brochure pages and in-memory form preview without a framework or runtime dependencies. The only development dependency is pinned Prettier; Node's built-in test runner handles validation tests. A production submission service is intentionally not selected before the business workflow and hosting destination are confirmed.

`dist/` currently contains **editable source**, despite its conventional build-output name. There is no build step. Do not overwrite it with generated assets. A future framework migration should rename/restructure this deliberately.

| File                  | Responsibility                                                                                |
| --------------------- | --------------------------------------------------------------------------------------------- |
| dist/index.html       | Document shell, navigation, preview notice, footer                                            |
| dist/app.js           | Shopper and vendor information routes, content, ticket URL, navigation                        |
| dist/calendar.js      | Venue-time monthly schedule and countdown lifecycle                                           |
| dist/vendor.js        | In-memory application state, field definitions, conditional guidance, validation, review/edit |
| dist/style.css        | Design tokens, responsive layout, focus and form styles                                       |
| server.mjs            | Loopback-only static development server; not a production server                              |
| tests/vendor.test.mjs | Validation regressions using Node's isolated VM                                               |

Scripts load with `defer`, in order: calendar module, vendor module, then page/router module. `VendorFlow` exposes render/bind and testable validation helpers. Form data is closure-local, updated on input, and survives internal navigation until reload. All routes replace the main region and move focus there. User values are assigned to control values or review `textContent`, not interpolated into HTML.

See DESIGN.md for photo provenance, palette and countdown semantics. `MarketCalendar` uses the IANA venue timezone, has tested month/year/DST boundaries, and disposes timers on route transitions.

## Implemented behavior

- Shopper homepage, Calendar, About, Vendors, Contact and vendor subpages.
- Shared linked visitor cards route to Location, Hours, Admission and Parking. Content is trusted static copy in `visitorPages`; event-date ticket guards remain in effect.
- Footer reproduces current public office/contact/legal content. Office service hours are distinct from public market hours; never infer market closing time from footer hours.
- Exact owner-supplied November 8 Eventbrite destination; no custom shopper checkout.
- Five-step vendor preview: event/area, selling details, contact, payment explanation, review.
- Required inputs, email/phone/select/length validation, inline errors, focus on first error, progress, Back and section Edit controls.
- Conditional permit-location question and seller-status guidance. Incompatible Stadium/occasional-seller selection is blocked.
- Disabled submission and explicit draft-only review. No persistence, upload, payment, reservation, or message delivery.

## Production gaps — release blockers

1. Actual vendor event options, inventory, space type, size, quantity, preferences, price totals and change approvals.
2. Full conditional seller documentation/certification, contact/address requirements, exact consent/signature wording and any ID collection. The prototype shows the branches but does not implement the complete legal/application process.
3. Submission backend: server validation, authorized staff access, durable records, retention/deletion, upload restrictions/scanning, spam/rate controls, email delivery and error/retry behavior. Backend success must precede any receipt message.
4. Payment arrangement choices and approved authorization. No live payment provider selected; existing process is staff review followed by payment.
5. Source conflicts about move-in times, vehicle/trailer rules and delivery routes. Resolve with business owner; see SOURCE-REVIEW.md.
6. Finished About content, complete visitor details, final Eventbrite date management and expiry behavior.
7. Full responsive/accessibility and browser regression pass. Current checks are limited; see QA.md.

## Integration boundaries

`business.eventbriteUrl` in app.js is the replaceable shopper ticket link. Vendor choices are currently local configuration, not inventory. Connect production availability through a service interface; never imply a selected option is a hold. Replace disabled submission only after the complete reviewed form and backend are implemented. Use explicit submission states (idle, sending, received, failed), prevent accidental duplicates and retain entered values on retryable failure. Describe a successful request as a request, not a reservation.

## Operational notes

Repository: https://github.com/ArrowFinder/roseboro-flea-market-website-project (private). The original requested slug is retained; visible branding is Rose Bowl. No website deployment is configured. The local preview is intentionally left running when the owner requests a review link. Fonts load from Google Fonts with local fallbacks. Replace remote fonts if offline rendering or privacy requirements demand it. No analytics or third-party scripts are installed.

Development commits and dependency audit are not an independent engineering/security audit. A human engineer should review policy fidelity, server design, handling of sensitive data, accessibility and release readiness before launch.

## New and returning vendor paths

`#apply` now selects a path; `#new-vendor` opens the blank draft. `#returning-vendor` explains the prototype and `#returning-application` opens a synthetic profile. `VendorFlow.selectPath` saves/restores independent in-memory drafts and steps. Re-entering a path resumes its current tab draft; reload clears edits. Profile defaults exclude event and area, which must be selected for each request. `snapshot` returns a copy for regression tests.

Production requirement: authenticated vendor identity and authorized server-side profile retrieval/update; never retrieve a profile using only an unverified email. Define which previously submitted fields can be reused and require renewed event-specific declarations. No browser persistence, backend, real login or real profile saving was added. Replace the sample gateway and fixture only once secure storage, retention, recovery and submission rules are approved.

## Space estimates and path-specific payment

`spaceOptions` in vendor.js snapshots selectable live application rates. Pure `quote(area, space, quantity)` validates the area/space relationship and integer quantity 1–5, then calculates integer cents. Missing/invalid choices produce no quote, never zero. Changing area clears the space choice. Estimate updates on space/quantity change and appears in step 4 and final review. Server must recompute rates and verify availability before production acceptance.

Step 4 is Space estimate for new vendors, with no payment field. Returning vendors get Payment preference, a required select with no default; choices are `on-file` and `new-after-acceptance`. Review includes the chosen preference and allows editing. Preferences remain isolated with each in-memory draft. This is intent only: no payment token, account lookup, card details or authorization is collected. Production must verify an existing method through the authenticated customer record and obtain appropriate post-acceptance authorization before charging. All payment collection is outside the application phase.

The new owner instruction supersedes generic legacy payment-process copy. Historical release blockers about pricing now concern price freshness, inventory, and unresolved source differences, rather than absence of base rates.

Vendor landing (#vendors and #apply) now exposes only the two entry paths beneath the hero. Existing application subnavigation and information routes are unchanged.
