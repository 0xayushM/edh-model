import React from 'react';
import company from '@/data/footer.json';

const TriangleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 10 10" className="inline-block mr-4 text-tertiary transform rotate-90">
    <polygon points="0,0 10,5 0,10" fill="currentColor" />
  </svg>
);

const SocialIcon = ({ platform }: { platform: string }) => {
  const iconClass = "w-6 h-6";
  
  switch (platform.toLowerCase()) {
    case 'linkedin':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      );
    case 'twitter':
    case 'x':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
      );
  }
};

const EmailIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const Footer = () => {
  const socialLinks = Object.entries(company.contact.social);

  return (
    <footer className="relative w-full text-foreground pt-10 pb-5 md:px-10 font-sans " >
      <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8 items-start">
        
        <div className="hidden md:block md:col-span-2 grid grid-cols-1 gap-0 sm:grid-cols-2 md:gap-4">
          <div>
            <h3 className="text-sm uppercase archimoto-bold tracking-[0.4em] mb-4 md:mb-8 text-tertiary">Connect with us</h3>
            <ul className="space-y-4">
              {socialLinks.map(([platform, url]) => (
                <li key={platform}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center text-xl md:text-2xl archimoto-bold transition-colors duration-300">
                    <TriangleIcon />
                    <span className="capitalize tracking-tighter button-wipe-hover" data-text={platform}>{platform}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        

        {/* responsive section - icons only */}
        <div className="md:hidden">
          <div>
            <h3 className="text-sm uppercase archimoto-bold tracking-[0.4em] mb-4 text-tertiary">Connect with us</h3>
            <div className="flex items-center gap-6">
              {socialLinks.map(([platform, url]) => (
                <a 
                  key={platform}
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-foreground hover:text-tertiary transition-colors duration-300"
                  aria-label={platform}
                >
                  <SocialIcon platform={platform} />
                </a>
              ))}
              <a 
                href={`mailto:${company.contact.email}`}
                className="text-foreground hover:text-tertiary transition-colors duration-300"
                aria-label="Email"
              >
                <EmailIcon />
              </a>
              <a 
                href={`tel:${company.contact.phone}`}
                className="text-foreground hover:text-tertiary transition-colors duration-300"
                aria-label="Phone"
              >
                <PhoneIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="md:text-right pt-0 grid grid-cols-1">
          {/* <div className="mb-6">
            <h4 className="text-sm uppercase archimoto-bold tracking-[0.2em] text-gray-500 mb-2">Email</h4>
            <a href={`mailto:${company.contact.email}`} className="text-md transition-colors archimoto-bold button-wipe-hover duration-300" data-text={company.contact.email}>{company.contact.email}</a>
          </div> */}
        </div>

      </div>
       <div className="text-center text-gray-600 mt-5 text-sm archimoto-bold">
        © {new Date().getFullYear()} {company.name}. All Rights Reserved. 
      </div>
    </footer>
  );
};

export default Footer;
