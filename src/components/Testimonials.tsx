"use client";

import { useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/tools";
import { gsap, registerGsap } from "@/lib/animations";

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36 bg-ink">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="section-eyebrow mb-4">10 — Testimonials</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95]">TESTIMONIALS</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="testimonial-card border border-white/10 border-dashed p-7 relative"
            >
              <Quote size={22} className="text-gold/50 mb-4" />
              <p className="text-white/50 italic text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-xs tracking-[0.1em] uppercase text-white/40">{t.name}</p>
              <p className="text-[10px] text-white/30">{t.role}</p>
              {t.placeholder && (
                <span className="absolute top-3 right-3 text-[9px] tracking-[0.2em] uppercase text-white/25">
                  Placeholder
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
