"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { whyWorkWithMe } from "@/data/tools";
import { gsap, registerGsap } from "@/lib/animations";

export default function WhyWorkWithMe() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-point",
        { x: -30, opacity: 0 },
        {
          x: 0,
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
          <p className="section-eyebrow mb-4">06 — Why Work With Me</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95]">
            WHY WORK WITH ME?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
          {whyWorkWithMe.map((point) => (
            <div key={point.id} className="why-point flex items-start gap-4 border-b border-white/10 pb-6">
              <CheckCircle2 size={22} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="font-display text-xl mb-1 tracking-wide">{point.title}</h3>
                <p className="text-sm text-white/60">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
