import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IGemstone extends Document {
  sku: string;
  name: string;
  indianName?: string;
  slug: string;
  description?: string;
  gallery?: string[];
  videoUrl?: string;

  category?: string;
  subCategory?: string;
  color?: string;
  shape?: string;
  cut?: string;
  transparency?: string;
  origin?: string;
  treatment?: string;
  certificationType?: string;

  weight?: { value: number; unit: string };
  dimensions?: { length: number; width: number; height: number; unit: string };
  hardness?: string;
  refractiveIndex?: string;
  specificGravity?: string;
  luster?: string;

  quality?: {
    grade?: string;
    clarity?: string;
    colorGrade?: string;
    natural?: boolean;
    synthetic?: boolean;
    heated?: boolean;
    enhancement?: string;
  };

  astrology?: {
    planet?: string;
    zodiacSigns?: string[];
    rashi?: string[];
    birthMonth?: string[];
    chakra?: string;
    dayToWear?: string;
    finger?: string;
    metal?: string;
  };

  certification?: {
    labName?: string;
    certificateNumber?: string;
    issueDate?: string;
    expiryDate?: string;
    certificatePdf?: string;
    certificateImage?: string;
  };

  inventory?: {
    stock?: number;
    stockStatus?: string;
    lowStockAlert?: number;
    quantity?: number;
  };

  pricing?: {
    currency?: string;
    costPrice?: number;
    sellingPrice?: number;
    salePrice?: number;
    discount?: number;
    gst?: number;
  };

  shipping?: {
    weight?: number;
    weightUnit?: string;
    length?: number;
    width?: number;
    height?: number;
    dimensionUnit?: string;
    freeShipping?: boolean;
  };

  benefits?: string[];

  careInstructions?: {
    cleaning?: string;
    storage?: string;
    precautions?: string;
  };

  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };

  display?: {
    featured?: boolean;
    bestSeller?: boolean;
    trending?: boolean;
    newArrival?: boolean;
    recommended?: boolean;
    homepageBanner?: boolean;
  };

  status?: "Published" | "Draft" | "Archived";

  createdBy?: string;
  updatedBy?: string;
}

const GemstoneSchema = new Schema<IGemstone>(
  {
    sku: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    indianName: { type: String },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: { type: String },
    gallery: [{ type: String }],
    videoUrl: { type: String },

    category: { type: String },
    subCategory: { type: String },
    color: { type: String },
    shape: { type: String },
    cut: { type: String },
    transparency: { type: String },
    origin: { type: String },
    treatment: { type: String },
    certificationType: { type: String },

    weight: { value: { type: Number }, unit: { type: String } },
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
      unit: { type: String },
    },
    hardness: { type: String },
    refractiveIndex: { type: String },
    specificGravity: { type: String },
    luster: { type: String },

    quality: {
      grade: { type: String },
      clarity: { type: String },
      colorGrade: { type: String },
      natural: { type: Boolean, default: true },
      synthetic: { type: Boolean, default: false },
      heated: { type: Boolean, default: false },
      enhancement: { type: String },
    },

    astrology: {
      planet: { type: String },
      zodiacSigns: [{ type: String }],
      rashi: [{ type: String }],
      birthMonth: [{ type: String }],
      chakra: { type: String },
      dayToWear: { type: String },
      finger: { type: String },
      metal: { type: String },
    },

    certification: {
      labName: { type: String },
      certificateNumber: { type: String },
      issueDate: { type: String },
      expiryDate: { type: String },
      certificatePdf: { type: String },
      certificateImage: { type: String },
    },

    inventory: {
      stock: { type: Number, default: 0 },
      stockStatus: { type: String, default: "In Stock" },
      lowStockAlert: { type: Number, default: 5 },
      quantity: { type: Number, default: 1 },
    },

    pricing: {
      currency: { type: String, default: "INR" },
      costPrice: { type: Number, default: 0 },
      sellingPrice: { type: Number, default: 0 },
      salePrice: { type: Number, default: 0 },
      discount: { type: Number, default: 0 },
      gst: { type: Number, default: 3 },
    },

    shipping: {
      weight: { type: Number },
      weightUnit: { type: String, default: "gm" },
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
      dimensionUnit: { type: String, default: "cm" },
      freeShipping: { type: Boolean, default: false },
    },

    benefits: [{ type: String }],

    careInstructions: {
      cleaning: { type: String },
      storage: { type: String },
      precautions: { type: String },
    },

    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
    },

    display: {
      featured: { type: Boolean, default: false },
      bestSeller: { type: Boolean, default: false },
      trending: { type: Boolean, default: false },
      newArrival: { type: Boolean, default: false },
      recommended: { type: Boolean, default: false },
      homepageBanner: { type: Boolean, default: false },
    },

    status: {
      type: String,
      enum: ["Published", "Draft", "Archived"],
      default: "Draft",
    },

    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true },
);

const Gemstone =
  models.Gemstone || model<IGemstone>("Gemstone", GemstoneSchema);
export default Gemstone;
