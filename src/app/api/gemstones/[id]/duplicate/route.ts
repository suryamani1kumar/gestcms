import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Gemstone from "@/models/Gemstone";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const gemstone = await Gemstone.findById(id).lean();

    if (!gemstone) {
      return NextResponse.json(
        {
          success: false,
          message: "Gemstone not found",
        },
        { status: 404 }
      );
    }

    delete (gemstone as any)._id;
    delete (gemstone as any).__v;

    gemstone.sku = `${gemstone.sku}-COPY`;
    gemstone.slug = `${gemstone.slug}-copy`;
    gemstone.status = "Draft";

    const duplicate = await Gemstone.create(gemstone);

    return NextResponse.json({
      success: true,
      message: "Gemstone duplicated",
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