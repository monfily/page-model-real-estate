import Image from "next/image";
import Link from "next/link";

export function AppSection() {
  return (
    <section className="w-full bg-[#f0f0f0] py-16 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Column (Text) */}
        <div className="flex-1 space-y-8 max-w-xl">
          <div className="space-y-4">
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-brand-txt-primary leading-tight">
              No Chaves na Mão, você encontra mais de 4 milhões de imóveis e 100 mil veículos.
            </h2>
            <p className="text-[17px] text-brand-txt-secondary leading-relaxed">
              Use o aplicativo para encontrar o imóvel ou o carro ideal, com praticidade e segurança.
            </p>
          </div>

          <div className="space-y-4 bg-white p-6 rounded-2xl border border-brand-outline shadow-sm inline-block">
            <h3 className="text-xl font-bold text-brand-txt-primary">
              Faça o download do aplicativo
            </h3>
            <p className="text-[15px] text-brand-txt-secondary max-w-sm">
              Instale o app e descubra ofertas de imóveis e veículos perto de você.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
              <div className="flex flex-col gap-3">
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  <Image 
                    src="/images/app-chavesnam-o-android-5c9fd3d78a.png" 
                    alt="Disponível no Google Play"
                    width={160}
                    height={48}
                    unoptimized
                  />
                </Link>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  <Image 
                    src="/images/app-chavesnam-o-ios-862e08884b.png" 
                    alt="Baixar na App Store"
                    width={160}
                    height={48}
                    unoptimized
                  />
                </Link>
              </div>
              
              <div className="hidden sm:flex flex-col items-center justify-center border-l border-brand-outline pl-6">
                <Image 
                  src="/images/qr-code-aeb3f3701a.jpeg" 
                  alt="QR Code para baixar o app"
                  width={100}
                  height={100}
                  className="rounded-lg shadow-sm"
                  unoptimized
                />
                <span className="text-[11px] text-brand-txt-secondary font-bold mt-2 uppercase tracking-wide">
                  Aponte a câmera
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Screenshot) */}
        <div className="flex-1 relative flex justify-center md:justify-end">
          <div className="relative w-[320px] md:w-[400px] aspect-[1/2] rotate-[-5deg] md:-mr-12 hover:rotate-0 transition-transform duration-500 ease-out">
            <Image 
              src="/images/app-chavesnam-o-ef7ae311ba.png" 
              alt="Aplicativo Chaves na Mão"
              fill
              unoptimized
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
