import React from 'react';
import company from '@/data/footer.json';

const TriangleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 10 10" className="inline-block mr-4 text-tertiary transform rotate-90">
    <polygon points="0,0 10,5 0,10" fill="currentColor" />
  </svg>
);

const Footer = () => {
  const socialLinks = Object.entries(company.contact.social);
  const midIndex = Math.ceil(socialLinks.length / 2);
  const firstColumn = socialLinks.slice(0, midIndex);
  const secondColumn = socialLinks.slice(midIndex);

  return (
    <footer className="relative w-full text-foreground pt-10 pb-5 md:px-10 font-sans " >
      <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        <div className="hidden md:block md:col-span-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <div>
            <h3 className="text-sm uppercase archimoto-bold tracking-[0.4em] mb-8 text-tertiary">Connect with us</h3>
            <ul className="space-y-4">
              {firstColumn.map(([platform, url]) => (
                <li key={platform}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center text-xl md:text-2xl archimoto-bold transition-colors duration-300">
                    <TriangleIcon />
                    <span className="capitalize tracking-tighter button-wipe-hover" data-text={platform}>{platform}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:pt-[52px]"> 
            <ul className="space-y-4">
              {secondColumn.map(([platform, url]) => (
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
        

        {/* responsive section */}
        <div className="md:hidden grid grid-cols-1 gap-4 md:gap-8">
          <div>
            <h3 className="text-sm uppercase archimoto-bold tracking-[0.4em] mb-8 text-tertiary">Connect with us</h3>
            <ul className="grid grid-cols-2 space-y-4">
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

        <div className="md:text-right pt-0 md:mt-[30px] grid grid-cols-2">
          <div className="mb-6">
            <h4 className="text-sm uppercase archimoto-bold tracking-[0.2em] text-gray-500 mb-2">Email</h4>
            <a href={`mailto:${company.contact.email}`} className="text-md transition-colors archimoto-bold button-wipe-hover duration-300" data-text={company.contact.email}>{company.contact.email}</a>
          </div>
          <div>
            <h4 className="text-sm uppercase archimoto-bold tracking-[0.2em] text-gray-500 mb-2">Phone</h4>
            <a href={`tel:${company.contact.phone}`} className="text-md transition-colors archimoto-bold button-wipe-hover duration-300" data-text={company.contact.phone}>{company.contact.phone}</a>
          </div>
        </div>

      </div>
       <div className="text-center text-gray-600 mt-5 text-sm archimoto-bold">
        © {new Date().getFullYear()} {company.name}. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
