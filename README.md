# Google Maps Landmark

A static landmark map for the Google Maps Miniatures list.

## Open

Open `index.html` in a browser. The page uses Leaflet, OpenStreetMap tiles, MarkerCluster, Font Awesome, and Wikimedia-hosted landmark images. Map miniatures are stored locally in `assets/miniatures/`.

## What It Includes

- 766 landmarks from the provided list
- 107 city anchor points across North America, Europe, Asia, South America, Africa, and Oceania
- Local Google-Maps-style gray landmark miniatures for every map marker
- Landmark images for 764 of 766 popup cards, crawled from Wikipedia, Wikidata, and Wikimedia Commons
- Search plus continent, country/region, and icon-type filters
- Marker clustering and a Google Maps search link in each popup
- A short description in every landmark popup, using crawled summaries when available

The included coordinates are city-level anchors with nearby spread markers so every landmark is visible. Exact landmark coordinates can be added later by replacing or extending the data in `data.js`.

## Media Crawler

Run this to refresh landmark thumbnails and summaries:

```sh
node scripts/fetch-landmark-media.mjs
```

Run this to regenerate local map miniatures:

```sh
node scripts/generate-miniatures.mjs
```

Google does not publish a single offline download pack for the proprietary Maps landmark miniatures. This project uses local SVG miniatures styled to match the gray/white map-overlay look, and uses public Wikimedia/Wikipedia media inside popup cards.
