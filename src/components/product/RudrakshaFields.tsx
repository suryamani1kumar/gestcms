"use client";

import { ProductFormData } from "@/lib/type";
import React from "react";
import { Field, Input, Section, Select } from "./Form";

interface RudrakashFieldsProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
}

const numberValue = (value: string): number | undefined => {
  if (value === "") return undefined;

  const number = Number(value);

  return Number.isNaN(number) ? undefined : number;
};

export default function RudrakashFields({
  formData,
  setFormData,
}: RudrakashFieldsProps) {
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
    <Section title="Rudraksha Details" className="mt-2.5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Field label="Mukhi" required>
          <Input
            type="number"
            placeholder="e.g. 5"
            value={formData.rudraksha?.mukhi ?? ""}
            onChange={(e) =>
              updateNestedField(
                "rudraksha",
                "mukhi",
                numberValue(e.target.value),
              )
            }
          />
        </Field>

        <Field label="Bead Type">
          <Input
            placeholder="e.g. Natural"
            value={formData.rudraksha?.beadType ?? ""}
            onChange={(e) =>
              updateNestedField("rudraksha", "beadType", e.target.value)
            }
          />
        </Field>

        <Field label="Origin">
          <Input
            placeholder="e.g. Nepal"
            value={formData.rudraksha?.origin ?? ""}
            onChange={(e) =>
              updateNestedField("rudraksha", "origin", e.target.value)
            }
          />
        </Field>

        <Field label="Dimensions">
          <Input
            placeholder="e.g. 120mm*110mm*100mm"
            value={formData.rudraksha?.dimensions ?? ""}
            onChange={(e) =>
              updateNestedField("rudraksha", "dimensions", e.target.value)
            }
          />
        </Field>
      </div>

      <div className="mt-4 flex gap-6">
        <label className="flex items-center gap-2 text-[9px]">
          <input
            type="checkbox"
            checked={formData.rudraksha?.labCertified ?? false}
            onChange={(e) =>
              updateNestedField("rudraksha", "labCertified", e.target.checked)
            }
          />
          Lab Certified
        </label>
      </div>
    </Section>
  );
}
