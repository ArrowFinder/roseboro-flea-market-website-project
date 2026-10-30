# Project working agreement

Build a maintainable, local-only replacement for Rose Bowl Flea Market. The private GitHub repository is source control, not permission to publish a website. Do not change the existing site, domains, or activate live payments/submissions without explicit instruction.

## Every meaningful change

- Keep code readable using `npm run format`; explain non-obvious business and security decisions with concise comments.
- Update README if setup or implemented behavior changes. Update docs/HANDOFF.md and docs/QA.md for changed limitations, integrations, or verification.
- Keep confirmed facts and unresolved conflicts in docs/DECISIONS.md and docs/SOURCE-REVIEW.md. Do not silently convert assumptions into business rules.
- Run syntax checks, relevant tests, and formatting checks. Document checks actually run and any gaps; never describe an automated dependency check as a comprehensive security audit.
- Keep vendor values out of browser storage, logs, source control, and telemetry. Use synthetic data for tests. Owner-authorized permit files may be read by the loopback-only OCR service in memory; never persist them or send them to external services. Do not collect other identity documents or payment credentials in the prototype.
- Insert user-entered review values through `textContent`, not HTML templates.
- Preserve all required legacy business rules before enabling production submission; partial prototypes must clearly state what is incomplete.

## Design

Shopper-first homepage. Navigation order: Event Calendar, About Us, Vendors, Contact, Buy Tickets. Tickets link to the owner-supplied Eventbrite listing. Vendor Application is the primary vendor subpage. Photography/logo must be approved assets; temporary imagery is labeled.

## Approved palette

Locked by the owner on October 30, 2026: primary red `#BF2C25`, secondary black `#111111`, yellow accents `#F9D827`, and white base `#FFFFFF`. Preserve these exact colors and their hierarchy unless the owner requests a change. Neutral gray borders/panels and documented interaction shades may support this palette. See docs/DESIGN.md.
