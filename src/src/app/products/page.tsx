"use client";

import PageHeader from "@/components/pageheader/PageHeader";
import StatCard from "@/components/statcard/StatCard";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  FaSearch,
  FaSlidersH,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaPencilAlt,
  FaTrash,
  FaGem,
  FaExclamationTriangle,
  FaTimesCircle,
  FaEllipsisV,
  FaRupeeSign,
} from "react-icons/fa";

import { MdShoppingBag } from "react-icons/md";

interface Product {
  id: string;

  sku: string;

  name: string;

  category: {
    name: string;
  };

  type: "Jewellery" | "Gemstone" | "Rudraksha";

  productType: string;

  material: string;

  price: number;

  stock: number;

  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";

  status: "Draft" | "Published" | "Archived";

  createdAt: string;

  image: string;
}

interface ProductStats {
  totalProducts: number;

  activeProducts: number;

  lowStock: number;

  outOfStock: number;

  totalValue: number;
}

interface Pagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;

  hasNextPage: boolean;

  hasPreviousPage: boolean;
}

const formatCurrency = (value: number) => {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

export default function ProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);

  console.log("products", products);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All Categories");

  const [type, setType] = useState("All Types");

  const [status, setStatus] = useState("All Status");

  const [stockStatus, setStockStatus] = useState("All Stock");

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [statsData, setStatsData] = useState<ProductStats>({
    totalProducts: 0,

    activeProducts: 0,

    lowStock: 0,

    outOfStock: 0,

    totalValue: 0,
  });

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,

    limit: 10,

    total: 0,

    totalPages: 1,

    hasNextPage: false,

    hasPreviousPage: false,
  });

  const categories = [
    "All Categories",
    "Necklaces",
    "Rings",
    "Earrings",
    "Pendants",
    "Bracelets",
    "Bangles",
    "Chains",
    "Diamond",
    "Ruby",
    "Sapphire",
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      params.set("page", String(currentPage));

      params.set("limit", String(itemsPerPage));

      /*
       * SEARCH
       */
      if (search.trim()) {
        params.set("search", search.trim());
      }

      /*
       * CATEGORY
       */
      if (category !== "All Categories") {
        params.set("category", category);
      }

      /*
       * PRODUCT TYPE
       */
      if (type !== "All Types") {
        const typeMap: Record<string, string> = {
          Jewellery: "jewellery",

          Gemstone: "gemstone",

          Rudraksha: "rudraksha",
        };

        params.set("productType", typeMap[type] || type.toLowerCase());
      }

      /*
       * STATUS
       */
      if (status !== "All Status") {
        params.set("status", status);
      }

      /*
       * STOCK STATUS
       */
      if (stockStatus !== "All Stock") {
        params.set("stockStatus", stockStatus);
      }

      const response = await fetch(`/api/products?${params.toString()}`, {
        method: "GET",

        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch products");
      }

      setProducts(data.data || []);

      setStatsData({
        totalProducts: data.stats?.totalProducts || 0,

        activeProducts: data.stats?.activeProducts || 0,

        lowStock: data.stats?.lowStock || 0,

        outOfStock: data.stats?.outOfStock || 0,

        totalValue: data.stats?.totalValue || 0,
      });

      setPagination(
        data.pagination || {
          page: currentPage,

          limit: itemsPerPage,

          total: 0,

          totalPages: 1,

          hasNextPage: false,

          hasPreviousPage: false,
        },
      );
    } catch (error) {
      console.error("Failed to fetch products:", error);

      setProducts([]);

      setPagination((previous) => ({
        ...previous,

        total: 0,

        totalPages: 1,
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, itemsPerPage, search, category, type, status, stockStatus]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);

    setCurrentPage(1);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCategory(event.target.value);

    setCurrentPage(1);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);

    setCurrentPage(1);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);

    setCurrentPage(1);
  };

  const handleStockStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setStockStatus(event.target.value);

    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");

    setCategory("All Categories");

    setType("All Types");

    setStatus("All Status");

    setStockStatus("All Stock");

    setCurrentPage(1);
  };

  const handleDelete = async (id: string) => {
    const product = products.find((item) => item.id === id);

    if (!product) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete product");
      }

      setOpenMenu(null);

      /*
       * If the last product on the
       * current page was deleted,
       * move back one page.
       */
      if (products.length === 1 && currentPage > 1) {
        setCurrentPage((previous) => previous - 1);
      } else {
        await fetchProducts();
      }
    } catch (error) {
      console.error("Delete product error:", error);

      alert("Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (productStatus: Product["status"]) => {
    if (productStatus === "Published") {
      return "bg-[#eaf8ef] text-[#159447]";
    }

    if (productStatus === "Draft") {
      return "bg-[#fff3d5] text-[#b67d20]";
    }

    return "bg-[#f3f3f3] text-[#777]";
  };

  const getStockStyle = (stock: number) => {
    if (stock === 0) {
      return "text-[#d64747]";
    }

    if (stock <= 5) {
      return "text-[#c88a20]";
    }

    return "text-[#333]";
  };

  const stats = [
    {
      title: "Total Products",

      value: statsData.totalProducts.toLocaleString("en-IN"),

      change: "",

      positive: true,

      icon: <MdShoppingBag />,

      iconBg: "bg-[#f0eaff]",

      iconColor: "text-[#8c6dd7]",
    },

    {
      title: "Active Products",

      value: statsData.activeProducts.toLocaleString("en-IN"),

      change: "",

      positive: true,

      icon: <FaGem />,

      iconBg: "bg-[#e9f8ef]",

      iconColor: "text-[#25a25a]",
    },

    {
      title: "Low Stock",

      value: statsData.lowStock.toLocaleString("en-IN"),

      change: "",

      positive: false,

      icon: <FaExclamationTriangle />,

      iconBg: "bg-[#fff3d5]",

      iconColor: "text-[#d5a332]",
    },

    {
      title: "Out of Stock",

      value: statsData.outOfStock.toLocaleString("en-IN"),

      change: "",

      positive: false,

      icon: <FaTimesCircle />,

      iconBg: "bg-[#fff0f0]",

      iconColor: "text-[#d64747]",
    },

    {
      title: "Total Value",

      value: formatCurrency(statsData.totalValue),

      change: "",

      positive: true,

      icon: <FaRupeeSign />,

      iconBg: "bg-[#ffe8e2]",

      iconColor: "text-[#ee806b]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] p-3 md:p-6">
      <PageHeader
        title="Products"
        description="Manage your jewellery and gemstone products."
        buttonText="Add Product"
        onButtonClick={() => router.push("/products/create")}
      />

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="mt-3 overflow-hidden rounded-lg border border-[#e7e7e7] bg-white">
        <div className="flex flex-col gap-3 border-b border-[#eeeeee] p-4 xl:flex-row xl:items-center">
          {/* SEARCH */}

          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-[#959ba3]" />

            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search product, SKU or category..."
              className="h-9 w-full rounded-md border border-[#dedede] bg-white pl-9 pr-3 text-xs text-[#333] outline-none placeholder:text-[#9da1a7] focus:border-[#c99438] focus:ring-2 focus:ring-[#c99438]/10"
            />
          </div>

          {/* CATEGORY */}

          <div className="relative">
            <select
              value={category}
              onChange={handleCategoryChange}
              className="h-9 min-w-[155px] appearance-none rounded-md border border-[#dedede] bg-white px-3 pr-8 text-xs text-[#555] outline-none focus:border-[#c99438]"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-[#777]" />
          </div>

          {/* TYPE */}

          <div className="relative">
            <select
              value={type}
              onChange={handleTypeChange}
              className="h-9 min-w-[125px] appearance-none rounded-md border border-[#dedede] bg-white px-3 pr-8 text-xs text-[#555] outline-none focus:border-[#c99438]"
            >
              <option>All Types</option>

              <option>Jewellery</option>

              <option>Gemstone</option>

              <option>Rudraksha</option>
            </select>

            <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-[#777]" />
          </div>

          {/* STATUS */}

          <div className="relative">
            <select
              value={status}
              onChange={handleStatusChange}
              className="h-9 min-w-[130px] appearance-none rounded-md border border-[#dedede] bg-white px-3 pr-8 text-xs text-[#555] outline-none focus:border-[#c99438]"
            >
              <option>All Status</option>

              <option>Published</option>

              <option>Draft</option>

              <option>Archived</option>
            </select>

            <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-[#777]" />
          </div>

          {/* STOCK */}

          <div className="relative">
            <select
              value={stockStatus}
              onChange={handleStockStatusChange}
              className="h-9 min-w-[130px] appearance-none rounded-md border border-[#dedede] bg-white px-3 pr-8 text-xs text-[#555] outline-none focus:border-[#c99438]"
            >
              <option>All Stock</option>

              <option>In Stock</option>

              <option>Low Stock</option>

              <option>Out of Stock</option>
            </select>

            <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-[#777]" />
          </div>

          {/* FILTER */}

          <button
            type="button"
            className="flex h-9 items-center justify-center gap-2 rounded-md border border-[#e5d9c6] bg-[#fffaf2] px-4 text-xs font-medium text-[#a8731d] transition hover:bg-[#fff3df]"
          >
            <FaSlidersH className="text-[11px]" />
            Filters
          </button>

          {/* RESET */}

          <button
            type="button"
            onClick={resetFilters}
            className="h-10 px-2 text-xs font-medium text-[#a8731d] hover:underline"
          >
            Reset
          </button>
        </div>

        {/* ===============================================
            TABLE
        =============================================== */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1150px] border-collapse">
            <thead>
              <tr className="border-b border-[#eeeeee] bg-[#fcfcfc]">
                <th className="w-10 px-4 py-3 text-left text-[12px] font-semibold text-[#666]">
                  #
                </th>

                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#666]">
                  Product
                </th>

                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#666]">
                  SKU
                </th>

                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#666]">
                  Category
                </th>

                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#666]">
                  Type
                </th>

                <th className="px-4 py-3 text-right text-[12px] font-semibold text-[#666]">
                  Price
                </th>

                <th className="px-4 py-3 text-center text-[12px] font-semibold text-[#666]">
                  Stock
                </th>

                <th className="px-4 py-3 text-center text-[12px] font-semibold text-[#666]">
                  Status
                </th>

                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#666]">
                  Add On
                </th>

                <th className="px-4 py-3 text-center text-[12px] font-semibold text-[#666]">
                  Action
                </th>
              </tr>
            </thead>

            {loading ? (
              <tbody>
                <tr>
                  <td colSpan={10} className="h-64">
                    <div className="flex h-full w-full flex-col items-center justify-center">
                      <div className="relative h-10 w-10">
                        <div className="absolute inset-0 animate-spin rounded-full border-2 border-[#E5E7EB] border-t-[#080e17]" />
                      </div>

                      <p className="mt-3 text-xs font-semibold text-gray-500">
                        Loading Products...
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.id}
                    className="border-b border-[#eeeeee] transition hover:bg-[#fffdf9]"
                  >
                    {/* NUMBER */}

                    <td className="px-4 py-3 text-[12px] text-[#777]">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    {/* PRODUCT */}

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-11 shrink-0 overflow-hidden rounded-md border border-[#e5e0d8] bg-[#f8f8f8]">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            onError={(event) => {
                              event.currentTarget.src = "/banner.png";
                            }}
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-[12px] font-semibold text-[#252525]">
                            {product.name}
                          </p>

                          <p className="mt-0.5 text-[10px] text-[#92969d]">
                            {product.material}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}

                    <td className="px-4 py-3">
                      <span className="text-[11px] font-medium text-[#555]">
                        {product.sku}
                      </span>
                    </td>

                    {/* CATEGORY */}

                    <td className="px-4 py-3">
                      <span className="rounded bg-[#f5f3ef] px-2 py-1 text-[11px] text-[#666]">
                        {product.category.name}
                      </span>
                    </td>

                    {/* TYPE */}

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-full
                              ${
                                product.type === "Gemstone"
                                  ? "bg-[#f1edff] text-[#8065d8]"
                                  : product.type === "Rudraksha"
                                    ? "bg-[#fff0e4] text-[#c66c28]"
                                    : "bg-[#fff5dc] text-[#c99438]"
                              }
                            `}
                        >
                          <FaGem className="text-[11px]" />
                        </div>

                        <span className="text-[11px] text-[#555]">
                          {product.type}
                        </span>
                      </div>
                    </td>

                    {/* PRICE */}

                    <td className="px-4 py-3 text-right">
                      <span className="text-[12px] font-bold text-[#333]">
                        {formatCurrency(product.price)}
                      </span>
                    </td>

                    {/* STOCK */}

                    <td className="px-4 py-3 text-center">
                      <span
                        className={`
                            text-[12px]
                            font-semibold
                            ${getStockStyle(product.stock)}
                          `}
                      >
                        {product.stock}
                      </span>

                      {product.stock > 0 && product.stock <= 5 && (
                        <p className="mt-0.5 text-[10px] text-[#c88a20]">
                          Low stock
                        </p>
                      )}

                      {product.stock === 0 && (
                        <p className="mt-0.5 text-[10px] text-[#d64747]">
                          Out of stock
                        </p>
                      )}
                    </td>

                    {/* STATUS */}

                    <td className="px-4 py-3 text-center">
                      <span
                        className={`
                            inline-flex
                            rounded
                            px-2.5
                            py-1
                            text-[11px]
                            font-medium
                            ${getStatusStyle(product.status)}
                          `}
                      >
                        {product.status}
                      </span>
                    </td>

                    {/* ADD ON */}

                    <td className="px-4 py-3 text-[12px] text-[#777]">
                      {product.createdAt}
                    </td>

                    {/* ACTION */}

                    <td className="relative px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        {/* VIEW */}

                        <button
                          type="button"
                          title="View"
                          onClick={() => router.push(`/products/${product.id}`)}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-[#e0e0e0] text-[#666] transition hover:border-[#c99438] hover:bg-[#fffaf2] hover:text-[#b67d20]"
                        >
                          <FaEye className="text-[13px]" />
                        </button>

                        {/* EDIT */}

                        <button
                          type="button"
                          title="Edit"
                          onClick={() =>
                            router.push(`/products/${product.id}/edit`)
                          }
                          className="flex cursor-pointer h-8 w-8 items-center justify-center rounded border border-[#e0e0e0] text-[#666] transition hover:border-[#c99438] hover:bg-[#fffaf2] hover:text-[#b67d20]"
                        >
                          <FaPencilAlt className="text-[12px]" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-[#f0cccc] text-[#d95353] transition hover:bg-[#fff2f2] disabled:opacity-50"
                        >
                          <FaTrash className="text-[12px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {products.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-4 py-16 text-center">
                      <div className="text-sm font-medium text-[#555]">
                        No products found
                      </div>

                      <p className="mt-1 text-xs text-[#999]">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#eeeeee] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          {/* SHOWING */}

          <p className="text-[12px] text-[#777]">
            Showing{" "}
            {pagination.total === 0
              ? 0
              : (pagination.page - 1) * pagination.limit + 1}{" "}
            to {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
            of {pagination.total} products
          </p>

          {/* PAGES */}

          <div className="flex items-center gap-1.5">
            {/* PREVIOUS */}

            <button
              type="button"
              disabled={!pagination.hasPreviousPage}
              onClick={() =>
                setCurrentPage((previous) => Math.max(1, previous - 1))
              }
              className="flex h-7 w-7 items-center justify-center rounded border border-[#dedede] text-[#777] hover:bg-[#fafafa] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronLeft className="text-[9px]" />
            </button>

            {/* PAGE NUMBERS */}

            {Array.from(
              {
                length: pagination.totalPages,
              },
              (_, index) => index + 1,
            )
              .slice(0, 5)
              .map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded
                      text-[10px]
                      font-medium
                      ${
                        currentPage === page
                          ? "bg-[#c99438] text-white"
                          : "border border-[#dedede] text-[#555] hover:bg-[#fafafa]"
                      }
                    `}
                >
                  {page}
                </button>
              ))}

            {/* NEXT */}

            <button
              type="button"
              disabled={!pagination.hasNextPage}
              onClick={() =>
                setCurrentPage((previous) =>
                  Math.min(pagination.totalPages, previous + 1),
                )
              }
              className="flex h-7 w-7 items-center justify-center rounded border border-[#dedede] text-[#777] hover:bg-[#fafafa] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronRight className="text-[9px]" />
            </button>
          </div>

          {/* ITEMS PER PAGE */}

          <select
            value={itemsPerPage}
            onChange={(event) => {
              setItemsPerPage(Number(event.target.value));

              setCurrentPage(1);
            }}
            className="h-7 rounded border border-[#dedede] bg-white px-1 text-[12px] text-[#555] outline-none"
          >
            <option value={10}>10 / page</option>

            <option value={20}>20 / page</option>

            <option value={30}>30 / page</option>

            <option value={40}>40 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
}
