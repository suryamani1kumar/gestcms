"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiMoreVertical,
  FiEdit,
  FiTrash2,
  FiCopy,
  FiEye,
} from "react-icons/fi";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

function ActionMenu({
  item,
  onEdit,
  onDelete,
  onToggleStatus,
  onDuplicate,
}: any) {
  const actionClass =
    "group relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200 transition hover:bg-indigo-50 hover:border-indigo-300";

  return (
    <div className="flex max-h-56 flex-wrap gap-3 justify-end">
      {/* Edit */}
      <button onClick={() => onEdit(item)} className={actionClass}>
        <FiEdit size={15} />

        <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
          Edit
        </span>
      </button>

      {/* View */}
      <button onClick={() => console.log(item)} className={actionClass}>
        <FiEye size={15} />

        <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
          View
        </span>
      </button>

      {/* Duplicate */}
      <button onClick={() => onDuplicate(item)} className={actionClass}>
        <FiCopy size={15} />

        <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
          Replicate
        </span>
      </button>

      {/* Active / Inactive */}
      <button onClick={() => onToggleStatus(item)} className={actionClass}>
        {item.status === "Active" ? (
          <MdToggleOff size={22} />
        ) : (
          <MdToggleOn size={22} />
        )}

        <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
          {item.status === "Active" ? "Make Inactive" : "Make Active"}
        </span>
      </button>

      {/* Delete */}
      <button
        onClick={() => onDelete(item)}
        className={`${actionClass} hover:border-red-300 hover:bg-red-50`}
      >
        <FiTrash2 size={15} className="text-red-600" />

        <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-red-600 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
          Delete
        </span>
      </button>
    </div>
  );
}
export default function Gemstones() {
  const [gemstones, setGemstones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchGemstones = async () => {
    try {
      const res = await fetch("/api/gemstones", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setGemstones(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch gemstones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGemstones();
  }, []);
  
  const handleEdit = (item: any) => {
    router.push(`/gemstones/${item._id}/edit`);
  };

  const handleToggleStatus = async (item: any) => {
    try {
      const res = await fetch(`/api/gemstones/${item._id}/status`, {
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
      const res = await fetch(`/api/gemstones/${item._id}/duplicate`, {
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
      const res = await fetch(`/api/gemstones/${item._id}`, {
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
  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="mb-6 text-2xl font-bold">Gemstones</h1>
        <button
          onClick={() => router.push("/gemstones/create")}
          className="rounded bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700 cursor-pointer"
        >
          Add Gemstone
        </button>
      </div>

      <div className="rounded-lg border bg-white">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">SKU</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Stock</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {gemstones.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500">
                  No gemstones found.
                </td>
              </tr>
            ) : (
              gemstones.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-2">
                    <img
                      src={item.featuredImage || "/placeholder.png"}
                      alt={item.name}
                      className="h-14 w-14 rounded object-cover"
                    />
                  </td>

                  <td className="p-2">{item.sku}</td>

                  <td className="p-2 font-medium">{item.name}</td>

                  <td className="p-2">{item.category}</td>

                  <td className="p-2">₹{item.pricing?.sellingPrice}</td>

                  <td className="p-2">{item.inventory?.stock}</td>

                  <td className="p-2">
                    <span className="rounded bg-green-100 p-2 text-sm text-green-700">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <ActionMenu
                      item={item}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onToggleStatus={handleToggleStatus}
                      onDuplicate={handleDuplicate}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
