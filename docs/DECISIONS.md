# Decisions and outstanding information

Updated October 30, 2026.

## Established

- Owner approved and locked the palette on October 30, 2026: primary red #BF2C25, secondary black #111111, yellow accents #F9D827, white base #FFFFFF.

- Owner confirmed second-Sunday monthly recurrence; countdown labels its 9 a.m. Pacific general-admission target.
- Owner confirmed visible brand: **Rose Bowl Flea Market**.
- Original requested repository slug retained: `roseboro-flea-market-website-project`; private under verified account ArrowFinder.
- Owner supplied current site, November 8, 2026 Eventbrite link and Google Drive asset folder. See SOURCE-REVIEW.md for source links.
- Shopper-first homepage; vendor details and application stay in Vendors with subnavigation.
- Current application establishes staff review and availability check → payment → confirmed reservation → emailed tickets. Request alone reserves nothing.
- Local prototype only; publication and production integrations are not authorized.

## Still needed

- Any required photographer credit. Nine photos were supplied in chat; five resized derivatives are tracked (four displayed, one palette reference). Official raster logo is supplied and used in the header; optional vector artwork remains useful.
- Actual space inventory, dates, sizes, quantities, pricing, preferred-space behavior and administrative source of truth.
- Resolution of conflicting move-in and vehicle/trailer instructions and legacy mail-versus-email delivery information.
- Full conditional seller requirements and certification mapped to the new form and reviewed by the business owner.
- Submission/admin integration, privacy/retention requirements, notifications, payment arrangement and confirmation failure handling.
- Remaining shopper content and Eventbrite availability verification. Known event date must not remain the primary ticket destination indefinitely.
- Replacement domain and hosting plan after the local design is approved.

Refer to HANDOFF.md for engineering release blockers and QA.md for checks completed.

## October 30 homepage refinement

Owner requested the hero caption, product-story gallery and vendor prompt be removed; market event section moves directly below countdown with attached clickable visitor details. Footer should match the existing live site. Approved palette remains unchanged. Public office hours in footer are not market opening/closing hours.

## Vendor entry split

Owner requested a hero and New Vendor / Returning Vendor paths with reusable previous information for returning vendors. Interpreted “entirely black” as “entirely blank” in context and stated that assumption to the owner. New drafts start empty; returning preview uses explicitly labeled fictional information. Durable profile storage and authentication remain production work, not implemented by this UX iteration.

## Payment-path rules confirmed by owner

New vendors apply without payment information, see an estimated total based on space choice, and are contacted by email or phone after acceptance to finalize the space and collect payment. Returning vendors choose existing payment method on file or a new method upon acceptance. Neither path collects credentials or charges during application. Preference is not a charge authorization.

Owner directed use of existing website pricing. Live application rates and quantity options retrieved October 30, 2026 now replace the unpriced area-only prototype. Availability and price changes remain subject to staff confirmation.

Owner specified a factual business form without introductions: contact first, then space/plot, then required forms, then submit. Implemented a four-step new-vendor sequence and removed its subnavigation and marketing introduction. Submission remains disabled until the existing documented production requirements are completed.
