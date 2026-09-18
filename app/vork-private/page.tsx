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
const [showVisualForm, setShowVisualForm] = useState(false);

const emptyManagedForm = {
  title: "", category: "", location: "", year: "", area: "", price: "",
  services: "", summary: "", description: "", investment_thesis: "",
  status: "draft", featured: false, cover_image: "", gallery: "",
};
const [managedType, setManagedType] = useState<"investment" | "property" | "construction" | null>(null);
const [editingManagedId, setEditingManagedId] = useState<string | null>(null);
const [managedForm, setManagedForm] = useState(emptyManagedForm);
const [leads, setLeads] = useState<any[]>([]);
const [loadingLeads, setLoadingLeads] = useState(false);
const [leadsError, setLeadsError] = useState("");
const [editingVisualId, setEditingVisualId] = useState<string | null>(null);

const emptyVisualForm = {
  title: "",
  category: "",
  summary: "",
  cover_image: "",
  status: "draft",
  featured: false,
};

const [visualForm, setVisualForm] = useState(emptyVisualForm);

function resetVisualForm() {
  setVisualForm(emptyVisualForm);
  setEditingVisualId(null);
  setShowVisualForm(false);
}

function newVisual() {
  setItemsError("");
  setEditingVisualId(null);
  setVisualForm(emptyVisualForm);
  setShowVisualForm(true);
}

