"use client";

import { useState } from "react";
import Image from "next/image";

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<"imoveis" | "veiculos">("imoveis");

  return (
    <section className="relative w-full h-[500px] md:h-[702px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/fam-lia-brincando-com-cachorro-fe446c546c.jpg" 
          alt="Família brincando com cachorro"
          fill
          unoptimized
          className="object-cover object-center"
          priority
        />
        {/* Slight overlay to ensure text legibility if needed, original seems to just use the image */}
        <div className="absolute inset-0 bg-black/10 md:bg-transparent"></div>
      </div>

      {/* Content Box */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="bg-white rounded-2xl p-6 md:p-10 w-full md:max-w-[640px] shadow-lg animate-[fade-up_0.5s_ease-out]">
          <h1 className="text-3xl md:text-[38px] font-extrabold text-brand-txt-primary leading-tight mb-8">
            Encontre milhões de imóveis, carros e motos
          </h1>

          {/* Tabs */}
          <div className="flex space-x-6 border-b border-brand-surface mb-6">
            <button 
              onClick={() => setActiveTab("imoveis")}
              className={`pb-3 font-bold text-[17px] relative ${
                activeTab === "imoveis" 
                  ? "text-brand-primary" 
                  : "text-brand-txt-secondary hover:text-brand-txt-primary"
              }`}
            >
              Imóveis
              {activeTab === "imoveis" && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-brand-primary rounded-t-md" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab("veiculos")}
              className={`pb-3 font-bold text-[17px] relative ${
                activeTab === "veiculos" 
                  ? "text-brand-primary" 
                  : "text-brand-txt-secondary hover:text-brand-txt-primary"
              }`}
            >
              Veículos
              {activeTab === "veiculos" && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-brand-primary rounded-t-md" />
              )}
            </button>
          </div>

          {/* Search Form */}
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col md:flex-row gap-3">
              <button className="flex-1 px-4 py-3 border border-brand-outline rounded-[60px] text-left text-[15px] font-medium text-brand-txt-secondary hover:border-brand-primary/50 bg-white flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-brand-txt-secondary uppercase tracking-wider">O que você deseja?</span>
                  <span className="text-brand-txt-primary font-bold">Selecionar</span>
                </div>
                <span className="text-brand-txt-secondary text-[10px]">▼</span>
              </button>
              
              {activeTab === "imoveis" && (
                <button className="flex-1 px-4 py-3 border border-brand-outline rounded-[60px] text-left text-[15px] font-medium text-brand-txt-secondary hover:border-brand-primary/50 bg-white flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-brand-txt-secondary uppercase tracking-wider">Tipo de Imóvel</span>
                    <span className="text-brand-txt-primary font-bold">Todos</span>
                  </div>
                  <span className="text-brand-txt-secondary text-[10px]">▼</span>
                </button>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-grow relative">
                <input 
                  type="text" 
                  placeholder="Localização" 
                  className="w-full h-full min-h-[56px] px-6 border border-brand-outline rounded-[60px] text-[15px] font-medium text-brand-txt-primary focus:border-brand-primary focus:outline-none placeholder:text-brand-txt-secondary"
                />
              </div>
              <button className="h-[56px] px-8 bg-brand-primary text-white font-bold text-[17px] rounded-[60px] hover:bg-[#d60023] transition-colors md:w-auto w-full">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
