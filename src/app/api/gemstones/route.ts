import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Gemstone from "@/models/Gemstone";

// GET All Gemstones
export async function GET() {
  try {
    await connectDB();

    const gemstones = await Gemstone.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: gemstones.length,
        data: gemstones,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

// Create Gemstone
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const gemstone = await Gemstone.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Gemstone created successfully",
        data: gemstone,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

const gemstone = {
  // =========================
  // Basic Information
  // =========================
  id: 1,
  sku: "GEM-RUBY-001",
  name: "Ruby",
  indianName: "Manik",
  slug: "natural-ruby",
  shortDescription:
    "Natural certified Burmese Ruby with excellent color and clarity.",
  description:
    "This natural Ruby (Manik) is sourced from Burma and is known for its deep red color, excellent transparency, and astrological significance. It is recommended for strengthening the Sun and is suitable for those seeking confidence, leadership, and success.",

  // =========================
  // Images
  // =========================
  featuredImage: "/images/gemstones/ruby.webp",
  thumbnail: "/images/gemstones/ruby-thumb.webp",
  gallery: [
    "/images/gemstones/ruby-1.webp",
    "/images/gemstones/ruby-2.webp",
    "/images/gemstones/ruby-3.webp",
  ],
  videoUrl: "https://youtube.com/watch?v=example",
  image360: "/images/gemstones/ruby-360.webp",

  // =========================
  // Category
  // =========================
  category: "Precious",
  subCategory: "Ruby",
  color: "Pigeon Blood Red",
  shape: "Oval",
  cut: "Mixed Cut",
  transparency: "Transparent",
  origin: "Burma (Myanmar)",
  treatment: "Unheated",
  certificationType: "IGI",

  // =========================
  // Physical Properties
  // =========================
  weight: {
    value: 5.25,
    unit: "Carat",
  },

  dimensions: {
    length: 11.2,
    width: 8.6,
    height: 5.1,
    unit: "mm",
  },

  hardness: "9 Mohs",
  refractiveIndex: "1.762 - 1.770",
  specificGravity: "4.00",
  luster: "Vitreous",

  // =========================
  // Quality
  // =========================
  quality: {
    grade: "AAA",
    clarity: "VVS",
    colorGrade: "Excellent",
    natural: true,
    synthetic: false,
    heated: false,
    enhancement: "None",
  },

  // =========================
  // Astrology
  // =========================
  astrology: {
    planet: "Sun",
    zodiacSigns: ["Leo", "Aries", "Scorpio"],
    rashi: ["Simha"],
    birthMonth: ["July"],
    chakra: "Heart Chakra",
    luckyNumber: [1],
    luckyColor: ["Red", "Golden"],
    dayToWear: "Sunday",
    finger: "Ring Finger",
    metal: "Gold",
    mantra: "Om Hram Hreem Hraum Sah Suryaya Namah",
  },

  // =========================
  // Certification
  // =========================
  certification: {
    labName: "IGI",
    certificateNumber: "IGI-RB-202600123",
    issueDate: "2026-07-15",
    expiryDate: "",
    certificatePdf: "/certificates/ruby.pdf",
    certificateImage: "/certificates/ruby.jpg",
  },

  // =========================
  // Inventory
  // =========================
  inventory: {
    stock: 12,
    stockStatus: "In Stock",
    lowStockAlert: 3,
    quantity: 1,
  },

  // =========================
  // Pricing
  // =========================
  pricing: {
    currency: "INR",
    costPrice: 42000,
    sellingPrice: 50000,
    salePrice: 47500,
    discount: 5,
    gst: 3,
  },

  // =========================
  // Shipping
  // =========================
  shipping: {
    weight: 25,
    weightUnit: "gm",
    length: 8,
    width: 6,
    height: 4,
    dimensionUnit: "cm",
    freeShipping: true,
  },

  // =========================
  // Benefits
  // =========================
  benefits: [
    "Boosts confidence",
    "Enhances leadership qualities",
    "Improves career growth",
    "Provides protection from negativity",
    "Attracts success and prosperity",
  ],

  // =========================
  // Care Instructions
  // =========================
  careInstructions: {
    cleaning: "Clean with lukewarm water and a soft cloth.",
    storage: "Store separately in a jewelry box to prevent scratches.",
    precautions: "Avoid harsh chemicals and ultrasonic cleaners.",
  },

  // =========================
  // FAQs
  // =========================
  faqs: [
    {
      question: "Is this Ruby natural?",
      answer: "Yes, this Ruby is 100% natural and laboratory certified.",
    },
    {
      question: "Which finger should Ruby be worn on?",
      answer:
        "Ruby is generally worn on the ring finger of the right hand in a gold ring.",
    },
    {
      question: "Which planet does Ruby represent?",
      answer: "Ruby is associated with the Sun (Surya).",
    },
  ],

  // =========================
  // SEO
  // =========================
  seo: {
    metaTitle: "Buy Natural Ruby (Manik) Online | Certified Gemstone",
    metaDescription:
      "Shop certified natural Ruby (Manik) gemstone with lab certification, free shipping, and best price in India.",
    canonicalUrl: "https://example.com/gemstones/natural-ruby",
    ogTitle: "Natural Ruby Gemstone",
    ogDescription: "Premium certified Ruby gemstone for astrology and jewelry.",
    ogImage: "https://example.com/images/gemstones/ruby.webp",
  },

  // =========================
  // Tags
  // =========================
  tags: [
    "Ruby",
    "Manik",
    "Precious",
    "Certified",
    "Natural",
    "Astrology",
    "Red Gemstone",
  ],

  // =========================
  // Display Options
  // =========================
  display: {
    featured: true,
    bestSeller: true,
    trending: true,
    newArrival: false,
    recommended: true,
    homepageBanner: true,
  },

  // =========================
  // Dynamic Attributes
  // =========================
  attributes: [
    {
      name: "Species",
      value: "Corundum",
    },
    {
      name: "Color",
      value: "Pigeon Blood Red",
    },
    {
      name: "Origin",
      value: "Burma",
    },
    {
      name: "Shape",
      value: "Oval",
    },
    {
      name: "Cut",
      value: "Mixed Cut",
    },
    {
      name: "Transparency",
      value: "Transparent",
    },
    {
      name: "Certification",
      value: "IGI",
    },
  ],

  // =========================
  // Status
  // =========================
  status: "Published",

  // =========================
  // Rating
  // =========================
  rating: {
    average: 4.9,
    totalReviews: 268,
  },

  // =========================
  // Audit
  // =========================
  createdBy: "Admin",
  updatedBy: "Admin",
  createdAt: "2026-07-20T10:00:00Z",
  updatedAt: "2026-08-01T15:30:00Z",
};
