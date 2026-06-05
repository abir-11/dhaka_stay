import React from 'react';
import { PlatformStat } from '@/types';

const stats: PlatformStat[] = [
  { value: '500+', label: 'PREMIUM HOMES' },
  { value: '45k', label: 'HAPPY GUESTS' },
  { value: '12', label: 'KEY NEIGHBORHOODS' },
  { value: '4.9', label: 'AVG. HOST RATING' },
];

export default function StatsSection() {
  return (
    <section className="bg-white py-16 border-b border-gray-100">
      <div className="max-w-11/12 mx-auto ">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-40 text-center divide-x-0 md:divide-x divide-gray-100">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center">
              <span className="text-[36px] md:text-[42px] font-black text-[#b90e3c] mb-1">
                {stat.value}
              </span>
              <span className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}