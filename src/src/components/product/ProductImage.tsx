"use client";

import React, { useRef, useState } from "react";
import { FaCloudArrowUp } from "react-icons/fa6";
import { FiX, FiImage, FiLoader } from "react-icons/fi";

interface ProductImageItem {
  url: string;
  publicId: string;
}

interface ProductImageProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const MAX_IMAGES = 8;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ProductImage = ({ formData, setFormData }: ProductImageProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const images: ProductImageItem[] = formData?.gallery || [];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    setError("");

    if (images.length + files.length > MAX_IMAGES) {
      setError(`You can upload maximum ${MAX_IMAGES} images.`);

      e.target.value = "";
      return;
    }

    const invalidFile = files.find(
      (file) => !file.type.startsWith("image/") || file.size > MAX_FILE_SIZE,
    );

    if (invalidFile) {
      if (!invalidFile.type.startsWith("image/")) {
        setError(`${invalidFile.name} is not a valid image.`);
      } else {
        setError(`${invalidFile.name} is larger than 5MB.`);
      }

      e.target.value = "";
      return;
    }

    try {
      setUploading(true);

      const uploadPromises = files.map(async (file) => {
        const uploadData = new FormData();

        uploadData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || `Failed to upload ${file.name}`);
        }

        return {
          url: result.data.secure_url,
          publicId: result.data.public_id,
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);

      setFormData((prev: any) => ({
        ...prev,
        gallery: [...(prev.gallery || []), ...uploadedImages],
      }));
    } catch (error) {
      console.error("Upload failed:", error);

      setError(
        error instanceof Error ? error.message : "Failed to upload images.",
      );
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = async (image: ProductImageItem) => {
    if (!image?.publicId) {
      return;
    }

    setError("");
    setDeleting(image.publicId);

    try {
      if (formData?._id) {
        const response = await fetch("/api/products/images", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: formData._id,
            publicId: image.publicId,
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to delete image.");
        }
        setFormData((prev: any) => ({
          ...prev,
          gallery: (prev.gallery || []).filter(
            (item: ProductImageItem) => item.publicId !== image.publicId,
          ),
        }));
      }
    } catch (error) {
      console.error("Delete image error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to remove image.",
      );
    } finally {
      setDeleting(null);
    }
  };

  const openFilePicker = () => {
    if (!uploading && !deleting) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-full">
      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Upload Box */}
      <button
        type="button"
        onClick={openFilePicker}
        disabled={uploading || deleting !== null || images.length >= MAX_IMAGES}
        className="group relative flex h-[148px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center transition-all hover:border-gray-400 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <div className="mb-2 flex h-16 w-16 items-center justify-center">
          {uploading ? (
            <FiLoader className="h-7 w-7 animate-spin text-gray-600" />
          ) : (
            <FaCloudArrowUp className="h-7 w-7 text-gray-600 transition-transform group-hover:-translate-y-1" />
          )}
        </div>
        <p className="text-[12px] font-semibold text-slate-700">
          {uploading
            ? "Uploading images..."
            : images.length >= MAX_IMAGES
              ? "Maximum images reached"
              : "Click to upload images"}
        </p>

        <p className="mt-1 text-[10px] text-slate-500">JPG, PNG, WEBP</p>

        <p className="mt-3 text-[10px] text-slate-400">
          Max 8 images · 5MB each
        </p>
      </button>

      {/* Error */}
      {error && (
        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
          {error}
        </div>
      )}

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="mt-6">
          {/* Preview Header */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiImage className="h-4 w-4 text-gray-600" />

              <p className="text-[12px] font-semibold text-slate-700">
                Uploaded Images
              </p>

              <p className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600">
                {images.length}
              </p>
            </div>

            <button
              type="button"
              onClick={openFilePicker}
              disabled={
                uploading || deleting !== null || images.length >= MAX_IMAGES
              }
              className="text-[10px] cursor-pointer font-semibold text-gray-700 underline underline-offset-2 hover:text-black disabled:opacity-50"
            >
              + Add More
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-4 gap-1.5">
            {images.map((image, index) => {
              const isDeleting = deleting === image.publicId;

              return (
                <div
                  key={image.publicId}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
                >
                  {/* Image */}
                  <div className="aspect-square w-full">
                    <img
                      src={image.url}
                      alt={`Product image ${index + 1}`}
                      className={`h-full w-full object-cover transition-opacity ${
                        isDeleting ? "opacity-40" : ""
                      }`}
                    />
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(image)}
                    disabled={uploading || deleting !== null}
                    className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-gray-700 opacity-0 shadow-sm transition-all hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
                    title="Remove image"
                  >
                    {isDeleting ? (
                      <FiLoader className="h-3 w-3 animate-spin" />
                    ) : (
                      <FiX className="h-3 w-3" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
