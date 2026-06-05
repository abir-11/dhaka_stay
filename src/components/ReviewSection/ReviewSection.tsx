import React from 'react';
import { GuestReview } from '@/types';

const reviews: GuestReview[] = [
    { id: '1', name: 'Sarah Jenkins', role: 'Business Traveler', text: 'DhakaStay made my 2-week business trip so much easier. The Gulshan apartment was exactly as described and the wifi was blazing fast!' },
    { id: '2', name: 'Ahmed Raza', role: 'Tourist', text: 'The local tips provided by the host were invaluable. We saw parts of Dhaka we never would have found on our own. 10/10 experience.' },
    { id: '3', name: 'Elena Rodriguez', role: 'Digital Nomad', text: 'Clean, secure, and beautiful. The check-in process was seamless and the support team answered my questions within minutes.' },
    { id: '4', name: 'John Doe', role: 'Expat', text: 'Renting through DhakaStay while searching for permanent housing was the best decision. Flexible and professional service.' },
    { id: '5', name: 'Maria Khan', role: 'Vacationer', text: 'My family loved the lakeside villa in Dhanmondi. It was a true oasis in the middle of the bustling city. Very peaceful stay.' },
    { id: '6', name: 'Liam O\'Connor', role: 'Backpacker', text: 'Even the budget options are top-notch. Verified homes mean you get exactly what you see in the pictures. Highly recommend.' },
];

export default function ReviewSection() {
    return (
        <section className="bg-[#f8f9fa] py-16">
            <div className="max-w-11/12 mx-auto px-6">
                <h2 className="text-[20px] font-medium text-center mb-10 text-gray-800">What Our Guests Say</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-7 rounded-[20px] shadow-sm border border-pink-100/60 flex flex-col justify-between">
                            <div>
                                <div className="flex text-[#c81e51] mb-4 gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            star
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-500 italic text-[14px] leading-relaxed mb-8">"{review.text}"</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 font-bold text-[14px] shrink-0">
                                    {review.name.charAt(0)}
                                </div>
                                <div className="overflow-hidden">
                                    <h4 className="font-bold text-gray-900 text-[13px] truncate">{review.name}</h4>
                                    <p className="text-[11px] text-gray-400 font-normal mt-0.5 truncate">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}