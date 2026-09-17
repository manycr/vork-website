"use client";

import { useEffect, useState } from "react";

type Section =
  | "inicio"
  | "proyectos"
  | "visualizaciones"
  | "inversiones"
  | "propiedades"
  | "construccion"
  | "leads";

const sections: { id: Section; label: string; description: string }[] = [
  {
    id: "inicio",
    label: "inicio",
    description: "resumen general",
  },
  {
    id: "proyectos",
    label: "proyectos",
    description: "vork studio",
  },
  {
    id: "visualizaciones",
    label: "visualizaciones",
    description: "renders e imágenes",
  },
  {
    id: "inversiones",
    label: "inversiones",
    description: "oportunidades conceptuales",
  },
  {
    id: "propiedades",
    label: "propiedades",
    description: "compra y venta",
  },
  {
    id: "construccion",
    label: "construcción",
    description: "obra y servicios",
  },
  {
    id: "leads",
    label: "leads",
    description: "clientes potenciales",
  },
];

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<Section>("inicio");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("vork-dashboard-auth");

    if (saved === "true") {
      setAuthenticated(true);
    }
  }, []);

  function enterDashboard() {
    if (!password.trim()) return;

    sessionStorage.setItem("vork-dashboard-password", password);
    sessionStorage.setItem("vork-dashboard-auth", "true");
    setAuthenticated(true);
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#111111] text-white">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 md:px-10">
          <div className="w-full max-w-xl">
            <p className="mb-5 text-xs font-bold lowercase tracking-[0.12em] text-white/45">
              panel privado
            </p>

            <h1 className="text-5xl font-black lowercase tracking-[-0.06em] md:text-7xl">
              vork cms.
            </h1>

            <p className="mt-5 max-w-md text-sm leading-6 text-white/50">
              administración de proyectos, propiedades, inversiones,
              visualizaciones y contactos.
            </p>

            <div className="mt-12">
              <label className="mb-3 block text-xs font-bold lowercase text-white/60">
                contraseña
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") enterDashboard();
                }}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-white/30"
                placeholder="contraseña privada"
              />

              <button
                type="button"
                onClick={enterDashboard}
                className="mt-4 rounded-full bg-white px-6 py-3 text-sm font-black lowercase text-black"
              >
                entrar
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const currentSection = sections.find(
    (section) => section.id === activeSection
  );

  return (
    <main className="min-h-screen bg-[#f4f0e8] text-[#101010]">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-black/10 bg-[#111111] p-7 text-white lg:border-b-0 lg:border-r">
          <div className="lg:sticky lg:top-7">
            <a
              href="/"
              className="text-2xl font-black lowercase tracking-[-0.06em]"
            >
              vork
              <span className="font-light">studio</span>
            </a>

            <p className="mt-2 text-xs lowercase text-white/40">
              administración
            </p>

            <nav className="mt-12 space-y-1">
              {sections.map((section) => {
                const active = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm lowercase transition ${
                      active
                        ? "bg-white text-black"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="font-bold">{section.label}</span>
                    <span className={active ? "text-black/35" : "text-white/25"}>
                      →
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-12 border-t border-white/10 pt-6">
              <a
                href="/"
                className="text-xs font-bold lowercase text-white/45 hover:text-white"
              >
                ver sitio público ↗
              </a>
            </div>
          </div>
        </aside>

        <section className="px-6 py-8 md:px-10 md:py-10 lg:px-14">
          <header className="flex flex-wrap items-start justify-between gap-6 border-b border-black/10 pb-8">
            <div>
              <p className="text-xs font-bold lowercase tracking-[0.1em] text-black/40">
                vork cms
              </p>

              <h1 className="mt-3 text-5xl font-black lowercase tracking-[-0.06em] md:text-7xl">
                {currentSection?.label}.
              </h1>

              <p className="mt-3 text-sm lowercase text-black/45">
                {currentSection?.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem("vork-dashboard-auth");
                sessionStorage.removeItem("vork-dashboard-password");
                setAuthenticated(false);
                setPassword("");
              }}
              className="rounded-full border border-black/15 px-5 py-2.5 text-xs font-bold lowercase transition hover:bg-black hover:text-white"
            >
              cerrar sesión
            </button>
          </header>

          <div className="py-10">
            {activeSection === "inicio" && (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {sections.slice(1).map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className="min-h-52 rounded-3xl border border-black/10 bg-white/45 p-7 text-left transition hover:bg-white"
                  >
                    <p className="text-xs font-bold lowercase text-black/35">
                      {section.description}
                    </p>

                    <h2 className="mt-16 text-3xl font-black lowercase tracking-[-0.05em]">
                      {section.label}
                    </h2>

                    <p className="mt-3 text-sm lowercase text-black/40">
                      gestionar →
                    </p>
                  </button>
                ))}
              </div>
            )}

            {activeSection !== "inicio" && (
              <div className="rounded-3xl border border-black/10 bg-white/50 p-8 md:p-10">
                <p className="text-xs font-bold lowercase tracking-[0.08em] text-black/35">
                  {currentSection?.description}
                </p>

                <h2 className="mt-3 text-3xl font-black lowercase tracking-[-0.05em]">
                  {currentSection?.label}
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-black/50">
                  esta sección está lista para conectar con el contenido
                  existente de vork.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}