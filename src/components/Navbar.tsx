"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionIds = ['home', 'about', 'services', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      let currentActive = 'home'; // Default to home
      const viewportCenterY = window.innerHeight / 2;
      let minDistanceToCenter = Infinity;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const sectionCenterY = rect.top + rect.height / 2;
            const distance = Math.abs(sectionCenterY - viewportCenterY);

            if (distance < minDistanceToCenter) {
              minDistanceToCenter = distance;
              currentActive = id;
            }
          }
        }
      }

      if (window.scrollY < 50) {
        currentActive = 'home';
      } else if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 50) {
        currentActive = sectionIds[sectionIds.length - 1];
      }

      if (activeSection !== currentActive) {
        setActiveSection(currentActive);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const navLinks = (
    <>
      <Link href="#about" className={`${activeSection === 'about' ? 'text-tertiary' : 'text-foreground hover:text-tertiary'} transition-colors duration-300`} onClick={handleLinkClick}>About</Link>
      <Link href="#services" className={`${activeSection === 'services' ? 'text-tertiary' : 'text-foreground hover:text-tertiary'} transition-colors duration-300`} onClick={handleLinkClick}>Services</Link>
      <Link href="#contact" className={`${activeSection === 'contact' ? 'text-tertiary' : 'text-foreground hover:text-tertiary'} transition-colors duration-300`} onClick={handleLinkClick}>Contact</Link>
    </>
  );

  return (
    <nav className='fixed top-0 w-full z-50'>
      <div className='flex items-center justify-between w-full p-4 md:px-16 md:pb-0 md:pt-12'>
        <Link href="#home" className='avalon-bold text-xl md:text-2xl'>
          EDHWay
        </Link>
        
        <div className='hidden md:flex font-geist-sans text-sm avalon-bold tracking-[0.2rem] flex-col items-end uppercase'>
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
