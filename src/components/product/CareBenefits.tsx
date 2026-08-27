import React, { useState } from "react";
import {
  EmptyState,
  Field,
  Input,
  Section,
  Select,
  textareaClass,
} from "./Form";
import { FaPlus, FaRegCircleCheck, FaTrash } from "react-icons/fa6";
import { ProductFormData } from "@/lib/type";

interface ProductFormProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
}

const CareBenefits = ({ formData, setFormData }: ProductFormProps) => {
  const [showBenefitForm, setShowBenefitForm] = useState(false);
  const [benefitInput, setBenefitInput] = useState("");

  const addBenefit = () => {
    const value = benefitInput.trim();

    if (!value) return;

    setFormData((prev) => ({
      ...prev,
      benefits: [...prev.benefits, value],
    }));

    setBenefitInput("");
    setShowBenefitForm(false);
  };

  const removeBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const updateNestedField = (
    section:
      | "gemstone"
      | "rudraksha"
      | "jewellery"
      | "astrology"
      | "certification"
      | "pricing"
      | "inventory"
      | "seo"
      | "careInstructions",
    field: string,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,

      [section]: {
        ...(prev[section] || {}),
        [field]: value,
      },
    }));
  };

  return (
    <div className="mt-2.5 grid grid-cols-1 gap-2.5 xl:grid-cols-12">
      {/* ASTROLOGY */}

      <Section title="Astrology Details" className="xl:col-span-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Planet">
            <Input
              placeholder="e.g. Jupiter"
              value={formData.astrology?.planet ?? ""}
              onChange={(e) =>
                updateNestedField("astrology", "planet", e.target.value)
              }
            />
          </Field>

          <Field label="Zodiac Sign">
            <Select
              value={formData.astrology?.zodiacSigns?.[0] ?? ""}
              onChange={(e) =>
                updateNestedField(
                  "astrology",
                  "zodiacSigns",
                  e.target.value ? [e.target.value] : [],
                )
              }
              options={[
                "Aries",
                "Taurus",
                "Gemini",
                "Cancer",
                "Leo",
                "Virgo",
                "Libra",
                "Scorpio",
                "Sagittarius",
                "Capricorn",
                "Aquarius",
                "Pisces",
              ].map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </Field>

          <Field label="Wear Day">
            <Input
              placeholder="e.g. Sunday"
              value={formData.astrology?.wearDay ?? ""}
              onChange={(e) =>
                updateNestedField("astrology", "wearDay", e.target.value)
              }
            />
          </Field>

          <Field label="Wear Method">
            <Input
              placeholder="After Sunrise"
              value={formData.astrology?.wearMethod ?? ""}
              onChange={(e) =>
                updateNestedField("astrology", "wearMethod", e.target.value)
              }
            />
          </Field>

          <Field label="Finger">
            <Input
              placeholder="Ring Finger"
              value={formData.astrology?.finger ?? ""}
              onChange={(e) =>
                updateNestedField("astrology", "finger", e.target.value)
              }
            />
          </Field>

          <Field label="Metal">
            <Input
              placeholder="Gold"
              value={formData.astrology?.metal ?? ""}
              onChange={(e) =>
                updateNestedField("astrology", "metal", e.target.value)
              }
            />
          </Field>

          <Field label="Thread Color">
            <Input
              placeholder="Yellow"
              value={formData.astrology?.threadColor ?? ""}
              onChange={(e) =>
                updateNestedField("astrology", "threadColor", e.target.value)
              }
            />
          </Field>

          <Field label="Purification">
            <Input
              placeholder="Milk, Ganga Jal"
              value={formData.astrology?.purificationMethod ?? ""}
              onChange={(e) =>
                updateNestedField(
                  "astrology",
                  "purificationMethod",
                  e.target.value,
                )
              }
            />
          </Field>
        </div>
      </Section>

      {/* BENEFITS */}

      <Section title="Benefits" className="xl:col-span-4">
        <div className="mb-3 flex justify-end">
          {!showBenefitForm && (
            <button
              type="button"
              onClick={() => setShowBenefitForm(true)}
              className="flex items-center gap-1 rounded border border-slate-200 px-2.5 py-1.5 text-[9px] font-semibold"
            >
              <FaPlus />
              Add Benefit
            </button>
          )}
        </div>

        {showBenefitForm && (
          <>
            <Input
              type="text"
              value={benefitInput}
              onChange={(e) => setBenefitInput(e.target.value)}
              placeholder="Enter benefit"
            />

            <div className="my-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setBenefitInput("");
                  setShowBenefitForm(false);
                }}
                className="rounded-md border border-[#d9dde2] px-3 py-1.5 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addBenefit}
                disabled={!benefitInput.trim()}
                className="rounded-md bg-[#111923] px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </>
        )}

        {formData.benefits.length === 0 ? (
          <EmptyState
            icon={<FaRegCircleCheck />}
            title="No benefits added"
            description="Add product benefits"
          />
        ) : (
          <div className="space-y-2">
            {formData.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex justify-between rounded bg-slate-50 px-3 py-2 text-[10px]"
              >
                <span>{benefit}</span>

                <button type="button" onClick={() => removeBenefit(index)}>
                  <FaTrash className="text-red-600 cursor-pointer" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* CARE */}
      <Section title="Care Instructions" className="xl:col-span-4">
        <div className="grid grid-cols-1 gap-3">
          <Field label="Cleaning">
            <textarea
              rows={3}
              value={formData.careInstructions?.cleaning ?? ""}
              onChange={(e) =>
                updateNestedField(
                  "careInstructions",
                  "cleaning",
                  e.target.value,
                )
              }
              placeholder="Clean with soft cloth"
              className={textareaClass}
            />
          </Field>

          <Field label="Storage">
            <textarea
              rows={3}
              value={formData.careInstructions?.storage ?? ""}
              onChange={(e) =>
                updateNestedField("careInstructions", "storage", e.target.value)
              }
              placeholder="Store in dry place"
              className={textareaClass}
            />
          </Field>

          <Field label="Precautions">
            <textarea
              rows={3}
              value={formData.careInstructions?.precautions ?? ""}
              onChange={(e) =>
                updateNestedField(
                  "careInstructions",
                  "precautions",
                  e.target.value,
                )
              }
              placeholder="Avoid chemical exposure"
              className={textareaClass}
            />
          </Field>
        </div>
      </Section>
    </div>
  );
};

export default CareBenefits;
