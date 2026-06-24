"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getVideoSrc, getPosterSrc } from "./videoMapper";

const educationalReels = [
  { id: 1, title: "ROHIT SARAF", client: "Talking Head", src: "/videos/all/talkinghead_ROHIT_SARAF__6994_.mp4" },
  { id: 2, title: "TRADEHUB JUNE REEL 1", client: "Educational", src: "/videos/all/talkinghead_TRADEHUB_JUNE__REEL_1___1_.mp4" },
  { id: 4, title: "TRADEHUB JUNE REEL 2", client: "Educational", src: "/videos/all/talkinghead_TRADEHUB_JUNE__REEL_2___1_.mp4" },
  { id: 6, title: "RS REEL", client: "Talking Head", src: "/videos/all/talkinghead_rs_reel_6990.mp4" },
  { id: 8, title: "STAYLING SPACIO", client: "Educational", src: "/videos/all/talkinghead_stayling-spacio-002.mp4" },
  { id: 10, title: "STAYLING SPACIO 01", client: "Educational", src: "/videos/all/talkinghead_stayling-spacio-01.mp4" },
  { id: 13, title: "STYALING SPACIO JUNE 07", client: "Educational", src: "/videos/all/talkinghead_styaling_spacio_june_07.mp4" },
  { id: 15, title: "TRADEHUB REEL 1", client: "Educational", src: "/videos/all/talkinghead_tradehub__reel1__1.mp4" },
];

export function EducationalStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".edu-card");
      
      // GSAP purely handles the background scaling/fading as cards stack on top of each other.
      // Native CSS `sticky` handles the actual pinning to avoid layout thrashing.
      cards.forEach((card, i) => {
        const video = card.querySelector('video') as HTMLVideoElement;
        
        // Background scaling animation when the next card arrives
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.3,
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1], // Triggered when the NEXT card arrives
              start: "top 20%",      // When the next card hits near the sticky point
              end: "top -50%",       // Over a good scroll distance
              scrub: true,
            }
          });
        }
        
        // Scroll Focus Logic: Activate when it reaches the sticky point, deactivate when the next one covers it
        const activateVideo = () => {
          if (video) {
            video.muted = false;
            video.play().catch(() => {
              // Browser blocked unmuted autoplay because user hasn't interacted with page yet.
              // Fallback to playing muted so the video at least visually autoplays.
              video.muted = true;
              video.play().catch(() => {});
            });
            video.classList.remove('opacity-60', 'grayscale');
            video.classList.add('opacity-100', 'grayscale-0', 'scale-105');
            
            const overlay = card.querySelector('.edu-overlay');
            overlay?.classList.remove('opacity-80');
            overlay?.classList.add('opacity-30');
            
            const textInfo = card.querySelector('.edu-text');
            textInfo?.classList.remove('translate-y-4');
            textInfo?.classList.add('translate-y-0');
            
            const btn = card.querySelector('.edu-btn');
            btn?.classList.remove('bg-black/50', 'text-white');
            btn?.classList.add('bg-white', 'text-black');
          }
        };

        const deactivateVideo = () => {
          if (video) {
            video.muted = true;
            video.pause();
            video.classList.add('opacity-60', 'grayscale');
            video.classList.remove('opacity-100', 'grayscale-0', 'scale-105');
            
            const overlay = card.querySelector('.edu-overlay');
            overlay?.classList.add('opacity-80');
            overlay?.classList.remove('opacity-30');
            
            const textInfo = card.querySelector('.edu-text');
            textInfo?.classList.add('translate-y-4');
            textInfo?.classList.remove('translate-y-0');
            
            const btn = card.querySelector('.edu-btn');
            btn?.classList.add('bg-black/50', 'text-white');
            btn?.classList.remove('bg-white', 'text-black');
          }
        };

        ScrollTrigger.create({
          trigger: card,
          start: "top 40%", // Activate just before it hits the sticky point
          endTrigger: i === cards.length - 1 ? containerRef.current : cards[i + 1],
          end: i === cards.length - 1 ? "bottom bottom" : "top 35%", // Deactivate when the next card is almost overlapping it
          onEnter: activateVideo,
          onEnterBack: activateVideo,
          onLeave: deactivateVideo,
          onLeaveBack: deactivateVideo,
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="relative w-full bg-zinc-950 text-white pb-[30vh]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 w-full max-w-[1400px] mx-auto pt-32 px-4 md:px-12 relative">
        
        {/* Left: Sticky Typography */}
        <div className="col-span-1 lg:col-span-5 relative h-full hidden lg:block">
          <div className="sticky top-1/3">
            <h2 className="font-display font-black text-[5vw] uppercase tracking-tighter leading-[0.9]">
              The<br/>Academy
            </h2>
            <p className="font-sans text-base font-light text-zinc-400 mt-8 max-w-sm leading-relaxed">
              Authority built on camera. 8 educational masterclasses engineered for audience retention, deep conversion, and ultimate brand trust.
            </p>
            <div className="mt-12 w-16 h-[1px] bg-white/20"></div>
            <p className="font-mono text-xs text-zinc-500 mt-4 tracking-widest uppercase">
              Scroll to explore stack
            </p>
          </div>
        </div>

        {/* Right: The Physical Stack */}
        <div className="col-span-1 lg:col-span-7 relative flex flex-col gap-[40vh] pb-[20vh] pt-[10vh]">
          {/* Mobile Header (Hidden on Desktop) */}
          <div className="block lg:hidden mb-8">
            <h2 className="font-display font-black text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9]">
              The Academy
            </h2>
            <p className="font-sans text-sm font-light text-zinc-400 mt-4 leading-relaxed max-w-sm">
              Authority built on camera. 8 educational masterclasses engineered for retention.
            </p>
          </div>

          {educationalReels.map((p, i) => (
            <div 
              key={p.id} 
              className="edu-card sticky top-[12vh] md:top-[15vh] w-full max-w-[400px] md:max-w-[450px] aspect-[9/16] mx-auto lg:mx-0 lg:ml-auto rounded-[2rem] overflow-hidden border border-white/10 bg-[#050505] shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.8)] cursor-none origin-top transition-all duration-700"
              style={{ zIndex: i + 10 }}
            >
              <video 
                src={getVideoSrc(p.src)} 
                poster={getPosterSrc(p.src)}
                muted 
                loop 
                playsInline
                preload="none"
                className="w-full h-full object-cover transition-transform duration-700 ease-out opacity-60 grayscale"
              />
              <div className="edu-overlay absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none opacity-80 transition-opacity duration-700"></div>
              
              <div className="edu-text absolute bottom-0 left-0 w-full p-8 flex justify-between items-end transform translate-y-4 transition-transform duration-700 pointer-events-none">
                <div>
                  <span className="font-mono text-[10px] text-zinc-400 mb-2 block tracking-widest bg-white/10 px-2 py-1 rounded w-max">
                    {p.client}
                  </span>
                  <h3 className="font-display text-2xl font-black uppercase text-white tracking-tighter leading-none max-w-[200px] drop-shadow-md">
                    {p.title}
                  </h3>
                </div>
                <div className="edu-btn w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-black/50 text-white backdrop-blur-sm transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M228.23,134.46l-136,88A16,16,0,0,1,68,208.23V47.77a16,16,0,0,1,24.23-13.77l136,88A16,16,0,0,1,228.23,134.46Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
