"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaChevronDown,
  FaChevronRight,
  FaEllipsisV,
  FaEdit,
  FaHeart,
  FaRegHeart,
  FaGem,
  FaStar,
  FaTag,
  FaBoxOpen,
  FaEye,
  FaTrashAlt,
  FaCopy,
  FaPlus,
  FaCheck,
  FaClock,
  FaHistory,
  FaImages,
  FaChartLine,
  FaClipboardList,
  FaCertificate,
  FaCube,
} from "react-icons/fa";

const productImages = [
  "/products/gold-necklace.jpg",
  "/products/gold-necklace-2.jpg",
  "/products/gold-necklace-3.jpg",
  "/products/gold-necklace-4.jpg",
];

const product = {
  name: "22K Gold Diamond Necklace",
  sku: "GDNK-00123",
  hsn: "7113 11 00",
  brand: "Luxora",

  category: "Necklaces",
  subCategory: "Diamond Necklace",

  metalType: "Gold 22K",
  purity: "22K (91.6%)",

  diamondType: "Natural Diamond",
  diamondWeight: "1.25 Carat",

  settingType: "Prong Setting",
  collection: "Wedding Collection",

  price: 52600,
  makingCharges: 4500,
  metalValue: 38900,
  diamondValue: 8700,
  totalCost: 52100,

  weight: "18.250 g",
  grossWeight: "18.250 g",
  netWeight: "17.100 g",

  gstRate: "3%",
  dimensions: "18 inch",

  stock: 18,
  reservedStock: 2,
  availableStock: 16,
  lowStockAlert: 10,

  status: "Active",
  addedOn: "18 May 2025",
  lastUpdated: "18 May 2025, 10:30 AM",
  addedBy: "Admin User",

  certificate: "Included",
  hallmark: "BIS Hallmarked",
  returnPolicy: "7 Days Returnable",

  rating: "4.8",
  reviews: 126,

  description:
    "Exquisite 22K gold necklace with natural diamonds. Perfect for weddings and special occasions.",

  tags: ["Bestseller", "New Arrival", "Wedding Collection"],
};

