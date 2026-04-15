"use client";

import { useEffect, useRef } from "react";

type Marker = { lat: number; lon: number; label?: string };

interface LeafletMapProps {
  lat: number;
  lon: number;
  zoom?: number;
  markers?: Marker[];
  markerColor?: string;
  markerIconSvg?: string;
  scrollWheelZoom?: boolean;
}

export function LeafletMap({
  lat,
  lon,
  zoom = 15,
  markers = [],
  markerColor = "#eb0027",
  markerIconSvg,
  scrollWheelZoom = false,
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let L: typeof import("leaflet");

    const init = async () => {
      const leaflet = await import("leaflet");
      L = leaflet.default ?? leaflet;

      const container = containerRef.current!;
      // @ts-expect-error – clear leaflet internal id to prevent "already initialized" error on HMR
      if (container._leaflet_id) delete container._leaflet_id;

      // @ts-expect-error – private property
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(container, {
        zoomControl: true,
        scrollWheelZoom,
        dragging: true,
        touchZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
      }).setView([lat, lon], zoom);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const homeIcon = L.divIcon({
        html: `<div style="
            background:#7c3aed;width:34px;height:34px;
            border-radius:50% 50% 50% 0;transform:rotate(-45deg);
            display:flex;align-items:center;justify-content:center;
            box-shadow:0 3px 8px rgba(0,0,0,0.35);border:2.5px solid white;">
            <svg viewBox="0 0 24 24" fill="white" width="15" height="15"
              style="transform:rotate(45deg)">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </div>`,
        className: "",
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -36],
      });
      L.marker([lat, lon], { icon: homeIcon }).addTo(map).bindPopup("<b>Imóvel</b>");

      const iconBody = markerIconSvg ?? `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" width="14" height="14"><circle cx="12" cy="12" r="5"/></svg>`;

      markers.forEach((m) => {
        const icon = L.divIcon({
          html: `<div style="
              background:${markerColor};width:30px;height:30px;
              border-radius:50% 50% 50% 0;transform:rotate(-45deg);
              display:flex;align-items:center;justify-content:center;
              box-shadow:0 2px 6px rgba(0,0,0,0.3);border:2px solid white;">
              <span style="transform:rotate(45deg);display:flex;align-items:center;justify-content:center;">
                ${iconBody}
              </span>
            </div>`,
          className: "",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -32],
        });

        L.marker([m.lat, m.lon], { icon })
          .addTo(map)
          .bindPopup(`<span style="font-size:13px;font-weight:600;color:#323131">${m.label ?? ""}</span>`);
      });
    };

    init();

    return () => {
      if (mapRef.current) {
        (mapRef.current as { remove: () => void }).remove();
        mapRef.current = null;
      }
    };
  }, [lat, lon, zoom, markers, markerColor, markerIconSvg, scrollWheelZoom]);

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossOrigin="" />
      <div ref={containerRef} className="w-full h-full" />
    </>
  );
}
