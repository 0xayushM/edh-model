"use client";

import React from "react";
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

export default function MobilePage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* Keep the existing hero + navbar at the top */}
      <Hero />

      {/* Stack remaining sections in a normal scroll layout, without the 3D model and without Section1/Section2 */}
      <section id="about">
        <About />
      </section>

      <section>
        <Gear1 />
      </section>

      <section>
        <Gear2 />
      </section>

      <section>
        <Gear3 />
      </section>

      <section>
        <Gear4 />
      </section>

      <section>
        <Section9 />
      </section>

      <section id="philosophy">
        <Philosophy />
      </section>

      <section>
        <Testimonials />
      </section>

      <section>
        <Team />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
