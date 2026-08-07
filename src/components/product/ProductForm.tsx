"use client";

import React, { useState } from "react";
import {
  FaGem,
  FaCircle,
  FaBoxOpen,
  FaImages,
  FaStar,
  FaCertificate,
  FaIndianRupeeSign,
  FaBoxesStacked,
  FaHeart,
  FaShieldHeart,
  FaMagnifyingGlass,
  FaFloppyDisk,
  FaArrowLeft,
} from "react-icons/fa6";
import { RiCertificate2Line } from "react-icons/ri";

import GemstoneFields from "./GemstoneFields";
import RudrakshaFields from "./RudrakshaFields";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { FaInfoCircle } from "react-icons/fa";
import { MdExpandMore, MdOutlineInventory2 } from "react-icons/md";

type ProductType = "gemstone" | "rudraksha";

interface ProductFormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleSubmit: () => void;
  loading: boolean;
}

export default function ProductForm({
  formData,
  setFormData,
  handleSubmit,
  loading,
}: ProductFormProps) {
  const [expanded, setExpanded] = useState<string>("type");

  const handleAccordion =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : "");
    };

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNestedField = (parent: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleProductTypeChange = (type: ProductType) => {
    setFormData((prev: any) => ({
      ...prev,
      productType: type,
      specifications: {},
    }));
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Add Product
          </h1>

          <p className=" text-sm text-gray-500">Add product to your catalog.</p>
        </div>
      </div>

      <Accordion
        expanded={expanded === "type"}
        onChange={handleAccordion("type")}
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px !important",
          "&:before": {
            display: "none",
          },
          marginBottom: "15px",
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          sx={{
            minHeight: "64px",
            "& .MuiAccordionSummary-content": {
              margin: "12px 0",
            },
          }}
        >
          <SectionHeader
            icon={
              formData.productType === "gemstone" ? <FaGem /> : <FaCircle />
            }
            title="Product Type"
            description="Select the type of product you are adding."
          />
        </AccordionSummary>

        <AccordionDetails>
          <div className=" pt-3">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <SelectField
                label="Product Type"
                value={formData.productType}
                options={["gemstone", "rudraksha"]}
                onChange={(value) =>
                  handleProductTypeChange(value as "gemstone" | "rudraksha")
                }
              />
              <SelectField
                label="Status"
                value={formData.status || "Draft"}
                options={["Draft", "Published", "Archived"]}
                onChange={(value) => updateField("status", value)}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      {/* BASIC INFORMATION */}
      <Accordion
        expanded={expanded === "basic"}
        onChange={handleAccordion("basic")}
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px !important",
          "&:before": {
            display: "none",
          },
          marginBottom: "15px",
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          sx={{
            minHeight: "64px",
            "& .MuiAccordionSummary-content": {
              margin: "12px 0",
            },
          }}
        >
          <SectionHeader
            icon={<FaBoxOpen />}
            title="Basic Information"
            description="Basic information about your product."
          />
        </AccordionSummary>

        <AccordionDetails>
          <div className=" pt-3">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <InputField
                label="SKU"
                required
                value={formData.sku}
                placeholder={
                  formData.productType === "gemstone"
                    ? "GEM-RUBY-001"
                    : "RUD-5M-001"
                }
                onChange={(value) => updateField("sku", value)}
              />

              <InputField
                label="Product Name"
                required
                value={formData.name}
                placeholder={
                  formData.productType === "gemstone"
                    ? "Natural Ruby"
                    : "5 Mukhi Rudraksha"
                }
                onChange={(value) => updateField("name", value)}
              />

              <InputField
                label="Indian Name"
                value={formData.indianName}
                placeholder={
                  formData.productType === "gemstone"
                    ? "Manik"
                    : "Panchmukhi Rudraksha"
                }
                onChange={(value) => updateField("indianName", value)}
              />

              <InputField
                label="Slug"
                required
                value={formData.slug}
                placeholder="natural-ruby"
                onChange={(value) =>
                  updateField("slug", value.toLowerCase().replace(/\s+/g, "-"))
                }
              />

              <InputField
                label="Category"
                required
                value={formData.category}
                placeholder={
                  formData.productType === "gemstone" ? "Precious" : "Rudraksha"
                }
                onChange={(value) => updateField("category", value)}
              />

              <InputField
                label="Sub Category"
                value={formData.subCategory}
                placeholder={
                  formData.productType === "gemstone" ? "Ruby" : "5 Mukhi"
                }
                onChange={(value) => updateField("subCategory", value)}
              />
            </div>

            <div className="mt-5">
              <TextAreaField
                label="Description"
                value={formData.description}
                placeholder="Enter detailed product description..."
                rows={5}
                onChange={(value) => updateField("description", value)}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      {/* MEDIA */}

      <Accordion
        expanded={expanded === "MEDIA"}
        onChange={handleAccordion("MEDIA")}
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px !important",
          "&:before": {
            display: "none",
          },
          marginBottom: "15px",
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          sx={{
            minHeight: "64px",
            "& .MuiAccordionSummary-content": {
              margin: "12px 0",
            },
          }}
        >
          <SectionHeader
            icon={<FaImages />}
            title="Product Media"
            description="Add product images and video."
          />
        </AccordionSummary>

        <AccordionDetails>
          <div className=" pt-3 space-y-5">
            <InputField
              label="Gallery Images"
              value={
                Array.isArray(formData.gallery)
                  ? formData.gallery.join(", ")
                  : ""
              }
              placeholder="/images/product-1.webp, /images/product-2.webp"
              helper="Enter image URLs separated by commas."
              onChange={(value) =>
                updateField(
                  "gallery",
                  value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                )
              }
            />

            <InputField
              label="Video URL"
              value={formData.videoUrl}
              placeholder="https://youtube.com/watch?v=..."
              onChange={(value) => updateField("videoUrl", value)}
            />
          </div>
        </AccordionDetails>
      </Accordion>

      {/*Product SPECIFIC */}
      <Accordion
        expanded={expanded === "SPECIFIC"}
        onChange={handleAccordion("SPECIFIC")}
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px !important",
          "&:before": {
            display: "none",
          },
          marginBottom: "15px",
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          sx={{
            minHeight: "64px",
            "& .MuiAccordionSummary-content": {
              margin: "12px 0",
            },
          }}
        >
          <SectionHeader
            icon={
              formData.productType === "gemstone" ? <FaGem /> : <FaCircle />
            }
            title={
              formData.productType === "gemstone"
                ? "Gemstone Details"
                : "Rudraksha Details"
            }
            description={
              formData.productType === "gemstone"
                ? "Enter gemstone-specific information."
                : "Enter Rudraksha-specific information."
            }
          />
        </AccordionSummary>

        <AccordionDetails>
          <div className=" pt-3">
            {formData.productType === "gemstone" ? (
              <GemstoneFields formData={formData} setFormData={setFormData} />
            ) : (
              <RudrakshaFields formData={formData} setFormData={setFormData} />
            )}
          </div>
        </AccordionDetails>
      </Accordion>

      {/* ASTROLOGY */}
      <Accordion
        expanded={expanded === "astrology"}
        onChange={handleAccordion("astrology")}
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px !important",
          "&:before": {
            display: "none",
          },
          marginBottom: "15px",
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          sx={{
            minHeight: "64px",
            "& .MuiAccordionSummary-content": {
              margin: "12px 0",
            },
          }}
        >
          <SectionHeader
            icon={<FaStar />}
            title="Astrology"
            description="Astrological and wearing information."
          />
        </AccordionSummary>

        <AccordionDetails>
          <div className=" pt-3">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <InputField
                label="Ruling Planet"
                value={formData.astrology?.planet}
                placeholder="Sun"
                onChange={(value) =>
                  updateNestedField("astrology", "planet", value)
                }
              />

              <InputField
                label="Zodiac Signs"
                value={formData.astrology?.zodiacSigns?.join(", ") || ""}
                placeholder="Leo, Aries, Scorpio"
                helper="Separate multiple signs with commas."
                onChange={(value) =>
                  updateNestedField(
                    "astrology",
                    "zodiacSigns",
                    value
                      .split(",")
                      .map((item) => item.trim())
                      .filter(Boolean),
                  )
                }
              />

              <InputField
                label="Wear Day"
                value={formData.astrology?.wearDay}
                placeholder="Sunday"
                onChange={(value) =>
                  updateNestedField("astrology", "wearDay", value)
                }
              />

              <InputField
                label="Wear Time"
                value={formData.astrology?.wearTime}
                placeholder="Morning"
                onChange={(value) =>
                  updateNestedField("astrology", "wearTime", value)
                }
              />

              <InputField
                label="Wear Method"
                value={formData.astrology?.wearMethod}
                placeholder="Wear around neck"
                onChange={(value) =>
                  updateNestedField("astrology", "wearMethod", value)
                }
              />

              {formData.productType === "gemstone" && (
                <InputField
                  label="Finger"
                  value={formData.astrology?.finger}
                  placeholder="Ring Finger"
                  onChange={(value) =>
                    updateNestedField("astrology", "finger", value)
                  }
                />
              )}

              <InputField
                label="Metal"
                value={formData.astrology?.metal}
                placeholder="Gold"
                onChange={(value) =>
                  updateNestedField("astrology", "metal", value)
                }
              />

              {formData.productType === "rudraksha" && (
                <>
                  <InputField
                    label="Thread Color"
                    value={formData.astrology?.threadColor}
                    placeholder="Red"
                    onChange={(value) =>
                      updateNestedField("astrology", "threadColor", value)
                    }
                  />

                  <InputField
                    label="Purification Method"
                    value={formData.astrology?.purificationMethod}
                    placeholder="Gangajal"
                    onChange={(value) =>
                      updateNestedField(
                        "astrology",
                        "purificationMethod",
                        value,
                      )
                    }
                  />
                </>
              )}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* CERTIFICATION */}
      <Accordion
        expanded={expanded === "certified"}
        onChange={handleAccordion("certified")}
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px !important",
          "&:before": {
            display: "none",
          },
          marginBottom: "15px",
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          sx={{
            minHeight: "64px",
            "& .MuiAccordionSummary-content": {
              margin: "12px 0",
            },
          }}
        >
          <SectionHeader
            icon={<RiCertificate2Line />}
            title="Certification"
            description="Laboratory and certification information."
          />
        </AccordionSummary>

        <AccordionDetails>
          <div className=" pt-3">
            <ToggleField
              label="Product is Certified"
              checked={formData.certification?.certified || false}
              onChange={(checked) =>
                updateNestedField("certification", "certified", checked)
              }
            />

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <InputField
                label="Lab Name"
                value={formData.certification?.labName}
                placeholder="IGI"
                onChange={(value) =>
                  updateNestedField("certification", "labName", value)
                }
              />

              <InputField
                label="Certificate Number"
                value={formData.certification?.certificateNumber}
                placeholder="IGI-RB-202600123"
                onChange={(value) =>
                  updateNestedField("certification", "certificateNumber", value)
                }
              />

              <InputField
                label="Certification Type"
                value={formData.certification?.certificationType}
                placeholder="Natural Gemstone"
                onChange={(value) =>
                  updateNestedField("certification", "certificationType", value)
                }
              />

              <InputField
                label="Issue Date"
                type="date"
                value={formData.certification?.issueDate}
                onChange={(value) =>
                  updateNestedField("certification", "issueDate", value)
                }
              />

              {formData.productType === "rudraksha" && (
                <ToggleField
                  label="X-Ray Verified"
                  checked={formData.certification?.xrayVerified || false}
                  onChange={(checked) =>
                    updateNestedField("certification", "xrayVerified", checked)
                  }
                />
              )}

              <InputField
                label="Certificate PDF URL"
                value={formData.certification?.certificatePdf}
                placeholder="/certificates/product.pdf"
                onChange={(value) =>
                  updateNestedField("certification", "certificatePdf", value)
                }
              />

              <InputField
                label="Certificate Image URL"
                value={formData.certification?.certificateImage}
                placeholder="/certificates/product.jpg"
                onChange={(value) =>
                  updateNestedField("certification", "certificateImage", value)
                }
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      {/* PRICING */}
      <Accordion
        expanded={expanded === "price"}
        onChange={handleAccordion("price")}
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px !important",
          "&:before": {
            display: "none",
          },
          marginBottom: "15px",
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          sx={{
            minHeight: "64px",
            "& .MuiAccordionSummary-content": {
              margin: "12px 0",
            },
          }}
        >
          <SectionHeader
            icon={<FaIndianRupeeSign />}
            title="Pricing"
            description="Set product cost and selling price."
          />
        </AccordionSummary>

        <AccordionDetails>
          <div className=" pt-3">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <InputField
                label="Currency"
                value={formData.pricing?.currency || "INR"}
                onChange={(value) =>
                  updateNestedField("pricing", "currency", value)
                }
              />

              <NumberField
                label="Cost Price"
                value={formData.pricing?.costPrice ?? 0}
                onChange={(value) =>
                  updateNestedField("pricing", "costPrice", value)
                }
              />

              <NumberField
                label="Selling Price"
                value={formData.pricing?.sellingPrice ?? 0}
                onChange={(value) =>
                  updateNestedField("pricing", "sellingPrice", value)
                }
              />

              <NumberField
                label="Sale Price"
                value={formData.pricing?.salePrice ?? 0}
                onChange={(value) =>
                  updateNestedField("pricing", "salePrice", value)
                }
              />

              <NumberField
                label="Discount %"
                value={formData.pricing?.discount ?? 0}
                onChange={(value) =>
                  updateNestedField("pricing", "discount", value)
                }
              />

              <NumberField
                label="GST %"
                value={formData.pricing?.gst ?? 3}
                onChange={(value) => updateNestedField("pricing", "gst", value)}
              />

              <InputField
                label="Tax Class"
                value={formData.pricing?.taxClass}
                placeholder="GST-3"
                onChange={(value) =>
                  updateNestedField("pricing", "taxClass", value)
                }
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* INVENTORY */}
      <Accordion
        expanded={expanded === "INVENTORY"}
        onChange={handleAccordion("INVENTORY")}
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px !important",
          "&:before": {
            display: "none",
          },
          marginBottom: "15px",
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          sx={{
            minHeight: "64px",
            "& .MuiAccordionSummary-content": {
              margin: "12px 0",
            },
          }}
        >
          <SectionHeader
            icon={<MdOutlineInventory2 />}
            title="Inventory"
            description="Manage stock and low-stock alerts."
          />
        </AccordionSummary>

        <AccordionDetails>
          <div className=" pt-3">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <NumberField
                label="Stock"
                value={formData.inventory?.stock ?? 0}
                onChange={(value) =>
                  updateNestedField("inventory", "stock", value)
                }
              />

              <SelectField
                label="Stock Status"
                value={formData.inventory?.stockStatus || "In Stock"}
                options={["In Stock", "Low Stock", "Out of Stock"]}
                onChange={(value) =>
                  updateNestedField("inventory", "stockStatus", value)
                }
              />

              <NumberField
                label="Low Stock Alert"
                value={formData.inventory?.lowStockAlert ?? 5}
                onChange={(value) =>
                  updateNestedField("inventory", "lowStockAlert", value)
                }
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* BENEFITS */}
      <Accordion
        expanded={expanded === "BENEFITS"}
        onChange={handleAccordion("BENEFITS")}
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px !important",
          "&:before": {
            display: "none",
          },
          marginBottom: "15px",
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          sx={{
            minHeight: "64px",
            "& .MuiAccordionSummary-content": {
              margin: "12px 0",
            },
          }}
        >
          <SectionHeader
            icon={<FaHeart />}
            title="Benefits"
            description="Add product benefits."
          />
        </AccordionSummary>

        <AccordionDetails>
          <div className=" pt-3">
            <TextAreaField
              label="Benefits"
              value={
                Array.isArray(formData.benefits)
                  ? formData.benefits.join("\n")
                  : ""
              }
              rows={5}
              helper="Enter one benefit per line."
              placeholder={
                formData.productType === "gemstone"
                  ? "Boosts confidence\nEnhances leadership\nImproves career growth"
                  : "Promotes peace\nImproves concentration\nSupports meditation"
              }
              onChange={(value) =>
                updateField(
                  "benefits",
                  value
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean),
                )
              }
            />
          </div>
        </AccordionDetails>
      </Accordion>

      {/* CARE */}
      <Accordion
        expanded={expanded === "CARE"}
        onChange={handleAccordion("CARE")}
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px !important",
          "&:before": {
            display: "none",
          },
          marginBottom: "15px",
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          sx={{
            minHeight: "64px",
            "& .MuiAccordionSummary-content": {
              margin: "12px 0",
            },
          }}
        >
          <SectionHeader
            icon={<FaShieldHeart />}
            title="Care Instructions"
            description="Instructions for maintaining the product."
          />
        </AccordionSummary>

        <AccordionDetails>
          <div className=" pt-3 space-y-5">
            <TextAreaField
              label="Cleaning"
              value={formData.careInstructions?.cleaning}
              rows={3}
              onChange={(value) =>
                updateNestedField("careInstructions", "cleaning", value)
              }
            />

            <TextAreaField
              label="Storage"
              value={formData.careInstructions?.storage}
              rows={3}
              onChange={(value) =>
                updateNestedField("careInstructions", "storage", value)
              }
            />

            <TextAreaField
              label="Precautions"
              value={formData.careInstructions?.precautions}
              rows={3}
              onChange={(value) =>
                updateNestedField("careInstructions", "precautions", value)
              }
            />
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "SEO"}
        onChange={handleAccordion("SEO")}
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px !important",
          "&:before": {
            display: "none",
          },
          marginBottom: "15px",
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          sx={{
            minHeight: "64px",
            "& .MuiAccordionSummary-content": {
              margin: "12px 0",
            },
          }}
        >
          <SectionHeader
            icon={<FaMagnifyingGlass />}
            title="SEO"
            description="Search engine optimization information."
          />
        </AccordionSummary>

        <AccordionDetails>
          <div className="pt-3 space-y-5">
            <InputField
              label="Meta Title"
              value={formData.seo?.metaTitle}
              onChange={(value) => updateNestedField("seo", "metaTitle", value)}
            />

            <TextAreaField
              label="Meta Description"
              value={formData.seo?.metaDescription}
              rows={4}
              onChange={(value) =>
                updateNestedField("seo", "metaDescription", value)
              }
            />
          </div>
        </AccordionDetails>
      </Accordion>

      <div className="flex flex-col-reverse justify-end gap-3 py-6 sm:flex-row">
        <button
          type="button"
          disabled={loading}
          onClick={() => window.history.back()}
          className="inline-flex items-center cursor-pointer justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FaArrowLeft />
          Cancel
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={handleSubmit}
          className="inline-flex items-center cursor-pointer justify-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FaFloppyDisk />

          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </div>
  );
}


