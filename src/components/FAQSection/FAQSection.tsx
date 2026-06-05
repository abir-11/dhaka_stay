'use client';

import React, { useState } from 'react';
import { FAQItem } from '@/types';

const faqs: FAQItem[] = [
  { id: '1', question: 'How does check-in work?', answer: 'We offer smart-lock self check-in for 90% of our properties. You will receive a unique code 24 hours before your arrival.' },
  { id: '2', question: 'What is the cancellation policy?', answer: 'Full refund for cancellations made up to 48 hours before check-in. Flexible options are available.' },
  { id: '3', question: 'Are the apartments safe?', answer: 'Yes. All our properties are located in secure buildings with 24/7 guard service, CCTV, and neighborhood patrols.' },
  { id: '4', question: 'Is there a long-term discount?', answer: 'Absolutely. We offer discounts up to 30% for stays longer than 30 days.' },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-[#fcfdfd] py-16">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-[14px] font-medium text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
        
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <div 
              key={faq.id}
              className="bg-white border border-pink-100/60 rounded-[14px] shadow-sm overflow-hidden transition-all duration-300"
            >
              <button 
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
              >
                <span className="text-[14px] font-bold text-gray-900">{faq.question}</span>
                <span 
                  className={`material-symbols-outlined text-[#c81e51] text-[20px] transition-transform duration-300 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                  style={{ fontVariationSettings: "'wght' 300" }}
                >
                  expand_more
                </span>
              </button>
              
              <div 
                className={`px-6 text-[13px] text-gray-600 transition-all duration-300 ease-in-out ${
                  openId === faq.id ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 py-0 opacity-0'
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}