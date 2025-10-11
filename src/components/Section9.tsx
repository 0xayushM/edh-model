"use client";

import React from 'react';
// bg-background/50 rounded-xl border-1 border-foreground/50 shadow-xl
const Section9 = () => {
  return (
    <>
      <section className="w-screen md:h-screen flex p-4 md:p-8">
        <div id='home' className='w-full px-2 md:px-5 lg:px-20 flex flex-col items-center justify-center text-center'>
            <div className='relative z-10 md:h-screen md:pt-16 flex flex-col px-2 md:px-4 '>
              <h1 className='text-foreground text-2xl md:text-6xl nebulax font-medium uppercase tracking-tighter'><span className='text-tertiary'>Y</span>our complete success toolbox</h1>
            </div>
            <div className='relative z-10 h-[60vh] md:h-screen pb-16 flex flex-col-reverse px-2 md:px-4'>
                <h1 className='text-foreground text-2xl md:text-6xl nebulax font-medium uppercase tracking-tighter'><span className='text-tertiary'>E</span>ncapsulated at-one place</h1>
            </div>
          </div>
      </section>
    </>
  );
};

export default Section9;