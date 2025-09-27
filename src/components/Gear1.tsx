"use client";

import React from 'react';
// bg-background/50 rounded-xl border-1 border-foreground/50 shadow-xl
const Gear1 = () => {
  return (
    <>
    <section className="w-screen h-screen flex p-8">
    <div id='home' className='w-full px-5 lg:px-24 flex flex-col items-end'>
        <div className='items-right p-4 md:py-8 md:px-12 md:w-3/7 '>
          <h1 className='text-tertiary-1 text-3xl md:text-4xl golos-extrabold uppercase w-full leading-[0.8] tracking-tight'>
            Streamlined
          </h1>
          <h1 className='text-tertiary-1 text-3xl md:text-4xl golos-extrabold uppercase w-full tracking-tight'>
            Lead Generation
          </h1>
          <hr className="w-9/10 h-[2px] bg-tertiary my-4" />
          <p className='text-xl md:text-xl tracking-tight golos-medium transition-colors duration-100 group-hover:text-background'>
            Most businesses struggle to turn visibility into consistent leads. EDHWay solves this by combining targeted digital campaigns, optimized online presence, and real-time tracking to ensure every marketing dollar brings measurable leads. Your pipeline stays full, and your team focuses on what they do best - closing deals.
          </p>
        </div>
      </div>
      </section>
    </>
  );
};

export default Gear1;