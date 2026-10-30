# Initial source review — October 30, 2026

Brand confirmed by owner: Rose Bowl Flea Market. Original requested repository slug remains unchanged pending a separate instruction.

Sources reviewed:
- https://www.rgcshows.com/rose-bowl/
- https://www.rgcshows.com/sell-at-the-rose-bowl-flea-market/
- https://www.rgcshows.com/rose-bowl-order/

Owner-supplied Eventbrite link is configured exactly, including affiliate parameter. Automated retrieval failed; availability and checkout have not been verified. Drive folder could not be read by the web tool. Google Drive and GitHub plugin connections have been suggested.

## Booking sequence established by current application

Request → staff documentation review and availability check → payment → reservation confirmation → emailed vendor tickets. A request guarantees no space. Staff review and payment must precede any confirmation language. Current application accepts payment arrangements, not a live card charge. Preserve its price-limited authorization and separate approval for changes when implementing production flow.

## Proposed next guided application structure (not implemented yet)

1. Event and space: next two eligible dates, one area/type, quantity, optional preferred numbers and conditional equivalent-space consent.
2. Merchandise and seller status: category filtered by area, actual items/activity; conditional permit, occasional-seller, services, exempt product, or Section 6015 details. Preserve all conditional certifications.
3. Contact and documentation: seller identity, contact, billing/mailing address with same-address option; private permit upload. No sensitive identity fields or uploads collected in current preview.
4. Payment arrangements: office-assisted payment or verified previously used card reference; no full card details. Confirm exact price and limited authorization.
5. Review, event-specific certification, signature, and request-only acknowledgment.
6. On real successful submission only: request receipt, next steps, 48-hour guidance, and explicit no-reservation-yet message.

The current four-step form remains a provisional interaction demo, not a replacement for this complete set of business requirements.

## Conflicts and simplification opportunities

- Main page says move-in 4–6:30 a.m.; embedded rules say as early as 3 a.m. through 6 a.m. Resolve before publishing.
- Old generic occasional-seller language differs in precision from newer conditional application. Use current approved event-specific rules after owner review; do not infer eligibility.
- Main page references mail/phone/day-of tickets, while newer flow describes emailed vendor tickets after review/payment. Identify which paths remain supported.
- Main page broad vehicle restriction and detailed additional-space/trailer provisions need reconciliation.
- Separate shopper ticket sales from vendor requests and permanent-vendor auto-renewal. Do not present auto-renewal as a new space application.
- Show only area- and status-relevant questions; place price and policy review before signature; reuse entered contact data in review.

Full policy text, actual select options/pricing, uploads, signature controls, backend validation, and payment integrations remain to be audited and implemented. Source links are retained so no requirements are silently discarded.
