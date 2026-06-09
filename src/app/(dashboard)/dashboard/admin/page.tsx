"use client";

import React from "react";

export default function AdminDashboardPage() {
  const stats = [
    { title: "TOTAL USERS", value: "12,540", change: "+12%", icon: "person", trend: "up" },
    { title: "TOTAL VENDORS", value: "1,250", change: "+8%", icon: "store", trend: "up" },
    { title: "ACTIVE PROPERTIES", value: "4,820", change: "+24%", icon: "apartment", trend: "up" },
    { title: "PENDING APPROVALS", value: "45", change: "-5%", icon: "assignment_late", trend: "down" },
    { title: "TOTAL REVENUE", value: "৳12.5M", change: "+18%", icon: "payments", trend: "up" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Banner section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor DhakaStay's performance and manage platform assets.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span> Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#ba0036] text-white rounded-xl text-sm font-semibold hover:bg-[#9a002d]">
            <span className="material-symbols-outlined text-[18px]">download</span> Export Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
                <span className="material-symbols-outlined">{stat.icon}</span>
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                stat.trend === "up" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">{stat.title}</p>
              <h2 className="text-2xl font-extrabold text-gray-900 mt-1">{stat.value}</h2>
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-[#ba0036]" style={{ width: "65%" }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Area Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-80 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-gray-900">Revenue Trends</h3>
          <div className="flex items-center justify-center flex-1 border-2 border-dashed border-gray-100 rounded-xl mt-4 text-gray-400 text-sm">
            [Chart Visualization Area]
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-80 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-gray-900">Recent Activity</h3>
          <div className="flex items-center justify-center flex-1 border-2 border-dashed border-gray-100 rounded-xl mt-4 text-gray-400 text-sm">
            [Activity Logs Area]
          </div>
        </div>
      </div>
    </div>
  );
}