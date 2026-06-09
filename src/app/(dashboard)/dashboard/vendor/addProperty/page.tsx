"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPropertyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  
  // Full Form Data State
  const [formData, setFormData] = useState({
    title: "",
    type: "Apartment",
    description: "",
    address: "",
    city: "Dhaka",
    area: "",
    pricePerNight: "2500",
    cleaningFee: "500",
    securityDeposit: "1500",
    weeklyDiscount: "",
    monthlyDiscount: "",
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

  // Step 5: Final Submission and Auto Redirect logic
  const handleFinalSubmit = async () => {
    // API Call handling logic built here if needed
    alert("Property creation successful! Redirecting...");
    router.push("/dashboard/vendor/properties"); // Redirecting back to My Properties list table views
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Top Progress Indicator Tracker Banner Status */}
      <div className="flex justify-between items-center mb-10 border-b pb-4">
        {[
          { label: "Basic Info", id: 1 },
          { label: "Pricing", id: 2 },
          { label: "Amenities", id: 3 },
          { label: "Images", id: 4 },
          { label: "Review", id: 5 },
        ].map((s) => (
          <div key={s.id} className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                step >= s.id ? "bg-rose-600" : "bg-gray-300"
              }`}
            >
              {s.id}
            </div>
            <span className={`text-sm ${step === s.id ? "font-bold text-gray-900" : "text-gray-500"}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Renders Current Step Dynamic Form Layout Panel Views UI */}
      <div>
        {step === 1 && <StepBasicInfo formData={formData} setFormData={setFormData} onNext={nextStep} />}
        {step === 2 && <StepPricing formData={formData} setFormData={setFormData} onNext={nextStep} onBack={prevStep} />}
        {step === 3 && <StepAmenities formData={formData} setFormData={setFormData} onNext={nextStep} onBack={prevStep} />}
        {step === 4 && <StepImages formData={formData} setFormData={setFormData} onNext={nextStep} onBack={prevStep} />}
        {step === 5 && <StepReview formData={formData} onSubmit={handleFinalSubmit} onBack={prevStep} />}
      </div>
    </div>
  );
}

/* ==========================================================================
   STEP 1: BASIC INFORMATION
   ========================================================================== */
function StepBasicInfo({ formData, setFormData, onNext }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Step 1: Basic Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Property Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md focus:outline-rose-500"
            placeholder="e.g., Luxury Skyline Apartment"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Property Type</label>
          <select
            className="w-full border p-2 rounded-md focus:outline-rose-500"
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
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          rows={4}
          className="w-full border p-2 rounded-md focus:outline-rose-500"
          placeholder="Describe what makes your property unique..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div className="flex justify-end pt-4">
        <button onClick={onNext} className="bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700 transition">
          Next Step →
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   STEP 2: PRICING & POLICIES
   ========================================================================== */
function StepPricing({ formData, setFormData, onNext, onBack }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Pricing & Policies</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Price Per Night (৳)</label>
          <input
            type="number"
            className="w-full border p-2 rounded-md"
            value={formData.pricePerNight}
            onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cleaning Fee (৳)</label>
          <input
            type="number"
            className="w-full border p-2 rounded-md"
            value={formData.cleaningFee}
            onChange={(e) => setFormData({ ...formData, cleaningFee: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Security Deposit (৳)</label>
          <input
            type="number"
            className="w-full border p-2 rounded-md"
            value={formData.securityDeposit}
            onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
          />
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50">
          ← Back
        </button>
        <button onClick={onNext} className="bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700">
          Next Step →
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   STEP 3: AMENITIES SELECTION
   ========================================================================== */
function StepAmenities({ formData, setFormData, onNext, onBack }: any) {
  const toggleAmenity = (key: string) => {
    setFormData({
      ...formData,
      amenities: { ...formData.amenities, [key]: !formData.amenities[key] },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">What does your place offer?</h2>
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(formData.amenities).map((key) => (
          <label
            key={key}
            className={`border p-4 rounded-xl flex items-center space-x-3 cursor-pointer select-none transition ${
              formData.amenities[key] ? "border-rose-600 bg-rose-50" : "hover:bg-gray-50"
            }`}
          >
            <input
              type="checkbox"
              checked={formData.amenities[key]}
              onChange={() => toggleAmenity(key)}
              className="accent-rose-600 w-4 h-4"
            />
            <span className="capitalize text-sm font-medium">{key}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50">
          ← Back
        </button>
        <button onClick={onNext} className="bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700">
          Next Step →
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   STEP 4: IMAGE GALLERY UPLOAD LAYOUT
   ========================================================================== */
function StepImages({ formData, setFormData, onNext, onBack }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Step 4: Image Gallery Upload</h2>
      <div className="border-2 border-dashed border-rose-300 rounded-xl p-8 text-center bg-rose-50/30">
        <div className="text-rose-500 font-semibold mb-2">Drag and drop images here</div>
        <p className="text-xs text-gray-500 mb-4">Supports: JPG, PNG, WEBP (Max 10MB each)</p>
        <button className="bg-rose-600 text-white px-4 py-2 rounded-md text-sm hover:bg-rose-700">
          Select from Device
        </button>
      </div>
      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50">
          ← Back
        </button>
        <button onClick={onNext} className="bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700">
          Next Step →
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   STEP 5: REVIEW & FINAL SAVE WORKFLOW
   ========================================================================== */
function StepReview({ formData, onSubmit, onBack }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Step 5: Review Details</h2>
      <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm text-gray-700">
        <p><strong>Title:</strong> {formData.title || "Not Provided"}</p>
        <p><strong>Type:</strong> {formData.type}</p>
        <p><strong>Base Rent Price:</strong> ৳ {formData.pricePerNight} / night</p>
        <p><strong>Location State:</strong> {formData.city}</p>
      </div>
      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50">
          ← Back
        </button>
        <button onClick={onSubmit} className="bg-green-600 text-white px-8 py-2 rounded-md font-bold hover:bg-green-700">
          Save & Publish Property 🎉
        </button>
      </div>
    </div>
  );
}