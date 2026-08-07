"use client";

import React from "react";
import {
  FaGem,
  FaWeightHanging,
  FaRulerCombined,
  FaStar,
} from "react-icons/fa6";

interface GemstoneFieldsProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function GemstoneFields({
  formData,
  setFormData,
}: GemstoneFieldsProps) {
  const specifications = formData.specifications || {};

  const updateSpecification = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [field]: value,
      },
    }));
  };

  const updateWeight = (field: "value" | "unit", value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      specifications: {
        ...prev.specifications,

        weight: {
          ...prev.specifications?.weight,
          [field]: value,
        },
      },
    }));
  };

  const updateDimension = (
    field: "length" | "width" | "height" | "unit",
    value: any,
  ) => {
    setFormData((prev: any) => ({
      ...prev,

      specifications: {
        ...prev.specifications,

        dimensions: {
          ...prev.specifications?.dimensions,
          [field]: value,
        },
      },
    }));
  };

  const updateQuality = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,

      specifications: {
        ...prev.specifications,

        quality: {
          ...prev.specifications?.quality,
          [field]: value,
        },
      },
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <InputField
            label="Color"
            value={specifications.color}
            placeholder="Pigeon Blood Red"
            onChange={(value) => updateSpecification("color", value)}
          />

          <InputField
            label="Shape"
            value={specifications.shape}
            placeholder="Oval"
            onChange={(value) => updateSpecification("shape", value)}
          />

          <InputField
            label="Cut"
            value={specifications.cut}
            placeholder="Mixed Cut"
            onChange={(value) => updateSpecification("cut", value)}
          />

          <InputField
            label="Transparency"
            value={specifications.transparency}
            placeholder="Transparent"
            onChange={(value) => updateSpecification("transparency", value)}
          />

          <InputField
            label="Origin"
            value={specifications.origin}
            placeholder="Burma (Myanmar)"
            onChange={(value) => updateSpecification("origin", value)}
          />

          <InputField
            label="Treatment"
            value={specifications.treatment}
            placeholder="Unheated"
            onChange={(value) => updateSpecification("treatment", value)}
          />

          <InputField
            label="Certification Type"
            value={specifications.certificationType}
            placeholder="Natural Gemstone"
            onChange={(value) =>
              updateSpecification("certificationType", value)
            }
          />

          <InputField
            label="Luster"
            value={specifications.luster}
            placeholder="Vitreous"
            onChange={(value) => updateSpecification("luster", value)}
          />

          <InputField
            label="Hardness"
            value={specifications.hardness}
            placeholder="9 Mohs"
            onChange={(value) => updateSpecification("hardness", value)}
          />

          <InputField
            label="Refractive Index"
            value={specifications.refractiveIndex}
            placeholder="1.762 - 1.770"
            onChange={(value) => updateSpecification("refractiveIndex", value)}
          />

          <InputField
            label="Specific Gravity"
            value={specifications.specificGravity}
            placeholder="4.00"
            onChange={(value) => updateSpecification("specificGravity", value)}
          />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-7">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
            <FaWeightHanging />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Weight</h3>

            <p className="text-sm text-gray-500">Enter the gemstone weight.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <NumberField
            label="Weight"
            value={specifications.weight?.value}
            onChange={(value) => updateWeight("value", value)}
          />

          <SelectField
            label="Weight Unit"
            value={specifications.weight?.unit || "Carat"}
            options={["Carat", "Gram", "Ratti"]}
            onChange={(value) => updateWeight("unit", value)}
          />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-7">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-700">
            <FaRulerCombined />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Dimensions</h3>

            <p className="text-sm text-gray-500">Enter gemstone dimensions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          <NumberField
            label="Length"
            value={specifications.dimensions?.length}
            onChange={(value) => updateDimension("length", value)}
          />

          <NumberField
            label="Width"
            value={specifications.dimensions?.width}
            onChange={(value) => updateDimension("width", value)}
          />

          <NumberField
            label="Height"
            value={specifications.dimensions?.height}
            onChange={(value) => updateDimension("height", value)}
          />

          <SelectField
            label="Unit"
            value={specifications.dimensions?.unit || "mm"}
            options={["mm", "cm", "inch"]}
            onChange={(value) => updateDimension("unit", value)}
          />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-7">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-100 text-yellow-700">
            <FaStar />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Quality</h3>

            <p className="text-sm text-gray-500">
              Quality and authenticity information.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <InputField
            label="Grade"
            value={specifications.quality?.grade}
            placeholder="AAA"
            onChange={(value) => updateQuality("grade", value)}
          />

          <InputField
            label="Clarity"
            value={specifications.quality?.clarity}
            placeholder="VVS"
            onChange={(value) => updateQuality("clarity", value)}
          />

          <InputField
            label="Color Grade"
            value={specifications.quality?.colorGrade}
            placeholder="Excellent"
            onChange={(value) => updateQuality("colorGrade", value)}
          />

          <InputField
            label="Enhancement"
            value={specifications.quality?.enhancement}
            placeholder="None"
            onChange={(value) => updateQuality("enhancement", value)}
          />

          <ToggleField
            label="Natural"
            checked={specifications.quality?.natural ?? true}
            onChange={(value) => updateQuality("natural", value)}
          />

          <ToggleField
            label="Synthetic"
            checked={specifications.quality?.synthetic ?? false}
            onChange={(value) => updateQuality("synthetic", value)}
          />

          <ToggleField
            label="Heated"
            checked={specifications.quality?.heated ?? false}
            onChange={(value) => updateQuality("heated", value)}
          />
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value?: string | number;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type="text"
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
      />
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type="number"
        min="0"
        step="any"
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value === "" ? 0 : Number(e.target.value))
        }
        className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
      <span className="text-sm font-medium text-gray-700">{label}</span>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition ${
          checked ? "bg-black" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            checked ? "left-5.5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
