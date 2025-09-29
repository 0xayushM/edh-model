"use client";

import React from 'react';
// bg-background/50 rounded-xl border-1 border-foreground/50 shadow-xl
const Section2 = () => {
  return (
    <>
      <section className="w-screen h-screen flex p-8">
        <div id='home' className='w-full px-5 lg:px-20 flex flex-col items-start justify-center'>
            <div className='relative z-10 h-screen pt-48 w-[60%] flex flex-col px-4 md:pl-20 md:pr-12 '>
              <h1 className='text-foreground text-lg md:text-5xl nebulax font-medium uppercase tracking-tighter'><span className='text-tertiary'>T</span>he Clockwork of success Engineered for you</h1>
            </div>
            {/* <div className='relative z-10 h-screen pb-48 w-[50%] flex flex-col-reverse px-4 md:pr-24 md:pl-12'>
              <p className='text-foreground text-lg md:text-2xl archimoto uppercase tracking-tighter'>Discover the harmonious way of working. EDHway encapsulates all the tools you need to elevate your top-line, bolster cash flow, and ensure sustainable growth through intelligent automation and strategic network leverage.</p>
            </div> */}
          </div>
      </section>
    </>
  );
};

export default Section2;