# Visual direction and asset register

Updated October 30, 2026. Owner supplied nine photographs in chat and requested a palette drawn from them. These are visually selected, web-ready approximations of the photographed colors, not certified original logo ink values. The owner supplied the official raster logo on October 30, 2026; vector artwork and broader brand standards remain pending.

**Approved and locked by the owner on October 30, 2026.** Red is primary, black secondary, yellow is limited to accents, and the base is crisp white. Preserve these values and roles in future work; changing them requires a new owner request.

| Priority  | Color         | Hex     | Purpose                                                    |
| --------- | ------------- | ------- | ---------------------------------------------------------- |
| Primary   | Sign red      | #BF2C25 | Primary buttons, headline, event badge, focus/selection    |
| Secondary | Black         | #111111 | Body type, countdown band, footer and secondary controls   |
| Third     | Market yellow | #F9D827 | Countdown eyebrow and narrow divider accents               |
| Base      | Crisp white   | #FFFFFF | Page/form surfaces, primary-button text, countdown numbers |

Supporting panels and borders use neutral grays. Contrast ratios: black/white 18.88:1; red/white 5.83:1; yellow/black 13.38:1. These checks do not constitute a full accessibility audit.

## Official logo

Source: `Logn Logo RGC.jpg` supplied by the owner. Web derivative: `dist/assets/official-logo.jpg`, maximum 800px, generated with macOS sips. The top-left image links home, has descriptive alternative text, and preserves the original aspect ratio and artwork colors. Display width is 230px on desktop and approximately 190px on phones. The approved UI palette remains locked; original colors within the official artwork are preserved.

## Photography

The wide entrance image is the hero: it establishes the venue and shows shoppers and the original colorful signage. The desktop layout gives it 62% of the hero width. Phone layout puts the photo first. The countdown sits immediately below the hero in a separate black band with large white numbers and restrained yellow accents, deliberately subordinate to the photograph.

Original files remain unchanged in the owner's Downloads directory. Web derivatives were resized with macOS sips; no AI imagery or retouching was used. No standalone logo was extracted from the photos. The header now uses the official owner-supplied logo, resized without recoloring or cropping; the footer uses the existing site’s separate white R.G. Canning Attractions logo.

| Source filename                         | Tracked derivative                | Placement                                   |
| --------------------------------------- | --------------------------------- | ------------------------------------------- |
| 20250608_Flea_Market_Atmosphere_125.jpg | dist/assets/market-entrance.jpg   | Hero, maximum 2000px                        |
| 20250608_Flea_Market_Product_029.jpg    | dist/assets/vintage-finds.jpg     | Retained for future use, maximum 1000px     |
| 20250608_Flea_Market_Product_064.jpg    | dist/assets/records-and-style.jpg | Retained for future use, maximum 1000px     |
| 20250608_Flea_Market_Product_070.jpg    | dist/assets/one-of-a-kind.jpg     | Retained for future use, maximum 1000px     |
| 20250608_Flea_Market_Atmosphere_024.jpg | dist/assets/market-signage.jpg    | Palette reference, not rendered on homepage |

Other supplied images (Atmosphere 023, Atmosphere 036, Product 027 and Product 061) remain available at the original supplied paths for future design iterations. Only selected derivatives are copied into the repository. Confirm any required photographer credit before public launch. User supplied these images for this redesign; no separate license document was supplied.

## Countdown behavior

Owner confirmed the second Sunday of every month. Target is 9 a.m. general admission, sourced from the existing market website; VIP entry is not this clock's target. Label explicitly states general admission and Pacific time.

All calculations use America/Los_Angeles through Intl, independent of visitor timezone and daylight-saving offset. On opening, numbers change to “It’s market day!” for the remainder of the Pasadena calendar date; this does not claim gates remain open. The next month begins at local midnight. The countdown uses the visitor device clock; no server time synchronization or live cancellation feed is configured.

The countdown and calendar date are independent of Eventbrite URL availability. The supplied ticket link is valid only for the November 8, 2026 listing. Once the calculated event moves on, click handling shows a missing-listing notice rather than routing visitors to the old event. Future listings need to be supplied. Repeating schedule is not inventory or a guarantee of ticket availability.

Timer updates once per second, without animation or per-second screen-reader announcements. Route transitions clear the old timer and visibility listener. Returning to the home route starts a fresh clock.

## Homepage simplification and footer — October 30, 2026

Owner requested removal of the hero caption, “Old favorites. New stories.” gallery and “Have something to share?” prompt. Homepage now flows hero → countdown → “See you at the market” → footer. The event row and four linked visitor cards share a border so the information reads as one connected section. Cards open dedicated location, hours, admission and parking routes with return navigation.

Footer follows the live site’s dark three-column layout, company mark, L.A./Beaumont office details, market/social links and legal strip. Social destinations have explicit text labels for clarity. Footer text uses a lighter gray for readability. The original 1995–2023 copyright range is preserved to match the source; owner review of that range is pending. Newsletter above the live footer is outside this change and has not been implemented.

Footer mark: `dist/assets/rg-canning-footer.png`, original 358×115 PNG from https://www.rgcshows.com/wp-content/uploads/2018/10/Logo-RGCanning-White-01.png, retrieved October 30, 2026. Artwork remains unchanged.

## Vendor hero and entry choices

Owner supplied Aerial_2.JPG, Aerial_4.JPG and Product_027 as options. Selected Aerial_2.JPG because it shows the stadium and scale of the vendor area. `dist/assets/vendor-aerial.jpg` is a 2000px derivative made with sips; original untouched. Full-width cover image with readable title overlay, followed by New Vendor (primary red) and Returning Vendor (outlined black). Choices stack on phones. The locked palette is retained.

Vendor landing refinement: removed the four underlined subpage links below the entry buttons. The landing section now presents only New Vendor and Returning Vendor to keep the journey focused. Application subnavigation and existing information routes remain available within the application.
