"use client";

import Image from "next/image";
import Link from "next/link";

const vehicleTypes = [
  { label: "Sedã", image: "/images/sed--56a2fe8d98.jpg", href: "/carros-sedas/brasil/" },
  { label: "Hatchback", image: "/images/hatchback-3e38efb333.jpg", href: "/carros-hatchback/brasil/" },
  { label: "SUV/Crossover", image: "/images/suv-crossover-d8af257f5d.jpg", href: "/carros-suv-crossover/brasil/" },
  { label: "Picape", image: "/images/picape-2b129745dc.jpg", href: "/carros-picapes/brasil/" },
  { label: "SW/Perua", image: "/images/sw-perua-9b588eaeeb.jpg", href: "/carros/brasil/" },
  { label: "Van/Minivan", image: "/images/van-minivan-4ab65accf9.jpg", href: "/carros/brasil/" },
  { label: "Conversível", image: "/images/convers-vel-9cd5cd3fc8.jpg", href: "/carros/brasil/" },
  { label: "Cupê", image: "/images/cup--c3a1c9c184.jpg", href: "/carros/brasil/" }
];

const popularModels = [
  { label: "Toyota Corolla", image: "/images/toyota-corolla-a58301c6e3.jpg", href: "/toyota-corolla/brasil/" },
  { label: "Fiat Strada", image: "/images/fiat-strada-530c49e33b.jpg", href: "/fiat-strada/brasil/" },
  { label: "Honda Civic", image: "/images/honda-civic-f707288f45.jpg", href: "/honda-civic/brasil/" },
  { label: "Jeep Compass", image: "/images/jeep-compass-eea1e9a049.jpg", href: "/jeep-compass/brasil/" },
  { label: "Renault Kwid", image: "/images/renault-kwid-5c083740e6.jpg", href: "/renault-kwid/brasil/" },
  { label: "Fiat Uno", image: "/images/fiat-uno-48dea77448.jpg", href: "/fiat-uno/brasil/" }
];

export function VehicleSection() {
  return (
    <section className="w-full bg-brand-surface py-16 px-4 md:px-8">
      <div className="max-w-[1280px] mx-auto space-y-16">
        
        {/* Part A — Vehicle Categories */}
        <div className="space-y-6">
          <h3 className="text-xl md:text-[22px] font-bold text-brand-txt-primary">
            Procure por tipo de veículo
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {vehicleTypes.map((item, idx) => (
              <Link href={item.href} key={idx} className="group block cursor-pointer bg-white rounded-xl p-3 pb-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative w-full aspect-[5/3] rounded-lg overflow-hidden mb-3 bg-[#f0f0f0]">
                  <Image 
                    src={item.image} 
                    alt={item.label}
                    fill
                    unoptimized
                    className="object-cover mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="font-bold text-[15px] text-brand-txt-primary group-hover:text-brand-primary transition-colors block text-center">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Part B — Popular Models */}
        <div className="space-y-6">
          <h3 className="text-xl md:text-[22px] font-bold text-brand-txt-primary">
            Modelos mais populares
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {popularModels.map((item, idx) => (
              <Link href={item.href} key={idx} className="group block cursor-pointer bg-white rounded-xl p-3 pb-4 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
                <div className="relative w-[100px] h-[70px] mb-3">
                  <Image 
                    src={item.image} 
                    alt={item.label}
                    fill
                    unoptimized
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="font-bold text-[14px] text-brand-txt-primary group-hover:text-brand-primary transition-colors text-center line-clamp-1">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
