"use client";

import { useEffect, useState } from "react";
import { Mail, Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { InstagramIcon, YoutubeIcon } from "@/components/icons/SocialIcons";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Tools", href: "#tools" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink/85 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1600px] flex items-center justify-between px-6 md:px-10 h-20">
        <a href="#home" className="font-display text-2xl tracking-wider leading-none">
          TRAVEL
          <br />
          <span className="text-gold">STORIES</span>
        </a>

        <ul className="hidden lg:flex items-center gap-8 text-xs tracking-[0.2em] uppercase text-white/70">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-gold transition-colors duration-300">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-5">
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-white/60 hover:text-gold transition-colors">
            <InstagramIcon size={18} />
          </a>
          <a href={siteConfig.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="text-white/60 hover:text-gold transition-colors">
            <YoutubeIcon size={18} />
          </a>
          <a href={`mailto:${siteConfig.email}`} aria-label="Email" className="text-white/60 hover:text-gold transition-colors">
            <Mail size={18} />
          </a>
          <a
            href="#contact"
            className="ml-2 border border-gold/50 text-gold text-xs tracking-[0.2em] uppercase px-5 py-2.5 hover:bg-gold hover:text-ink transition-all duration-300"
          >
            Let&rsquo;s Work Together
          </a>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-ink/98 backdrop-blur-lg transition-transform duration-500 ease-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-6 px-8 pt-10 text-lg uppercase tracking-[0.15em]">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 border-b border-white/10 hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-6 px-8 pt-8">
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <InstagramIcon size={20} />
          </a>
          <a href={siteConfig.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
            <YoutubeIcon size={20} />
          </a>
          <a href={`mailto:${siteConfig.email}`} aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
        <a
          href="#contact"
          onClick={() => setMobileOpen(false)}
          className="mx-8 mt-8 block text-center border border-gold text-gold text-sm tracking-[0.2em] uppercase px-5 py-3 hover:bg-gold hover:text-ink transition-all"
        >
          Let&rsquo;s Work Together
        </a>
      </div>
    </header>
  );
}
