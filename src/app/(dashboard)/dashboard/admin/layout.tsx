"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, SessionProvider } from "next-auth/react";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // অ্যাডমিন প্রোফাইল ডাটা স্টেট
  const [adminData, setAdminData] = useState({
    name: "Loading...",
    avatar: "",
    role: "Admin",
    isLoading: true,
  });

  const isAuthenticated = status === "authenticated";

  // 📡 ডাইনামিক অ্যাডমিন প্রোফাইল ফেচিং
  useEffect(() => {
    async function fetchAdminProfile() {
      if (isAuthenticated && session?.user?.email) {
        try {
          const response = await fetch(`http://localhost:8080/user/email?email=${encodeURIComponent(session.user.email)}`);
          if (response.ok) {
            const dbUser = await response.json();
            
            const fullName = [dbUser.firstName, dbUser.lastName].filter(Boolean).join(" ") || session?.user?.name || "System Admin";
            
            let finalAvatar = "";
            if (dbUser?.profilePictureUrl) {
              finalAvatar = dbUser.profilePictureUrl.startsWith("http")
                ? dbUser.profilePictureUrl
                : `http://localhost:8080${dbUser.profilePictureUrl}`;
            }

            setAdminData({
              name: fullName,
              avatar: finalAvatar,
              role: dbUser?.role || "ADMIN",
              isLoading: false,
            });
          } else {
            setAdminData((prev) => ({ ...prev, isLoading: false, name: "System Admin" }));
          }
        } catch (error) {
          console.error("Failed to fetch admin profile:", error);
          setAdminData((prev) => ({ ...prev, isLoading: false, name: "System Admin" }));
        }
      } else if (status !== "loading") {
        setAdminData((prev) => ({ ...prev, isLoading: false }));
      }
    }
    fetchAdminProfile();
  }, [isAuthenticated, session?.user?.email, status]);

  const menuItems = [
    { name: "Dashboard", icon: "dashboard", href: "/dashboard/admin" },
    { name: "User Management", icon: "group", href: "/dashboard/admin/users" },
    { name: "Properties", icon: "apartment", href: "/dashboard/admin/properties" },
    { name: "Verifications", icon: "verified_user", href: "/dashboard/admin/verify" },
    { name: "Bookings", icon: "book_online", href: "/dashboard/admin/bookings" },
    { name: "Financials", icon: "payments", href: "/dashboard/admin/financials" },
    { name: "Reports", icon: "assessment", href: "/dashboard/admin/reports" },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-800 overflow-hidden">
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* 🚀 সাইডবার */}
      <aside className={`fixed md:relative z-50 h-full bg-white border-r border-gray-100 flex flex-col justify-between py-5 shrink-0 transition-[width,transform] duration-300 ease-in-out overflow-hidden whitespace-nowrap group md:w-[84px] md:hover:w-[260px] md:translate-x-0 w-[260px] ${isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}>
        <div>
          <div className="mb-8 flex items-center h-10 px-3">
            <div className="hidden md:flex md:group-hover:hidden w-full justify-center">
              <span className="material-symbols-outlined text-[#ba0036] text-[32px]">admin_panel_settings</span>
            </div>
            <Link href={'/'} className="md:hidden md:group-hover:block transition-all pl-2">
              <h1 className="text-2xl font-extrabold text-[#ba0036] tracking-tight">DhakaStay</h1>
              <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-0.5">Admin Console</p>
            </Link>
          </div>

          <nav className="space-y-1.5 px-3">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href} onClick={() => setIsMobileOpen(false)} className={`flex items-center gap-4 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${isActive ? "bg-[#ba0036] text-white shadow-md shadow-rose-900/10" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}>
                  <span className="material-symbols-outlined text-[22px] min-w-[22px] flex justify-center">{item.icon}</span>
                  <span className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-3 border-t border-gray-100 pt-3">
          <Link href="/dashboard/admin/settings" className="flex items-center gap-4 px-3 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50">
            <span className="material-symbols-outlined text-[22px] min-w-[22px] flex justify-center">settings</span>
            <span className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">System Settings</span>
          </Link>
        </div>
      </aside>

      {/* 🚀 মেইন কন্টেন্ট এরিয়া */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 shrink-0 relative z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileOpen(true)} className="md:hidden p-2 text-gray-500 hover:text-[#ba0036] hover:bg-rose-50 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[28px]">menu</span>
            </button>
            <div className="relative w-full max-w-[200px] sm:max-w-xs lg:max-w-md hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
              <input type="text" placeholder="Global search..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-[#ba0036]/30 focus:ring-2 transition-all" />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button className="text-gray-500 hover:text-[#ba0036] relative p-2 transition-colors">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba0036] rounded-full ring-2 ring-white"></span>
            </button>
            
            {/* ডাইনামিক অ্যাডমিন প্রোফাইল হেডার */}
            <div className="flex items-center gap-3 border-l pl-3 sm:pl-5 border-gray-200 ml-1">
              {adminData.isLoading ? (
                <div className="animate-pulse flex items-center gap-3">
                  <div className="h-8 w-24 bg-gray-200 rounded hidden sm:block"></div>
                  <div className="w-9 h-9 rounded-full bg-gray-200"></div>
                </div>
              ) : (
                <>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-gray-900 truncate max-w-[150px]">{adminData.name}</p>
                    <p className="text-[10px] font-medium text-[#ba0036] uppercase tracking-wider">{adminData.role}</p>
                  </div>
                  {adminData.avatar ? (
                    <img src={adminData.avatar} alt="Admin" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-gray-100" />
                  ) : (
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#ba0036]/10 text-[#ba0036] rounded-full flex items-center justify-center font-bold text-lg ring-2 ring-[#ba0036]/20">
                      {adminData.name.charAt(0)}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#f8f9fa]">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  );
}