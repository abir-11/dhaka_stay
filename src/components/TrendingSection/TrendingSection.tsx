import React from 'react';
import { TrendingStay } from '@/types';

const trendingStays: TrendingStay[] = [
    { id: '1', title: 'Eco-Lodge in Purbachal', price: '$45', image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000&auto=format&fit=crop' },
    { id: '2', title: 'Retro Studio House', price: '$52', image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067&auto=format&fit=crop' },
    { id: '3', title: 'Executive View Suite', price: '$99', image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop' },
    { id: '4', title: 'Sky Pool Apartment', price: '$150', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop' },
];

export default function TrendingSection() {
    return (
        <section className="py-16 max-w-11/12 mx-auto px-6 overflow-hidden bg-white">
            <h2 className="text-[20px] font-medium text-gray-800 mb-6">Trending This Week</h2>

            {/* Horizontal Carousel */}
            <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory">
                {trendingStays.map((stay) => (
                    <div key={stay.id} className="flex-none w-[260px] group cursor-pointer snap-start">
                        <div className="relative h-[320px] rounded-2xl overflow-hidden mb-3">
                            <img
                                src={stay.image}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                alt={stay.title}
                            />
                        </div>
                        <h4 className="font-bold text-gray-900 text-[15px] mb-0.5 truncate">{stay.title}</h4>
                        <p className="text-[14px]">
                            <span className="text-[#c81e51] font-bold">{stay.price}</span> <span className="text-gray-500 font-normal">night</span>
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}