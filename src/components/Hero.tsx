"use client";

import React, { useState } from 'react';
import Navbar from './Navbar';
import ContactDialog from './ContactDialog';

const Hero = () => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div id='home' className='relative overflow-hidden w-full h-screen flex items-center'>
        {/* Video background */}
        <video
          className='pointer-events-none absolute inset-0 z-0 w-full h-full object-cover'
          autoPlay
          loop
          muted
          playsInline
          preload='metadata'
        >
          <source src='/video/hero.mp4' type='video/mp4' />
        </video>
        
        {/* Bronze/sepia overlay to tint the video */}
        <div 
          className='pointer-events-none absolute inset-0 z-[1]'
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
            mixBlendMode: 'normal'
          }}
        />
        <div 
          className='pointer-events-none absolute inset-0 z-[2]'
          style={{
            background: 'var(--tertiary)',
            mixBlendMode: 'color'
          }}
        />

        {/* Content */}
        <div className='relative z-10 w-full h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 xl:px-32'>
          <div className='w-full'>
            {/* Main headline */}
            <h1 className='text-foreground text-2xl md:text-3xl lg:text-6xl xl:text-7xl font-medium nebulax tracking-tight leading-[1.1] mb-6'>
              <span className='font-bold text-tertiary'>Automate</span> the Chaos.<br />
              <span className='font-bold text-tertiary'>Scale</span> with Clarity.
            </h1>
            
            {/* Subtext */}
            <p className='text-foreground/80 text-base md:text-lg lg:text-xl archimoto mb-10 max-w-xl'>
              EDHWAY helps growing businesses automate repetitive work, connect broken workflows, and scale without burning teams out.
            </p>
            
            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 items-start'>
              <button 
                onClick={() => setIsContactDialogOpen(true)}
                className='px-4 py-2 md:px-8 md:py-3 rounded bg-tertiary hover:bg-tertiary/90 text-background font-geist-sans archimoto-bold tracking-wider uppercase text-xs md:text-base transition-all duration-300 rounded-m'
              >
                Book a Free Automation Audit
              </button>
              <button 
                onClick={() => setIsContactDialogOpen(true)}
                className='px-4 py-2 md:px-8 md:py-3 border rounded border-foreground/50 text-foreground font-geist-sans archimoto-bold tracking-wider uppercase text-xs md:text-base transition-all duration-300 rounded-m'
              >
                Talk to an Automation Expert
              </button>
            </div>
          </div>
        </div>
      </div>

      <ContactDialog 
        isOpen={isContactDialogOpen} 
        onClose={() => setIsContactDialogOpen(false)} 
      />
    </>
  );
};

export default Hero;
