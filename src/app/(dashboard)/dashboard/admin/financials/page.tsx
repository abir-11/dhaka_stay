"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Property {
  id: number;
  title?: string;
}

interface Customer {
  id: number;
  name?: string;
  email?: string;
}

interface BookingData {
  id: number;
  bookingReference: string;
  property: Property;
  customer?: Customer;
  checkInDate: string;
  checkOutDate: string;
  basePrice: number;
  platformFee: number;
  totalPrice: number;
  status: string;
}

export default function FinancialsPage() {
  const { status } = useSession();
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    async function fetchFinancialData() {
      try {
        const response = await fetch("http://localhost:8080/bookings");
        if (response.ok) {
          const data = await response.json();
          setBookings(data.reverse());
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated") {
      fetchFinancialData();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const confirmedBookings = bookings.filter((b) => b.status?.toLowerCase() === "confirmed");
  const pendingBookings = bookings.filter((b) => b.status?.toLowerCase() === "pending");

  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const totalPlatformFees = confirmedBookings.reduce((sum, b) => sum + (b.platformFee || 0), 0);
  const pendingRevenue = pendingBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const netEarnings = totalRevenue - totalPlatformFees;

  const financialStats = [
    { label: "GROSS REVENUE", value: `৳ ${totalRevenue.toLocaleString()}`, bgColor: "bg-emerald-50 text-emerald-600" },
    { label: "NET EARNINGS", value: `৳ ${netEarnings.toLocaleString()}`, bgColor: "bg-blue-50 text-blue-600" },
    { label: "PLATFORM FEES", value: `৳ ${totalPlatformFees.toLocaleString()}`, bgColor: "bg-purple-50 text-purple-600" },
    { label: "PENDING REVENUE", value: `৳ ${pendingRevenue.toLocaleString()}`, bgColor: "bg-amber-50 text-amber-600" },
  ];

  const filteredTransactions = bookings.filter((b) => {
    if (activeTab === "All") return true;
    return b.status?.toLowerCase() === activeTab.toLowerCase();
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-4 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {financialStats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">
              {stat.label}
            </span>
            <h3 className={`text-2xl font-extrabold ${stat.bgColor.split(" ")[1]}`}>
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 border border-gray-100 rounded-xl shadow-sm">
          <div className="flex gap-2">
            {["All", "Confirmed", "Pending", "Cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 bg-gray-50/80 border-b border-gray-200 py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            <span className="col-span-1">Transaction ID</span>
            <span className="col-span-2">Property & Guest</span>
            <span className="col-span-1">Base Price</span>
            <span className="col-span-1">Platform Fee</span>
            <span className="col-span-1">Total Amount</span>
            <span className="col-span-1 text-center">Status</span>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredTransactions.length === 0 ? (
              <div className="p-10 text-center text-sm font-medium text-gray-400">
                No financial records found.
              </div>
            ) : (
              filteredTransactions.map((booking) => {
                const isConfirmed = booking.status?.toLowerCase() === "confirmed";
                const isPending = booking.status?.toLowerCase() === "pending";

                return (
                  <div key={booking.id} className="grid grid-cols-7 items-center py-4 px-6 hover:bg-emerald-50/20 transition text-xs">
                    <div className="col-span-1 font-mono text-[11px] font-semibold text-gray-500">
                      {booking.bookingReference || `TXN-${booking.id}`}
                    </div>

                    <div className="col-span-2">
                      <h4 className="font-extrabold text-gray-900 truncate pr-2">
                        {booking.property?.title || "Property ID: " + booking.property?.id}
                      </h4>
                      <span className="text-[10px] text-gray-500">
                        Guest: {booking.customer?.name || "N/A"}
                      </span>
                    </div>

                    <div className="col-span-1 font-semibold text-gray-600">
                      ৳ {booking.basePrice?.toLocaleString() || "0"}
                    </div>

                    <div className="col-span-1 font-semibold text-purple-600">
                      ৳ {booking.platformFee?.toLocaleString() || "0"}
                    </div>

                    <div className="col-span-1 font-black text-emerald-600 text-sm">
                      ৳ {booking.totalPrice?.toLocaleString() || "0"}
                    </div>

                    <div className="col-span-1 flex justify-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        isConfirmed ? "bg-emerald-100 text-emerald-700"
                        : isPending ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}