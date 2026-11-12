export interface Villa {
  id: string;
  name: string;
  tagline: string;
  category: string;
  sqm: number;
  capacity: string;
  bed: string;
  poolType: string;
  pricePerNight: number;
  description: string;
  coverImage: string;
  gallery: { url: string; caption: string }[];
  features: string[];
  specs: { label: string; value: string }[];
  floorPlanSummary: string;
}

export interface DiningVenue {
  id: string;
  name: string;
  subtitle: string;
  concept: string;
  hours: string;
  dressCode: string;
  sommelierHighlight: string;
  image: string;
  featuredDishes: { name: string; notes: string }[];
}

export interface SpaTreatment {
  id: string;
  title: string;
  duration: string;
  price: number;
  description: string;
  focus: string;
}

export interface Experience {
  id: string;
  title: string;
  duration: string;
  timing: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  highlights: string[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'architecture' | 'villas' | 'dining' | 'wellness' | 'nature';
  imageUrl: string;
  imagePosition?: string;
  cameraExif: string;
  location: string;
  aspect: 'landscape' | 'portrait' | 'wide';
}

export const RESORT_DATA = {
  name: "Aura",
  established: 2021,
  elevation: "1,420m Above Sea Level",
  location: "Valle di Sole, Alpine Dolomite Range",
  coordinates: "46°21'32\"N 10°52'19\"E",
  // User-provided real resort photography assets
  userImages: {
    heroHillsideRetreat: "/assets/hero-hillside-retreat.jpg",
    cliffTimberBungalow: "/assets/gallery-cliff-timber-bungalow.jpg",
    mountainRidgeGrounds: "/assets/gallery-mountain-ridge-grounds.jpg",
    hillsideTwinVillas: "/assets/gallery-hillside-twin-villas.jpg",
    colonialManorEstate: "/assets/gallery-colonial-manor-estate.jpg",
    teaValleyTrail: "/assets/aistudio/cb6b93e93c3a24143083eef6350ab534_cd4c702d.jpg",
    stoneCottage: "/assets/aistudio/53648d5ddcc5a3211416b17975e2712e_d05d197b.jpg",
    emeraldLake: "/assets/aistudio/13a9fc9d840154fec5f5a4ffc1093d5c_5ec2d6eb.jpg",
    mistyChalet: "/assets/aistudio/b01d3d3e628697c8bb82c00b8cd96ff1_2e27420a.jpg"
  },
  heroDroneImage: "/assets/hero-hillside-retreat.jpg",
  infinityPoolImage: "/assets/gallery-hillside-twin-villas.jpg",
  bedroomInteriorImage: "/assets/gallery-cliff-timber-bungalow.jpg",
  diningTwilightImage: "/assets/gallery-colonial-manor-estate.jpg",
  spaWellnessImage: "/assets/aistudio/53648d5ddcc5a3211416b17975e2712e_d05d197b.jpg",
  naturePathwayImage: "/assets/hero-hillside-retreat.jpg",
  
  stats: [
    { label: "Private Acreage", value: "320 Hectares" },
    { label: "Private Villas", value: "18 Residences" },
    { label: "Thermal Spring Temp", value: "38.5°C" },
    { label: "Elevation", value: "1,420 Meters" },
  ],

  villas: [
    {
      id: "celestial-horizon",
      name: "The Celestial Horizon Villa",
      tagline: "Cantilevered glass pavilion overlooking sunlit tea terraces and mountain ridges",
      category: "Cliffside Residence",
      sqm: 460,
      capacity: "Up to 4 Guests",
      bed: "Two King Master Bedrooms",
      poolType: "22m Heated Mineral Infinity Pool",
      pricePerNight: 2850,
      description: "Perched dramatically above the mist layer, the Celestial Horizon Villa combines warm timber and floor-to-ceiling glass framing unobstructed views of lush mountain terraces and golden sunrise.",
      coverImage: "/assets/gallery-hillside-twin-villas.jpg",
      gallery: [
        { url: "/assets/gallery-hillside-twin-villas.jpg", caption: "Hillside twin villas framed by lush mountain greenery" },
        { url: "/assets/aistudio/cb6b93e93c3a24143083eef6350ab534_cd4c702d.jpg", caption: "Sun-drenched morning trails through the private estate" },
        { url: "/assets/aistudio/13a9fc9d840154fec5f5a4ffc1093d5c_5ec2d6eb.jpg", caption: "Emerald mountain lake panorama visible from the upper terrace" }
      ],
      features: [
        "Private 22-meter heated alpine infinity pool",
        "Panoramic Finnish dry sauna with glazed forest wall",
        "Dedicated 24-hour private sanctuary butler",
        "Sub-zero temperature-controlled wine room",
        "Handcrafted larch wood dining terrace for 8 guests",
        "Complimentary evening fireside aperitivo"
      ],
      specs: [
        { label: "Interior Living Area", value: "340 m²" },
        { label: "Exterior Teak Decks", value: "120 m²" },
        { label: "Bathrooms", value: "2 En-suite with volcanic baths" },
        { label: "Exposure", value: "South-West sunset facing" }
      ],
      floorPlanSummary: "Two symmetrical master suites flanking a soaring double-height stone living pavilion with suspended wood stove and floating outdoor terrace."
    },
    {
      id: "ancient-pine-pavilion",
      name: "The Ancient Pine Pavilion",
      tagline: "Deep secluded luxury immersed inside old-growth cedar and stone garden cottage",
      category: "Forest Pavilion",
      sqm: 320,
      capacity: "2 Guests",
      bed: "One Signature King Suite",
      poolType: "Private Cedar Hot Spring Tub",
      pricePerNight: 1950,
      description: "Nestled directly into the whispering evergreen forest, this stone and cedar pavilion features manicured lawns, heated slate radiant floors, and an outdoor stone hot spring onsen fed by natural mountain springs.",
      coverImage: "/assets/aistudio/53648d5ddcc5a3211416b17975e2712e_d05d197b.jpg",
      gallery: [
        { url: "/assets/aistudio/53648d5ddcc5a3211416b17975e2712e_d05d197b.jpg", caption: "Forest stone cottage and lawn framed by pine slopes" },
        { url: "/assets/gallery-cliff-timber-bungalow.jpg", caption: "Timber balcony deck overlooking emerald mountain cliffs" },
        { url: "/assets/aistudio/cb6b93e93c3a24143083eef6350ab534_cd4c702d.jpg", caption: "Direct access to sunlit forest hiking and tea plantation trails" }
      ],
      features: [
        "Private mineral-fed outdoor cedar onsen tub",
        "Wood-burning Swedish fireplace with seasoned birch logs",
        "High-definition telescope for alpine astrophotography",
        "Bang & Olufsen bespoke acoustic sound architecture",
        "In-villa organic apothecary tea and botanical bar",
        "Private path leading to meditation forest platform"
      ],
      specs: [
        { label: "Interior Living Area", value: "220 m²" },
        { label: "Exterior Teak Decks", value: "100 m²" },
        { label: "Bathrooms", value: "1 Spa bath with rain shower & steam" },
        { label: "Exposure", value: "East morning-light facing" }
      ],
      floorPlanSummary: "Open-concept circular sanctuary centered around an architectural hearth, opening via three pocket-glass doors onto an ancient moss glade."
    },
    {
      id: "ridge-valley-suite",
      name: "The Ridge Valley Residence",
      tagline: "Unobstructed panorama of mountain mist waterfalls and cloud inversions",
      category: "Panoramic Villa",
      sqm: 380,
      capacity: "Up to 3 Guests",
      bed: "One King + One Daybed Pavilion",
      poolType: "14m Glass-Front Infinity Plunge Pool",
      pricePerNight: 2350,
      description: "Suspended on a scenic promontory, the Ridge Valley Residence offers front-row seats to the drama of shifting mountain weather and valley mist rivers. Enjoy dawn tranquility on your stone and cedar terrace.",
      coverImage: "/assets/hero-hillside-retreat.jpg",
      gallery: [
        { url: "/assets/hero-hillside-retreat.jpg", caption: "Terraced hillside cottages and winding stone garden stairs" },
        { url: "/assets/gallery-mountain-ridge-grounds.jpg", caption: "Mountain ridge courtyard and firepit overlooking the valley" },
        { url: "/assets/aistudio/13a9fc9d840154fec5f5a4ffc1093d5c_5ec2d6eb.jpg", caption: "Lake and valley vistas surrounding the property" }
      ],
      features: [
        "14-meter heated glass-front cantilever plunge pool",
        "Sunken fire pit with continuous mountain panorama",
        "Private outdoor shower set within wild thyme gardens",
        "Custom mattress crafted with organic wool and horsehair",
        "Daily in-villa sommelier wine pairing flight",
        "Private golf cart with chauffeur service"
      ],
      specs: [
        { label: "Interior Living Area", value: "260 m²" },
        { label: "Exterior Teak Decks", value: "120 m²" },
        { label: "Bathrooms", value: "2 Full bathrooms with marble tubs" },
        { label: "Exposure", value: "360-degree panoramic ridge" }
      ],
      floorPlanSummary: "Linear architectural wing maximizing natural southern solar gain, featuring private bedroom sanctuary, library study, and outdoor thermal lounge."
    },
    {
      id: "grand-estate",
      name: "The Grand Alpine Estate",
      tagline: "The crown retreat: secluded estate nestled in rolling misty tea hills",
      category: "Presidential Estate",
      sqm: 680,
      capacity: "Up to 8 Guests",
      bed: "Four Master Suites",
      poolType: "28m Olympic Heated Stone Pool & Spa",
      pricePerNight: 5400,
      description: "Our signature estate encompasses panoramic pavilions set within acres of manicured wild tea gardens and pine forests. Designed for discerning families and private parties seeking supreme seclusion.",
      coverImage: "/assets/aistudio/b01d3d3e628697c8bb82c00b8cd96ff1_2e27420a.jpg",
      gallery: [
        { url: "/assets/aistudio/b01d3d3e628697c8bb82c00b8cd96ff1_2e27420a.jpg", caption: "Estate chalet enveloped in peaceful morning mist and tea hills" },
        { url: "/assets/aistudio/cb6b93e93c3a24143083eef6350ab534_cd4c702d.jpg", caption: "Sunlit trail leading directly to the grand estate pavilions" },
        { url: "/assets/aistudio/13a9fc9d840154fec5f5a4ffc1093d5c_5ec2d6eb.jpg", caption: "Private panoramic lake and valley expedition grounds" }
      ],
      features: [
        "28-meter private heated black-granite pool and hot spring spa",
        "Full commercial kitchen with dedicated private estate chef",
        "Private helipad access for seamless arrivals",
        "Screening salon with acoustic acoustic panelling and 4K cinema",
        "Dedicated fleet of electric luxury vehicles",
        "Exclusive access to private high-altitude wine reserve"
      ],
      specs: [
        { label: "Interior Living Area", value: "520 m²" },
        { label: "Exterior Teak Decks", value: "160 m²" },
        { label: "Bathrooms", value: "4 En-suite + 2 powder rooms" },
        { label: "Exposure", value: "Private secluded southern valley" }
      ],
      floorPlanSummary: "Central cathedral living pavilion connecting via glass sky bridges to East and West accommodation wings, overlooking private thermal cascades."
    }
  ] as Villa[],

  dining: [
    {
      id: "embers-pine",
      name: "Embers & Pine",
      subtitle: "Three Michelin Star Gastronomy",
      concept: "Hyper-local alpine terroir gastronomy crafted over open birch embers, incorporating wild herbs, mountain mushrooms, and heirloom cultivars.",
      hours: "Dinner: 18:30 – 22:30 (Tuesday to Sunday)",
      dressCode: "Smart Casual / Mountain Elegance",
      sommelierHighlight: "Cellar of 4,800 biodynamic and vintage bottles curated by Master Sommelier Elena Vane.",
      image: "/assets/gallery-colonial-manor-estate.jpg",
      featuredDishes: [
        { name: "Smoked Alpine Char in Pine Ash", notes: "Fermented juniper emulsion, pickled lingonberries, spruce tip oil" },
        { name: "Aged Venison Loin over Sweet Birch", notes: "Wild mountain morels, roasted sunchoke, black truffle broth" },
        { name: "Mead & Glacier Honey Parfait", notes: "Alpine blossom crisp, frozen mountain sorrel granite" }
      ]
    },
    {
      id: "the-lantern-veranda",
      name: "The Lantern Veranda",
      subtitle: "Forest Canopy All-Day Dining & Afternoon Tea",
      concept: "Suspended among century-old fir trees, serving wood-fired morning breads, mountain herbal teas, and vibrant midday salads.",
      hours: "Breakfast: 07:00 – 11:00 · Lunch: 12:30 – 15:30 · Tea: 16:00 – 18:00",
      dressCode: "Resort Casual",
      sommelierHighlight: "Estate-foraged wild herbal infusions and biodynamic sparkling wines.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
      featuredDishes: [
        { name: "Wood-Fired Sourdough & Mountain Butter", notes: "Cultured alpine butter, pine honey, wildflower pollen" },
        { name: "Canopy Chanterelle Broth & Hand-Rolled Pasta", notes: "Wild thyme butter, 36-month mountain parmigiano" },
        { name: "Alpine Berry Tartlet with Goat Milk Gelato", notes: "Foraged mountain blueberries, toasted hazelnut crust" }
      ]
    },
    {
      id: "the-granite-cellar",
      name: "The Subterranean Granite Cellar",
      subtitle: "Private Sommelier Tastings & Rare Vintages",
      concept: "Carved into the natural mountain bedrock, maintaining a constant natural 12°C temperature for rare Barolos, Burgundies, and cult Swiss-Italian alpine wines.",
      hours: "Tastings: 17:00 – 21:00 (Reservation required)",
      dressCode: "Warm Layers Advised (12°C ambient)",
      sommelierHighlight: "Vertical collections dating back to 1968 and rare zero-intervention amphora wines.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=80",
      featuredDishes: [
        { name: "Artisanal Alpine Cheese Flight", notes: "Aged in regional hay caves, paired with 25-year aged balsamic" },
        { name: "Cured Duck Prosciutto & Mountain Figs", notes: "Rosemary smoked sea salt, biodynamic olive nectar" }
      ]
    }
  ] as DiningVenue[],

  spaTreatments: [
    {
      id: "volcanic-thermal-ritual",
      title: "Alpine Thermal Stone & Wild Arnica Immersion",
      duration: "90 Minutes",
      price: 380,
      description: "Heated basalt river stones steeped in mountain arnica oil melt deep muscular tension, followed by immersion in private mineral thermal waters.",
      focus: "Muscle Recovery & Deep Grounding"
    },
    {
      id: "forest-oxygen-facial",
      title: "High-Altitude Forest Oxygen & Edelweiss Facial",
      duration: "75 Minutes",
      price: 320,
      description: "Concentrated alpine edelweiss stem cells and hyperbaric oxygen replenish moisture compromised by crisp mountain altitudes.",
      focus: "Hydration, Radiance & Cellular Renewal"
    },
    {
      id: "sound-silence-meditation",
      title: "Tibetan Sound Resonance & Forest Pine Scrub",
      duration: "105 Minutes",
      price: 420,
      description: "Full-body exfoliation using stone-ground sea salt and crushed pine needles, harmonized by acoustic singing bowl vibrations in the cedar shala.",
      focus: "Nervous System Reset & Energetic Alignment"
    },
    {
      id: "couples-spring-ceremony",
      title: "The Twilight Hot Spring Couples Ceremony",
      duration: "120 Minutes",
      price: 760,
      description: "Private access to the lantern-lit volcanic rock onsen at twilight with rose petal bath, side-by-side bespoke massages, and vintage champagne.",
      focus: "Romantic Seclusion & Sensory Rejuvenation"
    }
  ] as SpaTreatment[],

  experiences: [
    {
      id: "hot-air-balloon",
      title: "Sunrise Cloud-River Hot Air Balloon Flight",
      duration: "3.5 Hours",
      timing: "Departs at 05:45 (Weather dependent)",
      tagline: "Ascend softly into the pink dawn light as the sun crowns the mountain glaciers",
      description: "Take off directly from our private mountain meadow. Float silently over misty pine valleys and sheer granite pinnacles, concluding with a champagne breakfast served in a secluded alpine clearing.",
      price: 850,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
      highlights: ["Private pilot & champagne service", "Panoramic aerial perspectives", "Meadow sunrise picnic"]
    },
    {
      id: "forest-bathing-trek",
      title: "Shinrin-Yoku Guided Canopy & Waterfall Trek",
      duration: "2.5 Hours",
      timing: "Morning 09:30 or Afternoon 14:00",
      tagline: "Guided mindful immersion through ancient old-growth pine groves and glacial falls",
      description: "Led by our resident botanist, awaken your senses through guided breathing exercises, barefoot moss walking, and natural cold-water immersion at a hidden mountain cascade.",
      price: 240,
      image: "/assets/aistudio/cb6b93e93c3a24143083eef6350ab534_cd4c702d.jpg",
      highlights: ["Resident master naturalist guide", "Glacial spring dip", "Foraged pine tea ceremony"]
    },
    {
      id: "helicopter-transfer",
      title: "Private Helicopter Valley Transfer & Glacier Safari",
      duration: "1.5 Hours",
      timing: "Flexible on demand",
      tagline: "Direct helipad transfer from Milan, Zurich, or Venice with aerial glacier orbit",
      description: "Bypass winding alpine roads. Touch down directly on the resort's private heated helipad following a breathtaking low-level flight across dramatic mountain peaks and crystalline mountain lakes.",
      price: 1850,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
      highlights: ["Airbus H130 luxury helicopter", "Direct helipad touchdown", "Glacier flyover photography"]
    },
    {
      id: "stargazing-observatory",
      title: "Dark Sky Stargazing with Resident Astronomer",
      duration: "2 Hours",
      timing: "Nightly at 21:30",
      tagline: "Certified dark sky zone revealing Saturn rings, Jupiter moons, and the Milky Way",
      description: "With zero light pollution at 1,420 meters elevation, peer through our 16-inch Takahashi reflector telescope while relaxing with warm cashmere blankets and spiced mountain cacao.",
      price: 180,
      image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80",
      highlights: ["16-inch professional telescope", "Resident astrophysicist commentary", "Cashmere blankets & warm drinks"]
    }
  ] as Experience[],

  gallery: [
    {
      id: "gal-user-7",
      title: "Thatched Timber Deck & Cliffside Mountain Vista",
      category: "villas",
      imageUrl: "/assets/gallery-cliff-timber-bungalow.jpg",
      cameraExif: "Leica Q3 · Summilux 28mm f/1.7 · ISO 100 · 1/400s",
      location: "Cliffside Timber Deck Bungalows",
      aspect: "portrait"
    },
    {
      id: "gal-user-8",
      title: "Highland Ridge Lawns, Firepit & Mountain Panorama",
      category: "nature",
      imageUrl: "/assets/gallery-mountain-ridge-grounds.jpg",
      cameraExif: "Sony A7R V · FE 16-35mm f/2.8 GM II · ISO 100 · 1/500s",
      location: "Upper Ridge Recreation Lawn",
      aspect: "portrait"
    },
    {
      id: "gal-user-9",
      title: "Hillside Terracotta Villas Amidst Tea Slopes",
      category: "architecture",
      imageUrl: "/assets/gallery-hillside-twin-villas.jpg",
      cameraExif: "Canon EOS R5 · RF 24-70mm f/2.8L · ISO 160 · 1/320s",
      location: "Emerald Slope Twin Residences",
      aspect: "portrait"
    },
    {
      id: "gal-user-10",
      title: "Colonial Estate Manor & Misty Forest Gardens",
      category: "architecture",
      imageUrl: "/assets/gallery-colonial-manor-estate.jpg",
      cameraExif: "Fujifilm GFX 100 II · GF 32-64mm f/4 · ISO 200 · 1/250s",
      location: "Main Estate Courtyard & Terrace",
      aspect: "portrait"
    },
    {
      id: "gal-user-1",
      title: "Sunlit Emerald Tea Valley & Mountain Trail",
      category: "nature",
      imageUrl: "/assets/aistudio/cb6b93e93c3a24143083eef6350ab534_cd4c702d.jpg",
      cameraExif: "Hasselblad X2D 100C · XCD 38mm f/2.5 V · ISO 100 · 1/320s",
      location: "High Ridge Valley Plantation",
      aspect: "portrait"
    },
    {
      id: "gal-user-11",
      title: "Terraced Hillside Cottages & Stone Stairways",
      category: "architecture",
      imageUrl: "/assets/hero-hillside-retreat.jpg",
      cameraExif: "Leica SL2 · APO-Summicron-SL 35mm f/2 · ISO 160 · 1/250s",
      location: "Aura Valley Terraced Garden Wing",
      aspect: "portrait"
    },
    {
      id: "gal-user-4",
      title: "Forest Stone Cottage & Manicured Lawn",
      category: "villas",
      imageUrl: "/assets/aistudio/53648d5ddcc5a3211416b17975e2712e_d05d197b.jpg",
      cameraExif: "Canon EOS R5 · RF 24-105mm f/4L IS · ISO 200 · 1/250s",
      location: "Pine Crest Garden Chalet",
      aspect: "portrait"
    },
    {
      id: "gal-user-5",
      title: "Sunlit Mountain Lake & Terraced Valley",
      category: "nature",
      imageUrl: "/assets/aistudio/13a9fc9d840154fec5f5a4ffc1093d5c_5ec2d6eb.jpg",
      cameraExif: "Fujifilm GFX 100 II · GF 45-100mm f/4 · ISO 125 · 1/400s",
      location: "Glacial Valley Lake Basin",
      aspect: "portrait"
    },
    {
      id: "gal-user-6",
      title: "Misty Tea Plantation Cottage Shrouded in Clouds",
      category: "villas",
      imageUrl: "/assets/aistudio/b01d3d3e628697c8bb82c00b8cd96ff1_2e27420a.jpg",
      cameraExif: "Nikon Z8 · NIKKOR Z 24-70mm f/2.8 S · ISO 250 · 1/160s",
      location: "Tea Estate Cloud Sanctuary",
      aspect: "portrait"
    },
    {
      id: "gal-room-1",
      title: "Classic Twin Room Interior",
      category: "villas",
      imageUrl: "/assets/facility-room-01.jpg",
      imagePosition: "object-[50%_62%]",
      cameraExif: "28mm · f/2.8 · ISO 200 · Warm Brick Wing",
      location: "Classic Twin Room",
      aspect: "portrait"
    },
    {
      id: "gal-room-2",
      title: "Spacious Family Twin Suite",
      category: "villas",
      imageUrl: "/assets/facility-room-02.jpg",
      imagePosition: "object-[50%_68%]",
      cameraExif: "24mm · f/2.8 · ISO 250 · Family Wing",
      location: "Spacious Family Twin",
      aspect: "portrait"
    },
    {
      id: "gal-room-3",
      title: "Balcony Garden Twin View",
      category: "villas",
      imageUrl: "/assets/facility-room-03.jpg",
      imagePosition: "object-[50%_64%]",
      cameraExif: "24mm · f/4 · ISO 160 · Garden Wing",
      location: "Balcony Garden Twin",
      aspect: "portrait"
    },
    {
      id: "gal-room-4",
      title: "Garden Veranda King Suite",
      category: "villas",
      imageUrl: "/assets/facility-room-04.jpg",
      imagePosition: "object-[50%_65%]",
      cameraExif: "28mm · f/2.8 · ISO 200 · Veranda Wing",
      location: "Garden Veranda Suite",
      aspect: "portrait"
    },
    {
      id: "gal-room-5",
      title: "Standard Comfort Queen Room",
      category: "villas",
      imageUrl: "/assets/facility-room-05.jpg",
      imagePosition: "object-[50%_66%]",
      cameraExif: "24mm · f/2.8 · ISO 200 · Comfort Wing",
      location: "Standard Comfort Queen",
      aspect: "portrait"
    },
    {
      id: "gal-room-6",
      title: "Palm View Timber Ceiling Twin",
      category: "villas",
      imageUrl: "/assets/facility-room-06.jpg",
      imagePosition: "object-[50%_58%]",
      cameraExif: "28mm · f/4 · ISO 125 · Palm Grove Wing",
      location: "Palm View Timber Twin",
      aspect: "portrait"
    },
    {
      id: "gal-room-7",
      title: "Tropical Terrace King Suite",
      category: "villas",
      imageUrl: "/assets/facility-room-07.jpg",
      imagePosition: "object-[50%_65%]",
      cameraExif: "28mm · f/4 · ISO 160 · Terrace Wing",
      location: "Tropical Terrace King",
      aspect: "portrait"
    }
  ] as GalleryPhoto[]
};
