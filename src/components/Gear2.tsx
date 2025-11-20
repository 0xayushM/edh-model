"use client";

import React from 'react';
// bg-background/50 rounded-xl border-1 border-foreground/50 shadow-xl
const Gear2 = () => {
  return (
    <>
      <section className="w-screen h-screen flex p-4 md:p-8">
        <div id='home' className='w-full px-2 md:px-5 lg:px-24 flex flex-col items-start justify-center'>
          <div className='items-right p-2 md:p-4 md:py-8 md:px-12 w-full lg:w-4/7 '>
            <h1 className='text-tertiary text-xl lg:text-4xl nebulax uppercase w-full tracking-tight'>
              Talent Tug-of-War: 
            </h1>
            <h1 className='text-foreground text-xl lg:text-4xl nebulax uppercase w-full tracking-tight'>
              Maximize Your Human Capital Potential
            </h1>
            <hr className="w-full h-[2px] bg-tertiary my-4" />
            <h2 className='text-tertiary text-xl md:text-2xl lg:text-4xl archimoto-bold uppercase w-full tracking-tight'>
              the EDHWay
            </h2>
            <p className='text-sm lg:text-2xl text-justify hyphens-auto break-words tracking-tight archimoto transition-colors duration-100 group-hover:text-background mb-4 md:mb-8'>
            Synergistic Workforce Blueprint. We streamline HR processes with automation, implement AI-powered tools for talent management and upskilling, and cultivate a harmonious work environment that boosts productivity and retention.
            </p>
            <div className='grid grid-cols-3 gap-2 md:gap-4'>
              <div className='flex flex-col items-center justify-center p-2 md:p-4 border-2 border-tertiary bg-tertiary/40 rounded-xl md:rounded-2xl text-foreground nebulax'>
                <div className='py-1 md:py-2'>
                  <h1 className='nebulax text-xl md:text-4xl text-center mb-2 md:mb-4'>1.5x</h1>
                  <h1 className='archimoto text-xs md:text-lg text-center'>Employee<br /> Productivity</h1>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center p-2 md:p-4 border-2 border-tertiary bg-tertiary/40 rounded-xl md:rounded-2xl text-foreground nebulax'>
                <div className='py-1 md:py-2'>
                  <h1 className='nebulax text-xl md:text-4xl text-center mb-2 md:mb-4'>35%</h1>
                  <h1 className='archimoto text-xs md:text-lg text-center'>Increase<br /> Turnover</h1>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center p-2 md:p-4 border-2 border-tertiary bg-tertiary/40 rounded-xl md:rounded-2xl text-foreground nebulax'>
                <div className='py-1 md:py-2'>
                  <h1 className='nebulax text-xl md:text-4xl text-center mb-2 md:mb-4'>40%</h1>
                  <h1 className='archimoto text-xs md:text-lg text-center'>Automate <br/> HR Admin</h1>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default Gear2;