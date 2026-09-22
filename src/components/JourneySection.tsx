"use client";

import { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import Image from "next/image";
import { destinations } from "@/data/destinations";
import { gsap, registerGsap } from "@/lib/animations";

type Props = {
  onPlay: (destinationId: string) => void;
};

export default function JourneySection({ onPlay }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".journey-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="journey" className="relative py-28 md:py-36 bg-ink-2">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="section-eyebrow mb-4">01 — The Journey</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] mb-5">
            MY JOURNEY THROUGH INDIA
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            A collection of personal travel projects created while exploring
            India through the lens.
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 xl:grid-cols-4 md:overflow-visible">
          {destinations.map((d) => (
            <button
              key={d.id}
              onClick={() => onPlay(d.id)}
              className="journey-card group relative flex-shrink-0 w-[240px] md:w-full snap-start aspect-[3/4] overflow-hidden border border-white/10 hover:border-gold/50 transition-colors duration-500 text-left"
            >
              {/* Real destination photo */}
              {d.thumbnail && (
                <Image
                  src={d.thumbnail}
                  alt={d.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 240px, (max-width: 1280px) 50vw, 25vw"
                />
              )}

              {/* Fallback color gradient if no image yet */}
              {!d.thumbnail && (
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(160deg, ${d.color}40, #0a0d16 80%)`,
                  }}
                />
              )}

              {/* Dark overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

              <div className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-sm bg-black/20 group-hover:bg-gold group-hover:border-gold group-hover:text-ink transition-all duration-300">
                <Play size={12} className="fill-current translate-x-[1px]" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-1">
                  {d.region}
                </p>
                <h3 className="font-display text-2xl mb-2 leading-none">{d.name}</h3>
                <p className="text-xs text-white/60 leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-16 overflow-hidden">
                  {d.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
