"use client";
import { getVideoSrc, getPosterSrc } from "./videoMapper";

const allReels = [
  { id: 1, title: "ROHIT SARAF", client: "Talking Head", src: "/videos/all/talkinghead_ROHIT_SARAF__6994_.mp4" },
  { id: 2, title: "TRADEHUB JUNE REEL 1", client: "Educational", src: "/videos/all/talkinghead_TRADEHUB_JUNE__REEL_1___1_.mp4" },
  { id: 3, title: "ARTHENIC LUXE INTRO", client: "Cinematic", src: "/videos/all/cinematic_ARTHENIC_LUXE__INTRO_.mp4" },
  { id: 4, title: "TRADEHUB JUNE REEL 2", client: "Educational", src: "/videos/all/talkinghead_TRADEHUB_JUNE__REEL_2___1_.mp4" },
  { id: 5, title: "ARTHENIC LUXE REEL 3", client: "Cinematic", src: "/videos/all/cinematic_ARTHENIC_LUXE__REEL_3.mp4" },
  { id: 6, title: "RS REEL", client: "Talking Head", src: "/videos/all/talkinghead_rs_reel_6990.mp4" },
  { id: 7, title: "ARTHENIC LUXE REEL 5", client: "Cinematic", src: "/videos/all/cinematic_ARTHENIC_LUXE__REEL_5_.mp4" },
  { id: 8, title: "STAYLING SPACIO", client: "Educational", src: "/videos/all/talkinghead_stayling-spacio-002.mp4" },
  { id: 9, title: "ARTHENIC LUXE REEL 6", client: "Cinematic", src: "/videos/all/cinematic_ARTHENIC_LUXE__REEL_6_.mp4" },
  { id: 10, title: "STAYLING SPACIO 01", client: "Educational", src: "/videos/all/talkinghead_stayling-spacio-01.mp4" },
  { id: 11, title: "COMING SOON", client: "Cinematic", src: "/videos/all/cinematic_coming_soon_june.mp4" },
  { id: 12, title: "STYALING SPACIO JUNE 05", client: "Cinematic", src: "/videos/all/cinematic_styaling_spacio_june_05.mp4" },
  { id: 13, title: "STYALING SPACIO JUNE 07", client: "Educational", src: "/videos/all/talkinghead_styaling_spacio_june_07.mp4" },
  { id: 14, title: "SWADYOG JUN 01", client: "Cinematic", src: "/videos/all/cinematic_swadyog-jun-01.mp4" },
  { id: 15, title: "TRADEHUB REEL 1", client: "Educational", src: "/videos/all/talkinghead_tradehub__reel1__1.mp4" },
  { id: 16, title: "SWADYOG JUN 02", client: "Cinematic", src: "/videos/all/cinematic_swadyog-jun-02.mp4" },
  { id: 17, title: "SWADYOG JUN 03", client: "Cinematic", src: "/videos/all/cinematic_swadyog-jun-03.mp4" },
  { id: 18, title: "AAMARAS SWADYOG", client: "Cinematic", src: "/videos/all/cinematic_unlimited_aamaras_swadyog.mp4" },
  { id: 19, title: "ARTHENIC LUXE REEL 3 (V2)", client: "Cinematic", src: "/videos/all/cinematic_ARTHENIC_LUXE__REEL_3_.mp4" },
];

export function ReelsGrid() {
  return (
    <section id="work" className="w-full bg-black text-white pt-24 border-b border-white/10">
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4 md:px-12">
          <h2 className="font-display font-black text-5xl md:text-[8vw] uppercase tracking-tighter leading-none">
            Selected<br />Works
          </h2>
          <p className="font-sans text-xs md:text-sm font-light uppercase tracking-widest max-w-sm mt-8 md:mt-0 opacity-70">
            A massive collection of our shortform content & visual stories
          </p>
        </div>

        {/* Gapless Masonry Grid using CSS Columns */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-0 border-t border-white/10">
          {allReels.map((p) => (
            <div 
              key={p.id} 
              className="relative group overflow-hidden border-b border-r border-white/10 bg-[#050505] hover-target cursor-none break-inside-avoid"
            >
              <video 
                src={getVideoSrc(p.src)} 
                poster={getPosterSrc(p.src)}
                muted 
                loop 
                playsInline
                preload="none"
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105 opacity-40 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                onMouseEnter={(e) => {
                  const video = e.currentTarget;
                  video.play().catch(() => {}); // catch autoplay errors silently
                }}
                onMouseLeave={(e) => {
                  const video = e.currentTarget;
                  video.pause();
                  video.currentTime = 0;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 mix-blend-multiply pointer-events-none"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                <div>
                  <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-blue-500 mb-2 font-bold">{p.client}</p>
                  <h3 className="font-display text-xl md:text-2xl font-black uppercase text-white tracking-tighter leading-none max-w-[200px]">{p.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
