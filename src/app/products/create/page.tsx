// "use client";

// import ProductForm from "@/components/product/ProductForm";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// /* =========================================================
//    TYPES
// ========================================================= */

// type ProductType = "gemstone" | "rudraksha" | "jewellery";

// type ProductStatus = "Draft" | "Published" | "Archived";

// type StockStatus =
//   | "In Stock"
//   | "Out of Stock"
//   | "Low Stock";

// interface GalleryImage {
//   url: string;
//   publicId: string;
// }

// interface ProductFormData {
//   productType: ProductType;

//   sku: string;

//   name: string;

//   indianName: string;

//   slug: string;

//   description: string;

//   gallery: GalleryImage[];

//   category: string;

//   subCategory: string;

//   specifications: Record<string, any>;

//   jewellery?: {
//     metalType?: string;
//     purity?: string;
//     metalColor?: string;

//     metalWeight?: number;
//     metalWeightUnit?: "gram" | "kg";

//     makingCharges?: number;
//     makingChargesType?: "fixed" | "percentage";
//     makingChargesPercentage?: number;

//     hasDiamond?: boolean;
//     diamondType?: string;
//     diamondCount?: number;
//     diamondWeight?: number;
//     diamondWeightUnit?: "carat" | "gram";

//     diamondColor?: string;
//     diamondClarity?: string;
//     diamondCut?: string;
//     diamondShape?: string;

//     hasGemstone?: boolean;
//     gemstoneType?: string;
//     gemstoneCount?: number;
//     gemstoneWeight?: number;
//     gemstoneWeightUnit?: "carat" | "gram";

//     grossWeight?: number;
//     netWeight?: number;

//     length?: number;
//     width?: number;

//     size?: string;
//     dimensions?: string;

//     settingType?: string;

//     hallmark?: string;
//     hallmarkNumber?: string;
//     hallmarkVerified?: boolean;

//     certificateIncluded?: boolean;
//     certificateNumber?: string;
//     certificateType?: string;
//     certificateLab?: string;

//     collection?: string;
//     occasion?: string;

//     gender?: "Men" | "Women" | "Unisex";

//     availableSizes?: string[];

//     customizable?: boolean;
//   };

//   astrology?: {
//     planet?: string;

//     zodiacSigns?: string[];

//     wearDay?: string;

//     wearMethod?: string;

//     finger?: string;

//     metal?: string;

//     threadColor?: string;

//     purificationMethod?: string;
//   };

//   certification?: {
//     certified?: boolean;

//     certificationType?: string;

//     labName?: string;

//     certificateNumber?: string;

//     issueDate?: string;

//     xrayVerified?: boolean;

//     certificatePdf?: string;

//     certificateImage?: string;
//   };

//   pricing?: {
//     currency?: string;

//     costPrice?: number;

//     sellingPrice?: number;

//     salePrice?: number;

//     discount?: number;

//     gst?: number;

//     taxClass?: string;
//   };

//   inventory?: {
//     stock?: number;

//     stockStatus?: StockStatus;

//     lowStockAlert?: number;

//     reservedStock?: number;

//     warehouse?: string;
//   };

//   benefits?: string[];

//   seo?: {
//     metaTitle?: string;

//     metaDescription?: string;
//   };

//   careInstructions?: {
//     cleaning?: string;

//     storage?: string;

//     precautions?: string;
//   };

//   status: ProductStatus;

//   createdBy?: string;

//   updatedBy?: string;
// }

// /* =========================================================
//    INITIAL FORM DATA
// ========================================================= */

// const initialFormData: ProductFormData = {
//   /* -------------------------
//      Product
//   ------------------------- */

//   productType: "gemstone",

//   sku: "GEM-RUBY-001",

//   name: "Natural Ruby",

//   indianName: "Manik",

//   slug: "natural-ruby",

//   description:
//     "This natural Ruby (Manik) is sourced from Burma and is known for its deep red color, excellent transparency, and astrological significance. It is recommended for strengthening the Sun and is suitable for those seeking confidence, leadership, and success.",

//   /* -------------------------
//      Gallery
//   ------------------------- */

//   gallery: [],

//   /* -------------------------
//      Category
//   ------------------------- */

