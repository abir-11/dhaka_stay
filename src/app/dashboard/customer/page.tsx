"use client";

import React from "react";

export default function CustomerDashboardPage() {
  const stats = [
    { title: "TOTAL BOOKINGS", value: "24", change: "+12%", icon: "calendar_month", hasBadge: true },
    { title: "ACTIVE STAYS", value: "2", icon: "home" },
    { title: "COMPLETED STAYS", value: "18", icon: "check_circle" },
    { title: "PENDING BOOKINGS", value: "4", icon: "assignment_late" },
  ];

  const activities = [
    { title: "Booking Confirmed", desc: "Gulshan North Penthouse", time: "2 HOURS AGO", active: true },
    { title: "Review Submitted", desc: "Stay at Banani Serenity Suite", time: "YESTERDAY" },
    { title: "Identity Verified", desc: "Account security update", time: "OCT 5, 2023" },
    { title: "Profile Updated", desc: "Added new contact number", time: "SEP 28, 2023" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto">
      
      {/* Welcome Heading */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back, Tanvir!</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Your next adventure in Dhaka is just a few clicks away.</p>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <span className="text-[#ba0036] bg-rose-50/50 w-10 h-10 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined font-light text-[22px]">{stat.icon}</span>
              </span>
              {stat.hasBadge && (
                <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded-md">
                  {stat.change}
                </span>
              )}
            </div>
            <div className="mt-5">
              <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">{stat.title}</p>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-1 tracking-tight">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Main Container Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Area: Active Stay Details & Status Links */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Stay Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group">
            {/* Image Box */}
            <div className="h-[280px] w-full relative bg-gray-100 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000" 
                alt="Gulshan North Penthouse" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-[#ba0036] text-white font-bold text-xs px-3 py-1 rounded-full shadow-sm">
                Active Stay
              </span>
              <div className="absolute top-1/2 -translate-y-1/2 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer text-gray-700 shadow-lg">
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </div>
            </div>

            {/* Content Info Box */}
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 pb-5 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">Gulshan North Penthouse</h2>
                  <p className="text-xs font-semibold text-gray-400 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">location_on</span> Road 12, Gulshan 2, Dhaka
                  </p>
                </div>
                <div className="flex items-center gap-2.5 bg-gray-50/50 py-1.5 pl-3 pr-2.5 rounded-full border border-gray-100/50 self-start">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Hosted By</p>
                    <p className="text-xs font-bold text-gray-800">Anika Hossain</p>
                  </div>
                  <div className="w-8 h-8 bg-[#ba0036]/10 rounded-full overflow-hidden flex items-center justify-center text-[#ba0036] font-bold text-xs border border-white">
                    AH
                  </div>
                </div>
              </div>

              {/* Checkin / Checkout dates from image UI */}
              <div className="grid grid-cols-2 bg-gray-50/70 rounded-2xl p-4 my-5 gap-4">
                <div className="space-y-1 pl-2">
                  <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Check-In</p>
                  <p className="text-sm font-extrabold text-gray-800">Oct 12, 2023</p>
                  <p className="text-[11px] font-semibold text-gray-400">from 2:00 PM</p>
                </div>
                <div className="space-y-1 border-l border-gray-200 pl-6">
                  <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Check-Out</p>
                  <p className="text-sm font-extrabold text-gray-800">Oct 16, 2023</p>
                  <p className="text-[11px] font-semibold text-gray-400">until 11:00 AM</p>
                </div>
              </div>

              {/* CTA Form Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="w-full bg-[#ba0036] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#9a002d] transition-colors flex items-center justify-center gap-2 shadow-md shadow-rose-900/10 active:scale-[0.99]">
                  <span className="material-symbols-outlined text-[18px]">map</span> Get Directions
                </button>
                <button className="w-full bg-white text-gray-800 border-2 border-gray-200 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 active:scale-[0.99]">
                  <span className="material-symbols-outlined text-[18px]">chat_bubble</span> Contact Host
                </button>
              </div>
            </div>
          </div>

          {/* Verification Status & Next Trip Quick Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-gray-200 transition-colors">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                  <span className="material-symbols-outlined font-medium text-[24px]">verified</span>
                </span>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Verification Status</h4>
                  <p className="text-xs font-bold text-emerald-500 mt-0.5">Verified</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-300">chevron_right</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-gray-200 transition-colors">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center">
                  <span className="material-symbols-outlined font-medium text-[24px]">flight_takeoff</span>
                </span>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Next Trip</h4>
                  <p className="text-xs font-semibold text-gray-400 mt-0.5">Starts in 12 days</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-300">chevron_right</span>
            </div>
          </div>
        </div>

        {/* Right Area: Recent Activity Timeline & Map Banner */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Recent Activity Card Widget */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 tracking-tight mb-6">Recent Activity</h3>
              <div className="relative border-l-2 border-gray-100 ml-2.5 space-y-6 pb-2">
                {activities.map((act, i) => (
                  <div key={i} className="relative pl-6 group">
                    {/* Circle Dot Marker */}
                    <span className={`absolute -left-[7px] top-1 w-3 h-3 rounded-full border-2 border-white ring-4 ${
                      act.active ? "bg-[#ba0036] ring-rose-100" : "bg-gray-300 ring-gray-50"
                    }`} />
                    <div>
                      <h5 className="text-xs font-bold text-gray-900 leading-none">{act.title}</h5>
                      <p className="text-[11px] font-medium text-gray-500 mt-1 leading-tight">{act.desc}</p>
                      <p className="text-[9px] font-bold text-gray-400 tracking-wider mt-1.5 uppercase">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full text-center text-xs font-bold text-[#ba0036] mt-6 pt-4 border-t border-gray-50 hover:underline">
              View All Activity
            </button>
          </div>

          {/* Explore Neighborhoods Widget from image (Bangladesh Map Graphic) */}
          <div className="bg-neutral-950 rounded-3xl p-6 relative overflow-hidden h-52 group cursor-pointer shadow-md">
            {/* Soft dark map backdrop layout effect */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Dummy map ping point marker */}
            <div className="absolute right-24 top-20 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ba0036]"></span>
            </div>

            <div className="h-full flex flex-col justify-end relative z-10">
              <h4 className="text-white font-bold text-base tracking-tight">Explore Neighborhoods</h4>
              <p className="text-[11px] text-gray-400 mt-1 font-medium">Discover hidden gems near you</p>
            </div>

            {/* Stylized geometric background representing vector map shape inside image */}
            <div className="absolute -right-6 -bottom-6 w-36 h-36 border border-white/5 rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
          </div>

        </div>
      </div>
    </div>
  );
}