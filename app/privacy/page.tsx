import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Header } from "@/components/Header";
import { BackFloat } from "@/components/BackFloat";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "política de privacidad",
  description: "Política de privacidad de vork studio.",
};

const copy = {
  es: {
    eyebrow: "información legal",
    title: "política de privacidad.",
    updated: "última actualización: 8 de octubre de 2026",
    intro:
      "Esta política explica cómo vork recopila, utiliza, almacena y protege la información personal recibida a través de vorkstudio.com, WhatsApp y otros canales de contacto.",
    sections: [
      {
        title: "1. responsable y alcance",
        paragraphs: [
          "vork, con operaciones en Costa Rica, es responsable del tratamiento de los datos personales descritos en esta política. Para consultas o solicitudes relacionadas con privacidad, puedes escribir a info@vorkstudio.com.",
          "Esta política se aplica a las personas que visitan el sitio web, completan formularios, solicitan información sobre nuestros servicios o se comunican con vork por WhatsApp, correo electrónico u otros medios.",
        ],
      },
      {
        title: "2. información que recopilamos",
        paragraphs: [
          "Podemos recopilar datos que nos proporcionas directamente, como nombre, correo electrónico, número de teléfono, país, ubicación del proyecto, tipo de proyecto, área estimada, presupuesto, necesidades, objetivos y cualquier información incluida en tus mensajes o archivos.",
          "Cuando utilizas WhatsApp, podemos procesar tu número, el contenido de la conversación, el idioma seleccionado, el área de interés y datos técnicos necesarios para gestionar el mensaje.",
          "También podemos recibir información técnica y de uso, como dirección IP, navegador, dispositivo, páginas visitadas, fecha y hora de acceso, cookies y datos de analítica.",
        ],
      },
      {
        title: "3. para qué utilizamos la información",
        paragraphs: [
          "Utilizamos la información para responder consultas, preparar o evaluar propuestas, coordinar servicios, administrar relaciones con clientes, operar la automatización bilingüe de WhatsApp y dar seguimiento a solicitudes relacionadas con studio, inversiones, propiedades o construcción.",
          "También podemos utilizarla para proteger y mejorar el sitio, medir su funcionamiento, prevenir usos indebidos, cumplir obligaciones legales y conservar registros administrativos o comerciales.",
          "Los datos incluidos en herramientas de diagnóstico o formularios pueden ser procesados mediante sistemas automatizados para organizar la información y preparar resúmenes preliminares. Las decisiones y propuestas finales son revisadas por una persona del equipo.",
        ],
      },
      {
        title: "4. fundamento del tratamiento",
        paragraphs: [
          "Tratamos los datos con base en tu consentimiento cuando los proporcionas voluntariamente, para atender medidas previas a una posible contratación, para ejecutar servicios solicitados, por intereses legítimos relacionados con la operación y seguridad del negocio, y para cumplir obligaciones legales cuando corresponda.",
          "Puedes retirar tu consentimiento para tratamientos futuros, sin afectar la legitimidad del tratamiento realizado anteriormente.",
        ],
      },
      {
        title: "5. proveedores y transferencias",
        paragraphs: [
          "Para operar nuestros canales digitales podemos utilizar proveedores como Meta y WhatsApp, Vercel, Supabase, Google Analytics, Resend y OpenAI. Estos proveedores pueden procesar información únicamente para prestar sus servicios y de acuerdo con sus propias políticas y condiciones.",
          "Algunos proveedores operan infraestructura fuera de Costa Rica. En esos casos, la información puede ser transferida o almacenada internacionalmente con las medidas contractuales y de seguridad aplicables.",
          "No vendemos datos personales. Podemos compartir información cuando sea necesario para prestar un servicio solicitado, con asesores sujetos a confidencialidad o cuando una autoridad competente lo requiera legalmente.",
        ],
      },
      {
        title: "6. conservación",
        paragraphs: [
          "Conservamos los datos durante el tiempo necesario para atender la consulta, mantener la relación comercial, prestar los servicios solicitados, resolver posibles reclamaciones y cumplir obligaciones legales o contables.",
          "Cuando la información deja de ser necesaria, procuramos eliminarla, anonimizarla o restringir su uso, según corresponda.",
        ],
      },
      {
        title: "7. tus derechos",
        paragraphs: [
          "Puedes solicitar acceso, rectificación, actualización, cancelación o supresión de tus datos, así como oponerte a determinados usos o retirar tu consentimiento, de conformidad con la Ley N.° 8968 de Costa Rica y demás normativa aplicable.",
          "Para ejercer estos derechos, escribe a info@vorkstudio.com e indica tu nombre, la solicitud que deseas realizar y la información necesaria para verificar tu identidad. Responderemos dentro del plazo aplicable.",
        ],
      },
      {
        title: "8. seguridad",
        paragraphs: [
          "Aplicamos medidas técnicas y organizativas razonables para reducir el riesgo de pérdida, acceso no autorizado, alteración o divulgación. Ningún sistema conectado a internet puede garantizar seguridad absoluta.",
        ],
      },
      {
        title: "9. cookies, analítica y enlaces externos",
        paragraphs: [
          "El sitio puede utilizar cookies y tecnologías similares para recordar preferencias de idioma, mantener funciones esenciales y obtener estadísticas de uso. Puedes limitar las cookies desde la configuración de tu navegador, aunque algunas funciones podrían verse afectadas.",
          "El sitio puede contener enlaces a servicios externos. Sus prácticas de privacidad son responsabilidad de cada proveedor.",
        ],
      },
      {
        title: "10. menores de edad",
        paragraphs: [
          "Nuestros servicios no están dirigidos intencionalmente a menores de edad. Si identificamos que recibimos datos de una persona menor sin la autorización correspondiente, tomaremos medidas razonables para eliminarlos.",
        ],
      },
      {
        title: "11. cambios y contacto",
        paragraphs: [
          "Podemos actualizar esta política para reflejar cambios legales, operativos o tecnológicos. La versión vigente y su fecha de actualización estarán disponibles en esta página.",
          "Consultas sobre privacidad: info@vorkstudio.com.",
        ],
      },
    ],
  },
  en: {
    eyebrow: "legal information",
    title: "privacy policy.",
    updated: "last updated: October 8, 2026",
    intro:
      "This policy explains how vork collects, uses, stores, and protects personal information received through vorkstudio.com, WhatsApp, and other contact channels.",
    sections: [
      {
        title: "1. controller and scope",
        paragraphs: [
          "vork, operating in Costa Rica, is responsible for the processing of personal data described in this policy. For privacy questions or requests, contact info@vorkstudio.com.",
          "This policy applies to people who visit the website, complete forms, request information about our services, or communicate with vork through WhatsApp, email, or other channels.",
        ],
      },
      {
        title: "2. information we collect",
        paragraphs: [
          "We may collect information you provide directly, including your name, email address, phone number, country, project location, project type, estimated area, budget, needs, goals, and any information included in messages or files.",
          "When you use WhatsApp, we may process your phone number, conversation content, selected language, area of interest, and technical data required to manage the message.",
          "We may also receive technical and usage information such as IP address, browser, device, pages visited, access date and time, cookies, and analytics data.",
        ],
      },
      {
        title: "3. how we use information",
        paragraphs: [
          "We use information to respond to inquiries, prepare or assess proposals, coordinate services, manage client relationships, operate the bilingual WhatsApp automation, and follow up on requests related to studio, investments, properties, or construction.",
          "We may also use it to protect and improve the website, measure performance, prevent misuse, comply with legal obligations, and maintain administrative or commercial records.",
          "Information submitted through diagnostic tools or forms may be processed by automated systems to organize details and prepare preliminary summaries. Final decisions and proposals are reviewed by a member of the team.",
        ],
      },
      {
        title: "4. legal basis",
        paragraphs: [
          "We process personal data based on your consent when you provide it voluntarily, to take steps before entering into a possible agreement, to perform requested services, for legitimate interests related to business operations and security, and to comply with legal obligations where applicable.",
          "You may withdraw consent for future processing without affecting processing lawfully carried out before withdrawal.",
        ],
      },
      {
        title: "5. service providers and transfers",
        paragraphs: [
          "We may use providers such as Meta and WhatsApp, Vercel, Supabase, Google Analytics, Resend, and OpenAI to operate our digital channels. These providers may process information only to deliver their services and under their own policies and terms.",
          "Some providers operate infrastructure outside Costa Rica. Information may therefore be transferred or stored internationally under applicable contractual and security safeguards.",
          "We do not sell personal data. We may share information when necessary to provide a requested service, with advisers subject to confidentiality, or when legally required by a competent authority.",
        ],
      },
      {
        title: "6. retention",
        paragraphs: [
          "We retain information for as long as necessary to address an inquiry, maintain a business relationship, provide requested services, resolve potential claims, and meet legal or accounting obligations.",
          "When information is no longer required, we aim to delete it, anonymize it, or restrict its use as appropriate.",
        ],
      },
      {
        title: "7. your rights",
        paragraphs: [
          "You may request access, correction, updating, cancellation, or deletion of your personal data, object to certain uses, or withdraw consent, in accordance with Costa Rica Law No. 8968 and other applicable rules.",
          "To exercise these rights, email info@vorkstudio.com with your name, the request you wish to make, and the information needed to verify your identity. We will respond within the applicable period.",
        ],
      },
      {
        title: "8. security",
        paragraphs: [
          "We apply reasonable technical and organizational measures to reduce the risk of loss, unauthorized access, alteration, or disclosure. No internet-connected system can guarantee absolute security.",
        ],
      },
      {
        title: "9. cookies, analytics, and external links",
        paragraphs: [
          "The site may use cookies and similar technologies to remember language preferences, support essential functions, and obtain usage statistics. You can limit cookies through your browser settings, although some functions may be affected.",
          "The site may link to external services. Each provider is responsible for its own privacy practices.",
        ],
      },
      {
        title: "10. children",
        paragraphs: [
          "Our services are not intentionally directed to children. If we learn that we received a child's data without the appropriate authorization, we will take reasonable steps to delete it.",
        ],
      },
      {
        title: "11. updates and contact",
        paragraphs: [
          "We may update this policy to reflect legal, operational, or technological changes. The current version and its update date will remain available on this page.",
          "Privacy inquiries: info@vorkstudio.com.",
        ],
      },
    ],
  },
};

