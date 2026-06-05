"use client";

import Image from "next/image";

interface Area {
  name: string;
  count: string;
  img: string;
}

const areas: Area[] = [
  {
    name: "Gulshan",
    count: "120+ Stays",
    // Premium warm-toned luxury living room in Gulshan style
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Banani",
    count: "85+ Stays",
    // Modern aesthetic apartment interior with frames in Banani style
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Dhanmondi",
    count: "42+ Stays",
    // Cozy white & beige bright spacious lounge in Dhanmondi style
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Uttara",
    count: "64+ Stays",
    // Minimalist wooden texture chic studio in Uttara style
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
  },
];

export default function PopularAreas() {
  return (
    <section className="bg-[#fbfbfb] py-16 md:py-10 font-sans">
      <div className="max-w-[1600px] mx-auto  sm:px-6 px-6">

        {/* Section Header */}
        <div className="mb-10">
          <p className="text-[#ba0036] font-bold tracking-widest text-[11px] uppercase mb-1">
            Locations You&apos;ll Love
          </p>
          <h2 className="text-3xl font-bold text-gray-950 tracking-tight">
            Popular Areas in Dhaka
          </h2>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, i) => (
            <div
              key={i}
              className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Real World Unsplash Image */}
              <Image
                src={area.img}
                alt={`${area.name} Area Dhaka`}
                fill
                sizes="(max-w-11/12) 25vw, 50vw"
                priority={i === 0}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Vignette Overlay for Crisp Text Visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/95" />

              {/* Content Content Info */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {area.name}
                  </h3>
                  <p className="text-xs text-gray-300/90 font-medium mt-0.5">
                    {area.count}
                  </p>

                  {/* Smooth Button Transition */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                    <button className="text-[11px] font-bold uppercase tracking-wider bg-white text-gray-950 hover:bg-[#ff385c] hover:text-white px-5 py-2.5 rounded-full shadow-md transition-colors w-full sm:w-auto text-center">
                      Explore Area
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}