export default function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("Product Information");
  const [moreOpen, setMoreOpen] = useState(false);

  const tabs = [
    {
      name: "Product Information",
      icon: FaClipboardList,
    },
    {
      name: "Variants (3)",
      icon: FaCube,
    },
    {
      name: "Inventory History",
      icon: FaHistory,
    },
    {
      name: "Sales History",
      icon: FaChartLine,
    },
    {
      name: "Images",
      icon: FaImages,
    },
    {
      name: "Activity Log",
      icon: FaClock,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfb] px-4 py-5 md:px-6 lg:px-8">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-[21px] font-semibold tracking-tight text-[#171b27]">
            Product Details
          </h1>

          <div className="mt-1.5 flex items-center gap-2 text-[11px] text-[#777d89]">
            <span>Dashboard</span>

            <FaChevronRight className="text-[8px] text-[#a5a8ae]" />

            <span>Products</span>

            <FaChevronRight className="text-[8px] text-[#a5a8ae]" />

            <span className="text-[#4d5360]">
              {product.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/products"
            className="
              flex
              h-9
              items-center
              gap-2
              rounded-md
              border
              border-[#e3e4e7]
              bg-white
              px-4
              text-[11px]
              font-medium
              text-[#303642]
              transition
              hover:border-[#c99232]
              hover:text-[#b77918]
            "
          >
            <FaArrowLeft className="text-[10px]" />
            Back to Products
          </Link>

          <button
            type="button"
            className="
              flex
              h-9
              items-center
              gap-2
              rounded-md
              border
              border-[#e3e4e7]
              bg-white
              px-4
              text-[11px]
              font-medium
              text-[#303642]
              transition
              hover:border-[#c99232]
              hover:text-[#b77918]
            "
          >
            <FaEdit className="text-[11px]" />
            Edit Product
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen(!moreOpen)}
              className="
                flex
                h-9
                items-center
                gap-2
                rounded-md
                border
                border-[#e3e4e7]
                bg-white
                px-3
                text-[11px]
                font-medium
                text-[#303642]
              "
            >
              <FaEllipsisV className="text-[10px]" />
              More
              <FaChevronDown className="text-[8px]" />
            </button>

            {moreOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-11
                  z-50
                  w-[155px]
                  rounded-md
                  border
                  border-[#e5e5e5]
                  bg-white
                  py-1
                  shadow-lg
                "
              >
                <button className="flex w-full px-3 py-2 text-left text-[10px] text-[#555] hover:bg-[#faf7f1]">
                  Print Product
                </button>

                <button className="flex w-full px-3 py-2 text-left text-[10px] text-[#555] hover:bg-[#faf7f1]">
                  Export Details
                </button>

                <button className="flex w-full px-3 py-2 text-left text-[10px] text-[#555] hover:bg-[#faf7f1]">
                  Archive Product
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN GRID
      ====================================================== */}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_305px]">
        {/* ===================================================
            LEFT CONTENT
        ==================================================== */}

        <div className="min-w-0">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
            {/* ===============================================
                PRODUCT GALLERY
            ================================================ */}

            <div>
              <div
                className="
                  relative
                  h-[280px]
                  overflow-hidden
                  rounded-lg
                  border
                  border-[#e7e7e7]
                  bg-[#f8f7f5]
                "
              >
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

                {/* Fallback */}

                <div className="absolute inset-0 -z-0 flex items-center justify-center">
                  <FaGem className="text-5xl text-[#d6d0c6]" />
                </div>

                {/* Status */}

                <span
                  className="
                    absolute
                    left-3
                    top-3
                    rounded
                    bg-[#e9f9ef]
                    px-2.5
                    py-1
                    text-[9px]
                    font-medium
                    text-[#168a43]
                  "
                >
                  Active
                </span>

                {/* Favorite */}

                <button
                  type="button"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="
                    absolute
                    right-3
                    top-3
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-[#69707c]
                    shadow-sm
                  "
                >
                  {isFavorite ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>

              {/* Thumbnails */}

              <div className="mt-2 flex gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`
                      relative
                      h-[55px]
                      w-[58px]
                      overflow-hidden
                      rounded-md
                      border
                      bg-white
                      ${
                        selectedImage === index
                          ? "border-[#c98d2b] ring-1 ring-[#c98d2b]"
                          : "border-[#e5e5e5]"
                      }
                    `}
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </button>
                ))}

                <button
                  type="button"
                  className="
                    relative
                    flex
                    h-[55px]
                    w-[58px]
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-md
                    bg-[#777]
                    text-white
                  "
                >
                  <span className="text-[11px] font-medium">
                    +2
                  </span>
                </button>
              </div>
            </div>

            {/* ===============================================
                PRODUCT SUMMARY
            ================================================ */}

            <div>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-[20px] font-semibold text-[#181c27]">
                    {product.name}
                  </h2>

                  <div className="mt-2 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className="text-[12px] text-[#d58d1e]"
                      />
                    ))}

                    <span className="ml-2 text-[10px] font-medium text-[#414652]">
                      {product.rating}
                    </span>

                    <span className="text-[10px] text-[#777d87]">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* SKU */}

              <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#6e747e]">
                <span>
                  SKU:{" "}
                  <strong className="font-medium text-[#424752]">
                    {product.sku}
                  </strong>
                </span>

                <span className="h-3 w-px bg-[#ddd]" />

                <span>
                  HSN:{" "}
                  <strong className="font-medium text-[#424752]">
                    {product.hsn}
                  </strong>
                </span>

                <span className="h-3 w-px bg-[#ddd]" />

                <span>
                  Brand:{" "}
                  <strong className="font-medium text-[#424752]">
                    {product.brand}
                  </strong>
                </span>
              </div>

              {/* Product badges */}

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="flex items-center gap-1.5 rounded-md border border-[#e5e5e5] bg-white px-2.5 py-1.5 text-[9px] text-[#555b65]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d79b23] ring-1 ring-[#bd8212]" />
                  Gold 22K
                </span>

                <span className="flex items-center gap-1.5 rounded-md border border-[#e5e5e5] bg-white px-2.5 py-1.5 text-[9px] text-[#555b65]">
                  <FaGem className="text-[9px]" />
                  Diamond
                </span>

                <span className="flex items-center gap-1.5 rounded-md border border-[#dcd9ff] bg-[#f8f7ff] px-2.5 py-1.5 text-[9px] text-[#6559c7]">
                  <FaCertificate className="text-[9px]" />
                  BIS Hallmarked
                </span>
              </div>

              {/* Description */}

              <div className="mb-4">
                <h3 className="mb-1 text-[11px] font-semibold text-[#252a34]">
                  Description
                </h3>

                <p className="max-w-[560px] text-[10px] leading-4 text-[#777d87]">
                  {product.description}
                </p>
              </div>

              {/* Price information */}

              <div
                className="
                  rounded-md
                  border
                  border-[#e8e8e8]
                  bg-white
                  px-3
                  py-4
                "
              >
                <div className="grid grid-cols-3">
                  <div className="border-r border-[#e5e5e5] px-2">
                    <p className="text-[9px] text-[#737985]">
                      Selling Price (₹)
                    </p>

                    <p className="mt-1 text-[17px] font-semibold text-[#222631]">
                      ₹52,600
                    </p>
                  </div>

                  <div className="border-r border-[#e5e5e5] px-4">
                    <p className="text-[9px] text-[#737985]">
                      Making Charges (₹)
                    </p>

                    <p className="mt-1 text-[14px] font-medium text-[#333844]">
                      ₹4,500
                    </p>
                  </div>

                  <div className="px-4">
                    <p className="text-[9px] text-[#737985]">
                      Weight
                    </p>

                    <p className="mt-1 text-[14px] font-medium text-[#333844]">
                      18.250 g
                    </p>
                  </div>
                </div>

                {/* Tags */}

                <div className="mt-4">
                  <p className="mb-2 text-[9px] font-semibold text-[#4b505a]">
                    Tags
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={tag}
                        className={`
                          rounded
                          border
                          px-2.5
                          py-1
                          text-[9px]
                          ${
                            index === 0
                              ? "border-[#ead5ae] bg-[#fff8e9] text-[#805e27]"
                              : "border-[#e4e5e7] bg-white text-[#666b75]"
                          }
                        `}
                      >
                        {tag}
                      </span>
                    ))}

                    <button
                      type="button"
                      className="flex items-center gap-1 rounded border border-[#e4e5e7] px-2.5 py-1 text-[9px] text-[#666b75] hover:bg-[#fafafa]"
                    >
                      <FaPlus className="text-[7px]" />
                      Add Tag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              PRODUCT INFORMATION TABS
          ================================================== */}

          <div className="mt-5 overflow-hidden rounded-lg border border-[#e5e5e5] bg-white">
            {/* Tabs */}

            <div className="flex overflow-x-auto border-b border-[#e7e7e7]">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.name;

                return (
                  <button
                    key={tab.name}
                    type="button"
                    onClick={() => setActiveTab(tab.name)}
                    className={`
                      relative
                      flex
                      min-w-fit
                      items-center
                      gap-2
                      px-4
                      py-4
                      text-[10px]
                      font-medium
                      transition
                      ${
                        active
                          ? "text-[#bf7d17]"
                          : "text-[#656b76] hover:text-[#333]"
                      }
                    `}
                  >
                    <Icon className="text-[9px]" />

                    {tab.name}

                    {active && (
                      <span className="absolute bottom-0 left-1/2 h-[2px] w-[125px] -translate-x-1/2 bg-[#c88b28]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Product Information */}

            {activeTab === "Product Information" && (
              <div className="p-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* General */}

                  <div>
                    <h3 className="mb-3 text-[11px] font-semibold text-[#20252f]">
                      General Information
                    </h3>

                    <div className="divide-y divide-[#eeeeee]">
                      <InfoRow
                        label="Category"
                        value={product.category}
                      />

                      <InfoRow
                        label="Sub Category"
                        value={product.subCategory}
                      />

                      <InfoRow
                        label="Metal Type"
                        value={
                          <span className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#d99b22]" />
                            {product.metalType}
                          </span>
                        }
                      />

                      <InfoRow
                        label="Purity"
                        value={product.purity}
                      />

                      <InfoRow
                        label="Diamond Type"
                        value={product.diamondType}
                      />

                      <InfoRow
                        label="Total Diamond Weight"
                        value={product.diamondWeight}
                      />

                      <InfoRow
                        label="Setting Type"
                        value={product.settingType}
                      />

                      <InfoRow
                        label="Collection"
                        value={product.collection}
                      />
                    </div>
                  </div>

                  {/* Additional */}

                  <div className="border-l-0 md:border-l md:border-[#eeeeee] md:pl-6">
                    <h3 className="mb-3 text-[11px] font-semibold text-[#20252f]">
                      Additional Information
                    </h3>

                    <div className="divide-y divide-[#eeeeee]">
                      <InfoRow
                        label="HSN Code"
                        value={product.hsn}
                      />

                      <InfoRow
                        label="GST Rate"
                        value={product.gstRate}
                      />

                      <InfoRow
                        label="Product Dimensions"
                        value={product.dimensions}
                      />

                      <InfoRow
                        label="Gross Weight"
                        value={product.grossWeight}
                      />

                      <InfoRow
                        label="Net Weight"
                        value={product.netWeight}
                      />

                      <InfoRow
                        label="Certificate"
                        value={product.certificate}
                      />

                      <InfoRow
                        label="Hallmark"
                        value={product.hallmark}
                      />

                      <InfoRow
                        label="Return Policy"
                        value={product.returnPolicy}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other tab content */}

            {activeTab !== "Product Information" && (
              <div className="flex min-h-[230px] flex-col items-center justify-center p-8 text-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#fff7e8] text-[#c88b28]">
                  <FaClipboardList className="text-sm" />
                </div>

                <h3 className="text-[12px] font-semibold text-[#333]">
                  {activeTab}
                </h3>

                <p className="mt-1 max-w-sm text-[10px] text-[#999]">
                  Product {activeTab.toLowerCase()} will appear
                  here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ===================================================
            RIGHT SIDEBAR
        ==================================================== */}

        <div className="space-y-4">
          {/* Stock Information */}

          <SideCard title="Stock Information">
            <SideRow
              label="Current Stock"
              value={
                <span className="text-[#1a9a52]">
                  18 Pcs
                </span>
              }
            />

            <SideRow
              label="Reserved Stock"
              value="2 Pcs"
            />

            <SideRow
              label="Available Stock"
              value={
                <span className="text-[#1a9a52]">
                  16 Pcs
                </span>
              }
            />

            <SideRow
              label="Low Stock Alert"
              value="10 Pcs"
            />

           
          </SideCard>

          {/* Product Status */}

          <SideCard title="Product Status">
            <SideRow
              label="Status"
              value={
                <span className="rounded bg-[#eaf9ef] px-2.5 py-1 text-[9px] font-medium text-[#168d46]">
                  Active
                </span>
              }
            />

            <SideRow
              label="Added On"
              value="18 May 2025"
            />

            <SideRow
              label="Last Updated"
              value="18 May 2025, 10:30 AM"
            />

            <SideRow
              label="Added By"
              value="Admin User"
            />
          </SideCard>

          {/* Pricing Details */}

          <SideCard title="Pricing Details">
            <SideRow
              label="Metal Value"
              value="₹38,900"
            />

            <SideRow
              label="Making Charges"
              value="₹4,500"
            />

            <SideRow
              label="Diamond Value"
              value="₹8,700"
            />

            <div className="my-2 border-t border-[#eeeeee]" />

            <SideRow
              label="Total Cost"
              value="₹52,100"
            />

            <SideRow
              label="Profit Margin"
              value="9.56%"
            />

            <SideRow
              label="Selling Price"
              value={
                <span className="font-semibold text-[#c27e17]">
                  ₹52,600
                </span>
              }
            />
          </SideCard>

          {/* Quick Actions */}

          <SideCard title="Quick Actions">
            <button
              type="button"
              className="
                flex
                h-8
                w-full
                items-center
                gap-3
                rounded-md
                border
                border-[#e0e1e3]
                px-3
                text-left
                text-[10px]
                text-[#555b65]
                hover:bg-[#fafafa]
              "
            >
              <FaCopy className="text-[11px]" />
              Duplicate Product
            </button>

            <button
              type="button"
              className="
                mt-2
                flex
                h-8
                w-full
                items-center
                gap-3
                rounded-md
                bg-[#fff7e8]
                px-3
                text-left
                text-[10px]
                text-[#b67517]
                hover:bg-[#fff2d9]
              "
            >
              <FaEye className="text-[11px]" />
              View Product in Store
            </button>

            <button
              type="button"
              className="
                mt-2
                flex
                h-8
                w-full
                items-center
                gap-3
                rounded-md
                border
                border-red-300
                px-3
                text-left
                text-[10px]
                text-red-500
                hover:bg-red-50
              "
            >
              <FaTrashAlt className="text-[11px]" />
              Delete Product
            </button>
          </SideCard>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   REUSABLE COMPONENTS
========================================================== */

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="grid grid-cols-[48%_52%] items-center py-2">
      <span className="text-[9px] text-[#707680]">
        {label}
      </span>

      <span className="text-[9px] font-medium text-[#525862]">
        {value}
      </span>
    </div>
  );
}

interface SideCardProps {
  title: string;
  children: React.ReactNode;
}

function SideCard({ title, children }: SideCardProps) {
  return (
    <div className="rounded-lg border border-[#e5e5e5] bg-white p-3.5">
      <h3 className="mb-3 text-[11px] font-semibold text-[#242934]">
        {title}
      </h3>

      <div>{children}</div>
    </div>
  );
}

interface SideRowProps {
  label: string;
  value: React.ReactNode;
}

function SideRow({ label, value }: SideRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="text-[9px] text-[#747a84]">
        {label}
      </span>

      <span className="text-right text-[9px] font-medium text-[#444a54]">
        {value}
      </span>
    </div>
  );
}