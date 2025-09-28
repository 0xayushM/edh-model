import React from 'react';
import SplitText from '@/ui/SplitText';

const Hero = () => {

  return (
    <>
      <div id='home' className='w-full px-5 lg:px-24 h-screen flex items-center justify-between gradient-background'>
        <div className='h-screen pt-48 w-full flex flex-col'>
          <SplitText
            text="excellence"
            className="text-foreground text-5xl md:text-8xl nebulax font-medium uppercase tracking-tighter"
            delay={110}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-200px"
            textAlign="left"
            onLetterAnimationComplete={() => { }}
          />
          <SplitText
            text="Dharma"
            className="text-foreground p-2 text-5xl md:text-8xl nebulax uppercase leading-[0.8] tracking-tighter"
            delay={120}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-200px"
            textAlign="left"
            onLetterAnimationComplete={() => { }}
          />
          <SplitText
            text="happiness"
            className="text-foreground p-2 text-5xl md:text-8xl nebulax uppercase leading-[0.8] tracking-tighter"
            delay={130}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-200px"
            textAlign="left"
            onLetterAnimationComplete={() => { }}
          />
        </div>
        <div className='h-screen pb-48 w-full w-2/5 flex flex-col-reverse'>
          <h2 className='text-foreground p-2 text-lg md:text-2xl archimoto uppercase tracking-tighter'>Turn your business into a growth engine. EDHWay automates the repetitive, connects the broken, and helps you focus on scaling, not firefighting.</h2>
          <h1 className='text-foreground p-2 text-lg md:text-2xl archimoto uppercase tracking-tighter'>Founded in 2025.</h1>
        </div>
      </div>
    </>
  );
};

export default Hero;
