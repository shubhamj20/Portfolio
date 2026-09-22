"use client";

import { useEffect, useRef } from "react";
import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import { services } from "@/data/services";
import { gsap, registerGsap } from "@/lib/animations";

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-block",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-28 md:py-36 bg-ink-2">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="section-eyebrow mb-4">03 — What I Do</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95]">WHAT I DO</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-white/10">
          {services.map((service) => {
            const Icon = (Icons[service.icon as keyof typeof Icons] ??
              Icons.Sparkles) as ComponentType<LucideProps>;
            return (
              <div
                key={service.id}
                className="service-block group bg-ink-2 p-8 hover:bg-ink-3 transition-colors duration-500"
              >
                <Icon size={28} strokeWidth={1.25} className="text-gold mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-display text-xl mb-3 tracking-wide">{service.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
