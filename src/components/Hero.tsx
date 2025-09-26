"use client";

import React from "react";
import Magnet from "./Magnet";

export default function Hero() {
  return (
    <section className="gradient-background w-screen h-screen flex justify-center">
      <div className="text-[#EEDFD0] flex justify-center items-center h-screen">
        <Magnet padding={50} disabled={false} magnetStrength={50}>
          <h1 className="text-[20vw] font-bold">E</h1>
        </Magnet>
        <Magnet padding={50} disabled={false} magnetStrength={50}>
          <h1 className="text-[20vw] font-bold">D</h1>
        </Magnet>
        <Magnet padding={50} disabled={false} magnetStrength={50}>
          <h1 className="text-[20vw] font-bold">H</h1>
        </Magnet>
        <Magnet padding={50} disabled={false} magnetStrength={50}>
          <h1 className="text-[20vw] font-bold">W</h1>
        </Magnet>
        <Magnet padding={50} disabled={false} magnetStrength={50}>
          <h1 className="text-[20vw] font-bold">A</h1>
        </Magnet>
        <Magnet padding={50} disabled={false} magnetStrength={50}>
          <h1 className="text-[20vw] font-bold">Y</h1>
        </Magnet>
      </div>

    </section>
  );
}