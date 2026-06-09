"use client";

import React from "react";

export default function IdentityVerificationPage() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-in fade-in duration-300">
      
      {/* Top Title & Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Identity Verification</h1>
        <p className="text-sm text-gray-500 mt-1 font-medium">
          Verify your identity to increase trust and unlock premium features.
        </p>
      </div>

      {/* Verification Current Status Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          {/* Status Icon */}
          <div className="w-12 h-12 bg-rose-50 border border-rose-100 text-[#ba0036] rounded-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px] font-bold">shield_person</span>
          </div>
          {/* Status Details */}
          <div className="space-y-2 sm:space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-gray-900">Verification Status</h2>
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Verified
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <div>
                <p className="text-[10px] font-bold text-gray-400">Submitted On</p>
                <p className="text-sm font-bold text-gray-800 normal-case mt-0.5">October 24, 2023</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400">ID Document</p>
                <p className="text-sm font-bold text-gray-800 normal-case mt-0.5">National ID (•••• 8829)</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Update Button */}
        <button className="flex items-center gap-1.5 text-xs font-bold text-[#ba0036] hover:text-[#9a002d] transition-colors self-end sm:self-auto bg-rose-50/50 hover:bg-rose-50 px-4 py-2 rounded-xl border border-rose-100/40">
          Update ID
          <span className="material-symbols-outlined text-[16px]">edit</span>
        </button>
      </div>

      {/* Main Layout Grid split into Left Upload Area & Right Sidebar Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Area: Submit New Document Container */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-gray-900 tracking-tight">Submit New Document</h3>
          
          {/* Dotted Drag & Drop Zone */}
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 bg-gray-50/30 hover:bg-gray-50/60 transition-colors flex flex-col items-center justify-center text-center group cursor-pointer">
            <div className="w-14 h-14 bg-gray-50 border border-gray-100 text-gray-400 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[28px] font-light">cloud_upload</span>
            </div>
            <h4 className="text-sm font-bold text-gray-900 mt-4">Drag and drop your document here</h4>
            <p className="text-xs text-gray-400 font-medium max-w-sm mt-1.5 leading-relaxed">
              Support for National ID, Passport, or Driver&apos;s License (JPG, PNG, PDF max 5MB)
            </p>
            <button className="mt-5 px-5 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
              Select File
            </button>
          </div>

          {/* Uploaded File Track Progress Bars */}
          <div className="space-y-3.5">
            
            {/* File 1: Fully uploaded and success check */}
            <div className="p-4 bg-white border border-gray-100 rounded-xl flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="material-symbols-outlined text-gray-400 text-[24px] shrink-0">image</span>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-800">
                    <p className="truncate pr-2">front-side-nid.jpg</p>
                    <p className="text-[11px] text-gray-400 font-medium shrink-0">1.2 MB</p>
                  </div>
                  {/* Progress Line */}
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#ba0036] h-full rounded-full w-full"></div>
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-emerald-500 text-[22px] shrink-0 font-bold">check_circle</span>
            </div>

            {/* File 2: Incomplete 65% progress uploading file */}
            <div className="p-4 bg-white border border-gray-100 rounded-xl flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="material-symbols-outlined text-gray-400 text-[24px] shrink-0">image</span>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-800">
                    <p className="truncate pr-2">back-side-nid.jpg</p>
                    <p className="text-[11px] text-gray-400 font-medium shrink-0">0.8 MB</p>
                  </div>
                  {/* Progress Line */}
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#ba0036] h-full rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-gray-400 shrink-0 w-8 text-right">65%</span>
            </div>

          </div>
        </div>

        {/* Right Area: Timelines & Extra Info Sidebars */}
        <div className="space-y-6">
          
          {/* Verification Timeline Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-gray-900 tracking-tight">Verification Timeline</h3>
            
            <div className="relative border-l-2 border-rose-100 pl-5 space-y-5 ml-2">
              {/* Step 1 */}
              <div className="relative">
                <span className="absolute -left-[27px] top-0 bg-[#ba0036] text-white w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <span className="material-symbols-outlined text-[10px] font-extrabold">check</span>
                </span>
                <p className="text-xs font-bold text-gray-900">Submitted</p>
                <p className="text-[11px] font-medium text-gray-400 mt-0.5">Documents received on Oct 24</p>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <span className="absolute -left-[27px] top-0 bg-[#ba0036] text-white w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <span className="material-symbols-outlined text-[10px] font-extrabold">check</span>
                </span>
                <p className="text-xs font-bold text-gray-900">Reviewing</p>
                <p className="text-[11px] font-medium text-gray-400 mt-0.5">Completed by our trust team</p>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <span className="absolute -left-[27px] top-0 bg-white text-[#ba0036] w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#ba0036] shadow-sm">
                  <span className="w-1.5 h-1.5 bg-[#ba0036] rounded-full"></span>
                </span>
                <p className="text-xs font-bold text-[#ba0036]">Approved</p>
                <p className="text-[11px] font-medium text-gray-400 mt-0.5">Final status: Verified account</p>
              </div>
            </div>
          </div>

          {/* Verification Benefits Cards list */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900 tracking-tight">Verification Benefits</h3>
            
            <div className="space-y-3">
              {/* Benefit 1 */}
              <div className="flex items-start gap-3.5 p-3 hover:bg-gray-50/50 rounded-xl transition-colors">
                <span className="material-symbols-outlined text-gray-400 text-[20px] pt-0.5 font-light">bolt</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Faster Approval</h4>
                  <p className="text-[11px] font-medium text-gray-400 mt-0.5">Get host responses 40% quicker</p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex items-start gap-3.5 p-3 hover:bg-gray-50/50 rounded-xl transition-colors">
                <span className="material-symbols-outlined text-gray-400 text-[20px] pt-0.5 font-light">workspace_premium</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Trust Score</h4>
                  <p className="text-[11px] font-medium text-gray-400 mt-0.5">Badge shown on your public profile</p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex items-start gap-3.5 p-3 hover:bg-gray-50/50 rounded-xl transition-colors">
                <span className="material-symbols-outlined text-gray-400 text-[20px] pt-0.5 font-light">shield</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Enhanced Security</h4>
                  <p className="text-[11px] font-medium text-gray-400 mt-0.5">Protect your account and bookings</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}