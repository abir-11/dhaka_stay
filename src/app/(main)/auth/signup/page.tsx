"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Store, ShieldCheck, Eye, EyeOff, Loader2, CheckCircle2, Upload } from "lucide-react";

export default function SignUpPage() {
  const [role, setRole] = useState<"CUSTOMER" | "VENDOR" | "ADMIN">("CUSTOMER");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("idle"); // 'idle' | 'loading' | 'success'
  const [apiError, setApiError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // ইমেজের প্রিভিউ দেখানোর জন্য
  const router = useRouter();

  // React Hook Form ইনিশিয়ালাইজেশন
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      imageFile: null, // রিঅ্যাক্ট হুক ফর্মে ফাইল ইনপুট ফিল্ড
      terms: false,
    },
  });

  // ফাইল সিলেক্ট করলে লাইভ প্রিভিউ দেখানোর লজিক
  const watchImage = watch("imageFile");
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const onSubmit = async (formData: any) => {
    setLoadingStatus("loading");
    setApiError(null);

    // 🚀 ফাইলসহ ডাটা পাঠানোর জন্য Multipart FormData তৈরি
    const submitData = new FormData();
    submitData.append("firstName", formData.firstName);
    submitData.append("lastName", formData.lastName);
    submitData.append("email", formData.email);
    submitData.append("passwordHash", formData.password); // জাভা ব্যাকএন্ডের DTO ফিল্ড নাম
    submitData.append("phone", formData.phone);
    submitData.append("role", role.toUpperCase());
    
    // ইউজার ইমেজ সিলেক্ট করলে ফাইলটি যুক্ত হবে
    if (formData.imageFile && formData.imageFile[0]) {
      submitData.append("imageFile", formData.imageFile[0]); 
    }

    try {
      // স্প্রিং বুট API কল (Multipart রিকোয়েস্টে Content-Type হেডার ম্যানুয়ালি দেওয়া যাবে না, ব্রাউজার নিজে সেট করবে)
      const res = await fetch("http://localhost:8080/user/save", {
        method: "POST",
        body: submitData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Registration failed. Please try again.");
      }

      await res.json();
      setLoadingStatus("success");

      // অ্যাকাউন্ট সফলভাবে তৈরি হওয়ার পর NextAuth দিয়ে সেশন তৈরি করা
      const loginResult = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      setTimeout(() => {
        if (!loginResult?.error) {
          if (role === "ADMIN") router.push("/dashboard/admin");
          else if (role === "VENDOR") router.push("/dashboard/vendor");
          else router.push("/dashboard/customer");

          router.refresh();
        } else {
          router.push("/auth/login");
        }
      }, 1500);

    } catch (error: any) {
      setApiError(error.message || "Could not connect to server. Ensure Backend is running.");
      setLoadingStatus("idle");
    }
  };

  const handleSocialSignUp = async (provider: "google") => {
    await signIn(provider, { callbackUrl: `/dashboard/${role.toLowerCase()}` });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="bg-white rounded-3xl shadow-xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row min-h-[700px]">
        
        {/* Left Side: Image Banner */}
        <section className="hidden md:flex flex-col relative w-1/2 p-8">
          <div className="absolute inset-0 z-0">
            <img
              alt="Luxury Modern Dhaka Stay Living Interior"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          </div>
          <div className="relative z-10 mt-auto mb-8 max-w-md">
            <h1 className="text-4xl font-bold text-white mb-3">Welcome to DhakaStay</h1>
            <p className="text-lg text-white/90">Your gateway to premium urban living. Experience stays that feel like home.</p>
          </div>
        </section>

        {/* Right Side: Registration Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-white">
          <div className="w-full max-w-sm mx-auto my-auto space-y-4">
            
            {/* Logo & Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#A30031] font-bold text-xl">
                <span className="w-3 h-5 bg-[#A30031] rounded-sm transform -skew-x-12 inline-block"></span>
                DhakaStay
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Create Account</h2>
              <p className="text-gray-500 text-xs">Choose your preferred role and fill in your info.</p>
            </div>

            {/* Role Selection Tabs */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Register as</label>
              <div className="grid grid-cols-3 gap-2 bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setRole("CUSTOMER")}
                  className={`flex flex-col items-center justify-center py-2 text-xs font-medium rounded-lg transition-all gap-1 cursor-pointer ${
                    role === "CUSTOMER" ? "bg-white text-[#A30031] shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <User size={16} />
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => setRole("VENDOR")}
                  className={`flex flex-col items-center justify-center py-2 text-xs font-medium rounded-lg transition-all gap-1 cursor-pointer ${
                    role === "VENDOR" ? "bg-white text-[#A30031] shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Store size={16} />
                  Vendor
                </button>
                <button
                  type="button"
                  onClick={() => setRole("ADMIN")}
                  className={`flex flex-col items-center justify-center py-2 text-xs font-medium rounded-lg transition-all gap-1 cursor-pointer ${
                    role === "ADMIN" ? "bg-white text-[#A30031] shadow-sm" : "text-gray-500 hover:text-gray-900"
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
                onClick={() => handleSocialSignUp("google")}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
                Sign up with Google
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex py-0.5 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-3 text-gray-400 text-[10px] uppercase tracking-wider font-medium">Or email sign up</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Error Message Alert */}
            {apiError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-medium">
                {apiError}
              </div>
            )}

            {/* Input Form */}
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              
           

              {/* Name Grid Layout */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">First Name</label>
                  <input 
                    type="text" 
                    placeholder="Arafat" 
                    {...register("firstName", { required: "Required" })}
                    className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A30031]/20 focus:border-[#A30031] ${
                      errors.firstName ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Abir" 
                    {...register("lastName", { required: "Required" })}
                    className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A30031]/20 focus:border-[#A30031] ${
                      errors.lastName ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  {...register("email", { 
                    required: "Email is required", 
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" } 
                  })}
                  className={`w-full border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A30031]/20 focus:border-[#A30031] ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-[10px] font-medium">{errors.email.message}</p>}
              </div>

              {/* Phone Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Phone Number</label>
                <input 
                  type="text" 
                  placeholder="01712345678" 
                  {...register("phone", { required: "Phone number is required" })}
                  className={`w-full border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A30031]/20 focus:border-[#A30031] ${
                    errors.phone ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-[10px] font-medium">{errors.phone.message}</p>}
              </div>
                 {/* 📸 Profile Image Input Field Component */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Profile Picture</label>
                <div className="flex items-center gap-4 bg-gray-50 p-2.5 rounded-xl border border-dashed border-gray-300">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-200 flex-shrink-0">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="text-gray-400" size={20} />
                    )}
                  </div>
                  <div className="flex-grow">
                    <label htmlFor="imageFile" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 shadow-sm cursor-pointer transition-colors">
                      <Upload size={14} />
                      Choose Image
                    </label>
                    <input 
                      type="file" 
                      id="imageFile"
                      accept="image/*"
                      {...register("imageFile", { 
                        required: "Profile image is required",
                        onChange: handleImageChange 
                      })}
                      className="hidden"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>
                {errors.imageFile && <p className="text-red-500 text-[10px] font-medium">{errors.imageFile.message as string}</p>}
              </div>

              {/* Password Input */}
              <div className="space-y-1 relative">
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
                  {...register("password", { required: "Required", minLength: { value: 6, message: "Min 6 chars" } })}
                  className={`w-full border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A30031]/20 focus:border-[#A30031] ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.password && <p className="text-red-500 text-[10px] font-medium">{errors.password.message}</p>}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input 
                  type="checkbox" 
                  id="terms"
                  {...register("terms", { required: "You must accept terms" })}
                  className="rounded mt-0.5 text-[#A30031] focus:ring-[#A30031] accent-[#A30031] cursor-pointer" 
                />
                <label htmlFor="terms" className="text-xs text-gray-500 cursor-pointer select-none">
                  I agree to the <Link href="#" className="text-[#A30031] font-semibold hover:underline">Terms</Link> and <Link href="#" className="text-[#A30031] font-semibold hover:underline">Privacy</Link>.
                </label>
              </div>
              {errors.terms && <p className="text-red-500 text-[10px] font-medium">{errors.terms.message}</p>}

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loadingStatus === "loading"}
                className={`w-full text-white font-semibold py-2.5 rounded-xl text-sm flex items-center justify-center transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${
                  loadingStatus === "success" ? "bg-green-600" : "bg-[#E61E4D] hover:bg-[#D11A42]"
                }`}
              >
                {loadingStatus === "idle" && `Register as ${role.toLowerCase()}`}
                {loadingStatus === "loading" && (
                  <span className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" /> Creating Account...
                  </span>
                )}
                {loadingStatus === "success" && (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} /> Welcome to DhakaStay!
                  </span>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-600 pt-1">
              Already have an account? <Link href="/auth/login" className="text-[#A30031] font-semibold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}