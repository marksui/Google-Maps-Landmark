import fs from "node:fs/promises";
import vm from "node:vm";

const TYPE_DIR = "assets/miniatures/types";
const LANDMARK_DIR = "assets/miniatures/landmarks";
const dataSource = await fs.readFile("data.js", "utf8");
const appSource = await fs.readFile("app.js", "utf8");
const sandbox = { window: {} };

vm.runInNewContext(dataSource, sandbox);

const continents = vm.runInNewContext(extractArray("CONTINENTS", appSource));
const countries = vm.runInNewContext(extractArray("COUNTRIES", appSource));
const cityCoordinates = sandbox.window.CITY_COORDS;
const landmarks = parseLandmarks(sandbox.window.LANDMARK_SOURCE);

await fs.mkdir(TYPE_DIR, { recursive: true });
await fs.mkdir(LANDMARK_DIR, { recursive: true });

for (const type of ["museum", "faith", "palace", "tower", "monument", "civic", "theater", "stadium", "generic"]) {
  await fs.writeFile(`${TYPE_DIR}/${type}.svg`, miniatureSvg(type, hashString(type)));
}

for (const landmark of landmarks) {
  await fs.writeFile(`${LANDMARK_DIR}/${landmark.id}.svg`, miniatureSvg(landmark.category, hashString(landmark.id)));
}

console.log(`Generated ${landmarks.length} landmark miniatures and type icons.`);

function extractArray(name, source) {
  const match = source.match(new RegExp(`const ${name} = (\\[[\\s\\S]*?\\]);`));
  if (!match) throw new Error(`Could not find ${name}`);
  return match[1];
}

function parseLandmarks(source) {
  const continentSet = new Set(continents);
  const countrySet = new Set(countries);
  const citySet = new Set(Object.keys(cityCoordinates));
  const records = [];
  let currentContinent = "";
  let currentCountry = "";
  let currentCity = "";

  source
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      if (continentSet.has(line)) {
        currentContinent = line;
        currentCountry = "";
        currentCity = "";
        return;
      }

      const isCountry = countrySet.has(line);
      const isCity = citySet.has(line);
      if (isCountry && (!isCity || line !== currentCountry || Boolean(currentCity))) {
        currentCountry = line;
        currentCity = "";
        return;
      }

      if (isCity) {
        currentCity = line;
        return;
      }

      if (!currentContinent || !currentCountry || !currentCity) return;

      const id = slugify(`${currentContinent}-${currentCountry}-${currentCity}-${line}-${records.length}`);
      records.push({ id, name: line, category: detectCategory(line) });
    });

  return records;
}

function detectCategory(name) {
  const text = ` ${name.toLowerCase()} `;
  if (matches(text, ["museum", "museo", "musée", "museu", "muzeum", "gallery", "galleria", "kunst", "aquarium", "science"])) return "museum";
  if (matches(text, ["basilica", "cathedral", "church", "kirche", "mosque", "camii", "masjid", "temple", "wat ", "shrine", "jingu", "jinja", "abbey", "oratory", "duomo", "saint ", "st. "])) return "faith";
  if (matches(text, ["palace", "palais", "palacio", "palazzo", "castle", "castello", "castillo", "schloss", "fort", "fortress", "kremlin"])) return "palace";
  if (matches(text, ["tower", "torre", "turm", "skytree", "lighthouse", "wheel", "burj", "petronas"])) return "tower";
  if (matches(text, ["monument", "memorial", "statue", "obelisk", "arc ", "arch", "gate", "piazza", "square", "plaza"])) return "monument";
  if (matches(text, ["city hall", "rathaus", "capitol", "parliament", "congress", "white house", "rådhus", "civic"])) return "civic";
  if (matches(text, ["theatre", "theater", "opera", "concert", "performing arts", "music", "cultural"])) return "theater";
  if (matches(text, ["stadium", "estadio", "camp nou", "maracanã"])) return "stadium";
  return "generic";
}

