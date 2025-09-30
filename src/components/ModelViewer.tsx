"use client";

import React, { JSX, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ScrollControls, Scroll } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}
import SceneRig from "./SceneRig";
import Hero from "./Hero";
import Gear1 from "./Gear1";
import Gear2 from "./Gear2";
import Gear3 from "./Gear3";
import Gear4 from "./Gear4";
import About from "./About";
import Philosophy from "./Philosophy";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section9 from "./Section9";

export default function ModelViewer(): JSX.Element {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Wait for drei's scroll container to be ready
    const initTimer = setTimeout(() => {
      // Find the scroll container created by drei
      const scrollContainer = document.querySelector('.scroll') as HTMLElement;
      
      if (scrollContainer) {
        const totalPages = 14;
        let isSnapping = false;
        let snapTimeout: NodeJS.Timeout;

        const handleScroll = () => {
          if (isSnapping) return;

          clearTimeout(snapTimeout);
          snapTimeout = setTimeout(() => {
            const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
            const currentScroll = scrollContainer.scrollTop;
            const currentPage = Math.round((currentScroll / scrollHeight) * (totalPages - 1));
            const targetScroll = (currentPage / (totalPages - 1)) * scrollHeight;

            isSnapping = true;
            gsap.to(scrollContainer, {
              scrollTop: targetScroll,
              duration: 0.5,
              ease: "power2.inOut",
              onComplete: () => {
                isSnapping = false;
              },
            });
          }, 150);
        };

        scrollContainer.addEventListener('scroll', handleScroll);

        return () => {
          scrollContainer.removeEventListener('scroll', handleScroll);
          clearTimeout(snapTimeout);
        };
      }
    }, 300);

    return () => {
      clearTimeout(initTimer);
    };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, width: "100%", height: "100vh" }}>
      <Canvas shadows camera={{ position: [0, 0, 3], fov: 45 }}>

        {/* Lights */}
        <ambientLight intensity={0.1} />
        <directionalLight
          castShadow
          position={[0, 0, 0]}
          intensity={0.1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-6, -6, -6]} intensity={0.2} />

        <Environment preset="studio" />

        <ScrollControls pages={14} damping={0.3}>
          <Suspense fallback={null}>
            <SceneRig />
          </Suspense>

          {/* HTML overlay sections (11 full-screen sections) */}
          <Scroll html>
            <div className="relative z-20 w-screen">
              <Hero />

              {/* Section 2 */}
              <About />

              {/* Section 3 */}
              <Section1 />


              {/* Section 4 */}
              <Section2/>


              <Gear1 /> {/* Section 5 */}
              <Gear2 /> {/* Section 6 */}
              <Gear3 /> {/* Section 7 */}
              <Gear4 /> {/* Section 8 */}

              {/* Section 9 */}

              {/* Section 10: shells reassemble */}
              <section className="w-screen h-screen flex items-center justify-center p-8">
                
              </section>

              <Section9/>
              {/* Section 11: final reveal */}
              <section className="w-screen h-screen flex items-center justify-center p-8">
                
              </section>
 
              <Philosophy/> {/* Section 12 */}
              <Testimonials/> {/* Section 13 */}
              <Contact/> {/* Section 14 */}
            </div>
          </Scroll>
          {/* <Footer/> */}
        </ScrollControls>
      </Canvas>
    </div>
  );
}
