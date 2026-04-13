import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ArrowUpDown,
  Bath,
  BedDouble,
  Building2,
  Camera,
  Car,
  ChevronDown,
  Grid3X3,
  Heart,
  Home,
  LocateFixed,
  MapPin,
  MessageCircle,
  Ruler,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const filters = [
  {
    title: "Tipos de imóveis",
    options: ["Apartamento", "Casas & Sobrados", "Kitnets & Stúdios"],
    action: "Mais tipos de imóveis",
  },
  {
    title: "Preço à partir de",
    range: ["Até"],
  },
  {
    title: "Quantidade de quartos",
    pills: ["+ 1", "+ 2", "+ 3", "+ 4"],
  },
  {
    title: "Banheiros",
    pills: ["+ 1", "+ 2", "+ 3", "+ 4"],
  },
  {
    title: "Garagens",
    pills: ["+ 1", "+ 2", "+ 3", "+ 4"],
  },
  {
    title: "Área útil (m²) de",
    range: ["Até"],
  },
  {
    title: "Área de Lazer",
    checks: ["Brinquedoteca", "Churrasqueira", "Espaço gourmet", "Piscina", "Playground", "Salão de festas", "Salão de jogos"],
  },
  {
    title: "Conveniências",
    checks: ["Ar-condicionado", "Armários Planejados", "Elevador", "Hidromassagem", "Jardim", "Lareira", "Mobiliado", "Quintal", "Sauna", "Varanda"],
  },
  {
    title: "Funcional",
    checks: ["Área de serviço", "Ático", "Closet", "Dependência de Empregada", "Edícula", "Escritório", "Lavabo", "Lavanderia"],
  },
  {
    title: "Segurança",
    checks: ["Circuito de segurança", "Guarita", "Interfone", "Portaria"],
  },
  {
    title: "Tipo de Vendedor",
    checks: ["Direto com proprietário", "Somente Imobiliárias"],
  },
];

