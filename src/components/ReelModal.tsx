"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { Reel } from "@/data/reels";

type Props = {
  reel: Reel | null;
  onClose: () => void;
};

export default function ReelModal({ reel, onClose }: Props) {
  useEffect(() => {
    if (!reel) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [reel, onClose]);

  if (!reel) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-md animate-[fadeIn_0.3s_ease]"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-colors z-10"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      <div
        className="relative w-full max-w-4xl aspect-video bg-charcoal border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          key={reel.videoUrl}
          className="w-full h-full object-cover"
          controls
          autoPlay
          playsInline
          poster={reel.thumbnail}
        >
          <source src={reel.videoUrl} type="video/mp4" />
        </video>

        <div className="absolute -bottom-14 left-0 right-0 flex items-center justify-between text-white/70 px-1">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-1">
              {reel.destination}
            </p>
            <h3 className="font-display text-xl leading-none">{reel.title}</h3>
          </div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/50 hidden sm:block">
            {reel.techniques.join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
}
