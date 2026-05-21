(function () {
  const DEFAULT_LANGUAGE = "zh";
  const LANGUAGE_STORAGE = "landmarkMapLanguage";
  const DEFAULT_MAP_PROVIDER = "openmap";
  const MAP_PROVIDER_STORAGE = "landmarkMapProvider";
  const MAP_PROVIDERS = ["openmap", "google"];
  const OPENMAP_INDIVIDUAL_LIMIT = 180;
  const OPENMAP_INDIVIDUAL_ZOOM = 8;
  const SUPPORTED_LANGUAGES = {
    zh: { label: "中文", htmlLang: "zh-CN", mapsLanguage: "zh-CN", locale: "zh-CN" },
    en: { label: "English", htmlLang: "en", mapsLanguage: "en", locale: "en-US" },
    ja: { label: "日本語", htmlLang: "ja", mapsLanguage: "ja", locale: "ja-JP" },
    es: { label: "Español", htmlLang: "es", mapsLanguage: "es", locale: "es-ES" },
  };

  const COUNTRY_CODES = {
    Argentina: "AR",
    Australia: "AU",
    Austria: "AT",
    Azerbaijan: "AZ",
    Belgium: "BE",
    Brazil: "BR",
    Cambodia: "KH",
    Canada: "CA",
    Chile: "CL",
    China: "CN",
    Colombia: "CO",
    Croatia: "HR",
    Czechia: "CZ",
    Denmark: "DK",
    Egypt: "EG",
    France: "FR",
    Germany: "DE",
    Greece: "GR",
    "Hong Kong": "HK",
    Hungary: "HU",
    India: "IN",
    Indonesia: "ID",
    Iran: "IR",
    Italy: "IT",
    Japan: "JP",
    Kenya: "KE",
    Malaysia: "MY",
    Mexico: "MX",
    Morocco: "MA",
    Netherlands: "NL",
    Nigeria: "NG",
    Norway: "NO",
    Pakistan: "PK",
    Peru: "PE",
    Philippines: "PH",
    Poland: "PL",
    Portugal: "PT",
    Romania: "RO",
    Russia: "RU",
    "Saudi Arabia": "SA",
    Singapore: "SG",
    "South Africa": "ZA",
    "South Korea": "KR",
    Spain: "ES",
    Sweden: "SE",
    Switzerland: "CH",
    Taiwan: "TW",
    Thailand: "TH",
    Turkey: "TR",
    Ukraine: "UA",
    "United Arab Emirates": "AE",
    "United Kingdom": "GB",
    "United States": "US",
    Vietnam: "VN",
  };

  const I18N = {
    zh: {
      documentTitle: "Google Maps Miniatures 地标地图",
      appTitle: "地标地图",
      sidebarLabel: "地标筛选和列表",
      mapLabel: "地图",
      statsLabel: "地图统计",
      controlsLabel: "筛选",
      legendLabel: "图标说明",
      listLabel: "地标列表",
      noteLabel: "地图说明",
      fitVisible: "显示当前结果",
      statLandmarks: "地标",
      statCities: "城市",
      statCountries: "国家/地区",
      language: "语言",
      mapProvider: "地图来源",
      providerOpenMap: "OpenStreetMap",
      providerGoogle: "Google 官方",
      search: "搜索",
      searchPlaceholder: "城市、国家、地标名称",
      continent: "洲",
      country: "国家/地区",
      category: "图标类型",
      reset: "重置",
      list: "列表",
      allContinents: "全部洲",
      allCountries: "全部国家/地区",
      allCategories: "全部图标类型",
      noteTitle: "说明",
      noteBodyOpenMap:
        "当前使用 OpenStreetMap/Leaflet 地图，可正常拖动、滚轮缩放、双击缩放和框选当前结果；低缩放按城市聚合，放大后展开本地灰白 miniature。",
      noteBodyGoogle:
        "地图底图由 Google Maps 官方 API 实时渲染；列表点位使用城市级坐标展开，点击点位可查看图片、分类和一句短介绍。",
      apiKeyLabel: "Google Maps API key",
      apiKeyButton: "加载官方地图",
      apiLocalOnly: "key 只保存在本机浏览器。",
      apiEnterKey: "输入 key 后加载 Google 官方地图。",
      apiMissingKey: "请输入 Google Maps API key。",
      apiLoading: "正在加载 Google 官方地图...",
      apiLoadFailure: "Google Maps 加载失败，请检查 key、Maps JavaScript API 和来源限制。",
      apiInvalidKey: "Google Maps key 无效，或 Maps JavaScript API 没有启用。",
      apiLoadMapFirst: "先加载 Google Maps 官方地图。",
      googleUnavailable: "Google 地图没加载成功，已切回 OpenStreetMap。",
      openMapUnavailable: "OpenStreetMap 地图组件没加载成功，请检查网络后刷新页面。",
      closePopup: "关闭",
      clusterSummary: (count, city) => `${city} · ${count} 个地标`,
      zoomPrompt: "点击城市或继续放大会展开单个地标 miniature。",
      mediaSource: "Wikipedia / Wikimedia",
      openGoogleMaps: "在 Google Maps 打开",
      continents: {
        "North America": "北美洲",
        Europe: "欧洲",
        Asia: "亚洲",
        "South America": "南美洲",
        Africa: "非洲",
        Oceania: "大洋洲",
      },
      categories: {
        museum: "博物馆/美术馆",
        faith: "宗教建筑",
        palace: "宫殿/城堡",
        tower: "高塔/天际线",
        monument: "纪念碑/广场",
        civic: "市政/公共建筑",
        culture: "剧院/文化",
        science: "科学/教育",
        sports: "体育场馆",
        landmark: "其他地标",
      },
      place: (city, country) => `${city}，${country}`,
      descriptions: {
        museum: (name, place) => `${name} 是位于 ${place} 的博物馆或美术馆类地标，适合了解当地艺术、历史、科学或文化收藏。`,
        faith: (name, place) => `${name} 是位于 ${place} 的宗教建筑地标，常以礼仪空间、建筑细节和城市历史吸引游客。`,
        palace: (name, place) => `${name} 是位于 ${place} 的宫殿或城堡类景点，通常承载当地王室、政治或防御历史。`,
        tower: (name, place) => `${name} 是位于 ${place} 的塔楼或天际线地标，常用于俯瞰城市和辨认城市轮廓。`,
        monument: (name, place) => `${name} 是位于 ${place} 的纪念性地标，记录城市历史、重要人物或公共记忆。`,
        civic: (name, place) => `${name} 是位于 ${place} 的公共建筑地标，体现城市治理、公共服务或国家象征。`,
        culture: (name, place) => `${name} 是位于 ${place} 的文化演出或艺术空间，常承载剧院、音乐和城市活动。`,
        science: (name, place) => `${name} 是位于 ${place} 的科学或教育类景点，适合探索自然、科技、工业或航天主题。`,
        sports: (name, place) => `${name} 是位于 ${place} 的体育场馆地标，常与大型赛事和城市体育文化相关。`,
        landmark: (name, place) => `${name} 是位于 ${place} 的城市地标，适合加入地图清单进行打卡和路线规划。`,
      },
    },
    en: {
      documentTitle: "Google Maps Miniatures Landmark Map",
      appTitle: "Landmark Map",
      sidebarLabel: "Landmark filters and list",
      mapLabel: "Map",
      statsLabel: "Map statistics",
      controlsLabel: "Filters",
      legendLabel: "Icon legend",
      listLabel: "Landmarks",
      noteLabel: "Map note",
      fitVisible: "Fit current results",
      statLandmarks: "Landmarks",
      statCities: "Cities",
      statCountries: "Countries/regions",
      language: "Language",
      mapProvider: "Map source",
      providerOpenMap: "OpenStreetMap",
      providerGoogle: "Google official",
      search: "Search",
      searchPlaceholder: "City, country, or landmark",
      continent: "Continent",
      country: "Country/region",
      category: "Icon type",
      reset: "Reset",
      list: "List",
      allContinents: "All continents",
      allCountries: "All countries/regions",
      allCategories: "All icon types",
      noteTitle: "Note",
      noteBodyOpenMap:
        "The current map uses OpenStreetMap with Leaflet, so dragging, wheel zoom, double-click zoom, and fitting results behave like a real map. Low zooms cluster by city; zooming in expands local gray miniatures.",
      noteBodyGoogle:
        "The base map is rendered live by the official Google Maps API. List points use city-level anchors, and each popup shows an image, category, and short description.",
      apiKeyLabel: "Google Maps API key",
      apiKeyButton: "Load official map",
      apiLocalOnly: "The key is stored only in this browser.",
      apiEnterKey: "Enter a key to load the official Google map.",
      apiMissingKey: "Please enter a Google Maps API key.",
      apiLoading: "Loading the official Google map...",
      apiLoadFailure: "Google Maps failed to load. Check the key, Maps JavaScript API, and referrer restrictions.",
      apiInvalidKey: "The Google Maps key is invalid, or Maps JavaScript API is not enabled.",
      apiLoadMapFirst: "Load the official Google map first.",
      googleUnavailable: "Google Maps did not load, so the app switched back to OpenStreetMap.",
      openMapUnavailable: "OpenStreetMap did not load. Check the network connection and refresh the page.",
      closePopup: "Close",
      clusterSummary: (count, city) => `${city} · ${count} landmarks`,
      zoomPrompt: "Click the city or keep zooming to expand individual landmark miniatures.",
      mediaSource: "Wikipedia / Wikimedia",
      openGoogleMaps: "Open in Google Maps",
      continents: {
        "North America": "North America",
        Europe: "Europe",
        Asia: "Asia",
        "South America": "South America",
        Africa: "Africa",
        Oceania: "Oceania",
      },
      categories: {
        museum: "Museums/galleries",
        faith: "Religious buildings",
        palace: "Palaces/castles",
        tower: "Towers/skyline",
        monument: "Monuments/squares",
        civic: "Civic/public buildings",
        culture: "Theater/culture",
        science: "Science/education",
        sports: "Sports venues",
        landmark: "Other landmarks",
      },
      place: (city, country) => `${city}, ${country}`,
      descriptions: {
        museum: (name, place) => `${name} is a museum or gallery landmark in ${place}, useful for exploring local art, history, science, or culture.`,
        faith: (name, place) => `${name} is a religious landmark in ${place}, known for worship spaces, architectural detail, and city history.`,
        palace: (name, place) => `${name} is a palace or castle landmark in ${place}, often tied to royal, political, or defensive history.`,
        tower: (name, place) => `${name} is a tower or skyline landmark in ${place}, often used for city views and orientation.`,
        monument: (name, place) => `${name} is a commemorative landmark in ${place}, marking public memory, history, or notable figures.`,
        civic: (name, place) => `${name} is a civic or public landmark in ${place}, reflecting government, public service, or national identity.`,
        culture: (name, place) => `${name} is a cultural or performance landmark in ${place}, connected with theater, music, or city events.`,
        science: (name, place) => `${name} is a science or education landmark in ${place}, suited to natural history, technology, industry, or space themes.`,
        sports: (name, place) => `${name} is a sports venue landmark in ${place}, associated with major events and local sports culture.`,
        landmark: (name, place) => `${name} is a city landmark in ${place}, useful for map check-ins and route planning.`,
      },
    },
    ja: {
      documentTitle: "Google Maps Miniatures ランドマークマップ",
      appTitle: "ランドマークマップ",
      sidebarLabel: "ランドマークの絞り込みと一覧",
      mapLabel: "地図",
      statsLabel: "地図の統計",
      controlsLabel: "フィルター",
      legendLabel: "アイコン凡例",
      listLabel: "ランドマーク一覧",
      noteLabel: "地図の説明",
      fitVisible: "現在の結果を表示",
      statLandmarks: "ランドマーク",
      statCities: "都市",
      statCountries: "国/地域",
      language: "言語",
      mapProvider: "地図ソース",
      providerOpenMap: "OpenStreetMap",
      providerGoogle: "Google 公式",
      search: "検索",
      searchPlaceholder: "都市、国、ランドマーク名",
      continent: "大陸",
      country: "国/地域",
      category: "アイコンの種類",
      reset: "リセット",
      list: "一覧",
      allContinents: "すべての大陸",
      allCountries: "すべての国/地域",
      allCategories: "すべての種類",
      noteTitle: "説明",
      noteBodyOpenMap:
        "現在の地図は OpenStreetMap と Leaflet を使用しており、ドラッグ、ホイールズーム、ダブルクリックズーム、結果へのフィットが通常の地図として動作します。低ズームでは都市単位で集約し、拡大するとローカルの灰色 miniature を表示します。",
      noteBodyGoogle:
        "ベースマップは Google Maps 公式 API でリアルタイムに描画されます。一覧の地点は都市レベルの座標をもとに配置され、ポップアップには画像、分類、短い説明が表示されます。",
      apiKeyLabel: "Google Maps API キー",
      apiKeyButton: "公式地図を読み込む",
      apiLocalOnly: "キーはこのブラウザ内にのみ保存されます。",
      apiEnterKey: "キーを入力すると Google 公式地図を読み込みます。",
      apiMissingKey: "Google Maps API キーを入力してください。",
      apiLoading: "Google 公式地図を読み込み中...",
      apiLoadFailure: "Google Maps を読み込めません。キー、Maps JavaScript API、参照元制限を確認してください。",
      apiInvalidKey: "Google Maps キーが無効、または Maps JavaScript API が有効になっていません。",
      apiLoadMapFirst: "先に Google 公式地図を読み込んでください。",
      googleUnavailable: "Google Maps を読み込めなかったため、OpenStreetMap に切り替えました。",
      openMapUnavailable: "OpenStreetMap を読み込めません。ネットワークを確認してページを再読み込みしてください。",
      closePopup: "閉じる",
      clusterSummary: (count, city) => `${city} · ${count} 件のランドマーク`,
      zoomPrompt: "都市をクリックするか、さらに拡大すると個別のランドマーク miniature が表示されます。",
      mediaSource: "Wikipedia / Wikimedia",
      openGoogleMaps: "Google Maps で開く",
      continents: {
        "North America": "北アメリカ",
        Europe: "ヨーロッパ",
        Asia: "アジア",
        "South America": "南アメリカ",
        Africa: "アフリカ",
        Oceania: "オセアニア",
      },
      categories: {
        museum: "博物館/美術館",
        faith: "宗教建築",
        palace: "宮殿/城",
        tower: "塔/スカイライン",
        monument: "記念碑/広場",
        civic: "行政/公共建築",
        culture: "劇場/文化",
        science: "科学/教育",
        sports: "スポーツ施設",
        landmark: "その他のランドマーク",
      },
      place: (city, country) => `${city}、${country}`,
      descriptions: {
        museum: (name, place) => `${name} は ${place} にある博物館または美術館系のランドマークで、地域の芸術、歴史、科学、文化に触れられます。`,
        faith: (name, place) => `${name} は ${place} にある宗教建築のランドマークで、礼拝空間、建築の細部、都市の歴史が見どころです。`,
        palace: (name, place) => `${name} は ${place} にある宮殿または城のランドマークで、王室、政治、防衛の歴史と結びついています。`,
        tower: (name, place) => `${name} は ${place} にある塔またはスカイラインのランドマークで、街を眺めたり位置を把握したりする目印になります。`,
        monument: (name, place) => `${name} は ${place} にある記念碑的なランドマークで、歴史、人物、公共の記憶を伝えます。`,
        civic: (name, place) => `${name} は ${place} にある行政または公共建築のランドマークで、都市運営や公共性を象徴します。`,
        culture: (name, place) => `${name} は ${place} にある文化・公演系のランドマークで、劇場、音楽、都市イベントと関わりがあります。`,
        science: (name, place) => `${name} は ${place} にある科学・教育系のスポットで、自然、技術、産業、宇宙などのテーマに触れられます。`,
        sports: (name, place) => `${name} は ${place} にあるスポーツ施設のランドマークで、大規模イベントや地域のスポーツ文化と関係しています。`,
        landmark: (name, place) => `${name} は ${place} にある都市のランドマークで、地図でのチェックインやルート計画に役立ちます。`,
      },
    },
    es: {
      documentTitle: "Mapa de lugares emblemáticos de Google Maps Miniatures",
      appTitle: "Mapa de lugares emblemáticos",
      sidebarLabel: "Filtros y lista de lugares",
      mapLabel: "Mapa",
      statsLabel: "Estadísticas del mapa",
      controlsLabel: "Filtros",
      legendLabel: "Leyenda de iconos",
      listLabel: "Lugares emblemáticos",
      noteLabel: "Nota del mapa",
      fitVisible: "Mostrar resultados actuales",
      statLandmarks: "Lugares",
      statCities: "Ciudades",
      statCountries: "Países/regiones",
      language: "Idioma",
      mapProvider: "Fuente del mapa",
      providerOpenMap: "OpenStreetMap",
      providerGoogle: "Google oficial",
      search: "Buscar",
      searchPlaceholder: "Ciudad, país o lugar",
      continent: "Continente",
      country: "País/región",
      category: "Tipo de icono",
      reset: "Restablecer",
      list: "Lista",
      allContinents: "Todos los continentes",
      allCountries: "Todos los países/regiones",
      allCategories: "Todos los tipos",
      noteTitle: "Nota",
      noteBodyOpenMap:
        "El mapa actual usa OpenStreetMap con Leaflet, así que arrastrar, hacer zoom con la rueda, doble clic y ajustar resultados funcionan como en un mapa real. En zoom bajo agrupa por ciudad; al acercarte despliega miniaturas grises locales.",
      noteBodyGoogle:
        "El mapa base se renderiza en tiempo real con la API oficial de Google Maps. Los puntos de la lista usan coordenadas a nivel de ciudad, y cada ventana muestra imagen, categoría y una breve descripción.",
      apiKeyLabel: "Clave de API de Google Maps",
      apiKeyButton: "Cargar mapa oficial",
      apiLocalOnly: "La clave solo se guarda en este navegador.",
      apiEnterKey: "Introduce una clave para cargar el mapa oficial de Google.",
      apiMissingKey: "Introduce una clave de API de Google Maps.",
      apiLoading: "Cargando el mapa oficial de Google...",
      apiLoadFailure: "Google Maps no pudo cargarse. Revisa la clave, Maps JavaScript API y las restricciones de referencia.",
      apiInvalidKey: "La clave de Google Maps no es válida o Maps JavaScript API no está habilitada.",
      apiLoadMapFirst: "Carga primero el mapa oficial de Google.",
      googleUnavailable: "Google Maps no se cargó, así que la app volvió a OpenStreetMap.",
      openMapUnavailable: "OpenStreetMap no se cargó. Revisa la conexión de red y recarga la página.",
      closePopup: "Cerrar",
      clusterSummary: (count, city) => `${city} · ${count} lugares`,
      zoomPrompt: "Haz clic en la ciudad o sigue acercándote para desplegar miniaturas individuales.",
      mediaSource: "Wikipedia / Wikimedia",
      openGoogleMaps: "Abrir en Google Maps",
      continents: {
        "North America": "Norteamérica",
        Europe: "Europa",
        Asia: "Asia",
        "South America": "Sudamérica",
        Africa: "África",
        Oceania: "Oceanía",
      },
      categories: {
        museum: "Museos/galerías",
        faith: "Edificios religiosos",
        palace: "Palacios/castillos",
        tower: "Torres/horizonte",
        monument: "Monumentos/plazas",
        civic: "Edificios públicos",
        culture: "Teatro/cultura",
        science: "Ciencia/educación",
        sports: "Recintos deportivos",
        landmark: "Otros lugares",
      },
      place: (city, country) => `${city}, ${country}`,
      descriptions: {
        museum: (name, place) => `${name} es un museo o galería emblemática en ${place}, ideal para explorar arte, historia, ciencia o cultura local.`,
        faith: (name, place) => `${name} es un edificio religioso emblemático en ${place}, reconocido por sus espacios de culto, detalles arquitectónicos e historia urbana.`,
        palace: (name, place) => `${name} es un palacio o castillo emblemático en ${place}, a menudo vinculado con historia real, política o defensiva.`,
        tower: (name, place) => `${name} es una torre o referencia del horizonte en ${place}, útil para contemplar la ciudad y orientarse.`,
        monument: (name, place) => `${name} es un monumento emblemático en ${place}, asociado con memoria pública, historia o personajes destacados.`,
        civic: (name, place) => `${name} es un edificio público emblemático en ${place}, relacionado con gobierno, servicios públicos o identidad nacional.`,
        culture: (name, place) => `${name} es un espacio cultural o escénico en ${place}, conectado con teatro, música o eventos urbanos.`,
        science: (name, place) => `${name} es un lugar de ciencia o educación en ${place}, adecuado para temas de naturaleza, tecnología, industria o espacio.`,
        sports: (name, place) => `${name} es un recinto deportivo emblemático en ${place}, asociado con grandes eventos y cultura deportiva local.`,
        landmark: (name, place) => `${name} es un lugar emblemático de ${place}, útil para marcar visitas y planificar rutas.`,
      },
    },
  };

  const CATEGORY_DEFINITIONS = {
    museum: {
      label: "博物馆/美术馆",
      icon: "museum",
      color: "#70757a",
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
      icon: "faith",
      color: "#70757a",
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
      icon: "palace",
      color: "#70757a",
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
      icon: "tower",
      color: "#70757a",
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
      color: "#70757a",
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
      color: "#70757a",
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
      color: "#70757a",
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
      color: "#70757a",
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
      color: "#70757a",
      keywords: ["stadium", "estadio", "camp nou", "maracanã", "football"],
    },
    landmark: {
      label: "其他地标",
      icon: "generic",
      color: "#70757a",
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

  const GOOGLE_MAPS_KEY_STORAGE = "googleMapsApiKey";
  const DEFAULT_CENTER = { lat: 28, lng: 18 };
  const DEFAULT_ZOOM = 2;

  const elements = {
    sidebar: document.getElementById("sidebar"),
    mapPane: document.getElementById("mapPane"),
    map: document.getElementById("map"),
    appTitle: document.getElementById("appTitle"),
    fitVisibleText: document.getElementById("fitVisibleText"),
    statsSection: document.getElementById("statsSection"),
    controlsSection: document.getElementById("controlsSection"),
    visibleCountLabel: document.getElementById("visibleCountLabel"),
    cityCountLabel: document.getElementById("cityCountLabel"),
    countryCountLabel: document.getElementById("countryCountLabel"),
    languageLabel: document.getElementById("languageLabel"),
    languageSelect: document.getElementById("languageSelect"),
    mapProviderLabel: document.getElementById("mapProviderLabel"),
    mapProviderSelect: document.getElementById("mapProviderSelect"),
    searchLabel: document.getElementById("searchLabel"),
    continentLabel: document.getElementById("continentLabel"),
    countryLabel: document.getElementById("countryLabel"),
    categoryLabel: document.getElementById("categoryLabel"),
    resetFiltersText: document.getElementById("resetFiltersText"),
    toggleListText: document.getElementById("toggleListText"),
    mapNote: document.getElementById("mapNote"),
    mapNoteTitle: document.getElementById("mapNoteTitle"),
    mapNoteBody: document.getElementById("mapNoteBody"),
    apiKeyPanel: document.getElementById("apiKeyPanel"),
    apiKeyForm: document.getElementById("apiKeyForm"),
    apiKeyLabel: document.getElementById("apiKeyLabel"),
    apiKeyInput: document.getElementById("apiKeyInput"),
    apiKeyButtonText: document.getElementById("apiKeyButtonText"),
    apiKeyStatus: document.getElementById("apiKeyStatus"),
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

  let currentLanguage = getInitialLanguage();
  let currentProvider = getInitialProvider();
  let apiKeyStatus = { key: "apiLocalOnly", isError: false };
  const regionNamesCache = new Map();
  const landmarks = addCityOffsets(parseLandmarks(window.LANDMARK_SOURCE || ""));
  const markersById = new Map();
  let visibleLandmarks = landmarks;
  let googleLoaderPromise = null;
  let loadedGoogleMapsKey = "";
  let map = null;
  let infoWindow = null;
  let mapsApi = null;
  let markerApi = null;
  let openMapLayer = null;
  let openMapRenderTimer = 0;
  let openMapPopupOpen = false;

  initialize();

  function initialize() {
    buildLanguageSelect();
    buildProviderSelect();
    applyLanguage();

    elements.languageSelect.addEventListener("change", handleLanguageChange);
    elements.mapProviderSelect.addEventListener("change", handleProviderChange);
    elements.searchInput.addEventListener("input", render);
    elements.continentFilter.addEventListener("change", render);
    elements.countryFilter.addEventListener("change", render);
    elements.categoryFilter.addEventListener("change", render);
    elements.resetFilters.addEventListener("click", resetFilters);
    elements.fitVisible.addEventListener("click", fitVisibleMarkers);
    elements.toggleList.addEventListener("click", () => {
      elements.landmarkList.classList.toggle("collapsed");
    });
    elements.apiKeyForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const key = elements.apiKeyInput.value.trim();
      if (!key) {
        showApiKeyPanel("apiMissingKey", true);
        return;
      }
      localStorage.setItem(GOOGLE_MAPS_KEY_STORAGE, key);
      if (loadedGoogleMapsKey && loadedGoogleMapsKey !== key) {
        window.location.reload();
        return;
      }
      initializeGoogleMap(key);
    });

    render();
    initializeMapProvider();
  }

  function handleLanguageChange() {
    currentLanguage = normalizeLanguage(elements.languageSelect.value);
    localStorage.setItem(LANGUAGE_STORAGE, currentLanguage);

    if (currentProvider === "google" && (map || window.google?.maps?.importLibrary)) {
      window.location.reload();
      return;
    }

    applyLanguage();
    render();
  }

  function handleProviderChange() {
    currentProvider = MAP_PROVIDERS.includes(elements.mapProviderSelect.value)
      ? elements.mapProviderSelect.value
      : DEFAULT_MAP_PROVIDER;
    localStorage.setItem(MAP_PROVIDER_STORAGE, currentProvider);
    applyLanguage();
    initializeMapProvider();
  }

  function applyLanguage() {
    const selected = {
      continent: elements.continentFilter.value,
      country: elements.countryFilter.value,
      category: elements.categoryFilter.value,
    };

    document.documentElement.lang = SUPPORTED_LANGUAGES[currentLanguage].htmlLang;
    document.title = t("documentTitle");
    elements.sidebar.setAttribute("aria-label", t("sidebarLabel"));
    elements.mapPane.setAttribute("aria-label", t("mapLabel"));
    elements.statsSection.setAttribute("aria-label", t("statsLabel"));
    elements.controlsSection.setAttribute("aria-label", t("controlsLabel"));
    elements.legend.setAttribute("aria-label", t("legendLabel"));
    elements.landmarkList.setAttribute("aria-label", t("listLabel"));
    elements.mapNote.setAttribute("aria-label", t("noteLabel"));
    elements.fitVisible.title = t("fitVisible");
    elements.appTitle.textContent = t("appTitle");
    elements.fitVisibleText.textContent = t("fitVisible");
    elements.visibleCountLabel.textContent = t("statLandmarks");
    elements.cityCountLabel.textContent = t("statCities");
    elements.countryCountLabel.textContent = t("statCountries");
    elements.languageLabel.textContent = t("language");
    elements.mapProviderLabel.textContent = t("mapProvider");
    elements.searchLabel.textContent = t("search");
    elements.searchInput.placeholder = t("searchPlaceholder");
    elements.continentLabel.textContent = t("continent");
    elements.countryLabel.textContent = t("country");
    elements.categoryLabel.textContent = t("category");
    elements.resetFiltersText.textContent = t("reset");
    elements.toggleListText.textContent = t("list");
    elements.mapNoteTitle.textContent = t("noteTitle");
    elements.mapNoteBody.textContent = t(noteBodyKeyForProvider());
    elements.apiKeyLabel.textContent = t("apiKeyLabel");
    elements.apiKeyButtonText.textContent = t("apiKeyButton");
    buildProviderSelect();

    buildSelect(
      elements.continentFilter,
      t("allContinents"),
      unique(landmarks.map((item) => item.continent)).map((continent) => [
        continent,
        continentLabelFor(continent),
      ]),
    );
    buildSelect(
      elements.countryFilter,
      t("allCountries"),
      unique(landmarks.map((item) => item.country)).map((country) => [country, countryLabelFor(country)]),
    );
    buildSelect(
      elements.categoryFilter,
      t("allCategories"),
      categoryKeys.map((key) => [key, categoryLabelFor(key)]),
    );
    elements.continentFilter.value = selected.continent;
    elements.countryFilter.value = selected.country;
    elements.categoryFilter.value = selected.category;

    buildLegend();
    updateApiKeyStatus();
  }

  function buildLanguageSelect() {
    elements.languageSelect.replaceChildren(
      ...Object.entries(SUPPORTED_LANGUAGES).map(([value, config]) => new Option(config.label, value)),
    );
    elements.languageSelect.value = currentLanguage;
  }

  function buildProviderSelect() {
    elements.mapProviderSelect.replaceChildren(
      new Option(t("providerOpenMap"), "openmap"),
      new Option(t("providerGoogle"), "google"),
    );
    elements.mapProviderSelect.value = currentProvider;
  }

  function getInitialLanguage() {
    let storedLanguage = "";

    try {
      storedLanguage = localStorage.getItem(LANGUAGE_STORAGE) || "";
    } catch (error) {
      storedLanguage = "";
    }

    const browserLanguage = navigator.languages?.[0] || navigator.language || DEFAULT_LANGUAGE;
    return normalizeLanguage(storedLanguage || browserLanguage);
  }

  function getInitialProvider() {
    const params = new URLSearchParams(window.location.search);
    const requestedProvider = (params.get("provider") || params.get("mapProvider") || "").trim();
    return MAP_PROVIDERS.includes(requestedProvider) ? requestedProvider : DEFAULT_MAP_PROVIDER;
  }

  function noteBodyKeyForProvider() {
    if (currentProvider === "google") {
      return "noteBodyGoogle";
    }

    return "noteBodyOpenMap";
  }

  function normalizeLanguage(value) {
    const normalized = String(value || "").toLowerCase();

    if (normalized.startsWith("zh")) return "zh";
    if (normalized.startsWith("ja")) return "ja";
    if (normalized.startsWith("es")) return "es";
    if (normalized.startsWith("en")) return "en";
    return DEFAULT_LANGUAGE;
  }

  function currentTranslations() {
    return I18N[currentLanguage] || I18N[DEFAULT_LANGUAGE];
  }

  function t(key) {
    return currentTranslations()[key] || I18N[DEFAULT_LANGUAGE][key] || key;
  }

  function tf(key, ...args) {
    const value = t(key);
    return typeof value === "function" ? value(...args) : value;
  }

  function continentLabelFor(continent, language = currentLanguage) {
    return I18N[language]?.continents?.[continent] || I18N[DEFAULT_LANGUAGE].continents[continent] || continent;
  }

  function categoryLabelFor(category, language = currentLanguage) {
    return I18N[language]?.categories?.[category] || I18N[DEFAULT_LANGUAGE].categories[category] || category;
  }

  function countryLabelFor(country, language = currentLanguage) {
    const code = COUNTRY_CODES[country];

    if (!code) {
      return country;
    }

    try {
      const locale = SUPPORTED_LANGUAGES[language]?.locale || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE].locale;
      const names = regionNamesFor(locale);
      return names.of(code) || country;
    } catch (error) {
      return country;
    }
  }

  function regionNamesFor(locale) {
    if (!regionNamesCache.has(locale)) {
      regionNamesCache.set(locale, new Intl.DisplayNames([locale], { type: "region" }));
    }
    return regionNamesCache.get(locale);
  }

  function placeLabelFor(landmark, language = currentLanguage) {
    const place = I18N[language]?.place || I18N[DEFAULT_LANGUAGE].place;
    return place(landmark.city, countryLabelFor(landmark.country, language));
  }

  function createSearchText(name, city, country, continent, category) {
    const localizedTerms = Object.keys(SUPPORTED_LANGUAGES).flatMap((language) => [
      continentLabelFor(continent, language),
      countryLabelFor(country, language),
      categoryLabelFor(category, language),
    ]);
    return [name, city, country, continent, category, ...localizedTerms].join(" ").toLowerCase();
  }

  function initializeMapProvider() {
    if (currentProvider === "openmap") {
      initializeOpenMap();
      return;
    }

    if (currentProvider === "google") {
      destroyOpenMap();
      initializeGoogleMap(getStoredGoogleMapsKey());
      return;
    }

    currentProvider = DEFAULT_MAP_PROVIDER;
    initializeOpenMap();
  }

  function initializeOpenMap(messageKey = "") {
    clearGoogleMarkers();
    hideApiKeyPanel();
    destroyOpenMap();

    if (!window.L) {
      map = null;
      elements.map.className = "openmap";
      elements.map.replaceChildren(createMapError(t("openMapUnavailable")));
      return;
    }

    elements.map.className = "openmap";
    elements.map.replaceChildren();
    map = L.map(elements.map, {
      center: [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng],
      zoom: DEFAULT_ZOOM,
      minZoom: 2,
      maxZoom: 18,
      inertia: true,
      inertiaDeceleration: 3400,
      markerZoomAnimation: true,
      wheelDebounceTime: 36,
      wheelPxPerZoomLevel: 96,
      zoomControl: true,
      worldCopyJump: true,
      preferCanvas: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
    }).addTo(map);

    openMapLayer = L.layerGroup().addTo(map);
    map.on("zoomend moveend", scheduleOpenMapRender);
    map.on("popupopen", bindOpenMapPopupActions);
    map.on("popupclose", () => {
      openMapPopupOpen = false;
      scheduleOpenMapRender();
    });
    renderMarkers();
    fitVisibleMarkers();

    if (messageKey) {
      showMapToast(messageKey);
    }
  }

  function destroyOpenMap() {
    window.clearTimeout(openMapRenderTimer);
    openMapRenderTimer = 0;

    if (openMapLayer) {
      openMapLayer.clearLayers();
      openMapLayer = null;
    }

    if (map && window.L && map instanceof L.Map) {
      map.off();
      map.remove();
      map = null;
    }
  }

  function createMapError(message) {
    const error = document.createElement("div");
    error.className = "map-error";
    error.textContent = message;
    return error;
  }

  async function initializeGoogleMap(apiKey) {
    if (currentProvider !== "google") {
      return;
    }

    if (!apiKey) {
      showApiKeyPanel("apiEnterKey", false);
      return;
    }

    showApiKeyPanel("apiLoading", false);

    try {
      await loadGoogleMapsApi(apiKey);
      mapsApi = await google.maps.importLibrary("maps");
      markerApi = await google.maps.importLibrary("marker");
      elements.map.className = "";
      elements.map.replaceChildren();
      map = new mapsApi.Map(elements.map, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        mapId: "DEMO_MAP_ID",
        mapTypeId: "hybrid",
        clickableIcons: true,
        fullscreenControl: true,
        gestureHandling: "greedy",
        mapTypeControl: true,
        streetViewControl: false,
      });
      infoWindow = new mapsApi.InfoWindow({
        maxWidth: 320,
      });
      hideApiKeyPanel();
      renderMarkers();
      fitVisibleMarkers();
    } catch (error) {
      console.error(error);
      showApiKeyPanel("apiLoadFailure", true);
      currentProvider = DEFAULT_MAP_PROVIDER;
      localStorage.setItem(MAP_PROVIDER_STORAGE, currentProvider);
      applyLanguage();
      initializeOpenMap("googleUnavailable");
    }
  }

  function loadGoogleMapsApi(apiKey) {
    if (window.google?.maps?.importLibrary) {
      return Promise.resolve();
    }

    if (googleLoaderPromise) {
      return googleLoaderPromise;
    }

    googleLoaderPromise = new Promise((resolve, reject) => {
      const callbackName = "__googleMapsLandmarkReady";
      let settled = false;
      const fail = (error) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        delete window[callbackName];
        googleLoaderPromise = null;
        reject(error);
      };
      const timeout = setTimeout(() => {
        fail(new Error("Google Maps JavaScript API timed out."));
      }, 12000);
      const params = new URLSearchParams({
        key: apiKey,
        loading: "async",
        callback: callbackName,
        v: "weekly",
        language: SUPPORTED_LANGUAGES[currentLanguage].mapsLanguage,
        region: "US",
        libraries: "marker",
      });
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
      script.onerror = () => {
        fail(new Error("Google Maps JavaScript API could not load."));
      };
      window[callbackName] = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        delete window[callbackName];
        loadedGoogleMapsKey = apiKey;
        resolve();
      };
      window.gm_authFailure = () => {
        showApiKeyPanel("apiInvalidKey", true);
        fail(new Error("Google Maps authentication failed."));
      };
      document.head.appendChild(script);
    });

    return googleLoaderPromise;
  }

  function getStoredGoogleMapsKey() {
    const params = new URLSearchParams(window.location.search);
    const keyFromUrl = (params.get("googleMapsKey") || params.get("key") || "").trim();

    if (keyFromUrl) {
      localStorage.setItem(GOOGLE_MAPS_KEY_STORAGE, keyFromUrl);
      params.delete("googleMapsKey");
      params.delete("key");
      const query = params.toString();
      const cleanUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
      window.history.replaceState({}, "", cleanUrl);
      return keyFromUrl;
    }

    return (localStorage.getItem(GOOGLE_MAPS_KEY_STORAGE) || "").trim();
  }

  function showApiKeyPanel(messageKey, isError) {
    apiKeyStatus = { key: messageKey, isError: Boolean(isError) };
    elements.apiKeyPanel.classList.remove("hidden");
    updateApiKeyStatus();
  }

  function hideApiKeyPanel() {
    elements.apiKeyPanel.classList.add("hidden");
    elements.apiKeyStatus.classList.remove("error");
  }

  function updateApiKeyStatus() {
    elements.apiKeyStatus.textContent = t(apiKeyStatus.key);
    elements.apiKeyStatus.classList.toggle("error", apiKeyStatus.isError);
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
        const id = slugify(`${currentContinent}-${currentCountry}-${currentCity}-${line}-${records.length}`);
        const record = {
          id,
          name: line,
          continent: currentContinent,
          country: currentCountry,
          city: currentCity,
          category,
          iconPath: `assets/miniatures/landmarks/${id}.svg`,
          media: landmarkMedia[id],
          lat: coordinates.lat,
          lng: coordinates.lng,
          searchText: createSearchText(line, currentCity, currentCountry, currentContinent, category),
        };
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

  function createDescription(landmark) {
    if (currentLanguage === "en" && landmark.media?.description) {
      return landmark.media.description;
    }

    const descriptions = currentTranslations().descriptions;
    const template = descriptions[landmark.category] || descriptions.landmark;
    return template(landmark.name, placeLabelFor(landmark));
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
    if (currentProvider === "openmap") {
      renderOpenMapMarkers();
      return;
    }

    renderGoogleMarkers();
  }

  function scheduleOpenMapRender(event = {}) {
    const isMoveEnd = event.type === "moveend";

    if (openMapPopupOpen || (isMoveEnd && !shouldRenderOpenMapIndividuals())) {
      return;
    }

    window.clearTimeout(openMapRenderTimer);
    openMapRenderTimer = window.setTimeout(() => {
      if (openMapPopupOpen) {
        return;
      }

      renderOpenMapMarkers();
    }, 80);
  }

  function renderOpenMapMarkers() {
    if (currentProvider !== "openmap" || !map || !openMapLayer || !window.L) {
      return;
    }

    elements.map.classList.toggle("labels-visible", (map.getZoom() || DEFAULT_ZOOM) >= 4);
    openMapLayer.clearLayers();
    markersById.clear();

    if (!visibleLandmarks.length) {
      return;
    }

    if (!shouldRenderOpenMapIndividuals()) {
      renderOpenMapCityMarkers();
      return;
    }

    openMapVisibleLandmarks().forEach((landmark) => {
      const marker = L.marker([landmark.plotLat, landmark.plotLng], {
        title: landmark.name,
        riseOnHover: true,
        icon: createOpenMapLandmarkIcon(landmark),
      });
      marker.addTo(openMapLayer);
      bindOpenMapMarkerAction(marker, () => openOpenMapPopup(marker, landmark));
      markersById.set(landmark.id, { marker, landmark });
    });
  }

  function shouldRenderOpenMapIndividuals() {
    return (
      visibleLandmarks.length <= OPENMAP_INDIVIDUAL_LIMIT ||
      (map.getZoom() || DEFAULT_ZOOM) >= OPENMAP_INDIVIDUAL_ZOOM
    );
  }

  function openMapVisibleLandmarks() {
    if (visibleLandmarks.length <= OPENMAP_INDIVIDUAL_LIMIT || !map.getBounds) {
      return visibleLandmarks;
    }

    const bounds = map.getBounds().pad(0.45);
    return visibleLandmarks.filter((landmark) => bounds.contains([landmark.plotLat, landmark.plotLng]));
  }

  function renderOpenMapCityMarkers() {
    groupVisibleLandmarksByCity().forEach((group) => {
      const marker = L.marker([group.lat, group.lng], {
        title: tf("clusterSummary", group.items.length, group.city),
        riseOnHover: true,
        icon: createOpenMapCityIcon(group),
      });
      marker.addTo(openMapLayer);
      bindOpenMapMarkerAction(marker, () => {
        const nextZoom = Math.max((map.getZoom() || DEFAULT_ZOOM) + 3, OPENMAP_INDIVIDUAL_ZOOM);
        map.flyTo([group.lat, group.lng], Math.min(nextZoom, 14), { duration: 0.35 });
      });
    });
  }

  function bindOpenMapMarkerAction(marker, action) {
    let lastRun = 0;
    const run = () => {
      const now = Date.now();
      if (now - lastRun < 180) {
        return;
      }
      lastRun = now;
      action();
    };

    marker.on("click", run);

    const element = marker.getElement();
    if (!element) {
      return;
    }

    element.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      run();
    });
    element.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      event.preventDefault();
      run();
    });
  }

  function renderGoogleMarkers() {
    markersById.forEach(({ marker }) => {
      marker.map = null;
    });
    markersById.clear();

    if (!map || !markerApi?.AdvancedMarkerElement) {
      return;
    }

    visibleLandmarks.forEach((landmark) => {
      const marker = new markerApi.AdvancedMarkerElement({
        map,
        position: { lat: landmark.plotLat, lng: landmark.plotLng },
        title: landmark.name,
        content: createMapMarkerContent(landmark),
      });
      marker.addListener("click", () => openInfoWindow(marker, landmark));
      markersById.set(landmark.id, { marker, landmark });
    });
  }

  function groupVisibleLandmarksByCity() {
    const groups = new Map();

    visibleLandmarks.forEach((landmark) => {
      const key = `${landmark.country}-${landmark.city}`;
      if (!groups.has(key)) {
        groups.set(key, {
          key,
          city: landmark.city,
          country: landmark.country,
          continent: landmark.continent,
          lat: landmark.lat,
          lng: landmark.lng,
          items: [],
        });
      }
      groups.get(key).items.push(landmark);
    });

    return [...groups.values()]
      .map((group) => ({
        ...group,
        category: dominantCategory(group.items),
      }))
      .sort((a, b) => b.items.length - a.items.length || a.city.localeCompare(b.city));
  }

  function dominantCategory(items) {
    const counts = items.reduce((mapByCategory, item) => {
      mapByCategory.set(item.category, (mapByCategory.get(item.category) || 0) + 1);
      return mapByCategory;
    }, new Map());
    return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "landmark";
  }

  function renderList() {
    const fragment = document.createDocumentFragment();

    visibleLandmarks.forEach((landmark) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "landmark-row";
      row.innerHTML = `
        ${categoryIconMarkup(landmark.category, "row-icon")}
        <span>
          <span class="row-title">${escapeHtml(landmark.name)}</span>
          <span class="row-meta">${escapeHtml(landmark.city)} · ${escapeHtml(countryLabelFor(landmark.country))} · ${escapeHtml(categoryLabelFor(landmark.category))}</span>
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
      const chip = document.createElement("span");
      chip.className = "legend-chip";
      chip.innerHTML = `
        ${categoryIconMarkup(key, "legend-dot")}
        ${escapeHtml(categoryLabelFor(key))}
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

  function createMapMarkerContent(landmark) {
    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = "google-result-marker";
    marker.title = landmark.name;
    marker.innerHTML = `<span class="sr-only">${escapeHtml(landmark.name)}</span>`;
    marker.addEventListener("click", (event) => {
      event.stopPropagation();
      const entry = markersById.get(landmark.id);
      if (entry) {
        openInfoWindow(entry.marker, landmark);
      }
    });
    return marker;
  }

  function createOpenMapLandmarkIcon(landmark) {
    return L.divIcon({
      className: "openmap-marker-wrap",
      html: `
        <span class="openmap-landmark-marker">
          <img src="${escapeHtml(landmark.iconPath)}" alt="" aria-hidden="true" loading="lazy" />
          <span>${escapeHtml(labelText(landmark.name))}</span>
        </span>
      `,
      iconSize: [96, 52],
      iconAnchor: [48, 28],
      popupAnchor: [0, -30],
    });
  }

  function createOpenMapCityIcon(group) {
    return L.divIcon({
      className: "openmap-marker-wrap",
      html: `
        <span class="openmap-city-marker">
          <span class="city-miniature" aria-hidden="true">
            <img src="assets/miniatures/types/${escapeHtml(categoryIconType(group.category))}.svg" alt="" loading="lazy" />
            <strong>${group.items.length}</strong>
          </span>
          <span class="city-marker-label">${escapeHtml(group.city)}</span>
          <span class="city-marker-hint">${escapeHtml(t("zoomPrompt"))}</span>
        </span>
      `,
      iconSize: [88, 58],
      iconAnchor: [44, 36],
      popupAnchor: [0, -38],
    });
  }

  function createPopup(landmark) {
    const mapsQuery = encodeURIComponent(`${landmark.name}, ${landmark.city}, ${landmark.country}`);
    const mediaFigure = landmark.media?.thumbnail
      ? `
        <figure class="popup-media">
          <img src="${escapeHtml(landmark.media.thumbnail)}" alt="${escapeHtml(landmark.name)}" loading="lazy" />
          ${
            landmark.media.pageUrl
              ? `<figcaption><a href="${escapeHtml(landmark.media.pageUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("mediaSource"))}</a></figcaption>`
              : ""
          }
        </figure>
      `
      : "";
    return `
      <article class="popup-card">
        <div class="popup-head">
          ${categoryIconMarkup(landmark.category, "popup-icon")}
          <div>
            <h2 class="popup-title">${escapeHtml(landmark.name)}</h2>
            <p class="popup-meta">${escapeHtml(landmark.city)} · ${escapeHtml(countryLabelFor(landmark.country))}</p>
          </div>
        </div>
        ${mediaFigure}
        <p class="popup-meta">${escapeHtml(continentLabelFor(landmark.continent))} · ${escapeHtml(categoryLabelFor(landmark.category))}</p>
        <p class="popup-description">${escapeHtml(createDescription(landmark))}</p>
        <a class="popup-link" href="https://www.google.com/maps/search/?api=1&query=${mapsQuery}" target="_blank" rel="noreferrer">
          <i class="fa-solid fa-map-location-dot" aria-hidden="true"></i>
          ${escapeHtml(t("openGoogleMaps"))}
        </a>
      </article>
    `;
  }

  function openOpenMapPopup(marker, landmark) {
    window.clearTimeout(openMapRenderTimer);
    openMapRenderTimer = 0;
    openMapPopupOpen = true;
    marker.bindPopup(createPopup(landmark), {
      className: "openmap-popup",
      autoPanPadding: [24, 24],
      closeOnClick: false,
      keepInView: true,
      maxHeight: 300,
      maxWidth: 320,
      minWidth: 260,
    });
    marker.openPopup();
  }

  function bindOpenMapPopupActions(event) {
    openMapPopupOpen = true;
    const popupElement = event.popup.getElement();

    if (!popupElement) {
      return;
    }

    L.DomEvent.disableClickPropagation(popupElement);
    L.DomEvent.disableScrollPropagation(popupElement);
    popupElement.querySelectorAll(".city-popup-item").forEach((button) => {
      button.addEventListener("click", () => {
        focusOpenMapLandmark(button.dataset.landmarkId);
      });
    });
  }

  function showMapToast(messageKey) {
    const toast = document.createElement("div");
    toast.className = "map-toast";
    toast.textContent = t(messageKey);
    elements.map.appendChild(toast);
    window.setTimeout(() => toast.remove(), 4200);
  }

  function labelText(name) {
    return name.replace(/\s+[–|].*$/, "").replace(/\([^)]*\)/g, "").trim();
  }

  function openInfoWindow(marker, landmark) {
    if (!infoWindow) {
      return;
    }
    infoWindow.setContent(createPopup(landmark));
    infoWindow.open({
      map,
      anchor: marker,
    });
  }

  function categoryIconMarkup(categoryKey, className) {
    const iconClasses = {
      museum: "fa-landmark",
      faith: "fa-place-of-worship",
      palace: "fa-chess-rook",
      tower: "fa-building",
      monument: "fa-monument",
      civic: "fa-building-columns",
      culture: "fa-masks-theater",
      science: "fa-flask",
      sports: "fa-futbol",
      landmark: "fa-location-dot",
    };
    const category = CATEGORY_DEFINITIONS[categoryKey] || CATEGORY_DEFINITIONS.landmark;
    const iconClass = iconClasses[categoryKey] || iconClasses.landmark;
    return `
      <span class="${className}" style="--marker-color: ${escapeHtml(category.color)}" aria-hidden="true">
        <i class="fa-solid ${iconClass}"></i>
      </span>
    `;
  }

  function categoryIconType(categoryKey) {
    const type = CATEGORY_DEFINITIONS[categoryKey]?.icon || "generic";
    return type === "culture" ? "theater" : type;
  }

  function focusLandmark(id) {
    if (currentProvider === "openmap") {
      focusOpenMapLandmark(id);
      return;
    }

    if (!map) {
      showApiKeyPanel("apiLoadMapFirst", false);
      return;
    }
    const entry = markersById.get(id);
    if (!entry) {
      return;
    }
    map.panTo(entry.marker.position);
    map.setZoom(Math.max(map.getZoom() || DEFAULT_ZOOM, 14));
    openInfoWindow(entry.marker, entry.landmark);
  }

  function focusOpenMapLandmark(id) {
    if (!map || !window.L) {
      return;
    }

    scrollMapIntoView();
    const landmark = visibleLandmarks.find((item) => item.id === id) || landmarks.find((item) => item.id === id);
    if (!landmark) {
      return;
    }

    const target = [landmark.plotLat, landmark.plotLng];
    const targetZoom = Math.max(map.getZoom() || DEFAULT_ZOOM, 14);
    let didOpen = false;
    const openAfterMove = () => {
      if (didOpen) {
        return;
      }
      didOpen = true;
      renderOpenMapMarkers();
      const entry = markersById.get(id);
      if (entry) {
        openOpenMapPopup(entry.marker, entry.landmark);
      }
    };

    map.once("moveend", openAfterMove);
    map.flyTo(target, targetZoom, { duration: 0.35 });
    window.setTimeout(openAfterMove, 700);
  }

  function scrollMapIntoView() {
    if (!window.matchMedia("(max-width: 680px)").matches) {
      return;
    }

    elements.mapPane.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }

  function fitVisibleMarkers() {
    if (currentProvider === "openmap") {
      if (!map || !window.L) {
        return;
      }

      if (!visibleLandmarks.length) {
        map.setView([DEFAULT_CENTER.lat, DEFAULT_CENTER.lng], DEFAULT_ZOOM);
        return;
      }

      if (visibleLandmarks.length === 1) {
        const [landmark] = visibleLandmarks;
        map.flyTo([landmark.plotLat, landmark.plotLng], 14, { duration: 0.3 });
        return;
      }

      const bounds = L.latLngBounds(visibleLandmarks.map((item) => [item.plotLat, item.plotLng]));
      const maxZoom = visibleLandmarks.length <= OPENMAP_INDIVIDUAL_LIMIT ? 12 : 5;
      map.fitBounds(bounds, {
        padding: [58, 58],
        maxZoom,
      });
      return;
    }

    if (!map || !mapsApi?.LatLngBounds) {
      showApiKeyPanel("apiLoadMapFirst", false);
      return;
    }

    if (!visibleLandmarks.length) {
      map.setCenter(DEFAULT_CENTER);
      map.setZoom(DEFAULT_ZOOM);
      return;
    }

    if (visibleLandmarks.length === 1) {
      const [landmark] = visibleLandmarks;
      map.panTo({ lat: landmark.plotLat, lng: landmark.plotLng });
      map.setZoom(14);
      return;
    }

    const bounds = new mapsApi.LatLngBounds();
    visibleLandmarks.forEach((item) => {
      bounds.extend({ lat: item.plotLat, lng: item.plotLng });
    });
    map.fitBounds(bounds, 64);
    google.maps.event.addListenerOnce(map, "idle", () => {
      if ((map.getZoom() || DEFAULT_ZOOM) > 12) {
        map.setZoom(12);
      }
    });
  }

  function clearGoogleMarkers() {
    markersById.forEach(({ marker }) => {
      if (marker && "map" in marker) {
        marker.map = null;
      }
    });
    markersById.clear();
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
