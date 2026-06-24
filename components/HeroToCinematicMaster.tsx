"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getVideoSrc, getPosterSrc, getLowQualityVideoSrc } from "./videoMapper";

const marqueeVideos = [
  "/videos/all/cinematic_ARTHENIC_LUXE__INTRO_.mp4",
  "/videos/all/cinematic_ARTHENIC_LUXE__REEL_5_.mp4",
  "/videos/all/cinematic_swadyog-jun-01.mp4",
  "/videos/all/cinematic_styaling_spacio_june_05.mp4",
  "/videos/all/cinematic_swadyog-jun-03.mp4"
];

const cinematicReels = [
  { id: 3, title: "ARTHENIC LUXE INTRO", client: "Cinematic", src: "/videos/all/cinematic_ARTHENIC_LUXE__INTRO_.mp4" },
  { id: 5, title: "ARTHENIC LUXE REEL 3", client: "Cinematic", src: "/videos/all/cinematic_ARTHENIC_LUXE__REEL_3.mp4" },
  { id: 7, title: "ARTHENIC LUXE REEL 5", client: "Cinematic", src: "/videos/all/cinematic_ARTHENIC_LUXE__REEL_5_.mp4" },
  { id: 9, title: "ARTHENIC LUXE REEL 6", client: "Cinematic", src: "/videos/all/cinematic_ARTHENIC_LUXE__REEL_6_.mp4" },
  { id: 11, title: "COMING SOON", client: "Cinematic", src: "/videos/all/cinematic_coming_soon_june.mp4" },
  { id: 12, title: "STYALING SPACIO JUNE 05", client: "Cinematic", src: "/videos/all/cinematic_styaling_spacio_june_05.mp4" },
  { id: 14, title: "SWADYOG JUN 01", client: "Cinematic", src: "/videos/all/cinematic_swadyog-jun-01.mp4" },
  { id: 16, title: "SWADYOG JUN 02", client: "Cinematic", src: "/videos/all/cinematic_swadyog-jun-02.mp4" },
  { id: 17, title: "SWADYOG JUN 03", client: "Cinematic", src: "/videos/all/cinematic_swadyog-jun-03.mp4" },
  { id: 18, title: "AAMARAS SWADYOG", client: "Cinematic", src: "/videos/all/cinematic_unlimited_aamaras_swadyog.mp4" },
  { id: 19, title: "ARTHENIC LUXE REEL 3 (V2)", client: "Cinematic", src: "/videos/all/cinematic_ARTHENIC_LUXE__REEL_3_.mp4" },
];

const galleryItems = cinematicReels;

