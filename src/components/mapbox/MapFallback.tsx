"use client";

import { destinations } from "@/data/destinations";

// Static fallback shown when the Mapbox token is missing or WebGL is
// unavailable. Uses a simple equirectangular projection of the real
// destination coordinates over a stylized India silhouette image-free
// placeholder, so the layout never breaks even without the live map.
export default function MapFallback() {
  const lons = destinations.map((d) => d.position[0]);
  const lats = destinations.map((d) => d.position[1]);
  const minLon = Math.min(...lons) - 3;
  const maxLon = Math.max(...lons) + 3;
  const minLat = Math.min(...lats) - 3;
  const maxLat = Math.max(...lats) + 3;

  const project = ([lon, lat]: [number, number]) => {
    const x = ((lon - minLon) / (maxLon - minLon)) * 100;
    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
    return { x, y };
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-ink-2">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 60% 45%, rgba(224,165,75,0.14) 0%, transparent 70%)",
        }}
      />
      <div className="relative w-full h-full max-w-[560px] max-h-[560px]">
        {destinations.map((d) => {
          const { x, y } = project(d.position);
          return (
            <div
              key={d.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: d.color, boxShadow: `0 0 12px ${d.color}` }}
              />
              <span className="text-[9px] tracking-[0.15em] uppercase text-white/70 whitespace-nowrap">
                {d.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
