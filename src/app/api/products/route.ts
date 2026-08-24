import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { generateSKU, generateSlug } from "@/lib/product";

// GET All Products
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: products.length,
        data: products,
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

const PRODUCT_TYPES = ["gemstone", "rudraksha", "jewellery"] as const;

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const { productType, name, category, ...productData } = body;

    console.log("first", body);

    // ----------------------------------
    // Validation
    // ----------------------------------

    if (!productType) {
      return NextResponse.json(
        {
          success: false,
          message: "Product type is required",
        },
        { status: 400 },
      );
    }

    if (!PRODUCT_TYPES.includes(productType)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid product type. Allowed values: gemstone, rudraksha, jewellery",
        },
        { status: 400 },
      );
    }

    if (!name?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Product name is required",
        },
        { status: 400 },
      );
    }

    // ----------------------------------
    // Generate SKU
    // ----------------------------------

    const sku = generateSKU(productType, category);

    // ----------------------------------
    // Generate Slug
    // ----------------------------------

    const baseSlug = generateSlug(name);

    // Check if slug already exists
    let slug = baseSlug;

    const existingSlug = await Product.exists({
      slug,
    });

    if (existingSlug) {
      slug = `${baseSlug}-${Date.now()}`;
    }

    // ----------------------------------
    // Create Product
    // ----------------------------------

    const product = await Product.create({
      ...productData,

      productType,

      name: name.trim(),

      category: category?.trim() || undefined,

      sku,

      slug,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        data: product,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create product error:", error);

    // MongoDB duplicate key
    if (error?.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern || {})[0];

      return NextResponse.json(
        {
          success: false,
          message: `${duplicateField || "Product"} already exists`,
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to create product",
      },
      { status: 500 },
    );
  }
}
