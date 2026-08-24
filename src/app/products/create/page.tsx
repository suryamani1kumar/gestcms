"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

import PageHeader from "@/components/pageheader/PageHeader";

import {
  FaArrowUpFromBracket,
  FaCalendarDays,
  FaCloudArrowUp,
  FaImage,
  FaList,
  FaPlus,
  FaRegCircleCheck,
  FaTrash,
} from "react-icons/fa6";
import ProductImage from "@/components/product/ProductImage";

/* =========================================================
   TYPES
========================================================= */

type ProductType = "gemstone" | "rudraksha" | "jewellery";

type ProductStatus = "Draft" | "Published" | "Archived";

type StockStatus = "In Stock" | "Out of Stock" | "Low Stock";

type Gender = "Men" | "Women" | "Unisex";

type Option = {
  label: string;
  value: string;
};

/* =========================================================
   GALLERY
========================================================= */

interface GalleryImage {
  file: File;
  preview: string;
}

/* =========================================================
   GEMSTONE
========================================================= */

interface GemstoneData {
  gemstoneType?: string;
  variety?: string;
  color?: string;
  shape?: string;
  cut?: string;
  transparency?: string;
  origin?: string;
  treatment?: string;

  weight?: number;
  weightUnit?: string;

  length?: number;
  width?: number;
  height?: number;
  dimensionUnit?: string;

  hardness?: string;
  refractiveIndex?: string;
  specificGravity?: string;
  luster?: string;

  qualityGrade?: string;
  clarity?: string;
  colorGrade?: string;

  natural?: boolean;
  synthetic?: boolean;
  heated?: boolean;
  enhancement?: string;
}

/* =========================================================
   RUDRAKSHA
========================================================= */

interface RudrakshaData {
  mukhi?: number;
  beadType?: string;
  origin?: string;
  size?: number;
  sizeUnit?: string;
  color?: string;
  shape?: string;
  weight?: number;
  weightUnit?: string;
  quality?: string;
  energized?: boolean;
  labCertified?: boolean;
}

/* =========================================================
   JEWELLERY
========================================================= */

interface JewelleryData {
  metalType?: string;
  purity?: string;
  metalColor?: string;

  metalWeight?: number;
  metalWeightUnit?: "gram" | "kg";

  makingCharges?: number;
  makingChargesType?: "fixed" | "percentage";
  makingChargesPercentage?: number;

  hasDiamond?: boolean;
  diamondType?: string;
  diamondCount?: number;
  diamondWeight?: number;
  diamondWeightUnit?: "carat" | "gram";

  diamondColor?: string;
  diamondClarity?: string;
  diamondCut?: string;
  diamondShape?: string;

  hasGemstone?: boolean;
  gemstoneType?: string;
  gemstoneCount?: number;
  gemstoneWeight?: number;
  gemstoneWeightUnit?: "carat" | "gram";

  grossWeight?: number;
  netWeight?: number;

  length?: number;
  width?: number;

  size?: string;
  dimensions?: string;

  settingType?: string;

  hallmark?: string;
  hallmarkNumber?: string;
  hallmarkVerified?: boolean;

  collection?: string;
  occasion?: string;

  gender?: Gender;

  availableSizes?: string[];

  customizable?: boolean;
}

/* =========================================================
   COMMON OBJECTS
========================================================= */

interface AstrologyData {
  planet?: string;
  zodiacSigns?: string[];
  wearDay?: string;
  wearMethod?: string;
  finger?: string;
  metal?: string;
  threadColor?: string;
  purificationMethod?: string;
}

interface CertificationData {
  certified?: boolean;
  certificationType?: string;
  labName?: string;
  certificateNumber?: string;
  issueDate?: string;
  xrayVerified?: boolean;
  certificatePdf?: string;
  certificateImage?: string;
}

interface PricingData {
  currency?: string;
  costPrice?: number;
  sellingPrice?: number;
  salePrice?: number;
  discount?: number;
  gst?: number;
}

interface InventoryData {
  stock?: number;
  stockStatus?: StockStatus;
  lowStockAlert?: number;
  reservedStock?: number;
}

interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
}

interface CareInstructionsData {
  cleaning?: string;
  storage?: string;
  precautions?: string;
}

/* =========================================================
   PRODUCT FORM
========================================================= */

interface ProductFormData {
  productType: ProductType;

  sku: string;
  name: string;
  indianName: string;
  slug: string;
  description: string;

  category: string;
  subCategory: string;

  gallery: GalleryImage[];

  specifications: Record<string, any>;

  gemstone?: GemstoneData;

  rudraksha?: RudrakshaData;

  jewellery?: JewelleryData;

  astrology?: AstrologyData;

  certification?: CertificationData;

  pricing?: PricingData;

  inventory?: InventoryData;

  benefits: string[];

  seo?: SeoData;

  careInstructions?: CareInstructionsData;

  status: ProductStatus;

  createdBy?: string;
  updatedBy?: string;
}

/* =========================================================
   INITIAL FORM
========================================================= */

