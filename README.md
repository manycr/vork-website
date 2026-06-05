# VORK Platform

Plataforma inicial para VORK studio con landing, estimador AI, captura de leads, Supabase, correo automático y dashboard interno.

## Qué incluye

- Landing estilo premium.
- Estimador multi-step.
- Captura de lead con nombre, correo y WhatsApp.
- API route `/api/analyze-project`.
- Integración preparada con OpenAI.
- Guardado de leads en Supabase.
- Guardado de reportes AI.
- Envío de correo automático con Resend.
- Dashboard interno básico en `/dashboard`.
- SQL de Supabase listo en `/supabase/schema.sql`.

## Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Crear archivo `.env.local` usando `.env.example`.

3. Crear proyecto en Supabase.

4. Abrir Supabase SQL Editor y ejecutar:

```sql
-- pegar contenido de supabase/schema.sql
```

5. Ejecutar:

```bash
npm run dev
```

6. Abrir:

```bash
http://localhost:3000
```

## Dashboard

Ruta:

```bash
/dashboard
```

El dashboard usa una protección simple por contraseña configurada en:

```bash
DASHBOARD_PASSWORD
```

Esta protección es básica. Para producción se recomienda Supabase Auth.

## Producción recomendada

- Vercel para hosting.
- Supabase para base de datos.
- Resend para correo.
- OpenAI API para análisis.
- Dominio conectado y correo verificado.


## Next Level Lead AI

Cambio estratégico:
- El cliente ya no recibe recomendaciones técnicas completas.
- El cliente recibe una evaluación breve, premium y orientada a agendar revisión.
- Las recomendaciones, riesgos y notas comerciales se guardan para VORK en `ai_reports`.
- El correo interno sí incluye el análisis estratégico completo.
- Esto evita regalar consultoría y convierte el estimador en un filtro comercial.


## Ecosystem update

Incluye:
- Página `/projects`.
- Páginas individuales `/projects/casa-atria`, `/projects/interior-norte`, `/projects/villas-pacifico`.
- Cards clickeables desde el home.
- Página `/properties` con VORK properties próximamente.
- Sección de ecosistema VORK studio / VORK properties.


## Refinamientos solicitados

- Todo "vork" queda en minúscula.
- Sección de ecosistema ajustada: vork group como marca matriz, subsidiarias studio/properties.
- `/properties` simplificada: solo próximamente e información de inmobiliaria de bienes raíces.
- Campo whatsapp con código de país y bandera.
- Botón flotante de whatsapp reducido a icono mientras se navega, se expande cerca del footer.
- Botón "ver servicios" con opacidad y mejor legibilidad.
- Menos saturación visual y tono tipográfico más minimalista.


## Ajustes v2 solicitados

- Instagram actualizado a @vorkstudiocr.
- Botón de WhatsApp reducido solo a ícono.
- Botón “ver servicios” en blanco con mejor contraste.
- Página de projects y project detail con botón de regreso.
- Sección “para quién trabajamos” responsive.
- Campo de código de país más compacto.
- Sección vork reescrita como marca con líneas vork studio y vork properties.
- Página de vork properties simplificada, premium y con imagen provisional.