//   category: "Precious",

//   subCategory: "Ruby",

//   /* -------------------------
//      Gemstone Specifications
//   ------------------------- */

//   specifications: {
//     /* Basic */

//     gemstoneType: "Ruby",

//     variety: "Natural Ruby",

//     color: "Pigeon Blood Red",

//     shape: "Oval",

//     cut: "Mixed Cut",

//     transparency: "Transparent",

//     origin: "Burma (Myanmar)",

//     treatment: "Unheated",

//     /* Weight */

//     weight: {
//       value: 5.25,

//       unit: "Carat",
//     },

//     /* Dimensions */

//     dimensions: {
//       length: 11.2,

//       width: 8.6,

//       height: 5.1,

//       unit: "mm",
//     },

//     /* Physical Properties */

//     hardness: "9 Mohs",

//     refractiveIndex: "1.762 - 1.770",

//     specificGravity: "4.00",

//     luster: "Vitreous",

//     /* Quality */

//     quality: {
//       grade: "AAA",

//       clarity: "VVS",

//       colorGrade: "Excellent",

//       natural: true,

//       synthetic: false,

//       heated: false,

//       enhancement: "None",
//     },
//   },

//   /* =======================================================
//      JEWELLERY

//      Empty for gemstone product.
//      When productType = jewellery, populate this object.
//   ======================================================= */

//   jewellery: undefined,

//   /* -------------------------
//      Astrology
//   ------------------------- */

//   astrology: {
//     planet: "Sun",

//     zodiacSigns: [
//       "Leo",
//       "Aries",
//       "Scorpio",
//     ],

//     wearDay: "Sunday",

//     wearMethod: "",

//     finger: "Ring Finger",

//     metal: "Gold",

//     threadColor: "",

//     purificationMethod: "",
//   },

//   /* -------------------------
//      Certification
//   ------------------------- */

//   certification: {
//     certified: true,

//     labName: "IGI",

//     certificateNumber: "IGI-RB-202600123",

//     certificationType: "Natural Gemstone",

//     issueDate: "2026-07-15",

//     certificatePdf: "/certificates/ruby.pdf",

//     certificateImage: "/certificates/ruby.jpg",

//     xrayVerified: false,
//   },

//   /* -------------------------
//      Inventory
//   ------------------------- */

//   inventory: {
//     stock: 12,

//     stockStatus: "In Stock",

//     lowStockAlert: 3,

//     reservedStock: 0,

//     warehouse: "Main Warehouse",
//   },

//   /* -------------------------
//      Pricing
//   ------------------------- */

//   pricing: {
//     currency: "INR",

//     costPrice: 42000,

//     sellingPrice: 50000,

//     salePrice: 47500,

//     discount: 5,

//     gst: 3,

//     taxClass: "",
//   },

//   /* -------------------------
//      Benefits
//   ------------------------- */

//   benefits: [
//     "Boosts confidence",

//     "Enhances leadership qualities",

//     "Improves career growth",

//     "Provides protection from negativity",

//     "Attracts success and prosperity",
//   ],

//   /* -------------------------
//      Care Instructions
//   ------------------------- */

//   careInstructions: {
//     cleaning:
//       "Clean with lukewarm water and a soft cloth.",

//     storage:
//       "Store separately in a jewelry box to prevent scratches.",

//     precautions:
//       "Avoid harsh chemicals and ultrasonic cleaners.",
//   },

//   /* -------------------------
//      SEO
//   ------------------------- */

//   seo: {
//     metaTitle:
//       "Buy Natural Ruby (Manik) Online | Certified Gemstone",

//     metaDescription:
//       "Shop certified natural Ruby (Manik) gemstone with lab certification, free shipping, and best price in India.",
//   },

//   /* -------------------------
//      Status
//   ------------------------- */

//   status: "Published",
// };

// /* =========================================================
//    PAGE
// ========================================================= */

// export default function CreateProductPage() {
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] =
//     useState<ProductFormData>(initialFormData);

//   /* =======================================================
//      SUBMIT
//   ======================================================= */

//   const handleSubmit = async () => {
//     /* -------------------------
//        Basic Validation
//     ------------------------- */

