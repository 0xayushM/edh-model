'use client';

import ModelViewer from "@/components/ModelViewer";
import Squares from "@/ui/Squares";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen">
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
      </main>
    </>
  );
}