"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { Tag, ShieldCheck, Award, Sparkles, Menu, UserCircle, LayoutDashboard, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

// স্পষ্ট করে টাইপ ইন্টারফেস ডিফাইন করে দেওয়া হলো যেন কম্পাইলার কোনো ভুল না ধরে
// BackendUser shape (for reference): { name: string, pictureUrl: string | null }

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";

  // রোল লোয়ারকেস করার সময় যেন ক্রাশ না করে সেজন্য নিরাপদ চেক
  const userRole = session?.user?.role ? String(session.user.role).toLowerCase() : "customer";
  const dashboardHref = `/dashboard/${userRole}`;

  useEffect(() => {
    async function fetchUserProfile() {
      if (isAuthenticated && session?.user?.email) {
        try {
          const response = await fetch(`http://localhost:8080/user/email?email=${encodeURIComponent(session.user.email)}`);
          if (response.ok) {
            const dbUser = await response.json();

            // জাভা ব্যাকএন্ডের নাল ভ্যালু হ্যান্ডেল করার নিরাপদ উপায়
            const firstName = dbUser?.firstName ? String(dbUser.firstName).trim() : "";
            const lastName = dbUser?.lastName ? String(dbUser.lastName).trim() : "";

            const fullName = firstName && lastName
              ? `${firstName} ${lastName}`
              : firstName || session?.user?.name || "User";

            setUserData({
              name: fullName,
              pictureUrl: dbUser?.profilePictureUrl ? String(dbUser.profilePictureUrl) : null,
            });
          }
        } catch (error) {
          console.error("Failed to fetch user profile from Java backend:", error);
        }
      }
    }

    fetchUserProfile();
  }, [isAuthenticated, session?.user?.email]);

  const navItems = [
    { name: "Homes", href: "/" },
    { name: "Experiences", href: "/experiences" },
    { name: "Online Experiences", href: "/online-experiences" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-sm font-sans">

      {/* --- ANNOUNCEMENT BAR --- */}
      <div className="w-full bg-[#A30031] text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider py-2.5 overflow-hidden">
        <Marquee pauseOnHover={true} speed={50} gradient={false}>
          <div className="flex items-center gap-12 md:gap-16 pr-12 md:pr-16">
            <div className="flex items-center gap-1.5">
              <Sparkles size={14} />
              <span>Best Apartments In Dhaka</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Tag size={14} />
              <span>Up To 30% Discount On Monthly Stays</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} />
              <span>Verified Hosts Only</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award size={14} />
              <span>Luxury Penthouses Available</span>
            </div>
          </div>
        </Marquee>
      </div>

      {/* --- MAIN NAVBAR --- */}
      <nav className="w-full border-b border-gray-100 bg-white">
        <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Left: Logo & Nav Links */}
          <div className="flex items-center gap-8 lg:gap-12">
            <Link href="/" className="text-[#A30031] text-2xl font-bold tracking-tight shrink-0">
              DhakaStay
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`pb-1 transition-all ${pathname === item.href
                    ? "text-gray-900 border-b-2 border-[#A30031] font-semibold"
                    : "text-gray-500 hover:text-gray-900"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Become a Host & User Menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/become-a-host"
              className={`hidden sm:inline-block text-sm font-semibold px-4 py-2.5 rounded-full transition-colors ${pathname === "/become-a-host"
                ? "bg-[#A30031] text-white hover:bg-[#8a0029]"
                : "text-gray-800 hover:bg-gray-50"
                }`}
            >
              Become a host
            </Link>

            {/* Hover System Container */}
            <div
              className="relative py-2"
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <button
                className="flex items-center gap-3 border border-gray-200 rounded-full p-2 pl-3 hover:shadow-md transition-shadow bg-white cursor-pointer"
              >
                <Menu size={18} className="text-gray-600" />
                {isAuthenticated && (userData?.pictureUrl || session?.user?.profilePictureUrl) ? (
                  <img
                    src={
                      userData?.pictureUrl?.startsWith("http")
                        ? userData.pictureUrl
                        : userData?.pictureUrl
                          ? `http://localhost:8080${userData.pictureUrl}`
                          : session?.user?.profilePictureUrl || ""
                    }
                    alt="Profile"
                    className="w-7 h-7 rounded-full object-cover border border-gray-100"
                  />
                ) : (
                  <UserCircle size={26} className="text-gray-500" />
                )}
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full w-60 bg-white border border-gray-100 rounded-xl shadow-xl py-2 text-sm text-gray-700 animate-in fade-in slide-in-from-top-2 duration-150">

                  {isAuthenticated ? (
                    <>
                      <div className="font-semibold text-gray-900 px-4 py-2 border-b border-gray-100 truncate">
                        Hi, {userData?.name || session?.user?.name || "User"}
                      </div>

                      <Link
                        href={dashboardHref}
                        className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 font-medium text-gray-900"
                      >
                        <LayoutDashboard size={16} className="text-gray-500" />
                        Dashboard
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="font-semibold text-gray-900 px-4 py-2 border-b border-gray-100">
                        Welcome to DhakaStay
                      </div>
                      <Link
                        href="/auth/login"
                        className="block px-4 py-2.5 hover:bg-gray-50 font-medium text-gray-900"
                      >
                        Sign up / Log in
                      </Link>
                    </>
                  )}

                  <hr className="border-gray-100 my-1" />

                  <Link href="/become-a-host" className="block sm:hidden px-4 py-2.5 hover:bg-gray-50">Become a host</Link>
                  <Link href="/homes" className="block md:hidden px-4 py-2.5 hover:bg-gray-50">Homes</Link>
                  <Link href="/help" className="block px-4 py-2.5 hover:bg-gray-50">Help Center</Link>

                  {isAuthenticated && (
                    <>
                      <hr className="border-gray-100 my-1" />
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-red-600 font-medium hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <LogOut size={16} />
                        Log Out
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </nav>
    </header>
  );
}