const initialFormData: ProductFormData = {
  productType: "gemstone",

  sku: "",

  name: "",

  indianName: "",

  slug: "",

  description: "",

  category: "",

  subCategory: "",

  gallery: [],

  specifications: {},

  gemstone: {
    gemstoneType: "",
    variety: "",
    color: "",
    shape: "",
    cut: "",
    transparency: "",
    origin: "",
    treatment: "",

    weight: undefined,
    weightUnit: "Carat",

    length: undefined,
    width: undefined,
    height: undefined,

    dimensionUnit: "mm",

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
  },

  inventory: {
    stock: 0,
    stockStatus: "In Stock",
    lowStockAlert: 5,
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

/* =========================================================
   STYLES
========================================================= */

const inputClass =
  "w-full h-9 rounded-md border border-[#e5e1da] bg-white px-3 text-[11px] text-slate-700 outline-none placeholder:text-[#96999d] focus:border-[#c9a45c] focus:ring-1 focus:ring-[#c9a45c]/20";

const labelClass = "mb-1.5 block text-[10px] font-semibold text-slate-700";

const selectClass =
  "w-full h-9 appearance-none rounded-md border border-[#e5e1da] bg-white px-3 text-[11px] text-slate-700 outline-none focus:border-[#c9a45c] focus:ring-1 focus:ring-[#c9a45c]/20";

const textareaClass =
  "w-full resize-none rounded-md border border-[#e5e1da] bg-white px-3 py-2 text-[11px] text-slate-700 outline-none placeholder:text-[#96999d] focus:border-[#c9a45c] focus:ring-1 focus:ring-[#c9a45c]/20";

/* =========================================================
   COMPONENTS
========================================================= */

const Section = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    className={`rounded-md border border-slate-200 bg-white p-3 ${className}`}
  >
    <h2 className="mb-3 text-[11px] font-bold text-slate-800">{title}</h2>

    {children}
  </section>
);

const Field = ({
  label,
  required = false,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <label className={labelClass}>
      {label}

      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>

    {children}
  </div>
);

const Input = ({
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  placeholder?: string;
  type?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value ?? ""}
    onChange={onChange}
    className={inputClass}
  />
);

const Select = ({
  options,
  placeholder = "Select",
  value,
  onChange,
}: {
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div className="relative">
    <select className={selectClass} value={value ?? ""} onChange={onChange}>
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-slate-500">
      ▼
    </span>
  </div>
);

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative h-4 w-8 rounded-full transition ${
      checked ? "bg-slate-800" : "bg-slate-200"
    }`}
  >
    <span
      className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition ${
        checked ? "left-[18px]" : "left-0.5"
      }`}
    />
  </button>
);

const EmptyState = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex min-h-[120px] flex-col items-center justify-center text-center">
    <div className="mb-3 text-xl text-slate-400">{icon}</div>

    <p className="text-[11px] font-semibold text-slate-600">{title}</p>

    <p className="mt-1 max-w-[230px] text-[9px] leading-4 text-slate-400">
      {description}
    </p>
  </div>
);

/* =========================================================
   HELPERS
========================================================= */

const numberValue = (value: string): number | undefined => {
  if (value === "") return undefined;

  const number = Number(value);

  return Number.isNaN(number) ? undefined : number;
};

/* =========================================================
   PAGE
========================================================= */

