"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const propertyTypes = [
  { label: "Apartamento", image: "/images/apartamento-f1f0cdb2c1.jpg", href: "/apartamentos/brasil/" },
  { label: "Casas e sobrados", image: "/images/casas-e-sobrados-93c35aad2a.jpg", href: "/casas/brasil/" },
  { label: "Casa em condomínio", image: "/images/casa-em-condom-nio-e05d07b2cf.jpg", href: "/casas-em-condominio/brasil/" },
  { label: "Kitnets e studios", image: "/images/kitnets-e-studios-9d16cbc46a.jpg", href: "/kitnet/brasil/" },
  { label: "Flat", image: "/images/flat-791bd98e9c.jpg", href: "/flat/brasil/" },
  { label: "Loft", image: "/images/loft-32642ced9f.jpg", href: "/loft/brasil/" },
  { label: "Cobertura", image: "/images/cobertura-3168fbad0e.jpg", href: "/coberturas/brasil/" },
  { label: "Sítios e chácaras", image: "/images/s-tios-e-ch-caras-d9865d1730.jpg", href: "/chacaras/brasil/" }
];

const amenities = [
  { title: "Casas com piscina", desc: "Encontre casas com piscina para comprar e aproveite lazer e conforto no dia a dia.", image: "/images/casas-com-piscina-5b9a4e0f40.jpg", href: "/casas/brasil/?amenities=piscina" },
  { title: "Mobiliados", desc: "Casas e apartamentos mobiliados para alugar, prontos para morar com praticidade e economia na mudança.", image: "/images/mobiliados-e8bc4929f5.jpg", href: "/imoveis/brasil/?amenities=mobiliado" },
  { title: "Apartamentos na planta", desc: "Garanta seu imóvel novo, moderno e personalizável, aproveitando condições exclusivas de compra.", image: "/images/apartamentos-na-planta-fb4e4beb2c.jpg", href: "/lancamentos-imoveis/brasil/" },
  { title: "Apartamento com varanda", desc: "Compre casas e apartamentos com varanda aconchegantes para aproveitar luz natural e ar livre.", image: "/images/apartamento-com-varanda-cb094e8e73.jpg", href: "/apartamentos/brasil/?amenities=varanda" },
  { title: "Casas com quintal", desc: "Casas com quintal para comprar, perfeitas para momentos especiais ao ar livre.", image: "/images/casas-com-quintal-e56da09ea5.jpg", href: "/casas/brasil/?amenities=quintal" },
  { title: "Direto com o proprietário", desc: "Alugue seu imóvel direto com o proprietário, com negociação simples e sem burocracia.", image: "/images/direto-com-o-propriet-rio-5bf227ad70.jpg", href: "/imoveis-para-alugar/brasil/?publisher=proprietario" }
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

        {/* Part D — Confira o que podemos fazer */}
        <div className="space-y-6">
          <h3 className="text-xl md:text-[22px] font-bold text-brand-txt-primary">
            Confira o que podemos fazer por você
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1 */}
            <div className="flex flex-col md:flex-row bg-white border border-brand-outline rounded-xl overflow-hidden items-center text-center md:text-left p-6 md:p-0 md:pr-6 gap-6">
              <div className="relative w-[200px] h-[160px] hidden md:block flex-shrink-0">
                <Image 
                  src="/images/pessoa-anunciando-im-vel-ou-ve-e740c2d951.jpg" 
                  alt="Anuncie seu imóvel"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-center md:items-start py-4">
                <h4 className="font-bold text-[22px] text-brand-txt-primary mb-2">
                  Anuncie seu imóvel
                </h4>
                <p className="text-[15px] text-brand-txt-secondary mb-6">
                  Divulgue casas, apartamentos, terrenos e mais...
                </p>
                <Link href="/anunciar-gratis-imoveis-casas-apartamentos/" className="px-6 py-3 bg-brand-primary text-white font-bold rounded-[60px] hover:bg-[#d60023] transition-colors">
                  Anunciar imóvel
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col bg-[#F9F9F9] border border-brand-outline rounded-xl p-8 justify-center items-center text-center">
              <h4 className="font-bold text-[22px] text-brand-txt-primary mb-2">
                Blog imobiliário
              </h4>
              <p className="text-[15px] text-brand-txt-secondary mb-6 max-w-sm">
                Dicas de decoração, guias para comprar ou vender imóveis e as últimas novidades do mercado.
              </p>
              <Link href="/blog-imobiliario/" className="px-6 py-3 border-2 border-brand-txt-primary text-brand-txt-primary font-bold rounded-[60px] hover:bg-brand-txt-primary hover:text-white transition-colors">
                Ler o blog
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
