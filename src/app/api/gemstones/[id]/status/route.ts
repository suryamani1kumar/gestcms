import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Gemstone from "@/models/Gemstone";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { status } = await req.json();
    const { id } = await params;

    const gemstone = await Gemstone.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Status updated",
      data: gemstone,
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