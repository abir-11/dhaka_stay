import React from 'react';
import { HostingStat } from '@/types';

const stats: HostingStat[] = [
    { value: '12k+', label: 'ACTIVE GUESTS' },
    { value: '85%', label: 'AVG. OCCUPANCY' }
];

export default function HostingCTA() {
    return (
        <section className="bg-[#f2f2f2] py-20 overflow-hidden">
            <div className="max-w-11/12 mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Left Column - Text Content */}
                    <div className="flex flex-col pr-0 md:pr-10">
                        <h2 className="text-[22px] md:text-[26px] font-bold text-gray-900 mb-6 leading-snug">
                            Earn up to $1,500/month hosting in Dhaka
                        </h2>
                        <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed mb-10">
                            List your property on DhakaStay and join a community of professional hosts. We handle the vetting, payments, and 24/7 guest support so you can focus on maximizing your revenue.
                        </p>

                        <div className="flex gap-12 mb-10">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="flex flex-col">
                                    <span className="text-[28px] font-bold text-[#c81e51] mb-1">{stat.value}</span>
                                    <span className="text-[11px] font-bold text-gray-600 tracking-wider">{stat.label}</span>
                                </div>
                            ))}
                        </div>

                        <div>
                            <button className="bg-[#1a1a1a] text-white px-8 py-3.5 rounded-full text-[14px] font-bold hover:bg-black transition-colors shadow-lg">
                                Start Hosting Today
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Image & Floating Badge */}
                    <div className="relative mt-8 md:mt-0">
                        {/* Main Image */}
                        <div className="rounded-[20px] overflow-hidden shadow-xl aspect-[4/3] md:aspect-auto md:h-[450px] w-full">
                            <img
                                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"
                                alt="Modern Dhaka Apartment Interior"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Floating Superhost Badge */}
                        <div className="absolute -bottom-8 md:bottom-6 left-6 right-6 md:right-auto md:-left-8 bg-white p-5 rounded-[16px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] w-auto md:w-[280px] z-20 border border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-5 h-5 bg-[#c81e51] rounded-full flex items-center justify-center text-white shrink-0">
                                    <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        star
                                    </span>
                                </div>
                                <h4 className="text-[13px] font-bold text-gray-900">Superhost Level</h4>
                            </div>
                            <p className="text-[11px] text-gray-500 leading-snug">
                                Hosts with 4.9+ rating earn 25% more on average.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}