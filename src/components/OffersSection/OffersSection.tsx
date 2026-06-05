import React from 'react';
import { Offer } from '@/types';

const offers: Offer[] = [
    {
        id: '1',
        badgeText: 'MONTHLY DEAL',
        title: 'Stay 30+ Days, Save 30%',
        description: 'Perfect for digital nomads and corporate travelers looking for a home base.',
        circleText: '-30%',
        linkText: 'Claim Discount',
        theme: 'pink',
    },
    {
        id: '2',
        badgeText: 'WEEKEND GETAWAY',
        title: 'Flat $50 Off Weekends',
        description: 'Escape the routine with a luxury staycation in any of our premium suites.',
        circleText: '$50',
        linkText: 'Get Coupon',
        theme: 'gray',
    },
];

export default function OffersSection() {
    return (
        <section className="bg-white py-12">
            <div className="max-w-11/12 mx-auto px-6">
                <h2 className="text-[14px] font-medium text-gray-800 mb-6">Limited Time Offers</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {offers.map((offer) => (
                        <div
                            key={offer.id}
                            className={`relative p-8 rounded-[24px] border flex flex-col justify-between min-h-[220px] transition-transform hover:scale-[1.01] ${offer.theme === 'pink'
                                    ? 'bg-[#fcf4f6] border-pink-100/60'
                                    : 'bg-[#f5f5f5] border-gray-200/60'
                                }`}
                        >
                            <div className="flex justify-between items-start z-10">
                                <div className="max-w-[70%]">
                                    {/* Badge */}
                                    <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest text-white mb-4 ${offer.theme === 'pink' ? 'bg-[#c81e51]' : 'bg-[#555555]'
                                        }`}>
                                        {offer.badgeText}
                                    </span>

                                    {/* Text Content */}
                                    <h3 className="text-[22px] font-bold text-gray-900 mb-2 leading-tight">
                                        {offer.title}
                                    </h3>
                                    <p className="text-[13px] text-gray-600 leading-relaxed mb-6">
                                        {offer.description}
                                    </p>

                                    {/* Link */}
                                    <a href="#" className={`inline-flex items-center gap-1 text-[13px] font-bold transition-opacity hover:opacity-80 ${offer.theme === 'pink' ? 'text-[#c81e51]' : 'text-gray-800'
                                        }`}>
                                        {offer.linkText}
                                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                    </a>
                                </div>

                                {/* Right Circle Graphic */}
                                <div className={`shrink-0 w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-full flex items-center justify-center text-white text-[24px] md:text-[28px] font-bold shadow-sm ${offer.theme === 'pink' ? 'bg-[#c81e51]' : 'bg-[#555555]'
                                    }`}>
                                    {offer.circleText}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}