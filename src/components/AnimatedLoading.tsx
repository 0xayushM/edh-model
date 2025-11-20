// components/AnimatedHeading.tsx
"use client";

import React from "react";
import TextType from "../ui/textType";

type Props = {
  color?: string; // CSS color for text
  className?: string;
  style?: React.CSSProperties;
};

export default function AnimatedLoading({
  color = "#C08457",
  className = "",
  style,
}: Props) {
  return (
    <div
      aria-label="EDHWAY loading"
      className={`animated-heading ${className}`}
      style={{
        color,
        margin: 0,
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        ...style,
      }}
    >
      <TextType
        text={["EDHWAY"]}
        typingSpeed={100}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="_"
        className=""
        style={{
          fontSize: "3rem",
          fontFamily:
            'Nebulax, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          color: "#C08457",
        }}
      />
    </div>
  );
}
