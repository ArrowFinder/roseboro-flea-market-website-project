# Initial source review — October 30, 2026

Brand confirmed by owner: Rose Bowl Flea Market. Original requested repository slug remains unchanged pending a separate instruction.

Sources reviewed:

- https://www.rgcshows.com/rose-bowl/
- https://www.rgcshows.com/sell-at-the-rose-bowl-flea-market/
- https://www.rgcshows.com/rose-bowl-order/

Owner-supplied Eventbrite link is configured exactly, including affiliate parameter. Automated retrieval failed; availability and checkout have not been verified. Drive folder could not be read by the web tool. Google Drive access is pending. GitHub command-line access was subsequently verified as ArrowFinder and the private repository was created.

## Booking sequence established by current application

Request → staff documentation review and availability check → payment → reservation confirmation → emailed vendor tickets. A request guarantees no space. Staff review and payment must precede any confirmation language. Current application accepts payment arrangements, not a live card charge. Preserve its price-limited authorization and separate approval for changes when implementing production flow.

## Proposed next guided application structure (not implemented yet)

1. Event and space: next two eligible dates, one area/type, quantity, optional preferred numbers and conditional equivalent-space consent.
2. Merchandise and seller status: category filtered by area, actual items/activity; conditional permit, occasional-seller, services, exempt product, or Section 6015 details. Preserve all conditional certifications.
3. Contact and documentation: seller identity, contact, billing/mailing address with same-address option; private permit upload. No sensitive identity fields or uploads collected in current preview.
4. Payment arrangements: office-assisted payment or verified previously used card reference; no full card details. Confirm exact price and limited authorization.
5. Review, event-specific certification, signature, and request-only acknowledgment.
6. On real successful submission only: request receipt, next steps, 48-hour guidance, and explicit no-reservation-yet message.

The current five-step form implements event/area, selling details, contact, payment-process explanation, and review/edit. It remains an interaction prototype, not a replacement for the full conditional certifications and business requirements above.

## Conflicts and simplification opportunities

- Main page says move-in 4–6:30 a.m.; embedded rules say as early as 3 a.m. through 6 a.m. Resolve before publishing.
- Old generic occasional-seller language differs in precision from newer conditional application. Use current approved event-specific rules after owner review; do not infer eligibility.
- Main page references mail/phone/day-of tickets, while newer flow describes emailed vendor tickets after review/payment. Identify which paths remain supported.
- Main page broad vehicle restriction and detailed additional-space/trailer provisions need reconciliation.
- Separate shopper ticket sales from vendor requests and permanent-vendor auto-renewal. Do not present auto-renewal as a new space application.
- Show only area- and status-relevant questions; place price and policy review before signature; reuse entered contact data in review.

Full policy text, actual select options/pricing, uploads, signature controls, backend validation, and payment integrations remain to be audited and implemented. Source links are retained so no requirements are silently discarded.

## Visitor details and footer refresh — October 30, 2026

Source: https://www.rgcshows.com/rose-bowl/ (page and footer inspected in browser). Carried over both office blocks, market/social links and legal links. Social links point to `rgcshows` accounts and YouTube channel `UCJ8xKt-YaEA7eBlMc2fWCQw`. Legal text remains hosted on the current site.

Visitor routes use public address, general admission at 9 a.m., VIP 5–8:45 a.m., children under 12 free with adult, Gate C rideshare, free parking, preferred parking listed at $20 cash/card, accessible parking/restrooms and no wheelchair/stroller rentals. Prices and rules need pre-launch reconfirmation. Closing time remains explicitly unresolved. Footer event-day 3 a.m.–3 p.m. is office service time, not established market hours. Copyright year range preserved from source.

## Space price source — October 30, 2026

Primary: https://www.rgcshows.com/rose-bowl-order/ — inspected selectable space choices and quantity 1–5. Current form uses `data-rgc-surcharge-bps="0"`; its quote calculation adds no surcharge. Prototype estimates use space rate × quantity with no added fee. Reverify before launch; any higher amount/additional fee requires approval.

Cross-checks: https://www.rgcshows.com/rose-bowl-blue-area/, https://www.rgcshows.com/rose-bowl-orange-area/, https://www.rgcshows.com/rose-bowl-pearl-area/. Blue and Gold each offer $125/$150/$175/$250/$300/$500 options. Orange form offers middle corner $300, middle non-corner $250, north $125, south $180. Pearl form offers front corner $150, front non-corner $135, perimeter $150, premium $300, rear corner $125, rear non-corner $100.

Differences: Orange overview additionally lists exit/Arroyo $250 and services $500; these are not selectable in the live application, so are not introduced here. Pearl overview describes premium as $250–$300, but form offers $300; estimator follows the form. No inferred discounts or permanent-vendor rates. Returning status alone does not establish discount eligibility. Existing legal/payment authorization language remains subject to production review; the requested preference-only UX does not authorize charges.

## Map source

Owner directly supplied https://www.rgcshows.com/wp-content/uploads/rose-bowl-General-map-09-24-26.jpg for selection highlighting. Blue/Gold section relationships follow https://www.rgcshows.com/rose-bowl-blue-area/ pricing inspected October 30, 2026: Blue 700/500/300/1900/100 correspond to $125/$150/$175/$250/$300; Gold 800/600/400/2000/200 correspond to the same prices. Service/promotional options have no exact section specified. General map does not define Orange/Pearl individual plot boundaries; no such assignment is inferred.

Selling Details catalog copied from the merchandise object in the inspected https://www.rgcshows.com/rose-bowl-order/ form: 15 Blue/Gold categories, 11 Orange and 11 Pearl, including each Other / Not Listed choice. Occasional branch mirrors its personal-use, no-resale-inventory, exempt-sales and two-occasion confirmations plus rolling 12-month prior-sale questions. Permit address is 1001 Rose Bowl Drive, Pasadena, CA 91103. The live form permits pending/on-file/submitted location states; the owner explicitly requested valid-location details before progression, so this preview blocks pending location. Staff verification remains outstanding.
