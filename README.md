> Public preview authorized October 30, 2026: GitHub source and a GitHub Pages design preview may be public. This supersedes earlier local-only/private-repository notes. Live vendor submissions, payments and business-domain changes remain out of scope. See docs/AUDIT.md for checks and limitations.

# Rose Bowl Flea Market Website Project

A shopper-focused website and guided vendor application **prototype**. Private repository: [ArrowFinder/roseboro-flea-market-website-project](https://github.com/ArrowFinder/roseboro-flea-market-website-project).

## Local setup

Requires Node.js 20 or later.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4173. The server binds to loopback only. `dist/` contains editable static source; there is no build step. The site also opens directly from `dist/index.html`.

```sh
npm run check          # JavaScript syntax
npm test               # Validation regressions
npm run format:check   # Formatting consistency
npm run format         # Apply formatting
```

No runtime dependencies. Prettier is a pinned development dependency. Google Fonts has system fallbacks.

## Current experience

- Home, Event Calendar, About Us, Vendors and Contact.
- Connected market-date and visitor-detail cards, with Location, Hours, Admission and Parking routes.
- Live-site footer content, office details, social and legal links.
- Vendor Application, Space Options, Requirements, Policies & FAQs subtabs.
- Vendor flow: event/area → seller details → contact → payment process → review/edit.
- Required-field validation and contextual guidance; entries remain only in page memory.
- Photo-led homepage with signage-inspired primary red, secondary black, yellow accents and crisp white palette.
- Live countdown to 9 a.m. Pacific on the next second Sunday, with daylight-saving and month rollover handling.
- Ticket buttons use the exact owner-supplied November 8, 2026 Eventbrite URL, with a guard against linking future markets to that expired event.

## Prototype boundaries

No live vendor submission, document upload, reservation, payment, or email delivery. Final submission is disabled. Event/area choices do not indicate availability. Complete seller certification and verified space pricing are pending. Use sample information only. Owner-supplied photography now replaces the temporary illustration; marketing copy remains proposed. No website has been deployed and the existing website is untouched.

## Handoff documents

- [Design and asset register](docs/DESIGN.md): palette, photograph provenance and countdown behavior.
- [Engineering handoff](docs/HANDOFF.md): architecture, responsibilities, integration boundaries and release blockers.
- [Source review](docs/SOURCE-REVIEW.md): existing business process, source links and conflicts.
- [Decisions](docs/DECISIONS.md): confirmed facts and missing information.
- [QA record](docs/QA.md): checks performed and remaining verification.
- [Working agreement](AGENTS.md): maintenance and documentation expectations.

Keep these documents current with each meaningful implementation change. Never commit credentials, real vendor data or payment information. `.gitignore` excludes common sensitive files; review staged changes before pushing.

## Vendor entry paths

`#vendors` and `#apply` open the aerial hero and New Vendor / Returning Vendor choices. Both paths start blank with separate in-memory drafts and no sign-in or profile retrieval. New vendors have five steps; returning vendors have the same steps plus Payment Preference before Review & Submit.

Vendor applications now show live-form space choices, quantity (1–5) and a calculated estimate. New vendors provide no payment information. Returning vendors select an unselected-by-default payment preference (existing method or new method after acceptance). Both paths explain email/phone follow-up and confirmation only after payment.

New-vendor sequence: Seller / Business Contact → Space / Plot Request → Required Forms → Review & Submit. Returning vendors retain their five-step path and payment preference. The required-forms stage currently contains seller-status guidance; complete legacy certifications and secure uploads remain release blockers.

Space Request now pairs the form with a selection-linked map. Blue/Gold options highlight numbered sections; Orange/Pearl highlight their general area. A full-size image link is available.

New-vendor sequence is now Contact → Space / Plot Request → Selling Details → Required Forms → Review & Submit. Merchandise options follow the live site’s area-specific lists. Required Forms offers permit details for Blue/Gold and permit or occasional-seller verification for Orange/Pearl. Use sample permit details only in this local preview.

### Seller certification — October 30, 2026

Both paths now end with required signer full name, position/title, and two unchecked certifications using the owner's supplied wording. New vendors see an explicit note that no payment instructions are selected. Consent is cleared when leaving review to edit earlier answers; signer details remain in tab memory. Checkbox validation accepts only explicit boolean consent. Submission stays disabled; no signature is transmitted, stored persistently, or legally validated. Production must validate the complete application server-side and record the event, final answers, certification version, signer and consent evidence together.

### Returning-vendor sequence — October 30, 2026

Returning vendors now follow Seller / Business Contact → Space / Plot Request → Selling Details → Permit Verification → Payment Preference → Review & Submit. The same editable fields and validation are used for both paths; both paths start blank. Each section must be completed. No login or saved-profile retrieval is planned; event choices, payment preference and signature consent are never preselected from an earlier event. Syntax, formatting and all 19 tests passed.

### Local permit upload and extraction — October 30, 2026

Owner authorized permit upload with automatic field filling. Both paths now require a PDF/JPG/PNG (5 MB maximum, PDFs up to 5 pages) when permit-holder is selected. A local macOS Vision/PDFKit adapter reads the document; conservative parsing fills a labeled permit/account number and selects the venue-address option only when the complete address is found together. Missing/ambiguous values require manual entry. All extracted values stay editable and the vendor must explicitly confirm reviewing them. OCR is not proof of permit validity or location registration; staff/CDTFA verification remains necessary.

`npm run dev` now compiles `scripts/permit-ocr.swift` into ignored `.local/permit-ocr` before starting. Requires macOS and Swift command-line tools. `permit-ocr.mjs` exposes only a same-origin loopback POST endpoint, accepts supported MIME types and file signatures, caps input at 5 MB, limits extraction to one request at a time and terminates the reader after 30 seconds. Documents travel to this computer's local server only, via stdin to the OCR process, with no app disk storage or content logging. Browser File objects remain in the path's in-memory draft until replaced, seller area/status changes, or page reload; no browser persistent storage. Helper binaries, caches and synthetic fixtures are not committed.

This adapter is for local preview, not a portable production upload service. Production still needs authenticated storage, document retention/deletion rules, malware scanning, access control, rate limiting, server-side revalidation, and a supported OCR adapter for the hosting environment. File reading failures allow manual field completion with review; this does not mean the attached document has been validated. Final submission remains disabled.

Validation: Swift compilation, JavaScript syntax, formatting and 23 tests passed. Browser test with a synthetic image extracted `123456789-001` and the complete Rose Bowl address; review remained unchecked. No real vendor permit used. Real-world OCR accuracy has not been measured; unusual permit layouts may require manual entry.

The shared FAQs header menu links to separate attendee and vendor FAQ pages. It supports mouse hover and native keyboard/tap disclosure.

### Submission confirmation preview — October 30, 2026

Both application paths now offer Submit application (preview) on final review. All required sections and certification fields are revalidated before opening a native modal receipt. The modal says Application submitted and explains that the team will contact the applicant shortly using the provided contact information. A prominent preview-only notice states that no application has been sent. Close window (or Escape) dismisses the modal and restores the form; this closes the confirmation window rather than the browser tab. No network submission, office notification, payment or persisted signature is performed. This supersedes earlier notes that the final button is disabled. Production must show the receipt only after successful durable backend submission, and handle errors/retries without duplicate applications.
