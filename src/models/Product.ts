// import mongoose, { Schema, Document, Model } from "mongoose";

// export interface IGalleryImage {
//   url: string;
//   publicId: string;
// }

// export interface IAstrology {
//   planet?: string;
//   zodiacSigns?: string[];
//   wearDay?: string;
//   wearMethod?: string;
//   finger?: string;
//   metal?: string;
//   threadColor?: string;
//   purificationMethod?: string;
// }

// export interface ICertification {
//   certified?: boolean;
//   certificationType?: string;
//   labName?: string;
//   certificateNumber?: string;
//   issueDate?: string;
//   xrayVerified?: boolean;
//   certificatePdf?: string;
//   certificateImage?: string;
// }

// export interface IPricing {
//   currency?: string;
//   costPrice?: number;
//   sellingPrice?: number;
//   salePrice?: number;
//   discount?: number;
//   gst?: number;
//   taxClass?: string;
// }

// export interface IInventory {
//   stock?: number;
//   stockStatus?: "In Stock" | "Out of Stock" | "Low Stock";
//   lowStockAlert?: number;
// }

// export interface ISeo {
//   metaTitle?: string;
//   metaDescription?: string;
// }

// export interface ICareInstructions {
//   cleaning?: string;
//   storage?: string;
//   precautions?: string;
// }

// export interface IProduct extends Document {
//   productType: "gemstone" | "rudraksha";

//   sku: string;
//   name: string;
//   indianName?: string;
//   slug: string;
//   description?: string;

//   gallery: IGalleryImage[];

//   category?: string;
//   subCategory?: string;

//   specifications: Record<string, any>;

//   astrology?: IAstrology;

//   certification?: ICertification;

//   pricing?: IPricing;

//   inventory?: IInventory;

//   benefits?: string[];

//   seo?: ISeo;

//   careInstructions?: ICareInstructions;

//   status?: "Draft" | "Published" | "Archived";

//   createdBy?: string;
//   updatedBy?: string;
// }

// const AstrologySchema = new Schema<IAstrology>(
//   {
//     planet: {
//       type: String,
//       trim: true,
//     },

//     zodiacSigns: {
//       type: [String],
//       default: [],
//     },

//     wearDay: {
//       type: String,
//       trim: true,
//     },

//     wearMethod: {
//       type: String,
//       trim: true,
//     },

//     finger: {
//       type: String,
//       trim: true,
//     },

//     metal: {
//       type: String,
//       trim: true,
//     },

//     threadColor: {
//       type: String,
//       trim: true,
//     },

//     purificationMethod: {
//       type: String,
//       trim: true,
//     },
//   },
//   {
//     _id: false,
//   },
// );

// const CertificationSchema = new Schema<ICertification>(
//   {
//     certified: {
//       type: Boolean,
//       default: false,
//     },

//     certificationType: {
//       type: String,
//       trim: true,
//     },

//     labName: {
//       type: String,
//       trim: true,
//     },

//     certificateNumber: {
//       type: String,
//       trim: true,
//     },

//     issueDate: {
//       type: String,
//       trim: true,
//     },

//     xrayVerified: {
//       type: Boolean,
//       default: false,
//     },

//     certificatePdf: {
//       type: String,
//       trim: true,
//     },

//     certificateImage: {
//       type: String,
//       trim: true,
//     },
//   },
//   {
//     _id: false,
//   },
// );

// const PricingSchema = new Schema<IPricing>(
//   {
//     currency: {
//       type: String,
//       default: "INR",
//       trim: true,
//     },

//     costPrice: {
//       type: Number,
//       min: 0,
//     },

//     sellingPrice: {
//       type: Number,
//       min: 0,
//     },

//     salePrice: {
//       type: Number,
//       min: 0,
//     },

//     discount: {
//       type: Number,
//       min: 0,
//     },

//     gst: {
//       type: Number,
//       default: 3,
//       min: 0,
//     },

//     taxClass: {
//       type: String,
//       trim: true,
//     },
//   },
//   {
//     _id: false,
//   },
// );

// const InventorySchema = new Schema<IInventory>(
//   {
//     stock: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     stockStatus: {
//       type: String,
//       enum: ["In Stock", "Out of Stock", "Low Stock"],
//       default: "In Stock",
//     },

