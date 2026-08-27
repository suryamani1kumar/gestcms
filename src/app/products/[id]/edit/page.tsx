"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import PageHeader from "@/components/pageheader/PageHeader";
import ProductForm from "@/components/product/ProductForm";

import { ProductFormData, ProductStatus } from "@/lib/type";

const emptyProduct: ProductFormData = {
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

    dimension: "mm",

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
    discount: 0,
    gst: 3,
    buyUnitPrice: undefined,
    sellUnitPrice: undefined,
    WeightUnit: "",
  },

  inventory: {
    stock: 3,
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

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  /*
   * IMPORTANT:
   * formData itself is never null.
   * This fixes the setFormData type error.
   */
  const [formData, setFormData] = useState<ProductFormData>(emptyProduct);

  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setFetching(true);

        const response = await fetch(`/api/products/${id}`, {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to fetch product");
        }

        if (!data?.data) {
          throw new Error("Product data not found");
        }

        const item = data.data;

        const productData: ProductFormData = {
          ...emptyProduct,

          ...item,

          /*
           * Remove MongoDB fields if they are present
           */
          _id: undefined,
          createdAt: undefined,
          updatedAt: undefined,

          gallery: Array.isArray(item.gallery) ? item.gallery : [],

          benefits: Array.isArray(item.benefits) ? item.benefits : [],

          gemstone:
            item.productType === "gemstone"
              ? item.gemstone || emptyProduct.gemstone
              : undefined,

          rudraksha:
            item.productType === "rudraksha" ? item.rudraksha || {} : undefined,

          jewellery:
            item.productType === "jewellery" ? item.jewellery || {} : undefined,

          astrology: {
            ...emptyProduct.astrology,
            ...(item.astrology || {}),
          },

          certification: {
            ...emptyProduct.certification,
            ...(item.certification || {}),
          },

          pricing: {
            ...emptyProduct.pricing,
            ...(item.pricing || {}),
          },

          inventory: {
            ...emptyProduct.inventory,
            ...(item.inventory || {}),
          },

          seo: {
            ...emptyProduct.seo,
            ...(item.seo || {}),
          },

          careInstructions: {
            ...emptyProduct.careInstructions,
            ...(item.careInstructions || {}),
          },
        };

        setFormData(productData);
      } catch (error) {
        console.error("Fetch product error:", error);

        alert(
          error instanceof Error ? error.message : "Failed to load product",
        );

        router.push("/products");
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  const handleSubmit = async (status?: ProductStatus) => {
    const submitStatus = status ?? formData.status;

    /*
     * BASIC VALIDATION
     */

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

    /*
     * PRICE VALIDATION
     */

    if (
      formData.pricing?.costPrice !== undefined &&
      formData.pricing.costPrice < 0
    ) {
      alert("Cost price cannot be negative.");
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
      formData.pricing?.salePrice !== undefined &&
      formData.pricing.salePrice < 0
    ) {
      alert("Sale price cannot be negative.");
      return;
    }

    /*
     * INVENTORY
     */

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

        gallery: formData.gallery ?? [],

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

      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data?.errors)) {
          throw new Error(data.errors.join("\n"));
        }

        throw new Error(data?.message || "Failed to update product");
      }

      alert(
        submitStatus === "Published"
          ? "Product updated and published successfully!"
          : "Product updated successfully!",
      );

      router.push("/products");
      router.refresh();
    } catch (error) {
      console.error("Update product error:", error);

      alert(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
        <div className="text-[12px] text-slate-500">Loading product...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-3 font-sans text-[#292d32]">
      <main className="mx-auto max-w-[1500px]">
        <PageHeader
          title="Edit Product"
          description="Update your Gemstone, Rudraksha or Jewellery product"
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
