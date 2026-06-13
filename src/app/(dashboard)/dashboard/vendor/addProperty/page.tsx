"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export default function AddPropertyPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [step, setStep] = useState(1);
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function getVendorId() {
      if (status === "authenticated" && session?.user?.email) {
        try {
          console.log("🔍 Fetching info for email:", session.user.email);
          
          const res = await fetch(`http://localhost:8080/user/email?email=${encodeURIComponent(session.user.email)}`);
          
          if (res.ok) {
            const textData = await res.text();
            console.log("📦 Raw Response from Backend:", textData);
            
            if (textData && textData.trim() !== "") {
              const user = JSON.parse(textData);
              
              const detectedId = user.id || user.vendorId || user.userId;
              
              if (detectedId) {
                setVendorId(detectedId);
                console.log("✅ Detected Vendor ID:", detectedId);
              } else {
                console.warn("⚠️ User object found but no ID field matched (checked id, vendorId, userId). Structure:", user);
                Swal.fire({
                  icon: "warning",
                  title: "ID Key Mismatch",
                  text: "User found, but the ID field name doesn't match. Please check your browser console.",
                  confirmButtonColor: "#e11d48"
                });
              }
            } else {
              console.error("❌ Empty response from server. Email might not exist in database.");
              Swal.fire({
                icon: "error",
                title: "Vendor Account Not Found",
                text: "Your email is logged in but not registered in the backend DB as a User/Vendor.",
                confirmButtonColor: "#e11d48"
              });
            }
          } else {
            console.error("❌ Backend HTTP Error Status:", res.status);
          }
        } catch (err) {
          console.error("🚨 Network failure while identifying vendor:", err);
        }
      }
    }
    getVendorId();
  }, [session, status]);

  // ২. Full Form Data State
  const [formData, setFormData] = useState({
    title: "",
    type: "Apartment",
    description: "",
    address: "",
    city: "Dhaka",
    zipCode: "",
    latitude: "",
    longitude: "",
    pricePerNight: "2500",
    maxGuests: "2",
    cleaningFee: "500",
    securityDeposit: "1500",
    cancellationPolicy: "Moderate",
    amenities: {
      wifi: true,
      ac: false,
      tv: false,
      fridge: false,
      microwave: false,
      cctv: false,
      fireExtinguisher: false,
      parking: false,
      pool: false,
      gym: false,
      balcony: false,
    },
    images: [] as string[],
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleFinalSubmit = async () => {
    if (!vendorId) {
      Swal.fire({
        icon: "error",
        title: "Vendor Verification Failed",
        text: "Cannot publish property without a valid Vendor ID. Check backend database logs.",
        confirmButtonColor: "#e11d48"
      });
      return;
    }

    setIsSubmitting(true);

    const finalPayload = {
      vendorId: vendorId,
      title: formData.title,
      description: formData.description,
      propertyType: formData.type,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
      latitude: formData.latitude ? parseFloat(formData.latitude) : null,
      longitude: formData.longitude ? parseFloat(formData.longitude) : null,
      pricePerNight: parseFloat(formData.pricePerNight),
      maxGuests: parseInt(formData.maxGuests),
      status: "active",
      imageUrls: formData.images 
    };

    try {
      const response = await fetch("http://localhost:8080/saveProperty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalPayload),
      });
        console.log("📤 Sending Payload to Backend:", finalPayload);
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Congratulations! 🎉",
          text: "Property has been successfully published on SmartHome.",
          confirmButtonColor: "#059669"
        }).then(() => {
          router.push("/dashboard/vendor/properties");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Denied",
          text: "Server rejected the form payload. Ensure all fields follow constraints.",
          confirmButtonColor: "#e11d48"
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Server Disconnected",
        text: "Failed to connect with Spring Boot API. Is the server running?",
        confirmButtonColor: "#e11d48"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl border border-gray-100 shadow-sm mt-4 animate-in fade-in duration-300">
      {/* Top Progress Tracker */}
      <div className="flex justify-between items-center mb-10 border-b pb-5 overflow-x-auto gap-4">
        {[
          { label: "Basic Info", id: 1 },
          { label: "Pricing", id: 2 },
          { label: "Amenities", id: 3 },
          { label: "Images", id: 4 },
          { label: "Review", id: 5 },
        ].map((s) => (
          <div key={s.id} className="flex items-center space-x-2 shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors ${step >= s.id ? "bg-[#ba0036]" : "bg-gray-200"}`}>
              {s.id}
            </div>
            <span className={`text-xs ${step === s.id ? "font-bold text-gray-900" : "text-gray-400 font-medium"}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Dynamic Form Router */}
      <div className="min-h-[300px]">
        {step === 1 && <StepBasicInfo formData={formData} setFormData={setFormData} onNext={nextStep} />}
        {step === 2 && <StepPricing formData={formData} setFormData={setFormData} onNext={nextStep} onBack={prevStep} />}
        {step === 3 && <StepAmenities formData={formData} setFormData={setFormData} onNext={nextStep} onBack={prevStep} />}
        {step === 4 && <StepImages formData={formData} setFormData={setFormData} onNext={nextStep} onBack={prevStep} />}
        {step === 5 && <StepReview formData={formData} onSubmit={handleFinalSubmit} onBack={prevStep} isSubmitting={isSubmitting} vendorId={vendorId} />}
      </div>
    </div>
  );
}


function StepBasicInfo({ formData, setFormData, onNext }: any) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-gray-900">Step 1: Basic Information & Location</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Property Title</label>
          <input
            type="text"
            className="w-full border p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ba0036]/10 focus:border-[#ba0036] text-sm"
            placeholder="e.g., Luxury Skyline Apartment"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Property Type</label>
          <select
            className="w-full border p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ba0036]/10 focus:border-[#ba0036] text-sm bg-white"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option>Apartment</option>
            <option>Villa</option>
            <option>Penthouse</option>
            <option>Loft</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
        <textarea
          rows={3}
          className="w-full border p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ba0036]/10 focus:border-[#ba0036] text-sm"
          placeholder="Describe what makes your property unique..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="border-t pt-4 space-y-4">
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Location Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Full Address</label>
            <input
              type="text"
              placeholder="Road 12, Gulshan 1"
              className="w-full border p-2.5 rounded-xl text-sm"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">City</label>
            <input
              type="text"
              className="w-full border p-2.5 rounded-xl text-sm"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Zip Code</label>
            <input
              type="text"
              placeholder="1212"
              className="w-full border p-2.5 rounded-xl text-sm"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Latitude</label>
            <input
              type="number"
              step="any"
              placeholder="e.g., 23.7771"
              className="w-full border p-2 bg-white rounded-lg text-sm"
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Longitude</label>
            <input
              type="number"
              step="any"
              placeholder="e.g., 90.4158"
              className="w-full border p-2 bg-white rounded-lg text-sm"
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button onClick={onNext} className="bg-[#ba0036] hover:bg-[#9a002d] text-white px-6 py-2.5 rounded-xl transition text-xs font-bold shadow-sm">
          Next Step →
        </button>
      </div>
    </div>
  );
}

function StepPricing({ formData, setFormData, onNext, onBack }: any) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-gray-900">Step 2: Pricing & Policies</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price/Night (৳)</label>
          <input
            type="number"
            className="w-full border p-2.5 rounded-xl text-sm"
            value={formData.pricePerNight}
            onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Max Guests</label>
          <input
            type="number"
            className="w-full border p-2.5 rounded-xl text-sm"
            value={formData.maxGuests}
            onChange={(e) => setFormData({ ...formData, maxGuests: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cleaning Fee</label>
          <input
            type="number"
            className="w-full border p-2.5 rounded-xl text-sm"
            value={formData.cleaningFee}
            onChange={(e) => setFormData({ ...formData, cleaningFee: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Security Deposit</label>
          <input
            type="number"
            className="w-full border p-2.5 rounded-xl text-sm"
            value={formData.securityDeposit}
            onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
          />
        </div>
      </div>
      <div className="flex justify-between pt-4 border-t">
        <button onClick={onBack} className="border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-600 transition-colors">
          ← Back
        </button>
        <button onClick={onNext} className="bg-[#ba0036] hover:bg-[#9a002d] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors">
          Next Step →
        </button>
      </div>
    </div>
  );
}


function StepAmenities({ formData, setFormData, onNext, onBack }: any) {
  const toggleAmenity = (key: string) => {
    setFormData({
      ...formData,
      amenities: { ...formData.amenities, [key]: !formData.amenities[key] },
    });
  };

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-gray-900">Step 3: What does your place offer?</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.keys(formData.amenities).map((key) => (
          <label key={key} className={`border p-3.5 rounded-xl flex items-center space-x-3 cursor-pointer select-none transition ${formData.amenities[key] ? "border-[#ba0036] bg-rose-50/50" : "hover:bg-gray-50 border-gray-100"}`}>
            <input
              type="checkbox"
              checked={formData.amenities[key]}
              onChange={() => toggleAmenity(key)}
              className="accent-[#ba0036] w-4 h-4 rounded"
            />
            <span className="capitalize text-xs font-bold text-gray-700">{key}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-between pt-4 border-t">
        <button onClick={onBack} className="border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-600 transition-colors">
          ← Back
        </button>
        <button onClick={onNext} className="bg-[#ba0036] hover:bg-[#9a002d] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors">
          Next Step →
        </button>
      </div>
    </div>
  );
}


function StepImages({ formData, setFormData, onNext, onBack }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter((file) => file.type.startsWith("image/"));

    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev: any) => ({
          ...prev,
          images: [...prev.images, reader.result as string],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-gray-900">Step 4: Image Gallery Upload</h2>

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files && processFiles(e.target.files)}
        multiple
        accept="image/*"
        className="hidden"
      />

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); e.dataTransfer.files && processFiles(e.dataTransfer.files); }}
        className="border-2 border-dashed border-rose-200 rounded-xl p-8 text-center bg-rose-50/20 hover:bg-rose-50/40 transition cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="text-[#ba0036] text-sm font-bold mb-1">
          Drag and drop images here, or click to browse
        </div>
        <p className="text-[11px] text-gray-400 font-medium mb-4">Supports: JPG, PNG, WEBP (Max 10MB)</p>
        <button type="button" className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-gray-50">
          Select from Device
        </button>
      </div>

      {formData.images?.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Selected Gallery ({formData.images.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            {formData.images.map((imgString: string, index: number) => (
              <div key={index} className="relative group aspect-video bg-white rounded-lg overflow-hidden border shadow-sm">
                <img src={imgString} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData({ ...formData, images: formData.images.filter((_: any, i: number) => i !== index) });
                  }}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-rose-600 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {index === 0 && (
                  <span className="absolute bottom-1 left-1 bg-[#ba0036] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    Primary
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4 border-t">
        <button onClick={onBack} className="border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-600 transition-colors">
          ← Back
        </button>
        <button onClick={onNext} className="bg-[#ba0036] hover:bg-[#9a002d] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors">
          Next Step →
        </button>
      </div>
    </div>
  );
}


function StepReview({ formData, onSubmit, onBack, isSubmitting, vendorId }: any) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-gray-900">Step 5: Review Details</h2>
      
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3 text-xs text-gray-600 font-semibold">
        <div className="flex justify-between border-b pb-2">
          <span>Target Vendor Link Account ID:</span>
          <span className={vendorId ? "text-green-600 font-bold" : "text-rose-600 font-bold"}>
            {vendorId ? `#${vendorId}` : "MISSING/NOT_FOUND"}
          </span>
        </div>
        <p><strong className="text-gray-400 font-bold uppercase mr-1">Title:</strong> {formData.title || "Not Provided"}</p>
        <p><strong className="text-gray-400 font-bold uppercase mr-1">Type:</strong> {formData.type}</p>
        <p><strong className="text-gray-400 font-bold uppercase mr-1">Location:</strong> {formData.address}, {formData.city} (Zip: {formData.zipCode || "N/A"})</p>
        <p><strong className="text-gray-400 font-bold uppercase mr-1">Coordinates:</strong> Lat: {formData.latitude || "N/A"} | Long: {formData.longitude || "N/A"}</p>
        <p><strong className="text-gray-400 font-bold uppercase mr-1">Base Price Setup:</strong> ৳ {formData.pricePerNight} / night (Max Capacity: {formData.maxGuests} Guests)</p>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <button onClick={onBack} disabled={isSubmitting} className="border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-600 transition-colors disabled:opacity-50">
          ← Back
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting || !vendorId}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-colors disabled:opacity-40 flex items-center gap-2 shadow-sm"
        >
          {isSubmitting ? "Publishing Data..." : "Save & Publish Property 🎉"}
        </button>
      </div>
    </div>
  );
}