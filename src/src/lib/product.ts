import crypto from "crypto";

type ProductType = "gemstone" | "rudraksha" | "jewellery";

const PRODUCT_PREFIX: Record<ProductType, string> = {
  gemstone: "GEM",
  rudraksha: "RUD",
  jewellery: "JWL",
};

export const generateSKU = (
  productType: ProductType,
  category?: string,
): string => {
  const prefix = PRODUCT_PREFIX[productType];

  const categoryKey = category?.trim().slice(0, 3).toUpperCase();

  const date = new Date().toISOString().slice(2, 10).replace(/-/g, "");

  const random = crypto
    .randomBytes(3)
    .toString("hex")
    .toUpperCase()
    .slice(0, 2);

  return `${prefix}${random}${date}${categoryKey}`;
};

export const generateSlug = (value: string): string => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};
