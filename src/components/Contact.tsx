import React from 'react';
import SplitText from '@/ui/SplitText';
import Footer from './Footer';
import Cubes from '@/ui/Cubes';

const Contact = () => {

    return (
        <>
            <section id="contact" className="py-10 h-screen md:min-h-screen flex flex-col items-center justify-center gradient-background md:pt-12">
                <div className='flex flex-col items-center justify-center h-full w-full'>
                    <SplitText
                        text="Contact Us"
                        className="w-4/5 md:w-6/8 uppercase pb-4 md:pb-8 text-foreground text-sm md:text-sm font-light text-start archimoto-bold uppercase tracking-[0.4em]"
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
                    <div className="w-full md:w-[100vw] flex flex-col items-center justify-center">
                        <hr className="w-full md:w-[100vw] border-secondary" />
                        <div className="w-full md:w-6/8 h-full flex flex-col lg:flex-row lg:gap-12 pt-10 px-8 mx-auto md:px-0 ">
                            <div className="hidden md:inline flex lg:items-start mx-auto lg:justify-start mb-8 md:mb-0 h-[392px] w-[392px]">
                                <Cubes
                                    gridSize={8}
                                    cubeSize={36.5}
                                    maxAngle={30}
                                    radius={4}
                                    borderStyle="2px dashed #c08457"
                                    faceColor="var(--foreground)/50"
                                    rippleColor="var(--tertiary)"
                                    rippleSpeed={2}
                                    autoAnimate={true}
                                    rippleOnClick={true}
                                />
                            </div>
                            {/* Right Column: Contact Form */}
                            <form className="flex-1 space-y-6 archimoto flex flex-col w-full">
                                <div className="relative">
                                    <input type="text" id="name" placeholder=" " className="block w-full p-4 bg-transparent border border-tertiary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer" />
                                    <label htmlFor="name" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Your Name</label>
                                </div>
                                <div className="relative">
                                    <input type="email" id="email" placeholder=" " className="block w-full p-4 bg-transparent border border-tertiary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer" />
                                    <label htmlFor="email" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Your Email</label>
                                </div>
                                <div className="relative">
                                    <textarea id="message" rows={5} placeholder=" " className="block w-full p-4 bg-transparent border border-tertiary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer"></textarea>
                                    <label htmlFor="message" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Your Message</label>
                                </div>
                                <button type="submit" className="w-full bg-transparent border-2 border-tertiary text-tertiary font-bold py-3 px-6 rounded-lg button-wipe-hover uppercase tracking-wider archimoto-bold transition-colors duration-100" data-text="Send Message">Send Message</button>
                            </form>
                            <div className="hidden lg:flex items-center justify-start ">
                                <h1 className="[writing-mode:vertical-lr] text-7xl font-bold tracking-widest nebulax bg-gradient-to-b from-tertiary to-foreground bg-clip-text text-transparent">EDHWAY</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </>
    );
};

export default Contact;
