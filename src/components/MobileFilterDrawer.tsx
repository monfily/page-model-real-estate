"use client";

import { useEffect, useRef } from "react";
import {
  Building2,
  ChevronDown,
  Grid3X3,
  Home,
  LocateFixed,
  X,
} from "lucide-react";

const filters = [
  {
    title: "Tipos de imóveis",
    options: ["Apartamento", "Casas & Sobrados", "Kitnets & Stúdios"],
    action: "Mais tipos de imóveis",
  },
  {
    title: "Preço à partir de",
    range: ["Até"],
  },
  {
    title: "Quantidade de quartos",
    pills: ["+ 1", "+ 2", "+ 3", "+ 4"],
  },
  {
    title: "Banheiros",
    pills: ["+ 1", "+ 2", "+ 3", "+ 4"],
  },
  {
    title: "Garagens",
    pills: ["+ 1", "+ 2", "+ 3", "+ 4"],
  },
  {
    title: "Área útil (m²) de",
    range: ["Até"],
  },
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

export function MobileFilterDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex xl:hidden" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Drawer panel from left */}
      <div
        ref={ref}
        className="relative flex flex-col bg-white w-[320px] max-w-[85vw] h-full shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-[#e7e6e6]">
          <h2 className="text-[19px] font-bold text-[#323131]">Filtros</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#f6f5f5] text-[#323131] transition-colors"
            aria-label="Fechar filtros"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Current selection */}
          <div className="rounded-xl border border-[#f4c8d0] bg-[#fff0f2] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[14px] font-bold text-[#323131]">Seleção atual</p>
              <p className="text-[14px] font-bold text-[#eb0027]">Nenhum filtro</p>
            </div>
          </div>

          {/* Mode tabs */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Comprar", active: true, icon: Home },
              { label: "Alugar", icon: Building2 },
              { label: "Lançamentos", icon: Grid3X3 },
            ].map((item) => (
              <button
                key={item.label}
                className={`h-[78px] rounded-xl border text-[13px] font-semibold flex flex-col items-center justify-center gap-2 ${
                  item.active
                    ? "border-[#eb0027] bg-[#fff0f2] text-[#eb0027]"
                    : "border-[#ddd] text-[#323131]"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Location */}
          <div className="space-y-3">
            <p className="text-[15px] font-bold text-[#323131]">Localização</p>
            <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#ddd] text-[15px] font-semibold text-[#323131]">
              <LocateFixed className="h-5 w-5 text-[#eb0027]" />
              Perto de mim
            </button>
          </div>

          {/* Filter sections */}
          {filters.map((filter) => (
            <section
              key={filter.title}
              className="space-y-3 border-t border-[#e7e6e6] pt-5"
            >
              <button className="flex w-full items-center justify-between text-left text-[15px] font-bold text-[#323131]">
                {filter.title}
                <ChevronDown className="h-4 w-4 text-[#717169]" />
              </button>

              {filter.options && (
                <div className="grid grid-cols-3 gap-2">
                  {filter.options.map((option) => (
                    <button
                      key={option}
                      className="min-h-[72px] rounded-xl border border-[#ddd] px-2 text-[13px] font-semibold text-[#323131]"
                    >
                      {option}
                    </button>
                  ))}
                  <button className="col-span-3 rounded-lg text-left text-[13px] font-bold text-[#eb0027]">
                    {filter.action}
                  </button>
                </div>
              )}

              {filter.range && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex h-11 items-center rounded-lg border border-[#ddd] bg-[#f6f5f5] px-3 text-[13px] text-[#8a8686]">
                    R$ 0
                  </div>
                  <div className="flex h-11 items-center rounded-lg border border-[#ddd] bg-[#f6f5f5] px-3 text-[13px] text-[#8a8686]">
                    R$ 0
                  </div>
                </div>
              )}

              {filter.pills && (
                <div className="grid grid-cols-4 gap-2">
                  {filter.pills.map((pill) => (
                    <button
                      key={pill}
                      className="h-9 rounded-xl border border-[#ddd] text-[13px] font-semibold text-[#323131]"
                    >
                      {pill}
                    </button>
                  ))}
                </div>
              )}

              {filter.checks && (
                <div className="space-y-2">
                  {filter.checks.map((check) => (
                    <label
                      key={check}
                      className="flex items-center gap-3 text-[14px] font-medium text-[#5e5c5d] cursor-pointer"
                    >
                      <span className="h-5 w-5 shrink-0 rounded border border-[#d1d0d0] bg-white" />
                      {check}
                    </label>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Sticky footer */}
        <div className="shrink-0 border-t border-[#e7e6e6] bg-white p-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-12 rounded-xl border border-[#d1d0d0] text-[15px] font-bold text-[#323131]"
          >
            Limpar tudo
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-12 rounded-xl bg-[#eb0027] text-[15px] font-bold text-white"
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );
}
