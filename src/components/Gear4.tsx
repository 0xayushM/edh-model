"use client";

import React from 'react';
// bg-background/50 rounded-xl border-1 border-foreground/50 shadow-xl
const Gear4 = () => {
  return (
    <>
    <section className="w-screen h-screen flex p-8">
    <div id='home' className='w-full px-5 lg:px-24 flex flex-col items-start justify-center'>
        <div className='items-start p-4 md:py-8 md:px-12 md:w-4/7 '>
          <h1 className='text-tertiary text-3xl md:text-4xl nebulax uppercase w-full leading-[0.8] tracking-tight'>
            Data-Driven
          </h1>
          <h1 className='text-tertiary text-3xl md:text-4xl nebulax uppercase w-full tracking-tight'>
            Growth Frameworks
          </h1>
          <hr className="w-full h-[2px] bg-tertiary my-4" />
          <p className='text-xl md:text-xl text-justify hyphens-auto break-words tracking-tight archimoto transition-colors duration-100 group-hover:text-background'>
          Many businesses rely on gut feeling for growth decisions. EDHWay brings clarity with data dashboards, performance analytics, and conversion tracking giving you the power to make smarter, faster decisions and scale without chaos.
          </p>
        </div>
      </div>
      </section>
    </>
  );
};

export default Gear4;