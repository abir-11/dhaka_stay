"use client";

import { Search } from "lucide-react";

export default function HeroSectionComponent() {
  return (
    <div className="relative w-full h-[80vh] min-h-[700px] flex items-center justify-center font-sans">
      
      {/* Background Image with Dark Overlay */}
      {/* Note: I've used a placeholder high-quality city dusk image. Replace the URL with your exact asset if needed. */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBfNTBNQMWGlFZi-QyBoXyOHDUldhdMNLTAF7fuyyooG2J-kPsG16ZkHFUOJoLaBmb_uXB-DIaU-jGPfddzQRy80WLg5LIqk6KU5EhdnBxx4TrzKUQT453j12ezqi3QaAdlWsGux8JA2cl6LYFs5AFRMqW9Y5NkAx1XqL9WFckdYIqzGOm1joToKxPB2zMNI9SgmCMdcm7GWfCVcAeQDWI2AGfMcgKodqgP6yle5vwHNW8_gzyvQ65o2XeKw-K9AfnawXfDuxu0NEY')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-4">
        
        {/* Hero Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-semibold text-white text-center mb-10 drop-shadow-md leading-[1.15]">
          Find Your Perfect Stay in <br className="hidden md:block" /> Dhaka
        </h1>

        {/* Floating Search Bar (Glassmorphism Effect) */}
        <div className="w-full max-w-[850px] bg-white/80 backdrop-blur-md rounded-full shadow-2xl flex flex-col sm:flex-row items-center border border-white/30 p-2 md:pl-8">
          
          {/* Location Block */}
          <div className="flex-1 w-full md:w-auto px-6 py-3 md:py-2 md:px-4 hover:bg-black/5 rounded-full cursor-pointer transition-colors text-left">
            <label className="block text-[10px] font-bold text-gray-800 tracking-wider mb-0.5">LOCATION</label>
            <input
              type="text"
              placeholder="Where are you going?"
              className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-medium text-gray-800 placeholder:text-gray-400 outline-none truncate"
            />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-[1px] h-8 bg-gray-300 mx-2"></div>

          {/* Check-In Block */}
          <div className="flex-1 w-full md:w-auto px-6 py-3 md:py-2 md:px-4 hover:bg-black/5 rounded-full cursor-pointer transition-colors text-left">
            <label className="block text-[10px] font-bold text-gray-800 tracking-wider mb-0.5">CHECK IN</label>
            <div className="text-sm font-medium text-gray-400 truncate">Add dates</div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-[1px] h-8 bg-gray-300 mx-2"></div>

          {/* Check-Out Block */}
          <div className="flex-1 w-full md:w-auto px-6 py-3 md:py-2 md:px-4 hover:bg-black/5 rounded-full cursor-pointer transition-colors text-left">
            <label className="block text-[10px] font-bold text-gray-800 tracking-wider mb-0.5">CHECK OUT</label>
            <div className="text-sm font-medium text-gray-400 truncate">Add dates</div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-[1px] h-8 bg-gray-300 mx-2"></div>

          {/* Guests & Submit Button Block */}
          <div className="flex flex-1 w-full md:w-auto items-center justify-between px-6 py-2 md:pl-4 md:pr-2 hover:bg-black/5 rounded-full cursor-pointer transition-colors">
            <div className="flex-grow pr-4 text-left">
              <label className="block text-[10px] font-bold text-gray-800 tracking-wider mb-0.5">GUESTS</label>
              <div className="text-sm font-medium text-gray-400 truncate">Add guests</div>
            </div>
            
            {/* Action Button matching the Image */}
            <button className="flex-shrink-0 bg-[#d9043d] hover:bg-[#ba0036] transition-colors h-12 w-12 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transform">
              <Search size={20} strokeWidth={2.5} />
            </button>
          </div>

        </div>
      </div>
      
    </div>
  );
}