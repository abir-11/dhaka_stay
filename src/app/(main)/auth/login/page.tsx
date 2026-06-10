"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // React Hook Form ইনিশিয়ালাইজেশন
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ফর্ম সাবমিট হ্যান্ডলার (Credentials Sign In)
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false, // আমরা ক্লায়েন্ট সাইডেই রোল চেক করে ম্যানুয়ালি রিডাইরেক্ট করব
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setAuthError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }

      // লগইন সফল হলে সেশন থেকে রোল চেক করার জন্য একটি ফেচ কল
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      if (session?.user?.role) {
        const role = session.user.role;
        // রোল অনুযায়ী ড্যাশবোর্ডে রিডাইরেক্ট লজিক
        if (role === "admin") {
          router.push("/dashboard/admin");
        } else if (role === "vendor") {
          router.push("/dashboard/vendor");
        } else {
          router.push("/dashboard/customer");
        }
        router.refresh();
      } else {
        setAuthError("Failed to fetch user role.");
        setIsLoading(false);
      }
    } catch (error) {
      setAuthError("Something went wrong. Please try again later.");
      setIsLoading(false);
    }
  };

  // গুগল সাইন-ইন হ্যান্ডলার (নতুন ইউজার হলে ব্যাকএন্ড লজিক অনুযায়ী অটো-রেজিস্টার হবে)
  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/dashboard" }); 
  };

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

            {/* Social Logins - Only Google Kept */}
            <div>
              <button 
                type="button" 
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
                Sign in with Google
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-wider font-medium">Or sign in with email</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Error Message Alert */}
            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-medium">
                {authError}
              </div>
            )}

            {/* Input Form */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  {...register("email", { 
                    required: "Email is required", 
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#A30031]/20 focus:border-[#A30031] transition-all ${
                    errors.email ? "border-red-500 ring-2 ring-red-500/10" : "border-gray-200"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-[11px] font-medium">{errors.email.message}</p>
                )}
              </div>

              {/* Password Input */}
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
                  {...register("password", { required: "Password is required" })}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#A30031]/20 focus:border-[#A30031] transition-all ${
                    errors.password ? "border-red-500 ring-2 ring-red-500/10" : "border-gray-200"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-[11px] font-medium">{errors.password.message}</p>
                )}
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
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#E61E4D] hover:bg-[#D11A42] text-white font-semibold py-3 rounded-xl transition-colors shadow-md shadow-red-500/10 text-sm flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
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