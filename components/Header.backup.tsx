"use client";
import { useEffect, useState } from "react";
export function Header(){
 const[scrolled,setScrolled]=useState(false);
 useEffect(()=>{const update=()=>setScrolled(window.scrollY>window.innerHeight*.72);update();window.addEventListener("scroll",update,{passive:true});return()=>window.removeEventListener("scroll",update)},[]);
 return <header className={`fixed inset-x-0 top-0 z-50 grid h-16 grid-cols-[auto_1fr_auto] items-center px-[7vw] transition-all duration-500 ${scrolled?"h-14 bg-[#f4f0e8]/78 text-[#101010] backdrop-blur-xl":"text-white"}`}>
  <a href="/" className="tracking-tight"><span className="text-xl font-black lowercase">vork</span><span className="text-sm font-light lowercase">studio</span></a>
  <nav className="hidden justify-center gap-8 text-[0.74rem] font-semibold lowercase tracking-[-0.01em] md:flex">
  <a href="/studio">studio</a>
  <a href="/investments">inversiones</a>
  <a href="/properties">propiedades</a>
  <a href="/build">construcción</a>
  <a href="/briefing">vork ai</a>
</nav>
  <a href="https://www.instagram.com/vorkstudiocr/" target="_blank" rel="noreferrer" className="hidden text-[0.74rem] font-semibold lowercase md:block">@vorkstudiocr</a>
 </header>
}
