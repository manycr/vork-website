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
  const [items, setItems] = useState<any[]>([]);
const [loadingItems, setLoadingItems] = useState(false);
const [itemsError, setItemsError] = useState("");
const [showProjectForm, setShowProjectForm] = useState(false);
const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
const [projectForm, setProjectForm] = useState({
  title: "",
  category: "",
  location: "",
  year: "",
  area: "",
  services: "",
  summary: "",
  description: "",
  concept: "",
  status: "draft",
  featured: false,
  cover_image: "",
  gallery: "",
});

async function loadItems() {
  const savedPassword =
    password || sessionStorage.getItem("vork-dashboard-password") || "";

  if (!savedPassword) return;

  setLoadingItems(true);
  setItemsError("");

  try {
    const response = await fetch("/api/dashboard/items", {
      headers: {
        "x-dashboard-password": savedPassword,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setItemsError(data.error || "no se pudo cargar el contenido");
      return;
    }

    setItems(data.items || []);
  } catch {
    setItemsError("no se pudo conectar con el contenido");
  } finally {
    setLoadingItems(false);
  }
}

async function uploadImage(file: File) {
  const savedPassword =
    password || sessionStorage.getItem("vork-dashboard-password") || "";

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/dashboard/upload", {
    method: "POST",
    headers: {
      "x-dashboard-password": savedPassword,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "no se pudo subir la imagen");
  }

  return data.url;
}async function saveProject() {
  const savedPassword =
    password || sessionStorage.getItem("vork-dashboard-password") || "";

  if (!projectForm.title.trim()) {
    setItemsError("escribe el nombre del proyecto");
    return;
  }

  setItemsError("");

  try {
    const response = await fetch(
  editingProjectId
    ? `/api/dashboard/items/${editingProjectId}`
    : "/api/dashboard/items",
  {
    method: editingProjectId ? "PATCH" : "POST",
    headers: {
      "Content-Type": "application/json",
      "x-dashboard-password": savedPassword,
    },
    body: JSON.stringify({
      type: "project",
      ...projectForm,
    }),
  }
);;

    if (!response.ok) {
      const data = await response.json();
      setItemsError(data.error || "no se pudo guardar el proyecto");
      return;
    }

    setProjectForm({
      title: "",
      category: "",
      location: "",
      year: "",
      area: "",
      services: "",
      summary: "",
      description: "",
      concept: "",
      status: "draft",
      featured: false,
      cover_image: "",
      gallery: "",
    });

    setShowProjectForm(false);
    setEditingProjectId(null);
    await loadItems();
  } catch {
    setItemsError("no se pudo conectar con el servidor");
  }
}

  async function deleteProject(id: string) {
  const savedPassword =
    password || sessionStorage.getItem("vork-dashboard-password") || "";

  if (!confirm("¿seguro que quieres eliminar este proyecto?")) return;

  try {
    const response = await fetch(`/api/dashboard/items/${id}`, {
      method: "DELETE",
      headers: {
        "x-dashboard-password": savedPassword,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setItemsError(data.error || "no se pudo eliminar el proyecto");
      return;
    }

    await loadItems();
  } catch {
    setItemsError("no se pudo conectar con el servidor");
  }
}function editProject(item: any) {
  setEditingProjectId(item.id);
  setProjectForm({
    title: item.title || "",
    category: item.category || "",
    location: item.location || "",
    year: item.year || "",
    area: item.area || "",
    services: item.services?.join(", ") || "",
    summary: item.summary || "",
    description: item.description || "",
    concept: item.concept || "",
    status: item.status || "draft",
    featured: item.featured || false,
    cover_image: item.cover_image || "",
    gallery: item.gallery?.join("\n") || "",
  });

  setShowProjectForm(true);
}useEffect(() => {
  const saved = sessionStorage.getItem("vork-dashboard-auth");
  const savedPassword = sessionStorage.getItem("vork-dashboard-password");

  if (saved === "true" && savedPassword) {
    setAuthenticated(true);
    loadItems();
  }
}, []);

  async function enterDashboard() {
  if (!password.trim()) return;

  sessionStorage.setItem("vork-dashboard-password", password);
  sessionStorage.setItem("vork-dashboard-auth", "true");
  setAuthenticated(true);

  setTimeout(() => {
    loadItems();
  }, 100);
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

            {activeSection === "proyectos" && (
  <div>
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs font-bold lowercase tracking-[0.08em] text-black/35">
          vork studio
        </p>
        <h2 className="mt-2 text-3xl font-black lowercase tracking-[-0.05em]">
          proyectos publicados
        </h2>
        <p className="mt-2 text-sm text-black/45">
          {items.filter((item) => item.type === "project").length} proyectos
        </p>
      </div>

      <button
        type="button"
        onClick={() => setShowProjectForm(true)}
        className="rounded-full bg-black px-5 py-3 text-xs font-bold lowercase text-white"
      >
        + nuevo proyecto
      </button>
      {showProjectForm && (
  <div className="mt-6 rounded-3xl border border-black/10 bg-white p-6 md:p-8">
    <div className="flex items-start justify-between gap-6">
      <div>
        <p className="text-xs font-bold lowercase tracking-[0.08em] text-black/35">
          vork studio
        </p>

        <h3 className="mt-2 text-3xl font-black lowercase tracking-[-0.05em]">
          nuevo proyecto
        </h3>
      </div>

      <button
        type="button"
        onClick={() => setShowProjectForm(false)}
        className="text-xs font-bold lowercase text-black/50 hover:text-black"
      >
        cerrar ×
      </button>
    </div>
    <div className="mt-8 grid gap-5 md:grid-cols-2">
  <div className="md:col-span-2">
    <label className="mb-2 block text-xs font-bold lowercase text-black/45">
      nombre del proyecto
    </label>
    <input
      type="text"
      value={projectForm.title}
      onChange={(e) =>
        setProjectForm({ ...projectForm, title: e.target.value })
      }
      placeholder="ej. casa nosara"
      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
    />
  </div>

  <div>
    <label className="mb-2 block text-xs font-bold lowercase text-black/45">
      categoría
    </label>
    <input
      type="text"
      value={projectForm.category}
      onChange={(e) =>
        setProjectForm({ ...projectForm, category: e.target.value })
      }
      placeholder="ej. residencial"
      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
    />
  </div>

  <div>
    <label className="mb-2 block text-xs font-bold lowercase text-black/45">
      ubicación
    </label>
    <input
      type="text"
      value={projectForm.location}
      onChange={(e) =>
        setProjectForm({ ...projectForm, location: e.target.value })
      }
      placeholder="ej. nosara, guanacaste"
      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
    />
  </div>

  <div>
    <label className="mb-2 block text-xs font-bold lowercase text-black/45">
      año
    </label>
    <input
      type="text"
      value={projectForm.year}
      onChange={(e) =>
        setProjectForm({ ...projectForm, year: e.target.value })
      }
      placeholder="2026"
      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
    />
  </div>

  <div>
    <label className="mb-2 block text-xs font-bold lowercase text-black/45">
      área
    </label>
    <input
      type="text"
      value={projectForm.area}
      onChange={(e) =>
        setProjectForm({ ...projectForm, area: e.target.value })
      }
      placeholder="ej. 185 m²"
      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
    />
  </div>
  <div className="md:col-span-2">
  <label className="mb-2 block text-xs font-bold lowercase text-black/45">
    servicios
  </label>
  <input
    type="text"
    value={projectForm.services}
    onChange={(e) =>
      setProjectForm({ ...projectForm, services: e.target.value })
    }
    placeholder="ej. arquitectura, diseño interior, visualización"
    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
  />
</div>

<div className="md:col-span-2">
  <label className="mb-2 block text-xs font-bold lowercase text-black/45">
    resumen
  </label>
  <textarea
    value={projectForm.summary}
    onChange={(e) =>
      setProjectForm({ ...projectForm, summary: e.target.value })
    }
    placeholder="descripción breve que aparecerá en la presentación del proyecto"
    rows={3}
    className="w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
  />
</div>
<div className="md:col-span-2">
  <label className="mb-2 block text-xs font-bold lowercase text-black/45">
    descripción
  </label>
  <textarea
    value={projectForm.description}
    onChange={(e) =>
      setProjectForm({ ...projectForm, description: e.target.value })
    }
    placeholder="descripción completa del proyecto"
    rows={5}
    className="w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
  />
</div>

<div className="md:col-span-2">
  <label className="mb-2 block text-xs font-bold lowercase text-black/45">
    concepto
  </label>
  <textarea
    value={projectForm.concept}
    onChange={(e) =>
      setProjectForm({ ...projectForm, concept: e.target.value })
    }
    placeholder="idea o concepto arquitectónico del proyecto"
    rows={4}
    className="w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
  />
</div>
<div>
  <label className="mb-2 block text-xs font-bold lowercase text-black/45">
    estado
  </label>

  <select
    value={projectForm.status}
    onChange={(e) =>
      setProjectForm({
        ...projectForm,
        status: e.target.value,
      })
    }
    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
  >
    <option value="draft">borrador</option>
    <option value="published">publicado</option>
  </select>
</div>

<div className="flex items-end">
  <label className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3">
    <input
      type="checkbox"
      checked={projectForm.featured}
      onChange={(e) =>
        setProjectForm({
          ...projectForm,
          featured: e.target.checked,
        })
      }
    />

    <span className="text-sm font-bold lowercase">
      proyecto destacado
    </span>
  </label>
</div>
</div><div className="md:col-span-2">
  <label className="mb-2 block text-xs font-bold lowercase">
    imagen de portada
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const url = await uploadImage(file);

        setProjectForm({
          ...projectForm,
          cover_image: url,
        });
      } catch {
        setItemsError("no se pudo subir la imagen");
      }
    }}
    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
  />

  {projectForm.cover_image && (
  <div className="relative mt-4">
    <img
      src={projectForm.cover_image}
      alt="portada del proyecto"
      className="h-48 w-full rounded-2xl object-cover"
    />

    <button
      type="button"
      onClick={() =>
        setProjectForm({
          ...projectForm,
          cover_image: "",
        })
      }
      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black text-lg text-white"
      aria-label="eliminar imagen de portada"
    >
      ×
    </button>
  </div>
)}
<div className="md:col-span-2">
  <label className="mb-2 block text-xs font-bold lowercase">
    galería del proyecto
  </label>

  <input
    type="file"
    accept="image/*"
    multiple
    onChange={async (e) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;

      try {
        const urls = [];

        for (const file of files) {
          const url = await uploadImage(file);
          urls.push(url);
        }

        const currentGallery = projectForm.gallery
          ? projectForm.gallery.split("\n").filter(Boolean)
          : [];

        setProjectForm({
          ...projectForm,
          gallery: [...currentGallery, ...urls].join("\n"),
        });
      } catch {
        setItemsError("no se pudieron subir las imágenes");
      }
    }}
    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
  />

  {projectForm.gallery && (
    <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
      {projectForm.gallery
        .split("\n")
        .filter(Boolean)
        .map((image, index) => (
  <div
    key={`${image}-${index}`}
    className="relative"
  >
    <img
      src={image}
      alt={`imagen ${index + 1} del proyecto`}
      className="h-36 w-full rounded-2xl object-cover"
    />

    <div className="absolute bottom-2 right-2 flex gap-1">
  <button
    type="button"
    disabled={index === 0}
    onClick={() => {
      const images = projectForm.gallery.split("\n").filter(Boolean);
      [images[index - 1], images[index]] = [images[index], images[index - 1]];

      setProjectForm({
        ...projectForm,
        gallery: images.join("\n"),
      });
    }}
    className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white disabled:opacity-30"
  >
    ←
  </button>

  <button
    type="button"
    disabled={
      index === projectForm.gallery.split("\n").filter(Boolean).length - 1
    }
    onClick={() => {
      const images = projectForm.gallery.split("\n").filter(Boolean);
      [images[index], images[index + 1]] = [images[index + 1], images[index]];

      setProjectForm({
        ...projectForm,
        gallery: images.join("\n"),
      });
    }}
    className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white disabled:opacity-30"
  >
    →
  </button>
</div>
    <button
      type="button"
      onClick={() => {
        const images = projectForm.gallery
          .split("\n")
          .filter(Boolean)
          .filter((_, i) => i !== index);

        setProjectForm({
          ...projectForm,
          gallery: images.join("\n"),
        });
      }}
      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black text-lg text-white"
      aria-label="eliminar imagen"
    >
      ×
    </button>
  </div>
))}
    </div>
  )}
</div></div><div className="md:col-span-2 flex justify-end pt-4">
  <button
    type="button"
    onClick={saveProject}
    className="rounded-full bg-black px-6 py-3 text-xs font-bold lowercase text-white"
  >
    guardar proyecto
  </button>
</div>
  </div>
)}
    </div>

    {loadingItems && (
      <p className="py-10 text-sm text-black/45">cargando proyectos...</p>
    )}

    {itemsError && (
      <p className="py-6 text-sm text-red-700">{itemsError}</p>
    )}

    {!loadingItems &&
      items
        .filter((item) => item.type === "project")
        .map((item) => (
          <div
            key={item.id}
            className="mb-4 rounded-3xl border border-black/10 bg-white/60 p-6 md:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <p className="text-xs font-bold lowercase tracking-[0.08em] text-black/35">
                  {item.status}
                </p>

                <h3 className="mt-2 text-2xl font-black lowercase tracking-[-0.04em]">
                  {item.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm lowercase text-black/45">
                  {item.location && <span>{item.location}</span>}
                  {item.area && <span>{item.area}</span>}
                  {item.year && <span>{item.year}</span>}
                </div>

                {item.summary && (
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-black/55">
                    {item.summary}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => editProject(item)}
                  className="rounded-full border border-black/15 px-4 py-2 text-xs font-bold lowercase"
                >
                  editar
                </button>

                <button
                  type="button"
                  onClick={() => deleteProject(item.id)}
                  className="rounded-full border border-black/15 px-4 py-2 text-xs font-bold lowercase"
                >
                  eliminar
                </button>
              </div>
            </div>
          </div>
        ))}

    {!loadingItems &&
      !itemsError &&
      items.filter((item) => item.type === "project").length === 0 && (
        <div className="rounded-3xl border border-black/10 bg-white/50 p-8">
          <p className="text-sm text-black/45">
            todavía no hay proyectos.
          </p>
        </div>
      )}
  </div>
)}
          </div>
        </section>
      </div>
    </main>
  );
}