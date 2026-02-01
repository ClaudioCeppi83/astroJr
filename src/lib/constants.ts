import { OrbitalElements } from "@/utils/physics";

export interface CelestialBody {
  name?: string;
  color: number;
  size: number;
  dist: number;
  category: string;
  rain?: string; // Optativo ya que viene de constants antiguas
  desc: string;
  type: string;
  tempDay?: string;
  tempNight?: string;
  grav: string;
  orbit: string;
  parent?: string;
  model_url?: string;
  funFact?: string;
  simbolo?: string;
  temperaturaMedia?: number;
  masa?: string;
  satelites?: number;
  descubrimiento?: any;
  datosCuriosos?: string[];
  relieveNotable?: string[];
  orbitalElements?: OrbitalElements;
}

export const UNIVERSE_DATA: Record<string, CelestialBody> = {
  "Sol": { color: 0xffcc00, size: 5, dist: 0, category: 'Estrellas', rain: "Viento Solar", desc: "Partículas cargadas liberadas desde la corona solar.", type: "Estrella", tempDay: "5505°C", tempNight: "15M°C", grav: "274 m/s²", orbit: "Centro Galáctico" },
  "Mercurio": { color: 0x94a3b8, size: 0.8, dist: 15, category: 'Planetas', rain: "Nula", desc: "Atmósfera casi inexistente.", type: "Planeta Rocoso", tempDay: "430°C", tempNight: "-180°C", grav: "3.7 m/s²", orbit: "88 días" },
  "Venus": { color: 0xfde68a, size: 1.2, dist: 22, category: 'Planetas', rain: "Ácido Sulfúrico", desc: "Lluvia corrosiva en una atmósfera densa.", type: "Planeta Rocoso", tempDay: "465°C", tempNight: "465°C", grav: "8.8 m/s²", orbit: "225 días" },
  "Tierra": { color: 0x3b82f6, size: 1.3, dist: 32, category: 'Planetas', rain: "Agua Líquida", desc: "Sustento vital para la biodiversidad.", type: "Planeta Habitable", tempDay: "15°C", tempNight: "-89°C", grav: "9.8 m/s²", orbit: "365 días" },
  "Luna": { color: 0xe2e8f0, size: 0.35, dist: 2.8, parent: "Tierra", category: 'Satélites', rain: "Polvo Estelar", desc: "Impactos constantes de micrometeoritos.", type: "Satélite", tempDay: "127°C", tempNight: "-173°C", grav: "1.6 m/s²", orbit: "27 días" },
  "Marte": { color: 0xef4444, size: 1.0, dist: 45, category: 'Planetas', rain: "Hielo Seco", desc: "Precipitación de CO2 en los polos.", type: "Planeta Rocoso", tempDay: "20°C", tempNight: "-153°C", grav: "3.7 m/s²", orbit: "687 días" },
  "Fobos": { color: 0x78716c, size: 0.18, dist: 2.0, parent: "Marte", category: 'Satélites', rain: "Polvo", desc: "Luna condenada a colisionar con Marte.", type: "Satélite", tempDay: "-4°C", tempNight: "-112°C", grav: "0.005 m/s²", orbit: "7h" },
  "Deimos": { color: 0x8c8581, size: 0.15, dist: 3.0, parent: "Marte", category: 'Satélites', rain: "Polvo", desc: "La luna más pequeña del sistema solar.", type: "Satélite", tempDay: "-4°C", tempNight: "-112°C", grav: "0.003 m/s²", orbit: "30h" },
  "Júpiter": { color: 0xf97316, size: 3.2, dist: 75, category: 'Planetas', rain: "Diamantes", desc: "Cristales de carbono a profundidades extremas.", type: "Gigante Gaseoso", tempDay: "-110°C", tempNight: "-110°C", grav: "24.8 m/s²", orbit: "11.8 años" },
  "Io": { color: 0xfacc15, size: 0.42, dist: 5.0, parent: "Júpiter", category: 'Satélites', rain: "Azufre", desc: "Intensa actividad volcánica.", type: "Satélite", tempDay: "-130°C", tempNight: "-180°C", grav: "1.8 m/s²", orbit: "1.7 días" },
  "Europa": { color: 0xcffafe, size: 0.4, dist: 6.5, parent: "Júpiter", category: 'Satélites', rain: "Hielo", desc: "Corteza de hielo sobre un océano líquido.", type: "Satélite", tempDay: "-160°C", tempNight: "-220°C", grav: "1.3 m/s²", orbit: "3.5 días" },
  "Ganimedes": { color: 0x94a3b8, size: 0.5, dist: 8.5, parent: "Júpiter", category: 'Satélites', rain: "Magnetismo", desc: "La luna más grande; posee magnetosfera.", type: "Satélite", tempDay: "-110°C", tempNight: "-190°C", grav: "1.4 m/s²", orbit: "7 días" },
  "Saturno": { color: 0xeab308, size: 2.8, dist: 110, category: 'Planetas', rain: "Helio", desc: "Lluvia de helio hacia el interior del planeta.", type: "Gigante Gaseoso", tempDay: "-140°C", tempNight: "-140°C", grav: "10.4 m/s²", orbit: "29 años" },
  "Titán": { color: 0xf59e0b, size: 0.6, dist: 6.5, parent: "Saturno", category: 'Satélites', rain: "Metano", desc: "Lagos y lluvia de hidrocarburos líquidos.", type: "Satélite", tempDay: "-179°C", tempNight: "-179°C", grav: "1.3 m/s²", orbit: "16 días" },
  "Encélado": { color: 0xffffff, size: 0.3, dist: 4.8, parent: "Saturno", category: 'Satélites', rain: "Nieve", desc: "Géiseres que alimentan los anillos.", type: "Satélite", tempDay: "-198°C", tempNight: "-201°C", grav: "0.1 m/s²", orbit: "1.3 días" },
  "Urano": { color: 0x22d3ee, size: 1.8, dist: 150, category: 'Planetas', rain: "Diamantes", desc: "Precipitación de carbono sólido.", type: "Gigante Helado", tempDay: "-195°C", tempNight: "-224°C", grav: "8.7 m/s²", orbit: "84 años" },
  "Neptuno": { color: 0x3b82f6, size: 1.8, dist: 180, category: 'Planetas', rain: "Granizo", desc: "Diamantes en una atmósfera ultra-fría.", type: "Gigante Helado", tempDay: "-201°C", tempNight: "-218°C", grav: "11.1 m/s²", orbit: "165 años" },
  "Tritón": { color: 0xfed7aa, size: 0.45, dist: 5.0, parent: "Neptuno", category: 'Satélites', rain: "Nitrógeno", desc: "Órbita retrógrada y géiseres fríos.", type: "Satélite", tempDay: "-235°C", tempNight: "-235°C", grav: "0.7 m/s²", orbit: "6 días" }
};