//     if (!formData.productType) {
//       alert("Product type is required");

//       return;
//     }

//     if (!formData.name.trim()) {
//       alert("Product name is required");

//       return;
//     }

//     if (!formData.sku.trim()) {
//       alert("SKU is required");

//       return;
//     }

//     if (!formData.slug.trim()) {
//       alert("Slug is required");

//       return;
//     }

//     if (!formData.category.trim()) {
//       alert("Category is required");

//       return;
//     }

//     /* -------------------------
//        Jewellery Validation
//     ------------------------- */

//     if (formData.productType === "jewellery") {
//       if (!formData.jewellery?.metalType) {
//         alert("Metal type is required for jewellery");

//         return;
//       }

//       if (!formData.jewellery?.purity) {
//         alert("Purity is required for jewellery");

//         return;
//       }
//     }

//     /* -------------------------
//        Pricing Validation
//     ------------------------- */

//     if (
//       formData.pricing?.sellingPrice !== undefined &&
//       formData.pricing.sellingPrice < 0
//     ) {
//       alert("Selling price cannot be negative");

//       return;
//     }

//     /* -------------------------
//        Inventory Validation
//     ------------------------- */

//     if (
//       formData.inventory?.stock !== undefined &&
//       formData.inventory.stock < 0
//     ) {
//       alert("Stock cannot be negative");

//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch("/api/products", {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data?.message ||
//             "Failed to create product",
//         );
//       }

//       alert("Product added successfully!");

//       router.push("/products");

//       router.refresh();
//     } catch (error: unknown) {
//       console.error(
//         "Create product error:",
//         error,
//       );

//       if (error instanceof Error) {
//         alert(error.message);
//       } else {
//         alert("Something went wrong");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <main className="min-h-screen bg-gray-50">
//       <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//         <ProductForm
//           formData={formData}
//           setFormData={setFormData}
//           handleSubmit={handleSubmit}
//           loading={loading}
//         />
//       </div>
//     </main>
//   );
// }

"use client";

import PageHeader from "@/components/pageheader/PageHeader";
import React, { ChangeEvent, useRef, useState } from "react";
import {
  FaArrowUpFromBracket,
  FaCalendarDays,
  FaCircleInfo,
  FaCloudArrowUp,
  FaDiamond,
  FaImage,
  FaList,
  FaPlus,
  FaRegCircleCheck,
  FaRegGem,
  FaTrash,
} from "react-icons/fa6";

type Option = {
  label: string;
  value: string;
};

const inputClass =
  "w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:ring-1 focus:ring-slate-200";

const labelClass = "mb-1.5 block text-[10px] font-semibold text-slate-700";

const selectClass =
  "w-full h-9 appearance-none rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200";

const textareaClass =
  "w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:ring-1 focus:ring-slate-200";

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
    value={value}
    onChange={onChange}
    className={inputClass}
  />
);

const Select = ({
  options,
  placeholder = "Select",
}: {
  options: Option[];
  placeholder?: string;
}) => (
  <div className="relative">
    <select className={selectClass} defaultValue="">
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
  <div className="flex h-full min-h-[135px] flex-col items-center justify-center text-center">
    <div className="mb-3 text-xl text-slate-400">{icon}</div>
    <p className="text-[11px] font-semibold text-slate-600">{title}</p>
    <p className="mt-1 max-w-[230px] text-[9px] leading-4 text-slate-400">
      {description}
    </p>
  </div>
);

