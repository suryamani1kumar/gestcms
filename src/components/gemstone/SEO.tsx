"use client";

interface BasicInfoProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function SEOInfo({ formData, setFormData }: BasicInfoProps) {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      seo: { ...prev.seo, [e.target.name]: e.target.value },
    }));
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-2">
        <div>
          <label className={labelClass}>
            Meta Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="metaTitle"
            value={formData.seo.metaTitle}
            onChange={handleChange}
            placeholder="metaTitle"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Meta Description <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="metaDescription"
            value={formData.seo.metaDescription}
            onChange={handleChange}
            placeholder="metaDescription"
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
}
