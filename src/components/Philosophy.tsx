import React from 'react';
import SplitText from '@/ui/SplitText';
import philosophy from '@/data/philosophy.json'

const Philosophy = () => {
  const philosophyData = philosophy;

  return (
    <section id="philosophy" className="min-h-screen bg-gradient-to-b from-black/0 via-black/70 pt-10 to-background/80 backdrop-blur-md flex flex-col items-center justify-center overflow-hidden -mt-px">
      <div className='flex flex-col items-center justify-center h-full w-full'>
        <SplitText
          text="Our Philosophy"
          className="w-4/5 uppercase p-2 md:pb-8 text-foreground text-sm md:text-sm font-light text-start archimoto-bold uppercase tracking-[0.4em]"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-200px"
          textAlign="start"
          onLetterAnimationComplete={() => { }}
        />
        <div className="w-full md:w-[100vw] flex flex-col items-stretch justify-center">
          {philosophyData.map((philosophy) => (
            <div key={philosophy.id} className="group relative cursor-pointer">
              <hr className="w-full md:w-[100vw] border-secondary" />
              {/* Background wipe element */}
              <div className="absolute md:group-hover:w-[100vw] top-0 left-0 h-full bg-tertiary transition-all duration-400 ease-in-out w-0 group-hover:w-full z-0"></div>

              {/* Content layer */}
              <div className="relative w-4/5 mx-auto py-8 z-10">
                <div className="mt-0 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
                  <div>
                    <h1 className="pb-4 uppercase tracking-tighter text-4xl md:text-7xl font-semibold text-start nebulax leading-[1] transition-colors duration-100 group-hover:text-background">
                      {philosophy.name}
                    </h1>
                  </div>
                  <div>
                    <p className="mb-4 archimoto transition-colors duration-100 group-hover:text-background">
                      {philosophy.description}
                    </p>
                    <div className="mb-4">
                      <ul className="flex flex-wrap gap-2">
                        {philosophy.points.map((point) => (
                          <li
                            key={point}
                            className="bg-secondary text-foreground group-hover:bg-background group-hover:text-tertiary uppercase px-3 py-1 rounded-full text-sm archimoto-bold transition-colors duration-100"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="w-full border-secondary" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
