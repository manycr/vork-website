"use client";

import { useState } from "react";
import type { AIReport, EstimatorPayload } from "@/lib/types";

const initialPayload: EstimatorPayload = {
  projectType: "vivienda",
  zone: "gam",
  area: 120,
  finish: "medio",
  service: "concepto",
  goal: "construir",
  budget: "medio",
  urgency: "normal",
  name: "",
  email: "",
  phone: "",
  countryCode: "+506"
};

export function Estimator() {
  const [step, setStep] = useState(1);
  const [payload, setPayload] = useState<EstimatorPayload>(initialPayload);
  const [report, setReport] = useState<AIReport | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (key: keyof EstimatorPayload, value: string | number) => {
    setPayload((current) => ({ ...current, [key]: value }));
  };

  async function submit() {
    setLoading(true);
    setReport(null);

    try {
      const res = await fetch("/api/analyze-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo generar el análisis.");
      setReport(data.report);
      setStep(4);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Error generando análisis.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="estimador" className="bg-[#f4f0e8] px-[7vw] py-28">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#7d735f]">Estimador AI preliminar</p>
        <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
          evalúa tu proyecto antes de cotizar.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-neutral-600">
          Herramienta preliminar para clasificar complejidad, rango de servicio y ruta recomendada. No sustituye una revisión técnica formal.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-6 rounded-[2rem] md:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-black/10 bg-white/45 p-8 shadow-sm">
          <div className="mb-8 flex gap-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className={`h-1 flex-1 rounded-full ${item <= step ? "bg-black" : "bg-black/10"}`} />
            ))}
          </div>

          {step === 1 && (
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Tipo de proyecto">
                <select value={payload.projectType} onChange={(e) => update("projectType", e.target.value)} className="field">
                  <option value="vivienda">Vivienda nueva</option>
                  <option value="remodelacion">Remodelación</option>
                  <option value="comercial">Local comercial</option>
                  <option value="inmobiliario">Desarrollo inmobiliario</option>
                  <option value="airbnb">Airbnb / villas</option>
                </select>
              </Field>

              <Field label="Zona">
                <select value={payload.zone} onChange={(e) => update("zone", e.target.value)} className="field">
                  <option value="gam">GAM / Valle Central</option>
                  <option value="costera">Zona costera</option>
                  <option value="rural">Zona rural</option>
                  <option value="turistica">Zona turística</option>
                </select>
              </Field>

              <Field label="Área aproximada, m²">
                <input type="number" value={payload.area} onChange={(e) => update("area", Number(e.target.value))} className="field" />
              </Field>

              <Field label="Nivel de acabados">
                <select value={payload.finish} onChange={(e) => update("finish", e.target.value)} className="field">
                  <option value="basico">Básico funcional</option>
                  <option value="medio">Medio</option>
                  <option value="premium">Premium</option>
                  <option value="lujo">Lujo</option>
                </select>
              </Field>

              <button onClick={() => setStep(2)} className="button md:col-span-2">Continuar</button>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Servicio requerido">
                <select value={payload.service} onChange={(e) => update("service", e.target.value)} className="field">
                  <option value="concepto">Anteproyecto</option>
                  <option value="planos">Planos constructivos</option>
                  <option value="renders">Renders y visualización</option>
                  <option value="integral">Diseño + planos + visualización</option>
                  <option value="obra">Supervisión / visitas de obra</option>
                </select>
              </Field>

              <Field label="Objetivo">
                <select value={payload.goal} onChange={(e) => update("goal", e.target.value)} className="field">
                  <option value="construir">Construir</option>
                  <option value="vender">Vender / preventa</option>
                  <option value="remodelar">Remodelar</option>
                  <option value="validar">Validar idea</option>
                  <option value="rentabilizar">Rentabilizar</option>
                </select>
              </Field>

              <Field label="Presupuesto percibido">
                <select value={payload.budget} onChange={(e) => update("budget", e.target.value)} className="field">
                  <option value="bajo">Limitado</option>
                  <option value="medio">Medio</option>
                  <option value="alto">Alto</option>
                  <option value="sin_definir">Sin definir</option>
                </select>
              </Field>

              <Field label="Urgencia">
                <select value={payload.urgency} onChange={(e) => update("urgency", e.target.value)} className="field">
                  <option value="normal">Normal</option>
                  <option value="inmediata">Inmediata</option>
                  <option value="exploratoria">Exploratoria</option>
                </select>
              </Field>

              <button onClick={() => setStep(1)} className="button-secondary">Atrás</button>
              <button onClick={() => setStep(3)} className="button">Continuar</button>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-5">
              <p className="text-sm text-neutral-600">Para generar y enviar el análisis completo, necesitamos estos datos.</p>
              <Field label="Nombre">
                <input value={payload.name} onChange={(e) => update("name", e.target.value)} className="field" />
              </Field>
              <Field label="Correo">
                <input type="email" value={payload.email} onChange={(e) => update("email", e.target.value)} className="field" />
              </Field>
              <Field label="whatsapp">
                <div className="grid grid-cols-[96px_1fr] gap-3">
                  <select value={payload.countryCode || "+506"} onChange={(e) => update("countryCode", e.target.value)} className="field">
                    <option value="+506">🇨🇷</option>
                    <option value="+1">🇺🇸</option>
                    <option value="+52">🇲🇽</option>
                    <option value="+57">🇨🇴</option>
                    <option value="+34">🇪🇸</option>
                    <option value="+507">🇵🇦</option>
                    <option value="+502">🇬🇹</option>
                    <option value="+503">🇸🇻</option>
                    <option value="+505">🇳🇮</option>
                    <option value="+504">🇭🇳</option>
                    <option value="+54">🇦🇷</option>
                    <option value="+56">🇨🇱</option>
                    <option value="+51">🇵🇪</option>
                  </select>
                  <input value={payload.phone} onChange={(e) => update("phone", e.target.value)} className="field" placeholder="número" />
                </div>
              </Field>
              <button onClick={() => setStep(2)} className="button-secondary">Atrás</button>
              <button disabled={loading || !payload.name || !payload.email || !payload.phone} onClick={submit} className="button disabled:opacity-50">
                {loading ? "Generando..." : "Generar análisis"}
              </button>
            </div>
          )}

          {step === 4 && report && (
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#7d735f]">Resultado generado</p>
              <h3 className="text-3xl font-black tracking-[-0.04em]">{report.title}</h3>
              <p className="mt-4 text-neutral-600">{report.clientSummary}</p>
              <button onClick={() => setStep(1)} className="button mt-8">Analizar otro proyecto</button>
            </div>
          )}
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white/45 p-8 shadow-sm">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#7d735f]">Vista preliminar</p>
          {report ? (
            <ReportView report={report} />
          ) : (
            <div>
              <h3 className="text-3xl font-black tracking-[-0.04em]">Análisis inteligente VORK</h3>
              <p className="mt-4 text-neutral-600">
                El sistema generará una lectura preliminar para el cliente y guardará el análisis estratégico completo para VORK.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-neutral-800">
      {label}
      {children}
    </label>
  );
}

function ReportView({ report }: { report: AIReport }) {
  return (
    <div>
      <h3 className="text-3xl font-black tracking-[-0.04em]">{report.title}</h3>
      <div className="mt-8 grid gap-3 md:grid-cols-3">
        <Metric label="Complejidad" value={report.complexity} />
        <Metric label="Score" value={`${report.leadScore}/100`} />
        <Metric label="Tiempo" value={report.estimatedTime} />
      </div>
      <div className="mt-6 rounded-2xl bg-black/5 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Rango preliminar</p>
        <p className="mt-2 text-2xl font-black">{report.investmentRange}</p>
      </div>

      <div className="mt-6 rounded-2xl bg-black p-5 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Siguiente paso</p>
        <p className="mt-3 font-bold">{report.visibleNextStep}</p>
      </div>

      <p className="mt-6 text-sm text-neutral-500">
        Este resultado es preliminar. Las recomendaciones técnicas se entregan después de una revisión formal del proyecto.
      </p>
</div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-black/5 p-4">
      <span className="block text-xs font-bold text-neutral-500">{label}</span>
      <strong className="mt-2 block text-lg">{value}</strong>
    </div>
  );
}
