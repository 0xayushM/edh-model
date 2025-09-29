import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'motion/react';
import SplitText from '@/ui/SplitText';
import testimonials from '@/data/testimonials.json'


const Testimonials: React.FC = () => {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const testimonialsData = testimonials;

  const totalImages = testimonialsData.length;
  const maxVisibleImages = totalImages > 3 ? 3 : totalImages;
  const useSlider = totalImages > maxVisibleImages;

  const activeTestimonial = testimonialsData[activeTestimonialIndex];

  const handleImageClick = (index: number) => {
    setActiveTestimonialIndex(index);
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  return (
    <section id="testimonials" className="min-h-screen bg-gradient-to-b from-black/80 via-black/80 to-background/80 backdrop-blur-md flex flex-col items-center justify-center m-0">
      <div className='flex flex-col items-center justify-center h-full w-full'>
        <SplitText
          text="What they said"
          className="w-4/5 uppercase p-2 md:pb-8 text-foreground text-sm md:text-sm font-light text-start uppercase tracking-[0.4em] archimoto-bold"
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
        <hr className="w-[100vw] border-secondary" />
        <div className="w-4/5 h-full md:min-h-[50vh] py-8 avalon-bold flex flex-col-reverse gap-10 lg:flex-row space-x-4 lg:space-x-0 lg:space-y-6 items-center lg:justify-start lg:pl-8 shrink-0">
          {/* Main Testimonial Display */}
          <div className="flex-1 lg:pr-24 mb-10 lg:mb-0 lg:text-left w-full lg:w-3/4 h-full md:h-[40vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id} // This key is crucial for AnimatePresence
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="relative mb-8">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl archimoto leading-tight text-foreground">
                    <span className="absolute -left-20 top-0 text-7xl md:text-9xl text-tertiary hidden lg:block font-bold opacity-90 select-none">“</span>
                    {activeTestimonial.quote}
                  </h2>
                </div>
                <div className="testimonial-author-details">
                  <p className="text-md pb-2 sm:text-lg nebulax text-tertiary text-end">- {activeTestimonial.author}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image Thumbnails Sidebar */}
          <div className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-6 justify-end lg:justify-start lg:pl-8 shrink-0">
            {Array.from({ length: maxVisibleImages }).map((_, i) => {
              // Calculate index to center the active testimonial
              const centerOffset = Math.floor(maxVisibleImages / 2);
              const offset = i - centerOffset; // e.g., for 3 images: -1, 0, 1
              const index = (activeTestimonialIndex + offset + totalImages) % totalImages;

              const testimonial = testimonialsData[index];
              if (!testimonial) return null;

              const isCenter = i === centerOffset;

              return (
                <div
                  key={testimonial.id}
                  className={`relative cursor-pointer transition-all duration-300 ease-in-out group`}
                  onClick={() => handleImageClick(index)}
                  title={`View testimonial from ${testimonial.author}`}
                >
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:border-tertiary/50 ${isCenter
                        ? 'scale-110 shadow-lg border-tertiary'
                        : 'scale-90 opacity-50 border-transparent'
                      }`}
                  >
                    <Image
                      src={testimonial.imageUrl}
                      alt={testimonial.author}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full grayscale"
                      priority={i < maxVisibleImages}
                    />
                  </div>
                  {isCenter && (
                    <>
                      <div className="hidden lg:block absolute left-[-22px] top-1/2 transform -translate-y-1/2">
                        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 12L0 24V0L16 12Z" fill="var(--tertiary)" />
                        </svg>
                      </div>
                      <div className="lg:hidden absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-tertiary rounded-full"></div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
