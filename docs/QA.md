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
