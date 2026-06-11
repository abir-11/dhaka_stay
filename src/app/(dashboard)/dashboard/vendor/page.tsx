"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useVendor } from "./layout"; // আপনার প্রোজেক্ট ডিরেক্টরি অনুযায়ী পাথ পরিবর্তনযোগ্য
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";

export default function VendorDashboardMain() {
  const { properties, isPropertiesLoading, vendorData } = useVendor();

  // 📊 রিয়েল ডাটা ম্যাট্রিক্স ক্যালকুলেশন
  const totalProperties = properties.length;
  const activeProperties = properties.filter(
    (p) => p.status?.toLowerCase() === "active"
  ).length;

  const avgPrice = totalProperties > 0
    ? Math.round(properties.reduce((sum, p) => sum + (Number(p.pricePerNight) || 0), 0) / totalProperties)
    : 0;

  // 📈 চার্ট ১: বুকিং ও রেভিনিউ ট্রেন্ড ডাটা (Professional Mock Timeline)
  const performanceData = [
    { month: "Jan", Bookings: 4, Revenue: 12000 },
    { month: "Feb", Bookings: 7, Revenue: 21000 },
    { month: "Mar", Bookings: 5, Revenue: 15000 },
    { month: "Apr", Bookings: 12, Revenue: 34000 },
    { month: "May", Bookings: 9, Revenue: 26000 },
    { month: "Jun", Bookings: totalProperties > 0 ? 15 : 0, Revenue: totalProperties * avgPrice * 5 || 0 },
  ];

  // 📊 চার্ট ২: প্রোপার্টি টাইপ ডিস্ট্রিবিউশন ডাটা (ডাইনামিকালি প্রোপার্টিজ থেকে জেনারেট হবে)
  const propertyTypeData = useMemo(() => {
    const counts: Record<string, number> = {};
    properties.forEach((p) => {
      const type = p.propertyType || "Unknown";
      counts[type] = (counts[type] || 0) + 1;
    });

    return Object.keys(counts).map((key) => ({
      name: key,
      Count: counts[key],
    }));
  }, [properties]);

  if (vendorData.isLoading || isPropertiesLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-[#ba0036] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-gray-500 animate-pulse">Loading DhakaStay Insights...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 🌟 ওয়েলকাম ব্যানার */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            Welcome back, {vendorData.name.split(" ")[0]}! 👋
          </h1>
          <p className="text-xs text-gray-400 font-medium mt-1">
            Manage your properties and monitor your live performance seamlessly.
          </p>
        </div>
        <Link
          href="/dashboard/vendor/addProperty"
          className="inline-flex items-center justify-center gap-2 bg-[#ba0036] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#9a002d] transition-all shadow-sm shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add_box</span>
          Publish New Property
        </Link>
      </div>

      {/* 📊 স্ট্যাটাস কার্ডস */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Properties</p>
            <p className="text-2xl font-black text-gray-900">{totalProperties}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-[#ba0036]">
            <span className="material-symbols-outlined text-[26px]">real_estate_agent</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Properties</p>
            <p className="text-2xl font-black text-green-600">{activeProperties}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
            <span className="material-symbols-outlined text-[26px]">verified</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg Price / Night</p>
            <p className="text-2xl font-black text-gray-900">৳ {avgPrice}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <span className="material-symbols-outlined text-[26px]">payments</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Bookings</p>
            <p className="text-2xl font-black text-gray-900">46</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <span className="material-symbols-outlined text-[26px]">book_online</span>
          </div>
        </div>
      </div>

      {/* 📈 Recharts গ্রাফ সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* লাইন/এরিয়া চার্ট - রেভিনিউ ওভারভিউ */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900">Performance & Analytics Trend</h3>
            <p className="text-[11px] text-gray-400 font-medium">Monthly generated revenue breakdown</p>
          </div>
          <div className="w-full h-64 text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ba0036" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ba0036" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" stroke="#9ca3af" tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #f1f1f1", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                  labelStyle={{ fontWeight: "bold", color: "#1f2937" }}
                />
                <Area type="monotone" dataKey="Revenue" name="Revenue (৳)" stroke="#ba0036" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* বার চার্ট - প্রোপার্টি ক্যাটাগরি Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900">Property Portfolio Breakdown</h3>
            <p className="text-[11px] text-gray-400 font-medium">Total listed assets distributed by type</p>
          </div>
          <div className="w-full h-64 text-xs font-semibold flex items-center justify-center">
            {propertyTypeData.length === 0 ? (
              <p className="text-xs text-gray-400 font-medium">No inventory distributions</p>
            ) : (
              <ResponsiveContainer width="100%" h="100%">
                <BarChart data={propertyTypeData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" stroke="#9ca3af" tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip
                    cursor={{ fill: '#f9fafb' }}
                    contentStyle={{ backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #f1f1f1" }}
                  />
                  <Bar dataKey="Count" name="Total Properties" fill="#ba0036" radius={[6, 6, 0, 0]} maxBarSize={38} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* 🏡 ইনভেন্টরি টেবিল */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">Property Inventory</h2>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Real-time status updates of your smart listings</p>
          </div>
          <Link href="/dashboard/vendor/properties" className="text-xs font-bold text-[#ba0036] hover:underline flex items-center gap-1">
            View All <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>

        {totalProperties === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
              <span className="material-symbols-outlined text-[36px]">night_shelter</span>
            </div>
            <div className="max-w-xs">
              <p className="text-sm font-bold text-gray-800">No properties found</p>
              <p className="text-xs text-gray-400 font-medium mt-1">Start by creating your first rental listing on DhakaStay network.</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-6">Property Details</th>
                  <th className="py-3 px-6">Type</th>
                  <th className="py-3 px-6">Location</th>
                  <th className="py-3 px-6">Price / Night</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs font-semibold text-gray-700">
                {properties.map((property, idx) => (
                  <tr key={property.id || idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100/40 flex items-center justify-center text-[#ba0036] shrink-0">
                        <span className="material-symbols-outlined text-[20px]">apartment</span>
                      </div>
                      <div className="truncate max-w-[240px]">
                        <p className="font-bold text-gray-900 truncate">{property.title}</p>
                        <p className="text-[10px] text-gray-400 font-medium mt-0.5 truncate">{property.description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md font-bold text-[10px] uppercase">
                        {property.propertyType}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 font-medium">
                      {property.city} ({property.zipCode})
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900">
                      ৳ {property.pricePerNight}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${property.status?.toLowerCase() === "active"
                          ? "bg-green-50 text-green-600"
                          : "bg-amber-50 text-amber-600"
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${property.status?.toLowerCase() === "active" ? "bg-green-500" : "bg-amber-500"}`}></span>
                        {property.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-900 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}