"use client";

import { useEffect, useRef } from "react";
import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import { tools } from "@/data/tools";
import { gsap, registerGsap } from "@/lib/animations";

export default function Tools() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tool-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="tools" className="relative py-28 md:py-36 bg-ink-2">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="section-eyebrow mb-4">09 — Tools</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] mb-5">TOOLS</h2>
          <p className="text-white/60 text-base leading-relaxed">
            The software behind the workflow.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {tools.map((tool) => {
            const Icon = (Icons[tool.icon as keyof typeof Icons] ??
              Icons.Wrench) as ComponentType<LucideProps>;
            return (
              <div
                key={tool.id}
                className="tool-item flex flex-col items-center justify-center gap-4 border border-white/10 py-10 px-4 hover:border-gold/40 hover:bg-white/[0.02] transition-all duration-300 text-center"
              >
                <Icon size={26} strokeWidth={1.25} className="text-white/70" />
                <p className="text-xs text-white/60">{tool.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
