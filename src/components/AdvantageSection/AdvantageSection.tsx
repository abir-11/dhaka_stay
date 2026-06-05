import React from 'react';
import { Advantage } from '@/types';

const advantages: Advantage[] = [
  { icon: 'verified_user', title: 'Verified Listings', description: 'Every property is physically inspected for quality and safety.' },
  { icon: 'payments', title: 'Best Price', description: 'Find the best rates guaranteed for short and long term stays.' },
  { icon: 'security', title: 'Secure Payments', description: 'Your money is safe with our encrypted booking system.' },
  { icon: 'support_agent', title: '24/7 Support', description: 'Dedicated local concierge ready to help any time.' },
];

export default function AdvantageSection() {
  return (
    <section className="py-16 max-w-11/12 mx-auto px-6 text-center bg-white">
      <h2 className="text-3xl font-semibold mb-12 text-gray-900">The DhakaStay Advantage</h2>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6">
        {advantages.map((adv, index) => (
          <div 
            key={index} 
            className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#c81e51] transition-colors flex flex-col items-center group"
          >
            <span 
              className="material-symbols-outlined text-[40px] text-[#c81e51] mb-4" 
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
            >
              {adv.icon}
            </span>
            <h3 className="text-base font-bold mb-2 text-gray-900">{adv.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
              {adv.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}