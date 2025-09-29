import React from 'react';
import SplitText from '@/ui/SplitText';
import Footer from './Footer';
import Cubes from '@/ui/Cubes';

const Contact = () => {

    return (
        <>
            <section id="contact" className="min-h-screen flex flex-col items-center justify-center gradient-background">
                <div className='flex flex-col items-center justify-start h-full w-full'>
                    <SplitText
                        text="Contact Us"
                        className="w-4/5 md:w-6/8 uppercase py-8 md:pb-8 text-foreground text-sm md:text-sm font-light text-start archimoto-bold uppercase tracking-[0.4em]"
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

                    <div className="md:w-4/5 py-8 md:py-16 md:w-6/8 grid items-center md:grid-cols-2 gap-12 md:gap-16">
                        <div>
                            <div className='relative'>
                                <Cubes
                                    className="w-full"
                                    gridSize={8}
                                    maxAngle={30}
                                    radius={4}
                                    borderStyle="2px dashed #c08457"
                                    faceColor="var(--foreground)/50"
                                    rippleColor="var(--tertiary)"
                                    rippleSpeed={1.5}
                                    autoAnimate={true}
                                    rippleOnClick={true}
                                />
                            </div>
                        </div>
                        {/* Right Column: Contact Form */}
                        <form className="space-y-6 archimoto">
                            <div className="relative">
                                <input type="text" id="name" placeholder=" " className="block w-full p-4 bg-transparent border border-secondary rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer" />
                                <label htmlFor="name" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Your Name</label>
                            </div>
                            <div className="relative">
                                <input type="email" id="email" placeholder=" " className="block w-full p-4 bg-transparent border border-secondary rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer" />
                                <label htmlFor="email" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Your Email</label>
                            </div>
                            <div className="relative">
                                <textarea id="message" rows={5} placeholder=" " className="block w-full p-4 bg-transparent border border-secondary rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer"></textarea>
                                <label htmlFor="message" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Your Message</label>
                            </div>
                            <button type="submit" className="w-full bg-transparent border-2 border-tertiary text-tertiary font-bold py-3 px-6 rounded-lg button-wipe-hover uppercase tracking-wider archimoto-bold transition-colors duration-100" data-text="Send Message">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
