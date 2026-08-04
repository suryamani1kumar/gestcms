import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Rudraksha from "@/models/Rudraksha";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const rudraksha = await Rudraksha.findById(id).lean();

    if (!rudraksha) {
      return NextResponse.json(
        {
          success: false,
          message: "Rudraksha not found",
        },
        { status: 404 }
      );
    }

    delete (rudraksha as any)._id;
    delete (rudraksha as any).__v;

    rudraksha.sku = `${rudraksha.sku}-COPY`;
    rudraksha.slug = `${rudraksha.slug}-copy`;
    rudraksha.status = "Draft";

    const duplicate = await Rudraksha.create(rudraksha);

    return NextResponse.json({
      success: true,
      message: "Rudraksha duplicated",
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