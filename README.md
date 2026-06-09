# vork platform v2 editorial

versión editorial minimal luxury.

## estructura

- `vork studio`, incluye proyectos y visuals
- `vork investments`, con conceptos iniciales: barn house retreat, casas de retiro, complejo deportivo de tenis, centro de salud integral y centro turístico
- `vork build`, página en construcción
- `vork properties`, página en construcción
- `dashboard`, cms interno

## instalación

```bash
npm install
npm run dev
```

## supabase

ejecutar:

```text
supabase/schema-v2.sql
```

## dashboard

```text
/dashboard
```

usa `DASHBOARD_PASSWORD`.

la web está en español. solo los nombres de marca se mantienen en inglés.


## fixed

- hero cinematográfico restaurado.
- imágenes provisionales tipo render/fotografía.
- fallback de contenido para evitar pantallas vacías si Supabase aún no responde o no tiene datos.
- ajustes de carga visual en mobile.


## lowercase + más imágenes

- se eliminaron clases visuales en mayúscula.
- se redujo el tracking excesivo.
- se agregaron más proyectos y visuals provisionales.
- se ampliaron galerías en investments.


## panel privado

el dashboard público `/dashboard` redirige al inicio.

el panel real está en:

```text
/vork-private
```

no está en el menú principal.

## imágenes desde el dashboard

para subir imágenes desde el panel privado se usa supabase storage.

ejecuta `supabase/schema-v2.sql` nuevamente para crear el bucket público `media`.

en el panel privado puedes:
- subir imagen principal,
- agregar imágenes a galería,
- editar textos,
- crear proyectos,
- crear visuals,
- crear investments,
- publicar o guardar como draft.

## vork briefing

la herramienta vive ahora en:

```text
/briefing
```

y también aparece como cta discreto en el home.
