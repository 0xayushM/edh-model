 'use client';

 import ModelViewer from "@/components/ModelViewer";
import Beams from "@/ui/Beams";

export default function Home() {
  return (
    <>
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#c3b4a0"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div>
    <main className="">
      <div className="flex flex-col items-center h-screen">
        <ModelViewer />
      </div>
    </main>
    </>
  );
}