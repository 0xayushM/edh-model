import React from 'react';;
import Navbar from './Navbar';

const Hero = () => {

  return (
    <>
      <Navbar />
      <div id='home' className='relative overflow-hidden w-full h-screen flex flex-col md:flex-row items-center justify-between'>
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
        <div className='relative z-10 h-screen pt-48 w-full bg-black/50 flex flex-col bg-black/50 px-4 md:pl-24 md:pr-12'>
          <h1 className='text-foreground text-5xl md:text-8xl nebulax font-medium uppercase tracking-tighter'>Excellence</h1>
          <h1 className='text-[#DBC3AE] text-5xl md:text-8xl nebulax font-medium uppercase tracking-tighter'>Dharma</h1>
          <h1 className='text-[#DBC3AE] text-5xl md:text-8xl nebulax font-medium uppercase tracking-tighter'>Happiness</h1>
        </div>

        <div className='relative z-10 h-screen pb-48 w-full flex flex-col-reverse bg-black/50 px-4 md:pr-24 md:pl-12'>
          <h2 className='text-foreground text-lg md:text-2xl archimoto uppercase tracking-tighter'>Turn your business into a growth engine. EDHWay automates the repetitive, connects the broken, and helps you focus on scaling, not firefighting.</h2>
        </div>
      </div>
    </>
  );
};

export default Hero;
