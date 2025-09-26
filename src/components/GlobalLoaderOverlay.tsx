"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useProgress } from "@react-three/drei";
import AnimatedLoading from "./AnimatedLoading";

export default function GlobalLoaderOverlay() {
  const { progress, active } = useProgress();

  // Ensure we show the overlay at least briefly on first paint to avoid flashes
  const [bootDelayDone, setBootDelayDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setBootDelayDone(true), 5000);
    return () => clearTimeout(t);
  }, []);

  // Determine if we should be visible
  const isBusy = active || progress < 100;
  const shouldShow = isBusy || !bootDelayDone;

  // Manage fade-out/unmount timing
  const [mounted, setMounted] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (shouldShow) {
      setMounted(true);
      setOpacity(1);
      return;
    }
    // Start fade-out and unmount after a short delay
    setOpacity(0);
    const t = setTimeout(() => setMounted(false), 1200);
    return () => clearTimeout(t);
  }, [shouldShow]);

  const pct = useMemo(() => Math.max(0, Math.min(100, Math.round(progress))), [progress]);

  if (!mounted) return null;

  return (
    <div
      aria-busy={shouldShow}
      aria-live="polite"
      className="fixed inset-0 z-[9999] flex items-center justify-center gradient-background text-[#EEDFD0]"
      style={{ opacity, transition: "opacity 480ms ease" }}
    >
      <div className="flex flex-col items-center gap-6 px-6">
        <AnimatedLoading color="#EEDFD0" strokeWidth={2} className="w-[320px] sm:w-[420px]" />
      </div>
    </div>
  );
}
