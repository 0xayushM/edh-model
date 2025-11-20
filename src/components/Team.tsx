"use client"

import React from 'react'
import SplitText from '@/ui/SplitText'
import TeamCarousel from './TeamCarousel'
import teams from '@/data/teams.json'

const Team = () => {
    const items = teams;
    return (
        <>
            <section id="Team" className="py-24 md:py-0 h-screen flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm overflow-hidden">
                <div className='flex flex-col items-center justify-center h-full w-full '>
                    <SplitText
                        text="Meet the Team"
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
                        <div className="w-full pt-10">
                            <TeamCarousel members={items} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Team