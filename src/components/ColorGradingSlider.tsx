"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { gsap, registerGsap } from "@/lib/animations";

const CONTROLS = [
  "Light & Contrast",
  "Color Balance",
  "Tone Mapping",
  "Color Grading",
];

export default function ColorGradingSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      updateFromClientX(e.clientX);
    };
    const onUp = () => (dragging.current = false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [updateFromClientX]);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".grade-control",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        wrapRef.current,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="color-grading" className="relative py-28 md:py-36 bg-ink">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="section-eyebrow mb-4">04 — Raw to Cinematic</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] mb-5">
            RAW TO CINEMATIC
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            Color grading is where the mood begins.
          </p>
        </div>

        <div
          ref={wrapRef}
          className="relative w-full aspect-video max-h-[600px] select-none overflow-hidden border border-white/10 cursor-ew-resize"
          onPointerDown={(e) => {
            dragging.current = true;
            updateFromClientX(e.clientX);
          }}
        >
          {/* RAW (base layer) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #8a8a86 0%, #6b6b68 45%, #9a9691 100%)",
              filter: "grayscale(0.35) contrast(0.85) brightness(1.05)",
            }}
          >
            <div className="absolute top-6 left-6 text-[11px] tracking-[0.3em] uppercase bg-black/50 px-3 py-1.5 text-white/80">
              Raw
            </div>
          </div>

          {/* GRADED (clipped layer) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${percent}%)` }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #d9a860 0%, #a86f38 45%, #e8c98a 100%)",
                filter: "saturate(1.3) contrast(1.15) brightness(0.95) sepia(0.15)",
              }}
            />
            <div className="absolute top-6 right-6 text-[11px] tracking-[0.3em] uppercase bg-gold text-ink px-3 py-1.5 font-medium">
              Graded
            </div>
          </div>

          {/* divider handle */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-gold/80"
            style={{ left: `${percent}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ink border border-gold flex items-center justify-center text-gold shadow-lg">
              <MoveHorizontal size={18} />
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {CONTROLS.map((label) => (
            <div
              key={label}
              className="grade-control border border-white/10 px-5 py-4 text-center hover:border-gold/40 transition-colors duration-300"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/60">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
