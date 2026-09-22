"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { clientTypes } from "@/data/tools";
import { gsap, registerGsap } from "@/lib/animations";

export default function ClientTypes() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".client-block",
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
    <section ref={sectionRef} className="relative py-28 md:py-36 bg-ink-2">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="section-eyebrow mb-4">07 — Who I Work With</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95]">
            WHO I WORK WITH
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {clientTypes.map((client) => (
            <a
              key={client.id}
              href="#contact"
              className="client-block group relative border border-white/10 p-7 hover:border-gold/50 transition-colors duration-500 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <h3 className="font-display text-2xl mb-3 leading-none">{client.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{client.description}</p>
              </div>
              <div className="flex items-center gap-2 text-gold text-xs tracking-[0.2em] uppercase mt-6">
                {client.cta}
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
