"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  FaTimes,
  FaCloudUploadAlt,
  FaImage,
  FaTrash,
  FaLightbulb,
} from "react-icons/fa";

interface CategoryImage {
  url: string;
  publicId: string;
}

interface Category {
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
  image?: CategoryImage | null;
}

interface CategoryForm {
  name: string;
  parentCategory: string;
  status: "Active" | "Inactive";
  image: CategoryImage | null;
}

interface Props {
  editingId: string | null;
  form: CategoryForm;
  setForm: React.Dispatch<React.SetStateAction<CategoryForm>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  imagePreview: string | null;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  submitting: boolean;
  categories: Category[];
}

export default function AddCategories({
  editingId,
  form,
  setForm,
  setShowForm,
  setEditingId,
  setImagePreview,
  imagePreview,
  handleSubmit,
  submitting,
  categories,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadingImage, setUploadingImage] = useState(false);

  const parentCategories = useMemo(() => {
    return categories.filter((category) => {
      if (category._id === editingId) {
        return false;
      }

      if (!category.parentCategory) {
        return true;
      }

      return false;
    });
  }, [categories, editingId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      e.target.value = "";
      return;
    }

    if (file.size > 0.5 * 1024 * 1024) {
      alert("Image size must be less than 500KB.");
      e.target.value = "";
      return;
    }

    try {
      setUploadingImage(true);

      const formData = new FormData();

      formData.append("file", file);
      formData.append("folder", "categories");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to upload image.");
      }

      const uploadedImage: CategoryImage = {
        url: result.data.secure_url,
        publicId: result.data.public_id,
      };

      setForm((prev) => ({
        ...prev,
        image: uploadedImage,
      }));

      setImagePreview(uploadedImage.url);
    } catch (error) {
      console.error("Category image upload error:", error);

      alert(error instanceof Error ? error.message : "Failed to upload image.");
    } finally {
      setUploadingImage(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({
      ...prev,
      image: null,
    }));

    setImagePreview(null);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <aside className="h-fit overflow-hidden ">
      <div className="rounded-lg border border-[#e7e7e7] bg-white">
        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-[#eeeeee] px-5 py-4">
          <div>
            <h2 className="text-[14px] font-bold text-[#25282c]">
              {editingId ? "Edit Category" : "Add Category"}
            </h2>

            <p className="mt-0.5 text-[10px] text-[#85898d]">
              {editingId
                ? "Update category information."
                : "Create a new product category."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-md text-[#777] transition hover:bg-[#f5f5f5] hover:text-[#333]"
          >
            <FaTimes className="text-[13px]" />
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="space-y-3 p-4">
          {/* CATEGORY NAME */}

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold text-[#454545]">
              Category Name
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="e.g. Gold Jewellery"
              disabled={submitting}
              className="h-9 w-full rounded-md border border-[#dedede] bg-white px-3 text-xs text-[#333] outline-none transition placeholder:text-[#a2a2a2] focus:border-[#c99438] focus:ring-2 focus:ring-[#c99438]/10 disabled:bg-[#f7f7f7]"
            />
          </div>

          {/* PARENT CATEGORY */}

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold text-[#454545]">
              Parent Category
            </label>

            <select
              name="parentCategory"
              value={form.parentCategory}
              onChange={handleInputChange}
              disabled={submitting}
              className="h-9 w-full rounded-md border border-[#dedede] bg-white px-3 text-xs text-[#333] outline-none transition focus:border-[#c99438] focus:ring-2 focus:ring-[#c99438]/10 disabled:bg-[#f7f7f7]"
            >
              <option value="">None (Top Level)</option>

              {parentCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            <p className="mt-1.5 text-[10px] leading-4 text-[#999]">
              Only top-level categories can be selected as parents.
            </p>
          </div>

          {/* STATUS */}

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold text-[#454545]">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleInputChange}
              disabled={submitting}
              className="h-9 w-full rounded-md border border-[#dedede] bg-white px-3 text-xs text-[#333] outline-none transition focus:border-[#c99438] focus:ring-2 focus:ring-[#c99438]/10 disabled:bg-[#f7f7f7]"
            >
              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* IMAGE */}

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold text-[#454545]">
              Category Image
            </label>

            {imagePreview ? (
              <div className="relative overflow-hidden rounded-md border border-[#e1e1e1] bg-[#fafafa]">
                <img
                  src={imagePreview}
                  alt="Category preview"
                  className="h-32 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={uploadingImage || submitting}
                  className="cursor-pointer absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md bg-white/95 text-[#d95353] shadow-sm transition hover:bg-white disabled:opacity-50"
                  title="Remove image"
                >
                  <FaTrash className="text-[11px]" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage || submitting}
                className="flex h-32 cursor-pointer w-full flex-col items-center justify-center rounded-md border border-dashed border-[#d8d8d8] bg-[#fcfcfc] transition hover:border-[#c99438] hover:bg-[#fffaf2] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploadingImage ? (
                  <>
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#c99438] border-t-transparent" />

                    <span className="mt-2 text-[10px] text-[#777]">
                      Uploading...
                    </span>
                  </>
                ) : (
                  <>
                    <FaCloudUploadAlt className="text-[22px] text-[#c99438]" />

                    <span className="mt-2 text-[11px] font-medium text-[#555]">
                      Upload image
                    </span>

                    <span className="mt-1 text-[9px] text-[#999]">
                      JPG, PNG, WEBP · Max 500KB
                    </span>
                  </>
                )}
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              className="hidden"
            />

            {form.image?.publicId && (
              <p className="mt-1.5 truncate text-[9px] text-[#999]">
                Public ID: {form.image.publicId}
              </p>
            )}
          </div>

          {/* BUTTONS */}

          <div className="flex gap-2 border-t border-[#eeeeee] pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={submitting || uploadingImage}
              className="h-9 cursor-pointer flex-1 rounded-md border border-[#dedede] bg-white px-3 text-[11px] font-medium text-[#555] transition hover:bg-[#f7f7f7] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting || uploadingImage}
              className="flex h-9 cursor-pointer flex-1 items-center justify-center gap-2 rounded-md bg-slate-900 px-3 text-[11px] font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <FaImage className="text-[10px]" />

                  {editingId ? "Update Category" : "Create Category"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* TIPS */}

      <div className="rounded-lg mt-3 border border-[#e7e7e7] bg-white p-5">
        <div className="mb-3 flex items-center gap-2">
          <FaLightbulb className="text-[15px] text-[#c99438]" />

          <h3 className="text-xs font-semibold text-[#a8731d]">
            Category Tips
          </h3>
        </div>

        <ul className="space-y-1 pl-4 text-[11px] leading-5 text-[#737984]">
          <li className="list-disc">Select a parent category first.</li>

          <li className="list-disc">
            Category suggestions are based on the selected parent.
          </li>

          <li className="list-disc">
            You can select a suggested category or enter a new one.
          </li>
          <li className="list-disc">
            Category images must be 500KB or smaller.
          </li>
          <li className="list-disc">
            Only one image can be uploaded for a category.
          </li>

          <li className="list-disc">
            Inactive categories won&apos;t be available for new products.
          </li>
        </ul>
      </div>
    </aside>
  );
}
