"use client";

import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = (
    <>
      <Link href="#about" className={`text-foreground hover:text-tertiary transition-colors duration-300`}>About</Link>
      <Link href="#philosophy" className={`text-foreground hover:text-tertiary transition-colors duration-300`}>Philosophy</Link>
      <Link href="#contact" className={`text-foreground hover:text-tertiary transition-colors duration-300`}>Contact</Link>
    </>
  );

  return (
    <nav className='fixed top-0 w-full z-50'>
      <div className='flex items-center justify-between w-full p-4 md:px-16 md:pb-0 md:pt-12'>
        <Link href="#home" className='archimoto-bold text-xl md:text-2xl'>
          EDHWay
        </Link>
        
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
