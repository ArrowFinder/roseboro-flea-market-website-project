# Project working agreement

Build a maintainable, local-only replacement for Rose Bowl Flea Market. The private GitHub repository is source control, not permission to publish a website. Do not change the existing site, domains, or activate live payments/submissions without explicit instruction.

## Every meaningful change

- Keep code readable using `npm run format`; explain non-obvious business and security decisions with concise comments.
- Update README if setup or implemented behavior changes. Update docs/HANDOFF.md and docs/QA.md for changed limitations, integrations, or verification.
- Keep confirmed facts and unresolved conflicts in docs/DECISIONS.md and docs/SOURCE-REVIEW.md. Do not silently convert assumptions into business rules.
- Run syntax checks, relevant tests, and formatting checks. Document checks actually run and any gaps; never describe an automated dependency check as a comprehensive security audit.
- Keep vendor values out of browser storage, logs, source control, and telemetry. Use synthetic data for tests. Do not collect documents, identity numbers, or payment credentials in the prototype.
- Insert user-entered review values through `textContent`, not HTML templates.
- Preserve all required legacy business rules before enabling production submission; partial prototypes must clearly state what is incomplete.

## Design

Shopper-first homepage. Navigation order: Event Calendar, About Us, Vendors, Contact, Buy Tickets. Tickets link to the owner-supplied Eventbrite listing. Vendor Application is the primary vendor subpage. Photography/logo must be approved assets; temporary imagery is labeled.
