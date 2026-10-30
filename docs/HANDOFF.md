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

Path-specific step definitions now map visual order to stable section IDs in vendor.js. New-vendor order is contact (2), space (0), requirements (1), review (4). Returning sequence retains IDs 0/1/2/3/4. Review ordering, Edit targets, guidance, validation and navigation use this mapping rather than hard-coded visible step numbers. No new vendor payment step. This change reorganizes the current prototype; it does not complete missing address/identity fields, event-specific certifications or secure document uploads. Those remain explicitly documented release blockers.

## Vendor map integration

`vendor-map.js` loads before vendor.js and exposes a pure `selection` mapping plus static markup rendering. Space Request uses the map instead of the usual sidebar in both paths. Area changes redraw the form/map and clear stale space choices; space changes update the map without recreating form controls. Quantity affects pricing only. Overlay paths are visual approximations for orientation, not precise boundaries or inventory. Labels are exclusively static catalog strings. SVG is decorative; adjacent live text conveys the selection. Re-trace paths if source image changes.

Maintain explicit Blue/Gold price-to-section mappings when updating the catalog. Orange/Pearl subtype mappings require a more detailed owner-approved map before exact plots can be highlighted.

Space Request no longer mounts #space-quote. Selection changes continue updating the map; estimated pricing is still computed for review and returning payment preference. Do not restore the removed estimate DOM update without restoring its target.

app.js tracks Tab versus pointer input with the keyboard-navigation root class. This avoids text inputs showing a focus-visible ring after pointer clicks while preserving keyboard focus visibility.

Selling Details uses stable section ID 5, inserted before requirements (1) in both paths. New flow is 2/0/5/1/4; returning flow is 0/5/1/2/3/4 and retains payment preference. The area-specific merchandise catalog mirrors the live form. Changing area clears category, documentation status and all dependent permit/occasional answers; changing documentation branch clears dependent answers. Prior-sale details are required only for exactly one prior occasion. Review uses active fields only.

Permit number is an in-memory sample-only field (required, digit presence, max 32 characters); it is not authenticated/validated against CDTFA. Location confirmation must be Yes to proceed. Occasional verification requires four affirmative declarations, 0 or 1 other occasions in the rolling 12-month period, and date/location when 1. No secure file upload, durable storage or signature/submission added. Production still requires authoritative permit/document verification, complete certification and server-side checks. Do not interpret a passed client check as verified eligibility.

Stable section ID 1 now displays Permit Verification in both paths. Guidance is area-dependent, names Orange or Pearl specifically, and describes both allowed options without implying that occasional verification is a permit or automatic approval.

### Seller certification — October 30, 2026

Both paths now end with required signer full name, position/title, and two unchecked certifications using the owner's supplied wording. New vendors see an explicit note that no payment instructions are selected. Consent is cleared when leaving review to edit earlier answers; signer details remain in tab memory. Checkbox validation accepts only explicit boolean consent. Submission stays disabled; no signature is transmitted, stored persistently, or legally validated. Production must validate the complete application server-side and record the event, final answers, certification version, signer and consent evidence together.

### Homepage vendor entry — October 30, 2026

Removed the homepage hero location/frequency eyebrow. Replaced its Plan your visit link with Become a Vendor, targeting #vendors and the existing new/returning choice. Syntax and formatting checks passed.

### Calendar spacing — October 30, 2026

Moved visitor detail cards into the calendar content section directly after the schedule note, removing stacked section padding. Calendar top/bottom padding is now 36/40px; existing responsive card layout and destinations are preserved. Syntax and formatting checks passed.

### Homepage tagline — October 30, 2026

Added the owner-supplied quoted line “The Flea market to the Stars” immediately above the homepage hero heading. Syntax and formatting checks passed.

### Returning-vendor sequence — October 30, 2026

Returning vendors now follow Seller / Business Contact → Space / Plot Request → Selling Details → Permit Verification → Payment Preference → Review & Submit. The same editable fields and validation are used for both paths; returning vendors receive synthetic saved contact/merchandise values for convenience, not a bypass. Each section must be completed. Real authenticated profiles remain unconnected; event choices, payment preference and signature consent are never preselected from an earlier event. Syntax, formatting and all 19 tests passed.

### Returning application navigation — October 30, 2026

Removed the underlined vendor-section navigation above the returning application, matching the focused new-vendor form. Main site navigation and application steps remain. Syntax and formatting checks passed.

### Visitor card icons — October 30, 2026

Added consistent inline outline map, clock, ticket and car icons to the shared visitor cards (homepage, calendar and visitor details). Decorative SVGs are hidden from assistive technology; text labels and full-card links remain accessible. Red linework and yellow accents use the approved palette. Syntax and formatting checks passed.

### Compact visitor icons — October 30, 2026

Moved each decorative icon into its card heading in place of the arrow. Removed the separate icon row and badge spacing to reduce tile height. Syntax and formatting checks passed.

### Local permit upload and extraction — October 30, 2026

Owner authorized permit upload with automatic field filling. Both paths now require a PDF/JPG/PNG (5 MB maximum, PDFs up to 5 pages) when permit-holder is selected. A local macOS Vision/PDFKit adapter reads the document; conservative parsing fills a labeled permit/account number and selects the venue-address option only when the complete address is found together. Missing/ambiguous values require manual entry. All extracted values stay editable and the vendor must explicitly confirm reviewing them. OCR is not proof of permit validity or location registration; staff/CDTFA verification remains necessary.

`npm run dev` now compiles `scripts/permit-ocr.swift` into ignored `.local/permit-ocr` before starting. Requires macOS and Swift command-line tools. `permit-ocr.mjs` exposes only a same-origin loopback POST endpoint, accepts supported MIME types and file signatures, caps input at 5 MB, limits extraction to one request at a time and terminates the reader after 30 seconds. Documents travel to this computer's local server only, via stdin to the OCR process, with no app disk storage or content logging. Browser File objects remain in the path's in-memory draft until replaced, seller area/status changes, or page reload; no browser persistent storage. Helper binaries, caches and synthetic fixtures are not committed.

This adapter is for local preview, not a portable production upload service. Production still needs authenticated storage, document retention/deletion rules, malware scanning, access control, rate limiting, server-side revalidation, and a supported OCR adapter for the hosting environment. File reading failures allow manual field completion with review; this does not mean the attached document has been validated. Final submission remains disabled.

Validation: Swift compilation, JavaScript syntax, formatting and 23 tests passed. Browser test with a synthetic image extracted `123456789-001` and the complete Rose Bowl address; review remained unchecked. No real vendor permit used. Real-world OCR accuracy has not been measured; unusual permit layouts may require manual entry.

### Permit upload button — October 30, 2026

Replaced the native Choose File control with a standard red button labeled “Upload CA Seller's Permit.” The button opens the same restricted file picker; missing-file validation focuses this keyboard-accessible button. Syntax and formatting checks passed.

### FAQ navigation — October 30, 2026

Added shared-header FAQs disclosure with Attendees and Vendors destinations. Opens with mouse hover or native keyboard/tap activation; Escape, outside click and focus leaving close it. Mobile submenu remains in normal layout. FAQ pages reuse previously confirmed schedule, location, ticket/parking information and owner-approved application workflow; no new policies inferred. Syntax and formatting checks passed.
