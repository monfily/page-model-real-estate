"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Bus,
  Car,
  Check,
  ChevronDown,
  ChevronRight,
  Heart,
  Layers,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  Send,
  Share2,
  TriangleAlert,
  CalendarDays,
  User,
} from "lucide-react";
import type { Property } from "@/lib/properties";
import { ProximidadesView } from "./ProximidadesView";

const LeafletMap = lazy(() =>
  import("./LeafletMap").then((m) => ({ default: m.LeafletMap }))
);

const FULL_DESCRIPTION = `Seja bem-vindo a esse imóvel impressionante !

Com possibilidade de ser seu novo lar ou um ponto comercial.
Esta casa espaçosa, com 4 dormitórios, incluindo 2 suítes, é a definição de conforto e elegância. Com amplas salas que proporcionam um ambiente acolhedor e convidativo, uma copa cozinha completa e uma área de serviço bem distribuída, cada detalhe foi cuidadosamente planejado para oferecer o máximo de comodidade aos seus moradores.

Além disso, conta com uma dependência de empregada com banheiro, garantindo praticidade e privacidade. Com espaço para estacionamento de até 2 carros na garagem, você e sua família desfrutarão de conveniência e segurança.

Essa linda residência ainda conta com um escritório, com lavabo e cozinha.

A varanda com um charmoso jardim é o cenário perfeito para momentos de relaxamento e contemplação. Esta casa é oferecida totalmente mobiliada, proporcionando uma mudança sem complicações e pronta para ser chamada de lar.

Situada em uma localização privilegiada, a apenas 300 metros do shopping Beira Mar, esta residência oferece acesso fácil a uma variedade de comodidades, como academias, bancos, farmácias, bares, restaurantes e até mesmo um McDonald's. A proximidade com a Avenida Beira Mar Norte e suas praças equipadas com academia ao ar livre, playground e área de lazer é um atrativo a mais para quem deseja qualidade de vida.`;

const GENERIC_DESCRIPTION = (title: string) =>
  `Excelente oportunidade! ${title}. Imóvel em ótimas condições, pronto para morar ou investir. Entre em contato para mais informações e agendar uma visita.`;

const BUS_STOPS = [
  { distance: 130, name: "Praça Governador Celso Ramos 1120" },
  { distance: 220, name: "Avenida Governador Irineu Bornhausen" },
  { distance: 320, name: "Praça Governador Celso Ramos 2855" },
  { distance: 340, name: "Rua Padre Schrader, 443" },
  { distance: 360, name: "Rua João Carvalho, 365" },
  { distance: 440, name: "Rua Rui Barbosa (06)" },
  { distance: 480, name: "Rua Ernesto Stodieck" },
];

const QUICK_QUESTIONS = [
  "Eu posso visitar?",
  "Aceita permuta?",
  "Me retorne no whatsapp!",
  "Tenho interesse, está disponível?",
];

