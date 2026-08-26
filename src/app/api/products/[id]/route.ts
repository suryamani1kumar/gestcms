import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

function createSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/products/:id
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID",
        },
        { status: 400 }
      );
    }

    const product = await Product.findById(id).lean();

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product fetched successfully",
        data: product,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch product",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/products/:id
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    const updateData: Record<string, unknown> = {
      ...body,
    };

    // Do not allow changing these automatically
    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    // SKU
    if (body.sku) {
      const normalizedSku = body.sku.toUpperCase();

      const duplicateSku = await Product.findOne({
        sku: normalizedSku,
        _id: { $ne: id },
      });

      if (duplicateSku) {
        return NextResponse.json(
          {
            success: false,
            message: "SKU already exists",
          },
          { status: 409 }
        );
      }

      updateData.sku = normalizedSku;
    }

    // Slug
    if (body.slug) {
      const normalizedSlug = createSlug(body.slug);

      const duplicateSlug = await Product.findOne({
        slug: normalizedSlug,
        _id: { $ne: id },
      });

      if (duplicateSlug) {
        return NextResponse.json(
          {
            success: false,
            message: "Slug already exists",
          },
          { status: 409 }
        );
      }

      updateData.slug = normalizedSlug;
    }

    // If name changes and slug wasn't provided
    if (body.name && !body.slug) {
      let newSlug = createSlug(body.name);

      const duplicateSlug = await Product.findOne({
        slug: newSlug,
        _id: { $ne: id },
      });

      if (duplicateSlug) {
        newSlug = `${newSlug}-${Date.now()}`;
      }

      updateData.slug = newSlug;
    }

    // Product type validation
    if (body.productType) {
      const allowedProductTypes = [
        "gemstone",
        "rudraksha",
        "jewellery",
      ];

      if (!allowedProductTypes.includes(body.productType)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid product type",
          },
          { status: 400 }
        );
      }

      // Remove unrelated product-specific data
      if (body.productType === "gemstone") {
        updateData.rudraksha = undefined;
        updateData.jewellery = undefined;
      }

      if (body.productType === "rudraksha") {
        updateData.gemstone = undefined;
        updateData.jewellery = undefined;
      }

      if (body.productType === "jewellery") {
        updateData.gemstone = undefined;
        updateData.rudraksha = undefined;
      }
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully",
        data: product,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("UPDATE PRODUCT ERROR:", error);

    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "SKU or slug already exists",
        },
        { status: 409 }
      );
    }

    if (error?.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          message: "Product validation failed",
          errors: Object.values(error.errors).map(
            (err: any) => err.message
          ),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update product",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/products/:id
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID",
        },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Product deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete product",
      },
      { status: 500 }
    );
  }
}