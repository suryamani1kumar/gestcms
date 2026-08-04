import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Rudraksha from "@/models/Rudraksha";

// GET All Rudrakshas
export async function GET() {
  try {
    await connectDB();

    const rudraksha = await Rudraksha.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: rudraksha.length,
        data: rudraksha,
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

// Create Rudrakshas
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const rudraksha = await Rudraksha.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Rudraksha created successfully",
        data: rudraksha,
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
