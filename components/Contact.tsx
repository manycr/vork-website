"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export function Contact() {
  const pathname = usePathname();
  const en = pathname === "/en" || pathname.startsWith("/en/");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("");

  function sendWhatsApp() {
    const text = encodeURIComponent(
      `${en ? "Hello" : "Hola"} vork studio. ${en ? "My name is" : "Soy"} ${name || "—"}.\n${en ? "Email" : "Correo"}: ${email || "—"}\n${en ? "Project" : "Proyecto"}: ${project || "—"}`
    );
    window.open(`https://wa.me/50664644130?text=${text}`, "_blank", "noopener,noreferrer");
  }

  function sendEmail() {
    const subject = en ? "Project inquiry | vork studio" : "Consulta de proyecto | vork studio";
    const body = `${en ? "Hello vork studio," : "Hola vork studio,"}\n\n${en ? "My name is" : "Soy"} ${name || "—"}.\n${en ? "Email" : "Correo"}: ${email || "—"}\n\n${en ? "Project" : "Proyecto"}:\n${project || "—"}`;
    window.location.href = `mailto:info@vorkstudio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="contacto" className="px-[7vw] py-20 md:py-24">
      <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <h2 className="max-w-[620px] text-[clamp(3rem,5vw,5.8rem)] font-normal lowercase leading-[.92] tracking-[-0.06em]">
            {en ? "let’s talk about your project." : "hablemos de tu proyecto."}
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-6 text-white/48">
            {en ? "architecture, visualization and development begin with a conversation." : "arquitectura, visualización y desarrollo desde una conversación inicial."}
          </p>
          <a
            href="https://www.instagram.com/vorkstudiocr/"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block text-[13px] lowercase text-white/60 transition hover:text-white"
          >
            @vorkstudiocr ↗
          </a>
        </div>

        <form className="pt-1" onSubmit={(event) => { event.preventDefault(); sendWhatsApp(); }}>
          <label className="sr-only" htmlFor="contact-name">{en ? "name" : "nombre"}</label>
          <input
            id="contact-name"
            name="name"
            className="dark-field"
            placeholder={en ? "name" : "nombre"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="sr-only" htmlFor="contact-email">{en ? "email" : "correo"}</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            className="dark-field"
            placeholder={en ? "email" : "correo"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="sr-only" htmlFor="contact-project">{en ? "project" : "proyecto"}</label>
          <textarea
            id="contact-project"
            name="project"
            className="dark-field min-h-[120px] resize-none pt-5"
            placeholder={en ? "tell us briefly what you have in mind" : "cuéntanos brevemente qué quieres hacer"}
            value={project}
            onChange={(e) => setProject(e.target.value)}
          />
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
            <button
              type="submit"
              className="inline-flex items-center gap-3 text-[13px] lowercase text-white transition hover:opacity-55"
            >
              <span className="text-xl">→</span>
              {en ? "send via whatsapp" : "enviar por whatsapp"}
            </button>
            <button
              type="button"
              onClick={sendEmail}
              className="inline-flex items-center gap-3 text-[13px] lowercase text-white/65 transition hover:text-white"
            >
              <span className="text-xl">→</span>
              {en ? "send via email" : "enviar por correo"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