function matches(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

function miniatureSvg(type, seed) {
  const variant = seed % 5;
  const height = 28 + (seed % 10);
  const inset = 8 + (seed % 7);
  const shape = shapeFor(type, variant, height, inset);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="82" viewBox="0 0 128 82" fill="none">
  <defs>
    <filter id="cast" x="-20%" y="-22%" width="145%" height="160%">
      <feDropShadow dx="0" dy="2.8" stdDeviation="1.35" flood-color="#202124" flood-opacity=".58"/>
      <feDropShadow dx="0" dy="0" stdDeviation="1.05" flood-color="#ffffff" flood-opacity=".86"/>
    </filter>
  </defs>
  <ellipse cx="64" cy="68.5" rx="43" ry="5.2" fill="#202124" opacity=".18"/>
  <g filter="url(#cast)" stroke="#fff" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round">
    ${shape}
  </g>
  <g stroke="#5f6368" stroke-width="2.15" stroke-linecap="round" stroke-linejoin="round" opacity=".78">
    ${detailFor(type, variant)}
  </g>
</svg>
`;
}

function shapeFor(type, variant, height, inset) {
  const y = 64;
  const top = y - height;
  const left = 26 + (variant % 2) * 2;
  const right = 94 - (variant % 2) * 2;
  const gray = "#8f9296";
  const light = "#c4c7cb";
  const mid = "#a7aaae";
  const dark = "#70757a";
  const shapes = {
    museum: `${block(left, top, 72, 30, inset, gray, light, mid)}
      <path fill="${dark}" d="M21 ${top} L64 ${top - 18} L107 ${top} Z"/>
      <path fill="${light}" d="M33 ${top + 8} H45 V${y} H33 Z M58 ${top + 8} H70 V${y} H58 Z M83 ${top + 8} H95 V${y} H83 Z"/>`,
    faith: `${block(37, top + 4, 54, 30, inset, gray, light, mid)}
      <path fill="${dark}" d="M47 ${top + 6} Q64 ${top - 20} 81 ${top + 6} Z"/>
      <path fill="${light}" d="M59 ${top - 19} H69 V${top + 5} H59 Z M55 ${top - 12} H73 V${top - 7} H55 Z"/>`,
    palace: `${block(22, top + 7, 78, 29, inset, gray, light, mid)}
      <path fill="${dark}" d="M22 ${top + 7} V${top - 4} H36 V${top + 5} H50 V${top - 5} H64 V${top + 5} H78 V${top - 4} H92 V${top + 7} Z"/>
      <path fill="${light}" d="M32 ${top + 18} H92 V${y} H32 Z"/>`,
    tower: `<path fill="${gray}" d="M53 ${y} L59 ${top - 13} H71 L77 ${y} Z"/>
      <path fill="${light}" d="M59 ${top - 13} H71 L76 ${y} H65 Z"/>
      <path fill="${mid}" d="M45 ${y} H83 V${y + 8} H45 Z"/>
      <path fill="${dark}" d="M49 ${top + 4} H81 V${top + 13} H49 Z"/>`,
    monument: `<path fill="${gray}" d="M55 ${y} L61 ${top - 16} H67 L73 ${y} Z"/>
      <path fill="${light}" d="M61 ${top - 16} H67 L73 ${y} H64 Z"/>
      <path fill="${mid}" d="M39 ${y} H89 V${y + 8} H39 Z"/>
      <path fill="${dark}" d="M48 ${y - 10} H80 V${y} H48 Z"/>`,
    civic: `${block(21, top + 5, 82, 31, inset, gray, light, mid)}
      <path fill="${dark}" d="M24 ${top - 5} H104 V${top + 6} H24 Z"/>
      <path fill="${light}" d="M31 ${top + 14} H42 V${y} H31 Z M51 ${top + 14} H62 V${y} H51 Z M70 ${top + 14} H81 V${y} H70 Z M89 ${top + 14} H100 V${y} H89 Z"/>`,
    theater: `<path fill="${gray}" d="M20 ${top + 10} Q64 ${top - 4} 108 ${top + 10} V${y} H20 Z"/>
      <path fill="${light}" d="M32 ${top + 18} H96 V${y - 8} H32 Z"/>
      <path fill="${mid}" d="M96 ${top + 18} L108 ${top + 10} V${y} H96 Z"/>`,
    stadium: `<ellipse fill="${gray}" cx="64" cy="48" rx="48" ry="23"/>
      <ellipse fill="${light}" cx="64" cy="48" rx="33" ry="14"/>
      <path fill="${mid}" d="M24 50 Q64 68 104 50 V58 Q64 76 24 58 Z"/>`,
    generic: block(left, top, 72, 34, inset, gray, light, mid),
  };
  return shapes[type] || shapes.generic;
}

function detailFor(type, variant) {
  if (type === "stadium") return `<path d="M34 43 Q64 34 94 43"/><path d="M35 53 Q64 63 93 53"/>`;
  if (type === "tower" || type === "monument") return `<path d="M56 42 H72"/><path d="M55 52 H73"/><path d="M60 28 H68"/>`;
  if (type === "faith") return `<path d="M43 42 H84"/><path d="M49 52 H90"/><path d="M64 31 V61"/>`;
  return `<path d="M31 39 H97"/><path d="M31 49 H99"/><path d="M47 33 V62"/><path d="M80 34 V62"/>`;
}

function block(x, y, width, height, inset, front, top, side) {
  const right = x + width;
  const bottom = y + height;
  return `<path fill="${front}" d="M${x} ${y} H${right} V${bottom} H${x} Z"/>
    <path fill="${top}" d="M${x} ${y} L${x + inset} ${y - inset} H${right + inset} L${right} ${y} Z"/>
    <path fill="${side}" d="M${right} ${y} L${right + inset} ${y - inset} V${bottom - inset} L${right} ${bottom} Z"/>`;
}

function hashString(value) {
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
