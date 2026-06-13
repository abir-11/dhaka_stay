"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Property {
  id: number;
  title?: string;
}

interface BookingData {
  id: number;
  property: Property;
  totalPrice: number;
  status: string;
}

export default function ReportsPage() {
  const { status } = useSession();
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReportData() {
      try {
        const response = await fetch("http://localhost:8080/bookings");
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated") {
      fetchReportData();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b) => b.status?.toLowerCase() === "confirmed");
  const cancelledBookings = bookings.filter((b) => b.status?.toLowerCase() === "cancelled");
  const pendingBookings = bookings.filter((b) => b.status?.toLowerCase() === "pending");

  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const avgBookingValue = confirmedBookings.length > 0 ? totalRevenue / confirmedBookings.length : 0;
  const successRate = totalBookings > 0 ? ((confirmedBookings.length / totalBookings) * 100).toFixed(1) : "0";

  const propertyPerformance = bookings.reduce((acc, b) => {
    if (b.status?.toLowerCase() === "confirmed") {
      const propId = b.property?.id || 0;
      if (!acc[propId]) {
        acc[propId] = {
          name: b.property?.title || `Property ID: ${propId}`,
          revenue: 0,
          bookings: 0,
        };
      }
      acc[propId].revenue += b.totalPrice || 0;
      acc[propId].bookings += 1;
    }
    return acc;
  }, {} as Record<number, { name: string; revenue: number; bookings: number }>);

  const topProperties = Object.values(propertyPerformance)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-4 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">
            Total Revenue
          </span>
          <h3 className="text-2xl font-extrabold text-indigo-600">
            ৳ {totalRevenue.toLocaleString()}
          </h3>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">
            Success Rate
          </span>
          <h3 className="text-2xl font-extrabold text-emerald-600">
            {successRate}%
          </h3>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">
            Avg Booking Value
          </span>
          <h3 className="text-2xl font-extrabold text-blue-600">
            ৳ {Math.round(avgBookingValue).toLocaleString()}
          </h3>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">
            Total Volume
          </span>
          <h3 className="text-2xl font-extrabold text-gray-900">
            {totalBookings} Bookings
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">
            Booking Status Distribution
          </h3>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-emerald-600">Confirmed ({confirmedBookings.length})</span>
                <span className="text-gray-500">{totalBookings > 0 ? Math.round((confirmedBookings.length / totalBookings) * 100) : 0}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${totalBookings > 0 ? (confirmedBookings.length / totalBookings) * 100 : 0}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-amber-600">Pending ({pendingBookings.length})</span>
                <span className="text-gray-500">{totalBookings > 0 ? Math.round((pendingBookings.length / totalBookings) * 100) : 0}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${totalBookings > 0 ? (pendingBookings.length / totalBookings) * 100 : 0}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-red-600">Cancelled ({cancelledBookings.length})</span>
                <span className="text-gray-500">{totalBookings > 0 ? Math.round((cancelledBookings.length / totalBookings) * 100) : 0}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${totalBookings > 0 ? (cancelledBookings.length / totalBookings) * 100 : 0}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm overflow-hidden">
          <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">
            Top Properties by Revenue
          </h3>
          <div className="space-y-4">
            {topProperties.length === 0 ? (
              <div className="text-xs text-gray-500">No data available.</div>
            ) : (
              topProperties.map((prop, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                      #{idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 truncate max-w-[150px] sm:max-w-[200px]">
                        {prop.name}
                      </h4>
                      <p className="text-[10px] font-semibold text-gray-500">
                        {prop.bookings} completed bookings
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-black text-indigo-600">
                    ৳ {prop.revenue.toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}