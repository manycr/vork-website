import type { CMSItem } from "./types";

const now = new Date().toISOString();

export const fallbackItems: CMSItem[] = [
  {
    id: "fallback-project-1", created_at: now, updated_at: now, type: "project",
    title: "casa atria", slug: "casa-atria", status: "published",
    category: "residencial contemporáneo", location: "costa rica", year: "2026", area: "420 m²",
    services: ["anteproyecto", "visualización", "documentación"],
    summary: "vivienda contemporánea con lectura limpia, integración interior exterior y materialidad sobria.",
    description: "proyecto residencial preparado para comunicar valor arquitectónico, técnico y comercial.",
    concept: "vida social abierta, privacidad controlada y relación visual directa con el paisaje inmediato.",
    investment_thesis: null, price: null, featured: true,
    cover_image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=72", gallery: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=72", "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1600&q=72"]
  },
  {
    id: "fallback-visual-1", created_at: now, updated_at: now, type: "visual",
    title: "visualización residencial", slug: "visualizacion-residencial", status: "published",
    category: "render exterior", location: "costa rica", year: "2026", area: "conceptual",
    services: ["visualización", "atmósfera", "comunicación visual"],
    summary: "imagen arquitectónica para comunicación comercial y validación visual.",
    description: "visualización desarrollada dentro de vork studio.",
    concept: null, investment_thesis: null, price: null, featured: true,
    cover_image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1600&q=72", gallery: ["https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1600&q=72"]
  },
  {
    id: "fallback-investment-1", created_at: now, updated_at: now, type: "investment",
    title: "barn house retreat", slug: "barn-house-retreat", status: "published",
    category: "hospitality investment", location: "zona montaña / costa rica", year: "conceptual", area: "12 unidades",
    services: ["concepto", "hospitality", "visualización"],
    summary: "cabañas tipo barn house orientadas a retiro, turismo y renta de corta estadía.",
    description: "desarrollo conceptual para inversionistas interesados en hospitality de baja densidad.",
    concept: "sistema modular de unidades tipo barn house, áreas comunes silenciosas y relación directa con paisaje.",
    investment_thesis: "oportunidad para crear un destino de renta corta con identidad arquitectónica.",
    price: null, featured: true, cover_image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=72", gallery: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=72", "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=72"]
  },
  {
    id: "fallback-investment-2", created_at: now, updated_at: now, type: "investment",
    title: "casas de retiro", slug: "casas-de-retiro", status: "published",
    category: "wellness investment", location: "zona rural / costa rica", year: "conceptual", area: "8 unidades",
    services: ["wellness", "residencial", "hospitality"],
    summary: "conjunto de casas de retiro orientadas a descanso, recuperación y vida lenta.",
    description: "propuesta para un enclave residencial y turístico enfocado en bienestar, privacidad y paisaje.",
    concept: "unidades independientes, senderos suaves, espacios de contemplación y servicios comunes mínimos.",
    investment_thesis: "oportunidad para un producto inmobiliario de baja densidad dirigido a wellness.",
    price: null, featured: true, cover_image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=72", gallery: ["https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=72", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=72"]
  },
  {
    id: "fallback-investment-3", created_at: now, updated_at: now, type: "investment",
    title: "complejo deportivo de tenis", slug: "complejo-deportivo-tenis", status: "published",
    category: "sports investment", location: "costa rica", year: "conceptual", area: "4 canchas",
    services: ["tenis", "club deportivo", "hospitality"],
    summary: "complejo deportivo con canchas de tenis, servicios complementarios y potencial de membresía privada.",
    description: "desarrollo conceptual para un club deportivo boutique con enfoque social, recreativo y comercial.",
    concept: "canchas, lounge, áreas de sombra, servicios de apoyo y paisaje controlado.",
    investment_thesis: "oportunidad para activar terrenos mediante deporte, comunidad, membresías y eventos privados.",
    price: null, featured: true, cover_image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1600&q=72", gallery: ["https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1600&q=72", "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1600&q=72"]
  },
  {
    id: "fallback-investment-4", created_at: now, updated_at: now, type: "investment",
    title: "centro de salud integral", slug: "centro-salud-integral", status: "published",
    category: "health investment", location: "costa rica", year: "conceptual", area: "1.200 m²",
    services: ["salud", "bienestar", "arquitectura"],
    summary: "centro de salud y bienestar con enfoque en atención integral, recuperación y experiencia espacial.",
    description: "propuesta conceptual para un equipamiento privado de salud con atmósfera cálida y operación clara.",
    concept: "espacios de consulta, recuperación, áreas verdes y circulaciones silenciosas.",
    investment_thesis: "oportunidad para desarrollar infraestructura de salud diferenciada.",
    price: null, featured: true, cover_image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=72", gallery: ["https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=72", "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=72"]
  },
  {
    id: "fallback-investment-5", created_at: now, updated_at: now, type: "investment",
    title: "centro turístico", slug: "centro-turistico", status: "published",
    category: "tourism investment", location: "zona turística / costa rica", year: "conceptual", area: "masterplan",
    services: ["turismo", "hospitality", "experiencia"],
    summary: "centro turístico de baja densidad con alojamiento, paisaje y servicios de experiencia.",
    description: "concepto para un destino turístico con arquitectura sobria, recorridos y unidades de hospedaje.",
    concept: "paisaje, privacidad, operación hotelera ligera y narrativa visual de destino.",
    investment_thesis: "oportunidad para consolidar un producto turístico con identidad y potencial comercial.",
    price: null, featured: true, cover_image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1600&q=72", gallery: ["https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1600&q=72", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=72"]
  },
{
    id: "fallback-project-2", created_at: now, updated_at: now, type: "project",
    title: "villa nativa", slug: "villa-nativa", status: "published",
    category: "residencial tropical", location: "costa rica", year: "2026", area: "280 m²",
    services: ["anteproyecto", "visualización"],
    summary: "villa de baja densidad con espacios abiertos, sombra profunda y relación directa con vegetación.",
    description: "proyecto conceptual para vivienda tropical contemporánea.",
    concept: "arquitectura silenciosa, sombra, ventilación cruzada y vida exterior.",
    investment_thesis: null, price: null, featured: true,
    cover_image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=72", gallery: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=72", "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=72"]
  },
  {
    id: "fallback-project-3", created_at: now, updated_at: now, type: "project",
    title: "casa umbral", slug: "casa-umbral", status: "published",
    category: "residencial premium", location: "costa rica", year: "2026", area: "360 m²",
    services: ["diseño", "visualización", "documentación"],
    summary: "vivienda conceptual con planos limpios, materialidad sobria y transición gradual entre interior y paisaje.",
    description: "proyecto residencial enfocado en atmósfera, privacidad y presencia visual.",
    concept: "un umbral habitable entre refugio, paisaje y luz.",
    investment_thesis: null, price: null, featured: true,
    cover_image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=72", gallery: ["https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=72", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=72"]
  },
  {
    id: "fallback-visual-2", created_at: now, updated_at: now, type: "visual",
    title: "atmósfera interior", slug: "atmosfera-interior", status: "published",
    category: "render interior", location: "costa rica", year: "2026", area: "conceptual",
    services: ["visualización", "dirección visual"],
    summary: "imagen interior orientada a vender atmósfera, escala y materialidad.",
    description: "visualización editorial desarrollada dentro de vork studio.",
    concept: null, investment_thesis: null, price: null, featured: true,
    cover_image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=72", gallery: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=72", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=72"]
  },
  {
    id: "fallback-visual-3", created_at: now, updated_at: now, type: "visual",
    title: "detalle de materialidad", slug: "detalle-materialidad", status: "published",
    category: "visualización", location: "costa rica", year: "2026", area: "conceptual",
    services: ["render", "materialidad", "presentación"],
    summary: "visualización enfocada en textura, luz y percepción premium del proyecto.",
    description: "pieza visual para comunicación arquitectónica.",
    concept: null, investment_thesis: null, price: null, featured: true,
    cover_image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=72", gallery: ["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=72", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=72"]
  },
];
