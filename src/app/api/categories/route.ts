import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Category from "@/models/Category";

interface CategoryImagePayload {
  url: string;
  publicId: string;
}

interface CategoryRequestBody {
  name?: string;
  parentCategory?: string | null;
  status?: "Active" | "Inactive";
  image?: CategoryImagePayload | null;
}

function createSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isValidObjectId(value: string): boolean {
  return mongoose.Types.ObjectId.isValid(value);
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status") || "";
    const parentCategory = searchParams.get("parentCategory") || "";

    const parentOnly = searchParams.get("parentOnly") === "true";

    const query: Record<string, unknown> = {};

    if (search) {
      query.name = {
        $regex: escapeRegex(search),
        $options: "i",
      };
    }

    if (status === "Active" || status === "Inactive") {
      query.status = status;
    }

    if (parentOnly) {
      query.parentCategory = null;
    } else if (parentCategory === "none") {
      query.parentCategory = null;
    } else if (parentCategory) {
      if (!isValidObjectId(parentCategory)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid parent category ID.",
          },
          {
            status: 400,
          },
        );
      }

      query.parentCategory = new mongoose.Types.ObjectId(parentCategory);
    }

    const categories = await Category.find(query)
      .populate("parentCategory", "name slug")
      .sort({
        createdAt: -1,
      })
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: categories,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET /api/categories error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categories.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body: CategoryRequestBody = await request.json();

    const { name, parentCategory, status, image } = body;

    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Category name is required.",
        },
        {
          status: 400,
        },
      );
    }

    const cleanName = name.trim();

    const slug = createSlug(cleanName);

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category name.",
        },
        {
          status: 400,
        },
      );
    }

    let parentId: mongoose.Types.ObjectId | null = null;

    if (parentCategory && parentCategory !== "none") {
      if (!isValidObjectId(parentCategory)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid parent category ID.",
          },
          {
            status: 400,
          },
        );
      }

      parentId = new mongoose.Types.ObjectId(parentCategory);

      const parent = await Category.findById(parentId);

      if (!parent) {
        return NextResponse.json(
          {
            success: false,
            message: "Parent category not found.",
          },
          {
            status: 404,
          },
        );
      }

      if (parent.parentCategory) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Only top-level categories can be selected as parent categories.",
          },
          {
            status: 400,
          },
        );
      }
    }
    const existingCategory = await Category.findOne({
      name: {
        $regex: `^${escapeRegex(cleanName)}$`,
        $options: "i",
      },
      parentCategory: parentId,
    });

    if (existingCategory) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Category with this name already exists under this parent category.",
        },
        {
          status: 409,
        },
      );
    }

    let categoryImage: CategoryImagePayload | null = null;

    if (image !== undefined && image !== null) {
      if (typeof image !== "object" || Array.isArray(image)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid category image.",
          },
          {
            status: 400,
          },
        );
      }

      if (typeof image.url !== "string" || !image.url.trim()) {
        return NextResponse.json(
          {
            success: false,
            message: "Image URL is required.",
          },
          {
            status: 400,
          },
        );
      }

      if (typeof image.publicId !== "string" || !image.publicId.trim()) {
        return NextResponse.json(
          {
            success: false,
            message: "Image public ID is required.",
          },
          {
            status: 400,
          },
        );
      }

      categoryImage = {
        url: image.url.trim(),
        publicId: image.publicId.trim(),
      };
    }

    const categoryStatus = status === "Inactive" ? "Inactive" : "Active";

    const category = await Category.create({
      name: cleanName,
      slug,
      parentCategory: parentId,
      productCount: 0,
      image: categoryImage,
      status: categoryStatus,
    });

    const populatedCategory = await Category.findById(category._id)
      .populate("parentCategory", "name slug")
      .lean();

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully.",
        data: populatedCategory,
      },
      {
        status: 201,
      },
    );
  } catch (error: unknown) {
    console.error("POST /api/categories error:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: number }).code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Category with this name already exists under this parent category.",
        },
        {
          status: 409,
        },
      );
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          success: false,
          message: Object.values(error.errors)
            .map((item) => item.message)
            .join(", "),
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create category.",
      },
      {
        status: 500,
      },
    );
  }
}
