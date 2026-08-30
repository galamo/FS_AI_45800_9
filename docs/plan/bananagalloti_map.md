---
name: BananaGalLoti Map
overview: Build a standalone BananaGalLoti page in the empty `html_map_example/index.html` with a full-bleed Leaflet world map and five business-site markers.
todos:
  - id: build-page
    content: "Write html_map_example/index.html: branded BananaGalLoti layout, Leaflet map, five site markers + fly-to list"
    status: completed
isProject: false
---

# BananaGalLoti world map

Write a complete single-file page in `[html_map_example/index.html](html_map_example/index.html)` (currently empty). Do not change `[html_report_1/index.html](html_report_1/index.html)`.

## Page

One composition for BananaGalLoti (banana sales), not a dashboard.

- **Brand:** `BananaGalLoti` as the hero-level wordmark (not nav-only).
- **Headline + one line:** worldwide banana sites; one short supporting sentence.
- **One CTA:** e.g. jump to the map / a site.
- **Dominant visual:** edge-to-edge Leaflet map (no inset, no rounded media card, no overlay chips on the map).
- **Second section (one job):** the five sites as a clickable list that flies the map and opens that marker popup.

## Visual direction

Tropical fruit-stand, not dark ops / purple / cream-serif-terracotta.

- Fonts: Google Fonts **Bricolage Grotesque** (brand/headlines) + **Figtree** (body).
- CSS variables: canopy green, banana gold, leaf, ink. Background = layered green–gold gradients plus a subtle leaf pattern (not a flat fill).
- Custom CSS banana-shaped marker (SVG/`divIcon`), not emoji and not a generic pin.
- 2–3 motions: wordmark fade/rise on load, markers drop in, location-row hover + map fly-to.

## Map (Leaflet, no API key)

Same CDN pattern as the other report: Leaflet 1.9.4 CSS + JS from unpkg.

OpenStreetMap tiles via `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` with standard OSM attribution (not Carto). `fitBounds` so all five sites are visible.

| Site                        | Coords            |
| --------------------------- | ----------------- |
| Tel Aviv, Israel            | 32.0853, 34.7818  |
| New York, United States     | 40.7128, -74.006  |
| Dubai, United Arab Emirates | 25.2048, 55.2708  |
| Larnaka, Cyprus             | 34.9229, 33.6234  |
| Tokyo, Japan                | 35.6762, 139.6503 |

Each marker popup: **BananaGalLoti**, city, country, “Fresh banana sales site”. Clicking a site in the list `setView`s that point and opens its popup. Enable `worldCopyJump` so the world map behaves correctly.

Responsive: map stays full-bleed; list stacks on small screens; map height ~55–70vh so brand + map still read as one first composition.
