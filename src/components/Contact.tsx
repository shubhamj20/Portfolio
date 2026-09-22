"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { InstagramIcon, WhatsappIcon } from "@/components/icons/SocialIcons";
// import { YoutubeIcon } from "@/components/icons/SocialIcons"; // YouTube — hidden for now
import { gsap, registerGsap } from "@/lib/animations";

const PROJECT_TYPES = [
  "Instagram Reels",
  // "YouTube Video", // YouTube — hidden for now
  "Travel Video",
  "Color Grading",
  "Social Media Editing",
  "Brand Video",
  "Other",
];

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setForm({ name: "", email: "", projectType: "", budget: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-28 md:py-36 bg-ink-2">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 grid lg:grid-cols-[1fr_1.2fr] gap-14">
        {/* Left: info */}
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
            {/* YouTube — hidden for now
            <a
              href={siteConfig.youtube}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors"
            >
              <YoutubeIcon size={18} /> {siteConfig.youtubeHandle}
            </a>
            */}
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

        {/* Right: form */}
        <form onSubmit={handleSubmit} className="contact-reveal space-y-5">

          {/* Success banner */}
          {status === "success" && (
            <div className="flex items-start gap-3 border border-gold/40 bg-gold/10 px-5 py-4 animate-[fadeIn_0.4s_ease]">
              <CheckCircle size={18} className="text-gold mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gold text-sm font-medium">Message sent!</p>
                <p className="text-white/60 text-xs mt-0.5">
                  Thanks — I&rsquo;ll get back to you at <span className="text-gold">{form.email || "your email"}</span> soon.
                </p>
              </div>
            </div>
          )}

          {/* Error banner */}
          {status === "error" && (
            <div className="flex items-start gap-3 border border-red-500/40 bg-red-500/10 px-5 py-4 animate-[fadeIn_0.4s_ease]">
              <AlertCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-400 text-sm font-medium">Failed to send</p>
                <p className="text-white/60 text-xs mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                Name <span className="text-gold">*</span>
              </label>
              <input
                required
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/15 px-4 py-3 text-sm focus:border-gold outline-none transition-colors placeholder:text-white/25"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                Email <span className="text-gold">*</span>
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/15 px-4 py-3 text-sm focus:border-gold outline-none transition-colors placeholder:text-white/25"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                Project Type <span className="text-gold">*</span>
              </label>
              <select
                required
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
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
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/15 px-4 py-3 text-sm focus:border-gold outline-none transition-colors placeholder:text-white/25"
                placeholder="Approximate budget"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
              Message <span className="text-gold">*</span>
            </label>
            <textarea
              required
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/15 px-4 py-3 text-sm focus:border-gold outline-none transition-colors resize-none placeholder:text-white/25"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="group inline-flex items-center gap-2 bg-white text-ink px-8 py-3.5 text-sm tracking-[0.15em] uppercase font-medium hover:bg-gold transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send Project
                <Send size={15} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
