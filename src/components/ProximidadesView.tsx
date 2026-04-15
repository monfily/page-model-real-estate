"use client";

import { useState, useRef, useEffect, useCallback, lazy, Suspense } from "react";
import {
  Trees,
  Bus,
  ShoppingCart,
  UtensilsCrossed,
  Pill,
  Dumbbell,
  GraduationCap,
  HeartPulse,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const LeafletMap = lazy(() =>
  import("./LeafletMap").then((m) => ({ default: m.LeafletMap }))
);

type MarkerEntry = { lat: number; lon: number; label: string };

type Category = {
  id: string;
  label: string;
  fallbackLabel: string;
  Icon: LucideIcon;
  color: string;
  markerIconSvg: string;
  overpassTags: string[];
};

const mkSvg = (paths: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">${paths}</svg>`;

const MARKER_ICONS = {
  tree:       mkSvg('<path d="M12 2L3 18h18z"/><line x1="12" y1="18" x2="12" y2="22"/>'),
  bus:        mkSvg('<rect x="2" y="3" width="20" height="15" rx="2"/><path d="M2 9h20M8 19v-1m8 1v-1M8 3v6m8-6v6"/>'),
  cart:       mkSvg('<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18m-5 4a4 4 0 01-8 0"/>'),
  fork:       mkSvg('<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2m-4 9v11m9-20v20m0-10h-3"/>'),
  pill:       mkSvg('<path d="M12 5v14m-7-7h14"/>'),
  dumbbell:   mkSvg('<path d="M6 5h2v14H6z M16 5h2v14h-2z M8 12h8"/>'),
  graduation: mkSvg('<path d="M22 10v6M2 10l10-5 10 5-10 5zm4 2v5c3 3 9 3 12 0v-5"/>'),
  heart:      mkSvg('<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2C10.5 3.5 9.3 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/><path d="M4 12h4l2-4 2 5 2-3h4"/>'),
};

const CATEGORIES: Category[] = [
  {
    id: "parques",
    label: "Parques/Áreas verdes",
    fallbackLabel: "Parque",
    Icon: Trees,
    color: "#16a34a",
    markerIconSvg: MARKER_ICONS.tree,
    overpassTags: ['["leisure"="park"]', '["leisure"="garden"]', '["landuse"="recreation_ground"]'],
  },
  {
    id: "transporte",
    label: "Transporte",
    fallbackLabel: "Ponto de ônibus",
    Icon: Bus,
    color: "#2563eb",
    markerIconSvg: MARKER_ICONS.bus,
    overpassTags: ['["highway"="bus_stop"]', '["public_transport"="stop_position"]', '["amenity"="bus_station"]'],
  },
  {
    id: "mercados",
    label: "Mercados/Conveniências",
    fallbackLabel: "Supermercado",
    Icon: ShoppingCart,
    color: "#d97706",
    markerIconSvg: MARKER_ICONS.cart,
    overpassTags: ['["shop"="supermarket"]', '["shop"="convenience"]', '["shop"="grocery"]'],
  },
  {
    id: "alimentacao",
    label: "Alimentação",
    fallbackLabel: "Restaurante",
    Icon: UtensilsCrossed,
    color: "#ea580c",
    markerIconSvg: MARKER_ICONS.fork,
    overpassTags: ['["amenity"="restaurant"]', '["amenity"="fast_food"]', '["amenity"="cafe"]'],
  },
  {
    id: "farmacias",
    label: "Farmácias",
    fallbackLabel: "Farmácia",
    Icon: Pill,
    color: "#059669",
    markerIconSvg: MARKER_ICONS.pill,
    overpassTags: ['["amenity"="pharmacy"]', '["healthcare"="pharmacy"]'],
  },
  {
    id: "academias",
    label: "Academias",
    fallbackLabel: "Academia",
    Icon: Dumbbell,
    color: "#7c3aed",
    markerIconSvg: MARKER_ICONS.dumbbell,
    overpassTags: ['["leisure"="fitness_centre"]', '["leisure"="sports_centre"]'],
  },
  {
    id: "escolas",
    label: "Escolas",
    fallbackLabel: "Escola",
    Icon: GraduationCap,
    color: "#0891b2",
    markerIconSvg: MARKER_ICONS.graduation,
    overpassTags: ['["amenity"="school"]', '["amenity"="university"]', '["amenity"="college"]'],
  },
  {
    id: "hospitais",
    label: "Hospitais",
    fallbackLabel: "Hospital",
    Icon: HeartPulse,
    color: "#dc2626",
    markerIconSvg: MARKER_ICONS.heart,
    overpassTags: ['["amenity"="hospital"]', '["amenity"="clinic"]', '["healthcare"="hospital"]'],
  },
];

function buildOverpassQuery(tags: string[], lat: number, lon: number, radius = 2500): string {
  const parts = tags.flatMap((tag) => [
    `node${tag}(around:${radius},${lat},${lon});`,
    `way${tag}(around:${radius},${lat},${lon});`,
    `relation${tag}(around:${radius},${lat},${lon});`,
  ]);
  return `[out:json][timeout:25];\n(\n${parts.join("\n")}\n);\nout center 12;`;
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

interface ProximidadesViewProps {
  lat: number;
  lon: number;
}

export function ProximidadesView({ lat, lon }: ProximidadesViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>("hospitais");
  const [markers, setMarkers] = useState<MarkerEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Ref-based cache: no re-renders, no dependency-array issues
  const cacheRef = useRef<Record<string, MarkerEntry[]>>({});
  const abortRef = useRef<AbortController | null>(null);

  const pillsRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStart = useRef(0);

  const fetchCategory = useCallback(
    async (categoryId: string) => {
      // Return cached result immediately
      if (cacheRef.current[categoryId] !== undefined) {
        setMarkers(cacheRef.current[categoryId]);
        setLoading(false);
        setError(false);
        return;
      }

      // Cancel any previous in-flight request
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      const signal = abortRef.current.signal;

      const cat = CATEGORIES.find((c) => c.id === categoryId)!;
      setLoading(true);
      setError(false);
      setMarkers([]);

      const query = buildOverpassQuery(cat.overpassTags, lat, lon);
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

      try {
        const res = await fetch(url, { signal });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();

        const seen = new Set<string>();
        const result: MarkerEntry[] = [];
        let fallbackIdx = 1;

        for (const el of data.elements ?? []) {
          const elLat: number | undefined = el.lat ?? el.center?.lat;
          const elLon: number | undefined = el.lon ?? el.center?.lon;
          if (!elLat || !elLon) continue;

          const key = `${elLat.toFixed(4)},${elLon.toFixed(4)}`;
          if (seen.has(key)) continue;
          seen.add(key);

          const name: string =
            el.tags?.name ||
            el.tags?.["name:pt"] ||
            el.tags?.["ref"] ||
            `${cat.fallbackLabel} ${fallbackIdx++}`;

          result.push({ lat: elLat, lon: elLon, label: name });
          if (result.length >= 10) break;
        }

        // Sort by distance from property
        result.sort(
          (a, b) =>
            haversineKm(lat, lon, a.lat, a.lon) -
            haversineKm(lat, lon, b.lat, b.lon)
        );

        cacheRef.current[categoryId] = result;

        if (!signal.aborted) {
          setMarkers(result);
          setLoading(false);
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        cacheRef.current[categoryId] = [];
        setError(true);
        setLoading(false);
      }
    },
    [lat, lon]
  );

  // Fetch whenever active category changes
  useEffect(() => {
    fetchCategory(activeCategory);
  }, [activeCategory, fetchCategory]);

  // Cleanup abort on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!pillsRef.current) return;
    isDragging.current = true;
    dragStartX.current = e.pageX;
    scrollStart.current = pillsRef.current.scrollLeft;
    pillsRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !pillsRef.current) return;
    e.preventDefault();
    pillsRef.current.scrollLeft = scrollStart.current - (e.pageX - dragStartX.current);
  };
  const stopDrag = () => {
    isDragging.current = false;
    if (pillsRef.current) pillsRef.current.style.cursor = "grab";
  };

  const selected = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 px-4 py-3 border-b border-[#e7e6e6] bg-white">
        <div
          ref={pillsRef}
          className="flex gap-2 overflow-x-auto pb-1 select-none"
          style={{ cursor: "grab", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] font-semibold whitespace-nowrap transition-all shrink-0 focus:outline-none ${
                  isActive
                    ? "border-[#eb0027] bg-[#eb0027] text-white shadow-sm"
                    : "border-[#ddd] bg-white text-[#323131] hover:border-[#717169]"
                }`}
              >
                <cat.Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2.2} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 pointer-events-none">
            <div className="flex flex-col items-center gap-2">
              <div className="w-7 h-7 border-[3px] border-[#eb0027] border-t-transparent rounded-full animate-spin" />
              <span className="text-[13px] text-[#717169] font-medium">Buscando lugares próximos…</span>
            </div>
          </div>
        )}

        {/* Error overlay */}
        {!loading && error && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/90">
            <div className="flex flex-col items-center gap-3">
              <span className="text-[13px] text-[#717169] text-center px-6">
                Não foi possível carregar os dados. Verifique a conexão e tente novamente.
              </span>
              <button
                onClick={() => {
                  delete cacheRef.current[activeCategory];
                  fetchCategory(activeCategory);
                }}
                className="px-4 py-1.5 rounded-full bg-[#eb0027] text-white text-[13px] font-semibold hover:bg-[#c90022] transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && markers.length === 0 && cacheRef.current[activeCategory] !== undefined && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/90 pointer-events-none">
            <span className="text-[13px] text-[#717169]">Nenhum resultado encontrado nas proximidades.</span>
          </div>
        )}

        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-[#f0f4f8]">
              <div className="text-[14px] text-[#717169] font-medium">Carregando mapa…</div>
            </div>
          }
        >
          <LeafletMap
            key={`${activeCategory}-${lat}-${lon}`}
            lat={lat}
            lon={lon}
            zoom={14}
            markers={markers}
            markerColor={selected.color}
            markerIconSvg={selected.markerIconSvg}
          />
        </Suspense>
      </div>
    </div>
  );
}
