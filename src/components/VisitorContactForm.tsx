import React, { useState } from 'react';
import VisitorTracker from '@/lib/visitorTracking';
import { VisitorData } from '@/lib/visitorTracking';

interface VisitorContactFormProps {
  onClose?: () => void;
  show?: boolean;
}

const VisitorContactForm: React.FC<VisitorContactFormProps> = ({ onClose, show = true }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const tracker = VisitorTracker.getInstance();
      await tracker.trackVisitor(formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', jobTitle: '', message: '' });
      
      if (onClose) {
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting visitor contact:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[90vw] max-w-md bg-background border border-tertiary/30 rounded-lg p-6">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-foreground hover:text-tertiary transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <h2 className="text-2xl font-bold text-foreground mb-4 archimoto-bold uppercase tracking-[0.2em]">
          Stay Connected
        </h2>
        
        <p className="text-gray-400 mb-6">
          Join our network and be the first to know about our latest innovations.
        </p>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="bg-green-500/20 border border-green-500 text-green-500 px-4 py-3 rounded-lg mb-4">
            Thank you for connecting! We'll be in touch soon.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-4">
            Something went wrong. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                id="name"
                placeholder=" "
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="block w-full p-3 bg-transparent border border-tertiary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer disabled:opacity-50"
              />
              <label htmlFor="name" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                Name *
              </label>
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
                className="block w-full p-3 bg-transparent border border-tertiary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer disabled:opacity-50"
              />
              <label htmlFor="email" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                Email *
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="tel"
                id="phone"
                placeholder=" "
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                className="block w-full p-3 bg-transparent border border-tertiary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer disabled:opacity-50"
              />
              <label htmlFor="phone" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                Phone
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                id="company"
                placeholder=" "
                value={formData.company}
                onChange={handleChange}
                disabled={isSubmitting}
                className="block w-full p-3 bg-transparent border border-tertiary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer disabled:opacity-50"
              />
              <label htmlFor="company" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                Company
              </label>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              id="jobTitle"
              placeholder=" "
              value={formData.jobTitle}
              onChange={handleChange}
              disabled={isSubmitting}
              className="block w-full p-3 bg-transparent border border-tertiary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer disabled:opacity-50"
            />
            <label htmlFor="jobTitle" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
              Job Title
            </label>
          </div>

          <div className="relative">
            <textarea
              id="message"
              rows={3}
              placeholder=" "
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
              className="block w-full p-3 bg-transparent border border-tertiary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary peer disabled:opacity-50 resize-none"
            />
            <label htmlFor="message" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
              How can we help you?
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-transparent border-2 border-tertiary text-tertiary font-bold py-3 px-6 rounded-lg button-wipe-hover uppercase tracking-wider archimoto-bold transition-colors duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
            data-text={isSubmitting ? "Submitting..." : "Connect With Us"}
          >
            {isSubmitting ? "Submitting..." : "Connect With Us"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VisitorContactForm;
