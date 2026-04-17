import React, { useState } from 'react';
import Footer from './Footer';
import Cubes from '@/ui/Cubes';

const Contact = () => {
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
                    form_name: 'contact', 
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
            [e.target.id]: e.target.value
        }));
    };

    return (
        <>
            <section id="contact" className="py-10 h-screen md:min-h-screen flex flex-col items-center justify-center gradient-background md:pt-12">
                <div className='flex flex-col items-center justify-center h-full w-full'>
                    <h1 className="w-4/5 md:w-6/8 uppercase pb-4 md:pb-8 text-foreground text-sm md:text-sm font-light text-start archimoto-bold uppercase tracking-[0.4em]">
                        Contact Us
                    </h1>
                    <div className="w-full md:w-[100vw] flex flex-col items-center justify-center">
                        <hr className="w-full md:w-[100vw] border-secondary" />
                        <div className="w-full md:w-6/8 h-full flex flex-col lg:flex-row lg:gap-12 pt-4 md:pt-10 px-8 mx-auto md:px-0 ">
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
                                        id="name" 
                                        placeholder=" " 
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                        className="block w-full p-4 bg-transparent border border-tertiary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer disabled:opacity-50" 
                                    />
                                    <label htmlFor="name" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Your Name</label>
                                </div>
                                <div className="relative">
                                    <input 
                                        type="email" 
                                        id="email" 
                                        placeholder=" " 
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                        className="block w-full p-4 bg-transparent border border-tertiary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer disabled:opacity-50" 
                                    />
                                    <label htmlFor="email" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Your Email</label>
                                </div>
                                <div className="relative">
                                    <textarea 
                                        id="message" 
                                        rows={5} 
                                        placeholder=" " 
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                        className="block w-full p-4 bg-transparent border border-tertiary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer disabled:opacity-50"
                                    />
                                    <label htmlFor="message" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Your Message</label>
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
