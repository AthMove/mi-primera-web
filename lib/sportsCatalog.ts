export type SportsCategory = "PADEL" | "GOLF" | "TENIS" | "RUNNING";

export type SportsCatalog = Record<
  SportsCategory,
  Record<string, string[]>
>;

export const sportsCatalog: SportsCatalog = {
  PADEL: {
    Bullpadel: [
      "Vertex 04",
      "Hack 04",
      "XPLO",
      "Elite",
      "Neuron",
      "Ionic",
      "Flow",
    ],
    Nox: [
      "AT10 Genius",
      "ML10 Pro Cup",
      "LA10 Quantum",
      "VK10",
      "Equation",
      "Tempo",
    ],
    Adidas: [
      "Metalbone",
      "Metalbone HRD",
      "Adipower",
      "Cross IT",
      "Drive",
    ],
    Head: [
      "Speed Pro",
      "Speed Motion",
      "Extreme Pro",
      "Extreme Motion",
      "Alpha Pro",
    ],
    Siux: [
      "Fenix",
      "Electra",
      "Diablo",
      "Trilogy",
      "Pegasus",
    ],
    Babolat: [
      "Technical Viper",
      "Air Viper",
      "Counter Viper",
      "Technical Veron",
      "Air Veron",
    ],
    Wilson: [
      "Bela Pro",
      "Bela LT",
      "Blade Pro",
      "Blade Elite",
    ],
    ASICS: [],
  },

  GOLF: {
    TaylorMade: [
      "Qi35",
      "Qi10",
      "Stealth 2",
      "Stealth",
      "SIM2",
      "P790",
      "P770",
      "Spider",
    ],
    Callaway: [
      "Elyte",
      "Paradym Ai Smoke",
      "Paradym",
      "Rogue ST",
      "Apex",
      "Jaws",
      "Odyssey Ai-One",
    ],
    Titleist: [
      "GT2",
      "GT3",
      "TSR2",
      "TSR3",
      "T100",
      "T150",
      "Vokey SM10",
    ],
    Ping: [
      "G440",
      "G430",
      "G425",
      "i230",
      "Blueprint",
      "Glide",
    ],
    Cobra: [
      "DS-Adapt",
      "Darkspeed",
      "Aerojet",
      "King Tour",
      "King Forged Tec",
    ],
    Mizuno: [
      "ST-Max",
      "ST-Z",
      "JPX 925",
      "JPX 923",
      "Pro 241",
      "Pro 243",
    ],
    "Scotty Cameron": [
      "Newport",
      "Newport 2",
      "Phantom",
      "Fastback",
    ],
  },

  TENIS: {
    Wilson: [
      "Blade 98",
      "Blade 100",
      "Clash 100",
      "Pro Staff 97",
      "Ultra 100",
      "Shift 99",
    ],
    Babolat: [
      "Pure Drive",
      "Pure Aero",
      "Pure Strike",
      "Evo Drive",
    ],
    Head: [
      "Speed Pro",
      "Speed MP",
      "Radical Pro",
      "Radical MP",
      "Gravity Pro",
      "Extreme MP",
    ],
    Yonex: [
      "Ezone 98",
      "Ezone 100",
      "VCore 98",
      "VCore 100",
      "Percept 97",
      "Percept 100",
    ],
    Tecnifibre: [
      "TFight",
      "TF40",
      "Tempo",
    ],
    Prince: [
      "Phantom",
      "Tour",
      "Warrior",
    ],
  },

  RUNNING: {
    Nike: [
      "Alphafly 3",
      "Vaporfly 4",
      "Pegasus",
      "Vomero",
      "Invincible",
      "Zoom Fly",
    ],
    ASICS: [
      "Metaspeed Sky",
      "Metaspeed Edge",
      "Novablast",
      "Gel-Nimbus",
      "Gel-Kayano",
      "Superblast",
    ],
    Hoka: [
      "Cielo X1",
      "Rocket X",
      "Clifton",
      "Bondi",
      "Mach",
      "Arahi",
    ],
    Adidas: [
      "Adizero Adios Pro",
      "Adizero Boston",
      "Ultraboost",
      "Supernova",
    ],
    Brooks: [
      "Hyperion Elite",
      "Ghost",
      "Glycerin",
      "Adrenaline GTS",
    ],
    Saucony: [
      "Endorphin Pro",
      "Endorphin Speed",
      "Ride",
      "Triumph",
    ],
    "New Balance": [
      "FuelCell SuperComp Elite",
      "FuelCell Rebel",
      "Fresh Foam 1080",
      "Fresh Foam More",
    ],
    On: [
      "Cloudboom Strike",
      "Cloudmonster",
      "Cloudsurfer",
      "Cloudrunner",
    ],
    Salomon: [
      "S/Lab Ultra",
      "Genesis",
      "Speedcross",
      "Ultra Glide",
    ],
  },
};

export function getBrandsByCategory(
  category: SportsCategory | ""
): string[] {
  if (!category) return [];

  return Object.keys(sportsCatalog[category]);
}

export function getModelsByBrand(
  category: SportsCategory | "",
  brand: string
): string[] {
  if (!category || !brand) return [];

  return sportsCatalog[category][brand] ?? [];
}