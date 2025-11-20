'use client';

import ModelViewer from "@/components/ModelViewer";
import Squares from "@/ui/Squares";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gear1 from "@/components/Gear1";
import Gear2 from "@/components/Gear2";
import Gear3 from "@/components/Gear3";
import Gear4 from "@/components/Gear4";
import Section9 from "@/components/Section9";
import Philosophy from "@/components/Philosophy";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* Desktop / large view: 3D model experience */}
      <div className="hidden md:block">
        <div className="absolute inset-0 z-0">
          <Squares
            speed={0.1}
            squareSize={40}
            direction="up"
            borderColor="#c0845771"
            hoverFillColor="#c0845771"
          />
        </div>
        <div className="flex flex-col items-center h-screen relative z-10">
          <ModelViewer />
        </div>
      </div>

      {/* Mobile view: stacked sections without 3D model, no Section1/Section2 */}
      <div className="block md:hidden relative z-10">
        {/* Hero + navbar at top */}
        <Hero />
          <About />
          <Gear1 />
          <Gear2 />
          <Gear3 />
          <Gear4 />
          <Philosophy />
          <Testimonials />
          <Team />
          <Contact />
      </div>
    </main>
  );
}