'use client';

import { useEffect, useState } from 'react';
import ModelViewer from "@/components/ModelViewer";
import Squares from "@/ui/Squares";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gear1 from "@/components/Gear1";
import Gear2 from "@/components/Gear2";
import Gear3 from "@/components/Gear3";
import Gear4 from "@/components/Gear4";
import Section9 from "@/components/Section9";
import Philosophy from "@/components/Philosophy";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import VisitorTracker from "@/lib/visitorTracking";
import VisitorContactForm from "@/components/VisitorContactForm";

export default function Home() {
  const [showVisitorForm, setShowVisitorForm] = useState(false);

  useEffect(() => {
    // Show visitor form after 10 seconds
    const timer = setTimeout(() => {
      setShowVisitorForm(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* Background squares - behind everything */}
      <div className="absolute inset-0 z-0">
        <Squares
          speed={0.1}
          squareSize={40}
          direction="up"
          borderColor="#c0845771"
          hoverFillColor="#c0845771"
        />
      </div>
      
      {/* 3D model experience - works on both mobile and desktop */}
      <div className="flex flex-col items-center h-screen relative z-10">
        <ModelViewer />
      </div>

      {/* Visitor Contact Form */}
      <VisitorContactForm 
        show={showVisitorForm} 
        onClose={() => setShowVisitorForm(false)} 
      />
    </main>
  );
}