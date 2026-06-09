"use client";

import React, { useState } from "react";

const bookingsData = [
  {
    id: "DS-88219",
    title: "Dhanmondi Lake-view Loft",
    location: "Dhanmondi, Dhaka",
    dates: "Oct 24 - Oct 28",
    nights: 4,
    amount: "৳ 18,500",
    status: "Active",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "DS-90112",
    title: "Uttara Garden Retreat",
    location: "Uttara, Dhaka",
    dates: "Nov 02 - Nov 05",
    nights: 3,
    amount: "৳ 12,200",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "DS-77123",
    title: "Banani Serene Suite",
    location: "Banani, Dhaka",
    dates: "Sep 15 - Sep 20",
    nights: 5,
    amount: "৳ 22,000",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=150&auto=format&fit=crop",
  },
];

export default function CustomerBookingsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Active", "Upcoming", "Completed", "Cancelled"];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-in fade-in duration-300">
      
      {/* Top Title */}
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Bookings</h1>

      {/* Filters & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all ${
                activeFilter === filter
                  ? "bg-gray-950 text-white shadow-sm"
                  : "bg-white border border-gray-100 text-gray-500 hover:text-gray-900 shadow-sm"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs sm:text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm self-end sm:self-auto">
          <span className="material-symbols-outlined text-[18px]">tune</span>
          Filter
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/40">
                <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Property</th>
                <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Location</th>
                <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Dates</th>
                <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bookingsData.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50/30 transition-colors group">
                  
                  {/* Property Column */}
                  <td className="p-5 flex items-center gap-4 min-w-[280px]">
                    <div className="w-16 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                      <img src={booking.image} alt={booking.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{booking.title}</p>
                      <p className="text-[11px] font-semibold text-gray-400 mt-0.5 tracking-wide">#{booking.id}</p>
                    </div>
                  </td>

                  {/* Location Column */}
                  <td className="p-5 text-sm font-medium text-gray-500 min-w-[150px]">
                    {booking.location}
                  </td>

                  {/* Dates Column */}
                  <td className="p-5 min-w-[150px]">
                    <p className="text-sm font-bold text-gray-800">{booking.dates}</p>
                    <p className="text-[11px] font-medium text-gray-400 mt-0.5">{booking.nights} Nights</p>
                  </td>

                  {/* Amount Column */}
                  <td className="p-5 text-sm font-extrabold text-gray-900 min-w-[110px]">
                    {booking.amount}
                  </td>

                  {/* Status Badges */}
                  <td className="p-5 text-center min-w-[120px]">
                    <span
                      className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        booking.status === "Active"
                          ? "bg-[#ba0036] text-white"
                          : booking.status === "Upcoming"
                          ? "bg-gray-100 text-gray-600 font-semibold"
                          : "bg-gray-100 text-gray-400 font-medium"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  {/* Context-Aware Actions Column */}
                  <td className="p-5 text-right pr-8 min-w-[140px]">
                    <div className="flex items-center justify-end gap-3 text-gray-400">
                      
                      {/* Common View Action */}
                      <button className="hover:text-gray-900 p-1.5 hover:bg-gray-100 rounded-lg transition-colors group/tip relative" title="View Details">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>

                      {/* Dynamic Customer Action per Status */}
                      {booking.status === "Active" && (
                        <button className="hover:text-[#ba0036] p-1.5 hover:bg-rose-50 rounded-lg transition-colors" title="Contact Host / Chat">
                          <span className="material-symbols-outlined text-[20px]">chat</span>
                        </button>
                      )}

                      {booking.status === "Upcoming" && (
                        <button className="hover:text-amber-600 p-1.5 hover:bg-amber-50 rounded-lg transition-colors" title="Modify or Cancel Stay">
                          <span className="material-symbols-outlined text-[20px]">edit_calendar</span>
                        </button>
                      )}

                      {booking.status === "Completed" && (
                        <>
                          <button className="hover:text-emerald-600 p-1.5 hover:bg-emerald-50 rounded-lg transition-colors" title="Download Tax Invoice">
                            <span className="material-symbols-outlined text-[20px]">download</span>
                          </button>
                          <button className="hover:text-amber-500 p-1.5 hover:bg-amber-50 rounded-lg transition-colors" title="Write a Review">
                            <span className="material-symbols-outlined text-[20px]">rate_review</span>
                          </button>
                        </>
                      )}

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination Area */}
        <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
          <p className="text-xs font-semibold text-gray-400">Showing 1 to 3 of 12 bookings</p>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors text-sm font-bold">
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-xl bg-[#ba0036] text-white flex items-center justify-center text-xs font-bold shadow-sm">1</button>
            <button className="w-8 h-8 rounded-xl border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-xs font-bold">2</button>
            <button className="w-8 h-8 rounded-xl border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-xs font-bold">3</button>
            <button className="w-8 h-8 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors text-sm font-bold">
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Info Grid Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Informative Panel */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 bg-rose-50 border border-rose-100 text-[#ba0036] rounded-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px] font-light">info</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-gray-900 tracking-tight">Managing your stays</h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
              You can cancel or reschedule upcoming bookings up to 48 hours before check-in. Completed bookings allow you to download tax-compliant invoices for your records.
            </p>
          </div>
        </div>

        {/* Right Promo Action Panel */}
        <div className="bg-[#ba0036] p-6 rounded-3xl text-white relative overflow-hidden flex flex-col justify-between group shadow-sm min-h-[140px]">
          {/* Watermark Subtle Decorative Star Vector Icon background */}
          <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[120px] text-white opacity-[0.06] select-none pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
            hotel_class
          </span>
          
          <div className="relative z-10 space-y-1">
            <h3 className="text-lg font-bold tracking-tight">Earn 5% Back</h3>
            <p className="text-xs text-rose-100 leading-relaxed font-medium">
              Review your past stays to earn DhakaStay credit for your next trip.
            </p>
          </div>
          
          <div className="relative z-10 pt-4">
            <button className="px-5 py-2.5 bg-white text-[#ba0036] rounded-full text-xs font-bold hover:bg-rose-50 active:scale-95 transition-all shadow-sm">
              Write Review
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}