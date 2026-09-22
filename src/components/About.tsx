"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, registerGsap } from "@/lib/animations";

const STATS = [
  { value: "10+", label: "Personal Travel Reels" },
  { value: "India", label: "Travel Projects" },
  { value: "5+", label: "Editing Skills" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        ".about-image",
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-28 md:py-36 bg-ink-2 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="about-reveal section-eyebrow mb-4">05 — About Me</p>
          <h2 className="about-reveal font-display text-4xl md:text-6xl leading-[0.95] mb-8">
            THE STORY BEHIND
            <br />
            THE EDIT
          </h2>
          <p className="about-reveal text-white/70 text-base md:text-lg leading-relaxed mb-5 max-w-lg">
            I&rsquo;m a travel video editor and colorist who believes great
            editing is more than cutting clips.
          </p>
          <p className="about-reveal text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
            It&rsquo;s about rhythm, emotion, atmosphere and knowing exactly
            when a moment should breathe &mdash; across travel editing, color
            grading, social media content and storytelling.
          </p>

          <div className="about-reveal flex flex-wrap gap-10">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl text-gold mb-1">{stat.value}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-image relative aspect-[4/5] max-w-md mx-auto w-full border border-white/10 overflow-hidden">
          <Image
            src="/images/profile.jpg"
            alt="Shubham — Travel Video Editor & Colorist"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 448px"
            priority={false}
          />
          {/* Subtle dark gradient overlay at bottom for style */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-gold/40 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
