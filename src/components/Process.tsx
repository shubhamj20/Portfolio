"use client";

import { useEffect, useRef } from "react";
import { processSteps } from "@/data/tools";
import { gsap, registerGsap } from "@/lib/animations";

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-step",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(
        ".process-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative py-28 md:py-36 bg-ink">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16 max-w-2xl">
          <p className="section-eyebrow mb-4">08 — Process</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95]">PROCESS</h2>
        </div>

        <div className="relative">
          <div className="process-line hidden md:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-gold-dim via-gold to-gold-dim origin-left" />
          <div className="grid md:grid-cols-5 gap-10 md:gap-4">
            {processSteps.map((step) => (
              <div key={step.step} className="process-step relative">
                <div className="hidden md:block w-3 h-3 rounded-full bg-gold mb-6 relative z-10" />
                <p className="font-display text-5xl text-white/15 mb-2">{step.step}</p>
                <h3 className="text-sm tracking-[0.15em] uppercase text-white">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