const FINANCE_TERMS = [5, 10, 15, 20, 25, 30];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function PropertyModal({ property }: { property: Property }) {
  const router = useRouter();
  const [imgIndex, setImgIndex] = useState(0);
  const [descExpanded, setDescExpanded] = useState(false);
  const [transportOpen, setTransportOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(30);
  const [contactTab, setContactTab] = useState<"mensagem" | "visita">("mensagem");
  const [showPhone, setShowPhone] = useState(false);
  const [quickQuestion, setQuickQuestion] = useState("");
  const [customQuestion, setCustomQuestion] = useState("");
  const [msgSent, setMsgSent] = useState(false);
  const [visitSent, setVisitSent] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [weekOffset, setWeekOffset] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getWeekDays = (offset: number) => {
    const today = new Date();
    const days = [];
    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    for (let i = 0; i < 5; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + offset * 5 + i);
      days.push({
        dayName: dayNames[d.getDay()],
        day: d.getDate(),
        month: monthNames[d.getMonth()],
        key: d.toISOString().slice(0, 10),
      });
    }
    return days;
  };

  const images = property.images;
  const totalImages = images.length;

  const TABS = ["Anúncio", `${totalImages} Fotos`, "Mapa", "Street View", "Nas proximidades"];
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const isFirstProperty = property.id === "id-23890098";
  const description = isFirstProperty ? FULL_DESCRIPTION : GENERIC_DESCRIPTION(property.title);

  const entrada = Math.round(parseFloat(property.price.replace(/[^\d]/g, "")) * 0.2);
  const rawPrice = parseFloat(property.price.replace(/[^\d]/g, ""));
  const financiado = rawPrice - entrada;

  const propLat = property.lat ?? -27.5792;
  const propLon = property.lon ?? -48.5427;

  const formatBRL = (n: number) =>
    "R$ " + n.toLocaleString("pt-BR");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") router.back(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [router]);

  const specs = [
    { label: "Área total", value: property.area, icon: Ruler },
    { label: "Salas", value: property.beds || null, icon: BedDouble },
    { label: "Suítes", value: property.suites || null, icon: BedDouble },
    { label: "Banheiros", value: property.baths || null, icon: Bath },
    { label: "Garagens", value: property.parking || null, icon: Car },
  ].filter((s) => s.value);

  return (
    <div className="fixed inset-0 z-50 flex items-stretch" onClick={(e) => { if (e.target === e.currentTarget) router.back(); }}>
      {/* Dimmed backdrop */}
      <div className="flex-1 bg-black/50 cursor-pointer" onClick={() => router.back()} />

      {/* Modal panel — slides in from right */}
      <div className="relative flex flex-col bg-white w-full max-w-[1280px] shadow-2xl overflow-hidden">

        {/* ── Fixed tab nav ── */}
        <div className="shrink-0 flex items-center border-b border-[#e7e6e6] bg-white px-4 h-[56px] gap-1 z-10">
          <button
            onClick={() => router.back()}
            className="mr-2 p-2 rounded-full hover:bg-[#f6f5f5] text-[#323131] transition-colors shrink-0"
            aria-label="Voltar"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                scrollRef.current?.scrollTo({ top: 0 });
              }}
              className={`h-full px-4 text-[14px] font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "border-[#eb0027] text-[#eb0027]"
                  : "border-transparent text-[#717169] hover:text-[#323131]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Scrollable body ── */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto bg-white overflow-x-hidden">

          {/* ── FOTOS TAB ── */}
          {activeTab !== "Anúncio" && activeTab !== "Mapa" && activeTab !== "Street View" && activeTab !== "Nas proximidades" && (
            <div className="p-4 columns-2 sm:columns-3 gap-2 space-y-2">
              {images.map((src, i) => (
                <div key={i} className="relative overflow-hidden rounded-lg bg-[#111] break-inside-avoid">
                  <Image
                    src={src}
                    alt={`Foto ${i + 1}`}
                    width={600}
                    height={400}
                    className="w-full object-cover"
                    unoptimized
                  />
                  <span className="absolute top-2 right-2 bg-black/60 text-white text-[11px] font-bold rounded-full px-2 py-0.5">{i + 1}/{totalImages}</span>
                </div>
              ))}
            </div>
          )}

          {/* ── MAPA TAB ── */}
          {activeTab === "Mapa" && (
            <div className="h-[calc(100vh-56px)]">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-[#f0f4f8]"><p className="text-[14px] text-[#717169]">Carregando mapa...</p></div>}>
                <LeafletMap lat={propLat} lon={propLon} zoom={16} />
              </Suspense>
            </div>
          )}

          {/* ── STREET VIEW TAB ── */}
          {activeTab === "Street View" && (
            <div className="h-[calc(100vh-56px)]">
              <iframe
                title="Street View"
                src={`https://maps.google.com/maps?q=${propLat},${propLon}&layer=c&cbll=${propLat},${propLon}&output=svembed`}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />
            </div>
          )}

          {/* ── NAS PROXIMIDADES TAB ── */}
          {activeTab === "Nas proximidades" && (
            <div className="h-[calc(100vh-56px)]">
              <ProximidadesView lat={propLat} lon={propLon} />
            </div>
          )}

          {/* ── ANÚNCIO TAB: Gallery + Content ── */}
          {activeTab === "Anúncio" && (
          <>
          <div className="relative bg-[#111] grid grid-cols-[3fr_2fr] h-[250px] sm:h-[320px]">
            {/* Main photo */}
            <div className="relative overflow-hidden">
              <Image
                src={images[imgIndex % totalImages]}
                alt={property.title}
                fill
                className="object-cover"
                sizes="500px"
                priority
                unoptimized
              />
            </div>
            {/* Side photos */}
            <div className="grid grid-rows-2 gap-0.5 pl-0.5">
              {[1, 2].map((offset) => (
                <div key={offset} className="relative overflow-hidden bg-[#222]">
                  <Image
                    src={images[(imgIndex + offset) % totalImages]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="250px"
                    unoptimized
                  />
                </div>
              ))}
              {/* Arrow button on last photo */}
              <button
                onClick={() => setImgIndex((p) => (p + 1) % totalImages)}
                className="absolute bottom-3 right-3 bg-white/90 hover:bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center"
                aria-label="Próxima foto"
              >
                <ChevronRight className="h-4 w-4 text-[#323131]" />
              </button>
            </div>
          </div>

          {/* ── Two-column content ── */}
          <div className="grid lg:grid-cols-[1fr_380px] min-h-0">

            {/* ── LEFT: main content ── */}
            <div className="min-w-0 p-6 space-y-6 border-r border-[#f0efef]">

              {/* Breadcrumb + actions */}
              <div className="flex items-center justify-between gap-3">
                <nav className="flex items-center gap-1 text-[13px] font-semibold text-[#717169] flex-wrap">
                  {(() => {
                  const [neighborhood, cityState] = property.location.split(", ");
                  const [city, state] = (cityState ?? "").split("/");
                  const addrShort = property.address.length > 28
                    ? property.address.slice(0, 26) + "..."
                    : property.address;
                  return ["Home", "Brasil", state ?? "", city ?? "", neighborhood ?? "", addrShort].filter(Boolean);
                })().map((crumb, i, arr) => (
                    <span key={crumb} className="flex items-center gap-1">
                      <span className={i < arr.length - 1 ? "hover:underline cursor-pointer" : "text-[#323131]"}>
                        {crumb}
                      </span>
                      {i < arr.length - 1 && <ChevronRight className="h-3 w-3 shrink-0" />}
                    </span>
                  ))}
                </nav>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button className="p-1.5 rounded-full border border-[#ddd] text-[#717169] hover:text-[#eb0027] transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 rounded-full border border-[#ddd] text-[#717169] hover:text-[#eb0027] transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Price row */}
              <div className="flex items-start gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#717169] uppercase tracking-wide">Venda</p>
                  <div className="flex items-center gap-3 flex-wrap mt-0.5">
                    <p className="text-[32px] font-extrabold text-[#323131] leading-none">{property.price}</p>
                    <button className="h-9 rounded-lg bg-[#eb0027] px-5 text-[14px] font-bold text-white hover:bg-[#d60023] transition-colors shrink-0">
                      Ver parcelas
                    </button>
                  </div>
                  <p className="mt-1.5 text-[13px] font-semibold text-[#717169]">
                    Condomínio: R$ - &nbsp;•&nbsp;
                    {property.feeLabel && property.fee
                      ? `${property.feeLabel} ${property.fee}`
                      : "IPTU: —"}
                  </p>
                </div>
                {/* Mini map */}
                <div className="relative shrink-0 w-[120px] h-[72px] rounded-lg overflow-hidden border border-[#ddd] bg-[#e8ecf0] cursor-pointer hover:opacity-90 transition-opacity">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#dce6f1] to-[#c8d8e8]" />
                  <div className="absolute inset-0 flex items-center justify-center p-2">
                    <div className="text-center">
                      <MapPin className="h-4 w-4 text-[#eb0027] mx-auto mb-0.5" />
                      <p className="text-[9px] font-bold text-[#323131] leading-tight line-clamp-2">
                        {property.address}, {property.location}
                      </p>
                    </div>
                  </div>
                  <div className="absolute right-1 top-1/2 -translate-y-1/2">
                    <ChevronRight className="h-3 w-3 text-[#717169]" />
                  </div>
                </div>
              </div>

              {/* Specs */}
              <div className="flex flex-wrap gap-6 border-t border-[#f0efef] pt-5">
                {specs.map((s) => (
                  <div key={s.label} className="text-center min-w-[56px]">
                    <div className="flex items-center gap-1 text-[#717169] justify-center mb-1">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <p className="text-[12px] font-semibold text-[#717169]">{s.label}</p>
                    <p className="text-[16px] font-extrabold text-[#323131]">{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#f0efef]" />

              {/* Category + Title */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 bg-[#f6f5f5] rounded-full px-3 py-1.5 text-[13px] font-bold text-[#5e5c5d]">
                  <Layers className="h-4 w-4" />
                  Casa / Sobrado Comercial
                </div>
                <h1 className="text-[20px] font-extrabold leading-snug text-[#323131]">
                  {property.title}
                </h1>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h2 className="text-[17px] font-bold text-[#323131]">Descrição</h2>
                <p className="text-[13px] text-[#717169] font-medium">
                  Última atualização: 14/02/2026 às 12:06h{property.ref ? ` | Ref: ${property.ref}` : ""}
                </p>
                <div className={`text-[14px] text-[#5e5c5d] leading-relaxed space-y-2 ${!descExpanded ? "line-clamp-[9]" : ""}`}>
                  {description.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <button
                  onClick={() => setDescExpanded((p) => !p)}
                  className="flex items-center gap-1 text-[#eb0027] text-[14px] font-bold mt-1"
                >
                  <ChevronDown className={`h-4 w-4 transition-transform ${descExpanded ? "rotate-180" : ""}`} />
                  {descExpanded ? "Ver menos" : "Ver descrição completa"}
                </button>
              </div>

              <div className="border-t border-[#f0efef]" />

              {/* Amenities */}
              {((property.privativeAmenities?.length ?? 0) > 0 || (property.commonAmenities?.length ?? 0) > 0) && (
                <div className="space-y-4">
                  {(property.privativeAmenities?.length ?? 0) > 0 && (
                    <div>
                      <h2 className="text-[16px] font-bold text-[#323131] mb-3">Área privativa</h2>
                      <div className="grid grid-cols-3 gap-y-2.5 gap-x-4">
                        {property.privativeAmenities!.map((a) => (
                          <div key={a} className="flex items-center gap-1.5 text-[14px] font-medium text-[#5e5c5d]">
                            <Check className="h-4 w-4 text-[#22c55e] shrink-0" strokeWidth={3} />
                            {a}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {(property.commonAmenities?.length ?? 0) > 0 && (
                    <div>
                      <h2 className="text-[16px] font-bold text-[#323131] mb-3">Área comum</h2>
                      <div className="grid grid-cols-3 gap-y-2.5 gap-x-4">
                        {property.commonAmenities!.map((a) => (
                          <div key={a} className="flex items-center gap-1.5 text-[14px] font-medium text-[#5e5c5d]">
                            <Check className="h-4 w-4 text-[#22c55e] shrink-0" strokeWidth={3} />
                            {a}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="border-t border-[#f0efef]" />

              {/* Quick questions */}
              <div className="space-y-3">
                <h2 className="text-[17px] font-bold text-[#323131]">Perguntas rápidas para o anunciante</h2>
                <p className="text-[13px] text-[#717169] font-medium">
                  Faça perguntas rápidas ao anunciante ou simplesmente escreva a sua própria pergunta.
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => setQuickQuestion(q === quickQuestion ? "" : q)}
                      className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
                        quickQuestion === q
                          ? "border-[#eb0027] bg-[#fff0f2] text-[#eb0027]"
                          : "border-[#ddd] text-[#5e5c5d] hover:border-[#717169]"
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Escreva sua pergunta..."
                    maxLength={200}
                    value={customQuestion || quickQuestion}
                    onChange={(e) => { setCustomQuestion(e.target.value); setQuickQuestion(""); }}
                    className="flex-1 h-11 rounded-xl border border-[#d1d0d0] px-3 text-[14px] font-medium text-[#323131] placeholder:text-[#b0afaf] focus:outline-none focus:border-[#eb0027]"
                  />
                  <button
                    className="h-11 w-11 shrink-0 rounded-xl bg-[#eb0027] flex items-center justify-center hover:bg-[#d60023] transition-colors"
                    aria-label="Enviar pergunta"
                  >
                    <Send className="h-5 w-5 text-white" />
                  </button>
                </div>
                <p className="text-[12px] text-[#b0afaf]">0/200</p>
              </div>

              <div className="border-t border-[#f0efef]" />

              {/* Proximidades */}
              <div className="space-y-3">
                <h2 className="text-[17px] font-bold text-[#323131]">Proximidades do imóvel</h2>
                <p className="text-[13px] text-[#717169] font-medium">
                  Descubra o que há de melhor ao redor desta casa / sobrado comercial na Agronômica, em Florianópolis.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: MapPin, title: "Proximidades", desc: "Conheça o entorno do imóvel" },
                    { icon: Car, title: "Street View", desc: "Dê uma volta na vizinhança" },
                  ].map((item) => (
                    <button
                      key={item.title}
                      className="flex flex-col items-start gap-1 rounded-xl border border-[#ddd] p-4 text-left hover:border-[#eb0027] hover:bg-[#fff8f8] transition-colors"
                    >
                      <item.icon className="h-5 w-5 text-[#eb0027]" />
                      <p className="text-[14px] font-bold text-[#323131]">{item.title}</p>
                      <p className="text-[13px] text-[#717169]">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Transport */}
              {isFirstProperty && (
                <div className="border-t border-[#f0efef]">
                  <button
                    onClick={() => setTransportOpen((p) => !p)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#fff0f2] flex items-center justify-center shrink-0">
                        <Bus className="h-4 w-4 text-[#eb0027]" />
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-[#323131]">Transporte</p>
                        <p className="text-[13px] text-[#717169] font-medium">
                          Esta casa / sobrado comercial na Agronômica tem fácil acesso ao transporte público.
                        </p>
                      </div>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-[#717169] transition-transform shrink-0 ${transportOpen ? "rotate-180" : ""}`} />
                  </button>
                  {transportOpen && (
                    <div className="pb-4 space-y-2 pl-12">
                      {BUS_STOPS.map((stop) => (
                        <div key={stop.name} className="flex items-center gap-3 text-[14px] font-medium text-[#5e5c5d]">
                          <span className="shrink-0 bg-[#f6f5f5] rounded-full px-2 py-0.5 text-[12px] font-bold text-[#717169]">
                            {stop.distance}m
                          </span>
                          {stop.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Warning */}
              <div className="border-t border-[#f0efef]">
                <button
                  onClick={() => setWarningOpen((p) => !p)}
                  className="w-full flex items-center justify-between py-3 text-left rounded-xl border border-[#e5e5e5] bg-[#fafafa] px-4 mt-3"
                >
                  <div className="flex items-start gap-2">
                    <TriangleAlert className="h-5 w-5 text-[#d97706] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[14px] font-bold text-[#323131]">Cuidados a serem tomados:</p>
                      <p className="text-[13px] text-[#5e5c5d] font-medium leading-relaxed mt-0.5">
                        Nunca faça nenhum pagamento antecipado. O Portal serve apenas como divulgação, sendo assim não se responsabiliza pelas negociações feitas.
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-[#717169] transition-transform shrink-0 ml-2 ${warningOpen ? "rotate-180" : ""}`} />
                </button>
                {warningOpen && (
                  <div className="px-4 pb-3">
                    <button className="text-[13px] font-bold text-[#717169] underline mt-2">Denunciar</button>
                  </div>
                )}
              </div>

              <div className="border-t border-[#f0efef]" />

              {/* Finance simulation */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-[17px] font-bold text-[#323131]">Simular financiamento</h2>
                  <div className="text-right">
                    <p className="text-[12px] font-semibold text-[#717169]">Valor a ser financiado</p>
                    <p className="text-[20px] font-extrabold text-[#eb0027]">{formatBRL(financiado)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12px] font-bold text-[#717169] mb-1 block">Valor do imóvel</label>
                    <div className="h-11 rounded-xl border border-[#d1d0d0] px-3 flex items-center text-[14px] font-semibold text-[#323131] bg-[#fafafa]">
                      {property.price}
                    </div>
                  </div>
                  <div>
                    <label className="text-[12px] font-bold text-[#717169] mb-1 block">Entrada</label>
                    <div className="h-11 rounded-xl border border-[#d1d0d0] px-3 flex items-center text-[14px] font-semibold text-[#323131] bg-[#fafafa]">
                      {formatBRL(entrada)}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-[12px] font-bold text-[#717169] mb-2 block">Prazo em anos</label>
                  <div className="flex gap-2 flex-wrap">
                    {FINANCE_TERMS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTerm(t)}
                        className={`h-10 w-11 rounded-lg border text-[14px] font-bold transition-colors ${
                          selectedTerm === t
                            ? "border-[#eb0027] bg-[#eb0027] text-white"
                            : "border-[#d1d0d0] text-[#323131] hover:border-[#717169]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <button className="w-full h-12 rounded-[60px] bg-[#eb0027] text-white font-bold text-[15px] hover:bg-[#d60023] transition-colors">
                  Ver parcelas
                </button>
              </div>

              <div className="border-t border-[#f0efef]" />

              {/* Same address */}
              {isFirstProperty && (
                <div className="space-y-3">
                  <h2 className="text-[17px] font-bold text-[#323131]">Imóveis no mesmo endereço</h2>
                  <p className="text-[13px] font-semibold text-[#717169]">Rua Da Emilio Ferdinando Schroeder, 48</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[13px] border-collapse">
                      <thead>
                        <tr className="border-b border-[#e7e6e6]">
                          {["Anúncio", "Preço", "Area util", "Tipo", "Salas", "Banheiros", "Garagens"].map((h) => (
                            <th key={h} className="text-left py-2 px-2 font-bold text-[#323131] whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#f0efef] hover:bg-[#fafafa]">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <div className="relative w-10 h-10 rounded overflow-hidden bg-[#f4f5f7] shrink-0">
                                <Image src={property.images[0]} alt="" fill className="object-cover" unoptimized />
                              </div>
                              <div>
                                <p className="font-semibold text-[#323131]">Casa / Sobrado</p>
                                <button className="text-[#475cff] hover:underline font-semibold">Ver anúncio</button>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-2 font-semibold text-[#323131] whitespace-nowrap">R$ 2.350.000</td>
                          <td className="py-3 px-2 font-medium text-[#5e5c5d]">221m²</td>
                          <td className="py-3 px-2 font-medium text-[#5e5c5d]">Venda</td>
                          <td className="py-3 px-2 font-medium text-[#5e5c5d]">4</td>
                          <td className="py-3 px-2 font-medium text-[#5e5c5d]">5</td>
                          <td className="py-3 px-2 font-medium text-[#5e5c5d]">2</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="h-8" />
            </div>

            {/* ── RIGHT: sticky contact panel ── */}
            <div className="hidden lg:block p-5 bg-white border-l border-[#f0efef]">
              <div className="sticky top-0 pt-1 space-y-4">

                {/* Contact card */}
                <div className="rounded-xl border border-[#ddd] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
                  <div className="px-5 pt-5 pb-4">
                    <h3 className="text-[18px] font-bold text-[#323131] mb-4">Fale com o anunciante</h3>
                    {/* Contact tabs */}
                    <div className="grid grid-cols-2 rounded-xl border border-[#ddd] overflow-hidden mb-5">
                      {(["mensagem", "visita"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setContactTab(t)}
                          className={`flex items-center justify-center gap-1.5 py-3 text-[14px] font-bold transition-colors ${
                            contactTab === t
                              ? "bg-white text-[#323131] border-b-2 border-[#eb0027]"
                              : "bg-[#f6f5f5] text-[#717169] hover:bg-[#eeeded]"
                          }`}
                        >
                          {t === "mensagem" ? (
                            <><MessageCircle className="h-4 w-4" /> Mensagem</>
                          ) : (
                            <><CalendarDays className="h-4 w-4" /> Agendar visita</>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* ── MENSAGEM tab ── */}
                    {contactTab === "mensagem" && (
                      msgSent ? (
                        <div className="rounded-xl bg-[#f0fff4] border border-[#bbf7d0] p-4 text-center">
                          <p className="text-[24px] mb-1">✓</p>
                          <p className="font-bold text-[#166534] text-[15px]">Mensagem enviada!</p>
                          <p className="text-[14px] text-[#166534] mt-0.5">O anunciante entrará em contato.</p>
                        </div>
                      ) : (
                        <form
                          onSubmit={(e) => { e.preventDefault(); setMsgSent(true); }}
                          className="space-y-3"
                        >
                          <div className="flex items-center gap-2 h-12 rounded-xl border border-[#d1d0d0] px-3">
                            <User className="h-4 w-4 text-[#b0afaf] shrink-0" />
                            <input type="text" placeholder="Digite seu nome" required className="flex-1 text-[14px] font-medium text-[#323131] placeholder:text-[#b0afaf] outline-none bg-transparent" />
                          </div>
                          <div className="flex items-center gap-2 h-12 rounded-xl border border-[#d1d0d0] px-3">
                            <svg className="h-4 w-4 text-[#b0afaf] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
                            <input type="email" placeholder="Digite seu email" required className="flex-1 text-[14px] font-medium text-[#323131] placeholder:text-[#b0afaf] outline-none bg-transparent" />
                          </div>
                          <div className="flex items-center gap-2 h-12 rounded-xl border border-[#d1d0d0] px-3">
                            <Phone className="h-4 w-4 text-[#b0afaf] shrink-0" />
                            <input type="tel" placeholder="(xx) xxxxx-xxxx" className="flex-1 text-[14px] font-medium text-[#323131] placeholder:text-[#b0afaf] outline-none bg-transparent" />
                          </div>
                          <textarea
                            rows={3}
                            defaultValue="Olá, gostaria de mais informações sobre este imóvel."
                            className="w-full rounded-xl border border-[#d1d0d0] px-3 py-2.5 text-[14px] font-medium text-[#323131] focus:outline-none focus:border-[#eb0027] resize-none"
                          />
                          <button type="submit" className="w-full h-12 rounded-[60px] bg-[#eb0027] text-white font-bold text-[15px] hover:bg-[#d60023] transition-colors">
                            Enviar mensagem
                          </button>
                          <p className="text-[12px] text-[#717169] leading-relaxed">
                            Ao enviar, você afirma que leu, compreendeu e concordou com os nossos{" "}
                            <span className="underline cursor-pointer">Termos de Uso</span> e{" "}
                            <span className="underline cursor-pointer">Política de Privacidade</span>.
                          </p>
                        </form>
                      )
                    )}

                    {/* ── AGENDAR VISITA tab ── */}
                    {contactTab === "visita" && (
                      visitSent ? (
                        <div className="rounded-xl bg-[#f0fff4] border border-[#bbf7d0] p-4 text-center">
                          <p className="text-[24px] mb-1">✓</p>
                          <p className="font-bold text-[#166534] text-[15px]">Visita solicitada!</p>
                          <p className="text-[14px] text-[#166534] mt-0.5">O anunciante confirmará em breve.</p>
                        </div>
                      ) : (
                        <form
                          onSubmit={(e) => { e.preventDefault(); setVisitSent(true); }}
                          className="space-y-3"
                        >
                          {/* Date picker */}
                          <div className="rounded-xl border border-[#e7e6e6] bg-[#fafafa] p-3">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[14px] font-bold text-[#323131]">Escolha uma data</span>
                              <div className="flex gap-1">
                                <button
                                  type="button"
                                  onClick={() => { setWeekOffset((p) => Math.max(0, p - 1)); setSelectedDate(0); }}
                                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d1d0d0] bg-white hover:bg-[#f6f5f5] transition-colors disabled:opacity-40"
                                  disabled={weekOffset === 0}
                                >
                                  <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#323131]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 12L6 8l4-4"/></svg>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => { setWeekOffset((p) => p + 1); setSelectedDate(0); }}
                                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d1d0d0] bg-white hover:bg-[#f6f5f5] transition-colors"
                                >
                                  <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#323131]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 4l4 4-4 4"/></svg>
                                </button>
                              </div>
                            </div>
                            <div className="grid grid-cols-5 gap-1.5">
                              {getWeekDays(weekOffset).map((d, i) => (
                                <button
                                  key={d.key}
                                  type="button"
                                  onClick={() => setSelectedDate(weekOffset * 5 + i)}
                                  className={`flex flex-col items-center rounded-xl py-2.5 text-center transition-colors ${
                                    selectedDate === weekOffset * 5 + i
                                      ? "bg-[#323131] text-white"
                                      : "bg-white border border-[#e7e6e6] text-[#323131] hover:border-[#323131]"
                                  }`}
                                >
                                  <span className="text-[11px] font-semibold leading-tight">{d.dayName}</span>
                                  <span className="text-[20px] font-extrabold leading-tight mt-0.5">{d.day}</span>
                                  <span className="text-[11px] font-semibold leading-tight">{d.month}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 h-12 rounded-xl border border-[#d1d0d0] px-3">
                            <User className="h-4 w-4 text-[#b0afaf] shrink-0" />
                            <input type="text" placeholder="Digite seu nome" required className="flex-1 text-[14px] font-medium text-[#323131] placeholder:text-[#b0afaf] outline-none bg-transparent" />
                          </div>
                          <div className="flex items-center gap-2 h-12 rounded-xl border border-[#d1d0d0] px-3">
                            <svg className="h-4 w-4 text-[#b0afaf] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
                            <input type="email" placeholder="Digite seu email" required className="flex-1 text-[14px] font-medium text-[#323131] placeholder:text-[#b0afaf] outline-none bg-transparent" />
                          </div>
                          <div className="flex items-center gap-2 h-12 rounded-xl border border-[#d1d0d0] px-3">
                            <Phone className="h-4 w-4 text-[#b0afaf] shrink-0" />
                            <input type="tel" placeholder="(xx) xxxxx-xxxx" className="flex-1 text-[14px] font-medium text-[#323131] placeholder:text-[#b0afaf] outline-none bg-transparent" />
                          </div>
                          <button type="submit" className="w-full h-12 rounded-[60px] bg-[#eb0027] text-white font-bold text-[15px] hover:bg-[#d60023] transition-colors">
                            Solicitar visita
                          </button>
                          <p className="text-[12px] text-[#717169] leading-relaxed">
                            Ao enviar, você afirma que leu, compreendeu e concordou com os nossos{" "}
                            <span className="underline cursor-pointer">Termos de Uso</span> e{" "}
                            <span className="underline cursor-pointer">Política de Privacidade</span>.
                          </p>
                        </form>
                      )
                    )}
                  </div>

                  <div className="border-t border-[#f0efef] px-4 py-3 flex items-center gap-2">
                    <button
                      onClick={() => setShowPhone((p) => !p)}
                      className="flex-1 h-11 rounded-[60px] border-2 border-[#323131] text-[#323131] font-bold text-[14px] flex items-center justify-center gap-1.5 hover:bg-[#f6f5f5] transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      {showPhone ? "(31) 2115-0000" : "(31) 2115... Ver"}
                    </button>
                    <a
                      href={`https://wa.me/${property.whatsapp ?? "5531900000000"}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-11 rounded-[60px] bg-[#25d366] text-white font-bold text-[14px] flex items-center justify-center gap-1.5 hover:bg-[#20bd5a] transition-colors"
                    >
                      <WhatsAppIcon />
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* Advertiser card */}
                <div className="rounded-xl border border-[#ddd] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#f0f4ff] border border-[#ddd] flex items-center justify-center shrink-0">
                      <span className="text-[17px] font-extrabold text-[#475cff]">G</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="text-[11px] font-bold text-[#475cff] bg-[#eef1ff] rounded-full px-2 py-0.5">Anunciante Diamante</span>
                        <svg className="h-4 w-4 text-[#475cff]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                      </div>
                      <p className="text-[15px] font-extrabold text-[#323131]">Gjm</p>
                      <div className="flex items-center gap-1 text-[12px] font-semibold text-[#22c55e] mt-0.5">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        CRECI 3602
                      </div>
                      <p className="text-[12px] font-medium text-[#717169] mt-1">Desde outubro de 2021 no Chaves na Mão</p>
                      <button className="text-[12px] font-bold text-[#475cff] hover:underline mt-0.5">
                        20 imóveis cadastrados
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
