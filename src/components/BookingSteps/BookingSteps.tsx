import React from 'react';
import { BookingStep } from '@/types';

const steps: BookingStep[] = [
    {
        id: '1',
        icon: 'search',
        title: 'Find Your Stay',
        description: 'Browse 500+ verified apartments across Dhaka\'s best neighborhoods.'
    },
    {
        id: '2',
        icon: 'event_available',
        title: 'Book Securely',
        description: 'Select your dates and pay securely through our protected portal.'
    },
    {
        id: '3',
        icon: 'key',
        title: 'Enjoy Dhaka',
        description: 'Receive your smart-lock code and check in at your convenience.'
    }
];

export default function BookingSteps() {
    return (
        <section className="bg-white py-16">
            <div className="max-w-11/12 mx-auto px-6">
                <h2 className="text-[15px] font-bold text-center text-gray-800 mb-12">Booking in 3 Easy Steps</h2>

                <div className="relative">
                    {/* Dashed Connector Line (Visible on md+ screens) */}
                    <div className="hidden md:block absolute top-[30px] left-[15%] right-[15%] h-[1px] border-t border-dashed border-pink-200 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {steps.map((step) => (
                            <div key={step.id} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="w-[60px] h-[60px] bg-[#c81e51] rounded-full flex items-center justify-center text-white shadow-md mb-6 ring-8 ring-white">
                                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
                                        {step.icon}
                                    </span>
                                </div>
                                <h3 className="text-[14px] font-bold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-[13px] text-gray-500 leading-relaxed max-w-[240px]">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}