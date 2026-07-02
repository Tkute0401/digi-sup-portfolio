"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".manifesto-word");
      
      gsap.fromTo(words, 
        { opacity: 0.1, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 90%",
            scrub: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const text = "We Don't Just Create Content. We Engineer Attention.";
  const words = text.split(" ");

  return (
    <section id="agency" ref={sectionRef} className="flex flex-col justify-center items-center bg-black text-white px-6 md:px-12 py-[15vh] md:py-[20vh] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 pointer-events-none"></div>
      
      <div ref={textRef} className="max-w-[1400px] mx-auto text-center z-20">
        <h2 className="font-display font-black text-[13vw] md:text-8xl lg:text-[9rem] uppercase tracking-tighter leading-[0.85] flex flex-wrap justify-center">
          {words.map((word, idx) => (
            <span 
              key={idx} 
              className={`manifesto-word inline-block mr-[2vw] mb-4 md:mb-6 transition-colors duration-300 ${
                word.includes("Content.") || word.includes("Attention.") ? "text-blue-600" : "text-white"
              }`}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
