import React from 'react';
import SplitText from '@/ui/SplitText';

const Hero = () => {

  return (
    <>
    <div id='home' className='w-full min-h-screen relative'>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full flex flex-col justify-center items-center'>
        <SplitText
          text="EDHWay"
          className="uppercase p-2 pb-8 text-foreground text-sm md:text-sm font-light text-center avalon-bold uppercase tracking-[0.4em]"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-200px"
          textAlign="center"
          onLetterAnimationComplete={() => {}}
        />
        <SplitText
          text="AI-Powered"
          className="text-foreground text-5xl md:text-8xl font-semibold text-center avalon-bold uppercase leading-[0.8] tracking-tighter"
          delay={110}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-200px"
          textAlign="center"
          onLetterAnimationComplete={() => {}}
        />
        <SplitText
          text="Solutions,"
          className="text-tertiary p-2 text-5xl md:text-8xl font-semibold text-center avalon-bold uppercase leading-[0.8] tracking-tighter"
          delay={120}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-200px"
          textAlign="center"
          onLetterAnimationComplete={() => {}}
        />
        <SplitText
          text="Delivered"
          className="text-foreground p-2 text-5xl md:text-8xl font-semibold text-center avalon-bold uppercase leading-[0.8] tracking-tighter"
          delay={130}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-200px"
          textAlign="center"
          onLetterAnimationComplete={() => {}}
        />
        <SplitText
          text="Fast."
          className="text-foreground p-2 text-5xl md:text-8xl font-semibold text-center avalon-bold uppercase leading-[0.8] tracking-tighter"
          delay={160}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-200px"
          textAlign="center"
          onLetterAnimationComplete={() => {}}
        />
      </div>
    </div>
    </>
  );
};

export default Hero;