function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-800">
        {icon}
      </div>

      <div>
        <h3 className="text-md font-bold text-gray-900">{title}</h3>

        {description && (
          <p className="mt-0.5 text-sm text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
}

function ProductTypeButton({
  active,
  icon,
  title,
  description,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-4 rounded-xl border p-5 text-left transition ${
        active
          ? "border-black bg-gray-50 ring-1 ring-black"
          : "border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50"
      }`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
          active ? "bg-black text-white" : "bg-gray-100 text-gray-600"
        }`}
      >
        {icon}
      </div>

      <div>
        <div className="font-semibold text-gray-900">{title}</div>

        <div className="mt-1 text-sm text-gray-500">{description}</div>
      </div>
    </button>
  );
}

function InputField({
  label,
  value,
  placeholder,
  helper,
  required = false,
  type = "text",
  onChange,
}: {
  label: string;
  value?: string | number;
  placeholder?: string;
  helper?: string;
  required?: boolean;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        type={type}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
      />

      {helper && <p className="mt-1 text-xs text-gray-500">{helper}</p>}
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: number;
  onChange: (value: number) => void;
}) {
  return (
    <InputField
      label={label}
      type="number"
      value={value ?? 0}
      onChange={(value) => onChange(value === "" ? 0 : Number(value))}
    />
  );
}

function TextAreaField({
  label,
  value,
  placeholder,
  helper,
  rows = 4,
  onChange,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  helper?: string;
  rows?: number;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <textarea
        value={value ?? ""}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
      />

      {helper && <p className="mt-1 text-xs text-gray-500">{helper}</p>}
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition ${
          checked ? "bg-black" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
            checked ? "left-5.5" : "left-0.5"
          }`}
        />
      </button>

      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
}
