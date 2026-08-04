"use client";

import { useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface MediaProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function Media({
  formData,
  setFormData,
}: MediaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    setFormData((prev: any) => ({
      ...prev,
      images: [...(prev.images || []), ...files],
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Upload Images
        </label>

        <div
          onClick={() => inputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 transition hover:border-indigo-500 hover:bg-indigo-50"
        >
           <FaCloudUploadAlt className="mb-3 text-5xl text-indigo-500" />


          <p className="text-sm font-medium text-gray-700">
            Click to upload images
          </p>

          <p className="mt-1 text-xs text-gray-500">
            PNG, JPG, WEBP (Multiple files supported)
          </p>

          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFiles}
          />
        </div>
      </div>

      {/* Preview */}
      {formData.images?.length > 0 && (
        <div>
          <h3 className="mb-4 text-sm font-semibold text-gray-700">
            Uploaded Images
          </h3>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {formData.images.map((file: File, index: number) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl border bg-white shadow-sm"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  className="h-36 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                >
                   <IoClose className="text-lg" />
                </button>

                <div className="truncate p-2 text-xs">
                  {file.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}