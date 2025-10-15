type OpportunityTierBase = "Tier-1" | "Tier-2" | "Emerging";

export type OpportunityTier = "All" | OpportunityTierBase;

export type Persona = {
  title: string;
  description: string;
  bullets: string[];
};

export type CityOpportunity = {
  slug: string;
  name: string;
  state: string;
  tier: OpportunityTierBase;
  score: number;
  demandScore: number;
  competitionScore: number;
  growthTrend: number[];
  opportunitySignals: string[];
  persona: Persona;
  strategyPlays: string[];
  coordinates: { left: string; top: string };
  topCustomerSegments: string[];
  recommendedCategories: string[];
};

export type BusinessProfile = {
  productCategory: string;
  baseCity: string;
};

export const productCategories: string[] = [
  "Handcrafted Leather Goods",
  "Organic Spices",
  "Sustainable Packaging",
  "Custom Software Development",
  "Artisanal Home Decor",
  "Functional Ceramics",
  "Cold-Pressed Oils",
  "Precision Auto Components",
];

export const operatingCities: string[] = [
  "Jaipur",
  "Surat",
  "Ahmedabad",
  "Pune",
  "Indore",
  "Bengaluru",
  "Kochi",
  "Hyderabad",
  "Chandigarh",
];

export const cityOpportunities: CityOpportunity[] = [
  {
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    tier: "Tier-1",
    score: 88,
    demandScore: 92,
    competitionScore: 58,
    growthTrend: [42, 44, 48, 53, 56, 60, 65, 69, 72, 77, 81, 86],
    opportunitySignals: [
      "Monthly search interest up 34% YoY",
      "D2C marketplaces adding Pune-specific leather curation",
      "Airport retail looking for premium sustainable craft labels",
    ],
    persona: {
      title: "Conscious Tech Professional",
      description:
        "Young IT & consulting workforce with high disposable income seeking statement accessories that signal craft and sustainability.",
      bullets: [
        "Age 25-38, average monthly income ₹1.6L",
        "Buys during pay-week & festive drops",
        "Discovers via Instagram reels & workplace communities",
      ],
    },
    strategyPlays: [
      "Launch a limited ‘Workday to Weekend’ collection with try-at-office concierge.",
      "Partner with Hinjawadi co-working hubs for payday trunk shows.",
      "Target Instagram and LinkedIn ads around sustainability & craftsmanship cues.",
    ],
    coordinates: { left: "36%", top: "64%" },
    topCustomerSegments: ["IT Services", "Creative Agencies", "Premium Retail"],
    recommendedCategories: [
      "Handcrafted Leather Goods",
      "Sustainable Packaging",
      "Artisanal Home Decor",
    ],
  },
  {
    slug: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    tier: "Tier-1",
    score: 82,
    demandScore: 88,
    competitionScore: 66,
    growthTrend: [48, 50, 52, 55, 59, 63, 68, 71, 74, 79, 83, 87],
    opportunitySignals: [
      "Luxury pop-ups selling out in Indiranagar",
      "Corporate gifting budgets expanding for eco-premium accessories",
      "Metro ridership campaigns driving discovery of local craft brands",
    ],
    persona: {
      title: "Design-Led Entrepreneur",
      description:
        "Startup founders and senior product leaders who value craftsmanship and limited drops to stand out in the workspace.",
      bullets: [
        "Age 28-42, income ₹2.2L+ per month",
        "Collects brands with authentic founding stories",
        "Active on Threads, Product Hunt, and D2C WhatsApp communities",
      ],
    },
    strategyPlays: [
      "Co-create a capsule line with a well-known UX designer from the city.",
      "Build corporate gifting packs around sustainability commitments.",
      "Run geo-fenced ads during tech conferences and design festivals.",
    ],
    coordinates: { left: "35%", top: "72%" },
    topCustomerSegments: ["Technology", "Corporate Gifting", "D2C Retail"],
    recommendedCategories: [
      "Handcrafted Leather Goods",
      "Custom Software Development",
      "Sustainable Packaging",
    ],
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    tier: "Tier-1",
    score: 76,
    demandScore: 82,
    competitionScore: 72,
    growthTrend: [36, 38, 41, 45, 49, 52, 56, 59, 62, 66, 70, 73],
    opportunitySignals: [
      "Charminar night markets showcasing premium craft stalls",
      "IT corridor employees seeking functional yet premium accessories",
      "Hyderabad Airport retail curating sustainable travel kits",
    ],
    persona: {
      title: "Global Services Professional",
      description:
        "Consultants and finance leaders with international travel exposure looking for Indian craftsmanship with global quality cues.",
      bullets: [
        "Age 30-45, income ₹1.8L+ per month",
        "Shops during international travel & premium mall visits",
        "Follows sustainability influencers and travel bloggers",
      ],
    },
    strategyPlays: [
      "Introduce travel-themed collections with RFID protection and modular add-ons.",
      "Secure placements at Gachibowli premium retail arcades.",
      "Run remarketing funnels targeting airport lounge Wi-Fi users.",
    ],
    coordinates: { left: "40%", top: "74%" },
    topCustomerSegments: ["IT Services", "Consulting", "Travel Retail"],
    recommendedCategories: [
      "Handcrafted Leather Goods",
      "Custom Software Development",
      "Cold-Pressed Oils",
    ],
  },
  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    tier: "Tier-2",
    score: 79,
    demandScore: 84,
    competitionScore: 61,
    growthTrend: [28, 30, 32, 35, 38, 42, 46, 49, 53, 57, 62, 66],
    opportunitySignals: [
      "Navratri pop-ups scouting premium accessory partners",
      "Corporate gifting budgets rising within textile exporters",
      "Growing D2C consumer base on Meesho and Flipkart",
    ],
    persona: {
      title: "Export House Curator",
      description:
        "Family-run export owners modernising their brand aesthetic with premium, ethical accessory partners.",
      bullets: [
        "Age 32-50, business income ₹3.5Cr+",
        "Purchases in bulk for gifting & trade delegations",
        "Relies on references via industry WhatsApp groups",
      ],
    },
    strategyPlays: [
      "Offer custom monogramming for exporter gifting hampers.",
      "Host private previews at textile association events.",
      "Activate Gujarati influencer collabs during festive shopping windows.",
    ],
    coordinates: { left: "24%", top: "56%" },
    topCustomerSegments: [
      "Export Houses",
      "Corporate Gifting",
      "Premium Retail",
    ],
    recommendedCategories: [
      "Handcrafted Leather Goods",
      "Organic Spices",
      "Sustainable Packaging",
    ],
  },
  {
    slug: "surat",
    name: "Surat",
    state: "Gujarat",
    tier: "Tier-2",
    score: 71,
    demandScore: 76,
    competitionScore: 68,
    growthTrend: [26, 27, 30, 32, 35, 38, 41, 43, 46, 50, 53, 56],
    opportunitySignals: [
      "Diamond exporters rewarding top performers with premium accessories",
      "New boutique hotels curating sustainable welcome gifts",
      "Local creator economy amplifying fashion-forward micro-brands",
    ],
    persona: {
      title: "Luxury Export Buyer",
      description:
        "Second-generation textile and diamond entrepreneurs gifting premium accessories to retain talent and clientele.",
      bullets: [
        "Age 30-48, family business ₹4Cr+",
        "Buys quarterly for talent retention programs",
        "Discovers brands via trade associations and private events",
      ],
    },
    strategyPlays: [
      "Design loyalty gift sets with artisan storytelling.",
      "Facilitate bespoke orders aligned to export brand palettes.",
      "Deploy sales pods around textile park corporate offices.",
    ],
    coordinates: { left: "22%", top: "61%" },
    topCustomerSegments: ["Textile", "Diamonds", "Hospitality"],
    recommendedCategories: [
      "Handcrafted Leather Goods",
      "Sustainable Packaging",
      "Precision Auto Components",
    ],
  },
  {
    slug: "chandigarh",
    name: "Chandigarh",
    state: "Chandigarh",
    tier: "Emerging",
    score: 68,
    demandScore: 72,
    competitionScore: 54,
    growthTrend: [18, 20, 22, 25, 28, 32, 36, 39, 43, 47, 51, 55],
    opportunitySignals: [
      "Luxury weekend markets showcasing north Indian craft",
      "High-end boutique hotels sourcing sustainable welcome kits",
      "Influencers spotlighting conscious home-office accessories",
    ],
    persona: {
      title: "Boutique Lifestyle Curator",
      description:
        "Design-forward homemakers and boutique owners curating premium accessories for retail shelves and gifting.",
      bullets: [
        "Age 26-40, household income ₹1.2Cr+",
        "Shops across Elante Mall and curated Instagram stores",
        "Engages with Pinterest and architectural digest content",
      ],
    },
    strategyPlays: [
      "Develop weekend pop-up experiences at luxury cafes.",
      "Collaborate with boutique hotels on sustainable gift suites.",
      "Run targeted Pinterest and Instagram carousel ads featuring artisans.",
    ],
    coordinates: { left: "33%", top: "34%" },
    topCustomerSegments: ["Boutique Retail", "Hospitality", "Home Decor"],
    recommendedCategories: [
      "Handcrafted Leather Goods",
      "Artisanal Home Decor",
      "Organic Spices",
    ],
  },
  {
    slug: "indore",
    name: "Indore",
    state: "Madhya Pradesh",
    tier: "Emerging",
    score: 66,
    demandScore: 70,
    competitionScore: 57,
    growthTrend: [16, 18, 19, 21, 24, 27, 30, 33, 36, 40, 43, 47],
    opportunitySignals: [
      "Tier-2 aspirational shoppers following metro city trends",
      "Vibrant night market experiences seeking premium accessories",
      "Local creator collectives promoting conscious fashion",
    ],
    persona: {
      title: "Aspirational Professional",
      description:
        "Young finance and marketing executives investing in signature pieces to elevate their personal brand.",
      bullets: [
        "Age 24-34, income ₹80K+ per month",
        "Shops during payday weekends and festival sales",
        "Influenced by LinkedIn leaders and YouTube creators",
      ],
    },
    strategyPlays: [
      "Host experiential styling sessions at premium salons.",
      "Bundle accessories with local designer apparel brands.",
      "Run creator-led TikTok and Instagram live sessions with flash drops.",
    ],
    coordinates: { left: "30%", top: "58%" },
    topCustomerSegments: ["Finance", "Marketing", "Lifestyle Retail"],
    recommendedCategories: [
      "Handcrafted Leather Goods",
      "Artisanal Home Decor",
      "Cold-Pressed Oils",
    ],
  },
  {
    slug: "kochi",
    name: "Kochi",
    state: "Kerala",
    tier: "Emerging",
    score: 64,
    demandScore: 68,
    competitionScore: 52,
    growthTrend: [14, 16, 18, 19, 22, 24, 27, 29, 32, 35, 38, 41],
    opportunitySignals: [
      "Cruise tourism curating premium duty-free craft",
      "Expats and NRIs shopping during annual visits",
      "Design collectives highlighting sustainable coastal brands",
    ],
    persona: {
      title: "Global Kerala Diaspora",
      description:
        "Returning NRIs and tourists with affinity for meaningful souvenirs and premium ethical craftsmanship.",
      bullets: [
        "Age 30-48, global income ₹1Cr+",
        "Purchases in high-ticket bursts during visits",
        "Discovers via travel blogs, boutique resorts, and Instagram guides",
      ],
    },
    strategyPlays: [
      "Create heritage-inspired travel kits with lifetime repair guarantees.",
      "Partner with luxury houseboats & resorts for curated gift suites.",
      "Run geotargeted campaigns during Onam and Christmas travel windows.",
    ],
    coordinates: { left: "31%", top: "80%" },
    topCustomerSegments: ["Tourism", "Hospitality", "Diaspora Retail"],
    recommendedCategories: [
      "Handcrafted Leather Goods",
      "Organic Spices",
      "Cold-Pressed Oils",
    ],
  },
];

export const initialProfile: BusinessProfile = {
  productCategory: "Handcrafted Leather Goods",
  baseCity: "Jaipur",
};

export const opportunityFilters: OpportunityTier[] = [
  "All",
  "Tier-1",
  "Tier-2",
  "Emerging",
];
