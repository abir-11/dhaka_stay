"use client";

import { useState } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee"; // Marquee ইম্পোর্ট করা হলো
import { Tag, ShieldCheck, Award, Sparkles, Menu, UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Homes", href: "/" },
    { name: "Experiences", href: "/experiences" },
    { name: "Online Experiences", href: "/online-experiences" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-sm font-sans">

      {/* --- ANNOUNCEMENT BAR (USING REACT FAST MARQUEE) --- */}
      <div className="w-full bg-[#A30031] text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider py-2.5 overflow-hidden">
        {/* pauseOnHover এবং speed প্রপস দিয়ে খুব সহজেই কন্ট্রোল করা যায় */}
        <Marquee pauseOnHover={true} speed={50} gradient={false}>
          {/* এখানে শুধু একবার কন্টেন্ট লিখলেই হবে, লাইব্রেরি নিজে থেকেই লুপ বানিয়ে দেবে */}
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

            <div className="flex items-center gap-6">
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
          <div className="flex items-center gap-4 relative">
            <Link
              href="/become-a-host"
              className={`hidden sm:inline-block text-sm font-semibold px-4 py-2.5 rounded-full transition-colors ${pathname === "/become-a-host"
                  ? "bg-[#A30031] text-white hover:bg-[#8a0029]"
                  : "text-gray-800 hover:bg-gray-50"
                }`}
            >
              Become a host
            </Link>

            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 border border-gray-200 rounded-full p-2 pl-3 hover:shadow-md transition-shadow bg-white"
            >
              <Menu size={18} className="text-gray-600" />
              <UserCircle size={26} className="text-gray-500" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-14 w-60 bg-white border border-gray-100 rounded-xl shadow-xl py-2 text-sm text-gray-700 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="font-semibold text-gray-900 px-4 py-2 border-b border-gray-100">
                  Welcome to DhakaStay
                </div>
                <Link href="/auth/login" className="block px-4 py-2.5 hover:bg-gray-50 font-medium text-gray-900">Sign up / Log in</Link>
                <hr className="border-gray-100 my-1" />
                <Link href="/become-a-host" className="block sm:hidden px-4 py-2.5 hover:bg-gray-50">Become a host</Link>
                <Link href="/homes" className="block md:hidden px-4 py-2.5 hover:bg-gray-50">Homes</Link>
                <Link href="/help" className="block px-4 py-2.5 hover:bg-gray-50">Help Center</Link>
              </div>
            )}
          </div>

        </div>
      </nav>
    </header>
  );
}