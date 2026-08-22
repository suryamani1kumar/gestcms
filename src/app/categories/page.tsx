"use client";

import PageHeader from "@/components/pageheader/PageHeader";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import {
  FaSearch,
  FaSlidersH,
  FaPlus,
  FaPencilAlt,
  FaTrash,
  FaUpload,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaInfoCircle,
  FaLightbulb,
  FaSave,
  FaTimes,
} from "react-icons/fa";

interface Category {
  id: number;
  name: string;
  description: string;
  productCount: number;
  status: "Active" | "Inactive";
  createdOn: string;
  image: string;
}

interface CategoryForm {
  name: string;
  description: string;
  parentCategory: string;
  status: "Active" | "Inactive";
  image: File | null;
}

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Necklaces",
    description: "All types of necklaces including gold, diamond and gemstone.",
    productCount: 245,
    status: "Active",
    createdOn: "18 May 2025",
    image: "/banner.png",
  },
  {
    id: 2,
    name: "Earrings",
    description: "Studs, drops, hoops and diamond earrings.",
    productCount: 178,
    status: "Active",
    createdOn: "18 May 2025",
    image: "/banner.png",
  },
  {
    id: 3,
    name: "Rings",
    description: "Gold, diamond, solitaire and gemstone rings.",
    productCount: 312,
    status: "Active",
    createdOn: "17 May 2025",
    image: "/banner.png",
  },
  {
    id: 4,
    name: "Bracelets",
    description: "Gold, diamond and charm bracelets.",
    productCount: 98,
    status: "Active",
    createdOn: "17 May 2025",
    image: "/banner.png",
  },
  {
    id: 5,
    name: "Pendants",
    description: "Gold, diamond and gemstone pendants.",
    productCount: 156,
    status: "Active",
    createdOn: "16 May 2025",
    image: "/banner.png",
  },
  {
    id: 6,
    name: "Bangles",
    description: "Traditional, designer and antique bangles.",
    productCount: 134,
    status: "Active",
    createdOn: "16 May 2025",
    image: "/banner.png",
  },
  {
    id: 7,
    name: "Mangalsutra",
    description: "Traditional and modern mangalsutra designs.",
    productCount: 87,
    status: "Active",
    createdOn: "15 May 2025",
    image: "/banner.png",
  },
  {
    id: 8,
    name: "Chains",
    description: "Gold and diamond chains for men and women.",
    productCount: 103,
    status: "Inactive",
    createdOn: "15 May 2025",
    image: "/banner.png",
  },
  {
    id: 9,
    name: "Nose Pins",
    description: "Gold and diamond nose pins.",
    productCount: 64,
    status: "Active",
    createdOn: "14 May 2025",
    image: "/banner.png",
  },
  {
    id: 10,
    name: "Anklets",
    description: "Traditional and fashion anklets.",
    productCount: 42,
    status: "Active",
    createdOn: "14 May 2025",
    image: "/banner.png",
  },
];

