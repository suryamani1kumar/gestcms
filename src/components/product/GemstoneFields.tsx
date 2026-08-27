"use client";

import { ProductFormData } from "@/lib/type";
import React from "react";
import {
  EmptyState,
  Field,
  Input,
  Section,
  Select,
  textareaClass,
} from "./Form";

interface GemstoneFieldsProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
}

const numberValue = (value: string): number | undefined => {
  if (value === "") return undefined;

  const number = Number(value);

  return Number.isNaN(number) ? undefined : number;
};

export default function GemstoneFields({
  formData,
  setFormData,
}: GemstoneFieldsProps) {
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
    <Section title="Gemstone Details" className="mt-2.5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Field label="Indian Name">
          <Input
            placeholder="Enter Indian name"
            value={formData.gemstone?.indianName ?? ""}
            onChange={(e) =>
              updateNestedField("gemstone", "indianName", e.target.value)
            }
          />
        </Field>

        <Field label="Variety">
          <Input
            placeholder="e.g. Natural Ruby"
            value={formData.gemstone?.variety ?? ""}
            onChange={(e) =>
              updateNestedField("gemstone", "variety", e.target.value)
            }
          />
        </Field>

        <Field label="Color">
          <Input
            placeholder="e.g. Pigeon Blood Red"
            value={formData.gemstone?.color ?? ""}
            onChange={(e) =>
              updateNestedField("gemstone", "color", e.target.value)
            }
          />
        </Field>

        <Field label="Shape">
          <Input
            placeholder="e.g. Oval"
            value={formData.gemstone?.shape ?? ""}
            onChange={(e) =>
              updateNestedField("gemstone", "shape", e.target.value)
            }
          />
        </Field>

        <Field label="Cut">
          <Input
            placeholder="e.g. Mixed Cut"
            value={formData.gemstone?.cut ?? ""}
            onChange={(e) =>
              updateNestedField("gemstone", "cut", e.target.value)
            }
          />
        </Field>

        <Field label="Transparency">
          <Input
            placeholder="e.g. Transparent"
            value={formData.gemstone?.transparency ?? ""}
            onChange={(e) =>
              updateNestedField("gemstone", "transparency", e.target.value)
            }
          />
        </Field>

        <Field label="Origin">
          <Input
            placeholder="e.g. Burma"
            value={formData.gemstone?.origin ?? ""}
            onChange={(e) =>
              updateNestedField("gemstone", "origin", e.target.value)
            }
          />
        </Field>

        <Field label="Treatment">
          <Input
            placeholder="e.g. Unheated"
            value={formData.gemstone?.treatment ?? ""}
            onChange={(e) =>
              updateNestedField("gemstone", "treatment", e.target.value)
            }
          />
        </Field>

        <Field label="Weight">
          <Input
            type="number"
            placeholder="0.00"
            value={formData.gemstone?.weight ?? ""}
            onChange={(e) =>
              updateNestedField(
                "gemstone",
                "weight",
                numberValue(e.target.value),
              )
            }
          />
        </Field>

        <Field label="Weight Unit">
          <Select
            value={formData.gemstone?.weightUnit ?? ""}
            onChange={(e) =>
              updateNestedField("gemstone", "weightUnit", e.target.value)
            }
            options={[
              {
                label: "Carat",
                value: "carat",
              },
              {
                label: "Gram",
                value: "gram",
              },
            ]}
          />
        </Field>

        <Field label="Dimension">
          <Input
            placeholder="e.g. 80MM x 60MM"
            value={formData.gemstone?.dimension ?? ""}
            onChange={(e) =>
              updateNestedField("gemstone", "dimension", e.target.value)
            }
          />
        </Field>

        <Field label="Hardness">
          <Input
            placeholder="e.g. 9 Mohs"
            value={formData.gemstone?.hardness ?? ""}
            onChange={(e) =>
              updateNestedField("gemstone", "hardness", e.target.value)
            }
          />
        </Field>

        <Field label="Refractive Index">
          <Input
            placeholder="e.g. 1.762 - 1.770"
            value={formData.gemstone?.refractiveIndex ?? ""}
            onChange={(e) =>
              updateNestedField("gemstone", "refractiveIndex", e.target.value)
            }
          />
        </Field>

        <Field label="Specific Gravity">
          <Input
            placeholder="e.g. 4.00"
            value={formData.gemstone?.specificGravity ?? ""}
            onChange={(e) =>
              updateNestedField("gemstone", "specificGravity", e.target.value)
            }
          />
        </Field>

        <Field label="Luster">
          <Input
            placeholder="e.g. Vitreous"
            value={formData.gemstone?.luster ?? ""}
            onChange={(e) =>
              updateNestedField("gemstone", "luster", e.target.value)
            }
          />
        </Field>

        <Field label="Quality Grade">
          <Input
            placeholder="e.g. AAA"
            value={formData.gemstone?.qualityGrade ?? ""}
            onChange={(e) =>
              updateNestedField("gemstone", "qualityGrade", e.target.value)
            }
          />
        </Field>

        <Field label="Clarity">
          <Input
            placeholder="e.g. VVS"
            value={formData.gemstone?.clarity ?? ""}
            onChange={(e) =>
              updateNestedField("gemstone", "clarity", e.target.value)
            }
          />
        </Field>

        <Field label="Color Grade">
          <Input
            placeholder="e.g. Excellent"
            value={formData.gemstone?.colorGrade ?? ""}
            onChange={(e) =>
              updateNestedField("gemstone", "colorGrade", e.target.value)
            }
          />
        </Field>

        <Field label="Enhancement">
          <Input
            placeholder="e.g. None"
            value={formData.gemstone?.enhancement ?? ""}
            onChange={(e) =>
              updateNestedField("gemstone", "enhancement", e.target.value)
            }
          />
        </Field>
      </div>

      <div className="mt-4 flex flex-wrap gap-5">
        <label className="flex items-center gap-2 text-[9px]">
          <input
            type="checkbox"
            checked={formData.gemstone?.natural ?? false}
            onChange={(e) =>
              updateNestedField("gemstone", "natural", e.target.checked)
            }
          />
          Natural
        </label>

        <label className="flex items-center gap-2 text-[9px]">
          <input
            type="checkbox"
            checked={formData.gemstone?.synthetic ?? false}
            onChange={(e) =>
              updateNestedField("gemstone", "synthetic", e.target.checked)
            }
          />
          Synthetic
        </label>

        <label className="flex items-center gap-2 text-[9px]">
          <input
            type="checkbox"
            checked={formData.gemstone?.heated ?? false}
            onChange={(e) =>
              updateNestedField("gemstone", "heated", e.target.checked)
            }
          />
          Heated
        </label>
      </div>
    </Section>
  );
}
