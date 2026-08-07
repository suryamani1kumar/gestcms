import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  productType: "gemstone" | "rudraksha";

  sku: string;
  name: string;
  indianName?: string;
  slug: string;
  description?: string;

  gallery?: string[];
  videoUrl?: string;

  category?: string;
  subCategory?: string;

  specifications: Record<string, any>;

  astrology?: {
    planet?: string;
    zodiacSigns?: string[];
    wearDay?: string;
    wearTime?: string;
    wearMethod?: string;
    finger?: string;
    metal?: string;
    threadColor?: string;
    purificationMethod?: string;
  };

  certification?: {
    certified?: boolean;
    certificationType?: string;
    labName?: string;
    certificateNumber?: string;
    issueDate?: string;
    xrayVerified?: boolean;
    certificatePdf?: string;
    certificateImage?: string;
  };

  pricing?: {
    currency?: string;
    costPrice?: number;
    sellingPrice?: number;
    salePrice?: number;
    discount?: number;
    gst?: number;
    taxClass?: string;
  };

  inventory?: {
    stock?: number;
    stockStatus?: string;
    lowStockAlert?: number;
  };

  benefits?: string[];

  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };

  careInstructions?: {
    cleaning?: string;
    storage?: string;
    precautions?: string;
  };

  status?: "Draft" | "Published" | "Archived";

  createdBy?: string;
  updatedBy?: string;
}

const AstrologySchema = new Schema(
  {
    planet: String,
    zodiacSigns: [String],
    wearDay: String,
    wearTime: String,
    wearMethod: String,
    finger: String,
    metal: String,
    threadColor: String,
    purificationMethod: String,
  },
  { _id: false }
);

const CertificationSchema = new Schema(
  {
    certified: {
      type: Boolean,
      default: false,
    },
    certificationType: String,
    labName: String,
    certificateNumber: String,
    issueDate: String,
    xrayVerified: {
      type: Boolean,
      default: false,
    },
    certificatePdf: String,
    certificateImage: String,
  },
  { _id: false }
);

const PricingSchema = new Schema(
  {
    currency: {
      type: String,
      default: "INR",
    },
    costPrice: Number,
    sellingPrice: Number,
    salePrice: Number,
    discount: Number,
    gst: {
      type: Number,
      default: 3,
    },
    taxClass: String,
  },
  { _id: false }
);

const InventorySchema = new Schema(
  {
    stock: {
      type: Number,
      default: 0,
    },
    stockStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Low Stock"],
      default: "In Stock",
    },
    lowStockAlert: {
      type: Number,
      default: 5,
    },
  },
  { _id: false }
);

const SeoSchema = new Schema(
  {
    metaTitle: String,
    metaDescription: String,
  },
  { _id: false }
);

const CareSchema = new Schema(
  {
    cleaning: String,
    storage: String,
    precautions: String,
  },
  { _id: false }
);

const ProductSchema = new Schema(
  {
    productType: {
      type: String,
      enum: ["gemstone", "rudraksha"],
      required: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    indianName: String,

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: String,

    gallery: [String],

    videoUrl: String,

    category: String,

    subCategory: String,

    specifications: {
      type: Schema.Types.Mixed,
      default: {},
    },

    astrology: AstrologySchema,

    certification: CertificationSchema,

    pricing: PricingSchema,

    inventory: InventorySchema,

    benefits: [String],

    seo: SeoSchema,

    careInstructions: CareSchema,

    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
    },

    createdBy: String,

    updatedBy: String,
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> =
  mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;