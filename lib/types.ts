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

  // Cliente: solo lectura comercial controlada.
  clientSummary: string;
  clientMessage: string;
  visibleNextStep: string;

  // VORK: análisis interno.
  internalSummary: string;
  internalRisks: string[];
  internalRecommendations: string[];
  commercialNotes: string[];
  qualification: "Bajo" | "Medio" | "Alto" | "Premium";
};