//     lowStockAlert: {
//       type: Number,
//       default: 5,
//       min: 0,
//     },
//   },
//   {
//     _id: false,
//   },
// );

// const SeoSchema = new Schema<ISeo>(
//   {
//     metaTitle: {
//       type: String,
//       trim: true,
//     },

//     metaDescription: {
//       type: String,
//       trim: true,
//     },
//   },
//   {
//     _id: false,
//   },
// );

// const GallerySchema = new Schema<IGalleryImage>(
//   {
//     url: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     publicId: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//   },
//   {
//     _id: false,
//   },
// );

// const CareInstructionsSchema = new Schema<ICareInstructions>(
//   {
//     cleaning: {
//       type: String,
//       trim: true,
//     },

//     storage: {
//       type: String,
//       trim: true,
//     },

//     precautions: {
//       type: String,
//       trim: true,
//     },
//   },
//   {
//     _id: false,
//   },
// );

// const ProductSchema = new Schema<IProduct>(
//   {
//     productType: {
//       type: String,
//       enum: ["gemstone", "rudraksha"],
//       required: true,
//     },

//     sku: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },

//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     indianName: {
//       type: String,
//       trim: true,
//     },

//     slug: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     description: {
//       type: String,
//       trim: true,
//     },

//     gallery: {
//       type: [GallerySchema],
//       default: [],
//     },

//     category: {
//       type: String,
//       trim: true,
//     },

//     subCategory: {
//       type: String,
//       trim: true,
//     },

//     specifications: {
//       type: Schema.Types.Mixed,
//       default: {},
//     },

//     astrology: {
//       type: AstrologySchema,
//       default: undefined,
//     },

//     certification: {
//       type: CertificationSchema,
//       default: undefined,
//     },

//     pricing: {
//       type: PricingSchema,
//       default: undefined,
//     },

//     inventory: {
//       type: InventorySchema,
//       default: undefined,
//     },

//     benefits: {
//       type: [String],
//       default: [],
//     },

//     seo: {
//       type: SeoSchema,
//       default: undefined,
//     },

//     careInstructions: {
//       type: CareInstructionsSchema,
//       default: undefined,
//     },

//     status: {
//       type: String,
//       enum: ["Draft", "Published", "Archived"],
//       default: "Draft",
//     },

//     createdBy: {
//       type: String,
//       trim: true,
//     },

//     updatedBy: {
//       type: String,
//       trim: true,
//     },
//   },

//   {
//     timestamps: true,
//   },
// );

// const Product: Model<IProduct> =
//   mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

// export default Product;


import mongoose, { Schema, Document, Model } from "mongoose";

/* =========================================================
   TYPES
========================================================= */

export type ProductType = "gemstone" | "rudraksha" | "jewellery";

export type ProductStatus = "Draft" | "Published" | "Archived";

export type StockStatus =
  | "In Stock"
  | "Out of Stock"
  | "Low Stock";

/* =========================================================
   GALLERY
========================================================= */

export interface IGalleryImage {
  url: string;
  publicId: string;
}

/* =========================================================
   ASTROLOGY
   Mainly useful for Gemstones / Rudraksha
========================================================= */

export interface IAstrology {
  planet?: string;
  zodiacSigns?: string[];
  wearDay?: string;
  wearMethod?: string;
  finger?: string;
  metal?: string;
  threadColor?: string;
  purificationMethod?: string;
}

/* =========================================================
   CERTIFICATION
========================================================= */

export interface ICertification {
  certified?: boolean;
  certificationType?: string;
  labName?: string;
  certificateNumber?: string;
  issueDate?: string;
  xrayVerified?: boolean;
  certificatePdf?: string;
  certificateImage?: string;
}

/* =========================================================
   PRICING
========================================================= */

export interface IPricing {
  currency?: string;

  costPrice?: number;

  sellingPrice?: number;

  salePrice?: number;

  discount?: number;

  gst?: number;

  taxClass?: string;
}

/* =========================================================
   INVENTORY
========================================================= */

export interface IInventory {
  stock?: number;

