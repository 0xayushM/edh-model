"use client";

import React from 'react';
// bg-background/50 rounded-xl border-1 border-foreground/50 shadow-xl
const Section1 = () => {
  return (
    <>
      <section className="w-screen h-screen flex p-4 md:p-8">
        <div id='home' className='w-full px-2 md:px-5 lg:px-20 flex flex-col items-start justify-center gap-8 md:gap-0'>
            <div className='relative z-10 md:h-screen pt-12 md:pt-24 w-full lg:w-[50%] flex flex-col px-2 md:px-4 md:pl-20 md:pr-12 '>
              <h1 className='text-foreground text-2xl md:text-5xl nebulax font-medium uppercase tracking-tighter'><span className='text-tertiary'>H</span>armonious workflow orchestration</h1>
            </div>
            <div className='relative z-10 md:h-screen w-full flex flex-row-reverse md:items-end px-2 md:px-4 md:pb-12'>
              <p className='text-foreground text-end text-2xl md:text-5xl nebulax uppercase tracking-tighter w-full lg:w-[40%]'><span className='text-tertiary'>W</span>EAVING INTELLIGENCE INTO EVERY OPERATION</p>
              <div></div>
            </div>
          </div>
      </section>
    </>
  );
};

export default Section1;