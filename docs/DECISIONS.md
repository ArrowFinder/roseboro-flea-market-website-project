> Current returning-vendor requirement (October 30, 2026): no login, saved profile, or prefilled vendor information. Both paths start blank and use identical fields; returning adds only Payment Preference. This supersedes earlier profile-related notes below.

# Decisions and outstanding information

Updated October 30, 2026.

## Established

- Owner approved and locked the palette on October 30, 2026: primary red #BF2C25, secondary black #111111, yellow accents #F9D827, white base #FFFFFF.

- Owner confirmed second-Sunday monthly recurrence; countdown labels its 9 a.m. Pacific general-admission target.
- Owner confirmed visible brand: **Rose Bowl Flea Market**.
- Original requested repository slug retained: `roseboro-flea-market-website-project`; private under verified account ArrowFinder.
- Owner supplied current site, November 8, 2026 Eventbrite link and Google Drive asset folder. See SOURCE-REVIEW.md for source links.
- Shopper-first homepage; vendor details and application stay in Vendors with subnavigation.
- Current application establishes staff review and availability check → payment → confirmed reservation → emailed tickets. Request alone reserves nothing.
- Local prototype only; publication and production integrations are not authorized.

## Still needed

- Any required photographer credit. Nine photos were supplied in chat; five resized derivatives are tracked (four displayed, one palette reference). Official raster logo is supplied and used in the header; optional vector artwork remains useful.
- Actual space inventory, dates, sizes, quantities, pricing, preferred-space behavior and administrative source of truth.
- Resolution of conflicting move-in and vehicle/trailer instructions and legacy mail-versus-email delivery information.
- Full conditional seller requirements and certification mapped to the new form and reviewed by the business owner.
- Submission/admin integration, privacy/retention requirements, notifications, payment arrangement and confirmation failure handling.
- Remaining shopper content and Eventbrite availability verification. Known event date must not remain the primary ticket destination indefinitely.
- Replacement domain and hosting plan after the local design is approved.

Refer to HANDOFF.md for engineering release blockers and QA.md for checks completed.

## October 30 homepage refinement

Owner requested the hero caption, product-story gallery and vendor prompt be removed; market event section moves directly below countdown with attached clickable visitor details. Footer should match the existing live site. Approved palette remains unchanged. Public office hours in footer are not market opening/closing hours.

## Vendor entry split

Owner requested a hero and New Vendor / Returning Vendor paths with reusable previous information for returning vendors. Interpreted “entirely black” as “entirely blank” in context and stated that assumption to the owner. New drafts start empty; returning preview uses explicitly labeled fictional information. Durable profile storage and authentication remain production work, not implemented by this UX iteration.

## Payment-path rules confirmed by owner

New vendors apply without payment information, see an estimated total based on space choice, and are contacted by email or phone after acceptance to finalize the space and collect payment. Returning vendors choose existing payment method on file or a new method upon acceptance. Neither path collects credentials or charges during application. Preference is not a charge authorization.

Owner directed use of existing website pricing. Live application rates and quantity options retrieved October 30, 2026 now replace the unpriced area-only prototype. Availability and price changes remain subject to staff confirmation.

Owner specified a factual business form without introductions: contact first, then space/plot, then required forms, then submit. Implemented a four-step new-vendor sequence and removed its subnavigation and marketing introduction. Submission remains disabled until the existing documented production requirements are completed.

Owner requested Selling Details as new step 3, moving merchandise description off Required Forms. Required Forms becomes step 4. Owner-directed policy: Blue/Gold must provide valid CA permit details with the Rose Bowl location before progressing; Orange/Pearl may use permit details or occasional verification. This supersedes the prior prototype’s broader status list and allowance for pending location answers. Special services/exemption exceptions need office handling rather than an unsupported application path.

### Seller certification — October 30, 2026

Both paths now end with required signer full name, position/title, and two unchecked certifications using the owner's supplied wording. New vendors see an explicit note that no payment instructions are selected. Consent is cleared when leaving review to edit earlier answers; signer details remain in tab memory. Checkbox validation accepts only explicit boolean consent. Submission stays disabled; no signature is transmitted, stored persistently, or legally validated. Production must validate the complete application server-side and record the event, final answers, certification version, signer and consent evidence together.

### Local permit upload and extraction — October 30, 2026

Owner authorized permit upload with automatic field filling. Both paths now require a PDF/JPG/PNG (5 MB maximum, PDFs up to 5 pages) when permit-holder is selected. A local macOS Vision/PDFKit adapter reads the document; conservative parsing fills a labeled permit/account number and selects the venue-address option only when the complete address is found together. Missing/ambiguous values require manual entry. All extracted values stay editable and the vendor must explicitly confirm reviewing them. OCR is not proof of permit validity or location registration; staff/CDTFA verification remains necessary.

`npm run dev` now compiles `scripts/permit-ocr.swift` into ignored `.local/permit-ocr` before starting. Requires macOS and Swift command-line tools. `permit-ocr.mjs` exposes only a same-origin loopback POST endpoint, accepts supported MIME types and file signatures, caps input at 5 MB, limits extraction to one request at a time and terminates the reader after 30 seconds. Documents travel to this computer's local server only, via stdin to the OCR process, with no app disk storage or content logging. Browser File objects remain in the path's in-memory draft until replaced, seller area/status changes, or page reload; no browser persistent storage. Helper binaries, caches and synthetic fixtures are not committed.

This adapter is for local preview, not a portable production upload service. Production still needs authenticated storage, document retention/deletion rules, malware scanning, access control, rate limiting, server-side revalidation, and a supported OCR adapter for the hosting environment. File reading failures allow manual field completion with review; this does not mean the attached document has been validated. Final submission remains disabled.

Validation: Swift compilation, JavaScript syntax, formatting and 23 tests passed. Browser test with a synthetic image extracted `123456789-001` and the complete Rose Bowl address; review remained unchecked. No real vendor permit used. Real-world OCR accuracy has not been measured; unusual permit layouts may require manual entry.

### Returning-vendor simplification — October 30, 2026

Removed the profile gateway, sample identity and prefilled values. Returning Vendor now opens the blank contact step directly; the old #returning-vendor link is an alias for the same form. Both paths retain their separate in-memory in-progress drafts. Payment Preference is the only extra step. Vendor FAQ copy updated. Automatic permit extraction remains user-initiated in both paths. Syntax, formatting and all 24 tests passed, including field parity between the two paths.
