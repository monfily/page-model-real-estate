import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FilterButton, FilterSidebar, SortDropdown, PropertyTypeChips } from "@/components/ComprarClient";
import { properties } from "@/lib/properties";
import type { Property } from "@/lib/properties";
import {
  Bath,
  BedDouble,
  Camera,
  Car,
  Heart,
  MapPin,
  MessageCircle,
  Ruler,
} from "lucide-react";

const agencyCards = [
  { image: "/images/casa-com-3-quartos-para-alugar-add6057170.jpg", title: "Casa com 3 quartos para alugar na Rua Inglês de Souza, 260", price: "R$ 6.900" },
  { image: "/images/apartamento-com-1-quarto---ven-10fed796e1.jpg", title: "Apartamento com 1 quarto à venda na Rua Professor Dario Veloso", price: "R$ 380.000" },
  { image: "/images/casa-em-condom-nio-fechado-com-793bd780b4.jpg", title: "Casa em condomínio fechado com 4 quartos à venda", price: "R$ 1.650.000" },
  { image: "/images/apartamento-com-67-11m--2-quar-a55450d35e.jpg", title: "Apartamento com 67,11m² 2 quartos, à venda", price: "R$ 345.000" },
  { image: "/images/casa-com-2-quartos---venda-na--8565eb9b5e.jpg", title: "Casa com 2 quartos à venda na Rua Vereador Edson Bello", price: "R$ 280.000" },
];

