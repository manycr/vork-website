"use client";

import { useState } from "react";

type Report = {
  title: string;
  complexity: string;
  constructionRange: string;
  professionalFeesRange: string;
  otherCosts: string;
  investmentRange: string;
  estimatedTime: string;
  clientSummary: string;
  clientMessage: string;
  visibleNextStep: string;
};

const initial = {
  projectType: "",
  zone: "",
  area: 120,
  finish: "",
  service: "",
  goal: "",
  budget: "",
  urgency: "",
  name: "",
  email: "",
  phone: "",
  countryCode: "+506",
};

export function Estimator() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [p, setP] = useState(initial);

  const update = (key: string, value: string | number) =>
    setP((current) => ({ ...current, [key]: value }));

  function next() {
    setError("");

    if (step === 1 && !p.projectType) {
      setError("selecciona una opción para continuar.");
      return;
    }

    if (step === 2 && (!p.zone || !p.finish || !p.budget || !p.area)) {
      setError("completa las opciones de esta etapa para continuar.");
      return;
    }

    if (step === 3 && (!p.service || !p.goal || !p.urgency)) {
      setError("completa las opciones de esta etapa para continuar.");
      return;
    }

    setStep((current) => Math.min(current + 1, 4));
  }

  function back() {
    setError("");
    setStep((current) => Math.max(current - 1, 1));
  }

  async function submit() {
    if (!p.name.trim() || !p.email.trim()) {
      setError("necesitamos tu nombre y correo para enviarte el resumen.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/analyze-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "no pudimos procesar el proyecto.");
        return;
      }

      setReport(data.report);
      setStep(5);
    } catch {
      setError("no pudimos conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="evaluacion" className="bg-white py-4">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <p className="text-[13px] lowercase text-neutral-400">
            {step < 5 ? `0${step} / 04` : "listo"}
          </p>
          {step < 5 && (
            <div className="h-px w-28 overflow-hidden bg-black/10 md:w-44">
              <div
                className="h-full bg-black transition-all duration-500"
                style={{ width: `${step * 25}%` }}
              />
            </div>
          )}
        </div>

        <div className="min-h-[470px]">
          {step === 1 && (
            <Step title="¿qué quieres hacer?" text="Empecemos por entender el proyecto, sin tecnicismos.">
              <ChoiceGrid
                value={p.projectType}
                onChange={(value) => update("projectType", value)}
                options={[
                  ["vivienda", "una vivienda nueva"],
                  ["remodelacion", "remodelar o ampliar"],
                  ["comercial", "un espacio comercial"],
                  ["inmobiliario", "un desarrollo inmobiliario"],
                  ["airbnb", "un proyecto turístico o de renta"],
                ]}
              />
              {error && <p className="mt-6 text-sm text-red-700">{error}</p>}
              <Actions onNext={next} />
            </Step>
          )}

          {step === 2 && (
            <Step title="¿cómo imaginas el proyecto?" text="Estos datos nos ayudan a entender escala, ubicación y nivel de inversión.">
              <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
                <Field label="ubicación">
                  <SelectMenu
                    value={p.zone}
                    placeholder="seleccionar ubicación"
                    onChange={(value) => update("zone", value)}
                    options={[
                      ["gam", "gran área metropolitana"],
                      ["costera", "zona costera"],
                      ["rural", "zona rural"],
                      ["turistica", "zona turística"],
                    ]}
                  />
                </Field>

                <Field label="área aproximada">
                  <div className="relative">
                    <input
                      className="ai-field pr-12"
                      type="number"
                      min="20"
                      value={p.area}
                      onChange={(e) => update("area", Number(e.target.value))}
                    />
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-sm text-neutral-400">m²</span>
                  </div>
                </Field>

                <Field label="nivel de acabados">
                  <SelectMenu
                    value={p.finish}
                    placeholder="seleccionar acabados"
                    onChange={(value) => update("finish", value)}
                    options={[
                      ["basico", "funcional"],
                      ["medio", "medio"],
                      ["premium", "premium"],
                      ["lujo", "alto / lujo"],
                    ]}
                  />
                </Field>

                <Field label="presupuesto">
                  <SelectMenu
                    value={p.budget}
                    placeholder="seleccionar presupuesto"
                    onChange={(value) => update("budget", value)}
                    options={[
                      ["sin_definir", "todavía no lo sé"],
                      ["bajo", "quiero optimizar al máximo"],
                      ["medio", "tengo un rango medio"],
                      ["alto", "priorizo diseño y calidad"],
                    ]}
                  />
                </Field>
              </div>
              {error && <p className="mt-6 text-sm text-red-700">{error}</p>}
              <Actions onBack={back} onNext={next} />
            </Step>
          )}

          {step === 3 && (
            <Step title="¿qué necesitas de nosotros?" text="No tienes que conocer el nombre técnico del servicio. Elige lo que más se acerque.">
              <ChoiceGrid
                value={p.service}
                onChange={(value) => update("service", value)}
                options={[
                  ["concepto", "definir la idea y el diseño"],
                  ["planos", "llevarlo a planos y permisos"],
                  ["renders", "visualizar un proyecto"],
                  ["integral", "acompañamiento de diseño a obra"],
                  ["obra", "construcción o seguimiento de obra"],
                ]}
              />

              <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
                <Field label="objetivo principal">
                  <SelectMenu
                    value={p.goal}
                    placeholder="seleccionar objetivo"
                    onChange={(value) => update("goal", value)}
                    options={[
                      ["construir", "construir"],
                      ["remodelar", "remodelar"],
                      ["vender", "desarrollar para vender"],
                      ["rentabilizar", "desarrollar para rentabilizar"],
                      ["validar", "validar una idea primero"],
                    ]}
                  />
                </Field>

                <Field label="momento del proyecto">
                  <SelectMenu
                    value={p.urgency}
                    placeholder="seleccionar momento"
                    onChange={(value) => update("urgency", value)}
                    options={[
                      ["exploratoria", "estoy explorando"],
                      ["normal", "quiero iniciar pronto"],
                      ["inmediata", "necesito iniciar cuanto antes"],
                    ]}
                  />
                </Field>
              </div>
              {error && <p className="mt-6 text-sm text-red-700">{error}</p>}
              <Actions onBack={back} onNext={next} />
            </Step>
          )}

          {step === 4 && (
            <Step title="¿a dónde enviamos tu lectura?" text="Recibirás un resumen del proyecto. La evaluación comercial interna nunca se muestra al cliente.">
              <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
                <Field label="nombre">
                  <input className="ai-field" value={p.name} onChange={(e) => update("name", e.target.value)} placeholder="tu nombre" />
                </Field>

                <Field label="correo">
                  <input className="ai-field" type="email" value={p.email} onChange={(e) => update("email", e.target.value)} placeholder="correo@ejemplo.com" />
                </Field>

                <Field label="whatsapp">
                  <div className="grid grid-cols-[92px_1fr] gap-4">
                    <select className="ai-field" value={p.countryCode} onChange={(e) => update("countryCode", e.target.value)}>
                      <option value="+506">+506</option>
                      <option value="+1">+1</option>
                      <option value="+52">+52</option>
                      <option value="+57">+57</option>
                      <option value="+34">+34</option>
                    </select>
                    <input className="ai-field" value={p.phone} onChange={(e) => update("phone", e.target.value)} placeholder="8888 8888" />
                  </div>
                </Field>
              </div>

              {error && <p className="mt-6 text-sm text-red-700">{error}</p>}
              <Actions onBack={back} onNext={submit} nextLabel={loading ? "preparando lectura..." : "recibir mi lectura"} disabled={loading} />
            </Step>
          )}

          {step === 5 && report && (
            <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
              <div>
                <p className="mb-5 text-sm text-neutral-400">lectura preliminar</p>
                <h3 className="max-w-[700px] text-[clamp(2.8rem,5vw,5.4rem)] font-medium lowercase leading-[.94] tracking-[-0.06em]">
                  ya entendemos mejor tu proyecto.
                </h3>
                <p className="mt-7 max-w-2xl text-[17px] leading-7 text-neutral-500">
                  {report.clientSummary}
                </p>
                <p className="mt-4 max-w-2xl text-[17px] leading-7 text-neutral-500">
                  {report.clientMessage}
                </p>
              </div>

              <div className="border-t border-black/10 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <Result label="construcción estimada" value={report.constructionRange} />
                <Result label="servicios profesionales" value={report.professionalFeesRange} />
                <Result label="otros costos" value={report.otherCosts} />
                <Result label="inversión preliminar" value={report.investmentRange} />
                <Result label="tiempo preliminar" value={report.estimatedTime} />
                <Result label="siguiente paso" value={report.visibleNextStep} />
                <p className="mt-8 text-xs leading-5 text-neutral-400">
                  Esta lectura es preliminar. El costo definitivo requiere alcance, ubicación exacta,
                  estudios y definición técnica del proyecto.
                </p>
                <p className="mt-3 text-xs leading-5 text-neutral-400">
                  También enviamos este resumen a {p.email}.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Step({ title, text, children }: { title: string; text: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="max-w-[820px] text-[clamp(2.8rem,5vw,5.4rem)] font-medium lowercase leading-[.94] tracking-[-0.06em]">
        {title}
      </h3>
      <p className="mt-5 max-w-2xl text-[16px] leading-7 text-neutral-500">{text}</p>
      <div className="mt-12">{children}</div>
    </div>
  );
}

function ChoiceGrid({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: string[][] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {options.map(([key, label]) => (
        <button
          type="button"
          key={key}
          onClick={() => onChange(key)}
          className={`min-h-[74px] rounded-2xl border px-5 py-4 text-left text-[15px] lowercase transition-[background-color,color,border-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            value === key
              ? "border-black bg-black text-white"
              : "border-black/10 bg-white text-black hover:border-black hover:bg-black hover:text-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}


function SelectMenu({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[][];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find(([key]) => key === value);

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        className={`ai-field flex w-full items-center justify-between gap-4 text-left transition-colors duration-300 ${
          value ? "text-black" : "text-neutral-400"
        }`}
      >
        <span>{selected?.[1] || placeholder}</span>
        <span
          aria-hidden="true"
          className={`text-[13px] text-neutral-400 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "rotate-180" : ""
          }`}
        >
          ↓
        </span>
      </button>

      <div
        className={`absolute left-0 right-0 top-[calc(100%+8px)] z-50 origin-top overflow-hidden rounded-[18px] border border-black/10 bg-white p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.10)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.985] opacity-0"
        }`}
        role="listbox"
      >
        {options.map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="option"
            aria-selected={value === key}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              onChange(key);
              setOpen(false);
            }}
            className={`block w-full rounded-[13px] px-4 py-3 text-left text-[14px] lowercase transition-[background-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              value === key
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs lowercase text-neutral-400">{label}</span>
      {children}
    </label>
  );
}

function Actions({ onBack, onNext, nextLabel = "continuar", disabled = false }: { onBack?: () => void; onNext: () => void; nextLabel?: string; disabled?: boolean }) {
  return (
    <div className="mt-12 flex items-center justify-between gap-4">
      <div>
        {onBack && (
          <button type="button" onClick={onBack} className="text-sm lowercase text-neutral-400 transition hover:text-black">
            ← atrás
          </button>
        )}
      </div>
      <button type="button" onClick={onNext} disabled={disabled} className="button disabled:cursor-wait disabled:opacity-50">
        {nextLabel}
      </button>
    </div>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-black/10 py-5 first:pt-0">
      <p className="text-xs lowercase text-neutral-400">{label}</p>
      <p className="mt-2 text-xl lowercase leading-7">{value}</p>
    </div>
  );
}
