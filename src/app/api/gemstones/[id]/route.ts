import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Gemstone from "@/models/Gemstone";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET Single
export async function GET(request: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Id",
        },
        { status: 400 },
      );
    }

    const gemstone = await Gemstone.findById(id);

    if (!gemstone) {
      return NextResponse.json(
        {
          success: false,
          message: "Gemstone not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: gemstone,
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

// Update
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Id",
        },
        { status: 400 },
      );
    }

    const gemstone = await Gemstone.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!gemstone) {
      return NextResponse.json(
        {
          success: false,
          message: "Gemstone not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Gemstone updated successfully",
        data: gemstone,
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

// Delete
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Id",
        },
        { status: 400 },
      );
    }

    const gemstone = await Gemstone.findByIdAndDelete(id);

    if (!gemstone) {
      return NextResponse.json(
        {
          success: false,
          message: "Gemstone not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Gemstone deleted successfully",
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
