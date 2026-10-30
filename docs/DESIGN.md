# Visual direction and asset register

Updated October 30, 2026. Owner supplied nine photographs in chat and requested a palette drawn from them. These are visually selected, web-ready approximations of the photographed colors, not certified original logo ink values. The actual vector logo/brand standards remain pending.

Owner revision: red is primary, black secondary, yellow is limited to accents, and the base is crisp white.

| Priority  | Color         | Hex     | Purpose                                                                |
| --------- | ------------- | ------- | ---------------------------------------------------------------------- |
| Primary   | Sign red      | #BF2C25 | Primary buttons, headline, photo caption, event badge, focus/selection |
| Secondary | Black         | #111111 | Body type, countdown band, footer and secondary controls               |
| Third     | Market yellow | #F9D827 | Countdown eyebrow and narrow divider accents                           |
| Base      | Crisp white   | #FFFFFF | Page/form surfaces, primary-button text, countdown numbers             |

Supporting panels and borders use neutral grays. Contrast ratios: black/white 18.88:1; red/white 5.83:1; yellow/black 13.38:1. These checks do not constitute a full accessibility audit.

## Photography

The wide entrance image is the hero: it establishes the venue and shows shoppers and the original colorful signage. The desktop layout gives it 62% of the hero width. Phone layout puts the photo first. The countdown sits immediately below the hero in a separate black band with large white numbers and restrained yellow accents, deliberately subordinate to the photograph.

Original files remain unchanged in the owner's Downloads directory. Web derivatives were resized with macOS sips; no AI imagery or retouching was used. No standalone logo was extracted from the photos. Text wordmark remains provisional.

| Source filename                         | Tracked derivative                | Placement                                   |
| --------------------------------------- | --------------------------------- | ------------------------------------------- |
| 20250608_Flea_Market_Atmosphere_125.jpg | dist/assets/market-entrance.jpg   | Hero, maximum 2000px                        |
| 20250608_Flea_Market_Product_029.jpg    | dist/assets/vintage-finds.jpg     | Product gallery, maximum 1000px             |
| 20250608_Flea_Market_Product_064.jpg    | dist/assets/records-and-style.jpg | Product gallery, maximum 1000px             |
| 20250608_Flea_Market_Product_070.jpg    | dist/assets/one-of-a-kind.jpg     | Product gallery, maximum 1000px             |
| 20250608_Flea_Market_Atmosphere_024.jpg | dist/assets/market-signage.jpg    | Palette reference, not rendered on homepage |

Other supplied images (Atmosphere 023, Atmosphere 036, Product 027 and Product 061) remain available at the original supplied paths for future design iterations. Only selected derivatives are copied into the repository. Confirm any required photographer credit before public launch. User supplied these images for this redesign; no separate license document was supplied.

## Countdown behavior

Owner confirmed the second Sunday of every month. Target is 9 a.m. general admission, sourced from the existing market website; VIP entry is not this clock's target. Label explicitly states general admission and Pacific time.

All calculations use America/Los_Angeles through Intl, independent of visitor timezone and daylight-saving offset. On opening, numbers change to “It’s market day!” for the remainder of the Pasadena calendar date; this does not claim gates remain open. The next month begins at local midnight. The countdown uses the visitor device clock; no server time synchronization or live cancellation feed is configured.

The countdown and calendar date are independent of Eventbrite URL availability. The supplied ticket link is valid only for the November 8, 2026 listing. Once the calculated event moves on, click handling shows a missing-listing notice rather than routing visitors to the old event. Future listings need to be supplied. Repeating schedule is not inventory or a guarantee of ticket availability.

Timer updates once per second, without animation or per-second screen-reader announcements. Route transitions clear the old timer and visibility listener. Returning to the home route starts a fresh clock.