const properties = [
  {
    title: "Casa comercial com 2 salas à venda na Rua da Emílio Ferdinando Schroeder, 48, Agronômica, Florianópolis por R$ 2.350.000",
    address: "Rua Da Emílio Ferdinando Schroeder, 48",
    location: "Agronômica, Florianópolis/SC",
    area: "281m²",
    beds: "2",
    baths: "1",
    parking: "2",
    price: "R$ 2.350.000",
    feeLabel: "Iptu:",
    fee: "R$ 2.645",
    images: ["/images/casa-comercial-com-2-salas---v-01ba2ce67e.jpg", "/images/casa-comercial-com-2-salas---v-14d52942fa.jpg"],
  },
  {
    title: "Loja Comercial para Locação no Bairro Santo Agostinho – 154m²",
    address: "Endereço indisponível",
    location: "Santo Agostinho, Belo Horizonte/MG",
    area: "154m²",
    beds: "",
    baths: "2",
    parking: "",
    price: "R$ 11.000",
    feeLabel: "Iptu:",
    fee: "R$ 232",
    images: ["/images/loja-comercial-para-loca--o-no-c1f36d8e52.jpg", "/images/loja-comercial-para-loca--o-no-bc31fca628.jpg"],
  },
  {
    title: "Lançamento a 100 metros do mar com financiamento direto com a construtora sem burocracia",
    address: "Rua Fernão Dias, 33",
    location: "Aviação, Praia Grande/SP",
    area: "74.592m²",
    beds: "2",
    baths: "1",
    parking: "1",
    price: "R$ 589.193",
    feeLabel: "A partir de",
    fee: "Em Obras",
    badge: "Lançamento",
    images: ["/images/lan-amento-a-100-metros-do-mar-3972cccce2.jpg", "/images/lan-amento-a-100-metros-do-mar-d04931d857.jpg"],
  },
  {
    title: "Sala Comercial para Locação em São Paulo, República, 2 banheiros",
    address: "Avenida Ipiranga, 1071",
    location: "República, São Paulo/SP",
    area: "93m²",
    beds: "",
    baths: "2",
    parking: "",
    price: "R$ 4.000",
    feeLabel: "Condomínio",
    fee: "R$ 2.336",
    images: ["/images/sala-comercial-para-loca--o-em-92ee1d4d44.jpg", "/images/sala-comercial-para-loca--o-em-dcb185174a.jpg"],
  },
  {
    title: "Apartamento para Venda em Ribeirão Preto, Vila do Golf, 2 dormitórios, 1 suíte, 2 banheiros, 2 vagas",
    address: "Endereço indisponível",
    location: "Vila do Golf, Ribeirão Preto/SP",
    area: "81m²",
    beds: "2",
    baths: "2",
    parking: "2",
    price: "R$ 530.000",
    feeLabel: "Condomínio",
    fee: "R$ 700",
    images: ["/images/apartamento-para-venda-em-ribe-dbe0c2271a.jpg", "/images/apartamento-para-venda-em-ribe-ccc271ecdd.jpg"],
  },
  {
    title: "Sobrado com 134m² 3 quartos, para aluguel, no bairro Jardim Cruzeiro em São José dos Pinhais",
    address: "Rua Margarida Pianaro Moro",
    location: "Jardim Cruzeiro, São José dos Pinhais/PR",
    area: "134m²",
    beds: "3",
    baths: "3",
    parking: "3",
    price: "R$ 4.300",
    feeLabel: "Iptu:",
    fee: "R$ 1.200",
    badge: "Destaque",
    images: ["/images/sobrado-com-134m--3-quartos--p-40c678b3d4.jpg", "/images/sobrado-com-134m--3-quartos--p-0c284ae5ae.jpg"],
  },
  {
    title: "Apartamento com 2 quartos à venda na Rua Marechal Hermes, 220, Glória, Joinville",
    address: "Rua Marechal Hermes, 220",
    location: "Glória, Joinville/SC",
    area: "78m²",
    beds: "2",
    baths: "2",
    parking: "3",
    price: "R$ 650.000",
    feeLabel: "Condomínio",
    fee: "R$ 409",
    images: ["/images/apartamento-com-2-quartos---ve-e698d3ef94.jpg", "/images/apartamento-com-2-quartos---ve-63cb687b80.jpg"],
  },
  {
    title: "Sobrado 120m² no Bairro Osvaldo Cruz – Espaço, Conforto e Excelente Localização",
    address: "Rua Bom Pastor, 9999",
    location: "Osvaldo Cruz, São Caetano do Sul/SP",
    area: "120m²",
    beds: "3",
    baths: "2",
    parking: "2",
    price: "R$ 3.300",
    feeLabel: "Iptu:",
    fee: "R$ 115",
    images: ["/images/sobrado-120m--no-bairro-osvald-b221f6c911.jpg", "/images/sobrado-120m--no-bairro-osvald-ca181cb7ab.jpg"],
  },
  {
    title: "Lote em Condomínio Fechado para Venda em Teresópolis, Prata",
    address: "Endereço indisponível",
    location: "Prata, Teresópolis/RJ",
    area: "966m²",
    beds: "",
    baths: "",
    parking: "",
    price: "R$ 300.000",
    feeLabel: "",
    fee: "",
    images: ["/images/lote-em-condom-nio-fechado-par-a86333566e.jpg", "/images/lote-em-condom-nio-fechado-par-04642fe793.jpg"],
  },
  {
    title: "Prédio à venda ou alugar no Bairro Vila Marina - Santo André/SP",
    address: "Rua Coronel Seabra",
    location: "Vila Marina, Santo André/SP",
    area: "469m²",
    beds: "",
    baths: "5",
    parking: "6",
    price: "R$ 12.500",
    feeLabel: "Venda ou aluguel",
    fee: "R$ 2.800.000",
    images: ["/images/pr-dio---venda-ou-alugar-no-ba-08f3d92c6b.jpg", "/images/pr-dio---venda-ou-alugar-no-ba-8b904379db.jpg"],
  },
];

const agencyCards = [
  { image: "/images/casa-com-3-quartos-para-alugar-add6057170.jpg", title: "Casa com 3 quartos para alugar na Rua Inglês de Souza, 260", price: "R$ 6.900" },
  { image: "/images/apartamento-com-1-quarto---ven-10fed796e1.jpg", title: "Apartamento com 1 quarto à venda na Rua Professor Dario Veloso", price: "R$ 380.000" },
  { image: "/images/casa-em-condom-nio-fechado-com-793bd780b4.jpg", title: "Casa em condomínio fechado com 4 quartos à venda", price: "R$ 1.650.000" },
  { image: "/images/apartamento-com-67-11m--2-quar-a55450d35e.jpg", title: "Apartamento com 67,11m² 2 quartos, à venda", price: "R$ 345.000" },
  { image: "/images/casa-com-2-quartos---venda-na--8565eb9b5e.jpg", title: "Casa com 2 quartos à venda na Rua Vereador Edson Bello", price: "R$ 280.000" },
];

