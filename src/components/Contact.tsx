"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Send } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { InstagramIcon, YoutubeIcon, WhatsappIcon } from "@/components/icons/SocialIcons";
import { gsap, registerGsap } from "@/lib/animations";

const PROJECT_TYPES = [
  "Instagram Reels",
  "YouTube Video",
  "Travel Video",
  "Color Grading",
  "Social Media Editing",
  "Brand Video",
  "Other",
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-28 md:py-36 bg-ink-2">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 grid lg:grid-cols-[1fr_1.2fr] gap-14">
        <div>
          <p className="contact-reveal section-eyebrow mb-4">Contact</p>
          <h2 className="contact-reveal font-display text-4xl md:text-6xl leading-[0.95] mb-8">
            LET&rsquo;S WORK
            <br />
            TOGETHER
          </h2>
          <p className="contact-reveal text-white/60 text-base leading-relaxed mb-10 max-w-sm">
            Tell me about your project — footage, timeline and vision — and
            I&rsquo;ll get back to you.
          </p>

          <div className="contact-reveal flex flex-col gap-4">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors"
            >
              <InstagramIcon size={18} /> {siteConfig.instagramHandle}
            </a>
            <a
              href={siteConfig.youtube}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors"
            >
              <YoutubeIcon size={18} /> {siteConfig.youtubeHandle}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors"
            >
              <Mail size={18} /> {siteConfig.email}
            </a>
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors"
            >
              <WhatsappIcon size={18} /> WhatsApp
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-reveal space-y-5">
          {submitted && (
            <div className="border border-gold/40 bg-gold/10 text-gold text-sm px-5 py-3">
              Thanks — your project details have been noted. (Connect this
              form to your backend or a form service to receive submissions.)
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                Name
              </label>
              <input
                required
                type="text"
                className="w-full bg-transparent border border-white/15 px-4 py-3 text-sm focus:border-gold outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                Email
              </label>
              <input
                required
                type="email"
                className="w-full bg-transparent border border-white/15 px-4 py-3 text-sm focus:border-gold outline-none transition-colors"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                Project Type
              </label>
              <select
                required
                defaultValue=""
                className="w-full bg-ink-2 border border-white/15 px-4 py-3 text-sm focus:border-gold outline-none transition-colors"
              >
                <option value="" disabled>
                  Select a type
                </option>
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                Budget
              </label>
              <input
                type="text"
                className="w-full bg-transparent border border-white/15 px-4 py-3 text-sm focus:border-gold outline-none transition-colors"
                placeholder="Approximate budget"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
              Message
            </label>
            <textarea
              required
              rows={5}
              className="w-full bg-transparent border border-white/15 px-4 py-3 text-sm focus:border-gold outline-none transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            className="group inline-flex items-center gap-2 bg-white text-ink px-8 py-3.5 text-sm tracking-[0.15em] uppercase font-medium hover:bg-gold transition-colors duration-300"
          >
            Send Project
            <Send size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </section>
  );
}
