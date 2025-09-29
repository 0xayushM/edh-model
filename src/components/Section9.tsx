"use client";

import React from 'react';
// bg-background/50 rounded-xl border-1 border-foreground/50 shadow-xl
const Section9 = () => {
  return (
    <>
      <section className="w-screen h-screen flex p-8">
        <div id='home' className='w-full px-5 lg:px-20 flex flex-col items-center justify-center text-center'>
            <div className='relative z-10 h-screen pt-16 flex flex-col px-4 '>
              <h1 className='text-foreground text-lg md:text-6xl nebulax font-medium uppercase tracking-tighter'><span className='text-tertiary'>Y</span>our complete success toolbox</h1>
            </div>
            <div className='relative z-10 h-screen pb-16 flex flex-col-reverse px-4'>
                <h1 className='text-foreground text-lg md:text-6xl nebulax font-medium uppercase tracking-tighter'><span className='text-tertiary'>E</span>ncapsulated at-one place</h1>
            </div>
          </div>
      </section>
    </>
  );
};

export default Section9;