"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // ইউআরএল থেকে বুকিং রেফারেন্স কোড নেওয়ার চেষ্টা করবে (যদি থাকে)
  const referenceCode = searchParams.get("ref") || "DS-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="max-w-xl w-full bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-xl text-center space-y-6">
      
      {/* 🌟 সুন্দর সাকসেস অ্যানিমেটেড চেকমার্ক আইকন */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 border border-emerald-100 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      </div>

      {/* 📝 হেডিং মেসেজ */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          Booking Confirmed!
        </h1>
        <p className="text-sm md:text-base text-gray-500 font-medium">
          Thank you for choosing DhakaStay. Your reservation request has been successfully processed by the host.
        </p>
      </div>

      {/* 🎟️ বুকিং রেফারেন্স বক্স */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-2">
        <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">
          Booking Reference Code
        </span>
        <span className="block text-xl md:text-2xl font-black text-[#ba0036] tracking-wider select-all">
          {referenceCode}
        </span>
        <p className="text-[11px] text-gray-400">
          *Tip: Copy or screenshot this code for customer support and check-in.
        </p>
      </div>

      {/* ℹ️ ইনফরমেশন নোটিশ */}
      <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
        A confirmation email with the property address, host contact info, and digital invoice has been sent to your registered email address.
      </p>

      {/* 🔗 নেভিগেশন বাটনসমূহ */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
        <button
          onClick={() => router.push("/dashboard/customer/bookings")}
          className="flex-1 bg-[#ba0036] text-white py-3 px-6 rounded-xl font-bold text-sm hover:bg-[#9a002d] transition-all shadow-md active:scale-95"
        >
          View My Bookings
        </button>
        <button
          onClick={() => router.push("/")}
          className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-bold text-sm hover:bg-gray-50 hover:text-gray-900 transition-all active:scale-95"
        >
          Back to Home
        </button>
      </div>

    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen bg-[#f9f9f9] flex items-center justify-center px-6 py-12 text-gray-900 font-sans">
      <Suspense fallback={
        <div className="text-center p-10 bg-white rounded-2xl shadow-md max-w-sm">
          <div className="w-8 h-8 border-4 border-[#ba0036] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm font-semibold text-gray-600">Generating your ticket...</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </main>
  );
}