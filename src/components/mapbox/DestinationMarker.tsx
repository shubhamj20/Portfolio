"use client";

import { createPortal } from "react-dom";
import type mapboxgl from "mapbox-gl";
import type { Destination } from "@/data/destinations";

type Props = {
  destination: Destination;
  marker?: mapboxgl.Marker;
  isActive: boolean;
  onSelect: (id: string | null) => void;
  showCard: boolean;
};

export default function DestinationMarker({
  destination,
  marker,
  isActive,
  onSelect,
  showCard,
}: Props) {
  if (!marker) return null;
  const el = marker.getElement();

  return createPortal(
    <button
      onClick={(e) => {
        e.stopPropagation();
        onSelect(isActive ? null : destination.id);
      }}
      className="group flex flex-col items-center cursor-pointer select-none -translate-y-2"
    >
      {showCard && (
        <>
          {/* vertical light beam */}
          <div
            className="w-px h-6 mb-0.5 opacity-40 group-hover:opacity-70 transition-opacity"
            style={{
              background: `linear-gradient(to top, ${destination.color}, transparent)`,
            }}
          />
          {/* floating cinematic frame card */}
          <div
            className={`w-[58px] h-[38px] sm:w-[68px] sm:h-[44px] border overflow-hidden relative shadow-[0_8px_20px_rgba(0,0,0,0.55)] transition-all duration-300 ${
              isActive ? "border-gold scale-110" : "border-white/25 group-hover:border-gold/60 group-hover:scale-105"
            }`}
            style={{
              background: `linear-gradient(150deg, ${destination.color}cc 0%, ${destination.color}55 55%, #0a0d16 100%)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            {isActive && <div className="absolute inset-0 ring-1 ring-gold/70" />}
          </div>
          <div
            className={`mt-1 px-1.5 py-0.5 text-[8px] sm:text-[9px] tracking-[0.18em] uppercase whitespace-nowrap transition-colors duration-300 ${
              isActive ? "text-gold" : "text-white/80 group-hover:text-gold"
            }`}
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}
          >
            {destination.name}
          </div>
        </>
      )}
      {/* pulsing ground pin — always visible, even at globe-wide zoom */}
      <span className="relative flex h-2.5 w-2.5 mt-1">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
          style={{ backgroundColor: isActive ? "#f2c879" : destination.color }}
        />
        <span
          className="relative inline-flex rounded-full h-2.5 w-2.5"
          style={{ backgroundColor: isActive ? "#f2c879" : destination.color }}
        />
      </span>
    </button>,
    el
  );
}
