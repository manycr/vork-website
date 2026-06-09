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
