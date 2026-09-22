"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, registerGsap } from "@/lib/animations";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
      gsap.to(".cta-plane", {
        x: "60vw",
        y: -30,
        duration: 12,
        repeat: -1,
        ease: "power1.inOut",
        yoyo: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden bg-ink">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(224,165,75,0.12) 0%, transparent 55%), linear-gradient(160deg, #10141f 0%, #05060a 100%)",
        }}
      />
      <div className="cta-plane absolute top-1/3 left-[10%] text-gold/30 text-2xl">✈</div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="cta-reveal section-eyebrow mb-6">Let&rsquo;s Create Together</p>
        <h2 className="cta-reveal font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] mb-8">
          HAVE FOOTAGE WAITING
          <br />
          TO BECOME A <span className="text-gold-gradient">STORY?</span>
        </h2>
        <p className="cta-reveal text-white/60 text-lg mb-10">
          Let&rsquo;s create something cinematic together.
        </p>
        <a
          href="#contact"
          className="cta-reveal group inline-flex items-center gap-3 bg-gold text-ink px-9 py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-gold-2 transition-colors duration-300"
        >
          Let&rsquo;s Work Together
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
