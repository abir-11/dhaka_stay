"use client";

import React, { useState } from "react";

export default function VendorBookingsPage() {
  const [activeFilter, setActiveFilter] = useState("All Bookings");

  // Summary Metrics Data Cards Setup
  const summaryStats = [
    { label: "INCOMING TODAY", value: "12 Guests", icon: "➔", bgColor: "bg-rose-50 text-rose-600" },
    { label: "CURRENTLY STAYING", value: "48 Guests", icon: "🛏️", bgColor: "bg-gray-50 text-gray-700" },
    { label: "DEPARTING SOON", value: "07 Guests", icon: "➔", bgColor: "bg-gray-50 text-gray-700" },
  ];

  // Core Bookings Dataset Array matching your exact visual screens
  const initialBookings = [
    {
      id: "DS-9281",
      guestName: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      property: "Boutique Suite, Gulshan",
      dates: "Oct 12 - Oct 15",
      nights: 3,
      amount: "৳ 14,500",
      status: "Confirmed",
    },
    {
      id: "DS-9275",
      guestName: "Michael Tan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      property: "Luxury Penthouse, Banani",
      dates: "Oct 14 - Oct 20",
      nights: 6,
      amount: "৳ 42,000",
      status: "Pending",
    },
    {
      id: "DS-9260",
      guestName: "Rakib Das",
      avatar: "", // Handled via fallback initial badge component icon placeholder
      property: "Studio Apartment, Uttara",
      dates: "Oct 10 - Oct 11",
      nights: 1,
      amount: "৳ 4,200",
      status: "Completed",
    },
  ];

  // Client-side visual array logic filtering criteria tracking matching state properties triggers
  const filteredBookings = initialBookings.filter((b) => {
    if (activeFilter === "All Bookings") return true;
    return b.status === activeFilter;
  });

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-1 font-sans">
      
      {/* 1. TOP SUMMARY OVERVIEW STATS BARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {summaryStats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${stat.bgColor}`}>
              {stat.icon}
            </div>
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">{stat.label}</span>
              <h3 className="text-xl font-extrabold text-gray-900 mt-0.5">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* 2. DUAL COLUMN WORKFLOW MAIN CANVAS AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* LEFT COMPONENT: BOOKINGS CONTROLLER & MAIN DATA GRID LIST TABLE */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Sub-Header Table Filtering Segment Control Rows Panel Container */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 border border-gray-100 rounded-2xl shadow-sm">
            <div className="flex flex-wrap gap-2">
              {["All Bookings", "Confirmed", "Pending", "Completed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeFilter === tab
                      ? "bg-gray-100 text-gray-900 border border-gray-200"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Utility Data Sorting Action Widgets Tools Button Elements */}
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center space-x-1 border border-gray-200 px-3 py-2 rounded-xl text-xs font-bold text-gray-600 bg-white hover:bg-gray-50">
                <span>📅</span>
                <span>Last 30 Days</span>
              </button>
              <button className="border border-gray-200 p-2 rounded-xl text-xs bg-white hover:bg-gray-50 text-gray-600" title="Advanced Filter Options">
                🎛️
              </button>
            </div>
          </div>

          {/* Bookings Display Layout Rows Loop Framework Component Wrapper List Box */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            
            {/* Native Fake Columns Headers labels markup elements blocks layout setup tracking template matrix */}
            <div className="grid grid-cols-5 bg-gray-50/50 border-b border-gray-100 py-3.5 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <span className="col-span-1">Guest Name</span>
              <span className="col-span-1">Property</span>
              <span className="col-span-1">Dates</span>
              <span className="col-span-1">Amount</span>
              <span className="col-span-1">Status</span>
            </div>

            <div className="divide-y divide-gray-50">
              {filteredBookings.map((booking, idx) => (
                <div key={idx} className="grid grid-cols-5 items-center py-5 px-6 hover:bg-gray-50/30 transition text-xs">
                  
                  {/* Guest Meta column container block details mapping area logic markup code layout layout */}
                  <div className="col-span-1 flex items-center space-x-3">
                    {booking.avatar ? (
                      <img src={booking.avatar} alt="" className="w-10 h-10 object-cover rounded-full border border-gray-100 shadow-sm" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex flex-col items-center justify-center text-[10px] font-bold text-gray-500">
                        RD <span className="text-[8px] text-gray-400 font-normal">Guest</span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-extrabold text-gray-900 leading-tight">{booking.guestName}</h4>
                      <span className="text-[10px] font-medium text-gray-400 mt-1 block font-mono">Booking #{booking.id}</span>
                    </div>
                  </div>

                  {/* Property Name Mapping Component Column Layer Layout Item Data */}
                  <div className="col-span-1 pr-2 font-semibold text-gray-700">
                    {booking.property}
                  </div>

                  {/* Stay Stay Duration Dates Info Data Layout Columns Markup Block Container */}
                  <div className="col-span-1">
                    <div className="text-gray-900 font-bold">{booking.dates}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5 font-medium">{booking.nights} Nights</div>
                  </div>

                  {/* Financial Gross Pricing Currency Calculations Box Node Field Elements Render Layer Layout */}
                  <div className="col-span-1 text-sm font-black text-gray-900">
                    {booking.amount}
                  </div>

                  {/* Custom System Visual State Color Badges Indicators Control Handling Flow Block Logic Elements */}
                  <div className="col-span-1">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ${
                        booking.status === "Confirmed"
                          ? "bg-green-50 text-green-600"
                          : booking.status === "Pending"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                </div>
              ))}
            </div>

            {/* Compact Internal Layout Table Pagination Component Segment Element Frame View Box row layout control links area navigation page list matrix blocks */}
            <div className="p-4 bg-gray-50/30 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-400">
              <span>Showing 1-{filteredBookings.length} of 156 bookings</span>
              <div className="flex items-center space-x-1">
                <button className="w-7 h-7 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:bg-gray-50 text-gray-300">‹</button>
                <button className="w-7 h-7 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:bg-gray-50 text-gray-500">›</button>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDEBAR PANEL: ANALYTICAL TIMELINE AND LIVE MINIMALIST SCHEDULER WIDGET CANVAS STRUCTURE BOX ELEMENT STACK MODEL */}
        <div className="space-y-6">
          
          {/* Calendar Widget Sandbox Layout Container Block Element Card Frame */}
          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-black text-gray-900">October 2023</h3>
              <div className="flex items-center space-x-3 text-xs text-gray-400">
                <button className="hover:text-gray-700">‹</button>
                <button className="hover:text-gray-700">›</button>
              </div>
            </div>
            {/* Native Weeks Names Grid Layout Markup Headers */}
            <div className="grid grid-cols-7 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i}>{d}</span>)}
            </div>
            {/* Native Sandbox Calendar Days Grid Framework Mapping Model Structure Data List Render Rows Layer Elements Panel Area */}
            <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-semibold text-gray-700">
              {Array.from({ length: 31 }, (_, idx) => {
                const day = idx - 3; // Shift index block configuration timeline map layout structure offset parameters 
                if (day <= 0 || day > 21) return <span key={idx} className="text-gray-200 font-normal">...</span>;
                return (
                  <button
                    key={idx}
                    className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center transition ${
                      day === 12
                        ? "bg-rose-600 text-white font-bold shadow-sm"
                        : day === 10
                        ? "relative after:absolute after:bottom-0.5 after:w-1 after:h-1 after:bg-rose-500 after:rounded-full"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* TODAYS UPDATES LIVE TIMELINE TIMING GRAPHICAL REPRESENTATION MODULE ROW SEGMENTS LAYER MARKUP MATRIX */}
            <div className="mt-6 pt-5 border-t border-gray-100 space-y-4">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-wider">Today's Timeline</h4>
              
              <div className="space-y-3.5 text-xs">
                {/* Timeline row track trace widget logic checkin container setup element item frame */}
                <div className="flex items-start space-x-3">
                  <div className="text-right shrink-0 w-9">
                    <span className="font-bold text-rose-600 block">14:00</span>
                    <span className="text-[9px] text-gray-400 uppercase font-black tracking-tight">Check-In</span>
                  </div>
                  <div className="bg-gray-50 border-l-2 border-rose-500 p-2.5 rounded-r-xl w-full">
                    <h5 className="font-bold text-gray-900 leading-none">Sarah Jenkins</h5>
                    <p className="text-[10px] text-gray-400 mt-1">Boutique Suite • Unit 4B</p>
                  </div>
                </div>

                {/* Timeline checkout block tracker element node info canvas item setup detail card design component map row model */}
                <div className="flex items-start space-x-3">
                  <div className="text-right shrink-0 w-9">
                    <span className="font-bold text-gray-500 block">11:00</span>
                    <span className="text-[9px] text-gray-400 uppercase font-black tracking-tight">Check-Out</span>
                  </div>
                  <div className="bg-gray-50 border-l-2 border-gray-400 p-2.5 rounded-r-xl w-full">
                    <h5 className="font-bold text-gray-900 leading-none">Rakib Das</h5>
                    <p className="text-[10px] text-gray-400 mt-1">Studio Apt • Unit 12C</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* TURN-OVER HOUSEKEEPING CLEANING CALL-TO-ACTION BOTTOM AD BANNER PROMO BLOCK CARD WRAPPER FRAME UI LAYOUT */}
          <div className="bg-rose-50/60 border border-rose-100/70 p-5 rounded-2xl flex flex-col space-y-4 relative overflow-hidden group">
            <div className="space-y-1.5 z-10">
              <h3 className="text-sm font-black text-gray-900 tracking-tight">Need a property clean?</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed max-w-[90%]">
                Coordinate turnover cleanings between check-outs and check-ins directly with our reliable, professional, top-tier workspace cleaning service partners team.
              </p>
            </div>
            <div className="z-10">
              <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors duration-200 shadow-sm shadow-rose-600/10">
                Book Cleaning Service
              </button>
            </div>
            {/* Tiny stylistic pattern background canvas layer rendering vector item element */}
            <div className="absolute -right-8 -bottom-8 w-20 h-20 bg-rose-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-110 transition duration-300" />
          </div>

        </div>

      </div>

    </div>
  );
}