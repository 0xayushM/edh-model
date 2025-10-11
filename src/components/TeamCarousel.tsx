"use client"

import React, { useEffect, useRef, useState } from 'react'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

interface TeamMember {
    image: string
    title: string
    subtitle: string
    handle: string
    borderColor: string
    gradient: string
    url: string
}

interface TeamCarouselProps {
    members: TeamMember[]
}

const TeamCarousel = ({ members }: TeamCarouselProps) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<number | null>(null)
    const scrollPositionRef = useRef(0)
    const [isPaused, setIsPaused] = useState(false)
    
    // Duplicate members for infinite scroll effect
    const duplicatedMembers = [...members, ...members, ...members]

    useEffect(() => {
        const scrollContainer = scrollRef.current
        if (!scrollContainer) return

        const scrollSpeed = 0.5 // pixels per frame
        const cardWidth = 320 // card width + gap
        const resetPoint = cardWidth * members.length

        const animate = () => {
            if (!isPaused) {
                scrollPositionRef.current += scrollSpeed
                
                // Reset scroll position when we've scrolled through one set
                if (scrollPositionRef.current >= resetPoint) {
                    scrollPositionRef.current = 0
                }
                
                scrollContainer.scrollLeft = scrollPositionRef.current
            }
            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [members.length, isPaused])

    const handleScroll = (direction: 'left' | 'right') => {
        const scrollContainer = scrollRef.current
        if (!scrollContainer) return

        const cardWidth = 320 // card width + gap
        const scrollAmount = cardWidth * 2 // Scroll 2 cards at a time
        
        if (direction === 'left') {
            scrollPositionRef.current -= scrollAmount
        } else {
            scrollPositionRef.current += scrollAmount
        }

        // Handle wrapping
        const resetPoint = cardWidth * members.length
        if (scrollPositionRef.current < 0) {
            scrollPositionRef.current = resetPoint + scrollPositionRef.current
        } else if (scrollPositionRef.current >= resetPoint) {
            scrollPositionRef.current = scrollPositionRef.current - resetPoint
        }

        scrollContainer.scrollTo({
            left: scrollPositionRef.current,
            behavior: 'smooth'
        })
    }

    return (
        <div className="relative w-full overflow-hidden">
            {/* Left Navigation Button */}
            <button
                onClick={() => handleScroll('left')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-[#252423]/90 hover:bg-[#252423] border border-gray-700 hover:border-[#ededed] rounded-full p-3 transition-all duration-300 hover:scale-110 group"
                aria-label="Scroll left"
            >
                <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-[#ededed] transition-colors" />
            </button>

            {/* Right Navigation Button */}
            <button
                onClick={() => handleScroll('right')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-[#252423]/90 hover:bg-[#252423] border border-gray-700 hover:border-[#ededed] rounded-full p-3 transition-all duration-300 hover:scale-110 group"
                aria-label="Scroll right"
            >
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-[#ededed] transition-colors" />
            </button>

            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/70 to-transparent z-10 pointer-events-none" />
            
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/70 to-transparent z-10 pointer-events-none" />
            
            {/* Scrolling container */}
            <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-hidden py-4"
                style={{ scrollBehavior: 'auto' }}
            >
                {duplicatedMembers.map((member, index) => (
                    <div
                        key={`${member.handle}-${index}`}
                        className="flex-shrink-0 w-[300px] group"
                    >
                        <div className="relative bg-[#252423] rounded-lg overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:scale-105">
                            {/* Image container with B&W filter */}
                            <div className="relative h-[350px] overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                                {/* Gradient overlay */}
                                <div 
                                    className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300 bg-gradient-to-b from-tertiary to-foreground"
                                />
                            </div>
                            
                            {/* Content */}
                            <div className="p-6 space-y-3">
                                <div>
                                    <h3 className="text-xl nebulax font-bold text-[#ededed] mb-1">
                                        {member.title}
                                    </h3>
                                    <p className="text-sm archimoto text-gray-400">
                                        {member.subtitle}
                                    </p>
                                </div>
                                
                                {/* Social handle */}
                                <a
                                    href={member.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#ededed] transition-colors group/link"
                                >
                                    <span className="archimoto">{member.handle}</span>
                                    <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                </a>
                                
                                {/* Color accent bar */}
                                <div 
                                    className="h-1 w-full rounded-full bg-gradient-to-b from-tertiary to-foreground"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TeamCarousel
