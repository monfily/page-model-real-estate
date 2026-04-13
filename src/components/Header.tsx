"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#ddd] h-[74px] px-4 md:px-8 flex items-center justify-between">
      <Link href="/" className="flex-shrink-0">
        <Logo className="h-8 md:h-[39px] w-auto text-brand-default" />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden lg:flex items-center space-x-6 flex-1 justify-end mr-6">
        <div className="group relative">
          <button className="flex items-center space-x-1 text-brand-default font-semibold text-[15px] hover:text-brand-primary h-[74px]">
            <span>Imóveis</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          <div className="absolute top-[74px] left-1/2 -translate-x-1/2 w-[400px] bg-white shadow-lg border border-brand-outline rounded-b-md p-6 hidden group-hover:grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-brand-primary mb-3">Aluguel</h4>
              <ul className="space-y-2">
                <li><Link href="/imoveis-para-alugar/brasil/" className="text-sm text-brand-txt-secondary hover:text-brand-primary">Todos os Imóveis</Link></li>
                <li><Link href="/apartamentos-para-alugar/brasil/" className="text-sm text-brand-txt-secondary hover:text-brand-primary">Apartamentos</Link></li>
                <li><Link href="/casas-para-alugar/brasil/" className="text-sm text-brand-txt-secondary hover:text-brand-primary">Casas</Link></li>
                <li><Link href="/kitnet-para-alugar/brasil/" className="text-sm text-brand-txt-secondary hover:text-brand-primary">Kitnets</Link></li>
                <li><Link href="/imoveis-comerciais-para-alugar/brasil/" className="text-sm text-brand-txt-secondary hover:text-brand-primary">Comerciais</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-brand-primary mb-3">Venda</h4>
              <ul className="space-y-2">
                <li><Link href="/imoveis-a-venda/brasil/" className="text-sm text-brand-txt-secondary hover:text-brand-primary">Todos os Imóveis</Link></li>
                <li><Link href="/apartamentos-a-venda/brasil/" className="text-sm text-brand-txt-secondary hover:text-brand-primary">Apartamentos</Link></li>
                <li><Link href="/casas-a-venda/brasil/" className="text-sm text-brand-txt-secondary hover:text-brand-primary">Casas</Link></li>
                <li><Link href="/lancamentos-imoveis/brasil/" className="text-sm text-brand-txt-secondary hover:text-brand-primary">Lançamentos</Link></li>
                <li><Link href="/imoveis-comerciais-a-venda/brasil/" className="text-sm text-brand-txt-secondary hover:text-brand-primary">Comerciais</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="group relative">
          <button className="flex items-center space-x-1 text-brand-default font-semibold text-[15px] hover:text-brand-primary h-[74px]">
            <span>Veículos</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <Link href="/anunciar-imoveis-carros-e-motos/" className="text-brand-default font-semibold text-[15px] hover:text-brand-primary">
          Anuncie
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="hidden lg:flex items-center space-x-3">
        <Link href="/entrar/" className="px-5 py-2 text-[15px] font-bold text-brand-default border border-brand-outline rounded-[60px] hover:bg-brand-surface transition-colors">
          Entrar
        </Link>
        <Link href="/cadastre-se/" className="px-5 py-2 text-[15px] font-bold text-white bg-brand-primary rounded-[60px] hover:bg-[#d60023] transition-colors">
          Cadastre-se
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden text-brand-default p-2"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white shadow-xl flex flex-col animate-[slide-in_0.3s_ease-out_reverse]">
            <div className="p-4 flex justify-between items-center border-b border-brand-outline">
              <span className="font-bold text-lg text-brand-default">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X className="h-6 w-6 text-brand-default" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4 px-6 space-y-6">
              <div className="space-y-4">
                <h3 className="font-bold text-brand-primary text-lg">Imóveis</h3>
                <ul className="space-y-3 pl-4 border-l-2 border-brand-surface">
                  <li><Link href="/imoveis-para-alugar/brasil/" className="text-brand-txt-secondary block py-1">Alugar</Link></li>
                  <li><Link href="/imoveis-a-venda/brasil/" className="text-brand-txt-secondary block py-1">Comprar</Link></li>
                  <li><Link href="/lancamentos-imoveis/brasil/" className="text-brand-txt-secondary block py-1">Lançamentos</Link></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-bold text-brand-primary text-lg">Veículos</h3>
                <ul className="space-y-3 pl-4 border-l-2 border-brand-surface">
                  <li><Link href="/carros-usados/brasil/" className="text-brand-txt-secondary block py-1">Carros</Link></li>
                  <li><Link href="/motos-usadas/brasil/" className="text-brand-txt-secondary block py-1">Motos</Link></li>
                </ul>
              </div>
              
              <Link href="/anunciar-imoveis-carros-e-motos/" className="block font-bold text-brand-default text-lg pt-4 border-t border-brand-surface">
                Anuncie grátis
              </Link>
            </div>
            
            <div className="p-6 border-t border-brand-outline space-y-3">
              <Link href="/entrar/" className="block w-full text-center px-5 py-3 font-bold text-brand-default border border-brand-outline rounded-[60px]">
                Entrar
              </Link>
              <Link href="/cadastre-se/" className="block w-full text-center px-5 py-3 font-bold text-white bg-brand-primary rounded-[60px]">
                Cadastre-se
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
