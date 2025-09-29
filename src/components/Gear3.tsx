"use client";

import React from 'react';
// bg-background/50 rounded-xl border-1 border-foreground/50 shadow-xl
const Gear3 = () => {
  return (
    <>
    <section className="w-screen h-screen flex p-8">
    <div id='home' className='w-full px-5 lg:px-24 flex flex-col items-end justify-center'>
        <div className='items-right p-4 md:py-8 md:px-12 md:w-4/7 '>
          <h1 className='text-tertiary text-3xl md:text-4xl nebulax uppercase w-full leading-[0.8] tracking-tight'>
            Automated
          </h1>
          <h1 className='text-tertiary text-3xl md:text-4xl nebulax uppercase w-full tracking-tight'>
            Client Retention
          </h1>
          <hr className="w-full h-[2px] bg-tertiary my-4" />
          <p className='text-xl md:text-xl text-justify hyphens-auto break-words tracking-tight archimoto transition-colors duration-100 group-hover:text-background'>
            Businesses often miss revenue because they don’t follow up. EDHWay deploys automated CRM reminders, loyalty programs, and post-sale follow-ups - so your customers keep coming back, turning one-time buyers into long-term loyalists.
          </p>
        </div>
      </div>
      </section>
    </>
  );
};

export default Gear3;