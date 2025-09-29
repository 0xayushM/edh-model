"use client";

import React, { JSX, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ScrollControls, Scroll } from "@react-three/drei";
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
import Footer from "./Footer";

export default function ModelViewer(): JSX.Element {
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
              <section className="w-screen h-screen flex items-center justify-center p-8">

              </section>


              {/* Section 4 */}
              <section className="w-screen h-screen flex p-8">
                
              </section>


              <Gear1 /> {/* Section 5 */}
              <Gear2 /> {/* Section 6 */}
              <Gear3 /> {/* Section 7 */}
              <Gear4 /> {/* Section 8 */}

              {/* Section 9 */}
              <section
                className="hidden md:block w-screen h-screen flex items-center justify-center p-8"
              >
                
              </section>

              {/* Section 10: shells reassemble */}
              <section className="w-screen h-screen flex items-center justify-center p-8">
                
              </section>

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
