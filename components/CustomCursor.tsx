"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    gsap.ticker.add(() => {
      cursorX += (mouseX - cursorX) * 0.45;
      cursorY += (mouseY - cursorY) * 0.45;

      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
      });
    });

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    const attachHover = () => {
      const interactables = document.querySelectorAll("a, button, .hover-target");
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
    };

    attachHover();
    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 flex items-center justify-center w-5 h-5 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    >
      <div 
        ref={scaleRef}
        className={`w-full h-full bg-white rounded-full flex items-center justify-center transition-transform duration-300 ${
          isHovering ? "scale-[3.5]" : "scale-100"
        }`}
      >
        <span
          className={`text-[3.5px] font-display font-bold text-black mix-blend-normal transition-opacity duration-300 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
        >
          VIEW
        </span>
      </div>
    </div>
  );
}
