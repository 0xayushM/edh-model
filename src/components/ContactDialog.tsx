"use client";

import React, { useEffect } from 'react';
import Cubes from '@/ui/Cubes';

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactDialog = ({ isOpen, onClose }: ContactDialogProps) => {
  useEffect(() => {
    if (isOpen) {
      // Freeze scroll on the drei scroll container and body
      const scrollContainer = document.querySelector('.scroll') as HTMLElement;
      const body = document.body;
      const html = document.documentElement;
      
      // Store the current scroll position
      const scrollPosition = scrollContainer?.scrollTop || 0;
      
      // Prevent all scroll events
      const preventScroll = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };
      
      // Disable scrolling on body and html
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.width = '100%';
      
      if (scrollContainer) {
        scrollContainer.style.pointerEvents = 'none';
        scrollContainer.style.overflow = 'hidden';
        scrollContainer.style.touchAction = 'none';
        
        // Add event listeners to prevent scrolling
        scrollContainer.addEventListener('wheel', preventScroll, { passive: false });
        scrollContainer.addEventListener('touchmove', preventScroll, { passive: false });
        scrollContainer.addEventListener('scroll', preventScroll, { passive: false });
      }
      
      // Also prevent on window
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      
      // Cleanup function
      return () => {
        body.style.overflow = '';
        html.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
        
        if (scrollContainer) {
          scrollContainer.style.pointerEvents = '';
          scrollContainer.style.overflow = '';
          scrollContainer.style.touchAction = '';
          scrollContainer.removeEventListener('wheel', preventScroll);
          scrollContainer.removeEventListener('touchmove', preventScroll);
          scrollContainer.removeEventListener('scroll', preventScroll);
          scrollContainer.scrollTop = scrollPosition;
        }
        
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed h-screen overflow-hidden inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/95 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog Content */}
      <div className="relative z-10 w-[90vw] max-w-6xl max-h-[90vh] overflow-y-auto bg-background border border-tertiary/30 rounded-lg p-6 md:p-12">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground hover:text-tertiary transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Contact Section Content */}
        <div className='flex flex-col items-center justify-center w-full'>
          <h2 className="w-full uppercase pb-4 md:pb-8 text-foreground text-sm md:text-sm font-light text-start archimoto-bold uppercase tracking-[0.4em]">
            Contact Us
          </h2>
          
          <div className="w-full flex flex-col items-center justify-center">
            <hr className="w-full border-secondary" />
            <div className="w-full flex flex-col lg:flex-row lg:gap-12 pt-4 md:pt-10">
              {/* Left Column: Cubes Animation */}
              <div className="hidden md:flex lg:items-start mx-auto lg:justify-start mb-8 md:mb-0 h-[392px] w-[392px]">
                <Cubes
                  gridSize={8}
                  cubeSize={36.5}
                  maxAngle={30}
                  radius={4}
                  borderStyle="2px dashed #c08457"
                  faceColor="var(--foreground)/50"
                  rippleColor="var(--tertiary)"
                  rippleSpeed={2}
                  autoAnimate={true}
                  rippleOnClick={true}
                />
              </div>
              
              {/* Right Column: Contact Form */}
              <form className="flex-1 space-y-6 archimoto flex flex-col w-full">
                <div className="relative">
                  <input 
                    type="text" 
                    id="dialog-name" 
                    placeholder=" " 
                    className="block w-full p-4 bg-transparent border border-tertiary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer" 
                  />
                  <label 
                    htmlFor="dialog-name" 
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Your Name
                  </label>
                </div>
                
                <div className="relative">
                  <input 
                    type="email" 
                    id="dialog-email" 
                    placeholder=" " 
                    className="block w-full p-4 bg-transparent border border-tertiary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer" 
                  />
                  <label 
                    htmlFor="dialog-email" 
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Your Email
                  </label>
                </div>
                
                <div className="relative">
                  <textarea 
                    id="dialog-message" 
                    rows={5} 
                    placeholder=" " 
                    className="block w-full p-4 bg-transparent border border-tertiary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer"
                  />
                  <label 
                    htmlFor="dialog-message" 
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Your Message
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-transparent border-2 border-tertiary text-tertiary font-bold py-3 px-6 rounded-lg button-wipe-hover uppercase tracking-wider archimoto-bold transition-colors duration-100" 
                  data-text="Send Message"
                >
                  Send Message
                </button>
              </form>
              
              {/* Right Column: Vertical Text */}
              <div className="hidden lg:flex items-center justify-start">
                <h1 className="[writing-mode:vertical-lr] text-7xl font-bold tracking-widest nebulax bg-gradient-to-b from-tertiary to-foreground bg-clip-text text-transparent">
                  EDHWAY
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDialog;
