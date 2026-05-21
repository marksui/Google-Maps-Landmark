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
  const roof = 8 + (seed % 6);
  const height = 34 + (seed % 8);
  const stripe = 16 + (seed % 12);
  const shape = shapeFor(type, variant, roof, height, stripe);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="82" viewBox="0 0 128 82">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.8" flood-color="#202124" flood-opacity=".38"/>
    </filter>
  </defs>
  <g filter="url(#shadow)" stroke="#fff" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round">
    ${shape}
  </g>
  <g stroke="#5f6368" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".72">
    ${detailFor(type, variant)}
  </g>
</svg>
`;
}

function shapeFor(type, variant, roof, height, stripe) {
  const baseY = 62;
  const gray = "#8a8d91";
  const light = "#b8bbbf";
  const dark = "#6f7378";
  const shapes = {
    museum: `<path fill="${gray}" d="M18 31 L64 12 L110 31 Z"/><path fill="${light}" d="M24 31 H104 V62 H24 Z"/><path fill="${dark}" d="M32 36 H43 V62 H32 Z M58 36 H70 V62 H58 Z M85 36 H96 V62 H85 Z"/>`,
    faith: `<path fill="${gray}" d="M26 62 V35 Q64 ${roof} 102 35 V62 Z"/><path fill="${light}" d="M48 62 V32 H80 V62 Z"/><path fill="${dark}" d="M61 19 H67 V32 H61 Z M57 23 H71 V27 H57 Z"/>`,
    palace: `<path fill="${gray}" d="M20 62 V28 H34 V38 H49 V28 H64 V38 H79 V28 H94 V38 H108 V62 Z"/><path fill="${light}" d="M31 42 H97 V62 H31 Z"/>`,
    tower: `<path fill="${gray}" d="M51 62 L58 18 H70 L77 62 Z"/><path fill="${light}" d="M43 62 H85 V70 H43 Z"/><path fill="${dark}" d="M49 30 H79 V38 H49 Z"/>`,
    monument: `<path fill="${gray}" d="M55 62 L61 16 H67 L73 62 Z"/><path fill="${light}" d="M37 62 H91 V70 H37 Z"/><path fill="${dark}" d="M47 53 H81 V62 H47 Z"/>`,
    civic: `<path fill="${gray}" d="M18 32 H110 V62 H18 Z"/><path fill="${light}" d="M25 22 H103 V32 H25 Z"/><path fill="${dark}" d="M30 38 H41 V62 H30 Z M50 38 H61 V62 H50 Z M69 38 H80 V62 H69 Z M88 38 H99 V62 H88 Z"/>`,
    theater: `<path fill="${gray}" d="M19 30 Q64 18 109 30 V62 H19 Z"/><path fill="${light}" d="M31 38 H97 V56 H31 Z"/><path fill="${dark}" d="M40 44 H88"/>`,
    stadium: `<ellipse fill="${gray}" cx="64" cy="47" rx="47" ry="22"/><ellipse fill="${light}" cx="64" cy="47" rx="31" ry="13"/><path fill="${dark}" d="M34 47 H94"/>`,
    generic: `<path fill="${gray}" d="M25 62 V${baseY - height} H96 V62 Z"/><path fill="${light}" d="M36 ${baseY - height + 7} H108 V62 H36 Z"/><path fill="${dark}" d="M48 ${stripe} H95"/>`,
  };
  return shapes[type] || shapes.generic;
}

function detailFor(type, variant) {
  if (type === "stadium") return `<path d="M36 42 Q64 33 92 42"/><path d="M36 52 Q64 61 92 52"/>`;
  if (type === "tower" || type === "monument") return `<path d="M56 44 H72"/><path d="M54 53 H74"/>`;
  return `<path d="M31 40 H96"/><path d="M31 50 H96"/><path d="M48 34 V61"/><path d="M80 34 V61"/>`;
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
