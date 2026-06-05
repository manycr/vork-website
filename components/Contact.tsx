"use client";

import { useState } from "react";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "Anteproyecto arquitectónico",
    message: ""
  });

  const update = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const whatsappNumber = "50600000000";
    const text = `Hola, soy ${form.name}. Mi correo es ${form.email}. Quiero cotizar: ${form.type}. Mensaje: ${form.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  }

  return (
    <section id="contacto" className="grid gap-16 bg-[#101010] px-[7vw] py-28 text-white md:grid-cols-[0.9fr_1fr]">
      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#f2db9c]">Contacto</p>
        <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
          Agenda una revisión inicial.
        </h2>
        <p className="mt-6 max-w-xl text-white/70">
          Analizamos el potencial arquitectónico, visual y comercial de tu idea para ayudarte a tomar mejores decisiones desde el inicio.
        </p>
        <a className="mt-8 inline-flex font-bold text-[#f2db9c]" href="https://www.instagram.com/vorkstudiocr/" target="_blank" rel="noreferrer">
          Instagram · @vorkstudiocr
        </a>
      </div>

      <form onSubmit={submit} className="grid gap-5">
        <input className="dark-field" placeholder="Nombre" value={form.name} onChange={(e) => update("name", e.target.value)} required />
        <input className="dark-field" placeholder="Correo" value={form.email} onChange={(e) => update("email", e.target.value)} />
        <select className="dark-field" value={form.type} onChange={(e) => update("type", e.target.value)}>
          <option>Anteproyecto arquitectónico</option>
          <option>Planos constructivos</option>
          <option>Renders arquitectónicos</option>
          <option>Remodelación</option>
          <option>Supervisión / visitas de obra</option>
          <option>Presentación inmobiliaria</option>
        </select>
        <textarea className="dark-field min-h-36" placeholder="Describe brevemente el proyecto" value={form.message} onChange={(e) => update("message", e.target.value)} />
        <button className="button w-fit">Enviar por whatsapp</button>
      </form>
    </section>
  );
}
