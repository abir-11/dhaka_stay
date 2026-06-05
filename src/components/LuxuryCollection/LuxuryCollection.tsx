import React from 'react';
import { LuxuryProperty } from '@/types';

const featuredProperty: LuxuryProperty = {
  id: '1',
  title: 'The Presidential Suite at Gulshan-2',
  subtitle: '$450 per night • Full Concierge Included',
  image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop', // High quality placeholder
  isFeatured: true,
  tag: 'FEATURED LUXURY'
};

const sideProperties: LuxuryProperty[] = [
  {
    id: '2',
    title: 'Spa Haven Loft',
    subtitle: 'Banani Hills',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1968&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Gourmet Designer Suite',
    subtitle: 'Baridhara Exclusive',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop'
  }
];

export default function LuxuryCollection() {
  return (
    <section className="bg-[#2d2d2d] text-white py-16">
      <div className="max-w-11/12 mx-auto px-6">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-[28px] font-semibold text-white tracking-tight">Luxury Collection</h2>
            <p className="text-gray-400 mt-1 text-sm">The finest architectural gems in the city.</p>
          </div>
          <button className="px-6 py-2.5 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors text-sm">
            View All Luxury
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-auto md:h-[550px]">
          
          {/* Main Featured Card (Spans 8 columns) */}
          <div className="md:col-span-8 relative rounded-2xl overflow-hidden group h-[400px] md:h-full">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              alt={featuredProperty.title} 
              src={featuredProperty.image}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-8 left-8 pr-8">
              <span className="bg-[#c81e51] text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide mb-3 inline-block">
                {featuredProperty.tag}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">{featuredProperty.title}</h3>
              <p className="text-gray-300 text-sm font-medium">{featuredProperty.subtitle}</p>
            </div>
          </div>

          {/* Right Side Stacked Cards (Spans 4 columns) */}
          <div className="md:col-span-4 flex flex-col gap-5 h-auto md:h-full">
            {sideProperties.map((prop) => (
              <div key={prop.id} className="flex-1 relative rounded-2xl overflow-hidden group h-[250px] md:h-1/2">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt={prop.title} 
                  src={prop.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-base font-bold text-white tracking-wide">{prop.title}</h3>
                  <p className="text-[11px] text-gray-300 mt-0.5">{prop.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}