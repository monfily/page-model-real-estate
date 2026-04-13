import Link from "next/link";
import Image from "next/image";
import { Logo } from "./Logo";

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function IconYoutube() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="#191B27" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  );
}
function IconTiktok() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
function IconLinkedin() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-[#191B27] text-white pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-[1280px] mx-auto space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-[14px]">
          
          {/* Column 1 */}
          <div className="space-y-4">
            <h4 className="font-bold text-white/50 uppercase tracking-wider text-[11px]">Institucional</h4>
            <ul className="space-y-3 font-medium">
              <li><Link href="#" className="hover:text-white/70 transition-colors">Quem somos</Link></li>
              <li><Link href="#" className="hover:text-white/70 transition-colors">Fale conosco</Link></li>
              <li><Link href="#" className="hover:text-white/70 transition-colors">Integradores parceiros</Link></li>
              <li><Link href="#" className="hover:text-white/70 transition-colors">Trabalhe conosco</Link></li>
              <li><Link href="#" className="hover:text-white/70 transition-colors">Cod. defesa do consumidor</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h4 className="font-bold text-white/50 uppercase tracking-wider text-[11px]">Imóveis</h4>
            <ul className="space-y-3 font-medium">
              <li><Link href="#" className="hover:text-white/70 transition-colors">Imóveis novos</Link></li>
              <li><Link href="#" className="hover:text-white/70 transition-colors">Comprar imóveis</Link></li>
              <li><Link href="#" className="hover:text-white/70 transition-colors">Alugar imóveis</Link></li>
              <li><Link href="#" className="hover:text-white/70 transition-colors">Anunciar imóvel</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h4 className="font-bold text-white/50 uppercase tracking-wider text-[11px]">Veículos</h4>
            <ul className="space-y-3 font-medium">
              <li><Link href="#" className="hover:text-white/70 transition-colors">Comprar carros</Link></li>
              <li><Link href="#" className="hover:text-white/70 transition-colors">Comprar motos</Link></li>
              <li><Link href="#" className="hover:text-white/70 transition-colors">Anunciar veículos</Link></li>
              <li><Link href="#" className="hover:text-white/70 transition-colors">Tabela FIPE</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-4">
            <h4 className="font-bold text-white/50 uppercase tracking-wider text-[11px]">Blog de Imóveis</h4>
            <ul className="space-y-3 font-medium">
              <li><Link href="#" className="hover:text-white/70 transition-colors">Decoração</Link></li>
              <li><Link href="#" className="hover:text-white/70 transition-colors">Dicas e Reformas</Link></li>
              <li><Link href="#" className="hover:text-white/70 transition-colors">Guias</Link></li>
              <li><Link href="#" className="hover:text-white/70 transition-colors">Melhores Bairros</Link></li>
              <li><Link href="#" className="hover:text-white/70 transition-colors">Mercado Imobiliário</Link></li>
            </ul>
          </div>

          {/* Column 5 */}
          <div className="space-y-4">
            <h4 className="font-bold text-white/50 uppercase tracking-wider text-[11px]">Blog de Veículos</h4>
            <ul className="space-y-3 font-medium">
              <li><Link href="#" className="hover:text-white/70 transition-colors">Guia de Carros</Link></li>
              <li><Link href="#" className="hover:text-white/70 transition-colors">Guia de Motos</Link></li>
              <li><Link href="#" className="hover:text-white/70 transition-colors">Avaliações</Link></li>
              <li><Link href="#" className="hover:text-white/70 transition-colors">Notícias</Link></li>
            </ul>
          </div>

          {/* Column 6 */}
          <div className="space-y-4">
            <h4 className="font-bold text-white/50 uppercase tracking-wider text-[11px]">Precisa de ajuda?</h4>
            <ul className="space-y-3 font-medium">
              <li><Link href="#" className="hover:text-white/70 transition-colors">Central de ajuda</Link></li>
            </ul>
            
            <div className="pt-6 space-y-3">
              <h4 className="font-bold text-white/50 uppercase tracking-wider text-[11px]">Aplicativo disponível em:</h4>
              <div className="flex flex-col gap-2">
                <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  <Image src="/images/app-chavesnam-o-android-5c9fd3d78a.png" alt="Google Play" width={120} height={36} unoptimized />
                </Link>
                <Link href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  <Image src="/images/app-chavesnam-o-ios-862e08884b.png" alt="App Store" width={120} height={36} unoptimized />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10" />

        {/* Bottom Area */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          <div className="flex flex-col items-center md:items-start space-y-4 max-w-sm text-center md:text-left">
            <div className="opacity-100 brightness-0 invert">
              <Logo className="h-8 w-auto" />
            </div>
            <p className="text-white/80 font-medium text-[15px] italic">
              "Há uma história por trás de toda virada de chave. Quem procura, vira a chave para o seu sonho."
            </p>
            <p className="font-bold text-[17px]">
              Chaves na Mão. Procurou, virou.
            </p>
          </div>

          <div className="flex gap-4">
            <Link href="http://www.facebook.com/ChavesNaMao" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <IconFacebook />
            </Link>
            <Link href="https://www.youtube.com/ChavesNaMao" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <IconYoutube />
            </Link>
            <Link href="https://www.tiktok.com/@portalchavesnamao" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <IconTiktok />
            </Link>
            <Link href="https://instagram.com/chavesnamao/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <IconInstagram />
            </Link>
            <Link href="https://www.linkedin.com/company/chavesnamao/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <IconLinkedin />
            </Link>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center md:text-left text-white/50 text-[13px] pt-4 flex flex-col md:flex-row justify-between items-center">
          <p>© 2013 Chaves na Mão. Todos os direitos reservados.</p>
          <div className="space-x-4 mt-2 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Termos de uso</Link>
            <span>|</span>
            <Link href="#" className="hover:text-white transition-colors">Políticas de privacidade</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
