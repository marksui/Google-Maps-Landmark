(function () {
  const GOOGLE_PLACE_ICON_BASE = "https://maps.gstatic.com/mapfiles/place_api/icons/v2/";
  const PLACE_ICONS = {
    museum: { label: "Museum", file: "museum_pinlet.svg", color: "#13B5C7" },
    historic: { label: "Historic", file: "historic_pinlet.svg", color: "#13B5C7" },
    monument: { label: "Monument", file: "monument_pinlet.svg", color: "#7B9EB0" },
    civic: { label: "Civic building", file: "civic-bldg_pinlet.svg", color: "#7B9EB0" },
    library: { label: "Library", file: "library_pinlet.svg", color: "#7B9EB0" },
    worshipChristian: { label: "Worship", file: "worship_christian_pinlet.svg", color: "#7B9EB0" },
    worshipHindu: { label: "Worship", file: "worship_hindu_pinlet.svg", color: "#7B9EB0" },
    worshipIslam: { label: "Worship", file: "worship_islam_pinlet.svg", color: "#7B9EB0" },
    theater: { label: "Theater", file: "theater_pinlet.svg", color: "#13B5C7" },
    stadium: { label: "Stadium", file: "stadium_pinlet.svg", color: "#4DB546" },
    aquarium: { label: "Aquarium", file: "dolphin_pinlet.svg", color: "#13B5C7" },
    park: { label: "Park", file: "tree_pinlet.svg", color: "#4DB546" },
    school: { label: "School", file: "school_pinlet.svg", color: "#7B9EB0" },
    generic: { label: "Place", file: "generic_pinlet.svg", color: "#7B9EB0" },
  };

  Object.values(PLACE_ICONS).forEach((icon) => {
    icon.url = `${GOOGLE_PLACE_ICON_BASE}${icon.file}`;
  });

  const CATEGORY_DEFINITIONS = {
    museum: {
      label: "博物馆/美术馆",
      icon: "museum",
      color: PLACE_ICONS.museum.color,
      keywords: [
        "museum",
        "museo",
        "musée",
        "museet",
        "museu",
        "muzeum",
        "müzesi",
        "gallery",
        "galerie",
        "galleria",
        "pinacoteca",
        "kunst",
        "art institute",
        "art gallery",
        "national gallery",
        "exhibition",
        "bibliotheca",
        "library",
        "aquarium",
      ],
    },
    faith: {
      label: "宗教建筑",
      icon: "worshipChristian",
      color: PLACE_ICONS.worshipChristian.color,
      keywords: [
        "basilica",
        "basilique",
        "cathedral",
        "catedral",
        "kathedraal",
        "church",
        "kirche",
        "crkva",
        "mosque",
        "camii",
        "masjid",
        "temple",
        "wat ",
        "shrine",
        "jingu",
        "jinja",
        "santuario",
        "sanctuary",
        "oratory",
        "abbey",
        "monastery",
        "lavra",
        "dargah",
        "duomo",
        "domkirke",
        "storkyrkan",
        "st. ",
        "saint ",
        "sankt ",
      ],
    },
    palace: {
      label: "宫殿/城堡",
      icon: "historic",
      color: PLACE_ICONS.historic.color,
      keywords: [
        "palace",
        "palais",
        "palacio",
        "palazzo",
        "palatul",
        "castle",
        "castello",
        "castillo",
        "schloss",
        "fort",
        "fortress",
        "citadel",
        "kremlin",
        "hofburg",
        "alcázar",
        "alcazar",
        "alcazaba",
        "dvor",
        "dinh ",
      ],
    },
    tower: {
      label: "高塔/天际线",
      icon: "historic",
      color: PLACE_ICONS.historic.color,
      keywords: [
        "tower",
        "torre",
        "turm",
        "skytree",
        "skyscraper",
        "centre",
        "center",
        "observatory",
        "lighthouse",
        "wheel",
        "tower",
        "transamerica",
        "burj",
        "petronas",
      ],
    },
    monument: {
      label: "纪念碑/广场",
      icon: "monument",
      color: PLACE_ICONS.monument.color,
      keywords: [
        "monument",
        "memorial",
        "statue",
        "obelisk",
        "arc ",
        "arch",
        "gate",
        "porta",
        "puerta",
        "brána",
        "brana",
        "column",
        "mausoleum",
        "plaza",
        "place ",
        "piazza",
        "square",
        "tiananmen",
        "Heroes",
        "hősök",
      ],
    },
    civic: {
      label: "市政/公共建筑",
      icon: "civic",
      color: PLACE_ICONS.civic.color,
      keywords: [
        "city hall",
        "rathaus",
        "capitol",
        "parliament",
        "congress",
        "national archives",
        "presidential",
        "white house",
        "riksdag",
        "old city hall",
        "civic centre",
        "civic center",
        "ratusz",
        "rådhus",
        "prefecture",
        "viceroy",
      ],
    },
    culture: {
      label: "剧院/文化",
      icon: "theater",
      color: PLACE_ICONS.theater.color,
      keywords: [
        "theatre",
        "theater",
        "opera",
        "concert",
        "arts centre",
        "arts center",
        "performing arts",
        "music",
        "musica",
        "música",
        "symphony",
        "dolby",
        "cultural",
      ],
    },
    science: {
      label: "科学/教育",
      icon: "museum",
      color: PLACE_ICONS.museum.color,
      keywords: [
        "science",
        "technology",
        "natural history",
        "biodome",
        "space",
        "observatory",
        "planetarium",
        "industrial",
        "technical",
        "zoo",
      ],
    },
    sports: {
      label: "体育场馆",
      icon: "stadium",
      color: PLACE_ICONS.stadium.color,
      keywords: ["stadium", "estadio", "camp nou", "maracanã", "football"],
    },
    landmark: {
      label: "其他地标",
      icon: "generic",
      color: PLACE_ICONS.generic.color,
      keywords: [],
    },
  };

  const CONTINENTS = [
    "North America",
    "Europe",
    "Asia",
    "South America",
    "Africa",
    "Oceania",
  ];

  const COUNTRIES = [
    "Canada",
    "Mexico",
    "United States",
    "Austria",
    "Azerbaijan",
    "Belgium",
    "Croatia",
    "Czechia",
    "Denmark",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Italy",
    "Netherlands",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "Ukraine",
    "United Kingdom",
    "Cambodia",
    "China",
    "Hong Kong",
    "India",
    "Indonesia",
    "Iran",
    "Japan",
    "Malaysia",
    "Pakistan",
    "Philippines",
    "Saudi Arabia",
    "Singapore",
    "South Korea",
    "Taiwan",
    "Thailand",
    "United Arab Emirates",
    "Vietnam",
    "Argentina",
    "Brazil",
    "Chile",
    "Colombia",
    "Peru",
    "Egypt",
    "Morocco",
    "Kenya",
    "Nigeria",
    "South Africa",
    "Australia",
  ];

  const cityCoordinates = window.CITY_COORDS || {};
  const landmarkMedia = window.LANDMARK_MEDIA || {};
  const categoryKeys = Object.keys(CATEGORY_DEFINITIONS);
  const categoryPriority = [
    "faith",
    "palace",
    "museum",
    "science",
    "sports",
    "culture",
    "tower",
    "monument",
    "civic",
  ];

  const map = L.map("map", {
    worldCopyJump: true,
    zoomControl: false,
  }).setView([28, 18], 2);

  L.control.zoom({ position: "bottomright" }).addTo(map);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const clusterLayer = L.markerClusterGroup({
    showCoverageOnHover: false,
    spiderfyDistanceMultiplier: 1.4,
    maxClusterRadius: 42,
  });
  map.addLayer(clusterLayer);

  const elements = {
    searchInput: document.getElementById("searchInput"),
    continentFilter: document.getElementById("continentFilter"),
    countryFilter: document.getElementById("countryFilter"),
    categoryFilter: document.getElementById("categoryFilter"),
    resetFilters: document.getElementById("resetFilters"),
    fitVisible: document.getElementById("fitVisible"),
    toggleList: document.getElementById("toggleList"),
    legend: document.getElementById("legend"),
    landmarkList: document.getElementById("landmarkList"),
    visibleCount: document.getElementById("visibleCount"),
    cityCount: document.getElementById("cityCount"),
    countryCount: document.getElementById("countryCount"),
  };

  const landmarks = addCityOffsets(parseLandmarks(window.LANDMARK_SOURCE || ""));
  const markersById = new Map();
  let visibleLandmarks = landmarks;

  initialize();

  function initialize() {
    buildLegend();
    buildSelect(elements.continentFilter, "全部洲", unique(landmarks.map((item) => item.continent)));
    buildSelect(elements.countryFilter, "全部国家/地区", unique(landmarks.map((item) => item.country)));
    buildSelect(
      elements.categoryFilter,
      "全部图标类型",
      categoryKeys.map((key) => [key, CATEGORY_DEFINITIONS[key].label]),
    );

    elements.searchInput.addEventListener("input", render);
    elements.continentFilter.addEventListener("change", render);
    elements.countryFilter.addEventListener("change", render);
    elements.categoryFilter.addEventListener("change", render);
    elements.resetFilters.addEventListener("click", resetFilters);
    elements.fitVisible.addEventListener("click", fitVisibleMarkers);
    elements.toggleList.addEventListener("click", () => {
      elements.landmarkList.classList.toggle("collapsed");
    });

    render();
    fitVisibleMarkers();
  }

  function parseLandmarks(source) {
    const continents = new Set(CONTINENTS);
    const countries = new Set(COUNTRIES);
    const cityNames = new Set(Object.keys(cityCoordinates));
    const records = [];
    let currentContinent = "";
    let currentCountry = "";
    let currentCity = "";

    source
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .forEach((line) => {
        if (continents.has(line)) {
          currentContinent = line;
          currentCountry = "";
          currentCity = "";
          return;
        }

        const isCountry = countries.has(line);
        const isCity = cityNames.has(line);

        if (isCountry && (!isCity || line !== currentCountry || Boolean(currentCity))) {
          currentCountry = line;
          currentCity = "";
          return;
        }

        if (isCity) {
          currentCity = line;
          return;
        }

        if (!currentContinent || !currentCountry || !currentCity) {
          return;
        }

        const coordinates = cityCoordinates[currentCity];
        const category = detectCategory(line);
        const placeIcon = detectPlaceIcon(line, category);
        const id = slugify(`${currentContinent}-${currentCountry}-${currentCity}-${line}-${records.length}`);
        const record = {
          id,
          name: line,
          continent: currentContinent,
          country: currentCountry,
          city: currentCity,
          category,
          placeIcon,
          media: landmarkMedia[id],
          lat: coordinates.lat,
          lng: coordinates.lng,
          searchText: `${line} ${currentCity} ${currentCountry} ${currentContinent}`.toLowerCase(),
        };
        record.description = createDescription(record);
        records.push(record);
      });

    return records;
  }

  function detectCategory(name) {
    const text = ` ${name.toLowerCase()} `;
    return (
      categoryPriority.find((key) =>
        CATEGORY_DEFINITIONS[key].keywords.some((keyword) => text.includes(keyword.toLowerCase())),
      ) || "landmark"
    );
  }

  function detectPlaceIcon(name, categoryKey) {
    const text = ` ${name.toLowerCase()} `;
    if (matches(text, ["aquarium", "biodome"])) return "aquarium";
    if (matches(text, ["library", "biblioteca", "bibliothek", "bibliotek", "bibliotheek"])) return "library";
    if (matches(text, ["stadium", "estadio", "camp nou", "maracanã", "maracana"])) return "stadium";
    if (matches(text, ["park", "gardens", "garden", "jardim", "botanical", "bo-kaap", "cape point"])) return "park";
    if (matches(text, ["school", "university", "ubc", "karnataka", "college"])) return "school";
    if (matches(text, ["mosque", "camii", "masjid", "jamek", "dargah", "jaffali", "rahmah"])) {
      return "worshipIslam";
    }
    if (
      matches(text, [
        "temple",
        "mandir",
        "shri ",
        "sri ",
        "pura ",
        "wat ",
        "jingu",
        "jinja",
        "buddha",
        "pagoda",
        "iskcon",
        "shrine",
        "taisha",
        "sensō",
        "senso",
      ])
    ) {
      return "worshipHindu";
    }
    if (
      matches(text, [
        "basilica",
        "basilique",
        "cathedral",
        "catedral",
        "cathédrale",
        "church",
        "kirche",
        "crkva",
        "abbey",
        "oratory",
        "chapel",
        "duomo",
        "domkirke",
        "eglise",
        "église",
        "minster",
        "saint ",
        "sankt ",
        "st. ",
      ])
    ) {
      return "worshipChristian";
    }

    const category = CATEGORY_DEFINITIONS[categoryKey];
    return category?.icon || "generic";
  }

  function matches(text, keywords) {
    return keywords.some((keyword) => text.includes(keyword));
  }

  function createDescription(landmark) {
    if (landmark.media?.description) {
      return landmark.media.description;
    }

    const cityCountry = `${landmark.city}，${landmark.country}`;
    const descriptions = {
      museum: `${landmark.name} 是位于 ${cityCountry} 的博物馆或美术馆类地标，适合了解当地艺术、历史、科学或文化收藏。`,
      faith: `${landmark.name} 是位于 ${cityCountry} 的宗教建筑地标，常以礼仪空间、建筑细节和城市历史吸引游客。`,
      palace: `${landmark.name} 是位于 ${cityCountry} 的宫殿或城堡类景点，通常承载当地王室、政治或防御历史。`,
      tower: `${landmark.name} 是位于 ${cityCountry} 的塔楼或天际线地标，常用于俯瞰城市和辨认城市轮廓。`,
      monument: `${landmark.name} 是位于 ${cityCountry} 的纪念性地标，记录城市历史、重要人物或公共记忆。`,
      civic: `${landmark.name} 是位于 ${cityCountry} 的公共建筑地标，体现城市治理、公共服务或国家象征。`,
      culture: `${landmark.name} 是位于 ${cityCountry} 的文化演出或艺术空间，常承载剧院、音乐和城市活动。`,
      science: `${landmark.name} 是位于 ${cityCountry} 的科学或教育类景点，适合探索自然、科技、工业或航天主题。`,
      sports: `${landmark.name} 是位于 ${cityCountry} 的体育场馆地标，常与大型赛事和城市体育文化相关。`,
      landmark: `${landmark.name} 是位于 ${cityCountry} 的城市地标，适合加入地图清单进行打卡和路线规划。`,
    };
    return descriptions[landmark.category] || descriptions.landmark;
  }

  function addCityOffsets(records) {
    const groups = records.reduce((mapByCity, record) => {
      const key = `${record.country}-${record.city}`;
      if (!mapByCity.has(key)) {
        mapByCity.set(key, []);
      }
      mapByCity.get(key).push(record);
      return mapByCity;
    }, new Map());

    groups.forEach((items) => {
      items.forEach((item, index) => {
        if (items.length === 1) {
          item.plotLat = item.lat;
          item.plotLng = item.lng;
          return;
        }

        const angle = index * 2.399963229728653;
        const ring = Math.floor(index / 9);
        const radius = 0.012 + ring * 0.007;
        const latFactor = Math.cos((item.lat * Math.PI) / 180) || 1;
        item.plotLat = item.lat + Math.sin(angle) * radius;
        item.plotLng = item.lng + (Math.cos(angle) * radius) / Math.max(0.35, Math.abs(latFactor));
      });
    });

    return records;
  }

  function render() {
    const query = elements.searchInput.value.trim().toLowerCase();
    const continent = elements.continentFilter.value;
    const country = elements.countryFilter.value;
    const category = elements.categoryFilter.value;

    visibleLandmarks = landmarks.filter((item) => {
      return (
        (!query || item.searchText.includes(query)) &&
        (!continent || item.continent === continent) &&
        (!country || item.country === country) &&
        (!category || item.category === category)
      );
    });

    renderMarkers();
    renderList();
    renderStats();
  }

  function renderMarkers() {
    clusterLayer.clearLayers();
    markersById.clear();

    visibleLandmarks.forEach((landmark) => {
      const marker = L.marker([landmark.plotLat, landmark.plotLng], {
        icon: createMarkerIcon(landmark),
        title: landmark.name,
      }).bindPopup(createPopup(landmark));
      markersById.set(landmark.id, marker);
      clusterLayer.addLayer(marker);
    });
  }

  function renderList() {
    const fragment = document.createDocumentFragment();

    visibleLandmarks.forEach((landmark) => {
      const category = CATEGORY_DEFINITIONS[landmark.category];
      const row = document.createElement("button");
      row.type = "button";
      row.className = "landmark-row";
      row.innerHTML = `
        ${placeIconMarkup(landmark, "row-icon")}
        <span>
          <span class="row-title">${escapeHtml(landmark.name)}</span>
          <span class="row-meta">${escapeHtml(landmark.city)} · ${escapeHtml(landmark.country)} · ${escapeHtml(category.label)}</span>
        </span>
      `;
      row.addEventListener("click", () => focusLandmark(landmark.id));
      fragment.appendChild(row);
    });

    elements.landmarkList.replaceChildren(fragment);
  }

  function renderStats() {
    elements.visibleCount.textContent = visibleLandmarks.length.toLocaleString();
    elements.cityCount.textContent = unique(visibleLandmarks.map((item) => item.city)).length.toLocaleString();
    elements.countryCount.textContent = unique(visibleLandmarks.map((item) => item.country)).length.toLocaleString();
  }

  function buildLegend() {
    const fragment = document.createDocumentFragment();
    categoryKeys.forEach((key) => {
      const category = CATEGORY_DEFINITIONS[key];
      const chip = document.createElement("span");
      chip.className = "legend-chip";
      chip.innerHTML = `
        ${placeIconMarkup(category.icon, "legend-dot")}
        ${escapeHtml(category.label)}
      `;
      fragment.appendChild(chip);
    });
    elements.legend.replaceChildren(fragment);
  }

  function buildSelect(select, allLabel, values) {
    const normalized = values.map((value) => (Array.isArray(value) ? value : [value, value]));
    select.replaceChildren(
      new Option(allLabel, ""),
      ...normalized.map(([value, label]) => new Option(label, value)),
    );
  }

  function createMarkerIcon(categoryKey) {
    const landmark = typeof categoryKey === "string" ? { placeIcon: categoryKey } : categoryKey;
    return L.divIcon({
      className: "",
      html: placeIconMarkup(landmark, "landmark-marker"),
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -14],
    });
  }

  function createPopup(landmark) {
    const category = CATEGORY_DEFINITIONS[landmark.category] || CATEGORY_DEFINITIONS.landmark;
    const mapsQuery = encodeURIComponent(`${landmark.name}, ${landmark.city}, ${landmark.country}`);
    const mediaFigure = landmark.media?.thumbnail
      ? `
        <figure class="popup-media">
          <img src="${escapeHtml(landmark.media.thumbnail)}" alt="${escapeHtml(landmark.name)}" loading="lazy" />
          ${
            landmark.media.pageUrl
              ? `<figcaption><a href="${escapeHtml(landmark.media.pageUrl)}" target="_blank" rel="noreferrer">Wikipedia / Wikimedia</a></figcaption>`
              : ""
          }
        </figure>
      `
      : "";
    return `
      <article class="popup-card">
        <div class="popup-head">
          ${placeIconMarkup(landmark, "popup-icon", landmark.name)}
          <div>
            <h2 class="popup-title">${escapeHtml(landmark.name)}</h2>
            <p class="popup-meta">${escapeHtml(landmark.city)} · ${escapeHtml(landmark.country)}</p>
          </div>
        </div>
        ${mediaFigure}
        <p class="popup-meta">${escapeHtml(landmark.continent)} · ${escapeHtml(category.label)}</p>
        <p class="popup-description">${escapeHtml(landmark.description)}</p>
        <a class="popup-link" href="https://www.google.com/maps/search/?api=1&query=${mapsQuery}" target="_blank" rel="noreferrer">
          <i class="fa-solid fa-map-location-dot" aria-hidden="true"></i>
          Google Maps
        </a>
      </article>
    `;
  }

  function placeIconMarkup(landmarkOrIconKey, className, altText = "") {
    const landmark =
      typeof landmarkOrIconKey === "string" ? { placeIcon: landmarkOrIconKey } : landmarkOrIconKey || {};
    const icon = PLACE_ICONS[landmark.placeIcon] || PLACE_ICONS.generic;
    const imageUrl = landmark.media?.thumbnail || icon.url;
    const alt = altText ? escapeHtml(`${altText} icon`) : "";
    const hidden = altText ? "" : ' aria-hidden="true"';
    const photoClass = landmark.media?.thumbnail ? " landmark-photo-icon" : "";
    return `
      <span class="${className}${photoClass}" style="--marker-color:${icon.color}"${hidden}>
        <img src="${escapeHtml(imageUrl)}" alt="${alt}" loading="lazy" />
      </span>
    `;
  }

  function focusLandmark(id) {
    const marker = markersById.get(id);
    if (!marker) {
      return;
    }
    const latLng = marker.getLatLng();
    map.setView(latLng, Math.max(map.getZoom(), 10), { animate: true });
    clusterLayer.zoomToShowLayer(marker, () => marker.openPopup());
  }

  function fitVisibleMarkers() {
    if (!visibleLandmarks.length) {
      map.setView([28, 18], 2);
      return;
    }
    const bounds = L.latLngBounds(visibleLandmarks.map((item) => [item.plotLat, item.plotLng]));
    map.fitBounds(bounds.pad(0.18), { maxZoom: 12, animate: true });
  }

  function resetFilters() {
    elements.searchInput.value = "";
    elements.continentFilter.value = "";
    elements.countryFilter.value = "";
    elements.categoryFilter.value = "";
    render();
    fitVisibleMarkers();
  }

  function unique(values) {
    return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
  }

  function slugify(value) {
    return value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
