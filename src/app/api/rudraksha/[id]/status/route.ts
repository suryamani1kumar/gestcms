import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Rudraksha from "@/models/Rudraksha";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { status } = await req.json();
    const { id } = await params;

    const rudraksha = await Rudraksha.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Status updated",
      data: rudraksha,
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