const emptyForm: CategoryForm = {
  name: "",
  description: "",
  parentCategory: "None (Top Level)",
  status: "Active",
  image: null,
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [showForm, setShowForm] = useState(true);

  const [form, setForm] = useState<CategoryForm>(emptyForm);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  /*
   * Filter categories
   */
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        category.name.toLowerCase().includes(searchValue) ||
        category.description.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All Status" || category.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, statusFilter]);

  /*
   * Pagination
   */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCategories.length / itemsPerPage),
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedCategories = filteredCategories.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  /*
   * Form input handler
   */
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
   * Image upload
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2MB.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    const preview = URL.createObjectURL(file);

    setImagePreview(preview);
  };

  /*
   * Reset form
   */
  const handleReset = () => {
    setForm(emptyForm);
    setEditingId(null);
    setImagePreview(null);
  };

  /*
   * Save category
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Category name is required.");
      return;
    }

    /*
     * EDIT
     */
    if (editingId !== null) {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === editingId
            ? {
                ...category,
                name: form.name,
                description: form.description,
                status: form.status,
                image: imagePreview || category.image,
              }
            : category,
        ),
      );

      alert("Category updated successfully.");

      handleReset();

      return;
    }

    /*
     * CREATE
     */
    const newCategory: Category = {
      id:
        categories.length > 0
          ? Math.max(...categories.map((item) => item.id)) + 1
          : 1,

      name: form.name,

      description: form.description || "No description available.",

      productCount: 0,

      status: form.status,

      createdOn: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),

      image: imagePreview || "/categories/default.jpg",
    };

    setCategories((prev) => [newCategory, ...prev]);

    alert("Category created successfully.");

    handleReset();
  };

  /*
   * Edit category
   */
  const handleEdit = (category: Category) => {
    setEditingId(category.id);

    setForm({
      name: category.name,
      description: category.description,
      parentCategory: "None (Top Level)",
      status: category.status,
      image: null,
    });

    setImagePreview(category.image);

    setShowForm(true);
  };

  /*
   * Delete category
   */
  const handleDelete = (id: number) => {
    const category = categories.find((item) => item.id === id);

    if (!category) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    setCategories((prev) => prev.filter((item) => item.id !== id));

    if (editingId === id) {
      handleReset();
    }
  };

  /*
   * Change page
   */
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  /*
   * Search change
   */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  /*
   * Status change
   */
  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  /*
   * Items per page
   */
  const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-6">
      <PageHeader
        title="Categories"
        description="Manage product categories to organize your inventory."
        buttonText="Add Categories"
        onButtonClick={() => {
          handleReset();
          setShowForm(true);
        }}
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div
        className={`
          grid
          grid-cols-1
          gap-5
          ${showForm ? "xl:grid-cols-[minmax(0,1fr)_390px]" : ""}
        `}
      >
        {/* ===================================================
            CATEGORY LIST
        ==================================================== */}
        <section className="overflow-hidden rounded-lg border border-[#e7e7e7] bg-white">
          {/* TOOLBAR */}
          <div className="flex flex-col gap-3 border-b border-[#eeeeee] p-4 lg:flex-row lg:items-center">
            {/* SEARCH */}
            <div className="relative flex-1">
              <FaSearch
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-[13px]
                  text-[#9298a1]
                "
              />

              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search category by name..."
                className="
                  h-10
                  w-full
                  rounded-md
                  border
                  border-[#dedede]
                  bg-white
                  pl-9
                  pr-3
                  text-xs
                  text-[#333]
                  outline-none
                  transition
                  placeholder:text-[#9ca1a8]
                  focus:border-[#c99438]
                  focus:ring-2
                  focus:ring-[#c99438]/10
                "
              />
            </div>

            {/* STATUS */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={handleStatusFilter}
                className="
                  h-10
                  min-w-[140px]
                  appearance-none
                  rounded-md
                  border
                  border-[#dedede]
                  bg-white
                  px-3
                  pr-8
                  text-xs
                  text-[#555]
                  outline-none
                  focus:border-[#c99438]
                "
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <FaChevronDown
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-[9px]
                  text-[#777]
                "
              />
            </div>

            {/* FILTER */}
            <button
              type="button"
              className="
                flex
                h-10
                items-center
                justify-center
                gap-2
                rounded-md
                border
                border-[#e5d9c6]
                bg-[#fffaf2]
                px-4
                text-xs
                font-medium
                text-[#a8731d]
                transition
                hover:bg-[#fff3df]
              "
            >
              <FaSlidersH className="text-[12px]" />
              Filters
            </button>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="border-b border-[#ededed] bg-[#fcfcfc]">
                  <th className="w-12 px-4 py-3 text-left text-[10px] font-semibold text-[#666]">
                    #
                  </th>

                  <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#666]">
                    Category Name
                  </th>

                  <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#666]">
                    Description
                  </th>

                  <th className="px-4 py-3 text-center text-[10px] font-semibold text-[#666]">
                    Products
                  </th>

                  <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#666]">
                    Status
                  </th>

                  <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#666]">
                    Created On
                  </th>

                  <th className="px-4 py-3 text-center text-[10px] font-semibold text-[#666]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedCategories.map((category, index) => (
                  <tr
                    key={category.id}
                    className="
                        border-b
                        border-[#eeeeee]
                        transition
                        hover:bg-[#fffdf9]
                      "
                  >
                    {/* NUMBER */}
                    <td className="px-4 py-3 text-xs text-[#666]">
                      {startIndex + index + 1}
                    </td>

                    {/* CATEGORY */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                              h-10
                              w-10
                              shrink-0
                              overflow-hidden
                              rounded-md
                              border
                              border-[#e6e0d8]
                              bg-[#fafafa]
                            "
                        >
                          <img
                            src={category.image}
                            alt={category.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/categories/default.jpg";
                            }}
                          />
                        </div>

                        <span className="text-xs font-semibold text-[#252525]">
                          {category.name}
                        </span>
                      </div>
                    </td>

                    {/* DESCRIPTION */}
                    <td className="max-w-[280px] px-4 py-3">
                      <p className="line-clamp-2 text-[11px] leading-4 text-[#737984]">
                        {category.description}
                      </p>
                    </td>

                    {/* PRODUCT COUNT */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className="
                            inline-flex
                            min-w-[38px]
                            items-center
                            justify-center
                            rounded
                            bg-[#f3f3f3]
                            px-2
                            py-1
                            text-[10px]
                            font-medium
                            text-[#555]
                          "
                      >
                        {category.productCount}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="px-4 py-3">
                      {category.status === "Active" ? (
                        <span
                          className="
                              inline-flex
                              rounded
                              bg-[#eaf8ef]
                              px-2.5
                              py-1
                              text-[10px]
                              font-medium
                              text-[#169447]
                            "
                        >
                          Active
                        </span>
                      ) : (
                        <span
                          className="
                              inline-flex
                              rounded
                              bg-[#fff0f0]
                              px-2.5
                              py-1
                              text-[10px]
                              font-medium
                              text-[#d63c3c]
                            "
                        >
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* DATE */}
                    <td className="px-4 py-3 text-[11px] text-[#737984]">
                      {category.createdOn}
                    </td>

                    {/* ACTION */}
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleEdit(category)}
                          title="Edit"
                          className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded
                              border
                              border-[#dedede]
                              text-[#666]
                              transition
                              hover:border-[#c99438]
                              hover:bg-[#fffaf2]
                              hover:text-[#b57d20]
                            "
                        >
                          <FaPencilAlt className="text-[11px]" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(category.id)}
                          title="Delete"
                          className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded
                              border
                              border-[#f0cccc]
                              text-[#d95353]
                              transition
                              hover:bg-[#fff2f2]
                            "
                        >
                          <FaTrash className="text-[11px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* EMPTY */}
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
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div
            className="
              flex
              flex-col
              gap-3
              border-t
              border-[#eeeeee]
              px-5
              py-3
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <p className="text-[10px] text-[#777]">
              Showing {filteredCategories.length === 0 ? 0 : startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredCategories.length)}{" "}
              of {filteredCategories.length} categories
            </p>

            <div className="flex items-center gap-1.5">
              {/* PREVIOUS */}
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded
                  border
                  border-[#dedede]
                  text-[#777]
                  transition
                  hover:bg-[#fafafa]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <FaChevronLeft className="text-[9px]" />
              </button>

              {/* PAGE NUMBERS */}
              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .slice(0, 5)
                .map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded
                      text-[10px]
                      font-medium
                      transition
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
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded
                  border
                  border-[#dedede]
                  text-[#777]
                  transition
                  hover:bg-[#fafafa]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <FaChevronRight className="text-[9px]" />
              </button>

              {/* ITEMS PER PAGE */}
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPage}
                className="
                  ml-2
                  h-8
                  rounded
                  border
                  border-[#dedede]
                  bg-white
                  px-2
                  text-[10px]
                  text-[#555]
                  outline-none
                "
              >
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
              </select>
            </div>
          </div>
        </section>

        {/* ===================================================
            ADD / EDIT CATEGORY
        ==================================================== */}
        {showForm && (
          <aside className="space-y-4">
            <form
              onSubmit={handleSubmit}
              className="
                rounded-lg
                border
                border-[#e7e7e7]
                bg-white
                p-5
              "
            >
              {/* FORM HEADER */}
              <div
                className="
                  mb-5
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[#ebe5dc]
                  pb-3
                "
              >
                <div>
                  <h2 className="text-[15px] font-semibold text-[#222]">
                    {editingId !== null ? "Edit Category" : "Add New Category"}
                  </h2>

                  <p className="mt-0.5 text-[10px] text-[#888]">
                    {editingId !== null
                      ? "Update category information."
                      : "Create a new product category."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    handleReset();
                  }}
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded
                    text-[#888]
                    hover:bg-[#f5f5f5]
                  "
                >
                  <FaTimes className="text-[12px]" />
                </button>
              </div>

              {/* CATEGORY NAME */}
              <div className="mb-4">
                <label className="mb-1.5 block text-[11px] font-medium text-[#333]">
                  Category Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter category name"
                  className="
                    h-10
                    w-full
                    rounded
                    border
                    border-[#dedede]
                    bg-white
                    px-3
                    text-xs
                    text-[#333]
                    outline-none
                    placeholder:text-[#a0a4aa]
                    focus:border-[#c99438]
                    focus:ring-2
                    focus:ring-[#c99438]/10
                  "
                />
              </div>

              {/* DESCRIPTION */}
              <div className="mb-4">
                <label className="mb-1.5 block text-[11px] font-medium text-[#333]">
                  Description
                </label>

                <div className="relative">
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    rows={4}
                    maxLength={200}
                    placeholder="Enter description (optional)"
                    className="
                      w-full
                      resize-none
                      rounded
                      border
                      border-[#dedede]
                      bg-white
                      px-3
                      py-2.5
                      text-xs
                      text-[#333]
                      outline-none
                      placeholder:text-[#a0a4aa]
                      focus:border-[#c99438]
                      focus:ring-2
                      focus:ring-[#c99438]/10
                    "
                  />

                  <span className="absolute bottom-2 right-2 text-[9px] text-[#999]">
                    {form.description.length}/200
                  </span>
                </div>
              </div>

              {/* PARENT CATEGORY */}
              <div className="mb-4">
                <div className="mb-1.5 flex items-center gap-1">
                  <label className="text-[11px] font-medium text-[#333]">
                    Parent Category
                  </label>

                  <FaInfoCircle className="text-[10px] text-[#999]" />
                </div>

                <div className="relative">
                  <select
                    name="parentCategory"
                    value={form.parentCategory}
                    onChange={handleInputChange}
                    className="
                      h-10
                      w-full
                      appearance-none
                      rounded
                      border
                      border-[#dedede]
                      bg-white
                      px-3
                      pr-8
                      text-xs
                      text-[#555]
                      outline-none
                      focus:border-[#c99438]
                    "
                  >
                    <option>None (Top Level)</option>

                    <option>Jewellery</option>

                    <option>Gold Jewellery</option>

                    <option>Diamond Jewellery</option>

                    <option>Gemstone Jewellery</option>
                  </select>

                  <FaChevronDown
                    className="
                      pointer-events-none
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-[9px]
                      text-[#777]
                    "
                  />
                </div>
              </div>

              {/* IMAGE */}
              <div className="mb-5">
                <label className="mb-1.5 block text-[11px] font-medium text-[#333]">
                  Category Image
                </label>

                <label
                  className="
                    relative
                    flex
                    min-h-[150px]
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    overflow-hidden
                    rounded
                    border
                    border-dashed
                    border-[#d4d4d4]
                    bg-[#fdfdfd]
                    px-4
                    text-center
                    transition
                    hover:border-[#c99438]
                    hover:bg-[#fffdf8]
                  "
                >
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Category preview"
                        className="absolute inset-0 h-full w-full object-cover"
                      />

                      <div
                        className="
                          absolute
                          inset-0
                          flex
                          items-center
                          justify-center
                          bg-black/45
                        "
                      >
                        <div className="flex items-center gap-2 rounded bg-white px-3 py-2 text-[10px] font-medium text-[#333]">
                          <FaUpload className="text-[10px]" />
                          Change Image
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <FaUpload className="mb-3 text-[24px] text-[#515862]" />

                      <p className="text-xs font-medium text-[#333]">
                        Click to upload image
                      </p>

                      <p className="mt-1 text-[10px] text-[#999]">
                        or drag and drop
                      </p>

                      <p className="mt-2 text-[9px] text-[#aaa]">
                        PNG, JPG, JPEG or WEBP up to 2MB
                      </p>
                    </>
                  )}
                </label>

                {form.image && (
                  <p className="mt-1.5 truncate text-[9px] text-[#b27a21]">
                    Selected: {form.image.name}
                  </p>
                )}
              </div>

              {/* STATUS */}
              <div className="border-t border-[#eeeeee] pt-4">
                <label className="mb-2 block text-[11px] font-medium text-[#333]">
                  Status <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center gap-5">
                  <label className="flex cursor-pointer items-center gap-2 text-xs text-[#555]">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={form.status === "Active"}
                      onChange={handleInputChange}
                      className="h-3.5 w-3.5 accent-[#c99438]"
                    />
                    Active
                  </label>

                  <label className="flex cursor-pointer items-center gap-2 text-xs text-[#555]">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={form.status === "Inactive"}
                      onChange={handleInputChange}
                      className="h-3.5 w-3.5 accent-[#c99438]"
                    />
                    Inactive
                  </label>
                </div>
              </div>

              {/* BUTTONS */}
              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-between
                  border-t
                  border-[#eeeeee]
                  pt-4
                "
              >
                <button
                  type="button"
                  onClick={handleReset}
                  className="
                    rounded
                    border
                    border-[#e4d8c5]
                    bg-[#fffaf3]
                    px-5
                    py-2.5
                    text-[11px]
                    font-medium
                    text-[#a8731d]
                    transition
                    hover:bg-[#fff1da]
                  "
                >
                  Reset
                </button>

                <button
                  type="submit"
                  className="
                    flex
                    items-center
                    gap-2
                    rounded
                    bg-[#c99438]
                    px-5
                    py-2.5
                    text-[11px]
                    font-medium
                    text-white
                    shadow-sm
                    transition
                    hover:bg-[#b98228]
                  "
                >
                  <FaSave className="text-[11px]" />

                  {editingId !== null ? "Update Category" : "Save Category"}
                </button>
              </div>
            </form>

            {/* =================================================
                TIPS
            ================================================== */}
            <div
              className="
                rounded-lg
                border
                border-[#e7e7e7]
                bg-white
                p-5
              "
            >
              <div className="mb-3 flex items-center gap-2">
                <FaLightbulb className="text-[15px] text-[#c99438]" />

                <h3 className="text-xs font-semibold text-[#a8731d]">
                  Category Tips
                </h3>
              </div>

              <ul className="space-y-2 pl-4 text-[10px] leading-5 text-[#737984]">
                <li className="list-disc">
                  Use clear and specific names for categories.
                </li>

                <li className="list-disc">
                  Parent categories help organize products.
                </li>

                <li className="list-disc">
                  Use high-quality images for better presentation.
                </li>

                <li className="list-disc">
                  Inactive categories won't be available for new products.
                </li>
              </ul>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
