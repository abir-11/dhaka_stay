"use client";

import React from "react";

export default function VendorDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back, Rahat! Here's what's happening with your properties today.</p>
      </div>
      <div className="bg-white p-12 border border-dashed border-gray-200 rounded-2xl text-center text-gray-400">
        Vendor Main Content Area
      </div>
    </div>
  );
}