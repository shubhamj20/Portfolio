"use client";

import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { InstagramIcon, YoutubeIcon } from "@/components/icons/SocialIcons";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink pt-16 pb-8">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid md:grid-cols-3 gap-10 mb-14">
          <div>
            <p className="font-display text-2xl tracking-wider mb-4">
              TRAVEL <span className="text-gold">STORIES</span>
            </p>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Turning journeys into cinematic stories that inspire and
              connect.
            </p>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4">
              Navigate
            </p>
            <ul className="space-y-2">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4">
              Connect
            </p>
            <div className="flex items-center gap-5">
              <a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-white/60 hover:text-gold transition-colors">
                <InstagramIcon size={18} />
              </a>
              <a href={siteConfig.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="text-white/60 hover:text-gold transition-colors">
                <YoutubeIcon size={18} />
              </a>
              <a href={`mailto:${siteConfig.email}`} aria-label="Email" className="text-white/60 hover:text-gold transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="divider-gold mb-8" />

        <p className="text-center text-white/30 text-xs">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
