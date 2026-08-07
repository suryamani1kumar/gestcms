"use client";

import ProductForm from "@/components/product/ProductForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ProductType = "gemstone" | "rudraksha";

const initialFormData = {
  productType: "gemstone" as ProductType,
  sku: "GEM-RUBY-001",
  name: "Ruby",
  indianName: "Manik",
  slug: "natural-ruby",
  description:
    "This natural Ruby (Manik) is sourced from Burma and is known for its deep red color, excellent transparency, and astrological significance. It is recommended for strengthening the Sun and is suitable for those seeking confidence, leadership, and success.",
  category: "Precious",
  subCategory: "Ruby",
  gallery: [],

  videoUrl: "https://youtube.com/watch?v=example",
  specifications: {
    // Gemstone basic details
    color: "Pigeon Blood Red",
    shape: "Oval",
    cut: "Mixed Cut",
    transparency: "Transparent",
    origin: "Burma (Myanmar)",
    treatment: "Unheated",

    // Weight
    weight: {
      value: 5.25,
      unit: "Carat",
    },

    // Dimensions
    dimensions: {
      length: 11.2,
      width: 8.6,
      height: 5.1,
      unit: "mm",
    },

    // Physical properties
    hardness: "9 Mohs",
    refractiveIndex: "1.762 - 1.770",
    specificGravity: "4.00",
    luster: "Vitreous",

    // Quality
    quality: {
      grade: "AAA",
      clarity: "VVS",
      colorGrade: "Excellent",
      natural: true,
      synthetic: false,
      heated: false,
      enhancement: "None",
    },
  },
  astrology: {
    planet: "Sun",

    zodiacSigns: ["Leo", "Aries", "Scorpio"],

    wearDay: "Sunday",

    wearTime: "",

    wearMethod: "",

    finger: "Ring Finger",

    metal: "Gold",

    threadColor: "",

    purificationMethod: "",
  },
  certification: {
    certified: true,

    labName: "IGI",

    certificateNumber: "IGI-RB-202600123",

    certificationType: "Natural Gemstone",

    issueDate: "2026-07-15",

    certificatePdf: "/certificates/ruby.pdf",

    certificateImage: "/certificates/ruby.jpg",

    xrayVerified: false,
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

    taxClass: "",
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

  status: "Published" as "Draft" | "Published" | "Archived",
};

export default function CreateProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async () => {
    if (!formData.sku.trim()) {
      alert("SKU is required");
      return;
    }

    if (!formData.slug.trim()) {
      alert("Slug is required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/products", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create product");
      }

      alert("Product added successfully!");

      router.push("/products");
    } catch (error: unknown) {
      console.error("Create product error:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </main>
  );
}