export default function AddProduct() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<string[]>([]);
  const [certified, setCertified] = useState(false);
  const [containsDiamond, setContainsDiamond] = useState(false);
  const [containsGemstone, setContainsGemstone] = useState(false);
  const [hallmarkVerified, setHallmarkVerified] = useState(false);
  const [certificateIncluded, setCertificateIncluded] = useState(false);
  const [customizable, setCustomizable] = useState(false);

  const [specifications, setSpecifications] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);

  const [description, setDescription] = useState("");

  const handleImages = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    const newImages = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...newImages].slice(0, 8));
  };

  const addSpecification = () => {
    const value = window.prompt("Enter specification");
    if (value?.trim()) {
      setSpecifications((prev) => [...prev, value.trim()]);
    }
  };

  const addBenefit = () => {
    const value = window.prompt("Enter benefit");
    if (value?.trim()) {
      setBenefits((prev) => [...prev, value.trim()]);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-3 font-sans text-[#292d32]">
      <main className="mx-auto max-w-[1500px] px-5 py-3">
        <PageHeader
          title="Add Product"
          description="Create a new product (Gemstone, Rudraksha or Jewellery)"
          showButton={false}
        />
        <div className="grid grid-cols-1 gap-2.5 xl:grid-cols-12">
          {/* Basic Information */}
          <Section title="Basic Information" className="xl:col-span-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Product Type" required>
                <Select
                  placeholder="Gemstone"
                  options={[
                    { label: "Gemstone", value: "gemstone" },
                    { label: "Rudraksha", value: "rudraksha" },
                    { label: "Jewellery", value: "jewellery" },
                  ]}
                />
              </Field>

              <Field label="SKU" required>
                <Input placeholder="Enter SKU" />
              </Field>

              <Field label="Product Name" required className="sm:col-span-2">
                <Input placeholder="Enter product name" />
              </Field>

              <Field label="Indian Name">
                <Input placeholder="Enter indian name (optional)" />
              </Field>

              <Field label="Slug" required>
                <Input placeholder="Enter slug (url-friendly)" />
                <p className="mt-1 text-[8px] text-slate-400">
                  This will be used in the product URL
                </p>
              </Field>

              <Field label="Description" className="sm:col-span-2">
                <textarea
                  rows={4}
                  maxLength={1000}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter product description..."
                  className={textareaClass}
                />
                <div className="mt-1 text-right text-[8px] text-slate-400">
                  {description.length}/1000
                </div>
              </Field>
            </div>
          </Section>

          {/* Gallery */}
          <Section title="Gallery Images" className="xl:col-span-3">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex h-[148px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50/30 transition hover:bg-slate-50"
            >
              <FaCloudArrowUp className="mb-3 text-2xl text-slate-400" />

              <p className="text-[10px] font-semibold text-slate-700">
                Drag & drop images here
              </p>

              <p className="mt-1 text-[9px] text-slate-500">
                or click to upload
              </p>

              <p className="mt-3 text-[8px] text-slate-400">
                Recommended: 800x800px, Max 5MB
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImages}
              />
            </div>

            <div className="mt-3 grid grid-cols-8 gap-1.5">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="relative flex h-11 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white"
                >
                  {images[index] ? (
                    <>
                      <img
                        src={images[index]}
                        alt={`Product ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setImages((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                        className="absolute right-0.5 top-0.5 rounded bg-white/90 p-1 text-red-500"
                      >
                        <FaTrash className="text-[7px]" />
                      </button>
                    </>
                  ) : (
                    <FaImage className="text-slate-300" />
                  )}
                </div>
              ))}
            </div>

            <p className="mt-2 text-[8px] text-slate-500">
              You can upload up to 8 images
            </p>
          </Section>

          {/* Category */}
          <Section title="Category & Sub Category" className="xl:col-span-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Category" required>
                <Select
                  placeholder="Select Category"
                  options={[
                    { label: "Gemstones", value: "gemstones" },
                    { label: "Rudraksha", value: "rudraksha" },
                    { label: "Jewellery", value: "jewellery" },
                  ]}
                />
              </Field>

              <Field label="Sub Category">
                <Select
                  placeholder="Select Sub Category"
                  options={[
                    { label: "Natural Gemstone", value: "natural" },
                    { label: "Certified Gemstone", value: "certified" },
                    { label: "Rings", value: "rings" },
                    { label: "Bracelets", value: "bracelets" },
                  ]}
                />
              </Field>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-slate-700">
                Specifications
              </span>

              <button
                type="button"
                onClick={addSpecification}
                className="flex items-center gap-1 rounded border border-slate-200 px-2.5 py-1.5 text-[9px] font-semibold text-slate-700 hover:bg-slate-50"
              >
                <FaPlus />
                Add Specification
              </button>
            </div>

            <div className="mt-2 min-h-[135px] rounded-md border border-slate-200">
              {specifications.length === 0 ? (
                <EmptyState
                  icon={<FaList />}
                  title="No specifications added yet"
                  description='Click "Add Specification" to add product specifications'
                />
              ) : (
                <div className="space-y-2 p-3">
                  {specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded bg-slate-50 px-3 py-2 text-[10px]"
                    >
                      <span>{spec}</span>
                      <button
                        onClick={() =>
                          setSpecifications((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                      >
                        <FaTrash className="text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Section>

          {/* Astrology */}
          <Section title="Astrology Details" className="xl:col-span-5">
            <div className="grid grid-cols-3 gap-3">
              <Field label="Planet">
                <Input placeholder="e.g. Jupiter" />
              </Field>

              <Field label="Zodiac Signs">
                <Select
                  placeholder="Select zodiac signs"
                  options={[
                    { label: "Aries", value: "aries" },
                    { label: "Taurus", value: "taurus" },
                    { label: "Gemini", value: "gemini" },
                    { label: "Cancer", value: "cancer" },
                    { label: "Leo", value: "leo" },
                    { label: "Virgo", value: "virgo" },
                    { label: "Libra", value: "libra" },
                    { label: "Scorpio", value: "scorpio" },
                    { label: "Sagittarius", value: "sagittarius" },
                    { label: "Capricorn", value: "capricorn" },
                    { label: "Aquarius", value: "aquarius" },
                    { label: "Pisces", value: "pisces" },
                  ]}
                />
              </Field>

              <Field label="Wear Day">
                <Input placeholder="e.g. Thursday" />
              </Field>

              <Field label="Wear Method">
                <Input placeholder="e.g. After Sunrise" />
              </Field>

              <Field label="Finger">
                <Input placeholder="e.g. Index Finger" />
              </Field>

              <Field label="Metal">
                <Input placeholder="e.g. Silver" />
              </Field>

              <Field label="Thread Color">
                <Input placeholder="e.g. Yellow" />
              </Field>

              <Field label="Purification Method">
                <Input placeholder="e.g. Milk, Ganga Jal" />
              </Field>
            </div>
          </Section>

          {/* Certification */}
          <Section title="Certification" className="xl:col-span-3">
            <div className="mb-3 flex items-center gap-2">
              <Toggle
                checked={certified}
                onChange={() => setCertified(!certified)}
              />
              <span className="text-[10px] font-semibold">Certified</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Certification Type">
                <Input placeholder="e.g. Gemstone Report" />
              </Field>

              <Field label="Lab Name">
                <Input placeholder="e.g. GIA, IGI" />
              </Field>

              <Field label="Certificate Number">
                <Input placeholder="Enter certificate number" />
              </Field>

              <Field label="Issue Date">
                <div className="relative">
                  <Input type="date" />
                  <FaCalendarDays className="pointer-events-none absolute right-3 top-3 text-slate-400" />
                </div>
              </Field>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <input type="checkbox" className="h-3 w-3 accent-slate-800" />
              <span className="text-[9px]">X-Ray Verified</span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <Field label="Certificate PDF">
                <button className="flex h-9 w-full items-center justify-center gap-2 rounded-md border border-slate-200 text-[9px] font-semibold">
                  <FaArrowUpFromBracket />
                  Upload PDF
                </button>
                <p className="mt-1 text-center text-[8px] text-slate-400">
                  PDF (Max 5MB)
                </p>
              </Field>

              <Field label="Certificate Image">
                <button className="flex h-9 w-full items-center justify-center gap-2 rounded-md border border-slate-200 text-[9px] font-semibold">
                  <FaArrowUpFromBracket />
                  Upload Image
                </button>
                <p className="mt-1 text-center text-[8px] text-slate-400">
                  JPG, PNG (Max 5MB)
                </p>
              </Field>
            </div>
          </Section>

          {/* Pricing */}
          <Section title="Pricing" className="xl:col-span-4">
            <div className="grid grid-cols-3 gap-3">
              <Field label="Currency">
                <Select
                  placeholder="INR"
                  options={[
                    { label: "INR", value: "inr" },
                    { label: "USD", value: "usd" },
                    { label: "EUR", value: "eur" },
                  ]}
                />
              </Field>

              <Field label="Cost Price (₹)">
                <Input placeholder="0.00" type="number" />
              </Field>

              <Field label="Selling Price (₹)" required>
                <Input placeholder="0.00" type="number" />
              </Field>

              <Field label="Sale Price (₹)">
                <Input placeholder="0.00" type="number" />
              </Field>

              <Field label="Discount (%)">
                <Input placeholder="0" type="number" />
              </Field>

              <Field label="GST (%)">
                <Input placeholder="3" type="number" />
              </Field>

              <Field label="Tax Class" className="col-span-3">
                <Select
                  placeholder="Select Tax Class"
                  options={[
                    { label: "GST 3%", value: "gst3" },
                    { label: "GST 5%", value: "gst5" },
                    { label: "GST 12%", value: "gst12" },
                    { label: "GST 18%", value: "gst18" },
                  ]}
                />
              </Field>
            </div>
          </Section>

          {/* Inventory */}
          <Section title="Inventory" className="xl:col-span-5">
            <div className="grid grid-cols-3 gap-3">
              <Field label="Stock">
                <Input placeholder="0" type="number" />
              </Field>

              <Field label="Stock Status">
                <Select
                  placeholder="In Stock"
                  options={[
                    { label: "In Stock", value: "in-stock" },
                    { label: "Out of Stock", value: "out-of-stock" },
                    { label: "Backorder", value: "backorder" },
                  ]}
                />
              </Field>

              <Field label="Low Stock Alert">
                <Input placeholder="0" type="number" />
                <p className="mt-1 text-[8px] leading-3 text-slate-400">
                  Get alerted when stock falls below this value
                </p>
              </Field>

              <Field label="Reserved Stock">
                <Input placeholder="0" type="number" />
              </Field>

              <Field label="Warehouse">
                <Input placeholder="Enter warehouse name" />
              </Field>
            </div>
          </Section>

          {/* Benefits */}
          <Section title="Benefits" className="xl:col-span-3">
            <div className="mb-2 flex justify-end">
              <button
                onClick={addBenefit}
                className="flex items-center gap-1 rounded border border-slate-200 px-2.5 py-1.5 text-[9px] font-semibold"
              >
                <FaPlus />
                Add Benefit
              </button>
            </div>

            <div className="min-h-[135px] rounded-md border border-slate-200">
              {benefits.length === 0 ? (
                <EmptyState
                  icon={<FaRegCircleCheck />}
                  title="No benefits added yet"
                  description='Click "Add Benefit" to add product benefits'
                />
              ) : (
                <div className="space-y-2 p-3">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex justify-between rounded bg-slate-50 px-3 py-2 text-[10px]"
                    >
                      {benefit}
                      <button
                        onClick={() =>
                          setBenefits((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                      >
                        <FaTrash className="text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Section>

          {/* SEO */}
          <Section title="SEO" className="xl:col-span-4">
            <div className="space-y-3">
              <Field label="Meta Title">
                <Input placeholder="Enter meta title" />
              </Field>

              <Field label="Meta Description">
                <textarea
                  rows={3}
                  maxLength={160}
                  placeholder="Enter meta description"
                  className={textareaClass}
                />
                <div className="mt-1 text-right text-[8px] text-slate-400">
                  0/160
                </div>
              </Field>
            </div>
          </Section>
        </div>

        {/* Jewellery Details */}
        <Section title="Jewellery Details" className="mt-2.5">
          <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-12">
            {/* Metal */}
            <div className="rounded-md border border-slate-200 p-3 lg:col-span-3">
              <h3 className="mb-3 text-[10px] font-bold">Metal Information</h3>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Metal Type">
                  <Input placeholder="e.g. Gold" />
                </Field>

                <Field label="Purity">
                  <Input placeholder="e.g. 22K" />
                </Field>

                <Field label="Metal Color">
                  <Input placeholder="e.g. Yellow" />
                </Field>

                <Field label="Metal Weight">
                  <Input placeholder="0.00" />
                </Field>

                <Field label="Metal Weight Unit" className="col-span-2">
                  <Select
                    placeholder="gram"
                    options={[
                      { label: "gram", value: "gram" },
                      { label: "kg", value: "kg" },
                    ]}
                  />
                </Field>

                <Field label="Gross Weight">
                  <Input placeholder="0.00" />
                </Field>

                <Field label="Net Weight">
                  <Input placeholder="0.00" />
                </Field>
              </div>
            </div>

            {/* Making charges */}
            <div className="rounded-md border border-slate-200 p-3 lg:col-span-2">
              <h3 className="mb-3 text-[10px] font-bold">Making Charges</h3>

              <div className="space-y-3">
                <Field label="Making Charges">
                  <Input placeholder="0.00" />
                </Field>

                <Field label="Making Charges Type">
                  <Select
                    placeholder="Select Type"
                    options={[
                      { label: "Fixed", value: "fixed" },
                      { label: "Percentage", value: "percentage" },
                    ]}
                  />
                </Field>

                <Field label="Making Charges (%)">
                  <Input placeholder="0" />
                </Field>
              </div>
            </div>

            {/* Diamond */}
            <div className="rounded-md border border-slate-200 p-3 lg:col-span-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-[10px] font-bold">Diamond Information</h3>
                <Toggle
                  checked={containsDiamond}
                  onChange={() => setContainsDiamond(!containsDiamond)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Diamond Type">
                  <Input placeholder="e.g. Natural Diamond" />
                </Field>

                <Field label="Diamond Count">
                  <Input placeholder="0" />
                </Field>

                <Field label="Diamond Weight">
                  <Input placeholder="0.00" />
                </Field>

                <Field label="Weight Unit">
                  <Select
                    placeholder="carat"
                    options={[
                      { label: "carat", value: "carat" },
                      { label: "gram", value: "gram" },
                    ]}
                  />
                </Field>

                <Field label="Diamond Color">
                  <Input placeholder="e.g. G" />
                </Field>

                <Field label="Diamond Clarity">
                  <Input placeholder="e.g. VS" />
                </Field>

                <Field label="Diamond Cut">
                  <Input placeholder="e.g. Excellent" />
                </Field>

                <Field label="Diamond Shape">
                  <Input placeholder="e.g. Round" />
                </Field>
              </div>
            </div>

            {/* Gemstone */}
            <div className="rounded-md border border-slate-200 p-3 lg:col-span-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-[10px] font-bold">Gemstone Information</h3>
                <Toggle
                  checked={containsGemstone}
                  onChange={() => setContainsGemstone(!containsGemstone)}
                />
              </div>

              <div className="space-y-3">
                <Field label="Gemstone Type">
                  <Input placeholder="e.g. Ruby" />
                </Field>

                <Field label="Gemstone Count">
                  <Input placeholder="0" />
                </Field>

                <Field label="Gemstone Weight">
                  <Input placeholder="0.00" />
                </Field>

                <Field label="Weight Unit">
                  <Select
                    placeholder="carat"
                    options={[
                      { label: "carat", value: "carat" },
                      { label: "gram", value: "gram" },
                    ]}
                  />
                </Field>
              </div>
            </div>

            {/* Jewellery */}
            <div className="rounded-md border border-slate-200 p-3 lg:col-span-3">
              <h3 className="mb-3 text-[10px] font-bold">Jewellery Details</h3>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Setting Type" className="col-span-2">
                  <Input placeholder="e.g. Prong Setting" />
                </Field>

                <Field label="Size">
                  <Input placeholder="e.g. 18" />
                </Field>

                <Field label="Dimensions">
                  <Input placeholder="e.g. 20 x 10 mm" />
                </Field>

                <Field label="Length">
                  <Input placeholder="0.00" />
                </Field>

                <Field label="Width">
                  <Input placeholder="0.00" />
                </Field>

                <Field label="Collection" className="col-span-2">
                  <Input placeholder="e.g. Wedding Collection" />
                </Field>

                <Field label="Occasion">
                  <Input placeholder="e.g. Wedding" />
                </Field>

                <Field label="Gender">
                  <Select
                    placeholder="Unisex"
                    options={[
                      { label: "Unisex", value: "unisex" },
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ]}
                  />
                </Field>
              </div>
            </div>
          </div>
        </Section>

        {/* Bottom Details */}
        <div className="mt-2.5 grid grid-cols-1 gap-2.5 lg:grid-cols-12">
          {/* Hallmark */}
          <Section title="Hallmark" className="lg:col-span-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Hallmark">
                <Input placeholder="e.g. BIS" />
              </Field>

              <Field label="Hallmark Number">
                <Input placeholder="e.g. HUID123456" />
              </Field>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Toggle
                checked={hallmarkVerified}
                onChange={() => setHallmarkVerified(!hallmarkVerified)}
              />
              <span className="text-[9px] font-semibold">
                Hallmark Verified
              </span>
            </div>
          </Section>

          {/* Certificate */}
          <Section title="Certificate" className="lg:col-span-4">
            <div className="mb-3 flex items-center gap-2">
              <Toggle
                checked={certificateIncluded}
                onChange={() => setCertificateIncluded(!certificateIncluded)}
              />
              <span className="text-[9px] font-semibold">
                Certificate Included
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Field label="Certificate Number">
                <Input placeholder="e.g. CERT-001" />
              </Field>

              <Field label="Certificate Type">
                <Input placeholder="e.g. Jewellery Certificate" />
              </Field>

              <Field label="Certificate Lab">
                <Input placeholder="e.g. IGI" />
              </Field>
            </div>
          </Section>

          {/* Customization */}
          <Section title="Customization" className="lg:col-span-4">
            <div className="flex items-center gap-2">
              <Toggle
                checked={customizable}
                onChange={() => setCustomizable(!customizable)}
              />
              <span className="text-[9px] font-semibold">Customizable</span>
            </div>

            <div className="mt-3">
              <Field label="Available Sizes">
                <Input placeholder="e.g. 14, 16, 18, 20, 22" />
              </Field>

              <p className="mt-1 text-[8px] text-slate-400">
                Separate sizes with commas
              </p>
            </div>
          </Section>
        </div>

        {/* Care + Product Status */}
        <div className="mt-2.5 grid grid-cols-1 gap-2.5 lg:grid-cols-12">
          <Section title="Care Instructions" className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-3">
              <Field label="Cleaning">
                <textarea
                  rows={5}
                  placeholder="e.g. Clean with soft cloth"
                  className={textareaClass}
                />
              </Field>

              <Field label="Storage">
                <textarea
                  rows={5}
                  placeholder="e.g. Store in dry place"
                  className={textareaClass}
                />
              </Field>

              <Field label="Precautions">
                <textarea
                  rows={5}
                  placeholder="e.g. Avoid chemical exposure"
                  className={textareaClass}
                />
              </Field>
            </div>
          </Section>

          <Section
            title="Product Status & Visibility"
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-2 gap-3">
              <Field label="Status">
                <Select
                  placeholder="Draft"
                  options={[
                    { label: "Draft", value: "draft" },
                    { label: "Published", value: "published" },
                    { label: "Archived", value: "archived" },
                  ]}
                />

                <p className="mt-1 text-[8px] text-slate-400">
                  Draft products are not visible to customers
                </p>
              </Field>

              <Field label="Created By">
                <Select
                  placeholder="Select User"
                  options={[
                    { label: "Admin", value: "admin" },
                    { label: "Manager", value: "manager" },
                    { label: "Staff", value: "staff" },
                  ]}
                />
              </Field>

              <Field label="Updated By" className="col-span-2">
                <Select
                  placeholder="Select User"
                  options={[
                    { label: "Admin", value: "admin" },
                    { label: "Manager", value: "manager" },
                    { label: "Staff", value: "staff" },
                  ]}
                />
              </Field>
            </div>
          </Section>
        </div>

        {/* Bottom Actions */}
        <div className="mt-3 flex justify-end gap-2 border-t border-slate-200 py-4">
          <button className="h-9 rounded-md border border-slate-200 bg-white px-5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50">
            Cancel
          </button>

          <button className="h-9 rounded-md border border-[#ead9c8] bg-[#f8eee6] px-5 text-[11px] font-semibold text-slate-800 hover:bg-[#f5e8dd]">
            Save as Draft
          </button>

          <button className="h-9 rounded-md bg-slate-900 px-5 text-[11px] font-semibold text-white hover:bg-slate-800">
            Publish Product
          </button>
        </div>
      </main>
    </div>
  );
}
