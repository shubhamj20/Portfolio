"use client";

import { useEffect, useRef } from "react";
import { reels, type Reel } from "@/data/reels";
import ReelCard from "./ReelCard";
import { gsap, registerGsap } from "@/lib/animations";

type Props = {
  onPlay: (reel: Reel) => void;
};

export default function FeaturedWork({ onPlay }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reel-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative py-28 md:py-36 bg-ink">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="section-eyebrow mb-4">02 — Featured Work</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] mb-5">
            FEATURED WORK
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            Personal travel projects exploring storytelling, pacing, sound
            design and cinematic color.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {reels.map((reel) => (
            <ReelCard key={reel.id} reel={reel} onPlay={onPlay} />
          ))}
        </div>
      </div>
    </section>
  );
}
