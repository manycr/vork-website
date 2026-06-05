export type Project = {
  slug: string;
  title: string;
  location: string;
  year: string;
  area: string;
  category: string;
  services: string[];
  description: string;
  concept: string;
  image: string;
  gallery: string[];
};

export const projects: Project[] = [
  {
    slug: "casa-atria",
    title: "Casa Atria",
    location: "Costa Rica",
    year: "2026",
    area: "420 m²",
    category: "Vivienda contemporánea",
    services: ["Anteproyecto", "Visualización", "Documentación"],
    description: "Vivienda contemporánea con lectura limpia, integración interior exterior y materialidad sobria.",
    concept: "El proyecto organiza vida social abierta, privacidad controlada y relación visual directa con el paisaje inmediato.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1800&q=90",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=90"
    ]
  },
  {
    slug: "interior-norte",
    title: "Interior Norte",
    location: "Costa Rica",
    year: "2026",
    area: "180 m²",
    category: "Remodelación interior",
    services: ["Remodelación", "Visualización 3D", "Materialidad"],
    description: "Rediseño interior orientado a claridad espacial, calidez material y lectura premium.",
    concept: "La intervención reduce ruido visual y construye una atmósfera sobria mediante luz, textura y proporción.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=90",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1800&q=90",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90"
    ]
  },
  {
    slug: "villas-pacifico",
    title: "Villas Pacífico",
    location: "Costa Rica",
    year: "2026",
    area: "Etapa conceptual",
    category: "Desarrollo inmobiliario",
    services: ["Concepto", "Presentación inmobiliaria", "Renders"],
    description: "Conceptualización de unidades habitacionales con enfoque comercial, visual y turístico.",
    concept: "Sistema de villas orientado a inversión, experiencia y comunicación visual para preventa.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90",
      "https://images.unsplash.com/photo-1600566752229-250ed79470d2?auto=format&fit=crop&w=1800&q=90"
    ]
  }
];
