import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PropertySection } from "@/components/PropertySection";
import { VehicleSection } from "@/components/VehicleSection";
import { AppSection } from "@/components/AppSection";
import { AdsSection } from "@/components/AdsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-surface font-sans flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <PropertySection />
        <VehicleSection />
        <AppSection />
        <AdsSection />
      </main>
      <Footer />
    </div>
  );
}
