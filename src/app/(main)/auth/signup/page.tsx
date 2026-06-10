"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Home, Shield, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";

export default function SignUpPage() {
  const [role, setRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("idle"); // 'idle' | 'loading' | 'success'
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  // React Hook Form ইনিশিয়ালাইজেশন
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  // ফর্ম সাবমিট হ্যান্ডলার (Registration Logic)
  const onSubmit = async (formData: any) => {
    setLoadingStatus("loading");
    setApiError(null);

    // ফাইনাল ডাটা অবজেক্ট যেখানে সিলেক্টেড রোল পাস করা হচ্ছে
    const payload = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: role, // 'customer' | 'vendor' | 'admin'
    };

    try {
      // =========================================================
      // TODO: আপনার জাভা ব্যাকএন্ড রেজিস্ট্রেশন API এখানে কল করুন
      // =========================================================
      /*
      const res = await fetch(`${process.env.NEXT_PUBLIC_JAVA_BACKEND_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed");
      }
      */

      // ডামি সাকসেস মাইক্রো-ইন্টারঅ্যাকশন (জাভা এপিআই রেডি হলে উপরের ব্লকটি আনকমেন্ট করবেন)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setLoadingStatus("success");

      // অ্যাকাউন্ট তৈরি হওয়ার পর স্বয়ংক্রিয়ভাবে সেশন তৈরি করে ড্যাশবোর্ডে পাঠানোর লজিক
      const loginResult = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      setTimeout(() => {
        if (!loginResult?.error) {
          // রোল অনুযায়ী নির্দিষ্ট ড্যাশবোর্ডে রিডাইরেক্ট
          if (role === "admin") router.push("/dashboard/admin");
          else if (role === "vendor") router.push("/dashboard/vendor");
          else router.push("/dashboard/customer");

          router.refresh();
        } else {
          router.push("/auth/login"); // কোনো কারণে অটো-লগইন ফেইল করলে লগইন পেজে পাঠান
        }
      }, 1500);

    } catch (error: any) {
      setApiError(error.message || "Something went wrong. Please try again.");
      setLoadingStatus("idle");
    }
  };

  // সোশ্যাল সাইন-ইন হ্যান্ডলার (Google)
  const handleSocialSignUp = async (provider: "google") => {
    // এখানে আপনার বিজনেস লজিক অনুযায়ী রোল কোয়েরি প্যারামিটার হিসেবে পাঠানো যেতে পারে
    await signIn(provider, { callbackUrl: `/dashboard/${role}` });
  };

  return (
    <div>
      <div className="min-h-screen max-w-10/12 mx-auto flex flex-col justify-between bg-[#f9f9f9] font-sans selection:bg-[#ffdada] selection:text-[#40000d]">

        {/* --- Main Container --- */}
        <main className="flex-grow flex flex-col md:flex-row">

          {/* Left Side: Hero Image & Branding */}
          <section className="relative w-full md:w-1/2 lg:w-5/12 h-80 md:h-auto overflow-hidden">
            <img
              alt="Luxury Modern Interior"
              className="absolute inset-0 w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuANE_mDYrPmqNVGjvgTvzvb7-fT4SsziP7Flw8Kcv8z7JVsxHR1ZmOySPX3DYVWIjmC__b1bASCEkinmSwjLbvVi2bcC-ER-G6eBu5j2C0ZnFSsIxXTCGuqdSbsW1feFWP4-BslgwmsygclN54Cq73FroWVF3WHToaIj8w23UZImT9xqVbvC5f711Qz7Exe769KEAj9eAnvBNNDdWUODre2Up6JFg5i-_pv3yzajXC1j2pWu8D1k4_jdU23K2FCyfdodofE2wGsg8k"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-16">
              <div className="mb-3">
                <span className="text-xl md:text-2xl text-white font-bold tracking-tight">DhakaStay</span>
              </div>
              <h1 className="text-3xl md:text-4xl text-white font-bold mb-3 tracking-tight">Join DhakaStay</h1>
              <p className="text-sm md:text-base text-white/90 max-w-sm font-light leading-relaxed">
                Discover a new standard of hospitality and experience seamless stays tailored to your lifestyle.
              </p>
            </div>
          </section>

          {/* Right Side: Registration Flow */}
          <section className="w-full md:w-1/2 lg:w-7/12 flex items-center justify-center p-6 md:p-16 bg-white">
            <div className="w-full max-w-xl">

              <header className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-1.5 tracking-tight">Create your account</h2>
                <p className="text-sm text-gray-500">Start your journey with us today.</p>
              </header>

              {/* Social Logins - Only Google Kept */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => handleSocialSignUp("google")}
                  className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
                  Sign up with Google
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex py-2 items-center mb-4">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-wider font-medium">Or sign up with email</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Backend API Error Display */}
              {apiError && (
                <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-medium">
                  {apiError}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                {/* Role Selection Grid */}
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-3">Choose your role</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    {/* Guest (Customer) Card */}
                    <button
                      type="button"
                      onClick={() => setRole("customer")}
                      className={`flex flex-col items-center justify-center p-5 border-2 rounded-2xl transition-all text-center group ${role === "customer"
                        ? "border-[#ba0036] bg-[#fffbff] shadow-md shadow-black/5"
                        : "border-gray-200 hover:border-[#ba0036]/50 bg-white"
                        }`}
                    >
                      <User size={28} className={`mb-2 transition-colors ${role === "customer" ? "text-[#ba0036]" : "text-gray-500"}`} />
                      <span className="text-sm font-bold text-gray-900">Guest</span>
                      <span className="text-[11px] text-gray-400 mt-0.5">Find your next stay</span>
                    </button>

                    {/* Vendor (Host) Card */}
                    <button
                      type="button"
                      onClick={() => setRole("vendor")}
                      className={`flex flex-col items-center justify-center p-5 border-2 rounded-2xl transition-all text-center group ${role === "vendor"
                        ? "border-[#ba0036] bg-[#fffbff] shadow-md shadow-black/5"
                        : "border-gray-200 hover:border-[#ba0036]/50 bg-white"
                        }`}
                    >
                      <Home size={28} className={`mb-2 transition-colors ${role === "vendor" ? "text-[#ba0036]" : "text-gray-500"}`} />
                      <span className="text-sm font-bold text-gray-900">Vendor</span>
                      <span className="text-[11px] text-gray-400 mt-0.5">Host your property</span>
                    </button>

                    {/* Admin Card */}
                    <button
                      type="button"
                      onClick={() => setRole("admin")}
                      className={`flex flex-col items-center justify-center p-5 border-2 rounded-2xl transition-all text-center group ${role === "admin"
                        ? "border-[#ba0036] bg-[#fffbff] shadow-md shadow-black/5"
                        : "border-gray-200 hover:border-[#ba0036]/50 bg-white"
                        }`}
                    >
                      <Shield size={28} className={`mb-2 transition-colors ${role === "admin" ? "text-[#ba0036]" : "text-gray-500"}`} />
                      <span className="text-sm font-bold text-gray-900">Admin</span>
                      <span className="text-[11px] text-gray-400 mt-0.5">Internal access</span>
                    </button>

                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-800" htmlFor="full_name">Full Name</label>
                    <input
                      id="full_name"
                      type="text"
                      placeholder="Enter your full name"
                      {...register("fullName", { required: "Full Name is required" })}
                      className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[#ba0036]/20 focus:border-[#ba0036] transition-all placeholder:text-gray-400 text-sm ${errors.fullName ? "border-red-500 ring-2 ring-red-500/10" : "border-gray-200"
                        }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-[11px] font-medium">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-800" htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[#ba0036]/20 focus:border-[#ba0036] transition-all placeholder:text-gray-400 text-sm ${errors.email ? "border-red-500 ring-2 ring-red-500/10" : "border-gray-200"
                        }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-[11px] font-medium">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Password Input with Show/Hide toggle */}
                  <div className="flex flex-col gap-1.5 relative">
                    <label className="text-xs font-bold text-gray-800" htmlFor="password">Password</label>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                      })}
                      className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[#ba0036]/20 focus:border-[#ba0036] transition-all placeholder:text-gray-400 text-sm pr-12 ${errors.password ? "border-red-500 ring-2 ring-red-500/10" : "border-gray-200"
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-[35px] text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.password && (
                      <p className="text-red-500 text-[11px] font-medium">{errors.password.message}</p>
                    )}
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    id="terms"
                    type="checkbox"
                    {...register("terms", { required: "You must accept the terms and conditions" })}
                    className="mt-0.5 w-4 h-4 text-[#ba0036] rounded border-gray-300 focus:ring-[#ba0036] cursor-pointer accent-[#ff385c]"
                  />
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 leading-tight cursor-pointer" htmlFor="terms">
                      I agree to the <Link className="text-[#ba0036] font-semibold hover:underline" href="#">Terms & Conditions</Link> and <Link className="text-[#ba0036] font-semibold hover:underline" href="#">Privacy Policy</Link>.
                    </label>
                    {errors.terms && (
                      <p className="text-red-500 text-[11px] font-medium mt-1">{errors.terms.message}</p>
                    )}
                  </div>
                </div>

                {/* CTA Submit Button */}
                <button
                  disabled={loadingStatus === "loading"}
                  className={`w-full transition-all text-white font-semibold text-sm py-3.5 rounded-xl shadow-md active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${loadingStatus === "success"
                    ? "bg-green-600"
                    : "bg-[#ff385c] hover:bg-[#e31c47]"
                    }`}
                  type="submit"
                >
                  {loadingStatus === "idle" && (
                    <>
                      Create Account <span className="text-base font-light">→</span>
                    </>
                  )}
                  {loadingStatus === "loading" && (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing...
                    </>
                  )}
                  {loadingStatus === "success" && (
                    <>
                      <CheckCircle2 size={16} />
                      Welcome to DhakaStay!
                    </>
                  )}
                </button>

                {/* Footer Sign-In trigger */}
                <div className="text-center pt-2">
                  <p className="text-xs text-gray-500">
                    Already have an account?{" "}
                    <Link className="text-[#ba0036] font-bold hover:underline" href="/auth/login">
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>

            </div>
          </section>
        </main>

      </div>
      {/* --- Footer Base --- */}
      <footer className="bg-[#f3f3f3] border-t border-gray-200 py-4 px-6 md:px-12">
        <div className="max-w-11/12 mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[11px] text-gray-500">© 2026 DhakaStay, Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link className="text-[11px] text-gray-500 hover:underline hover:text-gray-800" href="#">Privacy</Link>
            <Link className="text-[11px] text-gray-500 hover:underline hover:text-gray-800" href="#">Terms</Link>
            <Link className="text-[11px] text-gray-500 hover:underline hover:text-gray-800" href="#">Sitemap</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}