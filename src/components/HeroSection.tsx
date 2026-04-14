"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] md:h-[702px] flex items-center">
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
        <div className="absolute inset-0 bg-black/20 md:bg-black/10"></div>
      </div>

      {/* Content Box */}
      <div className="relative z-10 w-full px-4 md:px-8 md:max-w-[1280px] md:mx-auto flex justify-center md:block">
        <div className="bg-white rounded-2xl p-6 md:p-10 w-full max-w-[420px] md:max-w-[520px] shadow-lg animate-[fade-up_0.5s_ease-out]">
          <h1 className="text-3xl md:text-[38px] font-extrabold text-brand-txt-primary leading-tight mb-6">
            Encontre milhões de imóveis em todo Brasil
          </h1>

          <div className="flex flex-col gap-2.5">
            {/* O que você deseja? */}
            <button className="w-full px-4 py-3.5 border border-brand-outline rounded-xl text-left hover:border-brand-primary/60 bg-white flex justify-between items-center transition-colors">
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] font-semibold text-brand-txt-secondary">O que você deseja?</span>
                <span className="text-[15px] font-bold text-brand-txt-primary">Selecionar</span>
              </div>
              <svg viewBox="0 0 16 16" className="h-4 w-4 text-brand-txt-secondary shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6l4-4 4 4M4 10l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Tipo de Imóvel */}
            <button className="w-full px-4 py-3.5 border border-brand-outline rounded-xl text-left hover:border-brand-primary/60 bg-white flex justify-between items-center transition-colors">
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] font-semibold text-brand-txt-secondary">Tipo de Imóvel</span>
                <span className="text-[15px] font-bold text-brand-txt-primary">Todos</span>
              </div>
              <svg viewBox="0 0 16 16" className="h-4 w-4 text-brand-txt-secondary shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6l4-4 4 4M4 10l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Localização */}
            <div className="w-full px-4 py-3.5 border border-brand-outline rounded-xl bg-white focus-within:border-brand-primary transition-colors">
              <p className="text-[12px] font-semibold text-brand-txt-secondary mb-0.5">Localização</p>
              <input
                type="text"
                placeholder="Digite cidade, bairro ou rua"
                className="w-full text-[15px] font-medium text-brand-txt-primary placeholder:text-brand-txt-secondary outline-none bg-transparent"
              />
            </div>

            {/* Buscar */}
            <Link
              href="/comprar"
              className="w-full h-[52px] bg-brand-primary text-white font-bold text-[17px] rounded-xl hover:bg-[#d60023] transition-colors flex items-center justify-center gap-2 mt-0.5"
            >
              <Search className="h-5 w-5" />
              Buscar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
