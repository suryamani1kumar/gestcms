"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import PageHeader from "@/components/pageheader/PageHeader";
import ProductForm from "@/components/product/ProductForm";

import { ProductFormData, ProductStatus } from "@/lib/type";

const initialFormData: ProductFormData = {
  productType: "gemstone",

  name: "",
  slug: "",
  description: "",
  category: "",

  gallery: [],

  gemstone: {
    indianName: "",
    variety: "",
    color: "",
    shape: "",
    cut: "",
    transparency: "",
    origin: "",
    treatment: "",

    weight: undefined,
    weightUnit: "gram",

    dimension: "",

    hardness: "",
    refractiveIndex: "",
    specificGravity: "",
    luster: "",
    qualityGrade: "",
    clarity: "",
    colorGrade: "",

    natural: true,
    synthetic: false,
    heated: false,

    enhancement: "",
  },

  rudraksha: undefined,

  jewellery: undefined,

  astrology: {
    planet: "",
    zodiacSigns: [],
    wearDay: "",
    wearMethod: "",
    finger: "",
    metal: "",
    threadColor: "",
    purificationMethod: "",
  },

  certification: {
    certified: false,
    certificationType: "",
    labName: "",
    certificateNumber: "",
    issueDate: "",
    xrayVerified: false,
    certificatePdf: "",
    certificateImage: "",
  },

  pricing: {
    currency: "INR",
    costPrice: undefined,
    sellingPrice: undefined,
    salePrice: undefined,
    discount: 5,
    gst: 3,
    buyUnitPrice: undefined,
    sellUnitPrice: undefined,
    WeightUnit: "",
  },

  inventory: {
    stock: 5,
    stockStatus: "In Stock",
    lowStockAlert: 2,
    reservedStock: 0,
  },

  benefits: [],

  seo: {
    metaTitle: "",
    metaDescription: "",
  },

  careInstructions: {
    cleaning: "",
    storage: "",
    precautions: "",
  },

  status: "Draft",
};

export default function CreateProductPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<ProductFormData>(initialFormData);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (status?: ProductStatus) => {
    const submitStatus = status ?? formData.status;

    if (!formData.productType) {
      alert("Product type is required.");
      return;
    }

    if (!formData.name.trim()) {
      alert("Product name is required.");
      return;
    }

    if (!formData.category.trim()) {
      alert("Category is required.");
      return;
    }

    if (
      formData.pricing?.sellingPrice !== undefined &&
      formData.pricing.sellingPrice < 0
    ) {
      alert("Selling price cannot be negative.");
      return;
    }

    if (
      formData.pricing?.costPrice !== undefined &&
      formData.pricing.costPrice < 0
    ) {
      alert("Cost price cannot be negative.");
      return;
    }

    if (
      formData.pricing?.salePrice !== undefined &&
      formData.pricing.salePrice < 0
    ) {
      alert("Sale price cannot be negative.");
      return;
    }

    if (
      formData.inventory?.stock !== undefined &&
      formData.inventory.stock < 0
    ) {
      alert("Stock cannot be negative.");
      return;
    }

    if (formData.productType === "rudraksha") {
      if (!formData.rudraksha?.mukhi) {
        alert("Mukhi is required for Rudraksha.");
        return;
      }
    }

    if (formData.productType === "jewellery") {
      if (!formData.jewellery?.metalType?.trim()) {
        alert("Metal type is required for jewellery.");
        return;
      }

      if (!formData.jewellery?.purity?.trim()) {
        alert("Purity is required for jewellery.");
        return;
      }
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,

        status: submitStatus,

        /*
         * Keep gallery from ProductImage.
         * Do NOT force gallery to [] here.
         */
        gallery: formData.gallery ?? [],

        /*
         * Only send product-specific data
         */
        gemstone:
          formData.productType === "gemstone" ? formData.gemstone : undefined,

        rudraksha:
          formData.productType === "rudraksha" ? formData.rudraksha : undefined,

        jewellery:
          formData.productType === "jewellery" ? formData.jewellery : undefined,

        astrology:
          formData.productType === "gemstone" ||
          formData.productType === "rudraksha"
            ? formData.astrology
            : undefined,

        certification:
          formData.productType === "gemstone" ||
          formData.productType === "rudraksha"
            ? formData.certification
            : undefined,
      };

      const response = await fetch("/api/products", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data?.errors)) {
          alert(data.errors.join("\n"));
        } else {
          alert(data?.message || "Failed to create product.");
        }

        return;
      }

      alert("Product created successfully.");

      router.push("/products");
      router.refresh();
    } catch (error) {
      console.error("Create product error:", error);

      alert(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-3 font-sans text-[#292d32]">
      <main className="mx-auto max-w-[1500px]">
        <PageHeader
          title="Add Product"
          description="Create a new Gemstone, Rudraksha or Jewellery product"
          showButton={false}
        />

        <ProductForm formData={formData} setFormData={setFormData} />
        <div className="mt-3 flex justify-end gap-2 border-t border-slate-200 py-4">
          <button
            type="button"
            onClick={() => router.push("/products")}
            disabled={loading}
            className="h-9 cursor-pointer rounded-md border border-slate-200 bg-white px-5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit("Draft")}
            className="h-9 cursor-pointer rounded-md border border-[#ead9c8] bg-[#f8eee6] px-5 text-[11px] font-semibold text-slate-800 hover:bg-[#f5e8dd] disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save as Draft"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit("Published")}
            className="h-9 cursor-pointer rounded-md bg-slate-900 px-5 text-[11px] font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Product"}
          </button>
        </div>
      </main>
    </div>
  );
}
