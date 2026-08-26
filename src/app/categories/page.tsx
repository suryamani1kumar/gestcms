"use client";

import AddCategories from "@/components/addcategories/AddCategories";
import PageHeader from "@/components/pageheader/PageHeader";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaPencilAlt,
  FaTrash,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaImage,
} from "react-icons/fa";

export interface CategoryImage {
  url: string;
  publicId: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  parentCategory:
    | string
    | {
        _id: string;
        name: string;
        slug: string;
      }
    | null;
  productCount: number;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt?: string;
  image?: CategoryImage | null;
}

export interface CategoryForm {
  name: string;
  parentCategory: string;
  status: "Active" | "Inactive";
  image: CategoryImage | null;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: Category | Category[];
}

const emptyForm: CategoryForm = {
  name: "",
  parentCategory: "",
  status: "Active",
  image: null,
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [showForm, setShowForm] = useState(true);

  const [form, setForm] = useState<CategoryForm>(emptyForm);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getParentCategoryName = useCallback(
    (parentCategory: Category["parentCategory"]) => {
      if (!parentCategory) {
        return "None (Top Level)";
      }

      if (typeof parentCategory === "object") {
        return parentCategory.name || "None (Top Level)";
      }

      const parent = categories.find((item) => item._id === parentCategory);

      return parent?.name || "None (Top Level)";
    },
    [categories],
  );

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/categories", {
        method: "GET",
        cache: "no-store",
      });

      const result: ApiResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch categories.");
      }

      const data = Array.isArray(result.data) ? result.data : [];

      setCategories(data);
    } catch (error) {
      console.error("Fetch categories error:", error);

      alert(
        error instanceof Error ? error.message : "Failed to load categories.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filteredCategories = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return categories.filter((category) => {
      const parentName = getParentCategoryName(
        category.parentCategory,
      ).toLowerCase();

      const matchesSearch =
        category.name.toLowerCase().includes(searchValue) ||
        category.slug.toLowerCase().includes(searchValue) ||
        parentName.includes(searchValue);

      const matchesStatus =
        statusFilter === "All Status" || category.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, statusFilter, getParentCategoryName]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCategories.length / itemsPerPage),
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedCategories = filteredCategories.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleReset = () => {
    setForm({
      ...emptyForm,
    });

    setEditingId(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const categoryName = form.name.trim();

    if (!categoryName) {
      alert("Category name is required.");
      return;
    }

    const parentCategory = form.parentCategory?.trim() || null;

    try {
      setSubmitting(true);

      const payload = {
        name: categoryName,
        parentCategory,
        status: form.status,
        image: form.image
          ? {
              url: form.image.url,
              publicId: form.image.publicId,
            }
          : null,
      };

      const isEditing = editingId !== null;

      const response = await fetch(
        isEditing ? `/api/categories/${editingId}` : "/api/categories",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result: ApiResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            (isEditing
              ? "Failed to update category."
              : "Failed to create category."),
        );
      }

      alert(
        result.message ||
          (isEditing
            ? "Category updated successfully."
            : "Category created successfully."),
      );

      handleReset();

      await fetchCategories();

      setCurrentPage(1);
    } catch (error) {
      console.error("Save category error:", error);

      alert(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (category: Category) => {
    let parentId = "";

    if (category.parentCategory) {
      if (typeof category.parentCategory === "object") {
        parentId = category.parentCategory._id;
      } else {
        parentId = category.parentCategory;
      }
    }

    setEditingId(category._id);

    setForm({
      name: category.name,
      parentCategory: parentId,
      status: category.status,
      image: category.image || null,
    });

    setImagePreview(category.image?.url || null);

    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const category = categories.find((item) => item._id === id);

    if (!category) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      const result: ApiResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete category.");
      }

      alert(result.message || "Category deleted successfully.");

      if (editingId === id) {
        handleReset();
        setShowForm(false);
      }

      await fetchCategories();

      setCurrentPage((prev) => Math.min(prev, totalPages));
    } catch (error) {
      console.error("Delete category error:", error);

      alert(
        error instanceof Error ? error.message : "Failed to delete category.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-6">
      <PageHeader
        title="Categories"
        description="Manage product categories to organize your inventory."
        buttonText="Add Category"
        onButtonClick={() => {
          handleReset();
          setShowForm(true);
        }}
      />

      <div
        className={`grid grid-cols-1 gap-5 ${
          showForm ? "xl:grid-cols-[minmax(0,1fr)_390px]" : ""
        }`}
      >
        <section className="overflow-hidden rounded-lg border border-[#e7e7e7] bg-white">
          {/* TOOLBAR */}

          <div className="flex flex-col gap-3 border-b border-[#eeeeee] p-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#9298a1]" />

              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search category, parent category..."
                className="h-9 w-full rounded-md border border-[#dedede] bg-white pl-9 pr-3 text-xs text-[#333] outline-none transition placeholder:text-[#9ca1a8] focus:border-[#c99438] focus:ring-2 focus:ring-[#c99438]/10"
              />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={handleStatusFilter}
                className="cursor-pointer h-9 min-w-[140px] appearance-none rounded-md border border-[#dedede] bg-white px-3 pr-8 text-xs text-[#555] outline-none focus:border-[#c99438]"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-[#777]" />
            </div>
          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#ededed] bg-[#fcfcfc]">
                  <th className="w-12 px-4 py-3 text-left text-[12px] font-semibold text-[#666]">
                    #
                  </th>

                  <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#666]">
                    Category Name
                  </th>

                  <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#666]">
                    Parent Category
                  </th>

                  <th className="px-4 py-3 text-center text-[12px] font-semibold text-[#666]">
                    Products
                  </th>

                  <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#666]">
                    Status
                  </th>

                  <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#666]">
                    Created On
                  </th>

                  <th className="px-4 py-3 text-center text-[12px] font-semibold text-[#666]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center">
                      <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[#c99438] border-t-transparent" />

                      <p className="mt-3 text-xs text-[#777]">
                        Loading categories...
                      </p>
                    </td>
                  </tr>
                ) : (
                  <>
                    {paginatedCategories.map((category, index) => (
                      <tr
                        key={category._id}
                        className="border-b border-[#eeeeee] transition hover:bg-[#fffdf9]"
                      >
                        <td className="px-4 py-3 text-xs text-[#666]">
                          {startIndex + index + 1}
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-10 shrink-0 overflow-hidden rounded-md border border-[#e6e0d8] bg-[#fafafa]">
                              {category.image?.url ? (
                                <img
                                  src={category.image.url}
                                  alt={category.name}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      "/categories/default.jpg";
                                  }}
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-[9px] text-[#999]">
                                  <FaImage className="h-6 w-6" />
                                </div>
                              )}
                            </div>

                            <span className="text-[12px] font-semibold text-[#252525]">
                              {category.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <span className="inline-flex rounded bg-[#faf6ef] px-2.5 py-1 text-[11px] font-medium text-[#a8731d]">
                            {getParentCategoryName(category.parentCategory)}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex min-w-[38px] items-center justify-center rounded bg-[#f3f3f3] px-2 py-1 text-[12px] font-medium text-[#555]">
                            {category.productCount ?? 0}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          {category.status === "Active" ? (
                            <span className="inline-flex rounded bg-[#eaf8ef] px-2.5 py-1 text-[12px] font-medium text-[#169447]">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex rounded bg-[#fff0f0] px-2.5 py-1 text-[12px] font-medium text-[#d63c3c]">
                              Inactive
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-3 text-[11px] text-[#737984]">
                          {new Date(category.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-1.5">
                            <button
                              type="button"
                              disabled={submitting}
                              onClick={() => handleEdit(category)}
                              title="Edit"
                              className="flex h-8 w-8 items-center justify-center rounded border border-[#dedede] text-[#666] transition hover:border-[#c99438] hover:bg-[#fffaf2] hover:text-[#b57d20] disabled:opacity-50"
                            >
                              <FaPencilAlt className="text-[11px]" />
                            </button>

                            <button
                              type="button"
                              disabled={submitting}
                              onClick={() => handleDelete(category._id)}
                              title="Delete"
                              className="flex h-8 w-8 items-center justify-center rounded border border-[#f0cccc] text-[#d95353] transition hover:bg-[#fff2f2] disabled:opacity-50"
                            >
                              <FaTrash className="text-[11px]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {paginatedCategories.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-16 text-center">
                          <div className="text-sm font-medium text-[#555]">
                            No categories found
                          </div>

                          <p className="mt-1 text-xs text-[#999]">
                            Try changing your search or filter.
                          </p>
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}

          <div className="flex flex-col gap-3 border-t border-[#eeeeee] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] text-[#777]">
              Showing {filteredCategories.length === 0 ? 0 : startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredCategories.length)}{" "}
              of {filteredCategories.length} categories
            </p>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="flex h-8 w-8 items-center justify-center rounded border border-[#dedede] text-[#777] transition hover:bg-[#fafafa] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FaChevronLeft className="text-[9px]" />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .slice(0, 5)
                .map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`flex h-8 w-8 items-center justify-center rounded text-[10px] font-medium transition ${
                      currentPage === page
                        ? "bg-[#c99438] text-white"
                        : "border border-[#dedede] text-[#555] hover:bg-[#fafafa]"
                    }`}
                  >
                    {page}
                  </button>
                ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="flex h-8 w-8 items-center justify-center rounded border border-[#dedede] text-[#777] transition hover:bg-[#fafafa] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FaChevronRight className="text-[9px]" />
              </button>

              <select
                value={itemsPerPage}
                onChange={handleItemsPerPage}
                className="ml-2 h-8 rounded border border-[#dedede] bg-white px-2 text-[10px] text-[#555] outline-none"
              >
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
              </select>
            </div>
          </div>
        </section>

        {/* ADD / EDIT */}

        {showForm && (
          <AddCategories
            editingId={editingId}
            form={form}
            setForm={setForm}
            setShowForm={setShowForm}
            setEditingId={setEditingId}
            setImagePreview={setImagePreview}
            imagePreview={imagePreview}
            handleSubmit={handleSubmit}
            submitting={submitting}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
}
