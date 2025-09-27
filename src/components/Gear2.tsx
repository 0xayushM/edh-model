"use client";

import React from 'react';
// bg-background/50 rounded-xl border-1 border-foreground/50 shadow-xl
const Gear2 = () => {
  return (
    <>
    <section className="w-screen h-screen flex p-8">
    <div id='home' className='w-full px-5 lg:px-24 flex flex-col items-start'>
        <div className='items-start p-4 md:py-8 md:px-12 md:w-4/7 '>
          <h1 className='text-tertiary-2 text-3xl md:text-4xl golos-extrabold uppercase w-full leading-[0.8] tracking-tight'>
            Offline Branding
          </h1>
          <hr className="w-2/3 h-[2px] bg-tertiary my-4" />
          <p className='text-xl md:text-xl tracking-tight golos-medium transition-colors duration-100 pr-4 group-hover:text-background'>
            Fragmented branding confuses potential customers. EDHWay creates a seamless experience — from digital ads to in-person events, from flyers to social media. This ensures your audience sees one strong, consistent message everywhere, building trust and recall faster.
          </p>
        </div>
      </div>
      </section>
    </>
  );
};

export default Gear2;