function editVisual(item: any) {
  setItemsError("");
  setEditingVisualId(item.id);
  setVisualForm({
    title: item.title || "",
    category: item.category || "",
    summary: item.summary || "",
    cover_image: item.cover_image || "",
    status: item.status || "draft",
    featured: Boolean(item.featured),
  });
  setShowVisualForm(true);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function saveVisual() {
  const savedPassword =
    password || sessionStorage.getItem("vork-dashboard-password") || "";

  if (!visualForm.title.trim()) {
    setItemsError("escribe el nombre de la visualización");
    return;
  }

  setItemsError("");

  try {
    const response = await fetch(
      editingVisualId
        ? `/api/dashboard/items/${editingVisualId}`
        : "/api/dashboard/items",
      {
        method: editingVisualId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          "x-dashboard-password": savedPassword,
        },
        body: JSON.stringify({
          type: "visual",
          ...visualForm,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setItemsError(data.error || "no se pudo guardar la visualización");
      return;
    }

    resetVisualForm();
    await loadItems();
  } catch {
    setItemsError("no se pudo conectar con el servidor");
  }
}

async function deleteVisual(id: string) {
  const savedPassword =
    password || sessionStorage.getItem("vork-dashboard-password") || "";

  if (!confirm("¿seguro que quieres eliminar esta visualización?")) return;

  setItemsError("");

  try {
    const response = await fetch(`/api/dashboard/items/${id}`, {
      method: "DELETE",
      headers: {
        "x-dashboard-password": savedPassword,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setItemsError(data.error || "no se pudo eliminar la visualización");
      return;
    }

    if (editingVisualId === id) resetVisualForm();
    await loadItems();
  } catch {
    setItemsError("no se pudo conectar con el servidor");
  }
}

function openManagedForm(type: "investment" | "property" | "construction") {
  setItemsError("");
  setManagedType(type);
  setEditingManagedId(null);
  setManagedForm(emptyManagedForm);
}

function editManagedItem(item: any) {
  setItemsError("");
  setManagedType(item.type);
  setEditingManagedId(item.id);
  setManagedForm({
    title: item.title || "", category: item.category || "", location: item.location || "",
    year: item.year || "", area: item.area || "", price: item.price || "",
    services: item.services?.join(", ") || "", summary: item.summary || "",
    description: item.description || "", investment_thesis: item.investment_thesis || "",
    status: item.status || "draft", featured: Boolean(item.featured),
    cover_image: item.cover_image || "", gallery: item.gallery?.join("\n") || "",
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeManagedForm() {
  setManagedType(null);
  setEditingManagedId(null);
  setManagedForm(emptyManagedForm);
}

async function saveManagedItem() {
  if (!managedType || !managedForm.title.trim()) {
    setItemsError("escribe el nombre antes de guardar");
    return;
  }
  const savedPassword = password || sessionStorage.getItem("vork-dashboard-password") || "";
  setItemsError("");
  try {
    const response = await fetch(
      editingManagedId ? `/api/dashboard/items/${editingManagedId}` : "/api/dashboard/items",
      {
        method: editingManagedId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json", "x-dashboard-password": savedPassword },
        body: JSON.stringify({ type: managedType, ...managedForm }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      setItemsError(data.error || "no se pudo guardar el contenido");
      return;
    }
    closeManagedForm();
    await loadItems();
  } catch {
    setItemsError("no se pudo conectar con el servidor");
  }
}

async function deleteManagedItem(id: string, label: string) {
  if (!confirm(`¿seguro que quieres eliminar ${label}?`)) return;
  const savedPassword = password || sessionStorage.getItem("vork-dashboard-password") || "";
  setItemsError("");
  try {
    const response = await fetch(`/api/dashboard/items/${id}`, {
      method: "DELETE",
      headers: { "x-dashboard-password": savedPassword },
    });
    const data = await response.json();
    if (!response.ok) {
      setItemsError(data.error || "no se pudo eliminar el contenido");
      return;
    }
    if (editingManagedId === id) closeManagedForm();
    await loadItems();
  } catch {
    setItemsError("no se pudo conectar con el servidor");
  }
}

async function loadLeads() {
  const savedPassword = password || sessionStorage.getItem("vork-dashboard-password") || "";
  if (!savedPassword) return;
  setLoadingLeads(true);
  setLeadsError("");
  try {
    const response = await fetch("/api/dashboard/leads", {
      headers: { "x-dashboard-password": savedPassword },
    });
    const data = await response.json();
    if (!response.ok) {
      setLeadsError(data.error || "no se pudieron cargar los leads");
      return;
    }
    setLeads(data.leads || []);
  } catch {
    setLeadsError("no se pudo conectar con los leads");
  } finally {
    setLoadingLeads(false);
  }
}

async function loadItems(passwordOverride?: string) {
  const savedPassword =
    passwordOverride ||
    password ||
    sessionStorage.getItem("vork-dashboard-password") || "";

  if (!savedPassword) {
    setItemsError("no se encontró la contraseña del dashboard");
    setLoadingItems(false);
    return;
  }

  setLoadingItems(true);
  setItemsError("");

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch("/api/dashboard/items", {
      method: "GET",
      cache: "no-store",
      headers: {
        "x-dashboard-password": savedPassword,
      },
      signal: controller.signal,
    });

    const data = await response.json();

    if (!response.ok) {
      setItems([]);
      setItemsError(data.error || "no se pudo cargar el contenido");
      return;
    }

    setItems(Array.isArray(data.items) ? data.items : []);
  } catch (error: any) {
    setItems([]);
    if (error?.name === "AbortError") {
      setItemsError("la carga tardó demasiado. revisa que el servidor local esté conectado a supabase.");
    } else {
      setItemsError("no se pudo conectar con el contenido");
    }
  } finally {
    window.clearTimeout(timeout);
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
    loadItems(savedPassword);
  }
}, []);

  async function enterDashboard() {
  if (!password.trim()) return;

  sessionStorage.setItem("vork-dashboard-password", password);
  sessionStorage.setItem("vork-dashboard-auth", "true");
  setAuthenticated(true);
  loadItems(password);
}

  useEffect(() => {
    if (authenticated && activeSection === "leads") loadLeads();
  }, [authenticated, activeSection]);

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


  function managedLabel(type: "investment" | "property" | "construction") {
    if (type === "investment") return { singular: "inversión", plural: "inversiones", eyebrow: "vork investments" };
    if (type === "property") return { singular: "propiedad", plural: "propiedades", eyebrow: "vork properties" };
    return { singular: "proyecto de construcción", plural: "construcción", eyebrow: "vork build" };
  }

  function renderManagedSection(type: "investment" | "property" | "construction") {
    const labels = managedLabel(type);
    const list = items.filter((item) => item.type === type);
    const formOpen = managedType === type;
    return (
      <div>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold lowercase tracking-[0.08em] text-black/35">{labels.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-black lowercase tracking-[-0.05em]">{labels.plural}</h2>
            <p className="mt-2 text-sm text-black/45">{list.length} {labels.plural}</p>
          </div>
          <button type="button" onClick={() => openManagedForm(type)} className="rounded-full bg-black px-5 py-3 text-xs font-bold lowercase text-white transition hover:bg-[#5b5b5b]">
            + nueva {labels.singular}
          </button>
        </div>

        {formOpen && (
          <div className="mb-8 rounded-3xl border border-black/10 bg-white p-6 md:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-bold lowercase tracking-[0.08em] text-black/35">{labels.eyebrow}</p>
                <h3 className="mt-2 text-3xl font-black lowercase tracking-[-0.05em]">{editingManagedId ? `editar ${labels.singular}` : `nueva ${labels.singular}`}</h3>
              </div>
              <button type="button" onClick={closeManagedForm} className="rounded-full px-3 py-2 text-xs font-bold lowercase text-black/45 transition hover:bg-black hover:text-white">cerrar ×</button>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-bold lowercase text-black/45">nombre</label>
                <input value={managedForm.title} onChange={(e) => setManagedForm({ ...managedForm, title: e.target.value })} className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder={type === "property" ? "ej. casa nosara" : type === "investment" ? "ej. villas guanacaste" : "ej. residencia santa ana"} />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold lowercase text-black/45">categoría</label>
                <input value={managedForm.category} onChange={(e) => setManagedForm({ ...managedForm, category: e.target.value })} className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder="ej. residencial" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold lowercase text-black/45">ubicación</label>
                <input value={managedForm.location} onChange={(e) => setManagedForm({ ...managedForm, location: e.target.value })} className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder="ej. nosara, guanacaste" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold lowercase text-black/45">año</label>
                <input value={managedForm.year} onChange={(e) => setManagedForm({ ...managedForm, year: e.target.value })} className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder="2026" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold lowercase text-black/45">área</label>
                <input value={managedForm.area} onChange={(e) => setManagedForm({ ...managedForm, area: e.target.value })} className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder="ej. 240 m²" />
              </div>
              {(type === "investment" || type === "property") && (
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-bold lowercase text-black/45">{type === "investment" ? "inversión / precio" : "precio"}</label>
                  <input value={managedForm.price} onChange={(e) => setManagedForm({ ...managedForm, price: e.target.value })} className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder="ej. $285,000" />
                </div>
              )}
              {type === "construction" && (
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-bold lowercase text-black/45">servicios</label>
                  <input value={managedForm.services} onChange={(e) => setManagedForm({ ...managedForm, services: e.target.value })} className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder="ej. construcción, inspección, coordinación" />
                </div>
              )}
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-bold lowercase text-black/45">resumen</label>
                <textarea rows={3} value={managedForm.summary} onChange={(e) => setManagedForm({ ...managedForm, summary: e.target.value })} className="w-full resize-none rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder="descripción breve" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-bold lowercase text-black/45">descripción</label>
                <textarea rows={5} value={managedForm.description} onChange={(e) => setManagedForm({ ...managedForm, description: e.target.value })} className="w-full resize-none rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder="descripción completa" />
              </div>
              {type === "investment" && (
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-bold lowercase text-black/45">tesis de inversión</label>
                  <textarea rows={5} value={managedForm.investment_thesis} onChange={(e) => setManagedForm({ ...managedForm, investment_thesis: e.target.value })} className="w-full resize-none rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder="por qué existe la oportunidad y cuál es su lógica" />
                </div>
              )}
              <div>
                <label className="mb-2 block text-xs font-bold lowercase text-black/45">estado</label>
                <select value={managedForm.status} onChange={(e) => setManagedForm({ ...managedForm, status: e.target.value })} className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/30">
                  <option value="draft">borrador</option><option value="published">publicado</option>
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-black/10 px-4 py-3 transition hover:bg-black hover:text-white">
                  <input type="checkbox" checked={managedForm.featured} onChange={(e) => setManagedForm({ ...managedForm, featured: e.target.checked })} />
                  <span className="text-sm font-bold lowercase">destacado</span>
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-bold lowercase text-black/45">imagen de portada</label>
                <input type="file" accept="image/*" onChange={async (e) => { const file=e.target.files?.[0]; if(!file)return; try { const url=await uploadImage(file); setManagedForm({ ...managedForm, cover_image:url }); } catch { setItemsError("no se pudo subir la imagen"); } }} className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm" />
                {managedForm.cover_image && <div className="relative mt-4"><img src={managedForm.cover_image} alt="portada" className="h-64 w-full rounded-2xl object-cover"/><button type="button" onClick={() => setManagedForm({ ...managedForm, cover_image:"" })} className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition hover:bg-red-700">×</button></div>}
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-bold lowercase text-black/45">galería</label>
                <input type="file" accept="image/*" multiple onChange={async (e) => { const files=Array.from(e.target.files||[]); if(!files.length)return; try { const urls=[]; for(const file of files) urls.push(await uploadImage(file)); const current=managedForm.gallery?managedForm.gallery.split("\n").filter(Boolean):[]; setManagedForm({ ...managedForm, gallery:[...current,...urls].join("\n") }); } catch { setItemsError("no se pudieron subir las imágenes"); } }} className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm" />
                {managedForm.gallery && <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">{managedForm.gallery.split("\n").filter(Boolean).map((image,index)=><div key={`${image}-${index}`} className="relative"><img src={image} alt={`imagen ${index+1}`} className="aspect-square w-full rounded-2xl object-cover"/><button type="button" onClick={() => { const images=managedForm.gallery.split("\n").filter(Boolean).filter((_,i)=>i!==index); setManagedForm({...managedForm,gallery:images.join("\n")}); }} className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition hover:bg-red-700">×</button></div>)}</div>}
              </div>
            </div>
            {itemsError && <p className="mt-5 text-sm text-red-700">{itemsError}</p>}
            <div className="mt-7 flex justify-end gap-2 border-t border-black/10 pt-5">
              <button type="button" onClick={closeManagedForm} className="rounded-full border border-black/15 px-5 py-3 text-xs font-bold lowercase transition hover:bg-black hover:text-white">cancelar</button>
              <button type="button" onClick={saveManagedItem} className="rounded-full bg-black px-6 py-3 text-xs font-bold lowercase text-white transition hover:bg-[#5b5b5b]">{editingManagedId ? "guardar cambios" : `guardar ${labels.singular}`}</button>
            </div>
          </div>
        )}

        {loadingItems && <p className="py-10 text-sm text-black/45">cargando...</p>}
        {!formOpen && itemsError && <p className="mb-6 text-sm text-red-700">{itemsError}</p>}
        {!loadingItems && <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{list.map((item)=><article key={item.id} className="group overflow-hidden rounded-3xl border border-black/10 bg-white">
          <div className="relative aspect-[4/3] overflow-hidden bg-black/5">{item.cover_image?<img src={item.cover_image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"/>:<div className="flex h-full items-center justify-center text-xs font-bold lowercase text-black/25">sin imagen</div>}
            <div className="absolute left-3 top-3 flex gap-2"><span className={`rounded-full px-3 py-1.5 text-[10px] font-black lowercase backdrop-blur-md ${item.status==="published"?"bg-white/90 text-black":"bg-black/70 text-white"}`}>{item.status==="published"?"publicado":"borrador"}</span>{item.featured&&<span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-black lowercase text-black">destacado</span>}</div>
          </div>
          <div className="p-5"><p className="text-xs font-bold lowercase tracking-[0.08em] text-black/35">{item.category||labels.singular}</p><h3 className="mt-2 text-xl font-black lowercase tracking-[-0.035em]">{item.title}</h3>
            <div className="mt-2 flex flex-wrap gap-x-3 text-xs lowercase text-black/40">{item.location&&<span>{item.location}</span>}{item.area&&<span>{item.area}</span>}{item.price&&<span>{item.price}</span>}</div>{item.summary&&<p className="mt-3 line-clamp-3 text-sm leading-6 text-black/50">{item.summary}</p>}
            <div className="mt-6 flex flex-wrap gap-2 border-t border-black/10 pt-4"><button type="button" onClick={()=>editManagedItem(item)} className="rounded-full border border-black/15 px-4 py-2 text-xs font-bold lowercase transition hover:bg-black hover:text-white">editar</button><button type="button" onClick={()=>deleteManagedItem(item.id,labels.singular)} className="rounded-full border border-black/15 px-4 py-2 text-xs font-bold lowercase transition hover:border-red-700 hover:bg-red-700 hover:text-white">eliminar</button></div>
          </div>
        </article>)}</div>}
        {!loadingItems && !itemsError && list.length===0 && <div className="rounded-3xl border border-black/10 bg-white/50 p-8"><p className="text-sm text-black/45">todavía no hay {labels.plural}.</p></div>}
      </div>
    );
  }

  function renderLeads() {
    return (
      <div>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold lowercase tracking-[0.08em] text-black/35">vork studio</p><h2 className="mt-2 text-3xl font-black lowercase tracking-[-0.05em]">leads</h2><p className="mt-2 text-sm text-black/45">{leads.length} contactos recibidos</p></div><button type="button" onClick={loadLeads} className="rounded-full border border-black/15 px-5 py-3 text-xs font-bold lowercase transition hover:bg-black hover:text-white">actualizar ↻</button></div>
        {loadingLeads && <p className="py-10 text-sm text-black/45">cargando leads...</p>}
        {leadsError && <p className="mb-6 text-sm text-red-700">{leadsError}</p>}
        {!loadingLeads && leads.length>0 && <div className="space-y-4">{leads.map((lead)=><article key={lead.id} className="rounded-3xl border border-black/10 bg-white p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5"><div><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-black px-3 py-1.5 text-[10px] font-black lowercase text-white">{lead.qualification||lead.complexity||"lead"}</span>{lead.lead_score!==null&&lead.lead_score!==undefined&&<span className="rounded-full border border-black/10 px-3 py-1.5 text-[10px] font-black lowercase">score {lead.lead_score}</span>}</div><h3 className="mt-4 text-2xl font-black lowercase tracking-[-0.04em]">{lead.name||"sin nombre"}</h3><p className="mt-2 text-sm text-black/45">{lead.project_type||"proyecto"}{lead.location_zone?` · ${lead.location_zone}`:""}{lead.area?` · ${lead.area} m²`:""}</p></div><div className="flex flex-wrap gap-2">{lead.email&&<a href={`mailto:${lead.email}`} className="rounded-full border border-black/15 px-4 py-2 text-xs font-bold lowercase transition hover:bg-black hover:text-white">correo ↗</a>}{lead.phone&&<a href={`tel:${lead.country_code||""}${lead.phone}`} className="rounded-full border border-black/15 px-4 py-2 text-xs font-bold lowercase transition hover:bg-black hover:text-white">llamar ↗</a>}</div></div>
          <div className="mt-6 grid gap-3 border-t border-black/10 pt-5 text-sm md:grid-cols-2 xl:grid-cols-4"><div><p className="text-xs font-bold lowercase text-black/35">servicio</p><p className="mt-1">{lead.service_needed||"—"}</p></div><div><p className="text-xs font-bold lowercase text-black/35">presupuesto</p><p className="mt-1">{lead.budget_range||"—"}</p></div><div><p className="text-xs font-bold lowercase text-black/35">urgencia</p><p className="mt-1">{lead.urgency||"—"}</p></div><div><p className="text-xs font-bold lowercase text-black/35">acabados</p><p className="mt-1">{lead.finish_level||"—"}</p></div></div>
          {lead.goal&&<div className="mt-5"><p className="text-xs font-bold lowercase text-black/35">objetivo del cliente</p><p className="mt-2 text-sm leading-6 text-black/60">{lead.goal}</p></div>}{lead.ai_summary&&<div className="mt-5 rounded-2xl bg-white p-5"><p className="text-xs font-bold lowercase text-black/35">resumen ai</p><p className="mt-2 text-sm leading-6 text-black/60">{lead.ai_summary}</p></div>}
        </article>)}</div>}
        {!loadingLeads&&!leadsError&&leads.length===0&&<div className="rounded-3xl border border-black/10 bg-white/50 p-8"><p className="text-sm text-black/45">todavía no hay leads guardados. Los leads aparecen aquí cuando una persona completa el análisis de proyecto del sitio.</p></div>}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#101010]">
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
    <div className="mt-8 border-t border-black/10 pt-6">
  <p className="text-xs font-bold lowercase tracking-[0.08em] text-black/35">
    información básica
  </p>
</div>
<div className="mt-5 grid gap-5 md:grid-cols-2">
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

<div className="md:col-span-2 mt-4 border-t border-black/10 pt-6">
  <p className="text-xs font-bold lowercase tracking-[0.08em] text-black/35">
    descripción del proyecto
  </p>
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
                  className="rounded-full border border-black/15 px-4 py-2 text-xs font-bold lowercase transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
                >
                  editar
                </button>

                <button
                  type="button"
                  onClick={() => deleteProject(item.id)}
                  className="rounded-full border border-black/15 px-4 py-2 text-xs font-bold lowercase text-black transition-all duration-200 hover:border-red-600 hover:bg-red-600 hover:text-white"
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
)}{activeSection === "visualizaciones" && (
  <div>
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs font-bold lowercase tracking-[0.08em] text-black/35">
          vork studio
        </p>
        <h2 className="mt-2 text-3xl font-black lowercase tracking-[-0.05em]">
          visualizaciones
        </h2>
        <p className="mt-2 text-sm text-black/45">
          {items.filter((item) => item.type === "visual").length} visualizaciones
        </p>
      </div>

      <button
        type="button"
        onClick={newVisual}
        className="rounded-full bg-black px-5 py-3 text-xs font-bold lowercase text-white transition hover:opacity-75"
      >
        + nueva visualización
      </button>
    </div>

    {showVisualForm && (
      <div className="mb-10 rounded-3xl border border-black/10 bg-white p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-black/10 pb-6">
          <div>
            <p className="text-xs font-bold lowercase tracking-[0.08em] text-black/35">
              vork studio
            </p>
            <h3 className="mt-2 text-3xl font-black lowercase tracking-[-0.05em]">
              {editingVisualId ? "editar visualización" : "nueva visualización"}
            </h3>
          </div>

          <button
            type="button"
            onClick={resetVisualForm}
            className="text-xs font-bold lowercase text-black/50 transition hover:text-black"
          >
            cerrar ×
          </button>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-xs font-bold lowercase text-black/45">
              nombre
            </label>
            <input
              type="text"
              value={visualForm.title}
              onChange={(e) =>
                setVisualForm({ ...visualForm, title: e.target.value })
              }
              placeholder="ej. atmósfera interior"
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold lowercase text-black/45">
              categoría
            </label>
            <input
              type="text"
              value={visualForm.category}
              onChange={(e) =>
                setVisualForm({ ...visualForm, category: e.target.value })
              }
              placeholder="ej. render interior"
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold lowercase text-black/45">
              estado
            </label>
            <select
              value={visualForm.status}
              onChange={(e) =>
                setVisualForm({ ...visualForm, status: e.target.value })
              }
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/30"
            >
              <option value="draft">borrador</option>
              <option value="published">publicado</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-4">
              <input
                type="checkbox"
                checked={visualForm.featured}
                onChange={(e) =>
                  setVisualForm({ ...visualForm, featured: e.target.checked })
                }
              />
              <span className="text-sm font-bold lowercase">
                visualización destacada
              </span>
              <span className="ml-auto text-xs lowercase text-black/35">
                contenido prioritario
              </span>
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-xs font-bold lowercase text-black/45">
              descripción
            </label>
            <textarea
              value={visualForm.summary}
              onChange={(e) =>
                setVisualForm({ ...visualForm, summary: e.target.value })
              }
              placeholder="breve descripción de la visualización"
              rows={4}
              className="w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/30"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-xs font-bold lowercase text-black/45">
              imagen principal
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                try {
                  setItemsError("");
                  const url = await uploadImage(file);
                  setVisualForm({ ...visualForm, cover_image: url });
                } catch {
                  setItemsError("no se pudo subir la imagen");
                }
              }}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
            />

            {visualForm.cover_image && (
              <div className="relative mt-4 overflow-hidden rounded-3xl bg-black/5">
                <img
                  src={visualForm.cover_image}
                  alt="previsualización de la visualización"
                  className="aspect-[16/9] w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setVisualForm({ ...visualForm, cover_image: "" })
                  }
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black text-lg text-white"
                  aria-label="eliminar imagen"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {itemsError && (
          <p className="mt-6 text-sm text-red-700">{itemsError}</p>
        )}

        <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-black/10 pt-6">
          <button
            type="button"
            onClick={resetVisualForm}
            className="rounded-full border border-black/15 px-6 py-3 text-xs font-bold lowercase transition hover:bg-black/5"
          >
            cancelar
          </button>
          <button
            type="button"
            onClick={saveVisual}
            className="rounded-full bg-black px-6 py-3 text-xs font-bold lowercase text-white transition hover:opacity-75"
          >
            {editingVisualId ? "guardar cambios" : "guardar visualización"}
          </button>
        </div>
      </div>
    )}

    {loadingItems && (
      <p className="py-10 text-sm text-black/45">cargando visualizaciones...</p>
    )}

    {!showVisualForm && itemsError && (
      <p className="mb-6 text-sm text-red-700">{itemsError}</p>
    )}

    {!loadingItems && (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items
          .filter((item) => item.type === "visual")
          .map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-3xl border border-black/10 bg-white"
            >
              <div className="relative aspect-square overflow-hidden bg-black/5">
                {item.cover_image ? (
                  <img
                    src={item.cover_image}
                    alt={item.title || "visualización"}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs font-bold lowercase text-black/25">
                    sin imagen
                  </div>
                )}

                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1.5 text-[10px] font-black lowercase backdrop-blur-md ${
                      item.status === "published"
                        ? "bg-white/90 text-black"
                        : "bg-black/70 text-white"
                    }`}
                  >
                    {item.status === "published" ? "publicado" : "borrador"}
                  </span>

                  {item.featured && (
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-black lowercase text-black backdrop-blur-md">
                      destacado
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs font-bold lowercase tracking-[0.08em] text-black/35">
                  {item.category || "visualización"}
                </p>
                <h3 className="mt-2 text-xl font-black lowercase tracking-[-0.035em]">
                  {item.title}
                </h3>

                {item.summary && (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/50">
                    {item.summary}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-2 border-t border-black/10 pt-4">
                  <button
                    type="button"
                    onClick={() => editVisual(item)}
                    className="rounded-full border border-black/15 px-4 py-2 text-xs font-bold lowercase transition hover:bg-black hover:text-white"
                  >
                    editar
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteVisual(item.id)}
                    className="rounded-full border border-black/15 px-4 py-2 text-xs font-bold lowercase transition hover:border-red-700 hover:bg-red-700 hover:text-white"
                  >
                    eliminar
                  </button>

                  {item.status === "published" && item.slug && (
                    <a
                      href="/studio"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto rounded-full border border-black/15 px-4 py-2 text-xs font-bold lowercase transition hover:bg-black hover:text-white"
                    >
                      ver público ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
      </div>
    )}

    {!loadingItems &&
      !itemsError &&
      items.filter((item) => item.type === "visual").length === 0 && (
        <div className="rounded-3xl border border-black/10 bg-white/50 p-8">
          <p className="text-sm text-black/45">
            todavía no hay visualizaciones.
          </p>
        </div>
      )}
  </div>
)}
            {activeSection === "inversiones" && renderManagedSection("investment")}
            {activeSection === "propiedades" && renderManagedSection("property")}
            {activeSection === "construccion" && renderManagedSection("construction")}
            {activeSection === "leads" && renderLeads()}
          </div>
        </section>
      </div>
    </main>
  );
}