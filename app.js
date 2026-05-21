(function () {
  const CATEGORY_DEFINITIONS = {
    museum: {
      label: "博物馆/美术馆",
      icon: "fa-landmark",
      color: "#246bfe",
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
      icon: "fa-place-of-worship",
      color: "#8b5cf6",
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
      icon: "fa-chess-rook",
      color: "#c2410c",
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
      icon: "fa-tower-observation",
      color: "#0891b2",
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
      icon: "fa-monument",
      color: "#0f766e",
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
      icon: "fa-building-columns",
      color: "#4f46e5",
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
      icon: "fa-masks-theater",
      color: "#db2777",
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
      icon: "fa-flask",
      color: "#16a34a",
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
      icon: "fa-futbol",
      color: "#ea580c",
      keywords: ["stadium", "estadio", "camp nou", "maracanã", "football"],
    },
    landmark: {
      label: "其他地标",
      icon: "fa-location-dot",
      color: "#475569",
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
        records.push({
          id: slugify(`${currentContinent}-${currentCountry}-${currentCity}-${line}-${records.length}`),
          name: line,
          continent: currentContinent,
          country: currentCountry,
          city: currentCity,
          category,
          lat: coordinates.lat,
          lng: coordinates.lng,
          searchText: `${line} ${currentCity} ${currentCountry} ${currentContinent}`.toLowerCase(),
        });
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
        icon: createMarkerIcon(landmark.category),
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
      row.style.setProperty("--marker-color", category.color);
      row.innerHTML = `
        <span class="row-icon"><i class="fa-solid ${category.icon}" aria-hidden="true"></i></span>
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
      chip.style.setProperty("--marker-color", category.color);
      chip.innerHTML = `
        <span class="legend-dot"><i class="fa-solid ${category.icon}" aria-hidden="true"></i></span>
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
    const category = CATEGORY_DEFINITIONS[categoryKey] || CATEGORY_DEFINITIONS.landmark;
    return L.divIcon({
      className: "",
      html: `<span class="landmark-marker" style="--marker-color:${category.color}"><i class="fa-solid ${category.icon}" aria-hidden="true"></i></span>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -16],
    });
  }

  function createPopup(landmark) {
    const category = CATEGORY_DEFINITIONS[landmark.category] || CATEGORY_DEFINITIONS.landmark;
    const mapsQuery = encodeURIComponent(`${landmark.name}, ${landmark.city}, ${landmark.country}`);
    return `
      <article class="popup-card">
        <div class="popup-head">
          <span class="popup-icon" style="--marker-color:${category.color}">
            <i class="fa-solid ${category.icon}" aria-hidden="true"></i>
          </span>
          <div>
            <h2 class="popup-title">${escapeHtml(landmark.name)}</h2>
            <p class="popup-meta">${escapeHtml(landmark.city)} · ${escapeHtml(landmark.country)}</p>
          </div>
        </div>
        <p class="popup-meta">${escapeHtml(landmark.continent)} · ${escapeHtml(category.label)}</p>
        <a class="popup-link" href="https://www.google.com/maps/search/?api=1&query=${mapsQuery}" target="_blank" rel="noreferrer">
          <i class="fa-solid fa-map-location-dot" aria-hidden="true"></i>
          Google Maps
        </a>
      </article>
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
