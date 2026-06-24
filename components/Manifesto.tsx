"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Line 1 moves Left
      gsap.fromTo(line1Ref.current, 
        { xPercent: 10 },
        {
          xPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        }
      );

      // Line 2 moves Right
      gsap.fromTo(line2Ref.current, 
        { xPercent: -10 },
        {
          xPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        }
      );

      // Line 3 moves Left (slightly faster for parallax feel)
      gsap.fromTo(line3Ref.current, 
        { xPercent: 15 },
        {
          xPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="agency" ref={sectionRef} className="h-[60vh] md:h-[80vh] flex flex-col justify-center overflow-hidden bg-black text-white border-y border-white/10 relative">
      {/* Background grain or texture can go here if needed */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 pointer-events-none"></div>

      <div className="flex flex-col gap-2 md:gap-6 whitespace-nowrap w-[200vw] -ml-[50vw] text-center z-0">
        <h2 ref={line1Ref} className="font-display font-black text-[15vw] md:text-[9vw] leading-[0.8] uppercase tracking-tighter opacity-90 text-stroke hover:text-white transition-colors duration-500">
          We Don't Just
        </h2>
        <h2 ref={line2Ref} className="font-display font-black text-[15vw] md:text-[9vw] leading-[0.8] uppercase tracking-tighter text-blue-600">
          Create Content.
        </h2>
        <h2 ref={line3Ref} className="font-display font-black text-[15vw] md:text-[9vw] leading-[0.8] uppercase tracking-tighter opacity-90 text-stroke hover:text-white transition-colors duration-500">
          Engineer Attention.
        </h2>
      </div>
    </section>
  );
}
