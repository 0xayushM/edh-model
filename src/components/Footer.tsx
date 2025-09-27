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
    <footer className="bg-background text-foreground border-1 py-10 px-10 font-sans border-t-2 border-x-0 border-secondary">
      <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        <div className="md:col-span-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <div>
            <h3 className="text-sm uppercase tracking-[0.4em] mb-8 text-tertiary">Connect with us</h3>
            <ul className="space-y-4">
              {firstColumn.map(([platform, url]) => (
                <li key={platform}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center text-2xl md:text-3xl avalon-bold transition-colors duration-300">
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
                  <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center text-2xl md:text-3xl avalon-bold transition-colors duration-300">
                    <TriangleIcon />
                    <span className="capitalize tracking-tighter button-wipe-hover" data-text={platform}>{platform}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:text-right pt-0 md:pt-[52px]">
          <div className="mb-6">
            <h4 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-2">Email</h4>
            <a href={`mailto:${company.contact.email}`} className="text-lg transition-colors button-wipe-hover duration-300" data-text={company.contact.email}>{company.contact.email}</a>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-2">Phone</h4>
            <a href={`tel:${company.contact.phone}`} className="text-lg transition-colors button-wipe-hover duration-300" data-text={company.contact.phone}>{company.contact.phone}</a>
          </div>
        </div>

      </div>
       <div className="text-center text-gray-600 mt-20 text-sm avalon-bold">
        © {new Date().getFullYear()} {company.name}. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
