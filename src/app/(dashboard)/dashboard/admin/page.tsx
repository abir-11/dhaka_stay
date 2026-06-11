"use client";

import React, { useEffect, useState, useMemo } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function AdminDashboardMain() {
  const [users, setUsers] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 📡 ডাটাবেজ থেকে ডাটা ফেচিং
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [usersRes, propertiesRes] = await Promise.all([
          fetch("http://localhost:8080/user/all"),
          fetch("http://localhost:8080/properties")
        ]);

        if (usersRes.ok && propertiesRes.ok) {
          setUsers(await usersRes.json());
          setProperties(await propertiesRes.json());
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  // 📊 Recharts ডাটা প্রোসেসিং
  const userRoleData = useMemo(() => {
    const roles: Record<string, number> = { CUSTOMER: 0, VENDOR: 0, ADMIN: 0 };
    users.forEach((u) => {
      const role = u.role?.toUpperCase() || "UNKNOWN";
      if (roles[role] !== undefined) roles[role] += 1;
    });
    return Object.keys(roles).map(key => ({ name: key, value: roles[key] }));
  }, [users]);

  const propertyStatusData = useMemo(() => {
    const statuses: Record<string, number> = {};
    properties.forEach((p) => {
      const status = p.status || "Pending";
      statuses[status] = (statuses[status] || 0) + 1;
    });
    return Object.keys(statuses).map(key => ({ name: key, count: statuses[key] }));
  }, [properties]);

  const COLORS = ["#ba0036", "#10b981", "#3b82f6"]; // Brand Red, Green, Blue

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-[#ba0036] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-bold text-gray-500 animate-pulse">Synchronizing System Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">System Overview</h1>
        <p className="text-sm text-gray-500 font-medium mt-1">Real-time metrics of DhakaStay platform.</p>
      </div>

      {/* 💳 স্ট্যাটাস কার্ডস */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: "Total Users", count: users.length, icon: "group", color: "text-blue-600", bg: "bg-blue-50" },
          { title: "Total Properties", count: properties.length, icon: "apartment", color: "text-[#ba0036]", bg: "bg-rose-50" },
          { title: "Active Vendors", count: userRoleData.find(r => r.name === "VENDOR")?.value || 0, icon: "storefront", color: "text-amber-600", bg: "bg-amber-50" },
          { title: "Pending Verifications", count: properties.filter(p => p.status === "Pending").length, icon: "pending_actions", color: "text-orange-600", bg: "bg-orange-50" },
        ].map((card, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{card.title}</p>
              <p className="text-2xl font-black text-gray-900">{card.count}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center ${card.color}`}>
              <span className="material-symbols-outlined text-[26px]">{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 📈 Recharts ভিজ্যুয়ালাইজেশন */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Demographics - Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900">User Demographics</h3>
            <p className="text-[11px] text-gray-400 font-medium">Distribution of registered users by role</p>
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={userRoleData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {userRoleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", fontWeight: "bold" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Property Status - Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900">Property Insights</h3>
            <p className="text-[11px] text-gray-400 font-medium">Current status of all listed properties</p>
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={propertyStatusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" stroke="#9ca3af" tickLine={false} axisLine={false} tick={{ fontSize: 12, fontWeight: 'bold' }} />
                <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                <Bar dataKey="count" name="Total Properties" fill="#ba0036" radius={[6, 6, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}