"use client";

import React, { useEffect, useState } from 'react';
import Cubes from '@/ui/Cubes';

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactDialog = ({ isOpen, onClose }: ContactDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const endpoint = `${process.env.NEXT_PUBLIC_DASHBOARD_ENDPOINT}/${process.env.NEXT_PUBLIC_DASHBOARD_PROJECT_ID}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          api_key: process.env.NEXT_PUBLIC_DASHBOARD_API_KEY, 
          form_name: 'contact-dialog', 
          data: {
            name: formData.name,
            email: formData.email,
            message: formData.message
          }
        })
      });

      if (!response.ok) throw new Error('Failed to submit form');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id.replace('dialog-', '')]: e.target.value
    }));
  };
  useEffect(() => {
    if (isOpen) {
      // Freeze scroll on the drei scroll container and body
      const scrollContainer = document.querySelector('.scroll') as HTMLElement;
      const body = document.body;
      const html = document.documentElement;
      
      // Store the current scroll position
      const scrollPosition = scrollContainer?.scrollTop || 0;
      
      // Prevent all scroll events
      const preventScroll = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };
      
      // Disable scrolling on body and html
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.width = '100%';
      
      if (scrollContainer) {
        scrollContainer.style.pointerEvents = 'none';
        scrollContainer.style.overflow = 'hidden';
        scrollContainer.style.touchAction = 'none';
        
        // Add event listeners to prevent scrolling
        scrollContainer.addEventListener('wheel', preventScroll, { passive: false });
        scrollContainer.addEventListener('touchmove', preventScroll, { passive: false });
        scrollContainer.addEventListener('scroll', preventScroll, { passive: false });
      }
      
      // Also prevent on window
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      
      // Cleanup function
      return () => {
        body.style.overflow = '';
        html.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
        
        if (scrollContainer) {
          scrollContainer.style.pointerEvents = '';
          scrollContainer.style.overflow = '';
          scrollContainer.style.touchAction = '';
          scrollContainer.removeEventListener('wheel', preventScroll);
          scrollContainer.removeEventListener('touchmove', preventScroll);
          scrollContainer.removeEventListener('scroll', preventScroll);
          scrollContainer.scrollTop = scrollPosition;
        }
        
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed h-screen overflow-hidden inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/95 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog Content */}
      <div className="relative z-10 w-[90vw] max-w-6xl max-h-[90vh] overflow-y-auto bg-background border border-tertiary/30 rounded-lg p-6 md:p-12">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground hover:text-tertiary transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Contact Section Content */}
        <div className='flex flex-col items-center justify-center w-full'>
          <h2 className="w-full uppercase pb-4 md:pb-8 text-foreground text-sm md:text-sm font-light text-start archimoto-bold uppercase tracking-[0.4em]">
            Contact Us
          </h2>
          
          <div className="w-full flex flex-col items-center justify-center">
            <hr className="w-full border-secondary" />
            <div className="w-full flex flex-col lg:flex-row lg:gap-12 pt-4 md:pt-10">
              {/* Left Column: Cubes Animation */}
              <div className="hidden md:flex lg:items-start mx-auto lg:justify-start mb-8 md:mb-0 h-[392px] w-[392px]">
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
              <form onSubmit={handleSubmit} className="flex-1 space-y-6 archimoto flex flex-col w-full">
                {submitStatus === 'success' && (
                  <div className="bg-tertiary/20 border border-tertiary text-tertiary px-4 py-3 rounded-lg">
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                    Failed to send message. Please try again.
                  </div>
                )}
                
                <div className="relative">
                  <input 
                    type="text" 
                    id="dialog-name" 
                    placeholder=" " 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="block w-full p-4 bg-transparent border border-tertiary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer disabled:opacity-50" 
                  />
                  <label 
                    htmlFor="dialog-name" 
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Your Name
                  </label>
                </div>
                
                <div className="relative">
                  <input 
                    type="email" 
                    id="dialog-email" 
                    placeholder=" " 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="block w-full p-4 bg-transparent border border-tertiary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer disabled:opacity-50" 
                  />
                  <label 
                    htmlFor="dialog-email" 
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Your Email
                  </label>
                </div>
                
                <div className="relative">
                  <textarea 
                    id="dialog-message" 
                    rows={5} 
                    placeholder=" " 
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="block w-full p-4 bg-transparent border border-tertiary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer disabled:opacity-50"
                  />
                  <label 
                    htmlFor="dialog-message" 
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Your Message
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-transparent border-2 border-tertiary text-tertiary font-bold py-3 px-6 rounded-lg button-wipe-hover uppercase tracking-wider archimoto-bold transition-colors duration-100 disabled:opacity-50 disabled:cursor-not-allowed" 
                  data-text={isSubmitting ? "Sending..." : "Send Message"}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
              
              {/* Right Column: Vertical Text */}
              <div className="hidden lg:flex items-center justify-start">
                <h1 className="[writing-mode:vertical-lr] text-7xl font-bold tracking-widest nebulax bg-gradient-to-b from-tertiary to-foreground bg-clip-text text-transparent">
                  EDHWAY
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDialog;
