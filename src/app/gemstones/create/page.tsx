"use client";
import GemstoneForm from "@/components/gemstone/GemstoneForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateGemstonePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sku: "GEM-RUBY-001",
    name: "Ruby",
    indianName: "Manik",
    slug: "natural-ruby",
    description:
      "This natural Ruby (Manik) is sourced from Burma and is known for its deep red color, excellent transparency, and astrological significance. It is recommended for strengthening the Sun and is suitable for those seeking confidence, leadership, and success.",
    gallery: [
      "/images/gemstones/ruby-1.webp",
      "/images/gemstones/ruby-2.webp",
      "/images/gemstones/ruby-3.webp",
    ],
    videoUrl: "https://youtube.com/watch?v=example",
    category: "Precious",
    subCategory: "Ruby",
    color: "Pigeon Blood Red",
    shape: "Oval",
    cut: "Mixed Cut",
    transparency: "Transparent",
    origin: "Burma (Myanmar)",
    treatment: "Unheated",
    weight: {
      value: 5.25,
      unit: "Carat",
    },
    dimensions: {
      length: 11.2,
      width: 8.6,
      height: 5.1,
      unit: "mm",
    },
    hardness: "9 Mohs",
    refractiveIndex: "1.762 - 1.770",
    specificGravity: "4.00",
    luster: "Vitreous",
    quality: {
      grade: "AAA",
      clarity: "VVS",
      colorGrade: "Excellent",
      natural: true,
      synthetic: false,
      heated: false,
      enhancement: "None",
    },
    astrology: {
      planet: "Sun",
      zodiacSigns: ["Leo", "Aries", "Scorpio"],
      dayToWear: "Sunday",
      finger: "Ring Finger",
      metal: "Gold",
    },
    certification: {
      labName: "IGI",
      certificateNumber: "IGI-RB-202600123",
      issueDate: "2026-07-15",
      certificatePdf: "/certificates/ruby.pdf",
      certificateImage: "/certificates/ruby.jpg",
    },
    inventory: {
      stock: 12,
      stockStatus: "In Stock",
      lowStockAlert: 3,
    },
    pricing: {
      currency: "INR",
      costPrice: 42000,
      sellingPrice: 50000,
      salePrice: 47500,
      discount: 5,
      gst: 3,
    },
    benefits: [
      "Boosts confidence",
      "Enhances leadership qualities",
      "Improves career growth",
      "Provides protection from negativity",
      "Attracts success and prosperity",
    ],
    careInstructions: {
      cleaning: "Clean with lukewarm water and a soft cloth.",
      storage: "Store separately in a jewelry box to prevent scratches.",
      precautions: "Avoid harsh chemicals and ultrasonic cleaners.",
    },
    seo: {
      metaTitle: "Buy Natural Ruby (Manik) Online | Certified Gemstone",
      metaDescription:
        "Shop certified natural Ruby (Manik) gemstone with lab certification, free shipping, and best price in India.",
    },
    status: "Published",
  });

  const handleSubmit = async () => {
    // Basic Validation
    if (!formData.sku.trim()) {
      alert("SKU is required");
      return;
    }

    if (!formData.name.trim()) {
      alert("Product name is required");
      return;
    }

    if (!formData.category) {
      alert("Category is required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/gemstones", {
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
      router.push("/gemstones"); // Redirect to gemstones list page

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
      <GemstoneForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
