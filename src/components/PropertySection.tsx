"use client";

import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Car, Heart, MapPin, MessageCircle, Ruler } from "lucide-react";
import { properties } from "@/lib/properties";

export function PropertySection() {
  return (
    <section className="w-full bg-[#f4f5f7] py-12 px-4 md:px-8">
      <div className="max-w-[1280px] mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-[28px] font-bold text-brand-txt-primary">
              Imóveis em destaque
            </h2>
            <p className="text-[15px] text-brand-txt-secondary mt-1">
              Explore as melhores oportunidades disponíveis agora
            </p>
          </div>
          <Link
            href="/comprar"
            className="inline-flex h-11 items-center justify-center rounded-[60px] border-2 border-brand-primary text-brand-primary px-6 text-[15px] font-bold hover:bg-brand-primary hover:text-white transition-colors"
          >
            Ver todos os imóveis
          </Link>
        </div>

        {/* Property cards grid — 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {properties.slice(0, 4).map((property, index) => {
            const details = [
              { value: property.area, icon: Ruler },
              { value: property.beds, icon: BedDouble },
              { value: property.baths, icon: Bath },
              { value: property.parking, icon: Car },
            ].filter((d) => d.value);

            const propertyUrl = `/imovel/${property.slug}/${property.id}`;

            return (
              <article
                key={property.id}
                className="flex flex-col overflow-hidden rounded-xl border border-[#ddd] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
              >
                {/* Image */}
                <Link
                  href={propertyUrl}
                  className="relative block h-[180px] overflow-hidden bg-[#f4f5f7] shrink-0"
                >
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    priority={index === 0}
                    unoptimized
                  />
                  {property.badge && (
                    <span className="absolute bottom-3 left-3 rounded-full bg-[#872bff] px-3 py-1 text-xs font-bold text-white">
                      {property.badge}
                    </span>
                  )}
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4">
                  <div className="flex items-start gap-2">
                    <Link href={propertyUrl} className="flex-1 min-w-0">
                      <h3 className="line-clamp-2 text-[14px] font-bold leading-[20px] tracking-[0.1px] text-brand-txt-primary hover:text-brand-primary transition-colors">
                        {property.title}
                      </h3>
                    </Link>
                    <button className="rounded-full border border-[#ddd] p-1.5 text-[#5e5c5d] shrink-0 hover:border-brand-primary hover:text-brand-primary transition-colors">
                      <Heart className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="mt-2 space-y-0.5 text-[12px] font-medium text-brand-txt-secondary">
                    <p className="truncate">{property.address}</p>
                    <p className="flex items-center gap-1 truncate">
                      <MapPin className="h-3 w-3 text-brand-primary shrink-0" />
                      {property.location}
                    </p>
                  </div>

                  {details.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-2 text-[12px] font-bold text-brand-txt-primary">
                      {details.map((detail, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <detail.icon className="h-3 w-3 text-brand-txt-secondary" />
                          {detail.value}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-3 flex flex-col gap-2.5">
                    <div>
                      <p className="text-[18px] font-extrabold leading-6 text-brand-txt-primary">
                        {property.price}
                      </p>
                      {(property.feeLabel || property.fee) && (
                        <p className="mt-0.5 text-[11px] font-semibold text-brand-txt-secondary">
                          {property.feeLabel && <span>{property.feeLabel} </span>}
                          <span className="text-brand-txt-primary">{property.fee}</span>
                        </p>
                      )}
                    </div>
                    <Link
                      href={propertyUrl}
                      className="flex h-9 items-center justify-center gap-1.5 rounded-[60px] bg-brand-primary px-4 text-[13px] font-bold text-white hover:bg-[#d60023] transition-colors"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Contatar
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="flex justify-center pt-2">
          <Link
            href="/comprar"
            className="inline-flex h-12 items-center justify-center rounded-[60px] bg-brand-primary px-8 text-[15px] font-bold text-white hover:bg-[#d60023] transition-colors"
          >
            Ver todos os imóveis disponíveis
          </Link>
        </div>
      </div>
    </section>
  );
}
