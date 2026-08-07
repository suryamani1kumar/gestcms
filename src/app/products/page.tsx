"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiCopy, FiEye, FiFilter } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

function ActionMenu({
  item,
  onEdit,
  onDelete,
  onToggleStatus,
  onDuplicate,
}: any) {
  const baseClass =
    "group relative flex h-7 w-7 cursor-pointer items-center justify-center rounded transition-all duration-200 shadow-sm";

  return (
    <>
      {/* Edit */}
      <button
        onClick={() => onEdit(item)}
        className={`${baseClass} bg-blue-100 text-blue-600 hover:bg-blue-200`}
      >
        <FiEdit className="text-sm" />

        <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-blue-600 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
          Edit
        </span>
      </button>

      {/* View */}
      <button
        onClick={() => console.log(item)}
        className={`${baseClass} bg-green-100 text-green-600 hover:bg-green-200`}
      >
        <FiEye className="text-sm" />

        <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-green-600 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
          View
        </span>
      </button>

      {/* Duplicate */}
      <button
        onClick={() => onDuplicate(item)}
        className={`${baseClass} bg-purple-100 text-purple-600 hover:bg-purple-200`}
      >
        <FiCopy className="text-sm" />

        <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-purple-600 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
          Replicate
        </span>
      </button>

      {/* Active / Inactive */}
      <button
        onClick={() => onToggleStatus(item)}
        className={`${baseClass} bg-amber-100 text-amber-600 hover:bg-amber-200`}
      >
        {item.status === "Active" ? (
          <MdToggleOff className="text-lg" />
        ) : (
          <MdToggleOn className="text-lg" />
        )}

        <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-amber-600 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
          {item.status === "Active" ? "Make Inactive" : "Make Active"}
        </span>
      </button>

      {/* Delete */}
      <button
        onClick={() => onDelete(item)}
        className={`${baseClass} bg-red-100 text-red-600 hover:bg-red-200`}
      >
        <FiTrash2 className="text-sm" />

        <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-red-600 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
          Delete
        </span>
      </button>
    </>
  );
}
export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  const fetchGemstones = async () => {
    try {
      const res = await fetch("/api/products", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGemstones();
  }, []);

  const handleEdit = (item: any) => {
    router.push(`/products/${item._id}/edit`);
  };

  const handleToggleStatus = async (item: any) => {
    try {
      const res = await fetch(`/api/products/${item._id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: item.status === "Active" ? "Inactive" : "Active",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      fetchGemstones();
    } catch (error) {
      console.error(error);
      alert("Failed to update status.");
    }
  };

  const handleDuplicate = async (item: any) => {
    try {
      const res = await fetch(`/api/products/${item._id}/duplicate`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to duplicate gemstone");
      }

      fetchGemstones();
    } catch (error) {
      console.error(error);
      alert("Failed to duplicate gemstone.");
    }
  };

  const handleDelete = async (item: any) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name}"?`,
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/products/${item._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete gemstone");
      }

      fetchGemstones();
    } catch (error) {
      console.error(error);
      alert("Failed to delete gemstone.");
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen flex flex-col">
      <div className="flex-1 p-2 md:p-3 font-sans">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
          <div>
            <h1 className="text-xl font-bold text-neutral-900">
              All Products
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              {products.length} products
              {products.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/products/create")}
              className={`flex items-center cursor-pointer gap-2 px-3 py-1.5 border rounded-lg text-xs font-semibold transition-colors
              bg-indigo-50 border-indigo-200 text-indigo-700`}
            >
              <IoMdAdd className={"text-indigo-600"} />
              Add
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center cursor-pointer gap-2 px-3 py-1.5 border rounded-lg text-xs font-semibold transition-colors
              ${showFilters ? "bg-teal-50 border-teal-200 text-teal-700" : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"}`}
            >
              <FiFilter
                className={showFilters ? "text-teal-600" : "text-neutral-400"}
              />
              Filters
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-3 px-3 py-2 bg-neutral-50 border-b border-neutral-100 text-[10px] font-bold text-neutral-600 uppercase tracking-wider">
            <div className="col-span-1">Image</div>
            <div className="col-span-2">SKU</div>
            <div className="col-span-1">Stock</div>
            <div className="col-span-2">Name</div>
            <div className="col-span-1">Category</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>
          {loading ? (
            <div className="py-10 text-center text-neutral-400 text-xs">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="py-10 text-center text-neutral-400 text-xs">
              No products found.
            </div>
          ) : (
            products.map((item) => (
              <div
                key={item._id}
                className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50"
              >
                <div
                  className={`grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-3 px-3 py-2.5 transition-colors items-center
                      `}
                >
                  <div className="col-span-1 md:col-span-1">
                    <img
                      src={item.featuredImage || "/banner.png"}
                      alt={item.name}
                      className="h-8 w-18 rounded object-cover"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <p className="text-xs font-bold text-neutral-500 font-mono">
                      {item.sku}
                    </p>
                  </div>
                  <div className="col-span-1 md:col-span-1">
                    <p className="text-xs font-bold text-neutral-500 font-mono">
                      {item.inventory?.stock}
                    </p>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <p className="text-xs font-bold text-neutral-500 font-mono">
                      {item.name}
                    </p>
                  </div>

                  <div className="col-span-1 md:col-span-1">
                    <p className="text-xs font-bold text-neutral-500 font-mono">
                      {item.category}
                    </p>
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <p className="text-xs font-bold text-neutral-500 font-mono">
                      ₹{item.pricing?.sellingPrice}
                    </p>
                  </div>

                  <div className="col-span-1 md:col-span-1 text-center">
                    <span className="text-sm text-green-500 font-bold">
                      {item.status}
                    </span>
                  </div>
                  <div className="col-span-1 md:col-span-2 flex justify-end items-center gap-2">
                    <ActionMenu
                      item={item}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onToggleStatus={handleToggleStatus}
                      onDuplicate={handleDuplicate}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
