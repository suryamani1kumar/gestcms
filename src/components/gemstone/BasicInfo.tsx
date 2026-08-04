"use client";

interface BasicInfoProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function BasicInfo({
  formData,
  setFormData,
}: BasicInfoProps) {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {/* SKU */}
        <div>
          <label className={labelClass}>
            SKU <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="GST-RUBY-001"
            className={inputClass}
          />
        </div>

        {/* Gemstone Name */}
        <div>
          <label className={labelClass}>
            Gemstone Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ruby"
            className={inputClass}
          />
        </div>

        {/* Indian Name */}
        <div>
          <label className={labelClass}>Indian Name</label>
          <input
            type="text"
            name="indianName"
            value={formData.indianName}
            onChange={handleChange}
            placeholder="Manik"
            className={inputClass}
          />
        </div>

        {/* Slug */}
        <div>
          <label className={labelClass}>
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="natural-ruby"
            className={inputClass}
          />
        </div>

        {/* Category */}
        <div>
          <label className={labelClass}>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select Category</option>
            <option value="Precious">Precious</option>
            <option value="Semi Precious">Semi Precious</option>
            <option value="Organic">Organic</option>
            <option value="Synthetic">Synthetic</option>
          </select>
        </div>

        {/* Sub Category */}
        <div>
          <label className={labelClass}>Sub Category</label>
          <input
            type="text"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            placeholder="Corundum"
            className={inputClass}
          />
        </div>

        {/* Status */}
        <div>
          <label className={labelClass}>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        {/* Description */}
        <div className="col-span-full">
          <label className={labelClass}>Description</label>
          <textarea
            rows={6}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a detailed description..."
            className={`${inputClass} resize-y`}
          />
        </div>
      </div>
    </div>
  );
}