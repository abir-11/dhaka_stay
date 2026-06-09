"use client";

import React, { useState } from "react";

// Dummy Data for Saved Stays
const savedStaysData = [
  {
    id: "WS-01",
    title: "Gulshan, Dhaka",
    tagline: "Modern Lakeside Penthouse",
    dates: "Dec 12 - 17",
    price: "$145",
    rating: "4.92",
    isGuestFavorite: true,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "WS-02",
    title: "Banani, Dhaka",
    tagline: "Heritage Boutique Suite",
    dates: "Nov 28 - Dec 3",
    price: "$89",
    rating: "4.88",
    isGuestFavorite: false,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "WS-03",
    title: "Dhanmondi, Dhaka",
    tagline: "Artist Loft in Central Dhaka",
    dates: "Feb 10 - 15",
    price: "$65",
    rating: "4.75",
    isGuestFavorite: false,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "WS-04",
    title: "Baridhara, Dhaka",
    tagline: "Garden Retreat Villa",
    dates: "Jan 5 - 12",
    price: "$210",
    rating: "4.98",
    isGuestFavorite: false,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=500&auto=format&fit=crop",
  },
];

// Dummy Data for Saved Experiences
const savedExperiencesData = [
  {
    id: "WE-01",
    title: "Old Dhaka Food Tour",
    tagline: "Traditional Biryani & Street Food Tasting",
    dates: "Every Friday",
    price: "$25",
    rating: "4.95",
    isGuestFavorite: true,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "WE-02",
    title: "Sitalakhya River Cruise",
    tagline: "Private Wooden Boat Ride & Weaver Visit",
    dates: "Flexible Dates",
    price: "$75",
    rating: "4.82",
    isGuestFavorite: false,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=500&auto=format&fit=crop",
  },
];

export default function WishlistPage() {
  const [activeTab, setActiveTab] = useState("stays"); // 'stays' or 'experiences'

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-in fade-in duration-300">
      
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Wishlist</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            {savedStaysData.length + savedExperiencesData.length} saved places and experiences
          </p>
        </div>

        {/* Search and Filters inside Right Side */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Search saved items..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 text-xs sm:text-sm rounded-full focus:outline-none focus:border-[#ba0036]/30 focus:ring-2 focus:ring-[#ba0036]/5 font-medium"
            />
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs sm:text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[18px]">tune</span>
            Filters
          </button>
        </div>
      </div>

      {/* Underline Tabs Switcher matching layout exactly */}
      <div className="flex items-center border-b border-gray-100 gap-8">
        <button
          onClick={() => setActiveTab("stays")}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === "stays" ? "text-[#ba0036]" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Saved Stays ({savedStaysData.length})
          {activeTab === "stays" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ba0036] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("experiences")}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === "experiences" ? "text-gray-400 hover:text-gray-600" : "text-gray-400 hover:text-gray-600"
          } ${activeTab === "experiences" ? "text-[#ba0036]" : ""}`}
        >
          Saved Experiences ({savedExperiencesData.length})
          {activeTab === "experiences" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ba0036] rounded-full" />
          )}
        </button>
      </div>

      {/* Grid Rendering for Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(activeTab === "stays" ? savedStaysData : savedExperiencesData).map((item) => (
          <div key={item.id} className="group relative space-y-3 cursor-pointer">
            
            {/* Image Box Container */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
              <img 
                src={item.image} 
                alt={item.tagline} 
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              
              {/* Heart Wishlist Icon Top Right Corner */}
              <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-rose-600 shadow-md border border-gray-100 hover:scale-105 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-[18px] fill-current">favorite</span>
              </button>

              {/* Guest Favorite Badge Bottom Left Inside Image */}
              {item.isGuestFavorite && (
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm border border-gray-200/40 text-gray-900 font-extrabold text-[10px] tracking-wide px-2.5 py-1 rounded-md shadow-sm uppercase">
                  Guest Favorite
                </div>
              )}
            </div>

            {/* Bottom Content Details Panel */}
            <div className="space-y-1 px-0.5">
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-sm font-extrabold text-gray-900 truncate">{item.title}</h3>
                <div className="flex items-center gap-0.5 text-xs font-bold text-gray-900 shrink-0">
                  <span className="material-symbols-outlined text-[14px] text-gray-900 fill-current">star</span>
                  {item.rating}
                </div>
              </div>
              <p className="text-xs font-semibold text-gray-500 truncate">{item.tagline}</p>
              <p className="text-[11px] font-medium text-gray-400">{item.dates}</p>
              <p className="text-sm font-extrabold text-gray-900 pt-1">
                {item.price} <span className="text-xs font-medium text-gray-400">per night</span>
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}