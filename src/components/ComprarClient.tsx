"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, LocateFixed, MapPin, SlidersHorizontal, Trash2 } from "lucide-react";
import { MobileFilterDrawer } from "./MobileFilterDrawer";

export function FilterButton() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setDrawerOpen(true)}
        className="flex h-11 items-center gap-2 rounded-xl border border-[#d1d0d0] bg-white px-4 text-[15px] font-bold text-[#323131] xl:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filtros
      </button>
      <MobileFilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

const SORT_OPTIONS = [
  "Mais relevantes",
  "Mais recentes",
  "Menor preço R$",
  "Maior preço R$",
  "Menor Area m²",
  "Maior Area m²",
];

export function SortDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Mais relevantes");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      {/* Mobile: compact pill */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex lg:hidden h-11 items-center gap-2 rounded-full border border-[#d1d0d0] bg-white px-4 text-left hover:border-[#323131] transition-colors"
      >
        <ArrowUpDown className="h-4 w-4 text-[#323131]" />
        <span className="text-[14px] font-bold text-[#323131]">Ordenar por</span>
        <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#717169]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6l4 4 4-4"/></svg>
      </button>

      {/* Desktop: tall card with label */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="hidden lg:flex h-[56px] min-w-[200px] flex-col items-start justify-center rounded-xl border border-[#d1d0d0] bg-white px-4 text-left hover:border-[#323131] transition-colors"
      >
        <span className="text-[11px] font-semibold text-[#717169]">Ordernar por</span>
        <span className="text-[15px] font-bold text-[#323131]">{selected}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-[260px] rounded-2xl border border-[#e7e6e6] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.14)]">
          <div className="py-2">
            {SORT_OPTIONS.map((option) => {
              const isActive = selected === option;
              return (
                <button
                  key={option}
                  onClick={() => { setSelected(option); setOpen(false); }}
                  className={`flex w-full items-center gap-3 px-5 py-3.5 text-left text-[15px] font-bold transition-colors ${
                    isActive ? "bg-[#fff5f6] text-[#323131]" : "text-[#323131] hover:bg-[#fafafa]"
                  }`}
                >
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    isActive ? "border-[#eb0027]" : "border-[#c5c4c4]"
                  }`}>
                    {isActive && (
                      <span className="h-2.5 w-2.5 rounded-full bg-[#eb0027]" />
                    )}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const propertyTypeChips = [
  {
    label: "Apartamentos",
    count: "1.980.621 ofertas",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="22" height="22" rx="2" stroke="#717169" strokeWidth="1.6"/>
        <rect x="7" y="7" width="4" height="4" rx="0.5" fill="#717169"/>
        <rect x="13" y="7" width="4" height="4" rx="0.5" fill="#717169"/>
        <rect x="7" y="13" width="4" height="4" rx="0.5" fill="#717169"/>
        <rect x="13" y="13" width="4" height="4" rx="0.5" fill="#717169"/>
        <rect x="10" y="19" width="8" height="6" rx="0.5" fill="#717169"/>
      </svg>
    ),
  },
  {
    label: "Casas e sobrados",
    count: "1.067.277 ofertas",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 14L14 5L24 14" stroke="#717169" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 11.5V23H21V11.5" stroke="#717169" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="11" y="17" width="6" height="6" rx="0.5" fill="#717169"/>
        <rect x="9" y="14" width="4" height="3.5" rx="0.5" fill="#717169"/>
        <rect x="15" y="14" width="4" height="3.5" rx="0.5" fill="#717169"/>
      </svg>
    ),
  },
  {
    label: "Casas em condomínio",
    count: "374.184 ofertas",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 14L14 6L23 14" stroke="#717169" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12V23H20V12" stroke="#717169" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="11.5" y="17" width="5" height="6" rx="0.5" fill="#717169"/>
        <path d="M2 23H26" stroke="#717169" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M2 20.5V23" stroke="#717169" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M26 20.5V23" stroke="#717169" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Terrenos",
    count: "235.182 ofertas",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="5" width="22" height="18" rx="1.5" stroke="#717169" strokeWidth="1.6"/>
        <path d="M3 10H25" stroke="#717169" strokeWidth="1.4"/>
        <path d="M3 15H25" stroke="#717169" strokeWidth="1.4" strokeDasharray="2 2"/>
        <path d="M11 5V23" stroke="#717169" strokeWidth="1.4" strokeDasharray="2 2"/>
        <path d="M18 5V23" stroke="#717169" strokeWidth="1.4" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    label: "Sala comercial",
    count: "180.797 ofertas",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="10" width="22" height="14" rx="1.5" stroke="#717169" strokeWidth="1.6"/>
        <path d="M8 10V8C8 6.34 9.34 5 11 5H17C18.66 5 20 6.34 20 8V10" stroke="#717169" strokeWidth="1.6" strokeLinecap="round"/>
        <rect x="11" y="14" width="6" height="5" rx="0.5" fill="#717169"/>
        <path d="M3 16H25" stroke="#717169" strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    label: "Loteamentos",
    count: "95.340 ofertas",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="10" height="10" rx="1.2" stroke="#717169" strokeWidth="1.6"/>
        <rect x="15" y="3" width="10" height="10" rx="1.2" stroke="#717169" strokeWidth="1.6"/>
        <rect x="3" y="15" width="10" height="10" rx="1.2" stroke="#717169" strokeWidth="1.6"/>
        <rect x="15" y="15" width="10" height="10" rx="1.2" stroke="#717169" strokeWidth="1.6"/>
      </svg>
    ),
  },
];

export function PropertyTypeChips() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 260 : -260, behavior: "smooth" });
  };

  return (
    <div className="relative mt-4">
      {/* Left fade + arrow */}
      {canScrollLeft && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#f4f5f7] z-10" />
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#d1d0d0] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] hover:shadow-[0_3px_10px_rgba(0,0,0,0.18)] transition-shadow"
          >
            <ChevronLeft className="h-4 w-4 text-[#323131]" />
          </button>
        </>
      )}

      {/* Scrollable list */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {propertyTypeChips.map((chip) => (
          <button
            key={chip.label}
            className="flex shrink-0 items-center gap-2 md:gap-3 rounded-xl border border-[#d1d0d0] bg-white px-3 py-2 md:px-4 md:py-3 text-left hover:border-[#eb0027] hover:shadow-[0_2px_8px_rgba(235,0,39,0.08)] transition-all"
          >
            <span className="shrink-0 [&_svg]:h-5 [&_svg]:w-5 md:[&_svg]:h-7 md:[&_svg]:w-7">{chip.icon}</span>
            <span>
              <p className="text-[12px] md:text-[14px] font-bold text-[#323131] whitespace-nowrap">{chip.label}</p>
              <p className="text-[11px] md:text-[12px] font-medium text-[#717169] whitespace-nowrap">{chip.count}</p>
            </span>
          </button>
        ))}
      </div>

      {/* Right fade + arrow */}
      {canScrollRight && (
        <>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#f4f5f7] z-10" />
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#d1d0d0] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] hover:shadow-[0_3px_10px_rgba(0,0,0,0.18)] transition-shadow"
          >
            <ChevronRight className="h-4 w-4 text-[#323131]" />
          </button>
        </>
      )}
    </div>
  );
}

const collapsibleSections = [
  {
    title: "Área de Lazer",
    checks: ["Brinquedoteca", "Churrasqueira", "Espaço gourmet", "Piscina", "Playground", "Salão de festas", "Salão de jogos"],
  },
  {
    title: "Conveniências",
    checks: ["Ar-condicionado", "Armários Planejados", "Elevador", "Hidromassagem", "Jardim", "Lareira", "Mobiliado", "Quintal", "Sauna", "Varanda"],
  },
  {
    title: "Funcional",
    checks: ["Área de serviço", "Ático", "Closet", "Dependência de Empregada", "Edícula", "Escritório", "Lavabo", "Lavanderia"],
  },
  {
    title: "Segurança",
    checks: ["Circuito de segurança", "Guarita", "Interfone", "Portaria"],
  },
  {
    title: "Tipo de Vendedor",
    checks: ["Direto com proprietário", "Somente Imobiliárias"],
  },
];

const propertyTypes = [
  {
    label: "Apartamento",
    icon: (
      <svg viewBox="0 0 28 28" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="22" height="22" rx="2" stroke="#717169" strokeWidth="1.6"/>
        <rect x="7" y="7" width="4" height="4" rx="0.5" fill="#717169"/>
        <rect x="13" y="7" width="4" height="4" rx="0.5" fill="#717169"/>
        <rect x="7" y="13" width="4" height="4" rx="0.5" fill="#717169"/>
        <rect x="13" y="13" width="4" height="4" rx="0.5" fill="#717169"/>
        <rect x="10" y="19" width="8" height="6" rx="0.5" fill="#717169"/>
      </svg>
    ),
  },
  {
    label: "Casas & Sobrados",
    icon: (
      <svg viewBox="0 0 28 28" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 14L14 5L24 14" stroke="#717169" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 11.5V23H21V11.5" stroke="#717169" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="11" y="17" width="6" height="6" rx="0.5" fill="#717169"/>
      </svg>
    ),
  },
  {
    label: "Kitnets & Stúdios",
    icon: (
      <svg viewBox="0 0 28 28" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="22" height="22" rx="2" stroke="#717169" strokeWidth="1.6"/>
        <rect x="7" y="7" width="6" height="14" rx="0.5" fill="#717169" opacity="0.3"/>
        <rect x="15" y="7" width="6" height="6" rx="0.5" fill="#717169"/>
        <rect x="15" y="15" width="6" height="6" rx="0.5" fill="#717169" opacity="0.5"/>
      </svg>
    ),
  },
];

export function FilterSidebar() {
  const [activeTab, setActiveTab] = useState<"Comprar" | "Alugar" | "Lançamentos">("Comprar");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (title: string) =>
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));

  return (
    <aside className="hidden xl:block w-[360px] shrink-0 sticky top-[74px] max-h-[calc(100vh-74px)] overflow-y-auto py-5 scrollbar-hide">
      <div className="rounded-2xl bg-white border border-[#e7e6e6]">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-[18px] w-[18px] text-[#323131]" />
            <h2 className="text-[18px] font-bold text-[#323131]">Filtros</h2>
          </div>
          <button className="flex items-center gap-1.5 text-[13px] font-semibold text-[#eb0027] hover:opacity-80 transition-opacity">
            <Trash2 className="h-3.5 w-3.5" />
            Limpar tudo
          </button>
        </div>

        {/* Seleção atual */}
        <div className="mx-4 mb-1">
          <div className="flex items-center justify-between rounded-xl bg-[#fff0f2] border border-[#f4c8d0] px-4 py-3">
            <p className="text-[13px] font-bold text-[#323131]">Seleção atual</p>
            <button className="flex items-center gap-1">
              <span className="text-[13px] font-bold text-[#eb0027]">Nenhum filtro</span>
              <ChevronDown className="h-4 w-4 text-[#eb0027]" />
            </button>
          </div>
        </div>

        {/* Mode tabs */}
        <div className="mx-4 mt-4 mb-1 grid grid-cols-3 rounded-xl overflow-hidden border border-[#e7e6e6] bg-[#f6f5f5]">
          {(["Comprar", "Alugar", "Lançamentos"] as const).map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative py-2.5 text-[13px] font-semibold transition-colors
                ${i === 0 ? "" : "border-l border-[#e7e6e6]"}
                ${activeTab === tab ? "bg-white text-[#323131]" : "text-[#717169]"}`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#eb0027] rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        <div className="px-5 pb-2">

          {/* Localização */}
          <div className="pt-4 pb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[15px] font-bold text-[#323131]">Localização</p>
              <button className="flex items-center gap-1 text-[13px] font-semibold text-[#eb0027] hover:opacity-80 transition-opacity">
                <LocateFixed className="h-3.5 w-3.5" />
                Perto de mim
              </button>
            </div>
            <div className="flex h-11 items-center gap-2 rounded-xl border border-[#ddd] bg-[#f6f5f5] px-3">
              <MapPin className="h-4 w-4 text-[#aaa] shrink-0" />
              <input
                type="text"
                placeholder="Digite bairro, rua ou cidade"
                className="flex-1 bg-transparent text-[13px] text-[#323131] outline-none placeholder:text-[#aaa]"
              />
            </div>
          </div>

          {/* Tipos de imóveis — always visible, no chevron */}
          <div className="border-t border-[#e7e6e6] pt-4 pb-4">
            <p className="text-[15px] font-bold text-[#323131] mb-3">Tipos de imóveis</p>
            <div className="grid grid-cols-3 gap-2">
              {propertyTypes.map((type) => (
                <button
                  key={type.label}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-[#ddd] px-2 py-4 text-[12px] font-semibold text-[#323131] hover:border-[#eb0027] hover:text-[#eb0027] transition-colors"
                >
                  {type.icon}
                  {type.label}
                </button>
              ))}
            </div>
            <button className="mt-3 text-[13px] font-bold text-[#eb0027] hover:opacity-80 transition-opacity">
              + Mais tipos de imóveis
            </button>
          </div>

          {/* Preço — always visible, no chevron */}
          <div className="border-t border-[#e7e6e6] pt-4 pb-4">
            <div className="flex gap-2 mb-2">
              <p className="flex-1 text-[14px] font-bold text-[#323131]">Preço à partir de</p>
              <p className="flex-1 text-[14px] font-bold text-[#323131]">Até</p>
            </div>
            <div className="flex gap-2">
              <input
                placeholder="R$ 0"
                className="h-11 flex-1 rounded-xl border border-[#ddd] bg-[#f6f5f5] px-3 text-[13px] text-[#323131] outline-none placeholder:text-[#aaa]"
              />
              <input
                placeholder="R$ 0"
                className="h-11 flex-1 rounded-xl border border-[#ddd] bg-[#f6f5f5] px-3 text-[13px] text-[#323131] outline-none placeholder:text-[#aaa]"
              />
            </div>
          </div>

          {/* Quartos — always visible, no chevron */}
          <div className="border-t border-[#e7e6e6] pt-4 pb-4">
            <p className="text-[15px] font-bold text-[#323131] mb-3">Quantidade de quartos</p>
            <div className="grid grid-cols-4 gap-2">
              {["+ 1", "+ 2", "+ 3", "+ 4"].map((p) => (
                <button key={p} className="h-9 rounded-xl border border-[#ddd] text-[13px] font-semibold text-[#323131] hover:border-[#eb0027] hover:text-[#eb0027] transition-colors">{p}</button>
              ))}
            </div>
          </div>

          {/* Banheiros — always visible, no chevron */}
          <div className="border-t border-[#e7e6e6] pt-4 pb-4">
            <p className="text-[15px] font-bold text-[#323131] mb-3">Banheiros</p>
            <div className="grid grid-cols-4 gap-2">
              {["+ 1", "+ 2", "+ 3", "+ 4"].map((p) => (
                <button key={p} className="h-9 rounded-xl border border-[#ddd] text-[13px] font-semibold text-[#323131] hover:border-[#eb0027] hover:text-[#eb0027] transition-colors">{p}</button>
              ))}
            </div>
          </div>

          {/* Garagens — always visible, no chevron */}
          <div className="border-t border-[#e7e6e6] pt-4 pb-4">
            <p className="text-[15px] font-bold text-[#323131] mb-3">Garagens</p>
            <div className="grid grid-cols-4 gap-2">
              {["+ 1", "+ 2", "+ 3", "+ 4"].map((p) => (
                <button key={p} className="h-9 rounded-xl border border-[#ddd] text-[13px] font-semibold text-[#323131] hover:border-[#eb0027] hover:text-[#eb0027] transition-colors">{p}</button>
              ))}
            </div>
          </div>

          {/* Área útil — always visible, no chevron */}
          <div className="border-t border-[#e7e6e6] pt-4 pb-4">
            <div className="flex gap-2 mb-2">
              <p className="flex-1 text-[14px] font-bold text-[#323131]">Área útil (m²) de</p>
              <p className="flex-1 text-[14px] font-bold text-[#323131]">Até</p>
            </div>
            <div className="flex gap-2">
              <input
                placeholder="0 m²"
                className="h-11 flex-1 rounded-xl border border-[#ddd] bg-[#f6f5f5] px-3 text-[13px] text-[#323131] outline-none placeholder:text-[#aaa]"
              />
              <input
                placeholder="0 m²"
                className="h-11 flex-1 rounded-xl border border-[#ddd] bg-[#f6f5f5] px-3 text-[13px] text-[#323131] outline-none placeholder:text-[#aaa]"
              />
            </div>
          </div>

          {/* Collapsible sections — functional toggle */}
          {collapsibleSections.map((section) => {
            const isOpen = !collapsed[section.title];
            return (
              <div key={section.title} className="border-t border-[#e7e6e6] pt-4 pb-4">
                <button
                  onClick={() => toggle(section.title)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="text-[15px] font-bold text-[#323131]">{section.title}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#717169] transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`}
                  />
                </button>
                {isOpen && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {section.checks.map((check) => (
                      <button
                        key={check}
                        className="rounded-xl border border-[#ddd] px-3 py-2 text-[13px] font-semibold text-[#323131] hover:border-[#eb0027] hover:text-[#eb0027] transition-colors"
                      >
                        {check}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
