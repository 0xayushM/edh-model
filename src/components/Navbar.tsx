"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    // Find the drei scroll container
    const scrollContainer = document.querySelector('.scroll') as HTMLElement;
    
    if (scrollContainer) {
      // Section mapping to page numbers (0-indexed, each section is 1 page)
      const sectionMap: { [key: string]: number } = {
        'home': 0,      // Hero
        'about': 1,     // About
        'philosophy': 9, // Philosophy (after Section1, Section2, Gear1-4, Section9)
        'contact': 12   // Contact (last section)
      };
      
      const pageNumber = sectionMap[sectionId];
      if (pageNumber !== undefined) {
        const totalPages = 13;
        const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const targetScroll = (pageNumber / (totalPages - 1)) * scrollHeight;
        
        scrollContainer.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }
    }
    
    setIsMenuOpen(false);
  };

  const navLinks = (
    <>
      <button onClick={() => scrollToSection('about')} className={`text-foreground hover:text-tertiary transition-colors duration-300`}>About</button>
      <button onClick={() => scrollToSection('philosophy')} className={`text-foreground hover:text-tertiary transition-colors duration-300`}>Philosophy</button>
      <button onClick={() => scrollToSection('contact')} className={`text-foreground hover:text-tertiary transition-colors duration-300`}>Contact</button>
    </>
  );

  return (
    <nav className='fixed top-0 w-full z-50'>
      <div className='flex items-center justify-between w-full p-4 md:px-16 xl:px-36 md:pb-0 md:pt-12'>
        <button onClick={() => scrollToSection('home')} className='flex items-center cursor-pointer'>
          <Image
            src="/logo.png"
            alt="EDHWay logo"
            width={160}
            height={40}
            className="h-8 w-auto md:h-12"
            priority
          />
        </button>
        
        <div className='hidden md:flex font-geist-sans text-sm archimoto-bold tracking-[0.2rem] flex-col items-end uppercase'>
          {navLinks}
        </div>

        <div className="md:hidden z-50">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-foreground focus:outline-none">
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center space-y-8 font-geist-sans text-2xl avalon-bold uppercase">
          {navLinks}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