export default async function PrivacyPage() {
  const lang = (await cookies()).get("vork_lang")?.value === "en" ? "en" : "es";
  const data = copy[lang];

  return (
    <main className="min-h-screen bg-white text-[#101010]">
      <Header />
      <article className="mx-auto max-w-[1200px] px-[7vw] pb-28 pt-40 md:pb-36">
        <p className="mb-7 text-xs lowercase tracking-[.12em] text-neutral-500">
          {data.eyebrow}
        </p>
        <h1 className="max-w-[1050px] text-[clamp(3.5rem,8vw,8rem)] font-normal lowercase leading-[.92] tracking-[-.07em]">
          {data.title}
        </h1>
        <p className="mt-8 text-sm text-neutral-500">{data.updated}</p>
        <p className="mt-14 max-w-[850px] text-[clamp(1.2rem,2vw,1.65rem)] leading-[1.55] text-neutral-700">
          {data.intro}
        </p>

        <div className="mt-20 divide-y divide-black/10 border-y border-black/10">
          {data.sections.map((section) => (
            <section
              key={section.title}
              className="grid gap-6 py-10 md:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.7fr)] md:gap-14 md:py-14"
            >
              <h2 className="text-xl font-normal lowercase tracking-[-.035em]">
                {section.title}
              </h2>
              <div className="space-y-5 text-[1rem] leading-7 text-neutral-600">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <a
          href="mailto:info@vorkstudio.com"
          className="mt-14 inline-block border-b border-black pb-2 text-lg lowercase"
        >
          info@vorkstudio.com ↗
        </a>
      </article>
      <BackFloat />
    </main>
  );
}
