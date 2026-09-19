"use client";

import { useEffect, useState } from "react";

export function Contact() {
  const [en, setEn] = useState(false);
  useEffect(() => setEn(document.cookie.includes("vork_lang=en")), []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("");

  function sendWhatsApp() {
    const text = encodeURIComponent(
      `${en ? "Hello" : "Hola"} VORK studio. ${en ? "My name is" : "Soy"} ${name || "—"}.\n${en ? "Email" : "Correo"}: ${email || "—"}\n${en ? "Project" : "Proyecto"}: ${project || "—"}`
    );
    window.open(`https://wa.me/506?text=${text}`, "_blank");
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

        <div className="pt-1">
          <input
            className="dark-field"
            placeholder={en ? "name" : "nombre"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="dark-field"
            placeholder={en ? "email" : "correo"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            className="dark-field min-h-[120px] resize-none pt-5"
            placeholder={en ? "tell us briefly what you have in mind" : "cuéntanos brevemente qué quieres hacer"}
            value={project}
            onChange={(e) => setProject(e.target.value)}
          />
          <button
            type="button"
            onClick={sendWhatsApp}
            className="mt-7 inline-flex items-center gap-3 text-[13px] lowercase text-white transition hover:opacity-55"
          >
            <span className="text-xl">→</span>
            {en ? "send via whatsapp" : "enviar por whatsapp"}
          </button>
        </div>
      </div>
    </section>
  );
}
