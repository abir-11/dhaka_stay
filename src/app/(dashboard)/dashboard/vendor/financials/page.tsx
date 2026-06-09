"use client";

import React, { useState } from "react";

export default function VendorFinancialsPage() {
  const [filterActive, setFilterActive] = useState(false);

  // Dynamic Payout Transactions History List Dataset matching exactly with the uploaded wireframe
  const payoutHistory = [
    { id: "#PY-882910", date: "Oct 02, 2023", amount: "৳ 45,200.00", status: "Paid" },
    { id: "#PY-882405", date: "Sep 15, 2023", amount: "৳ 32,800.00", status: "Processing" },
    { id: "#PY-881902", date: "Sep 01, 2023", amount: "৳ 18,450.00", status: "Paid" },
    { id: "#PY-881455", date: "Aug 18, 2023", amount: "৳ 22,000.00", status: "Failed" },
    { id: "#PY-881100", date: "Aug 02, 2023", amount: "৳ 24,400.00", status: "Paid" },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-1 font-sans">
      
      {/* HEADER SECTION: Title with Action Triggers */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Earnings & Payouts</h1>
          <p className="text-xs text-gray-500 mt-1">Manage your property revenue and track your payout status.</p>
        </div>
        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <button className="inline-flex items-center space-x-2 border border-gray-200 bg-white px-4 py-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm">
            <span>📄</span>
            <span>Statement</span>
          </button>
          <button className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition shadow-sm shadow-rose-600/10">
            Request Payout
          </button>
        </div>
      </div>

      {/* 1. TOP METRICS LAYER: THREE-COLUMN ANALYTICAL SUMMARY CONTAINERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* CARD A: MASTER NET EARNINGS MAIN PANEL HIGHLIGHT */}
        <div className="bg-gradient-to-br from-rose-600 to-rose-700 p-6 rounded-2xl text-white shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-black tracking-wider uppercase text-rose-100/80">Net Earnings</span>
              <h2 className="text-3xl font-black tracking-tight">৳ 1,42,850.00</h2>
            </div>
            <div className="w-9 h-9 bg-rose-500/20 rounded-xl flex items-center justify-center text-rose-100 text-sm">
              💳
            </div>
          </div>
          
          <div className="mt-8 flex items-center space-x-1.5 text-[11px] font-bold">
            <span className="bg-white/15 px-2 py-0.5 rounded-md text-white">🗲 +12.5%</span>
            <span className="text-rose-100/70">vs previous month</span>
          </div>
        </div>

        {/* CARD B: PENDING REVENUE CONTAINER */}
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black tracking-wider uppercase text-gray-400">Pending Payouts</span>
            <h2 className="text-2xl font-black text-rose-600 tracking-tight">৳ 24,120.00</h2>
          </div>
          
          <div className="mt-8 flex items-center space-x-1.5 text-[11px] text-gray-400 font-medium">
            <span>🕒</span>
            <span>Next payout on <strong className="text-gray-700 font-bold">Oct 15</strong></span>
          </div>
        </div>

        {/* CARD C: FINANCIAL SUB-BREAKDOWN MATRIX */}
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 font-semibold">Gross Revenue</span>
              <span className="text-gray-900 font-extrabold font-mono">৳ 1,68,058</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 font-semibold">Platform (15%)</span>
              <span className="text-rose-600 font-extrabold font-mono">- ৳ 25,208</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-50">
            {/* Visual breakdown target fill indicator bar component line design schema */}
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-rose-600 h-full w-[85%] rounded-full" />
            </div>
          </div>
        </div>

      </div>

      {/* 2. DUAL ROW MASTER CONTENT LAYOUT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* LEFT COLUMN MAIN TABLE: PAYOUT TRANSACTION LOGS DATAGRID CONTAINER */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-sm font-black text-gray-900">Payout History</h3>
            <button 
              onClick={() => setFilterActive(!filterActive)}
              className="p-1.5 border border-gray-200 rounded-lg text-xs bg-white text-gray-500 hover:text-gray-800 transition"
            >
              📊
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[550px]">
              <thead>
                <tr className="bg-gray-50/60 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-6">Payout ID</th>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6">Amount</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs font-medium">
                {payoutHistory.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/30 transition duration-150">
                    <td className="py-4 px-6 text-gray-400 font-mono tracking-wide">{item.id}</td>
                    <td className="py-4 px-6 text-gray-700 font-semibold">{item.date}</td>
                    <td className="py-4 px-6 text-gray-900 font-black text-sm">{item.amount}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ${
                          item.status === "Paid"
                            ? "bg-green-50 text-green-600"
                            : item.status === "Processing"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        {item.status === "Paid" && <span className="w-1 h-1 rounded-full bg-green-500 mr-1.5 inline-block" />}
                        {item.status === "Processing" && <span className="w-1 h-1 rounded-full bg-blue-500 mr-1.5 inline-block" />}
                        {item.status === "Failed" && <span className="w-1 h-1 rounded-full bg-red-500 mr-1.5 inline-block" />}
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Centralized Action Link Text Segment Element Trigger */}
          <div className="p-4 bg-gray-50/20 text-center border-t border-gray-100">
            <button className="text-xs font-bold text-rose-600 hover:text-rose-700 transition tracking-tight">
              View All Transactions
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR COMPONENT: PAYOUT PREFERENCES CONFIGURATION MATRIX LAYOUT CARD FRAME */}
        <div className="space-y-6">
          
          {/* PAYOUT SETTINGS SECTION FRAME */}
          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-rose-600">
              <span className="text-sm">🏦</span>
              <h3 className="text-xs font-black uppercase text-gray-900 tracking-wider">Payout Settings</h3>
            </div>

            {/* Configured Active Bank Account Overview Row Component Item Detail Box Block */}
            <div className="bg-gray-50/50 border border-gray-200/50 rounded-xl p-4 space-y-3">
              <div>
                <span className="text-[10px] font-bold text-gray-400 block tracking-wider uppercase">Primary Bank Account</span>
                <h4 className="text-xs font-black text-gray-900 mt-0.5">Standard Chartered Bank</h4>
                <p className="text-[11px] font-mono text-gray-400 mt-0.5 font-medium">**** **** 8291</p>
              </div>
              <div className="text-right">
                <button className="text-[10px] font-bold text-rose-600 hover:text-rose-700 transition">
                  Edit Details
                </button>
              </div>
            </div>

            {/* Threshold Selector Setting Dropdown Simulation Logic Section Markup Block Wrapper */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Withdrawal Threshold</label>
              <div className="relative">
                <select className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-700 shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-rose-500/20 focus:border-rose-500">
                  <option>Automatic (Every ৳ 50,000)</option>
                  <option>Automatic (Bi-weekly)</option>
                  <option>Automatic (Monthly)</option>
                  <option>Manual Withdrawal Only</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* SECONDARY PROMOTION ACTION BLOCK WIDGET LAYER INSIGHT SYSTEM WRAPPER COMPONENT CARD */}
          <div className="bg-gray-950 p-5 rounded-2xl text-white shadow-sm flex flex-col justify-between min-h-[160px] relative overflow-hidden group">
            <div className="space-y-1.5 z-10">
              <h3 className="text-sm font-black tracking-tight">Want to earn more?</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed max-w-[85%]">
                Complete your property 'Super Host' profile setup dashboard optimization sequence to reduce platform commission to 12%.
              </p>
            </div>
            <div className="pt-3 z-10">
              <button className="bg-white hover:bg-gray-50 text-gray-950 px-4 py-2 rounded-xl text-xs font-bold transition duration-200 shadow-sm">
                Learn How
              </button>
            </div>
            {/* Soft backdrop dynamic ambient gradient visual texture layer logic item overlay */}
            <div className="absolute -right-10 -bottom-10 w-28 h-28 bg-rose-600/10 rounded-full blur-xl pointer-events-none group-hover:scale-120 transition duration-500" />
          </div>

        </div>

      </div>

    </div>
  );
}