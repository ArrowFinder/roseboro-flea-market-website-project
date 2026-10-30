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
- Vendor Application, Space Options, Requirements, Policies & FAQs subtabs.
- Vendor flow: event/area → seller details → contact → payment process → review/edit.
- Required-field validation and contextual guidance; entries remain only in page memory.
- Ticket buttons use the exact owner-supplied November 8, 2026 Eventbrite URL.

## Prototype boundaries

No live vendor submission, document upload, reservation, payment, or email delivery. Final submission is disabled. Event/area choices do not indicate availability. Complete seller certification and verified space pricing are pending. Use sample information only. Temporary illustration and proposed copy are labeled. No website has been deployed and the existing website is untouched.

## Handoff documents

- [Engineering handoff](docs/HANDOFF.md): architecture, responsibilities, integration boundaries and release blockers.
- [Source review](docs/SOURCE-REVIEW.md): existing business process, source links and conflicts.
- [Decisions](docs/DECISIONS.md): confirmed facts and missing information.
- [QA record](docs/QA.md): checks performed and remaining verification.
- [Working agreement](AGENTS.md): maintenance and documentation expectations.

Keep these documents current with each meaningful implementation change. Never commit credentials, real vendor data or payment information. `.gitignore` excludes common sensitive files; review staged changes before pushing.
