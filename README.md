# Google Maps Landmark

A static landmark map for the Google Maps Miniatures list.

## Open

Open `index.html` in a browser. The default map source is **OpenStreetMap**, powered by Leaflet, so it supports normal map dragging, wheel zoom, double-click zoom, zoom controls, and fitting the current results without a Google Maps API key. It starts with city-level clusters for performance, then expands local gray landmark miniature SVG files when you zoom in or narrow the results.

If you switch the map source to **Google official**, enter a Google Maps JavaScript API key when prompted; the key is stored only in local browser storage and is not committed to the repo.

You can also load a key once from the URL:

```text
index.html?googleMapsKey=YOUR_API_KEY
```

The Google mode uses the official Google Maps JavaScript API with the `hybrid` map type so Google's own map labels, POIs, and landmark rendering come from Google at runtime.

## Languages

The site supports Chinese, English, Japanese, and Spanish from the language selector in the sidebar. UI labels, filter labels, category names, the API-key panel, the explanation note, popup actions, and generated short descriptions are localized. The selected language is stored in local browser storage and is also passed to Google Maps when the official map is loaded.

## What It Includes

- 766 landmarks from the provided list
- 107 city anchor points across North America, Europe, Asia, South America, Africa, and Oceania
- An OpenStreetMap/Leaflet map with normal interactive zoom and pan behavior
- Official Google Maps runtime rendering for the map surface when Google mode is selected
- Lightweight result markers for the provided landmark list in Google mode
- Landmark images for 764 of 766 popup cards, crawled from Wikipedia, Wikidata, and Wikimedia Commons
- Search plus language, continent, country/region, and icon-type filters
- A Google Maps search link in each popup
- A short description in every landmark popup, localized by the selected language

The included coordinates are city-level anchors with nearby spread markers so every landmark is visible. Exact landmark coordinates can be added later by replacing or extending the data in `data.js`.

## Media Crawler

Run this to refresh landmark thumbnails and summaries:

```sh
node scripts/fetch-landmark-media.mjs
```

Google does not publish a single download pack for the proprietary Maps landmark miniatures. This app does not scrape or store those assets; OpenStreetMap mode uses project-generated SVG miniatures, while Google mode lets Google Maps render the official map layer live through the Maps JavaScript API.
