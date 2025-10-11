import React from 'react';;
import Navbar from './Navbar';

const Hero = () => {

  return (
    <>
      <Navbar />
      <div id='home' className='relative overflow-hidden w-full h-screen flex flex-col md:flex-row items-center justify-evenly md:justify-between'>
        <video
          className='pointer-events-none absolute inset-0 z-0 w-full h-full object-cover'
          autoPlay
          loop
          muted
          playsInline
          preload='auto'
        >
          <source src='/video/hero.mp4' type='video/mp4' />
        </video>
        <div className='relative z-10 md:h-screen pt-24 md:pt-48 w-full flex flex-col px-4 md:pl-24 md:pr-12'>
          <h1 className='text-foreground text-5xl md:text-8xl nebulax font-medium uppercase tracking-tighter'><span className='text-tertiary'>E</span>xcellence</h1>
          <h1 className='text-[#DBC3AE] text-5xl md:text-8xl nebulax font-medium uppercase tracking-tighter'><span className='text-tertiary'>D</span>harma</h1>
          <h1 className='text-[#DBC3AE] text-5xl md:text-8xl nebulax font-medium uppercase tracking-tighter'><span className='text-tertiary'>H</span>appiness</h1>
          <h1 className='text-foreground text-5xl md:text-8xl nebulax font-medium uppercase tracking-tighter'><span className='text-tertiary'>Way</span></h1>
        </div>

        <div className=' relative z-10 md:h-screen pb-12 md:pb-48 w-full flex flex-col-reverse px-4 md:pr-24 md:pl-12'>
          <h2 className='text-foreground text-lg md:text-2xl archimoto uppercase tracking-tighter'>Turn your business into a growth engine. <span className='text-tertiary'>EDHWay</span> automates the repetitive, connects the broken, and helps you focus on scaling, not firefighting.</h2>
        </div>
      </div>
    </>
  );
};

export default Hero;
