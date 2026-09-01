import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Category from "@/models/Category";

interface CategoryImagePayload {
  url: string;
  publicId: string;
}

function isValidId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(
  _request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!isValidId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category ID.",
        },
        {
          status: 400,
        },
      );
    }

    const category = await Category.findById(id)
      .populate("parentCategory", "name slug")
      .lean();

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: category,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET /api/categories/:id error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch category.",
      },
      {
        status: 500,
      },
    );
  }
}

/**
 * PUT /api/categories/:id
 */
export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!isValidId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category ID.",
        },
        {
          status: 400,
        },
      );
    }

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found.",
        },
        {
          status: 404,
        },
      );
    }

    const body = await request.json();

    const {
      name,
      parentCategory,
      status,
      image,
    }: {
      name?: string;
      parentCategory?: string | null;
      status?: "Active" | "Inactive";
      image?: CategoryImagePayload | null;
    } = body;

    /**
     * Validate name
     */
    if (!name || !name.trim()) {
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

    /**
     * Parent validation
     */
    let parentId: mongoose.Types.ObjectId | null = null;

    if (parentCategory && parentCategory !== "none") {
      if (parentCategory === id) {
        return NextResponse.json(
          {
            success: false,
            message: "A category cannot be its own parent.",
          },
          {
            status: 400,
          },
        );
      }

      if (!isValidId(parentCategory)) {
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

      const parent = await Category.findById(parentCategory);

      if (!parent) {
        return NextResponse.json(
          {
            success: false,
            message: "Parent category not found.",
          },
          {
            status: 400,
          },
        );
      }

      /**
       * Only top-level categories can be parents.
       */
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

      parentId = parent._id;
    }

    const duplicate = await Category.findOne({
      _id: {
        $ne: id,
      },
      name: {
        $regex: `^${escapeRegex(cleanName)}$`,
        $options: "i",
      },
      parentCategory: parentId,
    });

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Another category with this name already exists under this parent.",
        },
        {
          status: 409,
        },
      );
    }

    /**
     * Update basic fields
     */
    category.name = cleanName;
    category.slug = createSlug(cleanName);
    category.parentCategory = parentId;

    if (status === "Active" || status === "Inactive") {
      category.status = status;
    }

    if (image !== undefined) {
      if (image === null) {
        category.image = null;
      } else {
        if (
          typeof image.url !== "string" ||
          typeof image.publicId !== "string" ||
          !image.url.trim() ||
          !image.publicId.trim()
        ) {
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

        category.image = {
          url: image.url.trim(),
          publicId: image.publicId.trim(),
        };
      }
    }

    await category.save();
    const updatedCategory = await Category.findById(id)
      .populate("parentCategory", "name slug")
      .lean();

    return NextResponse.json(
      {
        success: true,
        message: "Category updated successfully.",
        data: updatedCategory,
      },
      {
        status: 200,
      },
    );
  } catch (error: unknown) {
    console.error("PUT /api/categories/:id error:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: number }).code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Category with this name already exists under this parent.",
        },
        {
          status: 409,
        },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update category.",
      },
      {
        status: 500,
      },
    );
  }
}

/**
 * DELETE /api/categories/:id
 */
export async function DELETE(
  _request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!isValidId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category ID.",
        },
        {
          status: 400,
        },
      );
    }

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found.",
        },
        {
          status: 404,
        },
      );
    }

    const childCount = await Category.countDocuments({
      parentCategory: id,
    });

    if (childCount > 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Cannot delete this category because it has child categories. Delete or move them first.",
        },
        {
          status: 409,
        },
      );
    }

    if (category.productCount > 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Cannot delete this category because products are assigned to it.",
        },
        {
          status: 409,
        },
      );
    }

    await Category.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Category deleted successfully.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("DELETE /api/categories/:id error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete category.",
      },
      {
        status: 500,
      },
    );
  }
}
