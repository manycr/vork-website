import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Header } from "@/components/Header";
import { BackFloat } from "@/components/BackFloat";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const en = (await cookies()).get("vork_lang")?.value === "en";
  return {
    title: en ? "terms and conditions" : "términos y condiciones",
    description: en
      ? "Terms governing the use of the vork website and its preliminary digital tools."
      : "Condiciones de uso del sitio web de vork y sus herramientas digitales preliminares.",
  };
}

const copy = {
  es: {
    eyebrow: "información legal",
    title: "términos y condiciones.",
    updated: "última actualización: octubre de 2026",
    intro:
      "Al utilizar este sitio aceptas estas condiciones. El contenido presenta los servicios, proyectos y oportunidades de vork y permite iniciar conversaciones preliminares con nuestro equipo.",
    sections: [
      {
        title: "1. alcance del sitio",
        paragraphs: [
          "El sitio ofrece información general sobre arquitectura, construcción, propiedades, inversiones y herramientas de orientación inicial. Su uso no crea por sí solo una relación contractual, profesional, fiduciaria, societaria ni de corretaje.",
          "Cualquier servicio, inversión, intermediación o proyecto requerirá una revisión específica y, cuando corresponda, una propuesta y un contrato independientes.",
        ],
      },
      {
        title: "2. vorkai y estimaciones",
        paragraphs: [
          "Las lecturas generadas por vorkai son preliminares y se basan en la información proporcionada por la persona usuaria. No constituyen una cotización, presupuesto definitivo, avalúo, recomendación financiera ni garantía de viabilidad.",
          "Costos, honorarios, plazos, permisos, condiciones del terreno y alcances deben verificarse mediante estudios, información completa y revisión profesional.",
        ],
      },
      {
        title: "3. propiedades e inversiones",
        paragraphs: [
          "La información de propiedades y oportunidades de inversión puede cambiar y está sujeta a disponibilidad, debida diligencia, documentación, condiciones comerciales y acuerdos definitivos.",
          "Toda decisión de inversión debe realizarse después de revisar los riesgos y consultar, cuando resulte necesario, asesores legales, fiscales y financieros independientes.",
        ],
      },
      {
        title: "4. información enviada",
        paragraphs: [
          "La persona usuaria declara que la información que envía es correcta y que cuenta con autorización para compartirla. No deben enviarse contraseñas, datos bancarios ni información confidencial innecesaria mediante formularios o mensajes iniciales.",
          "El tratamiento de datos personales se rige por nuestra política de privacidad.",
        ],
      },
      {
        title: "5. propiedad intelectual",
        paragraphs: [
          "Los textos, imágenes, diseños, marcas, visualizaciones, planos y demás materiales del sitio pertenecen a vork o se utilizan con autorización. No pueden copiarse, modificarse, distribuirse ni utilizarse comercialmente sin autorización previa por escrito.",
        ],
      },
      {
        title: "6. disponibilidad y enlaces",
        paragraphs: [
          "Procuramos mantener el sitio disponible y actualizado, pero no garantizamos un funcionamiento ininterrumpido ni la ausencia total de errores. Podemos modificar, suspender o retirar contenidos y funciones cuando sea necesario.",
          "Los servicios externos vinculados desde el sitio operan bajo sus propias condiciones y políticas.",
        ],
      },
      {
        title: "7. responsabilidad",
        paragraphs: [
          "En la medida permitida por la ley, vork no responde por decisiones tomadas únicamente con base en información general o estimaciones preliminares del sitio, ni por interrupciones o actos de proveedores externos fuera de nuestro control razonable.",
        ],
      },
      {
        title: "8. ley aplicable y contacto",
        paragraphs: [
          "Estas condiciones se interpretan conforme a las leyes de Costa Rica. Podemos actualizarlas para reflejar cambios legales, operativos o tecnológicos; la versión vigente permanecerá publicada en esta página.",
          "Consultas: info@vorkstudio.com.",
        ],
      },
    ],
  },
  en: {
    eyebrow: "legal information",
    title: "terms and conditions.",
    updated: "last updated: October 2026",
    intro:
      "By using this website, you agree to these terms. The content introduces vork services, projects, and opportunities and allows you to begin preliminary conversations with our team.",
    sections: [
      {
        title: "1. website scope",
        paragraphs: [
          "The website provides general information about architecture, construction, properties, investments, and initial guidance tools. Its use does not by itself create a contractual, professional, fiduciary, partnership, or brokerage relationship.",
          "Any service, investment, transaction, or project will require a specific review and, where applicable, a separate proposal and agreement.",
        ],
      },
      {
        title: "2. vorkai and estimates",
        paragraphs: [
          "Assessments generated by vorkai are preliminary and based on information supplied by the user. They are not a quotation, final budget, appraisal, financial recommendation, or guarantee of feasibility.",
          "Costs, professional fees, schedules, permits, site conditions, and scope must be verified through studies, complete information, and professional review.",
        ],
      },
      {
        title: "3. properties and investments",
        paragraphs: [
          "Property and investment information may change and remains subject to availability, due diligence, documentation, commercial conditions, and final agreements.",
          "Any investment decision should be made after reviewing the risks and, where appropriate, consulting independent legal, tax, and financial advisers.",
        ],
      },
      {
        title: "4. submitted information",
        paragraphs: [
          "Users represent that submitted information is accurate and that they are authorized to share it. Passwords, banking information, and unnecessary confidential information should not be submitted through initial forms or messages.",
          "Personal information is processed under our privacy policy.",
        ],
      },
      {
        title: "5. intellectual property",
        paragraphs: [
          "Texts, images, designs, trademarks, visualizations, drawings, and other website materials belong to vork or are used with permission. They may not be copied, modified, distributed, or commercially used without prior written authorization.",
        ],
      },
      {
        title: "6. availability and links",
        paragraphs: [
          "We aim to keep the website available and current but do not guarantee uninterrupted operation or the complete absence of errors. We may modify, suspend, or remove content and functions when necessary.",
          "External services linked from the website operate under their own terms and policies.",
        ],
      },
      {
        title: "7. liability",
        paragraphs: [
          "To the extent permitted by law, vork is not liable for decisions made solely from general information or preliminary website estimates, or for interruptions and actions of external providers beyond our reasonable control.",
        ],
      },
      {
        title: "8. governing law and contact",
        paragraphs: [
          "These terms are governed by the laws of Costa Rica. We may update them to reflect legal, operational, or technological changes; the current version will remain available on this page.",
          "Questions: info@vorkstudio.com.",
        ],
      },
    ],
  },
};

