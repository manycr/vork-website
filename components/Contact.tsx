"use client";
export function Contact(){
 return <section id="contacto" className="grid gap-16 bg-[#101010] px-[7vw] py-28 text-white md:grid-cols-[0.9fr_1fr]">
  <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#f2db9c]">contacto</p><h2 className="text-5xl font-black lowercase leading-[0.95] tracking-[-0.06em] md:text-7xl">agenda una revisión inicial.</h2><p className="mt-6 max-w-xl text-white/70">analizamos el potencial arquitectónico, visual y comercial de tu idea.</p><a className="mt-8 inline-flex font-bold text-[#f2db9c]" href="https://www.instagram.com/vorkstudiocr/" target="_blank">instagram · @vorkstudiocr</a></div>
  <form className="grid gap-5"><input className="dark-field" placeholder="nombre"/><input className="dark-field" placeholder="correo"/><textarea className="dark-field min-h-36" placeholder="describe brevemente el proyecto"/><a className="button w-fit" href="https://wa.me/50600000000">enviar por whatsapp</a></form>
 </section>
}
