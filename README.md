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

`#vendors` and `#apply` open the aerial hero and New Vendor / Returning Vendor choices. New vendors start blank; returning vendors explicitly open a fictional sample profile for UX review. Both paths use the existing five-step flow with separate in-memory drafts. No real account, previous submission lookup or durable storage is connected.

Vendor applications now show live-form space choices, quantity (1–5) and a calculated estimate. New vendors provide no payment information. Returning vendors select an unselected-by-default payment preference (existing method or new method after acceptance). Both paths explain email/phone follow-up and confirmation only after payment.

New-vendor sequence: Seller / Business Contact → Space / Plot Request → Required Forms → Review & Submit. Returning vendors retain their five-step path and payment preference. The required-forms stage currently contains seller-status guidance; complete legacy certifications and secure uploads remain release blockers.
