# Verification record

Date: October 30, 2026. Scope: static prototype and five-step vendor flow. Tests use synthetic vendor information only.

## Checks completed

| Check                | Evidence / result                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| Syntax               | `npm run check`: all JavaScript entry points parse                                                     |
| Automated validation | `npm test`: six cases cover required/optional, email, phone, allowed choices and length limits         |
| Formatting           | `npm run format:check`: tracked source and documentation formatted consistently                        |
| Dependency audit     | npm install reported zero known vulnerabilities for the two-package tree; this is not a security audit |
| Repository           | GitHub metadata confirms private visibility under ArrowFinder                                          |
| Step gating          | Browser: empty event/area prevented Continue, showed two inline errors, focused first field            |
| Area compatibility   | Browser: Stadium + occasional seller blocked with an explanatory error                                 |
| Back navigation      | Browser: selected event/area and merchandise/status retained                                           |
| Contact validation   | Browser: invalid email blocked Continue and focused the email field                                    |
| Review               | Browser: all entered sample fields displayed, optional blank identified, submission disabled           |
| Edit section         | Browser: Edit contact returned to populated fields                                                     |
| Layout               | Desktop browser inspected; initial scaffold also inspected at tablet width                             |

## Source-level review

- Form values stay in module memory; no local/session storage, vendor network submission, document upload, or payment endpoint.
- User review values inserted with `textContent`; static route strings are developer-authored.
- Status changes clear inactive permit-location answers. Area/status incompatibility is checked on progression.
- Credentials and vendor data are not part of the tracked file list. Common secret file patterns are ignored.
- Static local server binds to 127.0.0.1 and limits file resolution to dist. It is a development convenience, not hardened production hosting.
- Skip link focuses the main region without changing the current route.

## Remaining verification

- Full phone/tablet landscape checks, keyboard-only journey, screen-reader review, contrast measurements, zoom/reflow, and cross-browser testing.
- Live Eventbrite availability and date rollover; no purchase attempted.
- All real seller eligibility branches, uploaded-document handling, price calculations, and conditional certifications once implemented.
- Backend authorization, storage, retention, consent/signatures, duplicate requests, error recovery, notification delivery and payment outcomes.
- Independent human code/security review before production release.

No production-readiness claim is made. Keep this record aligned with actual tests; do not mark an item verified because code appears to implement it.

## Photo and countdown update

- 12 automated tests now pass (six vendor, six calendar). Calendar cases cover 120 monthly dates, October→November, both daylight-saving offsets, exact opening, local midnight and year rollover.
- Browser verified loaded hero/gallery assets and a ticking countdown targeting November 8, 2026. Desktop composition inspected.
- 390px iframe viewport used to inspect phone layout and exercise expanding navigation; this is a browser viewport check, not a physical-device or full cross-browser audit.
- Core palette contrast ratios recorded in DESIGN.md; font sizes, assistive-technology behavior and other component pairs still require a complete audit.
- Image derivatives total approximately 1.4 MB; hero loads eagerly and gallery images lazily. Originals are untouched.
- Local preview kept running at the owner's explicit request.

## Palette refinement

Owner requested primary red, secondary black, yellow accents and crisp white. Updated all shared surfaces and controls, including secondary-button text for contrast. Calculated solid-pair ratios are recorded in DESIGN.md. This is a styling-only change; existing behavior tests remain unchanged.

## Official header logo

Replaced the provisional top-left wordmark with the owner-supplied logo. Resized derivative preserves aspect ratio and original colors; alt text and home-link label are explicit. Shared responsive sizing covers desktop and mobile.

## Homepage simplification and footer

- Syntax checks and all 12 existing calendar/vendor tests pass after routing changes.
- Browser clicked all four visitor cards and confirmed correct route, heading and detail content; return-to-market link works.
- Desktop homepage inspected: hero caption, gallery and vendor prompt absent; event row and visitor cards joined directly below countdown. Footer logo loads and both office columns render.
- 390px iframe viewport inspected: visitor cards form two columns; footer stacks cleanly. This is not a physical-device test.
- Footer destinations copied from the inspected live-site links; no phone call, social action or purchase performed.
- This update does not establish market closing time or replace the outstanding full accessibility and cross-browser audit.

## Vendor path update

- Syntax checks and 13 tests pass, including path isolation, empty new draft, sample returning profile, absent event/area defaults and copy isolation.
- Browser verified new-vendor empty event/area and selling fields; returning-vendor gateway and sample selling/contact prefills; edited sample first name persisted through Back/Continue.
- No real data submitted or saved. Actual authentication, durable profile retrieval and cross-account authorization still require implementation and testing.

