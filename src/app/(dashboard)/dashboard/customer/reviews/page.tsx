"use client";

import React, { useState } from "react";

// Dummy Data for "To Write" Reviews
const toWriteReviews = [
  {
    id: "R-101",
    title: "Skyline Luxury Suite",
    location: "Gulshan, Dhaka",
    dates: "Oct 12 - 15, 2023",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "R-102",
    title: "The Heritage Boutique",
    location: "Banani, Dhaka",
    dates: "Sep 28 - Oct 2, 2023",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "R-103",
    title: "Serene Lakeside Villa",
    location: "Uttara, Dhaka",
    dates: "Sep 15 - 18, 2023",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=500&auto=format&fit=crop",
  },
];

// Dummy Data for Already "Written" Reviews
const writtenReviews = [
  {
    id: "W-201",
    title: "Luxury Apt in Gulshan",
    location: "Gulshan, Dhaka",
    reviewDate: "Jan 12, 2026",
    userRating: 5,
    comment: "Excellent experience! The lake view from the balcony was absolutely breathtaking, and the host Rahat was super helpful with everything.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "W-202",
    title: "Dhanmondi Cozy Studio",
    location: "Dhanmondi, Dhaka",
    reviewDate: "Dec 05, 2025",
    userRating: 4,
    comment: "Very clean apartment and great location close to cafes. The check-in process was seamless. Would stay here again.",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=500&auto=format&fit=crop",
  },
];

export default function MyReviewsPage() {
  const [activeTab, setActiveTab] = useState("to-write"); // 'to-write' or 'written'

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-in fade-in duration-300">
      
      {/* Top Header & Stats Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Reviews</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Manage your past experiences and share your feedback with the community.
          </p>
        </div>

        {/* Figma Style Stats Box */}
        <div className="bg-white border border-gray-200/80 rounded-2xl px-6 py-3 flex items-center divide-x divide-gray-100 shadow-sm self-start sm:self-auto min-w-[260px]">
          <div className="pr-6 flex-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Average Rating</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-lg font-extrabold text-gray-900">4.8</span>
              <span className="material-symbols-outlined text-amber-500 text-[18px] fill-amber-500 font-bold">star</span>
            </div>
          </div>
          <div className="pl-6 flex-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Reviews</p>
            <p className="text-lg font-extrabold text-gray-900 mt-0.5">24</p>
          </div>
        </div>
      </div>

      {/* Underline Tabs Switcher */}
      <div className="flex items-center border-b border-gray-100 gap-8">
        <button
          onClick={() => setActiveTab("to-write")}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === "to-write" ? "text-[#ba0036]" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          To Write ({toWriteReviews.length})
          {activeTab === "to-write" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ba0036] rounded-full animate-in fade-in duration-200" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("written")}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === "written" ? "text-[#ba0036]" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Written ({writtenReviews.length + 19}) {/* +19 to match total 24 reviews stat */}
          {activeTab === "written" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ba0036] rounded-full animate-in fade-in duration-200" />
          )}
        </button>
      </div>

      {/* Grid Content rendering based on active tab state */}
      {activeTab === "to-write" ? (
        /* TO WRITE GRID LAYOUT (Exact Figma Style) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toWriteReviews.map((review) => (
            <div key={review.id} className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="relative h-48 bg-gray-50 overflow-hidden">
                <img src={review.image} alt={review.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {review.dates}
                </span>
              </div>
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900 tracking-tight">{review.title}</h3>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{review.location}</p>
                </div>
                <button className="w-full py-3 bg-[#ba0036] hover:bg-[#9a002d] text-white text-xs font-bold rounded-xl transition-colors shadow-sm shadow-rose-950/5 active:scale-[0.99]">
                  Write Review
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* WRITTEN REVIEWS LIST/GRID LAYOUT */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {writtenReviews.map((review) => (
            <div key={review.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row gap-4 hover:border-gray-200 transition-colors">
              <div className="w-full sm:w-36 h-28 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                <img src={review.image} alt={review.title} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 tracking-tight">{review.title}</h3>
                    <p className="text-[11px] text-gray-400 font-medium">{review.location}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400 shrink-0">{review.reviewDate}</span>
                </div>
                {/* Generated Star Ratings */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`material-symbols-outlined text-[16px] ${
                        i < review.userRating ? "text-amber-500 fill-amber-500" : "text-gray-200"
                      }`}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 font-medium leading-relaxed italic">
                  &quot;{review.comment}&quot;
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}