  stockStatus?: StockStatus;

  lowStockAlert?: number;

  reservedStock?: number;

  warehouse?: string;
}

/* =========================================================
   JEWELLERY
========================================================= */

export interface IJewellery {
  /* -------------------------
     Metal
  ------------------------- */

  metalType?: string;

  purity?: string;

  metalColor?: string;

  metalWeight?: number;

  metalWeightUnit?: "gram" | "kg";

  /* -------------------------
     Making Charges
  ------------------------- */

  makingCharges?: number;

  makingChargesType?: "fixed" | "percentage";

  makingChargesPercentage?: number;

  /* -------------------------
     Diamond
  ------------------------- */

  hasDiamond?: boolean;

  diamondType?: string;

  diamondCount?: number;

  diamondWeight?: number;

  diamondWeightUnit?: "carat" | "gram";

  diamondColor?: string;

  diamondClarity?: string;

  diamondCut?: string;

  diamondShape?: string;

  /* -------------------------
     Gemstones used in Jewellery
  ------------------------- */

  hasGemstone?: boolean;

  gemstoneType?: string;

  gemstoneCount?: number;

  gemstoneWeight?: number;

  gemstoneWeightUnit?: "carat" | "gram";

  /* -------------------------
     Jewellery Details
  ------------------------- */

  grossWeight?: number;

  netWeight?: number;

  length?: number;

  width?: number;

  size?: string;

  dimensions?: string;

  /* -------------------------
     Setting
  ------------------------- */

  settingType?: string;

  /* -------------------------
     Hallmark
  ------------------------- */

  hallmark?: string;

  hallmarkNumber?: string;

  hallmarkVerified?: boolean;

  /* -------------------------
     Certificate
  ------------------------- */

  certificateIncluded?: boolean;

  certificateNumber?: string;

  certificateType?: string;

  certificateLab?: string;

  /* -------------------------
     Collection
  ------------------------- */

  collection?: string;

  occasion?: string;

  gender?: "Men" | "Women" | "Unisex";

  /* -------------------------
     Size / Fit
  ------------------------- */

  availableSizes?: string[];

  customizable?: boolean;
}

/* =========================================================
   SEO
========================================================= */

export interface ISeo {
  metaTitle?: string;

  metaDescription?: string;
}

/* =========================================================
   CARE INSTRUCTIONS
========================================================= */

export interface ICareInstructions {
  cleaning?: string;

  storage?: string;

  precautions?: string;
}

/* =========================================================
   PRODUCT
========================================================= */

export interface IProduct extends Document {
  productType: ProductType;

  sku: string;

  name: string;

  indianName?: string;

  slug: string;

  description?: string;

  gallery: IGalleryImage[];

  category?: string;

  subCategory?: string;

  /*
   * Flexible fields for:
   * Gemstone
   * Rudraksha
   */

  specifications: Record<string, any>;

  /*
   * Jewellery-specific information
   */

  jewellery?: IJewellery;

  /*
   * Astrology information
   */

  astrology?: IAstrology;

  /*
   * Certification
   */

  certification?: ICertification;

  /*
   * Pricing
   */

  pricing?: IPricing;

  /*
   * Inventory
   */

  inventory?: IInventory;

  /*
   * Benefits
   */

  benefits?: string[];

  /*
   * SEO
   */

  seo?: ISeo;

  /*
   * Care
   */

  careInstructions?: ICareInstructions;

  /*
   * Status
   */

  status?: ProductStatus;

  /*
   * Audit
   */

  createdBy?: string;

  updatedBy?: string;
}

/* =========================================================
   ASTROLOGY SCHEMA
========================================================= */

