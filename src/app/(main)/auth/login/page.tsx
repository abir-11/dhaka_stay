"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Store, ShieldCheck } from "lucide-react"; 

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"CUSTOMER" | "VENDOR" | "ADMIN">("CUSTOMER");
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
      // ধাপ ১: জাভা ব্যাকএন্ড থেকে ইমেইল দিয়ে ইউজার খুঁজে বের করা
      const response = await fetch(`http://localhost:8080/user/email?email=${encodeURIComponent(data.email)}`);
      
      if (!response.ok) {
        setAuthError("User not found with this email.");
        setIsLoading(false);
        return;
      }

      const dbUser = await response.json();

      // ধাপ ২: ইমেইল এবং পাসওয়ার্ড ভ্যালিডেশন করা
      if (!dbUser || dbUser.passwordHash !== data.password) {
        setAuthError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }

      // 🚨 ধাপ ৩: রোল ম্যাচিং সিকিউরিটি চেক (ম্যাচ না করলে এখানেই ব্লক করে দেবে)
      const backendRole = dbUser.role ? dbUser.role.toUpperCase() : "CUSTOMER";
      
      if (backendRole !== selectedRole) {
        setAuthError(`Access Denied! You are registered as a ${backendRole.toLowerCase()}, but trying to log in as a ${selectedRole.toLowerCase()}.`);
        setIsLoading(false);
        return; // সেশন তৈরি না করেই ফাংশন থেকে বের হয়ে যাবে
      }

      // 🔐 ধাপ ৪: রোল সম্পূর্ণ ম্যাচ করলেই কেবল NextAuth সেশন চালু হবে, তার আগে না!
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setAuthError("Authentication failed. Connection issue.");
        setIsLoading(false);
        return;
      }

      // ধাপ ৫: সফলভাবে লগইন হওয়ার পর নির্দিষ্ট ড্যাশবোর্ড পেজে পাঠানো
      if (backendRole === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (backendRole === "VENDOR") {
        router.push("/dashboard/vendor");
      } else {
        router.push("/dashboard/customer");
      }
      
      router.refresh();

    } catch (error) {
      setAuthError("Could not connect to Java server. Please ensure backend is running.");
      setIsLoading(false);
    }
  };

  // গুগল সাইন-ইন হ্যান্ডলার (গুগল সাইন-ইন ডিফল্টভাবে কাস্টমার ড্যাশবোর্ডে যাবে)
  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/dashboard/customer" }); 
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="bg-white rounded-3xl shadow-xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row min-h-[650px]">
        
        {/* Left Side: Image Banner */}
        <section className="hidden md:flex flex-col relative w-1/2 p-8">
          <div className="absolute inset-0 z-0">
            <img
              alt="Dhaka Skyline"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=600&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          </div>
          <div className="relative z-10 mt-auto mb-8 max-w-md">
            <h1 className="text-4xl font-bold text-white mb-3">Welcome Back to DhakaStay</h1>
            <p className="text-lg text-white/90">Your gateway to premium urban living.</p>
          </div>
        </section>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-white">
          <div className="w-full max-w-sm mx-auto my-auto space-y-5">
            
            {/* Logo & Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#A30031] font-bold text-xl">
                <span className="w-3 h-5 bg-[#A30031] rounded-sm transform -skew-x-12 inline-block"></span>
                DhakaStay
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Sign In</h2>
              <p className="text-gray-500 text-xs">Choose your correct role to log in.</p>
            </div>

            {/* Role Selection Tabs */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Select Login Role</label>
              <div className="grid grid-cols-3 gap-2 bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setSelectedRole("CUSTOMER")}
                  className={`flex flex-col items-center justify-center py-2 text-xs font-medium rounded-lg transition-all gap-1 cursor-pointer ${
                    selectedRole === "CUSTOMER" ? "bg-white text-[#A30031] shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <User size={16} />
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("VENDOR")}
                  className={`flex flex-col items-center justify-center py-2 text-xs font-medium rounded-lg transition-all gap-1 cursor-pointer ${
                    selectedRole === "VENDOR" ? "bg-white text-[#A30031] shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Store size={16} />
                  Vendor
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("ADMIN")}
                  className={`flex flex-col items-center justify-center py-2 text-xs font-medium rounded-lg transition-all gap-1 cursor-pointer ${
                    selectedRole === "ADMIN" ? "bg-white text-[#A30031] shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <ShieldCheck size={16} />
                  Admin
                </button>
              </div>
            </div>

            {/* Social Logins */}
            <div>
              <button 
                type="button" 
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
                Sign in with Google
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-3 text-gray-400 text-[10px] uppercase tracking-wider font-medium">Or email sign in</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Error Message Alert */}
            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-medium">
                {authError}
              </div>
            )}

            {/* Input Form */}
            <form className="space-y-3.5" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  {...register("email", { required: "Email is required" })}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A30031]/20 focus:border-[#A30031] ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  }`}
                />
              </div>

              {/* Password Input */}
              <div className="space-y-1 relative">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-gray-700">Password</label>
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs font-medium text-gray-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  {...register("password", { required: "Password is required" })}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A30031]/20 focus:border-[#A30031] ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  }`}
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#E61E4D] hover:bg-[#D11A42] text-white font-semibold py-2.5 rounded-xl text-sm flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? "Validating Role..." : `Sign In as ${selectedRole.toLowerCase()}`}
              </button>
            </form>

            <p className="text-center text-xs text-gray-600">
              Don't have an account? <Link href="/auth/signup" className="text-[#A30031] font-semibold hover:underline">Create an account</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}