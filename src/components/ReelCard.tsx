"use client";

import { Play } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import type { Reel } from "@/data/reels";

type Props = {
  reel: Reel;
  onPlay: (reel: Reel) => void;
};

export default function ReelCard({ reel, onPlay }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);
  const [videoSrc, setVideoSrc] = useState<string>("");
  const [isHovering, setIsHovering] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Lazy-load: assign src only once the card is visible on screen
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVideoSrc(reel.videoUrl);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [reel.videoUrl]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current && videoSrc) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setVideoReady(false);
    }
  };

  return (
    <button
      ref={cardRef}
      onClick={() => onPlay(reel)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="reel-card group relative w-full aspect-[4/5] overflow-hidden border border-white/10 hover:border-gold/50 transition-colors duration-500 text-left bg-charcoal"
    >
      {/* Poster image — shown immediately from the JPG extracted by FFmpeg */}
      {reel.thumbnail && (
        <Image
          src={reel.thumbnail}
          alt={reel.title}
          fill
          className={`object-cover transition-opacity duration-500 ${
            videoReady && isHovering ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
        />
      )}

      {/* Video — lazy loaded, fades in over poster on hover */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="none"
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            videoReady && isHovering ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      <div
        className={`absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent transition-opacity duration-500 ${
          isHovering ? "opacity-75" : "opacity-90"
        }`}
      />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-sm bg-black/30 group-hover:bg-gold group-hover:border-gold group-hover:text-ink group-hover:scale-110 transition-all duration-300">
          <Play size={18} className="fill-current translate-x-[2px]" />
        </div>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-1">
          {reel.destination}
        </p>
        <h3 className="font-display text-xl mb-2 leading-none">{reel.title}</h3>
        <p className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1">
          {reel.projectType}
        </p>
        <p className="text-[10px] text-white/40">{reel.techniques.join(" · ")}</p>
      </div>
    </button>
  );
}


