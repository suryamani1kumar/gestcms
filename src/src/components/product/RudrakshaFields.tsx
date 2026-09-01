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

        <Field label="Color">
          <Input
            placeholder="e.g. Brown"
            value={formData.rudraksha?.color ?? ""}
            onChange={(e) =>
              updateNestedField("rudraksha", "color", e.target.value)
            }
          />
        </Field>

        <Field label="Shape">
          <Input
            placeholder="e.g. Round"
            value={formData.rudraksha?.shape ?? ""}
            onChange={(e) =>
              updateNestedField("rudraksha", "shape", e.target.value)
            }
          />
        </Field>

        <Field label="Size">
          <Input
            type="number"
            placeholder="0"
            value={formData.rudraksha?.size ?? ""}
            onChange={(e) =>
              updateNestedField(
                "rudraksha",
                "size",
                numberValue(e.target.value),
              )
            }
          />
        </Field>

        <Field label="Size Unit">
          <Select
            value={formData.rudraksha?.sizeUnit ?? ""}
            onChange={(e) =>
              updateNestedField("rudraksha", "sizeUnit", e.target.value)
            }
            options={[
              {
                label: "mm",
                value: "mm",
              },
              {
                label: "cm",
                value: "cm",
              },
            ]}
          />
        </Field>

        <Field label="Weight">
          <Input
            type="number"
            placeholder="0"
            value={formData.rudraksha?.weight ?? ""}
            onChange={(e) =>
              updateNestedField(
                "rudraksha",
                "weight",
                numberValue(e.target.value),
              )
            }
          />
        </Field>

        <Field label="Weight Unit">
          <Select
            value={formData.rudraksha?.weightUnit ?? ""}
            onChange={(e) =>
              updateNestedField("rudraksha", "weightUnit", e.target.value)
            }
            options={[
              {
                label: "Gram",
                value: "gram",
              },
              {
                label: "Kg",
                value: "kg",
              },
            ]}
          />
        </Field>

        <Field label="Quality">
          <Input
            placeholder="e.g. Premium"
            value={formData.rudraksha?.quality ?? ""}
            onChange={(e) =>
              updateNestedField("rudraksha", "quality", e.target.value)
            }
          />
        </Field>
      </div>

      <div className="mt-4 flex gap-6">
        <label className="flex items-center gap-2 text-[9px]">
          <input
            type="checkbox"
            checked={formData.rudraksha?.energized ?? false}
            onChange={(e) =>
              updateNestedField("rudraksha", "energized", e.target.checked)
            }
          />
          Energized
        </label>

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
