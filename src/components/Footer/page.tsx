import React from 'react';
import { FooterLinkGroup } from '@/types';

const footerGroups: FooterLinkGroup[] = [
  {
    id: 'support',
    title: 'Support',
    links: ['Help Center', 'DhakaCover', 'Anti-discrimination', 'Disability support']
  },
  {
    id: 'hosting',
    title: 'Hosting',
    links: ['DhakaStay your home', 'Host resources', 'Community forum', 'Hosting responsibly']
  },
  {
    id: 'company',
    title: 'Company',
    links: ['Newsroom', 'Careers', 'Investors', 'Gift cards']
  }
];

export default function Footer() {
  return (
    <footer className="bg-[#fcfdfd] pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-11/12 mx-auto px-6">
        
        {/* Top Section - Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-30 mb-12">
          
          {/* Brand Info (Spans 3 columns on large screens) */}
          <div className="lg:col-span-3 pr-0 lg:pr-16">
            <h3 className="text-[14px] font-bold text-gray-900 mb-4">DhakaStay</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed max-w-sm">
              Elevating the short-term rental experience in Dhaka through verification, quality control, and localized hospitality services.
            </p>
          </div>

          {/* Dynamic Link Groups */}
          {footerGroups.map((group) => (
            <div key={group.id} className="lg:col-span-1">
              <h3 className="text-[14px] font-bold text-gray-900 mb-4">{group.title}</h3>
              <ul className="flex flex-col gap-3">
                {group.links.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href="#" 
                      className="text-[13px] text-gray-500 hover:text-[#c81e51] hover:underline transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section - Copyright & Secondary Links */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-8 border-t border-gray-200 gap-6">
          
          <div className="text-[12px] text-gray-500 text-center md:text-left">
            © 2024 DhakaStay, Inc. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-[11px] font-bold text-gray-600 tracking-wider uppercase">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Sitemap</a>
            
            <div className="flex items-center gap-3 ml-2 text-gray-800">
              <button className="hover:text-[#c81e51] transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'wght' 300" }}>
                  language
                </span>
              </button>
              <button className="hover:text-[#c81e51] transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'wght' 300" }}>
                  share
                </span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}