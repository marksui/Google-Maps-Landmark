# Google Maps Landmark

A static landmark map for the Google Maps Miniatures list.

## Open

Open `index.html` in a browser. Enter a Google Maps JavaScript API key when prompted; the key is stored only in local browser storage and is not committed to the repo.

You can also load a key once from the URL:

```text
index.html?googleMapsKey=YOUR_API_KEY
```

The app uses the official Google Maps JavaScript API with the `hybrid` map type so Google's own map labels, POIs, and landmark rendering come from Google at runtime.

## What It Includes

- 766 landmarks from the provided list
- 107 city anchor points across North America, Europe, Asia, South America, Africa, and Oceania
- Official Google Maps runtime rendering for the map surface
- Lightweight result markers for the provided landmark list
- Landmark images for 764 of 766 popup cards, crawled from Wikipedia, Wikidata, and Wikimedia Commons
- Search plus continent, country/region, and icon-type filters
- A Google Maps search link in each popup
- A short description in every landmark popup, using crawled summaries when available

The included coordinates are city-level anchors with nearby spread markers so every landmark is visible. Exact landmark coordinates can be added later by replacing or extending the data in `data.js`.

## Media Crawler

Run this to refresh landmark thumbnails and summaries:

```sh
node scripts/fetch-landmark-media.mjs
```

Google does not publish a single offline download pack for the proprietary Maps landmark miniatures. This app does not scrape or store those assets; it lets Google Maps render the official map layer live through the Maps JavaScript API.
