"use client";
import GemstoneForm from "@/components/gemstone/GemstoneForm";
import RudrakshaForm from "@/components/rudraksha/RudrakshaForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateRudrakshaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sku: "RUD-5MK-001",
    name: "5 Mukhi Rudraksha",
    slug: "5-mukhi-rudraksha",
    category: "Rudraksha",
    subCategory: "Nepali Rudraksha",
    status: "Draft", // Draft | Published | Archived
    description:
      "This is a 100% natural and lab-certified 5 Mukhi Rudraksha sourced from Nepal. It is associated with Lord Shiva and the planet Jupiter.",
    gallery: [
      "/images/rudraksha/1.jpg",
      "/images/rudraksha/2.jpg",
      "/images/rudraksha/3.jpg",
    ],
    certificateImage: "/images/rudraksha/certificate.jpg",
    videoUrl: "",
    mukhi: 5,
    type: "Natural",
    species: "Elaeocarpus Ganitrus",
    origin: "Nepal",
    shape: "Round",
    color: "Brown",
    surface: "Natural Thorny",
    astrology: {
      rulingPlanet: "Jupiter",
      zodiacSigns: ["Sagittarius", "Pisces"],
      wearDay: "Monday",
      wearTime: "Morning",
      wearMethod: "Red Thread or Silver Chain",
      metal: "Silver",
      threadColor: "Red",
      purificationMethod: "Milk & Ganga Jal",
    },
    holes: 1,
    naturalHole: true,
    natural: true,
    original: true,
    certification: {
      labCertified: true,
      certificationType: "ISO Certified Lab",
      certificateNumber: "LAB-2026-0001",
      labName: "IGI Gem Testing Lab",
      xrayVerified: true,
    },
    treatment: "Untreated",
    benefits: [
      "Mental Peace",
      "Confidence",
      "Wisdom",
      "Stress Relief",
      "Health",
      "Success",
    ],
    pricing: {
      currency: "INR",
      costPrice: 1200,
      sellingPrice: 1800,
      discountPrice: 1500,
      taxClass: "GST 3%",
    },
    inventory: {
      stock: 25,
      stockStatus: "In Stock",
      lowStockThreshold: 5,
    },
    seo: {
      metaTitle: "Natural 5 Mukhi Rudraksha",
      metaDescription:
        "Buy Original Nepali 5 Mukhi Rudraksha with Lab Certificate.",
    },
    careInstructions: {
      cleaning: "Clean with lukewarm water and a soft cloth.",
      storage: "Store separately in a jewelry box to prevent scratches.",
      precautions: "Avoid harsh chemicals and ultrasonic cleaners.",
    },
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/rudraksha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert("Product added successfully!");
      router.push("/rudraksha"); // Redirect to rudraksha list page

      console.log(data);

      // Optional: Reset form
      // setFormData(initialFormData);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <RudrakshaForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