const AstrologySchema = new Schema<IAstrology>(
  {
    planet: {
      type: String,
      trim: true,
    },

    zodiacSigns: {
      type: [String],
      default: [],
    },

    wearDay: {
      type: String,
      trim: true,
    },

    wearMethod: {
      type: String,
      trim: true,
    },

    finger: {
      type: String,
      trim: true,
    },

    metal: {
      type: String,
      trim: true,
    },

    threadColor: {
      type: String,
      trim: true,
    },

    purificationMethod: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

/* =========================================================
   CERTIFICATION SCHEMA
========================================================= */

const CertificationSchema = new Schema<ICertification>(
  {
    certified: {
      type: Boolean,
      default: false,
    },

    certificationType: {
      type: String,
      trim: true,
    },

    labName: {
      type: String,
      trim: true,
    },

    certificateNumber: {
      type: String,
      trim: true,
    },

    issueDate: {
      type: String,
      trim: true,
    },

    xrayVerified: {
      type: Boolean,
      default: false,
    },

    certificatePdf: {
      type: String,
      trim: true,
    },

    certificateImage: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

/* =========================================================
   PRICING SCHEMA
========================================================= */

const PricingSchema = new Schema<IPricing>(
  {
    currency: {
      type: String,
      default: "INR",
      trim: true,
    },

    costPrice: {
      type: Number,
      min: 0,
    },

    sellingPrice: {
      type: Number,
      min: 0,
    },

    salePrice: {
      type: Number,
      min: 0,
    },

    discount: {
      type: Number,
      min: 0,
    },

    gst: {
      type: Number,
      default: 3,
      min: 0,
    },

    taxClass: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

/* =========================================================
   INVENTORY SCHEMA
========================================================= */

const InventorySchema = new Schema<IInventory>(
  {
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    stockStatus: {
      type: String,
      enum: [
        "In Stock",
        "Out of Stock",
        "Low Stock",
      ],
      default: "In Stock",
    },

    lowStockAlert: {
      type: Number,
      default: 5,
      min: 0,
    },

    reservedStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    warehouse: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

/* =========================================================
   SEO SCHEMA
========================================================= */

const SeoSchema = new Schema<ISeo>(
  {
    metaTitle: {
      type: String,
      trim: true,
    },

    metaDescription: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

/* =========================================================
   GALLERY SCHEMA
========================================================= */

const GallerySchema = new Schema<IGalleryImage>(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    publicId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

/* =========================================================
   CARE INSTRUCTIONS SCHEMA
========================================================= */

const CareInstructionsSchema =
  new Schema<ICareInstructions>(
    {
      cleaning: {
        type: String,
        trim: true,
      },

      storage: {
        type: String,
        trim: true,
      },

      precautions: {
        type: String,
        trim: true,
      },
    },
    {
      _id: false,
    },
  );

/* =========================================================
   JEWELLERY SCHEMA
========================================================= */

const JewellerySchema = new Schema<IJewellery>(
  {
    /* -------------------------
       Metal
    ------------------------- */

    metalType: {
      type: String,
      trim: true,
    },

    purity: {
      type: String,
      trim: true,
    },

    metalColor: {
      type: String,
      trim: true,
    },

    metalWeight: {
      type: Number,
      min: 0,
    },

    metalWeightUnit: {
      type: String,
      enum: ["gram", "kg"],
      default: "gram",
    },

    /* -------------------------
       Making Charges
    ------------------------- */

    makingCharges: {
      type: Number,
      min: 0,
    },

    makingChargesType: {
      type: String,
      enum: ["fixed", "percentage"],
      default: "fixed",
    },

    makingChargesPercentage: {
      type: Number,
      min: 0,
    },

    /* -------------------------
       Diamond
    ------------------------- */

    hasDiamond: {
      type: Boolean,
      default: false,
    },

    diamondType: {
      type: String,
      trim: true,
    },

    diamondCount: {
      type: Number,
      min: 0,
    },

    diamondWeight: {
      type: Number,
      min: 0,
    },

    diamondWeightUnit: {
      type: String,
      enum: ["carat", "gram"],
      default: "carat",
    },

    diamondColor: {
      type: String,
      trim: true,
    },

    diamondClarity: {
      type: String,
      trim: true,
    },

    diamondCut: {
      type: String,
      trim: true,
    },

    diamondShape: {
      type: String,
      trim: true,
    },

    /* -------------------------
       Gemstone
    ------------------------- */

    hasGemstone: {
      type: Boolean,
      default: false,
    },

    gemstoneType: {
      type: String,
      trim: true,
    },

    gemstoneCount: {
      type: Number,
      min: 0,
    },

    gemstoneWeight: {
      type: Number,
      min: 0,
    },

    gemstoneWeightUnit: {
      type: String,
      enum: ["carat", "gram"],
      default: "carat",
    },

    /* -------------------------
       Weight / Dimensions
    ------------------------- */

    grossWeight: {
      type: Number,
      min: 0,
    },

    netWeight: {
      type: Number,
      min: 0,
    },

    length: {
      type: Number,
      min: 0,
    },

    width: {
      type: Number,
      min: 0,
    },

    size: {
      type: String,
      trim: true,
    },

    dimensions: {
      type: String,
      trim: true,
    },

    /* -------------------------
       Setting
    ------------------------- */

    settingType: {
      type: String,
      trim: true,
    },

    /* -------------------------
       Hallmark
    ------------------------- */

    hallmark: {
      type: String,
      trim: true,
    },

    hallmarkNumber: {
      type: String,
      trim: true,
    },

    hallmarkVerified: {
      type: Boolean,
      default: false,
    },

    /* -------------------------
       Certificate
    ------------------------- */

    certificateIncluded: {
      type: Boolean,
      default: false,
    },

    certificateNumber: {
      type: String,
      trim: true,
    },

    certificateType: {
      type: String,
      trim: true,
    },

    certificateLab: {
      type: String,
      trim: true,
    },

    /* -------------------------
       Collection
    ------------------------- */

    collection: {
      type: String,
      trim: true,
    },

    occasion: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
    },

    /* -------------------------
       Size
    ------------------------- */

    availableSizes: {
      type: [String],
      default: [],
    },

    customizable: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

/* =========================================================
   PRODUCT SCHEMA
========================================================= */

const ProductSchema = new Schema<IProduct>(
  {
    /* -------------------------
       Product Type
    ------------------------- */

    productType: {
      type: String,
      enum: [
        "gemstone",
        "rudraksha",
        "jewellery",
      ],
      required: true,
      index: true,
    },

    /* -------------------------
       Basic Information
    ------------------------- */

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    indianName: {
      type: String,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    /* -------------------------
       Gallery
    ------------------------- */

    gallery: {
      type: [GallerySchema],
      default: [],
    },

    /* -------------------------
       Category
    ------------------------- */

    category: {
      type: String,
      trim: true,
      index: true,
    },

    subCategory: {
      type: String,
      trim: true,
    },

    /* -------------------------
       Generic Specifications
       
       Useful for:
       - Gemstone
       - Rudraksha
       - Other future products
    ------------------------- */

    specifications: {
      type: Schema.Types.Mixed,
      default: {},
    },

    /* -------------------------
       Jewellery
    ------------------------- */

    jewellery: {
      type: JewellerySchema,
      default: undefined,
    },

    /* -------------------------
       Astrology
    ------------------------- */

    astrology: {
      type: AstrologySchema,
      default: undefined,
    },

    /* -------------------------
       Certification
    ------------------------- */

    certification: {
      type: CertificationSchema,
      default: undefined,
    },

    /* -------------------------
       Pricing
    ------------------------- */

    pricing: {
      type: PricingSchema,
      default: undefined,
    },

    /* -------------------------
       Inventory
    ------------------------- */

    inventory: {
      type: InventorySchema,
      default: undefined,
    },

    /* -------------------------
       Benefits
    ------------------------- */

    benefits: {
      type: [String],
      default: [],
    },

    /* -------------------------
       SEO
    ------------------------- */

    seo: {
      type: SeoSchema,
      default: undefined,
    },

    /* -------------------------
       Care Instructions
    ------------------------- */

    careInstructions: {
      type: CareInstructionsSchema,
      default: undefined,
    },

    /* -------------------------
       Status
    ------------------------- */

    status: {
      type: String,
      enum: [
        "Draft",
        "Published",
        "Archived",
      ],
      default: "Draft",
      index: true,
    },

    /* -------------------------
       Audit
    ------------------------- */

    createdBy: {
      type: String,
      trim: true,
    },

    updatedBy: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

/* =========================================================
   MODEL
========================================================= */

const Product: Model<IProduct> =
  mongoose.models.Product ||
  mongoose.model<IProduct>(
    "Product",
    ProductSchema,
  );

export default Product;