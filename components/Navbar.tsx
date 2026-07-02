"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-6 py-6 lg:px-12 mix-blend-difference text-white transition-all duration-500 ${
        scrolled ? "py-4 bg-black/10 backdrop-blur-md mix-blend-normal" : "py-6"
      }`}
    >
      <div className="flex items-center gap-4 hover-target">
        <a href="#work" onClick={(e) => scrollToSection(e, 'work')}>
          <Image src="/logo.png" alt="Digital Supremacy" width={200} height={32} className="hidden md:block h-8 w-auto object-contain" priority />
          <Image src="/logo-mobile.png" alt="Digital Supremacy" width={200} height={40} className="block md:hidden h-10 w-auto object-contain" priority />
        </a>
      </div>
      
      <nav className="hidden md:flex items-center gap-12 font-sans text-[11px] tracking-[0.2em] uppercase font-semibold">
        <a href="#work" onClick={(e) => scrollToSection(e, 'work')} className="hover-target hover:opacity-50 transition-opacity">Work</a>
        <a href="#agency" onClick={(e) => scrollToSection(e, 'agency')} className="hover-target hover:opacity-50 transition-opacity">Agency</a>
        <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover-target hover:opacity-50 transition-opacity">Services</a>
      </nav>

      <button onClick={(e) => scrollToSection(e as any, 'contact')} className="hover-target bg-white text-black font-sans font-bold uppercase text-xs px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300">
        Let&apos;s Talk
      </button>
    </header>
  );
}
