"use client";

import React, { useState } from "react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("Last 30 Days");

  // Mock Top Metrics Cards Data Matrix
  const metrics = [
    { label: "Total Revenue", value: "৳ 4,52,400", change: "+12.4%", isPositive: true },
    { label: "Average Occupancy Rate", value: "84.2%", change: "-2.1%", isPositive: false },
    { label: "Average Daily Rate (ADR)", value: "৳ 12,850", change: "+4.3%", isPositive: true },
    { label: "Guest Satisfaction", value: "4.8/5.0", change: "Stable", isPositive: true },
  ];

  // Property Performance Table Dataset
  const propertiesPerformance = [
    {
      id: "1",
      title: "Luxury Penthouse Gulshan",
      sub: "3BR • Gulshan 2",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=150",
      revenue: "৳ 1,45,000",
      occupancy: 92,
      rating: "4.9",
      trend: "up",
    },
    {
      id: "2",
      title: "Cozy Studio Banani",
      sub: "1BR • Banani Road 11",
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=150",
      revenue: "৳ 78,500",
      occupancy: 78,
      rating: "4.7",
      trend: "flat",
    },
    {
      id: "3",
      title: "Executive Suite Dhanmondi",
      sub: "2BR • Dhanmondi 27",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=150",
      revenue: "৳ 1,12,000",
      occupancy: 85,
      rating: "4.8",
      trend: "up",
    },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-2">
      {/* Top Header Filter Layout Control Row Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Insights</h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time performance data for your DhakaStay portfolio.
          </p>
        </div>

        {/* Filter Navigation State Control */}
        <div className="inline-flex bg-gray-100 p-1 rounded-xl self-start border border-gray-200">
          {["Last 30 Days", "Last Quarter", "Year to Date"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                timeRange === range
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Grid 1: 4 Column Top Level Summary Overview Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((card, idx) => (
          <div key={idx} className="bg-white p-5 border border-gray-100 rounded-2xl shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-gray-500 tracking-wide">{card.label}</span>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  card.change.includes("+")
                    ? "bg-green-50 text-green-600"
                    : card.change.includes("-")
                    ? "bg-rose-50 text-rose-600"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                {card.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Grid 2: Revenue Graph Placeholder & Booking Sources Split Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Section placeholder block panel wrapper views */}
        <div className="lg:col-span-2 bg-white p-6 border border-gray-100 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Revenue Growth</h2>
            </div>
            <div className="flex items-center space-x-4 text-xs font-medium">
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block"></span>
                <span className="text-gray-600">Current</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300 inline-block"></span>
                <span className="text-gray-400">Previous</span>
              </span>
            </div>
          </div>
          {/* Chart Graphic Render Sandbox Frame mock block layout structure styling background bar */}
          <div className="h-[220px] w-full flex items-end justify-between px-2 pt-6 border-b border-gray-100 relative">
            {[15, 30, 65, 45, 85, 75].map((val, i) => (
              <div key={i} className="w-[12%] flex flex-col items-center group relative h-full justify-end">
                <div
                  style={{ height: `${val}%` }}
                  className="w-full bg-rose-500/10 rounded-t-md group-hover:bg-rose-500/20 transition-all duration-300 relative"
                >
                  <div className="absolute -top-1 right-[20%] left-[20%] h-1 bg-rose-600 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between px-2 mt-3 text-[11px] font-medium text-gray-400">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
              <span key={m} className="w-[12%] text-center">{m}</span>
            ))}
          </div>
        </div>

        {/* Circular Booking Channels Mapping sources metrics pie block widget chart representation structure layout rendering panel */}
        <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm flex flex-col justify-between">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Booking Sources</h2>
          <div className="flex justify-center items-center relative my-4">
            <div className="w-36 h-36 rounded-full border-[14px] border-rose-600 border-t-gray-200 flex flex-col items-center justify-center transform -rotate-45">
              <div className="rotate-45 text-center">
                <span className="text-xl font-black text-gray-900 block tracking-tight">1,204</span>
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Total Bookings</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 mt-2">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block"></span>
                <span className="font-medium text-gray-600">Mobile App</span>
              </div>
              <span className="font-bold text-gray-900">65%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-400 inline-block"></span>
                <span className="font-medium text-gray-600">Website</span>
              </div>
              <span className="font-bold text-gray-900">35%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid 3: Core Listings Table Property Performance Component Data Grid Tracker */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-sm font-bold text-gray-900">Property Performance</h2>
          <button className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition flex items-center space-x-1">
            <span>Download CSV</span>
            <span className="text-[10px]">▼</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-6">Listing Details</th>
                <th className="py-3 px-6 text-right">Monthly Revenue</th>
                <th className="py-3 px-6">Occupancy</th>
                <th className="py-3 px-6 text-center">Avg Rating</th>
                <th className="py-3 px-6 text-center">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs">
              {propertiesPerformance.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/40 transition">
                  <td className="py-4 px-6 flex items-center space-x-3">
                    <img src={item.image} alt="" className="w-10 h-10 object-cover rounded-xl border border-gray-100" />
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">{item.sub}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-gray-900">{item.revenue}</td>
                  <td className="py-4 px-6 w-1/4">
                    <div className="flex items-center space-x-3">
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div style={{ width: `${item.occupancy}%` }} className="bg-rose-600 h-full rounded-full" />
                      </div>
                      <span className="font-bold text-gray-700 min-w-[28px] text-right">{item.occupancy}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center justify-center font-bold text-gray-800">
                      <span className="text-rose-500 mr-1 text-[11px]">★</span>
                      {item.rating}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {item.trend === "up" ? (
                      <span className="text-green-500 text-lg font-bold">↗</span>
                    ) : (
                      <span className="text-gray-400 text-lg font-bold">→</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid 4: Bottom Split Panel (Market Comparison Context Container & Weekly Trends Graph Widget View Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Side Content layout context panel - Market comparison block analysis logic view panel stack mapping dashboard */}
        <div className="lg:col-span-2 bg-white p-6 border border-gray-100 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-gray-900">Market Comparison</h2>
            <span className="inline-block bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase tracking-wide">
              Gulshan & Banani Area
            </span>
          </div>

          {/* ADR vs Area Average progress context bar slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-gray-500">Your ADR vs. Area Average</span>
              <span className="font-bold text-green-600">+15% Above Avg</span>
            </div>
            <div className="w-full bg-gray-100 h-3 rounded-full relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-3/4 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full" />
            </div>
            <span className="text-[10px] text-gray-400 block text-right">(Avg: ৳11,100)</span>
          </div>

          {/* Occupancy metrics progress tracker widget view data slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-gray-500">Occupancy Rate vs. Market</span>
              <span className="font-bold text-gray-800">On Par</span>
            </div>
            <div className="w-full bg-gray-100 h-3 rounded-full relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[84%] bg-gray-700 rounded-full" />
            </div>
            <span className="text-[10px] text-gray-400 block text-right">Market Average (82%)</span>
          </div>

          {/* Bottom Custom dynamic warning recommendation block box tooltip style banner layout alert component row panel markup info */}
          <div className="bg-rose-50/50 border border-rose-100 p-3.5 rounded-xl flex items-start space-x-3">
            <div className="w-5 h-5 rounded-lg bg-rose-100 flex items-center justify-center text-xs text-rose-600 font-bold shrink-0 mt-0.5">
              💡
            </div>
            <div>
              <h5 className="text-xs font-bold text-gray-900">Optimization Tip</h5>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                Your weekend rates in Banani are lower than the sub-market average. Consider a 5-8% increase for Fri-Sat bookings.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Weekly Trends visualization placeholder data stack container layer tracker element block cards markup details views */}
        <div className="lg:col-span-3 bg-white p-6 border border-gray-100 rounded-2xl shadow-sm flex flex-col justify-between">
          <h2 className="text-sm font-bold text-gray-900 mb-6">Occupancy Trends (Weekly)</h2>
          
          <div className="h-28 flex items-end justify-between border-b border-gray-100 px-4 pb-2">
            {[45, 60, 55, 75].map((val, idx) => (
              <div key={idx} className="w-[18%] bg-rose-200/50 rounded-t-md relative group transition-all" style={{ height: `${val}%` }}>
                <div className="absolute inset-x-0 bottom-0 bg-rose-600 h-1.5 rounded-b-md" />
              </div>
            ))}
          </div>

          <div className="flex justify-between px-4 mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            <span>W1</span>
            <span>W2</span>
            <span>W3</span>
            <span>W4</span>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center text-xs">
            <div>
              <span className="text-[11px] text-gray-400 block font-medium">Projected Next Month</span>
              <span className="text-base font-black text-rose-600 mt-0.5 block">88.5%</span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-gray-400 block font-medium">Bookings Pace</span>
              <span className="text-sm font-bold text-green-600 mt-1 block">+12% vs LY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}