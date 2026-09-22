"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { destinations, delhiPosition, journeyRoute, INDIA_CENTER } from "@/data/destinations";
import DestinationMarker from "./DestinationMarker";
import MapFallback from "./MapFallback";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type Props = {
  activeId: string | null;
  onSelect: (id: string | null) => void;
};

function buildRouteCoordinates(): [number, number][] {
  return journeyRoute.map((id) => {
    if (id === "delhi") return delhiPosition;
    const d = destinations.find((dest) => dest.id === id);
    return d ? d.position : delhiPosition;
  });
}

// Linear interpolation between consecutive route points, dense enough
// for a smooth-looking line and airplane motion along it.
function densifyRoute(points: [number, number][], perSegment = 40): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [lng1, lat1] = points[i];
    const [lng2, lat2] = points[i + 1];
    for (let s = 0; s < perSegment; s++) {
      const t = s / perSegment;
      out.push([lng1 + (lng2 - lng1) * t, lat1 + (lat2 - lat1) * t]);
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

const GLOBE_ZOOM = 2.5; // close enough that the globe fills most of the frame
const DESTINATION_ZOOM = 6.4;
const ROTATION_DEG_PER_SEC = 4; // gentle continuous spin
const RESUME_ROTATION_DELAY_MS = 4000; // idle time after interaction before spin resumes

export default function IndiaMapbox({ activeId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const planeMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [markers, setMarkers] = useState<Record<string, mapboxgl.Marker>>({});
  const [zoomLevel, setZoomLevel] = useState(GLOBE_ZOOM);
  const tokenMissing = !MAPBOX_TOKEN;
  const routeCoords = useRef<[number, number][]>(densifyRoute(buildRouteCoordinates()));

  const rotationEnabledRef = useRef(true); // false whenever a destination is active
  const rotationPausedRef = useRef(true); // starts true: held off until the entrance flyTo finishes
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const entranceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flyToDestination = useCallback((id: string | null) => {
    const map = mapRef.current;
    if (!map) return;
    if (!id) {
      rotationEnabledRef.current = true;
      map.flyTo({
        center: map.getCenter(),
        zoom: GLOBE_ZOOM,
        pitch: 0,
        bearing: 0,
        duration: 1800,
        essential: true,
      });
      return;
    }
    rotationEnabledRef.current = false;
    const dest = destinations.find((d) => d.id === id);
    if (!dest) return;
    map.flyTo({
      center: dest.position,
      zoom: DESTINATION_ZOOM,
      pitch: 0,
      bearing: 0,
      duration: 1800,
      essential: true,
    });
  }, []);

  useEffect(() => {
    if (!MAPBOX_TOKEN) return;
    if (!containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      projection: "globe",
      // Starts zoomed further out than the resting GLOBE_ZOOM so the
      // "load" handler below can fly the camera in for a cinematic
      // entrance. Bearing is offset so the fly-in reads as motion
      // rather than a static zoom.
      center: INDIA_CENTER,
      zoom: GLOBE_ZOOM - 2.2,
      pitch: 0,
      bearing: 30,
      maxPitch: 85,
      antialias: true,
      attributionControl: false,
      logoPosition: "bottom-left",
      dragRotate: true,
      touchPitch: true,
      pitchWithRotate: true,
    });

    mapRef.current = map;

    // Mapbox measures its container synchronously on construction; if the
    // absolutely-positioned hero layout hasn't finished sizing that
    // container yet (a common Next.js hydration timing issue), the map
    // initializes into a collapsed canvas and never recovers on its own.
    // A ResizeObserver keeps it in sync with the container's real size.
    const resizeObserver = new ResizeObserver(() => {
      map.resize();
    });
    resizeObserver.observe(containerRef.current);
    resizeObserverRef.current = resizeObserver;

    const handleZoom = () => setZoomLevel(map.getZoom());
    map.on("zoom", handleZoom);

    map.on("load", () => {
      // 3D terrain
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.6 });

      // cinematic atmosphere — lighter than a vector-style dark map
      // since satellite imagery already carries real-world tonal depth
      map.setFog({
        color: "rgb(20, 24, 34)",
        "high-color": "rgb(30, 42, 70)",
        "horizon-blend": 0.25,
        "space-color": "rgb(3, 4, 8)",
        "star-intensity": 0.3,
      });

      // subtle hillshade to add extra depth to mountain ranges on top
      // of the real satellite shading (kept light — satellite imagery
      // already shows terrain relief from the source photography)
      map.addSource("mapbox-dem-hillshade", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      if (!map.getLayer("hillshade-cinematic")) {
        map.addLayer({
          id: "hillshade-cinematic",
          type: "hillshade",
          source: "mapbox-dem-hillshade",
          paint: {
            "hillshade-exaggeration": 0.3,
            "hillshade-shadow-color": "#0a0e18",
            "hillshade-highlight-color": "#4a6a8a",
            "hillshade-accent-color": "#0d1420",
          },
        });
      }

      // flight route line source
      map.addSource("flight-route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: [] },
        },
      });
      map.addLayer({
        id: "flight-route-glow",
        type: "line",
        source: "flight-route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#f2c879",
          "line-width": 5,
          "line-opacity": 0.15,
          "line-blur": 3,
        },
      });
      map.addLayer({
        id: "flight-route-line",
        type: "line",
        source: "flight-route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#e0a54b",
          "line-width": 1.5,
          "line-opacity": 0.8,
          "line-dasharray": [2, 2],
        },
      });

      setMapReady(true);

      // cinematic entrance: fly in from the further-out starting view
      // (set in the constructor above) to the resting globe framing.
      // Continuous rotation stays paused until this finishes, so it
      // never fights the entrance animation or overshoots past it.
      map.flyTo({
        center: INDIA_CENTER,
        zoom: GLOBE_ZOOM,
        pitch: 0,
        bearing: 0,
        duration: 3200,
        essential: true,
      });
      const entranceTimer = setTimeout(() => {
        rotationPausedRef.current = false;
      }, 3200);
      entranceTimerRef.current = entranceTimer;
    });

    return () => {
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      if (entranceTimerRef.current) clearTimeout(entranceTimerRef.current);
      map.off("zoom", handleZoom);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Continuous globe rotation: spins the camera around the vertical axis
  // by advancing the center longitude each frame. Pauses on user drag/
  // scroll/touch and resumes a few seconds after the interaction ends,
  // and stays fully off whenever a destination is selected (zoomed in).
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const map = mapRef.current;
    let raf = 0;
    let lastTime: number | null = null;
    let cancelled = false;

    const pause = () => {
      rotationPausedRef.current = true;
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        rotationPausedRef.current = false;
      }, RESUME_ROTATION_DELAY_MS);
    };

    map.on("dragstart", pause);
    map.on("wheel", pause);
    map.on("touchstart", pause);

    const tick = (now: number) => {
      if (cancelled) return;
      if (lastTime === null) lastTime = now;
      const deltaSec = (now - lastTime) / 1000;
      lastTime = now;

      if (rotationEnabledRef.current && !rotationPausedRef.current) {
        const center = map.getCenter();
        center.lng -= ROTATION_DEG_PER_SEC * deltaSec;
        map.setCenter(center);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      map.off("dragstart", pause);
      map.off("wheel", pause);
      map.off("touchstart", pause);
    };
  }, [mapReady]);

  // animate the route drawing in + airplane flight once the map is ready
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const map = mapRef.current;
    let raf = 0;
    let cancelled = false;

    const drawDelayMs = 2600;
    const drawDurationMs = 2600;
    const loopDurationMs = 22000;
    const startTime = performance.now();

    // airplane marker element
    const planeEl = document.createElement("div");
    planeEl.className = "map-plane-marker";
    planeEl.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2 L15 12 L22 15 L15 16 L12 22 L9 16 L2 15 L9 12 Z" fill="#f2c879" stroke="#fff3d6" stroke-width="0.5"/></svg>';
    planeEl.style.opacity = "0";
    planeEl.style.transition = "opacity 0.4s ease";
    planeMarkerRef.current = new mapboxgl.Marker({ element: planeEl, rotationAlignment: "map" })
      .setLngLat(routeCoords.current[0])
      .addTo(map);

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - startTime;
      const source = map.getSource("flight-route") as mapboxgl.GeoJSONSource | undefined;

      const drawProgress = Math.min(1, Math.max(0, (elapsed - drawDelayMs) / drawDurationMs));
      const eased = 1 - Math.pow(1 - drawProgress, 3);
      const visibleCount = Math.max(2, Math.floor(eased * routeCoords.current.length));

      if (source) {
        source.setData({
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: routeCoords.current.slice(0, visibleCount),
          },
        });
      }

      const planeStart = drawDelayMs + drawDurationMs * 0.6;
      if (elapsed > planeStart && planeMarkerRef.current) {
        planeEl.style.opacity = "1";
        const loopElapsed = (elapsed - planeStart) % loopDurationMs;
        const t = loopElapsed / loopDurationMs;
        const idx = t * (routeCoords.current.length - 1);
        const i0 = Math.floor(idx);
        const i1 = Math.min(routeCoords.current.length - 1, i0 + 1);
        const frac = idx - i0;
        const p0 = routeCoords.current[i0];
        const p1 = routeCoords.current[i1];
        const lng = p0[0] + (p1[0] - p0[0]) * frac;
        const lat = p0[1] + (p1[1] - p0[1]) * frac;
        planeMarkerRef.current.setLngLat([lng, lat]);

        const bearing = (Math.atan2(p1[0] - p0[0], p1[1] - p0[1]) * 180) / Math.PI;
        planeEl.style.transform = `rotate(${bearing}deg)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      planeMarkerRef.current?.remove();
      planeMarkerRef.current = null;
    };
  }, [mapReady]);

  // destination markers
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const map = mapRef.current;

    const created: Record<string, mapboxgl.Marker> = {};
    destinations.forEach((dest) => {
      const el = document.createElement("div");
      const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
        .setLngLat(dest.position)
        .addTo(map);
      created[dest.id] = marker;
    });
    setMarkers(created);

    return () => {
      Object.values(created).forEach((m) => m.remove());
      setMarkers({});
    };
  }, [mapReady]);

  // camera reaction to active destination — skipped on the render where
  // mapReady first flips true, since the "load" handler already kicks
  // off the cinematic entrance flyTo; without this guard, this effect
  // fires a second competing flyTo(null) on mount that fights the
  // entrance animation and cancels its in-flight tile requests.
  const skipNextFlyRef = useRef(true);
  useEffect(() => {
    if (!mapReady) return;
    if (skipNextFlyRef.current) {
      skipNextFlyRef.current = false;
      return;
    }
    flyToDestination(activeId);
  }, [activeId, mapReady, flyToDestination]);

  if (tokenMissing) {
    return <MapFallback />;
  }

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="absolute inset-0" />
      {destinations.map((dest) => (
        <DestinationMarker
          key={dest.id}
          destination={dest}
          marker={markers[dest.id]}
          isActive={activeId === dest.id}
          onSelect={onSelect}
          showCard={zoomLevel >= 3.2}
        />
      ))}
    </div>
  );
}
