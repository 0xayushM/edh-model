"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import ContactDialog from './ContactDialog';

const Navbar = () => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  const scrollToHome = () => {
    const scrollContainer = document.querySelector('.scroll') as HTMLElement;
    
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav className='fixed top-0 w-full z-50'>
        <div className='flex items-center justify-between w-full p-4 md:px-16 xl:px-36 md:pb-0 md:pt-12'>
          <button onClick={scrollToHome} className='flex items-center cursor-pointer'>
            <Image
              src="/logo.png"
              alt="EDHWay logo"
              width={160}
              height={40}
              className="h-12 w-auto md:h-12"
              priority
            />
          </button>
          
          <button 
            onClick={() => setIsContactDialogOpen(true)}
            className='px-4 py-2 md:px-8 md:py-3 bg-tertiary hover:bg-tertiary/90 text-background font-geist-sans archimoto-bold tracking-wider uppercase text-xs md:text-base transition-all duration-300 rounded-md'
          >
            Get in Touch
          </button>
        </div>
      </nav>

      <ContactDialog 
        isOpen={isContactDialogOpen} 
        onClose={() => setIsContactDialogOpen(false)} 
      />
    </>
  );
};

export default Navbar;
