"use client";

"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [timecode, setTimecode] = useState("00:00:00:00");
  const containerRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Dynamic Timecode Generator (24fps simulation)
    let frames = 0;
    const timecodeInterval = setInterval(() => {
      frames += 1;
      const f = (frames % 24).toString().padStart(2, "0");
      const s = Math.floor((frames / 24) % 60).toString().padStart(2, "0");
      const m = Math.floor((frames / (24 * 60)) % 60).toString().padStart(2, "0");
      setTimecode(`00:${m}:${s}:${f}`);
    }, 1000 / 24);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        document.body.style.overflow = "auto";
        clearInterval(timecodeInterval);
      }
    });

    // 1. Initial fade in of HUD elements with a slight scale down for depth
    tl.fromTo(
      ".hud-element",
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" }
    );

    // 2. Hold the recording state
    tl.to({}, { duration: 1.2 }); 

    tl.addLabel("focusPull");

    // 3. The "Focus Pull" - aggressive scale up and blur out
    tl.to(
      ".center-lens",
      {
        scale: 5,
        rotation: 45,
        opacity: 0,
        duration: 0.7,
        ease: "power2.in"
      },
      "focusPull"
    );

    tl.to(
      hudRef.current,
      {
        scale: 1.6,
        filter: "blur(12px)",
        opacity: 0,
        duration: 0.7,
        ease: "power3.in"
      },
      "focusPull"
    );

    // 4. Fade out the black background to reveal the cinematic hero
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut"
      },
      "focusPull+=0.4"
    );

    return () => {
      clearInterval(timecodeInterval);
      tl.kill();
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center pointer-events-none text-white font-mono select-none overflow-hidden"
    >
      <div ref={hudRef} className="relative w-full h-full max-w-[100vw] max-h-[100dvh] flex flex-col p-6 md:p-12 overflow-hidden">
        
        {/* Safe Area Brackets (Corners) */}
        <div className="hud-element absolute top-8 left-8 w-12 h-12 md:w-20 md:h-20 border-t-[1.5px] border-l-[1.5px] border-white/60"></div>
        <div className="hud-element absolute top-8 right-8 w-12 h-12 md:w-20 md:h-20 border-t-[1.5px] border-r-[1.5px] border-white/60"></div>
        <div className="hud-element absolute bottom-8 left-8 w-12 h-12 md:w-20 md:h-20 border-b-[1.5px] border-l-[1.5px] border-white/60"></div>
        <div className="hud-element absolute bottom-8 right-8 w-12 h-12 md:w-20 md:h-20 border-b-[1.5px] border-r-[1.5px] border-white/60"></div>

        {/* Immersive Center Lens / Aperture Ring */}
        <div className="hud-element center-lens absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-40">
          {/* Inner Crosshair */}
          <div className="absolute w-[1px] h-12 bg-white"></div>
          <div className="absolute w-12 h-[1px] bg-white"></div>
          <div className="absolute w-2 h-2 rounded-full border-[1px] border-white"></div>
          
          {/* Rotating Focus Ring */}
          <div className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full border-[1.5px] border-white/20 border-dashed animate-[spin_10s_linear_infinite]"></div>
          
          {/* Outer Lens Barrel with Tick Marks */}
          <div className="absolute w-40 h-40 md:w-64 md:h-64 rounded-full border-[1px] border-white/10 animate-[spin_15s_linear_infinite_reverse]">
            <div className="absolute top-0 left-1/2 w-[1px] h-3 bg-white/50 -translate-x-1/2"></div>
            <div className="absolute bottom-0 left-1/2 w-[1px] h-3 bg-white/50 -translate-x-1/2"></div>
            <div className="absolute left-0 top-1/2 w-3 h-[1px] bg-white/50 -translate-y-1/2"></div>
            <div className="absolute right-0 top-1/2 w-3 h-[1px] bg-white/50 -translate-y-1/2"></div>
            {/* Corner ticks rotated 45deg */}
            <div className="absolute top-[14.6%] left-[14.6%] w-2 h-[1px] bg-white/30 rotate-45"></div>
            <div className="absolute bottom-[14.6%] right-[14.6%] w-2 h-[1px] bg-white/30 rotate-45"></div>
            <div className="absolute top-[14.6%] right-[14.6%] w-2 h-[1px] bg-white/30 -rotate-45"></div>
            <div className="absolute bottom-[14.6%] left-[14.6%] w-2 h-[1px] bg-white/30 -rotate-45"></div>
          </div>
        </div>

        {/* Top Bar */}
        <div className="flex justify-between items-start w-full z-10">
          {/* Metadata */}
          <div className="hud-element flex flex-col gap-1 text-[10px] md:text-sm tracking-[0.2em] opacity-80">
            <span>FORMAT: ARRIRAW</span>
            <span>FPS: 24.000</span>
            <span>ISO: 800</span>
            <span>WB: 5600K</span>
            <span>SHUTTER: 180.0°</span>
          </div>

          {/* REC Indicator */}
          <div className="hud-element flex items-center gap-3">
            <span className="text-[#ff0000] font-bold tracking-widest text-xs md:text-base drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]">REC</span>
            <div className="w-3 h-3 md:w-4 md:h-4 bg-[#ff0000] rounded-full animate-pulse drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]"></div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-auto flex flex-col items-center justify-end w-full gap-6 pb-2 z-10">
          
          {/* Audio Meters */}
          <div className="hud-element flex flex-col gap-[3px] w-48 md:w-64 opacity-70">
            <div className="flex justify-between text-[8px] text-white/50 font-sans tracking-tighter w-full mb-1">
              <span>-40</span><span>-30</span><span>-20</span><span>-10</span><span>0</span>
            </div>
            <div className="flex gap-1 h-2 w-full bg-white/10 overflow-hidden relative">
              <div className="absolute left-[80%] top-0 bottom-0 w-[1px] bg-red-500/50 z-10"></div>
              <div className="h-full bg-emerald-400/80 w-[72%] transition-all duration-75"></div>
            </div>
            <div className="flex gap-1 h-2 w-full bg-white/10 overflow-hidden relative">
              <div className="absolute left-[80%] top-0 bottom-0 w-[1px] bg-red-500/50 z-10"></div>
              <div className="h-full bg-emerald-400/80 w-[65%] transition-all duration-75"></div>
            </div>
          </div>

          {/* Timecode */}
          <div className="hud-element text-3xl md:text-5xl font-light tracking-[0.15em] opacity-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            {timecode}
          </div>
        </div>
        
      </div>
    </div>
  );
}
