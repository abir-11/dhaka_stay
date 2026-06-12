"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

// 👈 ইমেজ অবজেক্টের জন্য ইন্টারফেস
interface PropertyImage {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
}

interface Property {
  id: number;
  title: string;
  description: string;
  propertyType: string;
  address: string;
  city: string;
  zipCode: string;
  latitude: number | null;
  longitude: number | null;
  pricePerNight: number;
  maxGuests: number;
  status: string;
  images?: PropertyImage[]; // 👈 আপনার JSON এর সাথে মিল রেখে images অ্যারে যুক্ত করা হলো
}

export default function MyPropertiesPage() {
  const { data: session, status } = useSession();
  const [properties, setProperties] = useState<Property[]>([]);
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // আপডেটের মডাল কন্ট্রোল স্টেট
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // ১. ভেন্ডর আইডি এবং প্রোপার্টি ডেটা লোড করা
  useEffect(() => {
    async function initPortfolio() {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const userRes = await fetch(`http://localhost:8080/user/email?email=${encodeURIComponent(session.user.email)}`);
          if (!userRes.ok) throw new Error("Failed to resolve vendor identity.");
          
          const textData = await userRes.text();
          if (!textData) return;
          
          const user = JSON.parse(textData);
          setVendorId(user.id);

          if (user.id) {
            const propertyRes = await fetch(`http://localhost:8080/properties/vendor/${user.id}`);
            if (propertyRes.ok) {
              const data = await propertyRes.json();
              setProperties(data);
            }
          }
        } catch (error) {
          console.error("Initialization error:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    initPortfolio();
  }, [session, status]);

  // ২. ডিলিট প্রোপার্টি মেথড (ফ্ল্যাশ এবং স্টেট সিঙ্ক সহ)
  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this property post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ba0036",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:8080/deleteProperty/${id}`, {
            method: "DELETE",
          });

          if (res.ok) {
            // সফলভাবে ডিলিট হলে ক্লায়েন্ট সাইড স্টেট থেকে ফিল্টার করে ফেলা হচ্ছে
            setProperties((prev) => prev.filter((p) => p.id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Property has been removed successfully.",
              icon: "success",
              confirmButtonColor: "#059669"
            });
          } else {
            throw new Error("Deletion failed on server side.");
          }
        } catch (error) {
          Swal.fire("Error!", "Something went wrong while deleting. Check database cascading constraints.", "error");
        }
      }
    });
  };

  // ৩. আপডেট মডাল ওপেন করার হ্যান্ডলার
  const openUpdateModal = (property: Property) => {
    setSelectedProperty({ ...property });
    setIsUpdateModalOpen(true);
  };

  // ৪. আপডেট সাবমিট মেথড
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProperty) return;

    setIsUpdating(true);
    try {
      const res = await fetch(`http://localhost:8080/updateProperty/${selectedProperty.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedProperty),
      });

      if (res.ok) {
        const updatedData = await res.json();
        setProperties((prev) => prev.map((p) => (p.id === updatedData.id ? updatedData : p)));
        setIsUpdateModalOpen(false);
        
        Swal.fire({
          title: "Updated!",
          text: "Property configurations updated successfully.",
          icon: "success",
          confirmButtonColor: "#059669"
        });
      } else {
        Swal.fire("Failed", "Couldn't update property. Check backend constraints.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server is unreachable at the moment.", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
        <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-gray-500">Syncing your active portfolio...</p>
      </div>
    );
  }

  const totalPortfolioValue = properties.reduce((acc, curr) => acc + curr.pricePerNight, 0);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-in fade-in duration-300">
      
      {/* --- TOP HEADER ROW --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">My Properties</h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Manage your real-time portfolio data and properties connectivity.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
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
                <th className="py-4 px-6">Property Details</th>
                <th className="py-4 px-4">Location</th>
                <th className="py-4 px-4">Price/Night</th>
                <th className="py-4 px-4">Max Guests</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {properties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm font-medium text-gray-400">
                    No listed property found for this vendor account.
                  </td>
                </tr>
              ) : (
                properties.map((property) => {
                  // 👈 JSON থেকে Base64 প্রাইমারি ইমেজটি খুঁজে বের করার লজিক
                  const primaryImage = property.images?.find(img => img.isPrimary)?.imageUrl 
                    || property.images?.[0]?.imageUrl 
                    || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=150"; // কোনো ইমেজ না থাকলে ডিফল্ট ব্যাকআপ

                  return (
                    <tr key={property.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6 flex items-center gap-4">
                        {/* 👈 এখানে এখন ডাটাবেজের আসল ইমেজ লোড হবে */}
                        <img
                          src={primaryImage}
                          alt={property.title}
                          className="w-12 h-12 rounded-xl object-cover ring-1 ring-gray-100 shadow-sm shrink-0"
                        />
                        <div>
                          <p className="text-sm font-bold text-gray-900 group-hover:text-[#ba0036] transition-colors">
                            {property.title}
                          </p>
                          <p className="text-[11px] font-semibold text-gray-400 mt-0.5">
                            ID: #{property.id} | <span className="text-[#ba0036] uppercase">{property.propertyType}</span>
                          </p>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="text-xs font-bold text-gray-600">{property.address}, {property.city}</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="text-xs font-black text-gray-900">৳ {property.pricePerNight}</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="text-xs font-bold text-gray-600">{property.maxGuests} Guests max</span>
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                            property.status === "active"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-rose-50 text-rose-500"
                          }`}
                        >
                          {property.status}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => openUpdateModal(property)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Edit Configuration"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button 
                            onClick={() => handleDelete(property.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                            title="Delete Property"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- BOTTOM INSIGHTS ROW --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between gap-6 min-h-[140px]">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Listings</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-gray-900">{properties.length} Total</h3>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                Live on SmartHome
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#ba0036] p-5 rounded-2xl text-white flex flex-col justify-between shadow-sm min-h-[140px] group relative overflow-hidden">
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-rose-200 uppercase tracking-widest">Combined Base Price Rent</p>
            <h3 className="text-3xl font-black tracking-tight">৳ {totalPortfolioValue}</h3>
          </div>
        </div>
      </div>

      {/* --- UPDATE MODAL COMPONENT --- */}
      {isUpdateModalOpen && selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto transform transition-all scale-100">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="text-lg font-bold text-gray-900">Configure Property Setup</h3>
              <button 
                onClick={() => setIsUpdateModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
              >
                <span className="material-symbols-outlined block">close</span>
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Property Title</label>
                <input
                  type="text"
                  required
                  className="w-full border p-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ba0036]/20 focus:border-[#ba0036]"
                  value={selectedProperty.title}
                  onChange={(e) => setSelectedProperty({ ...selectedProperty, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  className="w-full border p-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ba0036]/20 focus:border-[#ba0036]"
                  value={selectedProperty.description}
                  onChange={(e) => setSelectedProperty({ ...selectedProperty, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price Per Night (৳)</label>
                  <input
                    type="number"
                    required
                    className="w-full border p-2.5 text-sm rounded-xl"
                    value={selectedProperty.pricePerNight}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, pricePerNight: parseFloat(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Max Guests Allowed</label>
                  <input
                    type="number"
                    required
                    className="w-full border p-2.5 text-sm rounded-xl"
                    value={selectedProperty.maxGuests}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, maxGuests: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Zip Code</label>
                  <input
                    type="text"
                    className="w-full border p-2 bg-white text-xs rounded-lg"
                    value={selectedProperty.zipCode || ""}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, zipCode: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    className="w-full border p-2 bg-white text-xs rounded-lg"
                    value={selectedProperty.latitude || ""}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, latitude: e.target.value ? parseFloat(e.target.value) : null })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    className="w-full border p-2 bg-white text-xs rounded-lg"
                    value={selectedProperty.longitude || ""}
                    onChange={(e) => setSelectedProperty({ ...selectedProperty, longitude: e.target.value ? parseFloat(e.target.value) : null })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status Policy</label>
                <select
                  className="w-full border p-2.5 text-sm rounded-xl bg-white"
                  value={selectedProperty.status}
                  onChange={(e) => setSelectedProperty({ ...selectedProperty, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t mt-4">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold border rounded-xl text-gray-500 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2 text-sm font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Commit Update ✅"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}