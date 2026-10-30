# Rose Bowl Flea Market Website Project

Local-only first version. No publication, production domain changes, live payments, application delivery, or reservations.

## Development

Requires Node.js 20+. No dependencies or build step.

- `npm run dev` starts http://127.0.0.1:4173
- `npm run check` checks JavaScript syntax.
- Serve `dist/` as static files when a destination is approved.

Plain HTML/CSS/JavaScript keeps the brochure site lightweight and makes integrations replaceable. Hash routes work with basic static hosting. Google Fonts are optional external requests, with local font fallbacks. The temporary illustration is embedded SVG; replace it with approved photography and logo. All written marketing copy is proposed for review.

## Site structure

Home (shopper focused), Event Calendar, About Us, Vendors, Contact. Buy Tickets is always prominent and uses the owner-supplied Eventbrite listing for November 8, 2026. Ticket availability and checkout have not been verified. Update the URL in `dist/app.js` for later events.

Vendor preview: Contact → Selling details → Space & policies → Review. Provisional fields only; each required field validates before advancing, inline errors identify issues, Back and Edit preserve page-memory entries. Nothing is stored in browser storage or transmitted. Reload clears entries. Final submission is disabled; no success claim is shown. Before launching, implement approved server-side validation, secure delivery, approved policies and consent, retention controls, failure handling, and a truthful confirmation based on actual submission success.

## Repository

Requested private repository: `roseboro-flea-market-website-project`. GitHub connection and CLI were unavailable during initial setup. This local Git repository is prepared; no GitHub repository has been created. Connect GitHub and confirm the destination owner before creating the private remote. Never commit vendor records, credentials, or payment information; `.gitignore` excludes typical secret files but does not replace review.

See docs/DECISIONS.md for pending information and review checks.

## Source review update

Brand is now confirmed as Rose Bowl Flea Market. Ticket buttons use the exact owner-supplied November 8, 2026 Eventbrite URL; ticket availability has not been verified. Vendors now has Application, Space Options, Requirements, and Policies & FAQs subnavigation. See docs/SOURCE-REVIEW.md for the actual booking sequence, source conflicts, and the proposed complete flow. 

## Verification completed

JavaScript syntax checks passed. Browser review confirmed desktop and tablet rendering, vendor subnavigation, empty required-field errors and progression with valid contact details. Full phone/device checks, all conditional application rules, back/edit persistence, and external Eventbrite checkout remain to be verified. Preview server was stopped after review; reopen `dist/index.html` directly or run `npm run dev`.
