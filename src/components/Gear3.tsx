"use client";

import React from 'react';
// bg-background/50 rounded-xl border-1 border-foreground/50 shadow-xl
const Gear3 = () => {
  return (
    <>
      <section className="w-screen h-screen flex p-8">
        <div id='home' className='w-full px-5 lg:px-24 flex flex-col items-end justify-center'>
          <div className='items-right p-4 md:py-8 md:px-12 md:w-4/7 '>
            <h1 className='text-tertiary text-3xl md:text-4xl nebulax uppercase w-full tracking-tight'>
              The Profit Paradox:
            </h1>
            <h1 className='text-foreground text-3xl md:text-4xl nebulax uppercase w-full tracking-tight'>
              Unlocking Your Financial Flow
            </h1>
            <hr className="w-full h-[2px] bg-tertiary my-4" />
            <h2 className='text-tertiary text-2xl md:text-4xl archimoto-bold uppercase w-full tracking-tight'>
              the EDHWay
            </h2>
            <p className='text-lg md:text-2xl text-justify hyphens-auto break-words tracking-tight archimoto transition-colors duration-100 group-hover:text-background mb-8'>
              Cashflow & Topline Amplification Engine. We leverage AI for predictive financial analytics, automate expense management, and optimize revenue streams through pricing strategies and operational cost reductions, ensuring robust cash flow and sustained profitability.
            </p>

            <div className='grid grid-cols-3 gap-4'>
              <div className='flex flex-col items-center justify-center p-4 border-2 border-tertiary bg-tertiary/40 rounded-2xl text-foreground nebulax text-4xl'>
                <div className='py-2'>
                  <h1 className='nebulax text-4xl text-center mb-4'>↑25%</h1>
                  <h1 className='archimoto text-lg text-center'>Net Profit<br /> Margin</h1>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center p-4 border-2 border-tertiary bg-tertiary/40 rounded-2xl text-foreground nebulax text-4xl'>
                <div className='py-2'>
                  <h1 className='nebulax text-4xl text-center mb-4'>↓18%</h1>
                  <h1 className='archimoto text-lg text-center'>Operational<br /> Costs</h1>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center p-4 border-2 border-tertiary bg-tertiary/40 rounded-2xl text-foreground nebulax text-4xl'>
                <div className='py-2'>
                  <h1 className='nebulax text-4xl text-center mb-4'>20%</h1>
                  <h1 className='archimoto text-lg text-center'>Accelerated <br /> Cash conversion</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Gear3;