import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const { productId, publicId } = body;

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID is required",
        },
        { status: 400 },
      );
    }

    if (!publicId) {
      return NextResponse.json(
        {
          success: false,
          message: "Image publicId is required",
        },
        { status: 400 },
      );
    }

    // Find product
    const product = await Product.findById({ _id: productId });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    // Check image exists in product
    const imageExists = product.gallery?.some(
      (image) => image.publicId === publicId,
    );

    if (!imageExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Image not found in product gallery",
        },
        { status: 404 },
      );
    }

    // Delete from Cloudinary
    const cloudinaryResult = await cloudinary.uploader.destroy(publicId);

    // Remove image from MongoDB
    await Product.updateOne(
      { _id: productId },
      {
        $pull: {
          gallery: {
            publicId: publicId,
          },
        },
      },
    );

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
      data: {
        publicId,
        cloudinary: cloudinaryResult.result,
      },
    });
  } catch (error: any) {
    console.error("Delete image error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to delete image",
      },
      { status: 500 },
    );
  }
}