function FilterSidebar() {
  return (
    <aside className="hidden xl:block w-[300px] shrink-0 sticky top-[94px] h-[calc(100vh-112px)] overflow-hidden hover:overflow-y-auto scrollbar-hide rounded-xl border border-[#ddd] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[21px] leading-[30px] font-bold text-[#323131]">Filtros</h2>
          <button className="text-[13px] font-semibold text-[#eb0027]">Limpar tudo</button>
        </div>
        <div className="rounded-xl border border-[#f4c8d0] bg-[#fff0f2] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[13px] font-bold text-[#323131]">Seleção atual</p>
            <p className="text-[13px] font-bold text-[#eb0027]">Nenhum filtro</p>
          </div>
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
              <div className="space-y-2">
                {filter.checks.map((check) => (
                  <label key={check} className="flex items-center gap-2 text-[13px] font-medium text-[#5e5c5d]">
                    <span className="h-4 w-4 rounded border border-[#d1d0d0] bg-white" />
                    {check}
                  </label>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </aside>
  );
}

function SearchStrip() {
  return (
    <div className="rounded-b-[18px] bg-white px-4 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] md:px-6">
      <div className="mx-auto flex max-w-[980px] flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex flex-1 items-center rounded-xl border border-[#d1d0d0] bg-white px-4 py-3">
          <Search className="mr-3 h-5 w-5 text-[#717169]" />
          <span className="text-[15px] font-semibold text-[#323131]">Imóveis</span>
          <span className="mx-3 h-5 w-px bg-[#ddd]" />
          <span className="text-[15px] text-[#717169]">Em todo Brasil</span>
        </div>
        <button className="h-12 rounded-xl bg-[#eb0027] px-8 text-[15px] font-bold text-white">Buscar</button>
      </div>
    </div>
  );
}

function PropertyCard({ property, priority = false }: { property: (typeof properties)[number]; priority?: boolean }) {
  const details = [
    { value: property.area, icon: Ruler },
    { value: property.beds, icon: BedDouble },
    { value: property.baths, icon: Bath },
    { value: property.parking, icon: Car },
  ].filter((item) => item.value);

  return (
    <article className="overflow-hidden rounded-xl border border-[#ddd] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
      <div className="grid md:grid-cols-[248px_1fr]">
        <Link href="#" className="relative block h-[210px] md:h-full min-h-[250px] overflow-hidden bg-[#f4f5f7]">
          <Image src={property.images[0]} alt={property.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 248px" priority={priority} unoptimized />
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-bold text-white">
            <Camera className="h-3.5 w-3.5" />
            1/2
          </div>
          {property.badge && (
            <span className="absolute bottom-3 left-3 rounded-full bg-[#872bff] px-3 py-1 text-xs font-bold text-white">{property.badge}</span>
          )}
        </Link>
        <div className="flex min-h-[250px] flex-col p-4 md:p-5">
          <div className="flex items-start gap-4">
            <Link href="#" className="flex-1">
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
              <span key={`${property.title}-${detail.value}-${index}`} className="flex items-center gap-1.5">
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
            <button className="flex h-11 items-center justify-center gap-2 rounded-[60px] bg-[#eb0027] px-6 text-[15px] font-bold text-white">
              <MessageCircle className="h-4 w-4" />
              Contatar
            </button>
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
    <div className="min-h-screen bg-[#f4f5f7] font-sans text-[#323131]">
      <Header />
      <div className="mx-auto flex max-w-[1320px] items-start gap-6 px-4 py-5">
        <FilterSidebar />
        <main className="min-w-0 flex-1 pb-12">
          <SearchStrip />
          <div className="mx-auto max-w-[980px] px-4 py-5 md:px-6">
            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <nav className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-[#717169]">
                  <Link href="#" className="text-[#475cff]">Imóveis</Link>
                  <span>/</span>
                  <span>Em todo Brasil</span>
                </nav>
                <h1 className="text-[28px] font-extrabold leading-9 tracking-[0.2px] text-[#323131] md:text-[38px] md:leading-[46px]">4.530.289 Imóveis em todo Brasil</h1>
              </div>
              <div className="flex gap-2">
                <button className="flex h-11 items-center gap-2 rounded-xl border border-[#d1d0d0] bg-white px-4 text-[15px] font-bold text-[#323131] xl:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                </button>
                <button className="flex h-11 items-center gap-2 rounded-xl border border-[#d1d0d0] bg-white px-4 text-[15px] font-bold text-[#323131]">
                  <ArrowUpDown className="h-4 w-4" />
                  <span className="hidden sm:inline">Ordernar por</span>
                  <span className="text-[#717169]">Mais relevantes</span>
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {properties.slice(0, 5).map((property, index) => (
                <PropertyCard key={property.title} property={property} priority={index === 0} />
              ))}
              <AgencySection />
              {properties.slice(5).map((property) => (
                <PropertyCard key={property.title} property={property} />
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
