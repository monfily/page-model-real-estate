import { notFound } from "next/navigation";
import { getPropertyBySlugAndId } from "@/lib/properties";
import { Header } from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import {
  Bath,
  BedDouble,
  Car,
  ChevronLeft,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  Share2,
} from "lucide-react";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const property = getPropertyBySlugAndId(slug, id);
  if (!property) notFound();

  const details = [
    { value: property.area, icon: Ruler },
    { value: property.beds ? `${property.beds} quartos` : null, icon: BedDouble },
    { value: property.suites ? `${property.suites} suítes` : null, icon: BedDouble },
    { value: property.baths ? `${property.baths} banheiros` : null, icon: Bath },
    { value: property.parking ? `${property.parking} vagas` : null, icon: Car },
  ].filter((d) => d.value);

  return (
    <div className="min-h-screen bg-[#f4f5f7] font-sans text-[#323131]">
      <Header />
      <div className="mx-auto max-w-[1200px] px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-2 text-[13px] font-semibold text-[#717169]">
          <Link href="/comprar" className="flex items-center gap-1 text-[#475cff] hover:underline">
            <ChevronLeft className="h-4 w-4" />
            Voltar aos imóveis
          </Link>
        </nav>

        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          <div className="space-y-5">
            {/* Gallery */}
            <div className="relative rounded-2xl overflow-hidden h-[320px] sm:h-[420px] bg-[#1a1a1a]">
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover"
                sizes="800px"
                unoptimized
                priority
              />
              {property.badge && (
                <span className="absolute top-4 left-4 bg-[#872bff] text-white text-sm font-bold px-3 py-1 rounded-full">
                  {property.badge}
                </span>
              )}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="flex items-center gap-1.5 bg-black/60 text-white text-[12px] font-bold px-3 py-2 rounded-full hover:bg-black/80">
                  <Share2 className="h-3.5 w-3.5" />
                  Compartilhar
                </button>
                <button className="bg-black/60 text-white p-2 rounded-full hover:bg-black/80">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              {property.images.length > 1 && (
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {property.images.slice(0, 3).map((img, i) => (
                    <div key={i} className="relative h-12 w-16 rounded overflow-hidden border-2 border-white">
                      <Image src={img} alt="" fill className="object-cover" unoptimized />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Title */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h1 className="text-[20px] sm:text-[24px] font-extrabold leading-tight text-[#323131]">
                {property.title}
              </h1>
              <div className="mt-2 flex items-center gap-1 text-[14px] font-medium text-[#717169]">
                <MapPin className="h-4 w-4 shrink-0 text-[#eb0027]" />
                {property.address}
                {property.zipCode && <span className="text-[#b0afaf]"> · CEP {property.zipCode}</span>}
              </div>
              <p className="mt-1 text-[14px] font-medium text-[#717169] pl-5">{property.location}</p>
            </div>

            {/* Price */}
            <div className="bg-[#fff8f8] rounded-2xl p-5 border border-[#f4c8d0] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <p className="text-[32px] font-extrabold text-[#323131] leading-none">{property.price}</p>
              {(property.feeLabel || property.fee) && (
                <p className="mt-2 text-[14px] font-semibold text-[#717169]">
                  {property.feeLabel && <span>{property.feeLabel} </span>}
                  <span className="text-[#323131] font-bold">{property.fee}</span>
                </p>
              )}
            </div>

            {/* Specs */}
            {details.length > 0 && (
              <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <h2 className="text-[16px] font-bold text-[#323131] mb-3">Características</h2>
                <div className="flex flex-wrap gap-3">
                  {details.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 bg-[#f6f5f5] rounded-xl px-4 py-3">
                      <d.icon className="h-4 w-4 text-[#717169] shrink-0" />
                      <span className="text-[14px] font-bold text-[#323131]">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {property.description && (
              <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <h2 className="text-[16px] font-bold text-[#323131] mb-3">Descrição</h2>
                {property.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-[14px] text-[#5e5c5d] leading-relaxed mb-3">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Amenities */}
            {((property.privativeAmenities?.length ?? 0) > 0 || (property.commonAmenities?.length ?? 0) > 0) && (
              <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <h2 className="text-[16px] font-bold text-[#323131] mb-4">Comodidades</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {(property.privativeAmenities?.length ?? 0) > 0 && (
                    <div>
                      <p className="text-[13px] font-bold text-[#717169] uppercase tracking-wide mb-2">Privativas</p>
                      <ul className="space-y-2">
                        {property.privativeAmenities!.map((a) => (
                          <li key={a} className="flex items-center gap-2 text-[14px] font-medium text-[#323131]">
                            <span className="h-2 w-2 rounded-full bg-[#eb0027] shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {(property.commonAmenities?.length ?? 0) > 0 && (
                    <div>
                      <p className="text-[13px] font-bold text-[#717169] uppercase tracking-wide mb-2">Condomínio</p>
                      <ul className="space-y-2">
                        {property.commonAmenities!.map((a) => (
                          <li key={a} className="flex items-center gap-2 text-[14px] font-medium text-[#323131]">
                            <span className="h-2 w-2 rounded-full bg-[#475cff] shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Map */}
            {property.lat && property.lon && (
              <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <h2 className="text-[16px] font-bold text-[#323131] mb-3">Localização</h2>
                <div className="relative h-[200px] rounded-xl overflow-hidden bg-gradient-to-br from-[#dce6f1] to-[#c8d8e8] flex items-center justify-center">
                  <div className="text-center space-y-1">
                    <MapPin className="h-8 w-8 text-[#eb0027] mx-auto" />
                    <p className="text-[13px] font-bold text-[#323131]">{property.address}</p>
                    <p className="text-[12px] font-medium text-[#717169]">{property.location}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact sidebar */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border border-[#ddd] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] space-y-3">
              <h3 className="text-[16px] font-bold text-[#323131]">Fale com o anunciante</h3>
              <p className="text-[13px] font-medium text-[#717169]">Envie uma mensagem ou ligue agora</p>

              <input type="text" placeholder="Seu nome" className="w-full h-11 rounded-xl border border-[#d1d0d0] px-4 text-[14px] font-medium text-[#323131] placeholder:text-[#b0afaf] focus:outline-none focus:border-[#eb0027]" />
              <input type="email" placeholder="Seu e-mail" className="w-full h-11 rounded-xl border border-[#d1d0d0] px-4 text-[14px] font-medium text-[#323131] placeholder:text-[#b0afaf] focus:outline-none focus:border-[#eb0027]" />
              <textarea rows={3} defaultValue="Olá, tenho interesse neste imóvel!" className="w-full rounded-xl border border-[#d1d0d0] px-4 py-3 text-[14px] font-medium text-[#323131] focus:outline-none focus:border-[#eb0027] resize-none" />

              <button className="w-full h-12 rounded-[60px] bg-[#eb0027] text-white font-bold text-[15px] hover:bg-[#d60023] transition-colors flex items-center justify-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Enviar mensagem
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${property.whatsapp ?? "5548900000000"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 rounded-[60px] bg-[#25d366] text-white font-bold text-[14px] flex items-center justify-center gap-1.5 hover:bg-[#20bd5a] transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a href={`tel:${property.phone ?? ""}`} className="h-11 rounded-[60px] border-2 border-[#323131] text-[#323131] font-bold text-[14px] flex items-center justify-center gap-1.5 hover:bg-[#f6f5f5] transition-colors">
                  <Phone className="h-4 w-4" />
                  Ligar
                </a>
              </div>

              <p className="text-[12px] font-semibold text-[#717169] leading-relaxed bg-[#f6f5f5] rounded-xl p-3">
                🔒 Nunca transfira dinheiro antes de visitar o imóvel pessoalmente.
              </p>
              <p className="text-[12px] font-medium text-[#b0afaf] text-center">
                Código: {property.id.replace("id-", "")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
