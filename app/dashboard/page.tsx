"use client";

import { useState } from "react";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  project_type: string;
  location_zone: string;
  area: number;
  finish_level: string;
  service_needed: string;
  complexity: string;
  lead_score: number;
  status: string;
  ai_summary: string;
};

export default function DashboardPage() {
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");

  async function loadLeads() {
    setError("");

    const res = await fetch("/api/dashboard/leads", {
      headers: {
        "x-dashboard-password": password
      }
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "No autorizado.");
      return;
    }

    setLeads(data.leads);
  }

  return (
    <main className="min-h-screen bg-[#101010] px-[7vw] py-16 text-white">
      <div className="mb-12 flex items-end justify-between gap-8">
        <div>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#f2db9c]">Dashboard interno</p>
          <h1 className="text-5xl font-black tracking-[-0.06em] md:text-7xl">Leads VORK</h1>
        </div>
        <a href="/" className="text-sm font-bold text-white/70">Volver al sitio</a>
      </div>

      <div className="mb-10 flex max-w-xl gap-3">
        <input
          type="password"
          placeholder="Contraseña dashboard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex-1 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white outline-none"
        />
        <button onClick={loadLeads} className="rounded-2xl bg-[#f2db9c] px-6 py-4 font-black text-black">
          Entrar
        </button>
      </div>

      {error && <p className="mb-8 text-red-300">{error}</p>}

      <div className="grid gap-4">
        {leads.map((lead) => (
          <article key={lead.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex flex-wrap justify-between gap-6">
              <div>
                <h2 className="text-2xl font-black">{lead.name}</h2>
                <p className="mt-1 text-white/60">{lead.email} · {lead.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/50">Score</p>
                <p className="text-3xl font-black text-[#f2db9c]">{lead.lead_score}/100</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-white/70 md:grid-cols-4">
              <p><strong>Tipo:</strong> {lead.project_type}</p>
              <p><strong>Zona:</strong> {lead.location_zone}</p>
              <p><strong>Área:</strong> {lead.area} m²</p>
              <p><strong>Complejidad:</strong> {lead.complexity}</p>
            </div>

            <p className="mt-6 max-w-4xl text-white/70">{lead.ai_summary}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
