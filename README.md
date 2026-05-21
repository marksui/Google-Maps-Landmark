# Google Maps Landmark

A static landmark map for the Google Maps Miniatures list.

## Open

Open `index.html` in a browser. The page uses Leaflet, OpenStreetMap tiles, MarkerCluster, Font Awesome, and Google Places icon SVGs from CDNs, so an internet connection is needed.

## What It Includes

- 766 landmarks from the provided list
- 107 city anchor points across North America, Europe, Asia, South America, Africa, and Oceania
- Google Places POI icon SVGs from `maps.gstatic.com/mapfiles/place_api/icons/v2/`, using the official icon filenames and category colors documented by Google
- Search plus continent, country/region, and icon-type filters
- Marker clustering and a Google Maps search link in each popup
- A short Chinese description in every landmark popup

The included coordinates are city-level anchors with nearby spread markers so every landmark is visible. Exact landmark coordinates can be added later by replacing or extending the data in `data.js`.

## Icon Source

Google does not publish a single offline download pack for the Maps POI icons. The supported source is the Google Places icon system, where each place icon is exposed as an `iconMaskBaseUri` and rendered by appending `.svg` or `.png`.
