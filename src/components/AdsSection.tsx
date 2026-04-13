import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function AdsSection() {
  return (
    <section className="w-full bg-brand-primary py-16 px-4 md:px-8 text-white">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center space-y-12">
        
        <h2 className="text-[28px] md:text-[38px] font-extrabold max-w-3xl leading-tight">
          Anuncie agora no portal líder na geração de resultados
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-4xl">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <h3 className="text-xl font-bold">Mais visibilidade</h3>
            <p className="text-white/80 font-medium">Contamos com milhões de acessos todos os meses</p>
          </div>
          
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.3 7H6a2 2 0 0 1 2 2v5"/><path d="m8 18-3-3 3-3"/><path d="M18 7v5a2 2 0 0 1-2 2h-2.7"/><path d="m16 18 3-3-3-3"/></svg>
            </div>
            <h3 className="text-xl font-bold">Credibilidade</h3>
            <p className="text-white/80 font-medium">Somos o portal líder na geração de resultados</p>
          </div>
          
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/></svg>
            </div>
            <h3 className="text-xl font-bold">Destaque</h3>
            <p className="text-white/80 font-medium">Anuncie em um dos portais mais acessados do Brasil</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-lg mt-8">
          <div className="relative w-full flex-1">
            <select className="w-full h-[56px] px-6 appearance-none bg-white text-brand-txt-primary font-bold text-[15px] rounded-[60px] cursor-pointer outline-none border-2 border-transparent focus:border-white/50">
              <option value="">Selecione seu perfil</option>
              <option value="imobiliaria">Imobiliária</option>
              <option value="corretor">Corretor de Imóveis</option>
              <option value="proprietario">Proprietário (Imóvel)</option>
              <option value="loja">Loja de Veículos</option>
              <option value="particular">Particular (Veículo)</option>
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-txt-secondary pointer-events-none" />
          </div>
          
          <Link 
            href="/anunciar-imoveis-carros-e-motos/" 
            className="w-full md:w-auto h-[56px] px-10 bg-white text-brand-primary font-extrabold text-[17px] rounded-[60px] flex items-center justify-center hover:bg-white/90 transition-colors shadow-lg"
          >
            Anunciar
          </Link>
        </div>

      </div>
    </section>
  );
}
