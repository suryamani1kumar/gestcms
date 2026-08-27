import { Gender, ProductFormData } from "@/lib/type";
import { FaImage } from "react-icons/fa";
import React from "react";
import { EmptyState, Field, Input, Select, Toggle } from "./Form";

const Jewellery = ({
  formData,
  setFormData,
}: {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
}) => {
  const numberValue = (value: string): number | undefined => {
    if (value === "") return undefined;

    const number = Number(value);

    return Number.isNaN(number) ? undefined : number;
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
    <>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
        {/* METAL */}

        <div className="rounded-md border border-slate-200 p-3">
          <h3 className="mb-3 text-[10px] font-bold">Metal Information</h3>

          <div className="space-y-3">
            <Field label="Metal Type" required>
              <Input
                placeholder="e.g. Gold"
                value={formData.jewellery?.metalType ?? ""}
                onChange={(e) =>
                  updateNestedField("jewellery", "metalType", e.target.value)
                }
              />
            </Field>

            <Field label="Purity" required>
              <Input
                placeholder="e.g. 22K"
                value={formData.jewellery?.purity ?? ""}
                onChange={(e) =>
                  updateNestedField("jewellery", "purity", e.target.value)
                }
              />
            </Field>

            <Field label="Metal Color">
              <Input
                placeholder="e.g. Yellow"
                value={formData.jewellery?.metalColor ?? ""}
                onChange={(e) =>
                  updateNestedField("jewellery", "metalColor", e.target.value)
                }
              />
            </Field>

            <Field label="Metal Weight">
              <Input
                type="number"
                placeholder="0.00"
                value={formData.jewellery?.metalWeight ?? ""}
                onChange={(e) =>
                  updateNestedField(
                    "jewellery",
                    "metalWeight",
                    numberValue(e.target.value),
                  )
                }
              />
            </Field>

            <Field label="Weight Unit">
              <Select
                value={formData.jewellery?.metalWeightUnit ?? ""}
                onChange={(e) =>
                  updateNestedField(
                    "jewellery",
                    "metalWeightUnit",
                    e.target.value,
                  )
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

            <Field label="Gross Weight">
              <Input
                type="number"
                value={formData.jewellery?.grossWeight ?? ""}
                onChange={(e) =>
                  updateNestedField(
                    "jewellery",
                    "grossWeight",
                    numberValue(e.target.value),
                  )
                }
              />
            </Field>

            <Field label="Net Weight">
              <Input
                type="number"
                value={formData.jewellery?.netWeight ?? ""}
                onChange={(e) =>
                  updateNestedField(
                    "jewellery",
                    "netWeight",
                    numberValue(e.target.value),
                  )
                }
              />
            </Field>
          </div>
        </div>

        {/* MAKING CHARGES */}

        <div className="rounded-md border border-slate-200 p-3">
          <h3 className="mb-3 text-[10px] font-bold">Making Charges</h3>

          <div className="space-y-3">
            <Field label="Making Charges">
              <Input
                type="number"
                placeholder="0"
                value={formData.jewellery?.makingCharges ?? ""}
                onChange={(e) =>
                  updateNestedField(
                    "jewellery",
                    "makingCharges",
                    numberValue(e.target.value),
                  )
                }
              />
            </Field>

            <Field label="Charge Type">
              <Select
                value={formData.jewellery?.makingChargesType ?? ""}
                onChange={(e) =>
                  updateNestedField(
                    "jewellery",
                    "makingChargesType",
                    e.target.value,
                  )
                }
                options={[
                  {
                    label: "Fixed",
                    value: "fixed",
                  },
                  {
                    label: "Percentage",
                    value: "percentage",
                  },
                ]}
              />
            </Field>

            <Field label="Making Charges %">
              <Input
                type="number"
                placeholder="0"
                value={formData.jewellery?.makingChargesPercentage ?? ""}
                onChange={(e) =>
                  updateNestedField(
                    "jewellery",
                    "makingChargesPercentage",
                    numberValue(e.target.value),
                  )
                }
              />
            </Field>
          </div>
        </div>

        {/* DIAMOND */}

        <div className="rounded-md border border-slate-200 p-3">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[10px] font-bold">Diamond</h3>

            <Toggle
              checked={formData.jewellery?.hasDiamond ?? false}
              onChange={() =>
                updateNestedField(
                  "jewellery",
                  "hasDiamond",
                  !(formData.jewellery?.hasDiamond ?? false),
                )
              }
            />
          </div>

          {formData.jewellery?.hasDiamond ? (
            <div className="space-y-3">
              <Field label="Diamond Type">
                <Input
                  placeholder="Natural Diamond"
                  value={formData.jewellery?.diamondType ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "jewellery",
                      "diamondType",
                      e.target.value,
                    )
                  }
                />
              </Field>

              <Field label="Count">
                <Input
                  type="number"
                  value={formData.jewellery?.diamondCount ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "jewellery",
                      "diamondCount",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

              <Field label="Weight">
                <Input
                  type="number"
                  value={formData.jewellery?.diamondWeight ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "jewellery",
                      "diamondWeight",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

              <Field label="Weight Unit">
                <Select
                  value={formData.jewellery?.diamondWeightUnit ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "jewellery",
                      "diamondWeightUnit",
                      e.target.value,
                    )
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

              <Field label="Color">
                <Input
                  placeholder="G"
                  value={formData.jewellery?.diamondColor ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "jewellery",
                      "diamondColor",
                      e.target.value,
                    )
                  }
                />
              </Field>

              <Field label="Clarity">
                <Input
                  placeholder="VS"
                  value={formData.jewellery?.diamondClarity ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "jewellery",
                      "diamondClarity",
                      e.target.value,
                    )
                  }
                />
              </Field>

              <Field label="Cut">
                <Input
                  placeholder="Excellent"
                  value={formData.jewellery?.diamondCut ?? ""}
                  onChange={(e) =>
                    updateNestedField("jewellery", "diamondCut", e.target.value)
                  }
                />
              </Field>

              <Field label="Shape">
                <Input
                  placeholder="Round"
                  value={formData.jewellery?.diamondShape ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "jewellery",
                      "diamondShape",
                      e.target.value,
                    )
                  }
                />
              </Field>
            </div>
          ) : (
            <EmptyState
              icon={<FaImage />}
              title="No diamond"
              description="Enable the toggle to add diamond details"
            />
          )}
        </div>

        {/* GEMSTONE */}

        <div className="rounded-md border border-slate-200 p-3">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[10px] font-bold">Gemstone</h3>

            <Toggle
              checked={formData.jewellery?.hasGemstone ?? false}
              onChange={() =>
                updateNestedField(
                  "jewellery",
                  "hasGemstone",
                  !(formData.jewellery?.hasGemstone ?? false),
                )
              }
            />
          </div>

          {formData.jewellery?.hasGemstone ? (
            <div className="space-y-3">
              <Field label="Gemstone Type">
                <Input
                  placeholder="e.g. Ruby"
                  value={formData.jewellery?.gemstoneType ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "jewellery",
                      "gemstoneType",
                      e.target.value,
                    )
                  }
                />
              </Field>

              <Field label="Count">
                <Input
                  type="number"
                  value={formData.jewellery?.gemstoneCount ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "jewellery",
                      "gemstoneCount",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

              <Field label="Weight">
                <Input
                  type="number"
                  value={formData.jewellery?.gemstoneWeight ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "jewellery",
                      "gemstoneWeight",
                      numberValue(e.target.value),
                    )
                  }
                />
              </Field>

              <Field label="Weight Unit">
                <Select
                  value={formData.jewellery?.gemstoneWeightUnit ?? ""}
                  onChange={(e) =>
                    updateNestedField(
                      "jewellery",
                      "gemstoneWeightUnit",
                      e.target.value,
                    )
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
            </div>
          ) : (
            <EmptyState
              icon={<FaImage />}
              title="No gemstone"
              description="Enable the toggle to add gemstone details"
            />
          )}
        </div>
      </div>
      {/* OTHER JEWELLERY DETAILS */}
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-4">
        <Field label="Setting Type">
          <Input
            placeholder="Prong Setting"
            value={formData.jewellery?.settingType ?? ""}
            onChange={(e) =>
              updateNestedField("jewellery", "settingType", e.target.value)
            }
          />
        </Field>

        <Field label="Size">
          <Input
            placeholder="18"
            value={formData.jewellery?.size ?? ""}
            onChange={(e) =>
              updateNestedField("jewellery", "size", e.target.value)
            }
          />
        </Field>

        <Field label="Dimensions">
          <Input
            placeholder="20 x 10 mm"
            value={formData.jewellery?.dimensions ?? ""}
            onChange={(e) =>
              updateNestedField("jewellery", "dimensions", e.target.value)
            }
          />
        </Field>

        <Field label="Collection">
          <Input
            placeholder="Wedding Collection"
            value={formData.jewellery?.collection ?? ""}
            onChange={(e) =>
              updateNestedField("jewellery", "collection", e.target.value)
            }
          />
        </Field>

        <Field label="Occasion">
          <Input
            placeholder="Wedding"
            value={formData.jewellery?.occasion ?? ""}
            onChange={(e) =>
              updateNestedField("jewellery", "occasion", e.target.value)
            }
          />
        </Field>

        <Field label="Gender">
          <Select
            value={formData.jewellery?.gender ?? ""}
            onChange={(e) =>
              updateNestedField("jewellery", "gender", e.target.value as Gender)
            }
            options={[
              {
                label: "Men",
                value: "Men",
              },
              {
                label: "Women",
                value: "Women",
              },
              {
                label: "Unisex",
                value: "Unisex",
              },
            ]}
          />
        </Field>

        <Field label="Length">
          <Input
            type="number"
            value={formData.jewellery?.length ?? ""}
            onChange={(e) =>
              updateNestedField(
                "jewellery",
                "length",
                numberValue(e.target.value),
              )
            }
          />
        </Field>

        <Field label="Width">
          <Input
            type="number"
            value={formData.jewellery?.width ?? ""}
            onChange={(e) =>
              updateNestedField(
                "jewellery",
                "width",
                numberValue(e.target.value),
              )
            }
          />
        </Field>
      </div>
    </>
  );
};

export default Jewellery;
