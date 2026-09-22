"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/animations";
import { destinations } from "@/data/destinations";
import { Play, ArrowRight, Clapperboard } from "lucide-react";

const IndiaMapbox = dynamic(() => import("./mapbox/IndiaMapbox"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

type Props = {
  onWatchReel: () => void;
};

export default function Hero({ onWatchReel }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const active = destinations.find((d) => d.id === activeId);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }, headlineRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden bg-ink pt-20">
      {/* ambient background glow, sits beneath everything */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-gold/5 blur-[160px]" />
      </div>

      {/* 3D map: full-bleed layer occupying the right ~65% of the hero,
          with no hard edges — it fades into the page background via a
          mask so it never reads as a bounded rectangle. */}
      <div
        className="absolute inset-y-0 right-0 w-full lg:w-[68%] z-0"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 78% at 64% 48%, black 45%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 78% at 64% 48%, black 45%, transparent 85%)",
        }}
      >
        <IndiaMapbox activeId={activeId} onSelect={setActiveId} />
      </div>

      {/* protects text legibility where the map sits directly behind
          the headline on small screens; invisible on large screens
          where the map is masked away from the text column */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-ink/95 via-ink/55 to-ink/90 lg:bg-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10 grid lg:grid-cols-[1fr_1.1fr] gap-8 items-center min-h-[calc(100vh-5rem)]">
        {/* Left: text content */}
        <div ref={headlineRef} className="relative z-10 py-12 lg:py-0">
          <p className="hero-reveal flex items-center gap-2 text-xs md:text-sm tracking-[0.2em] uppercase text-gold mb-6">
            <Clapperboard size={14} />
            Travel Video Editor &amp; Colorist
          </p>
          <h1 className="hero-reveal font-display text-6xl sm:text-7xl md:text-8xl leading-[0.92] mb-6">
            I TURN
            <br />
            TRAVEL
            <br />
            INTO <span className="font-script text-gold-gradient normal-case">Stories.</span>
          </h1>
          <p className="hero-reveal text-white-dim text-base md:text-lg max-w-md mb-10 leading-relaxed text-white/70">
            I help creators, brands &amp; businesses turn raw footage into
            cinematic stories that inspire and create impact.
          </p>
          <div className="hero-reveal flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 bg-gold text-ink px-6 py-3.5 rounded-full text-sm tracking-[0.1em] uppercase font-medium hover:bg-gold-2 transition-colors duration-300"
            >
              Explore My Journey
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-ink/15 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight size={12} />
              </span>
            </a>
            <button
              onClick={onWatchReel}
              className="group inline-flex items-center gap-2 border border-white/30 px-6 py-3.5 rounded-full text-sm tracking-[0.1em] uppercase hover:border-gold hover:text-gold transition-colors duration-300"
            >
              Watch Reel
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 group-hover:bg-gold/20 transition-colors">
                <Play size={10} className="fill-current translate-x-[1px]" />
              </span>
            </button>
          </div>
        </div>

        {/* Right column: spacer + floating active destination card
            (the map itself lives in the full-bleed layer above) */}
        <div className="relative h-[480px] sm:h-[560px] lg:h-[720px] w-full pointer-events-none">
          {active && (
            <div className="absolute top-6 right-2 sm:top-10 sm:right-6 glass gold-border px-5 py-4 max-w-[220px] pointer-events-auto animate-[fadeIn_0.4s_ease]">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-1">
                {active.region}
              </p>
              <h3 className="font-display text-2xl mb-2 leading-none">{active.name}</h3>
              <p className="text-xs text-white/60 mb-3 leading-relaxed">
                Cinematic Travel Reel
              </p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-3">
                {active.techniques.join(" · ")}
              </p>
              <button
                onClick={onWatchReel}
                className="text-[11px] tracking-[0.2em] uppercase text-gold border-b border-gold/50 pb-0.5 hover:text-gold-2 transition-colors"
              >
                Watch Reel →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* destination selector strip */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10 pb-10">
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">
          Choose a Destination
        </p>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {destinations.map((d) => (
            <button
              key={d.id}
              onClick={() => setActiveId(d.id === activeId ? null : d.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-2 group`}
            >
              <span
                className={`w-16 h-16 border transition-all duration-300 flex items-center justify-center ${
                  activeId === d.id
                    ? "border-gold scale-105"
                    : "border-white/15 group-hover:border-white/40"
                }`}
                style={{
                  background: `linear-gradient(135deg, ${d.color}55, ${d.color}15)`,
                }}
              />
              <span
                className={`text-[10px] tracking-[0.15em] uppercase ${
                  activeId === d.id ? "text-gold" : "text-white/50"
                }`}
              >
                {d.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
