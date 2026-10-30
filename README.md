# Roseboro Flea Market Website Project

Local-only first version. No publication, production domain changes, live payments, application delivery, or reservations.

## Development

Requires Node.js 20+. No dependencies or build step.

- `npm run dev` starts http://127.0.0.1:4173
- `npm run check` checks JavaScript syntax.
- Serve `dist/` as static files when a destination is approved.

Plain HTML/CSS/JavaScript keeps the brochure site lightweight and makes integrations replaceable. Hash routes work with basic static hosting. Google Fonts are optional external requests, with local font fallbacks. The temporary illustration is embedded SVG; replace it with approved photography and logo. All written marketing copy is proposed for review.

## Site structure

Home (shopper focused), Event Calendar, About Us, Vendors, Contact. Buy Tickets is always prominent and opens a clear unavailable notice until the existing Eventbrite URL is confirmed. No fake ticket URL is used. Set the verified URL in `dist/app.js` after owner confirmation.

Vendor preview: Contact → Selling details → Space & policies → Review. Provisional fields only; each required field validates before advancing, inline errors identify issues, Back and Edit preserve page-memory entries. Nothing is stored in browser storage or transmitted. Reload clears entries. Final submission is disabled; no success claim is shown. Before launching, implement approved server-side validation, secure delivery, approved policies and consent, retention controls, failure handling, and a truthful confirmation based on actual submission success.

## Repository

Requested private repository: `roseboro-flea-market-website-project`. GitHub connection and CLI were unavailable during initial setup. This local Git repository is prepared; no GitHub repository has been created. Connect GitHub and confirm the destination owner before creating the private remote. Never commit vendor records, credentials, or payment information; `.gitignore` excludes typical secret files but does not replace review.

See docs/DECISIONS.md for pending information and review checks.
