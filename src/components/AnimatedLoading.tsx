// components/AnimatedHeading.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { animate, svg, stagger } from "animejs";

type Props = {
  color?: string; // CSS color for stroke (defaults to currentColor)
  strokeWidth?: number;
  duration?: number;
  delayStagger?: number;
  loop?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function AnimatedLoading({
  color = "#ffffff",
  strokeWidth = 2,
  duration = 2000,
  delayStagger = 100,
  loop = true,
  className = "",
  style,
}: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const animRef = useRef<any>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    // Select the path/polyline elements with class "line"
    const lines = el.querySelectorAll<SVGPathElement | SVGPolylineElement>(".line");
    if (!lines || lines.length === 0) return;

    // createDrawable accepts a selector or NodeList; use NodeList for safety
    // (ts-ignore because typing from animejs may be loose)
    // @ts-ignore
    const drawables = svg.createDrawable(lines as any);

    // animate returns an animation instance — store so we can cleanup
    // Use the animate function like in your snippet
    // @ts-ignore
    animRef.current = animate(drawables, {
      draw: ["0 0", "0 1", "1 1"],
      ease: "inOutQuad",
      duration,
      delay: stagger(delayStagger),
      loop,
    });

    return () => {
      try {
        // animejs instance has pause/seek/finish methods — safe to pause/seek to end
        if (animRef.current && typeof animRef.current.pause === "function") {
          animRef.current.pause();
        }
      } catch (e) {
        // ignore cleanup errors
      }
    };
  }, [duration, delayStagger, loop]);

  // Styling: keep SVG sized, use currentColor by default — wrapper sets color prop
  return (
    <h1
      aria-label="EDHWAY"
      className={`animated-heading ${className}`}
      style={{
        color, // SVG uses currentColor for stroke
        margin: 0,
        lineHeight: 1,
        ...style,
      }}
    >
      {/* Visible SVG logo (stroke uses currentColor) */}
      <svg
        ref={svgRef}
        viewBox="0 0 304 112"
        width="100%"
        height="auto"
        role="img"
        aria-hidden="false"
        style={{ display: "block", maxWidth: 620 }}
      >
        <g
          stroke="currentColor"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        >
          <path className="line" d="M59 90V56.136C58.66 46.48 51.225 39 42 39c-9.389 0-17 7.611-17 17s7.611 17 17 17h8.5v17H42C23.222 90 8 74.778 8 56s15.222-34 34-34c18.61 0 33.433 14.994 34 33.875V90H59z" />
          <polyline className="line" points="59 22.035 59 90 76 90 76 22 59 22" />
          <path className="line" d="M59 90V55.74C59.567 36.993 74.39 22 93 22c18.778 0 34 15.222 34 34v34h-17V56c0-9.389-7.611-17-17-17-9.225 0-16.66 7.48-17 17.136V90H59z" />
          <polyline className="line" points="127 22.055 127 90 144 90 144 22 127 22" />
          <path className="line" d="M127 90V55.74C127.567 36.993 142.39 22 161 22c18.778 0 34 15.222 34 34v34h-17V56c0-9.389-7.611-17-17-17-9.225 0-16.66 7.48-17 17.136V90h-17z" />
          <path className="line" d="M118.5 22a8.5 8.5 0 1 1-8.477 9.067v-1.134c.283-4.42 3.966-7.933 8.477-7.933z" />
          <path className="line" d="M144 73c-9.389 0-17-7.611-17-17v-8.5h-17V56c0 18.778 15.222 34 34 34V73z" />
          <path className="line" d="M178 90V55.74C178.567 36.993 193.39 22 212 22c18.778 0 34 15.222 34 34v34h-17V56c0-9.389-7.611-17-17-17-9.225 0-16.66 7.48-17 17.136V90h-17z" />
          <path className="line" d="M263 73c-9.389 0-17-7.611-17-17s7.611-17 17-17c9.18 0 16.58 7.4 17 17h-17v17h34V55.875C296.433 36.994 281.61 22 263 22c-18.778 0-34 15.222-34 34s15.222 34 34 34V73z" />
          <path className="line" d="M288.477 73A8.5 8.5 0 1 1 280 82.067v-1.134c.295-4.42 3.967-7.933 8.477-7.933z" />
        </g>
      </svg>

      {/* accessible text for screen readers */}
      <span style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0 }}>
        EDHWAY
      </span>
    </h1>
  );
}
