export type ContentType = "project" | "investment" | "property" | "visual" | "construction";

export type CMSItem = {
  id: string;
  created_at: string;
  updated_at: string;
  type: ContentType;
  title: string;
  slug: string;
  status: "draft" | "published";
  category?: string | null;
  location?: string | null;
  year?: string | null;
  area?: string | null;
  services?: string[] | null;
  summary?: string | null;
  description?: string | null;
  concept?: string | null;
  investment_thesis?: string | null;
  price?: string | null;
  featured: boolean;
  cover_image?: string | null;
  gallery?: string[] | null;
};

export type EstimatorPayload = {
  projectType: string;
  zone: string;
  area: number;
  finish: string;
  service: string;
  goal: string;
  budget: string;
  urgency: string;
  name: string;
  email: string;
  phone: string;
  countryCode?: string;
};

export type AIReport = {
  title: string;
  complexity: "Baja" | "Media" | "Alta";
  leadScore: number;
  investmentRange: string;
  estimatedTime: string;
  clientSummary: string;
  clientMessage: string;
  visibleNextStep: string;
  internalSummary: string;
  internalRisks: string[];
  internalRecommendations: string[];
  commercialNotes: string[];
  qualification: "Bajo" | "Medio" | "Alto" | "Premium";
};
