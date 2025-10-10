"use client";

import React from 'react';
// bg-background/50 rounded-xl border-1 border-foreground/50 shadow-xl
const Section1 = () => {
  return (
    <>
      <section className="w-screen h-screen flex p-8">
        <div id='home' className='w-full px-5 lg:px-20 flex flex-col items-start justify-center'>
            <div className='relative z-10 h-screen pt-24 w-[50%] flex flex-col px-4 md:pl-20 md:pr-12 '>
              <h1 className='text-foreground text-lg md:text-5xl nebulax font-medium uppercase tracking-tighter'><span className='text-tertiary'>H</span>armonious workflow orchestration</h1>
            </div>
            <div className='relative z-10 h-screen w-full flex flex-row-reverse items-end px-4 pb-12'>
              <p className='text-foreground text-end text-lg md:text-5xl nebulax uppercase tracking-tighter w-[40%]'><span className='text-tertiary'>W</span>EAVING INTELLIGENCE INTO EVERY OPERATION</p>
              <div></div>
            </div>
          </div>
      </section>
    </>
  );
};

export default Section1;