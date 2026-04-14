"use client";

import { useState, useRef, lazy, Suspense } from "react";
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
  Icon: LucideIcon;
  color: string;
  markerIconSvg: string;
  markers: MarkerEntry[];
};

// Inline SVG strings for Leaflet marker icons (stroke="white", 14×14 render)
const mkSvg = (paths: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">${paths}</svg>`;

const MARKER_ICONS = {
  tree:  mkSvg('<path d="M12 2L3 18h18z"/><line x1="12" y1="18" x2="12" y2="22"/>'),
  bus:   mkSvg('<rect x="2" y="3" width="20" height="15" rx="2"/><path d="M2 9h20M8 19v-1m8 1v-1M8 3v6m8-6v6"/>'),
  cart:  mkSvg('<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18m-5 4a4 4 0 01-8 0"/>'),
  fork:  mkSvg('<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2m-4 9v11m9-20v20m0-10h-3"/>'),
  pill:  mkSvg('<path d="M12 5v14m-7-7h14"/>'),
  dumbbell: mkSvg('<path d="M6 5h2v14H6z M16 5h2v14h-2z M8 12h8"/>'),
  graduation: mkSvg('<path d="M22 10v6M2 10l10-5 10 5-10 5zm4 2v5c3 3 9 3 12 0v-5"/>'),
  heart: mkSvg('<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2C10.5 3.5 9.3 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/><path d="M4 12h4l2-4 2 5 2-3h4"/>'),
};

const CATEGORIES: Category[] = [
  {
    id: "parques",
    label: "Parques/Áreas verdes",
    Icon: Trees,
    color: "#16a34a",
    markerIconSvg: MARKER_ICONS.tree,
    markers: [
      { lat: -27.6030, lon: -48.5082, label: "Parque Ecológico do Córrego Grande" },
      { lat: -27.5902, lon: -48.5285, label: "Parque do Córrego dos Cardosos" },
      { lat: -27.5774, lon: -48.5524, label: "Parque da Luz – Beira Mar" },
      { lat: -27.6143, lon: -48.5395, label: "Parque do Saco dos Limões" },
      { lat: -27.5918, lon: -48.5482, label: "Praça da Bandeira" },
      { lat: -27.5783, lon: -48.5432, label: "Praça Gov. Celso Ramos" },
    ],
  },
  {
    id: "transporte",
    label: "Transporte",
    Icon: Bus,
    color: "#2563eb",
    markerIconSvg: MARKER_ICONS.bus,
    markers: [
      { lat: -27.5917, lon: -48.5527, label: "TICEN – Terminal Centro" },
      { lat: -27.5990, lon: -48.5198, label: "TITRI – Terminal Trindade" },
      { lat: -27.5792, lon: -48.5408, label: "Parada Agronômica" },
      { lat: -27.5960, lon: -48.5478, label: "Terminal Rita Maria" },
      { lat: -27.5840, lon: -48.5450, label: "Ponto – Av. Mauro Ramos" },
      { lat: -27.5861, lon: -48.5510, label: "Ponto – Rua Irmã Benwarda" },
      { lat: -27.5750, lon: -48.5530, label: "Ponto – Av. Beira Mar Norte" },
    ],
  },
  {
    id: "mercados",
    label: "Mercados/Conveniências",
    Icon: ShoppingCart,
    color: "#d97706",
    markerIconSvg: MARKER_ICONS.cart,
    markers: [
      { lat: -27.5993, lon: -48.5198, label: "Bistek Supermercados – Trindade" },
      { lat: -27.5751, lon: -48.5516, label: "Carrefour – Beira Mar Norte" },
      { lat: -27.5750, lon: -48.5480, label: "Supermercado Comper – Centro" },
      { lat: -27.5820, lon: -48.5350, label: "Boa Safra Atacadista" },
      { lat: -27.5940, lon: -48.5430, label: "Mercado Extra – Saco dos Limões" },
      { lat: -27.5870, lon: -48.5360, label: "Hortifruti São Jorge" },
    ],
  },
  {
    id: "alimentacao",
    label: "Alimentação",
    Icon: UtensilsCrossed,
    color: "#ea580c",
    markerIconSvg: MARKER_ICONS.fork,
    markers: [
      { lat: -27.5748, lon: -48.5527, label: "McDonald's Beira Mar Norte" },
      { lat: -27.5917, lon: -48.5490, label: "Bob's – Praça XV" },
      { lat: -27.5830, lon: -48.5380, label: "Padaria Tropical – Agronômica" },
      { lat: -27.5760, lon: -48.5490, label: "Restaurante Ilha Natural" },
      { lat: -27.5990, lon: -48.5190, label: "Bandejão UFSC" },
      { lat: -27.5875, lon: -48.5450, label: "Restaurante Central – Centro" },
      { lat: -27.5800, lon: -48.5420, label: "Café Colonial" },
    ],
  },
  {
    id: "farmacias",
    label: "Farmácias",
    Icon: Pill,
    color: "#059669",
    markerIconSvg: MARKER_ICONS.pill,
    markers: [
      { lat: -27.5917, lon: -48.5490, label: "Farmácia Catarinense – Centro" },
      { lat: -27.5748, lon: -48.5530, label: "Drogasil – Beira Mar Norte" },
      { lat: -27.5993, lon: -48.5200, label: "Ultrafarma – Trindade" },
      { lat: -27.5877, lon: -48.5440, label: "Farmácias São João" },
      { lat: -27.5790, lon: -48.5400, label: "Farmácia Popular – Agronômica" },
      { lat: -27.5860, lon: -48.5510, label: "DrogaRaia – Centro" },
    ],
  },
  {
    id: "academias",
    label: "Academias",
    Icon: Dumbbell,
    color: "#7c3aed",
    markerIconSvg: MARKER_ICONS.dumbbell,
    markers: [
      { lat: -27.5742, lon: -48.5530, label: "Smart Fit – Beira Mar Norte" },
      { lat: -27.5880, lon: -48.5440, label: "L7 Academia – Centro" },
      { lat: -27.5992, lon: -48.5195, label: "Academia Total – Trindade" },
      { lat: -27.5820, lon: -48.5380, label: "CrossFit Floripa" },
      { lat: -27.5760, lon: -48.5460, label: "Bio Ritmo – Agronômica" },
    ],
  },
  {
    id: "escolas",
    label: "Escolas",
    Icon: GraduationCap,
    color: "#0891b2",
    markerIconSvg: MARKER_ICONS.graduation,
    markers: [
      { lat: -27.5991, lon: -48.5190, label: "UFSC – Campus Trindade" },
      { lat: -27.5830, lon: -48.5350, label: "E.E.B. Beatriz de Souza Brito" },
      { lat: -27.5840, lon: -48.5430, label: "CEJA – Centro Educação de Jovens" },
      { lat: -27.5763, lon: -48.5497, label: "IFSC – Instituto Federal SC" },
      { lat: -27.5870, lon: -48.5480, label: "Colégio Catarinense" },
      { lat: -27.5940, lon: -48.5320, label: "E.E.B. Lauro Müller" },
    ],
  },
  {
    id: "hospitais",
    label: "Hospitais",
    Icon: HeartPulse,
    color: "#dc2626",
    markerIconSvg: MARKER_ICONS.heart,
    markers: [
      { lat: -27.5761, lon: -48.5524, label: "Hospital de Caridade" },
      { lat: -27.5877, lon: -48.5510, label: "Hospital Celso Ramos" },
      { lat: -27.5899, lon: -48.5438, label: "Hospital Infantil Joana de Gusmão" },
      { lat: -27.5784, lon: -48.5452, label: "Maternidade Carmela Dutra" },
      { lat: -27.5989, lon: -48.5190, label: "Hospital Universitário – HU/UFSC" },
      { lat: -27.5940, lon: -48.5620, label: "Hospital Regional de São José" },
      { lat: -27.5258, lon: -48.5254, label: "UPA Norte da Ilha" },
    ],
  },
];

interface ProximidadesViewProps {
  lat: number;
  lon: number;
}

export function ProximidadesView({ lat, lon }: ProximidadesViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>("hospitais");

  const pillsRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStart = useRef(0);

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
      {/* Category pills – draggable horizontally on desktop & touch-scrollable on mobile */}
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

      {/* Map */}
      <div className="flex-1 relative">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-[#f0f4f8]">
              <div className="text-[14px] text-[#717169] font-medium">Carregando mapa...</div>
            </div>
          }
        >
          <LeafletMap
            key={activeCategory}
            lat={lat}
            lon={lon}
            zoom={14}
            markers={selected.markers}
            markerColor={selected.color}
            markerIconSvg={selected.markerIconSvg}
          />
        </Suspense>
      </div>
    </div>
  );
}