Vendor entry visually checked on desktop and in a 390px iframe viewport; hero loads and both path buttons stack on phones. No physical-device or complete accessibility audit was performed.

## Payment-path and space estimate update

15 automated tests pass, with new checks for returning-only required preference, missing/invalid preferences, valid option values, estimate multiplication, invalid quantities, and cross-area choices. Browser verified Orange North End × 2 = $250; returning preference blocks Continue when empty and displays selected new-method choice on review. Neither path contains payment credential controls. Formatting and syntax checks pass. No application, charge, or contact message sent.

New-vendor browser journey also verified through step 4 using synthetic contact data: Pearl rear non-corner × 1 = $100, with zero payment preference/credential fields. Returning preference persisted when reopening its Edit section.

Vendor landing simplification: removed the four underlined links from the shared #vendors/#apply template. Syntax and formatting checks run; no form logic changed.

Browser verified the vendor landing main content contains only the two path links beneath the hero; screenshot inspected.

Contact-first flow: all 16 tests and syntax checks pass. Browser completed all four new-vendor stages with synthetic entries, verified $100 Pearl estimate in review, then reopened contact Edit and verified retained name. No new-vendor subnavigation or marketing introduction. Submission remains disabled. Returning section mapping and payment preference covered by regression tests.

## Interactive space map

17 tests pass, including numbered section selection, area-only fallback, service-side fallback and empty selection. Syntax/format checks pass. Browser inspected map beside form and verified Blue 700 → Gold 800 → Orange transitions, with space reset on area change and selected labels matching the form. Full-size link supplied. Mobile stacking is implemented via CSS; physical-device and full accessibility testing remain pending.

Map refinement: syntax, formatting and existing regression suite checked after removing the Space Request estimate panel and its DOM update. Map title simplified and selected outline/fill strengthened.

Browser confirmed revised map heading, stronger Gold 800 highlight, absent Space Request estimate panel, and working space/quantity selection after panel removal. All 17 regression tests pass.

Field focus styling: syntax and formatting checked. Pointer-selected fields no longer use a red outline; keyboard navigation retains a neutral outline.

Browser verified click focus has no added ring, Tab switches to keyboard focus styling, and a subsequent pointer click removes that styling. Screenshot inspected.

Selling Details/Required Forms update: syntax, formatting and 18 tests pass. Browser verified Blue/Gold category list and permit-only documentation option; missing permit details blocked Continue, pending address blocked Continue, sample number + address confirmation reached review. Switching to Orange cleared category/status and showed Orange categories; occasional verification missing answers blocked Continue. Unit checks cover Pearl categories, permitted status options, permit-number checks and occasional eligibility answers. No real documents, permit number or application sent. Full production verification remains pending.

Permit Verification rename: syntax, formatting and regression checks run; source heading and progress/review label use the shared title. Orange/Pearl guidance now explicitly lists permit-with-address or qualifying occasional-sales verification.

Browser verified step 4 Permit Verification, both Orange documentation options, and area-specific guidance. All 18 tests pass.

### Seller certification — October 30, 2026

Both paths now end with required signer full name, position/title, and two unchecked certifications using the owner's supplied wording. New vendors see an explicit note that no payment instructions are selected. Consent is cleared when leaving review to edit earlier answers; signer details remain in tab memory. Checkbox validation accepts only explicit boolean consent. Submission stays disabled; no signature is transmitted, stored persistently, or legally validated. Production must validate the complete application server-side and record the event, final answers, certification version, signer and consent evidence together.

Validation for this change: syntax and formatting checks passed; all 19 automated tests passed. Browser walkthrough confirmed the new-vendor final review shows both signer fields and unchecked certifications immediately above the disabled submission control. Tested using synthetic information only.

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

Browser verification also confirmed unchecked review blocks progression, confirmation allows progression, Back retains the attachment, and editing the permit number clears confirmation. Endpoint tests cover cross-origin, unsupported type, invalid file signature and oversized body rejection. PDF extraction is implemented but has not yet been exercised with representative permit PDFs.

### Permit upload button — October 30, 2026

Replaced the native Choose File control with a standard red button labeled “Upload CA Seller's Permit.” The button opens the same restricted file picker; missing-file validation focuses this keyboard-accessible button. Syntax and formatting checks passed.
