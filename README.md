# Google Maps Landmark

A static landmark map for the Google Maps Miniatures list.

## Open

Open `index.html` in a browser. The page uses Leaflet, OpenStreetMap tiles, MarkerCluster, Font Awesome, Google Places icon SVGs, and Wikimedia-hosted landmark thumbnails from CDNs, so an internet connection is needed.

## What It Includes

- 766 landmarks from the provided list
- 107 city anchor points across North America, Europe, Asia, South America, Africa, and Oceania
- Landmark-specific thumbnails for 764 of 766 places, crawled from Wikipedia, Wikidata, and Wikimedia Commons
- Google Places POI icon SVG fallbacks from `maps.gstatic.com/mapfiles/place_api/icons/v2/`
- Search plus continent, country/region, and icon-type filters
- Marker clustering and a Google Maps search link in each popup
- A short description in every landmark popup, using crawled summaries when available

The included coordinates are city-level anchors with nearby spread markers so every landmark is visible. Exact landmark coordinates can be added later by replacing or extending the data in `data.js`.

## Media Crawler

Run this to refresh landmark thumbnails and summaries:

```sh
node scripts/fetch-landmark-media.mjs
```

Google does not publish a single offline download pack for the proprietary Maps landmark miniatures. This project uses public Wikimedia/Wikipedia media for each landmark and keeps Google Places POI SVGs as fallback markers.
