"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

import {
  FaArrowUpFromBracket,
  FaPlus,
  FaRegCircleCheck,
  FaTrash,
} from "react-icons/fa6";

import ProductImage from "@/components/product/ProductImage";
import Jewellery from "@/components/product/Jewellery";

import {
  ProductFormData,
  ProductStatus,
  ProductType,
  StockStatus,
} from "@/lib/type";

type Option = {
  label: string;
  value: string;
};

const inputClass =
  "w-full h-9 rounded-md border border-[#e5e1da] bg-white px-3 text-[11px] text-slate-700 outline-none placeholder:text-[#96999d] focus:border-[#c9a45c] focus:ring-1 focus:ring-[#c9a45c]/20";

const labelClass = "mb-1.5 block text-[10px] font-semibold text-slate-700";

const selectClass =
  "w-full h-9 appearance-none rounded-md border border-[#e5e1da] bg-white px-3 text-[11px] text-slate-700 outline-none focus:border-[#c9a45c] focus:ring-1 focus:ring-[#c9a45c]/20";

const textareaClass =
  "w-full resize-none rounded-md border border-[#e5e1da] bg-white px-3 py-2 text-[11px] text-slate-700 outline-none placeholder:text-[#96999d] focus:border-[#c9a45c] focus:ring-1 focus:ring-[#c9a45c]/20";

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
  disabled = false,
}: {
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}) => (
  <div className="relative">
    <select
      className={`${selectClass} ${
        disabled ? "cursor-not-allowed bg-slate-50" : ""
      }`}
      value={value ?? ""}
      onChange={onChange}
      disabled={disabled}
    >
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

const numberValue = (value: string): number | undefined => {
  if (value === "") return undefined;

  const number = Number(value);

  return Number.isNaN(number) ? undefined : number;
};
interface ProductFormProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
}
export default function ProductForm({
  formData,
  setFormData,
}: ProductFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Option[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [showBenefitForm, setShowBenefitForm] = useState(false);
  const [benefitInput, setBenefitInput] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);

        const response = await fetch("/api/categories", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to fetch categories");
        }

        const categoryList = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.categories)
            ? data.categories
            : [];

        const categoryOptions: Option[] = categoryList.map(
          (category: { _id: string; name: string }) => ({
            label: category.name,
            value: category._id,
          }),
        );

        setCategories(categoryOptions);
      } catch (error) {
        console.error("Fetch categories error:", error);

        alert(
          error instanceof Error ? error.message : "Failed to load categories",
        );
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const updateField = <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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

  const handleProductTypeChange = (type: ProductType) => {
    setFormData((prev) => ({
      ...prev,

      productType: type,

      gemstone: type === "gemstone" ? prev.gemstone || {} : undefined,

      rudraksha: type === "rudraksha" ? prev.rudraksha || {} : undefined,

      jewellery: type === "jewellery" ? prev.jewellery || {} : undefined,
    }));
  };

  const addBenefit = () => {
    const value = benefitInput.trim();

    if (!value) return;

    setFormData((prev) => ({
      ...prev,
      benefits: [...prev.benefits, value],
    }));

    setBenefitInput("");
    setShowBenefitForm(false);
  };

  const removeBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-2.5 xl:grid-cols-12">
        <Section title="Basic Information" className="xl:col-span-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* PRODUCT TYPE */}

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

            {/* PRODUCT NAME */}

            <Field label="Product Name" required>
              <Input
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </Field>

            {/* CATEGORY */}

            <Field label="Category" required>
              <Select
                value={formData.category}
                placeholder={
                  categoriesLoading
                    ? "Loading categories..."
                    : "Select category"
                }
                disabled={categoriesLoading}
                onChange={(e) => updateField("category", e.target.value)}
                options={categories}
              />
            </Field>

            {/* SLUG */}

            <Field label="Slug">
              <Input
                placeholder="product-url-slug"
                value={formData.slug}
                onChange={(e) => updateField("slug", e.target.value)}
              />
            </Field>

            {/* STATUS */}

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

            {/* DESCRIPTION */}

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

        <Section title="Gallery Images" className="xl:col-span-3">
          <ProductImage formData={formData} setFormData={setFormData} />
        </Section>

        {/* SEO */}

        <Section title="SEO" className="xl:col-span-4">
          <div className="grid grid-cols-1 gap-3">
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

      {formData.productType === "gemstone" && (
        <Section title="Gemstone Details" className="mt-2.5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <Field label="Gemstone Type" required>
              <Input
                placeholder="e.g. Ruby"
                value={formData.gemstone?.gemstoneType ?? ""}
                onChange={(e) =>
                  updateNestedField("gemstone", "gemstoneType", e.target.value)
                }
              />
            </Field>

            <Field label="Indian Name">
              <Input
                placeholder="Enter Indian name"
                value={formData.gemstone?.indianName ?? ""}
                onChange={(e) =>
                  updateNestedField("gemstone", "indianName", e.target.value)
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
                  updateNestedField("gemstone", "transparency", e.target.value)
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
                    value: "carat",
                  },
                  {
                    label: "Gram",
                    value: "gram",
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
                  updateNestedField("gemstone", "qualityGrade", e.target.value)
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
                    value: "gram",
                  },
                  {
                    label: "Kg",
                    value: "kg",
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
                  updateNestedField("rudraksha", "energized", e.target.checked)
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

      {formData.productType === "jewellery" && (
        <Section title="Jewellery Details" className="mt-2.5">
          <Jewellery formData={formData} setFormData={setFormData} />
        </Section>
      )}

      <div className="mt-2.5 grid grid-cols-1 gap-2.5 xl:grid-cols-12">
        {/* PRICING */}

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

        {/* INVENTORY */}

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

        {(formData.productType === "gemstone" ||
          formData.productType === "rudraksha") && (
          <Section title="Certification" className="xl:col-span-4">
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
              <div className="grid grid-cols-1 gap-3">
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

        {formData.productType === "jewellery" && (
          <Section
            title="Hallmark & Jewellery Certificate"
            className="xl:col-span-4"
          >
            <div className="grid grid-cols-1 gap-3">
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
      </div>

      <div className="mt-2.5 grid grid-cols-1 gap-2.5 xl:grid-cols-12">
        {/* ASTROLOGY */}

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
                    updateNestedField("astrology", "wearMethod", e.target.value)
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

        {/* BENEFITS */}

        {(formData.productType === "gemstone" ||
          formData.productType === "rudraksha") && (
          <Section title="Benefits" className="xl:col-span-3">
            <div className="mb-3 flex justify-end">
              {!showBenefitForm && (
                <button
                  type="button"
                  onClick={() => setShowBenefitForm(true)}
                  className="flex items-center gap-1 rounded border border-slate-200 px-2.5 py-1.5 text-[9px] font-semibold"
                >
                  <FaPlus />
                  Add Benefit
                </button>
              )}
            </div>

            {showBenefitForm && (
              <>
                <Input
                  type="text"
                  value={benefitInput}
                  onChange={(e) => setBenefitInput(e.target.value)}
                  placeholder="Enter benefit"
                />

                <div className="my-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setBenefitInput("");
                      setShowBenefitForm(false);
                    }}
                    className="rounded-md border border-[#d9dde2] px-3 py-1.5 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={addBenefit}
                    disabled={!benefitInput.trim()}
                    className="rounded-md bg-[#111923] px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              </>
            )}

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

                    <button type="button" onClick={() => removeBenefit(index)}>
                      <FaTrash className="text-red-600 cursor-pointer" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Section>
        )}

        {/* CARE */}
        {(formData.productType === "gemstone" ||
          formData.productType === "rudraksha") && (
          <Section title="Care Instructions" className="xl:col-span-4">
            <div className="grid grid-cols-1 gap-3">
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
        )}
      </div>
    </>
  );
}
