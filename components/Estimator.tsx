"use client";

import { useEffect, useState } from "react";

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
  const [lang, setLang] = useState<"es" | "en">("es");
  useEffect(() => { setLang(document.cookie.includes("vork_lang=en") ? "en" : "es"); }, []);
  const tr = (es: string, en: string) => lang === "en" ? en : es;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [p, setP] = useState(initial);

  const update = (key: string, value: string | number) =>
    setP((current) => ({ ...current, [key]: value }));

  function next() {
    setError("");

    if (step === 1 && !p.projectType) {
      setError(tr('selecciona una opción para continuar.', 'select an option to continue.'));
      return;
    }

    if (step === 2 && (!p.zone || !p.finish || !p.budget || !p.area)) {
      setError(tr('completa las opciones de esta etapa para continuar.', 'complete this step to continue.'));
      return;
    }

    if (step === 3 && (!p.service || !p.goal || !p.urgency)) {
      setError(tr('completa las opciones de esta etapa para continuar.', 'complete this step to continue.'));
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
      setError(tr('necesitamos tu nombre y correo para enviarte el resumen.', 'we need your name and email to send the summary.'));
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/analyze-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...p, language: lang }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || tr("no pudimos procesar el proyecto.", "we could not process your project."));
        return;
      }

      setReport(data.report);
      setStep(5);
    } catch {
      setError(tr("no pudimos conectar con el servidor.", "could not connect to the server."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="evaluacion" className="bg-white py-4">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <p className="text-[13px] lowercase text-neutral-400">
            {step < 5 ? `0${step} / 04` : tr("listo", "done")}
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
            <Step title={tr('¿qué quieres hacer?', 'what would you like to create?')} text={tr('Empecemos por entender el proyecto, sin tecnicismos.', 'Let’s understand your project, without technical jargon.')}>
              <ChoiceGrid
                value={p.projectType}
                onChange={(value) => update("projectType", value)}
                options={[
                  ["vivienda", tr('una vivienda nueva', 'a new home')],
                  ["remodelacion", tr('remodelar o ampliar', 'renovate or expand')],
                  ["comercial", tr('un espacio comercial', 'a commercial space')],
                  ["inmobiliario", tr('un desarrollo inmobiliario', 'a real estate development')],
                  ["airbnb", tr('un proyecto turístico o de renta', 'a tourism or rental project')],
                ]}
              />
              {error && <p role="alert" aria-live="assertive" className="mt-6 text-sm text-red-700">{error}</p>}
              <Actions onNext={next} nextLabel={tr("continuar", "continue")} />
            </Step>
          )}

          {step === 2 && (
            <Step title={tr('¿cómo imaginas el proyecto?', 'how do you envision your project?')} text={tr('Estos datos nos ayudan a entender escala, ubicación y nivel de inversión.', 'These details help us understand scale, location and investment level.')}>
              <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
                <Field label={tr('ubicación', 'location')}>
                  <SelectMenu
                    value={p.zone}
                    placeholder={tr('seleccionar ubicación', 'select location')}
                    onChange={(value) => update("zone", value)}
                    options={[
                      ["gam", tr('gran área metropolitana', 'greater metropolitan area')],
                      ["costera", tr('zona costera', 'coastal area')],
                      ["rural", tr('zona rural', 'rural area')],
                      ["turistica", tr('zona turística', 'tourism area')],
                    ]}
                  />
                </Field>

                <Field label={tr('área aproximada', 'approximate area')}>
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

                <Field label={tr('nivel de acabados', 'finish level')}>
                  <SelectMenu
                    value={p.finish}
                    placeholder={tr('seleccionar acabados', 'select finishes')}
                    onChange={(value) => update("finish", value)}
                    options={[
                      ["basico", tr('funcional', 'functional')],
                      ["medio", "medio"],
                      ["premium", "premium"],
                      ["lujo", tr('alto / lujo', 'high-end / luxury')],
                    ]}
                  />
                </Field>

                <Field label={tr('presupuesto', 'budget')}>
                  <SelectMenu
                    value={p.budget}
                    placeholder={tr('seleccionar presupuesto', 'select budget')}
                    onChange={(value) => update("budget", value)}
                    options={[
                      ["sin_definir", tr('todavía no lo sé', 'not sure yet')],
                      ["bajo", tr('quiero optimizar al máximo', 'I want to optimize costs')],
                      ["medio", tr('tengo un rango medio', 'I have a mid-range budget')],
                      ["alto", tr('priorizo diseño y calidad', 'I prioritize design and quality')],
                    ]}
                  />
                </Field>
              </div>
              {error && <p role="alert" aria-live="assertive" className="mt-6 text-sm text-red-700">{error}</p>}
              <Actions onBack={back} onNext={next} nextLabel={tr("continuar", "continue")} backLabel={tr("← atrás", "← back")} />
            </Step>
          )}

          {step === 3 && (
            <Step title={tr('¿qué necesitas de nosotros?', 'what do you need from us?')} text={tr('No tienes que conocer el nombre técnico del servicio. Elige lo que más se acerque.', 'You do not need to know the technical service name. Choose the closest option.')}>
              <ChoiceGrid
                value={p.service}
                onChange={(value) => update("service", value)}
                options={[
                  ["concepto", tr('definir la idea y el diseño', 'define the idea and design')],
                  ["planos", tr('llevarlo a planos y permisos', 'develop drawings and permits')],
                  ["renders", tr('visualizar un proyecto', 'visualize a project')],
                  ["integral", tr('acompañamiento de diseño a obra', 'support from design to construction')],
                  ["obra", tr('construcción o seguimiento de obra', 'construction or site supervision')],
                ]}
              />

              <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
                <Field label={tr('objetivo principal', 'main goal')}>
                  <SelectMenu
                    value={p.goal}
                    placeholder={tr('seleccionar objetivo', 'select goal')}
                    onChange={(value) => update("goal", value)}
                    options={[
                      ["construir", tr('construir', 'build')],
                      ["remodelar", tr('remodelar', 'renovate')],
                      ["vender", tr('desarrollar para vender', 'develop to sell')],
                      ["rentabilizar", tr('desarrollar para rentabilizar', 'develop for rental income')],
                      ["validar", tr('validar una idea primero', 'validate an idea first')],
                    ]}
                  />
                </Field>

                <Field label={tr('momento del proyecto', 'project timing')}>
                  <SelectMenu
                    value={p.urgency}
                    placeholder={tr('seleccionar momento', 'select timing')}
                    onChange={(value) => update("urgency", value)}
                    options={[
                      ["exploratoria", tr('estoy explorando', 'I am exploring')],
                      ["normal", tr('quiero iniciar pronto', 'I want to start soon')],
                      ["inmediata", tr('necesito iniciar cuanto antes', 'I need to start as soon as possible')],
                    ]}
                  />
                </Field>
              </div>
              {error && <p role="alert" aria-live="assertive" className="mt-6 text-sm text-red-700">{error}</p>}
              <Actions onBack={back} onNext={next} nextLabel={tr("continuar", "continue")} backLabel={tr("← atrás", "← back")} />
            </Step>
          )}

          {step === 4 && (
            <Step title={tr('¿a dónde enviamos tu lectura?', 'where should we send your assessment?')} text={tr('Recibirás un resumen del proyecto. La evaluación comercial interna nunca se muestra al cliente.', 'You will receive a project summary. Internal lead qualification is never shown to clients.')}>
              <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
                <Field label={tr('nombre', 'name')}>
                  <input className="ai-field" value={p.name} onChange={(e) => update("name", e.target.value)} placeholder={tr('tu nombre', 'your name')} />
                </Field>

                <Field label={tr('correo', 'email')}>
                  <input className="ai-field" type="email" value={p.email} onChange={(e) => update("email", e.target.value)} placeholder={tr('correo@ejemplo.com', 'email@example.com')} />
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

              {error && <p role="alert" aria-live="assertive" className="mt-6 text-sm text-red-700">{error}</p>}
              <Actions onBack={back} onNext={submit} nextLabel={loading ? tr("preparando lectura...", "preparing assessment...") : tr("recibir mi lectura", "get my assessment")} backLabel={tr("← atrás", "← back")} disabled={loading} />
            </Step>
          )}

          {step === 5 && report && (
            <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
              <div>
                <p className="mb-5 text-sm text-neutral-400">{tr("lectura preliminar", "preliminary assessment")}</p>
                <h3 className="max-w-[700px] text-[clamp(2.8rem,5vw,5.4rem)] font-medium lowercase leading-[.94] tracking-[-0.06em]">
                  {tr("ya entendemos mejor tu proyecto.", "we understand your project better.")}
                </h3>
                <p className="mt-7 max-w-2xl text-[17px] leading-7 text-neutral-500">
                  {report.clientSummary}
                </p>
                <p className="mt-4 max-w-2xl text-[17px] leading-7 text-neutral-500">
                  {report.clientMessage}
                </p>
              </div>

              <div className="border-t border-black/10 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <Result label={tr('construcción estimada', 'estimated construction cost')} value={report.constructionRange} />
                <Result label={tr('servicios profesionales', 'professional fees')} value={report.professionalFeesRange} />
                <Result label={tr('otros costos', 'other costs')} value={report.otherCosts} />
                <Result label={tr('inversión preliminar', 'preliminary investment')} value={report.investmentRange} />
                <Result label={tr('tiempo preliminar', 'preliminary timeline')} value={report.estimatedTime} />
                <Result label={tr('siguiente paso', 'next step')} value={report.visibleNextStep} />
                <p className="mt-8 text-xs leading-5 text-neutral-400">
                  {tr("Esta lectura es preliminar. El costo definitivo requiere alcance, ubicación exacta, estudios y definición técnica del proyecto.", "This is a preliminary assessment. Final costs require a defined scope, exact location, studies and technical project definition.")}
                </p>
                <p className="mt-3 text-xs leading-5 text-neutral-400">
                  {tr("También enviamos este resumen a", "We also sent this summary to")} {p.email}.
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

function Actions({ onBack, onNext, nextLabel = "continuar", backLabel = "← atrás", disabled = false }: { onBack?: () => void; onNext: () => void; nextLabel?: string; backLabel?: string; disabled?: boolean }) {
  return (
    <div className="mt-12 flex items-center justify-between gap-4">
      <div>
        {onBack && (
          <button type="button" onClick={onBack} className="text-sm lowercase text-neutral-400 transition hover:text-black">
            {backLabel}
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
