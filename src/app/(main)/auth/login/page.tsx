"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="bg-white rounded-3xl shadow-xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Side: Image Banner */}
      <section className="hidden md:flex flex-col relative w-1/2 p-8">
  <div className="absolute inset-0 z-0">
    <img
      alt="Dhaka Skyline at Sunset"
      className="w-full h-full object-cover"
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCprJgXEBiqbwH0rFI98cZK5wkaX7MepRJGaKKSH2WdblXtgr2n9OzXTKV7uHu40N1wy6wqJIVuMpNr_fVdnVmpe1Z3KuDA4U9O0ZuwK43WmQGDpEDnv8GxdcL99AzR6urjaHgzJannZCYNd0LQqIPbDuOK_0Ib2l0zF6plCI4xLV1NF_aFcwSUUtTv7CAZEN9kquVWO9uuAFu27SbCcDESmw6W2UF-xM6gkEpsAjac93SB_g-WNXpqVJpEB21zG8JgNkpoWBuiif4"
    />

    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
  </div>

  <div className="relative z-10 mt-auto mb-8 max-w-md">
    <h1 className="text-4xl font-bold text-white mb-3">
      Welcome Back to DhakaStay
    </h1>

    <p className="text-lg text-white/90">
      Your gateway to premium urban living. Experience the heart of the city
      with stays that feel like home.
    </p>
  </div>

  <div className="relative z-10 flex items-center gap-2">
    <div className="w-12 h-1 bg-white rounded-full"></div>
    <div className="w-2 h-1 bg-white/40 rounded-full"></div>
    <div className="w-2 h-1 bg-white/40 rounded-full"></div>
  </div>
</section>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-white">
          <div className="w-full max-w-sm mx-auto my-auto space-y-6">
            {/* Logo & Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[#A30031] font-bold text-xl">
                <span className="w-3 h-5 bg-[#A30031] rounded-sm transform -skew-x-12 inline-block"></span>
                DhakaStay
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Sign In</h2>
              <p className="text-gray-500 text-sm">Welcome back! Please enter your details.</p>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-4 h-4" alt="Facebook" />
                Facebook
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-wider font-medium">Or sign in with email</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Input Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#A30031]/20 focus:border-[#A30031] transition-all"
                />
              </div>

              <div className="space-y-1.5 relative">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-gray-700">Password</label>
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#A30031]/20 focus:border-[#A30031] transition-all"
                />
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-xs font-medium">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                  <input type="checkbox" className="rounded text-[#A30031] focus:ring-[#A30031] accent-[#A30031]" />
                  Remember me
                </label>
                <Link href="#" className="text-[#A30031] hover:underline">Forgot Password?</Link>
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full bg-[#E61E4D] hover:bg-[#D11A42] text-white font-semibold py-3 rounded-xl transition-colors shadow-md shadow-red-500/10 text-sm">
                Sign In
              </button>
            </form>

            <p className="text-center text-sm text-gray-600">
              Don't have an account? <Link href="/auth/signup" className="text-[#A30031] font-semibold hover:underline">Create an account</Link>
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex justify-center gap-4 text-xs text-gray-400 pt-6">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <Link href="#" className="hover:underline">Terms of Service</Link>
          </div>
        </div>

      </div>
    </div>
  );
}