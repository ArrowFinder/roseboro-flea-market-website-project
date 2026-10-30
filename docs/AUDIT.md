# Public preview audit — October 30, 2026

Scope: focused source, repository-history, dependency and deployment-readiness review. This is not a penetration test, legal review or full accessibility certification.

## Checks completed

- JavaScript syntax and Prettier formatting checks passed.
- All 25 automated tests passed: date calculation/DST, vendor field validation, identical blank new/returning fields, payment preference, certification, map selection, OCR extraction and local-endpoint input/origin guards.
- npm audit reported zero known dependency vulnerabilities (one development dependency; no runtime npm packages).
- Scanned 210 non-image historical Git blobs for common private-key, GitHub token, AWS key and API-key patterns: no matches. Pattern scanning cannot prove absence of all secrets or personal information.
- Tracked files reviewed: source, owner-provided/approved public-facing images, tests and handoff notes. No permit uploads, environment files or generated OCR binaries are tracked.
- User-entered review fields use textContent; form state is in memory, not localStorage/sessionStorage. No live application, payment or email submission is implemented.

## Fixed before publication

The permit reader was wired to a local-only POST endpoint. On a static public host this could send document bytes to an unavailable path. Added an exact-origin gate so only http://127.0.0.1:4173 may call OCR. On the public preview, selected files remain in browser memory; users manually complete sample permit fields. Help text states this limitation. Regression coverage added.

Added noindex/nofollow metadata for the design preview (not an access restriction). GitHub Actions validates source before publishing only dist/; server code and documents are not in the deployed website artifact. The repository itself is public by owner request.

## Remaining production work

- Real application receipt, durable storage, office notification, payment processing and permit verification are not connected. Confirmation is explicitly a simulation.
- OCR adapter requires a local Mac. Public preview supports manual entry only. Real permit layouts/PDF accuracy and production document security require further validation.
- Contact page still contains placeholders; future event ticket listings and vendor availability are not connected. Ticket links can lead to the real supplied Eventbrite listing.
- Complete mobile, keyboard, screen-reader and contrast audit before launch; this review does not certify WCAG compliance.
- Confirm complete legacy field/legal/policy coverage and final business content before accepting applications.

## Publication

Owner explicitly requested public GitHub source and a shareable preview. GitHub Pages workflow publishes dist/ after checks on main pushes. This is separate from the existing live RGC Shows site and changes no business domain.
