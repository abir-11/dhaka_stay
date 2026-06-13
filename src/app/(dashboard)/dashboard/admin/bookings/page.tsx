"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

interface Property {
  id: number;
  title?: string;
  name?: string;
}

interface Customer {
  id: number;
  name?: string;
  email?: string;
  avatar?: string;
  imageUrl?: string;
}

interface BookingData {
  id: number;
  bookingReference: string;
  property: Property;
  customer?: Customer;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: string;
}

export default function AdminBookingsPage() {
  const { status } = useSession();
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  
  const [processingId, setProcessingId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchAllBookings() {
      try {
        const response = await fetch("http://localhost:8080/bookings");
        if (response.ok) {
          const data = await response.json();
          setBookings(data.reverse()); 
        } else {
          console.error("Failed to fetch all bookings");
        }
      } catch (error) {
        console.error("Connection error:", error);
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated") {
      fetchAllBookings();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const handleConfirmBooking = async (bookingId: number) => {
    try {
      setProcessingId(bookingId);
      
      const response = await fetch(`http://localhost:8080/updateBookingStatus/${bookingId}?status=confirmed`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setBookings((prev) => prev.map((b) => b.id === bookingId ? { ...b, status: "confirmed" } : b));
        Swal.fire({ icon: 'success', title: 'Confirmed!', text: 'Booking successfully confirmed.', timer: 2000, showConfirmButton: false });
      } else {
        Swal.fire({ icon: 'error', title: 'Failed!', text: 'Could not confirm booking.', confirmButtonColor: '#2563eb' });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Server connection failed.' });
    } finally {
      setProcessingId(null);
    }
  };

  const handleCancelBooking = async (bookingId: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You are about to cancel this booking!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: 'Yes, cancel it!'
    });

    if (result.isConfirmed) {
      try {
        setProcessingId(bookingId);
        
        const response = await fetch(`http://localhost:8080/cancelBooking/${bookingId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setBookings((prev) => prev.map((b) => b.id === bookingId ? { ...b, status: "cancelled" } : b));
          Swal.fire({ icon: 'success', title: 'Cancelled!', text: 'Booking has been cancelled.', timer: 2000, showConfirmButton: false });
        } else {
          Swal.fire({ icon: 'error', title: 'Failed!', text: 'Could not cancel booking.' });
        }
      } catch (error) {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Server connection failed.' });
      } finally {
        setProcessingId(null);
      }
    }
  };

  const formatDates = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return "N/A";
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${new Date(checkIn).toLocaleDateString("en-US", options)} - ${new Date(checkOut).toLocaleDateString("en-US", options)}`;
  };

  const totalBookings = bookings.length;
  const pendingCount = bookings.filter(b => b.status?.toLowerCase() === "pending").length;
  const confirmedCount = bookings.filter(b => b.status?.toLowerCase() === "confirmed").length;
  const cancelledCount = bookings.filter(b => b.status?.toLowerCase() === "cancelled").length;

  const summaryStats = [
    { label: "TOTAL BOOKINGS", value: totalBookings, icon: "📊", bgColor: "bg-blue-50 text-blue-600" },
    { label: "PENDING", value: pendingCount, icon: "⏳", bgColor: "bg-amber-50 text-amber-600" },
    { label: "CONFIRMED", value: confirmedCount, icon: "✅", bgColor: "bg-green-50 text-green-600" },
    { label: "CANCELLED", value: cancelledCount, icon: "❌", bgColor: "bg-red-50 text-red-600" },
  ];

  const filteredBookings = bookings.filter((b) => {
    if (activeFilter === "All") return true;
    return b.status?.toLowerCase() === activeFilter.toLowerCase();
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-gray-500">Loading system records...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-4 font-sans">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {summaryStats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold ${stat.bgColor}`}>
              {stat.icon}
            </div>
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">{stat.label}</span>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-0.5">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 border border-gray-100 rounded-xl shadow-sm">
          <div className="flex flex-wrap gap-2">
            {["All", "Confirmed", "Pending", "Cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeFilter === tab
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="text-sm font-semibold text-gray-500">
            System Overview (Admin)
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 bg-gray-50/80 border-b border-gray-200 py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            <span className="col-span-1">Ref ID</span>
            <span className="col-span-2">Guest & Contact</span>
            <span className="col-span-1">Property</span>
            <span className="col-span-1">Dates</span>
            <span className="col-span-1">Status</span>
            <span className="col-span-1 text-center">Admin Actions</span>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredBookings.length === 0 ? (
              <div className="p-10 text-center text-sm font-medium text-gray-400">
                No bookings found in the system.
              </div>
            ) : (
              filteredBookings.map((booking) => {
                const isPending = booking.status?.toLowerCase() === "pending";
                const isConfirmed = booking.status?.toLowerCase() === "confirmed";

                return (
                  <div key={booking.id} className="grid grid-cols-7 items-center py-4 px-6 hover:bg-blue-50/20 transition text-xs">
                    
                    {/* Ref ID */}
                    <div className="col-span-1 font-mono text-[11px] font-semibold text-gray-500">
                      {booking.bookingReference || `#BK-${booking.id}`}
                    </div>

                    {/* Guest Info */}
                    <div className="col-span-2 flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs">
                        {booking.customer?.name ? booking.customer.name.substring(0, 2).toUpperCase() : "GU"}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-gray-900">{booking.customer?.name || "Unknown Guest"}</h4>
                        <span className="text-[10px] text-gray-500">{booking.customer?.email || "No Email"}</span>
                      </div>
                    </div>

                    {/* Property */}
                    <div className="col-span-1 pr-2 font-semibold text-gray-700 truncate">
                      {booking.property?.title || "Property ID: " + booking.property?.id}
                    </div>

                    {/* Dates & Amount */}
                    <div className="col-span-1">
                      <div className="text-gray-900 font-bold">{formatDates(booking.checkInDate, booking.checkOutDate)}</div>
                      <div className="text-[10px] font-black text-blue-600 mt-0.5">৳ {booking.totalPrice?.toLocaleString()}</div>
                    </div>

                    {/* Status Badge */}
                    <div className="col-span-1">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        isConfirmed ? "bg-green-100 text-green-700"
                        : isPending ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                      }`}>
                        {booking.status}
                      </span>
                    </div>

                    {/* 🛠️ Admin Actions (Confirm / Cancel) */}
                    <div className="col-span-1 flex justify-center gap-2">
                      {isPending && (
                        <>
                          <button
                            onClick={() => handleConfirmBooking(booking.id)}
                            disabled={processingId === booking.id}
                            title="Confirm"
                            className="p-1.5 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-md transition disabled:opacity-50"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          </button>
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            disabled={processingId === booking.id}
                            title="Cancel"
                            className="p-1.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-md transition disabled:opacity-50"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                          </button>
                        </>
                      )}
                      {!isPending && (
                        <span className="text-[10px] font-semibold text-gray-400">Processed</span>
                      )}
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