export default async function TermsPage() {
  const lang = (await cookies()).get("vork_lang")?.value === "en" ? "en" : "es";
  const data = copy[lang];

  return (
    <main className="min-h-screen bg-white text-[#101010]">
      <Header />
      <article className="mx-auto max-w-[1200px] px-[7vw] pb-28 pt-40 md:pb-36">
        <p className="mb-7 text-xs lowercase tracking-[.12em] text-neutral-500">{data.eyebrow}</p>
        <h1 className="max-w-[1050px] text-[clamp(3.5rem,8vw,8rem)] font-normal lowercase leading-[.92] tracking-[-.07em]">
          {data.title}
        </h1>
        <p className="mt-8 text-sm text-neutral-500">{data.updated}</p>
        <p className="mt-14 max-w-[850px] text-[clamp(1.2rem,2vw,1.65rem)] leading-[1.55] text-neutral-700">
          {data.intro}
        </p>

        <div className="mt-20 divide-y divide-black/10 border-y border-black/10">
          {data.sections.map((section) => (
            <section key={section.title} className="grid gap-6 py-10 md:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.7fr)] md:gap-14 md:py-14">
              <h2 className="text-xl font-normal lowercase tracking-[-.035em]">{section.title}</h2>
              <div className="space-y-5 text-[1rem] leading-7 text-neutral-600">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>

        <a href="mailto:info@vorkstudio.com" className="mt-14 inline-block border-b border-black pb-2 text-lg lowercase">
          info@vorkstudio.com ↗
        </a>
      </article>
      <BackFloat />
    </main>
  );
}
