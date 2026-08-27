"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import ProductImage from "@/components/product/ProductImage";
import Jewellery from "@/components/product/Jewellery";
import { Field, Input, Section, Select, textareaClass, Toggle } from "./Form";
import {
  ProductFormData,
  ProductStatus,
  ProductType,
  StockStatus,
} from "@/lib/type";
import CareBenefits from "./CareBenefits";
import GemstoneFields from "./GemstoneFields";
import RudrakashFields from "./RudrakshaFields";

type Option = {
  label: string;
  value: string;
};

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

  const handleUnitPriceChange = (
    field: "buyUnitPrice" | "sellUnitPrice",
    value: number | undefined,
  ) => {
    const calculatedPrice =
      value !== undefined ? calculatePrice(value, 12) : undefined;

    setFormData((prev) => ({
      ...prev,
      pricing: {
        ...(prev.pricing || {}),
        [field]: value,

        ...(field === "buyUnitPrice"
          ? { costPrice: calculatedPrice }
          : { sellingPrice: calculatedPrice, salePrice: calculatedPrice }),
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

  const calculatePrice = (
    unitPrice: number | undefined,
    weight: number | undefined,
  ) => {
    if (unitPrice === undefined || weight === undefined) {
      return undefined;
    }
    return Number((unitPrice * weight).toFixed(2));
  };

  const handleDiscountChange = (value: number | undefined) => {
    setFormData((prev) => {
      const sellingPrice = prev.pricing?.sellingPrice;

      const salePrice =
        sellingPrice !== undefined
          ? Number((sellingPrice * (1 - (value ?? 0) / 100)).toFixed(2))
          : undefined;

      return {
        ...prev,
        pricing: {
          ...(prev.pricing || {}),
          discount: value,
          salePrice,
        },
      };
    });
  };

  console.log("formData", formData);

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
        <GemstoneFields formData={formData} setFormData={setFormData} />
      )}

      {formData.productType === "rudraksha" && (
        <RudrakashFields formData={formData} setFormData={setFormData} />
      )}

      {formData.productType === "jewellery" && (
        <Section title="Jewellery Details" className="mt-2.5">
          <Jewellery formData={formData} setFormData={setFormData} />
        </Section>
      )}

      <div className="mt-2.5 grid grid-cols-1 gap-2.5 xl:grid-cols-12">
        {/* PRICING */}

        <Section title="Pricing" className="xl:col-span-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Weight Unit">
              <Select
                value={formData.pricing?.WeightUnit ?? ""}
                onChange={(e) =>
                  updateNestedField("pricing", "WeightUnit", e.target.value)
                }
                options={[
                  {
                    label: "gram",
                    value: "Gram",
                  },
                  {
                    label: "carat",
                    value: "Carat",
                  },
                  {
                    label: "ratti",
                    value: "Ratti",
                  },
                  {
                    label: "piece",
                    value: "Piece",
                  },
                ]}
              />
            </Field>

            <Field
              label={`Buy Price Per ${formData.pricing?.WeightUnit ?? ""}`}
            >
              <Input
                type="number"
                placeholder="0.00"
                value={formData.pricing?.buyUnitPrice ?? ""}
                onChange={(e) =>
                  handleUnitPriceChange(
                    "buyUnitPrice",
                    numberValue(e.target.value),
                  )
                }
              />
            </Field>

            <Field
              label={`Sell Price Per ${formData.pricing?.WeightUnit ?? ""}`}
            >
              <Input
                type="number"
                placeholder="0.00"
                value={formData.pricing?.sellUnitPrice ?? ""}
                onChange={(e) =>
                  handleUnitPriceChange(
                    "sellUnitPrice",
                    numberValue(e.target.value),
                  )
                }
              />
            </Field>

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
                value={calculatePrice(formData.pricing?.buyUnitPrice, 12) ?? ""}
                readOnly
              />
            </Field>

            <Field label="Selling Price" required>
              <Input
                type="number"
                placeholder="0.00"
                value={
                  calculatePrice(formData.pricing?.sellUnitPrice, 12) ?? ""
                }
                readOnly
              />
            </Field>

            <Field label="Sale Price">
              <Input
                type="number"
                placeholder="0.00"
                value={formData.pricing?.salePrice ?? ""}
                readOnly
              />
            </Field>

            <Field label="Discount %">
              <Input
                type="number"
                placeholder="0"
                value={formData.pricing?.discount ?? ""}
                onChange={(e) =>
                  handleDiscountChange(numberValue(e.target.value))
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

        <Section title="Inventory" className="xl:col-span-4">
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
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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

      {(formData.productType === "gemstone" ||
        formData.productType === "rudraksha") && (
        <CareBenefits formData={formData} setFormData={setFormData} />
      )}
    </>
  );
}
