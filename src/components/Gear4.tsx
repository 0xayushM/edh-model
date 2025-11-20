"use client";

import React from 'react';
// bg-background/50 rounded-xl border-1 border-foreground/50 shadow-xl
const Gear4 = () => {
  return (
    <>
      <section className="w-screen h-screen flex p-4 md:p-8">
        <div id='home' className='w-full px-2 md:px-5 lg:px-24 pt-0 flex flex-col items-start justify-center'>
          <div className='items-right p-2 md:p-4 md:py-8 md:px-12 w-full lg:w-4/7 '>
            <h1 className='text-tertiary text-xl lg:text-4xl nebulax uppercase w-full tracking-tight'>
              The Innovation Inertia:
            </h1>
            <h1 className='text-foreground text-xl lg:text-4xl nebulax uppercase w-full tracking-tight'>
              Is Your Tech Holding You Back?
            </h1>
            <hr className="w-full h-[2px] bg-tertiary my-4" />
            <h2 className='text-tertiary text-xl md:text-2xl lg:text-4xl archimoto-bold uppercase w-full tracking-tight'>
              the EDHWay
            </h2>
            <p className='text-sm lg:text-2xl text-justify hyphens-auto break-words tracking-tight archimoto transition-colors duration-100 group-hover:text-background mb-4 md:mb-8'>
              Seamless Digital Ecosystem Integration. We design and implement bespoke technological solutions, integrating disparate systems with AI-driven platforms to create a unified, intelligent, and scalable digital infrastructure.
            </p>

            <div className='grid grid-cols-3 gap-2 md:gap-4'>
              <div className='flex flex-col items-center justify-center p-2 md:p-4 border-2 border-tertiary bg-tertiary/40 rounded-xl md:rounded-2xl text-foreground nebulax'>
                <div className='py-1 md:py-2'>
                  <h1 className='nebulax text-xl md:text-4xl text-center mb-2 md:mb-4'>↑99%</h1>
                  <h1 className='archimoto text-xs md:text-lg text-center'>Data<br /> Accuracy</h1>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center p-2 md:p-4 border-2 border-tertiary bg-tertiary/40 rounded-xl md:rounded-2xl text-foreground nebulax'>
                <div className='py-1 md:py-2'>
                  <h1 className='nebulax text-xl md:text-4xl text-center mb-2 md:mb-4'>↓70%</h1>
                  <h1 className='archimoto text-xs md:text-lg text-center'>Manual Entry<br /> reduction</h1>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center p-2 md:p-4 border-2 border-tertiary bg-tertiary/40 rounded-xl md:rounded-2xl text-foreground nebulax'>
                <div className='py-1 md:py-2'>
                  <h1 className='nebulax text-xl md:text-4xl text-center mb-2 md:mb-4'>↑1.5x</h1>
                  <h1 className='archimoto text-xs md:text-lg text-center'>Reporting <br /> Cycles</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Gear4;