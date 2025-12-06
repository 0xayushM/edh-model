"use client"

import React from 'react'
import TeamCarousel from './TeamCarousel'
import teams from '@/data/teams.json'

const Team = () => {
    const items = teams;
    return (
        <>
            <section id="Team" className="py-24 md:py-0 h-screen flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm overflow-hidden">
                <div className='flex flex-col items-center justify-center h-full w-full '>
                    <h1 className="w-4/5 md:w-6/8 uppercase pb-8 md:pb-8 text-foreground text-sm md:text-sm font-light text-start archimoto-bold uppercase tracking-[0.4em]">
                        Meet the Team
                    </h1>
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