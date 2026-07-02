"use client";
import { getVideoSrc, getPosterSrc, getLowQualityVideoSrc } from "./videoMapper";

export function Footer() {
  return (
    <footer id="contact" className="w-full min-h-screen bg-black text-white relative overflow-hidden flex flex-col justify-center items-center">
      <div className="absolute inset-0 z-0 opacity-60">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
          src={getLowQualityVideoSrc("/videos/all/cinematic_styaling_spacio_june_05.mp4")}
          poster={getPosterSrc("/videos/all/cinematic_styaling_spacio_june_05.mp4")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-display font-black text-[18vw] uppercase tracking-tighter leading-[0.75] mb-12 text-transparent text-stroke hover:text-white transition-colors duration-700 cursor-none">
          Let&apos;s<br />Talk
        </h2>

        <button className="hover-target font-sans font-bold text-sm md:text-lg uppercase tracking-[0.2em] px-12 py-6 rounded-full bg-blue-600 text-white hover:bg-white hover:text-black transition-colors duration-500">
          Start a Project
        </button>
      </div>

      <div className="absolute bottom-8 w-full px-8 md:px-16 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] opacity-50 z-20">
        <p className="mb-4 md:mb-0">© 2026 DIGITAL SUPREMACY.</p>
        <div className="flex gap-8">
          <a href="https://www.instagram.com/digitalsupremacy.in/" target="_blank" rel="noopener noreferrer" className="hover-target hover:text-white transition-colors">Instagram</a>
          <a href="https://www.linkedin.com/company/digital-supremacy-in/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="hover-target hover:text-white transition-colors">LinkedIn</a>
          <a href="https://www.digitalsupremacy.in/" target="_blank" rel="noopener noreferrer" className="hover-target hover:text-white transition-colors">Agency</a>
        </div>
      </div>
    </footer>
  );
}

