import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PropertySection } from "@/components/PropertySection";
import { AdsSection } from "@/components/AdsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-surface font-sans flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <PropertySection />
        <AdsSection />
      </main>
    </div>
  );
}
