import React from 'react';
import SplitText from '@/ui/SplitText';
import CountUp from '@/ui/CountUp';

const About = () => {

    return (
        <section id="about" className="min-h-screen bg-foreground/80 backdrop-blur-md flex flex-col items-center justify-center">
            <div className='flex flex-col items-center justify-center md:h-full w-full'>
                <SplitText
                    text="About Us"
                    className="w-4/5 uppercase py-8 md:pb-8 text-background text-sm md:text-sm font-light text-start archimoto-bold uppercase tracking-[0.4em]"
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
                <div className="w-full md:w-[100vw] flex flex-col items-center justify-center ">
                    <hr className="w-full md:w-[100vw] border-secondary" />
                    <div className='w-4/5 grid md:grid-cols-2 pt-12 pb-20 md:pt-20 items-center gap-8'>
                        <div>
                            <p className="archimoto text-background text-justify break-words hyphens-auto text-lg md:text-2xl">
                                At <span className='text-background nebulax'>EDHWay</span>, we believe that growth should be smooth, not chaotic. Most businesses lose time, money, and opportunities because of broken workflows, disconnected marketing, and manual follow-ups.
                                <br />
                                <br />
                                Our mission is simple: turn <span className='border-tertiary border-b-2 archimoto-bold'>businesses into growth engines</span> by eliminating inefficiencies and giving them the tools to grow predictably.
                            </p>
                        </div>
                        <div className='grid grid-cols-2 gap-y-8 gap-x-0'>
                            <div className='flex flex-col items-center justify-center py-0 text-background nebulax text-2xl md:text-4xl'>
                            <div className='py-2'>
                            <CountUp
                                from={0}
                                to={200}
                                separator=","
                                direction="up"
                                duration={1}
                                className="count-up-text"
                            />+</div>
                            <h1 className='archimoto text-lg md:text-xl text-center'>Workflows<br/> Automated</h1>
                            </div>
                            <div className='flex flex-col items-center justify-center py-0 text-background nebulax text-2xl md:text-4xl'>
                            <div className='py-2'>
                            <CountUp
                                from={0}
                                to={30}
                                separator=","
                                direction="up"
                                duration={1}
                                className="count-up-text"
                            />%</div>
                            <h1 className='archimoto text-lg md:text-xl text-center'>Average <br/>Growth</h1>
                            </div>
                            <div className='flex flex-col items-center justify-center py-0 text-background nebulax text-2xl md:text-4xl'>
                            <div className='py-2'>
                            <CountUp
                                from={0}
                                to={95}
                                separator=","
                                direction="up"
                                duration={1}
                                className="count-up-text"
                            />%</div>
                            <h1 className='archimoto text-lg md:text-xl text-center'>Client <br/>Retention</h1>
                            </div>
                            <div className='flex flex-col items-center justify-center py-0 text-background nebulax text-2xl md:text-4xl'>
                            <div className='py-2'>
                            <CountUp
                                from={0}
                                to={10}
                                separator=","
                                direction="up"
                                duration={1}
                                className="count-up-text"
                            />+</div>
                            <h1 className='archimoto text-lg md:text-xl text-center'>Industries</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
