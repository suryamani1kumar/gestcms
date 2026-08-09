"use client";

import React from "react";
import {
  FaCircle,
  FaLeaf,
  FaCircleNodes,
  FaShieldHeart,
} from "react-icons/fa6";

interface RudrakshaFieldsProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function RudrakshaFields({
  formData,
  setFormData,
}: RudrakshaFieldsProps) {
  const specifications = formData.specifications || {};

  // ============================================================
  // UPDATE SPECIFICATION
  // ============================================================

  const updateSpecification = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,

      specifications: {
        ...prev.specifications,
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-8">
      {/* ====================================================== */}
      {/* BASIC RUDRAKSHA DETAILS */}
      {/* ====================================================== */}

      <div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <NumberField
            label="Mukhi"
            value={specifications.mukhi}
            onChange={(value) => updateSpecification("mukhi", value)}
          />

          <InputField
            label="Type"
            value={specifications.type}
            placeholder="Nepal Rudraksha"
            onChange={(value) => updateSpecification("type", value)}
          />

          <InputField
            label="Species"
            value={specifications.species}
            placeholder="Elaeocarpus Ganitrus"
            onChange={(value) => updateSpecification("species", value)}
          />

          <InputField
            label="Origin"
            value={specifications.origin}
            placeholder="Nepal"
            onChange={(value) => updateSpecification("origin", value)}
          />

          <InputField
            label="Shape"
            value={specifications.shape}
            placeholder="Round"
            onChange={(value) => updateSpecification("shape", value)}
          />

          <InputField
            label="Color"
            value={specifications.color}
            placeholder="Brown"
            onChange={(value) => updateSpecification("color", value)}
          />

          <InputField
            label="Surface"
            value={specifications.surface}
            placeholder="Natural"
            onChange={(value) => updateSpecification("surface", value)}
          />

          <InputField
            label="Treatment"
            value={specifications.treatment}
            placeholder="Untreated"
            onChange={(value) => updateSpecification("treatment", value)}
          />
        </div>
      </div>

      {/* ====================================================== */}
      {/* MUKHI & HOLES */}
      {/* ====================================================== */}

      <div className="border-t border-gray-100 pt-7">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
            <FaCircleNodes />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Structure</h3>

            <p className="text-sm text-gray-500">
              Rudraksha mukhi and hole information.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <NumberField
            label="Number of Holes"
            value={specifications.holes ?? 1}
            onChange={(value) => updateSpecification("holes", value)}
          />

          <ToggleField
            label="Natural Hole"
            checked={specifications.naturalHole ?? true}
            onChange={(value) => updateSpecification("naturalHole", value)}
          />

          <ToggleField
            label="Natural"
            checked={specifications.natural ?? true}
            onChange={(value) => updateSpecification("natural", value)}
          />

          <ToggleField
            label="Original"
            checked={specifications.original ?? true}
            onChange={(value) => updateSpecification("original", value)}
          />
        </div>
      </div>

      {/* ====================================================== */}
      {/* ASTROLOGICAL INFO */}
      {/* ====================================================== */}

      <div className="border-t border-gray-100 pt-7">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
            <FaLeaf />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              Rudraksha Information
            </h3>

            <p className="text-sm text-gray-500">
              Additional information about this Rudraksha.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <InputField
            label="Ruling Planet"
            value={formData.astrology?.planet}
            placeholder="Jupiter"
            onChange={(value) =>
              setFormData((prev: any) => ({
                ...prev,

                astrology: {
                  ...prev.astrology,
                  planet: value,
                },
              }))
            }
          />

          <InputField
            label="Zodiac Signs"
            value={formData.astrology?.zodiacSigns?.join(", ") || ""}
            placeholder="Aries, Leo"
            onChange={(value) =>
              setFormData((prev: any) => ({
                ...prev,

                astrology: {
                  ...prev.astrology,

                  zodiacSigns: value
                    .split(",")
                    .map((item: string) => item.trim())
                    .filter(Boolean),
                },
              }))
            }
          />

          <InputField
            label="Wear Day"
            value={formData.astrology?.wearDay}
            placeholder="Thursday"
            onChange={(value) =>
              setFormData((prev: any) => ({
                ...prev,

                astrology: {
                  ...prev.astrology,
                  wearDay: value,
                },
              }))
            }
          />

          <InputField
            label="Wear Method"
            value={formData.astrology?.wearMethod}
            placeholder="Wear around neck"
            onChange={(value) =>
              setFormData((prev: any) => ({
                ...prev,

                astrology: {
                  ...prev.astrology,
                  wearMethod: value,
                },
              }))
            }
          />

          <InputField
            label="Metal"
            value={formData.astrology?.metal}
            placeholder="Gold"
            onChange={(value) =>
              setFormData((prev: any) => ({
                ...prev,

                astrology: {
                  ...prev.astrology,
                  metal: value,
                },
              }))
            }
          />

          <InputField
            label="Thread Color"
            value={formData.astrology?.threadColor}
            placeholder="Red"
            onChange={(value) =>
              setFormData((prev: any) => ({
                ...prev,

                astrology: {
                  ...prev.astrology,
                  threadColor: value,
                },
              }))
            }
          />

          <InputField
            label="Purification Method"
            value={formData.astrology?.purificationMethod}
            placeholder="Gangajal"
            onChange={(value) =>
              setFormData((prev: any) => ({
                ...prev,

                astrology: {
                  ...prev.astrology,
                  purificationMethod: value,
                },
              }))
            }
          />
        </div>
      </div>
    </div>
  );
}

/* ================================================================ */
/* INPUT FIELD                                                       */
/* ================================================================ */

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

/* ================================================================ */
/* NUMBER FIELD                                                      */
/* ================================================================ */

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
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value === "" ? 0 : Number(e.target.value))
        }
        className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
      />
    </div>
  );
}

/* ================================================================ */
/* TOGGLE FIELD                                                      */
/* ================================================================ */

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
