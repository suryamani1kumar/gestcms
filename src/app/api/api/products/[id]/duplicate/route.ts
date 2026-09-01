import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

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

    delete (product as any)._id;
    delete (product as any).__v;

    product.sku = `${product.sku}-COPY`;
    product.slug = `${product.slug}-copy`;
    product.status = "Draft";

    const duplicate = await Product.create(product);

    return NextResponse.json({
      success: true,
      message: "Product duplicated",
      data: duplicate,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}