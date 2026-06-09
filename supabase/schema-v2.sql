create extension if not exists "uuid-ossp";

create table if not exists public.cms_items (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  type text not null check (type in ('project', 'investment', 'property', 'visual')),
  title text not null,
  slug text not null unique,
  status text not null default 'draft' check (status in ('draft', 'published')),
  category text,
  location text,
  year text,
  area text,
  services text[],
  summary text,
  description text,
  concept text,
  investment_thesis text,
  price text,
  featured boolean not null default false,
  cover_image text,
  gallery text[] default '{}',
  metadata jsonb default '{}'::jsonb
);

create table if not exists public.leads (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  country_code text,
  project_type text not null,
  location_zone text not null,
  area numeric not null,
  finish_level text not null,
  service_needed text not null,
  goal text,
  budget_range text,
  urgency text,
  complexity text,
  lead_score integer,
  status text not null default 'nuevo',
  ai_summary text,
  notes text
);

create table if not exists public.ai_reports (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  lead_id uuid references public.leads(id) on delete cascade,
  report jsonb not null
);

alter table public.cms_items enable row level security;
alter table public.leads enable row level security;
alter table public.ai_reports enable row level security;

create index if not exists cms_items_type_idx on public.cms_items(type);
create index if not exists cms_items_slug_idx on public.cms_items(slug);
create index if not exists cms_items_status_idx on public.cms_items(status);
create index if not exists cms_items_featured_idx on public.cms_items(featured);
create index if not exists leads_created_at_idx on public.leads(created_at desc);

insert into public.cms_items (type,title,slug,status,category,location,year,area,services,summary,description,concept,investment_thesis,featured,cover_image,gallery)
values
('project','casa atria','casa-atria','published','residencial contemporáneo','costa rica','2026','420 m²',array['anteproyecto','visualización','documentación'],'vivienda contemporánea con lectura limpia, integración interior exterior y materialidad sobria.','proyecto residencial preparado para comunicar valor arquitectónico, técnico y comercial.','vida social abierta, privacidad controlada y relación visual directa con el paisaje inmediato.',null,true,'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=72',array['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=72']),
('visual','visualización residencial','visualizacion-residencial','published','render exterior','costa rica','2026','conceptual',array['visualización','atmósfera','comunicación visual'],'imagen arquitectónica para comunicación comercial y validación visual.','visualización desarrollada dentro de vork studio.',null,null,true,'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1600&q=72',array['https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1600&q=72']),
('investment','barn house retreat','barn-house-retreat','published','hospitality investment','zona montaña / costa rica','conceptual','12 unidades',array['concepto','hospitality','visualización'],'cabañas tipo barn house orientadas a retiro, turismo y renta de corta estadía.','desarrollo conceptual para inversionistas interesados en hospitality de baja densidad, arquitectura cálida y experiencia de estadía premium.','sistema modular de unidades tipo barn house, áreas comunes silenciosas y relación directa con paisaje.','oportunidad para crear un destino de renta corta con identidad arquitectónica, operación flexible y narrativa visual fuerte.',true,'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=72',array['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=72']),
('investment','casas de retiro','casas-de-retiro','published','wellness investment','zona rural / costa rica','conceptual','8 unidades',array['wellness','residencial','hospitality'],'conjunto de casas de retiro orientadas a descanso, recuperación y vida lenta.','propuesta para un enclave residencial y turístico enfocado en bienestar, privacidad y paisaje.','unidades independientes, senderos suaves, espacios de contemplación y servicios comunes mínimos.','oportunidad para un producto inmobiliario de baja densidad dirigido a wellness, retiro temporal y estadías prolongadas.',true,'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=72',array['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=72']),
('investment','complejo deportivo de tenis','complejo-deportivo-tenis','published','sports investment','costa rica','conceptual','4 canchas',array['tenis','club deportivo','hospitality'],'complejo deportivo con canchas de tenis, servicios complementarios y potencial de membresía privada.','desarrollo conceptual para un club deportivo boutique con enfoque social, recreativo y comercial.','canchas, lounge, áreas de sombra, servicios de apoyo y paisaje controlado.','oportunidad para activar terrenos mediante deporte, comunidad, membresías y eventos privados.',true,'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1600&q=72',array['https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1600&q=72']),
('investment','centro de salud integral','centro-salud-integral','published','health investment','costa rica','conceptual','1.200 m²',array['salud','bienestar','arquitectura'],'centro de salud y bienestar con enfoque en atención integral, recuperación y experiencia espacial.','propuesta conceptual para un equipamiento privado de salud con atmósfera cálida y operación clara.','espacios de consulta, recuperación, áreas verdes y circulaciones silenciosas.','oportunidad para desarrollar infraestructura de salud diferenciada mediante arquitectura, confort y servicio.',true,'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=72',array['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=72']),
('investment','centro turístico','centro-turistico','published','tourism investment','zona turística / costa rica','conceptual','masterplan',array['turismo','hospitality','experiencia'],'centro turístico de baja densidad con alojamiento, paisaje y servicios de experiencia.','concepto para un destino turístico con arquitectura sobria, recorridos, unidades de hospedaje y espacios comunes.','paisaje, privacidad, operación hotelera ligera y narrativa visual de destino.','oportunidad para consolidar un producto turístico con identidad, escalabilidad y potencial comercial.',true,'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1600&q=72',array['https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1600&q=72']),
('property','vork properties','vork-properties-preview','published','próximamente',null,null,null,array['bienes raíces'],'inmobiliaria boutique de bienes raíces con criterio arquitectónico.','vork properties estará enfocada en propiedades seleccionadas, terrenos y oportunidades inmobiliarias con potencial arquitectónico.',null,null,true,null,array[]::text[]),
('project','villa nativa','villa-nativa','published','residencial tropical','costa rica','2026','280 m²',array['anteproyecto','visualización'],'villa de baja densidad con espacios abiertos, sombra profunda y relación directa con vegetación.','proyecto conceptual para vivienda tropical contemporánea.','arquitectura silenciosa, sombra, ventilación cruzada y vida exterior.',null,true,'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=72',array['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=72','https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=72']),
('project','casa umbral','casa-umbral','published','residencial premium','costa rica','2026','360 m²',array['diseño','visualización','documentación'],'vivienda conceptual con planos limpios, materialidad sobria y transición gradual entre interior y paisaje.','proyecto residencial enfocado en atmósfera, privacidad y presencia visual.','un umbral habitable entre refugio, paisaje y luz.',null,true,'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=72',array['https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=72','https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=72']),
('visual','atmósfera interior','atmosfera-interior','published','render interior','costa rica','2026','conceptual',array['visualización','dirección visual'],'imagen interior orientada a vender atmósfera, escala y materialidad.','visualización editorial desarrollada dentro de vork studio.',null,null,true,'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=72',array['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=72','https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=72']),
('visual','detalle de materialidad','detalle-materialidad','published','visualización','costa rica','2026','conceptual',array['render','materialidad','presentación'],'visualización enfocada en textura, luz y percepción premium del proyecto.','pieza visual para comunicación arquitectónica.',null,null,true,'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=72',array['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=72','https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=72'])
on conflict (slug) do nothing;



-- bucket público para imágenes del cms
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "public read media" on storage.objects;
create policy "public read media"
on storage.objects for select
using (bucket_id = 'media');
