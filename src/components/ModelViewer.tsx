// components/ModelViewer.tsx
"use client";

import React, { JSX, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Html, ScrollControls, Scroll } from "@react-three/drei";
import SceneRig from "./SceneRig";

export default function ModelViewer(): JSX.Element {
  return (
    <div style={{ position: "fixed", inset: 0, width: "100%", height: "100vh" }}>
      <Canvas shadows camera={{ position: [0, 0, 3], fov: 45 }}>
        <color attach="background" args={["#252423"]} />

        {/* Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight
          castShadow
          position={[4, 8, 4]}
          intensity={0.9}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-6, -6, -6]} intensity={0.2} />

        <Environment preset="studio" />

        <ScrollControls pages={12} damping={0.3}>
          <Suspense fallback={null}>
            <SceneRig />
          </Suspense>

          {/* HTML overlay sections (11 full-screen sections) */}
          <Scroll html>
            <div className="relative z-20 w-screen pointer-events-none">
              {/* Section 1 */}
              <section className="w-screen h-screen flex p-8">
                <div className="max-w-3xl mx-auto text-center pointer-events-auto">
                  <h1 className="text-4xl font-semibold mb-4">EDHWay</h1>
                </div>
              </section>

              {/* Section 2 */}
              <section className="w-screen h-screen flex items-center justify-center p-8">
                <div className="max-w-3xl mx-auto text-center pointer-events-auto">
                  <h2 className="text-4xl font-semibold mb-4">The model is moving...</h2>
                  <p className="opacity-80">Customize this content freely.</p>
                </div>
              </section>

              {/* Section 3 */}
              <section className="w-screen h-screen flex items-center justify-center p-8">
                <div className="max-w-3xl mx-auto text-center pointer-events-auto">
                  <p className="text-2xl">...along the choreographed beats...</p>
                </div>
              </section>

              {/* Section 4 */}
              <section className="w-screen h-screen flex items-center justify-center p-8">
                <div className="max-w-3xl mx-auto text-center pointer-events-auto">
                  <p className="text-2xl">...along the choreographed beats...</p>
                </div>
              </section>

              {/* Section 5 */}
              <section className="w-screen h-screen flex items-center justify-center p-8">
                <div className="max-w-3xl mx-auto text-center pointer-events-auto">
                  <p className="text-2xl">...along the choreographed beats...</p>
                </div>
              </section>

              {/* Inserted 5 new sections where rotation holds steady (pages 4..8) */}
              {Array.from({ length: 5 }).map((_, idx) => (
                <section
                  key={`inserted-${idx}`}
                  className="w-screen h-screen flex items-center justify-center p-8"
                >
                  <div className="max-w-3xl mx-auto text-center pointer-events-auto">
                    <h3 className="text-3xl font-medium mb-3">Extended section {idx + 1}</h3>
                    <p className="opacity-80">Rotation state is held steady across these slides.</p>
                  </div>
                </section>
              ))}

              {/* Section 9: shells reassemble */}
              <section className="w-screen h-screen flex items-center justify-center p-8">
                <div className="max-w-3xl mx-auto text-center pointer-events-auto">
                  <p className="text-2xl">Shells reassembling...</p>
                </div>
              </section>

              {/* Section 11: final reveal */}
              <section className="w-screen h-screen flex items-center justify-center p-8">
                <div className="max-w-3xl mx-auto text-center pointer-events-auto">
                  <p className="text-2xl">...ending with a vertical reveal.</p>
                </div>
              </section>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
