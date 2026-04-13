"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const propertyTypes = [
  { label: "Apartamento", image: "/images/apartamento-f1f0cdb2c1.jpg", href: "/comprar" },
  { label: "Casas e sobrados", image: "/images/casas-e-sobrados-93c35aad2a.jpg", href: "/comprar" },
  { label: "Casa em condomínio", image: "/images/casa-em-condom-nio-e05d07b2cf.jpg", href: "/comprar" },
  { label: "Kitnets e studios", image: "/images/kitnets-e-studios-9d16cbc46a.jpg", href: "/comprar" },
  { label: "Flat", image: "/images/flat-791bd98e9c.jpg", href: "/comprar" },
  { label: "Loft", image: "/images/loft-32642ced9f.jpg", href: "/comprar" },
  { label: "Cobertura", image: "/images/cobertura-3168fbad0e.jpg", href: "/comprar" },
  { label: "Sítios e chácaras", image: "/images/s-tios-e-ch-caras-d9865d1730.jpg", href: "/comprar" }
];

const amenities = [
  { title: "Casas com piscina", desc: "Encontre casas com piscina para comprar e aproveite lazer e conforto no dia a dia.", image: "/images/casas-com-piscina-5b9a4e0f40.jpg", href: "/comprar" },
  { title: "Mobiliados", desc: "Casas e apartamentos mobiliados para alugar, prontos para morar com praticidade e economia na mudança.", image: "/images/mobiliados-e8bc4929f5.jpg", href: "/comprar" },
  { title: "Apartamentos na planta", desc: "Garanta seu imóvel novo, moderno e personalizável, aproveitando condições exclusivas de compra.", image: "/images/apartamentos-na-planta-fb4e4beb2c.jpg", href: "/comprar" },
  { title: "Apartamento com varanda", desc: "Compre casas e apartamentos com varanda aconchegantes para aproveitar luz natural e ar livre.", image: "/images/apartamento-com-varanda-cb094e8e73.jpg", href: "/comprar" },
  { title: "Casas com quintal", desc: "Casas com quintal para comprar, perfeitas para momentos especiais ao ar livre.", image: "/images/casas-com-quintal-e56da09ea5.jpg", href: "/comprar" },
  { title: "Direto com o proprietário", desc: "Alugue seu imóvel direto com o proprietário, com negociação simples e sem burocracia.", image: "/images/direto-com-o-propriet-rio-5bf227ad70.jpg", href: "/comprar" }
];

export function PropertySection() {
  const [activeTab, setActiveTab] = useState<"Residenciais" | "Comerciais">("Residenciais");

  return (
    <section className="w-full bg-white py-16 px-4 md:px-8">
      <div className="max-w-[1280px] mx-auto space-y-16">
        
        {/* Part A — Header */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-[28px] font-bold text-brand-txt-primary">
            Encontre seu próximo imóvel com quem lidera o mercado
          </h2>
          <p className="text-[17px] text-brand-txt-secondary max-w-3xl leading-relaxed">
            O Chaves na Mão é o portal imobiliário que conecta você ao imóvel ideal com rapidez, transparência e a maior quantidade de ofertas do Brasil.
          </p>
          <Link href="/comprar" className="inline-flex h-12 items-center justify-center rounded-[60px] bg-brand-primary px-7 text-[15px] font-bold text-white hover:bg-[#d60023] transition-colors">
            Ver imóveis disponíveis
          </Link>
          
          <div className="flex space-x-6 border-b border-brand-surface pt-4">
            {(["Residenciais", "Comerciais"] as const).map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-bold text-[17px] relative ${
                  activeTab === tab 
                    ? "text-brand-primary" 
                    : "text-brand-txt-secondary hover:text-brand-txt-primary"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-brand-primary rounded-t-md" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Part B — Procure por tipo de imóvel */}
        <div className="space-y-6">
          <h3 className="text-xl md:text-[22px] font-bold text-brand-txt-primary">
            Procure por tipo de imóvel
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {propertyTypes.map((item, idx) => (
              <Link href={item.href} key={idx} className="group block cursor-pointer">
                <div className="relative w-full aspect-[5/3] rounded-xl overflow-hidden mb-3">
                  <Image 
                    src={item.image} 
                    alt={item.label}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="font-bold text-[15px] text-brand-txt-primary group-hover:text-brand-primary transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Part C — Escolha pela comodidade */}
        <div className="space-y-6">
          <h3 className="text-xl md:text-[22px] font-bold text-brand-txt-primary">
            Escolha pela comodidade que mais importa
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {amenities.map((item, idx) => (
              <Link href={item.href} key={idx} className="flex bg-white border border-brand-outline rounded-xl overflow-hidden hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow group">
                <div className="relative w-[120px] md:w-[140px] flex-shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col justify-center">
                  <h4 className="font-bold text-[15px] text-brand-txt-primary group-hover:text-brand-primary transition-colors mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[13px] text-brand-txt-secondary line-clamp-3">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