function FilterSidebar() {
  return (
    <aside
      className="hidden xl:block w-[360px] shrink-0 sticky top-[74px] max-h-[calc(100vh-74px)] overflow-y-auto py-5 scrollbar-hide"
    >
      <div className="rounded-xl border border-[#ddd] bg-white">
        {/* "Seleção atual" — sticks to top of the sidebar's own scroll area */}
        <div className="sticky top-0 z-10 rounded-t-xl border-b border-[#f4c8d0] bg-[#fff0f2] px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[13px] font-bold text-[#323131]">Seleção atual</p>
            <p className="text-[13px] font-bold text-[#eb0027]">Nenhum filtro</p>
          </div>
        </div>

        {/* Filter content — scrolls inside the sidebar without a visible scrollbar */}
        <div className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[21px] leading-[30px] font-bold text-[#323131]">Filtros</h2>
          <button className="text-[13px] font-semibold text-[#eb0027]">Limpar tudo</button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Comprar", active: true, icon: Home },
            { label: "Alugar", icon: Building2 },
            { label: "Lançamentos", icon: Grid3X3 },
          ].map((item) => (
            <button key={item.label} className={`h-[78px] rounded-xl border text-[13px] font-semibold flex flex-col items-center justify-center gap-2 ${item.active ? "border-[#eb0027] bg-[#fff0f2] text-[#eb0027]" : "border-[#ddd] text-[#323131]"}`}>
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          <p className="text-[15px] font-bold text-[#323131]">Localização</p>
          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#ddd] text-[15px] font-semibold text-[#323131]">
            <LocateFixed className="h-5 w-5 text-[#eb0027]" />
            Perto de mim
          </button>
        </div>
        {filters.map((filter) => (
          <section key={filter.title} className="space-y-3 border-t border-[#e7e6e6] pt-5">
            <button className="flex w-full items-center justify-between text-left text-[15px] font-bold text-[#323131]">
              {filter.title}
              <ChevronDown className="h-4 w-4 text-[#717169]" />
            </button>
            {filter.options && (
              <div className="grid grid-cols-3 gap-2">
                {filter.options.map((option) => (
                  <button key={option} className="min-h-[72px] rounded-xl border border-[#ddd] px-2 text-[13px] font-semibold text-[#323131]">
                    {option}
                  </button>
                ))}
                <button className="col-span-3 rounded-lg text-left text-[13px] font-bold text-[#eb0027]">{filter.action}</button>
              </div>
            )}
            {filter.range && (
              <div className="grid grid-cols-2 gap-2">
                <div className="flex h-11 items-center rounded-lg border border-[#ddd] bg-[#f6f5f5] px-3 text-[13px] text-[#8a8686]">R$ 0</div>
                <div className="flex h-11 items-center rounded-lg border border-[#ddd] bg-[#f6f5f5] px-3 text-[13px] text-[#8a8686]">{filter.range[0] === "Até" ? "R$ 0" : filter.range[0]}</div>
              </div>
            )}
            {filter.pills && (
              <div className="grid grid-cols-4 gap-2">
                {filter.pills.map((pill) => (
                  <button key={pill} className="h-9 rounded-xl border border-[#ddd] text-[13px] font-semibold text-[#323131]">{pill}</button>
                ))}
              </div>
            )}
            {filter.checks && (
              <div className="flex flex-wrap gap-2">
                {filter.checks.map((check) => (
                  <button key={check} className="rounded-xl border border-[#ddd] px-3 py-2 text-[13px] font-semibold text-[#323131] hover:border-[#eb0027] hover:text-[#eb0027] transition-colors">
                    {check}
                  </button>
                ))}
              </div>
            )}
          </section>
        ))}
        </div>
      </div>
    </aside>
  );
}

function PropertyCard({ property, priority = false }: { property: Property; priority?: boolean }) {
  const details = [
    { value: property.area, icon: Ruler },
    { value: property.beds, icon: BedDouble },
    { value: property.baths, icon: Bath },
    { value: property.parking, icon: Car },
  ].filter((item) => item.value);

  const propertyUrl = `/imovel/${property.slug}/${property.id}`;

  return (
    <article className="overflow-hidden rounded-xl border border-[#ddd] bg-white transition-shadow hover:border-[#bbb]">
      <div className="grid md:grid-cols-[340px_1fr]">
        <Link href={propertyUrl} className="relative block h-[230px] md:h-full min-h-[300px] overflow-hidden bg-[#f4f5f7]">
          <Image src={property.images[0]} alt={property.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 340px" priority={priority} unoptimized />
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-bold text-white">
            <Camera className="h-3.5 w-3.5" />
            1/{property.images.length}
          </div>
          {property.badge && (
            <span className="absolute bottom-3 left-3 rounded-full bg-[#872bff] px-3 py-1 text-xs font-bold text-white">{property.badge}</span>
          )}
        </Link>
        <div className="flex min-h-[300px] flex-col p-4 md:p-5">
          <div className="flex items-start gap-4">
            <Link href={propertyUrl} className="flex-1">
              <h2 className="line-clamp-2 text-[15px] font-bold leading-[22px] tracking-[0.2px] text-[#323131] md:text-[16px]">{property.title}</h2>
            </Link>
            <button className="rounded-full border border-[#ddd] p-2 text-[#5e5c5d]">
              <Heart className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-3 space-y-1 text-[13px] font-medium text-[#717169]">
            <p>{property.address}</p>
            <p className="flex items-center gap-1"><MapPin className="h-4 w-4" />{property.location}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-[13px] font-bold text-[#323131]">
            {details.map((detail, index) => (
              <span key={`${property.id}-${index}`} className="flex items-center gap-1.5">
                <detail.icon className="h-4 w-4 text-[#717169]" />
                {detail.value}
              </span>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-4 pt-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[24px] font-extrabold leading-8 text-[#323131]">{property.price}</p>
              {(property.feeLabel || property.fee) && (
                <p className="mt-1 text-[13px] font-semibold text-[#717169]"><span>{property.feeLabel}</span> <span className="text-[#323131]">{property.fee}</span></p>
              )}
            </div>
            <Link
              href={propertyUrl}
              className="flex h-11 items-center justify-center gap-2 rounded-[60px] bg-[#eb0027] px-6 text-[15px] font-bold text-white hover:bg-[#d60023] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Contatar
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function AgencySection() {
  return (
    <section className="rounded-xl border border-[#ddd] bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-[21px] font-bold leading-[30px] text-[#323131]">Imobiliárias no Brasil</h3>
          <p className="text-[13px] font-medium text-[#717169]">Anúncios patrocinados próximos da sua busca</p>
        </div>
        <button className="hidden rounded-[60px] border border-[#d1d0d0] px-4 py-2 text-[13px] font-bold text-[#323131] md:block">Ver todos</button>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {agencyCards.map((card) => (
          <Link href="#" key={card.title} className="overflow-hidden rounded-xl border border-[#e7e6e6] bg-white">
            <div className="relative h-[132px] bg-[#f4f5f7]">
              <Image src={card.image} alt={card.title} fill className="object-cover" sizes="180px" unoptimized />
            </div>
            <div className="p-3">
              <p className="line-clamp-2 text-[13px] font-semibold leading-5 text-[#323131]">{card.title}</p>
              <p className="mt-2 text-[15px] font-extrabold text-[#323131]">{card.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function ComprarPage() {
  return (
    <div className="flex flex-col bg-[#f4f5f7] font-sans text-[#323131]">
      <Header />

      {/* Sidebar + main content share the same constrained row */}
      <div className="flex max-w-[1440px] mx-auto w-full px-4 gap-6">
        <FilterSidebar />

        <main className="min-w-0 flex-1 py-5 pb-16">
          {/* Mobile: filter + sort buttons ABOVE the title */}
          <div className="flex gap-2 items-center mb-3 lg:hidden">
            <FilterButton />
            <SortDropdown />
          </div>

          <div className="mb-3 flex lg:items-end lg:justify-between">
            <div>
              <nav className="hidden md:flex mb-2 items-center gap-2 text-[13px] font-semibold text-[#717169]">
                <Link href="#" className="text-[#475cff]">Imóveis</Link>
                <span>/</span>
                <span>Em todo Brasil</span>
              </nav>
              <h1 className="text-[20px] font-extrabold leading-7 tracking-[0.2px] text-[#323131] md:text-[28px] md:leading-9 lg:text-[38px] lg:leading-[46px]">4.530.289 Imóveis em todo Brasil</h1>
            </div>
            {/* Desktop: sort button beside the title */}
            <div className="hidden lg:flex gap-2 items-center">
              <FilterButton />
              <SortDropdown />
            </div>
          </div>

          <PropertyTypeChips />

          <div className="mt-6 space-y-4">
            {properties.slice(0, 5).map((property, index) => (
              <PropertyCard key={property.id} property={property} priority={index === 0} />
            ))}
            <AgencySection />
            {properties.slice(5).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </main>
      </div>

      {/* Footer lives outside the constrained flex row → spans full width */}
      <Footer />
    </div>
  );
}