export function HeroToCinematicMaster() {
  const masterContainerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroMarqueeRef = useRef<HTMLDivElement>(null);
  
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const cropTextRef = useRef<HTMLHeadingElement>(null);
  
  const cinematicSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [focusedVideoIndex, setFocusedVideoIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Independent Hero infinite marquee animation
      gsap.to(".hero-marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      });

      // Calculate width for horizontal scroll
      const getScrollAmount = () => {
        const track = trackRef.current;
        if (!track) return 0;
        const trackWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;
        return -(trackWidth - windowWidth);
      };

      // 2. Master Timeline (pinned)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: masterContainerRef.current,
          start: "top top",
          end: "+=500%", // 5 screens of scrolling
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Find which cinematic video is centered
            if (self.progress > 0.4 && trackRef.current) {
              const videos = gsap.utils.toArray(".cinematic-item") as HTMLElement[];
              const centerX = window.innerWidth / 2;
              let closestIndex = 0;
              let minDistance = Infinity;

              videos.forEach((vid, i) => {
                const rect = vid.getBoundingClientRect();
                const vidCenter = rect.left + rect.width / 2;
                const distance = Math.abs(centerX - vidCenter);
                if (distance < minDistance) {
                  minDistance = distance;
                  closestIndex = i;
                }
              });

              if (focusedVideoIndex !== closestIndex) {
                setFocusedVideoIndex(closestIndex);
              }
            } else if (self.progress < 0.4) {
              setFocusedVideoIndex(null);
            }
            
            // Force pause/play hero videos based on progress
            if (heroSectionRef.current) {
              const heroVids = heroSectionRef.current.querySelectorAll('video');
              if (self.progress > 0.3) {
                heroVids.forEach(v => { if (!v.paused) v.pause() });
              } else {
                heroVids.forEach(v => { if (v.paused) v.play().catch(()=>{}) });
              }
            }
          },
          onLeave: () => {
            // Force pause all cinematic videos on leave to prevent audio bleed
            const vids = document.querySelectorAll('.cinematic-item video');
            vids.forEach(v => (v as HTMLVideoElement).pause());
          },
          onLeaveBack: () => {
            // Force pause all cinematic videos on leave back
            const vids = document.querySelectorAll('.cinematic-item video');
            vids.forEach(v => (v as HTMLVideoElement).pause());
          }
        }
      });

      // Sequence:
      
      // Phase 1: Fade and scale out the Hero section (0% - 20%)
      tl.to(heroTextRef.current, { y: -150, opacity: 0, scale: 1.1, duration: 1 }, 0);
      tl.to(heroMarqueeRef.current, { 
        width: "100vw", height: "100vh", borderRadius: "0px", duration: 1 
      }, 0);
      
      tl.to(heroSectionRef.current, {
        scale: 0.8,
        filter: "blur(10px)",
        duration: 2
      }, 1);

      // Phase 2: Drop the Curtain (20% - 40%)
      // Phase 2: The Cinematic Crop (Letterbox Crush) (20% - 40%)
      // Top and bottom bars crush the screen to black
      tl.fromTo(topBarRef.current,
        { height: "0vh" },
        { height: "50vh", duration: 2, ease: "power2.inOut" },
        2
      );
      tl.fromTo(bottomBarRef.current,
        { height: "0vh" },
        { height: "50vh", duration: 2, ease: "power2.inOut" },
        2
      );
      tl.fromTo(cropTextRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        3
      );
      
      // While the screen is completely covered (time = 4), instantly swap z-indexes and opacity
      tl.set(heroSectionRef.current, { visibility: "hidden" }, 4);
      tl.set(cinematicSectionRef.current, { opacity: 1, zIndex: 20 }, 4);

      // Phase 3: Reveal Cinematic Gallery (40% - 60%)
      // Text fades out
      tl.to(cropTextRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 1,
        ease: "power2.in"
      }, 4);
      // Bars expand outward to reveal the gallery
      tl.to(topBarRef.current, {
        height: "0vh",
        duration: 2,
        ease: "power2.inOut"
      }, 4);
      tl.to(bottomBarRef.current, {
        height: "0vh",
        duration: 2,
        ease: "power2.inOut"
      }, 4);
      
      // Cinematic section slight scale-down reveal effect
      tl.fromTo(cinematicSectionRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 1.5, ease: "power2.out" },
        4
      );

      // Phase 4: Horizontal Scroll Cinematic Gallery (60% - 100%)
      tl.to(trackRef.current, {
        x: () => getScrollAmount(),
        ease: "none",
        duration: 4
      }, 6);

    }, masterContainerRef);

    // Refresh scroll triggers if layout changes
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    if (masterContainerRef.current) {
      resizeObserver.observe(masterContainerRef.current);
    }
    // Force a refresh after a small delay to ensure track width is calculated
    setTimeout(() => ScrollTrigger.refresh(), 500);

    // CPU Optimization: Pause videos completely off-screen
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const vid = entry.target as HTMLVideoElement;
        // Don't auto-play cinematic items here, they are controlled by focusedVideoIndex
        const isCinematic = vid.closest('.cinematic-item');
        if (entry.isIntersecting) {
          if (!isCinematic) {
            vid.play().catch(()=>{});
          }
        } else {
          vid.pause();
        }
      });
    }, { rootMargin: "100px" }); // Start playing slightly before entering screen

    if (masterContainerRef.current) {
      const allVideos = masterContainerRef.current.querySelectorAll('video');
      allVideos.forEach(v => videoObserver.observe(v));
    }

    return () => {
      ctx.revert();
      resizeObserver.disconnect();
      videoObserver.disconnect();
    };
  }, []);

  // Handle focused video audio
  useEffect(() => {
    const videos = document.querySelectorAll('.cinematic-item video');
    videos.forEach((vid, idx) => {
      const video = vid as HTMLVideoElement;
      if (idx === focusedVideoIndex) {
        // Try playing unmuted first. If browser blocks due to lack of interaction, fallback to muted.
        video.muted = false;
        video.play().catch(()=>{
          video.muted = true;
          video.play().catch(()=>{});
        });
        vid.parentElement?.classList.add('scale-105', 'opacity-100', 'z-20');
        vid.parentElement?.classList.remove('opacity-40', 'grayscale');
      } else {
        video.muted = true;
        video.pause();
        vid.parentElement?.classList.remove('scale-105', 'opacity-100', 'z-20');
        vid.parentElement?.classList.add('opacity-40', 'grayscale');
      }
    });
  }, [focusedVideoIndex]);

  return (
    <div id="work" ref={masterContainerRef} className="relative w-full h-screen overflow-hidden bg-black text-white">
      
      {/* 1. HERO SECTION */}
      <div ref={heroSectionRef} className="absolute inset-0 flex items-center justify-center z-10">
        
        {/* Audio Enable Prompt */}
        <div className="absolute top-10 md:top-16 z-30 flex items-center gap-2 opacity-50 animate-pulse pointer-events-none mix-blend-difference">
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <span className="font-mono text-[9px] md:text-xs tracking-[0.3em] uppercase">Click anywhere to enable sound</span>
        </div>

        <div 
          ref={heroTextRef} 
          className="absolute z-20 w-full flex flex-col items-center text-center mix-blend-difference pointer-events-none"
        >
          <h1 className="font-display font-black text-[12vw] md:text-[15vw] leading-[0.8] tracking-tighter uppercase whitespace-nowrap">
            Digital
          </h1>
          <h1 className="font-display font-black text-[12vw] md:text-[15vw] leading-[0.8] tracking-tighter uppercase whitespace-nowrap text-stroke text-white/30">
            Supremacy
          </h1>
        </div>

        <div 
          ref={heroMarqueeRef}
          className="absolute z-10 w-[80vw] md:w-[50vw] h-[50vh] md:h-[40vh] overflow-hidden rounded-[2rem] border border-white/10"
        >
          <div className="w-[200vw] h-full flex">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="hero-marquee-track flex gap-4 w-[100vw] h-full p-4 shrink-0">
                <div className="flex flex-col gap-4 w-1/3 h-[150%] -translate-y-1/4">
                  {marqueeVideos.slice(0, 3).map((src, j) => (
                    <video key={j} src={getLowQualityVideoSrc(src)} autoPlay muted loop playsInline preload="none" className="w-full rounded-xl object-cover opacity-60 pointer-events-none" />
                  ))}
                </div>
                <div className="flex flex-col gap-4 w-1/3 h-[150%] translate-y-0">
                  {[...marqueeVideos].reverse().slice(0, 3).map((src, j) => (
                    <video key={j} src={getLowQualityVideoSrc(src)} autoPlay muted loop playsInline preload="none" className="w-full rounded-xl object-cover opacity-60 pointer-events-none" />
                  ))}
                </div>
                <div className="flex flex-col gap-4 w-1/3 h-[150%] -translate-y-1/3">
                  {marqueeVideos.slice(1, 4).map((src, j) => (
                    <video key={j} src={getLowQualityVideoSrc(src)} autoPlay muted loop playsInline preload="none" className="w-full rounded-xl object-cover opacity-60 pointer-events-none" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. CINEMATIC GALLERY */}
      <div ref={cinematicSectionRef} className="absolute inset-0 flex flex-col justify-center opacity-0" style={{ zIndex: 0 }}>
        <div className="absolute top-24 md:top-32 left-6 md:left-12 z-20 mix-blend-difference">
          <p className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-blue-500 mb-2">
            Director's Cut
          </p>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tighter uppercase">
            Cinematics
          </h2>
        </div>
        
        <div className="w-full h-[65vh] md:h-[75vh] overflow-visible mt-16 md:mt-24">
          <div ref={trackRef} className="flex h-full w-max px-[calc(50vw-(65vh*9/32))] md:px-[calc(50vw-(75vh*9/32))]">
            {galleryItems.map((reel, idx) => (
              <div 
                key={reel.id} 
                className={`cinematic-item relative h-full aspect-[9/16] mx-2 md:mx-4 shrink-0 transition-all duration-700 ease-out origin-center rounded-2xl overflow-hidden hover-target border border-white/10`}
              >
                <video 
                  src={getVideoSrc(reel.src)}
                  poster={getPosterSrc(reel.src)}
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full p-6 text-white text-left pointer-events-none">
                  <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-blue-500 mb-2 font-bold">{reel.client}</p>
                  <h3 className="font-display text-xl md:text-2xl font-black uppercase tracking-tighter leading-none">{reel.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. CINEMATIC CROP TRANSITION */}
      <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between">
        <div ref={topBarRef} className="w-full bg-[#050505]" style={{ height: '0vh' }} />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 
            ref={cropTextRef}
            className="font-display font-black text-[8vw] md:text-[6vw] text-white tracking-[0.2em] uppercase opacity-0 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            Director's Cut
          </h2>
        </div>

        <div ref={bottomBarRef} className="w-full bg-[#050505]" style={{ height: '0vh' }} />
      </div>

    </div>
  );
}
