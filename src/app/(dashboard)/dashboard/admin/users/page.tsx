"use client";

import React, { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";

interface User {
  id: string | number;
  firstName?: string;
  lastName?: string;
  email: string;
  role?: string;
  profilePictureUrl?: string;
  createdAt?: string;
  status?: string;
}

// 💡 প্রক্সি ইউআরএল বেস (CORS পুরোপুরি এড়ানোর জন্য)
const API_BASE = "/api"; 

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("ALL");

  // 📡 ব্যাকএন্ড থেকে সব ইউজার ডাটা গেট করা
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      // সরল GET রিকোয়েস্ট, কোনো এক্সট্রা হেডার নেই যা CORS ট্রিগার করতে পারে
      const response = await fetch(`http://localhost:8080/user/all`);
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Server error during fetch. Status:", response.status);
      }
    } catch (error) {
      console.error("Network Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🗑️ সম্পূর্ণ সিকিউরড ডিলিট হ্যান্ডলার
  const handleDeleteUser = async (id: string | number, userEmail: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to permanently delete user: ${userEmail}. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ba0036",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete Account",
      cancelButtonText: "Cancel",
      allowOutsideClick: false
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: "Processing...",
          text: "Deleting user from database.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        // প্রক্সি রুট ব্যবহার করে ডিলিট রিকোয়েস্ট
        const response = await fetch(`http://localhost:8080/user/delete/${id}`, {
          method: "DELETE"
        });

        if (response.ok) {
          await Swal.fire({
            title: "Deleted!",
            text: "The user account has been successfully removed.",
            icon: "success",
            confirmButtonColor: "#ba0036"
          });
          
          // লোকাল স্টেট থেকে ইনস্ট্যান্ট রিমুভ
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } else {
          throw new Error(`Delete failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error("Delete Execution Error:", error);
        Swal.fire({
          title: "Execution Failed!",
          text: "Could not complete the deletion. Please ensure backend server is active.",
          icon: "error",
          confirmButtonColor: "#ba0036"
        });
      }
    }
  };

  // 📊 রোল কাউন্টার ক্যালকুলেশন
  const roleCounts = useMemo(() => {
    return {
      all: users.length,
      admin: users.filter(u => u.role?.toUpperCase() === "ADMIN").length,
      vendor: users.filter(u => u.role?.toUpperCase() === "VENDOR").length,
      customer: users.filter(u => u.role?.toUpperCase() === "CUSTOMER").length,
    };
  }, [users]);

  // 🔍 ফিল্টারিং এবং রিয়েল-টাইম সার্চ
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
      const matchesSearch = 
        fullName.includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(user.id).includes(searchTerm);
      
      const matchesRole = selectedRole === "ALL" || user.role?.toUpperCase() === selectedRole;
      
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, selectedRole]);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-2 sm:p-4">
      
      {/* 🔝 হেডার */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">User Management</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Monitor, manage roles, and review authentication access for all members.</p>
        </div>
        <button 
          onClick={fetchUsers}
          className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm self-stretch sm:self-auto justify-center"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span> Refresh Database
        </button>
      </div>

      {/* 📊 স্ট্যাটস গ্রিড */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Accounts", count: roleCounts.all, color: "text-blue-600", bg: "bg-blue-50/50", icon: "group" },
          { label: "Administrators", count: roleCounts.admin, color: "text-purple-600", bg: "bg-purple-50/50", icon: "shield_person" },
          { label: "Active Vendors", count: roleCounts.vendor, color: "text-amber-600", bg: "bg-amber-50/50", icon: "storefront" },
          { label: "Total Customers", count: roleCounts.customer, color: "text-[#ba0036]", bg: "bg-rose-50/50", icon: "person" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <span className="material-symbols-outlined text-[22px]">{stat.icon}</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-black text-gray-900 mt-0.5">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔍 কন্ট্রোল প্যানেল */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white">
          
          {/* সার্চ */}
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Search by name, email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50/60 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium outline-none focus:border-[#ba0036]/30 focus:ring-2 transition-all text-gray-800"
            />
          </div>

          {/* রোল ড্রপডাউন */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <select 
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border border-gray-200 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gray-50 text-gray-700 outline-none cursor-pointer min-w-[150px]"
            >
              <option value="ALL">All System Roles</option>
              <option value="ADMIN">Administrators</option>
              <option value="VENDOR">Vendors</option>
              <option value="CUSTOMER">Customers</option>
            </select>
            <p className="text-xs font-bold text-gray-400 hidden sm:block whitespace-nowrap">
              Found {filteredUsers.length} Users
            </p>
          </div>
        </div>

        {/* 📋 টেবিল কন্টেন্ট */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <div className="w-10 h-10 border-4 border-[#ba0036] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-bold text-gray-400 animate-pulse">Syncing user directory...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-16 text-gray-400 font-semibold text-sm">
              No matching users found in the directory.
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-6">User Identification</th>
                  <th className="py-4 px-4">Email Address</th>
                  <th className="py-4 px-4">System Role</th>
                  <th className="py-4 px-4">Registration Date</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-center">Action Framework</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-700">
                {filteredUsers.map((user) => {
                  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ") || "No Name Provided";
                  const initial = fullName.charAt(0).toUpperCase();
                  const role = user.role?.toUpperCase() || "CUSTOMER";
                  const dateJoined = user.createdAt ? user.createdAt.split("T")[0] : "N/A";
                  
                  // ইমেজ পাথ প্রসেসিং (লোকাল হোস্টের ক্ষেত্রেও প্রক্সি হ্যান্ডেল করবে)
                  let finalAvatar = "";
                  if (user?.profilePictureUrl) {
                    finalAvatar = user.profilePictureUrl.startsWith("http")
                      ? user.profilePictureUrl
                      : `http://localhost:8080${user.profilePictureUrl}`;
                  }

                  return (
                    <tr key={user.id} className="hover:bg-gray-50/40 transition-colors">
                      <td className="py-4 px-6 flex items-center gap-3">
                        {finalAvatar ? (
                          <img src={finalAvatar} alt={fullName} className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-100 shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#ba0036]/10 text-[#ba0036] flex items-center justify-center font-black text-sm shrink-0">
                            {initial}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 truncate max-w-[180px]">{fullName}</p>
                          <p className="text-[11px] text-gray-400 font-bold mt-0.5">UID: #US-{user.id}</p>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-xs font-semibold text-gray-600">{user.email}</td>

                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black tracking-wider ${
                          role === "ADMIN" ? "bg-purple-50 text-purple-700" : role === "VENDOR" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"
                        }`}>
                          {role}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-xs text-gray-500 font-semibold">{dateJoined}</td>

                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${user.status?.toUpperCase() === "INACTIVE" ? "text-gray-400" : "text-emerald-600"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.status?.toUpperCase() === "INACTIVE" ? "bg-gray-400" : "bg-emerald-500"}`} />
                          {user.status || "ACTIVE"}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2.5">
                          <button 
                            onClick={() => Swal.fire({ title: fullName, text: `User Email: ${user.email}\nRole: ${role}`, icon: "info", confirmButtonColor: "#ba0036" })}
                            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                            title="View Metrics"
                          >
                            <span className="material-symbols-outlined text-[20px] flex">visibility</span>
                          </button>

                          <button 
                            onClick={() => handleDeleteUser(user.id, user.email)}
                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Terminate User Account"
                          >
                            <span className="material-symbols-outlined text-[20px] flex font-bold">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}