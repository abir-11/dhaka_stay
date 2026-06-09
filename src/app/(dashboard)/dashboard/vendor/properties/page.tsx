"use client";

import Link from "next/link";
import React from "react";

export default function MyPropertiesPage() {
  // Properties mock data matching your Figma design table rows
  const propertiesData = [
    {
      id: "DS-10293",
      title: "Luxury Gulshan Penthouse",
      location: "Gulshan 2, Dhaka",
      price: "৳240.00",
      occupancy: 88,
      status: "Active",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=150",
    },
    {
      id: "DS-44812",
      title: "Boutique Studio Banani",
      location: "Banani, Dhaka",
      price: "৳115.00",
      occupancy: 42,
      status: "Pending Approval",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=150",
    },
    {
      id: "DS-99201",
      title: "Riverside Modern Villa",
      location: "Uttara, Dhaka",
      price: "৳450.00",
      occupancy: 0,
      status: "Suspended",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=150",
    },
    {
      id: "DS-32115",
      title: "Cozy Art Deco Loft",
      location: "Dhanmondi, Dhaka",
      price: "৳180.00",
      occupancy: 75,
      status: "Active",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=150",
    },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-in fade-in duration-300">
      
      {/* --- TOP HEADER ROW --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">My Properties</h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Manage your portfolio and property performance.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">upload</span>
            Export
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Import
          </button>
          <Link href={"/dashboard/vendor/addProperty"} className="flex items-center gap-1.5 px-4 py-2.5 bg-[#ba0036] hover:bg-[#9a002d] text-white text-xs font-bold rounded-xl transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add New Property
          </Link>
        </div>
      </div>

      {/* --- PROPERTIES TABLE CARD CONTAINER --- */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-4 px-6">Property</th>
                <th className="py-4 px-4">Location</th>
                <th className="py-4 px-4">Price/Night</th>
                <th className="py-4 px-4 w-[200px]">Occupancy</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {propertiesData.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-6 flex items-center gap-4">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-gray-100 shadow-sm shrink-0"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900 group-hover:text-[#ba0036] transition-colors">
                        {property.title}
                      </p>
                      <p className="text-[11px] font-semibold text-gray-400 mt-0.5">
                        ID: {property.id}
                      </p>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="text-xs font-bold text-gray-600">{property.location}</span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="text-xs font-black text-gray-900">{property.price}</span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            property.occupancy === 0 ? "bg-gray-200" : "bg-[#ba0036]"
                          }`}
                          style={{ width: `${property.occupancy}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-500 min-w-[28px] text-right">
                        {property.occupancy}%
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        property.status === "Active"
                          ? "bg-emerald-50 text-emerald-600"
                          : property.status === "Pending Approval"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-rose-50 text-rose-500"
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <button className="p-1.5 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all">
                      <span className="material-symbols-outlined text-[20px] flex items-center justify-center font-bold">
                        more_vert
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="p-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-400">
          <p>Showing 1-4 of 24 properties</p>
          <div className="flex items-center gap-1.5">
            <button className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors">
              <span className="material-symbols-outlined text-[18px] block">chevron_left</span>
            </button>
            <button className="w-7 h-7 bg-[#ba0036] text-white rounded-lg font-bold flex items-center justify-center shadow-sm">
              1
            </button>
            <button className="w-7 h-7 hover:bg-gray-50 text-gray-600 rounded-lg font-bold flex items-center justify-center transition-colors">
              2
            </button>
            <button className="w-7 h-7 hover:bg-gray-50 text-gray-600 rounded-lg font-bold flex items-center justify-center transition-colors">
              3
            </button>
            <button className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors">
              <span className="material-symbols-outlined text-[18px] block">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- BOTTOM INSIGHTS ROW --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between gap-6 min-h-[140px]">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Overall Occupancy</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-gray-900">76.4%</h3>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                +2.4% from last month
              </span>
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-16 pt-2 shrink-0">
            <div className="w-2.5 bg-rose-100 rounded-t h-[40%]" />
            <div className="w-2.5 bg-rose-200 rounded-t h-[60%]" />
            <div className="w-2.5 bg-rose-300 rounded-t h-[50%]" />
            <div className="w-2.5 bg-[#ba0036] rounded-t h-[90%]" />
            <div className="w-2.5 bg-[#ba0036] rounded-t h-[75%]" />
          </div>
        </div>

        <div className="bg-[#ba0036] p-5 rounded-2xl text-white flex flex-col justify-between shadow-sm min-h-[140px] group relative overflow-hidden">
          <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32 bg-white/5 rounded-full pointer-events-none" />
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-rose-200 uppercase tracking-widest">Portfolio Value</p>
            <h3 className="text-3xl font-black tracking-tight">$1.2M+</h3>
          </div>
          <div className="flex items-center justify-between bg-black/10 px-3 py-1.5 rounded-xl border border-white/10 mt-2 text-[11px] font-bold">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              High Performance
            </span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </div>
        </div>
      </div>

    </div>
  );
}