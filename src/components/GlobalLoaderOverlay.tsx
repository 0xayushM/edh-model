"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useProgress } from "@react-three/drei";
import AnimatedLoading from "./AnimatedLoading";

export default function GlobalLoaderOverlay() {
  const { progress, active } = useProgress();

  // Track when component mounts
  const [mountTime] = useState(() => Date.now());
  
  // Minimum display time: 5 seconds
  const MINIMUM_DISPLAY_TIME = 5000;
  
  // Track if minimum time has passed
  const [minTimePassed, setMinTimePassed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMinTimePassed(true), MINIMUM_DISPLAY_TIME);
    return () => clearTimeout(t);
  }, []);

  // Determine if we should be visible
  const isBusy = active || progress < 100;
  const shouldShow = isBusy || !minTimePassed;

  // Manage fade-out/unmount timing
  const [mounted, setMounted] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (shouldShow) {
      setMounted(true);
      setOpacity(1);
      return;
    }
    // Start fade-out immediately when conditions are met
    setOpacity(0);
    const t = setTimeout(() => setMounted(false), 800); // Fade out duration
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
        <AnimatedLoading color="#EEDFD0" className="w-[320px] sm:w-[420px]" />
      </div>
    </div>
  );
}