export default function CreateProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);

  const [loading, setLoading] = useState(false);

  /* =======================================================
     UPDATE ROOT FIELD
  ======================================================= */

  const updateField = <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =======================================================
     UPDATE NESTED FIELD
  ======================================================= */

  const updateNestedField = (
    section:
      | "gemstone"
      | "rudraksha"
      | "jewellery"
      | "astrology"
      | "certification"
      | "pricing"
      | "inventory"
      | "seo"
      | "careInstructions",
    field: string,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,

      [section]: {
        ...(prev[section] || {}),
        [field]: value,
      },
    }));
  };

  /* =======================================================
     PRODUCT TYPE
  ======================================================= */

  const handleProductTypeChange = (type: ProductType) => {
    setFormData((prev) => ({
      ...prev,

      productType: type,

      gemstone: type === "gemstone" ? prev.gemstone || {} : undefined,

      rudraksha: type === "rudraksha" ? prev.rudraksha || {} : undefined,

      jewellery: type === "jewellery" ? prev.jewellery || {} : undefined,
    }));
  };

  /* =======================================================
     GALLERY
  ======================================================= */

  const handleImages = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        alert(`${file.name} is not an image.`);

        return false;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is larger than 5MB.`);

        return false;
      }

      return true;
    });

    const newImages: GalleryImage[] = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,

      gallery: [...prev.gallery, ...newImages].slice(0, 8),
    }));

    event.target.value = "";
  };

  const removeImage = (index: number) => {
    setFormData((prev) => {
      const image = prev.gallery[index];

      if (image) {
        URL.revokeObjectURL(image.preview);
      }

      return {
        ...prev,

        gallery: prev.gallery.filter((_, i) => i !== index),
      };
    });
  };

  /* =======================================================
     BENEFITS
  ======================================================= */

  const addBenefit = () => {
    const value = window.prompt("Enter benefit");

    if (!value?.trim()) return;

    setFormData((prev) => ({
      ...prev,

      benefits: [...prev.benefits, value.trim()],
    }));
  };

  const removeBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,

      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  /* =======================================================
     SPECIFICATIONS
  ======================================================= */

  const addSpecification = () => {
    const key = window.prompt("Specification name");

    if (!key?.trim()) return;

    const value = window.prompt(`Value for ${key}`);

    if (!value?.trim()) return;

    setFormData((prev) => ({
      ...prev,

      specifications: {
        ...prev.specifications,

        [key.trim()]: value.trim(),
      },
    }));
  };

  const removeSpecification = (key: string) => {
    setFormData((prev) => {
      const next = {
        ...prev.specifications,
      };

      delete next[key];

      return {
        ...prev,
        specifications: next,
      };
    });
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (status?: ProductStatus) => {
    const submitStatus = status || formData.status;

    /* -----------------------------
       Validation
    ----------------------------- */

    if (!formData.productType) {
      alert("Product type is required");

      return;
    }

    if (!formData.name.trim()) {
      alert("Product name is required");

      return;
    }

    if (!formData.category.trim()) {
      alert("Category is required");

      return;
    }

    if (
      formData.pricing?.sellingPrice !== undefined &&
      formData.pricing.sellingPrice < 0
    ) {
      alert("Selling price cannot be negative");

      return;
    }

    if (
      formData.inventory?.stock !== undefined &&
      formData.inventory.stock < 0
    ) {
      alert("Stock cannot be negative");

      return;
    }

    /* -----------------------------
       Product Specific Validation
    ----------------------------- */

    if (formData.productType === "jewellery") {
      if (!formData.jewellery?.metalType) {
        alert("Metal type is required for jewellery.");

        return;
      }

      if (!formData.jewellery?.purity) {
        alert("Purity is required for jewellery.");

        return;
      }
    }

    if (
      formData.productType === "gemstone" &&
      !formData.gemstone?.gemstoneType
    ) {
      alert("Gemstone type is required.");

      return;
    }

    if (formData.productType === "rudraksha" && !formData.rudraksha?.mukhi) {
      alert("Mukhi is required for Rudraksha.");

      return;
    }

    try {
      setLoading(true);

      /*
       * IMPORTANT:
       *
       * gallery contains File objects.
       * JSON.stringify cannot upload them.
       *
       * For now we remove gallery files from
       * the JSON payload.
       *
       * Upload files to Cloudinary/S3 first,
       * then replace gallery with:
       *
       * {
       *   url: "...",
       *   publicId: "..."
       * }
       */

      const payload = {
        ...formData,

        status: submitStatus,

        gallery: [],
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
        throw new Error(data?.message || "Failed to create product");
      }

      alert("Product created successfully!");

      router.push("/products");

      router.refresh();
    } catch (error: unknown) {
      console.error("Create product error:", error);

      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#fafafa] p-3 font-sans text-[#292d32]">
      <main className="mx-auto max-w-[1500px]">
        <PageHeader
          title="Add Product"
          description="Create a new Gemstone, Rudraksha or Jewellery product"
          showButton={false}
        />

        {/* =================================================
            TOP
        ================================================= */}

        <div className="grid grid-cols-1 gap-2.5 xl:grid-cols-12">
          {/* BASIC INFORMATION */}

          <Section title="Basic Information" className="xl:col-span-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Product Type" required>
                <Select
                  value={formData.productType}
                  onChange={(e) =>
                    handleProductTypeChange(e.target.value as ProductType)
                  }
                  options={[
                    {
                      label: "Gemstone",
                      value: "gemstone",
                    },
                    {
                      label: "Rudraksha",
                      value: "rudraksha",
                    },
                    {
                      label: "Jewellery",
                      value: "jewellery",
                    },
                  ]}
                />
              </Field>

              <Field label="Product Name" required>
                <Input
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </Field>

              <Field label="Indian Name">
                <Input
                  placeholder="Enter Indian name"
                  value={formData.indianName}
                  onChange={(e) => updateField("indianName", e.target.value)}
                />
              </Field>

              <Field label="Category" required>
                <Input
                  placeholder="e.g. Precious"
                  value={formData.category}
                  onChange={(e) => updateField("category", e.target.value)}
                />
              </Field>

              <Field label="Sub Category">
                <Input
                  placeholder="e.g. Ruby"
                  value={formData.subCategory}
                  onChange={(e) => updateField("subCategory", e.target.value)}
                />
              </Field>

              <Field label="Slug">
                <Input
                  placeholder="product-url-slug"
                  value={formData.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                />
              </Field>

              <Field label="Description" className="sm:col-span-2">
                <textarea
                  rows={4}
                  maxLength={1000}
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Enter product description..."
                  className={textareaClass}
                />

                <div className="mt-1 text-right text-[8px] text-slate-400">
                  {formData.description.length}
                  /1000
                </div>
              </Field>
            </div>
          </Section>

          {/* GALLERY */}

          <Section title="Gallery Images" className="xl:col-span-3">
            <ProductImage formData={formData} setFormData={setFormData} />
          </Section>

          {/* SPECIFICATIONS */}

          <Section title="Specifications" className="xl:col-span-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-slate-700">
                Custom Specifications
              </span>

              <button
                type="button"
                onClick={addSpecification}
                className="flex items-center gap-1 rounded border border-slate-200 px-2.5 py-1.5 text-[9px] font-semibold text-slate-700 hover:bg-slate-50"
              >
                <FaPlus />
                Add
              </button>
            </div>

            <div className="min-h-[150px] rounded-md border border-slate-200">
              {Object.keys(formData.specifications).length === 0 ? (
                <EmptyState
                  icon={<FaList />}
                  title="No specifications"
                  description="Add custom specifications for this product"
                />
              ) : (
                <div className="space-y-2 p-3">
                  {Object.entries(formData.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between rounded bg-slate-50 px-3 py-2 text-[10px]"
                      >
                        <div>
                          <span className="font-semibold">{key}</span>

                          <span className="mx-1">:</span>

                          <span>{String(value)}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeSpecification(key)}
                        >
                          <FaTrash className="text-red-400" />
                        </button>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </Section>
        </div>

        {/* =================================================
            GEMSTONE
        ================================================= */}

        {formData.productType === "gemstone" && (
          <Section title="Gemstone Details" className="mt-2.5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <Field label="Gemstone Type" required>
                <Input
                  placeholder="e.g. Ruby"
                  value={formData.gemstone?.gemstoneType ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "gemstone",
                      "gemstoneType",
                      e.target.value,
                    )
                  }
                />
              </Field>

              <Field label="Variety">
                <Input
                  placeholder="e.g. Natural Ruby"
                  value={formData.gemstone?.variety ?? ""}
                  onChange={(e) =>
                    updateNestedField("gemstone", "variety", e.target.value)
                  }
                />
              </Field>

              <Field label="Color">
                <Input
                  placeholder="e.g. Pigeon Blood Red"
                  value={formData.gemstone?.color ?? ""}
                  onChange={(e) =>
                    updateNestedField("gemstone", "color", e.target.value)
                  }
                />
              </Field>

              <Field label="Shape">
                <Input
                  placeholder="e.g. Oval"
                  value={formData.gemstone?.shape ?? ""}
                  onChange={(e) =>
                    updateNestedField("gemstone", "shape", e.target.value)
                  }
                />
              </Field>

              <Field label="Cut">
                <Input
                  placeholder="e.g. Mixed Cut"
                  value={formData.gemstone?.cut ?? ""}
                  onChange={(e) =>
                    updateNestedField("gemstone", "cut", e.target.value)
                  }
                />
              </Field>

              <Field label="Transparency">
                <Input
                  placeholder="e.g. Transparent"
                  value={formData.gemstone?.transparency ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "gemstone",
                      "transparency",
                      e.target.value,
                    )
                  }
                />
              </Field>

              <Field label="Origin">
                <Input
                  placeholder="e.g. Burma"
                  value={formData.gemstone?.origin ?? ""}
                  onChange={(e) =>
                    updateNestedField("gemstone", "origin", e.target.value)
                  }
                />
              </Field>

              <Field label="Treatment">
                <Input
                  placeholder="e.g. Unheated"
                  value={formData.gemstone?.treatment ?? ""}
                  onChange={(e) =>
                    updateNestedField("gemstone", "treatment", e.target.value)
                  }
                />
              </Field>

              <Field label="Weight">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formData.gemstone?.weight ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "gemstone",
                      "weight",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

              <Field label="Weight Unit">
                <Select
                  value={formData.gemstone?.weightUnit ?? ""}
                  onChange={(e) =>
                    updateNestedField("gemstone", "weightUnit", e.target.value)
                  }
                  options={[
                    {
                      label: "Carat",
                      value: "Carat",
                    },
                    {
                      label: "Gram",
                      value: "Gram",
                    },
                  ]}
                />
              </Field>

              <Field label="Length">
                <Input
                  type="number"
                  value={formData.gemstone?.length ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "gemstone",
                      "length",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

              <Field label="Width">
                <Input
                  type="number"
                  value={formData.gemstone?.width ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "gemstone",
                      "width",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

              <Field label="Height">
                <Input
                  type="number"
                  value={formData.gemstone?.height ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "gemstone",
                      "height",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

              <Field label="Hardness">
                <Input
                  placeholder="e.g. 9 Mohs"
                  value={formData.gemstone?.hardness ?? ""}
                  onChange={(e) =>
                    updateNestedField("gemstone", "hardness", e.target.value)
                  }
                />
              </Field>

              <Field label="Refractive Index">
                <Input
                  placeholder="e.g. 1.762 - 1.770"
                  value={formData.gemstone?.refractiveIndex ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "gemstone",
                      "refractiveIndex",
                      e.target.value,
                    )
                  }
                />
              </Field>

              <Field label="Specific Gravity">
                <Input
                  placeholder="e.g. 4.00"
                  value={formData.gemstone?.specificGravity ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "gemstone",
                      "specificGravity",
                      e.target.value,
                    )
                  }
                />
              </Field>

              <Field label="Luster">
                <Input
                  placeholder="e.g. Vitreous"
                  value={formData.gemstone?.luster ?? ""}
                  onChange={(e) =>
                    updateNestedField("gemstone", "luster", e.target.value)
                  }
                />
              </Field>

              <Field label="Quality Grade">
                <Input
                  placeholder="e.g. AAA"
                  value={formData.gemstone?.qualityGrade ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "gemstone",
                      "qualityGrade",
                      e.target.value,
                    )
                  }
                />
              </Field>

              <Field label="Clarity">
                <Input
                  placeholder="e.g. VVS"
                  value={formData.gemstone?.clarity ?? ""}
                  onChange={(e) =>
                    updateNestedField("gemstone", "clarity", e.target.value)
                  }
                />
              </Field>

              <Field label="Color Grade">
                <Input
                  placeholder="e.g. Excellent"
                  value={formData.gemstone?.colorGrade ?? ""}
                  onChange={(e) =>
                    updateNestedField("gemstone", "colorGrade", e.target.value)
                  }
                />
              </Field>

              <Field label="Enhancement">
                <Input
                  placeholder="e.g. None"
                  value={formData.gemstone?.enhancement ?? ""}
                  onChange={(e) =>
                    updateNestedField("gemstone", "enhancement", e.target.value)
                  }
                />
              </Field>
            </div>

            <div className="mt-4 flex flex-wrap gap-5">
              <label className="flex items-center gap-2 text-[9px]">
                <input
                  type="checkbox"
                  checked={formData.gemstone?.natural ?? false}
                  onChange={(e) =>
                    updateNestedField("gemstone", "natural", e.target.checked)
                  }
                />
                Natural
              </label>

              <label className="flex items-center gap-2 text-[9px]">
                <input
                  type="checkbox"
                  checked={formData.gemstone?.synthetic ?? false}
                  onChange={(e) =>
                    updateNestedField("gemstone", "synthetic", e.target.checked)
                  }
                />
                Synthetic
              </label>

              <label className="flex items-center gap-2 text-[9px]">
                <input
                  type="checkbox"
                  checked={formData.gemstone?.heated ?? false}
                  onChange={(e) =>
                    updateNestedField("gemstone", "heated", e.target.checked)
                  }
                />
                Heated
              </label>
            </div>
          </Section>
        )}

        {/* =================================================
            RUDRAKSHA
        ================================================= */}

        {formData.productType === "rudraksha" && (
          <Section title="Rudraksha Details" className="mt-2.5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <Field label="Mukhi" required>
                <Input
                  type="number"
                  placeholder="e.g. 5"
                  value={formData.rudraksha?.mukhi ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "rudraksha",
                      "mukhi",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

              <Field label="Bead Type">
                <Input
                  placeholder="e.g. Natural"
                  value={formData.rudraksha?.beadType ?? ""}
                  onChange={(e) =>
                    updateNestedField("rudraksha", "beadType", e.target.value)
                  }
                />
              </Field>

              <Field label="Origin">
                <Input
                  placeholder="e.g. Nepal"
                  value={formData.rudraksha?.origin ?? ""}
                  onChange={(e) =>
                    updateNestedField("rudraksha", "origin", e.target.value)
                  }
                />
              </Field>

              <Field label="Color">
                <Input
                  placeholder="e.g. Brown"
                  value={formData.rudraksha?.color ?? ""}
                  onChange={(e) =>
                    updateNestedField("rudraksha", "color", e.target.value)
                  }
                />
              </Field>

              <Field label="Shape">
                <Input
                  placeholder="e.g. Round"
                  value={formData.rudraksha?.shape ?? ""}
                  onChange={(e) =>
                    updateNestedField("rudraksha", "shape", e.target.value)
                  }
                />
              </Field>

              <Field label="Size">
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.rudraksha?.size ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "rudraksha",
                      "size",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

              <Field label="Size Unit">
                <Select
                  value={formData.rudraksha?.sizeUnit ?? ""}
                  onChange={(e) =>
                    updateNestedField("rudraksha", "sizeUnit", e.target.value)
                  }
                  options={[
                    {
                      label: "mm",
                      value: "mm",
                    },
                    {
                      label: "cm",
                      value: "cm",
                    },
                  ]}
                />
              </Field>

              <Field label="Weight">
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.rudraksha?.weight ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "rudraksha",
                      "weight",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

              <Field label="Weight Unit">
                <Select
                  value={formData.rudraksha?.weightUnit ?? ""}
                  onChange={(e) =>
                    updateNestedField("rudraksha", "weightUnit", e.target.value)
                  }
                  options={[
                    {
                      label: "Gram",
                      value: "Gram",
                    },
                    {
                      label: "Kg",
                      value: "Kg",
                    },
                  ]}
                />
              </Field>

              <Field label="Quality">
                <Input
                  placeholder="e.g. Premium"
                  value={formData.rudraksha?.quality ?? ""}
                  onChange={(e) =>
                    updateNestedField("rudraksha", "quality", e.target.value)
                  }
                />
              </Field>
            </div>

            <div className="mt-4 flex gap-6">
              <label className="flex items-center gap-2 text-[9px]">
                <input
                  type="checkbox"
                  checked={formData.rudraksha?.energized ?? false}
                  onChange={(e) =>
                    updateNestedField(
                      "rudraksha",
                      "energized",
                      e.target.checked,
                    )
                  }
                />
                Energized
              </label>

              <label className="flex items-center gap-2 text-[9px]">
                <input
                  type="checkbox"
                  checked={formData.rudraksha?.labCertified ?? false}
                  onChange={(e) =>
                    updateNestedField(
                      "rudraksha",
                      "labCertified",
                      e.target.checked,
                    )
                  }
                />
                Lab Certified
              </label>
            </div>
          </Section>
        )}
        {/* =================================================
            JEWELLERY
        ================================================= */}

        {formData.productType === "jewellery" && (
          <Section title="Jewellery Details" className="mt-2.5">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
              {/* METAL */}

              <div className="rounded-md border border-slate-200 p-3">
                <h3 className="mb-3 text-[10px] font-bold">
                  Metal Information
                </h3>

                <div className="space-y-3">
                  <Field label="Metal Type" required>
                    <Input
                      placeholder="e.g. Gold"
                      value={formData.jewellery?.metalType ?? ""}
                      onChange={(e) =>
                        updateNestedField(
                          "jewellery",
                          "metalType",
                          e.target.value,
                        )
                      }
                    />
                  </Field>

                  <Field label="Purity" required>
                    <Input
                      placeholder="e.g. 22K"
                      value={formData.jewellery?.purity ?? ""}
                      onChange={(e) =>
                        updateNestedField("jewellery", "purity", e.target.value)
                      }
                    />
                  </Field>

                  <Field label="Metal Color">
                    <Input
                      placeholder="e.g. Yellow"
                      value={formData.jewellery?.metalColor ?? ""}
                      onChange={(e) =>
                        updateNestedField(
                          "jewellery",
                          "metalColor",
                          e.target.value,
                        )
                      }
                    />
                  </Field>

                  <Field label="Metal Weight">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={formData.jewellery?.metalWeight ?? ""}
                      onChange={(e) =>
                        updateNestedField(
                          "jewellery",
                          "metalWeight",
                          numberValue(e.target.value),
                        )
                      }
                    />
                  </Field>

                  <Field label="Weight Unit">
                    <Select
                      value={formData.jewellery?.metalWeightUnit ?? ""}
                      onChange={(e) =>
                        updateNestedField(
                          "jewellery",
                          "metalWeightUnit",
                          e.target.value,
                        )
                      }
                      options={[
                        {
                          label: "Gram",
                          value: "gram",
                        },
                        {
                          label: "Kg",
                          value: "kg",
                        },
                      ]}
                    />
                  </Field>

                  <Field label="Gross Weight">
                    <Input
                      type="number"
                      value={formData.jewellery?.grossWeight ?? ""}
                      onChange={(e) =>
                        updateNestedField(
                          "jewellery",
                          "grossWeight",
                          numberValue(e.target.value),
                        )
                      }
                    />
                  </Field>

                  <Field label="Net Weight">
                    <Input
                      type="number"
                      value={formData.jewellery?.netWeight ?? ""}
                      onChange={(e) =>
                        updateNestedField(
                          "jewellery",
                          "netWeight",
                          numberValue(e.target.value),
                        )
                      }
                    />
                  </Field>
                </div>
              </div>

              {/* MAKING CHARGES */}

              <div className="rounded-md border border-slate-200 p-3">
                <h3 className="mb-3 text-[10px] font-bold">Making Charges</h3>

                <div className="space-y-3">
                  <Field label="Making Charges">
                    <Input
                      type="number"
                      placeholder="0"
                      value={formData.jewellery?.makingCharges ?? ""}
                      onChange={(e) =>
                        updateNestedField(
                          "jewellery",
                          "makingCharges",
                          numberValue(e.target.value),
                        )
                      }
                    />
                  </Field>

                  <Field label="Charge Type">
                    <Select
                      value={formData.jewellery?.makingChargesType ?? ""}
                      onChange={(e) =>
                        updateNestedField(
                          "jewellery",
                          "makingChargesType",
                          e.target.value,
                        )
                      }
                      options={[
                        {
                          label: "Fixed",
                          value: "fixed",
                        },
                        {
                          label: "Percentage",
                          value: "percentage",
                        },
                      ]}
                    />
                  </Field>

                  <Field label="Making Charges %">
                    <Input
                      type="number"
                      placeholder="0"
                      value={formData.jewellery?.makingChargesPercentage ?? ""}
                      onChange={(e) =>
                        updateNestedField(
                          "jewellery",
                          "makingChargesPercentage",
                          numberValue(e.target.value),
                        )
                      }
                    />
                  </Field>
                </div>
              </div>

              {/* DIAMOND */}

              <div className="rounded-md border border-slate-200 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-[10px] font-bold">Diamond</h3>

                  <Toggle
                    checked={formData.jewellery?.hasDiamond ?? false}
                    onChange={() =>
                      updateNestedField(
                        "jewellery",
                        "hasDiamond",
                        !(formData.jewellery?.hasDiamond ?? false),
                      )
                    }
                  />
                </div>

                {formData.jewellery?.hasDiamond ? (
                  <div className="space-y-3">
                    <Field label="Diamond Type">
                      <Input
                        placeholder="Natural Diamond"
                        value={formData.jewellery?.diamondType ?? ""}
                        onChange={(e) =>
                          updateNestedField(
                            "jewellery",
                            "diamondType",
                            e.target.value,
                          )
                        }
                      />
                    </Field>

                    <Field label="Count">
                      <Input
                        type="number"
                        value={formData.jewellery?.diamondCount ?? ""}
                        onChange={(e) =>
                          updateNestedField(
                            "jewellery",
                            "diamondCount",
                            numberValue(e.target.value),
                          )
                        }
                      />
                    </Field>

                    <Field label="Weight">
                      <Input
                        type="number"
                        value={formData.jewellery?.diamondWeight ?? ""}
                        onChange={(e) =>
                          updateNestedField(
                            "jewellery",
                            "diamondWeight",
                            numberValue(e.target.value),
                          )
                        }
                      />
                    </Field>

                    <Field label="Weight Unit">
                      <Select
                        value={formData.jewellery?.diamondWeightUnit ?? ""}
                        onChange={(e) =>
                          updateNestedField(
                            "jewellery",
                            "diamondWeightUnit",
                            e.target.value,
                          )
                        }
                        options={[
                          {
                            label: "Carat",
                            value: "carat",
                          },
                          {
                            label: "Gram",
                            value: "gram",
                          },
                        ]}
                      />
                    </Field>

                    <Field label="Color">
                      <Input
                        placeholder="G"
                        value={formData.jewellery?.diamondColor ?? ""}
                        onChange={(e) =>
                          updateNestedField(
                            "jewellery",
                            "diamondColor",
                            e.target.value,
                          )
                        }
                      />
                    </Field>

                    <Field label="Clarity">
                      <Input
                        placeholder="VS"
                        value={formData.jewellery?.diamondClarity ?? ""}
                        onChange={(e) =>
                          updateNestedField(
                            "jewellery",
                            "diamondClarity",
                            e.target.value,
                          )
                        }
                      />
                    </Field>

                    <Field label="Cut">
                      <Input
                        placeholder="Excellent"
                        value={formData.jewellery?.diamondCut ?? ""}
                        onChange={(e) =>
                          updateNestedField(
                            "jewellery",
                            "diamondCut",
                            e.target.value,
                          )
                        }
                      />
                    </Field>

                    <Field label="Shape">
                      <Input
                        placeholder="Round"
                        value={formData.jewellery?.diamondShape ?? ""}
                        onChange={(e) =>
                          updateNestedField(
                            "jewellery",
                            "diamondShape",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                  </div>
                ) : (
                  <EmptyState
                    icon={<FaImage />}
                    title="No diamond"
                    description="Enable the toggle to add diamond details"
                  />
                )}
              </div>

              {/* GEMSTONE */}

              <div className="rounded-md border border-slate-200 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-[10px] font-bold">Gemstone</h3>

                  <Toggle
                    checked={formData.jewellery?.hasGemstone ?? false}
                    onChange={() =>
                      updateNestedField(
                        "jewellery",
                        "hasGemstone",
                        !(formData.jewellery?.hasGemstone ?? false),
                      )
                    }
                  />
                </div>

                {formData.jewellery?.hasGemstone ? (
                  <div className="space-y-3">
                    <Field label="Gemstone Type">
                      <Input
                        placeholder="e.g. Ruby"
                        value={formData.jewellery?.gemstoneType ?? ""}
                        onChange={(e) =>
                          updateNestedField(
                            "jewellery",
                            "gemstoneType",
                            e.target.value,
                          )
                        }
                      />
                    </Field>

                    <Field label="Count">
                      <Input
                        type="number"
                        value={formData.jewellery?.gemstoneCount ?? ""}
                        onChange={(e) =>
                          updateNestedField(
                            "jewellery",
                            "gemstoneCount",
                            numberValue(e.target.value),
                          )
                        }
                      />
                    </Field>

                    <Field label="Weight">
                      <Input
                        type="number"
                        value={formData.jewellery?.gemstoneWeight ?? ""}
                        onChange={(e) =>
                          updateNestedField(
                            "jewellery",
                            "gemstoneWeight",
                            numberValue(e.target.value),
                          )
                        }
                      />
                    </Field>

                    <Field label="Weight Unit">
                      <Select
                        value={formData.jewellery?.gemstoneWeightUnit ?? ""}
                        onChange={(e) =>
                          updateNestedField(
                            "jewellery",
                            "gemstoneWeightUnit",
                            e.target.value,
                          )
                        }
                        options={[
                          {
                            label: "Carat",
                            value: "carat",
                          },
                          {
                            label: "Gram",
                            value: "gram",
                          },
                        ]}
                      />
                    </Field>
                  </div>
                ) : (
                  <EmptyState
                    icon={<FaImage />}
                    title="No gemstone"
                    description="Enable the toggle to add gemstone details"
                  />
                )}
              </div>
            </div>

            {/* OTHER JEWELLERY DETAILS */}

            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-4">
              <Field label="Setting Type">
                <Input
                  placeholder="Prong Setting"
                  value={formData.jewellery?.settingType ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "jewellery",
                      "settingType",
                      e.target.value,
                    )
                  }
                />
              </Field>

              <Field label="Size">
                <Input
                  placeholder="18"
                  value={formData.jewellery?.size ?? ""}
                  onChange={(e) =>
                    updateNestedField("jewellery", "size", e.target.value)
                  }
                />
              </Field>

              <Field label="Dimensions">
                <Input
                  placeholder="20 x 10 mm"
                  value={formData.jewellery?.dimensions ?? ""}
                  onChange={(e) =>
                    updateNestedField("jewellery", "dimensions", e.target.value)
                  }
                />
              </Field>

              <Field label="Collection">
                <Input
                  placeholder="Wedding Collection"
                  value={formData.jewellery?.collection ?? ""}
                  onChange={(e) =>
                    updateNestedField("jewellery", "collection", e.target.value)
                  }
                />
              </Field>

              <Field label="Occasion">
                <Input
                  placeholder="Wedding"
                  value={formData.jewellery?.occasion ?? ""}
                  onChange={(e) =>
                    updateNestedField("jewellery", "occasion", e.target.value)
                  }
                />
              </Field>

              <Field label="Gender">
                <Select
                  value={formData.jewellery?.gender ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "jewellery",
                      "gender",
                      e.target.value as Gender,
                    )
                  }
                  options={[
                    {
                      label: "Men",
                      value: "Men",
                    },
                    {
                      label: "Women",
                      value: "Women",
                    },
                    {
                      label: "Unisex",
                      value: "Unisex",
                    },
                  ]}
                />
              </Field>

              <Field label="Length">
                <Input
                  type="number"
                  value={formData.jewellery?.length ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "jewellery",
                      "length",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

              <Field label="Width">
                <Input
                  type="number"
                  value={formData.jewellery?.width ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "jewellery",
                      "width",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>
            </div>
          </Section>
        )}

        {/* =================================================
            CERTIFICATION
        ================================================= */}

        {(formData.productType === "gemstone" ||
          formData.productType === "rudraksha") && (
          <Section title="Certification" className="mt-2.5">
            <div className="mb-3 flex items-center gap-2">
              <Toggle
                checked={formData.certification?.certified ?? false}
                onChange={() =>
                  updateNestedField(
                    "certification",
                    "certified",
                    !(formData.certification?.certified ?? false),
                  )
                }
              />

              <span className="text-[10px] font-semibold">Certified</span>
            </div>

            {formData.certification?.certified && (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <Field label="Certification Type">
                  <Input
                    placeholder="Gemstone Report"
                    value={formData.certification?.certificationType ?? ""}
                    onChange={(e) =>
                      updateNestedField(
                        "certification",
                        "certificationType",
                        e.target.value,
                      )
                    }
                  />
                </Field>

                <Field label="Lab Name">
                  <Input
                    placeholder="GIA / IGI"
                    value={formData.certification?.labName ?? ""}
                    onChange={(e) =>
                      updateNestedField(
                        "certification",
                        "labName",
                        e.target.value,
                      )
                    }
                  />
                </Field>

                <Field label="Certificate Number">
                  <Input
                    placeholder="Certificate number"
                    value={formData.certification?.certificateNumber ?? ""}
                    onChange={(e) =>
                      updateNestedField(
                        "certification",
                        "certificateNumber",
                        e.target.value,
                      )
                    }
                  />
                </Field>

                <Field label="Issue Date">
                  <Input
                    type="date"
                    value={formData.certification?.issueDate ?? ""}
                    onChange={(e) =>
                      updateNestedField(
                        "certification",
                        "issueDate",
                        e.target.value,
                      )
                    }
                  />
                </Field>
              </div>
            )}

            <div className="mt-3 flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.certification?.xrayVerified ?? false}
                onChange={(e) =>
                  updateNestedField(
                    "certification",
                    "xrayVerified",
                    e.target.checked,
                  )
                }
              />

              <span className="text-[9px]">X-Ray Verified</span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              <Field label="Certificate PDF">
                <button
                  type="button"
                  className="flex h-9 w-full items-center justify-center gap-2 rounded-md border border-slate-200 text-[9px] font-semibold"
                >
                  <FaArrowUpFromBracket />
                  Upload PDF
                </button>
              </Field>

              <Field label="Certificate Image">
                <button
                  type="button"
                  className="flex h-9 w-full items-center justify-center gap-2 rounded-md border border-slate-200 text-[9px] font-semibold"
                >
                  <FaArrowUpFromBracket />
                  Upload Image
                </button>
              </Field>
            </div>
          </Section>
        )}

        {/* =================================================
            JEWELLERY HALLMARK
        ================================================= */}

        {formData.productType === "jewellery" && (
          <Section title="Hallmark & Jewellery Certificate" className="mt-2.5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <Field label="Hallmark">
                <Input
                  placeholder="e.g. BIS"
                  value={formData.jewellery?.hallmark ?? ""}
                  onChange={(e) =>
                    updateNestedField("jewellery", "hallmark", e.target.value)
                  }
                />
              </Field>

              <Field label="Hallmark Number">
                <Input
                  placeholder="HUID123456"
                  value={formData.jewellery?.hallmarkNumber ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "jewellery",
                      "hallmarkNumber",
                      e.target.value,
                    )
                  }
                />
              </Field>

              <div className="flex items-end">
                <label className="mb-2 flex items-center gap-2 text-[9px] font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.jewellery?.hallmarkVerified ?? false}
                    onChange={(e) =>
                      updateNestedField(
                        "jewellery",
                        "hallmarkVerified",
                        e.target.checked,
                      )
                    }
                  />
                  Hallmark Verified
                </label>
              </div>

              <div />
            </div>
          </Section>
        )}

        <div className="grid grid-cols-1 gap-2.5 xl:grid-cols-12 mt-2.5 ">
          {/* =================================================
            PRICING
        ================================================= */}

          <Section title="Pricing" className="xl:col-span-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Currency">
                <Select
                  value={formData.pricing?.currency ?? ""}
                  onChange={(e) =>
                    updateNestedField("pricing", "currency", e.target.value)
                  }
                  options={[
                    {
                      label: "INR",
                      value: "INR",
                    },
                    {
                      label: "USD",
                      value: "USD",
                    },
                    {
                      label: "EUR",
                      value: "EUR",
                    },
                  ]}
                />
              </Field>

              <Field label="Cost Price">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formData.pricing?.costPrice ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "pricing",
                      "costPrice",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

              <Field label="Selling Price" required>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formData.pricing?.sellingPrice ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "pricing",
                      "sellingPrice",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

              <Field label="Sale Price">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formData.pricing?.salePrice ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "pricing",
                      "salePrice",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

              <Field label="Discount %">
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.pricing?.discount ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "pricing",
                      "discount",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

              <Field label="GST %">
                <Input
                  type="number"
                  placeholder="3"
                  value={formData.pricing?.gst ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "pricing",
                      "gst",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>
            </div>
          </Section>

          {/* =================================================
            INVENTORY
        ================================================= */}

          <Section title="Inventory" className="xl:col-span-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Stock">
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.inventory?.stock ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "inventory",
                      "stock",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

              <Field label="Stock Status">
                <Select
                  value={formData.inventory?.stockStatus ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "inventory",
                      "stockStatus",
                      e.target.value as StockStatus,
                    )
                  }
                  options={[
                    {
                      label: "In Stock",
                      value: "In Stock",
                    },
                    {
                      label: "Out of Stock",
                      value: "Out of Stock",
                    },
                    {
                      label: "Low Stock",
                      value: "Low Stock",
                    },
                  ]}
                />
              </Field>

              <Field label="Low Stock Alert">
                <Input
                  type="number"
                  value={formData.inventory?.lowStockAlert ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "inventory",
                      "lowStockAlert",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

              <Field label="Reserved Stock">
                <Input
                  type="number"
                  value={formData.inventory?.reservedStock ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "inventory",
                      "reservedStock",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

             
            </div>
          </Section>

          {/* =================================================
            SEO
        ================================================= */}

          <Section title="SEO" className="xl:col-span-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
              <Field label="Meta Title">
                <Input
                  placeholder="Enter meta title"
                  value={formData.seo?.metaTitle ?? ""}
                  onChange={(e) =>
                    updateNestedField("seo", "metaTitle", e.target.value)
                  }
                />
              </Field>

              <Field label="Meta Description">
                <textarea
                  rows={3}
                  maxLength={160}
                  value={formData.seo?.metaDescription ?? ""}
                  onChange={(e) =>
                    updateNestedField("seo", "metaDescription", e.target.value)
                  }
                  placeholder="Enter meta description"
                  className={textareaClass}
                />

                <div className="mt-1 text-right text-[8px] text-slate-400">
                  {formData.seo?.metaDescription?.length}
                  /160
                </div>
              </Field>
            </div>
          </Section>
        </div>

        <div className="grid grid-cols-1 gap-2.5 xl:grid-cols-12 mt-2.5 ">
          {/* =================================================
            ASTROLOGY
        ================================================= */}

          {(formData.productType === "gemstone" ||
            formData.productType === "rudraksha") && (
            <Section title="Astrology Details" className="xl:col-span-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Planet">
                  <Input
                    placeholder="e.g. Jupiter"
                    value={formData.astrology?.planet ?? ""}
                    onChange={(e) =>
                      updateNestedField("astrology", "planet", e.target.value)
                    }
                  />
                </Field>

                <Field label="Zodiac Sign">
                  <Select
                    value={formData.astrology?.zodiacSigns?.[0] ?? ""}
                    onChange={(e) =>
                      updateNestedField(
                        "astrology",
                        "zodiacSigns",
                        e.target.value ? [e.target.value] : [],
                      )
                    }
                    options={[
                      "Aries",
                      "Taurus",
                      "Gemini",
                      "Cancer",
                      "Leo",
                      "Virgo",
                      "Libra",
                      "Scorpio",
                      "Sagittarius",
                      "Capricorn",
                      "Aquarius",
                      "Pisces",
                    ].map((item) => ({
                      label: item,
                      value: item,
                    }))}
                  />
                </Field>

                <Field label="Wear Day">
                  <Input
                    placeholder="e.g. Sunday"
                    value={formData.astrology?.wearDay ?? ""}
                    onChange={(e) =>
                      updateNestedField("astrology", "wearDay", e.target.value)
                    }
                  />
                </Field>

                <Field label="Wear Method">
                  <Input
                    placeholder="After Sunrise"
                    value={formData.astrology?.wearMethod ?? ""}
                    onChange={(e) =>
                      updateNestedField(
                        "astrology",
                        "wearMethod",
                        e.target.value,
                      )
                    }
                  />
                </Field>

                <Field label="Finger">
                  <Input
                    placeholder="Ring Finger"
                    value={formData.astrology?.finger ?? ""}
                    onChange={(e) =>
                      updateNestedField("astrology", "finger", e.target.value)
                    }
                  />
                </Field>

                <Field label="Metal">
                  <Input
                    placeholder="Gold"
                    value={formData.astrology?.metal ?? ""}
                    onChange={(e) =>
                      updateNestedField("astrology", "metal", e.target.value)
                    }
                  />
                </Field>

                <Field label="Thread Color">
                  <Input
                    placeholder="Yellow"
                    value={formData.astrology?.threadColor ?? ""}
                    onChange={(e) =>
                      updateNestedField(
                        "astrology",
                        "threadColor",
                        e.target.value,
                      )
                    }
                  />
                </Field>

                <Field label="Purification">
                  <Input
                    placeholder="Milk, Ganga Jal"
                    value={formData.astrology?.purificationMethod ?? ""}
                    onChange={(e) =>
                      updateNestedField(
                        "astrology",
                        "purificationMethod",
                        e.target.value,
                      )
                    }
                  />
                </Field>
              </div>
            </Section>
          )}

          {/* =================================================
            BENEFITS
        ================================================= */}

          {(formData.productType === "gemstone" ||
            formData.productType === "rudraksha") && (
            <Section title="Benefits" className="xl:col-span-3">
              <div className="mb-3 flex justify-end">
                <button
                  type="button"
                  onClick={addBenefit}
                  className="flex items-center gap-1 rounded border border-slate-200 px-2.5 py-1.5 text-[9px] font-semibold"
                >
                  <FaPlus />
                  Add Benefit
                </button>
              </div>

              {formData.benefits.length === 0 ? (
                <EmptyState
                  icon={<FaRegCircleCheck />}
                  title="No benefits added"
                  description="Add product benefits"
                />
              ) : (
                <div className="space-y-2">
                  {formData.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex justify-between rounded bg-slate-50 px-3 py-2 text-[10px]"
                    >
                      <span>{benefit}</span>

                      <button
                        type="button"
                        onClick={() => removeBenefit(index)}
                      >
                        <FaTrash className="text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          )}

          {/* =================================================
            CARE
        ================================================= */}

          <Section title="Care Instructions" className="xl:col-span-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
              <Field label="Cleaning">
                <textarea
                  rows={3}
                  value={formData.careInstructions?.cleaning ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "careInstructions",
                      "cleaning",
                      e.target.value,
                    )
                  }
                  placeholder="Clean with soft cloth"
                  className={textareaClass}
                />
              </Field>

              <Field label="Storage">
                <textarea
                  rows={3}
                  value={formData.careInstructions?.storage ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "careInstructions",
                      "storage",
                      e.target.value,
                    )
                  }
                  placeholder="Store in dry place"
                  className={textareaClass}
                />
              </Field>

              <Field label="Precautions">
                <textarea
                  rows={3}
                  value={formData.careInstructions?.precautions ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "careInstructions",
                      "precautions",
                      e.target.value,
                    )
                  }
                  placeholder="Avoid chemical exposure"
                  className={textareaClass}
                />
              </Field>
            </div>
          </Section>
        </div>
        <div className="grid grid-cols-1 gap-2.5 xl:grid-cols-12 mt-2.5 ">
          {/* =================================================
            STATUS
        ================================================= */}

          <Section title="Product Status" className="xl:col-span-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
              <Field label="Status">
                <Select
                  value={formData.status}
                  onChange={(e) =>
                    updateField("status", e.target.value as ProductStatus)
                  }
                  options={[
                    {
                      label: "Draft",
                      value: "Draft",
                    },
                    {
                      label: "Published",
                      value: "Published",
                    },
                    {
                      label: "Archived",
                      value: "Archived",
                    },
                  ]}
                />
              </Field>
            </div>
          </Section>
        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="mt-3 flex justify-end gap-2 border-t border-slate-200 py-4">
          <button
            type="button"
            onClick={() => router.push("/products")}
            disabled={loading}
            className="h-9 rounded-md border border-slate-200 bg-white px-5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit("Draft")}
            className="h-9 rounded-md border border-[#ead9c8] bg-[#f8eee6] px-5 text-[11px] font-semibold text-slate-800 hover:bg-[#f5e8dd] disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save as Draft"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit("Published")}
            className="h-9 rounded-md bg-slate-900 px-5 text-[11px] font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Product"}
          </button>
        </div>
      </main>
    </div>
  );
}
