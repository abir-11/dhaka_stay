"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// ১. পেআউট ডেটার জন্য টাইপ ডেফিনিশন (Interface Setup)
interface PayoutTransaction {
  id: string;
  date: string;
  amount: string | number;
  status: string;
}

interface FinancialSummary {
  netEarnings: number;
  pendingPayouts: number;
  grossRevenue: number;
  platformFee: number;
  nextPayoutDate: string;
  earningGrowth: string;
}

export default function VendorFinancialsPage() {
  const { data: session, status } = useSession();
  const [payoutHistory, setPayoutHistory] = useState<PayoutTransaction[]>([]);
  const [financials, setFinancials] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterActive, setFilterActive] = useState(false);

  // ২. এপিআই থেকে ভেন্ডর আইডি এবং ফাইনান্সিয়াল ডেটা লোড করা
  useEffect(() => {
    async function fetchFinancialLedger() {
      if (status === "authenticated" && session?.user?.email) {
        try {
          // ইমেইল ব্যবহার করে ভেন্ডর প্রোফাইল অবজেক্ট ও আইডি রিট্রিভ করা
          const userRes = await fetch(`http://localhost:8080/user/email?email=${encodeURIComponent(session.user.email)}`);
          if (!userRes.ok) throw new Error("Identity integration sync failed.");
          
          const textData = await userRes.text();
          if (!textData) return;
          
          const user = JSON.parse(textData);

          if (user.id) {
            // ভেন্ডরের ফাইনান্সিয়াল সামারি লোড (আপনার এন্ডপয়েন্ট স্ট্রাকচার অনুযায়ী URL চেঞ্জ করতে পারেন)
            const summaryRes = await fetch(`http://localhost:8080/financials/summary/${user.id}`);
            if (summaryRes.ok) {
              const summaryData = await summaryRes.json();
              setFinancials(summaryData);
            }

            // ভেন্ডরের পেআউট ট্রানজেকশন হিস্ট্রি লিস্ট লোড
            const historyRes = await fetch(`http://localhost:8080/financials/payouts/${user.id}`);
            if (historyRes.ok) {
              const historyData = await historyRes.json();
              setPayoutHistory(historyData);
            }
          }
        } catch (error) {
          console.error("Financial analytics data sync error:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchFinancialLedger();
  }, [session, status]);

  // এপিআই লোড হওয়ার পূর্ব মুহূর্ত পর্যন্ত স্পিনার স্টেট রান করবে
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
        <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-gray-500">Compiling financial analytics...</p>
      </div>
    );
  }

  // ৩. ব্যাকএন্ডে ডেটা না থাকলে ফলব্যাক বা ডিফল্ট ভ্যালু সেটআপ
  const netEarnings = financials?.netEarnings ?? 0;
  const pendingPayouts = financials?.pendingPayouts ?? 0;
  const grossRevenue = financials?.grossRevenue ?? 0;
  const platformFee = financials?.platformFee ?? 0;
  const nextPayoutDate = financials?.nextPayoutDate || "Oct 15";
  const earningGrowth = financials?.earningGrowth || "+12.5%";

  // গ্রস রেভিনিউ এর সাপেক্ষে নেট আর্নিং এর পারসেন্টেজ বার ক্যালকুলেশন
  const fillPercentage = grossRevenue > 0 ? Math.min(Math.round((netEarnings / grossRevenue) * 100), 100) : 85;

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
              <h2 className="text-3xl font-black tracking-tight">৳ {netEarnings.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</h2>
            </div>
            <div className="w-9 h-9 bg-rose-500/20 rounded-xl flex items-center justify-center text-rose-100 text-sm">
              💳
            </div>
          </div>
          
          <div className="mt-8 flex items-center space-x-1.5 text-[11px] font-bold">
            <span className="bg-white/15 px-2 py-0.5 rounded-md text-white">🗲 {earningGrowth}</span>
            <span className="text-rose-100/70">vs previous month</span>
          </div>
        </div>

        {/* CARD B: PENDING REVENUE CONTAINER */}
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black tracking-wider uppercase text-gray-400">Pending Payouts</span>
            <h2 className="text-2xl font-black text-rose-600 tracking-tight">৳ {pendingPayouts.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</h2>
          </div>
          
          <div className="mt-8 flex items-center space-x-1.5 text-[11px] text-gray-400 font-medium">
            <span>🕒</span>
            <span>Next payout on <strong className="text-gray-700 font-bold">{nextPayoutDate}</strong></span>
          </div>
        </div>

        {/* CARD C: FINANCIAL SUB-BREAKDOWN MATRIX */}
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 font-semibold">Gross Revenue</span>
              <span className="text-gray-900 font-extrabold font-mono">৳ {grossRevenue.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 font-semibold">Platform Fee</span>
              <span className="text-rose-600 font-extrabold font-mono">- ৳ {platformFee.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-50">
            {/* dynamic visual bar filling */}
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-rose-600 h-full rounded-full transition-all duration-500" style={{ width: `${fillPercentage}%` }} />
            </div>
          </div>
        </div>

      </div>

      {/* 2. DUAL ROW MASTER CONTENT LAYOUT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* LEFT COLUMN MAIN TABLE: PAYOUT TRANSACTION LOGS DATAGRID */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-sm font-black text-gray-900">Payout History</h3>
            <button 
              onClick={() => setFilterActive(!filterActive)}
              className={`p-1.5 border rounded-lg text-xs transition ${filterActive ? "bg-rose-50 border-rose-200 text-rose-600" : "bg-white border-gray-200 text-gray-500 hover:text-gray-800"}`}
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
                {payoutHistory.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-400 font-medium">No ledger records found for this workstation account.</td>
                  </tr>
                ) : (
                  payoutHistory.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50/30 transition duration-150">
                      <td className="py-4 px-6 text-gray-400 font-mono tracking-wide">{item.id}</td>
                      <td className="py-4 px-6 text-gray-700 font-semibold">{item.date}</td>
                      <td className="py-4 px-6 text-gray-900 font-black text-sm">
                        ৳ {typeof item.amount === "number" ? item.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 }) : item.amount}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                            item.status?.toLowerCase() === "paid" || item.status?.toLowerCase() === "success"
                              ? "bg-green-50 text-green-600"
                              : item.status?.toLowerCase() === "processing" || item.status?.toLowerCase() === "pending"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-red-50 text-red-500"
                          }`}
                        >
                          {(item.status?.toLowerCase() === "paid" || item.status?.toLowerCase() === "success") && <span className="w-1 h-1 rounded-full bg-green-500 mr-1.5 inline-block" />}
                          {(item.status?.toLowerCase() === "processing" || item.status?.toLowerCase() === "pending") && <span className="w-1 h-1 rounded-full bg-blue-500 mr-1.5 inline-block" />}
                          {item.status?.toLowerCase() === "failed" && <span className="w-1 h-1 rounded-full bg-red-500 mr-1.5 inline-block" />}
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-gray-50/20 text-center border-t border-gray-100">
            <button className="text-xs font-bold text-rose-600 hover:text-rose-700 transition tracking-tight">
              View All Transactions
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR COMPONENT: PAYOUT PREFERENCES CONFIGURATION */}
        <div className="space-y-6">
          
          {/* PAYOUT SETTINGS SECTION */}
          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-rose-600">
              <span className="text-sm">🏦</span>
              <h3 className="text-xs font-black uppercase text-gray-900 tracking-wider">Payout Settings</h3>
            </div>

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

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Withdrawal Threshold</label>
              <div className="relative">
                <select className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-700 shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-rose-500">
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

          {/* SECONDARY PROMOTION ACTION BLOCK */}
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
            <div className="absolute -right-10 -bottom-10 w-28 h-28 bg-rose-600/10 rounded-full blur-xl pointer-events-none group-hover:scale-120 transition duration-500" />
          </div>

        </div>

      </div>

    </div>
  );
}